const fs = require('fs');

let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
let backup = fs.readFileSync('backup_temp/app.js', 'utf8');
let missingUi = fs.readFileSync('missing_ui.js', 'utf8');

// The corrupted section in broken starts at the corrupted spawnEnemy/updateMapBackground and ends at playIntroCutscene? No.
// Let's just find the start of spawnEnemy in broken.
let corruptStart = broken.indexOf('function spawnEnemy');
if (corruptStart === -1) corruptStart = broken.indexOf('function updateMapBackground'); // since spawnEnemy is corrupted
// Actually, earlier we saw spawnEnemy in app_broken_backup.js at line 600.
// Let's find the exact string "const size = 2 + Math.random() * 4;" which was right before updateMapBackground.
let corruptEnd = broken.indexOf('function triggerBossFight');

// Get perfect spawnEnemy from backup
let bStart = backup.indexOf('function spawnEnemy');
let bEnd = backup.indexOf('function triggerBossFight');
let goodSpawnEnemy = backup.substring(bStart, bEnd);

// Get updateMapBackground
let mapFunc = `function updateMapBackground(locKey) {
    const arena = document.getElementById('arena');
    if (!arena) return;

    if (locKey === 'main_street') {
        arena.style.backgroundImage = "url('images/pasadena_street.webp')";
        arena.style.backgroundSize = "cover";
    } else if (locKey === 'caltech') {
        arena.style.backgroundImage = "url('images/caltech_campus.webp')";
        arena.style.backgroundSize = "cover";
    } else if (locKey === 'sheldons_apt') {
        arena.style.backgroundImage = "url('images/sheldons_apt.webp')";
        arena.style.backgroundSize = "cover";
    } else if (locKey === 'comic_store') {
        arena.style.backgroundImage = "url('images/comic_store.webp')";
        arena.style.backgroundSize = "cover";
    } else if (locKey === 'space_station') {
        arena.style.backgroundImage = "url('images/space_station.webp')";
        arena.style.backgroundSize = "cover";
    } else {
        arena.style.backgroundImage = "url('images/pasadena_street.webp')";
        arena.style.backgroundSize = "cover";
    }
}

`;

// Fix goodSpawnEnemy to include updateMapBackground
goodSpawnEnemy = goodSpawnEnemy.replace('currentEnemy.hp = currentEnemy.maxHp;', "updateMapBackground(state.currentLocation);\n    currentEnemy.hp = currentEnemy.maxHp;");

// In broken, where does the corruption start?
// Let's find what is right before the corruption. 
// "function migrateLegacySaves() {" is before spawnEnemy usually.
let migrateStart = broken.indexOf('function migrateLegacySaves() {');
let migrateEnd = broken.indexOf('function spawnEnemy() {', migrateStart);
if (migrateEnd === -1) migrateEnd = broken.indexOf('function updateMapBackground', migrateStart);
let beforeCorrupt = broken.substring(0, migrateEnd);

let afterCorrupt = broken.substring(corruptEnd);

let patched = beforeCorrupt + goodSpawnEnemy + mapFunc + afterCorrupt;

// Now apply missing_ui.js
let startIdx = patched.indexOf('window.startGameEngine = function() {');
let appHead = patched.substring(0, startIdx);
let cutsceneIdx = patched.indexOf('function playIntroCutscene() {');
let appTail = patched.substring(cutsceneIdx);
let finalApp = appHead + "\n" + missingUi + "\n" + appTail;

// Fix renderActiveBattleLine
finalApp = finalApp.replace(
    /class="live-character-frame relative flex flex-col items-center justify-end"/g,
    'onclick="openModal(event, \'' + '${key}' + '\')" class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:brightness-125 transition"'
);

fs.writeFileSync('app.js', finalApp);
console.log('Recreated PERFECT app.js');
