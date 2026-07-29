// ============================================================
// WAVE SCALING — Enhanced progression for YS Era (Waves 81-200+)
// Handles boss scaling, enemy difficulty, and map-based multipliers
// ============================================================
(function() {
    'use strict';

    // ── WAVE TIER DEFINITIONS ──
    var waveTiers = [
        { min: 1,   max: 20,  name: 'Pasadena Beginnings',   hpMult: 1.0,   dmgMult: 1.0,   lootMult: 1.0 },
        { min: 21,  max: 40,  name: 'Caltech Chaos',          hpMult: 1.5,   dmgMult: 1.3,   lootMult: 1.2 },
        { min: 41,  max: 60,  name: 'Pasadena Under Siege',   hpMult: 2.5,   dmgMult: 1.6,   lootMult: 1.5 },
        { min: 61,  max: 80,  name: 'The Final Stand',        hpMult: 4.0,   dmgMult: 2.0,   lootMult: 2.0 },
        { min: 81,  max: 100, name: 'Texas Arrival',          hpMult: 5.0,   dmgMult: 2.5,   lootMult: 2.5 },
        { min: 101, max: 120, name: 'Dr. Chaos Rising',       hpMult: 8.0,   dmgMult: 3.0,   lootMult: 3.0 },
        { min: 121, max: 150, name: 'Timeline Fracture',      hpMult: 12.0,  dmgMult: 4.0,   lootMult: 4.0 },
        { min: 151, max: 200, name: 'Endgame',                hpMult: 20.0,  dmgMult: 5.0,   lootMult: 5.0 },
        { min: 201, max: 999, name: 'Infinite Grind',         hpMult: 30.0,  dmgMult: 6.0,   lootMult: 6.0 }
    ];

    // Get current wave tier
    window.getWaveTier = function(wave) {
        wave = wave || (typeof state !== 'undefined' ? state.wave : 1);
        for (var i = 0; i < waveTiers.length; i++) {
            if (wave >= waveTiers[i].min && wave <= waveTiers[i].max) return waveTiers[i];
        }
        return waveTiers[waveTiers.length - 1];
    };

    // Get HP multiplier for current wave
    window.getWaveHPScale = function(wave) {
        var tier = window.getWaveTier(wave);
        var waveInTier = wave - tier.min;
        var tierRange = tier.max - tier.min + 1;
        // Smooth scaling within tier
        var progress = waveInTier / tierRange;
        return tier.hpMult * (1 + progress * 0.5);
    };

    // Get damage multiplier for enemies at current wave
    window.getWaveDmgScale = function(wave) {
        var tier = window.getWaveTier(wave);
        var waveInTier = wave - tier.min;
        var tierRange = tier.max - tier.min + 1;
        var progress = waveInTier / tierRange;
        return tier.dmgMult * (1 + progress * 0.3);
    };

    // Get loot multiplier for current wave
    window.getWaveLootScale = function(wave) {
        var tier = window.getWaveTier(wave);
        // Also apply Texas Loot perk if available
        var perkBonus = typeof window.getYSPerkBonus === 'function' ? window.getYSPerkBonus('texasLoot') : 0;
        var isTexas = typeof state !== 'undefined' && state.currentLocation && state.currentLocation.startsWith('ys_');
        return tier.lootMult * (1 + (isTexas ? perkBonus : 0));
    };

    // Boss mechanics for wave 100+
    window.getBossSpecialMechanic = function(wave) {
        if (wave < 100) return null;
        var mechanics = [
            { type: 'enrage', desc: 'Boss enrages at 30% HP, dealing 2x damage', threshold: 0.3, dmgBoost: 2.0 },
            { type: 'shield', desc: 'Boss has a shield that absorbs first 20% of damage', shieldPct: 0.2 },
            { type: 'heal', desc: 'Boss heals 5% HP every 10 seconds', healPct: 0.05, interval: 10000 },
            { type: 'summon', desc: 'Boss summons minions every 15 seconds', interval: 15000 },
            { type: 'reflect', desc: 'Boss reflects 10% of damage back', reflectPct: 0.1 }
        ];
        return mechanics[(wave - 100) % mechanics.length];
    };

    // Get tier name for UI display
    window.getWaveTierName = function(wave) {
        var tier = window.getWaveTier(wave);
        return tier.name;
    };

    console.log('[WaveScale] Enhanced wave scaling system loaded (9 tiers up to wave 999)');
})();
