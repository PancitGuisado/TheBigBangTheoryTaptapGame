// ============================================================
// GUILD WAR — Clash of Clans Style Clan War System
// ============================================================

// ── ENEMY GUILD TEMPLATES ──────────────────────────────────
var ENEMY_GUILDS = [
    { name: 'Kripke\'s Kwantum Krew', icon: '🧪', color: '#3b82f6', motto: 'Suck it, Cooper!' },
    { name: 'The Leslie Winkle Gang', icon: '🔬', color: '#ec4899', motto: 'Dumbass.' },
    { name: 'Wheaton\'s Avengers', icon: '🎭', color: '#a855f7', motto: 'WHEATOOOON!' },
    { name: 'Caltech Janitors Union', icon: '🧹', color: '#22c55e', motto: 'We clean up your messes.' },
    { name: 'MIT Physics Dept.', icon: '🏛️', color: '#ef4444', motto: 'East Coast > West Coast.' },
    { name: 'Priya\'s Law Firm', icon: '⚖️', color: '#f59e0b', motto: 'Objection overruled.' },
    { name: 'The Zarnecki Hackers', icon: '💻', color: '#06b6d4', motto: 'Your items are ours now.' },
    { name: 'Stuart\'s Militia', icon: '📚', color: '#8b5cf6', motto: 'Business is... surprisingly okay.' },
    { name: 'Geology Department', icon: '🪨', color: '#78716c', motto: 'Rocks are cool too!' },
    { name: 'HR Department', icon: '📋', color: '#64748b', motto: 'We need to talk about your behavior.' }
];

var WAR_PHASE = { IDLE: 'idle', SEARCHING: 'searching', BATTLE: 'battle', ENDED: 'ended' };
var WAR_DURATION_MS = 24 * 60 * 60 * 1000;
var MAX_ATTACKS = 2;
var WAR_MAX_LINEUP = 5; // max characters in war lineup
var WAR_FIGHT_TICK = 600; // ms per fight tick
var WAR_FIGHT_MAX_TICKS = 80; // max ticks before timeout

// Global war fight state
var warFightState = null;
var warFightTimer = null;

// ── INITIALIZE ─────────────────────────────────────────────
function initGuildWar() {
    if (!state.guildWar) {
        state.guildWar = {
            phase: WAR_PHASE.IDLE,
            enemy: null,
            enemyBases: [],
            myStars: 0,
            enemyStars: 0,
            attacks: [],
            attacksUsed: 0,
            warStartTime: null,
            warHistory: [],
            totalWins: 0,
            totalLosses: 0,
            totalDraws: 0,
            warStreak: 0,
            warLineup: [], // separate war lineup: array of char keys
            warFormation: null
        };
    }
    if (!state.guildWar.warLineup) state.guildWar.warLineup = [];
    if (!state.guildWar.warFormation) state.guildWar.warFormation = { front: [null, null], mid: [null, null, null], back: [null, null, null], bots: [null, null, null] };
    if (state.guildWar.phase === WAR_PHASE.BATTLE && state.guildWar.warStartTime) {
        if (Date.now() - state.guildWar.warStartTime >= WAR_DURATION_MS) _endWar();
    }
}

// ── CALCULATE PLAYER WAR POWER ─────────────────────────────
function calculateWarPower() {
    var totalPower = 0;
    var lineup = state.guildWar && state.guildWar.warLineup && state.guildWar.warLineup.length > 0
        ? state.guildWar.warLineup : Object.keys(state.equipped || {}).filter(function(k) { return state.equipped[k]; });
    lineup.forEach(function(item) {
        var key = typeof item === 'string' ? item : (item && item.key ? item.key : null);
        if (!key) return;
        if (state.roster[key]) {
            var char = state.roster[key];
            var cfg = typeof characters !== 'undefined' ? characters[key] : null;
            var baseDmg = cfg ? cfg.baseDmg : 10;
            totalPower += baseDmg * char.level * (1 + (state.perks.dmgMult || 0) * 0.1);
        }
    });
    if (state.robots) {
        state.robots.forEach(function(r) {
            if (r && r.equipped) {
                var botCfg = typeof robots !== 'undefined' ? robots[r.blueprintId] : null;
                totalPower += (botCfg ? botCfg.baseDmg : 5) * r.level * (1 + (state.perks.robotDmgMult || 0) * 0.1);
            }
        });
    }
    return Math.floor(totalPower);
}

// ── GENERATE ENEMY GUILD ───────────────────────────────────
function _generateEnemyGuild() {
    var template = ENEMY_GUILDS[Math.floor(Math.random() * ENEMY_GUILDS.length)];
    var memberCount = Math.max(3, currentGuildMembers ? currentGuildMembers.length : 5);
    memberCount = Math.min(Math.max(3, memberCount + Math.floor(Math.random() * 3) - 1), 10);

    var ourAvgPower = 0;
    if (currentGuildMembers && currentGuildMembers.length > 0) {
        var tp = 0; currentGuildMembers.forEach(function(m) { tp += (m.power || 200); });
        ourAvgPower = tp / currentGuildMembers.length;
    } else {
        ourAvgPower = calculateWarPower() || 500;
    }

    var charKeys = typeof characters !== 'undefined' ? Object.keys(characters) : ['sheldon','leonard','penny','howard','raj','amy','bernie','stuart'];
    var bases = [];
    var laneOptions = ['front', 'mid', 'back'];

    for (var i = 0; i < memberCount; i++) {
        var rankFactor = 1 - (i / memberCount) * 0.5;
        var variance = 0.7 + Math.random() * 0.6;
        var basePower = Math.floor(ourAvgPower * rankFactor * variance);

        // Generate a team of 3-5 characters for this base
        var teamSize = 3 + Math.floor(Math.random() * 3);
        var shuffled = charKeys.slice();
        for (var si = shuffled.length - 1; si > 0; si--) {
            var sj = Math.floor(Math.random() * (si + 1));
            var tmp = shuffled[si]; shuffled[si] = shuffled[sj]; shuffled[sj] = tmp;
        }
        var team = [];
        for (var j = 0; j < Math.min(teamSize, shuffled.length); j++) {
            var ck = shuffled[j];
            var cfg = characters[ck];
            if (!cfg) continue;
            var lvl = Math.max(1, Math.floor(basePower / ((cfg.baseDmg || 10) * 3) + Math.random() * 5));
            team.push({ key: ck, name: cfg.name, level: lvl, lane: cfg.lane || laneOptions[Math.floor(Math.random() * 3)] });
        }
        // Sort team: front first
        var laneOrder = { front: 0, mid: 1, back: 2 };
        team.sort(function(a, b) { return (laneOrder[a.lane] || 1) - (laneOrder[b.lane] || 1); });

        // Calculate total power for this base
        var totalBasePow = 0;
        team.forEach(function(t) {
            var c = characters[t.key];
            totalBasePow += (c ? c.baseDmg : 10) * t.level;
        });

        bases.push({
            id: i, rank: i + 1,
            team: team,
            power: totalBasePow,
            starsEarned: 0,
            bestDamage: 0,
            attackedBy: []
        });
    }

    bases.sort(function(a, b) { return b.power - a.power; });
    bases.forEach(function(b, idx) { b.id = idx; b.rank = idx + 1; });

    return {
        name: template.name, icon: template.icon, color: template.color, motto: template.motto,
        memberCount: memberCount, bases: bases,
        totalPower: bases.reduce(function(s, b) { return s + b.power; }, 0)
    };
}

// ── START WAR SEARCH ───────────────────────────────────────
function startWarSearch() {
    if (!currentGuild) {
        if (typeof showGameAlert === 'function') showGameAlert('No Guild', 'Join a guild to start a Clan War!');
        return;
    }
    if (state.guildWar.phase !== WAR_PHASE.IDLE) return;
    if (!state.guildWar.warLineup || state.guildWar.warLineup.length === 0) {
        if (typeof showGameAlert === 'function') showGameAlert('No Lineup', 'Set your War Lineup before searching for a war!');
        return;
    }

    state.guildWar.phase = WAR_PHASE.SEARCHING;
    _renderWarUI();

    setTimeout(function() {
        var enemy = _generateEnemyGuild();
        state.guildWar.enemy = enemy;
        state.guildWar.enemyBases = enemy.bases;
        state.guildWar.myStars = 0;
        state.guildWar.enemyStars = 0;
        state.guildWar.attacks = [];
        state.guildWar.attacksUsed = 0;
        state.guildWar.warStartTime = Date.now();
        state.guildWar.phase = WAR_PHASE.BATTLE;
        saveProgress();
        _renderWarUI();
    }, 2500);
}

// ── END WAR ────────────────────────────────────────────────
function _endWar() {
    var w = state.guildWar;
    _simulateEnemyAttacks();
    var result = w.myStars > w.enemyStars ? 'win' : w.myStars < w.enemyStars ? 'loss' : 'draw';
    if (result === 'win') { w.totalWins = (w.totalWins || 0) + 1; w.warStreak = (w.warStreak || 0) + 1; }
    else if (result === 'loss') { w.totalLosses = (w.totalLosses || 0) + 1; w.warStreak = 0; }
    else { w.totalDraws = (w.totalDraws || 0) + 1; }
    if (!w.warHistory) w.warHistory = [];
    w.warHistory.unshift({ enemy: w.enemy ? w.enemy.name : 'Unknown', enemyIcon: w.enemy ? w.enemy.icon : '', myStars: w.myStars, enemyStars: w.enemyStars, result: result, time: Date.now() });
    if (w.warHistory.length > 20) w.warHistory = w.warHistory.slice(0, 20);
    var rewards = _calcWarRewards(result, w.myStars);
    _applyWarRewards(rewards);
    w.phase = WAR_PHASE.ENDED;
    w._lastResult = result;
    w._lastRewards = rewards;
    saveProgress();

    // Push notification when war ends
    if (typeof sendNotification === 'function') {
        var notifTitle = result === 'win' ? '⚔️ Clan War Victory!' : result === 'loss' ? '⚔️ Clan War Defeat' : '⚔️ Clan War Draw';
        var notifBody = 'Your war has finished (' + w.myStars + '★ vs ' + w.enemyStars + '★). Check your results!';
        sendNotification(notifTitle, notifBody);
    }
}

function _simulateEnemyAttacks() {
    var w = state.guildWar;
    if (!w.enemy) return;
    var ratio = (w.enemy.totalPower || 1) / Math.max(calculateWarPower(), 1);
    w.enemyStars = Math.floor(w.enemy.memberCount * 3 * Math.min(0.85, ratio * (0.4 + Math.random() * 0.3)));
}

function _calcWarRewards(result, stars) {
    var mult = result === 'win' ? 2.0 : result === 'draw' ? 1.0 : 0.5;
    var sm = 1 + stars * 0.1;
    var t = mult * sm;
    var r = { money: Math.floor((200 + Math.random() * 300) * t), scrap: Math.floor((20 + Math.random() * 40) * t) };
    if (result === 'win') r.diamond = Math.floor((5 + Math.random() * 10) * sm);
    if (result === 'win' && stars >= 6) r.bp = 1;
    return r;
}

function _applyWarRewards(r) {
    if (r.money) state.resources.money += r.money;
    if (r.scrap) state.resources.scrap += r.scrap;
    if (r.diamond) state.resources.diamond += r.diamond;
    if (r.bp) state.bazingaPoints = (state.bazingaPoints || 0) + r.bp;
    if (typeof trackStat === 'function' && r.money) trackStat('moneyEarned', r.money);
    if (typeof syncUI === 'function') syncUI();
}

function collectWarRewards() {
    var w = state.guildWar;
    w.phase = WAR_PHASE.IDLE; w.enemy = null; w.enemyBases = [];
    w.attacks = []; w.attacksUsed = 0; w.myStars = 0; w.enemyStars = 0;
    w._lastResult = null; w._lastRewards = null;
    saveProgress(); _renderWarUI();
}

