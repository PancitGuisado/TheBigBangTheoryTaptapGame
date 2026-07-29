const fs = require('fs');

let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
let lines = broken.split('\n');

// Remove lines 579 to 772 (0-indexed: 578 to 771)
// We use splice to remove them.
lines.splice(578, 194);

let cleanedApp = lines.join('\n');

// Now apply missing_ui.js
let missingUi = fs.readFileSync('missing_ui.js', 'utf8');
let startIdx = cleanedApp.indexOf('window.startGameEngine = function() {');
let appHead = cleanedApp.substring(0, startIdx);
let cutsceneIdx = cleanedApp.indexOf('function playIntroCutscene() {');
let appTail = cleanedApp.substring(cutsceneIdx);

let finalApp = appHead + "\n" + missingUi + "\n" + appTail;

// Fix renderActiveBattleLine
finalApp = finalApp.replace(
    /class="live-character-frame relative flex flex-col items-center justify-end"/g,
    'onclick="openModal(event, \'' + '${key}' + '\')" class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:brightness-125 transition"'
);

// One more fix: updateMapBackground is called in spawnEnemy?
// Let's check if updateMapBackground is in goodSpawnEnemy.
// If we look at spawnEnemy in the cleanedApp (which is at line 367), it doesn't call updateMapBackground.
// Let's add it right before currentEnemy.hp = currentEnemy.maxHp;
finalApp = finalApp.replace('currentEnemy.hp = currentEnemy.maxHp;', "updateMapBackground();\n    currentEnemy.hp = currentEnemy.maxHp;");

fs.writeFileSync('app.js', finalApp);
console.log("SUCCESS! Cleaned app.js created.");
