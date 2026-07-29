const fs = require('fs');
const filePath = 'c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js';
let txt = fs.readFileSync(filePath, 'utf8');

const targetStr = `            var actualDmg = Math.floor(damagePerTarget * (1 - (steDefense.dmgReduction || 0)));
            charData.currentHp -= actualDmg;
            
            const charEl = document.getElementById('live-character-' + charKey);
            if (charEl) {
                const rect = charEl.getBoundingClientRect();
                generateDamagePopup({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, damagePerTarget, false, false, true);
            }
            // SKILL TREE: Deflect - reflect damage back
            if (steDefense.reflectPct > 0 && currentEnemy.hp > 0) {
                var reflectDmg = Math.floor(actualDmg * steDefense.reflectPct);
                if (reflectDmg > 0) currentEnemy.hp -= reflectDmg;
            }
            if (charData.currentHp <= 0) sendToHospital(charKey);`;

const replacement = `            var actualDmg = Math.floor(damagePerTarget * (1 - (steDefense.dmgReduction || 0)));
            
            // PASSIVE: Prof. Proton immune every 3 hits
            let isImmune = false;
            if (charKey === 'proton' && config.passiveType === 'immuneHits') {
                if (!charData.hitsTaken) charData.hitsTaken = 0;
                charData.hitsTaken++;
                if (charData.hitsTaken >= (config.basePassiveAmount || 3)) {
                    charData.hitsTaken = 0;
                    isImmune = true;
                    actualDmg = 0;
                }
            }
            
            charData.currentHp -= actualDmg;
            
            const charEl = document.getElementById('live-character-' + charKey);
            if (charEl) {
                const rect = charEl.getBoundingClientRect();
                if (isImmune) {
                    generateDamagePopup({ clientX: rect.left + rect.width / 2, clientY: rect.top }, "IMMUNE", false, true, false);
                } else {
                    generateDamagePopup({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, damagePerTarget, false, false, true);
                }
            }
            // SKILL TREE: Deflect - reflect damage back
            if (steDefense.reflectPct > 0 && currentEnemy.hp > 0) {
                var reflectDmg = Math.floor(actualDmg * steDefense.reflectPct);
                if (reflectDmg > 0) currentEnemy.hp -= reflectDmg;
            }
            // PASSIVE: Beverly Deflect
            if (charKey === 'beverly' && config.passiveType === 'deflectLoot' && !isImmune && currentEnemy.hp > 0) {
                var bevDeflect = Math.floor(actualDmg * (config.basePassiveAmount || 0.2));
                if (bevDeflect > 0) {
                    currentEnemy.hp -= bevDeflect;
                    generateDamagePopup({ clientX: 200, clientY: 200 }, bevDeflect, false, false, false);
                }
            }
            
            if (charData.currentHp <= 0) sendToHospital(charKey);`;

if (txt.includes(targetStr)) {
    txt = txt.replace(targetStr, replacement);
    fs.writeFileSync(filePath, txt, 'utf8');
    console.log("Updated executeEnemyAttack in app_v2.js");
} else {
    console.log("Could not find target string in app_v2.js for executeEnemyAttack");
}
