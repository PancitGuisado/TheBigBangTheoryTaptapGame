function openFoodShop(event) {
    if(event) event.stopPropagation();
    const modal = document.getElementById('food-shop-modal');
    if (modal) modal.classList.remove('hidden');
    renderFoodGrid();
}

function closeFoodShop() {
    const modal = document.getElementById('food-shop-modal');
    if (modal) modal.classList.add('hidden');
}

function renderFoodGrid() {
    const grid = document.getElementById('food-grid');
    const moneyDisp = document.getElementById('food-modal-money');
    if (moneyDisp) moneyDisp.innerText = `CASH: $${Math.floor(state.resources.money)}`;
    if (!grid) return;
    grid.innerHTML = '';
    
    for (const [key, item] of Object.entries(foods)) {
        // Base cost inversely proportional to rarity
        const cost = Math.floor(10 / item.rarity);
        const owned = state.food[key] || 0;
        const canAfford = state.resources.money >= cost;
        
        const btnClass = canAfford ? 'bg-orange-600 hover:bg-orange-500 text-white cursor-pointer' : 'bg-gray-800 text-gray-500 cursor-not-allowed';
        
        grid.innerHTML += `
            <div class="bg-slate-900 border-2 border-slate-700 p-3 rounded flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="text-3xl">${item.emoji}</div>
                    <div>
                        <div class="font-bold text-orange-400 text-[12px]">${item.name} <span class="text-gray-400 text-[10px] ml-1">(x${owned})</span></div>
                        <div class="text-[9px] text-gray-400 mt-0.5 leading-tight">${item.description}</div>
                        <div class="text-[10px] text-green-400 mt-1 font-bold">+${item.hpRestore} HP</div>
                    </div>
                </div>
                <button onclick="buyFood('${key}', ${cost})" ${!canAfford ? 'disabled' : ''} class="${btnClass} px-3 py-2 rounded font-bold border-2 border-black shadow-md text-[10px]">
                    $${cost}
                </button>
            </div>
        `;
    }
}

// HOSPITAL PLACE SYSTEM
function toggleHospitalPlace(event) {
    if(event) event.stopPropagation();
    const place = document.getElementById('hospital-place');
    const arena = document.getElementById('arena');
    if (!place || !arena) return;
    
    if (place.classList.contains('hidden')) {
        place.classList.remove('hidden');
        arena.classList.add('hidden');
        renderHospitalPlace();
    } else {
        place.classList.add('hidden');
        arena.classList.remove('hidden');
    }
}

