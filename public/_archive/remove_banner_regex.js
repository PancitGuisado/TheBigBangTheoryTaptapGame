const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Regex to remove the rage-banner logic and the unique-fx penny-rage-wave creation
const regex = /const rageFx = document\.createElement\('div'\);[\s\S]*?rageFx\.innerHTML = `<div class="rage-banner">.*?<\/div>`;[\s\S]*?setTimeout\(\(\) => rageFx\.remove\(\), \d+\);/g;

app = app.replace(regex, '');
fs.writeFileSync('app.js', app);
console.log("Removed the center screen rage banner via regex");
