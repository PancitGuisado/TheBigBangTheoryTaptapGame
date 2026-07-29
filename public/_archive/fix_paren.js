const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// The broken pattern looks like this:
// Math.floor(VAR.baseHp || 100) * Math.pow(VAR.lane === 'front' ? 1.40 : 1.25,
// It should be:
// Math.floor((VAR.baseHp || 100) * Math.pow(VAR.lane === 'front' ? 1.40 : 1.25,

app = app.replace(/Math\.floor\(([a-zA-Z0-9_\[\]]+)\.baseHp \|\| 100\) \* Math\.pow\(/g, "Math.floor((`$1.baseHp || 100) * Math.pow(");

fs.writeFileSync('app.js', app);
console.log("Fixed parenthesis error");
