const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// Replace the renderHangoutCrew function with properly positioned characters
const oldFnRegex = /function renderHangoutCrew\(\) \{[\s\S]*?\n\}\r?\n/;

const newFn = `function renderHangoutCrew() {
    // Remove old container if exists
    let container = document.getElementById('hangout-crew-container');
    if (container) container.remove();
    
    const arena = document.getElementById('arena');
    if (!arena) return;
    
    container = document.createElement('div');
    container.id = 'hangout-crew-container';
    container.className = 'absolute inset-0 z-[55] pointer-events-none';
    arena.appendChild(container);
    
    // Positions mapped to the apartment background:
    // Couch is bottom 30%, center 60% width
    // Sheldon's spot = left cushion of center couch (~20-30% from left)
    // Side chair right = ~75-90% from left
    // Side chair left = ~5-15% from left
    // Standing areas = behind couch (~35-65% height)
    const hangoutPositions = {
        sheldon: { bottom: '18%', left: '25%' },   // His spot - left cushion
        leonard: { bottom: '18%', left: '40%' },    // Middle cushion
        penny:   { bottom: '18%', left: '53%' },    // Right cushion  
        howard:  { bottom: '18%', right: '10%' },   // Side chair right
        raj:     { bottom: '35%', left: '8%' },     // Standing left side
        amy:     { bottom: '35%', left: '70%' },    // Standing right of couch
        bernie:  { bottom: '35%', left: '50%' },    // Standing behind couch center
        stuart:  { bottom: '35%', left: '30%' }     // Standing behind couch left
    };
    
    let idx = 0;
    for (const [key, config] of Object.entries(characters)) {
        const isEquipped = state.equipped && state.equipped[key];
        const hasLevel = state.roster[key] && state.roster[key].level > 0;
        if (!isEquipped || !hasLevel) continue;
        
        const pos = hangoutPositions[key] || { bottom: (35 + (idx % 2) * 15) + '%', left: (8 + idx * 11) + '%' };
        
        const charDiv = document.createElement('div');
        charDiv.className = 'absolute flex flex-col items-center pointer-events-auto cursor-pointer hover:brightness-125 transition-all duration-300';
        charDiv.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))';
        
        if (pos.bottom) charDiv.style.bottom = pos.bottom;
        if (pos.left) charDiv.style.left = pos.left;
        if (pos.right) charDiv.style.right = pos.right;
        charDiv.style.zIndex = String(56 + idx);
        
        charDiv.onclick = function(e) { e.stopPropagation(); openModal(e, key); };
        
        // Gentle idle animation
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
    console.log('✅ Replaced renderHangoutCrew with properly spaced positions');
} else {
    console.log('❌ Could not find renderHangoutCrew');
}

// Also update the CSS animation to not scale
let css = fs.readFileSync('styles.css', 'utf8');
css = css.replace(
    /@keyframes hangout-idle \{[\s\S]*?\}/,
    `@keyframes hangout-idle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
}`
);
fs.writeFileSync('styles.css', css);
console.log('✅ Fixed hangout-idle animation (no scale)');

// Verify
let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');
