// ============================================================
// QUEST / MISSION SYSTEM — The Big Bang Theory: Pasadena Battle
// ============================================================

// --- DAILY QUEST POOL ---
var DAILY_QUEST_POOL = [
    {
        id: 'kill_minions', variants: [
            { desc: 'Kill 20 minions', target: 20, reward: { money: 300 } },
            { desc: 'Kill 30 minions', target: 30, reward: { money: 500 } },
            { desc: 'Kill 50 minions', target: 50, reward: { money: 800 } }
        ]
    },
    {
        id: 'win_pvp', variants: [
            { desc: 'Win a PVP battle', target: 1, reward: { money: 500, resources: { scrap: 5 } } }
        ]
    },
    {
        id: 'use_food', variants: [
            { desc: 'Use 2 food items', target: 2, reward: { money: 200 } },
            { desc: 'Use 3 food items', target: 3, reward: { money: 200 } }
        ]
    },
    {
        id: 'level_char', variants: [
            { desc: 'Level up a character', target: 1, reward: { money: 400 } }
        ]
    },
    {
        id: 'earn_money', variants: [
            { desc: 'Earn $500', target: 500, reward: { resources: { stone: 5, iron: 5 } } },
            { desc: 'Earn $1,000', target: 1000, reward: { resources: { stone: 5, iron: 5 } } },
            { desc: 'Earn $2,000', target: 2000, reward: { resources: { stone: 5, iron: 5 } } }
        ]
    },
    {
        id: 'defeat_boss', variants: [
            { desc: 'Defeat a boss', target: 1, reward: { money: 600, resources: { gold: 3 } } }
        ]
    },
    {
        id: 'deploy_robot', variants: [
            { desc: 'Deploy a robot in battle', target: 1, reward: { money: 300 } }
        ]
    }
];

// --- WEEKLY QUEST POOL ---
var WEEKLY_QUEST_POOL = [
    {
        id: 'reach_wave', variants: [
            { desc: 'Advance 3 waves', target: 3, reward: { diamond: 3 } },
            { desc: 'Advance 5 waves', target: 5, reward: { diamond: 5 } }
        ]
    },
    {
        id: 'craft_robot', variants: [
            { desc: 'Craft a robot', target: 1, reward: { diamond: 5 } }
        ]
    },
    {
        id: 'win_pvp_5', variants: [
            { desc: 'Win 5 PVP battles', target: 5, reward: { diamond: 5, resources: { gold: 10 } } }
        ]
    },
    {
        id: 'kill_bosses_3', variants: [
            { desc: 'Defeat 3 bosses', target: 3, reward: { diamond: 10 } }
        ]
    },
    {
        id: 'collect_resources', variants: [
            { desc: 'Collect 50 total resources', target: 50, reward: { diamond: 3 } },
            { desc: 'Collect 100 total resources', target: 100, reward: { diamond: 5 } }
        ]
    }
];

var _questActiveTab = 'daily';

// --- INITIALIZATION ---
function initQuests() {
    if (!state.quests) {
        state.quests = {
            daily: [],
            weekly: [],
            lastDailyReset: null,
            lastWeeklyReset: null
        };
    }

    var now = new Date();

    // Check daily reset — midnight local time
    if (_needsDailyReset(now)) {
        resetDailyQuests();
    }

    // Check weekly reset — Monday midnight local time
    if (_needsWeeklyReset(now)) {
        resetWeeklyQuests();
    }
}

function _needsDailyReset(now) {
    if (!state.quests.lastDailyReset) return true;
    var last = new Date(state.quests.lastDailyReset);
    // Reset if it's a different day
    var todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return last < todayMidnight;
}

function _needsWeeklyReset(now) {
    if (!state.quests.lastWeeklyReset) return true;
    var last = new Date(state.quests.lastWeeklyReset);
    // Find most recent Monday midnight
    var dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ...
    var daysSinceMonday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
    var mondayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysSinceMonday);
    return last < mondayMidnight;
}

