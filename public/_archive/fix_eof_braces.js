const fs = require('fs');
const acorn = require('acorn');
let app = fs.readFileSync('app_v2.js', 'utf8');

for (let i = 0; i < 10; i++) {
    try {
        acorn.parse(app, { ecmaVersion: 2022 });
        console.log(`Success! Valid syntax! Removed ${i} braces.`);
        fs.writeFileSync('app_v2.js', app);
        process.exit(0);
    } catch(e) {
        if (!e.toString().includes('Unexpected token')) {
            console.log("Other error:", e.toString());
            process.exit(1);
        }
        // If there's an unexpected token at EOF, it usually means an extra closing brace
        // Find the last closing brace and remove it
        let lastBraceIdx = app.lastIndexOf('}');
        if (lastBraceIdx === -1) break;
        app = app.substring(0, lastBraceIdx) + app.substring(lastBraceIdx + 1);
    }
}

console.log("Failed to fix syntax after removing 10 braces.");
