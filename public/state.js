// Global System State Data Registers
let state = { 
    resources: { 
        money: 50, 
        stone: 0, 
        iron: 0, 
        gold: 0, 
        diamond: 0, 
        scrap: 0 
    }, 
    roster: { 
        sheldon: { level: 1, currentHp: 100, maxHp: 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        penny: { level: 0, currentHp: 100, maxHp: 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        leonard: { level: 0, currentHp: 100, maxHp: 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        howard: { level: 0, currentHp: 100, maxHp: 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        raj: { level: 0, currentHp: 100, maxHp: 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        amy: { level: 0, currentHp: 100, maxHp: 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        bernie: { level: 0, currentHp: 100, maxHp: 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        stuart: { level: 0, currentHp: 100, maxHp: 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        mary: { level: 0, currentHp: 85, maxHp: 85, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        beverly: { level: 0, currentHp: 95, maxHp: 95, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        proton: { level: 0, currentHp: 350, maxHp: 350, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        kripke: { level: 0, currentHp: 80, maxHp: 80, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        leslie: { level: 0, currentHp: 70, maxHp: 70, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        bert: { level: 0, currentHp: 450, maxHp: 450, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        wil: { level: 0, currentHp: 130, maxHp: 130, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        zack: { level: 0, currentHp: 380, maxHp: 380, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        emily: { level: 0, currentHp: 90, maxHp: 90, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] },
        denise: { level: 0, currentHp: 100, maxHp: 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] }
    }, 
    equipped: { sheldon: true },
    formation: {
        front: [null, null],
        mid: [null, null, null],
        back: [null, null, null]
    },
    robots: [],        // Deployed mechanical units: { id, blueprintId, name, type, lane, level }
    robotRoster: {},   // Unlocked robots: { r2d2_unit: { level: 1, equippedTo: 'sheldon' }, ... }
    botSlots: 1,       // Maximum number of bots that can be equipped simultaneously
    craftingQueue: [], // Active factory lines: { id, blueprintId, startTime, endTime, duration }
    food: { 
        chinese: 0, pizza: 0, cupcakes: 0, burger: 0, tacos: 0, 
        indian: 0, hotdog: 0, pretzel: 0, smoothie: 0, energydrink: 0, 
        cheesecake: 0, shawarma: 0 
    },
    currentLocation: 'sheldons_apt',  // Current map location
    hospitalized: [],  // Array of char keys in hospital: ['leonard', 'raj']
    wave: 1, 
    minionsDefeated: 0,
    score: 0,
    unlockedLocations: ['sheldons_apt'], // Array of keys for unlocked maps
    bazingaPoints: 0, // Prestige currency
    perks: {          // Bazinga Point Upgrades
        dmgMult: 0,
        dropMult: 0,
        robotDmgMult: 0
    },
    pvp: {
        season: 1,
        trophies: 0,
        league: 'Bronze',
        wins: 0,
        losses: 0,
        lineup: [],       // [{type:'char',key:'sheldon'}, {type:'bot',key:'r2d2_unit'}]
    },
    // --- NEW SYSTEMS ---
    lastOnlineTimestamp: Date.now(),
    autoBoss: false,
    battleSpeed: 1,
    notificationsEnabled: true,
    dailyRewards: { lastClaim: null, streak: 0, day: 0, cycle: 1 },
    achievements: {},
    stats: {
        totalKills: 0, bossKills: 0, pvpWins: 0, pvpLosses: 0,
        foodUsed: 0, robotsCrafted: 0, moneyEarned: 0, moneySpent: 0,
        charactersHired: 0, locationsUnlocked: 1, bazingaSpent: 0,
        highestWave: 1, totalDamage: 0, dailyLoginsTotal: 0
    },
    quests: { daily: [], weekly: [], lastDailyReset: null, lastWeeklyReset: null },
    inventory: [],
    charEquipment: {},
    events: { active: null, history: [], tokens: 0, bossRushProgress: 0, speedChallengeStart: 0, speedChallengeBest: 0 },
    minigames: { rpslsPlaysToday: 0, rpslsLastReset: null, triviaPlaysToday: 0, triviaLastReset: null, triviaHighScore: 0 },
    campaign: { chapter: 1, completed: [], stars: {} },
    friends: [],
    battleLog: [],
    autoHealEnabled: false,
    hasSeenIntro: false,
    tutorialComplete: false,
    tutorialStepsCompleted: [],
    tutorialSkipped: false,
    bestiary: {},
    gacha: { pity: 0, totalPulls: 0, history: [] },
    dialoguesSeen: [],
    guildRaid: { attacksToday: 0, lastAttackDate: null, totalDamageDealt: 0, totalStars: 0, bestAttack: 0, raidHistory: [] },
    guildWar: { phase: 'idle', enemy: null, enemyBases: [], myStars: 0, enemyStars: 0, attacks: [], attacksUsed: 0, warStartTime: null, warHistory: [], totalWins: 0, totalLosses: 0, totalDraws: 0, warStreak: 0 },
    muted: false
};

let currentEnemy = { type: null, maxHp: 100, hp: 100 };
let gameTimers = {};
let activeModalKey = null;
let sheldonTapBuff = 0.0; 

// Dynamic Combat Modifiers
let rageDuration = 0;
let partyHealthPct = 100;
let isBossActive = false;
let bossTimer = 0;
let bossTimerId = null;

let isSpectating = false;
let spectateState = null;
let originalState = null;

// ============================================================
// SAVE KEY
// ============================================================
var SAVE_KEY = 'sheldonPasadenaBattleV10';

// ============================================================
// SAVE PROGRESS
// ============================================================
// Guest  → localStorage ONLY
// Online → Cloud (Supabase) + localStorage as fast cache
// ============================================================
function saveProgress() {
    if (isSpectating) return;

    state.lastOnlineTimestamp = Date.now();

    // --- ALWAYS save to localStorage (works as primary for guest, cache for online) ---
    try {
        var json = JSON.stringify(state);
        if (json && json.length > 10) {
            localStorage.setItem(SAVE_KEY, json);
        }
    } catch (e) {
        console.warn('[SAVE] localStorage write failed:', e.message);
    }

    // --- If logged in, also push to cloud ---
    if (typeof isGuest !== 'undefined' && !isGuest && typeof cloudSave === 'function') {
        cloudSave(state);
    }
}

// ============================================================
// LOAD PROGRESS (local only — cloud is loaded separately on login)
// ============================================================
function loadProgress() {
    var raw = null;
    try {
        raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem('sheldonPasadenaBattleV9');
    } catch (e) {
        console.warn('[LOAD] localStorage read failed:', e.message);
    }

    if (raw) {
        try {
            var parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                applyLoadedState(parsed);
                console.log('[LOAD] Local save loaded — wave=' + state.wave + ' money=' + state.resources.money);
            }
        } catch (e) {
            console.error('[LOAD] Failed to parse save data:', e.message);
        }
    } else {
        console.log('[LOAD] No local save found — fresh game');
    }
}

// ============================================================
// LOAD FROM CLOUD (called after login / session restore)
// ============================================================
async function loadFromCloud() {
    if (typeof supabase === 'undefined' || !supabase) return false;
    if (typeof currentUser === 'undefined' || !currentUser) return false;

    try {
        var result = await supabase.from('game_saves').select('state').eq('id', currentUser.id).maybeSingle();
        if (result.data && result.data.state && typeof result.data.state === 'object') {
            var cloudState = result.data.state;
            // Only load if cloud has actual progress
            if (cloudState.wave && cloudState.wave >= 1) {
                applyLoadedState(cloudState);
                // Cache it locally too
                try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch(e) {}
                console.log('[CLOUD] Cloud save loaded — wave=' + state.wave + ' money=' + state.resources.money);
                return true;
            }
        }
    } catch (e) {
        console.error('[CLOUD] Failed to load cloud save:', e.message);
    }
    return false;
}

// ============================================================
// MIGRATE LOCAL SAVE → CLOUD (when guest connects account)
// ============================================================
async function migrateLocalToCloud() {
    if (typeof supabase === 'undefined' || !supabase) return;
    if (typeof currentUser === 'undefined' || !currentUser) return;
    if (typeof isGuest !== 'undefined' && isGuest) return;

    // Use current in-memory state (which has local progress)
    if (state.wave > 1 || state.score > 0) {
        state.lastOnlineTimestamp = Date.now();
        await cloudSave(state);
        console.log('[MIGRATE] Local progress pushed to cloud — wave=' + state.wave);
    }
}

// ============================================================
// APPLY LOADED STATE + MIGRATIONS
// ============================================================
function applyLoadedState(parsed) {
    state = { ...state, ...parsed };

    // Core Ledger Fallback Migrations
    if (!state.resources) state.resources = { money: 50 };
    if (state.resources.stone === undefined) state.resources.stone = 0;
    if (state.resources.iron === undefined) state.resources.iron = 0;
    if (state.resources.gold === undefined) state.resources.gold = 0;
    if (state.resources.diamond === undefined) state.resources.diamond = 0;
    if (state.resources.scrap === undefined) state.resources.scrap = 0;

    if (!state.robots) state.robots = [];
    if (!state.robotRoster) state.robotRoster = {};
    if (!state.craftingQueue) state.craftingQueue = [];
    if (!state.equipped) state.equipped = { sheldon: true };

    // Formation System Migration
    if (!state.formation || !state.formation.front) {
        state.formation = { front: [null, null], mid: [null, null, null], back: [null, null, null] };
        if (state.equipped && typeof characters !== 'undefined') {
            for (var key in state.equipped) {
                if (!state.equipped[key] || !characters[key]) continue;
                var lane = characters[key].lane || 'back';
                var slots = state.formation[lane];
                var emptyIdx = slots.indexOf(null);
                if (emptyIdx !== -1) slots[emptyIdx] = { type: 'char', key: key };
            }
        }
        if (state.robots && typeof robots !== 'undefined') {
            state.robots.forEach(function(robot) {
                if (!robot || !robot.equipped) return;
                var lane = robot.lane || 'front';
                var slots = state.formation[lane];
                var emptyIdx = slots.indexOf(null);
                if (emptyIdx !== -1) slots[emptyIdx] = { type: 'bot', key: robot.blueprintId };
            });
        }
    }
    if (!state.formation.bots) state.formation.bots = [null, null, null];

    // Character Health System Migrations
    if (!state.food) state.food = { chinese: 0, pizza: 0, cupcakes: 0, burger: 0, tacos: 0, indian: 0, hotdog: 0, pretzel: 0, smoothie: 0, energydrink: 0, cheesecake: 0, shawarma: 0 };
    if (!state.currentLocation) state.currentLocation = 'sheldons_apt';
    if (!state.hospitalized) state.hospitalized = [];

    // Add health to all roster characters
    for (var rKey in state.roster) {
        var charData = state.roster[rKey];
        if (charData.level === undefined) charData.level = 0;
        if (charData.maxHp === undefined) charData.maxHp = Math.max(100, charData.level * 100);
        if (charData.currentHp === undefined) charData.currentHp = charData.maxHp;
        if (charData.status === undefined) charData.status = 'healthy';
        if (charData.hospitalEndTime === undefined) charData.hospitalEndTime = 0;
        if (charData.activeSkin === undefined) charData.activeSkin = 'default';
        if (!charData.unlockedSkins) charData.unlockedSkins = ['default'];
    }

    // New Systems Migrations
    if (!state.lastOnlineTimestamp) state.lastOnlineTimestamp = Date.now();
    if (state.autoBoss === undefined) state.autoBoss = false;
    if (!state.battleSpeed) state.battleSpeed = 1;
    if (state.muted === undefined) state.muted = false;
    if (!state.dailyRewards) state.dailyRewards = { lastClaim: null, streak: 0, day: 0, cycle: 1 };
    if (!state.achievements) state.achievements = {};
    if (!state.stats) state.stats = { totalKills: 0, bossKills: 0, pvpWins: 0, pvpLosses: 0, foodUsed: 0, robotsCrafted: 0, moneyEarned: 0, moneySpent: 0, charactersHired: 0, locationsUnlocked: 1, bazingaSpent: 0, highestWave: 1, totalDamage: 0, dailyLoginsTotal: 0 };
    if (!state.quests) state.quests = { daily: [], weekly: [], lastDailyReset: null, lastWeeklyReset: null };
    if (!state.inventory) state.inventory = [];
    if (!state.charEquipment) state.charEquipment = {};
    if (!state.events) state.events = { active: null, history: [], tokens: 0, bossRushProgress: 0, speedChallengeStart: 0, speedChallengeBest: 0 };
    if (!state.minigames) state.minigames = { rpslsPlaysToday: 0, rpslsLastReset: null, triviaPlaysToday: 0, triviaLastReset: null, triviaHighScore: 0 };
    if (!state.bestiary) state.bestiary = {};
    if (!state.gacha) state.gacha = { pity: 0, totalPulls: 0, history: [] };
    if (state.tutorialComplete === undefined) state.tutorialComplete = false;
    if (!state.tutorialStepsCompleted) state.tutorialStepsCompleted = [];
    if (state.tutorialSkipped === undefined) state.tutorialSkipped = false;
    // Migrate: if old tutorialComplete is true, mark new system as skipped so it doesn't re-trigger
    if (state.tutorialComplete && (!state.tutorialStepsCompleted || state.tutorialStepsCompleted.length === 0)) {
        state.tutorialSkipped = true;
    }
    if (!state.dialoguesSeen) state.dialoguesSeen = [];
    if (!state.guildRaid) state.guildRaid = { attacksToday: 0, lastAttackDate: null, totalDamageDealt: 0, totalStars: 0, bestAttack: 0, raidHistory: [] };
    if (!state.guildWar) state.guildWar = { phase: 'idle', enemy: null, enemyBases: [], myStars: 0, enemyStars: 0, attacks: [], attacksUsed: 0, warStartTime: null, warHistory: [], totalWins: 0, totalLosses: 0, totalDraws: 0, warStreak: 0 };
    if (!state.stats.prestigeCount) state.stats.prestigeCount = 0;
    if (!state.stats.totalBPEarned) state.stats.totalBPEarned = 0;
    if (!state.stats.playStartTime) state.stats.playStartTime = Date.now();
    if (!state.perks) state.perks = { dmgMult: 0, dropMult: 0, robotDmgMult: 0 };
    if (!state.perks.waveSkip) state.perks.waveSkip = 0;
    if (state.perks.fastHospital === undefined) state.perks.fastHospital = false;
    if (state.perks.luckyDrops === undefined) state.perks.luckyDrops = false;
    // Campaign, Friends, BattleLog, AutoHeal migrations
    if (!state.campaign) state.campaign = { chapter: 1, completed: [], stars: {} };
    if (!state.friends) state.friends = [];
    if (!state.battleLog) state.battleLog = [];
    if (state.autoHealEnabled === undefined) state.autoHealEnabled = false;
    if (state.notificationsEnabled === undefined) state.notificationsEnabled = true;
    // PvP migrations
    if (!state.pvp) state.pvp = { season: 1, trophies: 0, league: 'Bronze', wins: 0, losses: 0, lineup: [] };
    if (!state.pvp.lineup) state.pvp.lineup = [];
    // Intro/Tutorial/Location migrations
    if (state.hasSeenIntro === undefined) state.hasSeenIntro = false;
    if (!state.unlockedLocations) state.unlockedLocations = ['sheldons_apt'];
}