// ============================================================
// ACHIEVEMENT SYSTEM — The Big Bang Theory: Pasadena Battle
// ============================================================

// --- ACHIEVEMENT DEFINITIONS ---
const ACHIEVEMENTS = {
    // COMBAT
    first_blood:   { id: 'first_blood',   name: 'First Blood',        desc: 'Kill your first enemy',         category: 'Combat',      icon: '⚔️', stat: 'totalKills',        target: 1,    reward: { money: 100 } },
    slayer_100:    { id: 'slayer_100',     name: 'Centurion Slayer',   desc: 'Defeat 100 enemies',            category: 'Combat',      icon: '⚔️', stat: 'totalKills',        target: 100,  reward: { money: 500 } },
    slayer_500:    { id: 'slayer_500',     name: 'Veteran Slayer',     desc: 'Defeat 500 enemies',            category: 'Combat',      icon: '⚔️', stat: 'totalKills',        target: 500,  reward: { diamond: 10 } },
    slayer_1000:   { id: 'slayer_1000',    name: 'Legendary Slayer',   desc: 'Defeat 1000 enemies',           category: 'Combat',      icon: '⚔️', stat: 'totalKills',        target: 1000, reward: { diamond: 20 } },
    boss_hunter_10:{ id: 'boss_hunter_10', name: 'Boss Hunter',        desc: 'Defeat 10 bosses',              category: 'Combat',      icon: '⚔️', stat: 'bossKills',         target: 10,   reward: { money: 1000 } },
    boss_hunter_50:{ id: 'boss_hunter_50', name: 'Boss Slayer',        desc: 'Defeat 50 bosses',              category: 'Combat',      icon: '⚔️', stat: 'bossKills',         target: 50,   reward: { diamond: 15 } },

    // COLLECTION
    hire_5:        { id: 'hire_5',         name: 'Squad Leader',       desc: 'Hire 5 characters',             category: 'Collection',  icon: '📦', stat: 'charactersHired',   target: 5,    reward: { money: 500 } },
    hire_10:       { id: 'hire_10',        name: 'Full Roster',        desc: 'Hire 10 characters',            category: 'Collection',  icon: '📦', stat: 'charactersHired',   target: 10,   reward: { diamond: 10 } },
    hire_all:      { id: 'hire_all',       name: 'Gotta Hire Em All',  desc: 'Hire all 17 characters',        category: 'Collection',  icon: '📦', stat: 'charactersHired',   target: 17,   reward: { bazingaPoints: 2 } },
    full_roster:   { id: 'full_roster',    name: 'Full Roster',        desc: 'Recruit all 17 characters',         category: 'Collection',  icon: '📦', stat: 'charactersHired',   target: 17,      reward: { bazingaPoints: 5 } },
    craft_3:       { id: 'craft_3',        name: 'Tinkerer',           desc: 'Craft 3 robots',                category: 'Collection',  icon: '📦', stat: 'robotsCrafted',     target: 3,    reward: { money: 1000 } },
    craft_all:     { id: 'craft_all',      name: 'Master Engineer',    desc: 'Craft all 11 robots',           category: 'Collection',  icon: '📦', stat: 'robotsCrafted',     target: 11,   reward: { bazingaPoints: 2 } },
    collector:     { id: 'collector',      name: 'Collector',          desc: 'Own 20 pieces of equipment',        category: 'Collection',  icon: '📦', stat: 'equipmentOwned',    target: 20,      reward: { diamond: 15 } },

    // PROGRESSION
    wave_10:       { id: 'wave_10',        name: 'Wave Rider',         desc: 'Reach Wave 10',                 category: 'Progression', icon: '📈', stat: 'highestWave',       target: 10,   reward: { money: 500 } },
    wave_25:       { id: 'wave_25',        name: 'Wave Crusher',       desc: 'Reach Wave 25',                 category: 'Progression', icon: '📈', stat: 'highestWave',       target: 25,   reward: { diamond: 5 } },
    wave_50:       { id: 'wave_50',        name: 'Wave Dominator',     desc: 'Reach Wave 50',                 category: 'Progression', icon: '📈', stat: 'highestWave',       target: 50,   reward: { diamond: 15 } },
    wave_master:   { id: 'wave_master',    name: 'Wave Master',        desc: 'Reach Wave 50 in any location',     category: 'Progression', icon: '📈', stat: 'highestWave',       target: 50,      reward: { diamond: 25 } },
    wave_100:      { id: 'wave_100',       name: 'Wave Legend',        desc: 'Reach Wave 100',                category: 'Progression', icon: '📈', stat: 'highestWave',       target: 100,  reward: { diamond: 50 } },
    explorer_5:    { id: 'explorer_5',     name: 'Explorer',           desc: 'Unlock 5 locations',            category: 'Progression', icon: '📈', stat: 'locationsUnlocked', target: 5,    reward: { money: 2000 } },
    explorer_all:  { id: 'explorer_all',   name: 'Pasadena Master',    desc: 'Unlock all 10 locations',       category: 'Progression', icon: '📈', stat: 'locationsUnlocked', target: 10,   reward: { diamond: 20 } },

    // PVP
    pvp_first:     { id: 'pvp_first',      name: 'Arena Debut',        desc: 'Win your first PVP battle',     category: 'PVP',         icon: '🏟️', stat: 'pvpWins',           target: 1,    reward: { money: 500 } },
    pvp_10:        { id: 'pvp_10',         name: 'Arena Fighter',      desc: 'Win 10 PVP battles',            category: 'PVP',         icon: '🏟️', stat: 'pvpWins',           target: 10,   reward: { diamond: 5 } },
    pvp_50:        { id: 'pvp_50',         name: 'Arena Champion',     desc: 'Win 50 PVP battles',            category: 'PVP',         icon: '🏟️', stat: 'pvpWins',           target: 50,   reward: { diamond: 15 } },
    league_gold:   { id: 'league_gold',    name: 'Gold League',        desc: 'Reach Gold league (300 🏆)',     category: 'PVP',         icon: '🏟️', stat: 'trophies',          target: 300,  reward: { diamond: 10 } },
    league_diamond:{ id: 'league_diamond', name: 'Diamond League',     desc: 'Reach Diamond league (1000 🏆)', category: 'PVP',         icon: '🏟️', stat: 'trophies',          target: 1000, reward: { bazingaPoints: 3 } },

    // ECONOMY
    earn_10k:      { id: 'earn_10k',       name: 'Thousandaire',       desc: 'Earn $10,000 total',            category: 'Economy',     icon: '💰', stat: 'moneyEarned',       target: 10000,  reward: { diamond: 5 } },
    earn_100k:     { id: 'earn_100k',      name: 'Mogul',              desc: 'Earn $100,000 total',           category: 'Economy',     icon: '💰', stat: 'moneyEarned',       target: 100000, reward: { diamond: 20 } },
    millionaire:   { id: 'millionaire',    name: 'Millionaire',        desc: 'Earn $1,000,000 total money',       category: 'Economy',     icon: '💰', stat: 'moneyEarned',       target: 1000000, reward: { bazingaPoints: 3 } },
    bazinga_50:    { id: 'bazinga_50',     name: 'Bazinga Spender',    desc: 'Spend 50 Bazinga Points',       category: 'Economy',     icon: '💰', stat: 'bazingaSpent',      target: 50,     reward: { diamond: 10 } },
    whale:         { id: 'whale',          name: 'Whale',              desc: 'Spend 100 Comic Coins in the gacha', category: 'Economy',   icon: '💰', stat: 'comicCoinsSpent',   target: 100,     reward: { bazingaPoints: 5 } },

    // SOCIAL
    name_change:   { id: 'name_change',    name: 'Identity Crisis',    desc: 'Change your name',              category: 'Social',      icon: '👤', stat: 'nameChanged',       target: 1,    reward: { money: 500 } },
    go_online:     { id: 'go_online',      name: 'Connected',          desc: 'Connect an online account',     category: 'Social',      icon: '👤', stat: 'accountConnected',  target: 1,    reward: { diamond: 5 } },

    // PRESTIGE
    prestige_1:    { id: 'prestige_1',     name: 'First Rebirth',          desc: 'Prestige 1 time',                   category: 'Prestige',    icon: '♻️', stat: 'prestigeCount',      target: 1,    reward: { title: 'Reborn' } },
    prestige_5:    { id: 'prestige_5',     name: 'Serial Rebirth',         desc: 'Prestige 5 times',                  category: 'Prestige',    icon: '♻️', stat: 'prestigeCount',      target: 5,    reward: { diamond: 10 } },
    prestige_king: { id: 'prestige_king',  name: 'Prestige King',      desc: 'Prestige 5 times',                 category: 'Prestige',    icon: '♻️', stat: 'prestigeCount',      target: 5,       reward: { title: 'Prestige King' } },
    prestige_10:   { id: 'prestige_10',    name: 'Groundhog Day',          desc: 'Prestige 10 times',                 category: 'Prestige',    icon: '♻️', stat: 'prestigeCount',      target: 10,   reward: { diamond: 25 } },
    prestige_25:   { id: 'prestige_25',    name: 'Multiverse Theory',      desc: 'Prestige 25 times',                 category: 'Prestige',    icon: '♻️', stat: 'prestigeCount',      target: 25,   reward: { bazingaPoints: 3 } },
    prestige_50:   { id: 'prestige_50',    name: 'Beyond the Event Horizon', desc: 'Prestige 50 times',               category: 'Prestige',    icon: '♻️', stat: 'prestigeCount',      target: 50,   reward: { bazingaPoints: 5 } },
    speed_runner:  { id: 'speed_runner',   name: 'Speed Runner',           desc: 'Reach Wave 50 before first prestige', category: 'Prestige', icon: '♻️', stat: 'speedRunnerWave50', target: 1,    reward: { diamond: 20 } },
    efficiency_bp: { id: 'efficiency_bp',  name: 'Efficiency Expert',      desc: 'Earn 50+ BP in a single prestige',  category: 'Prestige',    icon: '♻️', stat: 'bestSingleBP',       target: 50,   reward: { bazingaPoints: 5 } },

    // HIDDEN
    speed_demon:   { id: 'speed_demon',    name: 'Speed Demon',        desc: 'Beat a boss in under 5 seconds',   category: 'Hidden', icon: '❓', stat: 'speedBossKill',  target: 1, reward: { bazingaPoints: 1 }, hidden: true },
    speed_clear:   { id: 'speed_clear',    name: 'Speed Demon',        desc: 'Clear a wave in under 3 seconds',  category: 'Hidden',      icon: '❓', stat: 'speedWaveClear',    target: 1,       reward: { bazingaPoints: 2 }, hidden: true },
    solo_pvp:      { id: 'solo_pvp',       name: 'Lone Wolf',          desc: 'Win PVP with only 1 character',    category: 'Hidden', icon: '❓', stat: 'soloPvpWin',     target: 1, reward: { bazingaPoints: 1 }, hidden: true }
};

