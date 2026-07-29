// Direct Supabase mod script for Sheldog
const https = require('https');

const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkc2JweGxhY3d1eW1iZHRqd3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzOTg0MTYsImV4cCI6MjA5Njk3NDQxNn0.Bhkd4r-FW_Yszb_gAKIeEiUpMgSJ17yLZjtfeI5kSIg';
const HOST = 'tdsbpxlacwuymbdtjwrn.supabase.co';
const UID = '61b7ec9c-9cbd-4e68-9677-53078c2e0a6a';

// Step 1: Fetch current save
function fetchSave() {
    return new Promise((resolve, reject) => {
        https.get({
            hostname: HOST,
            path: '/rest/v1/game_saves?id=eq.' + UID + '&select=state',
            headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY }
        }, (res) => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => {
                const arr = JSON.parse(d);
                resolve(arr.length > 0 ? arr[0].state : null);
            });
        }).on('error', reject);
    });
}

// Step 2: Patch and upload
function patchSave(body, table, path) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const req = https.request({
            hostname: HOST,
            path: path,
            method: 'PATCH',
            headers: {
                'apikey': KEY,
                'Authorization': 'Bearer ' + KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal',
                'Content-Length': Buffer.byteLength(data)
            }
        }, (res) => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => {
                console.log(`[${table}] Status: ${res.statusCode}`);
                if (res.statusCode >= 300) console.log('  Response:', d);
                resolve(res.statusCode);
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

(async () => {
    console.log('🔧 Fetching current save for Sheldog...');
    const s = await fetchSave();
    if (!s) { console.error('❌ No save found!'); return; }
    
    console.log('📊 Current: Wave', s.wave, '| Money', s.resources?.money);
    
    // ── MOD THE STATE ──
    
    // Resources
    s.resources = { money: 999999999, stone: 999999999, iron: 999999999, gold: 999999999, diamond: 999999999, scrap: 999999999 };
    
    // Wave & Score
    s.wave = 200;
    s.score = 99999999;
    s.minionsDefeated = 999999;
    
    // Bazinga Points & Perks
    s.bazingaPoints = 999999;
    s.perks = { dmgMult: 50, dropMult: 50, robotDmgMult: 50 };
    
    // Stats
    s.stats = s.stats || {};
    s.stats.highestWave = 200;
    s.stats.totalKills = 999999;
    s.stats.bossKills = 9999;
    s.stats.moneyEarned = 999999999;
    s.stats.totalDamage = 999999999;
    s.stats.locationsUnlocked = 16;
    
    // PvP
    s.pvp = s.pvp || {};
    s.pvp.trophies = 9999;
    s.pvp.league = 'Legends';
    s.pvp.wins = 999;
    
    // Story flags
    s.story_wave80_seen = true;
    s.hasSeenIntro = true;
    s.tutorialComplete = true;
    
    // All locations unlocked
    s.unlockedLocations = [
        'sheldons_apt', 'pennys_apt', 'chocolate_factory', 'cheesecake_factory',
        'bernie_house', 'comic_store', 'howards_house', 'rajs_apt',
        'pasadena_museum', 'caltech',
        'ys_cooper_home', 'ys_high_school', 'ys_texas_ranch',
        'ys_desert', 'ys_museum', 'ys_chaos_lab'
    ];
    
    // Food
    s.food = s.food || {};
    for (const fk of ['chinese','pizza','cupcakes','burger','tacos','indian','hotdog','pretzel','smoothie','energydrink','cheesecake','shawarma']) {
        s.food[fk] = 9999;
    }
    
    // All characters level 100 with all skins
    const allSkins = ['default', 'animal', 'army', 'justice', 'starwars', 'mythology', 'prime'];
    const charKeys = [
        'sheldon','penny','leonard','howard','raj','amy','bernie','stuart',
        'mary','beverly','proton','kripke','leslie','bert','wil','zack','emily','denise',
        'ys_young_sheldon','ys_missy','ys_george','ys_meemaw','ys_sturgis',
        'ys_billy','ys_georgie','ys_tam','ys_pastor_jeff','ys_pastor_rob'
    ];
    
    const baseHps = {
        sheldon:80, penny:100, leonard:250, howard:120, raj:90, amy:110, bernie:130,
        stuart:300, mary:120, beverly:95, proton:350, kripke:80, leslie:70, bert:450,
        wil:130, zack:380, emily:90, denise:100,
        ys_young_sheldon:60, ys_missy:65, ys_george:500, ys_meemaw:110,
        ys_sturgis:75, ys_billy:400, ys_georgie:150, ys_tam:70,
        ys_pastor_jeff:100, ys_pastor_rob:85
    };
    
    const frontliners = ['leonard','stuart','proton','bert','zack','ys_george','ys_billy'];
    
    s.roster = s.roster || {};
    for (const ck of charKeys) {
        const hp = baseHps[ck] || 100;
        const isFront = frontliners.includes(ck);
        const hpScale = isFront ? 1.40 : 1.25;
        const maxHp = Math.floor(hp * Math.pow(hpScale, 99));
        
        s.roster[ck] = {
            level: 100,
            currentHp: maxHp,
            maxHp: maxHp,
            status: 'healthy',
            hospitalEndTime: 0,
            activeSkin: 'mythology',
            unlockedSkins: allSkins.slice()
        };
    }
    
    // Equip best squad
    s.equipped = { sheldon: true, penny: true, leonard: true, howard: true, raj: true };
    
    s.lastOnlineTimestamp = Date.now();
    
    // ── PUSH TO SUPABASE ──
    console.log('☁️ Pushing modded save to cloud...');
    
    await patchSave(
        { state: s, updated_at: new Date().toISOString() },
        'game_saves',
        '/rest/v1/game_saves?id=eq.' + UID
    );
    
    await patchSave(
        { 
            username: 'Sheldog',
            score: 99999999,
            wave: 200,
            trophies: 9999,
            bazinga_points: 999999,
            updated_at: new Date().toISOString()
        },
        'leaderboard',
        '/rest/v1/leaderboard?id=eq.' + UID
    );
    
    console.log('');
    console.log('╔══════════════════════════════════╗');
    console.log('║  🎮 SHELDOG MODDED SUCCESSFULLY  ║');
    console.log('╠══════════════════════════════════╣');
    console.log('║ 💰 Money:     999,999,999        ║');
    console.log('║ 💎 Diamonds:  999,999,999        ║');
    console.log('║ 🌊 Wave:      200                ║');
    console.log('║ ⭐ Score:     99,999,999         ║');
    console.log('║ 🧪 BP:        999,999            ║');
    console.log('║ 👥 28 Chars:  Level 100          ║');
    console.log('║ 🗺️ 16 Maps:   All Unlocked       ║');
    console.log('║ 🏆 Trophies:  9,999              ║');
    console.log('║ 🌀 YS Story:  Completed          ║');
    console.log('╚══════════════════════════════════╝');
    console.log('');
    console.log('🔄 Now log in to the game and refresh!');
})();
