// ============================================================
// PRESTIGE / REBIRTH SYSTEM — Bazinga Points Economy
// Standalone module — loaded after app_v2.js
// ============================================================

(function() {
    'use strict';

    // ---- CSS Animations (injected once) ----
    var styleEl = document.createElement('style');
    styleEl.textContent = [
        '@keyframes prestige-pulse { 0%,100%{box-shadow:0 0 8px rgba(168,85,247,0.4),0 0 20px rgba(168,85,247,0.15);} 50%{box-shadow:0 0 16px rgba(168,85,247,0.7),0 0 40px rgba(168,85,247,0.3);} }',
        '@keyframes prestige-flash { 0%{opacity:1;} 100%{opacity:0;} }',
        '@keyframes prestige-particle { 0%{opacity:1;transform:translate(0,0) scale(1);} 100%{opacity:0;transform:translate(var(--px),var(--py)) scale(0);} }',
        '@keyframes prestige-text-pop { 0%{opacity:0;transform:scale(0.3) translateY(20px);} 50%{opacity:1;transform:scale(1.15) translateY(-10px);} 100%{opacity:1;transform:scale(1) translateY(0);} }',
        '@keyframes prestige-shimmer { 0%{background-position:200% center;} 100%{background-position:-200% center;} }',
        '@keyframes perk-glow-pulse { 0%,100%{box-shadow:var(--glow-base);} 50%{box-shadow:var(--glow-bright);} }',
        '.prestige-btn-glow { animation: prestige-pulse 2s ease-in-out infinite; }',
        '.perk-node-glow { animation: perk-glow-pulse 2s ease-in-out infinite; }',
        '.skill-tree-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }',
        '@media(max-width:640px){ .skill-tree-grid { grid-template-columns:1fr; } }',
        '.branch-collapse-btn { cursor:pointer; transition:transform 0.2s; }',
        '.branch-collapse-btn.collapsed { transform:rotate(-90deg); }'
    ].join('\n');
    document.head.appendChild(styleEl);

    // ---- DEFAULT INITIAL ROSTER HP VALUES (from config.js) ----
    var initialMaxHp = {
        sheldon: 80, penny: 100, leonard: 250, howard: 120, raj: 90,
        amy: 110, bernie: 90, stuart: 300, mary: 85, beverly: 95,
        proton: 350, kripke: 80, leslie: 70, bert: 450, wil: 130,
        zack: 380, emily: 90, denise: 110
    };

    // ---- 1. PRESTIGE BUTTON — Injected into the top bar ----
    function createPrestigeButton() {
        if (document.getElementById('prestige-reset-btn')) return;

        var btn = document.createElement('button');
        btn.id = 'prestige-reset-btn';
        btn.className = 'prestige-btn-glow text-purple-300 font-black px-1.5 py-0.5 cursor-pointer text-[9px] hover:text-purple-200 transition-colors tracking-wider uppercase rounded border border-purple-600/50 bg-purple-950/60 hover:bg-purple-900/60 whitespace-nowrap';
        btn.title = 'Prestige Reset';
        btn.textContent = '♻️ BAZINGA';
        btn.onclick = function(e) { e.stopPropagation(); openPrestigeConfirm(); };
        btn.style.display = 'none';

        // Insert into combat strip (below top bar) instead of cramming into top bar
        if (typeof ensureCombatStrip === 'function') {
            var strip = ensureCombatStrip();
            if (strip) { strip.insertBefore(btn, strip.firstChild); return; }
        }
        // Fallback: top bar
        var topBar = document.querySelector('#arena > .absolute.top-0');
        if (topBar) {
            var btnContainer = topBar.querySelector('.flex.items-center.gap-0.flex-shrink-0');
            if (btnContainer) btnContainer.insertBefore(btn, btnContainer.firstChild);
        }
    }

    // Visibility check — only show when wave >= 20
    function updatePrestigeButtonVisibility() {
        var btn = document.getElementById('prestige-reset-btn');
        if (!btn) return;
        btn.style.display = (state.wave >= 20) ? '' : 'none';
    }

    // ---- 2. PRESTIGE CALCULATION ----
    function calculateBPEarned() {
        var base = Math.floor(Math.sqrt(state.wave) * 1.5);
        var milestone = Math.floor(state.wave / 25); // +1 bonus BP per 25 waves
        return base + milestone;
    }

    // ---- 3. PRESTIGE CONFIRM DIALOG ----
    function openPrestigeConfirm() {
        if (state.wave < 20) {
            showGameAlert('Not Ready', 'You need to reach <span class="text-purple-400 font-black">Wave 20</span> before you can prestige.');
            return;
        }

        var bpEarned = calculateBPEarned();

        var overlay = document.createElement('div');
        overlay.id = 'prestige-confirm-overlay';
        overlay.className = 'fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100001] p-3';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

        var modal = document.createElement('div');
        modal.className = 'bg-gradient-to-b from-purple-950 via-slate-950 to-black border-2 border-purple-500/60 rounded-xl w-full max-w-sm overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.3)] transform transition-all';

        modal.innerHTML = 
            '<div class="bg-gradient-to-r from-purple-950 to-slate-900 border-b-2 border-purple-800 p-3 flex justify-between items-center">' +
                '<h2 class="text-purple-400 font-black text-sm tracking-widest uppercase" style="text-shadow:0 0 10px rgba(168,85,247,0.5);">♻️ BAZINGA RESET</h2>' +
                '<button id="prestige-confirm-close" class="text-gray-400 hover:text-white text-xl p-1 leading-none font-sans cursor-pointer">&times;</button>' +
            '</div>' +
            '<div class="p-5 text-center">' +
                '<div class="text-4xl mb-3">♻️</div>' +
                '<div class="bg-purple-900/40 border border-purple-600/40 rounded-lg p-3 mb-4">' +
                    '<div class="text-[9px] text-gray-400 uppercase tracking-wider mb-1">You will earn</div>' +
                    '<div class="text-3xl font-black text-purple-300" style="text-shadow:0 0 20px rgba(168,85,247,0.6);">+' + bpEarned + ' BP</div>' +
                    '<div class="text-[8px] text-gray-500 mt-1">Based on Wave ' + formatNumber(state.wave) + ' • √wave × 1.5 + wave/25 bonus</div>' +
                '</div>' +
                '<div class="text-left bg-red-950/30 border border-red-800/40 rounded-lg p-3 mb-4">' +
                    '<div class="text-[9px] text-red-400 font-black uppercase tracking-wider mb-2">⚠️ THIS WILL RESET:</div>' +
                    '<div class="text-[8px] text-gray-400 leading-relaxed space-y-0.5">' +
                        '<div>• Wave progress → Wave 1</div>' +
                        '<div>• All resources (money, stone, iron, gold, diamond, scrap)</div>' +
                        '<div>• All character levels (Sheldon → Lv1, others → Lv0)</div>' +
                        '<div>• Robots, crafting queue, equipment & inventory</div>' +
                        '<div>• Score, formation, locations, food</div>' +
                    '</div>' +
                '</div>' +
                '<div class="text-left bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-3 mb-4">' +
                    '<div class="text-[9px] text-emerald-400 font-black uppercase tracking-wider mb-2">✅ YOU KEEP:</div>' +
                    '<div class="text-[8px] text-gray-400 leading-relaxed space-y-0.5">' +
                        '<div>• Bazinga Points & prestige perks</div>' +
                        '<div>• Achievements, stats & skins</div>' +
                        '<div>• PVP progress (trophies, league, record)</div>' +
                        '<div>• Daily rewards, account settings, skill tree</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="p-3 bg-black/60 border-t border-slate-800 flex gap-3">' +
                '<button id="prestige-do-btn" class="flex-1 bg-gradient-to-b from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-black py-2.5 px-3 rounded border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] text-[10px] tracking-wider transition-all uppercase cursor-pointer">PRESTIGE NOW</button>' +
                '<button id="prestige-cancel-btn" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 px-3 rounded border border-slate-500 text-[10px] tracking-wider transition-all uppercase cursor-pointer">CANCEL</button>' +
            '</div>';

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById('prestige-confirm-close').onclick = function() { overlay.remove(); };
        document.getElementById('prestige-cancel-btn').onclick = function() { overlay.remove(); };
        document.getElementById('prestige-do-btn').onclick = function() {
            overlay.remove();
            executePrestige(bpEarned);
        };
    }

    // ---- 3b. EXECUTE PRESTIGE ----
    function executePrestige(bpEarned) {
        // Award BP
        state.bazingaPoints = (state.bazingaPoints || 0) + bpEarned;

        // Track stats
        if (!state.stats) state.stats = {};
        state.stats.prestigeCount = (state.stats.prestigeCount || 0) + 1;
        state.stats.totalBPEarned = (state.stats.totalBPEarned || 0) + bpEarned;
        // Track best single prestige BP for Efficiency Expert achievement
        if (bpEarned > (state.stats.bestSingleBP || 0)) {
            state.stats.bestSingleBP = bpEarned;
        }
        if (typeof trackStat === 'function') {
            trackStat('bestSingleBP', bpEarned);
        }

        // ---- RESET VALUES ----
        state.wave = 1;
        state.resources = { money: 50, stone: 0, iron: 0, gold: 0, diamond: 0, scrap: 0 };
        state.minionsDefeated = 0;
        state.score = 0;

        // Reset roster levels and HP
        for (var key in state.roster) {
            if (!state.roster.hasOwnProperty(key)) continue;
            var charData = state.roster[key];
            charData.level = (key === 'sheldon') ? 1 : 0;
            var baseHp = initialMaxHp[key] || 100;
            charData.maxHp = baseHp;
            charData.currentHp = baseHp;
            charData.status = 'healthy';
            charData.hospitalEndTime = 0;
            if (charData.stunnedUntil) delete charData.stunnedUntil;
            if (charData.talents) delete charData.talents;
            // Skins are KEPT — activeSkin and unlockedSkins persist
        }

        // Reset equip / formation
        state.equipped = { sheldon: true };
        state.formation = {
            front: [null, null],
            mid: [null, null, null],
            back: [null, null, null]
        };
        if (state.formation.bots) state.formation.bots = [null, null, null];

        // Reset robots
        state.robots = [];
        state.robotRoster = {};
        state.craftingQueue = [];
        state.botSlots = 1;

        // Reset inventory & equipment
        state.inventory = [];
        state.charEquipment = {};

        // Reset food
        state.food = { chinese: 0, pizza: 0, cupcakes: 0, burger: 0, tacos: 0, indian: 0, hotdog: 0, pretzel: 0, smoothie: 0, energydrink: 0, cheesecake: 0, shawarma: 0 };

        // Reset location
        state.currentLocation = 'sheldons_apt';
        state.unlockedLocations = ['sheldons_apt'];

        // Reset hospitalized array
        state.hospitalized = [];

        // Reset campaign progress
        if (state.campaign) {
            state.campaign = { chapter: 1, completed: [], stars: {} };
        }

        // Clear battle log
        state.battleLog = [];

        // Reset quests
        state.quests = { daily: [], weekly: [], lastDailyReset: null, lastWeeklyReset: null };

        // Reset event progress (keep history)
        if (state.events) {
            state.events.tokens = 0;
            state.events.bossRushProgress = 0;
            state.events.speedChallengeStart = 0;
        }

        // Reset minigame daily plays
        if (state.minigames) {
            state.minigames.rpslsPlaysToday = 0;
            state.minigames.triviaPlaysToday = 0;
        }

        // Apply wave skip perk — skip to 50% of highest wave reached
        if (state.perks && state.perks.waveSkip) {
            var hw = (state.stats && state.stats.highestWave) || 1;
            state.wave = Math.max(1, Math.floor(hw * 0.5));
            if (state.stats) state.stats.highestWave = Math.max(state.stats.highestWave || 1, state.wave);
        }

        // Apply extra bot slots from perk
        if (state.perks && state.perks.extraBotSlot) {
            state.botSlots = 1 + (state.perks.extraBotSlot || 0);
        }

        // ---- KEEP (untouched by design): ----
        // bazingaPoints, perks, achievements, stats, skins,
        // tutorialComplete, dialoguesSeen, pvp, dailyRewards,
        // hasChangedNameV2, skillTree, events.history,
        // friends, autoHealEnabled, gacha, bestiary,
        // guildRaid, guildWar, badges

        // Save & restart
        saveProgress();

        // Show spectacular animation, then restart game systems
        playPrestigeAnimation(bpEarned, function() {
            if (typeof spawnEnemy === 'function') spawnEnemy();
            if (typeof syncUI === 'function') syncUI();
            if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
            if (typeof startAutomationEngines === 'function') startAutomationEngines();
            updatePrestigeButtonVisibility();
            // Update BP display
            updateBPDisplay();
        });
    }

    // ---- 3c. PRESTIGE ANIMATION ----
    function playPrestigeAnimation(bpEarned, onComplete) {
        var layer = document.createElement('div');
        layer.className = 'fixed inset-0 z-[200000] pointer-events-none';
        layer.style.perspective = '800px';
        document.body.appendChild(layer);

        // White flash
        var flash = document.createElement('div');
        flash.className = 'absolute inset-0';
        flash.style.cssText = 'background:radial-gradient(ellipse at center, rgba(168,85,247,0.9), rgba(255,255,255,0.95)); animation: prestige-flash 1.5s ease-out forwards;';
        layer.appendChild(flash);

        // Particle burst
        for (var i = 0; i < 40; i++) {
            var p = document.createElement('div');
            var angle = (Math.PI * 2 * i) / 40;
            var dist = 150 + Math.random() * 250;
            var px = Math.cos(angle) * dist;
            var py = Math.sin(angle) * dist;
            p.style.cssText = 'position:absolute;left:50%;top:50%;width:' + (4 + Math.random() * 8) + 'px;height:' + (4 + Math.random() * 8) + 'px;border-radius:50%;' +
                'background:' + ['#a855f7','#c084fc','#e9d5ff','#fbbf24','#f59e0b','#ffffff'][Math.floor(Math.random()*6)] + ';' +
                '--px:' + px + 'px;--py:' + py + 'px;animation:prestige-particle ' + (0.8 + Math.random()*0.8) + 's ease-out forwards;' +
                'animation-delay:' + (Math.random()*0.3) + 's;box-shadow:0 0 8px currentColor;';
            layer.appendChild(p);
        }

        // Text banner
        var textDiv = document.createElement('div');
        textDiv.className = 'absolute inset-0 flex flex-col items-center justify-center';
        textDiv.innerHTML = 
            '<div style="animation:prestige-text-pop 0.8s ease-out forwards; animation-delay:0.5s; opacity:0;" class="text-center">' +
                '<div class="text-5xl mb-2">♻️</div>' +
                '<div class="text-3xl font-black text-purple-300 tracking-widest uppercase mb-2" style="text-shadow:0 0 30px rgba(168,85,247,0.8), 0 0 60px rgba(168,85,247,0.4);">BAZINGA!</div>' +
                '<div class="text-xl font-black text-yellow-400" style="text-shadow:0 0 20px rgba(251,191,36,0.6);">+' + bpEarned + ' BP</div>' +
                '<div class="text-[10px] text-purple-200 mt-2 tracking-wider uppercase">Prestige #' + (state.stats.prestigeCount || 1) + '</div>' +
            '</div>';
        layer.appendChild(textDiv);

        // Cleanup after animation
        setTimeout(function() {
            layer.style.transition = 'opacity 0.5s';
            layer.style.opacity = '0';
            setTimeout(function() {
                layer.remove();
                if (onComplete) onComplete();
            }, 500);
        }, 2500);
    }

    // ============================================================
    // 4. PRESTIGE PERK BRANCHES — 24 Perks across 4 Branches
    // ============================================================

    var PRESTIGE_PERK_BRANCHES = [
        {
            key: 'offense', name: 'OFFENSE', emoji: '🗡️', color: 'red',
            perks: [
                { key: 'dmgMult', icon: '💥', name: 'Damage Boost', desc: '+10% team damage per level', maxLevel: 20, baseCost: 2, stateKey: 'dmgMult',
                  display: function(lv) { return '+' + (lv * 10) + '% DMG'; } },
                { key: 'critChance', icon: '🎯', name: 'Crit Chance', desc: '+3% crit chance per level', maxLevel: 10, baseCost: 3, stateKey: 'critChance',
                  display: function(lv) { return '+' + (lv * 3) + '% CRIT'; } },
                { key: 'critDmg', icon: '⚔️', name: 'Crit Damage', desc: '+15% crit damage per level', maxLevel: 10, baseCost: 3, stateKey: 'critDmg',
                  display: function(lv) { return '+' + (lv * 15) + '% CRIT DMG'; } },
                { key: 'atkSpeed', icon: '⚡', name: 'Attack Speed', desc: '+5% attack speed per level', maxLevel: 10, baseCost: 4, stateKey: 'atkSpeed',
                  display: function(lv) { return '+' + (lv * 5) + '% SPD'; } },
                { key: 'tapPower', icon: '👆', name: 'Tap Power', desc: '+20% tap damage per level', maxLevel: 15, baseCost: 2, stateKey: 'tapPower',
                  display: function(lv) { return '+' + (lv * 20) + '% TAP'; } },
                { key: 'bossSlayer', icon: '👹', name: 'Boss Slayer', desc: '+10% damage vs bosses per level', maxLevel: 10, baseCost: 5, stateKey: 'bossSlayer',
                  display: function(lv) { return '+' + (lv * 10) + '% BOSS DMG'; } }
            ]
        },
        {
            key: 'defense', name: 'DEFENSE', emoji: '🛡️', color: 'blue',
            perks: [
                { key: 'hpBoost', icon: '❤️', name: 'HP Boost', desc: '+8% team HP per level', maxLevel: 15, baseCost: 2, stateKey: 'hpBoost',
                  display: function(lv) { return '+' + (lv * 8) + '% HP'; } },
                { key: 'dmgReduction', icon: '🔰', name: 'Damage Reduction', desc: '+3% damage reduction per level', maxLevel: 10, baseCost: 3, stateKey: 'dmgReduction',
                  display: function(lv) { return '-' + (lv * 3) + '% DMG TAKEN'; } },
                { key: 'fastHospital', icon: '🏥', name: 'Fast Recovery', desc: 'Hospital heals 50% faster', maxLevel: 1, baseCost: 5, stateKey: 'fastHospital',
                  display: function(lv) { return lv ? 'ACTIVE' : 'INACTIVE'; } },
                { key: 'healBoost', icon: '💊', name: 'Heal Boost', desc: '+10% food healing effectiveness per level', maxLevel: 10, baseCost: 3, stateKey: 'healBoost',
                  display: function(lv) { return '+' + (lv * 10) + '% HEALING'; } },
                { key: 'revive', icon: '💫', name: 'Second Wind', desc: '10% chance per level to revive with 30% HP', maxLevel: 5, baseCost: 8, stateKey: 'revive',
                  display: function(lv) { return lv * 10 + '% REVIVE'; } },
                { key: 'tankAura', icon: '🛡️', name: 'Tank Aura', desc: 'Front-lane +5% damage reduction per level', maxLevel: 10, baseCost: 4, stateKey: 'tankAura',
                  display: function(lv) { return '+' + (lv * 5) + '% FRONT DR'; } }
            ]
        },
        {
            key: 'economy', name: 'ECONOMY', emoji: '💰', color: 'yellow',
            perks: [
                { key: 'dropMult', icon: '💰', name: 'Loot Multiplier', desc: '+10% loot drops per level', maxLevel: 20, baseCost: 2, stateKey: 'dropMult',
                  display: function(lv) { return '+' + (lv * 10) + '% LOOT'; } },
                { key: 'luckyDrops', icon: '🎰', name: 'Lucky Drops', desc: '+15% rare equipment drop chance', maxLevel: 1, baseCost: 5, stateKey: 'luckyDrops',
                  display: function(lv) { return lv ? 'ACTIVE' : 'INACTIVE'; } },
                { key: 'goldRush', icon: '🪙', name: 'Gold Rush', desc: '+8% money earned per level', maxLevel: 15, baseCost: 2, stateKey: 'goldRush',
                  display: function(lv) { return '+' + (lv * 8) + '% GOLD'; } },
                { key: 'scrapCollector', icon: '♻️', name: 'Scrap Collector', desc: '+10% scrap from dismantling per level', maxLevel: 10, baseCost: 3, stateKey: 'scrapCollector',
                  display: function(lv) { return '+' + (lv * 10) + '% SCRAP'; } },
                { key: 'cheapShops', icon: '🏷️', name: 'Bargain Hunter', desc: '-5% shop prices per level', maxLevel: 10, baseCost: 4, stateKey: 'cheapShops',
                  display: function(lv) { return '-' + (lv * 5) + '% PRICES'; } },
                { key: 'doubleDrop', icon: '🎁', name: 'Double Drop', desc: '3% chance per level for double loot', maxLevel: 10, baseCost: 5, stateKey: 'doubleDrop',
                  display: function(lv) { return lv * 3 + '% DOUBLE'; } }
            ]
        },
        {
            key: 'tech', name: 'TECH', emoji: '🤖', color: 'green',
            perks: [
                { key: 'robotDmgMult', icon: '🤖', name: 'Robot Power', desc: '+15% robot damage per level', maxLevel: 15, baseCost: 3, stateKey: 'robotDmgMult',
                  display: function(lv) { return '+' + (lv * 15) + '% BOT DMG'; } },
                { key: 'waveSkip', icon: '⏩', name: 'Wave Skip', desc: 'Skip to 50% of highest wave after prestige', maxLevel: 1, baseCost: 10, stateKey: 'waveSkip',
                  display: function(lv) { return lv ? 'ACTIVE' : 'INACTIVE'; } },
                { key: 'fastCraft', icon: '🔧', name: 'Fast Craft', desc: '-10% robot crafting time per level', maxLevel: 5, baseCost: 4, stateKey: 'fastCraft',
                  display: function(lv) { return '-' + (lv * 10) + '% CRAFT TIME'; } },
                { key: 'extraBotSlot', icon: '🔌', name: 'Extra Bot Slot', desc: '+1 robot slot per level', maxLevel: 3, baseCost: 15, stateKey: 'extraBotSlot',
                  display: function(lv) { return '+' + lv + ' SLOTS'; } },
                { key: 'sweepBonus', icon: '🧹', name: 'Sweep Bonus', desc: '+10% sweep loot per level', maxLevel: 10, baseCost: 3, stateKey: 'sweepBonus',
                  display: function(lv) { return '+' + (lv * 10) + '% SWEEP'; } },
                { key: 'passiveIncome', icon: '💵', name: 'Passive Income', desc: 'Earn money passively per level', maxLevel: 10, baseCost: 5, stateKey: 'passiveIncome',
                  display: function(lv) { return lv ? 'LV ' + lv : 'INACTIVE'; } }
            ]
        }
    ];

    // Flat array of all perks (for lookup by key)
    var PRESTIGE_PERKS = [];
    for (var bi = 0; bi < PRESTIGE_PERK_BRANCHES.length; bi++) {
        var branch = PRESTIGE_PERK_BRANCHES[bi];
        for (var pi = 0; pi < branch.perks.length; pi++) {
            var pDef = branch.perks[pi];
            pDef.branch = branch.key;
            PRESTIGE_PERKS.push(pDef);
        }
    }

    // ---- PERK HELPERS ----

    function getPerkLevel(perk) {
        if (!state.perks) state.perks = {};
        var val = state.perks[perk.stateKey];
        if (val === undefined || val === null) return 0;
        if (typeof val === 'boolean') return val ? 1 : 0;
        return Number(val) || 0;
    }

    function getPerkCost(perk, currentLevel) {
        if (currentLevel >= perk.maxLevel) return Infinity;
        return Math.ceil(perk.baseCost * (1 + currentLevel * 0.5));
    }

    function updateBPDisplay() {
        var bpD = document.getElementById('bazinga-points-display');
        if (bpD) {
            bpD.innerHTML = '<span class="text-[9px] font-bold text-purple-300">BP:</span> <span class="text-[9px] font-bold text-yellow-400">' + (state.bazingaPoints || 0) + '</span>';
        }
    }

    // ---- BRANCH COLOR CONFIG ----
    var branchColors = {
        red:    { bg: 'bg-red-950/40',     border: 'border-red-700/50',     headerBg: 'bg-red-950/70',     headerBorder: 'border-red-600',     text: 'text-red-400',     activeBg: 'bg-red-900/40',     glowRgba: 'rgba(239,68,68,0.3)',   glowBright: 'rgba(239,68,68,0.5)' },
        blue:   { bg: 'bg-blue-950/40',    border: 'border-blue-700/50',    headerBg: 'bg-blue-950/70',    headerBorder: 'border-blue-600',    text: 'text-blue-400',    activeBg: 'bg-blue-900/40',    glowRgba: 'rgba(59,130,246,0.3)',  glowBright: 'rgba(59,130,246,0.5)' },
        yellow: { bg: 'bg-yellow-950/40',  border: 'border-yellow-700/50',  headerBg: 'bg-yellow-950/70',  headerBorder: 'border-yellow-600',  text: 'text-yellow-400',  activeBg: 'bg-yellow-900/40',  glowRgba: 'rgba(234,179,8,0.3)',   glowBright: 'rgba(234,179,8,0.5)' },
        green:  { bg: 'bg-emerald-950/40', border: 'border-emerald-700/50', headerBg: 'bg-emerald-950/70', headerBorder: 'border-emerald-600', text: 'text-emerald-400', activeBg: 'bg-emerald-900/40', glowRgba: 'rgba(16,185,129,0.3)',  glowBright: 'rgba(16,185,129,0.5)' }
    };

    // ============================================================
    // 5. RENDER SKILL TREE — Populates #skill-tree-container
    // ============================================================

    function renderSkillTree() {
        if (!state.perks) state.perks = {};
        var container = document.getElementById('skill-tree-container');
        if (!container) return;

        // Update BP display in modal header
        updateBPDisplay();

        var html = '<div class="skill-tree-grid">';

        for (var b = 0; b < PRESTIGE_PERK_BRANCHES.length; b++) {
            var br = PRESTIGE_PERK_BRANCHES[b];
            var c = branchColors[br.color] || branchColors.blue;

            // Branch column
            html += '<div class="' + c.bg + ' border ' + c.border + ' rounded-lg overflow-hidden">';

            // Branch header
            html += '<div class="' + c.headerBg + ' border-b ' + c.headerBorder + ' px-3 py-2 flex items-center gap-2">';
            html += '<span class="text-lg">' + br.emoji + '</span>';
            html += '<span class="font-black ' + c.text + ' text-[11px] uppercase tracking-widest">' + br.name + '</span>';
            html += '</div>';

            // Perk nodes
            html += '<div class="p-2 space-y-1.5">';
            for (var p = 0; p < br.perks.length; p++) {
                var perk = br.perks[p];
                var level = getPerkLevel(perk);
                var maxed = level >= perk.maxLevel;
                var cost = getPerkCost(perk, level);
                var canBuy = !maxed && (state.bazingaPoints || 0) >= cost;

                // Progress bar width
                var pctFill = perk.maxLevel > 0 ? Math.min(100, (level / perk.maxLevel) * 100) : 0;

                // Node styling
                var nodeBorderClass, nodeExtraStyle;
                if (maxed) {
                    nodeBorderClass = 'border-emerald-500/60';
                    nodeExtraStyle = '--glow-base:0 0 8px rgba(16,185,129,0.25),0 0 16px rgba(16,185,129,0.1); --glow-bright:0 0 12px rgba(16,185,129,0.4),0 0 24px rgba(16,185,129,0.2);';
                } else if (level > 0) {
                    nodeBorderClass = c.border;
                    nodeExtraStyle = '--glow-base:0 0 6px ' + c.glowRgba + ',0 0 14px rgba(0,0,0,0); --glow-bright:0 0 10px ' + c.glowBright + ',0 0 20px ' + c.glowRgba + ';';
                } else {
                    nodeBorderClass = 'border-slate-700/50';
                    nodeExtraStyle = '';
                }

                var nodeGlowClass = (maxed || level > 0) ? 'perk-node-glow' : '';
                var nodeOpacity = (!maxed && !canBuy && level === 0) ? 'opacity-50' : '';

                html += '<div class="' + (level > 0 ? c.activeBg : 'bg-slate-900/60') + ' border ' + nodeBorderClass + ' rounded-lg p-2 transition-all ' + nodeGlowClass + ' ' + nodeOpacity + '" style="' + nodeExtraStyle + '">';
                html += '<div class="flex items-start gap-2">';

                // Icon
                html += '<div class="text-lg shrink-0 mt-0.5">' + perk.icon + '</div>';

                // Info area
                html += '<div class="flex-1 min-w-0">';
                html += '<div class="flex items-center justify-between gap-1">';
                html += '<div class="font-black text-white text-[9px] uppercase tracking-wider leading-tight">' + perk.name + '</div>';
                html += '<div class="text-[7px] font-bold ' + (maxed ? 'text-emerald-400' : c.text) + ' bg-black/40 px-1.5 py-0.5 rounded shrink-0">' + level + '/' + perk.maxLevel + '</div>';
                html += '</div>';

                // Description
                html += '<div class="text-[7px] text-gray-500 mt-0.5 leading-tight">' + perk.desc + '</div>';

                // Current effect display
                html += '<div class="text-[7px] font-bold ' + (maxed ? 'text-emerald-400' : 'text-yellow-400') + ' mt-0.5">' + perk.display(level) + '</div>';

                // Mini progress bar
                if (perk.maxLevel > 1) {
                    html += '<div class="w-full h-1 bg-black/40 rounded-full mt-1 overflow-hidden">';
                    html += '<div class="h-full rounded-full transition-all" style="width:' + pctFill + '%; background:linear-gradient(90deg,' + c.glowBright + ',' + c.glowRgba + ');"></div>';
                    html += '</div>';
                }

                html += '</div>';

                // Buy button area
                html += '<div class="shrink-0 flex flex-col items-center justify-center">';
                if (maxed) {
                    html += '<div class="text-[7px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-1 rounded border border-emerald-700/40">✅ MAX</div>';
                } else if (canBuy) {
                    html += '<button onclick="buyPrestigePerk(\'' + perk.key + '\')" class="bg-gradient-to-b from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-black text-[8px] px-2 py-1 rounded border border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.3)] cursor-pointer transition-all uppercase tracking-wider whitespace-nowrap">' + cost + ' BP</button>';
                } else {
                    html += '<div class="text-[7px] font-bold text-gray-600 bg-slate-950/60 px-1.5 py-1 rounded border border-slate-800 whitespace-nowrap">🔒 ' + cost + ' BP</div>';
                }
                html += '</div>';

                html += '</div>'; // flex row
                html += '</div>'; // perk node
            }
            html += '</div>'; // perk nodes wrapper
            html += '</div>'; // branch column
        }

        html += '</div>'; // skill-tree-grid

        // ---- Total invested & Reset button ----
        var totalInvested = 0;
        for (var ti = 0; ti < PRESTIGE_PERKS.length; ti++) {
            var tk = PRESTIGE_PERKS[ti];
            var tLv = getPerkLevel(tk);
            for (var lvi = 0; lvi < tLv; lvi++) {
                totalInvested += getPerkCost(tk, lvi);
            }
        }

        html += '<div class="mt-3 pt-3 border-t border-slate-700/50 text-center">';
        html += '<div class="text-[8px] text-gray-500 mb-2">Total BP Invested: <span class="text-purple-300 font-bold">' + totalInvested + '</span></div>';
        if (totalInvested > 0) {
            html += '<button onclick="resetAllPerks()" class="bg-gradient-to-b from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-black text-[9px] px-4 py-1.5 rounded border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)] cursor-pointer transition-all uppercase tracking-wider">';
            html += '🔄 Reset All Perks <span class="text-red-200/80 text-[7px]">(50 💎)</span>';
            html += '</button>';
        }
        html += '</div>';

        container.innerHTML = html;
    }

    // Expose as window for app_v2.js to call
    window.renderSkillTree = renderSkillTree;
    window._prestigeRenderSkillTree = renderSkillTree;

    // ============================================================
    // 6. BUY PERK
    // ============================================================

    window.buyPrestigePerk = function(perkKey) {
        if (!state.perks) state.perks = {};

        var perk = null;
        for (var i = 0; i < PRESTIGE_PERKS.length; i++) {
            if (PRESTIGE_PERKS[i].key === perkKey) { perk = PRESTIGE_PERKS[i]; break; }
        }
        if (!perk) return;

        var level = getPerkLevel(perk);
        if (level >= perk.maxLevel) return;

        var cost = getPerkCost(perk, level);
        if ((state.bazingaPoints || 0) < cost) return;

        state.bazingaPoints -= cost;

        // Apply perk
        if (perk.maxLevel === 1) {
            state.perks[perk.stateKey] = true;
        } else {
            state.perks[perk.stateKey] = (state.perks[perk.stateKey] || 0) + 1;
        }

        // Track spending
        if (!state.stats) state.stats = {};
        state.stats.bazingaSpent = (state.stats.bazingaSpent || 0) + cost;

        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('levelup');

        saveProgress();
        renderSkillTree();
        updateBPDisplay();
    };

    // ============================================================
    // 7. PERK RESET — Costs 50 Diamonds
    // ============================================================

    window.resetAllPerks = function() {
        var diamonds = (state.resources && state.resources.diamond) || 0;
        if (diamonds < 50) {
            if (typeof showGameAlert === 'function') {
                showGameAlert('Not Enough Diamonds', 'You need <span class="text-cyan-400 font-black">50 💎</span> to reset all perks. You have <span class="text-cyan-400">' + diamonds + '</span>.');
            }
            return;
        }

        // Calculate total BP to refund
        var totalRefund = 0;
        for (var i = 0; i < PRESTIGE_PERKS.length; i++) {
            var perk = PRESTIGE_PERKS[i];
            var lv = getPerkLevel(perk);
            for (var j = 0; j < lv; j++) {
                totalRefund += getPerkCost(perk, j);
            }
        }

        if (totalRefund === 0) {
            if (typeof showGameAlert === 'function') {
                showGameAlert('Nothing to Reset', 'You have no perk levels to reset.');
            }
            return;
        }

        // Confirmation dialog
        var overlay = document.createElement('div');
        overlay.id = 'perk-reset-overlay';
        overlay.className = 'fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100002] p-3';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

        var modal = document.createElement('div');
        modal.className = 'bg-gradient-to-b from-red-950 via-slate-950 to-black border-2 border-red-500/60 rounded-xl w-full max-w-xs overflow-hidden shadow-[0_0_60px_rgba(239,68,68,0.25)]';

        modal.innerHTML = 
            '<div class="bg-gradient-to-r from-red-950 to-slate-900 border-b-2 border-red-800 p-3 text-center">' +
                '<h2 class="text-red-400 font-black text-sm tracking-widest uppercase" style="text-shadow:0 0 10px rgba(239,68,68,0.5);">🔄 RESET PERKS</h2>' +
            '</div>' +
            '<div class="p-5 text-center">' +
                '<div class="text-3xl mb-3">🔄</div>' +
                '<div class="text-[10px] text-gray-300 mb-3">Reset ALL perk levels and refund BP?</div>' +
                '<div class="bg-purple-900/40 border border-purple-600/40 rounded-lg p-3 mb-3">' +
                    '<div class="text-[8px] text-gray-500 uppercase tracking-wider mb-1">You will receive</div>' +
                    '<div class="text-2xl font-black text-purple-300" style="text-shadow:0 0 15px rgba(168,85,247,0.5);">+' + totalRefund + ' BP</div>' +
                '</div>' +
                '<div class="bg-red-900/30 border border-red-700/40 rounded-lg p-2 mb-3">' +
                    '<div class="text-[8px] text-red-400 font-bold">Cost: 50 💎 Diamonds</div>' +
                '</div>' +
            '</div>' +
            '<div class="p-3 bg-black/60 border-t border-slate-800 flex gap-3">' +
                '<button id="perk-reset-confirm" class="flex-1 bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-2 px-3 rounded border border-red-400 text-[10px] tracking-wider transition-all uppercase cursor-pointer">RESET</button>' +
                '<button id="perk-reset-cancel" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-3 rounded border border-slate-500 text-[10px] tracking-wider transition-all uppercase cursor-pointer">CANCEL</button>' +
            '</div>';

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById('perk-reset-cancel').onclick = function() { overlay.remove(); };
        document.getElementById('perk-reset-confirm').onclick = function() {
            overlay.remove();

            // Deduct diamonds
            state.resources.diamond -= 50;

            // Refund BP
            state.bazingaPoints = (state.bazingaPoints || 0) + totalRefund;

            // Reset all perks
            for (var k = 0; k < PRESTIGE_PERKS.length; k++) {
                var pk = PRESTIGE_PERKS[k];
                if (pk.maxLevel === 1) {
                    state.perks[pk.stateKey] = false;
                } else {
                    state.perks[pk.stateKey] = 0;
                }
            }

            // Reset legacy waveSkip if it had a number
            if (typeof state.perks.waveSkip === 'number') {
                state.perks.waveSkip = false;
            }

            if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('prestige');

            saveProgress();
            renderSkillTree();
            updateBPDisplay();

            if (typeof showGameAlert === 'function') {
                showGameAlert('Perks Reset', 'All perks have been reset. <span class="text-purple-400 font-bold">+' + totalRefund + ' BP</span> refunded!');
            }
        };
    };

    // ============================================================
    // 8. PRESTIGE SHOP — Now redirects to Perks Modal
    // ============================================================

    window.openPrestigeShop = function(event) {
        if (event) event.stopPropagation();
        if (typeof openPerksModal === 'function') {
            openPerksModal();
        }
    };

    // ---- 5b. ADD PRESTIGE SHOP BUTTON TO SIDE RAIL ----
    function addPrestigeShopToSideRail() {
        var rail = document.getElementById('side-rail');
        if (!rail || document.getElementById('prestige-shop-rail-btn')) return;

        var btn = document.createElement('button');
        btn.id = 'prestige-shop-rail-btn';
        btn.className = 'side-rail-btn group relative';
        btn.title = 'Prestige Shop';
        btn.onclick = function() { openPrestigeShop(); };
        btn.innerHTML = '<span class="text-base">♻️</span><span class="side-rail-label">BP</span>';

        // Insert after the first button (Skill)
        var firstBtn = rail.querySelector('button');
        if (firstBtn && firstBtn.nextSibling) {
            rail.insertBefore(btn, firstBtn.nextSibling);
        } else {
            rail.appendChild(btn);
        }
    }

    // ============================================================
    // 9. PASSIVE INCOME TICKER
    // ============================================================

    function startPassiveIncomeTicker() {
        setInterval(function() {
            if (!state.perks || !state.perks.passiveIncome) return;
            var lv = Number(state.perks.passiveIncome) || 0;
            if (lv <= 0) return;
            var income = lv * 2; // $2/sec per level
            if (state.resources) {
                state.resources.money = (state.resources.money || 0) + income;
            }
        }, 1000);
    }

    // ============================================================
    // 10. INIT
    // ============================================================

    function initPrestige() {
        createPrestigeButton();
        addPrestigeShopToSideRail();
        updatePrestigeButtonVisibility();

        // Ensure perk fields exist with defaults
        if (!state.perks) state.perks = {};
        var allPerkKeys = [
            'dmgMult', 'critChance', 'critDmg', 'atkSpeed', 'tapPower', 'bossSlayer',
            'hpBoost', 'dmgReduction', 'fastHospital', 'healBoost', 'revive', 'tankAura',
            'dropMult', 'luckyDrops', 'goldRush', 'scrapCollector', 'cheapShops', 'doubleDrop',
            'robotDmgMult', 'waveSkip', 'fastCraft', 'extraBotSlot', 'sweepBonus', 'passiveIncome'
        ];
        for (var k = 0; k < allPerkKeys.length; k++) {
            if (state.perks[allPerkKeys[k]] === undefined) {
                state.perks[allPerkKeys[k]] = 0;
            }
        }

        // Migrate legacy waveSkip numeric values (5, 10, 15) → boolean true
        if (typeof state.perks.waveSkip === 'number' && state.perks.waveSkip > 0) {
            state.perks.waveSkip = true;
        }

        // Ensure stats fields exist
        if (!state.stats) state.stats = {};
        if (!state.stats.prestigeCount) state.stats.prestigeCount = 0;
        if (!state.stats.totalBPEarned) state.stats.totalBPEarned = 0;

        // Poll visibility every 5s (wave can change asynchronously)
        setInterval(updatePrestigeButtonVisibility, 5000);

        // Start passive income ticker
        startPassiveIncomeTicker();
    }

    // Expose for external use
    window.openPrestigeConfirm = openPrestigeConfirm;
    window.openPrestigeShop = window.openPrestigeShop;

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPrestige);
    } else {
        // Small delay to ensure app_v2 has initialized
        setTimeout(initPrestige, 200);
    }

})();
