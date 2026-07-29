const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let s1 = app.indexOf('openFoodShop(event)');
console.log(app.substring(s1 - 200, s1 + 200));
