const fs = require('fs');
let app = fs.readFileSync('app_v2.js', 'utf8');

const newVisuals = `
function triggerRobotVisuals(robotId, config) {
    const el = document.getElementById('robot-' + robotId);
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

app = app.replace('function startRobotAutomation() {', newVisuals + '\nfunction startRobotAutomation() {');

const oldAuto = `        window.robotTimers[robot.id] = setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            let rbDmg = config.baseDmg * robot.level;
            const rPerkMult = state.perks ? (1 + (state.perks.robotDmgMult * 0.1)) : 1;
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);
        }, rate);`;

const newAuto = `        window.robotTimers[robot.id] = setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            let rbDmg = config.baseDmg * robot.level;
            const rPerkMult = state.perks ? (1 + (state.perks.robotDmgMult * 0.1)) : 1;
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);
            triggerRobotVisuals(robot.id, config);
        }, rate);`;

app = app.replace(oldAuto, newAuto);

fs.writeFileSync('app_v2.js', app);
console.log("Updated app_v2.js with bot visuals");
