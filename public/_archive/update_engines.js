const fs = require('fs');
const filePath = 'c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js';
let txt = fs.readFileSync(filePath, 'utf8');

// Replace startAutomationEngines
const regexEngines = /function startAutomationEngines\(\) \{[\s\S]*?(?=\n\nfunction|\nfunction \w+\(\))/;

const newEngines = `function startAutomationEngines() {
    Object.values(gameTimers).forEach(clearInterval);
    gameTimers = {};

    for (const [key, config] of Object.entries(characters)) {
        if (!state.roster[key] || !state.equipped[key]) continue;

        let rate = config.atkSpeed;
        if (typeof rageDuration !== 'undefined' && rageDuration > 0) rate *= 0.45; 
        const speedMult = typeof getSpeedMultiplier === 'function' ? getSpeedMultiplier() : 1;
        rate = Math.floor(rate / speedMult);

        // Leslie attacks slower
        if (config.passiveType === 'backlineCrit') rate *= 1.5;

        gameTimers[key] = setInterval(() => {
            if (!state.equipped[key] || !state.roster[key] || state.roster[key].status === 'hospitalized' || state.roster[key].currentHp <= 0) return;
            if (state.roster[key].stunnedUntil && Date.now() < state.roster[key].stunnedUntil) return;
            triggerUniqueVisuals(key);
            
            let outDmg = config.baseDmg * state.roster[key].level;
            if (state.roster[key].talents && state.roster[key].talents.dmg) {
                outDmg = Math.floor(outDmg * (1 + (state.roster[key].talents.dmg * 0.10)));
            }

            const pType = config.passiveType;

            // Damage execution based on passive
            if (pType === 'critSplash' || pType === 'critAoe' || pType === 'jumpCrit') {
                processDamage(outDmg, key, true); // Force Crit
            } else if (pType === 'backlineCrit' || pType === 'critTank') {
                if (Math.random() < 0.5) processDamage(outDmg, key, true); // High crit chance
                else processDamage(outDmg, key);
            } else if (pType === 'lifesteal') {
                processDamage(outDmg, key, false, config.basePassiveAmount || 0.4);
            } else if (pType === 'sunRay' || pType === 'poisonAoe') {
                processDamage(outDmg, key);
                // Apply DOT
                if (!currentEnemy.dots) currentEnemy.dots = [];
                currentEnemy.dots.push({ dmg: Math.floor(outDmg * 0.2), ticks: config.basePassiveAmount || 4, source: key });
            } else if (pType === 'slowStun') {
                processDamage(outDmg, key);
                if (Math.random() < 0.2 && currentEnemy) {
                    currentEnemy.stunnedUntil = Date.now() + 2000;
                    generateDamagePopup({clientX: window.innerWidth/2, clientY: window.innerHeight/2}, "STUNNED!", false, true, false);
                }
            } else if (outDmg > 0) {
                processDamage(outDmg, key);
            }

            // Supportive passives
            if (pType === 'rage') {
                rageDuration = 50 + (state.roster[key].level * 10); 
                const arena = document.getElementById('arena');
                if (arena) arena.classList.add('rage-active-bg');
                startAutomationEngines(); 
            } else if (pType === 'selfHeal') {
                const healAmt = Math.floor(state.roster[key].maxHp * (config.basePassiveAmount || 0.1));
                if (state.roster[key].currentHp < state.roster[key].maxHp) {
                    state.roster[key].currentHp = Math.min(state.roster[key].maxHp, state.roster[key].currentHp + healAmt);
                    const el = document.getElementById('live-character-' + key);
                    if (el) generateDamagePopup({clientX: el.getBoundingClientRect().left, clientY: el.getBoundingClientRect().top}, "+" + healAmt, false, true, false);
                    if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
                }
            } else if (pType === 'coolDown') {
                const coolAmt = (config.basePassiveAmount || 10) * state.roster[key].level;
                let cooled = false;
                if (state.robots) {
                    state.robots.forEach(r => {
                        if (r && r.equipped && r.heat > 0) {
                            r.heat = Math.max(0, r.heat - coolAmt);
                            if (r.overheated && r.heat < r.maxHeat * 0.8) r.overheated = false;
                            cooled = true;
                        }
                    });
                }
                if (cooled && typeof updateRobotHeatBars === 'function') updateRobotHeatBars();
            } else if (pType === 'healScaling' || pType === 'healLoot') {
                const healAmt = (config.basePassiveAmount || 5) + (state.roster[key].level * 2);
                let healed = false;
                Object.keys(state.equipped).forEach(charKey => {
                    if (state.equipped[charKey] && state.roster[charKey] && state.roster[charKey].status !== 'hospitalized') {
                        const mhp = state.roster[charKey].maxHp || 100;
                        if (state.roster[charKey].currentHp < mhp) {
                            state.roster[charKey].currentHp = Math.min(mhp, state.roster[charKey].currentHp + healAmt);
                            healed = true;
                        }
                    }
                });
                if (healed && typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
            }
        }, rate);
    }
}`;

txt = txt.replace(regexEngines, newEngines);
fs.writeFileSync(filePath, txt, 'utf8');
console.log('Updated startAutomationEngines in app_v2.js');
