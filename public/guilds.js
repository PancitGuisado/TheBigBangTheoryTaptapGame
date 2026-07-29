// ============================================================
// GUILD SYSTEM
// ============================================================

var currentGuild = null;
var currentGuildMembers = [];

async function initGuildSystem() {
    if (typeof isGuest !== 'undefined' && isGuest) return;
    if (!currentUser) return;
    
    await fetchMyGuild();
}

async function fetchMyGuild() {
    try {
        // Find if user is in a guild. Fetch all to detect duplicates from a race condition bug
        const { data: memberDataList, error: memErr } = await db.from('guild_members')
            .select('guild_id, role, weekly_contribution, total_contribution')
            .eq('user_id', currentUser.id)
            .order('joined_at', { ascending: true });
            
        if (memErr) {
            console.error('[Guild] Error fetching member data:', memErr);
            return;
        }
        
        let memberData = null;
        if (memberDataList && memberDataList.length > 0) {
            memberData = memberDataList[0];
            
            // Auto-cleanup duplicate memberships if the user accidentally joined multiple
            if (memberDataList.length > 1) {
                for (let i = 1; i < memberDataList.length; i++) {
                    db.from('guild_members')
                        .delete()
                        .eq('user_id', currentUser.id)
                        .eq('guild_id', memberDataList[i].guild_id)
                        .then(() => console.log('Cleaned up duplicate guild membership'));
                }
            }
        }
        
        if (memberData && memberData.guild_id) {
            // Fetch guild details
            const { data: guildData, error: guildErr } = await db.from('guilds')
                .select('*')
                .eq('id', memberData.guild_id)
                .single();
                
            if (guildErr) {
                console.error('[Guild] Error fetching guild:', guildErr);
                return;
            }
            
            currentGuild = guildData;
            currentGuild.myRole = memberData.role;
            currentGuild.myWeeklyContribution = memberData.weekly_contribution;
            currentGuild.myTotalContribution = memberData.total_contribution;
            
            // Fetch all members
            await fetchGuildMembers(memberData.guild_id);
            updateGuildUI();
        } else {
            currentGuild = null;
            currentGuildMembers = [];
            updateGuildUI();
        }
    } catch (e) {
        console.error('[Guild] Exception fetching guild:', e);
    }
}

async function fetchGuildMembers(guildId) {
    // Keep our own power and username synced in the guild members table
    try {
        if (typeof db !== 'undefined' && db && typeof currentUser !== 'undefined' && currentUser && typeof calculateMyPower === 'function') {
            const myPower = calculateMyPower();
            const myName = (typeof state !== 'undefined' && state.profile && state.profile.name) ? state.profile.name : (currentUser.username || 'Player');
            await db.from('guild_members').update({ power: myPower, username: myName }).eq('user_id', currentUser.id).eq('guild_id', guildId);
        }
    } catch(e) { console.error('[Guild] sync error:', e); }

    const { data, error } = await db.from('guild_members')
        .select('*')
        .eq('guild_id', guildId)
        .order('power', { ascending: false });
        
    if (!error && data) {
        currentGuildMembers = data;
    }
}

function updateGuildUI() {
    // If the modal is open, refresh it
    const modal = document.getElementById('guild-hub-modal');
    if (modal && !modal.classList.contains('hidden')) {
        if (currentGuild) {
            renderGuildDashboard();
        } else {
            renderNoGuildScreen();
        }
    }
}

function openGuildHub() {
    if (typeof isGuest !== 'undefined' && isGuest) {
        if (typeof showConnectPrompt === 'function') showConnectPrompt();
        return;
    }
    
    const modal = document.getElementById('guild-hub-modal');
    if (modal) {
        modal.classList.remove('hidden');
        if (currentGuild) {
            renderGuildDashboard();
        } else {
            renderNoGuildScreen();
        }
    }
}

function closeGuildHub() {
    const modal = document.getElementById('guild-hub-modal');
    if (modal) modal.classList.add('hidden');
}

