const fs = require('fs');
fs.copyFileSync('app.js', 'app_v2.js');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/app\.js\?v=\d+/g, 'app_v2.js');
fs.writeFileSync('index.html', html);
console.log("Renamed app.js to app_v2.js to break cache!");
