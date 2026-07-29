const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let s1 = app.indexOf('function openModal(');
let e1 = app.indexOf('function closeModal(');
console.log(app.substring(s1, e1));
