const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// 2. Add triggerRobotVisuals to startRobotAutomation using regex
code = code.replace(
    /processDamage\(Math\.floor\(rbDmg \* rPerkMult\), 'robot_' \+ robot\.blueprintId\);/g,
    `if (typeof triggerRobotVisuals === 'function') triggerRobotVisuals(robot.id, config);
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);`
);

fs.writeFileSync('app_v2.js', code);
console.log('Patched triggerRobotVisuals successfully.');
