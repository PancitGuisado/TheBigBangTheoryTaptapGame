
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const html = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/supabase.js', 'utf8');
const supaUrlMatch = html.match(/const SUPABASE_URL = '([^']+)';/);
const supaKeyMatch = html.match(/const SUPABASE_ANON_KEY = '([^']+)';/);

if (supaUrlMatch && supaKeyMatch) {
    const supabase = createClient(supaUrlMatch[1], supaKeyMatch[1]);
    
    const adjectives = ['Pro', 'Elite', 'Master', 'Grand', 'Legend', 'Savage', 'Fierce', 'Titan', 'Apex', 'Prime', 'Supreme', 'God', 'King', 'Champion', 'Hero'];
    const nouns = ['Killer', 'Slayer', 'Striker', 'Crusher', 'Dominator', 'Warrior', 'Fighter', 'Gladiator', 'Spartan', 'Vanguard', 'Assassin', 'Ninja', 'Samurai'];
    
    const characters = ['sheldon', 'leonard', 'penny', 'howard', 'raj', 'amy', 'bernie', 'stuart'];
    const botKeys = ['bazinga_bot', 'physics_bot', 'quantum_bot', 'string_bot', 'dark_matter_bot'];
    
    const skins = {
        sheldon: ['default', 'flash', 'spock', 'doppler', 'train'],
        leonard: ['default', 'knight', 'hobbit', 'green_lantern'],
        penny: ['default', 'wonder_woman', 'ape', 'bartender'],
        howard: ['default', 'astronaut', 'batman', 'magic'],
        raj: ['default', 'aquaman', 'sweater', 'koothrappali'],
        amy: ['default', 'tiara', 'harp', 'neuro'],
        bernie: ['default', 'smurf', 'micro', 'pageant'],
        stuart: ['default', 'comic', 'zombie', 'cape']
    };
    
    function generateUUID() {
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c==='x' ? r : (r&0x3|0x8)).toString(16);
        });
    }

    async function deployBots() {
        console.log('Generating 100 strong bots...');
        let botInserts = [];
        
        for (let i = 0; i < 100; i++) {
            let adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            let noun = nouns[Math.floor(Math.random() * nouns.length)];
            let num = Math.floor(Math.random() * 9999);
            let username = adj + noun + num;
            
            // Strong bots: Trophies 1000 to 4500
            let trophies = 1000 + Math.floor(Math.random() * 3500);
            
            // Higher waves to look realistic (15 to 40)
            let wave = 15 + Math.floor(Math.random() * 25);
            let score = wave * 400 + Math.floor(Math.random() * 2000);
            let bazinga_points = wave * 3 + Math.floor(Math.random() * 15);
            
            // Lineup
            let lineup = [];
            let numChars = 3 + Math.floor(Math.random() * 3); // 3 to 5
            let shuffledChars = [...characters].sort(() => 0.5 - Math.random());
            let roster = {};
            let equipped = {};
            for(let j=0; j<numChars; j++) {
                let char = shuffledChars[j];
                // Levels between 8 and 25
                let lvl = 8 + Math.floor(Math.random() * 18);
                let charSkins = skins[char];
                let skin = charSkins[Math.floor(Math.random() * charSkins.length)];
                lineup.push({ type: 'char', key: char, lane: 'mid' });
                roster[char] = { level: lvl, activeSkin: skin };
                equipped[char] = true;
            }
            
            // Robots
            let robots = [];
            let robotRoster = {};
            let numBots = 1 + Math.floor(Math.random() * 3); // 1 to 3
            let shuffledBots = [...botKeys].sort(() => 0.5 - Math.random());
            for(let j=0; j<numBots; j++) {
                let bot = shuffledBots[j];
                let lvl = 4 + Math.floor(Math.random() * 12); // levels 4 to 15
                robotRoster[bot] = { level: lvl, equipped: true };
            }
            
            // Skills
            let skillTree = {};
            let numSkills = Math.floor(bazinga_points / 3);
            for(let j=0; j<Math.min(numSkills, 20); j++) {
                skillTree['skill_' + j] = true;
            }
            
            let stateObj = {
                username: username,
                wave: wave,
                score: score,
                bazingaPoints: bazinga_points,
                roster: roster,
                equipped: equipped,
                robotRoster: robotRoster,
                skillTree: skillTree,
                pvp: {
                    trophies: trophies,
                    lineup: lineup
                }
            };
            
            botInserts.push({
                id: generateUUID(),
                state: stateObj,
                is_bot: true,
                updated_at: new Date().toISOString()
            });
        }
        
        console.log('Inserting into game_saves...');
        const { data, error } = await supabase.from('game_saves').upsert(botInserts);
        
        if (error) {
            console.error('Error inserting strong bots:', error);
        } else {
            console.log('Successfully deployed 100 strong bots via game_saves trigger!');
        }
    }
    
    deployBots();
}

