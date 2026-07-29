const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let s1 = app.indexOf('function renderActiveBattleLine() {');
let e1 = app.indexOf('function spawnEnemy() {');
console.log(app.substring(s1+2000, e1));
