// ============================================================
//  TBBT Idle Game — Season Battle Pass Module
//  Self-contained IIFE with injected CSS, state management,
//  reward tracks, premium purchase, and full modal UI.
// ============================================================
(function() {
    'use strict';

    // ----------------------------------------------------------
    //  Injected CSS
    // ----------------------------------------------------------
    var css = document.createElement('style');
    css.textContent = [
        '/* ---- Battle Pass Modal ---- */',
        '.bp-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.82);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s ease}',
        '.bp-overlay.bp-show{opacity:1}',

        '.bp-modal{position:relative;width:96vw;max-width:960px;max-height:92vh;background:linear-gradient(165deg,#0f172a 0%,#1e293b 50%,#0f172a 100%);border:1px solid rgba(245,158,11,.35);border-radius:16px;box-shadow:0 0 60px rgba(245,158,11,.15),0 25px 50px rgba(0,0,0,.6);display:flex;flex-direction:column;overflow:hidden;transform:scale(.92);transition:transform .3s ease}',
        '.bp-overlay.bp-show .bp-modal{transform:scale(1)}',

        '/* Header */',
        '.bp-header{padding:20px 24px 12px;text-align:center;border-bottom:1px solid rgba(245,158,11,.2);flex-shrink:0}',
        '.bp-title{font-size:28px;font-weight:800;background:linear-gradient(135deg,#f59e0b,#fbbf24,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:2px;text-transform:uppercase;margin:0}',
        '.bp-subtitle{font-size:13px;color:#94a3b8;margin-top:4px}',
        '.bp-timer{font-size:12px;color:#fbbf24;margin-top:6px;font-family:monospace}',

        '/* Close */',
        '.bp-close{position:absolute;top:12px;right:16px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#e2e8f0;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s,border-color .2s}',
        '.bp-close:hover{background:rgba(245,158,11,.2);border-color:#f59e0b}',

        '/* Level / XP */',
        '.bp-level-bar{padding:12px 24px;box-sizing:border-box;flex-shrink:0}',
        '.bp-level-info{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}',
        '.bp-level-num{font-size:18px;font-weight:700;color:#fbbf24}',
        '.bp-xp-text{font-size:12px;color:#94a3b8}',
        '.bp-xp-track{height:10px;background:rgba(255,255,255,.08);border-radius:6px;overflow:hidden}',
        '.bp-xp-fill{height:100%;background:linear-gradient(90deg,#f59e0b,#fbbf24);border-radius:6px;transition:width .4s ease}',

        '/* Track */',
        '.bp-track-wrap{flex:1;overflow-y:auto;overflow-x:hidden;padding:0 16px 16px;min-height:0}',
        '.bp-track{display:flex;gap:8px;overflow-x:auto;padding:12px 4px 16px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}',
        '.bp-track::-webkit-scrollbar{height:6px}',
        '.bp-track::-webkit-scrollbar-track{background:rgba(255,255,255,.04);border-radius:3px}',
        '.bp-track::-webkit-scrollbar-thumb{background:rgba(245,158,11,.4);border-radius:3px}',

        '/* Node */',
        '.bp-node{flex:0 0 88px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 4px;box-sizing:border-box;border-radius:12px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02);transition:border-color .3s,box-shadow .3s}',
        '.bp-node.bp-current{border-color:rgba(245,158,11,.6);box-shadow:0 0 18px rgba(245,158,11,.25)}',
        '.bp-node.bp-locked{opacity:.4}',

        '.bp-node-lvl{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase}',
        '.bp-node-lvl span{color:#fbbf24}',

        '/* Reward card */',
        '.bp-reward{width:72px;min-height:72px;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 4px;box-sizing:border-box;position:relative;cursor:default;transition:transform .2s}',
        '.bp-reward:hover{transform:scale(1.06)}',
        '.bp-reward-free{background:linear-gradient(135deg,rgba(16,185,129,.15),rgba(16,185,129,.05));border:1px solid rgba(16,185,129,.3)}',
        '.bp-reward-prem{background:linear-gradient(135deg,rgba(245,158,11,.18),rgba(245,158,11,.06));border:1px solid rgba(245,158,11,.35)}',
        '.bp-reward-icon{font-size:22px;line-height:1}',
        '.bp-reward-desc{font-size:9px;color:#cbd5e1;text-align:center;margin-top:3px;line-height:1.2}',
        '.bp-reward-claimed{position:absolute;inset:0;border-radius:10px;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;font-size:22px}',
        '.bp-reward-lock{position:absolute;top:3px;right:3px;font-size:12px}',

        '/* Claim button */',
        '.bp-claim-btn{font-size:9px;font-weight:700;padding:3px 8px;box-sizing:border-box;border-radius:6px;border:none;cursor:pointer;text-transform:uppercase;letter-spacing:.5px;transition:transform .15s,box-shadow .15s;margin-top:2px}',
        '.bp-claim-btn:hover{transform:scale(1.08)}',
        '.bp-claim-btn:active{transform:scale(.96)}',
        '.bp-claim-free{background:linear-gradient(135deg,#10b981,#059669);color:#fff;box-shadow:0 2px 8px rgba(16,185,129,.4)}',
        '.bp-claim-prem{background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;box-shadow:0 2px 8px rgba(245,158,11,.4)}',

        '@keyframes bp-pulse{0%,100%{box-shadow:0 0 4px rgba(245,158,11,.3)}50%{box-shadow:0 0 14px rgba(245,158,11,.7)}}',
        '.bp-claim-btn.bp-pulse-anim{animation:bp-pulse 1.6s infinite}',

        '/* Premium button */',
        '.bp-premium-bar{padding:12px 24px;box-sizing:border-box;border-top:1px solid rgba(245,158,11,.15);flex-shrink:0;text-align:center}',
        '.bp-premium-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 28px;box-sizing:border-box;border-radius:10px;border:1px solid #f59e0b;background:linear-gradient(135deg,rgba(245,158,11,.2),rgba(217,119,6,.12));color:#fbbf24;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:1px;transition:background .2s,box-shadow .2s,transform .15s}',
        '.bp-premium-btn:hover{background:linear-gradient(135deg,rgba(245,158,11,.35),rgba(217,119,6,.25));box-shadow:0 0 20px rgba(245,158,11,.3);transform:scale(1.03)}',
        '.bp-premium-btn:active{transform:scale(.97)}',
        '.bp-premium-owned{color:#10b981;font-size:13px;font-weight:600}',

        '/* Level Up Toast */',
        '@keyframes bp-toast-in{0%{transform:translateY(40px) scale(.9);opacity:0}100%{transform:translateY(0) scale(1);opacity:1}}',
        '@keyframes bp-toast-out{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(40px) scale(.9);opacity:0}}',
        '.bp-toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);z-index:10001;padding:12px 28px;box-sizing:border-box;border-radius:12px;background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid rgba(245,158,11,.5);color:#fbbf24;font-size:16px;font-weight:700;box-shadow:0 0 30px rgba(245,158,11,.3);pointer-events:none;animation:bp-toast-in .4s ease forwards}',
        '.bp-toast.bp-toast-hide{animation:bp-toast-out .35s ease forwards}',

        '/* Separator line between free & premium */',
        '.bp-sep{width:100%;height:1px;background:rgba(255,255,255,.08);margin:2px 0}'
    ].join('\n');
    document.head.appendChild(css);

    // ----------------------------------------------------------
    //  Reward Data
    // ----------------------------------------------------------
    var FREE_REWARDS = [
        { level: 1,  type: 'money',     amount: 500,   icon: '\uD83D\uDCB5', desc: '$500' },
        { level: 2,  type: 'resources',  items: { stone: 20, iron: 20 }, icon: '\u26CF\uFE0F', desc: '20 Stone + 20 Iron' },
        { level: 3,  type: 'food',       amount: 5,     icon: '\uD83C\uDF55', desc: '5 Random Food' },
        { level: 4,  type: 'gachaCoins',  amount: 200,   icon: '\uD83C\uDFB0', desc: '200 Gacha Coins' },
        { level: 5,  type: 'money',      amount: 1000,  icon: '\uD83D\uDCB5', desc: '$1,000' },
        { level: 6,  type: 'resources',  items: { stone: 30, iron: 30 }, icon: '\u26CF\uFE0F', desc: '30 Stone + 30 Iron' },
        { level: 7,  type: 'food',       amount: 8,     icon: '\uD83C\uDF55', desc: '8 Random Food' },
        { level: 8,  type: 'money',      amount: 1200,  icon: '\uD83D\uDCB5', desc: '$1,200' },
        { level: 9,  type: 'resources',  items: { stone: 40, iron: 40, scrap: 20 }, icon: '\u26CF\uFE0F', desc: '40 Stone + 40 Iron + 20 Scrap' },
        { level: 10, type: 'gachaCoins',  amount: 500,   icon: '\uD83C\uDFB0', desc: '500 Gacha Coins' },
        { level: 11, type: 'food',       amount: 10,    icon: '\uD83C\uDF55', desc: '10 Random Food' },
        { level: 12, type: 'resources',  items: { stone: 50, iron: 50 }, icon: '\u26CF\uFE0F', desc: '50 Stone + 50 Iron' },
        { level: 13, type: 'money',      amount: 2500,  icon: '\uD83D\uDCB5', desc: '$2,500' },
        { level: 14, type: 'food',       amount: 12,    icon: '\uD83C\uDF55', desc: '12 Random Food' },
        { level: 15, type: 'money',      amount: 3000,  icon: '\uD83D\uDCB5', desc: '$3,000' },
        { level: 16, type: 'resources',  items: { stone: 60, iron: 60, gold: 10 }, icon: '\uD83E\uDD47', desc: '60 Stone + 60 Iron + 10 Gold' },
        { level: 17, type: 'food',       amount: 15,    icon: '\uD83C\uDF55', desc: '15 Random Food' },
        { level: 18, type: 'money',      amount: 4000,  icon: '\uD83D\uDCB5', desc: '$4,000' },
        { level: 19, type: 'resources',  items: { stone: 80, iron: 80, gold: 15 }, icon: '\uD83E\uDD47', desc: '80 Stone + 80 Iron + 15 Gold' },
        { level: 20, type: 'gachaCoins',  amount: 1000,  icon: '\uD83C\uDFB0', desc: '1,000 Gacha Coins' },
        { level: 21, type: 'food',       amount: 18,    icon: '\uD83C\uDF55', desc: '18 Random Food' },
        { level: 22, type: 'resources',  items: { stone: 100, iron: 100, gold: 20 }, icon: '\uD83E\uDD47', desc: '100 Stone + 100 Iron + 20 Gold' },
        { level: 23, type: 'money',      amount: 6000,  icon: '\uD83D\uDCB5', desc: '$6,000' },
        { level: 24, type: 'food',       amount: 20,    icon: '\uD83C\uDF55', desc: '20 Random Food' },
        { level: 25, type: 'gachaCoins',  amount: 1500,  icon: '\uD83C\uDFB0', desc: '1,500 Gacha Coins' },
        { level: 26, type: 'resources',  items: { stone: 120, iron: 120, gold: 30, scrap: 50 }, icon: '\uD83E\uDD47', desc: '120 Stone + 120 Iron + 30 Gold + 50 Scrap' },
        { level: 27, type: 'food',       amount: 25,    icon: '\uD83C\uDF55', desc: '25 Random Food' },
        { level: 28, type: 'money',      amount: 10000, icon: '\uD83D\uDCB5', desc: '$10,000' },
        { level: 29, type: 'resources',  items: { stone: 150, iron: 150, gold: 40, diamond: 5 }, icon: '\uD83D\uDC8E', desc: '150 Stone + 150 Iron + 40 Gold + 5 Diamond' },
        { level: 30, type: 'money',      amount: 15000, icon: '\uD83D\uDCB5', desc: '$15,000' }
    ];

    var PREMIUM_REWARDS = {
        5:  { type: 'diamonds',  amount: 50,   icon: '\uD83D\uDC8E', desc: '50 Diamonds' },
        10: { type: 'equipment', rarity: 'epic', icon: '\u2694\uFE0F', desc: 'Epic Equipment' },
        15: { type: 'diamonds',  amount: 100,  icon: '\uD83D\uDC8E', desc: '100 Diamonds + Title', title: 'Season Veteran' },
        20: { type: 'gachaCoins', amount: 200, icon: '\uD83C\uDFB0', desc: '200 Gacha Coins' },
        25: { type: 'equipment', rarity: 'legendary', icon: '\uD83C\uDF1F', desc: 'Legendary Equipment' },
        30: { type: 'diamonds',  amount: 300,  icon: '\uD83D\uDC8E', desc: '300 Diamonds + Title + 10 BP', title: 'Season Champion', bp: 10 }
    };

    var FOOD_KEYS = ['chinese','pizza','cupcakes','burger','tacos','indian','hotdog','pretzel','smoothie','energydrink','cheesecake','shawarma'];

    // ----------------------------------------------------------
    //  State Initialization
    // ----------------------------------------------------------
    function initState() {
        if (!state.battlePass) {
            state.battlePass = {
                season: 0,
                level: 0,
                xp: 0,
                premium: false,
                claimed: [],
                premiumClaimed: [],
                seasonEnd: 0
            };
        }
        // Ensure arrays exist (guard against corrupted saves)
        var bp = state.battlePass;
        if (!Array.isArray(bp.claimed)) bp.claimed = [];
        if (!Array.isArray(bp.premiumClaimed)) bp.premiumClaimed = [];
    }

    // ----------------------------------------------------------
    //  Season Check / Reset
    // ----------------------------------------------------------
    function checkSeason() {
        var bp = state.battlePass;
        var now = Date.now();
        if (!bp.seasonEnd || bp.seasonEnd < now) {
            bp.season = (bp.season || 0) + 1;
            bp.level = 0;
            bp.xp = 0;
            bp.premium = false;
            bp.claimed = [];
            bp.premiumClaimed = [];
            bp.seasonEnd = now + (30 * 24 * 60 * 60 * 1000);
            if (typeof saveProgress === 'function') saveProgress();
        }
    }

    // ----------------------------------------------------------
    //  XP Helpers
    // ----------------------------------------------------------
    function xpForLevel(lvl) {
        return 100 + (lvl * 20);
    }

    // ----------------------------------------------------------
    //  Level-Up Toast
    // ----------------------------------------------------------
    function showLevelToast(newLevel) {
        var existing = document.querySelector('.bp-toast');
        if (existing) existing.parentNode.removeChild(existing);

        var toast = document.createElement('div');
        toast.className = 'bp-toast';
        toast.textContent = '\u2B50 SEASON PASS LEVEL ' + newLevel + '!';
        document.body.appendChild(toast);

        setTimeout(function() {
            toast.classList.add('bp-toast-hide');
            setTimeout(function() {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 400);
        }, 3000);
    }

    // ----------------------------------------------------------
    //  Add XP  (exported globally)
    // ----------------------------------------------------------
    window.addBattlePassXP = function(amount, source) {
        if (!state.battlePass) return;
        checkSeason();

        var bp = state.battlePass;
        if (bp.level >= 30) return; // already max

        bp.xp += amount;
        var leveled = false;
        var needed = xpForLevel(bp.level);

        while (bp.xp >= needed && bp.level < 30) {
            bp.xp -= needed;
            bp.level += 1;
            leveled = true;
            showLevelToast(bp.level);
            needed = xpForLevel(bp.level);
        }

        if (bp.level >= 30) {
            bp.xp = 0; // cap at max
        }

        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();

        // Play sound on level up
        if (leveled && typeof SoundManager !== 'undefined' && SoundManager.playFX) {
            SoundManager.playFX('click');
        }
    };

    // ----------------------------------------------------------
    //  Reward Granting Helpers
    // ----------------------------------------------------------
    function grantReward(reward) {
        if (!reward) return;

        switch (reward.type) {
            case 'money':
                state.resources.money = (state.resources.money || 0) + reward.amount;
                break;

            case 'resources':
                if (reward.items) {
                    for (var key in reward.items) {
                        if (reward.items.hasOwnProperty(key)) {
                            state.resources[key] = (state.resources[key] || 0) + reward.items[key];
                        }
                    }
                }
                break;

            case 'food':
                var count = reward.amount || 1;
                for (var i = 0; i < count; i++) {
                    var fk = FOOD_KEYS[Math.floor(Math.random() * FOOD_KEYS.length)];
                    if (state.food) {
                        state.food[fk] = (state.food[fk] || 0) + 1;
                    }
                }
                break;

            case 'diamonds':
                state.resources.diamond = (state.resources.diamond || 0) + reward.amount;
                break;

            case 'gachaCoins':
                // No separate gacha currency — gacha uses money (100/pull)
                state.resources.money = (state.resources.money || 0) + reward.amount;
                break;

            case 'equipment':
                if (typeof generateEquipmentDrop === 'function') {
                    generateEquipmentDrop(50);
                } else {
                    // Fallback — give diamonds instead
                    var fallbackAmt = reward.rarity === 'legendary' ? 100 : 50;
                    state.resources.diamond = (state.resources.diamond || 0) + fallbackAmt;
                    if (typeof showGameAlert === 'function') {
                        showGameAlert('Equipment', 'Equipment system unavailable — received ' + fallbackAmt + ' \uD83D\uDC8E instead!');
                    }
                }
                break;
        }

        // Bonus handling (premium level 20)
        if (reward.bonus) {
            if (reward.bonus.money) {
                state.resources.money = (state.resources.money || 0) + reward.bonus.money;
            }
        }

        // Title handling
        if (reward.title) {
            if (typeof showGameAlert === 'function') {
                showGameAlert('Title Earned!', 'You earned the title: "' + reward.title + '"');
            }
        }

        // Bazinga Points
        if (reward.bp) {
            state.bazingaPoints = (state.bazingaPoints || 0) + reward.bp;
        }
    }

    // ----------------------------------------------------------
    //  Claim Functions
    // ----------------------------------------------------------
    function claimFreeReward(level) {
        var bp = state.battlePass;
        if (bp.level < level) {
            if (typeof showGameAlert === 'function') showGameAlert('Locked', 'Reach Season Pass level ' + level + ' first!');
            return false;
        }
        if (bp.claimed.indexOf(level) !== -1) {
            if (typeof showGameAlert === 'function') showGameAlert('Already Claimed', 'You already claimed this reward.');
            return false;
        }
        var reward = null;
        for (var i = 0; i < FREE_REWARDS.length; i++) {
            if (FREE_REWARDS[i].level === level) { reward = FREE_REWARDS[i]; break; }
        }
        if (!reward) return false;

        grantReward(reward);
        bp.claimed.push(level);

        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
        return true;
    }

    function claimPremiumReward(level) {
        var bp = state.battlePass;
        if (!bp.premium) {
            if (typeof showGameAlert === 'function') showGameAlert('Premium Required', 'Unlock the Premium Season Pass to claim this reward!');
            return false;
        }
        if (bp.level < level) {
            if (typeof showGameAlert === 'function') showGameAlert('Locked', 'Reach Season Pass level ' + level + ' first!');
            return false;
        }
        if (bp.premiumClaimed.indexOf(level) !== -1) {
            if (typeof showGameAlert === 'function') showGameAlert('Already Claimed', 'You already claimed this premium reward.');
            return false;
        }
        var reward = PREMIUM_REWARDS[level];
        if (!reward) return false;

        grantReward(reward);
        bp.premiumClaimed.push(level);

        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
        return true;
    }

    // ----------------------------------------------------------
    //  Buy Premium
    // ----------------------------------------------------------
    function buyPremium() {
        var bp = state.battlePass;
        if (bp.premium) {
            if (typeof showGameAlert === 'function') showGameAlert('Premium Active', 'You already own the Premium Season Pass!');
            return;
        }
        if ((state.resources.diamond || 0) < 500) {
            if (typeof showGameAlert === 'function') showGameAlert('Not Enough Diamonds', 'You need 500 \uD83D\uDC8E to unlock Premium. You have ' + (state.resources.diamond || 0) + '.');
            return;
        }
        state.resources.diamond -= 500;
        bp.premium = true;

        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
        if (typeof showGameAlert === 'function') showGameAlert('Premium Unlocked!', 'You unlocked the Premium Season Pass! Claim your premium rewards now.');
    }

    // ----------------------------------------------------------
    //  Timer Helper
    // ----------------------------------------------------------
    function formatCountdown(ms) {
        if (ms <= 0) return 'Season Ended';
        var secs = Math.floor(ms / 1000);
        var d = Math.floor(secs / 86400); secs %= 86400;
        var h = Math.floor(secs / 3600);  secs %= 3600;
        var m = Math.floor(secs / 60);    secs %= 60;
        var s = secs;
        return d + 'd ' + pad(h) + ':' + pad(m) + ':' + pad(s);
    }
    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    // ----------------------------------------------------------
    //  Open Battle Pass Modal  (exported globally)
    // ----------------------------------------------------------
    var activeOverlay = null;
    var timerInterval = null;

    window.openBattlePass = function() {
        if (activeOverlay) return; // prevent double-open

        checkSeason();
        var bp = state.battlePass;

        // ---- Overlay ----
        var overlay = document.createElement('div');
        overlay.className = 'bp-overlay';
        activeOverlay = overlay;

        // ---- Modal ----
        var modal = document.createElement('div');
        modal.className = 'bp-modal';

        // ---- Close Button ----
        var closeBtn = document.createElement('button');
        closeBtn.className = 'bp-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = closeBP;
        modal.appendChild(closeBtn);

        // ---- Header ----
        var header = document.createElement('div');
        header.className = 'bp-header';

        var title = document.createElement('div');
        title.className = 'bp-title';
        title.textContent = 'THE SEASON PASS';
        header.appendChild(title);

        var sub = document.createElement('div');
        sub.className = 'bp-subtitle';
        sub.textContent = 'Season ' + bp.season;
        header.appendChild(sub);

        var timer = document.createElement('div');
        timer.className = 'bp-timer';
        timer.id = 'bp-timer-display';
        header.appendChild(timer);

        modal.appendChild(header);

        // ---- Level / XP Bar ----
        var levelBar = document.createElement('div');
        levelBar.className = 'bp-level-bar';

        var levelInfo = document.createElement('div');
        levelInfo.className = 'bp-level-info';

        var levelNum = document.createElement('div');
        levelNum.className = 'bp-level-num';
        levelNum.textContent = bp.level >= 30 ? 'Level MAX' : 'Level ' + bp.level;
        levelInfo.appendChild(levelNum);

        var xpNeeded = bp.level >= 30 ? 1 : xpForLevel(bp.level);
        var xpText = document.createElement('div');
        xpText.className = 'bp-xp-text';
        xpText.textContent = bp.level >= 30 ? 'MAX' : bp.xp + ' / ' + xpNeeded + ' XP';
        levelInfo.appendChild(xpText);
        levelBar.appendChild(levelInfo);

        var xpTrack = document.createElement('div');
        xpTrack.className = 'bp-xp-track';
        var xpFill = document.createElement('div');
        xpFill.className = 'bp-xp-fill';
        var pct = bp.level >= 30 ? 100 : Math.min(100, Math.floor((bp.xp / xpNeeded) * 100));
        xpFill.style.width = pct + '%';
        xpTrack.appendChild(xpFill);
        levelBar.appendChild(xpTrack);
        modal.appendChild(levelBar);

        // ---- Track ----
        var trackWrap = document.createElement('div');
        trackWrap.className = 'bp-track-wrap';

        var track = document.createElement('div');
        track.className = 'bp-track';

        for (var lvl = 1; lvl <= 30; lvl++) {
            track.appendChild(buildNode(lvl, bp));
        }
        trackWrap.appendChild(track);
        modal.appendChild(trackWrap);

        // ---- Premium Bar ----
        var premBar = document.createElement('div');
        premBar.className = 'bp-premium-bar';

        if (bp.premium) {
            var ownedTag = document.createElement('div');
            ownedTag.className = 'bp-premium-owned';
            ownedTag.textContent = '\u2714 Premium Season Pass Active';
            premBar.appendChild(ownedTag);
        } else {
            var premBtn = document.createElement('button');
            premBtn.className = 'bp-premium-btn';
            premBtn.innerHTML = '\uD83D\uDC8E UNLOCK PREMIUM &mdash; 500 \uD83D\uDC8E';
            premBtn.onclick = function() {
                buyPremium();
                closeBP();
                window.openBattlePass();
            };
            premBar.appendChild(premBtn);
        }
        modal.appendChild(premBar);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(function() {
            overlay.classList.add('bp-show');
        });

        // Scroll to current level
        setTimeout(function() {
            var curNode = track.querySelector('.bp-current');
            if (curNode) {
                curNode.scrollIntoView({ inline: 'center', behavior: 'smooth' });
            }
        }, 350);

        // Start timer
        updateTimer(timer, bp);
        timerInterval = setInterval(function() { updateTimer(timer, bp); }, 1000);

        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeBP();
        });
    };

    // ----------------------------------------------------------
    //  Build a single track node
    // ----------------------------------------------------------
    function buildNode(lvl, bp) {
        var node = document.createElement('div');
        node.className = 'bp-node';

        var reached = bp.level >= lvl;
        var isCurrent = bp.level === lvl || (bp.level >= 30 && lvl === 30);

        if (isCurrent) node.classList.add('bp-current');
        if (!reached) node.classList.add('bp-locked');

        // Level label
        var label = document.createElement('div');
        label.className = 'bp-node-lvl';
        label.innerHTML = 'LV <span>' + lvl + '</span>';
        node.appendChild(label);

        // Free reward
        var freeReward = null;
        for (var i = 0; i < FREE_REWARDS.length; i++) {
            if (FREE_REWARDS[i].level === lvl) { freeReward = FREE_REWARDS[i]; break; }
        }
        if (freeReward) {
            var freeClaimed = bp.claimed.indexOf(lvl) !== -1;
            var freeCard = buildRewardCard(freeReward, 'free', reached, freeClaimed, function() {
                if (claimFreeReward(lvl)) { closeBP(); window.openBattlePass(); }
            });
            node.appendChild(freeCard);
        }

        // Separator
        var sep = document.createElement('div');
        sep.className = 'bp-sep';
        node.appendChild(sep);

        // Premium reward (only at multiples of 5)
        var premReward = PREMIUM_REWARDS[lvl];
        if (premReward) {
            var premClaimed = bp.premiumClaimed.indexOf(lvl) !== -1;
            var premCard = buildRewardCard(premReward, 'premium', reached, premClaimed, function() {
                if (claimPremiumReward(lvl)) { closeBP(); window.openBattlePass(); }
            }, bp.premium);
            node.appendChild(premCard);
        } else {
            // Empty placeholder for alignment
            var empty = document.createElement('div');
            empty.className = 'bp-reward';
            empty.style.border = '1px dashed rgba(255,255,255,.06)';
            empty.style.opacity = '0.2';
            empty.innerHTML = '<div style="font-size:11px;color:#475569">—</div>';
            node.appendChild(empty);
        }

        return node;
    }

    // ----------------------------------------------------------
    //  Build a reward card
    // ----------------------------------------------------------
    function buildRewardCard(reward, trackType, reached, claimed, onClaim, hasPremium) {
        var card = document.createElement('div');
        card.className = 'bp-reward ' + (trackType === 'free' ? 'bp-reward-free' : 'bp-reward-prem');

        // Icon
        var icon = document.createElement('div');
        icon.className = 'bp-reward-icon';
        icon.textContent = reward.icon;
        card.appendChild(icon);

        // Description
        var desc = document.createElement('div');
        desc.className = 'bp-reward-desc';
        desc.textContent = reward.desc;
        card.appendChild(desc);

        if (claimed) {
            // Claimed overlay
            var claimedEl = document.createElement('div');
            claimedEl.className = 'bp-reward-claimed';
            claimedEl.textContent = '\u2705';
            card.appendChild(claimedEl);
        } else if (reached) {
            if (trackType === 'premium' && !hasPremium) {
                // Lock icon for premium not owned
                var lock = document.createElement('div');
                lock.className = 'bp-reward-lock';
                lock.textContent = '\uD83D\uDD12';
                card.appendChild(lock);
            } else {
                // Claim button
                var btn = document.createElement('button');
                btn.className = 'bp-claim-btn bp-pulse-anim ' + (trackType === 'free' ? 'bp-claim-free' : 'bp-claim-prem');
                btn.textContent = 'CLAIM';
                btn.onclick = function(e) {
                    e.stopPropagation();
                    if (onClaim) onClaim();
                };
                card.appendChild(btn);
            }
        } else {
            // Not reached — show lock for premium
            if (trackType === 'premium' && !hasPremium) {
                var lock2 = document.createElement('div');
                lock2.className = 'bp-reward-lock';
                lock2.textContent = '\uD83D\uDD12';
                card.appendChild(lock2);
            }
        }

        return card;
    }

    // ----------------------------------------------------------
    //  Timer update
    // ----------------------------------------------------------
    function updateTimer(el, bp) {
        if (!el) return;
        var remaining = (bp.seasonEnd || 0) - Date.now();
        el.textContent = '\u23F3 ' + formatCountdown(remaining);
    }

    // ----------------------------------------------------------
    //  Close Modal
    // ----------------------------------------------------------
    function closeBP() {
        if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
        if (activeOverlay) {
            activeOverlay.classList.remove('bp-show');
            var ref = activeOverlay;
            setTimeout(function() {
                if (ref.parentNode) ref.parentNode.removeChild(ref);
            }, 350);
            activeOverlay = null;
        }
    }

    // ----------------------------------------------------------
    //  Boot
    // ----------------------------------------------------------
    initState();
    checkSeason();

})();