function renderNoGuildScreen() {
    const content = document.getElementById('guild-hub-content');
    if (!content) return;
    
    content.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full p-4 text-center">
            <div class="text-4xl mb-4">🏰</div>
            <h3 class="text-lg font-bold text-amber-500 mb-2">Join a Guild</h3>
            <p class="text-xs text-gray-400 mb-6 max-w-sm">Team up with other players, participate in epic guild raids, and climb the leaderboard together!</p>
            
            <div class="flex gap-4 w-full max-w-sm">
                <button onclick="openGuildSearch()" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg border border-blue-400 uppercase tracking-wider transition-transform hover:scale-105">
                    🔍 Browse Guilds
                </button>
                <button onclick="openGuildCreate()" class="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg shadow-lg border border-green-400 uppercase tracking-wider transition-transform hover:scale-105">
                    ✨ Create Guild
                </button>
            </div>
        </div>
    `;
}

function renderGuildDashboard() {
    const content = document.getElementById('guild-hub-content');
    if (!content) return;
    
    let membersHtml = '';
    currentGuildMembers.forEach(mem => {
        const isMe = mem.user_id === currentUser.id;
        const roleIcon = mem.role === 'leader' ? '👑' : mem.role === 'officer' ? '⚔️' : '👤';
        membersHtml += `
            <div class="flex justify-between items-center bg-slate-800/80 p-2 rounded border border-slate-700 ${isMe ? 'border-amber-500/50' : 'hover:bg-slate-700 transition-colors'}">
                <div class="flex items-center gap-2">
                    <span class="text-sm">${roleIcon}</span>
                    <div>
                        <div class="font-bold text-amber-100 text-xs">${mem.username}</div>
                        <div class="text-[9px] text-gray-400">Power: ${(mem.power || 0).toLocaleString()}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    ${!isMe ? `<button onclick="startSpectating('${mem.user_id}', '${mem.username}')" class="bg-cyan-950 text-cyan-400 border border-cyan-800 text-[8px] px-2 py-1 rounded font-bold uppercase hover:bg-cyan-900 transition-colors cursor-pointer shadow mr-1">👁️ VISIT</button><button onclick="startGuildPvP('${mem.user_id}', '${mem.username}', ${mem.power || 100})" class="bg-red-950 text-red-400 border border-red-800 text-[8px] px-2 py-1 rounded font-bold uppercase hover:bg-red-900 transition-colors cursor-pointer shadow">⚔️ SPARRING</button>` : ''}
                    ${isMe ? '<span class="bg-amber-600 text-white text-[8px] px-2 py-0.5 rounded font-bold uppercase">You</span>' : ''}
                </div>
            </div>
        `;
    });

    content.innerHTML = `
        <div class="flex flex-col h-full">
            <!-- Header -->
            <div class="flex items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-4 relative">
                <div class="text-4xl bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center border border-slate-600 shadow-inner">
                    ${currentGuild.icon || '🏰'}
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="bg-slate-700 text-amber-400 font-mono text-xs px-2 py-0.5 rounded border border-slate-600">[${currentGuild.tag}]</span>
                        <h2 class="text-lg font-bold text-white tracking-wide">${currentGuild.name}</h2>
                    </div>
                    <div class="flex gap-4 mt-1">
                        <div class="text-[10px] text-gray-400">Lvl <span class="text-green-400 font-bold">${currentGuild.level}</span></div>
                        <div class="text-[10px] text-gray-400">Members <span class="text-blue-400 font-bold">${currentGuildMembers.length}/${currentGuild.max_members}</span></div>
                        <div class="text-[10px] text-gray-400">Power <span class="text-purple-400 font-bold">${(currentGuild.total_power || 0).toLocaleString()}</span></div>
                    </div>
                </div>
            </div>
            
            <div class="text-xs text-gray-300 italic bg-slate-800/50 p-3 rounded mb-4 border border-slate-700">
                "${currentGuild.description || 'Welcome to our guild!'}"
            </div>
            
            <!-- Actions -->
            <div class="grid grid-cols-3 gap-3 mb-4">
                <button onclick="openGuildRaid()" class="bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 border border-red-500 rounded-lg p-3 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105">
                    <span class="text-2xl mb-1">⚔️</span>
                    <span class="font-bold text-white text-[10px] uppercase tracking-widest">Clan War</span>
                </button>
                <button onclick="openWarLineupBuilder()" class="bg-gradient-to-r from-amber-900 to-amber-700 hover:from-amber-800 hover:to-amber-600 border border-amber-500 rounded-lg p-3 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105">
                    <span class="text-2xl mb-1">🛡️</span>
                    <span class="font-bold text-white text-[10px] uppercase tracking-widest">War Lineup</span>
                </button>
                <button onclick="leaveGuild()" class="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 border border-slate-500 rounded-lg p-3 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105">
                    <span class="text-2xl mb-1">🚪</span>
                    <span class="font-bold text-white text-[10px] uppercase tracking-widest">Leave Guild</span>
                </button>
            </div>
            
            <!-- Member List -->
            <div class="flex-1 overflow-hidden flex flex-col">
                <h3 class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 border-b border-slate-700 pb-1">Members List</h3>
                <div class="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 pb-4">
                    ${membersHtml}
                </div>
            </div>
        </div>
    `;
}

// ------------------------------------------------------------------
// SEARCH & BROWSE
// ------------------------------------------------------------------
async function openGuildSearch() {
    closeGuildHub();
    
    // Create/show search modal
    let modal = document.getElementById('guild-search-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'guild-search-modal';
        modal.className = 'fixed inset-0 bg-black/80 z-[150] flex flex-col items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-slate-900 backdrop-blur-md border-2 border-blue-700 max-w-lg w-full h-[80vh] flex flex-col relative text-[12px] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <button onclick="closeGuildSearch()" class="absolute top-2 right-4 text-gray-500 hover:text-white font-bold text-2xl cursor-pointer z-10">&times;</button>
                <div class="border-b-4 border-blue-800 p-4 pb-3 text-center">
                    <h2 class="text-base font-bold tracking-widest text-blue-400 uppercase">🔍 Browse Guilds</h2>
                </div>
                
                <div class="p-4 border-b border-slate-700 flex gap-2">
                    <input type="text" id="guild-search-input" placeholder="Search by name or tag..." class="flex-1 bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded text-xs outline-none focus:border-blue-500">
                    <button onclick="performGuildSearch()" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold">Search</button>
                </div>
                
                <div id="guild-search-results" class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    <div class="text-center text-gray-500 mt-10">Loading guilds...</div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.classList.remove('hidden');
    }
    
    await performGuildSearch('');
}

function closeGuildSearch() {
    const modal = document.getElementById('guild-search-modal');
    if (modal) modal.classList.add('hidden');
    openGuildHub(); // Return to hub
}

async function performGuildSearch(query) {
    const q = query !== undefined ? query : document.getElementById('guild-search-input').value.trim();
    const resultsContainer = document.getElementById('guild-search-results');
    
    resultsContainer.innerHTML = '<div class="text-center text-gray-500 mt-10">Searching...</div>';
    
    let queryBuilder = db.from('guilds').select('*').eq('is_public', true).order('level', { ascending: false }).limit(20);
    
    if (q) {
        queryBuilder = queryBuilder.ilike('name', `%${q}%`);
    }
    
    const { data, error } = await queryBuilder;
    
    if (error) {
        resultsContainer.innerHTML = `<div class="text-center text-red-500 mt-10">Error: ${error.message}</div>`;
        return;
    }
    
    if (!data || data.length === 0) {
        resultsContainer.innerHTML = '<div class="text-center text-gray-500 mt-10">No guilds found.</div>';
        return;
    }
    
    let html = '';
    
    // We need member counts, but since we don't have a direct count column properly updated, 
    // we just let them try to join. Or we could fetch counts. For simplicity, we just show Join.
    data.forEach(g => {
        html += `
            <div class="bg-slate-800 rounded-lg p-3 border border-slate-700 flex justify-between items-center hover:border-blue-500 transition-colors">
                <div class="flex items-center gap-3">
                    <div class="text-2xl">${g.icon || '🏰'}</div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="bg-slate-700 text-amber-400 font-mono text-[9px] px-1 py-0.5 rounded">[${g.tag}]</span>
                            <span class="font-bold text-white text-sm">${g.name}</span>
                        </div>
                        <div class="text-[10px] text-gray-400 mt-1">Lvl ${g.level} | Power: ${(g.total_power || 0).toLocaleString()}</div>
                    </div>
                </div>
                <button onclick="joinGuild('${g.id}')" class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold text-[10px] uppercase tracking-wider">
                    Join
                </button>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

// ------------------------------------------------------------------
// CREATE GUILD
// ------------------------------------------------------------------
function openGuildCreate() {
    closeGuildHub();
    
    let modal = document.getElementById('guild-create-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'guild-create-modal';
        modal.className = 'fixed inset-0 bg-black/80 z-[150] flex flex-col items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-slate-900 backdrop-blur-md border-2 border-green-700 max-w-sm w-full p-6 relative text-[12px] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <button onclick="closeGuildCreate()" class="absolute top-2 right-4 text-gray-500 hover:text-white font-bold text-2xl cursor-pointer z-10">&times;</button>
                <div class="border-b-4 border-green-800 pb-3 mb-4 text-center">
                    <h2 class="text-base font-bold tracking-widest text-green-400 uppercase">✨ Create Guild</h2>
                    <p class="text-[9px] text-gray-400 mt-1">Cost: 1000 Money</p>
                </div>
                
                <div class="flex flex-col gap-3">
                    <div>
                        <label class="block text-gray-400 text-[10px] uppercase font-bold mb-1">Guild Name</label>
                        <input type="text" id="guild-create-name" placeholder="e.g. Physics Dept" class="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded outline-none focus:border-green-500" maxlength="20">
                    </div>
                    <div>
                        <label class="block text-gray-400 text-[10px] uppercase font-bold mb-1">Tag (3-4 letters)</label>
                        <input type="text" id="guild-create-tag" placeholder="e.g. PHY" class="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded outline-none focus:border-green-500 uppercase" maxlength="4">
                    </div>
                    <div>
                        <label class="block text-gray-400 text-[10px] uppercase font-bold mb-1">Description</label>
                        <textarea id="guild-create-desc" placeholder="Welcome message..." class="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded outline-none focus:border-green-500 h-16 resize-none" maxlength="100"></textarea>
                    </div>
                    
                    <div id="guild-create-error" class="text-red-500 text-center font-bold text-[10px] hidden"></div>
                    
                    <button id="guild-create-btn" onclick="submitGuildCreate()" class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded shadow-lg border border-green-400 uppercase tracking-wider mt-2">
                        Create Guild
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.classList.remove('hidden');
        document.getElementById('guild-create-name').value = '';
        document.getElementById('guild-create-tag').value = '';
        document.getElementById('guild-create-desc').value = '';
        document.getElementById('guild-create-error').classList.add('hidden');
    }
}

function closeGuildCreate() {
    const modal = document.getElementById('guild-create-modal');
    if (modal) modal.classList.add('hidden');
    openGuildHub(); // Return to hub
}

function calculateMyPower() {
    let power = 0;
    if (state && state.roster) {
        for (let key in state.roster) {
            if (state.roster[key].level > 0) {
                power += state.roster[key].level * 10;
            }
        }
    }
    return power;
}

async function submitGuildCreate() {
    const name = document.getElementById('guild-create-name').value.trim();
    const tag = document.getElementById('guild-create-tag').value.trim().toUpperCase();
    const desc = document.getElementById('guild-create-desc').value.trim();
    const errEl = document.getElementById('guild-create-error');
    const btn = document.getElementById('guild-create-btn');
    
    if (!name || name.length < 3) { errEl.textContent = 'Name must be at least 3 characters'; errEl.classList.remove('hidden'); return; }
    if (!tag || tag.length < 3) { errEl.textContent = 'Tag must be 3-4 characters'; errEl.classList.remove('hidden'); return; }
    if (!state.resources || state.resources.money < 1000) { errEl.textContent = 'Not enough money (Cost: 1000)'; errEl.classList.remove('hidden'); return; }
    
    btn.disabled = true;
    btn.textContent = 'Creating...';
    errEl.classList.add('hidden');
    
    try {
        const myPower = calculateMyPower();
        
        // 1. Insert into guilds
        const { data: guildData, error: guildErr } = await db.from('guilds')
            .insert({
                name: name,
                tag: tag,
                description: desc,
                leader_id: currentUser.id,
                total_power: myPower
            })
            .select('id')
            .single();
            
        if (guildErr) throw guildErr;
        
        // 2. Insert into guild_members
        const { error: memErr } = await db.from('guild_members')
            .insert({
                guild_id: guildData.id,
                user_id: currentUser.id,
                username: currentUser.username || 'Player',
                role: 'leader',
                power: myPower
            });
            
        if (memErr) throw memErr;
        
        // 3. Update profile
        await db.from('profiles').update({ guild_id: guildData.id }).eq('id', currentUser.id);
        
        // Deduct money
        state.resources.money -= 1000;
        if (typeof updateResourceCounters === 'function') updateResourceCounters();
        if (typeof saveProgress === 'function') saveProgress();
        
        // Refresh guild state
        await fetchMyGuild();
        
        closeGuildCreate();
        openGuildHub(); // Should now show dashboard
        
    } catch (e) {
        console.error(e);
        errEl.textContent = 'Error: ' + e.message;
        errEl.classList.remove('hidden');
        btn.disabled = false;
        btn.textContent = 'Create Guild';
    }
}

// ------------------------------------------------------------------
// JOIN GUILD
// ------------------------------------------------------------------
async function joinGuild(guildId) {
    if (typeof showGameConfirm === 'function') {
        showGameConfirm('Join Guild', 'Are you sure you want to join this guild?', async () => {
            await executeJoinGuild(guildId);
        });
    } else {
        if (confirm('Join this guild?')) {
            await executeJoinGuild(guildId);
        }
    }
}

async function executeJoinGuild(guildId) {
    try {
        const myPower = calculateMyPower();
        
        // Prevent duplicate joins (race condition)
        const { data: existing, error: errCheck } = await db.from('guild_members')
            .select('guild_id')
            .eq('user_id', currentUser.id)
            .limit(1);
            
        if (existing && existing.length > 0) {
            if (typeof showGameAlert === 'function') showGameAlert('Error', 'You are already in a guild!');
            else alert('You are already in a guild!');
            return;
        }
        
        // Insert member
        const { error: memErr } = await db.from('guild_members')
            .insert({
                guild_id: guildId,
                user_id: currentUser.id,
                username: currentUser.username || 'Player',
                role: 'member',
                power: myPower
            });
            
        if (memErr) {
            if (typeof showGameAlert === 'function') showGameAlert('Error', 'Could not join: ' + memErr.message);
            else alert('Could not join: ' + memErr.message);
            return;
        }
        
        // Update guild total power manually (since we don't have an RPC)
        const { data: gData } = await db.from('guilds').select('total_power').eq('id', guildId).single();
        if (gData) {
            await db.from('guilds').update({ total_power: (gData.total_power || 0) + myPower }).eq('id', guildId);
        }
        
        // Update profile
        await db.from('profiles').update({ guild_id: guildId }).eq('id', currentUser.id);
        
        if (typeof showGameAlert === 'function') showGameAlert('Success', 'Successfully joined the guild!');
        else alert('Successfully joined the guild!');
        closeGuildSearch();
        await fetchMyGuild();
        openGuildHub();
        
    } catch (e) {
        console.error(e);
        if (typeof showGameAlert === 'function') showGameAlert('Error', 'Error joining guild: ' + e.message);
        else alert('Error joining guild: ' + e.message);
    }
}

// ------------------------------------------------------------------
// LEAVE GUILD
// ------------------------------------------------------------------
async function leaveGuild() {
    if (!currentGuild) return;
    
    if (currentGuild.myRole === 'leader' && currentGuildMembers.length > 1) {
        if (typeof showGameAlert === 'function') showGameAlert('Action Blocked', 'You must transfer leadership or kick all members before leaving.');
        else alert('You must transfer leadership or kick all members before leaving.');
        return;
    }
    
    if (typeof showGameConfirm === 'function') {
        showGameConfirm('Leave Guild', 'Are you sure you want to leave this guild?', async () => {
            await executeLeaveGuild();
        });
    } else {
        if (confirm('Are you sure you want to leave this guild?')) {
            await executeLeaveGuild();
        }
    }
}

async function executeLeaveGuild() {
    try {
        // Delete member
        const { error: memErr } = await db.from('guild_members')
            .delete()
            .eq('guild_id', currentGuild.id)
            .eq('user_id', currentUser.id);
            
        if (memErr) throw memErr;
        
        // If leader and last member, delete guild
        if (currentGuild.myRole === 'leader' && currentGuildMembers.length === 1) {
            await db.from('guilds').delete().eq('id', currentGuild.id);
        } else {
            const myPower = calculateMyPower();
            const { data: gData } = await db.from('guilds').select('total_power').eq('id', currentGuild.id).single();
            if (gData) {
                await db.from('guilds').update({ total_power: Math.max(0, (gData.total_power || 0) - myPower) }).eq('id', currentGuild.id);
            }
        }
        
        // Update profile
        await db.from('profiles').update({ guild_id: null }).eq('id', currentUser.id);
        
        currentGuild = null;
        currentGuildMembers = [];
        renderNoGuildScreen();
        
    } catch (e) {
        console.error(e);
        if (typeof showGameAlert === 'function') showGameAlert('Error', 'Error leaving guild: ' + e.message);
        else alert('Error leaving guild: ' + e.message);
    }
}

// ------------------------------------------------------------------
// CLAN WAR
// ------------------------------------------------------------------
// Clan War system is now in guild_raids.js
// openGuildRaid() defined there with full CoC-style clan war system

// ============================================================
// FRIENDLY GUILD PVP SPARRING
// ============================================================

window.startGuildPvP = async function(userId, username, power) {
    if (userId === currentUser.id) return;
    
    // Close guild hub
    var hub = document.getElementById('guild-hub-modal');
    if (hub) hub.classList.add('hidden');
    
    // Show loading
    var loading = document.createElement('div');
    loading.id = 'pvp-loading-overlay';
    loading.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;flex-direction:column;gap:10px;';
    loading.innerHTML = '<div style="font-size:40px;animation:spin 1s linear infinite;">?</div><div>Fetching Opponent Data...</div>';
    document.body.appendChild(loading);
    
    var oppTeam = [];
    
    try {
        // Attempt to fetch actual game state
        var res = await db.from('game_saves').select('state').eq('id', userId).maybeSingle();
        
        if (res && res.data && res.data.state) {
            var st = res.data.state;
            if (st.pvp && st.pvp.lineup && st.pvp.lineup.length > 0) {
                // Use the opponent's PvP lineup
                st.pvp.lineup.forEach(function(slot) {
                    var lvl = 1;
                    var skin = 'default';
                    if (slot.type === 'char' && st.roster[slot.key]) {
                        lvl = st.roster[slot.key].level;
                        if (st.roster[slot.key].activeSkin) skin = st.roster[slot.key].activeSkin;
                    }
                    if (slot.type === 'bot' && st.robotRoster && st.robotRoster[slot.key]) lvl = st.robotRoster[slot.key].level;
                    oppTeam.push({ type: slot.type, key: slot.key, level: lvl, lane: slot.lane, skin: skin });
                });
            } else if (st.formation) {
                // Fallback to Arena formation if no PvP lineup exists
                var f = st.formation;
                ['front', 'mid', 'back'].forEach(function(lane) {
                    if (f[lane]) {
                        f[lane].forEach(function(slot) {
                            if (slot) {
                                var lvl = 1;
                                var skin = 'default';
                                if (slot.type === 'char' && st.roster[slot.key]) {
                                    lvl = st.roster[slot.key].level;
                                    if (st.roster[slot.key].activeSkin) skin = st.roster[slot.key].activeSkin;
                                }
                                if (slot.type === 'bot' && st.robotRoster && st.robotRoster[slot.key]) lvl = st.robotRoster[slot.key].level;
                                oppTeam.push({ type: slot.type, key: slot.key, level: lvl, skin: skin });
                            }
                        });
                    }
                });
            }
        }
    } catch (e) {
        console.warn("Could not fetch opponent save data, generating mock team");
    }
    
    // Fallback if no valid save or no characters equipped
    if (oppTeam.length === 0) {
        // Generate a mock team roughly based on power
        // 1 power ~ 5-10 avg level of team
        var avgLevel = Math.max(1, Math.floor(power / 500));
        var charKeys = Object.keys(characters);
        var teamSize = Math.min(5, Math.max(3, Math.floor(avgLevel / 10)));
        var shuffled = charKeys.sort(function() { return 0.5 - Math.random(); });
        for (var j = 0; j < teamSize; j++) {
            oppTeam.push({ type: 'char', key: shuffled[j], level: avgLevel });
        }
    }
    
    document.getElementById('pvp-loading-overlay').remove();
    
    // Setup PvP Environment
    if (typeof initPvP === 'function') initPvP();
    
    var opp = {
        name: username,
        team: oppTeam,
        trophies: 0,
        league: "Friendly",
        isFriendly: true
    };
    
    window._pvpOpponents = window._pvpOpponents || [];
    window._pvpOpponents.push(opp);
    
    var index = window._pvpOpponents.length - 1;
    startPvpBattle(index);
};
