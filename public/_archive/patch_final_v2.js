const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// 1. Add botLore
code = code.replace(
    /midas_speedster: \{ scale: 2\.3, z: 10, flying: true \}/g,
    `midas_speedster: { scale: 2.3, z: 10, flying: true },
                roomba_doom: { scale: 1.2, z: 10, flying: false },
                quantum_drone: { scale: 1.8, z: 20, flying: true }`
);

// 2. Add triggerRobotVisuals to startRobotAutomation
let targetBlock = `        window.robotTimers[robot.id] = setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            let rbDmg = config.baseDmg * robot.level;
            const rPerkMult = state.perks ? (1 + (state.perks.robotDmgMult * 0.1)) : 1;
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);
        }, rate);`;

let replacementBlock = `        window.robotTimers[robot.id] = setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            let rbDmg = config.baseDmg * robot.level;
            const rPerkMult = state.perks ? (1 + (state.perks.robotDmgMult * 0.1)) : 1;
            if (typeof triggerRobotVisuals === 'function') triggerRobotVisuals(robot.id, config);
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);
        }, rate);`;

if (code.includes(targetBlock)) {
    code = code.replace(targetBlock, replacementBlock);
    console.log("Successfully patched startRobotAutomation");
} else {
    console.log("WARNING: Could not find startRobotAutomation target block!");
}

fs.writeFileSync('app_v2.js', code);
console.log('Patched app_v2.js successfully.');
