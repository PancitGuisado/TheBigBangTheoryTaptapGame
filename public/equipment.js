// ============================================================
// EQUIPMENT / GEAR SYSTEM
// Relies on global: state, characters, saveProgress(), syncUI()
// ============================================================

// ----- DEFINITIONS -----
var RARITY_COLORS = {
    common:    '#9ca3af',
    rare:      '#3b82f6',
    epic:      '#a855f7',
    legendary: '#f59e0b'
};

var RARITY_ORDER = ['common', 'rare', 'epic', 'legendary'];

// ---- ENHANCEMENT CONSTANTS ----
var ENHANCE_MAX_LEVEL = 15;
var ENHANCE_STAT_BONUS_PER_LEVEL = 0.08; // +8% per enhance level
var ENHANCE_SUCCESS_RATES = {
    // enhanceLevel range → success rate
    // +1 to +5: 100%
    // +6 to +10: 80%
    // +11 to +15: 60%
};
(function() {
    for (var i = 1; i <= 5; i++) ENHANCE_SUCCESS_RATES[i] = 1.0;
    for (var j = 6; j <= 10; j++) ENHANCE_SUCCESS_RATES[j] = 0.8;
    for (var k = 11; k <= 15; k++) ENHANCE_SUCCESS_RATES[k] = 0.6;
})();

// Enhancement cost formula: stone + iron + gold, scaling with level
function getEnhanceCost(enhanceLevel) {
    // Cost to go from enhanceLevel to enhanceLevel+1
    var lvl = enhanceLevel + 1;
    return {
        stone: Math.floor(15 * lvl + 5 * lvl * lvl),
        iron:  Math.floor(10 * lvl + 3 * lvl * lvl),
        gold:  Math.floor(5 * lvl + lvl * lvl)
    };
}

// Total cost spent to reach a given enhance level (for dismantle refund)
function getTotalEnhanceCost(enhanceLevel) {
    var total = { stone: 0, iron: 0, gold: 0 };
    for (var i = 0; i < enhanceLevel; i++) {
        var c = getEnhanceCost(i);
        total.stone += c.stone;
        total.iron  += c.iron;
        total.gold  += c.gold;
    }
    return total;
}

// ---- GLOW EFFECT CSS INJECTION ----
(function injectEnhanceStyles() {
    if (typeof document === 'undefined') return;
    var styleId = 'equip-enhance-styles';
    if (document.getElementById(styleId)) return;
    var style = document.createElement('style');
    style.id = styleId;
    style.textContent =
        '@keyframes equipGlow1 { 0%,100%{box-shadow:0 0 6px 1px rgba(100,200,255,0.3)} 50%{box-shadow:0 0 12px 3px rgba(100,200,255,0.5)} }' +
        '@keyframes equipGlow2 { 0%,100%{box-shadow:0 0 8px 2px rgba(160,100,255,0.4)} 50%{box-shadow:0 0 16px 4px rgba(160,100,255,0.7)} }' +
        '@keyframes equipGlow3 { 0%,100%{box-shadow:0 0 12px 3px rgba(255,180,50,0.5)} 50%{box-shadow:0 0 20px 6px rgba(255,180,50,0.8)} }' +
        '.equip-glow-low { animation: equipGlow1 2s ease-in-out infinite; }' +
        '.equip-glow-mid { animation: equipGlow2 1.8s ease-in-out infinite; }' +
        '.equip-glow-high { animation: equipGlow3 1.5s ease-in-out infinite; }' +
        '@keyframes enhanceSuccess { 0%{transform:scale(1);filter:brightness(1)} 30%{transform:scale(1.08);filter:brightness(1.8)} 100%{transform:scale(1);filter:brightness(1)} }' +
        '@keyframes enhanceFail { 0%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} 100%{transform:translateX(0)} }' +
        '.enhance-success-flash { animation: enhanceSuccess 0.6s ease-out; }' +
        '.enhance-fail-shake { animation: enhanceFail 0.5s ease-out; }' +
        '@keyframes fusionSpin { 0%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(0.85)} 100%{transform:rotate(360deg) scale(1)} }' +
        '.fusion-spin { animation: fusionSpin 0.8s ease-in-out; }' +
        '.equip-compare-better { color: #22c55e !important; }' +
        '.equip-compare-worse { color: #ef4444 !important; }' +
        '.equip-compare-same { color: #9ca3af !important; }' +
        '@keyframes dismantleShatter { 0%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.8} 100%{transform:scale(0);opacity:0} }' +
        '.dismantle-shatter { animation: dismantleShatter 0.4s ease-in forwards; }';
    document.head.appendChild(style);
})();

// Enhancement glow class based on level
function _getGlowClass(enhanceLevel) {
    if (!enhanceLevel || enhanceLevel <= 0) return '';
    if (enhanceLevel <= 5) return 'equip-glow-low';
    if (enhanceLevel <= 10) return 'equip-glow-mid';
    return 'equip-glow-high';
}

// Format item name with enhancement
function _getDisplayName(item) {
    var name = item.name || 'Unknown';
    var enh = item.enhanceLevel || 0;
    if (enh > 0) return name + ' +' + enh;
    return name;
}

// ---- DISMANTLE REWARDS ----
var DISMANTLE_REWARDS = {
    common:    { stone: 5,  iron: 3 },
    rare:      { stone: 10, iron: 8,  gold: 3 },
    epic:      { stone: 20, iron: 15, gold: 8, diamond: 2 },
    legendary: { stone: 40, iron: 30, gold: 15, diamond: 5 }
};

