// ============================================================
// TEXAS GEAR — Young Sheldon Map Equipment Drops
// Self-contained IIFE. Relies on globals:
//   state, characters, locations, EQUIPMENT_DEFS, RARITY_COLORS,
//   addEquipmentToInventory, equipItem, getCharEquipmentStats,
//   renderEquipmentDropNotification, saveProgress, syncUI
// ============================================================
(function () {
    'use strict';

    // ────────────────────────────────────────────────────────────
    // 1. TEXAS GEAR ITEM DEFINITIONS
    // ────────────────────────────────────────────────────────────
    //
    // Stat keys align with the existing equipment system:
    //   dmg, hp, critPct, speedPct, dmgReductPct, dodgePct,
    //   critDmgPct, aoePct, allStatsPct, teamDmgPct
    //
    // Extra stat keys introduced for Texas gear (percentage-based):
    //   lifestealPct, healPct, teamHpPct, lootPct, moneyPct,
    //   summonDmgPct, prestigePct, stylePts
    // ────────────────────────────────────────────────────────────

    var TEXAS_GEAR = {
        // ── Common Tier ──
        cowboy_hat: {
            name: 'Cowboy Hat',
            type: 'armor',
            rarity: 'common',
            icon: '🤠',
            desc: 'A weathered Stetson straight outta Medford. DEF +15%, Dodge +5%.',
            stats: { dmgReductPct: 15, dodgePct: 5 }
        },
        chicken_feather: {
            name: 'Chicken Feather',
            type: 'accessory',
            rarity: 'common',
            icon: '🪶',
            desc: "Plucked from Billy Sparks' prized hen. Summon DMG +25%.",
            stats: { summonDmgPct: 25 }
        },
        mullet_wig: {
            name: 'Mullet Wig',
            type: 'armor',
            rarity: 'common',
            icon: '💇',
            desc: "Business in the front, party in the back. Dodge +15%, Style +10.",
            stats: { dodgePct: 15, stylePts: 10 }
        },
        coach_whistle: {
            name: 'Coach Whistle',
            type: 'accessory',
            rarity: 'common',
            icon: '📯',
            desc: 'Blow it and the whole team hustles. Team ATK Speed +15%.',
            stats: { speedPct: 15 }
        },

        // ── Rare Tier ──
        brisket_shield: {
            name: 'Brisket Shield',
            type: 'armor',
            rarity: 'rare',
            icon: '🥩',
            desc: 'A slab of slow-smoked armor. HP +20%, Lifesteal +5%.',
            stats: { hp: 80, lifestealPct: 5 }
        },
        football_pads: {
            name: 'Football Pads',
            type: 'armor',
            rarity: 'rare',
            icon: '🏈',
            desc: "Medford High's finest protection. DEF +25%, ATK +10%.",
            stats: { dmgReductPct: 25, dmg: 18 }
        },
        meemaws_pearls: {
            name: "Meemaw's Pearls",
            type: 'accessory',
            rarity: 'rare',
            icon: '📿',
            desc: 'Connie Tucker\'s lucky necklace. Loot +50%, Money +25%.',
            stats: { lootPct: 50, moneyPct: 25 }
        },
        holy_bible: {
            name: 'Holy Bible',
            type: 'accessory',
            rarity: 'rare',
            icon: '📖',
            desc: 'Pastor Jeff approved. Heal +30%, Team HP +10%.',
            stats: { healPct: 30, teamHpPct: 10 }
        },

        // ── Epic Tier ──
        lab_goggles: {
            name: 'Lab Goggles',
            type: 'accessory',
            rarity: 'epic',
            icon: '🥽',
            desc: "Young Sheldon's prized safety specs. AoE DMG +20%, Crit +10%.",
            stats: { aoePct: 20, critPct: 10 }
        },
        leather_whip: {
            name: 'Leather Whip',
            type: 'weapon',
            rarity: 'epic',
            icon: '🪢',
            desc: "Pastor Rob's signature weapon. Crit DMG +40%.",
            stats: { critDmgPct: 40 }
        },
        texas_star_badge: {
            name: 'Texas Star Badge',
            type: 'accessory',
            rarity: 'epic',
            icon: '⭐',
            desc: 'The Lone Star shines on all stats. All Stats +5%.',
            stats: { allStatsPct: 5 }
        },

        // ── Legendary Tier ──
        time_machine_fragment: {
            name: 'Time Machine Fragment',
            type: 'accessory',
            rarity: 'legendary',
            icon: '⏳',
            desc: 'A shard ripped from the space-time continuum. Prestige Bonus +10%.',
            stats: { prestigePct: 10, allStatsPct: 3 }
        }
    };

    // Expose globally so other systems can reference definitions
    window.texasGearItems = TEXAS_GEAR;

    // Also merge into the master EQUIPMENT_DEFS so the existing
    // inventory / equip / enhance / dismantle pipeline works seamlessly.
    if (typeof EQUIPMENT_DEFS !== 'undefined') {
        for (var gk in TEXAS_GEAR) {
            if (!EQUIPMENT_DEFS[gk]) {
                EQUIPMENT_DEFS[gk] = TEXAS_GEAR[gk];
            }
        }
    }

    // ────────────────────────────────────────────────────────────
    // 2. YS-LOCATION LOOKUP TABLE
    // ────────────────────────────────────────────────────────────
    var YS_LOCATION_KEYS = [
        'ys_cooper_home',
        'ys_high_school',
        'ys_texas_ranch',
        'ys_desert',
        'ys_museum',
        'ys_chaos_lab'
    ];

    function _isYSLocation(locationKey) {
        return YS_LOCATION_KEYS.indexOf(locationKey) !== -1;
    }

    // ────────────────────────────────────────────────────────────
    // 3. DROP RATE TABLE
    // ────────────────────────────────────────────────────────────
    //
    // Rarity     | Base Drop Rate | Boss Multiplier
    // -----------|----------------|----------------
    // Common     |     15%        |    ×2.0
    // Rare       |      5%        |    ×2.5
    // Epic       |      1%        |    ×3.0
    // Legendary  |      —         |  Boss-only 0.5%
    // ────────────────────────────────────────────────────────────

    var TEXAS_DROP_RATES = {
        common:    0.15,
        rare:      0.05,
        epic:      0.01,
        legendary: 0.00   // only from bosses
    };

    var BOSS_DROP_MULTIPLIER = {
        common:    2.0,
        rare:      2.5,
        epic:      3.0,
        legendary: 1.0   // flat 0.5% for boss legendary
    };

    var BOSS_LEGENDARY_RATE = 0.005; // 0.5%

    // ────────────────────────────────────────────────────────────
    // 4. GEAR DROP ROLL
    // ────────────────────────────────────────────────────────────
    /**
     * Roll for a Texas gear drop after defeating an enemy on a YS map.
     *
     * @param  {string}  locationKey  — current map key (e.g. 'ys_texas_ranch')
     * @param  {boolean} isBoss       — true if the defeated enemy was a boss
     * @return {object|null}          — equipment item object or null
     */
    function rollTexasGearDrop(locationKey, isBoss) {
        // Only drop on YS maps
        if (!_isYSLocation(locationKey)) return null;

        // Lucky Drops prestige perk: +20% bonus to all rates
        var perkBonus = 1.0;
        if (typeof state !== 'undefined' && state.perks && state.perks.luckyDrops) {
            perkBonus = 1.20;
        }

        // Build weighted rarity pool
        var rarities = ['legendary', 'epic', 'rare', 'common']; // check rarest first
        var chosenRarity = null;

        for (var i = 0; i < rarities.length; i++) {
            var r = rarities[i];
            var rate = TEXAS_DROP_RATES[r];

            if (isBoss) {
                if (r === 'legendary') {
                    rate = BOSS_LEGENDARY_RATE;
                } else {
                    rate *= BOSS_DROP_MULTIPLIER[r];
                }
            }

            rate *= perkBonus;

            if (Math.random() < rate) {
                chosenRarity = r;
                break;
            }
        }

        if (!chosenRarity) return null;

        // Collect Texas gear keys of that rarity
        var pool = [];
        for (var key in TEXAS_GEAR) {
            if (TEXAS_GEAR[key].rarity === chosenRarity) {
                pool.push(key);
            }
        }
        if (pool.length === 0) return null;

        var chosenKey = pool[Math.floor(Math.random() * pool.length)];
        var def = TEXAS_GEAR[chosenKey];

        // Build an item instance compatible with the existing inventory system
        var item = {
            id: _texasNextId(),
            key: chosenKey,
            name: def.name,
            type: def.type,
            rarity: def.rarity,
            icon: def.icon || '',
            stats: _cloneStats(def.stats),
            level: 1,
            enhanceLevel: 0,
            equippedTo: null,
            source: 'texas_gear'
        };

        return item;
    }

    // Unique ID generator for Texas gear drops
    var _texasIdCounter = 0;
    function _texasNextId() {
        _texasIdCounter++;
        return 'tg_' + Date.now().toString(36) + '_' + _texasIdCounter;
    }

    function _cloneStats(src) {
        var out = {};
        for (var k in src) out[k] = src[k];
        return out;
    }

    // ────────────────────────────────────────────────────────────
    // 5. STAT BONUS LOOKUP
    // ────────────────────────────────────────────────────────────
    /**
     * Sum up the total bonus a character gets from equipped Texas gear
     * for a specific stat type.
     *
     * @param  {string} charKey  — e.g. 'sheldon', 'ys_missy'
     * @param  {string} statType — e.g. 'dmgReductPct', 'critPct', 'lootPct'
     * @return {number}          — total additive bonus from all equipped slots
     */
    function getGearStatBonus(charKey, statType) {
        if (!state || !state.charEquipment || !state.charEquipment[charKey]) return 0;
        if (!state.inventory) return 0;

        var slots = state.charEquipment[charKey];
        var total = 0;
        var slotNames = ['weapon', 'armor', 'accessory'];

        for (var i = 0; i < slotNames.length; i++) {
            var eqId = slots[slotNames[i]];
            if (!eqId) continue;

            var item = null;
            for (var j = 0; j < state.inventory.length; j++) {
                if (state.inventory[j].id === eqId) { item = state.inventory[j]; break; }
            }
            if (!item || !item.stats || item.stats[statType] === undefined) continue;

            // Respect enhancement scaling (same formula as equipment.js)
            var baseVal = item.stats[statType];
            var levelMult = 1 + ((item.level || 1) - 1) * 0.2;
            var enhMult = 1 + (item.enhanceLevel || 0) * 0.08;
            total += Math.floor(baseVal * levelMult * enhMult);
        }

        return total;
    }

    // ────────────────────────────────────────────────────────────
    // 6. EQUIP BEST GEAR (Auto-Equip Optimal)
    // ────────────────────────────────────────────────────────────
    //
    // Strategy per class type:
    //   tank     → prioritise hp, dmgReductPct
    //   dps      → prioritise dmg, critPct, critDmgPct
    //   assassin → prioritise dmg, critPct, critDmgPct, dodgePct
    //   magic    → prioritise dmg, aoePct, critPct
    //   aoe      → prioritise aoePct, dmg
    //   support  → prioritise healPct, teamHpPct, speedPct, hp
    //   default  → generic power score
    // ────────────────────────────────────────────────────────────

    var CLASS_WEIGHTS = {
        tank:     { hp: 3, dmgReductPct: 4, dmg: 1, dodgePct: 2, lifestealPct: 2 },
        dps:      { dmg: 4, critPct: 3, critDmgPct: 3, speedPct: 2 },
        assassin: { dmg: 4, critPct: 3, critDmgPct: 4, dodgePct: 2, speedPct: 1 },
        magic:    { dmg: 3, aoePct: 4, critPct: 2, speedPct: 1 },
        aoe:      { aoePct: 5, dmg: 3, critPct: 1 },
        support:  { healPct: 4, teamHpPct: 3, speedPct: 3, hp: 2, lootPct: 1 }
    };

    var DEFAULT_WEIGHTS = { dmg: 2, hp: 2, critPct: 1, speedPct: 1, allStatsPct: 3 };

    function _scoreItem(item, weights) {
        var score = 0;
        for (var stat in item.stats) {
            var baseVal = item.stats[stat] || 0;
            var levelMult = 1 + ((item.level || 1) - 1) * 0.2;
            var enhMult = 1 + (item.enhanceLevel || 0) * 0.08;
            var effective = baseVal * levelMult * enhMult;
            var w = weights[stat] || 1;
            score += effective * w;
        }
        // Rarity bonus
        var rarityBonus = { common: 0, rare: 10, epic: 30, legendary: 60 };
        score += rarityBonus[item.rarity] || 0;
        return score;
    }

    /**
     * Auto-equip the best available gear to every active character.
     * Unequipped inventory items are distributed greedily — higher-level
     * characters pick first.
     */
    function equipBestGear() {
        if (!state || !state.inventory || state.inventory.length === 0) return;
        if (typeof characters === 'undefined') return;

        // 1. Unequip everything first for a clean slate
        for (var u = 0; u < state.inventory.length; u++) {
            var it = state.inventory[u];
            if (it.equippedTo) {
                if (state.charEquipment[it.equippedTo]) {
                    var slot = it.type;
                    if (state.charEquipment[it.equippedTo][slot] === it.id) {
                        state.charEquipment[it.equippedTo][slot] = null;
                    }
                }
                it.equippedTo = null;
            }
        }

        // 2. Build sorted list of active characters (highest level first)
        var activeChars = [];
        for (var ck in state.roster) {
            if (state.roster[ck].level > 0 && characters[ck]) {
                activeChars.push(ck);
            }
        }
        activeChars.sort(function (a, b) {
            return (state.roster[b].level || 0) - (state.roster[a].level || 0);
        });

        // 3. Track which items have been assigned
        var assigned = {};

        var slotTypes = ['weapon', 'armor', 'accessory'];

        for (var ci = 0; ci < activeChars.length; ci++) {
            var charKey = activeChars[ci];
            var charDef = characters[charKey];
            var classType = charDef.classType || 'dps';
            var weights = CLASS_WEIGHTS[classType] || DEFAULT_WEIGHTS;

            // Ensure equipment slots exist
            if (!state.charEquipment[charKey]) {
                state.charEquipment[charKey] = { weapon: null, armor: null, accessory: null };
            }

            for (var si = 0; si < slotTypes.length; si++) {
                var sType = slotTypes[si];
                var bestItem = null;
                var bestScore = -1;

                for (var ii = 0; ii < state.inventory.length; ii++) {
                    var inv = state.inventory[ii];
                    if (inv.type !== sType) continue;
                    if (assigned[inv.id]) continue;

                    var sc = _scoreItem(inv, weights);
                    if (sc > bestScore) {
                        bestScore = sc;
                        bestItem = inv;
                    }
                }

                if (bestItem) {
                    state.charEquipment[charKey][sType] = bestItem.id;
                    bestItem.equippedTo = charKey;
                    assigned[bestItem.id] = true;
                }
            }
        }

        // 4. Persist & refresh
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();

        // Show confirmation
        if (typeof showGameAlert === 'function') {
            showGameAlert('🤠 Best Gear Equipped!',
                'All active characters have been outfitted with their optimal loadout.');
        }

        // Re-render inventory modal if it's open
        if (typeof renderInventoryModal === 'function') renderInventoryModal();
    }

    // ────────────────────────────────────────────────────────────
    // 7. EXPOSE PUBLIC API
    // ────────────────────────────────────────────────────────────
    window.rollTexasGearDrop = rollTexasGearDrop;
    window.equipBestGear     = equipBestGear;
    window.getGearStatBonus  = getGearStatBonus;

    console.log('[TEXAS GEAR] Module loaded — 12 items registered.');
})();
