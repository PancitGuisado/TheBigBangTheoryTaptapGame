// ============================================================
// PVP LEAGUE SYSTEM — The Big Bang Theory: Pasadena Battle
// ============================================================

// --- LEAGUE DEFINITIONS ---
var PVP_LEAGUES = [
    { name: 'Bronze', icon: '🥉', minTrophies: 0, color: '#cd7f32' },
    { name: 'Silver', icon: '🥈', minTrophies: 100, color: '#c0c0c0' },
    { name: 'Gold', icon: '🥇', minTrophies: 300, color: '#ffd700' },
    { name: 'Platinum', icon: '💎', minTrophies: 600, color: '#06b6d4' },
    { name: 'Diamond', icon: '👑', minTrophies: 1000, color: '#a855f7' },
    { name: 'Legend', icon: '🌟', minTrophies: 2000, color: '#f59e0b' }
];

var PVP_OPPONENT_NAMES = [
    'Dr. Cooper Fan', 'Bazinga Boy', 'Penny4President', 'RocketManHoward',
    'RajTheStar', 'AmyFarrahFowl', 'BernieTheBlonde', 'StuartSadBoi',
    'SheldonJr', 'WolowitzRocket', 'CooperSmash', 'NerdHerd42',
    'CalTechKing', 'StringTheoryX', 'QuantumLeaper', 'TheBatmanFan',
    'PasadenaKnight', 'ComicBookGuy', 'LaserTagPro', 'SpockLives',
    'DarthNerd', 'ZeldaQueen', 'WhiteboardWiz', 'ElevatorFixer'
];

var pvpBattleState = null;
var pvpEmberTimer; // Active PVP battle data
var pvpTimers = {};        // PVP attack timers
var pvpMainTimer = null;   // Main PVP clock

// --- HELPERS ---
function getPvpLeague(trophies) {
    var league = PVP_LEAGUES[0];
    for (var i = 0; i < PVP_LEAGUES.length; i++) {
        if (trophies >= PVP_LEAGUES[i].minTrophies) league = PVP_LEAGUES[i];
    }
    return league;
}

function ensurePvpState() {
    if (!state.pvp) {
        state.pvp = { trophies: 0, league: 'Bronze', wins: 0, losses: 0, lineup: [] };
    }
}

// ============================================================
// PVP HUB MODAL
// ============================================================
function openPvpHub() {
    ensurePvpState();
    var existing = document.getElementById('pvp-hub-modal');
    if (existing) existing.remove();

    var league = getPvpLeague(state.pvp.trophies);
    var nextLeague = PVP_LEAGUES[PVP_LEAGUES.indexOf(league) + 1];
    var progressPct = nextLeague ? Math.min(100, ((state.pvp.trophies - league.minTrophies) / (nextLeague.minTrophies - league.minTrophies)) * 100) : 100;

    var lineupPreview = '';
    var myTotalPower = 0;
    if (state.pvp.lineup.length > 0) {
        state.pvp.lineup.forEach(function(item) {
            var svg = typeof getVectorFrame === 'function' ? getVectorFrame(item.key, false) : '';
            var border = item.type === 'char' ? '#22c55e' : '#06b6d4';
            var laneTag = item.lane ? '<div style="font-size:5px;color:#94a3b8;text-transform:uppercase;">' + item.lane + '</div>' : '';
            lineupPreview += '<div style="display:inline-flex;flex-direction:column;align-items:center;width:36px;height:48px;border:1px solid ' + border + ';border-radius:4px;background:rgba(0,0,0,0.4);margin:0 1px;padding:1px;">' +
                '<div style="width:28px;height:32px;display:flex;align-items:center;justify-content:center;">' + (svg || (item.type === 'bot' ? '\u{1F916}' : '\u2753')) + '</div>' + laneTag + '</div>';
            
            if (item.type === 'char' && state.roster[item.key] && typeof characters !== 'undefined' && characters[item.key]) {
                myTotalPower += characters[item.key].baseDmg * state.roster[item.key].level;
            } else if (item.type === 'bot' && state.robotRoster && state.robotRoster[item.key] && typeof robots !== 'undefined' && robots[item.key]) {
                myTotalPower += robots[item.key].baseDmg * state.robotRoster[item.key].level;
            }
        });
    } else {
        lineupPreview = '<span style="color:#ef4444;font-size:9px;">No lineup set!</span>';
    }

    var overlay = document.createElement('div');
    overlay.id = 'pvp-hub-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

    overlay.innerHTML = 
    '<div style="background:linear-gradient(135deg,#1a0a0a,#2d1010,#1a0a0a);border:2px solid #dc2626;border-radius:12px;padding:12px 16px;box-sizing:border-box;max-width:500px;width:95%;box-sizing:border-box;max-height:90vh;overflow-y:auto;box-shadow:0 0 50px rgba(220,38,38,0.3);position:relative;max-height:96vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px;">' +
        '<button onclick="document.getElementById(\'pvp-hub-modal\').remove()" style="position:absolute;top:4px;right:8px;color:#64748b;font-size:18px;cursor:pointer;background:none;border:none;">\u00D7</button>' +
        
        // Title (compact)
        '<div style="text-align:center;">' +
            '<div style="font-size:16px;font-weight:900;color:#ef4444;letter-spacing:3px;text-shadow:0 0 20px rgba(239,68,68,0.5);">⚔️ PVP ARENA</div>' +
            '<div style="font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:2px;">Battle other players</div>' +
        '</div>' +
        
        // League + Stats Row (side by side)
        '<div style="display:flex;gap:8px;align-items:stretch;">' +
            // League Badge (left)
            '<div style="flex:1;text-align:center;background:rgba(0,0,0,0.4);border:1px solid ' + league.color + ';border-radius:8px;padding:8px;box-shadow:0 0 15px ' + league.color + '33;display:flex;flex-direction:column;align-items:center;justify-content:center;">' +
                '<div style="font-size:24px;">' + league.icon + '</div>' +
                '<div style="font-size:10px;font-weight:900;color:' + league.color + ';letter-spacing:1px;margin-top:2px;">' + league.name.toUpperCase() + '</div>' +
                '<div style="font-size:14px;font-weight:900;color:#fbbf24;margin-top:2px;">🏆 ' + state.pvp.trophies + '</div>' +
                (nextLeague ? '<div style="margin-top:4px;background:#1e293b;border-radius:10px;height:5px;overflow:hidden;width:100%;"><div style="height:100%;background:linear-gradient(90deg,' + league.color + ',' + (nextLeague.color) + ');width:' + progressPct + '%;border-radius:10px;"></div></div><div style="font-size:7px;color:#64748b;margin-top:2px;">' + state.pvp.trophies + ' / ' + nextLeague.minTrophies + ' to ' + nextLeague.name + '</div>' : '<div style="font-size:8px;color:#fbbf24;margin-top:2px;">MAX!</div>') +
            '</div>' +
            // Stats (right)
            '<div style="display:flex;flex-direction:column;gap:4px;flex:0 0 auto;min-width:80px;">' +
                '<div style="background:rgba(34,197,94,0.15);border:1px solid #166534;border-radius:6px;padding:4px 8px;box-sizing:border-box;text-align:center;flex:1;display:flex;align-items:center;gap:6px;justify-content:center;"><span style="font-size:14px;font-weight:900;color:#4ade80;">' + state.pvp.wins + '</span><span style="font-size:7px;color:#64748b;text-transform:uppercase;">Wins</span></div>' +
                '<div style="background:rgba(239,68,68,0.15);border:1px solid #991b1b;border-radius:6px;padding:4px 8px;box-sizing:border-box;text-align:center;flex:1;display:flex;align-items:center;gap:6px;justify-content:center;"><span style="font-size:14px;font-weight:900;color:#f87171;">' + state.pvp.losses + '</span><span style="font-size:7px;color:#64748b;text-transform:uppercase;">Losses</span></div>' +
                '<div style="background:rgba(96,165,250,0.15);border:1px solid #1e40af;border-radius:6px;padding:4px 8px;box-sizing:border-box;text-align:center;flex:1;display:flex;align-items:center;gap:6px;justify-content:center;"><span style="font-size:14px;font-weight:900;color:#60a5fa;">' + (state.pvp.wins + state.pvp.losses > 0 ? Math.round(state.pvp.wins / (state.pvp.wins + state.pvp.losses) * 100) : 0) + '%</span><span style="font-size:7px;color:#64748b;text-transform:uppercase;">Rate</span></div>' +
            '</div>' +
        '</div>' +

        // Current Lineup
        '<div style="background:rgba(0,0,0,0.3);border:1px solid #334155;border-radius:6px;padding:6px 8px;box-sizing:border-box;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">' +
                '<div style="font-size:8px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Current Lineup</div>' +
                (myTotalPower > 0 ? '<div style="font-size:9px;color:#22d3ee;font-weight:900;letter-spacing:1px;">POWER: ' + myTotalPower + '</div>' : '') +
            '</div>' +
            '<div style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;">' + lineupPreview + '</div>' +
        '</div>' +

        // Buttons (side by side)
        '<div style="display:flex;gap:6px;">' +
            '<button onclick="openPvpLineupBuilder()" style="flex:1;background:linear-gradient(135deg,#1e40af,#3b82f6);color:white;font-weight:900;font-size:10px;padding:10px 8px;box-sizing:border-box;border:1px solid #60a5fa;border-radius:6px;cursor:pointer;letter-spacing:1px;text-transform:uppercase;">👥 SET LINEUP</button>' +
            '<button onclick="openPvpMatchmaking()" style="flex:1;background:linear-gradient(135deg,#dc2626,#ef4444);color:white;font-weight:900;font-size:10px;padding:10px 8px;box-sizing:border-box;border:1px solid #f87171;border-radius:6px;cursor:pointer;letter-spacing:1px;text-transform:uppercase;box-shadow:0 0 15px rgba(239,68,68,0.3);">⚔️ FIND MATCH</button>' +
        '</div>' +

        // Defense Log Button
        '<button onclick="showDefenseLog()" style="width:100%;background:linear-gradient(135deg,#4c1d95,#7c3aed);color:white;font-weight:900;font-size:10px;padding:10px 8px;box-sizing:border-box;border:1px solid #8b5cf6;border-radius:6px;cursor:pointer;letter-spacing:1px;text-transform:uppercase;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 0 15px rgba(124,58,237,0.3);"><span style="font-size:14px;">📜</span> DEFENSE LOG — WHO ATTACKED YOU?</button>' +
    '</div>';

    document.body.appendChild(overlay);
}

// ============================================================
// LINEUP BUILDER
// ============================================================
function openPvpLineupBuilder() {
    ensurePvpState();
    var existing = document.getElementById('pvp-lineup-modal');
    if (existing) existing.remove();

    // Initialize PVP formation from existing lineup or PvE formation
    if (!state.pvp.formation) {
        state.pvp.formation = { front: [null, null], mid: [null, null, null], back: [null, null, null], bots: [null, null, null] };
        // Pre-load from existing lineup array
        if (state.pvp.lineup && state.pvp.lineup.length > 0) {
            state.pvp.lineup.forEach(function(item) {
                if (item.type === 'char') {
                    var lane = item.lane || (characters[item.key] ? characters[item.key].lane : 'back');
                    var slots = state.pvp.formation[lane];
                    for (var i = 0; i < slots.length; i++) {
                        if (slots[i] === null) { slots[i] = { type: 'char', key: item.key }; break; }
                    }
                } else if (item.type === 'bot') {
                    var bots = state.pvp.formation.bots;
                    for (var i = 0; i < bots.length; i++) {
                        if (bots[i] === null) { bots[i] = { key: item.key, lane: item.lane || 'front' }; break; }
                    }
                }
            });
        }
    }

    // Deep copy for editing
    var editState = {
        front: state.pvp.formation.front.slice(),
        mid: state.pvp.formation.mid.slice(),
        back: state.pvp.formation.back.slice(),
        bots: state.pvp.formation.bots.slice()
    };
    var pvpDragged = null;

    var overlay = document.createElement('div');
    overlay.id = 'pvp-lineup-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.92);padding:8px;';

    function countUnits() {
        var chars = 0, bots = 0;
        ['front','mid','back'].forEach(function(l) { editState[l].forEach(function(s) { if (s && s.type==='char') chars++; }); });
        editState.bots.forEach(function(s) { if (s) bots++; });
        return { chars: chars, bots: bots };
    }

    function render() {
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
                        slotsHtml += '<div style="position:relative;width:62px;height:78px;border:2px solid #22c55e;background:rgba(34,197,94,0.15);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;cursor:grab;overflow:hidden;padding-bottom:4px;" draggable="true" data-pvp-drag-char="' + laneKey + '-' + idx + '">' +
                            '<div onclick="event.stopPropagation()" data-pvp-remove="' + laneKey + '-' + idx + '" style="position:absolute;top:0;right:0;width:16px;height:16px;background:#991b1b;color:white;font-size:8px;font-weight:bold;display:flex;align-items:center;justify-content:center;border-bottom-left-radius:4px;cursor:pointer;z-index:5;">✕</div>' +
                            '<div style="width:36px;height:40px;display:flex;align-items:center;justify-content:center;pointer-events:none;">' + (svg || '👤') + '</div>' +
                            '<div style="font-size:6px;color:white;font-weight:bold;text-align:center;width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:0 2px;pointer-events:none;">' + name + '</div>' +
                        '</div>';
                    } else {
                        slotsHtml += '<div data-pvp-empty-char="' + laneKey + '-' + idx + '" style="width:62px;height:78px;border:2px dashed #374151;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;" ' +
                            'ondragover="event.preventDefault();this.style.borderColor=\'#f59e0b\'" ondragleave="this.style.borderColor=\'#374151\'">' +
                            '<span style="color:#4b5563;font-size:18px;">' + (pvpDragged ? '⬇' : '+') + '</span>' +
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
        var botSlotCount = 3; // PVP always allows 3 bots
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
                        '<div onclick="event.stopPropagation()" data-pvp-remove-bot="' + idx + '" style="position:absolute;top:0;right:0;width:16px;height:16px;background:#991b1b;color:white;font-size:8px;font-weight:bold;display:flex;align-items:center;justify-content:center;border-bottom-left-radius:4px;cursor:pointer;z-index:5;">✕</div>' +
                        '<span style="position:absolute;top:0;left:0;font-size:5px;background:#164e63;color:#67e8f9;padding:0 3px;border-bottom-right-radius:4px;font-weight:bold;">BOT</span>' +
                        '<div style="width:36px;height:40px;display:flex;align-items:center;justify-content:center;pointer-events:none;">' + (svg || '🤖') + '</div>' +
                        '<div style="font-size:6px;color:white;font-weight:bold;text-align:center;width:100%;overflow:hidden;pointer-events:none;">' + rName + '</div>' +
                    '</div>';
                } else {
                    botSlotsHtml += '<div data-pvp-empty-bot="' + idx + '" style="width:62px;height:78px;border:2px dashed #374151;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;">' +
                        '<span style="color:#4b5563;font-size:18px;">' + (pvpDragged && pvpDragged.type === 'bot' ? '⬇' : '+') + '</span>' +
                        '<span style="color:#4b5563;font-size:7px;font-weight:bold;">EMPTY</span>' +
                    '</div>';
                }
            })(bi);
        }

        // Bench
        var inFormation = {};
        ['front','mid','back'].forEach(function(l) { editState[l].forEach(function(s) { if (s) inFormation[s.key] = true; }); });
        editState.bots.forEach(function(s) { if (s) inFormation[s.key] = true; });

        var benchChars = '';
        for (var k in characters) {
            var d = state.roster[k];
            if (!d || d.level <= 0 || inFormation[k]) continue;
            var svg = typeof getVectorFrame === 'function' ? getVectorFrame(k, false) : '';
            benchChars += '<div data-pvp-bench-char="' + k + '" draggable="true" style="width:52px;height:66px;border:2px solid #374151;background:rgba(0,0,0,0.4);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:grab;padding:2px;transition:all 0.2s;">' +
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
                benchBots += '<div data-pvp-bench-bot="' + rk + '" draggable="true" style="width:52px;height:66px;border:2px solid #374151;background:rgba(0,0,0,0.4);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:grab;padding:2px;transition:all 0.2s;">' +
                    '<div style="width:32px;height:36px;display:flex;align-items:center;justify-content:center;pointer-events:none;">' + (svg || '🤖') + '</div>' +
                    '<div style="font-size:6px;color:#d1d5db;font-weight:bold;text-align:center;width:100%;overflow:hidden;pointer-events:none;">' + rCfg.name + '</div>' +
                '</div>';
            }
        }

        overlay.innerHTML =
        '<div style="background:linear-gradient(135deg,#1a0a0a,#1e1020,#0a0a1a);border:2px solid #dc2626;border-radius:16px;padding:16px;max-width:420px;width:95%;box-sizing:border-box;max-height:90vh;overflow-y:auto;box-shadow:0 0 50px rgba(220,38,38,0.3);max-height:90vh;overflow-y:auto;">' +
            '<div style="text-align:center;margin-bottom:12px;">' +
                '<div style="font-size:16px;font-weight:900;color:#ef4444;letter-spacing:3px;">⚔️ PVP LINEUP</div>' +
                '<div style="font-size:8px;color:#64748b;margin-top:2px;">Any role in any lane • 5 chars + 3 robots max</div>' +
            '</div>' +
            '<div style="display:flex;justify-content:center;gap:10px;margin-bottom:10px;font-size:9px;font-weight:bold;">' +
                '<span style="padding:3px 8px;box-sizing:border-box;border-radius:4px;background:rgba(34,197,94,0.15);border:1px solid #166534;color:#4ade80;">👥 ' + counts.chars + '/5</span>' +
                '<span style="padding:3px 8px;box-sizing:border-box;border-radius:4px;background:rgba(6,182,212,0.15);border:1px solid #155e75;color:#22d3ee;">🤖 ' + counts.bots + '/' + botSlotCount + '</span>' +
            '</div>' +
            (pvpDragged ? '<div style="text-align:center;color:#f59e0b;font-size:9px;font-weight:bold;margin-bottom:8px;animation:pulse 1s infinite;">🎯 Tap a slot to place</div>' : '') +
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
                '<button id="pvp-lineup-save" style="flex:1;background:linear-gradient(135deg,#16a34a,#22c55e);color:white;font-weight:900;font-size:11px;padding:10px;border:2px solid #4ade80;border-radius:8px;cursor:pointer;letter-spacing:2px;">✅ SAVE</button>' +
                '<button id="pvp-lineup-cancel" style="flex:0.5;background:#1e293b;color:#64748b;font-weight:bold;font-size:10px;padding:10px;border:1px solid #334155;border-radius:8px;cursor:pointer;">CANCEL</button>' +
            '</div>' +
        '</div>';

        // Wire events
        // Remove char
        overlay.querySelectorAll('[data-pvp-remove]').forEach(function(btn) {
            btn.onclick = function(e) {
                e.stopPropagation();
                var parts = this.getAttribute('data-pvp-remove').split('-');
                editState[parts[0]][parseInt(parts[1])] = null;
                render();
            };
        });
        // Remove bot
        overlay.querySelectorAll('[data-pvp-remove-bot]').forEach(function(btn) {
            btn.onclick = function(e) {
                e.stopPropagation();
                editState.bots[parseInt(this.getAttribute('data-pvp-remove-bot'))] = null;
                render();
            };
        });

        // --- DRAG: Bench char ---
        overlay.querySelectorAll('[data-pvp-bench-char]').forEach(function(btn) {
            btn.onclick = function() {
                var k = this.getAttribute('data-pvp-bench-char');
                var c = countUnits();
                if (c.chars >= 5) return;
                pvpDragged = { type: 'char', key: k };
                render();
            };
            btn.ondragstart = function(e) {
                var k = this.getAttribute('data-pvp-bench-char');
                pvpDragged = { type: 'char', key: k, fromLane: null, fromIdx: null };
                e.dataTransfer.effectAllowed = 'move';
            };
        });
        // --- DRAG: Bench bot ---
        overlay.querySelectorAll('[data-pvp-bench-bot]').forEach(function(btn) {
            btn.onclick = function() {
                var k = this.getAttribute('data-pvp-bench-bot');
                var c = countUnits();
                if (c.bots >= 3) return;
                pvpDragged = { type: 'bot', key: k };
                render();
            };
            btn.ondragstart = function(e) {
                var k = this.getAttribute('data-pvp-bench-bot');
                pvpDragged = { type: 'bot', key: k, fromIdx: null };
                e.dataTransfer.effectAllowed = 'move';
            };
        });

        // --- DRAG: Filled char slots (pick up / swap) ---
        overlay.querySelectorAll('[data-pvp-drag-char]').forEach(function(el) {
            el.onclick = function() {
                var parts = this.getAttribute('data-pvp-drag-char').split('-');
                var lane = parts[0], idx = parseInt(parts[1]);
                var slot = editState[lane][idx];
                if (!slot) return;
                pvpDragged = { type: 'char', key: slot.key };
                editState[lane][idx] = null;
                render();
            };
            el.ondragstart = function(e) {
                var parts = this.getAttribute('data-pvp-drag-char').split('-');
                pvpDragged = { type: 'char', key: editState[parts[0]][parseInt(parts[1])].key, fromLane: parts[0], fromIdx: parseInt(parts[1]) };
                e.dataTransfer.effectAllowed = 'move';
            };
            el.ondragover = function(e) { e.preventDefault(); this.style.outline = '2px solid #f59e0b'; };
            el.ondragleave = function() { this.style.outline = 'none'; };
            el.ondrop = function(e) {
                e.preventDefault(); this.style.outline = 'none';
                if (!pvpDragged || pvpDragged.type !== 'char') { pvpDragged = null; return; }
                var parts = this.getAttribute('data-pvp-drag-char').split('-');
                var toLane = parts[0], toIdx = parseInt(parts[1]);
                var existing = editState[toLane][toIdx];
                editState[toLane][toIdx] = { type: 'char', key: pvpDragged.key };
                if (pvpDragged.fromLane !== null && pvpDragged.fromLane !== undefined) {
                    editState[pvpDragged.fromLane][pvpDragged.fromIdx] = existing;
                }
                pvpDragged = null; render();
            };
        });

        // --- DROP: Empty char slots ---
        overlay.querySelectorAll('[data-pvp-empty-char]').forEach(function(el) {
            el.onclick = function() {
                if (!pvpDragged || pvpDragged.type !== 'char') return;
                var parts = this.getAttribute('data-pvp-empty-char').split('-');
                editState[parts[0]][parseInt(parts[1])] = { type: 'char', key: pvpDragged.key };
                pvpDragged = null;
                render();
            };
            el.ondragover = function(e) { e.preventDefault(); this.style.borderColor = '#f59e0b'; this.style.background = 'rgba(245,158,11,0.15)'; };
            el.ondragleave = function() { this.style.borderColor = '#374151'; this.style.background = 'transparent'; };
            el.ondrop = function(e) {
                e.preventDefault(); this.style.borderColor = '#374151'; this.style.background = 'transparent';
                if (!pvpDragged || pvpDragged.type !== 'char') { pvpDragged = null; return; }
                var c = countUnits();
                if (pvpDragged.fromLane === null && pvpDragged.fromLane !== undefined && c.chars >= 5) { pvpDragged = null; return; }
                var parts = this.getAttribute('data-pvp-empty-char').split('-');
                editState[parts[0]][parseInt(parts[1])] = { type: 'char', key: pvpDragged.key };
                if (pvpDragged.fromLane !== null && pvpDragged.fromLane !== undefined) {
                    editState[pvpDragged.fromLane][pvpDragged.fromIdx] = null;
                }
                pvpDragged = null; render();
            };
        });

        // --- DROP: Empty bot slots ---
        overlay.querySelectorAll('[data-pvp-empty-bot]').forEach(function(el) {
            el.onclick = function() {
                if (!pvpDragged || pvpDragged.type !== 'bot') return;
                var idx = parseInt(this.getAttribute('data-pvp-empty-bot'));
                editState.bots[idx] = { key: pvpDragged.key, lane: 'front' };
                pvpDragged = null;
                render();
            };
            el.ondragover = function(e) { e.preventDefault(); this.style.borderColor = '#06b6d4'; this.style.background = 'rgba(6,182,212,0.15)'; };
            el.ondragleave = function() { this.style.borderColor = '#374151'; this.style.background = 'transparent'; };
            el.ondrop = function(e) {
                e.preventDefault(); this.style.borderColor = '#374151'; this.style.background = 'transparent';
                if (!pvpDragged || pvpDragged.type !== 'bot') { pvpDragged = null; return; }
                var idx = parseInt(this.getAttribute('data-pvp-empty-bot'));
                editState.bots[idx] = { key: pvpDragged.key, lane: 'front' };
                if (pvpDragged.fromIdx !== null && pvpDragged.fromIdx !== undefined) {
                    editState.bots[pvpDragged.fromIdx] = null;
                }
                pvpDragged = null; render();
            };
        });
        // Save
        var saveBtn = document.getElementById('pvp-lineup-save');
        if (saveBtn) saveBtn.onclick = function() {
            // Save formation
            state.pvp.formation = { front: editState.front.slice(), mid: editState.mid.slice(), back: editState.back.slice(), bots: editState.bots.slice() };
            // Also build lineup array for battle system compatibility
            state.pvp.lineup = [];
            ['front','mid','back'].forEach(function(lane) {
                editState[lane].forEach(function(slot) {
                    if (slot && slot.type === 'char') state.pvp.lineup.push({ type: 'char', key: slot.key, lane: lane });
                });
            });
            editState.bots.forEach(function(slot) {
                if (slot) state.pvp.lineup.push({ type: 'bot', key: slot.key, lane: slot.lane || 'front' });
            });
            saveProgress();
            overlay.remove();
            openPvpHub();
        };
        var cancelBtn = document.getElementById('pvp-lineup-cancel');
        if (cancelBtn) cancelBtn.onclick = function() { overlay.remove(); };
    }

    render();
    document.body.appendChild(overlay);
}

