const fs = require('fs');

// 1. Get baseline
let app = fs.readFileSync('backup_temp/app.js', 'utf8');

// 2. Extract advanced bot UI from app_broken_backup.js
let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
const advStartStr = 'function tryEquipRobot(robot) {';
const advEndStr = 'let activeRobotKey = null;';
let advStartIdx = broken.indexOf(advStartStr);
let advEndIdx = broken.indexOf(advEndStr);
let advBlock = broken.substring(advStartIdx, advEndIdx);

// 3. Replace basic bot UI in baseline with advanced bot UI
let baseStartIdx = app.indexOf(advStartStr);
let baseEndIdx = app.indexOf(advEndStr);
app = app.substring(0, baseStartIdx) + advBlock + app.substring(baseEndIdx);

// 4. Save to temp app.js so that update_sprites and inject_features can run
fs.writeFileSync('app.js', app);
