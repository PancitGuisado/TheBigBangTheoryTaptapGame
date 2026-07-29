const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// ============================================================
// PATCH 1: Fix the broken first executeModalAction
// Use regex to handle mixed line endings (\r\n and \n)
// ============================================================
const brokenPattern = /\} else if \(mode === 'equip'\) \{\s+let activeTotalCount = 0;\s+let activeBacklineCount = 0;\s+let activeFrontlineCount = 0;\s+for \(const \[rKey, rConfig\] of Object\.entries\(characters\)\) \{\s+if \(state\.equipped\[rKey\]\) \{\s+activeTotalCount\+\+;\s+if \(rConfig\.lane === 'front'\) activeFrontlineCount\+\+;\s+else activeBacklineCount\+\+;\s+state\.equipped\[activeModalKey\] = true;\s+\} else if \(mode === 'unequip'\) \{\s+state\.equipped\[activeModalKey\] = false;\s+delete state\.equipped\[activeModalKey\];\s+\}\s+saveProgress\(\);\s+syncUI\(\);\s+renderRosterGrid\(\);\s+renderActiveBattleLine\(\);\s+startAutomationEngines\(\);\s+closeModal\(\);\s+\}\s+\/\/ ROBOTS CRAFTING SYSTEM\s+\}/;

const fixedEquip = `} else if (mode === 'equip') {
        let activeTotalCount = 0;
        let activeBacklineCount = 0;
        let activeFrontlineCount = 0;
        for (const [rKey, rConfig] of Object.entries(characters)) {
            if (state.equipped[rKey]) {
                activeTotalCount++;
                if (rConfig.lane === 'front') activeFrontlineCount++;
                else activeBacklineCount++;
            }
        }
        
        if (activeTotalCount < 5) {
            if (config.lane === 'front' && activeFrontlineCount < 2) state.equipped[activeModalKey] = true;
            if ((config.lane === 'back' || config.lane === 'mid') && activeBacklineCount < 3) state.equipped[activeModalKey] = true;
        }
    } else if (mode === 'unequip') {
        state.equipped[activeModalKey] = false;
        delete state.equipped[activeModalKey];
    }

    saveProgress();
    syncUI();
    renderRosterGrid();
    renderActiveBattleLine();
    startAutomationEngines();
    closeModal();
}

// ROBOTS CRAFTING SYSTEM`;

if (brokenPattern.test(code)) {
    code = code.replace(brokenPattern, fixedEquip);
    console.log('✅ PATCH 1: Fixed broken executeModalAction braces');
} else {
    console.log('⚠️ PATCH 1: Pattern not found, trying line-based approach...');
    
    // Line-based approach: find the broken section and replace it
    const lines = code.split('\n');
    let startIdx = -1;
    let endIdx = -1;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('state.equipped[activeModalKey] = true;') && 
            i > 0 && lines[i-1].includes('else activeBacklineCount++')) {
            // Found the mangled line - go back to find the start of the equip branch
            for (let j = i; j >= 0; j--) {
                if (lines[j].includes("} else if (mode === 'equip')")) {
                    startIdx = j;
                    break;
                }
            }
            // Find the end (the stray } after ROBOTS CRAFTING SYSTEM)
            for (let j = i; j < lines.length; j++) {
                if (lines[j].trim() === '}' && j > 0 && lines[j-1].includes('// ROBOTS CRAFTING SYSTEM')) {
                    endIdx = j;
                    break;
                }
                // Also check for } on next line after comment
                if (lines[j].includes('// ROBOTS CRAFTING SYSTEM')) {
                    if (j + 1 < lines.length && lines[j+1].trim() === '}') {
                        endIdx = j + 1;
                        break;
                    }
                }
            }
            break;
        }
    }
    
    if (startIdx >= 0 && endIdx >= 0) {
        const fixedLines = [
            `    } else if (mode === 'equip') {`,
            `        let activeTotalCount = 0;`,
            `        let activeBacklineCount = 0;`,
            `        let activeFrontlineCount = 0;`,
            `        for (const [rKey, rConfig] of Object.entries(characters)) {`,
            `            if (state.equipped[rKey]) {`,
            `                activeTotalCount++;`,
            `                if (rConfig.lane === 'front') activeFrontlineCount++;`,
            `                else activeBacklineCount++;`,
            `            }`,
            `        }`,
            `        `,
            `        if (activeTotalCount < 5) {`,
            `            if (config.lane === 'front' && activeFrontlineCount < 2) state.equipped[activeModalKey] = true;`,
            `            if ((config.lane === 'back' || config.lane === 'mid') && activeBacklineCount < 3) state.equipped[activeModalKey] = true;`,
            `        }`,
            `    } else if (mode === 'unequip') {`,
            `        state.equipped[activeModalKey] = false;`,
            `        delete state.equipped[activeModalKey];`,
            `    }`,
            ``,
            `    saveProgress();`,
            `    syncUI();`,
            `    renderRosterGrid();`,
            `    renderActiveBattleLine();`,
            `    startAutomationEngines();`,
            `    closeModal();`,
            `}`,
            ``,
            `// ROBOTS CRAFTING SYSTEM`
        ];
        
        lines.splice(startIdx, endIdx - startIdx + 1, ...fixedLines);
        code = lines.join('\n');
        console.log(`✅ PATCH 1 (line-based): Fixed lines ${startIdx+1}-${endIdx+1}`);
    } else {
        console.log('❌ PATCH 1: Could not locate broken section. startIdx=' + startIdx + ' endIdx=' + endIdx);
    }
}