// ============================================================
// MATCHMAKING — Generate Opponents
// ============================================================
function generateFallbackOpponents() {
    ensurePvpState();
    var avgLevel = 1;
    var count = 0;
    for (var k in state.roster) {
        if (state.roster[k] && state.roster[k].level > 0) {
            avgLevel += state.roster[k].level;
            count++;
        }
    }
    avgLevel = count > 0 ? Math.round(avgLevel / count) : 1;

    var opponents = [];
    var usedNames = [];
    
    var skinsList = {
        sheldon: ['default', 'flash', 'spock', 'doppler', 'train'],
        leonard: ['default', 'knight', 'hobbit', 'green_lantern'],
        penny: ['default', 'wonder_woman', 'ape', 'bartender'],
        howard: ['default', 'astronaut', 'batman', 'magic'],
        raj: ['default', 'aquaman', 'sweater', 'koothrappali'],
        amy: ['default', 'tiara', 'harp', 'neuro'],
        bernie: ['default', 'smurf', 'micro', 'pageant'],
        stuart: ['default', 'comic', 'zombie', 'cape']
    };

    for (var i = 0; i < 3; i++) {
        var name;
        do { name = PVP_OPPONENT_NAMES[Math.floor(Math.random() * PVP_OPPONENT_NAMES.length)]; } while (usedNames.indexOf(name) !== -1);
        usedNames.push(name);

        var charKeys = Object.keys(characters);
        var teamSize = 3 + Math.floor(Math.random() * 3); // 3-5 chars
        var team = [];
        var shuffled = charKeys.slice(); for (var si = shuffled.length - 1; si > 0; si--) { var sj = Math.floor(Math.random() * (si + 1)); var tmp = shuffled[si]; shuffled[si] = shuffled[sj]; shuffled[sj] = tmp; }
        for (var j = 0; j < Math.min(teamSize, shuffled.length); j++) {
            var charKey = shuffled[j];
            var lvl = Math.max(1, avgLevel + Math.floor((Math.random() - 0.5) * avgLevel * 0.4));
            var charSkins = skinsList[charKey] || ['default'];
            var skin = charSkins[Math.floor(Math.random() * charSkins.length)];
            team.push({ type: 'char', key: charKey, level: lvl, skin: skin });
        }
        // Add 0-2 bots
        if (typeof robots !== 'undefined') {
            var botKeys = Object.keys(robots);
            var numBots = Math.floor(Math.random() * 3);
            var shuffledBots = botKeys.slice(); for (var bi = shuffledBots.length - 1; bi > 0; bi--) { var bj = Math.floor(Math.random() * (bi + 1)); var btmp = shuffledBots[bi]; shuffledBots[bi] = shuffledBots[bj]; shuffledBots[bj] = btmp; }
            for (var b = 0; b < Math.min(numBots, shuffledBots.length); b++) {
                team.push({ type: 'bot', key: shuffledBots[b], level: Math.max(1, Math.round(avgLevel * 0.5)) });
            }
        }

        var trophyRange = Math.max(0, state.pvp.trophies + Math.floor((Math.random() - 0.5) * 100));
        opponents.push({ name: name, trophies: trophyRange, team: team, league: getPvpLeague(trophyRange) });
    }
    return opponents;
}


async function fetchPvpOpponentsFromDB() {
    if (typeof supabase === 'undefined' || !supabase) return [];
    
    try {
        var myTrophies = state.pvp.trophies || 0;
        
        // Fetch players near trophy range (+/- 500 trophies)
        var minT = Math.max(0, myTrophies - 500);
        var maxT = myTrophies + 500;
        
        var { data, error } = await supabase
            .from('leaderboard')
            .select('id, username, trophies, lineup, robots')
            .neq('id', currentUser ? currentUser.id : 'guest')
            .gte('trophies', minT)
            .lte('trophies', maxT)
            .limit(300);
            
        if (error || !data || data.length === 0) return [];
        
        // Calculate player's actual total Power
        var myTotalPower = 0;
        if (state.pvp && state.pvp.lineup) {
            state.pvp.lineup.forEach(function(item) {
                if (item.type === 'char' && state.roster[item.key] && typeof characters !== 'undefined' && characters[item.key]) {
                    myTotalPower += characters[item.key].baseDmg * state.roster[item.key].level;
                } else if (item.type === 'bot' && state.robotRoster && state.robotRoster[item.key] && typeof robots !== 'undefined' && robots[item.key]) {
                    myTotalPower += robots[item.key].baseDmg * state.robotRoster[item.key].level;
                }
            });
        }

        // Filter valid players and calculate their power difference
        var validPlayers = [];
        data.forEach(function(p) {
            if (p.lineup && Array.isArray(p.lineup) && p.lineup.length > 0) {
                var oppTotalPower = 0;
                p.lineup.forEach(function(c) { 
                    if (characters[c.char]) {
                        oppTotalPower += characters[c.char].baseDmg * (c.level || 1);
                    }
                });
                if (p.robots && Array.isArray(p.robots)) {
                    p.robots.forEach(function(r) { 
                        if (typeof robots !== 'undefined' && robots[r.name]) {
                            oppTotalPower += robots[r.name].baseDmg * (r.level || 1);
                        }
                    });
                }
                var diff = oppTotalPower - myTotalPower;
                
                // If opponent is weaker, penalize the difference so the algorithm prefers slightly stronger bots
                if (diff < 0) {
                    p.powerScore = Math.abs(diff) * 3; 
                } else {
                    p.powerScore = diff;
                }
                
                p.powerDiff = Math.abs(diff); // Keep the absolute value for reference if needed
                validPlayers.push(p);
            }
        });
        
        if (validPlayers.length === 0) return [];
        
        // Sort by the weighted power score (prefers opponents matching or slightly stronger)
        validPlayers.sort(function(a, b) {
            return a.powerScore - b.powerScore;
        });
        
        // Take the top 10 closest matches and shuffle them to add variety
        var topPool = validPlayers.slice(0, 10);
        topPool.sort(function() { return 0.5 - Math.random(); });
        
        // Pick up to 3
        var selected = topPool.slice(0, 3);

        var opponents = [];
        selected.forEach(function(p) {
            var team = [];
            if (p.lineup) {
                p.lineup.forEach(function(c) {
                    team.push({ type: 'char', key: c.char, level: c.level || 1, skin: c.skin || 'default' });
                });
            }
            if (p.robots) {
                p.robots.forEach(function(r) {
                    team.push({ type: 'bot', key: r.name, level: r.level || 1 });
                });
            }
            
            var pTrophies = p.trophies || 0;
            opponents.push({
                id: p.id || null,
                name: p.username || 'Unknown',
                trophies: pTrophies,
                team: team,
                league: getPvpLeague(pTrophies)
            });
        });
        
        return opponents;
    } catch(e) {
        console.error("Error fetching PVP opponents:", e);
        return [];
    }
}

