// =====================================================
// APARTMENT DECORATION — Customize Apt 4A for stat boosts
// =====================================================
(function() {
    'use strict';

    var DECORATIONS = [
        { key: 'couch', name: 'Couch', icon: '🛋️', tiers: [
            { name: 'Basic Sofa', cost: 1000, buff: { type: 'hp', value: 0.03, label: '+3% HP' } },
            { name: 'Premium Leather', cost: 10000, buff: { type: 'hp', value: 0.08, label: '+8% HP' } },
            { name: "Sheldon's Spot™", cost: 100000, diamonds: 50, buff: { type: 'hp', value: 0.15, label: '+15% HP' } }
        ]},
        { key: 'tv', name: 'TV', icon: '📺', tiers: [
            { name: '32" LCD', cost: 1000, buff: { type: 'dmg', value: 0.03, label: '+3% DMG' } },
            { name: '55" 4K', cost: 10000, buff: { type: 'dmg', value: 0.08, label: '+8% DMG' } },
            { name: '85" OLED', cost: 100000, diamonds: 50, buff: { type: 'dmg', value: 0.15, label: '+15% DMG' } }
        ]},
        { key: 'whiteboard', name: 'Whiteboard', icon: '📐', tiers: [
            { name: 'Small Board', cost: 1000, buff: { type: 'xp', value: 0.05, label: '+5% XP' } },
            { name: 'Full Wall Board', cost: 10000, buff: { type: 'xp', value: 0.12, label: '+12% XP' } },
            { name: 'Holographic Display', cost: 100000, diamonds: 50, buff: { type: 'xp', value: 0.20, label: '+20% XP' } }
        ]},
        { key: 'fridge', name: 'Fridge', icon: '🧊', tiers: [
            { name: 'Mini Fridge', cost: 1000, buff: { type: 'hpRegen', value: 0.03, label: '+3% Regen' } },
            { name: 'Double Door', cost: 10000, buff: { type: 'hpRegen', value: 0.08, label: '+8% Regen' } },
            { name: 'Smart Fridge', cost: 100000, diamonds: 50, buff: { type: 'hpRegen', value: 0.15, label: '+15% Regen' } }
        ]},
        { key: 'kitchen', name: 'Kitchen', icon: '🍳', tiers: [
            { name: 'Hotplate', cost: 1000, buff: { type: 'coins', value: 0.05, label: '+5% Coins' } },
            { name: 'Gas Range', cost: 10000, buff: { type: 'coins', value: 0.12, label: '+12% Coins' } },
            { name: 'Chef Kitchen', cost: 100000, diamonds: 50, buff: { type: 'coins', value: 0.20, label: '+20% Coins' } }
        ]},
        { key: 'bookshelf', name: 'Bookshelf', icon: '📚', tiers: [
            { name: 'Small Shelf', cost: 1000, buff: { type: 'crit', value: 0.03, label: '+3% Crit' } },
            { name: 'Full Library', cost: 10000, buff: { type: 'crit', value: 0.08, label: '+8% Crit' } },
            { name: "Sheldon's Collection", cost: 100000, diamonds: 50, buff: { type: 'crit', value: 0.15, label: '+15% Crit' } }
        ]},
        { key: 'computer', name: 'Computer', icon: '💻', tiers: [
            { name: 'Old Laptop', cost: 1000, buff: { type: 'atkSpeed', value: 0.03, label: '+3% ATK Spd' } },
            { name: 'Gaming PC', cost: 10000, buff: { type: 'atkSpeed', value: 0.08, label: '+8% ATK Spd' } },
            { name: 'Quantum Computer', cost: 100000, diamonds: 50, buff: { type: 'atkSpeed', value: 0.15, label: '+15% ATK Spd' } }
        ]},
        { key: 'bathroom', name: 'Bathroom', icon: '🚿', tiers: [
            { name: 'Basic Shower', cost: 1000, buff: { type: 'def', value: 0.03, label: '+3% DEF' } },
            { name: 'Rain Shower', cost: 10000, buff: { type: 'def', value: 0.08, label: '+8% DEF' } },
            { name: 'Spa Suite', cost: 100000, diamonds: 50, buff: { type: 'def', value: 0.15, label: '+15% DEF' } }
        ]},
        { key: 'flag', name: 'Flag', icon: '🚩', tiers: [
            { name: 'Small Pennant', cost: 800, buff: { type: 'dmg', value: 0.02, label: '+2% DMG' } },
            { name: 'Fun with Flags Set', cost: 8000, buff: { type: 'dmg', value: 0.06, label: '+6% DMG' } },
            { name: "Sheldon's Flag Museum", cost: 80000, diamonds: 30, buff: { type: 'dmg', value: 0.12, label: '+12% DMG' } }
        ]},
        { key: 'poster', name: 'Poster', icon: '🖼️', tiers: [
            { name: 'Movie Poster', cost: 800, buff: { type: 'xp', value: 0.02, label: '+2% XP' } },
            { name: 'Comic Collection', cost: 8000, buff: { type: 'xp', value: 0.06, label: '+6% XP' } },
            { name: 'Original Art Wall', cost: 80000, diamonds: 30, buff: { type: 'xp', value: 0.12, label: '+12% XP' } }
        ]},
        { key: 'lamp', name: 'Lamp', icon: '💡', tiers: [
            { name: 'Desk Lamp', cost: 500, buff: { type: 'crit', value: 0.02, label: '+2% Crit' } },
            { name: 'Floor Lamp', cost: 5000, buff: { type: 'crit', value: 0.05, label: '+5% Crit' } },
            { name: 'Plasma Globe', cost: 50000, diamonds: 25, buff: { type: 'crit', value: 0.10, label: '+10% Crit' } }
        ]},
        { key: 'rug', name: 'Rug', icon: '🟫', tiers: [
            { name: 'Welcome Mat', cost: 500, buff: { type: 'coins', value: 0.02, label: '+2% Coins' } },
            { name: 'Area Rug', cost: 5000, buff: { type: 'coins', value: 0.05, label: '+5% Coins' } },
            { name: 'Persian Carpet', cost: 50000, diamonds: 25, buff: { type: 'coins', value: 0.10, label: '+10% Coins' } }
        ]}
    ];

    var TIER_COLORS = ['#9ca3af', '#3b82f6', '#f59e0b'];
    var TIER_NAMES = ['Basic', 'Premium', 'Legendary'];

    function ensureAptState() {
        if (!state) return;
        if (!state.apartment) {
            state.apartment = {};
            for (var i = 0; i < DECORATIONS.length; i++) {
                state.apartment[DECORATIONS[i].key] = 0;
            }
        }
    }

    window.getApartmentBuffs = function() {
        ensureAptState();
        var buffs = {};
        for (var i = 0; i < DECORATIONS.length; i++) {
            var d = DECORATIONS[i];
            var tier = state.apartment[d.key] || 0;
            if (tier > 0) {
                var buff = d.tiers[tier - 1].buff;
                buffs[buff.type] = (buffs[buff.type] || 0) + buff.value;
            }
        }
        return buffs;
    };

    function getComfortScore() {
        ensureAptState();
        var score = 0;
        for (var i = 0; i < DECORATIONS.length; i++) {
            score += (state.apartment[DECORATIONS[i].key] || 0);
        }
        return score;
    }

    window.openApartmentModal = function() {
        ensureAptState();
        var existing = document.getElementById('apartment-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'apartment-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:12px;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

        renderApartmentUI(modal);
        document.body.appendChild(modal);
    };

    function renderApartmentUI(modal) {
        if (!modal) modal = document.getElementById('apartment-modal');
        if (!modal) return;
        ensureAptState();

        var coins = (state.resources && state.resources.coin) || 0;
        var diamonds = (state.resources && state.resources.diamond) || 0;
        var comfortScore = getComfortScore();
        var maxScore = DECORATIONS.length * 3;

        var html = '<div style="background:linear-gradient(135deg,rgba(15,20,30,0.97),rgba(25,20,15,0.97));border:2px solid rgba(251,191,36,0.4);border-radius:16px;max-width:440px;width:100%;padding:16px;max-height:85vh;overflow-y:auto;box-shadow:0 0 60px rgba(251,191,36,0.1);">';

        html += '<div style="text-align:center;margin-bottom:12px;">';
        html += '<div style="font-size:28px;">🏠</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:#fbbf24;letter-spacing:2px;">APARTMENT 4A</div>';
        html += '<div style="font-size:7px;color:rgba(251,191,36,0.5);margin-top:2px;">Comfort Score: ' + comfortScore + '/' + maxScore + '</div>';

        // Comfort bar
        html += '<div style="background:rgba(0,0,0,0.4);border-radius:4px;height:6px;margin:6px auto;max-width:200px;">';
        html += '<div style="background:linear-gradient(90deg,#fbbf24,#f59e0b);height:100%;border-radius:4px;width:' + ((comfortScore/maxScore)*100) + '%;transition:width 0.3s;"></div>';
        html += '</div></div>';

        // Decoration grid
        html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">';
        for (var i = 0; i < DECORATIONS.length; i++) {
            var d = DECORATIONS[i];
            var currentTier = state.apartment[d.key] || 0;
            var nextTier = currentTier < 3 ? d.tiers[currentTier] : null;
            var tierColor = currentTier > 0 ? TIER_COLORS[currentTier - 1] : 'rgba(100,100,130,0.3)';

            html += '<div style="background:rgba(0,0,0,0.4);border:1px solid ' + tierColor + ';border-radius:8px;padding:8px;text-align:center;cursor:pointer;" onclick="upgradeDecoration(\'' + d.key + '\')">';
            html += '<div style="font-size:18px;">' + d.icon + '</div>';
            html += '<div style="font-size:6px;color:' + tierColor + ';font-family:\'Press Start 2P\',monospace;margin-top:2px;">' + d.name + '</div>';

            if (currentTier > 0) {
                html += '<div style="font-size:5px;color:rgba(255,255,255,0.4);">' + TIER_NAMES[currentTier-1] + '</div>';
                html += '<div style="font-size:5px;color:#4ade80;">' + d.tiers[currentTier-1].buff.label + '</div>';
            }

            if (nextTier) {
                html += '<div style="margin-top:4px;font-size:5px;color:rgba(255,255,255,0.3);">Next: ' + nextTier.cost + '🪙' + (nextTier.diamonds ? ' + ' + nextTier.diamonds + '💎' : '') + '</div>';
            } else if (currentTier >= 3) {
                html += '<div style="margin-top:4px;font-size:5px;color:#fbbf24;">MAX ✨</div>';
            }
            html += '</div>';
        }
        html += '</div>';

        // Active buffs summary
        var buffs = window.getApartmentBuffs();
        var buffKeys = Object.keys(buffs);
        if (buffKeys.length > 0) {
            html += '<div style="margin-top:10px;background:rgba(0,0,0,0.4);border:1px solid rgba(74,222,128,0.2);border-radius:8px;padding:8px;">';
            html += '<div style="font-size:6px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;margin-bottom:4px;">TOTAL BUFFS</div>';
            html += '<div style="display:flex;flex-wrap:wrap;gap:4px;">';
            for (var j = 0; j < buffKeys.length; j++) {
                html += '<span style="font-size:6px;color:#4ade80;background:rgba(74,222,128,0.1);padding:2px 6px;border-radius:4px;">' + buffKeys[j].toUpperCase() + ' +' + (buffs[buffKeys[j]]*100).toFixed(0) + '%</span>';
            }
            html += '</div></div>';
        }

        html += '<button onclick="document.getElementById(\'apartment-modal\').remove()" style="width:100%;margin-top:10px;padding:8px;background:none;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;font-size:7px;border:1px solid rgba(100,100,130,0.2);border-radius:6px;cursor:pointer;">CLOSE</button>';
        html += '</div>';
        modal.innerHTML = html;
    }

    window.upgradeDecoration = function(key) {
        ensureAptState();
        var dec = null;
        for (var i = 0; i < DECORATIONS.length; i++) { if (DECORATIONS[i].key === key) dec = DECORATIONS[i]; }
        if (!dec) return;

        var currentTier = state.apartment[key] || 0;
        if (currentTier >= 3) { if (typeof showToast === 'function') showToast('Already at max tier!'); return; }

        var next = dec.tiers[currentTier];
        var coins = (state.resources && state.resources.coin) || 0;
        var diamonds = (state.resources && state.resources.diamond) || 0;

        if (coins < next.cost) { if (typeof showToast === 'function') showToast('Need ' + next.cost + ' coins!'); return; }
        if (next.diamonds && diamonds < next.diamonds) { if (typeof showToast === 'function') showToast('Need ' + next.diamonds + ' diamonds!'); return; }

        if (state.resources) {
            state.resources.coin -= next.cost;
            if (next.diamonds) state.resources.diamond -= next.diamonds;
        }
        state.apartment[key] = currentTier + 1;

        if (typeof showToast === 'function') showToast('🏠 ' + dec.name + ' upgraded to ' + TIER_NAMES[currentTier] + '!');
        if (typeof saveProgress === 'function') saveProgress();
        renderApartmentUI();
    };

    // Register menu button
    setTimeout(function() {
        var panel = document.getElementById('more-menu-panel');
        if (!panel) return;
        var grid = panel.querySelector('.flex.flex-wrap, .grid');
        if (!grid) return;
        var btn = document.createElement('button');
        btn.className = 'more-grid-btn';
        btn.onclick = function() { openApartmentModal(); if (typeof toggleMoreMenu === 'function') toggleMoreMenu(); };
        btn.innerHTML = '<span>🏠</span><span class="more-grid-label">Apt 4A</span>';
        grid.appendChild(btn);
    }, 2500);

    console.log('[Apartment] Apartment decoration system loaded. ' + DECORATIONS.length + ' slots, 3 tiers each.');
})();