// ============================================================
// WAR LINEUP BUILDER — PvP Arena Style (Lane-Based Formation)
// ============================================================
function openWarLineupBuilder() {
    initGuildWar();
    var existing = document.getElementById('war-lineup-modal');
    if (existing) existing.remove();

    // Initialize warFormation from existing lineup if needed
    if (!state.guildWar.warFormation) {
        state.guildWar.warFormation = { front: [null, null], mid: [null, null, null], back: [null, null, null], bots: [null, null, null] };
        if (state.guildWar.warLineup && state.guildWar.warLineup.length > 0) {
            state.guildWar.warLineup.forEach(function(item) {
                var key = typeof item === 'string' ? item : (item && item.key ? item.key : null);
                if (!key) return;
                var itemType = (item && item.type) ? item.type : 'char';
                if (itemType === 'char' && characters[key]) {
                    var lane = (item && item.lane) ? item.lane : (characters[key] ? characters[key].lane : 'back');
                    var slots = state.guildWar.warFormation[lane];
                    if (slots) {
                        for (var i = 0; i < slots.length; i++) {
                            if (slots[i] === null) { slots[i] = { type: 'char', key: key }; break; }
                        }
                    }
                } else if (itemType === 'bot') {
                    var bots = state.guildWar.warFormation.bots;
                    for (var i = 0; i < bots.length; i++) {
                        if (bots[i] === null) { bots[i] = { key: key, lane: (item && item.lane) || 'front' }; break; }
                    }
                }
            });
        }
    }

    // Deep copy for editing
    var editState = {
        front: state.guildWar.warFormation.front.slice(),
        mid: state.guildWar.warFormation.mid.slice(),
        back: state.guildWar.warFormation.back.slice(),
        bots: state.guildWar.warFormation.bots.slice()
    };
    var warDragged = null;

    var overlay = document.createElement('div');
    overlay.id = 'war-lineup-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.92);padding:8px;';

    function countUnits() {
        var chars = 0, bots = 0;
        ['front','mid','back'].forEach(function(l) { editState[l].forEach(function(s) { if (s && s.type === 'char') chars++; }); });
        editState.bots.forEach(function(s) { if (s) bots++; });
        return { chars: chars, bots: bots };
    }

    function renderBuilder() {
        var counts = countUnits();
        var laneConfig = {
            front: { label: 'FRONTLINE', color: '#ef4444', icon: '🛡️' },
            mid: { label: 'MIDLINE', color: '#f59e0b', icon: '⚔️' },
            back: { label: 'BACKLINE', color: '#3b82f6', icon: '🎯' }
        };

        var lanesHtml = '';
        ['front','mid','back'].forEach(function(laneKey) {
            var lc = laneConfig[laneKey];
            var slots = editState[laneKey];
            var slotsHtml = '';

            for (var i = 0; i < slots.length; i++) {
                (function(idx) {
                    var slot = slots[idx];
                    if (slot && slot.type === 'char') {
                        var cfg = characters[slot.key];
                        var name = cfg ? cfg.name : slot.key;
                        var svg = typeof getVectorFrame === 'function' ? getVectorFrame(slot.key, false) : '';
                        slotsHtml += '<div style="position:relative;width:62px;height:78px;border:2px solid #22c55e;background:rgba(34,197,94,0.15);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;cursor:grab;overflow:hidden;padding-bottom:4px;" draggable="true" data-war-drag-char="' + laneKey + '-' + idx + '">' +
                            '<div onclick="event.stopPropagation()" data-war-remove="' + laneKey + '-' + idx + '" style="position:absolute;top:0;right:0;width:16px;height:16px;background:#991b1b;color:white;font-size:8px;font-weight:bold;display:flex;align-items:center;justify-content:center;border-bottom-left-radius:4px;cursor:pointer;z-index:5;">✕</div>' +
                            '<div style="width:36px;height:40px;display:flex;align-items:center;justify-content:center;pointer-events:none;">' + (svg || '👤') + '</div>' +
                            '<div style="font-size:6px;color:white;font-weight:bold;text-align:center;width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:0 2px;pointer-events:none;">' + name + '</div>' +
                        '</div>';
                    } else {
                        slotsHtml += '<div data-war-empty-char="' + laneKey + '-' + idx + '" style="width:62px;height:78px;border:2px dashed #374151;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;" ' +
                            'ondragover="event.preventDefault();this.style.borderColor=\'#f59e0b\'" ondragleave="this.style.borderColor=\'#374151\'">' +
                            '<span style="color:#4b5563;font-size:18px;">' + (warDragged ? '⬇' : '+') + '</span>' +
                            '<span style="color:#4b5563;font-size:7px;font-weight:bold;">EMPTY</span>' +
                        '</div>';
                    }
                })(i);
            }

            lanesHtml += '<div style="margin-bottom:8px;">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">' +
                    '<div style="display:flex;align-items:center;gap:4px;"><span>' + lc.icon + '</span><span style="color:' + lc.color + ';font-weight:900;font-size:10px;letter-spacing:1px;">' + lc.label + '</span></div>' +
                '</div>' +
                '<div style="display:flex;gap:6px;justify-content:center;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px;min-height:86px;align-items:center;">' + slotsHtml + '</div>' +
            '</div>';
        });

        // Bot slots
        var botSlotCount = 3;
        var botSlotsHtml = '';
        for (var bi = 0; bi < 3; bi++) {
            (function(idx) {
                if (idx >= botSlotCount) {
                    botSlotsHtml += '<div style="width:62px;height:78px;border:2px solid #1f2937;background:rgba(0,0,0,0.4);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0.5;"><span style="color:#4b5563;font-size:16px;">🔒</span><span style="font-size:6px;color:#4b5563;font-weight:bold;">LOCKED</span></div>';
                } else if (editState.bots[idx]) {
                    var slot = editState.bots[idx];
                    var rCfg = typeof robots !== 'undefined' ? robots[slot.key] : null;
                    var rName = rCfg ? rCfg.name : slot.key;
                    var svg = typeof getVectorFrame === 'function' ? getVectorFrame(slot.key, false) : '';
                    botSlotsHtml += '<div style="position:relative;width:62px;height:78px;border:2px solid #06b6d4;background:rgba(6,182,212,0.15);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;cursor:grab;overflow:hidden;padding-bottom:4px;">' +
                        '<div onclick="event.stopPropagation()" data-war-remove-bot="' + idx + '" style="position:absolute;top:0;right:0;width:16px;height:16px;background:#991b1b;color:white;font-size:8px;font-weight:bold;display:flex;align-items:center;justify-content:center;border-bottom-left-radius:4px;cursor:pointer;z-index:5;">✕</div>' +
                        '<span style="position:absolute;top:0;left:0;font-size:5px;background:#164e63;color:#67e8f9;padding:0 3px;border-bottom-right-radius:4px;font-weight:bold;">BOT</span>' +
                        '<div style="width:36px;height:40px;display:flex;align-items:center;justify-content:center;pointer-events:none;">' + (svg || '🤖') + '</div>' +
                        '<div style="font-size:6px;color:white;font-weight:bold;text-align:center;width:100%;overflow:hidden;pointer-events:none;">' + rName + '</div>' +
                    '</div>';
                } else {
                    botSlotsHtml += '<div data-war-empty-bot="' + idx + '" style="width:62px;height:78px;border:2px dashed #374151;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;">' +
                        '<span style="color:#4b5563;font-size:18px;">' + (warDragged && warDragged.type === 'bot' ? '⬇' : '+') + '</span>' +
                        '<span style="color:#4b5563;font-size:7px;font-weight:bold;">EMPTY</span>' +
                    '</div>';
                }
            })(bi);
        }

        // Bench — show characters NOT in formation
        var inFormation = {};
        ['front','mid','back'].forEach(function(l) { editState[l].forEach(function(s) { if (s) inFormation[s.key] = true; }); });
        editState.bots.forEach(function(s) { if (s) inFormation[s.key] = true; });

        var benchChars = '';
        for (var k in characters) {
            var d = state.roster[k];
            if (!d || d.level <= 0 || inFormation[k]) continue;
            var svg = typeof getVectorFrame === 'function' ? getVectorFrame(k, false) : '';
            benchChars += '<div data-war-bench-char="' + k + '" draggable="true" style="width:52px;height:66px;border:2px solid #374151;background:rgba(0,0,0,0.4);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:grab;padding:2px;transition:all 0.2s;">' +
                '<div style="width:32px;height:36px;display:flex;align-items:center;justify-content:center;pointer-events:none;">' + (svg || '👤') + '</div>' +
                '<div style="font-size:6px;color:#d1d5db;font-weight:bold;text-align:center;width:100%;overflow:hidden;pointer-events:none;">' + characters[k].name + '</div>' +
            '</div>';
        }
        var benchBots = '';
        if (state.robotRoster && typeof robots !== 'undefined') {
            for (var rk in state.robotRoster) {
                if (!state.robotRoster[rk] || state.robotRoster[rk].level <= 0 || inFormation[rk]) continue;
                var rCfg = robots[rk];
                if (!rCfg) continue;
                var svg = typeof getVectorFrame === 'function' ? getVectorFrame(rk, false) : '';
                benchBots += '<div data-war-bench-bot="' + rk + '" draggable="true" style="width:52px;height:66px;border:2px solid #374151;background:rgba(0,0,0,0.4);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:grab;padding:2px;transition:all 0.2s;">' +
                    '<div style="width:32px;height:36px;display:flex;align-items:center;justify-content:center;pointer-events:none;">' + (svg || '🤖') + '</div>' +
                    '<div style="font-size:6px;color:#d1d5db;font-weight:bold;text-align:center;width:100%;overflow:hidden;pointer-events:none;">' + rCfg.name + '</div>' +
                '</div>';
            }
        }

        overlay.innerHTML =
        '<div style="background:linear-gradient(135deg,#1a0f00,#1e1008,#0a0a1a);border:2px solid #d97706;border-radius:16px;padding:16px;max-width:420px;width:95%;box-sizing:border-box;max-height:90vh;overflow-y:auto;box-shadow:0 0 50px rgba(217,119,6,0.3);max-height:90vh;overflow-y:auto;">' +
            '<div style="text-align:center;margin-bottom:12px;">' +
                '<div style="font-size:16px;font-weight:900;color:#f59e0b;letter-spacing:3px;">⚔️ WAR LINEUP</div>' +
                '<div style="font-size:8px;color:#64748b;margin-top:2px;">Any role in any lane • 5 chars + 3 robots max</div>' +
            '</div>' +
            '<div style="display:flex;justify-content:center;gap:10px;margin-bottom:10px;font-size:9px;font-weight:bold;">' +
                '<span style="padding:3px 8px;box-sizing:border-box;border-radius:4px;background:rgba(34,197,94,0.15);border:1px solid #166534;color:#4ade80;">👥 ' + counts.chars + '/5</span>' +
                '<span style="padding:3px 8px;box-sizing:border-box;border-radius:4px;background:rgba(6,182,212,0.15);border:1px solid #155e75;color:#22d3ee;">🤖 ' + counts.bots + '/' + botSlotCount + '</span>' +
            '</div>' +
            (warDragged ? '<div style="text-align:center;color:#f59e0b;font-size:9px;font-weight:bold;margin-bottom:8px;animation:pulse 1s infinite;">🎯 Tap a slot to place</div>' : '') +
            '<div style="font-size:9px;color:#9ca3af;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">CHARACTER FORMATION</div>' +
            lanesHtml +
            '<div style="font-size:9px;color:#22d3ee;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin:10px 0 4px;">🤖 ROBOT DEPLOYMENT</div>' +
            '<div style="display:flex;gap:6px;justify-content:center;background:rgba(0,0,0,0.3);border:1px solid rgba(6,182,212,0.1);border-radius:8px;padding:8px;min-height:86px;align-items:center;margin-bottom:12px;">' + botSlotsHtml + '</div>' +
            '<div style="border-top:1px solid #1f2937;padding-top:8px;margin-bottom:12px;">' +
                '<div style="color:#9ca3af;font-weight:bold;font-size:9px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">📋 BENCH</div>' +
                (benchChars ? '<div style="font-size:7px;color:#6b7280;margin-bottom:3px;text-transform:uppercase;">Characters</div><div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;">' + benchChars + '</div>' : '') +
                (benchBots ? '<div style="font-size:7px;color:#6b7280;margin-bottom:3px;text-transform:uppercase;">Robots</div><div style="display:flex;flex-wrap:wrap;gap:4px;">' + benchBots + '</div>' : '') +
                (!benchChars && !benchBots ? '<div style="font-size:8px;color:#4b5563;font-style:italic;">All units deployed!</div>' : '') +
            '</div>' +
            '<div style="display:flex;gap:8px;">' +
                '<button id="war-lineup-save" style="flex:1;background:linear-gradient(135deg,#b45309,#d97706);color:white;font-weight:900;font-size:11px;padding:10px;border:2px solid #f59e0b;border-radius:8px;cursor:pointer;letter-spacing:2px;">✅ SAVE</button>' +
                '<button id="war-lineup-cancel" style="flex:0.5;background:#1e293b;color:#64748b;font-weight:bold;font-size:10px;padding:10px;border:1px solid #334155;border-radius:8px;cursor:pointer;">CANCEL</button>' +
            '</div>' +
        '</div>';

        // Wire events
        // Remove char
        overlay.querySelectorAll('[data-war-remove]').forEach(function(btn) {
            btn.onclick = function(e) {
                e.stopPropagation();
                var parts = this.getAttribute('data-war-remove').split('-');
                editState[parts[0]][parseInt(parts[1])] = null;
                renderBuilder();
            };
        });
        // Remove bot
        overlay.querySelectorAll('[data-war-remove-bot]').forEach(function(btn) {
            btn.onclick = function(e) {
                e.stopPropagation();
                editState.bots[parseInt(this.getAttribute('data-war-remove-bot'))] = null;
                renderBuilder();
            };
        });

        // Bench char — click to pick up
        overlay.querySelectorAll('[data-war-bench-char]').forEach(function(btn) {
            btn.onclick = function() {
                var k = this.getAttribute('data-war-bench-char');
                var c = countUnits();
                if (c.chars >= 5) return;
                warDragged = { type: 'char', key: k };
                renderBuilder();
            };
            btn.ondragstart = function(e) {
                var k = this.getAttribute('data-war-bench-char');
                warDragged = { type: 'char', key: k, fromLane: null, fromIdx: null };
                e.dataTransfer.effectAllowed = 'move';
            };
        });
        // Bench bot — click to pick up
        overlay.querySelectorAll('[data-war-bench-bot]').forEach(function(btn) {
            btn.onclick = function() {
                var k = this.getAttribute('data-war-bench-bot');
                var c = countUnits();
                if (c.bots >= 3) return;
                warDragged = { type: 'bot', key: k };
                renderBuilder();
            };
            btn.ondragstart = function(e) {
                var k = this.getAttribute('data-war-bench-bot');
                warDragged = { type: 'bot', key: k, fromIdx: null };
                e.dataTransfer.effectAllowed = 'move';
            };
        });

        // Filled char slots — click to pick up / swap
        overlay.querySelectorAll('[data-war-drag-char]').forEach(function(el) {
            el.onclick = function() {
                var parts = this.getAttribute('data-war-drag-char').split('-');
                var lane = parts[0], idx = parseInt(parts[1]);
                var slot = editState[lane][idx];
                if (!slot) return;
                warDragged = { type: 'char', key: slot.key };
                editState[lane][idx] = null;
                renderBuilder();
            };
            el.ondragstart = function(e) {
                var parts = this.getAttribute('data-war-drag-char').split('-');
                warDragged = { type: 'char', key: editState[parts[0]][parseInt(parts[1])].key, fromLane: parts[0], fromIdx: parseInt(parts[1]) };
                e.dataTransfer.effectAllowed = 'move';
            };
            el.ondragover = function(e) { e.preventDefault(); this.style.outline = '2px solid #f59e0b'; };
            el.ondragleave = function() { this.style.outline = 'none'; };
            el.ondrop = function(e) {
                e.preventDefault(); this.style.outline = 'none';
                if (!warDragged || warDragged.type !== 'char') { warDragged = null; return; }
                var parts = this.getAttribute('data-war-drag-char').split('-');
                var toLane = parts[0], toIdx = parseInt(parts[1]);
                var existing = editState[toLane][toIdx];
                editState[toLane][toIdx] = { type: 'char', key: warDragged.key };
                if (warDragged.fromLane !== null && warDragged.fromLane !== undefined) {
                    editState[warDragged.fromLane][warDragged.fromIdx] = existing;
                }
                warDragged = null; renderBuilder();
            };
        });

        // Empty char slots — click to place
        overlay.querySelectorAll('[data-war-empty-char]').forEach(function(el) {
            el.onclick = function() {
                if (!warDragged || warDragged.type !== 'char') return;
                var parts = this.getAttribute('data-war-empty-char').split('-');
                editState[parts[0]][parseInt(parts[1])] = { type: 'char', key: warDragged.key };
                warDragged = null;
                renderBuilder();
            };
            el.ondragover = function(e) { e.preventDefault(); this.style.borderColor = '#f59e0b'; this.style.background = 'rgba(245,158,11,0.15)'; };
            el.ondragleave = function() { this.style.borderColor = '#374151'; this.style.background = 'transparent'; };
            el.ondrop = function(e) {
                e.preventDefault(); this.style.borderColor = '#374151'; this.style.background = 'transparent';
                if (!warDragged || warDragged.type !== 'char') { warDragged = null; return; }
                var c = countUnits();
                if (warDragged.fromLane === null && warDragged.fromLane !== undefined && c.chars >= 5) { warDragged = null; return; }
                var parts = this.getAttribute('data-war-empty-char').split('-');
                editState[parts[0]][parseInt(parts[1])] = { type: 'char', key: warDragged.key };
                if (warDragged.fromLane !== null && warDragged.fromLane !== undefined) {
                    editState[warDragged.fromLane][warDragged.fromIdx] = null;
                }
                warDragged = null; renderBuilder();
            };
        });

        // Empty bot slots — click to place
        overlay.querySelectorAll('[data-war-empty-bot]').forEach(function(el) {
            el.onclick = function() {
                if (!warDragged || warDragged.type !== 'bot') return;
                var idx = parseInt(this.getAttribute('data-war-empty-bot'));
                editState.bots[idx] = { key: warDragged.key, lane: 'front' };
                warDragged = null;
                renderBuilder();
            };
            el.ondragover = function(e) { e.preventDefault(); this.style.borderColor = '#06b6d4'; this.style.background = 'rgba(6,182,212,0.15)'; };
            el.ondragleave = function() { this.style.borderColor = '#374151'; this.style.background = 'transparent'; };
            el.ondrop = function(e) {
                e.preventDefault(); this.style.borderColor = '#374151'; this.style.background = 'transparent';
                if (!warDragged || warDragged.type !== 'bot') { warDragged = null; return; }
                var idx = parseInt(this.getAttribute('data-war-empty-bot'));
                editState.bots[idx] = { key: warDragged.key, lane: 'front' };
                if (warDragged.fromIdx !== null && warDragged.fromIdx !== undefined) {
                    editState.bots[warDragged.fromIdx] = null;
                }
                warDragged = null; renderBuilder();
            };
        });

        // Save
        var saveBtn = document.getElementById('war-lineup-save');
        if (saveBtn) saveBtn.onclick = function() {
            // Save formation
            state.guildWar.warFormation = { front: editState.front.slice(), mid: editState.mid.slice(), back: editState.back.slice(), bots: editState.bots.slice() };
            // Build lineup array for battle system compatibility
            state.guildWar.warLineup = [];
            ['front','mid','back'].forEach(function(lane) {
                editState[lane].forEach(function(slot) {
                    if (slot && slot.type === 'char') state.guildWar.warLineup.push({ type: 'char', key: slot.key, lane: lane });
                });
            });
            editState.bots.forEach(function(slot) {
                if (slot) state.guildWar.warLineup.push({ type: 'bot', key: slot.key, lane: slot.lane || 'front' });
            });
            saveProgress();
            overlay.remove();
            _renderWarUI();
            if (typeof showGameAlert === 'function') showGameAlert('Lineup Saved', 'Your war lineup has been updated!');
        };
        var cancelBtn = document.getElementById('war-lineup-cancel');
        if (cancelBtn) cancelBtn.onclick = function() { overlay.remove(); };
    }

    renderBuilder();
    document.body.appendChild(overlay);
}

// ============================================================
// ATTACK A BASE — LINEUP vs LINEUP FIGHT
// ============================================================
function attackWarBase(baseId) {
    var w = state.guildWar;
    if (w.phase !== WAR_PHASE.BATTLE) return;
    if (w.attacksUsed >= MAX_ATTACKS) {
        if (typeof showGameAlert === 'function') showGameAlert('No Attacks', 'You\'ve used both attacks this war!');
        return;
    }
    if (!w.warLineup || w.warLineup.length === 0) {
        if (typeof showGameAlert === 'function') showGameAlert('No Lineup', 'Set your War Lineup first!');
        return;
    }
    var base = w.enemyBases[baseId];
    if (!base) return;
    if (base.starsEarned >= 3) {
        if (typeof showGameAlert === 'function') showGameAlert('Already 3-Starred', 'This base is fully destroyed!');
        return;
    }

    var modal = document.getElementById('guild-raid-modal');
    if (modal) modal.remove();
    _startWarFight(baseId);
}

function _buildPlayerTeam() {
    var team = [];
    var formation = state.guildWar.warFormation;

    // Build from formation (lane-based) if available
    if (formation) {
        ['front','mid','back'].forEach(function(lane) {
            var slots = formation[lane];
            if (!slots) return;
            slots.forEach(function(slot) {
                if (!slot || slot.type !== 'char') return;
                var key = slot.key;
                var cfg = characters[key];
                var rData = state.roster[key];
                if (!cfg || !rData || rData.level <= 0) return;
                var lvl = rData.level;
                var hpScale = lane === 'front' ? 1.5 : 1.0;
                var maxHp = Math.floor(cfg.baseHp * (1 + (lvl - 1) * hpScale));
                var dmg = Math.floor(cfg.baseDmg * Math.pow(lvl, 1.15));
                if (rData.talents) {
                    if (rData.talents.hp) maxHp = Math.floor(maxHp * (1 + rData.talents.hp * 0.20));
                    if (rData.talents.dmg) dmg = Math.floor(dmg * (1 + rData.talents.dmg * 0.10));
                }
                if (typeof getCharEquipmentStats === 'function') {
                    var eq = getCharEquipmentStats(key);
                    dmg += Math.floor((eq.dmg || 0) * 0.5);
                    maxHp += Math.floor((eq.hp || 0) * 0.5);
                }
                var svg = typeof getVectorFrame === 'function' ? getVectorFrame(key, false) : '';
                team.push({ key: key, name: cfg.name, type: 'char', lane: lane, level: lvl, baseDmg: dmg, atkSpeed: cfg.atkSpeed, maxHp: maxHp, hp: maxHp, alive: true, svg: svg, classType: cfg.classType || 'dps' });
            });
        });
        // Add bots
        if (formation.bots) {
            formation.bots.forEach(function(slot) {
                if (!slot) return;
                var key = slot.key;
                var botCfg = typeof robots !== 'undefined' ? robots[key] : null;
                var rData = state.robotRoster ? state.robotRoster[key] : null;
                if (!botCfg || !rData || rData.level <= 0) return;
                var lvl = rData.level;
                var maxHp = Math.floor((botCfg.baseHp || 80) * (1 + (lvl - 1) * 1.0));
                var dmg = Math.floor((botCfg.baseDmg || 8) * Math.pow(lvl, 1.15));
                var svg = typeof getVectorFrame === 'function' ? getVectorFrame(key, false) : '';
                team.push({ key: key, name: botCfg.name, type: 'bot', lane: slot.lane || 'front', level: lvl, baseDmg: dmg, atkSpeed: botCfg.atkSpeed || 1200, maxHp: maxHp, hp: maxHp, alive: true, svg: svg, classType: 'dps' });
            });
        }
    }

    // Fallback: build from flat lineup array
    if (team.length === 0 && state.guildWar.warLineup && state.guildWar.warLineup.length > 0) {
        state.guildWar.warLineup.forEach(function(item) {
            var key = typeof item === 'string' ? item : (item && item.key ? item.key : null);
            if (!key) return;
            var itemType = (item && item.type) ? item.type : 'char';
            if (itemType === 'char') {
                var cfg = characters[key];
                var rData = state.roster[key];
                if (!cfg || !rData || rData.level <= 0) return;
                var lvl = rData.level;
                var lane = (item && item.lane) ? item.lane : (cfg.lane || 'back');
                var hpScale = lane === 'front' ? 1.5 : 1.0;
                var maxHp = Math.floor(cfg.baseHp * (1 + (lvl - 1) * hpScale));
                var dmg = Math.floor(cfg.baseDmg * Math.pow(lvl, 1.15));
                if (rData.talents) {
                    if (rData.talents.hp) maxHp = Math.floor(maxHp * (1 + rData.talents.hp * 0.20));
                    if (rData.talents.dmg) dmg = Math.floor(dmg * (1 + rData.talents.dmg * 0.10));
                }
                if (typeof getCharEquipmentStats === 'function') {
                    var eq = getCharEquipmentStats(key);
                    dmg += Math.floor((eq.dmg || 0) * 0.5);
                    maxHp += Math.floor((eq.hp || 0) * 0.5);
                }
                var svg = typeof getVectorFrame === 'function' ? getVectorFrame(key, false) : '';
                team.push({ key: key, name: cfg.name, type: 'char', lane: lane, level: lvl, baseDmg: dmg, atkSpeed: cfg.atkSpeed, maxHp: maxHp, hp: maxHp, alive: true, svg: svg, classType: cfg.classType || 'dps' });
            } else if (itemType === 'bot') {
                var botCfg = typeof robots !== 'undefined' ? robots[key] : null;
                var rData = state.robotRoster ? state.robotRoster[key] : null;
                if (!botCfg || !rData || rData.level <= 0) return;
                var lvl = rData.level;
                var maxHp = Math.floor((botCfg.baseHp || 80) * (1 + (lvl - 1) * 1.0));
                var dmg = Math.floor((botCfg.baseDmg || 8) * Math.pow(lvl, 1.15));
                var svg = typeof getVectorFrame === 'function' ? getVectorFrame(key, false) : '';
                team.push({ key: key, name: botCfg.name, type: 'bot', lane: (item && item.lane) || 'front', level: lvl, baseDmg: dmg, atkSpeed: botCfg.atkSpeed || 1200, maxHp: maxHp, hp: maxHp, alive: true, svg: svg, classType: 'dps' });
            }
        });
    }
    return team;
}