async function openPvpMatchmaking() {
    ensurePvpState();
    if (state.pvp.lineup.length === 0) {
        if (typeof showGameAlert === 'function') showGameAlert('PVP Lineup', 'Set your PVP lineup first!');
        else alert('Set your PVP lineup first!');
        return;
    }

    var existing = document.getElementById('pvp-matchmaking-modal');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'pvp-matchmaking-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.92);padding:8px;';
    
    // Loading State
    overlay.innerHTML = '<div style="color:#a855f7;font-size:16px;font-weight:bold;letter-spacing:2px;animation:pulse 1.5s infinite;">SEARCHING FOR FOES...</div>';
    document.body.appendChild(overlay);

    var opponents = await fetchPvpOpponentsFromDB();
    
    // Fallback if not enough real players
    if (opponents.length < 3) {
        var fallbacks = generateFallbackOpponents();
        var needed = 3 - opponents.length;
        for(var i = 0; i < needed; i++) {
            opponents.push(fallbacks[i]);
        }
    }

    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

    var cardsHtml = '';
    
    opponents.forEach(function(opp, idx) {
        // Build team sprite preview
        var teamSprites = '';
        opp.team.forEach(function(t) {
            var svg = typeof getVectorFrame === 'function' ? getVectorFrame(t.key, false) : '';
            if (t.type === 'char' && typeof getVectorFrameForSkin === 'function') {
                 var raw = getVectorFrameForSkin(t.key, t.skin || 'default');
                 svg = typeof raw === 'string' ? raw : (raw.idle || '');
            }
            var borderCol = t.type === 'char' ? '#4ade80' : '#06b6d4';
            var label = t.type === 'char' ? (characters[t.key] ? characters[t.key].name : t.key) : (typeof robots !== 'undefined' && robots[t.key] ? robots[t.key].name : t.key);
            teamSprites += '<div style="display:flex;flex-direction:column;align-items:center;width:40px;">' +
                '<div style="width:36px;height:42px;border:1px solid ' + borderCol + ';border-radius:6px;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;overflow:hidden;">' + (svg || (t.type === 'bot' ? '<span style="font-size:16px;">🤖</span>' : '<span style="font-size:16px;">❓</span>')) + '</div>' +
                '<div style="font-size:5px;color:#94a3b8;font-weight:bold;margin-top:1px;text-align:center;width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">' + label + '</div>' +
                '<div style="font-size:5px;color:#6b7280;">L' + t.level + '</div>' +
            '</div>';
        });

        // Calculate total power
        var totalPower = 0;
        opp.team.forEach(function(t) {
            var baseDmg = 0;
            if (t.type === 'char' && characters[t.key]) baseDmg = characters[t.key].baseDmg;
            else if (t.type === 'bot' && typeof robots !== 'undefined' && robots[t.key]) baseDmg = robots[t.key].baseDmg;
            totalPower += baseDmg * t.level;
        });

        // Difficulty badge
        var diffColor = '#4ade80'; var diffLabel = 'EASY';
        if (opp.trophies > state.pvp.trophies + 30) { diffColor = '#ef4444'; diffLabel = 'HARD'; }
        else if (opp.trophies > state.pvp.trophies - 10) { diffColor = '#f59e0b'; diffLabel = 'EVEN'; }

        cardsHtml += '<div style="background:linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,10,30,0.8));border:2px solid ' + opp.league.color + '40;border-radius:16px;padding:14px;margin-bottom:10px;position:relative;overflow:hidden;transition:all 0.3s;" onmouseenter="this.style.borderColor=\'' + opp.league.color + '\';this.style.boxShadow=\'0 0 25px ' + opp.league.color + '33\';this.style.transform=\'scale(1.01)\'" onmouseleave="this.style.borderColor=\'' + opp.league.color + '40\';this.style.boxShadow=\'none\';this.style.transform=\'scale(1)\'">' +
            // Gradient accent bar top
            '<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg, transparent, ' + opp.league.color + ', transparent);opacity:0.5;"></div>' +
            // Header row
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">' +
                '<div style="flex:1;min-width:0;margin-right:8px;">' +
                    '<div style="font-size:14px;font-weight:900;color:white;letter-spacing:0.5px;text-shadow:0 0 10px rgba(255,255,255,0.1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + opp.name + '</div>' +
                    '<div style="display:flex;align-items:center;gap:4px;margin-top:2px;">' +
                        '<span style="font-size:7px;color:' + opp.league.color + ';font-weight:900;text-transform:uppercase;letter-spacing:1px;">' + opp.league.icon + ' ' + opp.league.name + '</span>' +
                        '<span style="font-size:6px;color:' + diffColor + ';font-weight:bold;background:' + diffColor + '15;border:1px solid ' + diffColor + '40;padding:0 4px;border-radius:3px;">' + diffLabel + '</span>' +
                    '</div>' +
                '</div>' +
                '<div style="text-align:right;flex-shrink:0;">' +
                    '<div style="font-size:16px;font-weight:900;color:#fbbf24;text-shadow:0 0 10px rgba(251,191,36,0.3);">🏆 ' + opp.trophies + '</div>' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Power: ' + totalPower + '</div>' +
                '</div>' +
            '</div>' +
            // Team sprites row
            '<div style="display:flex;gap:4px;justify-content:center;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:8px 6px;box-sizing:border-box;margin-bottom:10px;flex-wrap:wrap;">' + teamSprites + '</div>' +
            // Stats row
            '<div style="display:flex;gap:6px;margin-bottom:10px;">' +
                '<div style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:4px 6px;box-sizing:border-box;text-align:center;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Team Size</div>' +
                    '<div style="font-size:11px;font-weight:900;color:#e2e8f0;">' + opp.team.length + '</div>' +
                '</div>' +
                '<div style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:4px 6px;box-sizing:border-box;text-align:center;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Chars</div>' +
                    '<div style="font-size:11px;font-weight:900;color:#4ade80;">' + opp.team.filter(function(t){return t.type==='char'}).length + '</div>' +
                '</div>' +
                '<div style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:4px 6px;box-sizing:border-box;text-align:center;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Bots</div>' +
                    '<div style="font-size:11px;font-weight:900;color:#22d3ee;">' + opp.team.filter(function(t){return t.type==='bot'}).length + '</div>' +
                '</div>' +
                '<div style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:4px 6px;box-sizing:border-box;text-align:center;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Avg Lv</div>' +
                    '<div style="font-size:11px;font-weight:900;color:#fbbf24;">' + (opp.team.length > 0 ? Math.round(opp.team.reduce(function(a,t){return a+t.level},0)/opp.team.length) : 0) + '</div>' +
                '</div>' +
            '</div>' +
            // Fight + Add Friend buttons
            '<div style="display:flex;gap:6px;">' +
                '<button onclick="startPvpBattle(' + idx + ')" style="flex:1;background:linear-gradient(135deg,#7f1d1d,#dc2626,#b91c1c);color:white;font-weight:900;font-size:12px;padding:10px;border:2px solid #f8717180;border-radius:8px;cursor:pointer;letter-spacing:3px;text-transform:uppercase;text-shadow:0 1px 2px rgba(0,0,0,0.5);transition:all 0.2s;" onmouseenter="this.style.background=\'linear-gradient(135deg,#991b1b,#ef4444,#dc2626)\';this.style.boxShadow=\'0 0 15px rgba(239,68,68,0.4)\'" onmouseleave="this.style.background=\'linear-gradient(135deg,#7f1d1d,#dc2626,#b91c1c)\';this.style.boxShadow=\'none\'">⚔️ FIGHT!</button>' +
                '<button onclick="if(typeof addFriendQuick===\'function\')addFriendQuick(\'' + opp.name.replace(/'/g, "\\'") + '\',{trophies:' + opp.trophies + '})" style="background:linear-gradient(135deg,#1e3a5f,#1e40af);color:#93c5fd;font-weight:900;font-size:9px;padding:10px 12px;box-sizing:border-box;border:1px solid #3b82f680;border-radius:8px;cursor:pointer;letter-spacing:1px;transition:all 0.2s;" onmouseenter="this.style.background=\'linear-gradient(135deg,#1e40af,#2563eb)\'" onmouseleave="this.style.background=\'linear-gradient(135deg,#1e3a5f,#1e40af)\'" title="Add as Friend">👥+</button>' +
            '</div>' +
        '</div>';
    });

    // Refresh button
    var refreshHtml = '<button onclick="openPvpMatchmaking()" style="width:100%;background:linear-gradient(135deg,#1e3a5f,#1e40af);color:#93c5fd;font-weight:bold;font-size:10px;padding:8px;border:1px solid #3b82f680;border-radius:8px;cursor:pointer;letter-spacing:1px;margin-bottom:6px;transition:all 0.2s;" onmouseenter="this.style.background=\'linear-gradient(135deg,#1e40af,#2563eb)\'" onmouseleave="this.style.background=\'linear-gradient(135deg,#1e3a5f,#1e40af)\'">🔄 FIND NEW OPPONENTS</button>';

    overlay.innerHTML = 
    '<div style="background:linear-gradient(180deg,#0f0515,#150a20,#0a0510);border:2px solid #7c3aed50;border-radius:20px;padding:20px;max-width:420px;width:95%;box-sizing:border-box;max-height:90vh;overflow-y:auto;max-height:90vh;overflow-y:auto;box-shadow:0 0 60px rgba(124,58,237,0.15), inset 0 0 30px rgba(0,0,0,0.5);position:relative;">' +
        // Decorative corner runes
        '<div style="position:absolute;top:8px;left:8px;width:20px;height:20px;border-top:2px solid #7c3aed40;border-left:2px solid #7c3aed40;border-radius:4px 0 0 0;"></div>' +
        '<div style="position:absolute;top:8px;right:8px;width:20px;height:20px;border-top:2px solid #7c3aed40;border-right:2px solid #7c3aed40;border-radius:0 4px 0 0;"></div>' +
        '<div style="position:absolute;bottom:8px;left:8px;width:20px;height:20px;border-bottom:2px solid #7c3aed40;border-left:2px solid #7c3aed40;border-radius:0 0 0 4px;"></div>' +
        '<div style="position:absolute;bottom:8px;right:8px;width:20px;height:20px;border-bottom:2px solid #7c3aed40;border-right:2px solid #7c3aed40;border-radius:0 0 4px 0;"></div>' +
        // Header
        '<div style="text-align:center;margin-bottom:16px;position:relative;">' +
            '<div style="font-size:10px;color:#7c3aed80;letter-spacing:6px;text-transform:uppercase;margin-bottom:2px;">⚜ Arena ⚜</div>' +
            '<div style="font-size:20px;font-weight:900;color:#e2e8f0;letter-spacing:4px;text-shadow:0 0 20px rgba(124,58,237,0.3);">CHOOSE YOUR FOE</div>' +
            '<div style="font-size:8px;color:#6b7280;margin-top:4px;">Defeat opponents to earn trophies and glory</div>' +
            '<div style="height:1px;background:linear-gradient(90deg, transparent, #7c3aed40, transparent);margin-top:12px;"></div>' +
        '</div>' +
        cardsHtml +
        refreshHtml +
        '<button onclick="document.getElementById(\'pvp-matchmaking-modal\').remove()" style="width:100%;background:rgba(30,41,59,0.5);color:#64748b;font-weight:bold;font-size:10px;padding:8px;border:1px solid #33415540;border-radius:8px;cursor:pointer;transition:all 0.2s;" onmouseenter="this.style.color=\'#94a3b8\'" onmouseleave="this.style.color=\'#64748b\'">← BACK TO HUB</button>' +
    '</div>';

    window._pvpOpponents = opponents;
}


function startPvpBattle(opponentIndex) {
    ensurePvpState();
    var opponent = window._pvpOpponents[opponentIndex];
    if (!opponent) return;

    // Close all modals
    ['pvp-hub-modal', 'pvp-matchmaking-modal', 'pvp-lineup-modal'].forEach(function(id) {
        var el = document.getElementById(id); if (el) el.remove();
    });

    // Build player team
    var playerTeam = [];
    var sourceLineup = [];
    
    if (state.pvp && state.pvp.lineup && state.pvp.lineup.length > 0) {
        // Prioritize PvP lineup
        sourceLineup = state.pvp.lineup;
    } else if (state.formation) {
        // Fallback to Arena Lineup
        ['front', 'mid', 'back'].forEach(function(lane) {
            if (state.formation[lane]) {
                state.formation[lane].forEach(function(slot) {
                    if (slot) sourceLineup.push({ type: slot.type || 'char', key: slot.key, lane: slot.lane || lane });
                });
            }
        });
        if (state.formation.bots) {
            state.formation.bots.forEach(function(slot) {
                if (slot) sourceLineup.push({ type: 'bot', key: slot.key, lane: slot.lane || 'mid' });
            });
        }
    }

    sourceLineup.forEach(function(item) {
        if (item.type === 'char') {
            var cfg = characters[item.key];
            var rData = state.roster[item.key];
            if (!cfg || !rData) return;
            var lvl = rData.level || 1;
            // PVP HP: gentler scaling so fights stay impactful at all levels
            var pvpHpScale = cfg.lane === 'front' ? 1.5 : 1.0;
            var maxHp = Math.floor(cfg.baseHp * (1 + (lvl - 1) * pvpHpScale));
            // PVP DMG: slight power curve so damage keeps pace with HP
            var pvpDmg = Math.floor(cfg.baseDmg * Math.pow(lvl, 1.15));
            
            // Apply talent bonuses
            if (rData.talents) {
                if (rData.talents.hp) maxHp = Math.floor(maxHp * (1 + rData.talents.hp * 0.20));
                if (rData.talents.dmg) pvpDmg = Math.floor(pvpDmg * (1 + rData.talents.dmg * 0.10));
            }
            
            // Apply 50% of equipment stats in PVP
            if (typeof getCharEquipmentStats === 'function') {
                var eqStats = getCharEquipmentStats(item.key);
                pvpDmg += Math.floor((eqStats.dmg || 0) * 0.5);
                maxHp += Math.floor((eqStats.hp || 0) * 0.5);
            }
            
            playerTeam.push({
                type: 'char', key: item.key, name: cfg.name, lane: item.lane || cfg.lane, skin: rData.activeSkin || 'default',
                level: lvl, baseDmg: pvpDmg, atkSpeed: cfg.atkSpeed,
                maxHp: maxHp, hp: maxHp, alive: true
            });
        } else if (item.type === 'bot' && typeof robots !== 'undefined') {
            var rCfg = robots[item.key];
            var rInfo = state.robotRoster[item.key];
            if (!rCfg || !rInfo) return;
            var bLvl = rInfo.level || 1;
            playerTeam.push({
                type: 'bot', key: item.key, name: rCfg.name, lane: item.lane || rCfg.lane,
                level: bLvl, baseDmg: rCfg.baseDmg, atkSpeed: rCfg.atkSpeed,
                maxHp: 100 * bLvl, hp: 100 * bLvl, alive: true
            });
        }
    });

    // Build enemy team
    var enemyTeam = [];
    opponent.team.forEach(function(item) {
        if (item.type === 'char') {
            var cfg = characters[item.key];
            if (!cfg) return;
            var lane = item.lane || cfg.lane;
            // PVP HP: gentler scaling so fights stay impactful at all levels
            var pvpHpScale = lane === 'front' ? 1.5 : 1.0;
            var maxHp = Math.floor(cfg.baseHp * (1 + (item.level - 1) * pvpHpScale));
            var pvpDmg = Math.floor(cfg.baseDmg * Math.pow(item.level, 1.15));
            enemyTeam.push({
                type: 'char', key: item.key, name: cfg.name, lane: lane, skin: item.skin || 'default',
                level: item.level, baseDmg: pvpDmg, atkSpeed: cfg.atkSpeed,
                maxHp: maxHp, hp: maxHp, alive: true
            });
        } else if (item.type === 'bot' && typeof robots !== 'undefined') {
            var rCfg = robots[item.key];
            if (!rCfg) return;
            var lane = item.lane || rCfg.lane || 'mid';
            enemyTeam.push({
                type: 'bot', key: item.key, name: rCfg.name, lane: lane,
                level: item.level, baseDmg: rCfg.baseDmg, atkSpeed: rCfg.atkSpeed,
                maxHp: 100 * item.level, hp: 100 * item.level, alive: true
            });
        }
    });

    pvpBattleState = {
        playerTeam: playerTeam,
        enemyTeam: enemyTeam,
        opponent: opponent,
        timeLeft: 60.0,
        speedMult: 1,
        draining: false,
        finished: false
    };

    pvpKillCount = { p: 0, e: 0 };
    renderPvpBattleScreen();
    pvpBattleIntro(function() {
        startPvpTimers();
        // Start ambient ember particles
        if (typeof pvpEmberTimer !== 'undefined') clearInterval(pvpEmberTimer);
        pvpEmberTimer = setInterval(pvpSpawnEmbers, 1500);
    });
}

function renderPvpBattleScreen() {
    var existing = document.getElementById('pvp-battle-screen');
    if (existing) existing.remove();

    if (!document.getElementById('pvp-battle-styles')) {
        var st = document.createElement('style');
        st.id = 'pvp-battle-styles';
        st.textContent = [
            '@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}@keyframes pvpDmgFloat{0%{opacity:1;transform:translateY(0) scale(1);}70%{opacity:0.8;}100%{opacity:0;transform:translateY(-50px) scale(0.7);}}@keyframes pvpHealFloat{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-40px) scale(0.8);}}@keyframes pvpHitFlash{0%{filter:brightness(3) saturate(0);}100%{filter:brightness(1) saturate(1);}}@keyframes pvpShake{0%,100%{transform:translateX(0);}20%{transform:translateX(-4px);}40%{transform:translateX(4px);}60%{transform:translateX(-3px);}80%{transform:translateX(2px);}}@keyframes pvpAttackLunge{0%{transform:translateX(0);}30%{transform:translateX(15px);}100%{transform:translateX(0);}}@keyframes pvpAttackLungeLeft{0%{transform:translateX(0);}30%{transform:translateX(-15px);}100%{transform:translateX(0);}}@keyframes pvpCritBurst{0%{opacity:1;transform:scale(0.5);}50%{opacity:0.8;transform:scale(1.5);}100%{opacity:0;transform:scale(2);}}@keyframes pvpDeathExplode{0%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.2) rotate(10deg);}100%{opacity:0;transform:scale(0.3) rotate(30deg);}}@keyframes pvpHealPulse{0%{box-shadow:0 0 0 0 rgba(34,197,94,0.4);}100%{box-shadow:0 0 15px 5px rgba(34,197,94,0);}}@keyframes pvpBuffGlow{0%{box-shadow:0 0 0 0 rgba(251,191,36,0.4);}100%{box-shadow:0 0 12px 4px rgba(251,191,36,0);}}@keyframes pvpPoisonDrip{0%{opacity:0.8;transform:translateY(0);}100%{opacity:0;transform:translateY(20px);}}.pvp-hit{animation:pvpHitFlash 0.25s ease-out!important;}.pvp-shake{animation:pvpShake 0.3s ease-out!important;}.pvp-lunge{animation:pvpAttackLunge 0.35s ease-out!important;}.pvp-lunge-left{animation:pvpAttackLungeLeft 0.35s ease-out!important;}.pvp-death-anim{animation:pvpDeathExplode 0.5s ease-out forwards!important;}.pvp-heal-pulse{animation:pvpHealPulse 0.6s ease-out!important;}.pvp-buff-glow{animation:pvpBuffGlow 0.5s ease-out!important;}@keyframes pvpVsSlam{0%{transform:scale(3) rotate(-15deg);opacity:0;}60%{transform:scale(1.1) rotate(2deg);opacity:1;}100%{transform:scale(1) rotate(0);opacity:1;}}@keyframes pvpVsPulse{0%,100%{text-shadow:0 0 20px #dc2626,0 0 40px #dc262660;}50%{text-shadow:0 0 40px #dc2626,0 0 80px #dc2626;}}@keyframes pvpSlideInLeft{0%{transform:translateX(-100%);opacity:0;}100%{transform:translateX(0);opacity:1;}}@keyframes pvpSlideInRight{0%{transform:translateX(100%);opacity:0;}100%{transform:translateX(0);opacity:1;}}@keyframes pvpFadeUp{0%{transform:translateY(20px);opacity:0;}100%{transform:translateY(0);opacity:1;}}@keyframes pvpScreenShake{0%,100%{transform:translate(0,0);}10%{transform:translate(-3px,-2px);}20%{transform:translate(4px,1px);}30%{transform:translate(-2px,3px);}40%{transform:translate(3px,-1px);}50%{transform:translate(-1px,2px);}60%{transform:translate(2px,-3px);}70%{transform:translate(-4px,1px);}80%{transform:translate(1px,-2px);}90%{transform:translate(-2px,3px);}}@keyframes pvpEmber{0%{opacity:0;transform:translateY(0) scale(0);}20%{opacity:0.8;transform:scale(1);}100%{opacity:0;transform:translateY(-200px) translateX(30px) scale(0);}}@keyframes pvpKillBanner{0%{transform:scaleX(0);opacity:0;}30%{transform:scaleX(1.1);opacity:1;}50%{transform:scaleX(1);}100%{transform:scaleX(1);opacity:0;}}@keyframes pvpGlowPulse{0%,100%{box-shadow:0 0 4px rgba(239,68,68,0.3);}50%{box-shadow:0 0 12px rgba(239,68,68,0.6),0 0 20px rgba(239,68,68,0.3);}}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes pvpFightFlash{0%{opacity:0;}15%{opacity:1;}30%{opacity:0;}45%{opacity:1;}100%{opacity:0;}}.pvp-screen-shake{animation:pvpScreenShake 0.35s ease-out!important;}.pvp-low-hp{animation:pvpGlowPulse 1s infinite!important;}@keyframes pvpSlash{0%{clip-path:inset(0 100% 0 0);opacity:1;}50%{clip-path:inset(0 0 0 0);opacity:1;}100%{clip-path:inset(0 0 0 0);opacity:0;}}@keyframes pvpProjFly{0%{transform:translateX(0) scale(1);opacity:1;}80%{opacity:0.8;}100%{transform:translateX(var(--fly-dist)) scale(0.5);opacity:0;}}@keyframes pvpBeamFire{0%{opacity:0;transform:scaleX(0);}20%{opacity:1;transform:scaleX(1);}80%{opacity:0.8;}100%{opacity:0;}}@keyframes pvpImpact{0%{transform:scale(0);opacity:1;}50%{transform:scale(1.5);opacity:0.6;}100%{transform:scale(2);opacity:0;}}',
            '#pvp-battle-screen .pvp-char{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;}',
            '#pvp-battle-screen .pvp-sprite{display:flex;align-items:flex-end;justify-content:center;overflow:hidden;max-width:90px;max-height:100px;}',
            '#pvp-battle-screen .pvp-sprite svg{width:100%!important;height:100%!important;max-width:90px!important;max-height:100px!important;}',
            '@media(max-width:768px){#pvp-battle-screen .pvp-sprite{width:70px!important;height:80px!important;}#pvp-battle-screen .pvp-name{font-size:6px!important;}#pvp-battle-screen .pvp-badge{font-size:5px!important;padding:0px 2px!important;}}',
            '@media(min-width:769px){#pvp-battle-screen .pvp-sprite{width:90px!important;height:100px!important;}}',
        ].join('');
        document.head.appendChild(st);
    }

    var screen = document.createElement('div');
    screen.id = 'pvp-battle-screen';
    screen.style.cssText = 'position:fixed;inset:0;z-index:99999;overflow:hidden;';

    var bgHtml = '';
    if (typeof backgrounds !== 'undefined' && backgrounds['pvp_dungeon']) {
        bgHtml = backgrounds['pvp_dungeon'];
    }

    screen.innerHTML =
    '<div style="position:relative;width:100%;height:100%;background:#030712;overflow:hidden;">' +
        // Background
        '<div style="position:absolute;inset:0;z-index:0;">' + bgHtml + '</div>' +

        // TOP BAR — Cinematic HUD
        '<div style="position:absolute;top:0;left:0;right:0;z-index:50;background:linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.6),transparent);padding:6px 12px 14px;backdrop-filter:blur(3px);">' +
            '<div style="display:flex;align-items:center;gap:6px;">' +
                '<div style="flex:1;text-align:left;">' +
                    '<div style="font-size:12px;font-weight:900;color:#4ade80;text-shadow:0 0 8px rgba(74,222,128,0.3);letter-spacing:1px;">' + ((typeof currentUser !== 'undefined' && currentUser && currentUser.username) ? currentUser.username.toUpperCase() : (typeof state !== 'undefined' && state.guestName ? state.guestName.toUpperCase() : 'YOU')) + '</div>' +
                    '<div style="font-size:7px;color:#64748b;">' + pvpBattleState.playerTeam.length + ' units</div>' +
                '</div>' +
                '<div style="flex:2;display:flex;flex-direction:column;align-items:center;gap:3px;">' +
                    '<div style="display:flex;align-items:center;gap:6px;width:100%;">' +
                        '<div style="flex:1;height:6px;background:#1e293b;border-radius:4px;overflow:hidden;border:1px solid #334155;">' +
                            '<div id="pvp-timer-bar" style="height:100%;width:100%;background:linear-gradient(90deg,#22c55e,#4ade80);border-radius:4px;transition:width 0.1s;box-shadow:0 0 6px rgba(74,222,128,0.3);"></div>' +
                        '</div>' +
                        '<span id="pvp-timer-text" style="font-size:14px;font-weight:900;color:white;min-width:40px;text-align:center;text-shadow:0 0 6px rgba(255,255,255,0.3);">60s</span>' +
                    '</div>' +
                    '<span id="pvp-speed-badge" style="font-size:7px;color:#94a3b8;background:rgba(30,41,59,0.8);padding:1px 8px;box-sizing:border-box;border-radius:3px;border:1px solid #334155;">1X</span>' +
                '</div>' +
                '<div style="flex:1;text-align:right;">' +
                    '<div style="font-size:12px;font-weight:900;color:#f87171;text-shadow:0 0 8px rgba(239,68,68,0.3);letter-spacing:1px;">' + pvpBattleState.opponent.name.toUpperCase() + '</div>' +
                    '<div style="font-size:7px;color:#64748b;">' + pvpBattleState.enemyTeam.length + ' units</div>' +
                '</div>' +
            '</div>' +
        '</div>' +

        // PLAYER TEAM (Chars + Robots)
        '<div style="position:absolute;left:3%;bottom:22%;z-index:20;display:flex;align-items:flex-end;gap:10px;">' +
            '<div id="pvp-player-line" style="display:flex;align-items:flex-end;gap:6px;margin-bottom:6vh;"></div>' +
            '<div id="pvp-robot-line" style="display:flex;align-items:center;gap:4px;z-index:25;"></div>' +
        '</div>' +

        // ENEMY TEAM (Chars + Robots, mirrored)
        '<div style="position:absolute;right:3%;bottom:22%;z-index:20;display:flex;flex-direction:row-reverse;align-items:flex-end;gap:10px;">' +
            '<div id="pvp-enemy-line" style="display:flex;flex-direction:row-reverse;align-items:flex-end;gap:6px;margin-bottom:6vh;"></div>' +
            '<div id="pvp-enemy-robots" style="display:flex;flex-direction:row-reverse;align-items:center;gap:4px;z-index:25;"></div>' +
        '</div>' +

        // DRAIN WARNING
        '<div id="pvp-effects-layer" style="position:absolute;inset:0;z-index:70;pointer-events:none;overflow:hidden;"></div>' +
        '<div id="pvp-drain-warning" style="display:none;position:absolute;bottom:0;left:0;right:0;z-index:60;text-align:center;padding:6px;background:rgba(239,68,68,0.3);border-top:2px solid #dc2626;font-size:12px;color:#ef4444;font-weight:900;letter-spacing:2px;animation:pulse 0.5s infinite alternate;">\u2620\uFE0F HEALTH DRAIN \u2620\uFE0F</div>' +
    '</div>';

    document.body.appendChild(screen);
    pvpFullTeamRender();
}

function pvpMakeCharHTML(unit, isPlayer) {
    var hpPct = Math.max(0, (unit.hp / unit.maxHp) * 100);
    var level = unit.level;
    var dmg = unit.baseDmg * level;
    var dps = Math.round((unit.baseDmg * level * 1000) / unit.atkSpeed);
    var opacity = unit.alive ? 1 : 0.2;

    // Get SVG sprite
    var sprite = '';
    if (unit.type === 'char') {
        if (isPlayer && typeof getVectorFrame === 'function') {
            sprite = getVectorFrame(unit.key, false);
        } else if (!isPlayer && unit.skin && unit.skin !== 'default' && typeof getVectorFrameForSkin === 'function') {
            // Opponent has a custom skin
            var rawSprite = getVectorFrameForSkin(unit.key, unit.skin);
            sprite = typeof rawSprite === 'string' ? rawSprite : (rawSprite.idle || '');
        } else if (typeof vectors !== 'undefined' && vectors[unit.key]) {
            sprite = typeof vectors[unit.key] === 'string' ? vectors[unit.key] : (vectors[unit.key].idle || '');
        }
    } else if (unit.type === 'bot' && typeof vectors !== 'undefined') {
        sprite = vectors[unit.key] || '';
    }
    if (!sprite) sprite = '<div style="font-size:24px;">' + (unit.type === 'bot' ? '\u{1F916}' : '\u2753') + '</div>';

    var flipStyle = isPlayer ? '' : 'transform:scaleX(-1);';
    var hpBg = hpPct > 50 ? 'from-green-500 to-green-400' : hpPct > 25 ? 'from-yellow-500 to-yellow-400' : 'from-red-600 to-red-400';
    var lowHpClass = (unit.alive && hpPct <= 25 && hpPct > 0) ? ' pvp-low-hp' : '';

    var side = isPlayer ? 'p' : 'e';
    var unitId = 'pvp-unit-' + side + '-' + unit.key;
    var h = '<div class="pvp-char' + lowHpClass + '" id="' + unitId + '" data-pvp-side="' + side + '" data-pvp-key="' + unit.key + '" style="opacity:' + opacity + ';">';

    // HP bar on top
    h += '<div style="width:92%;height:5px;background:#1a0505;border:1px solid #7f1d1d;border-radius:3px;overflow:hidden;margin-bottom:2px;box-shadow:inset 0 1px 2px rgba(0,0,0,0.5);">' +
        '<div data-pvp-hp="1" class="bg-gradient-to-r ' + hpBg + '" style="height:100%;width:' + hpPct + '%;transition:width 0.3s ease-out;border-radius:2px;box-shadow:0 0 4px rgba(74,222,128,0.3);"></div></div>' +
        '<div data-pvp-hptext="1" style="font-size:5px;color:#94a3b8;font-weight:bold;margin-bottom:1px;">' + Math.ceil(unit.hp) + '/' + unit.maxHp + '</div>';

    // Stat badges
    h += '<div style="display:flex;gap:1px;margin-bottom:1px;">' +
        '<span class="pvp-badge" style="background:rgba(120,53,15,0.9);color:#fcd34d;font-size:6px;padding:0px 3px;box-sizing:border-box;border-radius:2px;border:1px solid #92400e;font-weight:bold;">L' + level + '</span>' +
        '<span class="pvp-badge" style="background:rgba(22,101,52,0.9);color:#86efac;font-size:6px;padding:0px 3px;box-sizing:border-box;border-radius:2px;border:1px solid #166534;font-weight:bold;">' + dmg + '</span>' +
    '</div>';

    // Sprite
    h += '<div class="pvp-sprite" style="width:90px;height:100px;' + flipStyle + '">' + sprite + '</div>';

    // Name
    h += '<span class="pvp-name" style="background:rgba(69,26,3,0.9);color:white;border:1px solid #92400e;font-weight:bold;font-size:7px;padding:1px 4px;box-sizing:border-box;border-radius:2px;white-space:nowrap;text-transform:uppercase;letter-spacing:0.3px;margin-top:-2px;">' + unit.name + '</span>';

    // Lane
    h += '<span style="font-size:5px;color:#64748b;text-transform:uppercase;margin-top:1px;">' + (unit.lane || 'mid').toUpperCase() + '</span>';

    // Death
    if (!unit.alive) h += '<div style="position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);font-size:22px;z-index:10;filter:drop-shadow(0 0 4px red);">\u{1F480}</div>';

    h += '</div>';
    return h;
}

function pvpFullTeamRender() {
    if (!pvpBattleState) return;

    function getByLane(team, lane, type) {
        return team.filter(function(u) { return u.lane === lane && u.type === (type || 'char'); });
    }
    function getAllType(team, type) {
        return team.filter(function(u) { return u.type === type; });
    }

    var playerLine = document.getElementById('pvp-player-line');
    if (playerLine) {
        var ph = '';
        ['back', 'mid', 'front'].forEach(function(lane) {
            var chars = getByLane(pvpBattleState.playerTeam, lane, 'char');
            if (chars.length === 0) return;
            ph += '<div style="display:flex;flex-direction:row;align-items:flex-end;gap:4px;">';
            chars.forEach(function(u) { ph += pvpMakeCharHTML(u, true); });
            ph += '</div>';
        });
        playerLine.innerHTML = ph;
    }

    var robotLine = document.getElementById('pvp-robot-line');
    if (robotLine) {
        var rh = '';
        getAllType(pvpBattleState.playerTeam, 'bot').forEach(function(u) { rh += pvpMakeCharHTML(u, true); });
        robotLine.innerHTML = rh;
    }

    var enemyLine = document.getElementById('pvp-enemy-line');
    if (enemyLine) {
        var eh = '';
        ['back', 'mid', 'front'].forEach(function(lane) {
            var chars = getByLane(pvpBattleState.enemyTeam, lane, 'char');
            if (chars.length === 0) return;
            eh += '<div style="display:flex;flex-direction:row;align-items:flex-end;gap:4px;">';
            chars.forEach(function(u) { eh += pvpMakeCharHTML(u, false); });
            eh += '</div>';
        });
        enemyLine.innerHTML = eh;
    }

    var enemyRobots = document.getElementById('pvp-enemy-robots');
    if (enemyRobots) {
        var erh = '';
        getAllType(pvpBattleState.enemyTeam, 'bot').forEach(function(u) { erh += pvpMakeCharHTML(u, false); });
        enemyRobots.innerHTML = erh;
    }
}

var _pvpDisplayDirty = false;
var _pvpDisplayTimer = null;
function updatePvpTeamDisplay() {
    if (!pvpBattleState) return;
    // Batch UI updates: mark dirty, flush at most every 200ms
    _pvpDisplayDirty = true;
    if (_pvpDisplayTimer) return;
    _pvpDisplayTimer = setTimeout(function() {
        _pvpDisplayTimer = null;
        if (!_pvpDisplayDirty || !pvpBattleState) return;
        _pvpDisplayDirty = false;
        _pvpFlushTeamDisplay();
    }, 200);
}

function _pvpFlushTeamDisplay() {
    if (!pvpBattleState) return;

    function updateUnit(unit, side) {
        var unitId = 'pvp-unit-' + side + '-' + unit.key;
        var el = document.getElementById(unitId);
        if (!el) {
            // Element missing — need a full rebuild
            pvpFullTeamRender();
            return;
        }

        var hpPct = Math.max(0, (unit.hp / unit.maxHp) * 100);

        // Update HP bar width
        var hpBar = el.querySelector('[data-pvp-hp]');
        if (hpBar) {
            hpBar.style.width = hpPct + '%';
            // Update HP bar color class
            var newBg = hpPct > 50 ? 'from-green-500 to-green-400' : hpPct > 25 ? 'from-yellow-500 to-yellow-400' : 'from-red-600 to-red-400';
            hpBar.className = 'bg-gradient-to-r ' + newBg;
        }

        // Update HP text
        var hpText = el.querySelector('[data-pvp-hptext]');
        if (hpText) hpText.textContent = Math.ceil(unit.hp) + '/' + unit.maxHp;

        // Update opacity for dead units
        el.style.opacity = unit.alive ? 1 : 0.2;

        // Low HP class
        if (unit.alive && hpPct <= 25) el.classList.add('pvp-low-hp');
        else el.classList.remove('pvp-low-hp');

        // Update sprite to injured state when HP drops below 50%
        if (unit.alive && unit.type === 'char' && hpPct < 50 && hpPct > 0) {
            var spriteEl = el.querySelector('.pvp-sprite');
            if (spriteEl && !spriteEl.getAttribute('data-pvp-injured')) {
                var injSvg = '';
                if (side === 'p' && typeof getVectorFrame === 'function') {
                    injSvg = getVectorFrame(unit.key, false, 'injured');
                } else if (typeof vectors !== 'undefined' && vectors[unit.key] && typeof vectors[unit.key] !== 'string') {
                    injSvg = vectors[unit.key].injured || '';
                }
                if (injSvg) {
                    spriteEl.innerHTML = injSvg;
                    spriteEl.setAttribute('data-pvp-injured', '1');
                }
            }
        }

        // Death skull overlay — add once when unit dies
        if (!unit.alive && !el.querySelector('[data-pvp-skull]')) {
            var skull = document.createElement('div');
            skull.setAttribute('data-pvp-skull', '1');
            skull.style.cssText = 'position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);font-size:22px;z-index:10;filter:drop-shadow(0 0 4px red);';
            skull.textContent = '\u{1F480}';
            el.appendChild(skull);
        }
    }

    pvpBattleState.playerTeam.forEach(function(u) { updateUnit(u, 'p'); });
    pvpBattleState.enemyTeam.forEach(function(u) { updateUnit(u, 'e'); });
}


function getAliveTargets(team) {
    // Lane priority: front > mid > back
    var lanes = ['front', 'mid', 'back'];
    for (var i = 0; i < lanes.length; i++) {
        var targets = team.filter(function(u) { return u.alive && u.lane === lanes[i]; });
        if (targets.length > 0) return targets;
    }
    return team.filter(function(u) { return u.alive; });
}


// ============================================================
// PVP COMBAT VISUAL EFFECTS
// ============================================================

// ============================================================
// CINEMATIC EFFECTS
// ============================================================
var pvpKillCount = { p: 0, e: 0 };

var _pvpShakeTimer = null;
function pvpScreenShake() {
    var screen = document.getElementById('pvp-battle-screen');
    if (!screen) return;
    var inner = screen.querySelector('div');
    if (!inner) return;
    // Throttle: skip if already shaking
    if (_pvpShakeTimer) return;
    inner.classList.add('pvp-screen-shake');
    _pvpShakeTimer = setTimeout(function() {
        inner.classList.remove('pvp-screen-shake');
        _pvpShakeTimer = null;
    }, 400);
}

function pvpSpawnEmbers() {
    var layer = document.getElementById('pvp-effects-layer');
    if (!layer || !pvpBattleState || pvpBattleState.finished) return;
    // Cap total effect elements to prevent DOM explosion
    if (layer.children.length > 40) return;
    var ember = document.createElement('div');
    var x = Math.random() * 100;
    var size = 2 + Math.random() * 3;
    var dur = 2.5 + Math.random() * 3;
    var hue = Math.random() > 0.5 ? '#f59e0b' : '#ef4444';
    ember.style.cssText = 'position:absolute;bottom:15%;left:' + x + '%;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + hue + ';box-shadow:0 0 4px ' + hue + ';pointer-events:none;animation:pvpEmber ' + dur + 's ease-out forwards;opacity:0;';
    layer.appendChild(ember);
    setTimeout((function(e) { return function() { if (e.parentNode) e.remove(); }; })(ember), dur * 1000 + 100);
}

function pvpShowKillBanner(killerKey, victimKey, side) {
    var layer = document.getElementById('pvp-effects-layer');
    if (!layer) return;
    pvpKillCount[side]++;
    var killerName = characters[killerKey] ? characters[killerKey].name : killerKey;
    var victimName = characters[victimKey] ? characters[victimKey].name : victimKey;
    
    var streakText = '';
    var count = pvpKillCount[side];
    if (count >= 5) streakText = '\u{1F525} UNSTOPPABLE!';
    else if (count >= 4) streakText = '\u{1F525} DOMINATING!';
    else if (count >= 3) streakText = '\u26A1 TRIPLE KILL!';
    else if (count >= 2) streakText = '\u2694 DOUBLE KILL!';
    else streakText = '\u{1F480} ELIMINATED';
    
    var color = side === 'p' ? '#4ade80' : '#ef4444';
    var banner = document.createElement('div');
    banner.style.cssText = 'position:absolute;top:35%;left:0;width:100%;z-index:100;text-align:center;pointer-events:none;animation:pvpKillBanner 1.8s ease-out forwards;';
    banner.innerHTML = '<div style="display:inline-block;background:linear-gradient(90deg,transparent,' + color + '20,' + color + '30,' + color + '20,transparent);padding:8px 40px;box-sizing:border-box;border-top:1px solid ' + color + '80;border-bottom:1px solid ' + color + '80;">' +
        '<div style="font-size:16px;font-weight:900;color:' + color + ';letter-spacing:4px;text-shadow:0 0 15px ' + color + ';">' + streakText + '</div>' +
        '<div style="font-size:9px;color:#94a3b8;margin-top:2px;">' + killerName + ' \u{2192} ' + victimName + '</div></div>';
    layer.appendChild(banner);
    setTimeout(function() { if (banner.parentNode) banner.remove(); }, 1900);
}

function pvpBattleIntro(callback) {
    var screen = document.getElementById('pvp-battle-screen');
    if (!screen) { if (callback) callback(); return; }
    
    var intro = document.createElement('div');
    intro.id = 'pvp-intro-overlay';
    intro.style.cssText = 'position:absolute;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);pointer-events:none;';
    
    var playerName = (typeof getPlayerDisplayName === 'function') ? getPlayerDisplayName().toUpperCase() : ((typeof currentUser !== 'undefined' && currentUser && currentUser.username) ? currentUser.username.toUpperCase() : (typeof state !== 'undefined' && state.guestName ? state.guestName.toUpperCase() : 'YOU'));
    var enemyName = pvpBattleState.opponent.name.toUpperCase();
    
    intro.innerHTML = 
        '<div style="display:flex;align-items:center;gap:20px;width:90%;max-width:500px;justify-content:center;">' +
            '<div style="text-align:center;flex:1;animation:pvpSlideInLeft 0.5s ease-out;">' +
                '<div style="font-size:10px;color:#4ade80;letter-spacing:3px;text-transform:uppercase;margin-bottom:4px;">CHALLENGER</div>' +
                '<div style="font-size:18px;font-weight:900;color:white;text-shadow:0 0 10px rgba(74,222,128,0.3);">' + playerName + '</div>' +
                '<div style="font-size:8px;color:#64748b;margin-top:2px;">' + pvpBattleState.playerTeam.length + ' units</div>' +
            '</div>' +
            '<div style="animation:pvpVsSlam 0.6s cubic-bezier(0.175,0.885,0.32,1.275) 0.3s both;">' +
                '<div style="font-size:36px;font-weight:900;color:#dc2626;animation:pvpVsPulse 1s infinite;letter-spacing:4px;">VS</div>' +
            '</div>' +
            '<div style="text-align:center;flex:1;animation:pvpSlideInRight 0.5s ease-out;">' +
                '<div style="font-size:10px;color:#ef4444;letter-spacing:3px;text-transform:uppercase;margin-bottom:4px;">OPPONENT</div>' +
                '<div style="font-size:18px;font-weight:900;color:white;text-shadow:0 0 10px rgba(239,68,68,0.3);">' + enemyName + '</div>' +
                '<div style="font-size:8px;color:#64748b;margin-top:2px;">' + pvpBattleState.enemyTeam.length + ' units</div>' +
            '</div>' +
        '</div>' +
        '<div style="position:absolute;bottom:25%;left:0;width:100%;text-align:center;animation:pvpFadeUp 0.4s ease-out 1s both;">' +
            '<div style="font-size:24px;font-weight:900;color:white;letter-spacing:6px;text-shadow:0 0 10px rgba(255,255,255,0.5);">' + (pvpBattleState.opponent.isFriendly ? 'FRIENDLY SPAR' : 'BATTLE START') + '</div>' +
        '</div>';
    
    screen.querySelector('div').appendChild(intro);
    
    setTimeout(function() {
        if (intro.parentNode) {
            intro.style.transition = 'opacity 0.4s';
            intro.style.opacity = '0';
            setTimeout(function() { if (intro.parentNode) intro.remove(); }, 400);
        }
        if (callback) callback();
    }, 2200);
}

function pvpGetUnitPos(unitKey, side) {
    var el = document.getElementById('pvp-unit-' + side + '-' + unitKey);
    var screen = document.getElementById('pvp-battle-screen');
    if (!el || !screen) return null;
    var r = el.getBoundingClientRect();
    var s = screen.getBoundingClientRect();
    return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height * 0.3, el: el };
}

