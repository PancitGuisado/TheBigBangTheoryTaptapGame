const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// ============================================================
// PATCH 1: Fix broken first executeModalAction equip branch
// ============================================================
const brokenEquipRegex = /\} else if \(mode === 'equip'\) \{\s+let activeTotalCount = 0;\s+let activeBacklineCount = 0;\s+let activeFrontlineCount = 0;\s+for \(const \[rKey, rConfig\] of Object\.entries\(characters\)\) \{\s+if \(state\.equipped\[rKey\]\) \{\s+activeTotalCount\+\+;\s+if \(rConfig\.lane === 'front'\) activeFrontlineCount\+\+;\s+else activeBacklineCount\+\+;\s+state\.equipped\[activeModalKey\] = true;\s+\} else if \(mode === 'unequip'\) \{\s+state\.equipped\[activeModalKey\] = false;\s+delete state\.equipped\[activeModalKey\];\s+\}\s+saveProgress\(\);\s+syncUI\(\);\s+renderRosterGrid\(\);\s+renderActiveBattleLine\(\);\s+startAutomationEngines\(\);\s+closeModal\(\);\s+\}\s+\/\/ ROBOTS CRAFTING SYSTEM\s+\}/;

const fixedFirstEquip = `} else if (mode === 'equip') {
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
    openModal(null, activeModalKey);
}

// ROBOTS CRAFTING SYSTEM`;

if (brokenEquipRegex.test(code)) {
    code = code.replace(brokenEquipRegex, fixedFirstEquip);
    console.log('✅ PATCH 1: Fixed first executeModalAction');
} else {
    console.log('⚠️ PATCH 1: Pattern not found');
}

// ============================================================
// PATCH 2: Fix second executeModalAction - add UI refresh
// ============================================================
const secondBroken = /(\} else if \(mode === 'equip'\) \{\r?\n\s+state\.equipped\[activeModalKey\] = true;\r?\n\s+\} else if \(mode === 'unequip'\) \{\r?\n\s+state\.equipped\[activeModalKey\] = false;\r?\n\s+delete state\.equipped\[activeModalKey\];\r?\n\s+closeModal\(\);\r?\n\s+\}\r?\n\s+if \(state\.score > 0\) \{\r?\n\s+\/\/ checkMilestones\(\);\r?\n\s+\}\r?\n\})/;

const fixedSecond = `} else if (mode === 'equip') {
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
    openModal(null, activeModalKey);
}`;

if (secondBroken.test(code)) {
    code = code.replace(secondBroken, fixedSecond);
    console.log('✅ PATCH 2: Fixed second executeModalAction with UI refresh');
} else {
    console.log('⚠️ PATCH 2: Second pattern not found');
}

// ============================================================
// PATCH 3: Remove stray } at end of file
// ============================================================
code = code.replace(/\};\s*\}\s*$/, '};\n\n');
console.log('✅ PATCH 3: Cleaned end of file');

// ============================================================
// PATCH 4: Add bots to botLore
// ============================================================
if (!code.includes('roomba_doom')) {
    code = code.replace(
        /midas_speedster: \{ scale: 2\.3, z: 10, flying: true \}/g,
        `midas_speedster: { scale: 2.3, z: 10, flying: true },
                roomba_doom: { scale: 1.2, z: 10, flying: false },
                quantum_drone: { scale: 1.8, z: 20, flying: true }`
    );
    console.log('✅ PATCH 4: Added bots to botLore');
}

// ============================================================
// PATCH 5: Add triggerRobotVisuals function
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
    console.log('✅ PATCH 5: Added triggerRobotVisuals');
}

// ============================================================
// PATCH 6: Hook triggerRobotVisuals
// ============================================================
if (!code.includes('triggerRobotVisuals(robot.id')) {
    code = code.replace(
        /processDamage\(Math\.floor\(rbDmg \* rPerkMult\), 'robot_' \+ robot\.blueprintId\);/,
        `if (typeof triggerRobotVisuals === 'function') triggerRobotVisuals(robot.id, config);
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);`
    );
    console.log('✅ PATCH 6: Hooked triggerRobotVisuals');
}

// ============================================================
// PATCH 7: Fix hangout mode - renderHangoutCrew
// ============================================================
const oldToggleRegex = /function toggleHangoutMode\(event\) \{[\s\S]*?if \(hotspots\) hotspots\.classList\.add\('hidden'\);\s*\}\s*\}/;