function _buildEnemyTeam(base) {
    var team = [];
    (base.team || []).forEach(function(t) {
        var cfg = characters[t.key];
        if (!cfg) return;
        var lvl = t.level || 1;
        var lane = t.lane || cfg.lane || 'mid';
        var hpScale = lane === 'front' ? 1.5 : 1.0;
        var maxHp = Math.floor(cfg.baseHp * (1 + (lvl - 1) * hpScale));
        var dmg = Math.floor(cfg.baseDmg * Math.pow(lvl, 1.15));
        var svg = typeof getVectorFrame === 'function' ? getVectorFrame(t.key, false) : '';
        team.push({ key: t.key, name: cfg.name, type: 'char', lane: lane, level: lvl, baseDmg: dmg, atkSpeed: cfg.atkSpeed, maxHp: maxHp, hp: maxHp, alive: true, svg: svg, classType: cfg.classType || 'dps' });
    });
    return team;
}

// ── WAR FIGHT SCREEN ───────────────────────────────────────
function _startWarFight(baseId) {
    var w = state.guildWar;
    var base = w.enemyBases[baseId];
    var playerTeam = _buildPlayerTeam();
    var enemyTeam = _buildEnemyTeam(base);

    if (playerTeam.length === 0) {
        if (typeof showGameAlert === 'function') showGameAlert('Empty Team', 'Your war lineup has no valid characters!');
        openGuildRaid();
        return;
    }

    warFightState = {
        baseId: baseId,
        base: base,
        playerTeam: playerTeam,
        enemyTeam: enemyTeam,
        tick: 0,
        maxTicks: WAR_FIGHT_MAX_TICKS,
        finished: false,
        log: [],
        playerTurnTimers: {},
        enemyTurnTimers: {}
    };

    // Init attack timers (normalized to tick speed)
    playerTeam.forEach(function(u) { warFightState.playerTurnTimers[u.key] = 0; });
    enemyTeam.forEach(function(u) { warFightState.enemyTurnTimers[u.key] = 0; });

    // Reset kill streak counters
    warKillCount = { p: 0, e: 0 };
    _warFxLastTime = {};

    _renderWarFightScreen();

    // Brief intro then start
    setTimeout(function() {
        warFightTimer = setInterval(_warFightTick, WAR_FIGHT_TICK);
    }, 800);
}

function _warFightTick() {
    if (!warFightState || warFightState.finished) { clearInterval(warFightTimer); return; }
    var fs = warFightState;
    fs.tick++;

    // Process each player unit
    fs.playerTeam.forEach(function(unit) {
        if (!unit.alive) return;
        fs.playerTurnTimers[unit.key] = (fs.playerTurnTimers[unit.key] || 0) + WAR_FIGHT_TICK;
        
        // Rage speed buff check
        var effectiveAtkSpeed = unit.atkSpeed;
        if (unit._rageBuffed) effectiveAtkSpeed = Math.floor(effectiveAtkSpeed * 0.7);

        if (fs.playerTurnTimers[unit.key] >= effectiveAtkSpeed) {
            fs.playerTurnTimers[unit.key] = 0;
            var pType = characters[unit.key] ? characters[unit.key].passiveType : null;

            // Target selection based on passive
            var target;
            if (pType === 'backlineSpeed' || pType === 'backlineCrit' || pType === 'jumpCrit') {
                var backTargets = fs.enemyTeam.filter(function(u) { return u.alive && characters[u.key] && characters[u.key].lane === 'back'; });
                target = backTargets.length > 0 ? backTargets[Math.floor(Math.random() * backTargets.length)] : _pickTarget(fs.enemyTeam, unit);
            } else {
                target = _pickTarget(fs.enemyTeam, unit);
            }

            if (target) {
                // Crit logic based on passive
                var isCrit = Math.random() < 0.15;
                if (pType === 'critSplash' || pType === 'critAoe') isCrit = Math.random() < 0.6;
                if (pType === 'jumpCrit') isCrit = Math.random() < 0.5;
                if (pType === 'backlineCrit' || pType === 'critTank') if (Math.random() < 0.4) isCrit = true;
                
                var dmg = Math.floor(unit.baseDmg * (0.85 + Math.random() * 0.3) * (isCrit ? 1.5 : 1));

                // Tesla Tower ramping
                if (pType === 'sunRay') {
                    if (!unit._rajStacks) unit._rajStacks = 0;
                    if (!unit._rajTarget) unit._rajTarget = null;
                    if (unit._rajTarget !== target.key) { unit._rajStacks = 0; unit._rajTarget = target.key; }
                    unit._rajStacks = Math.min(15, unit._rajStacks + 1);
                    dmg = Math.floor(dmg * (1 + unit._rajStacks * 0.12));
                    if (unit._rajStacks > 1 && unit._rajStacks % 3 === 0) {
                        _warSpawnDmgPopup(unit.key, 'p', '⚡x' + unit._rajStacks, false);
                    }
                }

                // Defender immune hits (Prof. Proton)
                var defType = characters[target.key] ? characters[target.key].passiveType : null;
                if (defType === 'immuneHits') {
                    if (!target._hitsTaken) target._hitsTaken = 0;
                    target._hitsTaken++;
                    if (target._hitsTaken >= 3) { target._hitsTaken = 0; _warSpawnDmgPopup(target.key, 'e', '🛡️', false); dmg = 0; }
                }

                // Deflect (Beverly)
                if (defType === 'deflectLoot' && dmg > 0) {
                    var defl = Math.floor(dmg * 0.35);
                    unit.hp -= defl;
                    _warSpawnDmgPopup(unit.key, 'p', defl, false);
                    if (unit.hp <= 0) { unit.hp = 0; unit.alive = false; _warDeathEffect(unit.key, 'p'); }
                }

                // Damage cap 40% max HP
                var cap = Math.floor(target.maxHp * 0.40);
                if (dmg > cap) dmg = cap;

                // AOE: hit up to 3 targets
                if ((pType === 'critSplash' || pType === 'critAoe') && dmg > 0) {
                    var aoeTargets = fs.enemyTeam.filter(function(u) { return u.alive; }).slice(0, 3);
                    aoeTargets.forEach(function(at, ai) {
                        var aeDmg = ai === 0 ? dmg : Math.floor(dmg * 0.35);
                        at.hp -= aeDmg;
                        _warSpawnDmgPopup(at.key, 'e', aeDmg, isCrit && ai === 0);
                        if (at.hp <= 0) { at.hp = 0; at.alive = false; _warDeathEffect(at.key, 'e'); _warShowKillBanner(unit.key, at.key, 'p'); }
                    });
                } else if (dmg > 0) {
                    target.hp -= dmg;
                }

                // Zack crit tank self-heal (capped at 15% maxHP per hit)
                if (pType === 'critTank' && isCrit) {
                    var zHeal = Math.min(Math.floor(dmg * 0.2), Math.floor(unit.maxHp * 0.15));
                    unit.hp = Math.min(unit.maxHp, unit.hp + zHeal);
                }

                // Lifesteal (capped at 30%, heal capped at 15% maxHP per hit)
                if (pType === 'lifesteal' && dmg > 0) {
                    var lsPct = Math.min(((characters[unit.key] && characters[unit.key].basePassiveAmount) || 0.2), 0.30);
                    var lsAmt = Math.min(Math.floor(dmg * lsPct), Math.floor(unit.maxHp * 0.15));
                    unit.hp = Math.min(unit.maxHp, unit.hp + lsAmt);
                }

                // Self heal (Leonard) - NERFED: 5% maxHP per hit, capped at 8%
                if (pType === 'selfHeal') {
                    var shAmt = Math.min(Math.floor(unit.maxHp * 0.05), Math.floor(unit.maxHp * 0.08));
                    unit.hp = Math.min(unit.maxHp, unit.hp + shAmt);
                }

                // DOT (Amy poison / Raj sun)
                if (pType === 'poisonAoe' && dmg > 0) {
                    target.hp -= Math.floor(dmg * 0.15);
                    _warSpawnDmgPopup(target.key, 'e', '☠️', false);
                }

                // Slow/Stun (Wil)
                if (pType === 'slowStun' && Math.random() < 0.2) {
                    _warSpawnDmgPopup(target.key, 'e', '⚡STUN', false);
                    fs.enemyTurnTimers[target.key] = -1500; // Delay next attack
                }

                // Summon Droids (Denise)
                if (pType === 'summonDroid') {
                    var dc = (characters[unit.key] && characters[unit.key].basePassiveAmount) || 2;
                    for (var di = 0; di < dc; di++) {
                        var dt = fs.enemyTeam.filter(function(u) { return u.alive; });
                        if (dt.length > 0) {
                            var drT = dt[Math.floor(Math.random() * dt.length)];
                            var drD = Math.floor(unit.baseDmg * 0.4);
                            drT.hp -= drD;
                            _warSpawnDmgPopup(drT.key, 'e', drD, false);
                            if (drT.hp <= 0) { drT.hp = 0; drT.alive = false; _warDeathEffect(drT.key, 'e'); }
                        }
                    }
                    if (Math.random() < 0.25) { _warSpawnDmgPopup(target.key, 'e', '🤖STUN', false); fs.enemyTurnTimers[target.key] = -1500; }
                }

                fs.log.push({ side: 'player', attacker: unit.name, attackerKey: unit.key, target: target.name, targetKey: target.key, dmg: dmg, crit: isCrit });
                _warAttackEffect(unit.key, 'p');
                _warHitEffect(target.key, 'e');
                if (!(pType === 'critSplash' || pType === 'critAoe')) _warSpawnDmgPopup(target.key, 'e', dmg, isCrit);
                _warSpawnAttackVisual(unit.key, 'p', target.key, 'e', isCrit);
                if (isCrit) { _warCritBurst(target.key, 'e'); _warScreenShake(); }
                if (target.hp <= 0) {
                    target.hp = 0; target.alive = false;
                    fs.log.push({ side: 'player', event: 'kill', text: unit.name + ' defeated ' + target.name + '!' });
                    _warDeathEffect(target.key, 'e');
                    _warShowKillBanner(unit.key, target.key, 'p');
                    _warScreenShake();
                }
            }

            // Team heals (Bernie, Mary)
            if (pType === 'healScaling' || pType === 'healLoot') {
                var hPct = (characters[unit.key] && characters[unit.key].healPctMaxHp) || 0.10;
                fs.playerTeam.forEach(function(ally) {
                    if (ally.alive && ally.hp < ally.maxHp) {
                        var hA = Math.floor(ally.maxHp * hPct);
                        ally.hp = Math.min(ally.maxHp, ally.hp + hA);
                    }
                });
            }

            // Rage (Penny)
            if (pType === 'rage') {
                fs.playerTeam.forEach(function(ally) {
                    if (ally.alive && !ally._rageBuffed) {
                        ally._rageBuffed = true;
                        _warSpawnDmgPopup(ally.key, 'p', '🔥RAGE', false);
                        setTimeout(function() { ally._rageBuffed = false; }, 5000);
                    }
                });
            }
        }
    });

    // Process each enemy unit
    fs.enemyTeam.forEach(function(unit) {
        if (!unit.alive) return;
        fs.enemyTurnTimers[unit.key] = (fs.enemyTurnTimers[unit.key] || 0) + WAR_FIGHT_TICK;
        
        var eAtkSpeed = unit.atkSpeed;
        if (unit._rageBuffed) eAtkSpeed = Math.floor(eAtkSpeed * 0.7);

        if (fs.enemyTurnTimers[unit.key] >= eAtkSpeed) {
            fs.enemyTurnTimers[unit.key] = 0;
            var ePType = characters[unit.key] ? characters[unit.key].passiveType : null;

            // Target selection
            var target;
            if (ePType === 'backlineSpeed' || ePType === 'backlineCrit' || ePType === 'jumpCrit') {
                var eBacks = fs.playerTeam.filter(function(u) { return u.alive && characters[u.key] && characters[u.key].lane === 'back'; });
                target = eBacks.length > 0 ? eBacks[Math.floor(Math.random() * eBacks.length)] : _pickTarget(fs.playerTeam, unit);
            } else {
                target = _pickTarget(fs.playerTeam, unit);
            }

            if (target) {
                var isCrit = Math.random() < 0.1;
                if (ePType === 'critSplash' || ePType === 'critAoe') isCrit = Math.random() < 0.5;
                if (ePType === 'jumpCrit') isCrit = Math.random() < 0.4;
                if (ePType === 'backlineCrit' || ePType === 'critTank') if (Math.random() < 0.35) isCrit = true;

                var dmg = Math.floor(unit.baseDmg * (0.85 + Math.random() * 0.3) * (isCrit ? 1.5 : 1));

                // Tesla Tower
                if (ePType === 'sunRay') {
                    if (!unit._rajStacks) unit._rajStacks = 0;
                    if (!unit._rajTarget) unit._rajTarget = null;
                    if (unit._rajTarget !== target.key) { unit._rajStacks = 0; unit._rajTarget = target.key; }
                    unit._rajStacks = Math.min(15, unit._rajStacks + 1);
                    dmg = Math.floor(dmg * (1 + unit._rajStacks * 0.12));
                }

                // Defender immune hits
                var eDefType = characters[target.key] ? characters[target.key].passiveType : null;
                if (eDefType === 'immuneHits') {
                    if (!target._hitsTaken) target._hitsTaken = 0;
                    target._hitsTaken++;
                    if (target._hitsTaken >= 3) { target._hitsTaken = 0; _warSpawnDmgPopup(target.key, 'p', '🛡️', false); dmg = 0; }
                }

                // Deflect
                if (eDefType === 'deflectLoot' && dmg > 0) {
                    var eDefl = Math.floor(dmg * 0.35);
                    unit.hp -= eDefl;
                    _warSpawnDmgPopup(unit.key, 'e', eDefl, false);
                    if (unit.hp <= 0) { unit.hp = 0; unit.alive = false; _warDeathEffect(unit.key, 'e'); }
                }

                // Damage cap
                var eCap = Math.floor(target.maxHp * 0.40);
                if (dmg > eCap) dmg = eCap;

                // AOE
                if ((ePType === 'critSplash' || ePType === 'critAoe') && dmg > 0) {
                    var eAoe = fs.playerTeam.filter(function(u) { return u.alive; }).slice(0, 3);
                    eAoe.forEach(function(at, ai) {
                        var aD = ai === 0 ? dmg : Math.floor(dmg * 0.35);
                        at.hp -= aD;
                        _warSpawnDmgPopup(at.key, 'p', aD, isCrit && ai === 0);
                        if (at.hp <= 0) { at.hp = 0; at.alive = false; _warDeathEffect(at.key, 'p'); _warShowKillBanner(unit.key, at.key, 'e'); }
                    });
                } else if (dmg > 0) {
                    target.hp -= dmg;
                }

                // Crit Tank heal - REMOVED for enemy units (only players get lifesteal)
                // if (ePType === 'critTank' && isCrit) { ... }

                // Lifesteal - REMOVED for enemy units (only players get lifesteal)
                // if (ePType === 'lifesteal' && dmg > 0) { ... }

                // Self heal - REMOVED for enemy units (only players get lifesteal)
                // if (ePType === 'selfHeal') { ... }

                // DOT
                if (ePType === 'poisonAoe' && dmg > 0) { target.hp -= Math.floor(dmg * 0.15); }

                // Stun
                if (ePType === 'slowStun' && Math.random() < 0.2) { fs.playerTurnTimers[target.key] = -1500; _warSpawnDmgPopup(target.key, 'p', '⚡STUN', false); }

                // Droids
                if (ePType === 'summonDroid') {
                    var eDc = (characters[unit.key] && characters[unit.key].basePassiveAmount) || 2;
                    for (var eDi = 0; eDi < eDc; eDi++) {
                        var eDt = fs.playerTeam.filter(function(u) { return u.alive; });
                        if (eDt.length > 0) { var eDr = eDt[Math.floor(Math.random() * eDt.length)]; eDr.hp -= Math.floor(unit.baseDmg * 0.4); if (eDr.hp <= 0) { eDr.hp = 0; eDr.alive = false; _warDeathEffect(eDr.key, 'p'); } }
                    }
                }

                fs.log.push({ side: 'enemy', attacker: unit.name, attackerKey: unit.key, target: target.name, targetKey: target.key, dmg: dmg, crit: isCrit });
                _warAttackEffect(unit.key, 'e');
                _warHitEffect(target.key, 'p');
                if (!(ePType === 'critSplash' || ePType === 'critAoe')) _warSpawnDmgPopup(target.key, 'p', dmg, isCrit);
                _warSpawnAttackVisual(unit.key, 'e', target.key, 'p', isCrit);
                if (isCrit) { _warCritBurst(target.key, 'p'); _warScreenShake(); }
                if (target.hp <= 0) {
                    target.hp = 0; target.alive = false;
                    fs.log.push({ side: 'enemy', event: 'kill', text: unit.name + ' defeated ' + target.name + '!' });
                    _warDeathEffect(target.key, 'p');
                    _warShowKillBanner(unit.key, target.key, 'e');
                    _warScreenShake();
                }
            }

            // Team heals
            if (ePType === 'healScaling' || ePType === 'healLoot') {
                var eHPct = (characters[unit.key] && characters[unit.key].healPctMaxHp) || 0.10;
                fs.enemyTeam.forEach(function(ally) { if (ally.alive && ally.hp < ally.maxHp) { ally.hp = Math.min(ally.maxHp, ally.hp + Math.floor(ally.maxHp * eHPct)); } });
            }

            // Rage
            if (ePType === 'rage') {
                fs.enemyTeam.forEach(function(ally) { if (ally.alive && !ally._rageBuffed) { ally._rageBuffed = true; setTimeout(function() { ally._rageBuffed = false; }, 5000); } });
            }
        }
    });

    // Check end conditions
    var pAlive = fs.playerTeam.filter(function(u) { return u.alive; }).length;
    var eAlive = fs.enemyTeam.filter(function(u) { return u.alive; }).length;

    if (eAlive === 0 || pAlive === 0 || fs.tick >= fs.maxTicks) {
        fs.finished = true;
        clearInterval(warFightTimer);
        if (warEmberTimer) { clearInterval(warEmberTimer); warEmberTimer = null; }
        _finishWarFight();
    }

    _updateWarFightDisplay();
}

