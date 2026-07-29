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

