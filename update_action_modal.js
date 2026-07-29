const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

// Replace the entire action-modal to add the feed food UI and skin button, and fix emojis
const oldModal = txt.substring(txt.indexOf('<div id="action-modal"'), txt.indexOf('<!-- ========== ROBOTS SYSTEM ========== -->'));

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
                <div class="text-gray-500 font-bold mb-2 uppercase border-b border-slate-800 pb-1 flex justify-between tracking-wider">
                    <span>Current Stats</span>
                    <span class="text-amber-400">Next Level</span>
                </div>
                <div class="grid grid-cols-2 gap-x-3 gap-y-2">
                    <div class="flex justify-between items-center bg-slate-900 border border-white/5 shadow-md p-1.5 rounded">
                        <span class="text-gray-400 font-bold tracking-tight">⚔️ DMG</span>
                        <span id="modal-stat-dmg" class="font-mono text-white font-bold text-[9px]">0 <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">0</span></span>
                    </div>
                    <div class="flex justify-between items-center bg-slate-900 border border-white/5 shadow-md p-1.5 rounded">
                        <span class="text-gray-400 font-bold tracking-tight">💖 HP</span>
                        <span id="modal-stat-hp" class="font-mono text-white font-bold text-[9px]">0 <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">0</span></span>
                    </div>
                    <div class="flex justify-between items-center bg-slate-900 border border-white/5 shadow-md p-1.5 rounded">
                        <span class="text-gray-400 font-bold tracking-tight">⏱️ CD</span>
                        <span id="modal-stat-cd" class="font-mono text-white font-bold text-[9px]">0s <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">0s</span></span>
                    </div>
                    <div class="flex justify-between items-center bg-slate-900 border border-white/5 shadow-md p-1.5 rounded">
                        <span class="text-gray-400 font-bold tracking-tight">🪄 PASSIVE</span>
                        <span id="modal-stat-passive" class="font-mono text-white font-bold text-[9px]">N/A</span>
                    </div>
                </div>
            </div>
            
            <!-- FEED FOOD SECTION (Only visible if hospitalized or low HP) -->
            <div id="modal-feed-section" class="bg-red-950/30 border border-red-900/50 rounded p-2 mb-4 hidden">
                <div class="text-red-400 font-bold text-[9px] uppercase tracking-wider mb-2 flex justify-between items-center">
                    <span>Medical Attention Required</span>
                    <span id="modal-feed-hp" class="text-white bg-red-900 px-1 rounded"></span>
                </div>
                <div id="modal-feed-buttons" class="flex gap-2 flex-wrap"></div>
            </div>
            
            <!-- FOOTER ACTIONS -->
            <div class="flex items-center justify-between border-t border-amber-900/50 pt-4">
                <div class="flex flex-col">
                    <span class="text-gray-500 text-[8px] uppercase font-bold tracking-tight mb-0.5">Price Ledger:</span>
                    <div id="modal-char-cost-container" class="font-black text-lg tracking-tight drop-shadow-md">---</div>
                </div>
            </div>
            <div id="modal-footer-actions" class="mt-4 flex flex-col gap-2"></div>
        </div>
    </div>
    
    <!-- ========== ROBOTS SYSTEM ========== -->`;

if(oldModal && oldModal.length > 100) {
    txt = txt.replace(oldModal, newModal);
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
    console.log('Fixed action-modal emojis and added feed UI + skins button');
} else {
    console.log("Failed to locate old action modal");
}
