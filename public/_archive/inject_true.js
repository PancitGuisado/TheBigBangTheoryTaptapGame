const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let missing = fs.readFileSync('true_missing.js', 'utf8');

let idx = app.indexOf('function triggerBossFight(event)');
if (idx !== -1) {
    let newApp = app.substring(0, idx) + missing + "\n\n" + app.substring(idx);
    fs.writeFileSync('app.js', newApp);
    console.log("Injected true missing logic!");
} else {
    console.log("triggerBossFight not found!");
}
