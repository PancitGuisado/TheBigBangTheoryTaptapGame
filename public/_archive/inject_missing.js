const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let missingFns = fs.readFileSync('missing_functions.js', 'utf8');

// We need to insert missingFns right before `function triggerBossFight(event)`
let insertIdx = app.indexOf('function triggerBossFight(event)');

if (insertIdx !== -1) {
    let newApp = app.substring(0, insertIdx) + missingFns + "\n\n" + app.substring(insertIdx);
    fs.writeFileSync('app.js', newApp);
    console.log("Successfully injected missing functions into app.js!");
} else {
    console.log("Could not find triggerBossFight!");
}