var _pvpDmgLastTime = 0;
function pvpSpawnDmgPopup(unitKey, side, dmg, isCrit) {
    // Throttle non-crit popups to max ~8/sec
    var now = Date.now();
    if (!isCrit && now - _pvpDmgLastTime < 120) return;
    _pvpDmgLastTime = now;
    var pos = pvpGetUnitPos(unitKey, side);
    var layer = document.getElementById('pvp-effects-layer');
    if (!pos || !layer) return;
    // Cap effect elements
    if (layer.children.length > 50) {
        var first = layer.firstChild;
        if (first) first.remove();
    }
    var popup = document.createElement('div');
    var color = isCrit ? '#fbbf24' : '#ff6b6b';
    var size = isCrit ? '18px' : '13px';
    var text = isCrit ? '\u{1F4A5} ' + dmg : '-' + dmg;
    var xOff = (Math.random() - 0.5) * 30;
    popup.style.cssText = 'position:absolute;left:' + (pos.x + xOff) + 'px;top:' + pos.y + 'px;font-size:' + size + ';font-weight:900;color:' + color + ';text-shadow:0 1px 4px rgba(0,0,0,1), 0 0 8px ' + color + '80;z-index:100;pointer-events:none;animation:pvpDmgFloat 0.9s ease-out forwards;white-space:nowrap;font-family:monospace;';
    popup.textContent = text;
    layer.appendChild(popup);
    setTimeout(function() { if (popup.parentNode) popup.remove(); }, 950);
}

