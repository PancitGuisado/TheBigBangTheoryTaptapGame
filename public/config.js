// Base Game Object Configurations
const characters = {
    sheldon: { name: "Sheldon", desc: "Shoots a green energy ball that deals an AOE critical splash.", baseDmg: 5, baseHp: 80, atkSpeed: 1000, cost: { money: 10 }, lane: "mid", passiveType: 'critSplash', classType: "dps" },
    penny: { name: "Penny", desc: "Throws a tasty burger, making the team Rage for 5+ seconds.", baseDmg: 5, baseHp: 100, atkSpeed: 3000, cost: { money: 80 }, lane: "back", passiveType: 'rage', basePassiveAmount: 5, classType: "support" },
    leonard: { name: "Leonard", desc: "Frontliner who heals himself on every attack.", baseDmg: 8, baseHp: 250, atkSpeed: 1200, cost: { money: 180 }, lane: "front", passiveType: 'selfHeal', basePassiveAmount: 0.05, classType: "tank", lifestealTiers: [{level:10,pct:0.05},{level:25,pct:0.10},{level:50,pct:0.15}] },
    howard: { name: "Howard", desc: "Shoots rocket missiles and passively cools down robots.", baseDmg: 25, baseHp: 120, atkSpeed: 4000, cost: { money: 400 }, lane: "mid", passiveType: 'coolDown', basePassiveAmount: 5, classType: "aoe" },
    raj: { name: "Raj", desc: "Fires a continuous energy beam like a Tesla Tower. Damage ramps up the longer he targets the same enemy, making him the ultimate tank killer. Resets on stun or new target.", baseDmg: 10, baseHp: 90, atkSpeed: 2400, cost: { money: 750 }, lane: "back", passiveType: 'sunRay', basePassiveAmount: 3, classType: "magic" },
    amy: { name: "Amy", desc: "Throws toxic chemicals leaving an AOE poison puddle.", baseDmg: 15, baseHp: 110, atkSpeed: 4000, cost: { money: 1100 }, lane: "back", passiveType: 'poisonAoe', basePassiveAmount: 4, classType: "magic" },
    bernie: { name: "Bernie", desc: "Fires a powerful healing pulse. In PvP, her healing multiplies over time.", baseDmg: 0, baseHp: 130, atkSpeed: 5000, cost: { money: 1600 }, lane: "back", passiveType: 'healScaling', basePassiveAmount: 25, healPctMaxHp: 0.12, classType: "support" },
    stuart: { name: "Stuart", desc: "Melee combat specialist who lifesteals heavily.", baseDmg: 20, baseHp: 300, atkSpeed: 2200, cost: { money: 2200 }, lane: "front", passiveType: 'lifesteal', basePassiveAmount: 0.15, classType: "tank", lifestealTiers: [{level:10,pct:0.05},{level:25,pct:0.10},{level:50,pct:0.15}] },
    mary: { name: "Mary Cooper", desc: "Heals allies with divine grace and increases loot drops.", baseDmg: 0, baseHp: 120, atkSpeed: 4000, cost: { money: 2800 }, lane: "back", passiveType: 'healLoot', healPctMaxHp: 0.15, basePassiveAmount: 20, classType: "support" },
    beverly: { name: "Beverly", desc: "Increases loot drops and deflects damage back to enemies.", baseDmg: 8, baseHp: 95, atkSpeed: 5000, cost: { money: 3500 }, lane: "back", passiveType: 'deflectLoot', basePassiveAmount: 0.35, classType: "support" },
    proton: { name: "Prof. Proton", desc: "Becomes immune to every 3rd enemy hit.", baseDmg: 10, baseHp: 350, atkSpeed: 2000, cost: { money: 4200 }, lane: "front", passiveType: 'immuneHits', basePassiveAmount: 3, classType: "tank", lifestealTiers: [{level:10,pct:0.05},{level:25,pct:0.10},{level:50,pct:0.15}] },
    kripke: { name: "Barry Kripke", desc: "Shoots backliners. In PvP, his attack speed accelerates over time.", baseDmg: 35, baseHp: 80, atkSpeed: 1800, cost: { money: 5000 }, lane: "back", passiveType: 'backlineSpeed', classType: "dps" },
    leslie: { name: "Leslie Winkle", desc: "Shoots backliners with high crit damage but slow attack speed.", baseDmg: 55, baseHp: 70, atkSpeed: 3500, cost: { money: 6000 }, lane: "back", passiveType: 'backlineCrit', classType: "assassin" },
    bert: { name: "Bert Kibbler", desc: "Critical geology attack dealing AOE damage to all enemies.", baseDmg: 7, baseHp: 450, atkSpeed: 2500, cost: { money: 7000 }, lane: "front", passiveType: 'critAoe', classType: "tank", lifestealTiers: [{level:10,pct:0.05},{level:25,pct:0.08},{level:50,pct:0.12}] },
    wil: { name: "Wil Wheaton", desc: "Fires a laser gun that slows enemies or stuns 1 character.", baseDmg: 28, baseHp: 130, atkSpeed: 2200, cost: { money: 8000 }, lane: "mid", passiveType: 'slowStun', classType: "magic" },
    zack: { name: "Zack Johnson", desc: "Tank with a crit punch. In PvP, his crit punch transforms into health over time.", baseDmg: 18, baseHp: 380, atkSpeed: 3000, cost: { money: 9000 }, lane: "front", passiveType: 'critTank', classType: "tank", lifestealTiers: [{level:10,pct:0.05},{level:25,pct:0.10},{level:50,pct:0.15}] },
    emily: { name: "Emily Sweeney", desc: "Jumps to the enemy backline dealing guaranteed critical damage.", baseDmg: 42, baseHp: 90, atkSpeed: 2800, cost: { money: 10000 }, lane: "back", passiveType: 'jumpCrit', classType: "assassin" },
    denise: { name: "Denise", desc: "Summons exploding stun-droids that roll toward enemies and stun on impact.", baseDmg: 8, baseHp: 100, atkSpeed: 3000, cost: { money: 12000 }, lane: "back", passiveType: 'summonDroid', basePassiveAmount: 2, classType: "support" },

    // ═══════ YOUNG SHELDON ERA CHARACTERS (Auto-unlock at Wave 80 story) ═══════
    ys_young_sheldon: { name: "Young Sheldon", desc: "Summons a toy train that bumps into enemies, dealing AoE stun. Passive: nearby enemies are stunned periodically.", baseDmg: 12, baseHp: 60, atkSpeed: 3500, cost: { money: 0 }, lane: "back", passiveType: 'summonTrainStun', basePassiveAmount: 3, classType: "support", era: 'young_sheldon', autoUnlock: true },
    ys_missy: { name: "Missy Cooper", desc: "Summons a fighting doll that attacks enemies. Passive: Lobster Buff — team crit rate increased for a short time.", baseDmg: 10, baseHp: 65, atkSpeed: 3000, cost: { money: 15000 }, lane: "back", passiveType: 'summonDollCrit', basePassiveAmount: 0.25, classType: "support", era: 'young_sheldon' },
    ys_george: { name: "George Cooper Sr.", desc: "Frontliner who fights with a giant brisket. High HP, moderate damage. Passive: Brisket Slam heals him on hit.", baseDmg: 22, baseHp: 500, atkSpeed: 2000, cost: { money: 18000 }, lane: "front", passiveType: 'brisketSlam', basePassiveAmount: 0.15, classType: "tank", era: 'young_sheldon', lifestealTiers: [{level:10,pct:0.08},{level:25,pct:0.12},{level:50,pct:0.18}] },
    ys_meemaw: { name: "Meemaw", desc: "Support who massively increases money and loot drops. Attacks by throwing coins at enemies.", baseDmg: 8, baseHp: 110, atkSpeed: 3500, cost: { money: 20000 }, lane: "back", passiveType: 'coinLootBoost', basePassiveAmount: 0.50, classType: "support", era: 'young_sheldon' },
    ys_sturgis: { name: "Dr. Sturgis", desc: "Throws explosive chemicals that deal massive AoE damage. Passive: chemical puddles deal damage over time.", baseDmg: 30, baseHp: 75, atkSpeed: 4500, cost: { money: 22000 }, lane: "back", passiveType: 'chemicalAoe', basePassiveAmount: 5, classType: "aoe", era: 'young_sheldon' },
    ys_billy: { name: "Billy Sparks", desc: "Tank who summons chickens that peck enemies. High HP, low damage. Passive: chickens distract enemies reducing their attack speed.", baseDmg: 6, baseHp: 400, atkSpeed: 3000, cost: { money: 24000 }, lane: "front", passiveType: 'summonChicken', basePassiveAmount: 3, classType: "tank", era: 'young_sheldon', lifestealTiers: [{level:10,pct:0.05},{level:25,pct:0.10},{level:50,pct:0.15}] },
    ys_georgie: { name: "Georgie Cooper", desc: "Attacks with spinning tires. Passive: Money & loot increase. Mullet Hair Swing decreases enemy attack speed.", baseDmg: 18, baseHp: 150, atkSpeed: 2200, cost: { money: 26000 }, lane: "mid", passiveType: 'tireLootSlow', basePassiveAmount: 0.20, classType: "dps", era: 'young_sheldon' },
    ys_tam: { name: "Tam Nguyen", desc: "Vietnam War-style attacks with throwing stars and combat moves. Fast attacker with burst damage.", baseDmg: 28, baseHp: 70, atkSpeed: 1500, cost: { money: 28000 }, lane: "mid", passiveType: 'warBurst', classType: "dps", era: 'young_sheldon' },
    ys_pastor_jeff: { name: "Pastor Jeff", desc: "Holy Spirit attack and Bible beam. Heals the team with divine light. Passive: periodic team heal.", baseDmg: 5, baseHp: 100, atkSpeed: 4000, cost: { money: 30000 }, lane: "back", passiveType: 'holyHeal', healPctMaxHp: 0.18, basePassiveAmount: 30, classType: "support", era: 'young_sheldon' },
    ys_pastor_rob: { name: "Pastor Rob", desc: "Cracks a whip with guaranteed critical hits on every attack. Fast and deadly.", baseDmg: 40, baseHp: 85, atkSpeed: 2000, cost: { money: 32000 }, lane: "mid", passiveType: 'whipCrit', classType: "assassin", era: 'young_sheldon' },

    // ═══════ MULTIVERSE SAGA CHARACTERS (Auto-unlock at Wave 150 story) ═══════
    mv_true_sheldon: { name: "True Sheldon", desc: "The Sheldon who discovered everything. Unified field blast hits all enemies.", baseDmg: 45, baseHp: 120, atkSpeed: 3000, cost: { money: 0 }, lane: "mid", passiveType: 'unifiedField', basePassiveAmount: 0.30, classType: "dps", era: 'multiverse', autoUnlock: true },
    mv_siebert: { name: "President Siebert", desc: "Caltech president. Slows all enemies with bureaucratic paperwork debuffs.", baseDmg: 5, baseHp: 100, atkSpeed: 4500, cost: { money: 35000 }, lane: "back", passiveType: 'bureaucracy', basePassiveAmount: 0.25, classType: "support", era: 'multiverse' },
    mv_ramona: { name: "Ramona Nowitzki", desc: "Marks a target dealing escalating damage the longer she focuses.", baseDmg: 30, baseHp: 75, atkSpeed: 2000, cost: { money: 38000 }, lane: "back", passiveType: 'obsessiveMark', classType: "assassin", era: 'multiverse' },
    mv_captain_sweatpants: { name: "Captain Sweatpants", desc: "Throws comic books that explode on impact dealing AoE.", baseDmg: 20, baseHp: 140, atkSpeed: 3500, cost: { money: 40000 }, lane: "mid", passiveType: 'comicSummon', basePassiveAmount: 3, classType: "aoe", era: 'multiverse' },
    mv_priya: { name: "Priya Koothrappali", desc: "Lawyer sister. Objection! stuns random enemies periodically.", baseDmg: 15, baseHp: 90, atkSpeed: 3000, cost: { money: 42000 }, lane: "back", passiveType: 'objectionStun', basePassiveAmount: 2, classType: "magic", era: 'multiverse' },
    mv_dave: { name: "Dave Gibbs", desc: "Penny's British ex. Massive HP tank who punches hard and takes reduced damage.", baseDmg: 25, baseHp: 550, atkSpeed: 2500, cost: { money: 45000 }, lane: "front", passiveType: 'brawlTank', basePassiveAmount: 0.20, classType: "tank", era: 'multiverse' },
    mv_dark_kripke: { name: "Dark Kripke", desc: "Mirror Kripke with plasma weapon. Fires continuous plasma beam.", baseDmg: 38, baseHp: 85, atkSpeed: 1600, cost: { money: 48000 }, lane: "mid", passiveType: 'plasmaRay', basePassiveAmount: 4, classType: "dps", era: 'multiverse' },
    mv_mrs_wolowitz: { name: "Mrs. Wolowitz", desc: "Voice-only. MASSIVE team heal with booming voice.", baseDmg: 0, baseHp: 150, atkSpeed: 5000, cost: { money: 50000 }, lane: "back", passiveType: 'voiceHeal', healPctMaxHp: 0.25, basePassiveAmount: 40, classType: "support", era: 'multiverse' },
    mv_althea: { name: "Nurse Althea", desc: "Emergency heal when allies drop below 30% HP.", baseDmg: 5, baseHp: 110, atkSpeed: 4000, cost: { money: 52000 }, lane: "back", passiveType: 'emergencyHeal', healPctMaxHp: 0.35, basePassiveAmount: 30, classType: "support", era: 'multiverse' },
    mv_janine: { name: "Janine Davis", desc: "HR director. Creates a shield absorbing damage for the team.", baseDmg: 12, baseHp: 480, atkSpeed: 3000, cost: { money: 55000 }, lane: "front", passiveType: 'shieldWall', basePassiveAmount: 0.15, classType: "tank", era: 'multiverse' },

    // ═══════ GENESIS PROTOCOL CHARACTERS (Auto-unlock at Wave 250 story) ═══════
    gen_architect: { name: "The Grand Architect", desc: "Former Illuminati leader. Reveals hidden knowledge buffs to the team.", baseDmg: 20, baseHp: 130, atkSpeed: 3500, cost: { money: 0 }, lane: "back", passiveType: 'knowledgeBuff', basePassiveAmount: 0.20, classType: "support", era: 'genesis', autoUnlock: true },
    gen_fallen: { name: "The Fallen One", desc: "A fallen angel. Divine attacks that deal holy AoE damage.", baseDmg: 50, baseHp: 95, atkSpeed: 2800, cost: { money: 70000 }, lane: "mid", passiveType: 'divineStrike', basePassiveAmount: 0.25, classType: "aoe", era: 'genesis' },
    gen_sheldon_prime: { name: "Sheldon Prime", desc: "Sheldon from the end of time. Has seen everything. Ultimate time-stop attacks.", baseDmg: 60, baseHp: 100, atkSpeed: 2200, cost: { money: 80000 }, lane: "mid", passiveType: 'timeStop', basePassiveAmount: 3, classType: "dps", era: 'genesis' },
    gen_observer: { name: "The Observer", desc: "A being that watched the universe since the Big Bang. All-seeing support that reveals enemy weaknesses.", baseDmg: 10, baseHp: 200, atkSpeed: 4000, cost: { money: 90000 }, lane: "back", passiveType: 'allSeeing', basePassiveAmount: 0.30, classType: "support", era: 'genesis' }
};

