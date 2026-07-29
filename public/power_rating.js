// ============================================================
// COMBAT POWER RATING — Single aggregate score for team strength
// Displayed in top bar, used for matchmaking reference
// ============================================================

(function() {
    'use strict';

    /**
     * Calculate combat power for a single character
     */
    function getCharPower(charKey) {
        if (!characters || !characters[charKey]) return 0;
        if (!state.roster || !state.roster[charKey]) return 0;

        var ch = characters[charKey];
        var roster = state.roster[charKey];
        var level = roster.level || 0;
        if (level <= 0) return 0;

        // Base stats contribution
        var baseDmg = (ch.baseDmg || 10) * level;
        var baseHp = (ch.baseHp || 100) * (1 + (level - 1) * 0.15);
        var speed = ch.atkSpeed ? (1000 / ch.atkSpeed) : 1; // attacks per second

        // DPS-based power (core metric)
        var dps = baseDmg * speed;

        // Equipment bonuses
        var equipStats = { dmg: 0, hp: 0, critPct: 0, speedPct: 0 };
        if (typeof getCharEquipmentStats === 'function') {
            equipStats = getCharEquipmentStats(charKey);
        }

        // Equipment power contribution
        var equipPower = (equipStats.dmg * 2) + (equipStats.hp * 0.5) +
                         (equipStats.critPct * 10) + (equipStats.speedPct * 15);

        // Skin bonus (evolved characters are stronger)
        var skinBonus = 0;
        if (roster.unlockedSkins && roster.unlockedSkins.length > 1) {
            skinBonus = (roster.unlockedSkins.length - 1) * 20;
        }

        // Total character power
        var power = Math.floor(dps * 1.5 + baseHp * 0.3 + equipPower + skinBonus);
        return power;
    }

    /**
     * Calculate total team combat power
     */
    function getTeamPower() {
        var total = 0;
        if (!state.equipped) return 0;

        for (var key in state.equipped) {
            if (state.equipped[key]) {
                total += getCharPower(key);
            }
        }

        // Set bonus multiplier
        if (typeof getActiveBonuses === 'function') {
            var bonuses = getActiveBonuses();
            if (bonuses && bonuses.length > 0) {
                total = Math.floor(total * (1 + bonuses.length * 0.05));
            }
        }

        // Skill tree bonus
        if (state.skillPoints && typeof state.skillPoints === 'object') {
            var spentPoints = 0;
            for (var node in state.skillPoints) {
                spentPoints += state.skillPoints[node] || 0;
            }
            total += spentPoints * 15;
        }

        // Prestige bonus
        if (state.prestigeCount) {
            total = Math.floor(total * (1 + state.prestigeCount * 0.10));
        }

        return total;
    }

    /**
     * Format power number with K/M suffix
     */
    function formatPower(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return String(num);
    }

    /**
     * Get power tier with color and icon
     */
    function getPowerTier(power) {
        if (power >= 500000) return { name: 'Mythic',    icon: '🌟', color: '#ff6b6b', glow: 'rgba(255,107,107,0.4)' };
        if (power >= 200000) return { name: 'Legendary', icon: '⭐', color: '#fbbf24', glow: 'rgba(251,191,36,0.4)' };
        if (power >= 100000) return { name: 'Epic',      icon: '💎', color: '#a855f7', glow: 'rgba(168,85,247,0.4)' };
        if (power >= 50000)  return { name: 'Rare',      icon: '🔷', color: '#3b82f6', glow: 'rgba(59,130,246,0.4)' };
        if (power >= 10000)  return { name: 'Uncommon',  icon: '🟢', color: '#22c55e', glow: 'rgba(34,197,94,0.4)' };
        return                       { name: 'Common',   icon: '⚪', color: '#9ca3af', glow: 'rgba(156,163,175,0.3)' };
    }

    /**
     * Inject power display into top bar
     */
    function injectPowerDisplay() {
        if (document.getElementById('power-display')) return;

        // Find the top bar resource row
        var resRow = document.querySelector('.absolute.top-0 .flex.items-center.gap-1\\.5');
        if (!resRow) return;

        // Create power display element
        var sep = document.createElement('span');
        sep.className = 'text-gray-600';
        sep.textContent = '|';

        var powerEl = document.createElement('span');
        powerEl.id = 'power-display';
        powerEl.className = 'whitespace-nowrap cursor-pointer';
        powerEl.title = 'Team Combat Power';
        powerEl.onclick = function() { showPowerBreakdown(); };
        powerEl.innerHTML = '⚡<span id="power-val" class="text-orange-400 font-bold">0</span>';

        // Insert after the IQ score
        resRow.insertBefore(sep, resRow.children[4] || null);
        resRow.insertBefore(powerEl, resRow.children[5] || null);
    }

    /**
     * Update power display value
     */
    function updatePowerDisplay() {
        var el = document.getElementById('power-val');
        if (!el) {
            injectPowerDisplay();
            el = document.getElementById('power-val');
            if (!el) return;
        }

        var power = getTeamPower();
        var tier = getPowerTier(power);
        el.textContent = formatPower(power);
        el.style.color = tier.color;
        el.parentElement.title = tier.icon + ' ' + tier.name + ' — ' + power.toLocaleString() + ' CP';
    }

    /**
     * Show detailed power breakdown modal
     */
    function showPowerBreakdown() {
        var existing = document.getElementById('power-breakdown-modal');
        if (existing) existing.remove();

        var totalPower = getTeamPower();
        var tier = getPowerTier(totalPower);

        // Build character breakdown
        var charRows = '';
        var charPowers = [];
        if (state.equipped) {
            for (var key in state.equipped) {
                if (state.equipped[key] && characters[key]) {
                    charPowers.push({ key: key, name: characters[key].name, power: getCharPower(key) });
                }
            }
        }
        charPowers.sort(function(a, b) { return b.power - a.power; });

        for (var i = 0; i < charPowers.length; i++) {
            var cp = charPowers[i];
            var pct = totalPower > 0 ? Math.floor((cp.power / totalPower) * 100) : 0;
            charRows += '<div class="flex items-center gap-2 mb-1.5">' +
                '<span class="text-[9px] font-bold text-white w-20 truncate">' + cp.name + '</span>' +
                '<div class="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">' +
                    '<div class="h-full rounded-full" style="width:' + Math.min(100, pct) + '%;background:' + tier.color + '"></div>' +
                '</div>' +
                '<span class="text-[8px] text-gray-400 font-mono w-12 text-right">' + formatPower(cp.power) + '</span>' +
            '</div>';
        }

        var modal = document.createElement('div');
        modal.id = 'power-breakdown-modal';
        modal.className = 'fixed inset-0 z-[9400] flex items-center justify-center';
        modal.innerHTML = '' +
            '<div class="absolute inset-0 bg-black/60" onclick="document.getElementById(\'power-breakdown-modal\').remove()"></div>' +
            '<div class="relative bg-slate-900/95 backdrop-blur-xl border rounded-2xl max-w-[360px] w-full mx-4 shadow-2xl overflow-hidden" style="border-color:' + tier.color + '40">' +
                // Header
                '<div class="px-5 py-4 text-center border-b border-white/10" style="background:linear-gradient(135deg, ' + tier.color + '10, transparent)">' +
                    '<div class="text-3xl mb-1">' + tier.icon + '</div>' +
                    '<div class="text-[10px] font-bold uppercase tracking-widest mb-1" style="color:' + tier.color + '">' + tier.name + ' Tier</div>' +
                    '<div class="text-white text-2xl font-black">' + totalPower.toLocaleString() + '</div>' +
                    '<div class="text-[8px] text-gray-500 uppercase tracking-wider">Combat Power</div>' +
                '</div>' +
                // Character breakdown
                '<div class="p-4">' +
                    '<div class="text-[8px] text-gray-500 uppercase font-bold tracking-wider mb-2">Team Contribution</div>' +
                    charRows +
                    // Bonuses
                    '<div class="mt-3 pt-3 border-t border-white/5">' +
                        '<div class="text-[8px] text-gray-500 uppercase font-bold tracking-wider mb-1">Active Bonuses</div>' +
                        (state.prestigeCount ? '<div class="text-[8px] text-purple-400">♻️ Prestige x' + state.prestigeCount + ' (+' + (state.prestigeCount * 10) + '%)</div>' : '') +
                    '</div>' +
                    '<button onclick="document.getElementById(\'power-breakdown-modal\').remove()" class="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-gray-300 text-[9px] font-bold py-2 rounded-lg cursor-pointer border border-white/10 transition-all uppercase tracking-wider">Close</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(modal);
    }

    // ---- INIT ----
    // Power display is now accessible via the More menu's "Power" button.
    // No auto-injection into the top bar to keep HUD clean.

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {});
    } else {
        // no-op — power breakdown opens on demand
    }

    // Exports
    window.getTeamPower = getTeamPower;
    window.getCharPower = getCharPower;
    window.getPowerTier = getPowerTier;
    window.showPowerBreakdown = showPowerBreakdown;
    window.updatePowerDisplay = updatePowerDisplay;
})();
