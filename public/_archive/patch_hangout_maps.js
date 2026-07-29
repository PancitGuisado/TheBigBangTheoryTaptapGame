const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// Replace toggleHangoutMode and renderHangoutCrew with map-based hangout
const oldToggleRegex = /function toggleHangoutMode\(event\) \{[\s\S]*?function renderHangoutCrew\(\) \{[\s\S]*?\n\}\r?\n/;

const newHangout = `function toggleHangoutMode(event) {
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
        const synergyEl = document.getElementById('synergy-display');
        if (synergyEl) synergyEl.style.display = 'none';
        const repairEl = document.getElementById('quick-repair-container');
        if (repairEl) repairEl.style.display = 'none';
        const bossCtrl = document.getElementById('boss-controls');
        if (bossCtrl) bossCtrl.style.display = 'none';
        document.querySelectorAll('.damage-popup, .unique-fx, .laser-beam').forEach(function(el) { el.remove(); });
        renderHangoutMapBrowser();
    } else {
        if (combatUI) combatUI.classList.remove('hidden');
        if (playerLines) playerLines.classList.remove('hidden');
        if (robotLines) robotLines.classList.remove('hidden');
        if (hotspots) hotspots.classList.add('hidden');
        const synergyEl2 = document.getElementById('synergy-display');
        if (synergyEl2) synergyEl2.style.display = '';
        const repairEl2 = document.getElementById('quick-repair-container');
        if (repairEl2) repairEl2.style.display = '';
        const bossCtrl2 = document.getElementById('boss-controls');
        if (bossCtrl2) bossCtrl2.style.display = '';
        const hcc = document.getElementById('hangout-crew-container');
        if (hcc) hcc.remove();
    }
}

function renderHangoutMapBrowser() {
    let container = document.getElementById('hangout-crew-container');
    if (container) container.remove();
    
    const arena = document.getElementById('arena');
    if (!arena) return;
    
    container = document.createElement('div');
    container.id = 'hangout-crew-container';
    container.style.cssText = 'position:absolute;inset:0;z-index:55;display:flex;flex-direction:column;align-items:center;padding:12px;overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none;';
    arena.appendChild(container);
    
    // Title
    var titleEl = document.createElement('div');
    titleEl.style.cssText = 'font-size:14px;font-weight:900;color:#fbbf24;text-transform:uppercase;letter-spacing:3px;margin-bottom:8px;text-shadow:0 0 10px rgba(251,191,36,0.5);';
    titleEl.textContent = '📍 LOCATION MAP';
    container.appendChild(titleEl);
    
    // Current location indicator
    var currentLoc = locations[state.currentLocation];
    var currentEl = document.createElement('div');
    currentEl.style.cssText = 'font-size:9px;color:#94a3b8;margin-bottom:10px;background:rgba(0,0,0,0.6);padding:4px 10px;border-radius:4px;border:1px solid #334155;';
    currentEl.innerHTML = 'CURRENT: <span style="color:#34d399;font-weight:bold;">' + (currentLoc ? currentLoc.name : state.currentLocation) + '</span>';
    container.appendChild(currentEl);
    
    // Grid of location cards
    var grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%;max-width:600px;';
    container.appendChild(grid);
    
    for (var i = 0; i < locationOrder.length; i++) {
        var locKey = locationOrder[i];
        var loc = locations[locKey];
        if (!loc) continue;
        
        var isUnlocked = state.unlockedLocations && state.unlockedLocations.indexOf(locKey) !== -1;
        var isCurrent = state.currentLocation === locKey;
        
        var card = document.createElement('div');
        card.style.cssText = 'position:relative;border-radius:8px;overflow:hidden;cursor:' + (isUnlocked ? 'pointer' : 'not-allowed') + ';border:2px solid ' + (isCurrent ? '#34d399' : isUnlocked ? '#475569' : '#1e293b') + ';opacity:' + (isUnlocked ? '1' : '0.4') + ';transition:all 0.2s;min-height:80px;';
        
        if (isUnlocked && !isCurrent) {
            card.onmouseenter = function() { this.style.borderColor = '#fbbf24'; this.style.transform = 'scale(1.02)'; };
            card.onmouseleave = function() { this.style.borderColor = '#475569'; this.style.transform = 'scale(1)'; };
        }
        
        // Background preview
        var bgPreview = document.createElement('div');
        bgPreview.style.cssText = 'position:absolute;inset:0;opacity:0.35;pointer-events:none;';
        if (isUnlocked && typeof backgrounds !== 'undefined' && backgrounds[locKey]) {
            bgPreview.innerHTML = backgrounds[locKey];
        } else {
            bgPreview.style.background = '#0f172a';
        }
        card.appendChild(bgPreview);
        
        // Dark overlay for text readability
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8),rgba(0,0,0,0.3));pointer-events:none;';
        card.appendChild(overlay);
        
        // Content
        var content = document.createElement('div');
        content.style.cssText = 'position:relative;z-index:1;padding:8px;display:flex;flex-direction:column;height:100%;justify-content:space-between;pointer-events:none;';
        
        // Name + badge row
        var nameRow = document.createElement('div');
        nameRow.style.cssText = 'display:flex;justify-content:space-between;align-items:flex-start;gap:4px;';
        
        var nameEl = document.createElement('div');
        nameEl.style.cssText = 'font-size:10px;font-weight:900;color:white;text-transform:uppercase;letter-spacing:0.5px;line-height:1.2;';
        nameEl.textContent = isUnlocked ? loc.name : '???';
        nameRow.appendChild(nameEl);
        
        if (isCurrent) {
            var badge = document.createElement('span');
            badge.style.cssText = 'font-size:7px;background:#065f46;color:#34d399;padding:2px 5px;border-radius:3px;border:1px solid #059669;font-weight:bold;white-space:nowrap;';
            badge.textContent = 'HERE';
            nameRow.appendChild(badge);
        }
        content.appendChild(nameRow);
        
        // Desc
        if (isUnlocked) {
            var descEl = document.createElement('div');
            descEl.style.cssText = 'font-size:7px;color:#94a3b8;margin-top:2px;line-height:1.3;';
            descEl.textContent = loc.desc;
            content.appendChild(descEl);
        }
        
        // Difficulty + button row
        var bottomRow = document.createElement('div');
        bottomRow.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-top:6px;';
        
        if (isUnlocked) {
            var diffEl = document.createElement('span');
            diffEl.style.cssText = 'font-size:7px;color:#f59e0b;font-weight:bold;background:rgba(0,0,0,0.5);padding:2px 4px;border-radius:2px;';
            diffEl.textContent = 'LV ' + loc.minDifficulty + '-' + loc.maxDifficulty;
            bottomRow.appendChild(diffEl);
            
            if (!isCurrent) {
                var btn = document.createElement('button');
                btn.style.cssText = 'font-size:8px;font-weight:bold;background:#1d4ed8;color:white;border:1px solid #3b82f6;padding:3px 8px;border-radius:4px;cursor:pointer;pointer-events:auto;text-transform:uppercase;letter-spacing:0.5px;';
                btn.textContent = 'GO HERE';
                btn.setAttribute('data-loc', locKey);
                btn.onclick = function(e) {
                    e.stopPropagation();
                    var targetLoc = this.getAttribute('data-loc');
                    switchLocation(targetLoc);
                    toggleHangoutMode(null);
                };
                btn.onmouseenter = function() { this.style.background = '#2563eb'; };
                btn.onmouseleave = function() { this.style.background = '#1d4ed8'; };
                bottomRow.appendChild(btn);
            }
        } else {
            var lockEl = document.createElement('span');
            lockEl.style.cssText = 'font-size:8px;color:#64748b;font-weight:bold;';
            lockEl.textContent = '🔒 LOCKED';
            bottomRow.appendChild(lockEl);
        }
        content.appendChild(bottomRow);
        
        card.appendChild(content);
        grid.appendChild(card);
    }
}
`;

if (oldToggleRegex.test(code)) {
    code = code.replace(oldToggleRegex, newHangout);
    console.log('✅ Replaced hangout with map browser');
} else {
    console.log('❌ Could not find hangout functions');
}

fs.writeFileSync('app_v2.js', code);

let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');
