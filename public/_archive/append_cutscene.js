const fs = require('fs');
const broken = fs.readFileSync('app_broken_backup.js', 'utf8').split('\n');
const cutscene = broken.slice(1857, 2030).join('\n');
fs.appendFileSync('app.js', '\n' + cutscene + '\n');
console.log('Appended cutscene to app.js');
