const fs = require('fs');
const txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');
const start = txt.indexOf('<div id="action-modal"');
let end = txt.indexOf('<!-- Robot Inspection');
if (end === -1) end = start + 5000;
fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/action_modal_dump.txt', txt.substring(start, end), 'utf8');
console.log('Dumped action-modal. Length:', end - start);
