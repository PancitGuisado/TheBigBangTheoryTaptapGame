const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');
let changed = false;

// 1. Add roomba_doom and quantum_drone to botLore in renderRobotBattleLine
if (!code.includes('roomba_doom')) {
    code = code.replace(
        /midas_speedster: \{ scale: 2\.3, z: 10, flying: true \}/g,
        `midas_speedster: { scale: 2.3, z: 10, flying: true },
                roomba_doom: { scale: 1.2, z: 10, flying: false },
                quantum_drone: { scale: 1.8, z: 20, flying: true }`
    );
    console.log('✅ Added roomba_doom & quantum_drone to botLore');
    changed = true;
} else {
    console.log('⏭ botLore already has roomba_doom');
}

// 2. Add triggerRobotVisuals function before startRobotAutomation
if (!code.includes('function triggerRobotVisuals')) {
    const triggerFn = `
function triggerRobotVisuals(robotId, config) {
    const el = document.getElementById('live-robot-' + robotId);
    const arena = document.getElementById('arena');
    const enemyContainer = document.getElementById('enemy-container');
    if (!el || !arena || !enemyContainer) return;

    // Trigger bump animation for melee
    if (config.lane === 'front') {
        el.classList.remove('robot-melee-bump');
        void el.offsetWidth;
        el.classList.add('robot-melee-bump');
    } 
    // Trigger laser for ranged
    else {
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
        if (config.type === 'flying') {
            laser.classList.add('plasma');
        } else {
            laser.classList.add('bullet');
        }

        laser.style.left = charCenterX + 'px';
        laser.style.top = charCenterY + 'px';
        laser.style.setProperty('--target-x', deltaX + 'px');
        laser.style.setProperty('--target-y', deltaY + 'px');
        laser.style.setProperty('--angle', angle + 'deg');

        document.body.appendChild(laser);

        setTimeout(() => {
            if (laser.parentNode) laser.remove();
            generateImpactSparks({ clientX: enemyCenterX, clientY: enemyCenterY });
        }, 400);
    }
}

`;
    code = code.replace(
        /function startRobotAutomation\(\)/,
        triggerFn + 'function startRobotAutomation()'
    );
    console.log('✅ Added triggerRobotVisuals function');
    changed = true;
} else {
    console.log('⏭ triggerRobotVisuals already exists');
}

// 3. Hook triggerRobotVisuals into startRobotAutomation
if (!code.includes('triggerRobotVisuals(robot.id')) {
    code = code.replace(
        /processDamage\(Math\.floor\(rbDmg \* rPerkMult\), 'robot_' \+ robot\.blueprintId\);/,
        `if (typeof triggerRobotVisuals === 'function') triggerRobotVisuals(robot.id, config);
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);`
    );
    console.log('✅ Hooked triggerRobotVisuals into startRobotAutomation');
    changed = true;
} else {
    console.log('⏭ triggerRobotVisuals already hooked');
}

if (changed) {
    fs.writeFileSync('app_v2.js', code);
    console.log('\n🎉 All patches applied successfully!');
} else {
    console.log('\nNo changes needed.');
}