var EQUIPMENT_DEFS = {
    // =============== WEAPONS ===============
    // -- Common --
    lightsaber_chopsticks: { name: 'Lightsaber Chopsticks', type: 'weapon', rarity: 'common', stats: { dmg: 5 } },
    physics_textbook:      { name: 'Physics Textbook',      type: 'weapon', rarity: 'common', stats: { dmg: 8 } },
    laser_pointer:         { name: 'Laser Pointer',          type: 'weapon', rarity: 'common', stats: { dmg: 8 } },
    nerf_gun:              { name: 'Nerf Gun',               type: 'weapon', rarity: 'common', stats: { dmg: 6, speedPct: 3 } },
    // -- Rare --
    paintball_gun:         { name: 'Paintball Gun',           type: 'weapon', rarity: 'rare',   stats: { dmg: 15 } },
    death_ray:             { name: "Howard's Death Ray",      type: 'weapon', rarity: 'rare',   stats: { dmg: 20 } },
    sonic_screwdriver:     { name: 'Sonic Screwdriver',       type: 'weapon', rarity: 'rare',   stats: { dmg: 18, speedPct: 5 } },
    klingon_batleth:       { name: "Klingon Bat'leth",        type: 'weapon', rarity: 'rare',   stats: { dmg: 22 } },
    // -- Epic --
    bat_leth:              { name: 'Vorpal Blade',            type: 'weapon', rarity: 'epic',   stats: { dmg: 35 } },
    infinity_gauntlet_w:   { name: 'Infinity Gauntlet Replica', type: 'weapon', rarity: 'epic', stats: { dmg: 50 } },
    lightsaber_replica:    { name: 'Lightsaber Replica',      type: 'weapon', rarity: 'epic',   stats: { dmg: 30, critPct: 10 } },
    proton_pack:           { name: 'Proton Pack',             type: 'weapon', rarity: 'epic',   stats: { dmg: 28, aoePct: 8 } },
    // -- Legendary --
    excalibur:             { name: 'Excalibur',               type: 'weapon', rarity: 'legendary', stats: { dmg: 80 } },
    bazinga_scepter:       { name: 'Bazinga Scepter',         type: 'weapon', rarity: 'legendary', stats: { dmg: 45, critPct: 15 } },
    tesla_coil_wand:       { name: 'Tesla Coil Wand',         type: 'weapon', rarity: 'legendary', stats: { dmg: 40, speedPct: 12 } },

    // =============== ARMOR ===============
    // -- Common --
    flash_tshirt:          { name: 'Flash T-Shirt',          type: 'armor', rarity: 'common', stats: { hp: 20 } },
    aquaman_underpants:    { name: 'Aquaman Underpants',     type: 'armor', rarity: 'common', stats: { hp: 30 } },
    bazinga_tshirt:        { name: 'Bazinga T-Shirt',        type: 'armor', rarity: 'common', stats: { hp: 10 } },
    safety_goggles:        { name: 'Safety Goggles',         type: 'armor', rarity: 'common', stats: { hp: 8, dmgReductPct: 2 } },
    // -- Rare --
    mithril_mail:          { name: 'Mithril Chain Mail',     type: 'armor', rarity: 'rare',   stats: { hp: 60 } },
    lab_coat:              { name: 'Lab Coat',               type: 'armor', rarity: 'rare',   stats: { hp: 20, dmgReductPct: 5 } },
    flash_costume:         { name: 'Flash Costume',          type: 'armor', rarity: 'rare',   stats: { hp: 15, speedPct: 8 } },
    // -- Epic --
    iron_man_suit:         { name: 'Iron Man Helmet',        type: 'armor', rarity: 'epic',   stats: { hp: 120 } },
    stormtrooper_armor:    { name: 'Stormtrooper Armor',     type: 'armor', rarity: 'epic',   stats: { hp: 35, dmgReductPct: 8 } },
    batman_cape:           { name: 'Batman Cape',            type: 'armor', rarity: 'epic',   stats: { hp: 30, dodgePct: 5 } },
    // -- Legendary --
    vibranium_shield:      { name: 'Vibranium Shield',       type: 'armor', rarity: 'legendary', stats: { hp: 200 } },
    mithril_chain:         { name: 'Mithril Chain',          type: 'armor', rarity: 'legendary', stats: { hp: 50, dmgReductPct: 10 } },
    vibranium_vest:        { name: 'Vibranium Vest',         type: 'armor', rarity: 'legendary', stats: { hp: 45, dmgReductPct: 15 } },

    // =============== ACCESSORIES ===============
    // -- Common --
    spock_ears:            { name: 'Spock Ears',              type: 'accessory', rarity: 'common', stats: { critPct: 5 } },
    friendship_bracelet:   { name: 'Friendship Bracelet',     type: 'accessory', rarity: 'common', stats: { teamDmgPct: 5 } },
    comic_book:            { name: 'Comic Book',              type: 'accessory', rarity: 'common', stats: { allStatsPct: 3 } },
    // -- Rare --
    green_lantern_ring:    { name: 'Green Lantern Ring',      type: 'accessory', rarity: 'rare',   stats: { critPct: 10, dmg: 5 } },
    vulcan_ears:           { name: 'Vulcan Ears',             type: 'accessory', rarity: 'rare',   stats: { critDmgPct: 10 } },
    hobbit_ring:           { name: 'Hobbit Ring',             type: 'accessory', rarity: 'rare',   stats: { dodgePct: 8, critPct: 5 } },
    // -- Epic --
    sonic_screwdriver_acc: { name: 'Sonic Screwdriver',       type: 'accessory', rarity: 'epic',   stats: { speedPct: 5, dmg: 10 } },
    green_lantern_ring_e:  { name: 'Green Lantern Ring',      type: 'accessory', rarity: 'epic',   stats: { dmg: 15, hp: 10 } },
    batman_utility_belt:   { name: 'Batman Utility Belt',     type: 'accessory', rarity: 'epic',   stats: { dmg: 12, speedPct: 8 } },
    // -- Legendary --
    one_ring:              { name: 'The One Ring',            type: 'accessory', rarity: 'legendary', stats: { critPct: 15, dmg: 20, hp: 50 } },
    infinity_gauntlet:     { name: 'Infinity Gauntlet',       type: 'accessory', rarity: 'legendary', stats: { allStatsPct: 20 } },
    arc_reactor_pin:       { name: 'Arc Reactor Pin',         type: 'accessory', rarity: 'legendary', stats: { dmg: 18, hp: 12 } }
};

// ----- STATE INITIALIZATION -----
function initEquipment() {
    if (!state.inventory) state.inventory = [];
    if (!state.charEquipment) state.charEquipment = {};
    // Ensure all inventory items have enhanceLevel
    for (var i = 0; i < state.inventory.length; i++) {
        if (state.inventory[i].enhanceLevel === undefined) {
            state.inventory[i].enhanceLevel = 0;
        }
    }
}

// ----- UNIQUE ID GENERATOR -----
var _equipIdCounter = 0;
function _nextEquipId() {
    _equipIdCounter++;
    return 'eq_' + Date.now().toString(36) + '_' + _equipIdCounter;
}

// ----- DROP GENERATION -----
function generateEquipmentDrop(waveNumber) {
    // 30% base drop chance (boss loot), +15% with Lucky Drops prestige perk
    var baseDropChance = 0.30;
    if (typeof state !== 'undefined' && state.perks && state.perks.luckyDrops) baseDropChance += 0.15;
    if (Math.random() > baseDropChance) return null;

    // Rarity roll — higher waves shift the curve
    var roll = Math.random() * 100;
    var waveBias = Math.min(waveNumber * 0.4, 30); // caps at wave 75

    var rarity;
    if (roll < 50 - waveBias)       rarity = 'common';    // 50% → 20%
    else if (roll < 80 - waveBias)  rarity = 'rare';      // 30% → stays ~30%
    else if (roll < 95 - waveBias * 0.5) rarity = 'epic'; // 15% → ~10–15%
    else                            rarity = 'legendary';  // 5% → grows

    // Collect keys that match the chosen rarity
    var pool = [];
    for (var key in EQUIPMENT_DEFS) {
        if (EQUIPMENT_DEFS[key].rarity === rarity) pool.push(key);
    }
    if (pool.length === 0) return null;

    var chosenKey = pool[Math.floor(Math.random() * pool.length)];
    var def = EQUIPMENT_DEFS[chosenKey];

    return {
        id: _nextEquipId(),
        key: chosenKey,
        name: def.name,
        type: def.type,
        rarity: def.rarity,
        stats: Object.assign({}, def.stats),
        level: 1,
        enhanceLevel: 0,
        equippedTo: null
    };
}

// ----- INVENTORY MANAGEMENT -----
function addEquipmentToInventory(equip) {
    initEquipment();
    if (equip.enhanceLevel === undefined) equip.enhanceLevel = 0;
    state.inventory.push(equip);
    saveProgress();
}

function equipItem(equipId, charKey) {
    initEquipment();
    var item = state.inventory.find(function(e) { return e.id === equipId; });
    if (!item) return;
    if (!characters[charKey]) return;

    // Ensure char equipment map exists
    if (!state.charEquipment[charKey]) {
        state.charEquipment[charKey] = { weapon: null, armor: null, accessory: null };
    }

    var slot = item.type; // weapon | armor | accessory

    // Unequip previous item in this slot
    var prevId = state.charEquipment[charKey][slot];
    if (prevId) {
        var prevItem = state.inventory.find(function(e) { return e.id === prevId; });
        if (prevItem) prevItem.equippedTo = null;
    }

    // If item was equipped to another character, clear that slot
    if (item.equippedTo && item.equippedTo !== charKey) {
        var oldSlots = state.charEquipment[item.equippedTo];
        if (oldSlots && oldSlots[slot] === equipId) {
            oldSlots[slot] = null;
        }
    }

    // Equip
    state.charEquipment[charKey][slot] = equipId;
    item.equippedTo = charKey;
    saveProgress();
}

function unequipItem(equipId) {
    initEquipment();
    var item = state.inventory.find(function(e) { return e.id === equipId; });
    if (!item || !item.equippedTo) return;

    var charKey = item.equippedTo;
    var slot = item.type;

    if (state.charEquipment[charKey] && state.charEquipment[charKey][slot] === equipId) {
        state.charEquipment[charKey][slot] = null;
    }
    item.equippedTo = null;
    saveProgress();
}

// Calculate effective stats including level AND enhancement bonuses
function _getEffectiveStatValue(item, statKey) {
    var baseVal = item.stats[statKey] || 0;
    var levelMult = 1 + (item.level - 1) * 0.2; // each level +20%
    var enhanceMult = 1 + (item.enhanceLevel || 0) * ENHANCE_STAT_BONUS_PER_LEVEL; // each enhance +8%
    return Math.floor(baseVal * levelMult * enhanceMult);
}

function getCharEquipmentStats(charKey) {
    initEquipment();
    var totals = { dmg: 0, hp: 0, critPct: 0, speedPct: 0 };
    var slots = state.charEquipment[charKey];
    if (!slots) return totals;

    var slotNames = ['weapon', 'armor', 'accessory'];
    for (var i = 0; i < slotNames.length; i++) {
        var eqId = slots[slotNames[i]];
        if (!eqId) continue;
        var item = state.inventory.find(function(e) { return e.id === eqId; });
        if (!item) continue;

        for (var stat in item.stats) {
            if (totals[stat] !== undefined) {
                totals[stat] += _getEffectiveStatValue(item, stat);
            }
        }
    }
    return totals;
}

