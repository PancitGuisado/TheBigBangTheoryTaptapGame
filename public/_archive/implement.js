const fs = require('fs');

// 1. Update config.js
let config = fs.readFileSync('config.js', 'utf8');
const oldRobotsStart = "const robots = {";
const oldRobotsEnd = "// FOOD SYSTEM:";
const startIdx = config.indexOf(oldRobotsStart);
const endIdx = config.indexOf(oldRobotsEnd);

const newRobots = `const robots = {
    // TBBT Lore Bots
    r2d2_unit: { name: "Shelbot (MVPD)", desc: "Sheldon's Mobile Virtual Presence Device. Keeps you safe in your room.", baseDmg: 8, atkSpeed: 1400, lane: "mid", type: "flying", craftTime: 300000, baseHeat: 200, cost: { stone: 20, iron: 15, scrap: 10 } },
    battle_droid: { name: "M.O.N.T.E.", desc: "Leonard and Howard's killer robot. Armed with a circular saw.", baseDmg: 6, atkSpeed: 1600, lane: "front", type: "land", craftTime: 420000, baseHeat: 800, cost: { stone: 30, iron: 25, gold: 10, scrap: 15 } },
    droideka: { name: "Kripke Krippler", desc: "Barry Kripke's devastating combat robot with a spinning blade.", baseDmg: 4, atkSpeed: 2000, lane: "front", type: "land", craftTime: 600000, baseHeat: 900, cost: { stone: 40, iron: 35, gold: 20, diamond: 5, scrap: 25 } },
    
    omac_unit: { name: "Wolowitz Robotic Arm", desc: "Howard's zero-g robotic arm. Great for 'massage' damage.", baseDmg: 6, atkSpeed: 1800, lane: "front", type: "land", craftTime: 480000, baseHeat: 850, cost: { stone: 35, iron: 25, gold: 12, scrap: 18 } },
    cyborg_support: { name: "Mars Rover", desc: "Howard's Mars Rover. Don't get it stuck in a ditch!", baseDmg: 10, atkSpeed: 2200, lane: "back", type: "land", craftTime: 360000, baseHeat: 150, cost: { stone: 25, iron: 20, gold: 5, scrap: 12 } },
    apokolips_destroyer: { name: "Wallowitz Hoverbot", desc: "Howard's hovering drone camera. Spies and shoots.", baseDmg: 28, atkSpeed: 2400, lane: "back", type: "flying", craftTime: 7200000, baseHeat: 180, cost: { stone: 80, iron: 60, gold: 40, diamond: 15, scrap: 45 } },
    
    atom_boxer: { name: "Time Machine Replica", desc: "It doesn't go to the future, but it hits hard in the present.", baseDmg: 5, atkSpeed: 1200, lane: "front", type: "land", craftTime: 420000, baseHeat: 1000, cost: { stone: 28, iron: 22, gold: 8, scrap: 15 } },
    zeus_titan: { name: "Giant Jenga Bot", desc: "Massive blocky robot that crushes enemies slowly.", baseDmg: 10, atkSpeed: 2800, lane: "front", type: "land", craftTime: 900000, baseHeat: 1200, cost: { stone: 70, iron: 55, gold: 30, diamond: 10, scrap: 35 } },
    midas_speedster: { name: "Toy Train Engine", desc: "Sheldon's favorite O-gauge locomotive, weaponized.", baseDmg: 14, atkSpeed: 1100, lane: "mid", type: "flying", craftTime: 540000, baseHeat: 250, cost: { stone: 45, iron: 35, gold: 25, diamond: 6, scrap: 20 } },
    roomba_doom: { name: "Roomba of Doom", desc: "A heavily modified cleaning robot. Mostly bumps into shins.", baseDmg: 2, atkSpeed: 1000, lane: "front", type: "land", craftTime: 120000, baseHeat: 600, cost: { stone: 15, iron: 5, scrap: 5 } },
    quantum_drone: { name: "Quantum Drone", desc: "Hovering drone powered by theoretical entanglement.", baseDmg: 50, atkSpeed: 900, lane: "back", type: "flying", craftTime: 1200000, baseHeat: 100, cost: { iron: 100, gold: 50, diamond: 25, scrap: 50 } }
};

`;
config = config.substring(0, startIdx) + newRobots + config.substring(endIdx);
fs.writeFileSync('config.js', config);

// 2. Update app.js
let app = fs.readFileSync('app.js', 'utf8');

