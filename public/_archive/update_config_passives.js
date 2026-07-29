const fs = require('fs');
const filePath = 'c:/xampp/htdocs/tbbt-idle-game/public/config.js';
let txt = fs.readFileSync(filePath, 'utf8');

const regex = /const characters = \{[\s\S]*?\};\n/;

const newCharacters = `const characters = {
    sheldon: { name: "Sheldon", desc: "Shoots a green energy ball that deals an AOE critical splash.", baseDmg: 5, baseHp: 80, atkSpeed: 1000, cost: { money: 10 }, lane: "mid", passiveType: 'critSplash', classType: "dps" },
    penny: { name: "Penny", desc: "Throws a tasty burger, making the team Rage for 5+ seconds.", baseDmg: 0, baseHp: 100, atkSpeed: 3000, cost: { money: 80 }, lane: "back", passiveType: 'rage', basePassiveAmount: 5, classType: "support" },
    leonard: { name: "Leonard", desc: "Frontliner who heals himself on every attack.", baseDmg: 14, baseHp: 250, atkSpeed: 1200, cost: { money: 180 }, lane: "front", passiveType: 'selfHeal', basePassiveAmount: 0.1, classType: "tank" },
    howard: { name: "Howard", desc: "Shoots rocket missiles and passively cools down robots.", baseDmg: 20, baseHp: 120, atkSpeed: 7500, cost: { money: 400 }, lane: "mid", passiveType: 'coolDown', basePassiveAmount: 5, classType: "aoe" },
    raj: { name: "Raj", desc: "Attacks with scorching Sun rays, dealing continuous heat damage.", baseDmg: 10, baseHp: 90, atkSpeed: 2400, cost: { money: 750 }, lane: "back", passiveType: 'sunRay', basePassiveAmount: 3, classType: "magic" },
    amy: { name: "Amy", desc: "Throws toxic chemicals leaving an AOE poison puddle.", baseDmg: 15, baseHp: 110, atkSpeed: 4000, cost: { money: 1100 }, lane: "back", passiveType: 'poisonAoe', basePassiveAmount: 4, classType: "magic" },
    bernie: { name: "Bernie", desc: "Fires a healing pulse. In PvP, her healing multiplies over time.", baseDmg: 0, baseHp: 90, atkSpeed: 8000, cost: { money: 1600 }, lane: "back", passiveType: 'healScaling', basePassiveAmount: 10, classType: "support" },
    stuart: { name: "Stuart", desc: "Melee combat specialist who lifesteals heavily.", baseDmg: 45, baseHp: 300, atkSpeed: 2200, cost: { money: 2200 }, lane: "front", passiveType: 'lifesteal', basePassiveAmount: 0.4, classType: "tank" },
    mary: { name: "Mary Cooper", desc: "Heals allies and slightly increases loot drops.", baseDmg: 0, baseHp: 85, atkSpeed: 6000, cost: { money: 2800 }, lane: "back", passiveType: 'healLoot', basePassiveAmount: 5, classType: "support" },
    beverly: { name: "Beverly", desc: "Increases loot drops and deflects damage back to enemies.", baseDmg: 8, baseHp: 95, atkSpeed: 5000, cost: { money: 3500 }, lane: "back", passiveType: 'deflectLoot', basePassiveAmount: 0.2, classType: "support" },
    proton: { name: "Prof. Proton", desc: "Becomes immune to every 3rd enemy hit.", baseDmg: 18, baseHp: 350, atkSpeed: 2000, cost: { money: 4200 }, lane: "front", passiveType: 'immuneHits', basePassiveAmount: 3, classType: "tank" },
    kripke: { name: "Barry Kripke", desc: "Shoots backliners. In PvP, his attack speed accelerates over time.", baseDmg: 35, baseHp: 80, atkSpeed: 1800, cost: { money: 5000 }, lane: "back", passiveType: 'backlineSpeed', classType: "dps" },
    leslie: { name: "Leslie Winkle", desc: "Shoots backliners with high crit damage but slow attack speed.", baseDmg: 55, baseHp: 70, atkSpeed: 3500, cost: { money: 6000 }, lane: "back", passiveType: 'backlineCrit', classType: "assassin" },
    bert: { name: "Bert Kibbler", desc: "Critical geology attack dealing AOE damage to all enemies.", baseDmg: 12, baseHp: 450, atkSpeed: 2500, cost: { money: 7000 }, lane: "front", passiveType: 'critAoe', classType: "tank" },
    wil: { name: "Wil Wheaton", desc: "Fires a laser gun that slows enemies or stuns 1 character.", baseDmg: 28, baseHp: 130, atkSpeed: 2200, cost: { money: 8000 }, lane: "mid", passiveType: 'slowStun', classType: "magic" },
    zack: { name: "Zack Johnson", desc: "Tank with a crit punch. In PvP, his crit punch transforms into health over time.", baseDmg: 40, baseHp: 380, atkSpeed: 3000, cost: { money: 9000 }, lane: "front", passiveType: 'critTank', classType: "tank" },
    emily: { name: "Emily Sweeney", desc: "Jumps to the enemy backline dealing guaranteed critical damage.", baseDmg: 42, baseHp: 90, atkSpeed: 2800, cost: { money: 10000 }, lane: "back", passiveType: 'jumpCrit', classType: "assassin" }
};\n`;

if (txt.match(regex)) {
    txt = txt.replace(regex, newCharacters);
    fs.writeFileSync(filePath, txt, 'utf8');
    console.log("Updated characters object in config.js");
} else {
    console.log("Regex match failed in config.js");
}
