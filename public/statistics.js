// ============================================================
// STATISTICS DASHBOARD — Comprehensive game stats modal
// Standalone module — loaded after app_v2.js
// ============================================================

(function() {
    'use strict';

    // ---- CSS for collapsible sections ----
    var styleEl = document.createElement('style');
    styleEl.textContent = [
        '@keyframes stats-slide-in { 0%{opacity:0;transform:translateY(8px);} 100%{opacity:1;transform:translateY(0);} }',
        '.stats-section-body { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, opacity 0.3s ease; opacity: 0; }',
        '.stats-section-body.open { max-height: 600px; opacity: 1; }',
        '.stats-chevron { transition: transform 0.3s ease; }',
        '.stats-chevron.open { transform: rotate(180deg); }'
    ].join('\n');
    document.head.appendChild(styleEl);

    // ---- STAT CATEGORIES ----
    var STAT_CATEGORIES = [
        {
            key: 'combat', icon: '⚔️', title: 'Combat',
            gradient: 'from-red-900/60 to-red-950/40',
            borderColor: 'border-red-800/50',
            accentColor: 'text-red-400',
            stats: [
                { label: 'Total Kills', key: 'totalKills', icon: '💀' },
                { label: 'Boss Kills', key: 'bossKills', icon: '👹' },
                { label: 'Highest Wave', key: 'highestWave', icon: '🌊' },
                { label: 'Total Damage', key: 'totalDamage', icon: '💥' }
            ]
        },
        {
            key: 'economy', icon: '💰', title: 'Economy',
            gradient: 'from-yellow-900/60 to-yellow-950/40',
            borderColor: 'border-yellow-800/50',
            accentColor: 'text-yellow-400',
            stats: [
                { label: 'Money Earned', key: 'moneyEarned', icon: '💵', prefix: '$' },
                { label: 'Money Spent', key: 'moneySpent', icon: '🛒', prefix: '$' },
                { label: 'Food Used', key: 'foodUsed', icon: '🍔' }
            ]
        },
        {
            key: 'pvp', icon: '🏆', title: 'PVP',
            gradient: 'from-amber-900/60 to-amber-950/40',
            borderColor: 'border-amber-800/50',
            accentColor: 'text-amber-400',
            stats: [
                { label: 'PVP Wins', key: 'pvpWins', icon: '✅' },
                { label: 'PVP Losses', key: 'pvpLosses', icon: '❌' },
                { label: 'Win Rate', key: '_winRate', icon: '📊', computed: true },
                { label: 'Highest Trophies', key: 'trophies', icon: '🏅' }
            ]
        },
        {
            key: 'collection', icon: '📦', title: 'Collection',
            gradient: 'from-blue-900/60 to-blue-950/40',
            borderColor: 'border-blue-800/50',
            accentColor: 'text-blue-400',
            stats: [
                { label: 'Characters Hired', key: 'charactersHired', icon: '👥' },
                { label: 'Robots Crafted', key: 'robotsCrafted', icon: '🤖' },
                { label: 'Locations Unlocked', key: 'locationsUnlocked', icon: '🗺️' },
                { label: 'Enemies Discovered', key: '_bestiary', icon: '📖', computed: true }
            ]
        },
        {
            key: 'prestige', icon: '♻️', title: 'Prestige',
            gradient: 'from-purple-900/60 to-purple-950/40',
            borderColor: 'border-purple-800/50',
            accentColor: 'text-purple-400',
            stats: [
                { label: 'Times Prestiged', key: 'prestigeCount', icon: '🔄' },
                { label: 'Total BP Earned', key: 'totalBPEarned', icon: '💎' },
                { label: 'Current BP', key: '_currentBP', icon: '⚡', computed: true }
            ]
        },
        {
            key: 'account', icon: '📅', title: 'Account',
            gradient: 'from-emerald-900/60 to-emerald-950/40',
            borderColor: 'border-emerald-800/50',
            accentColor: 'text-emerald-400',
            stats: [
                { label: 'Daily Logins', key: 'dailyLoginsTotal', icon: '📆' },
                { label: 'Playing Since', key: '_playStart', icon: '🕐', computed: true }
            ]
        },
        {
            key: 'guild', icon: '⚔️', title: 'Clan War',
            gradient: 'from-orange-900/60 to-orange-950/40',
            borderColor: 'border-orange-800/50',
            accentColor: 'text-orange-400',
            stats: [
                { label: 'Wars Won', key: '_warWins', icon: '🏆', computed: true },
                { label: 'Wars Lost', key: '_warLosses', icon: '💔', computed: true },
                { label: 'War Draws', key: '_warDraws', icon: '🤝', computed: true },
                { label: 'Win Streak', key: '_warStreak', icon: '🔥', computed: true },
                { label: 'Total Stars', key: '_warStars', icon: '⭐', computed: true }
            ]
        }
    ];

    // ---- COMPUTE SPECIAL VALUES ----
    function getStatValue(statDef) {
        var stats = state.stats || {};

        if (!statDef.computed) {
            var val = stats[statDef.key] || 0;
            var prefix = statDef.prefix || '';
            return prefix + formatNumber(val);
        }

        switch (statDef.key) {
            case '_winRate':
                var wins = stats.pvpWins || 0;
                var losses = stats.pvpLosses || 0;
                var total = wins + losses;
                if (total === 0) return '0%';
                return (wins / total * 100).toFixed(1) + '%';

            case '_bestiary':
                var count = 0;
                if (state.bestiary && typeof state.bestiary === 'object') {
                    count = Object.keys(state.bestiary).length;
                }
                return formatNumber(count);

            case '_currentBP':
                return formatNumber(state.bazingaPoints || 0);

            case '_playStart':
                var ts = stats.playStartTime || state.lastOnlineTimestamp || Date.now();
                try {
                    var d = new Date(ts);
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
                } catch(e) {
                    return 'Unknown';
                }

            case '_warWins':
                var gw = state.guildWar || {};
                return formatNumber(gw.wins || 0);
            case '_warLosses':
                var gw2 = state.guildWar || {};
                return formatNumber(gw2.losses || 0);
            case '_warDraws':
                var gw3 = state.guildWar || {};
                return formatNumber(gw3.draws || 0);
            case '_warStreak':
                var gw4 = state.guildWar || {};
                var streak = gw4.warStreak || 0;
                return streak > 0 ? streak + 'W' : streak < 0 ? Math.abs(streak) + 'L' : '0';
            case '_warStars':
                var gw5 = state.guildWar || {};
                var hist = gw5.warHistory || [];
                var totalStars = 0;
                for (var h = 0; h < hist.length; h++) {
                    totalStars += (hist[h].ourStars || 0);
                }
                return formatNumber(totalStars);

            default:
                return '0';
        }
    }

    // ---- CHARACTER PERFORMANCE SECTION ----
    function renderCharPerformanceSection() {
        var body = document.getElementById('stats-modal-body');
        if (!body) return;

        // Build character DPS data from equipped characters
        var charData = [];
        if (state.roster && state.equipped && typeof characters !== 'undefined') {
            var charKeys = Object.keys(state.equipped);
            for (var i = 0; i < charKeys.length; i++) {
                var key = charKeys[i];
                if (!state.equipped[key] || !state.roster[key]) continue;
                var config = characters[key];
                if (!config) continue;
                var rosterData = state.roster[key];
                var level = rosterData.level || 1;
                var baseDmg = config.baseDmg || 1;
                var totalDmg = Math.floor(baseDmg * level);
                var atkSpeed = config.atkSpeed || 1.5;
                var dps = (totalDmg / atkSpeed).toFixed(1);
                var critChance = config.critChance || 0;
                var currentHp = rosterData.currentHp || 0;
                var maxHp = rosterData.maxHp || 100;
                var hpPct = Math.round((currentHp / maxHp) * 100);

                charData.push({
                    key: key,
                    name: config.name || key,
                    level: level,
                    damage: totalDmg,
                    dps: dps,
                    critChance: Math.round(critChance * 100),
                    hpPct: hpPct,
                    lane: config.lane || 'mid',
                    passive: config.passiveType || 'none'
                });
            }
        }

        if (charData.length === 0) return;

        // Sort by DPS descending
        charData.sort(function(a, b) { return parseFloat(b.dps) - parseFloat(a.dps); });

        var html = '<div class="rounded-lg border border-cyan-800/50 overflow-hidden bg-slate-950/40 backdrop-blur-sm mt-2" style="animation:stats-slide-in 0.3s ease-out forwards; animation-delay:0.5s; opacity:0;">';

        // Header
        html += '<div id="stats-section-charperf" class="flex items-center justify-between p-2.5 cursor-pointer transition-colors hover:bg-white/5" onclick="toggleStatsSection(\'charperf\')">';
        html += '<div class="flex items-center gap-2">';
        html += '<span class="text-base">👥</span>';
        html += '<span class="font-black text-cyan-400 text-[11px] uppercase tracking-widest">Character Performance</span>';
        html += '</div>';
        html += '<div class="flex items-center gap-2">';
        html += '<button class="text-[8px] font-bold px-1.5 py-0.5 rounded bg-cyan-900/50 border border-cyan-700/50 text-cyan-300 hover:bg-cyan-800/50 cursor-pointer" onclick="event.stopPropagation(); openCharCompare()">⚖️ Compare</button>';
        html += '<span id="stats-chevron-charperf" class="stats-chevron text-gray-500 text-[10px] select-none">▼</span>';
        html += '</div>';
        html += '</div>';

        // Body
        html += '<div id="stats-body-charperf" class="stats-section-body">';
        html += '<div class="px-3 pb-2.5 space-y-1.5">';

        for (var c = 0; c < charData.length; c++) {
            var ch = charData[c];
            var laneColors = { front: 'text-red-400', mid: 'text-yellow-400', back: 'text-blue-400' };
            var laneColor = laneColors[ch.lane] || 'text-gray-400';
            var hpColor = ch.hpPct > 50 ? 'text-green-400' : ch.hpPct > 20 ? 'text-yellow-400' : 'text-red-400';

            html += '<div class="bg-slate-900/60 rounded-lg p-2 border border-slate-800/40">';
            html += '<div class="flex items-center justify-between mb-1">';
            html += '<div class="flex items-center gap-1.5">';
            html += '<span class="text-[10px] font-black text-white uppercase">' + ch.name + '</span>';
            html += '<span class="text-[8px] ' + laneColor + ' font-bold uppercase bg-slate-800/60 px-1 rounded">' + ch.lane + '</span>';
            html += '</div>';
            html += '<span class="text-[9px] text-amber-400 font-black">Lv.' + ch.level + '</span>';
            html += '</div>';

            // Stats row
            html += '<div class="flex items-center justify-between text-[8px]">';
            html += '<div class="flex items-center gap-2">';
            html += '<span class="text-gray-400">DMG <span class="text-white font-bold">' + formatNumber(ch.damage) + '</span></span>';
            html += '<span class="text-gray-400">DPS <span class="text-cyan-300 font-bold">' + ch.dps + '</span></span>';
            html += '<span class="text-gray-400">CRIT <span class="text-amber-300 font-bold">' + ch.critChance + '%</span></span>';
            html += '</div>';
            html += '<span class="' + hpColor + ' font-bold">HP ' + ch.hpPct + '%</span>';
            html += '</div>';

            // DPS bar
            var maxDps = parseFloat(charData[0].dps) || 1;
            var barWidth = Math.round((parseFloat(ch.dps) / maxDps) * 100);
            html += '<div class="mt-1 h-1 bg-slate-800 rounded-full overflow-hidden">';
            html += '<div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all" style="width:' + barWidth + '%"></div>';
            html += '</div>';
            html += '</div>';
        }

        html += '</div></div>'; // close body
        html += '</div>'; // close section

        body.insertAdjacentHTML('beforeend', html);
    }

    // ---- OPEN STATS MODAL ----
    window.openStatsModal = function(event) {
        if (event) event.stopPropagation();

        // Remove existing
        var existing = document.getElementById('stats-modal-overlay');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'stats-modal-overlay';
        overlay.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100001] p-2';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

        var modal = document.createElement('div');
        modal.className = 'bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-amber-500/40 rounded-xl w-full max-w-md max-h-[92vh] overflow-hidden flex flex-col shadow-[0_0_60px_rgba(245,158,11,0.15)]';

        // Header
        var header = document.createElement('div');
        header.className = 'p-3 border-b border-amber-900/50 flex items-center justify-between bg-gradient-to-r from-amber-950/80 via-slate-950 to-amber-950/80 shrink-0';
        header.innerHTML = 
            '<div>' +
                '<h2 class="text-amber-400 font-black text-sm tracking-widest uppercase" style="text-shadow:0 0 10px rgba(245,158,11,0.5);">📊 STATISTICS</h2>' +
                '<div class="text-[7px] text-gray-500 mt-0.5">Your complete game record</div>' +
            '</div>' +
            '<button class="text-gray-400 hover:text-white text-lg font-bold cursor-pointer px-2" onclick="this.closest(\'#stats-modal-overlay\').remove()">✕</button>';
        modal.appendChild(header);

        // Summary bar
        var summaryBar = document.createElement('div');
        summaryBar.className = 'px-3 py-2 bg-slate-950/60 border-b border-slate-800/50 flex items-center justify-around text-center shrink-0';
        var totalKills = (state.stats && state.stats.totalKills) || 0;
        var highWave = (state.stats && state.stats.highestWave) || 0;
        var pvpW = (state.stats && state.stats.pvpWins) || 0;
        summaryBar.innerHTML = 
            '<div>' +
                '<div class="text-[7px] text-gray-500 uppercase tracking-wider">Kills</div>' +
                '<div class="text-sm font-black text-red-400">' + formatNumber(totalKills) + '</div>' +
            '</div>' +
            '<div class="w-px h-7 bg-slate-800"></div>' +
            '<div>' +
                '<div class="text-[7px] text-gray-500 uppercase tracking-wider">Best Wave</div>' +
                '<div class="text-sm font-black text-blue-400">' + formatNumber(highWave) + '</div>' +
            '</div>' +
            '<div class="w-px h-7 bg-slate-800"></div>' +
            '<div>' +
                '<div class="text-[7px] text-gray-500 uppercase tracking-wider">PVP Wins</div>' +
                '<div class="text-sm font-black text-amber-400">' + formatNumber(pvpW) + '</div>' +
            '</div>' +
            '<div class="w-px h-7 bg-slate-800"></div>' +
            '<div>' +
                '<div class="text-[7px] text-gray-500 uppercase tracking-wider">Prestiges</div>' +
                '<div class="text-sm font-black text-purple-400">' + ((state.stats && state.stats.prestigeCount) || 0) + '</div>' +
            '</div>';
        modal.appendChild(summaryBar);

        // Scrollable body
        var body = document.createElement('div');
        body.className = 'flex-1 overflow-y-auto p-3 space-y-2';
        body.id = 'stats-modal-body';
        modal.appendChild(body);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Render categories
        renderStatCategories();
        renderCharPerformanceSection();
    };

    function renderStatCategories() {
        var body = document.getElementById('stats-modal-body');
        if (!body) return;

        var html = '';
        for (var c = 0; c < STAT_CATEGORIES.length; c++) {
            var cat = STAT_CATEGORIES[c];
            var sectionId = 'stats-section-' + cat.key;
            var bodyId = 'stats-body-' + cat.key;
            var chevronId = 'stats-chevron-' + cat.key;

            // Section container
            html += '<div class="rounded-lg border ' + cat.borderColor + ' overflow-hidden bg-slate-950/40 backdrop-blur-sm" style="animation:stats-slide-in 0.3s ease-out forwards; animation-delay:' + (c * 0.06) + 's; opacity:0;">';

            // Section header (clickable toggle)
            html += '<div id="' + sectionId + '" class="flex items-center justify-between p-2.5 cursor-pointer transition-colors hover:bg-white/5" onclick="toggleStatsSection(\'' + cat.key + '\')">';
            html += '<div class="flex items-center gap-2">';
            html += '<span class="text-base">' + cat.icon + '</span>';
            html += '<span class="font-black ' + cat.accentColor + ' text-[11px] uppercase tracking-widest">' + cat.title + '</span>';
            html += '</div>';
            html += '<span id="' + chevronId + '" class="stats-chevron text-gray-500 text-[10px] select-none">▼</span>';
            html += '</div>';

            // Section body (collapsible)
            html += '<div id="' + bodyId + '" class="stats-section-body">';
            html += '<div class="px-3 pb-2.5 space-y-0">';

            for (var s = 0; s < cat.stats.length; s++) {
                var st = cat.stats[s];
                var val = getStatValue(st);
                var isLast = (s === cat.stats.length - 1);
                var borderClass = isLast ? '' : ' border-b border-slate-800/40';

                html += '<div class="flex items-center justify-between py-2' + borderClass + '">';
                html += '<div class="flex items-center gap-2">';
                html += '<span class="text-sm w-5 text-center">' + st.icon + '</span>';
                html += '<span class="text-[10px] text-gray-400 font-bold">' + st.label + '</span>';
                html += '</div>';
                html += '<span class="text-[11px] text-white font-black tabular-nums">' + val + '</span>';
                html += '</div>';
            }

            html += '</div></div>'; // close body + inner padding div
            html += '</div>'; // close section container
        }

        body.innerHTML = html;

        // Auto-open the first two sections
        setTimeout(function() {
            toggleStatsSection('combat');
            toggleStatsSection('economy');
        }, 100);
    }

    // ---- TOGGLE SECTION ----
    window.toggleStatsSection = function(key) {
        var bodyEl = document.getElementById('stats-body-' + key);
        var chevron = document.getElementById('stats-chevron-' + key);
        if (!bodyEl) return;

        var isOpen = bodyEl.classList.contains('open');
        if (isOpen) {
            bodyEl.classList.remove('open');
            if (chevron) chevron.classList.remove('open');
        } else {
            bodyEl.classList.add('open');
            if (chevron) chevron.classList.add('open');
        }
    };

    // ---- INIT ----
    function initStatistics() {

        // Ensure stats object exists with all keys
        if (!state.stats) state.stats = {};
        var defaults = {
            totalKills: 0, bossKills: 0, pvpWins: 0, pvpLosses: 0,
            foodUsed: 0, robotsCrafted: 0, moneyEarned: 0, moneySpent: 0,
            charactersHired: 0, locationsUnlocked: 1, bazingaSpent: 0,
            highestWave: 1, totalDamage: 0, dailyLoginsTotal: 0,
            prestigeCount: 0, totalBPEarned: 0
        };
        for (var k in defaults) {
            if (state.stats[k] === undefined) state.stats[k] = defaults[k];
        }

        // Set play start time if missing
        if (!state.stats.playStartTime) {
            state.stats.playStartTime = state.lastOnlineTimestamp || Date.now();
        }
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStatistics);
    } else {
        setTimeout(initStatistics, 250);
    }

    // ---- CHARACTER COMPARISON MODAL ----
    window.openCharCompare = function(event) {
        if (event) event.stopPropagation();

        var existing = document.getElementById('char-compare-overlay');
        if (existing) existing.remove();

        // Get all hired characters
        var hiredChars = [];
        if (state.roster && typeof characters !== 'undefined') {
            for (var key in state.roster) {
                if (state.roster[key] && characters[key]) {
                    hiredChars.push(key);
                }
            }
        }
        if (hiredChars.length < 2) {
            if (typeof showGameAlert === 'function') showGameAlert('Need Characters', 'Hire at least 2 characters to compare.');
            return;
        }

        var overlay = document.createElement('div');
        overlay.id = 'char-compare-overlay';
        overlay.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100002] p-2';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

        var modal = document.createElement('div');
        modal.className = 'bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-cyan-500/40 rounded-xl w-full max-w-md max-h-[92vh] overflow-hidden flex flex-col shadow-[0_0_60px_rgba(6,182,212,0.15)]';

        // Header
        var header = document.createElement('div');
        header.className = 'p-3 border-b border-cyan-900/50 flex items-center justify-between bg-gradient-to-r from-cyan-950/80 via-slate-950 to-cyan-950/80 shrink-0';
        header.innerHTML = '<div>' +
            '<h2 class="text-cyan-400 font-black text-sm tracking-widest uppercase" style="text-shadow:0 0 10px rgba(6,182,212,0.5);">⚖️ COMPARE</h2>' +
            '<div class="text-[7px] text-gray-500 mt-0.5">Side-by-side character comparison</div>' +
            '</div>' +
            '<button class="text-gray-400 hover:text-white text-lg font-bold cursor-pointer px-2" onclick="this.closest(\'#char-compare-overlay\').remove()">✕</button>';
        modal.appendChild(header);

        // Selection row
        var selectRow = document.createElement('div');
        selectRow.className = 'px-3 py-2 bg-slate-950/60 border-b border-slate-800/50 flex items-center gap-2 shrink-0';

        var buildSelect = function(id, defaultVal) {
            var sel = '<select id="' + id + '" class="bg-slate-800 text-white text-[10px] font-bold border border-slate-700 rounded px-2 py-1 flex-1 cursor-pointer" onchange="updateCharCompare()">';
            for (var i = 0; i < hiredChars.length; i++) {
                var k = hiredChars[i];
                var name = characters[k] ? characters[k].name : k;
                var selected = (k === defaultVal) ? ' selected' : '';
                sel += '<option value="' + k + '"' + selected + '>' + name + ' (Lv.' + (state.roster[k].level || 1) + ')</option>';
            }
            sel += '</select>';
            return sel;
        };

        selectRow.innerHTML = buildSelect('compare-char-a', hiredChars[0]) +
            '<span class="text-cyan-400 font-black text-sm">VS</span>' +
            buildSelect('compare-char-b', hiredChars.length > 1 ? hiredChars[1] : hiredChars[0]);
        modal.appendChild(selectRow);

        // Body
        var body = document.createElement('div');
        body.className = 'flex-1 overflow-y-auto p-3';
        body.id = 'compare-body';
        modal.appendChild(body);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Initial render
        window.updateCharCompare();
    };

    window.updateCharCompare = function() {
        var body = document.getElementById('compare-body');
        var selA = document.getElementById('compare-char-a');
        var selB = document.getElementById('compare-char-b');
        if (!body || !selA || !selB) return;

        var keyA = selA.value;
        var keyB = selB.value;
        var cfgA = characters[keyA];
        var cfgB = characters[keyB];
        var rA = state.roster[keyA] || {};
        var rB = state.roster[keyB] || {};
        var lvA = rA.level || 1;
        var lvB = rB.level || 1;

        var stats = [
            { label: 'DAMAGE', a: Math.floor((cfgA.baseDmg || 1) * lvA), b: Math.floor((cfgB.baseDmg || 1) * lvB), color: 'from-red-500 to-orange-500' },
            { label: 'HP', a: Math.floor((cfgA.baseHp || 100) * Math.pow(cfgA.lane === 'front' ? 1.40 : 1.25, lvA - 1)), b: Math.floor((cfgB.baseHp || 100) * Math.pow(cfgB.lane === 'front' ? 1.40 : 1.25, lvB - 1)), color: 'from-green-500 to-emerald-500' },
            { label: 'ATK SPEED', a: parseFloat(cfgA.atkSpeed || 1.5), b: parseFloat(cfgB.atkSpeed || 1.5), color: 'from-yellow-500 to-amber-500', lower: true },
            { label: 'DPS', a: parseFloat((Math.floor((cfgA.baseDmg || 1) * lvA) / (cfgA.atkSpeed || 1.5)).toFixed(1)), b: parseFloat((Math.floor((cfgB.baseDmg || 1) * lvB) / (cfgB.atkSpeed || 1.5)).toFixed(1)), color: 'from-cyan-500 to-blue-500' },
            { label: 'CRIT %', a: Math.round((cfgA.critChance || 0) * 100), b: Math.round((cfgB.critChance || 0) * 100), color: 'from-amber-500 to-yellow-500' },
            { label: 'LEVEL', a: lvA, b: lvB, color: 'from-purple-500 to-violet-500' }
        ];

        var html = '<div class="space-y-2">';

        // Character headers
        html += '<div class="flex items-center justify-between mb-3">';
        html += '<div class="text-center flex-1">';
        html += '<div class="text-[10px] font-black text-white uppercase">' + cfgA.name + '</div>';
        html += '<div class="text-[8px] text-gray-500">' + (cfgA.lane || 'mid').toUpperCase() + ' · ' + (cfgA.passiveType || 'none') + '</div>';
        html += '</div>';
        html += '<div class="text-center flex-1">';
        html += '<div class="text-[10px] font-black text-white uppercase">' + cfgB.name + '</div>';
        html += '<div class="text-[8px] text-gray-500">' + (cfgB.lane || 'mid').toUpperCase() + ' · ' + (cfgB.passiveType || 'none') + '</div>';
        html += '</div>';
        html += '</div>';

        for (var i = 0; i < stats.length; i++) {
            var s = stats[i];
            var maxVal = Math.max(s.a, s.b) || 1;
            var aWins = s.lower ? s.a < s.b : s.a > s.b;
            var bWins = s.lower ? s.b < s.a : s.b > s.a;
            var aPct = Math.round((s.a / maxVal) * 100);
            var bPct = Math.round((s.b / maxVal) * 100);

            html += '<div class="bg-slate-900/60 rounded-lg p-2 border border-slate-800/40">';
            html += '<div class="text-[8px] text-gray-400 font-bold text-center mb-1.5 uppercase tracking-wider">' + s.label + '</div>';

            // Bar comparison
            html += '<div class="flex items-center gap-1">';
            // Left value
            html += '<span class="text-[10px] font-black w-12 text-right ' + (aWins ? 'text-cyan-300' : bWins ? 'text-gray-500' : 'text-white') + '">' + (typeof s.a === 'number' && s.a % 1 !== 0 ? s.a.toFixed(2) : formatNumber(s.a)) + '</span>';
            // Left bar (grows right-to-left)
            html += '<div class="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden flex justify-end">';
            html += '<div class="h-full bg-gradient-to-r ' + s.color + ' rounded-full transition-all ' + (aWins ? 'opacity-100' : 'opacity-40') + '" style="width:' + aPct + '%"></div>';
            html += '</div>';
            // Center divider
            html += '<div class="w-px h-4 bg-slate-700"></div>';
            // Right bar (grows left-to-right)
            html += '<div class="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">';
            html += '<div class="h-full bg-gradient-to-r ' + s.color + ' rounded-full transition-all ' + (bWins ? 'opacity-100' : 'opacity-40') + '" style="width:' + bPct + '%"></div>';
            html += '</div>';
            // Right value
            html += '<span class="text-[10px] font-black w-12 text-left ' + (bWins ? 'text-cyan-300' : aWins ? 'text-gray-500' : 'text-white') + '">' + (typeof s.b === 'number' && s.b % 1 !== 0 ? s.b.toFixed(2) : formatNumber(s.b)) + '</span>';
            html += '</div>';
            html += '</div>';
        }

        html += '</div>';
        body.innerHTML = html;
    };

})();
