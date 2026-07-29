// ============================================================
// YOUNG SHELDON DAILY / WEEKLY CHALLENGE SYSTEM
// The Big Bang Theory: Pasadena Battle — Texas Timeline DLC
// ============================================================
(function() {
    'use strict';

    // ── State key where challenges live ──
    var YS_CHALLENGE_KEY = 'ysChallenges';

    // ══════════════════════════════════════════════════════════
    //  DAILY CHALLENGE POOL (pick 3 per day)
    // ══════════════════════════════════════════════════════════
    window.ysDailyChallengePool = [
        {
            id: 'ys_d_kill_50',
            name: 'Texas Exterminator',
            desc: 'Defeat 50 enemies in Texas maps',
            icon: '💀',
            type: 'texasKills',
            target: 50,
            reward: { money: 3000 }
        },
        {
            id: 'ys_d_earn_100k',
            name: 'Money Maker',
            desc: 'Earn $100K money',
            icon: '💵',
            type: 'earn_money',
            target: 100000,
            reward: { money: 5000, bazingaPoints: 1 }
        },
        {
            id: 'ys_d_poker_win',
            name: 'Card Sharp',
            desc: 'Win a poker game',
            icon: '🃏',
            type: 'pokerWins',
            target: 1,
            reward: { money: 4000, diamond: 3 }
        },
        {
            id: 'ys_d_food_5',
            name: 'Southern Cookin\'',
            desc: 'Use 5 food items',
            icon: '🍗',
            type: 'use_food',
            target: 5,
            reward: { money: 2000 }
        },
        {
            id: 'ys_d_texas_boss',
            name: 'Texas Showdown',
            desc: 'Defeat a Texas boss',
            icon: '🤠',
            type: 'texasBossesDefeated',
            target: 1,
            reward: { money: 5000, diamond: 5 }
        },
        {
            id: 'ys_d_football_50',
            name: 'Hail Mary',
            desc: 'Score a football toss over 50 yards',
            icon: '🏈',
            type: 'footballTossYards',
            target: 50,
            reward: { money: 3000, bazingaPoints: 1 }
        },
        {
            id: 'ys_d_heal_10k',
            name: 'Divine Intervention',
            desc: 'Heal 10K HP with Pastor Jeff',
            icon: '✝️',
            type: 'totalHealPastorJeff',
            target: 10000,
            reward: { money: 2500 }
        },
        {
            id: 'ys_d_chickens_10',
            name: 'Fowl Play',
            desc: 'Summon 10 chickens with Billy',
            icon: '🐔',
            type: 'chickensSummonedBilly',
            target: 10,
            reward: { money: 2000, diamond: 2 }
        }
    ];

    // ══════════════════════════════════════════════════════════
    //  WEEKLY CHALLENGE POOL (pick 2 per week)
    // ══════════════════════════════════════════════════════════
    window.ysWeeklyChallengePool = [
        {
            id: 'ys_w_kill_500',
            name: 'Texas Massacre',
            desc: 'Defeat 500 enemies in Texas maps',
            icon: '☠️',
            type: 'texasKills',
            target: 500,
            reward: { money: 20000, diamond: 10 }
        },
        {
            id: 'ys_w_wave_milestone',
            name: 'Wave Breaker',
            desc: 'Advance 10 waves',
            icon: '🌊',
            type: 'reach_wave',
            target: 10,
            reward: { diamond: 15, bazingaPoints: 2 }
        },
        {
            id: 'ys_w_earn_1m',
            name: 'Texas Tycoon',
            desc: 'Earn $1M money',
            icon: '🏦',
            type: 'earn_money',
            target: 1000000,
            reward: { diamond: 20, bazingaPoints: 3 }
        },
        {
            id: 'ys_w_daily_streak',
            name: 'Dedicated Texan',
            desc: 'Complete all daily challenges for 3 days',
            icon: '📅',
            type: 'dailyChallengesCompleted',
            target: 9, // 3 dailies × 3 days
            reward: { diamond: 25, bazingaPoints: 5 }
        }
    ];

    // ══════════════════════════════════════════════════════════
    //  ENSURE STATE
    // ══════════════════════════════════════════════════════════
    function _ensureChallengeState() {
        if (!state[YS_CHALLENGE_KEY]) {
            state[YS_CHALLENGE_KEY] = {
                daily: [],
                weekly: [],
                lastDailyReset: null,
                lastWeeklyReset: null,
                dailyProgress: {},   // per-day tracking for session-scoped stats
                weeklyProgress: {}   // per-week tracking
            };
        }
        var s = state[YS_CHALLENGE_KEY];
        if (!s.daily) s.daily = [];
        if (!s.weekly) s.weekly = [];
        if (!s.dailyProgress) s.dailyProgress = {};
        if (!s.weeklyProgress) s.weeklyProgress = {};
    }

    // ── Ensure ysStats sub-object (shared with achievements_ys.js) ──
    function _ensureYsStats() {
        if (!state.ysStats) {
            state.ysStats = {};
        }
        var defaults = {
            enemiesStunnedByYS: 0, lifestealDmgGeorge: 0,
            bonusGoldMeemaw: 0, enemiesPoisonedSturgis: 0,
            chickensSummonedBilly: 0, totalHealPastorJeff: 0,
            critLandsPastorRob: 0, burstKillsTam: 0,
            texasKills: 0, pokerWins: 0, footballTossYards: 0,
            texasGearCollected: 0, texasBossesDefeated: 0,
            dailyChallengesCompleted: 0
        };
        for (var k in defaults) {
            if (state.ysStats[k] === undefined) state.ysStats[k] = defaults[k];
        }
    }

    // ══════════════════════════════════════════════════════════
    //  DAILY / WEEKLY RESET LOGIC
    // ══════════════════════════════════════════════════════════
    function _needsDailyReset(now) {
        var s = state[YS_CHALLENGE_KEY];
        if (!s.lastDailyReset) return true;
        var last = new Date(s.lastDailyReset);
        var todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return last < todayMidnight;
    }

    function _needsWeeklyReset(now) {
        var s = state[YS_CHALLENGE_KEY];
        if (!s.lastWeeklyReset) return true;
        var last = new Date(s.lastWeeklyReset);
        var dayOfWeek = now.getDay();
        var daysSinceMonday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
        var mondayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysSinceMonday);
        return last < mondayMidnight;
    }

    // ══════════════════════════════════════════════════════════
    //  GENERATE / RESET CHALLENGES
    // ══════════════════════════════════════════════════════════
    function _pickRandom(pool, count) {
        var shuffled = pool.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = tmp;
        }
        var result = [];
        for (var k = 0; k < Math.min(count, shuffled.length); k++) {
            var def = shuffled[k];
            result.push({
                id: def.id,
                name: def.name,
                desc: def.desc,
                icon: def.icon,
                type: def.type,
                target: def.target,
                current: 0,
                reward: JSON.parse(JSON.stringify(def.reward)),
                completed: false,
                claimed: false
            });
        }
        return result;
    }

    function generateDailyChallenges() {
        _ensureChallengeState();
        var s = state[YS_CHALLENGE_KEY];
        s.daily = _pickRandom(window.ysDailyChallengePool, 3);
        s.dailyProgress = {};
        s.lastDailyReset = new Date().toISOString();
        if (typeof saveProgress === 'function') saveProgress();
    }
    window.generateDailyChallenges = generateDailyChallenges;

    function generateWeeklyChallenges() {
        _ensureChallengeState();
        var s = state[YS_CHALLENGE_KEY];
        s.weekly = _pickRandom(window.ysWeeklyChallengePool, 2);
        s.weeklyProgress = {};
        s.lastWeeklyReset = new Date().toISOString();
        if (typeof saveProgress === 'function') saveProgress();
    }
    window.generateWeeklyChallenges = generateWeeklyChallenges;

    // ══════════════════════════════════════════════════════════
    //  INIT — auto-generate on first load / date rollover
    // ══════════════════════════════════════════════════════════
    function initYSChallenges() {
        _ensureChallengeState();
        _ensureYsStats();

        var now = new Date();
        if (_needsDailyReset(now)) {
            generateDailyChallenges();
        }
        if (_needsWeeklyReset(now)) {
            generateWeeklyChallenges();
        }
    }
    window.initYSChallenges = initYSChallenges;

    // ══════════════════════════════════════════════════════════
    //  PROGRESS TRACKING
    // ══════════════════════════════════════════════════════════
    function updateYSChallengeProgress(challengeType, amount) {
        amount = amount || 1;
        _ensureChallengeState();

        var changed = false;
        var lists = ['daily', 'weekly'];
        var s = state[YS_CHALLENGE_KEY];

        for (var li = 0; li < lists.length; li++) {
            var list = s[lists[li]];
            if (!list) continue;
            for (var qi = 0; qi < list.length; qi++) {
                var challenge = list[qi];
                if (challenge.type === challengeType && !challenge.completed) {
                    challenge.current = Math.min(challenge.target, challenge.current + amount);
                    if (challenge.current >= challenge.target) {
                        challenge.completed = true;
                        _onChallengeCompleted(challenge, lists[li]);
                    }
                    changed = true;
                }
            }
        }

        if (changed) {
            if (typeof saveProgress === 'function') saveProgress();
        }
    }
    window.updateYSChallengeProgress = updateYSChallengeProgress;

    // Also hook into the main quest system for shared types
    window.checkChallengeProgress = function() {
        _ensureChallengeState();
        _ensureYsStats();

        var s = state[YS_CHALLENGE_KEY];
        var lists = ['daily', 'weekly'];

        for (var li = 0; li < lists.length; li++) {
            var list = s[lists[li]];
            if (!list) continue;
            for (var qi = 0; qi < list.length; qi++) {
                var ch = list[qi];
                if (ch.completed) continue;

                // Check ysStats for certain types
                var ysVal = state.ysStats ? (state.ysStats[ch.type] || 0) : 0;

                // For session-scoped challenges, use progress tracker
                var progressKey = lists[li] + 'Progress';
                var sessionVal = (s[progressKey] && s[progressKey][ch.type]) || 0;

                // Use whichever is greater
                var currentVal = Math.max(ch.current, sessionVal);

                // For types that track via main state.stats
                if (ch.type === 'earn_money' && state.stats) {
                    // Compare against session start
                    var earned = state.stats.moneyEarned || 0;
                    var baseline = (s[progressKey] && s[progressKey]._moneyBaseline) || 0;
                    if (baseline === 0) {
                        if (!s[progressKey]) s[progressKey] = {};
                        s[progressKey]._moneyBaseline = earned;
                    }
                    currentVal = Math.max(currentVal, earned - baseline);
                }

                if (ch.type === 'use_food' && state.stats) {
                    var foodUsed = state.stats.foodUsed || 0;
                    var foodBaseline = (s[progressKey] && s[progressKey]._foodBaseline) || 0;
                    if (foodBaseline === 0) {
                        if (!s[progressKey]) s[progressKey] = {};
                        s[progressKey]._foodBaseline = foodUsed;
                    }
                    currentVal = Math.max(currentVal, foodUsed - foodBaseline);
                }

                if (ch.type === 'reach_wave') {
                    var wave = state.wave || 1;
                    var waveBaseline = (s[progressKey] && s[progressKey]._waveBaseline) || 0;
                    if (waveBaseline === 0) {
                        if (!s[progressKey]) s[progressKey] = {};
                        s[progressKey]._waveBaseline = wave;
                    }
                    currentVal = Math.max(currentVal, wave - waveBaseline);
                }

                // Check ysStats-tracked types
                if (ysVal > currentVal) currentVal = ysVal;

                ch.current = Math.min(ch.target, currentVal);
                if (ch.current >= ch.target && !ch.completed) {
                    ch.completed = true;
                    _onChallengeCompleted(ch, lists[li]);
                }
            }
        }

        if (typeof saveProgress === 'function') saveProgress();
    };

    // ══════════════════════════════════════════════════════════
    //  CHALLENGE COMPLETION CALLBACK
    // ══════════════════════════════════════════════════════════
    function _onChallengeCompleted(challenge, listType) {
        // Track daily completion in ysStats for the "Dedicated Texan" weekly
        if (listType === 'daily') {
            _ensureYsStats();
            state.ysStats.dailyChallengesCompleted = (state.ysStats.dailyChallengesCompleted || 0) + 1;
            // Also update any weekly challenge tracking this
            updateYSChallengeProgress('dailyChallengesCompleted', 1);
        }

        // Show toast notification
        if (window.gameStarted) {
            if (typeof showGameAlert === 'function') {
                var typeLabel = listType === 'daily' ? '☀️ Daily' : '📅 Weekly';
                showGameAlert(
                    typeLabel + ' Challenge Complete!',
                    '<div style="text-align:center;">' +
                        '<div style="font-size:28px;margin-bottom:4px;">' + challenge.icon + '</div>' +
                        '<div style="font-size:12px;font-weight:700;color:#f8fafc;">' + challenge.name + '</div>' +
                        '<div style="font-size:9px;color:#94a3b8;margin-top:2px;">' + challenge.desc + '</div>' +
                        '<div style="font-size:9px;color:#22c55e;margin-top:6px;">🎁 ' + _fmtReward(challenge.reward) + '</div>' +
                    '</div>'
                );
            }
        }
    }

    // ══════════════════════════════════════════════════════════
    //  CLAIM REWARD
    // ══════════════════════════════════════════════════════════
    function claimYSChallengeReward(listType, index) {
        _ensureChallengeState();
        var s = state[YS_CHALLENGE_KEY];
        var list = s[listType];
        if (!list || !list[index]) return;

        var challenge = list[index];
        if (!challenge.completed || challenge.claimed) return;

        var reward = challenge.reward;
        if (reward.money) {
            state.resources.money = (state.resources.money || 0) + reward.money;
        }
        if (reward.diamond) {
            state.resources.diamond = (state.resources.diamond || 0) + reward.diamond;
        }
        if (reward.bazingaPoints) {
            state.bazingaPoints = (state.bazingaPoints || 0) + reward.bazingaPoints;
        }
        if (reward.food) {
            if (!state.food) state.food = {};
            for (var fk in reward.food) {
                state.food[fk] = (state.food[fk] || 0) + reward.food[fk];
            }
        }
        if (reward.gearDropToken) {
            _ensureYsStats();
            state.ysStats.gearDropTokens = (state.ysStats.gearDropTokens || 0) + reward.gearDropToken;
        }

        challenge.claimed = true;
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
    }
    window.claimYSChallengeReward = claimYSChallengeReward;

    // ══════════════════════════════════════════════════════════
    //  CLAIM ALL COMPLETED CHALLENGES
    // ══════════════════════════════════════════════════════════
    function claimAllYSChallenges() {
        _ensureChallengeState();
        var s = state[YS_CHALLENGE_KEY];
        var totalMoney = 0, totalDiamond = 0, totalBazinga = 0, claimedCount = 0;
        var lists = ['daily', 'weekly'];

        for (var li = 0; li < lists.length; li++) {
            var list = s[lists[li]];
            if (!list) continue;
            for (var qi = 0; qi < list.length; qi++) {
                var ch = list[qi];
                if (ch.completed && !ch.claimed) {
                    var reward = ch.reward;
                    if (reward.money) { state.resources.money = (state.resources.money || 0) + reward.money; totalMoney += reward.money; }
                    if (reward.diamond) { state.resources.diamond = (state.resources.diamond || 0) + reward.diamond; totalDiamond += reward.diamond; }
                    if (reward.bazingaPoints) { state.bazingaPoints = (state.bazingaPoints || 0) + reward.bazingaPoints; totalBazinga += reward.bazingaPoints; }
                    if (reward.food) {
                        if (!state.food) state.food = {};
                        for (var fk in reward.food) {
                            state.food[fk] = (state.food[fk] || 0) + reward.food[fk];
                        }
                    }
                    if (reward.gearDropToken) {
                        _ensureYsStats();
                        state.ysStats.gearDropTokens = (state.ysStats.gearDropTokens || 0) + reward.gearDropToken;
                    }
                    ch.claimed = true;
                    claimedCount++;
                }
            }
        }

        if (claimedCount === 0) return;
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();

        // Build summary
        var summary = 'Claimed ' + claimedCount + ' YS challenge reward' + (claimedCount > 1 ? 's' : '') + '!';
        var parts = [];
        if (totalMoney > 0) parts.push('+$' + totalMoney.toLocaleString());
        if (totalDiamond > 0) parts.push('+' + totalDiamond + ' \uD83D\uDC8E');
        if (totalBazinga > 0) parts.push('+' + totalBazinga + ' \u26A1');
        if (parts.length > 0) summary += ' ' + parts.join(', ');
        if (typeof showGameAlert === 'function') showGameAlert('YS Challenge Rewards', summary);
    }
    window.claimAllYSChallenges = claimAllYSChallenges;

    // ══════════════════════════════════════════════════════════
    //  NOTIFICATION COUNT (for badges)
    // ══════════════════════════════════════════════════════════
    window.getYSChallengeNotificationCount = function() {
        _ensureChallengeState();
        var count = 0;
        var s = state[YS_CHALLENGE_KEY];
        var lists = ['daily', 'weekly'];
        for (var li = 0; li < lists.length; li++) {
            var list = s[lists[li]];
            if (!list) continue;
            for (var qi = 0; qi < list.length; qi++) {
                if (list[qi].completed && !list[qi].claimed) count++;
            }
        }
        return count;
    };

    // ══════════════════════════════════════════════════════════
    //  TIME UNTIL RESET HELPERS
    // ══════════════════════════════════════════════════════════
    window.getYSDailyResetTime = function() {
        var now = new Date();
        var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        var diff = tomorrow - now;
        var hours = Math.floor(diff / 3600000);
        var mins = Math.floor((diff % 3600000) / 60000);
        return hours + 'h ' + mins + 'm';
    };

    window.getYSWeeklyResetTime = function() {
        var now = new Date();
        var dayOfWeek = now.getDay();
        var daysUntilMonday = (dayOfWeek === 0) ? 1 : (8 - dayOfWeek);
        var nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMonday);
        var diff = nextMonday - now;
        var days = Math.floor(diff / 86400000);
        var hours = Math.floor((diff % 86400000) / 3600000);
        return days + 'd ' + hours + 'h';
    };

    // ══════════════════════════════════════════════════════════
    //  GETTER for current challenges (for UI rendering)
    // ══════════════════════════════════════════════════════════
    window.getYSChallenges = function() {
        _ensureChallengeState();
        return state[YS_CHALLENGE_KEY];
    };

    // ══════════════════════════════════════════════════════════
    //  TICK — call from game loop for periodic checks
    // ══════════════════════════════════════════════════════════
    window.ysChallengeTick = function() {
        // Re-init if date rolled over
        initYSChallenges();
        // Recheck progress
        if (typeof window.checkChallengeProgress === 'function') {
            window.checkChallengeProgress();
        }
    };

    // ══════════════════════════════════════════════════════════
    //  REWARD FORMAT HELPER
    // ══════════════════════════════════════════════════════════
    function _fmtReward(reward) {
        var parts = [];
        if (reward.money) parts.push('$' + reward.money.toLocaleString());
        if (reward.diamond) parts.push(reward.diamond + ' 💎');
        if (reward.bazingaPoints) parts.push(reward.bazingaPoints + ' ⚡');
        if (reward.food) parts.push('🍗 Food');
        if (reward.gearDropToken) parts.push('🎫 ' + reward.gearDropToken + ' Gear Token' + (reward.gearDropToken > 1 ? 's' : ''));
        return parts.join(' + ');
    }

    // ── Auto-init when script loads ──
    if (typeof state !== 'undefined') {
        initYSChallenges();
    }

})();
