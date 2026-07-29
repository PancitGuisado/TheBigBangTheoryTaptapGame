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
        if (nowMs - this.lastFxTime < 8000) return; // 8 second cooldown to prevent spam
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
            gain.gain.setValueAtTime(vol * 0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'slash') {
            // Melee "swoosh"
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.linearRampToValueAtTime(50, now + 0.15);
            gain.gain.setValueAtTime(0.01, now);
            gain.gain.linearRampToValueAtTime(vol * 0.25, now + 0.05);
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
// SKELETAL FRAME GETTER
function getVectorFrame(key, isEnemy = false, state = 'idle') {
    if (typeof vectors === 'undefined' || !vectors[key]) return '';
    if (typeof vectors[key] === 'string') return vectors[key];
    if (state === 'attack1' && vectors[key].attack1) return vectors[key].attack1;
    if (state === 'attack2' && vectors[key].attack2) return vectors[key].attack2;
    return vectors[key].idle || '';
}

function initGame() {
    SoundManager.init();
    SoundManager.startAmbientLoop();
    
    // Browsers require user interaction before playing audio, so we hook BGM start to the first click anywhere
    document.body.addEventListener('click', () => {
        SoundManager.startBGM();
    }, { once: true });
    
    loadProgress();
    // Fallback: If legacy save files exist, migrate unlocked units to equipped by default up to limits
    migrateLegacySaves();
    spawnEnemy();
    renderActiveBattleLine();
    renderRobotBattleLine();
    renderCraftingQueue();
    calculateSynergies();
    syncUI();
    startAutomationEngines();
    startRobotAutomation();
    startSpriteRenderLoop();
    updateMapBackground();
    
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
    
    const locVal = document.getElementById('ui-location-val');
    if (locVal) locVal.innerText = locationData.name.toUpperCase();
    
    syncUI();
    updateMapBackground();
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
        if (typeof locationOrder === 'undefined') return;
        
        for (const locKey of locationOrder) {
            const locData = locations[locKey];
            if (!locData) continue;
            
            const isUnlocked = state.unlockedLocations && state.unlockedLocations.includes(locKey);
            
            const btn = document.createElement('button');
            if (isUnlocked) {
                btn.className = 'location-btn px-4 py-3 rounded bg-blue-900 hover:bg-blue-800 border-2 border-blue-600 text-white font-bold text-sm w-full text-center transition';
                if (state.currentLocation === locKey) {
                    btn.className += ' ring-2 ring-yellow-400';
                }
                btn.onclick = () => {
                    switchLocation(locKey);
                    closeLocationMap();
                };
                btn.innerHTML = `
                    <div>${locData.name}</div>
                    <div class="text-xs text-gray-300">${locData.desc}</div>
                    <div class="text-xs text-green-400 uppercase mt-1 tracking-wider">UNLOCKED</div>
                `;
            } else {
                btn.className = 'location-btn px-4 py-3 rounded bg-slate-800 border-2 border-slate-600 text-gray-500 font-bold text-sm w-full text-center cursor-not-allowed opacity-75';
                btn.innerHTML = `
                    <div class="text-red-500 text-lg mb-1">🔒</div>
                    <div>${locData.name}</div>
                    <div class="text-[10px] uppercase mt-1 tracking-widest text-slate-400">Beat previous boss to unlock</div>
                `;
            }
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
    if (!state.equipped || Array.isArray(state.equipped)) {
        const oldEquippedArray = Array.isArray(state.equipped) ? state.equipped : [];
        state.equipped = {};
        let backCount = 0;
        let frontCount = 0;
        
        // First try to restore any valid string keys from the old array
        for (const key of oldEquippedArray) {
            if (typeof key === 'string' && characters[key] && state.roster[key] && state.roster[key].level > 0) {
                const config = characters[key];
                if (config.lane === 'front' && frontCount < 2) {
                    state.equipped[key] = true;
                    frontCount++;
                } else if ((config.lane === 'back' || config.lane === 'mid') && backCount < 3) {
                    state.equipped[key] = true;
                    backCount++;
                }
            }
        }

        for (const [key, config] of Object.entries(characters)) {
            if (!state.equipped[key] && state.roster[key] && state.roster[key].level > 0) {
                state.equipped[key] = true;
            }
        }
    }
    
    // Bot Slots Initialization
    if (typeof state.botSlots === 'undefined') {
        state.botSlots = 1;
    }
    
    // Ensure all unlocked characters have correct dynamic maxHp
    for (const key of Object.keys(state.roster)) {
        if (state.roster[key].level > 0 && characters[key]) {
            const charLvl = state.roster[key].level;
            
            const baseMaxHp = Math.floor((characters[key].baseHp || 100) * Math.pow(1.25, charLvl - 1));
            const talentHpMult = state.roster[key].talents ? (1 + (state.roster[key].talents.hp * 0.20)) : 1;
            const correctMaxHp = Math.floor(baseMaxHp * talentHpMult);
    
            if (!state.roster[key].maxHp) {
                state.roster[key].maxHp = correctMaxHp;
                state.roster[key].currentHp = correctMaxHp;
            } else if (state.roster[key].maxHp !== correctMaxHp) {
                const diff = correctMaxHp - state.roster[key].maxHp;
                state.roster[key].maxHp = correctMaxHp;
                state.roster[key].currentHp = Math.min(correctMaxHp, state.roster[key].currentHp + diff);
            }
        }
    }
}

function startManualBossFight(event) {
    if (event) event.stopPropagation();
    window.manualBossTrigger = true;
    spawnEnemy();
}

function spawnEnemy() {
    const bossControls = document.getElementById('boss-controls');
    const timerDisplay = document.getElementById('boss-timer-display');
    const locationInfo = document.getElementById('location-name-display');
    const fightBossBtn = document.getElementById('fight-boss-btn');
    
    let chosenType;
    const currentLocationData = locations[state.currentLocation];

    if (locationInfo && currentLocationData) {
        locationInfo.innerText = `📍 ${currentLocationData.name}`;
    }

    if (typeof state.minionsDefeated === 'undefined') state.minionsDefeated = 0;

    const locIndex = typeof locationOrder !== 'undefined' ? locationOrder.indexOf(state.currentLocation) : 0;
    const locMultiplier = locIndex >= 0 ? Math.pow(1.5, locIndex) : 1.0;

    if (window.manualBossTrigger) {
        window.manualBossTrigger = false;
        isBossActive = true;
        const bossPo = currentLocationData?.bossPool || bossTypes.map(b => b.key);
        const bossPoolKeys = bossPo.map(k => bossTypes.find(b => b.key === k)).filter(Boolean);
        const bossIndex = (state.wave - 1) % bossPoolKeys.length;
        chosenType = bossPoolKeys[bossIndex];
        
        if (bossControls) bossControls.classList.remove('hidden');
        if (fightBossBtn) fightBossBtn.classList.add('hidden');
        if (timerDisplay) timerDisplay.classList.remove('hidden');
        
        currentEnemy.maxHp = Math.floor(250 * chosenType.hpMultiplier * locMultiplier * Math.pow(1.4, state.wave - 1));
        
        // Auto-start boss timer
        bossTimer = 20.0;
        if (timerDisplay) timerDisplay.innerText = `⏱️ ${bossTimer.toFixed(1)}s`;
        clearInterval(bossTimerId);
        bossTimerId = setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            bossTimer -= 0.1;
            if (bossTimer <= 0) {
                bossTimer = 0;
                failBossFight();
            }
            if (timerDisplay) timerDisplay.innerText = `⏱️ ${bossTimer.toFixed(1)}s`;
        }, 100);
        
    } else {
        // Minion Wave
        isBossActive = false;
        clearInterval(bossTimerId);
        
        if (state.minionsDefeated >= 10) {
            if (bossControls) bossControls.classList.remove('hidden');
            if (fightBossBtn) fightBossBtn.classList.remove('hidden');
            if (timerDisplay) timerDisplay.classList.add('hidden');
        } else {
            if (bossControls) bossControls.classList.add('hidden');
        }
        
        const minionPool = currentLocationData?.minionPool || minionTypes.map(m => m.key);
        const minionPoolObjects = minionPool.map(k => minionTypes.find(m => m.key === k)).filter(Boolean);
        chosenType = minionPoolObjects[Math.floor(Math.random() * minionPoolObjects.length)];
        
        currentEnemy.maxHp = Math.floor(40 * chosenType.hpMultiplier * locMultiplier * Math.pow(1.2, state.wave - 1));
    }

    currentEnemy.type = chosenType;
    currentEnemy.hp = currentEnemy.maxHp;
    
    const enemyNameEl = document.getElementById('enemy-name');
    if (enemyNameEl) {
        enemyNameEl.innerText = isBossActive ? `WAVE ${state.wave} BOSS: ${chosenType.name}` : `Lv.${state.wave} ${chosenType.name}`;
    }
    
    const enemyTypeBadge = document.getElementById('enemy-type-badge');
    if (enemyTypeBadge) {
        enemyTypeBadge.innerText = isBossActive ? '⚔️ BOSS' : `WAVE: ${state.minionsDefeated + 1}/10`;
    }
    
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
        const loreScale = chosenType.scale || (isBossActive ? 2.0 : 1.0);
        const svgContent = getVectorFrame(chosenType.key, true) || `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="gray"/></svg>`;
        frame.innerHTML = `<div class="character-vector-wrapper flex items-center justify-center text-4xl" style="transform: scale(${loreScale}); transform-origin: bottom center;">${svgContent}</div>`;
        
        // Reset animation classes
        frame.classList.remove('enemy-spawn-in', 'enemy-breathing', 'enemy-hurt', 'enemy-lunge', 'enemy-throw');
        void frame.offsetWidth; // Trigger reflow to restart CSS animations
        frame.classList.add('enemy-spawn-in', 'enemy-breathing');
    }
    
    updateEnemyHealthBar();
}