function pvpSpawnHealPopup(unitKey, side, amt) {
    var pos = pvpGetUnitPos(unitKey, side);
    var layer = document.getElementById('pvp-effects-layer');
    if (!pos || !layer || layer.children.length > 30) return;
    var popup = document.createElement('div');
    popup.style.cssText = 'position:absolute;left:' + pos.x + 'px;top:' + (pos.y - 10) + 'px;font-size:12px;font-weight:900;color:#4ade80;text-shadow:0 1px 4px rgba(0,0,0,1), 0 0 6px #22c55e80;z-index:100;pointer-events:none;animation:pvpHealFloat 0.8s ease-out forwards;white-space:nowrap;';
    popup.textContent = '+' + amt + ' \u2764';
    layer.appendChild(popup);
    // Green pulse ring
    var ring = document.createElement('div');
    ring.style.cssText = 'position:absolute;left:' + (pos.x - 15) + 'px;top:' + (pos.y - 5) + 'px;width:30px;height:30px;border-radius:50%;border:2px solid #4ade80;z-index:99;pointer-events:none;animation:pvpCritBurst 0.5s ease-out forwards;';
    layer.appendChild(ring);
    setTimeout(function() { if (popup.parentNode) popup.remove(); if (ring.parentNode) ring.remove(); }, 850);
}

function pvpSpawnBuffPopup(unitKey, side, text) {
    var pos = pvpGetUnitPos(unitKey, side);
    var layer = document.getElementById('pvp-effects-layer');
    if (!pos || !layer || layer.children.length > 30) return;
    var popup = document.createElement('div');
    popup.style.cssText = 'position:absolute;left:' + pos.x + 'px;top:' + (pos.y - 20) + 'px;font-size:10px;font-weight:900;color:#fbbf24;text-shadow:0 1px 3px rgba(0,0,0,1);z-index:100;pointer-events:none;animation:pvpHealFloat 1.1s ease-out forwards;white-space:nowrap;';
    popup.textContent = text;
    layer.appendChild(popup);
    setTimeout(function() { if (popup.parentNode) popup.remove(); }, 1150);
}

function pvpHitEffect(unitKey, side) {
    var pos = pvpGetUnitPos(unitKey, side);
    if (!pos) return;
    // Flash the unit
    pos.el.style.transition = 'filter 0.1s';
    pos.el.style.filter = 'brightness(3) saturate(0)';
    setTimeout(function() { pos.el.style.filter = ''; }, 150);
    // Shake
    pos.el.style.animation = 'pvpShake 0.3s ease-out';
    setTimeout(function() { pos.el.style.animation = ''; }, 350);
    // Swap sprite to injured frame during hit reaction
    pvpSwapSpriteFrame(unitKey, side, 'injured', 350);
}

function pvpAttackEffect(unitKey, side) {
    var pos = pvpGetUnitPos(unitKey, side);
    if (!pos) return;
    var anim = side === 'p' ? 'pvpAttackLunge' : 'pvpAttackLungeLeft';
    pos.el.style.animation = anim + ' 0.3s ease-out';
    setTimeout(function() { pos.el.style.animation = ''; }, 350);
    // Swap sprite to attack frame during lunge
    pvpSwapSpriteFrame(unitKey, side, 'attack', 300);
}

// Swap PvP character sprite to a different animation frame, then revert
function pvpSwapSpriteFrame(unitKey, side, animState, durationMs) {
    var el = document.getElementById('pvp-unit-' + side + '-' + unitKey);
    if (!el) return;
    var spriteContainer = el.querySelector('.pvp-sprite');
    if (!spriteContainer) return;
    
    var isPlayer = (side === 'p');
    var newSvg = '';
    
    if (isPlayer && typeof getVectorFrame === 'function') {
        newSvg = getVectorFrame(unitKey, false, animState);
    } else if (!isPlayer) {
        // For enemies, try to get from vectors directly with animState
        if (typeof vectors !== 'undefined' && vectors[unitKey]) {
            if (typeof vectors[unitKey] === 'string') return; // string vectors have no frames
            newSvg = vectors[unitKey][animState] || '';
        }
    }
    
    if (!newSvg) return;
    spriteContainer.innerHTML = newSvg;
    
    // Revert after duration
    setTimeout(function() {
        if (!el.parentNode) return; // element removed
        var revertState = 'idle';
        // Check if unit has low HP — find unit in battle state
        if (pvpBattleState) {
            var team = (side === 'p') ? pvpBattleState.playerTeam : pvpBattleState.enemyTeam;
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

var _pvpCritLastTime = 0;
function pvpCritBurst(unitKey, side) {
    var now = Date.now();
    if (now - _pvpCritLastTime < 250) return;
    _pvpCritLastTime = now;
    var pos = pvpGetUnitPos(unitKey, side);
    var layer = document.getElementById('pvp-effects-layer');
    if (!pos || !layer || layer.children.length > 30) return;
    var burst = document.createElement('div');
    burst.style.cssText = 'position:absolute;left:' + (pos.x - 25) + 'px;top:' + (pos.y - 15) + 'px;width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,rgba(251,191,36,0.6),rgba(239,68,68,0.2),transparent);z-index:99;pointer-events:none;animation:pvpCritBurst 0.45s ease-out forwards;';
    layer.appendChild(burst);
    // Screen flash
    var flash = document.createElement('div');
    flash.style.cssText = 'position:absolute;inset:0;background:rgba(251,191,36,0.08);z-index:90;pointer-events:none;';
    layer.appendChild(flash);
    setTimeout(function() { if (burst.parentNode) burst.remove(); if (flash.parentNode) flash.remove(); }, 500);
}

function pvpDeathEffect(unitKey, side) {
    var pos = pvpGetUnitPos(unitKey, side);
    var layer = document.getElementById('pvp-effects-layer');
    if (!pos || !layer) return;
    // Big skull
    var skull = document.createElement('div');
    skull.style.cssText = 'position:absolute;left:' + (pos.x - 15) + 'px;top:' + (pos.y - 10) + 'px;font-size:30px;z-index:100;pointer-events:none;filter:drop-shadow(0 0 10px #dc2626);animation:pvpDmgFloat 1.3s ease-out forwards;';
    skull.textContent = '\u2620\uFE0F';
    layer.appendChild(skull);
    // Red burst
    var burst = document.createElement('div');
    burst.style.cssText = 'position:absolute;left:' + (pos.x - 30) + 'px;top:' + (pos.y - 20) + 'px;width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,rgba(220,38,38,0.5),transparent);z-index:98;pointer-events:none;animation:pvpCritBurst 0.6s ease-out forwards;';
    layer.appendChild(burst);
    // KO text
    var ko = document.createElement('div');
    ko.style.cssText = 'position:absolute;left:' + (pos.x - 10) + 'px;top:' + (pos.y + 20) + 'px;font-size:14px;font-weight:900;color:#ef4444;text-shadow:0 0 8px #dc2626;z-index:100;pointer-events:none;animation:pvpDmgFloat 1s ease-out forwards;letter-spacing:3px;';
    ko.textContent = 'K.O.';
    layer.appendChild(ko);
    setTimeout(function() { if (skull.parentNode) skull.remove(); if (burst.parentNode) burst.remove(); if (ko.parentNode) ko.remove(); }, 1350);
}

var _pvpFxLastTime = {};
// SVG template cache: parse SVG once, cloneNode(true) for reuse
var _pvpSvgTemplates = {};
function _pvpCloneSvg(key, html) {
    if (!_pvpSvgTemplates[key]) {
        var t = document.createElement('template');
        t.innerHTML = html;
        _pvpSvgTemplates[key] = t;
    }
    return _pvpSvgTemplates[key].content.cloneNode(true);
}
function _pvpSetSvg(el, key, html) {
    var frag = _pvpCloneSvg(key, html);
    el.appendChild(frag);
}
function pvpSpawnAttackVisual(attackerKey, attackerSide, targetKey, targetSide, isCrit) {
    var layer = document.getElementById('pvp-effects-layer');
    if (!layer) return;
    // Cap total effects layer elements to prevent DOM explosion
    if (layer.children.length > 30) return;
    // Throttle: skip if same attacker fired FX < 300ms ago
    var now = Date.now();
    var fxKey = attackerSide + '_' + attackerKey;
    if (_pvpFxLastTime[fxKey] && (now - _pvpFxLastTime[fxKey]) < 300) return;
    _pvpFxLastTime[fxKey] = now;
    var aPos = pvpGetUnitPos(attackerKey, attackerSide);
    var tPos = pvpGetUnitPos(targetKey, targetSide);
    if (!aPos || !tPos) return;
    
    var dx = tPos.x - aPos.x;
    var dy = tPos.y - aPos.y;
    var dist = Math.sqrt(dx*dx + dy*dy);
    var angle = Math.atan2(dy, dx) * (180 / Math.PI);

    switch(attackerKey) {
        case 'sheldon':
            // Green power ball flying to enemy
            var ball = document.createElement('div');
            ball.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-8)+'px;width:16px;height:16px;border-radius:50%;background:radial-gradient(circle,#86efac,#22c55e,#15803d);box-shadow:0 0 12px #22c55e,0 0 24px #22c55e60;z-index:86;pointer-events:none;transition:left 0.25s ease-in,top 0.25s ease-in;transform:scale(1.5);';
            layer.appendChild(ball);
            raf2(function(){ball.style.left=tPos.x+'px';ball.style.top=(tPos.y-8)+'px';ball.style.opacity='0';});
            rm(ball,300);
            break;

        case 'leonard':
            // Sword slash at enemy
            var sw = document.createElement('div');
            var sz = isCrit ? 55 : 40;
            sw.style.cssText = 'position:absolute;left:'+(tPos.x-sz/2)+'px;top:'+(tPos.y-sz/2-10)+'px;width:'+sz+'px;height:'+sz+'px;z-index:86;pointer-events:none;';
            _pvpSetSvg(sw, 'leonard_sword', '<svg viewBox="0 0 100 100" style="width:100%;height:100%;filter:drop-shadow(0 0 8px rgba(255,255,255,0.5));"><path d="M10 90 L80 20 L90 10 L80 0 L70 10 L0 80 Z" fill="#f1f5f9" stroke="#334155" stroke-width="2.5"><animate attributeName="opacity" values="0;1;1;0" dur="0.35s" fill="freeze"/></path><path d="M15 85 L75 25" stroke="#ffffff" stroke-width="3" opacity="0.8"/><rect x="5" y="80" width="15" height="15" rx="2" fill="#b45309"/></svg>');
            layer.appendChild(sw);
            // Dash toward enemy
            if(aPos.el){aPos.el.style.animation='pvpAttackLunge 0.3s ease-out';setTimeout(function(){aPos.el.style.animation=''},350);}
            rm(sw,400);
            break;

        case 'penny':
            // Burger throw
            var bg = document.createElement('div');
            bg.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-12)+'px;z-index:86;pointer-events:none;transition:left 0.35s ease-in,top 0.35s ease-in;';
            _pvpSetSvg(bg, 'penny_burger', '<svg viewBox="0 0 40 40" width="32" height="32" style="filter:drop-shadow(0 0 6px #d97706);"><path d="M5,20 Q20,5 35,20 Z" fill="#d97706"/><rect x="5" y="21" width="30" height="4" fill="#16a34a" rx="1"/><rect x="5" y="25" width="30" height="6" fill="#451a03" rx="2"/><rect x="5" y="32" width="30" height="6" fill="#d97706" rx="2"/></svg>');
            layer.appendChild(bg);
            raf2(function(){bg.style.left=tPos.x+'px';bg.style.top=(tPos.y-12)+'px';bg.style.transform='rotate(360deg)';});
            rm(bg,400);
            break;

        case 'howard':
            // Missile/rocket
            var ms = document.createElement('div');
            ms.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-5)+'px;z-index:86;pointer-events:none;transition:left 0.2s linear,top 0.2s linear;transform:rotate('+angle+'deg);transform-origin:center;';
            _pvpSetSvg(ms, 'howard_missile', '<svg viewBox="0 0 60 20" width="36" height="12" style="filter:drop-shadow(0 0 8px rgba(220,38,38,0.8));"><path d="M0 5 L40 5 L55 10 L40 15 L0 15 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1"/><polygon points="0,5 -12,0 -7,10" fill="#dc2626"/><polygon points="0,15 -12,20 -7,10" fill="#dc2626"/><circle cx="45" cy="10" r="2" fill="#eab308"/></svg>');
            layer.appendChild(ms);
            raf2(function(){ms.style.left=tPos.x+'px';ms.style.top=(tPos.y-5)+'px';});
            rm(ms,280);
            break;

        case 'raj':
            // Sun beam + laser
            var sun = document.createElement('div');
            sun.style.cssText = 'position:absolute;left:'+(tPos.x-25)+'px;top:'+(tPos.y-80)+'px;width:50px;height:50px;z-index:86;pointer-events:none;animation:pvpCritBurst 0.8s ease-out forwards;';
            _pvpSetSvg(sun, 'raj_sun', '<svg viewBox="0 0 100 100" style="width:100%;height:100%;animation:spin 1s linear infinite;filter:drop-shadow(0 0 15px #ea580c);"><circle cx="50" cy="50" r="30" fill="#ea580c"/><path d="M50 0 L55 15 L70 10 L60 25 L80 30 L65 40 L85 55 L70 60 L75 80 L60 70 L50 90 L40 70 L25 80 L30 60 L15 55 L35 40 L20 30 L40 25 L30 10 L45 15 Z" fill="#facc15"/></svg>');
            layer.appendChild(sun);
            var beam = document.createElement('div');
            beam.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-1)+'px;width:'+dist+'px;height:3px;background:linear-gradient(90deg,#ea580c,#facc15,transparent);transform-origin:0 50%;transform:rotate('+angle+'deg);z-index:85;pointer-events:none;animation:pvpBeamFire 0.35s ease-out forwards;box-shadow:0 0 6px #ea580c;';
            layer.appendChild(beam);
            rm(sun,900);rm(beam,400);
            break;

        case 'bernie':
            // Sound wave / heal pulse
            var wave = document.createElement('div');
            wave.style.cssText = 'position:absolute;left:'+(aPos.x-20)+'px;top:'+(aPos.y-20)+'px;width:40px;height:40px;z-index:86;pointer-events:none;';
            _pvpSetSvg(wave, 'bernie_wave', '<svg viewBox="0 0 60 60" style="width:100%;height:100%;"><circle cx="30" cy="30" r="5" fill="none" stroke="#f472b6" stroke-width="2" opacity="0.8"><animate attributeName="r" from="5" to="28" dur="0.4s" fill="freeze"/><animate attributeName="opacity" from="0.9" to="0" dur="0.4s" fill="freeze"/></circle><circle cx="30" cy="30" r="5" fill="none" stroke="#fb7185" stroke-width="1.5" opacity="0.6"><animate attributeName="r" from="5" to="20" dur="0.3s" begin="0.1s" fill="freeze"/><animate attributeName="opacity" from="0.8" to="0" dur="0.3s" begin="0.1s" fill="freeze"/></circle></svg>');
            layer.appendChild(wave);
            rm(wave,500);
            break;

        case 'amy':
            // Chemical flask throw + poison splash
            var flask = document.createElement('div');
            flask.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-10)+'px;z-index:86;pointer-events:none;transition:left 0.3s ease-in,top 0.3s ease-in;';
            _pvpSetSvg(flask, 'amy_flask', '<svg viewBox="0 0 40 40" width="24" height="24" style="filter:drop-shadow(0 0 8px #4ade80);"><path d="M15 10 L25 10 L22 15 L28 35 L12 35 L18 15 Z" fill="#22c55e" stroke="#14532d" stroke-width="2"/><rect x="18" y="5" width="4" height="6" fill="#94a3b8"/><rect x="16" y="4" width="8" height="2" fill="#475569"/><circle cx="20" cy="25" r="2" fill="#bbf7d0"/></svg>');
            layer.appendChild(flask);
            raf2(function(){flask.style.left=tPos.x+'px';flask.style.top=(tPos.y-10)+'px';flask.style.transform='rotate(360deg)';});
            setTimeout(function(){
                if(flask.parentNode)flask.remove();
                var splash = document.createElement('div');
                splash.style.cssText = 'position:absolute;left:'+(tPos.x-20)+'px;top:'+(tPos.y-20)+'px;width:40px;height:40px;z-index:86;pointer-events:none;';
                _pvpSetSvg(splash, 'amy_splash', '<svg viewBox="0 0 100 100" style="width:100%;height:100%;"><circle cx="50" cy="50" r="10" fill="none" stroke="#4ade80" stroke-width="4" opacity="0.8"><animate attributeName="r" from="10" to="45" dur="0.35s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur="0.35s" fill="freeze"/></circle><ellipse cx="50" cy="70" rx="30" ry="8" fill="#22c55e" opacity="0.5"><animate attributeName="opacity" from="0.6" to="0" dur="0.5s" fill="freeze"/></ellipse></svg>');
                layer.appendChild(splash);
                rm(splash,500);
            },320);
            break;

        case 'stuart':
            // Lightsaber dash strike
            if(aPos.el){aPos.el.style.animation='pvpAttackLunge 0.25s ease-out';setTimeout(function(){aPos.el.style.animation=''},300);}
            var saber = document.createElement('div');
            saber.style.cssText = 'position:absolute;left:'+(tPos.x-20)+'px;top:'+(tPos.y-30)+'px;width:40px;height:60px;z-index:86;pointer-events:none;';
            _pvpSetSvg(saber, 'stuart_saber', '<svg viewBox="0 0 40 60" style="width:100%;height:100%;filter:drop-shadow(0 0 10px #3b82f6);"><rect x="17" y="35" width="6" height="18" rx="2" fill="#666"/><rect x="15" y="2" width="10" height="35" rx="3" fill="#3b82f6" opacity="0.9"><animate attributeName="opacity" values="1;0.5;1;0" dur="0.3s" fill="freeze"/></rect></svg>');
            layer.appendChild(saber);
            rm(saber,350);
            break;

        case 'mary':
            // Holy cross + golden glow
            var cross = document.createElement('div');
            cross.style.cssText = 'position:absolute;left:'+(aPos.x-15)+'px;top:'+(aPos.y-40)+'px;width:30px;height:30px;z-index:86;pointer-events:none;';
            _pvpSetSvg(cross, 'mary_cross', '<svg viewBox="0 0 60 60" style="width:100%;height:100%;filter:drop-shadow(0 0 8px #fbbf24);"><circle cx="30" cy="30" r="20" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.7"><animate attributeName="r" from="8" to="28" dur="0.6s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze"/></circle><text x="30" y="36" text-anchor="middle" font-size="22" fill="#fbbf24">\u271E</text></svg>');
            layer.appendChild(cross);
            rm(cross,650);
            break;

        case 'beverly':
            // Book throw spinning
            var book = document.createElement('div');
            book.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-8)+'px;z-index:86;pointer-events:none;transition:left 0.35s ease-in,top 0.35s ease-in,transform 0.35s linear;';
            _pvpSetSvg(book, 'beverly_book', '<svg viewBox="0 0 30 25" width="24" height="20"><rect x="2" y="2" width="26" height="21" rx="2" fill="#8B4513" stroke="#5c3317" stroke-width="1"/><line x1="15" y1="2" x2="15" y2="23" stroke="#d4a574" stroke-width="1"/></svg>');
            layer.appendChild(book);
            raf2(function(){book.style.left=tPos.x+'px';book.style.top=(tPos.y-8)+'px';book.style.transform='rotate(720deg) scale(0.5)';});
            rm(book,400);
            break;

        case 'proton':
            // Lightsaber strike (green)
            var ls = document.createElement('div');
            ls.style.cssText = 'position:absolute;left:'+(tPos.x-15)+'px;top:'+(tPos.y-35)+'px;width:30px;height:50px;z-index:86;pointer-events:none;';
            _pvpSetSvg(ls, 'proton_saber', '<svg viewBox="0 0 60 80" style="width:100%;height:100%;filter:drop-shadow(0 0 12px #22c55e);"><rect x="27" y="50" width="6" height="20" rx="2" fill="#666"/><rect x="25" y="5" width="10" height="48" rx="3" fill="#22c55e" opacity="0.9"><animate attributeName="opacity" values="1;0.5;1;0" dur="0.35s" fill="freeze"/></rect></svg>');
            layer.appendChild(ls);
            if(aPos.el){aPos.el.style.animation='pvpAttackLunge 0.25s ease-out';setTimeout(function(){aPos.el.style.animation=''},300);}
            rm(ls,400);
            break;

        case 'kripke':
            // Arrow(s) flying
            var ar = document.createElement('div');
            ar.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-5)+'px;z-index:86;pointer-events:none;transform-origin:center;transform:rotate('+angle+'deg);transition:left 0.25s linear,top 0.25s linear;';
            _pvpSetSvg(ar, 'kripke_arrow', '<svg viewBox="0 0 50 10" width="36" height="8"><line x1="0" y1="5" x2="40" y2="5" stroke="#8B4513" stroke-width="2"/><polygon points="40,2 48,5 40,8" fill="#a0a0a0"/><line x1="0" y1="2" x2="4" y2="5" stroke="#8B4513" stroke-width="1"/><line x1="0" y1="8" x2="4" y2="5" stroke="#8B4513" stroke-width="1"/></svg>');
            layer.appendChild(ar);
            raf2(function(){ar.style.left=tPos.x+'px';ar.style.top=(tPos.y-5)+'px';});
            // Second arrow offset
            var ar2 = document.createElement('div');
            ar2.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y+5)+'px;z-index:86;pointer-events:none;transform-origin:center;transform:rotate('+angle+'deg);transition:left 0.32s linear,top 0.32s linear;';
            _pvpSetSvg(ar2, 'kripke_arrow', '<svg viewBox="0 0 50 10" width="36" height="8"><line x1="0" y1="5" x2="40" y2="5" stroke="#8B4513" stroke-width="2"/><polygon points="40,2 48,5 40,8" fill="#a0a0a0"/><line x1="0" y1="2" x2="4" y2="5" stroke="#8B4513" stroke-width="1"/><line x1="0" y1="8" x2="4" y2="5" stroke="#8B4513" stroke-width="1"/></svg>');
            layer.appendChild(ar2);
            setTimeout(function(){raf2(function(){ar2.style.left=(tPos.x+8)+'px';ar2.style.top=(tPos.y+3)+'px';});},60);
            rm(ar,300);rm(ar2,380);
            break;

        case 'leslie':
            // Sniper tracer line + muzzle flash + impact
            var tracer = document.createElement('div');
            tracer.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-1)+'px;width:'+dist+'px;height:2px;background:linear-gradient(90deg,#ef4444,#fca5a5,transparent);transform-origin:0 50%;transform:rotate('+angle+'deg);z-index:86;pointer-events:none;opacity:0;';
            layer.appendChild(tracer);
            raf2(function(){tracer.style.opacity='1';tracer.style.transition='opacity 0.05s';});
            setTimeout(function(){tracer.style.opacity='0';},100);
            var muzzle = document.createElement('div');
            muzzle.style.cssText = 'position:absolute;left:'+(aPos.x-8)+'px;top:'+(aPos.y-8)+'px;width:16px;height:16px;background:radial-gradient(circle,#fff,#ef4444,transparent);border-radius:50%;z-index:87;pointer-events:none;animation:pvpImpact 0.15s ease-out forwards;';
            layer.appendChild(muzzle);
            var spark = document.createElement('div');
            spark.style.cssText = 'position:absolute;left:'+(tPos.x-8)+'px;top:'+(tPos.y-8)+'px;width:16px;height:16px;background:radial-gradient(circle,#fff,#ef4444,transparent);border-radius:50%;z-index:87;pointer-events:none;animation:pvpImpact 0.2s ease-out forwards;';
            layer.appendChild(spark);
            rm(tracer,180);rm(muzzle,180);rm(spark,250);
            break;

        case 'bert':
            // Rock avalanche at target
            var rock = document.createElement('div');
            rock.style.cssText = 'position:absolute;left:'+(tPos.x-25)+'px;top:'+(tPos.y-10)+'px;width:50px;height:30px;z-index:86;pointer-events:none;';
            _pvpSetSvg(rock, 'bert_rock', '<svg viewBox="0 0 80 40" style="width:100%;height:100%;filter:drop-shadow(0 0 4px #57534e);"><polygon points="10,35 20,15 30,35" fill="#78716c"/><polygon points="25,35 38,8 50,35" fill="#a8a29e"/><polygon points="45,35 55,12 65,35" fill="#57534e"/><circle cx="40" cy="30" r="5" fill="rgba(168,162,158,0.3)"><animate attributeName="r" from="5" to="25" dur="0.35s" fill="freeze"/><animate attributeName="opacity" from="0.6" to="0" dur="0.35s" fill="freeze"/></circle></svg>');
            layer.appendChild(rock);
            rm(rock,450);
            break;

        case 'wil':
            // Phaser beam (orange to blue gradient)
            var phaser = document.createElement('div');
            phaser.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-2)+'px;width:'+dist+'px;height:5px;background:linear-gradient(90deg,#f97316,#3b82f6,#60a5fa,transparent);transform-origin:0 50%;transform:rotate('+angle+'deg);z-index:86;pointer-events:none;opacity:0;border-radius:3px;box-shadow:0 0 8px rgba(59,130,246,0.6);';
            layer.appendChild(phaser);
            raf2(function(){phaser.style.opacity='1';phaser.style.transition='opacity 0.06s';});
            setTimeout(function(){phaser.style.opacity='0';},220);
            rm(phaser,300);
            break;

        case 'zack':
            // POW! punch impact
            var pow = document.createElement('div');
            var ps = isCrit ? 55 : 40;
            pow.style.cssText = 'position:absolute;left:'+(tPos.x-ps/2)+'px;top:'+(tPos.y-ps/2)+'px;width:'+ps+'px;height:'+ps+'px;z-index:87;pointer-events:none;';
            _pvpSetSvg(pow, 'zack_pow', '<svg viewBox="0 0 50 50" style="width:100%;height:100%;filter:drop-shadow(0 0 6px #fbbf24);"><text x="25" y="35" text-anchor="middle" font-size="28" fill="#fbbf24">\u{1F4A5}</text><circle cx="25" cy="25" r="5" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.7"><animate attributeName="r" from="5" to="24" dur="0.3s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur="0.3s" fill="freeze"/></circle></svg>');
            layer.appendChild(pow);
            if(aPos.el){aPos.el.style.animation='pvpAttackLunge 0.25s ease-out';setTimeout(function(){aPos.el.style.animation=''},300);}
            rm(pow,380);
            break;

        case 'emily':
            // Dark dagger slash + shadow aura
            if(aPos.el){aPos.el.style.animation='pvpAttackLunge 0.25s ease-out';setTimeout(function(){aPos.el.style.animation=''},300);}
            var dagger = document.createElement('div');
            dagger.style.cssText = 'position:absolute;left:'+(tPos.x-18)+'px;top:'+(tPos.y-18)+'px;width:36px;height:36px;z-index:86;pointer-events:none;';
            _pvpSetSvg(dagger, 'emily_dagger', '<svg viewBox="0 0 40 40" style="width:100%;height:100%;filter:drop-shadow(0 0 8px #7c3aed);"><path d="M5,35 L20,5 L35,35 Z" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0.9"><animate attributeName="opacity" values="0;1;0.8;0" dur="0.35s" fill="freeze"/></path></svg>');
            layer.appendChild(dagger);
            var shadow = document.createElement('div');
            shadow.style.cssText = 'position:absolute;left:'+(aPos.x-15)+'px;top:'+(aPos.y-15)+'px;width:30px;height:30px;background:rgba(124,58,237,0.3);border-radius:50%;z-index:85;pointer-events:none;filter:blur(4px);animation:pvpCritBurst 0.4s ease-out forwards;';
            layer.appendChild(shadow);
            rm(dagger,400);rm(shadow,450);
            break;

        default:
            // Generic energy ball
            var gen = document.createElement('div');
            gen.style.cssText = 'position:absolute;left:'+aPos.x+'px;top:'+(aPos.y-6)+'px;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle,#fbbf24,#f59e0b);box-shadow:0 0 8px #f59e0b;z-index:86;pointer-events:none;transition:left 0.22s ease-in,top 0.22s ease-in;';
            layer.appendChild(gen);
            raf2(function(){gen.style.left=tPos.x+'px';gen.style.top=(tPos.y-6)+'px';gen.style.opacity='0';});
            rm(gen,280);
            break;
    }
    
    // Impact flash at target (always)
    var impSz = isCrit ? 28 : 16;
    var imp = document.createElement('div');
    imp.style.cssText = 'position:absolute;left:'+(tPos.x-impSz/2)+'px;top:'+(tPos.y-impSz/2)+'px;width:'+impSz+'px;height:'+impSz+'px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.6),transparent);z-index:85;pointer-events:none;animation:pvpImpact 0.25s ease-out forwards;';
    layer.appendChild(imp);
    rm(imp,300);
}

