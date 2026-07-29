const fs = require('fs');
const acorn = require('acorn');
let app = fs.readFileSync('app_v2.js', 'utf8');

const brokenEquip = `                if (rConfig.lane === 'front') activeFrontlineCount++;
                else activeBacklineCount++;
        state.equipped[activeModalKey] = true;
    } else if (mode === 'unequip') {`;

const fixedEquip = `                if (rConfig.lane === 'front') activeFrontlineCount++;
                else activeBacklineCount++;
            }
        }
        if (activeTotalCount < 5) {
            if (config.lane === 'front' && activeFrontlineCount < 2) state.equipped[activeModalKey] = true;
            else if ((config.lane === 'back' || config.lane === 'mid') && activeBacklineCount < 3) state.equipped[activeModalKey] = true;
        }
    } else if (mode === 'unequip') {`;

app = app.split(brokenEquip).join(fixedEquip);
app = app.replace(/\}\n\nfunction openRobotsModal/g, 'function openRobotsModal');

for (let i = 0; i < 20; i++) {
    try {
        acorn.parse(app, { ecmaVersion: 2022 });
        console.log(`Success! Valid syntax! Adjusted ${i} EOF braces.`);
        fs.writeFileSync('app_v2.js', app);
        process.exit(0);
    } catch(e) {
        if (!e.toString().includes('Unexpected token')) {
            console.log("Other error:", e.toString());
            process.exit(1);
        }
        let lastBraceIdx = app.lastIndexOf('}');
        if (lastBraceIdx === -1) break;
        app = app.substring(0, lastBraceIdx) + app.substring(lastBraceIdx + 1);
    }
}
console.log("Failed to fix syntax after adjusting 20 EOF braces.");
fs.writeFileSync('app_v2.js', app);
