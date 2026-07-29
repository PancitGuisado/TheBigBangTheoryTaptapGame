// =====================================================
// PLAYER PROFILE — Profile box, avatar, name, bio, flags
// =====================================================
(function() {
    'use strict';

    // Available profile avatars from TBBT
    var AVATARS = [
        { key: 'sheldon', name: 'Sheldon', src: 'avatars/sheldon.png' },
        { key: 'leonard', name: 'Leonard', src: 'avatars/leonard.jpg' },
        { key: 'penny', name: 'Penny', src: 'avatars/penny.jpg' },
        { key: 'howard', name: 'Howard', src: 'avatars/howard.jpg' },
        { key: 'raj', name: 'Raj', src: 'avatars/raj.jpg' }
    ];

    // Available flags
    var FLAGS = [
        '🇺🇸','🇬🇧','🇨🇦','🇦🇺','🇩🇪','🇫🇷','🇯🇵','🇰🇷','🇧🇷','🇲🇽',
        '🇮🇳','🇮🇹','🇪🇸','🇵🇹','🇷🇺','🇨🇳','🇵🇭','🇹🇭','🇻🇳','🇮🇩',
        '🇳🇱','🇸🇪','🇳🇴','🇩🇰','🇫🇮','🇵🇱','🇹🇷','🇸🇦','🇦🇪','🇿🇦',
        '🇦🇷','🇨🇱','🇨🇴','🇵🇪','🇪🇬','🇳🇬','🇰🇪','🇵🇰','🇧🇩','🇲🇾',
        '🇸🇬','🇭🇰','🇹🇼','🇮🇱','🇬🇷','🇨🇿','🇷🇴','🇭🇺','🇺🇦','🇮🇪',
        '🏳️‍🌈','🏴‍☠️','🚩','⚛️','🔬','🧪','🚀','🎮','🎯','🏆'
    ];

    function ensureProfileState() {
        if (typeof state === 'undefined') return;
        if (!state.profile) {
            state.profile = {
                name: 'Player',
                avatar: 'sheldon',
                bio: '',
                flag: '🇺🇸',
                nameChanged: false
            };
        }
    }

    // Global getter for other systems (leaderboard, guild, friends)
    window.getPlayerProfile = function() {
        ensureProfileState();
        return state.profile;
    };

    window.getPlayerAvatarSrc = function() {
        ensureProfileState();
        var av = AVATARS.find(function(a) { return a.key === state.profile.avatar; });
        return av ? av.src : AVATARS[0].src;
    };

    window.getPlayerDisplayName = function() {
        ensureProfileState();
        return (state.profile.flag || '') + ' ' + (state.profile.name || 'Player');
    };

    // Create the profile box in upper left
    function createProfileBox() {
        if (document.getElementById('profile-box')) return;
        ensureProfileState();

        var topBar = document.querySelector('.absolute.top-0.left-0.right-0.z-50');
        if (!topBar) return;

        var box = document.createElement('div');
        box.id = 'profile-box';
        box.onclick = function(e) { e.stopPropagation(); openProfileModal(); };
        box.style.cssText = 'cursor:pointer;display:flex;align-items:center;gap:4px;margin-right:6px;flex-shrink:0;padding:1px 4px 1px 1px;border-radius:6px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);transition:all 0.2s;';
        box.onmouseenter = function() { this.style.background = 'rgba(255,255,255,0.12)'; this.style.borderColor = 'rgba(59,130,246,0.4)'; };
        box.onmouseleave = function() { this.style.background = 'rgba(255,255,255,0.05)'; this.style.borderColor = 'rgba(255,255,255,0.08)'; };

        updateProfileBox(box);
        topBar.insertBefore(box, topBar.firstChild);
    }

    function updateProfileBox(box) {
        if (!box) box = document.getElementById('profile-box');
        if (!box) return;
        ensureProfileState();

        var avatarSrc = window.getPlayerAvatarSrc();
        var name = state.profile.name || 'Player';
        var flag = state.profile.flag || '';
        var truncName = name.length > 8 ? name.substring(0, 7) + '…' : name;

        box.innerHTML = '<img src="' + avatarSrc + '" style="width:20px;height:20px;border-radius:4px;object-fit:cover;border:1px solid rgba(59,130,246,0.3);" alt="avatar">' +
            '<span style="font-size:7px;color:#93c5fd;font-weight:bold;white-space:nowrap;">' + flag + ' ' + truncName + '</span>';
    }

    // Profile modal
    window.openProfileModal = function() {
        ensureProfileState();
        var existing = document.getElementById('profile-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'profile-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:12px;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

        renderProfileModal(modal);
        document.body.appendChild(modal);
    };

    function renderProfileModal(modal) {
        if (!modal) modal = document.getElementById('profile-modal');
        if (!modal) return;
        ensureProfileState();

        var p = state.profile;
        var defaultName = (typeof currentUser !== 'undefined' && currentUser && currentUser.username) ? currentUser.username : ((typeof state !== 'undefined' && state.guestName) ? state.guestName : 'Player');
        var displayName = p.name || defaultName;
        var avatarSrc = window.getPlayerAvatarSrc();
        var currentAvatar = AVATARS.find(function(a) { return a.key === p.avatar; });

        var html = '<div style="background:linear-gradient(135deg,rgba(15,23,42,0.98),rgba(10,15,30,0.98));border:2px solid rgba(59,130,246,0.4);border-radius:16px;max-width:380px;width:100%;padding:0;max-height:85vh;overflow-y:auto;box-shadow:0 0 60px rgba(59,130,246,0.15);" onclick="event.stopPropagation()">';

        // Header with avatar preview
        html += '<div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:16px;border-bottom:2px solid #3b82f6;text-align:center;position:relative;">';
        html += '<div style="position:absolute;top:10px;right:14px;"><button onclick="document.getElementById(\'profile-modal\').remove()" style="color:#93c5fd;font-size:18px;cursor:pointer;background:rgba(0,0,0,0.3);border:1px solid #3b82f6;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;">×</button></div>';
        html += '<img src="' + avatarSrc + '" style="width:72px;height:72px;border-radius:12px;object-fit:cover;border:3px solid #fbbf24;box-shadow:0 0 20px rgba(251,191,36,0.3);margin:0 auto;" alt="avatar">';
        html += '<div style="margin-top:6px;font-size:14px;font-weight:900;color:white;">' + (p.flag || '') + ' ' + displayName + '</div>';
        if (p.bio) html += '<div style="font-size:8px;color:#93c5fd;margin-top:2px;font-style:italic;">"' + p.bio + '"</div>';
        html += '</div>';

        // Stats summary
        html += '<div style="display:flex;justify-content:space-around;padding:8px 12px;background:rgba(0,0,0,0.3);border-bottom:1px solid rgba(59,130,246,0.15);">';
        var wave = (typeof state !== 'undefined' && state.wave) || 1;
        var chars = (typeof state !== 'undefined' && state.roster) ? Object.keys(state.roster).length : 0;
        var prestige = (typeof state !== 'undefined' && state.prestige) || 0;
        html += '<div style="text-align:center;"><div style="font-size:10px;font-weight:900;color:#fbbf24;">' + wave + '</div><div style="font-size:6px;color:#6b7280;">WAVE</div></div>';
        html += '<div style="text-align:center;"><div style="font-size:10px;font-weight:900;color:#34d399;">' + chars + '</div><div style="font-size:6px;color:#6b7280;">CHARS</div></div>';
        html += '<div style="text-align:center;"><div style="font-size:10px;font-weight:900;color:#c084fc;">' + prestige + '</div><div style="font-size:6px;color:#6b7280;">PRESTIGE</div></div>';
        html += '</div>';

        // Change Name section
        html += '<div style="padding:12px 16px;">';
        html += '<div style="font-size:8px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;margin-bottom:6px;letter-spacing:1px;">PLAYER NAME</div>';
        if (p.nameChanged) {
            html += '<div style="display:flex;align-items:center;gap:6px;">';
            html += '<div style="flex:1;padding:6px 8px;background:rgba(0,0,0,0.4);border:1px solid rgba(100,100,130,0.2);border-radius:6px;font-size:10px;color:white;">' + displayName + '</div>';
            html += '<div style="font-size:6px;color:#ef4444;">Name already changed</div>';
            html += '</div>';
        } else {
            html += '<div style="display:flex;align-items:center;gap:4px;">';
            html += '<input id="profile-name-input" type="text" maxlength="16" value="' + displayName.replace(/"/g, '&quot;') + '" style="flex:1;padding:6px 8px;background:rgba(0,0,0,0.4);border:1px solid rgba(59,130,246,0.3);border-radius:6px;font-size:10px;color:white;outline:none;font-family:inherit;" placeholder="Enter name...">';
            html += '<button onclick="saveProfileName()" style="padding:6px 10px;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;font-size:8px;font-weight:bold;border:1px solid #3b82f6;border-radius:6px;cursor:pointer;white-space:nowrap;">SAVE ✏️</button>';
            html += '</div>';
            html += '<div style="font-size:6px;color:#f59e0b;margin-top:3px;">⚠️ You can only change your name once!</div>';
        }
        html += '</div>';

        // Bio section
        html += '<div style="padding:0 16px 12px;">';
        html += '<div style="font-size:8px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;margin-bottom:6px;letter-spacing:1px;">BIO</div>';
        html += '<div style="display:flex;align-items:center;gap:4px;">';
        html += '<input id="profile-bio-input" type="text" maxlength="60" value="' + (p.bio || '').replace(/"/g, '&quot;') + '" style="flex:1;padding:6px 8px;background:rgba(0,0,0,0.4);border:1px solid rgba(59,130,246,0.2);border-radius:6px;font-size:9px;color:#93c5fd;outline:none;font-style:italic;" placeholder="Write something about yourself...">';
        html += '<button onclick="saveProfileBio()" style="padding:6px 8px;background:rgba(59,130,246,0.2);color:#93c5fd;font-size:8px;border:1px solid rgba(59,130,246,0.3);border-radius:6px;cursor:pointer;">OK</button>';
        html += '</div></div>';

        // Avatar selection
        html += '<div style="padding:0 16px 12px;">';
        html += '<div style="font-size:8px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;margin-bottom:6px;letter-spacing:1px;">AVATAR</div>';
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">';
        for (var i = 0; i < AVATARS.length; i++) {
            var a = AVATARS[i];
            var isActive = p.avatar === a.key;
            html += '<div onclick="setProfileAvatar(\'' + a.key + '\')" style="cursor:pointer;text-align:center;transition:all 0.2s;' + (isActive ? 'transform:scale(1.1);' : '') + '">';
            html += '<img src="' + a.src + '" style="width:48px;height:48px;border-radius:8px;object-fit:cover;border:2px solid ' + (isActive ? '#fbbf24' : 'rgba(100,100,130,0.3)') + ';box-shadow:' + (isActive ? '0 0 12px rgba(251,191,36,0.4)' : 'none') + ';" alt="' + a.name + '">';
            html += '<div style="font-size:6px;color:' + (isActive ? '#fbbf24' : 'rgba(255,255,255,0.3)') + ';margin-top:2px;font-weight:' + (isActive ? 'bold' : 'normal') + ';">' + a.name + '</div>';
            html += '</div>';
        }
        html += '</div></div>';

        // Flag selection
        html += '<div style="padding:0 16px 16px;">';
        html += '<div style="font-size:8px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;margin-bottom:6px;letter-spacing:1px;">FLAG</div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:3px;max-height:80px;overflow-y:auto;background:rgba(0,0,0,0.3);padding:6px;border-radius:8px;border:1px solid rgba(100,100,130,0.15);">';
        for (var f = 0; f < FLAGS.length; f++) {
            var isActiveFlag = p.flag === FLAGS[f];
            html += '<span onclick="setProfileFlag(\'' + FLAGS[f].replace(/'/g, "\\'") + '\')" style="cursor:pointer;font-size:16px;padding:2px 3px;border-radius:4px;border:1px solid ' + (isActiveFlag ? '#fbbf24' : 'transparent') + ';background:' + (isActiveFlag ? 'rgba(251,191,36,0.15)' : 'transparent') + ';transition:all 0.15s;" title="' + FLAGS[f] + '">' + FLAGS[f] + '</span>';
        }
        html += '</div></div>';

        html += '</div>';
        modal.innerHTML = html;
    }

    // Action functions
    window.saveProfileName = function() {
        ensureProfileState();
        var input = document.getElementById('profile-name-input');
        if (!input) return;
        var name = input.value.trim();
        if (name.length < 2) { if (typeof showToast === 'function') showToast('Name must be at least 2 characters!'); return; }
        if (name.length > 16) name = name.substring(0, 16);

        state.profile.name = name;
        state.profile.nameChanged = true;

        // Sync name to ALL systems: auth, guest, green bar
        if (typeof currentUser !== 'undefined' && currentUser) {
            currentUser.username = name;      // Updates green bar & leaderboard display
            currentUser.displayName = name;
        }
        if (typeof state !== 'undefined') state.guestName = name;

        // Push to Supabase so guild, leaderboard, friends all see the new name
        if (typeof db !== 'undefined' && db && typeof currentUser !== 'undefined' && currentUser && currentUser.id) {
            db.from('profiles').upsert({ id: currentUser.id, username: name }).then(function(r) { if (r.error) console.error('[Profile] profiles update:', r.error); });
            db.from('leaderboard').update({ username: name }).eq('id', currentUser.id).then(function(r) { if (r.error) console.error('[Profile] leaderboard update:', r.error); });
            db.from('guild_members').update({ username: name }).eq('user_id', currentUser.id).then(function(r) { if (r.error) console.error('[Profile] guild update:', r.error); });
        }

        if (typeof saveProgress === 'function') saveProgress();
        // Refresh the green online status bar immediately
        if (typeof updateOnlineStatus === 'function') updateOnlineStatus();
        if (typeof showToast === 'function') showToast('✏️ Name set to "' + name + '"! (One-time change used)');
        updateProfileBox();
        renderProfileModal();
    };

    window.saveProfileBio = function() {
        ensureProfileState();
        var input = document.getElementById('profile-bio-input');
        if (!input) return;
        state.profile.bio = input.value.trim().substring(0, 60);
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof showToast === 'function') showToast('📝 Bio updated!');
        renderProfileModal();
    };

    window.setProfileAvatar = function(key) {
        ensureProfileState();
        state.profile.avatar = key;
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof showToast === 'function') {
            var av = AVATARS.find(function(a) { return a.key === key; });
            showToast('🖼️ Avatar set to ' + (av ? av.name : key) + '!');
        }
        updateProfileBox();
        renderProfileModal();
    };

    window.setProfileFlag = function(flag) {
        ensureProfileState();
        state.profile.flag = flag;
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof showToast === 'function') showToast(flag + ' Flag equipped!');
        updateProfileBox();
        renderProfileModal();
    };

    // Init
    function init() {
        ensureProfileState();
        createProfileBox();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 1500); });
    } else {
        setTimeout(init, 1500);
    }

    console.log('[PlayerProfile] Player profile system loaded. ' + AVATARS.length + ' avatars, ' + FLAGS.length + ' flags.');
})();