// A. Replace applyEnemyCounter completely
const aecStart = app.indexOf('function applyEnemyCounter(damageAmount) {');
const aecEnd = app.indexOf('// HOSPITAL SYSTEM: Send injured character to hospital');
const newAec = `function applyEnemyCounter(damageAmount) {
    if (!state.bossAttackCounter) state.bossAttackCounter = 0;
    
    // Check if current enemy is a boss
    let isBoss = false;
    if (typeof bossTypes !== 'undefined' && currentEnemy && currentEnemy.key) {
        isBoss = bossTypes.some(b => b.key === currentEnemy.key);
    }
    
    let isGlobalStrike = false;
    let isStun = false;

    if (isBoss) {
        state.bossAttackCounter++;
        if (state.bossAttackCounter % 3 === 0) {
            const bKey = currentEnemy.key;
            const isDragonOrDnd = bKey === 'dnd_boss' || bKey === 'red_dragon';
            const isHealBoss = bKey === 'xenomorph_queen' || bKey === 'scifi_mech' || bKey === 'gorn' || bKey === 'demogorgon' || bKey === 'minotaur' || bKey === 'broken_elevator';
            
            if (isHealBoss) {
                const healAmt = Math.floor(currentEnemy.maxHp * 0.15);
                currentEnemy.hp = Math.min(currentEnemy.maxHp, currentEnemy.hp + healAmt);
                generateDamagePopup({clientX: window.innerWidth/2 + 100, clientY: window.innerHeight/3}, "+" + healAmt, false, true, false);
            } else if (isDragonOrDnd) {
                isGlobalStrike = true;
                generateDamagePopup({clientX: window.innerWidth/2, clientY: window.innerHeight/3}, "GLOBAL STRIKE!", false, true, true);
            } else {
                isStun = true;
                generateDamagePopup({clientX: window.innerWidth/2, clientY: window.innerHeight/3}, "STUN STRIKE!", false, true, true);
            }
        }
    }

    let front = [], mid = [], back = [];
    
    const activeChars = Object.keys(state.equipped).filter(key => state.equipped[key] && state.roster[key].level > 0 && state.roster[key].status !== 'hospitalized');
    activeChars.forEach(key => {
        const lane = characters[key].lane;
        if (lane === 'front') front.push({type: 'char', key});
        else if (lane === 'mid') mid.push({type: 'char', key});
        else back.push({type: 'char', key});
    });
    
    if (state.robots) {
        state.robots.forEach((robot, idx) => {
            if (robot && robot.equipped && !robot.overheated) {
                if (robot.lane === 'front') front.push({type: 'bot', idx});
                else if (robot.lane === 'mid') mid.push({type: 'bot', idx});
                else back.push({type: 'bot', idx});
            }
        });
    }
    
    let targetPool = [];
    if (isGlobalStrike) {
        targetPool = [...front, ...mid, ...back];
    } else {
        if (front.length > 0) targetPool = front;
        else if (mid.length > 0) targetPool = mid;
        else if (back.length > 0) targetPool = back;
    }
    
    if (targetPool.length === 0) return;
    
    if (isStun) {
        const charTargets = targetPool.filter(t => t.type === 'char');
        if (charTargets.length > 0) {
            const highestDpsChar = charTargets.sort((a,b) => {
                const dpsA = characters[a.key].baseDmg * state.roster[a.key].level;
                const dpsB = characters[b.key].baseDmg * state.roster[b.key].level;
                return dpsB - dpsA;
            })[0];
            state.roster[highestDpsChar.key].stunnedUntil = Date.now() + 5000;
        }
    }
    
    const damagePerTarget = Math.ceil(damageAmount / targetPool.length);
    let renderRobotsNeeded = false;
    
    targetPool.forEach(target => {
        if (target.type === 'char') {
            const charKey = target.key;
            const charData = state.roster[charKey];
            const config = characters[charKey];
            const maxHp = charData.maxHp || Math.floor((config.baseHp || 100) * Math.pow(1.25, charData.level - 1));
            if (typeof charData.currentHp === 'undefined' || isNaN(charData.currentHp)) {
                charData.currentHp = maxHp;
                charData.maxHp = maxHp;
            }
            charData.currentHp -= damagePerTarget;
            
            const charEl = document.getElementById('live-character-' + charKey);
            if (charEl) {
                const rect = charEl.getBoundingClientRect();
                generateDamagePopup({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, damagePerTarget, false, false, true);
            }
            if (charData.currentHp <= 0) sendToHospital(charKey);
        } else if (target.type === 'bot') {
            const bot = state.robots[target.idx];
            const maxHeat = bot.maxHeat || (robots[bot.blueprintId].baseHeat || 200) * bot.level;
            if (typeof bot.heat === 'undefined' || isNaN(bot.heat)) {
                bot.heat = 0;
                bot.maxHeat = maxHeat;
            }
            bot.heat += damagePerTarget;
            renderRobotsNeeded = true;
            
            const botEl = document.getElementById('live-robot-' + bot.id);
            if (botEl) {
                const rect = botEl.getBoundingClientRect();
                generateDamagePopup({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, damagePerTarget, false, false, true);
            }
            if (bot.heat >= bot.maxHeat) {
                bot.overheated = true;
                bot.heat = bot.maxHeat; // clamp
            }
        }
    });
    
    renderActiveBattleLine();
    if (renderRobotsNeeded && typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
}

`;
app = app.substring(0, aecStart) + newAec + app.substring(aecEnd);


