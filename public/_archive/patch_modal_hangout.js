const fs = require('fs');

// ============================================================
// FIX 1: Remove scrollbar from all modals (CSS)
// ============================================================
let css = fs.readFileSync('styles.css', 'utf8');

// Add scrollbar-hiding styles for modal content areas
const scrollbarHideCSS = `
/* ======================================================
   HIDE SCROLLBARS IN MODALS (keep scroll functionality)
   ======================================================= */
.overflow-y-auto::-webkit-scrollbar,
.overflow-x-auto::-webkit-scrollbar {
    display: none;
}
.overflow-y-auto,
.overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
`;

if (!css.includes('HIDE SCROLLBARS IN MODALS')) {
    css += scrollbarHideCSS;
    fs.writeFileSync('styles.css', css);
    console.log('✅ FIX 1: Added scrollbar-hiding CSS for modals');
} else {
    console.log('⏭ FIX 1: Already applied');
}

// ============================================================
// FIX 2: Patch hangout mode to show equipped crew in arena
// ============================================================
let code = fs.readFileSync('app_v2.js', 'utf8');

// Replace the toggleHangoutMode function
const oldToggle = `function toggleHangoutMode(event) {
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
}`;

const newToggle = `function toggleHangoutMode(event) {
    if (event) event.stopPropagation();
    hangoutMode = !hangoutMode;
    
    const btnText = document.getElementById('hangout-btn-text');
    if (btnText) btnText.innerText = hangoutMode ? 'BACK TO BATTLE' : 'HANG OUT';
    
    const combatUI = document.getElementById('enemy-battle-slot');
    const playerLines = document.getElementById('player-battle-line');
    const robotLines = document.getElementById('robot-battle-line');
    const hotspots = document.getElementById('hangout-hotspots');
    const hangoutCrewContainer = document.getElementById('hangout-crew-container');
    
    if (hangoutMode) {
        if (combatUI) combatUI.classList.add('hidden');
        if (playerLines) playerLines.classList.add('hidden');
        if (robotLines) robotLines.classList.add('hidden');
        if (hotspots) hotspots.classList.remove('hidden');
        renderHangoutCrew();
    } else {
        if (combatUI) combatUI.classList.remove('hidden');
        if (playerLines) playerLines.classList.remove('hidden');
        if (robotLines) robotLines.classList.remove('hidden');
        if (hotspots) hotspots.classList.add('hidden');
        if (hangoutCrewContainer) hangoutCrewContainer.remove();
    }
}

function renderHangoutCrew() {
    // Remove old container if it exists
    let container = document.getElementById('hangout-crew-container');
    if (container) container.remove();
    
    const arena = document.getElementById('arena');
    if (!arena) return;
    
    container = document.createElement('div');
    container.id = 'hangout-crew-container';
    container.className = 'absolute inset-0 z-[55] pointer-events-none';
    arena.appendChild(container);
    
    // Hangout positions for each character — placed around the apartment
    const hangoutPositions = {
        sheldon: { bottom: '8%', left: '42%', label: 'My Spot!' },
        leonard: { bottom: '8%', left: '55%', label: 'Leonard' },
        penny:   { bottom: '12%', right: '15%', label: 'Penny' },
        howard:  { bottom: '8%', left: '28%', label: 'Howard' },
        raj:     { bottom: '12%', left: '15%', label: 'Raj' },
        bernie:  { bottom: '30%', right: '10%', label: 'Bernadette' },
        amy:     { bottom: '30%', left: '10%', label: 'Amy' },
        stuart:  { bottom: '30%', left: '35%', label: 'Stuart' }
    };
    
    let idx = 0;
    for (const [key, config] of Object.entries(characters)) {
        const isEquipped = state.equipped && state.equipped[key];
        const hasLevel = state.roster[key] && state.roster[key].level > 0;
        if (!isEquipped || !hasLevel) continue;
        
        const pos = hangoutPositions[key] || { bottom: (10 + idx * 8) + '%', left: (10 + idx * 12) + '%' };
        
        const charDiv = document.createElement('div');
        charDiv.className = 'absolute flex flex-col items-center pointer-events-auto cursor-pointer hover:brightness-125 transition-all duration-300';
        charDiv.style.cssText = 'transform: scale(1.4); filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));';
        
        if (pos.bottom) charDiv.style.bottom = pos.bottom;
        if (pos.left) charDiv.style.left = pos.left;
        if (pos.right) charDiv.style.right = pos.right;
        charDiv.style.zIndex = 56 + idx;
        
        charDiv.onclick = function(e) { e.stopPropagation(); openModal(e, key); };
        
        // Add idle bobbing animation
        charDiv.style.animation = 'hangout-idle ' + (2 + Math.random()) + 's ease-in-out infinite';
        
        const vectorHtml = typeof getVectorFrame === 'function' ? getVectorFrame(key) : (vectors[key] || '');
        
        charDiv.innerHTML = \`
            <div class="character-vector-wrapper flex items-end justify-center">\${vectorHtml}</div>
            <span class="bg-amber-950/90 text-white border border-amber-700 font-bold text-[8px] px-1.5 py-0.5 rounded whitespace-nowrap uppercase tracking-tighter shadow-lg mt-1">
                \${config.name}
            </span>
        \`;
        
        container.appendChild(charDiv);
        idx++;
    }
}`;

// Use regex to handle mixed line endings
const oldToggleRegex = /function toggleHangoutMode\(event\) \{[\s\S]*?if \(hotspots\) hotspots\.classList\.add\('hidden'\);\s*\}\s*\}/;

if (oldToggleRegex.test(code)) {
    code = code.replace(oldToggleRegex, newToggle);
    console.log('✅ FIX 2: Patched toggleHangoutMode with crew rendering');
} else {
    console.log('❌ FIX 2: Could not find toggleHangoutMode');
}

// ============================================================
// FIX 3: Add hangout-idle animation to CSS
// ============================================================
css = fs.readFileSync('styles.css', 'utf8');
const hangoutAnimCSS = `
/* Hangout idle bobbing animation */
@keyframes hangout-idle {
    0%, 100% { transform: scale(1.4) translateY(0); }
    50% { transform: scale(1.4) translateY(-4px); }
}
`;

if (!css.includes('hangout-idle')) {
    css += hangoutAnimCSS;
    fs.writeFileSync('styles.css', css);
    console.log('✅ FIX 3: Added hangout idle animation CSS');
} else {
    console.log('⏭ FIX 3: Already applied');
}

fs.writeFileSync('app_v2.js', code);

// Verify
let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');
console.log('\n🎉 Done!');
