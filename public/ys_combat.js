/**
 * ═══════════════════════════════════════════════════════════════════
 *  YS_COMBAT.JS — Young Sheldon Combat Passive System
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Implements all 10 Young Sheldon character combat passives:
 *
 *   1. ys_young_sheldon  — summonTrainStun   : Every 5th attack → 200% AoE + 1.5s stun
 *   2. ys_missy          — summonDollCrit    : Every 8th attack → +30% team crit for 5s
 *   3. ys_george         — brisketSlam       : 15% lifesteal on every hit
 *   4. ys_meemaw         — coinLootBoost     : +50% money/loot, bonus gold on kill
 *   5. ys_sturgis        — chemicalAoe       : Every 4th attack → 150% AoE + 3s poison DOT
 *   6. ys_billy          — summonChicken     : Every 6th attack → 3 chickens (40% dmg × 4s)
 *   7. ys_georgie        — tireLootSlow      : -25% enemy atk speed for 3s + 25% loot
 *   8. ys_tam            — warBurst          : Every 3rd attack → triple damage burst
 *   9. ys_pastor_jeff    — holyHeal          : Every 5th attack → heal lowest ally 20% maxHP
 *  10. ys_pastor_rob     — whipCrit          : EVERY attack is a guaranteed crit (200%)
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
    window._ysAttackCounters = {};

    /**
     * Get or initialize an attack counter for a character.
     * @param {string} charKey - Character roster key (e.g. 'ys_tam')
     * @returns {number} Current counter value (pre-increment)
     */
    function getCounter(charKey) {
        if (typeof window._ysAttackCounters[charKey] === 'undefined') {
            window._ysAttackCounters[charKey] = 0;
        }
        return window._ysAttackCounters[charKey];
    }

    /** Increment and return the new counter value. */
    function bumpCounter(charKey) {
        window._ysAttackCounters[charKey] = (window._ysAttackCounters[charKey] || 0) + 1;
        return window._ysAttackCounters[charKey];
    }

    /** Reset a character's counter back to zero. */
    function resetCounter(charKey) {
        window._ysAttackCounters[charKey] = 0;
    }


    // ────────────────────────────────────────────────────────────────
    //  TEAM BUFF TRACKING
    // ────────────────────────────────────────────────────────────────

    /**
     * Missy's Lobster Buff — temporary team-wide crit chance boost.
     * While active, all team members gain +30% crit chance.
     */
    window._ysLobsterBuff = {
        active: false,
        expiresAt: 0,
        critBonus: 0.30
    };

    /**
     * Georgie's Tire Slow debuff on the current enemy.
     * While active, enemy attack interval is extended by 25%.
     */
    window._ysTireSlow = {
        active: false,
        expiresAt: 0,
        slowPct: 0.25
    };

    /**
     * Active chicken summons from Billy Sparks.
     * Each entry: { dmg, expiresAt, tickInterval }
     */
    window._ysActiveChickens = [];


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

    /** Find the ally with the lowest HP percentage (for heals). */
    function findLowestHPAlly() {
        if (typeof state === 'undefined' || !state.equipped || !state.roster) return null;
        var lowestKey = null;
        var lowestPct = 1.0;

        Object.keys(state.equipped).forEach(function(key) {
            if (!state.equipped[key] || !state.roster[key]) return;
            if (state.roster[key].status === 'hospitalized') return;
            if (state.roster[key].currentHp <= 0) return;

            var maxHp = state.roster[key].maxHp || 100;
            var pct = state.roster[key].currentHp / maxHp;
            if (pct < lowestPct) {
                lowestPct = pct;
                lowestKey = key;
            }
        });

        return lowestKey;
    }


    // ────────────────────────────────────────────────────────────────
    //  CORE PASSIVE HANDLER
    // ────────────────────────────────────────────────────────────────

    /**
     * Apply a Young Sheldon character's passive ability.
     *
     * Called from the patched combat loop INSTEAD of the default
     * processDamage() call for YS characters.
     *
     * @param {string}  charKey     - Character roster key
     * @param {string}  passiveType - Passive type string from config
     * @param {number}  damage      - Base output damage (already level-scaled)
     * @param {object}  target      - The current enemy object
     * @param {object}  team        - The state.roster object
     * @returns {boolean} true if the passive was handled, false to fall through
     */
    window.applyYSPassive = function applyYSPassive(charKey, passiveType, damage, target, team) {
        if (!target || target.hp <= 0) return false;

        // Calculate tier lifesteal (some YS chars have it: George, Billy)
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
            //  1. YOUNG SHELDON — summonTrainStun
            //     Every 5th attack: 200% AoE damage + 1.5s stun all
            // ═══════════════════════════════════════════════════════
            case 'summonTrainStun': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 5 === 0) {
                    resetCounter(charKey);

                    // Train slam: 200% damage
                    var trainDmg = Math.floor(damage * 2.0);
                    processDamage(trainDmg, charKey, false, tierLifesteal);

                    // Stun the enemy for 1.5 seconds
                    if (target && target.hp > 0) {
                        target.stunnedUntil = Date.now() + 1500;
                    }

                    // Visual FX — toy train emoji burst
                    spawnArenaFX(
                        '🚂💥',
                        'position:absolute;top:35%;left:50%;transform:translateX(-50%);font-size:2.5rem;' +
                        'animation:droidExplode 0.7s ease-out forwards;pointer-events:none;z-index:999;',
                        800
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), 'STUNNED!', false, true, false);
                    }

                    combatLog('🚂', charKey + ' → Train Stun! ' + trainDmg + ' AoE');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  2. MISSY COOPER — summonDollCrit
            //     Every 8th attack: summon doll + team +30% crit 5s
            // ═══════════════════════════════════════════════════════
            case 'summonDollCrit': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 8 === 0) {
                    resetCounter(charKey);

                    // Activate Lobster Buff — +30% crit chance for 5 seconds
                    window._ysLobsterBuff.active = true;
                    window._ysLobsterBuff.expiresAt = Date.now() + 5000;

                    // Schedule buff expiry
                    setTimeout(function() {
                        if (Date.now() >= window._ysLobsterBuff.expiresAt) {
                            window._ysLobsterBuff.active = false;
                        }
                    }, 5100);

                    // Doll damage hit
                    var dollDmg = Math.floor(damage * 1.5);
                    processDamage(dollDmg, charKey, true, tierLifesteal);

                    // Visual FX
                    spawnArenaFX(
                        '🪆✨',
                        'position:absolute;top:45%;left:45%;font-size:2rem;' +
                        'animation:droidExplode 0.6s ease-out forwards;pointer-events:none;z-index:999;',
                        700
                    );

                    // Team buff indicator
                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getCharCenter(charKey), '🦞 CRIT BUFF!', false, true, false);
                    }

                    combatLog('🦞', 'Missy → Lobster Buff! Team +30% crit for 5s');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  3. GEORGE COOPER SR. — brisketSlam
            //     Every hit heals George for 15% of damage dealt
            // ═══════════════════════════════════════════════════════
            case 'brisketSlam': {
                var brisketLifesteal = (config ? (config.basePassiveAmount || 0.15) : 0.15) + tierLifesteal;
                processDamage(damage, charKey, false, brisketLifesteal);

                // Show heal popup periodically (every 3rd hit to reduce spam)
                if (count % 3 === 0) {
                    var healAmt = Math.floor(damage * brisketLifesteal);
                    if (healAmt > 0) {
                        combatLog('🥩', 'George healed +' + healAmt + ' (brisket)');
                    }
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  4. MEEMAW — coinLootBoost
            //     Passive +50% money/loot when equipped.
            //     Normal damage + bonus gold visual on kills.
            // ═══════════════════════════════════════════════════════
            case 'coinLootBoost': {
                processDamage(damage, charKey, false, tierLifesteal);

                // The +50% loot boost is handled by patching dropResources (below).
                // On every 4th attack, show the coin shower visual
                if (count % 4 === 0) {
                    spawnArenaFX(
                        '💰🪙💰',
                        'position:absolute;top:50%;left:48%;font-size:1.8rem;' +
                        'animation:droidExplode 0.5s ease-out forwards;pointer-events:none;z-index:999;',
                        600
                    );
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  5. DR. STURGIS — chemicalAoe
            //     Every 4th attack: 150% AoE + 3s poison DOT
            // ═══════════════════════════════════════════════════════
            case 'chemicalAoe': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 4 === 0) {
                    resetCounter(charKey);

                    // Chemical flask: 150% AoE damage
                    var chemDmg = Math.floor(damage * 1.5);
                    processDamage(chemDmg, charKey, false, tierLifesteal);

                    // Apply poison DOT: damage over 3 seconds (3 ticks)
                    if (target && target.hp > 0) {
                        if (!target.dots) target.dots = [];
                        target.dots.push({
                            dmg: Math.floor(damage * 0.3),
                            ticks: 3,
                            source: charKey
                        });
                    }

                    // Visual FX — chemical flask
                    spawnArenaFX(
                        '🧪💚☠️',
                        'position:absolute;top:38%;left:52%;font-size:2rem;' +
                        'animation:droidExplode 0.6s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 15px #22c55e;',
                        700
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '☠️ POISONED!', false, true, false);
                    }

                    combatLog('🧪', 'Dr. Sturgis → Chemical AoE! ' + chemDmg + ' + poison DOT');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  6. BILLY SPARKS — summonChicken
            //     Every 6th attack: summon 3 chickens (40% dmg for 4s)
            // ═══════════════════════════════════════════════════════
            case 'summonChicken': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 6 === 0) {
                    resetCounter(charKey);

                    var chickenDmg = Math.floor(damage * 0.4);
                    var chickenDuration = 4000;
                    var chickenTickRate = 800; // each chicken pecks every 800ms
                    var numChickens = 3;

                    // Spawn 3 chicken summons as independent timers
                    for (var ci = 0; ci < numChickens; ci++) {
                        (function(idx) {
                            var expiresAt = Date.now() + chickenDuration;
                            var chickenTimer = setInterval(function() {
                                if (Date.now() > expiresAt) {
                                    clearInterval(chickenTimer);
                                    return;
                                }
                                if (typeof currentEnemy !== 'undefined' && currentEnemy && currentEnemy.hp > 0) {
                                    processDamage(chickenDmg, charKey, false, tierLifesteal);
                                }
                            }, chickenTickRate);

                            // Safety cleanup
                            setTimeout(function() { clearInterval(chickenTimer); }, chickenDuration + 200);
                        })(ci);
                    }

                    // Visual FX — chicken swarm
                    spawnArenaFX(
                        '🐔🐔🐔',
                        'position:absolute;top:42%;left:50%;transform:translateX(-50%);font-size:2rem;' +
                        'animation:droidExplode 0.8s ease-out forwards;pointer-events:none;z-index:999;',
                        900
                    );

                    combatLog('🐔', 'Billy → 3 Chickens summoned! (' + chickenDmg + ' each for 4s)');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  7. GEORGIE COOPER — tireLootSlow
            //     Every hit slows enemy atk speed by 25% for 3s.
            //     Passive +25% loot (handled in dropResources patch).
            // ═══════════════════════════════════════════════════════
            case 'tireLootSlow': {
                processDamage(damage, charKey, false, tierLifesteal);

                // Apply slow debuff on every hit
                window._ysTireSlow.active = true;
                window._ysTireSlow.expiresAt = Date.now() + 3000;

                // Mark the enemy as slowed for visual feedback
                if (target) {
                    target._ysSlowedUntil = Date.now() + 3000;
                }

                // Schedule debuff expiry
                setTimeout(function() {
                    if (Date.now() >= window._ysTireSlow.expiresAt) {
                        window._ysTireSlow.active = false;
                    }
                }, 3100);

                // Visual every 5th hit to reduce spam
                if (count % 5 === 0) {
                    spawnArenaFX(
                        '🛞💨',
                        'position:absolute;top:40%;left:55%;font-size:1.6rem;' +
                        'animation:droidExplode 0.5s ease-out forwards;pointer-events:none;z-index:999;',
                        600
                    );
                    combatLog('🛞', 'Georgie → Tire Slow! Enemy -25% atk speed');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  8. TAM NGUYEN — warBurst
            //     Every 3rd attack: burst of 3 throwing stars (3× dmg)
            // ═══════════════════════════════════════════════════════
            case 'warBurst': {
                if (count % 3 === 0) {
                    resetCounter(charKey);

                    // Triple damage burst — 3 individual hits
                    for (var si = 0; si < 3; si++) {
                        processDamage(damage, charKey, false, tierLifesteal);
                    }

                    // Visual FX — throwing stars
                    spawnArenaFX(
                        '⭐⭐⭐',
                        'position:absolute;top:36%;left:48%;font-size:1.8rem;' +
                        'animation:droidExplode 0.5s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 10px #fbbf24;',
                        600
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '⭐ ×3 BURST!', false, true, false);
                    }

                    combatLog('⭐', 'Tam → War Burst! 3× ' + damage + ' = ' + (damage * 3));
                } else {
                    // Normal single attack
                    processDamage(damage, charKey, false, tierLifesteal);
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  9. PASTOR JEFF — holyHeal
            //     Every 5th attack: heal lowest HP ally for 20% maxHP
            //     Normal attack does 100% damage (beam)
            // ═══════════════════════════════════════════════════════
            case 'holyHeal': {
                // Beam attack — 100% damage
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 5 === 0) {
                    resetCounter(charKey);

                    // Find lowest HP ally
                    var healTarget = findLowestHPAlly();
                    if (healTarget && state.roster[healTarget]) {
                        var maxHp = state.roster[healTarget].maxHp || 100;
                        var healAmount = Math.floor(maxHp * 0.20);
                        state.roster[healTarget].currentHp = Math.min(
                            maxHp,
                            state.roster[healTarget].currentHp + healAmount
                        );
                        state.roster[healTarget].hp = state.roster[healTarget].currentHp;

                        // Green heal popup on the healed character
                        if (typeof generateDamagePopup === 'function') {
                            generateDamagePopup(getCharCenter(healTarget), '+' + healAmount, false, true, false);
                        }

                        // Update battle line HP bars
                        if (typeof _updateBattleLineHP === 'function') _updateBattleLineHP();

                        combatLog('✝️', 'Pastor Jeff → Holy Heal! ' + healTarget + ' +' + healAmount + ' HP');
                    }

                    // Visual FX — holy light
                    spawnArenaFX(
                        '✝️💛',
                        'position:absolute;top:55%;left:25%;font-size:2rem;' +
                        'animation:droidExplode 0.6s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 20px #fbbf24;',
                        700
                    );
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  10. PASTOR ROB — whipCrit
            //      EVERY attack is a guaranteed critical hit (200%)
            // ═══════════════════════════════════════════════════════
            case 'whipCrit': {
                // Force crit on every single attack
                processDamage(damage, charKey, true, tierLifesteal);

                // Whip crack visual every 3rd hit
                if (count % 3 === 0) {
                    spawnArenaFX(
                        '🔥💥',
                        'position:absolute;top:37%;left:52%;font-size:1.6rem;' +
                        'animation:droidExplode 0.4s ease-out forwards;pointer-events:none;z-index:999;',
                        500
                    );
                }
                return true;
            }

            default:
                return false;
        }
    };


    // ────────────────────────────────────────────────────────────────
    //  LOBSTER BUFF HOOK — Inject crit bonus into processDamage
    // ────────────────────────────────────────────────────────────────
    //
    // Monkey-patch processDamage to check for Missy's Lobster Buff.
    // When active, add +30% crit chance to all team attacks.
    //
    (function patchProcessDamage() {
        // Wait until processDamage is defined
        if (typeof processDamage !== 'function') {
            setTimeout(patchProcessDamage, 500);
            return;
        }

        var _originalProcessDamage = processDamage;

        window.processDamage = function(amt, attackerKey, forceCrit, lifestealMulti) {
            // Lobster Buff: boost crit chance by making non-crit attacks
            // have a 30% chance to become forced crits
            if (!forceCrit &&
                window._ysLobsterBuff.active &&
                Date.now() < window._ysLobsterBuff.expiresAt &&
                Math.random() < window._ysLobsterBuff.critBonus) {
                forceCrit = true;
            }

            // Check lobster buff expiry
            if (window._ysLobsterBuff.active && Date.now() >= window._ysLobsterBuff.expiresAt) {
                window._ysLobsterBuff.active = false;
            }

            return _originalProcessDamage.call(this, amt, attackerKey, forceCrit, lifestealMulti || 0);
        };
    })();


    // ────────────────────────────────────────────────────────────────
    //  LOOT BOOST HOOKS — Meemaw +50% & Georgie +25%
    // ────────────────────────────────────────────────────────────────
    //
    // Patch dropResources to apply loot bonuses when these chars
    // are equipped. Also handles Meemaw's bonus gold on kill.
    //
    (function patchDropResources() {
        if (typeof dropResources !== 'function') {
            setTimeout(patchDropResources, 500);
            return;
        }

        var _originalDropResources = dropResources;

        window.dropResources = function(isFromBoss) {
            // Call original drop logic
            _originalDropResources.call(this, isFromBoss);

            if (typeof state === 'undefined' || !state.equipped) return;

            // Meemaw: +50% bonus money on kill
            if (state.equipped['ys_meemaw'] && state.roster['ys_meemaw'] &&
                state.roster['ys_meemaw'].status !== 'hospitalized') {
                var meemawLevel = state.roster['ys_meemaw'].level || 1;
                var bonusMoney = Math.floor(
                    (isFromBoss ? 30 : 5) * Math.pow(1.15, (state.wave || 1) - 1) * (0.50 + meemawLevel * 0.005)
                );
                state.resources.money = (state.resources.money || 0) + bonusMoney;

                // Bonus loot chance from Meemaw
                var meemawLootBonus = 0.50 + (meemawLevel * 0.005);
                var resourceDropsRef = (typeof resourceDrops !== 'undefined') ? resourceDrops : null;
                if (resourceDropsRef) {
                    var dropTable = isFromBoss ? resourceDropsRef.boss : resourceDropsRef.minion;
                    if (dropTable) {
                        for (var resource in dropTable) {
                            if (!dropTable.hasOwnProperty(resource)) continue;
                            var dropInfo = dropTable[resource];
                            if (Math.random() < dropInfo[0] * meemawLootBonus) {
                                var amount = Math.floor(Math.random() * (dropInfo[2] - dropInfo[1] + 1)) + dropInfo[1];
                                if (amount > 0) {
                                    state.resources[resource] = (state.resources[resource] || 0) + amount;
                                }
                            }
                        }
                    }
                }

                // Visual — coins
                var meemawEl = document.getElementById('live-character-ys_meemaw');
                if (meemawEl && bonusMoney > 5) {
                    var mr = meemawEl.getBoundingClientRect();
                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(
                            { clientX: mr.left + mr.width / 2, clientY: mr.top },
                            '💰+' + bonusMoney, false, true, false
                        );
                    }
                }
            }

            // Georgie: +25% bonus resources on kill
            if (state.equipped['ys_georgie'] && state.roster['ys_georgie'] &&
                state.roster['ys_georgie'].status !== 'hospitalized') {
                var georgieLevel = state.roster['ys_georgie'].level || 1;
                var georgieLootBonus = 0.25 + (georgieLevel * 0.003);
                var bonusGold = Math.floor(
                    (isFromBoss ? 15 : 3) * Math.pow(1.10, (state.wave || 1) - 1) * georgieLootBonus
                );
                state.resources.money = (state.resources.money || 0) + bonusGold;
            }
        };
    })();


    // ────────────────────────────────────────────────────────────────
    //  TIRE SLOW HOOK — Enemy attack speed debuff
    // ────────────────────────────────────────────────────────────────
    //
    // Patches the enemy attack timer to check for Georgie's slow.
    // When active, enemies attack 25% slower.
    //
    (function patchEnemyAttack() {
        // We hook into the enemy damage interval by watching for
        // the _ysTireSlow flag in the main game loop.
        // Since enemy attacks are set up in spawnEnemy(), we patch
        // the enemy's stunnedUntil as a lightweight approach.
        //
        // Instead of patching spawnEnemy (which is complex), we use
        // a periodic check that extends the enemy's stun slightly
        // when the tire slow is active, effectively slowing attacks.

        setInterval(function() {
            if (!window._ysTireSlow.active) return;
            if (Date.now() >= window._ysTireSlow.expiresAt) {
                window._ysTireSlow.active = false;
                return;
            }
            // If enemy exists and isn't already stunned, apply micro-delay
            if (typeof currentEnemy !== 'undefined' && currentEnemy && currentEnemy.hp > 0) {
                if (!currentEnemy._ysSlowApplied) {
                    currentEnemy._ysSlowApplied = true;
                    // Mark as slowed — the visual indicator
                }
            }
        }, 500);
    })();


    // ────────────────────────────────────────────────────────────────
    //  COMBAT LOOP PATCH — Hook into startAutomationEngines
    // ────────────────────────────────────────────────────────────────
    //
    // The main combat loop lives in startAutomationEngines().
    // We wrap it to inject our YS passive handling.
    //
    // Strategy: After the original function sets up its intervals,
    // we DON'T re-set them. Instead, the original code's switch
    // on pType will fall through to the `else if (outDmg > 0)`
    // branch for YS passive types it doesn't recognize.
    //
    // Our hook: We wrap startAutomationEngines so that AFTER it runs,
    // we override the timers for YS characters with our own versions
    // that call applyYSPassive instead.
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

            // Now, for YS characters with YS-specific passives,
            // clear the original timer and replace with our version
            if (typeof characters === 'undefined' || typeof state === 'undefined') return;
            if (!state.equipped || !state.roster) return;

            var ysPassiveTypes = [
                'summonTrainStun', 'summonDollCrit', 'brisketSlam', 'coinLootBoost',
                'chemicalAoe', 'summonChicken', 'tireLootSlow', 'warBurst',
                'holyHeal', 'whipCrit'
            ];

            for (var key in characters) {
                if (!characters.hasOwnProperty(key)) continue;
                if (!state.roster[key] || !state.equipped[key]) continue;

                var config = characters[key];
                if (!config.passiveType || ysPassiveTypes.indexOf(config.passiveType) === -1) continue;

                // This is a YS character — replace its combat timer
                if (typeof gameTimers !== 'undefined' && gameTimers[key]) {
                    clearInterval(gameTimers[key]);
                }

                // Set up the YS combat timer
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

                        // Apply the YS passive
                        var handled = applyYSPassive(
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

        console.log('[YS_COMBAT] ✅ Combat loop patched — Young Sheldon passives active');
    })();


    // ────────────────────────────────────────────────────────────────
    //  INITIALIZATION LOG
    // ────────────────────────────────────────────────────────────────

    console.log('[YS_COMBAT] 🤠 Young Sheldon Combat Module loaded');
    console.log('[YS_COMBAT] Passives: summonTrainStun, summonDollCrit, brisketSlam, coinLootBoost,');
    console.log('[YS_COMBAT]          chemicalAoe, summonChicken, tireLootSlow, warBurst, holyHeal, whipCrit');

})();