function _pickTarget(enemies, attacker) {
    var alive = enemies.filter(function(e) { return e.alive; });
    if (alive.length === 0) return null;
    // Assassins target back, others target front first
    if (attacker.classType === 'assassin') {
        var backs = alive.filter(function(e) { return e.lane === 'back'; });
        if (backs.length > 0) return backs[Math.floor(Math.random() * backs.length)];
    }
    // Lane priority: front > mid > back
    var lanes = ['front', 'mid', 'back'];
    for (var i = 0; i < lanes.length; i++) {
        var targets = alive.filter(function(e) { return e.lane === lanes[i]; });
        if (targets.length > 0) return targets[Math.floor(Math.random() * targets.length)];
    }
    return alive[Math.floor(Math.random() * alive.length)];
}

function _finishWarFight() {
    var fs = warFightState;
    var w = state.guildWar;
    var base = fs.base;

    // Calculate result: stars based on enemy kills
    var totalEnemy = fs.enemyTeam.length;
    var killed = fs.enemyTeam.filter(function(u) { return !u.alive; }).length;
    var killRatio = killed / Math.max(totalEnemy, 1);

    var newStars = 0;
    if (killRatio >= 1.0) newStars = 3;      // all killed
    else if (killRatio >= 0.6) newStars = 2;  // 60%+
    else if (killRatio >= 0.3) newStars = 1;  // 30%+

    var prevStars = base.starsEarned;
    var actualNew = Math.max(newStars, prevStars);
    var starsGained = actualNew - prevStars;

    // Total damage dealt to enemies
    var totalDmg = 0;
    fs.enemyTeam.forEach(function(u) { totalDmg += (u.maxHp - Math.max(0, u.hp)); });

    // Update state
    base.starsEarned = actualNew;
    if (totalDmg > base.bestDamage) base.bestDamage = totalDmg;
    base.attackedBy.push({ damage: totalDmg, stars: newStars, killed: killed, total: totalEnemy });
    w.myStars += starsGained;
    w.attacksUsed++;
    w.attacks.push({ baseId: fs.baseId, baseName: 'Base #' + base.rank, damage: totalDmg, stars: newStars, starsGained: starsGained, killed: killed, total: totalEnemy, time: Date.now() });
    saveProgress();

    // Store result for display
    warFightState._result = { newStars: newStars, starsGained: starsGained, totalDmg: totalDmg, killed: killed, total: totalEnemy, killRatio: killRatio };
}

// ============================================================
// PVP-STYLE FIGHT SCREEN RENDERING
// ============================================================

function _warMakeCharHTML(unit, isPlayer) {
    var hpPct = Math.max(0, (unit.hp / unit.maxHp) * 100);
    var level = unit.level;
    var dmg = unit.baseDmg;
    var opacity = unit.alive ? 1 : 0.2;

    // Get SVG sprite
    var sprite = '';
    if (unit.type === 'bot') {
        if (typeof vectors !== 'undefined' && vectors[unit.key]) {
            sprite = typeof vectors[unit.key] === 'string' ? vectors[unit.key] : (vectors[unit.key].idle || '');
        }
    } else {
        if (isPlayer && typeof getVectorFrame === 'function') {
            sprite = getVectorFrame(unit.key, false);
        } else if (typeof vectors !== 'undefined' && vectors[unit.key]) {
            sprite = typeof vectors[unit.key] === 'string' ? vectors[unit.key] : (vectors[unit.key].idle || '');
        }
    }
    if (!sprite) sprite = '<div style="font-size:24px;">' + (unit.type === 'bot' ? '\u{1F916}' : '\u2753') + '</div>';

    var flipStyle = isPlayer ? '' : 'transform:scaleX(-1);';
    var hpBg = hpPct > 50 ? 'from-green-500 to-green-400' : hpPct > 25 ? 'from-yellow-500 to-yellow-400' : 'from-red-600 to-red-400';
    var lowHpClass = (unit.alive && hpPct <= 25 && hpPct > 0) ? ' war-low-hp' : '';

    var side = isPlayer ? 'p' : 'e';
    var unitId = 'war-unit-' + side + '-' + unit.key;
    var h = '<div class="war-char' + lowHpClass + '" id="' + unitId + '" data-war-side="' + side + '" data-war-key="' + unit.key + '" style="opacity:' + opacity + ';">';

    // HP bar on top
    h += '<div style="width:92%;height:5px;background:#1a0505;border:1px solid #7f1d1d;border-radius:3px;overflow:hidden;margin-bottom:2px;box-shadow:inset 0 1px 2px rgba(0,0,0,0.5);">' +
        '<div data-war-hp="1" class="bg-gradient-to-r ' + hpBg + '" style="height:100%;width:' + hpPct + '%;transition:width 0.3s ease-out;border-radius:2px;box-shadow:0 0 4px rgba(74,222,128,0.3);"></div></div>' +
        '<div data-war-hptext="1" style="font-size:5px;color:#94a3b8;font-weight:bold;margin-bottom:1px;">' + Math.ceil(unit.hp) + '/' + unit.maxHp + '</div>';

    // Stat badges
    h += '<div style="display:flex;gap:1px;margin-bottom:1px;">' +
        '<span class="war-badge" style="background:rgba(120,53,15,0.9);color:#fcd34d;font-size:6px;padding:0px 3px;box-sizing:border-box;border-radius:2px;border:1px solid #92400e;font-weight:bold;">L' + level + '</span>' +
        '<span class="war-badge" style="background:rgba(22,101,52,0.9);color:#86efac;font-size:6px;padding:0px 3px;box-sizing:border-box;border-radius:2px;border:1px solid #166534;font-weight:bold;">' + dmg + '</span>' +
    '</div>';

    // Sprite
    h += '<div class="war-sprite" style="width:90px;height:100px;' + flipStyle + '">' + sprite + '</div>';

    // Name
    h += '<span class="war-name" style="background:rgba(69,26,3,0.9);color:white;border:1px solid #92400e;font-weight:bold;font-size:7px;padding:1px 4px;box-sizing:border-box;border-radius:2px;white-space:nowrap;text-transform:uppercase;letter-spacing:0.3px;margin-top:-2px;">' + unit.name + '</span>';

    // Lane label
    h += '<span style="font-size:5px;color:#64748b;text-transform:uppercase;margin-top:1px;">' + (unit.lane || 'mid').toUpperCase() + '</span>';

    // Death skull
    if (!unit.alive) h += '<div style="position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);font-size:22px;z-index:10;filter:drop-shadow(0 0 4px red);">\u{1F480}</div>';

    h += '</div>';
    return h;
}

function _warFullTeamRender() {
    if (!warFightState) return;

    function getByLane(team, lane, type) {
        return team.filter(function(u) { return u.lane === lane && u.type === (type || 'char'); });
    }
    function getAllType(team, type) {
        return team.filter(function(u) { return u.type === type; });
    }

    var playerLine = document.getElementById('war-player-line');
    if (playerLine) {
        var ph = '';
        ['back', 'mid', 'front'].forEach(function(lane) {
            var chars = getByLane(warFightState.playerTeam, lane, 'char');
            if (chars.length === 0) return;
            ph += '<div style="display:flex;flex-direction:row;align-items:flex-end;gap:4px;">';
            chars.forEach(function(u) { ph += _warMakeCharHTML(u, true); });
            ph += '</div>';
        });
        playerLine.innerHTML = ph;
    }

    var robotLine = document.getElementById('war-robot-line');
    if (robotLine) {
        var rh = '';
        getAllType(warFightState.playerTeam, 'bot').forEach(function(u) { rh += _warMakeCharHTML(u, true); });
        robotLine.innerHTML = rh;
    }

    var enemyLine = document.getElementById('war-enemy-line');
    if (enemyLine) {
        var eh = '';
        ['back', 'mid', 'front'].forEach(function(lane) {
            var chars = getByLane(warFightState.enemyTeam, lane, 'char');
            if (chars.length === 0) return;
            eh += '<div style="display:flex;flex-direction:row;align-items:flex-end;gap:4px;">';
            chars.forEach(function(u) { eh += _warMakeCharHTML(u, false); });
            eh += '</div>';
        });
        enemyLine.innerHTML = eh;
    }

    var enemyRobots = document.getElementById('war-enemy-robots');
    if (enemyRobots) {
        var erh = '';
        getAllType(warFightState.enemyTeam, 'bot').forEach(function(u) { erh += _warMakeCharHTML(u, false); });
        enemyRobots.innerHTML = erh;
    }
}

function _renderWarFightScreen() {
    var existing = document.getElementById('war-fight-screen');
    if (existing) existing.remove();

    // Inject PvP-style battle CSS if not already present
    if (!document.getElementById('war-battle-styles')) {
        var st = document.createElement('style');
        st.id = 'war-battle-styles';
        st.textContent = [
            '@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}',
            '@keyframes warDmgFloat{0%{opacity:1;transform:translateY(0) scale(1);}70%{opacity:0.8;}100%{opacity:0;transform:translateY(-50px) scale(0.7);}}',
            '@keyframes warHealFloat{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-40px) scale(0.8);}}',
            '@keyframes warHitFlash{0%{filter:brightness(3) saturate(0);}100%{filter:brightness(1) saturate(1);}}',
            '@keyframes warShake{0%,100%{transform:translateX(0);}20%{transform:translateX(-4px);}40%{transform:translateX(4px);}60%{transform:translateX(-3px);}80%{transform:translateX(2px);}}',
            '@keyframes warAttackLunge{0%{transform:translateX(0);}30%{transform:translateX(15px);}100%{transform:translateX(0);}}',
            '@keyframes warAttackLungeLeft{0%{transform:translateX(0);}30%{transform:translateX(-15px);}100%{transform:translateX(0);}}',
            '@keyframes warScreenShake{0%,100%{transform:translate(0,0);}10%{transform:translate(-3px,-2px);}20%{transform:translate(4px,1px);}30%{transform:translate(-2px,3px);}40%{transform:translate(3px,-1px);}50%{transform:translate(-1px,2px);}60%{transform:translate(2px,-3px);}70%{transform:translate(-4px,1px);}80%{transform:translate(1px,-2px);}90%{transform:translate(-2px,3px);}}',
            '@keyframes warGlowPulse{0%,100%{box-shadow:0 0 4px rgba(239,68,68,0.3);}50%{box-shadow:0 0 12px rgba(239,68,68,0.6),0 0 20px rgba(239,68,68,0.3);}}',
            '@keyframes warStarPop{0%{transform:scale(0) rotate(-30deg);opacity:0}60%{transform:scale(1.4) rotate(10deg)}100%{transform:scale(1) rotate(0);opacity:1}}',
            '@keyframes warCritBurst{0%{opacity:1;transform:scale(0.5);}50%{opacity:0.8;transform:scale(1.5);}100%{opacity:0;transform:scale(2);}}',
            '@keyframes warDeathExplode{0%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.2) rotate(10deg);}100%{opacity:0;transform:scale(0.3) rotate(30deg);}}',
            '@keyframes warEmber{0%{opacity:0;transform:translateY(0) scale(0);}20%{opacity:0.8;transform:scale(1);}100%{opacity:0;transform:translateY(-200px) translateX(30px) scale(0);}}',
            '@keyframes warKillBanner{0%{transform:scaleX(0);opacity:0;}30%{transform:scaleX(1.1);opacity:1;}50%{transform:scaleX(1);}100%{transform:scaleX(1);opacity:0;}}',
            '@keyframes warImpact{0%{transform:scale(0);opacity:1;}50%{transform:scale(1.5);opacity:0.6;}100%{transform:scale(2);opacity:0;}}',
            '@keyframes warBeamFire{0%{opacity:0;transform:scaleX(0);}20%{opacity:1;transform:scaleX(1);}80%{opacity:0.8;}100%{opacity:0;}}',
            '@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}',
            '#war-fight-screen .war-char{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;}',
            '#war-fight-screen .war-sprite{display:flex;align-items:flex-end;justify-content:center;overflow:hidden;max-width:90px;max-height:100px;}',
            '#war-fight-screen .war-sprite svg{width:100%!important;height:100%!important;max-width:90px!important;max-height:100px!important;}',
            '@media(max-width:768px){#war-fight-screen .war-sprite{width:70px!important;height:80px!important;}#war-fight-screen .war-name{font-size:6px!important;}#war-fight-screen .war-badge{font-size:5px!important;padding:0px 2px!important;}}',
            '@media(min-width:769px){#war-fight-screen .war-sprite{width:90px!important;height:100px!important;}}',
            '.war-hit{animation:warHitFlash 0.25s ease-out!important;}',
            '.war-shake{animation:warShake 0.3s ease-out!important;}',
            '.war-lunge{animation:warAttackLunge 0.35s ease-out!important;}',
            '.war-lunge-left{animation:warAttackLungeLeft 0.35s ease-out!important;}',
            '.war-death-anim{animation:warDeathExplode 0.5s ease-out forwards!important;}',
            '.war-screen-shake{animation:warScreenShake 0.35s ease-out!important;}',
            '.war-low-hp{animation:warGlowPulse 1s infinite!important;}'
        ].join('');
        document.head.appendChild(st);
    }

    var fs = warFightState;
    var w = state.guildWar;

    var screen = document.createElement('div');
    screen.id = 'war-fight-screen';
    screen.style.cssText = 'position:fixed;inset:0;z-index:99999;overflow:hidden;';

    var playerName = (typeof currentUser !== 'undefined' && currentUser && currentUser.username) ? currentUser.username.toUpperCase() : (typeof state !== 'undefined' && state.guestName ? state.guestName.toUpperCase() : 'YOU');
    var enemyName = w.enemy ? (w.enemy.icon + ' ' + w.enemy.name).toUpperCase() : 'ENEMY';

    var bgHtml = '';
    if (typeof backgrounds !== 'undefined' && backgrounds['clan_war_arena']) {
        bgHtml = backgrounds['clan_war_arena'];
    }

    screen.innerHTML =
    '<div id="war-battle-container" style="position:relative;width:100%;height:100%;background:linear-gradient(180deg,#0a0a0a,#1a0a00,#0a0a0a);overflow:hidden;">' +

        // Background
        '<div style="position:absolute;inset:0;z-index:0;">' + bgHtml + '</div>' +

        // TOP BAR — Cinematic HUD
        '<div style="position:absolute;top:0;left:0;right:0;z-index:50;background:linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.6),transparent);padding:6px 12px 14px;backdrop-filter:blur(3px);">' +
            '<div style="display:flex;align-items:center;gap:6px;">' +
                '<div style="flex:1;text-align:left;">' +
                    '<div style="font-size:12px;font-weight:900;color:#fbbf24;text-shadow:0 0 8px rgba(251,191,36,0.3);letter-spacing:1px;">' + playerName + '</div>' +
                    '<div style="font-size:7px;color:#64748b;">' + fs.playerTeam.length + ' units</div>' +
                '</div>' +
                '<div style="flex:2;display:flex;flex-direction:column;align-items:center;gap:3px;">' +
                    '<div style="display:flex;align-items:center;gap:6px;width:100%;">' +
                        '<div style="flex:1;height:6px;background:#1e293b;border-radius:4px;overflow:hidden;border:1px solid #334155;">' +
                            '<div id="war-timer-bar" style="height:100%;width:100%;background:linear-gradient(90deg,#f59e0b,#fbbf24);border-radius:4px;transition:width 0.1s;box-shadow:0 0 6px rgba(251,191,36,0.3);"></div>' +
                        '</div>' +
                        '<span id="war-timer-text" style="font-size:14px;font-weight:900;color:white;min-width:40px;text-align:center;text-shadow:0 0 6px rgba(255,255,255,0.3);">' + fs.maxTicks + '</span>' +
                    '</div>' +
                    '<span style="font-size:7px;color:#94a3b8;background:rgba(30,41,59,0.8);padding:1px 8px;box-sizing:border-box;border-radius:3px;border:1px solid #334155;">⚔️ WAR BASE #' + fs.base.rank + '</span>' +
                '</div>' +
                '<div style="flex:1;text-align:right;">' +
                    '<div style="font-size:12px;font-weight:900;color:#f87171;text-shadow:0 0 8px rgba(239,68,68,0.3);letter-spacing:1px;">' + enemyName + '</div>' +
                    '<div style="font-size:7px;color:#64748b;">' + fs.enemyTeam.length + ' units</div>' +
                '</div>' +
            '</div>' +
        '</div>' +

        // PLAYER TEAM (Left side)
        '<div style="position:absolute;left:3%;bottom:22%;z-index:20;display:flex;align-items:flex-end;gap:10px;">' +
            '<div id="war-player-line" style="display:flex;align-items:flex-end;gap:6px;margin-bottom:6vh;"></div>' +
            '<div id="war-robot-line" style="display:flex;align-items:center;gap:4px;z-index:25;"></div>' +
        '</div>' +

        // ENEMY TEAM (Right side, mirrored)
        '<div style="position:absolute;right:3%;bottom:22%;z-index:20;display:flex;flex-direction:row-reverse;align-items:flex-end;gap:10px;">' +
            '<div id="war-enemy-line" style="display:flex;flex-direction:row-reverse;align-items:flex-end;gap:6px;margin-bottom:6vh;"></div>' +
            '<div id="war-enemy-robots" style="display:flex;flex-direction:row-reverse;align-items:center;gap:4px;z-index:25;"></div>' +
        '</div>' +

        // EFFECTS LAYER
        '<div id="war-effects-layer" style="position:absolute;inset:0;z-index:70;pointer-events:none;overflow:hidden;"></div>' +

    '</div>';

    document.body.appendChild(screen);
    _warFullTeamRender();

    // Start ember spawning
    if (warEmberTimer) clearInterval(warEmberTimer);
    warEmberTimer = setInterval(_warSpawnEmbers, 1500);
}

