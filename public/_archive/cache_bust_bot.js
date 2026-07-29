const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/app_v2\.js\??[^"']*/g, `app_v2.js?v=${Date.now()}`);
html = html.replace(/styles\.css\??[^"']*/g, `styles.css?v=${Date.now()}`);
html = html.replace(/vectors\.js\??[^"']*/g, `vectors.js?v=${Date.now()}`);
fs.writeFileSync('index.html', html);
console.log("Cache busted index.html");