const newToggle = `function toggleHangoutMode(event) {
    if (event) event.stopPropagation();
    hangoutMode = !hangoutMode;
    
    const btnText = document.getElementById('hangout-btn-text');
    if (btnText) btnText.innerText = hangoutMode ? 'BACK TO BATTLE' : 'HANG OUT';
    
    const combatUI = document.getElementById('enemy-battle-slot');
    const playerLines = document.getElementById('player-battle-line');
    const robotLines = document.getElementById('robot-battle-line');
    const hotspots = document.getElementById('hangout-hotspots');
    
    if (hangoutMode) {
        if (combatUI) combatUI.classList.add('hidden');
        if (playerLines) playerLines.classList.add('hidden');
        if (robotLines) robotLines.classList.add('hidden');
        if (hotspots) hotspots.classList.remove('hidden');
        renderHangoutCrew();
    } else {
        if (combatUI) combatUI.classList.remove('hidden');
        if (playerLines) playerLines.classList.remove('hidden');
        if (robotLines) robotLines.classList.remove('hidden');
        if (hotspots) hotspots.classList.add('hidden');
        const hcc = document.getElementById('hangout-crew-container');
        if (hcc) hcc.remove();
    }
}

function renderHangoutCrew() {
    let container = document.getElementById('hangout-crew-container');
    if (container) container.remove();
    
    const arena = document.getElementById('arena');
    if (!arena) return;
    
    container = document.createElement('div');
    container.id = 'hangout-crew-container';
    container.className = 'absolute inset-0 z-[55] pointer-events-none';
    arena.appendChild(container);
    
    const hangoutPositions = {
        sheldon: { bottom: '14%', left: '22%', role: 'sitting' },
        leonard: { bottom: '14%', left: '38%', role: 'sitting' },
        penny:   { bottom: '14%', left: '52%', role: 'sitting' },
        howard:  { bottom: '14%', left: '76%', role: 'sitting' },
        raj:     { bottom: '22%', left: '8%',  role: 'behind' },
        amy:     { bottom: '22%', left: '68%', role: 'behind' },
        bernie:  { bottom: '22%', left: '48%', role: 'behind' },
        stuart:  { bottom: '22%', left: '28%', role: 'behind' }
    };
    
    let idx = 0;
    for (const [key, config] of Object.entries(characters)) {
        const isEquipped = state.equipped && state.equipped[key];
        const hasLevel = state.roster[key] && state.roster[key].level > 0;
        if (!isEquipped || !hasLevel) continue;
        
        const pos = hangoutPositions[key] || { bottom: (22) + '%', left: (8 + idx * 12) + '%', role: 'behind' };
        
        const charDiv = document.createElement('div');
        charDiv.className = 'absolute flex flex-col items-center pointer-events-auto cursor-pointer hover:brightness-125 transition-all duration-300';
        charDiv.style.transform = 'scale(0.55)';
        charDiv.style.transformOrigin = 'bottom center';
        charDiv.style.filter = 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))';
        
        charDiv.style.bottom = pos.bottom;
        if (pos.left) charDiv.style.left = pos.left;
        if (pos.right) charDiv.style.right = pos.right;
        
        if (pos.role === 'behind') {
            charDiv.style.clipPath = 'inset(0 0 55% 0)';
            charDiv.style.zIndex = '54';
        } else {
            charDiv.style.zIndex = String(56 + idx);
        }
        
        charDiv.onclick = function(e) { e.stopPropagation(); openModal(e, key); };
        
        charDiv.style.animation = 'hangout-idle ' + (2.5 + Math.random() * 1.5) + 's ease-in-out infinite';
        charDiv.style.animationDelay = (Math.random() * 2) + 's';
        
        const vectorHtml = typeof getVectorFrame === 'function' ? getVectorFrame(key) : (vectors[key] || '');
        
        charDiv.innerHTML = '<div class="character-vector-wrapper flex items-end justify-center">' + vectorHtml + '</div>' +
            '<span class="bg-amber-950/90 text-white border border-amber-700 font-bold text-[8px] px-1.5 py-0.5 rounded whitespace-nowrap uppercase tracking-tighter shadow-lg mt-1">' +
            config.name + '</span>';
        
        container.appendChild(charDiv);
        idx++;
    }
}`;

if (oldToggleRegex.test(code)) {
    code = code.replace(oldToggleRegex, newToggle);
    console.log('✅ PATCH 7: Patched hangout mode with crew rendering');
} else {
    console.log('⚠️ PATCH 7: toggleHangoutMode not found');
}

fs.writeFileSync('app_v2.js', code);

// Verify brace balance
let depth = 0;
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
    for (const ch of lines[i]) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
    }
    if (depth < 0) {
        console.log('❌ Negative depth at line ' + (i+1));
        break;
    }
}
console.log('Final brace depth:', depth, depth === 0 ? '✅ BALANCED' : '❌ UNBALANCED');
