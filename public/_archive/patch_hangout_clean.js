const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// Add synergy-display and quick-repair hiding to hangout mode
// Find the hangout ON block and add hiding
code = code.replace(
    "if (hangoutMode) {\n        if (combatUI) combatUI.classList.add('hidden');\n        if (playerLines) playerLines.classList.add('hidden');\n        if (robotLines) robotLines.classList.add('hidden');\n        if (hotspots) hotspots.classList.remove('hidden');\n        renderHangoutCrew();",
    `if (hangoutMode) {
        if (combatUI) combatUI.classList.add('hidden');
        if (playerLines) playerLines.classList.add('hidden');
        if (robotLines) robotLines.classList.add('hidden');
        if (hotspots) hotspots.classList.remove('hidden');
        const synergyEl = document.getElementById('synergy-display');
        if (synergyEl) synergyEl.style.display = 'none';
        const repairEl = document.getElementById('quick-repair-container');
        if (repairEl) repairEl.style.display = 'none';
        const bossCtrl = document.getElementById('boss-controls');
        if (bossCtrl) bossCtrl.style.display = 'none';
        document.querySelectorAll('.damage-popup, .unique-fx, .laser-beam').forEach(el => el.remove());
        renderHangoutCrew();`
);

// Find the hangout OFF block and restore
code = code.replace(
    "if (combatUI) combatUI.classList.remove('hidden');\n        if (playerLines) playerLines.classList.remove('hidden');\n        if (robotLines) robotLines.classList.remove('hidden');\n        if (hotspots) hotspots.classList.add('hidden');\n        const hcc = document.getElementById('hangout-crew-container');\n        if (hcc) hcc.remove();",
    `if (combatUI) combatUI.classList.remove('hidden');
        if (playerLines) playerLines.classList.remove('hidden');
        if (robotLines) robotLines.classList.remove('hidden');
        if (hotspots) hotspots.classList.add('hidden');
        const synergyEl2 = document.getElementById('synergy-display');
        if (synergyEl2) synergyEl2.style.display = '';
        const repairEl2 = document.getElementById('quick-repair-container');
        if (repairEl2) repairEl2.style.display = '';
        const bossCtrl2 = document.getElementById('boss-controls');
        if (bossCtrl2) bossCtrl2.style.display = '';
        const hcc = document.getElementById('hangout-crew-container');
        if (hcc) hcc.remove();`
);

// Also suppress damage popups and attack effects during hangout
// Wrap generateDamagePopup to skip in hangout mode
if (!code.includes('if (hangoutMode) return; // skip in hangout')) {
    code = code.replace(
        /function generateDamagePopup\(event, val, isCrit, isSpecialText, isEnemyDamage = false\) \{\r?\n/,
        `function generateDamagePopup(event, val, isCrit, isSpecialText, isEnemyDamage = false) {\n    if (hangoutMode) return; // skip in hangout\n`
    );
    console.log('✅ Suppressed damage popups in hangout mode');
}

fs.writeFileSync('app_v2.js', code);
console.log('✅ Hidden buffs/synergies/effects in hangout mode');

let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');
