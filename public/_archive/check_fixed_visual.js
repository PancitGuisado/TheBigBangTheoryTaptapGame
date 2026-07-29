const fs = require('fs');
let appFixed = fs.readFileSync('app_fixed.js', 'utf8');
console.log("glowClass in app_fixed.js?", appFixed.includes('glowClass'));
console.log("hangout-bubble in app_fixed.js?", appFixed.includes('hangout-bubble'));
