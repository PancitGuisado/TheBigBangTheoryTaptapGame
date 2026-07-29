const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Update renderActiveBattleLine
const rablStartStr = `            const trackingBadge = (key === 'sheldon') \r\n                ? \`<span id="sheldon-buff-badge" class="absolute -top-8 bg-amber-500 border border-amber-700 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded shadow animate-pulse hidden"></span>\` \r\n                : '';`;

const rablEndStr = `            container.innerHTML += \`\r\n                <div id="live-character-\${key}"`;

const rablStartIdx = app.indexOf(rablStartStr);
const rablEndIdx = app.indexOf(rablEndStr);

if (rablStartIdx !== -1 && rablEndIdx !== -1) {
    const rablReplacement = `            const trackingBadge = (key === 'sheldon') \n                ? \`<span id="sheldon-buff-badge" class="absolute -top-8 bg-amber-500 border border-amber-700 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded shadow animate-pulse hidden"></span>\` \n                : '';\n\n            const hpData = state.roster[key];\n            const maxHp = hpData.maxHp || (config.baseHp || 100);\n            const currentHp = typeof hpData.currentHp !== 'undefined' ? hpData.currentHp : maxHp;\n            const hpPct = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));\n            const hpBarHtml = \`\n                <div class="absolute -top-3 left-0 right-0 h-1.5 bg-red-950 border border-red-900 rounded-sm overflow-hidden z-40 opacity-90 shadow-[0_0_5px_rgba(255,0,0,0.5)] pointer-events-none">\n                    <div class="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300" style="width: \${hpPct}%"></div>\n                </div>\n            \`;\n\n`;
    app = app.substring(0, rablStartIdx) + rablReplacement + app.substring(rablEndIdx);
    console.log("Replaced rabl trackingBadge logic.");
} else {
    // try fallback with \n instead of \r\n
    const fbStartStr = `            const trackingBadge = (key === 'sheldon') \n                ? \`<span id="sheldon-buff-badge" class="absolute -top-8 bg-amber-500 border border-amber-700 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded shadow animate-pulse hidden"></span>\` \n                : '';`;
    const fbEndStr = `            container.innerHTML += \`\n                <div id="live-character-\${key}"`;
    const fbStartIdx = app.indexOf(fbStartStr);
    const fbEndIdx = app.indexOf(fbEndStr);
    if (fbStartIdx !== -1 && fbEndIdx !== -1) {
        const rablReplacement = `            const trackingBadge = (key === 'sheldon') \n                ? \`<span id="sheldon-buff-badge" class="absolute -top-8 bg-amber-500 border border-amber-700 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded shadow animate-pulse hidden"></span>\` \n                : '';\n\n            const hpData = state.roster[key];\n            const maxHp = hpData.maxHp || (config.baseHp || 100);\n            const currentHp = typeof hpData.currentHp !== 'undefined' ? hpData.currentHp : maxHp;\n            const hpPct = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));\n            const hpBarHtml = \`\n                <div class="absolute -top-3 left-0 right-0 h-1.5 bg-red-950 border border-red-900 rounded-sm overflow-hidden z-40 opacity-90 shadow-[0_0_5px_rgba(255,0,0,0.5)] pointer-events-none">\n                    <div class="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300" style="width: \${hpPct}%"></div>\n                </div>\n            \`;\n\n`;
        app = app.substring(0, fbStartIdx) + rablReplacement + app.substring(fbEndIdx);
        console.log("Replaced rabl trackingBadge logic (fallback newline).");
    } else {
        console.log("Could not find rabl targets.");
    }
}

// Ensure the hpBarHtml is added into the HTML string
const rablInsertStr = `style="z-index: ${20 + index};">\r\n                    ${trackingBadge}`;
if (app.includes(rablInsertStr)) {
    app = app.replace(rablInsertStr, `style="z-index: ${20 + index};">\r\n                    ${hpBarHtml}\r\n                    ${trackingBadge}`);
} else {
    // fallback
    const fbInsertStr = `style="z-index: \${20 + index};">\n                    \${trackingBadge}`;
    if (app.includes(fbInsertStr)) {
        app = app.replace(fbInsertStr, `style="z-index: \${20 + index};">\n                    \${hpBarHtml}\n                    \${trackingBadge}`);
    } else {
        console.log("Could not find trackingBadge insert target.");
    }
}


// Update generateDamagePopup
const gdpStartStr = "function generateDamagePopup(event, val, isCrit, isSpecialText) {";
const gdpEndStr = "    const xOffset = (Math.random() - 0.5) * 40;";
const gdpStartIdx = app.indexOf(gdpStartStr);
const gdpEndIdx = app.indexOf(gdpEndStr);

if (gdpStartIdx !== -1 && gdpEndIdx !== -1) {
    const gdpReplacement = `function generateDamagePopup(event, val, isCrit, isSpecialText, isEnemyDamage = false) {
    const arena = document.getElementById('arena');
    if (!arena) return;
    const arenaRect = arena.getBoundingClientRect();
    const pop = document.createElement('div');
    
    pop.className = \`damage-popup\`;
    if (isCrit) pop.className += ' crit-popup';
    if (isEnemyDamage) pop.style.cssText += 'color: #ff3333 !important; font-weight: 900 !important; text-shadow: 0 2px 4px rgba(0,0,0,1), 0 0 2px rgba(0,0,0,1) !important; font-size: 14px !important; z-index: 999 !important;';
    
`;
    app = app.substring(0, gdpStartIdx) + gdpReplacement + app.substring(gdpEndIdx);
    console.log("Updated generateDamagePopup.");
} else {
    console.log("Could not find generateDamagePopup targets.");
}

fs.writeFileSync('app.js', app);
console.log("Finished script!");
