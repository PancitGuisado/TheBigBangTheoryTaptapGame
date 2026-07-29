// =====================================================
// THEMED SEASONS — Rotating seasonal events with rewards
// =====================================================
(function() {
    'use strict';

    var SEASONS = [
        { key: 'comic_con', name: 'Comic-Con Invasion', icon: '🦸', months: [5, 6, 7], // Jun-Aug
          color: '#3b82f6', bonus: { type: 'dmg', value: 0.20, label: '+20% DMG' },
          desc: 'Comic heroes invade Pasadena! Bonus damage all season.' },
        { key: 'halloween', name: 'Spooky Science', icon: '🎃', months: [8, 9, 10], // Sep-Nov
          color: '#f97316', bonus: { type: 'crit', value: 0.20, label: '+20% Crit' },
          desc: "Spooky experiments gone wrong! Enhanced critical strikes." },
        { key: 'holiday', name: 'Holiday Special', icon: '🎄', months: [11, 0, 1], // Dec-Feb
          color: '#22c55e', bonus: { type: 'coins', value: 0.20, label: '+20% Coins' },
          desc: 'Saturnalia celebrations! Extra coin drops everywhere.' },
        { key: 'valentine', name: "Valentine's Theory", icon: '💝', months: [2, 3, 4], // Mar-May
          color: '#ec4899', bonus: { type: 'xp', value: 0.20, label: '+20% XP' },
          desc: 'Love is in the lab! Bonus experience all season.' }
    ];

    var SEASON_PASS_REWARDS = [
        { level: 1, free: '500 🪙', premium: '5 💎' },
        { level: 3, free: '1000 🪙', premium: '10 💎' },
        { level: 5, free: '1 📜 Scroll', premium: '20 💎' },
        { level: 8, free: '2000 🪙', premium: '1 🌟 Shard' },
        { level: 10, free: '3000 🪙', premium: '30 💎' },
        { level: 13, free: '5000 🪙', premium: '50 💎' },
        { level: 15, free: '2 📜 Scrolls', premium: '2 🌟 Shards' },
        { level: 18, free: '8000 🪙', premium: '75 💎' },
        { level: 20, free: '10000 🪙', premium: '100 💎' },
        { level: 25, free: '15000 🪙', premium: '3 🌟 Shards' },
        { level: 30, free: '25000 🪙', premium: '200 💎 + 🏆 Title' }
    ];

    var TOKENS_PER_LEVEL = 100;

    function getCurrentSeason() {
        var month = new Date().getMonth();
        for (var i = 0; i < SEASONS.length; i++) {
            if (SEASONS[i].months.includes(month)) return SEASONS[i];
        }
        return SEASONS[0];
    }

    function getSeasonEndDate() {
        var season = getCurrentSeason();
        var now = new Date();
        var lastMonth = season.months[season.months.length - 1];
        var endYear = now.getFullYear();
        if (lastMonth < now.getMonth()) endYear++;
        var endDate = new Date(endYear, lastMonth + 1, 1);
        return endDate;
    }

    function ensureSeasonState() {
        if (!state) return;
        var current = getCurrentSeason();
        if (!state.seasons) state.seasons = { current: current.key, tokens: 0, passLevel: 0, claimed: [] };
        if (state.seasons.current !== current.key) {
            state.seasons.current = current.key;
            state.seasons.tokens = 0;
            state.seasons.passLevel = 0;
            state.seasons.claimed = [];
        }
    }

    window.getSeasonBonus = function() {
        var season = getCurrentSeason();
        return season.bonus;
    };

    window.grantSeasonTokens = function(amount) {
        ensureSeasonState();
        state.seasons.tokens = (state.seasons.tokens || 0) + amount;
        var newLevel = Math.floor(state.seasons.tokens / TOKENS_PER_LEVEL);
        if (newLevel > state.seasons.passLevel) {
            state.seasons.passLevel = newLevel;
            if (typeof showToast === 'function') showToast('📊 Season Pass Level ' + newLevel + '!');
        }
        if (typeof saveProgress === 'function') saveProgress();
    };

    window.openSeasonsModal = function() {
        ensureSeasonState();
        var existing = document.getElementById('seasons-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'seasons-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:12px;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

        var season = getCurrentSeason();
        var endDate = getSeasonEndDate();
        var now = new Date();
        var daysLeft = Math.max(0, Math.ceil((endDate - now) / 86400000));
        var s = state.seasons;

        var html = '<div style="background:linear-gradient(135deg,rgba(10,15,25,0.97),rgba(15,10,20,0.97));border:2px solid ' + season.color + '60;border-radius:16px;max-width:420px;width:100%;padding:16px;max-height:85vh;overflow-y:auto;box-shadow:0 0 60px ' + season.color + '10;">';

        // Header
        html += '<div style="text-align:center;margin-bottom:12px;">';
        html += '<div style="font-size:36px;">' + season.icon + '</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:' + season.color + ';letter-spacing:2px;">' + season.name.toUpperCase() + '</div>';
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.4);margin-top:4px;">' + season.desc + '</div>';
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.3);margin-top:4px;">⏰ ' + daysLeft + ' days remaining</div>';
        html += '</div>';

        // Season bonus
        html += '<div style="background:rgba(0,0,0,0.4);border:1px solid ' + season.color + '40;border-radius:10px;padding:10px;margin-bottom:10px;text-align:center;">';
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;margin-bottom:4px;">SEASON BONUS</div>';
        html += '<div style="font-size:10px;color:#4ade80;font-family:\'Press Start 2P\',monospace;">' + season.bonus.label + '</div>';
        html += '<div style="font-size:6px;color:rgba(255,255,255,0.3);margin-top:2px;">Active for all players this season</div>';
        html += '</div>';

        // Season Pass
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:6px;">SEASON PASS — Level ' + s.passLevel + '</div>';
        
        // XP bar
        var tokensInLevel = s.tokens % TOKENS_PER_LEVEL;
        html += '<div style="background:rgba(0,0,0,0.4);border-radius:4px;height:8px;margin-bottom:10px;">';
        html += '<div style="background:linear-gradient(90deg,' + season.color + ',' + season.color + 'cc);height:100%;border-radius:4px;width:' + ((tokensInLevel/TOKENS_PER_LEVEL)*100) + '%;"></div>';
        html += '</div>';
        html += '<div style="font-size:6px;color:rgba(255,255,255,0.3);text-align:center;margin-bottom:8px;">' + tokensInLevel + '/' + TOKENS_PER_LEVEL + ' tokens to next level</div>';

        // Pass rewards track
        html += '<div style="display:flex;flex-direction:column;gap:4px;margin-bottom:10px;">';
        for (var i = 0; i < SEASON_PASS_REWARDS.length; i++) {
            var r = SEASON_PASS_REWARDS[i];
            var unlocked = s.passLevel >= r.level;
            var claimed = s.claimed && s.claimed.includes(r.level);
            html += '<div style="display:flex;align-items:center;gap:6px;padding:4px 6px;background:rgba(0,0,0,' + (unlocked ? '0.4' : '0.2') + ');border:1px solid ' + (unlocked ? season.color + '40' : 'rgba(100,100,130,0.15)') + ';border-radius:6px;opacity:' + (unlocked ? '1' : '0.4') + ';">';
            html += '<div style="font-size:7px;color:' + season.color + ';font-family:\'Press Start 2P\',monospace;min-width:24px;">L' + r.level + '</div>';
            html += '<div style="flex:1;font-size:6px;color:rgba(255,255,255,0.5);">' + r.free + '</div>';
            html += '<div style="font-size:6px;color:#fbbf24;">' + r.premium + '</div>';
            if (unlocked && !claimed) {
                html += '<button onclick="claimSeasonReward(' + r.level + ')" style="padding:2px 6px;background:' + season.color + ';color:white;font-size:5px;font-family:\'Press Start 2P\',monospace;border:none;border-radius:3px;cursor:pointer;">CLAIM</button>';
            } else if (claimed) {
                html += '<span style="font-size:6px;color:#4ade80;">✓</span>';
            }
            html += '</div>';
        }
        html += '</div>';

        html += '<button onclick="document.getElementById(\'seasons-modal\').remove()" style="width:100%;padding:8px;background:none;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;font-size:7px;border:1px solid rgba(100,100,130,0.2);border-radius:6px;cursor:pointer;">CLOSE</button>';
        html += '</div>';
        modal.innerHTML = html;
        document.body.appendChild(modal);
    };

    window.claimSeasonReward = function(level) {
        ensureSeasonState();
        if (state.seasons.passLevel < level) return;
        if (state.seasons.claimed.includes(level)) return;

        state.seasons.claimed.push(level);

        // Grant rewards based on level
        var coinRewards = { 1: 500, 3: 1000, 8: 2000, 10: 3000, 13: 5000, 18: 8000, 20: 10000, 25: 15000, 30: 25000 };
        var diamondRewards = { 1: 5, 3: 10, 5: 0, 8: 0, 10: 30, 13: 50, 15: 0, 18: 75, 20: 100, 25: 0, 30: 200 };
        var shardRewards = { 8: 1, 15: 2, 25: 3 };
        var scrollRewards = { 5: 1, 15: 2 };

        if (state.resources) {
            state.resources.coin = (state.resources.coin || 0) + (coinRewards[level] || 0);
            state.resources.diamond = (state.resources.diamond || 0) + (diamondRewards[level] || 0);
        }
        if (shardRewards[level]) {
            state.awakeningShards = (state.awakeningShards || 0) + shardRewards[level];
        }
        if (scrollRewards[level]) {
            state.enchantScrolls = (state.enchantScrolls || 0) + scrollRewards[level];
        }

        if (typeof showToast === 'function') showToast('🎁 Season Pass Level ' + level + ' rewards claimed!');
        if (typeof saveProgress === 'function') saveProgress();
        openSeasonsModal(); // Refresh
    };

    // Grant tokens passively every minute
    setInterval(function() {
        ensureSeasonState();
        if (typeof grantSeasonTokens === 'function') grantSeasonTokens(2);
    }, 60000);

    // Register menu button
    setTimeout(function() {
        var panel = document.getElementById('more-menu-panel');
        if (!panel) return;
        var grid = panel.querySelector('.flex.flex-wrap, .grid');
        if (!grid) return;
        var btn = document.createElement('button');
        btn.className = 'more-grid-btn';
        btn.onclick = function() { openSeasonsModal(); if (typeof toggleMoreMenu === 'function') toggleMoreMenu(); };
        btn.innerHTML = '<span>🎃</span><span class="more-grid-label">Season</span>';
        grid.appendChild(btn);
    }, 2500);

    console.log('[Seasons] Themed seasons system loaded. Current: ' + getCurrentSeason().name);
})();