// ----- UPGRADE (original level system) -----
function upgradeEquipment(equipId) {
    initEquipment();
    var item = state.inventory.find(function(e) { return e.id === equipId; });
    if (!item) return;
    if (item.level >= 10) return;

    var stoneCost = item.level * 10;
    var ironCost  = item.level * 5;

    if ((state.resources.stone || 0) < stoneCost || (state.resources.iron || 0) < ironCost) return;

    state.resources.stone -= stoneCost;
    state.resources.iron  -= ironCost;
    item.level++;
    if (typeof SoundManager !== 'undefined') SoundManager.playFX('levelup');
    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    renderInventoryModal();
}

// ============================================================
// TASK 1: ENHANCEMENT SYSTEM (+0 to +15)
// ============================================================

function enhanceEquipment(equipId) {
    initEquipment();
    var item = state.inventory.find(function(e) { return e.id === equipId; });
    if (!item) return;
    if (item.enhanceLevel === undefined) item.enhanceLevel = 0;
    if (item.enhanceLevel >= ENHANCE_MAX_LEVEL) return;

    var targetLevel = item.enhanceLevel + 1;
    var cost = getEnhanceCost(item.enhanceLevel);

    // Check resources
    if ((state.resources.stone || 0) < cost.stone ||
        (state.resources.iron || 0) < cost.iron ||
        (state.resources.gold || 0) < cost.gold) {
        if (typeof showGameAlert === 'function') {
            showGameAlert('Not Enough Resources', 'Need ' + cost.stone + ' 🪨 Stone, ' + cost.iron + ' ⛏️ Iron, ' + cost.gold + ' 🥇 Gold');
        }
        return;
    }

    // Deduct resources
    state.resources.stone -= cost.stone;
    state.resources.iron  -= cost.iron;
    state.resources.gold  -= cost.gold;

    // Roll for success
    var successRate = ENHANCE_SUCCESS_RATES[targetLevel] || 0.6;
    var success = Math.random() < successRate;

    if (success) {
        item.enhanceLevel = targetLevel;
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('levelup');
        // Flash effect on the card
        _flashEnhanceResult(equipId, true, targetLevel);
        if (typeof showGameAlert === 'function') {
            showGameAlert('Enhancement Success! ✨', _getDisplayName(item) + ' — All stats boosted by +' + (targetLevel * 8) + '%!');
        }
    } else {
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('click');
        _flashEnhanceResult(equipId, false, targetLevel);
        if (typeof showGameAlert === 'function') {
            showGameAlert('Enhancement Failed 💥', 'The enhancement to +' + targetLevel + ' failed! Resources consumed. Item is safe.');
        }
    }

    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    renderInventoryModal();
}

function _flashEnhanceResult(equipId, success, level) {
    if (typeof document === 'undefined') return;
    var card = document.querySelector('[data-equip-id="' + equipId + '"]');
    if (!card) return;
    var cls = success ? 'enhance-success-flash' : 'enhance-fail-shake';
    card.classList.add(cls);
    setTimeout(function() { card.classList.remove(cls); }, 700);
}

// ============================================================
// TASK 2: DISMANTLING SYSTEM
// ============================================================

function dismantleEquipment(equipId, skipConfirm) {
    initEquipment();
    var idx = -1;
    var item = null;
    for (var i = 0; i < state.inventory.length; i++) {
        if (state.inventory[i].id === equipId) { idx = i; item = state.inventory[i]; break; }
    }
    if (!item || idx < 0) return;
    if (item.equippedTo) {
        if (typeof showGameAlert === 'function') showGameAlert('Unequip First', 'Unequip this item before dismantling.');
        return;
    }

    if (!skipConfirm) {
        _showDismantleConfirm(item);
        return;
    }

    // Calculate rewards
    var baseRewards = DISMANTLE_REWARDS[item.rarity] || DISMANTLE_REWARDS.common;
    var rewards = {};
    for (var res in baseRewards) {
        rewards[res] = baseRewards[res];
    }

    // Add level bonus (existing salvage bonus)
    var levelBonus = 1 + (item.level - 1) * 0.15;
    for (var rb in rewards) {
        rewards[rb] = Math.floor(rewards[rb] * levelBonus);
    }

    // Enhanced items return 50% of enhancement costs
    if (item.enhanceLevel && item.enhanceLevel > 0) {
        var enhCost = getTotalEnhanceCost(item.enhanceLevel);
        for (var ec in enhCost) {
            if (!rewards[ec]) rewards[ec] = 0;
            rewards[ec] += Math.floor(enhCost[ec] * 0.5);
        }
    }

    // Apply rewards
    for (var r in rewards) {
        if (state.resources[r] !== undefined) state.resources[r] += rewards[r];
    }

    // Remove item
    state.inventory.splice(idx, 1);
    for (var ck in state.charEquipment) {
        var slots = state.charEquipment[ck];
        if (slots) {
            if (slots.weapon === equipId) slots.weapon = null;
            if (slots.armor === equipId) slots.armor = null;
            if (slots.accessory === equipId) slots.accessory = null;
        }
    }

    if (typeof SoundManager !== 'undefined') SoundManager.playFX('click');
    var rewardText = [];
    for (var rt in rewards) {
        if (rewards[rt] > 0) {
            var icons = { stone: '🪨', iron: '⛏️', gold: '🥇', scrap: '⚙️', diamond: '💎' };
            rewardText.push('+' + rewards[rt] + ' ' + (icons[rt] || rt));
        }
    }
    if (typeof showGameAlert === 'function') {
        showGameAlert('Dismantled! 🔨', _getDisplayName(item) + ' broken down for: ' + rewardText.join(', '));
    }
    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    renderInventoryModal();
}

function _showDismantleConfirm(item) {
    var existing = document.getElementById('dismantle-confirm-modal');
    if (existing) existing.remove();

    var color = RARITY_COLORS[item.rarity] || '#9ca3af';
    var baseRewards = DISMANTLE_REWARDS[item.rarity] || DISMANTLE_REWARDS.common;
    var rewards = {};
    for (var res in baseRewards) rewards[res] = baseRewards[res];
    var levelBonus = 1 + (item.level - 1) * 0.15;
    for (var rb in rewards) rewards[rb] = Math.floor(rewards[rb] * levelBonus);
    if (item.enhanceLevel && item.enhanceLevel > 0) {
        var enhCost = getTotalEnhanceCost(item.enhanceLevel);
        for (var ec in enhCost) {
            if (!rewards[ec]) rewards[ec] = 0;
            rewards[ec] += Math.floor(enhCost[ec] * 0.5);
        }
    }

    var icons = { stone: '🪨', iron: '⛏️', gold: '🥇', scrap: '⚙️', diamond: '💎' };
    var rewardHtml = '';
    for (var r in rewards) {
        if (rewards[r] > 0) {
            rewardHtml += '<div class="flex items-center gap-1 text-[10px] font-bold text-emerald-400">' +
                '<span>' + (icons[r] || '') + '</span>' +
                '<span>+' + rewards[r] + ' ' + r.charAt(0).toUpperCase() + r.slice(1) + '</span></div>';
        }
    }

    var modal = document.createElement('div');
    modal.id = 'dismantle-confirm-modal';
    modal.className = 'fixed inset-0 z-[9200] flex items-center justify-center';
    modal.innerHTML =
        '<div class="absolute inset-0 bg-black/70" onclick="document.getElementById(\'dismantle-confirm-modal\').remove()"></div>' +
        '<div class="relative bg-slate-900/95 backdrop-blur-xl border-2 rounded-2xl max-w-[340px] w-full mx-4 shadow-2xl overflow-hidden" style="border-color:' + color + '">' +
            '<div class="px-5 py-3 border-b border-white/10">' +
                '<div class="font-black text-white text-[14px] uppercase tracking-widest">🔨 Dismantle</div>' +
            '</div>' +
            '<div class="p-5">' +
                '<div class="text-center mb-4">' +
                    '<div class="text-[12px] text-gray-300 mb-1">Are you sure you want to dismantle:</div>' +
                    '<div class="font-black text-white text-[14px]" style="color:' + color + '">' + _getDisplayName(item) + '</div>' +
                    '<div class="text-[9px] text-gray-500 uppercase tracking-wider mt-1">' + item.rarity + ' ' + item.type + '</div>' +
                '</div>' +
                '<div class="bg-slate-800/60 rounded-lg p-3 mb-4">' +
                    '<div class="text-[9px] text-gray-400 uppercase tracking-wider font-bold mb-2">You will receive:</div>' +
                    '<div class="flex flex-wrap gap-3">' + rewardHtml + '</div>' +
                '</div>' +
                '<div class="flex gap-3">' +
                    '<button onclick="document.getElementById(\'dismantle-confirm-modal\').remove()" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold py-2 rounded-lg cursor-pointer uppercase tracking-wider border border-slate-600 transition-all">Cancel</button>' +
                    '<button onclick="document.getElementById(\'dismantle-confirm-modal\').remove(); dismantleEquipment(\'' + item.id + '\', true);" class="flex-1 bg-red-700 hover:bg-red-600 text-white text-[10px] font-bold py-2 rounded-lg cursor-pointer uppercase tracking-wider border border-red-600 transition-all">🔨 Dismantle</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(modal);
}

