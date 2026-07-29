const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let s1 = app.indexOf('function spawnEnemy() {');
console.log(app.substring(s1, s1 + 1000));