// Evolution Skin Tiers - Unlocked at specific character levels
const evolutionTiers = [
    { level: 20, skinKey: 'animal', theme: 'Animal Kingdom', icon: '🐾', color: '#f97316' },
    { level: 40, skinKey: 'army', theme: 'Military Force', icon: '🪖', color: '#22c55e' },
    { level: 60, skinKey: 'justice', theme: 'Justice League', icon: '🦸', color: '#3b82f6' },
    { level: 80, skinKey: 'starwars', theme: 'Star Wars', icon: '⚔️', color: '#a855f7' },
    { level: 100, skinKey: 'mythology', theme: 'Mythology Gods', icon: '⚡', color: '#eab308' },
    { level: 0, skinKey: 'prime', theme: 'Prime Legends', icon: '👑', color: '#ff6b35', purchasable: true, cost: { diamond: 1200 } }
];

const enemyTypes = [
    { name: "Star Trek Redshirt", key: "trek", hpMultiplier: 1.1 },
    { name: "Imperial Stormtrooper", key: "wars", hpMultiplier: 1.5 },
    { name: "Rival Raider", key: "indy", hpMultiplier: 1.3 },
    { name: "Beholder", key: "dnd_boss", hpMultiplier: 4.5 }
];

const minionTypes = [
    { key: 'red_shirt', name: 'Starfleet Red Shirt', hpMultiplier: 0.8, scale: 1.0 },
    { key: 'stormtrooper', name: 'Imperial Stormtrooper', hpMultiplier: 0.9, scale: 1.0 },
    { key: 'goblin', name: 'D&D Goblin', hpMultiplier: 0.7, scale: 0.7 },
    { key: 'kryptonite', name: 'Kryptonite Shard', hpMultiplier: 1.1, scale: 0.8 },
    { key: 'trek', name: 'Borg Drone', hpMultiplier: 1.0, scale: 1.1 },
    { key: 'wars', name: 'Sith Apprentice', hpMultiplier: 1.0, scale: 1.0 },
    { key: 'indy', name: 'Temple Boulder', hpMultiplier: 1.2, scale: 1.5 },
    { key: 'goblin_shaman', name: 'Goblin Shaman', hpMultiplier: 0.85, scale: 0.75 },
    { key: 'wasteland_bandit', name: 'Wasteland Bandit', hpMultiplier: 1.05, scale: 1.0 },
    { key: 'parademon_grunt', name: 'DC Parademon', hpMultiplier: 1.15, scale: 1.2 },
    { key: 'twd_walker', name: 'TWD Walker Zombie', hpMultiplier: 0.75, scale: 0.9 },
    // NEW: TBBT & Location-Themed Enemies
    { key: 'caltech_postdoc', name: 'Caltech Postdoc', hpMultiplier: 0.9, scale: 1.0 },
    { key: 'comic_clerk', name: 'Comic Book Clerk', hpMultiplier: 0.8, scale: 1.0 },
    { key: 'cupcake_baker', name: 'Cupcake Factory Baker', hpMultiplier: 0.85, scale: 1.0 },
    { key: 'chocolate_worker', name: 'Chocolate Factory Worker', hpMultiplier: 0.95, scale: 1.0 },
    { key: 'geek_troll', name: 'Online Geek Troll', hpMultiplier: 0.7, scale: 0.9 },
    { key: 'pasadena_tourist', name: 'Pasadena Tourist', hpMultiplier: 0.75, scale: 1.0 },
    { key: 'comic_convention_fanboy', name: 'Comic Con Fanboy', hpMultiplier: 0.88, scale: 1.0 },
    { key: 'alien_invader', name: 'Alien Invader', hpMultiplier: 1.2, scale: 1.3 },
    { key: 'meathead_jock', name: 'Meathead Jock', hpMultiplier: 1.2, scale: 1.4 },
    { key: 'drone_bot', name: 'Drone Bot', hpMultiplier: 0.6, scale: 0.8, speed: 1.5 },
    { key: 'shield_trooper', name: 'Shield Trooper', hpMultiplier: 1.8, scale: 1.2, damageReduction: 0.3 },
    { key: 'healer_drone', name: 'Healer Drone', hpMultiplier: 0.75, scale: 0.9, healAllyPercent: 0.05 },
    // ═══════ MULTIVERSE MINIONS ═══════
    { key: 'mv_shadow_scientist', name: 'Shadow Scientist', hpMultiplier: 1.1, scale: 1.0 },
    { key: 'mv_dark_robot', name: 'Dark Robot', hpMultiplier: 1.3, scale: 1.1 },
    { key: 'mv_evil_intern', name: 'Evil Intern', hpMultiplier: 0.8, scale: 0.9 },
    { key: 'mv_clockwork_auto', name: 'Clockwork Automaton', hpMultiplier: 1.2, scale: 1.0 },
    { key: 'mv_steam_golem', name: 'Steam Golem', hpMultiplier: 1.5, scale: 1.3 },
    { key: 'mv_gear_spider', name: 'Gear Spider', hpMultiplier: 0.7, scale: 0.7 },
    { key: 'mv_zombie_civ', name: 'Zombie Civilian', hpMultiplier: 0.8, scale: 1.0 },
    { key: 'mv_infected_nerd', name: 'Infected Nerd', hpMultiplier: 0.9, scale: 1.0 },
    { key: 'mv_ghost_pirate', name: 'Ghost Pirate', hpMultiplier: 1.1, scale: 1.0 },
    { key: 'mv_skeleton_crew', name: 'Skeleton Crew', hpMultiplier: 0.85, scale: 0.9 },
    { key: 'mv_goblin_warrior', name: 'Goblin Warrior', hpMultiplier: 0.75, scale: 0.7 },
    { key: 'mv_dark_knight', name: 'Dark Knight', hpMultiplier: 1.4, scale: 1.2 },
    { key: 'mv_wyvern', name: 'Wyvern', hpMultiplier: 1.3, scale: 1.1 },
    { key: 'mv_bandit', name: 'Wild West Bandit', hpMultiplier: 1.0, scale: 1.0 },
    { key: 'mv_outlaw', name: 'Outlaw Gunslinger', hpMultiplier: 1.1, scale: 1.0 },
    { key: 'mv_rogue_ai', name: 'Rogue AI', hpMultiplier: 1.2, scale: 1.0 },
    { key: 'mv_terminator', name: 'Terminator Unit', hpMultiplier: 1.6, scale: 1.2 },
    { key: 'mv_drone_swarm', name: 'Drone Swarm', hpMultiplier: 0.6, scale: 0.8 },
    { key: 'mv_raptor', name: 'Velociraptor', hpMultiplier: 1.0, scale: 0.9 },
    { key: 'mv_compys', name: 'Compy Pack', hpMultiplier: 0.5, scale: 0.6 },
    { key: 'mv_electric_eel', name: 'Electric Eel', hpMultiplier: 0.9, scale: 0.8 },
    { key: 'mv_shark_drone', name: 'Shark Drone', hpMultiplier: 1.2, scale: 1.1 },
    { key: 'mv_cyber_ninja', name: 'Cyber Ninja', hpMultiplier: 1.1, scale: 1.0 },
    { key: 'mv_hoverbike', name: 'Hoverbike Gang', hpMultiplier: 1.0, scale: 1.0 },
    { key: 'mv_alien_warship', name: 'Alien Warship', hpMultiplier: 1.5, scale: 1.3 },
    { key: 'mv_void_creature', name: 'Void Creature', hpMultiplier: 1.3, scale: 1.1 },
    { key: 'mv_reality_frag', name: 'Reality Fragment', hpMultiplier: 1.4, scale: 1.0 },
    // ═══════ GENESIS PROTOCOL MINIONS ═══════
    { key: 'gen_illuminati_agent', name: 'Illuminati Agent', hpMultiplier: 1.2, scale: 1.0 },
    { key: 'gen_shadow_guard', name: 'Shadow Guard', hpMultiplier: 1.3, scale: 1.1 },
    { key: 'gen_mind_controller', name: 'Mind Controller', hpMultiplier: 1.0, scale: 1.0 },
    { key: 'gen_templar_knight', name: 'Templar Knight', hpMultiplier: 1.5, scale: 1.2 },
    { key: 'gen_cipher_monk', name: 'Cipher Monk', hpMultiplier: 0.9, scale: 0.9 },
    { key: 'gen_relic_golem', name: 'Relic Golem', hpMultiplier: 1.7, scale: 1.3 },
    { key: 'gen_mib_agent', name: 'Man in Black', hpMultiplier: 1.1, scale: 1.0 },
    { key: 'gen_hybrid', name: 'Alien-Human Hybrid', hpMultiplier: 1.2, scale: 1.1 },
    { key: 'gen_anubis', name: 'Anubis Warrior', hpMultiplier: 1.4, scale: 1.2 },
    { key: 'gen_scarab', name: 'Scarab Swarm', hpMultiplier: 0.6, scale: 0.7 },
    { key: 'gen_minotaur', name: 'Olympus Minotaur', hpMultiplier: 1.5, scale: 1.3 },
    { key: 'gen_cyclops', name: 'Cyclops', hpMultiplier: 1.8, scale: 1.4 },
    { key: 'gen_harpy', name: 'Harpy', hpMultiplier: 0.8, scale: 0.9 },
    { key: 'gen_frost_giant', name: 'Frost Giant', hpMultiplier: 1.9, scale: 1.5 },
    { key: 'gen_valkyrie', name: 'Valkyrie', hpMultiplier: 1.3, scale: 1.1 },
    { key: 'gen_dark_elf', name: 'Dark Elf', hpMultiplier: 1.0, scale: 0.9 },
    { key: 'gen_seraphim', name: 'Seraphim', hpMultiplier: 1.4, scale: 1.2 },
    { key: 'gen_fallen_angel', name: 'Fallen Angel', hpMultiplier: 1.3, scale: 1.1 },
    { key: 'gen_serpent', name: 'The Serpent Brood', hpMultiplier: 1.1, scale: 1.0 },
    { key: 'gen_demon', name: 'Underworld Demon', hpMultiplier: 1.5, scale: 1.2 },
    { key: 'gen_soul_reaper', name: 'Soul Reaper', hpMultiplier: 1.2, scale: 1.0 },
    { key: 'gen_time_paradox', name: 'Time Paradox', hpMultiplier: 1.3, scale: 1.0 },
    { key: 'gen_echo_clone', name: 'Echo Clone', hpMultiplier: 1.0, scale: 1.0 },
    { key: 'gen_energy_being', name: 'Pure Energy Being', hpMultiplier: 1.6, scale: 1.2 },
    { key: 'gen_quantum_ghost', name: 'Quantum Ghost', hpMultiplier: 0.9, scale: 0.9 },
    { key: 'gen_void_walker', name: 'Void Walker', hpMultiplier: 1.4, scale: 1.1 },
    { key: 'gen_cosmic_seed', name: 'Cosmic Seed', hpMultiplier: 1.7, scale: 1.0 }
];

