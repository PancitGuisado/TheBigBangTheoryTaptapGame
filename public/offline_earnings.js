/**
 * offline_earnings.js — Offline / Idle Earnings Module
 * Calculates earnings while the player is away and presents a themed modal.
 * Follows IIFE + CSS-injection pattern used throughout the codebase.
 */
(function() {
    'use strict';

    // ── CSS Injection ────────────────────────────────────────────────
    var style = document.createElement('style');
    style.textContent = [
        '/* ── Offline Earnings Modal ── */',
        '.offline-overlay {',
        '  position: fixed;',
        '  inset: 0;',
        '  z-index: 99999;',
        '  display: flex;',
        '  align-items: center;',
        '  justify-content: center;',
        '  background: rgba(0,0,0,0.88);',
        '  backdrop-filter: blur(8px);',
        '  transition: opacity 0.5s ease;',
        '}',
        '.offline-overlay.offline-fade-out {',
        '  opacity: 0;',
        '  pointer-events: none;',
        '}',
        '@keyframes offlineModalIn {',
        '  from { transform: scale(0.85) translateY(30px); opacity: 0; }',
        '  to   { transform: scale(1) translateY(0); opacity: 1; }',
        '}',
        '.offline-modal {',
        '  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);',
        '  border: 2px solid rgba(251,191,36,0.4);',
        '  border-radius: 16px;',
        '  box-shadow: 0 0 40px rgba(251,191,36,0.15), 0 25px 50px rgba(0,0,0,0.5);',
        '  padding: 32px 28px;box-sizing:border-box;',
        '  max-width: 420px;',
        '  width: 90%;',
        '  text-align: center;',
        '  color: #e2e8f0;',
        '  font-family: "Inter", "Segoe UI", sans-serif;',
        '  animation: offlineModalIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards;',
        '}',
        '.offline-title {',
        '  color: #fbbf24;',
        '  font-size: 22px;',
        '  font-weight: 800;',
        '  text-transform: uppercase;',
        '  letter-spacing: 3px;',
        '  margin: 0 0 4px 0;',
        '}',
        '.offline-subtitle {',
        '  color: #94a3b8;',
        '  font-size: 13px;',
        '  margin: 0 0 16px 0;',
        '}',
        '.offline-time {',
        '  color: #94a3b8;',
        '  font-size: 14px;',
        '  margin: 0 0 18px 0;',
        '}',
        '.offline-time span {',
        '  color: #fbbf24;',
        '  font-weight: 700;',
        '}',
        '.offline-rewards {',
        '  background: rgba(0,0,0,0.35);',
        '  border-radius: 12px;',
        '  padding: 14px 16px;box-sizing:border-box;',
        '  margin-bottom: 20px;',
        '}',
        '.offline-reward-row {',
        '  display: flex;',
        '  justify-content: space-between;',
        '  align-items: center;',
        '  padding: 5px 0;',
        '  font-size: 14px;',
        '}',
        '.offline-reward-row .reward-label {',
        '  color: #cbd5e1;',
        '}',
        '.offline-reward-row .reward-amount {',
        '  color: #4ade80;',
        '  font-weight: 700;',
        '}',
        '.offline-reward-row .reward-amount.reward-kills {',
        '  color: #f87171;',
        '}',
        '.offline-collect-btn {',
        '  background: linear-gradient(135deg, #f59e0b 0%, #b45309 100%);',
        '  border: 2px solid rgba(251,191,36,0.6);',
        '  border-radius: 12px;',
        '  color: #fff;',
        '  font-size: 16px;',
        '  font-weight: 800;',
        '  text-transform: uppercase;',
        '  letter-spacing: 2px;',
        '  padding: 14px 0;',
        '  width: 100%;',
        '  cursor: pointer;',
        '  transition: filter 0.2s ease, transform 0.15s ease;',
        '}',
        '.offline-collect-btn:hover {',
        '  filter: brightness(1.12);',
        '  transform: translateY(-1px);',
        '}',
        '.offline-collect-btn:active {',
        '  transform: translateY(1px);',
        '}',
        '.offline-ad-btn {',
        '  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);',
        '  border: 1px solid rgba(139,92,246,0.4);',
        '  border-radius: 10px;',
        '  color: #e2e8f0;',
        '  font-size: 13px;',
        '  font-weight: 700;',
        '  margin-top: 10px;',
        '  padding: 10px 0;',
        '  width: 100%;',
        '  cursor: pointer;',
        '  transition: filter 0.2s ease, transform 0.15s ease;',
        '}',
        '.offline-ad-btn:hover {',
        '  filter: brightness(1.15);',
        '  transform: translateY(-1px);',
        '}',
        '.offline-ad-btn:active {',
        '  transform: translateY(1px);',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    // ── Helpers ───────────────────────────────────────────────────────

    /**
     * Format seconds into a human-readable duration string.
     */
    function formatDuration(totalSeconds) {
        var hours   = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var secs    = Math.floor(totalSeconds % 60);
        var parts   = [];
        if (hours > 0)   parts.push(hours + 'h');
        if (minutes > 0) parts.push(minutes + 'm');
        if (secs > 0 || parts.length === 0) parts.push(secs + 's');
        return parts.join(' ');
    }

    /**
     * Short-format a number (e.g. 12345 → "12.3K").
     */
    function shortNum(n) {
        if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
        if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
        if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
        return Math.floor(n).toLocaleString();
    }

    // ── Earnings Calculation ─────────────────────────────────────────

    /**
     * Calculate offline earnings for the given number of seconds away.
     * Returns an object with money, stone, iron, gold, scrap, kills.
     */
    function calculateEarnings(secondsAway) {
        // State migration fallbacks
        var equipped = (typeof state !== 'undefined' && state.equipped) ? state.equipped : {};
        var roster   = (typeof state !== 'undefined' && state.roster)   ? state.roster   : {};
        var wave     = (typeof state !== 'undefined' && state.wave)     ? state.wave     : 1;

        var equippedKeys = [];
        for (var key in equipped) {
            if (equipped[key] === true) equippedKeys.push(key);
        }
        var characterCount = equippedKeys.length || 1;

        var totalDmg = 0;
        for (var i = 0; i < equippedKeys.length; i++) {
            var k = equippedKeys[i];
            var baseDmg = (characters[k] && characters[k].baseDmg) ? characters[k].baseDmg : 1;
            var level   = (roster[k] && roster[k].level) ? roster[k].level : 1;
            totalDmg += baseDmg * level;
        }
        var avgDmg = equippedKeys.length > 0 ? totalDmg / equippedKeys.length : 1;

        var money = characterCount * avgDmg * 0.3 * secondsAway;
        var stone = Math.floor(wave * 0.3 * secondsAway / 60);
        var iron  = Math.floor(wave * 0.15 * secondsAway / 60);
        var gold  = wave > 10 ? Math.floor(secondsAway / 600 * (wave / 10)) : 0;
        var scrap = Math.floor(wave * 0.2 * secondsAway / 60);
        var kills = Math.floor(secondsAway / 3);

        return {
            money: money,
            stone: stone,
            iron: iron,
            gold: gold,
            scrap: scrap,
            kills: kills
        };
    }

    // ── Modal Builder ────────────────────────────────────────────────

    /**
     * Build and display the Welcome Back modal.
     */
    function showOfflineModal(secondsAway, earnings) {
        // Remove any existing overlay
        var existing = document.getElementById('offline-overlay');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'offline-overlay';
        overlay.className = 'offline-overlay';

        var modal = document.createElement('div');
        modal.className = 'offline-modal';

        // Title
        var title = document.createElement('div');
        title.className = 'offline-title';
        title.textContent = '\u2728 Welcome Back! \u2728';
        modal.appendChild(title);

        // Subtitle
        var subtitle = document.createElement('div');
        subtitle.className = 'offline-subtitle';
        subtitle.textContent = 'Your characters kept working while you were away';
        modal.appendChild(subtitle);

        // Time away
        var timeDiv = document.createElement('div');
        timeDiv.className = 'offline-time';
        timeDiv.innerHTML = 'Time away: <span>' + formatDuration(secondsAway) + '</span>';
        modal.appendChild(timeDiv);

        // Rewards section
        var rewardsBox = document.createElement('div');
        rewardsBox.className = 'offline-rewards';

        var rewardData = [
            { label: '\uD83D\uDCB0 Money',    value: '+$' + shortNum(earnings.money),  cls: 'reward-amount' },
            { label: '\uD83E\uDEA8 Stone',     value: '+' + shortNum(earnings.stone),   cls: 'reward-amount' },
            { label: '\u2699\uFE0F Iron',       value: '+' + shortNum(earnings.iron),    cls: 'reward-amount' },
            { label: '\uD83E\uDD47 Gold',       value: '+' + shortNum(earnings.gold),    cls: 'reward-amount' },
            { label: '\uD83D\uDD29 Scrap',      value: '+' + shortNum(earnings.scrap),   cls: 'reward-amount' },
            { label: '\uD83D\uDC80 Kills',      value: '+' + shortNum(earnings.kills),   cls: 'reward-amount reward-kills' }
        ];

        for (var r = 0; r < rewardData.length; r++) {
            var row = document.createElement('div');
            row.className = 'offline-reward-row';

            var labelSpan = document.createElement('span');
            labelSpan.className = 'reward-label';
            labelSpan.textContent = rewardData[r].label;

            var amountSpan = document.createElement('span');
            amountSpan.className = rewardData[r].cls;
            amountSpan.textContent = rewardData[r].value;

            row.appendChild(labelSpan);
            row.appendChild(amountSpan);
            rewardsBox.appendChild(row);
        }

        modal.appendChild(rewardsBox);

        // Collect button
        var collectBtn = document.createElement('button');
        collectBtn.className = 'offline-collect-btn';
        collectBtn.textContent = '\uD83C\uDF1F COLLECT';
        collectBtn.onclick = function() {
            collectOfflineRewards(earnings, 1, overlay);
        };
        modal.appendChild(collectBtn);

        // Ad button (doubles rewards, no actual ad)
        var adBtn = document.createElement('button');
        adBtn.className = 'offline-ad-btn';
        adBtn.textContent = '\uD83C\uDFA5 Watch Ad for 2x Rewards';
        adBtn.onclick = function() {
            collectOfflineRewards(earnings, 2, overlay);
        };
        modal.appendChild(adBtn);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    // ── Collect Rewards ──────────────────────────────────────────────

    /**
     * Apply offline earnings to state and close the modal.
     * @param {Object} earnings  — reward values from calculateEarnings
     * @param {number} multiplier — 1 for normal, 2 for ad-doubled
     * @param {HTMLElement} overlay — the modal overlay element to remove
     */
    function collectOfflineRewards(earnings, multiplier, overlay) {
        if (typeof state === 'undefined') return;

        // State migration fallbacks for resources
        if (!state.resources) state.resources = {};
        if (typeof state.resources.money  !== 'number') state.resources.money  = 0;
        if (typeof state.resources.stone  !== 'number') state.resources.stone  = 0;
        if (typeof state.resources.iron   !== 'number') state.resources.iron   = 0;
        if (typeof state.resources.gold   !== 'number') state.resources.gold   = 0;
        if (typeof state.resources.scrap  !== 'number') state.resources.scrap  = 0;

        // Apply rewards × multiplier
        state.resources.money += earnings.money * multiplier;
        state.resources.stone += earnings.stone * multiplier;
        state.resources.iron  += earnings.iron  * multiplier;
        state.resources.gold  += earnings.gold  * multiplier;
        state.resources.scrap += earnings.scrap * multiplier;

        // Update stats if available
        if (state.stats) {
            if (typeof state.stats.moneyEarned === 'number') {
                state.stats.moneyEarned += earnings.money * multiplier;
            }
            if (typeof state.stats.enemiesKilled === 'number') {
                state.stats.enemiesKilled += earnings.kills * multiplier;
            }
        }

        // Timestamp update
        state.lastOnlineTimestamp = Date.now();

        // Persist & sync
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();

        // Fade-out overlay & remove
        if (overlay) {
            overlay.classList.add('offline-fade-out');
            setTimeout(function() {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 600);
        }

        // Toast
        var label = multiplier > 1 ? '2× Offline rewards collected!' : 'Offline rewards collected!';
        if (typeof showToast === 'function') {
            showToast(label, 'success');
        }
    }

    // ── Main Entry Point ─────────────────────────────────────────────

    /**
     * Check if the player has been away and, if so, show the offline earnings modal.
     */
    function checkOfflineEarnings() {
        if (typeof state === 'undefined') return;

        // State migration fallback
        if (!state.lastOnlineTimestamp) {
            state.lastOnlineTimestamp = Date.now();
            return;
        }

        var now = Date.now();
        var msAway = now - state.lastOnlineTimestamp;
        var secondsAway = Math.floor(msAway / 1000);

        // Don't show if away less than 60 seconds
        if (secondsAway < 60) return;

        // Cap at 8 hours (28800 seconds)
        var MAX_OFFLINE_SECONDS = 8 * 60 * 60;
        if (secondsAway > MAX_OFFLINE_SECONDS) {
            secondsAway = MAX_OFFLINE_SECONDS;
        }

        var earnings = calculateEarnings(secondsAway);
        showOfflineModal(secondsAway, earnings);
    }

    // ── Window Exports ───────────────────────────────────────────────

    window.checkOfflineEarnings  = checkOfflineEarnings;
    window.collectOfflineRewards = collectOfflineRewards;
    window.checkOfflineProgress  = checkOfflineEarnings; // Override app_v2.js stub

    // ── Auto-init ────────────────────────────────────────────────────

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(checkOfflineEarnings, 1500);
        });
    } else {
        setTimeout(checkOfflineEarnings, 1500);
    }

    // ── Keep timestamp fresh every 60 seconds ────────────────────────

    setInterval(function() {
        if (typeof state !== 'undefined') {
            state.lastOnlineTimestamp = Date.now();
            if (typeof saveProgress === 'function') saveProgress();
        }
    }, 60000);

})();
