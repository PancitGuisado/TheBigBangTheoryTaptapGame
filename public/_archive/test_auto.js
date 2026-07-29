const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let s1 = app.indexOf('function startRobotAutomation(');
let e1 = app.indexOf('function generateDamagePopup(');
console.log(app.substring(s1, s1+300));