// BOSSES: Unique Challenges (Added Stranger Things, Dragons, DC Villains, Aliens, SciFi Mechs, and Superheroes)
const bossTypes = [
    { key: 'gorn', name: 'The Gorn', hpMultiplier: 2.0, scale: 1.2 },
    { key: 'demogorgon', name: 'The Demogorgon', hpMultiplier: 2.6, scale: 1.3 }, // Stranger Things
    { key: 'dnd_boss', name: 'The Dungeon Master', hpMultiplier: 2.1, scale: 1.2 }, 
    { key: 'red_dragon', name: 'Ancient Red Dragon', hpMultiplier: 3.2, scale: 1.3 },  // Dragons
    { key: 'lex_luthor', name: 'Lex Luthor (Ph.D.)', hpMultiplier: 2.2, scale: 1.1 },
    { key: 'joker_boss', name: 'The Joker (DC)', hpMultiplier: 2.4, scale: 1.1 },       // DC Comics
    { key: 'darth_vader', name: 'Darth Vader', hpMultiplier: 2.5, scale: 1.2 },
    { key: 'xenomorph_queen', name: 'Xenomorph Queen', hpMultiplier: 2.85, scale: 1.3 }, // Aliens Pack
    { key: 'minotaur', name: 'Greek Minotaur', hpMultiplier: 2.4, scale: 1.3 },
    { key: 'scifi_mech', name: 'Plasma Goliath Mech', hpMultiplier: 3.5, scale: 1.3 }, // SciFi Enemy
    { key: 'evil_wil', name: 'Evil Wil Wheaton', hpMultiplier: 3.0, scale: 1.1 },
    { key: 'broken_elevator', name: 'The Broken Elevator', hpMultiplier: 4.0, scale: 1.3 },
    // NEW: SUPERHERO & Expanded Bosses
    { key: 'batman_boss', name: 'Batman (Dark Knight)', hpMultiplier: 2.8, scale: 1.2 },
    { key: 'superman_boss', name: 'Superman (Man of Steel)', hpMultiplier: 3.3, scale: 1.2 },
    { key: 'wonderwoman_boss', name: 'Wonder Woman', hpMultiplier: 2.9, scale: 1.2 },
    { key: 'ironman_boss', name: 'Ironman (Stark Tech)', hpMultiplier: 3.1, scale: 1.2 },
    { key: 'thanos_boss', name: 'Thanos (Mad Titan)', hpMultiplier: 4.0, scale: 1.3 },
    { key: 'flash_boss', name: 'The Flash (Speedster)', hpMultiplier: 2.2, scale: 1.1 },
    { key: 'aquaman_boss', name: 'Aquaman (King of Atlantis)', hpMultiplier: 2.6, scale: 1.2 },
    { key: 'greenlantern_boss', name: 'Green Lantern (Oa)', hpMultiplier: 2.7, scale: 1.2 },
    { key: 'caltech_chairman', name: 'The University Chairman', hpMultiplier: 2.5, scale: 1.1 },
    { key: 'kurt_ex', name: "Kurt (Penny's Ex)", hpMultiplier: 2.6, scale: 1.1 },
    // ═══════ MULTIVERSE BOSSES ═══════
    { key: 'mv_mirror_dean', name: 'Mirror Dean', hpMultiplier: 3.0, scale: 1.2 },
    { key: 'mv_clockmaster', name: 'The Grand Clockmaster', hpMultiplier: 3.5, scale: 1.3 },
    { key: 'mv_zombie_king', name: 'Zombie Horde King', hpMultiplier: 3.2, scale: 1.3 },
    { key: 'mv_blackbeard', name: 'Captain Blackbeard Bot', hpMultiplier: 3.4, scale: 1.2 },
    { key: 'mv_dragon_lord', name: 'The Dragon Lord', hpMultiplier: 4.0, scale: 1.4 },
    { key: 'mv_sheriff_doom', name: 'Sheriff Doom', hpMultiplier: 3.0, scale: 1.1 },
    { key: 'mv_singularity', name: 'The Singularity Core', hpMultiplier: 4.2, scale: 1.3 },
    { key: 'mv_alpha_rex', name: 'The Alpha Rex', hpMultiplier: 4.5, scale: 1.5 },
    { key: 'mv_leviathan', name: 'Leviathan', hpMultiplier: 4.0, scale: 1.4 },
    { key: 'mv_megacorp', name: 'MegaCorp AI', hpMultiplier: 3.8, scale: 1.2 },
    { key: 'mv_void_emperor', name: 'The Void Emperor', hpMultiplier: 4.5, scale: 1.3 },
    { key: 'mv_multiverse_sheldon', name: 'Multiverse Sheldon', hpMultiplier: 5.0, scale: 1.4 },
    // ═══════ GENESIS PROTOCOL BOSSES ═══════
    { key: 'gen_lodge_master', name: 'The Lodge Master', hpMultiplier: 4.0, scale: 1.2 },
    { key: 'gen_pope_mech', name: 'Vatican Guardian Mech', hpMultiplier: 4.5, scale: 1.3 },
    { key: 'gen_area51_commander', name: 'Area 51 Commander', hpMultiplier: 4.2, scale: 1.2 },
    { key: 'gen_pharaoh', name: 'The Immortal Pharaoh', hpMultiplier: 4.8, scale: 1.3 },
    { key: 'gen_zeus', name: 'Zeus', hpMultiplier: 5.0, scale: 1.4 },
    { key: 'gen_odin', name: 'Odin Allfather', hpMultiplier: 5.2, scale: 1.4 },
    { key: 'gen_archangel', name: 'The Archangel', hpMultiplier: 5.0, scale: 1.3 },
    { key: 'gen_hades', name: 'Hades', hpMultiplier: 5.5, scale: 1.4 },
    { key: 'gen_chronos', name: 'Chronos the Time Titan', hpMultiplier: 5.0, scale: 1.3 },
    { key: 'gen_big_bang', name: 'The Singularity', hpMultiplier: 5.5, scale: 1.5 },
    { key: 'gen_first_light', name: 'The First Light', hpMultiplier: 5.8, scale: 1.4 },
    { key: 'gen_the_equation', name: 'The Equation', hpMultiplier: 6.0, scale: 1.5 }
];

