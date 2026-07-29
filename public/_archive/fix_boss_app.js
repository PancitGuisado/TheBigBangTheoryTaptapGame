const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');

txt = txt.replace(/setTimeout\(\(\) => startBossBattle\(\), 500\);/g, "setTimeout(() => startManualBossFight(), 500);");
txt = txt.replace(/typeof startBossBattle === 'function'/g, "typeof startManualBossFight === 'function'");

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', txt, 'utf8');
console.log('Fixed startBossBattle in app_v2.js');
