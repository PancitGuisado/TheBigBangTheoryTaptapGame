const fs = require('fs');
const code = fs.readFileSync('vectors.js', 'utf8');
eval(code);
console.log("roomba_doom SVG:", vectors["roomba_doom"] ? "EXISTS" : "MISSING");
console.log("quantum_drone SVG:", vectors["quantum_drone"] ? "EXISTS" : "MISSING");
