
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const html = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/supabase.js', 'utf8');
const supaUrlMatch = html.match(/const SUPABASE_URL = '([^']+)';/);
const supaKeyMatch = html.match(/const SUPABASE_ANON_KEY = '([^']+)';/);

if (supaUrlMatch && supaKeyMatch) {
    const supabase = createClient(supaUrlMatch[1], supaKeyMatch[1]);
    
    async function nerfBots() {
        console.log('Fetching bots to nerf trophies...');
        const { data, error } = await supabase.from('leaderboard').select('*');
        if (error) {
            console.error('Error fetching bots:', error);
            return;
        }
        
        let bots = data.filter(d => d.id && d.id.startsWith('00000000-0000-4000-a000-'));
        console.log('Found ' + bots.length + ' bots. Nerfing their trophies and adjusting waves...');
        
        for (let bot of bots) {
            // Cut trophies in half
            let newTrophies = Math.max(0, Math.floor((bot.trophies || 0) * 0.5));
            
            // To make progress 'slower in the long run' aesthetically, we'll squeeze their waves even more
            let newWave = Math.max(1, Math.floor(Math.sqrt(bot.wave) * 2)); 
            let newScore = Math.max(0, Math.floor((bot.score || 0) * 0.5));
            
            await supabase.from('leaderboard').update({
                trophies: newTrophies,
                wave: newWave,
                score: newScore
            }).eq('id', bot.id);
        }
        console.log('Nerfed ' + bots.length + ' bots trophies successfully!');
    }
    
    nerfBots();
}

