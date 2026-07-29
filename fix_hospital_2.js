const fs = require('fs');
let app = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');

const parts = app.split('function renderHospitalPlace() {');
const secondPart = parts[1].split('// Ensure the hospital place updates periodically if open');

const newFunc = `function renderHospitalPlace() {
    const place = document.getElementById('hospital-place');
    if (!place) return;
    
    // Inject the base HTML layout if not present
    if (!document.getElementById('hospital-beds-grid')) {
        place.innerHTML = \`
            <!-- Clinical Tile Background -->
            <div class="absolute inset-0 z-0 opacity-20 pointer-events-none" style="background-image: repeating-linear-gradient(45deg, #0f172a 25%, transparent 25%, transparent 75%, #0f172a 75%, #0f172a), repeating-linear-gradient(45deg, #0f172a 25%, #1e293b 25%, #1e293b 75%, #0f172a 75%, #0f172a); background-position: 0 0, 20px 20px; background-size: 40px 40px;"></div>
            
            <div class="relative z-10 w-full h-full flex flex-col p-4">
                <!-- Header / Back Button -->
                <div class="flex justify-between items-center bg-gray-900/90 border-b-4 border-red-900/50 p-3 rounded-t-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] backdrop-blur-md shrink-0">
                    <div class="flex items-center gap-3">
                        <span class="text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">🏥</span>
                        <div>
                            <h2 class="text-red-400 font-black text-xl tracking-widest uppercase" style="text-shadow: 0 0 10px rgba(239,68,68,0.5);">Pasadena Clinic</h2>
                            <p class="text-[9px] text-gray-400 uppercase tracking-widest">Intensive Care Unit</p>
                        </div>
                    </div>
                    <button onclick="toggleHospitalPlace(event)" class="bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-2 px-4 rounded border-2 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] text-[12px] uppercase tracking-wider transition-all cursor-pointer z-50 pointer-events-auto">
                        🔙 Back To Battle
                    </button>
                </div>
                
                <!-- Beds Grid -->
                <div id="hospital-beds-grid" class="flex-1 overflow-y-auto flex flex-wrap justify-center content-start gap-12 p-8 bg-black/40 rounded-b-xl border-x-2 border-b-2 border-gray-800 shadow-inner" style="-ms-overflow-style:none;scrollbar-width:none;"></div>
            </div>
        \`;
    }

    const grid = document.getElementById('hospital-beds-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (!state.hospitalized || state.hospitalized.length === 0) {
        grid.innerHTML = \`
            <div class="flex flex-col items-center justify-center h-full mt-20 opacity-50">
                <span class="text-6xl mb-4">🩺</span>
                <div class="text-emerald-500 text-center text-xl font-black tracking-widest uppercase drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">The clinic is empty.</div>
                <div class="text-gray-400 text-xs tracking-wider uppercase mt-2">All crew members are healthy.</div>
            </div>\`;
        return;
    }
    
    const now = Date.now();
    for (const key of state.hospitalized) {
        const charData = state.roster[key];
        const config = characters[key];
        if (!charData || !config) continue;
        
        const timeLeft = Math.max(0, charData.hospitalEndTime - now);
        const mins = Math.floor(timeLeft / 1000 / 60);
        const secs = Math.floor((timeLeft / 1000) % 60).toString().padStart(2, '0');
        
        // Show feed buttons to heal
        const foodButtons = Object.keys(state.food || {})
            .filter(f => state.food[f] > 0)
            .map(f => \`<button onclick="useFoodForRecovery('\${key}', '\${f}'); renderHospitalPlace(); syncUI(); renderRosterGrid();" class="bg-gradient-to-b from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600 text-white font-bold py-1 px-3 rounded border border-orange-400 text-[10px] cursor-pointer shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all flex items-center gap-1">\${foods[f].emoji} <span class="bg-black/50 px-1 rounded">x\${state.food[f]}</span></button>\`)
            .join('');

        const foodHtml = foodButtons.length > 0 
            ? \`<div class="flex gap-2 flex-wrap justify-center">\${foodButtons}</div>\`
            : \`<div class="text-[9px] text-red-300/80 italic font-bold tracking-widest border border-red-500/30 bg-red-950/50 px-2 py-1 rounded">OUT OF MEDICAL SUPPLIES</div>\`;
        
        grid.innerHTML += \`
            <div class="relative w-40 h-56 flex flex-col items-center mt-6 group animate-in fade-in zoom-in duration-300">
                <!-- SVG Bed Background -->
                <div class="absolute inset-0 z-0 drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)]">
                    \${typeof vectors['hospital_bed'] === 'object' ? vectors['hospital_bed'].idle : vectors['hospital_bed']}
                </div>
                
                <!-- Character Laying Down -->
                <div class="absolute top-4 w-28 h-40 transform -rotate-90 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)] z-10 transition-all origin-center">
                    <div class="character-vector-wrapper flex items-center justify-center">\${getVectorFrame(key, false, 'injured')}</div>
                </div>

                <!-- Recovery UI Overlay -->
                <div class="absolute -bottom-16 inset-x-[-2rem] bg-slate-900/95 border-2 border-emerald-500 p-3 rounded-xl z-30 flex flex-col items-center shadow-[0_0_20px_rgba(5,150,105,0.4)]">
                    <div class="text-emerald-400 font-black uppercase text-[12px] truncate w-full text-center drop-shadow-[0_0_5px_rgba(5,150,105,0.8)] mb-1">\${config.name}</div>
                    
                    <!-- HP Bar -->
                    <div class="w-full h-1.5 bg-gray-950 rounded overflow-hidden mb-1 border border-gray-700">
                        <div class="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all" style="width: \${(charData.currentHp / charData.maxHp) * 100}%;"></div>
                    </div>
                    <div class="text-[9px] font-bold text-red-400 mb-2">\${Math.floor(charData.currentHp)} / \${charData.maxHp} HP</div>
                    
                    <!-- Timer -->
                    <div class="text-[14px] font-black text-red-100 bg-black px-3 py-1.5 rounded w-full text-center mb-2 shadow-inner border border-red-900 flex items-center justify-center gap-2">
                        <span class="animate-pulse text-red-500">💓</span>
                        \${mins}:\${secs}
                    </div>
                    
                    <!-- Food actions -->
                    <div class="w-full flex justify-center border-t border-slate-700 pt-2">
                        \${foodHtml}
                    </div>
                </div>
            </div>
        \`;
    }
}

// Ensure the hospital place updates periodically if open`;

const finalScript = parts[0] + newFunc + secondPart[1];
fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', finalScript, 'utf8');
console.log('Fixed renderHospitalPlace for sure');
