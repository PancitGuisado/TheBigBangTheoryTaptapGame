const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// Fix 1: Move to upper left and raise z-index above hotspots
code = code.replace(
    "container.style.cssText = 'position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:58;width:260px;';",
    "container.style.cssText = 'position:absolute;top:10px;left:10px;z-index:65;width:250px;';"
);
console.log('✅ Moved to upper-left and raised z-index to 65');

// Fix 2: Also hide the hotspots overlay since it blocks clicks
// The hotspots should not show during map mode
code = code.replace(
    "if (hotspots) hotspots.classList.remove('hidden');\n        const synergyEl",
    "const synergyEl"
);
code = code.replace(
    "if (hotspots) hotspots.classList.add('hidden');\n        const synergyEl2",
    "const synergyEl2"
);
console.log('✅ Removed hotspot overlay from hangout mode');

fs.writeFileSync('app_v2.js', code);

let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');

// Cache buster
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/v=1781\d+/g, 'v=1781451000000');
fs.writeFileSync('index.html', html);
console.log('✅ Cache updated');
