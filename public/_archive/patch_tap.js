const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const tapRegex = /function handleArenaTap\(event\) \{/;
const tapReplacement = `function handleArenaTap(event) {
    if (typeof hangoutMode !== 'undefined' && hangoutMode) return;`;

app = app.replace(tapRegex, tapReplacement);
fs.writeFileSync('app.js', app);
console.log("Patched handleArenaTap");
