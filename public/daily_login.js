// =====================================================
// DAILY LOGIN CALENDAR + CHARACTER COMBAT DIALOGUE
// =====================================================
(function() {
    'use strict';

    // ─── DAILY LOGIN REWARDS TABLE ───
    var DAILY_REWARDS = [
        // Week 1 - Basic
        { day: 1, icon: '🪙', label: '500 Coins', type: 'coin', amount: 500 },
        { day: 2, icon: '🪨', label: '5 Stone', type: 'stone', amount: 5 },
        { day: 3, icon: '🪙', label: '1,000 Coins', type: 'coin', amount: 1000 },
        { day: 4, icon: '⚙️', label: '3 Scrap', type: 'scrap', amount: 3 },
        { day: 5, icon: '🔩', label: '3 Iron', type: 'iron', amount: 3 },
        { day: 6, icon: '🪙', label: '2,000 Coins', type: 'coin', amount: 2000 },
        { day: 7, icon: '💎', label: '50 Diamonds', type: 'diamond', amount: 50, milestone: true },
        // Week 2 - Mid
        { day: 8, icon: '🪙', label: '3,000 Coins', type: 'coin', amount: 3000 },
        { day: 9, icon: '🪨', label: '10 Stone', type: 'stone', amount: 10 },
        { day: 10, icon: '💎', label: '20 Diamonds', type: 'diamond', amount: 20 },
        { day: 11, icon: '🥇', label: '3 Gold', type: 'gold', amount: 3 },
        { day: 12, icon: '🪙', label: '5,000 Coins', type: 'coin', amount: 5000 },
        { day: 13, icon: '🔩', label: '8 Iron', type: 'iron', amount: 8 },
        { day: 14, icon: '💎', label: '100 Diamonds', type: 'diamond', amount: 100, milestone: true },
        // Week 3 - Good
        { day: 15, icon: '🪙', label: '8,000 Coins', type: 'coin', amount: 8000 },
        { day: 16, icon: '🥇', label: '5 Gold', type: 'gold', amount: 5 },
        { day: 17, icon: '💎', label: '30 Diamonds', type: 'diamond', amount: 30 },
        { day: 18, icon: '🪨', label: '20 Stone', type: 'stone', amount: 20 },
        { day: 19, icon: '🔩', label: '15 Iron', type: 'iron', amount: 15 },
        { day: 20, icon: '🪙', label: '12,000 Coins', type: 'coin', amount: 12000 },
        { day: 21, icon: '💎', label: '200 Diamonds', type: 'diamond', amount: 200, milestone: true },
        // Week 4 - Premium
        { day: 22, icon: '🪙', label: '15,000 Coins', type: 'coin', amount: 15000 },
        { day: 23, icon: '🥇', label: '10 Gold', type: 'gold', amount: 10 },
        { day: 24, icon: '💎', label: '50 Diamonds', type: 'diamond', amount: 50 },
        { day: 25, icon: '🔩', label: '25 Iron', type: 'iron', amount: 25 },
        { day: 26, icon: '🪙', label: '20,000 Coins', type: 'coin', amount: 20000 },
        { day: 27, icon: '🥇', label: '15 Gold', type: 'gold', amount: 15 },
        { day: 28, icon: '💎', label: '500 Diamonds', type: 'diamond', amount: 500, milestone: true }
    ];

    // ─── INIT STATE ───
    function ensureDailyLoginState() {
        if (!state) return;
        if (!state.dailyLogin) {
            state.dailyLogin = { lastClaim: 0, streak: 0, claimed: [] };
        }
    }

    function isSameDay(ts1, ts2) {
        var d1 = new Date(ts1), d2 = new Date(ts2);
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    function canClaimToday() {
        ensureDailyLoginState();
        if (!state.dailyLogin.lastClaim) return true;
        return !isSameDay(state.dailyLogin.lastClaim, Date.now());
    }

    function getCurrentDay() {
        ensureDailyLoginState();
        // streak = which day we're on (1-28), wraps after 28
        return ((state.dailyLogin.streak) % 28) + 1;
    }

    // ─── CLAIM REWARD ───
    function claimDailyReward() {
        ensureDailyLoginState();
        if (!canClaimToday()) return;
        
        var dayNum = getCurrentDay();
        var reward = DAILY_REWARDS[dayNum - 1];
        if (!reward) return;

        // Grant reward
        if (state.resources && typeof state.resources[reward.type] !== 'undefined') {
            state.resources[reward.type] += reward.amount;
        } else if (reward.type === 'coin') {
            state.score = (state.score || 0) + reward.amount;
        }

        // Update state
        state.dailyLogin.lastClaim = Date.now();
        state.dailyLogin.streak = (state.dailyLogin.streak || 0) + 1;
        if (!state.dailyLogin.claimed.includes(dayNum)) {
            state.dailyLogin.claimed.push(dayNum);
        }

        if (typeof saveProgress === 'function') saveProgress();
        if (typeof showToast === 'function') showToast('Day ' + dayNum + ': ' + reward.label + ' claimed! 🎁');
        if (typeof updateUI === 'function') updateUI();

        // Refresh modal
        openDailyLogin();
    }

    // ─── RENDER MODAL ───
    window.openDailyLogin = function() {
        ensureDailyLoginState();
        var existing = document.getElementById('daily-login-modal');
        if (existing) existing.remove();

        var currentDay = getCurrentDay();
        var claimable = canClaimToday();
        var streak = state.dailyLogin.streak || 0;

        var modal = document.createElement('div');
        modal.id = 'daily-login-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:12px;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

        var streakFire = streak >= 7 ? '🔥🔥🔥' : streak >= 3 ? '🔥🔥' : streak >= 1 ? '🔥' : '';

        var html = '<div style="background:linear-gradient(135deg,rgba(15,10,30,0.97),rgba(20,15,40,0.97));border:2px solid rgba(251,191,36,0.3);border-radius:16px;max-width:420px;width:100%;max-height:85vh;overflow-y:auto;padding:16px;box-shadow:0 0 60px rgba(251,191,36,0.1);">';
        
        // Header
        html += '<div style="text-align:center;margin-bottom:12px;border-bottom:2px solid rgba(251,191,36,0.15);padding-bottom:10px;">';
        html += '<div style="font-size:20px;margin-bottom:4px;">📅</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:2px;">Daily Login</div>';
        html += '<div style="font-size:9px;color:rgba(251,191,36,0.6);margin-top:4px;">Day ' + currentDay + ' of 28 ' + streakFire + '</div>';
        html += '<div style="font-size:8px;color:#f97316;margin-top:2px;">' + streak + ' Day Streak</div>';
        html += '</div>';

        // Calendar Grid
        html += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:12px;">';
        
        // Day headers
        var dayLabels = ['M','T','W','T','F','S','S'];
        for (var d = 0; d < 7; d++) {
            html += '<div style="text-align:center;font-size:7px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;">' + dayLabels[d] + '</div>';
        }

        for (var i = 0; i < 28; i++) {
            var dayInfo = DAILY_REWARDS[i];
            var dayN = i + 1;
            var isClaimed = state.dailyLogin.claimed.includes(dayN);
            var isCurrent = dayN === currentDay;
            var isFuture = dayN > currentDay;
            var isMilestone = dayInfo.milestone;

            var cellBg = isClaimed ? 'rgba(34,197,94,0.2)' : isCurrent ? 'rgba(251,191,36,0.25)' : 'rgba(30,25,50,0.6)';
            var cellBorder = isClaimed ? 'rgba(34,197,94,0.4)' : isCurrent ? 'rgba(251,191,36,0.6)' : isMilestone ? 'rgba(168,85,247,0.4)' : 'rgba(100,100,130,0.2)';
            var cellShadow = isCurrent && claimable ? '0 0 12px rgba(251,191,36,0.3)' : 'none';
            var cellAnim = isCurrent && claimable ? 'animation:dl-pulse 1.5s ease-in-out infinite;' : '';

            html += '<div style="background:' + cellBg + ';border:1px solid ' + cellBorder + ';border-radius:6px;padding:3px 2px;text-align:center;position:relative;box-shadow:' + cellShadow + ';' + cellAnim + '">';
            html += '<div style="font-size:7px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;">D' + dayN + '</div>';
            html += '<div style="font-size:14px;margin:2px 0;">' + (isClaimed ? '✅' : dayInfo.icon) + '</div>';
            html += '<div style="font-size:6px;color:' + (isMilestone ? '#a855f7' : 'rgba(255,255,255,0.5)') + ';font-family:\'Press Start 2P\',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + dayInfo.amount + '</div>';
            if (isFuture) html += '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;">🔒</div>';
            html += '</div>';
        }
        html += '</div>';

        // Claim Button
        if (claimable) {
            var todayReward = DAILY_REWARDS[currentDay - 1];
            html += '<button onclick="claimDailyReward()" style="width:100%;padding:12px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;font-family:\'Press Start 2P\',monospace;font-size:10px;border:2px solid #fbbf24;border-radius:8px;cursor:pointer;text-transform:uppercase;letter-spacing:1px;font-weight:900;box-shadow:0 0 20px rgba(251,191,36,0.3);transition:all 0.2s;">';
            html += '🎁 Claim Day ' + currentDay + ': ' + todayReward.label;
            html += '</button>';
        } else {
            html += '<div style="width:100%;padding:12px;background:rgba(30,25,50,0.6);color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;font-size:9px;border:1px solid rgba(100,100,130,0.2);border-radius:8px;text-align:center;text-transform:uppercase;">✅ Today\'s Reward Claimed — Come Back Tomorrow!</div>';
        }

        // Close button
        html += '<button onclick="document.getElementById(\'daily-login-modal\').remove()" style="width:100%;margin-top:8px;padding:8px;background:none;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;font-size:8px;border:1px solid rgba(100,100,130,0.2);border-radius:6px;cursor:pointer;">CLOSE</button>';

        html += '</div>';
        modal.innerHTML = html;

        // Inject pulse animation
        if (!document.getElementById('daily-login-css')) {
            var style = document.createElement('style');
            style.id = 'daily-login-css';
            style.textContent = '@keyframes dl-pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.05); box-shadow:0 0 16px rgba(251,191,36,0.4); } }';
            document.head.appendChild(style);
        }

        document.body.appendChild(modal);
    };

    // Expose claim function
    window.claimDailyReward = claimDailyReward;

    // Auto-popup on game start (delayed)
    var _origStartGameEngine = window.startGameEngine;
    if (typeof _origStartGameEngine === 'function') {
        window.startGameEngine = function() {
            _origStartGameEngine.apply(this, arguments);
            setTimeout(function() {
                // Don't pop up daily login if intro cutscene is playing
                var cutsceneOverlay = document.getElementById('story-cutscene-overlay');
                if (cutsceneOverlay && !cutsceneOverlay.classList.contains('hidden')) {
                    // Retry after cutscene likely finishes
                    setTimeout(function() {
                        ensureDailyLoginState();
                        if (canClaimToday()) openDailyLogin();
                    }, 30000);
                    return;
                }
                ensureDailyLoginState();
                if (canClaimToday()) {
                    openDailyLogin();
                }
            }, 3000);
        };
    }

    // =====================================================
    // CHARACTER COMBAT DIALOGUE — Funny TBBT quotes
    // =====================================================
    var COMBAT_QUOTES = {
        sheldon: [
            'Bazinga!', 'I\'m not crazy!', 'This is my spot!',
            'Soft kitty...', 'Knock knock!', 'I\'m a physicist!',
            'Obviously.', 'Math is nature\'s language!'
        ],
        penny: [
            'Holy crap!', 'Oh, honey...', 'Shoes!',
            'Sweetie, no.', 'That\'s adorable.', 'Ugh, nerds!'
        ],
        leonard: [
            'For science!', 'I\'m the cool one!', 'IQ: 173!',
            'Experimental!', 'Fascinating!', 'Take that!'
        ],
        howard: [
            'Hello ladies~', 'I went to SPACE!', 'Engineering!',
            'Ma would kill me!', 'Hoo-witz!', 'NASA trained!'
        ],
        raj: [
            'Dude!', 'New Delhi style!', 'For Cinnamon!',
            'I have a Yorkie!', 'Namaste!', 'So pretty...'
        ],
        amy: [
            'Neurobiology!', 'Bestie!', 'Brain time!',
            'My boyfriend\'s a genius!', 'Fascinating!', 'Science!'
        ],
        bernie: [
            'DON\'T YELL AT ME!', 'Howie!', 'Virus time!',
            'My voice is FINE!', 'Micro attack!', 'Mama bear!'
        ],
        stuart: [
            'Business is fine...', 'Comic power!', 'I\'m not sad!',
            'At least I tried!', 'For the store!', 'Graphic novel!'
        ],
        mary: [
            'Jesus, take the wheel!', 'Bless your heart!', 'Oh Shelly!',
            'Lord have mercy!', 'Amen to that!'
        ],
        beverly: [
            'Interesting pathology.', 'Textbook behavior.', 'Noted.',
            'How does that make you feel?', 'Predictable.'
        ],
        kripke: [
            'Bawwy Kwipke!', 'Suck it, Cooper!', 'Waser beam!',
            'I\'m the weal genius!', 'Kwipke wules!'
        ],
        wil: [
            'Wheaton out!', 'Evil Wil mode!', 'Roll for damage!',
            'Critical hit!', 'D20 power!'
        ],
        bert: [
            'Geology rocks!', 'It\'s a gneiss day!', 'Boulder smash!',
            'Mineral power!', 'Sedimentary!'
        ],
        leslie: [
            'Dumbass.', 'Loop quantum!', 'Take notes, Cooper.',
            'String theory is wrong!', 'Physics!'
        ],
        emily: [
            'Dermatology!', 'Skin deep!', 'Creepy but cute.',
            'My scalpel!', 'Diagnosis: pain!'
        ],
        proton: [
            'Professor Proton!', 'Science is fun!', 'Let me show you!',
            'Elementary!', 'Old school science!'
        ],
        zack: [
            'Sup dudes!', 'I\'m pretty strong!', 'Muscles!',
            'That was awesome!', 'Zack attack!'
        ],
        denise: [
            'Read this comic!', 'The store needs me!', 'Stuart, focus!',
            'Graphic novel!', 'Great issue!'
        ]
    };

    var activeBubbles = {};

    function showCombatBubble(charKey) {
        // 15% chance
        if (Math.random() > 0.15) return;
        // Don't spam - max 1 per character
        if (activeBubbles[charKey]) return;

        var quotes = COMBAT_QUOTES[charKey];
        if (!quotes || quotes.length === 0) return;

        var el = document.getElementById('live-character-' + charKey);
        if (!el) return;

        var quote = quotes[Math.floor(Math.random() * quotes.length)];

        var bubble = document.createElement('div');
        bubble.className = 'combat-speech-bubble';
        bubble.textContent = quote;
        bubble.style.cssText = 'position:absolute;top:-28px;left:50%;transform:translateX(-50%);' +
            'background:rgba(0,0,0,0.9);color:#fef3c7;border:1px solid rgba(251,191,36,0.4);' +
            'border-radius:6px;padding:2px 6px;font-family:\'Press Start 2P\',monospace;font-size:5px;' +
            'white-space:nowrap;z-index:100;pointer-events:none;' +
            'animation:bubble-pop 0.3s ease-out;box-shadow:0 2px 8px rgba(0,0,0,0.5);';

        // Speech bubble tail
        var tail = document.createElement('div');
        tail.style.cssText = 'position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);' +
            'width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;' +
            'border-top:4px solid rgba(0,0,0,0.9);';
        bubble.appendChild(tail);

        el.style.position = 'relative';
        el.appendChild(bubble);
        activeBubbles[charKey] = true;

        setTimeout(function() {
            bubble.style.opacity = '0';
            bubble.style.transition = 'opacity 0.3s';
            setTimeout(function() {
                if (bubble.parentNode) bubble.remove();
                delete activeBubbles[charKey];
            }, 300);
        }, 1500);
    }

    // Inject bubble animation CSS
    if (!document.getElementById('combat-bubble-css')) {
        var style = document.createElement('style');
        style.id = 'combat-bubble-css';
        style.textContent = '@keyframes bubble-pop { 0% { transform:translateX(-50%) scale(0) translateY(5px); opacity:0; } 100% { transform:translateX(-50%) scale(1) translateY(0); opacity:1; } }';
        document.head.appendChild(style);
    }

    // Hook into swapCharacterFrame to trigger combat dialogue
    var _origSwapFrame = window.swapCharacterFrame;
    if (typeof _origSwapFrame === 'function') {
        window.swapCharacterFrame = function(key, animState, durationMs) {
            _origSwapFrame.call(this, key, animState, durationMs);
            if (animState === 'attack') {
                showCombatBubble(key);
            }
        };
    }

    console.log('[DailyLogin] Daily login calendar loaded.');
    console.log('[CombatDialogue] Character combat quotes loaded for', Object.keys(COMBAT_QUOTES).length, 'characters.');
})();
