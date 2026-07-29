// Character Combat Animation Frames
// Extends vectors object with attack and injured poses for all 17 characters
(function() {
    // Upgrade existing string entries to {idle, attack, injured}
    function upgradeVector(key, attackSvg, injuredSvg) {
        var existing = vectors[key];
        if (typeof existing === 'string') {
            vectors[key] = { idle: existing, attack: attackSvg, injured: injuredSvg };
        } else if (existing && existing.idle) {
            existing.attack = attackSvg;
            existing.injured = injuredSvg;
        }
    }
    // Create new entries with all 3 frames
    function createVector(key, idleSvg, attackSvg, injuredSvg) {
        vectors[key] = { idle: idleSvg, attack: attackSvg, injured: injuredSvg };
    }

    // ========================================================================
    // 1. SHELDON - Brain Attack
    // ========================================================================
    upgradeVector('sheldon',
        // ATTACK: Hands gripping head, brain energy waves
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="20" y="66" width="8" height="18" fill="#7c2d12"/>
            <rect x="32" y="66" width="8" height="18" fill="#7c2d12"/>
            <rect x="20" y="46" width="8" height="20" fill="#1e40af"/>
            <rect x="32" y="46" width="8" height="20" fill="#1e40af"/>
            <rect x="16" y="20" width="28" height="34" fill="#dc2626" rx="2"/>
            <circle cx="30" cy="35" r="7" fill="#ffffff"/>
            <polygon points="31,29 26,36 31,36 29,41 35,34 30,34" fill="#eab308"/>
            <!-- Arms bent up gripping head -->
            <path d="M 16,24 L 12,24 L 12,12 L 18,8" stroke="#dc2626" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M 44,24 L 48,24 L 48,12 L 42,8" stroke="#dc2626" stroke-width="4" fill="none" stroke-linecap="round"/>
            <circle cx="18" cy="8" r="3" fill="#fed7aa"/>
            <circle cx="42" cy="8" r="3" fill="#fed7aa"/>
            <!-- Head tilted back -->
            <rect x="20" y="3" width="20" height="18" fill="#fed7aa" rx="2"/>
            <path d="M 18,5 Q 30,-2 42,5 L 43,1 Q 30,-5 17,1 Z" fill="#451a03"/>
            <rect x="20" y="1" width="20" height="4" fill="#2d1a0e"/>
            <!-- Eyes squeezed shut -->
            <line x1="24" y1="11" x2="28" y2="11" stroke="#1d4ed8" stroke-width="1.5"/>
            <line x1="32" y1="11" x2="36" y2="11" stroke="#1d4ed8" stroke-width="1.5"/>
            <!-- Mouth open wide -->
            <ellipse cx="30" cy="17" rx="3" ry="2" fill="#7c2d12"/>
            <!-- Green brain energy waves -->
            <path d="M 15,6 Q 12,2 15,-1" stroke="#22c55e" stroke-width="1.5" fill="none" opacity="0.8"/>
            <path d="M 45,6 Q 48,2 45,-1" stroke="#22c55e" stroke-width="1.5" fill="none" opacity="0.8"/>
            <path d="M 30,-2 Q 28,-5 30,-7" stroke="#22c55e" stroke-width="1.5" fill="none" opacity="0.7"/>
            <circle cx="13" cy="3" r="2" fill="#22c55e" opacity="0.4"/>
            <circle cx="47" cy="3" r="2" fill="#22c55e" opacity="0.4"/>
        </svg>`,
        // INJURED: Idle + bandage + bruise + shirt tear
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="20" y="66" width="8" height="18" fill="#7c2d12"/>
            <rect x="32" y="66" width="8" height="18" fill="#7c2d12"/>
            <rect x="20" y="46" width="8" height="20" fill="#1e40af"/>
            <rect x="32" y="46" width="8" height="20" fill="#1e40af"/>
            <!-- Torn shirt -->
            <rect x="16" y="20" width="12" height="34" fill="#dc2626" rx="2"/>
            <rect x="30" y="20" width="14" height="34" fill="#dc2626" rx="2"/>
            <rect x="28" y="30" width="2" height="8" fill="#1e40af"/>
            <circle cx="30" cy="35" r="7" fill="#ffffff"/>
            <polygon points="31,29 26,36 31,36 29,41 35,34 30,34" fill="#eab308"/>
            <rect x="12" y="24" width="4" height="24" fill="#dc2626"/>
            <rect x="44" y="24" width="4" height="24" fill="#dc2626"/>
            <rect x="12" y="48" width="4" height="4" fill="#fed7aa"/>
            <rect x="44" y="48" width="4" height="4" fill="#fed7aa"/>
            <rect x="20" y="5" width="20" height="18" fill="#fed7aa" rx="2"/>
            <path d="M 18,7 Q 30,0 42,7 L 43,3 Q 30,-3 17,3 Z" fill="#451a03"/>
            <rect x="20" y="3" width="20" height="4" fill="#2d1a0e"/>
            <rect x="25" y="11" width="2" height="2" fill="#ffffff"/>
            <rect x="33" y="11" width="2" height="2" fill="#ffffff"/>
            <rect x="25.5" y="11.5" width="1" height="1" fill="#1d4ed8"/>
            <rect x="33.5" y="11.5" width="1" height="1" fill="#1d4ed8"/>
            <line x1="28" y1="18" x2="32" y2="18" stroke="#b45309" stroke-width="1"/>
            <!-- Bandage on forehead -->
            <rect x="22" y="5" width="16" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>
            <!-- Bruise on left cheek -->
            <circle cx="25" cy="16" r="2.5" fill="#7c3aed" opacity="0.45"/>
        </svg>`
    );

    // ========================================================================
    // 2. LEONARD - Sword Swing
    // ========================================================================
    upgradeVector('leonard',
        // ATTACK: Body lunged forward, sword swung horizontal
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="32" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="14" y="74" width="10" height="11" fill="#451a03"/>
            <rect x="36" y="74" width="10" height="11" fill="#451a03"/>
            <rect x="14" y="52" width="10" height="22" fill="#1e3a8a"/>
            <rect x="36" y="52" width="10" height="22" fill="#1e3a8a"/>
            <!-- Torso shifted right for lunge -->
            <rect x="18" y="24" width="28" height="28" fill="#15803d" rx="2"/>
            <rect x="26" y="24" width="12" height="28" fill="#4b5563"/>
            <rect x="28" y="30" width="8" height="15" fill="#ef4444"/>
            <line x1="26" y1="24" x2="26" y2="52" stroke="#14532d" stroke-width="2"/>
            <line x1="38" y1="24" x2="38" y2="52" stroke="#14532d" stroke-width="2"/>
            <!-- Left arm back -->
            <rect x="8" y="28" width="6" height="18" fill="#15803d"/>
            <rect x="9" y="46" width="4" height="4" fill="#fed7aa"/>
            <!-- Right arm swung with horizontal sword -->
            <path d="M 46,26 L 54,34" stroke="#15803d" stroke-width="8" stroke-linecap="round"/>
            <circle cx="55" cy="36" r="3" fill="#fed7aa"/>
            <!-- Sword horizontal slash -->
            <g transform="rotate(-75 55 36)">
                <rect x="47" y="34" width="16" height="4" fill="#d97706"/>
                <rect x="53" y="38" width="4" height="10" fill="#78350f"/>
                <path d="M 53,34 L 53,6 L 55,0 L 57,6 L 57,34 Z" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
                <polygon points="55,0 57,6 57,34 55,34" fill="#f3f4f6"/>
            </g>
            <!-- Motion lines -->
            <line x1="48" y1="18" x2="56" y2="22" stroke="#e5e7eb" stroke-width="1" opacity="0.6"/>
            <line x1="46" y1="14" x2="54" y2="18" stroke="#e5e7eb" stroke-width="1" opacity="0.4"/>
            <rect x="20" y="8" width="20" height="18" fill="#fed7aa" rx="2"/>
            <path d="M 18,10 Q 30,0 42,10 L 43,6 Q 30,-2 17,6 Z" fill="#451a03"/>
            <rect x="21" y="13" width="8" height="6" fill="none" stroke="#111827" stroke-width="2"/>
            <rect x="31" y="13" width="8" height="6" fill="none" stroke="#111827" stroke-width="2"/>
            <line x1="29" y1="16" x2="31" y2="16" stroke="#111827" stroke-width="2"/>
            <rect x="24" y="15" width="2" height="2" fill="#000"/>
            <rect x="34" y="15" width="2" height="2" fill="#000"/>
            <line x1="28" y1="22" x2="32" y2="22" stroke="#b45309" stroke-width="1"/>
        </svg>`,
        // INJURED: Bandage, cracked lens, bruise
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="18" y="74" width="10" height="11" fill="#451a03"/>
            <rect x="32" y="74" width="10" height="11" fill="#451a03"/>
            <rect x="18" y="52" width="10" height="22" fill="#1e3a8a"/>
            <rect x="32" y="52" width="10" height="22" fill="#1e3a8a"/>
            <rect x="16" y="24" width="28" height="28" fill="#15803d" rx="2"/>
            <rect x="24" y="24" width="12" height="28" fill="#4b5563"/>
            <rect x="26" y="30" width="8" height="15" fill="#ef4444"/>
            <line x1="24" y1="24" x2="24" y2="52" stroke="#14532d" stroke-width="2"/>
            <line x1="36" y1="24" x2="36" y2="52" stroke="#14532d" stroke-width="2"/>
            <rect x="10" y="26" width="8" height="20" fill="#15803d"/>
            <rect x="12" y="46" width="4" height="4" fill="#fed7aa"/>
            <path d="M 44,26 L 52,38" stroke="#15803d" stroke-width="8" stroke-linecap="round"/>
            <circle cx="53" cy="40" r="3" fill="#fed7aa"/>
            <g transform="rotate(-15 53 40)">
                <rect x="45" y="38" width="16" height="4" fill="#d97706"/>
                <rect x="51" y="42" width="4" height="10" fill="#78350f"/>
                <path d="M 51,38 L 51,10 L 53,4 L 55,10 L 55,38 Z" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
                <polygon points="53,4 55,10 55,38 53,38" fill="#f3f4f6"/>
            </g>
            <rect x="20" y="8" width="20" height="18" fill="#fed7aa" rx="2"/>
            <path d="M 18,10 Q 30,0 42,10 L 43,6 Q 30,-2 17,6 Z" fill="#451a03"/>
            <!-- Bandage over hair -->
            <rect x="19" y="6" width="22" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>
            <!-- Glasses with cracked left lens -->
            <rect x="21" y="13" width="8" height="6" fill="none" stroke="#111827" stroke-width="2"/>
            <line x1="22" y1="14" x2="27" y2="18" stroke="#ef4444" stroke-width="0.8" opacity="0.7"/>
            <rect x="31" y="13" width="8" height="6" fill="none" stroke="#111827" stroke-width="2"/>
            <line x1="29" y1="16" x2="31" y2="16" stroke="#111827" stroke-width="2"/>
            <rect x="24" y="15" width="2" height="2" fill="#000"/>
            <rect x="34" y="15" width="2" height="2" fill="#000"/>
            <line x1="28" y1="22" x2="32" y2="22" stroke="#b45309" stroke-width="1"/>
            <!-- Bruise on cheek -->
            <circle cx="36" cy="20" r="2" fill="#7c3aed" opacity="0.4"/>
        </svg>`
    );

    // ========================================================================
    // 3. PENNY - Food Throw / Rage
    // ========================================================================
    upgradeVector('penny',
        // ATTACK: Shouting + throwing hamburger
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <path d="M 20,10 C 10,20 12,48 20,45 C 25,40 35,40 40,45 C 48,48 50,20 40,10 Z" fill="#facc15"/>
            <rect x="22" y="66" width="6" height="18" fill="#fed7aa"/>
            <rect x="32" y="66" width="6" height="18" fill="#fed7aa"/>
            <rect x="20" y="52" width="20" height="14" fill="#1d4ed8" rx="2"/>
            <path d="M 18,26 Q 30,35 22,52 L 38,52 Q 30,35 42,26 Z" fill="#ec4899"/>
            <path d="M 22,26 Q 30,35 38,26 Z" fill="#f472b6"/>
            <!-- Left arm pointing forward -->
            <path d="M 18,26 Q 8,35 6,40" stroke="#fed7aa" stroke-width="4" fill="none" stroke-linecap="round"/>
            <circle cx="5" cy="41" r="2" fill="#fed7aa"/>
            <!-- Right arm pulled back with hamburger -->
            <path d="M 42,26 Q 52,20 54,14" stroke="#fed7aa" stroke-width="4" fill="none" stroke-linecap="round"/>
            <circle cx="54" cy="13" r="2" fill="#fed7aa"/>
            <!-- Hamburger -->
            <circle cx="54" cy="8" r="5" fill="#92400e"/>
            <rect x="49" y="7" width="10" height="2" fill="#22c55e"/>
            <rect x="49" y="9" width="10" height="1.5" fill="#ef4444"/>
            <!-- Head -->
            <rect x="22" y="10" width="16" height="18" fill="#fed7aa" rx="4"/>
            <!-- Hair flowing back -->
            <path d="M 20,14 C 20,-2 40,-2 42,14 C 44,16 25,16 20,14 Z" fill="#eab308"/>
            <!-- Angry eyes -->
            <circle cx="26" cy="18" r="1.5" fill="#2563eb"/>
            <circle cx="34" cy="18" r="1.5" fill="#2563eb"/>
            <!-- Angry eyebrows -->
            <line x1="23" y1="15" x2="28" y2="16" stroke="#451a03" stroke-width="1.5"/>
            <line x1="37" y1="16" x2="32" y2="15" stroke="#451a03" stroke-width="1.5"/>
            <!-- Mouth wide open shouting -->
            <ellipse cx="30" cy="25" rx="3" ry="2" fill="#7c2d12"/>
            <line x1="27" y1="24" x2="33" y2="24" stroke="#f8fafc" stroke-width="0.8"/>
        </svg>`,
        // INJURED: Bandage, bruise, messy hair
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <path d="M 20,10 C 10,20 12,48 20,45 C 25,40 35,40 40,45 C 48,48 50,20 40,10 Z" fill="#facc15"/>
            <!-- Stray hair strands -->
            <path d="M 15,30 Q 12,25 14,20" stroke="#eab308" stroke-width="1.5" fill="none"/>
            <path d="M 45,28 Q 48,23 46,18" stroke="#eab308" stroke-width="1.5" fill="none"/>
            <rect x="22" y="66" width="6" height="18" fill="#fed7aa"/>
            <rect x="32" y="66" width="6" height="18" fill="#fed7aa"/>
            <rect x="20" y="52" width="20" height="14" fill="#1d4ed8" rx="2"/>
            <path d="M 18,26 Q 30,35 22,52 L 38,52 Q 30,35 42,26 Z" fill="#ec4899"/>
            <path d="M 22,26 Q 30,35 38,26 Z" fill="#f472b6"/>
            <path d="M 18,26 Q 10,40 14,50" stroke="#fed7aa" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M 42,26 Q 50,40 46,50" stroke="#fed7aa" stroke-width="4" fill="none" stroke-linecap="round"/>
            <!-- Bandage on right arm -->
            <rect x="44" y="38" width="6" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>
            <rect x="22" y="10" width="16" height="18" fill="#fed7aa" rx="4"/>
            <path d="M 20,14 C 20,-2 40,-2 40,14 C 35,16 25,16 20,14 Z" fill="#eab308"/>
            <circle cx="26" cy="18" r="1.5" fill="#2563eb"/>
            <circle cx="34" cy="18" r="1.5" fill="#2563eb"/>
            <path d="M 27,24 Q 30,26 33,24" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
            <!-- Bruise under left eye -->
            <ellipse cx="25" cy="20" rx="2.5" ry="1.5" fill="#7c3aed" opacity="0.4"/>
        </svg>`
    );

    // ========================================================================
    // 4. HOWARD - Rocket Launcher
    // ========================================================================
    upgradeVector('howard',
        // ATTACK: Aiming rocket launcher
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="16" y="75" width="9" height="11" fill="#7c2d12"/>
            <rect x="35" y="75" width="9" height="11" fill="#7c2d12"/>
            <rect x="17" y="50" width="10" height="25" fill="#ea580c"/>
            <rect x="33" y="50" width="10" height="25" fill="#ea580c"/>
            <rect x="18" y="46" width="24" height="4" fill="#000"/>
            <circle cx="30" cy="48" r="4" fill="#a8a29e"/>
            <circle cx="29" cy="47" r="1" fill="#22c55e"/>
            <circle cx="31" cy="47" r="1" fill="#52525b"/>
            <rect x="16" y="24" width="28" height="22" fill="#7c3f12" rx="2"/>
            <rect x="24" y="22" width="12" height="8" fill="#a855f7"/>
            <rect x="26" y="20" width="8" height="4" fill="#a855f7"/>
            <!-- Left arm supporting launcher -->
            <path d="M 16,26 L 10,18 L 14,14" stroke="#7c3f12" stroke-width="5" fill="none" stroke-linecap="round"/>
            <circle cx="14" cy="13" r="3" fill="#fed7aa"/>
            <!-- Right arm holding launcher -->
            <path d="M 44,26 L 48,18 L 46,12" stroke="#7c3f12" stroke-width="5" fill="none" stroke-linecap="round"/>
            <circle cx="46" cy="11" r="3" fill="#fed7aa"/>
            <!-- Rocket launcher on shoulder -->
            <rect x="10" y="8" width="40" height="6" fill="#6b7280" rx="2"/>
            <rect x="10" y="9" width="6" height="4" fill="#4b5563"/>
            <circle cx="52" cy="11" r="4" fill="#ef4444"/>
            <circle cx="52" cy="11" r="2" fill="#fbbf24"/>
            <!-- Antenna glowing -->
            <path d="M 44,30 Q 55,20 50,10 L 45,5" fill="none" stroke="#9ca3af" stroke-width="3"/>
            <circle cx="50" cy="10" r="3" fill="#ef4444" opacity="0.7"/>
            <circle cx="50" cy="10" r="5" fill="#ef4444" opacity="0.3"/>
            <path d="M 45,5 L 42,2 M 45,5 L 48,2" stroke="#ef4444" stroke-width="2" fill="none"/>
            <rect x="22" y="8" width="16" height="16" fill="#fed7aa" rx="2"/>
            <path d="M 20,12 Q 30,0 40,12 L 42,16 L 18,16 Z" fill="#2d1a0e"/>
            <circle cx="26" cy="17" r="1.5" fill="#000"/>
            <circle cx="34" cy="17" r="1.5" fill="#000"/>
            <path d="M 28,21 Q 30,22 32,21" fill="none" stroke="#b45309" stroke-width="1"/>
        </svg>`,
        // INJURED: Bandage, bent antenna, bruise
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="19" y="75" width="9" height="11" fill="#7c2d12"/>
            <rect x="32" y="75" width="9" height="11" fill="#7c2d12"/>
            <rect x="20" y="50" width="8" height="25" fill="#ea580c"/>
            <rect x="32" y="50" width="8" height="25" fill="#ea580c"/>
            <rect x="18" y="46" width="24" height="4" fill="#000"/>
            <circle cx="30" cy="48" r="4" fill="#a8a29e"/>
            <circle cx="29" cy="47" r="1" fill="#22c55e"/>
            <circle cx="31" cy="47" r="1" fill="#52525b"/>
            <rect x="16" y="24" width="28" height="22" fill="#7c3f12" rx="2"/>
            <rect x="24" y="22" width="12" height="8" fill="#a855f7"/>
            <rect x="26" y="20" width="8" height="4" fill="#a855f7"/>
            <rect x="12" y="26" width="6" height="20" fill="#7c3f12"/>
            <rect x="13" y="46" width="4" height="4" fill="#fed7aa"/>
            <rect x="42" y="26" width="6" height="20" fill="#7c3f12"/>
            <rect x="42" y="44" width="6" height="10" fill="#374151" rx="1"/>
            <circle cx="45" cy="47" r="1.5" fill="#ef4444"/>
            <circle cx="45" cy="51" r="1" fill="#3b82f6"/>
            <!-- Bent antenna -->
            <path d="M 44,30 Q 55,22 52,14 L 50,12 L 48,14" fill="none" stroke="#9ca3af" stroke-width="3"/>
            <circle cx="50" cy="12" r="2" fill="#4b5563"/>
            <path d="M 48,14 L 46,16" stroke="#9ca3af" stroke-width="2" fill="none"/>
            <rect x="22" y="8" width="16" height="16" fill="#fed7aa" rx="2"/>
            <path d="M 20,12 Q 30,0 40,12 L 42,16 L 18,16 Z" fill="#2d1a0e"/>
            <!-- Bandage on forehead -->
            <rect x="21" y="8" width="18" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>
            <circle cx="26" cy="17" r="1.5" fill="#000"/>
            <circle cx="34" cy="17" r="1.5" fill="#000"/>
            <path d="M 28,21 Q 30,22 32,21" fill="none" stroke="#b45309" stroke-width="1"/>
            <!-- Bruise on cheek -->
            <circle cx="35" cy="20" r="2" fill="#7c3aed" opacity="0.4"/>
        </svg>`
    );

    // ========================================================================
    // 5. RAJ - Sun Wand Attack
    // ========================================================================
    upgradeVector('raj',
        // ATTACK: Arm raised with golden wand, sun orb
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="83" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="18" y="73" width="10" height="10" fill="#1c1917"/>
            <rect x="32" y="73" width="10" height="10" fill="#1c1917"/>
            <rect x="20" y="53" width="8" height="20" fill="#78350f"/>
            <rect x="32" y="53" width="8" height="20" fill="#78350f"/>
            <rect x="16" y="24" width="28" height="29" fill="#7f1d1d" rx="1"/>
            <rect x="22" y="24" width="16" height="29" fill="#1e3a8a"/>
            <polygon points="22,24 30,32 38,24" fill="#f8fafc"/>
            <polygon points="26,24 30,28 34,24" fill="#92400e"/>
            <!-- Left arm extended forward palm out -->
            <path d="M 16,26 L 6,34" stroke="#7f1d1d" stroke-width="6" fill="none" stroke-linecap="round"/>
            <rect x="8" y="26" width="2" height="24" fill="#f8fafc" opacity="0.8"/>
            <circle cx="5" cy="35" r="3" fill="#92400e"/>
            <!-- Right arm raised high with wand -->
            <path d="M 44,26 L 48,14 L 46,4" stroke="#7f1d1d" stroke-width="6" fill="none" stroke-linecap="round"/>
            <rect x="46" y="26" width="2" height="24" fill="#f8fafc" opacity="0.8"/>
            <circle cx="46" cy="3" r="2.5" fill="#92400e"/>
            <!-- Golden wand -->
            <rect x="45" y="-10" width="2" height="14" fill="#d97706"/>
            <!-- Sun orb at tip -->
            <circle cx="46" cy="-12" r="5" fill="#facc15"/>
            <circle cx="46" cy="-12" r="7" fill="#fde047" opacity="0.3"/>
            <!-- Sun rays -->
            <line x1="46" y1="-20" x2="46" y2="-18" stroke="#fde047" stroke-width="1.5"/>
            <line x1="39" y1="-12" x2="41" y2="-12" stroke="#fde047" stroke-width="1.5"/>
            <line x1="51" y1="-12" x2="53" y2="-12" stroke="#fde047" stroke-width="1.5"/>
            <line x1="41" y1="-17" x2="42.5" y2="-15.5" stroke="#fde047" stroke-width="1"/>
            <line x1="51" y1="-17" x2="49.5" y2="-15.5" stroke="#fde047" stroke-width="1"/>
            <!-- Golden sparkle particles -->
            <circle cx="20" cy="10" r="1.5" fill="#fde047" opacity="0.6"/>
            <circle cx="38" cy="18" r="1" fill="#fde047" opacity="0.5"/>
            <circle cx="12" cy="20" r="1.5" fill="#fde047" opacity="0.4"/>
            <rect x="20" y="8" width="20" height="16" fill="#92400e" rx="1"/>
            <rect x="18" y="4" width="24" height="6" fill="#171717" rx="2"/>
            <rect x="17" y="8" width="4" height="6" fill="#171717" rx="1"/>
            <rect x="39" y="8" width="4" height="6" fill="#171717" rx="1"/>
            <rect x="24" y="13" width="3" height="3" fill="#ffffff"/>
            <rect x="33" y="13" width="3" height="3" fill="#ffffff"/>
            <rect x="25" y="14" width="1.5" height="1.5" fill="#000000"/>
            <rect x="34" y="14" width="1.5" height="1.5" fill="#000000"/>
            <rect x="27" y="20" width="6" height="1.5" fill="#451a03"/>
        </svg>`,
        // INJURED: Bandage, bruise, tear
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="18" y="75" width="10" height="10" fill="#1c1917"/>
            <rect x="32" y="75" width="10" height="10" fill="#1c1917"/>
            <rect x="20" y="55" width="8" height="20" fill="#78350f"/>
            <rect x="32" y="55" width="8" height="20" fill="#78350f"/>
            <rect x="16" y="26" width="28" height="29" fill="#7f1d1d" rx="1"/>
            <!-- Jacket tear -->
            <rect x="40" y="35" width="4" height="2" fill="#1e3a8a"/>
            <rect x="22" y="26" width="16" height="29" fill="#1e3a8a"/>
            <polygon points="22,26 30,34 38,26" fill="#f8fafc"/>
            <polygon points="26,26 30,30 34,26" fill="#92400e"/>
            <rect x="10" y="26" width="6" height="24" fill="#7f1d1d"/>
            <rect x="44" y="26" width="6" height="24" fill="#7f1d1d"/>
            <rect x="12" y="26" width="2" height="24" fill="#f8fafc" opacity="0.8"/>
            <rect x="46" y="26" width="2" height="24" fill="#f8fafc" opacity="0.8"/>
            <!-- Bandage on left arm -->
            <rect x="9" y="38" width="8" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>
            <rect x="10" y="50" width="6" height="5" fill="#92400e"/>
            <rect x="44" y="50" width="6" height="5" fill="#92400e"/>
            <rect x="20" y="10" width="20" height="16" fill="#92400e" rx="1"/>
            <rect x="18" y="6" width="24" height="6" fill="#171717" rx="2"/>
            <rect x="17" y="10" width="4" height="6" fill="#171717" rx="1"/>
            <rect x="39" y="10" width="4" height="6" fill="#171717" rx="1"/>
            <rect x="24" y="15" width="3" height="3" fill="#ffffff"/>
            <rect x="33" y="15" width="3" height="3" fill="#ffffff"/>
            <rect x="25" y="16" width="1.5" height="1.5" fill="#000000"/>
            <rect x="34" y="16" width="1.5" height="1.5" fill="#000000"/>
            <rect x="27" y="22" width="6" height="1.5" fill="#451a03"/>
            <!-- Bruise on right cheek -->
            <circle cx="36" cy="20" r="2" fill="#7c3aed" opacity="0.4"/>
        </svg>`
    );

    // ========================================================================
    // 6. AMY - Chemical Throw
    // ========================================================================
    upgradeVector('amy',
        // ATTACK: Arms extended, chemical splash
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="20" y="76" width="8" height="10" fill="#451a03"/>
            <rect x="32" y="76" width="8" height="10" fill="#451a03"/>
            <path d="M 18,52 L 42,52 L 44,76 L 16,76 Z" fill="#78350f"/>
            <rect x="16" y="26" width="28" height="26" fill="#14532d" rx="2"/>
            <rect x="24" y="26" width="12" height="26" fill="#cbd5e1"/>
            <rect x="24" y="30" width="12" height="2" fill="#94a3b8"/>
            <rect x="24" y="36" width="12" height="2" fill="#94a3b8"/>
            <rect x="24" y="42" width="12" height="2" fill="#94a3b8"/>
            <rect x="24" y="48" width="12" height="2" fill="#94a3b8"/>
            <!-- Arms extended forward throwing -->
            <path d="M 16,28 L 4,32 L -2,30" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M 44,28 L 56,32 L 62,30" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>
            <!-- Hands spread -->
            <circle cx="-2" cy="30" r="2.5" fill="#fed7aa"/>
            <circle cx="62" cy="30" r="2.5" fill="#fed7aa"/>
            <!-- Chemical drops flying -->
            <circle cx="-6" cy="28" r="2" fill="#22c55e" opacity="0.7"/>
            <circle cx="-4" cy="34" r="1.5" fill="#22c55e" opacity="0.6"/>
            <circle cx="-8" cy="31" r="1" fill="#22c55e" opacity="0.5"/>
            <circle cx="66" cy="28" r="2" fill="#22c55e" opacity="0.7"/>
            <circle cx="64" cy="34" r="1.5" fill="#22c55e" opacity="0.6"/>
            <rect x="20" y="8" width="20" height="18" fill="#fed7aa" rx="2"/>
            <path d="M 18,10 Q 30,0 42,10 L 44,40 L 40,40 L 40,15 Q 30,5 20,15 L 20,40 L 16,40 Z" fill="#2d1a0e"/>
            <rect x="21" y="14" width="7" height="4" fill="none" stroke="#111827" stroke-width="1.5"/>
            <rect x="32" y="14" width="7" height="4" fill="none" stroke="#111827" stroke-width="1.5"/>
            <line x1="28" y1="16" x2="32" y2="16" stroke="#111827" stroke-width="1.5"/>
            <rect x="24" y="15" width="1.5" height="1.5" fill="#000"/>
            <rect x="35" y="15" width="1.5" height="1.5" fill="#000"/>
            <line x1="28" y1="22" x2="32" y2="22" stroke="#b45309" stroke-width="1"/>
        </svg>`,
        // INJURED: Bandage, cracked glasses, bruise
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="20" y="76" width="8" height="10" fill="#451a03"/>
            <rect x="32" y="76" width="8" height="10" fill="#451a03"/>
            <path d="M 18,52 L 42,52 L 44,76 L 16,76 Z" fill="#78350f"/>
            <rect x="16" y="26" width="28" height="26" fill="#14532d" rx="2"/>
            <rect x="24" y="26" width="12" height="26" fill="#cbd5e1"/>
            <rect x="24" y="30" width="12" height="2" fill="#94a3b8"/>
            <rect x="24" y="36" width="12" height="2" fill="#94a3b8"/>
            <rect x="24" y="42" width="12" height="2" fill="#94a3b8"/>
            <rect x="24" y="48" width="12" height="2" fill="#94a3b8"/>
            <rect x="10" y="28" width="6" height="22" fill="#14532d"/>
            <rect x="44" y="28" width="6" height="22" fill="#14532d"/>
            <rect x="11" y="50" width="4" height="4" fill="#fed7aa"/>
            <rect x="45" y="50" width="4" height="4" fill="#fed7aa"/>
            <rect x="20" y="8" width="20" height="18" fill="#fed7aa" rx="2"/>
            <path d="M 18,10 Q 30,0 42,10 L 44,40 L 40,40 L 40,15 Q 30,5 20,15 L 20,40 L 16,40 Z" fill="#2d1a0e"/>
            <!-- Bandage on forehead -->
            <rect x="21" y="9" width="18" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>
            <!-- Cracked left lens -->
            <rect x="21" y="14" width="7" height="4" fill="none" stroke="#111827" stroke-width="1.5"/>
            <line x1="22" y1="15" x2="26" y2="17" stroke="#ef4444" stroke-width="0.7" opacity="0.7"/>
            <rect x="32" y="14" width="7" height="4" fill="none" stroke="#111827" stroke-width="1.5"/>
            <line x1="28" y1="16" x2="32" y2="16" stroke="#111827" stroke-width="1.5"/>
            <rect x="24" y="15" width="1.5" height="1.5" fill="#000"/>
            <rect x="35" y="15" width="1.5" height="1.5" fill="#000"/>
            <line x1="28" y1="22" x2="32" y2="22" stroke="#b45309" stroke-width="1"/>
            <!-- Bruise on chin -->
            <circle cx="30" cy="24" r="2" fill="#7c3aed" opacity="0.4"/>
        </svg>`
    );

    // ========================================================================
    // 7. BERNIE - Divine Healing
    // ========================================================================
    upgradeVector('bernie',
        // ATTACK: Arms spread, golden halo, healing rays, floating
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="10" ry="2.5" fill="rgba(0,0,0,0.12)"/>
            <!-- Hair background -->
            <path d="M 18,11 C 18,-3 42,-3 42,11 C 48,17 46,35 40,35 C 38,27 22,27 20,35 C 14,35 12,17 18,11 Z" fill="#fde047"/>
            <rect x="23" y="59" width="4" height="15" fill="#171717"/>
            <rect x="33" y="59" width="4" height="15" fill="#171717"/>
            <rect x="22" y="74" width="6" height="8" fill="#171717"/>
            <rect x="32" y="74" width="6" height="8" fill="#171717"/>
            <!-- Dress (shifted up - floating) -->
            <path d="M 18,29 Q 30,37 20,59 L 40,59 Q 30,37 42,29 Z" fill="#f472b6"/>
            <circle cx="25" cy="47" r="1.5" fill="#fbcfe8"/>
            <circle cx="35" cy="52" r="1.5" fill="#fbcfe8"/>
            <circle cx="30" cy="42" r="1.5" fill="#fbcfe8"/>
            <rect x="18" y="27" width="24" height="14" fill="#fcd34d" rx="2"/>
            <path d="M 26,27 L 30,35 L 34,27 Z" fill="#f472b6"/>
            <!-- Arms spread wide UP and outward -->
            <path d="M 18,29 Q 6,20 2,14" stroke="#fcd34d" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M 42,29 Q 54,20 58,14" stroke="#fcd34d" stroke-width="5" fill="none" stroke-linecap="round"/>
            <circle cx="2" cy="13" r="2.5" fill="#fed7aa"/>
            <circle cx="58" cy="13" r="2.5" fill="#fed7aa"/>
            <!-- Golden healing rays from hands -->
            <line x1="2" y1="14" x2="2" y2="22" stroke="#fde047" stroke-width="1.5" opacity="0.7"/>
            <line x1="0" y1="14" x2="-2" y2="22" stroke="#fde047" stroke-width="1" opacity="0.5"/>
            <line x1="4" y1="14" x2="6" y2="22" stroke="#fde047" stroke-width="1" opacity="0.5"/>
            <line x1="58" y1="14" x2="58" y2="22" stroke="#fde047" stroke-width="1.5" opacity="0.7"/>
            <line x1="56" y1="14" x2="54" y2="22" stroke="#fde047" stroke-width="1" opacity="0.5"/>
            <line x1="60" y1="14" x2="62" y2="22" stroke="#fde047" stroke-width="1" opacity="0.5"/>
            <!-- Golden halo above head -->
            <ellipse cx="30" cy="5" rx="10" ry="3" fill="none" stroke="#fbbf24" stroke-width="1.5" opacity="0.8"/>
            <ellipse cx="30" cy="5" rx="12" ry="4" fill="none" stroke="#fde047" stroke-width="1" opacity="0.3"/>
            <!-- Head -->
            <rect x="22" y="11" width="16" height="16" fill="#fed7aa" rx="3"/>
            <path d="M 20,13 C 20,1 40,1 40,13 C 36,15 24,15 20,13 Z" fill="#facc15"/>
            <!-- Red glasses -->
            <rect x="23" y="16" width="6" height="4" fill="none" stroke="#ef4444" stroke-width="1.5" rx="1"/>
            <rect x="31" y="16" width="6" height="4" fill="none" stroke="#ef4444" stroke-width="1.5" rx="1"/>
            <line x1="29" y1="18" x2="31" y2="18" stroke="#ef4444" stroke-width="1.5"/>
            <circle cx="26" cy="18" r="1" fill="#000"/>
            <circle cx="34" cy="18" r="1" fill="#000"/>
            <!-- Serene smile -->
            <path d="M 28,23 Q 30,25 32,23" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
        </svg>`,
        // INJURED: Bandage, bruise, tilted glasses
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="13" ry="3" fill="rgba(0,0,0,0.2)"/>
            <path d="M 18,14 C 18,0 42,0 42,14 C 48,20 46,38 40,38 C 38,30 22,30 20,38 C 14,38 12,20 18,14 Z" fill="#fde047"/>
            <rect x="23" y="62" width="4" height="15" fill="#171717"/>
            <rect x="33" y="62" width="4" height="15" fill="#171717"/>
            <rect x="22" y="77" width="6" height="8" fill="#171717"/>
            <rect x="32" y="77" width="6" height="8" fill="#171717"/>
            <path d="M 18,32 Q 30,40 20,62 L 40,62 Q 30,40 42,32 Z" fill="#f472b6"/>
            <circle cx="25" cy="50" r="1.5" fill="#fbcfe8"/>
            <circle cx="35" cy="55" r="1.5" fill="#fbcfe8"/>
            <circle cx="30" cy="45" r="1.5" fill="#fbcfe8"/>
            <rect x="18" y="30" width="24" height="14" fill="#fcd34d" rx="2"/>
            <path d="M 26,30 L 30,38 L 34,30 Z" fill="#f472b6"/>
            <path d="M 18,32 Q 12,45 16,52" stroke="#fcd34d" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M 42,32 Q 48,45 44,52" stroke="#fcd34d" stroke-width="5" fill="none" stroke-linecap="round"/>
            <!-- Bandage on arm -->
            <rect x="14" y="42" width="6" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>
            <circle cx="16" cy="53" r="2.5" fill="#fed7aa"/>
            <circle cx="44" cy="53" r="2.5" fill="#fed7aa"/>
            <rect x="22" y="14" width="16" height="16" fill="#fed7aa" rx="3"/>
            <path d="M 20,16 C 20,4 40,4 40,16 C 36,18 24,18 20,16 Z" fill="#facc15"/>
            <!-- Slightly tilted glasses -->
            <g transform="rotate(3 30 20)">
                <rect x="23" y="19" width="6" height="4" fill="none" stroke="#ef4444" stroke-width="1.5" rx="1"/>
                <rect x="31" y="19" width="6" height="4" fill="none" stroke="#ef4444" stroke-width="1.5" rx="1"/>
                <line x1="29" y1="21" x2="31" y2="21" stroke="#ef4444" stroke-width="1.5"/>
            </g>
            <circle cx="26" cy="21" r="1" fill="#000"/>
            <circle cx="34" cy="21" r="1" fill="#000"/>
            <path d="M 28,26 Q 30,28 32,26" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
            <!-- Bruise on cheek -->
            <circle cx="36" cy="24" r="2" fill="#7c3aed" opacity="0.4"/>
        </svg>`
    );

    // ========================================================================
    // 8. STUART - Lightsaber Swing
    // ========================================================================
    upgradeVector('stuart',
        // ATTACK: Horizontal saber slash
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="15" y="74" width="10" height="11" fill="#27272a"/>
            <rect x="35" y="74" width="10" height="11" fill="#27272a"/>
            <rect x="15" y="52" width="10" height="22" fill="#52525b"/>
            <rect x="35" y="52" width="10" height="22" fill="#52525b"/>
            <!-- Torso twisted -->
            <rect x="14" y="24" width="32" height="28" fill="#71717a" rx="2"/>
            <rect x="22" y="24" width="16" height="26" fill="#7f1d1d"/>
            <line x1="22" y1="24" x2="22" y2="52" stroke="#52525b" stroke-width="2"/>
            <line x1="38" y1="24" x2="38" y2="52" stroke="#52525b" stroke-width="2"/>
            <!-- Both arms gripping saber swung left -->
            <path d="M 14,28 L 4,34" stroke="#71717a" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M 46,28 L 10,34" stroke="#71717a" stroke-width="4" fill="none" stroke-linecap="round"/>
            <circle cx="4" cy="35" r="2.5" fill="#fde68a"/>
            <circle cx="8" cy="35" r="2" fill="#fde68a"/>
            <!-- Horizontal lightsaber -->
            <rect x="-15" y="33" width="20" height="2" fill="#ffffff" stroke="#3b82f6" stroke-width="2" rx="1"/>
            <!-- Hilt -->
            <rect x="3" y="32" width="2" height="6" fill="#4b5563"/>
            <rect x="4" y="33" width="8" height="4" fill="#9ca3af" rx="1"/>
            <!-- Motion arc -->
            <path d="M 50,10 Q 30,20 -10,34" stroke="#3b82f6" stroke-width="2" fill="none" opacity="0.25"/>
            <path d="M 48,14 Q 28,24 -8,36" stroke="#60a5fa" stroke-width="1" fill="none" opacity="0.15"/>
            <rect x="20" y="8" width="20" height="18" fill="#fde68a" rx="2"/>
            <path d="M 18,12 Q 30,2 42,12 L 40,6 Q 30,0 20,6 Z" fill="#451a03"/>
            <ellipse cx="25" cy="18" rx="3" ry="2" fill="#d97706" opacity="0.3"/>
            <ellipse cx="35" cy="18" rx="3" ry="2" fill="#d97706" opacity="0.3"/>
            <circle cx="25" cy="17" r="1.5" fill="#000"/>
            <circle cx="35" cy="17" r="1.5" fill="#000"/>
            <path d="M 27,24 Q 30,22 33,24" fill="none" stroke="#b45309" stroke-width="1"/>
        </svg>`,
        // INJURED: Extra dark circles, bandage, torn hoodie
        `<svg viewBox="0 0 60 90" class="w-full h-full">
            <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
            <rect x="18" y="74" width="10" height="11" fill="#27272a"/>
            <rect x="32" y="74" width="10" height="11" fill="#27272a"/>
            <rect x="18" y="52" width="10" height="22" fill="#52525b"/>
            <rect x="32" y="52" width="10" height="22" fill="#52525b"/>
            <!-- Torn hoodie -->
            <rect x="16" y="24" width="12" height="28" fill="#71717a" rx="2"/>
            <rect x="30" y="24" width="14" height="28" fill="#71717a" rx="2"/>
            <rect x="28" y="32" width="2" height="6" fill="#52525b"/>
            <rect x="24" y="24" width="12" height="26" fill="#7f1d1d"/>
            <line x1="24" y1="24" x2="24" y2="52" stroke="#52525b" stroke-width="2"/>
            <line x1="36" y1="24" x2="36" y2="52" stroke="#52525b" stroke-width="2"/>
            <rect x="12" y="26" width="6" height="20" fill="#71717a"/>
            <rect x="13" y="46" width="4" height="4" fill="#fde68a"/>
            <path d="M 44,26 L 46,42" stroke="#71717a" stroke-width="6" stroke-linecap="round"/>
            <circle cx="46" cy="44" r="2.5" fill="#fde68a"/>
            <!-- Dimmer lightsaber -->
            <g transform="rotate(15 46 44)">
                <rect x="45" y="14" width="2" height="28" fill="#ffffff" stroke="#3b82f6" stroke-width="1.5" rx="1" opacity="0.6"/>
                <rect x="43" y="41" width="6" height="2" fill="#4b5563" rx="0.5"/>
                <rect x="44" y="42" width="4" height="10" fill="#9ca3af" rx="1"/>
                <line x1="44" y1="45" x2="48" y2="45" stroke="#111827" stroke-width="1"/>
                <line x1="44" y1="48" x2="48" y2="48" stroke="#111827" stroke-width="1"/>
            </g>
            <rect x="20" y="8" width="20" height="18" fill="#fde68a" rx="2"/>
            <path d="M 18,12 Q 30,2 42,12 L 40,6 Q 30,0 20,6 Z" fill="#451a03"/>
            <!-- Bandage on head -->
            <rect x="19" y="6" width="22" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>
            <!-- Extra heavy dark circles -->
            <ellipse cx="25" cy="18" rx="4" ry="2.5" fill="#d97706" opacity="0.5"/>
            <ellipse cx="35" cy="18" rx="4" ry="2.5" fill="#d97706" opacity="0.5"/>
            <circle cx="25" cy="17" r="1.5" fill="#000"/>
            <circle cx="35" cy="17" r="1.5" fill="#000"/>
            <path d="M 27,24 Q 30,22 33,24" fill="none" stroke="#b45309" stroke-width="1"/>
        </svg>`
    );

    // ========================================================================
    // 9. MARY COOPER - Divine Healing
    // Original: Teal top (#14b8a6), teal skirt (#0d9488), golden necklace cross (#fbbf24),
    //   blonde hair (#fde047/#facc15), skin #fed7aa, black shoes #171717
    // ========================================================================
    upgradeVector('mary',
        // ATTACK: Arms raised, divine cross glowing above
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="21" y="76" width="7" height="8" fill="#171717"/><rect x="32" y="76" width="7" height="8" fill="#171717"/><rect x="22" y="62" width="5" height="14" fill="#fed7aa"/><rect x="33" y="62" width="5" height="14" fill="#fed7aa"/><path d="M 18,42 L 42,42 L 45,62 L 15,62 Z" fill="#0d9488"/><rect x="18" y="24" width="24" height="18" fill="#14b8a6" rx="2"/><path d="M 24,24 Q 30,28 36,24" fill="none" stroke="#fcd34d" stroke-width="1.5"/><rect x="29" y="28" width="2" height="6" fill="#fbbf24"/><rect x="27.5" y="30" width="5" height="2" fill="#fbbf24"/><!-- Arms raised up and outward --><path d="M 14,26 L 4,10" stroke="#14b8a6" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M 46,26 L 56,10" stroke="#14b8a6" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="3" cy="9" r="3" fill="#fed7aa"/><circle cx="57" cy="9" r="3" fill="#fed7aa"/><!-- Golden divine cross above head --><rect x="28" y="-8" width="4" height="14" fill="#fbbf24"/><rect x="23" y="-4" width="14" height="4" fill="#fbbf24"/><!-- Healing rays --><line x1="10" y1="8" x2="10" y2="18" stroke="#fde047" stroke-width="1" opacity="0.5"/><line x1="50" y1="8" x2="50" y2="18" stroke="#fde047" stroke-width="1" opacity="0.5"/><rect x="20" y="6" width="20" height="20" fill="#fed7aa" rx="4"/><path d="M 18,10 C 18,0 42,0 42,10 C 42,14 40,14 38,14 L 22,14 C 20,14 18,14 18,10 Z" fill="#fde047"/><rect x="17" y="10" width="5" height="12" rx="2" fill="#facc15"/><rect x="38" y="10" width="5" height="12" rx="2" fill="#facc15"/><!-- Eyes closed peacefully --><line x1="24" y1="17" x2="28" y2="17" stroke="#1c1917" stroke-width="1.5"/><line x1="32" y1="17" x2="36" y2="17" stroke="#1c1917" stroke-width="1.5"/><path d="M 27,22 Q 30,25 33,22" fill="none" stroke="#f43f5e" stroke-width="1.5"/></svg>`,
        // INJURED
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="21" y="76" width="7" height="8" fill="#171717"/><rect x="32" y="76" width="7" height="8" fill="#171717"/><rect x="22" y="62" width="5" height="14" fill="#fed7aa"/><rect x="33" y="62" width="5" height="14" fill="#fed7aa"/><path d="M 18,42 L 42,42 L 45,62 L 15,62 Z" fill="#0d9488"/><rect x="18" y="24" width="24" height="18" fill="#14b8a6" rx="2"/><path d="M 24,24 Q 30,28 36,24" fill="none" stroke="#fcd34d" stroke-width="1.5"/><rect x="29" y="28" width="2" height="6" fill="#fbbf24"/><rect x="27.5" y="30" width="5" height="2" fill="#fbbf24"/><path d="M 14,26 Q 10,38 16,46" stroke="#14b8a6" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M 46,26 Q 50,38 44,46" stroke="#14b8a6" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="28" cy="42" r="3" fill="#fed7aa"/><circle cx="32" cy="42" r="3" fill="#fed7aa"/><!-- Bandage on arm --><rect x="9" y="36" width="8" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/><rect x="20" y="6" width="20" height="20" fill="#fed7aa" rx="4"/><path d="M 18,10 C 18,0 42,0 42,10 C 42,14 40,14 38,14 L 22,14 C 20,14 18,14 18,10 Z" fill="#fde047"/><rect x="17" y="10" width="5" height="12" rx="2" fill="#facc15"/><rect x="38" y="10" width="5" height="12" rx="2" fill="#facc15"/><circle cx="26" cy="17" r="1.5" fill="#1c1917"/><circle cx="34" cy="17" r="1.5" fill="#1c1917"/><!-- Worried frown --><path d="M 27,23 Q 30,21 33,23" fill="none" stroke="#f43f5e" stroke-width="1.5"/><!-- Bruise on cheek --><circle cx="36" cy="20" r="2" fill="#7c3aed" opacity="0.4"/></svg>`
    );

    // ========================================================================
    // 10. BEVERLY HOFSTADTER - Psychic Force
    // Original: Dark blazer (#1e293b), gray pants (#334155), gray hair (#d1d5db),
    //   glasses (#1f2937), book in hand, skin #fed7aa, dark shoes #111827
    // ========================================================================
    upgradeVector('beverly',
        // ATTACK: Both arms thrust forward, psychic force push, book floating
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="20" y="76" width="8" height="8" fill="#111827"/><rect x="32" y="76" width="8" height="8" fill="#111827"/><rect x="20" y="50" width="8" height="26" fill="#334155"/><rect x="32" y="50" width="8" height="26" fill="#334155"/><rect x="16" y="24" width="28" height="26" fill="#1e293b" rx="2"/><path d="M 26,24 L 30,34 L 34,24 Z" fill="#f8fafc"/><line x1="30" y1="34" x2="30" y2="50" stroke="#e2e8f0" stroke-width="1"/><!-- Both arms thrust forward --><path d="M 48,26 L 58,28" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M 12,26 L 56,30" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.5"/><circle cx="59" cy="28" r="2.5" fill="#fed7aa"/><circle cx="57" cy="31" r="2.5" fill="#fed7aa"/><!-- Psychic lines --><line x1="60" y1="26" x2="66" y2="24" stroke="#a855f7" stroke-width="1.5" opacity="0.6"/><line x1="60" y1="30" x2="68" y2="30" stroke="#a855f7" stroke-width="1.5" opacity="0.6"/><line x1="60" y1="34" x2="66" y2="36" stroke="#a855f7" stroke-width="1.5" opacity="0.6"/><!-- Floating book --><g transform="rotate(-20 8 40)"><rect x="4" y="36" width="8" height="10" fill="#92400e" rx="1"/><rect x="6" y="36" width="4" height="10" fill="#fef9c3"/><rect x="4" y="36" width="2" height="10" fill="#78350f"/></g><rect x="20" y="6" width="20" height="20" fill="#fed7aa" rx="4"/><path d="M 18,10 C 18,2 42,2 42,10 L 42,12 L 18,12 Z" fill="#d1d5db"/><rect x="17" y="10" width="4" height="8" rx="1" fill="#d1d5db"/><rect x="39" y="10" width="4" height="8" rx="1" fill="#d1d5db"/><ellipse cx="30" cy="4" rx="6" ry="4" fill="#9ca3af"/><rect x="22" y="15" width="6" height="4" fill="none" stroke="#1f2937" stroke-width="1.5" rx="0.5"/><rect x="32" y="15" width="6" height="4" fill="none" stroke="#1f2937" stroke-width="1.5" rx="0.5"/><line x1="28" y1="17" x2="32" y2="17" stroke="#1f2937" stroke-width="1.5"/><circle cx="25" cy="17" r="1" fill="#1c1917"/><circle cx="35" cy="17" r="1" fill="#1c1917"/><!-- Stern furrowed brows --><line x1="22" y1="13" x2="26" y2="14" stroke="#451a03" stroke-width="1"/><line x1="38" y1="14" x2="34" y2="13" stroke="#451a03" stroke-width="1"/><line x1="27" y1="22" x2="33" y2="22" stroke="#451a03" stroke-width="1.5"/></svg>`,
        // INJURED
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="20" y="76" width="8" height="8" fill="#111827"/><rect x="32" y="76" width="8" height="8" fill="#111827"/><rect x="20" y="50" width="8" height="26" fill="#334155"/><rect x="32" y="50" width="8" height="26" fill="#334155"/><rect x="16" y="24" width="28" height="26" fill="#1e293b" rx="2"/><path d="M 26,24 L 30,34 L 34,24 Z" fill="#f8fafc"/><line x1="30" y1="34" x2="30" y2="50" stroke="#e2e8f0" stroke-width="1"/><path d="M 12,26 Q 8,38 14,48" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="14" cy="49" r="2.5" fill="#fed7aa"/><path d="M 48,26 Q 52,36 46,42" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="45" cy="43" r="2.5" fill="#fed7aa"/><!-- Damaged book --><g transform="rotate(-10 46 44)"><rect x="40" y="38" width="11" height="14" fill="#92400e" rx="1" opacity="0.7"/><rect x="42" y="38" width="7" height="14" fill="#fef9c3" opacity="0.7"/><rect x="40" y="38" width="2.5" height="14" fill="#78350f" opacity="0.7"/></g><!-- Flying pages --><rect x="2" y="42" width="4" height="3" fill="#f8fafc" transform="rotate(-15 4 43)"/><rect x="14" y="40" width="3" height="2" fill="#f8fafc" transform="rotate(10 15 41)"/><rect x="20" y="6" width="20" height="20" fill="#fed7aa" rx="4"/><path d="M 18,10 C 18,2 42,2 42,10 L 42,12 L 18,12 Z" fill="#d1d5db"/><rect x="17" y="10" width="4" height="8" rx="1" fill="#d1d5db"/><rect x="39" y="10" width="4" height="8" rx="1" fill="#d1d5db"/><ellipse cx="30" cy="4" rx="6" ry="4" fill="#9ca3af"/><!-- Bandage on head --><rect x="19" y="5" width="22" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/><!-- Cracked glasses --><rect x="22" y="15" width="6" height="4" fill="none" stroke="#1f2937" stroke-width="1.5" rx="0.5"/><line x1="23" y1="16" x2="27" y2="18" stroke="#ef4444" stroke-width="0.7"/><rect x="32" y="15" width="6" height="4" fill="none" stroke="#1f2937" stroke-width="1.5" rx="0.5"/><line x1="28" y1="17" x2="32" y2="17" stroke="#1f2937" stroke-width="1.5"/><circle cx="25" cy="17" r="1" fill="#1c1917"/><circle cx="35" cy="17" r="1" fill="#1c1917"/><line x1="27" y1="22" x2="33" y2="22" stroke="#451a03" stroke-width="1.5"/></svg>`
    );

    // ========================================================================
    // 11. PROF. PROTON - Green Lightsaber
    // Original: White lab coat (#f8fafc), blue shirt (#1d4ed8), red tie (#dc2626),
    //   gray pants (#71717a), yellowish skin (#fde68a), white side tufts (#e5e7eb),
    //   lightsaber, dark shoes #27272a
    // ========================================================================
    upgradeVector('proton',
        // ATTACK: Diagonal lightsaber swing
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="18" y="76" width="10" height="8" fill="#27272a"/><rect x="32" y="76" width="10" height="8" fill="#27272a"/><rect x="20" y="55" width="8" height="21" fill="#71717a"/><rect x="32" y="55" width="8" height="21" fill="#71717a"/><path d="M 16,25 L 44,25 L 46,65 L 14,65 Z" fill="#f8fafc"/><line x1="30" y1="25" x2="30" y2="65" stroke="#e2e8f0" stroke-width="2"/><rect x="24" y="25" width="12" height="8" fill="#1d4ed8"/><path d="M 26,33 L 30,45 L 34,33 Z" fill="#dc2626"/><!-- Left arm forward --><path d="M 12,26 L 4,34" stroke="#f8fafc" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="3" cy="35" r="2.5" fill="#fde68a"/><!-- Right arm swinging saber --><path d="M 44,26 L 6,38" stroke="#f8fafc" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.6"/><circle cx="5" cy="39" r="2.5" fill="#fde68a"/><!-- Diagonal green lightsaber --><g transform="rotate(45 4 36)"><rect x="3" y="4" width="2" height="30" fill="#ffffff" stroke="#22c55e" stroke-width="2.5" rx="1"/><rect x="3" y="4" width="2" height="30" fill="#ffffff" filter="drop-shadow(0 0 4px #22c55e)"/><rect x="1" y="33" width="6" height="2" fill="#4b5563"/><rect x="2" y="34" width="4" height="8" fill="#9ca3af" rx="1"/></g><!-- Green motion arc --><path d="M 50,8 Q 30,20 -2,44" stroke="#22c55e" stroke-width="2" fill="none" opacity="0.25"/><rect x="22" y="10" width="16" height="16" fill="#fde68a" rx="3"/><path d="M 18,14 Q 22,8 24,14 Z" fill="#e5e7eb"/><path d="M 42,14 Q 38,8 36,14 Z" fill="#e5e7eb"/><circle cx="26" cy="18" r="1.5" fill="#000"/><circle cx="34" cy="18" r="1.5" fill="#000"/><path d="M 25,15 Q 26,14 27,15" fill="none" stroke="#9ca3af" stroke-width="1"/><path d="M 33,15 Q 34,14 35,15" fill="none" stroke="#9ca3af" stroke-width="1"/><path d="M 28,23 Q 30,25 32,23" fill="none" stroke="#b45309" stroke-width="1.5"/></svg>`,
        // INJURED
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="18" y="76" width="10" height="8" fill="#27272a"/><rect x="32" y="76" width="10" height="8" fill="#27272a"/><rect x="20" y="55" width="8" height="21" fill="#71717a"/><rect x="32" y="55" width="8" height="21" fill="#71717a"/><!-- Torn lab coat --><path d="M 16,25 L 28,25 L 28,65 L 14,65 Z" fill="#f8fafc"/><path d="M 30,25 L 44,25 L 46,65 L 30,65 Z" fill="#f8fafc"/><rect x="24" y="25" width="12" height="8" fill="#1d4ed8"/><path d="M 26,33 L 30,45 L 34,33 Z" fill="#dc2626"/><rect x="12" y="26" width="6" height="20" fill="#f8fafc" rx="1"/><circle cx="15" cy="48" r="2.5" fill="#fde68a"/><path d="M 44,26 L 48,42" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/><circle cx="48" cy="44" r="2.5" fill="#fde68a"/><!-- Dimmer lightsaber --><g transform="rotate(15 48 44)"><rect x="47" y="6" width="2" height="36" fill="#ffffff" stroke="#22c55e" stroke-width="1.5" rx="1" opacity="0.4"/><rect x="46" y="42" width="4" height="12" fill="#9ca3af" rx="1"/></g><rect x="22" y="10" width="16" height="16" fill="#fde68a" rx="3"/><path d="M 18,14 Q 22,8 24,14 Z" fill="#e5e7eb"/><path d="M 42,14 Q 38,8 36,14 Z" fill="#e5e7eb"/><!-- Bandage on head --><rect x="19" y="8" width="22" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/><circle cx="26" cy="18" r="1.5" fill="#000"/><circle cx="34" cy="18" r="1.5" fill="#000"/><path d="M 28,23 Q 30,25 32,23" fill="none" stroke="#b45309" stroke-width="1.5"/><!-- Bruise --><circle cx="36" cy="20" r="2" fill="#7c3aed" opacity="0.4"/></svg>`
    );

    // ========================================================================
    // 12. BARRY KRIPKE - Bow & Arrow
    // Original: Red CT shirt (#dc2626), blue pants (#1e3a8a), messy brown hair (#78350f),
    //   brown shoes (#451a03), bow (#d97706) & arrow, skin #fed7aa
    // ========================================================================
    upgradeVector('kripke',
        // ATTACK: Drawing bowstring back, aiming
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="18" y="76" width="10" height="8" fill="#451a03"/><rect x="32" y="76" width="10" height="8" fill="#451a03"/><rect x="20" y="50" width="8" height="26" fill="#1e3a8a"/><rect x="32" y="50" width="8" height="26" fill="#1e3a8a"/><rect x="16" y="25" width="28" height="25" fill="#dc2626" rx="2"/><text x="30" y="38" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="bold">CT</text><!-- Left arm extended holding bow forward --><path d="M 16,28 L 2,34" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="1" cy="35" r="2.5" fill="#fed7aa"/><!-- Bow --><path d="M -2,24 Q -8,35 -2,46" stroke="#d97706" stroke-width="3" fill="none" stroke-linecap="round"/><!-- Bowstring stretched back --><line x1="-2" y1="24" x2="42" y2="18" stroke="#cbd5e1" stroke-width="1"/><line x1="-2" y1="46" x2="42" y2="18" stroke="#cbd5e1" stroke-width="1"/><!-- Arrow nocked --><line x1="-4" y1="35" x2="42" y2="18" stroke="#92400e" stroke-width="2"/><polygon points="-6,35 -4,33 -4,37" fill="#9ca3af"/><polygon points="40,16 44,18 40,20" fill="#ef4444"/><!-- Right arm drawn back --><path d="M 44,28 L 42,18" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="42" cy="17" r="2.5" fill="#fed7aa"/><rect x="22" y="10" width="16" height="16" fill="#fed7aa" rx="3"/><path d="M 18,12 Q 30,0 42,12 L 44,18 Q 30,-2 16,18 Z" fill="#78350f"/><path d="M 20,8 L 22,12 M 28,6 L 30,10 M 36,8 L 34,12" stroke="#78350f" stroke-width="2"/><!-- Squinting aiming --><line x1="23" y1="17" x2="28" y2="17" stroke="#000" stroke-width="1.5"/><circle cx="34" cy="17" r="1" fill="#000"/><path d="M 27,22 L 30,22 Q 32,21 33,20" fill="none" stroke="#b45309" stroke-width="1.5"/></svg>`,
        // INJURED
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="18" y="76" width="10" height="8" fill="#451a03"/><rect x="32" y="76" width="10" height="8" fill="#451a03"/><rect x="20" y="50" width="8" height="26" fill="#1e3a8a"/><rect x="32" y="50" width="8" height="26" fill="#1e3a8a"/><rect x="16" y="25" width="28" height="25" fill="#dc2626" rx="2"/><text x="30" y="38" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="bold">CT</text><path d="M 16,28 L 22,46" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/><path d="M 44,28 L 38,46" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/><circle cx="22" cy="46" r="2.5" fill="#fed7aa"/><circle cx="38" cy="46" r="2.5" fill="#fed7aa"/><!-- Cracked bow held loosely --><path d="M 8,30 Q 2,38 4,42" stroke="#d97706" stroke-width="2.5" fill="none"/><path d="M 6,44 Q 2,48 8,54" stroke="#d97706" stroke-width="2.5" fill="none"/><line x1="8" y1="30" x2="8" y2="54" stroke="#cbd5e1" stroke-width="0.8"/><rect x="22" y="10" width="16" height="16" fill="#fed7aa" rx="3"/><path d="M 18,12 Q 30,0 42,12 L 44,18 Q 30,-2 16,18 Z" fill="#78350f"/><path d="M 20,8 L 22,12 M 28,6 L 30,10 M 36,8 L 34,12" stroke="#78350f" stroke-width="2"/><!-- Bandage on cheek --><rect x="33" y="20" width="6" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/><circle cx="26" cy="17" r="1.5" fill="#000"/><circle cx="34" cy="17" r="1.5" fill="#000"/><path d="M 27,22 L 30,22 Q 32,21 33,20" fill="none" stroke="#b45309" stroke-width="1.5"/><!-- Bruise on forehead --><circle cx="30" cy="8" r="2.5" fill="#7c3aed" opacity="0.4"/></svg>`
    );

    // ========================================================================
    // 13. LESLIE WINKLE - Laser Cello
    // Original: White lab coat (#f8fafc), dark shirt (#0f172a), dark pants (#1e293b),
    //   black hair (#1c1917) with side curls, glasses (#374151 circle frames),
    //   keyboard/laptop detail, black shoes (#171717), skin #fed7aa
    // ========================================================================
    upgradeVector('leslie',
        // ATTACK: Laser from cello/instrument
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="20" y="76" width="8" height="8" fill="#171717"/><rect x="32" y="76" width="8" height="8" fill="#171717"/><rect x="20" y="55" width="8" height="21" fill="#1e293b"/><rect x="32" y="55" width="8" height="21" fill="#1e293b"/><path d="M 16,25 L 44,25 L 46,60 L 14,60 Z" fill="#f8fafc"/><line x1="30" y1="25" x2="30" y2="60" stroke="#e2e8f0" stroke-width="2"/><rect x="24" y="25" width="12" height="15" fill="#0f172a"/><!-- Left arm aims device forward --><path d="M 16,28 L 4,32" stroke="#f8fafc" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="3" cy="33" r="2.5" fill="#fed7aa"/><!-- Right arm supports --><path d="M 44,28 L 56,32" stroke="#f8fafc" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="57" cy="33" r="2.5" fill="#fed7aa"/><!-- Laser beam --><line x1="-2" y1="33" x2="-10" y2="30" stroke="#ef4444" stroke-width="2" opacity="0.8"/><circle cx="-10" cy="30" r="3" fill="#ef4444" opacity="0.3"/><!-- Device --><rect x="-2" y="30" width="6" height="6" fill="#334155" rx="1"/><circle cx="1" cy="33" r="1.5" fill="#ef4444" opacity="0.8"/><rect x="20" y="8" width="20" height="18" fill="#fed7aa" rx="3"/><path d="M 18,12 C 18,2 42,2 42,12 C 42,16 40,18 38,18 L 22,18 C 20,18 18,16 18,12 Z" fill="#1c1917"/><circle cx="18" cy="14" r="4" fill="#1c1917"/><circle cx="42" cy="14" r="4" fill="#1c1917"/><path d="M 16,16 Q 14,22 18,26" fill="#1c1917"/><path d="M 44,16 Q 46,22 42,26" fill="#1c1917"/><circle cx="26" cy="17" r="3" fill="none" stroke="#374151" stroke-width="1.5"/><circle cx="34" cy="17" r="3" fill="none" stroke="#374151" stroke-width="1.5"/><line x1="29" y1="17" x2="31" y2="17" stroke="#374151" stroke-width="1.5"/><!-- One eye squinting --><line x1="24" y1="17" x2="28" y2="17" stroke="#1c1917" stroke-width="1.5"/><circle cx="34" cy="17" r="1" fill="#1c1917"/><path d="M 28,22 Q 30,24 33,22" fill="none" stroke="#b45309" stroke-width="1"/></svg>`,
        // INJURED
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="20" y="76" width="8" height="8" fill="#171717"/><rect x="32" y="76" width="8" height="8" fill="#171717"/><rect x="20" y="55" width="8" height="21" fill="#1e293b"/><rect x="32" y="55" width="8" height="21" fill="#1e293b"/><path d="M 16,25 L 44,25 L 46,60 L 14,60 Z" fill="#f8fafc"/><line x1="30" y1="25" x2="30" y2="60" stroke="#e2e8f0" stroke-width="2"/><rect x="24" y="25" width="12" height="15" fill="#0f172a"/><path d="M 16,28 L 26,42" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/><path d="M 44,28 L 38,42" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/><circle cx="26" cy="42" r="2.5" fill="#fed7aa"/><circle cx="38" cy="42" r="2.5" fill="#fed7aa"/><!-- Bandage on arm --><rect x="14" y="34" width="6" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/><rect x="20" y="8" width="20" height="18" fill="#fed7aa" rx="3"/><path d="M 18,12 C 18,2 42,2 42,12 C 42,16 40,18 38,18 L 22,18 C 20,18 18,16 18,12 Z" fill="#1c1917"/><circle cx="18" cy="14" r="4" fill="#1c1917"/><circle cx="42" cy="14" r="4" fill="#1c1917"/><path d="M 16,16 Q 14,22 18,26" fill="#1c1917"/><path d="M 44,16 Q 46,22 42,26" fill="#1c1917"/><!-- Cracked glasses --><circle cx="26" cy="17" r="3" fill="none" stroke="#374151" stroke-width="1.5"/><line x1="24" y1="15" x2="28" y2="19" stroke="#ef4444" stroke-width="0.7"/><circle cx="34" cy="17" r="3" fill="none" stroke="#374151" stroke-width="1.5"/><line x1="29" y1="17" x2="31" y2="17" stroke="#374151" stroke-width="1.5"/><circle cx="26" cy="17" r="1" fill="#1c1917"/><circle cx="34" cy="17" r="1" fill="#1c1917"/><path d="M 28,22 Q 30,24 33,22" fill="none" stroke="#b45309" stroke-width="1"/><!-- Bruise --><circle cx="36" cy="20" r="2" fill="#7c3aed" opacity="0.4"/></svg>`
    );

    // ========================================================================
    // 14. BERT KIBBLER - Rock Hammer
    // Original: Red flannel (#dc2626) with plaid lines (#7f1d1d), blue pants (#1e3a8a),
    //   brown beard (#78350f), brown hair (#78350f), brown shoes (#451a03),
    //   rock hammer, large build, skin #fed7aa
    // ========================================================================
    upgradeVector('bert',
        // ATTACK: Rock hammer raised overhead
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="18" ry="5" fill="rgba(0,0,0,0.2)"/><rect x="16" y="76" width="12" height="8" fill="#451a03"/><rect x="32" y="76" width="12" height="8" fill="#451a03"/><rect x="18" y="50" width="10" height="26" fill="#1e3a8a"/><rect x="32" y="50" width="10" height="26" fill="#1e3a8a"/><rect x="12" y="24" width="36" height="28" fill="#dc2626" rx="4"/><line x1="16" y1="24" x2="16" y2="52" stroke="#7f1d1d" stroke-width="2"/><line x1="24" y1="24" x2="24" y2="52" stroke="#7f1d1d" stroke-width="2"/><line x1="36" y1="24" x2="36" y2="52" stroke="#7f1d1d" stroke-width="2"/><line x1="44" y1="24" x2="44" y2="52" stroke="#7f1d1d" stroke-width="2"/><line x1="12" y1="32" x2="48" y2="32" stroke="#7f1d1d" stroke-width="2"/><line x1="12" y1="42" x2="48" y2="42" stroke="#7f1d1d" stroke-width="2"/><!-- Both arms raised high --><path d="M 6,26 L 2,8 L 10,-2" stroke="#dc2626" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M 48,26 L 52,8 L 50,-2" stroke="#dc2626" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="10" cy="-3" r="3.5" fill="#fed7aa"/><circle cx="50" cy="-3" r="3.5" fill="#fed7aa"/><!-- Rock hammer raised above head --><rect x="10" y="-4" width="40" height="4" fill="#d97706" rx="1"/><rect x="20" y="-14" width="12" height="12" fill="#9ca3af" rx="1"/><polygon points="32,-14 36,-10 32,-6" fill="#6b7280"/><!-- Rock debris --><circle cx="20" cy="82" r="2" fill="#a1a1aa" opacity="0.6"/><circle cx="40" cy="83" r="1.5" fill="#a1a1aa" opacity="0.5"/><rect x="20" y="8" width="20" height="20" fill="#fed7aa" rx="4"/><path d="M 18,18 Q 30,30 42,18 L 40,26 Q 30,32 20,26 Z" fill="#78350f"/><path d="M 18,12 Q 30,-2 42,12 L 40,6 Q 30,0 20,6 Z" fill="#78350f"/><circle cx="26" cy="15" r="1.5" fill="#000"/><circle cx="34" cy="15" r="1.5" fill="#000"/><!-- Mouth open yelling --><ellipse cx="30" cy="23" rx="3" ry="2" fill="#451a03"/></svg>`,
        // INJURED
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="18" ry="5" fill="rgba(0,0,0,0.2)"/><rect x="16" y="76" width="12" height="8" fill="#451a03"/><rect x="32" y="76" width="12" height="8" fill="#451a03"/><rect x="18" y="50" width="10" height="26" fill="#1e3a8a"/><rect x="32" y="50" width="10" height="26" fill="#1e3a8a"/><!-- Torn flannel --><rect x="12" y="24" width="16" height="28" fill="#dc2626" rx="4"/><rect x="30" y="24" width="18" height="28" fill="#dc2626" rx="4"/><line x1="16" y1="24" x2="16" y2="52" stroke="#7f1d1d" stroke-width="2"/><line x1="24" y1="24" x2="24" y2="52" stroke="#7f1d1d" stroke-width="2"/><line x1="36" y1="24" x2="36" y2="52" stroke="#7f1d1d" stroke-width="2"/><line x1="44" y1="24" x2="44" y2="52" stroke="#7f1d1d" stroke-width="2"/><line x1="12" y1="32" x2="48" y2="32" stroke="#7f1d1d" stroke-width="2"/><line x1="12" y1="42" x2="48" y2="42" stroke="#7f1d1d" stroke-width="2"/><rect x="6" y="26" width="8" height="22" fill="#dc2626" rx="2"/><circle cx="10" cy="50" r="3.5" fill="#fed7aa"/><path d="M 48,26 L 52,42" stroke="#dc2626" stroke-width="8" stroke-linecap="round"/><circle cx="52" cy="42" r="3.5" fill="#fed7aa"/><!-- Hammer held low --><g transform="rotate(30 52 42)"><rect x="50" y="20" width="4" height="30" fill="#d97706" rx="1"/><rect x="46" y="20" width="12" height="6" fill="#9ca3af" rx="1"/></g><rect x="20" y="8" width="20" height="20" fill="#fed7aa" rx="4"/><path d="M 18,18 Q 30,30 42,18 L 40,26 Q 30,32 20,26 Z" fill="#78350f"/><path d="M 18,12 Q 30,-2 42,12 L 40,6 Q 30,0 20,6 Z" fill="#78350f"/><!-- Bandage on head --><rect x="17" y="6" width="26" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/><circle cx="26" cy="15" r="1.5" fill="#000"/><circle cx="34" cy="15" r="1.5" fill="#000"/><path d="M 27,21 Q 30,23 33,21" fill="none" stroke="#451a03" stroke-width="1.5"/><!-- Bruise --><circle cx="36" cy="14" r="2.5" fill="#7c3aed" opacity="0.35"/></svg>`
    );

    // ========================================================================
    // 15. WIL WHEATON - Phaser
    // Original: Red Star Trek uniform (#dc2626), black neck/pants (#111827),
    //   gold combadge (#fbbf24), brown hair (#451a03), phaser,
    //   dark shoes (#111827), skin #fed7aa
    // ========================================================================
    upgradeVector('wil',
        // ATTACK: Phaser aimed forward
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="20" y="76" width="8" height="8" fill="#111827"/><rect x="32" y="76" width="8" height="8" fill="#111827"/><rect x="20" y="50" width="8" height="26" fill="#111827"/><rect x="32" y="50" width="8" height="26" fill="#111827"/><rect x="16" y="25" width="28" height="25" fill="#dc2626" rx="2"/><polygon points="24,25 36,25 30,32" fill="#111827"/><polygon points="34,32 36,36 32,36" fill="#fbbf24"/><!-- Left arm down --><rect x="12" y="26" width="6" height="20" fill="#dc2626" rx="1"/><circle cx="15" cy="48" r="2.5" fill="#fed7aa"/><!-- Right arm extended aiming phaser --><path d="M 44,26 L 56,28" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="57" cy="28" r="2.5" fill="#fed7aa"/><!-- Phaser --><g transform="rotate(-15 57 28)"><rect x="55" y="25" width="12" height="4" fill="#64748b" rx="1"/><rect x="57" y="29" width="4" height="6" fill="#475569" rx="1"/><circle cx="65" cy="27" r="1.5" fill="#3b82f6"/><circle cx="65" cy="27" r="3" fill="#3b82f6" opacity="0.3"/></g><!-- Beam --><line x1="66" y1="26" x2="72" y2="24" stroke="#3b82f6" stroke-width="1.5" opacity="0.6"/><line x1="66" y1="28" x2="74" y2="28" stroke="#3b82f6" stroke-width="1.5" opacity="0.6"/><rect x="22" y="10" width="16" height="16" fill="#fed7aa" rx="3"/><path d="M 20,12 C 20,0 40,0 40,12 L 42,16 Q 30,-2 18,16 Z" fill="#451a03"/><circle cx="26" cy="18" r="1.5" fill="#000"/><circle cx="34" cy="18" r="1.5" fill="#000"/><path d="M 27,23 Q 32,25 34,22" fill="none" stroke="#b45309" stroke-width="1.5"/></svg>`,
        // INJURED
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="20" y="76" width="8" height="8" fill="#111827"/><rect x="32" y="76" width="8" height="8" fill="#111827"/><rect x="20" y="50" width="8" height="26" fill="#111827"/><rect x="32" y="50" width="8" height="26" fill="#111827"/><!-- Torn uniform --><rect x="16" y="25" width="12" height="25" fill="#dc2626" rx="2"/><rect x="30" y="25" width="14" height="25" fill="#dc2626" rx="2"/><polygon points="24,25 36,25 30,32" fill="#111827"/><polygon points="34,32 36,36 32,36" fill="#fbbf24"/><rect x="12" y="26" width="6" height="20" fill="#dc2626" rx="1"/><circle cx="15" cy="48" r="2.5" fill="#fed7aa"/><path d="M 44,26 L 48,40" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/><circle cx="48" cy="40" r="2.5" fill="#fed7aa"/><!-- Phaser held low --><rect x="46" y="42" width="8" height="3" fill="#64748b" rx="1"/><rect x="48" y="45" width="3" height="4" fill="#475569" rx="1"/><circle cx="53" cy="43" r="1" fill="#3b82f6" opacity="0.5"/><rect x="22" y="10" width="16" height="16" fill="#fed7aa" rx="3"/><path d="M 20,12 C 20,0 40,0 40,12 L 42,16 Q 30,-2 18,16 Z" fill="#451a03"/><!-- Bandage on forehead --><rect x="19" y="8" width="22" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/><circle cx="26" cy="18" r="1.5" fill="#000"/><circle cx="34" cy="18" r="1.5" fill="#000"/><path d="M 27,23 Q 32,25 34,22" fill="none" stroke="#b45309" stroke-width="1.5"/><!-- Bruise --><circle cx="30" cy="22" r="2" fill="#7c3aed" opacity="0.4"/></svg>`
    );

    // ========================================================================
    // 16. ZACK JOHNSON - Stomp Attack
    // Original: White tank top (#f1f5f9), blue jeans (#2563eb), blonde spiky hair (#fde047),
    //   white shoes (#f8fafc), muscular bare arms (#fed7aa), BIG fists,
    //   chest showing V-neck, skin #fed7aa
    // ========================================================================
    upgradeVector('zack',
        // ATTACK: Foot stomp, arms flung back
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="16" ry="5" fill="rgba(0,0,0,0.2)"/><!-- Left leg planted --><rect x="20" y="50" width="8" height="26" fill="#2563eb"/><rect x="18" y="76" width="10" height="8" fill="#f8fafc"/><!-- Right leg raised for stomp --><rect x="36" y="46" width="8" height="16" fill="#2563eb"/><rect x="36" y="40" width="10" height="10" fill="#f8fafc" rx="1"/><!-- Ground crack --><line x1="25" y1="84" x2="20" y2="82" stroke="#78716c" stroke-width="1.5"/><line x1="35" y1="84" x2="40" y2="82" stroke="#78716c" stroke-width="1.5"/><rect x="18" y="26" width="24" height="24" fill="#f1f5f9" rx="2"/><path d="M 22,26 L 30,34 L 38,26 Z" fill="#fed7aa"/><!-- Muscular arms flung back --><path d="M 14,28 Q 6,34 4,42" stroke="#fed7aa" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M 46,28 Q 54,22 56,16" stroke="#fed7aa" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="4" cy="46" r="5" fill="#fed7aa"/><circle cx="56" cy="14" r="5" fill="#fed7aa"/><rect x="22" y="10" width="16" height="16" fill="#fed7aa" rx="3"/><path d="M 20,12 L 22,6 L 26,10 L 30,4 L 34,10 L 38,6 L 40,12 Z" fill="#fde047"/><circle cx="26" cy="18" r="1.5" fill="#000"/><circle cx="34" cy="18" r="1.5" fill="#000"/><!-- Angry brows --><line x1="23" y1="14" x2="28" y2="15" stroke="#451a03" stroke-width="1.5"/><line x1="37" y1="15" x2="32" y2="14" stroke="#451a03" stroke-width="1.5"/><!-- Mouth open yelling --><ellipse cx="30" cy="22" rx="4" ry="2.5" fill="#7c2d12"/></svg>`,
        // INJURED
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="16" ry="5" fill="rgba(0,0,0,0.2)"/><rect x="18" y="76" width="10" height="8" fill="#f8fafc"/><rect x="32" y="76" width="10" height="8" fill="#f8fafc"/><rect x="20" y="50" width="8" height="26" fill="#2563eb"/><rect x="32" y="50" width="8" height="26" fill="#2563eb"/><!-- Torn tank top --><rect x="18" y="26" width="10" height="24" fill="#f1f5f9" rx="2"/><rect x="32" y="26" width="10" height="24" fill="#f1f5f9" rx="2"/><path d="M 22,26 L 30,34 L 38,26 Z" fill="#fed7aa"/><!-- Arms down --><path d="M 14,28 Q 10,38 12,48" stroke="#fed7aa" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M 46,28 Q 50,38 48,48" stroke="#fed7aa" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="12" cy="52" r="5" fill="#fed7aa"/><circle cx="48" cy="52" r="5" fill="#fed7aa"/><rect x="22" y="10" width="16" height="16" fill="#fed7aa" rx="3"/><path d="M 20,12 L 22,6 L 26,10 L 30,4 L 34,10 L 38,6 L 40,12 Z" fill="#fde047"/><!-- Bandage on head --><rect x="19" y="6" width="22" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/><circle cx="26" cy="18" r="1.5" fill="#000"/><circle cx="34" cy="18" r="1.5" fill="#000"/><!-- Black eye --><circle cx="25" cy="17" r="3" fill="#7c3aed" opacity="0.35"/><path d="M 26,22 Q 30,26 34,22" fill="none" stroke="#b45309" stroke-width="2"/></svg>`
    );

    // ========================================================================
    // 17. EMILY SWEENEY - Dagger Strike
    // Original: Dark top (#0f172a), dark pants (#1e293b), long red hair (#b91c1c),
    //   daggers (#cbd5e1), dark shoes (#0f172a), skin #fed7aa
    // ========================================================================
    upgradeVector('emily',
        // ATTACK: Mid-jump with daggers slashing
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="35" cy="85" rx="10" ry="2.5" fill="rgba(0,0,0,0.1)"/><rect x="20" y="76" width="8" height="8" fill="#0f172a"/><rect x="32" y="76" width="8" height="8" fill="#0f172a"/><rect x="20" y="50" width="8" height="26" fill="#1e293b"/><rect x="32" y="50" width="8" height="26" fill="#1e293b"/><rect x="18" y="25" width="24" height="25" fill="#0f172a" rx="2"/><!-- Arms with daggers slashing outward --><path d="M 16,28 L 4,18" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M 44,28 L 56,18" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="3" cy="17" r="2" fill="#fed7aa"/><circle cx="57" cy="17" r="2" fill="#fed7aa"/><!-- Daggers --><path d="M 0,14 L 3,8 M 1,12 L 5,12" stroke="#cbd5e1" stroke-width="2"/><path d="M 60,14 L 57,8 M 55,12 L 59,12" stroke="#cbd5e1" stroke-width="2"/><!-- Slash effects --><path d="M -2,12 L 6,20" stroke="#ef4444" stroke-width="1" opacity="0.5"/><path d="M 54,12 L 62,20" stroke="#ef4444" stroke-width="1" opacity="0.5"/><rect x="22" y="10" width="16" height="16" fill="#fed7aa" rx="3"/><path d="M 20,10 C 15,10 16,40 18,45 C 20,30 20,15 30,15 C 40,15 40,30 42,45 C 44,40 45,10 40,10 Z" fill="#b91c1c"/><circle cx="26" cy="18" r="1.5" fill="#000"/><circle cx="34" cy="18" r="1.5" fill="#000"/><!-- Determined expression --><line x1="23" y1="15" x2="27" y2="16" stroke="#451a03" stroke-width="1"/><line x1="37" y1="16" x2="33" y2="15" stroke="#451a03" stroke-width="1"/><path d="M 28,23 Q 30,24 33,22" fill="none" stroke="#9f1239" stroke-width="1.5"/></svg>`,
        // INJURED
        `<svg viewBox="0 0 60 90" class="w-full h-full"><ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.2)"/><rect x="20" y="76" width="8" height="8" fill="#0f172a"/><rect x="32" y="76" width="8" height="8" fill="#0f172a"/><rect x="20" y="50" width="8" height="26" fill="#1e293b"/><rect x="32" y="50" width="8" height="26" fill="#1e293b"/><rect x="18" y="25" width="24" height="25" fill="#0f172a" rx="2"/><!-- Arms down holding daggers loosely --><path d="M 16,28 L 10,42" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/><path d="M 44,28 L 50,42" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/><circle cx="10" cy="44" r="2" fill="#fed7aa"/><circle cx="50" cy="44" r="2" fill="#fed7aa"/><path d="M 6,38 L 10,50 M 8,48 L 12,48" stroke="#cbd5e1" stroke-width="2"/><path d="M 54,38 L 50,50 M 48,48 L 52,48" stroke="#cbd5e1" stroke-width="2"/><!-- Bandage on arm --><rect x="14" y="34" width="6" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/><rect x="22" y="10" width="16" height="16" fill="#fed7aa" rx="3"/><!-- Messier long red hair --><path d="M 20,10 C 15,10 16,40 18,45 C 20,30 20,15 30,15 C 40,15 40,30 42,45 C 44,40 45,10 40,10 Z" fill="#b91c1c"/><path d="M 14,18 Q 12,14 14,10" stroke="#b91c1c" stroke-width="2" fill="none"/><path d="M 46,16 Q 48,12 46,8" stroke="#b91c1c" stroke-width="2" fill="none"/><circle cx="26" cy="18" r="1.5" fill="#000"/><circle cx="34" cy="18" r="1.5" fill="#000"/><path d="M 28,23 Q 30,24 33,22" fill="none" stroke="#9f1239" stroke-width="1.5"/><!-- Bruise on cheek --><circle cx="36" cy="20" r="2" fill="#7c3aed" opacity="0.4"/></svg>`
    );

})();
