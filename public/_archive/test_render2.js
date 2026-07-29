const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let s1 = app.indexOf('function renderActiveBattleLine() {');
let e1 = app.indexOf('function generateDamagePopup(');
console.log(app.substring(s1+1000, s1+2000));
