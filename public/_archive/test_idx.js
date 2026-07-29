const fs = require('fs');
let app = fs.readFileSync('backup_temp/app.js', 'utf8');
console.log('playIntroCutscene:', app.indexOf('function playIntroCutscene()'));
console.log('startGameEngine:', app.indexOf('window.startGameEngine'));
