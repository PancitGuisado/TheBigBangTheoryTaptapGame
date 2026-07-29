// ============================================================
// TOWER ENEMIES — Custom enemies for The Elevator Shaft
// Themes: Stranger Things, Walking Dead, Supernatural
// Loaded after vectors.js, merged via Object.assign
// ============================================================

// Tower-specific minion types (used exclusively by tower.js)
const towerMinionTypes = [
    { key: 'tw_demogorgon_scout', name: 'Demogorgon Scout', hpMultiplier: 0.9, scale: 1.0 },
    { key: 'tw_demodog', name: 'Demodog', hpMultiplier: 0.85, scale: 0.85 },
    { key: 'tw_upside_down_vine', name: 'Upside Down Vine', hpMultiplier: 0.7, scale: 0.9 },
    { key: 'tw_shambler_zombie', name: 'Shambler Walker', hpMultiplier: 0.75, scale: 1.0 },
    { key: 'tw_crawler_zombie', name: 'Crawler Zombie', hpMultiplier: 0.6, scale: 0.7 },
    { key: 'tw_armored_walker', name: 'Armored Walker', hpMultiplier: 1.4, scale: 1.1, damageReduction: 0.2 },
    { key: 'tw_shadow_demon', name: 'Shadow Demon', hpMultiplier: 1.0, scale: 1.0 },
    { key: 'tw_wendigo', name: 'Wendigo', hpMultiplier: 1.2, scale: 1.1 },
    { key: 'tw_hellhound', name: 'Hellhound', hpMultiplier: 0.95, scale: 0.9, speed: 1.4 },
];

// Tower-specific boss types (one per 10 floors)
const towerBossTypes = [
    { key: 'tw_boss_demogorgon', name: 'The Demogorgon', hpMultiplier: 2.5, scale: 1.3 },
    { key: 'tw_boss_alpha_walker', name: 'The Alpha Walker', hpMultiplier: 2.8, scale: 1.2 },
    { key: 'tw_boss_yellow_eyes', name: 'Yellow-Eyed Demon', hpMultiplier: 3.0, scale: 1.2 },
    { key: 'tw_boss_mind_flayer', name: 'The Mind Flayer', hpMultiplier: 3.3, scale: 1.3 },
    { key: 'tw_boss_negan', name: 'The Warlord', hpMultiplier: 3.0, scale: 1.2 },
    { key: 'tw_boss_leviathan', name: 'The Leviathan', hpMultiplier: 3.5, scale: 1.3 },
    { key: 'tw_boss_vecna', name: 'Vecna', hpMultiplier: 3.8, scale: 1.3 },
    { key: 'tw_boss_death', name: 'The Pale Horseman', hpMultiplier: 3.5, scale: 1.2 },
    { key: 'tw_boss_horde_king', name: 'The Horde King', hpMultiplier: 4.0, scale: 1.3 },
    { key: 'tw_boss_elevator', name: 'The Elevator Itself', hpMultiplier: 4.5, scale: 1.3 },
];

// Tower boss names for each 10-floor milestone
const towerBossNames = [
    'The Demogorgon',        // F10
    'The Alpha Walker',      // F20
    'Yellow-Eyed Demon',     // F30
    'The Mind Flayer',       // F40
    'The Warlord',           // F50
    'The Leviathan',         // F60
    'Vecna',                 // F70
    'The Pale Horseman',     // F80
    'The Horde King',        // F90
    'The Elevator Itself'    // F100
];

// ============================================================
// SVG VECTORS — viewBox="0 0 60 90", class="w-full h-full"
// ============================================================

