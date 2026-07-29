const fs = require('fs');
const acorn = require('acorn');
let app = fs.readFileSync('app_broken_backup.js', 'utf8');

try {
    acorn.parse(app, { ecmaVersion: 2022 });
    console.log("Syntax is perfectly valid in app_broken_backup.js!");
} catch(e) {
    console.log("Error in app_broken_backup.js:", e.toString());
}