function renderHospitalPlace() {
    const grid = document.getElementById('hospital-beds-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (!state.hospitalized || state.hospitalized.length === 0) {
        grid.innerHTML = '<div class="text-emerald-800 text-center mt-20 text-2xl font-bold tracking-widest uppercase drop-shadow-md">The hospital is empty. Everyone is healthy!</div>';
        return;
    }
    
    const now = Date.now();
    for (const key of state.hospitalized) {
        const charData = state.roster[key];
        const config = characters[key];
        if (!charData || !config) continue;
        
        const timeLeft = Math.max(0, charData.hospitalEndTime - now);
        const mins = Math.floor(timeLeft / 1000 / 60);
        const secs = Math.floor((timeLeft / 1000) % 60);
        
        // Show feed buttons to heal
        const foodButtons = Object.keys(state.food || {})
            .filter(f => state.food[f] > 0)
            .map(f => `<button onclick="useFoodForRecovery('${key}', '${f}'); renderHospitalPlace(); syncUI(); renderRosterGrid();" class="bg-orange-600 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded text-[10px] cursor-pointer shadow-md">${foods[f].emoji} x${state.food[f]}</button>`)
            .join('');

        const foodHtml = foodButtons.length > 0 
            ? `<div class="flex gap-2 flex-wrap justify-center">${foodButtons}</div>`
            : `<div class="text-[9px] text-emerald-300/60 italic font-bold tracking-widest">NO FOOD AVAILABLE. BUY FOOD!</div>`;
        
        grid.innerHTML += `
            <div class="relative w-48 h-64 flex flex-col items-center mt-4 group">
                <!-- SVG Bed Background -->
                <div class="absolute inset-0 z-0 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]">
                    ${typeof vectors['hospital_bed'] === 'object' ? vectors['hospital_bed'].idle : vectors['hospital_bed']}
                </div>
                
                <!-- Character Laying Down -->
                <div class="absolute top-8 w-28 h-40 transform -rotate-90 filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-10 transition-all origin-center">
                    <div class="character-vector-wrapper flex items-center justify-center">${getVectorFrame(key, false, 'injured')}</div>
                </div>

                <!-- Recovery UI Overlay (shows on hover or always at bottom) -->
                <div class="absolute -bottom-12 inset-x-[-1rem] bg-zinc-900/95 border-2 border-emerald-500 p-2 rounded-xl z-30 flex flex-col items-center shadow-[0_0_15px_rgba(5,150,105,0.4)] opacity-100 transition-opacity">
                    <div class="text-emerald-400 font-bold uppercase text-[11px] truncate w-full text-center drop-shadow-[0_0_5px_rgba(5,150,105,0.8)]">${config.name}</div>
                    <div class="text-[10px] font-bold text-red-400 mb-1">${Math.floor(charData.currentHp)} / ${charData.maxHp} HP</div>
                    <div class="text-[12px] font-black text-white bg-red-950 px-2 py-1 rounded w-full text-center mb-1 shadow-inner animate-pulse border border-red-600">
                        ${mins}m ${secs}s
                    </div>
                    <div class="w-full flex justify-center border-t border-emerald-800/50 pt-1 mt-1">
                        ${foodHtml}
                    </div>
                </div>
            </div>
        `;
    }
}

// Ensure the hospital place updates periodically if open
setInterval(() => {
    const place = document.getElementById('hospital-place');
    if (place && !place.classList.contains('hidden')) {
        renderHospitalPlace();
    }
}, 1000);

function buyFood(key, cost) {
    if (state.resources.money >= cost) {
        state.resources.money -= cost;
        state.food[key] = (state.food[key] || 0) + 1;
        saveProgress();
        syncUI();
        renderFoodGrid();
    }
}

let hangoutMode = false;

function toggleHangoutMode(event) {
    if (event) event.stopPropagation();
    hangoutMode = !hangoutMode;
    
    const btnText = document.getElementById('hangout-btn-text');
    if (btnText) btnText.innerText = hangoutMode ? 'BACK TO BATTLE' : 'HANG OUT';
    
    const combatUI = document.getElementById('enemy-battle-slot');
    const playerLines = document.getElementById('player-battle-line');
    const robotLines = document.getElementById('robot-battle-line');
    const hotspots = document.getElementById('hangout-hotspots');
    
    if (hangoutMode) {
        if (combatUI) combatUI.classList.add('hidden');
        if (playerLines) playerLines.classList.add('hidden');
        if (robotLines) robotLines.classList.add('hidden');
        if (hotspots) hotspots.classList.remove('hidden');
    } else {
        if (combatUI) combatUI.classList.remove('hidden');
        if (playerLines) playerLines.classList.remove('hidden');
        if (robotLines) robotLines.classList.remove('hidden');
        if (hotspots) hotspots.classList.add('hidden');
    }
}

