const fs = require('fs');

// 1. Nerf Howard in config.js
let config = fs.readFileSync('config.js', 'utf8');
config = config.replace(
    /howard: \{ name: "Howard", desc: "Shoots rocket missiles as a techy cyborg.", baseDmg: 20, baseHp: 120, atkSpeed: 2000, cost: \{ money: 400 \}, lane: "mid", passiveType: 'coolDown', basePassiveAmount: 10 \}/,
    `howard: { name: "Howard", desc: "Shoots rocket missiles as a techy cyborg.", baseDmg: 20, baseHp: 120, atkSpeed: 4500, cost: { money: 400 }, lane: "mid", passiveType: 'coolDown', basePassiveAmount: 5 }`
);
fs.writeFileSync('config.js', config);

// 2. Update robot scaling in app.js
let app = fs.readFileSync('app.js', 'utf8');

const botTarget = `        let rate = config.atkSpeed / activeSynergies.robotSpeedMult;
        if (rageDuration > 0) rate *= 0.45;

        window.robotTimers[robot.id] = setInterval(() => {
            if (robot.overheated) return; // Cannot attack if overheated
            if (typeof robot.heat === 'undefined' || isNaN(robot.heat)) robot.heat = 0;
            if (typeof robot.maxHeat === 'undefined' || isNaN(robot.maxHeat)) robot.maxHeat = (config.baseHeat || 200) * robot.level;
            
            // Add attacking heat
            robot.heat += Math.max(1, Math.floor(robot.maxHeat * 0.05)); // Add 5% heat per attack`;

const botReplace = `        let rate = (config.atkSpeed / activeSynergies.robotSpeedMult) * Math.pow(0.95, robot.level - 1);
        if (typeof rageDuration !== 'undefined' && rageDuration > 0) rate *= 0.45;

        window.robotTimers[robot.id] = setInterval(() => {
            if (robot.overheated) return; // Cannot attack if overheated
            if (typeof robot.heat === 'undefined' || isNaN(robot.heat)) robot.heat = 0;
            if (typeof robot.maxHeat === 'undefined' || isNaN(robot.maxHeat)) robot.maxHeat = (config.baseHeat || 200) * robot.level;
            
            // Fixed amount of heat added based on BASE heat.
            // Since maxHeat scales with level, higher levels will overheat slower!
            robot.heat += Math.max(1, Math.floor((config.baseHeat || 200) * 0.05));`;

app = app.replace(botTarget, botReplace);
fs.writeFileSync('app.js', app);
console.log("Updated bot scaling and nerfed Howard");
