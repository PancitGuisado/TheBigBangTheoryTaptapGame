const fs = require('fs');
let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
const advStartStr = 'function tryEquipRobot(robot) {';
const advEndStr = 'let activeRobotKey = null;';
let advStartIdx = broken.indexOf(advStartStr);
let advEndIdx = broken.indexOf(advEndStr);
console.log(broken.substring(advStartIdx, advEndIdx));
