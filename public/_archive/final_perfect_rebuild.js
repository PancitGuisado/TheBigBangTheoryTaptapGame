const fs = require('fs');
const acorn = require('acorn');
let app = fs.readFileSync('perfect_rebuild.js', 'utf8');

// 1. VISUAL OVERHAUL TWEAKS
app = app.replace(/const charClass = `live-character-frame \$\{hangoutMode \? 'absolute' : 'relative'\} \$\{statusClass\}`;/g, 
"const glowClass = !hangoutMode ? 'glow-' + characters[key].lane : '';\n" +
"                    const charClass = `live-character-frame ${hangoutMode ? 'absolute' : 'relative'} ${statusClass} ${glowClass}`;");

app = app.replace(/<div class="character-vector-wrapper">/g, 
"<div class=\"character-vector-wrapper\">\n" +
"                            ${hangoutMode ? '<div class=\"hangout-bubble\">' + (key === 'sheldon' ? 'Bazinga!' : key === 'penny' ? 'Wine?' : key === 'stuart' ? 'Zzz...' : key === 'howard' ? 'Magic!' : key === 'raj' ? 'Stars...' : key === 'leonard' ? 'Sigh...' : key === 'amy' ? 'Fascinating' : key === 'bernie' ? 'Howie!' : '...') + '</div>' : ''}");

// 2. MODAL UI SYNC FIX (Clean replacement)
// We match exactly the end of executeModalAction in perfect_rebuild.js
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
    console.log("FINAL REBUILD SUCCESS: Syntax perfectly valid.");
} catch(e) {
    console.log("FINAL REBUILD FAILED: ", e.toString());
}