const towerEnemyVectors = {

// ───────── STRANGER THINGS ENEMIES ─────────

tw_demogorgon_scout: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Legs - pale grayish -->
<rect x="22" y="65" width="6" height="16" fill="#6b7280" rx="1"/>
<rect x="32" y="65" width="6" height="16" fill="#6b7280" rx="1"/>
<!-- Clawed feet -->
<path d="M 20,80 L 22,75 L 28,75 L 30,80" fill="#4b5563"/>
<path d="M 30,80 L 32,75 L 38,75 L 40,80" fill="#4b5563"/>
<!-- Body - pale gray-pink -->
<rect x="16" y="32" width="28" height="34" fill="#9ca3b8" rx="3"/>
<!-- Ribcage texture -->
<line x1="20" y1="40" x2="40" y2="40" stroke="#6b7280" stroke-width="0.8" opacity="0.5"/>
<line x1="20" y1="45" x2="40" y2="45" stroke="#6b7280" stroke-width="0.8" opacity="0.5"/>
<line x1="20" y1="50" x2="40" y2="50" stroke="#6b7280" stroke-width="0.8" opacity="0.5"/>
<!-- Arms - clawed -->
<path d="M 16,36 Q 4,46 6,58" stroke="#9ca3b8" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 44,36 Q 56,46 54,58" stroke="#9ca3b8" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Claws -->
<path d="M 4,56 L 1,62 M 6,58 L 3,64 M 8,57 L 6,63" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
<path d="M 52,56 L 55,62 M 54,58 L 57,64 M 56,57 L 58,63" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
<!-- Flower head - opening petals -->
<circle cx="30" cy="22" r="12" fill="#7c6f64"/>
<path d="M 30,10 L 26,18 L 34,18 Z" fill="#dc2626"/>
<path d="M 20,16 L 24,22 L 22,14 Z" fill="#b91c1c"/>
<path d="M 40,16 L 36,22 L 38,14 Z" fill="#b91c1c"/>
<path d="M 22,26 L 26,22 L 20,28 Z" fill="#991b1b"/>
<path d="M 38,26 L 34,22 L 40,28 Z" fill="#991b1b"/>
<!-- Inner mouth -->
<circle cx="30" cy="22" r="5" fill="#450a0a"/>
<!-- Teeth -->
<path d="M 26,19 L 28,22 L 25,22 Z" fill="#f5f5f4"/>
<path d="M 34,19 L 32,22 L 35,22 Z" fill="#f5f5f4"/>
<path d="M 27,25 L 29,22 L 26,22 Z" fill="#f5f5f4"/>
<path d="M 33,25 L 31,22 L 34,22 Z" fill="#f5f5f4"/>
</svg>`,

tw_demodog: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="85" rx="16" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Back legs -->
<rect x="38" y="68" width="6" height="14" fill="#78716c" rx="1"/>
<rect x="44" y="68" width="6" height="14" fill="#78716c" rx="1"/>
<!-- Front legs -->
<rect x="10" y="68" width="6" height="14" fill="#78716c" rx="1"/>
<rect x="16" y="68" width="6" height="14" fill="#78716c" rx="1"/>
<!-- Body - horizontal beast -->
<ellipse cx="30" cy="62" rx="22" ry="10" fill="#8b8178"/>
<!-- Spine ridge -->
<path d="M 10,54 Q 20,50 30,52 Q 40,50 50,54" fill="none" stroke="#57534e" stroke-width="2"/>
<!-- Tail -->
<path d="M 50,60 Q 58,55 56,48" stroke="#78716c" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Neck -->
<rect x="6" y="52" width="12" height="14" fill="#8b8178" rx="2"/>
<!-- Head - flower face -->
<circle cx="10" cy="46" r="10" fill="#78716c"/>
<!-- Flower petals opening -->
<path d="M 10,36 L 7,42 L 13,42 Z" fill="#dc2626"/>
<path d="M 2,40 L 6,44 L 3,38 Z" fill="#b91c1c"/>
<path d="M 18,40 L 14,44 L 17,38 Z" fill="#b91c1c"/>
<path d="M 4,50 L 7,46 L 2,48 Z" fill="#991b1b"/>
<path d="M 16,50 L 13,46 L 18,48 Z" fill="#991b1b"/>
<!-- Inner mouth -->
<circle cx="10" cy="46" r="4" fill="#450a0a"/>
<!-- Teeth ring -->
<circle cx="8" cy="44" r="1" fill="#f5f5f4"/>
<circle cx="12" cy="44" r="1" fill="#f5f5f4"/>
<circle cx="8" cy="48" r="1" fill="#f5f5f4"/>
<circle cx="12" cy="48" r="1" fill="#f5f5f4"/>
<!-- Claws on feet -->
<path d="M 9,82 L 7,86 M 13,82 L 11,86 M 17,82 L 15,86" stroke="#57534e" stroke-width="1" stroke-linecap="round"/>
<path d="M 37,82 L 35,86 M 41,82 L 39,86 M 45,82 L 43,86" stroke="#57534e" stroke-width="1" stroke-linecap="round"/>
</svg>`,

tw_upside_down_vine: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Base root cluster -->
<ellipse cx="30" cy="78" rx="12" ry="6" fill="#3f3f46"/>
<!-- Main vine stalk -->
<path d="M 30,78 Q 28,60 30,40 Q 32,25 28,10" stroke="#52525b" stroke-width="8" fill="none" stroke-linecap="round"/>
<!-- Secondary tendrils -->
<path d="M 26,55 Q 14,48 8,52" stroke="#52525b" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 34,50 Q 46,42 54,46" stroke="#52525b" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 28,35 Q 18,28 12,32" stroke="#52525b" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M 32,30 Q 42,22 48,26" stroke="#52525b" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- Spore puffs -->
<circle cx="8" cy="52" r="3" fill="#a855f7" opacity="0.4" class="animate-pulse"/>
<circle cx="54" cy="46" r="3" fill="#a855f7" opacity="0.3" class="animate-pulse"/>
<circle cx="12" cy="32" r="2" fill="#7c3aed" opacity="0.35" class="animate-pulse"/>
<!-- Bioluminescent spots -->
<circle cx="28" cy="50" r="1.5" fill="#c084fc" opacity="0.6"/>
<circle cx="32" cy="40" r="1.5" fill="#c084fc" opacity="0.5"/>
<circle cx="26" cy="25" r="1.5" fill="#c084fc" opacity="0.7"/>
<circle cx="30" cy="65" r="1.5" fill="#c084fc" opacity="0.5"/>
<!-- Flower bud at top -->
<circle cx="28" cy="10" r="5" fill="#581c87"/>
<path d="M 28,5 L 26,9 L 30,9 Z" fill="#dc2626"/>
<path d="M 23,8 L 25,11 L 24,7 Z" fill="#b91c1c"/>
<path d="M 33,8 L 31,11 L 32,7 Z" fill="#b91c1c"/>
<!-- Dark mist around base -->
<ellipse cx="30" cy="80" rx="16" ry="4" fill="#18181b" opacity="0.3"/>
</svg>`,

// ───────── WALKING DEAD ENEMIES ─────────

tw_shambler_zombie: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Feet - torn shoes -->
<rect x="20" y="76" width="8" height="8" fill="#44403c" rx="1"/>
<rect x="32" y="76" width="8" height="8" fill="#44403c" rx="1"/>
<!-- Legs - torn pants -->
<rect x="21" y="56" width="7" height="22" fill="#365314"/>
<rect x="33" y="56" width="7" height="22" fill="#365314"/>
<!-- Tears in pants -->
<path d="M 24,65 L 28,68 L 24,70" fill="#1a2e05" opacity="0.5"/>
<path d="M 37,62 L 40,64 L 36,67" fill="#1a2e05" opacity="0.5"/>
<!-- Body - torn shirt -->
<rect x="16" y="26" width="28" height="32" fill="#57534e" rx="2"/>
<!-- Exposed ribs on side -->
<path d="M 16,35 L 20,36" stroke="#d6d3d1" stroke-width="1.5"/>
<path d="M 16,38 L 20,39" stroke="#d6d3d1" stroke-width="1.5"/>
<path d="M 16,41 L 20,42" stroke="#d6d3d1" stroke-width="1.5"/>
<!-- Blood stains -->
<circle cx="35" cy="38" r="4" fill="#7f1d1d" opacity="0.6"/>
<circle cx="24" cy="48" r="3" fill="#7f1d1d" opacity="0.5"/>
<!-- Arms - one hanging limp -->
<path d="M 16,30 Q 6,42 10,56" stroke="#a8a29e" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,30 Q 52,50 50,58" stroke="#a8a29e" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Bony fingers -->
<path d="M 8,55 L 5,60 M 10,56 L 8,62 M 12,55 L 11,60" stroke="#a8a29e" stroke-width="1" stroke-linecap="round"/>
<!-- Head - decayed -->
<rect x="20" y="6" width="18" height="20" fill="#a8a29e" rx="3"/>
<!-- Missing chunk from skull -->
<path d="M 36,8 Q 40,12 38,16" fill="#7f1d1d"/>
<!-- Sunken eyes -->
<circle cx="26" cy="14" r="2.5" fill="#1c1917"/>
<circle cx="34" cy="14" r="2.5" fill="#1c1917"/>
<!-- Glowing zombie eyes -->
<circle cx="26" cy="14" r="1" fill="#fbbf24" opacity="0.6"/>
<circle cx="34" cy="14" r="1" fill="#fbbf24" opacity="0.6"/>
<!-- Broken jaw -->
<path d="M 23,20 Q 28,24 32,22 Q 36,20 37,21" fill="none" stroke="#44403c" stroke-width="1.5"/>
<!-- Missing hair patches -->
<path d="M 20,8 Q 24,2 32,4 Q 36,2 38,6" fill="#44403c"/>
</svg>`,

tw_crawler_zombie: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="85" rx="18" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Blood trail -->
<ellipse cx="42" cy="82" rx="6" ry="2" fill="#7f1d1d" opacity="0.4"/>
<ellipse cx="50" cy="80" rx="4" ry="1.5" fill="#7f1d1d" opacity="0.3"/>
<!-- Torn body - half torso dragging -->
<ellipse cx="28" cy="72" rx="14" ry="8" fill="#a8a29e"/>
<!-- Exposed spine at back -->
<path d="M 38,68 L 42,66 L 44,68 L 46,66 L 48,70" stroke="#d6d3d1" stroke-width="1.5" fill="none"/>
<!-- Guts trailing -->
<path d="M 40,74 Q 46,78 52,76" stroke="#991b1b" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
<!-- Arms reaching forward -->
<path d="M 16,68 Q 6,62 2,54" stroke="#a8a29e" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 22,66 Q 14,58 8,50" stroke="#a8a29e" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Clawing fingers -->
<path d="M 0,52 L -2,48 M 2,54 L 0,50 M 4,53 L 3,49" stroke="#a8a29e" stroke-width="1" stroke-linecap="round"/>
<path d="M 6,48 L 3,44 M 8,50 L 6,46 M 10,49 L 9,45" stroke="#a8a29e" stroke-width="1" stroke-linecap="round"/>
<!-- Torn clothing -->
<rect x="18" y="66" width="16" height="10" fill="#57534e" rx="1" opacity="0.7"/>
<!-- Head - face down, looking up -->
<ellipse cx="16" cy="58" rx="9" ry="7" fill="#a8a29e"/>
<!-- Eyes - glowing hunger -->
<circle cx="12" cy="56" r="2" fill="#1c1917"/>
<circle cx="20" cy="56" r="2" fill="#1c1917"/>
<circle cx="12" cy="56" r="1" fill="#fbbf24" opacity="0.7"/>
<circle cx="20" cy="56" r="1" fill="#fbbf24" opacity="0.7"/>
<!-- Open mouth snarling -->
<path d="M 11,61 Q 16,64 21,61" fill="#450a0a"/>
<path d="M 13,61 L 14,63 M 16,61 L 16,64 M 19,61 L 18,63" stroke="#f5f5f4" stroke-width="0.8"/>
</svg>`,

tw_armored_walker: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Boots - tactical -->
<rect x="20" y="74" width="8" height="10" fill="#1c1917" rx="1"/>
<rect x="32" y="74" width="8" height="10" fill="#1c1917" rx="1"/>
<!-- Legs - tactical pants -->
<rect x="21" y="56" width="7" height="20" fill="#292524"/>
<rect x="33" y="56" width="7" height="20" fill="#292524"/>
<!-- Knee pads -->
<rect x="22" y="62" width="5" height="4" fill="#44403c" rx="1"/>
<rect x="34" y="62" width="5" height="4" fill="#44403c" rx="1"/>
<!-- Body - riot vest -->
<rect x="14" y="24" width="32" height="34" fill="#1c1917" rx="3"/>
<!-- Chest armor plate -->
<rect x="18" y="28" width="24" height="16" fill="#334155" rx="2"/>
<text x="30" y="38" text-anchor="middle" font-size="6" fill="#64748b" font-weight="bold">SWAT</text>
<!-- Blood on armor -->
<circle cx="38" cy="32" r="3" fill="#7f1d1d" opacity="0.5"/>
<!-- Belt with gear -->
<rect x="14" y="54" width="32" height="4" fill="#44403c"/>
<!-- Arms - armored -->
<path d="M 14,28 Q 4,40 8,52" stroke="#1c1917" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 56,40 52,52" stroke="#1c1917" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Shoulder pads -->
<rect x="8" y="24" width="10" height="6" fill="#334155" rx="2"/>
<rect x="42" y="24" width="10" height="6" fill="#334155" rx="2"/>
<!-- Baton in hand -->
<rect x="50" y="42" width="4" height="18" fill="#57534e" rx="1"/>
<!-- Helmet - riot gear -->
<rect x="18" y="4" width="24" height="20" fill="#1c1917" rx="4"/>
<!-- Visor -->
<rect x="20" y="10" width="20" height="8" fill="#1e3a5f" rx="2" opacity="0.8"/>
<!-- Cracked visor -->
<path d="M 28,10 L 32,14 L 26,18" stroke="#94a3b8" stroke-width="0.5" fill="none" opacity="0.6"/>
<!-- Glowing eyes behind visor -->
<circle cx="26" cy="14" r="1.5" fill="#fbbf24" opacity="0.5"/>
<circle cx="34" cy="14" r="1.5" fill="#fbbf24" opacity="0.5"/>
<!-- Blood drip from helmet -->
<path d="M 40,24 L 42,30" stroke="#7f1d1d" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,

// ───────── SUPERNATURAL ENEMIES ─────────

tw_shadow_demon: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow pool -->
<ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.5)"/>
<!-- Dark smoke body - amorphous -->
<ellipse cx="30" cy="55" rx="18" ry="25" fill="#18181b" opacity="0.8"/>
<ellipse cx="30" cy="50" rx="15" ry="20" fill="#27272a" opacity="0.7"/>
<!-- Swirling smoke tendrils -->
<path d="M 14,40 Q 6,30 10,20" stroke="#27272a" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.6"/>
<path d="M 46,40 Q 54,28 48,18" stroke="#27272a" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.6"/>
<path d="M 20,70 Q 12,76 8,72" stroke="#18181b" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5"/>
<path d="M 40,70 Q 48,76 52,72" stroke="#18181b" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5"/>
<!-- Inner void -->
<ellipse cx="30" cy="45" rx="10" ry="12" fill="#09090b"/>
<!-- Eyes - burning yellow -->
<circle cx="24" cy="38" r="3" fill="#fbbf24" opacity="0.9">
    <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite"/>
</circle>
<circle cx="36" cy="38" r="3" fill="#fbbf24" opacity="0.9">
    <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite"/>
</circle>
<!-- Pupil slits -->
<ellipse cx="24" cy="38" rx="1" ry="2.5" fill="#1c1917"/>
<ellipse cx="36" cy="38" rx="1" ry="2.5" fill="#1c1917"/>
<!-- Smoke particles -->
<circle cx="18" cy="30" r="2" fill="#3f3f46" opacity="0.4" class="animate-pulse"/>
<circle cx="42" cy="26" r="2.5" fill="#3f3f46" opacity="0.3" class="animate-pulse"/>
<circle cx="30" cy="20" r="2" fill="#3f3f46" opacity="0.35" class="animate-pulse"/>
<circle cx="14" cy="50" r="1.5" fill="#3f3f46" opacity="0.3" class="animate-pulse"/>
<circle cx="46" cy="48" r="1.5" fill="#3f3f46" opacity="0.3" class="animate-pulse"/>
<!-- Dark energy wisps -->
<path d="M 22,55 Q 18,48 22,42" stroke="#a855f7" stroke-width="0.8" fill="none" opacity="0.3"/>
<path d="M 38,55 Q 42,48 38,42" stroke="#a855f7" stroke-width="0.8" fill="none" opacity="0.3"/>
</svg>`,

tw_wendigo: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Feet - skeletal claws -->
<path d="M 20,82 L 18,86 M 23,82 L 21,86 M 26,82 L 25,86" stroke="#d6d3d1" stroke-width="1.5" stroke-linecap="round"/>
<path d="M 34,82 L 33,86 M 37,82 L 36,86 M 40,82 L 39,86" stroke="#d6d3d1" stroke-width="1.5" stroke-linecap="round"/>
<!-- Legs - skeletal thin -->
<rect x="22" y="60" width="5" height="22" fill="#d6d3d1" rx="1"/>
<rect x="34" y="60" width="5" height="22" fill="#d6d3d1" rx="1"/>
<!-- Knee joints -->
<circle cx="24" cy="66" r="3" fill="#a8a29e"/>
<circle cx="36" cy="66" r="3" fill="#a8a29e"/>
<!-- Body - emaciated torso -->
<rect x="18" y="28" width="24" height="34" fill="#e7e5e4" rx="3"/>
<!-- Visible ribs -->
<path d="M 20,34 Q 30,32 40,34" fill="none" stroke="#a8a29e" stroke-width="1.5"/>
<path d="M 20,38 Q 30,36 40,38" fill="none" stroke="#a8a29e" stroke-width="1.5"/>
<path d="M 20,42 Q 30,40 40,42" fill="none" stroke="#a8a29e" stroke-width="1.5"/>
<path d="M 20,46 Q 30,44 40,46" fill="none" stroke="#a8a29e" stroke-width="1.5"/>
<!-- Sunken stomach -->
<ellipse cx="30" cy="52" rx="6" ry="4" fill="#d6d3d1"/>
<!-- Arms - long and skeletal -->
<path d="M 18,32 Q 4,44 2,60" stroke="#d6d3d1" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 42,32 Q 56,44 58,60" stroke="#d6d3d1" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Long clawed fingers -->
<path d="M 0,59 L -4,66 M 2,60 L -1,68 M 4,60 L 2,67" stroke="#a8a29e" stroke-width="1.2" stroke-linecap="round"/>
<path d="M 56,59 L 60,66 M 58,60 L 61,68 M 60,60 L 62,67" stroke="#a8a29e" stroke-width="1.2" stroke-linecap="round"/>
<!-- Blood on hands -->
<circle cx="1" cy="60" r="2" fill="#7f1d1d" opacity="0.5"/>
<circle cx="59" cy="60" r="2" fill="#7f1d1d" opacity="0.5"/>
<!-- Head - deer skull -->
<path d="M 22,10 Q 30,4 38,10 L 38,28 L 22,28 Z" fill="#e7e5e4"/>
<!-- Antlers -->
<path d="M 22,12 L 16,4 L 12,0 M 16,4 L 14,8" stroke="#a8a29e" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M 38,12 L 44,4 L 48,0 M 44,4 L 46,8" stroke="#a8a29e" stroke-width="2" fill="none" stroke-linecap="round"/>
<!-- Eye sockets - deep black -->
<circle cx="26" cy="16" r="3" fill="#1c1917"/>
<circle cx="34" cy="16" r="3" fill="#1c1917"/>
<!-- Glowing red eyes -->
<circle cx="26" cy="16" r="1.5" fill="#ef4444" opacity="0.8" class="animate-pulse"/>
<circle cx="34" cy="16" r="1.5" fill="#ef4444" opacity="0.8" class="animate-pulse"/>
<!-- Nasal cavity -->
<path d="M 28,22 L 30,20 L 32,22" fill="#44403c"/>
<!-- Teeth -->
<path d="M 24,26 L 25,28 L 26,26 L 27,28 L 28,26 L 29,28 L 30,26 L 31,28 L 32,26 L 33,28 L 34,26 L 35,28 L 36,26" fill="none" stroke="#f5f5f4" stroke-width="1"/>
</svg>`,

tw_hellhound: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="85" rx="16" ry="3" fill="rgba(0,0,0,0.4)"/>
<!-- Fire glow underneath -->
<ellipse cx="30" cy="82" rx="14" ry="4" fill="#ef4444" opacity="0.15" class="animate-pulse"/>
<!-- Back legs -->
<rect x="40" y="68" width="5" height="14" fill="#1c1917" rx="1"/>
<rect x="46" y="68" width="5" height="14" fill="#1c1917" rx="1"/>
<!-- Front legs -->
<rect x="10" y="68" width="5" height="14" fill="#1c1917" rx="1"/>
<rect x="16" y="68" width="5" height="14" fill="#1c1917" rx="1"/>
<!-- Body - large black dog -->
<ellipse cx="30" cy="62" rx="22" ry="12" fill="#1c1917"/>
<!-- Fire emanating from body -->
<path d="M 20,52 Q 18,46 20,42" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.6" class="animate-pulse"/>
<path d="M 30,50 Q 28,44 30,38" stroke="#f59e0b" stroke-width="2" fill="none" opacity="0.5" class="animate-pulse"/>
<path d="M 40,52 Q 42,46 40,42" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.6" class="animate-pulse"/>
<!-- Ember particles -->
<circle cx="22" cy="44" r="1" fill="#fbbf24" opacity="0.7" class="animate-ping"/>
<circle cx="35" cy="40" r="1" fill="#f59e0b" opacity="0.6" class="animate-ping"/>
<circle cx="28" cy="48" r="0.8" fill="#ef4444" opacity="0.5" class="animate-ping"/>
<!-- Tail - flaming -->
<path d="M 50,58 Q 58,52 56,44" stroke="#1c1917" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 56,44 Q 54,38 56,34" stroke="#ef4444" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
<!-- Neck -->
<rect x="6" y="52" width="12" height="14" fill="#1c1917" rx="2"/>
<!-- Head -->
<ellipse cx="10" cy="48" rx="10" ry="8" fill="#1c1917"/>
<!-- Snout -->
<ellipse cx="4" cy="50" rx="5" ry="4" fill="#292524"/>
<!-- Fiery eyes -->
<circle cx="8" cy="44" r="2.5" fill="#ef4444">
    <animate attributeName="r" values="2.5;3;2.5" dur="1s" repeatCount="indefinite"/>
</circle>
<circle cx="14" cy="44" r="2.5" fill="#ef4444">
    <animate attributeName="r" values="2.5;3;2.5" dur="1s" repeatCount="indefinite"/>
</circle>
<circle cx="8" cy="44" r="1.2" fill="#fbbf24"/>
<circle cx="14" cy="44" r="1.2" fill="#fbbf24"/>
<!-- Open mouth with fangs -->
<path d="M 0,50 Q 4,55 8,52" fill="#450a0a"/>
<path d="M 2,50 L 3,53" stroke="#f5f5f4" stroke-width="1" stroke-linecap="round"/>
<path d="M 6,50 L 6,53" stroke="#f5f5f4" stroke-width="1" stroke-linecap="round"/>
<!-- Smoke from nostrils -->
<circle cx="0" cy="48" r="1.5" fill="#57534e" opacity="0.3" class="animate-pulse"/>
</svg>`,

// ───────── TOWER BOSSES ─────────

tw_boss_demogorgon: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="18" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Legs - thick and powerful -->
<rect x="18" y="66" width="9" height="18" fill="#78716c" rx="2"/>
<rect x="33" y="66" width="9" height="18" fill="#78716c" rx="2"/>
<!-- Heavy clawed feet -->
<path d="M 16,82 L 14,88 M 20,82 L 18,88 M 24,82 L 23,88 M 27,82 L 27,88" stroke="#57534e" stroke-width="1.5" stroke-linecap="round"/>
<path d="M 31,82 L 31,88 M 35,82 L 34,88 M 39,82 L 38,88 M 43,82 L 42,88" stroke="#57534e" stroke-width="1.5" stroke-linecap="round"/>
<!-- Body - massive torso -->
<rect x="12" y="28" width="36" height="40" fill="#8b8178" rx="4"/>
<!-- Ribcage texture -->
<path d="M 16,36 Q 30,33 44,36" fill="none" stroke="#6b7280" stroke-width="1"/>
<path d="M 16,40 Q 30,37 44,40" fill="none" stroke="#6b7280" stroke-width="1"/>
<path d="M 16,44 Q 30,41 44,44" fill="none" stroke="#6b7280" stroke-width="1"/>
<path d="M 16,48 Q 30,45 44,48" fill="none" stroke="#6b7280" stroke-width="1"/>
<!-- Arms - long and deadly -->
<path d="M 12,32 Q -2,46 -4,62" stroke="#8b8178" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M 48,32 Q 62,46 64,62" stroke="#8b8178" stroke-width="8" fill="none" stroke-linecap="round"/>
<!-- Massive claws -->
<path d="M -6,60 L -10,68 M -4,62 L -7,72 M -2,62 L -4,70 M 0,60 L -1,68" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
<path d="M 60,60 L 64,68 M 64,62 L 67,72 M 66,62 L 68,70 M 62,60 L 63,68" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
<!-- Neck -->
<rect x="22" y="18" width="16" height="12" fill="#8b8178" rx="2"/>
<!-- FLOWER HEAD - large and terrifying -->
<circle cx="30" cy="14" r="16" fill="#7c6f64"/>
<!-- Petals - blood red -->
<path d="M 30,0 L 24,10 L 36,10 Z" fill="#dc2626"/>
<path d="M 16,4 L 20,14 L 14,8 Z" fill="#b91c1c"/>
<path d="M 44,4 L 40,14 L 46,8 Z" fill="#b91c1c"/>
<path d="M 14,16 L 20,14 L 14,22 Z" fill="#991b1b"/>
<path d="M 46,16 L 40,14 L 46,22 Z" fill="#991b1b"/>
<path d="M 18,24 L 24,18 L 16,28 Z" fill="#881337"/>
<path d="M 42,24 L 36,18 L 44,28 Z" fill="#881337"/>
<!-- Inner mouth - gaping -->
<circle cx="30" cy="14" r="8" fill="#450a0a"/>
<!-- Rings of teeth -->
<circle cx="25" cy="10" r="1.5" fill="#f5f5f4"/>
<circle cx="30" cy="7" r="1.5" fill="#f5f5f4"/>
<circle cx="35" cy="10" r="1.5" fill="#f5f5f4"/>
<circle cx="24" cy="16" r="1.5" fill="#f5f5f4"/>
<circle cx="36" cy="16" r="1.5" fill="#f5f5f4"/>
<circle cx="27" cy="20" r="1.5" fill="#f5f5f4"/>
<circle cx="33" cy="20" r="1.5" fill="#f5f5f4"/>
<!-- Blood drip -->
<path d="M 28,22 L 28,28" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
<path d="M 32,22 L 33,26" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
</svg>`,

tw_boss_alpha_walker: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="16" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Boots -->
<rect x="20" y="74" width="8" height="10" fill="#292524" rx="1"/>
<rect x="32" y="74" width="8" height="10" fill="#292524" rx="1"/>
<!-- Legs -->
<rect x="21" y="56" width="7" height="20" fill="#1c1917"/>
<rect x="33" y="56" width="7" height="20" fill="#1c1917"/>
<!-- Body - leather jacket -->
<rect x="14" y="22" width="32" height="36" fill="#44403c" rx="3"/>
<!-- Zombie skin mask overlay -->
<rect x="16" y="24" width="28" height="12" fill="#78716c" opacity="0.3"/>
<!-- Belt with weapons -->
<rect x="14" y="54" width="32" height="4" fill="#292524"/>
<rect x="12" y="53" width="6" height="6" fill="#57534e" rx="1"/> <!-- knife sheath -->
<!-- Arms -->
<path d="M 14,26 Q 2,38 6,52" stroke="#44403c" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 58,38 54,52" stroke="#44403c" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Machete in right hand -->
<rect x="52" y="36" width="3" height="20" fill="#94a3b8" rx="0.5"/>
<rect x="51" y="52" width="5" height="6" fill="#78350f" rx="1"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="18" fill="#a8a29e" rx="3"/>
<!-- Zombie skin mask (stitched) -->
<rect x="20" y="4" width="20" height="18" fill="#78716c" rx="3" opacity="0.5"/>
<!-- Stitch lines on mask -->
<path d="M 24,6 L 24,20" stroke="#44403c" stroke-width="0.8" stroke-dasharray="2,2"/>
<path d="M 36,6 L 36,20" stroke="#44403c" stroke-width="0.8" stroke-dasharray="2,2"/>
<path d="M 20,12 L 40,12" stroke="#44403c" stroke-width="0.8" stroke-dasharray="2,2"/>
<!-- Eyes - cold and calculating -->
<circle cx="26" cy="10" r="2" fill="#1c1917"/>
<circle cx="34" cy="10" r="2" fill="#1c1917"/>
<circle cx="26" cy="10" r="1" fill="#60a5fa"/>
<circle cx="34" cy="10" r="1" fill="#60a5fa"/>
<!-- Grim mouth -->
<path d="M 25,16 L 35,16" stroke="#1c1917" stroke-width="1.5"/>
<!-- Crown of zombie ears/trophies on belt -->
<circle cx="20" cy="55" r="2" fill="#a8a29e" opacity="0.6"/>
<circle cx="24" cy="56" r="2" fill="#a8a29e" opacity="0.5"/>
</svg>`,

tw_boss_yellow_eyes: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="16" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Dark energy aura -->
<ellipse cx="30" cy="50" rx="28" ry="35" fill="#18181b" opacity="0.2" class="animate-pulse"/>
<!-- Shoes -->
<rect x="22" y="76" width="6" height="8" fill="#1c1917" rx="1"/>
<rect x="32" y="76" width="6" height="8" fill="#1c1917" rx="1"/>
<!-- Legs - suit pants -->
<rect x="23" y="56" width="5" height="22" fill="#1c1917"/>
<rect x="33" y="56" width="5" height="22" fill="#1c1917"/>
<!-- Body - black suit -->
<rect x="16" y="22" width="28" height="36" fill="#1c1917" rx="3"/>
<!-- Suit lapels -->
<path d="M 24,22 L 20,30 L 24,34" fill="#292524"/>
<path d="M 36,22 L 40,30 L 36,34" fill="#292524"/>
<!-- White shirt collar -->
<path d="M 24,22 L 30,26 L 36,22" fill="#f5f5f4"/>
<!-- Black tie -->
<path d="M 30,26 L 28,44 L 30,46 L 32,44 Z" fill="#292524"/>
<!-- Arms -->
<path d="M 16,26 Q 4,38 8,52" stroke="#1c1917" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 44,26 Q 56,38 52,52" stroke="#1c1917" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Hands with dark energy -->
<circle cx="8" cy="52" r="3" fill="#fbbf24" opacity="0.3" class="animate-pulse"/>
<circle cx="52" cy="52" r="3" fill="#fbbf24" opacity="0.3" class="animate-pulse"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="18" fill="#d6d3d1" rx="4"/>
<!-- Hair - dark and neat -->
<path d="M 18,8 Q 22,0 30,2 Q 38,0 42,8" fill="#1c1917"/>
<!-- YELLOW EYES - signature -->
<circle cx="26" cy="12" r="3" fill="#fbbf24">
    <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
</circle>
<circle cx="34" cy="12" r="3" fill="#fbbf24">
    <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
</circle>
<circle cx="26" cy="12" r="1.5" fill="#1c1917"/>
<circle cx="34" cy="12" r="1.5" fill="#1c1917"/>
<!-- Sinister smile -->
<path d="M 24,17 Q 30,21 36,17" fill="none" stroke="#1c1917" stroke-width="1.5"/>
</svg>`,

tw_boss_mind_flayer: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="20" ry="5" fill="rgba(0,0,0,0.5)"/>
<!-- Storm cloud base -->
<ellipse cx="30" cy="75" rx="24" ry="8" fill="#1c1917" opacity="0.7"/>
<!-- Massive shadow body -->
<path d="M 6,75 Q 2,50 10,30 Q 20,10 30,6 Q 40,10 50,30 Q 58,50 54,75 Z" fill="#1c1917" opacity="0.85"/>
<path d="M 10,75 Q 8,55 14,35 Q 22,18 30,14 Q 38,18 46,35 Q 52,55 50,75 Z" fill="#27272a" opacity="0.7"/>
<!-- Tentacle legs -->
<path d="M 14,70 Q 6,78 2,86" stroke="#1c1917" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 22,72 Q 16,80 12,88" stroke="#1c1917" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 38,72 Q 44,80 48,88" stroke="#1c1917" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 46,70 Q 54,78 58,86" stroke="#1c1917" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Arm tendrils -->
<path d="M 10,40 Q -2,44 -6,38" stroke="#27272a" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 50,40 Q 62,44 66,38" stroke="#27272a" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Red lightning inside -->
<path d="M 24,30 L 28,40 L 22,45 L 28,55" stroke="#ef4444" stroke-width="1" fill="none" opacity="0.5">
    <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite"/>
</path>
<path d="M 36,28 L 32,38 L 38,42 L 32,52" stroke="#ef4444" stroke-width="1" fill="none" opacity="0.3">
    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite"/>
</path>
<!-- Eyes - multiple glowing red -->
<circle cx="22" cy="28" r="3" fill="#ef4444" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite"/>
</circle>
<circle cx="38" cy="28" r="3" fill="#ef4444" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite"/>
</circle>
<circle cx="30" cy="22" r="2" fill="#ef4444" opacity="0.5">
    <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.5s" repeatCount="indefinite"/>
</circle>
</svg>`,

tw_boss_negan: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="16" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Boots -->
<rect x="20" y="74" width="8" height="10" fill="#1c1917" rx="1"/>
<rect x="32" y="74" width="8" height="10" fill="#1c1917" rx="1"/>
<!-- Legs - jeans -->
<rect x="21" y="56" width="7" height="20" fill="#1e3a5f"/>
<rect x="33" y="56" width="7" height="20" fill="#1e3a5f"/>
<!-- Body - leather jacket -->
<rect x="14" y="22" width="32" height="36" fill="#292524" rx="3"/>
<!-- Jacket zipper -->
<line x1="30" y1="22" x2="30" y2="56" stroke="#94a3b8" stroke-width="1"/>
<!-- White t-shirt showing -->
<rect x="22" y="22" width="16" height="8" fill="#e7e5e4" rx="1"/>
<!-- Belt -->
<rect x="14" y="54" width="32" height="4" fill="#44403c"/>
<rect x="28" y="53" width="6" height="6" fill="#94a3b8" rx="1"/> <!-- buckle -->
<!-- Arms -->
<path d="M 14,26 Q 2,38 6,52" stroke="#292524" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 56,34 54,42" stroke="#292524" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- THE BAT (Lucille) - barbed wire bat -->
<line x1="54" y1="42" x2="54" y2="4" stroke="#78350f" stroke-width="3.5"/>
<!-- Barbed wire wrapping -->
<path d="M 52,10 L 56,14 L 52,18 L 56,22 L 52,26 L 56,30" stroke="#94a3b8" stroke-width="1" fill="none"/>
<!-- Blood on bat -->
<circle cx="54" cy="8" r="2" fill="#7f1d1d" opacity="0.7"/>
<circle cx="53" cy="16" r="1.5" fill="#7f1d1d" opacity="0.5"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="18" fill="#d6d3d1" rx="4"/>
<!-- Slicked back hair -->
<path d="M 18,8 Q 22,2 30,3 Q 38,2 42,8 L 42,4 L 18,4 Z" fill="#1c1917"/>
<!-- Stubble beard -->
<rect x="22" y="16" width="16" height="4" fill="#44403c" rx="2" opacity="0.3"/>
<!-- Eyes - confident and cruel -->
<circle cx="26" cy="12" r="2" fill="#1c1917"/>
<circle cx="34" cy="12" r="2" fill="#1c1917"/>
<circle cx="26" cy="11.5" r="0.8" fill="#f5f5f4"/>
<circle cx="34" cy="11.5" r="0.8" fill="#f5f5f4"/>
<!-- Smirk -->
<path d="M 25,17 Q 30,20 35,17" fill="none" stroke="#1c1917" stroke-width="1.5"/>
</svg>`,

tw_boss_leviathan: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="18" ry="5" fill="rgba(0,0,0,0.5)"/>
<!-- Shoes -->
<rect x="22" y="76" width="6" height="8" fill="#1c1917" rx="1"/>
<rect x="32" y="76" width="6" height="8" fill="#1c1917" rx="1"/>
<!-- Legs -->
<rect x="23" y="56" width="5" height="22" fill="#1c1917"/>
<rect x="33" y="56" width="5" height="22" fill="#1c1917"/>
<!-- Body - suit (shifting to monster) -->
<rect x="14" y="22" width="32" height="36" fill="#1c1917" rx="3"/>
<!-- Black ooze spreading -->
<ellipse cx="24" cy="36" rx="6" ry="8" fill="#09090b" opacity="0.7"/>
<ellipse cx="38" cy="42" rx="5" ry="6" fill="#09090b" opacity="0.6"/>
<!-- Arms -->
<path d="M 14,26 Q 2,38 6,52" stroke="#1c1917" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 58,38 54,52" stroke="#1c1917" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Head - splitting open -->
<rect x="20" y="4" width="20" height="18" fill="#d6d3d1" rx="4"/>
<!-- Hair -->
<path d="M 18,8 Q 22,2 30,3 Q 38,2 42,8" fill="#1c1917"/>
<!-- Face splitting open to reveal maw -->
<path d="M 22,12 Q 30,8 38,12 L 38,20 Q 30,24 22,20 Z" fill="#09090b"/>
<!-- Giant mouth with rows of teeth -->
<path d="M 24,13 L 25,16 L 26,13 L 27,16 L 28,13 L 29,16 L 30,13 L 31,16 L 32,13 L 33,16 L 34,13 L 35,16 L 36,13" fill="none" stroke="#f5f5f4" stroke-width="1"/>
<path d="M 24,18 L 25,15 L 26,18 L 27,15 L 28,18 L 29,15 L 30,18 L 31,15 L 32,18 L 33,15 L 34,18 L 35,15 L 36,18" fill="none" stroke="#f5f5f4" stroke-width="1"/>
<!-- Black ooze dripping -->
<path d="M 26,20 L 26,26" stroke="#09090b" stroke-width="2" stroke-linecap="round"/>
<path d="M 34,20 L 35,28" stroke="#09090b" stroke-width="2" stroke-linecap="round"/>
<path d="M 30,22 L 30,30" stroke="#09090b" stroke-width="2.5" stroke-linecap="round"/>
<!-- Eyes on sides - human eyes still visible -->
<circle cx="22" cy="10" r="1.5" fill="#1c1917"/>
<circle cx="38" cy="10" r="1.5" fill="#1c1917"/>
</svg>`,

tw_boss_vecna: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="18" ry="5" fill="rgba(0,0,0,0.5)"/>
<!-- Dark energy ground -->
<ellipse cx="30" cy="84" rx="20" ry="6" fill="#7c3aed" opacity="0.1" class="animate-pulse"/>
<!-- Feet -->
<rect x="20" y="76" width="8" height="8" fill="#57534e" rx="1"/>
<rect x="32" y="76" width="8" height="8" fill="#57534e" rx="1"/>
<!-- Legs -->
<rect x="22" y="58" width="6" height="20" fill="#57534e"/>
<rect x="33" y="58" width="6" height="20" fill="#57534e"/>
<!-- Body - decayed robes -->
<path d="M 10,24 L 14,78 L 46,78 L 50,24 Z" fill="#3f3f46" opacity="0.8"/>
<rect x="14" y="24" width="32" height="36" fill="#44403c" rx="3"/>
<!-- Vine/tendril patterns on body -->
<path d="M 18,30 Q 22,40 18,50" stroke="#991b1b" stroke-width="1.5" fill="none" opacity="0.5"/>
<path d="M 42,30 Q 38,40 42,50" stroke="#991b1b" stroke-width="1.5" fill="none" opacity="0.5"/>
<path d="M 26,28 Q 30,38 26,48" stroke="#991b1b" stroke-width="1" fill="none" opacity="0.4"/>
<!-- Arms - long with tendrils -->
<path d="M 14,28 Q 0,40 -4,56" stroke="#57534e" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 60,40 64,56" stroke="#57534e" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Tentacle fingers -->
<path d="M -6,54 Q -10,60 -8,66" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M -4,56 Q -6,64 -2,70" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M -2,56 Q 0,64 2,68" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M 62,54 Q 66,60 64,66" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M 64,56 Q 66,64 62,70" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round"/>
<!-- Head - flayed and monstrous -->
<rect x="18" y="2" width="24" height="22" fill="#78716c" rx="4"/>
<!-- No nose - just holes -->
<circle cx="28" cy="14" r="1" fill="#1c1917"/>
<circle cx="32" cy="14" r="1" fill="#1c1917"/>
<!-- Eyes - deep set, glowing -->
<rect x="22" y="8" width="6" height="4" fill="#1c1917" rx="1"/>
<rect x="32" y="8" width="6" height="4" fill="#1c1917" rx="1"/>
<circle cx="25" cy="10" r="1.5" fill="#ef4444" class="animate-pulse"/>
<circle cx="35" cy="10" r="1.5" fill="#ef4444" class="animate-pulse"/>
<!-- Tendrils from head -->
<path d="M 20,6 Q 14,0 10,4" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M 40,6 Q 46,0 50,4" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M 22,22 Q 18,28 16,26" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M 38,22 Q 42,28 44,26" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round"/>
<!-- Mouth - grim line -->
<path d="M 24,18 L 36,18" stroke="#1c1917" stroke-width="1.5"/>
</svg>`,

tw_boss_death: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="18" ry="5" fill="rgba(0,0,0,0.5)"/>
<!-- Robe bottom - flowing -->
<path d="M 8,40 L 4,86 Q 30,90 56,86 L 52,40 Z" fill="#1c1917"/>
<path d="M 10,40 L 6,86 Q 30,88 54,86 L 50,40 Z" fill="#292524"/>
<!-- Body -->
<rect x="16" y="22" width="28" height="30" fill="#292524" rx="3"/>
<!-- Pale bone hands -->
<path d="M 16,26 Q 2,36 4,48" stroke="#292524" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 44,26 Q 58,36 56,48" stroke="#292524" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Skeletal fingers -->
<path d="M 2,47 L -1,52 M 4,48 L 2,54 M 6,48 L 5,53" stroke="#e7e5e4" stroke-width="1.2" stroke-linecap="round"/>
<!-- SCYTHE -->
<line x1="56" y1="48" x2="56" y2="2" stroke="#78716c" stroke-width="2.5"/>
<!-- Scythe blade -->
<path d="M 56,2 Q 42,-2 36,8" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>
<path d="M 56,2 Q 44,0 38,6" fill="#cbd5e1"/>
<!-- Hood -->
<path d="M 14,8 Q 30,-4 46,8 L 46,28 Q 30,32 14,28 Z" fill="#1c1917"/>
<!-- Deep darkness in hood -->
<ellipse cx="30" cy="18" rx="10" ry="8" fill="#09090b"/>
<!-- Skull face barely visible -->
<circle cx="26" cy="16" r="2.5" fill="#e7e5e4" opacity="0.2"/>
<circle cx="34" cy="16" r="2.5" fill="#e7e5e4" opacity="0.2"/>
<!-- Glowing white eyes -->
<circle cx="26" cy="16" r="1.5" fill="#f5f5f4" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite"/>
</circle>
<circle cx="34" cy="16" r="1.5" fill="#f5f5f4" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite"/>
</circle>
<!-- Pale aura -->
<ellipse cx="30" cy="45" rx="26" ry="35" fill="#f5f5f4" opacity="0.03" class="animate-pulse"/>
</svg>`,

tw_boss_horde_king: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="18" ry="5" fill="rgba(0,0,0,0.5)"/>
<!-- Boots - military -->
<rect x="18" y="74" width="10" height="10" fill="#292524" rx="1"/>
<rect x="32" y="74" width="10" height="10" fill="#292524" rx="1"/>
<!-- Legs - massive -->
<rect x="19" y="54" width="9" height="22" fill="#365314"/>
<rect x="33" y="54" width="9" height="22" fill="#365314"/>
<!-- Body - massive undead -->
<rect x="10" y="20" width="40" height="36" fill="#78716c" rx="4"/>
<!-- Torn military jacket -->
<rect x="10" y="20" width="40" height="36" fill="#44403c" rx="4" opacity="0.7"/>
<!-- Medals and chains -->
<circle cx="20" cy="30" r="2" fill="#fbbf24"/>
<circle cx="24" cy="32" r="2" fill="#94a3b8"/>
<circle cx="18" cy="34" r="1.5" fill="#f59e0b"/>
<!-- Exposed chest -->
<path d="M 24,36 Q 30,34 36,36 L 36,48 Q 30,50 24,48 Z" fill="#a8a29e"/>
<!-- Ribs showing -->
<line x1="26" y1="38" x2="34" y2="38" stroke="#78716c" stroke-width="1"/>
<line x1="26" y1="41" x2="34" y2="41" stroke="#78716c" stroke-width="1"/>
<line x1="26" y1="44" x2="34" y2="44" stroke="#78716c" stroke-width="1"/>
<!-- Arms - huge -->
<path d="M 10,24 Q -4,38 -2,54" stroke="#78716c" stroke-width="9" fill="none" stroke-linecap="round"/>
<path d="M 50,24 Q 64,38 62,54" stroke="#78716c" stroke-width="9" fill="none" stroke-linecap="round"/>
<!-- Chain weapon in hand -->
<path d="M -4,54 Q -6,60 -8,66 Q -4,68 0,64 Q -2,70 -6,72" stroke="#94a3b8" stroke-width="2" fill="none"/>
<!-- Head - massive zombie king -->
<rect x="16" y="0" width="28" height="22" fill="#a8a29e" rx="4"/>
<!-- Crown - rusted metal -->
<path d="M 14,4 L 16,0 L 20,-4 L 24,0 L 28,-6 L 32,0 L 36,-4 L 40,0 L 44,4" fill="none" stroke="#b45309" stroke-width="2.5"/>
<path d="M 14,4 L 44,4" stroke="#b45309" stroke-width="2.5"/>
<!-- Decayed face -->
<circle cx="24" cy="10" r="3" fill="#1c1917"/>
<circle cx="36" cy="10" r="3" fill="#1c1917"/>
<!-- Burning eyes -->
<circle cx="24" cy="10" r="1.5" fill="#ef4444" class="animate-pulse"/>
<circle cx="36" cy="10" r="1.5" fill="#ef4444" class="animate-pulse"/>
<!-- Missing jaw piece -->
<path d="M 20,16 Q 24,20 30,20 Q 36,20 40,16" fill="#450a0a"/>
<path d="M 22,16 L 23,19 M 26,17 L 26,20 M 30,17 L 30,21 M 34,17 L 34,20 M 38,16 L 37,19" stroke="#e7e5e4" stroke-width="1"/>
</svg>`,

tw_boss_elevator: `<svg viewBox="0 0 60 90" class="w-full h-full">
<!-- Shadow -->
<ellipse cx="30" cy="86" rx="20" ry="5" fill="rgba(0,0,0,0.5)"/>
<!-- Main elevator body -->
<rect x="6" y="8" width="48" height="72" fill="#334155" rx="3" stroke="#475569" stroke-width="2"/>
<!-- Door frame -->
<rect x="10" y="14" width="40" height="58" fill="#1e293b" rx="1"/>
<!-- Left door (partially open) -->
<rect x="10" y="14" width="18" height="58" fill="#475569" stroke="#64748b" stroke-width="1"/>
<!-- Right door (partially open) -->
<rect x="32" y="14" width="18" height="58" fill="#475569" stroke="#64748b" stroke-width="1"/>
<!-- Gap between doors revealing darkness -->
<rect x="27" y="14" width="6" height="58" fill="#09090b"/>
<!-- Evil red eyes in the gap -->
<circle cx="30" cy="36" r="3" fill="#ef4444">
    <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/>
</circle>
<circle cx="30" cy="36" r="1.5" fill="#fca5a5"/>
<!-- Second set of eyes -->
<circle cx="28" cy="50" r="2" fill="#ef4444" opacity="0.5">
    <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite"/>
</circle>
<circle cx="32" cy="50" r="2" fill="#ef4444" opacity="0.5">
    <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite"/>
</circle>
<!-- Tentacles reaching out of gap -->
<path d="M 29,30 Q 22,28 18,22" stroke="#1c1917" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M 31,40 Q 38,38 44,34" stroke="#1c1917" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M 29,55 Q 20,58 14,54" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<!-- Floor indicator above doors -->
<rect x="20" y="2" width="20" height="10" fill="#0f172a" stroke="#475569" stroke-width="1" rx="2"/>
<text x="30" y="10" text-anchor="middle" font-size="7" fill="#ef4444" font-weight="bold" font-family="monospace">B666</text>
<!-- Warning light -->
<circle cx="8" cy="6" r="3" fill="#ef4444" class="animate-pulse"/>
<circle cx="52" cy="6" r="3" fill="#ef4444" class="animate-pulse"/>
<!-- Sparking wires -->
<path d="M 12,76 Q 14,80 10,82" stroke="#fbbf24" stroke-width="1" fill="none" opacity="0.7">
    <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite"/>
</path>
<path d="M 48,76 Q 46,80 50,82" stroke="#fbbf24" stroke-width="1" fill="none" opacity="0.5">
    <animate attributeName="opacity" values="0.5;0;0.5" dur="0.7s" repeatCount="indefinite"/>
</path>
<!-- Scratches on doors -->
<path d="M 14,20 L 16,30 L 13,34" stroke="#94a3b8" stroke-width="0.5" fill="none" opacity="0.3"/>
<path d="M 44,24 L 42,32 L 45,38" stroke="#94a3b8" stroke-width="0.5" fill="none" opacity="0.3"/>
<!-- "OUT OF ORDER" sign -->
<rect x="16" y="60" width="28" height="8" fill="#fbbf24" rx="1" transform="rotate(-8 30 64)"/>
<text x="30" y="66" text-anchor="middle" font-size="4" fill="#1c1917" font-weight="bold" transform="rotate(-8 30 64)">OUT OF ORDER</text>
</svg>`

};

// Merge tower enemy vectors into main vectors object
if (typeof vectors !== 'undefined') {
    Object.assign(vectors, towerEnemyVectors);
}
