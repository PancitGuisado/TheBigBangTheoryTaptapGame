// ============================================================
// SHELDON'S GUIDED TUTORIAL — Hades-Style Pixel Art Dialogue
// Uses in-game SVG vectors + matching Press Start 2P pixel style
// ============================================================

(function() {
    'use strict';

    // ─── Tutorial State ───
    var tutorialOverlay = null;
    var tutorialActive = false;
    var typewriterTimer = null;
    var currentStepId = null;
    var arrowEl = null;

    // ─── Sheldon's Tutorial Steps ───
    var STEPS = [
        {
            id: 'welcome',
            trigger: function() { return true; },
            target: null,
            arrowDir: null,
            requireAction: false,
            dialogue: "Oh, you're new here. I'm Dr. Sheldon Cooper — BS, MS, MA, PhD. I suppose I'll have to show you around since clearly no one else is qualified. Pay attention, I won't repeat myself... Actually, I will. Repeatedly. It's one of my many charms.",
            funFact: "I started college at 11 and received my first PhD at 16. You're welcome for lowering your expectations of yourself.",
            btnText: "Okay, Dr. Cooper..."
        },
        {
            id: 'tap_arena',
            trigger: function() { return _stepDone('welcome'); },
            target: '#enemy-container',
            fallbackTarget: '#arena',
            arrowDir: 'down',
            requireAction: false,
            dialogue: "See that villain? Tap the screen to attack. Yes, with your finger. It's not rocket science — and I would know, Howard's wife does actual rocket science. Your characters attack automatically, but manual taps provide bonus damage. Think of it as... enthusiastic supervision.",
            funFact: "The average human finger tap exerts approximately 1-2 Newtons of force. I calculate my taps for maximum damage distribution.",
            btnText: "Let me try!"
        },
        {
            id: 'first_kill',
            trigger: function() { return _getTotalKills() >= 1; },
            target: '#enemy-container',
            fallbackTarget: '#arena',
            arrowDir: null,
            requireAction: false,
            dialogue: "Excellent! You defeated it. Each wave is an \"episode\" in our adventure. Every 10 episodes culminates in a Season Finale — that's a boss fight. Think of it like sweeps week, but with more explosions and significantly better writing.",
            funFact: "In television, season finales typically air in May during 'sweeps' periods when Nielsen ratings determine advertising rates.",
            btnText: "Got it!"
        },
        {
            id: 'open_gang',
            trigger: function() { return _getTotalKills() >= 3; },
            target: '[data-tab="gang"]',
            arrowDir: 'up',
            requireAction: false,
            dialogue: "Now then, even I can't do everything alone — though I come remarkably close. Tap \"Gang\" down there to recruit the rest of our social group. And yes, Penny is included despite her... let's say \"non-traditional\" academic background. Leonard insisted.",
            funFact: "Our friend group's combined IQ exceeds 630. That's Penny included, who once scored a respectable... well, she can open jars.",
            btnText: "I'll check it out!"
        },
        {
            id: 'open_board',
            trigger: function() { return _hasAnyRosterMember(); },
            target: '[data-tab="board"]',
            arrowDir: 'up',
            requireAction: false,
            dialogue: "Ah, the Battle Board! This is where you arrange your team's formation — front line, back line, strategic positioning. Think of it as three-dimensional chess, except instead of a board, it's a battlefield.",
            funFact: "I maintain 64 boards of three-dimensional chess simultaneously in my mind. The Battle Board only has two rows. Even Howard could manage this.",
            btnText: "Let me arrange my team!"
        },
        {
            id: 'side_rail',
            trigger: function() { return _stepDone('open_board'); },
            target: '#side-rail',
            arrowDir: 'left',
            requireAction: false,
            dialogue: "Over on the right side, you'll find the utility rail — skill tree, equipment, quests, daily rewards, and the Pasadena map. I organized these myself using a modified Feynman diagram structure.",
            funFact: "Richard Feynman won the 1965 Nobel Prize in Physics for quantum electrodynamics. My skill tree is similarly revolutionary.",
            btnText: "Noted!"
        },
        {
            id: 'open_guild',
            trigger: function() { return _getWave() >= 3; },
            target: '[data-tab="guild"]',
            arrowDir: 'up',
            requireAction: false,
            dialogue: "Guilds. A necessary social construct, much like Leonard's pathological need for approval. Join one, contribute to raids, participate in guild wars. Key points: no eating during raids and absolutely NO \"lol\".",
            funFact: "The word 'guild' derives from Old English 'gild,' meaning payment or tribute. Medieval merchant guilds controlled entire trade industries.",
            btnText: "I'll join a guild!"
        },
        {
            id: 'open_arena',
            trigger: function() { return _getWave() >= 5; },
            target: '[data-tab="pvp"]',
            arrowDir: 'up',
            requireAction: false,
            dialogue: "The Arena! Here you test your team against other players in PvP combat. It's like Anything Can Happen Thursday, except the thing that happens is you losing. Repeatedly. Until you optimize your lineup using proper statistical analysis.",
            funFact: "PvP stands for 'Player versus Player.' I prefer PvE — 'Player versus Everyone' — which is essentially how I navigate daily social interactions.",
            btnText: "Time to compete!"
        },
        {
            id: 'more_features',
            trigger: function() { return _stepDone('open_arena'); },
            target: '#more-menu-toggle',
            arrowDir: 'left',
            requireAction: false,
            dialogue: "That ellipsis button contains additional features. Robot workshop, food buffs, bestiary, gacha pulls, daily missions, and more. Think of it as the junk drawer of Apartment 4A, except everything in it is actually useful.",
            funFact: "The character '\u22ef' is called a midline horizontal ellipsis (Unicode U+22EF). Most people use three periods, which is typographically incorrect.",
            btnText: "I'll explore later!"
        },
        {
            id: 'complete',
            trigger: function() { return _stepDone('more_features'); },
            target: null,
            arrowDir: null,
            requireAction: false,
            dialogue: "Well. You now know approximately 0.004% of what I know about this game — and about 0.0000001% of what I know in general. But it's a start. Go forth, defeat enemies, build your team, and remember... Bazinga!",
            funFact: "The word 'Bazinga' was created specifically for me. It's my catchphrase, my battle cry, and my intellectual punctuation mark. Perfect. Like me.",
            btnText: "BAZINGA!",
            isFinal: true
        }
    ];

    // ─── Helper Functions ───
    function _stepDone(id) {
        if (typeof state === 'undefined') return false;
        return state.tutorialStepsCompleted && state.tutorialStepsCompleted.indexOf(id) !== -1;
    }

    function _getTotalKills() {
        if (typeof state === 'undefined' || !state.stats) return 0;
        return state.stats.totalKills || 0;
    }

    function _getWave() {
        if (typeof state === 'undefined') return 1;
        return state.wave || 1;
    }

    function _hasAnyRosterMember() {
        if (typeof state === 'undefined' || !state.roster) return false;
        return Object.keys(state.roster).some(function(k) {
            return state.roster[k].level > 0;
        });
    }

    function _isTutorialDone() {
        if (typeof state === 'undefined') return true;
        return state.tutorialSkipped || _stepDone('complete');
    }

    // ─── Get Sheldon's SVG from vectors global ───
    function getSheldonSVG() {
        if (typeof vectors !== 'undefined' && vectors.sheldon) {
            if (typeof vectors.sheldon === 'string') return vectors.sheldon;
            return vectors.sheldon.idle || '';
        }
        // Fallback emoji if vectors not loaded
        return '<svg viewBox="0 0 60 90"><text x="30" y="50" text-anchor="middle" font-size="30">🧑‍🔬</text></svg>';
    }

    // ─── Inject CSS (once) ───
    function injectStyles() {
        if (document.getElementById('sheldon-tutorial-css')) return;
        var style = document.createElement('style');
        style.id = 'sheldon-tutorial-css';
        style.textContent = `
/* ═══ OVERLAY ═══ */
.stut-overlay {
    position: fixed; inset: 0; z-index: 999998;
    pointer-events: auto; transition: opacity 0.3s ease;
}
.stut-dim { position: absolute; inset: 0; background: rgba(0,0,0,0.72); }

/* ═══ SPOTLIGHT ═══ */
.stut-spotlight {
    position: absolute;
    border: 2px solid rgba(234, 179, 8, 0.6);
    border-radius: 8px; z-index: 1;
    box-shadow: 0 0 0 4000px rgba(0,0,0,0.72),
                0 0 24px rgba(234, 179, 8, 0.2),
                inset 0 0 12px rgba(234, 179, 8, 0.05);
    transition: all 0.4s ease;
}

/* ═══ DIALOGUE WRAPPER — Hades layout ═══ */
.stut-wrap {
    position: fixed; bottom: 52px; left: 0; right: 0;
    z-index: 999999; pointer-events: auto;
    display: flex; align-items: flex-end;
    padding: 0 6px 6px;
    animation: stut-wrapIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* ═══ PORTRAIT — Large character on left ═══ */
.stut-portrait {
    flex-shrink: 0; position: relative;
    width: 120px; z-index: 2;
    margin-right: -8px;
    align-self: flex-end;
    animation: stut-portraitSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
    image-rendering: pixelated;
    filter: drop-shadow(3px 2px 0px rgba(0,0,0,0.5));
}
.stut-portrait-svg {
    width: 100%; height: auto;
    transform: scaleX(-1);
}

/* ═══ PANEL — Right side ═══ */
.stut-panel {
    flex: 1; min-width: 0; position: relative;
    margin-bottom: 4px;
}

/* ── NAMEPLATE ── */
.stut-nameplate {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 14px 3px 10px;
    background: linear-gradient(135deg, rgba(120, 53, 15, 0.95), rgba(146, 64, 14, 0.9));
    border: 2px solid #d97706;
    border-bottom: none;
    border-radius: 6px 6px 0 0;
    margin-left: 6px; z-index: 1;
    position: relative;
    box-shadow: 0 -2px 8px rgba(217, 119, 6, 0.15);
}
.stut-nameplate::before {
    content: '⚡'; font-size: 8px;
}
.stut-name {
    font-family: 'Press Start 2P', monospace;
    font-size: 8px; color: #fbbf24;
    text-transform: uppercase; letter-spacing: 1px;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.5);
    image-rendering: pixelated;
}
.stut-subtitle {
    font-family: 'Press Start 2P', monospace;
    font-size: 5px; color: rgba(253, 230, 138, 0.6);
    letter-spacing: 0.5px;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.4);
}

/* ── TEXTBOX ── */
.stut-textbox {
    position: relative;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.97), rgba(10, 15, 30, 0.98));
    border: 2px solid #d97706;
    border-radius: 0 10px 10px 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5),
                inset 0 1px 0 rgba(217, 119, 6, 0.1);
}
/* Pixelated corner decorations */
.stut-textbox::before {
    content: '';
    position: absolute; top: 0; right: 0;
    width: 40px; height: 40px;
    background: linear-gradient(225deg, rgba(217, 119, 6, 0.08) 0%, transparent 60%);
    pointer-events: none;
}

/* ── BODY ── */
.stut-body {
    padding: 12px 14px 6px; position: relative; z-index: 1;
}
.stut-text {
    font-family: 'Press Start 2P', monospace;
    font-size: 7px; line-height: 2;
    color: rgba(248, 250, 252, 0.92);
    min-height: 32px;
    image-rendering: pixelated;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
}
.stut-cursor {
    display: inline-block; width: 6px; height: 8px;
    background: #fbbf24; margin-left: 2px;
    animation: stut-blink 0.5s step-end infinite;
    vertical-align: text-bottom;
    image-rendering: pixelated;
}

/* ── CONTINUE INDICATOR ── */
.stut-continue {
    position: absolute; bottom: 10px; right: 12px;
    z-index: 2; pointer-events: none;
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #fbbf24;
    animation: stut-triPulse 1s ease-in-out infinite;
    filter: drop-shadow(0 0 3px rgba(251, 191, 36, 0.4));
}

/* ── FUN FACT ── */
.stut-funfact {
    display: flex; gap: 6px; align-items: flex-start;
    margin: 4px 10px 6px; padding: 6px 8px;
    background: rgba(217, 119, 6, 0.06);
    border: 1px solid rgba(217, 119, 6, 0.2);
    border-radius: 4px; position: relative; z-index: 1;
}
.stut-ff-icon { font-size: 10px; flex-shrink: 0; margin-top: 1px; }
.stut-ff-label {
    font-family: 'Press Start 2P', monospace;
    font-size: 5px; color: #fbbf24;
    text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 3px; display: block;
    opacity: 0.7;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
}
.stut-ff-text {
    font-family: 'Press Start 2P', monospace;
    font-size: 5px; line-height: 1.8;
    color: rgba(251, 191, 36, 0.45);
    text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
}

/* ── FOOTER ── */
.stut-footer {
    display: flex; align-items: center;
    padding: 4px 10px 8px; gap: 6px;
    position: relative; z-index: 1;
}
.stut-dots {
    display: flex; gap: 3px; align-items: center; flex: 1;
}
.stut-dot {
    width: 4px; height: 4px;
    background: rgba(100, 116, 139, 0.25);
    transition: all 0.3s;
    image-rendering: pixelated;
}
.stut-dot.done { background: rgba(251, 191, 36, 0.4); }
.stut-dot.active {
    background: #fbbf24; width: 12px;
    box-shadow: 0 0 4px rgba(251, 191, 36, 0.5);
}

.stut-btn-skip {
    background: none; border: none;
    font-family: 'Press Start 2P', monospace;
    color: rgba(148, 163, 184, 0.35); font-size: 5px;
    cursor: pointer; padding: 3px 5px;
    transition: color 0.2s; letter-spacing: 0.5px;
    text-transform: uppercase;
}
.stut-btn-skip:hover { color: rgba(248, 250, 252, 0.6); }

.stut-btn-main {
    background: linear-gradient(180deg, #b45309, #92400e);
    color: #fef3c7; 
    border: 2px solid #d97706;
    padding: 6px 14px;
    border-radius: 4px;
    font-family: 'Press Start 2P', monospace;
    font-size: 6px; cursor: pointer;
    transition: all 0.15s; text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.4);
    box-shadow: 0 2px 0 #78350f, 0 4px 8px rgba(0,0,0,0.3);
    image-rendering: pixelated;
}
.stut-btn-main:hover {
    background: linear-gradient(180deg, #d97706, #b45309);
    transform: translateY(-1px);
    box-shadow: 0 3px 0 #78350f, 0 6px 12px rgba(0,0,0,0.3);
}
.stut-btn-main:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 #78350f;
}

/* ═══ POINTING ARROWS ═══ */
.stut-arrow {
    position: fixed; z-index: 999999;
    pointer-events: none; font-size: 24px;
    filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
    image-rendering: pixelated;
}
.stut-arrow-up { animation: stut-bounceUp 0.8s ease-in-out infinite; }
.stut-arrow-down { animation: stut-bounceDown 0.8s ease-in-out infinite; }
.stut-arrow-left { animation: stut-bounceLeft 0.8s ease-in-out infinite; }
.stut-arrow-right { animation: stut-bounceRight 0.8s ease-in-out infinite; }

/* ═══ ANIMATIONS ═══ */
@keyframes stut-wrapIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes stut-portraitSlide {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
}
@keyframes stut-blink { 50% { opacity: 0; } }
@keyframes stut-triPulse {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(3px); opacity: 1; }
}
@keyframes stut-bounceUp {
    0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); }
}
@keyframes stut-bounceDown {
    0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); }
}
@keyframes stut-bounceLeft {
    0%,100% { transform: translateX(0); } 50% { transform: translateX(-8px); }
}
@keyframes stut-bounceRight {
    0%,100% { transform: translateX(0); } 50% { transform: translateX(8px); }
}
@keyframes stut-fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 380px) {
    .stut-portrait { width: 90px; }
    .stut-name { font-size: 6px; }
    .stut-text { font-size: 6px; }
    .stut-btn-main { font-size: 5px; padding: 5px 10px; }
}
`;
        document.head.appendChild(style);
    }

    // ─── Find target element ───
    function findTarget(step) {
        var el = null;
        if (step.target) {
            el = step.target.startsWith('#')
                ? document.getElementById(step.target.slice(1))
                : document.querySelector(step.target);
        }
        if (!el && step.fallbackTarget) {
            el = step.fallbackTarget.startsWith('#')
                ? document.getElementById(step.fallbackTarget.slice(1))
                : document.querySelector(step.fallbackTarget);
        }
        if (el) {
            var rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return null;
        }
        return el;
    }

    // ─── Create pointing arrow ───
    function createArrow(targetEl, direction) {
        removeArrow();
        if (!targetEl || !direction) return;

        var rect = targetEl.getBoundingClientRect();
        arrowEl = document.createElement('div');
        arrowEl.className = 'stut-arrow stut-arrow-' + direction;

        var arrows = { up: '⬇️', down: '⬆️', left: '➡️', right: '⬅️' };
        arrowEl.textContent = arrows[direction] || '⬇️';

        switch (direction) {
            case 'up':
                arrowEl.style.left = (rect.left + rect.width / 2 - 12) + 'px';
                arrowEl.style.top = (rect.top - 34) + 'px';
                break;
            case 'down':
                arrowEl.style.left = (rect.left + rect.width / 2 - 12) + 'px';
                arrowEl.style.top = (rect.bottom + 4) + 'px';
                break;
            case 'left':
                arrowEl.style.left = (rect.left - 34) + 'px';
                arrowEl.style.top = (rect.top + rect.height / 2 - 12) + 'px';
                break;
            case 'right':
                arrowEl.style.left = (rect.right + 4) + 'px';
                arrowEl.style.top = (rect.top + rect.height / 2 - 12) + 'px';
                break;
        }

        document.body.appendChild(arrowEl);
    }

    function removeArrow() {
        if (arrowEl) { arrowEl.remove(); arrowEl = null; }
    }

    // ─── Typewriter Effect ───
    function typewrite(el, text, cb) {
        if (typewriterTimer) clearInterval(typewriterTimer);
        var i = 0;
        var cursor = document.createElement('span');
        cursor.className = 'stut-cursor';
        el.textContent = '';
        el.appendChild(cursor);

        var speed = 22;
        typewriterTimer = setInterval(function() {
            if (i < text.length) {
                el.insertBefore(document.createTextNode(text[i]), cursor);
                i++;
                el.scrollTop = el.scrollHeight;
            } else {
                clearInterval(typewriterTimer);
                typewriterTimer = null;
                cursor.remove();
                if (cb) cb();
            }
        }, speed);

        el._skipTypewriter = function() {
            if (typewriterTimer) {
                clearInterval(typewriterTimer);
                typewriterTimer = null;
                el.textContent = text;
                cursor.remove();
                if (cb) cb();
            }
        };
    }

    // ─── Render a step ───
    function showStep(step) {
        if (!step) return;
        if (tutorialActive && currentStepId === step.id) return;

        currentStepId = step.id;
        tutorialActive = true;
        injectStyles();

        // Remove existing
        var old = document.getElementById('stut-overlay');
        if (old) old.remove();
        var oldWrap = document.querySelector('.stut-wrap');
        if (oldWrap) oldWrap.remove();
        removeArrow();

        var targetEl = findTarget(step);
        var hasTarget = !!targetEl;

        // ── Overlay ──
        var overlay = document.createElement('div');
        overlay.id = 'stut-overlay';
        overlay.className = 'stut-overlay';

        if (hasTarget) {
            var rect = targetEl.getBoundingClientRect();
            var pad = 6;
            var spot = document.createElement('div');
            spot.className = 'stut-spotlight';
            spot.style.left = (rect.left - pad) + 'px';
            spot.style.top = (rect.top - pad) + 'px';
            spot.style.width = (rect.width + pad * 2) + 'px';
            spot.style.height = (rect.height + pad * 2) + 'px';
            overlay.appendChild(spot);
        } else {
            var dim = document.createElement('div');
            dim.className = 'stut-dim';
            overlay.appendChild(dim);
        }

        document.body.appendChild(overlay);

        // ── Arrow ──
        if (hasTarget && step.arrowDir) {
            createArrow(targetEl, step.arrowDir);
        }

        // ══════════════════════════════════════
        // HADES-STYLE DIALOGUE
        // ══════════════════════════════════════
        var wrap = document.createElement('div');
        wrap.className = 'stut-wrap';
        wrap.onclick = function(e) { e.stopPropagation(); };

        // ── Portrait (left) ──
        var portrait = document.createElement('div');
        portrait.className = 'stut-portrait';
        var portraitInner = document.createElement('div');
        portraitInner.className = 'stut-portrait-svg';
        portraitInner.innerHTML = getSheldonSVG();
        portrait.appendChild(portraitInner);
        wrap.appendChild(portrait);

        // ── Panel (right) ──
        var panel = document.createElement('div');
        panel.className = 'stut-panel';

        // Nameplate
        var nameplate = document.createElement('div');
        nameplate.className = 'stut-nameplate';
        var nameBlock = document.createElement('div');
        var nameEl = document.createElement('div');
        nameEl.className = 'stut-name';
        nameEl.textContent = 'Dr. Sheldon Cooper';
        nameBlock.appendChild(nameEl);
        var subtitle = document.createElement('div');
        subtitle.className = 'stut-subtitle';
        subtitle.textContent = 'Senior Theoretical Physicist';
        nameBlock.appendChild(subtitle);
        nameplate.appendChild(nameBlock);
        panel.appendChild(nameplate);

        // Textbox
        var textbox = document.createElement('div');
        textbox.className = 'stut-textbox';

        // Body
        var body = document.createElement('div');
        body.className = 'stut-body';
        var textEl = document.createElement('div');
        textEl.className = 'stut-text';
        body.appendChild(textEl);
        textbox.appendChild(body);

        // Continue ▼
        var tri = document.createElement('div');
        tri.className = 'stut-continue';
        tri.style.display = 'none';
        textbox.appendChild(tri);

        // Fun fact (hidden)
        var ff = document.createElement('div');
        ff.className = 'stut-funfact';
        ff.style.display = 'none';
        var ffIcon = document.createElement('div');
        ffIcon.className = 'stut-ff-icon';
        ffIcon.textContent = '🧪';
        ff.appendChild(ffIcon);
        var ffBody = document.createElement('div');
        var ffLabel = document.createElement('span');
        ffLabel.className = 'stut-ff-label';
        ffLabel.textContent = "Sheldon's Fun Fact";
        ffBody.appendChild(ffLabel);
        var ffText = document.createElement('div');
        ffText.className = 'stut-ff-text';
        ffText.textContent = step.funFact;
        ffBody.appendChild(ffText);
        ff.appendChild(ffBody);
        textbox.appendChild(ff);

        // Footer
        var footer = document.createElement('div');
        footer.className = 'stut-footer';

        var dotsWrap = document.createElement('div');
        dotsWrap.className = 'stut-dots';
        var stepIdx = STEPS.indexOf(step);
        for (var i = 0; i < STEPS.length; i++) {
            var dot = document.createElement('div');
            dot.className = 'stut-dot';
            if (i < stepIdx) dot.classList.add('done');
            if (i === stepIdx) dot.classList.add('active');
            dotsWrap.appendChild(dot);
        }
        footer.appendChild(dotsWrap);

        if (!step.isFinal) {
            var skipBtn = document.createElement('button');
            skipBtn.className = 'stut-btn-skip';
            skipBtn.textContent = 'Skip';
            skipBtn.onclick = function(e) {
                e.stopPropagation();
                skipTutorial();
            };
            footer.appendChild(skipBtn);
        }

        var mainBtn = document.createElement('button');
        mainBtn.className = 'stut-btn-main';
        mainBtn.textContent = step.btnText || 'Got it!';
        mainBtn.style.display = 'none';
        mainBtn.onclick = function(e) {
            e.stopPropagation();
            completeStep(step);
        };
        footer.appendChild(mainBtn);

        textbox.appendChild(footer);
        panel.appendChild(textbox);
        wrap.appendChild(panel);
        document.body.appendChild(wrap);

        // Click overlay to skip typewriter
        overlay.onclick = function(e) {
            if (textEl._skipTypewriter) textEl._skipTypewriter();
        };

        // Start typewriter
        typewrite(textEl, step.dialogue, function() {
            tri.style.display = '';
            ff.style.display = '';
            ff.style.animation = 'stut-fadeIn 0.3s ease both';
            mainBtn.style.display = '';
            mainBtn.style.animation = 'stut-fadeIn 0.25s ease both';
        });

        // Play sound
        try {
            if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
        } catch(e) {}
    }

    // ─── Complete a step ───
    function completeStep(step) {
        if (typeof state !== 'undefined') {
            if (!state.tutorialStepsCompleted) state.tutorialStepsCompleted = [];
            if (state.tutorialStepsCompleted.indexOf(step.id) === -1) {
                state.tutorialStepsCompleted.push(step.id);
            }
            if (step.isFinal) {
                state.tutorialComplete = true;
                state.tutorialSkipped = false;
            }
            if (typeof saveProgress === 'function') saveProgress();
        }
        dismiss();
        if (step.isFinal) {
            // === FINAL STEP: Trigger callback after tutorial UI is removed ===
            setTimeout(function() {
                if (window._onTutorialFinish && typeof window._onTutorialFinish === 'function') {
                    window._onTutorialFinish();
                }
            }, 350);
        } else {
            setTimeout(function() { checkTutorialTriggers(); }, 600);
        }
    }

    // ─── Skip tutorial ───
    function skipTutorial() {
        if (typeof state !== 'undefined') {
            state.tutorialSkipped = true;
            state.tutorialComplete = true;
            if (typeof saveProgress === 'function') saveProgress();
        }
        dismiss();
        console.log('[Tutorial] Tutorial skipped by player.');
        // === SKIP: Trigger callback after tutorial UI is removed ===
        setTimeout(function() {
            if (window._onTutorialFinish && typeof window._onTutorialFinish === 'function') {
                window._onTutorialFinish();
            }
        }, 350);
    }

    // ─── Dismiss ───
    function dismiss() {
        tutorialActive = false;
        currentStepId = null;
        if (typewriterTimer) { clearInterval(typewriterTimer); typewriterTimer = null; }
        removeArrow();

        var overlay = document.getElementById('stut-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(function() { overlay.remove(); }, 300);
        }

        var wrap = document.querySelector('.stut-wrap');
        if (wrap) {
            wrap.style.opacity = '0';
            wrap.style.transform = 'translateY(20px)';
            setTimeout(function() { wrap.remove(); }, 300);
        }
    }

    // ─── Core trigger check ───
    function checkTutorialTriggers() {
        if (tutorialActive) return;
        if (_isTutorialDone()) return;
        if (typeof state === 'undefined') return;
        if (!state.tutorialStepsCompleted) state.tutorialStepsCompleted = [];

        for (var i = 0; i < STEPS.length; i++) {
            var step = STEPS[i];
            if (state.tutorialStepsCompleted.indexOf(step.id) !== -1) continue;
            try {
                if (step.trigger()) {
                    showStep(step);
                    return;
                }
            } catch(e) {
                console.warn('[Tutorial] Error checking trigger for step "' + step.id + '":', e);
            }
            return;
        }
    }

    // ─── Public API ───
    window.checkTutorialTriggers = checkTutorialTriggers;

    window.startTutorial = function(forceStart) {
        if (!forceStart) {
            if (typeof state !== 'undefined') {
                if (state.tutorialComplete || state.tutorialSkipped) {
                    console.log('[Tutorial] Already completed, skipping.');
                    return;
                }
                var hasRoster = state.roster && Object.keys(state.roster).some(function(k) { return state.roster[k].level > 0; });
                var hasStats = state.stats && (state.stats.totalKills > 0 || state.stats.moneySpent > 0);
                if (state.wave > 1 || hasRoster || hasStats) {
                    console.log('[Tutorial] Player has progress, skipping tutorial.');
                    state.tutorialComplete = true;
                    state.tutorialSkipped = true;
                    if (typeof saveProgress === 'function') saveProgress();
                    return;
                }
            }
        }
        if (forceStart && typeof state !== 'undefined') {
            state.tutorialStepsCompleted = [];
            state.tutorialSkipped = false;
            state.tutorialComplete = false;
        }
        checkTutorialTriggers();
    };

    window.restartTutorial = function() {
        if (typeof state !== 'undefined') {
            state.tutorialStepsCompleted = [];
            state.tutorialSkipped = false;
            state.tutorialComplete = false;
        }
        dismiss();
        setTimeout(function() {
            window.startTutorial(true);
        }, 500);
    };

    console.log('[Tutorial] Sheldon dialogue tutorial system loaded.');
})();
