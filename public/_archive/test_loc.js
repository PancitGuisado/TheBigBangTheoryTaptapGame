const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let s1 = app.indexOf('function openLocationMap() {');
console.log(app.substring(s1 - 200, s1 + 200));
