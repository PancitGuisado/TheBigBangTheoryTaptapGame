// ============================================================
// AUTO-HEAL — Automatically heal characters below HP threshold
// Unlocks after wave 15. Uses food from food shop.
// ============================================================

(function() {
    'use strict';

    // ---- CONFIG ----
    var AUTO_HEAL_THRESHOLD = 0.30;  // Heal when HP drops below 30%
    var AUTO_HEAL_CHECK_MS = 3000;   // Check every 3 seconds
    var UNLOCK_WAVE = 15;

    // ---- STATE ----
    var autoHealEnabled = false;
    var _interval = null;

    // ---- INJECT STYLES ----
    var style = document.createElement('style');
    style.textContent = [
        '#auto-heal-btn { transition: all 0.2s; }',
        '#auto-heal-btn.active { box-shadow: 0 0 10px rgba(16,185,129,0.5); }',
        '@keyframes auto-heal-pulse { 0%,100%{opacity:1;} 50%{opacity:0.7;} }',
        '.auto-heal-indicator { animation: auto-heal-pulse 1.5s ease-in-out infinite; }'
    ].join('\n');
    document.head.appendChild(style);

    // ---- HEAL LOGIC ----
    function tryAutoHeal() {
        if (!autoHealEnabled) return;
        if (typeof state === 'undefined' || !state.roster || !state.equipped) return;
        if (typeof hangoutMode !== 'undefined' && hangoutMode) return;

        var needsRerender = false;

        // First: heal hospitalized characters that are in the team lineup
        if (state.team && state.hospitalized && state.hospitalized.length > 0) {
            for (var t = 0; t < state.team.length; t++) {
                var tKey = state.team[t];
                if (!tKey) continue;
                var tRoster = state.roster[tKey];
                if (!tRoster || tRoster.status !== 'hospitalized') continue;

                // Try to heal this hospitalized character with food
                var revived = false;
                var foodPriorityRevive = [
                    { key: 'hotdog', heal: 15 }, { key: 'burger', heal: 20 },
                    { key: 'chinese', heal: 25 }, { key: 'pretzel', heal: 25 },
                    { key: 'pizza', heal: 30 }, { key: 'smoothie', heal: 30 },
                    { key: 'tacos', heal: 35 }, { key: 'energydrink', heal: 35 },
                    { key: 'cupcakes', heal: 40 }, { key: 'shawarma', heal: 45 },
                    { key: 'indian', heal: 50 }, { key: 'cheesecake', heal: 60 }
                ];

                for (var fr = 0; fr < foodPriorityRevive.length; fr++) {
                    var fItem = foodPriorityRevive[fr];
                    if (state.food && state.food[fItem.key] && state.food[fItem.key] > 0) {
                        state.food[fItem.key]--;
                        var mHp = tRoster.maxHp || 100;
                        tRoster.hp = Math.min(mHp, Math.floor(mHp * (fItem.heal / 100)));
                        if (tRoster.currentHp !== undefined) tRoster.currentHp = tRoster.hp;
                        revived = true;
                        break;
                    }
                }

                // Fallback: use money
                if (!revived && (state.money || 0) >= 50) {
                    state.money = (state.money || 0) - 50;
                    var mHp2 = tRoster.maxHp || 100;
                    tRoster.hp = Math.min(mHp2, Math.floor(mHp2 * 0.25));
                    if (tRoster.currentHp !== undefined) tRoster.currentHp = tRoster.hp;
                    revived = true;
                }

                if (revived) {
                    // Restore character to active duty
                    tRoster.status = 'healthy';
                    tRoster.hospitalEndTime = 0;
                    state.equipped[tKey] = true;
                    var hIdx = state.hospitalized.indexOf(tKey);
                    if (hIdx >= 0) state.hospitalized.splice(hIdx, 1);
                    needsRerender = true;

                    var charName = (typeof characters !== 'undefined' && characters[tKey]) ? characters[tKey].name : tKey;
                    if (typeof showToast === 'function') {
                        showToast('💊 ' + charName + ' revived & back in action!');
                    }
                }
            }
        }

        // Second: heal equipped characters below threshold (original logic)
        for (var key in state.equipped) {
            if (!state.equipped[key]) continue;
            var r = state.roster[key];
            if (!r || r.level <= 0) continue;
            if (r.status === 'hospitalized') continue;

            var maxHp = r.maxHp || 100;
            var currentHp = r.hp;
            if (currentHp === undefined || currentHp === null) continue;

            // Check if below threshold
            if (currentHp / maxHp > AUTO_HEAL_THRESHOLD) continue;
            if (currentHp >= maxHp) continue;

            // Try to use food
            var healed = false;

            // Priority: use cheapest food first (heal values from config.js hpRestore)
            var foodPriority = [
                { key: 'hotdog', heal: 15 },
                { key: 'burger', heal: 20 },
                { key: 'chinese', heal: 25 },
                { key: 'pretzel', heal: 25 },
                { key: 'pizza', heal: 30 },
                { key: 'smoothie', heal: 30 },
                { key: 'tacos', heal: 35 },
                { key: 'energydrink', heal: 35 },
                { key: 'cupcakes', heal: 40 },
                { key: 'shawarma', heal: 45 },
                { key: 'indian', heal: 50 },
                { key: 'cheesecake', heal: 60 }
            ];

            // Check if we have any food items in state.food (NOT state.resources)
            for (var f = 0; f < foodPriority.length; f++) {
                var food = foodPriority[f];
                if (state.food && state.food[food.key] && state.food[food.key] > 0) {
                    state.food[food.key]--;
                    r.hp = Math.min(maxHp, r.hp + Math.floor(maxHp * (food.heal / 100)));
                    healed = true;

                    // Notification
                    if (typeof showToast === 'function') {
                        var charName2 = (typeof characters !== 'undefined' && characters[key]) ? characters[key].name : key;
                        showToast('🍕 Auto-healed ' + charName2 + '!');
                    }
                    break;
                }
            }

            // Fallback: use money to buy and apply food
            if (!healed && (state.money || 0) >= 50) {
                state.money = (state.money || 0) - 50;
                r.hp = Math.min(maxHp, r.hp + Math.floor(maxHp * 0.25));
                healed = true;
            }
        }

        // Re-render battle line if any hospitalized characters were revived
        if (needsRerender) {
            if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
            if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
            if (typeof calculateSynergies === 'function') calculateSynergies();
        }

        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
    }

    // ---- TOAST NOTIFICATION ----
    function showToast(msg) {
        var existing = document.getElementById('auto-heal-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.id = 'auto-heal-toast';
        toast.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:9999;' +
            'background:rgba(16,185,129,0.9);color:white;font-size:10px;font-weight:bold;' +
            'padding:6px 16px;box-sizing:border-box;border-radius:20px;pointer-events:none;' +
            'animation:bubble-in 0.3s ease-out;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
        toast.textContent = msg;
        document.body.appendChild(toast);

        setTimeout(function() {
            if (toast.parentNode) toast.remove();
        }, 2000);
    }

    // ---- UI: TOGGLE BUTTON ----
    function createAutoHealButton() {
        if (document.getElementById('auto-heal-btn')) return;

        // Find the top bar controls
        var topBar = document.querySelector('#arena > .absolute.top-0');
        if (!topBar) return;

        var btnContainer = topBar.querySelector('.flex.items-center.gap-0\\.5.flex-shrink-0, .flex.items-center.gap-0.flex-shrink-0');
        if (!btnContainer) return;

        var btn = document.createElement('button');
        btn.id = 'auto-heal-btn';
        btn.className = 'text-emerald-400 font-black px-1.5 py-0.5 cursor-pointer text-[9px] hover:text-emerald-300 transition-colors tracking-wider uppercase rounded border border-emerald-700/50 bg-emerald-950/60 hover:bg-emerald-900/60 whitespace-nowrap';
        btn.title = 'Auto-heal characters below 30% HP';
        btn.textContent = '💊 AUTO';
        btn.onclick = function(e) {
            e.stopPropagation();
            toggleAutoHeal();
        };
        btn.style.display = 'none';

        btnContainer.appendChild(btn);
    }

    function toggleAutoHeal() {
        autoHealEnabled = !autoHealEnabled;

        var btn = document.getElementById('auto-heal-btn');
        if (btn) {
            if (autoHealEnabled) {
                btn.classList.add('active');
                btn.textContent = '💊 AUTO ✓';
                btn.style.borderColor = 'rgba(16,185,129,0.6)';
                showToast('Auto-heal ON');
            } else {
                btn.classList.remove('active');
                btn.textContent = '💊 AUTO';
                btn.style.borderColor = 'rgba(16,185,129,0.3)';
                showToast('Auto-heal OFF');
            }
        }

        // Save preference
        if (typeof state !== 'undefined') {
            state.autoHealEnabled = autoHealEnabled;
            if (typeof saveProgress === 'function') saveProgress();
        }
    }

    function updateAutoHealVisibility() {
        var btn = document.getElementById('auto-heal-btn');
        if (!btn) return;

        var highestWave = (state.stats && state.stats.highestWave) || state.wave || 1;
        btn.style.display = (highestWave >= UNLOCK_WAVE) ? '' : 'none';
    }

    // ---- INIT ----
    function init() {
        createAutoHealButton();

        // Restore preference
        if (typeof state !== 'undefined' && state.autoHealEnabled) {
            autoHealEnabled = true;
            var btn = document.getElementById('auto-heal-btn');
            if (btn) {
                btn.classList.add('active');
                btn.textContent = '💊 AUTO ✓';
                btn.style.borderColor = 'rgba(16,185,129,0.6)';
            }
        }

        updateAutoHealVisibility();

        // Run check interval
        _interval = setInterval(function() {
            updateAutoHealVisibility();
            tryAutoHeal();
        }, AUTO_HEAL_CHECK_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 3000); });
    } else {
        setTimeout(init, 3000);
    }

    // Export
    window.toggleAutoHeal = toggleAutoHeal;
})();
