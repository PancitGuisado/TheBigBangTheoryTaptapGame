const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

txt = txt.replace(/app_v2\.js\?bust=[0-9]+&v=[0-9]+/g, 'app_v2.js?bust=' + Date.now() + '&v=' + Date.now());
txt = txt.replace(/pvp\.js\?bust=[0-9]+/g, 'pvp.js?bust=' + Date.now());
txt = txt.replace(/config\.js\?bust=[0-9]+/g, 'config.js?bust=' + Date.now());

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Fixed cache busters for all JS scripts');