// Category metadata for tab rendering
var ACHIEVEMENT_CATEGORIES = [
    { key: 'Combat',      icon: '⚔️',  color: '#ef4444' },
    { key: 'Collection',  icon: '📦',  color: '#f59e0b' },
    { key: 'Progression', icon: '📈',  color: '#22c55e' },
    { key: 'PVP',         icon: '🏟️',  color: '#8b5cf6' },
    { key: 'Economy',     icon: '💰',  color: '#eab308' },
    { key: 'Social',      icon: '👤',  color: '#06b6d4' },
    { key: 'Prestige',    icon: '♻️',  color: '#a855f7' },
    { key: 'Hidden',      icon: '❓',  color: '#64748b' }
];

var _achievementActiveTab = 'Combat';

// --- INITIALIZATION ---
function initAchievements() {
    if (!state.achievements) state.achievements = {};
    if (!state.stats) {
        state.stats = {
            totalKills: 0,
            bossKills: 0,
            pvpWins: 0,
            pvpLosses: 0,
            foodUsed: 0,
            robotsCrafted: 0,
            moneyEarned: 0,
            moneySpent: 0,
            charactersHired: 0,
            locationsUnlocked: 0,
            bazingaSpent: 0,
            highestWave: 0,
            totalDamage: 0,
            dailyLoginsTotal: 0,
            nameChanged: 0,
            accountConnected: 0,
            speedBossKill: 0,
            soloPvpWin: 0,
            trophies: 0,
            prestigeCount: 0,
            totalBPEarned: 0,
            bestSingleBP: 0,
            speedRunnerWave50: 0,
            speedWaveClear: 0,
            equipmentOwned: 0,
            comicCoinsSpent: 0
        };
    }

    // Ensure every achievement exists in state
    for (var id in ACHIEVEMENTS) {
        if (!state.achievements[id]) {
            state.achievements[id] = { unlocked: false, claimedReward: false };
        }
    }

    // Sync derived stats from current state
    _syncDerivedStats();
}

