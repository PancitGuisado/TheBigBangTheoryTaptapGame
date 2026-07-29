const fs = require('fs');

function extractFunctions(filename) {
    const code = fs.readFileSync(filename, 'utf8');
    const funcRegex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
    let match;
    const funcs = [];
    while ((match = funcRegex.exec(code)) !== null) {
        funcs.push(match[1]);
    }
    return funcs;
}

const oldFuncs = extractFunctions('backup_temp/app.js');
const newFuncs = extractFunctions('app_broken_backup.js');

const missing = oldFuncs.filter(f => !newFuncs.includes(f));
console.log("Functions missing from broken backup:");
console.log(missing.join('\n'));
