const fs = require('fs');
const acorn = require('acorn');
let app = fs.readFileSync('perfect_rebuild.js', 'utf8');

try {
    acorn.parse(app, { ecmaVersion: 2022 });
    console.log("Syntax perfectly valid in perfect_rebuild.js!");
} catch(e) {
    console.log("Error in perfect_rebuild.js:", e.toString());
}