// B. Update startRobotAutomation to add heat when attacking
const rTimerTarget = `window.robotTimers[robot.id] = setInterval(() => {`;
const rTimerReplacement = `window.robotTimers[robot.id] = setInterval(() => {
            if (robot.overheated) return; // Cannot attack if overheated
            if (typeof robot.heat === 'undefined' || isNaN(robot.heat)) robot.heat = 0;
            if (typeof robot.maxHeat === 'undefined' || isNaN(robot.maxHeat)) robot.maxHeat = (config.baseHeat || 200) * robot.level;
            
            // Add attacking heat
            robot.heat += Math.max(1, Math.floor(robot.maxHeat * 0.05)); // Add 5% heat per attack
            if (robot.heat >= robot.maxHeat) {
                robot.heat = robot.maxHeat;
                robot.overheated = true;
                if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
            }`;

app = app.replace(rTimerTarget, rTimerReplacement);


// C. Update renderRobotBattleLine
// We need to inject heatBarHtml and smokeHtml
const rrblStart = app.indexOf('function renderRobotBattleLine() {');
const rrblEnd = app.indexOf('function startRobotAutomation() {');
let rrblSection = app.substring(rrblStart, rrblEnd);

const botInnerHtmlTarget = `<div class="character-vector-wrapper flex items-center justify-center text-4xl" style="transform: scale(\${lore.scale}); transform-origin: bottom center;">\${svg}</div>`;
const botInnerHtmlReplacement = `
                    \${(() => {
                        const maxH = robot.maxHeat || (config.baseHeat || 200) * robot.level;
                        const curH = robot.heat || 0;
                        const hpPct = Math.max(0, Math.min(100, (curH / maxH) * 100)) || 0;
                        const hpBarHtml = \`
                            <div class="absolute -top-3 left-0 right-0 h-1.5 bg-gray-900 border border-gray-700 rounded-sm overflow-hidden z-40 opacity-90 shadow-[0_0_5px_rgba(255,100,0,0.5)] pointer-events-none">
                                <div class="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300" style="width: \${hpPct}%"></div>
                            </div>
                        \`;
                        const smokeHtml = robot.overheated ? \`<div class="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-50 pointer-events-none">??</div><div class="absolute -top-6 text-red-500 font-bold text-[8px] bg-black/80 px-1 rounded z-50">OVERHEATED</div>\` : '';
                        return hpBarHtml + smokeHtml;
                    })()}
                    <div class="character-vector-wrapper flex items-center justify-center text-4xl \${robot.overheated ? 'grayscale brightness-50 sepia blur-[1px]' : ''}" style="transform: scale(\${lore.scale}); transform-origin: bottom center;">\${svg}</div>`;

rrblSection = rrblSection.replace(botInnerHtmlTarget, botInnerHtmlReplacement);
app = app.substring(0, rrblStart) + rrblSection + app.substring(rrblEnd);


// D. Add Repair Button to openRobotModal
const rModalEquipTarget = `equipRowHtml = \`
                <button onclick="executeRobotUnequip('\${key}')" class="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded border border-red-700 shadow-sm mb-2">
                    ?? UNEQUIP BOT
                </button>
            \`;`;
const rModalEquipReplacement = `equipRowHtml = \`
                <button onclick="executeRobotUnequip('\${key}')" class="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded border border-red-700 shadow-sm mb-2">
                    ?? UNEQUIP BOT
                </button>
            \`;
            
            const theRobot = state.robots.find(r => r.blueprintId === key && r.equipped);
            if (theRobot && theRobot.overheated) {
                const repairCost = 10 * Math.pow(2, data.level - 1);
                const canRepair = state.resources.scrap >= repairCost;
                equipRowHtml += \`
                    <button onclick="executeRobotRepair('\${key}')" \${!canRepair ? 'disabled' : ''} class="w-full \${canRepair ? 'bg-amber-600 hover:bg-amber-500' : 'bg-gray-800 text-gray-500 cursor-not-allowed'} text-white font-bold py-2.5 text-[10px] uppercase tracking-wider rounded border border-amber-700 shadow-sm mb-2">
                        ?? REPAIR BOT (\${repairCost} SCRAP)
                    </button>
                \`;
            }`;

app = app.replace(rModalEquipTarget, rModalEquipReplacement);


// E. Add executeRobotRepair function
app += `\nwindow.executeRobotRepair = function(key) {
    const data = state.robotRoster[key];
    const repairCost = 10 * Math.pow(2, data.level - 1);
    if (state.resources.scrap >= repairCost) {
        state.resources.scrap -= repairCost;
        const theRobot = state.robots.find(r => r.blueprintId === key && r.equipped);
        if (theRobot) {
            theRobot.overheated = false;
            theRobot.heat = 0;
            saveProgress();
            if (typeof syncUI === 'function') syncUI();
            if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
            if (typeof openRobotModal === 'function') openRobotModal(null, key);
        }
    }
};\n`;


fs.writeFileSync('app.js', app);
console.log("Success! Full implementation done.");
