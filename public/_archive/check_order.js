const fs = require('fs');
const lines = fs.readFileSync('app_v2.js', 'utf8').split('\n');
console.log("executeModalAction: " + lines.findIndex(l => l.includes('function executeModalAction')));
console.log("openRobotsModal: " + lines.findIndex(l => l.includes('function openRobotsModal')));
console.log("startGameEngine: " + lines.findIndex(l => l.includes('window.startGameEngine')));
