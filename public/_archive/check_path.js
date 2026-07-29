const fs = require('fs');
const acorn = require('acorn');
const app = fs.readFileSync('app_v2.js', 'utf8');

const ast = acorn.parse(app, { ecmaVersion: 2022, locations: true });

function findPath(node, targetLine, path = []) {
    if (node.loc && node.loc.start.line === targetLine) {
        if (node.type === 'ExpressionStatement') {
            console.log("Path:");
            path.forEach(p => console.log(p.type, p.id ? p.id.name : ''));
            return true;
        }
    }
    
    for (const key in node) {
        if (node[key] && typeof node[key] === 'object') {
            if (findPath(node[key], targetLine, [...path, node])) {
                return true;
            }
        }
    }
}
findPath(ast, 3002);