// Pull stats from existing state values that may have been tracked before this system
function _syncDerivedStats() {
    // Characters hired
    var hired = 0;
    if (state.roster) {
        for (var key in state.roster) {
            if (state.roster[key].level >= 1) hired++;
        }
    }
    if (hired > (state.stats.charactersHired || 0)) state.stats.charactersHired = hired;

    // Robots crafted
    var crafted = 0;
    if (state.robotRoster) {
        for (var rk in state.robotRoster) crafted++;
    }
    if (crafted > (state.stats.robotsCrafted || 0)) state.stats.robotsCrafted = crafted;

    // Locations unlocked
    var locs = (state.unlockedLocations && state.unlockedLocations.length) || 1;
    if (locs > (state.stats.locationsUnlocked || 0)) state.stats.locationsUnlocked = locs;

    // Highest wave
    if ((state.wave || 1) > (state.stats.highestWave || 0)) state.stats.highestWave = state.wave || 1;

    // Prestige stats
    if (state.stats.prestigeCount === undefined && state.stats) state.stats.prestigeCount = state.stats.prestigeCount || 0;
    if (state.stats.totalBPEarned === undefined && state.stats) state.stats.totalBPEarned = state.stats.totalBPEarned || 0;
    if (state.stats.bestSingleBP === undefined && state.stats) state.stats.bestSingleBP = state.stats.bestSingleBP || 0;
    // Speed Runner: wave 50+ with zero prestiges
    if ((state.wave || 1) >= 50 && (state.stats.prestigeCount || 0) === 0) state.stats.speedRunnerWave50 = 1;

    // PVP stats
    if (state.pvp) {
        if ((state.pvp.wins || 0) > (state.stats.pvpWins || 0)) state.stats.pvpWins = state.pvp.wins || 0;
        if ((state.pvp.losses || 0) > (state.stats.pvpLosses || 0)) state.stats.pvpLosses = state.pvp.losses || 0;
        if ((state.pvp.trophies || 0) > (state.stats.trophies || 0)) state.stats.trophies = state.pvp.trophies || 0;
    }

    // Name change
    if (state.hasChangedName) state.stats.nameChanged = 1;

    // Account connected
    if (typeof isGuest !== 'undefined' && !isGuest) state.stats.accountConnected = 1;
}

