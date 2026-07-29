// ============================================================
//  TBBT Idle Game — Raj's Trading Post Module
//  Standalone IIFE: resource exchange with daily rotating rates,
//  special deals, and trade limits.
// ============================================================
(function() {
    'use strict';

    // ----------------------------------------------------------
    //  Injected CSS
    // ----------------------------------------------------------
    var css = document.createElement('style');
    css.textContent = [
        '/* ---- Trading Post Modal ---- */',
        '.tp-overlay{position:fixed;inset:0;z-index:100001;background:rgba(0,0,0,.85);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s ease}',
        '.tp-overlay.tp-show{opacity:1}',

        '.tp-modal{position:relative;width:96vw;max-width:520px;max-height:92vh;background:linear-gradient(165deg,#1a1207 0%,#2d1f0e 50%,#1a1207 100%);border:1px solid rgba(245,158,11,.45);border-radius:16px;box-shadow:0 0 60px rgba(245,158,11,.18),0 25px 50px rgba(0,0,0,.6);display:flex;flex-direction:column;overflow:hidden;transform:scale(.92);transition:transform .3s ease}',
        '.tp-overlay.tp-show .tp-modal{transform:scale(1)}',

        '/* Header */',
        '.tp-header{padding:18px 20px 12px;text-align:center;border-bottom:1px solid rgba(245,158,11,.25);flex-shrink:0;background:linear-gradient(180deg,rgba(245,158,11,.12),transparent)}',
        '.tp-title{font-size:22px;font-weight:800;background:linear-gradient(135deg,#f59e0b,#fbbf24,#f97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:2px;text-transform:uppercase;margin:0}',
        '.tp-subtitle{font-size:11px;color:#b8860b;margin-top:4px;letter-spacing:1px}',
        '.tp-trades-counter{display:inline-block;margin-top:8px;padding:4px 14px;box-sizing:border-box;border-radius:8px;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);font-size:12px;font-weight:700;color:#fbbf24;letter-spacing:.5px}',

        '/* Close */',
        '.tp-close{position:absolute;top:12px;right:16px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#e2e8f0;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s,border-color .2s}',
        '.tp-close:hover{background:rgba(245,158,11,.2);border-color:#f59e0b}',

        '/* Grid */',
        '.tp-grid{flex:1;overflow-y:auto;padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px;min-height:0;scrollbar-width:thin;scrollbar-color:rgba(245,158,11,.3) transparent}',
        '.tp-grid::-webkit-scrollbar{width:6px}',
        '.tp-grid::-webkit-scrollbar-track{background:rgba(255,255,255,.03)}',
        '.tp-grid::-webkit-scrollbar-thumb{background:rgba(245,158,11,.3);border-radius:3px}',

        '/* Card */',
        '.tp-card{padding:12px 10px;box-sizing:border-box;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);display:flex;flex-direction:column;gap:6px;transition:border-color .3s,box-shadow .3s}',
        '.tp-card:hover{border-color:rgba(245,158,11,.3)}',
        '.tp-card-special{border-color:rgba(245,158,11,.6) !important;box-shadow:0 0 20px rgba(245,158,11,.2);background:linear-gradient(135deg,rgba(245,158,11,.08),rgba(217,119,6,.04))}',

        '.tp-deal-badge{display:inline-block;padding:2px 8px;box-sizing:border-box;border-radius:6px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-size:9px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;align-self:flex-start}',

        '.tp-rate{font-size:13px;font-weight:700;color:#e2e8f0;text-align:center;line-height:1.4}',
        '.tp-rate-arrow{color:#f59e0b;font-weight:800;margin:0 2px}',
        '.tp-balance{font-size:10px;color:#94a3b8;text-align:center}',

        '/* Multiplier buttons */',
        '.tp-mult-row{display:flex;gap:4px;justify-content:center}',
        '.tp-mult-btn{flex:1;padding:4px 0;border-radius:6px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#cbd5e1;font-size:10px;font-weight:700;cursor:pointer;transition:all .15s}',
        '.tp-mult-btn:hover{background:rgba(245,158,11,.15);border-color:rgba(245,158,11,.4);color:#fbbf24}',
        '.tp-mult-btn.tp-mult-active{background:rgba(245,158,11,.25);border-color:#f59e0b;color:#fbbf24}',

        '/* Trade button */',
        '.tp-trade-btn{width:100%;padding:6px 0;border-radius:8px;border:none;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:.5px;transition:transform .15s,box-shadow .15s;text-transform:uppercase}',
        '.tp-trade-btn:hover{transform:scale(1.04);box-shadow:0 0 12px rgba(245,158,11,.4)}',
        '.tp-trade-btn:active{transform:scale(.96)}',
        '.tp-trade-btn:disabled{background:#374151;color:#6b7280;cursor:default;transform:none;box-shadow:none}',

        '/* Footer */',
        '.tp-footer{padding:10px 16px;box-sizing:border-box;border-top:1px solid rgba(245,158,11,.15);flex-shrink:0;text-align:center}',
        '.tp-footer-text{font-size:9px;color:#6b7280;letter-spacing:.5px}',

        '/* Animations */',
        '@keyframes tp-card-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}',
        '.tp-card{animation:tp-card-in .3s ease both}',
        '.tp-card:nth-child(2){animation-delay:.04s}',
        '.tp-card:nth-child(3){animation-delay:.08s}',
        '.tp-card:nth-child(4){animation-delay:.12s}',
        '.tp-card:nth-child(5){animation-delay:.16s}',
        '.tp-card:nth-child(6){animation-delay:.20s}',
        '.tp-card:nth-child(7){animation-delay:.24s}',
        '.tp-card:nth-child(8){animation-delay:.28s}'
    ].join('\n');
    document.head.appendChild(css);

    // ----------------------------------------------------------
    //  Resource Definitions
    // ----------------------------------------------------------
    var RES_ICONS = {
        stone:   '\u26CF\uFE0F',
        iron:    '\u2699\uFE0F',
        gold:    '\uD83E\uDD47',
        diamond: '\uD83D\uDC8E',
        scrap:   '\uD83D\uDD29'
    };

    var RES_NAMES = {
        stone:   'Stone',
        iron:    'Iron',
        gold:    'Gold',
        diamond: 'Diamond',
        scrap:   'Scrap'
    };

    // ----------------------------------------------------------
    //  Exchange Definitions (base rates)
    // ----------------------------------------------------------
    var EXCHANGES = [
        { from: 'stone', to: 'iron',    pay: 3,  get: 1 },
        { from: 'iron',  to: 'gold',    pay: 4,  get: 1 },
        { from: 'gold',  to: 'diamond', pay: 10, get: 1 },
        { from: 'scrap', to: 'iron',    pay: 2,  get: 1 },
        { from: 'iron',  to: 'stone',   pay: 1,  get: 2 },
        { from: 'gold',  to: 'iron',    pay: 1,  get: 3 },
        { from: 'diamond', to: 'gold',  pay: 1,  get: 8 },
        { from: 'scrap', to: 'stone',   pay: 1,  get: 1 }
    ];

    var MAX_TRADES = 10;

    // ----------------------------------------------------------
    //  State Initialization
    // ----------------------------------------------------------
    function initState() {
        if (!state.tradingPost) {
            state.tradingPost = {
                lastRatesDate: '',
                trades: 0
            };
        }
    }

    // ----------------------------------------------------------
    //  Date Seed Helper
    // ----------------------------------------------------------
    function todayStr() {
        return new Date().toISOString().slice(0, 10);
    }

    function hashStr(s) {
        var h = 0;
        for (var i = 0; i < s.length; i++) {
            h = ((h << 5) - h + s.charCodeAt(i)) | 0;
        }
        return h;
    }

    // Seeded pseudo-random (LCG) from a seed integer
    function seededRandom(seed) {
        var s = Math.abs(seed) || 1;
        return function() {
            s = (s * 16807 + 1) & 0x7fffffff;
            return s / 0x7fffffff;
        };
    }

    // ----------------------------------------------------------
    //  Daily Modifiers
    // ----------------------------------------------------------
    function getDailyRates() {
        var today = todayStr();
        var seed = hashStr(today + '_trading_post');
        var rng = seededRandom(seed);

        var rates = [];
        var specialIdx = Math.floor(rng() * EXCHANGES.length);

        for (var i = 0; i < EXCHANGES.length; i++) {
            var ex = EXCHANGES[i];
            // Modifier: 0.7 to 1.3
            var mod = 0.7 + (rng() * 0.6);
            var adjustedGet = Math.max(1, Math.round(ex.get * mod));
            var isSpecial = (i === specialIdx);

            if (isSpecial) {
                adjustedGet = Math.max(1, Math.round(adjustedGet * 1.5));
            }

            rates.push({
                from: ex.from,
                to: ex.to,
                pay: ex.pay,
                get: adjustedGet,
                modifier: mod,
                special: isSpecial
            });
        }

        return rates;
    }

    // ----------------------------------------------------------
    //  Check Day Reset
    // ----------------------------------------------------------
    function checkDayReset() {
        var today = todayStr();
        var tp = state.tradingPost;
        if (tp.lastRatesDate !== today) {
            tp.lastRatesDate = today;
            tp.trades = 0;
            if (typeof saveProgress === 'function') saveProgress();
        }
    }

    // ----------------------------------------------------------
    //  Execute Trade
    // ----------------------------------------------------------
    function executeTrade(rate, multiplier) {
        var tp = state.tradingPost;

        if (tp.trades >= MAX_TRADES) {
            if (typeof showGameAlert === 'function') {
                showGameAlert('Trade Limit', 'You have used all 10 trades for today. Come back tomorrow!');
            }
            return false;
        }

        var totalPay = rate.pay * multiplier;
        var totalGet = rate.get * multiplier;
        var currentBalance = state.resources[rate.from] || 0;

        if (currentBalance < totalPay) {
            if (typeof showGameAlert === 'function') {
                showGameAlert('Insufficient Resources', 'You need ' + totalPay + ' ' + RES_NAMES[rate.from] + ' but only have ' + currentBalance + '.');
            }
            return false;
        }

        // Execute
        state.resources[rate.from] = (state.resources[rate.from] || 0) - totalPay;
        state.resources[rate.to] = (state.resources[rate.to] || 0) + totalGet;
        tp.trades += 1;

        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) {
            try { SoundManager.playFX('click'); } catch(e) {}
        }
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();

        return true;
    }

    // ----------------------------------------------------------
    //  Open Trading Post Modal
    // ----------------------------------------------------------
    var activeOverlay = null;

    window.openTradingPost = function() {
        if (activeOverlay) return;

        initState();
        checkDayReset();

        var rates = getDailyRates();
        var tp = state.tradingPost;

        // ---- Overlay ----
        var overlay = document.createElement('div');
        overlay.className = 'tp-overlay';
        activeOverlay = overlay;

        // ---- Modal ----
        var modal = document.createElement('div');
        modal.className = 'tp-modal';

        // ---- Close Button ----
        var closeBtn = document.createElement('button');
        closeBtn.className = 'tp-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = closeTP;
        modal.appendChild(closeBtn);

        // ---- Header ----
        var header = document.createElement('div');
        header.className = 'tp-header';

        var title = document.createElement('div');
        title.className = 'tp-title';
        title.textContent = '\uD83C\uDFEA RAJ\'S TRADING POST';
        header.appendChild(title);

        var sub = document.createElement('div');
        sub.className = 'tp-subtitle';
        sub.textContent = 'Daily rates refresh at midnight \u2022 Today\'s deals';
        header.appendChild(sub);

        var tradesCounter = document.createElement('div');
        tradesCounter.className = 'tp-trades-counter';
        tradesCounter.id = 'tp-trades-display';
        tradesCounter.textContent = 'Trades: ' + tp.trades + '/' + MAX_TRADES;
        header.appendChild(tradesCounter);

        modal.appendChild(header);

        // ---- Grid ----
        var grid = document.createElement('div');
        grid.className = 'tp-grid';
        grid.id = 'tp-grid';

        for (var i = 0; i < rates.length; i++) {
            grid.appendChild(buildCard(rates[i], i));
        }

        modal.appendChild(grid);

        // ---- Footer ----
        var footer = document.createElement('div');
        footer.className = 'tp-footer';
        var footerText = document.createElement('div');
        footerText.className = 'tp-footer-text';
        footerText.textContent = '"I can\'t talk to women, but I can talk to merchants." \u2014 Raj Koothrappali';
        footer.appendChild(footerText);
        modal.appendChild(footer);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(function() {
            overlay.classList.add('tp-show');
        });

        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeTP();
        });

        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) {
            try { SoundManager.playFX('click'); } catch(e) {}
        }
    };

    // ----------------------------------------------------------
    //  Build Exchange Card
    // ----------------------------------------------------------
    function buildCard(rate, idx) {
        var card = document.createElement('div');
        card.className = 'tp-card' + (rate.special ? ' tp-card-special' : '');

        // Special deal badge
        if (rate.special) {
            var badge = document.createElement('div');
            badge.className = 'tp-deal-badge';
            badge.textContent = '\uD83D\uDD25 SPECIAL DEAL';
            card.appendChild(badge);
        }

        // Rate display
        var rateDiv = document.createElement('div');
        rateDiv.className = 'tp-rate';
        rateDiv.innerHTML = RES_ICONS[rate.from] + ' ' + rate.pay + ' ' + RES_NAMES[rate.from] +
            ' <span class="tp-rate-arrow">\u279C</span> ' +
            RES_ICONS[rate.to] + ' ' + rate.get + ' ' + RES_NAMES[rate.to];
        card.appendChild(rateDiv);

        // Balance display
        var balDiv = document.createElement('div');
        balDiv.className = 'tp-balance';
        balDiv.id = 'tp-bal-' + idx;
        balDiv.textContent = 'You have: ' + (state.resources[rate.from] || 0) + ' ' + RES_NAMES[rate.from];
        card.appendChild(balDiv);

        // Multiplier buttons
        var multRow = document.createElement('div');
        multRow.className = 'tp-mult-row';
        var selectedMult = { value: 1 };

        var mults = [1, 5, 10];
        for (var m = 0; m < mults.length; m++) {
            (function(mult) {
                var btn = document.createElement('button');
                btn.className = 'tp-mult-btn' + (mult === 1 ? ' tp-mult-active' : '');
                btn.textContent = mult + 'x';
                btn.onclick = function() {
                    selectedMult.value = mult;
                    // Update active state
                    var siblings = multRow.querySelectorAll('.tp-mult-btn');
                    for (var s = 0; s < siblings.length; s++) {
                        siblings[s].classList.remove('tp-mult-active');
                    }
                    btn.classList.add('tp-mult-active');
                };
                multRow.appendChild(btn);
            })(mults[m]);
        }
        card.appendChild(multRow);

        // Trade button
        var tradeBtn = document.createElement('button');
        tradeBtn.className = 'tp-trade-btn';
        tradeBtn.textContent = 'TRADE';

        if (state.tradingPost.trades >= MAX_TRADES) {
            tradeBtn.disabled = true;
            tradeBtn.textContent = 'NO TRADES LEFT';
        }

        tradeBtn.onclick = function() {
            var success = executeTrade(rate, selectedMult.value);
            if (success) {
                // Refresh the modal
                closeTP();
                window.openTradingPost();
            }
        };
        card.appendChild(tradeBtn);

        return card;
    }

    // ----------------------------------------------------------
    //  Close Modal
    // ----------------------------------------------------------
    function closeTP() {
        if (activeOverlay) {
            activeOverlay.classList.remove('tp-show');
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
    checkDayReset();

    console.log('[Trading Post] Raj\'s Trading Post loaded — ' + state.tradingPost.trades + '/' + MAX_TRADES + ' trades today');

})();
