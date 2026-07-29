const fs = require('fs');
let app = fs.readFileSync('app_v2.js', 'utf8');
const lines = app.split(/\r?\n/);

let startBad = -1;
let endBad = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("function handleArenaTap(event)")) {
        // Search forward from here for the bad chunk
        for (let j = i; j < i + 150; j++) {
            if (lines[j] && lines[j].includes("const avatar = document.getElementById('modal-char-avatar');")) {
                startBad = j;
                break;
            }
        }
    }
}

if (startBad !== -1) {
    for (let j = startBad; j < startBad + 150; j++) {
        if (lines[j] && lines[j].includes("costContainer.innerHTML = `<span")) {
            endBad = j + 1; // include the closing brace line
            break;
        }
    }
}

if (startBad !== -1 && endBad !== -1) {
    console.log(`Found bad chunk from line ${startBad} to ${endBad}`);
    lines.splice(startBad, endBad - startBad + 1, 
    "    if (state.equipped['sheldon']) {",
    "        triggerUniqueVisuals('sheldon');",
    "    }",
    "    processDamage(tapDamage, 'sheldon');",
    "}");
    
    fs.writeFileSync('app_v2.js', lines.join('\n'));
    console.log("Replaced bad chunk successfully.");
} else {
    console.log("Failed to find chunk bounds:", startBad, endBad);
}
