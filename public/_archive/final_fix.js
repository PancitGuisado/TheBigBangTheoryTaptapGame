const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// The corrupted pattern: Math.floor(( + `config` + `.baseHp || 100)
app = app.replace(/Math\.floor\(\( \+ `([a-zA-Z0-9_\[\]]+)` \+ `\.baseHp/g, 'Math.floor(($1.baseHp');

fs.writeFileSync('app.js', app);
console.log("Fixed Math.floor backticks completely");