function triggerBossFight(event) {
    if(event) event.stopPropagation();
    // This function is obsolete in Ascension Protocol, bosses are automatic!
}

function failBossFight() {
    isBossActive = false;
    clearInterval(bossTimerId);
    SoundManager.play('error');
    
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

let lastEnemyAttackAnim = 0;

// MAP BACKGROUND SYSTEM
const ParticleSystem = {
    intervalId: null,
    start(locationKey) {
        this.stop();
        const arena = document.getElementById('arena');
        if (!arena) return;

        let generator;
        if (locationKey === 'sheldons_apt' || locationKey === 'caltech_labs') {
            const mathSymbols = ['E=mc²', 'π', '∑', '∫', 'Δ', 'λ', '∞', 'f(x)', 'θ', 'sin(x)'];
            generator = () => {
                const el = document.createElement('div');
                el.className = 'absolute text-green-400/30 font-mono font-bold text-lg select-none pointer-events-none z-0';
                el.innerText = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
                el.style.left = `${Math.random() * 100}%`;
                el.style.top = `-20px`;
                el.style.transition = `top 8s linear, opacity 8s ease-in-out`;
                el.style.opacity = '0';
                arena.appendChild(el);
                
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.top = `110%`;
                });
                
                setTimeout(() => el.remove(), 8000);
            };
        } else if (locationKey === 'comic_store') {
            const words = ['POW!', 'BAM!', 'ZAP!', 'WHAM!', 'KAPOW!'];
            const colors = ['text-yellow-400', 'text-red-500', 'text-blue-400'];
            generator = () => {
                const el = document.createElement('div');
                el.className = `absolute ${colors[Math.floor(Math.random() * colors.length)]} font-black text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] select-none pointer-events-none z-0`;
                el.innerText = words[Math.floor(Math.random() * colors.length)];
                el.style.left = `${10 + Math.random() * 80}%`;
                el.style.top = `${10 + Math.random() * 80}%`;
                el.style.transform = `scale(0.1) rotate(${(Math.random() - 0.5) * 45}deg)`;
                el.style.transition = `transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1s linear`;
                arena.appendChild(el);
                
                requestAnimationFrame(() => {
                    el.style.transform = `scale(${1 + Math.random()}) rotate(${(Math.random() - 0.5) * 45}deg)`;
                    setTimeout(() => el.style.opacity = '0', 500);
                });
                
                setTimeout(() => el.remove(), 1500);
            };
        } else {
            generator = () => {
                const el = document.createElement('div');
                el.className = 'absolute bg-white/20 rounded-full select-none pointer-events-none z-0';
                const size = 2 + Math.random() * 4;
                el.style.width = `${size}px`;
                el.style.height = `${size}px`;
                el.style.left = `${Math.random() * 100}%`;
                el.style.top = `110%`;
                el.style.transition = `top 6s linear, opacity 6s ease-in-out`;
                el.style.opacity = '0';
                arena.appendChild(el);
                
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.top = `-10%`;
                });
                
                setTimeout(() => el.remove(), 6000);
            };
        }

        const frequency = locationKey === 'comic_store' ? 1500 : 800;
        this.intervalId = setInterval(generator, frequency);
    },
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
};

