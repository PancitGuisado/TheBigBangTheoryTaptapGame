// =====================================================
// PET SYSTEM — Collectible companions with passive buffs
// =====================================================
(function() {
    'use strict';

    var PET_DEFS = [
        { key: 'cinnamon', name: 'Cinnamon', icon: '🐕', desc: "Raj's beloved Yorkie. Boosts damage.", rarity: 'rare', buff: { type: 'dmg', value: 0.10, label: '+10% DMG' } },
        { key: 'zazzles', name: 'Zazzles', icon: '🐱', desc: "Sheldon's cat. Enhances critical strikes.", rarity: 'epic', buff: { type: 'crit', value: 0.15, label: '+15% Crit' } },
        { key: 'lucky', name: 'Lucky', icon: '🐈', desc: "Penny's rescued cat. Regenerates health.", rarity: 'common', buff: { type: 'hpRegen', value: 0.05, label: '+5% HP Regen' } },
        { key: 'nimoy_dna', name: "Nimoy's DNA", icon: '🧬', desc: "Leonard Nimoy's DNA sample. All stats up.", rarity: 'legendary', buff: { type: 'all', value: 0.05, label: '+5% All Stats' } },
        { key: 'wheelchair', name: "Hawking's Chair", icon: '♿', desc: "Stephen Hawking's wheelchair. Faster attacks.", rarity: 'epic', buff: { type: 'atkSpeed', value: 0.12, label: '+12% ATK Speed' } },
        { key: 'lovey_dovey', name: 'Lovey-Dovey', icon: '🐦', desc: "Howard's mom's bird. More coin drops.", rarity: 'common', buff: { type: 'coins', value: 0.20, label: '+20% Coins' } },
        { key: 'pluto', name: 'Pluto', icon: '🪐', desc: "Not a planet! But gives bonus XP.", rarity: 'rare', buff: { type: 'xp', value: 0.15, label: '+15% XP' } },
        { key: 'tarantula', name: "Dr. Gunderson's Tarantula", icon: '🕷️', desc: "The physics dept tarantula. Poison damage.", rarity: 'rare', buff: { type: 'poison', value: 0.08, label: '+8% Poison DMG' } }
    ];

    var RARITY_COLORS = { common: '#9ca3af', rare: '#3b82f6', epic: '#a855f7', legendary: '#f59e0b' };
    var RARITY_WEIGHTS = { common: 40, rare: 35, epic: 20, legendary: 5 };

    function ensurePetState() {
        if (!state) return;
        if (!state.pets) state.pets = { owned: [], equipped: null };
    }

    function getPetDef(key) {
        for (var i = 0; i < PET_DEFS.length; i++) { if (PET_DEFS[i].key === key) return PET_DEFS[i]; }
        return null;
    }

    // Get active pet buff
    window.getActivePetBuff = function() {
        ensurePetState();
        if (!state.pets.equipped) return null;
        var owned = state.pets.owned;
        for (var i = 0; i < owned.length; i++) {
            if (owned[i].key === state.pets.equipped) {
                var def = getPetDef(owned[i].key);
                if (def) {
                    var levelMult = 1 + (owned[i].level - 1) * 0.1;
                    return { type: def.buff.type, value: def.buff.value * levelMult, name: def.name, icon: def.icon };
                }
            }
        }
        return null;
    };

    function rollPet() {
        var total = 0;
        for (var r in RARITY_WEIGHTS) total += RARITY_WEIGHTS[r];
        var roll = Math.random() * total;
        var rarity = 'common';
        var cumul = 0;
        for (var r2 in RARITY_WEIGHTS) {
            cumul += RARITY_WEIGHTS[r2];
            if (roll < cumul) { rarity = r2; break; }
        }
        var pool = PET_DEFS.filter(function(p) { return p.rarity === rarity; });
        if (pool.length === 0) pool = PET_DEFS;
        return pool[Math.floor(Math.random() * pool.length)];
    }

    window.openPetModal = function() {
        ensurePetState();
        var existing = document.getElementById('pet-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'pet-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:12px;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

        renderPetUI(modal);
        document.body.appendChild(modal);
    };

    function renderPetUI(modal) {
        if (!modal) modal = document.getElementById('pet-modal');
        if (!modal) return;
        ensurePetState();

        var owned = state.pets.owned;
        var equipped = state.pets.equipped;
        var coins = (state.resources && state.resources.coin) || state.score || 0;

        var html = '<div style="background:linear-gradient(135deg,rgba(15,20,35,0.97),rgba(20,25,45,0.97));border:2px solid rgba(168,85,247,0.4);border-radius:16px;max-width:420px;width:100%;padding:16px;box-shadow:0 0 60px rgba(168,85,247,0.1);max-height:85vh;overflow-y:auto;">';

        html += '<div style="text-align:center;margin-bottom:12px;">';
        html += '<div style="font-size:28px;">🐾</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:#a855f7;letter-spacing:2px;">PET COMPANIONS</div>';
        html += '<div style="font-size:7px;color:rgba(168,85,247,0.5);margin-top:2px;">Collect & equip pets for passive buffs</div>';
        html += '</div>';

        // Equipped pet
        html += '<div style="background:rgba(0,0,0,0.4);border:1px solid rgba(168,85,247,0.3);border-radius:10px;padding:10px;margin-bottom:10px;text-align:center;">';
        if (equipped) {
            var ep = null;
            for (var i = 0; i < owned.length; i++) { if (owned[i].key === equipped) ep = owned[i]; }
            var epDef = ep ? getPetDef(ep.key) : null;
            if (epDef && ep) {
                html += '<div style="font-size:32px;">' + epDef.icon + '</div>';
                html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + RARITY_COLORS[epDef.rarity] + ';margin-top:2px;">' + epDef.name + ' Lv.' + ep.level + '</div>';
                var lvlMult = 1 + (ep.level - 1) * 0.1;
                html += '<div style="font-size:7px;color:#4ade80;margin-top:2px;">' + epDef.buff.label + ' (×' + lvlMult.toFixed(1) + ')</div>';
                html += '<button onclick="unequipPet()" style="margin-top:6px;padding:4px 12px;background:rgba(239,68,68,0.2);color:#fca5a5;font-size:7px;border:1px solid rgba(239,68,68,0.3);border-radius:4px;cursor:pointer;font-family:\'Press Start 2P\',monospace;">UNEQUIP</button>';
            }
        } else {
            html += '<div style="font-size:8px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;">No pet equipped</div>';
        }
        html += '</div>';

        // Gacha pull
        html += '<button onclick="pullPetGacha()" style="width:100%;padding:10px;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;font-family:\'Press Start 2P\',monospace;font-size:9px;border:2px solid #a855f7;border-radius:8px;cursor:pointer;margin-bottom:10px;box-shadow:0 0 15px rgba(168,85,247,0.3);"' + (coins < 500 ? ' disabled style="opacity:0.4;cursor:not-allowed;"' : '') + '>🎲 SUMMON PET (500 🪙)</button>';

        // Owned pets
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:6px;">COLLECTION (' + owned.length + '/' + PET_DEFS.length + ')</div>';
        html += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-bottom:10px;">';

        if (owned.length === 0) {
            html += '<div style="grid-column:1/-1;text-align:center;color:rgba(255,255,255,0.2);font-size:8px;padding:20px;">No pets yet — Summon your first!</div>';
        } else {
            for (var j = 0; j < owned.length; j++) {
                var pet = owned[j];
                var def = getPetDef(pet.key);
                if (!def) continue;
                var isEquipped = equipped === pet.key;
                var col = RARITY_COLORS[def.rarity];
                html += '<div onclick="equipPet(\'' + pet.key + '\')" style="background:rgba(0,0,0,0.4);border:1px solid ' + col + (isEquipped ? ';box-shadow:0 0 10px ' + col + '40' : '') + ';border-radius:8px;padding:8px;cursor:pointer;transition:all 0.15s;' + (isEquipped ? 'border-width:2px;' : '') + '">';
                html += '<div style="display:flex;align-items:center;gap:6px;">';
                html += '<div style="font-size:20px;">' + def.icon + '</div>';
                html += '<div>';
                html += '<div style="font-size:7px;color:' + col + ';font-family:\'Press Start 2P\',monospace;">' + def.name + '</div>';
                html += '<div style="font-size:6px;color:rgba(255,255,255,0.4);">Lv.' + pet.level + ' • ' + def.rarity.toUpperCase() + '</div>';
                html += '<div style="font-size:6px;color:#4ade80;margin-top:1px;">' + def.buff.label + '</div>';
                html += '</div></div>';
                if (isEquipped) html += '<div style="font-size:6px;color:#fbbf24;font-family:\'Press Start 2P\',monospace;text-align:center;margin-top:4px;">✅ EQUIPPED</div>';
                html += '</div>';
            }
        }
        html += '</div>';

        // Undiscovered
        var ownedKeys = owned.map(function(p) { return p.key; });
        var undiscovered = PET_DEFS.filter(function(p) { return !ownedKeys.includes(p.key); });
        if (undiscovered.length > 0) {
            html += '<div style="font-size:7px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;margin-bottom:4px;">UNDISCOVERED</div>';
            html += '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px;">';
            for (var k = 0; k < undiscovered.length; k++) {
                html += '<div style="width:32px;height:32px;background:rgba(0,0,0,0.4);border:1px solid rgba(100,100,130,0.2);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(255,255,255,0.1);">?</div>';
            }
            html += '</div>';
        }

        html += '<button onclick="document.getElementById(\'pet-modal\').remove()" style="width:100%;padding:8px;background:none;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;font-size:7px;border:1px solid rgba(100,100,130,0.2);border-radius:6px;cursor:pointer;">CLOSE</button>';
        html += '</div>';
        modal.innerHTML = html;
    }

    window.pullPetGacha = function() {
        ensurePetState();
        var coins = (state.resources && state.resources.coin) ? state.resources.coin : 0;
        if (coins < 500) { if (typeof showToast === 'function') showToast('Need 500 coins!'); return; }

        if (state.resources) state.resources.coin -= 500;
        else state.score = (state.score || 0) - 500;

        var petDef = rollPet();
        var owned = state.pets.owned;
        var existing = null;
        for (var i = 0; i < owned.length; i++) { if (owned[i].key === petDef.key) { existing = owned[i]; break; } }

        if (existing) {
            existing.level = Math.min(10, existing.level + 1);
            if (typeof showToast === 'function') showToast(petDef.icon + ' ' + petDef.name + ' leveled up to Lv.' + existing.level + '!');
        } else {
            owned.push({ key: petDef.key, level: 1 });
            if (typeof showToast === 'function') showToast('New pet: ' + petDef.icon + ' ' + petDef.name + '! (' + petDef.rarity + ')');
        }

        if (typeof saveProgress === 'function') saveProgress();
        renderPetUI();
    };

    window.equipPet = function(key) {
        ensurePetState();
        state.pets.equipped = key;
        if (typeof saveProgress === 'function') saveProgress();
        renderPetUI();
    };

    window.unequipPet = function() {
        ensurePetState();
        state.pets.equipped = null;
        if (typeof saveProgress === 'function') saveProgress();
        renderPetUI();
    };

    // Register in More Menu
    setTimeout(function() {
        var panel = document.getElementById('more-menu-panel');
        if (!panel) return;
        var grid = panel.querySelector('.flex.flex-wrap, .grid');
        if (!grid) return;
        var btn = document.createElement('button');
        btn.className = 'more-grid-btn';
        btn.onclick = function() { openPetModal(); if (typeof toggleMoreMenu === 'function') toggleMoreMenu(); };
        btn.innerHTML = '<span>🐾</span><span class="more-grid-label">Pets</span>';
        grid.appendChild(btn);
    }, 2500);

    console.log('[Pets] Pet companion system loaded. ' + PET_DEFS.length + ' pets defined.');
})();
