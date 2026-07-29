const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// Replace style.display = 'none' with storing previous state
// For boss controls, just let spawnEnemy re-evaluate visibility on exit

// Remove the boss controls hide/show from hangout - let spawnEnemy handle it
code = code.replace(
    "        var bossCtrl = document.getElementById('boss-controls');\n        if (bossCtrl) bossCtrl.style.display = 'none';",
    "        // boss controls will restore via spawnEnemy on exit"
);

code = code.replace(
    "        var bossCtrl2 = document.getElementById('boss-controls');\n        if (bossCtrl2) bossCtrl2.style.display = '';",
    "        // Re-trigger spawnEnemy to restore boss button state\n        if (typeof spawnEnemy === 'function') spawnEnemy();"
);

fs.writeFileSync('app_v2.js', code);
console.log('✅ Fixed boss controls - now restored via spawnEnemy on hangout exit');

let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');

// Cache buster
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/v=1781\d+/g, 'v=1781457000000');
fs.writeFileSync('index.html', html);
console.log('✅ Cache updated');
