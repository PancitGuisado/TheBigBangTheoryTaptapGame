// ============================================================
// MINIGAMES — Texas Hold'em Poker + Football Toss
// Two new YS-themed minigames with resource rewards
// ============================================================
(function() {
    'use strict';

    // ── CARD SYSTEM ──
    var SUITS = ['♠','♥','♦','♣'];
    var RANKS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    var RANK_VALUES = {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':14};

    function createDeck() {
        var d = [];
        for (var s = 0; s < SUITS.length; s++)
            for (var r = 0; r < RANKS.length; r++)
                d.push({ suit: SUITS[s], rank: RANKS[r], value: RANK_VALUES[RANKS[r]] });
        return d;
    }

    function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        return arr;
    }

    function cardHTML(card, hidden) {
        if (hidden) return '<div style="display:inline-block;width:48px;height:68px;background:linear-gradient(135deg,#1e40af,#3b82f6);border:2px solid #60a5fa;border-radius:6px;margin:3px;vertical-align:top;text-align:center;line-height:68px;font-size:20px;color:#93c5fd;">?</div>';
        var isRed = card.suit === '♥' || card.suit === '♦';
        var color = isRed ? '#ef4444' : '#f5f5f5';
        return '<div style="display:inline-block;width:48px;height:68px;background:#1a1a2e;border:2px solid #374151;border-radius:6px;margin:3px;vertical-align:top;text-align:center;padding-top:4px;box-shadow:0 2px 8px rgba(0,0,0,0.3);">' +
            '<div style="font-size:14px;font-weight:bold;color:' + color + ';">' + card.rank + '</div>' +
            '<div style="font-size:18px;color:' + color + ';">' + card.suit + '</div>' +
            '</div>';
    }

    // Simple hand evaluation
    function evalHand(cards) {
        var vals = cards.map(function(c) { return c.value; }).sort(function(a,b) { return a - b; });
        var suits = cards.map(function(c) { return c.suit; });
        var counts = {};
        vals.forEach(function(v) { counts[v] = (counts[v] || 0) + 1; });
        var groups = Object.values(counts).sort(function(a,b) { return b - a; });

        var isFlush = suits.every(function(s) { return s === suits[0]; });
        var isStraight = vals.length >= 5 && (vals[4] - vals[0] === 4) && new Set(vals).size === 5;

        if (isFlush && isStraight) return { rank: 8, name: 'Straight Flush', score: 800 + vals[4] };
        if (groups[0] === 4) return { rank: 7, name: 'Four of a Kind', score: 700 + vals[2] };
        if (groups[0] === 3 && groups[1] === 2) return { rank: 6, name: 'Full House', score: 600 + vals[2] };
        if (isFlush) return { rank: 5, name: 'Flush', score: 500 + vals[4] };
        if (isStraight) return { rank: 4, name: 'Straight', score: 400 + vals[4] };
        if (groups[0] === 3) return { rank: 3, name: 'Three of a Kind', score: 300 + vals[2] };
        if (groups[0] === 2 && groups[1] === 2) return { rank: 2, name: 'Two Pair', score: 200 + vals[3] };
        if (groups[0] === 2) return { rank: 1, name: 'One Pair', score: 100 + vals[3] };
        return { rank: 0, name: 'High Card', score: vals[4] };
    }

    // ═════════════════════════════════════════
    // POKER MINIGAME
    // ═════════════════════════════════════════
    var pokerState = { phase: 'bet', deck: null, player: [], dealer: [], community: [], bet: 0 };

    window.openPokerMinigame = function() {
        // Check daily limit
        if (typeof state !== 'undefined') {
            if (!state.minigames) state.minigames = {};
            var today = new Date().toDateString();
            if (state.minigames.pokerLastReset !== today) {
                state.minigames.pokerPlaysToday = 0;
                state.minigames.pokerLastReset = today;
            }
            if (state.minigames.pokerPlaysToday >= 5) {
                if (typeof showGameAlert === 'function') showGameAlert('🃏 Poker', 'You\'ve played 5 times today! Come back tomorrow.', 3000);
                return;
            }
        }

        pokerState = { phase: 'bet', deck: null, player: [], dealer: [], community: [], bet: 0 };
        var modal = document.createElement('div');
        modal.id = 'poker-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.8);';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

        var maxBet = Math.min(typeof state !== 'undefined' ? Math.floor(state.resources.money * 0.1) : 10000, 1000000);
        var defaultBet = Math.max(100, Math.floor(maxBet * 0.1));

        modal.innerHTML = '<div style="background:linear-gradient(135deg,#0f172a,#1e293b);border:2px solid #334155;border-radius:16px;padding:24px;max-width:420px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.8);">' +
            '<div style="text-align:center;margin-bottom:16px;">' +
            '<h2 style="color:#fbbf24;font-size:18px;font-weight:900;letter-spacing:2px;">🃏 TEXAS HOLD\'EM</h2>' +
            '<p style="color:#94a3b8;font-size:10px;">Beat the dealer to win 2x your bet!</p>' +
            '</div>' +
            '<div id="poker-area" style="min-height:200px;text-align:center;">' +
            '<div style="margin:16px 0;">' +
            '<label style="color:#e2e8f0;font-size:12px;font-weight:bold;">BET AMOUNT:</label><br>' +
            '<input type="number" id="poker-bet-input" value="' + defaultBet + '" min="100" max="' + maxBet + '" ' +
            'style="width:120px;padding:8px;margin:8px;background:#0f172a;border:2px solid #fbbf24;border-radius:8px;color:#fbbf24;font-size:16px;font-weight:bold;text-align:center;">' +
            '<div style="color:#64748b;font-size:9px;margin-top:4px;">Max: ' + maxBet.toLocaleString() + ' 💰</div>' +
            '</div>' +
            '<button onclick="window._pokerDeal()" style="padding:10px 30px;background:linear-gradient(135deg,#d97706,#b45309);color:white;border:2px solid #f59e0b;border-radius:10px;font-weight:bold;cursor:pointer;font-size:14px;">DEAL 🃏</button>' +
            '</div>' +
            '<button onclick="this.parentNode.parentNode.remove()" style="display:block;margin:12px auto 0;padding:6px 20px;background:transparent;color:#64748b;border:1px solid #334155;border-radius:8px;cursor:pointer;font-size:11px;">Close</button>' +
            '</div>';
        document.body.appendChild(modal);
    };

    window._pokerDeal = function() {
        var betInput = document.getElementById('poker-bet-input');
        var bet = parseInt(betInput ? betInput.value : 1000);
        if (isNaN(bet) || bet < 100) bet = 100;
        if (typeof state !== 'undefined' && bet > state.resources.money) {
            if (typeof showGameAlert === 'function') showGameAlert('💸', 'Not enough money!', 2000);
            return;
        }

        // Deduct bet
        if (typeof state !== 'undefined') state.resources.money -= bet;
        pokerState.bet = bet;
        pokerState.deck = shuffle(createDeck());
        pokerState.player = [pokerState.deck.pop(), pokerState.deck.pop()];
        pokerState.dealer = [pokerState.deck.pop(), pokerState.deck.pop()];
        pokerState.community = [pokerState.deck.pop(), pokerState.deck.pop(), pokerState.deck.pop()];

        var area = document.getElementById('poker-area');
        if (!area) return;

        var allPlayer = pokerState.player.concat(pokerState.community);
        var allDealer = pokerState.dealer.concat(pokerState.community);
        var pHand = evalHand(allPlayer);
        var dHand = evalHand(allDealer);

        // Show cards with reveal animation
        area.innerHTML =
            '<div style="margin:8px 0;"><div style="color:#94a3b8;font-size:10px;font-weight:bold;margin-bottom:4px;">COMMUNITY</div>' +
            pokerState.community.map(function(c) { return cardHTML(c); }).join('') + '</div>' +
            '<div style="margin:8px 0;"><div style="color:#22d3ee;font-size:10px;font-weight:bold;margin-bottom:4px;">YOUR HAND</div>' +
            pokerState.player.map(function(c) { return cardHTML(c); }).join('') +
            '<div style="color:#22d3ee;font-size:11px;font-weight:bold;margin-top:4px;">' + pHand.name + '</div></div>' +
            '<div style="margin:8px 0;"><div style="color:#f87171;font-size:10px;font-weight:bold;margin-bottom:4px;">DEALER</div>' +
            pokerState.dealer.map(function(c) { return cardHTML(c); }).join('') +
            '<div style="color:#f87171;font-size:11px;font-weight:bold;margin-top:4px;">' + dHand.name + '</div></div>';

        // Determine winner
        var won = pHand.score > dHand.score;
        var tie = pHand.score === dHand.score;
        var winnings = won ? bet * 2 : (tie ? bet : 0);

        if (typeof state !== 'undefined') {
            state.resources.money += winnings;
            state.minigames.pokerPlaysToday = (state.minigames.pokerPlaysToday || 0) + 1;
            if (typeof saveProgress === 'function') saveProgress();
        }

        var resultColor = won ? '#22c55e' : (tie ? '#f59e0b' : '#ef4444');
        var resultText = won ? '🎉 YOU WIN! +' + winnings.toLocaleString() + ' 💰' : (tie ? '🤝 TIE — Bet returned' : '😢 DEALER WINS — Lost ' + bet.toLocaleString() + ' 💰');

        area.innerHTML += '<div style="margin-top:12px;padding:10px;background:rgba(0,0,0,0.4);border-radius:8px;border:2px solid ' + resultColor + ';">' +
            '<div style="font-size:16px;font-weight:900;color:' + resultColor + ';">' + resultText + '</div>' +
            '<div style="color:#64748b;font-size:9px;margin-top:4px;">Plays today: ' + (state.minigames.pokerPlaysToday || 0) + '/5</div></div>' +
            '<button onclick="document.getElementById(\'poker-modal\').remove();window.openPokerMinigame()" style="margin-top:8px;padding:8px 24px;background:linear-gradient(135deg,#d97706,#b45309);color:white;border:2px solid #f59e0b;border-radius:8px;cursor:pointer;font-weight:bold;">PLAY AGAIN</button>';
    };

    // ═════════════════════════════════════════
    // FOOTBALL TOSS MINIGAME
    // ═════════════════════════════════════════
    var ftState = { barPos: 0, direction: 1, speed: 3, active: false, intervalId: null };

    window.openFootballToss = function() {
        if (typeof state !== 'undefined') {
            if (!state.minigames) state.minigames = {};
            var today = new Date().toDateString();
            if (state.minigames.footballLastReset !== today) {
                state.minigames.footballPlaysToday = 0;
                state.minigames.footballLastReset = today;
            }
            if (state.minigames.footballPlaysToday >= 5) {
                if (typeof showGameAlert === 'function') showGameAlert('🏈 Football Toss', 'You\'ve played 5 times today! Come back tomorrow.', 3000);
                return;
            }
        }

        ftState = { barPos: 0, direction: 1, speed: 3, active: true, intervalId: null };
        var modal = document.createElement('div');
        modal.id = 'football-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.8);';
        modal.onclick = function(e) { if (e.target === modal) { if (ftState.intervalId) clearInterval(ftState.intervalId); modal.remove(); } };

        modal.innerHTML = '<div style="background:linear-gradient(135deg,#0f2e0f,#1a3a1a);border:2px solid #22c55e;border-radius:16px;padding:24px;max-width:400px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.8);">' +
            '<div style="text-align:center;margin-bottom:16px;">' +
            '<h2 style="color:#22c55e;font-size:18px;font-weight:900;letter-spacing:2px;">🏈 FOOTBALL TOSS</h2>' +
            '<p style="color:#86efac;font-size:10px;">Coach George says: "Hit the sweet spot, son!"</p>' +
            '</div>' +
            '<div id="ft-area" style="text-align:center;">' +
            '<div style="position:relative;height:40px;background:#1a1a2e;border:2px solid #334155;border-radius:8px;margin:16px 0;overflow:hidden;">' +
            '<div style="position:absolute;left:45%;width:10%;height:100%;background:rgba(34,197,94,0.3);border-left:2px solid #22c55e;border-right:2px solid #22c55e;"></div>' +
            '<div id="ft-bar" style="position:absolute;left:0;top:0;width:4px;height:100%;background:#fbbf24;transition:none;box-shadow:0 0 8px #fbbf24;"></div>' +
            '</div>' +
            '<div id="ft-result" style="min-height:40px;margin:8px 0;"></div>' +
            '<button id="ft-throw-btn" onclick="window._footballThrow()" style="padding:12px 36px;background:linear-gradient(135deg,#16a34a,#15803d);color:white;border:2px solid #22c55e;border-radius:10px;font-weight:bold;cursor:pointer;font-size:16px;">🏈 THROW!</button>' +
            '</div>' +
            '<button onclick="if(window._ftCleanup)window._ftCleanup();this.parentNode.parentNode.remove()" style="display:block;margin:12px auto 0;padding:6px 20px;background:transparent;color:#64748b;border:1px solid #334155;border-radius:8px;cursor:pointer;font-size:11px;">Close</button>' +
            '</div>';
        document.body.appendChild(modal);

        // Start the moving bar
        ftState.intervalId = setInterval(function() {
            if (!ftState.active) return;
            ftState.barPos += ftState.direction * ftState.speed;
            if (ftState.barPos >= 100) { ftState.barPos = 100; ftState.direction = -1; }
            if (ftState.barPos <= 0) { ftState.barPos = 0; ftState.direction = 1; }
            var bar = document.getElementById('ft-bar');
            if (bar) bar.style.left = ftState.barPos + '%';
        }, 20);
    };

    window._ftCleanup = function() {
        if (ftState.intervalId) { clearInterval(ftState.intervalId); ftState.intervalId = null; }
        ftState.active = false;
    };

    window._footballThrow = function() {
        if (!ftState.active) return;
        ftState.active = false;
        if (ftState.intervalId) { clearInterval(ftState.intervalId); ftState.intervalId = null; }

        // Calculate accuracy (50 = perfect center)
        var accuracy = 100 - Math.abs(ftState.barPos - 50) * 2;
        accuracy = Math.max(0, Math.min(100, accuracy));

        // Calculate yards (max 100)
        var yards = Math.floor(accuracy);
        var rating = yards >= 90 ? 'TOUCHDOWN! 🏆' : (yards >= 70 ? 'GREAT THROW! 🎯' : (yards >= 40 ? 'DECENT 👍' : 'FUMBLE! 😅'));

        // Rewards based on accuracy
        var moneyReward = Math.floor(yards * 500 + yards * yards * 2);
        var scrapReward = Math.floor(yards * 10);
        var foodReward = yards >= 80 ? 'burger' : null;

        if (typeof state !== 'undefined') {
            state.resources.money += moneyReward;
            state.resources.scrap += scrapReward;
            if (foodReward && state.food) state.food[foodReward] = (state.food[foodReward] || 0) + 1;
            state.minigames.footballPlaysToday = (state.minigames.footballPlaysToday || 0) + 1;
            if (typeof saveProgress === 'function') saveProgress();
        }

        var resultDiv = document.getElementById('ft-result');
        var throwBtn = document.getElementById('ft-throw-btn');
        var resultColor = yards >= 70 ? '#22c55e' : (yards >= 40 ? '#f59e0b' : '#ef4444');

        if (resultDiv) {
            resultDiv.innerHTML =
                '<div style="padding:12px;background:rgba(0,0,0,0.4);border-radius:8px;border:2px solid ' + resultColor + ';">' +
                '<div style="font-size:20px;font-weight:900;color:' + resultColor + ';">' + rating + '</div>' +
                '<div style="font-size:14px;color:#e2e8f0;margin:4px 0;">🏈 ' + yards + ' YARDS</div>' +
                '<div style="font-size:11px;color:#86efac;">+' + moneyReward.toLocaleString() + ' 💰 +' + scrapReward + ' 🔩' + (foodReward ? ' +1 🍔' : '') + '</div>' +
                '<div style="color:#64748b;font-size:9px;margin-top:4px;">Plays today: ' + (state.minigames.footballPlaysToday || 0) + '/5</div></div>';
        }
        if (throwBtn) {
            throwBtn.textContent = '🔄 PLAY AGAIN';
            throwBtn.onclick = function() {
                var modal = document.getElementById('football-modal');
                if (modal) modal.remove();
                window.openFootballToss();
            };
        }
    };

    console.log('[Minigames] Texas Hold\'em Poker + Football Toss loaded');
})();