// ---- Dismantle All Common ----
function dismantleAllCommon() {
    initEquipment();
    var toDismantle = [];
    for (var i = 0; i < state.inventory.length; i++) {
        var item = state.inventory[i];
        if (item.rarity === 'common' && !item.equippedTo) {
            toDismantle.push(item.id);
        }
    }
    if (toDismantle.length === 0) {
        if (typeof showGameAlert === 'function') showGameAlert('Nothing to Dismantle', 'No unequipped common items found.');
        return;
    }

    // Confirmation
    var existing = document.getElementById('dismantle-confirm-modal');
    if (existing) existing.remove();

    var modal = document.createElement('div');
    modal.id = 'dismantle-confirm-modal';
    modal.className = 'fixed inset-0 z-[9200] flex items-center justify-center';
    modal.innerHTML =
        '<div class="absolute inset-0 bg-black/70" onclick="document.getElementById(\'dismantle-confirm-modal\').remove()"></div>' +
        '<div class="relative bg-slate-900/95 backdrop-blur-xl border-2 border-orange-500/50 rounded-2xl max-w-[340px] w-full mx-4 shadow-2xl overflow-hidden">' +
            '<div class="px-5 py-3 border-b border-white/10">' +
                '<div class="font-black text-white text-[14px] uppercase tracking-widest">🗑️ Bulk Dismantle</div>' +
            '</div>' +
            '<div class="p-5 text-center">' +
                '<div class="text-[12px] text-gray-300 mb-2">Dismantle all <span class="text-amber-400 font-bold">' + toDismantle.length + '</span> unequipped common items?</div>' +
                '<div class="text-[9px] text-gray-500 mb-4">Resources will be added to your inventory.</div>' +
                '<div class="flex gap-3">' +
                    '<button onclick="document.getElementById(\'dismantle-confirm-modal\').remove()" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold py-2 rounded-lg cursor-pointer uppercase tracking-wider border border-slate-600 transition-all">Cancel</button>' +
                    '<button onclick="document.getElementById(\'dismantle-confirm-modal\').remove(); _executeBulkDismantle();" class="flex-1 bg-orange-700 hover:bg-orange-600 text-white text-[10px] font-bold py-2 rounded-lg cursor-pointer uppercase tracking-wider border border-orange-600 transition-all">🗑️ Dismantle All</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(modal);
}

function _executeBulkDismantle() {
    initEquipment();
    var totalRewards = {};
    var count = 0;
    var i = state.inventory.length - 1;
    while (i >= 0) {
        var item = state.inventory[i];
        if (item.rarity === 'common' && !item.equippedTo) {
            var baseRewards = DISMANTLE_REWARDS.common;
            var rewards = {};
            for (var res in baseRewards) rewards[res] = baseRewards[res];
            var levelBonus = 1 + (item.level - 1) * 0.15;
            for (var rb in rewards) rewards[rb] = Math.floor(rewards[rb] * levelBonus);
            if (item.enhanceLevel && item.enhanceLevel > 0) {
                var enhCost = getTotalEnhanceCost(item.enhanceLevel);
                for (var ec in enhCost) {
                    if (!rewards[ec]) rewards[ec] = 0;
                    rewards[ec] += Math.floor(enhCost[ec] * 0.5);
                }
            }
            for (var r in rewards) {
                if (state.resources[r] !== undefined) {
                    state.resources[r] += rewards[r];
                    if (!totalRewards[r]) totalRewards[r] = 0;
                    totalRewards[r] += rewards[r];
                }
            }
            state.inventory.splice(i, 1);
            count++;
        }
        i--;
    }

    if (count > 0) {
        var icons = { stone: '🪨', iron: '⛏️', gold: '🥇', scrap: '⚙️', diamond: '💎' };
        var rewardText = [];
        for (var rt in totalRewards) {
            if (totalRewards[rt] > 0) rewardText.push('+' + totalRewards[rt] + ' ' + (icons[rt] || rt));
        }
        if (typeof showGameAlert === 'function') {
            showGameAlert('Bulk Dismantle! 🗑️', count + ' common items dismantled for: ' + rewardText.join(', '));
        }
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('click');
    }

    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    renderInventoryModal();
}

// Keep legacy salvage as an alias
function salvageEquipment(equipId) {
    dismantleEquipment(equipId);
}

// ============================================================
// TASK 3: FUSION SYSTEM (3 same rarity → 1 higher rarity)
// ============================================================

var _fusionSelectedItems = [];

function getMergeableSets() {
    initEquipment();
    var groups = {};
    for (var i = 0; i < state.inventory.length; i++) {
        var item = state.inventory[i];
        if (item.equippedTo) continue;
        if (item.rarity === 'legendary') continue;
        var gk = item.rarity;
        if (!groups[gk]) groups[gk] = [];
        groups[gk].push(item);
    }
    var sets = [];
    for (var key in groups) {
        if (groups[key].length >= 3) {
            sets.push({
                rarity: groups[key][0].rarity,
                items: groups[key],
                resultRarity: RARITY_ORDER[RARITY_ORDER.indexOf(groups[key][0].rarity) + 1]
            });
        }
    }
    return sets;
}

function executeMerge(rarity, type) {
    // Legacy function kept for backward compat
    executeFusion(rarity, type);
}

function executeFusion(rarity, selectedItemIds) {
    initEquipment();

    var items = [];
    if (Array.isArray(selectedItemIds)) {
        // Fusion modal selected specific items
        for (var s = 0; s < selectedItemIds.length; s++) {
            var found = state.inventory.find(function(e) { return e.id === selectedItemIds[s]; });
            if (found && !found.equippedTo && found.rarity === rarity) items.push(found);
        }
    } else {
        // Legacy: type-based merge (backward compat)
        var type = selectedItemIds; // it's actually the type string
        for (var i = 0; i < state.inventory.length; i++) {
            var item = state.inventory[i];
            if (!item.equippedTo && item.rarity === rarity && item.type === type) items.push(item);
            if (items.length >= 3) break;
        }
    }

    if (items.length < 3) {
        if (typeof showGameAlert === 'function') showGameAlert('Not Enough', 'Need 3 unequipped ' + rarity + ' items.');
        return;
    }

    // Gold cost
    var goldCosts = { common: 20, rare: 50, epic: 100 };
    var goldCost = goldCosts[rarity] || 50;
    if ((state.resources.gold || 0) < goldCost) {
        if (typeof showGameAlert === 'function') showGameAlert('Not Enough Gold', 'Need ' + goldCost + ' Gold to fuse.');
        return;
    }
    state.resources.gold -= goldCost;

    var nextRarity = RARITY_ORDER[RARITY_ORDER.indexOf(rarity) + 1];
    if (!nextRarity) return;

    // Pool of all items of next rarity
    var pool = [];
    for (var k in EQUIPMENT_DEFS) {
        if (EQUIPMENT_DEFS[k].rarity === nextRarity) pool.push(k);
    }
    if (pool.length === 0) return;

    // Remove consumed items (by index, descending)
    var indices = [];
    for (var j = 0; j < 3; j++) {
        var idx = state.inventory.indexOf(items[j]);
        if (idx >= 0) indices.push(idx);
    }
    indices.sort(function(a, b) { return b - a; });
    for (var d = 0; d < indices.length; d++) state.inventory.splice(indices[d], 1);

    var chosenKey = pool[Math.floor(Math.random() * pool.length)];
    var def = EQUIPMENT_DEFS[chosenKey];

    // 15% bonus chance: item comes pre-enhanced to +3
    var bonusEnhance = Math.random() < 0.15;

    var newItem = {
        id: _nextEquipId(), key: chosenKey, name: def.name, type: def.type,
        rarity: def.rarity, stats: Object.assign({}, def.stats), level: 1,
        enhanceLevel: bonusEnhance ? 3 : 0,
        equippedTo: null
    };
    state.inventory.push(newItem);

    if (typeof SoundManager !== 'undefined') SoundManager.playFX('levelup');

    var bonusText = bonusEnhance ? '\n🌟 BONUS: Pre-enhanced to +3!' : '';
    if (typeof showGameAlert === 'function') {
        showGameAlert('Fusion Complete! 🔮', 'Created ' + _getDisplayName(newItem) + ' (' + nextRarity.toUpperCase() + ')!' + bonusText);
    }

    renderEquipmentDropNotification(newItem);
    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    _fusionSelectedItems = [];
    renderInventoryModal();
}

