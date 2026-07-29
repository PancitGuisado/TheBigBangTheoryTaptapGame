const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// 1. Re-enable applyEnemyCounter
app = app.replace(
    '// ENEMY COUNTER-ATTACK: Temporarily disabled to keep the game relaxing\n    // let enemyCounterDmg = Math.floor((currentEnemy.maxHp / 20) * (state.wave * 0.5));\n    // applyEnemyCounter(enemyCounterDmg);',
    '// ENEMY COUNTER-ATTACK: Enemies now damage characters back\n    let enemyCounterDmg = Math.floor((currentEnemy.maxHp / 20) * (state.wave * 0.5));\n    applyEnemyCounter(enemyCounterDmg);'
);

// 2. Add HP Bar to renderActiveBattleLine
const rablTarget = `            const trackingBadge = (key === 'sheldon') \n                ? \`<span id="sheldon-buff-badge" class="absolute -top-8 bg-amber-500 border border-amber-700 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded shadow animate-pulse hidden"></span>\` \n                : '';\n\n            container.innerHTML += \`\n                <div id="live-character-\${key}" \n                     onclick="openModal(event, '\${key}')" class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:brightness-125 transition pointer-events-auto"\n                     style="z-index: \${20 + index};">\n                    \${trackingBadge}`;

const rablReplacement = `            const trackingBadge = (key === 'sheldon') \n                ? \`<span id="sheldon-buff-badge" class="absolute -top-8 bg-amber-500 border border-amber-700 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded shadow animate-pulse hidden"></span>\` \n                : '';\n                \n            const hpData = state.roster[key];\n            const maxHp = hpData.maxHp || (config.baseHp || 100);\n            const currentHp = typeof hpData.currentHp !== 'undefined' ? hpData.currentHp : maxHp;\n            const hpPct = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));\n            const hpBarHtml = \`\n                <div class="absolute -top-3 left-0 right-0 h-1.5 bg-red-950 border border-red-900 rounded-sm overflow-hidden z-40 opacity-90 shadow-[0_0_5px_rgba(255,0,0,0.5)]">\n                    <div class="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300" style="width: \${hpPct}%"></div>\n                </div>\n            \`;\n\n            container.innerHTML += \`\n                <div id="live-character-\${key}" \n                     onclick="openModal(event, '\${key}')" class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:brightness-125 transition pointer-events-auto"\n                     style="z-index: \${20 + index};">\n                    \${hpBarHtml}\n                    \${trackingBadge}`;

app = app.replace(rablTarget, rablReplacement);

// 3. Add damage popup to applyEnemyCounter
const aecTarget = `        charData.currentHp -= damagePerChar;\n        \n        // Check if character should be hospitalized`;
const aecReplacement = `        charData.currentHp -= damagePerChar;\n        \n        const charEl = document.getElementById('live-character-' + charKey);\n        if (charEl) {\n            const rect = charEl.getBoundingClientRect();\n            const simulatedEvent = {\n                clientX: rect.left + rect.width / 2,\n                clientY: rect.top + rect.height / 2\n            };\n            generateDamagePopup(simulatedEvent, damagePerChar, false, false, true);\n        }\n        \n        // Check if character should be hospitalized`;

app = app.replace(aecTarget, aecReplacement);

// 4. Update generateDamagePopup
const gdpTarget = `function generateDamagePopup(event, val, isCrit, isSpecialText) {\n    const arena = document.getElementById('arena');\n    if (!arena) return;\n    const arenaRect = arena.getBoundingClientRect();\n    const pop = document.createElement('div');\n    \n    pop.className = \`damage-popup\`;\n    if (isCrit) pop.className += ' crit-popup';`;

const gdpReplacement = `function generateDamagePopup(event, val, isCrit, isSpecialText, isEnemyDamage = false) {\n    const arena = document.getElementById('arena');\n    if (!arena) return;\n    const arenaRect = arena.getBoundingClientRect();\n    const pop = document.createElement('div');\n    \n    pop.className = \`damage-popup\`;\n    if (isCrit) pop.className += ' crit-popup';\n    if (isEnemyDamage) pop.style.cssText += 'color: #ff3333 !important; font-weight: 900 !important; text-shadow: 0 2px 4px rgba(0,0,0,1), 0 0 2px rgba(0,0,0,1) !important; font-size: 14px !important; z-index: 999 !important;';`;

app = app.replace(gdpTarget, gdpReplacement);

// 5. Ensure applyEnemyCounter calls renderActiveBattleLine to update HP bars!
const aecEndTarget = `    });\n}`;
const aecEndReplacement = `    });\n    \n    renderActiveBattleLine();\n}`;

app = app.replace(aecEndTarget, aecEndReplacement);


fs.writeFileSync('app.js', app);
console.log("Success!");
