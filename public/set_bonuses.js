// ============================================================
// EQUIPMENT SET BONUS SYSTEM
// Equipping items of matching rarity tier grants bonus stats
// ============================================================

(function() {
    'use strict';

    // ---- SET BONUS DEFINITIONS ----
    // Activated when a character has all 3 slots (weapon+armor+accessory) filled
    // with items of the specified minimum rarity
    var SET_BONUSES = {
        // All 3 slots filled with ANY items
        full_gear: {
            name: 'Full Gear',
            icon: '🛡️',
            color: '#6b7280',
            desc: '+5% DMG (all 3 slots equipped)',
            check: function(items) { return items.length === 3; },
            stats: { dmgPct: 5 }
        },
        // All 3 slots filled with RARE or higher
        rare_set: {
            name: 'Rare Arsenal',
            icon: '💎',
            color: '#3b82f6',
            desc: '+10% DMG, +30 HP (all Rare+)',
            check: function(items) {
                return items.length === 3 && items.every(function(i) {
                    return ['rare','epic','legendary'].indexOf(i.rarity) >= 0;
                });
            },
            stats: { dmgPct: 10, hp: 30 }
        },
        // All 3 slots filled with EPIC or higher
        epic_set: {
            name: 'Epic Armory',
            icon: '⚡',
            color: '#a855f7',
            desc: '+20% DMG, +80 HP, +5% CRIT (all Epic+)',
            check: function(items) {
                return items.length === 3 && items.every(function(i) {
                    return ['epic','legendary'].indexOf(i.rarity) >= 0;
                });
            },
            stats: { dmgPct: 20, hp: 80, critPct: 5 }
        },
        // All 3 slots filled with LEGENDARY
        legendary_set: {
            name: 'Legendary Constellation',
            icon: '🌟',
            color: '#f59e0b',
            desc: '+40% DMG, +200 HP, +15% CRIT, +10% SPD (all Legendary)',
            check: function(items) {
                return items.length === 3 && items.every(function(i) {
                    return i.rarity === 'legendary';
                });
            },
            stats: { dmgPct: 40, hp: 200, critPct: 15, speedPct: 10 }
        },
        // Special: All items are from the same type's "matching" theme
        // (weapon+armor same type focus — e.g. all nerd-culture items)
        nerd_collection: {
            name: 'Nerd Collection',
            icon: '🤓',
            color: '#22c55e',
            desc: '+15% DMG, +50 HP (lightsaber + flash shirt + spock ears)',
            check: function(items) {
                var keys = items.map(function(i) { return i.key; });
                return keys.indexOf('lightsaber_chopsticks') >= 0 &&
                       keys.indexOf('flash_tshirt') >= 0 &&
                       keys.indexOf('spock_ears') >= 0;
            },
            stats: { dmgPct: 15, hp: 50 }
        },
        // Special: All legendary matching set
        god_tier: {
            name: 'God Tier',
            icon: '👑',
            color: '#ef4444',
            desc: '+30% DMG, +150 HP, +10% CRIT (Excalibur + Vibranium + One Ring)',
            check: function(items) {
                var keys = items.map(function(i) { return i.key; });
                return keys.indexOf('excalibur') >= 0 &&
                       keys.indexOf('vibranium_shield') >= 0 &&
                       keys.indexOf('one_ring') >= 0;
            },
            stats: { dmgPct: 30, hp: 150, critPct: 10 }
        }
    };

    // ---- GET ACTIVE SET BONUSES FOR A CHARACTER ----
    function getCharSetBonuses(charKey) {
        if (typeof state === 'undefined' || !state.charEquipment || !state.charEquipment[charKey]) return [];
        if (typeof state.inventory === 'undefined') return [];

        var slots = state.charEquipment[charKey];
        var equipped = [];

        var slotNames = ['weapon', 'armor', 'accessory'];
        for (var i = 0; i < slotNames.length; i++) {
            var eqId = slots[slotNames[i]];
            if (!eqId) continue;
            var item = state.inventory.find(function(e) { return e.id === eqId; });
            if (item) equipped.push(item);
        }

        var active = [];
        for (var key in SET_BONUSES) {
            var bonus = SET_BONUSES[key];
            if (bonus.check(equipped)) {
                active.push({ key: key, bonus: bonus });
            }
        }
        return active;
    }

    // ---- GET COMBINED SET BONUS STATS ----
    function getCharSetBonusStats(charKey) {
        var totals = { dmgPct: 0, hp: 0, critPct: 0, speedPct: 0 };
        var bonuses = getCharSetBonuses(charKey);

        for (var i = 0; i < bonuses.length; i++) {
            var stats = bonuses[i].bonus.stats;
            for (var s in stats) {
                if (totals[s] !== undefined) totals[s] += stats[s];
            }
        }
        return totals;
    }

    // ---- RENDER SET BONUS INDICATORS IN INVENTORY MODAL ----
    // Shows active set bonuses at the top of the inventory
    function renderSetBonusBar() {
        // Find any equipped character with set bonuses
        var html = '';
        var anyActive = false;

        if (!state.charEquipment) return '';

        for (var ck in state.charEquipment) {
            var bonuses = getCharSetBonuses(ck);
            if (bonuses.length === 0) continue;

            var charName = (typeof characters !== 'undefined' && characters[ck]) ? characters[ck].name : ck;
            anyActive = true;

            for (var i = 0; i < bonuses.length; i++) {
                var b = bonuses[i].bonus;
                html += '<div class="flex items-center gap-2 bg-slate-800/60 rounded-lg px-3 py-1.5 border" style="border-color:' + b.color + '40">' +
                    '<span class="text-sm">' + b.icon + '</span>' +
                    '<div>' +
                        '<div class="text-[9px] font-bold" style="color:' + b.color + '">' + b.name + '</div>' +
                        '<div class="text-[7px] text-gray-500">' + charName + ' · ' + b.desc + '</div>' +
                    '</div>' +
                '</div>';
            }
        }

        if (!anyActive) return '';
        return '<div class="px-4 py-2 border-b border-white/5">' +
            '<div class="text-[8px] text-amber-400 font-bold uppercase tracking-widest mb-1">⚡ Active Set Bonuses</div>' +
            '<div class="flex flex-wrap gap-2">' + html + '</div>' +
        '</div>';
    }

    // ---- EXPORTS ----
    window.SET_BONUSES = SET_BONUSES;
    window.getCharSetBonuses = getCharSetBonuses;
    window.getCharSetBonusStats = getCharSetBonusStats;
    window.renderSetBonusBar = renderSetBonusBar;
})();