// ── BATCHED DISPLAY UPDATES (PvP-style incremental) ────────
var _warDisplayDirty = false;
var _warDisplayTimer = null;

function _updateWarFightDisplay() {
    if (!warFightState) return;
    _warDisplayDirty = true;
    if (_warDisplayTimer) return;
    _warDisplayTimer = setTimeout(function() {
        _warDisplayTimer = null;
        if (!_warDisplayDirty || !warFightState) return;
        _warDisplayDirty = false;
        _warFlushDisplay();
    }, 200);
}

function _warFlushDisplay() {
    if (!warFightState) return;
    var fs = warFightState;

    function updateUnit(unit, side) {
        var unitId = 'war-unit-' + side + '-' + unit.key;
        var el = document.getElementById(unitId);
        if (!el) {
            _warFullTeamRender();
            return;
        }

        var hpPct = Math.max(0, (unit.hp / unit.maxHp) * 100);

        // Update HP bar width
        var hpBar = el.querySelector('[data-war-hp]');
        if (hpBar) {
            hpBar.style.width = hpPct + '%';
            var newBg = hpPct > 50 ? 'from-green-500 to-green-400' : hpPct > 25 ? 'from-yellow-500 to-yellow-400' : 'from-red-600 to-red-400';
            hpBar.className = 'bg-gradient-to-r ' + newBg;
        }

        // Update HP text
        var hpText = el.querySelector('[data-war-hptext]');
        if (hpText) hpText.textContent = Math.ceil(unit.hp) + '/' + unit.maxHp;

        // Update opacity for dead units
        el.style.opacity = unit.alive ? 1 : 0.2;

        // Low HP class
        if (unit.alive && hpPct <= 25) el.classList.add('war-low-hp');
        else el.classList.remove('war-low-hp');

        // Update sprite to injured state when HP drops below 50%
        if (unit.alive && unit.type === 'char' && hpPct < 50 && hpPct > 0) {
            var spriteEl = el.querySelector('.war-sprite');
            if (spriteEl && !spriteEl.getAttribute('data-war-injured')) {
                var injSvg = '';
                if (side === 'p' && typeof getVectorFrame === 'function') {
                    injSvg = getVectorFrame(unit.key, false, 'injured');
                } else if (typeof vectors !== 'undefined' && vectors[unit.key] && typeof vectors[unit.key] !== 'string') {
                    injSvg = vectors[unit.key].injured || '';
                }
                if (injSvg) {
                    spriteEl.innerHTML = injSvg;
                    spriteEl.setAttribute('data-war-injured', '1');
                }
            }
        }

        // Death skull overlay
        if (!unit.alive && !el.querySelector('[data-war-skull]')) {
            var skull = document.createElement('div');
            skull.setAttribute('data-war-skull', '1');
            skull.style.cssText = 'position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);font-size:22px;z-index:10;filter:drop-shadow(0 0 4px red);';
            skull.textContent = '\u{1F480}';
            el.appendChild(skull);
            el.style.filter = 'grayscale(1)';
        }
    }

    fs.playerTeam.forEach(function(u) { updateUnit(u, 'p'); });
    fs.enemyTeam.forEach(function(u) { updateUnit(u, 'e'); });

    // Update timer bar
    var tickPct = Math.max(0, 100 - (fs.tick / fs.maxTicks * 100));
    var timerBar = document.getElementById('war-timer-bar');
    if (timerBar) {
        timerBar.style.width = tickPct + '%';
        if (tickPct < 25) {
            timerBar.style.background = 'linear-gradient(90deg,#ef4444,#f87171)';
        } else if (tickPct < 50) {
            timerBar.style.background = 'linear-gradient(90deg,#f59e0b,#fbbf24)';
        }
    }
    var timerText = document.getElementById('war-timer-text');
    if (timerText) timerText.textContent = (fs.maxTicks - fs.tick);

    // Show result overlay if finished
    if (fs.finished && fs._result && !document.getElementById('war-result-overlay')) {
        _showWarResultOverlay();
    }
}

// ── DAMAGE POPUP ───────────────────────────────────────────
// ============================================================
// COMBAT VISUAL EFFECTS (PvP-style)
// ============================================================
var warKillCount = { p: 0, e: 0 };
var warEmberTimer = null;
var _warShakeTimer = null;
var _warDmgLastTime = 0;
var _warCritLastTime = 0;
var _warFxLastTime = {};

// Helpers
function _warRaf2(fn) { requestAnimationFrame(function() { requestAnimationFrame(fn); }); }
function _warRm(el, ms) { setTimeout(function() { if (el && el.parentNode) el.remove(); }, ms); }

function _warGetUnitPos(unitKey, side) {
    var el = document.getElementById('war-unit-' + side + '-' + unitKey);
    var screen = document.getElementById('war-fight-screen');
    if (!el || !screen) return null;
    var r = el.getBoundingClientRect();
    var s = screen.getBoundingClientRect();
    return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height * 0.3, el: el };
}

function _warSpawnDmgPopup(targetKey, side, dmg, isCrit) {
    var now = Date.now();
    if (!isCrit && now - _warDmgLastTime < 120) return;
    _warDmgLastTime = now;
    var pos = _warGetUnitPos(targetKey, side);
    var layer = document.getElementById('war-effects-layer');
    if (!pos || !layer) return;
    if (layer.children.length > 50) { var f = layer.firstChild; if (f) f.remove(); }
    var popup = document.createElement('div');
    var color = isCrit ? '#fbbf24' : '#ff6b6b';
    var size = isCrit ? '18px' : '13px';
    var text = isCrit ? '\u{1F4A5} ' + dmg : '-' + dmg;
    var xOff = (Math.random() - 0.5) * 30;
    popup.style.cssText = 'position:absolute;left:' + (pos.x + xOff) + 'px;top:' + pos.y + 'px;font-size:' + size + ';font-weight:900;color:' + color + ';text-shadow:0 1px 4px rgba(0,0,0,1), 0 0 8px ' + color + '80;z-index:100;pointer-events:none;animation:warDmgFloat 0.9s ease-out forwards;white-space:nowrap;font-family:monospace;';
    popup.textContent = text;
    layer.appendChild(popup);
    setTimeout(function() { if (popup.parentNode) popup.remove(); }, 950);
}

function _warAttackEffect(unitKey, side) {
    var pos = _warGetUnitPos(unitKey, side);
    if (!pos) return;
    var anim = side === 'p' ? 'warAttackLunge' : 'warAttackLungeLeft';
    pos.el.style.animation = anim + ' 0.3s ease-out';
    setTimeout(function() { pos.el.style.animation = ''; }, 350);
    // Swap sprite to attack frame during lunge
    _warSwapSpriteFrame(unitKey, side, 'attack', 300);
}

function _warHitEffect(unitKey, side) {
    var pos = _warGetUnitPos(unitKey, side);
    if (!pos) return;
    pos.el.style.transition = 'filter 0.1s';
    pos.el.style.filter = 'brightness(3) saturate(0)';
    setTimeout(function() { pos.el.style.filter = ''; }, 150);
    pos.el.style.animation = 'warShake 0.3s ease-out';
    setTimeout(function() { pos.el.style.animation = ''; }, 350);
    // Swap sprite to injured frame during hit reaction
    _warSwapSpriteFrame(unitKey, side, 'injured', 350);
}

// Swap Guild War character sprite to a different animation frame, then revert
function _warSwapSpriteFrame(unitKey, side, animState, durationMs) {
    var el = document.getElementById('war-unit-' + side + '-' + unitKey);
    if (!el) return;
    var spriteContainer = el.querySelector('.war-sprite');
    if (!spriteContainer) return;
    
    var isPlayer = (side === 'p');
    var newSvg = '';
    
    if (isPlayer && typeof getVectorFrame === 'function') {
        newSvg = getVectorFrame(unitKey, false, animState);
    } else if (!isPlayer) {
        if (typeof vectors !== 'undefined' && vectors[unitKey]) {
            if (typeof vectors[unitKey] === 'string') return;
            newSvg = vectors[unitKey][animState] || '';
        }
    }
    
    if (!newSvg) return;
    spriteContainer.innerHTML = newSvg;
    
    setTimeout(function() {
        if (!el.parentNode) return;
        var revertState = 'idle';
        if (warFightState) {
            var team = (side === 'p') ? warFightState.playerTeam : warFightState.enemyTeam;
            for (var i = 0; i < team.length; i++) {
                if (team[i].key === unitKey) {
                    var hpPct = (team[i].hp / team[i].maxHp) * 100;
                    if (hpPct < 50 && hpPct > 0 && team[i].alive) revertState = 'injured';
                    break;
                }
            }
        }
        var revertSvg = '';
        if (isPlayer && typeof getVectorFrame === 'function') {
            revertSvg = getVectorFrame(unitKey, false, revertState);
        } else if (!isPlayer && typeof vectors !== 'undefined' && vectors[unitKey]) {
            if (typeof vectors[unitKey] !== 'string') {
                revertSvg = vectors[unitKey][revertState] || vectors[unitKey].idle || '';
            }
        }
        if (revertSvg) spriteContainer.innerHTML = revertSvg;
    }, durationMs || 300);
}

function _warCritBurst(unitKey, side) {
    var now = Date.now();
    if (now - _warCritLastTime < 250) return;
    _warCritLastTime = now;
    var pos = _warGetUnitPos(unitKey, side);
    var layer = document.getElementById('war-effects-layer');
    if (!pos || !layer || layer.children.length > 30) return;
    var burst = document.createElement('div');
    burst.style.cssText = 'position:absolute;left:' + (pos.x - 25) + 'px;top:' + (pos.y - 15) + 'px;width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,rgba(251,191,36,0.6),rgba(239,68,68,0.2),transparent);z-index:99;pointer-events:none;animation:warCritBurst 0.45s ease-out forwards;';
    layer.appendChild(burst);
    var flash = document.createElement('div');
    flash.style.cssText = 'position:absolute;inset:0;background:rgba(251,191,36,0.08);z-index:90;pointer-events:none;';
    layer.appendChild(flash);
    setTimeout(function() { if (burst.parentNode) burst.remove(); if (flash.parentNode) flash.remove(); }, 500);
}

function _warDeathEffect(unitKey, side) {
    var pos = _warGetUnitPos(unitKey, side);
    var layer = document.getElementById('war-effects-layer');
    if (!pos || !layer) return;
    var skull = document.createElement('div');
    skull.style.cssText = 'position:absolute;left:' + (pos.x - 15) + 'px;top:' + (pos.y - 10) + 'px;font-size:30px;z-index:100;pointer-events:none;filter:drop-shadow(0 0 10px #dc2626);animation:warDmgFloat 1.3s ease-out forwards;';
    skull.textContent = '\u2620\uFE0F';
    layer.appendChild(skull);
    var burst = document.createElement('div');
    burst.style.cssText = 'position:absolute;left:' + (pos.x - 30) + 'px;top:' + (pos.y - 20) + 'px;width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,rgba(220,38,38,0.5),transparent);z-index:98;pointer-events:none;animation:warCritBurst 0.6s ease-out forwards;';
    layer.appendChild(burst);
    var ko = document.createElement('div');
    ko.style.cssText = 'position:absolute;left:' + (pos.x - 10) + 'px;top:' + (pos.y + 20) + 'px;font-size:14px;font-weight:900;color:#ef4444;text-shadow:0 0 8px #dc2626;z-index:100;pointer-events:none;animation:warDmgFloat 1s ease-out forwards;letter-spacing:3px;';
    ko.textContent = 'K.O.';
    layer.appendChild(ko);
    setTimeout(function() { if (skull.parentNode) skull.remove(); if (burst.parentNode) burst.remove(); if (ko.parentNode) ko.remove(); }, 1350);
}

function _warShowKillBanner(killerKey, victimKey, side) {
    var layer = document.getElementById('war-effects-layer');
    if (!layer) return;
    warKillCount[side]++;
    var killerName = characters[killerKey] ? characters[killerKey].name : killerKey;
    var victimName = characters[victimKey] ? characters[victimKey].name : victimKey;
    var streakText = '';
    var count = warKillCount[side];
    if (count >= 5) streakText = '\u{1F525} UNSTOPPABLE!';
    else if (count >= 4) streakText = '\u{1F525} DOMINATING!';
    else if (count >= 3) streakText = '\u26A1 TRIPLE KILL!';
    else if (count >= 2) streakText = '\u2694 DOUBLE KILL!';
    else streakText = '\u{1F480} ELIMINATED';
    var color = side === 'p' ? '#fbbf24' : '#ef4444';
    var banner = document.createElement('div');
    banner.style.cssText = 'position:absolute;top:35%;left:0;width:100%;z-index:100;text-align:center;pointer-events:none;animation:warKillBanner 1.8s ease-out forwards;';
    banner.innerHTML = '<div style="display:inline-block;background:linear-gradient(90deg,transparent,' + color + '20,' + color + '30,' + color + '20,transparent);padding:8px 40px;box-sizing:border-box;border-top:1px solid ' + color + '80;border-bottom:1px solid ' + color + '80;">' +
        '<div style="font-size:16px;font-weight:900;color:' + color + ';letter-spacing:4px;text-shadow:0 0 15px ' + color + ';">' + streakText + '</div>' +
        '<div style="font-size:9px;color:#94a3b8;margin-top:2px;">' + killerName + ' \u{2192} ' + victimName + '</div></div>';
    layer.appendChild(banner);
    setTimeout(function() { if (banner.parentNode) banner.remove(); }, 1900);
}

function _warSpawnEmbers() {
    var layer = document.getElementById('war-effects-layer');
    if (!layer || !warFightState || warFightState.finished) return;
    if (layer.children.length > 40) return;
    var ember = document.createElement('div');
    var x = Math.random() * 100;
    var size = 2 + Math.random() * 3;
    var dur = 2.5 + Math.random() * 3;
    var hue = Math.random() > 0.5 ? '#f59e0b' : '#ef4444';
    ember.style.cssText = 'position:absolute;bottom:15%;left:' + x + '%;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + hue + ';box-shadow:0 0 4px ' + hue + ';pointer-events:none;animation:warEmber ' + dur + 's ease-out forwards;opacity:0;';
    layer.appendChild(ember);
    _warRm(ember, dur * 1000 + 100);
}

