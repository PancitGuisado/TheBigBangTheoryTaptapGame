// SOUND SYSTEM
const SoundManager = {
    audioObjects: {},
    bgmAudio: null,
    bgmStarted: false,
    volumes: {
        bgm: 0.2,
        scene: 0.6,
        character: 0.6
    },
    sounds: {
        'sheldon_click': 'sounds/sheldon_not_crazy.mp3',
        'sheldon_boss': 'sounds/sheldon_friendship.mp3',
        'sheldon_level': 'sounds/sheldon_scientist.mp3',
        'sheldon_laugh': 'sounds/sheldon_laugh.mp3',
        'sheldon_injured': 'sounds/sheldon_oh_god.mp3',
        'sheldon_equip': 'sounds/sheldon_my_spot.mp3',
        'sheldon_knock': 'sounds/sheldon_knock_penny.mp3',
        'sheldon_bluetooth': 'sounds/sheldon_bluetooth.mp3',
        'sheldon_honey': 'sounds/sheldon_honey.mp3',
        'penny_click': 'sounds/penny_ken_barbie.mp3',
        'howard_click': 'sounds/howard_sword_master.mp3',
        'leonard_click': 'sounds/leonard_click.mp3',
        'bernie_click': 'sounds/bernadette_howie.mp3',
        'bernie_maryann': 'sounds/bernadette_maryann.mp3',
        'amy_click': 'sounds/amy_excuse_me.mp3',
        'amy_maid': 'sounds/amy_maid_of_honor.mp3',
        'stuart_click': 'sounds/stuart_me_llamo.mp3',
        'raj_click': 'sounds/raj_english_accent.mp3',
        'hospital_heal': 'sounds/soft_kitty.mp3',
        'shelbot': 'sounds/shelbot.wav',
        'bot_step': 'sounds/bot_step.wav',
        'bot_ambience': 'sounds/bot_ambience.wav',
        'bot_glitch': 'sounds/bot_glitch.wav'
    },
    init() {
        // Load saved volume preferences
        const savedVols = localStorage.getItem('tbbt_audio_settings');
        if (savedVols) {
            try {
                this.volumes = { ...this.volumes, ...JSON.parse(savedVols) };
            } catch(e) {}
        }
        
        for (const [key, path] of Object.entries(this.sounds)) {
            const audio = new Audio(path);
            this.audioObjects[key] = audio;
        }
        
        // Initialize Background Music
        this.bgmAudio = new Audio('theme.mp3');
        this.bgmAudio.loop = true;
        this.applyVolumes();
    },
    applyVolumes() {
        if (this.bgmAudio) this.bgmAudio.volume = this.volumes.bgm;
    },
    startBGM() {
        if (!this.bgmStarted && this.bgmAudio) {
            this.bgmStarted = true;
            this.bgmAudio.play().catch(e => {
                console.log('BGM play blocked by browser', e);
                this.bgmStarted = false; // Allow retry on next click
            });
        }
    },
    play(key) {
        if (this.audioObjects[key]) {
            const clone = this.audioObjects[key].cloneNode();
            
            // Determine category
            if (key === 'hospital_heal') {
                clone.volume = this.volumes.scene;
            } else {
                clone.volume = this.volumes.character;
            }
            
            clone.play().catch(e => console.log('Audio play failed', e));
        }
    },
    audioCtx: null,
    lastFxTime: 0,
    playFX(type) {
        const nowMs = Date.now();
        if (nowMs - this.lastFxTime < 100) return; // 8 second cooldown to prevent spam
        this.lastFxTime = nowMs;

        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext();
        }
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        
        const vol = this.volumes.scene; // Use scene volume for battle fx
        if (vol <= 0) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        
        const now = this.audioCtx.currentTime;
        
        if (type === 'shoot') {
            // Retro laser "pew"
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
            gain.gain.setValueAtTime(vol * 1.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'slash') {
            // Melee "swoosh"
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.linearRampToValueAtTime(50, now + 0.15);
            gain.gain.setValueAtTime(0.01, now);
            gain.gain.linearRampToValueAtTime(vol * 1.5, now + 0.05);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        }
    },
    startAmbientLoop() {
        // Character Ambience Loop
        setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            
            const equippedChars = Object.keys(state.equipped || {}).filter(key => state.equipped[key] && (!state.roster[key] || state.roster[key].status !== 'hospitalized'));
            if (equippedChars.length === 0) return;
            
            const randomChar = equippedChars[Math.floor(Math.random() * equippedChars.length)];
            
            const ambientOptions = [];
            if (randomChar === 'sheldon') ambientOptions.push('sheldon_bluetooth', 'sheldon_honey', 'sheldon_knock');
            if (randomChar === 'bernie') ambientOptions.push('bernie_maryann', 'bernie_click');
            if (randomChar === 'amy') ambientOptions.push('amy_maid', 'amy_click');
            if (randomChar === 'raj') ambientOptions.push('raj_click');
            if (randomChar === 'stuart') ambientOptions.push('stuart_click');
            if (randomChar === 'leonard') ambientOptions.push('leonard_click');
            if (randomChar === 'penny') ambientOptions.push('penny_click');
            if (randomChar === 'howard') ambientOptions.push('howard_click');
            
            if (ambientOptions.length > 0) {
                const randomSound = ambientOptions[Math.floor(Math.random() * ambientOptions.length)];
                this.play(randomSound);
            }
        }, 30000 + Math.random() * 15000);

        // Bot Ambience Loop (plays every 8 seconds if bots are deployed)
        setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            if (!state.robots || state.robots.length === 0) return;
            
            const equippedBots = state.robots.filter(r => r.equipped);
            if (equippedBots.length === 0) return;

            const randomBot = equippedBots[Math.floor(Math.random() * equippedBots.length)];
            if (randomBot.blueprintId === 'r2d2_unit') {
                this.play('shelbot');
            } else {
                const botSounds = ['bot_step', 'bot_ambience', 'bot_glitch'];
                const randomSnd = botSounds[Math.floor(Math.random() * botSounds.length)];
                this.play(randomSnd);
            }
        }, 8000 + Math.random() * 4000); // ~8s to 12s interval
    }
};

// Master Engine Core Lifecycle & Events
function initGame() {
    if(SoundManager.init) { SoundManager.init(); SoundManager.startAmbientLoop(); }
    loadProgress();
    // Fallback: If legacy save files exist, migrate unlocked units to equipped by default up to limits
    migrateLegacySaves();
    spawnEnemy();
    renderActiveBattleLine();
    renderRobotBattleLine();
    renderCraftingQueue();
    syncUI();
    startAutomationEngines();
    startRobotAutomation();
    
    // Sheldon self-decay dynamic cycle
    setInterval(() => {
        if (sheldonTapBuff > 0) {
            sheldonTapBuff = Math.max(0, sheldonTapBuff - 0.04);
            updateSheldonBuffBadge();
        }
        if (rageDuration > 0) {
            rageDuration--;
            if (rageDuration === 0) {
                const arena = document.getElementById('arena');
                if (arena) arena.classList.remove('rage-active-bg');
                startAutomationEngines(); 
            }
        }
    }, 100);

    // Update crafting queue every 100ms
    setInterval(updateCraftingQueues, 100);
    
    // Update hospital recoveries every 1 second
    setInterval(updateHospitalRecoveries, 1000);

    setInterval(saveProgress, 5000);
}

// LOCATION SYSTEM: Switch to a different Pasadena location
function switchLocation(locationKey) {
    if (!locations[locationKey]) {
        console.error(`Location ${locationKey} not found`);
        return;
    }
    
    state.currentLocation = locationKey;
    const locationData = locations[locationKey];
    console.log(`Switched to ${locationData.name}`);
    
    // Reset enemy and spawn new one from location pool
    currentEnemy = { type: null, maxHp: 100, hp: 100 };
    spawnEnemy();
    syncUI();
}

// OPEN LOCATION MAP MODAL: Show all visitable locations
function openLocationMap() {
    const modal = document.getElementById('location-map-modal');
    if (!modal) {
        console.error('Location map modal not found');
        return;
    }
    
    modal.classList.remove('hidden');
    
    // Render location buttons in grid
    const grid = document.getElementById('location-grid');
    if (grid) {
        grid.innerHTML = '';
        for (const [locKey, locData] of Object.entries(locations)) {
            const btn = document.createElement('button');
            btn.className = 'location-btn px-4 py-3 rounded bg-blue-900 hover:bg-blue-800 border-2 border-blue-600 text-white font-bold text-sm w-full text-center transition';
            if (state.currentLocation === locKey) {
                btn.className += ' ring-2 ring-yellow-400';
            }
            btn.innerHTML = `
                <div>${locData.name}</div>
                <div class="text-xs text-gray-300">${locData.desc}</div>
                <div class="text-xs text-gray-400">Difficulty: Lv.${locData.minDifficulty}-${locData.maxDifficulty}</div>
            `;
            btn.onclick = () => switchLocation(locKey);
            grid.appendChild(btn);
        }
    }
}

