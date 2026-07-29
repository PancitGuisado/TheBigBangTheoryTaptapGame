const fs = require('fs');

// ============================================================
// PART 1: Create supabase.js client file
// ============================================================
const supabaseJS = `// SUPABASE CLIENT
const SUPABASE_URL = 'https://tdsbpxlacwuymbdtjwrn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkc2JweGxhY3d1eW1iZHRqd3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzOTg0MTYsImV4cCI6MjA5Njk3NDQxNn0.Bhkd4r-FW_Yszb_gAKIeEiUpMgSJ17yLZjtfeI5kSIg';

// Global db alias for game scripts
var db = null;

function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        if (window.supabase.createClient) {
            window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            db = window.supabase;
            console.log('[Supabase] Client initialized');
            return true;
        } else if (window.supabase.from) {
            db = window.supabase;
            return true; // Already initialized
        }
    }
    console.warn('[Supabase] SDK not loaded yet');
    return false;
}

// Current user state
let currentUser = null;
let isGuest = true;

async function supabaseSignUp(email, password, username) {
    if (!supabase) return { error: { message: 'Supabase not initialized' } };
    
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error };
    
    // Create profile + leaderboard entry
    if (data.user) {
        await supabase.from('profiles').insert({ id: data.user.id, username: username });
        await supabase.from('leaderboard').insert({ id: data.user.id, username: username });
        await supabase.from('game_saves').insert({ id: data.user.id, state: {} });
    }
    return { data };
}

async function supabaseLogin(email, password) {
    if (!supabase) return { error: { message: 'Supabase not initialized' } };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error };
    
    currentUser = data.user;
    isGuest = false;
    
    // Load cloud save
    const { data: saveData } = await supabase.from('game_saves').select('state').eq('id', data.user.id).single();
    
    // Get username
    const { data: profile } = await supabase.from('profiles').select('username').eq('id', data.user.id).single();
    if (profile) currentUser.username = profile.username;
    
    return { data, cloudSave: saveData ? saveData.state : null };
}

async function supabaseLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    currentUser = null;
    isGuest = true;
}

async function supabaseGetSession() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        currentUser = data.session.user;
        isGuest = false;
        const { data: profile } = await supabase.from('profiles').select('username').eq('id', currentUser.id).single();
        if (profile) currentUser.username = profile.username;
    }
    return data.session;
}

async function cloudSave(gameState) {
    if (!supabase || isGuest || !currentUser) return;
    
    try {
        // Save full state
        await supabase.from('game_saves').upsert({
            id: currentUser.id,
            state: gameState,
            updated_at: new Date().toISOString()
        });
        
        // Update leaderboard
        var lineup = [];
        if (gameState.equipped) {
            for (var k in gameState.equipped) {
                if (gameState.equipped[k] && gameState.roster && gameState.roster[k]) {
                    lineup.push({ char: k, level: gameState.roster[k].level || 1, skin: gameState.roster[k].activeSkin || 'default' });
                }
            }
        }
        
        var robotList = [];
        if (gameState.robots) {
            gameState.robots.forEach(function(r) {
                if (r && r.equipped) robotList.push({ name: r.blueprintId, level: r.level || 1 });
            });
        }
        
        // Ensure we have the actual username before saving
        var saveUsername = currentUser.username;
        if (!saveUsername || saveUsername === 'Unknown') {
            try {
                var { data: profileData } = await supabase.from('profiles').select('username').eq('id', currentUser.id).single();
                if (profileData && profileData.username) {
                    saveUsername = profileData.username;
                    currentUser.username = profileData.username;
                }
            } catch (e) { /* ignore */ }
        }
        // Final fallback: use guest name from state or generate one
        if (!saveUsername || saveUsername === 'Unknown') {
            saveUsername = gameState.guestName || ('Player_' + currentUser.id.substring(0, 6));
        }
        
        await supabase.from('leaderboard').upsert({
            id: currentUser.id,
            username: saveUsername,
            score: gameState.score || 0,
            wave: gameState.wave || 1,
            location: gameState.currentLocation || 'sheldons_apt',
            lineup: lineup,
            robots: robotList,
            skill_tree: gameState.skillTree || {},
            bazinga_points: gameState.bazingaPoints || 0,
            updated_at: new Date().toISOString()
        });
    } catch (e) {
        console.warn('[Supabase] Cloud save error:', e);
    }
}

async function migrateGuestToOnline() {
    if (!supabase || isGuest || !currentUser) return;
    
    // Push current local state to cloud
    var localState = JSON.parse(localStorage.getItem('tbbt_idle_save') || '{}');
    if (localState && Object.keys(localState).length > 0) {
        await cloudSave(localState);
        console.log('[Supabase] Migrated guest save to cloud');
    }
}

async function fetchLeaderboard(limit, orderBy = 'score', seasonId = 'current') {
    if (!supabase) return [];
    limit = limit || 50;
    
    if (seasonId !== 'current') {
        var { data, error } = await supabase
            .from('season_history')
            .select('leaderboard_data')
            .eq('season_id', seasonId)
            .maybeSingle();
            
        if (error || !data) return [];
        // Sort the jsonb array based on orderBy
        let arr = data.leaderboard_data || [];
        arr.sort((a, b) => (b[orderBy] || 0) - (a[orderBy] || 0));
        return arr.slice(0, limit);
    }
    
    var { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order(orderBy, { ascending: false })
        .limit(limit);
    
    return error ? [] : (data || []);
}
`;

