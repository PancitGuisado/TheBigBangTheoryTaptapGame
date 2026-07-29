const fs = require('fs');

// 1. Update config.js
let config = fs.readFileSync('config.js', 'utf8');
const howardTarget = `howard: { name: "Howard", desc: "Shoots rocket missiles as a techy cyborg.", baseDmg: 20, baseHp: 120, atkSpeed: 2000, cost: { money: 400 }, lane: "mid" },`;
const howardReplace = `howard: { name: "Howard", desc: "Shoots rocket missiles as a techy cyborg.", baseDmg: 20, baseHp: 120, atkSpeed: 2000, cost: { money: 400 }, lane: "mid", passiveType: 'coolDown', basePassiveAmount: 10 },`;
config = config.replace(howardTarget, howardReplace);
fs.writeFileSync('config.js', config);

// 2. Update app.js
let app = fs.readFileSync('app.js', 'utf8');

// Replace Bernie & add Howard logic in startAutomationEngines
const bernieLogicTarget = `} else if (key === 'bernie') {
                // Bernie now does BIG damage instead of healing
                let bigDmg = config.baseDmg * state.roster[key].level * 3.5;
                processDamage(bigDmg, key);
            } else if (key === 'amy') {`;

const bernieLogicReplace = `} else if (key === 'bernie') {
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

app = app.replace(bernieLogicTarget, bernieLogicReplace);

// Update Bernie visual
const bernieVisualTarget = `case 'bernie':
            fx.className = 'unique-fx bernie-soundwave';
            fx.style.top = \`\${rect.top - arenaRect.top + 20}px\`;
            arena.appendChild(fx);
            removalDelay = 500;
            break;`;

const bernieVisualReplace = `case 'bernie':
            fx.className = 'unique-fx bernie-heal-pulse';
            fx.style.left = \`25%\`; 
            fx.style.top = \`60%\`;
            fx.innerHTML = \`
                <div class="absolute inset-0 bg-green-500/20 animate-ping rounded-full blur-xl w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"></div>
                <div class="absolute text-green-400 text-6xl animate-bounce -translate-x-1/2 -translate-y-1/2 z-50 drop-shadow-[0_0_15px_rgba(74,222,128,1)]">?</div>
            \`;
            arena.appendChild(fx);
            removalDelay = 1000;
            break;`;

app = app.replace(bernieVisualTarget, bernieVisualReplace);

// Update passiveType UI formatting for 'coolDown'
const uiPassiveTarget = `} else if (config.passiveType === 'poison') {`;
const uiPassiveReplace = `} else if (config.passiveType === 'coolDown') {
                cPass = config.basePassiveAmount * currLvl;
                nPass = config.basePassiveAmount * nextLvl;
                unit = ' HEAT';
            } else if (config.passiveType === 'poison') {`;

app = app.replace(uiPassiveTarget, uiPassiveReplace);

fs.writeFileSync('app.js', app);
console.log("Success! Applied Howard and Bernie passive modifications.");