// --- RESET ---
function resetDailyQuests() {
    var picked = _pickRandomQuests(DAILY_QUEST_POOL, 3);
    state.quests.daily = picked;
    state.quests.lastDailyReset = new Date().toISOString();
    saveProgress();
}

function resetWeeklyQuests() {
    var picked = _pickRandomQuests(WEEKLY_QUEST_POOL, 3);
    state.quests.weekly = picked;
    state.quests.lastWeeklyReset = new Date().toISOString();
    saveProgress();
}

function _pickRandomQuests(pool, count) {
    // Shuffle pool
    var shuffled = pool.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = tmp;
    }

    var result = [];
    for (var k = 0; k < Math.min(count, shuffled.length); k++) {
        var questDef = shuffled[k];
        var variant = questDef.variants[Math.floor(Math.random() * questDef.variants.length)];
        result.push({
            id: questDef.id,
            type: questDef.id,
            desc: variant.desc,
            target: variant.target,
            current: 0,
            reward: JSON.parse(JSON.stringify(variant.reward)),
            completed: false,
            claimed: false
        });
    }
    return result;
}

// --- PROGRESS TRACKING ---
function updateQuestProgress(questType, amount) {
    amount = amount || 1;
    if (!state.quests) return;

    var changed = false;
    var lists = ['daily', 'weekly'];
    for (var li = 0; li < lists.length; li++) {
        var list = state.quests[lists[li]];
        if (!list) continue;
        for (var qi = 0; qi < list.length; qi++) {
            var quest = list[qi];
            if (quest.type === questType && !quest.completed) {
                quest.current = Math.min(quest.target, quest.current + amount);
                if (quest.current >= quest.target) {
                    quest.completed = true;
                }
                changed = true;
            }
        }
    }

    if (changed) {
        saveProgress();
        // Re-render if modal open
        if (document.getElementById('quests-modal')) {
            renderQuestsModal();
        }
    }
}

// --- CLAIM REWARD ---
function claimQuestReward(questType, questIndex) {
    if (!state.quests || !state.quests[questType]) return;
    var quest = state.quests[questType][questIndex];
    if (!quest || !quest.completed || quest.claimed) return;

    var reward = quest.reward;

    if (reward.money) {
        state.resources.money = (state.resources.money || 0) + reward.money;
    }
    if (reward.diamond) {
        state.resources.diamond = (state.resources.diamond || 0) + reward.diamond;
    }
    if (reward.bazingaPoints) {
        state.bazingaPoints = (state.bazingaPoints || 0) + reward.bazingaPoints;
    }
    if (reward.resources) {
        for (var rKey in reward.resources) {
            state.resources[rKey] = (state.resources[rKey] || 0) + reward.resources[rKey];
        }
    }

    quest.claimed = true;
    saveProgress();
    if (typeof syncUI === 'function') syncUI();

    // Re-render
    if (document.getElementById('quests-modal')) {
        renderQuestsModal();
    }
}

