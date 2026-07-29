const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

// Find all script tags that were corrupted by the powershell replace
// Since the string got incredibly long, we might need a regex
txt = txt.replace(/<script src="app_v2\.js\?bust=[0-9\.]+"><\/script>/g, '<script src="app_v2.js?bust=' + Date.now() + '"></script>');

// Also catch if it looks like app_v2.js followed by a massive string
txt = txt.replace(/app_v2\.js\?bust=[0-9\.]+"/g, 'app_v2.js?bust=' + Date.now() + '"');

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Fixed cache buster');
