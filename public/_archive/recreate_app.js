const fs = require('fs');

let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
let backup = fs.readFileSync('backup_temp/app.js', 'utf8');

// 1. Fix the syntax error by replacing the corrupted block with the good spawnEnemy from backup_temp
let startBroken = broken.indexOf('function updateMapBackground');
let endBroken = broken.indexOf('} else {\n        // Minion Wave');

let startBackup = backup.indexOf('function spawnEnemy');
let endBackup = backup.indexOf('} else {\n        // Minion Wave');

let goodChunk = backup.substring(startBackup, endBackup);
let patched = broken.substring(0, startBroken) + goodChunk + broken.substring(endBroken);

// 2. Now apply the missing UI features from missing_ui.js
let missingUi = fs.readFileSync('missing_ui.js', 'utf8');
let startIdx = patched.indexOf('window.startGameEngine = function() {');
let appHead = patched.substring(0, startIdx);
let cutsceneIdx = patched.indexOf('function playIntroCutscene() {');
let appTail = patched.substring(cutsceneIdx);
let finalApp = appHead + "\n" + missingUi + "\n" + appTail;

fs.writeFileSync('app.js', finalApp);
console.log('Recreated app.js without syntax error and with UI features.');