// --- STAT TRACKING ---
function trackStat(statKey, amount) {
    if (!state.stats) initAchievements();
    amount = amount || 1;

    // highestWave, trophies, bestSingleBP, speedRunnerWave50 use max instead of increment
    if (statKey === 'highestWave' || statKey === 'trophies' || statKey === 'bestSingleBP' || statKey === 'speedRunnerWave50') {
        if (amount > (state.stats[statKey] || 0)) {
            state.stats[statKey] = amount;
        }
    } else {
        state.stats[statKey] = (state.stats[statKey] || 0) + amount;
    }

    checkAchievements();
    saveProgress();
}

// --- CHECK ALL ACHIEVEMENTS ---
function checkAchievements() {
    if (!state.stats || !state.achievements) return;

    for (var id in ACHIEVEMENTS) {
        var ach = ACHIEVEMENTS[id];
        var achState = state.achievements[id];
        if (!achState || achState.unlocked) continue;

        var current = state.stats[ach.stat] || 0;
        if (current >= ach.target) {
            unlockAchievement(id);
        }
    }
}

// --- UNLOCK ACHIEVEMENT ---
function unlockAchievement(id) {
    if (!ACHIEVEMENTS[id]) return;
    if (!state.achievements[id]) state.achievements[id] = { unlocked: false, claimedReward: false };
    if (state.achievements[id].unlocked) return;

    state.achievements[id].unlocked = true;
    saveProgress();
    showAchievementToast(ACHIEVEMENTS[id]);
}

