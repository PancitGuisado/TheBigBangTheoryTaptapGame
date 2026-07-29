// ============================================================
// BATTLE LOG — Persistent combat history you can review
// ============================================================

(function() {
    'use strict';

    // ---- CONFIG ----
    var MAX_LOG_ENTRIES = 50;
    var MAX_EVENTS_PER_ENTRY = 30;

    // ---- CSS ----
    var style = document.createElement('style');
    style.textContent = [
        '@keyframes log-slide { 0%{opacity:0;transform:translateX(-10px);} 100%{opacity:1;transform:translateX(0);} }',
        '.battle-log-entry { animation: log-slide 0.2s ease-out; }'
    ].join('\n');
    document.head.appendChild(style);

    // ---- STATE INIT ----
    function initBattleLog() {
        if (!state.battleLog) state.battleLog = [];
    }

    // ---- RECORD A BATTLE ----
    function recordBattle(type, result, details) {
        initBattleLog();

        var entry = {
            id: Date.now(),
            time: new Date().toISOString(),
            type: type,        // 'wave', 'boss', 'pvp', 'guild_war', 'event'
            result: result,    // 'victory', 'defeat', 'draw'
            wave: state.wave || 0,
            details: details || {},
            events: []         // combat events list
        };

        state.battleLog.unshift(entry);

        // Keep log trimmed
        if (state.battleLog.length > MAX_LOG_ENTRIES) {
            state.battleLog = state.battleLog.slice(0, MAX_LOG_ENTRIES);
        }

        return entry;
    }

    // ---- ADD EVENT TO CURRENT BATTLE ----
    function addBattleEvent(type, message) {
        initBattleLog();
        if (state.battleLog.length === 0) return;

        var current = state.battleLog[0];
        if (current.events.length >= MAX_EVENTS_PER_ENTRY) return;

        current.events.push({
            time: Date.now(),
            type: type,   // 'damage', 'crit', 'kill', 'heal', 'buff', 'debuff'
            msg: message
        });
    }

    // ---- OPEN BATTLE LOG MODAL ----
    function openBattleLog() {
        initBattleLog();

        var existing = document.getElementById('battle-log-modal');
        if (existing) existing.remove();

        var entriesHtml = '';
        if (state.battleLog.length === 0) {
            entriesHtml = '<div class="text-center text-gray-500 py-10 text-sm font-bold uppercase tracking-wider">No battles recorded yet</div>';
        }

        for (var i = 0; i < state.battleLog.length; i++) {
            var entry = state.battleLog[i];
            var time = new Date(entry.time);
            var timeStr = time.toLocaleDateString() + ' ' + time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Type styling
            var typeColors = {
                wave: '#22c55e', boss: '#ef4444', pvp: '#a855f7',
                guild_war: '#f59e0b', event: '#06b6d4'
            };
            var typeIcons = {
                wave: '⚔️', boss: '💀', pvp: '🏟️',
                guild_war: '🏰', event: '🎪'
            };
            var typeLabels = {
                wave: 'Wave Clear', boss: 'Boss Fight', pvp: 'PVP Battle',
                guild_war: 'Guild War', event: 'Event Battle'
            };

            var color = typeColors[entry.type] || '#6b7280';
            var icon = typeIcons[entry.type] || '⚔️';
            var label = typeLabels[entry.type] || entry.type;

            var resultColor = entry.result === 'victory' ? '#22c55e' : (entry.result === 'defeat' ? '#ef4444' : '#f59e0b');
            var resultLabel = entry.result === 'victory' ? '✓ WIN' : (entry.result === 'defeat' ? '✗ LOSS' : '~ DRAW');

            // Details
            var detailStr = '';
            if (entry.details.enemy) detailStr += 'vs ' + entry.details.enemy + ' ';
            if (entry.details.damage) detailStr += '| ' + entry.details.damage + ' total dmg ';
            if (entry.details.trophies) detailStr += '| ' + (entry.details.trophies > 0 ? '+' : '') + entry.details.trophies + '🏆 ';
            if (entry.details.reward) detailStr += '| +$' + entry.details.reward;

            // Events list (collapsed by default)
            var eventsHtml = '';
            if (entry.events.length > 0) {
                eventsHtml = '<div id="log-events-' + i + '" class="hidden mt-2 pl-3 border-l-2 border-white/5 max-h-[120px] overflow-y-auto">';
                for (var e = 0; e < entry.events.length; e++) {
                    var evt = entry.events[e];
                    var evtColor = {
                        damage: '#9ca3af', crit: '#f59e0b', kill: '#ef4444',
                        heal: '#22c55e', buff: '#3b82f6', debuff: '#a855f7'
                    }[evt.type] || '#6b7280';

                    eventsHtml += '<div class="text-[7px] py-0.5" style="color:' + evtColor + '">' + evt.msg + '</div>';
                }
                eventsHtml += '</div>';
            }

            var expandBtn = entry.events.length > 0
                ? ' <button onclick="var el=document.getElementById(\'log-events-' + i + '\');el.classList.toggle(\'hidden\');this.textContent=el.classList.contains(\'hidden\')?\'▸\':\'▾\';" class="text-gray-600 hover:text-white text-[8px] cursor-pointer ml-1">▸</button>'
                : '';

            entriesHtml += '<div class="battle-log-entry bg-slate-800/40 border border-white/5 rounded-lg p-3 mb-2" style="animation-delay:' + (i * 0.03) + 's">' +
                '<div class="flex items-center justify-between">' +
                    '<div class="flex items-center gap-2">' +
                        '<span class="text-sm">' + icon + '</span>' +
                        '<div>' +
                            '<div class="text-[10px] font-bold" style="color:' + color + '">' + label + ' — Wave ' + entry.wave + expandBtn + '</div>' +
                            '<div class="text-[7px] text-gray-600">' + timeStr + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<span class="text-[9px] font-black px-2 py-0.5 rounded" style="color:' + resultColor + ';background:' + resultColor + '15;">' + resultLabel + '</span>' +
                '</div>' +
                (detailStr ? '<div class="text-[8px] text-gray-500 mt-1">' + detailStr + '</div>' : '') +
                eventsHtml +
            '</div>';
        }

        // Stats summary
        var totalBattles = state.battleLog.length;
        var wins = state.battleLog.filter(function(e) { return e.result === 'victory'; }).length;
        var losses = state.battleLog.filter(function(e) { return e.result === 'defeat'; }).length;
        var winRate = totalBattles > 0 ? Math.round((wins / totalBattles) * 100) : 0;

        var modal = document.createElement('div');
        modal.id = 'battle-log-modal';
        modal.className = 'fixed inset-0 z-[9200] flex items-center justify-center';
        modal.innerHTML = '' +
            '<div class="absolute inset-0 bg-black/60" onclick="document.getElementById(\'battle-log-modal\').remove()"></div>' +
            '<div class="relative bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl max-w-[420px] w-full mx-4 shadow-2xl overflow-hidden" style="max-height:85vh">' +
                // Header
                '<div class="flex items-center justify-between px-5 py-3 border-b border-white/10">' +
                    '<div class="font-black text-white text-[14px] uppercase tracking-widest">📜 Battle Log</div>' +
                    '<div class="flex items-center gap-3">' +
                        '<span class="text-[8px] text-emerald-400 font-bold">' + wins + 'W</span>' +
                        '<span class="text-[8px] text-red-400 font-bold">' + losses + 'L</span>' +
                        '<span class="text-[8px] text-amber-400 font-bold">' + winRate + '% WR</span>' +
                    '</div>' +
                    '<button onclick="document.getElementById(\'battle-log-modal\').remove()" class="text-gray-400 hover:text-white text-xl cursor-pointer leading-none">✕</button>' +
                '</div>' +
                // Log entries
                '<div class="p-4 overflow-y-auto" style="max-height:calc(85vh - 56px);">' +
                    entriesHtml +
                '</div>' +
            '</div>';

        document.body.appendChild(modal);
    }

    // ---- HOOK INTO COMBAT SYSTEM ----
    // Record boss kills and PVP results
    function hookCombatEvents() {
        // Hook into the existing addCombatLog function
        var origAddCombatLog = window.addCombatLog;
        if (origAddCombatLog) {
            window.addCombatLog = function(icon, msg) {
                origAddCombatLog(icon, msg);
                addBattleEvent('damage', icon + ' ' + msg);
            };
        }
    }

    // ---- INIT ----
    function init() {
        initBattleLog();
        hookCombatEvents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 3000); });
    } else {
        setTimeout(init, 3000);
    }

    // Exports
    window.recordBattle = recordBattle;
    window.addBattleEvent = addBattleEvent;
    window.openBattleLog = openBattleLog;
})();
