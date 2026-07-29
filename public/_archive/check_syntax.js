const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

let braceCount = 0;
let inString = false;
let inTemplate = false;
let stringChar = '';

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const prev = i > 0 ? content[i-1] : '';
    
    if (inString) {
        if (char === stringChar && prev !== '\\') inString = false;
    } else if (inTemplate) {
        if (char === '`' && prev !== '\\') inTemplate = false;
        // Ignore ${ inside template for now as it doesn't affect raw brace count if we just count all { and }
    } else {
        if (char === "'" || char === '"') {
            inString = true;
            stringChar = char;
        } else if (char === '`') {
            inTemplate = true;
        } else if (char === '{') {
            braceCount++;
        } else if (char === '}') {
            braceCount--;
        }
    }
}
console.log("Brace count:", braceCount);
console.log("In template:", inTemplate);
console.log("In string:", inString);
