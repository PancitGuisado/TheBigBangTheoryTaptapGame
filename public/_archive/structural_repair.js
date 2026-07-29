const fs = require('fs');
const acorn = require('acorn');
let app = fs.readFileSync('app_v2.js', 'utf8');

// The broken code block is exactly:
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

// Replace all occurrences of the broken block with the fixed block
app = app.split(brokenEquip).join(fixedEquip);

// Now we need to remove the TWO rogue closing braces we blindly injected before 'function openRobotsModal(event)'
app = app.replace(/\}\n\nfunction openRobotsModal/g, 'function openRobotsModal');

try {
    acorn.parse(app, { ecmaVersion: 2022 });
    console.log("Syntax is perfectly valid after structural repair!");
    fs.writeFileSync('app_v2.js', app);
} catch(e) {
    console.log("Error after structural repair:", e.toString());
}