// --- CLAIM REWARD ---
function claimAchievementReward(id) {
    if (!ACHIEVEMENTS[id]) return;
    var achState = state.achievements[id];
    if (!achState || !achState.unlocked || achState.claimedReward) return;

    var reward = ACHIEVEMENTS[id].reward;

    if (reward.money) {
        state.resources.money = (state.resources.money || 0) + reward.money;
    }
    if (reward.diamond) {
        state.resources.diamond = (state.resources.diamond || 0) + reward.diamond;
    }
    if (reward.bazingaPoints) {
        state.bazingaPoints = (state.bazingaPoints || 0) + reward.bazingaPoints;
    }
    if (reward.title) {
        if (!state.unlockedTitles) state.unlockedTitles = [];
        if (state.unlockedTitles.indexOf(reward.title) === -1) state.unlockedTitles.push(reward.title);
    }

    achState.claimedReward = true;
    saveProgress();
    if (typeof syncUI === 'function') syncUI();

    // Re-render modal if open
    if (document.getElementById('achievements-modal')) {
        renderAchievementsModal();
    }
}

// --- CLAIM ALL ACHIEVEMENTS ---
function claimAllAchievements() {
    if (!state.achievements) return;
    var totalMoney = 0, totalDiamond = 0, totalBazinga = 0, claimedCount = 0;
    var titles = [];
    for (var id in ACHIEVEMENTS) {
        var achState = state.achievements[id];
        if (!achState || !achState.unlocked || achState.claimedReward) continue;
        var reward = ACHIEVEMENTS[id].reward;
        if (reward.money) { state.resources.money = (state.resources.money || 0) + reward.money; totalMoney += reward.money; }
        if (reward.diamond) { state.resources.diamond = (state.resources.diamond || 0) + reward.diamond; totalDiamond += reward.diamond; }
        if (reward.bazingaPoints) { state.bazingaPoints = (state.bazingaPoints || 0) + reward.bazingaPoints; totalBazinga += reward.bazingaPoints; }
        if (reward.title) {
            if (!state.unlockedTitles) state.unlockedTitles = [];
            if (state.unlockedTitles.indexOf(reward.title) === -1) state.unlockedTitles.push(reward.title);
            titles.push(reward.title);
        }
        achState.claimedReward = true;
        claimedCount++;
    }
    if (claimedCount === 0) return;
    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    // Build summary
    var summary = 'Claimed ' + claimedCount + ' achievement reward' + (claimedCount > 1 ? 's' : '') + '!';
    var parts = [];
    if (totalMoney > 0) parts.push('+$' + totalMoney.toLocaleString());
    if (totalDiamond > 0) parts.push('+' + totalDiamond + ' \uD83D\uDC8E');
    if (totalBazinga > 0) parts.push('+' + totalBazinga + ' \u26A1');
    if (titles.length > 0) parts.push('\uD83C\uDFF7\uFE0F ' + titles.join(', '));
    if (parts.length > 0) summary += '\n' + parts.join(', ');
    if (typeof showGameAlert === 'function') showGameAlert('Achievement Rewards', summary);
    if (document.getElementById('achievements-modal')) renderAchievementsModal();
}
window.claimAllAchievements = claimAllAchievements;

