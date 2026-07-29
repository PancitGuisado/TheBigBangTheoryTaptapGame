const fs = require('fs');
let app = fs.readFileSync('app_v2.js', 'utf8');
console.log("Matched rogue brace?", /}\s+function openRobotsModal/g.test(app));