// CLOSE LOCATION MAP MODAL
function closeLocationMap() {
    const modal = document.getElementById('location-map-modal');
    if (modal) modal.classList.add('hidden');
}

function migrateLegacySaves() {
    if (!state.equipped) {
        state.equipped = {};
        let backCount = 0;
        let frontCount = 0;
        for (const [key, config] of Object.entries(characters)) {
            if (state.roster[key] && state.roster[key].level > 0) {
                if (config.lane === 'front' && frontCount < 2) {
                    state.equipped[key] = true;
                    frontCount++;
                } else if ((config.lane === 'back' || config.lane === 'mid') && backCount < 3) {
                    state.equipped[key] = true;
                    backCount++;
                }
            }
        }
    }
}

function spawnEnemy() {
    const bossControls = document.getElementById('boss-controls');
    const btnFightBoss = document.getElementById('btn-fight-boss');
    const timerDisplay = document.getElementById('boss-timer-display');
    const locationInfo = document.getElementById('location-name-display');
    
    let chosenType;
    const currentLocationData = locations[state.currentLocation];

    if (bossControls) bossControls.classList.remove('hidden');
    
    // Display current location
    if (locationInfo && currentLocationData) {
        locationInfo.innerText = `📍 ${currentLocationData.name}`;
    }

    if (isBossActive) {
        // Boss Logic: Choose from location's boss pool, cycling by wave
        const bossPo = currentLocationData?.bossPool || bossTypes.map(b => b.key);
        const bossPoolKeys = bossPo.map(k => bossTypes.find(b => b.key === k)).filter(Boolean);
        const bossIndex = (state.wave - 1) % bossPoolKeys.length;
        chosenType = bossPoolKeys[bossIndex];
        
        if (btnFightBoss) btnFightBoss.classList.add('hidden');
        if (timerDisplay) timerDisplay.classList.remove('hidden');
        
        // Exponential Boss HP Scaling
        currentEnemy.maxHp = Math.floor(250 * chosenType.hpMultiplier * Math.pow(1.4, state.wave - 1));
    } else {
        // Minion Logic: Pick from location's minion pool randomly
        const minionPool = currentLocationData?.minionPool || minionTypes.map(m => m.key);
        const minionPoolObjects = minionPool.map(k => minionTypes.find(m => m.key === k)).filter(Boolean);
        chosenType = minionPoolObjects[Math.floor(Math.random() * minionPoolObjects.length)];
        
        if (btnFightBoss) btnFightBoss.classList.remove('hidden');
        if (timerDisplay) timerDisplay.classList.add('hidden');
        
        // Flatter Minion HP Scaling for easier farming
        currentEnemy.maxHp = Math.floor(40 * chosenType.hpMultiplier * Math.pow(1.2, state.wave - 1));
    }

    currentEnemy.type = chosenType;
    currentEnemy.hp = currentEnemy.maxHp;
    
    const enemyNameEl = document.getElementById('enemy-name');
    if (enemyNameEl) {
        enemyNameEl.innerText = isBossActive ? `WAVE ${state.wave} BOSS: ${chosenType.name}` : `Lv.${state.wave} ${chosenType.name}`;
    }
    
    // Update enemy type badge
    const enemyTypeBadge = document.getElementById('enemy-type-badge');
    if (enemyTypeBadge) {
        const typeLabel = isBossActive ? '⚔️ BOSS' : '👹 MINION';
        enemyTypeBadge.innerText = `${typeLabel}`;
    }
    
    // Update enemy level badge
    const enemyLevelBadge = document.getElementById('enemy-level-badge');
    if (enemyLevelBadge) {
        enemyLevelBadge.innerText = `LV: ${state.wave}`;
    }
    
    // Update damage info
    const enemyDmgInfo = document.getElementById('enemy-dmg-info');
    if (enemyDmgInfo) {
        const estimatedDmg = Math.floor(currentEnemy.maxHp / 20);
        enemyDmgInfo.innerText = `DMG: ${estimatedDmg}`;
    }
    
    // Fallback to a default vector shape if you haven't drawn the specific enemy yet
    const frame = document.getElementById('enemy-graphic-frame');
    if (frame) {
        frame.innerHTML = vectors[chosenType.key] || `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="gray"/></svg>`;
        frame.className = "";
        void frame.offsetWidth; // Trigger reflow to restart CSS animations
        frame.className = "enemy-spawn-in enemy-breathing";
    }
    
    updateEnemyHealthBar();
}

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

function updateEnemyHealthBar() {
    const bar = document.getElementById('enemy-hp-bar');
    const txt = document.getElementById('enemy-hp-text');
    const pct = Math.max(0, (currentEnemy.hp / currentEnemy.maxHp) * 100);
    if (bar) bar.style.width = pct + '%';
    if (txt) txt.innerText = `${Math.floor(currentEnemy.hp)}/${currentEnemy.maxHp} HP`;
}

function startAutomationEngines() {
    Object.values(gameTimers).forEach(clearInterval);
    gameTimers = {};

    for (const [key, config] of Object.entries(characters)) {
        if (!state.roster[key] || !state.equipped[key]) continue;

        let rate = config.atkSpeed;
        if (rageDuration > 0) rate *= 0.45; 

        gameTimers[key] = setInterval(() => {
            triggerUniqueVisuals(key);
            
            if (key === 'penny') {
                // Base 5 seconds (50 ticks) + 1 second (10 ticks) per level
                rageDuration = 50 + (state.roster[key].level * 10); 
                const arena = document.getElementById('arena');
                if (arena) arena.classList.add('rage-active-bg');
                startAutomationEngines(); 
            } else if (key === 'bernie') {
                // Bernie now does BIG damage instead of healing
                let bigDmg = config.baseDmg * state.roster[key].level * 3.5;
                processDamage(bigDmg, key);
            } else if (key === 'amy') {
                // Damage is handled dynamically by the summoned monkey inside triggerUniqueVisuals
            } else {
                let outDmg = config.baseDmg * state.roster[key].level;
                if (key === 'sheldon') outDmg = Math.floor(outDmg * (1 + sheldonTapBuff));
                processDamage(outDmg, key);
            }
        }, rate);
    }
}

