const fs = require('fs');
let backup = fs.readFileSync('backup_temp/app.js', 'utf8');

let endSpawn = backup.indexOf('function updateEnemyHealthBar() {');
let startBoss = backup.indexOf('function triggerBossFight(event) {');

if (endSpawn !== -1 && startBoss !== -1) {
    let missingFunctions = backup.substring(endSpawn, startBoss);
    fs.writeFileSync('missing_functions.js', missingFunctions);
    console.log("Extracted missing functions! Length:", missingFunctions.length);
} else {
    console.log("Could not find bounds!");
}
