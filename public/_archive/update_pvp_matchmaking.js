const fs = require('fs');

const filePath = 'c:/xampp/htdocs/tbbt-idle-game/public/pvp.js';
let txt = fs.readFileSync(filePath, 'utf8');

// 1. Rename generatePvpOpponents to generateFallbackOpponents
txt = txt.replace(/function generatePvpOpponents\(\)/, 'function generateFallbackOpponents()');

// 2. Add fetchPvpOpponentsFromDB
const fetchOpponentsFunc = `
async function fetchPvpOpponentsFromDB() {
    if (typeof supabase === 'undefined' || !supabase) return [];
    
    try {
        var myTrophies = state.pvp.trophies || 0;
        
        // Fetch players near trophy range
        var { data, error } = await supabase
            .from('leaderboard')
            .select('id, username, trophies, lineup, robots')
            .neq('id', currentUser ? currentUser.id : 'guest')
            .limit(20);
            
        if (error || !data || data.length === 0) return [];
        
        // Filter players who actually have a lineup
        var validPlayers = data.filter(function(p) {
            return p.lineup && Array.isArray(p.lineup) && p.lineup.length > 0;
        });
        
        if (validPlayers.length === 0) return [];
        
        // Shuffle
        validPlayers.sort(function() { return 0.5 - Math.random(); });
        
        // Pick up to 3
        var selected = validPlayers.slice(0, 3);
        
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
`;