function triggerUniqueVisuals(key) {
    const el = document.getElementById(`live-character-${key}`);
    const arena = document.getElementById('arena');
    const enemyContainer = document.getElementById('enemy-container');
    if (!el || !arena || !enemyContainer) return;
    
    const rect = el.getBoundingClientRect();
    const arenaRect = arena.getBoundingClientRect();
    const enemy = enemyContainer.getBoundingClientRect();

    // Calculate dynamic delta vectors between the character center and the enemy box center
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 3;
    const enemyCenterX = enemy.left + enemy.width / 2;
    const enemyCenterY = enemy.top + enemy.height / 2;

    const deltaX = enemyCenterX - charCenterX;
    const deltaY = enemyCenterY - charCenterY;

    // Apply distance custom properties to element for precision CSS translation tracks
    el.style.setProperty('--target-x', `${deltaX}px`);
    el.style.setProperty('--target-y', `${deltaY}px`);

    if (key === 'leonard' || key === 'stuart') {
        el.classList.remove('strike-dash');
        void el.offsetWidth;
        el.classList.add('strike-dash');
    }

    if (key === 'stuart') {
        el.classList.remove('saber-swing');
        void el.offsetWidth;
        el.classList.add('saber-swing');
    }

    const fx = document.createElement('div');
    fx.style.left = `${charCenterX - arenaRect.left}px`;
    fx.style.top = `${charCenterY - arenaRect.top}px`;
    fx.style.setProperty('--target-x', `${deltaX}px`);
    fx.style.setProperty('--target-y', `${deltaY}px`);
    let removalDelay = 1200;

    switch(key) {
        case 'sheldon':
            fx.className = 'unique-fx green-powerball';
            fx.innerHTML = `<div class="powerball-core"></div>`;
            arena.appendChild(fx);
            removalDelay = 450;
            break;

        case 'leonard':
            fx.className = 'unique-fx physical-sword';
            fx.style.left = `${enemy.left - arenaRect.left - 20}px`;
            fx.style.top = `${enemy.top - arenaRect.top - 10}px`;
            fx.innerHTML = `
                <svg viewBox="0 0 100 100" class="w-28 h-28">
                    <path d="M10 90 L80 20 L90 10 L80 0 L70 10 L0 80 Z" fill="#f1f5f9" stroke="#334155" stroke-width="2.5"/>
                    <path d="M15 85 L75 25" stroke="#ffffff" stroke-width="3"/>
                    <rect x="5" y="80" width="15" height="15" rx="2" fill="#b45309"/>
                </svg>`;
            arena.appendChild(fx);
            removalDelay = 450;
            break;

        case 'penny':
            fx.className = 'unique-fx penny-burger-throw';
            // FIX: Increased base size from w-10/h-10 to w-16/h-16
            fx.innerHTML = `
                <svg viewBox="0 0 40 40" class="w-16 h-16 drop-shadow-2xl">
                    <path d="M 5,20 Q 20,5 35,20 Z" fill="#d97706"/>
                    <rect x="5" y="21" width="30" height="4" fill="#16a34a" rx="1"/>
                    <rect x="5" y="25" width="30" height="6" fill="#451a03" rx="2"/>
                    <rect x="5" y="32" width="30" height="6" fill="#d97706" rx="2"/>
                </svg>`;
            arena.appendChild(fx);

            const rageFx = document.createElement('div');
            rageFx.className = 'unique-fx penny-rage-wave';
            rageFx.style.left = `50%`;
            rageFx.style.top = `50%`;
            rageFx.innerHTML = `<div class="rage-banner">🔥 BURGER RAGE ACTIVATED! 🔥</div>`;
            arena.appendChild(rageFx);
            setTimeout(() => rageFx.remove(), 1200);
            
            // FIX: Increased removal delay from 600 to 1200 to match the slower CSS animation
            removalDelay = 1200;
            break;

        case 'howard':
            removalDelay = 500;
            fx.className = 'unique-fx howard-missile';
            fx.innerHTML = `
                <svg viewBox="0 0 60 20" class="w-16 h-6">
                    <path d="M0 5 L40 5 L55 10 L40 15 L0 15 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
                    <polygon points="0,5 -12,0 -7,10" fill="#dc2626"/>
                    <polygon points="0,15 -12,20 -7,10" fill="#dc2626"/>
                    <circle cx="45" cy="10" r="2" fill="#eab308"/>
                </svg>`;
            arena.appendChild(fx);
            break;

        case 'raj':
            const sun = document.createElement('div');
            sun.className = 'unique-fx raj-sun';
            sun.style.left = `${enemy.left - arenaRect.left - 20}px`;
            sun.style.top = `${enemy.top - arenaRect.top - 120}px`;
            sun.innerHTML = `
                <svg viewBox="0 0 100 100" class="w-20 h-20 animate-spin" style="animation-duration: 3s;">
                    <circle cx="50" cy="50" r="30" fill="#ea580c"/>
                    <path d="M50 0 L55 15 L70 10 L60 25 L80 30 L65 40 L85 55 L70 60 L75 80 L60 70 L50 90 L40 70 L25 80 L30 60 L15 55 L35 40 L20 30 L40 25 L30 10 L45 15 Z" fill="#facc15"/>
                </svg>`;
            arena.appendChild(sun);
            
            fx.className = 'unique-fx raj-laser-line';
            fx.style.left = `${rect.right - arenaRect.left}px`;
            fx.style.top = `${rect.top - arenaRect.top + 20}px`;
            arena.appendChild(fx);
            removalDelay = 500;
            setTimeout(() => sun.remove(), 1200);
            break;

        case 'bernie':
            fx.className = 'unique-fx bernie-soundwave';
            fx.style.top = `${rect.top - arenaRect.top + 20}px`;
            arena.appendChild(fx);
            removalDelay = 500;
            break;

        case 'amy':
            const amyLevel = (state.roster && state.roster['amy']) ? state.roster['amy'].level : 1;
            
            // 1. Create the thrown flask visual with a glowing aura
            fx.className = 'unique-fx amy-chemical-throw';
            
            const targetX = enemy.left - arenaRect.left;
            const targetY = enemy.top - arenaRect.top + 30; // Aim near the feet
            
            fx.style.setProperty('--target-x', `${targetX}px`);
            fx.style.setProperty('--target-y', `${targetY}px`);
            
            // Flask SVG made larger and wrapped in a glowing toxic trail effect
            fx.innerHTML = `
                <div style="position:relative; display:flex; justify-content:center; align-items:center;">
                    <div class="toxic-trail"></div>
                    <svg viewBox="0 0 40 40" class="w-12 h-12 drop-shadow-2xl" style="filter: drop-shadow(0 0 10px #4ade80); position:relative; z-index:2;">
                        <path d="M 15 10 L 25 10 L 22 15 L 28 35 L 12 35 L 18 15 Z" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
                        <rect x="18" y="5" width="4" height="6" fill="#94a3b8"/>
                        <rect x="16" y="4" width="8" height="2" fill="#475569"/>
                        <circle cx="20" cy="25" r="2" fill="#bbf7d0"/>
                        <circle cx="24" cy="30" r="1.5" fill="#bbf7d0"/>
                    </svg>
                </div>`;
            
            arena.appendChild(fx);

            // 2. Wait for the flask to "hit", then explode into a splash and create the puddle
            setTimeout(() => {
                // --- NEW: Splash Explosion Effect ---
                const splash = document.createElement('div');
                splash.className = 'unique-fx amy-chemical-splash';
                splash.style.left = `${enemy.left - arenaRect.left - 30}px`;
                splash.style.top = `${enemy.top - arenaRect.top + 10}px`;
                splash.innerHTML = `
                    <svg viewBox="0 0 100 100" class="w-32 h-32">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#4ade80" stroke-width="8" class="animate-ping" opacity="0.8"/>
                        <path d="M 50 50 L 20 20 M 50 50 L 80 20 M 50 50 L 20 80 M 50 50 L 80 80 M 50 50 L 50 10 M 50 50 L 50 90 M 50 50 L 10 50 M 50 50 L 90 50" stroke="#22c55e" stroke-width="6" stroke-linecap="round" class="splash-lines"/>
                    </svg>
                `;
                arena.appendChild(splash);
                setTimeout(() => splash.remove(), 500);

                // --- EXISTING: Puddle Visual ---
                const puddle = document.createElement('div');
                puddle.className = 'unique-fx amy-chemical-puddle';
                puddle.style.left = `${enemy.left - arenaRect.left - 10}px`;
                puddle.style.top = `${enemy.top - arenaRect.top + 60}px`; 
                
                puddle.innerHTML = `
                    <svg viewBox="0 0 100 40" class="w-28 h-14">
                        <ellipse cx="50" cy="20" rx="40" ry="10" fill="#22c55e" opacity="0.8" filter="drop-shadow(0 0 12px #16a34a)"/>
                        <ellipse cx="40" cy="18" rx="15" ry="5" fill="#4ade80" opacity="0.9"/>
                        <ellipse cx="60" cy="22" rx="10" ry="3" fill="#4ade80" opacity="0.9"/>
                        <circle cx="30" cy="10" r="3" fill="#86efac" class="animate-ping"/>
                        <circle cx="70" cy="15" r="2" fill="#86efac" class="animate-ping" style="animation-delay: 0.5s"/>
                    </svg>
                `;
                arena.appendChild(puddle);

                // Apply Continuous Damage (4 ticks over 4 seconds)
                const dotDmg = characters.amy.baseDmg * amyLevel;
                let ticks = 0;
                
                const dotInterval = setInterval(() => {
                    if (typeof currentEnemy !== 'undefined' && currentEnemy !== null && currentEnemy.hp > 0 && ticks < 4) {
                        processDamage(dotDmg, 'amy_poison');
                        ticks++;
                    } else {
                        clearInterval(dotInterval);
                        puddle.remove();
                    }
                }, 1000); 
                
            }, 600); 

            removalDelay = 600; 
            break;
    }

    setTimeout(() => fx.remove(), removalDelay);
}

function generateDamagePopup(event, val, isCrit, isSpecialText) {
    const arena = document.getElementById('arena');
    if (!arena) return;
    const arenaRect = arena.getBoundingClientRect();
    const pop = document.createElement('div');
    
    pop.className = `damage-popup`;
    if (isCrit) pop.className += ' crit-popup';
    
    const xOffset = (Math.random() - 0.5) * 40;
    const yOffset = (Math.random() - 0.5) * 20;
    pop.style.left = `${event.clientX - arenaRect.left + xOffset}px`;
    pop.style.top = `${event.clientY - arenaRect.top + yOffset}px`;
    
    pop.innerText = isSpecialText ? val : (isCrit ? `💥 ${Math.floor(val)}!!` : `${Math.floor(val)}`);
    arena.appendChild(pop);
    setTimeout(() => pop.remove(), 800);
}

function syncUI() {
    const resMoney = document.getElementById('res-money');
    const scoreVal = document.getElementById('score-val');
    const uiWaveVal = document.getElementById('ui-wave-val');

    if (resMoney) resMoney.innerText = `$${state.resources.money}`;
    if (scoreVal) scoreVal.innerText = String(state.score).padStart(4, '0');
    if (uiWaveVal) uiWaveVal.innerText = state.wave;
    
    // Update all resource displays
    const resources = ['stone', 'iron', 'gold', 'diamond', 'scrap'];
    resources.forEach(res => {
        const el = document.getElementById(`res-${res}`);
        if (el) el.innerText = state.resources[res] || 0;
    });
    
    updateEnemyHealthBar();
}

