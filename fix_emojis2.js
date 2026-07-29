const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

txt = txt.replace(/\?\?<\/span><span class="bottom-tab-label text-red-400">Clinic/g, '🏥</span><span class="bottom-tab-label text-red-400">Clinic');
txt = txt.replace(/\?\?\?<\/span>/g, '🛋️</span>');

// Verify boss button
txt = txt.replace(/dY'\? SEASON FINALE/g, '💀 SEASON FINALE');

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log("Fixed remainder");
