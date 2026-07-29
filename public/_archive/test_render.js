const fs = require('fs');
let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
let start = broken.indexOf('function renderActiveBattleLine');
let chunk = broken.substring(start, start + 1000);
console.log('has onclick openModal:', chunk.indexOf('onclick="openModal') !== -1);