function openShopModal(event) {
    if(event) event.stopPropagation();
    renderRosterGrid();
    const modal = document.getElementById('shop-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeShopModal() {
    const modal = document.getElementById('shop-modal');
    if (modal) modal.classList.add('hidden');
}

function renderRosterGrid() {
    const grid = document.getElementById('roster-grid');
    if (!grid) return;
    grid.innerHTML = '';

    let activeTotal = 0;
    let activeBack = 0;
    let activeFront = 0;

    for (const [rKey, rConfig] of Object.entries(characters)) {
        if (state.equipped && state.equipped[rKey]) {
            activeTotal++;
            if (rConfig.lane === 'front') activeFront++;
            else activeBack++;
        }
    }

    grid.innerHTML = `
        <div class="col-span-2 bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center text-[8px] mb-1">
            <span class="text-gray-400">COMBAT SQUAD SIZES:</span>
            <div class="flex gap-4">
                <span class="${activeTotal >= 5 ? 'text-amber-400' : 'text-emerald-400'}">TOTAL: ${activeTotal}/5</span>
                <span class="${activeBack >= 3 ? 'text-amber-400' : 'text-emerald-400'}">BACK: ${activeBack}/3</span>
                <span class="${activeFront >= 2 ? 'text-amber-400' : 'text-emerald-400'}">FRONT: ${activeFront}/2</span>
            </div>
        </div>
    `;

    for (const [key, data] of Object.entries(characters)) {
        const info = state.roster[key];
        const level = info ? info.level : 0;
        const isEquipped = !!(state.equipped && state.equipped[key]);

        let frameBorder = 'border-gray-800 bg-black opacity-60';
        let statusBadge = `<span class="text-gray-500">HIRE</span>`;

        if (level > 0) {
            if (isEquipped) {
                frameBorder = 'border-emerald-500 bg-emerald-950/40 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]';
                statusBadge = `<span class="text-emerald-400 animation-pulse">ACTIVE L${level}</span>`;
            } else {
                frameBorder = 'border-amber-600 bg-slate-900';
                statusBadge = `<span class="text-amber-500">BENCHED L${level}</span>`;
            }
        }

        grid.innerHTML += `
            <div onclick="openModal(event, '${key}')" class="p-3 border-2 rounded flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all ${frameBorder}">
                <div class="flex items-center gap-3 overflow-hidden pointer-events-none">
                    <div class="w-10 h-12 flex-shrink-0 bg-black rounded p-0.5">${vectors[key]}</div>
                    <div class="truncate text-[10px]">
                        <div class="font-bold text-white mb-1 text-[12px]">${data.name}</div>
                        <div class="text-[8px] text-gray-400 uppercase tracking-tighter">${data.lane}LINE</div>
                    </div>
                </div>
                <div class="text-[8px] font-bold px-2 py-1.5 rounded bg-gray-950 border border-gray-800 pointer-events-none text-center min-w-[64px]">
                    ${statusBadge}
                </div>
            </div>
        `;
    }
}

function renderActiveBattleLine() {
    const lanes = { back: [], mid: [], front: [] };

    for (const [key, config] of Object.entries(characters)) {
        const activeData = state.roster[key];
        const isEquipped = state.equipped && state.equipped[key];
        if (activeData && activeData.level > 0 && isEquipped) {
            lanes[config.lane].push({ key, config });
        }
    }

    ['back', 'mid', 'front'].forEach(laneKey => {
        const container = document.getElementById(`line-${laneKey}`);
        if (!container) return;
        container.innerHTML = '';

        lanes[laneKey].forEach((char, index) => {
            const { key, config } = char;
            const level = state.roster[key].level;
            const dps = Math.round((config.baseDmg * level * 1000) / config.atkSpeed);
            
            const trackingBadge = (key === 'sheldon') 
                ? `<span id="sheldon-buff-badge" class="absolute -top-8 bg-amber-500 border border-amber-700 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded shadow animate-pulse hidden"></span>` 
                : '';

            container.innerHTML += `
                <div id="live-character-${key}" 
                     class="live-character-frame relative flex flex-col items-center justify-end"
                     style="z-index: ${20 + index};">
                    ${trackingBadge}
                    
                    <!-- Character Stats Badge -->
                    <div class="absolute top-0 left-0 right-0 flex gap-1 justify-center text-[7px] pointer-events-none">
                        <span class="bg-amber-900/90 text-amber-300 px-1 py-0.5 rounded border border-amber-700 font-bold">L${level}</span>
                        <span class="bg-green-900/90 text-green-300 px-1 py-0.5 rounded border border-green-700 font-bold">${config.baseDmg * level}DMG</span>
                        <span class="bg-blue-900/90 text-blue-300 px-1 py-0.5 rounded border border-blue-700 font-bold">${dps}DPS</span>
                    </div>
                    
                    <div class="character-vector-wrapper flex items-end justify-center">${vectors[key]}</div>
                    
                    <span class="bg-amber-950/90 text-white border border-amber-700 font-bold text-[9px] px-2 py-1 absolute -bottom-6 rounded whitespace-nowrap uppercase tracking-tighter shadow-lg">
                        ${config.name}
                    </span>
                    
                    <!-- Lane Badge -->
                    <span class="absolute -bottom-10 text-[7px] bg-slate-900 text-slate-300 px-1 py-0.5 rounded border border-slate-700">
                        ${config.lane.toUpperCase()}
                    </span>
                </div>
            `;
        });
    });

    updateSheldonBuffBadge();
}

function openModal(event, key) {
    if(event) event.stopPropagation(); 
    activeModalKey = key;
    const config = characters[key];
    const data = state.roster[key];
    const lvl = data ? data.level : 0;
    const currentCost = Math.floor(config.cost.money * Math.pow(1.5, lvl));
    const isEquipped = !!(state.equipped && state.equipped[key]);

    const avatar = document.getElementById('modal-char-avatar');
    const name = document.getElementById('modal-char-name');
    const desc = document.getElementById('modal-char-desc');
    const power = document.getElementById('modal-char-power');
    const lane = document.getElementById('modal-char-lane');
    const badge = document.getElementById('modal-char-badge');
    const costContainer = document.getElementById('modal-cost-container');

    if (avatar) avatar.innerHTML = vectors[key];
    if (name) name.innerText = config.name;
    if (desc) desc.innerText = config.desc;
    if (power) power.innerText = config.baseDmg * (lvl || 1);
    if (lane) lane.innerText = config.lane.toUpperCase();
    
    if (badge) {
        if (lvl > 0) {
            badge.innerText = isEquipped ? `ACTIVE LEVEL ${lvl}` : `BENCHED LEVEL ${lvl}`;
            badge.className = isEquipped ? "bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase" : "bg-amber-950 text-amber-400 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase";
        } else {
            badge.innerText = 'NOT UNLOCKED';
            badge.className = "bg-gray-900 text-gray-500 border border-gray-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase";
        }
    }

    let activeTotalCount = 0;
    let activeBacklineCount = 0;
    let activeFrontlineCount = 0;

    for (const [rKey, rConfig] of Object.entries(characters)) {
        if (state.equipped && state.equipped[rKey]) {
            activeTotalCount++;
            if (rConfig.lane === 'front') activeFrontlineCount++;
            else activeBacklineCount++;
        }
    }

    const isHired = lvl > 0;
    const canAfford = state.resources.money >= currentCost;
    
    const footerActions = document.getElementById('modal-footer-actions');
    if (!footerActions) return;
    footerActions.innerHTML = '';

    let purchaseLabel = isHired ? "Upgrade Member Skill" : "Hire Crew Member";

    if (costContainer) {
        costContainer.innerHTML = `<span class="${canAfford ? 'text-green-400' : 'text-red-400'}">💵 $${currentCost}</span>`;
    }

    const hireButtonClass = canAfford 
        ? "w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded"
        : "w-full bg-gray-800 text-gray-500 font-bold py-2.5 text-[10px] cursor-not-allowed uppercase border border-gray-700 rounded";

    let hireRowHtml = `
        <button id="modal-submit-btn" onclick="executeModalAction('buy')" ${!canAfford ? 'disabled' : ''} class="${hireButtonClass}">
            ${purchaseLabel}
        </button>
    `;

    let equipRowHtml = '';
    if (isHired) {
        if (isEquipped) {
            equipRowHtml = `
                <button onclick="executeModalAction('unequip')" class="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded border border-red-700 shadow-sm">
                    ⚠️ REMOVE FROM COMBAT SQUAD
                </button>
            `;
        } else {
            let equipBlocked = false;
            let equipLabel = "⚔️ EQUIP TO COMBAT FIELD";

            if (activeTotalCount >= 5) {
                equipBlocked = true;
                equipLabel = "❌ SLOTS FULL (MAX 5)";
            } else if (config.lane === 'front' && activeFrontlineCount >= 2) {
                equipBlocked = true;
                equipLabel = "❌ FRONTLINE FULL (MAX 2)";
            } else if ((config.lane === 'back' || config.lane === 'mid') && activeBacklineCount >= 3) {
                equipBlocked = true;
                equipLabel = "❌ BACKLINE FULL (MAX 3)";
            }

            const equipButtonClass = !equipBlocked
                ? "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded shadow-md"
                : "w-full bg-gray-950 text-gray-600 font-bold py-2.5 text-[10px] cursor-not-allowed uppercase border border-gray-900 rounded";

            equipRowHtml = `
                <button onclick="executeModalAction('equip')" ${equipBlocked ? 'disabled' : ''} class="${equipButtonClass}">
                    ${equipLabel}
                </button>
            `;
        }
    }

    footerActions.innerHTML = `
        <div class="flex flex-col gap-2 w-full">
            ${equipRowHtml}
            ${hireRowHtml}
        </div>
    `;

    const actionModal = document.getElementById('action-modal');
    if (actionModal) actionModal.classList.remove('hidden');
}

function closeModal() {
    const actionModal = document.getElementById('action-modal');
    if (actionModal) actionModal.classList.add('hidden');
    activeModalKey = null;
}

function executeModalAction(mode) {
    if (!activeModalKey) return;
    const config = characters[activeModalKey];
    const lvl = state.roster[activeModalKey] ? state.roster[activeModalKey].level : 0;
    const currentCost = Math.floor(config.cost.money * Math.pow(1.5, lvl));

    if (!state.equipped) state.equipped = {};

    if (mode === 'buy') {
        if (state.resources.money >= currentCost) {
            state.resources.money -= currentCost;
            if (!state.roster[activeModalKey]) {
                state.roster[activeModalKey] = { level: 1 };
                
                let activeTotalCount = 0;
                let activeBacklineCount = 0;
                let activeFrontlineCount = 0;
                for (const [rKey, rConfig] of Object.entries(characters)) {
                    if (state.equipped[rKey]) {
                        activeTotalCount++;
                        if (rConfig.lane === 'front') activeFrontlineCount++;
                        else activeBacklineCount++;
                    }
                }
                
                if (activeTotalCount < 5) {
                    if (config.lane === 'front' && activeFrontlineCount < 2) state.equipped[activeModalKey] = true;
                    if ((config.lane === 'back' || config.lane === 'mid') && activeBacklineCount < 3) state.equipped[activeModalKey] = true;
                }
            } else {
                state.roster[activeModalKey].level++;
            if(SoundManager.play) SoundManager.play("hospital_heal");
            }
        }
    } else if (mode === 'equip') {
        let activeTotalCount = 0;
        let activeBacklineCount = 0;
        let activeFrontlineCount = 0;
        for (const [rKey, rConfig] of Object.entries(characters)) {
            if (state.equipped[rKey]) {
                activeTotalCount++;
                if (rConfig.lane === 'front') activeFrontlineCount++;
                else activeBacklineCount++;
            }
        }
        
        if (activeTotalCount < 5) {
            if (config.lane === 'front' && activeFrontlineCount < 2) state.equipped[activeModalKey] = true;
            if ((config.lane === 'back' || config.lane === 'mid') && activeBacklineCount < 3) state.equipped[activeModalKey] = true;
        }
    } else if (mode === 'unequip') {
        state.equipped[activeModalKey] = false;
        delete state.equipped[activeModalKey];
    }

    saveProgress();
    syncUI();
    renderRosterGrid();
    renderActiveBattleLine();
    startAutomationEngines();
    closeModal();
}

// ROBOTS CRAFTING SYSTEM
function openRobotsModal(event) {
    if(event) event.stopPropagation();
    renderRobotRoster();
    const modal = document.getElementById('robots-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeRobotsModal() {
    const modal = document.getElementById('robots-modal');
    if (modal) modal.classList.add('hidden');
}

function renderRobotRoster() {
    const grid = document.getElementById('robots-grid');
    if (!grid) return;
    grid.innerHTML = '';

    let deployedCount = 0;
    for (const robot of state.robots) {
        if (robot) deployedCount++;
    }

    grid.innerHTML = `
        <div class="col-span-2 bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center text-[8px] mb-1">
            <span class="text-gray-400">DEPLOYED BOTS:</span>
            <span class="${deployedCount >= 5 ? 'text-amber-400' : 'text-emerald-400'}">${deployedCount}/5 SLOTS</span>
        </div>
    `;

    for (const [key, config] of Object.entries(robots)) {
        const info = state.robotRoster[key];
        const level = info ? info.level : 0;

        let frameBorder = 'border-gray-800 bg-black opacity-60';
        let statusBadge = `<span class="text-gray-500">BUILD</span>`;

        if (level > 0) {
            frameBorder = 'border-emerald-500 bg-emerald-950/40 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]';
            statusBadge = `<span class="text-emerald-400 animate-pulse">BUILT L${level}</span>`;
        }

        grid.innerHTML += `
            <div onclick="openRobotModal(event, '${key}')" class="p-3 border-2 rounded flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all ${frameBorder}">
                <div class="flex items-center gap-3 overflow-hidden pointer-events-none">
                    <div class="w-10 h-12 flex-shrink-0 bg-black rounded p-0.5 text-[8px] flex items-center justify-center">🤖</div>
                    <div class="truncate text-[10px]">
                        <div class="font-bold text-white mb-1 text-[12px]">${config.name}</div>
                        <div class="text-[8px] text-gray-400 uppercase tracking-tighter">${config.type} | ${config.lane}</div>
                    </div>
                </div>
                <div class="text-[8px] font-bold px-2 py-1.5 rounded bg-gray-950 border border-gray-800 pointer-events-none text-center min-w-[64px]">
                    ${statusBadge}
                </div>
            </div>
        `;
    }
}

function openRobotModal(event, key) {
    if(event) event.stopPropagation();
    activeRobotKey = key;
    const config = robots[key];
    const data = state.robotRoster[key];
    const lvl = data ? data.level : 0;
    const craftCost = config.cost;
    const canAfford = Object.entries(craftCost).every(([res, amt]) => state.resources[res] >= amt);

    const avatar = document.getElementById('robot-modal-avatar');
    const name = document.getElementById('robot-modal-name');
    const desc = document.getElementById('robot-modal-desc');
    const type = document.getElementById('robot-modal-type');
    const power = document.getElementById('robot-modal-power');
    const lane = document.getElementById('robot-modal-lane');
    const badge = document.getElementById('robot-modal-badge');
    const costContainer = document.getElementById('robot-modal-cost-container');
    const craftTime = document.getElementById('robot-modal-craft-time');

    if (avatar) avatar.innerText = '🤖';
    if (name) name.innerText = config.name;
    if (desc) desc.innerText = config.desc;
    if (type) type.innerText = config.type.toUpperCase();
    if (power) power.innerText = config.baseDmg;
    if (lane) lane.innerText = config.lane.toUpperCase();
    
    if (badge) {
        if (lvl > 0) {
            badge.innerText = `BUILT LEVEL ${lvl}`;
            badge.className = "bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase";
        } else {
            badge.innerText = 'NOT BUILT';
            badge.className = "bg-gray-900 text-gray-500 border border-gray-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase";
        }
    }

    let costHTML = '<div class="flex gap-2 flex-wrap">';
    for (const [res, amt] of Object.entries(craftCost)) {
        const resSymbol = { stone: '⛏️', iron: '⚙️', gold: '✨', diamond: '💎', scrap: '🔧' };
        const resColor = { stone: 'amber-600', iron: 'slate-400', gold: 'yellow-500', diamond: 'cyan-400', scrap: 'orange-500' };
        const hasEnough = state.resources[res] >= amt;
        costHTML += `<span class="${hasEnough ? `text-${resColor[res]}` : 'text-red-400'}">${resSymbol[res]} ${amt}</span>`;
    }
    costHTML += '</div>';
    
    if (costContainer) costContainer.innerHTML = costHTML;
    if (craftTime) craftTime.innerText = `${Math.round(config.craftTime / 1000 / 60)} min`;

    const footerActions = document.getElementById('robot-modal-footer-actions');
    if (!footerActions) return;
    footerActions.innerHTML = '';

    const craftButtonClass = canAfford 
        ? "w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded"
        : "w-full bg-gray-800 text-gray-500 font-bold py-2.5 text-[10px] cursor-not-allowed uppercase border border-gray-700 rounded";

    footerActions.innerHTML = `
        <button id="robot-craft-btn" onclick="executeRobotCraft('${key}')" ${!canAfford ? 'disabled' : ''} class="${craftButtonClass}">
            🔧 START CRAFTING
        </button>
    `;

    const robotModal = document.getElementById('robot-action-modal');
    if (robotModal) robotModal.classList.remove('hidden');
}

function closeRobotModal() {
    const robotModal = document.getElementById('robot-action-modal');
    if (robotModal) robotModal.classList.add('hidden');
    activeRobotKey = null;
}

function executeRobotCraft(key) {
    if (!key) return;
    const config = robots[key];
    const craftCost = config.cost;

    // Check if player can afford
    for (const [res, amt] of Object.entries(craftCost)) {
        if (state.resources[res] < amt) return;
    }

    // Deduct resources
    for (const [res, amt] of Object.entries(craftCost)) {
        state.resources[res] -= amt;
    }

    // Add to roster if first time
    if (!state.robotRoster[key]) {
        state.robotRoster[key] = { level: 1 };
    } else {
        state.robotRoster[key].level++;
    }

    // Add to crafting queue
    const now = Date.now();
    const queueItem = {
        id: `robot_${key}_${now}`,
        blueprintId: key,
        robotName: config.name,
        startTime: now,
        endTime: now + config.craftTime,
        duration: config.craftTime
    };
    
    state.craftingQueue.push(queueItem);
    
    saveProgress();
    syncUI();
    renderCraftingQueue();
    renderRobotRoster();
    closeRobotModal();
}

function renderCraftingQueue() {
    const container = document.getElementById('crafting-queue-container');
    if (!container) return;
    container.innerHTML = '';

    if (state.craftingQueue.length === 0) {
        container.innerHTML = '<div class="text-gray-500 text-[10px] text-center py-4">No active crafts. Queue is empty.</div>';
        return;
    }

    state.craftingQueue.forEach((item, index) => {
        const config = robots[item.blueprintId];
        const now = Date.now();
        const timeLeft = Math.max(0, item.endTime - now);
        const pct = Math.min(100, ((item.duration - timeLeft) / item.duration) * 100);
        
        const mins = Math.floor(timeLeft / 1000 / 60);
        const secs = Math.floor((timeLeft / 1000) % 60);
        const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

        container.innerHTML += `
            <div class="bg-slate-950 border border-slate-800 rounded p-2 text-[10px] mb-2">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-gray-300 font-bold">[${index + 1}] ${item.robotName}</span>
                    <span class="text-amber-400 font-bold">${timeStr}</span>
                </div>
                <div class="w-full bg-black rounded-full h-3 border border-slate-700 overflow-hidden">
                    <div class="bg-gradient-to-r from-amber-500 to-amber-600 h-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });
}

function updateCraftingQueues() {
    const now = Date.now();
    const completed = [];

    for (let i = state.craftingQueue.length - 1; i >= 0; i--) {
        const item = state.craftingQueue[i];
        if (now >= item.endTime) {
            completed.push(i);
        }
    }

    // Process completed crafts in reverse order to maintain indices
    completed.forEach(idx => {
        const item = state.craftingQueue[idx];
        const config = robots[item.blueprintId];
        
        // Try to auto-deploy
        const canDeploy = state.robots.length < 5;
        if (canDeploy) {
            const robotId = `${item.blueprintId}_${Date.now()}`;
            state.robots.push({
                id: robotId,
                blueprintId: item.blueprintId,
                name: item.robotName,
                type: config.type,
                lane: config.lane,
                level: state.robotRoster[item.blueprintId].level,
                equipped: true
            });
            
            // Try to equip to battle line
            tryEquipRobot(state.robots[state.robots.length - 1]);
        }
        
        // Remove from queue
        state.craftingQueue.splice(idx, 1);
    });

    if (completed.length > 0) {
        saveProgress();
        syncUI();
        renderCraftingQueue();
        renderRobotBattleLine();
        startRobotAutomation();
    }
    
    // Update queue display every frame even if nothing completed
    renderCraftingQueue();
}

function tryEquipRobot(robot) {
    // Obsolete with new 1-bot system, but kept for compatibility
    robot.equipped = true;
    return true;
}

function renderRobotBattleLine() {
    const lanes = { back: [], mid: [], front: [] };
    
    for (const robot of state.robots) {
        if (robot && robot.equipped) {
            lanes[robot.lane].push(robot);
        }
    }

    ['back', 'mid', 'front'].forEach(laneKey => {
        const container = document.getElementById(`robot-line-${laneKey}`);
        if (!container) return;
        container.innerHTML = '';

        lanes[laneKey].forEach((robot, index) => {
            const config = robots[robot.blueprintId];
            const dps = Math.round((config.baseDmg * robot.level * 1000) / config.atkSpeed);
            
            const botLore = {
                r2d2_unit: { scale: 0.8, z: 40, flying: false },
                battle_droid: { scale: 1.6, z: 10, flying: false },
                droideka: { scale: 1.5, z: 10, flying: false },
                omac_unit: { scale: 2.4, z: 10, flying: false },
                cyborg_support: { scale: 1.2, z: 10, flying: false },
                apokolips_destroyer: { scale: 3.0, z: 5, flying: true },
                atom_boxer: { scale: 2.2, z: 10, flying: false },
                zeus_titan: { scale: 3.0, z: 5, flying: false },
                midas_speedster: { scale: 2.3, z: 10, flying: true }
            };
            const lore = botLore[robot.blueprintId] || { scale: 1, z: 10, flying: false };
            const svg = getVectorFrame(robot.blueprintId, false) || '🤖';
            const floatClass = lore.flying ? 'mb-[15%] animate-pulse' : '';
            
            container.innerHTML += `
                <div id="live-robot-${robot.id}" 
                     class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:scale-[1.02] transition-transform pointer-events-auto ${floatClass}" 
                     style="z-index: ${lore.z};"
                     onclick="openRobotModal(event, '${robot.blueprintId}')">
                    <div class="character-vector-wrapper flex items-center justify-center text-4xl" style="transform: scale(${lore.scale}); transform-origin: bottom center;">${svg}</div>
                    
                    <!-- Robot Stats Badge -->
                    <div class="absolute top-0 left-0 right-0 flex gap-1 justify-center text-[7px] pointer-events-none">
                        <span class="bg-cyan-900/90 text-cyan-300 px-1 py-0.5 rounded border border-cyan-700 font-bold">L${robot.level}</span>
                        <span class="bg-amber-900/90 text-amber-300 px-1 py-0.5 rounded border border-amber-700 font-bold">${config.baseDmg * robot.level}DMG</span>
                        <span class="bg-purple-900/90 text-purple-300 px-1 py-0.5 rounded border border-purple-700 font-bold">${dps}DPS</span>
                    </div>
                    
                    <span class="bg-cyan-950/90 text-white border border-cyan-700 font-bold text-[9px] px-2 py-1 absolute -bottom-6 rounded whitespace-nowrap uppercase tracking-tighter shadow-lg">
                        ${robot.name}
                    </span>
                    
                    <!-- Type Badge -->
                    <span class="absolute -bottom-10 text-[7px] bg-slate-900 text-slate-300 px-1 py-0.5 rounded border border-slate-700">
                        ${config.type.toUpperCase()}
                    </span>
                </div>
            `;
        });
    });
}

function startRobotAutomation() {
    // Clear any existing robot timers
    if (!window.robotTimers) window.robotTimers = {};
    Object.values(window.robotTimers).forEach(clearInterval);
    window.robotTimers = {};

    for (const robot of state.robots) {
        if (!robot || !robot.equipped) continue;
        
        const config = robots[robot.blueprintId];
        let rate = config.atkSpeed / activeSynergies.robotSpeedMult;
        if (rageDuration > 0) rate *= 0.45;

        window.robotTimers[robot.id] = setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            let rbDmg = config.baseDmg * robot.level;
            const rPerkMult = state.perks ? (1 + (state.perks.robotDmgMult * 0.1)) : 1;
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);
        }, rate);
    }
}

let activeRobotKey = null;

window.onload = initGame;
window.buyTalent = function(charKey, type) {
    if (!state.bazingaPoints || state.bazingaPoints < 1) return;
    if (!state.roster[charKey].talents) state.roster[charKey].talents = { dmg: 0, hp: 0 };
    
    if (state.roster[charKey].talents[type] < 5) {
        state.bazingaPoints--;
        state.roster[charKey].talents[type]++;
        
        // If HP talent, immediately increase maxHP and currentHP proportionally
        if (type === 'hp') {
            const config = characters[charKey];
            const charLvl = state.roster[charKey].level;
            const baseMaxHp = Math.floor((config.baseHp || 100) * Math.pow(1.25, charLvl - 1));
            const newMaxHp = Math.floor(baseMaxHp * (1 + (state.roster[charKey].talents.hp * 0.20)));
            state.roster[charKey].maxHp = newMaxHp;
            state.roster[charKey].currentHp = newMaxHp; // Heal to full on upgrade
        }
        
        saveProgress();
        syncUI();
        openModal(charKey);
        renderRosterGrid();
        renderHospitalPlace();
    }
};


function openFoodShop(event) {
    if(event) event.stopPropagation();
    const modal = document.getElementById('food-shop-modal');
    if (modal) modal.classList.remove('hidden');
    renderFoodGrid();
}

function closeFoodShop() {
    const modal = document.getElementById('food-shop-modal');
    if (modal) modal.classList.add('hidden');
}

function renderFoodGrid() {
    const grid = document.getElementById('food-grid');
    const moneyDisp = document.getElementById('food-modal-money');
    if (moneyDisp) moneyDisp.innerText = `CASH: $${Math.floor(state.resources.money)}`;
    if (!grid) return;
    grid.innerHTML = '';
    
    for (const [key, item] of Object.entries(foods)) {
        // Base cost inversely proportional to rarity
        const cost = Math.floor(10 / item.rarity);
        const owned = state.food[key] || 0;
        const canAfford = state.resources.money >= cost;
        
        const btnClass = canAfford ? 'bg-orange-600 hover:bg-orange-500 text-white cursor-pointer' : 'bg-gray-800 text-gray-500 cursor-not-allowed';
        
        grid.innerHTML += `
            <div class="bg-slate-900 border-2 border-slate-700 p-3 rounded flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="text-3xl">${item.emoji}</div>
                    <div>
                        <div class="font-bold text-orange-400 text-[12px]">${item.name} <span class="text-gray-400 text-[10px] ml-1">(x${owned})</span></div>
                        <div class="text-[9px] text-gray-400 mt-0.5 leading-tight">${item.description}</div>
                        <div class="text-[10px] text-green-400 mt-1 font-bold">+${item.hpRestore} HP</div>
                    </div>
                </div>
                <button onclick="buyFood('${key}', ${cost})" ${!canAfford ? 'disabled' : ''} class="${btnClass} px-3 py-2 rounded font-bold border-2 border-black shadow-md text-[10px]">
                    $${cost}
                </button>
            </div>
        `;
    }
}

// HOSPITAL PLACE SYSTEM
function toggleHospitalPlace(event) {
    if(event) event.stopPropagation();
    const place = document.getElementById('hospital-place');
    const arena = document.getElementById('arena');
    if (!place || !arena) return;
    
    if (place.classList.contains('hidden')) {
        place.classList.remove('hidden');
        arena.classList.add('hidden');
        renderHospitalPlace();
    } else {
        place.classList.add('hidden');
        arena.classList.remove('hidden');
    }
}

function renderHospitalPlace() {
    const grid = document.getElementById('hospital-beds-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (!state.hospitalized || state.hospitalized.length === 0) {
        grid.innerHTML = '<div class="text-emerald-800 text-center mt-20 text-2xl font-bold tracking-widest uppercase drop-shadow-md">The hospital is empty. Everyone is healthy!</div>';
        return;
    }
    
    const now = Date.now();
    for (const key of state.hospitalized) {
        const charData = state.roster[key];
        const config = characters[key];
        if (!charData || !config) continue;
        
        const timeLeft = Math.max(0, charData.hospitalEndTime - now);
        const mins = Math.floor(timeLeft / 1000 / 60);
        const secs = Math.floor((timeLeft / 1000) % 60);
        
        // Show feed buttons to heal
        const foodButtons = Object.keys(state.food || {})
            .filter(f => state.food[f] > 0)
            .map(f => `<button onclick="useFoodForRecovery('${key}', '${f}'); renderHospitalPlace(); syncUI(); renderRosterGrid();" class="bg-orange-600 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded text-[10px] cursor-pointer shadow-md">${foods[f].emoji} x${state.food[f]}</button>`)
            .join('');

        const foodHtml = foodButtons.length > 0 
            ? `<div class="flex gap-2 flex-wrap justify-center">${foodButtons}</div>`
            : `<div class="text-[9px] text-emerald-300/60 italic font-bold tracking-widest">NO FOOD AVAILABLE. BUY FOOD!</div>`;
        
        grid.innerHTML += `
            <div class="relative w-48 h-64 flex flex-col items-center mt-4 group">
                <!-- SVG Bed Background -->
                <div class="absolute inset-0 z-0 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]">
                    ${typeof vectors['hospital_bed'] === 'object' ? vectors['hospital_bed'].idle : vectors['hospital_bed']}
                </div>
                
                <!-- Character Laying Down -->
                <div class="absolute top-8 w-28 h-40 transform -rotate-90 filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-10 transition-all origin-center">
                    <div class="character-vector-wrapper flex items-center justify-center">${getVectorFrame(key, false, 'injured')}</div>
                </div>

                <!-- Recovery UI Overlay (shows on hover or always at bottom) -->
                <div class="absolute -bottom-12 inset-x-[-1rem] bg-zinc-900/95 border-2 border-emerald-500 p-2 rounded-xl z-30 flex flex-col items-center shadow-[0_0_15px_rgba(5,150,105,0.4)] opacity-100 transition-opacity">
                    <div class="text-emerald-400 font-bold uppercase text-[11px] truncate w-full text-center drop-shadow-[0_0_5px_rgba(5,150,105,0.8)]">${config.name}</div>
                    <div class="text-[10px] font-bold text-red-400 mb-1">${Math.floor(charData.currentHp)} / ${charData.maxHp} HP</div>
                    <div class="text-[12px] font-black text-white bg-red-950 px-2 py-1 rounded w-full text-center mb-1 shadow-inner animate-pulse border border-red-600">
                        ${mins}m ${secs}s
                    </div>
                    <div class="w-full flex justify-center border-t border-emerald-800/50 pt-1 mt-1">
                        ${foodHtml}
                    </div>
                </div>
            </div>
        `;
    }
}

// Ensure the hospital place updates periodically if open
setInterval(() => {
    const place = document.getElementById('hospital-place');
    if (place && !place.classList.contains('hidden')) {
        renderHospitalPlace();
    }
}, 1000);

function buyFood(key, cost) {
    if (state.resources.money >= cost) {
        state.resources.money -= cost;
        state.food[key] = (state.food[key] || 0) + 1;
        saveProgress();
        syncUI();
        renderFoodGrid();
    }
}

let hangoutMode = false;

function toggleHangoutMode(event) {
    if (event) event.stopPropagation();
    hangoutMode = !hangoutMode;
    
    const btnText = document.getElementById('hangout-btn-text');
    if (btnText) btnText.innerText = hangoutMode ? 'BACK TO BATTLE' : 'HANG OUT';
    
    const combatUI = document.getElementById('enemy-battle-slot');
    const playerLines = document.getElementById('player-battle-line');
    const robotLines = document.getElementById('robot-battle-line');
    const hotspots = document.getElementById('hangout-hotspots');
    
    if (hangoutMode) {
        if (combatUI) combatUI.classList.add('hidden');
        if (playerLines) playerLines.classList.add('hidden');
        if (robotLines) robotLines.classList.add('hidden');
        if (hotspots) hotspots.classList.remove('hidden');
    } else {
        if (combatUI) combatUI.classList.remove('hidden');
        if (playerLines) playerLines.classList.remove('hidden');
        if (robotLines) robotLines.classList.remove('hidden');
        if (hotspots) hotspots.classList.add('hidden');
    }
}

function hangoutAction(type, event) {
    if (event) event.stopPropagation();
    let msg = "";
    let val = 0;
    
    switch(type) {
        case 'whiteboard':
            const equations = ["Bazinga!", "That's my spot.", "I'm not crazy, my mother had me tested.", "I am the master of my own bladder."];
            msg = equations[Math.floor(Math.random() * equations.length)];
            val = Math.floor(Math.random() * 5) + 1;
            state.resources.money += val;
            generateDamagePopup({clientX: event.clientX, clientY: event.clientY}, `+${val} CASH`, true, true);
            break;
        case 'couch':
            msg = "Soft kitty, warm kitty, little ball of fur...";
            break;
        case 'door':
            msg = "Knock knock knock, Penny!";
            break;
        case 'bookcase':
            msg = "Please don't touch the collectibles. They are mint in box.";
            break;
    }
    
    // Create a speech bubble
    const bubble = document.createElement('div');
    bubble.className = 'absolute bg-white text-black font-bold text-[10px] p-2 border-2 border-black rounded shadow-xl z-[60] max-w-[150px] animate-pulse';
    bubble.style.left = `${event.clientX}px`;
    bubble.style.top = `${event.clientY - 40}px`;
    bubble.innerText = msg;
    
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2500);
    syncUI();
}

// AUDIO SETTINGS SYSTEM
function openSettingsModal(event) {
    if (event) event.stopPropagation();
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.remove('hidden');
    
    // Sync slider UI with current settings
    document.getElementById('vol-bgm').value = SoundManager.volumes.bgm;
    document.getElementById('vol-scene').value = SoundManager.volumes.scene;
    document.getElementById('vol-char').value = SoundManager.volumes.character;
    
    document.getElementById('vol-bgm-val').innerText = `${Math.round(SoundManager.volumes.bgm * 100)}%`;
    document.getElementById('vol-scene-val').innerText = `${Math.round(SoundManager.volumes.scene * 100)}%`;
    document.getElementById('vol-char-val').innerText = `${Math.round(SoundManager.volumes.character * 100)}%`;
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('hidden');
}

function updateAudioSettings() {
    const bgm = parseFloat(document.getElementById('vol-bgm').value);
    const scene = parseFloat(document.getElementById('vol-scene').value);
    const char = parseFloat(document.getElementById('vol-char').value);
    
    SoundManager.volumes.bgm = bgm;
    SoundManager.volumes.scene = scene;
    SoundManager.volumes.character = char;
    
    document.getElementById('vol-bgm-val').innerText = `${Math.round(bgm * 100)}%`;
    document.getElementById('vol-scene-val').innerText = `${Math.round(scene * 100)}%`;
    document.getElementById('vol-char-val').innerText = `${Math.round(char * 100)}%`;
    
    SoundManager.applyVolumes();
    
    // Save to local storage
    localStorage.setItem('tbbt_audio_settings', JSON.stringify(SoundManager.volumes));
}

// PERKS SYSTEM
function openPerksModal(event) {
    if (event) event.stopPropagation();
    const modal = document.getElementById('perks-modal');
    if (modal) modal.classList.remove('hidden');
    syncPerksUI();
}

function closePerksModal() {
    const modal = document.getElementById('perks-modal');
    if (modal) modal.classList.add('hidden');
}

function syncPerksUI() {
    if (!state.perks) {
        state.perks = { dmgMult: 0, dropMult: 0, robotDmgMult: 0 };
    }
    const bpDisplay = document.getElementById('bazinga-points-display');
    if (bpDisplay) bpDisplay.innerText = state.bazingaPoints || 0;
    
    const pDmg = document.getElementById('perk-val-dmg');
    if (pDmg) pDmg.innerText = (state.perks.dmgMult * 10).toString();
    
    const pRob = document.getElementById('perk-val-robot');
    if (pRob) pRob.innerText = (state.perks.robotDmgMult * 10).toString();
    
    const pDrp = document.getElementById('perk-val-drop');
    if (pDrp) pDrp.innerText = (state.perks.dropMult * 10).toString();
}

function buyPerk(perkKey) {
    if ((state.bazingaPoints || 0) >= 1) {
        state.bazingaPoints--;
        if (!state.perks) state.perks = { dmgMult: 0, dropMult: 0, robotDmgMult: 0 };
        state.perks[perkKey] = (state.perks[perkKey] || 0) + 1;
        SoundManager.play('sheldon_level');
        syncPerksUI();
        saveProgress();
    }
}

function calculateSynergies() {
    activeSynergies = { dmgMult: 1.0, robotSpeedMult: 1.0, foodMult: 1.0 };
    activeSynergyNames = [];
    
    const eq = state.equipped;
    if (!eq) return;
    
    if (eq.sheldon && eq.leonard && eq.penny) {
        activeSynergies.dmgMult = 1.5;
        activeSynergyNames.push("The Original Trio (+50% DMG)");
    }
    
    if (eq.howard && eq.raj) {
        activeSynergies.robotSpeedMult = 1.5;
        activeSynergyNames.push("The Engineers (Bots 50% Faster)");
    }
    
    if (eq.amy && eq.bernie) {
        activeSynergies.foodMult = 2.0;
        activeSynergyNames.push("The Biologists (Food Heals 2x)");
    }
    
    const container = document.getElementById('synergy-display');
    if (container) {
        if (activeSynergyNames.length > 0) {
            container.innerHTML = activeSynergyNames.map(n => `<span class="bg-purple-900/50 text-purple-300 border border-purple-500/50 px-2 py-0.5 rounded shadow whitespace-nowrap">${n}</span>`).join('');
            container.classList.remove('hidden');
        } else {
            container.innerHTML = '';
            container.classList.add('hidden');
        }
    }
}

// SKELETAL RENDERING LOOP
let renderLoopId = null;
function startSpriteRenderLoop() {
    // Disabled since we reverted to CSS skeletal animations
}

window.onload = initGame;

window.startGameEngine = function() {
    const ts = document.getElementById('title-screen');
    if (ts) {
        ts.style.opacity = '0';
        setTimeout(() => {
            ts.remove();
        }, 1000);
    }
    SoundManager.startBGM();

    if (!state.hasSeenIntro) {
        playIntroCutscene();
    }
};


function playIntroCutscene() {
    const overlay = document.getElementById('story-cutscene-overlay');
    const stage = document.getElementById('cutscene-stage');
    const effects = document.getElementById('cutscene-effects');
    const portal = document.getElementById('cutscene-portal');
    const bg = document.getElementById('cutscene-bg');
    
    const speakerEl = document.getElementById('cutscene-speaker');
    const dialogEl = document.getElementById('cutscene-dialogue');
    
    if (!overlay || !stage || !portal) return;

    overlay.classList.remove('hidden');
    overlay.classList.add('flex');

    if (typeof backgrounds !== 'undefined' && backgrounds['sheldons_apt']) {
        bg.innerHTML = backgrounds['sheldons_apt'];
    }

    // Add Characters
    const chars = [
        { key: 'leonard', pos: 5 },
        { key: 'sheldon', pos: 20 },
        { key: 'howard', pos: 35 },
        { key: 'raj', pos: 50 }
    ];
    chars.forEach((c, i) => {
        const el = document.createElement('div');
        el.className = `absolute bottom-[10%] cutscene-character-enter filter drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]`;
        el.style.left = `${c.pos}%`;
        el.style.width = '15vh';
        el.style.height = '22vh';
        el.style.animationDelay = `${i * 0.1}s`;
        el.innerHTML = `<div class="character-vector-wrapper" style="width:100%;height:100%;transform-origin:bottom center;">${getVectorFrame(c.key, false, 'idle')}</div>`;
        el.id = `cutscene-char-${c.key}`;
        stage.appendChild(el);
    });

    let currentScene = 0;
    
    const scenes = [
        // Scene 0: Boredom
        () => {
            speakerEl.innerText = "Sheldon";
            dialogEl.innerText = "I'm incredibly bored. We need a new intellectual pursuit. String theory has lost its luster today.";
        },
        // Scene 1: Idea
        () => {
            speakerEl.innerText = "Howard";
            dialogEl.innerText = "What if we build a dimensional portal? I can borrow some NASA scrap metal.";
        },
        // Scene 2: Building Phase 1
        () => {
            speakerEl.innerText = "Raj";
            dialogEl.innerText = "I'll help! Hand me that plasma welder! *bzzt*";
            // Spark effect on Howard
            const spark = document.createElement('div');
            spark.className = 'cutscene-spark';
            spark.style.left = '45%';
            spark.style.top = '60%';
            spark.style.setProperty('--tx', '50px');
            spark.style.setProperty('--ty', '-50px');
            effects.appendChild(spark);
            setTimeout(() => spark.remove(), 800);
        },
        // Scene 3: Building Phase 2
        () => {
            speakerEl.innerText = "Leonard";
            dialogEl.innerText = "I'm routing the high-power laser beam into the focal lens now. Stand back!";
            // Laser effect
            const laser = document.createElement('div');
            laser.className = 'cutscene-laser';
            laser.style.left = '20%';
            laser.style.top = '65%';
            effects.appendChild(laser);
            setTimeout(() => laser.remove(), 500);
            SoundManager.playFX('shoot');
        },
        // Scene 4: The Portal Opens
        () => {
            speakerEl.innerText = "Leonard";
            dialogEl.innerText = "It's actually working! This is impossible!";
            portal.classList.add('cutscene-portal-open');
        },
        // Scene 5: The Overload
        () => {
            speakerEl.innerText = "Sheldon";
            dialogEl.innerText = "Fascinating, but the energy matrix is unstable! It's going to collapse!";
            portal.classList.remove('cutscene-portal-open');
            portal.classList.add('cutscene-portal-explode');
            overlay.classList.add('screen-shake-active');
            bg.style.filter = 'invert(1) hue-rotate(180deg)';
        },
        // Scene 6: Aftermath
        () => {
            speakerEl.innerText = "Raj";
            dialogEl.innerText = "Oh dear! I think we broke the space-time continuum!";
            overlay.classList.remove('screen-shake-active');
            bg.style.filter = '';
        },
        // Scene 7: Enemies Arrive
        () => {
            speakerEl.innerText = "System";
            dialogEl.innerText = "*Strange dimensional entities begin teleporting into the apartment!*";
            const enemiesList = ['caltech_chairman', 'kurt_ex', 'meathead_jock'];
            enemiesList.forEach((e, i) => {
                const enemyEl = document.createElement('div');
                enemyEl.className = `absolute bottom-[15%] cutscene-enemy-slide filter drop-shadow-[0_10px_15px_rgba(255,0,0,0.6)]`;
                enemyEl.style.left = `${65 + (i * 10)}%`;
                enemyEl.style.width = '20vh';
                enemyEl.style.height = '30vh';
                enemyEl.style.animationDelay = `${i * 0.1}s`;
                const svgContent = getVectorFrame(e, true, 'idle') || `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="maroon"/></svg>`;
                enemyEl.innerHTML = `<div class="character-vector-wrapper" style="width:100%;height:100%;transform-origin:bottom center;transform:scale(-1,1);">${svgContent}</div>`;
                enemyEl.id = `cutscene-enemy-${e}`;
                stage.appendChild(enemyEl);
            });
        },
        // Scene 8: Confrontation
        () => {
            speakerEl.innerText = "The Chairman";
            dialogEl.innerText = "SILENCE! Your dimensional noise is unacceptable! PREPARE TO DIE!";
        },
        // Scene 9: Battle Start
        () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.classList.remove('flex');
                overlay.classList.add('hidden');
                stage.innerHTML = '';
                effects.innerHTML = '';
                state.hasSeenIntro = true;
                saveProgress();
                
                const container = document.getElementById('arena');
                if (container) {
                    const targetBox = container.getBoundingClientRect();
                    generateDamagePopup({
                        clientX: targetBox.left + (targetBox.width / 2),
                        clientY: targetBox.top + (targetBox.height / 2)
                    }, "BATTLE START!", false, true);
                }
            }, 1000);
        }
    ];

    scenes[0]();

    overlay.onclick = () => {
        currentScene++;
        if (currentScene < scenes.length) {
            scenes[currentScene]();
        } else {
            overlay.onclick = null;
        }
    };
}

