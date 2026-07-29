const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `        gameTimers[key] = setInterval(() => {
            triggerUniqueVisuals(key);
            
            }
        }, rate);`;

const correctCode = `        gameTimers[key] = setInterval(() => {
            triggerUniqueVisuals(key);
            
            if (key === 'penny') {
                // Base 5 seconds (50 ticks) + 1 second (10 ticks) per level
                rageDuration = 50 + (state.roster[key].level * 10); 
                const arena = document.getElementById('arena');
                if (arena) arena.classList.add('rage-active-bg');
                startAutomationEngines(); 
            } else if (key === 'bernie') {
                const healAmt = (config.basePassiveAmount || 20) * state.roster[key].level;
                let healed = false;
                Object.keys(state.equipped).forEach(charKey => {
                    if (state.equipped[charKey]) {
                        const charData = state.roster[charKey];
                        const charConfig = characters[charKey];
                        const maxHp = charData.maxHp || Math.floor((charConfig.baseHp || 100) * Math.pow(1.25, charData.level - 1));
                        
                        if (charData && charData.status !== 'hospitalized' && charData.currentHp < maxHp) {
                            charData.currentHp = Math.min(maxHp, charData.currentHp + healAmt);
                            healed = true;
                            const charEl = document.getElementById('live-character-' + charKey);
                            if (charEl) {
                                const cRect = charEl.getBoundingClientRect();
                                generateDamagePopup({clientX: cRect.left + cRect.width/2, clientY: cRect.top}, "+" + healAmt, false, true, false);
                            }
                        }
                    }
                });
                if (healed) {
                    if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
                }
            } else if (key === 'howard') {
                let outDmg = config.baseDmg * state.roster[key].level;
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
                }
            } else if (key === 'amy') {
                // Damage is handled dynamically by the summoned monkey inside triggerUniqueVisuals
            } else {
                let outDmg = config.baseDmg * state.roster[key].level;
                if (key === 'sheldon') outDmg = Math.floor(outDmg * (1 + sheldonTapBuff));
                processDamage(outDmg, key);
            }
        }, rate);`;

app = app.replace(targetStr, correctCode);
fs.writeFileSync('app.js', app);
console.log("Restored startAutomationEngines successfully");
