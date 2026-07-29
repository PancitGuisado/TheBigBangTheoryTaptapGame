const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

// Sheldon's Whiteboard
txt = txt.replace(/<h2 class="text-base font-bold tracking-widest text-purple-400 uppercase">.*?SHELDON'S WHITEBOARD<\/h2>/g, 
                 '<h2 class="text-base font-bold tracking-widest text-purple-400 uppercase">🧠 SHELDON\'S WHITEBOARD</h2>');

// Leaderboard
txt = txt.replace(/<h2 class="text-base font-bold tracking-widest text-yellow-500 uppercase">.*?GLOBAL LEADERBOARD<\/h2>/g, 
                 '<h2 class="text-base font-bold tracking-widest text-yellow-500 uppercase">🏆 GLOBAL LEADERBOARD</h2>');

// Robot Modal Avatar
txt = txt.replace(/<div id="robot-modal-avatar" class="w-14 h-16 bg-black rounded p-1 border border-transparent flex items-center justify-center flex-shrink-0 text-2xl">.*?<\/div>/g, 
                 '<div id="robot-modal-avatar" class="w-14 h-16 bg-black rounded p-1 border border-transparent flex items-center justify-center flex-shrink-0 text-2xl">🤖</div>');

// Daily Rewards button icon
txt = txt.replace(/<button onclick="openDailyRewardsModal\(\)" class="side-rail-btn group relative" title="Daily Rewards">\s*<span class="text-base">.*?<\/span>/g, 
                 '<button onclick="openDailyRewardsModal()" class="side-rail-btn group relative" title="Daily Rewards">\n                  <span class="text-base">🎁</span>');

// Check for skins icon missing
txt = txt.replace(/<button onclick="openSkinSelector\(charKey\)" class="text-gray-400 hover:text-white text-lg font-bold cursor-pointer px-2">.*?<\/button>/g, 
                 '<button onclick="openSkinSelector(charKey)" class="text-gray-400 hover:text-white text-lg font-bold cursor-pointer px-2">👕</button>');

// Wait, the action modal has a skin selector button?
// Let's replace the '?' from action modal if it exists.
// Action Modal Skins icon:
txt = txt.replace(/<button onclick="openSkinSelector\(activeModalKey\)" class="text-gray-400 hover:text-white text-\[16px\] font-bold cursor-pointer">.*?<\/button>/g, 
                 '<button onclick="openSkinSelector(activeModalKey)" class="text-gray-400 hover:text-white text-[16px] font-bold cursor-pointer" title="Skins">👕</button>');

// Fix any leftover `dY` or `??` that might have been missed in action modal
txt = txt.replace(/<button onclick="openSkinSelector\(activeModalKey\)" id="skin-btn" class=".*?">.*?<\/button>/g, 
                 '<button onclick="openSkinSelector(activeModalKey)" id="skin-btn" class="absolute top-10 right-3 text-gray-400 hover:text-white text-[16px] font-bold cursor-pointer" title="Skins">👕</button>');

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Fixed more emojis in index.html');
