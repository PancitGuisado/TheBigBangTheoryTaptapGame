const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');

// Fix skins "ACTIVE" checkmark
txt = txt.replace(/<div class="text-\[7px\] text-center text-emerald-400 font-bold mt-0\.5">.*? ACTIVE<\/div>/g, 
                 '<div class="text-[7px] text-center text-emerald-400 font-bold mt-0.5">✅ ACTIVE</div>');

// Fix lock icon for skins
txt = txt.replace(/lockEl\.textContent = '.*?';/g, "lockEl.textContent = '🔒';");

// Fix map dropdown emojis if any are broken (I remember seeing some broken emojis for map)
txt = txt.replace(/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Map<\/span>/g, '<span class="text-base">🗺️</span><span class="side-rail-label">Map</span>');

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', txt, 'utf8');
console.log('Fixed app_v2.js emojis');
