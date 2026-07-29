const fs = require('fs');
const acorn = require('acorn');
let app = fs.readFileSync('app_v2.js', 'utf8');

let lastIdx = app.lastIndexOf('function openRobotsModal');
app = app.slice(0, lastIdx) + '}\n\n' + app.slice(lastIdx);

try {
    acorn.parse(app, { ecmaVersion: 2022 });
    console.log("Syntax is valid after fixing second executeModalAction!");
    fs.writeFileSync('app_v2.js', app);
} catch(e) {
    console.log("Error after fix:", e.toString());
}
