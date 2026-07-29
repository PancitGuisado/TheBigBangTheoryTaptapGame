const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const html = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/supabase.js', 'utf8');
const supaUrlMatch = html.match(/const SUPABASE_URL = '([^']+)';/);
const supaKeyMatch = html.match(/const SUPABASE_ANON_KEY = '([^']+)';/);

if (supaUrlMatch && supaKeyMatch) {
    const supabase = createClient(supaUrlMatch[1], supaKeyMatch[1]);
    
    // Bot name prefixes and suffixes
    const adjectives = ['Noob', 'Scrub', 'Easy', 'Free', 'Target', 'Slow', 'Weak', 'Bot', 'Casual', 'Trainee', 'Beginner', 'Bronze', 'Iron', 'Clumsy', 'Dummy'];
    const nouns = ['Player', 'Gamer', 'Geek', 'Nerd', 'Fighter', 'Brawler', 'Striker', 'Slayer', 'Hero', 'Guy', 'Dude', 'Pal', 'Buddy', 'Champ', 'Noobie'];
    
    const characters = ['sheldon', 'leonard', 'penny', 'howard', 'raj', 'amy', 'bernie', 'stuart'];
    const robots = ['r2d2_unit', 'rover_bot', 'quantum_brain'];
    
    function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof process !== 'undefined' && process.hrtime) {
            d += process.hrtime()[1] / 1000000;
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c==='x' ? r : (r&0x3|0x8)).toString(16);
        });
    }

    async function deployBots() {
        console.log("Deploying 100 easy bots...");
        const bots = [];
        
        for (let i = 0; i < 100; i++) {
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const noun = nouns[Math.floor(Math.random() * nouns.length)];
            const num = Math.floor(Math.random() * 9999);
            const username = `${adj}_${noun}${num}`;
            
            // Random trophies between 100 and 3999
            const trophies = Math.floor(Math.random() * 3900) + 100;
            
            // Weak lineup: 2 to 4 characters
            const teamSize = Math.floor(Math.random() * 3) + 2;
            const lineup = [];
            
            // Average level scales slightly with trophies, but stays weak (max level 15)
            const maxLvl = Math.max(1, Math.floor(trophies / 400)); // 1 to 10
            
            const shuffledChars = [...characters].sort(() => 0.5 - Math.random());
            for (let j = 0; j < teamSize; j++) {
                lineup.push({
                    char: shuffledChars[j],
                    level: Math.max(1, Math.floor(Math.random() * maxLvl) + 1),
                    skin: 'default'
                });
            }
            
            // Maybe 1 bot
            const robotList = [];
            if (Math.random() > 0.5) {
                robotList.push({
                    name: robots[Math.floor(Math.random() * robots.length)],
                    level: Math.max(1, Math.floor(maxLvl / 2))
                });
            }
            
            bots.push({
                id: generateUUID(),
                username: username,
                score: Math.floor(Math.random() * 5000),
                wave: Math.floor(Math.random() * 50) + 1,
                location: 'sheldons_apt',
                lineup: lineup,
                robots: robotList,
                skill_tree: {},
                bazinga_points: 0,
                updated_at: new Date().toISOString(),
                trophies: trophies,
                is_bot: true
            });
        }
        
        const { data, error } = await supabase.from('leaderboard').upsert(bots);
        if (error) {
            console.error("Failed to deploy bots:", error);
        } else {
            console.log(`Successfully deployed ${bots.length} easy bots!`);
        }
    }
    
    deployBots();
} else {
    console.log("Could not find supabase credentials");
}
