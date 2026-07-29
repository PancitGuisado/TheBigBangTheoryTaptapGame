const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Restore executeAction
app = app.replace(/    \} else if \(mode === 'unequip'\) \{\n        state\.equipped\[activeModalKey\] = false;\n        delete state\.equipped\[activeModalKey\];\n        closeModal\(\);\n    \}\n    if \(state\.score > 0\) \{/g, `    } else if (mode === 'unequip') {\n        state.equipped[activeModalKey] = false;\n        delete state.equipped[activeModalKey];\n    }\n\n    saveProgress();\n    syncUI();\n    renderRosterGrid();\n    renderActiveBattleLine();\n    calculateSynergies();\n    startAutomationEngines();\n    \n    if (mode === 'buy') {\n        openModal(null, activeModalKey);\n    } else {\n        closeModal();\n    }\n    if (state.score > 0) {`);

// 2. Safely add interval to initGame
if (!app.includes("window.enemyAttackInterval = setInterval")) {
    app = app.replace(/function initGame\(\) \{[\s\S]*?renderActiveBattleLine\(\);\n/g, match => match + "    if (window.enemyAttackInterval) clearInterval(window.enemyAttackInterval);\n    window.enemyAttackInterval = setInterval(() => {\n        if (typeof hangoutMode !== 'undefined' && hangoutMode) return;\n        let enemyCounterDmg = Math.floor(5 * Math.pow(1.10, state.wave - 1));\n        if (typeof applyEnemyCounter === 'function') applyEnemyCounter(enemyCounterDmg);\n    }, 2000);\n");
}

fs.writeFileSync('app.js', app);
console.log("Fixed executeAction and injected interval");