function openMergeModal() {
    openFusionModal();
}

function openFusionModal() {
    _fusionSelectedItems = [];
    initEquipment();
    _renderFusionModal();
}

function _toggleFusionItem(itemId) {
    var idx = _fusionSelectedItems.indexOf(itemId);
    if (idx >= 0) {
        _fusionSelectedItems.splice(idx, 1);
    } else {
        if (_fusionSelectedItems.length >= 3) return;
        // Validate same rarity
        var item = state.inventory.find(function(e) { return e.id === itemId; });
        if (!item || item.equippedTo || item.rarity === 'legendary') return;
        if (_fusionSelectedItems.length > 0) {
            var firstItem = state.inventory.find(function(e) { return e.id === _fusionSelectedItems[0]; });
            if (firstItem && firstItem.rarity !== item.rarity) {
                if (typeof showGameAlert === 'function') showGameAlert('Same Rarity Only', 'All 3 items must be the same rarity.');
                return;
            }
        }
        _fusionSelectedItems.push(itemId);
    }
    _renderFusionModal();
}

function _renderFusionModal() {
    var existing = document.getElementById('merge-modal');
    if (existing) existing.remove();

    var fusionRarity = null;
    if (_fusionSelectedItems.length > 0) {
        var first = state.inventory.find(function(e) { return e.id === _fusionSelectedItems[0]; });
        if (first) fusionRarity = first.rarity;
    }

    // Get eligible items
    var eligible = [];
    for (var i = 0; i < state.inventory.length; i++) {
        var item = state.inventory[i];
        if (item.equippedTo) continue;
        if (item.rarity === 'legendary') continue;
        if (fusionRarity && item.rarity !== fusionRarity) continue;
        eligible.push(item);
    }

    // Sort by rarity desc
    eligible.sort(function(a, b) {
        return RARITY_ORDER.indexOf(b.rarity) - RARITY_ORDER.indexOf(a.rarity);
    });

    // Build item grid
    var itemsHtml = '';
    if (eligible.length === 0) {
        itemsHtml = '<div class="col-span-full text-center text-gray-500 py-6 text-[10px] font-bold uppercase tracking-wider">No eligible items. Need 3 unequipped same-rarity items (not legendary).</div>';
    }
    for (var j = 0; j < eligible.length; j++) {
        var eq = eligible[j];
        var color = RARITY_COLORS[eq.rarity] || '#9ca3af';
        var isSelected = _fusionSelectedItems.indexOf(eq.id) >= 0;
        var typeIcon = eq.type === 'weapon' ? '⚔️' : (eq.type === 'armor' ? '🛡️' : '💍');
        var selClass = isSelected
            ? 'border-amber-400 bg-amber-900/30 ring-2 ring-amber-400/50'
            : 'border-slate-700 bg-slate-800/60 hover:bg-slate-700/60';
        var glowClass = _getGlowClass(eq.enhanceLevel);

        itemsHtml += '<button onclick="_toggleFusionItem(\'' + eq.id + '\')" class="' + selClass + ' ' + glowClass + ' border rounded-lg p-2 text-left cursor-pointer transition-all" data-equip-id="' + eq.id + '">' +
            '<div class="flex items-center gap-1.5">' +
                '<span class="text-sm">' + typeIcon + '</span>' +
                '<div class="min-w-0">' +
                    '<div class="font-bold text-white text-[9px] truncate">' + _getDisplayName(eq) + '</div>' +
                    '<div class="text-[7px] font-bold uppercase tracking-wider" style="color:' + color + '">' + eq.rarity + '</div>' +
                '</div>' +
            '</div>' +
            (isSelected ? '<div class="text-[8px] text-amber-400 font-bold mt-1">✓ SELECTED</div>' : '') +
        '</button>';
    }

    // Preview section
    var previewHtml = '';
    if (_fusionSelectedItems.length === 3 && fusionRarity) {
        var nextRarity = RARITY_ORDER[RARITY_ORDER.indexOf(fusionRarity) + 1];
        var toColor = RARITY_COLORS[nextRarity] || '#9ca3af';
        var fromColor = RARITY_COLORS[fusionRarity] || '#9ca3af';
        var gc = { common: 20, rare: 50, epic: 100 }[fusionRarity] || 50;
        var canAfford = (state.resources.gold || 0) >= gc;

        previewHtml =
            '<div class="bg-slate-800/80 border border-amber-500/30 rounded-xl p-4 mt-3">' +
                '<div class="text-center mb-3">' +
                    '<div class="text-[10px] font-bold">' +
                        '<span style="color:' + fromColor + '">' + fusionRarity.toUpperCase() + '</span>' +
                        ' <span class="text-gray-500">×3</span> → ' +
                        '<span style="color:' + toColor + '">' + nextRarity.toUpperCase() + '</span>' +
                        ' <span class="text-gray-500">×1</span>' +
                    '</div>' +
                    '<div class="text-[8px] text-gray-500 mt-1">15% chance for +3 bonus enhancement!</div>' +
                    '<div class="text-[8px] text-amber-400 mt-1">Cost: ' + gc + ' 🥇 Gold</div>' +
                '</div>' +
                '<button onclick="executeFusion(\'' + fusionRarity + '\',' + JSON.stringify(_fusionSelectedItems) + ')" ' +
                    (canAfford ? '' : 'disabled ') +
                    'class="' + (canAfford ? 'bg-amber-600 hover:bg-amber-500 cursor-pointer' : 'bg-gray-800 cursor-not-allowed text-gray-600') +
                    ' w-full text-white font-bold py-2.5 rounded-lg text-[10px] uppercase tracking-wider border border-amber-700/50 transition-all">' +
                    '🔮 FUSE ITEMS' +
                '</button>' +
            '</div>';
    } else if (_fusionSelectedItems.length > 0) {
        previewHtml = '<div class="text-center text-[9px] text-amber-400/80 font-bold mt-3">Select ' + (3 - _fusionSelectedItems.length) + ' more item' + ((3 - _fusionSelectedItems.length) !== 1 ? 's' : '') + ' of the same rarity</div>';
    } else {
        previewHtml = '<div class="text-center text-[9px] text-gray-500 mt-3">Select 3 items of the same rarity to fuse into a higher rarity item</div>';
    }

    var modal = document.createElement('div');
    modal.id = 'merge-modal';
    modal.className = 'fixed inset-0 z-[9100] flex items-center justify-center';
    modal.innerHTML =
        '<div class="absolute inset-0 bg-black/60" onclick="document.getElementById(\'merge-modal\').remove()"></div>' +
        '<div class="relative bg-slate-900/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl max-w-[450px] w-full mx-4 shadow-2xl overflow-hidden">' +
            '<div class="flex items-center justify-between px-5 py-3 border-b border-white/10">' +
                '<div class="font-black text-white text-[14px] uppercase tracking-widest">🔮 FORGE — Fusion</div>' +
                '<button onclick="document.getElementById(\'merge-modal\').remove()" class="text-gray-400 hover:text-white text-xl cursor-pointer leading-none">✕</button>' +
            '</div>' +
            '<div class="p-4 max-h-[60vh] overflow-y-auto">' +
                '<div class="text-[9px] text-gray-500 mb-3">Select <span class="text-amber-400 font-bold">3 same-rarity</span> items to fuse into a <span class="text-emerald-400 font-bold">higher rarity</span> item. Can\'t fuse legendaries.</div>' +
                '<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">' + itemsHtml + '</div>' +
                previewHtml +
            '</div>' +
        '</div>';
    document.body.appendChild(modal);
}

