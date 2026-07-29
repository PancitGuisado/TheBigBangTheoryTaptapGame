const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/app\.js\?v=\d+/g, `app.js?v=${Date.now()}`);
fs.writeFileSync('index.html', html);
console.log("Updated cache-buster");
