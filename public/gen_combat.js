/**
 * ═══════════════════════════════════════════════════════════════════
 *  GEN_COMBAT.JS — Genesis Protocol Combat Passive System
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Implements all 4 Genesis Protocol character combat passives:
 *
 *   1. gen_architect     — knowledgeBuff  : Every 5th attack → team +20% dmg for 5s
 *   2. gen_fallen        — divineStrike   : Every 3rd attack → holy AoE 200% + burn DOT
 *   3. gen_sheldon_prime — timeStop       : Every 6th attack → freeze all enemies 3s
 *   4. gen_observer      — allSeeing      : Every 4th attack → next 3 team attacks guaranteed crits
 *
 *  Hooks into the existing combat loop by wrapping startAutomationEngines().
 *  Self-contained IIFE — no modifications to app_v2.js required.
 *
 *  Dependencies (from app_v2.js / globals):
 *    - processDamage(amt, attackerKey, forceCrit, lifestealMulti)
 *    - generateDamagePopup(event, val, isCrit, isSpecialText, isEnemyDamage)
 *    - window.addCombatLog(icon, message)
 *    - state, characters, currentEnemy, gameTimers
 *    - startAutomationEngines (monkey-patched)
 *    - dropResources, renderActiveBattleLine, _updateBattleLineHP
 *
 * ═══════════════════════════════════════════════════════════════════
 */
