const fs = require('fs');
try {
    const vectors = fs.readFileSync('vectors.js', 'utf8');
    // It's just a variable declaration `const vectors = { ... };`
    require('acorn').parse(vectors, { ecmaVersion: 2022 });
    console.log("vectors.js syntax is valid.");
} catch(e) {
    console.log("vectors.js SyntaxError: ", e.toString());
}