// ============================================================
// PATCH 2: Remove stray } at end of file
// ============================================================
// Find }; followed by } at end of file
code = code.replace(/\};\s*\}\s*$/, '};\n\n');
console.log('✅ PATCH 2: Cleaned end of file');

// ============================================================
// PATCH 3: Add roomba_doom and quantum_drone to botLore
// ============================================================
if (!code.includes('roomba_doom')) {
    code = code.replace(
        /midas_speedster: \{ scale: 2\.3, z: 10, flying: true \}/g,
        `midas_speedster: { scale: 2.3, z: 10, flying: true },
                roomba_doom: { scale: 1.2, z: 10, flying: false },
                quantum_drone: { scale: 1.8, z: 20, flying: true }`
    );
    console.log('✅ PATCH 3: Added roomba_doom & quantum_drone to botLore');
}

// ============================================================
// PATCH 4: Add triggerRobotVisuals function
// ============================================================
if (!code.includes('function triggerRobotVisuals')) {
    const triggerFn = `
function triggerRobotVisuals(robotId, config) {
    const el = document.getElementById('live-robot-' + robotId);
    const arena = document.getElementById('arena');
    const enemyContainer = document.getElementById('enemy-container');
    if (!el || !arena || !enemyContainer) return;
    if (config.lane === 'front') {
        el.classList.remove('robot-melee-bump');
        void el.offsetWidth;
        el.classList.add('robot-melee-bump');
    } else {
        const rect = el.getBoundingClientRect();
        const enemy = enemyContainer.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        const enemyCenterX = enemy.left + enemy.width / 2;
        const enemyCenterY = enemy.top + enemy.height / 2;
        const deltaX = enemyCenterX - charCenterX;
        const deltaY = enemyCenterY - charCenterY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const laser = document.createElement('div');
        laser.className = 'laser-beam';
        if (config.type === 'flying') { laser.classList.add('plasma'); } else { laser.classList.add('bullet'); }
        laser.style.left = charCenterX + 'px';
        laser.style.top = charCenterY + 'px';
        laser.style.setProperty('--target-x', deltaX + 'px');
        laser.style.setProperty('--target-y', deltaY + 'px');
        laser.style.setProperty('--angle', angle + 'deg');
        document.body.appendChild(laser);
        setTimeout(() => { if (laser.parentNode) laser.remove(); generateImpactSparks({ clientX: enemyCenterX, clientY: enemyCenterY }); }, 400);
    }
}

`;
    code = code.replace('function startRobotAutomation()', triggerFn + 'function startRobotAutomation()');
    console.log('✅ PATCH 4: Added triggerRobotVisuals');
}

// ============================================================
// PATCH 5: Hook triggerRobotVisuals
// ============================================================
if (!code.includes('triggerRobotVisuals(robot.id')) {
    code = code.replace(
        /processDamage\(Math\.floor\(rbDmg \* rPerkMult\), 'robot_' \+ robot\.blueprintId\);/,
        `if (typeof triggerRobotVisuals === 'function') triggerRobotVisuals(robot.id, config);
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);`
    );
    console.log('✅ PATCH 5: Hooked triggerRobotVisuals');
}

fs.writeFileSync('app_v2.js', code);
console.log('\n🎉 All patches complete!');

// Verify
let depth = 0;
const verifyLines = code.split('\n');
for (let i = 0; i < verifyLines.length; i++) {
    for (const ch of verifyLines[i]) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
    }
}
console.log('Final brace depth:', depth, depth === 0 ? '✅ BALANCED' : '❌ UNBALANCED');
