const fs = require('fs');
let content = fs.readFileSync('missing_ui.js', 'utf8');

const targetStr = `    switch(type) {\r\n        case 'whiteboard':\r\n    const pDrp = document.getElementById('perk-val-drop');\r\n    if (pDrp) pDrp.innerText = (state.perks.dropMult * 10).toString();\r\n}`;

const newStr = `    switch(type) {
        case 'whiteboard':
            const equations = ["Bazinga!", "That's my spot.", "I'm not crazy, my mother had me tested.", "I am the master of my own bladder."];
            msg = equations[Math.floor(Math.random() * equations.length)];
            val = Math.floor(Math.random() * 5) + 1;
            state.resources.money += val;
            generateDamagePopup({clientX: event.clientX, clientY: event.clientY}, \\\`+\${val} CASH\\\`, true, true);
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
    bubble.style.left = \\\`\${event.clientX}px\\\`;
    bubble.style.top = \\\`\${event.clientY - 40}px\\\`;
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
}`;

content = content.replace(targetStr, newStr.replace(/\\`/g, '`'));
fs.writeFileSync('missing_ui.js', content);
console.log('Fixed missing_ui.js');
