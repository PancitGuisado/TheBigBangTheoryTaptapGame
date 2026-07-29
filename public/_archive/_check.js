const fs = require('fs');
const vm = require('vm');
let code = fs.readFileSync('vectors.js', 'utf8');
code = code.replace('const vectors', 'var vectors');
const ctx = vm.createContext({});
vm.runInContext(code, ctx);
const keys = Object.keys(ctx.vectors);
console.log('Last 5 keys:', keys.slice(-5));
// Check if default key exists and what type it is
console.log('default exists:', 'default' in ctx.vectors);
console.log('default type:', typeof ctx.vectors.default);
