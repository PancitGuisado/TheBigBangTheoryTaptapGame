const fs = require('fs');

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

let sql = '-- DEPLOY 100 STRONG BOTS FOR ARENA MATCHMAKING\n\n';

for (let i = 0; i < 100; i++) {
    let adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    let noun = nouns[Math.floor(Math.random() * nouns.length)];
    let num = Math.floor(Math.random() * 9999);
    let username = adj + noun + num;
    
    let trophies = 1000 + Math.floor(Math.random() * 3500);
    let wave = 15 + Math.floor(Math.random() * 25);
    let score = wave * 400 + Math.floor(Math.random() * 2000);
    let bazinga_points = wave * 3 + Math.floor(Math.random() * 15);
    
    let lineup = [];
    let numChars = 3 + Math.floor(Math.random() * 3); // 3 to 5
    let shuffledChars = [...characters].sort(() => 0.5 - Math.random());
    let roster = {};
    let equipped = {};
    for(let j=0; j<numChars; j++) {
        let char = shuffledChars[j];
        let lvl = 8 + Math.floor(Math.random() * 18);
        let charSkins = skins[char];
        let skin = charSkins[Math.floor(Math.random() * charSkins.length)];
        lineup.push({ type: 'char', key: char, lane: 'mid' });
        roster[char] = { level: lvl, activeSkin: skin };
        equipped[char] = true;
    }
    
    let robots = [];
    let robotRoster = {};
    let numBots = 1 + Math.floor(Math.random() * 3); // 1 to 3
    let shuffledBots = [...botKeys].sort(() => 0.5 - Math.random());
    for(let j=0; j<numBots; j++) {
        let bot = shuffledBots[j];
        let lvl = 4 + Math.floor(Math.random() * 12);
        robotRoster[bot] = { level: lvl, equipped: true };
    }
    
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
    
    let id = generateUUID();
    let stateStr = JSON.stringify(stateObj).replace(/'/g, "''");
    sql += `INSERT INTO game_saves (id, state, updated_at, is_bot) VALUES ('${id}', '${stateStr}'::jsonb, NOW(), true) ON CONFLICT (id) DO UPDATE SET state = EXCLUDED.state, updated_at = NOW();\n`;
}

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/deploy_strong_bots.sql', sql);
console.log('Generated deploy_strong_bots.sql');