// Helpers
function raf2(fn){requestAnimationFrame(function(){requestAnimationFrame(fn);})}
function rm(el,ms){setTimeout(function(){if(el&&el.parentNode)el.remove();},ms)}

function pvpSpawnProjectile(fromSide, targetKey, targetSide, color) {
    // Legacy - now handled by pvpSpawnAttackVisual
}

function startPvpTimers() {
    if (!pvpBattleState) return;

    // Clear any old timers
    clearAllPvpTimers();

    // Set up attack timers for each unit
    
    function processPvpAttack(unit, teamSide, targetsArray, enemyTeamArray) {
        if (!pvpBattleState || pvpBattleState.finished || !unit.alive) return;
        var pType = characters[unit.key] ? characters[unit.key].passiveType : null;
        var pvpTimeElapsed = 120 - pvpBattleState.timeLeft;

        // Determine targets based on passive
        var targets = targetsArray;
        if ((pType === 'backlineSpeed' || pType === 'backlineCrit' || pType === 'jumpCrit') && targetsArray.length > 0) {
            var backliners = targetsArray.filter(t => characters[t.key] && characters[t.key].lane === 'back');
            if (backliners.length > 0) targets = backliners;
        }

        if (targets.length === 0) return;
        
        var isAoe = (pType === 'critSplash' || pType === 'critAoe');
        // AOE BALANCE: limit AOE to max 3 targets, not the entire team
        var targetsToHit;
        if (isAoe) {
            var shuffled = targets.slice().sort(function() { return Math.random() - 0.5; });
            targetsToHit = shuffled.slice(0, Math.min(3, shuffled.length));
        } else {
            targetsToHit = [targets[Math.floor(Math.random() * targets.length)]];
        }

        targetsToHit.forEach(target => {
            if (!target.alive) return;

            // Defender passive logic
            var defType = characters[target.key] ? characters[target.key].passiveType : null;
            if (defType === 'immuneHits') {
                if (!target.hitsTaken) target.hitsTaken = 0;
                target.hitsTaken++;
                if (target.hitsTaken >= 3) {
                    target.hitsTaken = 0;
                    pvpSpawnBuffPopup(target.key, teamSide === 'p' ? 'e' : 'p', '🛡️ IMMUNE');
                    return; // Skip damage
                }
            }

            // PVP BALANCE: baseDmg is already level-scaled at team setup
            // Only use baseDmg directly — no double multiplication
            var dmg = unit.baseDmg;

            // RAJ TESLA TOWER: Ramping damage in PvP — tracks per target
            if (pType === 'sunRay') {
                if (!unit._rajStacks) unit._rajStacks = 0;
                if (!unit._rajTarget) unit._rajTarget = null;
                var targetId = target.key + '_' + (target === targetsToHit[0] ? '0' : '1');
                if (unit._rajTarget !== targetId) {
                    unit._rajStacks = 0;
                    unit._rajTarget = targetId;
                }
                unit._rajStacks = Math.min(15, unit._rajStacks + 1); // Max 15 stacks in PvP
                var pvpRampMulti = 1 + (unit._rajStacks * 0.12); // +12% per stack
                dmg = Math.floor(dmg * pvpRampMulti);
                // Show stack indicator every 3 stacks
                if (unit._rajStacks > 1 && unit._rajStacks % 3 === 0) {
                    pvpSpawnBuffPopup(unit.key, teamSide, '⚡x' + unit._rajStacks);
                }
            }

            // Apply skill tree crit bonus for player's team
            var steCrit = (typeof getSkillTreeEffects === 'function' && teamSide === 'p') ? (getSkillTreeEffects().critChance || 0) : 0;
            var isCrit = Math.random() < (0.10 + steCrit);

            // PVP BALANCE: Reduced crit rates for AOE characters
            if (pType === 'critSplash' || pType === 'critAoe') isCrit = Math.random() < 0.6; // 60% crit, not guaranteed
            if (pType === 'jumpCrit' && Math.random() < 0.4) isCrit = true; // Emily: 40% crit
            if (pType === 'backlineCrit' || pType === 'critTank') if (Math.random() < 0.35) isCrit = true; // 35%
            
            // PVP BALANCE: crit multiplier reduced from 2x to 1.5x
            if (isCrit) dmg = Math.floor(dmg * 1.5);

            // AOE BALANCE: secondary targets take only 35% damage (down from 50%)
            if (isAoe && targetsToHit.length > 1 && target !== targetsToHit[0]) dmg = Math.floor(dmg * 0.35);

            // PVP BALANCE: back-lane characters take 20% reduced damage (squishies get some protection)
            var targetLane = characters[target.key] ? characters[target.key].lane : 'mid';
            if (targetLane === 'back') dmg = Math.floor(dmg * 0.80);

            // PVP BALANCE: damage cap per hit = 40% of target's max HP (prevents 1-shot kills)
            var dmgCap = Math.floor(target.maxHp * 0.40);
            if (dmg > dmgCap) dmg = dmgCap;

            // Zack scaling tank logic (capped at 30% lifesteal, 15% maxHP per hit) — PLAYER ONLY
            if (pType === 'critTank' && isCrit && teamSide === 'p') {
                var zackLsPct = Math.min(0.15 + (pvpTimeElapsed / 150), 0.30);
                var healAmt = Math.floor(dmg * zackLsPct);
                var maxHealPerHit = Math.floor(unit.maxHp * 0.15);
                healAmt = Math.min(healAmt, maxHealPerHit);
                unit.hp = Math.min(unit.maxHp, unit.hp + healAmt);
                pvpSpawnHealPopup(unit.key, teamSide, healAmt);
                dmg = Math.floor(dmg * 0.6); // Less damage, more healing
            }

            // Deflect logic
            if (defType === 'deflectLoot') {
                var deflect = Math.floor(dmg * (characters[target.key].basePassiveAmount || 0.35));
                unit.hp -= deflect;
                pvpSpawnDmgPopup(unit.key, teamSide, deflect, false);
                // Psychoanalysis debuff: attacker deals 15% less damage for 3s
                if (!unit._bevDebuff) { unit._bevDebuff = true; unit.baseDmg = Math.floor(unit.baseDmg * 0.85); setTimeout(function() { unit.baseDmg = characters[unit.key] ? characters[unit.key].baseDmg : unit.baseDmg; unit._bevDebuff = false; }, 3000); }
            }

            // Apply skill tree damage reduction for defending player team
            if (teamSide === 'e' && typeof getSkillTreeEffects === 'function') {
                var steDefReduction = getSkillTreeEffects().dmgReduction || 0;
                if (steDefReduction > 0) dmg = Math.floor(dmg * (1 - steDefReduction));
            }

            target.hp -= dmg;

            pvpAttackEffect(unit.key, teamSide);
            pvpHitEffect(target.key, teamSide === 'p' ? 'e' : 'p');
            pvpSpawnDmgPopup(target.key, teamSide === 'p' ? 'e' : 'p', dmg, isCrit);
            pvpSpawnAttackVisual(unit.key, teamSide, target.key, teamSide === 'p' ? 'e' : 'p', isCrit);
            
            if (isCrit) { pvpCritBurst(target.key, teamSide === 'p' ? 'e' : 'p'); pvpScreenShake(); }

            // Lifesteal (capped at 30%, heal capped at 15% maxHP per hit) — PLAYER ONLY
            if (pType === 'lifesteal' && teamSide === 'p') {
                var lsPct = Math.min((characters[unit.key].basePassiveAmount || 0.2), 0.30);
                var ls = Math.floor(dmg * lsPct);
                var maxLsHeal = Math.floor(unit.maxHp * 0.15);
                ls = Math.min(ls, maxLsHeal);
                unit.hp = Math.min(unit.maxHp, unit.hp + ls);
                pvpSpawnHealPopup(unit.key, teamSide, ls);
            }

            // DOTs
            if (pType === 'sunRay') {
                // Raj Tesla: ramped DOT tick (smaller in PvP)
                pvpSpawnBuffPopup(target.key, teamSide === 'p' ? 'e' : 'p', '⚡ CHARGE');
                target.hp -= Math.floor(dmg * 0.10);
            } else if (pType === 'poisonAoe') {
                // Amy poison: flat DOT
                pvpSpawnBuffPopup(target.key, teamSide === 'p' ? 'e' : 'p', '☠️ DOT');
                target.hp -= Math.floor(dmg * 0.15);
            }

            // Slow / Stun
            if (pType === 'slowStun' && Math.random() < 0.2) {
                pvpSpawnBuffPopup(target.key, teamSide === 'p' ? 'e' : 'p', '⚡ STUN');
                // Stun: skip target's next attack by delaying their timer
                var stunSide = teamSide === 'p' ? 'e' : 'p';
                var stunIdx = (stunSide === 'p' ? pvpBattleState.playerTeam : pvpBattleState.enemyTeam).indexOf(target);
                var stunKey = stunSide + '_' + stunIdx;
                if (pvpTimers[stunKey]) { clearTimeout(pvpTimers[stunKey]); pvpTimers[stunKey] = setTimeout(function() {}, 1500); }
            }

            if (target.hp <= 0) {
                target.hp = 0; target.alive = false; 
                pvpDeathEffect(target.key, teamSide === 'p' ? 'e' : 'p'); 
                pvpShowKillBanner(unit.key, target.key, teamSide); 
                pvpScreenShake();
            }
        });

        // Healing — PLAYER ONLY (enemy units don't heal)
        if ((pType === 'healScaling' || pType === 'healLoot' || pType === 'selfHeal') && teamSide === 'p') {
            var myTeam = teamSide === 'p' ? pvpBattleState.playerTeam : pvpBattleState.enemyTeam;
            var injured = myTeam.filter(u => u.alive && u.hp < u.maxHp);
            if (injured.length > 0) {
                var healAmt = Math.floor(unit.baseDmg * unit.level * 0.5) || 50;
                // Bernie: % max HP heal + scaling over time
                if (pType === 'healScaling') {
                    var hPct = (characters[unit.key] && characters[unit.key].healPctMaxHp) || 0.12;
                    injured.forEach(function(ally) {
                        if (ally.hp < ally.maxHp) {
                            var hAmt = Math.floor(ally.maxHp * hPct * Math.min(1.5, 1 + (pvpTimeElapsed / 90)));
                            ally.hp = Math.min(ally.maxHp, ally.hp + hAmt);
                            pvpSpawnHealPopup(ally.key, teamSide, hAmt);
                        }
                    });
                } else {
                    var healTarget = injured[Math.floor(Math.random() * injured.length)];
                    if (pType === 'selfHeal') {
                        healTarget = unit;
                        // NERFED: Leonard heals 5% of his maxHP (not baseDmg*level scaling)
                        healAmt = Math.min(Math.floor(unit.maxHp * 0.05), Math.floor(unit.maxHp * 0.08));
                    }
                    if (pType === 'healLoot' && characters[unit.key] && characters[unit.key].healPctMaxHp) {
                        // Mary: % max HP heal to all injured allies
                        injured.forEach(function(ally) {
                            var mHeal = Math.floor(ally.maxHp * characters[unit.key].healPctMaxHp);
                            ally.hp = Math.min(ally.maxHp, ally.hp + mHeal);
                            pvpSpawnHealPopup(ally.key, teamSide, mHeal);
                        });
                    } else if (healTarget.hp < healTarget.maxHp) {
                        healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + healAmt);
                        pvpSpawnHealPopup(healTarget.key, teamSide, healAmt);
                    }
                }
            }
        }

        // Penny Rage: boost team attack speed temporarily
        if (pType === 'rage') {
            var myTeamRage = teamSide === 'p' ? pvpBattleState.playerTeam : pvpBattleState.enemyTeam;
            myTeamRage.forEach(function(ally) {
                if (ally.alive && !ally._rageBuffed) {
                    ally._rageBuffed = true;
                    ally.atkSpeed = Math.floor(ally.atkSpeed * 0.7); // 30% faster
                    pvpSpawnBuffPopup(ally.key, teamSide, '🔥 RAGE');
                    setTimeout(function() {
                        ally.atkSpeed = Math.floor(ally.atkSpeed / 0.7);
                        ally._rageBuffed = false;
                    }, 5000);
                }
            });
        }

        // Denise Summon Droids: extra hits + stun chance
        if (pType === 'summonDroid') {
            var droidTargets = getAliveTargets(teamSide === 'p' ? pvpBattleState.enemyTeam : pvpBattleState.playerTeam);
            if (droidTargets.length > 0) {
                var droidCount = (characters[unit.key] && characters[unit.key].basePassiveAmount) || 2;
                for (var dri = 0; dri < droidCount; dri++) {
                    var dTarget = droidTargets[Math.floor(Math.random() * droidTargets.length)];
                    if (dTarget && dTarget.alive) {
                        var dDmg = Math.floor(unit.baseDmg * 0.5);
                        var dCap = Math.floor(dTarget.maxHp * 0.15);
                        dDmg = Math.min(dDmg, dCap);
                        dTarget.hp -= dDmg;
                        pvpSpawnDmgPopup(dTarget.key, teamSide === 'p' ? 'e' : 'p', dDmg, false);
                        if (dTarget.hp <= 0) { dTarget.hp = 0; dTarget.alive = false; pvpDeathEffect(dTarget.key, teamSide === 'p' ? 'e' : 'p'); }
                    }
                }
                // 25% stun chance per droid attack
                if (Math.random() < 0.25 && droidTargets.length > 0) {
                    var stunTarget = droidTargets[Math.floor(Math.random() * droidTargets.length)];
                    if (stunTarget && stunTarget.alive) {
                        pvpSpawnBuffPopup(stunTarget.key, teamSide === 'p' ? 'e' : 'p', '🤖 STUN');
                        var dSide = teamSide === 'p' ? 'e' : 'p';
                        var dIdx = (dSide === 'p' ? pvpBattleState.playerTeam : pvpBattleState.enemyTeam).indexOf(stunTarget);
                        if (pvpTimers[dSide + '_' + dIdx]) { clearTimeout(pvpTimers[dSide + '_' + dIdx]); pvpTimers[dSide + '_' + dIdx] = setTimeout(function() {}, 1500); }
                    }
                }
            }
        }
        
        // Throttle display update: batch rapid attacks into a single UI refresh
        if (!processPvpAttack._pendingUpdate) {
            processPvpAttack._pendingUpdate = true;
            setTimeout(function() { processPvpAttack._pendingUpdate = false; updatePvpTeamDisplay(); }, 200);
        }
        checkPvpBattleEnd();
    }

    pvpBattleState.playerTeam.forEach(function(unit, idx) {
        if (!unit.alive) return;
        var pType = characters[unit.key] ? characters[unit.key].passiveType : null;
        var rate = unit.atkSpeed;
        if (pType === 'backlineCrit') rate *= 1.5;
        
        var currentRate = rate / pvpBattleState.speedMult;

        function runPvpPlayerAttack() {
            if (!pvpBattleState || pvpBattleState.finished || !unit.alive) return;
            var pvpTimeElapsed = 120 - pvpBattleState.timeLeft;
            var currentRate = rate / pvpBattleState.speedMult;
            if (pType === 'backlineSpeed') currentRate = currentRate / Math.min(2, 1 + (pvpTimeElapsed / 60)); // Capped at 2x speed

            processPvpAttack(unit, 'p', getAliveTargets(pvpBattleState.enemyTeam), pvpBattleState.playerTeam);
            pvpTimers['p_' + idx] = setTimeout(runPvpPlayerAttack, currentRate);
        }
        pvpTimers['p_' + idx] = setTimeout(runPvpPlayerAttack, currentRate);
    });

    pvpBattleState.enemyTeam.forEach(function(unit, idx) {
        if (!unit.alive) return;
        var pType = characters[unit.key] ? characters[unit.key].passiveType : null;
        var rate = unit.atkSpeed;
        if (pType === 'backlineCrit') rate *= 1.5;
        
        var currentRate = rate / pvpBattleState.speedMult;

        function runPvpEnemyAttack() {
            if (!pvpBattleState || pvpBattleState.finished || !unit.alive) return;
            var pvpTimeElapsed = 120 - pvpBattleState.timeLeft;
            var currentRate = rate / pvpBattleState.speedMult;
            if (pType === 'backlineSpeed') currentRate = currentRate / Math.min(2, 1 + (pvpTimeElapsed / 60)); // Capped at 2x speed

            processPvpAttack(unit, 'e', getAliveTargets(pvpBattleState.playerTeam), pvpBattleState.enemyTeam);
            pvpTimers['e_' + idx] = setTimeout(runPvpEnemyAttack, currentRate);
        }
        pvpTimers['e_' + idx] = setTimeout(runPvpEnemyAttack, currentRate);
    });

    pvpMainTimer = setInterval(function() {
        if (!pvpBattleState || pvpBattleState.finished) return;
        pvpBattleState.timeLeft -= 0.25;
        
        // Speed up at 30s
        if (pvpBattleState.timeLeft <= 30 && pvpBattleState.speedMult === 1) {
            pvpBattleState.speedMult = 2;
            var badge = document.getElementById('pvp-speed-badge');
            if (badge) { badge.innerText = '⚡ 2X'; badge.style.color = '#fbbf24'; badge.style.borderColor = '#f59e0b'; }
            // Restart timers at 2x speed
            clearAllPvpTimers(true);
            startPvpTimers();
            return;
        }

        // Timer display
        var timerText = document.getElementById('pvp-timer-text');
        var timerBar = document.getElementById('pvp-timer-bar');
        if (timerText) timerText.innerText = Math.max(0, pvpBattleState.timeLeft).toFixed(1) + 's';
        if (timerBar) {
            var pct = (pvpBattleState.timeLeft / 60) * 100;
            timerBar.style.width = pct + '%';
            if (pct > 50) timerBar.style.background = 'linear-gradient(90deg,#22c55e,#4ade80)';
            else if (pct > 25) timerBar.style.background = 'linear-gradient(90deg,#eab308,#facc15)';
            else timerBar.style.background = 'linear-gradient(90deg,#dc2626,#f87171)';
        }

        // Time's up — start health drain
        if (pvpBattleState.timeLeft <= 0 && !pvpBattleState.draining) {
            pvpBattleState.draining = true;
            pvpBattleState.timeLeft = 0;
            var warn = document.getElementById('pvp-drain-warning');
            if (warn) warn.style.display = 'block';
        }

        // Health drain mode
        if (pvpBattleState.draining) {
            var drainAmt = 0.125; // 12.5% per tick at 250ms interval (same drain rate as before)
            pvpBattleState.playerTeam.forEach(function(u) {
                if (u.alive) {
                    u.hp -= u.maxHp * drainAmt;
                    if (u.hp <= 0) { u.hp = 0; u.alive = false; }
                }
            });
            pvpBattleState.enemyTeam.forEach(function(u) {
                if (u.alive) {
                    u.hp -= u.maxHp * drainAmt;
                    if (u.hp <= 0) { u.hp = 0; u.alive = false; }
                }
            });
            updatePvpTeamDisplay();
            checkPvpBattleEnd();
        }
    }, 250);
}

