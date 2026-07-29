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
    
    // Couch = bottom 30% of arena, center ~20-80%
    // Sheldon's spot = left cushion of the center couch
    // Characters ON the couch sit lower, characters BEHIND stand higher
    const hangoutPositions = {
        sheldon: { bottom: '12%', left: '22%' },    // His spot - left cushion
        leonard: { bottom: '12%', left: '38%' },    // Middle cushion
        penny:   { bottom: '12%', left: '52%' },    // Right cushion
        howard:  { bottom: '12%', left: '76%' },    // Side chair right
        raj:     { bottom: '40%', left: '5%' },     // Standing far left by door
        amy:     { bottom: '40%', left: '72%' },    // Standing far right by whiteboard
        bernie:  { bottom: '40%', left: '46%' },    // Standing behind couch center
        stuart:  { bottom: '40%', left: '26%' }     // Standing behind couch left
    };
    
    let idx = 0;
    for (const [key, config] of Object.entries(characters)) {
        const isEquipped = state.equipped && state.equipped[key];
        const hasLevel = state.roster[key] && state.roster[key].level > 0;
        if (!isEquipped || !hasLevel) continue;
        
        const pos = hangoutPositions[key] || { bottom: (40 + (idx % 2) * 10) + '%', left: (5 + idx * 12) + '%' };
        
        const charDiv = document.createElement('div');
        charDiv.className = 'absolute flex flex-col items-center pointer-events-auto cursor-pointer hover:brightness-125 transition-all duration-300';
        charDiv.style.transform = 'scale(0.55)';
        charDiv.style.transformOrigin = 'bottom center';
        charDiv.style.filter = 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))';
        
        charDiv.style.bottom = pos.bottom;
        if (pos.left) charDiv.style.left = pos.left;
        if (pos.right) charDiv.style.right = pos.right;
        charDiv.style.zIndex = String(56 + idx);
        
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
    console.log('✅ Updated renderHangoutCrew - smaller, spaced out');
} else {
    console.log('❌ Could not find renderHangoutCrew');
}

// Update CSS animation
let css = fs.readFileSync('styles.css', 'utf8');
css = css.replace(
    /@keyframes hangout-idle \{[\s\S]*?\}/,
    `@keyframes hangout-idle {
    0%, 100% { transform: scale(0.55) translateY(0); }
    50% { transform: scale(0.55) translateY(-3px); }
}`
);
fs.writeFileSync('styles.css', css);
console.log('✅ Updated animation to preserve scale');

let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');
