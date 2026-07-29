const fs = require('fs');

const bots = [];
for (let i = 0; i < 50; i++) {
    let id = '00000000-0000-4000-a000-0000000000' + (i < 10 ? '0'+i : i);
    bots.push(id);
}

const charKeys = ['sheldon', 'leonard', 'penny', 'howard', 'raj', 'amy', 'bernie', 'stuart'];
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

let sql = '-- UPDATE BOTS WITH REALISTIC LINEUPS, SKINS, ROBOTS AND SKILL TREES\n\n';

bots.forEach((id, idx) => {
    // Generate realistic wave, score, bazinga points
    let wave = 5 + Math.floor(Math.random() * 25);
    let score = wave * 300 + Math.floor(Math.random() * 1000);
    let bp = wave * 2 + Math.floor(Math.random() * 10);
    
    // Generate lineup
    let lineup = [];
    let numChars = 3 + Math.floor(Math.random() * 3); // 3-5 chars
    let shuffledChars = [...charKeys].sort(() => 0.5 - Math.random());
    
    for(let j=0; j<numChars; j++) {
        let char = shuffledChars[j];
        let lvl = Math.max(1, Math.floor(wave / 2) + Math.floor((Math.random() - 0.5) * 4));
        let charSkins = skins[char];
        let skin = charSkins[Math.floor(Math.random() * charSkins.length)];
        lineup.push({ char: char, level: lvl, skin: skin });
    }
    
    // Generate robots
    let robots = [];
    if (wave > 10) {
        let numBots = Math.floor(Math.random() * 3);
        let shuffledBots = [...botKeys].sort(() => 0.5 - Math.random());
        for(let j=0; j<numBots; j++) {
            let bot = shuffledBots[j];
            let lvl = Math.max(1, Math.floor(wave / 4));
            robots.push({ name: bot, level: lvl });
        }
    }
    
    // Generate skill tree
    let skill_tree = {};
    let numSkills = Math.floor(bp / 3); // realistic skill count
    for(let j=0; j<numSkills; j++) {
        skill_tree['skill_' + j] = true;
    }
    
    // Create state object for game_saves
    let stateObj = {
        wave: wave,
        score: score,
        bazingaPoints: bp,
        equipped: {},
        roster: {},
        robotRoster: {},
        skillTree: skill_tree,
        pvp: {
            trophies: Math.max(0, Math.floor(score / 10)),
            lineup: lineup.map(l => ({ type: 'char', key: l.char, lane: 'mid' }))
        }
    };
    
    lineup.forEach(l => {
        stateObj.equipped[l.char] = true;
        stateObj.roster[l.char] = { level: l.level, activeSkin: l.skin };
    });
    robots.forEach(r => {
        stateObj.robotRoster[r.name] = { level: r.level, equipped: true };
    });
    
    let lineupStr = JSON.stringify(lineup).replace(/'/g, "''");
    let robotStr = JSON.stringify(robots).replace(/'/g, "''");
    let skillStr = JSON.stringify(skill_tree).replace(/'/g, "''");
    let stateStr = JSON.stringify(stateObj).replace(/'/g, "''");
    
    sql += `UPDATE leaderboard SET wave = ${wave}, score = ${score}, bazinga_points = ${bp}, lineup = '${lineupStr}'::jsonb, robots = '${robotStr}'::jsonb, skill_tree = '${skillStr}'::jsonb WHERE id = '${id}';\n`;
    sql += `INSERT INTO game_saves (id, state, updated_at, is_bot) VALUES ('${id}', '${stateStr}'::jsonb, NOW(), true) ON CONFLICT (id) DO UPDATE SET state = EXCLUDED.state, updated_at = NOW();\n`;
});

fs.writeFileSync('update_bots_realistic.sql', sql);
console.log('SQL generated!');