function _warSpawnAttackVisual(attackerKey, attackerSide, targetKey, targetSide, isCrit) {
    var layer = document.getElementById('war-effects-layer');
    if (!layer || layer.children.length > 30) return;
    var now = Date.now();
    var fxKey = attackerSide + '_' + attackerKey;
    if (_warFxLastTime[fxKey] && (now - _warFxLastTime[fxKey]) < 300) return;
    _warFxLastTime[fxKey] = now;
    var aPos = _warGetUnitPos(attackerKey, attackerSide);
    var tPos = _warGetUnitPos(targetKey, targetSide);
    if (!aPos || !tPos) return;

    var dx = tPos.x - aPos.x;
    var dy = tPos.y - aPos.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx) * (180 / Math.PI);

    switch (attackerKey) {
        case 'sheldon':
            var ball = document.createElement('div');
            ball.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 8) + 'px;width:16px;height:16px;border-radius:50%;background:radial-gradient(circle,#86efac,#22c55e,#15803d);box-shadow:0 0 12px #22c55e,0 0 24px #22c55e60;z-index:86;pointer-events:none;transition:left 0.25s ease-in,top 0.25s ease-in;transform:scale(1.5);';
            layer.appendChild(ball);
            _warRaf2(function() { ball.style.left = tPos.x + 'px'; ball.style.top = (tPos.y - 8) + 'px'; ball.style.opacity = '0'; });
            _warRm(ball, 300);
            break;
        case 'leonard':
            var sw = document.createElement('div');
            var sz = isCrit ? 55 : 40;
            sw.style.cssText = 'position:absolute;left:' + (tPos.x - sz / 2) + 'px;top:' + (tPos.y - sz / 2 - 10) + 'px;width:' + sz + 'px;height:' + sz + 'px;z-index:86;pointer-events:none;';
            sw.innerHTML = '<svg viewBox="0 0 100 100" style="width:100%;height:100%;filter:drop-shadow(0 0 8px rgba(255,255,255,0.5));"><path d="M10 90 L80 20 L90 10 L80 0 L70 10 L0 80 Z" fill="#f1f5f9" stroke="#334155" stroke-width="2.5"><animate attributeName="opacity" values="0;1;1;0" dur="0.35s" fill="freeze"/></path></svg>';
            layer.appendChild(sw);
            _warRm(sw, 400);
            break;
        case 'howard':
            var ms = document.createElement('div');
            ms.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 5) + 'px;z-index:86;pointer-events:none;transition:left 0.2s linear,top 0.2s linear;transform:rotate(' + angle + 'deg);transform-origin:center;';
            ms.innerHTML = '<svg viewBox="0 0 60 20" width="36" height="12" style="filter:drop-shadow(0 0 8px rgba(220,38,38,0.8));"><path d="M0 5 L40 5 L55 10 L40 15 L0 15 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1"/><polygon points="0,5 -12,0 -7,10" fill="#dc2626"/><polygon points="0,15 -12,20 -7,10" fill="#dc2626"/><circle cx="45" cy="10" r="2" fill="#eab308"/></svg>';
            layer.appendChild(ms);
            _warRaf2(function() { ms.style.left = tPos.x + 'px'; ms.style.top = (tPos.y - 5) + 'px'; });
            _warRm(ms, 280);
            break;
        case 'penny':
            var bg = document.createElement('div');
            bg.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 12) + 'px;z-index:86;pointer-events:none;transition:left 0.35s ease-in,top 0.35s ease-in;';
            bg.innerHTML = '<svg viewBox="0 0 40 40" width="32" height="32" style="filter:drop-shadow(0 0 6px #d97706);"><path d="M5,20 Q20,5 35,20 Z" fill="#d97706"/><rect x="5" y="21" width="30" height="4" fill="#16a34a" rx="1"/><rect x="5" y="25" width="30" height="6" fill="#451a03" rx="2"/><rect x="5" y="32" width="30" height="6" fill="#d97706" rx="2"/></svg>';
            layer.appendChild(bg);
            _warRaf2(function() { bg.style.left = tPos.x + 'px'; bg.style.top = (tPos.y - 12) + 'px'; bg.style.transform = 'rotate(360deg)'; });
            _warRm(bg, 400);
            break;
        case 'raj':
            var sun = document.createElement('div');
            sun.style.cssText = 'position:absolute;left:' + (tPos.x - 25) + 'px;top:' + (tPos.y - 80) + 'px;width:50px;height:50px;z-index:86;pointer-events:none;animation:warCritBurst 0.8s ease-out forwards;';
            sun.innerHTML = '<svg viewBox="0 0 100 100" style="width:100%;height:100%;animation:spin 1s linear infinite;filter:drop-shadow(0 0 15px #ea580c);"><circle cx="50" cy="50" r="30" fill="#ea580c"/><path d="M50 0 L55 15 L70 10 L60 25 L80 30 L65 40 L85 55 L70 60 L75 80 L60 70 L50 90 L40 70 L25 80 L30 60 L15 55 L35 40 L20 30 L40 25 L30 10 L45 15 Z" fill="#facc15"/></svg>';
            layer.appendChild(sun);
            var beam = document.createElement('div');
            beam.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 1) + 'px;width:' + dist + 'px;height:3px;background:linear-gradient(90deg,#ea580c,#facc15,transparent);transform-origin:0 50%;transform:rotate(' + angle + 'deg);z-index:85;pointer-events:none;animation:warBeamFire 0.35s ease-out forwards;box-shadow:0 0 6px #ea580c;';
            layer.appendChild(beam);
            _warRm(sun, 900); _warRm(beam, 400);
            break;
        case 'amy':
            var flask = document.createElement('div');
            flask.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 10) + 'px;z-index:86;pointer-events:none;transition:left 0.3s ease-in,top 0.3s ease-in;';
            flask.innerHTML = '<svg viewBox="0 0 40 40" width="24" height="24" style="filter:drop-shadow(0 0 8px #4ade80);"><path d="M15 10 L25 10 L22 15 L28 35 L12 35 L18 15 Z" fill="#22c55e" stroke="#14532d" stroke-width="2"/><rect x="18" y="5" width="4" height="6" fill="#94a3b8"/></svg>';
            layer.appendChild(flask);
            _warRaf2(function() { flask.style.left = tPos.x + 'px'; flask.style.top = (tPos.y - 10) + 'px'; flask.style.transform = 'rotate(360deg)'; });
            setTimeout(function() {
                if (flask.parentNode) flask.remove();
                var splash = document.createElement('div');
                splash.style.cssText = 'position:absolute;left:' + (tPos.x - 20) + 'px;top:' + (tPos.y - 20) + 'px;width:40px;height:40px;z-index:86;pointer-events:none;';
                splash.innerHTML = '<svg viewBox="0 0 100 100" style="width:100%;height:100%;"><circle cx="50" cy="50" r="10" fill="none" stroke="#4ade80" stroke-width="4" opacity="0.8"><animate attributeName="r" from="10" to="45" dur="0.35s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur="0.35s" fill="freeze"/></circle></svg>';
                layer.appendChild(splash);
                _warRm(splash, 500);
            }, 320);
            break;
        case 'stuart':
            var saber = document.createElement('div');
            saber.style.cssText = 'position:absolute;left:' + (tPos.x - 20) + 'px;top:' + (tPos.y - 30) + 'px;width:40px;height:60px;z-index:86;pointer-events:none;';
            saber.innerHTML = '<svg viewBox="0 0 40 60" style="width:100%;height:100%;filter:drop-shadow(0 0 10px #3b82f6);"><rect x="17" y="35" width="6" height="18" rx="2" fill="#666"/><rect x="15" y="2" width="10" height="35" rx="3" fill="#3b82f6" opacity="0.9"><animate attributeName="opacity" values="1;0.5;1;0" dur="0.3s" fill="freeze"/></rect></svg>';
            layer.appendChild(saber);
            _warRm(saber, 350);
            break;
        case 'bernie':
            var wave = document.createElement('div');
            wave.style.cssText = 'position:absolute;left:' + (aPos.x - 20) + 'px;top:' + (aPos.y - 20) + 'px;width:40px;height:40px;z-index:86;pointer-events:none;';
            wave.innerHTML = '<svg viewBox="0 0 60 60" style="width:100%;height:100%;"><circle cx="30" cy="30" r="5" fill="none" stroke="#f472b6" stroke-width="2" opacity="0.8"><animate attributeName="r" from="5" to="28" dur="0.4s" fill="freeze"/><animate attributeName="opacity" from="0.9" to="0" dur="0.4s" fill="freeze"/></circle></svg>';
            layer.appendChild(wave);
            _warRm(wave, 500);
            break;
        case 'emily':
            var dagger = document.createElement('div');
            dagger.style.cssText = 'position:absolute;left:' + (tPos.x - 18) + 'px;top:' + (tPos.y - 18) + 'px;width:36px;height:36px;z-index:86;pointer-events:none;';
            dagger.innerHTML = '<svg viewBox="0 0 40 40" style="width:100%;height:100%;filter:drop-shadow(0 0 8px #7c3aed);"><path d="M5,35 L20,5 L35,35 Z" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0.9"><animate attributeName="opacity" values="0;1;0.8;0" dur="0.35s" fill="freeze"/></path></svg>';
            layer.appendChild(dagger);
            var shadow = document.createElement('div');
            shadow.style.cssText = 'position:absolute;left:' + (aPos.x - 15) + 'px;top:' + (aPos.y - 15) + 'px;width:30px;height:30px;background:rgba(124,58,237,0.3);border-radius:50%;z-index:85;pointer-events:none;filter:blur(4px);animation:warCritBurst 0.4s ease-out forwards;';
            layer.appendChild(shadow);
            _warRm(dagger, 400); _warRm(shadow, 450);
            break;
        case 'leslie':
            var tracer = document.createElement('div');
            tracer.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 1) + 'px;width:' + dist + 'px;height:2px;background:linear-gradient(90deg,#ef4444,#fca5a5,transparent);transform-origin:0 50%;transform:rotate(' + angle + 'deg);z-index:86;pointer-events:none;opacity:0;';
            layer.appendChild(tracer);
            _warRaf2(function() { tracer.style.opacity = '1'; tracer.style.transition = 'opacity 0.05s'; });
            setTimeout(function() { tracer.style.opacity = '0'; }, 100);
            var muzzle = document.createElement('div');
            muzzle.style.cssText = 'position:absolute;left:' + (aPos.x - 8) + 'px;top:' + (aPos.y - 8) + 'px;width:16px;height:16px;background:radial-gradient(circle,#fff,#ef4444,transparent);border-radius:50%;z-index:87;pointer-events:none;animation:warImpact 0.15s ease-out forwards;';
            layer.appendChild(muzzle);
            var spark = document.createElement('div');
            spark.style.cssText = 'position:absolute;left:' + (tPos.x - 8) + 'px;top:' + (tPos.y - 8) + 'px;width:16px;height:16px;background:radial-gradient(circle,#fff,#ef4444,transparent);border-radius:50%;z-index:87;pointer-events:none;animation:warImpact 0.2s ease-out forwards;';
            layer.appendChild(spark);
            _warRm(tracer, 180); _warRm(muzzle, 180); _warRm(spark, 250);
            break;
        case 'bert':
            var rock = document.createElement('div');
            rock.style.cssText = 'position:absolute;left:' + (tPos.x - 25) + 'px;top:' + (tPos.y - 10) + 'px;width:50px;height:30px;z-index:86;pointer-events:none;';
            rock.innerHTML = '<svg viewBox="0 0 80 40" style="width:100%;height:100%;filter:drop-shadow(0 0 4px #57534e);"><polygon points="10,35 20,15 30,35" fill="#78716c"/><polygon points="25,35 38,8 50,35" fill="#a8a29e"/><polygon points="45,35 55,12 65,35" fill="#57534e"/><circle cx="40" cy="30" r="5" fill="rgba(168,162,158,0.3)"><animate attributeName="r" from="5" to="25" dur="0.35s" fill="freeze"/><animate attributeName="opacity" from="0.6" to="0" dur="0.35s" fill="freeze"/></circle></svg>';
            layer.appendChild(rock);
            _warRm(rock, 450);
            break;
        case 'zack':
            var pow = document.createElement('div');
            var ps = isCrit ? 55 : 40;
            pow.style.cssText = 'position:absolute;left:' + (tPos.x - ps / 2) + 'px;top:' + (tPos.y - ps / 2) + 'px;width:' + ps + 'px;height:' + ps + 'px;z-index:87;pointer-events:none;';
            pow.innerHTML = '<svg viewBox="0 0 50 50" style="width:100%;height:100%;filter:drop-shadow(0 0 6px #fbbf24);"><text x="25" y="35" text-anchor="middle" font-size="28" fill="#fbbf24">\u{1F4A5}</text><circle cx="25" cy="25" r="5" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.7"><animate attributeName="r" from="5" to="24" dur="0.3s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur="0.3s" fill="freeze"/></circle></svg>';
            layer.appendChild(pow);
            _warRm(pow, 380);
            break;
        case 'mary':
            var cross = document.createElement('div');
            cross.style.cssText = 'position:absolute;left:' + (aPos.x - 15) + 'px;top:' + (aPos.y - 40) + 'px;width:30px;height:30px;z-index:86;pointer-events:none;';
            cross.innerHTML = '<svg viewBox="0 0 60 60" style="width:100%;height:100%;filter:drop-shadow(0 0 8px #fbbf24);"><circle cx="30" cy="30" r="20" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.7"><animate attributeName="r" from="8" to="28" dur="0.6s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze"/></circle><text x="30" y="36" text-anchor="middle" font-size="22" fill="#fbbf24">\u271E</text></svg>';
            layer.appendChild(cross);
            _warRm(cross, 650);
            break;
        case 'wil':
            var phaser = document.createElement('div');
            phaser.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 2) + 'px;width:' + dist + 'px;height:5px;background:linear-gradient(90deg,#f97316,#3b82f6,#60a5fa,transparent);transform-origin:0 50%;transform:rotate(' + angle + 'deg);z-index:86;pointer-events:none;opacity:0;border-radius:3px;box-shadow:0 0 8px rgba(59,130,246,0.6);';
            layer.appendChild(phaser);
            _warRaf2(function() { phaser.style.opacity = '1'; phaser.style.transition = 'opacity 0.06s'; });
            setTimeout(function() { phaser.style.opacity = '0'; }, 220);
            _warRm(phaser, 300);
            break;
        case 'beverly':
            var book = document.createElement('div');
            book.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 8) + 'px;z-index:86;pointer-events:none;transition:left 0.35s ease-in,top 0.35s ease-in,transform 0.35s linear;';
            book.innerHTML = '<svg viewBox="0 0 30 25" width="24" height="20"><rect x="2" y="2" width="26" height="21" rx="2" fill="#8B4513" stroke="#5c3317" stroke-width="1"/><line x1="15" y1="2" x2="15" y2="23" stroke="#d4a574" stroke-width="1"/></svg>';
            layer.appendChild(book);
            _warRaf2(function() { book.style.left = tPos.x + 'px'; book.style.top = (tPos.y - 8) + 'px'; book.style.transform = 'rotate(720deg) scale(0.5)'; });
            _warRm(book, 400);
            break;
        case 'kripke':
            var ar = document.createElement('div');
            ar.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 5) + 'px;z-index:86;pointer-events:none;transform-origin:center;transform:rotate(' + angle + 'deg);transition:left 0.25s linear,top 0.25s linear;';
            ar.innerHTML = '<svg viewBox="0 0 50 10" width="36" height="8"><line x1="0" y1="5" x2="40" y2="5" stroke="#8B4513" stroke-width="2"/><polygon points="40,2 48,5 40,8" fill="#a0a0a0"/></svg>';
            layer.appendChild(ar);
            _warRaf2(function() { ar.style.left = tPos.x + 'px'; ar.style.top = (tPos.y - 5) + 'px'; });
            _warRm(ar, 300);
            break;
        case 'proton':
            var ls = document.createElement('div');
            ls.style.cssText = 'position:absolute;left:' + (tPos.x - 15) + 'px;top:' + (tPos.y - 35) + 'px;width:30px;height:50px;z-index:86;pointer-events:none;';
            ls.innerHTML = '<svg viewBox="0 0 60 80" style="width:100%;height:100%;filter:drop-shadow(0 0 12px #22c55e);"><rect x="27" y="50" width="6" height="20" rx="2" fill="#666"/><rect x="25" y="5" width="10" height="48" rx="3" fill="#22c55e" opacity="0.9"><animate attributeName="opacity" values="1;0.5;1;0" dur="0.35s" fill="freeze"/></rect></svg>';
            layer.appendChild(ls);
            _warRm(ls, 400);
            break;
        default:
            var gen = document.createElement('div');
            gen.style.cssText = 'position:absolute;left:' + aPos.x + 'px;top:' + (aPos.y - 6) + 'px;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle,#fbbf24,#f59e0b);box-shadow:0 0 8px #f59e0b;z-index:86;pointer-events:none;transition:left 0.22s ease-in,top 0.22s ease-in;';
            layer.appendChild(gen);
            _warRaf2(function() { gen.style.left = tPos.x + 'px'; gen.style.top = (tPos.y - 6) + 'px'; gen.style.opacity = '0'; });
            _warRm(gen, 280);
            break;
    }

    // Impact flash at target (always)
    var impSz = isCrit ? 28 : 16;
    var imp = document.createElement('div');
    imp.style.cssText = 'position:absolute;left:' + (tPos.x - impSz / 2) + 'px;top:' + (tPos.y - impSz / 2) + 'px;width:' + impSz + 'px;height:' + impSz + 'px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.6),transparent);z-index:85;pointer-events:none;animation:warImpact 0.25s ease-out forwards;';
    layer.appendChild(imp);
    _warRm(imp, 300);
}

// ── SCREEN SHAKE ───────────────────────────────────────────
function _warScreenShake() {
    if (_warShakeTimer) return;
    var container = document.getElementById('war-battle-container');
    if (!container) return;
    container.classList.add('war-screen-shake');
    _warShakeTimer = setTimeout(function() { container.classList.remove('war-screen-shake'); _warShakeTimer = null; }, 400);
}

// ── RESULT OVERLAY ─────────────────────────────────────────
function _showWarResultOverlay() {
    var fs = warFightState;
    if (!fs || !fs._result) return;
    var r = fs._result;
    var screen = document.getElementById('war-fight-screen');
    if (!screen) return;

    var starsHtml = '';
    for (var i = 0; i < 3; i++) {
        starsHtml += '<span style="font-size:32px;color:' + (i < r.newStars ? '#fbbf24' : '#374151') + ';text-shadow:' + (i < r.newStars ? '0 0 12px rgba(251,191,36,0.7)' : 'none') + ';animation:' + (i < r.newStars ? 'warStarPop 0.4s ease ' + (i * 0.2) + 's both' : 'none') + ';">\u2605</span>';
    }
    var resColor = r.newStars >= 3 ? '#fbbf24' : r.newStars >= 2 ? '#22c55e' : r.newStars >= 1 ? '#3b82f6' : '#ef4444';
    var resText = r.newStars >= 3 ? 'PERFECT DESTRUCTION!' : r.newStars >= 2 ? 'GREAT ATTACK!' : r.newStars >= 1 ? 'DECENT ATTACK' : 'FAILED ATTACK';

    var overlay = document.createElement('div');
    overlay.id = 'war-result-overlay';
    overlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.88);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:200;';
    overlay.innerHTML =
        '<div style="color:' + resColor + ';font-weight:900;font-size:18px;text-transform:uppercase;letter-spacing:3px;margin-bottom:12px;text-shadow:0 0 20px ' + resColor + '60;">' + resText + '</div>' +
        '<div style="display:flex;gap:8px;margin-bottom:20px;">' + starsHtml + '</div>' +
        '<div style="color:white;font-size:13px;font-weight:bold;margin-bottom:4px;">Eliminated: ' + r.killed + '/' + r.total + '</div>' +
        '<div style="color:#9ca3af;font-size:10px;margin-bottom:4px;">Total Damage: ' + _fmtNum(r.totalDmg) + '</div>' +
        (r.starsGained > 0 ? '<div style="color:#fbbf24;font-weight:900;font-size:13px;margin-bottom:20px;">+' + r.starsGained + ' NEW STAR' + (r.starsGained > 1 ? 'S' : '') + '!</div>' : '<div style="color:#6b7280;font-size:10px;margin-bottom:20px;">No new stars (already ' + (fs.base.starsEarned) + '\u2605)</div>') +
        '<div style="color:#6b7280;font-size:10px;margin-bottom:16px;">Attacks left: ' + (MAX_ATTACKS - state.guildWar.attacksUsed) + '/' + MAX_ATTACKS + '</div>' +
        '<button onclick="document.getElementById(\'war-fight-screen\').remove(); openGuildRaid();" style="background:linear-gradient(to right,#b45309,#d97706);color:white;font-weight:900;padding:12px 40px;box-sizing:border-box;border-radius:10px;font-size:12px;text-transform:uppercase;letter-spacing:2px;border:2px solid #f59e0b;cursor:pointer;box-shadow:0 0 20px rgba(245,158,11,0.3);">CONTINUE</button>';

    var container = screen.querySelector('#war-battle-container') || screen;
    container.appendChild(overlay);
}

