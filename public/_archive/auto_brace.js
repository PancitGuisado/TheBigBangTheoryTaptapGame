const fs = require('fs');
const acorn = require('acorn');

let app = fs.readFileSync('app.js', 'utf8');

for (let i = 0; i < 10; i++) {
    try {
        acorn.parse(app, { ecmaVersion: 2022 });
        console.log(`Success with ${i} extra braces!`);
        fs.writeFileSync('app.js', app);
        process.exit(0);
    } catch(e) {
        if (!e.toString().includes('Unexpected token')) {
            console.log("Other error:", e.toString());
        }
        app += '\n}';
    }
}
console.log("Failed to fix syntax after adding 10 braces.");
