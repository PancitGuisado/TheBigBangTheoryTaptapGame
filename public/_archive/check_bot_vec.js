const fs = require('fs');
let vec = fs.readFileSync('vectors.js', 'utf8');
console.log("Has roomba_doom?", vec.includes('roomba_doom'));
console.log("Has quantum_drone?", vec.includes('quantum_drone'));