fs.writeFileSync('supabase.js', supabaseJS);
console.log('✅ Created supabase.js');

// ============================================================
// PART 2: Update index.html - Title screen, auth modal, leaderboard, scripts
// ============================================================
let html = fs.readFileSync('index.html', 'utf8');

// Add Supabase CDN before closing </head>
html = html.replace(
    '</head>',
    '    <!-- Supabase CDN -->\n    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>\n</head>'
);
console.log('✅ Added Supabase CDN');

// Add supabase.js script before other scripts
html = html.replace(
    '    <script src="vectors.js',
    '    <script src="supabase.js?v=1781463000000"></script>\n    <script src="vectors.js'
);
console.log('✅ Added supabase.js script tag');

// Replace title screen with logo + auth flow
const oldTitleScreen = html.substring(
    html.indexOf('<div id="title-screen"'),
    html.indexOf('</div>\n\n', html.indexOf('<div id="title-screen"')) + 6
);

const newTitleScreen = `<div id="title-screen" class="fixed inset-0 z-[500] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out cursor-pointer" onclick="showAuthScreen()">
        <!-- Logo Phase -->
        <div id="logo-phase" class="flex flex-col items-center gap-4">
            <img src="images/startup_logo.png" alt="TBBT Idle Game" class="max-w-[80vw] max-h-[60vh] object-contain drop-shadow-[0_0_40px_rgba(255,215,0,0.5)] animate-pulse">
            <p class="text-gray-500 text-xs tracking-widest uppercase animate-bounce mt-8">Click anywhere to continue</p>
        </div>
        
        <!-- Auth Phase (hidden initially) -->
        <div id="auth-phase" class="hidden flex flex-col items-center gap-6 w-full max-w-sm px-4">
            <img src="images/startup_logo.png" alt="TBBT" class="max-w-[200px] object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.3)] mb-2">
            
            <!-- Auth Form -->
            <div id="auth-form-container" class="w-full bg-slate-900/80 backdrop-blur-md border border-yellow-800/30 rounded-xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <!-- Tab Buttons -->
                <div class="flex gap-2 mb-4">
                    <button onclick="event.stopPropagation();switchAuthTab('login')" id="auth-tab-login" class="flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-yellow-600 text-white border border-yellow-500 cursor-pointer">Login</button>
                    <button onclick="event.stopPropagation();switchAuthTab('signup')" id="auth-tab-signup" class="flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-800 text-gray-400 border border-slate-700 cursor-pointer">Sign Up</button>
                </div>
                
                <!-- Login Form -->
                <div id="auth-login-form">
                    <input type="email" id="login-email" placeholder="Email" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2.5 rounded-lg text-xs mb-2 focus:border-yellow-500 focus:outline-none" onclick="event.stopPropagation()">
                    <input type="password" id="login-password" placeholder="Password" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2.5 rounded-lg text-xs mb-3 focus:border-yellow-500 focus:outline-none" onclick="event.stopPropagation()">
                    <button onclick="event.stopPropagation();handleLogin()" id="login-btn" class="w-full bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider cursor-pointer border border-yellow-700 shadow-lg">⚡ Login</button>
                </div>
                
                <!-- Signup Form -->
                <div id="auth-signup-form" class="hidden">
                    <input type="text" id="signup-username" placeholder="Username" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2.5 rounded-lg text-xs mb-2 focus:border-yellow-500 focus:outline-none" onclick="event.stopPropagation()">
                    <input type="email" id="signup-email" placeholder="Email" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2.5 rounded-lg text-xs mb-2 focus:border-yellow-500 focus:outline-none" onclick="event.stopPropagation()">
                    <input type="password" id="signup-password" placeholder="Password (min 6 chars)" class="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2.5 rounded-lg text-xs mb-3 focus:border-yellow-500 focus:outline-none" onclick="event.stopPropagation()">
                    <button onclick="event.stopPropagation();handleSignup()" id="signup-btn" class="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider cursor-pointer border border-green-700 shadow-lg">🚀 Create Account</button>
                </div>
                
                <div id="auth-error" class="text-red-400 text-[10px] mt-2 text-center hidden"></div>
                <div id="auth-success" class="text-green-400 text-[10px] mt-2 text-center hidden"></div>
            </div>
            
            <!-- Divider -->
            <div class="flex items-center gap-3 w-full">
                <div class="flex-1 h-px bg-slate-700"></div>
                <span class="text-gray-600 text-[10px] uppercase tracking-widest">or</span>
                <div class="flex-1 h-px bg-slate-700"></div>
            </div>
            
            <!-- Guest Button -->
            <button onclick="event.stopPropagation();startAsGuest()" class="w-full max-w-sm bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold py-3 rounded-lg text-xs uppercase tracking-wider cursor-pointer border border-slate-700 shadow-lg transition-all hover:border-slate-500">
                👤 Continue as Guest
                <span class="block text-[8px] text-gray-500 font-normal mt-1">Progress saved locally only</span>
            </button>
        </div>
    </div>`;

