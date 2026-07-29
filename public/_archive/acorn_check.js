const fs = require('fs');
const acorn = require('acorn');
try {
    acorn.parse(fs.readFileSync('app.js', 'utf8'), { ecmaVersion: 2022 });
    console.log("No syntax error");
} catch(e) {
    console.log(e.toString());
}
