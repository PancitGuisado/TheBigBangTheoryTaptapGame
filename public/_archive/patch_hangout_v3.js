const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

const oldFnRegex = /function renderHangoutCrew\(\) \{[\s\S]*?\n\}\r?\n/;

const newFn = `function renderHangoutCrew() {
    let container = document.getElementById('hangout-crew-container');
    if (container) container.remove();
    
    const arena = document.getElementById('arena');
    if (!arena) return;
    
    container = document.createElement('div');
    container.id = 'hangout-crew-container';
    container.className = 'absolute inset-0 z-[55] pointer-events-none';
    arena.appendChild(container);
    
    // Couch top edge is at ~30% from bottom
    // "sitting" chars go ON the couch, "behind" chars peek over the couch back
    const hangoutPositions = {
        sheldon: { bottom: '14%', left: '22%', role: 'sitting' },
        leonard: { bottom: '14%', left: '38%', role: 'sitting' },
        penny:   { bottom: '14%', left: '52%', role: 'sitting' },
        howard:  { bottom: '14%', left: '76%', role: 'sitting' },
        raj:     { bottom: '22%', left: '8%',  role: 'behind' },
        amy:     { bottom: '22%', left: '68%', role: 'behind' },
        bernie:  { bottom: '22%', left: '48%', role: 'behind' },
        stuart:  { bottom: '22%', left: '28%', role: 'behind' }
    };
    
    let idx = 0;
    for (const [key, config] of Object.entries(characters)) {
        const isEquipped = state.equipped && state.equipped[key];
        const hasLevel = state.roster[key] && state.roster[key].level > 0;
        if (!isEquipped || !hasLevel) continue;
        
        const pos = hangoutPositions[key] || { bottom: '22%', left: (8 + idx * 12) + '%', role: 'behind' };
        
        const charDiv = document.createElement('div');
        charDiv.className = 'absolute flex flex-col items-center pointer-events-auto cursor-pointer hover:brightness-125 transition-all duration-300';
        charDiv.style.transform = 'scale(0.55)';
        charDiv.style.transformOrigin = 'bottom center';
        charDiv.style.filter = 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))';
        
        charDiv.style.bottom = pos.bottom;
        if (pos.left) charDiv.style.left = pos.left;
        if (pos.right) charDiv.style.right = pos.right;
        
        // Behind-couch characters: clip to only show head peeking over
        if (pos.role === 'behind') {
            charDiv.style.clipPath = 'inset(0 0 55% 0)';
            charDiv.style.zIndex = '54';
        } else {
            charDiv.style.zIndex = String(56 + idx);
        }
        
        charDiv.onclick = function(e) { e.stopPropagation(); openModal(e, key); };
        
        charDiv.style.animation = 'hangout-idle ' + (2.5 + Math.random() * 1.5) + 's ease-in-out infinite';
        charDiv.style.animationDelay = (Math.random() * 2) + 's';
        
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
}
`;

if (oldFnRegex.test(code)) {
    code = code.replace(oldFnRegex, newFn);
    fs.writeFileSync('app_v2.js', code);
    console.log('✅ Updated - behind-couch chars now peek heads only');
} else {
    console.log('❌ Could not find renderHangoutCrew');
}

let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');