// ROBOTS: Craftable mechanical allies (Star Wars, DC, Real Steel themes)
const robots = {
    // TBBT Lore Bots
    r2d2_unit: { name: "Shelbot (MVPD)", desc: "Sheldon's Mobile Virtual Presence Device. Keeps you safe in your room.", baseDmg: 8, atkSpeed: 1400, lane: "mid", type: "flying", craftTime: 300000, baseHeat: 600, cost: { stone: 20, iron: 15, scrap: 10 } },
    battle_droid: { name: "M.O.N.T.E.", desc: "Leonard and Howard's killer robot. Armed with a circular saw.", baseDmg: 6, atkSpeed: 1600, lane: "front", type: "land", craftTime: 420000, baseHeat: 2400, cost: { stone: 30, iron: 25, gold: 10, scrap: 15 } },
    droideka: { name: "Kripke Krippler", desc: "Barry Kripke's devastating combat robot with a spinning blade.", baseDmg: 4, atkSpeed: 2000, lane: "front", type: "land", craftTime: 600000, baseHeat: 2700, cost: { stone: 40, iron: 35, gold: 20, diamond: 5, scrap: 25 } },
    
    omac_unit: { name: "Wolowitz Robotic Arm", desc: "Howard's zero-g robotic arm. Great for 'massage' damage.", baseDmg: 6, atkSpeed: 1800, lane: "front", type: "land", craftTime: 480000, baseHeat: 2500, cost: { stone: 35, iron: 25, gold: 12, scrap: 18 } },
    cyborg_support: { name: "Mars Rover", desc: "Howard's Mars Rover. Don't get it stuck in a ditch!", baseDmg: 10, atkSpeed: 2200, lane: "back", type: "land", craftTime: 360000, baseHeat: 500, cost: { stone: 25, iron: 20, gold: 5, scrap: 12 } },
    apokolips_destroyer: { name: "Wallowitz Hoverbot", desc: "Howard's hovering drone camera. Spies and shoots.", baseDmg: 28, atkSpeed: 2400, lane: "back", type: "flying", craftTime: 7200000, baseHeat: 550, cost: { stone: 80, iron: 60, gold: 40, diamond: 15, scrap: 45 } },
    
    atom_boxer: { name: "Time Machine Replica", desc: "It doesn't go to the future, but it hits hard in the present.", baseDmg: 5, atkSpeed: 1200, lane: "front", type: "land", craftTime: 420000, baseHeat: 3000, cost: { stone: 28, iron: 22, gold: 8, scrap: 15 } },
    zeus_titan: { name: "Giant Jenga Bot", desc: "Massive blocky robot that crushes enemies slowly.", baseDmg: 10, atkSpeed: 2800, lane: "front", type: "land", craftTime: 900000, baseHeat: 3600, cost: { stone: 70, iron: 55, gold: 30, diamond: 10, scrap: 35 } },
    midas_speedster: { name: "Toy Train Engine", desc: "Sheldon's favorite O-gauge locomotive, weaponized.", baseDmg: 14, atkSpeed: 1100, lane: "mid", type: "flying", craftTime: 540000, baseHeat: 750, cost: { stone: 45, iron: 35, gold: 25, diamond: 6, scrap: 20 } },
    roomba_doom: { name: "Roomba of Doom", desc: "A heavily modified cleaning robot. Mostly bumps into shins.", baseDmg: 2, atkSpeed: 1000, lane: "front", type: "land", craftTime: 120000, baseHeat: 1800, cost: { stone: 15, iron: 5, scrap: 5 } },
    quantum_drone: { name: "Quantum Drone", desc: "Hovering drone powered by theoretical entanglement.", baseDmg: 50, atkSpeed: 900, lane: "back", type: "flying", craftTime: 1200000, baseHeat: 300, cost: { iron: 100, gold: 50, diamond: 25, scrap: 50 } }
};

