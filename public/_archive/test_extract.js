const fs = require('fs');
let broken = fs.readFileSync('app_broken_backup.js', 'utf8');

// Find start of UI functions
let s1 = broken.indexOf('function openFoodShop');
if (s1 === -1) { console.log('not found'); process.exit(1); }

// Find where we should stop extracting
// Maybe just the end of the file, minus the cutscene?
// Wait, app_broken_backup.js ends with buyTalent which I already know is there.
console.log('Found openFoodShop at ' + s1);

let e1 = broken.indexOf('function playIntroCutscene()', s1);
if (e1 === -1) e1 = broken.length;

let extracted = broken.substring(s1, e1);

fs.writeFileSync('missing_ui.js', extracted);
console.log('Saved to missing_ui.js');