// --- CLAIM ALL QUESTS ---
function claimAllQuests() {
    if (!state.quests) return;
    var totalMoney = 0, totalDiamond = 0, totalBazinga = 0, claimedCount = 0;
    var resExtras = {};
    var lists = ['daily', 'weekly'];
    for (var li = 0; li < lists.length; li++) {
        var list = state.quests[lists[li]];
        if (!list) continue;
        for (var qi = 0; qi < list.length; qi++) {
            var quest = list[qi];
            if (quest.completed && !quest.claimed) {
                var reward = quest.reward;
                if (reward.money) { state.resources.money = (state.resources.money || 0) + reward.money; totalMoney += reward.money; }
                if (reward.diamond) { state.resources.diamond = (state.resources.diamond || 0) + reward.diamond; totalDiamond += reward.diamond; }
                if (reward.bazingaPoints) { state.bazingaPoints = (state.bazingaPoints || 0) + reward.bazingaPoints; totalBazinga += reward.bazingaPoints; }
                if (reward.resources) {
                    for (var rKey in reward.resources) {
                        state.resources[rKey] = (state.resources[rKey] || 0) + reward.resources[rKey];
                        resExtras[rKey] = (resExtras[rKey] || 0) + reward.resources[rKey];
                    }
                }
                quest.claimed = true;
                claimedCount++;
            }
        }
    }
    if (claimedCount === 0) return;
    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    // Build summary
    var summary = 'Claimed ' + claimedCount + ' quest reward' + (claimedCount > 1 ? 's' : '') + '!';
    var parts = [];
    if (totalMoney > 0) parts.push('+$' + totalMoney.toLocaleString());
    if (totalDiamond > 0) parts.push('+' + totalDiamond + '\uD83D\uDC8E');
    if (totalBazinga > 0) parts.push('+' + totalBazinga + '\u26A1');
    for (var ek in resExtras) {
        var emoji = { stone: '\uD83E\uDEA8', iron: '\u2699\uFE0F', gold: '\uD83E\uDD47', scrap: '\uD83D\uDD29', diamond: '\uD83D\uDC8E' }[ek] || ek;
        parts.push('+' + resExtras[ek] + emoji);
    }
    if (parts.length > 0) summary += ' ' + parts.join(', ');
    if (typeof showGameAlert === 'function') showGameAlert('Quest Rewards', summary);
    if (document.getElementById('quests-modal')) renderQuestsModal();
}
window.claimAllQuests = claimAllQuests;

// --- NOTIFICATION COUNT ---
function getQuestNotificationCount() {
    if (!state.quests) return 0;
    var count = 0;
    var lists = ['daily', 'weekly'];
    for (var li = 0; li < lists.length; li++) {
        var list = state.quests[lists[li]];
        if (!list) continue;
        for (var qi = 0; qi < list.length; qi++) {
            if (list[qi].completed && !list[qi].claimed) count++;
        }
    }
    return count;
}

// --- MODAL ---
function openQuestsModal() {
    initQuests();

    var existing = document.getElementById('quests-modal');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'quests-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);padding:12px;';
    overlay.onclick = function(e) { if (e.target === overlay) closeQuestsModal(); };

    overlay.innerHTML =
        '<div id="quests-modal-inner" style="background:linear-gradient(135deg,#0f172a,#1e293b,#0f172a);border:2px solid rgba(59,130,246,0.3);border-radius:12px;' +
        'padding:12px 14px;box-sizing:border-box;max-width:500px;width:96%;box-sizing:border-box;max-height:90vh;overflow-y:auto;box-shadow:0 0 40px rgba(59,130,246,0.15);position:relative;max-height:92vh;display:flex;flex-direction:column;gap:8px;">' +
            '<button onclick="closeQuestsModal()" style="position:absolute;top:4px;right:8px;color:#64748b;font-size:18px;cursor:pointer;background:none;border:none;">\u00D7</button>' +
            '<div style="text-align:center;position:relative;">' +
                '<div style="font-size:16px;font-weight:900;color:#3b82f6;letter-spacing:3px;text-shadow:0 0 20px rgba(59,130,246,0.5);">📋 MISSION BOARD</div>' +
                '<div id="quests-claim-all-wrap" style="position:absolute;right:0;top:50%;transform:translateY(-50);"></div>' +
            '</div>' +
            '<div id="quests-tabs" style="display:flex;gap:6px;justify-content:center;"></div>' +
            '<div id="quests-content" style="flex:1;overflow-y:auto;min-height:0;"></div>' +
        '</div>';

    document.body.appendChild(overlay);
    renderQuestsModal();
}

function closeQuestsModal() {
    var el = document.getElementById('quests-modal');
    if (el) el.remove();
}

