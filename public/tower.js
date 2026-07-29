// ============================================================
// TOWER MODULE — "The Elevator Shaft"
// Standalone module: injects UI, CSS, state, and combat hooks.
// Relies on globals: state, currentEnemy, minionTypes, bossTypes,
//   formatNumber, saveProgress, syncUI, addEquipmentToInventory,
//   renderEquipmentDropNotification, RARITY_COLORS
// ============================================================
(function () {
    'use strict';

    // ===================== CONSTANTS =====================
    var MAX_FLOOR = 100;
    var MAX_ENERGY = 10;
    var ENERGY_REGEN_MS = 30 * 60 * 1000; // 30 minutes
    var ENERGY_PER_ATTEMPT = 5;
    var DIAMOND_REFILL_COST = 50;
    var ENEMIES_PER_FLOOR_MIN = 10;
    var ENEMIES_PER_FLOOR_MAX = 10;

    // Floor difficulty tiers: [minFloor, maxFloor, hpMultLow, hpMultHigh, modCount]
    var FLOOR_TIERS = [
        [1,  20,  1,   3,   0],
        [21, 50,  3,   8,   1],
        [51, 80,  8,   20,  2],
        [81, 100, 20,  50,  [2, 3]]
    ];

    // Floor modifiers
    var FLOOR_MODIFIERS = [
        { key: 'burning',  icon: '🔥', name: 'Burning',  desc: 'Enemies deal 5% max HP fire damage/s',  color: '#ef4444' },
        { key: 'frozen',   icon: '🧊', name: 'Frozen',   desc: 'Player attack speed reduced 30%',       color: '#38bdf8' },
        { key: 'cursed',   icon: '💀', name: 'Cursed',   desc: 'No healing allowed on this floor',      color: '#a855f7' },
        { key: 'armored',  icon: '🛡️', name: 'Armored',  desc: 'Enemies take 30% less damage',          color: '#94a3b8' },
        { key: 'enraged',  icon: '⚡', name: 'Enraged',  desc: 'Enemies deal 50% more damage',          color: '#fbbf24' },
        { key: 'chaotic',  icon: '🌀', name: 'Chaotic',  desc: 'Enemy positions shuffle every 5s',      color: '#06b6d4' },
        { key: 'swift',    icon: '💨', name: 'Swift',    desc: 'Enemies attack 40% faster',             color: '#22c55e' },
        { key: 'vampiric', icon: '🩸', name: 'Vampiric', desc: 'Enemies heal 3% of damage dealt',       color: '#dc2626' }
    ];

    // Mini-boss names (every 10th floor)
    var MINI_BOSS_NAMES = [
        'The Cable Tangler',
        'Shaft Specter',
        'Rusty Counterweight',
        'Grease Phantom',
        'Dusty Pulley Lord',
        'The Flickering Light',
        'Static Sentinel',
        'The Jamming Mechanism',
        'Emergency Brake Beast',
        'The Elevator Itself'
    ];

    // Exclusive equipment rewards at milestone floors
    var MILESTONE_EQUIPMENT = {
        25: {
            key: 'tower_elevator_cable_whip',
            name: 'Elevator Cable Whip',
            type: 'weapon',
            rarity: 'epic',
            stats: { dmg: 45 }
        },
        50: {
            key: 'tower_maintenance_uniform',
            name: 'Maintenance Uniform',
            type: 'armor',
            rarity: 'epic',
            stats: { hp: 150 }
        },
        75: {
            key: 'tower_emergency_flashlight',
            name: 'Emergency Flashlight',
            type: 'accessory',
            rarity: 'legendary',
            stats: { critPct: 12, dmg: 15, speedPct: 5 }
        },
        100: {
            key: 'tower_elevator_key',
            name: 'Elevator Key',
            type: 'weapon',
            rarity: 'legendary',
            stats: { dmg: 100 }
        }
    };

    // ===================== STATE MANAGEMENT =====================

    function ensureTowerState() {
        if (!state.tower) {
            state.tower = {
                currentFloor: 1,
                bestFloor: 0,
                bestFloorAllTime: 0,
                energy: MAX_ENERGY,
                lastEnergyRegen: Date.now(),
                weeklyResetTimestamp: getNextMondayMidnight(),
                floorRewards: {},
                inProgress: false
            };
        }
        // Migrations
        if (state.tower.energy === undefined) state.tower.energy = MAX_ENERGY;
        if (state.tower.lastEnergyRegen === undefined) state.tower.lastEnergyRegen = Date.now();
        if (state.tower.weeklyResetTimestamp === undefined) state.tower.weeklyResetTimestamp = getNextMondayMidnight();
        if (state.tower.floorRewards === undefined) state.tower.floorRewards = {};
        if (state.tower.bestFloor === undefined) state.tower.bestFloor = 0;
        if (state.tower.bestFloorAllTime === undefined) state.tower.bestFloorAllTime = 0;
        if (state.tower.inProgress === undefined) state.tower.inProgress = false;
    }

    function getNextMondayMidnight() {
        var now = new Date();
        var day = now.getDay(); // 0=Sun,1=Mon,...
        var daysUntilMonday = (8 - day) % 7 || 7;
        var next = new Date(now);
        next.setDate(now.getDate() + daysUntilMonday);
        next.setHours(0, 0, 0, 0);
        return next.getTime();
    }

    function checkWeeklyReset() {
        ensureTowerState();
        if (Date.now() >= state.tower.weeklyResetTimestamp) {
            state.tower.currentFloor = 1;
            state.tower.bestFloor = 0;
            state.tower.energy = MAX_ENERGY;
            state.tower.lastEnergyRegen = Date.now();
            state.tower.weeklyResetTimestamp = getNextMondayMidnight();
            state.tower.floorRewards = {};
            state.tower.inProgress = false;
            if (typeof saveProgress === 'function') saveProgress();
        }
    }

    function regenEnergy() {
        ensureTowerState();
        var now = Date.now();
        var elapsed = now - state.tower.lastEnergyRegen;
        var gained = Math.floor(elapsed / ENERGY_REGEN_MS);
        if (gained > 0 && state.tower.energy < MAX_ENERGY) {
            state.tower.energy = Math.min(MAX_ENERGY, state.tower.energy + gained);
            state.tower.lastEnergyRegen = now - (elapsed % ENERGY_REGEN_MS);
        }
    }

    function getNextRegenTime() {
        var now = Date.now();
        var elapsed = now - state.tower.lastEnergyRegen;
        var remaining = ENERGY_REGEN_MS - (elapsed % ENERGY_REGEN_MS);
        return remaining;
    }

    // ===================== FLOOR LOGIC =====================

    function getFloorTier(floor) {
        for (var i = 0; i < FLOOR_TIERS.length; i++) {
            if (floor >= FLOOR_TIERS[i][0] && floor <= FLOOR_TIERS[i][1]) return FLOOR_TIERS[i];
        }
        return FLOOR_TIERS[FLOOR_TIERS.length - 1];
    }

    function getFloorHpMultiplier(floor) {
        var tier = getFloorTier(floor);
        var low = tier[2], high = tier[3];
        var progress = (floor - tier[0]) / Math.max(1, tier[1] - tier[0]);
        var mult = low + (high - low) * progress;
        // Mini-boss: every 10th floor gets 3x more HP
        if (floor % 10 === 0) mult *= 3;
        // Floor 100 final boss
        if (floor === 100) mult *= 2;
        return mult;
    }

    function getFloorModifiers(floor) {
        var tier = getFloorTier(floor);
        var modCount = tier[4];
        if (Array.isArray(modCount)) {
            modCount = modCount[0] + Math.floor(Math.random() * (modCount[1] - modCount[0] + 1));
        }
        if (modCount === 0) return [];
        // Shuffle and pick
        var available = FLOOR_MODIFIERS.slice();
        var chosen = [];
        for (var i = 0; i < modCount && available.length > 0; i++) {
            var idx = Math.floor(Math.random() * available.length);
            chosen.push(available[idx]);
            available.splice(idx, 1);
        }
        return chosen;
    }

    function getFloorEnemyCount(floor) {
        return ENEMIES_PER_FLOOR_MIN + Math.floor(Math.random() * (ENEMIES_PER_FLOOR_MAX - ENEMIES_PER_FLOOR_MIN + 1));
    }

    function isMiniBossFloor(floor) {
        return floor % 10 === 0;
    }

    function isMajorBossFloor(floor) {
        return floor === 25 || floor === 50 || floor === 75 || floor === 100;
    }

    function getMiniBossName(floor) {
        // Use custom tower boss names if available
        var names = (typeof towerBossNames !== 'undefined') ? towerBossNames : MINI_BOSS_NAMES;
        if (floor === 100) return names[names.length - 1];
        var idx = Math.floor(floor / 10) - 1;
        return names[idx % names.length];
    }

    function getFloorDifficultyLabel(floor) {
        if (floor <= 20) return { label: 'EASY', color: '#22c55e' };
        if (floor <= 50) return { label: 'MEDIUM', color: '#fbbf24' };
        if (floor <= 80) return { label: 'HARD', color: '#ef4444' };
        return { label: 'NIGHTMARE', color: '#a855f7' };
    }

    // ===================== REWARD CALCULATION =====================

    function getFloorRewards(floor) {
        var isFirstClear = !state.tower.floorRewards[floor];
        var mult = isFirstClear ? 3 : 1;
        var money = Math.floor((50 + floor * 20) * mult * (1 + floor * 0.05));
        var stone = Math.floor((1 + floor * 0.3) * mult);
        var iron = Math.floor((0.5 + floor * 0.2) * mult);
        var gold = floor >= 20 ? Math.floor((floor * 0.1) * mult) : 0;
        var diamond = 0;
        var scrap = Math.floor((1 + floor * 0.15) * mult);

        // Every 10 floors: diamond bonus
        if (floor % 10 === 0) {
            diamond = Math.floor(5 + (floor / 10) * 2.5) * mult;
        }

        // Equipment at milestone floors (only first clear)
        var equipment = null;
        if (isFirstClear && MILESTONE_EQUIPMENT[floor]) {
            equipment = MILESTONE_EQUIPMENT[floor];
        }

        return {
            money: money,
            stone: stone,
            iron: iron,
            gold: gold,
            diamond: diamond,
            scrap: scrap,
            equipment: equipment,
            isFirstClear: isFirstClear
        };
    }

    function grantFloorRewards(floor) {
        var rewards = getFloorRewards(floor);
        state.resources.money += rewards.money;
        state.resources.stone += rewards.stone;
        state.resources.iron += rewards.iron;
        state.resources.gold += rewards.gold;
        state.resources.diamond += rewards.diamond;
        state.resources.scrap += rewards.scrap;

        // Mark as cleared
        state.tower.floorRewards[floor] = true;

        // Equipment drop
        if (rewards.equipment && typeof addEquipmentToInventory === 'function') {
            var eq = {
                id: 'tw_' + Date.now().toString(36) + '_' + floor,
                key: rewards.equipment.key,
                name: rewards.equipment.name,
                type: rewards.equipment.type,
                rarity: rewards.equipment.rarity,
                stats: Object.assign({}, rewards.equipment.stats),
                level: 1,
                equippedTo: null
            };
            addEquipmentToInventory(eq);
            if (typeof renderEquipmentDropNotification === 'function') {
                renderEquipmentDropNotification(eq);
            }
        }

        if (typeof saveProgress === 'function') saveProgress();
        return rewards;
    }

    // ===================== TOWER COMBAT STATE =====================

    var towerCombatState = {
        active: false,
        floor: 0,
        enemies: [],
        currentEnemyIndex: 0,
        modifiers: [],
        burnInterval: null,
        chaoticInterval: null,
        originalAtkSpeed: null,
        savedBackground: null
    };

    // Expose tower mode flag for external systems
    window.towerMode = false;

    function startFloor(floor) {
        ensureTowerState();
        regenEnergy();

        if (state.tower.energy < ENERGY_PER_ATTEMPT) {
            showTowerToast('Not enough energy! ⚡ ' + state.tower.energy + '/' + MAX_ENERGY, '#ef4444');
            return;
        }

        state.tower.energy -= ENERGY_PER_ATTEMPT;
        state.tower.inProgress = true;
        if (typeof saveProgress === 'function') saveProgress();

        // Set up combat state
        towerCombatState.active = true;
        towerCombatState.floor = floor;
        towerCombatState.currentEnemyIndex = 0;
        towerCombatState.modifiers = getFloorModifiers(floor);
        window.towerMode = true;

        // Generate enemies for this floor — use tower-specific enemies
        var count = getFloorEnemyCount(floor);
        var hpMult = getFloorHpMultiplier(floor);
        var enemies = [];

        var isBoss = isMiniBossFloor(floor);
        // Use tower-exclusive enemy rosters
        var allMinions = (typeof towerMinionTypes !== 'undefined' && towerMinionTypes.length > 0) ? towerMinionTypes : 
                         (typeof minionTypes !== 'undefined') ? minionTypes : [];
        var allBosses = (typeof towerBossTypes !== 'undefined' && towerBossTypes.length > 0) ? towerBossTypes : 
                        (typeof bossTypes !== 'undefined') ? bossTypes : [];

        for (var i = 0; i < count; i++) {
            var enemy;
            if (isBoss && i === count - 1) {
                // Assign specific boss per floor tier
                var bossIdx = Math.floor(floor / 10) - 1;
                if (bossIdx >= 0 && bossIdx < allBosses.length) {
                    enemy = allBosses[bossIdx];
                } else {
                    enemy = allBosses[allBosses.length - 1]; // Final boss fallback
                }
                enemies.push({
                    type: enemy,
                    maxHp: Math.floor(250 * enemy.hpMultiplier * hpMult),
                    isBoss: true,
                    name: enemy.name
                });
            } else {
                enemy = allMinions[Math.floor(Math.random() * allMinions.length)];
                var armorMod = towerCombatState.modifiers.some(function (m) { return m.key === 'armored'; }) ? 1.3 : 1.0;
                enemies.push({
                    type: enemy,
                    maxHp: Math.floor(40 * enemy.hpMultiplier * hpMult * armorMod),
                    isBoss: false,
                    name: enemy.name
                });
            }
        }
        towerCombatState.enemies = enemies;

        // Apply modifier effects
        applyModifierEffects();

        // Pause normal enemy spawning
        if (window.enemyAttackInterval) { clearInterval(window.enemyAttackInterval); window.enemyAttackInterval = null; }

        // Close modal and show combat HUD with elevator background
        closeTowerModal();
        showTowerCombatHUD();
        spawnTowerEnemy(0);
    }

    function spawnTowerEnemy(index) {
        if (index >= towerCombatState.enemies.length) {
            // Floor cleared!
            floorCleared();
            return;
        }

        towerCombatState.currentEnemyIndex = index;
        var enemyData = towerCombatState.enemies[index];

        // Set global currentEnemy
        currentEnemy.type = enemyData.type;
        currentEnemy.maxHp = enemyData.maxHp;
        currentEnemy.hp = enemyData.maxHp;

        // Update enemy display
        var enemyNameEl = document.getElementById('enemy-name');
        if (enemyNameEl) {
            var floorLabel = 'F' + towerCombatState.floor;
            if (enemyData.isBoss) {
                enemyNameEl.innerHTML = '<span style="color:#ff4444;font-size:12px;">💀</span> <span style="color:#a855f7;">' + floorLabel + '</span> <span style="color:#fbbf24;font-size:13px;letter-spacing:3px;">' + enemyData.name + '</span>';
            } else {
                enemyNameEl.innerText = floorLabel + ' ' + enemyData.name;
            }
        }

        var enemyTypeBadge = document.getElementById('enemy-type-badge');
        if (enemyTypeBadge) {
            if (enemyData.isBoss) {
                enemyTypeBadge.innerHTML = '🏗️ SHAFT BOSS';
                enemyTypeBadge.style.cssText = 'background:rgba(88,28,135,0.9);color:#d8b4fe;font-size:7px;padding:2px 6px;box-sizing:border-box;border-radius:4px;font-weight:bold;border:1px solid #7c3aed;box-shadow:0 0 8px rgba(124,58,237,0.4);';
            } else {
                enemyTypeBadge.innerHTML = '🏗️ SHAFT ' + (index + 1) + '/' + towerCombatState.enemies.length;
                enemyTypeBadge.style.cssText = 'background:rgba(30,58,138,0.9);color:#93c5fd;font-size:7px;padding:2px 6px;box-sizing:border-box;border-radius:4px;font-weight:bold;border:1px solid #3b82f6;';
            }
        }

        var enemyLevelBadge = document.getElementById('enemy-level-badge');
        if (enemyLevelBadge) {
            enemyLevelBadge.innerText = '🏗️ Floor ' + towerCombatState.floor;
        }

        // Update the elevator floor indicator in the background
        var floorNumEl = document.getElementById('tower-bg-floor-num');
        if (floorNumEl) floorNumEl.textContent = 'F' + towerCombatState.floor;

        // Update HP bar
        if (typeof updateEnemyHealthBar === 'function') updateEnemyHealthBar();

        // Render enemy graphic
        var frame = document.getElementById('enemy-graphic-frame');
        if (frame) {
            var rawScale = enemyData.type.scale || (enemyData.isBoss ? 1.3 : 1.0);
            var loreScale = enemyData.isBoss ? Math.min(rawScale, 1.3) : Math.min(rawScale, 1.0);
            var svgContent = (typeof getVectorFrame === 'function') ? (getVectorFrame(enemyData.type.key, true) || '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="gray"/></svg>') : '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="gray"/></svg>';

            var auraColor = enemyData.isBoss ? 'rgba(124,58,237,0.25)' : 'rgba(59,130,246,0.15)';
            var auraHtml = '<div style="position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(ellipse at center, ' + auraColor + ' 0%, transparent 70%);animation:bossAuraPulse 2s ease-in-out infinite;pointer-events:none;z-index:0;"></div>';
            var filterStyle = enemyData.isBoss ? 'filter:drop-shadow(0 0 8px rgba(124,58,237,0.6)) drop-shadow(0 0 20px rgba(124,58,237,0.3));' : 'filter:drop-shadow(0 0 5px rgba(59,130,246,0.4));';

            frame.innerHTML = auraHtml + '<div class="character-vector-wrapper flex items-center justify-center text-4xl" style="transform: scale(' + loreScale + '); transform-origin: bottom center; ' + filterStyle + ' position:relative;z-index:1;">' + svgContent + '</div>';
            frame.classList.remove('enemy-spawn-in', 'enemy-breathing', 'enemy-hurt', 'enemy-lunge', 'enemy-throw');
            void frame.offsetWidth;
            frame.classList.add('enemy-spawn-in', 'enemy-breathing');
        }
    }

    // Hook into the enemy defeat system
    function hookEnemyDefeat() {
        // We poll for enemy death while in tower mode
        // This runs on the same animation frame as the game's damage loop
        var _origCheck = null;

        setInterval(function () {
            if (!towerCombatState.active || !window.towerMode) return;
            if (!currentEnemy || currentEnemy.hp > 0) return;

            // Enemy defeated in tower mode - advance to next
            var nextIdx = towerCombatState.currentEnemyIndex + 1;

            // Vampiric heal cleanup
            if (towerCombatState.enemies[towerCombatState.currentEnemyIndex]) {
                // Small reward per enemy
                var smallReward = Math.floor(10 + towerCombatState.floor * 5);
                state.resources.money += smallReward;
            }

            if (nextIdx >= towerCombatState.enemies.length) {
                floorCleared();
            } else {
                spawnTowerEnemy(nextIdx);
            }
        }, 100);
    }

    function floorCleared() {
        clearModifierEffects();
        var floor = towerCombatState.floor;

        // Grant rewards
        var rewards = grantFloorRewards(floor);

        // Update best floor
        if (floor > state.tower.bestFloor) state.tower.bestFloor = floor;
        if (floor > state.tower.bestFloorAllTime) state.tower.bestFloorAllTime = floor;

        // Advance to next floor
        if (floor < MAX_FLOOR) {
            state.tower.currentFloor = floor + 1;
        }
        state.tower.inProgress = false;

        towerCombatState.active = false;
        window.towerMode = false;

        if (typeof saveProgress === 'function') saveProgress();

        // Show victory screen
        showFloorClearedModal(floor, rewards);

        // Restore normal enemy spawning and counter-attack
        if (typeof spawnEnemy === 'function') {
            setTimeout(function () { 
                spawnEnemy();
                // Restore enemy counter-attack interval
                if (!window.enemyAttackInterval) {
                    window.enemyAttackInterval = setInterval(function() {
                        if (!window.gameStarted) return;
                        if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
                        if (window.towerMode) return;
                        var locIdx = typeof locations !== 'undefined' ? Object.keys(locations).indexOf(state.currentLocation) : 0;
                        var locMult = locIdx > 0 ? Math.pow(1.5, locIdx) : 1;
                        var enemyCounterDmg = Math.floor(5 * Math.pow(1.10, state.wave - 1) * locMult);
                        if (typeof applyEnemyCounter === 'function') applyEnemyCounter(enemyCounterDmg);
                    }, 2000);
                }
            }, 500);
        }

        removeTowerCombatHUD();
    }

    function failFloor() {
        clearModifierEffects();
        towerCombatState.active = false;
        window.towerMode = false;
        state.tower.inProgress = false;

        if (typeof saveProgress === 'function') saveProgress();

        showTowerToast('Floor ' + towerCombatState.floor + ' failed! Energy lost but you can retry.', '#ef4444');

        // Restore normal enemy spawning and counter-attack
        if (typeof spawnEnemy === 'function') {
            setTimeout(function () { 
                spawnEnemy();
                if (!window.enemyAttackInterval) {
                    window.enemyAttackInterval = setInterval(function() {
                        if (!window.gameStarted) return;
                        if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
                        if (window.towerMode) return;
                        var locIdx = typeof locations !== 'undefined' ? Object.keys(locations).indexOf(state.currentLocation) : 0;
                        var locMult = locIdx > 0 ? Math.pow(1.5, locIdx) : 1;
                        var enemyCounterDmg = Math.floor(5 * Math.pow(1.10, state.wave - 1) * locMult);
                        if (typeof applyEnemyCounter === 'function') applyEnemyCounter(enemyCounterDmg);
                    }, 2000);
                }
            }, 500);
        }

        removeTowerCombatHUD();
    }

    // ===================== MODIFIER EFFECTS =====================

    function applyModifierEffects() {
        var mods = towerCombatState.modifiers;

        mods.forEach(function (mod) {
            switch (mod.key) {
                case 'burning':
                    // 5% max HP fire damage per second to player chars
                    towerCombatState.burnInterval = setInterval(function () {
                        if (!towerCombatState.active) { clearInterval(towerCombatState.burnInterval); return; }
                        var equippedChars = Object.keys(state.equipped || {}).filter(function (key) { return state.equipped[key]; });
                        equippedChars.forEach(function (key) {
                            var charState = state.roster[key];
                            if (charState && charState.status === 'healthy') {
                                var dmg = Math.floor(charState.maxHp * 0.05);
                                charState.currentHp = Math.max(1, charState.currentHp - dmg);
                            }
                        });
                    }, 1000);
                    break;

                case 'chaotic':
                    towerCombatState.chaoticInterval = setInterval(function () {
                        if (!towerCombatState.active) { clearInterval(towerCombatState.chaoticInterval); return; }
                        // Shuffle remaining enemies
                        var remaining = towerCombatState.enemies.slice(towerCombatState.currentEnemyIndex + 1);
                        for (var i = remaining.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            var temp = remaining[i]; remaining[i] = remaining[j]; remaining[j] = temp;
                        }
                        for (var k = 0; k < remaining.length; k++) {
                            towerCombatState.enemies[towerCombatState.currentEnemyIndex + 1 + k] = remaining[k];
                        }
                    }, 5000);
                    break;
            }
        });
    }

    function clearModifierEffects() {
        if (towerCombatState.burnInterval) { clearInterval(towerCombatState.burnInterval); towerCombatState.burnInterval = null; }
        if (towerCombatState.chaoticInterval) { clearInterval(towerCombatState.chaoticInterval); towerCombatState.chaoticInterval = null; }
    }

    // Expose modifier checks for external combat system hooks
    window.towerHasModifier = function (key) {
        if (!towerCombatState.active) return false;
        return towerCombatState.modifiers.some(function (m) { return m.key === key; });
    };

    // ===================== CSS INJECTION =====================

    function injectStyles() {
        if (document.getElementById('tower-styles')) return;
        var style = document.createElement('style');
        style.id = 'tower-styles';
        style.textContent = [
            // Modal backdrop & container
            '#tower-modal { position:fixed;inset:0;z-index:150;display:none;align-items:center;justify-content:center;padding:12px;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px); }',
            '#tower-modal.active { display:flex; }',
            '#tower-modal-inner { background:linear-gradient(145deg,#0c1222 0%,#151e35 50%,#0f1829 100%);border:1px solid rgba(124,58,237,0.3);border-radius:16px;max-width:440px;width:100%;box-sizing:border-box;max-height:90vh;overflow-y:auto;max-height:90vh;overflow-y:auto;box-shadow:0 0 60px rgba(124,58,237,0.15),0 0 120px rgba(0,0,0,0.8);position:relative;scrollbar-width:none; }',
            '#tower-modal-inner::-webkit-scrollbar { display:none; }',

            // Elevator shaft visualization
            '.tower-shaft { position:relative;width:100%;min-height:200px;background:linear-gradient(180deg,#0a0e1a 0%,#111827 50%,#1a1025 100%);border-radius:12px;overflow:hidden;border:1px solid rgba(124,58,237,0.2); }',
            '.tower-shaft::before { content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(180deg,rgba(124,58,237,0.1),rgba(124,58,237,0.4),rgba(124,58,237,0.1));transform:translateX(-50%);z-index:1; }',

            // Floor indicator
            '.tower-floor-indicator { position:relative;display:flex;align-items:center;gap:8px;padding:6px 12px;box-sizing:border-box;border-radius:8px;transition:all 0.2s ease;cursor:default;z-index:2; }',
            '.tower-floor-indicator.current { background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.5);box-shadow:0 0 15px rgba(124,58,237,0.2); }',
            '.tower-floor-indicator.cleared { opacity:0.5; }',
            '.tower-floor-indicator.locked { opacity:0.25; }',
            '.tower-floor-indicator.boss { background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3); }',

            // Floor number badge
            '.floor-num { width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;flex-shrink:0; }',
            '.floor-num.cleared { background:rgba(34,197,94,0.2);border:1px solid rgba(34,197,94,0.5);color:#4ade80; }',
            '.floor-num.current { background:rgba(124,58,237,0.3);border:2px solid #a855f7;color:#d8b4fe;animation:towerPulse 2s ease-in-out infinite; }',
            '.floor-num.locked { background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);color:#64748b; }',
            '.floor-num.boss { background:rgba(239,68,68,0.25);border:2px solid #ef4444;color:#fca5a5; }',

            // Energy bar
            '.tower-energy-bar { display:flex;align-items:center;gap:6px;padding:8px 12px;box-sizing:border-box;background:rgba(0,0,0,0.3);border-radius:10px;border:1px solid rgba(251,191,36,0.2); }',
            '.energy-pip { width:16px;height:8px;border-radius:3px;transition:all 0.3s ease; }',
            '.energy-pip.full { background:linear-gradient(135deg,#fbbf24,#f59e0b);box-shadow:0 0 6px rgba(251,191,36,0.5); }',
            '.energy-pip.empty { background:rgba(100,116,139,0.2);border:1px solid rgba(100,116,139,0.2); }',

            // Descend button
            '.tower-descend-btn { width:100%;padding:12px;border:2px solid rgba(124,58,237,0.6);border-radius:12px;background:linear-gradient(135deg,rgba(124,58,237,0.3),rgba(88,28,135,0.4));color:#d8b4fe;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:3px;cursor:pointer;transition:all 0.2s ease;text-shadow:0 0 10px rgba(124,58,237,0.5); }',
            '.tower-descend-btn:hover { background:linear-gradient(135deg,rgba(124,58,237,0.5),rgba(88,28,135,0.6));border-color:#a855f7;box-shadow:0 0 25px rgba(124,58,237,0.4);transform:translateY(-1px); }',
            '.tower-descend-btn:active { transform:scale(0.97); }',
            '.tower-descend-btn:disabled { opacity:0.35;cursor:not-allowed;transform:none;box-shadow:none; }',

            // Refill button
            '.tower-refill-btn { padding:6px 14px;box-sizing:border-box;border-radius:8px;border:1px solid rgba(251,191,36,0.4);background:rgba(251,191,36,0.1);color:#fbbf24;font-size:9px;font-weight:700;cursor:pointer;transition:all 0.2s;text-transform:uppercase;letter-spacing:1px; }',
            '.tower-refill-btn:hover { background:rgba(251,191,36,0.2);border-color:#fbbf24; }',

            // Modifier badges
            '.tower-mod-badge { display:inline-flex;align-items:center;gap:3px;padding:3px 8px;box-sizing:border-box;border-radius:6px;font-size:9px;font-weight:700;border:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.3); }',

            // Reward preview
            '.tower-reward-row { display:flex;align-items:center;gap:4px;font-size:9px;color:#94a3b8; }',

            // Combat HUD
            '#tower-combat-hud { position:fixed;top:38px;left:50%;transform:translateX(-50%);z-index:55;pointer-events:none;width:min(90%,380px); }',
            '#tower-combat-hud-inner { background:rgba(15,20,40,0.95);border:2px solid rgba(124,58,237,0.6);border-radius:10px;padding:6px 12px;box-sizing:border-box;box-shadow:0 0 20px rgba(124,58,237,0.3); }',

            // Floor cleared modal
            '#tower-cleared-modal { position:fixed;inset:0;z-index:160;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px); }',
            '#tower-cleared-modal.active { display:flex; }',

            // Toast notification
            '.tower-toast { position:fixed;top:50px;left:50%;transform:translateX(-50%) translateY(-20px);z-index:200;padding:10px 20px;box-sizing:border-box;border-radius:10px;font-size:11px;font-weight:700;color:white;opacity:0;transition:all 0.3s ease;pointer-events:none; }',
            '.tower-toast.show { opacity:1;transform:translateX(-50%) translateY(0); }',

            // Animations
            '@keyframes towerPulse { 0%,100% { box-shadow:0 0 8px rgba(124,58,237,0.3); } 50% { box-shadow:0 0 20px rgba(124,58,237,0.6); } }',
            '@keyframes towerSlideUp { from { opacity:0;transform:translateY(20px); } to { opacity:1;transform:translateY(0); } }',
            '@keyframes towerGlow { 0%,100% { text-shadow:0 0 10px rgba(124,58,237,0.5); } 50% { text-shadow:0 0 25px rgba(124,58,237,0.8),0 0 40px rgba(124,58,237,0.3); } }',

            // Retreat button
            '.tower-retreat-btn { padding:4px 12px;box-sizing:border-box;border-radius:6px;border:1px solid rgba(239,68,68,0.4);background:rgba(239,68,68,0.15);color:#fca5a5;font-size:8px;font-weight:700;cursor:pointer;pointer-events:auto;transition:all 0.15s;text-transform:uppercase;letter-spacing:1px; }',
            '.tower-retreat-btn:hover { background:rgba(239,68,68,0.3);border-color:#ef4444; }',

            // Scrollbar for shaft
            '.tower-shaft-scroll { max-height:280px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(124,58,237,0.3) transparent; }',
            '.tower-shaft-scroll::-webkit-scrollbar { width:4px; }',
            '.tower-shaft-scroll::-webkit-scrollbar-track { background:transparent; }',
            '.tower-shaft-scroll::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.3);border-radius:2px; }'
        ].join('\n');
        document.head.appendChild(style);
    }

    // ===================== TOAST =====================

    function showTowerToast(msg, color) {
        var existing = document.querySelector('.tower-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'tower-toast';
        toast.style.background = color || '#1e293b';
        toast.style.border = '1px solid ' + (color || '#334155');
        toast.textContent = msg;
        document.body.appendChild(toast);

        requestAnimationFrame(function () {
            toast.classList.add('show');
        });

        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { if (toast.parentNode) toast.remove(); }, 300);
        }, 2500);
    }

    // ===================== TOWER MODAL UI =====================

    function openTowerModal() {
        ensureTowerState();
        checkWeeklyReset();
        regenEnergy();

        var modal = document.getElementById('tower-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'tower-modal';
            document.body.appendChild(modal);
        }

        var floor = state.tower.currentFloor;
        var diff = getFloorDifficultyLabel(floor);
        var rewards = getFloorRewards(floor);
        var mods = getFloorModifiers(floor); // Preview modifiers

        // Regen timer
        var regenMs = getNextRegenTime();
        var regenMin = Math.floor(regenMs / 60000);
        var regenSec = Math.floor((regenMs % 60000) / 1000);
        var regenText = state.tower.energy < MAX_ENERGY ? (regenMin + ':' + (regenSec < 10 ? '0' : '') + regenSec) : 'Full';

        // Weekly reset timer
        var resetMs = state.tower.weeklyResetTimestamp - Date.now();
        var resetDays = Math.floor(resetMs / 86400000);
        var resetHours = Math.floor((resetMs % 86400000) / 3600000);
        var resetText = resetDays + 'd ' + resetHours + 'h';

        // Build floor shaft visualization (show 7 floors centered on current)
        var shaftHTML = '';
        var startFloor = Math.max(1, floor - 3);
        var endFloor = Math.min(MAX_FLOOR, floor + 3);

        for (var f = endFloor; f >= startFloor; f--) {
            var isCurrent = f === floor;
            var isCleared = state.tower.floorRewards[f];
            var isLocked = f > floor;
            var isBossF = isMiniBossFloor(f);
            var isMajorF = isMajorBossFloor(f);

            var floorClass = 'tower-floor-indicator';
            var numClass = 'floor-num';
            if (isCurrent) { floorClass += ' current'; numClass += ' current'; }
            else if (isCleared) { floorClass += ' cleared'; numClass += ' cleared'; }
            else if (isLocked) { floorClass += ' locked'; numClass += ' locked'; }
            if (isBossF || isMajorF) { floorClass += ' boss'; numClass += ' boss'; }

            var floorLabel = '';
            if (isMajorF) floorLabel = '<span style="color:#f59e0b;font-size:8px;font-weight:800;">⭐ MAJOR BOSS</span>';
            else if (isBossF) floorLabel = '<span style="color:#ef4444;font-size:8px;font-weight:700;">💀 Mini-Boss</span>';
            else if (isCleared) floorLabel = '<span style="color:#22c55e;font-size:8px;">✓ Cleared</span>';
            else if (isLocked) floorLabel = '<span style="color:#64748b;font-size:8px;">🔒 Locked</span>';

            var fDiff = getFloorDifficultyLabel(f);

            shaftHTML += '<div class="' + floorClass + '">' +
                '<div class="' + numClass + '">' + f + '</div>' +
                '<div style="flex:1;min-width:0;">' +
                    '<div style="display:flex;align-items:center;gap:6px;">' +
                        '<span style="font-size:10px;font-weight:700;color:' + (isCurrent ? '#d8b4fe' : isCleared ? '#4ade80' : '#94a3b8') + ';">Floor ' + f + '</span>' +
                        '<span style="font-size:7px;color:' + fDiff.color + ';font-weight:700;text-transform:uppercase;letter-spacing:1px;">' + fDiff.label + '</span>' +
                    '</div>' +
                    '<div style="margin-top:2px;">' + floorLabel + '</div>' +
                '</div>' +
                (isCurrent ? '<span style="color:#a855f7;font-size:14px;animation:towerPulse 2s infinite;">▼</span>' : '') +
            '</div>';
        }

        // Modifier preview for current floor
        var modHTML = '';
        if (mods.length > 0) {
            modHTML = '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">';
            mods.forEach(function (mod) {
                modHTML += '<span class="tower-mod-badge" style="color:' + mod.color + ';border-color:' + mod.color + '33;" title="' + mod.desc + '">' + mod.icon + ' ' + mod.name + '</span>';
            });
            modHTML += '</div>';
        } else {
            modHTML = '<div style="font-size:9px;color:#4b5563;margin-top:4px;">No modifiers on this floor</div>';
        }

        // Reward preview
        var rewardHTML = '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;">';
        if (rewards.money) rewardHTML += '<span class="tower-reward-row">💰 ' + formatNumber(rewards.money) + '</span>';
        if (rewards.stone) rewardHTML += '<span class="tower-reward-row">🧪 ' + rewards.stone + '</span>';
        if (rewards.iron) rewardHTML += '<span class="tower-reward-row">⚙️ ' + rewards.iron + '</span>';
        if (rewards.gold) rewardHTML += '<span class="tower-reward-row">🏅 ' + rewards.gold + '</span>';
        if (rewards.diamond) rewardHTML += '<span class="tower-reward-row">💎 ' + rewards.diamond + '</span>';
        if (rewards.scrap) rewardHTML += '<span class="tower-reward-row">🔩 ' + rewards.scrap + '</span>';
        rewardHTML += '</div>';

        if (rewards.equipment) {
            var rarCol = (typeof RARITY_COLORS !== 'undefined') ? (RARITY_COLORS[rewards.equipment.rarity] || '#f59e0b') : '#f59e0b';
            rewardHTML += '<div style="margin-top:6px;padding:6px 10px;box-sizing:border-box;border-radius:8px;background:rgba(245,158,11,0.1);border:1px solid ' + rarCol + '33;">' +
                '<span style="font-size:9px;font-weight:800;color:' + rarCol + ';text-transform:uppercase;letter-spacing:1px;">' + rewards.equipment.rarity + '</span> ' +
                '<span style="font-size:10px;font-weight:700;color:' + rarCol + ';">' + rewards.equipment.name + '</span>' +
            '</div>';
        }
        if (rewards.isFirstClear) {
            rewardHTML += '<div style="font-size:8px;color:#22c55e;margin-top:4px;font-weight:700;">✨ FIRST CLEAR — 3× REWARDS!</div>';
        }

        // Energy display
        var energyPips = '';
        for (var e = 0; e < MAX_ENERGY; e++) {
            energyPips += '<div class="energy-pip ' + (e < state.tower.energy ? 'full' : 'empty') + '"></div>';
        }

        var canDescend = state.tower.energy >= ENERGY_PER_ATTEMPT && floor <= MAX_FLOOR;
        var canRefill = (state.resources.diamond || 0) >= DIAMOND_REFILL_COST && state.tower.energy < MAX_ENERGY;

        modal.innerHTML = '<div id="tower-modal-inner" style="animation:towerSlideUp 0.3s ease-out;">' +
            // Close button
            '<button onclick="closeTowerModal()" style="position:absolute;top:10px;right:14px;color:#64748b;font-size:20px;cursor:pointer;background:none;border:none;z-index:10;transition:color 0.15s;" onmouseover="this.style.color=\'#fff\'" onmouseout="this.style.color=\'#64748b\'">&times;</button>' +

            // Header
            '<div style="padding:16px 20px 12px;border-bottom:2px solid rgba(124,58,237,0.2);text-align:center;">' +
                '<div style="font-size:18px;margin-bottom:2px;">🏗️</div>' +
                '<h2 style="font-size:14px;font-weight:900;color:#d8b4fe;text-transform:uppercase;letter-spacing:4px;animation:towerGlow 3s infinite;">THE ELEVATOR SHAFT</h2>' +
                '<p style="font-size:8px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:2px;">Descend floor by floor • Building 4A</p>' +
                '<div style="display:flex;justify-content:center;gap:12px;margin-top:8px;">' +
                    '<span style="font-size:9px;color:#a855f7;font-weight:700;">Best: F' + state.tower.bestFloor + '</span>' +
                    '<span style="font-size:9px;color:#64748b;">|</span>' +
                    '<span style="font-size:9px;color:#f59e0b;font-weight:700;">All-Time: F' + state.tower.bestFloorAllTime + '</span>' +
                    '<span style="font-size:9px;color:#64748b;">|</span>' +
                    '<span style="font-size:9px;color:#ef4444;font-weight:700;">Reset: ' + resetText + '</span>' +
                '</div>' +
            '</div>' +

            // Energy bar
            '<div style="padding:10px 20px;box-sizing:border-box;">' +
                '<div class="tower-energy-bar">' +
                    '<span style="font-size:12px;">⚡</span>' +
                    '<div style="display:flex;gap:3px;flex:1;">' + energyPips + '</div>' +
                    '<span style="font-size:10px;font-weight:800;color:#fbbf24;">' + state.tower.energy + '/' + MAX_ENERGY + '</span>' +
                    '<span style="font-size:8px;color:#64748b;">(' + regenText + ')</span>' +
                '</div>' +
                (canRefill ? '<div style="text-align:center;margin-top:6px;"><button onclick="towerRefillEnergy()" class="tower-refill-btn">💎 ' + DIAMOND_REFILL_COST + ' — Refill Energy</button></div>' : '') +
            '</div>' +

            // Shaft visualization
            '<div style="padding:0 20px 10px;">' +
                '<div class="tower-shaft">' +
                    '<div class="tower-shaft-scroll" style="padding:8px;">' + shaftHTML + '</div>' +
                '</div>' +
            '</div>' +

            // Current floor info
            '<div style="padding:0 20px 10px;">' +
                '<div style="background:rgba(0,0,0,0.3);border-radius:10px;padding:10px 14px;box-sizing:border-box;border:1px solid rgba(124,58,237,0.15);">' +
                    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">' +
                        '<span style="font-size:11px;font-weight:800;color:#d8b4fe;">Floor ' + floor + (isMiniBossFloor(floor) ? ' — ' + getMiniBossName(floor) : '') + '</span>' +
                        '<span style="font-size:8px;font-weight:700;color:' + diff.color + ';text-transform:uppercase;letter-spacing:1px;padding:2px 8px;box-sizing:border-box;border-radius:4px;background:' + diff.color + '15;border:1px solid ' + diff.color + '33;">' + diff.label + '</span>' +
                    '</div>' +

                    // Modifiers
                    '<div style="font-size:8px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-top:6px;">Modifiers</div>' +
                    modHTML +

                    // Rewards
                    '<div style="font-size:8px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-top:10px;">Rewards Preview</div>' +
                    rewardHTML +
                '</div>' +
            '</div>' +

            // Descend button
            '<div style="padding:0 20px 20px;">' +
                '<button onclick="towerStartFloor()" class="tower-descend-btn"' + (canDescend ? '' : ' disabled') + '>' +
                    '▼ DESCEND ▼' +
                    '<div style="font-size:8px;font-weight:500;letter-spacing:1px;margin-top:2px;opacity:0.7;">Cost: ' + ENERGY_PER_ATTEMPT + ' ⚡ Energy</div>' +
                '</button>' +
                (floor > MAX_FLOOR ? '<div style="text-align:center;font-size:10px;color:#22c55e;font-weight:700;margin-top:8px;">🏆 You have conquered The Elevator Shaft!</div>' : '') +
            '</div>' +
        '</div>';

        modal.classList.add('active');
    }

    function closeTowerModal() {
        var modal = document.getElementById('tower-modal');
        if (modal) modal.classList.remove('active');
    }

    // ===================== TOWER COMBAT HUD =====================

    function showTowerCombatHUD() {
        removeTowerCombatHUD();

        // === SWAP ARENA BACKGROUND TO ELEVATOR SHAFT ===
        var arenaBg = document.getElementById('arena-background');
        if (arenaBg) {
            towerCombatState.savedBackground = arenaBg.innerHTML;
            if (typeof backgrounds !== 'undefined' && backgrounds['elevator_shaft']) {
                arenaBg.innerHTML = backgrounds['elevator_shaft'];
            }
            // Update floor indicator
            var floorNumEl = document.getElementById('tower-bg-floor-num');
            if (floorNumEl) floorNumEl.textContent = 'F' + towerCombatState.floor;
        }

        var mods = towerCombatState.modifiers;
        var modsHTML = '';
        mods.forEach(function (mod) {
            modsHTML += '<span class="tower-mod-badge" style="color:' + mod.color + ';border-color:' + mod.color + '33;font-size:8px;" title="' + mod.desc + '">' + mod.icon + '</span>';
        });

        var hud = document.createElement('div');
        hud.id = 'tower-combat-hud';
        hud.innerHTML = '<div id="tower-combat-hud-inner">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;">' +
                '<div style="display:flex;align-items:center;gap:6px;">' +
                    '<span style="font-size:12px;">🏗️</span>' +
                    '<span style="font-size:10px;font-weight:800;color:#d8b4fe;letter-spacing:2px;">FLOOR ' + towerCombatState.floor + '</span>' +
                '</div>' +
                '<div style="display:flex;align-items:center;gap:4px;">' +
                    modsHTML +
                '</div>' +
                '<button onclick="towerRetreat()" class="tower-retreat-btn">✕ RETREAT</button>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:6px;margin-top:4px;">' +
                '<div style="flex:1;height:4px;background:rgba(100,116,139,0.2);border-radius:2px;overflow:hidden;">' +
                    '<div id="tower-progress-bar" style="height:100%;background:linear-gradient(90deg,#a855f7,#7c3aed);border-radius:2px;transition:width 0.3s;width:0%;"></div>' +
                '</div>' +
                '<span id="tower-progress-text" style="font-size:8px;color:#94a3b8;font-weight:700;">0/' + towerCombatState.enemies.length + '</span>' +
            '</div>' +
        '</div>';
        document.body.appendChild(hud);

        // Hide normal boss controls
        var bossControls = document.getElementById('boss-controls');
        if (bossControls) bossControls.classList.add('hidden');
        var fightBossBtn = document.getElementById('fight-boss-btn');
        if (fightBossBtn) fightBossBtn.classList.add('hidden');
        var minionProgressBar = document.getElementById('minion-progress-bar');
        if (minionProgressBar) minionProgressBar.style.display = 'none';
    }

    function updateTowerCombatHUD() {
        if (!towerCombatState.active) return;
        var total = towerCombatState.enemies.length;
        var current = towerCombatState.currentEnemyIndex;
        var pct = ((current) / total) * 100;

        var bar = document.getElementById('tower-progress-bar');
        if (bar) bar.style.width = pct + '%';
        var text = document.getElementById('tower-progress-text');
        if (text) text.textContent = current + '/' + total;
    }

    function removeTowerCombatHUD() {
        var hud = document.getElementById('tower-combat-hud');
        if (hud) hud.remove();

        // === RESTORE ORIGINAL MAP BACKGROUND ===
        var arenaBg = document.getElementById('arena-background');
        if (arenaBg && towerCombatState.savedBackground !== null) {
            arenaBg.innerHTML = towerCombatState.savedBackground;
            towerCombatState.savedBackground = null;
        } else if (arenaBg && typeof updateMapBackground === 'function') {
            updateMapBackground();
        }

        // Restore normal UI elements
        var minionProgressBar = document.getElementById('minion-progress-bar');
        if (minionProgressBar) minionProgressBar.style.display = '';

        // Restore boss controls
        var bossControls = document.getElementById('boss-controls');
        if (bossControls) bossControls.classList.remove('hidden');
        var fightBossBtn = document.getElementById('fight-boss-btn');
        if (fightBossBtn) fightBossBtn.classList.remove('hidden');
    }

    // ===================== FLOOR CLEARED MODAL =====================

    function showFloorClearedModal(floor, rewards) {
        var existing = document.getElementById('tower-cleared-modal');
        if (existing) existing.remove();

        var isMajor = isMajorBossFloor(floor);
        var accentColor = isMajor ? '#f59e0b' : '#22c55e';

        var rewardLines = '';
        if (rewards.money) rewardLines += '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">💰</span><span style="color:#4ade80;font-weight:700;">' + formatNumber(rewards.money) + ' Money</span></div>';
        if (rewards.stone) rewardLines += '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">🧪</span><span style="color:#94a3b8;">' + rewards.stone + ' Stone</span></div>';
        if (rewards.iron) rewardLines += '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">⚙️</span><span style="color:#94a3b8;">' + rewards.iron + ' Iron</span></div>';
        if (rewards.gold) rewardLines += '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">🏅</span><span style="color:#fbbf24;">' + rewards.gold + ' Gold</span></div>';
        if (rewards.diamond) rewardLines += '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">💎</span><span style="color:#60a5fa;">' + rewards.diamond + ' Diamonds</span></div>';
        if (rewards.scrap) rewardLines += '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">🔩</span><span style="color:#94a3b8;">' + rewards.scrap + ' Scrap</span></div>';

        var equipLine = '';
        if (rewards.equipment) {
            var eqCol = (typeof RARITY_COLORS !== 'undefined') ? (RARITY_COLORS[rewards.equipment.rarity] || '#f59e0b') : '#f59e0b';
            equipLine = '<div style="margin-top:8px;padding:10px;border-radius:10px;background:rgba(245,158,11,0.1);border:1px solid ' + eqCol + '44;text-align:center;">' +
                '<div style="font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:2px;font-weight:700;margin-bottom:4px;">EXCLUSIVE DROP</div>' +
                '<div style="font-size:14px;font-weight:900;color:' + eqCol + ';">' + rewards.equipment.name + '</div>' +
                '<div style="font-size:9px;color:' + eqCol + ';text-transform:uppercase;letter-spacing:1px;font-weight:700;">' + rewards.equipment.rarity + ' ' + rewards.equipment.type + '</div>' +
            '</div>';
        }

        var modal = document.createElement('div');
        modal.id = 'tower-cleared-modal';
        modal.innerHTML = '<div style="background:linear-gradient(145deg,#0c1222,#151e35);border:2px solid ' + accentColor + '44;border-radius:16px;max-width:360px;width:100%;box-sizing:border-box;max-height:90vh;overflow-y:auto;padding:24px;text-align:center;box-shadow:0 0 60px ' + accentColor + '22;animation:towerSlideUp 0.4s ease-out;">' +
            '<div style="font-size:32px;margin-bottom:8px;">' + (isMajor ? '🏆' : '✅') + '</div>' +
            '<h2 style="font-size:16px;font-weight:900;color:' + accentColor + ';text-transform:uppercase;letter-spacing:3px;">Floor ' + floor + ' Cleared!</h2>' +
            (isMiniBossFloor(floor) ? '<div style="font-size:10px;color:#fca5a5;font-weight:700;margin-top:4px;">' + getMiniBossName(floor) + ' Defeated!</div>' : '') +
            (rewards.isFirstClear ? '<div style="font-size:9px;color:#22c55e;font-weight:800;margin-top:6px;padding:4px 12px;box-sizing:border-box;border-radius:6px;background:rgba(34,197,94,0.1);display:inline-block;">✨ FIRST CLEAR BONUS — 3× REWARDS</div>' : '') +

            '<div style="margin-top:16px;display:flex;flex-direction:column;gap:6px;text-align:left;padding:0 10px;font-size:11px;">' +
                rewardLines +
            '</div>' +

            equipLine +

            '<div style="margin-top:16px;display:flex;gap:8px;justify-content:center;">' +
                '<button onclick="closeTowerClearedAndOpen()" style="flex:1;padding:10px;border-radius:10px;border:2px solid rgba(124,58,237,0.5);background:rgba(124,58,237,0.2);color:#d8b4fe;font-weight:800;font-size:11px;cursor:pointer;text-transform:uppercase;letter-spacing:2px;transition:all 0.15s;" onmouseover="this.style.background=\'rgba(124,58,237,0.35)\'" onmouseout="this.style.background=\'rgba(124,58,237,0.2)\'">Continue ▼</button>' +
                '<button onclick="closeTowerCleared()" style="padding:10px 16px;box-sizing:border-box;border-radius:10px;border:1px solid rgba(100,116,139,0.3);background:rgba(100,116,139,0.1);color:#94a3b8;font-weight:700;font-size:11px;cursor:pointer;text-transform:uppercase;letter-spacing:1px;transition:all 0.15s;" onmouseover="this.style.background=\'rgba(100,116,139,0.2)\'" onmouseout="this.style.background=\'rgba(100,116,139,0.1)\'">Close</button>' +
            '</div>' +
        '</div>';

        modal.classList.add('active');
        document.body.appendChild(modal);
    }

    // ===================== SIDE RAIL BUTTON INJECTION =====================

    function injectTowerButton() {
        var rail = document.getElementById('side-rail');
        if (!rail || document.getElementById('tower-rail-btn')) return;

        // Find the divider and insert before the "More" section
        var divider = rail.querySelector('div.border-t');
        var btn = document.createElement('button');
        btn.id = 'tower-rail-btn';
        btn.className = 'side-rail-btn group relative';
        btn.title = 'Elevator Shaft';
        btn.onclick = function () { openTowerModal(); };
        btn.innerHTML = '<span class="text-base">🏗️</span><span class="side-rail-label">Tower</span>';

        if (divider) {
            rail.insertBefore(btn, divider);
        } else {
            rail.appendChild(btn);
        }
    }

    // ===================== GLOBAL API =====================

    window.openTowerModal = openTowerModal;
    window.closeTowerModal = closeTowerModal;

    window.towerStartFloor = function () {
        ensureTowerState();
        startFloor(state.tower.currentFloor);
    };

    window.towerRetreat = function () {
        if (towerCombatState.active) {
            failFloor();
        }
    };

    window.towerRefillEnergy = function () {
        ensureTowerState();
        if ((state.resources.diamond || 0) < DIAMOND_REFILL_COST) {
            showTowerToast('Not enough diamonds! Need ' + DIAMOND_REFILL_COST + ' 💎', '#ef4444');
            return;
        }
        if (state.tower.energy >= MAX_ENERGY) {
            showTowerToast('Energy already full!', '#fbbf24');
            return;
        }
        state.resources.diamond -= DIAMOND_REFILL_COST;
        state.tower.energy = MAX_ENERGY;
        state.tower.lastEnergyRegen = Date.now();
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
        showTowerToast('Energy refilled! ⚡ ' + MAX_ENERGY + '/' + MAX_ENERGY, '#22c55e');
        openTowerModal(); // Refresh UI
    };

    window.closeTowerCleared = function () {
        var modal = document.getElementById('tower-cleared-modal');
        if (modal) modal.remove();
    };

    window.closeTowerClearedAndOpen = function () {
        window.closeTowerCleared();
        openTowerModal();
    };

    // ===================== COMBAT INTEGRATION HOOKS =====================

    // Hook into the game's damage system to handle tower-specific modifiers
    // We patch the existing damage application path
    var _towerDamageHookInstalled = false;

    function installDamageHook() {
        if (_towerDamageHookInstalled) return;
        _towerDamageHookInstalled = true;

        // Override damage dealt to enemies (armored modifier)
        var origHpSetter = null;

        // Use a mutation observer pattern: check if tower armored modifier is active
        // and reduce damage by 30%. We use an interval-based approach to modify
        // currentEnemy.hp restoration after damage is dealt.
        // This is lightweight and doesn't break the game's damage flow.

        setInterval(function () {
            if (!towerCombatState.active || !window.towerMode) return;

            // Vampiric: enemies heal 3% of damage dealt
            if (window.towerHasModifier('vampiric') && currentEnemy && currentEnemy.hp > 0 && currentEnemy.hp < currentEnemy.maxHp) {
                var healAmt = Math.floor(currentEnemy.maxHp * 0.001); // Small constant heal per tick
                currentEnemy.hp = Math.min(currentEnemy.maxHp, currentEnemy.hp + healAmt);
            }

            // Update tower HUD progress
            updateTowerCombatHUD();
        }, 200);
    }

    // ===================== INITIALIZATION =====================

    function init() {
        injectStyles();
        ensureTowerState();
        checkWeeklyReset();
        regenEnergy();

        // Tower is now accessible via More menu — no side rail button needed

        // Install combat hooks
        hookEnemyDefeat();
        installDamageHook();

        // Periodic energy regen update
        setInterval(function () {
            if (typeof state !== 'undefined' && state.tower) {
                regenEnergy();
            }
        }, 60000);

        console.log('[Tower] 🏗️ Elevator Shaft module loaded.');
    }

    // Boot
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