function clearAllPvpTimers(keepMain) {
    for (var k in pvpTimers) {
        clearInterval(pvpTimers[k]);
    }
    pvpTimers = {};
    if (!keepMain && pvpMainTimer) {
        clearInterval(pvpMainTimer);
        pvpMainTimer = null;
    }
    // Clear batched UI timer
    if (_pvpDisplayTimer) { clearTimeout(_pvpDisplayTimer); _pvpDisplayTimer = null; _pvpDisplayDirty = false; }
}

function checkPvpBattleEnd() {
    if (!pvpBattleState || pvpBattleState.finished) return;

    var playerAlive = pvpBattleState.playerTeam.some(function(u) { return u.alive; });
    var enemyAlive = pvpBattleState.enemyTeam.some(function(u) { return u.alive; });

    if (!playerAlive && !enemyAlive) {
        // Draw — but player loses (defender advantage)
        endPvpBattle(false);
    } else if (!enemyAlive) {
        endPvpBattle(true);
    } else if (!playerAlive) {
        endPvpBattle(false);
    }
}

// ============================================================
// END BATTLE + WIN/LOSS MODALS
// ============================================================
function endPvpBattle(won) {
    if (!pvpBattleState) return;
    pvpBattleState.finished = true;
    clearAllPvpTimers();
    if (typeof pvpEmberTimer !== 'undefined') { clearInterval(pvpEmberTimer); pvpEmberTimer = undefined; }

    // REPLAY MODE: skip all trophy/stat changes, show result then return to defense log
    if (pvpBattleState.isReplay) {
        setTimeout(function() {
            var screen = document.getElementById('pvp-battle-screen');
            if (screen) screen.remove();
            // Show quick replay result
            var resultOverlay = document.createElement('div');
            resultOverlay.id = 'pvp-result-modal';
            resultOverlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.9);padding:16px;';
            var replayWon = pvpBattleState.replayResult; // attacker_won from log
            var defended = !replayWon;
            var tChange = pvpBattleState.replayTrophyChange || 0;
            resultOverlay.innerHTML = '<div style="text-align:center;max-width:380px;width:90%;box-sizing:border-box;max-height:90vh;overflow-y:auto;">' +
                '<div style="background:linear-gradient(135deg,' + (defended ? '#0a1628,#1a2d4a' : '#1a0a0a,#2d1010') + ');border:3px solid ' + (defended ? '#10b981' : '#dc2626') + ';border-radius:20px;padding:32px 24px;box-sizing:border-box;box-shadow:0 0 40px ' + (defended ? 'rgba(16,185,129,0.3)' : 'rgba(220,38,38,0.3)') + ';">' +
                    '<div style="font-size:10px;font-weight:900;color:#a855f7;letter-spacing:3px;margin-bottom:8px;">⏪ REPLAY RESULT</div>' +
                    '<div style="font-size:48px;margin:12px 0;">' + (defended ? '🛡️' : '💀') + '</div>' +
                    '<div style="font-size:16px;font-weight:900;color:' + (defended ? '#4ade80' : '#ef4444') + ';letter-spacing:3px;">' + (defended ? 'DEFENSE SUCCESS!' : 'DEFENSE FAILED') + '</div>' +
                    '<div style="font-size:12px;color:#94a3b8;margin-top:8px;">' + (pvpBattleState.replayAttackerName || 'Unknown') + ' attacked your base</div>' +
                    '<div style="font-size:24px;font-weight:900;color:' + (tChange >= 0 ? '#4ade80' : '#ef4444') + ';margin-top:12px;">' + (tChange >= 0 ? '+' : '') + tChange + ' \uD83C\uDFC6</div>' +
                    '<button onclick="document.getElementById(\'pvp-result-modal\').remove();showDefenseLog();" style="margin-top:20px;background:linear-gradient(135deg,#7c3aed,#a855f7);color:white;font-weight:900;font-size:12px;padding:12px 28px;box-sizing:border-box;border:2px solid #8b5cf6;border-radius:8px;cursor:pointer;letter-spacing:2px;">BACK TO LOG</button>' +
                '</div></div>';
            document.body.appendChild(resultOverlay);
        }, 800);
        return;
    }

    var isFriendly = pvpBattleState.opponent.isFriendly === true;
    var trophyChange = isFriendly ? 0 : (won ? (25 + Math.floor(Math.random() * 16)) : -(5 + Math.floor(Math.random() * 6)));
    var lootReward = {};
    
    if (won) {
        if (!isFriendly) {
            state.pvp.wins++;
            if (typeof trackStat === 'function') { trackStat('pvpWins', 1); trackStat('trophies', state.pvp.trophies + trophyChange); }
            if (typeof updateQuestProgress === 'function') { updateQuestProgress('win_pvp', 1); updateQuestProgress('win_pvp_5', 1); }
            state.pvp.trophies += trophyChange;
            // Loot rewards
            lootReward = {
                money: 500 + Math.floor(Math.random() * 500),
                stone: 5 + Math.floor(Math.random() * 10),
                iron: 3 + Math.floor(Math.random() * 5),
                scrap: 2 + Math.floor(Math.random() * 5)
            };
            if (Math.random() < 0.3) lootReward.gold = 1 + Math.floor(Math.random() * 3);
            if (Math.random() < 0.1) lootReward.diamond = 1;
            
            for (var res in lootReward) { state.resources[res] = (state.resources[res] || 0) + lootReward[res]; }
        }
    } else {
        if (!isFriendly) {
            state.pvp.losses++;
            if (typeof trackStat === 'function') trackStat('pvpLosses', 1);
            state.pvp.trophies = Math.max(0, state.pvp.trophies + trophyChange);
        }
    }

    // Update league
    state.pvp.league = getPvpLeague(state.pvp.trophies).name;
    saveProgress();

    // Log defense for the opponent (so they see "you were attacked")
    if (!isFriendly && pvpBattleState.opponent) {
        logPvpDefense(pvpBattleState.opponent, pvpBattleState.playerTeam, pvpBattleState.enemyTeam, won, trophyChange);
    }

    // Record in battle log
    if (typeof recordBattle === 'function') {
        var oppName = pvpBattleState.opponent ? pvpBattleState.opponent.name : 'Unknown';
        recordBattle('pvp', won ? 'victory' : 'defeat', { enemy: oppName, trophies: trophyChange });
    }

    // Delay to show result
    setTimeout(function() { showPvpResultModal(won, trophyChange, lootReward); }, 800);
}

function showPvpResultModal(won, trophyChange, lootReward) {
    var screen = document.getElementById('pvp-battle-screen');
    if (screen) screen.remove();

    var overlay = document.createElement('div');
    overlay.id = 'pvp-result-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.9);padding:16px;';

    // Add CSS animations
    if (!document.getElementById('pvp-result-styles')) {
        var style = document.createElement('style');
        style.id = 'pvp-result-styles';
        style.textContent = 
            '@keyframes pvpTrophyFloat{0%{transform:scale(0) rotate(-20deg);opacity:0;}50%{transform:scale(1.3) rotate(5deg);}100%{transform:scale(1) rotate(0);opacity:1;}}' +
            '@keyframes pvpTrophySpin{0%{transform:rotateY(0);}100%{transform:rotateY(360deg);}}' +
            '@keyframes pvpLossDrop{0%{transform:translateY(-50px) scale(1.2);opacity:0;}100%{transform:translateY(0) scale(1);opacity:1;}}' +
            '@keyframes pvpShine{0%,100%{opacity:0.3;}50%{opacity:1;}}' +
            '@keyframes pvpConfetti{0%{transform:translateY(0) rotate(0);opacity:1;}100%{transform:translateY(100px) rotate(720deg);opacity:0;}}';
        document.head.appendChild(style);
    }

    var lootHtml = '';
    if (won && lootReward) {
        var resIcons = { money: '💰', stone: '🪨', iron: '⛏️', gold: '🥇', diamond: '💎', scrap: '🔩' };
        lootHtml = '<div style="margin-top:16px;background:rgba(0,0,0,0.4);border:1px solid #334155;border-radius:8px;padding:12px;"><div style="font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">⭐ BATTLE LOOT</div><div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">';
        for (var res in lootReward) {
            lootHtml += '<div style="background:rgba(234,179,8,0.1);border:1px solid #92400e;border-radius:6px;padding:6px 10px;box-sizing:border-box;text-align:center;"><div style="font-size:14px;">' + (resIcons[res] || '📦') + '</div><div style="font-size:10px;color:#fbbf24;font-weight:bold;">+' + lootReward[res] + '</div></div>';
        }
        lootHtml += '</div></div>';
    }

    var league = getPvpLeague(state.pvp.trophies);

    var isFriendly = pvpBattleState && pvpBattleState.opponent && pvpBattleState.opponent.isFriendly;

    if (won) {
        overlay.innerHTML = 
        '<div style="text-align:center;animation:pvpTrophyFloat 0.6s cubic-bezier(0.175,0.885,0.32,1.275);max-width:380px;width:90%;box-sizing:border-box;max-height:90vh;overflow-y:auto;">' +
            '<div style="background:linear-gradient(135deg,#0a1628,#1a2d4a,#0a1628);border:3px solid #fbbf24;border-radius:20px;padding:32px 24px;box-sizing:border-box;box-shadow:0 0 60px rgba(251,191,36,0.4),inset 0 0 30px rgba(251,191,36,0.1);position:relative;overflow:hidden;">' +
                '<div style="position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,rgba(255,215,0,0.15) 0%,transparent 50%),radial-gradient(circle at 70% 80%,rgba(255,215,0,0.1) 0%,transparent 50%);pointer-events:none;"></div>' +
                '<div style="font-size:14px;font-weight:900;color:#4ade80;letter-spacing:4px;text-transform:uppercase;margin-bottom:12px;animation:pvpShine 1s infinite;">' + (isFriendly ? '🤝 FRIENDLY WIN 🤝' : '🎉 VICTORY! 🎉') + '</div>' +
                '<div style="font-size:72px;animation:pvpTrophySpin 2s ease-in-out;">' + (isFriendly ? '🥊' : '🏆') + '</div>' +
                (isFriendly ? '<div style="font-size:14px;color:#94a3b8;margin-top:16px;">Good practice match!</div>' : 
                '<div style="font-size:28px;font-weight:900;color:#fbbf24;margin-top:12px;text-shadow:0 0 20px rgba(251,191,36,0.5);">+' + trophyChange + ' TROPHIES</div>' +
                '<div style="font-size:12px;color:#94a3b8;margin-top:8px;">' + league.icon + ' ' + league.name + ' League — ' + state.pvp.trophies + ' 🏆</div>' + lootHtml) +
                '<button onclick="document.getElementById(\'pvp-result-modal\').remove();openPvpHub();" style="margin-top:20px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;font-weight:900;font-size:13px;padding:12px 32px;box-sizing:border-box;border:2px solid #fbbf24;border-radius:8px;cursor:pointer;letter-spacing:2px;text-transform:uppercase;">CONTINUE</button>' +
            '</div>' +
        '</div>';
    } else {
        overlay.innerHTML = 
        '<div style="text-align:center;animation:pvpLossDrop 0.5s ease-out;max-width:380px;width:90%;box-sizing:border-box;max-height:90vh;overflow-y:auto;">' +
            '<div style="background:linear-gradient(135deg,#1a0a0a,#2d1010,#1a0a0a);border:3px solid #dc2626;border-radius:20px;padding:32px 24px;box-sizing:border-box;box-shadow:0 0 40px rgba(220,38,38,0.3);position:relative;">' +
                '<div style="font-size:14px;font-weight:900;color:#ef4444;letter-spacing:4px;text-transform:uppercase;margin-bottom:12px;">' + (isFriendly ? '🤝 FRIENDLY LOSS 🤝' : '💀 DEFEAT 💀') + '</div>' +
                '<div style="font-size:60px;opacity:0.6;">' + (isFriendly ? '🥊' : '😞') + '</div>' +
                (isFriendly ? '<div style="font-size:14px;color:#94a3b8;margin-top:16px;">Better luck next time!</div>' : 
                '<div style="font-size:24px;font-weight:900;color:#ef4444;margin-top:12px;">' + trophyChange + ' TROPHIES</div>' +
                '<div style="font-size:12px;color:#94a3b8;margin-top:8px;">' + league.icon + ' ' + league.name + ' League — ' + state.pvp.trophies + ' 🏆</div>') +
                '<div style="font-size:10px;color:#64748b;margin-top:12px;">Upgrade your team and try again!</div>' +
                '<button onclick="document.getElementById(\'pvp-result-modal\').remove();openPvpHub();" style="margin-top:20px;background:#1e293b;color:#94a3b8;font-weight:900;font-size:13px;padding:12px 32px;box-sizing:border-box;border:2px solid #334155;border-radius:8px;cursor:pointer;letter-spacing:2px;text-transform:uppercase;">CONTINUE</button>' +
            '</div>' +
        '</div>';
    }

    document.body.appendChild(overlay);
}

