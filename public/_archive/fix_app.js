const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');
let perfect = fs.readFileSync('perfect_rebuild.js', 'utf8');

// The section from `function dropResources(isFromBoss) {` down to `function applyEnemyCounter` is messed up in app.js.
// Let's replace the mangled area in app.js with the correct code from perfect_rebuild.js

let mangledStartIdx = app.indexOf('function dropResources(isFromBoss) {');
let mangledEndIdx = app.indexOf('function applyEnemyCounter(damageAmount) {');

if (mangledStartIdx === -1 || mangledEndIdx === -1) {
    console.log("Could not find boundaries in app.js!");
    process.exit(1);
}

let perfectStartIdx = perfect.indexOf('function dropResources(isFromBoss) {');
let perfectEndIdx = perfect.indexOf('function applyEnemyCounter(damageAmount) {');

if (perfectStartIdx === -1 || perfectEndIdx === -1) {
    console.log("Could not find boundaries in perfect_rebuild.js!");
    process.exit(1);
}

let goodBlock = perfect.substring(perfectStartIdx, perfectEndIdx);

// Modify goodBlock to disable enemyCounter
goodBlock = goodBlock.replace(
    'let enemyCounterDmg = Math.floor((currentEnemy.maxHp / 20) * (state.wave * 0.5));\n    applyEnemyCounter(enemyCounterDmg);',
    '// let enemyCounterDmg = Math.floor((currentEnemy.maxHp / 20) * (state.wave * 0.5));\n    // applyEnemyCounter(enemyCounterDmg); // Disabled to keep the game relaxing'
);

let newApp = app.substring(0, mangledStartIdx) + goodBlock + app.substring(mangledEndIdx);

fs.writeFileSync('app.js', newApp);
console.log("Successfully restored dropResources and processDamage and disabled enemy counter!");
