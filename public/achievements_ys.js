// ============================================================
// YOUNG SHELDON ACHIEVEMENT SYSTEM
// The Big Bang Theory: Pasadena Battle — Texas Timeline DLC
// ============================================================
(function() {
    'use strict';

    // ── 6 Texas map keys ──
    var TEXAS_MAPS = [
        'ys_cooper_home', 'ys_high_school', 'ys_texas_ranch',
        'ys_desert', 'ys_museum', 'ys_chaos_lab'
    ];

    // ── 10 YS character keys ──
    var YS_CHARACTERS = [
        'ys_young_sheldon', 'ys_missy', 'ys_george', 'ys_meemaw',
        'ys_sturgis', 'ys_billy', 'ys_georgie', 'ys_tam',
        'ys_pastor_jeff', 'ys_pastor_rob'
    ];

    // ── Ensure ysStats sub-object on state ──
    function _ensureYsStats() {
        if (!state.ysStats) {
            state.ysStats = {
                enemiesStunnedByYS: 0,
                lifestealDmgGeorge: 0,
                bonusGoldMeemaw: 0,
                enemiesPoisonedSturgis: 0,
                chickensSummonedBilly: 0,
                totalHealPastorJeff: 0,
                critLandsPastorRob: 0,
                burstKillsTam: 0,
                texasKills: 0,
                pokerWins: 0,
                footballTossYards: 0,
                texasGearCollected: 0,
                texasBossesDefeated: 0,
                dailyChallengesCompleted: 0
            };
        }
        // Patch in any missing keys (future-proof)
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

    // ── Helper: count how many YS chars are recruited (level >= 1) ──
    function _ysRecruitCount() {
        var count = 0;
        if (!state.roster) return 0;
        for (var i = 0; i < YS_CHARACTERS.length; i++) {
            if (state.roster[YS_CHARACTERS[i]] && state.roster[YS_CHARACTERS[i]].level >= 1) count++;
        }
        return count;
    }

    // ── Helper: count unlocked Texas maps ──
    function _texasMapsUnlocked() {
        var count = 0;
        var unlocked = state.unlockedLocations || [];
        for (var i = 0; i < TEXAS_MAPS.length; i++) {
            if (unlocked.indexOf(TEXAS_MAPS[i]) !== -1) count++;
        }
        return count;
    }

    // ── Helper: check if specific chars are all equipped ──
    function _allEquipped(keys) {
        if (!state.equipped) return false;
        for (var i = 0; i < keys.length; i++) {
            if (!state.equipped[keys[i]]) return false;
        }
        return true;
    }

    // ── Helper: get char level ──
    function _charLevel(key) {
        return (state.roster && state.roster[key] && state.roster[key].level) || 0;
    }

    // ── Helper: count Texas-era gear in inventory ──
    function _texasGearCount() {
        // Count equipment items with era 'young_sheldon' or origin containing 'texas'/'ys_'
        var count = 0;
        var inv = (state.equipment && state.equipment.inventory) || state.inventory || [];
        for (var i = 0; i < inv.length; i++) {
            var item = inv[i];
            if (item && (item.era === 'young_sheldon' || (item.origin && item.origin.indexOf('ys_') !== -1) ||
                (item.source && item.source.indexOf('texas') !== -1))) {
                count++;
            }
        }
        // Also count from ysStats tracking if it's higher
        return Math.max(count, state.ysStats ? (state.ysStats.texasGearCollected || 0) : 0);
    }

    // ══════════════════════════════════════════════════════════
    //  20 ACHIEVEMENT DEFINITIONS
    // ══════════════════════════════════════════════════════════
    window.ysAchievements = {

        // ─────── TIMELINE ACHIEVEMENTS (1–15) ───────

        timeline_traveler: {
            id: 'timeline_traveler',
            name: 'Timeline Traveler',
            desc: 'Complete the Wave 80 story event',
            icon: '🕰️',
            category: 'Timeline',
            reward: { money: 5000, bazingaPoints: 2 },
            condition: function() {
                return !!state.story_wave80_seen;
            }
        },

        texas_ranger: {
            id: 'texas_ranger',
            name: 'Texas Ranger',
            desc: 'Unlock all 6 Texas maps',
            icon: '🤠',
            category: 'Timeline',
            reward: { money: 10000, diamond: 15 },
            condition: function() {
                return _texasMapsUnlocked() >= 6;
            }
        },

        full_roster_ys: {
            id: 'full_roster_ys',
            name: 'Full Roster',
            desc: 'Recruit all 10 Young Sheldon characters',
            icon: '👨‍👩‍👧‍👦',
            category: 'Timeline',
            reward: { diamond: 25, bazingaPoints: 3 },
            condition: function() {
                return _ysRecruitCount() >= 10;
            }
        },

        mullet_power: {
            id: 'mullet_power',
            name: 'Mullet Power',
            desc: 'Get Georgie Cooper to level 50',
            icon: '💇',
            category: 'Timeline',
            reward: { money: 15000, diamond: 10 },
            condition: function() {
                return _charLevel('ys_georgie') >= 50;
            }
        },

        train_conductor: {
            id: 'train_conductor',
            name: 'Train Conductor',
            desc: 'Young Sheldon stuns 100 enemies with his train',
            icon: '🚂',
            category: 'Timeline',
            reward: { money: 8000, diamond: 5 },
            condition: function() {
                _ensureYsStats();
                return (state.ysStats.enemiesStunnedByYS || 0) >= 100;
            }
        },

        brisket_master: {
            id: 'brisket_master',
            name: 'Brisket Master',
            desc: 'George Cooper deals 1M lifesteal damage',
            icon: '🥩',
            category: 'Timeline',
            reward: { money: 20000, bazingaPoints: 2 },
            condition: function() {
                _ensureYsStats();
                return (state.ysStats.lifestealDmgGeorge || 0) >= 1000000;
            }
        },

        money_bags: {
            id: 'money_bags',
            name: 'Money Bags',
            desc: 'Meemaw generates 10M bonus gold',
            icon: '💰',
            category: 'Timeline',
            reward: { diamond: 20, bazingaPoints: 3 },
            condition: function() {
                _ensureYsStats();
                return (state.ysStats.bonusGoldMeemaw || 0) >= 10000000;
            }
        },

        chemical_warfare: {
            id: 'chemical_warfare',
            name: 'Chemical Warfare',
            desc: 'Dr. Sturgis poisons 500 enemies',
            icon: '🧪',
            category: 'Timeline',
            reward: { money: 12000, diamond: 10 },
            condition: function() {
                _ensureYsStats();
                return (state.ysStats.enemiesPoisonedSturgis || 0) >= 500;
            }
        },

        chicken_army: {
            id: 'chicken_army',
            name: 'Chicken Army',
            desc: 'Billy summons 200 chickens',
            icon: '🐔',
            category: 'Timeline',
            reward: { money: 10000, diamond: 5 },
            condition: function() {
                _ensureYsStats();
                return (state.ysStats.chickensSummonedBilly || 0) >= 200;
            }
        },

        holy_roller: {
            id: 'holy_roller',
            name: 'Holy Roller',
            desc: 'Pastor Jeff heals 500K total HP',
            icon: '✝️',
            category: 'Timeline',
            reward: { money: 15000, bazingaPoints: 2 },
            condition: function() {
                _ensureYsStats();
                return (state.ysStats.totalHealPastorJeff || 0) >= 500000;
            }
        },

        whip_it_good: {
            id: 'whip_it_good',
            name: 'Whip It Good',
            desc: 'Pastor Rob lands 1,000 critical hits',
            icon: '🔥',
            category: 'Timeline',
            reward: { money: 18000, diamond: 15 },
            condition: function() {
                _ensureYsStats();
                return (state.ysStats.critLandsPastorRob || 0) >= 1000;
            }
        },

        vietnam_veteran: {
            id: 'vietnam_veteran',
            name: 'Vietnam Veteran',
            desc: "Tam's burst kills 300 enemies",
            icon: '⭐',
            category: 'Timeline',
            reward: { diamond: 20, bazingaPoints: 2 },
            condition: function() {
                _ensureYsStats();
                return (state.ysStats.burstKillsTam || 0) >= 300;
            }
        },

        family_reunion: {
            id: 'family_reunion',
            name: 'Family Reunion',
            desc: 'Equip George, Georgie, Missy & Young Sheldon together',
            icon: '🏠',
            category: 'Timeline',
            reward: { money: 25000, bazingaPoints: 3 },
            condition: function() {
                return _allEquipped(['ys_george', 'ys_georgie', 'ys_missy', 'ys_young_sheldon']);
            }
        },

        church_squad: {
            id: 'church_squad',
            name: 'Church Squad',
            desc: 'Equip both Pastor Jeff and Pastor Rob together',
            icon: '⛪',
            category: 'Timeline',
            reward: { money: 10000, diamond: 10 },
            condition: function() {
                return _allEquipped(['ys_pastor_jeff', 'ys_pastor_rob']);
            }
        },

        science_bros: {
            id: 'science_bros',
            name: 'Science Bros',
            desc: 'Equip Young Sheldon and Dr. Sturgis together',
            icon: '🔬',
            category: 'Timeline',
            reward: { money: 10000, diamond: 10 },
            condition: function() {
                return _allEquipped(['ys_young_sheldon', 'ys_sturgis']);
            }
        },

        // ─────── GENERAL ACHIEVEMENTS (16–20) ───────

        wave_100_club: {
            id: 'wave_100_club',
            name: 'Wave 100 Club',
            desc: 'Reach wave 100',
            icon: '🏅',
            category: 'General',
            reward: { diamond: 30, bazingaPoints: 5 },
            condition: function() {
                return (state.wave || 1) >= 100 || (state.stats && (state.stats.highestWave || 0) >= 100);
            }
        },

        wave_150_elite: {
            id: 'wave_150_elite',
            name: 'Wave 150 Elite',
            desc: 'Reach wave 150',
            icon: '👑',
            category: 'General',
            reward: { diamond: 50, bazingaPoints: 10 },
            condition: function() {
                return (state.wave || 1) >= 150 || (state.stats && (state.stats.highestWave || 0) >= 150);
            }
        },

        billionaire: {
            id: 'billionaire',
            name: 'Billionaire',
            desc: 'Earn 1 billion total money',
            icon: '🤑',
            category: 'General',
            reward: { diamond: 100, bazingaPoints: 10 },
            condition: function() {
                return state.stats && (state.stats.moneyEarned || 0) >= 1000000000;
            }
        },

        gear_collector: {
            id: 'gear_collector',
            name: 'Gear Collector',
            desc: 'Collect 10 Texas-era gear items',
            icon: '🎒',
            category: 'General',
            reward: { money: 20000, diamond: 15 },
            condition: function() {
                return _texasGearCount() >= 10;
            }
        },

        poker_face: {
            id: 'poker_face',
            name: 'Poker Face',
            desc: 'Win 10 poker minigames',
            icon: '🃏',
            category: 'General',
            reward: { money: 25000, diamond: 20 },
            condition: function() {
                _ensureYsStats();
                return (state.ysStats.pokerWins || 0) >= 10;
            }
        }
    };

    // ── Category meta for optional tab rendering ──
    window.ysAchievementCategories = [
        { key: 'Timeline', icon: '🤠', color: '#f59e0b' },
        { key: 'General',  icon: '🏅', color: '#3b82f6' }
    ];

    // ══════════════════════════════════════════════════════════
    //  INIT — bootstrap ysAchievements into state
    // ══════════════════════════════════════════════════════════
    function initYSAchievements() {
        if (!state.achievements) state.achievements = {};
        _ensureYsStats();

        for (var id in window.ysAchievements) {
            if (!state.achievements[id]) {
                state.achievements[id] = { unlocked: false, claimedReward: false };
            }
        }
    }
    window.initYSAchievements = initYSAchievements;

    // ══════════════════════════════════════════════════════════
    //  STAT TRACKING HELPER
    // ══════════════════════════════════════════════════════════
    window.trackYsStat = function(statKey, amount) {
        _ensureYsStats();
        amount = amount || 1;
        state.ysStats[statKey] = (state.ysStats[statKey] || 0) + amount;
        // Check after every stat update
        checkYSAchievements();
    };

    // ══════════════════════════════════════════════════════════
    //  CHECK ALL YS ACHIEVEMENTS
    // ══════════════════════════════════════════════════════════
    function checkYSAchievements() {
        if (!state.achievements) initYSAchievements();
        _ensureYsStats();

        var newlyUnlocked = [];

        for (var id in window.ysAchievements) {
            var ach = window.ysAchievements[id];
            var achState = state.achievements[id];
            if (!achState) {
                state.achievements[id] = { unlocked: false, claimedReward: false };
                achState = state.achievements[id];
            }
            if (achState.unlocked) continue;

            try {
                if (ach.condition()) {
                    achState.unlocked = true;
                    newlyUnlocked.push(ach);
                }
            } catch (e) {
                // Condition threw — state probably not ready yet, skip
            }
        }

        // Show toast notifications for each new unlock
        for (var i = 0; i < newlyUnlocked.length; i++) {
            _showYsAchievementToast(newlyUnlocked[i]);
        }

        if (newlyUnlocked.length > 0) {
            if (typeof saveProgress === 'function') saveProgress();
        }
    }
    window.checkYSAchievements = checkYSAchievements;

    // ══════════════════════════════════════════════════════════
    //  CLAIM REWARD
    // ══════════════════════════════════════════════════════════
    window.claimYSAchievementReward = function(id) {
        if (!window.ysAchievements[id]) return;
        var achState = state.achievements[id];
        if (!achState || !achState.unlocked || achState.claimedReward) return;

        var reward = window.ysAchievements[id].reward;
        if (reward.money) {
            state.resources.money = (state.resources.money || 0) + reward.money;
        }
        if (reward.diamond) {
            state.resources.diamond = (state.resources.diamond || 0) + reward.diamond;
        }
        if (reward.bazingaPoints) {
            state.bazingaPoints = (state.bazingaPoints || 0) + reward.bazingaPoints;
        }

        achState.claimedReward = true;
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
    };

    // ══════════════════════════════════════════════════════════
    //  TOAST NOTIFICATION
    // ══════════════════════════════════════════════════════════
    function _showYsAchievementToast(ach) {
        // Suppress before game starts
        if (!window.gameStarted) return;

        // Use showGameAlert if available for consistency
        if (typeof showGameAlert === 'function') {
            showGameAlert(
                '🤠 YS Achievement Unlocked!',
                '<div style="text-align:center;">' +
                    '<div style="font-size:32px;margin-bottom:6px;">' + ach.icon + '</div>' +
                    '<div style="font-size:14px;font-weight:900;color:#fbbf24;">' + ach.name + '</div>' +
                    '<div style="font-size:10px;color:#94a3b8;margin-top:4px;">' + ach.desc + '</div>' +
                    '<div style="font-size:9px;color:#22c55e;margin-top:8px;">🎁 ' + _fmtReward(ach.reward) + '</div>' +
                '</div>'
            );
            return;
        }

        // Fallback: floating toast
        var existing = document.getElementById('ys-achievement-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.id = 'ys-achievement-toast';
        toast.style.cssText =
            'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:99999;' +
            'background:linear-gradient(135deg,#451a03,#78350f);border:2px solid #f59e0b;border-radius:12px;' +
            'padding:10px 20px;box-sizing:border-box;display:flex;align-items:center;gap:10px;' +
            'box-shadow:0 0 30px rgba(245,158,11,0.5);animation:ysAchSlideIn 0.4s ease-out;' +
            'min-width:200px;max-width:380px;';

        toast.innerHTML =
            '<div style="font-size:28px;flex-shrink:0;">' + ach.icon + '</div>' +
            '<div style="flex:1;">' +
                '<div style="font-size:8px;color:#f59e0b;font-weight:900;letter-spacing:2px;text-transform:uppercase;">🤠 YS Achievement Unlocked!</div>' +
                '<div style="font-size:12px;color:#f8fafc;font-weight:700;margin-top:2px;">' + ach.name + '</div>' +
                '<div style="font-size:8px;color:#94a3b8;margin-top:1px;">' + ach.desc + '</div>' +
            '</div>';

        // Inject animation keyframes
        if (!document.getElementById('ys-ach-toast-style')) {
            var style = document.createElement('style');
            style.id = 'ys-ach-toast-style';
            style.textContent =
                '@keyframes ysAchSlideIn { from { opacity:0; transform:translateX(-50%) translateY(-30px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }' +
                '@keyframes ysAchSlideOut { from { opacity:1; transform:translateX(-50%) translateY(0); } to { opacity:0; transform:translateX(-50%) translateY(-30px); } }';
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        setTimeout(function() {
            toast.style.animation = 'ysAchSlideOut 0.3s ease-in forwards';
            setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
        }, 3500);
    }

    // ══════════════════════════════════════════════════════════
    //  HELPERS
    // ══════════════════════════════════════════════════════════
    function _fmtReward(reward) {
        var parts = [];
        if (reward.money) parts.push('$' + reward.money.toLocaleString());
        if (reward.diamond) parts.push(reward.diamond + ' 💎');
        if (reward.bazingaPoints) parts.push(reward.bazingaPoints + ' ⚡');
        return parts.join(' + ');
    }

    // ── Notification badge count (unclaimed YS achievements) ──
    window.getYSAchievementNotificationCount = function() {
        if (!state.achievements) return 0;
        var count = 0;
        for (var id in window.ysAchievements) {
            var a = state.achievements[id];
            if (a && a.unlocked && !a.claimedReward) count++;
        }
        return count;
    };

    // ── Periodic check — call from game loop ──
    window.ysAchievementTick = function() {
        checkYSAchievements();
    };

    // ── Auto-init when script loads ──
    if (typeof state !== 'undefined') {
        initYSAchievements();
    }

})();
