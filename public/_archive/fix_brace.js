const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// The replacement was around line 2185.
// Let's find out if openRobotsModal is inside executeModalAction.
let idx1 = app.indexOf('function openRobotsModal');
let idx2 = app.lastIndexOf('}');
console.log(`openRobotsModal is at ${idx1}, last brace is at ${idx2}`);

// Let's restore the brace where it actually belongs!
// We'll remove the brace at the end of the file, and insert it after executeModalAction.
app = app.slice(0, -1); // remove the last brace we just added

let insertIdx = app.indexOf('function openRobotsModal');
app = app.slice(0, insertIdx) + '}\n\n' + app.slice(insertIdx);

fs.writeFileSync('app.js', app);
console.log('Fixed brace scoping!');
