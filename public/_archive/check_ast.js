const fs = require('fs');
const acorn = require('acorn');
const app = fs.readFileSync('app_v2.js', 'utf8');

// Let's parse and find out if startGameEngine is at the top level or inside executeModalAction
const ast = acorn.parse(app, { ecmaVersion: 2022, locations: true });

function findStartGameEngine(node, depth = 0) {
    if (node.type === 'ExpressionStatement' &&
        node.expression.type === 'AssignmentExpression' &&
        node.expression.left.type === 'MemberExpression' &&
        node.expression.left.object.name === 'window' &&
        node.expression.left.property.name === 'startGameEngine') {
        console.log(`Found window.startGameEngine at depth ${depth}, line ${node.loc.start.line}`);
        return true;
    }
    
    for (const key in node) {
        if (node[key] && typeof node[key] === 'object') {
            findStartGameEngine(node[key], depth + 1);
        }
    }
}
findStartGameEngine(ast);
