const fs = require('fs');

const backup = fs.readFileSync('app_broken_backup.js', 'utf8');
const current = fs.readFileSync('app.js', 'utf8');

// The clean part from backup starts exactly at 'function renderRobotBattleLine() {'
// and ends exactly at '}\n\nfunction renderCraftingQueue() {'

const cleanStartStr = 'function renderRobotBattleLine() {';
const cleanEndStr = '\nfunction renderCraftingQueue() {';
const backupStartIdx = backup.indexOf(cleanStartStr);
const backupEndIdx = backup.indexOf(cleanEndStr);
const cleanText = backup.substring(backupStartIdx, backupEndIdx);

// Now find the same start and end in current app.js
const currStartIdx = current.indexOf(cleanStartStr);
const currEndIdx = current.indexOf(cleanEndStr);

if (currStartIdx !== -1 && currEndIdx !== -1) {
    const fixedApp = current.substring(0, currStartIdx) + cleanText + current.substring(currEndIdx);
    fs.writeFileSync('app.js', fixedApp);
    console.log('Fixed app.js by replacing the mangled block with the clean block from backup!');
} else {
    console.log('Could not find start or end bounds in app.js', { currStartIdx, currEndIdx });
}
