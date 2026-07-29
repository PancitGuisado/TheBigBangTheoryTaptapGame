const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// The broken logic at the end of executeModalAction is:
/*
    } else if (mode === 'equip') {
        state.equipped[activeModalKey] = true;
    } else if (mode === 'unequip') {
        state.equipped[activeModalKey] = false;
        delete state.equipped[activeModalKey];
        closeModal();
    }
    if (state.score > 0) {
        // checkMilestones();
    }
}
*/

app = app.replace(/    \} else if \(mode === 'equip'\) \{\n        state\.equipped\[activeModalKey\] = true;\n    \} else if \(mode === 'unequip'\) \{\n        state\.equipped\[activeModalKey\] = false;\n        delete state\.equipped\[activeModalKey\];\n        closeModal\(\);\n    \}\n    if \(state\.score > 0\) \{\n        \/\/ checkMilestones\(\);\n    \}\n\}/g, 
`    } else if (mode === 'equip') {
        state.equipped[activeModalKey] = true;
    } else if (mode === 'unequip') {
        state.equipped[activeModalKey] = false;
        delete state.equipped[activeModalKey];
    }

    saveProgress();
    syncUI();
    renderRosterGrid();
    renderActiveBattleLine();
    calculateSynergies();
    startAutomationEngines();
    
    if (mode === 'buy' || mode === 'equip' || mode === 'unequip') {
        openModal(null, activeModalKey);
    } else {
        closeModal();
    }

    if (state.score > 0) {
        // checkMilestones();
    }
}`);

fs.writeFileSync('app.js', app);
console.log("Fixed executeModalAction UI sync");
