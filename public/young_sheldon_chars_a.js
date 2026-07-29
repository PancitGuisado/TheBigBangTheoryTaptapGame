const ysCharVectorsA = {

  // ============================================================
  // 1. YOUNG SHELDON — Nerdy kid, Flash t-shirt, bowl-cut, glasses
  //    CHILD SIZE: head ~y=22, body ~y=38, feet ~y=82
  // ============================================================
  ys_young_sheldon: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- White sneakers -->
      <rect x="22" y="79" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <rect x="31" y="79" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <!-- Khaki pants legs -->
      <rect x="23" y="68" width="6" height="12" rx="1" fill="#c8b272"/>
      <rect x="31" y="68" width="6" height="12" rx="1" fill="#c8b272"/>
      <!-- Khaki pants body -->
      <rect x="22" y="62" width="16" height="8" rx="1" fill="#c8b272"/>
      <!-- Flash t-shirt body -->
      <rect x="20" y="44" width="20" height="19" rx="2" fill="#dc2626"/>
      <!-- Yellow lightning bolt on shirt -->
      <polygon points="30,47 27,53 29,53 26,59 33,52 31,52 34,47" fill="#facc15"/>
      <!-- White circle behind bolt -->
      <circle cx="30" cy="53" r="7" fill="#fff" opacity="0.3"/>
      <!-- Arms (skin) -->
      <path d="M20,47 Q14,55 16,62" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M40,47 Q46,55 44,62" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Short sleeves -->
      <rect x="17" y="44" width="6" height="5" rx="1" fill="#dc2626"/>
      <rect x="37" y="44" width="6" height="5" rx="1" fill="#dc2626"/>
      <!-- Neck -->
      <rect x="27" y="40" width="6" height="5" fill="#f0c8a0"/>
      <!-- Head -->
      <rect x="21" y="24" width="18" height="17" rx="3" fill="#f5d0a9"/>
      <!-- Bowl-cut hair -->
      <rect x="19" y="21" width="22" height="9" rx="3" fill="#6b4423"/>
      <rect x="20" y="28" width="3" height="5" rx="1" fill="#6b4423"/>
      <rect x="37" y="28" width="3" height="5" rx="1" fill="#6b4423"/>
      <!-- Glasses frames -->
      <rect x="22" y="30" width="7" height="5" rx="2" fill="none" stroke="#333" stroke-width="1"/>
      <rect x="31" y="30" width="7" height="5" rx="2" fill="none" stroke="#333" stroke-width="1"/>
      <line x1="29" y1="32" x2="31" y2="32" stroke="#333" stroke-width="1"/>
      <!-- Eyes behind glasses -->
      <circle cx="25.5" cy="32.5" r="1.2" fill="#2c1810"/>
      <circle cx="34.5" cy="32.5" r="1.2" fill="#2c1810"/>
      <!-- Slight smile -->
      <path d="M27,37 Q30,39 33,37" stroke="#8b4513" stroke-width="0.8" fill="none"/>
    </svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- White sneakers -->
      <rect x="20" y="79" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <rect x="29" y="79" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <!-- Khaki pants -->
      <rect x="21" y="68" width="6" height="12" rx="1" fill="#c8b272"/>
      <rect x="29" y="68" width="6" height="12" rx="1" fill="#c8b272"/>
      <rect x="20" y="62" width="16" height="8" rx="1" fill="#c8b272"/>
      <!-- Flash t-shirt -->
      <rect x="18" y="44" width="20" height="19" rx="2" fill="#dc2626"/>
      <polygon points="28,47 25,53 27,53 24,59 31,52 29,52 32,47" fill="#facc15"/>
      <circle cx="28" cy="53" r="7" fill="#fff" opacity="0.3"/>
      <!-- Left arm down -->
      <path d="M18,47 Q12,55 14,62" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Right arm EXTENDED forward pushing -->
      <path d="M38,48 Q44,46 50,48" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Sleeves -->
      <rect x="15" y="44" width="6" height="5" rx="1" fill="#dc2626"/>
      <rect x="35" y="44" width="6" height="5" rx="1" fill="#dc2626"/>
      <!-- Toy train on ground -->
      <rect x="48" y="76" width="10" height="6" rx="1" fill="#2563eb"/>
      <rect x="45" y="74" width="6" height="5" rx="1" fill="#dc2626"/>
      <circle cx="49" cy="83" r="1.5" fill="#333"/>
      <circle cx="55" cy="83" r="1.5" fill="#333"/>
      <rect x="44" y="72" width="3" height="3" rx="0.5" fill="#555"/>
      <!-- Energy wave around train -->
      <ellipse cx="52" cy="78" rx="10" ry="6" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.7">
        <animate attributeName="rx" values="8;12;8" dur="0.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="0.5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="52" cy="78" rx="7" ry="4" fill="none" stroke="#93c5fd" stroke-width="0.8" opacity="0.5">
        <animate attributeName="rx" values="6;9;6" dur="0.4s" repeatCount="indefinite"/>
      </ellipse>
      <!-- Neck -->
      <rect x="25" y="40" width="6" height="5" fill="#f0c8a0"/>
      <!-- Head slightly forward -->
      <rect x="19" y="24" width="18" height="17" rx="3" fill="#f5d0a9"/>
      <!-- Bowl-cut -->
      <rect x="17" y="21" width="22" height="9" rx="3" fill="#6b4423"/>
      <rect x="18" y="28" width="3" height="5" rx="1" fill="#6b4423"/>
      <rect x="35" y="28" width="3" height="5" rx="1" fill="#6b4423"/>
      <!-- Glasses -->
      <rect x="20" y="30" width="7" height="5" rx="2" fill="none" stroke="#333" stroke-width="1"/>
      <rect x="29" y="30" width="7" height="5" rx="2" fill="none" stroke="#333" stroke-width="1"/>
      <line x1="27" y1="32" x2="29" y2="32" stroke="#333" stroke-width="1"/>
      <!-- Determined eyes -->
      <circle cx="23.5" cy="32.5" r="1.2" fill="#2c1810"/>
      <circle cx="32.5" cy="32.5" r="1.2" fill="#2c1810"/>
      <!-- Focused mouth -->
      <line x1="25" y1="37" x2="31" y2="37" stroke="#8b4513" stroke-width="0.8"/>
    </svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Sneakers stumbling -->
      <rect x="25" y="79" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <rect x="34" y="78" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5" transform="rotate(5,37,80)"/>
      <!-- Khaki pants -->
      <rect x="26" y="68" width="6" height="12" rx="1" fill="#c8b272"/>
      <rect x="34" y="67" width="6" height="12" rx="1" fill="#c8b272" transform="rotate(3,37,73)"/>
      <rect x="24" y="62" width="16" height="8" rx="1" fill="#c8b272"/>
      <!-- Flash t-shirt -->
      <rect x="22" y="44" width="20" height="19" rx="2" fill="#dc2626"/>
      <polygon points="32,47 29,53 31,53 28,59 35,52 33,52 36,47" fill="#facc15"/>
      <!-- Arms up defensively -->
      <path d="M22,47 Q16,38 18,32" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M42,47 Q48,38 46,32" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Sleeves -->
      <rect x="19" y="44" width="6" height="5" rx="1" fill="#dc2626"/>
      <rect x="39" y="44" width="6" height="5" rx="1" fill="#dc2626"/>
      <!-- Neck -->
      <rect x="29" y="40" width="6" height="5" fill="#f0c8a0"/>
      <!-- Head tilted back -->
      <rect x="23" y="24" width="18" height="17" rx="3" fill="#f5d0a9" transform="rotate(-5,32,32)"/>
      <!-- Messy bowl-cut -->
      <rect x="21" y="21" width="22" height="9" rx="3" fill="#6b4423" transform="rotate(-5,32,25)"/>
      <rect x="22" y="28" width="3" height="5" rx="1" fill="#6b4423"/>
      <rect x="39" y="27" width="3" height="5" rx="1" fill="#6b4423"/>
      <!-- Crooked glasses -->
      <rect x="24" y="29" width="7" height="5" rx="2" fill="none" stroke="#333" stroke-width="1" transform="rotate(-8,27,32)"/>
      <rect x="33" y="31" width="7" height="5" rx="2" fill="none" stroke="#333" stroke-width="1" transform="rotate(5,36,33)"/>
      <line x1="31" y1="31" x2="33" y2="32" stroke="#333" stroke-width="1"/>
      <!-- Worried eyes -->
      <circle cx="27" cy="32" r="1.5" fill="#2c1810"/>
      <circle cx="36" cy="33" r="1.5" fill="#2c1810"/>
      <!-- Distressed mouth -->
      <path d="M29,38 Q32,36 35,38" stroke="#8b4513" stroke-width="0.8" fill="none"/>
      <!-- Sweat drop -->
      <ellipse cx="42" cy="28" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
        <animate attributeName="cy" values="28;32;28" dur="0.8s" repeatCount="indefinite"/>
      </ellipse>
    </svg>`
  },

  // ============================================================
  // 2. MISSY COOPER — Sassy girl, pink shirt, long brown hair, bow
  //    CHILD SIZE: head ~y=22, body ~y=38, feet ~y=82
  // ============================================================
  ys_missy: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Sneakers -->
      <rect x="22" y="79" width="7" height="4" rx="1" fill="#f472b6" stroke="#db2777" stroke-width="0.5"/>
      <rect x="31" y="79" width="7" height="4" rx="1" fill="#f472b6" stroke="#db2777" stroke-width="0.5"/>
      <!-- Jeans legs -->
      <rect x="23" y="68" width="6" height="12" rx="1" fill="#3b82f6"/>
      <rect x="31" y="68" width="6" height="12" rx="1" fill="#3b82f6"/>
      <!-- Jeans body -->
      <rect x="22" y="62" width="16" height="8" rx="1" fill="#3b82f6"/>
      <!-- Pink t-shirt -->
      <rect x="20" y="44" width="20" height="19" rx="2" fill="#f472b6"/>
      <!-- Tiny flower on shirt -->
      <circle cx="30" cy="52" r="2" fill="#fbbf24"/>
      <circle cx="30" cy="52" r="1" fill="#fff"/>
      <!-- Arms on hips (sassy!) -->
      <path d="M20,48 Q14,54 18,62" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M40,48 Q46,54 42,62" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Hands on hips -->
      <circle cx="18" cy="62" r="2.5" fill="#f0c8a0"/>
      <circle cx="42" cy="62" r="2.5" fill="#f0c8a0"/>
      <!-- Short sleeves -->
      <rect x="17" y="44" width="6" height="5" rx="1" fill="#f472b6"/>
      <rect x="37" y="44" width="6" height="5" rx="1" fill="#f472b6"/>
      <!-- Neck -->
      <rect x="27" y="40" width="6" height="5" fill="#f0c8a0"/>
      <!-- Long brown hair behind head -->
      <rect x="18" y="25" width="6" height="20" rx="2" fill="#5c3317"/>
      <rect x="36" y="25" width="6" height="20" rx="2" fill="#5c3317"/>
      <!-- Head -->
      <rect x="21" y="24" width="18" height="17" rx="3" fill="#f5d0a9"/>
      <!-- Hair top -->
      <rect x="19" y="21" width="22" height="8" rx="3" fill="#5c3317"/>
      <!-- Hair bow -->
      <polygon points="36,22 40,19 42,22 40,25" fill="#ec4899"/>
      <polygon points="36,22 32,19 34,22 32,25" fill="#ec4899"/>
      <circle cx="36" cy="22" r="1.5" fill="#db2777"/>
      <!-- Eyes -->
      <circle cx="26" cy="32" r="1.5" fill="#2c1810"/>
      <circle cx="34" cy="32" r="1.5" fill="#2c1810"/>
      <!-- Eyelashes -->
      <line x1="24" y1="30" x2="25" y2="31" stroke="#2c1810" stroke-width="0.5"/>
      <line x1="32" y1="30" x2="33" y2="31" stroke="#2c1810" stroke-width="0.5"/>
      <!-- Sassy smirk -->
      <path d="M27,37 Q30,39 34,37" stroke="#c2185b" stroke-width="0.8" fill="none"/>
      <!-- Blush -->
      <circle cx="24" cy="35" r="2" fill="#fca5a5" opacity="0.4"/>
      <circle cx="36" cy="35" r="2" fill="#fca5a5" opacity="0.4"/>
    </svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Sneakers -->
      <rect x="20" y="79" width="7" height="4" rx="1" fill="#f472b6" stroke="#db2777" stroke-width="0.5"/>
      <rect x="29" y="79" width="7" height="4" rx="1" fill="#f472b6" stroke="#db2777" stroke-width="0.5"/>
      <!-- Jeans -->
      <rect x="21" y="68" width="6" height="12" rx="1" fill="#3b82f6"/>
      <rect x="29" y="68" width="6" height="12" rx="1" fill="#3b82f6"/>
      <rect x="20" y="62" width="16" height="8" rx="1" fill="#3b82f6"/>
      <!-- Pink t-shirt -->
      <rect x="18" y="44" width="20" height="19" rx="2" fill="#f472b6"/>
      <!-- Left arm back -->
      <path d="M18,48 Q12,54 14,60" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Right arm throwing forward -->
      <path d="M38,47 Q46,42 52,38" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Sleeves -->
      <rect x="15" y="44" width="6" height="5" rx="1" fill="#f472b6"/>
      <rect x="35" y="44" width="6" height="5" rx="1" fill="#f472b6"/>
      <!-- Flying doll -->
      <circle cx="55" cy="34" r="3" fill="#f5d0a9"/>
      <rect x="53" y="37" width="5" height="7" rx="1" fill="#c084fc"/>
      <line x1="53" y1="39" x2="50" y2="42" stroke="#f5d0a9" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="58" y1="39" x2="60" y2="42" stroke="#f5d0a9" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="54" cy="33" r="1" fill="#2c1810"/>
      <circle cx="56" cy="33" r="1" fill="#2c1810"/>
      <!-- Pink sparkles -->
      <circle cx="48" cy="36" r="1.5" fill="#f472b6" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="52" cy="30" r="1" fill="#ec4899" opacity="0.7">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="0.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="46" cy="32" r="1.2" fill="#fbcfe8" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="0.35s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="42" r="0.8" fill="#f9a8d4">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.45s" repeatCount="indefinite"/>
      </circle>
      <!-- Neck -->
      <rect x="25" y="40" width="6" height="5" fill="#f0c8a0"/>
      <!-- Long hair behind -->
      <rect x="16" y="25" width="6" height="20" rx="2" fill="#5c3317"/>
      <rect x="34" y="25" width="6" height="20" rx="2" fill="#5c3317"/>
      <!-- Head -->
      <rect x="19" y="24" width="18" height="17" rx="3" fill="#f5d0a9"/>
      <!-- Hair top -->
      <rect x="17" y="21" width="22" height="8" rx="3" fill="#5c3317"/>
      <!-- Bow -->
      <polygon points="34,22 38,19 40,22 38,25" fill="#ec4899"/>
      <polygon points="34,22 30,19 32,22 30,25" fill="#ec4899"/>
      <circle cx="34" cy="22" r="1.5" fill="#db2777"/>
      <!-- Fierce eyes -->
      <circle cx="24" cy="32" r="1.5" fill="#2c1810"/>
      <circle cx="32" cy="32" r="1.5" fill="#2c1810"/>
      <!-- Eyebrows angled -->
      <line x1="22" y1="29" x2="26" y2="30" stroke="#5c3317" stroke-width="0.8"/>
      <line x1="30" y1="30" x2="34" y2="29" stroke="#5c3317" stroke-width="0.8"/>
      <!-- Battle grin -->
      <path d="M25,37 Q28,40 32,37" stroke="#c2185b" stroke-width="1" fill="none"/>
    </svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Sneakers stumbling -->
      <rect x="25" y="79" width="7" height="4" rx="1" fill="#f472b6" stroke="#db2777" stroke-width="0.5"/>
      <rect x="34" y="78" width="7" height="4" rx="1" fill="#f472b6" stroke="#db2777" stroke-width="0.5" transform="rotate(8,37,80)"/>
      <!-- Jeans -->
      <rect x="26" y="68" width="6" height="12" rx="1" fill="#3b82f6"/>
      <rect x="34" y="67" width="6" height="12" rx="1" fill="#3b82f6" transform="rotate(5,37,73)"/>
      <rect x="24" y="62" width="16" height="8" rx="1" fill="#3b82f6"/>
      <!-- Pink t-shirt -->
      <rect x="22" y="44" width="20" height="19" rx="2" fill="#f472b6"/>
      <!-- Arms flailing -->
      <path d="M22,48 Q16,40 20,34" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M42,48 Q48,42 44,36" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="19" y="44" width="6" height="5" rx="1" fill="#f472b6"/>
      <rect x="39" y="44" width="6" height="5" rx="1" fill="#f472b6"/>
      <!-- Neck -->
      <rect x="29" y="40" width="6" height="5" fill="#f0c8a0"/>
      <!-- Messy long hair -->
      <rect x="20" y="26" width="7" height="22" rx="2" fill="#5c3317" transform="rotate(-5,23,35)"/>
      <rect x="37" y="25" width="6" height="18" rx="2" fill="#5c3317" transform="rotate(8,40,34)"/>
      <!-- Head tilted -->
      <rect x="23" y="24" width="18" height="17" rx="3" fill="#f5d0a9" transform="rotate(-3,32,32)"/>
      <!-- Messy hair top -->
      <rect x="21" y="21" width="22" height="8" rx="3" fill="#5c3317" transform="rotate(-3,32,25)"/>
      <!-- Crooked bow -->
      <polygon points="38,20 42,16 43,20 41,23" fill="#ec4899" transform="rotate(15,40,20)"/>
      <circle cx="38" cy="20" r="1.5" fill="#db2777"/>
      <!-- Annoyed eyes (X shapes) -->
      <line x1="25" y1="31" x2="28" y2="34" stroke="#2c1810" stroke-width="1"/>
      <line x1="28" y1="31" x2="25" y2="34" stroke="#2c1810" stroke-width="1"/>
      <circle cx="35" cy="32" r="1.5" fill="#2c1810"/>
      <!-- Angry mouth -->
      <path d="M28,38 L30,36 L33,38" stroke="#c2185b" stroke-width="1" fill="none"/>
      <!-- Anger mark -->
      <g transform="translate(42,26)">
        <line x1="0" y1="0" x2="3" y2="0" stroke="#dc2626" stroke-width="1"/>
        <line x1="0" y1="2" x2="3" y2="2" stroke="#dc2626" stroke-width="1"/>
        <line x1="0" y1="0" x2="0" y2="2" stroke="#dc2626" stroke-width="1"/>
        <line x1="3" y1="0" x2="3" y2="2" stroke="#dc2626" stroke-width="1"/>
      </g>
    </svg>`
  },

  // ============================================================
  // 3. GEORGE COOPER SR — Big stocky Texas dad, plaid, mustache
  //    ADULT SIZE (BIG): head ~y=8, body ~y=26, feet ~y=82
  // ============================================================
  ys_george: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Sneakers -->
      <rect x="18" y="78" width="10" height="5" rx="2" fill="#f5f5f4"/>
      <rect x="32" y="78" width="10" height="5" rx="2" fill="#f5f5f4"/>
      <rect x="18" y="78" width="10" height="2" rx="1" fill="#d6d3d1"/>
      <rect x="32" y="78" width="10" height="2" rx="1" fill="#d6d3d1"/>
      <!-- Khaki pants -->
      <rect x="19" y="56" width="9" height="23" rx="1" fill="#a3926e"/>
      <rect x="32" y="56" width="9" height="23" rx="1" fill="#a3926e"/>
      <rect x="17" y="50" width="26" height="8" rx="2" fill="#a3926e"/>
      <!-- Belt -->
      <rect x="17" y="48" width="26" height="3" fill="#5c4033"/>
      <rect x="28" y="48" width="4" height="3" rx="0.5" fill="#c0a060"/>
      <!-- Polo shirt (blue/navy coach style) -->
      <rect x="14" y="24" width="32" height="26" rx="3" fill="#1e3a5f"/>
      <!-- Polo collar -->
      <polygon points="25,24 30,29 35,24" fill="#2a5080"/>
      <line x1="30" y1="24" x2="30" y2="32" stroke="#0f2840" stroke-width="0.8"/>
      <!-- Beer belly bulge -->
      <ellipse cx="30" cy="42" rx="15" ry="6" fill="#1a3355" opacity="0.5"/>
      <!-- Arms crossed -->
      <path d="M14,28 Q6,36 10,46" stroke="#e8b88a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M46,28 Q54,36 50,46" stroke="#e8b88a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M10,46 Q22,42 36,44" stroke="#e8b88a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M50,46 Q38,40 24,42" stroke="#e8b88a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Polo sleeves -->
      <rect x="10" y="24" width="8" height="8" rx="1" fill="#1e3a5f"/>
      <rect x="42" y="24" width="8" height="8" rx="1" fill="#1e3a5f"/>
      <!-- Coach whistle on string -->
      <line x1="30" y1="24" x2="36" y2="32" stroke="#a0a0a0" stroke-width="0.5"/>
      <ellipse cx="37" cy="33" rx="2" ry="1.5" fill="#c0c0c0"/>
      <!-- Thick neck -->
      <rect x="24" y="20" width="12" height="6" fill="#e8b88a"/>
      <!-- Head (big round) -->
      <rect x="18" y="4" width="24" height="18" rx="5" fill="#e8b88a"/>
      <!-- Short brown hair -->
      <rect x="18" y="2" width="24" height="7" rx="4" fill="#5c3a1e"/>
      <!-- Sideburns -->
      <rect x="18" y="8" width="3" height="8" rx="1" fill="#5c3a1e"/>
      <rect x="39" y="8" width="3" height="8" rx="1" fill="#5c3a1e"/>
      <!-- Thick horseshoe mustache -->
      <path d="M24,17 Q30,20 36,17" stroke="#4a2a0e" stroke-width="2" fill="none"/>
      <rect x="24" y="15" width="2" height="4" rx="0.5" fill="#4a2a0e"/>
      <rect x="34" y="15" width="2" height="4" rx="0.5" fill="#4a2a0e"/>
      <!-- Eyes -->
      <circle cx="25" cy="12" r="1.5" fill="#2c1810"/>
      <circle cx="35" cy="12" r="1.5" fill="#2c1810"/>
      <!-- Thick eyebrows -->
      <rect x="22" y="9" width="6" height="2" rx="1" fill="#4a2a0e"/>
      <rect x="32" y="9" width="6" height="2" rx="1" fill="#4a2a0e"/>
      <!-- Slight frown -->
      <line x1="27" y1="20" x2="33" y2="20" stroke="#a0705a" stroke-width="0.8"/>
    </svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <ellipse cx="28" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
      <rect x="16" y="78" width="10" height="5" rx="2" fill="#f5f5f4"/>
      <rect x="30" y="77" width="10" height="5" rx="2" fill="#f5f5f4"/>
      <!-- Khakis stepping -->
      <rect x="17" y="56" width="9" height="23" rx="1" fill="#a3926e"/>
      <rect x="30" y="54" width="9" height="24" rx="1" fill="#a3926e"/>
      <rect x="15" y="50" width="26" height="8" rx="2" fill="#a3926e"/>
      <rect x="15" y="48" width="26" height="3" fill="#5c4033"/>
      <rect x="26" y="48" width="4" height="3" rx="0.5" fill="#c0a060"/>
      <!-- Polo body -->
      <rect x="12" y="24" width="32" height="26" rx="3" fill="#1e3a5f"/>
      <polygon points="23,24 28,29 33,24" fill="#2a5080"/>
      <ellipse cx="28" cy="42" rx="15" ry="6" fill="#1a3355" opacity="0.5"/>
      <!-- Left arm back -->
      <path d="M12,28 Q4,36 8,44" stroke="#e8b88a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Right arm swinging brisket overhead -->
      <path d="M44,28 Q54,22 56,14" stroke="#e8b88a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <rect x="8" y="24" width="8" height="8" rx="1" fill="#1e3a5f"/>
      <rect x="40" y="24" width="8" height="8" rx="1" fill="#1e3a5f"/>
      <!-- Giant brisket -->
      <ellipse cx="58" cy="10" rx="9" ry="5" fill="#8b4513" transform="rotate(-15,58,10)"/>
      <ellipse cx="58" cy="10" rx="7" ry="3.5" fill="#a0522d" transform="rotate(-15,58,10)"/>
      <rect x="53" y="7" width="2" height="6" rx="1" fill="#654321"/>
      <!-- Meat juice -->
      <circle cx="52" cy="5" r="1" fill="#d97706" opacity="0.8"><animate attributeName="cy" values="5;1;5" dur="0.5s" repeatCount="indefinite"/></circle>
      <circle cx="56" cy="3" r="0.8" fill="#b45309" opacity="0.7"><animate attributeName="cy" values="3;0;3" dur="0.4s" repeatCount="indefinite"/></circle>
      <!-- Wind arc -->
      <path d="M48,4 Q54,0 60,5" stroke="#94a3b8" stroke-width="1.5" fill="none" opacity="0.5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="0.4s" repeatCount="indefinite"/></path>
      <!-- Head -->
      <rect x="22" y="20" width="12" height="6" fill="#e8b88a"/>
      <rect x="16" y="4" width="24" height="18" rx="5" fill="#e8b88a"/>
      <rect x="16" y="2" width="24" height="7" rx="4" fill="#5c3a1e"/>
      <rect x="16" y="8" width="3" height="8" rx="1" fill="#5c3a1e"/>
      <rect x="37" y="8" width="3" height="8" rx="1" fill="#5c3a1e"/>
      <path d="M22,17 Q28,20 34,17" stroke="#4a2a0e" stroke-width="2" fill="none"/>
      <rect x="22" y="15" width="2" height="4" rx="0.5" fill="#4a2a0e"/>
      <rect x="32" y="15" width="2" height="4" rx="0.5" fill="#4a2a0e"/>
      <circle cx="23" cy="12" r="1.5" fill="#2c1810"/>
      <circle cx="33" cy="12" r="1.5" fill="#2c1810"/>
      <rect x="20" y="9" width="6" height="2" rx="1" fill="#4a2a0e"/>
      <rect x="30" y="9" width="6" height="2" rx="1" fill="#4a2a0e"/>
      <!-- Battle yell -->
      <ellipse cx="28" cy="20" rx="3" ry="2" fill="#4a1010"/>
    </svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <ellipse cx="32" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
      <rect x="22" y="78" width="10" height="5" rx="2" fill="#f5f5f4"/>
      <rect x="35" y="77" width="10" height="5" rx="2" fill="#f5f5f4" transform="rotate(3,40,80)"/>
      <rect x="23" y="56" width="9" height="23" rx="1" fill="#a3926e"/>
      <rect x="35" y="55" width="9" height="24" rx="1" fill="#a3926e" transform="rotate(3,39,67)"/>
      <rect x="21" y="50" width="26" height="8" rx="2" fill="#a3926e"/>
      <rect x="21" y="48" width="26" height="3" fill="#5c4033"/>
      <rect x="32" y="48" width="4" height="3" rx="0.5" fill="#c0a060"/>
      <!-- Polo -->
      <rect x="18" y="24" width="32" height="26" rx="3" fill="#1e3a5f"/>
      <ellipse cx="34" cy="42" rx="15" ry="6" fill="#1a3355" opacity="0.5"/>
      <!-- Arms wobbling -->
      <path d="M18,28 Q10,38 14,48" stroke="#e8b88a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M50,28 Q56,36 52,46" stroke="#e8b88a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <rect x="14" y="24" width="8" height="8" rx="1" fill="#1e3a5f"/>
      <rect x="46" y="24" width="8" height="8" rx="1" fill="#1e3a5f"/>
      <!-- Head tilted -->
      <rect x="28" y="20" width="12" height="6" fill="#e8b88a"/>
      <rect x="22" y="4" width="24" height="18" rx="5" fill="#e8b88a" transform="rotate(5,34,13)"/>
      <rect x="22" y="2" width="24" height="7" rx="4" fill="#5c3a1e" transform="rotate(5,34,5)"/>
      <rect x="22" y="8" width="3" height="8" rx="1" fill="#5c3a1e"/>
      <rect x="43" y="8" width="3" height="8" rx="1" fill="#5c3a1e"/>
      <path d="M28,17 Q34,20 40,17" stroke="#4a2a0e" stroke-width="2" fill="none" transform="rotate(5,34,18)"/>
      <!-- One eye shut -->
      <circle cx="29" cy="12" r="1.5" fill="#2c1810"/>
      <line x1="37" y1="11" x2="41" y2="13" stroke="#2c1810" stroke-width="1.5"/>
      <rect x="26" y="9" width="6" height="2" rx="1" fill="#4a2a0e"/>
      <rect x="36" y="9" width="6" height="2" rx="1" fill="#4a2a0e"/>
      <!-- Pain grimace -->
      <path d="M31,20 Q34,22 37,20" stroke="#a0705a" stroke-width="1" fill="none"/>
      <!-- Stars -->
      <text x="48" y="8" font-size="5" fill="#fbbf24" opacity="0.8">★</text>
      <text x="16" y="6" font-size="4" fill="#fbbf24" opacity="0.6">★</text>
    </svg>`
  },

  // ============================================================
  // 4. MEEMAW / CONNIE TUCKER — Grandmother, silver hair, pearls
  //    ADULT SIZE: head ~y=10, body ~y=28, feet ~y=82
  // ============================================================
  ys_meemaw: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes -->
      <rect x="21" y="79" width="8" height="4" rx="2" fill="#92400e"/>
      <rect x="31" y="79" width="8" height="4" rx="2" fill="#92400e"/>
      <!-- Tan pants legs -->
      <rect x="22" y="60" width="7" height="20" rx="1" fill="#d2b48c"/>
      <rect x="31" y="60" width="7" height="20" rx="1" fill="#d2b48c"/>
      <!-- Tan pants body -->
      <rect x="21" y="52" width="18" height="10" rx="1" fill="#d2b48c"/>
      <!-- Blue blouse -->
      <rect x="19" y="28" width="22" height="25" rx="3" fill="#3b82f6"/>
      <!-- Blouse collar -->
      <polygon points="26,28 30,33 34,28" fill="#60a5fa"/>
      <!-- Left arm on hip -->
      <path d="M19,32 Q12,42 18,52" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="18" cy="52" r="2.5" fill="#f0c8a0"/>
      <!-- Right arm relaxed -->
      <path d="M41,32 Q48,42 45,52" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Sleeves -->
      <rect x="15" y="28" width="7" height="6" rx="1" fill="#3b82f6"/>
      <rect x="38" y="28" width="7" height="6" rx="1" fill="#3b82f6"/>
      <!-- Neck -->
      <rect x="27" y="24" width="6" height="5" fill="#f0c8a0"/>
      <!-- Pearl necklace -->
      <circle cx="27" cy="27" r="1" fill="#fef9c3"/>
      <circle cx="30" cy="28" r="1" fill="#fef9c3"/>
      <circle cx="33" cy="27" r="1" fill="#fef9c3"/>
      <circle cx="25" cy="26" r="1" fill="#fef9c3"/>
      <circle cx="35" cy="26" r="1" fill="#fef9c3"/>
      <!-- Head -->
      <rect x="20" y="8" width="20" height="18" rx="4" fill="#f5d0a9"/>
      <!-- Styled silver hair -->
      <ellipse cx="30" cy="8" rx="12" ry="5" fill="#b0b0b0"/>
      <rect x="18" y="8" width="4" height="10" rx="2" fill="#b0b0b0"/>
      <rect x="38" y="8" width="4" height="10" rx="2" fill="#b0b0b0"/>
      <ellipse cx="30" cy="6" rx="10" ry="4" fill="#c0c0c0"/>
      <!-- Eyes -->
      <circle cx="25" cy="15" r="1.5" fill="#2c6b3f"/>
      <circle cx="35" cy="15" r="1.5" fill="#2c6b3f"/>
      <!-- Eyelashes -->
      <line x1="23" y1="13" x2="24" y2="14" stroke="#555" stroke-width="0.5"/>
      <line x1="33" y1="13" x2="34" y2="14" stroke="#555" stroke-width="0.5"/>
      <!-- Warm smile -->
      <path d="M26,20 Q30,23 34,20" stroke="#c2185b" stroke-width="1" fill="none"/>
      <!-- Smile blush -->
      <circle cx="23" cy="19" r="2" fill="#fca5a5" opacity="0.3"/>
      <circle cx="37" cy="19" r="2" fill="#fca5a5" opacity="0.3"/>
    </svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes -->
      <rect x="19" y="79" width="8" height="4" rx="2" fill="#92400e"/>
      <rect x="29" y="79" width="8" height="4" rx="2" fill="#92400e"/>
      <!-- Tan pants -->
      <rect x="20" y="60" width="7" height="20" rx="1" fill="#d2b48c"/>
      <rect x="29" y="60" width="7" height="20" rx="1" fill="#d2b48c"/>
      <rect x="19" y="52" width="18" height="10" rx="1" fill="#d2b48c"/>
      <!-- Blue blouse -->
      <rect x="17" y="28" width="22" height="25" rx="3" fill="#3b82f6"/>
      <polygon points="24,28 28,33 32,28" fill="#60a5fa"/>
      <!-- Left arm back -->
      <path d="M17,32 Q10,40 14,48" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Right arm throwing forward -->
      <path d="M39,32 Q48,28 54,24" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="13" y="28" width="7" height="6" rx="1" fill="#3b82f6"/>
      <rect x="36" y="28" width="7" height="6" rx="1" fill="#3b82f6"/>
      <!-- Flying gold coins -->
      <circle cx="56" cy="20" r="3" fill="#fbbf24" stroke="#d97706" stroke-width="0.5">
        <animate attributeName="cx" values="54;58;54" dur="0.6s" repeatCount="indefinite"/>
      </circle>
      <text x="54.5" y="22" font-size="4" fill="#92400e" font-weight="bold">$</text>
      <circle cx="50" cy="16" r="2.5" fill="#f59e0b" stroke="#d97706" stroke-width="0.5">
        <animate attributeName="cx" values="48;52;48" dur="0.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="52" cy="28" r="2" fill="#fbbf24" stroke="#d97706" stroke-width="0.5">
        <animate attributeName="cx" values="50;54;50" dur="0.7s" repeatCount="indefinite"/>
      </circle>
      <!-- Money sparkles -->
      <circle cx="48" cy="14" r="1" fill="#fef08a" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="55" cy="26" r="0.8" fill="#fef08a" opacity="0.6">
        <animate attributeName="opacity" values="0.2;0.9;0.2" dur="0.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="58" cy="16" r="1.2" fill="#fde68a">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.35s" repeatCount="indefinite"/>
      </circle>
      <!-- Neck & pearls -->
      <rect x="25" y="24" width="6" height="5" fill="#f0c8a0"/>
      <circle cx="25" cy="26" r="1" fill="#fef9c3"/>
      <circle cx="28" cy="27" r="1" fill="#fef9c3"/>
      <circle cx="31" cy="27" r="1" fill="#fef9c3"/>
      <circle cx="33" cy="26" r="1" fill="#fef9c3"/>
      <!-- Head -->
      <rect x="18" y="8" width="20" height="18" rx="4" fill="#f5d0a9"/>
      <!-- Silver hair -->
      <ellipse cx="28" cy="8" rx="12" ry="5" fill="#b0b0b0"/>
      <rect x="16" y="8" width="4" height="10" rx="2" fill="#b0b0b0"/>
      <rect x="36" y="8" width="4" height="10" rx="2" fill="#b0b0b0"/>
      <ellipse cx="28" cy="6" rx="10" ry="4" fill="#c0c0c0"/>
      <!-- Confident eyes -->
      <circle cx="23" cy="15" r="1.5" fill="#2c6b3f"/>
      <circle cx="33" cy="15" r="1.5" fill="#2c6b3f"/>
      <!-- Wink -->
      <line x1="22" y1="13" x2="24" y2="13" stroke="#555" stroke-width="0.8"/>
      <!-- Sly grin -->
      <path d="M24,20 Q28,24 33,20" stroke="#c2185b" stroke-width="1" fill="none"/>
    </svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes stepping back -->
      <rect x="24" y="79" width="8" height="4" rx="2" fill="#92400e"/>
      <rect x="35" y="79" width="8" height="4" rx="2" fill="#92400e"/>
      <!-- Tan pants -->
      <rect x="25" y="60" width="7" height="20" rx="1" fill="#d2b48c"/>
      <rect x="35" y="60" width="7" height="20" rx="1" fill="#d2b48c"/>
      <rect x="24" y="52" width="18" height="10" rx="1" fill="#d2b48c"/>
      <!-- Blue blouse -->
      <rect x="22" y="28" width="22" height="25" rx="3" fill="#3b82f6"/>
      <polygon points="29,28 33,33 37,28" fill="#60a5fa"/>
      <!-- Arms clutching pearls -->
      <path d="M22,32 Q18,36 24,38" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44,32 Q48,36 42,38" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Hands at necklace -->
      <circle cx="30" cy="28" r="3" fill="#f0c8a0"/>
      <rect x="18" y="28" width="7" height="6" rx="1" fill="#3b82f6"/>
      <rect x="41" y="28" width="7" height="6" rx="1" fill="#3b82f6"/>
      <!-- Neck -->
      <rect x="30" y="24" width="6" height="5" fill="#f0c8a0"/>
      <!-- Pearls (clutched) -->
      <circle cx="28" cy="27" r="1" fill="#fef9c3"/>
      <circle cx="31" cy="28" r="1" fill="#fef9c3"/>
      <circle cx="34" cy="27" r="1" fill="#fef9c3"/>
      <!-- Head leaning back -->
      <rect x="23" y="8" width="20" height="18" rx="4" fill="#f5d0a9" transform="rotate(3,33,17)"/>
      <!-- Silver hair -->
      <ellipse cx="33" cy="8" rx="12" ry="5" fill="#b0b0b0" transform="rotate(3,33,8)"/>
      <rect x="21" y="8" width="4" height="10" rx="2" fill="#b0b0b0"/>
      <rect x="41" y="8" width="4" height="10" rx="2" fill="#b0b0b0"/>
      <ellipse cx="33" cy="6" rx="10" ry="4" fill="#c0c0c0"/>
      <!-- Surprised eyes (wide) -->
      <circle cx="28" cy="15" r="2" fill="#fff"/>
      <circle cx="38" cy="15" r="2" fill="#fff"/>
      <circle cx="28" cy="15" r="1.2" fill="#2c6b3f"/>
      <circle cx="38" cy="15" r="1.2" fill="#2c6b3f"/>
      <!-- Surprised mouth O -->
      <ellipse cx="33" cy="21" rx="2.5" ry="2" fill="#8b4513"/>
      <!-- Worry lines -->
      <line x1="26" y1="12" x2="30" y2="13" stroke="#c88a6b" stroke-width="0.5"/>
      <line x1="36" y1="13" x2="40" y2="12" stroke="#c88a6b" stroke-width="0.5"/>
    </svg>`
  },

  // ============================================================
  // 5. DR. JOHN STURGIS — Thin elderly, bow tie, lab coat, beaker
  //    ADULT SIZE (THIN): head ~y=8, body ~y=26, feet ~y=82
  // ============================================================
  ys_sturgis: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="11" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Brown shoes -->
      <rect x="23" y="79" width="7" height="4" rx="1" fill="#78350f"/>
      <rect x="31" y="79" width="7" height="4" rx="1" fill="#78350f"/>
      <!-- Khaki pants (thin legs) -->
      <rect x="24" y="58" width="5" height="22" rx="1" fill="#c8b272"/>
      <rect x="32" y="58" width="5" height="22" rx="1" fill="#c8b272"/>
      <!-- Khaki pants body -->
      <rect x="23" y="52" width="14" height="8" rx="1" fill="#c8b272"/>
      <!-- White lab coat -->
      <rect x="17" y="26" width="26" height="30" rx="2" fill="#f0f0f0" stroke="#ddd" stroke-width="0.5"/>
      <!-- Lab coat opens to show dress shirt -->
      <rect x="25" y="28" width="10" height="20" rx="1" fill="#e0e7ff"/>
      <!-- Bow tie -->
      <polygon points="28,28 30,30 32,28" fill="#dc2626"/>
      <polygon points="28,28 30,26 32,28" fill="#dc2626"/>
      <circle cx="30" cy="28" r="1" fill="#b91c1c"/>
      <!-- Left arm holding beaker -->
      <path d="M17,30 Q10,40 14,48" stroke="#f0c8a0" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Beaker -->
      <rect x="9" y="44" width="8" height="10" rx="1" fill="none" stroke="#94a3b8" stroke-width="1"/>
      <rect x="10" y="48" width="6" height="6" rx="0" fill="#22c55e" opacity="0.6"/>
      <rect x="11" y="42" width="4" height="3" rx="0" fill="none" stroke="#94a3b8" stroke-width="1"/>
      <!-- Bubbles in beaker -->
      <circle cx="12" cy="48" r="1" fill="#4ade80" opacity="0.7">
        <animate attributeName="cy" values="50;46;50" dur="1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="15" cy="49" r="0.8" fill="#86efac" opacity="0.6">
        <animate attributeName="cy" values="51;47;51" dur="0.8s" repeatCount="indefinite"/>
      </circle>
      <!-- Right arm relaxed -->
      <path d="M43,30 Q50,40 47,50" stroke="#f0c8a0" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Lab coat sleeves -->
      <rect x="14" y="26" width="6" height="6" rx="1" fill="#f0f0f0"/>
      <rect x="40" y="26" width="6" height="6" rx="1" fill="#f0f0f0"/>
      <!-- Thin neck -->
      <rect x="28" y="22" width="4" height="5" fill="#f0c8a0"/>
      <!-- Head (slightly narrow) -->
      <rect x="21" y="6" width="18" height="18" rx="4" fill="#f5d0a9"/>
      <!-- Balding with white side hair -->
      <rect x="19" y="8" width="4" height="8" rx="2" fill="#e0e0e0"/>
      <rect x="37" y="8" width="4" height="8" rx="2" fill="#e0e0e0"/>
      <rect x="23" y="5" width="14" height="4" rx="2" fill="#f5d0a9"/>
      <!-- A few wisps on top -->
      <line x1="26" y1="6" x2="27" y2="3" stroke="#e0e0e0" stroke-width="0.8"/>
      <line x1="33" y1="6" x2="34" y2="3" stroke="#e0e0e0" stroke-width="0.8"/>
      <!-- Thick glasses -->
      <rect x="22" y="12" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1.2"/>
      <rect x="31" y="12" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1.2"/>
      <line x1="29" y1="14" x2="31" y2="14" stroke="#555" stroke-width="1"/>
      <line x1="22" y1="14" x2="19" y2="13" stroke="#555" stroke-width="0.8"/>
      <line x1="38" y1="14" x2="41" y2="13" stroke="#555" stroke-width="0.8"/>
      <!-- Eyes -->
      <circle cx="25.5" cy="14.5" r="1.2" fill="#2c1810"/>
      <circle cx="34.5" cy="14.5" r="1.2" fill="#2c1810"/>
      <!-- Gentle smile -->
      <path d="M27,20 Q30,22 33,20" stroke="#8b4513" stroke-width="0.8" fill="none"/>
    </svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="26" cy="85" rx="11" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes -->
      <rect x="19" y="79" width="7" height="4" rx="1" fill="#78350f"/>
      <rect x="28" y="79" width="7" height="4" rx="1" fill="#78350f"/>
      <!-- Khaki pants -->
      <rect x="20" y="58" width="5" height="22" rx="1" fill="#c8b272"/>
      <rect x="29" y="58" width="5" height="22" rx="1" fill="#c8b272"/>
      <rect x="19" y="52" width="14" height="8" rx="1" fill="#c8b272"/>
      <!-- Lab coat -->
      <rect x="13" y="26" width="26" height="30" rx="2" fill="#f0f0f0" stroke="#ddd" stroke-width="0.5"/>
      <rect x="21" y="28" width="10" height="20" rx="1" fill="#e0e7ff"/>
      <!-- Bow tie -->
      <polygon points="24,28 26,30 28,28" fill="#dc2626"/>
      <polygon points="24,28 26,26 28,28" fill="#dc2626"/>
      <circle cx="26" cy="28" r="1" fill="#b91c1c"/>
      <!-- Left arm back -->
      <path d="M13,30 Q6,38 10,46" stroke="#f0c8a0" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Right arm throwing flask -->
      <path d="M39,28 Q48,22 54,16" stroke="#f0c8a0" stroke-width="4" fill="none" stroke-linecap="round"/>
      <rect x="10" y="26" width="6" height="6" rx="1" fill="#f0f0f0"/>
      <rect x="36" y="26" width="6" height="6" rx="1" fill="#f0f0f0"/>
      <!-- Flask flying -->
      <path d="M54,10 L52,16 L58,16 Z" fill="#94a3b8" stroke="#64748b" stroke-width="0.5"/>
      <rect x="53" y="8" width="2" height="3" fill="#94a3b8"/>
      <rect x="52" y="12" width="6" height="4" rx="0" fill="#22c55e" opacity="0.5"/>
      <!-- Chemical explosion cloud -->
      <circle cx="52" cy="8" r="6" fill="#22c55e" opacity="0.3">
        <animate attributeName="r" values="4;8;4" dur="0.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="48" cy="6" r="4" fill="#84cc16" opacity="0.3">
        <animate attributeName="r" values="3;6;3" dur="0.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="56" cy="5" r="5" fill="#eab308" opacity="0.25">
        <animate attributeName="r" values="3;7;3" dur="0.7s" repeatCount="indefinite"/>
      </circle>
      <!-- Green/yellow particles -->
      <circle cx="46" cy="4" r="1" fill="#4ade80">
        <animate attributeName="cy" values="4;0;4" dur="0.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="58" cy="2" r="1.2" fill="#facc15">
        <animate attributeName="cy" values="2;-2;2" dur="0.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="52" cy="0" r="0.8" fill="#86efac">
        <animate attributeName="cx" values="52;54;52" dur="0.35s" repeatCount="indefinite"/>
      </circle>
      <!-- Neck -->
      <rect x="24" y="22" width="4" height="5" fill="#f0c8a0"/>
      <!-- Head -->
      <rect x="17" y="6" width="18" height="18" rx="4" fill="#f5d0a9"/>
      <!-- Side hair -->
      <rect x="15" y="8" width="4" height="8" rx="2" fill="#e0e0e0"/>
      <rect x="33" y="8" width="4" height="8" rx="2" fill="#e0e0e0"/>
      <rect x="19" y="5" width="14" height="4" rx="2" fill="#f5d0a9"/>
      <!-- Glasses -->
      <rect x="18" y="12" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1.2"/>
      <rect x="27" y="12" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1.2"/>
      <line x1="25" y1="14" x2="27" y2="14" stroke="#555" stroke-width="1"/>
      <line x1="18" y1="14" x2="15" y2="13" stroke="#555" stroke-width="0.8"/>
      <line x1="34" y1="14" x2="37" y2="13" stroke="#555" stroke-width="0.8"/>
      <!-- Excited eyes -->
      <circle cx="21.5" cy="14.5" r="1.5" fill="#2c1810"/>
      <circle cx="30.5" cy="14.5" r="1.5" fill="#2c1810"/>
      <circle cx="22" cy="14" r="0.5" fill="#fff"/>
      <circle cx="31" cy="14" r="0.5" fill="#fff"/>
      <!-- Excited grin -->
      <ellipse cx="26" cy="20" rx="3" ry="2" fill="#4a1010"/>
      <path d="M23,20 Q26,23 29,20" stroke="#fff" stroke-width="0.5" fill="none"/>
    </svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="11" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes stumbling -->
      <rect x="25" y="79" width="7" height="4" rx="1" fill="#78350f"/>
      <rect x="35" y="78" width="7" height="4" rx="1" fill="#78350f" transform="rotate(5,38,80)"/>
      <!-- Khaki pants -->
      <rect x="26" y="58" width="5" height="22" rx="1" fill="#c8b272"/>
      <rect x="35" y="57" width="5" height="22" rx="1" fill="#c8b272" transform="rotate(3,37,68)"/>
      <rect x="25" y="52" width="14" height="8" rx="1" fill="#c8b272"/>
      <!-- Singed lab coat (with burn marks) -->
      <rect x="19" y="26" width="26" height="30" rx="2" fill="#e8e8e8" stroke="#bbb" stroke-width="0.5"/>
      <!-- Burn marks -->
      <circle cx="24" cy="38" r="2" fill="#78350f" opacity="0.4"/>
      <circle cx="38" cy="42" r="1.5" fill="#78350f" opacity="0.3"/>
      <circle cx="30" cy="50" r="2.5" fill="#92400e" opacity="0.3"/>
      <!-- Dress shirt visible -->
      <rect x="27" y="28" width="10" height="20" rx="1" fill="#d4d4d8"/>
      <!-- Bow tie (askew) -->
      <polygon points="30,28 32,30 34,28" fill="#dc2626" transform="rotate(10,32,29)"/>
      <polygon points="30,28 32,26 34,28" fill="#dc2626" transform="rotate(10,32,27)"/>
      <!-- Arms wobbling -->
      <path d="M19,30 Q12,38 16,48" stroke="#f0c8a0" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M45,30 Q50,36 46,44" stroke="#f0c8a0" stroke-width="4" fill="none" stroke-linecap="round"/>
      <rect x="16" y="26" width="6" height="6" rx="1" fill="#e8e8e8"/>
      <rect x="42" y="26" width="6" height="6" rx="1" fill="#e8e8e8"/>
      <!-- Thin neck -->
      <rect x="30" y="22" width="4" height="5" fill="#f0c8a0"/>
      <!-- Head tilted -->
      <rect x="23" y="6" width="18" height="18" rx="4" fill="#f5d0a9" transform="rotate(-5,32,15)"/>
      <!-- Singed side hair -->
      <rect x="21" y="8" width="4" height="8" rx="2" fill="#c0c0c0"/>
      <rect x="39" y="8" width="4" height="8" rx="2" fill="#c0c0c0"/>
      <!-- Some hair standing up (shock) -->
      <line x1="28" y1="6" x2="27" y2="1" stroke="#d0d0d0" stroke-width="1"/>
      <line x1="32" y1="6" x2="34" y2="1" stroke="#d0d0d0" stroke-width="1"/>
      <line x1="30" y1="5" x2="30" y2="0" stroke="#d0d0d0" stroke-width="1"/>
      <!-- Cracked glasses -->
      <rect x="24" y="12" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1.2"/>
      <rect x="33" y="12" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1.2"/>
      <line x1="31" y1="14" x2="33" y2="14" stroke="#555" stroke-width="1"/>
      <!-- Crack lines on left lens -->
      <line x1="25" y1="12" x2="28" y2="16" stroke="#555" stroke-width="0.5"/>
      <line x1="26" y1="13" x2="24" y2="16" stroke="#555" stroke-width="0.5"/>
      <!-- Dizzy eyes -->
      <circle cx="27.5" cy="14.5" r="1.5" fill="#2c1810"/>
      <circle cx="36.5" cy="14.5" r="1.5" fill="#2c1810"/>
      <!-- Spiral dizzy marks -->
      <circle cx="27.5" cy="14.5" r="0.5" fill="#fff"/>
      <!-- Dazed mouth -->
      <path d="M29,20 Q32,18 35,20" stroke="#8b4513" stroke-width="0.8" fill="none"/>
      <!-- Smoke wisps -->
      <path d="M22,4 Q20,0 22,-3" stroke="#9ca3af" stroke-width="0.8" fill="none" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1s" repeatCount="indefinite"/>
      </path>
      <path d="M38,4 Q40,0 38,-3" stroke="#9ca3af" stroke-width="0.8" fill="none" opacity="0.4">
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="0.8s" repeatCount="indefinite"/>
      </path>
    </svg>`
  }

};

if (typeof vectors !== 'undefined') Object.assign(vectors, ysCharVectorsA);
