/**
 * ═══════════════════════════════════════════════════════════════════
 *  MV_COMBAT.JS — Multiverse Saga Combat Passive System
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Implements all 10 Multiverse character combat passives:
 *
 *   1. mv_true_sheldon   — unifiedField     : Every 4th attack → 250% AoE unified field blast
 *   2. mv_siebert        — bureaucracy      : Every 5th attack → slow enemy atk speed 30% for 4s
 *   3. mv_ramona         — obsessiveMark    : Consecutive hits on same enemy → +15% dmg stacking (resets on target change)
 *   4. mv_captain_sweatpants — comicSummon  : Every 5th attack → 3 comic explosions at 80% AoE
 *   5. mv_priya          — objectionStun    : Every 4th attack → stun enemy for 2s
 *   6. mv_dave           — brawlTank        : Takes 20% reduced dmg, every 3rd hit → 200% dmg
 *   7. mv_dark_kripke    — plasmaRay        : Continuous beam ramps +20% dmg per tick on same target
 *   8. mv_mrs_wolowitz   — voiceHeal        : Every 5th attack → heal ALL allies 25% maxHP
 *   9. mv_althea         — emergencyHeal    : Each attack checks allies below 30% HP → heals 35% maxHP
 *  10. mv_janine         — shieldWall       : Every 6th attack → team shield absorbing 15% Janine's maxHP for 5s
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
    window._mvAttackCounters = {};

    /**
     * Get or initialize an attack counter for a character.
     * @param {string} charKey - Character roster key
     * @returns {number} Current counter value (pre-increment)
     */
    function getCounter(charKey) {
        if (typeof window._mvAttackCounters[charKey] === 'undefined') {
            window._mvAttackCounters[charKey] = 0;
        }
        return window._mvAttackCounters[charKey];
    }

    /** Increment and return the new counter value. */
    function bumpCounter(charKey) {
        window._mvAttackCounters[charKey] = (window._mvAttackCounters[charKey] || 0) + 1;
        return window._mvAttackCounters[charKey];
    }

    /** Reset a character's counter back to zero. */
    function resetCounter(charKey) {
        window._mvAttackCounters[charKey] = 0;
    }


    // ────────────────────────────────────────────────────────────────
    //  TEAM BUFF / DEBUFF TRACKING
    // ────────────────────────────────────────────────────────────────

    /**
     * Siebert's Bureaucracy Slow — enemy attack speed reduced 30%.
     */
    window._mvBureaucracySlow = {
        active: false,
        expiresAt: 0,
        slowPct: 0.30
    };

    /**
     * Ramona's Obsessive Mark — tracks consecutive-hit data per character.
     * { lastTargetId, stackCount }
     */
    window._mvObsessiveMark = {};

    /**
     * Dark Kripke's Plasma Ray — ramp tracker per character.
     * { lastTargetId, rampStacks }
     */
    window._mvPlasmaRamp = {};

    /**
     * Janine's Shield Wall — team-wide damage absorb.
     * { active, expiresAt, absorbRemaining }
     */
    window._mvShieldWall = {
        active: false,
        expiresAt: 0,
        absorbRemaining: 0
    };

    /**
     * Dave's Brawl Tank — damage reduction flag.
     * While Dave is equipped, team receives visual indicator.
     */
    window._mvDaveTank = {
        active: false,
        reductionPct: 0.20
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

    /** Find all allies below a given HP percentage threshold. */
    function findAlliesBelow(threshold) {
        if (typeof state === 'undefined' || !state.equipped || !state.roster) return [];
        var result = [];

        Object.keys(state.equipped).forEach(function(key) {
            if (!state.equipped[key] || !state.roster[key]) return;
            if (state.roster[key].status === 'hospitalized') return;
            if (state.roster[key].currentHp <= 0) return;

            var maxHp = state.roster[key].maxHp || 100;
            var pct = state.roster[key].currentHp / maxHp;
            if (pct < threshold) {
                result.push(key);
            }
        });

        return result;
    }

    /** Heal a character by a flat amount, capped at maxHp. */
    function healCharacter(charKey, amount) {
        if (!state.roster[charKey]) return 0;
        var maxHp = state.roster[charKey].maxHp || 100;
        var before = state.roster[charKey].currentHp;
        state.roster[charKey].currentHp = Math.min(maxHp, before + amount);
        state.roster[charKey].hp = state.roster[charKey].currentHp;
        return state.roster[charKey].currentHp - before;
    }

    /** Get a unique-ish ID for the current enemy (for target-tracking passives). */
    function getTargetId() {
        if (typeof currentEnemy === 'undefined' || !currentEnemy) return null;
        // Use a composite of enemy name + wave as a simple identity
        return (currentEnemy.name || 'enemy') + '_' + (currentEnemy._spawnId || 0);
    }


    // ────────────────────────────────────────────────────────────────
    //  CORE PASSIVE HANDLER
    // ────────────────────────────────────────────────────────────────

    /**
     * Apply a Multiverse character's passive ability.
     *
     * @param {string}  charKey     - Character roster key
     * @param {string}  passiveType - Passive type string from config
     * @param {number}  damage      - Base output damage (already level-scaled)
     * @param {object}  target      - The current enemy object
     * @param {object}  team        - The state.roster object
     * @returns {boolean} true if the passive was handled, false to fall through
     */
    window.applyMVPassive = function applyMVPassive(charKey, passiveType, damage, target, team) {
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
            //  1. TRUE SHELDON — unifiedField
            //     Every 4th attack: 250% AoE unified field blast
            // ═══════════════════════════════════════════════════════
            case 'unifiedField': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 4 === 0) {
                    resetCounter(charKey);

                    // Unified field blast: 250% damage
                    var fieldDmg = Math.floor(damage * 2.5);
                    processDamage(fieldDmg, charKey, false, tierLifesteal);

                    // Visual FX — unified field energy burst
                    spawnArenaFX(
                        '⚛️🌀💫',
                        'position:absolute;top:30%;left:50%;transform:translateX(-50%);font-size:2.5rem;' +
                        'animation:droidExplode 0.8s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 20px #7c3aed;',
                        900
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '⚛️ UNIFIED FIELD!', false, true, false);
                    }

                    combatLog('⚛️', charKey + ' → Unified Field Blast! ' + fieldDmg + ' AoE');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  2. SIEBERT — bureaucracy
            //     Every 5th attack: slow enemy atk speed 30% for 4s
            // ═══════════════════════════════════════════════════════
            case 'bureaucracy': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 5 === 0) {
                    resetCounter(charKey);

                    // Apply bureaucracy slow debuff
                    window._mvBureaucracySlow.active = true;
                    window._mvBureaucracySlow.expiresAt = Date.now() + 4000;

                    if (target) {
                        target.stunnedUntil = Math.max(
                            target.stunnedUntil || 0,
                            Date.now() + 800
                        );
                        target._mvSlowedUntil = Date.now() + 4000;
                    }

                    // Schedule debuff expiry
                    setTimeout(function() {
                        if (Date.now() >= window._mvBureaucracySlow.expiresAt) {
                            window._mvBureaucracySlow.active = false;
                        }
                    }, 4100);

                    // Visual FX — paperwork avalanche
                    spawnArenaFX(
                        '📋📄✋',
                        'position:absolute;top:38%;left:50%;transform:translateX(-50%);font-size:2rem;' +
                        'animation:droidExplode 0.7s ease-out forwards;pointer-events:none;z-index:999;',
                        800
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '📋 BUREAUCRACY!', false, true, false);
                    }

                    combatLog('📋', 'Siebert → Bureaucracy! Enemy -30% atk speed for 4s');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  3. RAMONA — obsessiveMark
            //     Consecutive hits on same enemy = +15% more each
            //     Resets on target change
            // ═══════════════════════════════════════════════════════
            case 'obsessiveMark': {
                var targetId = getTargetId();
                if (!window._mvObsessiveMark[charKey]) {
                    window._mvObsessiveMark[charKey] = { lastTargetId: null, stackCount: 0 };
                }

                var markData = window._mvObsessiveMark[charKey];

                // Reset stacks on target change
                if (markData.lastTargetId !== targetId) {
                    markData.lastTargetId = targetId;
                    markData.stackCount = 0;
                }

                markData.stackCount++;
                var markMultiplier = 1 + (markData.stackCount * 0.15);
                var markedDmg = Math.floor(damage * markMultiplier);

                processDamage(markedDmg, charKey, false, tierLifesteal);

                // Show stack indicator every 3rd hit
                if (markData.stackCount % 3 === 0) {
                    spawnArenaFX(
                        '🔬×' + markData.stackCount,
                        'position:absolute;top:44%;left:46%;font-size:1.6rem;' +
                        'animation:droidExplode 0.5s ease-out forwards;pointer-events:none;z-index:999;' +
                        'color:#ef4444;font-weight:bold;',
                        600
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '🔬 MARK ×' + markData.stackCount, false, true, false);
                    }

                    combatLog('🔬', 'Ramona → Obsessive Mark ×' + markData.stackCount + '! +' +
                        Math.floor(markData.stackCount * 15) + '% dmg');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  4. CAPTAIN SWEATPANTS — comicSummon
            //     Every 5th attack: 3 comic explosions at 80% AoE
            // ═══════════════════════════════════════════════════════
            case 'comicSummon': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 5 === 0) {
                    resetCounter(charKey);

                    var comicDmg = Math.floor(damage * 0.8);

                    // 3 comic explosions — each hits individually
                    for (var ci = 0; ci < 3; ci++) {
                        processDamage(comicDmg, charKey, false, tierLifesteal);
                    }

                    // Visual FX — comic book explosions
                    spawnArenaFX(
                        '💥📚💥📚💥',
                        'position:absolute;top:35%;left:48%;font-size:2rem;' +
                        'animation:droidExplode 0.7s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 12px #f59e0b;',
                        800
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '📚 COMIC BLAST ×3!', false, true, false);
                    }

                    combatLog('📚', 'Captain Sweatpants → Comic Summon! 3× ' + comicDmg + ' = ' + (comicDmg * 3));
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  5. PRIYA — objectionStun
            //     Every 4th attack: stun enemy for 2s
            // ═══════════════════════════════════════════════════════
            case 'objectionStun': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 4 === 0) {
                    resetCounter(charKey);

                    // Stun the enemy for 2 seconds
                    if (target && target.hp > 0) {
                        target.stunnedUntil = Date.now() + 2000;
                    }

                    // Bonus objection damage: 150% hit
                    var objectionDmg = Math.floor(damage * 1.5);
                    processDamage(objectionDmg, charKey, false, tierLifesteal);

                    // Visual FX — legal objection
                    spawnArenaFX(
                        '⚖️❗OBJECTION!',
                        'position:absolute;top:32%;left:50%;transform:translateX(-50%);font-size:1.8rem;' +
                        'animation:droidExplode 0.8s ease-out forwards;pointer-events:none;z-index:999;' +
                        'color:#dc2626;font-weight:bold;',
                        900
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '⚖️ STUNNED 2s!', false, true, false);
                    }

                    combatLog('⚖️', 'Priya → Objection! Enemy stunned 2s + ' + objectionDmg + ' dmg');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  6. DAVE — brawlTank
            //     Takes 20% reduced dmg, every 3rd hit = 200% dmg
            // ═══════════════════════════════════════════════════════
            case 'brawlTank': {
                // Ensure Dave's tank flag is active
                window._mvDaveTank.active = true;

                if (count % 3 === 0) {
                    resetCounter(charKey);

                    // Heavy brawl strike: 200% damage
                    var brawlDmg = Math.floor(damage * 2.0);
                    processDamage(brawlDmg, charKey, false, tierLifesteal);

                    // Visual FX — heavy punch
                    spawnArenaFX(
                        '🥊💥💪',
                        'position:absolute;top:36%;left:50%;transform:translateX(-50%);font-size:2.2rem;' +
                        'animation:droidExplode 0.6s ease-out forwards;pointer-events:none;z-index:999;',
                        700
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getEnemyCenter(), '🥊 BRAWL ×2!', false, true, false);
                    }

                    combatLog('🥊', 'Dave → Brawl Tank! ' + brawlDmg + ' heavy strike');
                } else {
                    // Normal attack
                    processDamage(damage, charKey, false, tierLifesteal);
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  7. DARK KRIPKE — plasmaRay
            //     Continuous beam ramps +20% dmg per tick on same target
            // ═══════════════════════════════════════════════════════
            case 'plasmaRay': {
                var plasmaTargetId = getTargetId();
                if (!window._mvPlasmaRamp[charKey]) {
                    window._mvPlasmaRamp[charKey] = { lastTargetId: null, rampStacks: 0 };
                }

                var rampData = window._mvPlasmaRamp[charKey];

                // Reset ramp on target change
                if (rampData.lastTargetId !== plasmaTargetId) {
                    rampData.lastTargetId = plasmaTargetId;
                    rampData.rampStacks = 0;
                }

                rampData.rampStacks++;
                var rampMultiplier = 1 + (rampData.rampStacks * 0.20);
                var plasmaDmg = Math.floor(damage * rampMultiplier);

                processDamage(plasmaDmg, charKey, false, tierLifesteal);

                // Show ramp visual every 4th tick
                if (rampData.rampStacks % 4 === 0) {
                    spawnArenaFX(
                        '🔫⚡×' + rampData.rampStacks,
                        'position:absolute;top:40%;left:52%;font-size:1.6rem;' +
                        'animation:droidExplode 0.5s ease-out forwards;pointer-events:none;z-index:999;' +
                        'color:#a855f7;text-shadow:0 0 15px #7c3aed;font-weight:bold;',
                        600
                    );

                    combatLog('⚡', 'Dark Kripke → Plasma Ray ×' + rampData.rampStacks + '! +' +
                        Math.floor(rampData.rampStacks * 20) + '% dmg');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  8. MRS. WOLOWITZ — voiceHeal
            //     Every 5th attack: heal ALL allies 25% maxHP
            // ═══════════════════════════════════════════════════════
            case 'voiceHeal': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 5 === 0) {
                    resetCounter(charKey);

                    // Heal ALL equipped allies for 25% of their maxHP
                    var healed = 0;
                    Object.keys(state.equipped).forEach(function(allyKey) {
                        if (!state.equipped[allyKey] || !state.roster[allyKey]) return;
                        if (state.roster[allyKey].status === 'hospitalized') return;
                        if (state.roster[allyKey].currentHp <= 0) return;

                        var allyMaxHp = state.roster[allyKey].maxHp || 100;
                        var healAmt = Math.floor(allyMaxHp * 0.25);
                        var actual = healCharacter(allyKey, healAmt);
                        if (actual > 0) healed++;
                    });

                    // Update battle line HP bars
                    if (typeof _updateBattleLineHP === 'function') _updateBattleLineHP();

                    // Visual FX — voice wave heal
                    spawnArenaFX(
                        '📢💚💚💚',
                        'position:absolute;top:55%;left:20%;font-size:2rem;' +
                        'animation:droidExplode 0.8s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 15px #22c55e;',
                        900
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getCharCenter(charKey), '📢 TEAM HEAL!', false, true, false);
                    }

                    combatLog('📢', 'Mrs. Wolowitz → Voice Heal! Healed ' + healed + ' allies 25% maxHP');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  9. ALTHEA — emergencyHeal
            //     Each attack checks allies below 30% HP, heals 35% maxHP
            // ═══════════════════════════════════════════════════════
            case 'emergencyHeal': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                // Check for critically wounded allies
                var criticalAllies = findAlliesBelow(0.30);

                if (criticalAllies.length > 0) {
                    criticalAllies.forEach(function(allyKey) {
                        var allyMaxHp = state.roster[allyKey].maxHp || 100;
                        var healAmt = Math.floor(allyMaxHp * 0.35);
                        var actual = healCharacter(allyKey, healAmt);

                        if (actual > 0 && typeof generateDamagePopup === 'function') {
                            generateDamagePopup(getCharCenter(allyKey), '🏥+' + actual, false, true, false);
                        }
                    });

                    // Update battle line HP bars
                    if (typeof _updateBattleLineHP === 'function') _updateBattleLineHP();

                    // Visual FX — emergency medical
                    spawnArenaFX(
                        '🏥💉🩹',
                        'position:absolute;top:58%;left:22%;font-size:1.8rem;' +
                        'animation:droidExplode 0.6s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 12px #10b981;',
                        700
                    );

                    combatLog('🏥', 'Althea → Emergency Heal! Saved ' + criticalAllies.length +
                        ' critical allies (+35% maxHP)');
                }
                return true;
            }

            // ═══════════════════════════════════════════════════════
            //  10. JANINE — shieldWall
            //      Every 6th attack: team shield absorbing 15% of
            //      Janine's maxHP for 5s
            // ═══════════════════════════════════════════════════════
            case 'shieldWall': {
                // Normal attack
                processDamage(damage, charKey, false, tierLifesteal);

                if (count % 6 === 0) {
                    resetCounter(charKey);

                    // Calculate shield amount: 15% of Janine's maxHP
                    var janineMaxHp = state.roster[charKey].maxHp || 100;
                    var shieldAmount = Math.floor(janineMaxHp * 0.15);

                    window._mvShieldWall.active = true;
                    window._mvShieldWall.expiresAt = Date.now() + 5000;
                    window._mvShieldWall.absorbRemaining = shieldAmount;

                    // Schedule shield expiry
                    setTimeout(function() {
                        if (Date.now() >= window._mvShieldWall.expiresAt) {
                            window._mvShieldWall.active = false;
                            window._mvShieldWall.absorbRemaining = 0;
                        }
                    }, 5100);

                    // Visual FX — shield wall
                    spawnArenaFX(
                        '🛡️✨🛡️',
                        'position:absolute;top:50%;left:15%;font-size:2.2rem;' +
                        'animation:droidExplode 0.9s ease-out forwards;pointer-events:none;z-index:999;' +
                        'text-shadow:0 0 20px #3b82f6;',
                        1000
                    );

                    if (typeof generateDamagePopup === 'function') {
                        generateDamagePopup(getCharCenter(charKey), '🛡️ SHIELD ' + shieldAmount + '!', false, true, false);
                    }

                    combatLog('🛡️', 'Janine → Shield Wall! Team absorbs ' + shieldAmount + ' dmg for 5s');
                }
                return true;
            }

            default:
                return false;
        }
    };


    // ────────────────────────────────────────────────────────────────
    //  DAVE TANK HOOK — Reduce incoming damage by 20%
    // ────────────────────────────────────────────────────────────────
    //
    // When Dave is equipped and alive, team takes 20% less damage
    // from enemy attacks. Also checks Janine's shield wall absorb.
    //
    (function patchDaveTankAndShield() {
        // Check periodically for enemy damage and apply reduction
        setInterval(function() {
            if (typeof state === 'undefined' || !state.equipped || !state.roster) return;

            // Dave Tank: mark active when Dave is equipped and alive
            if (state.equipped['mv_dave'] && state.roster['mv_dave'] &&
                state.roster['mv_dave'].status !== 'hospitalized' &&
                state.roster['mv_dave'].currentHp > 0) {
                window._mvDaveTank.active = true;
            } else {
                window._mvDaveTank.active = false;
            }

            // Shield Wall expiry check
            if (window._mvShieldWall.active && Date.now() >= window._mvShieldWall.expiresAt) {
                window._mvShieldWall.active = false;
                window._mvShieldWall.absorbRemaining = 0;
            }
        }, 500);
    })();


    // ────────────────────────────────────────────────────────────────
    //  BUREAUCRACY SLOW HOOK — Enemy attack speed debuff
    // ────────────────────────────────────────────────────────────────
    //
    // When Siebert's slow is active, extend enemy stun slightly
    // to simulate reduced attack speed.
    //
    (function patchBureaucracySlow() {
        setInterval(function() {
            if (!window._mvBureaucracySlow.active) return;
            if (Date.now() >= window._mvBureaucracySlow.expiresAt) {
                window._mvBureaucracySlow.active = false;
                return;
            }
            // If enemy exists and isn't already stunned, apply micro-delay
            if (typeof currentEnemy !== 'undefined' && currentEnemy && currentEnemy.hp > 0) {
                if (!currentEnemy._mvSlowApplied) {
                    currentEnemy._mvSlowApplied = true;
                }
            }
        }, 500);
    })();


    // ────────────────────────────────────────────────────────────────
    //  COMBAT LOOP PATCH — Hook into startAutomationEngines
    // ────────────────────────────────────────────────────────────────
    //
    // Wrap startAutomationEngines to inject MV passive handling.
    // After the original function runs, override timers for MV
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

            // Now, for MV characters with MV-specific passives,
            // clear the original timer and replace with our version
            if (typeof characters === 'undefined' || typeof state === 'undefined') return;
            if (!state.equipped || !state.roster) return;

            var mvPassiveTypes = [
                'unifiedField', 'bureaucracy', 'obsessiveMark', 'comicSummon',
                'objectionStun', 'brawlTank', 'plasmaRay', 'voiceHeal',
                'emergencyHeal', 'shieldWall'
            ];

            for (var key in characters) {
                if (!characters.hasOwnProperty(key)) continue;
                if (!state.roster[key] || !state.equipped[key]) continue;

                var config = characters[key];
                if (!config.passiveType || mvPassiveTypes.indexOf(config.passiveType) === -1) continue;

                // This is a MV character — replace its combat timer
                if (typeof gameTimers !== 'undefined' && gameTimers[key]) {
                    clearInterval(gameTimers[key]);
                }

                // Set up the MV combat timer
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

                        // Apply the MV passive
                        var handled = applyMVPassive(
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

        console.log('[MV_COMBAT] ✅ Combat loop patched — Multiverse passives active');
    })();


    // ────────────────────────────────────────────────────────────────
    //  INITIALIZATION LOG
    // ────────────────────────────────────────────────────────────────

    console.log('[MV_COMBAT] 🌀 Multiverse Saga Combat Module loaded');
    console.log('[MV_COMBAT] Passives: unifiedField, bureaucracy, obsessiveMark, comicSummon,');
    console.log('[MV_COMBAT]          objectionStun, brawlTank, plasmaRay, voiceHeal, emergencyHeal, shieldWall');

})();
