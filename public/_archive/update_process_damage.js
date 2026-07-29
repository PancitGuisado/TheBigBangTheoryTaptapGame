const fs = require('fs');
const filePath = 'c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js';
let txt = fs.readFileSync(filePath, 'utf8');

const regexProcessDamage = /function processDamage\(baseDmg, attackerKey\) \{[\s\S]*?currentEnemy\.hp \-= finalDmg;\n    state\.score \+= Math\.floor\(finalDmg\);/;

const newProcessDamage = `function processDamage(baseDmg, attackerKey, forceCrit = false, lifestealMulti = 0) {
    if (typeof currentEnemy === 'undefined' || currentEnemy === null || currentEnemy.hp <= 0) return;
    
    var isCrit = forceCrit;
    var finalDmg = baseDmg;

    var ste = typeof getSkillTreeEffects === 'function' ? getSkillTreeEffects() : {};
    
    if (attackerKey && typeof getCharEquipmentStats === 'function') {
        var eqStats = getCharEquipmentStats(attackerKey);
        finalDmg += (eqStats.dmg || 0);
    }
    
    let currentCritChance = typeof rageDuration !== 'undefined' && rageDuration > 0 ? 0.60 : 0.12;
    currentCritChance += (ste.critChance || 0);
    if (attackerKey && typeof getCharEquipmentStats === 'function') {
        currentCritChance += (getCharEquipmentStats(attackerKey).critPct || 0);
    }
    
    if (!forceCrit && Math.random() < currentCritChance && attackerKey !== 'penny') {
        isCrit = true;
    }

    if (isCrit) {
        finalDmg *= (ste.critMulti || 2.0);
    }

    // Beverly passive: Loot boost
    if (attackerKey === 'beverly') {
        // Increases chance for extra drop logic, handled outside
    }

    currentEnemy.hp -= finalDmg;
    state.score += Math.floor(finalDmg);

    // Lifesteal Passive
    let lsHeal = Math.floor(finalDmg * (ste.lifestealPct + lifestealMulti));
`;

if (txt.match(regexProcessDamage)) {
    txt = txt.replace(regexProcessDamage, newProcessDamage);
    fs.writeFileSync(filePath, txt, 'utf8');
    console.log("Updated processDamage in app_v2.js");
} else {
    console.log("Failed to match processDamage in app_v2.js");
}
