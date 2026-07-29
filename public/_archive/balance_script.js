const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Buff frontliner HP scaling
app = app.replace(/config\.lane === 'front' \? 1\.40 : 1\.25/g, "config.lane === 'front' ? 1.80 : 1.25");
app = app.replace(/charConfig\.lane === 'front' \? 1\.40 : 1\.25/g, "charConfig.lane === 'front' ? 1.80 : 1.25");

fs.writeFileSync('app.js', app);

let configText = fs.readFileSync('config.js', 'utf8');
// Nerf Howard
configText = configText.replace(/atkSpeed: 4500, cost: \{ money: 400 \}, lane: "mid", passiveType: 'coolDown'/g, "atkSpeed: 7500, cost: { money: 400 }, lane: \"mid\", passiveType: 'coolDown'");
// Nerf Bernie
configText = configText.replace(/atkSpeed: 5000, cost: \{ money: 1600 \}, lane: "back", passiveType: 'heal'/g, "atkSpeed: 8000, cost: { money: 1600 }, lane: \"back\", passiveType: 'heal'");

fs.writeFileSync('config.js', configText);
console.log("Scaled Frontliners and nerfed Howard/Bernie in configs");
