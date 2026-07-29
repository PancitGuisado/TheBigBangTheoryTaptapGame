const fs = require('fs');
let app = fs.readFileSync('app_v2.js', 'utf8');
const lines = app.split(/\r?\n/);

let startBad = -1;
let endBad = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("processDamage(tapDamage, 'sheldon');")) {
        startBad = i + 2; // Right after the } closing handleArenaTap
        break;
    }
}

if (startBad !== -1) {
    for (let j = startBad; j < lines.length; j++) {
        if (lines[j].includes("document.getElementById('action-modal').classList.remove('hidden');")) {
            // Find the next } after this line
            for (let k = j; k < j + 10; k++) {
                if (lines[k] && lines[k].trim() === "}") {
                    endBad = k;
                    break;
                }
            }
            break;
        }
    }
}

if (startBad !== -1 && endBad !== -1) {
    console.log(`Found rest of bad chunk from line ${startBad} to ${endBad}`);
    lines.splice(startBad, endBad - startBad + 1);
    
    fs.writeFileSync('app_v2.js', lines.join('\n'));
    console.log("Deleted rest of bad chunk successfully.");
    
    try {
        require('acorn').parse(lines.join('\n'), { ecmaVersion: 2022 });
        console.log("Syntax is perfectly valid after full cleanup!");
    } catch(e) {
        console.log("Still SyntaxError: ", e.toString());
    }
} else {
    console.log("Failed to find rest of chunk bounds:", startBad, endBad);
}
