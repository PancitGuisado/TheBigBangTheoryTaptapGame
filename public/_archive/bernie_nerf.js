const fs = require('fs');

// 1. Nerf Bernie in config.js
let config = fs.readFileSync('config.js', 'utf8');
config = config.replace(
    /bernie: \{ name: "Bernie", desc: "Fires a green healing pulse that restores HP to all injured active squad members.", baseDmg: 0, baseHp: 90, atkSpeed: 1500, cost: \{ money: 1600 \}, lane: "back", passiveType: 'heal', basePassiveAmount: 20 \}/,
    `bernie: { name: "Bernie", desc: "Fires a green healing pulse that restores HP to all injured active squad members.", baseDmg: 0, baseHp: 90, atkSpeed: 5000, cost: { money: 1600 }, lane: "back", passiveType: 'heal', basePassiveAmount: 10 }`
);
fs.writeFileSync('config.js', config);

// 2. Update healAmt formula in app.js
let app = fs.readFileSync('app.js', 'utf8');
const oldHeal = `const healAmt = (config.basePassiveAmount || 20) * state.roster[key].level;`;
const newHeal = `const healAmt = 8 + (state.roster[key].level * 2); // 10 at lvl 1, +2 per upgrade`;
app = app.replace(oldHeal, newHeal);
fs.writeFileSync('app.js', app);

console.log("Nerfed Bernie");