function renderQuestsModal() {
    var tabsEl = document.getElementById('quests-tabs');
    var contentEl = document.getElementById('quests-content');
    var claimAllWrap = document.getElementById('quests-claim-all-wrap');
    if (!tabsEl || !contentEl) return;

    // Count claimable per tab
    var dailyClaimable = 0;
    var weeklyClaimable = 0;
    if (state.quests.daily) {
        for (var di = 0; di < state.quests.daily.length; di++) {
            if (state.quests.daily[di].completed && !state.quests.daily[di].claimed) dailyClaimable++;
        }
    }
    if (state.quests.weekly) {
        for (var wi = 0; wi < state.quests.weekly.length; wi++) {
            if (state.quests.weekly[wi].completed && !state.quests.weekly[wi].claimed) weeklyClaimable++;
        }
    }

    // Time until reset
    var now = new Date();
    var dailyResetTime = _getTimeUntilDailyReset(now);
    var weeklyResetTime = _getTimeUntilWeeklyReset(now);

    // Tabs
    var tabs = [
        { key: 'daily', label: 'Daily', icon: '☀️', color: '#f59e0b', count: dailyClaimable, timer: dailyResetTime },
        { key: 'weekly', label: 'Weekly', icon: '📅', color: '#8b5cf6', count: weeklyClaimable, timer: weeklyResetTime }
    ];

    var tabsHtml = '';
    for (var ti = 0; ti < tabs.length; ti++) {
        var tab = tabs[ti];
        var isActive = _questActiveTab === tab.key;
        var badge = tab.count > 0 ? '<span style="position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:7px;font-weight:900;width:12px;height:12px;border-radius:50%;display:flex;align-items:center;justify-content:center;">' + tab.count + '</span>' : '';
        tabsHtml +=
            '<button onclick="_questActiveTab=\'' + tab.key + '\';renderQuestsModal();" style="position:relative;padding:6px 16px;box-sizing:border-box;font-size:9px;font-weight:700;letter-spacing:1px;' +
            'border-radius:6px;cursor:pointer;border:1px solid ' + (isActive ? tab.color : 'rgba(255,255,255,0.1)') + ';' +
            'background:' + (isActive ? tab.color + '22' : 'rgba(255,255,255,0.03)') + ';' +
            'color:' + (isActive ? tab.color : '#64748b') + ';text-transform:uppercase;">' +
            tab.icon + ' ' + tab.label + badge + '</button>';
    }
    tabsEl.innerHTML = tabsHtml;

    // Claim All button
    if (claimAllWrap) {
        var totalClaimable = dailyClaimable + weeklyClaimable;
        if (totalClaimable > 0) {
            claimAllWrap.innerHTML = '<button onclick="claimAllQuests()" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-size:10px;font-weight:700;border:none;border-radius:6px;padding:6px 14px;box-sizing:border-box;cursor:pointer;letter-spacing:1px;text-transform:uppercase;transition:filter 0.15s;" onmouseover="this.style.filter=\'brightness(1.1)\'" onmouseout="this.style.filter=\'none\'">CLAIM ALL (' + totalClaimable + ')</button>';
        } else {
            claimAllWrap.innerHTML = '';
        }
    }

    // Timer display
    var activeTab = tabs.find(function(t) { return t.key === _questActiveTab; });
    var timerHtml = '<div style="text-align:center;font-size:7px;color:#475569;margin-bottom:2px;">⏰ Resets in: ' + (activeTab ? activeTab.timer : '--') + '</div>';

    // Quest cards
    var quests = state.quests[_questActiveTab] || [];
    var cardsHtml = '';

    if (quests.length === 0) {
        cardsHtml = '<div style="text-align:center;padding:24px;color:#475569;font-size:10px;">No quests available. Check back later!</div>';
    }

    for (var qi = 0; qi < quests.length; qi++) {
        var quest = quests[qi];
        var progressPct = Math.min(100, Math.round((quest.current / quest.target) * 100));
        var borderColor = quest.claimed ? '#22c55e44' : quest.completed ? '#fbbf2488' : 'rgba(255,255,255,0.08)';
        var rewardText = _formatQuestReward(quest.reward);
        var barColor = quest.completed ? '#22c55e' : (activeTab ? activeTab.color : '#3b82f6');

        cardsHtml +=
            '<div style="background:rgba(255,255,255,0.04);border:1px solid ' + borderColor + ';border-radius:8px;padding:10px 12px;box-sizing:border-box;' +
            (quest.claimed ? 'opacity:0.6;' : '') + '">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
                    '<div style="flex:1;min-width:0;">' +
                        '<div style="font-size:10px;color:' + (quest.completed ? '#f8fafc' : '#94a3b8') + ';font-weight:700;">' + quest.desc + '</div>' +
                    '</div>' +
                    (quest.completed && !quest.claimed ?
                        '<button onclick="claimQuestReward(\'' + _questActiveTab + '\',' + qi + ')" style="flex-shrink:0;padding:4px 12px;box-sizing:border-box;font-size:7px;font-weight:900;letter-spacing:1px;' +
                        'background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;border:1px solid #4ade80;border-radius:4px;cursor:pointer;text-transform:uppercase;' +
                        'animation:questPulse 1.5s infinite;">CLAIM</button>'
                    : quest.claimed ?
                        '<span style="font-size:7px;color:#22c55e;font-weight:700;flex-shrink:0;">CLAIMED ✓</span>'
                    : '') +
                '</div>' +
                // Progress bar
                '<div style="margin-top:6px;background:rgba(255,255,255,0.08);border-radius:4px;height:6px;overflow:hidden;">' +
                    '<div style="height:100%;width:' + progressPct + '%;background:' + barColor + ';border-radius:4px;transition:width 0.3s;"></div>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;margin-top:4px;">' +
                    '<span style="font-size:7px;color:#64748b;">' + quest.current + ' / ' + quest.target + '</span>' +
                    '<span style="font-size:7px;color:#94a3b8;">🎁 ' + rewardText + '</span>' +
                '</div>' +
            '</div>';
    }

    // Inject pulse animation
    if (!document.getElementById('quest-pulse-style')) {
        var style = document.createElement('style');
        style.id = 'quest-pulse-style';
        style.textContent = '@keyframes questPulse { 0%, 100% { box-shadow: 0 0 4px rgba(34,197,94,0.4); } 50% { box-shadow: 0 0 12px rgba(34,197,94,0.8); } }';
        document.head.appendChild(style);
    }

    contentEl.innerHTML = timerHtml + '<div style="display:flex;flex-direction:column;gap:6px;padding:2px 0;">' + cardsHtml + '</div>';
}

// --- HELPERS ---
function _formatQuestReward(reward) {
    var parts = [];
    if (reward.money) parts.push('$' + reward.money.toLocaleString());
    if (reward.diamond) parts.push(reward.diamond + ' 💎');
    if (reward.bazingaPoints) parts.push(reward.bazingaPoints + ' ⚡');
    if (reward.resources) {
        for (var rk in reward.resources) {
            var emoji = { stone: '🪨', iron: '⛏️', gold: '🥇', scrap: '🔩', diamond: '💎' }[rk] || rk;
            parts.push(reward.resources[rk] + ' ' + emoji);
        }
    }
    return parts.join(' + ');
}

function _getTimeUntilDailyReset(now) {
    var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var diff = tomorrow - now;
    var hours = Math.floor(diff / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    return hours + 'h ' + mins + 'm';
}

function _getTimeUntilWeeklyReset(now) {
    var dayOfWeek = now.getDay(); // 0=Sun
    var daysUntilMonday = (dayOfWeek === 0) ? 1 : (8 - dayOfWeek);
    var nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMonday);
    var diff = nextMonday - now;
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    return days + 'd ' + hours + 'h';
}
