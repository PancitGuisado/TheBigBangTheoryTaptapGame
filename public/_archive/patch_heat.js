const fs = require('fs');

let appV2 = fs.readFileSync('app_v2.js', 'utf8');

// 1. startRobotAutomation - adding heat per attack
const robotAutoStart = `        window.robotTimers[robot.id] = setInterval(() => {`;
const robotAutoReplacement = `        window.robotTimers[robot.id] = setInterval(() => {
            if (robot.overheated) return; // Cannot attack if overheated
            if (typeof robot.heat === 'undefined' || isNaN(robot.heat)) robot.heat = 0;
            if (typeof robot.maxHeat === 'undefined' || isNaN(robot.maxHeat)) robot.maxHeat = (config.baseHeat || 200) * robot.level;
            
            // Add attacking heat
            robot.heat += Math.max(1, Math.floor(robot.maxHeat * 0.05)); // Add 5% heat per attack
            if (robot.heat >= robot.maxHeat) {
                robot.heat = robot.maxHeat;
                robot.overheated = true;
            }`;

if (appV2.includes(robotAutoStart) && !appV2.includes('robot.overheated')) {
    appV2 = appV2.replace(robotAutoStart, robotAutoReplacement);
    console.log('Patched startRobotAutomation');
}

// 2. renderRobotBattleLine - showing the heat bar and overheating badge
const renderRobotLineStart = `                    <!-- Robot Stats Badge -->`;
const renderRobotLineReplacement = `                    <!-- Robot Heat Bar -->
                    ${(() => {
                        const maxH = robot.maxHeat || (config.baseHeat || 200) * robot.level;
                        const curH = robot.heat || 0;
                        const hpPct = Math.max(0, Math.min(100, (curH / maxH) * 100));
                        const hpBarHtml = \`
                            <div class="absolute -top-3 left-0 right-0 h-1.5 bg-gray-900 border border-gray-700 rounded-sm overflow-hidden z-40 opacity-90 shadow-[0_0_5px_rgba(255,100,0,0.5)] pointer-events-none">
                                <div class="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300" style="width: \${hpPct}%"></div>
                            </div>
                        \`;
                        const smokeHtml = robot.overheated ? \`<div class="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-50 pointer-events-none">??</div><div class="absolute -top-6 text-red-500 font-bold text-[8px] bg-black/80 px-1 rounded z-50">OVERHEATED</div>\` : '';
                        return hpBarHtml + smokeHtml;
                    })()}
                    
                    <!-- Robot Stats Badge -->`;

if (appV2.includes(renderRobotLineStart) && !appV2.includes('<!-- Robot Heat Bar -->')) {
    // We also need to add the grayscale filter to the vector wrapper
    appV2 = appV2.replace(renderRobotLineStart, renderRobotLineReplacement);
    // Find the vector wrapper right above it
    appV2 = appV2.replace(/<div class="character-vector-wrapper flex items-center justify-center text-4xl " style="/g, '<div class="character-vector-wrapper flex items-center justify-center text-4xl ${robot.overheated ? \'grayscale brightness-50 sepia blur-[1px]\' : \'\'}" style="');
    console.log('Patched renderRobotBattleLine');
}

// 3. Howard's passive - cooling down robots
// Find where Howard attacks
const howardAttack = `            } else if (key === 'howard') {
                let outDmg = config.baseDmg * state.roster[key].level;
                if (state.roster[key].talents && state.roster[key].talents.dmg) {
                    outDmg = Math.floor(outDmg * (1 + (state.roster[key].talents.dmg * 0.10)));
                }
                processDamage(outDmg, key);`;

const howardReplacement = `            } else if (key === 'howard') {
                let outDmg = config.baseDmg * state.roster[key].level;
                if (state.roster[key].talents && state.roster[key].talents.dmg) {
                    outDmg = Math.floor(outDmg * (1 + (state.roster[key].talents.dmg * 0.10)));
                }
                processDamage(outDmg, key);
                
                const coolAmt = (config.basePassiveAmount || 10) * state.roster[key].level;
                let cooled = false;
                if (state.robots) {
                    state.robots.forEach(r => {
                        if (r && r.equipped && r.heat > 0 && !r.overheated) {
                            r.heat = Math.max(0, r.heat - coolAmt);
                            cooled = true;
                            const botEl = document.getElementById('live-robot-' + r.id);
                            if (botEl) {
                                const bRect = botEl.getBoundingClientRect();
                                generateDamagePopup({clientX: bRect.left + bRect.width/2, clientY: bRect.top}, "-" + coolAmt + " HEAT", false, true, false);
                            }
                        }
                    });
                }
                if (cooled) {
                    if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
                }`;

if (appV2.includes(howardAttack) && !appV2.includes('coolAmt')) {
    appV2 = appV2.replace(howardAttack, howardReplacement);
    console.log('Patched Howard cooldown');
}

// 4. Overheat repair logic in handleRobotTap? Or modal?
// It was at app.js:3208. Let's find "overheated = false" in app.js and figure out where it belongs.

fs.writeFileSync('app_v2_temp.js', appV2);
console.log('app_v2_temp.js written');
