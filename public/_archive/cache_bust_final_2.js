const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/app_v2\.js\??[^"']*/g, `app_v2.js?v=${Date.now()}`);
fs.writeFileSync('index.html', html);
console.log("Cache busted index.html");
