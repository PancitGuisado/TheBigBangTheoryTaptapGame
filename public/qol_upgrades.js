/**
 * qol_upgrades.js — Quality of Life Improvements for TBBT Idle Game
 *
 * Features:
 *   1. Collect All  – batch-claim quest / daily-mission / achievement rewards
 *   2. Battle Speed Sync – keep gameSpeedMultiplier in sync with state.battleSpeed
 *   3. Bulk Heal    – one-click heal all hospitalized characters
 *   4. Formation Presets – 3 save / load slots in the lineup editor
 */
(function () {
    'use strict';

    /* ------------------------------------------------------------------ */
    /*  CSS Injection                                                      */
    /* ------------------------------------------------------------------ */
    var style = document.createElement('style');
    style.textContent = [
        '#heal-all-btn {',
        '  font-size:9px;font-weight:700;padding:4px 10px;box-sizing:border-box;border-radius:6px;cursor:pointer;',
        '  transition:all 0.2s;border:1px solid #34d399;color:#fff;',
        '  background:linear-gradient(135deg,#059669,#10b981);',
        '  text-shadow:0 1px 2px rgba(0,0,0,0.3);',
        '}',
        '#heal-all-btn:hover {',
        '  background:linear-gradient(135deg,#047857,#059669);',
        '  transform:scale(1.05);box-shadow:0 0 8px rgba(16,185,129,0.4);',
        '}',
        '.qol-collect-all-btn {',
        '  background:linear-gradient(135deg,#f59e0b,#d97706);',
        '  border:1px solid #fbbf24;color:#fff;font-size:7px;font-weight:900;',
        '  letter-spacing:1px;text-transform:uppercase;padding:3px 10px;box-sizing:border-box;',
        '  border-radius:4px;cursor:pointer;transition:all 0.2s;',
        '}',
        '.qol-collect-all-btn:hover {',
        '  background:linear-gradient(135deg,#d97706,#b45309);',
        '  transform:scale(1.05);box-shadow:0 0 8px rgba(245,158,11,0.4);',
        '}',
        '.qol-preset-btn:hover {',
        '  transform:scale(1.05);box-shadow:0 0 6px rgba(96,165,250,0.3);',
        '}',
        '#qol-save-menu {',
        '  position:absolute;top:100%;left:50%;transform:translateX(-50%);',
        '  background:#1e293b;border:1px solid #475569;border-radius:6px;',
        '  padding:4px;z-index:999;min-width:100px;box-shadow:0 4px 12px rgba(0,0,0,0.5);',
        '}',
        '#qol-save-menu button {',
        '  display:block;width:100%;padding:4px 8px;box-sizing:border-box;font-size:8px;font-weight:700;',
        '  color:#e2e8f0;background:transparent;border:none;cursor:pointer;',
        '  border-radius:3px;text-align:left;white-space:nowrap;',
        '}',
        '#qol-save-menu button:hover {',
        '  background:#334155;color:#fbbf24;',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    /* ------------------------------------------------------------------ */
    /*  State Migration                                                    */
    /* ------------------------------------------------------------------ */
    function ensureState() {
        if (typeof state === 'undefined') return false;
        if (!state.formationPresets) state.formationPresets = [null, null, null];
        if (!state.hospitalized) state.hospitalized = [];
        if (!state.food) state.food = {};
        if (!state.formation) state.formation = { front: [null, null], mid: [null, null, null], back: [null, null, null], bots: [null, null, null] };
        return true;
    }

    /* ================================================================== */
    /*  Feature 1 — Collect All                                            */
    /* ================================================================== */

    /**
     * Create a styled "Collect All" button.
     * @param {string} label  Button text
     * @returns {HTMLButtonElement}
     */
    function createCollectAllBtn(label) {
        var btn = document.createElement('button');
        btn.className = 'qol-collect-all-btn';
        btn.textContent = label;
        return btn;
    }

    /**
     * Find every visible, enabled CLAIM button inside a container and click
     * them with an 80 ms stagger. Returns the count of buttons clicked.
     */
    function collectAllInModal(container) {
        if (!container) return;
        var buttons = container.querySelectorAll('button');
        var claimBtns = [];
        for (var i = 0; i < buttons.length; i++) {
            var b = buttons[i];
            if (b.textContent.trim().toUpperCase() === 'CLAIM' && !b.disabled) {
                claimBtns.push(b);
            }
        }
        if (claimBtns.length === 0) {
            if (typeof showToast === 'function') showToast('Nothing to collect!', 'info');
            return;
        }
        var count = claimBtns.length;
        claimBtns.forEach(function (btn, idx) {
            setTimeout(function () { btn.click(); }, idx * 80);
        });
        setTimeout(function () {
            if (typeof showToast === 'function') showToast('Collected ' + count + ' reward' + (count > 1 ? 's' : '') + '!', 'success');
        }, count * 80 + 50);
    }

    /* ---------- Injection helpers ---------- */

    function injectCollectAllQuests(modal) {
        if (modal.querySelector('.qol-collect-all-btn')) return;
        var divs = modal.querySelectorAll('div');
        for (var i = 0; i < divs.length; i++) {
            if (divs[i].textContent.trim().indexOf('MISSION BOARD') !== -1) {
                var btn = createCollectAllBtn('Collect All');
                btn.addEventListener('click', function () { collectAllInModal(modal); });
                divs[i].appendChild(btn);
                return;
            }
        }
    }

    function injectCollectAllDailyMissions(modal) {
        if (modal.querySelector('.qol-collect-all-btn')) return;
        var divs = modal.querySelectorAll('div');
        for (var i = 0; i < divs.length; i++) {
            if (divs[i].textContent.trim().indexOf('DAILY MISSIONS') !== -1) {
                var btn = createCollectAllBtn('Collect All');
                btn.addEventListener('click', function () { collectAllInModal(modal); });
                divs[i].parentNode.insertBefore(btn, divs[i].nextSibling);
                return;
            }
        }
    }

    function injectCollectAllAchievements(modal) {
        if (modal.querySelector('.qol-collect-all-btn')) return;
        var divs = modal.querySelectorAll('div');
        for (var i = 0; i < divs.length; i++) {
            var txt = divs[i].textContent.trim();
            if (txt.length > 0 && txt.length < 40 && divs[i].children.length === 0) {
                var btn = createCollectAllBtn('Collect All');
                btn.addEventListener('click', function () { collectAllInModal(modal); });
                divs[i].appendChild(btn);
                return;
            }
        }
    }

    /* ---------- MutationObserver for modals ---------- */

    var collectObserver = new MutationObserver(function (mutations) {
        for (var m = 0; m < mutations.length; m++) {
            var added = mutations[m].addedNodes;
            for (var n = 0; n < added.length; n++) {
                var node = added[n];
                if (node.nodeType !== 1) continue;

                // Quests modal
                var questsModal = node.id === 'quests-modal' ? node : node.querySelector && node.querySelector('#quests-modal');
                if (questsModal) injectCollectAllQuests(questsModal);

                // Daily missions overlay
                var dmOverlay = (node.classList && node.classList.contains('dm-overlay')) ? node : node.querySelector && node.querySelector('.dm-overlay');
                if (dmOverlay) injectCollectAllDailyMissions(dmOverlay);

                // Achievements modal
                var achModal = node.id === 'achievements-modal' ? node : node.querySelector && node.querySelector('#achievements-modal');
                if (achModal) injectCollectAllAchievements(achModal);
            }
        }
    });
    collectObserver.observe(document.body, { childList: true, subtree: true });

    /* ================================================================== */
    /*  Feature 2 — Battle Speed Sync                                      */
    /* ================================================================== */

    function syncBattleSpeed() {
        window.gameSpeedMultiplier = (typeof state !== 'undefined' && state.battleSpeed) ? state.battleSpeed : 1;
    }

    syncBattleSpeed();
    setInterval(syncBattleSpeed, 5000);

    /* ================================================================== */
    /*  Feature 3 — Bulk Heal                                              */
    /* ================================================================== */

    function healAllCharacters() {
        if (!ensureState()) return;

        // Build sorted food list (cheapest HP restore first)
        var availableFood = [];
        for (var type in state.food) {
            if (state.food[type] > 0 && foods && foods[type]) {
                availableFood.push({ type: type, hpRestore: foods[type].hpRestore || 0, qty: state.food[type] });
            }
        }
        availableFood.sort(function (a, b) { return a.hpRestore - b.hpRestore; });

        if (availableFood.length === 0) {
            if (typeof showToast === 'function') showToast('No food available!', 'warning');
            return;
        }

        var healed = 0;
        var totalFed = 0;

        var hospitalized = state.hospitalized || [];
        for (var h = 0; h < hospitalized.length; h++) {
            var charKey = hospitalized[h];
            if (!charKey) continue;
            var charData = characters && characters[charKey];
            if (!charData) continue;

            var maxHp = charData.hp || charData.maxHp || 100;
            var curHp = (state.characterHp && state.characterHp[charKey] !== undefined) ? state.characterHp[charKey] : 0;
            var threshold = maxHp * 0.5;
            var didHeal = false;

            for (var f = 0; f < availableFood.length && curHp < threshold; f++) {
                var food = availableFood[f];
                while (food.qty > 0 && curHp < threshold) {
                    if (typeof useFoodForRecovery === 'function') {
                        useFoodForRecovery(charKey, food.type);
                    }
                    food.qty--;
                    state.food[food.type] = food.qty;
                    curHp += food.hpRestore;
                    totalFed++;
                    didHeal = true;
                }
            }
            if (didHeal) healed++;
        }

        if (healed > 0) {
            if (typeof showToast === 'function') showToast('Healed ' + healed + ' character' + (healed > 1 ? 's' : '') + ' (' + totalFed + ' food used)', 'success');
        } else {
            if (typeof showToast === 'function') showToast('No characters need healing', 'info');
        }

        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
    }

    /* ---------- Heal All Button ---------- */

    function createHealAllButton() {
        var arena = document.getElementById('arena');
        if (!arena || !arena.parentElement) return;

        var btn = document.createElement('button');
        btn.id = 'heal-all-btn';
        btn.textContent = '💊 Heal All';
        btn.style.cssText = 'position:absolute;bottom:56px;left:150px;z-index:55;display:none;';
        btn.addEventListener('click', healAllCharacters);
        arena.parentElement.appendChild(btn);
    }

    function updateHealAllButton() {
        var btn = document.getElementById('heal-all-btn');
        if (!btn) return;
        if (!ensureState()) { btn.style.display = 'none'; return; }

        var hospCount = (state.hospitalized && state.hospitalized.length) ? state.hospitalized.length : 0;
        if (hospCount > 0) {
            btn.style.display = '';
            btn.textContent = '💊 Heal All (' + hospCount + ')';
        } else {
            btn.style.display = 'none';
        }
    }

    /* ================================================================== */
    /*  Feature 4 — Formation Presets                                      */
    /* ================================================================== */

    function qolSavePreset(slotIndex) {
        if (!ensureState()) return;
        state.formationPresets[slotIndex] = JSON.parse(JSON.stringify(state.formation));
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof showToast === 'function') showToast('Formation saved to Slot ' + (slotIndex + 1), 'success');
        refreshPresetBar();
    }

    function qolLoadPreset(slotIndex) {
        if (!ensureState()) return;
        var preset = state.formationPresets[slotIndex];
        if (!preset) {
            if (typeof showToast === 'function') showToast('Slot ' + (slotIndex + 1) + ' is empty', 'warning');
            return;
        }
        state.formation = JSON.parse(JSON.stringify(preset));
        if (typeof syncFormationToEquipped === 'function') syncFormationToEquipped();
        if (typeof renderLineupEditor === 'function') renderLineupEditor();
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof showToast === 'function') showToast('Loaded formation from Slot ' + (slotIndex + 1), 'success');
    }

    /* ---------- Preset Bar UI ---------- */

    function buildPresetBar() {
        var bar = document.createElement('div');
        bar.id = 'formation-presets-bar';
        bar.style.cssText = 'display:flex;gap:4px;padding:6px 12px;box-sizing:border-box;background:rgba(15,23,42,0.9);border-bottom:1px solid rgba(245,158,11,0.15);align-items:center;justify-content:center;flex-wrap:wrap;';

        ensureState();

        // 3 Load buttons
        for (var i = 0; i < 3; i++) {
            (function (idx) {
                var hasData = state.formationPresets && state.formationPresets[idx];
                var loadBtn = document.createElement('button');
                loadBtn.className = 'qol-preset-btn';
                loadBtn.textContent = 'Slot ' + (idx + 1);
                loadBtn.style.cssText = 'font-size:8px;font-weight:700;padding:3px 8px;box-sizing:border-box;border-radius:4px;cursor:pointer;transition:all 0.2s;';
                if (hasData) {
                    loadBtn.style.background = 'linear-gradient(135deg,#1e40af,#3b82f6)';
                    loadBtn.style.border = '1px solid #60a5fa';
                    loadBtn.style.color = '#fff';
                } else {
                    loadBtn.style.background = '#1e293b';
                    loadBtn.style.border = '1px solid #334155';
                    loadBtn.style.color = '#64748b';
                }
                loadBtn.addEventListener('click', function () { qolLoadPreset(idx); });
                bar.appendChild(loadBtn);
            })(i);
        }

        // Save dropdown button
        var saveWrap = document.createElement('div');
        saveWrap.style.cssText = 'position:relative;display:inline-block;';

        var saveBtn = document.createElement('button');
        saveBtn.className = 'qol-preset-btn';
        saveBtn.textContent = 'Save ▼';
        saveBtn.style.cssText = 'font-size:8px;font-weight:700;padding:3px 8px;box-sizing:border-box;border-radius:4px;cursor:pointer;transition:all 0.2s;background:linear-gradient(135deg,#15803d,#22c55e);border:1px solid #4ade80;color:#fff;';

        var saveMenu = document.createElement('div');
        saveMenu.id = 'qol-save-menu';
        saveMenu.style.display = 'none';

        for (var s = 0; s < 3; s++) {
            (function (idx) {
                var menuBtn = document.createElement('button');
                menuBtn.textContent = 'Save to Slot ' + (idx + 1);
                menuBtn.addEventListener('click', function () {
                    qolSavePreset(idx);
                    saveMenu.style.display = 'none';
                });
                saveMenu.appendChild(menuBtn);
            })(s);
        }

        saveBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            saveMenu.style.display = saveMenu.style.display === 'none' ? '' : 'none';
        });

        // Close on outside click
        document.addEventListener('click', function () {
            saveMenu.style.display = 'none';
        });

        saveWrap.appendChild(saveBtn);
        saveWrap.appendChild(saveMenu);
        bar.appendChild(saveWrap);

        return bar;
    }

    function refreshPresetBar() {
        var modal = document.getElementById('lineup-editor-modal');
        if (!modal) return;
        var existing = document.getElementById('formation-presets-bar');
        if (existing) existing.remove();
        injectPresetBar(modal);
    }

    function injectPresetBar(modal) {
        if (document.getElementById('formation-presets-bar')) return;
        var header = modal.querySelector('.border-b');
        var content = modal.querySelector('#lineup-editor-content');
        if (!header && !content) return;

        var bar = buildPresetBar();

        if (header && header.nextSibling) {
            header.parentNode.insertBefore(bar, header.nextSibling);
        } else if (content) {
            content.parentNode.insertBefore(bar, content);
        }
    }

    /* ---------- Watch lineup modal visibility ---------- */

    function watchLineupModal() {
        var lineupObserver = new MutationObserver(function (mutations) {
            for (var m = 0; m < mutations.length; m++) {
                var target = mutations[m].target;
                if (target.id === 'lineup-editor-modal' && mutations[m].attributeName === 'class') {
                    // Modal became visible — inject bar
                    var isHidden = target.classList.contains('hidden') || target.style.display === 'none';
                    if (!isHidden) {
                        setTimeout(function () { injectPresetBar(target); }, 100);
                    }
                }
            }
        });

        var tryObserve = function () {
            var modal = document.getElementById('lineup-editor-modal');
            if (modal) {
                lineupObserver.observe(modal, { attributes: true, attributeFilter: ['class'] });
                // Also inject immediately if already visible
                var isHidden = modal.classList.contains('hidden') || modal.style.display === 'none';
                if (!isHidden) injectPresetBar(modal);
            } else {
                setTimeout(tryObserve, 2000);
            }
        };
        tryObserve();
    }

    /* ================================================================== */
    /*  Window Exports                                                     */
    /* ================================================================== */
    window.qolCollectAll = collectAllInModal;
    window.qolHealAll = healAllCharacters;
    window.qolSavePreset = qolSavePreset;
    window.qolLoadPreset = qolLoadPreset;

    /* ================================================================== */
    /*  Initialization                                                     */
    /* ================================================================== */
    function init() {
        ensureState();
        createHealAllButton();
        watchLineupModal();
        setInterval(updateHealAllButton, 2000);
    }

    setTimeout(init, 1500);

})();
