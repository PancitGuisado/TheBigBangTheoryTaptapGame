var supabase;
// SUPABASE CLIENT
const SUPABASE_URL = 'https://tdsbpxlacwuymbdtjwrn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkc2JweGxhY3d1eW1iZHRqd3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzOTg0MTYsImV4cCI6MjA5Njk3NDQxNn0.Bhkd4r-FW_Yszb_gAKIeEiUpMgSJ17yLZjtfeI5kSIg';

// Global db alias for game scripts
var db = null;

function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        if (window.supabase.createClient) {
            window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            db = window.supabase;
            supabase = window.supabase;
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

// ============================================================
// AUTH: SIGN UP
// ============================================================
async function supabaseSignUp(email, password, username) {
    if (!supabase) return { error: { message: 'Supabase not initialized' } };
    
    // Store username in user_metadata so it survives email confirmation
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: username } }
    });
    if (error) return { error };
    
    // Try to create profile + leaderboard entry now.
    // This may fail if email confirmation is required (RLS blocks unconfirmed users),
    // so we also handle profile creation on first login via _ensureProfile().
    if (data.user) {
        try {
            await supabase.from('profiles').insert({ id: data.user.id, username: username });
            await supabase.from('leaderboard').insert({ id: data.user.id, username: username });
            await supabase.from('game_saves').insert({ id: data.user.id, state: {} });
        } catch(e) {
            console.warn('[SignUp] Could not create profile rows (will retry on login):', e.message);
        }
    }
    return { data };
}

// Ensure profile/leaderboard rows exist for the current user.
// Called on login/session restore to handle cases where signup profile insert failed.
async function _ensureProfile(user) {
    if (!supabase || !user) return;
    var username = null;
    
    // 1. Check if profile already exists
    try {
        const { data: profile } = await supabase.from('profiles').select('username').eq('id', user.id).single();
        if (profile && profile.username) {
            user.username = profile.username;
            return; // Profile exists, we're good
        }
    } catch(e) {} // No profile row found
    
    // 2. Get username from user_metadata (set during signUp)
    if (user.user_metadata && user.user_metadata.username) {
        username = user.user_metadata.username;
    } else {
        // Fallback: use the part before @ in the email
        username = user.email ? user.email.split('@')[0] : 'Player';
    }
    
    // 3. Create the missing profile and leaderboard rows
    try {
        await supabase.from('profiles').upsert({ id: user.id, username: username });
        await supabase.from('leaderboard').upsert({ id: user.id, username: username });
        await supabase.from('game_saves').upsert({ id: user.id, state: {} });
        console.log('[Auth] Created missing profile for', username);
    } catch(e) {
        console.warn('[Auth] Failed to create profile:', e.message);
    }
    
    user.username = username;
}

// ============================================================
// AUTH: LOGIN
// ============================================================
async function supabaseLogin(email, password) {
    if (!supabase) return { error: { message: 'Supabase not initialized' } };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error };
    
    currentUser = data.user;
    isGuest = false;
    
    // Ensure profile exists and load username (handles failed signup inserts)
    await _ensureProfile(currentUser);
    
    return { data };
}

// ============================================================
// AUTH: LOGOUT
// ============================================================
async function supabaseLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    currentUser = null;
    isGuest = true;
}

// ============================================================
// AUTH: RESTORE SESSION (page reload with existing session)
// ============================================================
async function supabaseGetSession() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        currentUser = data.session.user;
        isGuest = false;
        // Ensure profile exists and load username (handles failed signup inserts)
        await _ensureProfile(currentUser);
    }
    return data.session;
}

// ============================================================
// CLOUD SAVE — pushes state to Supabase game_saves + leaderboard
// ============================================================
var _cloudSaveTimer = null;
var _cloudSavePending = false;

async function cloudSave(gameState) {
    if (!supabase || isGuest || !currentUser) return;
    
    // Debounce: don't spam cloud saves. Queue one to run in 3s.
    _cloudSavePending = true;
    if (_cloudSaveTimer) return; // Already queued
    
    _cloudSaveTimer = setTimeout(async function() {
        _cloudSaveTimer = null;
        if (!_cloudSavePending) return;
        _cloudSavePending = false;
        
        try {
            // 1. Save full state to game_saves
            await supabase.from('game_saves').upsert({
                id: currentUser.id,
                state: gameState,
                updated_at: new Date().toISOString()
            });
            
            // 2. Update leaderboard
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
            
            var saveUsername = currentUser.username;
            if (!saveUsername || saveUsername === 'Unknown') {
                try {
                    var profileResult = await supabase.from('profiles').select('username').eq('id', currentUser.id).single();
                    if (profileResult.data && profileResult.data.username) {
                        saveUsername = profileResult.data.username;
                        currentUser.username = profileResult.data.username;
                    }
                } catch (e) {}
            }
            if (!saveUsername || saveUsername === 'Unknown') {
                saveUsername = gameState.guestName || ('Player_' + currentUser.id.substring(0, 6));
            }
            
            await supabase.from('leaderboard').upsert({
                id: currentUser.id,
                username: saveUsername,
                score: gameState.score || 0,
                wave: gameState.wave || 1,
                trophies: gameState.pvp ? (gameState.pvp.trophies || 0) : 0,
                location: gameState.currentLocation || 'sheldons_apt',
                lineup: lineup,
                robots: robotList,
                skill_tree: gameState.skillTree || {},
                bazinga_points: gameState.bazingaPoints || 0,
                updated_at: new Date().toISOString()
            });
            
            console.log('[CLOUD] Saved to cloud — wave=' + gameState.wave);
        } catch (e) {
            console.warn('[CLOUD] Save error:', e.message);
        }
    }, 3000);
}

// ============================================================
// LEADERBOARD
// ============================================================
async function fetchLeaderboard(limit, orderBy, seasonId) {
    if (!supabase) return [];
    limit = limit || 50;
    orderBy = orderBy || 'score';
    seasonId = seasonId || 'current';
    
    if (seasonId !== 'current') {
        var histResult = await supabase
            .from('season_history')
            .select('leaderboard_data')
            .eq('season_id', seasonId)
            .maybeSingle();
            
        if (histResult.error || !histResult.data) return [];
        let arr = histResult.data.leaderboard_data || [];
        arr.sort((a, b) => (b[orderBy] || 0) - (a[orderBy] || 0));
        return arr.slice(0, limit);
    }
    
    var lbResult = await supabase
        .from('leaderboard')
        .select('*')
        .order(orderBy, { ascending: false })
        .limit(limit);
    
    return lbResult.error ? [] : (lbResult.data || []);
}

// ============================================================
// GLOBAL PLAYER POOL
// ============================================================
window.playerPool = [];

async function loadPlayerPool() {
    if (!supabase) return;
    try {
        var res = await supabase.from('leaderboard').select('*').limit(150);
        if (res && res.data && res.data.length > 0) {
            window.playerPool = res.data;
            console.log('[CLOUD] Loaded player pool: ' + window.playerPool.length + ' players');
        }
    } catch (e) {
        console.warn('[CLOUD] Failed to load player pool:', e.message);
    }
}
