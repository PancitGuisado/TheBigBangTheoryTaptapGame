const fs = require('fs');
let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
let s1 = broken.indexOf('function updateMapBackground');
let e1 = broken.indexOf('function spawnEnemy() {');
console.log('updateMapBackground and spawnEnemy:');
console.log(broken.substring(s1, e1 + 1000));
