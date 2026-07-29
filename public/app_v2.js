// ============================================================
// NUMBER FORMATTING — compact display for large numbers
// ============================================================
// Global flags:
// - gameStarted: combat/badges/damage are suppressed until title screen is dismissed
// - storySequenceActive: suppress combat sounds/fx while playing intro/tutorial
window.gameStarted = false;
window.storySequenceActive = false;
function formatNumber(num, decimals) {
    if (num === null || num === undefined || isNaN(num)) return '0';
    num = Number(num);
    if (decimals === undefined) decimals = 1;
    var isNeg = num < 0;
    var abs = Math.abs(num);
    if (abs < 1000) return (isNeg ? '-' : '') + Math.floor(abs).toString();
    var suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
    var tier = Math.floor(Math.log10(abs) / 3);
    if (tier >= suffixes.length) {
        // For extremely large numbers, use compact scientific notation
        var exp = Math.floor(Math.log10(abs));
        var mantissa = abs / Math.pow(10, exp);
        return (isNeg ? '-' : '') + mantissa.toFixed(2) + 'e' + exp;
    }
    var scaled = abs / Math.pow(10, tier * 3);
    // Remove trailing zeros from decimals
    var formatted = scaled.toFixed(decimals);
    formatted = formatted.replace(/\.?0+$/, '');
    return (isNeg ? '-' : '') + formatted + suffixes[tier];
}

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
        // Suppress combat sounds during story/tutorial sequence
        if (window.storySequenceActive) return;
        
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
        // Suppress combat FX during story/tutorial sequence
        if (window.storySequenceActive) return;
        
        const nowMs = Date.now();
        
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
            gain.gain.setValueAtTime(vol * 0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'slash') {
            // Melee "swoosh"
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.linearRampToValueAtTime(50, now + 0.15);
            gain.gain.setValueAtTime(0.01, now);
            gain.gain.linearRampToValueAtTime(vol * 0.8, now + 0.05);
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
function getVectorFrame(key, isEnemy, animState) {
    if (typeof isEnemy === 'undefined') isEnemy = false;
    if (typeof animState === 'undefined') animState = 'idle';
    if (typeof vectors === 'undefined') return '';
    
    const isKidCharacter = typeof key === 'string' && (
        key.indexOf('ys_') === 0 ||
        (typeof characters !== 'undefined' && characters[key] && characters[key].era === 'young_sheldon')
    );
    
    // Check if this character has an active skin (not default)
    if (!isEnemy && state && state.roster && state.roster[key]) {
        var charState = state.roster[key];
        if (charState.activeSkin && charState.activeSkin !== 'default') {
            var skinKey = key + '_' + charState.activeSkin;
            if (vectors[skinKey]) {
                if (typeof vectors[skinKey] === 'string') return vectors[skinKey];
                if (animState === 'attack' && vectors[skinKey].attack) return vectors[skinKey].attack;
                if (animState === 'injured' && vectors[skinKey].injured) return vectors[skinKey].injured;
                if (animState === 'attack1' && vectors[skinKey].attack1) return vectors[skinKey].attack1;
                if (animState === 'attack2' && vectors[skinKey].attack2) return vectors[skinKey].attack2;
                return vectors[skinKey].idle || '';
            }
        }
    }
    
    // Default vector lookup
    if (!vectors[key]) return '';
    if (typeof vectors[key] === 'string') return vectors[key];
    var result;
    if (animState === 'attack' && vectors[key].attack) result = vectors[key].attack;
    else if (animState === 'injured' && vectors[key].injured) result = vectors[key].injured;
    else if (animState === 'attack1' && vectors[key].attack1) result = vectors[key].attack1;
    else if (animState === 'attack2' && vectors[key].attack2) result = vectors[key].attack2;
    else result = vectors[key].idle || '';
    // Safety: always return a string, never an object
    if (typeof result !== 'string') {
        console.warn('[getVectorFrame] Non-string result for key:', key, typeof result);
        return '';
    }
    
    if (isKidCharacter) {
        result = result.replace(/<svg\b([^>]*)>/, function(match, attrs) {
            if (attrs && /style\s*=/.test(attrs)) return match;
            return '<svg' + attrs + ' style="display:block;transform:scale(0.9);transform-origin:center bottom;">';
        });
    }
    
    return result;
}

// Swap character SVG to attack frame briefly, then back to idle/injured
function swapCharacterFrame(key, animState, durationMs) {
    var el = document.getElementById('live-character-' + key);
    if (!el) return;
    var wrapper = el.querySelector('.character-vector-wrapper');
    if (!wrapper) return;
    var newSvg = getVectorFrame(key, false, animState);
    if (!newSvg) return;
    wrapper.innerHTML = newSvg;
    // Add attacking class for CSS pulse
    el.classList.add('char-attacking');
    setTimeout(function() {
        el.classList.remove('char-attacking');
        // Return to idle or injured based on current HP
        var charData = state.roster[key];
        var config = characters[key];
        if (charData && config) {
            var maxHp = charData.maxHp || (config.baseHp || 100);
            var hpPct = typeof charData.currentHp !== 'undefined' ? (charData.currentHp / maxHp) * 100 : 100;
            var returnState = (hpPct < 50 && hpPct > 0) ? 'injured' : 'idle';
            var returnSvg = getVectorFrame(key, false, returnState);
            if (returnSvg) wrapper.innerHTML = returnSvg;
            // Toggle injured class
            if (returnState === 'injured') el.classList.add('char-injured');
            else el.classList.remove('char-injured');
        }
    }, durationMs || 300);
}

// Spawn enemy laser beam attack from enemy toward a character
function spawnEnemyProjectile(charKey, isBoss) {
    var arena = document.getElementById('arena');
    var enemyEl = document.getElementById('enemy-container');
    var charEl = document.getElementById('live-character-' + charKey);
    if (!arena || !enemyEl || !charEl) return;
    
    var arenaRect = arena.getBoundingClientRect();
    var enemyRect = enemyEl.getBoundingClientRect();
    var charRect = charEl.getBoundingClientRect();
    
    // Calculate start (enemy center) and end (character center) relative to arena
    var startX = enemyRect.left + enemyRect.width / 2 - arenaRect.left;
    var startY = enemyRect.top + enemyRect.height / 2 - arenaRect.top;
    var endX = charRect.left + charRect.width / 2 - arenaRect.left;
    var endY = charRect.top + charRect.height / 2 - arenaRect.top;
    
    // Calculate beam angle and length
    var dx = endX - startX;
    var dy = endY - startY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // 1. Enemy charge-up glow at the fire point
    var chargeGlow = document.createElement('div');
    chargeGlow.className = 'enemy-charge-glow' + (isBoss ? ' enemy-charge-glow-boss' : '');
    chargeGlow.style.left = startX + 'px';
    chargeGlow.style.top = startY + 'px';
    arena.appendChild(chargeGlow);
    setTimeout(function() { if (chargeGlow.parentNode) chargeGlow.remove(); }, 500);
    
    // 2. Enemy body recoil animation
    if (enemyEl) {
        enemyEl.classList.remove('enemy-laser-recoil');
        void enemyEl.offsetWidth;
        enemyEl.classList.add('enemy-laser-recoil');
        setTimeout(function() { enemyEl.classList.remove('enemy-laser-recoil'); }, 400);
    }
    
    // 3. Laser beam line (rotated div from start to end)
    var beam = document.createElement('div');
    beam.className = 'enemy-laser-beam' + (isBoss ? ' enemy-laser-beam-boss' : '');
    beam.style.left = startX + 'px';
    beam.style.top = startY + 'px';
    beam.style.width = distance + 'px';
    beam.style.transform = 'rotate(' + angle + 'deg)';
    arena.appendChild(beam);
    setTimeout(function() { if (beam.parentNode) beam.remove(); }, 500);
    
    // 4. Impact burst at the character (delayed to match beam travel)
    setTimeout(function() {
        var impact = document.createElement('div');
        impact.className = 'laser-impact-burst' + (isBoss ? ' laser-impact-burst-boss' : '');
        impact.style.left = endX + 'px';
        impact.style.top = endY + 'px';
        arena.appendChild(impact);
        setTimeout(function() { if (impact.parentNode) impact.remove(); }, 400);
    }, 130);
}




// ============================================================
// AUTH FLOW SYSTEM
// ============================================================
var authPhaseShown = false;
var bossMaxTime = 20;

function showAuthScreen() {
    if (authPhaseShown) return;
    authPhaseShown = true;
    
    var logoPhase = document.getElementById('logo-phase');
    var authPhase = document.getElementById('auth-phase');
    var titleScreen = document.getElementById('title-screen');
    
    if (logoPhase) logoPhase.style.display = 'none';
    if (authPhase) authPhase.classList.remove('hidden');
    if (titleScreen) { titleScreen.style.cursor = 'default'; titleScreen.onclick = null; }
}

function switchAuthTab(tab) {
    var loginForm = document.getElementById('auth-login-form');
    var signupForm = document.getElementById('auth-signup-form');
    var loginTab = document.getElementById('auth-tab-login');
    var signupTab = document.getElementById('auth-tab-signup');
    var errEl = document.getElementById('auth-error');
    var sucEl = document.getElementById('auth-success');
    if (errEl) { errEl.classList.add('hidden'); errEl.innerText = ''; }
    if (sucEl) { sucEl.classList.add('hidden'); sucEl.innerText = ''; }
    
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.className = loginTab.className.replace('bg-slate-800 text-gray-400 border-slate-700', 'bg-yellow-600 text-white border-yellow-500');
        signupTab.className = signupTab.className.replace('bg-yellow-600 text-white border-yellow-500', 'bg-slate-800 text-gray-400 border-slate-700').replace('bg-green-600 text-white border-green-500', 'bg-slate-800 text-gray-400 border-slate-700');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        signupTab.className = signupTab.className.replace('bg-slate-800 text-gray-400 border-slate-700', 'bg-green-600 text-white border-green-500');
        loginTab.className = loginTab.className.replace('bg-yellow-600 text-white border-yellow-500', 'bg-slate-800 text-gray-400 border-slate-700');
    }
}

function showAuthError(msg) {
    var el = document.getElementById('auth-error');
    if (el) { el.innerText = msg; el.classList.remove('hidden'); }
    var suc = document.getElementById('auth-success');
    if (suc) suc.classList.add('hidden');
}

function showAuthSuccess(msg) {
    var el = document.getElementById('auth-success');
    if (el) { el.innerText = msg; el.classList.remove('hidden'); }
    var err = document.getElementById('auth-error');
    if (err) err.classList.add('hidden');
}

async function handleLogin() {
    var email = document.getElementById('login-email').value.trim();
    var password = document.getElementById('login-password').value;
    if (!email || !password) return showAuthError('Please fill in all fields');
    
    document.getElementById('login-btn').innerText = 'Logging in...';
    document.getElementById('login-btn').disabled = true;
    
    var result = await supabaseLogin(email, password);
    
    if (result.error) {
        showAuthError(result.error.message);
        document.getElementById('login-btn').innerText = '⚡ Login';
        document.getElementById('login-btn').disabled = false;
        return;
    }
    
    // Check if player has local progress (they were playing as guest)
    var hasLocalProgress = (state.wave > 1 || state.score > 0);
    
    // Try loading cloud save
    var cloudLoaded = await loadFromCloud();
    
    if (cloudLoaded) {
        // Cloud save exists and was loaded — use it
        console.log('[LOGIN] Cloud save loaded');
    } else if (hasLocalProgress) {
        // No cloud save but player has local progress — migrate it
        console.log('[LOGIN] Migrating local progress to cloud...');
        await migrateLocalToCloud();
    }
    // else: no save anywhere, fresh start
    
    showAuthSuccess('Welcome back, ' + (currentUser.username || 'Player') + '!');
    setTimeout(function() { launchGame(); }, 1000);
}


async function handleSignup() {
    var username = document.getElementById('signup-username').value.trim();
    var email = document.getElementById('signup-email').value.trim();
    var password = document.getElementById('signup-password').value;
    
    if (!username || !email || !password) return showAuthError('Please fill in all fields');
    if (password.length < 6) return showAuthError('Password must be at least 6 characters');
    if (username.length < 3) return showAuthError('Username must be at least 3 characters');
    
    document.getElementById('signup-btn').innerText = 'Creating...';
    document.getElementById('signup-btn').disabled = true;
    
    var result = await supabaseSignUp(email, password, username);
    
    if (result.error) {
        showAuthError(result.error.message);
        document.getElementById('signup-btn').innerText = '🚀 Create Account';
        document.getElementById('signup-btn').disabled = false;
        return;
    }
    
    // Auto-login after signup and migrate any existing local save
    var loginResult = await supabaseLogin(email, password);
    if (!loginResult.error) {
        await migrateLocalToCloud();
        showAuthSuccess('Account created! Welcome, ' + username + '!');
        setTimeout(function() { launchGame(); }, 1200);
    } else {
        showAuthSuccess('Account created! Please check your email to confirm, then login.');
        document.getElementById('signup-btn').innerText = '🚀 Create Account';
        document.getElementById('signup-btn').disabled = false;
    }
}

function startAsGuest() {
    isGuest = true;
    currentUser = null;
    launchGame();
}

function launchGame() {
    startGameEngine();
    updateOnlineStatus();
    // Delay season sync until after intro cutscene finishes
    function seasonSyncWhenReady() {
        if (window._introCutscenePlaying) {
            setTimeout(seasonSyncWhenReady, 2000);
            return;
        }
        if (typeof checkSeasonSync === 'function') checkSeasonSync();
    }
    setTimeout(seasonSyncWhenReady, 1000);
}

function updateOnlineStatus() {
    var el = document.getElementById('online-status');
    if (!el) {
        // Create status indicator in header
        var header = document.querySelector('#arena');
        if (!header) return;
        el = document.createElement('div');
        el.id = 'online-status';
        el.style.cssText = 'position:absolute;top:4px;left:50%;transform:translateX(-50%);z-index:55;text-align:center;pointer-events:auto;';
        header.appendChild(el);
    }
    
    if (isGuest) {
        el.innerHTML = '<div style="font-size:7px;color:#64748b;background:rgba(0,0,0,0.6);padding:2px 8px;box-sizing:border-box;border-radius:4px;border:1px solid #334155;cursor:pointer;" onclick="showConnectPrompt()">👤 Guest Mode</div>';
    } else {
        el.innerHTML = '<div style="font-size:7px;color:#22c55e;background:rgba(0,0,0,0.6);padding:2px 8px;box-sizing:border-box;border-radius:4px;border:1px solid #166534;">🟢 ' + (currentUser.username || 'Online') + '</div>';
    }
}

function showConnectPrompt() {
    var modal = document.getElementById('title-screen');
    // Re-show title screen as auth modal
    if (modal) {
        modal.style.opacity = '1';
        modal.style.display = 'flex';
        modal.style.pointerEvents = 'all';
        var logoPhase = document.getElementById('logo-phase');
        var authPhase = document.getElementById('auth-phase');
        if (logoPhase) logoPhase.style.display = 'none';
        if (authPhase) authPhase.classList.remove('hidden');
        modal.onclick = null;
        modal.style.cursor = 'default';
    }
}

// ============================================================
// LEADERBOARD SYSTEM
// ============================================================
window.currentLeaderboardTab = 'score';

async function switchLeaderboardTab(tabName, event) {
    if (event) event.stopPropagation();
    window.currentLeaderboardTab = tabName;
    
    document.querySelectorAll('.lb-tab-btn').forEach(btn => {
        btn.className = 'lb-tab-btn bg-slate-900/60 text-slate-400 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-slate-800';
    });
    const activeBtn = document.getElementById('lb-tab-' + tabName);
    if (activeBtn) {
        activeBtn.className = 'lb-tab-btn active bg-yellow-900/60 text-yellow-400 border border-yellow-700 px-3 py-1 rounded-lg text-[10px] font-bold';
    }

    var list = document.getElementById('leaderboard-list');
    if (list) list.innerHTML = '<div class="text-center text-gray-500 py-8 animate-pulse">Loading leaderboard...</div>';
    
    var seasonSel = document.getElementById('season-selector');
    var seasonId = seasonSel ? seasonSel.value : 'current';
    var data = await fetchLeaderboard(50, tabName, seasonId);
    renderLeaderboard(data, tabName);
}

async function openLeaderboard(event) {
    if (event) event.stopPropagation();
    var modal = document.getElementById('leaderboard-modal');
    if (modal) modal.classList.remove('hidden');
    // Populate seasons dropdown
    if (typeof supabase !== 'undefined') {
        supabase.from('season_history').select('season_id, name').order('season_id', { ascending: false }).then(function(res) {
            if (res.data) {
                var sel = document.getElementById('season-selector');
                if (!sel) return;
                var currentVal = sel.value;
                sel.innerHTML = '<option value="current">Current Season</option>';
                res.data.forEach(function(s) {
                    sel.innerHTML += '<option value="' + s.season_id + '">' + s.name + '</option>';
                });
                sel.value = currentVal;
            }
        });
    }

    switchLeaderboardTab(window.currentLeaderboardTab || 'score');
}

function closeLeaderboard() {
    var modal = document.getElementById('leaderboard-modal');
    if (modal) modal.classList.add('hidden');
}

function renderLeaderboard(data, tabName = 'score') {
    var list = document.getElementById('leaderboard-list');
    if (!list) return;
    
    if (!data || data.length === 0) {
        list.innerHTML = '<div class="text-center text-gray-500 py-8">No players yet. Be the first!</div>';
        return;
    }
    
    var h = '';
    for (var i = 0; i < data.length; i++) {
        var p = data[i];
        var rankIcon = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1);
        var rankColor = i === 0 ? 'border-yellow-500 bg-yellow-950/40' : i === 1 ? 'border-gray-400 bg-slate-900/60' : i === 2 ? 'border-amber-700 bg-amber-950/30' : 'border-slate-700 bg-slate-900/40';
        var isMe = currentUser && p.id === currentUser.id;
        
        var lineupEmojis = '';
        if (p.lineup && Array.isArray(p.lineup)) {
            var charEmojis = { sheldon:'🧪', penny:'🍕', leonard:'🔬', howard:'🚀', raj:'⭐', amy:'🧬', bernie:'💊', stuart:'🎨' };
            p.lineup.forEach(function(c) { lineupEmojis += (charEmojis[c.char] || '❓'); });
        }
        
        var locName = p.location || 'Unknown';
        if (typeof locations !== 'undefined' && locations[p.location]) locName = locations[p.location].name;
        
        h += '<div class="border-2 ' + rankColor + ' rounded-lg p-2.5 flex items-center gap-3 cursor-pointer hover:bg-slate-800/60 transition-all' + (isMe ? ' ring-2 ring-yellow-500/50' : '') + '" onclick="viewPlayerProfile(\'' + p.id + '\')">';
        h += '<div class="text-lg font-black min-w-[30px] text-center">' + rankIcon + '</div>';
        h += '<div class="flex-1 min-w-0">';
        h += '<div class="font-bold text-white text-[11px] truncate">' + (p.username || 'Unknown') + (isMe ? ' <span class=\"text-yellow-400 text-[8px]\">(YOU)</span>' : '') + '</div>';
        h += '<div class="text-[8px] text-gray-500">Wave ' + (p.wave || 1) + ' • ' + locName + '</div>';
        h += '<div class="text-[9px] mt-0.5">' + (lineupEmojis || 'No lineup') + '</div>';
        h += '</div>';
        h += '<div class="text-right">';
        let val = 0; let lbl = ''; let clr = 'text-yellow-400';
        if (tabName === 'score') { val = (p.score || 0).toLocaleString(); lbl = 'SCORE'; }
        else if (tabName === 'wave') { val = (p.wave || 1); lbl = 'WAVE'; clr = 'text-emerald-400'; }
        else if (tabName === 'trophies') { val = (p.trophies || 0).toLocaleString(); lbl = 'TROPHY'; clr = 'text-cyan-400'; }
        h += '<div class="font-black ' + clr + ' text-[11px]">' + val + '</div>';
        h += '<div class="text-[7px] text-gray-500">' + lbl + '</div>';
        h += '</div></div>';
    }
    
    list.innerHTML = h;
}

async function viewPlayerProfile(userId) {
    var modal = document.getElementById('player-profile-modal');
    var content = document.getElementById('player-profile-content');
    if (!modal || !content) return;
    
    content.innerHTML = '<div class="text-center text-gray-500 py-4 animate-pulse">Loading...</div>';
    modal.classList.remove('hidden');
    
    var { data } = await supabase.from('leaderboard').select('*').eq('id', userId).single();
    if (!data) { content.innerHTML = '<div class="text-center text-red-400 py-4">Player not found</div>'; return; }
    
    var charEmojis = { sheldon:'🧪', penny:'🍕', leonard:'🔬', howard:'🚀', raj:'⭐', amy:'🧬', bernie:'💊', stuart:'🎨' };
    
    var h = '<div class="text-center mb-4 relative">';
    h += `<div class="absolute right-0 top-0"><button onclick="startSpectating('${userId}', '${(data.username || 'Unknown').replace(/'/g, "\\'")}')" class="bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] px-3 py-1.5 rounded font-bold uppercase hover:bg-cyan-900 transition-colors shadow mr-1">👁️ VISIT</button></div>`;
    h += '<div class="text-3xl mb-1">🧪</div>';
    h += '<div class="text-lg font-black text-white">' + (data.username || 'Unknown') + '</div>';
    h += '<div class="text-[9px] text-gray-500">Score: ' + (data.score || 0).toLocaleString() + ' • Wave: ' + (data.wave || 1) + '</div>';
    h += '</div>';
    
    h += '<div class="border-t border-slate-700 pt-3 mb-3">';
    h += '<div class="text-[9px] font-bold text-cyan-400 uppercase tracking-wider mb-2">📋 Lineup</div>';
    if (data.lineup && data.lineup.length > 0) {
        h += '<div class="flex flex-wrap gap-2">';
        data.lineup.forEach(function(c) {
            h += '<div class="bg-slate-800 border border-slate-600 rounded-lg px-2 py-1 text-center min-w-[50px]">';
            
            var svg = '';
            if (c.skin && c.skin !== 'default' && typeof getVectorFrameForSkin === 'function') {
                var rawSprite = getVectorFrameForSkin(c.char, c.skin);
                svg = typeof rawSprite === 'string' ? rawSprite : (rawSprite.idle || '');
            } else if (typeof vectors !== 'undefined' && vectors[c.char]) {
                svg = typeof vectors[c.char] === 'string' ? vectors[c.char] : (vectors[c.char].idle || '');
            }
            
            if (svg) {
                h += '<div style="width:36px;height:40px;display:flex;align-items:flex-end;justify-content:center;margin:0 auto 2px;">' + svg + '</div>';
            } else {
                h += '<div class="text-lg">' + (charEmojis[c.char] || '❓') + '</div>';
            }
            
            h += '<div class="text-[8px] text-white font-bold">' + (c.char || '?') + '</div>';
            h += '<div class="text-[7px] text-yellow-400">Lv.' + (c.level || 1) + '</div></div>';
        });
        h += '</div>';
    } else { h += '<div class="text-[9px] text-gray-600">No characters deployed</div>'; }
    h += '</div>';
    
    if (data.robots && data.robots.length > 0) {
        h += '<div class="border-t border-slate-700 pt-3 mb-3">';
        h += '<div class="text-[9px] font-bold text-cyan-400 uppercase tracking-wider mb-2">🤖 Robots</div>';
        h += '<div class="flex flex-wrap gap-2">';
        data.robots.forEach(function(r) {
            h += '<div class="bg-slate-800 border border-slate-600 rounded-lg px-2 py-1 text-center min-w-[50px]">';
            
            var svg = '';
            if (typeof vectors !== 'undefined' && vectors[r.name]) {
                svg = typeof vectors[r.name] === 'string' ? vectors[r.name] : (vectors[r.name].idle || '');
            }
            
            if (svg) {
                h += '<div style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;margin:0 auto 2px;">' + svg + '</div>';
            } else {
                h += '<div class="text-sm">🤖</div>';
            }
            
            h += '<div class="text-[7px] text-white font-bold">' + (r.name || '?') + '</div>';
            h += '<div class="text-[6px] text-yellow-400">Lv.' + (r.level || 1) + '</div></div>';
        });
        h += '</div></div>';
    }
    
    if (data.skill_tree && Object.keys(data.skill_tree).length > 0) {
        h += '<div class="border-t border-slate-700 pt-3">';
        h += '<div class="text-[9px] font-bold text-cyan-400 uppercase tracking-wider mb-2">⚡ Skills Unlocked</div>';
        h += '<div class="text-[9px] text-green-400">' + Object.keys(data.skill_tree).length + ' skill nodes</div>';
        h += '</div>';
    }
    
    content.innerHTML = h;
}


function initGame() {
    // Warn if running from file:// — saves won't persist
    if (window.location.protocol === 'file:') {
        console.warn('[TBBT] Running from file:// protocol — localStorage may not work! Use http://localhost instead.');
        setTimeout(function() {
            var banner = document.createElement('div');
            banner.style.cssText = 'position:fixed;bottom:60px;left:50%;transform:translateX(-50%);z-index:99999;background:rgba(30,20,10,0.92);color:#fbbf24;padding:6px 14px;box-sizing:border-box;text-align:center;font-size:9px;font-weight:bold;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.5);border:1px solid rgba(251,191,36,0.3);border-radius:8px;backdrop-filter:blur(8px);max-width:280px;transition:opacity 0.5s;';
            banner.innerHTML = '⚠️ Use <u>http://localhost/tbbt-idle-game/public/</u> for save persistence';
            banner.onclick = function() { banner.remove(); };
            document.body.appendChild(banner);
            // Auto-dismiss after 5 seconds
            setTimeout(function() { if (banner.parentNode) { banner.style.opacity = '0'; setTimeout(function() { banner.remove(); }, 500); } }, 5000);
        }, 1500);
    }
    // Initialize Supabase
    if (typeof initSupabase === 'function') initSupabase();
    if (typeof supabaseGetSession === 'function') {
        supabaseGetSession().then(async function(session) {
            if (session) {
                updateOnlineStatus();
                if (typeof initGuildSystem === 'function') initGuildSystem();
                if (typeof loadPlayerPool === 'function') loadPlayerPool();
                
                // CRITICAL FIX: Prevent data loss on new devices or cleared cache
                try {
                    const saveResult = await supabase.from('game_saves').select('state').eq('id', currentUser.id).maybeSingle();
                    if (saveResult.data && saveResult.data.state) {
                        const cloudState = saveResult.data.state;
                        
                        // Determine true local time: if local save is essentially empty, treat its time as 0
                        const hasLocalProgress = (state.wave > 1 || state.score > 0);
                        const localTime = hasLocalProgress ? (state.lastOnlineTimestamp || 0) : 0;
                        const cloudTime = cloudState.lastOnlineTimestamp || 0;
                        const hasCloudProgress = (cloudState.wave > 1 || cloudState.score > 0);
                        
                        // Load cloud save if it has progress AND is newer (or local is empty)
                        if (hasCloudProgress && cloudTime > localTime) {
                            console.log('[Sync] Cloud save is newer or local is empty, loading from cloud...');
                            
                            // Deep merge roster to prevent losing unpurchased character keys
                            const newRoster = { ...state.roster, ...(cloudState.roster || {}) };
                            const newFormation = cloudState.formation || state.formation;
                            
                            Object.assign(state, cloudState);
                            state.roster = newRoster;
                            state.formation = newFormation;
                            
                            ensureSkinData();
                            saveProgress(); // Update local storage
                        }
                    }
                } catch (e) {
                    console.error('[Sync] Failed to fetch cloud save on session resume:', e);
                }
                
                // ═══ ONE-TIME MOD: Sheldog ═══
                if (currentUser && currentUser.email === 'brylehahaha@gmail.com' && !state._modApplied) {
                    console.log('🔧 APPLYING MOD FOR SHELDOG...');
                    state._modApplied = true;
                    state.resources = { money: 999999999, stone: 999999999, iron: 999999999, gold: 999999999, diamond: 999999999, scrap: 999999999 };
                    state.wave = 300;
                    state.score = 99999999;
                    state.minionsDefeated = 999999;
                    state.bazingaPoints = 999999;
                    // Auto-unlock era starter characters
                    if (!state.roster.mv_true_sheldon) state.roster.mv_true_sheldon = { level: 1, currentHp: 120, maxHp: 120, status: 'idle', xp: 0 };
                    if (!state.roster.gen_architect) state.roster.gen_architect = { level: 1, currentHp: 130, maxHp: 130, status: 'idle', xp: 0 };
                    state.perks = { dmgMult: 50, dropMult: 50, robotDmgMult: 50 };
                    state.story_wave80_seen = true;
                    state.story_wave150_seen = true;
                    state.story_wave250_seen = true;
                    state.hasSeenIntro = true;
                    state.tutorialComplete = true;
                    state.tutorialSkipped = true;
                    state.pvp = state.pvp || {};
                    state.pvp.trophies = 9999;
                    state.pvp.league = 'Legends';
                    state.pvp.wins = 999;
                    state.stats = state.stats || {};
                    state.stats.highestWave = 300;
                    state.stats.totalKills = 999999;
                    state.stats.bossKills = 9999;
                    state.stats.moneyEarned = 999999999;
                    state.stats.totalDamage = 999999999;
                    state.stats.locationsUnlocked = 16;
                    state.unlockedLocations = [
                        'sheldons_apt','pennys_apt','chocolate_factory','cheesecake_factory',
                        'bernie_house','comic_store','howards_house','rajs_apt','pasadena_museum','caltech',
                        'ys_cooper_home','ys_high_school','ys_texas_ranch','ys_desert','ys_museum','ys_chaos_lab'
                    ];
                    var foodKeys = Object.keys(state.food || {});
                    for (var fi = 0; fi < foodKeys.length; fi++) state.food[foodKeys[fi]] = 9999;
                    var allSkins = ['default','animal','army','justice','starwars','mythology','prime'];
                    for (var ck in characters) {
                        if (!state.roster[ck]) state.roster[ck] = { level:0, currentHp:100, maxHp:100, status:'healthy', hospitalEndTime:0, activeSkin:'default', unlockedSkins:['default'] };
                        state.roster[ck].level = 100;
                        var hpSc = characters[ck].lane === 'front' ? 1.40 : 1.25;
                        var mHp = Math.floor((characters[ck].baseHp || 100) * Math.pow(hpSc, 99));
                        state.roster[ck].maxHp = mHp;
                        state.roster[ck].currentHp = mHp;
                        state.roster[ck].status = 'healthy';
                        state.roster[ck].hospitalEndTime = 0;
                        state.roster[ck].unlockedSkins = allSkins.slice();
                        state.roster[ck].activeSkin = 'mythology';
                    }
                    state.equipped = { sheldon:true, penny:true, leonard:true, howard:true, raj:true };
                    state.lastOnlineTimestamp = Date.now();
                    ensureSkinData();
                    saveProgress();
                    console.log('✅ SHELDOG MOD COMPLETE — Wave 200, All L100, 999M resources');
                }
                // ═══ END MOD ═══

                launchGame();
            }
        });
    }
    SoundManager.init();
    SoundManager.startAmbientLoop();
    
    // Browsers require user interaction before playing audio, so we hook BGM start to the first click anywhere
    document.body.addEventListener('click', () => {
        SoundManager.startBGM();
    }, { once: true });
    
    loadProgress();
    // Fallback: If legacy save files exist, migrate unlocked units to equipped by default up to limits
    migrateLegacySaves();
    ensureSkinData();
    
    // === OFFLINE PROGRESS CHECK ===
    // MOVED to startGameEngine() — was firing behind the title screen
    // checkOfflineProgress();
    
    // === INIT NEW SYSTEMS ===
    // MOVED to startGameEngine() to prevent rendering behind title screen
    // Force disable auto-boss per user request
    state.autoBoss = false;
    
    // NOTE: renderSpeedToggle, renderMuteToggle, renderCombatLogToggle, renderQuickHealButton
    // are deferred to startGameEngine() to prevent rendering behind the title/login screen.
    setInterval(updateQuickHealVisibility, 2000);
    // renderAutoBossToggle();
    
    // NOTE: Combat systems (spawnEnemy, renderActiveBattleLine, startAutomationEngines,
    // startRobotAutomation, startArenaAmbience, enemy attack interval) are intentionally
    // NOT started here — they are deferred to startGameEngine() so they don't run
    // behind the title/login/story/tutorial screens.
    renderCraftingQueue();
    syncUI();
    if (typeof updateMapBackground === 'function') updateMapBackground();
    
    if (window._buffDecayTimer) clearInterval(window._buffDecayTimer); window._buffDecayTimer = setInterval(() => {
        if (!window.gameStarted) return; // Suppress until title screen dismissed
        if (typeof sheldonTapBuff !== 'undefined' && sheldonTapBuff > 0) {
            sheldonTapBuff = Math.max(0, sheldonTapBuff - 0.1);
            if (typeof updateSheldonBuffBadge === 'function') updateSheldonBuffBadge();
        }
        if (typeof rageDuration !== 'undefined' && rageDuration > 0) {
            rageDuration = Math.max(0, rageDuration - 2.5);
            
            const container = document.getElementById('synergy-display');
            if (container) {
                container.classList.remove('hidden');
                let rageBadge = document.getElementById('rage-buff-badge');
                if (!rageBadge) {
                    rageBadge = document.createElement('span');
                    rageBadge.id = 'rage-buff-badge';
                    rageBadge.className = 'bg-red-900/90 text-red-300 border border-red-500/80 px-2 py-0.5 rounded shadow whitespace-nowrap flex items-center gap-1 animate-pulse';
                    container.appendChild(rageBadge);
                }
                rageBadge.innerHTML = `🍔 BURGER RAGE (${(rageDuration / 10).toFixed(1)}s)`;
            }

            if (rageDuration === 0) {
                const arena = document.getElementById('arena');
                if (arena) arena.classList.remove('rage-active-bg');
                const rageBadge = document.getElementById('rage-buff-badge');
                if (rageBadge) rageBadge.remove();
                if (typeof calculateSynergies === 'function') calculateSynergies();
                startAutomationEngines(); 
            }
        }
    }, 500);

    if (window._craftTimer) clearInterval(window._craftTimer); window._craftTimer = setInterval(updateCraftingQueues, 500);
    if (window._hospitalTimer) clearInterval(window._hospitalTimer); window._hospitalTimer = setInterval(updateHospitalRecoveries, 1000);
    
    // Auto-repair overheated bots every 60 seconds
    if (window._botAutoRepairTimer) clearInterval(window._botAutoRepairTimer);
    window._botAutoRepairTimer = setInterval(function() {
        if (!window.gameStarted) return; // Suppress until title screen dismissed
        if (!state.robots || !state.robots.length) return;
        let repaired = false;
        state.robots.forEach(function(r) {
            if (r && r.equipped && r.overheated) {
                r.overheated = false;
                r.heat = 0;
                repaired = true;
            }
        });
        if (repaired) {
            if (typeof updateRobotHeatBars === 'function') updateRobotHeatBars();
            if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
            if (typeof startRobotAutomation === 'function') startRobotAutomation();
        }
    }, 60000);
    if (window._saveTimer) clearInterval(window._saveTimer); window._saveTimer = setInterval(saveProgress, 5000);
    
    // Simulate AI dummy bot progression every 60 seconds using Supabase RPC
    if (window._botSimTimer) clearInterval(window._botSimTimer); window._botSimTimer = setInterval(function() {
        if (typeof db !== 'undefined' && db && !isGuest) {
            db.rpc('simulate_bot_progress').then(function(res) {
                console.log('[Bot Simulation] Bots aggressively progressed in the background!');
            }).catch(function(e) {
                // Silently fail if not configured yet
                console.warn('[Bot Simulation] Failed. Did you run the SQL query?', e);
            });
        }
    }, 60000);
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


// OPEN LOCATION MAP MODAL
function openLocationMap() {
    // Ensure unlockedLocations exists
    if (!state.unlockedLocations || !Array.isArray(state.unlockedLocations)) {
        state.unlockedLocations = ['sheldons_apt'];
    }
    if (!state.currentLocation) state.currentLocation = 'sheldons_apt';
    
    // Retroactively unlock maps based on current wave (every 8 waves)
    if (typeof locationOrder !== 'undefined') {
        var maxUnlock = Math.min(Math.floor(state.wave / 8), locationOrder.length - 1);
        for (var i = 0; i <= maxUnlock; i++) {
            if (!state.unlockedLocations.includes(locationOrder[i])) {
                state.unlockedLocations.push(locationOrder[i]);
            }
        }
    }
    if (state.unlockedLocations.length === 0) state.unlockedLocations.push('sheldons_apt');
    
    // Remove existing modal if any
    var existing = document.getElementById('location-map-modal');
    if (existing) existing.remove();

    // Lore-accurate location themes
    var locThemes = {
        sheldons_apt:      { emoji: '🏠', icon: '🛋️', gradient: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', accent: '#f59e0b', label: 'Apt 4A' },
        pennys_apt:        { emoji: '💅', icon: '🍷', gradient: 'linear-gradient(135deg, #9f1239 0%, #881337 100%)', accent: '#fb7185', label: 'Apt 4B' },
        chocolate_factory: { emoji: '🍫', icon: '🏭', gradient: 'linear-gradient(135deg, #451a03 0%, #1c0a01 100%)', accent: '#d97706', label: 'Factory' },
        cheesecake_factory:{ emoji: '🍰', icon: '🍽️', gradient: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)', accent: '#fbbf24', label: 'Cheesecake' },
        bernie_house:      { emoji: '👶', icon: '🏡', gradient: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)', accent: '#34d399', label: 'Wolowitz Home' },
        comic_store:       { emoji: '📚', icon: '🦸', gradient: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)', accent: '#818cf8', label: 'Comic Center' },
        howards_house:     { emoji: '🍝', icon: '👩‍🍳', gradient: 'linear-gradient(135deg, #9a3412 0%, #7c2d12 100%)', accent: '#fb923c', label: "Ma's House" },
        rajs_apt:          { emoji: '🔭', icon: '🐕', gradient: 'linear-gradient(135deg, #4c1d95 0%, #2e1065 100%)', accent: '#a78bfa', label: "Raj's Place" },
        pasadena_museum:   { emoji: '🦕', icon: '🏛️', gradient: 'linear-gradient(135deg, #44403c 0%, #1c1917 100%)', accent: '#a8a29e', label: 'Museum' },
        caltech:           { emoji: '🔬', icon: '⚛️', gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0c1929 100%)', accent: '#38bdf8', label: 'Caltech' },
        // Young Sheldon themes
        ys_cooper_home:    { emoji: '🏡', icon: '🤠', gradient: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)', accent: '#fbbf24', label: 'Cooper Home' },
        ys_high_school:    { emoji: '🏫', icon: '⚡', gradient: 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)', accent: '#ef4444', label: 'High School' },
        ys_texas_ranch:    { emoji: '🐂', icon: '🌵', gradient: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', accent: '#d97706', label: 'Texas Ranch' },
        ys_desert:         { emoji: '🏜️', icon: '💀', gradient: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', accent: '#dc2626', label: 'Desert' },
        ys_museum:         { emoji: '🦖', icon: '👽', gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', accent: '#94a3b8', label: 'TX Museum' },
        ys_chaos_lab:      { emoji: '🧬', icon: '⚠️', gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)', accent: '#22c55e', label: "Chaos Lab" },
        // ═══════ MULTIVERSE SAGA THEMES ═══════
        mv_mirror_caltech:    { emoji: '🪞', icon: '🔬', gradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f0a2e 100%)', accent: '#8b5cf6', label: 'Mirror Caltech' },
        mv_steampunk_4a:      { emoji: '⚙️', icon: '🔧', gradient: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', accent: '#d97706', label: 'Steampunk 4A' },
        mv_zombie_pasadena:   { emoji: '🧟', icon: '💀', gradient: 'linear-gradient(135deg, #1a2e05 0%, #0f1a02 100%)', accent: '#84cc16', label: 'Zombie Pasadena' },
        mv_pirate_cove:       { emoji: '🏴‍☠️', icon: '⚓', gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%)', accent: '#38bdf8', label: 'Pirate Cove' },
        mv_medieval_realm:    { emoji: '⚔️', icon: '🏰', gradient: 'linear-gradient(135deg, #44403c 0%, #1c1917 100%)', accent: '#a8a29e', label: 'Medieval Realm' },
        mv_wild_west:         { emoji: '🤠', icon: '🌵', gradient: 'linear-gradient(135deg, #92400e 0%, #451a03 100%)', accent: '#fbbf24', label: 'Wild West' },
        mv_robot_uprising:    { emoji: '🤖', icon: '⚡', gradient: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', accent: '#22d3ee', label: 'Robot Uprising' },
        mv_jurassic:          { emoji: '🦖', icon: '🌿', gradient: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)', accent: '#22c55e', label: 'Jurassic' },
        mv_underwater:        { emoji: '🌊', icon: '🐙', gradient: 'linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)', accent: '#0ea5e9', label: 'Atlantis Labs' },
        mv_cyber_city:        { emoji: '🌃', icon: '💻', gradient: 'linear-gradient(135deg, #0f0524 0%, #1a0533 100%)', accent: '#e879f9', label: 'Cyber City' },
        mv_void_space:        { emoji: '🌌', icon: '🛸', gradient: 'linear-gradient(135deg, #020617 0%, #0a0a0a 100%)', accent: '#6366f1', label: 'Cosmic Void' },
        mv_final_rift:        { emoji: '🌀', icon: '💥', gradient: 'linear-gradient(135deg, #4c1d95 0%, #2e1065 100%)', accent: '#a78bfa', label: 'Final Rift' },
        // ═══════ GENESIS PROTOCOL THEMES ═══════
        gen_secret_lodge:     { emoji: '🔺', icon: '👁️', gradient: 'linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)', accent: '#fbbf24', label: 'Secret Lodge' },
        gen_vatican_vault:    { emoji: '⛪', icon: '📜', gradient: 'linear-gradient(135deg, #44403c 0%, #1c1917 100%)', accent: '#d4d4d8', label: 'Vatican Vault' },
        gen_area_51:          { emoji: '🛸', icon: '🔒', gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', accent: '#22c55e', label: 'Area 51' },
        gen_pyramid:          { emoji: '🔺', icon: '🏜️', gradient: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', accent: '#fbbf24', label: 'Pyramid' },
        gen_olympus:          { emoji: '⚡', icon: '🏛️', gradient: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', accent: '#60a5fa', label: 'Mt. Olympus' },
        gen_asgard:           { emoji: '🌈', icon: '❄️', gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0c4a6e 100%)', accent: '#38bdf8', label: 'Asgard' },
        gen_eden:             { emoji: '🍎', icon: '🌿', gradient: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)', accent: '#4ade80', label: 'Garden of Eden' },
        gen_underworld:       { emoji: '🔥', icon: '💀', gradient: 'linear-gradient(135deg, #450a0a 0%, #1c0a00 100%)', accent: '#ef4444', label: 'Underworld' },
        gen_time_stream:      { emoji: '⏳', icon: '🕐', gradient: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)', accent: '#818cf8', label: 'Time Stream' },
        gen_singularity:      { emoji: '⚫', icon: '✨', gradient: 'linear-gradient(135deg, #020617 0%, #000000 100%)', accent: '#c084fc', label: 'Singularity' },
        gen_genesis:          { emoji: '💥', icon: '🌅', gradient: 'linear-gradient(135deg, #431407 0%, #7c2d12 100%)', accent: '#fb923c', label: 'Genesis Day' },
        gen_the_equation:     { emoji: '∞', icon: '🧮', gradient: 'linear-gradient(135deg, #fbbf24 0%, #78350f 100%)', accent: '#fef08a', label: 'The Equation' }
    };

    // Split locations into pages
    var pasadenaLocs = locationOrder.filter(function(k) { return !locations[k] || !locations[k].era; });
    var ysLocs = locationOrder.filter(function(k) { return locations[k] && locations[k].era === 'young_sheldon'; });
    var mvLocs = locationOrder.filter(function(k) { return locations[k] && locations[k].era === 'multiverse'; });
    var genLocs = locationOrder.filter(function(k) { return locations[k] && locations[k].era === 'genesis'; });
    var hasYSAccess = state.story_wave80_seen && ysLocs.length > 0;
    var hasMVAccess = state.story_wave150_seen && mvLocs.length > 0;
    var hasGenAccess = state.story_wave250_seen && genLocs.length > 0;

    // Store current page in window for tab switching
    if (typeof window._mapModalPage === 'undefined') window._mapModalPage = 1;

    function buildMapModal(page) {
        window._mapModalPage = page;
        var overlay = document.getElementById('location-map-modal');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'location-map-modal';
            overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);padding:12px;backdrop-filter:blur(4px);';
            overlay.onclick = function(e) { if (e.target === overlay) closeLocationMap(); };
            document.body.appendChild(overlay);
        }

        var panel = document.createElement('div');
        var panelBorders = { 1: '#1e40af', 2: '#dc2626', 3: '#7c3aed', 4: '#eab308' };
        var panelGlows = { 1: 'rgba(30,64,175,0.3)', 2: 'rgba(220,38,38,0.3)', 3: 'rgba(124,58,237,0.3)', 4: 'rgba(234,179,8,0.3)' };
        var pBorder = panelBorders[page] || panelBorders[1];
        var pGlow = panelGlows[page] || panelGlows[1];
        panel.style.cssText = 'background:linear-gradient(180deg, #0f172a 0%, #020617 100%);border:2px solid ' + pBorder + ';border-radius:16px;padding:0;max-width:420px;width:100%;box-sizing:border-box;overflow:hidden;position:relative;box-shadow:0 0 60px ' + pGlow + ',0 25px 50px rgba(0,0,0,0.8);';

        // ── PAGE TABS ──
        var tabsHTML = '<div style="display:flex;background:rgba(0,0,0,0.4);border-bottom:1px solid rgba(255,255,255,0.08);">';
        // Tab 1: Pasadena
        var tab1Active = page === 1;
        tabsHTML += '<button onclick="window._mapModalBuild(1)" style="flex:1;padding:10px;border:none;cursor:pointer;font-size:11px;font-weight:800;letter-spacing:1px;transition:all 0.2s;' +
            (tab1Active ? 'background:linear-gradient(135deg,#1e3a8a,#1e40af);color:#93c5fd;border-bottom:2px solid #3b82f6;' : 'background:transparent;color:#475569;border-bottom:2px solid transparent;') + '">🗺️ PASADENA</button>';
        // Tab 2: Young Sheldon (locked if not seen story)
        if (hasYSAccess) {
            var tab2Active = page === 2;
            tabsHTML += '<button onclick="window._mapModalBuild(2)" style="flex:1;padding:10px;border:none;cursor:pointer;font-size:11px;font-weight:800;letter-spacing:1px;transition:all 0.2s;' +
                (tab2Active ? 'background:linear-gradient(135deg,#991b1b,#dc2626);color:#fca5a5;border-bottom:2px solid #ef4444;' : 'background:transparent;color:#475569;border-bottom:2px solid transparent;') + '">🌀 YOUNG SHELDON</button>';
        } else {
            tabsHTML += '<button style="flex:1;padding:10px;border:none;cursor:not-allowed;font-size:9px;font-weight:800;letter-spacing:1px;background:transparent;color:#1e293b;border-bottom:2px solid transparent;" title="Reach Wave 80 to unlock">🔒 ???</button>';
        }
        // Tab 3: Multiverse
        if (hasMVAccess) {
            var tab3Active = page === 3;
            tabsHTML += '<button onclick="window._mapModalBuild(3)" style="flex:1;padding:10px;border:none;cursor:pointer;font-size:9px;font-weight:800;letter-spacing:1px;transition:all 0.2s;' +
                (tab3Active ? 'background:linear-gradient(135deg,#4c1d95,#7c3aed);color:#c4b5fd;border-bottom:2px solid #8b5cf6;' : 'background:transparent;color:#475569;border-bottom:2px solid transparent;') + '">🌀 MULTIVERSE</button>';
        } else if (hasYSAccess) {
            tabsHTML += '<button style="flex:1;padding:10px;border:none;cursor:not-allowed;font-size:9px;font-weight:800;letter-spacing:1px;background:transparent;color:#1e293b;border-bottom:2px solid transparent;" title="Reach Wave 150 to unlock">🔒 ???</button>';
        }
        // Tab 4: Genesis
        if (hasGenAccess) {
            var tab4Active = page === 4;
            tabsHTML += '<button onclick="window._mapModalBuild(4)" style="flex:1;padding:10px;border:none;cursor:pointer;font-size:9px;font-weight:800;letter-spacing:1px;transition:all 0.2s;' +
                (tab4Active ? 'background:linear-gradient(135deg,#78350f,#eab308);color:#fef08a;border-bottom:2px solid #fbbf24;' : 'background:transparent;color:#475569;border-bottom:2px solid transparent;') + '">🔮 GENESIS</button>';
        } else if (hasMVAccess) {
            tabsHTML += '<button style="flex:1;padding:10px;border:none;cursor:not-allowed;font-size:9px;font-weight:800;letter-spacing:1px;background:transparent;color:#1e293b;border-bottom:2px solid transparent;" title="Reach Wave 250 to unlock">🔒 ???</button>';
        }
        tabsHTML += '</div>';

        // ── HEADER ──
        var headerHTML = '';
        var eraColors = { 1: {bg:'#1e40af',border:'#3b82f6',text:'#93c5fd'}, 2: {bg:'#dc2626',border:'#ef4444',text:'#fca5a5'}, 3: {bg:'#7c3aed',border:'#8b5cf6',text:'#c4b5fd'}, 4: {bg:'#eab308',border:'#fbbf24',text:'#fef08a'} };
        var ec = eraColors[page] || eraColors[1];
        if (page === 1) {
            headerHTML += '<div style="background:linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);padding:14px 20px 12px;border-bottom:3px solid #3b82f6;position:relative;overflow:hidden;">';
            headerHTML += '<div style="position:absolute;inset:0;opacity:0.6;background-image:repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,0.05) 19px,rgba(255,255,255,0.05) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,0.05) 19px,rgba(255,255,255,0.05) 20px);"></div>';
            headerHTML += '<div style="position:relative;z-index:1;text-align:center;">';
            headerHTML += '<div style="font-size:16px;font-weight:900;color:#fff;letter-spacing:4px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,0.5);">🗺️ PASADENA</div>';
            headerHTML += '<div style="font-size:9px;color:#93c5fd;margin-top:3px;text-transform:uppercase;letter-spacing:3px;font-weight:600;">The Big Bang Theory • Map</div>';
            headerHTML += '<div style="font-size:8px;color:#60a5fa;margin-top:2px;letter-spacing:1px;">Wave ' + state.wave + ' • ' + state.unlockedLocations.length + '/' + locationOrder.length + ' Locations</div>';
            headerHTML += '</div></div>';
        } else if (page === 2) {
            headerHTML += '<div style="background:linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #dc2626 100%);padding:14px 20px 12px;border-bottom:3px solid #ef4444;position:relative;overflow:hidden;">';
            headerHTML += '<div style="position:absolute;inset:0;opacity:0.15;background-image:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.1) 10px,rgba(255,255,255,0.1) 11px);"></div>';
            headerHTML += '<div style="position:relative;z-index:1;text-align:center;">';
            headerHTML += '<div style="font-size:16px;font-weight:900;color:#fff;letter-spacing:4px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,0.5);">🌀 MEDFORD, TEXAS</div>';
            headerHTML += '<div style="font-size:9px;color:#fca5a5;margin-top:3px;text-transform:uppercase;letter-spacing:3px;font-weight:600;">Young Sheldon Era • 1989</div>';
            headerHTML += '<div style="font-size:8px;color:#f87171;margin-top:2px;letter-spacing:1px;">⚠️ Dr. Chaos\'s Army • Stop the Timeline Invasion</div>';
            headerHTML += '</div></div>';
        } else if (page === 3) {
            headerHTML += '<div style="background:linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #7c3aed 100%);padding:14px 20px 12px;border-bottom:3px solid #8b5cf6;position:relative;overflow:hidden;">';
            headerHTML += '<div style="position:absolute;inset:0;opacity:0.15;background-image:repeating-linear-gradient(60deg,transparent,transparent 8px,rgba(255,255,255,0.08) 8px,rgba(255,255,255,0.08) 9px);"></div>';
            headerHTML += '<div style="position:relative;z-index:1;text-align:center;">';
            headerHTML += '<div style="font-size:16px;font-weight:900;color:#fff;letter-spacing:4px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,0.5);">🌀 THE MULTIVERSE</div>';
            headerHTML += '<div style="font-size:9px;color:#c4b5fd;margin-top:3px;text-transform:uppercase;letter-spacing:3px;font-weight:600;">Multiverse Saga • Infinite Dimensions</div>';
            headerHTML += '<div style="font-size:8px;color:#a78bfa;margin-top:2px;letter-spacing:1px;">⚡ Reality is tearing apart • Close the rifts</div>';
            headerHTML += '</div></div>';
        } else if (page === 4) {
            headerHTML += '<div style="background:linear-gradient(135deg, #422006 0%, #78350f 50%, #b45309 100%);padding:14px 20px 12px;border-bottom:3px solid #fbbf24;position:relative;overflow:hidden;">';
            headerHTML += '<div style="position:absolute;inset:0;opacity:0.15;background-image:repeating-linear-gradient(30deg,transparent,transparent 6px,rgba(255,255,255,0.1) 6px,rgba(255,255,255,0.1) 7px);"></div>';
            headerHTML += '<div style="position:relative;z-index:1;text-align:center;">';
            headerHTML += '<div style="font-size:16px;font-weight:900;color:#fff;letter-spacing:4px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,0.5);">🔮 GENESIS PROTOCOL</div>';
            headerHTML += '<div style="font-size:9px;color:#fef08a;margin-top:3px;text-transform:uppercase;letter-spacing:3px;font-weight:600;">The Origin of Everything</div>';
            headerHTML += '<div style="font-size:8px;color:#fbbf24;margin-top:2px;letter-spacing:1px;">🔺 Illuminati • ⚡ Divine War • 💥 Genesis Day</div>';
            headerHTML += '</div></div>';
        }

        // Close button
        headerHTML += '<button onclick="closeLocationMap()" style="position:absolute;top:42px;right:14px;color:' + ec.text + ';font-size:20px;cursor:pointer;background:rgba(0,0,0,0.3);border:1px solid ' + ec.border + ';border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:bold;z-index:5;transition:all 0.2s;" onmouseenter="this.style.background=\'rgba(239,68,68,0.5)\';this.style.borderColor=\'#ef4444\';this.style.color=\'#fff\';" onmouseleave="this.style.background=\'rgba(0,0,0,0.3)\';this.style.borderColor=\'' + ec.border + '\';this.style.color=\'' + ec.text + '\';">×</button>';

        panel.innerHTML = tabsHTML + headerHTML;

        // ── LOCATION LIST ──
        var listContainer = document.createElement('div');
        listContainer.style.cssText = 'padding:12px 14px;box-sizing:border-box;overflow-y:auto;max-height:calc(85vh - 140px);';
        listContainer.innerHTML = '<div style="position:relative;">';

        var locsToShow = page === 1 ? pasadenaLocs : page === 2 ? ysLocs : page === 3 ? mvLocs : genLocs;
        var startIndex = page === 1 ? 0 : page === 2 ? pasadenaLocs.length : page === 3 ? pasadenaLocs.length + ysLocs.length : pasadenaLocs.length + ysLocs.length + mvLocs.length;

        for (var j = 0; j < locsToShow.length; j++) {
            var locKey = locsToShow[j];
            var locData = locations[locKey];
            if (!locData) continue;

            var theme = locThemes[locKey] || { emoji: '📍', icon: '🏢', gradient: 'linear-gradient(135deg, #334155, #1e293b)', accent: '#94a3b8', label: 'Location' };
            var isUnlocked = state.unlockedLocations.includes(locKey);
            var isCurrent = state.currentLocation === locKey;
            var globalIdx = startIndex + j;

            var cardHTML = '<div style="position:relative;margin-bottom:6px;">';

            // Road connector (except last)
            if (j < locsToShow.length - 1) {
                cardHTML += '<div style="position:absolute;left:22px;top:100%;width:2px;height:6px;background:' + (isUnlocked ? '#334155' : '#1e293b') + ';z-index:0;"></div>';
            }

            if (isUnlocked) {
                var borderCol = isCurrent ? theme.accent : '#334155';
                var glowStyle = isCurrent ? 'box-shadow:0 0 20px ' + theme.accent + '40,0 0 40px ' + theme.accent + '20,inset 0 0 15px ' + theme.accent + '10;' : '';
                var pulseAnim = isCurrent ? 'animation:pulse 2s infinite;' : '';

                cardHTML += '<div onclick="switchLocation(\'' + locKey + '\');closeLocationMap();" style="display:flex;align-items:stretch;gap:0;border-radius:10px;border:2px solid ' + borderCol + ';overflow:hidden;cursor:pointer;transition:all 0.25s;' + glowStyle + pulseAnim + '" ';
                cardHTML += 'onmouseenter="if(!' + isCurrent + ')this.style.borderColor=\'' + theme.accent + '\';this.style.transform=\'scale(1.02)\';this.style.boxShadow=\'0 4px 20px rgba(0,0,0,0.4)\';" ';
                cardHTML += 'onmouseleave="if(!' + isCurrent + ')this.style.borderColor=\'#334155\';this.style.transform=\'scale(1)\';this.style.boxShadow=\'' + (isCurrent ? '0 0 20px ' + theme.accent + '40' : 'none') + '\';">';

                // Left icon strip
                cardHTML += '<div style="width:46px;min-height:60px;background:' + theme.gradient + ';display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;flex-shrink:0;border-right:1px solid rgba(255,255,255,0.1);">';
                cardHTML += '<div style="font-size:20px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));">' + theme.emoji + '</div>';
                cardHTML += '<div style="font-size:7px;color:rgba(255,255,255,0.6);font-weight:700;letter-spacing:0.5px;text-align:center;line-height:1.1;">' + theme.label + '</div>';
                cardHTML += '</div>';

                // Content area
                cardHTML += '<div style="flex:1;padding:8px 10px;box-sizing:border-box;background:rgba(15,23,42,0.95);min-width:0;">';

                // Title row
                cardHTML += '<div style="display:flex;align-items:center;justify-content:space-between;gap:4px;">';
                cardHTML += '<div style="font-size:11px;font-weight:900;color:' + (isCurrent ? theme.accent : '#e2e8f0') + ';letter-spacing:0.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + (isCurrent ? '📍 ' : '') + locData.name + '</div>';
                if (isCurrent) {
                    cardHTML += '<div style="font-size:7px;color:#000;background:' + theme.accent + ';padding:1px 5px;box-sizing:border-box;border-radius:3px;font-weight:900;letter-spacing:1px;flex-shrink:0;text-transform:uppercase;">HERE</div>';
                }
                // Era badge for YS maps
                if (locData.era === 'young_sheldon' && !isCurrent) {
                    cardHTML += '<div style="font-size:6px;color:#fca5a5;background:rgba(239,68,68,0.15);padding:1px 4px;border-radius:3px;font-weight:800;flex-shrink:0;border:1px solid rgba(239,68,68,0.2);">1989</div>';
                }
                cardHTML += '</div>';

                // Description
                cardHTML += '<div style="font-size:8px;color:#94a3b8;margin-top:3px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + locData.desc + '</div>';

                // Bottom info row
                cardHTML += '<div style="display:flex;align-items:center;gap:6px;margin-top:5px;">';
                cardHTML += '<span style="font-size:7px;color:#64748b;background:rgba(100,116,139,0.2);padding:1px 4px;box-sizing:border-box;border-radius:3px;border:1px solid rgba(100,116,139,0.2);">⚔️ Diff ' + locData.minDifficulty + '-' + locData.maxDifficulty + '</span>';
                if (locData.bossPool && locData.bossPool.length > 0) {
                    cardHTML += '<span style="font-size:7px;color:#ef4444;background:rgba(239,68,68,0.1);padding:1px 4px;box-sizing:border-box;border-radius:3px;border:1px solid rgba(239,68,68,0.2);">💀 ' + locData.bossPool.length + ' Boss' + (locData.bossPool.length > 1 ? 'es' : '') + '</span>';
                }
                if (locData.minionPool) {
                    cardHTML += '<span style="font-size:7px;color:#64748b;">👾 ' + locData.minionPool.length + '</span>';
                }
                cardHTML += '</div>';

                cardHTML += '</div>'; // content
                cardHTML += '</div>'; // card
            } else {
                // Locked location
                cardHTML += '<div style="display:flex;align-items:stretch;gap:0;border-radius:10px;border:2px solid #1e293b;overflow:hidden;opacity:0.45;cursor:not-allowed;">';

                // Left icon strip (locked)
                cardHTML += '<div style="width:46px;min-height:55px;background:linear-gradient(135deg, #1e293b, #0f172a);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;flex-shrink:0;border-right:1px solid rgba(255,255,255,0.05);">';
                cardHTML += '<div style="font-size:18px;">🔒</div>';
                cardHTML += '<div style="font-size:7px;color:#475569;font-weight:700;">LOCKED</div>';
                cardHTML += '</div>';

                // Content (locked)
                cardHTML += '<div style="flex:1;padding:8px 10px;box-sizing:border-box;background:rgba(15,23,42,0.8);">';
                cardHTML += '<div style="font-size:11px;font-weight:700;color:#475569;">' + locData.name + '</div>';
                var unlockWave = globalIdx * 8;
                if (locData.era === 'young_sheldon') {
                    cardHTML += '<div style="font-size:8px;color:#334155;margin-top:3px;">Complete Wave 80 story to unlock</div>';
                } else {
                    cardHTML += '<div style="font-size:8px;color:#334155;margin-top:3px;">Reach Wave ' + unlockWave + ' to unlock this area</div>';
                }
                cardHTML += '<div style="margin-top:4px;height:3px;background:#1e293b;border-radius:2px;overflow:hidden;">';
                var progress = Math.min(100, unlockWave > 0 ? (state.wave / unlockWave) * 100 : 100);
                cardHTML += '<div style="height:100%;width:' + progress + '%;background:linear-gradient(90deg, #334155, #475569);border-radius:2px;transition:width 0.3s;"></div>';
                cardHTML += '</div>';
                cardHTML += '</div>';

                cardHTML += '</div>';
            }

            cardHTML += '</div>'; // wrapper
            listContainer.innerHTML += cardHTML;
        }

        listContainer.innerHTML += '</div>'; // close relative wrapper

        panel.appendChild(listContainer);
        overlay.innerHTML = '';
        overlay.appendChild(panel);
    }

    // Expose build function for tab switching
    window._mapModalBuild = buildMapModal;

    // Build with current page
    buildMapModal(window._mapModalPage || 1);
}


// CLOSE LOCATION MAP MODAL
function closeLocationMap() {
    var modal = document.getElementById('location-map-modal');
    if (modal) modal.remove();
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
            
            const baseMaxHp = Math.floor((characters[key].baseHp || 100) * Math.pow(characters[key].lane === 'front' ? 1.40 : 1.25, charLvl - 1));
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

function updateMapBackground() {
    const bg = document.getElementById('arena-background');
    if (!bg) return;
    const locKey = state.currentLocation || 'sheldons_apt';
    // Check all background sources: vectors.js backgrounds, window.backgrounds (map_backgrounds.js), youngSheldonMaps, multiverseMaps, genesisMaps
    if (typeof backgrounds !== 'undefined' && backgrounds[locKey]) {
        bg.innerHTML = backgrounds[locKey];
    } else if (typeof window.backgrounds !== 'undefined' && window.backgrounds[locKey]) {
        bg.innerHTML = window.backgrounds[locKey];
    } else if (typeof youngSheldonMaps !== 'undefined' && youngSheldonMaps[locKey]) {
        bg.innerHTML = youngSheldonMaps[locKey];
    } else if (typeof multiverseMaps !== 'undefined' && multiverseMaps[locKey]) {
        bg.innerHTML = multiverseMaps[locKey];
    } else if (typeof genesisMaps !== 'undefined' && genesisMaps[locKey]) {
        bg.innerHTML = genesisMaps[locKey];
    }
}

function spawnEnemy() {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    if (window.towerMode) return; // Don't spawn normal enemies during tower
    const bossControls = document.getElementById('boss-controls');
    const timerDisplay = document.getElementById('boss-timer-display');
    const locationInfo = document.getElementById('location-name-display');
    const fightBossBtn = document.getElementById('fight-boss-btn');
    
    let chosenType;
    const currentLocationData = locations[state.currentLocation];

    if (locationInfo && currentLocationData) {
        locationInfo.innerText = "[LOC] " + currentLocationData.name;
    }

    if (typeof state.minionsDefeated === 'undefined') state.minionsDefeated = 0;

    const locIndex = typeof locationOrder !== 'undefined' ? locationOrder.indexOf(state.currentLocation) : 0;
    const locMultiplier = locIndex >= 0 ? Math.pow(1.5, locIndex) : 1.0;


    if (window.manualBossTrigger) {
        window.manualBossTrigger = false;
        isBossActive = true;
        if (typeof window.addCombatLog === 'function') window.addCombatLog('\u{1F479}', 'BOSS APPEARED!');
        const bossPo = currentLocationData?.bossPool || bossTypes.map(b => b.key);
        const bossPoolKeys = bossPo.map(k => bossTypes.find(b => b.key === k)).filter(Boolean);
        const bossIndex = (state.wave - 1) % bossPoolKeys.length;
        chosenType = bossPoolKeys[bossIndex];
        
        if (bossControls) bossControls.classList.remove('hidden');
        if (fightBossBtn) fightBossBtn.classList.add('hidden');
        if (timerDisplay) timerDisplay.classList.remove('hidden');
        
        var bossWaveScale;
        if (state.wave <= 20) {
            bossWaveScale = Math.pow(1.25, state.wave - 1);
        } else if (state.wave <= 60) {
            bossWaveScale = Math.pow(1.25, 20) * (1 + (state.wave - 20) * 0.05);
        } else {
            // After wave 60, scaling slows to +3% per wave
            bossWaveScale = Math.pow(1.25, 20) * (1 + 40 * 0.05) * (1 + (state.wave - 60) * 0.03);
        }
        currentEnemy.maxHp = Math.floor(250 * chosenType.hpMultiplier * locMultiplier * bossWaveScale);
        
        // Auto-start boss timer
        bossMaxTime = 20 + Math.min(20, Math.floor(state.wave / 10) * 2); // 20s at wave 1, up to 40s at wave 100+
        bossTimer = bossMaxTime;
        if (timerDisplay) timerDisplay.innerText = bossTimer.toFixed(1) + "s";
            // Update boss timer bar
            const timerBar = document.getElementById('boss-timer-bar');
            if (timerBar) {
                const pct = Math.max(0, (bossTimer / bossMaxTime) * 100);
                timerBar.style.width = pct + '%';
                if (pct > 50) {
                    timerBar.className = 'h-full rounded-full transition-all duration-100 ease-linear bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
                } else if (pct > 25) {
                    timerBar.className = 'h-full rounded-full transition-all duration-100 ease-linear bg-gradient-to-r from-yellow-500 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
                } else {
                    timerBar.className = 'h-full rounded-full transition-all duration-100 ease-linear bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse';
                }
            }
        clearInterval(bossTimerId);
        bossTimerId = setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            bossTimer -= 0.1;
            if (bossTimer <= 0) {
                bossTimer = 0;
                failBossFight();
            }
            if (timerDisplay) timerDisplay.innerText = bossTimer.toFixed(1) + "s";
            // Update boss timer bar
            const timerBar = document.getElementById('boss-timer-bar');
            if (timerBar) {
                const pct = Math.max(0, (bossTimer / bossMaxTime) * 100);
                timerBar.style.width = pct + '%';
                if (pct > 50) {
                    timerBar.className = 'h-full rounded-full transition-all duration-100 ease-linear bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
                } else if (pct > 25) {
                    timerBar.className = 'h-full rounded-full transition-all duration-100 ease-linear bg-gradient-to-r from-yellow-500 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
                } else {
                    timerBar.className = 'h-full rounded-full transition-all duration-100 ease-linear bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse';
                }
            }
        }, 100);
        
    } else {
        // Minion Wave
        isBossActive = false;
        clearInterval(bossTimerId);
        
        if (state.minionsDefeated >= 10) {
            if (bossControls) bossControls.classList.add('hidden');
            if (fightBossBtn) fightBossBtn.classList.remove('hidden');
            // Auto-boss: automatically start boss fight
            if (state.autoBoss && typeof startManualBossFight === 'function') {
                setTimeout(() => startManualBossFight(), 500);
            }
        } else {
            if (bossControls) bossControls.classList.add('hidden');
        }
        
        const minionPool = currentLocationData?.minionPool || minionTypes.map(m => m.key);
        const minionPoolObjects = minionPool.map(k => minionTypes.find(m => m.key === k)).filter(Boolean);
        chosenType = minionPoolObjects[Math.floor(Math.random() * minionPoolObjects.length)];
        
        // HP SCALING: Exponential until wave 50, then linear growth after that
        // Old: Math.pow(1.15, wave-1) — grew too fast, made high-wave enemies invincible
        // New: Soft-cap so player damage can still make a dent at high waves
        var waveScale;
        if (state.wave <= 50) {
            waveScale = Math.pow(1.15, state.wave - 1);
        } else {
            // After wave 50: use the wave-50 value as base, then grow linearly
            var base50 = Math.pow(1.15, 49); // ~1,013x at wave 50
            var extraWaves = state.wave - 50;
            waveScale = base50 * (1 + extraWaves * 0.12); // +12% per wave after 50 (linear)
        }
        currentEnemy.maxHp = Math.floor(40 * chosenType.hpMultiplier * locMultiplier * waveScale);
    }

    currentEnemy.type = chosenType;
    updateMapBackground();
    currentEnemy.hp = currentEnemy.maxHp;
    
    const enemyNameEl = document.getElementById('enemy-name');
    if (enemyNameEl) {
        if (isBossActive) {
            enemyNameEl.innerHTML = `<span style="color:#ff4444;font-size:12px;">💀</span> <span style="color:#ff6b6b;">EP.${state.wave}</span> <span style="color:#fbbf24;font-size:13px;letter-spacing:3px;">${chosenType.name}</span>`;
        } else {
            enemyNameEl.innerText = `Ep.${state.wave} ${chosenType.name}`;
        }
    }
    
    const enemyTypeBadge = document.getElementById('enemy-type-badge');
    if (enemyTypeBadge) {
        if (isBossActive) {
            enemyTypeBadge.innerHTML = '💀 BOSS';
            enemyTypeBadge.style.cssText = 'background:rgba(127,29,29,0.9);color:#fca5a5;font-size:7px;padding:2px 6px;box-sizing:border-box;border-radius:4px;font-weight:bold;border:1px solid #dc2626;box-shadow:0 0 8px rgba(220,38,38,0.4);';
        } else {
            enemyTypeBadge.innerText = '👤 MINION';
            enemyTypeBadge.style.cssText = '';
        }
    }
    
    const enemyLevelBadge = document.getElementById('enemy-level-badge');
    if (enemyLevelBadge) {
        enemyLevelBadge.innerText = `⚔ Wave ${state.wave}`;
    }
    
    // Update damage info
    const enemyDmgInfo = document.getElementById('enemy-dmg-info');
    if (enemyDmgInfo) {
        const estimatedDmg = Math.floor(currentEnemy.maxHp / 20);
        enemyDmgInfo.innerText = '⚡ ' + formatNumber(estimatedDmg) + ' DMG';
    }
    
    // Update minion progress bar
    const minionProgressFill = document.getElementById('minion-progress-fill');
    const minionProgressText = document.getElementById('minion-progress-text');
    const minionProgressBar = document.getElementById('minion-progress-bar');
    if (minionProgressBar) {
        if (isBossActive) {
            minionProgressBar.style.display = 'none';
        } else {
            minionProgressBar.style.display = '';
            const kills = state.minionsDefeated || 0;
            if (minionProgressFill) minionProgressFill.style.width = (kills / 10 * 100) + '%';
            if (minionProgressText) minionProgressText.textContent = kills + '/10';
        }
    }
    
    // Render enemy graphic with boss aura
    const frame = document.getElementById('enemy-graphic-frame');
    if (frame) {
        const rawScale = chosenType.scale || (isBossActive ? 1.5 : 1.0);
        const loreScale = isBossActive ? Math.min(rawScale, 1.3) : Math.min(rawScale, 1.0);
        const svgContent = getVectorFrame(chosenType.key, true) || `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="gray"/></svg>`;
        
        let auraHtml = '';
        let filterStyle = '';
        
        if (isBossActive) {
            // Boss: dark menacing aura + pulsing red glow
            auraHtml = `<div style="position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(ellipse at center, rgba(220,38,38,0.25) 0%, rgba(127,29,29,0.15) 40%, transparent 70%);animation:bossAuraPulse 2s ease-in-out infinite;pointer-events:none;z-index:0;"></div>` +
                       `<div style="position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);width:80%;height:8px;background:radial-gradient(ellipse at center, rgba(220,38,38,0.5) 0%, transparent 70%);border-radius:50%;filter:blur(3px);pointer-events:none;z-index:0;"></div>`;
            filterStyle = 'filter:drop-shadow(0 0 8px rgba(255,50,50,0.6)) drop-shadow(0 0 20px rgba(220,38,38,0.3));';
        } else {
            // Minion: subtle shadow
            auraHtml = `<div style="position:absolute;bottom:-3px;left:50%;transform:translateX(-50%);width:60%;height:5px;background:radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%);border-radius:50%;pointer-events:none;z-index:0;"></div>`;
            filterStyle = 'filter:drop-shadow(0 0 3px rgba(0,0,0,0.5));';
        }
        
        frame.innerHTML = auraHtml + `<div class="character-vector-wrapper flex items-center justify-center text-4xl" style="transform: scale(${loreScale}); transform-origin: bottom center; ${filterStyle} position:relative;z-index:1;">${svgContent}</div>`;
        
        frame.classList.remove('enemy-spawn-in', 'enemy-breathing', 'enemy-hurt', 'enemy-lunge', 'enemy-throw');
        void frame.offsetWidth;
        frame.classList.add('enemy-spawn-in', 'enemy-breathing');
    }
    
    // Update HP bar styling for boss vs minion
    const hpBarOuter = document.getElementById('enemy-hp-bar-outer');
    if (hpBarOuter) {
        if (isBossActive) {
            hpBarOuter.style.boxShadow = '0 0 16px rgba(255,0,0,0.4), inset 0 1px 3px rgba(0,0,0,0.5)';
            hpBarOuter.style.border = '1px solid rgba(220,38,38,0.8)';
        } else {
            hpBarOuter.style.boxShadow = '0 0 8px rgba(255,0,0,0.15), inset 0 1px 3px rgba(0,0,0,0.5)';
            hpBarOuter.style.border = '1px solid rgba(127,29,29,0.6)';
        }
    }
    
    updateEnemyHealthBar();
}

// BOSS FIGHT FAILED: Timer ran out before killing the boss
function failBossFight() {
    clearInterval(bossTimerId);
    isBossActive = false;
    
    // Hide boss controls
    var bc = document.getElementById('boss-controls');
    if (bc) bc.classList.add('hidden');
    var timerDisplay = document.getElementById('boss-timer-display');
    if (timerDisplay) timerDisplay.classList.add('hidden');
    
    // Show failure notification
    var failOverlay = document.createElement('div');
    failOverlay.style.cssText = 'position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);pointer-events:none;';
    failOverlay.innerHTML = '<div style="background:linear-gradient(135deg,#1a0000,#2d0000);border:2px solid #dc2626;border-radius:16px;padding:24px 40px;box-sizing:border-box;text-align:center;box-shadow:0 0 40px rgba(220,38,38,0.5);animation:evoPopIn 0.4s ease-out;">' +
        '<div style="font-size:32px;margin-bottom:8px;">💀</div>' +
        '<div style="font-size:16px;font-weight:900;color:#ef4444;letter-spacing:3px;text-shadow:0 0 10px rgba(239,68,68,0.5);">SEASON FINALE FAILED!</div>' +
        '<div style="font-size:10px;color:#94a3b8;margin-top:8px;">The boss escaped! Defeat 10 more enemies to retry.</div>' +
    '</div>';
    document.body.appendChild(failOverlay);
    
    // Screen shake effect
    var arena = document.getElementById('arena');
    if (arena) {
        arena.style.animation = 'none';
        void arena.offsetWidth;
        arena.style.animation = 'shake 0.5s ease-out';
    }
    
    // Auto-dismiss after 2.5 seconds
    setTimeout(function() {
        if (failOverlay.parentNode) failOverlay.remove();
    }, 2500);
    
    // Reset minion counter and spawn a new minion
    state.minionsDefeated = 0;
    
    // Show the fight boss button after resetting (need to re-earn it)
    var fightBossBtn = document.getElementById('fight-boss-btn');
    if (fightBossBtn) fightBossBtn.classList.add('hidden');
    
    // Spawn new minion enemy
    spawnEnemy();
    
    console.log('[Boss] Season finale failed! Timer expired.');
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
    
    // Beverly Loot Passive: +25% drop chance, 15% double drop when equipped
    const beverlyEquipped = state.equipped && state.equipped['beverly'];
    const beverlyLevel = beverlyEquipped && state.roster['beverly'] ? (state.roster['beverly'].level || 1) : 0;
    const lootChanceBonus = beverlyEquipped ? 0.25 + (beverlyLevel * 0.005) : 0; // +25% base, +0.5% per level
    const doubleDropChance = beverlyEquipped ? 0.15 + (beverlyLevel * 0.003) : 0; // 15% base, +0.3% per level
    // Prestige perk: Loot Multiplier (+10% drop chance per level)
    const prestigeLootBonus = (state.perks && state.perks.dropMult) ? (state.perks.dropMult * 0.10) : 0;
    let gotBonusLoot = false;
    
    for (const [resource, dropInfo] of Object.entries(dropTable)) {
        // dropInfo format: [chance, minAmount, maxAmount]
        const chance = Math.min(1, dropInfo[0] + lootChanceBonus + prestigeLootBonus);
        const minAmt = dropInfo[1];
        const maxAmt = dropInfo[2];
        if (Math.random() < chance) {
            let amount = Math.floor(Math.random() * (maxAmt - minAmt + 1)) + minAmt;
            // Prestige perk: bonus loot amount
            if (prestigeLootBonus > 0) {
                amount = Math.floor(amount * (1 + prestigeLootBonus));
            }
            // Beverly double drop
            if (beverlyEquipped && Math.random() < doubleDropChance) {
                amount *= 2;
                gotBonusLoot = true;
            }
            if (amount > 0) {
                state.resources[resource] = (state.resources[resource] || 0) + amount;
            }
        }
    }
    
    // Show Beverly loot boost indicator
    if (gotBonusLoot) {
        const beverlyEl = document.getElementById('live-character-beverly');
        if (beverlyEl) {
            const r = beverlyEl.getBoundingClientRect();
            generateDamagePopup({clientX: r.left + r.width/2, clientY: r.top}, '💎 2× LOOT!', false, false, true);
        }
    }
}


// ARENA TAP: Click/tap damage + Sheldon focus buff
function handleArenaTap(event) {
    if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
    if (!currentEnemy || currentEnemy.hp <= 0) return;
    
    // Base tap damage uses Sheldon's actual stats if equipped, else 1
    let tapDmg = 1;
    if (state.equipped && state.equipped['sheldon'] && state.roster['sheldon']) {
        const sheldonLevel = state.roster['sheldon'].level || 1;
        const sheldonConfig = characters['sheldon'];
        tapDmg = Math.floor(sheldonConfig.baseDmg * sheldonLevel);
        // Prestige perk: Damage Boost
        if (state.perks && state.perks.dmgMult) {
            tapDmg = Math.floor(tapDmg * (1 + state.perks.dmgMult * 0.10));
        }
    }
    
    // Sheldon focus buff multiplier
    if (sheldonTapBuff > 0) {
        tapDmg = Math.max(1, Math.floor(tapDmg * (1 + sheldonTapBuff)));
    }
    
    processDamage(tapDmg, 'sheldon');
    generateDamagePopup(event, tapDmg, false, false, false);
    
    // Build Sheldon focus on tap
    if (state.equipped && state.equipped['sheldon']) {
        sheldonTapBuff = Math.min(5, sheldonTapBuff + 0.15);
        if (typeof updateSheldonBuffBadge === 'function') updateSheldonBuffBadge();
    }
}


// ============================================================
// CINEMATIC AMBIENT EFFECTS
// ============================================================
var arenaEmberTimer = null;

function spawnArenaEmbers() {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    if (hangoutMode) return;
    const arena = document.getElementById('arena');
    if (!arena) return;
    // Cap: max 6 embers at a time
    var existing = arena.querySelectorAll('.arena-ember');
    if (existing.length >= 6) return;
    for (let i = 0; i < 2; i++) {
        const ember = document.createElement('div');
        ember.className = 'arena-ember';
        const x = 5 + Math.random() * 90;
        const size = 2 + Math.random() * 3;
        const dur = 2.5 + Math.random() * 3;
        const colors = ['#f59e0b','#ef4444','#fb923c','#fbbf24'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        ember.style.cssText = `position:absolute;bottom:8%;left:${x}%;width:${size}px;height:${size}px;border-radius:50%;background:${color};box-shadow:0 0 ${size+2}px ${color};pointer-events:none;z-index:5;animation:emberFloat ${dur}s ease-out forwards;opacity:0;`;
        arena.appendChild(ember);
        setTimeout(() => { if (ember.parentNode) ember.remove(); }, dur * 1000 + 100);
    }
}

function startArenaAmbience() {
    if (arenaEmberTimer) clearInterval(arenaEmberTimer);
    arenaEmberTimer = setInterval(spawnArenaEmbers, 1500);
}

// Enhanced kill streak banner
var lastKillStreakAnnouncement = 0;

function showCinematicKillBanner(streak) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    const arena = document.getElementById('arena');
    if (!arena) return;
    const now = Date.now();
    if (now - lastKillStreakAnnouncement < 800) return;
    lastKillStreakAnnouncement = now;
    
    let text = '', color = '#fbbf24';
    if (streak >= 25) { text = '\u{1F431}\u{1F525} SOFT KITTY FURY!! \u{1F525}\u{1F431}'; color = '#ef4444'; }
    else if (streak >= 15) { text = '\u{1F525} HOLY SMOKES, HOWIE! \u{1F525}'; color = '#f97316'; }
    else if (streak >= 10) { text = '\u26A1 I\'M NOT CRAZY! \u26A1'; color = '#eab308'; }
    else if (streak >= 5) { text = '\u{1F4A5} BAZINGA! \u{1F4A5}'; color = '#fbbf24'; }
    else return;
    
    const banner = document.createElement('div');
    banner.style.cssText = `position:absolute;top:40%;left:50%;z-index:200;text-align:center;pointer-events:none;animation:killBannerSlide 1.5s ease-out forwards;`;
    banner.innerHTML = `<div style="background:linear-gradient(90deg,transparent,${color}20,${color}35,${color}20,transparent);padding:10px 50px;box-sizing:border-box;border-top:2px solid ${color}80;border-bottom:2px solid ${color}80;">
        <div style="font-size:16px;font-weight:900;color:${color};letter-spacing:5px;text-shadow:0 0 20px ${color},0 2px 4px rgba(0,0,0,0.8);font-family:'Press Start 2P',monospace;">${text}</div>
        <div style="font-size:8px;color:#94a3b8;margin-top:3px;letter-spacing:2px;">${streak} KILL STREAK</div>
    </div>`;
    arena.appendChild(banner);
    setTimeout(() => { if (banner.parentNode) banner.remove(); }, 1600);
}

// Wave transition announcement
function showWaveAnnouncement(wave, isBoss) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    const arena = document.getElementById('arena');
    if (!arena) return;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;inset:0;z-index:200;pointer-events:none;display:flex;align-items:center;justify-content:center;';
    
    if (isBoss) {
        overlay.innerHTML = `<div style="text-align:center;animation:bossIntroSlam 0.8s cubic-bezier(0.175,0.885,0.32,1.275);">
            <div style="font-size:10px;color:#ef4444;letter-spacing:4px;text-transform:uppercase;margin-bottom:4px;text-shadow:0 0 10px #dc2626;">\u2620\uFE0F BOSS FIGHT \u2620\uFE0F</div>
            <div style="font-size:24px;font-weight:900;color:#fbbf24;text-shadow:0 0 30px rgba(251,191,36,0.5),0 2px 4px rgba(0,0,0,0.8);letter-spacing:3px;">EPISODE ${wave}</div>
        </div>`;
    } else {
        overlay.innerHTML = `<div style="text-align:center;animation:waveAnnounce 1.2s ease-out forwards;">
            <div style="font-size:8px;color:#94a3b8;letter-spacing:3px;text-transform:uppercase;">EPISODE</div>
            <div style="font-size:20px;font-weight:900;color:white;text-shadow:0 0 15px rgba(255,255,255,0.3),0 2px 4px rgba(0,0,0,0.8);letter-spacing:2px;">${wave}</div>
        </div>`;
    }
    arena.appendChild(overlay);
    setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, isBoss ? 1500 : 1300);
}

// Kill flash effect
function showKillFlash() {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    const arena = document.getElementById('arena');
    if (!arena) return;
    const flash = document.createElement('div');
    flash.className = 'kill-flash';
    flash.style.cssText = 'position:absolute;inset:0;z-index:100;background:white;pointer-events:none;';
    arena.appendChild(flash);
    setTimeout(() => { if (flash.parentNode) flash.remove(); }, 400);
}

// Enemy death explosion with particles
function enemyDeathExplosion() {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    const arena = document.getElementById('arena');
    const enemy = document.getElementById('enemy-container');
    if (!arena || !enemy) return;
    const er = enemy.getBoundingClientRect();
    const ar = arena.getBoundingClientRect();
    const cx = er.left - ar.left + er.width / 2;
    const cy = er.top - ar.top + er.height / 2;
    
    // Burst particles
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        const angle = (Math.PI * 2 / 12) * i;
        const vel = 40 + Math.random() * 80;
        const pColors = ['#fbbf24','#ef4444','#f97316','#ffffff','#22c55e'];
        const pc = pColors[Math.floor(Math.random() * pColors.length)];
        const sz = 3 + Math.random() * 5;
        p.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;border-radius:50%;background:${pc};box-shadow:0 0 6px ${pc};pointer-events:none;z-index:150;animation:sparkScatter 0.6s cubic-bezier(0.1,1,0.2,1) forwards;`;
        p.style.setProperty('--x', `${Math.cos(angle) * vel}px`);
        p.style.setProperty('--y', `${Math.sin(angle) * vel}px`);
        arena.appendChild(p);
        setTimeout(() => { if (p.parentNode) p.remove(); }, 650);
    }
    
    // Big flash ring
    const ring = document.createElement('div');
    ring.style.cssText = `position:absolute;left:${cx-30}px;top:${cy-30}px;width:60px;height:60px;border-radius:50%;border:3px solid #fbbf24;box-shadow:0 0 20px #fbbf24;pointer-events:none;z-index:150;opacity:0.8;animation:sparkScatter 0.5s ease-out forwards;`;
    ring.style.setProperty('--x', '0px');
    ring.style.setProperty('--y', '0px');
    arena.appendChild(ring);
    setTimeout(() => { if (ring.parentNode) ring.remove(); }, 550);
}

function processDamage(amt, attackerKey, forceCrit = false, lifestealMulti = 0) {
    if (typeof currentEnemy === 'undefined' || currentEnemy === null || currentEnemy.hp <= 0) return;

    let finalDmg = amt;
    let isCrit = forceCrit;

    var ste = typeof getSkillTreeEffects === 'function' ? getSkillTreeEffects() : {};
    
    // Equipment bonus damage
    if (attackerKey && typeof getCharEquipmentStats === 'function') {
        var eqStats = getCharEquipmentStats(attackerKey);
        finalDmg += (eqStats.dmg || 0);
    }
    // Set bonus damage
    if (attackerKey && typeof getCharSetBonusStats === 'function') {
        var setStats = getCharSetBonusStats(attackerKey);
        if (setStats.dmgPct) finalDmg = Math.floor(finalDmg * (1 + setStats.dmgPct / 100));
    }
    
    let currentCritChance = typeof rageDuration !== 'undefined' && rageDuration > 0 ? 0.60 : 0.12;
    currentCritChance += (ste.critChance || 0); // Skill tree crit bonus
    // Equipment crit bonus
    if (attackerKey && typeof getCharEquipmentStats === 'function') {
        currentCritChance += (getCharEquipmentStats(attackerKey).critPct || 0);
    }
    // Set bonus crit bonus
    if (attackerKey && typeof getCharSetBonusStats === 'function') {
        var setStats2 = getCharSetBonusStats(attackerKey);
        currentCritChance += ((setStats2.critPct || 0) / 100);
    }
    if (!forceCrit && Math.random() < currentCritChance && attackerKey !== 'penny') {
        isCrit = true;
    }

    if (isCrit) {
        finalDmg *= (ste.critMulti || 2.0); // Skill tree crit multiplier
    }

    // Beverly Loot Boost — passive handled in dropResources()

    currentEnemy.hp -= finalDmg;
    state.score += Math.floor(finalDmg);
    
    // Combat log (every 3rd hit to avoid spam)
    combatHitCounter = (typeof combatHitCounter !== 'undefined') ? combatHitCounter + 1 : 1;
    if (combatHitCounter % 3 === 0 && typeof window.addCombatLog === 'function') {
        window.addCombatLog(isCrit ? '\u{1F4A5}' : '\u2694\uFE0F', (attackerKey || 'tap') + ' \u2192 ' + Math.floor(finalDmg));
    }
    
    // SKILL TREE & PASSIVE: Life Steal - heal the attacker
    // BALANCE: Cap lifesteal at 30% to prevent unkillable tanks at high levels
    // Also cap heal per hit to 15% of attacker's max HP
    const LIFESTEAL_CAP = 0.30;         // Max 30% of damage dealt
    const LIFESTEAL_HEAL_CAP_PCT = 0.15; // Max 15% of attacker's max HP per hit
    let totalLifestealPct = Math.min(ste.lifestealPct + lifestealMulti, LIFESTEAL_CAP);
    if (totalLifestealPct > 0 && attackerKey) {
        var lsHeal = Math.floor(finalDmg * totalLifestealPct);
        if (lsHeal > 0 && state.roster[attackerKey] && state.roster[attackerKey].currentHp > 0) {
            var maxHpLS = state.roster[attackerKey].maxHp || 100;
            // Cap heal per hit to prevent massive heals
            var maxHealPerHit = Math.floor(maxHpLS * LIFESTEAL_HEAL_CAP_PCT);
            lsHeal = Math.min(lsHeal, maxHealPerHit);
            state.roster[attackerKey].currentHp = Math.min(maxHpLS, state.roster[attackerKey].currentHp + lsHeal);
            const el = document.getElementById('live-character-' + attackerKey);
            if (el) { const r = el.getBoundingClientRect(); generateDamagePopup({clientX: r.left, clientY: r.top}, "+" + lsHeal, false, true, false); }
        }
    }
    
    // ENEMY COUNTER-ATTACK: Enemies now damage characters back
    // Fixed: Enemy damage now scales purely with wave level, rather than being compounded by their massive maxHp
    // Nerfed further per user feedback: Reduced base damage and scaling exponent
    // MOVED: Enemy attack is now handled by an independent timer in spawnEnemy, rather than on every player click!
    
    const arena = document.getElementById('arena');
    const enemyFrame = document.getElementById('enemy-graphic-frame');
    if (enemyFrame && !enemyFrame._hurtThrottle) {
        enemyFrame.classList.add('enemy-hurt-cinematic');
        enemyFrame._hurtThrottle = true;
        setTimeout(() => { enemyFrame.classList.remove('enemy-hurt-cinematic'); enemyFrame._hurtThrottle = false; }, 400);
    }

    if (isCrit && arena && !arena._shakeThrottle) {
        arena.classList.add('screen-shake-active');
        arena._shakeThrottle = true;
        setTimeout(() => { arena.classList.remove('screen-shake-active'); arena._shakeThrottle = false; }, 350);
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
        // In tower mode, the tower module handles enemy defeat and advancement
        if (window.towerMode) {
            scheduleSyncUI();
            return;
        }
        if (isBossActive) {
            // BOSS DEFEATED: Advance to the next wave and grant a massive reward
            clearInterval(bossTimerId);
            isBossActive = false;
            let reward = Math.floor(60 * Math.pow(1.25, state.wave - 1));
            state.resources.money += reward;
            dropResources(true);
            if (typeof window.addCombatLog === 'function') window.addCombatLog('\u{1F4B0}', 'Loot dropped!');
            
            // BP is earned through PRESTIGE, not boss kills

            
            state.wave++; // The ONLY place the wave advances now
            state.minionsDefeated = 0; // Reset minion counter for next wave
            killStreak = 0; updateStreakDisplay();
            // Cinematic effects
            enemyDeathExplosion();
            showKillFlash();
            showWaveAnnouncement(state.wave, false);
            
            // Hide boss timer bar
            var bc = document.getElementById('boss-controls'); if (bc) bc.classList.add('hidden');
            
            // Unlock new map every 8 waves
            checkMapUnlock(state.wave);
            
            // Trigger Wave 80 story cutscene (Young Sheldon timeline)
            if (typeof window.shouldTriggerWave80Story === 'function' && window.shouldTriggerWave80Story()) {
                setTimeout(function() { window.triggerWave80Story(); }, 2000);
            }
            
            // Trigger Wave 150 story cutscene (Multiverse Saga)
            if (state.wave >= 150 && !state.story_wave150_seen) {
                state.story_wave150_seen = true;
                setTimeout(function() {
                    if (typeof window.triggerWave150Story === 'function') {
                        window.triggerWave150Story();
                    } else {
                        // Fallback inline cutscene
                        var modal = document.createElement('div');
                        modal.id = 'mv-story-modal';
                        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
                        modal.innerHTML = '<div style="max-width:440px;background:linear-gradient(135deg,#0f172a,#1e1b4b,#0f172a);border:2px solid #7c3aed;border-radius:16px;padding:24px;text-align:center;color:#e2e8f0;">' +
                            '<div style="font-size:28px;margin-bottom:8px;">🌀</div>' +
                            '<h2 style="color:#a78bfa;font-size:18px;font-weight:900;letter-spacing:3px;margin-bottom:12px;">THE MULTIVERSE SAGA</h2>' +
                            '<p style="font-size:11px;line-height:1.6;color:#cbd5e1;margin-bottom:16px;">Sheldon\\\'s string theory experiment at Caltech collided with Dr. Chaos\\\'s technology. Reality itself is tearing apart — multiverse rifts are opening across dimensions!</p>' +
                            '<p style="font-size:11px;line-height:1.6;color:#c4b5fd;margin-bottom:16px;">A figure steps through the brightest rift. He looks exactly like Sheldon... but different. Confident. Accomplished. <br><br><strong style="color:#fbbf24;">"I am the Sheldon who discovered everything. String theory. Dark matter. The unified field. And I need your help to fix what you\\\'ve broken."</strong></p>' +
                            '<p style="font-size:10px;color:#22c55e;margin-bottom:16px;">✅ 12 new dimensions unlocked!<br>✅ 10 new characters available!<br>✅ Lineup expanded to 12 slots!</p>' +
                            '<button onclick="this.closest(\\\'#mv-story-modal\\\').remove()" style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;border:none;padding:10px 32px;border-radius:8px;font-weight:900;cursor:pointer;font-size:12px;letter-spacing:2px;">ENTER THE MULTIVERSE</button>' +
                            '</div>';
                        document.body.appendChild(modal);
                    }
                    // Auto-unlock True Sheldon
                    if (!state.roster.mv_true_sheldon) {
                        state.roster.mv_true_sheldon = { level: 1, currentHp: 120, maxHp: 120, status: 'idle', xp: 0 };
                    }
                    saveProgress();
                }, 2000);
            }
            
            // Trigger Wave 250 story cutscene (Genesis Protocol)
            if (state.wave >= 250 && !state.story_wave250_seen) {
                state.story_wave250_seen = true;
                setTimeout(function() {
                    if (typeof window.triggerWave250Story === 'function') {
                        window.triggerWave250Story();
                    } else {
                        // Fallback inline cutscene
                        var modal = document.createElement('div');
                        modal.id = 'gen-story-modal';
                        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.97);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
                        modal.innerHTML = '<div style="max-width:440px;background:linear-gradient(135deg,#0f172a,#422006,#0f172a);border:2px solid #eab308;border-radius:16px;padding:24px;text-align:center;color:#e2e8f0;">' +
                            '<div style="font-size:28px;margin-bottom:8px;">🔮</div>' +
                            '<h2 style="color:#fbbf24;font-size:18px;font-weight:900;letter-spacing:3px;margin-bottom:12px;">THE GENESIS PROTOCOL</h2>' +
                            '<p style="font-size:11px;line-height:1.6;color:#cbd5e1;margin-bottom:16px;">The multiverse rifts revealed something deeper — hidden layers of reality itself. Ancient equations carved into the fabric of spacetime.</p>' +
                            '<p style="font-size:11px;line-height:1.6;color:#fde68a;margin-bottom:16px;">The trail leads to three forbidden truths:<br><br><strong style="color:#ef4444;">The Illuminati.</strong> A secret society hiding the true laws of physics.<br><strong style="color:#a78bfa;">The Divine War.</strong> Gods fighting over who controls creation.<br><strong style="color:#22d3ee;">Genesis Day.</strong> The moment the Big Bang happened.</p>' +
                            '<p style="font-size:10px;color:#22c55e;margin-bottom:16px;">✅ 12 new realms unlocked!<br>✅ 4 new legendary characters!<br>✅ Discover the origin of the universe!</p>' +
                            '<button onclick="this.closest(\\\'#gen-story-modal\\\').remove()" style="background:linear-gradient(135deg,#eab308,#ca8a04);color:black;border:none;padding:10px 32px;border-radius:8px;font-weight:900;cursor:pointer;font-size:12px;letter-spacing:2px;">BEGIN THE PROTOCOL</button>' +
                            '</div>';
                        document.body.appendChild(modal);
                    }
                    // Auto-unlock The Grand Architect
                    if (!state.roster.gen_architect) {
                        state.roster.gen_architect = { level: 1, currentHp: 130, maxHp: 130, status: 'idle', xp: 0 };
                    }
                    saveProgress();
                }, 2000);
            }
            
            // === STAT TRACKING ===
            if (typeof trackStat === 'function') { trackStat('totalKills', 1); trackStat('bossKills', 1); trackStat('highestWave', state.wave); trackStat('moneyEarned', reward); }
            if (typeof window.addCombatLog === 'function') window.addCombatLog('\u{1F480}', 'BOSS defeated!');
            if (typeof updateQuestProgress === 'function') { updateQuestProgress('defeat_boss', 1); updateQuestProgress('kill_minions', 1); }
            if (typeof updateEventProgress === 'function') updateEventProgress('boss_rush', 1);
            // Record in battle log
            if (typeof recordBattle === 'function') {
                recordBattle('boss', 'victory', { enemy: 'Wave ' + (state.wave - 1) + ' Boss', reward: reward });
            }
            // Dialogue triggers on boss kill/wave advance
            if (typeof checkDialogueTriggers === 'function') {
                if (state.stats && state.stats.bossKills === 1) checkDialogueTriggers('firstBoss');
                checkDialogueTriggers('wave', state.wave);
            }
            // Equipment drop from boss
            if (typeof generateEquipmentDrop === 'function') {
                var eqDrop = generateEquipmentDrop(state.wave);
                if (eqDrop) { addEquipmentToInventory(eqDrop); renderEquipmentDropNotification(eqDrop); }
            }
            // Event tokens
            if (typeof isEventActive === 'function' && isEventActive('scavenger_hunt')) {
                if (Math.random() < 0.5 && state.events) { state.events.tokens += 3; }
            }
            
            spawnEnemy();
            // Tutorial trigger after boss kill
            if (typeof checkTutorialTriggers === 'function') setTimeout(checkTutorialTriggers, 800);
        } else {
            // MINION DEFEATED: Stay on the same wave, grant smaller farming reward
            state.minionsDefeated = (state.minionsDefeated || 0) + 1;
            let reward = Math.floor(8 * Math.pow(1.15, state.wave - 1));
            // Event: Double Drop
            if (typeof isEventActive === 'function' && isEventActive('double_drop')) reward *= 2;
            state.resources.money += reward;
            dropResources(false);
            if (typeof window.addCombatLog === 'function') window.addCombatLog('\u{1F4B0}', 'Loot dropped!');
            
            // === STAT TRACKING ===
            if (typeof trackStat === 'function') { trackStat('totalKills', 1); trackStat('moneyEarned', reward); }
            if (typeof window.addCombatLog === 'function') window.addCombatLog('\u{1F480}', 'Enemy defeated!');
            if (typeof updateQuestProgress === 'function') { updateQuestProgress('kill_minions', 1); updateQuestProgress('earn_money', reward); }
            // Event tokens
            if (typeof isEventActive === 'function' && isEventActive('scavenger_hunt')) {
                if (Math.random() < 0.15 && state.events) { state.events.tokens++; }
            }
            
            // Notice state.wave++ is removed from here
            spawnEnemy();
            // Tutorial trigger after minion kill
            if (typeof checkTutorialTriggers === 'function') setTimeout(checkTutorialTriggers, 500);
        }
        
        // Aggressively simulate bot progression when playing actively
        if (typeof db !== 'undefined' && db && !isGuest && Math.random() < 0.2) {
            db.rpc('simulate_bot_progress').then(function(){}).catch(function(e){});
        }
    }
    // Performance: batch UI updates instead of running syncUI on every damage tick
    scheduleSyncUI();
}

// Throttled syncUI — batches multiple calls into one per animation frame
var _syncUIScheduled = false;
function scheduleSyncUI() {
    if (_syncUIScheduled) return;
    _syncUIScheduled = true;
    requestAnimationFrame(function() {
        _syncUIScheduled = false;
        syncUI();
    });
}

var _lastSparkTime = 0;
function generateImpactSparks(event) {
    if (hangoutMode) return;
    var now = Date.now();
    if (now - _lastSparkTime < 150) return;
    _lastSparkTime = now;
    var arena = document.getElementById('arena');
    if (!arena) return;
    var arenaRect = arena.getBoundingClientRect();
    for (var i = 0; i < 3; i++) {
        var spark = document.createElement('div');
        spark.className = 'impact-spark';
        spark.style.left = (event.clientX - arenaRect.left) + 'px';
        spark.style.top = (event.clientY - arenaRect.top) + 'px';
        var angle = Math.random() * Math.PI * 2;
        var velocity = 30 + Math.random() * 60;
        spark.style.setProperty('--x', (Math.cos(angle) * velocity) + 'px');
        spark.style.setProperty('--y', (Math.sin(angle) * velocity) + 'px');
        arena.appendChild(spark);
        setTimeout(function(s) { return function() { if(s.parentNode) s.remove(); }; }(spark), 500);
    }
}

// ENEMY COUNTER-ATTACK: Apply damage to all active characters
function applyEnemyCounter(damageAmount) {
    if (!state.bossAttackCounter) state.bossAttackCounter = 0;
    
    // Check if current enemy is a boss
    let isBoss = false;
    if (typeof bossTypes !== 'undefined' && currentEnemy && currentEnemy.type && currentEnemy.type.key) {
        isBoss = bossTypes.some(b => b.key === currentEnemy.type.key);
    }
    
    let isGlobalStrike = false;
    let isStun = false;

    if (isBoss) {
        state.bossAttackCounter++;
        if (state.bossAttackCounter % 3 === 0) {
            const bKey = currentEnemy.type.key;
            const isDragonOrDnd = bKey === 'dnd_boss' || bKey === 'red_dragon';
            const isHealBoss = bKey === 'xenomorph_queen' || bKey === 'scifi_mech' || bKey === 'gorn' || bKey === 'demogorgon' || bKey === 'minotaur' || bKey === 'broken_elevator';
            
            if (isHealBoss) {
                // Nerfed: was 15%, now 3% (further reduced by anti-heal skill tree)
                var skillEffects = typeof getSkillTreeEffects === 'function' ? getSkillTreeEffects() : { antiHealPct: 0 };
                var healPct = 0.03 * (1 - (skillEffects.antiHealPct || 0));
                if (healPct > 0) {
                    const healAmt = Math.floor(currentEnemy.maxHp * healPct);
                    currentEnemy.hp = Math.min(currentEnemy.maxHp, currentEnemy.hp + healAmt);
                    generateDamagePopup({clientX: window.innerWidth/2 + 100, clientY: window.innerHeight/3}, "+" + healAmt, false, true, false);
                }
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
    // Use formation-based lanes for targeting
    ensureFormation();
    ['front', 'mid', 'back'].forEach(function(lane) {
        state.formation[lane].forEach(function(slot) {
            if (!slot || slot.type !== 'char') return;
            const key = slot.key;
            if (!state.equipped[key] || !state.roster[key] || state.roster[key].level <= 0 || state.roster[key].status === 'hospitalized') return;
            if (lane === 'front') front.push({type: 'char', key});
            else if (lane === 'mid') mid.push({type: 'char', key});
            else back.push({type: 'char', key});
        });
    });
    
    // Use formation.bots for robot targeting (bots default to front lane for targeting)
    if (state.formation.bots) {
        state.formation.bots.forEach(function(slot) {
            if (!slot) return;
            const idx = state.robots.findIndex(r => r && r.blueprintId === slot.key && r.equipped && !r.overheated);
            if (idx !== -1) {
                const lane = slot.lane || 'front';
                if (lane === 'front') front.push({type: 'bot', idx});
                else if (lane === 'mid') mid.push({type: 'bot', idx});
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
            const maxHp = charData.maxHp || Math.floor((config.baseHp || 100) * Math.pow(config.lane === 'front' ? 1.80 : 1.25, charData.level - 1));
            if (typeof charData.currentHp === 'undefined' || isNaN(charData.currentHp)) {
                charData.currentHp = maxHp;
                charData.maxHp = maxHp;
            }
            // SKILL TREE: Defense - reduce incoming damage
            var steDefense = typeof getSkillTreeEffects === 'function' ? getSkillTreeEffects() : {};
            var actualDmg = Math.floor(damagePerTarget * (1 - (steDefense.dmgReduction || 0)));
            
            // PASSIVE: Prof. Proton immune every 3 hits
            let isImmune = false;
            if (charKey === 'proton' && config.passiveType === 'immuneHits') {
                if (!charData.hitsTaken) charData.hitsTaken = 0;
                charData.hitsTaken++;
                if (charData.hitsTaken >= (config.basePassiveAmount || 3)) {
                    charData.hitsTaken = 0;
                    isImmune = true;
                    actualDmg = 0;
                }
            }
            
            charData.currentHp -= actualDmg;
            
            const charEl = document.getElementById('live-character-' + charKey);
            if (charEl) {
                const rect = charEl.getBoundingClientRect();
                if (isImmune) {
                    generateDamagePopup({ clientX: rect.left + rect.width / 2, clientY: rect.top }, "IMMUNE", false, true, false);
                } else {
                    generateDamagePopup({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, damagePerTarget, false, false, true);
                    // Character hurt animation - recoil + flash
                    if (!charEl._hurtThrottle) {
                        charEl._hurtThrottle = true;
                        charEl.classList.add('char-hurt');
                        // Spawn enemy projectile toward this character
                        spawnEnemyProjectile(charKey, isBoss);
                        setTimeout(function() {
                            charEl.classList.remove('char-hurt');
                            charEl._hurtThrottle = false;
                        }, 350);
                    }
                }
            }
            // SKILL TREE: Deflect - reflect damage back
            if (steDefense.reflectPct > 0 && currentEnemy.hp > 0) {
                var reflectDmg = Math.floor(actualDmg * steDefense.reflectPct);
                if (reflectDmg > 0) currentEnemy.hp -= reflectDmg;
            }
            // PASSIVE: Beverly Deflect
            if (charKey === 'beverly' && config.passiveType === 'deflectLoot' && !isImmune && currentEnemy.hp > 0) {
                var bevDeflect = Math.floor(actualDmg * (config.basePassiveAmount || 0.2));
                if (bevDeflect > 0) {
                    currentEnemy.hp -= bevDeflect;
                    generateDamagePopup({ clientX: 200, clientY: 200 }, bevDeflect, false, false, false);
                }
            }
            
            if (charData.currentHp <= 0) sendToHospital(charKey);
        } else if (target.type === 'bot') {
            const bot = state.robots[target.idx];
            const maxHeat = bot.maxHeat || (robots[bot.blueprintId].baseHeat || 200) * bot.level;
            if (typeof bot.heat === 'undefined' || isNaN(bot.heat)) {
                bot.heat = 0;
                bot.maxHeat = maxHeat;
            }
            bot.heat += Math.floor(damagePerTarget * 0.3); // Enemy counter-attacks add 30% of damage as heat
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
    
    // Lightweight HP-only update instead of full re-render
    _updateBattleLineHP();
    if (renderRobotsNeeded && typeof updateRobotHeatBars === 'function') updateRobotHeatBars();
}


// HOSPITAL SYSTEM: Send injured character to hospital
function sendToHospital(charKey) {
    const charData = state.roster[charKey];
    if (!charData) return;
    charData.currentHp = 0;
    charData.status = 'hospitalized';
    var hospitalDuration = 300000; // 5 minute default recovery
    if (state.perks && state.perks.fastHospital) hospitalDuration = Math.floor(hospitalDuration * 0.5);
    charData.hospitalEndTime = Date.now() + hospitalDuration;
    
    // Remove from active combat
    state.equipped[charKey] = false;
    
    // Clear this character's attack timer to stop ghost attacks
    if (typeof gameTimers !== 'undefined' && gameTimers[charKey]) {
        clearInterval(gameTimers[charKey]);
        delete gameTimers[charKey];
    }
    
    if (!state.hospitalized) state.hospitalized = [];
    if (!state.hospitalized.includes(charKey)) {
        state.hospitalized.push(charKey);
    }
    
    // Visual: death burst effect on the character element
    const charEl = document.getElementById('live-character-' + charKey);
    if (charEl) {
        const rect = charEl.getBoundingClientRect();
        // Show KO popup
        generateDamagePopup({ clientX: rect.left + rect.width/2, clientY: rect.top }, "☠️ KO!", false, true, true);
        // Flash red and fade out
        charEl.style.transition = 'all 0.4s ease-out';
        charEl.style.filter = 'brightness(3) saturate(0)';
        charEl.style.opacity = '0';
        charEl.style.transform = 'scale(0.5) translateY(20px)';
        setTimeout(() => { if (charEl.parentNode) charEl.remove(); }, 500);
    }
    
    // Re-render battle line and recalculate synergies after a short delay
    setTimeout(() => {
        if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
        if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
        if (typeof calculateSynergies === 'function') calculateSynergies();
        if (typeof syncUI === 'function') syncUI();
    }, 600);
    
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
            charData.hp = charData.maxHp;
            charData.status = 'healthy';
            charData.hospitalEndTime = 0;
            recovered.push(charKey);
        }
    });
    
    // Remove recovered characters from hospital and re-equip them
    recovered.forEach(charKey => {
        const idx = state.hospitalized.indexOf(charKey);
        if (idx >= 0) state.hospitalized.splice(idx, 1);
        // Re-equip so they show up in battle lineup again
        state.equipped[charKey] = true;
    });
    
    if (recovered.length > 0) {
        console.log(`Characters recovered from hospital: ${recovered.join(', ')}`);
        // Re-render battle line so healed characters reappear
        if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
        if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
        if (typeof startAutomationEngines === 'function') startAutomationEngines();
        if (typeof calculateSynergies === 'function') calculateSynergies();
        if (typeof syncUI === 'function') syncUI();
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
    
    // Stat tracking
    if (typeof trackStat === 'function') trackStat('foodUsed', 1);
    if (typeof updateQuestProgress === 'function') updateQuestProgress('use_food', 1);
    
    // If character is recovered, remove from hospital and re-equip
    if (charData.status === 'hospitalized' && charData.currentHp >= charData.maxHp * 0.3) {
        charData.status = 'healthy';
        charData.hospitalEndTime = 0;
        charData.hp = charData.currentHp; // sync both hp fields
        const idx = state.hospitalized.indexOf(charKey);
        if (idx >= 0) state.hospitalized.splice(idx, 1);
        // Re-equip so they show up in battle lineup again
        state.equipped[charKey] = true;
        // Re-render battle line so healed character reappears
        setTimeout(() => {
            if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
            if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
            if (typeof startAutomationEngines === 'function') startAutomationEngines();
            if (typeof calculateSynergies === 'function') calculateSynergies();
            if (typeof syncUI === 'function') syncUI();
        }, 100);
    }
    
    console.log(`${charKey} used ${foodConfig.name} and recovered ${foodConfig.hpRestore} HP`);
    return true;
}

function updateEnemyHealthBar() {
    const bar = document.getElementById('enemy-hp-bar');
    const txt = document.getElementById('enemy-hp-text');
    const pct = Math.max(0, (currentEnemy.hp / currentEnemy.maxHp) * 100);
    if (bar) bar.style.width = pct + '%';
    if (txt) txt.innerText = formatNumber(Math.floor(currentEnemy.hp)) + '/' + formatNumber(currentEnemy.maxHp) + ' HP';
}

function startAutomationEngines() {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    Object.values(gameTimers).forEach(clearInterval);
    gameTimers = {};

    for (const [key, config] of Object.entries(characters)) {
        if (!state.roster[key] || !state.equipped[key]) continue;

        let rate = config.atkSpeed;
        if (typeof rageDuration !== 'undefined' && rageDuration > 0) rate *= 0.45; 
        const speedMult = typeof getSpeedMultiplier === 'function' ? getSpeedMultiplier() : 1;
        rate = Math.floor(rate / speedMult);

        // Leslie attacks slower
        if (config.passiveType === 'backlineCrit') rate *= 1.5;

        gameTimers[key] = setInterval(() => {
            if (!window.gameStarted) return; // Suppress until title screen dismissed
            if (!state.equipped[key] || !state.roster[key] || state.roster[key].status === 'hospitalized' || state.roster[key].currentHp <= 0) return;
            if (state.roster[key].stunnedUntil && Date.now() < state.roster[key].stunnedUntil) return;
            triggerUniqueVisuals(key);
            
            let outDmg = config.baseDmg * state.roster[key].level;
            if (state.roster[key].talents && state.roster[key].talents.dmg) {
                outDmg = Math.floor(outDmg * (1 + (state.roster[key].talents.dmg * 0.10)));
            }
            // Prestige perk: Damage Boost (+10% per level)
            if (state.perks && state.perks.dmgMult) {
                outDmg = Math.floor(outDmg * (1 + state.perks.dmgMult * 0.10));
            }

            const pType = config.passiveType;

            // Calculate lifesteal from tier scaling (Leonard, Stuart, Proton, Bert, Zack)
            var tierLifesteal = 0;
            if (config.lifestealTiers && state.roster[key].level) {
                var charLvl = state.roster[key].level;
                for (var ti = config.lifestealTiers.length - 1; ti >= 0; ti--) {
                    if (charLvl >= config.lifestealTiers[ti].level) {
                        tierLifesteal = config.lifestealTiers[ti].pct;
                        break;
                    }
                }
            }

            // Damage execution based on passive
            if (pType === 'critSplash' || pType === 'critAoe' || pType === 'jumpCrit') {
                processDamage(outDmg, key, true, tierLifesteal); // Force Crit + lifesteal
            } else if (pType === 'backlineCrit' || pType === 'critTank') {
                if (Math.random() < 0.5) processDamage(outDmg, key, true, tierLifesteal); // High crit chance
                else processDamage(outDmg, key, false, tierLifesteal);
            } else if (pType === 'lifesteal') {
                processDamage(outDmg, key, false, (config.basePassiveAmount || 0.4) + tierLifesteal);
            } else if (pType === 'sunRay') {
                // RAJ TESLA TOWER: Ramping damage — longer focus = more damage
                // Track stacks on state.roster[key]
                var rosterData = state.roster[key];
                if (!rosterData._rajStacks) rosterData._rajStacks = 0;
                if (!rosterData._rajTargetId) rosterData._rajTargetId = null;

                // Get current enemy identity (wave + enemy index combo)
                var currentTargetId = (state.wave || 0) + '_' + (currentEnemy ? (currentEnemy.name || 'e') : 'none');

                // Reset stacks if target changed or was stunned
                var wasStunned = rosterData.stunnedUntil && rosterData.stunnedUntil > Date.now() - 3000;
                if (rosterData._rajTargetId !== currentTargetId || wasStunned) {
                    rosterData._rajStacks = 0;
                    rosterData._rajTargetId = currentTargetId;
                }

                // Increment stacks (max 20 stacks = 300% bonus)
                rosterData._rajStacks = Math.min(20, rosterData._rajStacks + 1);

                // Ramping multiplier: each stack adds 15% damage
                var rampMulti = 1 + (rosterData._rajStacks * 0.15);
                var rampedDmg = Math.floor(outDmg * rampMulti);

                processDamage(rampedDmg, key, false, tierLifesteal);

                // Show stack indicator every 3 stacks
                if (rosterData._rajStacks > 1 && rosterData._rajStacks % 3 === 0) {
                    var rajEl = document.getElementById('live-character-raj');
                    if (rajEl) {
                        var rr = rajEl.getBoundingClientRect();
                        generateDamagePopup({clientX: rr.left + rr.width/2, clientY: rr.top - 5}, '⚡x' + rosterData._rajStacks, false, true, false);
                    }
                }

                // Still apply DOT but scaled with ramp
                if (!currentEnemy.dots) currentEnemy.dots = [];
                currentEnemy.dots.push({ dmg: Math.floor(rampedDmg * 0.15), ticks: config.basePassiveAmount || 3, source: key });

            } else if (pType === 'poisonAoe') {
                processDamage(outDmg, key, false, tierLifesteal);
                // Apply DOT
                if (!currentEnemy.dots) currentEnemy.dots = [];
                currentEnemy.dots.push({ dmg: Math.floor(outDmg * 0.2), ticks: config.basePassiveAmount || 4, source: key });
            } else if (pType === 'slowStun') {
                processDamage(outDmg, key, false, tierLifesteal);
                if (Math.random() < 0.2 && currentEnemy) {
                    currentEnemy.stunnedUntil = Date.now() + 2000;
                    generateDamagePopup({clientX: window.innerWidth/2, clientY: window.innerHeight/2}, "STUNNED!", false, true, false);
                }
            } else if (pType === 'summonDroid') {
                // Denise's summoner passive: spawn exploding stun-droids
                var droidCount = config.basePassiveAmount || 2;
                var droidDmg = Math.floor(outDmg * (0.6 + state.roster[key].level * 0.02));
                for (var d = 0; d < droidCount; d++) {
                    processDamage(droidDmg, key);
                }
                // Stun on impact (35% chance per attack)
                if (Math.random() < 0.35 && currentEnemy) {
                    currentEnemy.stunnedUntil = Date.now() + 1500;
                    generateDamagePopup({clientX: window.innerWidth/2, clientY: window.innerHeight/2}, "⚡ STUN!", false, true, false);
                }
                // Visual: spawn droid explosion effect
                var arenaEl = document.getElementById('arena');
                if (arenaEl) {
                    var droidFx = document.createElement('div');
                    droidFx.className = 'droid-explosion-fx';
                    droidFx.innerHTML = '🤖💥';
                    droidFx.style.cssText = 'position:absolute;top:40%;left:55%;font-size:2rem;animation:droidExplode 0.6s ease-out forwards;pointer-events:none;z-index:999;';
                    arenaEl.appendChild(droidFx);
                    setTimeout(function() { droidFx.remove(); }, 700);
                }
            } else if (outDmg > 0) {
                processDamage(outDmg, key, false, tierLifesteal);
            }

            // Supportive passives
            if (pType === 'rage') {
                rageDuration = 50 + (state.roster[key].level * 10); 
                const arena = document.getElementById('arena');
                if (arena) arena.classList.add('rage-active-bg');
                startAutomationEngines(); 
            } else if (pType === 'selfHeal') {
                // NERFED: 5% maxHP per hit (down from 10%), capped at 8% maxHP
                var baseHealPct = config.basePassiveAmount || 0.1;
                var nerfedPct = Math.min(baseHealPct, 0.05);
                const healAmt = Math.min(Math.floor(state.roster[key].maxHp * nerfedPct), Math.floor(state.roster[key].maxHp * 0.08));
                if (state.roster[key].currentHp < state.roster[key].maxHp) {
                    state.roster[key].currentHp = Math.min(state.roster[key].maxHp, state.roster[key].currentHp + healAmt);
                    const el = document.getElementById('live-character-' + key);
                    if (el) { const r = el.getBoundingClientRect(); generateDamagePopup({clientX: r.left, clientY: r.top}, "+" + healAmt, false, true, false); }
                    if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();
                }
            } else if (pType === 'coolDown') {
                const coolAmt = (config.basePassiveAmount || 10) * state.roster[key].level;
                let cooled = false;
                if (state.robots) {
                    state.robots.forEach(r => {
                        if (r && r.equipped && r.heat > 0) {
                            r.heat = Math.max(0, r.heat - coolAmt);
                            if (r.overheated && r.heat < r.maxHeat * 0.8) r.overheated = false;
                            cooled = true;
                        }
                    });
                }
                if (cooled && typeof updateRobotHeatBars === 'function') updateRobotHeatBars();
            } else if (pType === 'healScaling' || pType === 'healLoot') {
                // % of max HP heal + flat scaling — stays relevant at all levels
                const healPct = config.healPctMaxHp || 0.08;
                const flatHeal = (config.basePassiveAmount || 5) + (state.roster[key].level * 3);
                let healed = false;
                Object.keys(state.equipped).forEach(charKey => {
                    if (state.equipped[charKey] && state.roster[charKey] && state.roster[charKey].status !== 'hospitalized') {
                        const mhp = state.roster[charKey].maxHp || 100;
                        if (state.roster[charKey].currentHp < mhp) {
                            const healAmt = Math.floor(mhp * healPct) + flatHeal;
                            state.roster[charKey].currentHp = Math.min(mhp, state.roster[charKey].currentHp + healAmt);
                            state.roster[charKey].hp = state.roster[charKey].currentHp;
                            healed = true;
                            // Show green heal popup on each healed character
                            const healEl = document.getElementById('live-character-' + charKey);
                            if (healEl) {
                                const hr = healEl.getBoundingClientRect();
                                generateDamagePopup({clientX: hr.left + hr.width/2, clientY: hr.top}, '+' + healAmt, false, true, false);
                            }
                        }
                    }
                });
                if (healed) {
                    if (typeof _updateBattleLineHP === 'function') _updateBattleLineHP();
                }
            }
        }, rate);
    }
}

var _lastVisualFXTime = {};
function triggerUniqueVisuals(key) {
    if (hangoutMode) return;
    // Throttle: max 1 visual FX per character per 400ms
    var now = Date.now();
    if (_lastVisualFXTime[key] && now - _lastVisualFXTime[key] < 400) return;
    _lastVisualFXTime[key] = now;
    const el = document.getElementById(`live-character-${key}`);
    const arena = document.getElementById('arena');
    const enemyContainer = document.getElementById('enemy-container');
    if (!el || !arena || !enemyContainer) return;
    
    const rect = el.getBoundingClientRect();
    const arenaRect = arena.getBoundingClientRect();
    const enemy = enemyContainer.getBoundingClientRect();

    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 3;
    const enemyCenterX = enemy.left + enemy.width / 2;
    const enemyCenterY = enemy.top + enemy.height / 2;

    const deltaX = enemyCenterX - charCenterX;
    const deltaY = enemyCenterY - charCenterY;

    el.style.setProperty('--target-x', `${deltaX}px`);
    el.style.setProperty('--target-y', `${deltaY}px`);

    // Swap to attack SVG frame
    swapCharacterFrame(key, 'attack', 350);

    if ((key === 'leonard' || key === 'stuart' || key === 'zack' || key === 'emily' || key === 'proton') && !el._dashThrottle) {
        el.classList.add('strike-dash');
        el._dashThrottle = true;
        setTimeout(() => { el.classList.remove('strike-dash'); el._dashThrottle = false; }, 350);
    }

    if (key === 'stuart' && !el._saberThrottle) {
        el.classList.add('saber-swing');
        el._saberThrottle = true;
        setTimeout(() => { el.classList.remove('saber-swing'); el._saberThrottle = false; }, 350);
    }

    // Cap total FX elements in arena to prevent DOM buildup (use counter to avoid DOM scan)
    if (!window._activeFxCount) window._activeFxCount = 0;
    if (window._activeFxCount > 15) return;
    window._activeFxCount++;

    const fx = document.createElement('div');
    fx.style.left = `${charCenterX - arenaRect.left}px`;
    fx.style.top = `${charCenterY - arenaRect.top}px`;
    fx.style.setProperty('--target-x', `${deltaX}px`);
    fx.style.setProperty('--target-y', `${deltaY}px`);
    let removalDelay = 1200;

    switch(key) {
        case 'sheldon':
            fx.className = 'unique-fx green-powerball';
            fx.style.transform = 'scale(2)';
            arena.appendChild(fx);
            removalDelay = 450;
            break;

        case 'leonard':
            fx.className = 'unique-fx physical-sword';
            fx.style.left = `${enemy.left - arenaRect.left - 20}px`;
            fx.style.top = `${enemy.top - arenaRect.top - 10}px`;
            fx.innerHTML = `<svg viewBox="0 0 100 100" class="w-40 h-40 drop-shadow-xl" style="filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));"><path d="M10 90 L80 20 L90 10 L80 0 L70 10 L0 80 Z" fill="#f1f5f9" stroke="#334155" stroke-width="2.5"/><path d="M15 85 L75 25" stroke="#ffffff" stroke-width="3"/><rect x="5" y="80" width="15" height="15" rx="2" fill="#b45309"/></svg>`;
            arena.appendChild(fx);
            removalDelay = 450;
            break;

        case 'penny':
            fx.className = 'unique-fx penny-burger-throw';
            fx.innerHTML = `<svg viewBox="0 0 40 40" class="w-24 h-24 drop-shadow-2xl" style="transform: scale(1.5);"><path d="M 5,20 Q 20,5 35,20 Z" fill="#d97706"/><rect x="5" y="21" width="30" height="4" fill="#16a34a" rx="1"/><rect x="5" y="25" width="30" height="6" fill="#451a03" rx="2"/><rect x="5" y="32" width="30" height="6" fill="#d97706" rx="2"/></svg>`;
            arena.appendChild(fx);
            removalDelay = 1200;
            break;

        case 'howard':
            removalDelay = 500;
            fx.className = 'unique-fx howard-missile';
            fx.innerHTML = `<svg viewBox="0 0 60 20" class="w-24 h-10 drop-shadow-xl" style="filter: drop-shadow(0 0 10px rgba(220,38,38,0.8));"><path d="M0 5 L40 5 L55 10 L40 15 L0 15 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1"/><polygon points="0,5 -12,0 -7,10" fill="#dc2626"/><polygon points="0,15 -12,20 -7,10" fill="#dc2626"/><circle cx="45" cy="10" r="2" fill="#eab308"/></svg>`;
            arena.appendChild(fx);
            break;

        case 'raj':
            {
            const sun = document.createElement('div');
            sun.className = 'unique-fx raj-sun';
            sun.style.left = `${enemy.left - arenaRect.left - 20}px`;
            sun.style.top = `${enemy.top - arenaRect.top - 120}px`;
            sun.innerHTML = `<svg viewBox="0 0 100 100" class="w-32 h-32 animate-spin drop-shadow-2xl" style="animation-duration: 3s; filter: drop-shadow(0 0 20px #ea580c);"><circle cx="50" cy="50" r="30" fill="#ea580c"/><path d="M50 0 L55 15 L70 10 L60 25 L80 30 L65 40 L85 55 L70 60 L75 80 L60 70 L50 90 L40 70 L25 80 L30 60 L15 55 L35 40 L20 30 L40 25 L30 10 L45 15 Z" fill="#facc15"/></svg>`;
            arena.appendChild(sun);
            fx.className = 'unique-fx raj-laser-line';
            fx.style.left = `${rect.right - arenaRect.left}px`;
            fx.style.top = `${rect.top - arenaRect.top + 20}px`;
            arena.appendChild(fx);
            removalDelay = 500;
            setTimeout(() => sun.remove(), 1200);
            }
            break;

        case 'bernie':
            fx.className = 'unique-fx bernie-soundwave';
            fx.style.top = `${rect.top - arenaRect.top + 20}px`;
            arena.appendChild(fx);
            removalDelay = 500;
            break;

        case 'amy':
            {
            const amyLevel = (state.roster && state.roster['amy']) ? state.roster['amy'].level : 1;
            fx.className = 'unique-fx amy-chemical-throw';
            const targetX2 = enemy.left - arenaRect.left;
            const targetY2 = enemy.top - arenaRect.top + 30;
            fx.style.setProperty('--target-x', `${targetX2}px`);
            fx.style.setProperty('--target-y', `${targetY2}px`);
            fx.innerHTML = `<div style="position:relative;display:flex;justify-content:center;align-items:center;"><div class="toxic-trail"></div><svg viewBox="0 0 40 40" class="w-12 h-12 drop-shadow-2xl" style="filter:drop-shadow(0 0 10px #4ade80);position:relative;z-index:2;"><path d="M 15 10 L 25 10 L 22 15 L 28 35 L 12 35 L 18 15 Z" fill="#22c55e" stroke="#14532d" stroke-width="2"/><rect x="18" y="5" width="4" height="6" fill="#94a3b8"/><rect x="16" y="4" width="8" height="2" fill="#475569"/><circle cx="20" cy="25" r="2" fill="#bbf7d0"/><circle cx="24" cy="30" r="1.5" fill="#bbf7d0"/></svg></div>`;
            arena.appendChild(fx);
            setTimeout(() => {
                const splash = document.createElement('div');
                splash.className = 'unique-fx amy-chemical-splash';
                splash.style.left = `${enemy.left - arenaRect.left - 30}px`;
                splash.style.top = `${enemy.top - arenaRect.top + 10}px`;
                splash.innerHTML = `<svg viewBox="0 0 100 100" class="w-32 h-32"><circle cx="50" cy="50" r="40" fill="none" stroke="#4ade80" stroke-width="8" class="animate-ping" opacity="0.8"/></svg>`;
                arena.appendChild(splash);
                setTimeout(() => splash.remove(), 500);
                const puddle = document.createElement('div');
                puddle.className = 'unique-fx amy-chemical-puddle';
                puddle.style.left = `${enemy.left - arenaRect.left - 10}px`;
                puddle.style.top = `${enemy.top - arenaRect.top + 60}px`;
                puddle.innerHTML = `<svg viewBox="0 0 100 40" class="w-28 h-14"><ellipse cx="50" cy="20" rx="40" ry="10" fill="#22c55e" opacity="0.8" filter="drop-shadow(0 0 12px #16a34a)"/><circle cx="30" cy="10" r="3" fill="#86efac" class="animate-ping"/><circle cx="70" cy="15" r="2" fill="#86efac" class="animate-ping" style="animation-delay: 0.5s"/></svg>`;
                arena.appendChild(puddle);
                const dotDmg = characters.amy.baseDmg * amyLevel;
                let ticks = 0;
                const dotInterval = setInterval(() => {
                    if (typeof currentEnemy !== 'undefined' && currentEnemy !== null && currentEnemy.hp > 0 && ticks < 4) {
                        processDamage(dotDmg, 'amy_poison');
                        ticks++;
                    } else { clearInterval(dotInterval); puddle.remove(); }
                }, 1000);
            }, 600);
            removalDelay = 600;
            }
            break;

        case 'mary':
            fx.className = 'unique-fx';
            fx.innerHTML = `<svg viewBox="0 0 60 60" width="50" height="50"><circle cx="30" cy="30" r="25" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.7"><animate attributeName="r" from="10" to="30" dur="0.8s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur="0.8s" fill="freeze"/></circle><text x="30" y="35" text-anchor="middle" font-size="20" fill="#fbbf24">✝</text></svg>`;
            fx.style.cssText = `position:absolute;left:${rect.left - arenaRect.left}px;top:${rect.top - arenaRect.top - 30}px;z-index:999;pointer-events:none;`;
            removalDelay = 800;
            break;

        case 'beverly':
            fx.className = 'unique-fx';
            fx.innerHTML = `<svg viewBox="0 0 30 25" width="30" height="25"><rect x="2" y="2" width="26" height="21" rx="2" fill="#8B4513" stroke="#5c3317" stroke-width="1"/><line x1="15" y1="2" x2="15" y2="23" stroke="#d4a574" stroke-width="1"/></svg>`;
            fx.style.cssText = `position:absolute;left:${rect.left - arenaRect.left + rect.width/2}px;top:${charCenterY - arenaRect.top}px;z-index:999;pointer-events:none;transition:all 0.5s ease-in;`;
            arena.appendChild(fx);
            requestAnimationFrame(() => { fx.style.left = `${enemy.left - arenaRect.left + enemy.width/2}px`; fx.style.top = `${enemyCenterY - arenaRect.top}px`; fx.style.transform = 'rotate(720deg) scale(0.5)'; });
            removalDelay = 500;
            break;

        case 'proton':
            fx.className = 'unique-fx';
            fx.innerHTML = `<svg viewBox="0 0 60 80" width="40" height="60"><rect x="27" y="50" width="6" height="20" rx="2" fill="#666"/><rect x="25" y="5" width="10" height="48" rx="3" fill="#22c55e" opacity="0.9"><animate attributeName="opacity" values="1;0.5;1" dur="0.3s" repeatCount="2"/></rect></svg>`;
            fx.style.cssText = `position:absolute;left:${enemyCenterX - arenaRect.left - 20}px;top:${enemyCenterY - arenaRect.top - 40}px;z-index:999;pointer-events:none;`;
            removalDelay = 500;
            break;

        case 'kripke':
            {
            fx.className = 'unique-fx';
            fx.innerHTML = `<svg viewBox="0 0 50 10" width="45" height="10"><line x1="0" y1="5" x2="40" y2="5" stroke="#8B4513" stroke-width="2"/><polygon points="40,2 48,5 40,8" fill="#a0a0a0"/></svg>`;
            fx.style.cssText = `position:absolute;left:${rect.left - arenaRect.left + rect.width}px;top:${charCenterY - arenaRect.top}px;z-index:999;pointer-events:none;transition:all 0.35s linear;`;
            arena.appendChild(fx);
            requestAnimationFrame(() => { fx.style.left = `${enemy.left - arenaRect.left}px`; fx.style.top = `${enemyCenterY - arenaRect.top}px`; });
            const arrow2 = document.createElement('div');
            arrow2.innerHTML = fx.innerHTML;
            arrow2.style.cssText = `position:absolute;left:${rect.left - arenaRect.left + rect.width}px;top:${charCenterY - arenaRect.top + 12}px;z-index:999;pointer-events:none;transition:all 0.45s linear;`;
            arena.appendChild(arrow2);
            requestAnimationFrame(() => { arrow2.style.left = `${enemy.left - arenaRect.left + 10}px`; arrow2.style.top = `${enemyCenterY - arenaRect.top + 8}px`; });
            setTimeout(() => arrow2.remove(), 500);
            removalDelay = 400;
            }
            break;

        case 'leslie':
            {
            fx.className = 'unique-fx';
            fx.style.cssText = `position:absolute;left:${rect.left - arenaRect.left + rect.width}px;top:${charCenterY - arenaRect.top}px;width:${deltaX}px;height:2px;background:linear-gradient(90deg,#ef4444,#fca5a5,transparent);z-index:999;pointer-events:none;opacity:0;`;
            arena.appendChild(fx);
            requestAnimationFrame(() => { fx.style.opacity = '1'; fx.style.transition = 'opacity 0.05s'; });
            setTimeout(() => { fx.style.opacity = '0'; }, 100);
            const flash = document.createElement('div');
            flash.style.cssText = `position:absolute;left:${rect.left - arenaRect.left + rect.width - 5}px;top:${charCenterY - arenaRect.top - 8}px;width:16px;height:16px;background:radial-gradient(circle,#fff,#ef4444,transparent);border-radius:50%;z-index:999;pointer-events:none;`;
            arena.appendChild(flash);
            setTimeout(() => flash.remove(), 120);
            removalDelay = 200;
            }
            break;

        case 'bert':
            fx.className = 'unique-fx';
            fx.innerHTML = `<svg viewBox="0 0 80 40" width="70" height="35"><polygon points="10,35 20,15 30,35" fill="#78716c"/><polygon points="25,35 38,8 50,35" fill="#a8a29e"/><polygon points="45,35 55,12 65,35" fill="#57534e"/><circle cx="40" cy="30" r="20" fill="rgba(168,162,158,0.3)"><animate attributeName="r" from="5" to="25" dur="0.4s" fill="freeze"/></circle></svg>`;
            fx.style.cssText = `position:absolute;left:${enemyCenterX - arenaRect.left - 35}px;top:${enemyCenterY - arenaRect.top}px;z-index:999;pointer-events:none;`;
            removalDelay = 500;
            break;

        case 'wil':
            fx.className = 'unique-fx';
            fx.style.cssText = `position:absolute;left:${rect.left - arenaRect.left + rect.width}px;top:${charCenterY - arenaRect.top - 2}px;width:${deltaX}px;height:5px;background:linear-gradient(90deg,#f97316,#3b82f6,#60a5fa,transparent);z-index:999;pointer-events:none;opacity:0;border-radius:3px;box-shadow:0 0 8px rgba(59,130,246,0.6);`;
            arena.appendChild(fx);
            requestAnimationFrame(() => { fx.style.opacity = '1'; fx.style.transition = 'opacity 0.08s'; });
            setTimeout(() => { fx.style.opacity = '0'; }, 250);
            removalDelay = 350;
            break;

        case 'zack':
            fx.className = 'unique-fx';
            fx.innerHTML = `<svg viewBox="0 0 50 50" width="45" height="45"><text x="25" y="35" text-anchor="middle" font-size="30" fill="#fbbf24">💥</text><circle cx="25" cy="25" r="20" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.6"><animate attributeName="r" from="5" to="25" dur="0.3s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur="0.3s" fill="freeze"/></circle></svg>`;
            fx.style.cssText = `position:absolute;left:${enemyCenterX - arenaRect.left - 22}px;top:${enemyCenterY - arenaRect.top - 22}px;z-index:999;pointer-events:none;`;
            removalDelay = 400;
            break;

        case 'emily':
            {
            fx.className = 'unique-fx';
            fx.innerHTML = `<svg viewBox="0 0 40 40" width="35" height="35"><path d="M5,35 L20,5 L35,35 Z" fill="none" stroke="#7c3aed" stroke-width="2" opacity="0.8"><animate attributeName="opacity" values="0;1;0" dur="0.4s"/></path></svg>`;
            fx.style.cssText = `position:absolute;left:${enemyCenterX - arenaRect.left - 17}px;top:${enemyCenterY - arenaRect.top - 17}px;z-index:999;pointer-events:none;`;
            const shadow = document.createElement('div');
            shadow.style.cssText = `position:absolute;left:${rect.left - arenaRect.left}px;top:${rect.top - arenaRect.top}px;width:${rect.width}px;height:${rect.height}px;background:rgba(124,58,237,0.3);border-radius:50%;z-index:998;pointer-events:none;filter:blur(4px);`;
            arena.appendChild(shadow);
            setTimeout(() => shadow.remove(), 400);
            removalDelay = 400;
            }
            break;
    }

    setTimeout(() => { fx.remove(); if (window._activeFxCount > 0) window._activeFxCount--; }, removalDelay);
}

var _lastPopupTime = 0;
var _activePopups = [];
function generateDamagePopup(event, val, isCrit, isSpecialText, isEnemyDamage = false) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    if (state.showDmgNumbers === false) return;
    if (hangoutMode) return; // skip in hangout
    // Throttle: max ~10 popups/sec for non-special text
    var now = Date.now();
    if (!isSpecialText && now - _lastPopupTime < 100) return;
    _lastPopupTime = now;
    const arena = document.getElementById('arena');
    if (!arena) return;
    // Cap active popups to 12
    while (_activePopups.length >= 12) {
        var oldest = _activePopups.shift();
        if (oldest && oldest.parentNode) oldest.remove();
    }
    const arenaRect = arena.getBoundingClientRect();
    const pop = document.createElement('div');
    
    // Read damage style preferences
    var dmgPrefs = _getDmgStylePrefs();
    var sizeMap = { small: '12px', medium: '16px', large: '22px' };
    var fontSize = sizeMap[dmgPrefs.size] || '16px';
    
    var rainbowColors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#a855f7','#ec4899'];
    var colorMap = { 'default': '#fef08a', rainbow: rainbowColors[Math.floor(Math.random() * rainbowColors.length)], red: '#ef4444', cyan: '#22d3ee' };
    var dmgColor = colorMap[dmgPrefs.color] || '#fef08a';
    
    var animClass = 'damage-popup';
    if (dmgPrefs.style === 'bouncy') animClass = 'damage-popup-bouncy';
    else if (dmgPrefs.style === 'float') animClass = 'damage-popup-float';
    
    pop.className = animClass;
    if (isCrit) pop.className += ' crit-popup';
    
    // Apply custom size and color
    pop.style.fontSize = fontSize;
    if (!isSpecialText && !isEnemyDamage) pop.style.color = dmgColor;
    
    if (isEnemyDamage) pop.style.cssText += 'color: #ff3333 !important; font-weight: 900 !important; text-shadow: 0 2px 4px rgba(0,0,0,1), 0 0 2px rgba(0,0,0,1) !important; font-size: 16px !important; z-index: 999 !important;';
    
    if (isSpecialText) {
        if (val.toString().includes('+')) {
            pop.style.cssText += 'color: #4ade80 !important; font-size: 24px !important; text-shadow: 0 0 10px #16a34a, 1px 1px 2px #000 !important; z-index: 1000 !important; animation-duration: 1.5s !important;';
        } else if (val.toString().includes('HEAT')) {
            pop.style.cssText += 'color: #38bdf8 !important; font-size: 20px !important; text-shadow: 0 0 10px #0369a1, 1px 1px 2px #000 !important; z-index: 1000 !important; animation-duration: 1.5s !important;';
        } else {
            pop.style.cssText += 'color: #f87171 !important; font-size: 28px !important; text-shadow: 0 0 15px #991b1b, 2px 2px 4px #000 !important; z-index: 1000 !important; animation-duration: 1.5s !important;';
        }
    }
    
    const xOffset = (Math.random() - 0.5) * 40;
    const yOffset = (Math.random() - 0.5) * 20;
    pop.style.left = `${event.clientX - arenaRect.left + xOffset}px`;
    pop.style.top = `${event.clientY - arenaRect.top + yOffset}px`;
    
    pop.innerText = isSpecialText ? val : (isCrit ? '\ud83d\udca5 ' + formatNumber(Math.floor(val)) + '!!' : formatNumber(Math.floor(val)));
    arena.appendChild(pop);
    _activePopups.push(pop);
    var removeDelay = isSpecialText ? 1500 : 800;
    setTimeout(function() { 
        if (pop.parentNode) pop.remove();
        var idx = _activePopups.indexOf(pop);
        if (idx > -1) _activePopups.splice(idx, 1);
    }, removeDelay);
}

// Damage style preferences
function _getDmgStylePrefs() {
    try {
        var saved = localStorage.getItem('tbbt_dmg_style');
        return saved ? JSON.parse(saved) : { size: 'medium', color: 'default', style: 'normal' };
    } catch(e) { return { size: 'medium', color: 'default', style: 'normal' }; }
}

function setDmgStyle(prop, value) {
    var prefs = _getDmgStylePrefs();
    prefs[prop] = value;
    localStorage.setItem('tbbt_dmg_style', JSON.stringify(prefs));
    
    // Update button highlights
    var types = { size: ['small','medium','large'], color: ['default','rainbow','red','cyan'], style: ['normal','bouncy','float'] };
    if (types[prop]) {
        types[prop].forEach(function(v) {
            var btn = document.getElementById('dmg-' + prop + '-' + v);
            if (!btn) return;
            if (prop === 'color') {
                btn.className = btn.className.replace(/border-amber-500|border-slate-600/g, v === value ? 'border-amber-500' : 'border-slate-600');
            } else {
                btn.className = btn.className.replace(/bg-amber-900\/60 text-amber-400 border-amber-700|bg-slate-800 text-gray-400 border-slate-700/g, 
                    v === value ? 'bg-amber-900/60 text-amber-400 border-amber-700' : 'bg-slate-800 text-gray-400 border-slate-700');
            }
        });
    }
}

// Inject bouncy and float animations
(function() {
    if (document.getElementById('dmg-style-css')) return;
    var s = document.createElement('style');
    s.id = 'dmg-style-css';
    s.textContent = `
        @keyframes dmg-bouncy { 0% { transform:translateY(0) scale(1); opacity:1; } 30% { transform:translateY(-30px) scale(1.3); } 50% { transform:translateY(-15px) scale(0.9); } 70% { transform:translateY(-25px) scale(1.1); } 100% { transform:translateY(-40px) scale(0.8); opacity:0; } }
        @keyframes dmg-float { 0% { transform:translateY(0); opacity:1; } 100% { transform:translateY(-60px); opacity:0; } }
        .damage-popup-bouncy { position:absolute; pointer-events:none; font-weight:900; z-index:60; animation:dmg-bouncy 0.8s ease-out forwards; text-shadow:0 2px 4px rgba(0,0,0,0.8),1px 1px 0 #000; }
        .damage-popup-float { position:absolute; pointer-events:none; font-weight:900; z-index:60; animation:dmg-float 1.2s ease-out forwards; text-shadow:0 2px 4px rgba(0,0,0,0.8),1px 1px 0 #000; }
    `;
    document.head.appendChild(s);
})();

// Resource pill toggle
window.toggleResourcePill = function(e) {
    if (e) e.stopPropagation();
    var dd = document.getElementById('res-dropdown');
    if (!dd) return;
    var isHidden = dd.classList.contains('hidden');
    dd.classList.toggle('hidden');
    // Auto-close after 4 seconds
    if (isHidden) {
        if (window._resPillTimer) clearTimeout(window._resPillTimer);
        window._resPillTimer = setTimeout(function() {
            dd.classList.add('hidden');
        }, 4000);
    }
};
// Close resource pill on any arena tap
document.addEventListener('click', function(e) {
    var dd = document.getElementById('res-dropdown');
    var pill = document.getElementById('res-pill');
    if (dd && !dd.classList.contains('hidden') && !dd.contains(e.target) && e.target !== pill && !pill.contains(e.target)) {
        dd.classList.add('hidden');
    }
});

function syncUI() {
    const resMoney = document.getElementById('res-money');
    const scoreVal = document.getElementById('score-val');
    const uiWaveVal = document.getElementById('ui-wave-val');

    if (resMoney) resMoney.innerText = '$' + formatNumber(state.resources.money);
    if (scoreVal) scoreVal.innerText = formatNumber(state.score);
    if (uiWaveVal) uiWaveVal.innerText = formatNumber(state.wave);
    
    // Update all resource displays
    const resources = ['stone', 'iron', 'gold', 'diamond', 'scrap'];
    var totalCraftRes = 0;
    resources.forEach(res => {
        const el = document.getElementById(`res-${res}`);
        var val = state.resources[res] || 0;
        if (el) el.innerText = formatNumber(val);
        totalCraftRes += val;
    });
    // Update resource pill count
    var pillCount = document.getElementById('res-pill-count');
    if (pillCount) pillCount.innerText = formatNumber(totalCraftRes);
    
    // Quick repair buttons (only for critically overheated bots)
    const repairContainer = document.getElementById('quick-repair-container');
    if (repairContainer) {
        repairContainer.innerHTML = '';
        var hasRepairs = false;
        if (typeof hangoutMode !== 'undefined' && hangoutMode) {
            // Keep hidden during hangout
        } else if (state.robots) {
            state.robots.forEach(robot => {
                if (robot && robot.equipped && robot.overheated) {
                    hasRepairs = true;
                    const data = state.robotRoster[robot.blueprintId];
                    const repairCost = 10 * Math.pow(2, (data ? data.level : 1) - 1);
                    const canRepair = state.resources.scrap >= repairCost;
                    const btnClass = canRepair ? 'bg-amber-600 hover:bg-amber-500 text-white cursor-pointer' : 'bg-gray-800 text-gray-500 cursor-not-allowed';
                    const botName = typeof robots !== 'undefined' && robots[robot.blueprintId] ? robots[robot.blueprintId].name : 'BOT';
                    repairContainer.innerHTML += `
                        <div onclick="if(${canRepair}) executeRobotRepair('${robot.blueprintId}')" class="px-2 py-1 rounded border border-amber-700 shadow-md flex items-center gap-1 text-[8px] font-bold uppercase ${btnClass} transition-colors pointer-events-auto">
                            <span class="text-sm">\ud83d\udd27</span> ${botName} (${formatNumber(repairCost)}🔩)
                        </div>
                    `;
                }
            });
        }
        // Show/hide container based on whether there are repairs
        if (hasRepairs) {
            repairContainer.classList.remove('hidden');
        } else {
            repairContainer.classList.add('hidden');
        }
    }
    
    updateEnemyHealthBar();
    
    // Update notification badges on side rail
    updateSideRailBadges();
}

function openShopModal(event) {
    if(event) event.stopPropagation();
    if (!window._gangPage) window._gangPage = 1;
    renderRosterGrid(window._gangPage);
    const modal = document.getElementById('shop-modal');
    if (modal) modal.classList.remove('hidden');
    // Update tab visibility
    _updateGangTabs(window._gangPage);
}

function closeShopModal() {
    const modal = document.getElementById('shop-modal');
    if (modal) modal.classList.add('hidden');
}

function switchGangPage(page) {
    window._gangPage = page;
    _updateGangTabs(page);
    renderRosterGrid(page);
}

function _updateGangTabs(page) {
    const tab1 = document.getElementById('gang-tab-1');
    const tab2 = document.getElementById('gang-tab-2');
    const title = document.getElementById('gang-modal-title');
    const subtitle = document.getElementById('gang-modal-subtitle');
    const hasYS = state && state.story_wave80_seen;
    const hasMV = state && state.story_wave150_seen;
    const hasGen = state && state.story_wave250_seen;

    // Find or create tab container
    var tabContainer = tab1 ? tab1.parentElement : null;
    if (!tabContainer) return;

    // Rebuild tabs dynamically for all eras
    var tabsHTML = '';
    var tabs = [
        { id: 'gang-tab-1', page: 1, label: '👥 THE GANG', unlocked: true, activeClass: 'bg-amber-900/60 text-amber-400 border-amber-700' },
        { id: 'gang-tab-2', page: 2, label: '🌀 YOUNG SHELDON', unlocked: hasYS, activeClass: 'bg-red-900/60 text-red-400 border-red-700' },
        { id: 'gang-tab-3', page: 3, label: '🌀 MULTIVERSE', unlocked: hasMV, activeClass: 'bg-purple-900/60 text-purple-400 border-purple-700' },
        { id: 'gang-tab-4', page: 4, label: '🔮 GENESIS', unlocked: hasGen, activeClass: 'bg-yellow-900/60 text-yellow-400 border-yellow-700' }
    ];

    tabs.forEach(function(t) {
        if (t.unlocked) {
            var isActive = page === t.page;
            var cls = isActive ? t.activeClass : 'bg-slate-900/60 text-slate-400 border-slate-700 hover:bg-slate-800';
            tabsHTML += '<button id="' + t.id + '" onclick="switchGangPage(' + t.page + ')" class="px-3 py-1.5 rounded-lg text-[9px] font-bold cursor-pointer border transition-all ' + cls + '">' + t.label + '</button>';
        } else if (t.page === 2 || (t.page === 3 && hasYS) || (t.page === 4 && hasMV)) {
            tabsHTML += '<button class="px-3 py-1.5 rounded-lg text-[9px] font-bold cursor-not-allowed border transition-all bg-slate-900/30 text-slate-600 border-slate-800" disabled>🔒 ???</button>';
        }
    });
    tabContainer.innerHTML = tabsHTML;

    var titleLabels = { 1: '👥 THE GANG', 2: '🌀 YOUNG SHELDON ERA', 3: '🌀 MULTIVERSE SAGA', 4: '🔮 GENESIS PROTOCOL' };
    var titleColors = { 1: 'text-amber-500', 2: 'text-red-400', 3: 'text-purple-400', 4: 'text-yellow-400' };
    var subtitleTexts = { 1: 'Your Pasadena crew • Tap to manage', 2: 'Medford, Texas 1989 • Timeline Reinforcements', 3: 'Infinite Dimensions • Multiverse Heroes', 4: 'The Origin of Everything • Legendary Beings' };

    if (title) {
        title.innerHTML = titleLabels[page] || titleLabels[1];
        title.className = 'text-base font-bold tracking-widest uppercase ' + (titleColors[page] || titleColors[1]);
    }
    if (subtitle) {
        subtitle.innerText = subtitleTexts[page] || subtitleTexts[1];
    }
}

function renderRosterGrid(page) {
    if (!page) page = window._gangPage || 1;
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
                <span class="${activeTotal >= getMaxCharSlots() ? 'text-amber-400' : 'text-emerald-400'}">TOTAL: ${activeTotal}/${getMaxCharSlots()}</span>
                <span class="${activeBack >= (getMaxCharSlots() >= 10 ? 3 : 3) ? 'text-amber-400' : 'text-emerald-400'}">BACK: ${activeBack}/${getMaxCharSlots() >= 10 ? 3 : 3}</span>
                <span class="${activeFront >= (getMaxCharSlots() >= 10 ? 3 : 2) ? 'text-amber-400' : 'text-emerald-400'}">FRONT: ${activeFront}/${getMaxCharSlots() >= 10 ? 3 : 2}</span>
            </div>
        </div>
    `;

    // Filter characters by page
    var charEntries = Object.entries(characters).filter(function(entry) {
        var cfg = entry[1];
        if (page === 2) return cfg.era === 'young_sheldon';
        if (page === 3) return cfg.era === 'multiverse';
        if (page === 4) return cfg.era === 'genesis';
        return !cfg.era; // page 1 = original characters
    });

    for (const [key, data] of charEntries) {
        const info = state.roster[key];
        const level = info ? info.level : 0;
        const isEquipped = !!(state.equipped && state.equipped[key]);

        let frameBorder = 'border-gray-800 bg-black opacity-60';
        let statusBadge = `<span class="text-gray-500">HIRE</span>`;

        if (level > 0) {
            if (isEquipped) {
                frameBorder = 'border-emerald-500 bg-emerald-950/40 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]';
                statusBadge = `<span class="text-emerald-400 animation-pulse">ACTIVE L${level}</span>`;
                // Add evolution tier icon
                if (typeof getCharacterEvoTier === 'function') {
                    const evoTier = getCharacterEvoTier(level);
                    if (evoTier) statusBadge = `<span class="text-emerald-400">${evoTier.icon} L${level}</span>`;
                }
            } else {
                frameBorder = 'border-amber-600 bg-slate-900';
                statusBadge = `<span class="text-amber-500">BENCHED L${level}</span>`;
                // Add evolution tier icon
                if (typeof getCharacterEvoTier === 'function') {
                    const evoTier = getCharacterEvoTier(level);
                    if (evoTier) statusBadge = `<span class="text-amber-500">${evoTier.icon} L${level}</span>`;
                }
            }
        }

        // Era badge for YS characters
        var eraBadge = data.era === 'young_sheldon' ? '<span class="text-[6px] text-red-400 bg-red-900/30 px-1 rounded border border-red-800/40 ml-1">1989</span>' : '';
        // Class type emoji
        var classEmoji = { tank: '🛡️', dps: '⚔️', support: '💚', magic: '🔮', aoe: '💥', assassin: '🗡️' };
        var classIcon = classEmoji[data.classType] || '⚡';

        grid.innerHTML += `
            <div onclick="openModal(event, '${key}')" class="p-3 border-2 rounded flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all ${frameBorder}">
                <div class="flex items-center gap-3 overflow-hidden pointer-events-none">
                    <div class="w-10 h-12 flex-shrink-0 bg-black rounded p-0.5">${getVectorFrame(key, false)}</div>
                    <div class="truncate text-[10px]">
                        <div class="font-bold text-white mb-1 text-[12px]">${data.name}${eraBadge}</div>
                        <div class="text-[8px] text-gray-400 uppercase tracking-tighter">${classIcon} ${data.classType} • ${data.lane}LINE</div>
                    </div>
                </div>
                <div class="text-[8px] font-bold px-2 py-1.5 rounded bg-gray-950 border border-gray-800 pointer-events-none text-center min-w-[64px]">
                    ${statusBadge}
                </div>
            </div>
        `;
    }
}



// ============================================================
// LINEUP EDITOR — Strategic Formation Positioning (Drag & Drop)
// ============================================================
let lineupEditorState = null;
let draggedUnit = null;

// Returns max character slots for PvE normal mode
// After unlocking Young Sheldon timeline (wave 80 story), expands to 10
function getMaxCharSlots() {
    // After unlocking Genesis Protocol (wave 250), expands to 14
    if (typeof state !== 'undefined' && state.story_wave250_seen) return 14;
    // After unlocking Multiverse Saga (wave 150), expands to 12
    if (typeof state !== 'undefined' && state.story_wave150_seen) return 12;
    // After unlocking Young Sheldon timeline (wave 80 story), expands to 10
    if (typeof state !== 'undefined' && state.story_wave80_seen) return 10;
    return 5;
}

function ensureFormation() {
    var maxSlots = getMaxCharSlots();
    // Standard: front=2, mid=3, back=3 (8 slots, 5 char max)
    // YS expanded: front=3, mid=4, back=3 (10 slots, 10 char max)
    var targetFront = maxSlots >= 10 ? 3 : 2;
    var targetMid   = maxSlots >= 10 ? 4 : 3;
    var targetBack  = maxSlots >= 10 ? 3 : 3;

    if (!state.formation || !state.formation.front) {
        state.formation = { front: new Array(targetFront).fill(null), mid: new Array(targetMid).fill(null), back: new Array(targetBack).fill(null), bots: [null, null, null] };
    }

    // Expand lanes if YS was unlocked after save was created
    if (state.formation.front.length < targetFront) {
        while (state.formation.front.length < targetFront) state.formation.front.push(null);
    }
    if (state.formation.mid.length < targetMid) {
        while (state.formation.mid.length < targetMid) state.formation.mid.push(null);
    }
    if (state.formation.back.length < targetBack) {
        while (state.formation.back.length < targetBack) state.formation.back.push(null);
    }

    if (!state.formation.bots) {
        state.formation.bots = [null, null, null];
        // Migrate: pull any bots from char lanes into bot slots
        ['front', 'mid', 'back'].forEach(lane => {
            state.formation[lane].forEach((slot, idx) => {
                if (slot && slot.type === 'bot') {
                    const emptyBot = state.formation.bots.indexOf(null);
                    if (emptyBot !== -1) state.formation.bots[emptyBot] = { key: slot.key, lane: lane };
                    state.formation[lane][idx] = null;
                }
            });
        });
        // Also migrate from state.robots (equipped bots not yet in formation)
        if (state.robots) {
            state.robots.forEach(robot => {
                if (!robot || !robot.equipped) return;
                const alreadyIn = state.formation.bots.some(s => s && s.key === robot.blueprintId);
                if (alreadyIn) return;
                const emptyBot = state.formation.bots.indexOf(null);
                if (emptyBot !== -1) state.formation.bots[emptyBot] = { key: robot.blueprintId, lane: robot.lane || 'front' };
            });
        }
    }
}

function initializeFormationWithEquipped() {
    // NEW PLAYER FIX: If formation is empty but characters are equipped, auto-place them
    // This ensures Sheldon (and other equipped chars) appear on screen at game start
    
    ensureFormation();
    
    // Count existing characters in formation
    let charCount = 0;
    ['front', 'mid', 'back'].forEach(lane => {
        state.formation[lane].forEach(slot => {
            if (slot && slot.type === 'char') charCount++;
        });
    });
    
    // If formation is empty but we have equipped characters, place them
    if (charCount === 0 && state.equipped) {
        const equippedChars = [];
        for (const key in state.equipped) {
            if (state.equipped[key] && state.roster && state.roster[key] && state.roster[key].level > 0) {
                const config = characters[key];
                if (config) {
                    equippedChars.push({ key, config, lane: config.lane });
                }
            }
        }
        
        // Sort by lane preference (front first, then mid, then back)
        const laneOrder = { front: 1, mid: 2, back: 3 };
        equippedChars.sort((a, b) => laneOrder[a.lane] - laneOrder[b.lane]);
        
        // Place characters in formation
        equippedChars.forEach(char => {
            const lane = char.lane;
            const firstEmpty = state.formation[lane].indexOf(null);
            if (firstEmpty !== -1) {
                state.formation[lane][firstEmpty] = { type: 'char', key: char.key };
            }
        });
        
        console.log('[FORM] Initialized formation with equipped characters:', equippedChars.map(c => c.key).join(', '));
    }
}

function countFormationChars(formation) {
    let chars = 0, bots = 0;
    ['front', 'mid', 'back'].forEach(lane => {
        (formation[lane] || []).forEach(slot => {
            if (slot && slot.type === 'char') chars++;
        });
    });
    (formation.bots || []).forEach(slot => { if (slot) bots++; });
    return { chars, bots };
}

function syncFormationToEquipped() {
    ensureFormation();
    state.equipped = {};
    ['front', 'mid', 'back'].forEach(lane => {
        state.formation[lane].forEach(slot => {
            if (slot && slot.type === 'char') state.equipped[slot.key] = true;
        });
    });
    state.robots.forEach(r => { if (r) r.equipped = false; });
    state.formation.bots.forEach(slot => {
        if (slot) {
            const robot = state.robots.find(r => r && r.blueprintId === slot.key);
            if (robot) { robot.equipped = true; robot.lane = slot.lane || 'front'; }
        }
    });
}

function openLineupEditor() {
    ensureFormation();
    // Live-sync: ensure all equipped robots are in formation.bots
    if (state.robots) {
        state.robots.forEach(robot => {
            if (!robot || !robot.equipped) return;
            const alreadyIn = state.formation.bots.some(s => s && s.key === robot.blueprintId);
            if (!alreadyIn) {
                const emptySlot = state.formation.bots.indexOf(null);
                if (emptySlot !== -1) state.formation.bots[emptySlot] = { key: robot.blueprintId, lane: robot.lane || 'front' };
            }
        });
        // Also clean out bots no longer equipped
        state.formation.bots = state.formation.bots.map(slot => {
            if (!slot) return null;
            const isEquipped = state.robots.some(r => r && r.blueprintId === slot.key && r.equipped);
            return isEquipped ? slot : null;
        });
    }
    lineupEditorState = {
        front: [...state.formation.front],
        mid: [...state.formation.mid],
        back: [...state.formation.back],
        bots: [...(state.formation.bots || [null, null, null])]
    };
    draggedUnit = null;
    const modal = document.getElementById('lineup-editor-modal');
    if (modal) modal.classList.remove('hidden');
    renderLineupEditor();
}

function closeLineupEditor() {
    const modal = document.getElementById('lineup-editor-modal');
    if (modal) modal.classList.add('hidden');
    lineupEditorState = null;
    draggedUnit = null;
}

function saveLineupFormation() {
    if (!lineupEditorState) return;
    state.formation = {
        front: [...lineupEditorState.front],
        mid: [...lineupEditorState.mid],
        back: [...lineupEditorState.back],
        bots: [...lineupEditorState.bots]
    };
    syncFormationToEquipped();
    if (typeof stopAutomationEngines === 'function') stopAutomationEngines();
    if (typeof startAutomationEngines === 'function') startAutomationEngines();
    saveProgress();
    renderActiveBattleLine();
    if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
    if (typeof renderRosterGrid === 'function') renderRosterGrid();
    closeLineupEditor();
    if (typeof SoundManager !== 'undefined') SoundManager.play('upgrade');
}

function renderLineupEditor() {
    const container = document.getElementById('lineup-editor-content');
    if (!container || !lineupEditorState) return;
    
    const counts = countFormationChars(lineupEditorState);
    const laneConfig = {
        front: { label: 'FRONTLINE', color: 'red', icon: '🛡️', desc: 'Takes hits first' },
        mid: { label: 'MIDLINE', color: 'amber', icon: '⚔️', desc: 'Hit after front' },
        back: { label: 'BACKLINE', color: 'blue', icon: '🎯', desc: 'Protected' }
    };

    // ---- CHARACTER LANES ----
    let lanesHtml = '';
    ['front', 'mid', 'back'].forEach(laneKey => {
        const lc = laneConfig[laneKey];
        const slots = lineupEditorState[laneKey];
        
        let slotsHtml = '';
        slots.forEach((slot, idx) => {
            if (slot && slot.type === 'char') {
                const config = characters[slot.key];
                const name = config ? config.name : slot.key;
                const defaultLane = config ? config.lane : '?';
                const isNatural = defaultLane === laneKey;
                const svg = typeof getVectorFrame === 'function' ? getVectorFrame(slot.key, false) : '';
                const movedBadge = !isNatural ? '<span class="absolute top-0 left-0 text-[5px] bg-amber-800 text-amber-200 px-0.5 rounded-br font-bold">↕</span>' : '';
                
                slotsHtml += `
                    <div draggable="true" 
                         ondragstart="onCharDragStart(event, '${laneKey}', ${idx})"
                         ondragover="event.preventDefault();this.classList.add('ring-2','ring-amber-400')"
                         ondragleave="this.classList.remove('ring-2','ring-amber-400')"
                         ondrop="onCharDrop(event, '${laneKey}', ${idx})"
                         class="relative w-[68px] h-[84px] border-2 border-emerald-500 bg-emerald-950/40 rounded-lg flex flex-col items-center justify-end cursor-grab active:cursor-grabbing transition-all overflow-hidden shadow-lg pb-1">
                        ${movedBadge}
                        <button onclick="event.stopPropagation();removeFromSlot('${laneKey}',${idx})" class="absolute top-0 right-0 w-4 h-4 bg-red-800 hover:bg-red-600 text-white text-[8px] font-bold rounded-bl flex items-center justify-center cursor-pointer z-10 leading-none">✕</button>
                        <div class="w-10 h-11 flex items-center justify-center pointer-events-none">${svg || '👤'}</div>
                        <div class="text-[6px] text-white font-bold truncate w-full text-center px-0.5 pointer-events-none">${name}</div>
                    </div>
                `;
            } else {
                slotsHtml += `
                    <div ondragover="event.preventDefault();this.classList.add('ring-2','ring-amber-400')"
                         ondragleave="this.classList.remove('ring-2','ring-amber-400')"
                         ondrop="onCharDrop(event, '${laneKey}', ${idx})"
                         onclick="onEmptyCharSlotTap('${laneKey}', ${idx})"
                         class="w-[68px] h-[84px] border-2 border-dashed border-gray-700 hover:border-amber-500 hover:bg-amber-950/20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all">
                        <span class="text-gray-600 text-xl">${draggedUnit && draggedUnit.type === 'char' ? '⬇' : '+'}</span>
                        <span class="text-[7px] text-gray-600 font-bold">EMPTY</span>
                    </div>
                `;
            }
        });
        
        lanesHtml += `
            <div class="mb-2">
                <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-1">
                        <span class="text-sm">${lc.icon}</span>
                        <span class="text-${lc.color}-400 font-black text-[10px] tracking-wider">${lc.label}</span>
                    </div>
                    <span class="text-[7px] text-gray-500">${lc.desc}</span>
                </div>
                <div class="flex gap-2 justify-center bg-${lc.color}-950/20 border border-${lc.color}-900/30 rounded-lg p-2 min-h-[92px] items-center">
                    ${slotsHtml}
                </div>
            </div>
        `;
    });

    // ---- ROBOT SLOTS (separate section) ----
    const botSlotCount = state.botSlots || 1;
    let botSlotsHtml = '';
    for (let i = 0; i < 3; i++) {
        const isLocked = i >= botSlotCount;
        const slot = lineupEditorState.bots[i];
        
        if (isLocked) {
            botSlotsHtml += `
                <div class="w-[68px] h-[84px] border-2 border-gray-800 bg-gray-950/60 rounded-lg flex flex-col items-center justify-center opacity-50">
                    <span class="text-gray-600 text-lg">🔒</span>
                    <span class="text-[6px] text-gray-600 font-bold">LOCKED</span>
                </div>
            `;
        } else if (slot) {
            const config = typeof robots !== 'undefined' ? robots[slot.key] : null;
            const name = config ? config.name : slot.key;
            const svg = typeof getVectorFrame === 'function' ? getVectorFrame(slot.key, false) : '';
            const laneBadge = slot.lane ? '<span class="text-[5px] text-cyan-400 font-bold">' + (slot.lane || 'front').toUpperCase() + '</span>' : '';
            
            botSlotsHtml += `
                <div draggable="true"
                     ondragstart="onBotSlotDragStart(event, ${i})"
                     class="relative w-[68px] h-[84px] border-2 border-cyan-500 bg-cyan-950/40 rounded-lg flex flex-col items-center justify-end cursor-grab active:cursor-grabbing transition-all overflow-hidden shadow-lg pb-1">
                    <span class="absolute top-0 left-0 text-[5px] bg-cyan-900 text-cyan-300 px-1 rounded-br font-bold">BOT</span>
                    <button onclick="event.stopPropagation();removeBotSlot(${i})" class="absolute top-0 right-0 w-4 h-4 bg-red-800 hover:bg-red-600 text-white text-[8px] font-bold rounded-bl flex items-center justify-center cursor-pointer z-10 leading-none">✕</button>
                    <div class="w-10 h-11 flex items-center justify-center pointer-events-none">${svg || '🤖'}</div>
                    <div class="text-[6px] text-white font-bold truncate w-full text-center px-0.5 pointer-events-none">${name}</div>
                    ${laneBadge}
                </div>
            `;
        } else {
            botSlotsHtml += `
                <div ondragover="event.preventDefault();this.classList.add('ring-2','ring-cyan-400')"
                     ondragleave="this.classList.remove('ring-2','ring-cyan-400')"
                     ondrop="onBotSlotDrop(event, ${i})"
                     onclick="onEmptyBotSlotTap(${i})"
                     class="w-[68px] h-[84px] border-2 border-dashed border-gray-700 hover:border-cyan-500 hover:bg-cyan-950/20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all">
                    <span class="text-gray-600 text-xl">${draggedUnit && draggedUnit.type === 'bot' ? '⬇' : '+'}</span>
                    <span class="text-[7px] text-gray-600 font-bold">EMPTY</span>
                </div>
            `;
        }
    }

    // ---- BENCH ----
    const inFormation = new Set();
    ['front', 'mid', 'back'].forEach(lane => {
        lineupEditorState[lane].forEach(slot => {
            if (slot) inFormation.add(slot.key);
        });
    });
    lineupEditorState.bots.forEach(slot => { if (slot) inFormation.add(slot.key); });
    
    let benchCharsHtml = '';
    for (const [key, config] of Object.entries(characters)) {
        const data = state.roster[key];
        if (!data || data.level <= 0 || inFormation.has(key)) continue;
        if (data.status === 'hospitalized') continue;
        const svg = typeof getVectorFrame === 'function' ? getVectorFrame(key, false) : '';
        benchCharsHtml += `
            <div draggable="true" ondragstart="onBenchCharDragStart(event, '${key}')"
                 onclick="onBenchCharTap('${key}')"
                 class="w-[56px] h-[72px] border-2 border-gray-700 bg-gray-900/60 rounded-lg flex flex-col items-center justify-center cursor-grab hover:border-emerald-400 hover:bg-emerald-950/30 transition-all p-0.5 shadow">
                <div class="w-8 h-10 flex items-center justify-center pointer-events-none">${svg || '👤'}</div>
                <div class="text-[6px] text-gray-300 font-bold truncate w-full text-center pointer-events-none">${config.name}</div>
            </div>
        `;
    }
    
    let benchBotsHtml = '';
    if (state.robotRoster && typeof robots !== 'undefined') {
        for (const [key, data] of Object.entries(state.robotRoster)) {
            if (!data || data.level <= 0 || inFormation.has(key)) continue;
            const config = robots[key];
            if (!config) continue;
            const svg = typeof getVectorFrame === 'function' ? getVectorFrame(key, false) : '';
            benchBotsHtml += `
                <div draggable="true" ondragstart="onBenchBotDragStart(event, '${key}')"
                     onclick="onBenchBotTap('${key}')"
                     class="w-[56px] h-[72px] border-2 border-gray-700 bg-gray-900/60 rounded-lg flex flex-col items-center justify-center cursor-grab hover:border-cyan-400 hover:bg-cyan-950/30 transition-all p-0.5 shadow">
                    <div class="w-8 h-10 flex items-center justify-center pointer-events-none">${svg || '🤖'}</div>
                    <div class="text-[6px] text-gray-300 font-bold truncate w-full text-center pointer-events-none">${config.name}</div>
                </div>
            `;
        }
    }
    
    container.innerHTML = `
        <div class="flex justify-center gap-3 mb-3 text-[9px] font-bold">
            <span class="px-2 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400">👥 ${counts.chars}/${getMaxCharSlots()}</span>
            <span class="px-2 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">🤖 ${counts.bots}/${botSlotCount}</span>
        </div>
        ${draggedUnit ? '<div class="text-center text-amber-400 text-[9px] font-bold mb-2 animate-pulse">🎯 Tap a slot to place · Tap ✕ to remove</div>' : ''}
        
        <div class="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">CHARACTER FORMATION</div>
        ${lanesHtml}
        
        <div class="text-[9px] text-cyan-400 font-bold uppercase tracking-wider mb-1 mt-3">🤖 ROBOT DEPLOYMENT</div>
        <div class="flex gap-2 justify-center bg-cyan-950/20 border border-cyan-900/30 rounded-lg p-2 min-h-[92px] items-center mb-3">
            ${botSlotsHtml}
        </div>
        
        <div class="border-t border-gray-800 pt-2">
            <div class="text-gray-400 font-bold text-[9px] uppercase tracking-wider mb-2">📋 BENCH — Tap or Drag</div>
            ${benchCharsHtml ? '<div class="text-[7px] text-gray-500 mb-1 uppercase">Characters</div><div class="flex flex-wrap gap-1.5 mb-2">' + benchCharsHtml + '</div>' : ''}
            ${benchBotsHtml ? '<div class="text-[7px] text-gray-500 mb-1 uppercase">Robots</div><div class="flex flex-wrap gap-1.5">' + benchBotsHtml + '</div>' : ''}
            ${!benchCharsHtml && !benchBotsHtml ? '<div class="text-[8px] text-gray-600 italic">All units deployed!</div>' : ''}
        </div>
    `;
}

// ---- Remove buttons ----
function removeFromSlot(lane, idx) {
    if (!lineupEditorState) return;
    lineupEditorState[lane][idx] = null;
    renderLineupEditor();
}
function removeBotSlot(idx) {
    if (!lineupEditorState) return;
    lineupEditorState.bots[idx] = null;
    renderLineupEditor();
}

// ---- CHAR DRAG & DROP ----
function onCharDragStart(e, lane, idx) {
    const slot = lineupEditorState[lane][idx];
    if (!slot) return;
    draggedUnit = { type: 'char', key: slot.key, fromLane: lane, fromIdx: idx };
    e.dataTransfer.effectAllowed = 'move';
}
function onBenchCharDragStart(e, key) {
    draggedUnit = { type: 'char', key, fromLane: null, fromIdx: null };
    e.dataTransfer.effectAllowed = 'move';
}
function onCharDrop(e, toLane, toIdx) {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-2', 'ring-amber-400');
    if (!draggedUnit || draggedUnit.type !== 'char' || !lineupEditorState) { draggedUnit = null; return; }
    
    if (draggedUnit.fromLane !== null) {
        // Swap within formation
        const existing = lineupEditorState[toLane][toIdx];
        lineupEditorState[toLane][toIdx] = { type: 'char', key: draggedUnit.key };
        lineupEditorState[draggedUnit.fromLane][draggedUnit.fromIdx] = existing;
    } else {
        // From bench
        const counts = countFormationChars(lineupEditorState);
        if (counts.chars >= getMaxCharSlots() || lineupEditorState[toLane][toIdx] !== null) { draggedUnit = null; renderLineupEditor(); return; }
        lineupEditorState[toLane][toIdx] = { type: 'char', key: draggedUnit.key };
    }
    draggedUnit = null;
    renderLineupEditor();
}

// ---- BOT DRAG & DROP ----
function onBotSlotDragStart(e, idx) {
    const slot = lineupEditorState.bots[idx];
    if (!slot) return;
    draggedUnit = { type: 'bot', key: slot.key, fromIdx: idx };
    e.dataTransfer.effectAllowed = 'move';
}
function onBenchBotDragStart(e, key) {
    draggedUnit = { type: 'bot', key, fromIdx: null };
    e.dataTransfer.effectAllowed = 'move';
}
function onBotSlotDrop(e, toIdx) {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-2', 'ring-cyan-400');
    if (!draggedUnit || draggedUnit.type !== 'bot' || !lineupEditorState) { draggedUnit = null; return; }
    
    if (draggedUnit.fromIdx !== null) {
        // Swap bot slots
        const existing = lineupEditorState.bots[toIdx];
        lineupEditorState.bots[toIdx] = { key: draggedUnit.key, lane: 'front' };
        lineupEditorState.bots[draggedUnit.fromIdx] = existing;
    } else {
        // From bench
        const counts = countFormationChars(lineupEditorState);
        if (counts.bots >= (state.botSlots || 1) || lineupEditorState.bots[toIdx] !== null) { draggedUnit = null; renderLineupEditor(); return; }
        lineupEditorState.bots[toIdx] = { key: draggedUnit.key, lane: 'front' };
    }
    draggedUnit = null;
    renderLineupEditor();
}

// ---- TAP TO PLACE ----
function onBenchCharTap(key) {
    if (!lineupEditorState) return;
    const counts = countFormationChars(lineupEditorState);
    if (counts.chars >= getMaxCharSlots()) return;
    draggedUnit = { type: 'char', key, fromLane: null, fromIdx: null };
    renderLineupEditor();
}
function onBenchBotTap(key) {
    if (!lineupEditorState) return;
    const counts = countFormationChars(lineupEditorState);
    if (counts.bots >= (state.botSlots || 1)) return;
    draggedUnit = { type: 'bot', key, fromIdx: null };
    renderLineupEditor();
}
function onEmptyCharSlotTap(lane, idx) {
    if (!lineupEditorState || !draggedUnit || draggedUnit.type !== 'char') return;
    if (draggedUnit.fromLane !== null) {
        lineupEditorState[draggedUnit.fromLane][draggedUnit.fromIdx] = null;
    }
    lineupEditorState[lane][idx] = { type: 'char', key: draggedUnit.key };
    draggedUnit = null;
    renderLineupEditor();
}
function onEmptyBotSlotTap(idx) {
    if (!lineupEditorState || !draggedUnit || draggedUnit.type !== 'bot') return;
    if (draggedUnit.fromIdx !== null) {
        lineupEditorState.bots[draggedUnit.fromIdx] = null;
    }
    lineupEditorState.bots[idx] = { key: draggedUnit.key, lane: 'front' };
    draggedUnit = null;
    renderLineupEditor();
}

// Lightweight HP-only update: patches HP bars without full DOM rebuild
function _updateBattleLineHP() {
    Object.keys(state.roster).forEach(function(key) {
        var charData = state.roster[key];
        if (!charData || charData.level <= 0 || !state.equipped[key]) return;
        var el = document.getElementById('live-character-' + key);
        if (!el) return;
        var config = characters[key];
        if (!config) return;
        var maxHp = charData.maxHp || (config.baseHp || 100);
        var currentHp = typeof charData.currentHp !== 'undefined' ? charData.currentHp : maxHp;
        var hpPct = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));
        // Update HP bar width
        var hpBar = el.querySelector('.h-full');
        if (hpBar) hpBar.style.width = hpPct + '%';
        // Toggle low HP class
        if (hpPct <= 25) el.classList.add('char-low-hp');
        else el.classList.remove('char-low-hp');
        // Toggle injured SVG state when HP below 50%
        if (hpPct < 50 && hpPct > 0 && !el.classList.contains('char-attacking') && !el.classList.contains('char-hurt')) {
            if (!el._isInjured) {
                el._isInjured = true;
                el.classList.add('char-injured');
                var wrapper = el.querySelector('.character-vector-wrapper');
                if (wrapper) {
                    var injuredSvg = getVectorFrame(key, false, 'injured');
                    if (injuredSvg) wrapper.innerHTML = injuredSvg;
                }
            }
        } else if (hpPct >= 50 && el._isInjured) {
            el._isInjured = false;
            el.classList.remove('char-injured');
            var wrapper = el.querySelector('.character-vector-wrapper');
            if (wrapper) {
                var idleSvg = getVectorFrame(key, false, 'idle');
                if (idleSvg) wrapper.innerHTML = idleSvg;
            }
        }
    });
}


function renderActiveBattleLine() {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    const lanes = { back: [], mid: [], front: [] };

    // Use formation-based positioning if available
    ensureFormation();
    ['front', 'mid', 'back'].forEach(function(lane) {
        state.formation[lane].forEach(function(slot) {
            if (!slot || slot.type !== 'char') return;
            const key = slot.key;
            const config = characters[key];
            const activeData = state.roster[key];
            if (config && activeData && activeData.level > 0 && state.equipped[key] && activeData.status !== 'hospitalized') {
                lanes[lane].push({ key, config });
            }
        });
    });

    ['back', 'mid', 'front'].forEach(laneKey => {
        const container = document.getElementById(`line-${laneKey}`);
        if (!container) return;
        
        let htmlContent = '';

        lanes[laneKey].forEach((char, index) => {
            const { key, config } = char;
            const level = state.roster[key].level;
            const dps = Math.round((config.baseDmg * level * 1000) / config.atkSpeed);
            
            const trackingBadge = (key === 'sheldon') 
                ? `<span id="sheldon-buff-badge" class="absolute -top-8 bg-amber-500 border border-amber-700 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded shadow animate-pulse hidden"></span>` 
                : '';

            const hpData = state.roster[key];
            const maxHp = hpData.maxHp || (config.baseHp || 100);
            const currentHp = typeof hpData.currentHp !== 'undefined' ? hpData.currentHp : maxHp;
            const hpPct = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));
            const hpBarHtml = `
                <div class="absolute -top-3 left-0 right-0 h-1.5 bg-red-950 border border-red-900 rounded-sm overflow-hidden z-40 opacity-90 shadow-[0_0_5px_rgba(255,0,0,0.5)] pointer-events-none">
                    <div class="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300" style="width: ${hpPct}%"></div>
                </div>
            `;

            let hangoutStyle = '';
            if (typeof hangoutMode !== 'undefined' && hangoutMode) {
                if (key === 'sheldon') hangoutStyle = 'position: absolute; bottom: 0%; left: 10%; transform: scale(1.5);';
                else if (key === 'penny') hangoutStyle = 'position: absolute; bottom: 15%; right: 10%; transform: scale(1.5);';
                else if (key === 'leonard') hangoutStyle = 'position: absolute; bottom: 30%; left: 30%; transform: scale(1.5);';
                else if (key === 'howard') hangoutStyle = 'position: absolute; bottom: 25%; right: 30%; transform: scale(1.5);';
                else if (key === 'raj') hangoutStyle = 'position: absolute; bottom: 5%; right: 40%; transform: scale(1.5);';
                else if (key === 'amy') hangoutStyle = 'position: absolute; bottom: 40%; left: 15%; transform: scale(1.5);';
                else if (key === 'bernie') hangoutStyle = 'position: absolute; bottom: 35%; right: 15%; transform: scale(1.5);';
                else if (key === 'stuart') hangoutStyle = 'position: absolute; bottom: 45%; right: 40%; transform: scale(1.5);';
                else hangoutStyle = 'position: absolute; bottom: ' + (Math.random()*40) + '%; left: ' + (Math.random()*60) + '%; transform: scale(1.5);';
            }

            htmlContent += `
                <div id="live-character-${key}" 
                     onclick="openModal(event, '${key}')"
                     style="z-index: ${20 + index}; animation-delay: ${index * 0.15}s; ${hangoutStyle}" class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:brightness-125 transition pointer-events-auto glow-${laneKey} ${hpPct <= 25 ? 'char-low-hp' : ''} ${hpPct < 50 && hpPct > 0 ? 'char-injured' : ''}">
                    ${hpBarHtml}
                    ${trackingBadge}
                    
                    <!-- Character Stats Badge -->
                    <div class="absolute top-0 left-0 right-0 flex gap-1 justify-center text-[7px] pointer-events-none">
                        <span class="bg-amber-900/90 text-amber-300 px-1 py-0.5 rounded border border-amber-700 font-bold">L${level}</span>
                        <span class="bg-green-900/90 text-green-300 px-1 py-0.5 rounded border border-green-700 font-bold">${config.baseDmg * level}DMG</span>
                        <span class="bg-blue-900/90 text-blue-300 px-1 py-0.5 rounded border border-blue-700 font-bold">${dps}DPS</span>
                    </div>
                    
                    <div class="character-vector-wrapper flex items-end justify-center">${getVectorFrame(key, false, (hpPct < 50 && hpPct > 0) ? 'injured' : 'idle')}</div>
                    
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
        container.innerHTML = htmlContent;
    });

    updateSheldonBuffBadge();
}

function openModal(event, key) {
    if(event) event.stopPropagation(); 
    activeModalKey = key;
    const config = characters[key];
    const data = state.roster[key];
    const lvl = data ? data.level : 0;
    const currentCost = Math.floor(config.cost.money * Math.pow(1.35, lvl));
    const isEquipped = !!(state.equipped && state.equipped[key]);

    const avatar = document.getElementById('modal-char-avatar');
    const name = document.getElementById('modal-char-name');
    const desc = document.getElementById('modal-char-desc');
    const power = document.getElementById('modal-char-power');
    const lane = document.getElementById('modal-char-lane');
    const badge = document.getElementById('modal-char-badge');
    const costContainer = document.getElementById('modal-cost-container');

    if (avatar) avatar.innerHTML = getVectorFrame(key, false);
    if (name) name.innerText = config.name;
    if (desc) desc.innerText = config.desc;
    if (power) power.innerText = config.baseDmg * (lvl || 1);
    if (lane) lane.innerText = config.lane.toUpperCase();

    // Populate stats panel
    const effLvl = lvl || 1;
    const nextLvl = lvl > 0 ? lvl + 1 : 1;
    const hpScale = config.lane === 'front' ? 1.40 : 1.25;

    const statDmg = document.getElementById('modal-stat-dmg');
    if (statDmg) {
        const curDmg = config.baseDmg * effLvl;
        const nxtDmg = config.baseDmg * nextLvl;
        statDmg.innerHTML = formatNumber(curDmg) + ' <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">' + formatNumber(nxtDmg) + '</span>';
    }

    const statHp = document.getElementById('modal-stat-hp');
    if (statHp) {
        const curHp = Math.floor((config.baseHp || 100) * Math.pow(hpScale, effLvl - 1));
        const nxtHp = Math.floor((config.baseHp || 100) * Math.pow(hpScale, nextLvl - 1));
        statHp.innerHTML = formatNumber(curHp) + ' <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">' + formatNumber(nxtHp) + '</span>';
    }

    const statCd = document.getElementById('modal-stat-cd');
    if (statCd) {
        const cdSec = (config.atkSpeed / 1000).toFixed(1);
        statCd.innerHTML = cdSec + 's <span class="text-gray-600 mx-0.5">➔</span> <span class="text-amber-400">' + cdSec + 's</span>';
    }

    const statPassive = document.getElementById('modal-stat-passive');
    if (statPassive) {
        const passiveLabels = {
            critSplash: 'Crit Splash', critAoe: 'Crit AOE', jumpCrit: 'Jump Crit',
            backlineCrit: 'Backline Crit', critTank: 'Crit Tank', lifesteal: 'Lifesteal',
            sunRay: 'Sun Ray DOT', poisonAoe: 'Poison AOE', slowStun: 'Slow/Stun',
            rage: 'Team Rage', selfHeal: 'Self Heal', coolDown: 'Robot Cooldown',
            healScaling: 'Team Heal', healLoot: 'Heal + Loot', deflectLoot: 'Deflect + Loot',
            immuneHits: 'Immune Hits', backlineSpeed: 'Speed Ramp',
            summonDroid: 'Summon Droids',
            // Young Sheldon era passives
            summonTrainStun: 'Train Stun AoE', summonDollCrit: 'Doll + Crit Buff',
            brisketSlam: 'Brisket Lifesteal', coinLootBoost: 'Coin Loot Boost',
            chemicalAoe: 'Chemical AoE DOT', summonChicken: 'Chicken Summon',
            tireLootSlow: 'Tire + Loot + Slow', warBurst: 'War Burst DPS',
            holyHeal: 'Holy Team Heal', whipCrit: 'Whip Crit Strike'
        };
        const label = passiveLabels[config.passiveType] || config.passiveType || 'None';
        statPassive.innerHTML = '<span class="text-cyan-400">' + label + '</span>';
    }
    
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

    let purchaseLabel = isHired ? "📈 Level Up" : "🤝 Recruit to the Gang";

    if (costContainer) {
        costContainer.innerHTML = `<span class="${canAfford ? 'text-green-400' : 'text-red-400'}">💵 $${formatNumber(currentCost)}</span>`;
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
                    🚪 BENCH THIS NERD
                </button>
            `;
        } else {
            let equipBlocked = false;
            let equipLabel = "🛋️ ADD TO THE GANG";

            ensureFormation();
            const fCounts = countFormationChars(state.formation);
            const totalSlots = state.formation.front.length + state.formation.mid.length + state.formation.back.length;
            const usedSlots = fCounts.chars + fCounts.bots;

            if (fCounts.chars >= getMaxCharSlots()) {
                equipBlocked = true;
                equipLabel = "❌ CREW FULL (MAX " + getMaxCharSlots() + " CHARS)";
            } else if (usedSlots >= totalSlots) {
                equipBlocked = true;
                equipLabel = "❌ ALL SLOTS OCCUPIED";
            }

            const equipButtonClass = !equipBlocked
                ? "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded shadow-md"
                : "w-full bg-gray-950 text-gray-600 font-bold py-2.5 text-[10px] cursor-not-allowed uppercase border border-gray-900 rounded";

            equipRowHtml = `
                <button onclick="executeModalAction('equip')" ${equipBlocked ? 'disabled' : ''} class="${equipButtonClass}">
                    ${equipLabel}
                </button>
                <button onclick="closeModal();openLineupEditor()" class="w-full bg-amber-800 hover:bg-amber-700 text-amber-200 font-bold py-2 text-[9px] cursor-pointer uppercase tracking-wider rounded border border-amber-600 shadow-sm mt-1">
                    📋 OPEN WHITEBOARD
                </button>
            `;
        }
    }

    
    const foodGrid = document.getElementById('modal-food-grid');
    if (foodGrid) {
        if (!isHired || !data || data.currentHp >= data.maxHp) {
            foodGrid.innerHTML = '<div class="col-span-4 text-center text-gray-600 text-[9px] italic py-2">Not injured</div>';
        } else {
            let foodHtml = '';
            for (const [fId, count] of Object.entries(state.inventory || {})) {
                if (count > 0 && fId.startsWith('food_')) {
                    const fDef = typeof items !== 'undefined' && items[fId] ? items[fId] : {icon:'🍔', healVal:20};
                    foodHtml += `<button onclick="feedCharacter('${key}', '${fId}')" class="bg-orange-950/50 hover:bg-orange-900 border border-orange-700/50 rounded p-1 flex flex-col items-center cursor-pointer transition-colors" title="Heal ${fDef.healVal}">
                        <div class="text-xl">${fDef.icon}</div>
                        <div class="text-[8px] text-orange-300 font-bold mt-1">x${count}</div>
                    </button>`;
                }
            }
            if (foodHtml === '') {
                foodHtml = '<div class="col-span-4 text-center text-gray-500 text-[9px] italic py-2">No food in inventory</div>';
            }
            foodGrid.innerHTML = foodHtml;
        }
    }


    // Build skins button if character is hired
    let skinsRowHtml = '';
    if (isHired && typeof evolutionTiers !== 'undefined') {
        const charData = state.roster[key];
        const activeSkinTier = charData && charData.activeSkin && charData.activeSkin !== 'default'
            ? evolutionTiers.find(t => t.skinKey === charData.activeSkin)
            : null;
        const skinLabel = activeSkinTier ? `${activeSkinTier.icon} ${activeSkinTier.theme}` : String.fromCodePoint(0x1F464) + ' Default';
        const unlockedCount = charData && charData.unlockedSkins ? charData.unlockedSkins.length : 1;
        skinsRowHtml = `
            <button onclick="openSkinSelector('${key}')" class="w-full bg-purple-900/80 hover:bg-purple-800 text-purple-200 font-bold py-2 text-[10px] cursor-pointer uppercase tracking-wider rounded border border-purple-700/60 shadow-sm flex items-center justify-center gap-2 transition-colors">
                ` + String.fromCodePoint(0x1F3A8) + ` SKINS <span class="text-purple-400 text-[8px] font-normal">(${skinLabel} ` + String.fromCodePoint(0xB7) + ` ${unlockedCount}/${evolutionTiers.length + 1} unlocked)</span>
            </button>
        `;
    }
    // Full stats button
    let charDetailBtn = '';
    if (isHired && typeof openCharDetail === 'function') {
        charDetailBtn = `
            <button onclick="closeModal();openCharDetail('${key}')" class="w-full bg-slate-800/80 hover:bg-slate-700/80 text-gray-300 font-bold py-2 text-[9px] cursor-pointer uppercase tracking-wider rounded border border-white/10 transition-all flex items-center justify-center gap-1">
                📊 FULL STATS & EQUIPMENT
            </button>
        `;
    }
    footerActions.innerHTML = `
        <div class="flex flex-col gap-2 w-full">
            ${equipRowHtml}
            ${skinsRowHtml}
            ${charDetailBtn}
            ${hireRowHtml}
        </div>
    `;

    const actionModal = document.getElementById('action-modal');
    if (actionModal) actionModal.classList.remove('hidden');
}


window.feedCharacter = function(charKey, foodId) {
    if (!state.roster[charKey] || state.roster[charKey].currentHp >= state.roster[charKey].maxHp) return;
    if (!state.inventory || !state.inventory[foodId] || state.inventory[foodId] <= 0) return;
    
    const fDef = typeof items !== 'undefined' && items[foodId] ? items[foodId] : {icon:'🍔', healVal:20};
    state.inventory[foodId]--;
    
    let healAmount = fDef.healVal || 20;
    if (typeof activeSynergies !== 'undefined' && activeSynergies.foodMult) {
        healAmount = Math.floor(healAmount * activeSynergies.foodMult);
    }
    
    state.roster[charKey].currentHp = Math.min(state.roster[charKey].maxHp, state.roster[charKey].currentHp + healAmount);
    
    if (state.roster[charKey].currentHp >= state.roster[charKey].maxHp) {
        state.roster[charKey].status = 'healthy';
        state.roster[charKey].hospitalEndTime = 0;
    }
    
    if(typeof SoundManager !== 'undefined') SoundManager.playFX('heal');
    if(typeof saveProgress === 'function') saveProgress();
    
    openModal(null, charKey);
    
    if (typeof updateRosterUI === 'function') updateRosterUI();
    if (typeof renderHangoutBackground === 'function') renderHangoutBackground();
};

function closeModal() {
    const actionModal = document.getElementById('action-modal');
    if (actionModal) actionModal.classList.add('hidden');
    activeModalKey = null;
}

function executeModalAction(mode) {
    if (!activeModalKey) return;
    const config = characters[activeModalKey];
    const lvl = state.roster[activeModalKey] ? state.roster[activeModalKey].level : 0;
    const currentCost = Math.floor(config.cost.money * Math.pow(1.35, lvl));

    if (!state.equipped) state.equipped = {};

    if (mode === 'buy') {
        if (state.resources.money >= currentCost) {
            state.resources.money -= currentCost;
            if (typeof trackStat === 'function') trackStat('moneySpent', currentCost);
            
            const isFirstHire = !state.roster[activeModalKey] || state.roster[activeModalKey].level === 0;
            
            if (!state.roster[activeModalKey]) {
                state.roster[activeModalKey] = { level: 1, currentHp: config.baseHp || 100, maxHp: config.baseHp || 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] };
            } else {
                state.roster[activeModalKey].level++;
                if (typeof checkEvolutionUnlock === 'function') checkEvolutionUnlock(activeModalKey, state.roster[activeModalKey].level);
            }
            
            if (typeof updateQuestProgress === 'function') updateQuestProgress('level_char', 1);
            
            if (isFirstHire) {
                if (typeof trackStat === 'function') trackStat('charactersHired', 1);
                
                // Auto-equip to formation on first hire
                ensureFormation();
                const hireCounts = countFormationChars(state.formation);
                if (hireCounts.chars < 5) {
                    const naturalLane = config.lane || 'back';
                    let hired = false;
                    for (let i = 0; i < state.formation[naturalLane].length; i++) {
                        if (state.formation[naturalLane][i] === null) {
                            state.formation[naturalLane][i] = { type: 'char', key: activeModalKey };
                            hired = true;
                            break;
                        }
                    }
                    if (!hired) {
                        for (const lane of ['front', 'mid', 'back']) {
                            for (let i = 0; i < state.formation[lane].length; i++) {
                                if (state.formation[lane][i] === null) {
                                    state.formation[lane][i] = { type: 'char', key: activeModalKey };
                                    hired = true;
                                    break;
                                }
                            }
                            if (hired) break;
                        }
                    }
                    if (hired) syncFormationToEquipped();
                }
            }
        }
    } else if (mode === 'equip') {
        ensureFormation();
        const counts = countFormationChars(state.formation);
        if (counts.chars >= getMaxCharSlots()) return;
        
        const naturalLane = config.lane || 'back';
        let placed = false;
        for (let i = 0; i < state.formation[naturalLane].length; i++) {
            if (state.formation[naturalLane][i] === null) {
                state.formation[naturalLane][i] = { type: 'char', key: activeModalKey };
                placed = true;
                break;
            }
        }
        if (!placed) {
            for (const lane of ['front', 'mid', 'back']) {
                for (let i = 0; i < state.formation[lane].length; i++) {
                    if (state.formation[lane][i] === null) {
                        state.formation[lane][i] = { type: 'char', key: activeModalKey };
                        placed = true;
                        break;
                    }
                }
                if (placed) break;
            }
        }
        if (placed) syncFormationToEquipped();
    } else if (mode === 'unequip') {
        ensureFormation();
        ['front', 'mid', 'back'].forEach(lane => {
            state.formation[lane].forEach((slot, idx) => {
                if (slot && slot.type === 'char' && slot.key === activeModalKey) {
                    state.formation[lane][idx] = null;
                }
            });
        });
        syncFormationToEquipped();
    }

    saveProgress();
    syncUI();
    renderRosterGrid();
    renderActiveBattleLine();
    startAutomationEngines();
    openModal(null, activeModalKey);
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
        <div class="col-span-full bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center text-[8px] mb-1">
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
            const cost = state.botSlots === 1 ? 500 : 2500;
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

        let frameBorder = 'border-gray-800 bg-black/70 opacity-70';
        let statusBadge = `<span class="text-gray-500 text-[7px]">BUILD</span>`;

        if (level > 0) {
            frameBorder = 'border-emerald-500 bg-emerald-950/40 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)] opacity-100';
            statusBadge = `<span class="text-emerald-400 animate-pulse text-[7px]">BUILT L${level}</span>`;
        }

        grid.innerHTML += `
            <div onclick="openRobotModal(event, '${key}')" class="p-2 border-2 rounded-lg flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all h-[56px] ${frameBorder}">
                <div class="flex items-center gap-2 overflow-hidden pointer-events-none min-w-0 flex-1">
                    <div class="w-8 h-10 flex-shrink-0 bg-black/60 rounded p-0.5 flex items-center justify-center">${getVectorFrame(key, false) || '🤖'}</div>
                    <div class="min-w-0 flex-1">
                        <div class="font-bold text-white text-[10px] truncate">${config.name}</div>
                        <div class="text-[7px] text-gray-400 uppercase tracking-tighter mt-0.5">${config.type} | ${config.lane}</div>
                    </div>
                </div>
                <div class="text-[7px] font-bold px-1.5 py-1 rounded bg-gray-950 border border-gray-800 pointer-events-none text-center min-w-[48px] flex-shrink-0 ml-1">
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

    // Add to formation.bots
    ensureFormation();
    const emptyBotSlot = state.formation.bots.indexOf(null);
    if (emptyBotSlot !== -1) {
        state.formation.bots[emptyBotSlot] = { key: key, lane: config.lane || 'front' };
    }

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
    
    // Remove from formation.bots
    ensureFormation();
    state.formation.bots = state.formation.bots.map(slot => {
        if (slot && slot.key === key) return null;
        return slot;
    });

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

    completed.forEach(idx => {
        const item = state.craftingQueue[idx];
        const config = robots[item.blueprintId];
        
        const deployedCount = state.robots.filter(r => r && r.equipped).length;
        const canDeploy = deployedCount < (state.botSlots || 1);
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
        }
        
        state.craftingQueue.splice(idx, 1);
    });

    if (completed.length > 0) {
        saveProgress();
        syncUI();
        renderCraftingQueue();
        renderRobotBattleLine();
        startRobotAutomation();
    }
    
    renderCraftingQueue();
}

function tryEquipRobot(robot) {
    var deployedCount = state.robots.filter(function(r) { return r && r.equipped; }).length;
    if (deployedCount >= (state.botSlots || 1)) return false;
    robot.equipped = true;
    return true;
}

// Lightweight in-place update of robot heat bars — no DOM rebuild, no flicker
function updateRobotHeatBars() {
    if (!state.robots) return;
    state.robots.forEach(robot => {
        if (!robot || !robot.equipped) return;
        const el = document.getElementById('live-robot-' + robot.id);
        if (!el) return;
        const config = robots[robot.blueprintId];
        if (!config) return;
        const maxH = robot.maxHeat || (config.baseHeat || 200) * robot.level;
        const curH = robot.heat || 0;
        const hpPct = Math.max(0, Math.min(100, (curH / maxH) * 100));
        // Update heat bar width
        const bar = el.querySelector('.h-full.bg-gradient-to-r');
        if (bar) bar.style.width = hpPct + '%';
        // Update overheat visual
        const vecWrap = el.querySelector('.character-vector-wrapper');
        if (vecWrap) {
            if (robot.overheated) {
                vecWrap.classList.add('grayscale', 'brightness-50', 'sepia');
                vecWrap.style.filter = 'grayscale(1) brightness(0.5) sepia(1) blur(1px)';
            } else {
                vecWrap.classList.remove('grayscale', 'brightness-50', 'sepia');
                vecWrap.style.filter = '';
            }
        }
        // Show/hide overheat smoke
        let smoke = el.querySelector('.robot-overheat-smoke');
        if (robot.overheated && !smoke) {
            const s = document.createElement('div');
            s.className = 'robot-overheat-smoke absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-50 pointer-events-none';
            s.textContent = '💨';
            el.appendChild(s);
            const t = document.createElement('div');
            t.className = 'robot-overheat-smoke absolute -top-6 text-red-500 font-bold text-[8px] bg-black/80 px-1 rounded z-50';
            t.textContent = 'OVERHEATED';
            el.appendChild(t);
        } else if (!robot.overheated && smoke) {
            el.querySelectorAll('.robot-overheat-smoke').forEach(s => s.remove());
        }
    });
}

function renderRobotBattleLine() {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    const smallContainer = document.getElementById('robot-line-small');
    const bigContainer = document.getElementById('robot-line-big');
    if (smallContainer) smallContainer.innerHTML = '';
    if (bigContainer) bigContainer.innerHTML = '';

    // Remove any previously rendered bots from lane containers to prevent duplicates
    document.querySelectorAll('[id^="live-robot-"]').forEach(el => el.remove());

    ensureFormation();
    // Live-sync: ensure equipped robots are in formation.bots
    if (state.robots) {
        state.robots.forEach(robot => {
            if (!robot || !robot.equipped) return;
            const alreadyIn = state.formation.bots.some(s => s && s.key === robot.blueprintId);
            if (!alreadyIn) {
                const emptySlot = state.formation.bots.indexOf(null);
                if (emptySlot !== -1) state.formation.bots[emptySlot] = { key: robot.blueprintId, lane: robot.lane || 'front' };
            }
        });
    }
    const botLore = {
        r2d2_unit: { scale: 0.8, z: 40, flying: false },
        battle_droid: { scale: 1.6, z: 10, flying: false },
        droideka: { scale: 1.5, z: 10, flying: false },
        omac_unit: { scale: 2.4, z: 10, flying: false },
        cyborg_support: { scale: 1.2, z: 10, flying: false },
        apokolips_destroyer: { scale: 3.0, z: 5, flying: true },
        atom_boxer: { scale: 2.2, z: 10, flying: false },
        zeus_titan: { scale: 3.0, z: 5, flying: false },
        midas_speedster: { scale: 2.3, z: 10, flying: true },
        roomba_doom: { scale: 1.2, z: 10, flying: false },
        quantum_drone: { scale: 1.8, z: 20, flying: true }
    };

    // Render bots into their dedicated containers, spread by index
    var botIndex = 0;
    
    // Accumulators for batched DOM updates
    let bigContainerHtml = '';
    let smallContainerHtml = '';

    (state.formation.bots || []).forEach(slot => {
        if (!slot) return;
        const robot = state.robots.find(r => r && r.blueprintId === slot.key && r.equipped);
        if (!robot) return;
        const config = robots[robot.blueprintId];
        if (!config) return;
        
        const lore = botLore[robot.blueprintId] || { scale: 1, z: 10, flying: false };
        const isSmall = lore.scale <= 1.5;
        
        const dps = Math.round((config.baseDmg * robot.level * 1000) / config.atkSpeed);
        var svgRaw = getVectorFrame(robot.blueprintId, false);
        const svg = (typeof svgRaw === 'string' && svgRaw.length > 0) ? svgRaw : '🤖';
        const robotDisplayName = (typeof robot.name === 'string') ? robot.name : (config.name || robot.blueprintId);
        const floatClass = lore.flying ? 'mb-[15%] animate-pulse' : '';
        
        const maxH = robot.maxHeat || (config.baseHeat || 200) * robot.level;
        const curH = robot.heat || 0;
        const hpPct = Math.max(0, Math.min(100, (curH / maxH) * 100)) || 0;
        const hpBarHtml = `
            <div class="absolute -top-3 left-0 right-0 h-1.5 bg-gray-900 border border-gray-700 rounded-sm overflow-hidden z-40 opacity-90 shadow-[0_0_5px_rgba(255,100,0,0.5)] pointer-events-none">
                <div class="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300" style="width: ${hpPct}%"></div>
            </div>
        `;
        const smokeHtml = robot.overheated ? '<div class="robot-overheat-smoke absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-50 pointer-events-none">💨</div><div class="robot-overheat-smoke absolute -top-6 text-red-500 font-bold text-[8px] bg-black/80 px-1 rounded z-50">OVERHEATED</div>' : '';
        
        const botHtml = `
            <div id="live-robot-${robot.id}" 
                 class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:scale-[1.02] transition-transform pointer-events-auto ${floatClass}" 
                 style="z-index: ${lore.z};"
                 onclick="openRobotModal(event, '${robot.blueprintId}')">
                ${hpBarHtml}${smokeHtml}
                <div class="character-vector-wrapper flex items-center justify-center text-4xl ${robot.overheated ? 'grayscale brightness-50 sepia blur-[1px]' : ''}" style="transform: scale(${lore.scale}); transform-origin: bottom center;">${svg}</div>
                <div class="absolute top-0 left-0 right-0 flex gap-1 justify-center text-[7px] pointer-events-none">
                    <span class="bg-cyan-900/90 text-cyan-300 px-1 py-0.5 rounded border border-cyan-700 font-bold">L${robot.level}</span>
                    <span class="bg-amber-900/90 text-amber-300 px-1 py-0.5 rounded border border-amber-700 font-bold">${config.baseDmg * robot.level}DMG</span>
                    <span class="bg-purple-900/90 text-purple-300 px-1 py-0.5 rounded border border-purple-700 font-bold">${dps}DPS</span>
                </div>
                <span class="bg-cyan-950/90 text-white border border-cyan-700 font-bold text-[9px] px-2 py-1 absolute -bottom-6 rounded whitespace-nowrap uppercase tracking-tighter shadow-lg">${robotDisplayName}</span>
            </div>
        `;
        
        if (isSmall) {
            smallContainerHtml += botHtml;
        } else {
            bigContainerHtml += botHtml;
        }
        botIndex++;
    });
    
    if (smallContainer) smallContainer.innerHTML = smallContainerHtml;
    if (bigContainer) bigContainer.innerHTML = bigContainerHtml;
}


function triggerRobotVisuals(robotId, config) {
    if (hangoutMode) return; // no robot visuals
    const el = document.getElementById('live-robot-' + robotId);
    const arena = document.getElementById('arena');
    const enemyContainer = document.getElementById('enemy-container');
    if (!el || !arena || !enemyContainer) return;
    if (config.lane === 'front' && !el._meleeThrottle) {
        el.classList.add('robot-melee-bump');
        el._meleeThrottle = true;
        setTimeout(() => { el.classList.remove('robot-melee-bump'); el._meleeThrottle = false; }, 350);
    } else {
        const rect = el.getBoundingClientRect();
        const enemy = enemyContainer.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        const enemyCenterX = enemy.left + enemy.width / 2;
        const enemyCenterY = enemy.top + enemy.height / 2;
        const deltaX = enemyCenterX - charCenterX;
        const deltaY = enemyCenterY - charCenterY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const laser = document.createElement('div');
        laser.className = 'laser-beam';
        if (config.type === 'flying') { laser.classList.add('plasma'); } else { laser.classList.add('bullet'); }
        laser.style.left = charCenterX + 'px';
        laser.style.top = charCenterY + 'px';
        laser.style.setProperty('--target-x', deltaX + 'px');
        laser.style.setProperty('--target-y', deltaY + 'px');
        laser.style.setProperty('--angle', angle + 'deg');
        document.body.appendChild(laser);
        setTimeout(() => { if (laser.parentNode) laser.remove(); generateImpactSparks({ clientX: enemyCenterX, clientY: enemyCenterY }); }, 400);
    }
}

function startRobotAutomation() {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    // Clear any existing robot timers
    if (!window.robotTimers) window.robotTimers = {};
    Object.values(window.robotTimers).forEach(clearInterval);
    window.robotTimers = {};

    for (const robot of state.robots) {
        if (!robot || !robot.equipped) continue;
        
        const config = robots[robot.blueprintId];
        if (!config) continue; // Skip if blueprint not found (e.g. spectating)
        let rate = config.atkSpeed / activeSynergies.robotSpeedMult;
        if (rageDuration > 0) rate *= 0.45;

        window.robotTimers[robot.id] = setInterval(() => {
            if (!window.gameStarted) return; // Suppress until title screen dismissed
            if (robot.overheated) return; // Cannot attack if overheated
            if (typeof robot.heat === 'undefined' || isNaN(robot.heat)) robot.heat = 0;
            if (typeof robot.maxHeat === 'undefined' || isNaN(robot.maxHeat)) robot.maxHeat = (config.baseHeat || 200) * robot.level;
            
            // Add attacking heat
            robot.heat += Math.max(1, Math.floor(robot.maxHeat * 0.02)); // Add 2% heat per attack (nerfed from 5%)
            if (robot.heat >= robot.maxHeat) {
                robot.heat = robot.maxHeat;
                robot.overheated = true;
                if (typeof updateRobotHeatBars === 'function') updateRobotHeatBars();
            }
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            let rbDmg = config.baseDmg * robot.level;
            const rPerkMult = state.perks ? (1 + (state.perks.robotDmgMult * 0.1)) : 1;
            if (typeof triggerRobotVisuals === 'function') triggerRobotVisuals(robot.id, config);
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);
        }, rate);
    }
}

let activeRobotKey = null;

// FOOD SHOP SYSTEM
function openFoodShop(event) {
    if(event) event.stopPropagation();
    var modal = document.getElementById('food-shop-modal');
    if (modal) modal.classList.remove('hidden');
    renderFoodGrid();
}

function closeFoodShop() {
    var modal = document.getElementById('food-shop-modal');
    if (modal) modal.classList.add('hidden');
}

function renderFoodGrid() {
    var grid = document.getElementById('food-grid');
    var moneyDisp = document.getElementById('food-modal-money');
    if (moneyDisp) moneyDisp.innerText = 'CASH: $' + formatNumber(state.resources.money);
    if (!grid) return;
    grid.innerHTML = '';
    for (var fkey in foods) {
        if (!foods.hasOwnProperty(fkey)) continue;
        var item = foods[fkey];
        var cost = Math.floor(10 / item.rarity);
        var owned = state.food[fkey] || 0;
        var canAfford = state.resources.money >= cost;
        var btnClass = canAfford ? 'bg-orange-600 hover:bg-orange-500 text-white cursor-pointer' : 'bg-gray-800 text-gray-500 cursor-not-allowed';
        var fh = '<div class="bg-slate-900 border-2 border-slate-700 p-3 rounded flex items-center justify-between">';
        fh += '<div class="flex items-center gap-3"><div class="text-3xl">' + item.emoji + '</div>';
        fh += '<div><div class="font-bold text-orange-400 text-[12px]">' + item.name + ' <span class="text-gray-400 text-[10px] ml-1">(x' + owned + ')</span></div>';
        fh += '<div class="text-[9px] text-gray-400 mt-0.5 leading-tight">' + item.description + '</div>';
        fh += '<div class="text-[10px] text-green-400 mt-1 font-bold">+' + item.hpRestore + ' HP</div></div></div>';
        fh += '<button onclick="buyFood(\'' + fkey + '\', ' + cost + ')" ' + (!canAfford ? 'disabled' : '') + ' class="' + btnClass + ' px-3 py-2 rounded font-bold border-2 border-black shadow-md text-[10px]">$' + formatNumber(cost) + '</button>';
        fh += '</div>';
        grid.innerHTML += fh;
    }
}

// HOSPITAL / CLINIC SYSTEM
function toggleHospitalPlace(event) {
    if(event) event.stopPropagation();
    var place = document.getElementById('hospital-place');
    var arena = document.getElementById('arena');
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
    var grid = document.getElementById('hospital-beds-grid');
    if (!grid) return;
    grid.innerHTML = '';
    if (!state.hospitalized || state.hospitalized.length === 0) {
        grid.innerHTML = '<div class="flex flex-col items-center justify-center w-full mt-16 gap-4">' +
            '<div style="width:60px;height:60px;position:relative;opacity:0.3;"><div style="position:absolute;top:20px;left:0;width:60px;height:20px;background:#10b981;border-radius:4px;"></div><div style="position:absolute;top:0;left:20px;width:20px;height:60px;background:#10b981;border-radius:4px;"></div></div>' +
            '<div class="text-emerald-500 text-center text-sm font-bold tracking-widest uppercase" style="text-shadow:0 0 15px rgba(16,185,129,0.4);">All Clear!</div>' +
            '<div class="text-emerald-800 text-center text-[10px] tracking-wider">The clinic is empty. Everyone is healthy!</div></div>';
        return;
    }
    var now = Date.now();
    for (var ki = 0; ki < state.hospitalized.length; ki++) {
        var hkey = state.hospitalized[ki];
        var charData = state.roster[hkey];
        var cconfig = characters[hkey];
        if (!charData || !cconfig) continue;
        var timeLeft = Math.max(0, charData.hospitalEndTime - now);
        var mins = Math.floor(timeLeft / 1000 / 60);
        var secs = Math.floor((timeLeft / 1000) % 60);
        var hpPct = Math.min(100, Math.max(0, (charData.currentHp / charData.maxHp) * 100));
        var foodKeys = Object.keys(state.food || {}).filter(function(f) { return state.food[f] > 0; });
        var foodBtns = '';
        for (var fi = 0; fi < foodKeys.length; fi++) {
            var fk = foodKeys[fi];
            foodBtns += '<button onclick="useFoodForRecovery(\'' + hkey + '\', \'' + fk + '\'); renderHospitalPlace(); syncUI(); renderRosterGrid();" class="bg-orange-600 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded text-[9px] cursor-pointer shadow-md border border-orange-700">' + foods[fk].emoji + ' x' + state.food[fk] + '</button>';
        }
        var foodHtml = foodBtns.length > 0 ? '<div class="flex gap-1 flex-wrap justify-center">' + foodBtns + '</div>' : '<div class="text-[8px] text-emerald-300/50 italic tracking-wider">No food available</div>';
        var charSprite = typeof getVectorFrame === 'function' ? getVectorFrame(hkey, false, 'injured') : '';
        var b = '<div class="relative flex flex-col items-center" style="width:200px;">';
        b += '<div class="relative w-full" style="height:170px;">';
        // Pod shadow
        b += '<div class="absolute bottom-1 left-6 right-6 h-3 rounded-full" style="background:radial-gradient(ellipse, rgba(20,184,166,0.15) 0%, transparent 70%);"></div>';
        // Medical pod frame — dark metal with teal accents
        b += '<div class="absolute bottom-6 left-3 right-3" style="height:80px;">';
        // Pod base/bed
        b += '<div style="position:absolute;bottom:10px;left:8px;right:8px;height:26px;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:4px 4px 0 0;border:1px solid #334155;box-shadow:inset 0 1px 0 rgba(255,255,255,0.05);"></div>';
        // Mattress/pad — dark with subtle teal
        b += '<div style="position:absolute;bottom:10px;left:12px;right:28px;height:20px;background:linear-gradient(135deg,#134e4a,#0f3d3a);border-radius:3px;border:1px solid #115e59;opacity:0.9;"></div>';
        // Pillow — dark
        b += '<div style="position:absolute;bottom:24px;right:10px;width:28px;height:14px;background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:5px;border:1px solid #334155;"></div>';
        // Pod legs — metallic dark
        b += '<div style="position:absolute;bottom:0;left:6px;width:5px;height:42px;background:linear-gradient(180deg,#475569,#1e293b);border-radius:2px;"></div>';
        b += '<div style="position:absolute;bottom:0;right:6px;width:5px;height:42px;background:linear-gradient(180deg,#475569,#1e293b);border-radius:2px;"></div>';
        // Pod side rails — metallic with teal glow
        b += '<div style="position:absolute;bottom:8px;right:0;width:8px;height:48px;background:linear-gradient(90deg,#334155,#475569);border-radius:0 3px 3px 0;border:1px solid #475569;box-shadow:1px 0 4px rgba(20,184,166,0.1);"></div>';
        b += '<div style="position:absolute;bottom:8px;left:0;width:6px;height:35px;background:linear-gradient(90deg,#475569,#334155);border-radius:3px 0 0 3px;border:1px solid #475569;box-shadow:-1px 0 4px rgba(20,184,166,0.1);"></div>';
        // Neon accent strip on bed edge
        b += '<div style="position:absolute;bottom:9px;left:8px;right:8px;height:1px;background:linear-gradient(90deg,transparent,rgba(20,184,166,0.4),transparent);box-shadow:0 0 4px rgba(20,184,166,0.3);"></div>';
        // Wheel accents
        b += '<div style="position:absolute;bottom:-1px;left:4px;width:6px;height:6px;background:#334155;border-radius:50%;border:1px solid #475569;"></div>';
        b += '<div style="position:absolute;bottom:-1px;right:4px;width:6px;height:6px;background:#334155;border-radius:50%;border:1px solid #475569;"></div>';
        b += '</div>';
        // IV Drip stand — dark tech style
        b += '<div class="absolute" style="right:14px;bottom:44px;">';
        b += '<div style="width:2px;height:65px;background:linear-gradient(180deg,#475569,#1e293b);margin:0 auto;"></div>';
        b += '<div style="width:16px;height:1px;background:#475569;margin:-65px auto 0;"></div>';
        b += '<div style="width:8px;height:12px;background:linear-gradient(180deg,#14b8a6,#0d9488);border:1px solid #0f766e;border-radius:2px;margin:-1px auto 0;box-shadow:0 0 6px rgba(20,184,166,0.4);"></div>';
        b += '<div style="width:1px;height:12px;background:rgba(20,184,166,0.5);margin:0 auto;box-shadow:0 0 3px rgba(20,184,166,0.3);"></div>';
        b += '</div>';
        // Character on bed (rotated to lay down)
        b += '<div class="absolute" style="bottom:30px;left:18px;width:100px;height:50px;transform:rotate(-90deg) scaleX(-1);transform-origin:center;z-index:5;filter:drop-shadow(0 3px 8px rgba(0,0,0,0.6));">';
        b += '<div class="flex items-center justify-center w-full h-full">' + charSprite + '</div></div>';
        // Heart monitor — dark holographic style
        b += '<div class="absolute top-4 left-6" style="width:38px;height:22px;background:#0a0e1a;border:1px solid #1e293b;border-radius:3px;overflow:hidden;box-shadow:0 0 6px rgba(20,184,166,0.15);">';
        b += '<svg viewBox="0 0 40 24" style="width:100%;height:100%;"><polyline points="0,12 8,12 12,4 16,20 20,12 28,12 32,8 36,16 40,12" fill="none" stroke="#14b8a6" stroke-width="1.5" opacity="0.9"><animate attributeName="stroke-dashoffset" values="80;0" dur="2s" repeatCount="indefinite"/></polyline></svg></div>';
        b += '</div>';
        // Info card below bed — dark theme with teal accents
        b += '<div class="w-full rounded-xl p-2.5 flex flex-col items-center gap-1.5 mt-1" style="background:linear-gradient(135deg, rgba(15,23,42,0.95), rgba(10,15,30,0.98));border:1px solid rgba(20,184,166,0.2);box-shadow:0 4px 15px rgba(0,0,0,0.5),0 0 1px rgba(20,184,166,0.2);">';
        b += '<div class="text-teal-300 font-bold uppercase text-[11px] tracking-wider" style="text-shadow:0 0 8px rgba(20,184,166,0.5);">' + cconfig.name + '</div>';
        b += '<div class="w-full h-2 rounded-full overflow-hidden" style="background:#1e293b;border:1px solid #334155;"><div class="h-full rounded-full" style="width:' + hpPct + '%;background:linear-gradient(90deg,#ef4444,#f97316);box-shadow:0 0 6px rgba(239,68,68,0.3);"></div></div>';
        b += '<div class="text-[9px] text-red-400 font-bold">' + Math.floor(charData.currentHp) + ' / ' + charData.maxHp + ' HP</div>';
        b += '<div class="text-[13px] font-black text-white px-3 py-1 rounded-lg w-full text-center animate-pulse" style="background:linear-gradient(135deg,#7f1d1d,#991b1b);border:1px solid #dc2626;box-shadow:0 0 8px rgba(220,38,38,0.2);">';
        b += String.fromCodePoint(0x23F1) + ' ' + mins + 'm ' + secs + 's</div>';
        b += '<div class="w-full flex justify-center pt-1.5 border-t border-teal-800/30 mt-0.5">' + foodHtml + '</div>';
        b += '</div></div>';
        grid.innerHTML += b;
    }
}

// Ensure the hospital place updates periodically if open
setInterval(function() {
    var place = document.getElementById('hospital-place');
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
var killStreak = 0;
var killStreakTimer = null;
var bestKillStreak = 0;

function toggleHangoutMode(event) {
    if (event) event.stopPropagation();
    hangoutMode = !hangoutMode;
    
    var btnText = document.getElementById('hangout-btn-text');
    if (btnText) btnText.innerText = hangoutMode ? 'BACK TO BATTLE' : 'HANG OUT';
    
    var combatUI = document.getElementById('enemy-battle-slot');
    var playerLines = document.getElementById('player-battle-line');
    var robotSmall = document.getElementById('robot-line-small');
    var robotBig = document.getElementById('robot-line-big');
    var hotspots = document.getElementById('hangout-hotspots');
    
    if (hangoutMode) {
        if (combatUI) combatUI.classList.add('hidden');
        if (playerLines) playerLines.classList.add('hidden');
        if (robotSmall) robotSmall.classList.add('hidden');
        if (robotBig) robotBig.classList.add('hidden');
        var enemyContainer = document.getElementById('enemy-container');
        if (enemyContainer) enemyContainer.classList.add('hidden');
        var synergyEl = document.getElementById('synergy-display');
        if (synergyEl) synergyEl.style.display = 'none';
        var repairEl = document.getElementById('quick-repair-container');
        if (repairEl) repairEl.style.display = 'none';
        // boss controls will restore via spawnEnemy on exit
        document.querySelectorAll('.damage-popup, .unique-fx, .laser-beam').forEach(function(el) { el.remove(); });
        generateLocationHotspots();
        renderHangoutMapBrowser();
        if (typeof renderHangoutCrew === 'function') renderHangoutCrew();
    } else {
        if (combatUI) combatUI.classList.remove('hidden');
        if (playerLines) playerLines.classList.remove('hidden');
        if (robotSmall) robotSmall.classList.remove('hidden');
        if (robotBig) robotBig.classList.remove('hidden');
        var enemyContainer2 = document.getElementById('enemy-container');
        if (enemyContainer2) enemyContainer2.classList.remove('hidden');
        if (hotspots) hotspots.classList.add('hidden');
        var synergyEl2 = document.getElementById('synergy-display');
        if (synergyEl2) synergyEl2.style.display = '';
        var repairEl2 = document.getElementById('quick-repair-container');
        if (repairEl2) repairEl2.style.display = '';
        // Re-trigger spawnEnemy to restore boss button state
        if (typeof spawnEnemy === 'function') spawnEnemy();
        var hcc = document.getElementById('hangout-crew-container');
        if (hcc) hcc.remove();
        var mdc = document.getElementById('hangout-map-dropdown-container');
        if (mdc) mdc.remove();
        var dynHotspots = document.getElementById('dynamic-hotspots');
        if (dynHotspots) dynHotspots.remove();
    }
}

function generateLocationHotspots() {
    var old = document.getElementById('dynamic-hotspots');
    if (old) old.remove();
    
    var arena = document.getElementById('arena');
    if (!arena) return;
    
    var container = document.createElement('div');
    container.id = 'dynamic-hotspots';
    container.style.cssText = 'position:absolute;inset:0;z-index:56;';
    arena.appendChild(container);
    
    // Hotspot definitions per location: { type, label, emoji, position, size, color }
    var hotspotDefs = {
        // sheldons_apt: Matches bg: whiteboard left:3% top:8%, window left:35% top:6%, bookshelf right:20% top:10%, door right:3% top:5%, couch bottom:10% left:15%, kitchen left:0 top:48%
        sheldons_apt: [
            { type: 'whiteboard', label: 'Whiteboard', emoji: '📝', top: '8%', left: '3%', w: '28%', h: '35%', color: 'slate' },
            { type: 'fridge', label: 'Window', emoji: '🪟', top: '6%', left: '35%', w: '28%', h: '50%', color: 'cyan' },
            { type: 'bookcase', label: 'Collectibles', emoji: '📚', top: '10%', left: '68%', w: '12%', h: '45%', color: 'purple' },
            { type: 'door', label: 'Apt 4A Door', emoji: '🚪', top: '5%', left: '83%', w: '14%', h: '60%', color: 'stone' },
            { type: 'couch', label: "Sheldon's Spot", emoji: '🛋️', bottom: '10%', left: '15%', w: '55%', h: '22%', color: 'amber' }
        ],
        // pennys_apt: Matches bg: wine rack left:4% top:12%, kitchen left:28% top:10%, TV right:15% top:15%, door right:2% top:5%, couch bottom:8% left:20%
        pennys_apt: [
            { type: 'door', label: 'Wine Rack', emoji: '🍷', top: '12%', left: '4%', w: '18%', h: '38%', color: 'rose' },
            { type: 'kitchen', label: 'Kitchen', emoji: '🍳', top: '10%', left: '28%', w: '20%', h: '12%', color: 'yellow' },
            { type: 'window', label: 'TV', emoji: '📺', top: '15%', left: '63%', w: '22%', h: '28%', color: 'sky' },
            { type: 'door', label: 'Apt 4B Door', emoji: '🚪', top: '5%', left: '88%', w: '10%', h: '60%', color: 'amber' },
            { type: 'couch', label: 'Couch', emoji: '🛋️', bottom: '8%', left: '20%', w: '50%', h: '18%', color: 'purple' }
        ],
        // comic_store: Matches bg: left shelf left:5% top:14%, display left:34% top:20%, right shelf right:5% top:14%, counter bottom:0, D&D bottom:25% left:8%
        comic_store: [
            { type: 'shelf_left', label: 'DC Comics', emoji: '🦇', top: '14%', left: '5%', w: '25%', h: '55%', color: 'blue' },
            { type: 'standee', label: 'Collectibles', emoji: '🦸', top: '20%', left: '34%', w: '32%', h: '45%', color: 'pink' },
            { type: 'shelf_right', label: 'Marvel', emoji: '🕷️', top: '14%', left: '70%', w: '25%', h: '55%', color: 'red' },
            { type: 'counter', label: 'Cash Register', emoji: '🏪', bottom: '0', left: '0', w: '100%', h: '22%', color: 'emerald' },
            { type: 'board', label: 'D&D Corner', emoji: '🎲', bottom: '25%', left: '8%', w: '15%', h: '10%', color: 'amber' }
        ],
        // chocolate_factory: Matches bg: left pipe left:18% top:0, right pipe right:18% top:0, vat center top:30%, conveyor bottom:22%, floor bottom:0 h:15%, warning right:5% top:15%
        chocolate_factory: [
            { type: 'conveyor', label: 'Left Pipe', emoji: '🏭', top: '0', left: '16%', w: '10%', h: '35%', color: 'slate' },
            { type: 'vat', label: 'Chocolate Vat', emoji: '🍫', top: '30%', left: '22%', w: '55%', h: '38%', color: 'amber' },
            { type: 'storage', label: 'Right Pipe', emoji: '📦', top: '0', left: '72%', w: '10%', h: '35%', color: 'slate' },
            { type: 'office', label: 'Conveyor Belt', emoji: '⚙️', bottom: '15%', left: '10%', w: '80%', h: '10%', color: 'stone' },
            { type: 'office', label: 'Factory Floor', emoji: '🏢', bottom: '0', left: '0', w: '100%', h: '15%', color: 'stone' }
        ],
        // cheesecake_factory: Matches bg: left column left:4%, right column right:4%, menu top:5% center, booth bottom:0 inset:10%
        cheesecake_factory: [
            { type: 'bar', label: 'Column', emoji: '🏛️', top: '0', left: '4%', w: '7%', h: '70%', color: 'amber' },
            { type: 'kitchen', label: 'Menu Board', emoji: '📋', top: '5%', left: '27%', w: '45%', h: '25%', color: 'yellow' },
            { type: 'entrance', label: 'Column', emoji: '🏛️', top: '0', left: '89%', w: '7%', h: '70%', color: 'amber' },
            { type: 'booth', label: "The Gang's Booth", emoji: '🍽️', bottom: '0', left: '10%', w: '80%', h: '28%', color: 'amber' }
        ],
        // bernie_house: Matches bg: nursery left:5% top:10% w:30% h:40%, kitchen right:5% top:10% w:35% h:38%, floor bottom:0 h:25%
        bernie_house: [
            { type: 'nursery', label: "Halley's Room", emoji: '👶', top: '10%', left: '5%', w: '30%', h: '40%', color: 'pink' },
            { type: 'kitchen', label: 'Kitchen', emoji: '🍰', top: '10%', left: '60%', w: '35%', h: '38%', color: 'emerald' },
            { type: 'living', label: 'Living Room', emoji: '🏠', bottom: '0', left: '0', w: '100%', h: '25%', color: 'sky' }
        ],
        // howards_house: Matches bg: kitchen left:3% top:8% w:50% h:42%, stairs right:5% top:10% w:22% h:55%, dining bottom:25% left:25% w:30% h:12%, floor bottom:0 h:22%
        howards_house: [
            { type: 'kitchen', label: "Ma's Kitchen", emoji: '🍳', top: '8%', left: '3%', w: '50%', h: '42%', color: 'amber' },
            { type: 'stairs', label: 'Stairs', emoji: '🪜', top: '10%', left: '73%', w: '22%', h: '55%', color: 'stone' },
            { type: 'garage', label: 'Dining Table', emoji: '🍝', bottom: '22%', left: '25%', w: '30%', h: '15%', color: 'slate' },
            { type: 'bedroom', label: 'Floor', emoji: '🏠', bottom: '0', left: '0', w: '100%', h: '22%', color: 'stone' }
        ],
        // rajs_apt: Matches bg: window left:8% top:5% w:28% h:50%, bar cart left:42% top:15% w:15% h:25%, telescope right:15% top:10% w:20% h:45%, cinnamon bottom:25% left:10% w:14% h:7%, floor bottom:0 h:22%
        rajs_apt: [
            { type: 'bar', label: 'Starry Window', emoji: '🌌', top: '5%', left: '8%', w: '28%', h: '50%', color: 'indigo' },
            { type: 'bookshelf', label: 'Bar Cart', emoji: '🍸', top: '15%', left: '42%', w: '15%', h: '25%', color: 'amber' },
            { type: 'telescope', label: 'Telescope', emoji: '🔭', top: '10%', left: '65%', w: '20%', h: '45%', color: 'purple' },
            { type: 'couch', label: "Cinnamon's Bed", emoji: '🐕', bottom: '25%', left: '10%', w: '14%', h: '7%', color: 'pink' },
            { type: 'couch', label: 'Floor', emoji: '🛋️', bottom: '0', left: '0', w: '100%', h: '22%', color: 'indigo' }
        ],
        // caltech: Matches bg: chalkboard left:8% top:8% w:84% h:38%, periodic table right:3% top:10%, lab bench bottom:0 h:30%
        caltech: [
            { type: 'board', label: 'Chalkboard', emoji: '📋', top: '8%', left: '8%', w: '84%', h: '38%', color: 'emerald' },
            { type: 'lab', label: 'Lab Equipment', emoji: '🔬', bottom: '0', left: '0', w: '100%', h: '30%', color: 'cyan' }
        ],
        // pasadena_museum: Matches bg: left column left:5%, right column right:5%, dino center top:8%, cases bottom area, floor bottom:0 h:20%
        pasadena_museum: [
            { type: 'exhibit', label: 'Dinosaur', emoji: '🦕', top: '8%', left: '22%', w: '55%', h: '50%', color: 'amber' },
            { type: 'planetarium', label: 'Fossils', emoji: '🦴', top: '60%', left: '15%', w: '18%', h: '15%', color: 'stone' },
            { type: 'gift_shop', label: 'Minerals', emoji: '💎', top: '60%', left: '67%', w: '18%', h: '15%', color: 'indigo' },
            { type: 'lobby', label: 'Lobby', emoji: '🏛️', bottom: '0', left: '0', w: '100%', h: '20%', color: 'stone' }
        ]
    };
    
    var locKey = state.currentLocation || 'sheldons_apt';
    var spots = hotspotDefs[locKey] || hotspotDefs['sheldons_apt'];
    
    for (var i = 0; i < spots.length; i++) {
        var spot = spots[i];
        
        // Color palette per theme
        var colorMap = {
            stone:  { border: '#a8a29e', bg: 'rgba(168,162,158,0.08)', glow: 'rgba(168,162,158,0.3)', text: '#d6d3d1' },
            purple: { border: '#a855f7', bg: 'rgba(168,85,247,0.08)',  glow: 'rgba(168,85,247,0.3)',  text: '#c084fc' },
            slate:  { border: '#94a3b8', bg: 'rgba(148,163,184,0.06)', glow: 'rgba(148,163,184,0.25)', text: '#cbd5e1' },
            amber:  { border: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  glow: 'rgba(245,158,11,0.3)',  text: '#fbbf24' },
            cyan:   { border: '#22d3ee', bg: 'rgba(34,211,238,0.06)',  glow: 'rgba(34,211,238,0.25)', text: '#67e8f9' },
            blue:   { border: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  glow: 'rgba(59,130,246,0.3)',  text: '#60a5fa' },
            red:    { border: '#ef4444', bg: 'rgba(239,68,68,0.08)',   glow: 'rgba(239,68,68,0.3)',   text: '#f87171' },
            emerald:{ border: '#10b981', bg: 'rgba(16,185,129,0.08)',  glow: 'rgba(16,185,129,0.3)',  text: '#34d399' },
            pink:   { border: '#ec4899', bg: 'rgba(236,72,153,0.08)', glow: 'rgba(236,72,153,0.3)',  text: '#f472b6' },
            rose:   { border: '#f43f5e', bg: 'rgba(244,63,94,0.08)',  glow: 'rgba(244,63,94,0.3)',   text: '#fb7185' },
            sky:    { border: '#0ea5e9', bg: 'rgba(14,165,233,0.06)', glow: 'rgba(14,165,233,0.25)', text: '#38bdf8' },
            yellow: { border: '#eab308', bg: 'rgba(234,179,8,0.08)',  glow: 'rgba(234,179,8,0.3)',   text: '#facc15' },
            indigo: { border: '#6366f1', bg: 'rgba(99,102,241,0.08)', glow: 'rgba(99,102,241,0.3)',  text: '#818cf8' },
            green:  { border: '#22c55e', bg: 'rgba(34,197,94,0.08)',  glow: 'rgba(34,197,94,0.3)',   text: '#4ade80' }
        };
        var c = colorMap[spot.color] || colorMap.slate;
        
        var div = document.createElement('div');
        div.style.cssText = 'position:absolute;cursor:pointer;border:1.5px dashed ' + c.border + ';border-radius:8px;transition:all 0.3s ease;display:flex;align-items:flex-end;justify-content:center;padding-bottom:4px;background:' + c.bg + ';backdrop-filter:blur(1px);';
        div.style.width = spot.w;
        div.style.height = spot.h;
        if (spot.top) div.style.top = spot.top;
        if (spot.bottom) div.style.bottom = spot.bottom;
        if (spot.left) div.style.left = spot.left;
        
        div.setAttribute('data-type', spot.type);
        div.setAttribute('data-label', spot.label);
        
        // Always-visible subtle label at bottom
        div.innerHTML = '<div style="background:rgba(0,0,0,0.75);color:' + c.text + ';font-size:9px;font-weight:700;padding:2px 8px;box-sizing:border-box;border-radius:4px;pointer-events:none;text-align:center;white-space:nowrap;border:1px solid ' + c.border + '40;backdrop-filter:blur(4px);letter-spacing:0.5px;transition:all 0.3s;">' + spot.emoji + ' ' + spot.label + '</div>';
        
        // Themed hover effects
        (function(element, colors) {
            element.onmouseenter = function() {
                this.style.background = colors.bg.replace('0.08', '0.18').replace('0.06', '0.15');
                this.style.borderColor = colors.border;
                this.style.borderStyle = 'solid';
                this.style.boxShadow = '0 0 15px ' + colors.glow + ', inset 0 0 20px ' + colors.glow.replace('0.3', '0.1');
                this.style.transform = 'scale(1.01)';
                this.firstChild.style.background = colors.border;
                this.firstChild.style.color = '#000';
                this.firstChild.style.transform = 'scale(1.05)';
            };
            element.onmouseleave = function() {
                this.style.background = colors.bg;
                this.style.borderColor = colors.border;
                this.style.borderStyle = 'dashed';
                this.style.boxShadow = 'none';
                this.style.transform = 'scale(1)';
                this.firstChild.style.background = 'rgba(0,0,0,0.75)';
                this.firstChild.style.color = colors.text;
                this.firstChild.style.transform = 'scale(1)';
            };
        })(div, c);
        
        div.onclick = function(e) {
            e.stopPropagation();
            // Click flash effect
            this.style.boxShadow = '0 0 30px ' + c.glow;
            var self = this;
            setTimeout(function() { self.style.boxShadow = 'none'; }, 300);
            hangoutAction(this.getAttribute('data-type'), e);
        };
        
        container.appendChild(div);
    }
}


function renderHangoutMapBrowser() {
    let container = document.getElementById('hangout-map-dropdown-container');
    if (container) container.remove();
    
    const arena = document.getElementById('arena');
    if (!arena) return;
    
    container = document.createElement('div');
    container.id = 'hangout-map-dropdown-container';
    container.style.cssText = 'position:absolute;top:10px;left:10px;z-index:65;width:250px;';
    arena.appendChild(container);
    
    var currentLoc = locations[state.currentLocation];
    var currentName = currentLoc ? currentLoc.name : state.currentLocation;
    
    // Dropdown toggle button
    var toggle = document.createElement('div');
    toggle.id = 'map-dropdown-toggle';
    toggle.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a);border:2px solid #334155;border-radius:8px;padding:8px 14px;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;box-shadow:0 4px 15px rgba(0,0,0,0.5);';
    toggle.innerHTML = '<div style="display:flex;align-items:center;gap:6px;">' +
        '<span style="font-size:14px;">📍</span>' +
        '<div><div style="font-size:7px;color:#64748b;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Current Location</div>' +
        '<div style="font-size:11px;font-weight:900;color:#34d399;">' + currentName + '</div></div></div>' +
        '<span id="map-dropdown-arrow" style="color:#94a3b8;font-size:10px;transition:transform 0.2s;">▼</span>';
    toggle.onclick = function(e) {
        e.stopPropagation();
        var list = document.getElementById('map-dropdown-list');
        var arrow = document.getElementById('map-dropdown-arrow');
        if (list.style.display === 'none') {
            list.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
            toggle.style.borderColor = '#fbbf24';
        } else {
            list.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
            toggle.style.borderColor = '#334155';
        }
    };
    toggle.onmouseenter = function() { this.style.borderColor = '#fbbf24'; };
    toggle.onmouseleave = function() { var list = document.getElementById('map-dropdown-list'); if (!list || list.style.display === 'none') this.style.borderColor = '#334155'; };
    container.appendChild(toggle);
    
    // Dropdown list
    var list = document.createElement('div');
    list.id = 'map-dropdown-list';
    list.style.cssText = 'display:none;margin-top:4px;background:#0f172a;border:2px solid #334155;border-radius:8px;max-height:350px;overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none;box-shadow:0 8px 25px rgba(0,0,0,0.6);';
    
    for (var i = 0; i < locationOrder.length; i++) {
        var locKey = locationOrder[i];
        var loc = locations[locKey];
        if (!loc) continue;
        
        var isUnlocked = state.unlockedLocations && state.unlockedLocations.indexOf(locKey) !== -1;
        var isCurrent = state.currentLocation === locKey;
        
        var item = document.createElement('div');
        item.style.cssText = 'padding:8px 12px;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:6px;border-bottom:1px solid #1e293b;transition:background 0.15s;' +
            (isUnlocked ? 'cursor:pointer;' : 'cursor:not-allowed;opacity:0.35;');
        
        if (isUnlocked && !isCurrent) {
            item.onmouseenter = function() { this.style.background = '#1e293b'; };
            item.onmouseleave = function() { this.style.background = 'transparent'; };
        }
        
        // Left side: name + info
        var leftSide = document.createElement('div');
        leftSide.style.cssText = 'flex:1;min-width:0;pointer-events:none;';
        
        var nameRow = document.createElement('div');
        nameRow.style.cssText = 'display:flex;align-items:center;gap:4px;';
        
        var nameEl = document.createElement('span');
        nameEl.style.cssText = 'font-size:10px;font-weight:800;color:' + (isCurrent ? '#34d399' : isUnlocked ? '#e2e8f0' : '#475569') + ';text-transform:uppercase;letter-spacing:0.3px;';
        nameEl.textContent = isUnlocked ? loc.name : '???';
        nameRow.appendChild(nameEl);
        
        if (isCurrent) {
            var hereBadge = document.createElement('span');
            hereBadge.style.cssText = 'font-size:6px;background:#065f46;color:#34d399;padding:1px 4px;box-sizing:border-box;border-radius:2px;border:1px solid #059669;font-weight:bold;';
            hereBadge.textContent = '⬤ HERE';
            nameRow.appendChild(hereBadge);
        }
        leftSide.appendChild(nameRow);
        
        if (isUnlocked) {
            var meta = document.createElement('div');
            meta.style.cssText = 'font-size:7px;color:#64748b;margin-top:1px;';
            meta.textContent = loc.desc + '  •  LV ' + loc.minDifficulty + '-' + loc.maxDifficulty;
            leftSide.appendChild(meta);
        }
        item.appendChild(leftSide);
        
        // Right side: button or lock
        if (isUnlocked && !isCurrent) {
            var btn = document.createElement('button');
            btn.style.cssText = 'font-size:7px;font-weight:bold;background:#1d4ed8;color:white;border:1px solid #3b82f6;padding:3px 8px;box-sizing:border-box;border-radius:4px;cursor:pointer;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;flex-shrink:0;';
            btn.textContent = 'GO';
            btn.setAttribute('data-loc', locKey);
            btn.onclick = function(e) {
                e.stopPropagation();
                var targetLoc = this.getAttribute('data-loc');
                switchLocation(targetLoc);
                toggleHangoutMode(null);
            };
            btn.onmouseenter = function() { this.style.background = '#2563eb'; };
            btn.onmouseleave = function() { this.style.background = '#1d4ed8'; };
            item.appendChild(btn);
        } else if (!isUnlocked) {
            var lockEl = document.createElement('span');
            lockEl.style.cssText = 'font-size:8px;color:#475569;flex-shrink:0;';
            lockEl.textContent = '🔒';
            item.appendChild(lockEl);
        }
        
        list.appendChild(item);
    }
    
    container.appendChild(list);
}

function hangoutAction(type, event) {
    if (event) event.stopPropagation();
    
    // Location-specific interactions with lore-accurate dialogue
    const locationInteractions = {
        sheldons_apt: {
            door: ["Knock knock knock, Penny!", "Knock knock knock, Penny!", "Knock knock knock, Penny!"],
            couch: ["That's MY spot. Nobody sits in my spot.", "Soft kitty, warm kitty, little ball of fur...", "I'm not crazy, my mother had me tested."],
            whiteboard: ["If you examine the equation, you'll see the flaw in string theory.", "E = mc²... no wait, that's too simple.", "I've just disproved Newton! ...No wait, it was a math error."],
            bookcase: ["Don't touch my collectibles! They're mint in box!", "My Flash action figure is signed by Jim Lee.", "These comics are worth more than your car, Leonard."],
            fridge: ["There's leftover Thai food from Tuesday.", "Sheldon's food schedule: Monday is Thai food.", "Who moved my yogurt?!"],
            desk: ["Working on my Nobel Prize acceptance speech.", "Physics doesn't care about your feelings.", "Bazinga!"]
        },
        pennys_apt: {
            door: ["Just come in, it's open! ...Wait, who are you?", "Leonard, is that you? I told you to knock!", "*opens door wearing Ugg boots*"],
            couch: ["Want some wine? I have... box wine.", "This is where I rehearse my auditions.", "Netflix and cheap wine. Living the dream!"],
            kitchen: ["I can make... cereal. Or toast. That's about it.", "Sheldon banned me from his kitchen after 'the incident'.", "Anyone want cheesecake? I brought leftovers!"],
            closet: ["Half of these are from my acting days.", "I have too many shoes. Said no one ever.", "Somewhere in here is Leonard's hoodie."],
            window: ["I can see into Sheldon's apartment from here!", "Pasadena sunsets are actually pretty nice.", "Is that Howard on the roof again?"]
        },
        comic_store: {
            counter: ["Welcome to the comic book store. No, we don't have WiFi.", "Stuart here. Business is... not great.", "Can I interest you in a slightly water-damaged Batman?"],
            shelf_left: ["New arrivals: Detective Comics #1000!", "Marvel or DC? Choose wisely.", "These vintage X-Men are practically giving themselves away."],
            shelf_right: ["Manga section. Don't judge me.", "Star Wars comics. The REAL canon.", "Graphic novels for the sophisticated reader."],
            standee: ["Cardboard Captain America watches over us all.", "Don't lean on the standee! It's load-bearing!", "We had a life-size Thor but Howard broke it."],
            table: ["D&D night is Wednesday. Bring your own dice.", "This is where dreams are rolled... literally.", "Last session, Sheldon's elf died. He cried."]
        },
        caltech: {
            lab: ["Don't touch the laser! It costs more than your house.", "Experimental physics at its finest.", "Someone left the particle accelerator on again."],
            desk: ["Tenure review coming up. Wish me luck.", "Published papers: 87. Friends: 4. Worth it.", "My whiteboard is bigger than Sheldon's."],
            hallway: ["The cafeteria is that way. Sloppy Joes today.", "Watch out for Kripke. He's on the warpath.", "Faculty parking is a battlefield."],
            vending: ["The machine ate my dollar again!", "Astronaut food? In a vending machine?", "Diet Coke is the fuel of science."],
            board: ["Department meeting at 3 PM. Ugh.", "Congratulations Dr. Cooper... again.", "Research grants available. Apply within."]
        },
        howards_house: {
            bedroom: ["This is where the magic happens. By magic I mean engineering.", "Ma! I'm working!", "My astronaut helmet is right there on the shelf."],
            kitchen: ["MA! WHERE'S MY FRUIT LOOPS?!", "The kitchen where Mrs. Wolowitz's legendary meals happened.", "Howard's froot loops... the breakfast of champions."],
            garage: ["The Mars Rover started here. Don't tell NASA.", "Robot parts everywhere. Watch your step.", "This is my workshop. Raj isn't allowed anymore."],
            stairs: ["MA! SOMEONE'S AT THE DOOR!", "These stairs have heard many arguments.", "Howard lived here way too long. Way. Too. Long."],
            toilet: ["DO NOT go in there. Trust me.", "Howard's belt buckle collection is in there. Don't ask.", "The bathroom of nightmares."]
        },
        rajs_apt: {
            telescope: ["You can see Jupiter's moons tonight!", "Astrophysics is romantic. Fight me.", "I discovered a comet once! ...They named it after a rat."],
            bar: ["I can talk to women now! ...mostly.", "Grasshoppers for everyone!", "My mixology skills are legendary."],
            couch: ["Cinnamon sleeps here. She's a princess.", "This is my Bollywood movie marathon spot.", "I cry during rom-coms. I'm not ashamed."],
            bookshelf: ["Astronomy texts and romance novels. A balanced library.", "My published papers on dark matter.", "Somewhere here is a love letter I never sent."],
            kitchen: ["I actually CAN cook. Indian food is my specialty.", "Tikka masala takes 3 hours but it's worth it.", "Howard ate all my naan again."]
        },
        bernie_house: {
            living: ["Bernadette's house rules: shoes off at the door!", "Don't mess with Bernie. Just don't.", "The dollhouse is for decoration, not playing!"],
            kitchen: ["I may be small but I make a mean pot roast.", "Howard! Did you eat the last cookie?!", "MY MOTHER TAUGHT ME TO COOK AND I AM GRATEFUL."],
            nursery: ["The baby room. Aww.", "Halley's room is organized by color. Don't rearrange.", "Howard is NOT allowed to build a robot nanny."],
            yard: ["The backyard where Howard's drone crashed.", "BBQ nights with the gang.", "Bernie's garden is surprisingly deadly. She grows habaneros."]
        },
        cheesecake_factory: {
            bar: ["Penny worked here for years. YEARS.", "One cheesecake please. Actually, make it two.", "The tips here aren't great but the stories are."],
            kitchen: ["The legendary Cheesecake Factory kitchen!", "Over 200 menu items. How do they do it?", "Someone ordered the avocado egg rolls again."],
            booth: ["This is the gang's booth. It's basically reserved.", "Every major life decision happened in this booth.", "The booth has seen things. Many things."],
            entrance: ["Welcome to The Cheesecake Factory!", "Party of 4? Right this way.", "No, Sheldon, you can't bring your own food."]
        },
        chocolate_factory: {
            conveyor: ["Don't eat the chocolate off the belt! ...okay, one piece.", "Quality control is very serious here.", "I Love Lucy vibes, anyone?"],
            vat: ["The chocolate vat. It's exactly what you think.", "Willy Wonka wishes he had this setup.", "Don't fall in. We lost an intern that way."],
            office: ["Factory manager's office. Keep out.", "Production quotas are... chocolatey.", "The break room has free samples!"],
            storage: ["Rows upon rows of chocolate.", "This is basically heaven.", "Temperature controlled to exactly 65°F."]
        },
        pasadena_museum: {
            exhibit: ["Ancient artifacts from around the world!", "Don't touch the dinosaur skeleton!", "This exhibit is worth millions. Please don't sneeze."],
            gift_shop: ["Museum gift shop: overpriced magnets and keychains.", "I got Sheldon a periodic table mug here.", "Astronaut ice cream! It's freeze-dried!"],
            planetarium: ["The planetarium show starts in 10 minutes.", "Raj cried during the last star show.", "The universe is beautiful and terrifying."],
            lobby: ["Welcome to the Pasadena Museum!", "School field trips every Tuesday.", "The acoustics in here are amazing. HELLO!"]
        },
        main_street: {
            street: ["Just your average Pasadena street.", "The bus stop where Sheldon waits precisely at 8:13 AM.", "California sunshine. Every. Single. Day."],
            shop: ["Local shops and cafes.", "Sheldon's barber is around the corner.", "Best comic shop is 3 blocks that way."],
            bench: ["A nice bench to sit and judge people.", "Penny jogs past here every morning.", "The pigeons here are aggressive."]
        }
    };
    
    var locKey = state.currentLocation || 'sheldons_apt';
    var locData = locationInteractions[locKey] || locationInteractions['sheldons_apt'];
    var quotes = locData[type] || ["Nothing interesting here.", "Just vibing.", "Bazinga!"];
    var msg = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Small cash bonus for exploring
    var val = Math.floor(Math.random() * 3) + 1;
    state.resources.money += val;
    
    // Create speech bubble
    var bubble = document.createElement('div');
    bubble.style.cssText = 'position:fixed;background:white;color:#1e293b;font-weight:bold;font-size:11px;padding:8px 12px;box-sizing:border-box;border:2px solid #334155;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:200;max-width:220px;line-height:1.3;pointer-events:none;animation:bubble-pop 0.3s ease-out;';
    bubble.style.left = event.clientX + 'px';
    bubble.style.top = (event.clientY - 60) + 'px';
    
    // Speech bubble tail
    bubble.innerHTML = msg + '<div style="font-size:8px;color:#059669;font-weight:bold;margin-top:3px;">+$' + val + '</div>' +
        '<div style="position:absolute;bottom:-8px;left:20px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid white;"></div>';
    
    document.body.appendChild(bubble);
    setTimeout(function() { if (bubble.parentNode) bubble.remove(); }, 2500);
    saveProgress();
    syncUI();
}

// AUDIO SETTINGS SYSTEM
function openSettingsModal(event) {
    if (event) event.stopPropagation();
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.remove('hidden');
    var _vBgm = document.getElementById('vol-bgm'); if (_vBgm) _vBgm.value = SoundManager.volumes.bgm;
    var _vScene = document.getElementById('vol-scene'); if (_vScene) _vScene.value = SoundManager.volumes.scene;
    var _vChar = document.getElementById('vol-char'); if (_vChar) _vChar.value = SoundManager.volumes.character;
    var _vBgmV = document.getElementById('vol-bgm-val'); if (_vBgmV) _vBgmV.innerText = Math.round(SoundManager.volumes.bgm * 100) + '%';
    var _vSceneV = document.getElementById('vol-scene-val'); if (_vSceneV) _vSceneV.innerText = Math.round(SoundManager.volumes.scene * 100) + '%';
    var _vCharV = document.getElementById('vol-char-val'); if (_vCharV) _vCharV.innerText = Math.round(SoundManager.volumes.character * 100) + '%';
    var nt = document.getElementById('notif-toggle');
    if (nt) nt.checked = state.notificationsEnabled !== false;
    var dt = document.getElementById('dmg-numbers-toggle');
    if (dt) dt.checked = state.showDmgNumbers !== false;
    var st = document.getElementById('settings-account-status');
    var cb = document.getElementById('settings-connect-btn');
    if (st) {
        if (typeof isGuest !== 'undefined' && isGuest) {
            st.textContent = 'Playing as Guest' + (state.guestName ? ' (' + state.guestName + ')' : '');
            st.className = 'text-[10px] font-bold text-orange-400 mb-2';
            if (cb) cb.classList.remove('hidden');
            var lb = document.getElementById('settings-logout-btn');
            if (lb) lb.classList.add('hidden');
        } else if (currentUser) {
            st.textContent = (currentUser.username || currentUser.email || 'Player');
            st.className = 'text-[10px] font-bold text-green-400 mb-2';
            if (cb) cb.classList.add('hidden');
            var lb = document.getElementById('settings-logout-btn');
            if (lb) lb.classList.remove('hidden');
        }
    }
}

async function logoutAccount() {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4 transition-opacity duration-300';
    
    const modal = document.createElement('div');
    modal.className = 'bg-slate-900/95 backdrop-blur-md border-2 border-red-900 max-w-sm w-full p-6 rounded-xl shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center transform transition-all scale-100';
    
    modal.innerHTML = `
        <div class="text-red-500 mb-4 flex justify-center"><svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></div>
        <h3 class="text-white font-black text-xl tracking-widest uppercase mb-2">System Logout</h3>
        <p class="text-gray-400 text-xs mb-8 leading-relaxed">Are you sure you want to log out?<br>You will need to log back in to access this account's cloud save.</p>
        <div class="flex gap-4 justify-center">
            <button id="logout-cancel-btn" class="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider border border-slate-600 transition-colors shadow-lg cursor-pointer">Cancel</button>
            <button id="logout-confirm-btn" class="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider border border-red-500 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer">Log Out</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    document.getElementById('logout-cancel-btn').onclick = () => {
        overlay.remove();
    };
    
    document.getElementById('logout-confirm-btn').onclick = async () => {
        overlay.remove();
        if (typeof db !== 'undefined' && db && typeof db.auth !== 'undefined') {
            await db.auth.signOut();
        }
        localStorage.clear();
        location.reload();
    };
}

function toggleNotifications(enabled) {
    state.notificationsEnabled = enabled;
    saveProgress();
    if (!enabled && typeof NotificationManager !== 'undefined') NotificationManager.cancelAll();
}

function toggleDmgNumbers(enabled) {
    state.showDmgNumbers = enabled;
    saveProgress();
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


function updateStreakDisplay() {
    var el = document.getElementById('kill-streak-display');
    if (!el) {
        var arena = document.getElementById('arena');
        if (!arena) return;
        el = document.createElement('div');
        el.id = 'kill-streak-display';
        el.style.cssText = 'position:absolute;top:28px;left:50%;translate:-50% 0;z-index:40;pointer-events:none;text-align:center;transition:all 0.3s;';
        arena.appendChild(el);
    }
    if (killStreak >= 3) {
        var streakColor = killStreak >= 20 ? '#ef4444' : killStreak >= 10 ? '#f59e0b' : killStreak >= 5 ? '#a855f7' : '#3b82f6';
        var streakSize = Math.min(16, 10 + killStreak * 0.3);
        var streakLabel = killStreak >= 20 ? 'GODLIKE!' : killStreak >= 15 ? 'UNSTOPPABLE!' : killStreak >= 10 ? 'DOMINATING!' : killStreak >= 7 ? 'RAMPAGE!' : killStreak >= 5 ? 'KILLING SPREE!' : 'COMBO!';
        el.innerHTML = '<div style="font-size:' + streakSize + 'px;font-weight:900;color:' + streakColor + ';text-shadow:0 0 10px ' + streakColor + ';letter-spacing:1px;">' + killStreak + 'x</div>' +
            '<div style="font-size:7px;font-weight:bold;color:' + streakColor + ';text-transform:uppercase;letter-spacing:0.5px;opacity:0.8;">' + streakLabel + '</div>';
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
        // Auto-fade after 2 seconds of no new kills
        if (window._streakFadeTimer) clearTimeout(window._streakFadeTimer);
        window._streakFadeTimer = setTimeout(function() {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.8)';
        }, 2000);
    } else {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.5)';
        if (window._streakFadeTimer) clearTimeout(window._streakFadeTimer);
    }
}

function calculateSynergies() {
    activeSynergies = { dmgMult: 1.0, robotSpeedMult: 1.0, foodMult: 1.0 };
    activeSynergyNames = [];
    
    const eq = state.equipped;
    if (!eq) return;
    
    if (eq.sheldon && eq.leonard && eq.penny) {
        activeSynergies.dmgMult += 0.5;
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
    
    // New TBBT Synergies
    if (eq.sheldon && eq.amy) {
        activeSynergies.dmgMult += 0.3;
        activeSynergyNames.push("💕 Shamy (+30% DMG)");
    }
    
    if (eq.leonard && eq.penny) {
        activeSynergies.hpMult = (activeSynergies.hpMult || 1.0) * 1.25;
        activeSynergyNames.push("💑 Lenny (+25% HP)");
    }
    
    if (eq.howard && eq.bernie) {
        activeSynergies.robotDmgMult = (activeSynergies.robotDmgMult || 1.0) * 1.4;
        activeSynergyNames.push("👨‍👩‍👦 The Wolowitz Family (Bots +40% DMG)");
    }
    
    if (eq.sheldon && eq.leonard) {
        activeSynergies.dmgReduction = (activeSynergies.dmgReduction || 0) + 0.15;
        activeSynergyNames.push("📝 Roommate Agreement (-15% DMG Taken)");
    }

    const container = document.getElementById('synergy-display');
    if (container) {
        if (activeSynergyNames.length > 0) {
            container.innerHTML = activeSynergyNames.map(n => `<span class="bg-purple-900/50 text-purple-300 border border-purple-500/50 px-2 py-0.5 rounded shadow whitespace-nowrap">${n}</span>`).join('');
            container.classList.remove('hidden');
            // Flash visible for 3s then auto-fade
            container.style.opacity = '1';
            if (window._synergyFadeTimer) clearTimeout(window._synergyFadeTimer);
            window._synergyFadeTimer = setTimeout(function() {
                container.style.opacity = '0';
            }, 3000);
        } else {
            container.innerHTML = '';
            container.style.opacity = '0';
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
    // SEQUENCE FIX: Check intro/tutorial status FIRST, before starting any game systems
    
    // === INIT BASIC SYSTEMS (safe to run before story/tutorial) ===
    if (typeof initDailyRewards === 'function') initDailyRewards();
    if (typeof initAchievements === 'function') initAchievements();
    if (typeof initQuests === 'function') initQuests();
    if (typeof initEquipment === 'function') initEquipment();
    if (typeof initEvents === 'function') initEvents();
    if (typeof initMinigames === 'function') initMinigames();
    if (typeof renderEventBanner === 'function') renderEventBanner();
    
    // === OFFLINE PROGRESS CHECK ===
    checkOfflineProgress();

    // === INITIALIZE FORMATION WITH EQUIPPED CHARACTERS (NEW PLAYER FIX) ===
    // If formation is empty but player has equipped characters, auto-place them
    initializeFormationWithEquipped();

    // === HIDE TITLE SCREEN ===
    const ts = document.getElementById('title-screen');
    if (ts) {
        ts.style.opacity = '0';
        setTimeout(() => {
            ts.remove();
        }, 1000);
    }

    // === DEFENSIVE: If player has REAL progress, skip intro/tutorial ===
    var leveledCount = 0;
    if (state.roster) {
        Object.keys(state.roster).forEach(function(k) { if (state.roster[k].level > 0) leveledCount++; });
    }
    var hasRealProgress = (state.wave > 1) || 
                          (state.stats && state.stats.totalKills > 5) || 
                          (leveledCount > 1);
    if (hasRealProgress) {
        if (!state.hasSeenIntro) {
            console.log('[ENGINE] Player has real progress (wave=' + state.wave + ', leveled=' + leveledCount + '), forcing hasSeenIntro=true');
            state.hasSeenIntro = true;
        }
        if (!state.tutorialComplete) {
            console.log('[ENGINE] Player has real progress, forcing tutorialComplete=true');
            state.tutorialComplete = true;
            state.tutorialSkipped = true;
        }
        if (typeof saveProgress === 'function') saveProgress();
    }

    // === SEQUENCE: STORY LORE → TUTORIAL → GAME ===
    // This function handles the complete sequence
    function proceedToGamePlay() {
        // All screens are dismissed, now start the game systems
        window.storySequenceActive = false;
        
        // Mark game as started — unlocks combat, damage popups, badges, etc.
        window.gameStarted = true;
        
        // Show bottom nav
        var bn = document.getElementById('bottom-nav');
        if (bn) bn.classList.remove('hidden');
        
        // Start BGM
        SoundManager.startBGM();
        
        // === START COMBAT SYSTEMS ===
        renderActiveBattleLine();
        renderRobotBattleLine();
        calculateSynergies();
        startAutomationEngines();
        startRobotAutomation();
        if (typeof startArenaAmbience === 'function') startArenaAmbience();
        
        // === RENDER COMBAT CONTROL STRIP ===
        renderSpeedToggle();
        renderMuteToggle();
        renderCombatLogToggle();
        renderQuickHealButton();
        
        // Trigger initial enemy spawn
        if (typeof spawnEnemy === 'function') spawnEnemy();
        
        // Enemy counter-attack interval
        if (window.enemyAttackInterval) clearInterval(window.enemyAttackInterval);
        window.enemyAttackInterval = setInterval(() => {
            if (!window.gameStarted) return;
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            var locIdx = typeof locations !== 'undefined' ? Object.keys(locations).indexOf(state.currentLocation) : 0;
            var locMult = locIdx > 0 ? Math.pow(1.5, locIdx) : 1;
            let enemyCounterDmg = Math.floor(5 * Math.pow(1.10, state.wave - 1) * locMult);
            if (typeof applyEnemyCounter === 'function') applyEnemyCounter(enemyCounterDmg);
        }, 2000);
    }

    // === STEP 1: STORY LORE (if new player) ===
    if (!state.hasSeenIntro) {
        console.log('[ENGINE] New player detected - showing story lore first');
        window.storySequenceActive = true;
        window._introCutscenePlaying = true;
        window._onIntroFinish = function() {
            console.log('[ENGINE] Story lore finished - proceeding to tutorial');
            window._introCutscenePlaying = false;
            
            // === STEP 2: TUTORIAL (if not yet completed) ===
            if (!state.tutorialComplete && !state.tutorialSkipped) {
                console.log('[ENGINE] Starting tutorial after story');
                window._onTutorialFinish = function() {
                    console.log('[ENGINE] Tutorial finished - starting game');
                    window._onTutorialFinish = null;
                    proceedToGamePlay();
                };
                if (typeof startTutorial === 'function') startTutorial(true);
            } else {
                console.log('[ENGINE] Tutorial already completed, going straight to game');
                proceedToGamePlay();
            }
        };
        playIntroCutscene();
    } 
    // === NO INTRO: Check for tutorial ===
    else if (!state.tutorialComplete && !state.tutorialSkipped) {
        console.log('[ENGINE] Player has seen intro - showing tutorial only');
        window.storySequenceActive = true;
        window._onTutorialFinish = function() {
            console.log('[ENGINE] Tutorial finished - starting game');
            window._onTutorialFinish = null;
            proceedToGamePlay();
        };
        // Small delay to ensure UI is ready
        setTimeout(() => {
            if (typeof startTutorial === 'function') startTutorial(true);
        }, 500);
    }
    // === NO INTRO, NO TUTORIAL: Go straight to game ===
    else {
        console.log('[ENGINE] Both story and tutorial already seen - starting game immediately');
        proceedToGamePlay();
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

    // Hide ALL game UI during cutscene — clean cinematic experience
    var cutsceneHideCSS = document.getElementById('cutscene-hide-ui');
    if (!cutsceneHideCSS) {
        cutsceneHideCSS = document.createElement('style');
        cutsceneHideCSS.id = 'cutscene-hide-ui';
        cutsceneHideCSS.textContent = [
            '#side-rail { display:none !important; }',
            '#bottom-nav { display:none !important; }',
            '#bottom-bar { display:none !important; }',
            '#res-pill { display:none !important; }',
            '#profile-box { display:none !important; }',
            '#boss-controls { display:none !important; }',
            '#quick-repair-container { display:none !important; }',
            '#more-menu-dropdown { display:none !important; }',
            '#combat-log-panel { display:none !important; }',
            '#game-modal-overlay { display:none !important; }',
            '.game-toast { display:none !important; }',
            '.game-alert-overlay { display:none !important; }',
            '.achievement-popup { display:none !important; }',
            '.badge-notification { display:none !important; }',
            '.codex-notification { display:none !important; }',
            '.evo-notification { display:none !important; }',
            '.quest-complete-banner { display:none !important; }',
            '#speed-toggle { display:none !important; }',
            '#mute-toggle { display:none !important; }',
            '#combat-log-toggle { display:none !important; }',
            '#quick-heal-btn { display:none !important; }',
            '#online-status-bar { display:none !important; }',
            '#arena { display:none !important; }',
        ].join('\n');
        document.head.appendChild(cutsceneHideCSS);
    }

    // Setup outdoor Pasadena night scene
    bg.innerHTML = '<div class="cutscene-outdoor-bg"><div class="cutscene-buildings"></div></div>';

    // Add skip button
    var skipBtn = document.createElement('div');
    skipBtn.className = 'cutscene-skip-btn';
    skipBtn.textContent = 'SKIP ▶▶';
    skipBtn.onclick = function(e) {
        e.stopPropagation();
        finishCutscene();
    };
    overlay.appendChild(skipBtn);

    // Tap hint
    var tapHint = document.createElement('div');
    tapHint.className = 'cutscene-tap-hint';
    tapHint.textContent = 'TAP TO CONTINUE';
    overlay.appendChild(tapHint);

    // Setup portal element (oval, red)
    portal.className = 'cutscene-portal-idle';
    portal.style.cssText = 'position:absolute;left:50%;top:40%;width:0;height:0;opacity:0;border-radius:45% 45% 50% 50%;z-index:5;pointer-events:none;';
    portal.innerHTML = '<div class="cutscene-portal-inner"></div>';

    // Add the 4 main characters
    var charPositions = [
        { key: 'sheldon', pos: 10 },
        { key: 'leonard', pos: 25 },
        { key: 'howard', pos: 40 },
        { key: 'raj', pos: 55 }
    ];
    charPositions.forEach(function(c, i) {
        var el = document.createElement('div');
        el.className = 'absolute bottom-[12%] cutscene-character-enter filter drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]';
        el.style.left = c.pos + '%';
        el.style.width = '12vh';
        el.style.height = '18vh';
        el.style.animationDelay = (i * 0.15) + 's';
        el.innerHTML = '<div class="character-vector-wrapper" style="width:100%;height:100%;transform-origin:bottom center;">' + getVectorFrame(c.key, false, 'idle') + '</div>';
        el.id = 'cutscene-char-' + c.key;
        stage.appendChild(el);
    });

    // Spawn smoke particles
    function spawnSmoke() {
        for (var s = 0; s < 12; s++) {
            var sm = document.createElement('div');
            sm.className = 'cutscene-smoke';
            sm.style.left = (40 + Math.random() * 20) + '%';
            sm.style.top = (30 + Math.random() * 20) + '%';
            sm.style.width = (30 + Math.random() * 60) + 'px';
            sm.style.height = sm.style.width;
            sm.style.setProperty('--sx', (Math.random() * 200 - 100) + 'px');
            sm.style.setProperty('--sy', (-50 - Math.random() * 150) + 'px');
            sm.style.animationDelay = (Math.random() * 0.5) + 's';
            effects.appendChild(sm);
        }
    }

    // Build map showcase scenes
    function buildMapScenes() {
        var mapScenes = [];
        if (typeof locationOrder !== 'undefined' && typeof locations !== 'undefined') {
            locationOrder.forEach(function(locKey) {
                var loc = locations[locKey];
                if (!loc) return;
                mapScenes.push({
                    key: locKey,
                    name: loc.name,
                    minions: (loc.minionPool || []).slice(0, 4),
                    bosses: (loc.bossPool || []).slice(0, 3)
                });
            });
        }
        return mapScenes;
    }

    var mapData = buildMapScenes();
    var currentMapIdx = 0;
    var currentScene = 0;

    // Clear any previous map showcase
    function clearMapScene() {
        var old = stage.querySelector('.cutscene-map-scene');
        if (old) {
            old.style.transition = 'opacity 0.4s';
            old.style.opacity = '0';
            setTimeout(function() { if (old.parentNode) old.remove(); }, 400);
        }
    }

    // Show a full-screen game-like map with enemies on it
    function showMapScene(mapInfo) {
        clearMapScene();

        var scene = document.createElement('div');
        scene.className = 'cutscene-map-scene';
        scene.style.cssText = 'position:absolute;inset:0;z-index:2;opacity:0;transition:opacity 0.5s;';

        // Actual map background from the game
        var mapBg = document.createElement('div');
        mapBg.style.cssText = 'position:absolute;inset:0;z-index:0;';
        if (typeof backgrounds !== 'undefined' && backgrounds[mapInfo.key]) {
            mapBg.innerHTML = backgrounds[mapInfo.key];
        } else {
            mapBg.innerHTML = '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#1a1a2e,#16213e);"></div>';
        }
        scene.appendChild(mapBg);

        // Dark overlay so enemies pop
        var darken = document.createElement('div');
        darken.style.cssText = 'position:absolute;inset:0;z-index:1;background:rgba(0,0,0,0.25);';
        scene.appendChild(darken);

        // Location name banner at top
        var banner = document.createElement('div');
        banner.style.cssText = 'position:absolute;top:8%;left:50%;transform:translateX(-50%);z-index:10;' +
            'background:rgba(0,0,0,0.7);border:1px solid #ff4444;border-radius:8px;padding:4px 16px;' +
            'font-family:"Press Start 2P",monospace;font-size:9px;color:#ff6b6b;text-align:center;' +
            'text-shadow:0 0 10px rgba(255,0,0,0.5);white-space:nowrap;';
        banner.innerHTML = '📍 ' + mapInfo.name;
        scene.appendChild(banner);

        // Place minion enemies on the right side (like real game)
        var minionContainer = document.createElement('div');
        minionContainer.style.cssText = 'position:absolute;right:5%;bottom:18%;z-index:5;display:flex;flex-direction:row;gap:4px;align-items:flex-end;';

        mapInfo.minions.forEach(function(mKey, mi) {
            var svg = (typeof getVectorFrame === 'function') ? (getVectorFrame(mKey, true, 'idle') || '') : '';
            if (!svg) svg = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="#ff4444"/></svg>';
            var mEl = document.createElement('div');
            mEl.style.cssText = 'width:10vh;height:14vh;max-width:80px;max-height:120px;opacity:0;transform:translateX(60px);' +
                'transition:all 0.5s cubic-bezier(0.25,1,0.5,1);' +
                'filter:drop-shadow(0 5px 10px rgba(255,0,0,0.4));';
            mEl.innerHTML = '<div style="width:100%;height:100%;transform:scaleX(-1);">' + svg + '</div>';
            minionContainer.appendChild(mEl);
            // Stagger entrance
            setTimeout(function() {
                mEl.style.opacity = '1';
                mEl.style.transform = 'translateX(0)';
            }, 100 + mi * 150);
        });
        scene.appendChild(minionContainer);

        // Place boss(es) — larger, center-right with red glow
        if (mapInfo.bosses && mapInfo.bosses.length > 0) {
            var bossContainer = document.createElement('div');
            bossContainer.style.cssText = 'position:absolute;right:25%;bottom:15%;z-index:6;display:flex;flex-direction:row;gap:8px;align-items:flex-end;';

            mapInfo.bosses.forEach(function(bKey, bi) {
                var bsvg = (typeof getVectorFrame === 'function') ? (getVectorFrame(bKey, true, 'idle') || '') : '';
                if (!bsvg) bsvg = '<svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill="#ff0000" rx="8"/></svg>';
                var bEl = document.createElement('div');
                bEl.style.cssText = 'width:14vh;height:20vh;max-width:120px;max-height:180px;opacity:0;transform:scale(0.5);' +
                    'transition:all 0.6s cubic-bezier(0.34,1.56,0.64,1);' +
                    'filter:drop-shadow(0 0 20px rgba(255,0,0,0.6)) drop-shadow(0 0 40px rgba(255,100,0,0.3));';
                bEl.innerHTML = '<div style="width:100%;height:100%;transform:scaleX(-1);">' + bsvg + '</div>';
                // Boss name label
                var bLabel = document.createElement('div');
                bLabel.style.cssText = 'position:absolute;bottom:-14px;left:50%;transform:translateX(-50%);' +
                    'font-family:"Press Start 2P",monospace;font-size:6px;color:#fbbf24;white-space:nowrap;' +
                    'text-shadow:0 0 5px rgba(0,0,0,0.8);background:rgba(0,0,0,0.6);padding:1px 4px;border-radius:3px;';
                bLabel.textContent = '👑 BOSS';
                bEl.appendChild(bLabel);
                bEl.style.position = 'relative';
                bossContainer.appendChild(bEl);
                setTimeout(function() {
                    bEl.style.opacity = '1';
                    bEl.style.transform = 'scale(1)';
                }, 400 + bi * 200);
            });
            scene.appendChild(bossContainer);
        }

        // ⚠️ INVASION overlay flash
        var invasionFlash = document.createElement('div');
        invasionFlash.style.cssText = 'position:absolute;top:20%;left:50%;transform:translateX(-50%);z-index:10;' +
            'font-family:"Press Start 2P",monospace;font-size:7px;color:#ff0000;letter-spacing:2px;' +
            'text-shadow:0 0 15px rgba(255,0,0,0.8);opacity:0;animation:tapBlink 1s ease-in-out infinite;';
        invasionFlash.textContent = '⚠️ INVADED ⚠️';
        setTimeout(function() { invasionFlash.style.opacity = '1'; }, 300);
        scene.appendChild(invasionFlash);

        stage.appendChild(scene);
        // Fade in
        requestAnimationFrame(function() {
            requestAnimationFrame(function() { scene.style.opacity = '1'; });
        });
    }

    // === SCENE DEFINITIONS ===
    var scenes = [
        // Scene 0: Bored in Pasadena
        function() {
            speakerEl.innerText = 'SHELDON';
            dialogEl.innerText = "I'm bored beyond measure. String theory has lost its appeal, video games feel trivial, and there's nothing on TV worth watching. We need something... extraordinary.";
        },
        // Scene 1: Howard's Idea
        function() {
            speakerEl.innerText = 'HOWARD';
            dialogEl.innerText = "What if we build a dimensional portal? I've got some leftover NASA parts in the garage. We could theoretically open a window to another dimension!";
        },
        // Scene 2: Building
        function() {
            speakerEl.innerText = 'RAJ';
            dialogEl.innerText = "Dude, that sounds incredibly dangerous... and incredibly cool! I'll calibrate the electromagnetic coils!";
            // Spark effects
            for (var sp = 0; sp < 5; sp++) {
                var spark = document.createElement('div');
                spark.className = 'cutscene-spark';
                spark.style.left = (40 + Math.random() * 20) + '%';
                spark.style.top = (50 + Math.random() * 20) + '%';
                spark.style.setProperty('--tx', (Math.random() * 100 - 50) + 'px');
                spark.style.setProperty('--ty', (Math.random() * -80) + 'px');
                spark.style.animationDelay = (sp * 0.15) + 's';
                effects.appendChild(spark);
                (function(s) { setTimeout(function() { if (s.parentNode) s.remove(); }, 1200); })(spark);
            }
        },
        // Scene 3: Leonard's warning
        function() {
            speakerEl.innerText = 'LEONARD';
            dialogEl.innerText = "Guys, I don't think this is going to actually work. The energy requirements alone would need a particle accelerator... but fine, let me route the laser array.";
            var laser = document.createElement('div');
            laser.className = 'cutscene-laser';
            laser.style.left = '25%';
            laser.style.top = '55%';
            effects.appendChild(laser);
            setTimeout(function() { if (laser.parentNode) laser.remove(); }, 600);
            SoundManager.playFX('shoot');
        },
        // Scene 4: THE PORTAL OPENS!
        function() {
            speakerEl.innerText = 'LEONARD';
            dialogEl.innerText = "Wait... it's actually working?! THAT'S IMPOSSIBLE! The energy signature is off the charts!";
            portal.className = 'cutscene-portal-idle cutscene-portal-open';
            portal.style.width = '120px';
            portal.style.height = '180px';
            portal.style.opacity = '1';
            SoundManager.playFX('shoot');
        },
        // Scene 5: Sheldon's warning
        function() {
            speakerEl.innerText = 'SHELDON';
            dialogEl.innerText = "The dimensional matrix is destabilizing! The energy feedback loop is cascading beyond critical mass! Everyone, GET BACK!";
            overlay.classList.add('screen-shake-active');
        },
        // Scene 6: THE EXPLOSION!
        function() {
            speakerEl.innerText = '💥';
            dialogEl.innerText = "*KABOOOOOM!* The portal erupts in a massive explosion, sending shockwaves across all of Pasadena! The sky cracks open and strange creatures begin pouring through rifts in reality!";
            portal.classList.remove('cutscene-portal-open');
            portal.classList.add('cutscene-portal-explode');
            // Flash
            var flash = document.createElement('div');
            flash.className = 'cutscene-flash';
            flash.style.cssText = 'position:absolute;inset:0;z-index:100;pointer-events:none;';
            effects.appendChild(flash);
            setTimeout(function() { if (flash.parentNode) flash.remove(); }, 1200);
            // Smoke
            spawnSmoke();
            SoundManager.playFX('explosion');
            setTimeout(function() { overlay.classList.remove('screen-shake-active'); }, 2000);
        },
        // Scene 7: Aftermath — hide characters, clear stage for map showcase
        function() {
            speakerEl.innerText = 'RAJ';
            dialogEl.innerText = "Oh no... oh no no no! Look! The explosion ripped open dimensional portals all across the city! Creatures from every universe are invading Pasadena!";
            portal.style.display = 'none';
            effects.innerHTML = '';
            // Hide the 4 characters temporarily for map showcase
            charPositions.forEach(function(c) {
                var el = document.getElementById('cutscene-char-' + c.key);
                if (el) el.style.display = 'none';
            });
        },
        // Scene 8+: Map showcases — dynamically inserted below
    ];

    // Add map showcase scenes — full screen with real backgrounds and enemies
    mapData.forEach(function(map, idx) {
        scenes.push(function() {
            speakerEl.innerText = '⚠️ INVASION ALERT';
            dialogEl.innerText = 'Enemies spotted at: ' + map.name + '!';
            showMapScene(map);
        });
    });

    // After all maps: clear map, bring characters back, Sheldon rallies
    scenes.push(function() {
        clearMapScene();
        // Restore outdoor background and show characters again
        bg.innerHTML = '<div class="cutscene-outdoor-bg"><div class="cutscene-buildings"></div></div>';
        charPositions.forEach(function(c) {
            var el = document.getElementById('cutscene-char-' + c.key);
            if (el) { el.style.display = ''; }
        });
        speakerEl.innerText = 'SHELDON';
        dialogEl.innerText = "This is our fault. WE caused this dimensional breach. As the smartest person in any room, I declare it our responsibility to fix this. We need to protect Pasadena... no, the entire WORLD!";
    });

    // Power-up discovery
    scenes.push(function() {
        speakerEl.innerText = 'LEONARD';
        dialogEl.innerText = "Wait... do you guys feel that? The explosion... it did something to us. I feel stronger. My hands are glowing!";
        // Add power-up glow to all characters
        charPositions.forEach(function(c) {
            var el = document.getElementById('cutscene-char-' + c.key);
            if (el) el.classList.add('cutscene-power-up');
        });
    });

    // Sheldon explains powers
    scenes.push(function() {
        speakerEl.innerText = 'SHELDON';
        dialogEl.innerText = "Fascinating! The dimensional energy has imbued us with extraordinary abilities! I appear to have gained a devastating energy blast with AOE critical splash. Howard, you're generating rocket projectiles from your hands!";
    });

    // Howard & Raj react
    scenes.push(function() {
        speakerEl.innerText = 'HOWARD';
        dialogEl.innerText = "I'm like Iron Man but with better hair! And Raj... dude, you're shooting some kind of continuous energy beam! It's getting MORE powerful the longer you focus it!";
    });

    // Final call to action
    scenes.push(function() {
        speakerEl.innerText = 'SHELDON';
        dialogEl.innerText = "Then it's decided. We created this mess, and we WILL clean it up. Gentlemen... it's time to save the world. BAZINGA!";
    });

    // End — fade out and start the game
    scenes.push(function() {
        overlay.style.transition = 'opacity 1.5s';
        overlay.style.opacity = '0';
        setTimeout(function() {
            overlay.classList.remove('flex');
            overlay.classList.add('hidden');
            overlay.style.opacity = '';
            overlay.style.transition = '';
            stage.innerHTML = '';
            effects.innerHTML = '';
            portal.innerHTML = '';
            portal.style = '';
            portal.className = '';
            bg.innerHTML = '';
            // Remove skip/tap buttons
            var sk = overlay.querySelector('.cutscene-skip-btn');
            if (sk) sk.remove();
            var th = overlay.querySelector('.cutscene-tap-hint');
            if (th) th.remove();
            
            state.hasSeenIntro = true;
            window._introCutscenePlaying = false;
            var hideCSS = document.getElementById('cutscene-hide-ui');
            if (hideCSS) hideCSS.remove();
            saveProgress();

            var container = document.getElementById('arena');
            if (container) {
                var targetBox = container.getBoundingClientRect();
                generateDamagePopup({
                    clientX: targetBox.left + (targetBox.width / 2),
                    clientY: targetBox.top + (targetBox.height / 2)
                }, "⚔️ SAVE THE WORLD!", false, true);
            }
        }, 1500);
    });

    // Finish helper (for skip)
    function finishCutscene() {
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(function() {
            overlay.classList.remove('flex');
            overlay.classList.add('hidden');
            overlay.style.opacity = '';
            overlay.style.transition = '';
            stage.innerHTML = '';
            effects.innerHTML = '';
            portal.innerHTML = '';
            portal.style = '';
            portal.className = '';
            bg.innerHTML = '';
            var sk = overlay.querySelector('.cutscene-skip-btn');
            if (sk) sk.remove();
            var th = overlay.querySelector('.cutscene-tap-hint');
            if (th) th.remove();
            state.hasSeenIntro = true;
            window._introCutscenePlaying = false;
            var hideCSS = document.getElementById('cutscene-hide-ui');
            if (hideCSS) hideCSS.remove();
            saveProgress();
            
            // === CALLBACK: Trigger next sequence step (tutorial or game) ===
            if (window._onIntroFinish && typeof window._onIntroFinish === 'function') {
                setTimeout(() => window._onIntroFinish(), 200);
            }
        }, 500);
    }

    // Start scene 0
    scenes[0]();

    // Click to advance
    overlay.onclick = function(e) {
        if (e.target.closest('.cutscene-skip-btn')) return;
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
            const baseMaxHp = Math.floor((config.baseHp || 100) * Math.pow(config.lane === 'front' ? 1.80 : 1.25, charLvl - 1));
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

window.executeRobotRepair = function(key) {
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
            const rModal = document.getElementById('robot-action-modal');
            if (rModal && !rModal.classList.contains('hidden') && typeof openRobotModal === 'function') {
                openRobotModal(null, key);
            }
        }
    }
};


// skillTreePaths — MOVED to prestige.js as PRESTIGE_PERK_BRANCHES
// The skill tree is now rendered by renderSkillTree() from prestige.js
// Legacy skillTreePaths kept as empty object for backward compatibility
var skillTreePaths = {};

function openPerksModal(event) {
    if (event) event.stopPropagation();
    var modal = document.getElementById('perks-modal');
    if (modal) modal.classList.remove('hidden');
    renderSkillTree();
}

function closePerksModal() {
    var modal = document.getElementById('perks-modal');
    if (modal) modal.classList.add('hidden');
}

function renderSkillTree() {
    // Delegate to prestige.js renderSkillTree if available
    if (window._prestigeRenderSkillTree) {
        window._prestigeRenderSkillTree();
        return;
    }
    // Fallback: show loading message
    var container = document.getElementById('skill-tree-container');
    if (container) container.innerHTML = '<div class="text-center text-gray-500 py-8">Loading skill tree...</div>';
}

function unlockSkillNode(nodeId, cost) {
    // Legacy — perk purchases now handled by prestige.js buyPrestigePerk()
}

function getSkillTreeEffects() {
    var effects = {
        lifestealPct: 0, antiHealPct: 0, dmgReduction: 0,
        foodHealBonus: 0, regenPct: 0, bernieBoost: 0,
        reflectPct: 0, critChance: 0, critMulti: 1.0,
        atkSpeedBonus: 0, bossTimerBonus: 0
    };
    // Legacy skill tree nodes (state.skillTree) — kept for backward compat
    if (state.skillTree) {
        // Old nodes were booleans keyed by id (ls1, al2, etc.)
        // No paths to iterate since skillTreePaths is now empty
    }
    // New prestige perk effects
    if (state.perks) {
        if (state.perks.critChance) effects.critChance += (Number(state.perks.critChance) || 0) * 0.03;
        if (state.perks.critDmg) effects.critMulti += (Number(state.perks.critDmg) || 0) * 0.15;
        if (state.perks.atkSpeed) effects.atkSpeedBonus += (Number(state.perks.atkSpeed) || 0) * 0.05;
        if (state.perks.dmgReduction) effects.dmgReduction += (Number(state.perks.dmgReduction) || 0) * 0.03;
        if (state.perks.healBoost) effects.foodHealBonus += (Number(state.perks.healBoost) || 0) * 0.10;
        if (state.perks.tankAura) effects.dmgReduction += (Number(state.perks.tankAura) || 0) * 0.05;
    }
    return effects;
}

// Duplicate calculateSynergies removed — single definition at line ~4501

// ============================================================
// EVOLUTION SKIN SYSTEM
// ============================================================

function checkEvolutionUnlock(charKey, newLevel) {
    if (typeof evolutionTiers === 'undefined') return;
    const charData = state.roster[charKey];
    if (!charData) return;
    
    // Ensure skin properties exist (for save compatibility)
    if (!charData.unlockedSkins) charData.unlockedSkins = ['default'];
    if (!charData.activeSkin) charData.activeSkin = 'default';
    
    for (const tier of evolutionTiers) {
        // Skip purchasable skins (like Prime) - must be bought, not auto-unlocked
        if (tier.purchasable) continue;
        if (newLevel >= tier.level && !charData.unlockedSkins.includes(tier.skinKey)) {
            charData.unlockedSkins.push(tier.skinKey);
            charData.activeSkin = tier.skinKey; // Auto-equip the new skin
            showEvolutionNotification(charKey, tier);
            saveProgress();
            syncUI();
        }
    }
}

function showEvolutionNotification(charKey, tier) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    const charName = characters[charKey] ? characters[charKey].name : charKey;
    const notif = document.createElement('div');
    notif.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 animate-fadeIn';
    notif.id = 'evo-notification';
    notif.innerHTML = `
        <div class="bg-gray-900 border-2 rounded-xl p-6 max-w-xs text-center shadow-2xl" style="border-color: ${tier.color}; animation: evoPopIn 0.4s ease-out;">
            <div class="text-4xl mb-3">${tier.icon}</div>
            <div class="text-xl font-black text-white mb-1">EVOLUTION UNLOCKED!</div>
            <div class="text-sm font-bold mb-3" style="color: ${tier.color}">${tier.theme}</div>
            <div class="w-20 h-24 mx-auto bg-black rounded-lg p-1 mb-3">
                ${getVectorFrameForSkin(charKey, tier.skinKey)}
            </div>
            <div class="text-gray-300 text-xs mb-4">${charName} reached Level ${tier.level}!<br>New skin available in Roster.</div>
            <button onclick="document.getElementById('evo-notification').remove()" 
                class="px-6 py-2 rounded-lg font-bold text-white cursor-pointer" style="background: ${tier.color}">AWESOME!</button>
        </div>
    `;
    document.body.appendChild(notif);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => { const el = document.getElementById('evo-notification'); if (el) el.remove(); }, 5000);
}

function getVectorFrameForSkin(charKey, skinKey) {
    var v;
    if (skinKey === 'default') {
        v = vectors[charKey];
    } else {
        var fullKey = charKey + '_' + skinKey;
        v = vectors[fullKey] || vectors[charKey];
    }
    if (!v) return '';
    if (typeof v === 'string') return v;
    return v.idle || '';
}

function openSkinSelector(charKey) {
    const charData = state.roster[charKey];
    const charConfig = characters[charKey];
    if (!charData || !charConfig) return;
    
    // Ensure skin properties exist
    if (!charData.unlockedSkins) charData.unlockedSkins = ['default'];
    if (!charData.activeSkin) charData.activeSkin = 'default';
    
    const modal = document.getElementById('skin-selector-modal');
    if (!modal) return;
    
    let skinsHTML = '';
    
    // Default skin
    const isDefaultActive = charData.activeSkin === 'default';
    skinsHTML += `
        <div onclick="selectSkin('${charKey}', 'default')" 
             class="cursor-pointer p-2 rounded-lg border-2 transition-all hover:scale-105 ${isDefaultActive ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-gray-700 bg-gray-900 hover:border-gray-500'}">
            <div class="w-14 h-20 mx-auto bg-black rounded p-0.5 mb-1">${getVectorFrameForSkin(charKey, 'default')}</div>
            <div class="text-[9px] font-bold text-center text-white">DEFAULT</div>
            <div class="text-[7px] text-center text-gray-400">Original</div>
            ${isDefaultActive ? '<div class="text-[7px] text-center text-emerald-400 font-bold mt-0.5">✓ ACTIVE</div>' : ''}
        </div>
    `;
    
    // Evolution skins
    if (typeof evolutionTiers !== 'undefined') {
        for (const tier of evolutionTiers) {
            const isUnlocked = charData.unlockedSkins.includes(tier.skinKey);
            const isActive = charData.activeSkin === tier.skinKey;
            const skinSvg = getVectorFrameForSkin(charKey, tier.skinKey);
            
            if (isUnlocked) {
                skinsHTML += `
                    <div onclick="selectSkin('${charKey}', '${tier.skinKey}')" 
                         class="cursor-pointer p-2 rounded-lg border-2 transition-all hover:scale-105 ${isActive ? 'shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'hover:border-gray-500'}"
                         style="border-color: ${isActive ? tier.color : '#374151'}; background: ${isActive ? tier.color + '20' : '#111827'}">
                        <div class="w-14 h-20 mx-auto bg-black rounded p-0.5 mb-1">${skinSvg}</div>
                        <div class="text-[9px] font-bold text-center" style="color: ${tier.color}">${tier.icon} ${tier.theme.split(' ')[0].toUpperCase()}</div>
                        <div class="text-[7px] text-center text-gray-400">Lv.${tier.level}</div>
                        ${isActive ? '<div class="text-[7px] text-center font-bold mt-0.5" style="color:' + tier.color + '">✓ ACTIVE</div>' : ''}
                    </div>
                `;
            } else if (tier.purchasable && tier.cost) {
                // Purchasable skin (Prime) - show BUY button
                const costText = Object.entries(tier.cost).map(([k,v]) => `${v} ${k === 'diamond' ? '💎' : k}`).join(', ');
                skinsHTML += `
                    <div class="p-2 rounded-lg border-2 border-amber-700 bg-gradient-to-b from-amber-950/60 to-gray-950 hover:border-amber-500 transition-all cursor-pointer"
                         onclick="buyPrimeSkin('${charKey}', '${tier.skinKey}')">
                        <div class="w-14 h-20 mx-auto bg-black rounded p-0.5 mb-1 relative" style="opacity:0.6;filter:saturate(0.5)">${skinSvg}</div>
                        <div class="text-[9px] font-bold text-center" style="color: ${tier.color}">${tier.icon} ${tier.theme.split(' ')[0].toUpperCase()}</div>
                        <div class="text-[8px] text-center text-amber-400 font-bold mt-0.5 bg-amber-950/50 rounded px-1 py-0.5">BUY ${costText}</div>
                    </div>
                `;
            } else {
                skinsHTML += `
                    <div class="p-2 rounded-lg border-2 border-gray-800 bg-gray-950">
                        <div class="w-14 h-20 mx-auto bg-black rounded p-0.5 mb-1 relative" style="opacity:0.35;filter:grayscale(1)">${skinSvg}</div>
                        <div style="position:relative;margin-top:-14px;margin-bottom:6px;text-align:center;font-size:16px;filter:none;opacity:1">🔒</div>
                        <div class="text-[9px] font-bold text-center text-gray-500">${tier.icon} LOCKED</div>
                        <div class="text-[7px] text-center text-gray-600">Reach Lv.${tier.level}</div>
                    </div>
                `;
            }
        }
    }
    
    modal.innerHTML = `
        <div class="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4" onclick="closeSkinSelector(event)">
            <div class="bg-gray-900 border-2 border-amber-500 rounded-xl max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl" onclick="event.stopPropagation()">
                <div class="p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <div class="text-lg font-black text-white">${charConfig.name}'s Skins</div>
                        <div class="text-[10px] text-gray-400">Select an evolution skin</div>
                    </div>
                    <button onclick="closeSkinSelector()" class="text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
                </div>
                <div class="p-4 grid grid-cols-3 gap-3">
                    ${skinsHTML}
                </div>
                <div class="p-3 border-t border-gray-800 text-center">
                    <div class="text-[8px] text-gray-500">Unlock new skins by leveling ${charConfig.name} to milestones (Lv.20, 40, 60, 80, 100)</div>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

// Buy a purchasable Prime skin with diamonds
function buyPrimeSkin(charKey, skinKey) {
    if (!state.roster[charKey]) return;
    const tier = evolutionTiers.find(t => t.skinKey === skinKey && t.purchasable);
    if (!tier || !tier.cost) return;
    
    // Check if already owned
    if (state.roster[charKey].unlockedSkins && state.roster[charKey].unlockedSkins.includes(skinKey)) {
        selectSkin(charKey, skinKey);
        return;
    }
    
    // Check cost
    const costType = Object.keys(tier.cost)[0];
    const costAmount = tier.cost[costType];
    const currency = state.resources ? (state.resources[costType] || 0) : 0;
    const canAfford = currency >= costAmount;
    const charName = characters[charKey]?.name || charKey;
    const skinSvg = typeof getVectorFrameForSkin === 'function' ? getVectorFrameForSkin(charKey, skinKey) : '';
    
    // Build the purchase confirmation modal
    let existing = document.getElementById('skin-purchase-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'skin-purchase-modal';
    modal.innerHTML = `
        <div class="fixed inset-0 bg-black/85 z-[250] flex items-center justify-center p-4" onclick="closeSkinPurchaseModal()" style="animation: fadeIn 0.2s ease-out">
            <div class="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black border-2 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden" 
                 onclick="event.stopPropagation()" 
                 style="border-color: ${canAfford ? '#d97706' : '#374151'}; animation: scaleIn 0.25s ease-out">
                
                <!-- Premium Header Glow -->
                <div class="absolute top-0 left-0 right-0 h-32 pointer-events-none" 
                     style="background: radial-gradient(ellipse at center top, ${tier.color}25 0%, transparent 70%)"></div>
                
                <!-- Close Button -->
                <button onclick="closeSkinPurchaseModal()" 
                        class="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-700 flex items-center justify-center text-sm z-10 cursor-pointer transition-colors">✕</button>
                
                <!-- Header -->
                <div class="relative pt-5 pb-3 text-center">
                    <div class="text-[10px] uppercase tracking-[3px] font-bold" style="color: ${tier.color}">${tier.icon} ${tier.theme}</div>
                    <div class="text-xl font-black text-white mt-1">${charName}</div>
                    <div class="text-[10px] text-gray-500 mt-0.5">Prime Skin Unlock</div>
                </div>
                
                <!-- Character Preview -->
                <div class="flex justify-center py-3">
                    <div class="relative">
                        <div class="absolute inset-0 rounded-xl" style="background: radial-gradient(circle, ${tier.color}15 0%, transparent 70%); transform: scale(1.5)"></div>
                        <div class="w-24 h-32 bg-black/60 rounded-xl border border-gray-700/50 p-1.5 relative backdrop-blur-sm" 
                             style="box-shadow: 0 0 30px ${tier.color}20, inset 0 0 20px ${tier.color}10">
                            ${skinSvg}
                        </div>
                        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
                             style="background: ${tier.color}; color: #000">Prime</div>
                    </div>
                </div>
                
                <!-- Price Display -->
                <div class="mx-6 mt-4 p-3 rounded-xl ${canAfford ? 'bg-amber-950/40 border border-amber-800/50' : 'bg-red-950/30 border border-red-800/40'}">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-[9px] uppercase tracking-wider ${canAfford ? 'text-amber-400/70' : 'text-red-400/70'} font-bold">Price</div>
                            <div class="text-lg font-black ${canAfford ? 'text-amber-300' : 'text-red-400'}">${costAmount.toLocaleString()} 💎</div>
                        </div>
                        <div class="text-right">
                            <div class="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Your Balance</div>
                            <div class="text-lg font-black ${canAfford ? 'text-white' : 'text-red-400'}">${currency.toLocaleString()} 💎</div>
                        </div>
                    </div>
                    ${!canAfford ? `<div class="text-[9px] text-red-400 mt-2 text-center font-bold">⚠️ Need ${(costAmount - currency).toLocaleString()} more diamonds</div>` : ''}
                </div>
                
                <!-- Action Buttons -->
                <div class="p-5 flex gap-3">
                    <button onclick="closeSkinPurchaseModal()" 
                            class="flex-1 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-bold transition-all cursor-pointer border border-gray-700">
                        Cancel
                    </button>
                    ${canAfford ? `
                        <button onclick="confirmPrimeSkinPurchase('${charKey}', '${skinKey}')" 
                                class="flex-1 py-2.5 rounded-xl text-black text-sm font-black transition-all cursor-pointer border-0 hover:scale-105 active:scale-95"
                                style="background: linear-gradient(135deg, #f59e0b, #d97706, #b45309); box-shadow: 0 4px 15px rgba(245,158,11,0.4)">
                            👑 PURCHASE
                        </button>
                    ` : `
                        <button disabled
                                class="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-600 text-sm font-bold border border-gray-700 cursor-not-allowed opacity-60">
                            🔒 Can't Afford
                        </button>
                    `}
                </div>
            </div>
        </div>
        <style>
            @keyframes scaleIn { from { opacity:0; transform:scale(0.9) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
            @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        </style>
    `;
    document.body.appendChild(modal);
}

function closeSkinPurchaseModal() {
    const modal = document.getElementById('skin-purchase-modal');
    if (modal) modal.remove();
}

function confirmPrimeSkinPurchase(charKey, skinKey) {
    closeSkinPurchaseModal();
    
    if (!state.roster[charKey]) return;
    const tier = evolutionTiers.find(t => t.skinKey === skinKey && t.purchasable);
    if (!tier || !tier.cost) return;
    
    const costType = Object.keys(tier.cost)[0];
    const costAmount = tier.cost[costType];
    const currency = state.resources ? (state.resources[costType] || 0) : 0;
    
    if (currency < costAmount) {
        if (typeof showToast === 'function') showToast(`Not enough ${costType === 'diamond' ? '💎 Diamonds' : costType}! Need ${costAmount}, have ${currency}.`, 'error');
        return;
    }
    
    // Deduct cost
    if (!state.resources) state.resources = {};
    state.resources[costType] = (state.resources[costType] || 0) - costAmount;
    
    // Unlock and equip
    if (!state.roster[charKey].unlockedSkins) state.roster[charKey].unlockedSkins = ['default'];
    state.roster[charKey].unlockedSkins.push(skinKey);
    state.roster[charKey].activeSkin = skinKey;
    
    saveProgress();
    if (typeof showToast === 'function') showToast(`${tier.icon} ${tier.theme} skin UNLOCKED for ${characters[charKey]?.name}!`, 'success');
    
    // Refresh UI
    openSkinSelector(charKey);
    renderActiveBattleLine();
    renderRosterGrid();
    syncUI();
}

function selectSkin(charKey, skinKey) {
    if (!state.roster[charKey]) return;
    if (!state.roster[charKey].unlockedSkins) state.roster[charKey].unlockedSkins = ['default'];
    
    // Only allow selection of unlocked skins
    if (skinKey !== 'default' && !state.roster[charKey].unlockedSkins.includes(skinKey)) return;
    
    state.roster[charKey].activeSkin = skinKey;
    saveProgress();
    
    // Refresh the skin selector and battle line
    openSkinSelector(charKey);
    renderActiveBattleLine();
    renderRosterGrid();
    syncUI();
}

function closeSkinSelector(event) {
    const modal = document.getElementById('skin-selector-modal');
    if (modal) modal.classList.add('hidden');
    // Refresh the character modal to show updated skin
    if (activeModalKey) openModal(null, activeModalKey);
}

// Ensure skin data exists on save load (backward compatibility)
function ensureSkinData() {
    if (!state || !state.roster) return;
    
    // Migrate: ensure all characters from config exist in roster (for new characters added after save)
    if (typeof characters !== 'undefined') {
        for (const key of Object.keys(characters)) {
            if (!state.roster[key]) {
                const cfg = characters[key];
                state.roster[key] = { level: 0, currentHp: cfg.baseHp || 100, maxHp: cfg.baseHp || 100, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] };
            }
        }
    }
    
    for (const key of Object.keys(state.roster)) {
        const char = state.roster[key];
        if (!char.activeSkin) char.activeSkin = 'default';
        if (!char.unlockedSkins) char.unlockedSkins = ['default'];
        
        // Auto-unlock skins based on current level
        if (typeof evolutionTiers !== 'undefined') {
            for (const tier of evolutionTiers) {
                // Skip purchasable skins (like Prime) - they must be bought, not auto-unlocked
                if (tier.purchasable) continue;
                if (char.level >= tier.level && !char.unlockedSkins.includes(tier.skinKey)) {
                    char.unlockedSkins.push(tier.skinKey);
                }
            }
        }
    }
}

// Helper: get highest evolution tier for a given level
function getCharacterEvoTier(level) {
    if (typeof evolutionTiers === 'undefined') return null;
    let highest = null;
    for (const tier of evolutionTiers) {
        // Skip purchasable skins from auto-equip logic
        if (tier.purchasable) continue;
        if (level >= tier.level) highest = tier;
    }
    return highest;
}


// MAP UNLOCK SYSTEM: Every 8 waves, unlock the next map
function checkMapUnlock(currentWave) {
    if (typeof locationOrder === 'undefined') return;
    if (!state.unlockedLocations) state.unlockedLocations = ['sheldons_apt'];
    
    // Calculate which map index should be unlocked: wave 8 = index 1, wave 16 = index 2, etc.
    var targetIndex = Math.floor(currentWave / 8);
    
    // Cap at max locations
    if (targetIndex >= locationOrder.length) return;
    
    var locKey = locationOrder[targetIndex];
    if (!locKey) return;
    
    // Era maps require the corresponding story to be seen first
    var locData = locations[locKey];
    if (locData && locData.era === 'young_sheldon' && !state.story_wave80_seen) return;
    if (locData && locData.era === 'multiverse' && !state.story_wave150_seen) return;
    if (locData && locData.era === 'genesis' && !state.story_wave250_seen) return;
    
    // Already unlocked?
    if (state.unlockedLocations.includes(locKey)) return;
    
    // Unlock it!
    state.unlockedLocations.push(locKey);
    saveProgress();
    
    // Show celebration modal
    if (locData) {
        showMapUnlockModal(locData.name, locData.desc, locKey);
    }
}

// Show map unlock celebration modal
function showMapUnlockModal(mapName, mapDesc, locKey) {
    // Remove any existing unlock modal
    var existing = document.getElementById('map-unlock-modal');
    if (existing) existing.remove();
    
    var modal = document.createElement('div');
    modal.id = 'map-unlock-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.8);animation:fadeIn 0.3s ease;';
    
    modal.innerHTML = `
        <div style="text-align:center;animation:mapUnlockBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);max-width:380px;width:90%;box-sizing:border-box;max-height:90vh;overflow-y:auto;padding:0;">
            <div style="background:linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);border:3px solid #f59e0b;border-radius:16px;padding:32px 24px;box-sizing:border-box;box-shadow:0 0 60px rgba(245,158,11,0.4), inset 0 0 30px rgba(245,158,11,0.1);position:relative;overflow:hidden;">
                
                <!-- Sparkle overlay -->
                <div style="position:absolute;inset:0;background:radial-gradient(circle at 30% 20%, rgba(255,215,0,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,215,0,0.1) 0%, transparent 50%);pointer-events:none;"></div>
                
                <!-- NEW MAP badge -->
                <div style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;font-size:11px;font-weight:900;letter-spacing:3px;padding:4px 16px;box-sizing:border-box;border-radius:20px;display:inline-block;margin-bottom:16px;text-transform:uppercase;box-shadow:0 0 20px rgba(245,158,11,0.5);">🗺️ NEW MAP UNLOCKED!</div>
                
                <!-- Map icon floating -->
                <div style="font-size:64px;margin:12px 0;animation:mapFloat 2s ease-in-out infinite;">🏛️</div>
                
                <!-- Map name -->
                <div style="font-size:22px;font-weight:900;color:#f59e0b;letter-spacing:2px;text-transform:uppercase;margin:8px 0;text-shadow:0 0 20px rgba(245,158,11,0.5);">${mapName}</div>
                
                <!-- Map description -->
                <div style="font-size:11px;color:#94a3b8;margin:8px 0 20px;line-height:1.5;">${mapDesc}</div>
                
                <!-- Travel button -->
                <button onclick="switchLocation('${locKey}');closeMapUnlockModal();" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;font-weight:900;font-size:12px;padding:10px 28px;box-sizing:border-box;border:2px solid #fbbf24;border-radius:8px;cursor:pointer;letter-spacing:2px;text-transform:uppercase;box-shadow:0 0 15px rgba(245,158,11,0.4);margin:0 8px;transition:all 0.2s;">⚡ TRAVEL NOW</button>
                <button onclick="closeMapUnlockModal()" style="background:transparent;color:#64748b;font-weight:bold;font-size:11px;padding:10px 20px;box-sizing:border-box;border:1px solid #334155;border-radius:8px;cursor:pointer;letter-spacing:1px;text-transform:uppercase;margin:0 8px;transition:all 0.2s;">LATER</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add CSS animation if not present
    if (!document.getElementById('map-unlock-styles')) {
        var style = document.createElement('style');
        style.id = 'map-unlock-styles';
        style.textContent = `
            @keyframes mapUnlockBounce {
                0% { transform: scale(0.3) rotate(-5deg); opacity: 0; }
                50% { transform: scale(1.05) rotate(1deg); }
                100% { transform: scale(1) rotate(0); opacity: 1; }
            }
            @keyframes mapFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-12px); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function closeMapUnlockModal() {
    var modal = document.getElementById('map-unlock-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        setTimeout(function() { modal.remove(); }, 300);
    }
}


// PLAYER PROFILE MODAL
function openPlayerProfileModal() {
    var existing = document.getElementById('player-profile-modal');
    if (existing) existing.remove();
    
    var playerName = isGuest ? (state.guestName || 'Guest Player') : (currentUser && currentUser.username ? currentUser.username : 'Unknown');
    var totalChars = 0;
    var maxLevel = 0;
    for (var k in state.roster) {
        if (state.roster[k] && state.roster[k].level > 0) {
            totalChars++;
            if (state.roster[k].level > maxLevel) maxLevel = state.roster[k].level;
        }
    }
    var totalBots = 0;
    if (state.robotRoster) {
        for (var rk in state.robotRoster) {
            if (state.robotRoster[rk] && state.robotRoster[rk].level > 0) totalBots++;
        }
    }
    var unlockedMaps = state.unlockedLocations ? state.unlockedLocations.length : 1;
    var currentMap = 'Unknown';
    if (state.currentLocation && typeof locations !== 'undefined' && locations[state.currentLocation]) {
        currentMap = locations[state.currentLocation].name;
    }
    
    // Name change section (online players only, one-time)
    var hasChangedName = state.hasChangedNameV2 || false;
    var nameChangeHtml = '';
    if (!isGuest) {
        if (hasChangedName) {
            nameChangeHtml = '<div style="font-size:7px;color:#64748b;margin-top:4px;">✅ Name already changed (one-time only)</div>';
        } else {
            nameChangeHtml = '<button onclick="showNameChangeInput()" id="rename-trigger-btn" style="margin-top:6px;background:none;border:1px solid #334155;color:#94a3b8;font-size:8px;padding:4px 10px;box-sizing:border-box;border-radius:6px;cursor:pointer;letter-spacing:1px;">✏️ CHANGE NAME (1x)</button>' +
                '<div id="rename-input-area" style="display:none;margin-top:8px;">' +
                    '<div style="display:flex;gap:4px;">' +
                        '<input type="text" id="new-name-input" placeholder="New username" maxlength="20" style="flex:1;background:#1e293b;border:1px solid #334155;color:#fff;padding:6px 8px;box-sizing:border-box;border-radius:6px;font-size:10px;outline:none;" />' +
                        '<button onclick="submitNameChange()" style="background:#16a34a;color:#fff;font-size:9px;font-weight:bold;padding:6px 10px;box-sizing:border-box;border:1px solid #22c55e;border-radius:6px;cursor:pointer;">SAVE</button>' +
                    '</div>' +
                    '<div id="rename-error" style="color:#f87171;font-size:8px;margin-top:4px;display:none;"></div>' +
                '</div>';
        }
    }
    
    var overlay = document.createElement('div');
    overlay.id = 'player-profile-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.8);padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    
    overlay.innerHTML = '<div style="background:linear-gradient(135deg,#0f172a,#1e293b);border:2px solid #f59e0b;border-radius:16px;padding:24px;max-width:360px;width:100%;box-sizing:border-box;max-height:90vh;overflow-y:auto;box-shadow:0 0 40px rgba(245,158,11,0.3);position:relative;">' +
        '<button onclick="document.getElementById(\'player-profile-modal\').remove()" style="position:absolute;top:8px;right:12px;color:#64748b;font-size:20px;cursor:pointer;background:none;border:none;font-weight:bold;">\u00D7</button>' +
        
        '<div style="text-align:center;margin-bottom:20px;">' +
            '<div style="width:64px;height:64px;border-radius:12px;border:3px solid #f59e0b;background:linear-gradient(135deg,#1e3a5f,#0f172a);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(245,158,11,0.3);">' +
                '<span style="font-size:32px;">👤</span>' +
            '</div>' +
            '<div style="font-size:18px;font-weight:900;color:#f59e0b;letter-spacing:2px;" id="profile-display-name">' + playerName + '</div>' +
            '<div style="font-size:9px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:2px;">' + (isGuest ? 'GUEST ACCOUNT' : 'ONLINE PLAYER') + '</div>' +
            nameChangeHtml +
        '</div>' +
        
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">' +
            '<div style="background:rgba(30,58,138,0.3);border:1px solid #1e3a8a;border-radius:8px;padding:10px;text-align:center;">' +
                '<div style="font-size:18px;font-weight:900;color:#60a5fa;">' + state.wave + '</div>' +
                '<div style="font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Episode</div>' +
            '</div>' +
            '<div style="background:rgba(234,179,8,0.15);border:1px solid #92400e;border-radius:8px;padding:10px;text-align:center;">' +
                '<div style="font-size:18px;font-weight:900;color:#fbbf24;">' + (state.score || 0).toLocaleString() + '</div>' +
                '<div style="font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">IQ Score</div>' +
            '</div>' +
            '<div style="background:rgba(16,185,129,0.15);border:1px solid #065f46;border-radius:8px;padding:10px;text-align:center;">' +
                '<div style="font-size:18px;font-weight:900;color:#34d399;">' + totalChars + '</div>' +
                '<div style="font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">The Gang</div>' +
            '</div>' +
            '<div style="background:rgba(168,85,247,0.15);border:1px solid #6b21a8;border-radius:8px;padding:10px;text-align:center;">' +
                '<div style="font-size:18px;font-weight:900;color:#c084fc;">' + maxLevel + '</div>' +
                '<div style="font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Max Level</div>' +
            '</div>' +
        '</div>' +
        
        '<div style="background:rgba(0,0,0,0.3);border:1px solid #334155;border-radius:8px;padding:10px;margin-bottom:12px;">' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:6px;">' +
                '<span style="font-size:9px;color:#94a3b8;">\u{1F5FA}\uFE0F Current Map</span>' +
                '<span style="font-size:9px;color:#4ade80;font-weight:bold;">' + currentMap + '</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:6px;">' +
                '<span style="font-size:9px;color:#94a3b8;">\u{1F513} Maps Unlocked</span>' +
                '<span style="font-size:9px;color:#60a5fa;font-weight:bold;">' + unlockedMaps + '/' + (typeof locationOrder !== 'undefined' ? locationOrder.length : 16) + '</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:6px;">' +
                '<span style="font-size:9px;color:#94a3b8;">\u{1F916} Robots Built</span>' +
                '<span style="font-size:9px;color:#f472b6;font-weight:bold;">' + totalBots + '</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;">' +
                '<span style="font-size:9px;color:#94a3b8;">\u{1F4B0} Money</span>' +
                '<span style="font-size:9px;color:#4ade80;font-weight:bold;">$' + (state.resources.money || 0).toLocaleString() + '</span>' +
            '</div>' +
        '</div>' +
        
        (isGuest ? '<button onclick="showConnectPrompt();document.getElementById(\'player-profile-modal\').remove();" style="width:100%;background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;font-weight:900;font-size:11px;padding:10px;border:2px solid #fbbf24;border-radius:8px;cursor:pointer;text-transform:uppercase;letter-spacing:2px;">\u{1F517} Connect Account</button>' : '') +
    '</div>';
    
    document.body.appendChild(overlay);
}

function showNameChangeInput() {
    var btn = document.getElementById('rename-trigger-btn');
    var area = document.getElementById('rename-input-area');
    if (btn) btn.style.display = 'none';
    if (area) area.style.display = 'block';
}

async function submitNameChange() {
    var input = document.getElementById('new-name-input');
    var errEl = document.getElementById('rename-error');
    if (!input) return;
    var newName = input.value.trim();
    
    if (!newName || newName.length < 3) {
        if (errEl) { errEl.textContent = 'Name must be at least 3 characters'; errEl.style.display = 'block'; }
        return;
    }
    if (newName.length > 20) {
        if (errEl) { errEl.textContent = 'Name must be 20 characters or less'; errEl.style.display = 'block'; }
        return;
    }
    
    try {
        // Update in Supabase
        if (typeof db !== 'undefined' && db && currentUser) {
            const { error: err1 } = await db.from('profiles').upsert({ id: currentUser.id, username: newName });
            const { error: err2 } = await db.from('leaderboard').update({ username: newName }).eq('id', currentUser.id);
            const { error: err3 } = await db.from('guild_members').update({ username: newName }).eq('user_id', currentUser.id);
            if (err1) console.error('Profile update failed:', err1);
            if (err2) console.error('Leaderboard update failed:', err2);
            if (err3) console.error('Guild member update failed:', err3);
        }
        
        currentUser.username = newName;
        state.hasChangedNameV2 = true;
        saveProgress();
        updateOnlineStatus();
        
        // Update display in modal
        var nameEl = document.getElementById('profile-display-name');
        if (nameEl) nameEl.textContent = newName;
        
        // Replace input area with success
        var area = document.getElementById('rename-input-area');
        if (area) area.innerHTML = '<div style="color:#4ade80;font-size:8px;margin-top:4px;">✅ Name changed to ' + newName + '!</div>';
    } catch (e) {
        if (errEl) { errEl.textContent = 'Failed: ' + e.message; errEl.style.display = 'block'; }
    }
}

// ============================================
// OFFLINE PROGRESS / AFK REWARDS
// ============================================
function checkOfflineProgress() {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    if (!state.lastOnlineTimestamp) return;
    const now = Date.now();
    const elapsed = now - state.lastOnlineTimestamp;
    const minElapsed = 60 * 1000; // 1 minute minimum
    const maxElapsed = 8 * 60 * 60 * 1000; // 8 hours max
    
    if (elapsed < minElapsed) return;
    
    const cappedElapsed = Math.min(elapsed, maxElapsed);
    const minutes = Math.floor(cappedElapsed / 60000);
    
    // Calculate rewards based on wave and location
    const moneyPerMin = Math.floor(state.wave * 2);
    const stonePerMin = Math.max(0, Math.floor(state.wave * 0.3));
    const ironPerMin = Math.max(0, Math.floor(state.wave * 0.15));
    const scrapPerMin = Math.max(0, Math.floor(state.wave * 0.2));
    const goldChance = state.wave > 10 ? Math.floor(minutes * 0.05 * (state.wave / 10)) : 0;
    
    const rewards = {
        money: moneyPerMin * minutes,
        stone: stonePerMin * minutes,
        iron: ironPerMin * minutes,
        scrap: scrapPerMin * minutes,
        gold: goldChance
    };
    
    // Apply rewards
    state.resources.money += rewards.money;
    state.resources.stone += rewards.stone;
    state.resources.iron += rewards.iron;
    state.resources.scrap += rewards.scrap;
    state.resources.gold += rewards.gold;
    if (state.stats) state.stats.moneyEarned += rewards.money;
    
    // Show Welcome Back modal
    showOfflineRewardsModal(minutes, rewards);
    saveProgress();
}

function showOfflineRewardsModal(minutes, rewards) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    
    let modal = document.getElementById('offline-rewards-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'offline-rewards-modal';
        modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-[350] p-4';
        document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
    
    let rewardLines = '';
    if (rewards.money > 0) rewardLines += `<div class="flex justify-between"><span class="text-gray-400">💵 Money</span><span class="text-amber-400 font-bold">+$${rewards.money.toLocaleString()}</span></div>`;
    if (rewards.stone > 0) rewardLines += `<div class="flex justify-between"><span class="text-gray-400">🪨 Stone</span><span class="text-gray-300 font-bold">+${rewards.stone}</span></div>`;
    if (rewards.iron > 0) rewardLines += `<div class="flex justify-between"><span class="text-gray-400">⚙️ Iron</span><span class="text-gray-300 font-bold">+${rewards.iron}</span></div>`;
    if (rewards.scrap > 0) rewardLines += `<div class="flex justify-between"><span class="text-gray-400">🔩 Scrap</span><span class="text-gray-300 font-bold">+${rewards.scrap}</span></div>`;
    if (rewards.gold > 0) rewardLines += `<div class="flex justify-between"><span class="text-gray-400">🥇 Gold</span><span class="text-amber-300 font-bold">+${rewards.gold}</span></div>`;
    
    modal.innerHTML = `
    <div class="bg-slate-900/95 backdrop-blur-md border border-amber-500/40 max-w-sm w-full p-6 rounded-xl shadow-[0_0_60px_rgba(251,191,36,0.2)] text-center">
        <div class="text-4xl mb-3">👋</div>
        <h2 class="text-lg font-black text-amber-400 uppercase tracking-wider mb-1">Welcome Back!</h2>
        <p class="text-[10px] text-gray-500 mb-4">You were away for <span class="text-white font-bold">${timeStr}</span></p>
        <div class="bg-slate-800/60 rounded-lg p-3 border border-gray-700/50 mb-4 text-[11px] space-y-1.5">
            <div class="text-gray-500 text-[8px] uppercase font-bold tracking-wider mb-2">AFK Earnings</div>
            ${rewardLines}
        </div>
        <button onclick="document.getElementById('offline-rewards-modal').style.display='none'" class="px-6 py-2 rounded-lg bg-gradient-to-b from-amber-500 to-amber-700 text-white font-bold text-sm uppercase tracking-wider cursor-pointer border-2 border-amber-400 hover:from-amber-400 hover:to-amber-600 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            COLLECT
        </button>
    </div>`;
}

// ============================================
// COMBAT CONTROLS STRIP — Unified bar above bottom nav
// ============================================
function ensureCombatStrip() {
    var strip = document.getElementById('combat-controls-strip');
    if (!strip) {
        strip = document.createElement('div');
        strip.id = 'combat-controls-strip';
        strip.className = 'flex items-center gap-2 justify-end flex-wrap';
        strip.style.cssText = 'position:absolute;top:40px;right:4px;z-index:49;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:4px 6px;pointer-events:auto;';
        var arena = document.getElementById('arena');
        if (arena) {
            arena.parentElement.appendChild(strip);
        }
    }
    return strip;
}

function renderAutoBossToggle() {
    let btn = document.getElementById('auto-boss-toggle');
    if (!btn) {
        var strip = ensureCombatStrip();
        if (!strip) return;
        btn = document.createElement('button');
        btn.id = 'auto-boss-toggle';
        btn.className = 'text-[10px] sm:text-xs font-bold px-2 py-1 rounded cursor-pointer transition-all';
        btn.onclick = toggleAutoBoss;
        strip.appendChild(btn);
    }
    const active = state.autoBoss;
    btn.className = `text-[10px] sm:text-xs font-bold px-2 py-1 rounded cursor-pointer transition-all ${active ? 'bg-emerald-600/80 text-white' : 'bg-slate-800/80 text-gray-500'}`;
    btn.textContent = active ? '🤖 AUTO' : '🤖 OFF';
}

function toggleAutoBoss() {
    state.autoBoss = !state.autoBoss;
    renderAutoBossToggle();
    saveProgress();
}

// ============================================
// BATTLE SPEED TOGGLE
// ============================================
function renderSpeedToggle() {
    if (state.wave < 30) return;
    let btn = document.getElementById('speed-toggle');
    if (!btn) {
        var strip = ensureCombatStrip();
        if (!strip) return;
        btn = document.createElement('button');
        btn.id = 'speed-toggle';
        btn.onclick = toggleBattleSpeed;
        strip.appendChild(btn);
    }
    const speed = state.battleSpeed || 1;
    const colors = { 1: 'bg-slate-800/80 text-gray-400', 2: 'bg-blue-600/80 text-white', 3: 'bg-purple-600/80 text-white' };
    btn.className = `text-[10px] sm:text-xs font-bold px-2 py-1 rounded cursor-pointer transition-all ${colors[speed] || colors[1]}`;
    btn.textContent = `⚡ ${speed}x`;
}

function toggleBattleSpeed() {
    const speeds = [1, 2, 3];
    const current = state.battleSpeed || 1;
    const nextIdx = (speeds.indexOf(current) + 1) % speeds.length;
    state.battleSpeed = speeds[nextIdx];
    renderSpeedToggle();
    
    // Restart automation with new speed
    if (typeof startAutomationEngines === 'function') startAutomationEngines();
    if (typeof startRobotAutomation === 'function') startRobotAutomation();
    saveProgress();
}

function getSpeedMultiplier() {
    return state.battleSpeed || 1;
}

// ============================================
// QUICK MUTE TOGGLE
// ============================================
function renderMuteToggle() {
    let btn = document.getElementById('mute-toggle');
    if (!btn) {
        var strip = ensureCombatStrip();
        if (!strip) return;
        btn = document.createElement('button');
        btn.id = 'mute-toggle';
        btn.onclick = toggleMute;
        strip.appendChild(btn);
    }
    const muted = state.muted || false;
    if (muted) {
        btn.className = 'text-[10px] sm:text-xs font-bold px-2 py-1 rounded cursor-pointer transition-all bg-red-900/80 text-white';
        btn.textContent = '🔇';
    } else {
        btn.className = 'text-[10px] sm:text-xs font-bold px-2 py-1 rounded cursor-pointer transition-all bg-slate-800/80 text-gray-400';
        btn.textContent = '🔊';
    }
}

function toggleMute() {
    state.muted = !state.muted;
    if (state.muted) {
        // Save current volumes before muting
        SoundManager._savedVolumes = {
            bgm: SoundManager.volumes.bgm,
            scene: SoundManager.volumes.scene,
            character: SoundManager.volumes.character
        };
        SoundManager.volumes.bgm = 0;
        SoundManager.volumes.scene = 0;
        SoundManager.volumes.character = 0;
    } else {
        // Restore saved volumes
        if (SoundManager._savedVolumes) {
            SoundManager.volumes.bgm = SoundManager._savedVolumes.bgm;
            SoundManager.volumes.scene = SoundManager._savedVolumes.scene;
            SoundManager.volumes.character = SoundManager._savedVolumes.character;
        }
    }
    SoundManager.applyVolumes();
    renderMuteToggle();
    saveProgress();
}

// ============================================
// COMBAT LOG MINI-PANEL
// ============================================
var combatLogEntries = [];
var combatLogVisible = false;
var combatHitCounter = 0;

window.addCombatLog = function(icon, message) {
    combatLogEntries.push({ time: Date.now(), icon: icon, msg: message });
    if (combatLogEntries.length > 30) combatLogEntries.shift();
    if (combatLogVisible) updateCombatLogPanel();
};

function updateCombatLogPanel() {
    var panel = document.getElementById('combat-log-panel');
    if (!panel) return;
    var entries = combatLogEntries.slice(-10);
    var h = '';
    for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        var d = new Date(e.time);
        var ts = ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)+':'+('0'+d.getSeconds()).slice(-2);
        h += '<div style="padding:1px 4px;box-sizing:border-box;font-size:8px;color:#9ca3af;border-bottom:1px solid rgba(51,65,85,0.3);"><span style="color:#64748b">['+ts+']</span> <span>'+e.icon+' '+e.msg+'</span></div>';
    }
    panel.innerHTML = h;
    panel.scrollTop = panel.scrollHeight;
}

function renderCombatLogToggle() {
    var btn = document.getElementById('combat-log-toggle');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'combat-log-toggle';
        btn.onclick = function() {
            combatLogVisible = !combatLogVisible;
            var panel = document.getElementById('combat-log-panel');
            if (panel) panel.style.display = combatLogVisible ? 'block' : 'none';
            renderCombatLogToggle();
            if (combatLogVisible) updateCombatLogPanel();
        };
        var strip = ensureCombatStrip();
        if (strip) strip.appendChild(btn);
        // Create log panel
        var panel = document.createElement('div');
        panel.id = 'combat-log-panel';
        panel.style.cssText = 'position:absolute;top:44px;right:8px;z-index:200;width:200px;max-height:160px;background:rgba(0,0,0,0.9);backdrop-filter:blur(8px);border:1px solid rgba(100,116,139,0.3);border-radius:8px;overflow-y:auto;scrollbar-width:thin;display:none;';
        var arenaEl = document.getElementById('arena');
        if (arenaEl) arenaEl.parentElement.appendChild(panel);
    }
    if (combatLogVisible) {
        btn.className = 'text-[10px] sm:text-xs font-bold px-2 py-1 rounded cursor-pointer transition-all bg-slate-800/80 text-green-400';
        btn.textContent = '\u{1F4CB}';
    } else {
        btn.className = 'text-[10px] sm:text-xs font-bold px-2 py-1 rounded cursor-pointer transition-all bg-slate-800/80 text-gray-400';
        btn.textContent = '\u{1F4CB}';
    }
}

// ============================================
// QUICK-HEAL BUTTON
// ============================================
var quickHealCooldown = false;

function renderQuickHealButton() {
    var btn = document.getElementById('quick-heal-btn');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'quick-heal-btn';
        btn.onclick = doQuickHeal;
        btn.className = 'text-[10px] sm:text-xs font-bold px-2 py-1 rounded cursor-pointer transition-all bg-emerald-900/80 text-emerald-300';
        btn.style.cssText = 'display:none;white-space:nowrap;';
        btn.textContent = '\u{1F354}';
        var strip = ensureCombatStrip();
        if (strip) strip.appendChild(btn);
    }
}

function updateQuickHealVisibility() {
    if (!window.gameStarted) return;
    var btn = document.getElementById('quick-heal-btn');
    if (!btn) return;
    if (quickHealCooldown) return;

    var needsHeal = false;
    var equippedKeys = Object.keys(state.equipped || {}).filter(function(k) { return state.equipped[k]; });
    for (var i = 0; i < equippedKeys.length; i++) {
        var c = state.roster[equippedKeys[i]];
        if (c && c.currentHp < (c.maxHp || 100) * 0.5) { needsHeal = true; break; }
    }

    var hasFood = false;
    var bestFoodKey = null;
    var bestFoodEmoji = '';
    var bestFoodCount = 0;
    if (typeof foods !== 'undefined' && state.food) {
        var cheapest = Infinity;
        for (var fk in foods) {
            if (state.food[fk] && state.food[fk] > 0) {
                hasFood = true;
                if (foods[fk].hpRestore < cheapest) {
                    cheapest = foods[fk].hpRestore;
                    bestFoodKey = fk;
                    bestFoodEmoji = foods[fk].emoji || '\u{1F354}';
                    bestFoodCount = state.food[fk];
                }
            }
        }
    }

    if (needsHeal && hasFood) {
        btn.style.display = 'inline-block';
        btn.textContent = bestFoodEmoji + bestFoodCount;
    } else {
        btn.style.display = 'none';
    }
}

function doQuickHeal() {
    if (quickHealCooldown) return;
    if (typeof foods === 'undefined' || !state.food) return;

    // Find cheapest available food
    var foodKey = null;
    var cheapest = Infinity;
    for (var fk in foods) {
        if (state.food[fk] && state.food[fk] > 0 && foods[fk].hpRestore < cheapest) {
            cheapest = foods[fk].hpRestore;
            foodKey = fk;
        }
    }
    if (!foodKey) return;

    // Find most injured equipped character
    var worstKey = null;
    var worstPct = 1;
    var equippedKeys = Object.keys(state.equipped || {}).filter(function(k) { return state.equipped[k]; });
    for (var i = 0; i < equippedKeys.length; i++) {
        var c = state.roster[equippedKeys[i]];
        if (c && c.currentHp > 0) {
            var pct = c.currentHp / (c.maxHp || 100);
            if (pct < worstPct) { worstPct = pct; worstKey = equippedKeys[i]; }
        }
    }
    if (!worstKey) return;

    var healAmt = foods[foodKey].hpRestore;
    var charData = state.roster[worstKey];
    charData.currentHp = Math.min(charData.currentHp + healAmt, charData.maxHp || 100);
    state.food[foodKey]--;

    // Stat tracking
    if (!state.stats) state.stats = {};
    state.stats.foodUsed = (state.stats.foodUsed || 0) + 1;

    // Healing popup
    var el = document.getElementById('live-character-' + worstKey);
    if (el) {
        var r = el.getBoundingClientRect();
        generateDamagePopup({clientX: r.left + r.width/2, clientY: r.top}, '+' + healAmt, false, true, false);
    }

    // Combat log
    if (typeof window.addCombatLog === 'function') {
        window.addCombatLog('\u{1F49A}', worstKey + ' healed +' + healAmt);
    }

    // 3-second cooldown
    quickHealCooldown = true;
    var btn = document.getElementById('quick-heal-btn');
    if (btn) {
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'none';
        btn.style.boxShadow = 'none';
        var countdown = 3;
        btn.textContent = '\u{23F3} ' + countdown + 's';
        var cdTimer = setInterval(function() {
            countdown--;
            if (countdown <= 0) {
                clearInterval(cdTimer);
                quickHealCooldown = false;
                if (btn) {
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }
                updateQuickHealVisibility();
            } else {
                btn.textContent = '\u{23F3} ' + countdown + 's';
            }
        }, 1000);
    }

    syncUI();
}

// ============================================
// SIDE RAIL NOTIFICATION BADGES
// ============================================
function updateSideRailBadges() {
    // Quest badge
    var questBadge = document.getElementById('quest-badge');
    if (questBadge) {
        var qCount = typeof getQuestNotificationCount === 'function' ? getQuestNotificationCount() : 0;
        if (qCount > 0) {
            questBadge.textContent = qCount;
            questBadge.classList.remove('hidden');
        } else {
            questBadge.classList.add('hidden');
        }
    }
    
    // Achievement badge
    var achieveBadge = document.getElementById('achievement-badge');
    if (achieveBadge) {
        var aCount = typeof getAchievementNotificationCount === 'function' ? getAchievementNotificationCount() : 0;
        if (aCount > 0) {
            achieveBadge.textContent = aCount;
            achieveBadge.classList.remove('hidden');
        } else {
            achieveBadge.classList.add('hidden');
        }
    }
    
    // Daily reward badge
    var dailyBadge = document.getElementById('daily-badge');
    if (dailyBadge) {
        var canClaim = typeof canClaimDaily === 'function' ? canClaimDaily() : false;
        if (canClaim) {
            dailyBadge.textContent = '!';
            dailyBadge.classList.remove('hidden');
        } else {
            dailyBadge.classList.add('hidden');
        }
    }
}

window.addEventListener('beforeunload', function() { if (typeof saveProgress === 'function') saveProgress(); });



function renderHangoutCrew() {
    let container = document.getElementById('hangout-crew-container');
    if (container) container.remove();
    
    const arena = document.getElementById('arena');
    if (!arena) return;
    
    container = document.createElement('div');
    container.id = 'hangout-crew-container';
    container.className = 'absolute inset-0 z-[55] pointer-events-none';
    arena.appendChild(container);
    
    const hangoutPositions = {
        sheldon: { bottom: '14%', left: '22%', role: 'sitting' },
        leonard: { bottom: '14%', left: '38%', role: 'sitting' },
        penny:   { bottom: '14%', left: '52%', role: 'sitting' },
        howard:  { bottom: '14%', left: '76%', role: 'sitting' },
        raj:     { bottom: '22%', left: '8%',  role: 'behind' },
        amy:     { bottom: '22%', left: '68%', role: 'behind' },
        bernie:  { bottom: '14%', left: '88%', role: 'sitting' },
        stuart:  { bottom: '22%', left: '28%', role: 'behind' }
    };
    
    let idx = 0;
    for (const [key, config] of Object.entries(characters)) {
        const isEquipped = state.equipped && state.equipped[key];
        const hasLevel = state.roster[key] && state.roster[key].level > 0;
        if (!isEquipped || !hasLevel) continue;
        
        const pos = hangoutPositions[key] || { bottom: '22%', left: (8 + idx * 12) + '%' };
        
        const charDiv = document.createElement('div');
        charDiv.className = 'absolute flex flex-col items-center pointer-events-auto cursor-pointer hover:brightness-125 transition-all duration-300';
        charDiv.style.transform = 'scale(0.55)';
        charDiv.style.transformOrigin = 'bottom center';
        charDiv.style.filter = 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))';
        
        charDiv.style.bottom = pos.bottom;
        if (pos.left) charDiv.style.left = pos.left;
        
        if (pos.role === 'behind') {
            charDiv.style.clipPath = 'inset(0 0 55% 0)';
            charDiv.style.zIndex = '54';
        } else {
            charDiv.style.zIndex = String(56 + idx);
        }
        
        charDiv.onclick = function(e) { e.stopPropagation(); openModal(e, key); };
        charDiv.style.animation = 'hangout-idle ' + (2.5 + Math.random() * 1.5) + 's ease-in-out infinite';
        charDiv.style.animationDelay = (Math.random() * 2) + 's';
        
        const vectorHtml = typeof getVectorFrame === 'function' ? getVectorFrame(key) : (vectors[key] || '');
        
        charDiv.innerHTML = '<div class="character-vector-wrapper flex items-end justify-center">' + vectorHtml + '</div><span class="bg-amber-950/90 text-white border border-amber-700 font-bold text-[8px] px-1.5 py-0.5 rounded whitespace-nowrap uppercase tracking-tighter shadow-lg mt-1">' + config.name + '</span>';
        
        container.appendChild(charDiv);
        idx++;
    }
}

// DOT PROCESSOR
setInterval(() => {
    if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
    if (typeof currentEnemy !== 'undefined' && currentEnemy !== null && currentEnemy.hp > 0 && currentEnemy.dots && currentEnemy.dots.length > 0) {
        for (let i = currentEnemy.dots.length - 1; i >= 0; i--) {
            let dot = currentEnemy.dots[i];
            processDamage(dot.dmg, dot.source);
            dot.ticks--;
            const enemyFrame = document.getElementById('enemy-graphic-frame');
            if (enemyFrame) {
                const rect = enemyFrame.getBoundingClientRect();
                generateDamagePopup({clientX: rect.left + rect.width/2, clientY: rect.top}, "DOT", false, false, true);
            }
            if (dot.ticks <= 0) {
                currentEnemy.dots.splice(i, 1);
            }
        }
    }
}, 1000);


async function performLogout() {
    if (typeof supabaseLogout === 'function') {
        await supabaseLogout();
    }
    // Clear local saves so it doesn't just reload the same account silently

    localStorage.removeItem('sheldonPasadenaBattleV10');
    // Reload page to return to Auth overlay
    window.location.reload();
}


// SPECTATE FEATURE
async function startSpectating(userId, username) {
    if (typeof showGameAlert === 'function') showGameAlert('Spectating', 'Connecting to ' + username + '...');
    
    let targetState = null;
    
    // 1. Try to fetch from game_saves (Real Players)
    let saveRes = await supabase.from('game_saves').select('state').eq('id', userId).maybeSingle();
    if (saveRes && saveRes.data && saveRes.data.state) {
        targetState = typeof saveRes.data.state === 'string' ? JSON.parse(saveRes.data.state) : saveRes.data.state;
    } 
    // 2. Fallback to leaderboard (Bots)
    else {
        let lbRes = await supabase.from('leaderboard').select('*').eq('id', userId).maybeSingle();
        if (lbRes && lbRes.data) {
            let data = lbRes.data;
            let mockState = JSON.parse(JSON.stringify(state)); // Clone current structure
            mockState.wave = data.wave || 1;
            mockState.currentLocation = data.location || 'sheldons_apt';
            mockState.roster = {};
            mockState.equipped = {};
            mockState.formation = { front: [null, null], mid: [null, null, null], back: [null, null, null] };
            
            // Rebuild character roster & formation
            if (data.lineup && Array.isArray(data.lineup)) {
                let laneCounts = { front: 0, mid: 0, back: 0 };
                data.lineup.forEach(c => {
                    let charKey = c.char || c.key;
                    if (charKey && characters[charKey]) {
                        mockState.roster[charKey] = { level: c.level || 1, activeSkin: c.skin || 'default', currentHp: 999, status: 'healthy' };
                        mockState.equipped[charKey] = true;
                        
                        // Try to place in default lane
                        let lane = characters[charKey].lane || 'mid';
                        if (laneCounts[lane] < mockState.formation[lane].length) {
                            mockState.formation[lane][laneCounts[lane]] = { type: 'char', key: charKey };
                            laneCounts[lane]++;
                        }
                    }
                });
            }
            
            // Rebuild robots
            mockState.robots = [];
            mockState.robotRoster = {};
            if (data.robots && Array.isArray(data.robots)) {
                data.robots.forEach(r => {
                    let botKey = r.name || r.key;
                    if (botKey) {
                        mockState.robots.push({ equipped: true, blueprintId: botKey, level: r.level || 1 });
                        mockState.robotRoster[botKey] = { level: r.level || 1 };
                    }
                });
            }
            
            targetState = mockState;
        }
    }
    
    if (!targetState) {
        if (typeof showGameAlert === 'function') showGameAlert('Error', 'Could not fetch data for ' + username);
        return;
    }

    // Stop current engines
    Object.values(gameTimers).forEach(clearInterval);
    gameTimers = {};
    if (window.robotTimers) { Object.values(window.robotTimers).forEach(clearInterval); window.robotTimers = {}; }
    if (typeof bossTimerId !== 'undefined' && bossTimerId) clearInterval(bossTimerId);
    if (window.enemyAttackInterval) clearInterval(window.enemyAttackInterval);
    
    // Swap state
    isSpectating = true;
    originalState = state;
    state = targetState;
    
    // Inject spectate CSS — hide all action/modifying buttons so spectators get a clean view
    var spectateCSS = document.getElementById('spectate-hide-css');
    if (!spectateCSS) {
        spectateCSS = document.createElement('style');
        spectateCSS.id = 'spectate-hide-css';
        spectateCSS.textContent = [
            '#side-rail { display:none !important; }',                    // Side menu buttons
            '#boss-controls { display:none !important; }',               // Boss fight buttons
            '#quick-repair-container { display:none !important; }',      // Quick repair
            '#more-menu-dropdown { display:none !important; }',          // More menu
            '#profile-box { display:none !important; }',                 // Profile box
            '#res-pill { display:none !important; }',                    // Resource pill
            '.bottom-tab[data-tab="lineup"] { display:none !important; }',  // Lineup tab
            '.bottom-tab[data-tab="research"] { display:none !important; }', // Research tab
            '.bottom-tab[data-tab="shop"] { display:none !important; }',    // Shop tab
            '#bottom-bar button[onclick*="openComicStore"] { display:none !important; }',
            '#bottom-bar button[onclick*="openInventory"] { display:none !important; }',
            // Hide mutating buttons inside modals if they open
            'button[onclick*="levelUp"] { display:none !important; }',
            'button[onclick*="hireChar"] { display:none !important; }',
            'button[onclick*="equipChar"] { display:none !important; }',
            'button[onclick*="unequipChar"] { display:none !important; }',
            'button[onclick*="toggleEquip"] { display:none !important; }',
            'button[onclick*="saveLineup"] { display:none !important; }',
            'button[onclick*="purchaseSkin"] { display:none !important; }',
            'button[onclick*="selectSkin"] { display:none !important; }',
            'button[onclick*="doPrestige"] { display:none !important; }',
            'button[onclick*="useFoodFor"] { display:none !important; }',
            'button[onclick*="autoHeal"] { display:none !important; }',
        ].join('\n');
        document.head.appendChild(spectateCSS);
    }
    
    // Start engines with target state
    renderActiveBattleLine();
    if (typeof updateMapBackground === 'function') updateMapBackground(state.currentLocation || 'sheldons_apt');
    spawnEnemy();
    if (typeof syncUI === 'function') syncUI();
    startAutomationEngines();
    if (typeof startRobotAutomation === 'function') startRobotAutomation();
    
    // Build Back UI
    let backBtn = document.getElementById('spectate-back-btn');
    if (!backBtn) {
        backBtn = document.createElement('div');
        backBtn.id = 'spectate-back-btn';
        backBtn.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] bg-red-600 text-white font-black px-6 py-3 rounded-full border-4 border-red-800 shadow-2xl cursor-pointer hover:bg-red-500 animate-pulse uppercase tracking-widest';
        document.body.appendChild(backBtn);
    }
    backBtn.innerHTML = `🛑 STOP SPECTATING ${username.replace(/'/g, "\\'")}`;
    backBtn.onclick = stopSpectating;
    
    // Clean up modals
    ['guild-hub-modal', 'leaderboard-modal', 'player-profile-modal'].forEach(id => { 
        var el = document.getElementById(id); if (el) el.remove(); 
    });
}

function stopSpectating() {
    if (!isSpectating) return;
    Object.values(gameTimers).forEach(clearInterval);
    gameTimers = {};
    if (window.robotTimers) { Object.values(window.robotTimers).forEach(clearInterval); window.robotTimers = {}; }
    if (typeof bossTimerId !== 'undefined' && bossTimerId) clearInterval(bossTimerId);
    if (window.enemyAttackInterval) clearInterval(window.enemyAttackInterval);
    isSpectating = false;
    state = originalState;
    originalState = null;
    var btn = document.getElementById('spectate-back-btn');
    if (btn) btn.remove();
    // Remove spectate CSS — restore all hidden buttons
    var specCSS = document.getElementById('spectate-hide-css');
    if (specCSS) specCSS.remove();
    renderActiveBattleLine();
    if (typeof updateMapBackground === 'function') updateMapBackground(state.currentLocation || 'sheldons_apt');
    spawnEnemy();
    if (typeof updateUI === 'function') updateUI();
    startAutomationEngines();
    if (typeof startRobotEngines === 'function') startRobotEngines();
    if (typeof showGameAlert === 'function') showGameAlert('Welcome Back', 'Returned to your local game.');
}



// --- SPECTATE SANDBOX ---
// Smart approach: Allow ALL clicks by default. Only block actions that would MODIFY the spectated player's data.
// This lets spectators read dialogues, view stats, browse UI freely.
document.addEventListener('click', function(e) {
    if (typeof isSpectating === 'undefined' || !isSpectating) return;

    // Always allow: stop spectating button, modals/alerts close buttons, game alerts
    if (e.target.closest('#spectate-back-btn')) return;
    if (e.target.closest('#game-modal-overlay')) return;

    // Check if the click target is a button or interactive element
    var btn = e.target.closest('button, [onclick], .cursor-pointer');
    if (!btn) return; // Not a clickable element, allow it (text, images, etc.)

    var text = (btn.innerText || btn.textContent || '').toUpperCase().trim();
    var onclickStr = (btn.getAttribute('onclick') || '').toLowerCase();

    // List of BLOCKED modifying actions (text-based)
    var blockedTexts = [
        'LEVEL UP', 'HIRE', 'EQUIP', 'UNEQUIP', 'SELECT SKIN', 'SAVE LINEUP',
        'UPGRADE', 'PURCHASE', 'BUY', 'SELL', 'PRESTIGE', 'RESET', 'CLAIM',
        'RECRUIT', 'PROMOTE', 'DEMOTE', 'KICK', 'LEAVE GUILD', 'CREATE GUILD',
        'JOIN', 'ASSIGN', 'CRAFT', 'FUSE', 'DONATE', 'COLLECT', 'START RESEARCH',
        'AUTO HEAL', 'USE FOOD', 'REPAIR', 'DEPLOY', 'SAVE', 'CONFIRM',
        'PULL', 'FREE PULL', 'MULTI PULL', 'SINGLE PULL', 'SPIN',
        'CHANGE NAME', 'SET AVATAR', 'APPLY'
    ];

    // List of BLOCKED modifying onclick function calls
    var blockedFunctions = [
        'levelup', 'hirechar', 'equipchar', 'unequipchar', 'toggleequip',
        'savelineup', 'purchaseskin', 'selectskin', 'applyskin',
        'prestige', 'dogachapull', 'dopull', 'opengachapull',
        'upgradeitem', 'sellitem', 'craftitem', 'fuseitem',
        'usefood', 'repairchar', 'autorepair', 'autoheal',
        'claimreward', 'claimdaily', 'claimquest',
        'joinguild', 'leaveguild', 'createguild', 'kickmember', 'promotemember',
        'saveprofilename', 'setprofileavatar', 'setprofileflag', 'saveprofilebio',
        'startresearch', 'assignskillpoint', 'resetskills',
        'togglebattleauto', 'deploytrap', 'startraid'
    ];

    // Check text match
    for (var i = 0; i < blockedTexts.length; i++) {
        if (text.includes(blockedTexts[i])) {
            e.stopPropagation();
            e.preventDefault();
            if (typeof showToast === 'function') showToast('👁️ View only while spectating');
            return;
        }
    }

    // Check onclick function match
    for (var j = 0; j < blockedFunctions.length; j++) {
        if (onclickStr.includes(blockedFunctions[j])) {
            e.stopPropagation();
            e.preventDefault();
            if (typeof showToast === 'function') showToast('👁️ View only while spectating');
            return;
        }
    }

    // Everything else is allowed — dialogues, viewing stats, closing modals, navigating tabs, etc.
}, true);


// --- SEASONAL PVP SYNC ---
async function checkSeasonSync() {
    try {
        if (!state.pvp) state.pvp = { trophies: 0, league: 'Bronze', wins: 0, losses: 0, lineup: [], season: 1 };
        if (typeof state.pvp.season === 'undefined') state.pvp.season = 1;
        
        const { data, error } = await supabase.from('game_settings').select('value').eq('key', 'current_season').maybeSingle();
        if (error || !data) return;
        
        const currentSeasonData = data.value;
        const currentSeasonId = currentSeasonData.id || 1;
        
        if (state.pvp.season < currentSeasonId) {
            console.log(`[Season Sync] Player season (${state.pvp.season}) is older than server season (${currentSeasonId}). Resetting trophies to 300.`);
            state.pvp.season = currentSeasonId;
            if (state.pvp.trophies > 300) {
                state.pvp.trophies = 300;
            }
            saveProgress();
            
            if (typeof showGameAlert === 'function') {
                showGameAlert('New Season Started!', `${currentSeasonData.name} has begun! Your trophies have been reset to 300. Good luck climbing the leaderboard!`);
            }
        }
    } catch (e) {
        console.error('[Season Sync Error]', e);
    }
}
