// ============================================================
// NOTIFICATION BADGES — Red Dots & Counts on UI Buttons
// Runs on a 2-second interval to check all systems for claimable/pending items
// ============================================================

(function() {
    'use strict';

    // ---- INJECT BADGE CSS ----
    var style = document.createElement('style');
    style.textContent = [
        '.side-rail-badge {',
        '  position: absolute; top: -3px; right: -3px;',
        '  min-width: 16px; height: 16px;',
        '  background: #ef4444; color: #fff;',
        '  font-size: 8px; font-weight: 900;',
        '  border-radius: 9999px;',
        '  display: flex; align-items: center; justify-content: center;',
        '  padding: 0 3px;',
        '  border: 2px solid #1a100a;',
        '  box-shadow: 0 0 6px rgba(239,68,68,0.6);',
        '  animation: badge-pulse 2s ease-in-out infinite;',
        '  pointer-events: none;',
        '  z-index: 100;',
        '}',
        '.bottom-tab-badge {',
        '  position: absolute; top: 2px; right: 2px;',
        '  min-width: 14px; height: 14px;',
        '  background: #ef4444; color: #fff;',
        '  font-size: 7px; font-weight: 900;',
        '  border-radius: 9999px;',
        '  display: flex; align-items: center; justify-content: center;',
        '  padding: 0 2px;',
        '  border: 2px solid #1a100a;',
        '  box-shadow: 0 0 6px rgba(239,68,68,0.6);',
        '  animation: badge-pulse 2s ease-in-out infinite;',
        '  pointer-events: none;',
        '  z-index: 100;',
        '}',
        '@keyframes badge-pulse {',
        '  0%, 100% { transform: scale(1); }',
        '  50% { transform: scale(1.15); }',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    // ---- BADGE STATE ----
    var badgeState = {
        dailyRewards: false,
        quests: 0,
        achievements: 0,
        dailyMissions: 0,
        events: false,
        clinic: 0,
        guild: false,
        campaign: 0
    };

    // ---- CHECK FUNCTIONS ----

    function checkDailyRewards() {
        if (typeof canClaimDaily === 'function') {
            return canClaimDaily();
        }
        return false;
    }

    function checkQuests() {
        // Count quests with fulfilled objectives that haven't been claimed
        var count = 0;
        if (!state.quests) return 0;

        var allQuests = (state.quests.daily || []).concat(state.quests.weekly || []);
        allQuests.forEach(function(q) {
            if (q && q.progress >= q.target && !q.claimed) count++;
        });
        return count;
    }

    function checkAchievements() {
        // Count unlocked but unclaimed achievements
        var count = 0;
        if (typeof ACHIEVEMENTS === 'undefined' || !state.achievements) return 0;

        for (var key in ACHIEVEMENTS) {
            var ach = ACHIEVEMENTS[key];
            if (!ach || !ach.check) continue;
            var isUnlocked = state.achievements[key];
            if (isUnlocked) continue; // already claimed

            // Check if achievement condition is met
            try {
                if (ach.check()) count++;
            } catch(e) {}
        }
        return count;
    }

    function checkDailyMissions() {
        var count = 0;
        if (typeof getDailyMissions !== 'function') return 0;
        try {
            var missions = getDailyMissions();
            if (!missions) return 0;
            missions.forEach(function(m) {
                if (m && m.progress >= m.target && !m.claimed) count++;
            });
        } catch(e) {}
        return count;
    }

    function checkEvents() {
        if (typeof isEventActive !== 'function') return false;
        try {
            // Show badge if any event is active
            return state.events && state.events.active ? true : false;
        } catch(e) { return false; }
    }

    function checkClinic() {
        // Count characters recovered from hospital (ready to discharge)
        var count = 0;
        if (!state.roster) return 0;
        var now = Date.now();
        for (var key in state.roster) {
            var c = state.roster[key];
            if (c && c.status === 'hospitalized' && c.hospitalEndTime && c.hospitalEndTime <= now) {
                count++;
            }
        }
        return count;
    }

    function checkGuild() {
        // Show badge if guild war results are pending
        if (!state.guildWar) return false;
        return state.guildWar.phase === 'results';
    }

    function checkCampaign() {
        // Count chapters that are complete but unclaimed
        var count = 0;
        if (typeof CAMPAIGN_CHAPTERS === 'undefined' || !state.campaign) return 0;
        for (var i = 0; i < CAMPAIGN_CHAPTERS.length; i++) {
            var ch = CAMPAIGN_CHAPTERS[i];
            if (state.campaign.completed && state.campaign.completed.indexOf(ch.id) !== -1) continue;
            if ((state.wave || 1) < ch.wave) continue;
            // Check if all objectives are met
            var allDone = true;
            for (var j = 0; j < ch.objectives.length; j++) {
                var obj = ch.objectives[j];
                var cur = 0;
                switch(obj.type) {
                    case 'wave': cur = state.wave || 1; break;
                    case 'kills': cur = (state.stats && state.stats.totalKills) || 0; break;
                    case 'boss': cur = (state.stats && state.stats.bossKills) || 0; break;
                    case 'money': cur = (state.stats && state.stats.moneyEarned) || 0; break;
                    case 'equip': cur = state.inventory ? state.inventory.length : 0; break;
                    case 'pvp': cur = (state.stats && state.stats.pvpWins) || 0; break;
                    case 'recruit': cur = state.team ? state.team.length : 0; break;
                    case 'prestige': cur = (state.stats && state.stats.prestiges) || state.prestigeCount || 0; break;
                }
                if (cur < obj.target) { allDone = false; break; }
            }
            if (allDone) count++;
        }
        return count;
    }

    // ---- BADGE RENDERERS ----

    function setBadge(elementId, value) {
        var el = document.getElementById(elementId);
        if (!el) return;

        if (value === false || value === 0 || value === null) {
            el.classList.add('hidden');
            el.textContent = '';
        } else {
            el.classList.remove('hidden');
            el.textContent = (typeof value === 'number' && value > 0) ? String(value) : '!';
        }
    }

    // Ensure bottom tab badges exist
    function ensureBottomBadge(tabName, id) {
        if (document.getElementById(id)) return;
        var btn = document.querySelector('.bottom-tab[data-tab="' + tabName + '"]');
        if (!btn) return;
        btn.style.position = 'relative';
        var badge = document.createElement('span');
        badge.id = id;
        badge.className = 'bottom-tab-badge hidden';
        btn.appendChild(badge);
    }

    // ---- MAIN UPDATE LOOP ----
    function updateAllBadges() {
        if (!window.gameStarted) return; // Suppress until title screen dismissed
        // Side rail badges (still directly visible)
        setBadge('daily-badge', checkDailyRewards());
        setBadge('quest-badge', checkQuests());
        setBadge('campaign-badge', checkCampaign());

        // Badges for items inside the "More" menu
        var achCount = checkAchievements();
        var missionCount = checkDailyMissions();
        setBadge('achievement-badge-more', achCount);
        setBadge('daily-mission-badge-more', missionCount);

        // Combined "More" button badge — lights up if anything inside needs attention
        var moreHasNotif = achCount > 0 || missionCount > 0;
        setBadge('more-combined-badge', moreHasNotif ? '!' : false);

        // Ensure bottom nav badges exist
        ensureBottomBadge('clinic', 'clinic-badge');
        ensureBottomBadge('guild', 'guild-badge');

        // Bottom nav badges
        setBadge('clinic-badge', checkClinic());
        setBadge('guild-badge', checkGuild());
    }

    // ---- INIT ----
    function initBadges() {
        // Run immediately
        updateAllBadges();

        // Then every 2 seconds
        setInterval(updateAllBadges, 2000);
    }

    // Start after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initBadges, 2000);
        });
    } else {
        setTimeout(initBadges, 2000);
    }

    // Export for manual calls
    window.updateAllBadges = updateAllBadges;
})();
