const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// 1. Add botLore
code = code.replace(
    /midas_speedster: \{ scale: 2\.3, z: 10, flying: true \}/g,
    `midas_speedster: { scale: 2.3, z: 10, flying: true },
                roomba_doom: { scale: 1.2, z: 10, flying: false },
                quantum_drone: { scale: 1.8, z: 20, flying: true }`
);

fs.writeFileSync('app_v2.js', code);
console.log('Patched app_v2.js successfully.');