// FOOD SYSTEM: Character recovery items with varying rarity and HP restoration
const foods = {
    chinese: { name: "Chinese Food", emoji: "🥡", hpRestore: 25, rarity: 0.30, description: "Takeout from Pasadena - classic comfort food" },
    pizza: { name: "Pizza", emoji: "🍕", hpRestore: 30, rarity: 0.28, description: "Delivery pizza - always good for team morale" },
    cupcakes: { name: "Cupcakes", emoji: "🧁", hpRestore: 40, rarity: 0.12, description: "From Pasadena's finest cupcake bakery" },
    burger: { name: "Burger", emoji: "🍔", hpRestore: 20, rarity: 0.35, description: "Classic American burger - quick recovery" },
    tacos: { name: "Tacos", emoji: "🌮", hpRestore: 35, rarity: 0.15, description: "Delicious street tacos" },
    indian: { name: "Indian Food", emoji: "🍛", hpRestore: 50, rarity: 0.10, description: "Raj's favorite - spicy and healing" },
    hotdog: { name: "Hot Dog", emoji: "🌭", hpRestore: 15, rarity: 0.38, description: "Street vendor hot dog" },
    pretzel: { name: "Soft Pretzel", emoji: "🥨", hpRestore: 25, rarity: 0.20, description: "Warm and chewy" },
    smoothie: { name: "Smoothie", emoji: "🥤", hpRestore: 30, rarity: 0.22, description: "Healthy fruit smoothie" },
    energydrink: { name: "Energy Drink", emoji: "⚡", hpRestore: 35, rarity: 0.18, description: "Double recovery speed for 30 seconds" },
    cheesecake: { name: "Cheesecake", emoji: "🍰", hpRestore: 60, rarity: 0.03, description: "Legendary cheesecake - max recovery" },
    shawarma: { name: "Shawarma", emoji: "🥙", hpRestore: 45, rarity: 0.08, description: "Post-mission favorite" }
};