// 3. Replace openPvpMatchmaking
const regexMatchmaking = /function openPvpMatchmaking\(\) \{[\s\S]*?(?=function startPvpBattle\()/;

const newMatchmaking = `async function openPvpMatchmaking() {
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
                '<div style="width:36px;height:42px;border:1px solid ' + borderCol + ';border-radius:6px;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;overflow:hidden;">' + (svg || (t.type === 'bot' ? '<span style="font-size:16px;">\u{1F916}</span>' : '<span style="font-size:16px;">\u2753</span>')) + '</div>' +
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

        cardsHtml += '<div style="background:linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,10,30,0.8));border:2px solid ' + opp.league.color + '40;border-radius:16px;padding:14px;margin-bottom:10px;position:relative;overflow:hidden;transition:all 0.3s;" onmouseenter="this.style.borderColor=\\'' + opp.league.color + '\\';this.style.boxShadow=\\'0 0 25px ' + opp.league.color + '33\\';this.style.transform=\\'scale(1.01)\\'" onmouseleave="this.style.borderColor=\\'' + opp.league.color + '40\\';this.style.boxShadow=\\'none\\';this.style.transform=\\'scale(1)\\'">' +
            // Gradient accent bar top
            '<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg, transparent, ' + opp.league.color + ', transparent);opacity:0.5;"></div>' +
            // Header row
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">' +
                '<div>' +
                    '<div style="font-size:14px;font-weight:900;color:white;letter-spacing:0.5px;text-shadow:0 0 10px rgba(255,255,255,0.1);">' + opp.name + '</div>' +
                    '<div style="display:flex;align-items:center;gap:4px;margin-top:2px;">' +
                        '<span style="font-size:7px;color:' + opp.league.color + ';font-weight:900;text-transform:uppercase;letter-spacing:1px;">' + opp.league.icon + ' ' + opp.league.name + '</span>' +
                        '<span style="font-size:6px;color:' + diffColor + ';font-weight:bold;background:' + diffColor + '15;border:1px solid ' + diffColor + '40;padding:0 4px;border-radius:3px;">' + diffLabel + '</span>' +
                    '</div>' +
                '</div>' +
                '<div style="text-align:right;">' +
                    '<div style="font-size:16px;font-weight:900;color:#fbbf24;text-shadow:0 0 10px rgba(251,191,36,0.3);">\u{1F3C6} ' + opp.trophies + '</div>' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Power: ' + totalPower + '</div>' +
                '</div>' +
            '</div>' +
            // Team sprites row
            '<div style="display:flex;gap:4px;justify-content:center;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:8px 6px;margin-bottom:10px;flex-wrap:wrap;">' + teamSprites + '</div>' +
            // Stats row
            '<div style="display:flex;gap:6px;margin-bottom:10px;">' +
                '<div style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:4px 6px;text-align:center;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Team Size</div>' +
                    '<div style="font-size:11px;font-weight:900;color:#e2e8f0;">' + opp.team.length + '</div>' +
                '</div>' +
                '<div style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:4px 6px;text-align:center;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Chars</div>' +
                    '<div style="font-size:11px;font-weight:900;color:#4ade80;">' + opp.team.filter(function(t){return t.type==='char'}).length + '</div>' +
                '</div>' +
                '<div style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:4px 6px;text-align:center;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Bots</div>' +
                    '<div style="font-size:11px;font-weight:900;color:#22d3ee;">' + opp.team.filter(function(t){return t.type==='bot'}).length + '</div>' +
                '</div>' +
                '<div style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:4px 6px;text-align:center;">' +
                    '<div style="font-size:6px;color:#6b7280;text-transform:uppercase;">Avg Lv</div>' +
                    '<div style="font-size:11px;font-weight:900;color:#fbbf24;">' + (opp.team.length > 0 ? Math.round(opp.team.reduce(function(a,t){return a+t.level},0)/opp.team.length) : 0) + '</div>' +
                '</div>' +
            '</div>' +
            // Fight button
            '<button onclick="startPvpBattle(' + idx + ')" style="width:100%;background:linear-gradient(135deg,#7f1d1d,#dc2626,#b91c1c);color:white;font-weight:900;font-size:12px;padding:10px;border:2px solid #f8717180;border-radius:8px;cursor:pointer;letter-spacing:3px;text-transform:uppercase;text-shadow:0 1px 2px rgba(0,0,0,0.5);transition:all 0.2s;" onmouseenter="this.style.background=\\'linear-gradient(135deg,#991b1b,#ef4444,#dc2626)\\';this.style.boxShadow=\\'0 0 15px rgba(239,68,68,0.4)\\'" onmouseleave="this.style.background=\\'linear-gradient(135deg,#7f1d1d,#dc2626,#b91c1c)\\';this.style.boxShadow=\\'none\\'">\u2694\uFE0F FIGHT!</button>' +
        '</div>';
    });

    // Refresh button
    var refreshHtml = '<button onclick="openPvpMatchmaking()" style="width:100%;background:linear-gradient(135deg,#1e3a5f,#1e40af);color:#93c5fd;font-weight:bold;font-size:10px;padding:8px;border:1px solid #3b82f680;border-radius:8px;cursor:pointer;letter-spacing:1px;margin-bottom:6px;transition:all 0.2s;" onmouseenter="this.style.background=\\'linear-gradient(135deg,#1e40af,#2563eb)\\'" onmouseleave="this.style.background=\\'linear-gradient(135deg,#1e3a5f,#1e40af)\\'">\u{1F504} FIND NEW OPPONENTS</button>';

    overlay.innerHTML = 
    '<div style="background:linear-gradient(180deg,#0f0515,#150a20,#0a0510);border:2px solid #7c3aed50;border-radius:20px;padding:20px;max-width:420px;width:95%;max-height:90vh;overflow-y:auto;box-shadow:0 0 60px rgba(124,58,237,0.15), inset 0 0 30px rgba(0,0,0,0.5);position:relative;">' +
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
        '<button onclick="document.getElementById(\\'pvp-matchmaking-modal\\').remove()" style="width:100%;background:rgba(30,41,59,0.5);color:#64748b;font-weight:bold;font-size:10px;padding:8px;border:1px solid #33415540;border-radius:8px;cursor:pointer;transition:all 0.2s;" onmouseenter="this.style.color=\\'#94a3b8\\'" onmouseleave="this.style.color=\\'#64748b\\'">\u2190 BACK TO HUB</button>' +
    '</div>';

    window._pvpOpponents = opponents;
}
`;

if (txt.match(regexMatchmaking)) {
    txt = txt.replace(regexMatchmaking, fetchOpponentsFunc + '\n' + newMatchmaking + '\n\n');
    fs.writeFileSync(filePath, txt, 'utf8');
    console.log("Updated pvp.js matchmaking logic");
} else {
    console.log("Failed to match regex in pvp.js");
}
