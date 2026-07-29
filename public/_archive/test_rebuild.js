const fs = require('fs');

const backup = fs.readFileSync('backup_temp/app.js', 'utf8');
const broken = fs.readFileSync('app_broken_backup.js', 'utf8');

// The missing chunk starts with "function spawnEnemy() {"
// and ends right before "                bossTimer = 0;"
let extractStartStr = 'function spawnEnemy() {';
let extractEndStr = '                bossTimer = 0;';

let extractStartIdx = backup.indexOf(extractStartStr);
let extractEndIdx = backup.indexOf(extractEndStr);

if (extractStartIdx === -1 || extractEndIdx === -1) {
    console.log("Could not find extraction points in backup_temp/app.js");
    process.exit(1);
}

let missingChunk = backup.substring(extractStartIdx, extractEndIdx);

// Now find the injection point in app_broken_backup.js
let injectPointStr = '    ParticleSystem.start(locKey);\r\n}\r\n                bossTimer = 0;';
let injectPointIdx = broken.indexOf('    ParticleSystem.start(locKey);\n}\n                bossTimer = 0;');
if (injectPointIdx === -1) {
    // Try with \r\n
    injectPointIdx = broken.indexOf('    ParticleSystem.start(locKey);\r\n}\r\n                bossTimer = 0;');
}
if (injectPointIdx === -1) {
    // Try without indentation
    injectPointIdx = broken.indexOf('ParticleSystem.start(locKey);\n}\n                bossTimer = 0;');
}
if (injectPointIdx === -1) {
    console.log("Could not find injection point in app_broken_backup.js");
    // Print the context around ParticleSystem.start
    let psIdx = broken.indexOf('ParticleSystem.start(locKey);');
    console.log(broken.substring(psIdx - 50, psIdx + 100));
    process.exit(1);
}

console.log("Successfully found injection point!");

