const fs = require('fs');
const filePath = 'c:/xampp/htdocs/tbbt-idle-game/public/pvp.js';
let txt = fs.readFileSync(filePath, 'utf8');

const regexPvpAttack = /\/\/ Set up attack timers for each unit[\s\S]*?(?=pvpMainTimer = setInterval)/;

const newPvpAttack = `// Set up attack timers for each unit
    
    function processPvpAttack(unit, teamSide, targetsArray, enemyTeamArray) {
        if (!pvpBattleState || pvpBattleState.finished || !unit.alive) return;
        var pType = characters[unit.key] ? characters[unit.key].passiveType : null;
        var pvpTimeElapsed = 120 - pvpBattleState.timeLeft;

        // Determine targets based on passive
        var targets = targetsArray;
        if ((pType === 'backlineSpeed' || pType === 'backlineCrit' || pType === 'jumpCrit') && targetsArray.length > 0) {
            var backliners = targetsArray.filter(t => characters[t.key] && characters[t.key].lane === 'back');
            if (backliners.length > 0) targets = backliners;
        }

        if (targets.length === 0) return;
        
        var isAoe = (pType === 'critSplash' || pType === 'critAoe');
        var targetsToHit = isAoe ? targets : [targets[Math.floor(Math.random() * targets.length)]];

        targetsToHit.forEach(target => {
            if (!target.alive) return;

            // Defender passive logic
            var defType = characters[target.key] ? characters[target.key].passiveType : null;
            if (defType === 'immuneHits') {
                if (!target.hitsTaken) target.hitsTaken = 0;
                target.hitsTaken++;
                if (target.hitsTaken >= 3) {
                    target.hitsTaken = 0;
                    pvpSpawnBuffPopup(target.key, teamSide === 'p' ? 'e' : 'p', '🛡️ IMMUNE');
                    return; // Skip damage
                }
            }

            var dmg = unit.baseDmg * unit.level;
            var isCrit = Math.random() < 0.12;

            if (pType === 'critSplash' || pType === 'critAoe' || pType === 'jumpCrit') isCrit = true;
            if (pType === 'backlineCrit' || pType === 'critTank') if (Math.random() < 0.5) isCrit = true;
            
            if (isCrit) dmg = Math.floor(dmg * 2);

            // Zack scaling tank logic
            if (pType === 'critTank' && isCrit) {
                var healAmt = Math.floor(dmg * (0.2 + (pvpTimeElapsed / 100))); 
                unit.hp = Math.min(unit.maxHp, unit.hp + healAmt);
                pvpSpawnHealPopup(unit.key, teamSide, healAmt);
                dmg = Math.floor(dmg * 0.5); // Less damage, more healing
            }

            // Deflect logic
            if (defType === 'deflectLoot') {
                var deflect = Math.floor(dmg * 0.2);
                unit.hp -= deflect;
                pvpSpawnDmgPopup(unit.key, teamSide, deflect, false);
            }

            target.hp -= dmg;

            pvpAttackEffect(unit.key, teamSide);
            pvpHitEffect(target.key, teamSide === 'p' ? 'e' : 'p');
            pvpSpawnDmgPopup(target.key, teamSide === 'p' ? 'e' : 'p', dmg, isCrit);
            pvpSpawnAttackVisual(unit.key, teamSide, target.key, teamSide === 'p' ? 'e' : 'p', isCrit);
            
            if (isCrit) { pvpCritBurst(target.key, teamSide === 'p' ? 'e' : 'p'); pvpScreenShake(); }

            // Lifesteal
            if (pType === 'lifesteal') {
                var ls = Math.floor(dmg * 0.4);
                unit.hp = Math.min(unit.maxHp, unit.hp + ls);
                pvpSpawnHealPopup(unit.key, teamSide, ls);
            }

            // DOTs
            if (pType === 'sunRay' || pType === 'poisonAoe') {
                pvpSpawnBuffPopup(target.key, teamSide === 'p' ? 'e' : 'p', '☠️ DOT');
                target.hp -= Math.floor(dmg * 0.3); // Instant DOT tick for PvP simplicity
            }

            // Slow / Stun
            if (pType === 'slowStun' && Math.random() < 0.2) {
                pvpSpawnBuffPopup(target.key, teamSide === 'p' ? 'e' : 'p', '⚡ STUN');
                // Could implement stun by delaying their timer, but for now just deal extra dmg or skip their next attack
            }

            if (target.hp <= 0) {
                target.hp = 0; target.alive = false; 
                pvpDeathEffect(target.key, teamSide === 'p' ? 'e' : 'p'); 
                pvpShowKillBanner(unit.key, target.key, teamSide); 
                pvpScreenShake();
            }
        });

        // Healing
        if (pType === 'healScaling' || pType === 'healLoot' || pType === 'selfHeal') {
            var myTeam = teamSide === 'p' ? pvpBattleState.playerTeam : pvpBattleState.enemyTeam;
            var injured = myTeam.filter(u => u.alive && u.hp < u.maxHp);
            if (injured.length > 0) {
                var healAmt = Math.floor(unit.baseDmg * unit.level * 0.5) || 50;
                if (pType === 'healScaling') healAmt = Math.floor(healAmt * (1 + (pvpTimeElapsed / 60))); // Scales wildly with time!
                var healTarget = injured[Math.floor(Math.random() * injured.length)];
                if (pType === 'selfHeal') healTarget = unit;
                if (healTarget.hp < healTarget.maxHp) {
                    healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + healAmt);
                    pvpSpawnHealPopup(healTarget.key, teamSide, healAmt);
                }
            }
        }
        
        updatePvpTeamDisplay();
        checkPvpBattleEnd();
    }

    pvpBattleState.playerTeam.forEach(function(unit, idx) {
        if (!unit.alive) return;
        var pType = characters[unit.key] ? characters[unit.key].passiveType : null;
        var rate = unit.atkSpeed;
        if (pType === 'backlineCrit') rate *= 1.5;
        
        var currentRate = rate / pvpBattleState.speedMult;

        function runPvpPlayerAttack() {
            if (!pvpBattleState || pvpBattleState.finished || !unit.alive) return;
            var pvpTimeElapsed = 120 - pvpBattleState.timeLeft;
            var currentRate = rate / pvpBattleState.speedMult;
            if (pType === 'backlineSpeed') currentRate = currentRate / (1 + (pvpTimeElapsed / 40)); // Accelerates!

            processPvpAttack(unit, 'p', getAliveTargets(pvpBattleState.enemyTeam), pvpBattleState.playerTeam);
            pvpTimers['p_' + idx] = setTimeout(runPvpPlayerAttack, currentRate);
        }
        pvpTimers['p_' + idx] = setTimeout(runPvpPlayerAttack, currentRate);
    });

    pvpBattleState.enemyTeam.forEach(function(unit, idx) {
        if (!unit.alive) return;
        var pType = characters[unit.key] ? characters[unit.key].passiveType : null;
        var rate = unit.atkSpeed;
        if (pType === 'backlineCrit') rate *= 1.5;
        
        var currentRate = rate / pvpBattleState.speedMult;

        function runPvpEnemyAttack() {
            if (!pvpBattleState || pvpBattleState.finished || !unit.alive) return;
            var pvpTimeElapsed = 120 - pvpBattleState.timeLeft;
            var currentRate = rate / pvpBattleState.speedMult;
            if (pType === 'backlineSpeed') currentRate = currentRate / (1 + (pvpTimeElapsed / 40));

            processPvpAttack(unit, 'e', getAliveTargets(pvpBattleState.playerTeam), pvpBattleState.enemyTeam);
            pvpTimers['e_' + idx] = setTimeout(runPvpEnemyAttack, currentRate);
        }
        pvpTimers['e_' + idx] = setTimeout(runPvpEnemyAttack, currentRate);
    });

    `;

if (txt.match(regexPvpAttack)) {
    txt = txt.replace(regexPvpAttack, newPvpAttack);
    fs.writeFileSync(filePath, txt, 'utf8');
    console.log("Updated pvp attack timers in pvp.js");
} else {
    console.log("Failed to match regex in pvp.js");
}
