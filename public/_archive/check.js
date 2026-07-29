const fs = require('fs');
let html = fs.readFileSync('backup_temp/index.html', 'utf8');
let start = html.indexOf('<div id="title-screen"');
let end = html.indexOf('</div>\n\n', start);
console.log('Start:', start, 'End:', end);
