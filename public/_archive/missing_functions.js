function triggerBossFight(event) {
    if(event) event.stopPropagation();
    isBossActive = true;
    spawnEnemy();
    
    bossTimer = 20.0;
    const timerDisplay = document.getElementById('boss-timer-display');
    if (timerDisplay) timerDisplay.innerText = `⏱️ ${bossTimer.toFixed(1)}s`;
    
    clearInterval(bossTimerId);
    bossTimerId = setInterval(() => {
        bossTimer -= 0.1;
        if (bossTimer <= 0) {
            bossTimer = 0;
            failBossFight();
        }
        if (timerDisplay) timerDisplay.innerText = `⏱️ ${bossTimer.toFixed(1)}s`;
    }, 100);
}

function failBossFight() {
    clearInterval(bossTimerId);
    isBossActive = false;
    
    const container = document.getElementById('enemy-container');
    if (container) {
        const targetBox = container.getBoundingClientRect();
        generateDamagePopup({
            clientX: targetBox.left + (targetBox.width / 2),
            clientY: targetBox.top + (targetBox.height / 2)
        }, "TIME UP!", false, true);
    }
    
    spawnEnemy();
}

function handleArenaTap(event) {
    if (event.target.closest('button') || event.target.closest('#shop-modal') || event.target.closest('#action-modal')) {
        return;
    }

    sheldonTapBuff = Math.min(3.0, sheldonTapBuff + 0.25);
    updateSheldonBuffBadge();

    const sheldonLvl = state.roster.sheldon ? state.roster.sheldon.level : 1;
    const sheldonPower = state.equipped['sheldon'] ? (characters.sheldon.baseDmg * sheldonLvl) : 1;
    const tapDamage = Math.floor(sheldonPower * (1 + sheldonTapBuff));

    if (state.equipped['sheldon']) {
        triggerUniqueVisuals('sheldon');
    }
    processDamage(tapDamage, 'sheldon');
}

function updateSheldonBuffBadge() {
    const badge = document.getElementById('sheldon-buff-badge');
    const sheldonSprite = document.getElementById('live-character-sheldon');
    if (!badge) return;

    if (sheldonTapBuff > 0 && state.equipped['sheldon']) {
        badge.innerText = `+${Math.floor(sheldonTapBuff * 100)}% FOCUS`;
        badge.classList.remove('hidden');
        if (sheldonSprite) sheldonSprite.classList.add('sheldon-surging');
    } else {
        badge.classList.add('hidden');
        if (sheldonSprite) sheldonSprite.classList.remove('sheldon-surging');
    }
}

function dropResources(isFromBoss) {
    const dropTable = isFromBoss ? resourceDrops.boss : resourceDrops.minion;
    
    for (const [resource, range] of Object.entries(dropTable)) {
        const amount = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        if (amount > 0) {
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
    
    // ENEMY COUNTER-ATTACK: Enemies now damage characters back
    let enemyCounterDmg = Math.floor((currentEnemy.maxHp / 20) * (state.wave * 0.5));
    applyEnemyCounter(enemyCounterDmg);
    
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
        const simulatedEvent = {
            clientX: targetBox.left + (targetBox.width / 2) + (Math.random() - 0.5) * 40,
            clientY: targetBox.top + (targetBox.height / 3) + (Math.random() - 0.5) * 40
        };
        generateDamagePopup(simulatedEvent, finalDmg, isCrit, false);
        generateImpactSparks(simulatedEvent);
    }

    if (currentEnemy.hp <= 0) {
        if (isBossActive) {
            // BOSS DEFEATED: Advance to the next wave and grant a massive reward
            clearInterval(bossTimerId);
            isBossActive = false;
            let reward = Math.floor(60 * Math.pow(1.25, state.wave - 1));
            state.resources.money += reward;
            dropResources(true);
            
            state.wave++; // The ONLY place the wave advances now
            
            spawnEnemy();
        } else {
            // MINION DEFEATED: Stay on the same wave, grant smaller farming reward
            let reward = Math.floor(8 * Math.pow(1.15, state.wave - 1));
            state.resources.money += reward;
            dropResources(false);
            
            // Notice state.wave++ is removed from here
            spawnEnemy();
        }
    }
    syncUI();
}

function generateImpactSparks(event) {
    const arena = document.getElementById('arena');
    if (!arena) return;
    const arenaRect = arena.getBoundingClientRect();
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'impact-spark';
        spark.style.left = `${event.clientX - arenaRect.left}px`;
        spark.style.top = `${event.clientY - arenaRect.top}px`;

        const angle = Math.random() * Math.PI * 2;
        const velocity = 30 + Math.random() * 60;
        const xTarget = Math.cos(angle) * velocity;
        const yTarget = Math.sin(angle) * velocity;

        spark.style.setProperty('--x', `${xTarget}px`);
        spark.style.setProperty('--y', `${yTarget}px`);

        arena.appendChild(spark);
        setTimeout(() => spark.remove(), 500);
    }
}

