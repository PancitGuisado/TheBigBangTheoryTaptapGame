// ========================================================
// MOD ACCOUNT SCRIPT — Run this ONCE in browser console
// Target: sheldog (brylehahaha@gmail.com)
// ========================================================
// This script updates both the local game state AND pushes
// the modded save to Supabase cloud, so it persists.
// ========================================================

(async function modAccount() {
    // Verify we're logged in as the right user
    if (!currentUser || isGuest) {
        console.error('❌ You must be logged in first! Log in as brylehahaha@gmail.com');
        return;
    }
    
    console.log('🔧 MOD MODE ACTIVATED for:', currentUser.email || currentUser.id);
    
    // ══════════════════════════════════════════════
    // 1. UNLIMITED RESOURCES
    // ══════════════════════════════════════════════
    state.resources.money    = 999999999;
    state.resources.stone    = 999999999;
    state.resources.iron     = 999999999;
    state.resources.gold     = 999999999;
    state.resources.diamond  = 999999999;
    state.resources.scrap    = 999999999;
    
    // ══════════════════════════════════════════════
    // 2. HIGH WAVE + SCORE
    // ══════════════════════════════════════════════
    state.wave  = 200;
    state.score = 99999999;
    state.minionsDefeated = 999999;
    state.stats.highestWave = 200;
    state.stats.totalKills = 999999;
    state.stats.bossKills = 9999;
    state.stats.moneyEarned = 999999999;
    state.stats.totalDamage = 999999999;
    
    // ══════════════════════════════════════════════
    // 3. MAX BAZINGA POINTS + PERKS
    // ══════════════════════════════════════════════
    state.bazingaPoints = 999999;
    state.perks.dmgMult     = 50;
    state.perks.dropMult    = 50;
    state.perks.robotDmgMult = 50;
    
    // ══════════════════════════════════════════════
    // 4. HIGH LEVEL ALL CHARACTERS (Level 100)
    // ══════════════════════════════════════════════
    var allSkins = ['default', 'animal', 'army', 'justice', 'starwars', 'mythology', 'prime'];
    
    for (var charKey in characters) {
        if (!state.roster[charKey]) {
            var cfg = characters[charKey];
            state.roster[charKey] = {
                level: 0,
                currentHp: cfg.baseHp || 100,
                maxHp: cfg.baseHp || 100,
                status: 'healthy',
                hospitalEndTime: 0,
                activeSkin: 'default',
                unlockedSkins: ['default']
            };
        }
        
        state.roster[charKey].level = 100;
        var hpScale = characters[charKey].lane === 'front' ? 1.40 : 1.25;
        var maxHp = Math.floor((characters[charKey].baseHp || 100) * Math.pow(hpScale, 99));
        state.roster[charKey].maxHp = maxHp;
        state.roster[charKey].currentHp = maxHp;
        state.roster[charKey].status = 'healthy';
        state.roster[charKey].hospitalEndTime = 0;
        state.roster[charKey].unlockedSkins = allSkins.slice();
        state.roster[charKey].activeSkin = 'mythology'; // Epic gold skin
    }
    
    // ══════════════════════════════════════════════
    // 5. UNLOCK ALL LOCATIONS
    // ══════════════════════════════════════════════
    if (typeof locationOrder !== 'undefined') {
        state.unlockedLocations = locationOrder.slice();
    }
    state.stats.locationsUnlocked = state.unlockedLocations.length;
    
    // ══════════════════════════════════════════════
    // 6. STORY FLAGS
    // ══════════════════════════════════════════════
    state.story_wave80_seen = true;
    state.hasSeenIntro = true;
    state.tutorialComplete = true;
    state.tutorialSkipped = true;
    
    // ══════════════════════════════════════════════
    // 7. PVP TROPHIES
    // ══════════════════════════════════════════════
    state.pvp.trophies = 9999;
    state.pvp.league = 'Legends';
    state.pvp.wins = 999;
    
    // ══════════════════════════════════════════════
    // 8. FOOD SUPPLIES
    // ══════════════════════════════════════════════
    var foodKeys = Object.keys(state.food);
    for (var f = 0; f < foodKeys.length; f++) {
        state.food[foodKeys[f]] = 9999;
    }
    
    // ══════════════════════════════════════════════
    // 9. SAVE TO LOCAL + CLOUD
    // ══════════════════════════════════════════════
    saveProgress();
    
    // Force immediate cloud save (bypass debounce)
    if (supabase && currentUser && !isGuest) {
        try {
            await supabase.from('game_saves').upsert({
                id: currentUser.id,
                state: state,
                updated_at: new Date().toISOString()
            });
            
            await supabase.from('leaderboard').upsert({
                id: currentUser.id,
                username: 'sheldog',
                score: state.score,
                wave: state.wave,
                trophies: state.pvp.trophies,
                bazinga_points: state.bazingaPoints,
                updated_at: new Date().toISOString()
            });
            
            console.log('☁️ Cloud save complete!');
        } catch(e) {
            console.warn('Cloud save error:', e.message);
        }
    }
    
    console.log('');
    console.log('╔══════════════════════════════════════╗');
    console.log('║   🎮 MOD ACCOUNT ACTIVATED! 🎮      ║');
    console.log('╠══════════════════════════════════════╣');
    console.log('║ 💰 Money:     999,999,999            ║');
    console.log('║ 💎 Diamonds:  999,999,999            ║');
    console.log('║ 🌊 Wave:      200                    ║');
    console.log('║ ⭐ Score:     99,999,999             ║');
    console.log('║ 🧪 BP:        999,999                ║');
    console.log('║ 👥 All Chars: Level 100              ║');
    console.log('║ 🗺️ All Maps:  Unlocked               ║');
    console.log('║ 🏆 Trophies:  9,999                  ║');
    console.log('║ 🍔 All Food:  9,999 each             ║');
    console.log('║ 🌀 YS Story:  Completed              ║');
    console.log('╚══════════════════════════════════════╝');
    console.log('');
    console.log('🔄 Refresh the page to see all changes!');
    
    // Update UI immediately
    if (typeof updateResourceDisplays === 'function') updateResourceDisplays();
    if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
    
    alert('🎮 MOD ACTIVATED!\n\n💰 999M Money\n💎 999M Diamonds\n🌊 Wave 200\n👥 All characters Level 100\n🧪 999K Bazinga Points\n🗺️ All maps unlocked\n\nRefresh the page!');
})();
