const fs = require('fs');

let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
let lines = broken.split('\n');

// The corrupted section starts at line 579: "function updateMapBackground() {"
// and ends right before line 774 which is the REAL "function updateMapBackground() {"
// Let's dynamically find these indices to be absolutely safe.

let firstMapBg = -1;
let secondMapBg = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('function updateMapBackground() {')) {
        if (firstMapBg === -1) {
            firstMapBg = i;
        } else if (secondMapBg === -1) {
            secondMapBg = i;
        }
    }
}

if (firstMapBg !== -1 && secondMapBg !== -1) {
    // Delete from firstMapBg to secondMapBg - 1
    // The number of lines to remove is secondMapBg - firstMapBg
    lines.splice(firstMapBg, secondMapBg - firstMapBg);
    console.log(`Removed ${secondMapBg - firstMapBg} corrupted lines!`);
} else {
    console.log("Could not find the bounds of the corruption!");
}

let cleanedApp = lines.join('\n');

// Add the onclick to renderActiveBattleLine
cleanedApp = cleanedApp.replace(
    /class="live-character-frame relative flex flex-col items-center justify-end"/g,
    'onclick="openModal(event, \'' + '${key}' + '\')" class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:brightness-125 transition"'
);

// We need to ensure that spawnEnemy() actually calls updateMapBackground()
// Let's find "currentEnemy.hp = currentEnemy.maxHp;" in spawnEnemy and prepend updateMapBackground()
// Actually, spawnEnemy in app_broken_backup.js does NOT call updateMapBackground.
if (!cleanedApp.includes("updateMapBackground();\n    currentEnemy.hp = currentEnemy.maxHp;")) {
    cleanedApp = cleanedApp.replace('currentEnemy.hp = currentEnemy.maxHp;', "updateMapBackground();\n    currentEnemy.hp = currentEnemy.maxHp;");
}

fs.writeFileSync('app.js', cleanedApp);
console.log("SUCCESS! The perfect app.js is ready.");