// ============================================================
// MAIN WAR UI
// ============================================================
function openGuildRaid() {
    if (!currentGuild) {
        if (typeof showGameAlert === 'function') showGameAlert('No Guild', 'Join a guild first to participate in Clan Wars!');
        return;
    }
    initGuildWar();
    var hub = document.getElementById('guild-hub-modal');
    if (hub) hub.classList.add('hidden');
    var existing = document.getElementById('guild-raid-modal');
    if (existing) existing.remove();
    var modal = document.createElement('div');
    modal.id = 'guild-raid-modal';
    modal.className = 'fixed inset-0 z-[300] flex flex-col';
    modal.style.cssText = 'background:linear-gradient(180deg, #0c0a09 0%, #1c1917 50%, #0c0a09 100%);';
    modal.innerHTML = '<div id="guild-war-root" class="flex flex-col h-full"></div>';
    document.body.appendChild(modal);
    _renderWarUI();
}

function _renderWarUI() {
    var root = document.getElementById('guild-war-root');
    if (!root) return;
    var w = state.guildWar;
    if (w.phase === WAR_PHASE.SEARCHING) _renderSearching(root);
    else if (w.phase === WAR_PHASE.BATTLE) _renderBattleMap(root);
    else if (w.phase === WAR_PHASE.ENDED) _renderWarResults(root);
    else _renderIdleScreen(root);
}

// ── WAR HISTORY DASHBOARD ──────────────────────────────────────────
function _openWarHistory() {
    var w = state.guildWar;
    var existing = document.getElementById('war-history-overlay');
    if (existing) existing.remove();

    var wins = w.totalWins || 0;
    var losses = w.totalLosses || 0;
    var draws = w.totalDraws || 0;
    var streak = w.warStreak || 0;
    var history = w.warHistory || [];

    // Calculate total stars earned across all wars
    var totalStars = 0;
    var bestWar = null;
    for (var i = 0; i < history.length; i++) {
        var h = history[i];
        totalStars += (h.myStars || 0);
        if (!bestWar || (h.myStars || 0) > (bestWar.myStars || 0)) {
            bestWar = h;
        }
    }

    // Last 10 wars
    var last10 = history.slice(0, 10);
    var warsHtml = '';
    if (last10.length > 0) {
        for (var j = 0; j < last10.length; j++) {
            var entry = last10[j];
            var rc = entry.result === 'win' ? 'color:#22c55e;border-color:#064e3b;' : entry.result === 'loss' ? 'color:#ef4444;border-color:#7f1d1d;' : 'color:#9ca3af;border-color:#374151;';
            var ri = entry.result === 'win' ? '\uD83C\uDFC6' : entry.result === 'loss' ? '\uD83D\uDC80' : '\uD83E\uDD1D';
            var timeAgo = '';
            if (entry.time) {
                var diff = Date.now() - entry.time;
                var hours = Math.floor(diff / 3600000);
                var days = Math.floor(diff / 86400000);
                if (days > 0) timeAgo = days + 'd ago';
                else if (hours > 0) timeAgo = hours + 'h ago';
                else timeAgo = 'Just now';
            }
            warsHtml += '<div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.3);border-radius:8px;padding:6px 10px;box-sizing:border-box;border:1px solid;' + rc + '">' +
                '<div style="display:flex;align-items:center;gap:6px;">' +
                    '<span style="font-size:12px;">' + ri + '</span>' +
                    '<div>' +
                        '<div style="font-size:9px;color:white;font-weight:bold;">' + (entry.enemyIcon || '') + ' ' + (entry.enemy || 'Unknown') + '</div>' +
                        '<div style="font-size:7px;color:#6b7280;">' + timeAgo + '</div>' +
                    '</div>' +
                '</div>' +
                '<div style="text-align:right;">' +
                    '<div style="font-size:9px;font-weight:bold;">' + entry.myStars + '\u2605 vs ' + entry.enemyStars + '\u2605</div>' +
                    '<div style="font-size:7px;font-weight:900;text-transform:uppercase;">' + entry.result.toUpperCase() + '</div>' +
                '</div>' +
            '</div>';
        }
    } else {
        warsHtml = '<div style="color:#4b5563;font-size:9px;text-align:center;padding:20px;">No wars fought yet. Start a war to build your history!</div>';
    }

    // Best war section
    var bestWarHtml = '';
    if (bestWar) {
        var bestRi = bestWar.result === 'win' ? '\uD83C\uDFC6' : bestWar.result === 'loss' ? '\uD83D\uDC80' : '\uD83E\uDD1D';
        bestWarHtml = '<div style="margin-top:10px;background:linear-gradient(135deg,rgba(120,53,15,0.3),rgba(154,52,18,0.3));border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:8px 10px;box-sizing:border-box;">' +
            '<div style="color:#f59e0b;font-weight:900;font-size:8px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">\uD83C\uDFC5 BEST SINGLE WAR</div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;">' +
                '<span style="font-size:9px;color:white;font-weight:bold;">' + bestRi + ' ' + (bestWar.enemyIcon || '') + ' ' + (bestWar.enemy || 'Unknown') + '</span>' +
                '<span style="font-size:10px;color:#fbbf24;font-weight:900;">' + bestWar.myStars + '\u2605</span>' +
            '</div>' +
        '</div>';
    }

    var overlay = document.createElement('div');
    overlay.id = 'war-history-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10001;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.88);padding:12px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

    overlay.innerHTML =
        '<div style="background:linear-gradient(135deg,#1a0f00,#1e1008,#0a0a1a);border:2px solid #d97706;border-radius:16px;padding:14px;max-width:440px;width:96%;box-sizing:border-box;max-height:90vh;overflow-y:auto;box-shadow:0 0 50px rgba(217,119,6,0.3);max-height:90vh;overflow-y:auto;position:relative;">' +
            '<button onclick="document.getElementById(\'war-history-overlay\').remove()" style="position:absolute;top:6px;right:10px;color:#64748b;font-size:18px;cursor:pointer;background:none;border:none;">\u00D7</button>' +
            '<div style="text-align:center;margin-bottom:12px;">' +
                '<div style="font-size:16px;font-weight:900;color:#f59e0b;letter-spacing:3px;text-shadow:0 0 20px rgba(245,158,11,0.5);">\uD83D\uDCDC WAR HISTORY</div>' +
                '<div style="font-size:8px;color:#64748b;margin-top:2px;">Your complete war record</div>' +
            '</div>' +

            // Stats grid
            '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-bottom:12px;">' +
                '<div style="background:rgba(0,0,0,0.4);border-radius:8px;padding:8px;text-align:center;border:1px solid #1e293b;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Record</div>' +
                    '<div style="color:#fbbf24;font-weight:900;font-size:11px;">' + wins + 'W-' + losses + 'L-' + draws + 'D</div>' +
                '</div>' +
                '<div style="background:rgba(0,0,0,0.4);border-radius:8px;padding:8px;text-align:center;border:1px solid #1e293b;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Streak</div>' +
                    '<div style="color:#22c55e;font-weight:900;font-size:11px;">' + streak + '\uD83D\uDD25</div>' +
                '</div>' +
                '<div style="background:rgba(0,0,0,0.4);border-radius:8px;padding:8px;text-align:center;border:1px solid #1e293b;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Total Stars</div>' +
                    '<div style="color:#fbbf24;font-weight:900;font-size:11px;">' + totalStars + '\u2605</div>' +
                '</div>' +
                '<div style="background:rgba(0,0,0,0.4);border-radius:8px;padding:8px;text-align:center;border:1px solid #1e293b;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Win Rate</div>' +
                    '<div style="color:#f59e0b;font-weight:900;font-size:11px;">' + ((wins + losses + draws) > 0 ? Math.round(wins / (wins + losses + draws) * 100) : 0) + '%</div>' +
                '</div>' +
            '</div>' +

            // Best war
            bestWarHtml +

            // Last 10 wars
            '<div style="margin-top:10px;">' +
                '<div style="color:#d97706;font-weight:900;font-size:9px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">\uD83D\uDD53 LAST ' + Math.min(10, last10.length) + ' WARS</div>' +
                '<div style="display:flex;flex-direction:column;gap:4px;max-height:260px;overflow-y:auto;">' + warsHtml + '</div>' +
            '</div>' +
        '</div>';

    document.body.appendChild(overlay);
}

// ── IDLE SCREEN ────────────────────────────────────────────
function _renderIdleScreen(root) {
    var w = state.guildWar;
    var warRecord = (w.totalWins || 0) + 'W - ' + (w.totalLosses || 0) + 'L - ' + (w.totalDraws || 0) + 'D';

    // Lineup preview — show from formation
    var lineupPreview = '';
    var hasLineup = false;
    if (w.warFormation) {
        ['front','mid','back'].forEach(function(lane) {
            var slots = w.warFormation[lane];
            if (!slots) return;
            slots.forEach(function(slot) {
                if (!slot || slot.type !== 'char') return;
                hasLineup = true;
                var cfg = characters[slot.key];
                var svg = typeof getVectorFrame === 'function' ? getVectorFrame(slot.key, false) : '';
                var rData = state.roster[slot.key];
                lineupPreview +=
                    '<div style="width:48px;text-align:center;">' +
                        '<div style="width:36px;height:40px;margin:0 auto;display:flex;align-items:center;justify-content:center;background:rgba(34,197,94,0.1);border-radius:6px;border:1px solid #22c55e40;">' + (svg || '👤') + '</div>' +
                        '<div style="font-size:5px;color:white;font-weight:bold;margin-top:1px;">' + (cfg ? cfg.name : slot.key) + '</div>' +
                        '<div style="font-size:5px;color:#6b7280;">Lv.' + (rData ? rData.level : '?') + '</div>' +
                    '</div>';
            });
        });
    }
    if (!hasLineup && w.warLineup && w.warLineup.length > 0) {
        hasLineup = true;
        w.warLineup.forEach(function(item) {
            var key = typeof item === 'string' ? item : (item && item.key ? item.key : null);
            if (!key) return;
            var cfg = characters[key];
            var svg = typeof getVectorFrame === 'function' ? getVectorFrame(key, false) : '';
            var rData = state.roster[key];
            lineupPreview +=
                '<div style="width:48px;text-align:center;">' +
                    '<div style="width:36px;height:40px;margin:0 auto;display:flex;align-items:center;justify-content:center;background:rgba(34,197,94,0.1);border-radius:6px;border:1px solid #22c55e40;">' + (svg || '👤') + '</div>' +
                    '<div style="font-size:5px;color:white;font-weight:bold;margin-top:1px;">' + (cfg ? cfg.name : key) + '</div>' +
                    '<div style="font-size:5px;color:#6b7280;">Lv.' + (rData ? rData.level : '?') + '</div>' +
                '</div>';
        });
    }
    if (!hasLineup) {
        lineupPreview = '<div style="color:#6b7280;font-size:9px;text-align:center;padding:12px;">No lineup set. Tap "Set Lineup" to pick your war team!</div>';
    }

    var lineupCount = 0;
    if (w.warLineup) {
        lineupCount = w.warLineup.length;
    }

    var historyHtml = '';
    if (w.warHistory && w.warHistory.length > 0) {
        w.warHistory.slice(0, 6).forEach(function(h) {
            var rc = h.result === 'win' ? 'color:#22c55e;border-color:#064e3b;' : h.result === 'loss' ? 'color:#ef4444;border-color:#7f1d1d;' : 'color:#9ca3af;border-color:#374151;';
            var ri = h.result === 'win' ? '\uD83C\uDFC6' : h.result === 'loss' ? '\uD83D\uDC80' : '\uD83E\uDD1D';
            historyHtml += '<div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.3);border-radius:8px;padding:6px 10px;box-sizing:border-box;border:1px solid;' + rc + '">' +
                '<span style="font-size:9px;color:white;font-weight:bold;">' + ri + ' ' + (h.enemyIcon || '') + ' ' + (h.enemy || 'Unknown') + '</span>' +
                '<span style="font-size:8px;font-weight:bold;">' + h.myStars + '\u2605 vs ' + h.enemyStars + '\u2605 ' + h.result.toUpperCase() + '</span></div>';
        });
    } else {
        historyHtml = '<div style="color:#4b5563;font-size:9px;text-align:center;padding:16px;">No war history yet.</div>';
    }

    root.innerHTML =
        '<div class="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-red-950 via-orange-950 to-red-950 border-b-2 border-red-800/50">' +
            '<div class="flex items-center gap-2"><span class="text-2xl">\u2694\uFE0F</span><div><div class="text-white font-black text-xs uppercase tracking-wider">CLAN WAR</div><div class="text-[8px] font-bold text-amber-400 uppercase tracking-wider">' + currentGuild.name + '</div></div></div>' +
            '<button onclick="closeGuildRaid()" class="text-gray-400 hover:text-white text-xl font-bold cursor-pointer px-2 py-1">\u2715</button>' +
        '</div>' +
        '<div class="flex-1 overflow-y-auto">' +
            // Stats
            '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:10px 12px;">' +
                '<div style="background:rgba(0,0,0,0.4);border-radius:8px;padding:8px;text-align:center;border:1px solid #1e293b;"><div style="font-size:6px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Record</div><div style="color:#fbbf24;font-weight:900;font-size:11px;">' + warRecord + '</div></div>' +
                '<div style="background:rgba(0,0,0,0.4);border-radius:8px;padding:8px;text-align:center;border:1px solid #1e293b;"><div style="font-size:6px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Win Streak</div><div style="color:#22c55e;font-weight:900;font-size:11px;">' + (w.warStreak || 0) + '\uD83D\uDD25</div></div>' +
                '<div style="background:rgba(0,0,0,0.4);border-radius:8px;padding:8px;text-align:center;border:1px solid #1e293b;"><div style="font-size:6px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">War Power</div><div style="color:#ef4444;font-weight:900;font-size:11px;">' + calculateWarPower().toLocaleString() + '</div></div>' +
            '</div>' +

            // War Lineup Section
            '<div style="margin:0 12px;background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:10px;">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">' +
                    '<div style="color:#fbbf24;font-weight:900;font-size:9px;text-transform:uppercase;letter-spacing:1px;">\uD83D\uDEE1\uFE0F YOUR WAR LINEUP (' + lineupCount + '/' + WAR_MAX_LINEUP + ')</div>' +
                    '<button onclick="openWarLineupBuilder()" style="background:linear-gradient(to right,#b91c1c,#c2410c);color:white;font-weight:900;font-size:8px;padding:4px 10px;box-sizing:border-box;border-radius:6px;border:1px solid #ef4444;cursor:pointer;text-transform:uppercase;letter-spacing:1px;">SET LINEUP</button>' +
                '</div>' +
                '<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;">' + lineupPreview + '</div>' +
            '</div>' +

            // Find War button
            '<div style="margin:10px 12px;">' +
                '<button onclick="startWarSearch()" style="width:100%;padding:14px;background:linear-gradient(to right,#b91c1c,#c2410c,#b91c1c);color:white;font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:3px;border:2px solid #ef4444;border-radius:12px;cursor:pointer;box-shadow:0 0 30px rgba(239,68,68,0.3);position:relative;overflow:hidden;">' +
                    '<span style="position:relative;z-index:1;">\uD83D\uDD0D FIND WAR</span>' +
                '</button>' +
            '</div>' +

            // Rewards info
            '<div style="margin:0 12px;background:linear-gradient(to right,rgba(120,53,15,0.3),rgba(154,52,18,0.3));border:1px solid rgba(245,158,11,0.2);border-radius:10px;padding:10px;">' +
                '<div style="color:#fbbf24;font-weight:900;font-size:9px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">\uD83C\uDFC6 WAR REWARDS</div>' +
                '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;text-align:center;">' +
                    '<div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:6px;"><div style="font-size:14px;">\uD83D\uDCB0</div><div style="font-size:6px;color:#6b7280;">Money</div><div style="font-size:7px;color:#22c55e;font-weight:bold;">Win 2x</div></div>' +
                    '<div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:6px;"><div style="font-size:14px;">\uD83D\uDD29</div><div style="font-size:6px;color:#6b7280;">Scrap</div><div style="font-size:7px;color:#f59e0b;font-weight:bold;">Win 2x</div></div>' +
                    '<div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:6px;"><div style="font-size:14px;">\uD83D\uDC8E</div><div style="font-size:6px;color:#6b7280;">Diamonds</div><div style="font-size:7px;color:#06b6d4;font-weight:bold;">Win Only</div></div>' +
                    '<div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:6px;"><div style="font-size:14px;">\u26A1</div><div style="font-size:6px;color:#6b7280;">BP</div><div style="font-size:7px;color:#a855f7;font-weight:bold;">6\u2605+ Win</div></div>' +
                '</div>' +
            '</div>' +

            // History
            '<div style="margin:10px 12px 16px;background:rgba(15,23,42,0.8);border:1px solid #1e293b;border-radius:10px;padding:10px;">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">' +
                    '<div style="color:#fbbf24;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:1px;">\uD83D\uDCDC WAR HISTORY</div>' +
                    '<button onclick="_openWarHistory()" style="background:linear-gradient(to right,#b45309,#d97706);color:white;font-weight:900;font-size:7px;padding:3px 8px;box-sizing:border-box;border-radius:5px;border:1px solid #f59e0b;cursor:pointer;text-transform:uppercase;letter-spacing:1px;">VIEW ALL</button>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:4px;max-height:180px;overflow-y:auto;">' + historyHtml + '</div>' +
            '</div>' +
        '</div>';
}

