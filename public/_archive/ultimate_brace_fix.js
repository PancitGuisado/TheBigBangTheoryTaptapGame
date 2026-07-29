const fs = require('fs');
const acorn = require('acorn');
let app = fs.readFileSync('app_v2.js', 'utf8');

// 1. Find the LAST occurrence of "function openRobotsModal"
let lastIdx = app.lastIndexOf('function openRobotsModal');

// 2. Insert the missing closing brace for the second executeModalAction
app = app.slice(0, lastIdx) + '}\n\n' + app.slice(lastIdx);

// 3. Remove the extra closing brace at the very end of the file
// Find the last closing brace in the file
let lastBraceIdx = app.lastIndexOf('}');
app = app.slice(0, lastBraceIdx) + app.slice(lastBraceIdx + 1);

try {
    acorn.parse(app, { ecmaVersion: 2022 });
    console.log("Syntax is fully valid!");
    fs.writeFileSync('app_v2.js', app);
} catch(e) {
    console.log("Error after fix:", e.toString());
}
