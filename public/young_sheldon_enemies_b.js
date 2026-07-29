// Young Sheldon Enemies - Batch B
// Zombie Horde, Dinosaurs, Aliens, DC Villains, Bosses

const ysEnemyVectorsB = {

    // --- 1. Zombie Horde: 3 overlapping zombie figures, tattered clothes, green-gray skin ---
    ys_zombie_horde: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.3)"/>
        <!-- Zombie 3 (back left) -->
        <rect x="10" y="42" width="14" height="20" rx="2" fill="#5a6352" opacity="0.7"/>
        <rect x="10" y="44" width="14" height="8" fill="#4a5a3a" opacity="0.7"/>
        <circle cx="17" cy="36" r="7" fill="#7a8a6a" opacity="0.7"/>
        <circle cx="15" cy="35" r="1.5" fill="#cc3333" opacity="0.7"/>
        <circle cx="19" cy="35" r="1.5" fill="#cc3333" opacity="0.7"/>
        <path d="M14 39 Q17 42 20 39" stroke="#333" stroke-width="0.8" fill="none" opacity="0.7"/>
        <path d="M6 38 Q4 46 2 50" stroke="#7a8a6a" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>
        <!-- Zombie 2 (back right) -->
        <rect x="36" y="40" width="14" height="22" rx="2" fill="#5e6856"/>
        <rect x="36" y="42" width="14" height="8" fill="#4d5c3e"/>
        <rect x="36" y="56" width="5" height="2" fill="#8a7a5a"/>
        <circle cx="43" cy="34" r="7.5" fill="#7e8e6e"/>
        <circle cx="41" cy="33" r="1.5" fill="#cc3333"/>
        <circle cx="45" cy="33" r="1.5" fill="#222"/>
        <rect cx="45" cy="33" x="44" y="32" width="2.5" height="2.5" fill="#cc3333" opacity="0.5"/>
        <path d="M40 37 Q43 40 46 37" stroke="#333" stroke-width="0.8" fill="none"/>
        <path d="M50 36 Q54 30 56 26" stroke="#7e8e6e" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Zombie 1 (front center, main) -->
        <rect x="20" y="62" width="8" height="14" rx="1" fill="#4a5a3a"/>
        <rect x="32" y="62" width="8" height="14" rx="1" fill="#4a5a3a"/>
        <rect x="22" y="76" width="6" height="5" rx="1" fill="#3a3a2a"/>
        <rect x="34" y="76" width="6" height="5" rx="1" fill="#3a3a2a"/>
        <rect x="18" y="38" width="24" height="26" rx="3" fill="#556b4a"/>
        <rect x="18" y="42" width="24" height="10" fill="#4a5a3a"/>
        <rect x="20" y="50" width="3" height="1" fill="#8a7a5a"/>
        <rect x="30" y="45" width="4" height="1" fill="#8a7a5a"/>
        <circle cx="30" cy="30" r="9" fill="#7a8a6a"/>
        <circle cx="26" cy="28" r="2" fill="#cc3333"/>
        <circle cx="34" cy="28" r="2" fill="#cc3333"/>
        <ellipse cx="26" cy="28" rx="1" ry="1.2" fill="#440000"/>
        <ellipse cx="34" cy="28" rx="1" ry="1.2" fill="#440000"/>
        <path d="M27 34 Q30 37 33 34" stroke="#333" stroke-width="1" fill="none"/>
        <rect x="28" y="34" width="1.5" height="2" fill="#ddd"/>
        <rect x="31" y="34" width="1.5" height="2" fill="#ddd"/>
        <path d="M14 40 Q8 48 4 56" stroke="#7a8a6a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M42 38 Q50 32 54 24" stroke="#7a8a6a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <rect x="22" y="22" width="3" height="4" rx="1" fill="#5a6a4a" transform="rotate(-15 23 22)"/>
        <rect x="34" y="21" width="3" height="5" rx="1" fill="#5a6a4a" transform="rotate(10 35 21)"/>
    </svg>`,

    // --- 2. Museum T-Rex: Massive dinosaur, tiny arms, huge jaw ---
    ys_trex: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="87" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Dust particles -->
        <circle cx="8" cy="20" r="1" fill="#c8b89a" opacity="0.4" class="animate-pulse"/>
        <circle cx="52" cy="35" r="0.8" fill="#c8b89a" opacity="0.3" class="animate-pulse"/>
        <circle cx="15" cy="55" r="0.6" fill="#c8b89a" opacity="0.35"/>
        <!-- Tail -->
        <path d="M40 50 Q52 42 58 30" stroke="#6b7a3a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <!-- Legs -->
        <rect x="18" y="60" width="9" height="18" rx="2" fill="#5a6a2e"/>
        <rect x="33" y="60" width="9" height="18" rx="2" fill="#5a6a2e"/>
        <rect x="16" y="76" width="12" height="6" rx="2" fill="#4a5a22"/>
        <rect x="32" y="76" width="12" height="6" rx="2" fill="#4a5a22"/>
        <!-- Claws on feet -->
        <polygon points="14,82 16,78 18,82" fill="#ddd"/>
        <polygon points="20,82 22,78 24,82" fill="#ddd"/>
        <polygon points="30,82 32,78 34,82" fill="#ddd"/>
        <polygon points="36,82 38,78 40,82" fill="#ddd"/>
        <!-- Body -->
        <ellipse cx="30" cy="50" rx="16" ry="14" fill="#6b7a3a"/>
        <ellipse cx="30" cy="48" rx="14" ry="11" fill="#7a8a44"/>
        <!-- Belly -->
        <ellipse cx="30" cy="54" rx="10" ry="8" fill="#8a9a54"/>
        <!-- Tiny arms -->
        <path d="M18 46 Q14 50 12 48" stroke="#6b7a3a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M42 46 Q46 50 48 48" stroke="#6b7a3a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="12" cy="47" r="1.5" fill="#5a6a2e"/>
        <circle cx="48" cy="47" r="1.5" fill="#5a6a2e"/>
        <!-- Neck -->
        <rect x="24" y="30" width="12" height="14" rx="3" fill="#6b7a3a"/>
        <!-- Head -->
        <ellipse cx="30" cy="22" rx="14" ry="11" fill="#6b7a3a"/>
        <ellipse cx="30" cy="24" rx="12" ry="8" fill="#7a8a44"/>
        <!-- Jaw -->
        <path d="M18 26 Q30 38 42 26" fill="#5a6a2e"/>
        <!-- Teeth top -->
        <polygon points="18,24 20,28 22,24" fill="#f0f0e0"/>
        <polygon points="23,25 25,30 27,25" fill="#f0f0e0"/>
        <polygon points="28,26 30,31 32,26" fill="#f0f0e0"/>
        <polygon points="33,25 35,30 37,25" fill="#f0f0e0"/>
        <polygon points="38,24 40,28 42,24" fill="#f0f0e0"/>
        <!-- Teeth bottom -->
        <polygon points="20,30 22,26 24,30" fill="#e0e0d0"/>
        <polygon points="26,31 28,27 30,31" fill="#e0e0d0"/>
        <polygon points="32,31 34,27 36,31" fill="#e0e0d0"/>
        <polygon points="38,30 40,26 42,30" fill="#e0e0d0"/>
        <!-- Eyes -->
        <circle cx="24" cy="18" r="3" fill="#ffee44"/>
        <circle cx="36" cy="18" r="3" fill="#ffee44"/>
        <circle cx="24" cy="18" r="1.5" fill="#111"/>
        <circle cx="36" cy="18" r="1.5" fill="#111"/>
        <!-- Nostrils -->
        <circle cx="21" cy="22" r="1" fill="#4a5a22"/>
        <circle cx="26" cy="22" r="1" fill="#4a5a22"/>
        <!-- Scale details -->
        <circle cx="35" cy="44" r="1.5" fill="#5a6a2e" opacity="0.5"/>
        <circle cx="25" cy="52" r="1.5" fill="#5a6a2e" opacity="0.5"/>
        <circle cx="38" cy="54" r="1" fill="#5a6a2e" opacity="0.5"/>
    </svg>`,

    // --- 3. Velociraptor: Sleek, feathered, sickle claw ---
    ys_raptor: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Tail -->
        <path d="M38 50 Q50 40 56 28" stroke="#b8742a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M56 28 Q58 24 56 22" stroke="#8a5a1a" stroke-width="2" fill="none"/>
        <!-- Feather tufts on tail -->
        <path d="M50 34 L54 30 L52 36" fill="#c88430" opacity="0.7"/>
        <!-- Legs -->
        <rect x="18" y="58" width="7" height="16" rx="2" fill="#b8742a"/>
        <rect x="33" y="58" width="7" height="16" rx="2" fill="#b8742a"/>
        <!-- Sickle claws -->
        <path d="M16 74 Q14 80 18 82" stroke="#eee" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M31 74 Q29 80 33 82" stroke="#eee" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Feet -->
        <rect x="17" y="76" width="10" height="4" rx="1" fill="#9a6420"/>
        <rect x="32" y="76" width="10" height="4" rx="1" fill="#9a6420"/>
        <polygon points="15,80 17,76 19,80" fill="#ddd"/>
        <polygon points="30,80 32,76 34,80" fill="#ddd"/>
        <!-- Body -->
        <ellipse cx="28" cy="50" rx="12" ry="10" fill="#b8742a"/>
        <ellipse cx="28" cy="52" rx="9" ry="7" fill="#c88430"/>
        <!-- Arms with claws -->
        <path d="M18 44 Q10 40 6 34" stroke="#b8742a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M6 34 L3 30" stroke="#eee" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M6 34 L4 32" stroke="#eee" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M38 44 Q44 38 48 32" stroke="#b8742a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M48 32 L51 28" stroke="#eee" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M48 32 L50 30" stroke="#eee" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Neck -->
        <path d="M24 42 Q22 32 24 24" stroke="#b8742a" stroke-width="8" fill="none"/>
        <!-- Feathered crest -->
        <path d="M20 18 L18 10 L22 16" fill="#c88430"/>
        <path d="M24 16 L23 8 L26 14" fill="#d89440"/>
        <path d="M28 16 L28 10 L30 16" fill="#c88430"/>
        <!-- Head -->
        <ellipse cx="24" cy="22" rx="8" ry="6" fill="#b8742a"/>
        <!-- Snout -->
        <path d="M16 22 Q10 20 8 22 Q10 26 16 24" fill="#9a6420"/>
        <!-- Teeth -->
        <polygon points="10,22 11,24 12,22" fill="#eee"/>
        <polygon points="13,22 14,24 15,22" fill="#eee"/>
        <polygon points="10,24 11,22 12,24" fill="#eee"/>
        <!-- Eye -->
        <circle cx="22" cy="20" r="2.5" fill="#ffcc00"/>
        <circle cx="22" cy="20" r="1.2" fill="#111"/>
        <!-- Stripe pattern -->
        <rect x="22" y="44" width="12" height="1.5" rx="0.5" fill="#9a6420" opacity="0.5"/>
        <rect x="20" y="48" width="14" height="1.5" rx="0.5" fill="#9a6420" opacity="0.5"/>
        <rect x="22" y="52" width="10" height="1.5" rx="0.5" fill="#9a6420" opacity="0.5"/>
    </svg>`,

    // --- 4. Pterodactyl: Flying, wide wingspan, hovering ---
    ys_pterodactyl: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="8" ry="2" fill="rgba(0,0,0,0.15)"/>
        <!-- Left wing membrane -->
        <path d="M22 38 Q4 28 0 18 Q2 22 8 30 Q12 34 16 36 Q10 38 6 42 Q12 40 18 38 Z" fill="#8a6a3a" opacity="0.85"/>
        <path d="M22 38 Q4 28 0 18 Q2 22 8 30 Q12 34 16 36" fill="none" stroke="#6a5028" stroke-width="0.8"/>
        <!-- Right wing membrane -->
        <path d="M38 38 Q56 28 60 18 Q58 22 52 30 Q48 34 44 36 Q50 38 54 42 Q48 40 42 38 Z" fill="#8a6a3a" opacity="0.85"/>
        <path d="M38 38 Q56 28 60 18 Q58 22 52 30 Q48 34 44 36" fill="none" stroke="#6a5028" stroke-width="0.8"/>
        <!-- Wing fingers -->
        <line x1="0" y1="18" x2="6" y2="26" stroke="#7a5a2a" stroke-width="1"/>
        <line x1="60" y1="18" x2="54" y2="26" stroke="#7a5a2a" stroke-width="1"/>
        <!-- Body -->
        <ellipse cx="30" cy="44" rx="8" ry="10" fill="#9a7a44"/>
        <ellipse cx="30" cy="46" rx="6" ry="7" fill="#aa8a54"/>
        <!-- Legs (dangling) -->
        <path d="M26 52 Q24 62 22 68" stroke="#8a6a3a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M34 52 Q36 62 38 68" stroke="#8a6a3a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M22 68 L19 70 M22 68 L22 71 M22 68 L25 70" stroke="#6a5028" stroke-width="1" fill="none"/>
        <path d="M38 68 L35 70 M38 68 L38 71 M38 68 L41 70" stroke="#6a5028" stroke-width="1" fill="none"/>
        <!-- Neck -->
        <path d="M30 36 Q30 28 28 22" stroke="#9a7a44" stroke-width="6" fill="none"/>
        <!-- Head -->
        <ellipse cx="28" cy="20" rx="6" ry="5" fill="#9a7a44"/>
        <!-- Crest -->
        <path d="M32 16 Q38 8 40 4 Q36 12 34 18" fill="#c44a22"/>
        <!-- Beak -->
        <path d="M22 20 L12 18 L22 22 Z" fill="#cc9944"/>
        <!-- Teeth in beak -->
        <polygon points="14,19 15,20 16,19" fill="#eee"/>
        <polygon points="17,19 18,20.5 19,19" fill="#eee"/>
        <polygon points="16,21 17,20 18,21" fill="#eee"/>
        <!-- Eye -->
        <circle cx="26" cy="18" r="2" fill="#ffcc22"/>
        <circle cx="26" cy="18" r="1" fill="#111"/>
        <!-- Wing veins -->
        <line x1="18" y1="36" x2="8" y2="30" stroke="#7a5a2a" stroke-width="0.5" opacity="0.4"/>
        <line x1="20" y1="38" x2="10" y2="38" stroke="#7a5a2a" stroke-width="0.5" opacity="0.4"/>
        <line x1="42" y1="36" x2="52" y2="30" stroke="#7a5a2a" stroke-width="0.5" opacity="0.4"/>
        <line x1="40" y1="38" x2="50" y2="38" stroke="#7a5a2a" stroke-width="0.5" opacity="0.4"/>
    </svg>`,

    // --- 5. Alien Trooper: Gray alien with armor and plasma rifle ---
    ys_alien_trooper: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Legs -->
        <rect x="20" y="62" width="7" height="14" rx="2" fill="#5a6a5a"/>
        <rect x="33" y="62" width="7" height="14" rx="2" fill="#5a6a5a"/>
        <!-- Boots -->
        <rect x="18" y="74" width="10" height="6" rx="2" fill="#3a4a3a"/>
        <rect x="32" y="74" width="10" height="6" rx="2" fill="#3a4a3a"/>
        <!-- Body armor -->
        <rect x="16" y="38" width="28" height="26" rx="4" fill="#6a7a6a"/>
        <rect x="19" y="40" width="22" height="22" rx="3" fill="#7a8a7a"/>
        <!-- Chest plate -->
        <rect x="22" y="42" width="16" height="10" rx="2" fill="#8aaa8a"/>
        <circle cx="30" cy="47" r="2" fill="#44ff88" class="animate-pulse"/>
        <!-- Armor lines -->
        <line x1="22" y1="47" x2="38" y2="47" stroke="#5a7a5a" stroke-width="0.5"/>
        <line x1="30" y1="42" x2="30" y2="52" stroke="#5a7a5a" stroke-width="0.5"/>
        <!-- Plasma rifle (right arm) -->
        <path d="M44 44 Q50 44 54 40" stroke="#4a5a4a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <rect x="50" y="36" width="8" height="4" rx="1" fill="#3a4a3a"/>
        <rect x="56" y="37" width="3" height="2" rx="0.5" fill="#44ff88" class="animate-pulse"/>
        <!-- Left arm -->
        <path d="M16 44 Q10 50 8 56" stroke="#9aaa8a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="8" cy="56" r="2.5" fill="#9aaa8a"/>
        <!-- Neck -->
        <rect x="26" y="32" width="8" height="8" rx="2" fill="#9aaa8a"/>
        <!-- Head (large alien) -->
        <ellipse cx="30" cy="22" rx="12" ry="14" fill="#9aaa8a"/>
        <ellipse cx="30" cy="20" rx="11" ry="12" fill="#aabba8"/>
        <!-- Eyes (large black) -->
        <ellipse cx="24" cy="22" rx="4" ry="5" fill="#111"/>
        <ellipse cx="36" cy="22" rx="4" ry="5" fill="#111"/>
        <ellipse cx="24" cy="21" rx="1.5" ry="2" fill="#334433" opacity="0.4"/>
        <ellipse cx="36" cy="21" rx="1.5" ry="2" fill="#334433" opacity="0.4"/>
        <!-- Mouth (small slit) -->
        <line x1="27" y1="30" x2="33" y2="30" stroke="#6a7a6a" stroke-width="1"/>
        <!-- Nostrils -->
        <circle cx="28" cy="27" r="0.8" fill="#7a8a7a"/>
        <circle cx="32" cy="27" r="0.8" fill="#7a8a7a"/>
    </svg>`,

    // --- 6. UFO Drone: Small flying saucer with beam ---
    ys_ufo_drone: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="6" ry="2" fill="rgba(0,0,0,0.15)"/>
        <!-- Tractor beam -->
        <path d="M24 52 L18 82 L42 82 L36 52 Z" fill="url(#beam_grad)" opacity="0.3"/>
        <defs>
            <linearGradient id="beam_grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#44ff88"/>
                <stop offset="100%" stop-color="#44ff88" stop-opacity="0"/>
            </linearGradient>
        </defs>
        <!-- UFO body - bottom disc -->
        <ellipse cx="30" cy="46" rx="20" ry="6" fill="#8a9aaa"/>
        <ellipse cx="30" cy="44" rx="20" ry="5" fill="#aabbcc"/>
        <!-- Spinning lights -->
        <circle cx="14" cy="44" r="2" fill="#ff4444">
            <animate attributeName="opacity" values="1;0.2;1" dur="0.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="24" cy="42" r="2" fill="#44ff44">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="42" r="2" fill="#4444ff">
            <animate attributeName="opacity" values="1;0.2;1" dur="0.6s" repeatCount="indefinite" begin="0.2s"/>
        </circle>
        <circle cx="46" cy="44" r="2" fill="#ffff44">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" repeatCount="indefinite" begin="0.2s"/>
        </circle>
        <!-- Dome -->
        <ellipse cx="30" cy="40" rx="10" ry="3" fill="#aabbcc"/>
        <path d="M20 40 Q20 28 30 26 Q40 28 40 40" fill="#88ccee" opacity="0.6"/>
        <path d="M22 40 Q22 30 30 28 Q38 30 38 40" fill="#aaddff" opacity="0.3"/>
        <!-- Dome highlight -->
        <path d="M25 34 Q28 30 30 30" stroke="#fff" stroke-width="1" fill="none" opacity="0.5"/>
        <!-- Bottom emitter -->
        <circle cx="30" cy="48" r="3" fill="#44ff88" class="animate-pulse"/>
        <circle cx="30" cy="48" r="1.5" fill="#aaffcc"/>
        <!-- Green glow effect -->
        <ellipse cx="30" cy="48" rx="6" ry="2" fill="#44ff88" opacity="0.2" class="animate-pulse"/>
        <!-- Antenna -->
        <line x1="30" y1="26" x2="30" y2="20" stroke="#8a9aaa" stroke-width="1"/>
        <circle cx="30" cy="19" r="1.5" fill="#ff4444" class="animate-pulse"/>
    </svg>`,

    // --- 7. Bane: Huge muscular, luchador mask, tubes ---
    ys_dc_bane: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="87" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Legs (thick) -->
        <rect x="16" y="60" width="11" height="16" rx="3" fill="#3a3a3a"/>
        <rect x="33" y="60" width="11" height="16" rx="3" fill="#3a3a3a"/>
        <!-- Boots -->
        <rect x="14" y="74" width="14" height="7" rx="2" fill="#2a2a2a"/>
        <rect x="32" y="74" width="14" height="7" rx="2" fill="#2a2a2a"/>
        <!-- Body (massive) -->
        <rect x="12" y="34" width="36" height="28" rx="4" fill="#4a4a4a"/>
        <!-- Tank top -->
        <rect x="16" y="36" width="28" height="20" rx="2" fill="#2a2a2a"/>
        <path d="M20 36 Q30 42 40 36" fill="#4a4a4a"/>
        <!-- Belt -->
        <rect x="14" y="58" width="32" height="4" rx="1" fill="#5a4a2a"/>
        <rect x="27" y="57" width="6" height="6" rx="1" fill="#aa8a44"/>
        <!-- Chest muscles -->
        <path d="M22 42 Q26 46 30 42" stroke="#555" stroke-width="1" fill="none"/>
        <path d="M30 42 Q34 46 38 42" stroke="#555" stroke-width="1" fill="none"/>
        <!-- Arms (massive) -->
        <path d="M12 38 Q2 44 0 56" stroke="#6a5a4a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="0" cy="56" r="4" fill="#6a5a4a"/>
        <path d="M48 38 Q58 44 60 56" stroke="#6a5a4a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="60" cy="56" r="4" fill="#6a5a4a"/>
        <!-- Venom tubes (from back to head) -->
        <path d="M20 34 Q18 24 22 20" stroke="#5a8a3a" stroke-width="2" fill="none"/>
        <path d="M40 34 Q42 24 38 20" stroke="#5a8a3a" stroke-width="2" fill="none"/>
        <path d="M30 34 Q30 26 30 22" stroke="#5a8a3a" stroke-width="2" fill="none"/>
        <!-- Neck (thick) -->
        <rect x="22" y="26" width="16" height="10" rx="3" fill="#6a5a4a"/>
        <!-- Head -->
        <circle cx="30" cy="20" r="10" fill="#3a3a3a"/>
        <!-- Luchador mask -->
        <circle cx="30" cy="20" r="9" fill="#2a2a2a"/>
        <path d="M22 18 Q24 14 28 18" fill="#1a1a1a"/>
        <path d="M32 18 Q36 14 38 18" fill="#1a1a1a"/>
        <!-- Eyes through mask -->
        <ellipse cx="25" cy="18" rx="2.5" ry="2" fill="#fff"/>
        <ellipse cx="35" cy="18" rx="2.5" ry="2" fill="#fff"/>
        <circle cx="25" cy="18" r="1" fill="#111"/>
        <circle cx="35" cy="18" r="1" fill="#111"/>
        <!-- Mask mouth grille -->
        <rect x="25" y="23" width="10" height="5" rx="1" fill="#1a1a1a"/>
        <line x1="27" y1="23" x2="27" y2="28" stroke="#333" stroke-width="0.8"/>
        <line x1="30" y1="23" x2="30" y2="28" stroke="#333" stroke-width="0.8"/>
        <line x1="33" y1="23" x2="33" y2="28" stroke="#333" stroke-width="0.8"/>
        <!-- Tube connection on back of head -->
        <circle cx="30" cy="30" r="2" fill="#5a8a3a"/>
        <!-- Venom glow -->
        <circle cx="30" cy="30" r="3" fill="#5a8a3a" opacity="0.3" class="animate-pulse"/>
    </svg>`,

    // --- 8. Deathstroke: Half orange/half black mask, sword ---
    ys_dc_deathstroke: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="86" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Legs -->
        <rect x="20" y="62" width="8" height="14" rx="2" fill="#2a2a3a"/>
        <rect x="32" y="62" width="8" height="14" rx="2" fill="#2a2a3a"/>
        <!-- Boots -->
        <rect x="18" y="74" width="11" height="6" rx="2" fill="#1a1a2a"/>
        <rect x="31" y="74" width="11" height="6" rx="2" fill="#1a1a2a"/>
        <!-- Body armor -->
        <rect x="16" y="36" width="28" height="28" rx="3" fill="#2a2a3a"/>
        <!-- Chest armor plate -->
        <rect x="18" y="38" width="24" height="12" rx="2" fill="#333344"/>
        <!-- Orange armor accents -->
        <rect x="18" y="38" width="12" height="12" rx="2" fill="#cc6622" opacity="0.7"/>
        <line x1="30" y1="38" x2="30" y2="50" stroke="#444" stroke-width="0.8"/>
        <!-- Belt -->
        <rect x="16" y="56" width="28" height="4" rx="1" fill="#444"/>
        <rect x="20" y="55" width="4" height="6" rx="1" fill="#666"/>
        <rect x="36" y="55" width="4" height="6" rx="1" fill="#666"/>
        <rect x="28" y="55" width="4" height="6" rx="1" fill="#aa8833"/>
        <!-- Sword arm (right) -->
        <path d="M44 40 Q50 36 52 30" stroke="#2a2a3a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Sword -->
        <line x1="52" y1="30" x2="56" y2="4" stroke="#ccc" stroke-width="2.5"/>
        <line x1="52" y1="30" x2="56" y2="4" stroke="#eee" stroke-width="1" opacity="0.5"/>
        <rect x="49" y="28" width="6" height="3" rx="0.5" fill="#aa8833"/>
        <circle cx="52" cy="29" r="1" fill="#cc6622"/>
        <!-- Left arm -->
        <path d="M16 40 Q8 46 6 54" stroke="#2a2a3a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="6" cy="54" r="3" fill="#333"/>
        <!-- Neck -->
        <rect x="24" y="30" width="12" height="8" rx="2" fill="#333344"/>
        <!-- Head -->
        <circle cx="30" cy="22" r="10" fill="#1a1a2a"/>
        <!-- Half orange / half black mask -->
        <path d="M30 12 A10 10 0 0 0 30 32 Z" fill="#1a1a2a"/>
        <path d="M30 12 A10 10 0 0 1 30 32 Z" fill="#cc6622"/>
        <!-- Single eye (right side) -->
        <ellipse cx="34" cy="20" rx="2.5" ry="2" fill="#fff"/>
        <circle cx="34" cy="20" r="1" fill="#111"/>
        <!-- Left side - no eye, just a dot -->
        <circle cx="26" cy="20" r="1.5" fill="#111"/>
        <!-- Mask detail line -->
        <line x1="30" y1="12" x2="30" y2="32" stroke="#444" stroke-width="0.8"/>
        <!-- Forehead plate -->
        <rect x="25" y="13" width="10" height="3" rx="1" fill="#333"/>
    </svg>`,

    // --- 9. Darkseid: Massive stone figure, omega beams, boss ---
    ys_dc_darkseid: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="87" rx="14" ry="4" fill="rgba(0,0,0,0.4)"/>
        <!-- Legs (massive) -->
        <rect x="14" y="60" width="12" height="18" rx="3" fill="#3a4a5a"/>
        <rect x="34" y="60" width="12" height="18" rx="3" fill="#3a4a5a"/>
        <!-- Boots -->
        <rect x="12" y="76" width="14" height="6" rx="2" fill="#2a3a4a"/>
        <rect x="34" y="76" width="14" height="6" rx="2" fill="#2a3a4a"/>
        <!-- Body (massive stone) -->
        <rect x="10" y="30" width="40" height="32" rx="4" fill="#4a5a6a"/>
        <rect x="12" y="32" width="36" height="28" rx="3" fill="#5a6a7a"/>
        <!-- Rocky armor texture -->
        <rect x="14" y="34" width="8" height="6" rx="1" fill="#4a5a6a" opacity="0.6"/>
        <rect x="38" y="34" width="8" height="6" rx="1" fill="#4a5a6a" opacity="0.6"/>
        <rect x="22" y="48" width="16" height="4" rx="1" fill="#4a5a6a" opacity="0.4"/>
        <!-- Chest omega symbol -->
        <path d="M24 40 Q26 36 30 38 Q34 36 36 40" stroke="#cc3333" stroke-width="1.5" fill="none"/>
        <line x1="24" y1="40" x2="22" y2="42" stroke="#cc3333" stroke-width="1.5"/>
        <line x1="36" y1="40" x2="38" y2="42" stroke="#cc3333" stroke-width="1.5"/>
        <!-- Belt -->
        <rect x="12" y="56" width="36" height="5" rx="1" fill="#3a4a5a"/>
        <rect x="26" y="55" width="8" height="7" rx="1" fill="#5a3a3a"/>
        <!-- Arms -->
        <path d="M10 36 Q2 42 0 54" stroke="#5a6a7a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="0" cy="54" r="4" fill="#4a5a6a"/>
        <path d="M50 36 Q58 42 60 54" stroke="#5a6a7a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="60" cy="54" r="4" fill="#4a5a6a"/>
        <!-- Neck -->
        <rect x="20" y="24" width="20" height="8" rx="3" fill="#4a5a6a"/>
        <!-- Head -->
        <rect x="16" y="8" width="28" height="18" rx="4" fill="#5a6a7a"/>
        <!-- Helmet with horns -->
        <rect x="18" y="6" width="24" height="8" rx="2" fill="#3a4a5a"/>
        <polygon points="18,10 14,2 20,8" fill="#3a4a5a"/>
        <polygon points="42,10 46,2 40,8" fill="#3a4a5a"/>
        <!-- Brow ridge -->
        <rect x="20" y="12" width="20" height="3" rx="1" fill="#4a5a6a"/>
        <!-- Glowing red eyes (omega beams) -->
        <ellipse cx="25" cy="17" rx="3" ry="2" fill="#ff2222" class="animate-pulse"/>
        <ellipse cx="35" cy="17" rx="3" ry="2" fill="#ff2222" class="animate-pulse"/>
        <ellipse cx="25" cy="17" rx="1.5" ry="1" fill="#ffaa44"/>
        <ellipse cx="35" cy="17" rx="1.5" ry="1" fill="#ffaa44"/>
        <!-- Omega beam traces -->
        <path d="M22 17 Q16 14 10 16 Q6 18 2 14" stroke="#ff2222" stroke-width="1" fill="none" opacity="0.6" class="animate-pulse"/>
        <path d="M38 17 Q44 14 50 16 Q54 18 58 14" stroke="#ff2222" stroke-width="1" fill="none" opacity="0.6" class="animate-pulse"/>
        <!-- Mouth (grim) -->
        <line x1="24" y1="22" x2="36" y2="22" stroke="#333" stroke-width="1.5"/>
        <!-- Chin details -->
        <line x1="28" y1="23" x2="28" y2="25" stroke="#4a5a6a" stroke-width="0.8"/>
        <line x1="32" y1="23" x2="32" y2="25" stroke="#4a5a6a" stroke-width="0.8"/>
    </svg>`,

    // --- 10. Dr. Chaos (Evil Scientist) - MAIN VILLAIN ---
    ys_evil_scientist: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="86" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Legs -->
        <rect x="21" y="64" width="7" height="12" rx="2" fill="#2a2a3a"/>
        <rect x="32" y="64" width="7" height="12" rx="2" fill="#2a2a3a"/>
        <!-- Shoes -->
        <rect x="19" y="74" width="10" height="5" rx="2" fill="#1a1a2a"/>
        <rect x="31" y="74" width="10" height="5" rx="2" fill="#1a1a2a"/>
        <!-- Lab coat (torn/dirty, white-ish) -->
        <rect x="14" y="36" width="32" height="30" rx="3" fill="#d4d4cc"/>
        <!-- Torn edges -->
        <path d="M14 62 L12 66 L16 64 L14 68 L18 66" fill="#c4c4bb"/>
        <path d="M46 62 L48 66 L44 64 L46 68 L42 66" fill="#c4c4bb"/>
        <!-- Dirt stains -->
        <circle cx="20" cy="48" r="2" fill="#aa9a7a" opacity="0.4"/>
        <circle cx="38" cy="54" r="3" fill="#aa9a7a" opacity="0.3"/>
        <circle cx="25" cy="58" r="1.5" fill="#8a7a5a" opacity="0.4"/>
        <!-- Shirt under coat -->
        <rect x="22" y="38" width="16" height="10" rx="2" fill="#333"/>
        <!-- Belt with glowing vials -->
        <rect x="16" y="56" width="28" height="4" rx="1" fill="#444"/>
        <rect x="19" y="54" width="4" height="6" rx="1" fill="#335533"/>
        <circle cx="21" cy="57" r="1.5" fill="#44ff44" class="animate-pulse"/>
        <rect x="25" y="54" width="4" height="6" rx="1" fill="#553333"/>
        <circle cx="27" cy="57" r="1.5" fill="#ff4444" class="animate-pulse"/>
        <rect x="31" y="54" width="4" height="6" rx="1" fill="#333355"/>
        <circle cx="33" cy="57" r="1.5" fill="#4488ff" class="animate-pulse"/>
        <rect x="37" y="54" width="4" height="6" rx="1" fill="#553355"/>
        <circle cx="39" cy="57" r="1.5" fill="#cc44ff" class="animate-pulse"/>
        <!-- Left arm (holding something) -->
        <path d="M14 40 Q6 46 4 52" stroke="#d4d4cc" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="4" cy="52" r="3" fill="#d4d4cc"/>
        <!-- Glowing flask in hand -->
        <path d="M2 46 Q1 42 3 40 L5 40 Q7 42 6 46 Z" fill="#aaffaa" opacity="0.6"/>
        <circle cx="4" cy="43" r="2" fill="#44ff88" opacity="0.7" class="animate-pulse"/>
        <!-- Right arm (raised maniacally) -->
        <path d="M46 40 Q52 32 50 24" stroke="#d4d4cc" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="50" cy="24" r="3" fill="#d4d4cc"/>
        <!-- Neck -->
        <rect x="26" y="30" width="8" height="8" rx="2" fill="#daa"/>
        <!-- Head -->
        <circle cx="30" cy="22" r="10" fill="#daa"/>
        <!-- Wild hair -->
        <path d="M20 18 Q16 6 12 4" stroke="#555" stroke-width="2" fill="none"/>
        <path d="M22 14 Q20 4 18 0" stroke="#555" stroke-width="2" fill="none"/>
        <path d="M26 12 Q28 2 26 -2" stroke="#555" stroke-width="2" fill="none"/>
        <path d="M34 12 Q32 2 34 -2" stroke="#555" stroke-width="2" fill="none"/>
        <path d="M38 14 Q40 4 42 0" stroke="#555" stroke-width="2" fill="none"/>
        <path d="M40 18 Q44 6 48 4" stroke="#555" stroke-width="2" fill="none"/>
        <!-- Goggles on forehead -->
        <rect x="22" y="12" width="16" height="5" rx="2" fill="#556"/>
        <circle cx="26" cy="14" r="3" fill="#88aacc" opacity="0.5"/>
        <circle cx="34" cy="14" r="3" fill="#88aacc" opacity="0.5"/>
        <circle cx="26" cy="14" r="2" stroke="#444" stroke-width="0.8" fill="none"/>
        <circle cx="34" cy="14" r="2" stroke="#444" stroke-width="0.8" fill="none"/>
        <!-- Eyes (maniacal) -->
        <circle cx="26" cy="22" r="2.5" fill="#fff"/>
        <circle cx="34" cy="22" r="2.5" fill="#fff"/>
        <circle cx="26" cy="22" r="1.5" fill="#44cc44"/>
        <circle cx="34" cy="22" r="1.5" fill="#44cc44"/>
        <circle cx="26" cy="22" r="0.7" fill="#111"/>
        <circle cx="34" cy="22" r="0.7" fill="#111"/>
        <!-- Maniacal grin -->
        <path d="M24 27 Q27 32 30 28 Q33 32 36 27" stroke="#111" stroke-width="1" fill="none"/>
        <rect x="26" y="27" width="1.5" height="2" fill="#fff"/>
        <rect x="29" y="28" width="1.5" height="2" fill="#fff"/>
        <rect x="32" y="27" width="1.5" height="2" fill="#fff"/>
    </svg>`,

    // --- 11. Frankenstein's Monster: Green, flat head, bolts ---
    ys_frankenstein: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="87" rx="12" ry="3" fill="rgba(0,0,0,0.35)"/>
        <!-- Legs -->
        <rect x="17" y="62" width="10" height="14" rx="2" fill="#4a4a3a"/>
        <rect x="33" y="62" width="10" height="14" rx="2" fill="#4a4a3a"/>
        <!-- Boots -->
        <rect x="15" y="74" width="13" height="7" rx="2" fill="#2a2a1a"/>
        <rect x="32" y="74" width="13" height="7" rx="2" fill="#2a2a1a"/>
        <!-- Body (massive) -->
        <rect x="12" y="34" width="36" height="30" rx="4" fill="#3a5a3a"/>
        <!-- Tattered shirt -->
        <rect x="14" y="36" width="32" height="18" rx="3" fill="#5a4a3a"/>
        <!-- Stitches on shirt -->
        <line x1="22" y1="36" x2="22" y2="54" stroke="#333" stroke-width="0.8" stroke-dasharray="2 2"/>
        <line x1="38" y1="36" x2="38" y2="54" stroke="#333" stroke-width="0.8" stroke-dasharray="2 2"/>
        <!-- Tattered pants -->
        <rect x="14" y="52" width="32" height="12" rx="2" fill="#4a4a3a"/>
        <path d="M14 62 L12 64 L16 62" fill="#3a3a2a"/>
        <path d="M46 62 L48 64 L44 62" fill="#3a3a2a"/>
        <!-- Arms (massive fists) -->
        <path d="M12 38 Q4 44 2 54" stroke="#4a8a4a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <rect x="-2" y="52" width="8" height="7" rx="2" fill="#4a8a4a"/>
        <path d="M48 38 Q56 44 58 54" stroke="#4a8a4a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <rect x="54" y="52" width="8" height="7" rx="2" fill="#4a8a4a"/>
        <!-- Body stitches -->
        <line x1="30" y1="36" x2="30" y2="62" stroke="#2a4a2a" stroke-width="1" stroke-dasharray="3 2"/>
        <!-- Neck (thick) -->
        <rect x="20" y="26" width="20" height="10" rx="3" fill="#4a8a4a"/>
        <!-- Neck bolts -->
        <circle cx="18" cy="30" r="3" fill="#888"/>
        <circle cx="18" cy="30" r="2" fill="#aaa"/>
        <circle cx="42" cy="30" r="3" fill="#888"/>
        <circle cx="42" cy="30" r="2" fill="#aaa"/>
        <!-- Head (flat top) -->
        <rect x="18" y="8" width="24" height="20" rx="3" fill="#4a8a4a"/>
        <!-- Flat top -->
        <rect x="16" y="6" width="28" height="6" rx="1" fill="#3a7a3a"/>
        <!-- Forehead stitches -->
        <line x1="22" y1="10" x2="38" y2="10" stroke="#2a5a2a" stroke-width="1"/>
        <line x1="24" y1="8" x2="24" y2="12" stroke="#2a5a2a" stroke-width="0.8"/>
        <line x1="28" y1="8" x2="28" y2="12" stroke="#2a5a2a" stroke-width="0.8"/>
        <line x1="32" y1="8" x2="32" y2="12" stroke="#2a5a2a" stroke-width="0.8"/>
        <line x1="36" y1="8" x2="36" y2="12" stroke="#2a5a2a" stroke-width="0.8"/>
        <!-- Eyes (sunken) -->
        <rect x="22" y="14" width="5" height="4" rx="1" fill="#1a3a1a"/>
        <circle cx="24.5" cy="16" r="1.5" fill="#ffcc33"/>
        <circle cx="24.5" cy="16" r="0.7" fill="#111"/>
        <rect x="33" y="14" width="5" height="4" rx="1" fill="#1a3a1a"/>
        <circle cx="35.5" cy="16" r="1.5" fill="#ffcc33"/>
        <circle cx="35.5" cy="16" r="0.7" fill="#111"/>
        <!-- Mouth -->
        <line x1="24" y1="23" x2="36" y2="23" stroke="#1a3a1a" stroke-width="1.5"/>
        <line x1="26" y1="21" x2="26" y2="25" stroke="#2a5a2a" stroke-width="0.8"/>
        <line x1="30" y1="21" x2="30" y2="25" stroke="#2a5a2a" stroke-width="0.8"/>
        <line x1="34" y1="21" x2="34" y2="25" stroke="#2a5a2a" stroke-width="0.8"/>
    </svg>`,

    // --- 12. Mutant Bull: Standing on hind legs, purple veins, horns ---
    ys_mutant_bull: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="87" rx="12" ry="3" fill="rgba(0,0,0,0.35)"/>
        <!-- Steam from nostrils -->
        <ellipse cx="20" cy="18" rx="3" ry="1.5" fill="#ccc" opacity="0.3" class="animate-pulse"/>
        <ellipse cx="17" cy="14" rx="2" ry="1" fill="#ccc" opacity="0.2" class="animate-pulse"/>
        <ellipse cx="40" cy="18" rx="3" ry="1.5" fill="#ccc" opacity="0.3" class="animate-pulse"/>
        <ellipse cx="43" cy="14" rx="2" ry="1" fill="#ccc" opacity="0.2" class="animate-pulse"/>
        <!-- Legs (hooves) -->
        <rect x="16" y="60" width="10" height="16" rx="3" fill="#5a3a2a"/>
        <rect x="34" y="60" width="10" height="16" rx="3" fill="#5a3a2a"/>
        <rect x="16" y="76" width="10" height="5" rx="1" fill="#333"/>
        <rect x="34" y="76" width="10" height="5" rx="1" fill="#333"/>
        <!-- Body (massive) -->
        <rect x="12" y="34" width="36" height="28" rx="5" fill="#6a4a3a"/>
        <ellipse cx="30" cy="48" rx="16" ry="12" fill="#7a5a4a"/>
        <!-- Purple corruption veins -->
        <path d="M18 38 Q22 44 20 52" stroke="#8a2aaa" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M42 38 Q38 44 40 52" stroke="#8a2aaa" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M26 36 Q30 42 28 50" stroke="#8a2aaa" stroke-width="1" fill="none" opacity="0.5"/>
        <path d="M34 36 Q30 42 32 50" stroke="#8a2aaa" stroke-width="1" fill="none" opacity="0.5"/>
        <circle cx="22" cy="44" r="1.5" fill="#aa44cc" opacity="0.4" class="animate-pulse"/>
        <circle cx="38" cy="42" r="1.5" fill="#aa44cc" opacity="0.4" class="animate-pulse"/>
        <!-- Arms -->
        <path d="M12 40 Q4 46 2 56" stroke="#6a4a3a" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M48 40 Q56 46 58 56" stroke="#6a4a3a" stroke-width="6" fill="none" stroke-linecap="round"/>
        <rect x="-1" y="54" width="6" height="5" rx="1" fill="#333"/>
        <rect x="55" y="54" width="6" height="5" rx="1" fill="#333"/>
        <!-- Neck -->
        <rect x="20" y="26" width="20" height="10" rx="3" fill="#6a4a3a"/>
        <!-- Head -->
        <ellipse cx="30" cy="20" rx="12" ry="9" fill="#6a4a3a"/>
        <ellipse cx="30" cy="22" rx="10" ry="6" fill="#7a5a4a"/>
        <!-- Horns (huge) -->
        <path d="M20 16 Q14 8 8 4" stroke="#ddd" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M40 16 Q46 8 52 4" stroke="#ddd" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Red glowing eyes -->
        <circle cx="24" cy="18" r="2.5" fill="#ff2222" class="animate-pulse"/>
        <circle cx="36" cy="18" r="2.5" fill="#ff2222" class="animate-pulse"/>
        <circle cx="24" cy="18" r="1" fill="#ffaa44"/>
        <circle cx="36" cy="18" r="1" fill="#ffaa44"/>
        <!-- Nostrils -->
        <circle cx="26" cy="24" r="1.5" fill="#4a2a1a"/>
        <circle cx="34" cy="24" r="1.5" fill="#4a2a1a"/>
        <!-- Mouth/snout -->
        <path d="M24 26 Q30 30 36 26" stroke="#4a2a1a" stroke-width="1" fill="none"/>
        <!-- Nose ring -->
        <circle cx="30" cy="25" r="2" fill="none" stroke="#aaa" stroke-width="1"/>
    </svg>`,

    // --- 13. The Resurrected Dictator: Skeletal undead officer ---
    ys_hitler: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="86" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Legs -->
        <rect x="21" y="64" width="7" height="12" rx="2" fill="#3a3a2a"/>
        <rect x="32" y="64" width="7" height="12" rx="2" fill="#3a3a2a"/>
        <!-- Boots -->
        <rect x="19" y="74" width="10" height="6" rx="2" fill="#1a1a1a"/>
        <rect x="31" y="74" width="10" height="6" rx="2" fill="#1a1a1a"/>
        <!-- Tattered military coat -->
        <rect x="14" y="34" width="32" height="32" rx="3" fill="#3a4a3a"/>
        <rect x="16" y="36" width="28" height="28" rx="2" fill="#4a5a4a"/>
        <!-- Coat tattered edges -->
        <path d="M14 64 L12 66 L16 64 L13 68" fill="#3a4a3a"/>
        <path d="M46 64 L48 66 L44 64 L47 68" fill="#3a4a3a"/>
        <!-- Button row -->
        <circle cx="24" cy="40" r="1" fill="#aa8833"/>
        <circle cx="24" cy="46" r="1" fill="#aa8833"/>
        <circle cx="24" cy="52" r="1" fill="#aa8833"/>
        <circle cx="24" cy="58" r="1" fill="#aa8833"/>
        <!-- Iron cross medal -->
        <rect x="32" y="40" width="6" height="6" rx="0.5" fill="#222" stroke="#888" stroke-width="0.5"/>
        <line x1="35" y1="40" x2="35" y2="46" stroke="#888" stroke-width="1"/>
        <line x1="32" y1="43" x2="38" y2="43" stroke="#888" stroke-width="1"/>
        <!-- Second medal -->
        <circle cx="35" cy="50" r="2.5" fill="#aa3333" stroke="#888" stroke-width="0.5"/>
        <circle cx="35" cy="50" r="1" fill="#cc5555"/>
        <!-- Belt -->
        <rect x="16" y="58" width="28" height="3" rx="1" fill="#333"/>
        <rect x="28" y="57" width="4" height="5" rx="0.5" fill="#aa8833"/>
        <!-- Epaulets -->
        <rect x="14" y="34" width="8" height="3" rx="1" fill="#5a6a5a"/>
        <rect x="38" y="34" width="8" height="3" rx="1" fill="#5a6a5a"/>
        <!-- Arms (skeletal) -->
        <path d="M14 38 Q6 46 4 56" stroke="#c8b89a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M46 38 Q54 46 56 56" stroke="#c8b89a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Bony hands -->
        <path d="M4 56 L2 58 M4 56 L3 59 M4 56 L5 59" stroke="#c8b89a" stroke-width="1" fill="none"/>
        <path d="M56 56 L54 58 M56 56 L57 59 M56 56 L58 58" stroke="#c8b89a" stroke-width="1" fill="none"/>
        <!-- Neck -->
        <rect x="26" y="28" width="8" height="8" rx="2" fill="#c8b89a"/>
        <!-- Skull head -->
        <circle cx="30" cy="20" r="9" fill="#d8c8a0"/>
        <circle cx="30" cy="20" r="8" fill="#e0d4b0"/>
        <!-- Skull eye sockets -->
        <ellipse cx="25" cy="18" rx="3" ry="3.5" fill="#2a2a1a"/>
        <ellipse cx="35" cy="18" rx="3" ry="3.5" fill="#2a2a1a"/>
        <!-- Glowing eyes -->
        <circle cx="25" cy="18" r="1.5" fill="#44ff44" class="animate-pulse"/>
        <circle cx="35" cy="18" r="1.5" fill="#44ff44" class="animate-pulse"/>
        <!-- Nose hole -->
        <path d="M28 22 L30 24 L32 22" fill="#3a3a2a"/>
        <!-- Teeth -->
        <line x1="24" y1="26" x2="36" y2="26" stroke="#d8c8a0" stroke-width="1.5"/>
        <line x1="25" y1="25" x2="25" y2="27" stroke="#2a2a1a" stroke-width="0.5"/>
        <line x1="27" y1="25" x2="27" y2="27" stroke="#2a2a1a" stroke-width="0.5"/>
        <line x1="29" y1="25" x2="29" y2="27" stroke="#2a2a1a" stroke-width="0.5"/>
        <line x1="31" y1="25" x2="31" y2="27" stroke="#2a2a1a" stroke-width="0.5"/>
        <line x1="33" y1="25" x2="33" y2="27" stroke="#2a2a1a" stroke-width="0.5"/>
        <line x1="35" y1="25" x2="35" y2="27" stroke="#2a2a1a" stroke-width="0.5"/>
        <!-- Officer cap -->
        <rect x="18" y="10" width="24" height="5" rx="1" fill="#3a4a3a"/>
        <rect x="16" y="14" width="28" height="2" rx="0.5" fill="#2a3a2a"/>
        <circle cx="30" cy="12" r="2" fill="#aa8833"/>
        <!-- Eerie glow -->
        <circle cx="30" cy="20" r="12" fill="#44ff44" opacity="0.05" class="animate-pulse"/>
    </svg>`,

    // --- 14. Cerberus: Three-headed dog, fire, red/black ---
    ys_cerberus: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="87" rx="14" ry="4" fill="rgba(0,0,0,0.35)"/>
        <!-- Hellfire ground effect -->
        <ellipse cx="30" cy="84" rx="16" ry="3" fill="#ff4422" opacity="0.15" class="animate-pulse"/>
        <!-- Tail -->
        <path d="M42 54 Q52 46 54 36 Q56 30 52 26" stroke="#2a1a1a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Fire on tail tip -->
        <path d="M52 26 Q50 20 52 16 Q54 20 56 16 Q54 22 52 26" fill="#ff6622" opacity="0.7"/>
        <!-- Back legs -->
        <rect x="34" y="64" width="8" height="14" rx="2" fill="#3a1a1a"/>
        <rect x="38" y="64" width="8" height="14" rx="2" fill="#2a1a1a"/>
        <!-- Front legs -->
        <rect x="14" y="64" width="8" height="14" rx="2" fill="#3a1a1a"/>
        <rect x="18" y="64" width="8" height="14" rx="2" fill="#2a1a1a"/>
        <!-- Paws -->
        <rect x="12" y="76" width="10" height="5" rx="1" fill="#1a1010"/>
        <rect x="17" y="76" width="10" height="5" rx="1" fill="#1a1010"/>
        <rect x="33" y="76" width="10" height="5" rx="1" fill="#1a1010"/>
        <rect x="37" y="76" width="10" height="5" rx="1" fill="#1a1010"/>
        <!-- Body (massive) -->
        <ellipse cx="30" cy="56" rx="18" ry="12" fill="#3a1a1a"/>
        <ellipse cx="30" cy="54" rx="16" ry="10" fill="#4a2222"/>
        <!-- Fire around necks -->
        <path d="M14 34 Q10 28 14 24 Q16 28 18 24 Q20 30 16 34" fill="#ff6622" opacity="0.5" class="animate-pulse"/>
        <path d="M26 30 Q24 24 28 20 Q30 24 32 20 Q34 24 30 30" fill="#ff8833" opacity="0.5" class="animate-pulse"/>
        <path d="M42 34 Q40 28 44 24 Q46 28 48 24 Q50 30 46 34" fill="#ff6622" opacity="0.5" class="animate-pulse"/>
        <!-- Left head neck -->
        <path d="M20 46 Q14 38 14 30" stroke="#3a1a1a" stroke-width="7" fill="none"/>
        <!-- Center head neck -->
        <path d="M30 44 Q30 36 30 28" stroke="#3a1a1a" stroke-width="7" fill="none"/>
        <!-- Right head neck -->
        <path d="M40 46 Q46 38 46 30" stroke="#3a1a1a" stroke-width="7" fill="none"/>
        <!-- Left head -->
        <circle cx="12" cy="24" r="7" fill="#4a2222"/>
        <ellipse cx="10" cy="28" rx="5" ry="3" fill="#3a1a1a"/>
        <circle cx="10" cy="22" r="1.5" fill="#ff3322"/>
        <circle cx="14" cy="22" r="1.5" fill="#ff3322"/>
        <circle cx="10" cy="22" r="0.7" fill="#ffaa44"/>
        <circle cx="14" cy="22" r="0.7" fill="#ffaa44"/>
        <path d="M6 28 Q10 32 14 28" stroke="#1a0a0a" stroke-width="0.8" fill="none"/>
        <polygon points="7,27 8,29 9,27" fill="#eee"/>
        <polygon points="11,27 12,29 13,27" fill="#eee"/>
        <!-- Center head -->
        <circle cx="30" cy="20" r="8" fill="#4a2222"/>
        <ellipse cx="30" cy="24" rx="6" ry="3.5" fill="#3a1a1a"/>
        <circle cx="27" cy="18" r="2" fill="#ff3322" class="animate-pulse"/>
        <circle cx="33" cy="18" r="2" fill="#ff3322" class="animate-pulse"/>
        <circle cx="27" cy="18" r="0.8" fill="#ffaa44"/>
        <circle cx="33" cy="18" r="0.8" fill="#ffaa44"/>
        <path d="M24 24 Q30 28 36 24" stroke="#1a0a0a" stroke-width="0.8" fill="none"/>
        <polygon points="26,23 27,25 28,23" fill="#eee"/>
        <polygon points="30,24 31,26 32,24" fill="#eee"/>
        <polygon points="33,23 34,25 35,23" fill="#eee"/>
        <!-- Ears center -->
        <polygon points="25,14 27,8 29,14" fill="#3a1a1a"/>
        <polygon points="31,14 33,8 35,14" fill="#3a1a1a"/>
        <!-- Right head -->
        <circle cx="48" cy="24" r="7" fill="#4a2222"/>
        <ellipse cx="50" cy="28" rx="5" ry="3" fill="#3a1a1a"/>
        <circle cx="46" cy="22" r="1.5" fill="#ff3322"/>
        <circle cx="50" cy="22" r="1.5" fill="#ff3322"/>
        <circle cx="46" cy="22" r="0.7" fill="#ffaa44"/>
        <circle cx="50" cy="22" r="0.7" fill="#ffaa44"/>
        <path d="M46 28 Q50 32 54 28" stroke="#1a0a0a" stroke-width="0.8" fill="none"/>
        <polygon points="47,27 48,29 49,27" fill="#eee"/>
        <polygon points="51,27 52,29 53,27" fill="#eee"/>
    </svg>`,

    // --- 15. Mech Warrior: Huge mech suit, cockpit, missiles ---
    ys_mech_warrior: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="87" rx="14" ry="4" fill="rgba(0,0,0,0.35)"/>
        <!-- Legs (massive mechanical) -->
        <rect x="12" y="62" width="12" height="16" rx="2" fill="#4a5a3a"/>
        <rect x="36" y="62" width="12" height="16" rx="2" fill="#4a5a3a"/>
        <!-- Leg joints -->
        <circle cx="18" cy="62" r="3" fill="#5a6a4a"/>
        <circle cx="42" cy="62" r="3" fill="#5a6a4a"/>
        <!-- Feet -->
        <rect x="8" y="76" width="18" height="6" rx="2" fill="#3a4a2a"/>
        <rect x="34" y="76" width="18" height="6" rx="2" fill="#3a4a2a"/>
        <!-- Toe details -->
        <line x1="14" y1="76" x2="14" y2="82" stroke="#2a3a1a" stroke-width="1"/>
        <line x1="20" y1="76" x2="20" y2="82" stroke="#2a3a1a" stroke-width="1"/>
        <line x1="40" y1="76" x2="40" y2="82" stroke="#2a3a1a" stroke-width="1"/>
        <line x1="46" y1="76" x2="46" y2="82" stroke="#2a3a1a" stroke-width="1"/>
        <!-- Torso (armored) -->
        <rect x="10" y="30" width="40" height="34" rx="4" fill="#4a5a3a"/>
        <rect x="12" y="32" width="36" height="30" rx="3" fill="#5a6a4a"/>
        <!-- Armor plating -->
        <rect x="14" y="34" width="14" height="12" rx="2" fill="#4a5a3a"/>
        <rect x="32" y="34" width="14" height="12" rx="2" fill="#4a5a3a"/>
        <!-- Cockpit (center chest) -->
        <rect x="20" y="36" width="20" height="14" rx="3" fill="#2a3a4a"/>
        <rect x="22" y="38" width="16" height="10" rx="2" fill="#3a6a8a" opacity="0.6"/>
        <!-- Pilot silhouette visible -->
        <circle cx="30" cy="42" r="3" fill="#1a2a3a" opacity="0.5"/>
        <rect x="27" y="44" width="6" height="4" rx="1" fill="#1a2a3a" opacity="0.4"/>
        <!-- Cockpit glow -->
        <rect x="22" y="38" width="16" height="10" rx="2" fill="#44aacc" opacity="0.15" class="animate-pulse"/>
        <!-- Waist -->
        <rect x="16" y="58" width="28" height="6" rx="2" fill="#3a4a2a"/>
        <!-- Left arm (weapon) -->
        <rect x="2" y="34" width="10" height="18" rx="2" fill="#4a5a3a"/>
        <rect x="0" y="36" width="6" height="14" rx="1" fill="#5a6a4a"/>
        <!-- Gun barrel on left -->
        <rect x="0" y="50" width="6" height="8" rx="1" fill="#3a3a3a"/>
        <circle cx="3" cy="58" r="2" fill="#222"/>
        <!-- Right arm (weapon) -->
        <rect x="48" y="34" width="10" height="18" rx="2" fill="#4a5a3a"/>
        <rect x="54" y="36" width="6" height="14" rx="1" fill="#5a6a4a"/>
        <!-- Gun barrel on right -->
        <rect x="54" y="50" width="6" height="8" rx="1" fill="#3a3a3a"/>
        <circle cx="57" cy="58" r="2" fill="#222"/>
        <!-- Shoulder missile launchers -->
        <rect x="4" y="24" width="12" height="10" rx="2" fill="#5a6a4a"/>
        <rect x="44" y="24" width="12" height="10" rx="2" fill="#5a6a4a"/>
        <!-- Missile tubes -->
        <circle cx="7" cy="27" r="2" fill="#333"/>
        <circle cx="13" cy="27" r="2" fill="#333"/>
        <circle cx="7" cy="31" r="2" fill="#333"/>
        <circle cx="13" cy="31" r="2" fill="#333"/>
        <circle cx="47" cy="27" r="2" fill="#333"/>
        <circle cx="53" cy="27" r="2" fill="#333"/>
        <circle cx="47" cy="31" r="2" fill="#333"/>
        <circle cx="53" cy="31" r="2" fill="#333"/>
        <!-- Head (small sensor dome) -->
        <rect x="22" y="18" width="16" height="12" rx="3" fill="#4a5a3a"/>
        <rect x="24" y="20" width="12" height="8" rx="2" fill="#3a4a2a"/>
        <!-- Visor -->
        <rect x="24" y="22" width="12" height="4" rx="1" fill="#ff4422" opacity="0.8"/>
        <rect x="24" y="22" width="12" height="4" rx="1" fill="#ff6644" opacity="0.3" class="animate-pulse"/>
        <!-- Antenna -->
        <line x1="36" y1="20" x2="40" y2="14" stroke="#5a6a4a" stroke-width="1.5"/>
        <circle cx="40" cy="14" r="1" fill="#ff2222"/>
        <!-- Military star emblem -->
        <polygon points="30,50 31,53 34,53 31.5,55 32.5,58 30,56 27.5,58 28.5,55 26,53 29,53" fill="#aa8833" opacity="0.7"/>
    </svg>`

};

// --- Minion Types ---
const ysMinionTypes = [
    { key: 'ys_scrap_robot', name: 'Scrap Robot', hpMultiplier: 0.8, scale: 0.9 },
    { key: 'ys_scrap_tank', name: 'Scrap Tank Bot', hpMultiplier: 1.1, scale: 1.0 },
    { key: 'ys_monkey_butler', name: 'Evil Monkey Butler', hpMultiplier: 0.75, scale: 0.85 },
    { key: 'ys_junkyard_dog', name: 'Junkyard Dog', hpMultiplier: 0.85, scale: 0.8 },
    { key: 'ys_cyborg', name: 'Cyborg Abomination', hpMultiplier: 1.2, scale: 1.0 },
    { key: 'ys_radioactive_mutant', name: 'Radioactive Mutant', hpMultiplier: 1.0, scale: 1.0 },
    { key: 'ys_zombie_student', name: 'Zombie Student', hpMultiplier: 0.7, scale: 0.9 },
    { key: 'ys_mutant_rat', name: 'Giant Mutant Rat', hpMultiplier: 0.8, scale: 0.7 },
    { key: 'ys_bear', name: 'Corrupted Bear', hpMultiplier: 1.3, scale: 1.1 },
    { key: 'ys_lion', name: 'Corrupted Lion', hpMultiplier: 1.15, scale: 1.0 },
    { key: 'ys_crocodile', name: 'Corrupted Crocodile', hpMultiplier: 1.1, scale: 1.0 },
    { key: 'ys_shark', name: 'Land Shark', hpMultiplier: 1.0, scale: 1.0 },
    { key: 'ys_wolf', name: 'Rabid Wolf', hpMultiplier: 0.9, scale: 0.85 },
    { key: 'ys_rambo_soldier', name: 'Rambo Soldier', hpMultiplier: 1.0, scale: 1.0 },
    { key: 'ys_sniper', name: 'Desert Sniper', hpMultiplier: 0.85, scale: 1.0 },
    { key: 'ys_zombie_horde', name: 'Zombie Horde', hpMultiplier: 1.4, scale: 1.1 },
    { key: 'ys_trex', name: 'Museum T-Rex', hpMultiplier: 1.5, scale: 1.3 },
    { key: 'ys_raptor', name: 'Velociraptor', hpMultiplier: 0.9, scale: 0.85 },
    { key: 'ys_pterodactyl', name: 'Pterodactyl', hpMultiplier: 0.8, scale: 1.0 },
    { key: 'ys_alien_trooper', name: 'Alien Trooper', hpMultiplier: 1.1, scale: 1.0 },
    { key: 'ys_ufo_drone', name: 'UFO Drone', hpMultiplier: 0.7, scale: 0.8 },
    { key: 'ys_dc_bane', name: 'Bane', hpMultiplier: 1.3, scale: 1.2 },
];

// --- Boss Types ---
const ysBossTypes = [
    { key: 'ys_evil_scientist', name: 'Dr. Chaos', hpMultiplier: 3.0, scale: 1.2 },
    { key: 'ys_frankenstein', name: "Frankenstein's Monster", hpMultiplier: 3.5, scale: 1.3 },
    { key: 'ys_mutant_bull', name: 'Raging Mutant Bull', hpMultiplier: 3.2, scale: 1.3 },
    { key: 'ys_hitler', name: 'The Resurrected Dictator', hpMultiplier: 3.8, scale: 1.2 },
    { key: 'ys_cerberus', name: 'Cerberus', hpMultiplier: 4.0, scale: 1.3 },
    { key: 'ys_mech_warrior', name: 'Mech Warrior', hpMultiplier: 4.2, scale: 1.3 },
    { key: 'ys_dc_deathstroke', name: 'Deathstroke', hpMultiplier: 3.5, scale: 1.2 },
    { key: 'ys_dc_darkseid', name: 'Darkseid', hpMultiplier: 5.0, scale: 1.3 },
];

// Merge into global vectors if available
if (typeof vectors !== 'undefined') Object.assign(vectors, ysEnemyVectorsB);
