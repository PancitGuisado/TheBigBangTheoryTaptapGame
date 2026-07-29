const fs = require('fs');
let lines = fs.readFileSync('app_v2.js', 'utf8').split('\n');
let idx = lines.findIndex(l => l.includes('function openRobotsModal'));
for (let i = idx - 5; i <= idx; i++) {
    console.log(i + ": " + lines[i]);
}
