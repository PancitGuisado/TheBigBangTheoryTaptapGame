const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let missingUi = fs.readFileSync('missing_ui.js', 'utf8');

let startIdx = app.indexOf('window.startGameEngine = function() {');
let appHead = app.substring(0, startIdx);

let cutsceneIdx = app.indexOf('function playIntroCutscene() {');
let appTail = app.substring(cutsceneIdx);

let finalApp = appHead + "\n" + missingUi + "\n" + appTail;

fs.writeFileSync('app_new.js', finalApp);
console.log("Written app_new.js");