(function() {
    'use strict';

    // ────────────────────────────────────────────────────────────────
    //  ATTACK COUNTERS — tracked globally per character key
    // ────────────────────────────────────────────────────────────────
    window._genAttackCounters = {};

    /**
     * Get or initialize an attack counter for a character.
     * @param {string} charKey - Character roster key
     * @returns {number} Current counter value (pre-increment)
     */
    function getCounter(charKey) {
        if (typeof window._genAttackCounters[charKey] === 'undefined') {
            window._genAttackCounters[charKey] = 0;
        }
        return window._genAttackCounters[charKey];
    }

    /** Increment and return the new counter value. */
    function bumpCounter(charKey) {
        window._genAttackCounters[charKey] = (window._genAttackCounters[charKey] || 0) + 1;
        return window._genAttackCounters[charKey];
    }

    /** Reset a character's counter back to zero. */
    function resetCounter(charKey) {
        window._genAttackCounters[charKey] = 0;
    }


    // ────────────────────────────────────────────────────────────────
    //  TEAM BUFF TRACKING
    // ────────────────────────────────────────────────────────────────

    /**
     * Architect's Knowledge Buff — temporary team-wide damage boost.
     * While active, all team members deal +20% damage.
     */
    window._genKnowledgeBuff = {
        active: false,
        expiresAt: 0,
        dmgBonus: 0.20
    };

    /**
     * Observer's All-Seeing Eye — guaranteed crit charges.
     * While charges > 0, team attacks are forced crits.
     */
    window._genAllSeeingCharges = {
        active: false,
        chargesRemaining: 0
    };


    // ────────────────────────────────────────────────────────────────
    //  HELPERS
    // ────────────────────────────────────────────────────────────────

    /** Safe combat log wrapper. */
    function combatLog(icon, message) {
        if (typeof window.addCombatLog === 'function') {
            window.addCombatLog(icon, message);
        }
    }

    /** Spawn a visual FX element in the arena with auto-cleanup. */
    function spawnArenaFX(html, cssText, durationMs) {
        var arena = document.getElementById('arena');
        if (!arena) return;
        var el = document.createElement('div');
        el.innerHTML = html;
        el.style.cssText = cssText;
        arena.appendChild(el);
        setTimeout(function() { if (el.parentNode) el.remove(); }, durationMs || 800);
    }

    /** Get enemy container center coordinates for popup positioning. */
    function getEnemyCenter() {
        var container = document.getElementById('enemy-container');
        if (!container) return { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
        var rect = container.getBoundingClientRect();
        return {
            clientX: rect.left + rect.width / 2 + (Math.random() - 0.5) * 30,
            clientY: rect.top + rect.height / 3 + (Math.random() - 0.5) * 30
        };
    }

    /** Get a character's live element center for popup positioning. */
    function getCharCenter(charKey) {
        var el = document.getElementById('live-character-' + charKey);
        if (!el) return { clientX: 100, clientY: 300 };
        var rect = el.getBoundingClientRect();
        return {
            clientX: rect.left + rect.width / 2,
            clientY: rect.top
        };
    }


    // ────────────────────────────────────────────────────────────────
    //  CORE PASSIVE HANDLER
    // ────────────────────────────────────────────────────────────────

    /**
     * Apply a Genesis Protocol character's passive ability.
     *
     * @param {string}  charKey     - Character roster key
     * @param {string}  passiveType - Passive type string from config
     * @param {number}  damage      - Base output damage (already level-scaled)
     * @param {object}  target      - The current enemy object
     * @param {object}  team        - The state.roster object
     * @returns {boolean} true if the passive was handled, false to fall through
     */
    window.applyGENPassive = function applyGENPassive(charKey, passiveType, damage, target, team) {
        if (!target || target.hp <= 0) return false;

        // Calculate tier lifesteal
        var tierLifesteal = 0;
        var config = (typeof characters !== 'undefined') ? characters[charKey] : null;
        if (config && config.lifestealTiers && state.roster[charKey] && state.roster[charKey].level) {
            var charLvl = state.roster[charKey].level;
            for (var ti = config.lifestealTiers.length - 1; ti >= 0; ti--) {
                if (charLvl >= config.lifestealTiers[ti].level) {
                    tierLifesteal = config.lifestealTiers[ti].pct;
                    break;
                }
            }
        }

        var count = bumpCounter(charKey);

        switch (passiveType) {

            // ═══════════════════════════════════════════════════════
            //  1. ARCHITECT — knowledgeBuff
            //     Every 5th attack: team +20% dmg for 5s
            // ═══════════════════════════════════════════════════════
            case 'knowledgeBuff': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 5 === 0) {
                    resetCounter(charKey);

                    // Activate Knowledge Buff — +20% team damage for 5 seconds
                    window._genKnowledgeBuff.active = true;
                    window._genKnowledgeBuff.expiresAt = Date.now() + 5000;

                    // Schedule buff expiry
                    setTimeout(function() {
                        if (Date.now() >= window._genKnowledgeBuff.expiresAt) {
                            window._genKnowledgeBuff.active = false;
                        }
                    }, 5100);

                    // Visual FX — knowledge burst
                    spawnArenaFX(
                        '📖🧠✨',
                        'position:absolute;top:50%;left:20%;font-size:2.2rem;' +
                        'animation:droidExplode 0.8s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 20px #3b82f6;',
                        900
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getCharCenter(charKey), '📖 TEAM +20% DMG!', false, true, false);
                    }

                    combatLog('📖', 'Architect → Knowledge Buff! Team +20% dmg for 5s');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  2. FALLEN — divineStrike
            //     Every 3rd attack: holy AoE 200% + burn DOT
            // ═══════════════════════════════════════════════════════
            case 'divineStrike': {
                if (count % 3 === 0) {
                    resetCounter(charKey);

                    // Divine strike: 200% AoE holy damage
                    var holyDmg = Math.floor(damage * 2.0);
                    processDamage(holyDmg, charKey, false, tierLifesteal);

                    // Apply burn DOT: 30% dmg per tick for 4 ticks (4 seconds)
                    if (target && target.hp > 0) {
                        if (!target.dots) target.dots = [];
                        target.dots.push({
                            dmg: Math.floor(damage * 0.30),
                            ticks: 4,
                            source: charKey
                        });
                    }

                    // Visual FX — divine fire
                    spawnArenaFX(
                        '👼🔥⚔️',
                        'position:absolute;top:32%;left:50%;transform:translateX(-50%);font-size:2.4rem;' +
                        'animation:droidExplode 0.8s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 25px #f59e0b;',
                        900
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '👼 DIVINE STRIKE!', false, true, false);
                    }

                    combatLog('👼', 'Fallen → Divine Strike! ' + holyDmg + ' holy AoE + burn DOT');
                } else {
                    // Normal attack
                    processDamage(damage, charKey, false, tierLifesteal);
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  3. SHELDON PRIME — timeStop
            //     Every 6th attack: freeze all enemies for 3s
            // ═══════════════════════════════════════════════════════
            case 'timeStop': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 6 === 0) {
                    resetCounter(charKey);

                    // Freeze the current enemy for 3 seconds
                    if (target && target.hp > 0) {
                        target.stunnedUntil = Date.now() + 3000;
                    }

                    // Bonus time-stop damage: 180% hit while frozen
                    var timeDmg = Math.floor(damage * 1.8);
                    processDamage(timeDmg, charKey, true, tierLifesteal);

                    // Visual FX — time stop
                    spawnArenaFX(
                        '⏱️❄️🕐',
                        'position:absolute;top:30%;left:50%;transform:translateX(-50%);font-size:2.6rem;' +
                        'animation:droidExplode 1s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 25px #06b6d4;',
                        1100
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '⏱️ TIME STOP 3s!', false, true, false);
                    }

                    combatLog('⏱️', 'Sheldon Prime → Time Stop! Enemies frozen 3s + ' + timeDmg + ' dmg');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  4. OBSERVER — allSeeing
            //     Every 4th attack: next 3 team attacks = guaranteed crits
            // ═══════════════════════════════════════════════════════
            case 'allSeeing': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 4 === 0) {
                    resetCounter(charKey);

                    // Grant 3 guaranteed crit charges to the team
                    window._genAllSeeingCharges.active = true;
                    window._genAllSeeingCharges.chargesRemaining = 3;

                    // Visual FX — all-seeing eye
                    spawnArenaFX(
                        '👁️✨🔮',
                        'position:absolute;top:45%;left:25%;font-size:2.2rem;' +
                        'animation:droidExplode 0.8s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 20px #8b5cf6;',
                        900
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getCharCenter(charKey), '👁️ ALL-SEEING! 3 CRITS!', false, true, false);
                    }

                    combatLog('👁️', 'Observer → All-Seeing Eye! Next 3 team attacks are guaranteed crits');
                }
                return true;
            }

            default:
                return false;
        }
    };


    // ────────────────────────────────────────────────────────────────
    //  KNOWLEDGE BUFF HOOK — Inject damage bonus into processDamage
    // ────────────────────────────────────────────────────────────────
    //
    // Monkey-patch processDamage to check for Architect's Knowledge Buff.
    // When active, add +20% damage to all team attacks.
    // Also handles Observer's All-Seeing crit charges.
    //
    (function patchProcessDamage() {
        if (typeof processDamage !== 'function') {
            setTimeout(patchProcessDamage, 500);
            return;
        }

        var _originalProcessDamage = processDamage;

        window.processDamage = function(amt, attackerKey, forceCrit, lifestealMulti) {
            // Knowledge Buff: boost all team damage by 20%
            if (window._genKnowledgeBuff.active &&
                Date.now() < window._genKnowledgeBuff.expiresAt) {
                amt = Math.floor(amt * (1 + window._genKnowledgeBuff.dmgBonus));
            }

            // Check knowledge buff expiry
            if (window._genKnowledgeBuff.active && Date.now() >= window._genKnowledgeBuff.expiresAt) {
                window._genKnowledgeBuff.active = false;
            }

            // All-Seeing Eye: consume a crit charge
            if (!forceCrit &&
                window._genAllSeeingCharges.active &&
                window._genAllSeeingCharges.chargesRemaining > 0) {
                forceCrit = true;
                window._genAllSeeingCharges.chargesRemaining--;

                if (window._genAllSeeingCharges.chargesRemaining <= 0) {
                    window._genAllSeeingCharges.active = false;
                }
            }

            return _originalProcessDamage.call(this, amt, attackerKey, forceCrit, lifestealMulti || 0);
        };
    })();


    // ────────────────────────────────────────────────────────────────
    //  COMBAT LOOP PATCH — Hook into startAutomationEngines
    // ────────────────────────────────────────────────────────────────
    //
    // Wrap startAutomationEngines to inject GEN passive handling.
    // After the original function runs, override timers for GEN
    // characters with our custom versions.
    //
    (function patchAutomation() {
        if (typeof startAutomationEngines !== 'function') {
            setTimeout(patchAutomation, 500);
            return;
        }

        var _originalStartAutomation = startAutomationEngines;

        window.startAutomationEngines = function() {
            // Run the original — this sets up timers for ALL characters
            _originalStartAutomation.apply(this, arguments);

            // Now, for GEN characters with GEN-specific passives,
            // clear the original timer and replace with our version
            if (typeof characters === 'undefined' || typeof state === 'undefined') return;
            if (!state.equipped || !state.roster) return;

            var genPassiveTypes = [
                'knowledgeBuff', 'divineStrike', 'timeStop', 'allSeeing'
            ];

            for (var key in characters) {
                if (!characters.hasOwnProperty(key)) continue;
                if (!state.roster[key] || !state.equipped[key]) continue;

                var config = characters[key];
                if (!config.passiveType || genPassiveTypes.indexOf(config.passiveType) === -1) continue;

                // This is a GEN character — replace its combat timer
                if (typeof gameTimers !== 'undefined' && gameTimers[key]) {
                    clearInterval(gameTimers[key]);
                }

                // Set up the GEN combat timer
                (function(charKey, charConfig) {
                    var rate = charConfig.atkSpeed;
                    if (typeof rageDuration !== 'undefined' && rageDuration > 0) rate *= 0.45;
                    var speedMult = (typeof getSpeedMultiplier === 'function') ? getSpeedMultiplier() : 1;
                    rate = Math.floor(rate / speedMult);

                    gameTimers[charKey] = setInterval(function() {
                        if (!window.gameStarted) return;
                        if (!state.equipped[charKey] || !state.roster[charKey]) return;
                        if (state.roster[charKey].status === 'hospitalized') return;
                        if (state.roster[charKey].currentHp <= 0) return;
                        if (state.roster[charKey].stunnedUntil && Date.now() < state.roster[charKey].stunnedUntil) return;

                        // Trigger attack animation (reuse existing system)
                        if (typeof triggerUniqueVisuals === 'function') {
                            triggerUniqueVisuals(charKey);
                        }

                        // Calculate base output damage (same as app_v2.js)
                        var outDmg = charConfig.baseDmg * state.roster[charKey].level;
                        if (state.roster[charKey].talents && state.roster[charKey].talents.dmg) {
                            outDmg = Math.floor(outDmg * (1 + (state.roster[charKey].talents.dmg * 0.10)));
                        }
                        // Prestige perk: Damage Boost
                        if (state.perks && state.perks.dmgMult) {
                            outDmg = Math.floor(outDmg * (1 + state.perks.dmgMult * 0.10));
                        }

                        // Apply the GEN passive
                        var handled = applyGENPassive(
                            charKey,
                            charConfig.passiveType,
                            outDmg,
                            (typeof currentEnemy !== 'undefined') ? currentEnemy : null,
                            state.roster
                        );

                        // Fallback: if passive wasn't handled, do normal damage
                        if (!handled && outDmg > 0) {
                            processDamage(outDmg, charKey, false, 0);
                        }

                        // Supportive passive side-effects (rage buff if applicable)
                        if (charConfig.passiveType === 'rage') {
                            rageDuration = 50 + (state.roster[charKey].level * 10);
                            var arena = document.getElementById('arena');
                            if (arena) arena.classList.add('rage-active-bg');
                            startAutomationEngines();
                        }

                    }, rate);
                })(key, config);
            }
        };

        console.log('[GEN_COMBAT] ✅ Combat loop patched — Genesis Protocol passives active');
    })();


    // ────────────────────────────────────────────────────────────────
    //  INITIALIZATION LOG
    // ────────────────────────────────────────────────────────────────

    console.log('[GEN_COMBAT] 🧬 Genesis Protocol Combat Module loaded');
    console.log('[GEN_COMBAT] Passives: knowledgeBuff, divineStrike, timeStop, allSeeing');

})();