// --- TOAST NOTIFICATION ---
function showAchievementToast(achievement) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    // Remove existing toast
    var existing = document.getElementById('achievement-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'achievement-toast';
    toast.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:99999;' +
        'background:linear-gradient(135deg,#1a1a2e,#16213e);border:2px solid #fbbf24;border-radius:12px;' +
        'padding:10px 20px;box-sizing:border-box;display:flex;align-items:center;gap:10px;box-shadow:0 0 30px rgba(251,191,36,0.4);' +
        'animation:achieveSlideIn 0.4s ease-out;min-width:200px;max-width:360px;';

    toast.innerHTML =
        '<div style="font-size:28px;flex-shrink:0;">' + achievement.icon + '</div>' +
        '<div style="flex:1;">' +
            '<div style="font-size:8px;color:#fbbf24;font-weight:900;letter-spacing:2px;text-transform:uppercase;">🏆 Achievement Unlocked!</div>' +
            '<div style="font-size:12px;color:#f8fafc;font-weight:700;margin-top:2px;">' + achievement.name + '</div>' +
            '<div style="font-size:8px;color:#94a3b8;margin-top:1px;">' + achievement.desc + '</div>' +
        '</div>';

    // Inject animation keyframes if not present
    if (!document.getElementById('achieve-toast-style')) {
        var style = document.createElement('style');
        style.id = 'achieve-toast-style';
        style.textContent =
            '@keyframes achieveSlideIn { from { opacity:0; transform:translateX(-50%) translateY(-30px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }' +
            '@keyframes achieveSlideOut { from { opacity:1; transform:translateX(-50%) translateY(0); } to { opacity:0; transform:translateX(-50%) translateY(-30px); } }';
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.style.animation = 'achieveSlideOut 0.3s ease-in forwards';
        setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
    }, 3000);
}

// --- MODAL ---
function openAchievementsModal() {
    initAchievements();
    _syncDerivedStats();
    checkAchievements();

    var existing = document.getElementById('achievements-modal');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'achievements-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);padding:12px;';
    overlay.onclick = function(e) { if (e.target === overlay) closeAchievementsModal(); };

    overlay.innerHTML =
        '<div id="achievements-modal-inner" style="background:linear-gradient(135deg,#0f172a,#1e293b,#0f172a);border:2px solid rgba(251,191,36,0.3);border-radius:12px;' +
        'padding:12px 14px;box-sizing:border-box;max-width:540px;width:96%;box-sizing:border-box;max-height:90vh;overflow-y:auto;box-shadow:0 0 40px rgba(251,191,36,0.15);position:relative;max-height:92vh;display:flex;flex-direction:column;gap:6px;">' +
            '<button onclick="closeAchievementsModal()" style="position:absolute;top:4px;right:8px;color:#64748b;font-size:18px;cursor:pointer;background:none;border:none;">\u00D7</button>' +
            '<div style="text-align:center;position:relative;">' +
                '<div style="font-size:16px;font-weight:900;color:#fbbf24;letter-spacing:3px;text-shadow:0 0 20px rgba(251,191,36,0.5);">🏆 ACHIEVEMENTS</div>' +
                '<div id="achievements-summary" style="font-size:8px;color:#64748b;margin-top:2px;"></div>' +
                '<div id="achievements-claim-all-wrap" style="margin-top:6px;"></div>' +
            '</div>' +
            '<div id="achievements-tabs" style="display:flex;gap:3px;flex-wrap:wrap;justify-content:center;"></div>' +
            '<div id="achievements-content" style="flex:1;overflow-y:auto;min-height:0;"></div>' +
        '</div>';

    document.body.appendChild(overlay);
    renderAchievementsModal();
}

