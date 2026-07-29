const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

// Use regex to replace the corrupted buttons and text by targeting surrounding known text
txt = txt.replace(/<button onclick="closeModal\(\)" class="absolute top-3 right-3[^>]*>.*?<\/button>/, 
                  '<button onclick="closeModal()" class="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold cursor-pointer z-10 transition-colors">✖</button>');

txt = txt.replace(/<button onclick="openSkinSelector\(activeModalKey\)" class="absolute top-3 right-10[^>]* title="Change Skin">.*?<\/button>/, 
                  '<button onclick="openSkinSelector(activeModalKey)" class="absolute top-3 right-10 text-gray-400 hover:text-white text-xl font-bold cursor-pointer z-10 transition-colors" title="Change Skin">👕</button>');

txt = txt.replace(/<span class="text-gray-400 font-bold tracking-tight">.*? DMG<\/span>/, 
                  '<span class="text-gray-400 font-bold tracking-tight">⚔️ DMG</span>');

txt = txt.replace(/<span class="text-gray-400 font-bold tracking-tight">.*? HP<\/span>/, 
                  '<span class="text-gray-400 font-bold tracking-tight">💖 HP</span>');

txt = txt.replace(/<span class="text-gray-400 font-bold tracking-tight">.*? CD<\/span>/, 
                  '<span class="text-gray-400 font-bold tracking-tight">⏱️ CD</span>');

txt = txt.replace(/<span class="text-gray-400 font-bold tracking-tight">.*? PASSIVE<\/span>/, 
                  '<span class="text-gray-400 font-bold tracking-tight">🪄 PASSIVE</span>');

// Replace the arrow symbols inside stats
txt = txt.replace(/<span class="text-gray-600 mx-0.5">.*?<\/span>/g, '<span class="text-gray-600 mx-0.5">➔</span>');

// Fix topbar leaderboard
txt = txt.replace(/<span class="text-sm">ðŸ †<\/span>/, '<span class="text-sm">🏆</span>');

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Regex fix done');
