const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// `processDamage` was mangled. Let's find exactly where it was mangled.
// The code right now in app.js around line 495:
//         if (amount > 0) {
//             state.resources[resource] = (state.resources[resource] || 0) + amount;
//         }
//         const simulatedEvent = {
//             clientX: targetBox.left + (targetBox.width / 2) + (Math.random() - 0.5) * 40,

const mangledStart = `        if (amount > 0) {
            state.resources[resource] = (state.resources[resource] || 0) + amount;
        }
        const simulatedEvent = {`;

const correctCode = `        if (amount > 0) {
            state.resources[resource] = (state.resources[resource] || 0) + amount;
        }
    }
}

function processDamage(amt, attackerKey) {
    let finalDmg = amt;
    let isCrit = false;

    let currentCritChance = rageDuration > 0 ? 0.60 : 0.12; 
    if (Math.random() < currentCritChance && attackerKey !== 'penny') {
        finalDmg *= 2;
        isCrit = true;
    }

    currentEnemy.hp -= finalDmg;
    state.score += Math.floor(finalDmg);
    
    // ENEMY COUNTER-ATTACK: Disabled
    // let enemyCounterDmg = Math.floor((currentEnemy.maxHp / 20) * (state.wave * 0.5));
    // applyEnemyCounter(enemyCounterDmg);
    
    const arena = document.getElementById('arena');
    const enemyFrame = document.getElementById('enemy-graphic-frame');
    if (enemyFrame) {
        enemyFrame.classList.remove('enemy-hurt');
        void enemyFrame.offsetWidth; 
        enemyFrame.classList.add('enemy-hurt');
    }

    if (isCrit && arena) {
        arena.classList.remove('screen-shake-active');
        void arena.offsetWidth;
        arena.classList.add('screen-shake-active');
        setTimeout(() => arena.classList.remove('screen-shake-active'), 350);
    }

    const container = document.getElementById('enemy-container');
    if (container) {
        const targetBox = container.getBoundingClientRect();
        const simulatedEvent = {`;

if (app.includes(mangledStart)) {
    app = app.replace(mangledStart, correctCode);
    fs.writeFileSync('app.js', app);
    console.log("Fixed processDamage successfully!");
} else {
    console.log("Could not find mangled start!");
}
