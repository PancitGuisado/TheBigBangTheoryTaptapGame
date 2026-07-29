// ============================================================
// PRESTIGE SYSTEM EXPANSION — New Bazinga Point Perks for YS Era
// ============================================================
(function() {
    'use strict';

    // ── NEW PERK DEFINITIONS ──
    const ysPerks = {
        ysTeamSynergy: {
            name: '🤝 YS Team Synergy',
            desc: 'YS characters deal +5% damage per level when 2+ YS chars are equipped',
            maxLevel: 10,
            costBase: 50,
            costScale: 1.8,
            icon: '🤝'
        },
        texasLoot: {
            name: '🤠 Texas Loot Multiplier',
            desc: '+10% loot drops per level on Texas maps',
            maxLevel: 10,
            costBase: 40,
            costScale: 1.6,
            icon: '🤠'
        },
        timelineShield: {
            name: '🛡️ Timeline Shield',
            desc: 'All characters take -3% damage per level',
            maxLevel: 10,
            costBase: 60,
            costScale: 2.0,
            icon: '🛡️'
        },
        chemMastery: {
            name: '🧪 Chemical Mastery',
            desc: 'AoE abilities deal +8% damage per level',
            maxLevel: 10,
            costBase: 45,
            costScale: 1.7,
            icon: '🧪'
        },
        holyBlessing: {
            name: '✝️ Holy Blessing',
            desc: 'All healing effects increased by +10% per level',
            maxLevel: 10,
            costBase: 55,
            costScale: 1.9,
            icon: '✝️'
        }
    };

    // Register YS perks into the game's perk system
    window.ysPerks = ysPerks;

    // Ensure state has YS perk levels
    function ensureYSPerks() {
        if (typeof state === 'undefined') return;
        if (!state.perks) state.perks = {};
        for (var key in ysPerks) {
            if (typeof state.perks[key] === 'undefined') state.perks[key] = 0;
        }
    }

    // Get perk cost for next level
    window.getYSPerkCost = function(perkKey) {
        ensureYSPerks();
        var perk = ysPerks[perkKey];
        if (!perk) return Infinity;
        var level = state.perks[perkKey] || 0;
        if (level >= perk.maxLevel) return Infinity;
        return Math.floor(perk.costBase * Math.pow(perk.costScale, level));
    };

    // Buy a YS perk level
    window.buyYSPerk = function(perkKey) {
        ensureYSPerks();
        var perk = ysPerks[perkKey];
        if (!perk) return false;
        var level = state.perks[perkKey] || 0;
        if (level >= perk.maxLevel) return false;
        var cost = window.getYSPerkCost(perkKey);
        if ((state.bazingaPoints || 0) < cost) return false;

        state.bazingaPoints -= cost;
        state.perks[perkKey] = level + 1;

        if (typeof saveProgress === 'function') saveProgress();
        if (typeof showGameAlert === 'function') {
            showGameAlert(perk.icon + ' ' + perk.name + ' upgraded!', 'Now level ' + (level + 1) + '/' + perk.maxLevel, 3000);
        }
        return true;
    };

    // Get the effective bonus from a perk
    window.getYSPerkBonus = function(perkKey) {
        if (typeof state === 'undefined' || !state.perks) return 0;
        var level = state.perks[perkKey] || 0;
        switch (perkKey) {
            case 'ysTeamSynergy': return level * 0.05;  // +5% per level
            case 'texasLoot': return level * 0.10;       // +10% per level
            case 'timelineShield': return level * 0.03;  // -3% per level
            case 'chemMastery': return level * 0.08;     // +8% per level
            case 'holyBlessing': return level * 0.10;    // +10% per level
            default: return 0;
        }
    };

    // Count equipped YS characters
    window.countEquippedYS = function() {
        if (typeof state === 'undefined' || !state.equipped || typeof characters === 'undefined') return 0;
        var count = 0;
        for (var key in state.equipped) {
            if (state.equipped[key] && characters[key] && characters[key].era === 'young_sheldon') count++;
        }
        return count;
    };

    // Auto-init
    if (typeof state !== 'undefined') ensureYSPerks();
    setTimeout(ensureYSPerks, 2000);

    console.log('[YS Prestige] 5 new Bazinga Point perks loaded');
})();