// ============================================================
// TASK 5: EQUIPMENT COMPARISON
// ============================================================

function _showEquipComparison(newItem, charKey) {
    if (!newItem || !charKey) return;
    initEquipment();

    var slot = newItem.type;
    if (!state.charEquipment[charKey]) {
        state.charEquipment[charKey] = { weapon: null, armor: null, accessory: null };
    }
    var currentId = state.charEquipment[charKey][slot];
    var currentItem = currentId ? state.inventory.find(function(e) { return e.id === currentId; }) : null;

    var existing = document.getElementById('equip-compare-modal');
    if (existing) existing.remove();

    // Build stat comparison
    var allStats = ['dmg', 'hp', 'critPct', 'speedPct', 'dodgePct', 'dmgReductPct', 'aoePct', 'teamDmgPct', 'critDmgPct', 'allStatsPct'];
    var statLabels = {
        dmg: 'DMG', hp: 'HP', critPct: 'CRIT %', speedPct: 'SPD %', dodgePct: 'DODGE %',
        dmgReductPct: 'DMG RED %', aoePct: 'AOE %', teamDmgPct: 'TEAM DMG %', critDmgPct: 'CRIT DMG %', allStatsPct: 'ALL STATS %'
    };

    var comparisonRows = '';
    for (var si = 0; si < allStats.length; si++) {
        var sk = allStats[si];
        var newVal = _getEffectiveStatValue(newItem, sk);
        var curVal = currentItem ? _getEffectiveStatValue(currentItem, sk) : 0;
        if (newVal === 0 && curVal === 0) continue;

        var diff = newVal - curVal;
        var diffStr = '';
        var diffClass = 'equip-compare-same';
        if (diff > 0) { diffStr = '▲ +' + diff; diffClass = 'equip-compare-better'; }
        else if (diff < 0) { diffStr = '▼ ' + diff; diffClass = 'equip-compare-worse'; }
        else { diffStr = '—'; }

        comparisonRows +=
            '<div class="grid grid-cols-4 gap-1 py-1 border-b border-white/5 text-[9px]">' +
                '<div class="text-gray-400 font-bold">' + statLabels[sk] + '</div>' +
                '<div class="text-center text-gray-300">' + curVal + '</div>' +
                '<div class="text-center text-white font-bold">' + newVal + '</div>' +
                '<div class="text-center font-bold ' + diffClass + '">' + diffStr + '</div>' +
            '</div>';
    }

    var newColor = RARITY_COLORS[newItem.rarity] || '#9ca3af';
    var curColor = currentItem ? (RARITY_COLORS[currentItem.rarity] || '#9ca3af') : '#4b5563';
    var typeIcon = newItem.type === 'weapon' ? '⚔️' : (newItem.type === 'armor' ? '🛡️' : '💍');
    var newGlow = _getGlowClass(newItem.enhanceLevel);
    var curGlow = currentItem ? _getGlowClass(currentItem.enhanceLevel) : '';

    var modal = document.createElement('div');
    modal.id = 'equip-compare-modal';
    modal.className = 'fixed inset-0 z-[9300] flex items-center justify-center';
    modal.innerHTML =
        '<div class="absolute inset-0 bg-black/70" onclick="document.getElementById(\'equip-compare-modal\').remove()"></div>' +
        '<div class="relative bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl max-w-[420px] w-full mx-4 shadow-2xl overflow-hidden">' +
            '<div class="flex items-center justify-between px-5 py-3 border-b border-white/10">' +
                '<div class="font-black text-white text-[14px] uppercase tracking-widest">' + typeIcon + ' Compare Equipment</div>' +
                '<button onclick="document.getElementById(\'equip-compare-modal\').remove()" class="text-gray-400 hover:text-white text-xl cursor-pointer leading-none">✕</button>' +
            '</div>' +
            '<div class="p-4">' +
                // Side by side headers
                '<div class="grid grid-cols-2 gap-3 mb-4">' +
                    // Current
                    '<div class="bg-slate-800/60 border rounded-lg p-3 ' + curGlow + '" style="border-color:' + curColor + '">' +
                        '<div class="text-[8px] text-gray-500 uppercase tracking-wider font-bold mb-1">Currently Equipped</div>' +
                        (currentItem
                            ? '<div class="font-bold text-white text-[10px]">' + _getDisplayName(currentItem) + '</div>' +
                              '<div class="text-[8px] font-bold uppercase" style="color:' + curColor + '">' + currentItem.rarity + ' · L' + currentItem.level + '</div>'
                            : '<div class="text-[10px] text-gray-600 italic">Empty slot</div>') +
                    '</div>' +
                    // New
                    '<div class="bg-slate-800/60 border-2 rounded-lg p-3 ' + newGlow + '" style="border-color:' + newColor + '">' +
                        '<div class="text-[8px] text-amber-400 uppercase tracking-wider font-bold mb-1">New Item</div>' +
                        '<div class="font-bold text-white text-[10px]">' + _getDisplayName(newItem) + '</div>' +
                        '<div class="text-[8px] font-bold uppercase" style="color:' + newColor + '">' + newItem.rarity + ' · L' + newItem.level + '</div>' +
                    '</div>' +
                '</div>' +
                // Stat comparison table
                '<div class="bg-slate-800/40 rounded-lg p-3 mb-4">' +
                    '<div class="grid grid-cols-4 gap-1 pb-1 border-b border-white/10 text-[8px] text-gray-500 uppercase tracking-wider font-bold">' +
                        '<div>Stat</div><div class="text-center">Current</div><div class="text-center">New</div><div class="text-center">Diff</div>' +
                    '</div>' +
                    comparisonRows +
                '</div>' +
                // Action buttons
                '<div class="flex gap-3">' +
                    '<button onclick="document.getElementById(\'equip-compare-modal\').remove();" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold py-2.5 rounded-lg cursor-pointer uppercase tracking-wider border border-slate-600 transition-all">Keep Current</button>' +
                    '<button onclick="document.getElementById(\'equip-compare-modal\').remove(); equipItem(\'' + newItem.id + '\',\'' + charKey + '\'); renderInventoryModal();" class="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-bold py-2.5 rounded-lg cursor-pointer uppercase tracking-wider border border-emerald-600 transition-all">⚡ Equip New</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(modal);
}

// ============================================================
// INVENTORY MODAL (Enhanced)
// ============================================================

var _invActiveTab = 'all';

