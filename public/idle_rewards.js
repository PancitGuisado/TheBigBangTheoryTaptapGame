// =====================================================
// IDLE REWARDS — Welcome Back / Offline Earnings Screen
// =====================================================
(function() {
    'use strict';

    var MAX_OFFLINE_HOURS = 8;
    var OFFLINE_RATE = 0.5; // 50% of active earnings

    function ensureIdleState() {
        if (!state) return;
        if (!state.lastOnlineTime) state.lastOnlineTime = Date.now();
    }

    // Override saveProgress to track last online time
    var _origSave = window.saveProgress;
    window.saveProgress = function() {
        if (state) state.lastOnlineTime = Date.now();
        if (_origSave) return _origSave.apply(this, arguments);
    };

    function getTeamDPS() {
        if (!state || !state.team) return 10;
        var dps = 0;
        var team = state.team;
        for (var i = 0; i < team.length; i++) {
            var charKey = team[i];
            if (!charKey) continue;
            var charState = state.characters && state.characters[charKey];
            if (!charState) continue;
            var level = charState.level || 1;
            var baseDmg = 10 + (level * 5);
            dps += baseDmg;
        }
        return Math.max(dps, 10);
    }

    function calculateOfflineRewards() {
        ensureIdleState();
        var now = Date.now();
        var lastOnline = state.lastOnlineTime || now;
        var elapsedMs = now - lastOnline;
        var elapsedSec = elapsedMs / 1000;
        var maxSec = MAX_OFFLINE_HOURS * 3600;
        elapsedSec = Math.min(elapsedSec, maxSec);

        if (elapsedSec < 60) return null; // Less than 1 minute away, skip

        var dps = getTeamDPS();
        var coinsPerSec = dps * 0.5 * OFFLINE_RATE;
        var xpPerSec = dps * 0.2 * OFFLINE_RATE;

        var totalCoins = Math.floor(coinsPerSec * elapsedSec);
        var totalXP = Math.floor(xpPerSec * elapsedSec);
        var totalDiamonds = Math.floor(elapsedSec / 1800); // 1 diamond per 30 min

        return {
            elapsedSec: elapsedSec,
            coins: totalCoins,
            xp: totalXP,
            diamonds: totalDiamonds
        };
    }

    function formatTime(seconds) {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        if (h > 0) return h + 'h ' + m + 'm';
        return m + 'm';
    }

    function showIdleRewardModal(rewards, doubleMultiplier) {
        var mult = doubleMultiplier || 1;
        var existing = document.getElementById('idle-reward-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'idle-reward-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:250;background:rgba(0,0,0,0.95);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn 0.5s;';

        var html = '<div style="background:linear-gradient(135deg,rgba(15,20,50,0.98),rgba(10,15,35,0.98));border:2px solid rgba(59,130,246,0.4);border-radius:20px;max-width:380px;width:100%;padding:24px;box-shadow:0 0 80px rgba(59,130,246,0.15);text-align:center;">';

        // Header
        html += '<div style="font-size:40px;margin-bottom:8px;animation:bounce 0.6s;">🌙</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:14px;color:#60a5fa;letter-spacing:2px;margin-bottom:4px;">WELCOME BACK!</div>';
        html += '<div style="font-size:9px;color:rgba(255,255,255,0.4);margin-bottom:16px;">You were away for ' + formatTime(rewards.elapsedSec) + '</div>';

        // Greetings
        var greetings = ['Bazinga! Your team worked hard while you were gone!', 'Your characters kept grinding while you slept!', 'Science never sleeps! Here are your offline earnings.', 'The elevator is still broken, but your team kept climbing!'];
        var greeting = greetings[Math.floor(Math.random() * greetings.length)];
        html += '<div style="font-size:8px;color:rgba(255,255,255,0.3);font-style:italic;margin-bottom:16px;padding:0 8px;">"' + greeting + '"</div>';

        // Rewards breakdown
        html += '<div style="background:rgba(0,0,0,0.4);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:14px;margin-bottom:16px;">';
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;margin-bottom:10px;">OFFLINE EARNINGS</div>';

        var items = [
            { icon: '🪙', label: 'Coins', value: Math.floor(rewards.coins * mult) },
            { icon: '⭐', label: 'Experience', value: Math.floor(rewards.xp * mult) },
            { icon: '💎', label: 'Diamonds', value: Math.floor(rewards.diamonds * mult) }
        ];

        for (var i = 0; i < items.length; i++) {
            if (items[i].value <= 0) continue;
            html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;' + (i > 0 ? 'border-top:1px solid rgba(59,130,246,0.1);' : '') + '">';
            html += '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px;">' + items[i].icon + '</span><span style="font-size:8px;color:rgba(255,255,255,0.6);">' + items[i].label + '</span></div>';
            html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:#4ade80;">+' + items[i].value.toLocaleString() + '</div>';
            html += '</div>';
        }
        html += '</div>';

        if (mult > 1) {
            html += '<div style="color:#fbbf24;font-family:\'Press Start 2P\',monospace;font-size:8px;margin-bottom:12px;">✨ DOUBLED! ✨</div>';
        }

        // Buttons
        if (mult === 1) {
            html += '<div style="display:flex;gap:8px;">';
            html += '<button onclick="claimIdleRewards(1)" style="flex:1;padding:10px;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;font-family:\'Press Start 2P\',monospace;font-size:8px;border:none;border-radius:8px;cursor:pointer;box-shadow:0 0 15px rgba(59,130,246,0.3);">CLAIM</button>';
            html += '<button onclick="claimIdleRewards(2)" style="flex:1;padding:10px;background:linear-gradient(135deg,#f59e0b,#d97706);color:white;font-family:\'Press Start 2P\',monospace;font-size:8px;border:none;border-radius:8px;cursor:pointer;box-shadow:0 0 15px rgba(245,158,11,0.3);">📺 DOUBLE!</button>';
            html += '</div>';
        } else {
            html += '<button onclick="document.getElementById(\'idle-reward-modal\').remove()" style="width:100%;padding:12px;background:linear-gradient(135deg,#22c55e,#16a34a);color:white;font-family:\'Press Start 2P\',monospace;font-size:9px;border:none;border-radius:8px;cursor:pointer;">CONTINUE ✨</button>';
        }

        html += '</div>';
        modal.innerHTML = html;
        document.body.appendChild(modal);
    }

    window.claimIdleRewards = function(mult) {
        var rewards = calculateOfflineRewards();
        if (!rewards) return;

        var coins = Math.floor(rewards.coins * mult);
        var xp = Math.floor(rewards.xp * mult);
        var diamonds = Math.floor(rewards.diamonds * mult);

        // Apply rewards
        if (state.resources) {
            state.resources.coin = (state.resources.coin || 0) + coins;
            state.resources.diamond = (state.resources.diamond || 0) + diamonds;
        } else {
            state.score = (state.score || 0) + coins;
            state.diamonds = (state.diamonds || 0) + diamonds;
        }

        // Apply XP to team
        if (state.team && state.characters) {
            var xpPer = Math.floor(xp / Math.max(state.team.length, 1));
            for (var i = 0; i < state.team.length; i++) {
                var key = state.team[i];
                if (key && state.characters[key]) {
                    state.characters[key].xp = (state.characters[key].xp || 0) + xpPer;
                }
            }
        }

        state.lastOnlineTime = Date.now();
        if (typeof saveProgress === 'function') saveProgress();

        if (mult > 1) {
            showIdleRewardModal(rewards, mult);
        } else {
            var m = document.getElementById('idle-reward-modal');
            if (m) m.remove();
            if (typeof showToast === 'function') showToast('💰 Claimed ' + coins.toLocaleString() + ' coins!');
        }
    };

    // Check on load
    setTimeout(function() {
        ensureIdleState();
        var rewards = calculateOfflineRewards();
        if (rewards && rewards.coins > 0) {
            showIdleRewardModal(rewards);
        }
    }, 3000);

    console.log('[IdleRewards] Welcome back screen loaded. Max offline: ' + MAX_OFFLINE_HOURS + 'h.');
})();