// ============================================================
// PVP DEFENSE LOG — Clash of Clans style attack history
// ============================================================

// Log a defense entry for the opponent we just attacked
async function logPvpDefense(opponent, playerTeam, enemyTeam, attackerWon, trophyChange) {
    if (typeof supabase === 'undefined' || !supabase) return;
    if (!opponent) return;
    
    // The defender is the opponent we attacked
    var defenderId = opponent.id || null;
    if (!defenderId) return; // Skip fallback/generated opponents
    
    // Build compact team snapshots for the log
    var attackerTeamLog = [];
    playerTeam.forEach(function(u) {
        attackerTeamLog.push({ type: u.type, key: u.key, level: u.level, skin: u.skin || 'default', lane: u.lane || 'mid' });
    });
    var defenderTeamLog = [];
    enemyTeam.forEach(function(u) {
        defenderTeamLog.push({ type: u.type, key: u.key, level: u.level, skin: u.skin || 'default', lane: u.lane || 'mid' });
    });
    
    // Trophy change for the DEFENDER is the inverse
    var defenderTrophyChange = attackerWon ? -(5 + Math.floor(Math.random() * 6)) : (10 + Math.floor(Math.random() * 11));
    
    var attackerName = (typeof currentUser !== 'undefined' && currentUser) ? (currentUser.username || 'Unknown') : 'Unknown';
    var attackerId = (typeof currentUser !== 'undefined' && currentUser) ? currentUser.id : null;
    
    try {
        await supabase.from('pvp_defense_log').insert({
            defender_id: defenderId,
            attacker_id: attackerId,
            attacker_name: attackerName,
            attacker_team: attackerTeamLog,
            defender_team: defenderTeamLog,
            attacker_won: attackerWon,
            trophy_change: defenderTrophyChange
        });
        console.log('[PVP] Defense log entry created for defender:', defenderId);
    } catch(e) {
        console.warn('[PVP] Failed to log defense:', e);
    }
}

// Fetch defense log entries for current user
async function fetchDefenseLog(limit) {
    if (typeof supabase === 'undefined' || !supabase) return [];
    if (typeof currentUser === 'undefined' || !currentUser) return [];
    limit = limit || 20;
    
    try {
        var { data, error } = await supabase
            .from('pvp_defense_log')
            .select('*')
            .eq('defender_id', currentUser.id)
            .order('created_at', { ascending: false })
            .limit(limit);
        
        if (error) { console.warn('[PVP] Defense log fetch error:', error); return []; }
        return data || [];
    } catch(e) {
        console.warn('[PVP] Defense log fetch failed:', e);
        return [];
    }
}

// Show Defense Log modal (Clash of Clans style)
async function showDefenseLog() {
    var existing = document.getElementById('pvp-defense-log-modal');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'pvp-defense-log-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10001;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.92);padding:8px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

    // Loading state
    overlay.innerHTML = '<div style="text-align:center;"><div style="font-size:24px;margin-bottom:12px;">⚔️</div><div style="color:#f87171;font-size:14px;font-weight:900;letter-spacing:2px;animation:pulse 1.5s infinite;">LOADING DEFENSE LOG...</div></div>';
    document.body.appendChild(overlay);

    var logs = await fetchDefenseLog(20);
    
    var logsHtml = '';
    if (!logs || logs.length === 0) {
        logsHtml = '<div style="text-align:center;padding:40px 20px;box-sizing:border-box;">' +
            '<div style="font-size:48px;opacity:0.3;margin-bottom:12px;">🛡️</div>' +
            '<div style="color:#64748b;font-size:12px;font-weight:bold;">No attacks yet!</div>' +
            '<div style="color:#475569;font-size:10px;margin-top:4px;">When other players attack your base, it will show up here.</div>' +
            '</div>';
    } else {
        logs.forEach(function(log, idx) {
            var defended = !log.attacker_won; // If attacker lost, we successfully defended
            var trophy = log.trophy_change || 0;
            var trophyColor = trophy >= 0 ? '#4ade80' : '#ef4444';
            var trophySign = trophy >= 0 ? '+' : '';
            var resultBadge = defended
                ? '<div style="background:linear-gradient(135deg,#065f46,#047857);color:#34d399;font-weight:900;font-size:8px;padding:3px 8px;box-sizing:border-box;border-radius:4px;letter-spacing:1px;border:1px solid #10b981;">DEFENDED</div>'
                : '<div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);color:#fca5a5;font-weight:900;font-size:8px;padding:3px 8px;box-sizing:border-box;border-radius:4px;letter-spacing:1px;border:1px solid #dc2626;">DEFEATED</div>';
            
            var timeAgo = '';
            if (log.created_at) {
                var diff = Date.now() - new Date(log.created_at).getTime();
                var mins = Math.floor(diff / 60000);
                var hrs = Math.floor(diff / 3600000);
                var days = Math.floor(diff / 86400000);
                if (days > 0) timeAgo = days + 'd ago';
                else if (hrs > 0) timeAgo = hrs + 'h ago';
                else if (mins > 0) timeAgo = mins + 'm ago';
                else timeAgo = 'just now';
            }
            
            // Attacker team preview
            var attackerPreview = '';
            if (log.attacker_team && Array.isArray(log.attacker_team)) {
                log.attacker_team.forEach(function(u) {
                    var svg = '';
                    if (u.type === 'char' && typeof getVectorFrame === 'function') {
                        if (typeof getVectorFrameForSkin === 'function') {
                            var raw = getVectorFrameForSkin(u.key, u.skin || 'default');
                            svg = typeof raw === 'string' ? raw : (raw.idle || '');
                        } else {
                            svg = getVectorFrame(u.key, false);
                        }
                    }
                    attackerPreview += '<div style="width:24px;height:28px;border:1px solid ' + (u.type === 'char' ? '#ef4444' : '#06b6d4') + ';border-radius:3px;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;overflow:hidden;">' + (svg || (u.type === 'bot' ? '<span style="font-size:10px;">🤖</span>' : '<span style="font-size:10px;">❓</span>')) + '</div>';
                });
            }
            
            var borderColor = defended ? '#065f4680' : '#7f1d1d80';
            var bgGrad = defended ? 'linear-gradient(135deg, rgba(6,95,70,0.15), rgba(0,0,0,0.3))' : 'linear-gradient(135deg, rgba(127,29,29,0.15), rgba(0,0,0,0.3))';
            
            // Build log entry data attribute for replay
            var logDataStr = idx.toString();
            
            logsHtml += '<div style="background:' + bgGrad + ';border:1px solid ' + borderColor + ';border-radius:10px;padding:10px 12px;box-sizing:border-box;margin-bottom:6px;transition:all 0.2s;" onmouseenter="this.style.transform=\'scale(1.01)\';this.style.borderColor=\'' + (defended ? '#10b981' : '#dc2626') + '\'" onmouseleave="this.style.transform=\'scale(1)\';this.style.borderColor=\'' + borderColor + '\'">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                    '<div style="display:flex;align-items:center;gap:8px;">' +
                        '<div style="font-size:16px;">' + (defended ? '🛡️' : '💀') + '</div>' +
                        '<div>' +
                            '<div style="font-size:11px;font-weight:900;color:#e2e8f0;">' + (log.attacker_name || 'Unknown') + '</div>' +
                            '<div style="font-size:7px;color:#64748b;">' + timeAgo + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div style="display:flex;align-items:center;gap:6px;">' +
                        resultBadge +
                        '<div style="font-size:12px;font-weight:900;color:' + trophyColor + ';">' + trophySign + trophy + ' 🏆</div>' +
                    '</div>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                    '<div style="display:flex;gap:2px;">' + attackerPreview + '</div>' +
                    '<button onclick="startPvpReplay(' + idx + ')" style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:white;font-weight:900;font-size:9px;padding:5px 12px;box-sizing:border-box;border:1px solid #8b5cf6;border-radius:6px;cursor:pointer;letter-spacing:1px;display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">▶</span> REPLAY</button>' +
                '</div>' +
            '</div>';
        });
    }

    overlay.innerHTML = '<div style="background:linear-gradient(135deg,#0a0a1a,#1a0a2a,#0a0a1a);border:2px solid #7c3aed;border-radius:16px;max-width:440px;width:95%;box-sizing:border-box;max-height:90vh;overflow-y:auto;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 0 60px rgba(124,58,237,0.3);position:relative;overflow:hidden;">' +
        // Decorative top glow
        '<div style="position:absolute;top:0;left:0;right:0;height:80px;background:linear-gradient(180deg, rgba(124,58,237,0.15), transparent);pointer-events:none;"></div>' +
        // Header
        '<div style="padding:16px 16px 12px;text-align:center;border-bottom:1px solid #7c3aed40;flex-shrink:0;position:relative;">' +
            '<button onclick="document.getElementById(\'pvp-defense-log-modal\').remove()" style="position:absolute;top:8px;right:12px;color:#64748b;font-size:18px;cursor:pointer;background:none;border:none;">\u00D7</button>' +
            '<div style="font-size:20px;margin-bottom:4px;">⚔️</div>' +
            '<div style="font-size:14px;font-weight:900;color:#a855f7;letter-spacing:3px;text-shadow:0 0 20px rgba(168,85,247,0.5);">DEFENSE LOG</div>' +
            '<div style="font-size:8px;color:#64748b;letter-spacing:2px;text-transform:uppercase;margin-top:2px;">Recent attacks on your base</div>' +
        '</div>' +
        // Scrollable log list
        '<div style="flex:1;overflow-y:auto;padding:10px 12px;box-sizing:border-box;min-height:0;">' + logsHtml + '</div>' +
        // Footer
        '<div style="padding:8px 12px;box-sizing:border-box;border-top:1px solid #7c3aed40;flex-shrink:0;text-align:center;">' +
            '<button onclick="document.getElementById(\'pvp-defense-log-modal\').remove();openPvpHub();" style="background:linear-gradient(135deg,#1e293b,#334155);color:#94a3b8;font-weight:900;font-size:10px;padding:8px 24px;box-sizing:border-box;border:1px solid #475569;border-radius:6px;cursor:pointer;letter-spacing:1px;">BACK TO PVP</button>' +
        '</div>' +
    '</div>';
    
    // Store log data globally for replay access
    window._pvpDefenseLogs = logs;
}

// Start a PVP Replay from defense log entry
function startPvpReplay(logIndex) {
    var logs = window._pvpDefenseLogs;
    if (!logs || !logs[logIndex]) {
        if (typeof showGameAlert === 'function') showGameAlert('Replay Error', 'Could not load replay data.');
        return;
    }
    
    var log = logs[logIndex];
    
    // Close defense log modal
    var defLogModal = document.getElementById('pvp-defense-log-modal');
    if (defLogModal) defLogModal.remove();
    var hubModal = document.getElementById('pvp-hub-modal');
    if (hubModal) hubModal.remove();
    
    // In the replay: the attacker attacks us (defender)
    // So: Player side = defender (us), Enemy side = attacker
    // But to make it feel like watching someone attack YOU:
    // Left side (player side) = attacker's team
    // Right side (enemy side) = your defense team
    
    var attackerTeam = [];
    if (log.attacker_team && Array.isArray(log.attacker_team)) {
        log.attacker_team.forEach(function(item) {
            if (item.type === 'char') {
                var cfg = characters[item.key];
                if (!cfg) return;
                var lvl = item.level || 1;
                var lane = item.lane || cfg.lane || 'mid';
                var maxHp = Math.floor(cfg.baseHp * (1 + (lvl - 1) * (lane === 'front' ? 1.5 : 1.0)));
                var pvpDmg = Math.floor(cfg.baseDmg * Math.pow(lvl, 1.15));
                attackerTeam.push({
                    type: 'char', key: item.key, name: cfg.name, lane: lane, skin: item.skin || 'default',
                    level: lvl, baseDmg: pvpDmg, atkSpeed: cfg.atkSpeed,
                    maxHp: maxHp, hp: maxHp, alive: true
                });
            } else if (item.type === 'bot' && typeof robots !== 'undefined') {
                var rCfg = robots[item.key];
                if (!rCfg) return;
                attackerTeam.push({
                    type: 'bot', key: item.key, name: rCfg.name, lane: item.lane || rCfg.lane || 'mid',
                    level: item.level || 1, baseDmg: rCfg.baseDmg, atkSpeed: rCfg.atkSpeed,
                    maxHp: 100 * (item.level || 1), hp: 100 * (item.level || 1), alive: true
                });
            }
        });
    }
    
    var defenderTeam = [];
    if (log.defender_team && Array.isArray(log.defender_team)) {
        log.defender_team.forEach(function(item) {
            if (item.type === 'char') {
                var cfg = characters[item.key];
                if (!cfg) return;
                var lvl = item.level || 1;
                var lane = item.lane || cfg.lane || 'mid';
                var maxHp = Math.floor(cfg.baseHp * (1 + (lvl - 1) * (lane === 'front' ? 1.5 : 1.0)));
                var pvpDmg = Math.floor(cfg.baseDmg * Math.pow(lvl, 1.15));
                defenderTeam.push({
                    type: 'char', key: item.key, name: cfg.name, lane: lane, skin: item.skin || 'default',
                    level: lvl, baseDmg: pvpDmg, atkSpeed: cfg.atkSpeed,
                    maxHp: maxHp, hp: maxHp, alive: true
                });
            } else if (item.type === 'bot' && typeof robots !== 'undefined') {
                var rCfg = robots[item.key];
                if (!rCfg) return;
                defenderTeam.push({
                    type: 'bot', key: item.key, name: rCfg.name, lane: item.lane || rCfg.lane || 'mid',
                    level: item.level || 1, baseDmg: rCfg.baseDmg, atkSpeed: rCfg.atkSpeed,
                    maxHp: 100 * (item.level || 1), hp: 100 * (item.level || 1), alive: true
                });
            }
        });
    }
    
    if (attackerTeam.length === 0 || defenderTeam.length === 0) {
        if (typeof showGameAlert === 'function') showGameAlert('Replay Error', 'Team data is incomplete for this replay.');
        return;
    }
    
    // Set up pvpBattleState in replay mode
    // Attacker is on the LEFT (player side), Defender (you) on the RIGHT (enemy side)
    pvpBattleState = {
        playerTeam: attackerTeam,
        enemyTeam: defenderTeam,
        opponent: { name: 'YOUR DEFENSE', trophies: state.pvp.trophies || 0, league: getPvpLeague(state.pvp.trophies || 0) },
        timeLeft: 60.0,
        speedMult: 2, // 2x speed for replays
        draining: false,
        finished: false,
        isReplay: true, // Flag to prevent trophy changes
        replayAttackerName: log.attacker_name || 'Unknown',
        replayResult: log.attacker_won, // true = attacker won (you lost defense)
        replayTrophyChange: log.trophy_change || 0
    };

    pvpKillCount = { p: 0, e: 0 };
    renderPvpBattleScreen();
    
    // Add REPLAY watermark
    var battleScreen = document.getElementById('pvp-battle-screen');
    if (battleScreen) {
        var watermark = document.createElement('div');
        watermark.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-15deg);font-size:48px;font-weight:900;color:rgba(168,85,247,0.12);letter-spacing:12px;pointer-events:none;z-index:100;text-transform:uppercase;white-space:nowrap;';
        watermark.textContent = '⏪ REPLAY';
        battleScreen.querySelector('div').appendChild(watermark);
        
        // Add replay info bar at top
        var replayBar = document.createElement('div');
        replayBar.style.cssText = 'position:absolute;top:0;left:0;right:0;background:linear-gradient(90deg,#7c3aed,#a855f7,#7c3aed);padding:4px 12px;box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;z-index:101;';
        replayBar.innerHTML = '<div style="font-size:9px;font-weight:900;color:white;letter-spacing:2px;">▶ REPLAY: ' + (log.attacker_name || 'Unknown') + ' attacked you</div>' +
            '<div style="font-size:9px;font-weight:900;color:' + (log.attacker_won ? '#fca5a5' : '#86efac') + ';">' + (log.attacker_won ? '💀 DEFEATED' : '🛡️ DEFENDED') + '</div>';
        battleScreen.querySelector('div').appendChild(replayBar);
    }
    
    pvpBattleIntro(function() {
        startPvpTimers();
        if (typeof pvpEmberTimer !== 'undefined') clearInterval(pvpEmberTimer);
        pvpEmberTimer = setInterval(pvpSpawnEmbers, 400);
    });
}