// LOCATIONS: Pasadena map with enemy pools and difficulty scaling
const locations = {
    sheldons_apt: { 
        name: "Apt 4A \u2013 Sheldon & Leonard's", 
        desc: "The nerve center. Whiteboard theories, Thai food Tuesdays, and Sheldon's spot.", 
        minDifficulty: 1, 
        maxDifficulty: 3,
        minionPool: ['pasadena_tourist', 'geek_troll'],
        bossPool: ['broken_elevator']
    },
    pennys_apt: { 
        name: "Apt 4B \u2013 Penny's Place", 
        desc: "Across the hall. Wine, acting dreams, and a perpetually unlocked door.", 
        minDifficulty: 4, 
        maxDifficulty: 9,
        minionPool: ['meathead_jock', 'pasadena_tourist'],
        bossPool: ['kurt_ex']
    },
    chocolate_factory: { 
        name: "Fudge Perfection Factory", 
        desc: "Where Bernadette used to work. Don't eat the samples... or do.", 
        minDifficulty: 2, 
        maxDifficulty: 6,
        minionPool: ['chocolate_worker', 'cupcake_baker', 'goblin'],
        bossPool: ['ironman_boss']
    },
    cheesecake_factory: { 
        name: "The Cheesecake Factory", 
        desc: "Penny's old job. 200+ menu items, one legendary booth, infinite refills.", 
        minDifficulty: 3, 
        maxDifficulty: 8,
        minionPool: ['cupcake_baker', 'pasadena_tourist', 'twd_walker'],
        bossPool: ['red_dragon']
    },
    bernie_house: { 
        name: "The Wolowitz Residence", 
        desc: "Howard & Bernadette's home. Tiny but fierce. Don't wake the baby.", 
        minDifficulty: 3, 
        maxDifficulty: 7,
        minionPool: ['pasadena_tourist', 'goblin_shaman', 'comic_clerk'],
        bossPool: ['joker_boss']
    },
    comic_store: { 
        name: "Stuart's Comic Center", 
        desc: "New comics every Wednesday. D&D nights. Stuart's tears sold separately.", 
        minDifficulty: 4, 
        maxDifficulty: 10,
        minionPool: ['comic_clerk', 'geek_troll', 'comic_convention_fanboy', 'parademon_grunt'],
        bossPool: ['batman_boss', 'superman_boss', 'wonderwoman_boss', 'flash_boss', 'aquaman_boss', 'greenlantern_boss']
    },
    howards_house: { 
        name: "Mrs. Wolowitz's House", 
        desc: "Howard's childhood home. Ma's cooking, engineer's garage, astronaut memories.", 
        minDifficulty: 4, 
        maxDifficulty: 8,
        minionPool: ['wasteland_bandit', 'comic_convention_fanboy', 'goblin'],
        bossPool: ['evil_wil']
    },
    rajs_apt: { 
        name: "Raj's Apartment", 
        desc: "Rooftop telescope, Cinnamon's kingdom, and Bollywood movie marathons.", 
        minDifficulty: 5, 
        maxDifficulty: 11,
        minionPool: ['alien_invader', 'trek', 'stormtrooper', 'kryptonite', 'healer_drone'],
        bossPool: ['scifi_mech', 'xenomorph_queen', 'thanos_boss']
    },
    pasadena_museum: { 
        name: "Natural History Museum", 
        desc: "Dinosaur bones, planetarium shows, and overpriced gift shop magnets.", 
        minDifficulty: 6, 
        maxDifficulty: 13,
        minionPool: ['caltech_postdoc', 'indy', 'red_shirt', 'wars'],
        bossPool: ['darth_vader', 'minotaur', 'dnd_boss']
    },
    caltech: { 
        name: "Caltech University", 
        desc: "The battleground of brilliance. Tenure wars, laser labs, and cafeteria Sloppy Joes.", 
        minDifficulty: 5, 
        maxDifficulty: 12,
        minionPool: ['caltech_postdoc', 'stormtrooper', 'trek', 'drone_bot', 'shield_trooper'],
        bossPool: ['caltech_chairman', 'lex_luthor']
    },

    // ═══════ YOUNG SHELDON TIMELINE (Wave 80+) ═══════
    ys_cooper_home: {
        name: "Cooper Family Home",
        desc: "Medford, TX — The Cooper residence. Dr. Chaos's scrap army is invading the neighborhood.",
        minDifficulty: 13,
        maxDifficulty: 16,
        minionPool: ['ys_scrap_robot', 'ys_scrap_tank', 'ys_monkey_butler', 'ys_junkyard_dog'],
        bossPool: ['ys_evil_scientist'],
        era: 'young_sheldon'
    },
    ys_high_school: {
        name: "Medford High School",
        desc: "The school is overrun with mutants and cyborg abominations. Young Sheldon's classmates aren't looking so good.",
        minDifficulty: 15,
        maxDifficulty: 19,
        minionPool: ['ys_cyborg', 'ys_radioactive_mutant', 'ys_zombie_student', 'ys_mutant_rat'],
        bossPool: ['ys_frankenstein'],
        era: 'young_sheldon'
    },
    ys_texas_ranch: {
        name: "Texas Ranch",
        desc: "The animals have been corrupted by Dr. Chaos's experiments. The ranch is a warzone.",
        minDifficulty: 17,
        maxDifficulty: 22,
        minionPool: ['ys_bear', 'ys_lion', 'ys_crocodile', 'ys_shark', 'ys_wolf'],
        bossPool: ['ys_mutant_bull'],
        era: 'young_sheldon'
    },
    ys_desert: {
        name: "Texas Desert Wasteland",
        desc: "Dr. Chaos resurrected an army in the desert. Soldiers, dictators, and the undead march across the sand.",
        minDifficulty: 20,
        maxDifficulty: 25,
        minionPool: ['ys_rambo_soldier', 'ys_sniper', 'ys_zombie_horde'],
        bossPool: ['ys_hitler'],
        era: 'young_sheldon'
    },
    ys_museum: {
        name: "Texas Natural History Museum",
        desc: "The museum exhibits have come alive! Dinosaurs roam free and aliens have landed.",
        minDifficulty: 22,
        maxDifficulty: 28,
        minionPool: ['ys_trex', 'ys_raptor', 'ys_pterodactyl', 'ys_alien_trooper', 'ys_ufo_drone'],
        bossPool: ['ys_cerberus', 'ys_mech_warrior'],
        era: 'young_sheldon'
    },
    ys_chaos_lab: {
        name: "Dr. Chaos's Secret Lab",
        desc: "The final showdown. Dr. Chaos has allied with the most powerful villains in existence.",
        minDifficulty: 25,
        maxDifficulty: 35,
        minionPool: ['ys_dc_bane', 'ys_cyborg', 'ys_scrap_tank', 'ys_alien_trooper', 'ys_zombie_horde'],
        bossPool: ['ys_dc_deathstroke', 'ys_dc_darkseid'],
        era: 'young_sheldon'
    },

    // ═══════ MULTIVERSE SAGA (Wave 150+) ═══════
    mv_mirror_caltech: {
        name: "Mirror Caltech",
        desc: "An evil reversed university from the mirror dimension. Dark halls echo with twisted equations.",
        minDifficulty: 28, maxDifficulty: 35,
        minionPool: ['mv_shadow_scientist', 'mv_dark_robot', 'mv_evil_intern'],
        bossPool: ['mv_mirror_dean'],
        era: 'multiverse'
    },
    mv_steampunk_4a: {
        name: "Steampunk Apartment 4A",
        desc: "A Victorian-era version of the apartment. Gears and steam pipes everywhere.",
        minDifficulty: 30, maxDifficulty: 38,
        minionPool: ['mv_clockwork_auto', 'mv_steam_golem', 'mv_gear_spider'],
        bossPool: ['mv_clockmaster'],
        era: 'multiverse'
    },
    mv_zombie_pasadena: {
        name: "Zombie Pasadena",
        desc: "The city has fallen to an undead apocalypse. Familiar streets are now crawling with zombies.",
        minDifficulty: 32, maxDifficulty: 40,
        minionPool: ['mv_zombie_civ', 'mv_infected_nerd', 'mv_zombie_civ'],
        bossPool: ['mv_zombie_king'],
        era: 'multiverse'
    },
    mv_pirate_cove: {
        name: "Pirate Dimension",
        desc: "A Caribbean-style sea battle dimension. Ghost ships and skeleton crews roam the waters.",
        minDifficulty: 33, maxDifficulty: 42,
        minionPool: ['mv_ghost_pirate', 'mv_skeleton_crew', 'mv_ghost_pirate'],
        bossPool: ['mv_blackbeard'],
        era: 'multiverse'
    },
    mv_medieval_realm: {
        name: "Medieval Realm",
        desc: "Sheldon's dream — a real D&D fantasy dimension! Goblins, knights, and dragons roam free.",
        minDifficulty: 35, maxDifficulty: 45,
        minionPool: ['mv_goblin_warrior', 'mv_dark_knight', 'mv_wyvern'],
        bossPool: ['mv_dragon_lord'],
        era: 'multiverse'
    },
    mv_wild_west: {
        name: "Wild West Pasadena",
        desc: "A western saloon dimension. Bandits, tumbleweeds, and high-noon showdowns.",
        minDifficulty: 36, maxDifficulty: 46,
        minionPool: ['mv_bandit', 'mv_outlaw', 'mv_bandit'],
        bossPool: ['mv_sheriff_doom'],
        era: 'multiverse'
    },
    mv_robot_uprising: {
        name: "Robot Uprising",
        desc: "An AI rebellion dimension. Machines have taken over and humans are on the run.",
        minDifficulty: 38, maxDifficulty: 48,
        minionPool: ['mv_rogue_ai', 'mv_terminator', 'mv_drone_swarm'],
        bossPool: ['mv_singularity'],
        era: 'multiverse'
    },
    mv_jurassic: {
        name: "Jurassic Pasadena",
        desc: "Dinosaurs roaming the streets of Pasadena. Life found a way... to another dimension.",
        minDifficulty: 40, maxDifficulty: 50,
        minionPool: ['mv_raptor', 'mv_compys', 'mv_raptor'],
        bossPool: ['mv_alpha_rex'],
        era: 'multiverse'
    },
    mv_underwater: {
        name: "Atlantis Labs",
        desc: "An underwater research facility in a dimension where the ocean swallowed the land.",
        minDifficulty: 42, maxDifficulty: 52,
        minionPool: ['mv_electric_eel', 'mv_shark_drone', 'mv_electric_eel'],
        bossPool: ['mv_leviathan'],
        era: 'multiverse'
    },
    mv_cyber_city: {
        name: "Cyber City 2099",
        desc: "A neon cyberpunk future dimension. Hoverbikes, mega-corporations, and digital nightmares.",
        minDifficulty: 44, maxDifficulty: 55,
        minionPool: ['mv_cyber_ninja', 'mv_hoverbike', 'mv_drone_swarm'],
        bossPool: ['mv_megacorp'],
        era: 'multiverse'
    },
    mv_void_space: {
        name: "The Cosmic Void",
        desc: "Outer space at the edge of the multiverse. Floating debris and alien warships surround you.",
        minDifficulty: 46, maxDifficulty: 58,
        minionPool: ['mv_alien_warship', 'mv_void_creature', 'mv_reality_frag'],
        bossPool: ['mv_void_emperor'],
        era: 'multiverse'
    },
    mv_final_rift: {
        name: "The Final Rift",
        desc: "All dimensions colliding into one. The ultimate boss rush — close the multiverse or lose everything.",
        minDifficulty: 50, maxDifficulty: 65,
        minionPool: ['mv_shadow_scientist', 'mv_terminator', 'mv_void_creature', 'mv_dark_knight', 'mv_reality_frag'],
        bossPool: ['mv_multiverse_sheldon'],
        era: 'multiverse'
    },

    // ═══════ GENESIS PROTOCOL (Wave 250+) ═══════
    gen_secret_lodge: {
        name: "The Secret Lodge",
        desc: "A hidden underground temple where the Illuminati have gathered for centuries.",
        minDifficulty: 55, maxDifficulty: 68,
        minionPool: ['gen_illuminati_agent', 'gen_shadow_guard', 'gen_mind_controller'],
        bossPool: ['gen_lodge_master'],
        era: 'genesis'
    },
    gen_vatican_vault: {
        name: "Vatican Vault",
        desc: "Secret archives beneath the Vatican. Ancient relics and forbidden knowledge guard the way.",
        minDifficulty: 58, maxDifficulty: 72,
        minionPool: ['gen_templar_knight', 'gen_cipher_monk', 'gen_relic_golem'],
        bossPool: ['gen_pope_mech'],
        era: 'genesis'
    },
    gen_area_51: {
        name: "Area 51",
        desc: "Government black site. The truth is in here — and it's heavily guarded.",
        minDifficulty: 60, maxDifficulty: 75,
        minionPool: ['gen_mib_agent', 'gen_hybrid', 'gen_mib_agent'],
        bossPool: ['gen_area51_commander'],
        era: 'genesis'
    },
    gen_pyramid: {
        name: "The Great Pyramid",
        desc: "Inside the Great Pyramid of Giza. Ancient pharaohs and their guardians still walk these halls.",
        minDifficulty: 62, maxDifficulty: 78,
        minionPool: ['gen_anubis', 'gen_scarab', 'gen_anubis'],
        bossPool: ['gen_pharaoh'],
        era: 'genesis'
    },
    gen_olympus: {
        name: "Mount Olympus",
        desc: "The home of the Greek gods. Thunder rumbles and mythical beasts guard the summit.",
        minDifficulty: 65, maxDifficulty: 82,
        minionPool: ['gen_minotaur', 'gen_cyclops', 'gen_harpy'],
        bossPool: ['gen_zeus'],
        era: 'genesis'
    },
    gen_asgard: {
        name: "Asgard",
        desc: "The Norse realm of the gods. Frost giants and Valkyries clash across the rainbow bridge.",
        minDifficulty: 68, maxDifficulty: 85,
        minionPool: ['gen_frost_giant', 'gen_valkyrie', 'gen_dark_elf'],
        bossPool: ['gen_odin'],
        era: 'genesis'
    },
    gen_eden: {
        name: "The Garden of Eden",
        desc: "Paradise corrupted. Seraphim and fallen angels battle over the fate of creation.",
        minDifficulty: 70, maxDifficulty: 88,
        minionPool: ['gen_seraphim', 'gen_fallen_angel', 'gen_serpent'],
        bossPool: ['gen_archangel'],
        era: 'genesis'
    },
    gen_underworld: {
        name: "The Underworld",
        desc: "Where Hades meets Hell. Demons and lost spirits fill the realm of the dead.",
        minDifficulty: 72, maxDifficulty: 92,
        minionPool: ['gen_demon', 'gen_soul_reaper', 'gen_demon'],
        bossPool: ['gen_hades'],
        era: 'genesis'
    },
    gen_time_stream: {
        name: "The Time Stream",
        desc: "Traveling backward through time itself. Paradoxes and echo clones haunt every moment.",
        minDifficulty: 75, maxDifficulty: 95,
        minionPool: ['gen_time_paradox', 'gen_echo_clone', 'gen_time_paradox'],
        bossPool: ['gen_chronos'],
        era: 'genesis'
    },
    gen_singularity: {
        name: "The Singularity",
        desc: "The moment before the Big Bang. Pure energy beings and quantum ghosts inhabit the void.",
        minDifficulty: 78, maxDifficulty: 98,
        minionPool: ['gen_energy_being', 'gen_quantum_ghost', 'gen_void_walker'],
        bossPool: ['gen_big_bang'],
        era: 'genesis'
    },
    gen_genesis: {
        name: "Genesis Day",
        desc: "The Big Bang itself. Reality is being born around you. The First Light blinds everything.",
        minDifficulty: 82, maxDifficulty: 100,
        minionPool: ['gen_cosmic_seed', 'gen_energy_being', 'gen_void_walker'],
        bossPool: ['gen_first_light'],
        era: 'genesis'
    },
    gen_the_equation: {
        name: "The Equation",
        desc: "FINAL MAP — Inside the equation that created everything. The formula IS the final boss.",
        minDifficulty: 85, maxDifficulty: 110,
        minionPool: ['gen_cosmic_seed', 'gen_energy_being', 'gen_quantum_ghost', 'gen_void_walker', 'gen_time_paradox'],
        bossPool: ['gen_the_equation'],
        era: 'genesis'
    }
};