function updateMapBackground() {
    const bgContainer = document.getElementById('arena-background');
    if (!bgContainer) return;
    
    const locKey = state.currentLocation || 'sheldons_apt';
    
    if (typeof backgrounds !== 'undefined' && backgrounds[locKey]) {
        bgContainer.innerHTML = backgrounds[locKey];
    } else if (typeof backgrounds !== 'undefined' && backgrounds['sheldons_apt']) {
        bgContainer.innerHTML = backgrounds['sheldons_apt'];
    }

    const hangoutBtn = document.getElementById('hangout-btn-text');
    if (hangoutBtn && hangoutBtn.parentElement) {
        if (locKey === 'sheldons_apt') {
            hangoutBtn.parentElement.style.display = 'flex';
        } else {
        if (timerDisplay) timerDisplay.innerText = `⏱️ ${bossTimer.toFixed(1)}s`;
        clearInterval(bossTimerId);
        bossTimerId = setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            bossTimer -= 0.1;
            if (bossTimer <= 0) {
                bossTimer = 0;
                failBossFight();
            }
            if (timerDisplay) timerDisplay.innerText = `⏱️ ${bossTimer.toFixed(1)}s`;
        }, 100);
        
    } else {
        // Minion Wave
        isBossActive = false;
        clearInterval(bossTimerId);
        
        if (state.minionsDefeated >= 10) {
            if (bossControls) bossControls.classList.remove('hidden');
            if (fightBossBtn) fightBossBtn.classList.remove('hidden');
            if (timerDisplay) timerDisplay.classList.add('hidden');
        } else {
            if (bossControls) bossControls.classList.add('hidden');
        }
        
        const minionPool = currentLocationData?.minionPool || minionTypes.map(m => m.key);
        const minionPoolObjects = minionPool.map(k => minionTypes.find(m => m.key === k)).filter(Boolean);
        chosenType = minionPoolObjects[Math.floor(Math.random() * minionPoolObjects.length)];
        
        currentEnemy.maxHp = Math.floor(40 * chosenType.hpMultiplier * locMultiplier * Math.pow(1.2, state.wave - 1));
    }

    currentEnemy.type = chosenType;
    currentEnemy.hp = currentEnemy.maxHp;
    
    const enemyNameEl = document.getElementById('enemy-name');
    if (enemyNameEl) {
        enemyNameEl.innerText = isBossActive ? `WAVE ${state.wave} BOSS: ${chosenType.name}` : `Lv.${state.wave} ${chosenType.name}`;
    }
    
    const enemyTypeBadge = document.getElementById('enemy-type-badge');
    if (enemyTypeBadge) {
        enemyTypeBadge.innerText = isBossActive ? '⚔️ BOSS' : `WAVE: ${state.minionsDefeated + 1}/10`;
    }
    
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
        const loreScale = chosenType.scale || (isBossActive ? 2.0 : 1.0);
        const svgContent = getVectorFrame(chosenType.key, true) || `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="gray"/></svg>`;
        frame.innerHTML = `<div class="character-vector-wrapper flex items-center justify-center text-4xl" style="transform: scale(${loreScale}); transform-origin: bottom center;">${svgContent}</div>`;
        
        // Reset animation classes
        frame.classList.remove('enemy-spawn-in', 'enemy-breathing', 'enemy-hurt', 'enemy-lunge', 'enemy-throw');
        void frame.offsetWidth; // Trigger reflow to restart CSS animations
        frame.classList.add('enemy-spawn-in', 'enemy-breathing');
    }
    
    updateEnemyHealthBar();
}

