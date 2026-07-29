const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const replacement = `    syncUI();

    startAutomationEngines();
    startRobotAutomation();
    if (typeof updateMapBackground === 'function') updateMapBackground();
    
    setInterval(() => {
        if (typeof sheldonTapBuff !== 'undefined' && sheldonTapBuff > 0) {
            sheldonTapBuff = Math.max(0, sheldonTapBuff - 0.04);
            if (typeof updateSheldonBuffBadge === 'function') updateSheldonBuffBadge();
        }
        if (typeof rageDuration !== 'undefined' && rageDuration > 0) {
            rageDuration--;
            
            const container = document.getElementById('synergy-display');
            if (container) {
                container.classList.remove('hidden');
                let rageBadge = document.getElementById('rage-buff-badge');
                if (!rageBadge) {
                    rageBadge = document.createElement('span');
                    rageBadge.id = 'rage-buff-badge';
                    rageBadge.className = 'bg-red-900/90 text-red-300 border border-red-500/80 px-2 py-0.5 rounded shadow whitespace-nowrap flex items-center gap-1 animate-pulse';
                    container.appendChild(rageBadge);
                }
                rageBadge.innerHTML = \`?? BURGER RAGE (\${(rageDuration / 10).toFixed(1)}s)\`;
            }

            if (rageDuration === 0) {
                const arena = document.getElementById('arena');
                if (arena) arena.classList.remove('rage-active-bg');
                const rageBadge = document.getElementById('rage-buff-badge');
                if (rageBadge) rageBadge.remove();
                if (typeof calculateSynergies === 'function') calculateSynergies();
                startAutomationEngines(); 
            }
        }
    }, 100);

    setInterval(updateCraftingQueues, 100);
    setInterval(updateHospitalRecoveries, 1000);
    setInterval(saveProgress, 5000);
}`;

app = app.replace(/syncUI\(\);\s*}/, replacement);
fs.writeFileSync('app.js', app);
console.log("Restored intervals in initGame");
