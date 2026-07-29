// ============================================================
// WAVE SWEEP SYSTEM — Instant-clear previously beaten waves
// Relies on: state, config, characters, saveProgress(), syncUI()
// ============================================================

(function() {
    'use strict';

    // ---- CSS ----
    var style = document.createElement('style');
    style.textContent = [
        '@keyframes sweep-flash { 0%{opacity:1;} 100%{opacity:0;} }',
        '@keyframes sweep-coin { 0%{opacity:1;transform:translateY(0) scale(1);} 100%{opacity:0;transform:translateY(-40px) scale(0.5);} }',
        '@keyframes sweep-slide { 0%{transform:translateY(20px);opacity:0;} 100%{transform:translateY(0);opacity:1;} }',
        '.sweep-loot-item { animation: sweep-slide 0.3s ease-out forwards; }',
        '.sweep-coin-pop { animation: sweep-coin 1.2s ease-out forwards; position:absolute; pointer-events:none; }',
        '#sweep-btn {',
        '  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #7c3aed 100%);',
        '  background-size: 200% 200%;',
        '  animation: sweep-shimmer 3s ease-in-out infinite;',
        '  border: 1px solid rgba(168,85,247,0.6);',
        '  box-shadow: 0 0 12px rgba(168,85,247,0.3);',
        '}',
        '#sweep-btn:hover { box-shadow: 0 0 20px rgba(168,85,247,0.5); transform: scale(1.05); }',
        '#sweep-btn:disabled { opacity:0.4; cursor:not-allowed; box-shadow:none; transform:none; background:#374151; border-color:#4b5563; }',
        '@keyframes sweep-shimmer { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }'
    ].join('\n');
    document.head.appendChild(style);

    // ---- CONSTANTS ----
    var SWEEP_COOLDOWN_MS = 30000; // 30 second cooldown between sweeps
    var SWEEP_LOOT_MULTIPLIER = 0.5; // 50% of normal loot
    var MAX_WAVES_PER_SWEEP = 10; // Max waves per sweep action
    var MIN_WAVE_FOR_SWEEP = 5; // Must have beaten at least wave 5

    // ---- STATE ----
    var lastSweepTime = 0;

    // ---- SWEEP CALCULATION ----
    function calculateSweepRewards(wavesToSweep) {
        var rewards = { money: 0, stone: 0, iron: 0, gold: 0, scrap: 0 };

        for (var w = 1; w <= wavesToSweep; w++) {
            // Boss reward per wave
            var bossReward = Math.floor(60 * Math.pow(1.25, w - 1));
            rewards.money += Math.floor(bossReward * SWEEP_LOOT_MULTIPLIER);

            // Minion rewards (10 minions per wave)
            var minionReward = Math.floor(8 * Math.pow(1.15, w - 1));
            rewards.money += Math.floor(minionReward * 10 * SWEEP_LOOT_MULTIPLIER);

            // Resource drops per wave (simplified)
            if (w >= 3) rewards.stone += Math.floor(2 + w * 0.5);
            if (w >= 5) rewards.iron += Math.floor(1 + w * 0.3);
            if (w >= 10) rewards.gold += Math.floor(w * 0.15);
            if (w >= 15) rewards.scrap += Math.floor(w * 0.1);
        }

        return rewards;
    }

    // ---- CAN SWEEP? ----
    function canSweep() {
        var highestWave = (state.stats && state.stats.highestWave) || state.wave;
        if (highestWave < MIN_WAVE_FOR_SWEEP) return false;
        if (Date.now() - lastSweepTime < SWEEP_COOLDOWN_MS) return false;
        return true;
    }

    function getSweepableWaves() {
        var highestWave = (state.stats && state.stats.highestWave) || state.wave;
        var available = Math.max(0, highestWave - 1); // Can sweep all previously beaten waves
        return Math.min(available, MAX_WAVES_PER_SWEEP);
    }

    // ---- EXECUTE SWEEP ----
    function executeSweep() {
        if (!canSweep()) return;

        var wavesToSweep = getSweepableWaves();
        if (wavesToSweep <= 0) return;

        lastSweepTime = Date.now();

        var rewards = calculateSweepRewards(wavesToSweep);

        // Apply rewards
        state.resources.money += rewards.money;
        state.resources.stone += rewards.stone;
        state.resources.iron += rewards.iron;
        state.resources.gold += rewards.gold;
        state.resources.scrap += rewards.scrap;

        // Track stats
        if (typeof trackStat === 'function') {
            trackStat('moneyEarned', rewards.money);
        }

        // Equipment drop chance (10% per swept wave)
        var equipDrops = [];
        if (typeof generateEquipmentDrop === 'function') {
            for (var i = 0; i < wavesToSweep; i++) {
                var drop = generateEquipmentDrop(i + 1);
                if (drop && Math.random() < 0.10) {
                    equipDrops.push(drop);
                    addEquipmentToInventory(drop);
                }
            }
        }

        // Sound effect
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('levelup');

        // Show sweep results modal
        showSweepResults(wavesToSweep, rewards, equipDrops);

        saveProgress();
        if (typeof syncUI === 'function') syncUI();
        updateSweepButton();
    }

    // ---- RESULTS MODAL ----
    function showSweepResults(waves, rewards, equipDrops) {
        var existing = document.getElementById('sweep-results-modal');
        if (existing) existing.remove();

        var lootItems = [];
        if (rewards.money > 0) lootItems.push({ icon: '💵', label: '$' + rewards.money.toLocaleString(), color: '#22c55e' });
        if (rewards.stone > 0) lootItems.push({ icon: '🪨', label: rewards.stone + ' Stone', color: '#9ca3af' });
        if (rewards.iron > 0) lootItems.push({ icon: '⛏️', label: rewards.iron + ' Iron', color: '#64748b' });
        if (rewards.gold > 0) lootItems.push({ icon: '🥇', label: rewards.gold + ' Gold', color: '#f59e0b' });
        if (rewards.scrap > 0) lootItems.push({ icon: '⚙️', label: rewards.scrap + ' Scrap', color: '#78716c' });

        var lootHtml = '';
        for (var i = 0; i < lootItems.length; i++) {
            var item = lootItems[i];
            lootHtml += '<div class="sweep-loot-item flex items-center gap-2 bg-slate-800/60 rounded-lg px-3 py-2 border border-white/5" style="animation-delay:' + (i * 0.08) + 's">' +
                '<span class="text-lg">' + item.icon + '</span>' +
                '<span class="font-bold text-[11px]" style="color:' + item.color + '">' + item.label + '</span>' +
            '</div>';
        }

        // Equipment drops
        var equipHtml = '';
        if (equipDrops.length > 0) {
            equipHtml = '<div class="mt-3 pt-3 border-t border-white/10">' +
                '<div class="text-[9px] text-amber-400 font-bold uppercase tracking-widest mb-2">⚡ Equipment Found!</div>';
            for (var j = 0; j < equipDrops.length; j++) {
                var eq = equipDrops[j];
                var eqColor = (typeof RARITY_COLORS !== 'undefined' && RARITY_COLORS[eq.rarity]) || '#9ca3af';
                var typeIcon = eq.type === 'weapon' ? '⚔️' : (eq.type === 'armor' ? '🛡️' : '💍');
                equipHtml += '<div class="flex items-center gap-2 text-[10px] py-1">' +
                    '<span>' + typeIcon + '</span>' +
                    '<span class="font-bold" style="color:' + eqColor + '">' + eq.name + '</span>' +
                    '<span class="text-gray-500 uppercase text-[8px]">' + eq.rarity + '</span>' +
                '</div>';
            }
            equipHtml += '</div>';
        }

        var modal = document.createElement('div');
        modal.id = 'sweep-results-modal';
        modal.className = 'fixed inset-0 z-[9500] flex items-center justify-center';
        modal.innerHTML = '' +
            '<div class="absolute inset-0 bg-black/60" onclick="document.getElementById(\'sweep-results-modal\').remove()"></div>' +
            '<div class="relative bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 max-w-[320px] w-full mx-4 shadow-2xl" style="box-shadow: 0 0 40px rgba(168,85,247,0.2);">' +
                '<div class="text-center mb-4">' +
                    '<div class="text-2xl mb-1">⚡</div>' +
                    '<div class="font-black text-white text-[16px] uppercase tracking-widest">SWEEP COMPLETE</div>' +
                    '<div class="text-[10px] text-purple-400 font-bold mt-1">' + waves + ' Waves Cleared Instantly</div>' +
                '</div>' +
                '<div class="grid grid-cols-2 gap-2">' +
                    lootHtml +
                '</div>' +
                equipHtml +
                '<button onclick="document.getElementById(\'sweep-results-modal\').remove()" class="mt-4 w-full bg-purple-700 hover:bg-purple-600 text-white font-bold py-2.5 rounded-xl text-[11px] uppercase tracking-widest cursor-pointer border border-purple-500/50 transition-all">' +
                    '✓ COLLECT' +
                '</button>' +
            '</div>';

        document.body.appendChild(modal);
    }

    // ---- UI: SWEEP BUTTON ----
    function createSweepButton() {
        if (document.getElementById('sweep-btn')) return;

        var btn = document.createElement('button');
        btn.id = 'sweep-btn';
        btn.className = 'text-white font-black px-3 py-1 rounded-lg text-[10px] sm:text-xs uppercase tracking-wider cursor-pointer transition-all';
        btn.textContent = '⚡ SWEEP';
        btn.title = 'Instantly clear previously beaten waves for loot';
        btn.onclick = function(e) { e.stopPropagation(); executeSweep(); };

        // Insert into combat strip (below top bar)
        if (typeof ensureCombatStrip === 'function') {
            var strip = ensureCombatStrip();
            if (strip) { strip.appendChild(btn); updateSweepButton(); return; }
        }
        // Fallback: top bar
        var topBar = document.querySelector('#arena > .absolute.top-0');
        if (topBar) topBar.appendChild(btn);

        updateSweepButton();
    }

    function updateSweepButton() {
        var btn = document.getElementById('sweep-btn');
        if (!btn) return;

        var highestWave = (state.stats && state.stats.highestWave) || state.wave;
        if (highestWave < MIN_WAVE_FOR_SWEEP) {
            btn.style.display = 'none';
            return;
        }

        btn.style.display = '';
        var canDo = canSweep();
        btn.disabled = !canDo;

        if (!canDo && Date.now() - lastSweepTime < SWEEP_COOLDOWN_MS) {
            var remaining = Math.ceil((SWEEP_COOLDOWN_MS - (Date.now() - lastSweepTime)) / 1000);
            btn.textContent = '⏳ ' + remaining + 's';
        } else {
            var sweepable = getSweepableWaves();
            btn.textContent = '⚡ SWEEP (' + sweepable + ')';
        }
    }

    // ---- INIT ----
    function initSweep() {
        createSweepButton();
        // Update button every second (for cooldown timer)
        setInterval(updateSweepButton, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(initSweep, 2500); });
    } else {
        setTimeout(initSweep, 2500);
    }

    // Export
    window.executeSweep = executeSweep;
    window.canSweep = canSweep;
    window.updateSweepButton = updateSweepButton;
})();
