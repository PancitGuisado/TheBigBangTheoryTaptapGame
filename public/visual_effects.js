/**
 * visual_effects.js — Premium visual polish for TBBT Idle Game
 * Self-contained: injects its own CSS keyframes, cleans up DOM after animations.
 * All functions are window globals. Uses z-index 300+ to sit above game UI.
 */

(function () {
  'use strict';

  /* ───────────────────────── CSS Injection ───────────────────────── */

  const STYLE_ID = 'vfx-injected-styles';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* ── Floating Damage ── */
      @keyframes vfx-float-up {
        0%   { opacity: 1; transform: translateY(0) scale(1); }
        70%  { opacity: 1; transform: translateY(-60px) scale(1.1); }
        100% { opacity: 0; transform: translateY(-90px) scale(0.8); }
      }
      .vfx-dmg {
        position: fixed;
        pointer-events: none;
        z-index: 310;
        font-weight: 900;
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        text-shadow: 0 2px 6px rgba(0,0,0,0.7), 0 0 2px rgba(0,0,0,0.9);
        animation: vfx-float-up 1s ease-out forwards;
        white-space: nowrap;
      }
      .vfx-dmg--normal {
        color: #ffffff;
        font-size: 20px;
      }
      .vfx-dmg--crit {
        color: #ffd700;
        font-size: 30px;
        text-shadow: 0 0 12px rgba(255,215,0,0.8), 0 2px 6px rgba(0,0,0,0.7);
      }

      /* ── Boss Entrance ── */
      @keyframes vfx-boss-vignette {
        0%   { opacity: 0; }
        15%  { opacity: 1; }
        85%  { opacity: 1; }
        100% { opacity: 0; }
      }
      @keyframes vfx-boss-text {
        0%   { opacity: 0; transform: scale(2.5); letter-spacing: 20px; }
        30%  { opacity: 1; transform: scale(1); letter-spacing: 6px; }
        80%  { opacity: 1; transform: scale(1); letter-spacing: 6px; }
        100% { opacity: 0; transform: scale(0.9); letter-spacing: 2px; }
      }
      @keyframes vfx-screen-shake {
        0%, 100% { transform: translate(0, 0); }
        10%  { transform: translate(-4px, 2px); }
        20%  { transform: translate(3px, -3px); }
        30%  { transform: translate(-2px, 4px); }
        40%  { transform: translate(4px, -1px); }
        50%  { transform: translate(-3px, -3px); }
        60%  { transform: translate(2px, 3px); }
        70%  { transform: translate(-4px, -2px); }
        80%  { transform: translate(3px, 4px); }
        90%  { transform: translate(-1px, -4px); }
      }
      .vfx-boss-overlay {
        position: fixed;
        inset: 0;
        z-index: 350;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        background: radial-gradient(ellipse at center, transparent 30%, rgba(180,0,0,0.6) 100%);
        animation: vfx-boss-vignette 1.5s ease-in-out forwards;
      }
      .vfx-boss-overlay__name {
        color: #ff3333;
        font-size: clamp(28px, 6vw, 56px);
        font-weight: 900;
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        text-transform: uppercase;
        text-shadow: 0 0 30px rgba(255,0,0,0.9), 0 0 60px rgba(255,0,0,0.4),
                     0 4px 12px rgba(0,0,0,0.8);
        animation: vfx-boss-text 1.5s ease-out forwards;
      }
      .vfx-boss-overlay__sub {
        color: rgba(255,180,180,0.8);
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 8px;
        margin-bottom: 20px;
        animation: vfx-boss-text 1.5s ease-out 0.1s forwards;
        opacity: 0;
      }
      .vfx-screen-shake {
        animation: vfx-screen-shake 0.4s ease-in-out;
      }

      /* ── Wave Clear ── */
      @keyframes vfx-wave-banner {
        0%   { opacity: 0; transform: translateY(20px) scale(0.8); }
        15%  { opacity: 1; transform: translateY(0) scale(1); }
        80%  { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-20px) scale(0.9); }
      }
      @keyframes vfx-confetti {
        0%   { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
        100% { opacity: 0; transform: translate(var(--vfx-cx), var(--vfx-cy)) scale(0.3) rotate(var(--vfx-cr)); }
      }
      .vfx-wave-overlay {
        position: fixed;
        inset: 0;
        z-index: 340;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      .vfx-wave-banner {
        color: #34d399;
        font-size: clamp(22px, 5vw, 44px);
        font-weight: 900;
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        text-transform: uppercase;
        letter-spacing: 4px;
        text-shadow: 0 0 20px rgba(52,211,153,0.7), 0 4px 12px rgba(0,0,0,0.8);
        animation: vfx-wave-banner 2s ease-out forwards;
      }
      .vfx-confetti-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 341;
        animation: vfx-confetti 1.2s ease-out forwards;
      }

      /* ── Loot Drop ── */
      @keyframes vfx-sparkle-burst {
        0%   { opacity: 1; transform: translate(0,0) scale(1); }
        100% { opacity: 0; transform: translate(var(--vfx-sx), var(--vfx-sy)) scale(0.2); }
      }
      @keyframes vfx-loot-bounce {
        0%   { opacity: 0; transform: translateY(0) scale(0.3); }
        40%  { opacity: 1; transform: translateY(-40px) scale(1.2); }
        60%  { transform: translateY(-20px) scale(1); }
        75%  { transform: translateY(-30px) scale(1.05); }
        100% { opacity: 0; transform: translateY(-50px) scale(0.8); }
      }
      .vfx-sparkle {
        position: fixed;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #ffd700;
        pointer-events: none;
        z-index: 311;
        animation: vfx-sparkle-burst 0.7s ease-out forwards;
      }
      .vfx-loot-emoji {
        position: fixed;
        pointer-events: none;
        z-index: 312;
        font-size: 28px;
        animation: vfx-loot-bounce 1.2s ease-out forwards;
      }

      /* ── Death Fade ── */
      @keyframes vfx-death-fade {
        0%   { filter: grayscale(0) brightness(1); opacity: 1; }
        30%  { filter: grayscale(0.3) brightness(1.5); opacity: 1; }
        100% { filter: grayscale(1) brightness(0.4); opacity: 0; }
      }
      .vfx-death {
        animation: vfx-death-fade 0.8s ease-in forwards !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* ───────────────── Utility helpers ───────────────── */

  function removeAfter(el, ms) {
    setTimeout(function () {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, ms);
  }

  function randRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  /* ═══════════════════════════════════════════════════
     1. Floating Damage Numbers
     ═══════════════════════════════════════════════════ */

  /**
   * Show a floating damage number that rises and fades.
   * @param {number} x  — CSS left position (px).
   * @param {number} y  — CSS top position (px).
   * @param {number|string} amount — Damage value to display.
   * @param {boolean} [isCrit=false] — Whether this is a critical hit.
   */
  function showFloatingDmg(x, y, amount, isCrit) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    injectStyles();

    var el = document.createElement('div');
    el.className = 'vfx-dmg ' + (isCrit ? 'vfx-dmg--crit' : 'vfx-dmg--normal');
    el.textContent = (isCrit ? '💥 ' : '') + amount;

    // Slight random offset so stacked hits don't overlap perfectly
    var offsetX = randRange(-14, 14);
    var offsetY = randRange(-8, 8);
    el.style.left = (x + offsetX) + 'px';
    el.style.top  = (y + offsetY) + 'px';

    document.body.appendChild(el);
    removeAfter(el, 1050);
  }

  /* ═══════════════════════════════════════════════════
     2. Boss Entrance Effect
     ═══════════════════════════════════════════════════ */

  /**
   * Show a dramatic full-screen boss entrance overlay.
   * @param {string} bossName — The name of the boss.
   */
  function showBossEntrance(bossName) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    injectStyles();

    // Screen-shake on the body
    document.body.classList.add('vfx-screen-shake');
    setTimeout(function () {
      document.body.classList.remove('vfx-screen-shake');
    }, 400);

    // Overlay
    var overlay = document.createElement('div');
    overlay.className = 'vfx-boss-overlay';

    var sub = document.createElement('div');
    sub.className = 'vfx-boss-overlay__sub';
    sub.textContent = '⚠ BOSS APPROACHING ⚠';

    var name = document.createElement('div');
    name.className = 'vfx-boss-overlay__name';
    name.textContent = bossName;

    overlay.appendChild(sub);
    overlay.appendChild(name);
    document.body.appendChild(overlay);

    removeAfter(overlay, 1550);
  }

  /* ═══════════════════════════════════════════════════
     3. Wave Clear Celebration
     ═══════════════════════════════════════════════════ */

  /**
   * Show a 'WAVE X CLEARED!' banner with confetti.
   * @param {number|string} waveNum — The wave number that was cleared.
   */
  function showWaveClear(waveNum) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    injectStyles();

    // Banner
    var overlay = document.createElement('div');
    overlay.className = 'vfx-wave-overlay';

    var banner = document.createElement('div');
    banner.className = 'vfx-wave-banner';
    banner.textContent = 'WAVE ' + waveNum + ' CLEARED!';

    overlay.appendChild(banner);
    document.body.appendChild(overlay);
    removeAfter(overlay, 2100);

    // Confetti dots
    var confettiColors = [
      '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
      '#ff8fd8', '#a66cff', '#00d2d3', '#f8a5c2'
    ];
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;
    var dotCount = 30;

    for (var i = 0; i < dotCount; i++) {
      var dot = document.createElement('div');
      dot.className = 'vfx-confetti-dot';

      var angle = (i / dotCount) * Math.PI * 2 + randRange(-0.3, 0.3);
      var dist  = randRange(80, 260);
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;

      dot.style.left = centerX + 'px';
      dot.style.top  = centerY + 'px';
      dot.style.background = confettiColors[i % confettiColors.length];
      dot.style.setProperty('--vfx-cx', dx + 'px');
      dot.style.setProperty('--vfx-cy', dy + 'px');
      dot.style.setProperty('--vfx-cr', randRange(-360, 360) + 'deg');
      dot.style.animationDelay = randRange(0, 0.3) + 's';

      document.body.appendChild(dot);
      removeAfter(dot, 1600);
    }
  }

  /* ═══════════════════════════════════════════════════
     4. Loot Drop Sparkle
     ═══════════════════════════════════════════════════ */

  /**
   * Show a sparkle burst with a bouncing loot emoji.
   * @param {number} x — CSS left position (px).
   * @param {number} y — CSS top position (px).
   * @param {string} emoji — The loot emoji to display.
   */
  function showLootDrop(x, y, emoji) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    injectStyles();

    // Sparkle ring
    var sparkleCount = 10;
    for (var i = 0; i < sparkleCount; i++) {
      var s = document.createElement('div');
      s.className = 'vfx-sparkle';

      var angle = (i / sparkleCount) * Math.PI * 2;
      var dist  = randRange(20, 50);
      s.style.left = x + 'px';
      s.style.top  = y + 'px';
      s.style.setProperty('--vfx-sx', (Math.cos(angle) * dist) + 'px');
      s.style.setProperty('--vfx-sy', (Math.sin(angle) * dist) + 'px');
      s.style.animationDelay = randRange(0, 0.15) + 's';

      document.body.appendChild(s);
      removeAfter(s, 900);
    }

    // Bouncing emoji
    var em = document.createElement('div');
    em.className = 'vfx-loot-emoji';
    em.textContent = emoji;
    em.style.left = (x - 14) + 'px';
    em.style.top  = y + 'px';

    document.body.appendChild(em);
    removeAfter(em, 1300);
  }

  /* ═══════════════════════════════════════════════════
     5. Death Fade
     ═══════════════════════════════════════════════════ */

  /**
   * Apply a grayscale + fade-out death animation to an element.
   * @param {string} elementId — The DOM id of the element to animate.
   */
  function showDeathEffect(elementId) {
    if (!window.gameStarted) return; // Suppress until title screen dismissed
    injectStyles();

    var el = document.getElementById(elementId);
    if (!el) return;

    el.classList.add('vfx-death');

    // Clean up class after animation so element can be re-used
    el.addEventListener('animationend', function handler() {
      el.classList.remove('vfx-death');
      el.removeEventListener('animationend', handler);
    });
  }

  /* ───────────────── Export as window globals ───────────────── */

  window.showFloatingDmg  = showFloatingDmg;
  window.showBossEntrance = showBossEntrance;
  window.showWaveClear    = showWaveClear;
  window.showLootDrop     = showLootDrop;
  window.showDeathEffect  = showDeathEffect;

})();
