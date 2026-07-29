const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Restore updateEnemyHealthBar to its original form and remove duplicates
app = app.replace(/function updateEnemyHealthBar\(\) \{[\s\S]*?function startAutomationEngines\(\) \{/, 'function updateEnemyHealthBar() {\n    const bar = document.getElementById(\'enemy-hp-bar\');\n    const txt = document.getElementById(\'enemy-hp-text\');\n    const pct = Math.max(0, (currentEnemy.hp / currentEnemy.maxHp) * 100);\n    if (bar) bar.style.width = pct + \'%\';\n    if (txt) txt.innerText = `${Math.floor(currentEnemy.hp)}/${currentEnemy.maxHp} HP`;\n}\n\nfunction startAutomationEngines() {');

// 2. Add the timer to spawnEnemy
// We find the end of spawnEnemy
app = app.replace(/    const enemyTypeBadge = document\.getElementById\('enemy-type-badge'\);\n    if \(enemyTypeBadge\) \{\n        enemyTypeBadge\.innerText = chosenType\.type;\n    \}\n    \n    updateEnemyHealthBar\(\);\n\}/, '    const enemyTypeBadge = document.getElementById(\'enemy-type-badge\');\n    if (enemyTypeBadge) {\n        enemyTypeBadge.innerText = chosenType.type;\n    }\n    \n    updateEnemyHealthBar();\n\n    if (window.enemyAttackInterval) clearInterval(window.enemyAttackInterval);\n    window.enemyAttackInterval = setInterval(() => {\n        if (typeof hangoutMode !== \'undefined\' && hangoutMode) return;\n        let enemyCounterDmg = Math.floor(2 * Math.pow(1.10, state.wave - 1));\n        if (typeof applyEnemyCounter === \'function\') applyEnemyCounter(enemyCounterDmg);\n    }, 2500);\n}');

fs.writeFileSync('app.js', app);
console.log("Fixed updateEnemyHealthBar and added timer to spawnEnemy");