// ASCENSION PROTOCOL - Map Progression Sequence
const locationOrder = [
    'sheldons_apt',
    'pennys_apt',
    'chocolate_factory',
    'cheesecake_factory',
    'bernie_house',
    'comic_store',
    'howards_house',
    'rajs_apt',
    'pasadena_museum',
    'caltech',
    // Young Sheldon Timeline (unlocked at Wave 80)
    'ys_cooper_home',
    'ys_high_school',
    'ys_texas_ranch',
    'ys_desert',
    'ys_museum',
    'ys_chaos_lab',
    // Multiverse Saga (unlocked at Wave 150)
    'mv_mirror_caltech',
    'mv_steampunk_4a',
    'mv_zombie_pasadena',
    'mv_pirate_cove',
    'mv_medieval_realm',
    'mv_wild_west',
    'mv_robot_uprising',
    'mv_jurassic',
    'mv_underwater',
    'mv_cyber_city',
    'mv_void_space',
    'mv_final_rift',
    // Genesis Protocol (unlocked at Wave 250)
    'gen_secret_lodge',
    'gen_vatican_vault',
    'gen_area_51',
    'gen_pyramid',
    'gen_olympus',
    'gen_asgard',
    'gen_eden',
    'gen_underworld',
    'gen_time_stream',
    'gen_singularity',
    'gen_genesis',
    'gen_the_equation'
];

// RESOURCE DROP TABLES: What resources each enemy type drops
const resourceDrops = {
    // Minion drops: [chance, minAmount, maxAmount] per enemy kill
    minion: { stone: [0.15, 1, 2], iron: [0.10, 1, 1], gold: [0.05, 1, 1], diamond: [0.02, 1, 1], scrap: [0.20, 1, 1] },
    // Boss drops: [chance, minAmount, maxAmount] - bosses have higher chances
    boss: { stone: [1.0, 5, 10], iron: [0.80, 3, 6], gold: [0.50, 1, 3], diamond: [0.20, 1, 2], scrap: [1.0, 3, 8] }
};