const fs = require('fs');

const adjectives = ['God', 'Titan', 'Apex', 'Supreme', 'Omni', 'Cosmic', 'Galactic', 'Infinite', 'Mythic', 'Elder', 'Alpha', 'Omega', 'Phantom', 'Emperor'];
const nouns = ['Overlord', 'Destroyer', 'Conqueror', 'Annihilator', 'Warlord', 'Deity', 'Executioner', 'Nemesis', 'Colossus', 'Behemoth', 'Leviathan'];

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

let sql = '-- DEPLOY 50 INSANE BOTS DIRECTLY TO LEADERBOARD\n\n';

for (let i = 0; i < 50; i++) {
    let adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    let noun = nouns[Math.floor(Math.random() * nouns.length)];
    let num = Math.floor(Math.random() * 9999);
    let username = adj + noun + num;
    
    // Trophies 2000 to 6000
    let trophies = 2000 + Math.floor(Math.random() * 4000);
    
    let wave = 30 + Math.floor(Math.random() * 40);
    let score = wave * 600 + Math.floor(Math.random() * 5000);
    let bazinga_points = wave * 4 + Math.floor(Math.random() * 30);
    
    // Lineup MUST contain level so pvp.js can read it!
    let lineup = [];
    let numChars = 4 + Math.floor(Math.random() * 2); // 4 to 5
    let shuffledChars = [...characters].sort(() => 0.5 - Math.random());
    for(let j=0; j<numChars; j++) {
        let char = shuffledChars[j];
        let lvl = 25 + Math.floor(Math.random() * 35);
        let charSkins = skins[char];
        let skin = charSkins[Math.floor(Math.random() * charSkins.length)];
        lineup.push({ char: char, level: lvl, skin: skin });
    }
    
    // Robots MUST contain name and level
    let robots = [];
    let numBots = 2 + Math.floor(Math.random() * 2); // 2 to 3
    let shuffledBots = [...botKeys].sort(() => 0.5 - Math.random());
    for(let j=0; j<numBots; j++) {
        let bot = shuffledBots[j];
        let lvl = 15 + Math.floor(Math.random() * 25);
        robots.push({ name: bot, level: lvl });
    }
    
    let skillTree = {};
    let numSkills = Math.floor(bazinga_points / 3);
    for(let j=0; j<Math.min(numSkills, 35); j++) {
        skillTree['skill_' + j] = true;
    }
    
    let id = generateUUID();
    let lineupStr = JSON.stringify(lineup).replace(/'/g, "''");
    let robotsStr = JSON.stringify(robots).replace(/'/g, "''");
    let skillsStr = JSON.stringify(skillTree).replace(/'/g, "''");
    
    sql += `INSERT INTO leaderboard (id, username, score, wave, location, lineup, robots, skill_tree, bazinga_points, trophies, is_bot, updated_at) VALUES ('${id}', '${username}', ${score}, ${wave}, 'sheldons_apt', '${lineupStr}'::jsonb, '${robotsStr}'::jsonb, '${skillsStr}'::jsonb, ${bazinga_points}, ${trophies}, true, NOW()) ON CONFLICT (id) DO UPDATE SET score = EXCLUDED.score, wave = EXCLUDED.wave, lineup = EXCLUDED.lineup, robots = EXCLUDED.robots, trophies = EXCLUDED.trophies;\n`;
}

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/deploy_insane_leaderboard.sql', sql);
console.log('Generated deploy_insane_leaderboard.sql');
