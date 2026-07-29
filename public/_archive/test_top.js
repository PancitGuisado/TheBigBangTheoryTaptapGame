const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
// Let's print the first 50 lines of app.js
console.log(app.split('\n').slice(0, 50).join('\n'));
