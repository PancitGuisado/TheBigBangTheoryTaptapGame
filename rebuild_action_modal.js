const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const startIdx = txt.indexOf('<div id="action-modal"');
let endIdx = txt.indexOf('<!-- Robot Inspection', startIdx);
if (endIdx === -1) endIdx = txt.indexOf('<div id="robot-action-modal"', startIdx) - 10;

if (startIdx !== -1 && endIdx !== -1) {
    const oldModal = txt.substring(startIdx, endIdx);
    
    const newModal = `<div id="action-modal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] hidden p-4" onclick="if(event.target===this)closeModal()">
        <div class="bg-gradient-to-b from-amber-950 to-stone-900 backdrop-blur-md border-2 border-amber-500/50 p-5 max-w-sm w-full relative text-white rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <button onclick="closeModal()" class="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold cursor-pointer z-10 transition-colors">✖</button>
            <button onclick="openSkinSelector(activeModalKey)" class="absolute top-3 right-10 text-gray-400 hover:text-white text-xl font-bold cursor-pointer z-10 transition-colors" title="Change Skin">👕</button>
            
            <div class="flex items-center gap-4 border-b border-amber-900/50 pb-3 mb-3 relative">
                <div id="modal-char-avatar" class="w-16 h-20 bg-black rounded p-1 border border-amber-700/50 flex items-center justify-center flex-shrink-0 shadow-[0_5px_15px_rgba(0,0,0,0.5)]"></div>
                <div>
                    <h3 id="modal-char-name" class="font-black text-lg text-amber-400 tracking-wide uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">---</h3>
                    <div class="flex gap-2 items-center mt-1">
                        <span id="modal-char-lane" class="text-[9px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300 font-bold uppercase tracking-wider">---</span>
                        <div id="modal-char-badge"></div>
                    </div>
                </div>
            </div>
            
            <p id="modal-char-desc" class="text-gray-300 text-[10px] leading-relaxed mb-4 tracking-tight min-h-[32px] italic">---</p>
            
            <!-- STATS -->
            <div class="bg-slate-950 p-3 rounded border border-amber-900/30 text-[10px] mb-4 shadow-inner">
                <div class="text-gray-500 font-bold mb-2 uppercase border-b border-amber-900/30 pb-1 flex justify-between">
                    <span>Current Stats</span>
                    <span class="text-amber-500">Next Level</span>
                </div>
                <div class="grid grid-cols-2 gap-x-3 gap-y-2">
                    <div class="flex justify-between items-center bg-black/40 p-1.5 rounded border border-white/5">
                        <span class="text-gray-400 font-bold tracking-tight">⚔️ DMG</span>
                        <span id="modal-stat-dmg" class="font-mono text-white font-bold text-[9px]">0 <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">0</span></span>
                    </div>
                    <div class="flex justify-between items-center bg-black/40 p-1.5 rounded border border-white/5">
                        <span class="text-gray-400 font-bold tracking-tight">💖 HP</span>
                        <span id="modal-stat-hp" class="font-mono text-white font-bold text-[9px]">0 <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">0</span></span>
                    </div>
                    <div class="flex justify-between items-center bg-black/40 p-1.5 rounded border border-white/5">
                        <span class="text-gray-400 font-bold tracking-tight">⏱️ CD</span>
                        <span id="modal-stat-cd" class="font-mono text-white font-bold text-[9px]">0s <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">0s</span></span>
                    </div>
                    <div class="flex justify-between items-center bg-black/40 p-1.5 rounded border border-white/5">
                        <span class="text-gray-400 font-bold tracking-tight">🪄 PASSIVE</span>
                        <span id="modal-stat-special" class="font-mono text-white font-bold text-[9px]">---</span>
                    </div>
                </div>
            </div>

            <!-- FEED FOOD SECTION -->
            <div class="bg-slate-950 p-3 rounded border border-amber-900/30 mb-4 shadow-inner">
                <div class="text-gray-500 font-bold mb-2 uppercase border-b border-amber-900/30 pb-1">Feed Food (Fast Heal)</div>
                <div id="modal-food-grid" class="grid grid-cols-4 gap-2">
                    <!-- Javascript populates food inventory here -->
                </div>
            </div>

            <div class="flex items-center justify-between border-t border-amber-900/50 pt-3 mb-4">
                <div class="flex flex-col">
                    <span class="text-gray-500 text-[8px] uppercase font-bold tracking-tight mb-0.5">Upgrade Cost:</span>
                    <div id="modal-cost-container" class="font-black text-[12px] drop-shadow-md">---</div>
                </div>
            </div>
            
            <div id="modal-footer-actions" class="mt-2 flex flex-col gap-2">
                <button id="modal-action-btn" onclick="upgradeCharacter(activeModalKey)" class="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black py-3 text-sm cursor-pointer transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] uppercase tracking-widest rounded-lg border-2 border-amber-400 relative overflow-hidden group">
                    <div class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                    <span class="relative z-10 flex items-center justify-center gap-2">
                        <span class="text-lg">⬆️</span> UPGRADE
                    </span>
                </button>
            </div>
        </div>
    </div>
    
    `;
    
    txt = txt.substring(0, startIdx) + newModal + txt.substring(endIdx);
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
    console.log('Replaced action-modal safely.');
} else {
    console.log('Could not find start or end index.');
}
