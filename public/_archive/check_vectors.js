const fs = require('fs');
try {
    const app = fs.readFileSync('vectors.js', 'utf8');
    require('acorn').parse(app, { ecmaVersion: 2022 });
    console.log("vectors.js syntax is VALID!");
} catch(e) {
    console.log("vectors.js SyntaxError: ", e.toString());
}
