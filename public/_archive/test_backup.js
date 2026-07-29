const fs = require('fs');
let backup = fs.readFileSync('backup_temp/app.js', 'utf8');
console.log('backup length:', backup.length);
console.log('has updateMapBackground:', backup.indexOf('function updateMapBackground') !== -1);
console.log('has startGameEngine:', backup.indexOf('window.startGameEngine') !== -1);