function triggerBossFight(event) {
    if(event) event.stopPropagation();
    // This function is obsolete in Ascension Protocol, bosses are automatic!
}

function failBossFight() {
    isBossActive = false;
    clearInterval(bossTimerId);
    SoundManager.play('error');
    
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

let lastEnemyAttackAnim = 0;

// MAP BACKGROUND SYSTEM
const ParticleSystem = {
    intervalId: null,
    start(locationKey) {
        this.stop();
        const arena = document.getElementById('arena');
        if (!arena) return;

        let generator;
        if (locationKey === 'sheldons_apt' || locationKey === 'caltech_labs') {
            const mathSymbols = ['E=mc²', 'π', '∑', '∫', 'Δ', 'λ', '∞', 'f(x)', 'θ', 'sin(x)'];
            generator = () => {
                const el = document.createElement('div');
                el.className = 'absolute text-green-400/30 font-mono font-bold text-lg select-none pointer-events-none z-0';
                el.innerText = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
                el.style.left = `${Math.random() * 100}%`;
                el.style.top = `-20px`;
                el.style.transition = `top 8s linear, opacity 8s ease-in-out`;
                el.style.opacity = '0';
                arena.appendChild(el);
                
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.top = `110%`;
                });
                
                setTimeout(() => el.remove(), 8000);
            };
        } else if (locationKey === 'comic_store') {
            const words = ['POW!', 'BAM!', 'ZAP!', 'WHAM!', 'KAPOW!'];
            const colors = ['text-yellow-400', 'text-red-500', 'text-blue-400'];
            generator = () => {
                const el = document.createElement('div');
                el.className = `absolute ${colors[Math.floor(Math.random() * colors.length)]} font-black text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] select-none pointer-events-none z-0`;
                el.innerText = words[Math.floor(Math.random() * colors.length)];
                el.style.left = `${10 + Math.random() * 80}%`;
                el.style.top = `${10 + Math.random() * 80}%`;
                el.style.transform = `scale(0.1) rotate(${(Math.random() - 0.5) * 45}deg)`;
                el.style.transition = `transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1s linear`;
                arena.appendChild(el);
                
                requestAnimationFrame(() => {
                    el.style.transform = `scale(${1 + Math.random()}) rotate(${(Math.random() - 0.5) * 45}deg)`;
                    setTimeout(() => el.style.opacity = '0', 500);
                });
                
                setTimeout(() => el.remove(), 1500);
            };
        } else {
            generator = () => {
                const el = document.createElement('div');
                el.className = 'absolute bg-white/20 rounded-full select-none pointer-events-none z-0';
                const size = 2 + Math.random() * 4;
                el.style.width = `${size}px`;
                el.style.height = `${size}px`;
                el.style.left = `${Math.random() * 100}%`;
                el.style.top = `110%`;
                el.style.transition = `top 6s linear, opacity 6s ease-in-out`;
                el.style.opacity = '0';
                arena.appendChild(el);
                
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.top = `-10%`;
                });
                
                setTimeout(() => el.remove(), 6000);
            };
        }

        const frequency = locationKey === 'comic_store' ? 1500 : 800;
        this.intervalId = setInterval(generator, frequency);
    },
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
};

