const fs = require('fs');

let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
let missingUi = fs.readFileSync('missing_ui.js', 'utf8');
let backup = fs.readFileSync('backup_temp/app.js', 'utf8');

// 1. Get good spawnEnemy from backup_temp/app.js
let bStart = backup.indexOf('function spawnEnemy() {');
let bEnd = backup.indexOf('function triggerBossFight(event)');
let goodSpawnEnemy = backup.substring(bStart, bEnd);

// 2. We need updateMapBackground and ParticleSystem from broken.
let mapStart = broken.indexOf('function updateMapBackground');
let mapEnd = broken.indexOf('// OPEN LOCATION MAP MODAL');
let mapFunc = broken.substring(mapStart, mapEnd);
if (!mapFunc.includes('function updateMapBackground(locKey)')) {
    mapFunc = `function updateMapBackground(locKey) {
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
}

let pStart = broken.indexOf('const ParticleSystem = {');
let pEndStr = '    }\n};';
let pEnd = broken.indexOf(pEndStr, pStart) + pEndStr.length;
let particleFunc = "\n// MAP BACKGROUND SYSTEM\n" + broken.substring(pStart, pEnd) + "\n\n";

// Add updateMapBackground to goodSpawnEnemy
goodSpawnEnemy = goodSpawnEnemy.replace('currentEnemy.hp = currentEnemy.maxHp;', "updateMapBackground(state.currentLocation);\n    currentEnemy.hp = currentEnemy.maxHp;");

// 3. Assemble appHead + missingUi + appTail
let startIdx = broken.indexOf('window.startGameEngine = function() {');
let appHead = broken.substring(0, startIdx);
let cutsceneIdx = broken.indexOf('function playIntroCutscene() {');
let appTail = broken.substring(cutsceneIdx);

// In appHead, we need to REMOVE the corrupted spawnEnemy, ParticleSystem, updateMapBackground.
// Where does the corruption start?
// It starts at `function spawnEnemy() {` (which is corrupted).
let corruptSpawnStart = appHead.indexOf('function spawnEnemy() {');
// Where does it end? Before `function triggerBossFight(event)`
let corruptSpawnEnd = appHead.indexOf('function triggerBossFight(event)');

// Replace the entire block from corruptSpawnStart to corruptSpawnEnd
appHead = appHead.substring(0, corruptSpawnStart) + goodSpawnEnemy + appHead.substring(corruptSpawnEnd);

// What about ParticleSystem and updateMapBackground? They might still be in appHead.
// Let's remove them if they exist.
let corruptMapStart = appHead.indexOf('function updateMapBackground');
if (corruptMapStart !== -1) {
    let corruptMapEnd = appHead.indexOf('// OPEN LOCATION MAP MODAL');
    appHead = appHead.substring(0, corruptMapStart) + appHead.substring(corruptMapEnd);
}

let corruptPartStart = appHead.indexOf('const ParticleSystem');
if (corruptPartStart !== -1) {
    let corruptPartEnd = appHead.indexOf('    }\n};', corruptPartStart) + 7;
    appHead = appHead.substring(0, corruptPartStart) + appHead.substring(corruptPartEnd);
}

// Now insert them properly before // OPEN LOCATION MAP MODAL
let locMapIdx = appHead.indexOf('// OPEN LOCATION MAP MODAL');
if (locMapIdx !== -1) {
    appHead = appHead.substring(0, locMapIdx) + particleFunc + mapFunc + "\n" + appHead.substring(locMapIdx);
}

let finalApp = appHead + "\n" + missingUi + "\n" + appTail;

// Fix renderActiveBattleLine
finalApp = finalApp.replace(
    /class="live-character-frame relative flex flex-col items-center justify-end"/g,
    'onclick="openModal(event, \'' + '${key}' + '\')" class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:brightness-125 transition"'
);

fs.writeFileSync('app.js', finalApp);
console.log("Rebuilt base app.js successfully");
