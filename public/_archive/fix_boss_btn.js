const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const missingChunk = `        <!-- ENEMY SECTION (right side) -->
        <div id="enemy-container" class="absolute right-[3%] top-[60%] -translate-y-1/2 z-30 flex flex-col items-center gap-0" style="overflow:visible;max-height:85vh;">
            <!-- Boss Fight Button -->
            <button id="fight-boss-btn" onclick="startManualBossFight(event)" class="bg-gradient-to-r from-red-700 to-orange-600 hover:from-red-600 hover:to-orange-500 text-white font-black px-4 py-2 rounded-lg border-2 border-red-900 shadow-[0_0_20px_rgba(239,68,68,0.6)] text-[10px] uppercase tracking-wider cursor-pointer animate-pulse pointer-events-auto mb-1" style="text-shadow:0 0 8px rgba(255,0,0,0.8);">💀 SEASON FINALE</button>

            <!-- Enemy Graphic Frame (TOP - biggest element) -->
            <div id="enemy-graphic-frame" class="flex items-end justify-center relative" style="width:14vh;height:18vh;max-width:150px;max-height:200px;overflow:visible;">
                <!-- Boss aura injected by JS -->
            </div>

            <!-- Enemy Name & Info (BELOW graphic) -->`;

const marker = '<div class="flex flex-col items-center gap-0.5 pointer-events-none mt-1">';
txt = txt.replace(marker, missingChunk + "\n            " + marker);

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Fixed missing chunk and updated to startManualBossFight(event)');
