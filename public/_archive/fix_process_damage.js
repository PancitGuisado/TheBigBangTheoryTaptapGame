const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const regex = /let currentCritChance = rageDuration > 0 \? 0\.60 : 0\.12;[\s\S]*?(?=void enemyFrame\.offsetWidth;)/;

const newBlock = `let currentCritChance = typeof rageDuration !== 'undefined' && rageDuration > 0 ? 0.60 : 0.12; 
    if (Math.random() < currentCritChance && attackerKey !== 'penny') {
        finalDmg *= 2;
        isCrit = true;
    }

    currentEnemy.hp -= finalDmg;
    state.score += Math.floor(finalDmg);
    
    // ENEMY COUNTER-ATTACK: Enemies now damage characters back
    // Fixed: Enemy damage now scales purely with wave level, rather than being compounded by their massive maxHp
    let enemyCounterDmg = Math.floor(5 * Math.pow(1.18, state.wave - 1));
    applyEnemyCounter(enemyCounterDmg);
    
    const arena = document.getElementById('arena');
    const enemyFrame = document.getElementById('enemy-graphic-frame');
    if (enemyFrame) {
        enemyFrame.classList.remove('enemy-hurt');
        `;

app = app.replace(regex, newBlock);
fs.writeFileSync('app.js', app);
console.log("Fixed processDamage and nerfed enemy damage scaling");