function openInventoryModal(event) {
    if (event) event.stopPropagation();
    initEquipment();
    _invActiveTab = 'all';
    renderInventoryModal();
    var modal = document.getElementById('inventory-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeInventoryModal() {
    var modal = document.getElementById('inventory-modal');
    if (modal) modal.classList.add('hidden');
}

function _setInvTab(tab) {
    _invActiveTab = tab;
    renderInventoryModal();
}

// Format stat string for display
function _formatStatsStr(item) {
    var statsArr = [];
    var allStats = ['dmg', 'hp', 'critPct', 'speedPct', 'dodgePct', 'dmgReductPct', 'aoePct', 'teamDmgPct', 'critDmgPct', 'allStatsPct'];
    var statLabels = {
        dmg: 'DMG', hp: 'HP', critPct: 'CRIT', speedPct: 'SPD', dodgePct: 'DODGE',
        dmgReductPct: 'D.RED', aoePct: 'AOE', teamDmgPct: 'T.DMG', critDmgPct: 'C.DMG', allStatsPct: 'ALL'
    };
    for (var si = 0; si < allStats.length; si++) {
        var sk = allStats[si];
        if (!item.stats[sk]) continue;
        var val = _getEffectiveStatValue(item, sk);
        var suffix = sk.indexOf('Pct') >= 0 ? '%' : '';
        statsArr.push('+' + val + suffix + ' ' + statLabels[sk]);
    }
    return statsArr.join(' · ');
}

function renderInventoryModal() {
    initEquipment();

    // Ensure modal container exists
    var modal = document.getElementById('inventory-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'inventory-modal';
        modal.className = 'fixed inset-0 z-[9000] hidden';
        document.body.appendChild(modal);
    }

    // Filter items
    var items = state.inventory.slice();
    if (_invActiveTab !== 'all') {
        var filterType = _invActiveTab === 'weapons' ? 'weapon' : (_invActiveTab === 'accessories' ? 'accessory' : 'armor');
        items = items.filter(function(e) { return e.type === filterType; });
    }

    // Sort: equipped first, then by rarity, then by enhance level
    items.sort(function(a, b) {
        var aEq = a.equippedTo ? 0 : 1;
        var bEq = b.equippedTo ? 0 : 1;
        if (aEq !== bEq) return aEq - bEq;
        var rarDiff = RARITY_ORDER.indexOf(b.rarity) - RARITY_ORDER.indexOf(a.rarity);
        if (rarDiff !== 0) return rarDiff;
        return (b.enhanceLevel || 0) - (a.enhanceLevel || 0);
    });

    // Build tab buttons
    var tabs = ['all', 'weapons', 'armor', 'accessories'];
    var tabLabels = { all: '📦 All', weapons: '⚔️ Weapons', armor: '🛡️ Armor', accessories: '💍 Accessories' };
    var tabHtml = '';
    for (var t = 0; t < tabs.length; t++) {
        var isActive = _invActiveTab === tabs[t];
        var btnClass = isActive
            ? 'bg-amber-600 text-white border-amber-500'
            : 'bg-slate-800 text-gray-400 border-slate-700 hover:bg-slate-700';
        tabHtml += '<button onclick="_setInvTab(\'' + tabs[t] + '\')" class="' + btnClass + ' border px-3 py-1.5 rounded text-[9px] font-bold uppercase tracking-wider cursor-pointer">' + tabLabels[tabs[t]] + '</button>';
    }

    // Build item cards
    var cardsHtml = '';
    if (items.length === 0) {
        cardsHtml = '<div class="col-span-full text-center text-gray-500 py-10 text-sm font-bold uppercase tracking-wider">No equipment found</div>';
    }

    // Build character options for dropdown
    var charOptions = '<option value="">— Select —</option>';
    for (var ck in characters) {
        if (state.roster[ck] && state.roster[ck].level > 0) {
            charOptions += '<option value="' + ck + '">' + characters[ck].name + '</option>';
        }
    }

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var color = RARITY_COLORS[item.rarity] || '#9ca3af';
        var enhLvl = item.enhanceLevel || 0;
        var glowClass = _getGlowClass(enhLvl);

        // Type icon
        var typeIcon = item.type === 'weapon' ? '⚔️' : (item.type === 'armor' ? '🛡️' : '💍');

        // Stats string (with enhancement)
        var statsStr = _formatStatsStr(item);

        // Enhancement bar visualization
        var enhBarHtml = '';
        if (enhLvl > 0) {
            var enhPips = '';
            for (var ep = 1; ep <= ENHANCE_MAX_LEVEL; ep++) {
                var pipColor = ep <= enhLvl
                    ? (ep <= 5 ? '#38bdf8' : (ep <= 10 ? '#a78bfa' : '#f59e0b'))
                    : '#334155';
                enhPips += '<div style="width:4px;height:4px;border-radius:50%;background:' + pipColor + '"></div>';
            }
            enhBarHtml = '<div class="flex gap-[2px] items-center mt-1" title="Enhancement: +' + enhLvl + '">' + enhPips + '</div>';
        }

        // Equipped-to label
        var equippedLabel = '';
        var actionHtml = '';
        if (item.equippedTo && characters[item.equippedTo]) {
            equippedLabel = '<div class="text-[8px] text-emerald-400 font-bold mt-1">⚡ ' + characters[item.equippedTo].name + '</div>';
            actionHtml = '<button onclick="unequipItem(\'' + item.id + '\'); renderInventoryModal();" class="bg-red-700 hover:bg-red-600 text-white text-[8px] font-bold px-2 py-1 rounded cursor-pointer uppercase tracking-wider border border-red-900">Unequip</button>';
        } else {
            // Compare + equip dropdown
            actionHtml =
                '<select onchange="if(this.value){_showEquipComparison(state.inventory.find(function(e){return e.id===\'' + item.id + '\'}), this.value); this.value=\'\';}" class="bg-slate-800 text-gray-300 text-[8px] border border-slate-700 rounded px-1 py-1 cursor-pointer">' + charOptions + '</select>' +
                ' <button onclick="dismantleEquipment(\'' + item.id + '\')" class="bg-orange-800 hover:bg-orange-700 text-white text-[8px] font-bold px-2 py-1 rounded cursor-pointer uppercase tracking-wider border border-orange-900" title="Dismantle for resources">🔨</button>';
        }

        // Upgrade button (original level system)
        var upgHtml = '';
        if (item.level < 10) {
            var sCost = item.level * 10;
            var iCost = item.level * 5;
            var canUp = (state.resources.stone || 0) >= sCost && (state.resources.iron || 0) >= iCost;
            var upClass = canUp
                ? 'bg-cyan-700 hover:bg-cyan-600 text-white cursor-pointer border-cyan-900'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed border-gray-700';
            upgHtml = '<button onclick="upgradeEquipment(\'' + item.id + '\')" ' + (!canUp ? 'disabled' : '') + ' class="' + upClass + ' text-[7px] font-bold px-2 py-1 rounded uppercase tracking-wider border">⬆ L' + (item.level + 1) + ' (' + sCost + '🪨 ' + iCost + '⛏️)</button>';
        } else {
            upgHtml = '<div class="text-[7px] text-amber-400 font-bold uppercase">✨ MAX LV</div>';
        }

        // Enhancement button
        var enhHtml = '';
        if (enhLvl < ENHANCE_MAX_LEVEL) {
            var eCost = getEnhanceCost(enhLvl);
            var successRate = Math.floor((ENHANCE_SUCCESS_RATES[enhLvl + 1] || 0.6) * 100);
            var canEnh = (state.resources.stone || 0) >= eCost.stone &&
                         (state.resources.iron || 0) >= eCost.iron &&
                         (state.resources.gold || 0) >= eCost.gold;
            var enhClass = canEnh
                ? 'bg-purple-700 hover:bg-purple-600 text-white cursor-pointer border-purple-900'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed border-gray-700';
            enhHtml = '<button onclick="enhanceEquipment(\'' + item.id + '\')" ' + (!canEnh ? 'disabled' : '') + ' class="' + enhClass + ' text-[7px] font-bold px-2 py-1 rounded uppercase tracking-wider border" title="' + successRate + '% success · ' + eCost.stone + '🪨 ' + eCost.iron + '⛏️ ' + eCost.gold + '🥇">⚡ +' + (enhLvl + 1) + ' (' + successRate + '%)</button>';
        } else {
            enhHtml = '<div class="text-[7px] text-amber-400 font-bold uppercase">🌟 +15 MAX</div>';
        }

        // Enhancement cost tooltip
        var enhCostStr = '';
        if (enhLvl < ENHANCE_MAX_LEVEL) {
            var ec = getEnhanceCost(enhLvl);
            enhCostStr = '<div class="text-[7px] text-gray-500 mt-0.5">' + ec.stone + '🪨 ' + ec.iron + '⛏️ ' + ec.gold + '🥇</div>';
        }

        cardsHtml +=
            '<div class="bg-slate-900/60 border-2 rounded-lg p-3 flex flex-col gap-1.5 ' + glowClass + '" style="border-color:' + color + '" data-equip-id="' + item.id + '">' +
                '<div class="flex items-center justify-between">' +
                    '<div class="flex items-center gap-2">' +
                        '<span class="text-lg">' + typeIcon + '</span>' +
                        '<div>' +
                            '<div class="font-bold text-white text-[11px]">' + _getDisplayName(item) + '</div>' +
                            '<div class="text-[8px] font-bold uppercase tracking-wider" style="color:' + color + '">' + item.rarity + ' · L' + item.level + (enhLvl > 0 ? ' · +' + enhLvl : '') + '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="text-[9px] text-cyan-300 font-bold">' + statsStr + '</div>' +
                enhBarHtml +
                equippedLabel +
                '<div class="flex items-center gap-2 mt-1 flex-wrap">' +
                    actionHtml +
                '</div>' +
                '<div class="flex items-center gap-2 flex-wrap">' +
                    upgHtml +
                    enhHtml +
                '</div>' +
                enhCostStr +
            '</div>';
    }

    // Resource bar
    var stoneAmt = state.resources.stone || 0;
    var ironAmt  = state.resources.iron || 0;
    var goldAmt  = state.resources.gold || 0;
    var diamondAmt = state.resources.diamond || 0;

    // Count common unequipped items for bulk dismantle
    var commonCount = 0;
    for (var ci = 0; ci < state.inventory.length; ci++) {
        if (state.inventory[ci].rarity === 'common' && !state.inventory[ci].equippedTo) commonCount++;
    }
    var bulkDismantleBtn = commonCount > 0
        ? '<button onclick="dismantleAllCommon()" class="bg-orange-800/80 hover:bg-orange-700 text-white text-[8px] font-bold px-2 py-1 rounded cursor-pointer uppercase tracking-wider border border-orange-900/50 transition-all" title="Dismantle all unequipped common items">🗑️ Dismantle Commons (' + commonCount + ')</button>'
        : '';

    modal.innerHTML =
        '<div class="absolute inset-0 bg-black/70" onclick="closeInventoryModal()"></div>' +
        '<div class="absolute inset-2 sm:inset-6 md:inset-10 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl flex flex-col overflow-hidden">' +
            // Header
            '<div class="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-wrap gap-2">' +
                '<div class="font-black text-white text-[14px] uppercase tracking-widest">🎒 INVENTORY</div>' +
                '<div class="flex items-center gap-2 flex-wrap">' +
                    '<button onclick="openFusionModal()" class="bg-amber-700 hover:bg-amber-600 text-white text-[9px] font-bold px-3 py-1 rounded-lg cursor-pointer uppercase tracking-wider border border-amber-600/50 transition-all" title="Combine 3 items into a higher rarity">🔮 Fusion</button>' +
                    bulkDismantleBtn +
                    '<select id="auto-equip-char-sel" class="bg-slate-800 text-gray-300 text-[8px] border border-slate-700 rounded px-1 py-1 cursor-pointer">' + charOptions + '</select>' +
                    '<button onclick="var sel=document.getElementById(\'auto-equip-char-sel\'); if(sel&&sel.value) quickEquipBest(sel.value); else showGameAlert(\'Select Character\',\'Pick a character first.\');" class="bg-emerald-700 hover:bg-emerald-600 text-white text-[9px] font-bold px-3 py-1 rounded-lg cursor-pointer uppercase tracking-wider border border-emerald-600/50 transition-all" title="Auto-equip best unequipped gear to selected character">⚡ Auto-Equip</button>' +
                '</div>' +
                '<div class="flex items-center gap-3 text-[9px] font-bold">' +
                    '<span class="text-gray-400">🪨 ' + stoneAmt + '</span>' +
                    '<span class="text-gray-400">⛏️ ' + ironAmt + '</span>' +
                    '<span class="text-amber-400">🥇 ' + goldAmt + '</span>' +
                    '<span class="text-cyan-400">💎 ' + diamondAmt + '</span>' +
                    '<span class="text-amber-300">' + items.length + ' ITEMS</span>' +
                '</div>' +
                '<button onclick="closeInventoryModal()" class="text-gray-400 hover:text-white text-xl cursor-pointer leading-none">✕</button>' +
            '</div>' +
            // Tabs
            '<div class="flex gap-2 px-4 py-2 border-b border-white/5">' +
                tabHtml +
            '</div>' +
            // Set Bonuses (rendered if any active)
            (typeof renderSetBonusBar === 'function' ? renderSetBonusBar() : '') +
            // Grid
            '<div class="flex-1 overflow-y-auto p-4">' +
                '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">' +
                    cardsHtml +
                '</div>' +
            '</div>' +
        '</div>';
}