function updateMapBackground() {
    const bgContainer = document.getElementById('arena-background');
    if (!bgContainer) return;
    
    const locKey = state.currentLocation || 'sheldons_apt';
    
    if (typeof backgrounds !== 'undefined' && backgrounds[locKey]) {
        bgContainer.innerHTML = backgrounds[locKey];
    } else if (typeof backgrounds !== 'undefined' && backgrounds['sheldons_apt']) {
        bgContainer.innerHTML = backgrounds['sheldons_apt'];
    }

    const hangoutBtn = document.getElementById('hangout-btn-text');
    if (hangoutBtn && hangoutBtn.parentElement) {
        if (locKey === 'sheldons_apt') {
            hangoutBtn.parentElement.style.display = 'flex';
        } else {
            hangoutBtn.parentElement.style.display = 'none';
        }
    }
    
    ParticleSystem.start(locKey);
}

function handleArenaTap(event) {
    if (event.target.closest('button') || event.target.closest('#shop-modal') || event.target.closest('#action-modal')) {
        return;
    }
    if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
    
    sheldonTapBuff = Math.min(3.0, sheldonTapBuff + 0.25);
    updateSheldonBuffBadge();

    const sheldonLvl = state.roster.sheldon ? state.roster.sheldon.level : 1;
    const sheldonPower = state.equipped['sheldon'] ? (characters.sheldon.baseDmg * sheldonLvl) : 1;
    const perkMult = state.perks ? (1 + (state.perks.dmgMult * 0.1)) : 1;
    
    const sheldonTalentMult = state.roster.sheldon && state.roster.sheldon.talents ? (1 + (state.roster.sheldon.talents.dmg * 0.10)) : 1;
    const tapDamage = Math.floor(sheldonPower * sheldonTalentMult * (1 + sheldonTapBuff) * perkMult * activeSynergies.dmgMult);

    const avatar = document.getElementById('modal-char-avatar');
    const name = document.getElementById('modal-char-name');
    const desc = document.getElementById('modal-char-desc');
    const power = document.getElementById('modal-char-power');
    const lane = document.getElementById('modal-char-lane');
    const badge = document.getElementById('modal-char-badge');
    const costContainer = document.getElementById('modal-cost-container');

    const dmgEl = document.getElementById('modal-stat-dmg');
    const hpEl = document.getElementById('modal-stat-hp');
    const cdEl = document.getElementById('modal-stat-cd');
    const passiveEl = document.getElementById('modal-stat-passive');

    if (avatar) avatar.innerHTML = getVectorFrame(key, false);
    if (name) name.innerText = config.name;
    if (desc) desc.innerText = config.desc;
    if (lane) lane.innerText = config.lane.toUpperCase();
    
    // Dynamic Stats Calculation
    const currLvl = Math.max(1, lvl);
    const nextLvl = currLvl + 1;
    
    const cDmg = config.baseDmg * currLvl;
    const cHp = Math.floor((config.baseHp || 100) * Math.pow(1.25, currLvl - 1));
    const cCd = Math.max(500, (config.atkSpeed || 2000) * Math.pow(0.96, currLvl - 1));
    
    const nDmg = config.baseDmg * nextLvl;
    const nHp = Math.floor((config.baseHp || 100) * Math.pow(1.25, nextLvl - 1));
    const nCd = Math.max(500, (config.atkSpeed || 2000) * Math.pow(0.96, nextLvl - 1));

    if (dmgEl) dmgEl.innerHTML = `${cDmg} <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">${nDmg}</span>`;
    if (hpEl) hpEl.innerHTML = `${cHp} <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">${nHp}</span>`;
    if (cdEl) cdEl.innerHTML = `${(cCd/1000).toFixed(1)}s <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">${(nCd/1000).toFixed(1)}s</span>`;
    
    if (passiveEl) {
        if (!config.passiveType) {
            passiveEl.innerHTML = 'N/A';
        } else {
            let cPass, nPass, unit;
            if (config.passiveType === 'heal') {
                cPass = Math.floor(config.basePassiveAmount * (1 + 0.2 * (currLvl - 1)));
                nPass = Math.floor(config.basePassiveAmount * (1 + 0.2 * (nextLvl - 1)));
                unit = ' HP';
            } else if (config.passiveType === 'rage') {
                cPass = (config.basePassiveAmount + (currLvl - 1) * 0.5).toFixed(1);
                nPass = (config.basePassiveAmount + (nextLvl - 1) * 0.5).toFixed(1);
                unit = 's';
            } else if (config.passiveType === 'poison') {
                cPass = config.basePassiveAmount + (currLvl - 1);
                nPass = config.basePassiveAmount + (nextLvl - 1);
                unit = 'x';
            }
            passiveEl.innerHTML = `${cPass}${unit} <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">${nPass}${unit}</span>`;
        }
    }
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
    if (isHired && state.roster[activeModalKey].level > 0) {
        if (isEquipped) {
            equipRowHtml = `<button onclick="executeModalAction('unequip')" class="w-full bg-rose-900 hover:bg-rose-800 text-white font-bold py-3 px-4 rounded border-2 border-rose-700 text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-colors">BENCH MEMBER</button>`;
        } else {
            equipRowHtml = `<button onclick="executeModalAction('equip')" class="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded border-2 border-emerald-500 text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors">DEPLOY TO BATTLE</button>`;
        }
    }

    let feedRowHtml = '';
    if (isHired && data && data.level > 0) {
        const foodButtons = Object.keys(state.food || {})
            .filter(f => state.food[f] > 0)
            .map(f => `<button onclick="useFoodForRecovery('${activeModalKey}', '${f}'); openModal(null, '${activeModalKey}'); renderActiveBattleLine();" class="bg-orange-600 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded text-[10px] cursor-pointer shadow border border-orange-800">${foods[f].emoji} x${state.food[f]}</button>`)
            .join('');
            
        if (foodButtons.length > 0) {
            feedRowHtml = `
                <div class="mt-2 bg-slate-900 border border-slate-700 p-2 rounded">
                    <div class="text-[8px] text-gray-400 mb-2 font-bold uppercase tracking-wider flex justify-between"><span>Use Food to Heal:</span> <span class="text-green-400">${state.roster[activeModalKey].currentHp} / ${state.roster[activeModalKey].maxHp} HP</span></div>
                    <div class="flex gap-2 flex-wrap">${foodButtons}</div>
                </div>
            `;
        } else {
            feedRowHtml = `
                <div class="mt-2 bg-slate-900 border border-slate-700 p-2 rounded text-[9px] text-gray-500 italic text-center">
                    No food available. Buy food to proactively heal!
                </div>
            `;
        }
        
        if (data.status === 'hospitalized') {
            equipRowHtml = ''; // Can't equip while in hospital
        }
    }

    footerActions.innerHTML = `
        <div class="flex flex-col gap-2 w-full">
            ${equipRowHtml}
            ${hireRowHtml}
            ${feedRowHtml}
        </div>
    `;

    // TALENTS SYSTEM RENDER
    const bpDisplay = document.getElementById('modal-bp-val');
    if (bpDisplay) bpDisplay.innerText = state.bazingaPoints || 0;
    
    const talentsContainer = document.getElementById('modal-talents-container');
    if (talentsContainer) {
        if (!state.roster[key].talents) {
            state.roster[key].talents = { dmg: 0, hp: 0 };
        }
        
        const dmgLvl = state.roster[key].talents.dmg;
        const hpLvl = state.roster[key].talents.hp;
        
        talentsContainer.innerHTML = `
            <div class="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-700">
                <div>
                    <div class="text-red-400 font-bold uppercase tracking-wider">💥 Power Strike [Lv.${dmgLvl}]</div>
                    <div class="text-[8px] text-gray-500 uppercase">+10% Base DMG</div>
                </div>
                <button onclick="buyTalent('${key}', 'dmg')" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded text-[9px] shadow cursor-pointer uppercase tracking-wider">${dmgLvl < 5 ? '1 BP' : 'MAX'}</button>
            </div>
            <div class="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-700 mt-2">
                <div>
                    <div class="text-green-400 font-bold uppercase tracking-wider">🛡️ Plot Armor [Lv.${hpLvl}]</div>
                    <div class="text-[8px] text-gray-500 uppercase">+20% Base HP</div>
                </div>
                <button onclick="buyTalent('${key}', 'hp')" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded text-[9px] shadow cursor-pointer uppercase tracking-wider">${hpLvl < 5 ? '1 BP' : 'MAX'}</button>
            </div>
        `;
    }

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

    if (mode === 'buy') {
        SoundManager.play('sheldon_level');
    } else if (mode === 'equip' || mode === 'unequip') {
        SoundManager.play('sheldon_equip');
    }

    if (!state.equipped) state.equipped = {};

    if (mode === 'buy') {
        if (state.resources.money >= currentCost) {
            state.resources.money -= currentCost;
            if (!state.roster[activeModalKey]) {
                const baseHp = config.baseHp || 100;
                state.roster[activeModalKey] = { level: 1, currentHp: baseHp, maxHp: baseHp };
                
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
                
                state.equipped[activeModalKey] = true;
            } else {
                const oldMaxHp = Math.floor((config.baseHp || 100) * Math.pow(1.25, state.roster[activeModalKey].level - 1));
                state.roster[activeModalKey].level++;
                const newMaxHp = Math.floor((config.baseHp || 100) * Math.pow(1.25, state.roster[activeModalKey].level - 1));
                
                if (typeof state.roster[activeModalKey].currentHp === 'undefined') {
                    state.roster[activeModalKey].currentHp = newMaxHp;
                } else {
                    state.roster[activeModalKey].currentHp += (newMaxHp - oldMaxHp);
                }
                state.roster[activeModalKey].maxHp = newMaxHp;
            }
        }
    } else if (mode === 'equip') {
        state.equipped[activeModalKey] = true;
    } else if (mode === 'unequip') {
        state.equipped[activeModalKey] = false;
        delete state.equipped[activeModalKey];
    }

    saveProgress();
    syncUI();
    renderRosterGrid();
    renderActiveBattleLine();
    calculateSynergies();
    startAutomationEngines();
    
    if (mode === 'buy') {
        openModal(null, activeModalKey);
    } else {
        closeModal();
    }
    if (state.score > 0) {
        // checkMilestones();
    }
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

    let deployedCount = state.robots.filter(r => r && r.equipped).length;

    grid.innerHTML = `
        <div class="col-span-2 bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center text-[8px] mb-1">
            <span class="text-gray-400">DEPLOYED BOTS:</span>
            <span class="${deployedCount >= state.botSlots ? 'text-amber-400' : 'text-emerald-400'}">${deployedCount}/${state.botSlots} SLOTS</span>
        </div>
    `;

    const btnBuy = document.getElementById('buy-bot-slot-btn');
    const slotCount = document.getElementById('bot-slot-count');
    if (slotCount) slotCount.innerText = `SLOTS: ${deployedCount}/${state.botSlots}`;
    
    if (btnBuy) {
        if (state.botSlots >= 3) {
            btnBuy.classList.add('hidden');
        } else {
            btnBuy.classList.remove('hidden');
            const cost = state.botSlots === 1 ? 500 : 2500; // 500 for slot 2, 2500 for slot 3
            btnBuy.innerText = `💳 BUY SLOT ($${cost})`;
            if (state.resources.money < cost) {
                btnBuy.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                btnBuy.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
    }

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
                    <div class="w-10 h-12 flex-shrink-0 bg-black rounded p-0.5 text-[8px] flex items-center justify-center">${getVectorFrame(key, false) || '🤖'}</div>
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
    
    if (key === 'r2d2_unit') {
        SoundManager.play('shelbot');
    } else {
        const botSounds = ['bot_step', 'bot_ambience', 'bot_glitch'];
        const randomSnd = botSounds[Math.floor(Math.random() * botSounds.length)];
        SoundManager.play(randomSnd);
    }
    
    const config = robots[key];
    const data = state.robotRoster[key];
    const lvl = data ? data.level : 0;
    
    // Scale cost based on level (each level costs 1.6x more)
    const craftCost = {};
    for (const [res, amt] of Object.entries(config.cost)) {
        craftCost[res] = Math.floor(amt * Math.pow(1.6, lvl));
    }
    
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

    if (avatar) avatar.innerHTML = getVectorFrame(key, false) || '🤖';
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

    let equipRowHtml = '';
    if (lvl > 0) {
        const isCurrentlyEquipped = state.robots.some(r => r.blueprintId === key && r.equipped);
        if (isCurrentlyEquipped) {
            equipRowHtml = `
                <button onclick="executeRobotUnequip('${key}')" class="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded border border-red-700 shadow-sm mb-2">
                    ⚠️ UNEQUIP BOT
                </button>
            `;
        } else {
            const deployedCount = state.robots.filter(r => r && r.equipped).length;
            const canEquip = deployedCount < state.botSlots;
            const equipBtnClass = canEquip 
                ? "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded shadow-md mb-2"
                : "w-full bg-gray-800 text-gray-500 font-bold py-2.5 text-[10px] cursor-not-allowed uppercase border border-gray-700 shadow-md mb-2";
            
            equipRowHtml = `
                <button onclick="executeRobotEquip('${key}')" ${!canEquip ? 'disabled' : ''} class="${equipBtnClass}">
                    ${canEquip ? '⚔️ EQUIP BOT' : '❌ NO SLOTS AVAILABLE'}
                </button>
            `;
        }
    }

    footerActions.innerHTML = `
        <div class="flex flex-col gap-2 w-full">
            ${equipRowHtml}
            <button id="robot-craft-btn" onclick="executeRobotCraft('${key}')" ${!canAfford ? 'disabled' : ''} class="${craftButtonClass}">
                🔧 START CRAFTING (UPGRADE)
            </button>
        </div>
    `;

    const robotModal = document.getElementById('robot-action-modal');
    if (robotModal) robotModal.classList.remove('hidden');
}

function closeRobotModal() {
    const robotModal = document.getElementById('robot-action-modal');
    if (robotModal) robotModal.classList.add('hidden');
    activeRobotKey = null;
}

function executeRobotEquip(key) {
    if (!key) return;
    const config = robots[key];
    const data = state.robotRoster[key];
    if (!data || data.level <= 0) return;

    const deployedCount = state.robots.filter(r => r && r.equipped).length;
    if (deployedCount >= state.botSlots) return;

    state.robots.push({
        id: `${key}_${Date.now()}`,
        blueprintId: key,
        name: config.name,
        type: config.type,
        lane: config.lane,
        level: data.level,
        equipped: true
    });

    saveProgress();
    syncUI();
    renderRobotRoster();
    renderRobotBattleLine();
    calculateSynergies();
    startRobotAutomation();
    closeRobotModal();
}

function executeRobotUnequip(key) {
    state.robots = state.robots.filter(r => r.blueprintId !== key);
    saveProgress();
    syncUI();
    renderRobotRoster();
    renderRobotBattleLine();
    calculateSynergies();
    startRobotAutomation();
    closeRobotModal();
}

function buyBotSlot() {
    if (state.botSlots >= 3) return;
    const cost = state.botSlots === 1 ? 500 : 2500;
    
    if (state.resources.money >= cost) {
        state.resources.money -= cost;
        state.botSlots++;
        saveProgress();
        syncUI();
        renderRobotRoster();
    }
}

function executeRobotCraft(key) {
    if (!key) return;
    const config = robots[key];
    const data = state.robotRoster[key];
    const lvl = data ? data.level : 0;
    
    // Scale cost based on level
    const craftCost = {};
    for (const [res, amt] of Object.entries(config.cost)) {
        craftCost[res] = Math.floor(amt * Math.pow(1.6, lvl));
    }

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
        
        // Try to auto-deploy if no bot is currently equipped
        const canDeploy = state.robots.length < 1;
        if (canDeploy) {
            const robotId = `${item.blueprintId}_${Date.now()}`;
            state.robots = [{
                id: robotId,
                blueprintId: item.blueprintId,
                name: item.robotName,
                type: config.type,
                lane: config.lane,
                level: state.robotRoster[item.blueprintId].level,
                equipped: true
            }];
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

// FOOD SHOP SYSTEM
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
                enemyEl.style.right = `${2 + (i * 12)}%`;
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
        openModal(null, charKey);
        renderRosterGrid();
        renderHospitalPlace();
    }
};
