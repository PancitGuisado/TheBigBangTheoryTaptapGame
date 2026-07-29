// ============================================================
// CHARACTER DETAIL MODAL — Full stat breakdown with equipment,
// set bonuses, synergies, and equipment management
// ============================================================

(function() {
    'use strict';

    function openCharDetail(charKey) {
        if (!characters || !characters[charKey]) return;
        if (!state.roster || !state.roster[charKey]) return;

        var existing = document.getElementById('char-detail-modal');
        if (existing) existing.remove();

        var ch = characters[charKey];
        var roster = state.roster[charKey];

        // ---- BASE STATS ----
        var level = roster.level || 1;
        var baseHp = ch.baseHp || 100;
        var baseAtk = ch.baseAtk || 10;
        var baseDef = ch.baseDef || 5;
        var baseSpd = ch.baseSpd || 1;

        // Scaling per level
        var maxHp = Math.floor(baseHp * (1 + (level - 1) * 0.15));
        var atk = Math.floor(baseAtk * (1 + (level - 1) * 0.12));
        var def = Math.floor(baseDef * (1 + (level - 1) * 0.10));
        var spd = baseSpd;

        // ---- EQUIPMENT BONUSES ----
        var equipStats = { dmg: 0, hp: 0, critPct: 0, speedPct: 0 };
        if (typeof getCharEquipmentStats === 'function') {
            equipStats = getCharEquipmentStats(charKey);
        }

        // ---- SET BONUSES ----
        var setBonusInfo = '';
        if (typeof getActiveBonuses === 'function') {
            var bonuses = getActiveBonuses();
            if (bonuses && bonuses.length > 0) {
                for (var b = 0; b < bonuses.length; b++) {
                    setBonusInfo += '<div class="flex items-center gap-1.5 mb-1">' +
                        '<span class="text-emerald-400 text-[8px]">⚡</span>' +
                        '<span class="text-emerald-300 text-[8px] font-bold">' + esc(bonuses[b].name || bonuses[b].setName || 'Set Bonus') + '</span>' +
                    '</div>';
                }
            }
        }

        // ---- SYNERGIES ----
        var synergiesHtml = '';
        if (ch.tags && ch.tags.length > 0) {
            for (var t = 0; t < ch.tags.length; t++) {
                var tagColors = { 'physicist': '#3b82f6', 'engineer': '#f59e0b', 'nerd': '#a855f7', 'social': '#ec4899', 'leader': '#ef4444', 'scientist': '#22d3ee', 'robot': '#6b7280' };
                var tagColor = tagColors[ch.tags[t]] || '#6b7280';
                synergiesHtml += '<span class="text-[7px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style="color:' + tagColor + ';background:' + tagColor + '15;border:1px solid ' + tagColor + '30">' + ch.tags[t] + '</span> ';
            }
        }

        // ---- EQUIPPED ITEMS ----
        var slotsHtml = '';
        var slotNames = ['weapon', 'armor', 'accessory'];
        var slotIcons = { weapon: '⚔️', armor: '🛡️', accessory: '💍' };
        if (typeof initEquipment === 'function') initEquipment();

        for (var s = 0; s < slotNames.length; s++) {
            var slot = slotNames[s];
            var eqId = state.charEquipment && state.charEquipment[charKey] ? state.charEquipment[charKey][slot] : null;
            var item = null;
            if (eqId && state.inventory) {
                item = state.inventory.find(function(e) { return e.id === eqId; });
            }

            if (item) {
                var rarityColor = '#9ca3af';
                if (typeof RARITY_COLORS !== 'undefined' && RARITY_COLORS[item.rarity]) rarityColor = RARITY_COLORS[item.rarity];
                slotsHtml += '<div class="flex items-center gap-2 bg-slate-800/50 border rounded-lg px-3 py-2 mb-1.5" style="border-color:' + rarityColor + '40">' +
                    '<span class="text-sm">' + slotIcons[slot] + '</span>' +
                    '<div class="flex-1 min-w-0">' +
                        '<div class="text-[9px] font-bold truncate" style="color:' + rarityColor + '">' + esc(item.name) + ' <span class="text-gray-500">Lv.' + item.level + '</span></div>' +
                        '<div class="text-[7px] text-gray-500">' + formatItemStats(item.stats) + '</div>' +
                    '</div>' +
                    '<button onclick="unequipItem(\'' + item.id + '\');openCharDetail(\'' + charKey + '\')" class="text-[7px] text-red-400 hover:text-red-300 cursor-pointer font-bold px-1">✕</button>' +
                '</div>';
            } else {
                slotsHtml += '<div class="flex items-center gap-2 bg-black/20 border border-white/5 rounded-lg px-3 py-2 mb-1.5 opacity-40">' +
                    '<span class="text-sm">' + slotIcons[slot] + '</span>' +
                    '<div class="text-[8px] text-gray-600 italic">Empty ' + slot + ' slot</div>' +
                '</div>';
            }
        }

        // ---- TOTAL STATS ----
        var totalAtk = atk + equipStats.dmg;
        var totalHp = maxHp + equipStats.hp;
        var totalDef = def;
        var critPct = equipStats.critPct || 0;

        // ---- CHARACTER SVG ----
        var charSvg = '';
        if (typeof getVectorFrame === 'function') {
            charSvg = getVectorFrame(charKey, false) || '';
        }

        // ---- CURRENT HP ----
        var currentHp = typeof roster.currentHp !== 'undefined' ? roster.currentHp : totalHp;
        var hpPct = Math.max(0, Math.min(100, Math.floor((currentHp / totalHp) * 100)));
        var hpColor = hpPct > 60 ? '#22c55e' : (hpPct > 25 ? '#f59e0b' : '#ef4444');

        // ---- STATUS ----
        var statusText = 'Active';
        var statusColor = '#22c55e';
        if (roster.status === 'hospitalized') {
            statusText = 'Hospitalized';
            statusColor = '#ef4444';
        } else if (!state.equipped || !state.equipped[charKey]) {
            statusText = 'Benched';
            statusColor = '#6b7280';
        }

        // ---- XP ----
        var xp = roster.xp || 0;
        var xpNeeded = (ch.xpPerLevel || 100) * level;
        var xpPct = Math.min(100, Math.floor((xp / xpNeeded) * 100));

        // ---- BUILD MODAL ----
        var modal = document.createElement('div');
        modal.id = 'char-detail-modal';
        modal.className = 'fixed inset-0 z-[9400] flex items-center justify-center';

        modal.innerHTML = '' +
        '<div class="absolute inset-0 bg-black/70" onclick="closeCharDetail()"></div>' +
        '<div class="relative bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl max-w-[400px] w-full mx-4 shadow-2xl overflow-hidden" style="max-height:85vh">' +
            // Header with character art
            '<div class="relative px-5 pt-4 pb-3 border-b border-white/10" style="background:linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))">' +
                '<button onclick="closeCharDetail()" class="absolute top-3 right-4 text-gray-400 hover:text-white text-xl cursor-pointer leading-none z-10">✕</button>' +
                '<div class="flex items-center gap-3">' +
                    // Character portrait
                    '<div class="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden" style="background:radial-gradient(circle, rgba(255,255,255,0.05), rgba(0,0,0,0.3));border:2px solid rgba(255,255,255,0.1)">' +
                        (charSvg ? '<div style="transform:scale(0.9)">' + charSvg + '</div>' : '<span class="text-3xl">' + (ch.emoji || '👤') + '</span>') +
                    '</div>' +
                    // Name & Level
                    '<div class="flex-1 min-w-0">' +
                        '<div class="text-white text-[14px] font-black tracking-wide truncate">' + esc(ch.name) + '</div>' +
                        '<div class="flex items-center gap-2 mt-0.5">' +
                            '<span class="text-blue-400 text-[10px] font-bold">Lv.' + level + '</span>' +
                            '<span class="text-[8px] font-bold px-1.5 py-0.5 rounded" style="color:' + statusColor + ';background:' + statusColor + '15;border:1px solid ' + statusColor + '30">' + statusText + '</span>' +
                        '</div>' +
                        // XP Bar
                        '<div class="mt-1.5 h-1.5 bg-black/40 rounded-full overflow-hidden">' +
                            '<div class="h-full rounded-full" style="width:' + xpPct + '%;background:linear-gradient(90deg, #3b82f6, #8b5cf6);transition:width 0.3s"></div>' +
                        '</div>' +
                        '<div class="text-[7px] text-gray-500 mt-0.5">XP: ' + xp + ' / ' + xpNeeded + '</div>' +
                    '</div>' +
                '</div>' +
                // Tags
                (synergiesHtml ? '<div class="mt-2 flex flex-wrap gap-1">' + synergiesHtml + '</div>' : '') +
            '</div>' +

            // Scrollable body
            '<div class="p-4 overflow-y-auto" style="max-height:calc(85vh - 120px);">' +
                // HP Bar
                '<div class="mb-4">' +
                    '<div class="flex items-center justify-between mb-1">' +
                        '<span class="text-[8px] text-gray-500 uppercase font-bold tracking-wider">Health</span>' +
                        '<span class="text-[9px] font-bold" style="color:' + hpColor + '">' + Math.floor(currentHp) + ' / ' + totalHp + '</span>' +
                    '</div>' +
                    '<div class="h-2 bg-black/40 rounded-full overflow-hidden">' +
                        '<div class="h-full rounded-full transition-all" style="width:' + hpPct + '%;background:' + hpColor + '"></div>' +
                    '</div>' +
                '</div>' +

                // Combat Stats Grid
                '<div class="text-[8px] text-gray-500 uppercase font-bold tracking-wider mb-2">Combat Stats</div>' +
                '<div class="grid grid-cols-2 gap-2 mb-4">' +
                    statBox('⚔️ ATK', totalAtk, equipStats.dmg > 0 ? '+' + equipStats.dmg : null, '#ef4444') +
                    statBox('❤️ HP', totalHp, equipStats.hp > 0 ? '+' + equipStats.hp : null, '#22c55e') +
                    statBox('🛡️ DEF', totalDef, null, '#3b82f6') +
                    statBox('⚡ SPD', spd.toFixed(1), equipStats.speedPct > 0 ? '+' + equipStats.speedPct + '%' : null, '#f59e0b') +
                    (critPct > 0 ? statBox('🎯 CRIT', critPct + '%', null, '#a855f7') : '') +
                '</div>' +

                // Equipment Section
                '<div class="text-[8px] text-gray-500 uppercase font-bold tracking-wider mb-2">Equipment</div>' +
                slotsHtml +

                // Set Bonuses
                (setBonusInfo ? '<div class="mt-3"><div class="text-[8px] text-gray-500 uppercase font-bold tracking-wider mb-2">Active Set Bonuses</div>' + setBonusInfo + '</div>' : '') +

                // Manage Equipment button
                '<button onclick="closeCharDetail();if(typeof openInventoryModal===\'function\')openInventoryModal()" class="w-full mt-3 bg-slate-800/80 hover:bg-slate-700/80 text-gray-300 text-[9px] font-bold py-2.5 rounded-lg cursor-pointer border border-white/10 transition-all uppercase tracking-wider">🎒 Manage Equipment</button>' +
            '</div>' +
        '</div>';

        document.body.appendChild(modal);
    }

    function closeCharDetail() {
        var modal = document.getElementById('char-detail-modal');
        if (modal) modal.remove();
    }

    // ---- HELPERS ----

    function statBox(label, value, bonus, color) {
        return '<div class="bg-slate-800/40 border border-white/5 rounded-lg px-3 py-2 text-center">' +
            '<div class="text-[7px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">' + label + '</div>' +
            '<div class="text-[14px] font-black" style="color:' + color + '">' + value + '</div>' +
            (bonus ? '<div class="text-[7px] text-emerald-400">(' + bonus + ' gear)</div>' : '') +
        '</div>';
    }

    function formatItemStats(stats) {
        var parts = [];
        if (stats.dmg) parts.push('+' + stats.dmg + ' DMG');
        if (stats.hp) parts.push('+' + stats.hp + ' HP');
        if (stats.critPct) parts.push('+' + stats.critPct + '% CRIT');
        if (stats.speedPct) parts.push('+' + stats.speedPct + '% SPD');
        return parts.join(' · ');
    }

    function esc(str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Exports
    window.openCharDetail = openCharDetail;
    window.closeCharDetail = closeCharDetail;
})();
