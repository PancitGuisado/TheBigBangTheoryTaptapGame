const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const bernieOld = `            } else if (key === 'bernie') {
                // Bernie now does BIG damage instead of healing
                let bigDmg = config.baseDmg * state.roster[key].level * 3.5;
                processDamage(bigDmg, key);
            } else if (key === 'amy') {`;

const bernieNew = `            } else if (key === 'bernie') {
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
            } else if (key === 'amy') {`;

app = app.replace(bernieOld, bernieNew);
fs.writeFileSync('app.js', app);
console.log("Fixed bernie and howard logic");
