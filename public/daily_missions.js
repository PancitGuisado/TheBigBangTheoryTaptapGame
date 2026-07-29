(function() {
    /* ========== INJECTED STYLES ========== */
    var css = document.createElement('style');
    css.textContent = [
        '@keyframes dm-bar-fill { from { width: 0; } to { width: var(--fill); } }',
        '@keyframes dm-card-in { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }',
        '.dm-card { animation: dm-card-in .35s ease-out both; }',
        '.dm-card:nth-child(2) { animation-delay:.08s; }',
        '.dm-card:nth-child(3) { animation-delay:.16s; }',
        '.dm-bar-inner { animation: dm-bar-fill .6s ease-out both; }',
        '.dm-overlay { position:fixed;inset:0;z-index:100001;display:flex;align-items:center;justify-content:center;',
        '  background:rgba(0,0,0,.82);backdrop-filter:blur(6px); }',
        '.dm-modal { width:92%;max-width:420px;max-height:88vh;overflow-y:auto;border-radius:14px;',
        '  background:linear-gradient(160deg,#0f172a,#1e293b);border:2px solid rgba(245,158,11,.35);',
        '  box-shadow:0 0 40px rgba(0,0,0,.7),0 0 80px rgba(245,158,11,.08);padding:20px 16px;box-sizing:border-box; }',
        '.dm-claim-btn { background:linear-gradient(135deg,#16a34a,#15803d);border:1px solid #22c55e;',
        '  color:#fff;font-weight:700;padding:5px 14px;box-sizing:border-box;border-radius:6px;cursor:pointer;font-size:11px;',
        '  transition:all .15s;text-shadow:0 1px 2px rgba(0,0,0,.4); }',
        '.dm-claim-btn:hover { transform:scale(1.06);box-shadow:0 0 12px rgba(34,197,94,.4); }',
        '.dm-claim-btn:disabled { background:#334155;border-color:#475569;color:#64748b;cursor:default;transform:none;box-shadow:none; }'
    ].join('\n');
    document.head.appendChild(css);

    /* ========== MISSION POOL ========== */
    var POOL = [
        { id:'kill_enemies', desc:'Defeat 50 enemies', icon:'\u{1F480}', target:50, reward:{money:200,freePull:1} },
        { id:'kill_boss', desc:'Defeat 1 Boss', icon:'\u{1F479}', target:1, reward:{diamond:5} },
        { id:'do_pulls', desc:'Do 3 Gacha Pulls', icon:'\u{1F3B0}', target:3, reward:{money:500} },
        { id:'level_char', desc:'Level Up Any Character', icon:'\u2B06\uFE0F', target:1, reward:{food:{random:5}} },
        { id:'win_pvp', desc:'Win 1 PVP Battle', icon:'\u{1F3C6}', target:1, reward:{money:300,diamond:3} },
        { id:'use_food', desc:'Use 5 Food Items', icon:'\u{1F354}', target:5, reward:{scrap:20,iron:20} },
        { id:'earn_money', desc:'Earn 1000 Money', icon:'\u{1F4B0}', target:1000, reward:{diamond:2,scrap:10} },
        { id:'craft_robot', desc:'Start Crafting a Robot', icon:'\u{1F916}', target:1, reward:{money:400} }
    ];

    var FOOD_KEYS = ['chinese','pizza','cupcakes','burger','tacos','indian','hotdog','pretzel','smoothie','energydrink','cheesecake','shawarma'];
    var REWARD_ICONS = { money:'\u{1F4B5}', diamond:'\u{1F48E}', freePull:'\u{1F3AB}', scrap:'\u{1F529}', iron:'\u2699\uFE0F', food:'\u{1F355}' };

    /* ========== HELPERS ========== */
    function todayStr() { return new Date().toISOString().slice(0, 10); }

    function pick3(seed) {
        // Seeded shuffle based on date string so same day = same missions
        var pool = POOL.slice();
        var hash = 0;
        for (var i = 0; i < seed.length; i++) hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
        for (var j = pool.length - 1; j > 0; j--) {
            hash = (hash * 16807 + 1) & 0x7fffffff;
            var k = hash % (j + 1);
            var t = pool[j]; pool[j] = pool[k]; pool[k] = t;
        }
        return pool.slice(0, 3).map(function(m) {
            return { id:m.id, desc:m.desc, icon:m.icon, target:m.target, progress:0, reward:m.reward, completed:false, claimed:false };
        });
    }

    function ensureState() {
        if (!state.dailyMissions) state.dailyMissions = { missions:[], lastRefresh:'', completedToday:0 };
        var today = todayStr();
        if (state.dailyMissions.lastRefresh !== today) {
            state.dailyMissions.missions = pick3(today);
            state.dailyMissions.lastRefresh = today;
            state.dailyMissions.completedToday = 0;
        }
    }

    function showToast(msg) {
        if (!window.gameStarted) return;
        var el = document.createElement('div');
        el.textContent = msg;
        el.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:100010;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;padding:8px 18px;box-sizing:border-box;border-radius:8px;font-size:12px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,.5);pointer-events:none;opacity:0;transition:opacity .3s;';
        document.body.appendChild(el);
        requestAnimationFrame(function() { el.style.opacity = '1'; });
        setTimeout(function() { el.style.opacity = '0'; setTimeout(function() { el.remove(); }, 350); }, 2500);
    }

    function updateBadge() {
        var badge = document.getElementById('daily-mission-badge');
        if (!badge) return;
        var count = getDailyMissionBadgeCount();
        if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); }
        else { badge.classList.add('hidden'); }
    }

    /* ========== PROGRESS TRACKING ========== */
    window.trackDailyMission = function(type, amount) {
        ensureState();
        var missions = state.dailyMissions.missions;
        for (var i = 0; i < missions.length; i++) {
            var m = missions[i];
            if (m.id === type && !m.completed) {
                m.progress = Math.min(m.progress + (amount || 1), m.target);
                if (m.progress >= m.target) {
                    m.completed = true;
                    showToast('\u{1F3AF} Mission Complete: ' + m.desc + '!');
                    updateBadge();
                }
                if (typeof saveProgress === 'function') saveProgress();
                return;
            }
        }
    };

    /* ========== REWARD CLAIMING ========== */
    function applyRewards(reward) {
        var lines = [];
        if (reward.money) { state.resources.money = (state.resources.money || 0) + reward.money; lines.push('\u{1F4B5} $' + reward.money); }
        if (reward.diamond) { state.resources.diamond = (state.resources.diamond || 0) + reward.diamond; lines.push('\u{1F48E} ' + reward.diamond + ' Diamonds'); }
        if (reward.scrap) { state.resources.scrap = (state.resources.scrap || 0) + reward.scrap; lines.push('\u{1F529} ' + reward.scrap + ' Scrap'); }
        if (reward.iron) { state.resources.iron = (state.resources.iron || 0) + reward.iron; lines.push('\u2699\uFE0F ' + reward.iron + ' Iron'); }
        if (reward.freePull) {
            if (!state.gacha) state.gacha = {};
            state.gacha.freePulls = (state.gacha.freePulls || 0) + reward.freePull;
            lines.push('\u{1F3AB} ' + reward.freePull + ' Free Pull(s)');
        }
        if (reward.food && reward.food.random) {
            if (!state.food) state.food = {};
            for (var i = 0; i < reward.food.random; i++) {
                var key = FOOD_KEYS[Math.floor(Math.random() * FOOD_KEYS.length)];
                state.food[key] = (state.food[key] || 0) + 1;
            }
            lines.push('\u{1F355} ' + reward.food.random + ' Random Food');
        }
        return lines;
    }

    window.claimMissionReward = function(missionId) {
        ensureState();
        var missions = state.dailyMissions.missions;
        for (var i = 0; i < missions.length; i++) {
            var m = missions[i];
            if (m.id === missionId && m.completed && !m.claimed) {
                m.claimed = true;
                state.dailyMissions.completedToday = (state.dailyMissions.completedToday || 0) + 1;
                var lines = applyRewards(m.reward);
                if (typeof showGameAlert === 'function') showGameAlert('Mission Reward', lines.join('\n'));
                else showToast('Claimed: ' + lines.join(', '));
                // Check all-complete bonus
                var allClaimed = missions.every(function(x) { return x.claimed; });
                if (allClaimed) {
                    var bonus = applyRewards({ diamond: 10, money: 1000 });
                    setTimeout(function() {
                        if (typeof showGameAlert === 'function') showGameAlert('\u{1F31F} ALL MISSIONS COMPLETE!', bonus.join('\n'));
                        else showToast('\u{1F31F} Bonus: ' + bonus.join(', '));
                    }, 600);
                }
                if (typeof saveProgress === 'function') saveProgress();
                if (typeof syncUI === 'function') syncUI();
                updateBadge();
                renderMissionsUI();
                return;
            }
        }
    };

    /* ========== CLAIM ALL MISSIONS ========== */
    window.claimAllMissions = function() {
        ensureState();
        var missions = state.dailyMissions.missions;
        var totalMoney = 0, totalDiamond = 0, claimedCount = 0;
        var extraLines = [];
        for (var i = 0; i < missions.length; i++) {
            var m = missions[i];
            if (m.completed && !m.claimed) {
                m.claimed = true;
                state.dailyMissions.completedToday = (state.dailyMissions.completedToday || 0) + 1;
                var lines = applyRewards(m.reward);
                extraLines = extraLines.concat(lines);
                claimedCount++;
            }
        }
        if (claimedCount === 0) return;
        // Show summary
        var summary = 'Claimed ' + claimedCount + ' mission reward' + (claimedCount > 1 ? 's' : '') + '!\n' + extraLines.join('\n');
        if (typeof showGameAlert === 'function') showGameAlert('Mission Rewards', summary);
        else showToast('Claimed ' + claimedCount + ' rewards!');
        // Check all-complete bonus
        var allClaimed = missions.every(function(x) { return x.claimed; });
        if (allClaimed) {
            var bonus = applyRewards({ diamond: 10, money: 1000 });
            setTimeout(function() {
                if (typeof showGameAlert === 'function') showGameAlert('\u{1F31F} ALL MISSIONS COMPLETE!', bonus.join('\n'));
                else showToast('\u{1F31F} Bonus: ' + bonus.join(', '));
            }, 600);
        }
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
        updateBadge();
        renderMissionsUI();
    };

    /* ========== BADGE ========== */
    window.getDailyMissionBadgeCount = function() {
        ensureState();
        var count = 0;
        var missions = state.dailyMissions.missions;
        for (var i = 0; i < missions.length; i++) {
            if (missions[i].completed && !missions[i].claimed) count++;
        }
        return count;
    };

    /* ========== UI — COUNTDOWN ========== */
    function getResetCountdown() {
        var now = new Date();
        var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        var diff = tomorrow - now;
        var h = Math.floor(diff / 3600000);
        var m = Math.floor((diff % 3600000) / 60000);
        var s = Math.floor((diff % 60000) / 1000);
        return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    /* ========== UI — RENDER ========== */
    function rewardPreview(reward) {
        var parts = [];
        if (reward.money) parts.push(REWARD_ICONS.money + ' ' + reward.money);
        if (reward.diamond) parts.push(REWARD_ICONS.diamond + ' ' + reward.diamond);
        if (reward.freePull) parts.push(REWARD_ICONS.freePull + ' ' + reward.freePull);
        if (reward.scrap) parts.push(REWARD_ICONS.scrap + ' ' + reward.scrap);
        if (reward.iron) parts.push(REWARD_ICONS.iron + ' ' + reward.iron);
        if (reward.food) parts.push(REWARD_ICONS.food + ' x' + reward.food.random);
        return parts.join('  ');
    }

    function missionCard(m, idx) {
        var pct = m.target > 0 ? Math.min(100, Math.floor(m.progress / m.target * 100)) : 0;
        var barColor = m.claimed ? '#475569' : m.completed ? '#22c55e' : '#f59e0b';
        var cardBorder = m.claimed ? 'border-color:rgba(100,116,139,.3)' : m.completed ? 'border-color:rgba(34,197,94,.5)' : 'border-color:rgba(245,158,11,.3)';
        var opacity = m.claimed ? 'opacity:.55' : '';

        var h = '<div class="dm-card" style="background:rgba(15,23,42,.7);border:1.5px solid;border-radius:10px;padding:12px 14px;box-sizing:border-box;' + cardBorder + ';' + opacity + '">';
        // Top row: icon + desc + status
        h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">';
        h += '<span style="font-size:24px;line-height:1">' + m.icon + '</span>';
        h += '<div style="flex:1;min-width:0">';
        h += '<div style="font-size:12px;font-weight:700;color:#e2e8f0">' + m.desc + '</div>';
        h += '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Reward: ' + rewardPreview(m.reward) + '</div>';
        h += '</div>';
        if (m.claimed) h += '<span style="font-size:18px">✅</span>';
        h += '</div>';
        // Progress bar
        h += '<div style="background:#1e293b;border-radius:6px;height:14px;overflow:hidden;position:relative">';
        h += '<div class="dm-bar-inner" style="--fill:' + pct + '%;width:' + pct + '%;height:100%;border-radius:6px;background:' + barColor + ';transition:width .3s"></div>';
        h += '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.6)">' + m.progress + '/' + m.target + '</span>';
        h += '</div>';
        // Claim button
        h += '<div style="text-align:right;margin-top:8px">';
        if (m.claimed) {
            h += '<button disabled class="dm-claim-btn">CLAIMED ✅</button>';
        } else if (m.completed) {
            h += '<button class="dm-claim-btn" onclick="claimMissionReward(\'' + m.id + '\')">CLAIM REWARD</button>';
        } else {
            h += '<button disabled class="dm-claim-btn">IN PROGRESS</button>';
        }
        h += '</div></div>';
        return h;
    }

    function renderMissionsUI() {
        var container = document.getElementById('dm-missions-list');
        if (!container) return;
        ensureState();
        var missions = state.dailyMissions.missions;
        var html = '';
        for (var i = 0; i < missions.length; i++) html += missionCard(missions[i], i);
        // All-complete bonus row
        var allClaimed = missions.every(function(x) { return x.claimed; });
        var allComplete = missions.every(function(x) { return x.completed; });
        html += '<div style="margin-top:12px;padding:10px 14px;box-sizing:border-box;border-radius:10px;border:1.5px solid ' + (allClaimed ? 'rgba(34,197,94,.4)' : 'rgba(139,92,246,.3)') + ';background:' + (allClaimed ? 'rgba(22,163,74,.1)' : 'rgba(139,92,246,.08)') + ';display:flex;align-items:center;justify-content:space-between">';
        html += '<div><span style="font-size:14px">\u{1F31F}</span> <span style="font-size:11px;font-weight:700;color:#c4b5fd">COMPLETE ALL BONUS</span>';
        html += '<div style="font-size:10px;color:#a5b4fc;margin-top:2px">\u{1F48E} 10 Diamonds + \u{1F4B5} $1000</div></div>';
        if (allClaimed) html += '<span style="font-size:16px">✅</span>';
        else if (allComplete) html += '<span style="font-size:10px;color:#a78bfa;font-weight:700">CLAIM ALL FIRST</span>';
        else html += '<span style="font-size:10px;color:#64748b;font-weight:700">' + missions.filter(function(x){return x.claimed;}).length + '/3</span>';
        html += '</div>';
        container.innerHTML = html;
        // Update countdown
        var cd = document.getElementById('dm-countdown');
        if (cd) cd.textContent = getResetCountdown();
    }

    /* ========== UI — MODAL ========== */
    window.openDailyMissions = function() {
        ensureState();
        var existing = document.getElementById('dm-overlay');
        if (existing) { existing.remove(); }
        var overlay = document.createElement('div');
        overlay.id = 'dm-overlay';
        overlay.className = 'dm-overlay';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
        var modal = document.createElement('div');
        modal.className = 'dm-modal';
        modal.onclick = function(e) { e.stopPropagation(); };
        // Header
        var dmClaimableCount = 0;
        var dmMissions = state.dailyMissions.missions;
        for (var ci = 0; ci < dmMissions.length; ci++) {
            if (dmMissions[ci].completed && !dmMissions[ci].claimed) dmClaimableCount++;
        }
        var header = '<div style="text-align:center;margin-bottom:16px;position:relative">';
        header += '<div style="font-size:16px;font-weight:800;color:#fbbf24;letter-spacing:2px;text-transform:uppercase">\u{1F3AF} DAILY MISSIONS</div>';
        header += '<div style="font-size:10px;color:#94a3b8;margin-top:4px">Resets in <span id="dm-countdown" style="color:#f59e0b;font-weight:700">' + getResetCountdown() + '</span></div>';
        if (dmClaimableCount > 0) {
            header += '<div style="margin-top:8px"><button onclick="claimAllMissions()" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-size:10px;font-weight:700;border:none;border-radius:6px;padding:6px 14px;box-sizing:border-box;cursor:pointer;letter-spacing:1px;text-transform:uppercase;transition:filter 0.15s;" onmouseover="this.style.filter=\'brightness(1.1)\'" onmouseout="this.style.filter=\'none\'">CLAIM ALL (' + dmClaimableCount + ')</button></div>';
        }
        header += '<div style="height:1.5px;background:linear-gradient(90deg,transparent,rgba(245,158,11,.4),transparent);margin-top:10px"></div>';
        header += '</div>';
        // Close btn
        header += '<button onclick="document.getElementById(\'dm-overlay\').remove()" style="position:absolute;top:10px;right:14px;background:none;border:none;color:#64748b;font-size:22px;cursor:pointer;line-height:1">&times;</button>';
        modal.innerHTML = header + '<div id="dm-missions-list"></div>';
        modal.style.position = 'relative';
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        renderMissionsUI();
        // Countdown timer
        var tickId = setInterval(function() {
            if (!document.getElementById('dm-overlay')) { clearInterval(tickId); return; }
            var cd = document.getElementById('dm-countdown');
            if (cd) cd.textContent = getResetCountdown();
        }, 1000);
    };

    /* ========== INIT ========== */
    ensureState();
    updateBadge();
    // Periodically refresh badge
    setInterval(function() { updateBadge(); }, 15000);
})();
