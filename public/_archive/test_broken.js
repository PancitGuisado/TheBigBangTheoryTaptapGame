const fs = require('fs');
let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
console.log('broken length:', broken.length);
console.log('has updateMapBackground:', broken.indexOf('function updateMapBackground') !== -1);
console.log('has startGameEngine:', broken.indexOf('window.startGameEngine') !== -1);