html = html.replace(oldTitleScreen, newTitleScreen);
console.log('✅ Replaced title screen with logo + auth');

// Add leaderboard modal before settings modal
const settingsModalMarker = '    <!-- Settings Modal -->';
const leaderboardModal = `    <!-- Leaderboard Modal -->
    <div id="leaderboard-modal" class="fixed inset-0 bg-black/70 hidden flex items-center justify-center p-4" style="z-index: 100;">
        <div class="bg-gradient-to-br from-slate-950 to-slate-900 backdrop-blur-md border border-yellow-800/50 max-w-lg w-full max-h-[85vh] p-5 relative text-[12px] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
            <button onclick="closeLeaderboard()" class="absolute top-2 right-4 text-gray-500 hover:text-white font-bold text-2xl cursor-pointer z-10">&times;</button>
            <div class="border-b-4 border-yellow-800 pb-3 mb-4 text-center">
                <h2 class="text-base font-bold tracking-widest text-yellow-500 uppercase">🏆 GLOBAL LEADERBOARD</h2>
                <p class="text-[8px] text-gray-400 mt-1 uppercase tracking-wider">Top players worldwide</p>
            </div>
            <div id="leaderboard-list" class="flex-1 overflow-y-auto flex flex-col gap-2" style="-ms-overflow-style:none;scrollbar-width:none;"></div>
        </div>
    </div>

    <!-- Player Profile Modal -->
    <div id="player-profile-modal" class="fixed inset-0 bg-black/70 hidden flex items-center justify-center p-4" style="z-index: 110;">
        <div class="bg-gradient-to-br from-slate-950 to-slate-900 backdrop-blur-md border border-cyan-800/50 max-w-sm w-full p-5 relative text-[12px] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col">
            <button onclick="document.getElementById('player-profile-modal').classList.add('hidden')" class="absolute top-2 right-4 text-gray-500 hover:text-white font-bold text-2xl cursor-pointer z-10">&times;</button>
            <div id="player-profile-content"></div>
        </div>
    </div>

    `;

html = html.replace(settingsModalMarker, leaderboardModal + settingsModalMarker);
console.log('✅ Added leaderboard + player profile modals');

const perksBtn = html.indexOf('openPerksModal');
if (perksBtn > -1) {
    // Find the line with openPerksModal button and add a leaderboard button nearby
    html = html.replace(
        'openPerksModal(event)',
        'openPerksModal(event)" title="Skill Tree"></button><button onclick="openLeaderboard(event)" class="bg-gradient-to-r from-cyan-700 to-blue-700 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-2 py-1 rounded border border-cyan-500 shadow cursor-pointer text-[9px] tracking-wider" title="Leaderboard">🏆</button><span style="display:none'
    );
    console.log('✅ Added leaderboard button');
}

// Update cache buster
html = html.replace(/v=1781\d+/g, 'v=1781463000000');

fs.writeFileSync('index.html', html);
console.log('✅ Updated index.html');

// ============================================================
// PART 3: Add auth + leaderboard functions to app_v2.js
// ============================================================
let code = fs.readFileSync('app_v2.js', 'utf8');

