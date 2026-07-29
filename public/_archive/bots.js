// ==========================================
// TBBT IDLE GAME - AI BOT SIMULATION ENGINE
// ==========================================
// This script runs a decentralized background simulation
// It randomly selects a bot and slightly increments its progress.
// By having every real player run this loop, the bots naturally climb
// leaderboards and feel completely alive without needing a central server!

let botSimulationInterval = null;

function startBotSimulationEngine() {
    if (botSimulationInterval) clearInterval(botSimulationInterval);
    
    // Run the simulation loop every 60 seconds (only if player is active)
    botSimulationInterval = setInterval(simulateSingleBot, 60000);
    console.log('[Bot Engine] Decentralized AI Simulation Started.');
}

async function simulateSingleBot() {
    if (!db || typeof currentUser === 'undefined' || !currentUser) return;
    
    try {
        // Fetch 5 random bots from the leaderboard
        const { data: bots, error } = await db.from('leaderboard')
            .select('*')
            .eq('is_bot', true)
            .limit(5);
            
        if (error || !bots || bots.length === 0) return;
        
        // Pick one randomly to simulate
        const bot = bots[Math.floor(Math.random() * bots.length)];
        
        // 1. Simulate Progress
        // 70% chance to gain a wave, 30% chance to farm score
        let newWave = bot.wave || 1;
        let newScore = parseInt(bot.score) || 0;
        
        if (Math.random() < 0.7) {
            newWave += Math.floor(Math.random() * 2) + 1; // Gain 1-2 waves
        }
        
        // Score increases based on current wave level
        newScore += Math.floor(Math.random() * (newWave * 50)) + 10;
        
        // 2. Simulate Character Level Ups
        let lineup = [];
        try {
            if (typeof bot.lineup === 'string') lineup = JSON.parse(bot.lineup);
            else lineup = bot.lineup || [];
        } catch(e) {}
        
        if (lineup && lineup.length > 0) {
            // Pick a random character in their lineup to level up
            const charToUpgrade = lineup[Math.floor(Math.random() * lineup.length)];
            if (Math.random() < 0.4) {
                charToUpgrade.level = (charToUpgrade.level || 1) + 1;
            }
        }
        
        // 3. Update the bot in Supabase
        await db.from('leaderboard')
            .update({
                wave: newWave,
                score: newScore,
                lineup: lineup,
                updated_at: new Date().toISOString()
            })
            .eq('id', bot.id);
            
        // 4. Guild Simulation (Optional 10% chance)
        // If the bot isn't in a guild, they might join one!
        if (Math.random() < 0.1) {
            const { data: guildMembership } = await db.from('guild_members').select('guild_id').eq('user_id', bot.id).maybeSingle();
            
            if (!guildMembership) {
                // Find a random open guild with space
                const { data: openGuilds } = await db.from('guilds')
                    .select('id, members_count')
                    .eq('is_public', true)
                    .lt('members_count', 30) // assuming max 30
                    .limit(10);
                    
                if (openGuilds && openGuilds.length > 0) {
                    const targetGuild = openGuilds[Math.floor(Math.random() * openGuilds.length)];
                    
                    // Join guild
                    await db.from('guild_members').insert({
                        guild_id: targetGuild.id,
                        user_id: bot.id,
                        role: 'member',
                        username: bot.username,
                        is_bot: true
                    });
                    
                    // Increment members count
                    await db.rpc('increment_guild_members', { g_id: targetGuild.id });
                }
            }
        }
        
    } catch (e) {
        // Silently fail, it's just background simulation
        // console.warn('[Bot Engine] Simulation error:', e);
    }
}
