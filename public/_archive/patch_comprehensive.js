const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// ============================================================
// PATCH 1: Fix the broken first executeModalAction (lines ~1579-1603)
// The equip branch has mangled braces. Replace the entire broken
// equip/unequip section with properly structured code.
// ============================================================
const brokenEquip = `    } else if (mode === 'equip') {
        let activeTotalCount = 0;
        let activeBacklineCount = 0;
        let activeFrontlineCount = 0;
        for (const [rKey, rConfig] of Object.entries(characters)) {
            if (state.equipped[rKey]) {
                activeTotalCount++;
                if (rConfig.lane === 'front') activeFrontlineCount++;
                else activeBacklineCount++;
        state.equipped[activeModalKey] = true;
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

// ROBOTS CRAFTING SYSTEM
}`;

const fixedEquip = `    } else if (mode === 'equip') {
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

if (code.includes(brokenEquip)) {
    code = code.replace(brokenEquip, fixedEquip);
    console.log('✅ PATCH 1: Fixed broken executeModalAction braces');
} else {
    console.log('⚠️ PATCH 1: Could not find broken equip block (may already be fixed)');
}

// ============================================================
// PATCH 2: Remove the stray } at end of file (line ~3273)  
// This } was paired with the broken { from patch 1
// ============================================================
// The stray } is right after window.executeRobotRepair closing };
const strayBrace = `};
}

`;
const fixedEnd = `};

`;
if (code.includes(strayBrace)) {
    code = code.replace(strayBrace, fixedEnd);
    console.log('✅ PATCH 2: Removed stray } at end of file');
} else {
    console.log('⚠️ PATCH 2: Stray brace not found');
}

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
} else {
    console.log('⏭ PATCH 3: botLore already has bots');
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
    console.log('✅ PATCH 4: Added triggerRobotVisuals function');
} else {
    console.log('⏭ PATCH 4: triggerRobotVisuals already exists');
}

// ============================================================
// PATCH 5: Hook triggerRobotVisuals into startRobotAutomation
// ============================================================
if (!code.includes('triggerRobotVisuals(robot.id')) {
    code = code.replace(
        /processDamage\(Math\.floor\(rbDmg \* rPerkMult\), 'robot_' \+ robot\.blueprintId\);/,
        `if (typeof triggerRobotVisuals === 'function') triggerRobotVisuals(robot.id, config);
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);`
    );
    console.log('✅ PATCH 5: Hooked triggerRobotVisuals into startRobotAutomation');
} else {
    console.log('⏭ PATCH 5: Already hooked');
}

fs.writeFileSync('app_v2.js', code);
console.log('\n🎉 All patches complete!');

// Verify brace balance
let depth = 0;
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
    for (const ch of lines[i]) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
    }
    if (depth < 0) {
        console.log('❌ BRACE ERROR: Negative depth at line ' + (i+1));
        break;
    }
}
console.log('Final brace depth:', depth, depth === 0 ? '✅' : '❌ UNBALANCED');