// ENEMY COUNTER-ATTACK: Apply damage to all active characters
function applyEnemyCounter(damageAmount) {
    const activeChars = Object.keys(state.equipped).filter(key => state.equipped[key] && state.roster[key].level > 0);
    if (activeChars.length === 0) return;
    
    // Distribute damage across all active characters
    const damagePerChar = Math.ceil(damageAmount / activeChars.length);
    
    activeChars.forEach(charKey => {
        const charData = state.roster[charKey];
        charData.currentHp -= damagePerChar;
        
        // Check if character should be hospitalized
        if (charData.currentHp <= 0) {
            sendToHospital(charKey);
        }
    });
}

// HOSPITAL SYSTEM: Send injured character to hospital
function sendToHospital(charKey) {
    const charData = state.roster[charKey];
    charData.currentHp = 0;
    charData.status = 'hospitalized';
    charData.hospitalEndTime = Date.now() + (300000); // 5 minute default recovery
    
    // Remove from active combat
    state.equipped[charKey] = false;
    
    if (!state.hospitalized.includes(charKey)) {
        state.hospitalized.push(charKey);
    }
    
    console.log(`${charKey} has been hospitalized! Recovery time: 5 minutes`);
}

// UPDATE HOSPITAL RECOVERIES: Check if any hospitalized characters can be released
function updateHospitalRecoveries() {
    const now = Date.now();
    const recovered = [];
    
    state.hospitalized.forEach(charKey => {
        const charData = state.roster[charKey];
        if (now >= charData.hospitalEndTime) {
            charData.currentHp = charData.maxHp;
            charData.status = 'healthy';
            charData.hospitalEndTime = 0;
            recovered.push(charKey);
        }
    });
    
    // Remove recovered characters from hospital
    recovered.forEach(charKey => {
        const idx = state.hospitalized.indexOf(charKey);
        if (idx >= 0) state.hospitalized.splice(idx, 1);
    });
    
    if (recovered.length > 0) {
        console.log(`Characters recovered from hospital: ${recovered.join(', ')}`);
    }
}

// USE FOOD FOR RECOVERY: Instantly heal an injured character with food
function useFoodForRecovery(charKey, foodType) {
    const charData = state.roster[charKey];
    const foodConfig = foods[foodType];
    
    if (!foodConfig) {
        console.error(`Food type ${foodType} not found`);
        return false;
    }
    
    if (state.food[foodType] <= 0) {
        console.error(`No ${foodType} available`);
        return false;
    }
    
    charData.currentHp = Math.min(charData.currentHp + foodConfig.hpRestore, charData.maxHp);
    state.food[foodType]--;
    
    // If character is recovered, remove from hospital
    if (charData.status === 'hospitalized' && charData.currentHp >= charData.maxHp * 0.5) {
        charData.status = 'healthy';
        charData.hospitalEndTime = 0;
        const idx = state.hospitalized.indexOf(charKey);
        if (idx >= 0) state.hospitalized.splice(idx, 1);
    }
    
    console.log(`${charKey} used ${foodConfig.name} and recovered ${foodConfig.hpRestore} HP`);
    return true;
}

