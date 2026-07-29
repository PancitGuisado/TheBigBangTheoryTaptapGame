const fs = require('fs');
let code = fs.readFileSync('config.js', 'utf8');

// Fix the mangled foods + missing data
// Find the broken section and rebuild it
const brokenStart = code.indexOf("    tacos: { name: \"Tacos\"");
const brokenEnd = code.indexOf("};\n", code.indexOf("boss: { stone:"));

if (brokenStart > -1) {
    const before = code.substring(0, brokenStart);
    const afterAll = code.substring(brokenEnd + 3);
    
    const fixedSection = `    tacos: { name: "Tacos", emoji: "🌮", hpRestore: 35, rarity: 0.15, description: "Delicious street tacos" },
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
        name: "Apt 4A \\u2013 Sheldon & Leonard's", 
        desc: "The nerve center. Whiteboard theories, Thai food Tuesdays, and Sheldon's spot.", 
        minDifficulty: 1, 
        maxDifficulty: 3,
        minionPool: ['pasadena_tourist', 'geek_troll'],
        bossPool: ['broken_elevator']
    },
    pennys_apt: { 
        name: "Apt 4B \\u2013 Penny's Place", 
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
        minionPool: ['alien_invader', 'trek', 'stormtrooper', 'kryptonite'],
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
        minionPool: ['caltech_postdoc', 'stormtrooper', 'trek'],
        bossPool: ['caltech_chairman', 'lex_luthor']
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
    'caltech'
];

// RESOURCE DROP TABLES: What resources each enemy type drops
const resourceDrops = {
    // Minion drops: chance distribution per resource type
    minion: { stone: [1, 3], iron: [1, 2], gold: [0, 1], diamond: [0, 1], scrap: [1, 1] },
    // Boss drops: guaranteed resources per wave boss
    boss: { stone: [8, 12], iron: [5, 8], gold: [2, 4], diamond: [1, 2], scrap: [5, 10] }
};
`;
    
    code = before + fixedSection + afterAll;
    fs.writeFileSync('config.js', code);
    console.log('✅ Fixed config.js - restored foods, added reworded locations, restored resourceDrops');
} else {
    console.log('❌ Could not find tacos line');
}

// Verify by checking key constants exist
const result = fs.readFileSync('config.js', 'utf8');
const checks = ['const foods', 'const locations', 'const locationOrder', 'const resourceDrops', 'shawarma', 'cheesecake:', 'caltech:', 'sheldons_apt:'];
for (const c of checks) {
    console.log(result.includes(c) ? `  ✅ ${c}` : `  ❌ MISSING: ${c}`);
}
