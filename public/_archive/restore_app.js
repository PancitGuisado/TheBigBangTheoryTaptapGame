const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Fix the errant backtick in Math.floor
app = app.replace(/Math\.floor\(\(`([a-zA-Z0-9_\[\]]+)\.baseHp/g, "Math.floor((` + `$1` + `.baseHp");
// Wait, replacing with variables is easier:
app = app.replace(/Math\.floor\(\(`/g, "Math.floor((");

// 2. Restore locationInfo
app = app.replace(/locationInfo\.innerText = "\[LOC\] " \+ currentLocationData\.name;/g, 'locationInfo.innerText = `?? ${currentLocationData.name}`;');

// 3. Restore timerDisplay
app = app.replace(/timerDisplay\.innerText = "\[TIME\] " \+ bossTimer\.toFixed\(1\) \+ "s";/g, 'timerDisplay.innerText = `?? ${bossTimer.toFixed(1)}s`;');

// 4. Restore other emojis
app = app.replace(/"\[DMG\] " \+ /g, '`??? ${');
app = app.replace(/"\[HP\] " \+ /g, '`?? ${');
app = app.replace(/"\[DEF\] " \+ /g, '`??? ${');
app = app.replace(/"\[BOT\] " \+ /g, '`?? ${');

fs.writeFileSync('app.js', app);
console.log("Restored emojis and fixed Math.floor backticks");
