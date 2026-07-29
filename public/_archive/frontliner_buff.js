const fs = require('fs');

// 1. Buff Leonard and Stuart in config.js
let config = fs.readFileSync('config.js', 'utf8');
config = config.replace(
    /leonard: \{ name: "Leonard", desc: "Frontliner fighting in melee contact, swinging his sword at enemies.", baseDmg: 14, baseHp: 150, atkSpeed: 1200, cost: \{ money: 180 \}, lane: "front" \}/,
    `leonard: { name: "Leonard", desc: "Frontliner fighting in melee contact, swinging his sword at enemies.", baseDmg: 14, baseHp: 250, atkSpeed: 1200, cost: { money: 180 }, lane: "front" }`
);
config = config.replace(
    /stuart: \{ name: "Stuart", desc: "Melee combat specialist making contact with his light saber.", baseDmg: 45, baseHp: 140, atkSpeed: 2200, cost: \{ money: 2200 \}, lane: "front" \}/,
    `stuart: { name: "Stuart", desc: "Melee combat specialist making contact with his light saber.", baseDmg: 45, baseHp: 300, atkSpeed: 2200, cost: { money: 2200 }, lane: "front" }`
);
fs.writeFileSync('config.js', config);

// 2. Adjust HP scaling formula in app.js
let app = fs.readFileSync('app.js', 'utf8');
const regex = /\((([a-zA-Z0-9_\[\]]+)\.baseHp \|\| 100\) \* Math\.pow\()1\.25/g;
app = app.replace(regex, `$1$2.lane === 'front' ? 1.40 : 1.25`);
fs.writeFileSync('app.js', app);

console.log("Buffed front-liner tankiness in config and app.js");
