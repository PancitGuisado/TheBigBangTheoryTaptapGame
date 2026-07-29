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

console.log('Created pristine supabase.js');
