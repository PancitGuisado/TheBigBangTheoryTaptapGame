const fs = require('fs');
let app = fs.readFileSync('backup_temp/app.js', 'utf8');
let s1 = app.indexOf('window.startGameEngine');
console.log(app.substring(s1, s1 + 1000));
