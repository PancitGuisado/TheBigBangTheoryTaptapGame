const fs = require('fs');
try {
    const app = fs.readFileSync('app.js', 'utf8');
    require('acorn').parse(app, { ecmaVersion: 2022 });
    console.log("app.js syntax is VALID!");
} catch(e) {
    console.log("app.js SyntaxError: ", e.toString());
}
