const fs = require('fs');
let app = fs.readFileSync('app_v2.js', 'utf8');

// Find the start of the bad block inside handleArenaTap
const badStart = "    const avatar = document.getElementById('modal-char-avatar');\n    const name = document.getElementById('modal-char-name');";

// Find the end of the bad block (which is the end of the modal code)
const badEnd = "if (costContainer) {\n        costContainer.innerHTML = `<span class=\"${canAfford ? 'text-green-400' : 'text-red-400'}\">?? $${currentCost}</span>`;\n    }";

const idx1 = app.indexOf(badStart);
const idx2 = app.indexOf(badEnd);

if (idx1 !== -1 && idx2 !== -1) {
    const chunkToRemove = app.substring(idx1, idx2 + badEnd.length);
    
    const correctEnd = `    if (state.equipped['sheldon']) {
        triggerUniqueVisuals('sheldon');
    }
    processDamage(tapDamage, 'sheldon');
}`;

    app = app.replace(chunkToRemove, correctEnd);
    fs.writeFileSync('app_v2.js', app);
    console.log("Fixed handleArenaTap successfully!");
} else {
    console.log("Could not find the bad chunk.");
}