function hangoutAction(type, event) {
    if (event) event.stopPropagation();
    let msg = "";
    let val = 0;
    
    switch(type) {
        case 'whiteboard':
            const equations = ["Bazinga!", "That's my spot.", "I'm not crazy, my mother had me tested.", "I am the master of my own bladder."];
            msg = equations[Math.floor(Math.random() * equations.length)];
            val = Math.floor(Math.random() * 5) + 1;
            state.resources.money += val;
            generateDamagePopup({clientX: event.clientX, clientY: event.clientY}, `+${val} CASH`, true, true);
            break;
        case 'couch':
            msg = "Soft kitty, warm kitty, little ball of fur...";
            break;
        case 'door':
            msg = "Knock knock knock, Penny!";
            break;
        case 'bookcase':
            msg = "Please don't touch the collectibles. They are mint in box.";
            break;
    }
    
    // Create a speech bubble
    const bubble = document.createElement('div');
    bubble.className = 'absolute bg-white text-black font-bold text-[10px] p-2 border-2 border-black rounded shadow-xl z-[60] max-w-[150px] animate-pulse';
    bubble.style.left = `${event.clientX}px`;
    bubble.style.top = `${event.clientY - 40}px`;
    bubble.innerText = msg;
    
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2500);
    syncUI();
}

function openPerksModal(event) {
    if (event) event.stopPropagation();
    const modal = document.getElementById('perks-modal');
    if (modal) modal.classList.remove('hidden');
    syncPerksUI();
}

function closePerksModal() {
    const modal = document.getElementById('perks-modal');
    if (modal) modal.classList.add('hidden');
}

function syncPerksUI() {
    if (!state.perks) {
        state.perks = { dmgMult: 0, dropMult: 0, robotDmgMult: 0 };
    }
    const bpDisplay = document.getElementById('bazinga-points-display');
    if (bpDisplay) bpDisplay.innerText = state.bazingaPoints || 0;
    
    const pDmg = document.getElementById('perk-val-dmg');
    if (pDmg) pDmg.innerText = (state.perks.dmgMult * 10).toString();
    
    const pRob = document.getElementById('perk-val-robot');
    if (pRob) pRob.innerText = (state.perks.robotDmgMult * 10).toString();
    
    const pDrp = document.getElementById('perk-val-drop');
    if (pDrp) pDrp.innerText = (state.perks.dropMult * 10).toString();
}

function buyPerk(perkKey) {
    if ((state.bazingaPoints || 0) >= 1) {
        state.bazingaPoints--;
        if (!state.perks) state.perks = { dmgMult: 0, dropMult: 0, robotDmgMult: 0 };
        state.perks[perkKey] = (state.perks[perkKey] || 0) + 1;
        SoundManager.play('sheldon_level');
        syncPerksUI();
        saveProgress();
    }
}

function calculateSynergies() {
    activeSynergies = { dmgMult: 1.0, robotSpeedMult: 1.0, foodMult: 1.0 };
    activeSynergyNames = [];
    
    const eq = state.equipped;
    if (!eq) return;
    
    if (eq.sheldon && eq.leonard && eq.penny) {
        activeSynergies.dmgMult = 1.5;
        activeSynergyNames.push("The Original Trio (+50% DMG)");
    }
    
    if (eq.howard && eq.raj) {
        activeSynergies.robotSpeedMult = 1.5;
        activeSynergyNames.push("The Engineers (Bots 50% Faster)");
    }
    
    if (eq.amy && eq.bernie) {
        activeSynergies.foodMult = 2.0;
        activeSynergyNames.push("The Biologists (Food Heals 2x)");
    }
    
    const container = document.getElementById('synergy-display');
    if (container) {
        if (activeSynergyNames.length > 0) {
            container.innerHTML = activeSynergyNames.map(n => `<span class="bg-purple-900/50 text-purple-300 border border-purple-500/50 px-2 py-0.5 rounded shadow whitespace-nowrap">${n}</span>`).join('');
            container.classList.remove('hidden');
        } else {
            container.innerHTML = '';
            container.classList.add('hidden');
        }
    }
}

// SKELETAL RENDERING LOOP
let renderLoopId = null;
function startSpriteRenderLoop() {
    // Disabled since we reverted to CSS skeletal animations
}

window.onload = initGame;

window.startGameEngine = function() {
    const ts = document.getElementById('title-screen');
    if (ts) {
        ts.style.opacity = '0';
        setTimeout(() => {
            ts.remove();
        }, 1000);
    }
    SoundManager.startBGM();

    if (!state.hasSeenIntro) {
        playIntroCutscene();
    }
};

