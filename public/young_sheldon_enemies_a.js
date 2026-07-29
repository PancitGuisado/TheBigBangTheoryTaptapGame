const ysEnemyVectorsA = {

    // 1. Scrap Robot - Boxy junk-metal robot, mismatched eyes, wire antenna
    ys_scrap_robot: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Feet -->
        <rect x="17" y="76" width="10" height="8" rx="1" fill="#6b7280"/>
        <rect x="33" y="76" width="10" height="8" rx="1" fill="#78716c"/>
        <!-- Legs -->
        <rect x="20" y="64" width="6" height="13" fill="#9ca3af"/>
        <rect x="34" y="64" width="6" height="13" fill="#a8a29e"/>
        <circle cx="23" cy="70" r="1.5" fill="#57534e"/>
        <circle cx="37" cy="68" r="1.5" fill="#57534e"/>
        <!-- Body - boxy scrap metal -->
        <rect x="14" y="38" width="32" height="28" rx="2" fill="#a1a1aa"/>
        <rect x="16" y="40" width="28" height="24" rx="1" fill="#78716c"/>
        <!-- Rust patches -->
        <rect x="18" y="44" width="8" height="6" rx="1" fill="#c2410c" opacity="0.5"/>
        <rect x="32" y="50" width="6" height="8" rx="1" fill="#c2410c" opacity="0.4"/>
        <!-- Bolts -->
        <circle cx="18" cy="42" r="1.5" fill="#44403c"/>
        <circle cx="42" cy="42" r="1.5" fill="#44403c"/>
        <circle cx="18" cy="60" r="1.5" fill="#44403c"/>
        <circle cx="42" cy="60" r="1.5" fill="#44403c"/>
        <!-- Chest panel -->
        <rect x="24" y="48" width="12" height="8" rx="1" fill="#52525b" stroke="#ea580c" stroke-width="0.5"/>
        <circle cx="28" cy="52" r="1.5" fill="#ef4444" class="animate-pulse"/>
        <circle cx="33" cy="52" r="1" fill="#22c55e"/>
        <!-- Arms -->
        <path d="M14 44 Q6 52 10 62" stroke="#9ca3af" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M46 44 Q54 50 50 60" stroke="#a8a29e" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="10" cy="62" r="3" fill="#78716c"/>
        <circle cx="50" cy="60" r="3" fill="#78716c"/>
        <!-- Head -->
        <rect x="18" y="18" width="24" height="20" rx="2" fill="#a1a1aa"/>
        <rect x="20" y="20" width="20" height="16" rx="1" fill="#78716c"/>
        <!-- Mismatched eyes -->
        <circle cx="26" cy="28" r="4" fill="#1e293b"/>
        <circle cx="26" cy="28" r="2.5" fill="#ef4444" class="animate-pulse"/>
        <circle cx="36" cy="27" r="2.5" fill="#1e293b"/>
        <circle cx="36" cy="27" r="1.5" fill="#fbbf24"/>
        <!-- Mouth -->
        <rect x="24" y="33" width="12" height="2" fill="#1e293b"/>
        <rect x="26" y="33" width="2" height="2" fill="#71717a"/>
        <rect x="32" y="33" width="2" height="2" fill="#71717a"/>
        <!-- Wire antenna -->
        <line x1="30" y1="18" x2="30" y2="8" stroke="#71717a" stroke-width="1.5"/>
        <line x1="30" y1="8" x2="36" y2="4" stroke="#71717a" stroke-width="1"/>
        <circle cx="36" cy="4" r="2" fill="#fbbf24" class="animate-pulse"/>
    </svg>`,

    // 2. Scrap Tank Bot - Treaded robot with cannon arm
    ys_scrap_tank: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="16" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Tank treads -->
        <rect x="6" y="72" width="18" height="12" rx="4" fill="#44403c"/>
        <rect x="36" y="72" width="18" height="12" rx="4" fill="#44403c"/>
        <circle cx="11" cy="78" r="3" fill="#57534e" stroke="#78716c" stroke-width="1"/>
        <circle cx="19" cy="78" r="3" fill="#57534e" stroke="#78716c" stroke-width="1"/>
        <circle cx="41" cy="78" r="3" fill="#57534e" stroke="#78716c" stroke-width="1"/>
        <circle cx="49" cy="78" r="3" fill="#57534e" stroke="#78716c" stroke-width="1"/>
        <!-- Lower body / chassis -->
        <rect x="8" y="52" width="44" height="22" rx="3" fill="#78716c"/>
        <rect x="10" y="54" width="40" height="18" rx="2" fill="#6b7280"/>
        <!-- Rust and detail -->
        <rect x="14" y="58" width="12" height="6" rx="1" fill="#c2410c" opacity="0.4"/>
        <rect x="34" y="56" width="10" height="8" rx="1" fill="#c2410c" opacity="0.3"/>
        <!-- Bolts row -->
        <circle cx="14" cy="55" r="1" fill="#44403c"/>
        <circle cx="22" cy="55" r="1" fill="#44403c"/>
        <circle cx="30" cy="55" r="1" fill="#44403c"/>
        <circle cx="38" cy="55" r="1" fill="#44403c"/>
        <circle cx="46" cy="55" r="1" fill="#44403c"/>
        <!-- Cannon arm (right) -->
        <rect x="48" y="40" width="6" height="16" rx="1" fill="#9ca3af"/>
        <rect x="46" y="34" width="10" height="8" rx="2" fill="#71717a"/>
        <rect x="49" y="26" width="4" height="10" rx="1" fill="#57534e"/>
        <circle cx="51" cy="26" r="3" fill="#44403c"/>
        <circle cx="51" cy="26" r="1.5" fill="#1e293b"/>
        <!-- Left arm stub -->
        <path d="M10 54 Q2 60 6 68" stroke="#9ca3af" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="6" cy="68" r="3" fill="#78716c"/>
        <!-- Head/turret -->
        <rect x="16" y="32" width="24" height="20" rx="3" fill="#9ca3af"/>
        <rect x="18" y="34" width="20" height="16" rx="2" fill="#6b7280"/>
        <!-- Visor -->
        <rect x="20" y="38" width="16" height="6" rx="2" fill="#1e293b"/>
        <circle cx="26" cy="41" r="2" fill="#ef4444" class="animate-pulse"/>
        <circle cx="34" cy="41" r="2" fill="#ef4444" class="animate-pulse"/>
        <!-- Antenna -->
        <line x1="28" y1="32" x2="28" y2="26" stroke="#71717a" stroke-width="1.5"/>
        <circle cx="28" cy="25" r="1.5" fill="#f59e0b"/>
    </svg>`,

    // 3. Evil Monkey Butler - Monkey in tuxedo with serving tray
    ys_monkey_butler: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Feet -->
        <rect x="18" y="78" width="9" height="6" rx="2" fill="#1e293b"/>
        <rect x="33" y="78" width="9" height="6" rx="2" fill="#1e293b"/>
        <!-- Legs -->
        <rect x="20" y="64" width="7" height="15" fill="#1e293b"/>
        <rect x="33" y="64" width="7" height="15" fill="#1e293b"/>
        <!-- Tail -->
        <path d="M25 68 Q10 72 8 62 Q6 52 14 56" stroke="#8b5e3c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Body - tuxedo -->
        <rect x="16" y="38" width="28" height="28" rx="3" fill="#1e293b"/>
        <!-- Tuxedo front -->
        <polygon points="26,40 30,66 34,40" fill="#f8fafc"/>
        <rect x="28" y="42" width="4" height="22" fill="#f8fafc"/>
        <!-- Tux buttons -->
        <circle cx="30" cy="48" r="1" fill="#1e293b"/>
        <circle cx="30" cy="54" r="1" fill="#1e293b"/>
        <circle cx="30" cy="60" r="1" fill="#1e293b"/>
        <!-- Bow tie -->
        <polygon points="26,40 30,42 34,40 30,38" fill="#dc2626"/>
        <!-- Left arm holding tray -->
        <path d="M16 44 Q4 50 8 58" stroke="#8b5e3c" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Serving tray -->
        <ellipse cx="8" cy="56" rx="7" ry="2" fill="#c0c0c0"/>
        <rect x="5" y="52" width="6" height="4" rx="1" fill="#a8a29e"/>
        <!-- Right arm -->
        <path d="M44 44 Q54 50 50 60" stroke="#8b5e3c" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="50" cy="60" r="2.5" fill="#a0764e"/>
        <!-- Head -->
        <ellipse cx="30" cy="28" rx="12" ry="13" fill="#8b5e3c"/>
        <!-- Face area -->
        <ellipse cx="30" cy="31" rx="8" ry="8" fill="#a0764e"/>
        <!-- Ears -->
        <circle cx="17" cy="24" r="4" fill="#8b5e3c"/>
        <circle cx="17" cy="24" r="2.5" fill="#d4a574"/>
        <circle cx="43" cy="24" r="4" fill="#8b5e3c"/>
        <circle cx="43" cy="24" r="2.5" fill="#d4a574"/>
        <!-- Eyes - sinister -->
        <circle cx="25" cy="27" r="3" fill="#fef3c7"/>
        <circle cx="35" cy="27" r="3" fill="#fef3c7"/>
        <circle cx="26" cy="27" r="1.5" fill="#dc2626"/>
        <circle cx="36" cy="27" r="1.5" fill="#dc2626"/>
        <!-- Sinister grin -->
        <path d="M24 34 Q30 40 36 34" stroke="#1e293b" stroke-width="1.5" fill="none"/>
        <line x1="24" y1="34" x2="22" y2="33" stroke="#1e293b" stroke-width="1"/>
        <line x1="36" y1="34" x2="38" y2="33" stroke="#1e293b" stroke-width="1"/>
    </svg>`,

    // 4. Junkyard Dog - Aggressive stray dog with chain collar
    ys_junkyard_dog: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Tail -->
        <path d="M46 52 Q56 46 54 38" stroke="#44403c" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Back legs -->
        <rect x="38" y="70" width="7" height="14" rx="1" fill="#44403c"/>
        <rect x="46" y="70" width="7" height="14" rx="1" fill="#3f3f46"/>
        <rect x="37" y="80" width="9" height="5" rx="2" fill="#292524"/>
        <rect x="45" y="80" width="9" height="5" rx="2" fill="#292524"/>
        <!-- Front legs -->
        <rect x="10" y="70" width="7" height="14" rx="1" fill="#44403c"/>
        <rect x="18" y="70" width="7" height="14" rx="1" fill="#3f3f46"/>
        <rect x="9" y="80" width="9" height="5" rx="2" fill="#292524"/>
        <rect x="17" y="80" width="9" height="5" rx="2" fill="#292524"/>
        <!-- Body - muscular -->
        <ellipse cx="30" cy="60" rx="20" ry="14" fill="#44403c"/>
        <ellipse cx="30" cy="58" rx="18" ry="12" fill="#57534e"/>
        <!-- Scars on body -->
        <line x1="22" y1="54" x2="28" y2="58" stroke="#dc2626" stroke-width="0.8" opacity="0.6"/>
        <line x1="34" y1="52" x2="38" y2="56" stroke="#dc2626" stroke-width="0.8" opacity="0.6"/>
        <!-- Chain collar -->
        <ellipse cx="20" cy="50" rx="8" ry="4" fill="none" stroke="#a1a1aa" stroke-width="2" stroke-dasharray="2,1.5"/>
        <!-- Head -->
        <rect x="4" y="34" width="22" height="18" rx="4" fill="#44403c"/>
        <!-- Snout -->
        <rect x="2" y="40" width="14" height="10" rx="3" fill="#57534e"/>
        <!-- Snarling mouth -->
        <path d="M4 46 L16 46" stroke="#1e293b" stroke-width="1.5"/>
        <!-- Teeth -->
        <polygon points="6,46 7,49 8,46" fill="#f5f5f4"/>
        <polygon points="10,46 11,49 12,46" fill="#f5f5f4"/>
        <polygon points="14,46 15,49 16,46" fill="#f5f5f4"/>
        <!-- Nose -->
        <ellipse cx="6" cy="42" rx="2.5" ry="2" fill="#1e293b"/>
        <!-- Eyes - angry -->
        <circle cx="12" cy="38" r="3" fill="#fef9c3"/>
        <circle cx="20" cy="38" r="3" fill="#fef9c3"/>
        <circle cx="12" cy="38" r="1.5" fill="#dc2626"/>
        <circle cx="20" cy="38" r="1.5" fill="#dc2626"/>
        <!-- Angry brows -->
        <line x1="9" y1="34" x2="14" y2="36" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="23" y1="34" x2="18" y2="36" stroke="#1e293b" stroke-width="1.5"/>
        <!-- Ears -->
        <polygon points="10,34 8,24 14,32" fill="#44403c"/>
        <polygon points="22,34 24,24 18,32" fill="#44403c"/>
    </svg>`,

    // 5. Cyborg Abomination - Half-human half-machine
    ys_cyborg: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Feet -->
        <rect x="17" y="78" width="10" height="6" rx="2" fill="#44403c"/>
        <rect x="33" y="78" width="10" height="6" rx="1" fill="#6b7280"/>
        <!-- Legs -->
        <rect x="19" y="64" width="7" height="15" fill="#44403c"/>
        <rect x="34" y="64" width="8" height="15" fill="#71717a"/>
        <!-- Metal leg detail -->
        <line x1="35" y1="66" x2="41" y2="66" stroke="#a1a1aa" stroke-width="1"/>
        <line x1="35" y1="70" x2="41" y2="70" stroke="#a1a1aa" stroke-width="1"/>
        <line x1="35" y1="74" x2="41" y2="74" stroke="#a1a1aa" stroke-width="1"/>
        <!-- Body -->
        <rect x="14" y="38" width="32" height="28" rx="3" fill="#d4a574"/>
        <!-- Metal half (right) -->
        <rect x="30" y="38" width="16" height="28" rx="0" fill="#71717a"/>
        <rect x="30" y="38" width="16" height="28" rx="3" fill="#71717a" clip-path="inset(0 0 0 0)"/>
        <!-- Exposed wires -->
        <line x1="28" y1="44" x2="32" y2="46" stroke="#ef4444" stroke-width="1"/>
        <line x1="28" y1="48" x2="32" y2="50" stroke="#3b82f6" stroke-width="1"/>
        <line x1="28" y1="52" x2="32" y2="54" stroke="#fbbf24" stroke-width="1"/>
        <!-- Chest panel on metal side -->
        <rect x="34" y="46" width="8" height="10" rx="1" fill="#52525b"/>
        <circle cx="36" cy="49" r="1" fill="#ef4444" class="animate-pulse"/>
        <circle cx="40" cy="49" r="1" fill="#22c55e"/>
        <circle cx="36" cy="53" r="1" fill="#3b82f6"/>
        <!-- Human arm (left) -->
        <path d="M14 44 Q4 52 8 62" stroke="#d4a574" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="8" cy="62" r="3" fill="#c9956c"/>
        <!-- Metal arm (right) -->
        <path d="M46 44 Q56 50 52 62" stroke="#9ca3af" stroke-width="6" fill="none" stroke-linecap="round"/>
        <rect x="49" y="60" width="7" height="5" rx="1" fill="#71717a"/>
        <line x1="50" y1="62" x2="56" y2="62" stroke="#52525b" stroke-width="0.5"/>
        <!-- Head -->
        <rect x="16" y="14" width="28" height="24" rx="5" fill="#d4a574"/>
        <!-- Metal half of head -->
        <rect x="30" y="14" width="14" height="24" rx="0" fill="#71717a"/>
        <!-- Human eye (left) -->
        <circle cx="24" cy="26" r="3" fill="white"/>
        <circle cx="24" cy="26" r="1.5" fill="#1e293b"/>
        <!-- Robot eye (right) -->
        <circle cx="38" cy="26" r="3.5" fill="#1e293b"/>
        <circle cx="38" cy="26" r="2" fill="#ef4444" class="animate-pulse"/>
        <!-- Human mouth half -->
        <line x1="22" y1="33" x2="30" y2="33" stroke="#a1634d" stroke-width="1.5"/>
        <!-- Metal jaw -->
        <rect x="30" y="32" width="10" height="3" rx="1" fill="#52525b"/>
        <!-- Hair on human side -->
        <rect x="16" y="12" width="14" height="6" rx="2" fill="#44403c"/>
        <!-- Metal plate on robot side -->
        <rect x="32" y="14" width="10" height="4" rx="1" fill="#9ca3af"/>
        <circle cx="36" cy="16" r="1" fill="#52525b"/>
    </svg>`,

    // 6. Radioactive Mutant - Glowing green humanoid with extra limbs
    ys_radioactive_mutant: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <!-- Green glow aura -->
        <ellipse cx="30" cy="50" rx="26" ry="36" fill="#22c55e" opacity="0.08" class="animate-pulse"/>
        <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(34,197,94,0.3)"/>
        <!-- Feet -->
        <rect x="16" y="78" width="10" height="6" rx="2" fill="#166534"/>
        <rect x="34" y="78" width="10" height="6" rx="2" fill="#166534"/>
        <!-- Legs -->
        <rect x="18" y="64" width="8" height="15" fill="#15803d"/>
        <rect x="35" y="64" width="8" height="15" fill="#15803d"/>
        <!-- Body - hunched -->
        <rect x="12" y="40" width="36" height="26" rx="4" fill="#16a34a"/>
        <!-- Tattered clothes -->
        <rect x="14" y="42" width="32" height="10" rx="2" fill="#78716c" opacity="0.5"/>
        <polygon points="14,52 18,48 22,52" fill="#78716c" opacity="0.4"/>
        <polygon points="38,52 42,48 46,52" fill="#78716c" opacity="0.4"/>
        <!-- Extra arm (left, lower) -->
        <path d="M14 54 Q2 58 4 66" stroke="#16a34a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="4" cy="66" r="2.5" fill="#15803d"/>
        <!-- Main left arm -->
        <path d="M12 44 Q0 48 4 56" stroke="#16a34a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="4" cy="56" r="3" fill="#15803d"/>
        <!-- Main right arm -->
        <path d="M48 44 Q58 48 54 58" stroke="#16a34a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="54" cy="58" r="3" fill="#15803d"/>
        <!-- Extra arm (right, lower) -->
        <path d="M46 56 Q56 60 52 68" stroke="#16a34a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="52" cy="68" r="2.5" fill="#15803d"/>
        <!-- Head - hunched forward -->
        <ellipse cx="30" cy="30" rx="12" ry="14" fill="#16a34a"/>
        <!-- Glowing eyes -->
        <circle cx="24" cy="28" r="3" fill="#fef08a" class="animate-pulse"/>
        <circle cx="24" cy="28" r="1.5" fill="#facc15"/>
        <circle cx="36" cy="28" r="3" fill="#fef08a" class="animate-pulse"/>
        <circle cx="36" cy="28" r="1.5" fill="#facc15"/>
        <!-- Mouth -->
        <path d="M24 36 Q30 40 36 36" stroke="#064e3b" stroke-width="1.5" fill="none"/>
        <!-- Toxic drips -->
        <circle cx="26" cy="39" r="1" fill="#4ade80" opacity="0.7"/>
        <circle cx="34" cy="40" r="1" fill="#4ade80" opacity="0.6"/>
        <!-- Radiation symbol on chest -->
        <circle cx="30" cy="50" r="4" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.6"/>
        <circle cx="30" cy="50" r="1.5" fill="#fbbf24" opacity="0.6"/>
    </svg>`,

    // 7. Zombie Student - Teenager zombie in school uniform
    ys_zombie_student: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Feet / shoes -->
        <rect x="17" y="78" width="10" height="6" rx="2" fill="#1e293b"/>
        <rect x="33" y="78" width="10" height="6" rx="2" fill="#1e293b"/>
        <!-- Legs - khaki pants -->
        <rect x="19" y="62" width="8" height="17" fill="#a16207"/>
        <rect x="33" y="62" width="8" height="17" fill="#a16207"/>
        <!-- Body - torn polo shirt -->
        <rect x="14" y="38" width="32" height="26" rx="3" fill="#6b8e6b"/>
        <!-- Torn spots -->
        <polygon points="18,50 22,48 20,54" fill="#78916f" opacity="0.6"/>
        <polygon points="40,42 44,44 42,48" fill="#78916f" opacity="0.6"/>
        <!-- Collar -->
        <polygon points="24,38 30,42 36,38" fill="#5a7a5a"/>
        <!-- Backpack straps -->
        <line x1="20" y1="38" x2="20" y2="56" stroke="#4a5568" stroke-width="2"/>
        <line x1="40" y1="38" x2="40" y2="56" stroke="#4a5568" stroke-width="2"/>
        <!-- Backpack (behind, peeking out) -->
        <rect x="8" y="40" width="8" height="16" rx="2" fill="#4a5568"/>
        <!-- Arms -->
        <path d="M14 44 Q4 54 10 64" stroke="#8a9a7a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M46 44 Q56 50 50 62" stroke="#8a9a7a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="10" cy="64" r="2.5" fill="#8a9a7a"/>
        <circle cx="50" cy="62" r="2.5" fill="#8a9a7a"/>
        <!-- Head - green-gray skin -->
        <rect x="17" y="14" width="26" height="24" rx="6" fill="#8a9a7a"/>
        <!-- Messy hair -->
        <rect x="17" y="12" width="26" height="8" rx="3" fill="#44403c"/>
        <rect x="15" y="14" width="6" height="5" rx="2" fill="#44403c"/>
        <rect x="39" y="15" width="6" height="4" rx="2" fill="#44403c"/>
        <!-- Hanging glasses -->
        <circle cx="36" cy="28" r="4" fill="none" stroke="#94a3b8" stroke-width="1"/>
        <line x1="36" y1="24" x2="40" y2="18" stroke="#94a3b8" stroke-width="1"/>
        <!-- Eyes -->
        <circle cx="24" cy="26" r="3" fill="#fef9c3"/>
        <circle cx="24" cy="26" r="1.5" fill="#6b7280"/>
        <circle cx="34" cy="26" r="2.5" fill="#fef9c3"/>
        <circle cx="34" cy="26" r="1.5" fill="#6b7280" opacity="0.5"/>
        <!-- Bite mark on cheek -->
        <path d="M38 30 Q40 32 38 34" stroke="#dc2626" stroke-width="1" fill="none"/>
        <!-- Mouth - groaning -->
        <ellipse cx="30" cy="34" rx="4" ry="2.5" fill="#4a5568"/>
        <!-- Drool -->
        <line x1="32" y1="36" x2="33" y2="40" stroke="#6b8e6b" stroke-width="1" opacity="0.7"/>
    </svg>`,

    // 8. Giant Mutant Rat - Huge rat standing upright
    ys_mutant_rat: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Tail -->
        <path d="M36 72 Q50 76 54 68 Q58 58 52 52" stroke="#d4a574" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Feet -->
        <rect x="16" y="78" width="10" height="6" rx="2" fill="#78716c"/>
        <rect x="34" y="78" width="10" height="6" rx="2" fill="#78716c"/>
        <!-- Claws on feet -->
        <line x1="17" y1="83" x2="16" y2="86" stroke="#44403c" stroke-width="1"/>
        <line x1="20" y1="83" x2="19" y2="86" stroke="#44403c" stroke-width="1"/>
        <line x1="35" y1="83" x2="34" y2="86" stroke="#44403c" stroke-width="1"/>
        <line x1="38" y1="83" x2="37" y2="86" stroke="#44403c" stroke-width="1"/>
        <!-- Legs -->
        <rect x="18" y="64" width="8" height="15" fill="#8b7355"/>
        <rect x="34" y="64" width="8" height="15" fill="#8b7355"/>
        <!-- Body -->
        <ellipse cx="30" cy="52" rx="16" ry="16" fill="#8b7355"/>
        <!-- Belly -->
        <ellipse cx="30" cy="56" rx="10" ry="10" fill="#a0896e"/>
        <!-- Matted fur texture -->
        <line x1="18" y1="46" x2="20" y2="50" stroke="#78653f" stroke-width="0.7"/>
        <line x1="40" y1="44" x2="38" y2="48" stroke="#78653f" stroke-width="0.7"/>
        <line x1="22" y1="58" x2="24" y2="62" stroke="#78653f" stroke-width="0.7"/>
        <!-- Arms with claws -->
        <path d="M14 48 Q4 54 8 64" stroke="#8b7355" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M46 48 Q56 52 52 62" stroke="#8b7355" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Claws -->
        <line x1="8" y1="64" x2="4" y2="67" stroke="#44403c" stroke-width="1.5"/>
        <line x1="8" y1="64" x2="7" y2="68" stroke="#44403c" stroke-width="1.5"/>
        <line x1="52" y1="62" x2="55" y2="65" stroke="#44403c" stroke-width="1.5"/>
        <line x1="52" y1="62" x2="54" y2="66" stroke="#44403c" stroke-width="1.5"/>
        <!-- Head -->
        <ellipse cx="30" cy="30" rx="13" ry="11" fill="#8b7355"/>
        <!-- Snout -->
        <ellipse cx="30" cy="34" rx="7" ry="5" fill="#a0896e"/>
        <!-- Nose -->
        <ellipse cx="30" cy="32" rx="2.5" ry="2" fill="#44403c"/>
        <!-- Glowing eyes -->
        <circle cx="23" cy="27" r="3.5" fill="#fef08a"/>
        <circle cx="23" cy="27" r="2" fill="#ef4444" class="animate-pulse"/>
        <circle cx="37" cy="27" r="3.5" fill="#fef08a"/>
        <circle cx="37" cy="27" r="2" fill="#ef4444" class="animate-pulse"/>
        <!-- Sharp teeth -->
        <polygon points="24,36 25,40 26,36" fill="#f5f5f4"/>
        <polygon points="28,37 29,41 30,37" fill="#f5f5f4"/>
        <polygon points="32,37 33,41 34,37" fill="#f5f5f4"/>
        <polygon points="34,36 35,40 36,36" fill="#f5f5f4"/>
        <!-- Green drool -->
        <circle cx="27" cy="41" r="1" fill="#4ade80" opacity="0.7"/>
        <circle cx="33" cy="42" r="1.2" fill="#4ade80" opacity="0.6"/>
        <!-- Ears -->
        <ellipse cx="20" cy="20" rx="4" ry="6" fill="#8b7355" transform="rotate(-15,20,20)"/>
        <ellipse cx="20" cy="20" rx="2.5" ry="4" fill="#d4a574" transform="rotate(-15,20,20)"/>
        <ellipse cx="40" cy="20" rx="4" ry="6" fill="#8b7355" transform="rotate(15,40,20)"/>
        <ellipse cx="40" cy="20" rx="2.5" ry="4" fill="#d4a574" transform="rotate(15,40,20)"/>
        <!-- Whiskers -->
        <line x1="18" y1="33" x2="8" y2="31" stroke="#a0896e" stroke-width="0.5"/>
        <line x1="18" y1="35" x2="8" y2="36" stroke="#a0896e" stroke-width="0.5"/>
        <line x1="42" y1="33" x2="52" y2="31" stroke="#a0896e" stroke-width="0.5"/>
        <line x1="42" y1="35" x2="52" y2="36" stroke="#a0896e" stroke-width="0.5"/>
    </svg>`,

    // 9. Corrupted Bear - Large standing bear with glowing red eyes
    ys_bear: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Feet -->
        <rect x="14" y="76" width="12" height="8" rx="3" fill="#3f2a1a"/>
        <rect x="34" y="76" width="12" height="8" rx="3" fill="#3f2a1a"/>
        <!-- Claws -->
        <line x1="16" y1="84" x2="15" y2="87" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="20" y1="84" x2="19" y2="87" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="24" y1="84" x2="23" y2="87" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="36" y1="84" x2="35" y2="87" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="40" y1="84" x2="39" y2="87" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="44" y1="84" x2="43" y2="87" stroke="#1e293b" stroke-width="1.5"/>
        <!-- Legs -->
        <rect x="16" y="62" width="10" height="16" fill="#4a3222"/>
        <rect x="34" y="62" width="10" height="16" fill="#4a3222"/>
        <!-- Body - large -->
        <rect x="10" y="32" width="40" height="32" rx="6" fill="#4a3222"/>
        <!-- Belly -->
        <ellipse cx="30" cy="50" rx="12" ry="10" fill="#5c3d28"/>
        <!-- Purple corruption marks -->
        <path d="M16 40 L20 36 L22 42" stroke="#a855f7" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M42 38 L38 42 L44 44" stroke="#a855f7" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M24 56 L28 52 L26 58" stroke="#a855f7" stroke-width="1.5" fill="none" opacity="0.6"/>
        <circle cx="40" cy="54" r="2" fill="#a855f7" opacity="0.3" class="animate-pulse"/>
        <!-- Scars -->
        <line x1="22" y1="44" x2="28" y2="48" stroke="#dc2626" stroke-width="1" opacity="0.5"/>
        <line x1="34" y1="42" x2="38" y2="46" stroke="#dc2626" stroke-width="1" opacity="0.5"/>
        <!-- Arms -->
        <path d="M10 38 Q0 48 4 60" stroke="#4a3222" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M50 38 Q60 46 56 58" stroke="#4a3222" stroke-width="7" fill="none" stroke-linecap="round"/>
        <!-- Paw claws -->
        <line x1="4" y1="60" x2="1" y2="63" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="4" y1="60" x2="4" y2="64" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="56" y1="58" x2="58" y2="62" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="56" y1="58" x2="56" y2="62" stroke="#1e293b" stroke-width="1.5"/>
        <!-- Head -->
        <rect x="14" y="10" width="32" height="24" rx="8" fill="#4a3222"/>
        <!-- Ears -->
        <circle cx="17" cy="12" r="5" fill="#4a3222"/>
        <circle cx="17" cy="12" r="3" fill="#5c3d28"/>
        <circle cx="43" cy="12" r="5" fill="#4a3222"/>
        <circle cx="43" cy="12" r="3" fill="#5c3d28"/>
        <!-- Snout -->
        <ellipse cx="30" cy="26" rx="7" ry="5" fill="#5c3d28"/>
        <ellipse cx="30" cy="24" rx="3" ry="2" fill="#1e293b"/>
        <!-- Glowing red eyes -->
        <circle cx="22" cy="20" r="3.5" fill="#fca5a5" class="animate-pulse"/>
        <circle cx="22" cy="20" r="2" fill="#ef4444"/>
        <circle cx="38" cy="20" r="3.5" fill="#fca5a5" class="animate-pulse"/>
        <circle cx="38" cy="20" r="2" fill="#ef4444"/>
        <!-- Snarl -->
        <path d="M22 28 Q26 31 30 28 Q34 31 38 28" stroke="#1e293b" stroke-width="1.5" fill="none"/>
        <polygon points="24,28 25,31 26,28" fill="#f5f5f4"/>
        <polygon points="34,28 35,31 36,28" fill="#f5f5f4"/>
    </svg>`,

    // 10. Corrupted Lion - Lion with dark mane and purple energy cracks
    ys_lion: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Tail -->
        <path d="M44 60 Q58 56 56 46 Q54 40 50 42" stroke="#b8860b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="42" rx="3" ry="2" fill="#3f2a1a"/>
        <!-- Feet -->
        <rect x="14" y="78" width="11" height="6" rx="2" fill="#b8860b"/>
        <rect x="35" y="78" width="11" height="6" rx="2" fill="#b8860b"/>
        <!-- Legs - muscular -->
        <rect x="16" y="62" width="9" height="17" fill="#c9951a"/>
        <rect x="36" y="62" width="9" height="17" fill="#c9951a"/>
        <!-- Body -->
        <rect x="12" y="38" width="36" height="26" rx="5" fill="#c9951a"/>
        <!-- Muscles -->
        <ellipse cx="22" cy="48" rx="6" ry="8" fill="#b8860b" opacity="0.4"/>
        <ellipse cx="38" cy="48" rx="6" ry="8" fill="#b8860b" opacity="0.4"/>
        <!-- Purple corruption cracks -->
        <path d="M18 42 L22 46 L20 52" stroke="#a855f7" stroke-width="1.5" fill="none" opacity="0.8"/>
        <path d="M42 44 L38 48 L40 54" stroke="#a855f7" stroke-width="1.5" fill="none" opacity="0.8"/>
        <path d="M28 56 L32 52 L34 58" stroke="#a855f7" stroke-width="1.2" fill="none" opacity="0.6"/>
        <!-- Arms -->
        <path d="M12 42 Q2 50 6 62" stroke="#c9951a" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M48 42 Q58 48 54 60" stroke="#c9951a" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- Claws -->
        <line x1="6" y1="62" x2="3" y2="65" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="6" y1="62" x2="6" y2="66" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="54" y1="60" x2="56" y2="64" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="54" y1="60" x2="54" y2="64" stroke="#1e293b" stroke-width="1.5"/>
        <!-- Mane -->
        <circle cx="30" cy="22" r="18" fill="#3f2a1a"/>
        <circle cx="16" cy="18" r="5" fill="#2e1f13"/>
        <circle cx="44" cy="18" r="5" fill="#2e1f13"/>
        <circle cx="14" cy="28" r="4" fill="#2e1f13"/>
        <circle cx="46" cy="28" r="4" fill="#2e1f13"/>
        <circle cx="22" cy="10" r="4" fill="#2e1f13"/>
        <circle cx="38" cy="10" r="4" fill="#2e1f13"/>
        <!-- Face -->
        <ellipse cx="30" cy="24" rx="11" ry="10" fill="#c9951a"/>
        <!-- Snout -->
        <ellipse cx="30" cy="28" rx="5" ry="4" fill="#daa520"/>
        <ellipse cx="30" cy="26" rx="2.5" ry="1.5" fill="#1e293b"/>
        <!-- Glowing red eyes -->
        <circle cx="24" cy="22" r="3" fill="#fca5a5" class="animate-pulse"/>
        <circle cx="24" cy="22" r="1.5" fill="#ef4444"/>
        <circle cx="36" cy="22" r="3" fill="#fca5a5" class="animate-pulse"/>
        <circle cx="36" cy="22" r="1.5" fill="#ef4444"/>
        <!-- Snarling mouth -->
        <path d="M24 30 Q27 33 30 30 Q33 33 36 30" stroke="#1e293b" stroke-width="1.2" fill="none"/>
        <polygon points="25,30 26,33 27,30" fill="#f5f5f4"/>
        <polygon points="33,30 34,33 35,30" fill="#f5f5f4"/>
    </svg>`,

    // 11. Corrupted Crocodile - Large croc with armored scales
    ys_crocodile: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Tail -->
        <path d="M38 66 Q52 68 56 60 Q58 52 54 48" stroke="#2d5016" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Tail spines -->
        <polygon points="48,62 50,58 52,62" fill="#1a3a0a"/>
        <polygon points="54,54 56,50 58,54" fill="#1a3a0a"/>
        <!-- Feet -->
        <rect x="14" y="78" width="12" height="6" rx="2" fill="#2d5016"/>
        <rect x="34" y="78" width="12" height="6" rx="2" fill="#2d5016"/>
        <!-- Claws -->
        <line x1="16" y1="84" x2="14" y2="87" stroke="#1a3a0a" stroke-width="1.5"/>
        <line x1="20" y1="84" x2="18" y2="87" stroke="#1a3a0a" stroke-width="1.5"/>
        <line x1="36" y1="84" x2="34" y2="87" stroke="#1a3a0a" stroke-width="1.5"/>
        <line x1="40" y1="84" x2="38" y2="87" stroke="#1a3a0a" stroke-width="1.5"/>
        <!-- Legs -->
        <rect x="16" y="64" width="10" height="16" fill="#366b1e"/>
        <rect x="36" y="64" width="10" height="16" fill="#366b1e"/>
        <!-- Body - wide, armored -->
        <rect x="8" y="38" width="44" height="28" rx="5" fill="#366b1e"/>
        <!-- Armored scale plates -->
        <rect x="14" y="40" width="8" height="6" rx="1" fill="#2d5016" stroke="#1a3a0a" stroke-width="0.5"/>
        <rect x="24" y="40" width="8" height="6" rx="1" fill="#2d5016" stroke="#1a3a0a" stroke-width="0.5"/>
        <rect x="34" y="40" width="8" height="6" rx="1" fill="#2d5016" stroke="#1a3a0a" stroke-width="0.5"/>
        <rect x="18" y="48" width="8" height="6" rx="1" fill="#2d5016" stroke="#1a3a0a" stroke-width="0.5"/>
        <rect x="28" y="48" width="8" height="6" rx="1" fill="#2d5016" stroke="#1a3a0a" stroke-width="0.5"/>
        <!-- Purple corruption marks -->
        <path d="M16 56 L20 52 L18 58" stroke="#a855f7" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M40 54 L44 50 L42 56" stroke="#a855f7" stroke-width="1.5" fill="none" opacity="0.7"/>
        <circle cx="32" cy="58" r="2" fill="#a855f7" opacity="0.25" class="animate-pulse"/>
        <!-- Belly -->
        <ellipse cx="30" cy="60" rx="14" ry="6" fill="#4a7c2e"/>
        <!-- Arms -->
        <path d="M8 44 Q0 52 4 62" stroke="#366b1e" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M52 44 Q60 50 56 60" stroke="#366b1e" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- Head - massive jaw -->
        <rect x="10" y="14" width="40" height="26" rx="6" fill="#366b1e"/>
        <!-- Upper jaw -->
        <rect x="8" y="22" width="44" height="12" rx="4" fill="#2d5016"/>
        <!-- Lower jaw open -->
        <rect x="12" y="34" width="36" height="8" rx="3" fill="#4a7c2e"/>
        <!-- Teeth - upper -->
        <polygon points="14,34 15,37 16,34" fill="#f5f5f4"/>
        <polygon points="20,34 21,37 22,34" fill="#f5f5f4"/>
        <polygon points="26,34 27,37 28,34" fill="#f5f5f4"/>
        <polygon points="32,34 33,37 34,34" fill="#f5f5f4"/>
        <polygon points="38,34 39,37 40,34" fill="#f5f5f4"/>
        <polygon points="44,34 45,37 46,34" fill="#f5f5f4"/>
        <!-- Teeth - lower -->
        <polygon points="17,38 18,35 19,38" fill="#f5f5f4"/>
        <polygon points="23,38 24,35 25,38" fill="#f5f5f4"/>
        <polygon points="29,38 30,35 31,38" fill="#f5f5f4"/>
        <polygon points="35,38 36,35 37,38" fill="#f5f5f4"/>
        <polygon points="41,38 42,35 43,38" fill="#f5f5f4"/>
        <!-- Eyes - glowing -->
        <circle cx="20" cy="20" r="4" fill="#fef08a" class="animate-pulse"/>
        <circle cx="20" cy="20" r="2" fill="#ef4444"/>
        <circle cx="40" cy="20" r="4" fill="#fef08a" class="animate-pulse"/>
        <circle cx="40" cy="20" r="2" fill="#ef4444"/>
        <!-- Ridges -->
        <rect x="26" y="14" width="8" height="3" rx="1" fill="#2d5016"/>
    </svg>`,

    // 12. Land Shark - Shark with mechanical legs
    ys_shark: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Mechanical legs -->
        <!-- Back left leg -->
        <rect x="14" y="68" width="4" height="8" fill="#71717a"/>
        <rect x="12" y="76" width="8" height="4" rx="1" fill="#52525b"/>
        <circle cx="16" cy="72" r="2" fill="#9ca3af" stroke="#52525b" stroke-width="0.5"/>
        <!-- Back right leg -->
        <rect x="22" y="68" width="4" height="8" fill="#71717a"/>
        <rect x="20" y="76" width="8" height="4" rx="1" fill="#52525b"/>
        <circle cx="24" cy="72" r="2" fill="#9ca3af" stroke="#52525b" stroke-width="0.5"/>
        <!-- Front left leg -->
        <rect x="34" y="68" width="4" height="8" fill="#71717a"/>
        <rect x="32" y="76" width="8" height="4" rx="1" fill="#52525b"/>
        <circle cx="36" cy="72" r="2" fill="#9ca3af" stroke="#52525b" stroke-width="0.5"/>
        <!-- Front right leg -->
        <rect x="42" y="68" width="4" height="8" fill="#71717a"/>
        <rect x="40" y="76" width="8" height="4" rx="1" fill="#52525b"/>
        <circle cx="44" cy="72" r="2" fill="#9ca3af" stroke="#52525b" stroke-width="0.5"/>
        <!-- Leg attachment plate -->
        <rect x="10" y="62" width="40" height="8" rx="2" fill="#9ca3af"/>
        <circle cx="16" cy="66" r="1.5" fill="#52525b"/>
        <circle cx="24" cy="66" r="1.5" fill="#52525b"/>
        <circle cx="36" cy="66" r="1.5" fill="#52525b"/>
        <circle cx="44" cy="66" r="1.5" fill="#52525b"/>
        <!-- Body - shark -->
        <ellipse cx="30" cy="46" rx="22" ry="18" fill="#64748b"/>
        <!-- Belly -->
        <ellipse cx="30" cy="52" rx="16" ry="10" fill="#cbd5e1"/>
        <!-- Dorsal fin -->
        <polygon points="28,28 30,14 34,28" fill="#475569"/>
        <!-- Tail fin -->
        <polygon points="6,38 2,30 2,48 8,42" fill="#475569"/>
        <!-- Side fins -->
        <polygon points="18,52 8,58 18,56" fill="#475569"/>
        <polygon points="42,52 52,58 42,56" fill="#475569"/>
        <!-- Gills -->
        <line x1="38" y1="40" x2="38" y2="46" stroke="#475569" stroke-width="1"/>
        <line x1="42" y1="40" x2="42" y2="46" stroke="#475569" stroke-width="1"/>
        <line x1="46" y1="40" x2="46" y2="46" stroke="#475569" stroke-width="1"/>
        <!-- Head / snout area -->
        <ellipse cx="52" cy="44" rx="8" ry="10" fill="#64748b"/>
        <!-- Eye -->
        <circle cx="50" cy="40" r="3" fill="white"/>
        <circle cx="51" cy="40" r="1.5" fill="#1e293b"/>
        <!-- Massive teeth / mouth -->
        <path d="M48 48 L58 48" stroke="#475569" stroke-width="1.5"/>
        <polygon points="49,48 50,52 51,48" fill="#f5f5f4"/>
        <polygon points="52,48 53,52 54,48" fill="#f5f5f4"/>
        <polygon points="55,48 56,52 57,48" fill="#f5f5f4"/>
        <polygon points="50,48 51,44 52,48" fill="#f5f5f4"/>
        <polygon points="53,48 54,44 55,48" fill="#f5f5f4"/>
    </svg>`,

    // 13. Rabid Wolf - Snarling wolf with foam at mouth
    ys_wolf: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Tail - bushy -->
        <path d="M46 56 Q58 50 54 40 Q50 34 46 38" stroke="#4b5563" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Back legs -->
        <rect x="36" y="70" width="7" height="14" rx="1" fill="#4b5563"/>
        <rect x="44" y="70" width="7" height="14" rx="1" fill="#374151"/>
        <rect x="35" y="80" width="9" height="5" rx="2" fill="#1f2937"/>
        <rect x="43" y="80" width="9" height="5" rx="2" fill="#1f2937"/>
        <!-- Front legs -->
        <rect x="10" y="70" width="7" height="14" rx="1" fill="#4b5563"/>
        <rect x="18" y="70" width="7" height="14" rx="1" fill="#374151"/>
        <rect x="9" y="80" width="9" height="5" rx="2" fill="#1f2937"/>
        <rect x="17" y="80" width="9" height="5" rx="2" fill="#1f2937"/>
        <!-- Body - hunched aggressive -->
        <ellipse cx="30" cy="60" rx="20" ry="14" fill="#4b5563"/>
        <ellipse cx="26" cy="56" rx="16" ry="12" fill="#6b7280"/>
        <!-- Fur texture -->
        <line x1="18" y1="52" x2="20" y2="56" stroke="#374151" stroke-width="0.7"/>
        <line x1="34" y1="50" x2="32" y2="54" stroke="#374151" stroke-width="0.7"/>
        <line x1="40" y1="56" x2="38" y2="60" stroke="#374151" stroke-width="0.7"/>
        <!-- Head -->
        <rect x="4" y="32" width="24" height="20" rx="5" fill="#4b5563"/>
        <!-- Snout - long -->
        <rect x="0" y="38" width="16" height="12" rx="4" fill="#6b7280"/>
        <!-- Ears - pointed -->
        <polygon points="8,32 6,20 14,30" fill="#4b5563"/>
        <polygon points="7,32 7,22 12,30" fill="#374151"/>
        <polygon points="22,32 24,20 16,30" fill="#4b5563"/>
        <polygon points="23,32 23,22 18,30" fill="#374151"/>
        <!-- Eyes - red, aggressive -->
        <circle cx="12" cy="38" r="3" fill="#fca5a5"/>
        <circle cx="12" cy="38" r="1.5" fill="#ef4444" class="animate-pulse"/>
        <circle cx="22" cy="38" r="3" fill="#fca5a5"/>
        <circle cx="22" cy="38" r="1.5" fill="#ef4444" class="animate-pulse"/>
        <!-- Angry brows -->
        <line x1="8" y1="34" x2="14" y2="36" stroke="#1f2937" stroke-width="2"/>
        <line x1="26" y1="34" x2="20" y2="36" stroke="#1f2937" stroke-width="2"/>
        <!-- Nose -->
        <ellipse cx="4" cy="40" rx="2.5" ry="2" fill="#1f2937"/>
        <!-- Snarling mouth with teeth -->
        <path d="M4 46 L16 46" stroke="#1f2937" stroke-width="1.5"/>
        <polygon points="5,46 6,50 7,46" fill="#f5f5f4"/>
        <polygon points="9,46 10,50 11,46" fill="#f5f5f4"/>
        <polygon points="13,46 14,50 15,46" fill="#f5f5f4"/>
        <!-- Foam at mouth -->
        <circle cx="6" cy="48" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="10" cy="49" r="1" fill="white" opacity="0.7"/>
        <circle cx="14" cy="48" r="1.2" fill="white" opacity="0.8"/>
        <circle cx="8" cy="50" r="0.8" fill="white" opacity="0.6"/>
        <circle cx="12" cy="50" r="1" fill="white" opacity="0.5"/>
    </svg>`,

    // 14. Rambo Soldier - Muscular soldier with bandana and machine gun
    ys_rambo_soldier: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Boots -->
        <rect x="16" y="76" width="11" height="8" rx="2" fill="#1c1917"/>
        <rect x="33" y="76" width="11" height="8" rx="2" fill="#1c1917"/>
        <!-- Boot laces -->
        <line x1="18" y1="78" x2="25" y2="78" stroke="#44403c" stroke-width="0.5"/>
        <line x1="18" y1="80" x2="25" y2="80" stroke="#44403c" stroke-width="0.5"/>
        <line x1="35" y1="78" x2="42" y2="78" stroke="#44403c" stroke-width="0.5"/>
        <line x1="35" y1="80" x2="42" y2="80" stroke="#44403c" stroke-width="0.5"/>
        <!-- Legs - camo pants -->
        <rect x="18" y="58" width="9" height="20" fill="#4d7c0f"/>
        <rect x="33" y="58" width="9" height="20" fill="#4d7c0f"/>
        <!-- Camo patches on pants -->
        <rect x="20" y="62" width="4" height="4" rx="1" fill="#3f6212" opacity="0.6"/>
        <rect x="35" y="66" width="5" height="3" rx="1" fill="#365314" opacity="0.6"/>
        <rect x="19" y="70" width="3" height="5" rx="1" fill="#365314" opacity="0.5"/>
        <!-- Body - muscular, bare chest -->
        <rect x="12" y="32" width="36" height="28" rx="4" fill="#c9956c"/>
        <!-- Pecs -->
        <ellipse cx="24" cy="40" rx="6" ry="4" fill="#b8845e" opacity="0.5"/>
        <ellipse cx="36" cy="40" rx="6" ry="4" fill="#b8845e" opacity="0.5"/>
        <!-- Abs -->
        <line x1="30" y1="44" x2="30" y2="56" stroke="#b8845e" stroke-width="0.8" opacity="0.4"/>
        <line x1="24" y1="48" x2="36" y2="48" stroke="#b8845e" stroke-width="0.5" opacity="0.3"/>
        <line x1="24" y1="52" x2="36" y2="52" stroke="#b8845e" stroke-width="0.5" opacity="0.3"/>
        <!-- Ammo belt across chest -->
        <line x1="14" y1="36" x2="46" y2="54" stroke="#a16207" stroke-width="3"/>
        <rect x="16" y="35" width="2" height="3" fill="#ca8a04" transform="rotate(25,17,36)"/>
        <rect x="22" y="39" width="2" height="3" fill="#ca8a04" transform="rotate(25,23,40)"/>
        <rect x="28" y="43" width="2" height="3" fill="#ca8a04" transform="rotate(25,29,44)"/>
        <rect x="34" y="47" width="2" height="3" fill="#ca8a04" transform="rotate(25,35,48)"/>
        <rect x="40" y="51" width="2" height="3" fill="#ca8a04" transform="rotate(25,41,52)"/>
        <!-- Left arm -->
        <path d="M12 36 Q2 44 6 56" stroke="#c9956c" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="6" cy="56" r="3" fill="#b8845e"/>
        <!-- Right arm holding gun -->
        <path d="M48 36 Q56 40 52 50" stroke="#c9956c" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- Machine gun -->
        <rect x="48" y="48" width="12" height="4" rx="1" fill="#44403c"/>
        <rect x="56" y="46" width="4" height="8" rx="1" fill="#57534e"/>
        <rect x="50" y="44" width="3" height="4" rx="1" fill="#44403c"/>
        <circle cx="60" cy="50" r="1.5" fill="#1c1917"/>
        <!-- Head -->
        <rect x="18" y="10" width="24" height="22" rx="5" fill="#c9956c"/>
        <!-- Bandana -->
        <rect x="16" y="10" width="28" height="7" rx="2" fill="#dc2626"/>
        <!-- Bandana tail -->
        <path d="M44 13 L52 16 L50 10" fill="#dc2626"/>
        <!-- Hair -->
        <rect x="18" y="8" width="24" height="5" rx="2" fill="#1c1917"/>
        <!-- Eyes - intense -->
        <circle cx="24" cy="22" r="2.5" fill="white"/>
        <circle cx="36" cy="22" r="2.5" fill="white"/>
        <circle cx="25" cy="22" r="1.5" fill="#1e293b"/>
        <circle cx="37" cy="22" r="1.5" fill="#1e293b"/>
        <!-- Angry brows -->
        <line x1="21" y1="18" x2="27" y2="20" stroke="#1c1917" stroke-width="1.5"/>
        <line x1="39" y1="18" x2="33" y2="20" stroke="#1c1917" stroke-width="1.5"/>
        <!-- Nose -->
        <polygon points="29,24 30,27 31,24" fill="#b8845e"/>
        <!-- Mouth - gritted teeth -->
        <rect x="25" y="28" width="10" height="3" rx="1" fill="#1e293b"/>
        <line x1="28" y1="28" x2="28" y2="31" stroke="#f5f5f4" stroke-width="0.5"/>
        <line x1="30" y1="28" x2="30" y2="31" stroke="#f5f5f4" stroke-width="0.5"/>
        <line x1="32" y1="28" x2="32" y2="31" stroke="#f5f5f4" stroke-width="0.5"/>
    </svg>`,

    // 15. Desert Sniper - Soldier in desert camo with sniper rifle
    ys_sniper: `<svg viewBox="0 0 60 90" class="w-full h-full">
        <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
        <!-- Boots -->
        <rect x="17" y="78" width="10" height="6" rx="2" fill="#92400e"/>
        <rect x="33" y="78" width="10" height="6" rx="2" fill="#92400e"/>
        <!-- Legs - desert camo pants -->
        <rect x="19" y="60" width="8" height="19" fill="#d4a76a"/>
        <rect x="33" y="60" width="8" height="19" fill="#d4a76a"/>
        <!-- Camo on pants -->
        <rect x="20" y="64" width="4" height="4" rx="1" fill="#b8945a" opacity="0.6"/>
        <rect x="34" y="68" width="5" height="3" rx="1" fill="#a78a4e" opacity="0.6"/>
        <rect x="21" y="72" width="3" height="4" rx="1" fill="#c4a060" opacity="0.5"/>
        <!-- Body - desert camo jacket -->
        <rect x="14" y="34" width="32" height="28" rx="3" fill="#c4a060"/>
        <!-- Camo patches -->
        <rect x="18" y="38" width="6" height="5" rx="1" fill="#b8945a" opacity="0.5"/>
        <rect x="30" y="42" width="8" height="4" rx="1" fill="#a78a4e" opacity="0.5"/>
        <rect x="16" y="50" width="5" height="6" rx="1" fill="#d4a76a" opacity="0.4"/>
        <rect x="36" y="52" width="6" height="5" rx="1" fill="#b8945a" opacity="0.4"/>
        <!-- Ghillie suit elements - strips hanging -->
        <line x1="14" y1="36" x2="10" y2="42" stroke="#6b8e23" stroke-width="1.5"/>
        <line x1="16" y1="38" x2="12" y2="46" stroke="#556b2f" stroke-width="1.5"/>
        <line x1="46" y1="36" x2="50" y2="44" stroke="#6b8e23" stroke-width="1.5"/>
        <line x1="44" y1="38" x2="48" y2="46" stroke="#556b2f" stroke-width="1.5"/>
        <line x1="20" y1="58" x2="18" y2="64" stroke="#6b8e23" stroke-width="1"/>
        <line x1="40" y1="58" x2="42" y2="64" stroke="#556b2f" stroke-width="1"/>
        <!-- Utility belt -->
        <rect x="14" y="56" width="32" height="4" rx="1" fill="#78716c"/>
        <rect x="20" y="55" width="4" height="6" rx="1" fill="#57534e"/>
        <rect x="36" y="55" width="4" height="6" rx="1" fill="#57534e"/>
        <!-- Left arm -->
        <path d="M14 40 Q4 48 8 58" stroke="#c4a060" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="8" cy="58" r="2.5" fill="#d4a76a"/>
        <!-- Right arm holding rifle -->
        <path d="M46 40 Q54 44 50 54" stroke="#c4a060" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Sniper rifle -->
        <rect x="46" y="28" width="3" height="28" rx="1" fill="#44403c"/>
        <!-- Scope -->
        <rect x="44" y="32" width="7" height="3" rx="1" fill="#1e293b"/>
        <circle cx="44" cy="33.5" r="2" fill="#52525b"/>
        <circle cx="44" cy="33.5" r="1" fill="#93c5fd" opacity="0.5"/>
        <!-- Barrel -->
        <rect x="47" y="22" width="2" height="8" fill="#374151"/>
        <!-- Stock -->
        <rect x="45" y="54" width="5" height="6" rx="1" fill="#78553a"/>
        <!-- Head -->
        <rect x="18" y="10" width="24" height="24" rx="5" fill="#c4a060"/>
        <!-- Goggles -->
        <rect x="18" y="16" width="24" height="8" rx="3" fill="#1e293b"/>
        <circle cx="24" cy="20" r="4" fill="#374151" stroke="#6b7280" stroke-width="1"/>
        <circle cx="24" cy="20" r="2.5" fill="#fbbf24" opacity="0.4"/>
        <circle cx="36" cy="20" r="4" fill="#374151" stroke="#6b7280" stroke-width="1"/>
        <circle cx="36" cy="20" r="2.5" fill="#fbbf24" opacity="0.4"/>
        <!-- Head wrapping / shemagh -->
        <rect x="16" y="8" width="28" height="10" rx="3" fill="#d4a76a"/>
        <rect x="18" y="24" width="24" height="6" rx="2" fill="#d4a76a"/>
        <!-- Mouth area visible -->
        <line x1="26" y1="28" x2="34" y2="28" stroke="#a0764e" stroke-width="1"/>
        <!-- Ghillie on head -->
        <line x1="16" y1="10" x2="12" y2="14" stroke="#6b8e23" stroke-width="1.5"/>
        <line x1="18" y1="8" x2="16" y2="12" stroke="#556b2f" stroke-width="1.5"/>
        <line x1="42" y1="8" x2="46" y2="12" stroke="#6b8e23" stroke-width="1.5"/>
        <line x1="44" y1="10" x2="48" y2="14" stroke="#556b2f" stroke-width="1.5"/>
    </svg>`,

};

if (typeof vectors !== 'undefined') Object.assign(vectors, ysEnemyVectorsA);
