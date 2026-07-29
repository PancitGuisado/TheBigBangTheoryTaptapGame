const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. ADD BP REWARD ON BOSS KILL
const bossDeathRegex = /state\.resources\.money \+= reward;\s*dropResources\(true\);\s*state\.wave\+\+;/;
const bossDeathReplacement = `state.resources.money += reward;
            dropResources(true);
            
            // Gain 1 BP every boss defeat
            if (typeof state.bazingaPoints === 'undefined') state.bazingaPoints = 0;
            state.bazingaPoints++;
            generateDamagePopup({clientX: window.innerWidth/2, clientY: window.innerHeight/3}, "+1 BAZINGA POINT!", false, true, true);
            
            state.wave++;`;
app = app.replace(bossDeathRegex, bossDeathReplacement);

// 2 & 3. OVERHAUL HANGOUT MODE & LORE
const hangoutRegex = /function toggleHangoutMode\(event\) \{[\s\S]*?bubble\.style\.left = \`\$\{event\.clientX - 50\}px\`;\s*document\.body\.appendChild\(bubble\);\s*setTimeout\(\(\) => bubble\.remove\(\), 3000\);\s*\}/;

const hangoutReplacement = `function toggleHangoutMode(event) {
    if (event) event.stopPropagation();
    hangoutMode = !hangoutMode;
    
    const btnText = document.getElementById('hangout-btn-text');
    if (btnText) btnText.innerText = hangoutMode ? 'BACK TO BATTLE' : 'HANG OUT';
    
    const combatUI = document.getElementById('enemy-battle-slot');
    const hotspots = document.getElementById('hangout-hotspots');
    const synergyDisplay = document.getElementById('synergy-display');
    const quickRepair = document.getElementById('quick-repair-container');
    const arenaBg = document.getElementById('arena-background');
    
    if (hangoutMode) {
        // Pause combat timers
        if (typeof bossTimerId !== 'undefined') clearInterval(bossTimerId);
        Object.values(window.robotTimers || {}).forEach(clearInterval);
        Object.values(gameTimers || {}).forEach(clearInterval);
        
        // Hide battle UI, KEEP player and robot lines visible!
        if (combatUI) combatUI.classList.add('hidden');
        if (synergyDisplay) synergyDisplay.classList.add('hidden');
        if (quickRepair) quickRepair.classList.add('hidden');
        if (hotspots) hotspots.classList.remove('hidden');
        
        // Force the room background
        if (arenaBg) arenaBg.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect width=%22400%22 height=%22300%22 fill=%22%23c9b79c%22/><rect x=%2250%22 y=%2250%22 width=%2280%22 height=%22150%22 fill=%22%238c7b64%22 rx=%225%22/><rect x=%22200%22 y=%2260%22 width=%22100%22 height=%22140%22 fill=%22%23a67d53%22 rx=%225%22/><path d=%22M 150 250 L 250 250 L 260 280 L 140 280 Z%22 fill=%22%238c6444%22/></svg>')";
    } else {
        // Resume combat timers
        spawnEnemy();
        startAutomationEngines();
        startRobotAutomation();
        
        if (combatUI) combatUI.classList.remove('hidden');
        if (synergyDisplay) synergyDisplay.classList.remove('hidden');
        if (quickRepair) quickRepair.classList.remove('hidden');
        if (hotspots) hotspots.classList.add('hidden');
        if (typeof updateMapBackground === 'function') updateMapBackground();
    }
}

function hangoutAction(type, event) {
    if (event) event.stopPropagation();
    let msg = "";
    
    switch(type) {
        case 'whiteboard':
            const equations = [
                "The math is perfectly sound. It's the universe that's flawed.", 
                "Raj, your calculations are pedestrian.", 
                "If we use a topological insulator... no, that's trivial.",
                "String theory dictates there are at least 10 dimensions."
            ];
            msg = equations[Math.floor(Math.random() * equations.length)];
            break;
        case 'couch':
            const couchLore = [
                "That is MY spot. 0,0,0,0.",
                "Anyone want Thai food tonight?",
                "Penny, you're on my Wi-Fi again.",
                "I'm King of the Nerds!"
            ];
            msg = couchLore[Math.floor(Math.random() * couchLore.length)];
            break;
        case 'door':
            const doorLore = [
                "Knock knock knock, Penny! Knock knock knock, Penny! Knock knock knock, Penny!",
                "Who could that be at this hour?",
                "I ordered the special pizza... no olives.",
                "Did Wil Wheaton just walk by?"
            ];
            msg = doorLore[Math.floor(Math.random() * doorLore.length)];
            break;
        case 'bookcase':
            const collectibleLore = [
                "Please do not touch the collectibles. They are mint in box.",
                "Is that a first edition Flash comic?",
                "My Aquaman action figure fell over... tragedy strikes.",
                "I spent 400 dollars on that prop sword."
            ];
            msg = collectibleLore[Math.floor(Math.random() * collectibleLore.length)];
            break;
    }
    
    // Create a speech bubble
    const bubble = document.createElement('div');
    bubble.className = 'absolute bg-white/95 text-slate-900 px-3 py-2 rounded-xl text-[10px] font-bold shadow-xl border-2 border-slate-300 max-w-[150px] z-[100] animate-bounce pointer-events-none text-center';
    bubble.innerText = msg;
    bubble.style.top = \`\$\{event.clientY - 60\}px\`;
    bubble.style.left = \`\$\{event.clientX - 75\}px\`;
    
    // Add a little tail to the bubble
    const tail = document.createElement('div');
    tail.className = 'absolute w-3 h-3 bg-white/95 border-b-2 border-r-2 border-slate-300 rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2';
    bubble.appendChild(tail);
    
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 4000);
}`;

app = app.replace(hangoutRegex, hangoutReplacement);
fs.writeFileSync('app.js', app);
console.log("Updated Hangout Mode and BP logic");
