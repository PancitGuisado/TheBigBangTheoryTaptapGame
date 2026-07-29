// ============================================================
// GENESIS PROTOCOL CHARACTERS — Legendary tier SVG sprites
// 4 characters × 3 phases (idle, attack, injured)
// ============================================================

const genCharVectors = {

  // ============================================================
  // 1. THE GRAND ARCHITECT — Illuminati leader, hooded robe, golden eyes
  // ============================================================
  gen_architect: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      <!-- Mystical aura -->
      <ellipse cx="30" cy="50" rx="22" ry="35" fill="rgba(234,179,8,0.06)"/>
      <!-- Robe body -->
      <path d="M 15,30 L 12,80 L 48,80 L 45,30 Z" fill="#1c1917"/>
      <path d="M 15,30 L 12,80 L 30,82 L 30,30 Z" fill="#0c0a09"/>
      <!-- Gold trim -->
      <line x1="12" y1="80" x2="48" y2="80" stroke="#eab308" stroke-width="1.5"/>
      <!-- Illuminati triangle symbol on chest -->
      <polygon points="30,40 24,52 36,52" fill="none" stroke="#eab308" stroke-width="1.5"/>
      <!-- All-seeing eye in triangle -->
      <ellipse cx="30" cy="47" rx="3" ry="2" fill="#eab308"/>
      <circle cx="30" cy="47" r="1" fill="#1c1917"/>
      <!-- Hood -->
      <path d="M 18,16 Q 30,4 42,16 L 44,32 Q 30,28 16,32 Z" fill="#1c1917"/>
      <path d="M 20,16 Q 30,6 40,16 L 42,30 Q 30,26 18,30 Z" fill="#292524"/>
      <!-- Glowing golden eyes under hood -->
      <circle cx="25" cy="23" r="2" fill="#eab308" opacity="0.9"/>
      <circle cx="35" cy="23" r="2" fill="#eab308" opacity="0.9"/>
      <circle cx="25" cy="23" r="0.8" fill="#fef08a"/>
      <circle cx="35" cy="23" r="0.8" fill="#fef08a"/>
      <!-- Arms holding tome -->
      <path d="M 16,34 Q 8,50 18,58" stroke="#1c1917" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 44,34 Q 52,50 42,58" stroke="#1c1917" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Glowing tome -->
      <rect x="20" y="56" width="20" height="14" rx="2" fill="#78350f" stroke="#eab308" stroke-width="1"/>
      <rect x="22" y="58" width="16" height="10" rx="1" fill="#451a03"/>
      <line x1="24" y1="60" x2="36" y2="60" stroke="#eab308" stroke-width="0.5" opacity="0.7"/>
      <line x1="24" y1="63" x2="36" y2="63" stroke="#eab308" stroke-width="0.5" opacity="0.5"/>
      <line x1="24" y1="66" x2="32" y2="66" stroke="#eab308" stroke-width="0.5" opacity="0.3"/>
      <!-- Tome glow -->
      <ellipse cx="30" cy="63" rx="12" ry="8" fill="rgba(234,179,8,0.1)"/>
    </g></svg>`,
    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      <ellipse cx="30" cy="50" rx="22" ry="35" fill="rgba(234,179,8,0.06)"/>
      <path d="M 15,30 L 12,80 L 48,80 L 45,30 Z" fill="#1c1917"/>
      <path d="M 15,30 L 12,80 L 30,82 L 30,30 Z" fill="#0c0a09"/>
      <line x1="12" y1="80" x2="48" y2="80" stroke="#eab308" stroke-width="1.5"/>
      <polygon points="30,40 24,52 36,52" fill="none" stroke="#eab308" stroke-width="1.5"/>
      <ellipse cx="30" cy="47" rx="3" ry="2" fill="#eab308"/>
      <circle cx="30" cy="47" r="1" fill="#1c1917"/>
      <path d="M 18,16 Q 30,4 42,16 L 44,32 Q 30,28 16,32 Z" fill="#1c1917"/>
      <path d="M 20,16 Q 30,6 40,16 L 42,30 Q 30,26 18,30 Z" fill="#292524"/>
      <circle cx="25" cy="23" r="2" fill="#eab308" opacity="0.9"/>
      <circle cx="35" cy="23" r="2" fill="#eab308" opacity="0.9"/>
      <circle cx="25" cy="23" r="0.8" fill="#fef08a"/>
      <circle cx="35" cy="23" r="0.8" fill="#fef08a"/>
      <path d="M 16,34 Q 8,50 18,58" stroke="#1c1917" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 44,34 Q 52,50 42,58" stroke="#1c1917" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="20" y="56" width="20" height="14" rx="2" fill="#78350f" stroke="#eab308" stroke-width="1"/>
      <rect x="22" y="58" width="16" height="10" rx="1" fill="#451a03"/>
      <ellipse cx="30" cy="63" rx="12" ry="8" fill="rgba(234,179,8,0.1)"/>
      <g class="attack-overlay"><line x1="2" y1="40" x2="-6" y2="36" stroke="#eab308" stroke-width="1.5" opacity="0.8"/><line x1="2" y1="44" x2="-8" y2="44" stroke="#eab308" stroke-width="1.5" opacity="0.7"/><line x1="58" y1="40" x2="66" y2="36" stroke="#eab308" stroke-width="1.5" opacity="0.8"/><line x1="58" y1="44" x2="68" y2="44" stroke="#eab308" stroke-width="1.5" opacity="0.7"/><polygon points="8,10 10,14 14,12 11,16 15,18 11,19 12,23 8,20 4,23 5,19 1,18 5,16 3,12 6,14" fill="#eab308" opacity="0.75"/><polygon points="52,8 54,12 58,10 55,14 59,16 55,17 56,21 52,18 48,21 49,17 45,16 49,14 47,10 50,12" fill="#fef08a" opacity="0.6"/></g></g></svg>`,
    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      <ellipse cx="30" cy="50" rx="22" ry="35" fill="rgba(234,179,8,0.03)"/>
      <path d="M 15,30 L 12,80 L 48,80 L 45,30 Z" fill="#1c1917"/>
      <path d="M 15,30 L 12,80 L 30,82 L 30,30 Z" fill="#0c0a09"/>
      <line x1="12" y1="80" x2="48" y2="80" stroke="#eab308" stroke-width="1.5"/>
      <polygon points="30,40 24,52 36,52" fill="none" stroke="#eab308" stroke-width="1.5" opacity="0.5"/>
      <path d="M 18,16 Q 30,4 42,16 L 44,32 Q 30,28 16,32 Z" fill="#1c1917"/>
      <path d="M 20,16 Q 30,6 40,16 L 42,30 Q 30,26 18,30 Z" fill="#292524"/>
      <circle cx="25" cy="23" r="2" fill="#eab308" opacity="0.5"/>
      <circle cx="35" cy="23" r="2" fill="#eab308" opacity="0.5"/>
      <path d="M 16,34 Q 8,50 18,58" stroke="#1c1917" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 44,34 Q 52,50 42,58" stroke="#1c1917" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g class="injured-overlay" opacity="0.85"><line x1="21" y1="20" x2="27" y2="26" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/><line x1="27" y1="20" x2="21" y2="26" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/><circle cx="42" cy="18" r="1.5" fill="#60a5fa" opacity="0.7"/><path d="M42 16 Q43.5 20 42 20.5 Q40.5 20 42 16" fill="#60a5fa" opacity="0.6"/></g></g></svg>`
  },

  // ============================================================
  // 2. THE FALLEN ONE — Dark angel, tattered wings, flaming sword
  // ============================================================
  gen_fallen: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      <!-- Tattered dark wings -->
      <path d="M 20,25 Q 0,10 -5,30 Q 0,28 5,35 Q 2,25 10,20 Z" fill="#2e1065" opacity="0.8"/>
      <path d="M 20,25 Q 5,15 0,35 Q 5,32 8,38 Q 6,28 14,22 Z" fill="#1e1b4b" opacity="0.6"/>
      <path d="M 40,25 Q 60,10 65,30 Q 60,28 55,35 Q 58,25 50,20 Z" fill="#2e1065" opacity="0.8"/>
      <path d="M 40,25 Q 55,15 60,35 Q 55,32 52,38 Q 54,28 46,22 Z" fill="#1e1b4b" opacity="0.6"/>
      <!-- Wing tears -->
      <line x1="5" y1="22" x2="8" y2="28" stroke="#0f0a2e" stroke-width="1" opacity="0.5"/>
      <line x1="52" y1="20" x2="55" y2="27" stroke="#0f0a2e" stroke-width="1" opacity="0.5"/>
      <!-- Dark armor body -->
      <path d="M 20,28 L 18,65 L 42,65 L 40,28 Z" fill="#1e1b4b"/>
      <path d="M 20,28 L 18,65 L 30,66 L 30,28 Z" fill="#0f0a2e"/>
      <!-- Divine light cracks in armor -->
      <line x1="25" y1="35" x2="28" y2="50" stroke="#fef08a" stroke-width="0.8" opacity="0.6"/>
      <line x1="33" y1="38" x2="35" y2="48" stroke="#fef08a" stroke-width="0.8" opacity="0.5"/>
      <!-- Legs -->
      <rect x="22" y="65" width="6" height="16" fill="#1e1b4b"/>
      <rect x="32" y="65" width="6" height="16" fill="#1e1b4b"/>
      <!-- Head - pale white skin -->
      <rect x="22" y="8" width="16" height="18" fill="#e2e8f0" rx="4"/>
      <!-- Long white hair -->
      <path d="M 20,10 C 20,2 40,2 40,10" fill="#f1f5f9"/>
      <path d="M 18,10 Q 16,30 20,35" stroke="#e2e8f0" stroke-width="2" fill="none"/>
      <path d="M 42,10 Q 44,30 40,35" stroke="#e2e8f0" stroke-width="2" fill="none"/>
      <!-- Face -->
      <circle cx="26" cy="16" r="1.5" fill="#7c3aed"/>
      <circle cx="34" cy="16" r="1.5" fill="#7c3aed"/>
      <line x1="27" y1="22" x2="33" y2="22" stroke="#94a3b8" stroke-width="1"/>
      <!-- Arms -->
      <path d="M 18,32 Q 10,45 14,55" stroke="#1e1b4b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 42,32 Q 50,42 48,52" stroke="#1e1b4b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Flaming divine sword -->
      <rect x="46" y="30" width="2" height="24" fill="#a8a29e"/>
      <rect x="43" y="29" width="8" height="3" rx="1" fill="#78716c"/>
      <polygon points="47,30 44,18 50,18" fill="#c084fc"/>
      <polygon points="47,28 45,20 49,20" fill="#e9d5ff" opacity="0.6"/>
      <!-- Sword flame -->
      <path d="M 47,18 Q 45,12 47,8 Q 49,12 47,18" fill="#f59e0b" opacity="0.5"/>
    </g></svg>`,
    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      <path d="M 20,25 Q 0,10 -5,30 Q 0,28 5,35 Q 2,25 10,20 Z" fill="#2e1065" opacity="0.8"/>
      <path d="M 20,25 Q 5,15 0,35 Q 5,32 8,38 Q 6,28 14,22 Z" fill="#1e1b4b" opacity="0.6"/>
      <path d="M 40,25 Q 60,10 65,30 Q 60,28 55,35 Q 58,25 50,20 Z" fill="#2e1065" opacity="0.8"/>
      <path d="M 40,25 Q 55,15 60,35 Q 55,32 52,38 Q 54,28 46,22 Z" fill="#1e1b4b" opacity="0.6"/>
      <path d="M 20,28 L 18,65 L 42,65 L 40,28 Z" fill="#1e1b4b"/>
      <path d="M 20,28 L 18,65 L 30,66 L 30,28 Z" fill="#0f0a2e"/>
      <line x1="25" y1="35" x2="28" y2="50" stroke="#fef08a" stroke-width="0.8" opacity="0.6"/>
      <rect x="22" y="65" width="6" height="16" fill="#1e1b4b"/>
      <rect x="32" y="65" width="6" height="16" fill="#1e1b4b"/>
      <rect x="22" y="8" width="16" height="18" fill="#e2e8f0" rx="4"/>
      <path d="M 20,10 C 20,2 40,2 40,10" fill="#f1f5f9"/>
      <circle cx="26" cy="16" r="1.5" fill="#7c3aed"/>
      <circle cx="34" cy="16" r="1.5" fill="#7c3aed"/>
      <path d="M 18,32 Q 10,45 14,55" stroke="#1e1b4b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 42,32 Q 50,42 48,52" stroke="#1e1b4b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="46" y="30" width="2" height="24" fill="#a8a29e"/>
      <rect x="43" y="29" width="8" height="3" rx="1" fill="#78716c"/>
      <polygon points="47,30 44,18 50,18" fill="#c084fc"/>
      <g class="attack-overlay"><line x1="2" y1="38" x2="-6" y2="34" stroke="#c084fc" stroke-width="1.5" opacity="0.8"/><line x1="58" y1="38" x2="66" y2="34" stroke="#c084fc" stroke-width="1.5" opacity="0.8"/><line x1="2" y1="46" x2="-6" y2="50" stroke="#c084fc" stroke-width="1.5" opacity="0.7"/><line x1="58" y1="46" x2="66" y2="50" stroke="#c084fc" stroke-width="1.5" opacity="0.7"/><polygon points="52,6 54,10 58,8 55,12 59,14 55,15 56,19 52,16 48,19 49,15 45,14 49,12 47,8 50,10" fill="#c084fc" opacity="0.7"/><circle cx="30" cy="45" r="20" fill="rgba(192,132,252,0.08)"/></g></g></svg>`,
    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      <path d="M 20,25 Q 0,10 -5,30 Q 0,28 5,35 Q 2,25 10,20 Z" fill="#2e1065" opacity="0.5"/>
      <path d="M 40,25 Q 60,10 65,30 Q 60,28 55,35 Q 58,25 50,20 Z" fill="#2e1065" opacity="0.5"/>
      <path d="M 20,28 L 18,65 L 42,65 L 40,28 Z" fill="#1e1b4b"/>
      <rect x="22" y="65" width="6" height="16" fill="#1e1b4b"/>
      <rect x="32" y="65" width="6" height="16" fill="#1e1b4b"/>
      <rect x="22" y="8" width="16" height="18" fill="#e2e8f0" rx="4"/>
      <path d="M 20,10 C 20,2 40,2 40,10" fill="#f1f5f9"/>
      <circle cx="26" cy="16" r="1.5" fill="#7c3aed" opacity="0.5"/>
      <circle cx="34" cy="16" r="1.5" fill="#7c3aed" opacity="0.5"/>
      <path d="M 18,32 Q 10,45 14,55" stroke="#1e1b4b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 42,32 Q 50,42 48,52" stroke="#1e1b4b" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g class="injured-overlay" opacity="0.85"><line x1="22" y1="13" x2="28" y2="19" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/><line x1="28" y1="13" x2="22" y2="19" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/><circle cx="40" cy="14" r="1.5" fill="#60a5fa" opacity="0.7"/><path d="M40 12 Q41.5 16 40 16.5 Q38.5 16 40 12" fill="#60a5fa" opacity="0.6"/></g></g></svg>`
  },

  // ============================================================
  // 3. SHELDON PRIME — End of time, chrome suit, blue circuits, time crystal
  // ============================================================
  gen_sheldon_prime: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <!-- Temporal distortion aura -->
      <ellipse cx="30" cy="45" rx="20" ry="30" fill="rgba(59,130,246,0.05)"/>
      <!-- Chrome boots -->
      <rect x="22" y="78" width="7" height="5" rx="1" fill="#94a3b8"/>
      <rect x="31" y="78" width="7" height="5" rx="1" fill="#94a3b8"/>
      <!-- Chrome pants -->
      <rect x="23" y="62" width="6" height="17" fill="#64748b"/>
      <rect x="31" y="62" width="6" height="17" fill="#64748b"/>
      <!-- Chrome suit body -->
      <rect x="18" y="28" width="24" height="35" fill="#94a3b8" rx="2"/>
      <rect x="18" y="28" width="12" height="35" fill="#78716c" rx="2"/>
      <!-- Blue circuit lines -->
      <line x1="22" y1="32" x2="22" y2="55" stroke="#3b82f6" stroke-width="0.8" opacity="0.7"/>
      <line x1="30" y1="30" x2="30" y2="60" stroke="#3b82f6" stroke-width="0.8" opacity="0.5"/>
      <line x1="38" y1="35" x2="38" y2="52" stroke="#3b82f6" stroke-width="0.8" opacity="0.7"/>
      <line x1="22" y1="42" x2="38" y2="42" stroke="#3b82f6" stroke-width="0.5" opacity="0.4"/>
      <circle cx="30" cy="42" r="1.5" fill="#3b82f6" opacity="0.6"/>
      <!-- Arms -->
      <path d="M 18,32 Q 10,45 14,55" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 42,32 Q 50,45 46,55" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Head — aged wise Sheldon -->
      <rect x="22" y="8" width="16" height="18" fill="#fed7aa" rx="3"/>
      <!-- White beard -->
      <path d="M 22,22 Q 30,30 38,22" fill="#e2e8f0"/>
      <!-- White hair -->
      <rect x="21" y="6" width="18" height="5" fill="#e2e8f0" rx="2"/>
      <path d="M 20,8 C 20,2 40,2 40,8" fill="#f1f5f9"/>
      <!-- Glowing blue eyes -->
      <circle cx="26" cy="15" r="1.5" fill="#3b82f6"/>
      <circle cx="34" cy="15" r="1.5" fill="#3b82f6"/>
      <circle cx="26" cy="15" r="0.6" fill="#93c5fd"/>
      <circle cx="34" cy="15" r="0.6" fill="#93c5fd"/>
      <!-- Glasses -->
      <circle cx="26" cy="15" r="3" fill="none" stroke="#64748b" stroke-width="0.8"/>
      <circle cx="34" cy="15" r="3" fill="none" stroke="#64748b" stroke-width="0.8"/>
      <line x1="29" y1="15" x2="31" y2="15" stroke="#64748b" stroke-width="0.5"/>
      <!-- Time crystal in hand -->
      <polygon points="46,52 44,48 48,48" fill="#60a5fa" opacity="0.8"/>
      <polygon points="46,52 44,56 48,56" fill="#3b82f6" opacity="0.6"/>
      <circle cx="46" cy="52" r="5" fill="rgba(59,130,246,0.15)"/>
      <!-- Floating clock gears -->
      <circle cx="10" cy="20" r="4" fill="none" stroke="#94a3b8" stroke-width="0.8" opacity="0.4"/>
      <circle cx="10" cy="20" r="1" fill="#94a3b8" opacity="0.3"/>
      <circle cx="50" cy="65" r="3" fill="none" stroke="#94a3b8" stroke-width="0.8" opacity="0.3"/>
    </g></svg>`,
    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <ellipse cx="30" cy="45" rx="20" ry="30" fill="rgba(59,130,246,0.05)"/>
      <rect x="22" y="78" width="7" height="5" rx="1" fill="#94a3b8"/>
      <rect x="31" y="78" width="7" height="5" rx="1" fill="#94a3b8"/>
      <rect x="23" y="62" width="6" height="17" fill="#64748b"/>
      <rect x="31" y="62" width="6" height="17" fill="#64748b"/>
      <rect x="18" y="28" width="24" height="35" fill="#94a3b8" rx="2"/>
      <line x1="22" y1="32" x2="22" y2="55" stroke="#3b82f6" stroke-width="0.8" opacity="0.7"/>
      <line x1="30" y1="30" x2="30" y2="60" stroke="#3b82f6" stroke-width="0.8" opacity="0.5"/>
      <line x1="38" y1="35" x2="38" y2="52" stroke="#3b82f6" stroke-width="0.8" opacity="0.7"/>
      <circle cx="30" cy="42" r="1.5" fill="#3b82f6" opacity="0.6"/>
      <path d="M 18,32 Q 10,45 14,55" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 42,32 Q 50,45 46,55" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="22" y="8" width="16" height="18" fill="#fed7aa" rx="3"/>
      <path d="M 22,22 Q 30,30 38,22" fill="#e2e8f0"/>
      <rect x="21" y="6" width="18" height="5" fill="#e2e8f0" rx="2"/>
      <circle cx="26" cy="15" r="1.5" fill="#3b82f6"/>
      <circle cx="34" cy="15" r="1.5" fill="#3b82f6"/>
      <circle cx="26" cy="15" r="3" fill="none" stroke="#64748b" stroke-width="0.8"/>
      <circle cx="34" cy="15" r="3" fill="none" stroke="#64748b" stroke-width="0.8"/>
      <g class="attack-overlay"><line x1="2" y1="40" x2="-6" y2="36" stroke="#60a5fa" stroke-width="1.5" opacity="0.8"/><line x1="2" y1="44" x2="-8" y2="44" stroke="#60a5fa" stroke-width="1.5" opacity="0.7"/><line x1="58" y1="40" x2="66" y2="36" stroke="#60a5fa" stroke-width="1.5" opacity="0.8"/><line x1="58" y1="44" x2="68" y2="44" stroke="#60a5fa" stroke-width="1.5" opacity="0.7"/><polygon points="8,10 10,14 14,12 11,16 15,18 11,19 12,23 8,20 4,23 5,19 1,18 5,16 3,12 6,14" fill="#60a5fa" opacity="0.7"/><circle cx="30" cy="42" r="18" fill="rgba(59,130,246,0.08)"/></g></g></svg>`,
    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
      <rect x="22" y="78" width="7" height="5" rx="1" fill="#94a3b8"/>
      <rect x="31" y="78" width="7" height="5" rx="1" fill="#94a3b8"/>
      <rect x="23" y="62" width="6" height="17" fill="#64748b"/>
      <rect x="31" y="62" width="6" height="17" fill="#64748b"/>
      <rect x="18" y="28" width="24" height="35" fill="#94a3b8" rx="2"/>
      <line x1="22" y1="32" x2="22" y2="55" stroke="#3b82f6" stroke-width="0.8" opacity="0.3"/>
      <path d="M 18,32 Q 10,45 14,55" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 42,32 Q 50,45 46,55" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="22" y="8" width="16" height="18" fill="#fed7aa" rx="3"/>
      <path d="M 22,22 Q 30,30 38,22" fill="#e2e8f0"/>
      <rect x="21" y="6" width="18" height="5" fill="#e2e8f0" rx="2"/>
      <circle cx="26" cy="15" r="1.5" fill="#3b82f6" opacity="0.4"/>
      <circle cx="34" cy="15" r="1.5" fill="#3b82f6" opacity="0.4"/>
      <g class="injured-overlay" opacity="0.85"><line x1="22" y1="12" x2="28" y2="18" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/><line x1="28" y1="12" x2="22" y2="18" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/><circle cx="40" cy="14" r="1.5" fill="#60a5fa" opacity="0.7"/><path d="M40 12 Q41.5 16 40 16.5 Q38.5 16 40 12" fill="#60a5fa" opacity="0.6"/></g></g></svg>`
  },

  // ============================================================
  // 4. THE OBSERVER — Cosmic being, many eyes, floating, starfield robes
  // ============================================================
  gen_observer: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <!-- No shadow — floating -->
      <ellipse cx="30" cy="85" rx="8" ry="2" fill="rgba(99,102,241,0.2)"/>
      <!-- Omniscient aura -->
      <ellipse cx="30" cy="45" rx="24" ry="35" fill="rgba(99,102,241,0.04)"/>
      <!-- Cosmic robe body (no legs — floating) -->
      <path d="M 16,30 Q 14,55 18,80 L 42,80 Q 46,55 44,30 Z" fill="#0f172a"/>
      <!-- Starfield pattern on robe -->
      <circle cx="20" cy="40" r="0.5" fill="#fff" opacity="0.6"/>
      <circle cx="35" cy="45" r="0.7" fill="#fff" opacity="0.5"/>
      <circle cx="25" cy="55" r="0.5" fill="#fff" opacity="0.7"/>
      <circle cx="38" cy="52" r="0.4" fill="#fff" opacity="0.4"/>
      <circle cx="22" cy="65" r="0.6" fill="#c4b5fd" opacity="0.5"/>
      <circle cx="36" cy="60" r="0.5" fill="#818cf8" opacity="0.6"/>
      <circle cx="28" cy="70" r="0.4" fill="#fff" opacity="0.3"/>
      <circle cx="33" cy="72" r="0.5" fill="#c4b5fd" opacity="0.4"/>
      <circle cx="40" cy="68" r="0.3" fill="#fff" opacity="0.5"/>
      <circle cx="19" cy="48" r="0.6" fill="#818cf8" opacity="0.4"/>
      <!-- Robe trim -->
      <path d="M 18,80 L 42,80" stroke="#6366f1" stroke-width="1" opacity="0.5"/>
      <!-- Hood -->
      <path d="M 18,18 Q 30,6 42,18 L 44,32 Q 30,28 16,32 Z" fill="#0f172a"/>
      <path d="M 20,18 Q 30,8 40,18 L 42,30 Q 30,26 18,30 Z" fill="#1e1b4b"/>
      <!-- Face — ethereal pale -->
      <ellipse cx="30" cy="22" rx="8" ry="9" fill="#c7d2fe" opacity="0.7"/>
      <!-- Main eyes -->
      <circle cx="26" cy="20" r="2" fill="#6366f1"/>
      <circle cx="34" cy="20" r="2" fill="#6366f1"/>
      <circle cx="26" cy="20" r="0.8" fill="#e0e7ff"/>
      <circle cx="34" cy="20" r="0.8" fill="#e0e7ff"/>
      <!-- Third eye on forehead -->
      <ellipse cx="30" cy="14" rx="2.5" ry="1.8" fill="#818cf8"/>
      <circle cx="30" cy="14" r="0.8" fill="#e0e7ff"/>
      <!-- Glow from third eye -->
      <circle cx="30" cy="14" r="5" fill="rgba(99,102,241,0.1)"/>
      <!-- Floating hands/sleeves -->
      <path d="M 16,34 Q 6,48 12,56" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 44,34 Q 54,48 48,56" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Levitation glow -->
      <ellipse cx="30" cy="82" rx="10" ry="3" fill="rgba(99,102,241,0.1)"/>
      <ellipse cx="30" cy="82" rx="6" ry="2" fill="rgba(129,140,248,0.15)"/>
    </g></svg>`,
    attack: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="8" ry="2" fill="rgba(99,102,241,0.2)"/>
      <ellipse cx="30" cy="45" rx="24" ry="35" fill="rgba(99,102,241,0.04)"/>
      <path d="M 16,30 Q 14,55 18,80 L 42,80 Q 46,55 44,30 Z" fill="#0f172a"/>
      <circle cx="20" cy="40" r="0.5" fill="#fff" opacity="0.6"/>
      <circle cx="35" cy="45" r="0.7" fill="#fff" opacity="0.5"/>
      <circle cx="25" cy="55" r="0.5" fill="#fff" opacity="0.7"/>
      <circle cx="38" cy="52" r="0.4" fill="#fff" opacity="0.4"/>
      <circle cx="22" cy="65" r="0.6" fill="#c4b5fd" opacity="0.5"/>
      <circle cx="36" cy="60" r="0.5" fill="#818cf8" opacity="0.6"/>
      <path d="M 18,18 Q 30,6 42,18 L 44,32 Q 30,28 16,32 Z" fill="#0f172a"/>
      <path d="M 20,18 Q 30,8 40,18 L 42,30 Q 30,26 18,30 Z" fill="#1e1b4b"/>
      <ellipse cx="30" cy="22" rx="8" ry="9" fill="#c7d2fe" opacity="0.7"/>
      <circle cx="26" cy="20" r="2" fill="#6366f1"/>
      <circle cx="34" cy="20" r="2" fill="#6366f1"/>
      <ellipse cx="30" cy="14" rx="2.5" ry="1.8" fill="#818cf8"/>
      <circle cx="30" cy="14" r="0.8" fill="#e0e7ff"/>
      <path d="M 16,34 Q 6,48 12,56" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 44,34 Q 54,48 48,56" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="30" cy="82" rx="6" ry="2" fill="rgba(129,140,248,0.15)"/>
      <g class="attack-overlay"><line x1="2" y1="38" x2="-6" y2="34" stroke="#818cf8" stroke-width="1.5" opacity="0.8"/><line x1="2" y1="42" x2="-8" y2="42" stroke="#818cf8" stroke-width="1.5" opacity="0.7"/><line x1="58" y1="38" x2="66" y2="34" stroke="#818cf8" stroke-width="1.5" opacity="0.8"/><line x1="58" y1="42" x2="68" y2="42" stroke="#818cf8" stroke-width="1.5" opacity="0.7"/><polygon points="8,8 10,12 14,10 11,14 15,16 11,17 12,21 8,18 4,21 5,17 1,16 5,14 3,10 6,12" fill="#818cf8" opacity="0.65"/><polygon points="52,6 54,10 58,8 55,12 59,14 55,15 56,19 52,16 48,19 49,15 45,14 49,12 47,8 50,10" fill="#c4b5fd" opacity="0.5"/><circle cx="30" cy="14" r="8" fill="rgba(99,102,241,0.1)"/></g></g></svg>`,
    injured: `<svg viewBox="0 0 60 90" class="w-full h-full"><g transform="translate(-6, -18) scale(1.2)">
      <ellipse cx="30" cy="85" rx="8" ry="2" fill="rgba(99,102,241,0.1)"/>
      <path d="M 16,30 Q 14,55 18,80 L 42,80 Q 46,55 44,30 Z" fill="#0f172a"/>
      <circle cx="20" cy="40" r="0.5" fill="#fff" opacity="0.3"/>
      <circle cx="35" cy="45" r="0.7" fill="#fff" opacity="0.2"/>
      <path d="M 18,18 Q 30,6 42,18 L 44,32 Q 30,28 16,32 Z" fill="#0f172a"/>
      <path d="M 20,18 Q 30,8 40,18 L 42,30 Q 30,26 18,30 Z" fill="#1e1b4b"/>
      <ellipse cx="30" cy="22" rx="8" ry="9" fill="#c7d2fe" opacity="0.5"/>
      <circle cx="26" cy="20" r="2" fill="#6366f1" opacity="0.5"/>
      <circle cx="34" cy="20" r="2" fill="#6366f1" opacity="0.5"/>
      <ellipse cx="30" cy="14" rx="2.5" ry="1.8" fill="#818cf8" opacity="0.4"/>
      <path d="M 16,34 Q 6,48 12,56" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 44,34 Q 54,48 48,56" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g class="injured-overlay" opacity="0.85"><line x1="22" y1="17" x2="28" y2="23" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/><line x1="28" y1="17" x2="22" y2="23" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/><circle cx="40" cy="16" r="1.5" fill="#60a5fa" opacity="0.7"/><path d="M40 14 Q41.5 18 40 18.5 Q38.5 18 40 14" fill="#60a5fa" opacity="0.6"/></g></g></svg>`
  }

};

// Merge into main vectors
if (typeof vectors !== 'undefined') Object.assign(vectors, genCharVectors);
