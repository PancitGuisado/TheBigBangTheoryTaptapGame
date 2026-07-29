const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const trailing = 'window.buyTalent = function(charKey, type) {';
if (app.endsWith(trailing + '\n')) {
    app = app.substring(0, app.length - trailing.length - 1);
} else if (app.endsWith(trailing)) {
    app = app.substring(0, app.length - trailing.length);
}

fs.writeFileSync('app.js', app);
