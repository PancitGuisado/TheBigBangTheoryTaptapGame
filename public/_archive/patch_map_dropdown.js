const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// Replace renderHangoutMapBrowser with a dropdown version
const oldFnRegex = /function renderHangoutMapBrowser\(\) \{[\s\S]*?\n\}\r?\n/;

const newFn = `function renderHangoutMapBrowser() {
    let container = document.getElementById('hangout-crew-container');
    if (container) container.remove();
    
    const arena = document.getElementById('arena');
    if (!arena) return;
    
    container = document.createElement('div');
    container.id = 'hangout-crew-container';
    container.style.cssText = 'position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:58;width:260px;';
    arena.appendChild(container);
    
    var currentLoc = locations[state.currentLocation];
    var currentName = currentLoc ? currentLoc.name : state.currentLocation;
    
    // Dropdown toggle button
    var toggle = document.createElement('div');
    toggle.id = 'map-dropdown-toggle';
    toggle.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a);border:2px solid #334155;border-radius:8px;padding:8px 14px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;box-shadow:0 4px 15px rgba(0,0,0,0.5);';
    toggle.innerHTML = '<div style="display:flex;align-items:center;gap:6px;">' +
        '<span style="font-size:14px;">📍</span>' +
        '<div><div style="font-size:7px;color:#64748b;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Current Location</div>' +
        '<div style="font-size:11px;font-weight:900;color:#34d399;">' + currentName + '</div></div></div>' +
        '<span id="map-dropdown-arrow" style="color:#94a3b8;font-size:10px;transition:transform 0.2s;">▼</span>';
    toggle.onclick = function(e) {
        e.stopPropagation();
        var list = document.getElementById('map-dropdown-list');
        var arrow = document.getElementById('map-dropdown-arrow');
        if (list.style.display === 'none') {
            list.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
            toggle.style.borderColor = '#fbbf24';
        } else {
            list.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
            toggle.style.borderColor = '#334155';
        }
    };
    toggle.onmouseenter = function() { this.style.borderColor = '#fbbf24'; };
    toggle.onmouseleave = function() { var list = document.getElementById('map-dropdown-list'); if (!list || list.style.display === 'none') this.style.borderColor = '#334155'; };
    container.appendChild(toggle);
    
    // Dropdown list
    var list = document.createElement('div');
    list.id = 'map-dropdown-list';
    list.style.cssText = 'display:none;margin-top:4px;background:#0f172a;border:2px solid #334155;border-radius:8px;max-height:350px;overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none;box-shadow:0 8px 25px rgba(0,0,0,0.6);';
    
    for (var i = 0; i < locationOrder.length; i++) {
        var locKey = locationOrder[i];
        var loc = locations[locKey];
        if (!loc) continue;
        
        var isUnlocked = state.unlockedLocations && state.unlockedLocations.indexOf(locKey) !== -1;
        var isCurrent = state.currentLocation === locKey;
        
        var item = document.createElement('div');
        item.style.cssText = 'padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:6px;border-bottom:1px solid #1e293b;transition:background 0.15s;' +
            (isUnlocked ? 'cursor:pointer;' : 'cursor:not-allowed;opacity:0.35;');
        
        if (isUnlocked && !isCurrent) {
            item.onmouseenter = function() { this.style.background = '#1e293b'; };
            item.onmouseleave = function() { this.style.background = 'transparent'; };
        }
        
        // Left side: name + info
        var leftSide = document.createElement('div');
        leftSide.style.cssText = 'flex:1;min-width:0;pointer-events:none;';
        
        var nameRow = document.createElement('div');
        nameRow.style.cssText = 'display:flex;align-items:center;gap:4px;';
        
        var nameEl = document.createElement('span');
        nameEl.style.cssText = 'font-size:10px;font-weight:800;color:' + (isCurrent ? '#34d399' : isUnlocked ? '#e2e8f0' : '#475569') + ';text-transform:uppercase;letter-spacing:0.3px;';
        nameEl.textContent = isUnlocked ? loc.name : '???';
        nameRow.appendChild(nameEl);
        
        if (isCurrent) {
            var hereBadge = document.createElement('span');
            hereBadge.style.cssText = 'font-size:6px;background:#065f46;color:#34d399;padding:1px 4px;border-radius:2px;border:1px solid #059669;font-weight:bold;';
            hereBadge.textContent = '⬤ HERE';
            nameRow.appendChild(hereBadge);
        }
        leftSide.appendChild(nameRow);
        
        if (isUnlocked) {
            var meta = document.createElement('div');
            meta.style.cssText = 'font-size:7px;color:#64748b;margin-top:1px;';
            meta.textContent = loc.desc + '  •  LV ' + loc.minDifficulty + '-' + loc.maxDifficulty;
            leftSide.appendChild(meta);
        }
        item.appendChild(leftSide);
        
        // Right side: button or lock
        if (isUnlocked && !isCurrent) {
            var btn = document.createElement('button');
            btn.style.cssText = 'font-size:7px;font-weight:bold;background:#1d4ed8;color:white;border:1px solid #3b82f6;padding:3px 8px;border-radius:4px;cursor:pointer;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;flex-shrink:0;';
            btn.textContent = 'GO';
            btn.setAttribute('data-loc', locKey);
            btn.onclick = function(e) {
                e.stopPropagation();
                var targetLoc = this.getAttribute('data-loc');
                switchLocation(targetLoc);
                toggleHangoutMode(null);
            };
            btn.onmouseenter = function() { this.style.background = '#2563eb'; };
            btn.onmouseleave = function() { this.style.background = '#1d4ed8'; };
            item.appendChild(btn);
        } else if (!isUnlocked) {
            var lockEl = document.createElement('span');
            lockEl.style.cssText = 'font-size:8px;color:#475569;flex-shrink:0;';
            lockEl.textContent = '🔒';
            item.appendChild(lockEl);
        }
        
        list.appendChild(item);
    }
    
    container.appendChild(list);
}
`;

if (oldFnRegex.test(code)) {
    code = code.replace(oldFnRegex, newFn);
    console.log('✅ Replaced map browser with dropdown');
} else {
    console.log('❌ Could not find renderHangoutMapBrowser');
}

fs.writeFileSync('app_v2.js', code);

let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');

// Update cache buster
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/v=1781\d+/g, 'v=1781450000000');
fs.writeFileSync('index.html', html);
console.log('✅ Cache buster updated');
