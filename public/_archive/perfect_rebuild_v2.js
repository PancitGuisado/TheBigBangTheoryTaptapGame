const fs = require('fs');
const acorn = require('acorn');
let app = fs.readFileSync('app_fixed.js', 'utf8');

// 1. VISUAL OVERHAUL TWEAKS
app = app.replace(/const charClass = `live-character-frame \$\{hangoutMode \? 'absolute' : 'relative'\} \$\{statusClass\}`;/g, 
`const glowClass = !hangoutMode ? 'glow-' + characters[key].lane : '';
                    const charClass = \`live-character-frame \${hangoutMode ? 'absolute' : 'relative'} \${statusClass} \${glowClass}\`;`);

app = app.replace(/<div class="character-vector-wrapper">/g, 
`<div class="character-vector-wrapper">
                            ${hangoutMode ? '<div class="hangout-bubble">' + (key === 'sheldon' ? 'Bazinga!' : key === 'penny' ? 'Wine?' : key === 'stuart' ? 'Zzz...' : key === 'howard' ? 'Magic!' : key === 'raj' ? 'Stars...' : key === 'leonard' ? 'Sigh...' : key === 'amy' ? 'Fascinating' : key === 'bernie' ? 'Howie!' : '...') + '</div>' : ''}`);

// 2. MODAL UI SYNC FIX (Clean replacement)
// The target in app_fixed.js is clean:
/*
        for (const [rKey, rConfig] of Object.entries(characters)) {
            if (state.equipped[rKey]) {
                activeTotalCount++;
                if (rConfig.lane === 'front') activeFrontlineCount++;
                else activeBacklineCount++;
            }
        }
        
        if (activeTotalCount < 5) {
            if (config.lane === 'front' && activeFrontlineCount < 2) state.equipped[activeModalKey] = true;
            else if ((config.lane === 'back' || config.lane === 'mid') && activeBacklineCount < 3) state.equipped[activeModalKey] = true;
            else { /* show alert maybe * / }
        }
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

const targetRegex = /\} else if \(mode === 'unequip'\) \{\s*state\.equipped\[activeModalKey\] = false;\s*delete state\.equipped\[activeModalKey\];\s*closeModal\(\);\s*\}\s*if \(state\.score > 0\) \{\s*\/\/ checkMilestones\(\);\s*\}\s*\}/g;

const replacement = `} else if (mode === 'unequip') {
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
}`;

app = app.replace(targetRegex, replacement);

fs.writeFileSync('app_v2.js', app);

try {
    acorn.parse(app, { ecmaVersion: 2022 });
    console.log("REBUILD SUCCESS: Syntax perfectly valid.");
} catch(e) {
    console.log("REBUILD FAILED: ", e.toString());
}
