const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const startStr = "function applyEnemyCounter(damageAmount) {";
const endStr = "// HOSPITAL SYSTEM: Send injured character to hospital";

const startIdx = app.indexOf(startStr);
const endIdx = app.indexOf(endStr);

if (startIdx === -1 || endIdx === -1) {
    console.log("Could not find boundaries!");
    process.exit(1);
}

const correctAec = `function applyEnemyCounter(damageAmount) {
    const activeChars = Object.keys(state.equipped).filter(key => state.equipped[key] && state.roster[key].level > 0);
    if (activeChars.length === 0) return;
    
    // Distribute damage across all active characters
    const damagePerChar = Math.ceil(damageAmount / activeChars.length);
    
    activeChars.forEach(charKey => {
        const charData = state.roster[charKey];
        const config = characters[charKey];
        const maxHp = charData.maxHp || Math.floor((config.baseHp || 100) * Math.pow(1.25, charData.level - 1));
        
        if (typeof charData.currentHp === 'undefined' || isNaN(charData.currentHp)) {
            charData.currentHp = maxHp;
            charData.maxHp = maxHp;
        }
        
        charData.currentHp -= damagePerChar;
        
        const charEl = document.getElementById('live-character-' + charKey);
        if (charEl) {
            const rect = charEl.getBoundingClientRect();
            const simulatedEvent = {
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2
            };
            generateDamagePopup(simulatedEvent, damagePerChar, false, false, true);
        }
        
        // Check if character should be hospitalized
        if (charData.currentHp <= 0) {
            sendToHospital(charKey);
        }
    });
    
    renderActiveBattleLine();
}

`;

app = app.substring(0, startIdx) + correctAec + app.substring(endIdx);
fs.writeFileSync('app.js', app);
console.log("Restored applyEnemyCounter successfully!");
