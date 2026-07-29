// =====================================================
// MINI-BOSS ENCOUNTERS — Random elite enemies with bonus loot
// =====================================================
(function() {
    'use strict';

    var MINI_BOSSES = [
        { key: 'comic_book_guy', name: 'Comic Book Guy', quote: "Worst. Heroes. Ever.", color: '#f59e0b', hpMult: 3, dmgMult: 2,
          svg: '<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="18" ry="5" fill="rgba(0,0,0,0.3)"/><rect x="12" y="40" width="36" height="38" fill="#f59e0b" rx="4"/><rect x="12" y="40" width="36" height="6" fill="#d97706"/><rect x="24" y="70" width="6" height="14" fill="#92400e"/><rect x="32" y="70" width="6" height="14" fill="#92400e"/><rect x="6" y="44" width="8" height="18" fill="#f59e0b" rx="2"/><rect x="46" y="44" width="8" height="18" fill="#f59e0b" rx="2"/><ellipse cx="30" cy="28" rx="14" ry="16" fill="#fed7aa"/><rect x="18" y="14" width="24" height="8" fill="#92400e" rx="2"/><rect x="20" y="22" width="20" height="4" fill="#92400e"/><circle cx="24" cy="28" r="2" fill="#1e293b"/><circle cx="36" cy="28" r="2" fill="#1e293b"/><path d="M 24,36 Q 30,32 36,36" fill="none" stroke="#92400e" stroke-width="1.5"/></svg>' },
        { key: 'janitor', name: 'The Janitor', quote: "You think you can just pass?", color: '#6b7280', hpMult: 2.5, dmgMult: 1.8,
          svg: '<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="22" y="65" width="6" height="18" fill="#1e3a5f"/><rect x="32" y="65" width="6" height="18" fill="#1e3a5f"/><rect x="18" y="30" width="24" height="36" fill="#475569" rx="2"/><rect x="26" y="30" width="8" height="10" fill="#6b7280" rx="1"/><rect x="10" y="32" width="8" height="20" fill="#475569" rx="2"/><rect x="42" y="32" width="8" height="20" fill="#475569" rx="2"/><rect x="48" y="8" width="3" height="60" fill="#92400e" rx="1"/><rect x="44" y="4" width="10" height="8" fill="#6b7280" rx="1"/><circle cx="30" cy="18" r="12" fill="#fed7aa"/><rect x="20" y="8" width="20" height="6" fill="#6b7280" rx="2"/><circle cx="25" cy="18" r="1.5" fill="#1e293b"/><circle cx="35" cy="18" r="1.5" fill="#1e293b"/><path d="M 27,24 L 33,24" stroke="#92400e" stroke-width="1"/></svg>' },
        { key: 'inspector', name: 'Building Inspector', quote: "Code violation detected!", color: '#ef4444', hpMult: 3.5, dmgMult: 2.2,
          svg: '<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="22" y="65" width="6" height="18" fill="#1e293b"/><rect x="32" y="65" width="6" height="18" fill="#1e293b"/><rect x="18" y="28" width="24" height="38" fill="#1e293b" rx="2"/><path d="M 26,28 L 30,38 L 34,28" fill="none" stroke="#dc2626" stroke-width="1.5"/><rect x="27" y="34" width="6" height="3" fill="#dc2626"/><rect x="10" y="30" width="8" height="20" fill="#1e293b" rx="2"/><rect x="42" y="30" width="8" height="20" fill="#1e293b" rx="2"/><rect x="8" y="48" width="14" height="10" fill="#ef4444" rx="2"/><rect x="9" y="49" width="5" height="4" fill="white"/><circle cx="30" cy="16" r="12" fill="#fed7aa"/><rect x="20" y="6" width="20" height="6" fill="#374151" rx="2"/><rect x="18" y="8" width="24" height="4" fill="#374151"/><circle cx="25" cy="16" r="1.5" fill="#1e293b"/><circle cx="35" cy="16" r="1.5" fill="#1e293b"/><path d="M 26,22 Q 30,20 34,22" fill="none" stroke="#92400e" stroke-width="1"/></svg>' },
        { key: 'loan_shark', name: 'Loan Shark', quote: "Pay up or pay the price!", color: '#22c55e', hpMult: 3, dmgMult: 2.5,
          svg: '<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.3)"/><rect x="22" y="65" width="6" height="18" fill="#1e293b"/><rect x="32" y="65" width="6" height="18" fill="#1e293b"/><rect x="16" y="28" width="28" height="38" fill="#065f46" rx="2"/><path d="M 30,34 L 26,44 L 34,44 Z" fill="#fbbf24" opacity="0.7"/><rect x="8" y="30" width="8" height="22" fill="#065f46" rx="2"/><rect x="44" y="30" width="8" height="22" fill="#065f46" rx="2"/><circle cx="30" cy="16" r="12" fill="#d4a574"/><rect x="18" y="4" width="24" height="8" fill="#1e293b" rx="2"/><rect x="22" y="12" width="7" height="4" fill="rgba(0,0,0,0.7)" rx="1"/><rect x="31" y="12" width="7" height="4" fill="rgba(0,0,0,0.7)" rx="1"/><circle cx="25" cy="14" r="1" fill="white"/><circle cx="34" cy="14" r="1" fill="white"/><path d="M 26,22 Q 30,25 34,22" fill="none" stroke="#92400e" stroke-width="1"/></svg>' },
        { key: 'hoa_president', name: 'HOA President', quote: "You violated subsection 4.2!", color: '#a855f7', hpMult: 2.8, dmgMult: 1.5,
          svg: '<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="22" y="65" width="6" height="18" fill="#92400e"/><rect x="32" y="65" width="6" height="18" fill="#92400e"/><rect x="18" y="28" width="24" height="38" fill="#7e22ce" rx="2"/><rect x="26" y="30" width="8" height="6" fill="white"/><rect x="28" y="32" width="4" height="2" fill="#7e22ce"/><rect x="10" y="30" width="8" height="20" fill="#7e22ce" rx="2"/><rect x="42" y="30" width="8" height="20" fill="#7e22ce" rx="2"/><rect x="6" y="48" width="12" height="16" fill="#fbbf24" rx="1"/><rect x="7" y="49" width="10" height="6" fill="white"/><circle cx="30" cy="16" r="12" fill="#fed7aa"/><rect x="18" y="6" width="24" height="6" fill="#d4d4d4" rx="2"/><circle cx="25" cy="16" r="1.5" fill="#1e293b"/><circle cx="35" cy="16" r="1.5" fill="#1e293b"/><path d="M 26,22 L 34,22" stroke="#92400e" stroke-width="1"/></svg>' },
        { key: 'parking_enforcer', name: 'Parking Enforcer', quote: "Your time has expired!", color: '#3b82f6', hpMult: 2.5, dmgMult: 2,
          svg: '<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="22" y="65" width="6" height="18" fill="#1e3a5f"/><rect x="32" y="65" width="6" height="18" fill="#1e3a5f"/><rect x="18" y="28" width="24" height="38" fill="#2563eb" rx="2"/><rect x="22" y="32" width="16" height="3" fill="#fbbf24" rx="1"/><circle cx="30" cy="46" r="4" fill="#1e3a5f"/><text x="30" y="49" text-anchor="middle" font-size="6" fill="white" font-weight="bold">P</text><rect x="10" y="30" width="8" height="20" fill="#2563eb" rx="2"/><rect x="42" y="30" width="8" height="20" fill="#2563eb" rx="2"/><circle cx="30" cy="16" r="12" fill="#fed7aa"/><rect x="18" y="4" width="24" height="8" fill="#1e3a5f" rx="2"/><rect x="20" y="4" width="20" height="4" fill="#2563eb"/><circle cx="25" cy="16" r="1.5" fill="#1e293b"/><circle cx="35" cy="16" r="1.5" fill="#1e293b"/><path d="M 26,22 Q 30,20 34,22" fill="none" stroke="#92400e" stroke-width="1"/></svg>' },
        { key: 'noisy_neighbor', name: 'Noise Complaint Neighbor', quote: "KEEP IT DOWN!", color: '#f97316', hpMult: 2, dmgMult: 2.8,
          svg: '<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="22" y="65" width="6" height="18" fill="#78716c"/><rect x="32" y="65" width="6" height="18" fill="#78716c"/><rect x="18" y="28" width="24" height="38" fill="#dc2626" rx="2"/><rect x="10" y="30" width="8" height="20" fill="#dc2626" rx="2"/><rect x="42" y="30" width="8" height="20" fill="#dc2626" rx="2"/><circle cx="30" cy="16" r="12" fill="#fbbf24"/><rect x="20" y="4" width="20" height="4" fill="#92400e" rx="2"/><circle cx="25" cy="16" r="2" fill="white"/><circle cx="35" cy="16" r="2" fill="white"/><circle cx="25" cy="16" r="1" fill="#1e293b"/><circle cx="35" cy="16" r="1" fill="#1e293b"/><ellipse cx="30" cy="24" rx="4" ry="3" fill="#1e293b"/><text x="30" y="26" text-anchor="middle" font-size="5" fill="white">!</text></svg>' },
        { key: 'cable_guy', name: 'Cable Guy', quote: "That will be an extra $200.", color: '#06b6d4', hpMult: 2.5, dmgMult: 1.6,
          svg: '<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="22" y="65" width="6" height="18" fill="#1e3a5f"/><rect x="32" y="65" width="6" height="18" fill="#1e3a5f"/><rect x="18" y="28" width="24" height="38" fill="#0891b2" rx="2"/><rect x="24" y="36" width="12" height="3" fill="white" rx="1"/><rect x="10" y="30" width="8" height="20" fill="#0891b2" rx="2"/><rect x="42" y="30" width="8" height="20" fill="#0891b2" rx="2"/><path d="M 46,42 Q 52,38 56,42 Q 58,46 56,50 Q 52,48 50,44" fill="none" stroke="#fbbf24" stroke-width="1.5"/><circle cx="30" cy="16" r="12" fill="#fed7aa"/><rect x="18" y="4" width="24" height="8" fill="#0891b2" rx="2"/><rect x="20" y="6" width="20" height="2" fill="#06b6d4"/><circle cx="25" cy="16" r="1.5" fill="#1e293b"/><circle cx="35" cy="16" r="1.5" fill="#1e293b"/><path d="M 26,22 Q 30,24 34,22" fill="none" stroke="#92400e" stroke-width="1"/></svg>' }
    ];

    var SPAWN_CHANCE = 0.10; // 10% per wave
    var isMiniBossActive = false;
    var currentMiniBoss = null;

    function getRandomMiniBoss() {
        return MINI_BOSSES[Math.floor(Math.random() * MINI_BOSSES.length)];
    }

    window.checkMiniBossSpawn = function() {
        if (isMiniBossActive) return false;
        if (Math.random() > SPAWN_CHANCE) return false;

        var boss = getRandomMiniBoss();
        currentMiniBoss = boss;
        isMiniBossActive = true;

        showMiniBossAlert(boss);
        return boss;
    };

    window.getMiniBossModifiers = function() {
        if (!isMiniBossActive || !currentMiniBoss) return null;
        return {
            hpMult: currentMiniBoss.hpMult,
            dmgMult: currentMiniBoss.dmgMult,
            name: currentMiniBoss.name,
            svg: currentMiniBoss.svg,
            color: currentMiniBoss.color
        };
    };

    window.onMiniBossDefeated = function() {
        if (!isMiniBossActive || !currentMiniBoss) return;

        var bonusCoins = Math.floor((state.wave || 1) * 50 * currentMiniBoss.hpMult);
        var bonusDiamonds = Math.random() < 0.3 ? Math.floor(Math.random() * 5) + 1 : 0;

        if (state.resources) {
            state.resources.coin = (state.resources.coin || 0) + bonusCoins;
            if (bonusDiamonds > 0) state.resources.diamond = (state.resources.diamond || 0) + bonusDiamonds;
        }

        var msg = '💀 ' + currentMiniBoss.name + ' defeated! +' + bonusCoins + ' 🪙';
        if (bonusDiamonds > 0) msg += ' +' + bonusDiamonds + ' 💎';
        if (typeof showToast === 'function') showToast(msg);

        // Drop enchantment scroll chance
        if (Math.random() < 0.15) {
            if (!state.enchantScrolls) state.enchantScrolls = 0;
            state.enchantScrolls++;
            if (typeof showToast === 'function') showToast('📜 Enchantment Scroll dropped!');
        }

        // Drop awakening shard chance
        if (Math.random() < 0.10) {
            if (!state.awakeningShards) state.awakeningShards = 0;
            state.awakeningShards++;
            if (typeof showToast === 'function') showToast('🌟 Awakening Shard dropped!');
        }

        isMiniBossActive = false;
        currentMiniBoss = null;
        if (typeof saveProgress === 'function') saveProgress();
    };

    function showMiniBossAlert(boss) {
        var alert = document.createElement('div');
        alert.id = 'mini-boss-alert';
        alert.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:180;background:rgba(0,0,0,0.9);border:3px solid ' + boss.color + ';border-radius:16px;padding:20px 32px;text-align:center;animation:zoomIn 0.4s;box-shadow:0 0 40px ' + boss.color + '40;';

        alert.innerHTML = '<div style="font-size:8px;color:' + boss.color + ';font-family:\'Press Start 2P\',monospace;letter-spacing:4px;animation:pulse 0.5s infinite;">⚠ MINI-BOSS ⚠</div>' +
            '<div style="font-family:\'Press Start 2P\',monospace;font-size:12px;color:white;margin:8px 0;">' + boss.name + '</div>' +
            '<div style="font-size:8px;color:rgba(255,255,255,0.4);font-style:italic;">"' + boss.quote + '"</div>';

        document.body.appendChild(alert);
        setTimeout(function() {
            if (alert.parentNode) alert.remove();
        }, 2500);
    }

    // Register menu button
    setTimeout(function() {
        var panel = document.getElementById('more-menu-panel');
        if (!panel) return;
        var grid = panel.querySelector('.flex.flex-wrap, .grid');
        if (!grid) return;
        var btn = document.createElement('button');
        btn.className = 'more-grid-btn';
        btn.onclick = function() { openMiniBossLog(); if (typeof toggleMoreMenu === 'function') toggleMoreMenu(); };
        btn.innerHTML = '<span>💀</span><span class="more-grid-label">Bosses</span>';
        grid.appendChild(btn);
    }, 2500);

    window.openMiniBossLog = function() {
        var existing = document.getElementById('mini-boss-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'mini-boss-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:12px;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

        var html = '<div style="background:linear-gradient(135deg,rgba(20,10,10,0.97),rgba(25,15,15,0.97));border:2px solid rgba(239,68,68,0.4);border-radius:16px;max-width:400px;width:100%;padding:16px;max-height:80vh;overflow-y:auto;">';
        html += '<div style="text-align:center;margin-bottom:12px;">';
        html += '<div style="font-size:28px;">💀</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:#ef4444;letter-spacing:2px;">MINI-BOSSES</div>';
        html += '<div style="font-size:7px;color:rgba(239,68,68,0.5);">10% chance to appear each wave</div>';
        html += '</div>';

        html += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;">';
        for (var i = 0; i < MINI_BOSSES.length; i++) {
            var b = MINI_BOSSES[i];
            html += '<div style="background:rgba(0,0,0,0.4);border:1px solid ' + b.color + '40;border-radius:8px;padding:8px;text-align:center;">';
            html += '<div style="width:40px;height:50px;margin:0 auto 4px;">' + b.svg + '</div>';
            html += '<div style="font-size:6px;color:' + b.color + ';font-family:\'Press Start 2P\',monospace;">' + b.name + '</div>';
            html += '<div style="font-size:5px;color:rgba(255,255,255,0.3);margin-top:2px;">HP ×' + b.hpMult + ' • DMG ×' + b.dmgMult + '</div>';
            html += '</div>';
        }
        html += '</div>';

        html += '<button onclick="document.getElementById(\'mini-boss-modal\').remove()" style="width:100%;margin-top:10px;padding:8px;background:none;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;font-size:7px;border:1px solid rgba(100,100,130,0.2);border-radius:6px;cursor:pointer;">CLOSE</button>';
        html += '</div>';
        modal.innerHTML = html;
        document.body.appendChild(modal);
    };

    console.log('[MiniBosses] Mini-boss encounter system loaded. ' + MINI_BOSSES.length + ' bosses, ' + (SPAWN_CHANCE*100) + '% spawn rate.');
})();