// Add auth flow functions before initGame
const authFunctions = `
// ============================================================
// AUTH FLOW SYSTEM
// ============================================================
var authPhaseShown = false;

function showAuthScreen() {
    if (authPhaseShown) return;
    authPhaseShown = true;
    
    var logoPhase = document.getElementById('logo-phase');
    var authPhase = document.getElementById('auth-phase');
    var titleScreen = document.getElementById('title-screen');
    
    if (logoPhase) logoPhase.style.display = 'none';
    if (authPhase) authPhase.classList.remove('hidden');
    if (titleScreen) titleScreen.style.cursor = 'default';
    titleScreen.onclick = null;
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
    
    // If cloud save exists, load it
    if (result.cloudSave && Object.keys(result.cloudSave).length > 0) {
        Object.assign(state, result.cloudSave);
        saveProgress();
    }
    
    showAuthSuccess('Welcome back, ' + (currentUser.username || 'Player') + '!');
    setTimeout(function() { window.location.reload(); }, 1000);
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
        await migrateGuestToOnline();
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
        el.innerHTML = '<div style="font-size:7px;color:#64748b;background:rgba(0,0,0,0.6);padding:2px 8px;border-radius:4px;border:1px solid #334155;cursor:pointer;" onclick="showConnectPrompt()">👤 Guest Mode</div>';
    } else {
        el.innerHTML = '<div style="font-size:7px;color:#22c55e;background:rgba(0,0,0,0.6);padding:2px 8px;border-radius:4px;border:1px solid #166534;">🟢 ' + (currentUser.username || 'Online') + '</div>';
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
async function openLeaderboard(event) {
    if (event) event.stopPropagation();
    var modal = document.getElementById('leaderboard-modal');
    if (modal) modal.classList.remove('hidden');
    
    var list = document.getElementById('leaderboard-list');
    if (list) list.innerHTML = '<div class="text-center text-gray-500 py-8 animate-pulse">Loading leaderboard...</div>';
    
    var data = await fetchLeaderboard(50);
    renderLeaderboard(data);
}

function closeLeaderboard() {
    var modal = document.getElementById('leaderboard-modal');
    if (modal) modal.classList.add('hidden');
}

function renderLeaderboard(data) {
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
        
        h += '<div class="border-2 ' + rankColor + ' rounded-lg p-2.5 flex items-center gap-3 cursor-pointer hover:bg-slate-800/60 transition-all' + (isMe ? ' ring-2 ring-yellow-500/50' : '') + '" onclick="viewPlayerProfile(\\'' + p.id + '\\')">';
        h += '<div class="text-lg font-black min-w-[30px] text-center">' + rankIcon + '</div>';
        h += '<div class="flex-1 min-w-0">';
        h += '<div class="font-bold text-white text-[11px] truncate">' + (p.username || 'Unknown') + (isMe ? ' <span class=\\"text-yellow-400 text-[8px]\\">(YOU)</span>' : '') + '</div>';
        h += '<div class="text-[8px] text-gray-500">Wave ' + (p.wave || 1) + ' • ' + locName + '</div>';
        h += '<div class="text-[9px] mt-0.5">' + (lineupEmojis || 'No lineup') + '</div>';
        h += '</div>';
        h += '<div class="text-right">';
        h += '<div class="font-black text-yellow-400 text-[11px]">' + (p.score || 0).toLocaleString() + '</div>';
        h += '<div class="text-[7px] text-gray-500">SCORE</div>';
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
    
    var h = '<div class="text-center mb-4">';
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

`;

// Insert auth functions before the existing initGame
code = code.replace(
    'function initGame() {',
    authFunctions + 'function initGame() {'
);
console.log('✅ Added auth + leaderboard functions to app_v2.js');

// Modify saveProgress to also cloud save
// Find saveProgress function
var saveIdx = code.indexOf('function saveProgress()');
if (saveIdx > -1) {
    // Find the closing brace of saveProgress
    var saveEnd = code.indexOf('\n}', saveIdx);
    if (saveEnd > -1) {
        // Insert cloud save call before the closing brace
        code = code.substring(0, saveEnd) + '\n    // Cloud save if logged in\n    if (typeof cloudSave === "function" && !isGuest) cloudSave(state);\n' + code.substring(saveEnd);
        console.log('✅ Wired cloud save into saveProgress()');
    }
}

// Modify initGame to check for existing session
code = code.replace(
    'function initGame() {',
    'function initGame() {\n    // Initialize Supabase\n    if (typeof initSupabase === "function") initSupabase();\n    // Check for existing session\n    if (typeof supabaseGetSession === "function") {\n        supabaseGetSession().then(function(session) {\n            if (session) updateOnlineStatus();\n        });\n    }'
);
console.log('✅ Wired Supabase init into initGame()');

fs.writeFileSync('app_v2.js', code);

// Final verification
var depth = 0;
for (var ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');
console.log('Total lines:', code.split('\n').length);
