const fs = require('fs');
const acorn = require('acorn');
const app = fs.readFileSync('app_v2.js', 'utf8');

const ast = acorn.parse(app, { ecmaVersion: 2022, locations: true });

function findFunction(node, name, depth = 0) {
    if (node.type === 'FunctionDeclaration' && node.id && node.id.name === name) {
        console.log(`Found function ${name} at depth ${depth}, line ${node.loc.start.line}`);
        return true;
    }
    
    for (const key in node) {
        if (node[key] && typeof node[key] === 'object') {
            findFunction(node[key], name, depth + 1);
        }
    }
}
findFunction(ast, 'updateMapBackground');
