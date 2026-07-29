const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let s1 = app.indexOf('function renderRosterGrid() {');
let e1 = app.indexOf('function renderActiveBattleLine() {');
console.log(app.substring(s1, e1));
