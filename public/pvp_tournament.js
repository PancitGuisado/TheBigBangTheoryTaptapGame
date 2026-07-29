// =====================================================
// PVP TOURNAMENT — Weekly bracket elimination (Simulated)
// =====================================================
(function() {
    'use strict';

    var ENTRY_FEE = 500;
    var TOURNAMENT_COOLDOWN_MS = 7 * 24 * 3600 * 1000; // 7 days
    var SIMULATED_NAMES = [
        'Dr. Crawfish', 'xXScienceXx', 'QuantumKing', 'NerdHerd42', 'BazingaMaster',
        'RocketMan99', 'StringTheory', 'CosmicCat', 'PhysicsPhD', 'MolecularMike',
        'AstroNova', 'ProtonPal', 'TheWiz4rd', 'BigBrainBob', 'LaserLady',
        'NeutrinoNinja', 'PlasmaPete', 'ElectronEllie', 'AtomAnt', 'FusionFrank'
    ];

    var REWARDS = {
        1: { diamonds: 500, coins: 10000, trophies: 1 },
        2: { diamonds: 200, coins: 5000, trophies: 0 },
        3: { diamonds: 50, coins: 2000, trophies: 0 },
        4: { diamonds: 50, coins: 2000, trophies: 0 }
    };

    function ensureTournamentState() {
        if (!state) return;
        if (!state.tournament) state.tournament = { bracket: null, round: 0, lastEntry: 0, trophies: 0, history: [] };
    }

    function getTeamPower() {
        if (!state || !state.team) return 100;
        var power = 0;
        for (var i = 0; i < state.team.length; i++) {
            var k = state.team[i];
            if (!k) continue;
            var cs = state.characters && state.characters[k];
            if (cs) power += (cs.level || 1) * 50 + (cs.xp || 0) * 0.1;
        }
        return Math.max(power, 100);
    }

    function generateOpponent(round) {
        var powerBase = getTeamPower();
        var variance = 0.6 + Math.random() * 0.8 + round * 0.15;
        return {
            name: SIMULATED_NAMES[Math.floor(Math.random() * SIMULATED_NAMES.length)],
            power: Math.floor(powerBase * variance),
            avatar: ['🧑‍🔬','👨‍💻','👩‍🚀','🧙‍♂️','🤖','👾','🦸','🧝'][Math.floor(Math.random()*8)]
        };
    }

    function generateBracket() {
        var player = { name: 'YOU', power: getTeamPower(), avatar: '⭐', isPlayer: true };
        var participants = [player];
        for (var i = 0; i < 7; i++) {
            participants.push(generateOpponent(0));
        }
        // Shuffle
        for (var j = participants.length - 1; j > 0; j--) {
            var r = Math.floor(Math.random() * (j + 1));
            var tmp = participants[j]; participants[j] = participants[r]; participants[r] = tmp;
        }
        return {
            participants: participants,
            matches: [],
            round: 0,
            playerSlot: participants.indexOf(player),
            finished: false,
            placement: 0
        };
    }

    function simulateMatch(a, b) {
        var aPower = a.power * (0.7 + Math.random() * 0.6);
        var bPower = b.power * (0.7 + Math.random() * 0.6);
        return aPower >= bPower ? a : b;
    }

    function advanceRound(bracket) {
        var current = bracket.participants;
        if (current.length <= 1) { bracket.finished = true; return; }

        var winners = [];
        var roundMatches = [];
        for (var i = 0; i < current.length; i += 2) {
            var a = current[i];
            var b = current[i + 1] || a;
            var winner = simulateMatch(a, b);
            winners.push(winner);
            roundMatches.push({ a: a, b: b, winner: winner });
        }
        bracket.matches.push(roundMatches);
        bracket.participants = winners;
        bracket.round++;

        // Check player elimination
        var playerAlive = false;
        for (var j = 0; j < winners.length; j++) {
            if (winners[j].isPlayer) playerAlive = true;
        }

        if (!playerAlive) {
            bracket.finished = true;
            var totalPlayers = 8;
            if (bracket.round === 1) bracket.placement = 5; // Lost quarterfinal
            else if (bracket.round === 2) bracket.placement = 3; // Lost semifinal
            else bracket.placement = 2;
        } else if (winners.length === 1) {
            bracket.finished = true;
            bracket.placement = 1;
        }
    }

    window.openTournamentModal = function() {
        ensureTournamentState();
        var existing = document.getElementById('pvp-tournament-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'pvp-tournament-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:12px;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

        renderTournamentUI(modal);
        document.body.appendChild(modal);
    };

    function renderTournamentUI(modal) {
        if (!modal) modal = document.getElementById('pvp-tournament-modal');
        if (!modal) return;
        ensureTournamentState();

        var t = state.tournament;
        var coins = (state.resources && state.resources.coin) || 0;
        var canEnter = !t.bracket || t.bracket.finished;
        var cooldownOk = Date.now() - (t.lastEntry || 0) >= TOURNAMENT_COOLDOWN_MS;

        var html = '<div style="background:linear-gradient(135deg,rgba(15,10,30,0.97),rgba(20,15,40,0.97));border:2px solid rgba(234,179,8,0.4);border-radius:16px;max-width:420px;width:100%;padding:16px;max-height:85vh;overflow-y:auto;box-shadow:0 0 60px rgba(234,179,8,0.1);">';
        
        html += '<div style="text-align:center;margin-bottom:12px;">';
        html += '<div style="font-size:28px;">⚔️</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:#eab308;letter-spacing:2px;">PVP TOURNAMENT</div>';
        html += '<div style="font-size:7px;color:rgba(234,179,8,0.5);margin-top:2px;">🏆 Trophies: ' + (t.trophies || 0) + '</div>';
        html += '</div>';

        if (!t.bracket || (t.bracket.finished && cooldownOk)) {
            // Entry screen
            html += '<div style="text-align:center;background:rgba(0,0,0,0.4);border:1px solid rgba(234,179,8,0.2);border-radius:10px;padding:16px;margin-bottom:10px;">';
            html += '<div style="font-size:8px;color:rgba(255,255,255,0.5);margin-bottom:8px;">8-Player Bracket Elimination</div>';
            html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px;">';
            html += '<div style="text-align:center;"><div style="font-size:7px;color:rgba(255,255,255,0.3);">1st</div><div style="font-size:7px;color:#fbbf24;">500💎 + 🏆</div></div>';
            html += '<div style="text-align:center;"><div style="font-size:7px;color:rgba(255,255,255,0.3);">2nd</div><div style="font-size:7px;color:#94a3b8;">200💎</div></div>';
            html += '<div style="text-align:center;"><div style="font-size:7px;color:rgba(255,255,255,0.3);">3rd-4th</div><div style="font-size:7px;color:#92400e;">50💎</div></div>';
            html += '</div>';
            html += '<button onclick="enterTournament()" style="padding:10px 20px;background:linear-gradient(135deg,#eab308,#ca8a04);color:#1e293b;font-family:\'Press Start 2P\',monospace;font-size:9px;border:2px solid #fbbf24;border-radius:8px;cursor:pointer;box-shadow:0 0 15px rgba(234,179,8,0.3);"' + (coins < ENTRY_FEE ? ' disabled style="opacity:0.4"' : '') + '>ENTER (500 🪙)</button>';
            html += '</div>';

        } else if (t.bracket && !t.bracket.finished) {
            // Active tournament
            var b = t.bracket;
            var roundNames = ['Quarter-Finals', 'Semi-Finals', 'FINALS'];
            html += '<div style="text-align:center;font-family:\'Press Start 2P\',monospace;font-size:9px;color:#fbbf24;margin-bottom:8px;">' + (roundNames[b.round] || 'Round ' + (b.round+1)) + '</div>';

            html += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-bottom:10px;">';
            for (var i = 0; i < b.participants.length; i += 2) {
                var a = b.participants[i];
                var bOp = b.participants[i+1];
                html += '<div style="background:rgba(0,0,0,0.4);border:1px solid ' + (a && a.isPlayer ? '#fbbf24' : 'rgba(100,100,130,0.2)') + ';border-radius:6px;padding:6px;text-align:center;">';
                html += '<div style="font-size:14px;">' + (a ? a.avatar : '?') + '</div>';
                html += '<div style="font-size:6px;color:' + (a && a.isPlayer ? '#fbbf24' : 'rgba(255,255,255,0.5)') + ';font-family:\'Press Start 2P\',monospace;">' + (a ? a.name : '???') + '</div>';
                html += '<div style="font-size:6px;color:rgba(255,255,255,0.3);">PWR: ' + (a ? a.power : '?') + '</div>';
                html += '</div>';
                if (bOp) {
                    html += '<div style="background:rgba(0,0,0,0.4);border:1px solid ' + (bOp.isPlayer ? '#fbbf24' : 'rgba(100,100,130,0.2)') + ';border-radius:6px;padding:6px;text-align:center;">';
                    html += '<div style="font-size:14px;">' + bOp.avatar + '</div>';
                    html += '<div style="font-size:6px;color:' + (bOp.isPlayer ? '#fbbf24' : 'rgba(255,255,255,0.5)') + ';font-family:\'Press Start 2P\',monospace;">' + bOp.name + '</div>';
                    html += '<div style="font-size:6px;color:rgba(255,255,255,0.3);">PWR: ' + bOp.power + '</div>';
                    html += '</div>';
                }
            }
            html += '</div>';

            html += '<button onclick="playTournamentRound()" style="width:100%;padding:10px;background:linear-gradient(135deg,#dc2626,#991b1b);color:white;font-family:\'Press Start 2P\',monospace;font-size:9px;border:2px solid #ef4444;border-radius:8px;cursor:pointer;box-shadow:0 0 15px rgba(239,68,68,0.3);">⚔️ FIGHT!</button>';

        } else if (t.bracket && t.bracket.finished) {
            // Results
            var place = t.bracket.placement;
            var reward = REWARDS[Math.min(place, 4)] || REWARDS[4];
            html += '<div style="text-align:center;background:rgba(0,0,0,0.4);border:1px solid rgba(234,179,8,0.3);border-radius:10px;padding:16px;">';
            html += '<div style="font-size:36px;">' + (place === 1 ? '🏆' : place === 2 ? '🥈' : '🥉') + '</div>';
            html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:12px;color:#fbbf24;margin:8px 0;">' + (place === 1 ? 'CHAMPION!' : place + getOrdinal(place) + ' Place') + '</div>';
            html += '<div style="font-size:8px;color:#4ade80;margin-top:6px;">Earned: ' + reward.diamonds + '💎 ' + reward.coins + '🪙</div>';
            if (!cooldownOk) {
                var remaining = TOURNAMENT_COOLDOWN_MS - (Date.now() - t.lastEntry);
                var days = Math.ceil(remaining / 86400000);
                html += '<div style="font-size:7px;color:rgba(255,255,255,0.3);margin-top:6px;">Next tournament in ' + days + ' day(s)</div>';
            }
            html += '</div>';
        }

        // History
        if (t.history && t.history.length > 0) {
            html += '<div style="margin-top:10px;font-size:7px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;">HISTORY</div>';
            for (var h = Math.max(0, t.history.length-5); h < t.history.length; h++) {
                var entry = t.history[h];
                html += '<div style="font-size:6px;color:rgba(255,255,255,0.2);padding:2px 0;">' + entry + '</div>';
            }
        }

        html += '<button onclick="document.getElementById(\'pvp-tournament-modal\').remove()" style="width:100%;margin-top:10px;padding:8px;background:none;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;font-size:7px;border:1px solid rgba(100,100,130,0.2);border-radius:6px;cursor:pointer;">CLOSE</button>';
        html += '</div>';
        modal.innerHTML = html;
    }

    function getOrdinal(n) {
        if (n === 1) return 'st';
        if (n === 2) return 'nd';
        if (n === 3) return 'rd';
        return 'th';
    }

    window.enterTournament = function() {
        ensureTournamentState();
        var coins = (state.resources && state.resources.coin) || 0;
        if (coins < ENTRY_FEE) { if (typeof showToast === 'function') showToast('Need ' + ENTRY_FEE + ' coins!'); return; }
        if (state.resources) state.resources.coin -= ENTRY_FEE;

        state.tournament.bracket = generateBracket();
        state.tournament.lastEntry = Date.now();
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof showToast === 'function') showToast('⚔️ Tournament entered!');
        renderTournamentUI();
    };

    window.playTournamentRound = function() {
        ensureTournamentState();
        if (!state.tournament.bracket || state.tournament.bracket.finished) return;

        advanceRound(state.tournament.bracket);

        if (state.tournament.bracket.finished) {
            var place = state.tournament.bracket.placement;
            var reward = REWARDS[Math.min(place, 4)] || REWARDS[4];
            if (state.resources) {
                state.resources.diamond = (state.resources.diamond || 0) + reward.diamonds;
                state.resources.coin = (state.resources.coin || 0) + reward.coins;
            }
            state.tournament.trophies = (state.tournament.trophies || 0) + reward.trophies;
            state.tournament.history.push(place + getOrdinal(place) + ' place — ' + new Date().toLocaleDateString());
            if (typeof showToast === 'function') showToast((place === 1 ? '🏆 CHAMPION! ' : '⚔️ ') + '+' + reward.diamonds + '💎');
        }

        if (typeof saveProgress === 'function') saveProgress();
        renderTournamentUI();
    };

    // Register menu button
    setTimeout(function() {
        var panel = document.getElementById('more-menu-panel');
        if (!panel) return;
        var grid = panel.querySelector('.flex.flex-wrap, .grid');
        if (!grid) return;
        var btn = document.createElement('button');
        btn.className = 'more-grid-btn';
        btn.onclick = function() { openTournamentModal(); if (typeof toggleMoreMenu === 'function') toggleMoreMenu(); };
        btn.innerHTML = '<span>⚔️</span><span class="more-grid-label">Tourney</span>';
        grid.appendChild(btn);
    }, 2500);

    console.log('[PvPTournament] Tournament system loaded.');
})();