// ----- DROP NOTIFICATION -----
function renderEquipmentDropNotification(equip) {
    if (!equip) return;
    var color = RARITY_COLORS[equip.rarity] || '#9ca3af';
    var typeIcon = equip.type === 'weapon' ? '⚔️' : (equip.type === 'armor' ? '🛡️' : '💍');
    var glowClass = _getGlowClass(equip.enhanceLevel);

    var statsStr = _formatStatsStr(equip);

    var notif = document.createElement('div');
    notif.className = 'fixed top-4 right-4 z-[9999] animate-fadeIn';
    notif.id = 'equip-drop-notif';
    notif.innerHTML =
        '<div class="bg-slate-900/90 backdrop-blur-md border-2 rounded-xl p-4 max-w-[260px] shadow-2xl ' + glowClass + '" style="border-color:' + color + '">' +
            '<div class="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">⚡ Equipment Drop!</div>' +
            '<div class="flex items-center gap-2 mb-2">' +
                '<span class="text-2xl">' + typeIcon + '</span>' +
                '<div>' +
                    '<div class="font-black text-white text-[13px]">' + _getDisplayName(equip) + '</div>' +
                    '<div class="text-[9px] font-bold uppercase" style="color:' + color + '">' + equip.rarity + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="text-[10px] text-cyan-300 font-bold">' + statsStr + '</div>' +
            (equip.enhanceLevel > 0 ? '<div class="text-[9px] text-amber-400 font-bold mt-1">🌟 Pre-enhanced to +' + equip.enhanceLevel + '!</div>' : '') +
            '<button onclick="var el=document.getElementById(\'equip-drop-notif\'); if(el) el.remove();" class="mt-2 w-full text-center text-[9px] text-gray-500 hover:text-white cursor-pointer uppercase font-bold tracking-wider">Dismiss</button>' +
        '</div>';

    // Remove any previous drop notif
    var prev = document.getElementById('equip-drop-notif');
    if (prev) prev.remove();

    document.body.appendChild(notif);

    // Auto-dismiss after 4 seconds
    setTimeout(function() {
        var el = document.getElementById('equip-drop-notif');
        if (el) el.remove();
    }, 4000);
}

// ============================================================
// QUICK-EQUIP BEST GEAR
// ============================================================

var _RARITY_MULTIPLIER = { common: 1, rare: 2, epic: 3, legendary: 4 };
var _SCORE_STAT_KEYS = ['dmg', 'hp', 'critPct', 'speedPct', 'dodgePct', 'dmgReductPct', 'aoePct', 'teamDmgPct', 'critDmgPct', 'allStatsPct'];

function _scoreItem(item) {
    var statSum = 0;
    for (var i = 0; i < _SCORE_STAT_KEYS.length; i++) {
        var val = _getEffectiveStatValue(item, _SCORE_STAT_KEYS[i]);
        statSum += val;
    }
    var rarityMult = _RARITY_MULTIPLIER[item.rarity] || 1;
    var enhanceBonus = (item.enhanceLevel || 0) * 5;
    return statSum * rarityMult + enhanceBonus;
}

function quickEquipBest(charKey) {
    initEquipment();
    if (!charKey || !characters[charKey]) return;

    var slotTypes = ['weapon', 'armor', 'accessory'];
    var equipped = 0;

    for (var s = 0; s < slotTypes.length; s++) {
        var slotType = slotTypes[s];
        var bestItem = null;
        var bestScore = -1;

        for (var i = 0; i < state.inventory.length; i++) {
            var item = state.inventory[i];
            if (item.type !== slotType) continue;
            if (item.equippedTo) continue;
            var score = _scoreItem(item);
            if (score > bestScore) {
                bestScore = score;
                bestItem = item;
            }
        }

        if (bestItem) {
            equipItem(bestItem.id, charKey);
            equipped++;
        }
    }

    if (equipped > 0) {
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
        if (typeof showGameAlert === 'function') {
            showGameAlert('Auto-Equipped! ⚡', 'Auto-equipped ' + equipped + ' item' + (equipped !== 1 ? 's' : '') + ' to ' + characters[charKey].name + '!');
        }
    } else {
        if (typeof showGameAlert === 'function') {
            showGameAlert('No Gear Available', 'No unequipped items found to equip.');
        }
    }
    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    renderInventoryModal();
}

window.quickEquipBest = quickEquipBest;

// ============================================================
// SALVAGE SYSTEM — Legacy compatibility (redirects to dismantle)
// ============================================================

var SALVAGE_REWARDS = {
    common:    { stone: 10, iron: 5 },
    rare:      { stone: 25, iron: 15, gold: 5 },
    epic:      { stone: 50, iron: 30, gold: 15, scrap: 10 },
    legendary: { stone: 100, iron: 60, gold: 30, diamond: 5 }
};
