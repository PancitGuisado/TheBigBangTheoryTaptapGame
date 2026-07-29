const fs = require('fs');

let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
let backup = fs.readFileSync('backup_temp/app.js', 'utf8');

// 1. Reproduce task-4133 to get a clean syntax-error-free app.js
let startBroken = broken.indexOf('function updateMapBackground');
let endBroken = broken.indexOf('} else {\n        // Minion Wave');
let startBackup = backup.indexOf('function spawnEnemy');
let endBackup = backup.indexOf('} else {\n        // Minion Wave');
let goodChunk = backup.substring(startBackup, endBackup);
let patched1 = broken.substring(0, startBroken) + goodChunk + broken.substring(endBroken);

// 2. Reproduce task-4148 to apply missing_ui.js
let missingUi = fs.readFileSync('missing_ui.js', 'utf8');
let startIdx = patched1.indexOf('window.startGameEngine = function() {');
let appHead = patched1.substring(0, startIdx);
let cutsceneIdx = patched1.indexOf('function playIntroCutscene() {');
let appTail = patched1.substring(cutsceneIdx);
let patched2 = appHead + "\n" + missingUi + "\n" + appTail;

fs.writeFileSync('app.js', patched2);
console.log("Rebuilt base app.js successfully");
