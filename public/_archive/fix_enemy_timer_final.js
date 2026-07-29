const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Insert interval logic right before the closing brace of spawnEnemy
app = app.replace(/    updateEnemyHealthBar\(\);\n\}/g, `    updateEnemyHealthBar();\n\n    if (window.enemyAttackInterval) clearInterval(window.enemyAttackInterval);\n    window.enemyAttackInterval = setInterval(() => {\n        if (typeof hangoutMode !== 'undefined' && hangoutMode) return;\n        let enemyCounterDmg = Math.floor(2 * Math.pow(1.10, state.wave - 1));\n        if (typeof applyEnemyCounter === 'function') applyEnemyCounter(enemyCounterDmg);\n    }, 2500);\n}`);

fs.writeFileSync('app.js', app);
console.log("Injected interval safely!");
