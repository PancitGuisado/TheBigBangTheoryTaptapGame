const mvCharVectors = {

  // ============================================================
  // 1. TRUE SHELDON — Transcendent genius, glowing white lab coat,
  //    purple shirt, wild Einstein hair, glasses, unified field tablet
  // ============================================================
  mv_true_sheldon: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <defs>
        <radialGradient id="ts_aura"><stop offset="0%" stop-color="#c4b5fd" stop-opacity="0.5"/><stop offset="100%" stop-color="#c4b5fd" stop-opacity="0"/></radialGradient>
        <radialGradient id="ts_glow"><stop offset="0%" stop-color="#fff" stop-opacity="0.6"/><stop offset="100%" stop-color="#e0e7ff" stop-opacity="0"/></radialGradient>
      </defs>
      <!-- Cosmic aura -->
      <ellipse cx="30" cy="50" rx="26" ry="35" fill="url(#ts_aura)">
        <animate attributeName="rx" values="24;28;24" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes -->
      <rect x="22" y="80" width="7" height="4" rx="1" fill="#333"/>
      <rect x="31" y="80" width="7" height="4" rx="1" fill="#333"/>
      <!-- Dark pants -->
      <rect x="23" y="68" width="6" height="13" rx="1" fill="#374151"/>
      <rect x="31" y="68" width="6" height="13" rx="1" fill="#374151"/>
      <rect x="22" y="62" width="16" height="8" rx="1" fill="#374151"/>
      <!-- Purple shirt -->
      <rect x="20" y="44" width="20" height="19" rx="2" fill="#7c3aed"/>
      <!-- Glowing white lab coat -->
      <rect x="16" y="44" width="6" height="24" rx="1" fill="#f8fafc" opacity="0.95"/>
      <rect x="38" y="44" width="6" height="24" rx="1" fill="#f8fafc" opacity="0.95"/>
      <rect x="16" y="44" width="28" height="5" rx="1" fill="#f8fafc" opacity="0.95"/>
      <!-- Lab coat glow -->
      <rect x="15" y="43" width="30" height="26" rx="2" fill="none" stroke="#e0e7ff" stroke-width="1" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite"/>
      </rect>
      <!-- Arms -->
      <path d="M16,48 Q10,56 12,64" stroke="#f8fafc" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44,48 Q50,56 48,64" stroke="#f8fafc" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Hands (skin) -->
      <circle cx="12" cy="64" r="2.5" fill="#f0c8a0"/>
      <circle cx="48" cy="64" r="2.5" fill="#f0c8a0"/>
      <!-- Unified field tablet in right hand -->
      <rect x="44" y="58" width="10" height="12" rx="1" fill="#1e293b" stroke="#60a5fa" stroke-width="0.8"/>
      <text x="49" y="63" font-size="3" fill="#60a5fa" text-anchor="middle">E=mc²</text>
      <text x="49" y="67" font-size="2.5" fill="#a78bfa" text-anchor="middle">∫ψdx</text>
      <rect x="44" y="58" width="10" height="12" rx="1" fill="none" stroke="#a78bfa" stroke-width="0.5" opacity="0.7">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite"/>
      </rect>
      <!-- Neck -->
      <rect x="27" y="40" width="6" height="5" fill="#f0c8a0"/>
      <!-- Head -->
      <rect x="21" y="22" width="18" height="18" rx="3" fill="#f5d0a9"/>
      <!-- Wild Einstein white hair -->
      <ellipse cx="30" cy="22" rx="14" ry="6" fill="#e5e7eb"/>
      <ellipse cx="18" cy="26" rx="4" ry="6" fill="#e5e7eb"/>
      <ellipse cx="42" cy="26" rx="4" ry="6" fill="#e5e7eb"/>
      <ellipse cx="30" cy="18" rx="10" ry="4" fill="#f3f4f6"/>
      <!-- Glasses -->
      <rect x="22" y="29" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1"/>
      <rect x="31" y="29" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1"/>
      <line x1="29" y1="31" x2="31" y2="31" stroke="#555" stroke-width="1"/>
      <!-- Wise eyes -->
      <circle cx="25.5" cy="31.5" r="1.3" fill="#1e3a5f"/>
      <circle cx="34.5" cy="31.5" r="1.3" fill="#1e3a5f"/>
      <circle cx="25.5" cy="31" r="0.4" fill="#fff"/>
      <circle cx="34.5" cy="31" r="0.4" fill="#fff"/>
      <!-- Knowing smile -->
      <path d="M27,37 Q30,39 33,37" stroke="#8b4513" stroke-width="0.8" fill="none"/>
      <!-- Cosmic sparkles around -->
      <circle cx="8" cy="30" r="1" fill="#c4b5fd" opacity="0.7">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="52" cy="35" r="0.8" fill="#a78bfa" opacity="0.5">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="14" cy="15" r="0.7" fill="#e0e7ff" opacity="0.6">
        <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/>
      </circle>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <defs>
        <radialGradient id="tsa_aura"><stop offset="0%" stop-color="#a78bfa" stop-opacity="0.6"/><stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>
      </defs>
      <!-- Cosmic aura intensified -->
      <ellipse cx="30" cy="50" rx="28" ry="38" fill="url(#tsa_aura)">
        <animate attributeName="rx" values="26;30;26" dur="0.6s" repeatCount="indefinite"/>
      </ellipse>
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes -->
      <rect x="20" y="80" width="7" height="4" rx="1" fill="#333"/>
      <rect x="29" y="80" width="7" height="4" rx="1" fill="#333"/>
      <!-- Dark pants -->
      <rect x="21" y="68" width="6" height="13" rx="1" fill="#374151"/>
      <rect x="29" y="68" width="6" height="13" rx="1" fill="#374151"/>
      <rect x="20" y="62" width="16" height="8" rx="1" fill="#374151"/>
      <!-- Purple shirt -->
      <rect x="18" y="44" width="20" height="19" rx="2" fill="#7c3aed"/>
      <!-- Lab coat -->
      <rect x="14" y="44" width="6" height="24" rx="1" fill="#f8fafc"/>
      <rect x="36" y="44" width="6" height="24" rx="1" fill="#f8fafc"/>
      <rect x="14" y="44" width="28" height="5" rx="1" fill="#f8fafc"/>
      <!-- Left arm down -->
      <path d="M14,48 Q8,56 10,64" stroke="#f8fafc" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Right arm EXTENDED with tablet -->
      <path d="M42,46 Q50,42 54,38" stroke="#f8fafc" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Glowing tablet thrust forward -->
      <rect x="50" y="32" width="10" height="12" rx="1" fill="#1e293b" stroke="#a78bfa" stroke-width="1"/>
      <text x="55" y="37" font-size="3" fill="#c4b5fd" text-anchor="middle">E=mc²</text>
      <text x="55" y="41" font-size="2.5" fill="#a78bfa" text-anchor="middle">∫ψdx</text>
      <!-- Energy blast from tablet -->
      <line x1="55" y1="32" x2="58" y2="22" stroke="#c4b5fd" stroke-width="1" opacity="0.8">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.3s" repeatCount="indefinite"/>
      </line>
      <line x1="60" y1="38" x2="58" y2="28" stroke="#a78bfa" stroke-width="0.8" opacity="0.6">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="0.4s" repeatCount="indefinite"/>
      </line>
      <!-- Neck -->
      <rect x="25" y="40" width="6" height="5" fill="#f0c8a0"/>
      <!-- Head -->
      <rect x="19" y="22" width="18" height="18" rx="3" fill="#f5d0a9"/>
      <!-- Wild hair -->
      <ellipse cx="28" cy="22" rx="14" ry="6" fill="#e5e7eb"/>
      <ellipse cx="16" cy="26" rx="4" ry="6" fill="#e5e7eb"/>
      <ellipse cx="40" cy="26" rx="4" ry="6" fill="#e5e7eb"/>
      <ellipse cx="28" cy="18" rx="10" ry="4" fill="#f3f4f6"/>
      <!-- Glasses -->
      <rect x="20" y="29" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1"/>
      <rect x="29" y="29" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1"/>
      <line x1="27" y1="31" x2="29" y2="31" stroke="#555" stroke-width="1"/>
      <!-- Intense eyes -->
      <circle cx="23.5" cy="31.5" r="1.5" fill="#1e3a5f"/>
      <circle cx="32.5" cy="31.5" r="1.5" fill="#1e3a5f"/>
      <!-- Determined mouth -->
      <line x1="24" y1="37" x2="32" y2="37" stroke="#8b4513" stroke-width="0.8"/>
      <!-- Attack overlay -->
      <g class="attack-overlay">
        <line x1="55" y1="38" x2="60" y2="45" stroke="#e0e7ff" stroke-width="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
        </line>
        <line x1="55" y1="38" x2="60" y2="32" stroke="#c4b5fd" stroke-width="1.2" opacity="0.6">
          <animate attributeName="opacity" values="0;1;0" dur="0.35s" repeatCount="indefinite"/>
        </line>
        <circle cx="58" cy="26" r="1.5" fill="#e0e7ff" opacity="0.8">
          <animate attributeName="r" values="1;2.5;1" dur="0.5s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes stumble -->
      <rect x="25" y="80" width="7" height="4" rx="1" fill="#333"/>
      <rect x="34" y="79" width="7" height="4" rx="1" fill="#333" transform="rotate(5,37,81)"/>
      <!-- Dark pants -->
      <rect x="26" y="68" width="6" height="13" rx="1" fill="#374151"/>
      <rect x="34" y="67" width="6" height="13" rx="1" fill="#374151" transform="rotate(3,37,73)"/>
      <rect x="24" y="62" width="16" height="8" rx="1" fill="#374151"/>
      <!-- Purple shirt -->
      <rect x="22" y="44" width="20" height="19" rx="2" fill="#7c3aed"/>
      <!-- Wrinkled lab coat -->
      <rect x="18" y="44" width="6" height="24" rx="1" fill="#e2e8f0"/>
      <rect x="40" y="44" width="6" height="24" rx="1" fill="#e2e8f0"/>
      <rect x="18" y="44" width="28" height="5" rx="1" fill="#e2e8f0"/>
      <!-- Arms up defensive -->
      <path d="M18,48 Q14,38 16,32" stroke="#e2e8f0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M46,48 Q50,38 48,32" stroke="#e2e8f0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Neck -->
      <rect x="29" y="40" width="6" height="5" fill="#f0c8a0"/>
      <!-- Head tilted -->
      <rect x="23" y="22" width="18" height="18" rx="3" fill="#f5d0a9" transform="rotate(-5,32,31)"/>
      <!-- Messy hair -->
      <ellipse cx="32" cy="22" rx="14" ry="6" fill="#d1d5db" transform="rotate(-5,32,22)"/>
      <ellipse cx="20" cy="26" rx="4" ry="5" fill="#d1d5db"/>
      <ellipse cx="44" cy="26" rx="4" ry="5" fill="#d1d5db"/>
      <!-- Crooked glasses -->
      <rect x="24" y="28" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1" transform="rotate(-8,27,31)"/>
      <rect x="33" y="30" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1" transform="rotate(5,36,32)"/>
      <line x1="31" y1="30" x2="33" y2="31" stroke="#555" stroke-width="1"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <!-- X over left eye -->
        <line x1="24" y1="30" x2="28" y2="34" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="28" y1="30" x2="24" y2="34" stroke="#dc2626" stroke-width="1.2"/>
        <!-- Right eye worried -->
        <circle cx="36" cy="32" r="1.5" fill="#2c1810"/>
        <!-- Distress mouth -->
        <path d="M29,38 Q32,36 35,38" stroke="#8b4513" stroke-width="0.8" fill="none"/>
        <!-- Sweat drops -->
        <ellipse cx="44" cy="27" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="27;31;27" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="18" cy="25" rx="1" ry="2" fill="#7dd3fc" opacity="0.6">
          <animate attributeName="cy" values="25;29;25" dur="0.7s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  },

  // ============================================================
  // 2. PRESIDENT SIEBERT — Caltech president, dark suit, red tie,
  //    gray hair combed back, stern, clipboard/papers
  // ============================================================
  mv_siebert: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Black dress shoes -->
      <rect x="22" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="31" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Dark suit pants -->
      <rect x="23" y="66" width="6" height="15" rx="1" fill="#1e293b"/>
      <rect x="31" y="66" width="6" height="15" rx="1" fill="#1e293b"/>
      <rect x="22" y="60" width="16" height="8" rx="1" fill="#1e293b"/>
      <!-- Dark suit jacket -->
      <rect x="19" y="42" width="22" height="20" rx="2" fill="#1e293b"/>
      <!-- White shirt front -->
      <rect x="27" y="43" width="6" height="18" rx="1" fill="#f1f5f9"/>
      <!-- Red tie -->
      <polygon points="30,44 28,50 30,62 32,50" fill="#dc2626"/>
      <!-- Suit lapels -->
      <polygon points="27,43 22,43 27,56" fill="#111827"/>
      <polygon points="33,43 38,43 33,56" fill="#111827"/>
      <!-- Arms -->
      <path d="M19,46 Q13,54 15,62" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M41,46 Q47,54 45,62" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Hands -->
      <circle cx="15" cy="62" r="2.5" fill="#e8b896"/>
      <circle cx="45" cy="62" r="2.5" fill="#e8b896"/>
      <!-- Clipboard in left hand -->
      <rect x="8" y="55" width="9" height="12" rx="1" fill="#d4a76a" stroke="#92400e" stroke-width="0.5"/>
      <rect x="9" y="57" width="7" height="2" rx="0.3" fill="#fff"/>
      <rect x="9" y="60" width="7" height="1" rx="0.3" fill="#ddd"/>
      <rect x="9" y="62" width="5" height="1" rx="0.3" fill="#ddd"/>
      <rect x="9" y="55" width="7" height="2" rx="0.5" fill="#92400e"/>
      <!-- Neck -->
      <rect x="27" y="38" width="6" height="5" fill="#e8b896"/>
      <!-- Head -->
      <rect x="21" y="20" width="18" height="18" rx="3" fill="#e8b896"/>
      <!-- Gray hair combed back -->
      <path d="M21,24 Q21,17 30,17 Q39,17 39,24" fill="#9ca3af"/>
      <rect x="21" y="20" width="18" height="4" rx="2" fill="#9ca3af"/>
      <!-- Stern eyes -->
      <rect x="24" y="28" width="4" height="2" rx="1" fill="#2c1810"/>
      <rect x="32" y="28" width="4" height="2" rx="1" fill="#2c1810"/>
      <!-- Stern eyebrows -->
      <line x1="23" y1="26" x2="28" y2="27" stroke="#6b7280" stroke-width="1"/>
      <line x1="37" y1="27" x2="32" y2="26" stroke="#6b7280" stroke-width="1"/>
      <!-- Thin frown -->
      <line x1="27" y1="34" x2="33" y2="34" stroke="#8b4513" stroke-width="0.8"/>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes -->
      <rect x="20" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="29" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Suit pants -->
      <rect x="21" y="66" width="6" height="15" rx="1" fill="#1e293b"/>
      <rect x="29" y="66" width="6" height="15" rx="1" fill="#1e293b"/>
      <rect x="20" y="60" width="16" height="8" rx="1" fill="#1e293b"/>
      <!-- Suit jacket -->
      <rect x="17" y="42" width="22" height="20" rx="2" fill="#1e293b"/>
      <!-- White shirt -->
      <rect x="25" y="43" width="6" height="18" rx="1" fill="#f1f5f9"/>
      <!-- Red tie -->
      <polygon points="28,44 26,50 28,62 30,50" fill="#dc2626"/>
      <!-- Lapels -->
      <polygon points="25,43 20,43 25,56" fill="#111827"/>
      <polygon points="31,43 36,43 31,56" fill="#111827"/>
      <!-- Left arm -->
      <path d="M17,46 Q11,54 13,62" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Right arm SWINGING clipboard -->
      <path d="M39,44 Q48,40 52,36" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Clipboard swung forward -->
      <rect x="48" y="30" width="9" height="12" rx="1" fill="#d4a76a" stroke="#92400e" stroke-width="0.5" transform="rotate(-20,52,36)"/>
      <!-- Paper flying off -->
      <rect x="52" y="26" width="5" height="6" rx="0.5" fill="#fff" transform="rotate(-30,54,29)" opacity="0.8"/>
      <rect x="48" y="22" width="4" height="5" rx="0.5" fill="#f0f0f0" transform="rotate(-45,50,24)" opacity="0.6"/>
      <!-- Neck -->
      <rect x="25" y="38" width="6" height="5" fill="#e8b896"/>
      <!-- Head -->
      <rect x="19" y="20" width="18" height="18" rx="3" fill="#e8b896"/>
      <!-- Hair -->
      <path d="M19,24 Q19,17 28,17 Q37,17 37,24" fill="#9ca3af"/>
      <rect x="19" y="20" width="18" height="4" rx="2" fill="#9ca3af"/>
      <!-- Angry eyes -->
      <rect x="22" y="28" width="4" height="2.5" rx="1" fill="#2c1810"/>
      <rect x="30" y="28" width="4" height="2.5" rx="1" fill="#2c1810"/>
      <!-- Angry brows -->
      <line x1="21" y1="27" x2="26" y2="25" stroke="#6b7280" stroke-width="1.2"/>
      <line x1="35" y1="25" x2="30" y2="27" stroke="#6b7280" stroke-width="1.2"/>
      <!-- Shouting mouth -->
      <ellipse cx="28" cy="35" rx="3" ry="2" fill="#7f1d1d"/>
      <!-- Attack overlay -->
      <g class="attack-overlay">
        <line x1="52" y1="30" x2="58" y2="24" stroke="#fbbf24" stroke-width="1.5" opacity="0.8">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
        </line>
        <line x1="54" y1="36" x2="60" y2="34" stroke="#fbbf24" stroke-width="1" opacity="0.6">
          <animate attributeName="opacity" values="0;1;0" dur="0.35s" repeatCount="indefinite"/>
        </line>
        <circle cx="56" cy="28" r="2" fill="#fef08a" opacity="0.7">
          <animate attributeName="r" values="1;3;1" dur="0.5s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes stumble -->
      <rect x="25" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="34" y="79" width="7" height="4" rx="1" fill="#1a1a1a" transform="rotate(5,37,81)"/>
      <!-- Suit pants -->
      <rect x="26" y="66" width="6" height="15" rx="1" fill="#1e293b"/>
      <rect x="34" y="66" width="6" height="15" rx="1" fill="#1e293b" transform="rotate(3,37,73)"/>
      <rect x="24" y="60" width="16" height="8" rx="1" fill="#1e293b"/>
      <!-- Suit jacket wrinkled -->
      <rect x="22" y="42" width="22" height="20" rx="2" fill="#1e293b"/>
      <!-- Loose tie -->
      <polygon points="33,44 31,52 33,60 35,52" fill="#dc2626" transform="rotate(8,33,52)"/>
      <!-- Arms defensive -->
      <path d="M22,46 Q16,38 18,32" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44,46 Q50,38 48,32" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Neck -->
      <rect x="29" y="38" width="6" height="5" fill="#e8b896"/>
      <!-- Head tilted -->
      <rect x="23" y="20" width="18" height="18" rx="3" fill="#e8b896" transform="rotate(-5,32,29)"/>
      <!-- Messed hair -->
      <path d="M23,24 Q23,17 32,17 Q41,17 41,24" fill="#9ca3af" transform="rotate(-5,32,20)"/>
      <rect x="23" y="20" width="18" height="4" rx="2" fill="#9ca3af" transform="rotate(-5,32,22)"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <!-- X over left eye -->
        <line x1="25" y1="27" x2="29" y2="31" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="29" y1="27" x2="25" y2="31" stroke="#dc2626" stroke-width="1.2"/>
        <!-- Right eye wincing -->
        <line x1="33" y1="29" x2="37" y2="29" stroke="#2c1810" stroke-width="1"/>
        <!-- Grimace -->
        <path d="M29,36 Q32,34 35,36" stroke="#8b4513" stroke-width="0.8" fill="none"/>
        <!-- Sweat drops -->
        <ellipse cx="44" cy="25" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="25;29;25" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  },

  // ============================================================
  // 3. RAMONA NOWITZKI — Obsessive fan, brown ponytail, glasses,
  //    green blouse, khaki skirt, notebook, intense expression
  // ============================================================
  mv_ramona: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Brown flats -->
      <rect x="22" y="80" width="7" height="4" rx="1" fill="#92400e"/>
      <rect x="31" y="80" width="7" height="4" rx="1" fill="#92400e"/>
      <!-- Bare legs -->
      <rect x="24" y="68" width="5" height="13" rx="1" fill="#f0c8a0"/>
      <rect x="31" y="68" width="5" height="13" rx="1" fill="#f0c8a0"/>
      <!-- Khaki skirt -->
      <polygon points="22,58 38,58 40,70 20,70" fill="#c8b272"/>
      <line x1="30" y1="58" x2="30" y2="70" stroke="#b5a060" stroke-width="0.5"/>
      <!-- Green blouse -->
      <rect x="20" y="42" width="20" height="17" rx="2" fill="#16a34a"/>
      <!-- Collar -->
      <polygon points="27,42 30,46 33,42" fill="#15803d"/>
      <!-- Arms -->
      <path d="M20,46 Q14,54 16,60" stroke="#f0c8a0" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M40,46 Q46,54 44,60" stroke="#f0c8a0" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <!-- Short sleeves -->
      <rect x="17" y="42" width="5" height="5" rx="1" fill="#16a34a"/>
      <rect x="38" y="42" width="5" height="5" rx="1" fill="#16a34a"/>
      <!-- Hands -->
      <circle cx="16" cy="60" r="2" fill="#f0c8a0"/>
      <circle cx="44" cy="60" r="2" fill="#f0c8a0"/>
      <!-- Notebook in right hand -->
      <rect x="41" y="53" width="8" height="11" rx="1" fill="#fbbf24" stroke="#92400e" stroke-width="0.5"/>
      <line x1="43" y1="56" x2="47" y2="56" stroke="#92400e" stroke-width="0.5"/>
      <line x1="43" y1="58" x2="48" y2="58" stroke="#92400e" stroke-width="0.5"/>
      <line x1="43" y1="60" x2="46" y2="60" stroke="#92400e" stroke-width="0.5"/>
      <!-- Pen in notebook -->
      <line x1="49" y1="52" x2="49" y2="64" stroke="#1e40af" stroke-width="0.8"/>
      <!-- Neck -->
      <rect x="27" y="38" width="6" height="5" fill="#f0c8a0"/>
      <!-- Head -->
      <rect x="21" y="20" width="18" height="18" rx="3" fill="#f5d0a9"/>
      <!-- Brown hair (ponytail) -->
      <rect x="20" y="18" width="20" height="8" rx="3" fill="#6b4423"/>
      <rect x="20" y="22" width="3" height="6" rx="1" fill="#6b4423"/>
      <rect x="37" y="22" width="3" height="6" rx="1" fill="#6b4423"/>
      <!-- Ponytail going back -->
      <ellipse cx="40" cy="22" rx="3" ry="5" fill="#6b4423"/>
      <rect x="39" y="24" width="4" height="14" rx="2" fill="#6b4423"/>
      <!-- Ponytail band -->
      <rect x="39" y="23" width="4" height="2" rx="0.5" fill="#dc2626"/>
      <!-- Glasses -->
      <rect x="22" y="28" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1"/>
      <rect x="31" y="28" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1"/>
      <line x1="29" y1="30" x2="31" y2="30" stroke="#555" stroke-width="1"/>
      <!-- Intense eyes (wide, focused) -->
      <circle cx="25.5" cy="30.5" r="1.8" fill="#2c1810"/>
      <circle cx="34.5" cy="30.5" r="1.8" fill="#2c1810"/>
      <circle cx="25.5" cy="30" r="0.5" fill="#fff"/>
      <circle cx="34.5" cy="30" r="0.5" fill="#fff"/>
      <!-- Determined thin smile -->
      <line x1="27" y1="35" x2="33" y2="35" stroke="#8b4513" stroke-width="0.8"/>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes -->
      <rect x="20" y="80" width="7" height="4" rx="1" fill="#92400e"/>
      <rect x="29" y="80" width="7" height="4" rx="1" fill="#92400e"/>
      <!-- Legs -->
      <rect x="22" y="68" width="5" height="13" rx="1" fill="#f0c8a0"/>
      <rect x="29" y="68" width="5" height="13" rx="1" fill="#f0c8a0"/>
      <!-- Khaki skirt -->
      <polygon points="20,58 36,58 38,70 18,70" fill="#c8b272"/>
      <!-- Green blouse -->
      <rect x="18" y="42" width="20" height="17" rx="2" fill="#16a34a"/>
      <polygon points="25,42 28,46 31,42" fill="#15803d"/>
      <!-- Left arm -->
      <path d="M18,46 Q12,54 14,60" stroke="#f0c8a0" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <!-- Right arm THRUSTING notebook -->
      <path d="M38,44 Q46,40 52,38" stroke="#f0c8a0" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <!-- Sleeves -->
      <rect x="15" y="42" width="5" height="5" rx="1" fill="#16a34a"/>
      <rect x="36" y="42" width="5" height="5" rx="1" fill="#16a34a"/>
      <!-- Notebook thrust forward -->
      <rect x="48" y="32" width="9" height="12" rx="1" fill="#fbbf24" stroke="#92400e" stroke-width="0.5"/>
      <text x="52" y="39" font-size="3" fill="#92400e" text-anchor="middle">SIGN!</text>
      <!-- Neck -->
      <rect x="25" y="38" width="6" height="5" fill="#f0c8a0"/>
      <!-- Head -->
      <rect x="19" y="20" width="18" height="18" rx="3" fill="#f5d0a9"/>
      <!-- Hair -->
      <rect x="18" y="18" width="20" height="8" rx="3" fill="#6b4423"/>
      <rect x="18" y="22" width="3" height="6" rx="1" fill="#6b4423"/>
      <rect x="35" y="22" width="3" height="6" rx="1" fill="#6b4423"/>
      <ellipse cx="38" cy="22" rx="3" ry="5" fill="#6b4423"/>
      <rect x="37" y="24" width="4" height="14" rx="2" fill="#6b4423"/>
      <rect x="37" y="23" width="4" height="2" rx="0.5" fill="#dc2626"/>
      <!-- Glasses -->
      <rect x="20" y="28" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1"/>
      <rect x="29" y="28" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1"/>
      <line x1="27" y1="30" x2="29" y2="30" stroke="#555" stroke-width="1"/>
      <!-- Obsessive eyes -->
      <circle cx="23.5" cy="30.5" r="2" fill="#2c1810"/>
      <circle cx="32.5" cy="30.5" r="2" fill="#2c1810"/>
      <circle cx="23.5" cy="30" r="0.6" fill="#fff"/>
      <circle cx="32.5" cy="30" r="0.6" fill="#fff"/>
      <!-- Open mouth shouting -->
      <ellipse cx="26" cy="35" rx="3" ry="1.5" fill="#7f1d1d"/>
      <!-- Attack overlay -->
      <g class="attack-overlay">
        <line x1="50" y1="32" x2="56" y2="26" stroke="#fbbf24" stroke-width="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
        </line>
        <line x1="56" y1="38" x2="60" y2="36" stroke="#fbbf24" stroke-width="1" opacity="0.6">
          <animate attributeName="opacity" values="0;1;0" dur="0.35s" repeatCount="indefinite"/>
        </line>
        <circle cx="54" cy="30" r="1.5" fill="#fef08a" opacity="0.8">
          <animate attributeName="r" values="1;2.5;1" dur="0.5s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes stumble -->
      <rect x="25" y="80" width="7" height="4" rx="1" fill="#92400e"/>
      <rect x="34" y="79" width="7" height="4" rx="1" fill="#92400e" transform="rotate(5,37,81)"/>
      <!-- Legs -->
      <rect x="26" y="68" width="5" height="13" rx="1" fill="#f0c8a0"/>
      <rect x="33" y="68" width="5" height="13" rx="1" fill="#f0c8a0" transform="rotate(3,35,74)"/>
      <!-- Skirt -->
      <polygon points="24,58 40,58 42,70 22,70" fill="#c8b272"/>
      <!-- Green blouse -->
      <rect x="22" y="42" width="20" height="17" rx="2" fill="#16a34a"/>
      <!-- Arms defensive -->
      <path d="M22,46 Q16,38 18,32" stroke="#f0c8a0" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M42,46 Q48,38 46,32" stroke="#f0c8a0" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <rect x="19" y="42" width="5" height="5" rx="1" fill="#16a34a"/>
      <rect x="39" y="42" width="5" height="5" rx="1" fill="#16a34a"/>
      <!-- Dropped notebook -->
      <rect x="10" y="76" width="8" height="10" rx="1" fill="#fbbf24" transform="rotate(-15,14,81)" opacity="0.8"/>
      <!-- Neck -->
      <rect x="29" y="38" width="6" height="5" fill="#f0c8a0"/>
      <!-- Head tilted -->
      <rect x="23" y="20" width="18" height="18" rx="3" fill="#f5d0a9" transform="rotate(-5,32,29)"/>
      <!-- Messy hair -->
      <rect x="22" y="18" width="20" height="8" rx="3" fill="#6b4423" transform="rotate(-5,32,22)"/>
      <ellipse cx="42" cy="24" rx="3" ry="5" fill="#6b4423"/>
      <rect x="41" y="26" width="4" height="12" rx="2" fill="#6b4423"/>
      <!-- Crooked glasses -->
      <rect x="24" y="28" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1" transform="rotate(-8,27,31)"/>
      <rect x="33" y="30" width="7" height="5" rx="2" fill="none" stroke="#555" stroke-width="1" transform="rotate(5,36,32)"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <line x1="24" y1="29" x2="28" y2="33" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="28" y1="29" x2="24" y2="33" stroke="#dc2626" stroke-width="1.2"/>
        <circle cx="36" cy="32" r="1.5" fill="#2c1810"/>
        <path d="M29,37 Q32,35 35,37" stroke="#8b4513" stroke-width="0.8" fill="none"/>
        <ellipse cx="44" cy="26" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="26;30;26" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  },

  // ============================================================
  // 4. CAPTAIN SWEATPANTS — Overweight comic nerd, gray sweatpants,
  //    oversized t-shirt with comic logo, messy hair, baseball cap
  // ============================================================
  mv_captain_sweatpants: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Sneakers (wide) -->
      <rect x="20" y="80" width="8" height="4" rx="1" fill="#fff" stroke="#ccc" stroke-width="0.5"/>
      <rect x="32" y="80" width="8" height="4" rx="1" fill="#fff" stroke="#ccc" stroke-width="0.5"/>
      <!-- Gray sweatpants (wide) -->
      <rect x="21" y="66" width="8" height="15" rx="2" fill="#9ca3af"/>
      <rect x="31" y="66" width="8" height="15" rx="2" fill="#9ca3af"/>
      <rect x="20" y="60" width="20" height="8" rx="2" fill="#9ca3af"/>
      <!-- Drawstring -->
      <path d="M28,60 Q27,62 26,60" stroke="#6b7280" stroke-width="0.5" fill="none"/>
      <path d="M32,60 Q33,62 34,60" stroke="#6b7280" stroke-width="0.5" fill="none"/>
      <!-- Oversized t-shirt (wide body) -->
      <rect x="16" y="40" width="28" height="22" rx="3" fill="#3b82f6"/>
      <!-- Comic logo on shirt (yellow star burst) -->
      <polygon points="30,46 32,50 36,50 33,53 34,57 30,54 26,57 27,53 24,50 28,50" fill="#fbbf24"/>
      <text x="30" y="53" font-size="3" fill="#dc2626" text-anchor="middle" font-weight="bold">POW</text>
      <!-- Short sleeves (wide) -->
      <rect x="12" y="40" width="7" height="6" rx="1" fill="#3b82f6"/>
      <rect x="41" y="40" width="7" height="6" rx="1" fill="#3b82f6"/>
      <!-- Chubby arms -->
      <path d="M16,44 Q10,52 12,60" stroke="#f0c8a0" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M44,44 Q50,52 48,60" stroke="#f0c8a0" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Hands -->
      <circle cx="12" cy="60" r="3" fill="#f0c8a0"/>
      <circle cx="48" cy="60" r="3" fill="#f0c8a0"/>
      <!-- Comic books in left hand -->
      <rect x="4" y="54" width="10" height="13" rx="1" fill="#dc2626"/>
      <rect x="5" y="55" width="10" height="13" rx="1" fill="#16a34a"/>
      <rect x="6" y="56" width="10" height="13" rx="1" fill="#eab308"/>
      <text x="11" y="64" font-size="2.5" fill="#1e293b" text-anchor="middle">COMIC</text>
      <!-- Neck (thick) -->
      <rect x="26" y="36" width="8" height="5" fill="#f0c8a0"/>
      <!-- Round head -->
      <rect x="20" y="18" width="20" height="18" rx="5" fill="#f5d0a9"/>
      <!-- Double chin -->
      <ellipse cx="30" cy="36" rx="6" ry="2" fill="#f0c8a0"/>
      <!-- Baseball cap -->
      <rect x="18" y="16" width="24" height="6" rx="2" fill="#dc2626"/>
      <rect x="16" y="21" width="22" height="3" rx="1" fill="#b91c1c"/>
      <!-- Cap brim -->
      <rect x="14" y="22" width="12" height="2" rx="1" fill="#991b1b"/>
      <!-- Messy hair sticking out -->
      <rect x="38" y="22" width="4" height="4" rx="1" fill="#92400e"/>
      <rect x="17" y="23" width="3" height="3" rx="1" fill="#92400e"/>
      <!-- Eyes -->
      <circle cx="25" cy="28" r="1.5" fill="#2c1810"/>
      <circle cx="35" cy="28" r="1.5" fill="#2c1810"/>
      <!-- Slight smirk -->
      <path d="M27,33 Q30,35 33,33" stroke="#8b4513" stroke-width="0.8" fill="none"/>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Sneakers -->
      <rect x="18" y="80" width="8" height="4" rx="1" fill="#fff" stroke="#ccc" stroke-width="0.5"/>
      <rect x="30" y="80" width="8" height="4" rx="1" fill="#fff" stroke="#ccc" stroke-width="0.5"/>
      <!-- Sweatpants -->
      <rect x="19" y="66" width="8" height="15" rx="2" fill="#9ca3af"/>
      <rect x="29" y="66" width="8" height="15" rx="2" fill="#9ca3af"/>
      <rect x="18" y="60" width="20" height="8" rx="2" fill="#9ca3af"/>
      <!-- T-shirt -->
      <rect x="14" y="40" width="28" height="22" rx="3" fill="#3b82f6"/>
      <polygon points="28,46 30,50 34,50 31,53 32,57 28,54 24,57 25,53 22,50 26,50" fill="#fbbf24"/>
      <text x="28" y="53" font-size="3" fill="#dc2626" text-anchor="middle" font-weight="bold">POW</text>
      <!-- Sleeves -->
      <rect x="10" y="40" width="7" height="6" rx="1" fill="#3b82f6"/>
      <rect x="39" y="40" width="7" height="6" rx="1" fill="#3b82f6"/>
      <!-- Left arm -->
      <path d="M14,44 Q8,52 10,60" stroke="#f0c8a0" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Right arm THROWING comics -->
      <path d="M42,42 Q50,38 54,34" stroke="#f0c8a0" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Comics flying -->
      <rect x="50" y="26" width="8" height="10" rx="1" fill="#dc2626" transform="rotate(-20,54,31)"/>
      <rect x="52" y="22" width="7" height="9" rx="1" fill="#16a34a" transform="rotate(-35,55,26)" opacity="0.8"/>
      <!-- Neck -->
      <rect x="24" y="36" width="8" height="5" fill="#f0c8a0"/>
      <!-- Head -->
      <rect x="18" y="18" width="20" height="18" rx="5" fill="#f5d0a9"/>
      <ellipse cx="28" cy="36" rx="6" ry="2" fill="#f0c8a0"/>
      <!-- Cap -->
      <rect x="16" y="16" width="24" height="6" rx="2" fill="#dc2626"/>
      <rect x="14" y="21" width="22" height="3" rx="1" fill="#b91c1c"/>
      <rect x="12" y="22" width="12" height="2" rx="1" fill="#991b1b"/>
      <rect x="36" y="22" width="4" height="4" rx="1" fill="#92400e"/>
      <!-- Battle cry eyes -->
      <circle cx="23" cy="28" r="2" fill="#2c1810"/>
      <circle cx="33" cy="28" r="2" fill="#2c1810"/>
      <!-- Open mouth yelling -->
      <ellipse cx="28" cy="34" rx="3" ry="2" fill="#7f1d1d"/>
      <!-- Attack overlay -->
      <g class="attack-overlay">
        <line x1="54" y1="30" x2="58" y2="24" stroke="#fbbf24" stroke-width="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
        </line>
        <line x1="56" y1="34" x2="60" y2="30" stroke="#fb923c" stroke-width="1" opacity="0.6">
          <animate attributeName="opacity" values="0;1;0" dur="0.35s" repeatCount="indefinite"/>
        </line>
        <circle cx="56" cy="28" r="2" fill="#fef08a" opacity="0.7">
          <animate attributeName="r" values="1;3;1" dur="0.5s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Sneakers -->
      <rect x="24" y="80" width="8" height="4" rx="1" fill="#fff" stroke="#ccc" stroke-width="0.5"/>
      <rect x="34" y="79" width="8" height="4" rx="1" fill="#fff" stroke="#ccc" stroke-width="0.5" transform="rotate(5,38,81)"/>
      <!-- Sweatpants -->
      <rect x="25" y="66" width="8" height="15" rx="2" fill="#9ca3af"/>
      <rect x="35" y="66" width="8" height="15" rx="2" fill="#9ca3af" transform="rotate(3,39,73)"/>
      <rect x="24" y="60" width="20" height="8" rx="2" fill="#9ca3af"/>
      <!-- T-shirt -->
      <rect x="20" y="40" width="28" height="22" rx="3" fill="#3b82f6"/>
      <!-- Sleeves -->
      <rect x="16" y="40" width="7" height="6" rx="1" fill="#3b82f6"/>
      <rect x="45" y="40" width="7" height="6" rx="1" fill="#3b82f6"/>
      <!-- Arms up defensive -->
      <path d="M20,44 Q14,36 16,30" stroke="#f0c8a0" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M48,44 Q54,36 52,30" stroke="#f0c8a0" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Scattered comics on ground -->
      <rect x="6" y="78" width="7" height="9" rx="1" fill="#dc2626" transform="rotate(-25,9,82)" opacity="0.7"/>
      <rect x="48" y="80" width="6" height="8" rx="1" fill="#16a34a" transform="rotate(15,51,84)" opacity="0.7"/>
      <!-- Neck -->
      <rect x="30" y="36" width="8" height="5" fill="#f0c8a0"/>
      <!-- Head tilted -->
      <rect x="24" y="18" width="20" height="18" rx="5" fill="#f5d0a9" transform="rotate(-5,34,27)"/>
      <ellipse cx="34" cy="36" rx="6" ry="2" fill="#f0c8a0"/>
      <!-- Cap askew -->
      <rect x="22" y="16" width="24" height="6" rx="2" fill="#dc2626" transform="rotate(-10,34,19)"/>
      <rect x="20" y="21" width="22" height="3" rx="1" fill="#b91c1c" transform="rotate(-8,31,22)"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <line x1="27" y1="26" x2="31" y2="30" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="31" y1="26" x2="27" y2="30" stroke="#dc2626" stroke-width="1.2"/>
        <circle cx="37" cy="28" r="1.5" fill="#2c1810"/>
        <path d="M31,34 Q34,32 37,34" stroke="#8b4513" stroke-width="0.8" fill="none"/>
        <ellipse cx="46" cy="23" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="23;27;23" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="20" cy="21" rx="1" ry="2" fill="#7dd3fc" opacity="0.6">
          <animate attributeName="cy" values="21;25;21" dur="0.7s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  },

  // ============================================================
  // 5. PRIYA KOOTHRAPPALI — Indian lawyer, dark hair in bun,
  //    dark blue business suit, legal briefcase, professional
  // ============================================================
  mv_priya: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Black heels -->
      <rect x="22" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="31" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Heel detail -->
      <rect x="24" y="83" width="2" height="2" fill="#1a1a1a"/>
      <rect x="35" y="83" width="2" height="2" fill="#1a1a1a"/>
      <!-- Suit pants/skirt (dark blue pencil skirt) -->
      <rect x="23" y="66" width="5" height="15" rx="1" fill="#1e3a5f"/>
      <rect x="32" y="66" width="5" height="15" rx="1" fill="#1e3a5f"/>
      <rect x="22" y="58" width="16" height="10" rx="1" fill="#1e3a5f"/>
      <!-- Dark blue suit jacket -->
      <rect x="19" y="42" width="22" height="18" rx="2" fill="#1e3a5f"/>
      <!-- White blouse collar -->
      <polygon points="27,42 30,46 33,42" fill="#f1f5f9"/>
      <!-- Suit lapels -->
      <polygon points="27,42 22,42 26,54" fill="#172554"/>
      <polygon points="33,42 38,42 34,54" fill="#172554"/>
      <!-- Button -->
      <circle cx="30" cy="52" r="1" fill="#94a3b8"/>
      <!-- Arms -->
      <path d="M19,46 Q13,54 15,60" stroke="#1e3a5f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M41,46 Q47,54 45,60" stroke="#1e3a5f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Hands (darker skin tone) -->
      <circle cx="15" cy="60" r="2.5" fill="#c68642"/>
      <circle cx="45" cy="60" r="2.5" fill="#c68642"/>
      <!-- Legal briefcase in right hand -->
      <rect x="42" y="56" width="12" height="9" rx="1" fill="#3b2510" stroke="#1a1a1a" stroke-width="0.5"/>
      <rect x="46" y="55" width="4" height="2" rx="0.5" fill="#92400e"/>
      <circle cx="48" cy="60" r="0.8" fill="#d4a76a"/>
      <!-- Neck -->
      <rect x="27" y="38" width="6" height="5" fill="#c68642"/>
      <!-- Head -->
      <rect x="21" y="20" width="18" height="18" rx="3" fill="#c68642"/>
      <!-- Dark hair in bun -->
      <rect x="20" y="18" width="20" height="8" rx="3" fill="#1a1a1a"/>
      <rect x="20" y="22" width="3" height="5" rx="1" fill="#1a1a1a"/>
      <rect x="37" y="22" width="3" height="5" rx="1" fill="#1a1a1a"/>
      <!-- Hair bun on top -->
      <circle cx="30" cy="16" r="5" fill="#1a1a1a"/>
      <circle cx="30" cy="16" r="3" fill="#111"/>
      <!-- Eyes -->
      <ellipse cx="25.5" cy="29" rx="1.5" ry="1.3" fill="#2c1810"/>
      <ellipse cx="34.5" cy="29" rx="1.5" ry="1.3" fill="#2c1810"/>
      <!-- Elegant eyebrows -->
      <path d="M23,27 Q25.5,25.5 28,27" stroke="#1a1a1a" stroke-width="0.8" fill="none"/>
      <path d="M32,27 Q34.5,25.5 37,27" stroke="#1a1a1a" stroke-width="0.8" fill="none"/>
      <!-- Red lipstick smile -->
      <path d="M27,34 Q30,36 33,34" stroke="#dc2626" stroke-width="1" fill="none"/>
      <!-- Small earrings -->
      <circle cx="21" cy="30" r="1" fill="#fbbf24"/>
      <circle cx="39" cy="30" r="1" fill="#fbbf24"/>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Heels -->
      <rect x="20" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="29" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Skirt -->
      <rect x="21" y="66" width="5" height="15" rx="1" fill="#1e3a5f"/>
      <rect x="30" y="66" width="5" height="15" rx="1" fill="#1e3a5f"/>
      <rect x="20" y="58" width="16" height="10" rx="1" fill="#1e3a5f"/>
      <!-- Suit jacket -->
      <rect x="17" y="42" width="22" height="18" rx="2" fill="#1e3a5f"/>
      <polygon points="25,42 28,46 31,42" fill="#f1f5f9"/>
      <polygon points="25,42 20,42 24,54" fill="#172554"/>
      <polygon points="31,42 36,42 32,54" fill="#172554"/>
      <!-- Left arm -->
      <path d="M17,46 Q11,54 13,60" stroke="#1e3a5f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Right arm SWINGING briefcase -->
      <path d="M39,44 Q48,40 52,36" stroke="#1e3a5f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Briefcase swung -->
      <rect x="48" y="30" width="12" height="9" rx="1" fill="#3b2510" stroke="#1a1a1a" stroke-width="0.5" transform="rotate(-15,54,34)"/>
      <!-- Neck -->
      <rect x="25" y="38" width="6" height="5" fill="#c68642"/>
      <!-- Head -->
      <rect x="19" y="20" width="18" height="18" rx="3" fill="#c68642"/>
      <!-- Hair -->
      <rect x="18" y="18" width="20" height="8" rx="3" fill="#1a1a1a"/>
      <rect x="18" y="22" width="3" height="5" rx="1" fill="#1a1a1a"/>
      <rect x="35" y="22" width="3" height="5" rx="1" fill="#1a1a1a"/>
      <circle cx="28" cy="16" r="5" fill="#1a1a1a"/>
      <!-- Sharp eyes -->
      <ellipse cx="23.5" cy="29" rx="1.8" ry="1.5" fill="#2c1810"/>
      <ellipse cx="32.5" cy="29" rx="1.8" ry="1.5" fill="#2c1810"/>
      <!-- Fierce brows -->
      <line x1="21" y1="27" x2="26" y2="26" stroke="#1a1a1a" stroke-width="1"/>
      <line x1="35" y1="26" x2="30" y2="27" stroke="#1a1a1a" stroke-width="1"/>
      <!-- Determined mouth -->
      <line x1="25" y1="34" x2="31" y2="34" stroke="#dc2626" stroke-width="1"/>
      <!-- Earrings -->
      <circle cx="19" cy="30" r="1" fill="#fbbf24"/>
      <circle cx="37" cy="30" r="1" fill="#fbbf24"/>
      <!-- Attack overlay -->
      <g class="attack-overlay">
        <line x1="54" y1="30" x2="58" y2="22" stroke="#60a5fa" stroke-width="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
        </line>
        <line x1="56" y1="36" x2="60" y2="32" stroke="#60a5fa" stroke-width="1" opacity="0.6">
          <animate attributeName="opacity" values="0;1;0" dur="0.35s" repeatCount="indefinite"/>
        </line>
        <circle cx="56" cy="26" r="1.5" fill="#bfdbfe" opacity="0.7">
          <animate attributeName="r" values="1;2.5;1" dur="0.5s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Heels stumble -->
      <rect x="25" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="34" y="79" width="7" height="4" rx="1" fill="#1a1a1a" transform="rotate(5,37,81)"/>
      <!-- Skirt -->
      <rect x="26" y="66" width="5" height="15" rx="1" fill="#1e3a5f"/>
      <rect x="34" y="66" width="5" height="15" rx="1" fill="#1e3a5f" transform="rotate(3,36,73)"/>
      <rect x="24" y="58" width="16" height="10" rx="1" fill="#1e3a5f"/>
      <!-- Suit jacket wrinkled -->
      <rect x="22" y="42" width="22" height="18" rx="2" fill="#1e3a5f"/>
      <!-- Arms defensive -->
      <path d="M22,46 Q16,38 18,32" stroke="#1e3a5f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44,46 Q50,38 48,32" stroke="#1e3a5f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Dropped briefcase -->
      <rect x="8" y="76" width="10" height="8" rx="1" fill="#3b2510" transform="rotate(-20,13,80)" opacity="0.8"/>
      <!-- Neck -->
      <rect x="29" y="38" width="6" height="5" fill="#c68642"/>
      <!-- Head tilted -->
      <rect x="23" y="20" width="18" height="18" rx="3" fill="#c68642" transform="rotate(-5,32,29)"/>
      <!-- Messy hair -->
      <rect x="22" y="18" width="20" height="8" rx="3" fill="#1a1a1a" transform="rotate(-5,32,22)"/>
      <circle cx="32" cy="16" r="4" fill="#1a1a1a" transform="rotate(-5,32,16)"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <line x1="25" y1="27" x2="29" y2="31" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="29" y1="27" x2="25" y2="31" stroke="#dc2626" stroke-width="1.2"/>
        <circle cx="36" cy="29" r="1.5" fill="#2c1810"/>
        <path d="M29,36 Q32,34 35,36" stroke="#8b4513" stroke-width="0.8" fill="none"/>
        <ellipse cx="44" cy="25" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="25;29;25" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  },

  // ============================================================
  // 6. DAVE GIBBS — Big British guy, very large/muscular,
  //    bald, beard, green flannel, jeans, wide stance tank
  // ============================================================
  mv_dave: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow (wide) -->
      <ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
      <!-- Big boots -->
      <rect x="17" y="79" width="10" height="5" rx="2" fill="#4a3728"/>
      <rect x="33" y="79" width="10" height="5" rx="2" fill="#4a3728"/>
      <!-- Jeans (wide legs) -->
      <rect x="18" y="64" width="10" height="16" rx="2" fill="#2563eb"/>
      <rect x="32" y="64" width="10" height="16" rx="2" fill="#2563eb"/>
      <rect x="17" y="58" width="26" height="8" rx="2" fill="#2563eb"/>
      <!-- Belt -->
      <rect x="17" y="57" width="26" height="3" rx="1" fill="#3b2510"/>
      <rect x="28" y="57" width="4" height="3" rx="0.5" fill="#d4a76a"/>
      <!-- Green flannel shirt (wide torso) -->
      <rect x="14" y="38" width="32" height="20" rx="3" fill="#16a34a"/>
      <!-- Flannel plaid pattern -->
      <line x1="20" y1="38" x2="20" y2="58" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <line x1="26" y1="38" x2="26" y2="58" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <line x1="34" y1="38" x2="34" y2="58" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <line x1="40" y1="38" x2="40" y2="58" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <line x1="14" y1="44" x2="46" y2="44" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <line x1="14" y1="50" x2="46" y2="50" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <!-- Button line -->
      <circle cx="30" cy="42" r="0.8" fill="#d4a76a"/>
      <circle cx="30" cy="47" r="0.8" fill="#d4a76a"/>
      <circle cx="30" cy="52" r="0.8" fill="#d4a76a"/>
      <!-- Massive arms -->
      <path d="M14,42 Q6,50 8,60" stroke="#16a34a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M46,42 Q54,50 52,60" stroke="#16a34a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <!-- Rolled up sleeves showing forearms -->
      <path d="M8,56 L8,60" stroke="#f0c8a0" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M52,56 L52,60" stroke="#f0c8a0" stroke-width="7" fill="none" stroke-linecap="round"/>
      <!-- Big hands -->
      <circle cx="8" cy="62" r="3.5" fill="#f0c8a0"/>
      <circle cx="52" cy="62" r="3.5" fill="#f0c8a0"/>
      <!-- Thick neck -->
      <rect x="25" y="34" width="10" height="5" fill="#f0c8a0"/>
      <!-- Big bald head -->
      <rect x="19" y="16" width="22" height="18" rx="6" fill="#f5d0a9"/>
      <!-- Bald top (skin colored) -->
      <ellipse cx="30" cy="17" rx="10" ry="4" fill="#f5d0a9"/>
      <!-- Beard -->
      <rect x="22" y="28" width="16" height="7" rx="3" fill="#6b4423"/>
      <rect x="24" y="33" width="12" height="3" rx="2" fill="#6b4423"/>
      <!-- Eyes -->
      <circle cx="25" cy="25" r="1.5" fill="#2c1810"/>
      <circle cx="35" cy="25" r="1.5" fill="#2c1810"/>
      <!-- Friendly eyebrows -->
      <line x1="22" y1="22" x2="28" y2="23" stroke="#6b4423" stroke-width="1"/>
      <line x1="38" y1="23" x2="32" y2="22" stroke="#6b4423" stroke-width="1"/>
      <!-- Smile in beard -->
      <path d="M27,32 Q30,34 33,32" stroke="#f5d0a9" stroke-width="0.8" fill="none"/>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
      <!-- Boots -->
      <rect x="15" y="79" width="10" height="5" rx="2" fill="#4a3728"/>
      <rect x="31" y="79" width="10" height="5" rx="2" fill="#4a3728"/>
      <!-- Jeans -->
      <rect x="16" y="64" width="10" height="16" rx="2" fill="#2563eb"/>
      <rect x="30" y="64" width="10" height="16" rx="2" fill="#2563eb"/>
      <rect x="15" y="58" width="26" height="8" rx="2" fill="#2563eb"/>
      <!-- Belt -->
      <rect x="15" y="57" width="26" height="3" rx="1" fill="#3b2510"/>
      <rect x="26" y="57" width="4" height="3" rx="0.5" fill="#d4a76a"/>
      <!-- Flannel -->
      <rect x="12" y="38" width="32" height="20" rx="3" fill="#16a34a"/>
      <line x1="18" y1="38" x2="18" y2="58" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <line x1="24" y1="38" x2="24" y2="58" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <line x1="32" y1="38" x2="32" y2="58" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <line x1="38" y1="38" x2="38" y2="58" stroke="#15803d" stroke-width="0.5" opacity="0.5"/>
      <!-- Left arm -->
      <path d="M12,42 Q4,50 6,58" stroke="#16a34a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <!-- Right arm PUNCHING -->
      <path d="M44,40 Q52,36 56,34" stroke="#f0c8a0" stroke-width="7" fill="none" stroke-linecap="round"/>
      <!-- Big fist -->
      <circle cx="58" cy="33" r="4" fill="#f0c8a0"/>
      <!-- Neck -->
      <rect x="23" y="34" width="10" height="5" fill="#f0c8a0"/>
      <!-- Head -->
      <rect x="17" y="16" width="22" height="18" rx="6" fill="#f5d0a9"/>
      <ellipse cx="28" cy="17" rx="10" ry="4" fill="#f5d0a9"/>
      <!-- Beard -->
      <rect x="20" y="28" width="16" height="7" rx="3" fill="#6b4423"/>
      <rect x="22" y="33" width="12" height="3" rx="2" fill="#6b4423"/>
      <!-- Fierce eyes -->
      <circle cx="23" cy="25" r="2" fill="#2c1810"/>
      <circle cx="33" cy="25" r="2" fill="#2c1810"/>
      <!-- Angry brows -->
      <line x1="20" y1="23" x2="26" y2="22" stroke="#6b4423" stroke-width="1.2"/>
      <line x1="36" y1="22" x2="30" y2="23" stroke="#6b4423" stroke-width="1.2"/>
      <!-- Gritting teeth -->
      <rect x="25" y="32" width="6" height="2" rx="0.5" fill="#f5d0a9"/>
      <line x1="26" y1="33" x2="30" y2="33" stroke="#ccc" stroke-width="0.3"/>
      <!-- Attack overlay -->
      <g class="attack-overlay">
        <line x1="56" y1="30" x2="60" y2="24" stroke="#fbbf24" stroke-width="2" opacity="0.8">
          <animate attributeName="opacity" values="0;1;0" dur="0.3s" repeatCount="indefinite"/>
        </line>
        <line x1="58" y1="36" x2="60" y2="40" stroke="#fbbf24" stroke-width="1.5" opacity="0.6">
          <animate attributeName="opacity" values="0;1;0" dur="0.35s" repeatCount="indefinite"/>
        </line>
        <circle cx="58" cy="30" r="3" fill="#fef08a" opacity="0.5">
          <animate attributeName="r" values="2;4;2" dur="0.4s" repeatCount="indefinite"/>
        </circle>
        <!-- Impact lines -->
        <line x1="56" y1="28" x2="58" y2="26" stroke="#fff" stroke-width="1" opacity="0.9">
          <animate attributeName="opacity" values="0;1;0" dur="0.25s" repeatCount="indefinite"/>
        </line>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
      <!-- Boots stumble -->
      <rect x="21" y="79" width="10" height="5" rx="2" fill="#4a3728"/>
      <rect x="37" y="78" width="10" height="5" rx="2" fill="#4a3728" transform="rotate(5,42,80)"/>
      <!-- Jeans -->
      <rect x="22" y="64" width="10" height="16" rx="2" fill="#2563eb"/>
      <rect x="36" y="64" width="10" height="16" rx="2" fill="#2563eb" transform="rotate(3,41,72)"/>
      <rect x="21" y="58" width="26" height="8" rx="2" fill="#2563eb"/>
      <!-- Flannel -->
      <rect x="18" y="38" width="32" height="20" rx="3" fill="#16a34a"/>
      <!-- Arms defensive -->
      <path d="M18,42 Q10,34 12,28" stroke="#16a34a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M50,42 Q56,34 54,28" stroke="#16a34a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <!-- Neck -->
      <rect x="29" y="34" width="10" height="5" fill="#f0c8a0"/>
      <!-- Head tilted -->
      <rect x="23" y="16" width="22" height="18" rx="6" fill="#f5d0a9" transform="rotate(-5,34,25)"/>
      <ellipse cx="34" cy="17" rx="10" ry="4" fill="#f5d0a9" transform="rotate(-5,34,17)"/>
      <!-- Beard -->
      <rect x="26" y="28" width="16" height="7" rx="3" fill="#6b4423" transform="rotate(-5,34,31)"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <line x1="27" y1="23" x2="31" y2="27" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="31" y1="23" x2="27" y2="27" stroke="#dc2626" stroke-width="1.5"/>
        <circle cx="37" cy="25" r="1.5" fill="#2c1810"/>
        <path d="M31,33 Q34,31 37,33" stroke="#f5d0a9" stroke-width="0.8" fill="none"/>
        <ellipse cx="48" cy="22" rx="2" ry="3" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="22;26;22" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="20" cy="20" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.6">
          <animate attributeName="cy" values="20;24;20" dur="0.7s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  },

  // ============================================================
  // 7. DARK KRIPKE — Mirror universe evil Kripke, purple/dark lab coat,
  //    evil goatee, plasma gun with glowing barrel, dark aura
  // ============================================================
  mv_dark_kripke: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <defs>
        <radialGradient id="dk_aura"><stop offset="0%" stop-color="#581c87" stop-opacity="0.4"/><stop offset="100%" stop-color="#581c87" stop-opacity="0"/></radialGradient>
      </defs>
      <!-- Dark aura -->
      <ellipse cx="30" cy="50" rx="24" ry="34" fill="url(#dk_aura)">
        <animate attributeName="rx" values="22;26;22" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.4)"/>
      <!-- Dark boots -->
      <rect x="22" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="31" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Black pants -->
      <rect x="23" y="66" width="6" height="15" rx="1" fill="#111827"/>
      <rect x="31" y="66" width="6" height="15" rx="1" fill="#111827"/>
      <rect x="22" y="60" width="16" height="8" rx="1" fill="#111827"/>
      <!-- Black shirt -->
      <rect x="20" y="42" width="20" height="19" rx="2" fill="#1f2937"/>
      <!-- Purple/dark lab coat -->
      <rect x="16" y="42" width="6" height="26" rx="1" fill="#581c87"/>
      <rect x="38" y="42" width="6" height="26" rx="1" fill="#581c87"/>
      <rect x="16" y="42" width="28" height="5" rx="1" fill="#581c87"/>
      <!-- Evil insignia on coat -->
      <polygon points="30,48 28,52 32,52" fill="#dc2626" opacity="0.8"/>
      <!-- Arms in lab coat -->
      <path d="M16,46 Q10,54 12,62" stroke="#581c87" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44,46 Q50,54 48,62" stroke="#581c87" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Hands -->
      <circle cx="12" cy="62" r="2.5" fill="#e8b896"/>
      <circle cx="48" cy="62" r="2.5" fill="#e8b896"/>
      <!-- Plasma gun in right hand -->
      <rect x="45" y="56" width="13" height="5" rx="1" fill="#374151" stroke="#6b7280" stroke-width="0.5"/>
      <rect x="48" y="54" width="4" height="3" rx="0.5" fill="#4b5563"/>
      <!-- Glowing barrel -->
      <rect x="56" y="57" width="4" height="3" rx="1" fill="#a855f7">
        <animate attributeName="fill" values="#a855f7;#d946ef;#a855f7" dur="0.8s" repeatCount="indefinite"/>
      </rect>
      <circle cx="60" cy="58.5" r="2" fill="#d946ef" opacity="0.5">
        <animate attributeName="r" values="1.5;2.5;1.5" dur="0.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="0.6s" repeatCount="indefinite"/>
      </circle>
      <!-- Neck -->
      <rect x="27" y="38" width="6" height="5" fill="#e8b896"/>
      <!-- Head -->
      <rect x="21" y="20" width="18" height="18" rx="3" fill="#e8b896"/>
      <!-- Dark curly hair -->
      <rect x="20" y="18" width="20" height="8" rx="3" fill="#1f2937"/>
      <rect x="19" y="22" width="3" height="5" rx="1" fill="#1f2937"/>
      <rect x="38" y="22" width="3" height="5" rx="1" fill="#1f2937"/>
      <!-- Evil goatee -->
      <polygon points="28,34 30,38 32,34" fill="#1f2937"/>
      <rect x="27" y="33" width="6" height="2" rx="1" fill="#1f2937"/>
      <!-- Sinister eyes -->
      <circle cx="25.5" cy="28" r="1.5" fill="#dc2626"/>
      <circle cx="34.5" cy="28" r="1.5" fill="#dc2626"/>
      <circle cx="25.5" cy="28" r="0.6" fill="#1a1a1a"/>
      <circle cx="34.5" cy="28" r="0.6" fill="#1a1a1a"/>
      <!-- Evil eyebrows -->
      <line x1="22" y1="26" x2="28" y2="25" stroke="#1f2937" stroke-width="1"/>
      <line x1="38" y1="25" x2="32" y2="26" stroke="#1f2937" stroke-width="1"/>
      <!-- Smirk -->
      <path d="M28,33 Q26,31 28,31" stroke="#8b4513" stroke-width="0.8" fill="none"/>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <defs>
        <radialGradient id="dka_aura"><stop offset="0%" stop-color="#7e22ce" stop-opacity="0.5"/><stop offset="100%" stop-color="#7e22ce" stop-opacity="0"/></radialGradient>
      </defs>
      <!-- Intensified dark aura -->
      <ellipse cx="28" cy="50" rx="26" ry="36" fill="url(#dka_aura)">
        <animate attributeName="rx" values="24;28;24" dur="0.6s" repeatCount="indefinite"/>
      </ellipse>
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.4)"/>
      <!-- Boots -->
      <rect x="20" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="29" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Pants -->
      <rect x="21" y="66" width="6" height="15" rx="1" fill="#111827"/>
      <rect x="29" y="66" width="6" height="15" rx="1" fill="#111827"/>
      <rect x="20" y="60" width="16" height="8" rx="1" fill="#111827"/>
      <!-- Shirt -->
      <rect x="18" y="42" width="20" height="19" rx="2" fill="#1f2937"/>
      <!-- Lab coat -->
      <rect x="14" y="42" width="6" height="26" rx="1" fill="#581c87"/>
      <rect x="36" y="42" width="6" height="26" rx="1" fill="#581c87"/>
      <rect x="14" y="42" width="28" height="5" rx="1" fill="#581c87"/>
      <polygon points="28,48 26,52 30,52" fill="#dc2626" opacity="0.8"/>
      <!-- Left arm -->
      <path d="M14,46 Q8,54 10,62" stroke="#581c87" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Right arm AIMING plasma gun -->
      <path d="M42,44 Q50,40 54,38" stroke="#581c87" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Plasma gun aimed forward -->
      <rect x="50" y="34" width="10" height="5" rx="1" fill="#374151" stroke="#6b7280" stroke-width="0.5"/>
      <!-- FIRING plasma blast -->
      <circle cx="60" cy="36.5" r="3" fill="#d946ef" opacity="0.8">
        <animate attributeName="r" values="2;4;2" dur="0.3s" repeatCount="indefinite"/>
      </circle>
      <line x1="60" y1="36" x2="60" y2="28" stroke="#d946ef" stroke-width="2" opacity="0.7">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="0.3s" repeatCount="indefinite"/>
      </line>
      <line x1="60" y1="37" x2="60" y2="46" stroke="#a855f7" stroke-width="1.5" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.35s" repeatCount="indefinite"/>
      </line>
      <!-- Neck -->
      <rect x="25" y="38" width="6" height="5" fill="#e8b896"/>
      <!-- Head -->
      <rect x="19" y="20" width="18" height="18" rx="3" fill="#e8b896"/>
      <!-- Hair -->
      <rect x="18" y="18" width="20" height="8" rx="3" fill="#1f2937"/>
      <rect x="17" y="22" width="3" height="5" rx="1" fill="#1f2937"/>
      <rect x="36" y="22" width="3" height="5" rx="1" fill="#1f2937"/>
      <!-- Evil goatee -->
      <polygon points="26,34 28,38 30,34" fill="#1f2937"/>
      <rect x="25" y="33" width="6" height="2" rx="1" fill="#1f2937"/>
      <!-- Glowing evil eyes -->
      <circle cx="23.5" cy="28" r="1.8" fill="#dc2626">
        <animate attributeName="fill" values="#dc2626;#ef4444;#dc2626" dur="0.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="32.5" cy="28" r="1.8" fill="#dc2626">
        <animate attributeName="fill" values="#dc2626;#ef4444;#dc2626" dur="0.5s" repeatCount="indefinite"/>
      </circle>
      <!-- Evil grin -->
      <path d="M24,33 Q28,36 32,33" stroke="#fff" stroke-width="0.8" fill="none"/>
      <!-- Attack overlay -->
      <g class="attack-overlay">
        <line x1="58" y1="32" x2="60" y2="24" stroke="#d946ef" stroke-width="1.5" opacity="0.8">
          <animate attributeName="opacity" values="0;1;0" dur="0.3s" repeatCount="indefinite"/>
        </line>
        <line x1="60" y1="40" x2="60" y2="48" stroke="#a855f7" stroke-width="1" opacity="0.6">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
        </line>
        <circle cx="60" cy="36" r="2" fill="#e879f9" opacity="0.6">
          <animate attributeName="r" values="1;3;1" dur="0.35s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.4)"/>
      <!-- Boots stumble -->
      <rect x="25" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="34" y="79" width="7" height="4" rx="1" fill="#1a1a1a" transform="rotate(5,37,81)"/>
      <!-- Pants -->
      <rect x="26" y="66" width="6" height="15" rx="1" fill="#111827"/>
      <rect x="34" y="66" width="6" height="15" rx="1" fill="#111827" transform="rotate(3,37,73)"/>
      <rect x="24" y="60" width="16" height="8" rx="1" fill="#111827"/>
      <!-- Shirt -->
      <rect x="22" y="42" width="20" height="19" rx="2" fill="#1f2937"/>
      <!-- Torn lab coat -->
      <rect x="18" y="42" width="6" height="24" rx="1" fill="#581c87" opacity="0.8"/>
      <rect x="40" y="42" width="6" height="22" rx="1" fill="#581c87" opacity="0.8"/>
      <!-- Arms defensive -->
      <path d="M18,46 Q14,38 16,32" stroke="#581c87" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M46,46 Q50,38 48,32" stroke="#581c87" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Dropped plasma gun on ground -->
      <rect x="8" y="78" width="10" height="4" rx="1" fill="#374151" transform="rotate(-15,13,80)" opacity="0.7"/>
      <circle cx="6" cy="79" r="1.5" fill="#a855f7" opacity="0.4"/>
      <!-- Neck -->
      <rect x="29" y="38" width="6" height="5" fill="#e8b896"/>
      <!-- Head tilted -->
      <rect x="23" y="20" width="18" height="18" rx="3" fill="#e8b896" transform="rotate(-5,32,29)"/>
      <!-- Messy hair -->
      <rect x="22" y="18" width="20" height="8" rx="3" fill="#1f2937" transform="rotate(-5,32,22)"/>
      <!-- Goatee -->
      <polygon points="30,34 32,38 34,34" fill="#1f2937" transform="rotate(-5,32,36)"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <line x1="25" y1="26" x2="29" y2="30" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="29" y1="26" x2="25" y2="30" stroke="#dc2626" stroke-width="1.2"/>
        <circle cx="36" cy="28" r="1.5" fill="#dc2626" opacity="0.6"/>
        <path d="M29,35 Q32,33 35,35" stroke="#8b4513" stroke-width="0.8" fill="none"/>
        <ellipse cx="44" cy="24" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="24;28;24" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="19" cy="22" rx="1" ry="2" fill="#7dd3fc" opacity="0.6">
          <animate attributeName="cy" values="22;26;22" dur="0.7s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  },

  // ============================================================
  // 8. MRS. WOLOWITZ — Howard's mom, VERY large/wide body,
  //    pink floral muumuu, big curly hair, mouth open wide (voice joke)
  // ============================================================
  mv_mrs_wolowitz: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow (very wide) -->
      <ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.3)"/>
      <!-- Slippers -->
      <rect x="18" y="80" width="10" height="4" rx="2" fill="#f472b6"/>
      <rect x="32" y="80" width="10" height="4" rx="2" fill="#f472b6"/>
      <!-- VERY wide body in muumuu -->
      <ellipse cx="30" cy="60" rx="20" ry="22" fill="#f9a8d4"/>
      <!-- Floral pattern on muumuu -->
      <circle cx="20" cy="52" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="20" cy="52" r="0.8" fill="#fbbf24"/>
      <circle cx="38" cy="56" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="38" cy="56" r="0.8" fill="#fbbf24"/>
      <circle cx="25" cy="66" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="25" cy="66" r="0.8" fill="#fbbf24"/>
      <circle cx="36" cy="68" r="1.8" fill="#ec4899" opacity="0.6"/>
      <circle cx="36" cy="68" r="0.7" fill="#fbbf24"/>
      <circle cx="30" cy="50" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="30" cy="50" r="0.8" fill="#fbbf24"/>
      <circle cx="16" cy="62" r="1.5" fill="#ec4899" opacity="0.6"/>
      <circle cx="44" cy="62" r="1.5" fill="#ec4899" opacity="0.6"/>
      <!-- Muumuu neckline -->
      <path d="M24,40 Q30,44 36,40" stroke="#db2777" stroke-width="1" fill="none"/>
      <!-- Short arms sticking out -->
      <path d="M10,52 Q6,56 8,62" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M50,52 Q54,56 52,62" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Chubby hands -->
      <circle cx="8" cy="62" r="3" fill="#f0c8a0"/>
      <circle cx="52" cy="62" r="3" fill="#f0c8a0"/>
      <!-- Short thick neck -->
      <rect x="26" y="36" width="8" height="5" fill="#f0c8a0"/>
      <!-- Round face -->
      <ellipse cx="30" cy="26" rx="11" ry="12" fill="#f5d0a9"/>
      <!-- BIG curly hair -->
      <ellipse cx="30" cy="20" rx="14" ry="10" fill="#92400e"/>
      <circle cx="18" cy="22" r="5" fill="#92400e"/>
      <circle cx="42" cy="22" r="5" fill="#92400e"/>
      <circle cx="22" cy="16" r="4" fill="#a0522d"/>
      <circle cx="38" cy="16" r="4" fill="#a0522d"/>
      <circle cx="30" cy="13" r="4" fill="#a0522d"/>
      <circle cx="16" cy="28" r="3" fill="#92400e"/>
      <circle cx="44" cy="28" r="3" fill="#92400e"/>
      <!-- Wide open mouth (YELLING, voice joke) -->
      <ellipse cx="30" cy="32" rx="5" ry="4" fill="#7f1d1d"/>
      <path d="M25,31 Q30,28 35,31" stroke="#f5d0a9" stroke-width="1" fill="none"/>
      <!-- Tiny eyes squinting while yelling -->
      <line x1="24" y1="25" x2="28" y2="25" stroke="#2c1810" stroke-width="1.5"/>
      <line x1="32" y1="25" x2="36" y2="25" stroke="#2c1810" stroke-width="1.5"/>
      <!-- Voice lines coming out -->
      <line x1="36" y1="30" x2="42" y2="28" stroke="#fbbf24" stroke-width="0.5" opacity="0.6"/>
      <line x1="36" y1="32" x2="44" y2="32" stroke="#fbbf24" stroke-width="0.5" opacity="0.6"/>
      <line x1="36" y1="34" x2="42" y2="36" stroke="#fbbf24" stroke-width="0.5" opacity="0.6"/>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.3)"/>
      <!-- Slippers -->
      <rect x="16" y="80" width="10" height="4" rx="2" fill="#f472b6"/>
      <rect x="30" y="80" width="10" height="4" rx="2" fill="#f472b6"/>
      <!-- VERY wide muumuu body -->
      <ellipse cx="28" cy="60" rx="20" ry="22" fill="#f9a8d4"/>
      <!-- Flowers -->
      <circle cx="18" cy="52" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="18" cy="52" r="0.8" fill="#fbbf24"/>
      <circle cx="36" cy="56" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="36" cy="56" r="0.8" fill="#fbbf24"/>
      <circle cx="23" cy="66" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="23" cy="66" r="0.8" fill="#fbbf24"/>
      <circle cx="28" cy="50" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="28" cy="50" r="0.8" fill="#fbbf24"/>
      <!-- Neckline -->
      <path d="M22,40 Q28,44 34,40" stroke="#db2777" stroke-width="1" fill="none"/>
      <!-- Left arm -->
      <path d="M8,52 Q4,56 6,62" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Right arm POINTING/GESTURING angrily -->
      <path d="M48,50 Q54,44 58,40" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Pointing finger -->
      <line x1="58" y1="40" x2="60" y2="36" stroke="#f0c8a0" stroke-width="3" stroke-linecap="round"/>
      <!-- Neck -->
      <rect x="24" y="36" width="8" height="5" fill="#f0c8a0"/>
      <!-- Face -->
      <ellipse cx="28" cy="26" rx="11" ry="12" fill="#f5d0a9"/>
      <!-- Big curly hair -->
      <ellipse cx="28" cy="20" rx="14" ry="10" fill="#92400e"/>
      <circle cx="16" cy="22" r="5" fill="#92400e"/>
      <circle cx="40" cy="22" r="5" fill="#92400e"/>
      <circle cx="20" cy="16" r="4" fill="#a0522d"/>
      <circle cx="36" cy="16" r="4" fill="#a0522d"/>
      <circle cx="28" cy="13" r="4" fill="#a0522d"/>
      <circle cx="14" cy="28" r="3" fill="#92400e"/>
      <circle cx="42" cy="28" r="3" fill="#92400e"/>
      <!-- MASSIVE open mouth screaming -->
      <ellipse cx="28" cy="32" rx="6" ry="5" fill="#7f1d1d"/>
      <path d="M22,31 Q28,27 34,31" stroke="#f5d0a9" stroke-width="1" fill="none"/>
      <!-- Squinting eyes -->
      <line x1="22" y1="25" x2="26" y2="25" stroke="#2c1810" stroke-width="1.5"/>
      <line x1="30" y1="25" x2="34" y2="25" stroke="#2c1810" stroke-width="1.5"/>
      <!-- Attack overlay — SONIC SCREAM -->
      <g class="attack-overlay">
        <!-- Sound wave rings -->
        <ellipse cx="42" cy="32" rx="6" ry="4" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.7">
          <animate attributeName="rx" values="4;10;4" dur="0.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.5s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="46" cy="32" rx="4" ry="3" fill="none" stroke="#fb923c" stroke-width="0.8" opacity="0.5">
          <animate attributeName="rx" values="3;8;3" dur="0.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="0.4s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="50" cy="32" rx="3" ry="2" fill="none" stroke="#fbbf24" stroke-width="0.6" opacity="0.4">
          <animate attributeName="rx" values="2;6;2" dur="0.6s" repeatCount="indefinite"/>
        </ellipse>
        <!-- Sparkle effects -->
        <circle cx="56" cy="28" r="1" fill="#fef08a" opacity="0.8">
          <animate attributeName="opacity" values="0;1;0" dur="0.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="54" cy="36" r="0.8" fill="#fef08a" opacity="0.6">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.3)"/>
      <!-- Slippers -->
      <rect x="22" y="80" width="10" height="4" rx="2" fill="#f472b6"/>
      <rect x="34" y="79" width="10" height="4" rx="2" fill="#f472b6" transform="rotate(5,39,81)"/>
      <!-- Wide muumuu body -->
      <ellipse cx="32" cy="60" rx="20" ry="22" fill="#f9a8d4"/>
      <!-- Flowers -->
      <circle cx="22" cy="52" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="40" cy="56" r="2" fill="#ec4899" opacity="0.6"/>
      <circle cx="27" cy="66" r="2" fill="#ec4899" opacity="0.6"/>
      <!-- Neckline -->
      <path d="M26,40 Q32,44 38,40" stroke="#db2777" stroke-width="1" fill="none"/>
      <!-- Arms up defensive -->
      <path d="M12,52 Q8,44 10,38" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M52,52 Q56,44 54,38" stroke="#f0c8a0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Neck -->
      <rect x="28" y="36" width="8" height="5" fill="#f0c8a0"/>
      <!-- Face tilted -->
      <ellipse cx="32" cy="26" rx="11" ry="12" fill="#f5d0a9" transform="rotate(-5,32,26)"/>
      <!-- Messy curly hair -->
      <ellipse cx="32" cy="20" rx="14" ry="10" fill="#92400e" transform="rotate(-5,32,20)"/>
      <circle cx="20" cy="22" r="5" fill="#92400e"/>
      <circle cx="44" cy="22" r="5" fill="#92400e"/>
      <circle cx="24" cy="16" r="4" fill="#a0522d"/>
      <circle cx="40" cy="16" r="4" fill="#a0522d"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <line x1="26" y1="23" x2="30" y2="27" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="30" y1="23" x2="26" y2="27" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="34" y1="24" x2="38" y2="24" stroke="#2c1810" stroke-width="1.5"/>
        <!-- Open mouth wailing -->
        <ellipse cx="32" cy="32" rx="4" ry="3" fill="#7f1d1d"/>
        <!-- Tear drops -->
        <ellipse cx="46" cy="24" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="24;28;24" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="18" cy="22" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.6">
          <animate attributeName="cy" values="22;26;22" dur="0.7s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  },

  // ============================================================
  // 9. NURSE ALTHEA — Hospital nurse, green scrubs, stethoscope,
  //    dark skin, warm smile, medical kit with red cross
  // ============================================================
  mv_althea: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- White nurse shoes -->
      <rect x="22" y="80" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <rect x="31" y="80" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <!-- Green scrub pants -->
      <rect x="23" y="66" width="6" height="15" rx="1" fill="#059669"/>
      <rect x="31" y="66" width="6" height="15" rx="1" fill="#059669"/>
      <rect x="22" y="60" width="16" height="8" rx="1" fill="#059669"/>
      <!-- Green scrub top -->
      <rect x="19" y="42" width="22" height="19" rx="2" fill="#10b981"/>
      <!-- V-neck -->
      <polygon points="27,42 30,48 33,42" fill="#059669"/>
      <!-- Pocket on chest -->
      <rect x="33" y="46" width="5" height="4" rx="0.5" fill="#059669"/>
      <line x1="34" y1="47" x2="34" y2="49" stroke="#10b981" stroke-width="0.5"/>
      <!-- Arms -->
      <path d="M19,46 Q13,54 15,60" stroke="#8b5e3c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M41,46 Q47,54 45,60" stroke="#8b5e3c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Short sleeves -->
      <rect x="16" y="42" width="6" height="5" rx="1" fill="#10b981"/>
      <rect x="38" y="42" width="6" height="5" rx="1" fill="#10b981"/>
      <!-- Dark-skinned hands -->
      <circle cx="15" cy="60" r="2.5" fill="#8b5e3c"/>
      <circle cx="45" cy="60" r="2.5" fill="#8b5e3c"/>
      <!-- Medical kit in right hand -->
      <rect x="42" y="54" width="11" height="9" rx="1" fill="#fff" stroke="#dc2626" stroke-width="1"/>
      <!-- Red cross on kit -->
      <rect x="46" y="56" width="3" height="5" rx="0.3" fill="#dc2626"/>
      <rect x="45" y="57.5" width="5" height="2" rx="0.3" fill="#dc2626"/>
      <!-- Handle -->
      <rect x="46" y="53" width="3" height="2" rx="0.5" fill="#dc2626"/>
      <!-- Stethoscope around neck -->
      <path d="M27,42 Q24,46 24,50" stroke="#6b7280" stroke-width="1.5" fill="none"/>
      <path d="M33,42 Q36,46 36,50" stroke="#6b7280" stroke-width="1.5" fill="none"/>
      <circle cx="24" cy="51" r="2" fill="#9ca3af" stroke="#6b7280" stroke-width="0.5"/>
      <!-- Neck -->
      <rect x="27" y="38" width="6" height="5" fill="#8b5e3c"/>
      <!-- Head -->
      <rect x="21" y="20" width="18" height="18" rx="3" fill="#8b5e3c"/>
      <!-- Short dark hair -->
      <rect x="20" y="18" width="20" height="8" rx="3" fill="#1a1a1a"/>
      <rect x="20" y="22" width="3" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="37" y="22" width="3" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Warm eyes -->
      <circle cx="25.5" cy="28" r="1.5" fill="#1a1a1a"/>
      <circle cx="34.5" cy="28" r="1.5" fill="#1a1a1a"/>
      <circle cx="25.5" cy="27.5" r="0.4" fill="#fff"/>
      <circle cx="34.5" cy="27.5" r="0.4" fill="#fff"/>
      <!-- Warm smile -->
      <path d="M26,34 Q30,37 34,34" stroke="#5c3317" stroke-width="1" fill="none"/>
      <!-- Slight cheek highlights -->
      <circle cx="23" cy="32" r="2" fill="#a0694e" opacity="0.3"/>
      <circle cx="37" cy="32" r="2" fill="#a0694e" opacity="0.3"/>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes -->
      <rect x="20" y="80" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <rect x="29" y="80" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <!-- Scrub pants -->
      <rect x="21" y="66" width="6" height="15" rx="1" fill="#059669"/>
      <rect x="29" y="66" width="6" height="15" rx="1" fill="#059669"/>
      <rect x="20" y="60" width="16" height="8" rx="1" fill="#059669"/>
      <!-- Scrub top -->
      <rect x="17" y="42" width="22" height="19" rx="2" fill="#10b981"/>
      <polygon points="25,42 28,48 31,42" fill="#059669"/>
      <!-- Pocket -->
      <rect x="31" y="46" width="5" height="4" rx="0.5" fill="#059669"/>
      <!-- Sleeves -->
      <rect x="14" y="42" width="6" height="5" rx="1" fill="#10b981"/>
      <rect x="36" y="42" width="6" height="5" rx="1" fill="#10b981"/>
      <!-- Left arm -->
      <path d="M17,46 Q11,54 13,60" stroke="#8b5e3c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Right arm SWINGING medical kit -->
      <path d="M39,44 Q47,40 52,36" stroke="#8b5e3c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Medical kit swung forward -->
      <rect x="48" y="30" width="11" height="9" rx="1" fill="#fff" stroke="#dc2626" stroke-width="1" transform="rotate(-15,53,34)"/>
      <rect x="52" y="32" width="3" height="5" rx="0.3" fill="#dc2626" transform="rotate(-15,53,34)"/>
      <rect x="51" y="33.5" width="5" height="2" rx="0.3" fill="#dc2626" transform="rotate(-15,53,34)"/>
      <!-- Stethoscope -->
      <path d="M25,42 Q22,46 22,50" stroke="#6b7280" stroke-width="1.5" fill="none"/>
      <path d="M31,42 Q34,46 34,50" stroke="#6b7280" stroke-width="1.5" fill="none"/>
      <circle cx="22" cy="51" r="2" fill="#9ca3af" stroke="#6b7280" stroke-width="0.5"/>
      <!-- Neck -->
      <rect x="25" y="38" width="6" height="5" fill="#8b5e3c"/>
      <!-- Head -->
      <rect x="19" y="20" width="18" height="18" rx="3" fill="#8b5e3c"/>
      <!-- Hair -->
      <rect x="18" y="18" width="20" height="8" rx="3" fill="#1a1a1a"/>
      <rect x="18" y="22" width="3" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="35" y="22" width="3" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Determined eyes -->
      <circle cx="23.5" cy="28" r="1.8" fill="#1a1a1a"/>
      <circle cx="32.5" cy="28" r="1.8" fill="#1a1a1a"/>
      <!-- Focused mouth -->
      <line x1="24" y1="34" x2="30" y2="34" stroke="#5c3317" stroke-width="1"/>
      <!-- Attack overlay -->
      <g class="attack-overlay">
        <line x1="53" y1="30" x2="58" y2="24" stroke="#34d399" stroke-width="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
        </line>
        <line x1="56" y1="36" x2="60" y2="32" stroke="#34d399" stroke-width="1" opacity="0.6">
          <animate attributeName="opacity" values="0;1;0" dur="0.35s" repeatCount="indefinite"/>
        </line>
        <!-- Healing cross sparkle -->
        <text x="58" y="28" font-size="5" fill="#dc2626" opacity="0.8">+</text>
        <circle cx="56" cy="28" r="2" fill="#bbf7d0" opacity="0.5">
          <animate attributeName="r" values="1;3;1" dur="0.5s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Shoes stumble -->
      <rect x="25" y="80" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>
      <rect x="34" y="79" width="7" height="4" rx="1" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5" transform="rotate(5,37,81)"/>
      <!-- Scrub pants -->
      <rect x="26" y="66" width="6" height="15" rx="1" fill="#059669"/>
      <rect x="34" y="66" width="6" height="15" rx="1" fill="#059669" transform="rotate(3,37,73)"/>
      <rect x="24" y="60" width="16" height="8" rx="1" fill="#059669"/>
      <!-- Scrub top -->
      <rect x="22" y="42" width="22" height="19" rx="2" fill="#10b981"/>
      <!-- Stethoscope hanging loose -->
      <path d="M29,42 Q26,48 28,54" stroke="#6b7280" stroke-width="1.5" fill="none"/>
      <circle cx="28" cy="55" r="2" fill="#9ca3af"/>
      <!-- Arms up defensive -->
      <path d="M22,46 Q16,38 18,32" stroke="#8b5e3c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44,46 Q50,38 48,32" stroke="#8b5e3c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="19" y="42" width="6" height="5" rx="1" fill="#10b981"/>
      <rect x="41" y="42" width="6" height="5" rx="1" fill="#10b981"/>
      <!-- Dropped medical kit -->
      <rect x="8" y="76" width="9" height="7" rx="1" fill="#fff" stroke="#dc2626" stroke-width="0.8" transform="rotate(-20,12,79)" opacity="0.8"/>
      <!-- Neck -->
      <rect x="29" y="38" width="6" height="5" fill="#8b5e3c"/>
      <!-- Head tilted -->
      <rect x="23" y="20" width="18" height="18" rx="3" fill="#8b5e3c" transform="rotate(-5,32,29)"/>
      <!-- Messy hair -->
      <rect x="22" y="18" width="20" height="8" rx="3" fill="#1a1a1a" transform="rotate(-5,32,22)"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <line x1="25" y1="26" x2="29" y2="30" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="29" y1="26" x2="25" y2="30" stroke="#dc2626" stroke-width="1.2"/>
        <circle cx="36" cy="28" r="1.5" fill="#1a1a1a"/>
        <path d="M29,36 Q32,34 35,36" stroke="#5c3317" stroke-width="0.8" fill="none"/>
        <ellipse cx="44" cy="24" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="24;28;24" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="20" cy="22" rx="1" ry="2" fill="#7dd3fc" opacity="0.6">
          <animate attributeName="cy" values="22;26;22" dur="0.7s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  },

  // ============================================================
  // 10. JANINE DAVIS — HR director, gray business suit, glasses,
  //     dark hair in bob cut, holds shield/clipboard, professional
  // ============================================================
  mv_janine: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Black heels -->
      <rect x="22" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="31" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Gray suit skirt -->
      <rect x="23" y="66" width="5" height="15" rx="1" fill="#6b7280"/>
      <rect x="32" y="66" width="5" height="15" rx="1" fill="#6b7280"/>
      <rect x="22" y="58" width="16" height="10" rx="1" fill="#6b7280"/>
      <!-- Gray suit jacket -->
      <rect x="19" y="42" width="22" height="18" rx="2" fill="#6b7280"/>
      <!-- White blouse -->
      <rect x="27" y="43" width="6" height="16" rx="1" fill="#f1f5f9"/>
      <!-- Suit lapels -->
      <polygon points="27,43 22,43 26,54" fill="#4b5563"/>
      <polygon points="33,43 38,43 34,54" fill="#4b5563"/>
      <!-- Button -->
      <circle cx="30" cy="52" r="0.8" fill="#9ca3af"/>
      <!-- Arms -->
      <path d="M19,46 Q13,54 15,60" stroke="#6b7280" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M41,46 Q47,54 45,60" stroke="#6b7280" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Hands (dark skin) -->
      <circle cx="15" cy="60" r="2.5" fill="#8b5e3c"/>
      <circle cx="45" cy="60" r="2.5" fill="#8b5e3c"/>
      <!-- HR clipboard/shield in left hand -->
      <rect x="7" y="52" width="10" height="14" rx="1" fill="#1e40af" stroke="#1e3a5f" stroke-width="0.5"/>
      <text x="12" y="58" font-size="3" fill="#fff" text-anchor="middle">HR</text>
      <rect x="8" y="60" width="8" height="1" rx="0.3" fill="#93c5fd"/>
      <rect x="8" y="62" width="6" height="1" rx="0.3" fill="#93c5fd"/>
      <!-- Shield-like emblem -->
      <polygon points="12,54 9,56 9,59 12,60 15,59 15,56" fill="none" stroke="#fbbf24" stroke-width="0.5"/>
      <!-- Neck -->
      <rect x="27" y="38" width="6" height="5" fill="#8b5e3c"/>
      <!-- Head -->
      <rect x="21" y="20" width="18" height="18" rx="3" fill="#8b5e3c"/>
      <!-- Dark bob-cut hair -->
      <rect x="19" y="18" width="22" height="10" rx="3" fill="#1a1a1a"/>
      <rect x="19" y="22" width="4" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="37" y="22" width="4" height="10" rx="2" fill="#1a1a1a"/>
      <!-- Straight bangs -->
      <rect x="21" y="20" width="18" height="4" rx="1" fill="#111"/>
      <!-- Glasses -->
      <rect x="22" y="28" width="7" height="5" rx="2" fill="none" stroke="#4b5563" stroke-width="1"/>
      <rect x="31" y="28" width="7" height="5" rx="2" fill="none" stroke="#4b5563" stroke-width="1"/>
      <line x1="29" y1="30" x2="31" y2="30" stroke="#4b5563" stroke-width="1"/>
      <!-- Professional eyes -->
      <circle cx="25.5" cy="30.5" r="1.3" fill="#1a1a1a"/>
      <circle cx="34.5" cy="30.5" r="1.3" fill="#1a1a1a"/>
      <circle cx="25.5" cy="30" r="0.4" fill="#fff"/>
      <circle cx="34.5" cy="30" r="0.4" fill="#fff"/>
      <!-- Composed, neutral expression -->
      <line x1="27" y1="35" x2="33" y2="35" stroke="#5c3317" stroke-width="0.8"/>
      <!-- Small earrings -->
      <circle cx="20" cy="30" r="0.8" fill="#d4a76a"/>
      <circle cx="40" cy="30" r="0.8" fill="#d4a76a"/>
    </g></svg>`,

    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="28" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Heels -->
      <rect x="20" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="29" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Skirt -->
      <rect x="21" y="66" width="5" height="15" rx="1" fill="#6b7280"/>
      <rect x="30" y="66" width="5" height="15" rx="1" fill="#6b7280"/>
      <rect x="20" y="58" width="16" height="10" rx="1" fill="#6b7280"/>
      <!-- Suit jacket -->
      <rect x="17" y="42" width="22" height="18" rx="2" fill="#6b7280"/>
      <rect x="25" y="43" width="6" height="16" rx="1" fill="#f1f5f9"/>
      <polygon points="25,43 20,43 24,54" fill="#4b5563"/>
      <polygon points="31,43 36,43 32,54" fill="#4b5563"/>
      <!-- Left arm holding shield forward -->
      <path d="M17,44 Q10,40 8,36" stroke="#6b7280" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- HR Shield held up -->
      <rect x="2" y="28" width="12" height="16" rx="2" fill="#1e40af" stroke="#fbbf24" stroke-width="1"/>
      <text x="8" y="36" font-size="4" fill="#fff" text-anchor="middle" font-weight="bold">HR</text>
      <polygon points="8,30 4,33 4,38 8,40 12,38 12,33" fill="none" stroke="#fbbf24" stroke-width="0.8"/>
      <!-- Right arm pointing -->
      <path d="M39,44 Q46,40 50,38" stroke="#6b7280" stroke-width="5" fill="none" stroke-linecap="round"/>
      <line x1="50" y1="38" x2="54" y2="35" stroke="#8b5e3c" stroke-width="3" stroke-linecap="round"/>
      <!-- Neck -->
      <rect x="25" y="38" width="6" height="5" fill="#8b5e3c"/>
      <!-- Head -->
      <rect x="19" y="20" width="18" height="18" rx="3" fill="#8b5e3c"/>
      <!-- Bob cut -->
      <rect x="17" y="18" width="22" height="10" rx="3" fill="#1a1a1a"/>
      <rect x="17" y="22" width="4" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="35" y="22" width="4" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="19" y="20" width="18" height="4" rx="1" fill="#111"/>
      <!-- Glasses -->
      <rect x="20" y="28" width="7" height="5" rx="2" fill="none" stroke="#4b5563" stroke-width="1"/>
      <rect x="29" y="28" width="7" height="5" rx="2" fill="none" stroke="#4b5563" stroke-width="1"/>
      <line x1="27" y1="30" x2="29" y2="30" stroke="#4b5563" stroke-width="1"/>
      <!-- Stern eyes -->
      <circle cx="23.5" cy="30.5" r="1.5" fill="#1a1a1a"/>
      <circle cx="32.5" cy="30.5" r="1.5" fill="#1a1a1a"/>
      <!-- Stern brows -->
      <line x1="19" y1="28" x2="24" y2="27" stroke="#1a1a1a" stroke-width="1"/>
      <line x1="35" y1="27" x2="30" y2="28" stroke="#1a1a1a" stroke-width="1"/>
      <!-- Firm mouth -->
      <line x1="23" y1="35" x2="29" y2="35" stroke="#5c3317" stroke-width="1"/>
      <!-- Attack overlay -->
      <g class="attack-overlay">
        <!-- Shield energy -->
        <ellipse cx="8" cy="36" rx="8" ry="10" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.6">
          <animate attributeName="rx" values="7;10;7" dur="0.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="0.5s" repeatCount="indefinite"/>
        </ellipse>
        <line x1="54" y1="34" x2="58" y2="30" stroke="#fbbf24" stroke-width="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
        </line>
        <circle cx="56" cy="32" r="1.5" fill="#fef08a" opacity="0.7">
          <animate attributeName="r" values="1;2.5;1" dur="0.5s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g></svg>`,

    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- Shadow -->
      <ellipse cx="32" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Heels stumble -->
      <rect x="25" y="80" width="7" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="34" y="79" width="7" height="4" rx="1" fill="#1a1a1a" transform="rotate(5,37,81)"/>
      <!-- Skirt -->
      <rect x="26" y="66" width="5" height="15" rx="1" fill="#6b7280"/>
      <rect x="34" y="66" width="5" height="15" rx="1" fill="#6b7280" transform="rotate(3,36,73)"/>
      <rect x="24" y="58" width="16" height="10" rx="1" fill="#6b7280"/>
      <!-- Suit wrinkled -->
      <rect x="22" y="42" width="22" height="18" rx="2" fill="#6b7280"/>
      <!-- Arms defensive -->
      <path d="M22,46 Q16,38 18,32" stroke="#6b7280" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44,46 Q50,38 48,32" stroke="#6b7280" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Dropped clipboard -->
      <rect x="8" y="76" width="10" height="12" rx="1" fill="#1e40af" transform="rotate(-20,13,82)" opacity="0.7"/>
      <!-- Neck -->
      <rect x="29" y="38" width="6" height="5" fill="#8b5e3c"/>
      <!-- Head tilted -->
      <rect x="23" y="20" width="18" height="18" rx="3" fill="#8b5e3c" transform="rotate(-5,32,29)"/>
      <!-- Messy bob -->
      <rect x="21" y="18" width="22" height="10" rx="3" fill="#1a1a1a" transform="rotate(-5,32,23)"/>
      <rect x="21" y="22" width="4" height="10" rx="2" fill="#1a1a1a"/>
      <rect x="39" y="22" width="4" height="10" rx="2" fill="#1a1a1a"/>
      <!-- Crooked glasses -->
      <rect x="24" y="28" width="7" height="5" rx="2" fill="none" stroke="#4b5563" stroke-width="1" transform="rotate(-8,27,31)"/>
      <rect x="33" y="30" width="7" height="5" rx="2" fill="none" stroke="#4b5563" stroke-width="1" transform="rotate(5,36,32)"/>
      <line x1="31" y1="30" x2="33" y2="31" stroke="#4b5563" stroke-width="1"/>
      <!-- Injured overlay -->
      <g class="injured-overlay">
        <line x1="25" y1="29" x2="29" y2="33" stroke="#dc2626" stroke-width="1.2"/>
        <line x1="29" y1="29" x2="25" y2="33" stroke="#dc2626" stroke-width="1.2"/>
        <circle cx="36" cy="31" r="1.5" fill="#1a1a1a"/>
        <path d="M29,37 Q32,35 35,37" stroke="#5c3317" stroke-width="0.8" fill="none"/>
        <ellipse cx="44" cy="25" rx="1.5" ry="2.5" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="cy" values="25;29;25" dur="0.8s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="19" cy="23" rx="1" ry="2" fill="#7dd3fc" opacity="0.6">
          <animate attributeName="cy" values="23;27;23" dur="0.7s" repeatCount="indefinite"/>
        </ellipse>
      </g>
    </g></svg>`
  }

};

if (typeof vectors !== 'undefined') Object.assign(vectors, mvCharVectors);