// ── SEARCHING SCREEN ───────────────────────────────────────
function _renderSearching(root) {
    root.innerHTML =
        '<div class="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-red-950 via-orange-950 to-red-950 border-b-2 border-red-800/50">' +
            '<div class="flex items-center gap-2"><span class="text-2xl">\u2694\uFE0F</span><div class="text-white font-black text-xs uppercase tracking-wider">CLAN WAR</div></div>' +
            '<button onclick="state.guildWar.phase=\'idle\';_renderWarUI();" class="text-gray-400 hover:text-white text-xl font-bold cursor-pointer px-2 py-1">\u2715</button>' +
        '</div>' +
        '<div class="flex-1 flex flex-col items-center justify-center">' +
            '<div class="text-6xl mb-6 animate-spin" style="animation-duration:3s;">\uD83D\uDD0D</div>' +
            '<div class="text-amber-400 font-black text-lg uppercase tracking-widest mb-2 animate-pulse">SEARCHING...</div>' +
            '<div class="text-gray-500 text-[10px] mb-6">Finding a worthy opponent for ' + currentGuild.name + '</div>' +
            '<div style="width:128px;height:6px;background:#1f2937;border-radius:3px;overflow:hidden;"><div style="height:100%;background:linear-gradient(to right,#d97706,#ef4444);border-radius:3px;animation:searchProg 2.5s ease-in-out forwards;"></div></div>' +
        '</div>' +
        '<style>@keyframes searchProg{0%{width:0%}100%{width:100%}}</style>';
}

// ── BATTLE MAP ─────────────────────────────────────────────
function _renderBattleMap(root) {
    var w = state.guildWar;
    if (!w.enemy) { _renderIdleScreen(root); return; }

    var attacksLeft = MAX_ATTACKS - w.attacksUsed;
    var elapsed = Date.now() - (w.warStartTime || Date.now());
    var remaining = Math.max(0, WAR_DURATION_MS - elapsed);
    var timeStr = Math.floor(remaining / 3600000) + 'h ' + Math.floor((remaining % 3600000) / 60000) + 'm';

    if (remaining <= 0) { _endWar(); _renderWarResults(root); return; }

    // My lineup preview
    var myLineupHtml = '';
    if (w.warFormation) {
        ['front','mid','back'].forEach(function(lane) {
            var slots = w.warFormation[lane];
            if (!slots) return;
            slots.forEach(function(slot) {
                if (!slot || slot.type !== 'char') return;
                var cfg = characters[slot.key];
                var rData = state.roster[slot.key];
                var svg = typeof getVectorFrame === 'function' ? getVectorFrame(slot.key, false) : '';
                myLineupHtml += '<div style="width:44px;text-align:center;"><div style="width:32px;height:36px;margin:0 auto;display:flex;align-items:center;justify-content:center;background:rgba(34,197,94,0.1);border-radius:5px;border:1px solid #22c55e40;">' + (svg || '👤') + '</div><div style="font-size:5px;color:white;font-weight:bold;margin-top:1px;">' + (cfg ? cfg.name : slot.key) + '</div></div>';
            });
        });
    }
    if (!myLineupHtml && w.warLineup && w.warLineup.length > 0) {
        w.warLineup.forEach(function(item) {
            var key = typeof item === 'string' ? item : (item && item.key ? item.key : null);
            if (!key) return;
            var cfg = characters[key]; var rData = state.roster[key];
            var svg = typeof getVectorFrame === 'function' ? getVectorFrame(key, false) : '';
            myLineupHtml += '<div style="width:44px;text-align:center;"><div style="width:32px;height:36px;margin:0 auto;display:flex;align-items:center;justify-content:center;background:rgba(34,197,94,0.1);border-radius:5px;border:1px solid #22c55e40;">' + (svg || '👤') + '</div><div style="font-size:5px;color:white;font-weight:bold;margin-top:1px;">' + (cfg ? cfg.name : key) + '</div></div>';
        });
    }

    // Enemy bases with their lineups
    var basesHtml = '';
    w.enemyBases.forEach(function(base) {
        var canAttack = attacksLeft > 0 && base.starsEarned < 3;
        var starStr = '';
        for (var s = 0; s < 3; s++) {
            starStr += '<span style="font-size:8px;color:' + (s < base.starsEarned ? '#fbbf24' : '#374151') + ';text-shadow:' + (s < base.starsEarned ? '0 0 4px rgba(251,191,36,0.5)' : 'none') + ';">\u2605</span>';
        }

        // Enemy base lineup (show their team)
        var baseTeamHtml = '';
        (base.team || []).forEach(function(t) {
            var cfg = characters[t.key];
            var svg = typeof getVectorFrame === 'function' ? getVectorFrame(t.key, false) : '';
            baseTeamHtml += '<div style="width:28px;text-align:center;"><div style="width:24px;height:26px;margin:0 auto;display:flex;align-items:center;justify-content:center;border-radius:4px;border:1px solid #ef444430;background:rgba(239,68,68,0.08);">' + (svg || '👤') + '</div><div style="font-size:4px;color:#9ca3af;margin-top:1px;">' + (cfg ? cfg.name : t.key) + '</div></div>';
        });

        var borderCol = base.starsEarned >= 3 ? '#374151' : canAttack ? '#ef444450' : '#1e293b';
        var opac = base.starsEarned >= 3 ? 'opacity:0.5;' : '';

        basesHtml +=
            '<div style="border:1px solid ' + borderCol + ';border-radius:10px;padding:8px;background:rgba(15,23,42,0.6);' + opac + (canAttack ? 'cursor:pointer;' : '') + '" ' + (canAttack ? 'onclick="attackWarBase(' + base.id + ')"' : '') + '>' +
                '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">' +
                    '<div style="display:flex;align-items:center;gap:6px;">' +
                        '<div style="background:#1f2937;color:#6b7280;font-size:7px;font-weight:900;border-radius:4px;padding:2px 4px;box-sizing:border-box;border:1px solid #374151;">#' + base.rank + '</div>' +
                        '<div><div style="color:white;font-size:8px;font-weight:bold;">Power: ' + base.power.toLocaleString() + '</div><div style="display:flex;gap:1px;">' + starStr + '</div></div>' +
                    '</div>' +
                    (canAttack ? '<div style="background:rgba(185,28,28,0.5);color:#fca5a5;font-size:7px;font-weight:900;padding:3px 8px;box-sizing:border-box;border-radius:5px;border:1px solid #ef444450;text-transform:uppercase;">\u2694\uFE0F ATTACK</div>'
                    : base.starsEarned >= 3 ? '<div style="color:#fbbf24;font-size:8px;font-weight:bold;">\u2705 3\u2605</div>'
                    : '<div style="color:#4b5563;font-size:7px;">No atk</div>') +
                '</div>' +
                // Show enemy team
                '<div style="display:flex;gap:3px;justify-content:center;flex-wrap:wrap;padding-top:4px;border-top:1px solid #1e293b;">' + baseTeamHtml + '</div>' +
            '</div>';
    });

    var maxStars = w.enemyBases.length * 3;

    root.innerHTML =
        '<div class="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-red-950 via-orange-950 to-red-950 border-b-2 border-red-800/50">' +
            '<div class="flex items-center gap-2"><span class="text-xl">\u2694\uFE0F</span><div><div class="text-white font-black text-[10px] uppercase tracking-wider">CLAN WAR — BATTLE DAY</div><div class="text-[7px] text-amber-400 font-bold">\u23F0 ' + timeStr + ' remaining</div></div></div>' +
            '<button onclick="closeGuildRaid()" class="text-gray-400 hover:text-white text-xl font-bold cursor-pointer px-2 py-1">\u2715</button>' +
        '</div>' +
        '<div class="flex-1 overflow-y-auto">' +
            // Scoreboard
            '<div style="margin:10px 12px;border-radius:10px;overflow:hidden;border:1px solid rgba(245,158,11,0.2);background:linear-gradient(135deg,#0f172a,#1e1b4b,#0f172a);">' +
                '<div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:10px;">' +
                    '<div style="text-align:center;"><div style="font-size:14px;">\uD83D\uDEE1\uFE0F</div><div style="color:white;font-weight:900;font-size:8px;">' + currentGuild.name + '</div><div style="color:#22c55e;font-weight:900;font-size:18px;margin-top:2px;">' + w.myStars + '\u2605</div></div>' +
                    '<div style="text-align:center;"><div style="color:#fbbf24;font-weight:900;font-size:16px;letter-spacing:3px;">VS</div><div style="color:#4b5563;font-size:7px;margin-top:2px;">MAX ' + maxStars + '\u2605</div></div>' +
                    '<div style="text-align:center;"><div style="font-size:14px;">' + w.enemy.icon + '</div><div style="color:white;font-weight:900;font-size:8px;">' + w.enemy.name + '</div><div style="color:#ef4444;font-weight:900;font-size:18px;margin-top:2px;">' + w.enemyStars + '\u2605</div></div>' +
                '</div>' +
            '</div>' +

            // Attack status + my lineup
            '<div style="margin:0 12px;background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:8px;">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">' +
                    '<div style="color:#22c55e;font-weight:900;font-size:8px;text-transform:uppercase;letter-spacing:1px;">\uD83D\uDEE1\uFE0F YOUR WAR LINEUP</div>' +
                    '<div style="color:#fbbf24;font-size:8px;font-weight:bold;">Attacks: ' + attacksLeft + '/' + MAX_ATTACKS + '</div>' +
                '</div>' +
                '<div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;">' + myLineupHtml + '</div>' +
            '</div>' +

            // Enemy bases
            '<div style="margin:10px 12px;">' +
                '<div style="display:flex;align-items:center;gap:4px;margin-bottom:6px;"><span style="font-size:12px;">' + w.enemy.icon + '</span><span style="color:#ef4444;font-weight:900;font-size:9px;text-transform:uppercase;letter-spacing:1px;">ENEMY BASES</span><span style="color:#4b5563;font-size:7px;font-style:italic;">"' + w.enemy.motto + '"</span></div>' +
                '<div style="display:flex;flex-direction:column;gap:6px;">' + basesHtml + '</div>' +
            '</div>' +

            // Attack log
            '<div style="margin:8px 12px 16px;background:rgba(15,23,42,0.6);border:1px solid #1e293b;border-radius:8px;padding:8px;">' +
                '<div style="color:#fbbf24;font-weight:900;font-size:8px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">\uD83D\uDCCB ATTACK LOG</div>' +
                _renderAttackLog(w.attacks) +
            '</div>' +

            (attacksLeft <= 0 ? '<div style="margin:0 12px 16px;"><button onclick="_endWar();_renderWarUI();" style="width:100%;padding:10px;background:linear-gradient(to right,#b45309,#d97706);color:white;font-weight:900;border-radius:10px;font-size:11px;text-transform:uppercase;letter-spacing:2px;border:2px solid #f59e0b;cursor:pointer;">\uD83C\uDFC1 END WAR & SEE RESULTS</button></div>' : '') +
        '</div>';
}

// ── WAR RESULTS ────────────────────────────────────────────
function _renderWarResults(root) {
    var w = state.guildWar;
    var result = w._lastResult || (w.myStars > w.enemyStars ? 'win' : w.myStars < w.enemyStars ? 'loss' : 'draw');
    var rewards = w._lastRewards || {};
    var bigIcon = result === 'win' ? '\uD83C\uDFC6' : result === 'loss' ? '\uD83D\uDC80' : '\uD83E\uDD1D';
    var title = result === 'win' ? '\uD83C\uDFC6 VICTORY!' : result === 'loss' ? '\uD83D\uDC80 DEFEAT' : '\uD83E\uDD1D DRAW';
    var col = result === 'win' ? '#fbbf24' : result === 'loss' ? '#ef4444' : '#9ca3af';
    var bg = result === 'win' ? 'from-yellow-950 via-amber-950 to-yellow-950' : result === 'loss' ? 'from-red-950 via-rose-950 to-red-950' : 'from-slate-950 via-slate-900 to-slate-950';

    var rHtml = '';
    if (rewards.money) rHtml += '<div style="text-align:center;"><div style="font-size:16px;">\uD83D\uDCB0</div><div style="font-size:8px;color:#22c55e;font-weight:bold;">+' + _fmtNum(rewards.money) + '</div></div>';
    if (rewards.scrap) rHtml += '<div style="text-align:center;"><div style="font-size:16px;">\uD83D\uDD29</div><div style="font-size:8px;color:#f59e0b;font-weight:bold;">+' + rewards.scrap + '</div></div>';
    if (rewards.diamond) rHtml += '<div style="text-align:center;"><div style="font-size:16px;">\uD83D\uDC8E</div><div style="font-size:8px;color:#06b6d4;font-weight:bold;">+' + rewards.diamond + '</div></div>';
    if (rewards.bp) rHtml += '<div style="text-align:center;"><div style="font-size:16px;">\u26A1</div><div style="font-size:8px;color:#a855f7;font-weight:bold;">+' + rewards.bp + ' BP</div></div>';

    root.innerHTML =
        '<div class="flex items-center justify-between px-4 py-2 bg-gradient-to-r ' + bg + ' border-b-2" style="border-color:' + col + '30;"><div class="text-white font-black text-xs uppercase tracking-wider">\u2694\uFE0F WAR RESULTS</div><button onclick="closeGuildRaid()" class="text-gray-400 hover:text-white text-xl font-bold cursor-pointer px-2 py-1">\u2715</button></div>' +
        '<div class="flex-1 overflow-y-auto flex flex-col items-center justify-center p-4">' +
            '<div style="font-size:48px;margin-bottom:8px;">' + bigIcon + '</div>' +
            '<div style="color:' + col + ';font-weight:900;font-size:24px;text-transform:uppercase;letter-spacing:3px;margin-bottom:4px;text-shadow:0 0 30px ' + col + '40;">' + title + '</div>' +
            '<div style="color:#6b7280;font-size:10px;margin-bottom:20px;">vs ' + (w.enemy ? w.enemy.icon + ' ' + w.enemy.name : 'Unknown') + '</div>' +
            '<div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;margin-bottom:20px;max-width:280px;width:100%;box-sizing:border-box;max-height:90vh;overflow-y:auto;">' +
                '<div style="text-align:center;"><div style="color:#22c55e;font-weight:900;font-size:22px;">' + w.myStars + '\u2605</div><div style="font-size:7px;color:#6b7280;text-transform:uppercase;">Our Stars</div></div>' +
                '<div style="color:#4b5563;font-weight:bold;font-size:12px;">VS</div>' +
                '<div style="text-align:center;"><div style="color:#ef4444;font-weight:900;font-size:22px;">' + w.enemyStars + '\u2605</div><div style="font-size:7px;color:#6b7280;text-transform:uppercase;">Their Stars</div></div>' +
            '</div>' +
            (rHtml ? '<div style="background:rgba(0,0,0,0.4);border:1px solid rgba(245,158,11,0.2);border-radius:10px;padding:12px;margin-bottom:20px;max-width:280px;width:100%;box-sizing:border-box;max-height:90vh;overflow-y:auto;"><div style="color:#fbbf24;font-weight:bold;font-size:8px;text-transform:uppercase;letter-spacing:1px;text-align:center;margin-bottom:6px;">\uD83C\uDFC6 War Loot</div><div style="display:flex;justify-content:center;gap:16px;">' + rHtml + '</div></div>' : '') +
            '<button onclick="collectWarRewards()" style="background:linear-gradient(to right,#059669,#047857);color:white;font-weight:900;padding:12px 40px;box-sizing:border-box;border-radius:12px;font-size:13px;text-transform:uppercase;letter-spacing:2px;border:2px solid #10b981;cursor:pointer;box-shadow:0 0 20px rgba(16,185,129,0.3);">\u2705 COLLECT & CONTINUE</button>' +
        '</div>';
}

// ── HELPERS ────────────────────────────────────────────────
function closeGuildRaid() {
    var modal = document.getElementById('guild-raid-modal');
    if (modal) modal.remove();
    if (typeof openGuildHub === 'function') openGuildHub();
}

function _renderAttackLog(attacks) {
    if (!attacks || attacks.length === 0) return '<div style="color:#374151;font-size:7px;text-align:center;padding:8px;">No attacks yet. Tap an enemy base to attack!</div>';
    var html = '';
    attacks.forEach(function(a) {
        var ss = '';
        for (var s = 0; s < 3; s++) ss += '<span style="font-size:7px;color:' + (s < a.stars ? '#fbbf24' : '#374151') + ';">\u2605</span>';
        html += '<div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.25);border-radius:6px;padding:4px 8px;box-sizing:border-box;border:1px solid #1e293b50;margin-bottom:3px;">' +
            '<div style="display:flex;align-items:center;gap:4px;">' + ss + '<span style="font-size:7px;color:#d1d5db;font-weight:bold;">' + a.baseName + '</span></div>' +
            '<span style="font-size:7px;color:#6b7280;font-weight:bold;">' + a.killed + '/' + a.total + ' kills · ' + _fmtNum(a.damage) + ' dmg</span></div>';
    });
    return html;
}

function _fmtNum(n) {
    if (typeof formatNumber === 'function') return formatNumber(n);
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return Math.floor(n).toLocaleString();
}

// Legacy backward-compat aliases
function initGuildRaid() { initGuildWar(); }
function calculateRaidPower() { return calculateWarPower(); }

// ── GLOBAL WINDOW BINDINGS (required for onclick in innerHTML) ──
window.openGuildRaid = openGuildRaid;
window.closeGuildRaid = closeGuildRaid;
window.openWarLineupBuilder = openWarLineupBuilder;
window.startWarSearch = startWarSearch;
window.attackWarBase = attackWarBase;
window.collectWarRewards = collectWarRewards;
window.initGuildWar = initGuildWar;
window.initGuildRaid = initGuildRaid;
window.calculateWarPower = calculateWarPower;
window.calculateRaidPower = calculateRaidPower;
window._endWar = _endWar;
window._renderWarUI = _renderWarUI;
window._openWarHistory = _openWarHistory;

// Auto-init
initGuildWar();