function closeAchievementsModal() {
    var el = document.getElementById('achievements-modal');
    if (el) el.remove();
}

function renderAchievementsModal() {
    var tabsEl = document.getElementById('achievements-tabs');
    var contentEl = document.getElementById('achievements-content');
    var summaryEl = document.getElementById('achievements-summary');
    var claimAllWrap = document.getElementById('achievements-claim-all-wrap');
    if (!tabsEl || !contentEl) return;

    // Summary
    var totalCount = 0;
    var unlockedCount = 0;
    var claimedCount = 0;
    for (var aid in ACHIEVEMENTS) {
        totalCount++;
        if (state.achievements[aid] && state.achievements[aid].unlocked) unlockedCount++;
        if (state.achievements[aid] && state.achievements[aid].claimedReward) claimedCount++;
    }
    if (summaryEl) {
        summaryEl.textContent = unlockedCount + '/' + totalCount + ' unlocked \u2022 ' + claimedCount + ' claimed';
    }

    // Claim All button
    var totalClaimable = unlockedCount - claimedCount;
    if (claimAllWrap) {
        if (totalClaimable > 0) {
            claimAllWrap.innerHTML = '<button onclick="claimAllAchievements()" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-size:10px;font-weight:700;border:none;border-radius:6px;padding:6px 14px;box-sizing:border-box;cursor:pointer;letter-spacing:1px;text-transform:uppercase;transition:filter 0.15s;" onmouseover="this.style.filter=\'brightness(1.1)\'" onmouseout="this.style.filter=\'none\'">CLAIM ALL (' + totalClaimable + ')</button>';
        } else {
            claimAllWrap.innerHTML = '';
        }
    }

    // Tabs
    var tabsHtml = '';
    for (var ci = 0; ci < ACHIEVEMENT_CATEGORIES.length; ci++) {
        var cat = ACHIEVEMENT_CATEGORIES[ci];
        var isActive = _achievementActiveTab === cat.key;
        // Count unclaimed in category
        var unclaimed = 0;
        for (var achId in ACHIEVEMENTS) {
            if (ACHIEVEMENTS[achId].category === cat.key && state.achievements[achId] && state.achievements[achId].unlocked && !state.achievements[achId].claimedReward) {
                unclaimed++;
            }
        }
        var badge = unclaimed > 0 ? '<span style="position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:7px;font-weight:900;width:12px;height:12px;border-radius:50%;display:flex;align-items:center;justify-content:center;">' + unclaimed + '</span>' : '';
        tabsHtml +=
            '<button onclick="_achievementActiveTab=\'' + cat.key + '\';renderAchievementsModal();" style="position:relative;padding:5px 8px;box-sizing:border-box;font-size:8px;font-weight:700;letter-spacing:1px;' +
            'border-radius:6px;cursor:pointer;border:1px solid ' + (isActive ? cat.color : 'rgba(255,255,255,0.1)') + ';' +
            'background:' + (isActive ? cat.color + '22' : 'rgba(255,255,255,0.03)') + ';' +
            'color:' + (isActive ? cat.color : '#64748b') + ';text-transform:uppercase;">' +
            cat.icon + ' ' + cat.key + badge + '</button>';
    }
    tabsEl.innerHTML = tabsHtml;

    // Cards
    var cardsHtml = '';
    var achs = [];
    for (var achKey in ACHIEVEMENTS) {
        if (ACHIEVEMENTS[achKey].category === _achievementActiveTab) {
            achs.push(ACHIEVEMENTS[achKey]);
        }
    }

    for (var i = 0; i < achs.length; i++) {
        var ach = achs[i];
        var achState = state.achievements[ach.id] || { unlocked: false, claimedReward: false };
        var currentVal = state.stats[ach.stat] || 0;
        var progressPct = Math.min(100, Math.round((currentVal / ach.target) * 100));

        // Hidden achievements
        if (ach.hidden && !achState.unlocked) {
            cardsHtml +=
                '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px 12px;box-sizing:border-box;display:flex;align-items:center;gap:10px;opacity:0.5;">' +
                    '<div style="font-size:24px;">❓</div>' +
                    '<div style="flex:1;">' +
                        '<div style="font-size:10px;color:#64748b;font-weight:700;">Hidden Achievement</div>' +
                        '<div style="font-size:8px;color:#475569;margin-top:2px;">Keep playing to discover this one...</div>' +
                    '</div>' +
                '</div>';
            continue;
        }

        // Determine card border color
        var borderColor = 'rgba(255,255,255,0.08)';
        if (achState.claimedReward) borderColor = '#22c55e44';
        else if (achState.unlocked) borderColor = '#fbbf2488';

        // Reward text
        var rewardText = _formatReward(ach.reward);

        // Progress bar color
        var barColor = achState.unlocked ? '#22c55e' : ACHIEVEMENT_CATEGORIES.find(function(c) { return c.key === ach.category; }).color;

        cardsHtml +=
            '<div style="background:rgba(255,255,255,0.04);border:1px solid ' + borderColor + ';border-radius:8px;padding:10px 12px;box-sizing:border-box;display:flex;align-items:flex-start;gap:10px;' +
            (achState.claimedReward ? 'opacity:0.7;' : '') + '">' +
                '<div style="font-size:24px;flex-shrink:0;margin-top:2px;">' + (achState.claimedReward ? '✅' : ach.icon) + '</div>' +
                '<div style="flex:1;min-width:0;">' +
                    '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">' +
                        '<div style="font-size:10px;color:' + (achState.unlocked ? '#f8fafc' : '#94a3b8') + ';font-weight:700;">' + ach.name + '</div>' +
                        (achState.unlocked && !achState.claimedReward ?
                            '<button onclick="claimAchievementReward(\'' + ach.id + '\')" style="flex-shrink:0;padding:3px 10px;box-sizing:border-box;font-size:7px;font-weight:900;letter-spacing:1px;' +
                            'background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;border:1px solid #fbbf24;border-radius:4px;cursor:pointer;text-transform:uppercase;">CLAIM</button>'
                        : achState.claimedReward ?
                            '<span style="font-size:7px;color:#22c55e;font-weight:700;">CLAIMED ✓</span>'
                        : '') +
                    '</div>' +
                    '<div style="font-size:8px;color:#64748b;margin-top:2px;">' + ach.desc + '</div>' +
                    // Progress bar
                    '<div style="margin-top:5px;background:rgba(255,255,255,0.08);border-radius:4px;height:6px;overflow:hidden;">' +
                        '<div style="height:100%;width:' + progressPct + '%;background:' + barColor + ';border-radius:4px;transition:width 0.3s;"></div>' +
                    '</div>' +
                    '<div style="display:flex;justify-content:space-between;margin-top:3px;">' +
                        '<span style="font-size:7px;color:#64748b;">' + _formatNumber(currentVal) + ' / ' + _formatNumber(ach.target) + '</span>' +
                        '<span style="font-size:7px;color:#94a3b8;">🎁 ' + rewardText + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    contentEl.innerHTML = '<div style="display:flex;flex-direction:column;gap:6px;padding:2px 0;">' + cardsHtml + '</div>';
}

// --- HELPERS ---
function _formatReward(reward) {
    var parts = [];
    if (reward.money) parts.push('$' + reward.money.toLocaleString());
    if (reward.diamond) parts.push(reward.diamond + ' 💎');
    if (reward.bazingaPoints) parts.push(reward.bazingaPoints + ' ⚡');
    if (reward.title) parts.push('🏷️ "' + reward.title + '"');
    return parts.join(' + ');
}

function _formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
}

// --- ACHIEVEMENT NOTIFICATION COUNT (for badges) ---
function getAchievementNotificationCount() {
    if (!state.achievements) return 0;
    var count = 0;
    for (var id in state.achievements) {
        if (state.achievements[id].unlocked && !state.achievements[id].claimedReward) count++;
    }
    return count;
}
