// ============================================================
// MULTIVERSE ENEMY VECTORS - SVG sprites for MV minions & bosses
// Loaded after vectors.js, merged via Object.assign
// ============================================================
const mvEnemyVectors = {

// ===================== MINIONS (27) =====================

// 1. Shadow Scientist — dark lab coat scientist with shadow aura
mv_shadow_scientist: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="shadowAura1"><stop offset="0%" stop-color="rgba(30,0,50,0.6)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#shadowAura1)"/>
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Legs -->
  <rect x="22" y="68" width="6" height="14" fill="#1a1a2e" rx="1"/>
  <rect x="32" y="68" width="6" height="14" fill="#1a1a2e" rx="1"/>
  <!-- Shoes -->
  <rect x="20" y="79" width="9" height="4" fill="#0d0d0d" rx="2"/>
  <rect x="31" y="79" width="9" height="4" fill="#0d0d0d" rx="2"/>
  <!-- Dark lab coat -->
  <rect x="15" y="30" width="30" height="38" fill="#1a1a2e" rx="2"/>
  <line x1="30" y1="30" x2="30" y2="68" stroke="#0f0f23" stroke-width="1"/>
  <!-- Collar -->
  <path d="M 18,30 L 24,38 L 30,32 L 36,38 L 42,30" fill="#2d2d4e" stroke="#0f0f23" stroke-width="0.5"/>
  <!-- Arms -->
  <path d="M 15,34 Q 6,46 10,56" stroke="#1a1a2e" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M 45,34 Q 54,46 50,56" stroke="#1a1a2e" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Glowing flask -->
  <rect x="48" y="53" width="5" height="8" fill="#6b21a8" rx="1" opacity="0.9"/>
  <circle cx="50" cy="52" r="4" fill="#a855f7" opacity="0.6"/>
  <!-- Head -->
  <rect x="21" y="8" width="18" height="20" fill="#c4b5a0" rx="5"/>
  <!-- Dark goggles -->
  <rect x="22" y="14" width="7" height="5" fill="#2d2d4e" rx="2" stroke="#0f0f23" stroke-width="0.5"/>
  <rect x="31" y="14" width="7" height="5" fill="#2d2d4e" rx="2" stroke="#0f0f23" stroke-width="0.5"/>
  <circle cx="25" cy="16" r="1" fill="#a855f7"/>
  <circle cx="35" cy="16" r="1" fill="#a855f7"/>
  <!-- Hair -->
  <path d="M 19,12 C 19,4 41,4 41,12" fill="#2d2d4e"/>
  <!-- Sinister mouth -->
  <path d="M 26,24 Q 30,27 34,24" fill="none" stroke="#4a0072" stroke-width="1"/>
  <!-- Shadow wisps -->
  <path d="M 12,25 Q 8,20 12,15" stroke="#2d2d4e" stroke-width="1.5" fill="none" opacity="0.6"/>
  <path d="M 48,25 Q 52,20 48,15" stroke="#2d2d4e" stroke-width="1.5" fill="none" opacity="0.6"/>
</svg>`,

// 2. Dark Robot — evil dark metal robot with red eyes
mv_dark_robot: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Legs -->
  <rect x="20" y="62" width="8" height="18" fill="#1e293b" stroke="#334155" stroke-width="0.5" rx="1"/>
  <rect x="32" y="62" width="8" height="18" fill="#1e293b" stroke="#334155" stroke-width="0.5" rx="1"/>
  <!-- Feet -->
  <rect x="18" y="78" width="12" height="5" fill="#0f172a" rx="2"/>
  <rect x="30" y="78" width="12" height="5" fill="#0f172a" rx="2"/>
  <!-- Torso -->
  <rect x="14" y="28" width="32" height="34" fill="#1e293b" stroke="#334155" stroke-width="1" rx="3"/>
  <!-- Chest plate -->
  <rect x="20" y="32" width="20" height="16" fill="#0f172a" rx="2"/>
  <circle cx="30" cy="40" r="4" fill="#dc2626" opacity="0.8"/>
  <circle cx="30" cy="40" r="2" fill="#ef4444"/>
  <!-- Panel lines -->
  <line x1="18" y1="50" x2="42" y2="50" stroke="#334155" stroke-width="0.5"/>
  <line x1="30" y1="50" x2="30" y2="62" stroke="#334155" stroke-width="0.5"/>
  <!-- Arms -->
  <rect x="5" y="30" width="8" height="22" fill="#1e293b" stroke="#334155" stroke-width="0.5" rx="2"/>
  <rect x="47" y="30" width="8" height="22" fill="#1e293b" stroke="#334155" stroke-width="0.5" rx="2"/>
  <!-- Claws -->
  <path d="M 6,52 L 4,58 M 9,52 L 9,58 M 12,52 L 14,58" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M 48,52 L 46,58 M 51,52 L 51,58 M 54,52 L 56,58" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Head -->
  <rect x="18" y="6" width="24" height="20" fill="#1e293b" stroke="#334155" stroke-width="1" rx="3"/>
  <!-- Red eyes -->
  <rect x="22" y="12" width="6" height="4" fill="#dc2626" rx="1"/>
  <rect x="32" y="12" width="6" height="4" fill="#dc2626" rx="1"/>
  <circle cx="25" cy="14" r="1" fill="#fff" opacity="0.8"/>
  <circle cx="35" cy="14" r="1" fill="#fff" opacity="0.8"/>
  <!-- Antenna -->
  <line x1="30" y1="6" x2="30" y2="1" stroke="#475569" stroke-width="1.5"/>
  <circle cx="30" cy="1" r="2" fill="#dc2626" opacity="0.7"/>
  <!-- Jaw -->
  <rect x="24" y="20" width="12" height="3" fill="#0f172a" rx="1"/>
  <line x1="26" y1="21" x2="34" y2="21" stroke="#dc2626" stroke-width="0.5" stroke-dasharray="2,1"/>
</svg>`,

// 3. Evil Intern — sinister intern with clipboard, dark clothes
mv_evil_intern: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Legs -->
  <rect x="23" y="62" width="6" height="18" fill="#1e1e1e"/>
  <rect x="31" y="62" width="6" height="18" fill="#1e1e1e"/>
  <!-- Shoes -->
  <rect x="21" y="78" width="9" height="4" fill="#111" rx="2"/>
  <rect x="30" y="78" width="9" height="4" fill="#111" rx="2"/>
  <!-- Dark shirt -->
  <rect x="17" y="30" width="26" height="32" fill="#1e1e1e" rx="2"/>
  <!-- Name badge -->
  <rect x="34" y="34" width="7" height="5" fill="#dc2626" rx="1"/>
  <line x1="36" y1="36" x2="40" y2="36" stroke="#fff" stroke-width="0.5"/>
  <line x1="36" y1="38" x2="39" y2="38" stroke="#fff" stroke-width="0.5"/>
  <!-- Dark tie -->
  <path d="M 30,32 L 27,38 L 30,62 L 33,38 Z" fill="#4a0000"/>
  <!-- Arms -->
  <path d="M 17,34 Q 8,44 12,54" stroke="#1e1e1e" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 43,34 Q 48,42 46,52" stroke="#1e1e1e" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Clipboard -->
  <rect x="2" y="48" width="12" height="16" fill="#5c4033" rx="1"/>
  <rect x="4" y="51" width="8" height="11" fill="#fef3c7"/>
  <line x1="5" y1="54" x2="11" y2="54" stroke="#333" stroke-width="0.5"/>
  <line x1="5" y1="56" x2="11" y2="56" stroke="#333" stroke-width="0.5"/>
  <line x1="5" y1="58" x2="11" y2="58" stroke="#333" stroke-width="0.5"/>
  <rect x="6" y="47" width="4" height="3" fill="#94a3b8" rx="0.5"/>
  <!-- Head -->
  <rect x="21" y="8" width="18" height="20" fill="#dbc4a0" rx="5"/>
  <!-- Evil smirk -->
  <path d="M 25,22 Q 30,26 35,22" fill="none" stroke="#333" stroke-width="1"/>
  <!-- Narrow eyes -->
  <path d="M 24,14 L 22,15 L 24,16" fill="#111"/>
  <path d="M 36,14 L 38,15 L 36,16" fill="#111"/>
  <!-- Slicked hair -->
  <path d="M 19,12 C 19,3 41,3 41,12 L 40,8 L 20,8 Z" fill="#111"/>
  <!-- Eyebrow -->
  <line x1="23" y1="12" x2="27" y2="13" stroke="#111" stroke-width="0.8"/>
  <line x1="37" y1="12" x2="33" y2="13" stroke="#111" stroke-width="0.8"/>
</svg>`,

// 4. Clockwork Automaton — steampunk brass automaton with gears
mv_clockwork_auto: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Legs -->
  <rect x="20" y="62" width="8" height="16" fill="#b8860b" stroke="#8b6914" stroke-width="0.5" rx="1"/>
  <rect x="32" y="62" width="8" height="16" fill="#b8860b" stroke="#8b6914" stroke-width="0.5" rx="1"/>
  <!-- Knee rivets -->
  <circle cx="24" cy="66" r="1.5" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <circle cx="36" cy="66" r="1.5" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <!-- Feet -->
  <rect x="18" y="76" width="12" height="6" fill="#8b6914" rx="2"/>
  <rect x="30" y="76" width="12" height="6" fill="#8b6914" rx="2"/>
  <!-- Torso -->
  <rect x="14" y="26" width="32" height="36" fill="#b8860b" stroke="#8b6914" stroke-width="1" rx="3"/>
  <!-- Chest gear window -->
  <circle cx="30" cy="40" r="8" fill="#3d2b1f" stroke="#d4a017" stroke-width="1"/>
  <circle cx="30" cy="40" r="5" fill="none" stroke="#d4a017" stroke-width="0.5"/>
  <!-- Gear teeth -->
  <path d="M 30,32 L 31,34 L 29,34 Z M 38,40 L 36,41 L 36,39 Z M 30,48 L 29,46 L 31,46 Z M 22,40 L 24,39 L 24,41 Z" fill="#d4a017"/>
  <!-- Small inner gear -->
  <circle cx="30" cy="40" r="2" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <!-- Steam vents -->
  <rect x="16" y="50" width="3" height="5" fill="#5c4033" rx="0.5"/>
  <rect x="41" y="50" width="3" height="5" fill="#5c4033" rx="0.5"/>
  <!-- Arms -->
  <rect x="4" y="28" width="9" height="20" fill="#b8860b" stroke="#8b6914" stroke-width="0.5" rx="2"/>
  <rect x="47" y="28" width="9" height="20" fill="#b8860b" stroke="#8b6914" stroke-width="0.5" rx="2"/>
  <!-- Piston details -->
  <line x1="8" y1="48" x2="8" y2="54" stroke="#d4a017" stroke-width="2"/>
  <line x1="52" y1="48" x2="52" y2="54" stroke="#d4a017" stroke-width="2"/>
  <!-- Head -->
  <rect x="18" y="4" width="24" height="20" fill="#b8860b" stroke="#8b6914" stroke-width="1" rx="4"/>
  <!-- Eye lenses -->
  <circle cx="25" cy="14" r="4" fill="#3d2b1f" stroke="#d4a017" stroke-width="1"/>
  <circle cx="35" cy="14" r="4" fill="#3d2b1f" stroke="#d4a017" stroke-width="1"/>
  <circle cx="25" cy="14" r="1.5" fill="#fbbf24" opacity="0.8"/>
  <circle cx="35" cy="14" r="1.5" fill="#fbbf24" opacity="0.8"/>
  <!-- Top pipe -->
  <rect x="28" y="1" width="4" height="5" fill="#8b6914" rx="1"/>
  <ellipse cx="30" cy="1" rx="3" ry="1" fill="#5c4033"/>
</svg>`,

// 5. Steam Golem — large steam-powered stone golem
mv_steam_golem: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="86" rx="16" ry="4" fill="rgba(0,0,0,0.4)"/>
  <!-- Massive legs -->
  <rect x="16" y="62" width="12" height="20" fill="#6b7280" stroke="#4b5563" stroke-width="1" rx="2"/>
  <rect x="32" y="62" width="12" height="20" fill="#6b7280" stroke="#4b5563" stroke-width="1" rx="2"/>
  <!-- Stone feet -->
  <rect x="14" y="79" width="15" height="6" fill="#4b5563" rx="3"/>
  <rect x="31" y="79" width="15" height="6" fill="#4b5563" rx="3"/>
  <!-- Massive torso -->
  <rect x="10" y="22" width="40" height="40" fill="#6b7280" stroke="#4b5563" stroke-width="1" rx="4"/>
  <!-- Boiler plate -->
  <rect x="18" y="28" width="24" height="20" fill="#4b5563" rx="2"/>
  <circle cx="30" cy="38" r="6" fill="#374151" stroke="#9ca3af" stroke-width="1"/>
  <!-- Steam glow -->
  <circle cx="30" cy="38" r="3" fill="#f97316" opacity="0.6"/>
  <!-- Rivets -->
  <circle cx="14" cy="28" r="1.5" fill="#9ca3af"/>
  <circle cx="46" cy="28" r="1.5" fill="#9ca3af"/>
  <circle cx="14" cy="56" r="1.5" fill="#9ca3af"/>
  <circle cx="46" cy="56" r="1.5" fill="#9ca3af"/>
  <!-- Massive arms -->
  <rect x="1" y="24" width="10" height="28" fill="#6b7280" stroke="#4b5563" stroke-width="1" rx="3"/>
  <rect x="49" y="24" width="10" height="28" fill="#6b7280" stroke="#4b5563" stroke-width="1" rx="3"/>
  <!-- Stone fists -->
  <rect x="0" y="50" width="12" height="10" fill="#4b5563" rx="3"/>
  <rect x="48" y="50" width="12" height="10" fill="#4b5563" rx="3"/>
  <!-- Small head -->
  <rect x="20" y="6" width="20" height="16" fill="#6b7280" stroke="#4b5563" stroke-width="1" rx="4"/>
  <!-- Glowing eyes -->
  <rect x="23" y="12" width="5" height="3" fill="#f97316" rx="1"/>
  <rect x="32" y="12" width="5" height="3" fill="#f97316" rx="1"/>
  <!-- Steam coming out top -->
  <path d="M 26,6 Q 24,1 26,-2" stroke="#d1d5db" stroke-width="1.5" fill="none" opacity="0.5"/>
  <path d="M 30,6 Q 30,0 32,-3" stroke="#d1d5db" stroke-width="1.5" fill="none" opacity="0.5"/>
  <path d="M 34,6 Q 36,1 34,-2" stroke="#d1d5db" stroke-width="1.5" fill="none" opacity="0.5"/>
</svg>`,

// 6. Gear Spider — small mechanical spider with gear legs
mv_gear_spider: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="75" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Legs (8 total, 4 per side) -->
  <path d="M 20,48 Q 6,40 2,52 Q 0,58 4,62" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 20,54 Q 4,50 0,62 Q -1,68 4,70" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 22,58 Q 8,60 4,72 Q 2,76 6,78" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 22,44 Q 10,34 6,42 Q 4,46 6,50" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 40,48 Q 54,40 58,52 Q 60,58 56,62" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 40,54 Q 56,50 60,62 Q 61,68 56,70" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 38,58 Q 52,60 56,72 Q 58,76 54,78" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 38,44 Q 50,34 54,42 Q 56,46 54,50" stroke="#8b6914" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Gear joints -->
  <circle cx="6" cy="50" r="2" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <circle cx="4" cy="62" r="2" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <circle cx="54" cy="50" r="2" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <circle cx="56" cy="62" r="2" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <!-- Body -->
  <ellipse cx="30" cy="52" rx="14" ry="10" fill="#b8860b" stroke="#8b6914" stroke-width="1"/>
  <!-- Abdomen -->
  <ellipse cx="30" cy="64" rx="10" ry="8" fill="#a07000" stroke="#8b6914" stroke-width="1"/>
  <!-- Body gear emblem -->
  <circle cx="30" cy="52" r="5" fill="none" stroke="#d4a017" stroke-width="1"/>
  <circle cx="30" cy="52" r="2" fill="#d4a017"/>
  <!-- Head -->
  <ellipse cx="30" cy="40" rx="8" ry="6" fill="#b8860b" stroke="#8b6914" stroke-width="1"/>
  <!-- Multiple eyes -->
  <circle cx="25" cy="38" r="2" fill="#dc2626"/>
  <circle cx="30" cy="36" r="2" fill="#dc2626"/>
  <circle cx="35" cy="38" r="2" fill="#dc2626"/>
  <circle cx="27" cy="42" r="1.5" fill="#ef4444"/>
  <circle cx="33" cy="42" r="1.5" fill="#ef4444"/>
  <!-- Mandibles -->
  <path d="M 26,44 L 24,48" stroke="#8b6914" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M 34,44 L 36,48" stroke="#8b6914" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,

// 7. Zombie Civilian — undead civilian, torn clothes, green skin
mv_zombie_civ: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Legs -->
  <rect x="22" y="64" width="6" height="16" fill="#4a5568" rx="1"/>
  <rect x="32" y="66" width="6" height="14" fill="#4a5568" rx="1"/>
  <!-- Torn pants detail -->
  <path d="M 22,76 L 20,78 L 24,78" fill="#4a5568"/>
  <!-- Shoes -->
  <rect x="20" y="78" width="9" height="4" fill="#3d3d3d" rx="1"/>
  <rect x="31" y="79" width="9" height="4" fill="#3d3d3d" rx="1"/>
  <!-- Torso -->
  <rect x="17" y="30" width="26" height="34" fill="#6b7280" rx="2"/>
  <!-- Torn shirt -->
  <path d="M 17,50 L 15,52 L 17,54" fill="#4a5568"/>
  <path d="M 43,44 L 45,46 L 43,48" fill="#4a5568"/>
  <!-- Ribs showing -->
  <line x1="22" y1="40" x2="28" y2="40" stroke="#4ade80" stroke-width="0.8" opacity="0.6"/>
  <line x1="22" y1="43" x2="28" y2="43" stroke="#4ade80" stroke-width="0.8" opacity="0.6"/>
  <!-- Arms (asymmetric zombie pose) -->
  <path d="M 17,34 Q 6,38 8,52 L 10,58" stroke="#4ade80" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 43,34 Q 54,36 52,42 L 56,46" stroke="#4ade80" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Green zombie hands -->
  <circle cx="10" cy="58" r="3" fill="#4ade80"/>
  <circle cx="56" cy="46" r="3" fill="#4ade80"/>
  <!-- Head -->
  <rect x="21" y="8" width="18" height="20" fill="#4ade80" rx="5"/>
  <!-- Sunken eyes -->
  <circle cx="26" cy="16" r="2.5" fill="#1a3a1a"/>
  <circle cx="34" cy="16" r="2.5" fill="#1a3a1a"/>
  <circle cx="26" cy="16" r="1" fill="#fbbf24"/>
  <circle cx="34" cy="16" r="1" fill="#fbbf24"/>
  <!-- Moaning mouth -->
  <ellipse cx="30" cy="24" rx="4" ry="2" fill="#1a3a1a"/>
  <!-- Messy hair -->
  <path d="M 19,12 C 19,3 41,3 41,12" fill="#5c4033"/>
  <path d="M 22,8 L 20,4 M 30,6 L 32,2 M 38,8 L 40,4" stroke="#5c4033" stroke-width="1.5"/>
  <!-- Wound marks -->
  <line x1="34" y1="10" x2="38" y2="14" stroke="#dc2626" stroke-width="1"/>
  <line x1="36" y1="10" x2="40" y2="14" stroke="#dc2626" stroke-width="1"/>
</svg>`,

// 8. Infected Nerd — zombie nerd with glasses, brain exposed
mv_infected_nerd: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Legs -->
  <rect x="23" y="64" width="6" height="16" fill="#4a5568"/>
  <rect x="31" y="64" width="6" height="16" fill="#4a5568"/>
  <!-- Shoes -->
  <rect x="21" y="78" width="9" height="4" fill="#1e293b" rx="2"/>
  <rect x="30" y="78" width="9" height="4" fill="#1e293b" rx="2"/>
  <!-- Shirt (stained) -->
  <rect x="17" y="30" width="26" height="34" fill="#365314" rx="2"/>
  <!-- Pocket protector -->
  <rect x="33" y="33" width="5" height="8" fill="#f5f5f4" rx="0.5"/>
  <line x1="35" y1="33" x2="35" y2="38" stroke="#3b82f6" stroke-width="1"/>
  <line x1="37" y1="33" x2="37" y2="37" stroke="#dc2626" stroke-width="1"/>
  <!-- Blood stains -->
  <circle cx="24" cy="44" r="3" fill="#7f1d1d" opacity="0.6"/>
  <circle cx="36" cy="50" r="2" fill="#7f1d1d" opacity="0.6"/>
  <!-- Arms -->
  <path d="M 17,34 Q 8,44 12,56" stroke="#4ade80" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 43,34 Q 52,40 50,54" stroke="#4ade80" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Zombie hands -->
  <circle cx="12" cy="56" r="3" fill="#4ade80"/>
  <circle cx="50" cy="54" r="3" fill="#4ade80"/>
  <!-- Head -->
  <rect x="20" y="8" width="20" height="22" fill="#4ade80" rx="5"/>
  <!-- Exposed brain top -->
  <path d="M 22,10 Q 26,2 30,4 Q 34,2 38,10" fill="#f472b6" stroke="#ec4899" stroke-width="0.5"/>
  <path d="M 26,4 Q 30,6 34,4" stroke="#db2777" stroke-width="0.5" fill="none"/>
  <path d="M 24,6 Q 28,8 32,6" stroke="#db2777" stroke-width="0.5" fill="none"/>
  <!-- Cracked glasses -->
  <rect x="22" y="14" width="7" height="6" fill="none" stroke="#1e293b" stroke-width="1" rx="1"/>
  <rect x="31" y="14" width="7" height="6" fill="none" stroke="#1e293b" stroke-width="1" rx="1"/>
  <line x1="29" y1="17" x2="31" y2="17" stroke="#1e293b" stroke-width="1"/>
  <!-- Crack in left lens -->
  <line x1="24" y1="15" x2="27" y2="19" stroke="#94a3b8" stroke-width="0.5"/>
  <line x1="27" y1="19" x2="25" y2="18" stroke="#94a3b8" stroke-width="0.5"/>
  <!-- Zombie eyes -->
  <circle cx="26" cy="17" r="1.5" fill="#fbbf24"/>
  <circle cx="34" cy="17" r="1.5" fill="#fbbf24"/>
  <!-- Open jaw -->
  <path d="M 25,24 Q 30,30 35,24" fill="#1a3a1a"/>
  <line x1="27" y1="25" x2="27" y2="27" stroke="#f5f5f4" stroke-width="1"/>
  <line x1="33" y1="25" x2="33" y2="27" stroke="#f5f5f4" stroke-width="1"/>
</svg>`,

// 9. Ghost Pirate — transparent ghost pirate with hat and sword
mv_ghost_pirate: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><linearGradient id="ghostFade1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(148,210,255,0.7)"/><stop offset="100%" stop-color="rgba(148,210,255,0.1)"/></linearGradient></defs>
  <ellipse cx="30" cy="85" rx="10" ry="2" fill="rgba(100,180,255,0.2)"/>
  <!-- Ghostly body (wispy bottom) -->
  <path d="M 16,30 L 16,70 Q 20,75 24,70 Q 28,75 32,70 Q 36,75 40,70 Q 44,75 44,70 L 44,30 Z" fill="url(#ghostFade1)" opacity="0.7"/>
  <!-- Coat details -->
  <line x1="30" y1="34" x2="30" y2="65" stroke="rgba(100,160,220,0.4)" stroke-width="0.5"/>
  <!-- Belt -->
  <rect x="18" y="48" width="24" height="3" fill="rgba(80,140,200,0.5)" rx="1"/>
  <rect x="28" y="47" width="4" height="5" fill="rgba(200,200,100,0.5)" rx="0.5"/>
  <!-- Arms -->
  <path d="M 16,34 Q 6,44 10,54" stroke="rgba(148,210,255,0.5)" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 44,34 Q 54,40 50,50" stroke="rgba(148,210,255,0.5)" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Ghost sword -->
  <line x1="50" y1="50" x2="58" y2="30" stroke="rgba(200,230,255,0.8)" stroke-width="2"/>
  <line x1="48" y1="50" x2="52" y2="50" stroke="rgba(200,200,100,0.6)" stroke-width="2"/>
  <!-- Head -->
  <rect x="21" y="8" width="18" height="18" fill="rgba(148,210,255,0.6)" rx="5"/>
  <!-- Pirate hat -->
  <path d="M 14,12 Q 30,0 46,12 L 42,12 Q 30,6 18,12 Z" fill="rgba(30,60,100,0.7)"/>
  <rect x="16" y="11" width="28" height="3" fill="rgba(30,60,100,0.7)" rx="1"/>
  <!-- Skull on hat -->
  <circle cx="30" cy="10" r="2" fill="rgba(255,255,255,0.6)"/>
  <!-- Ghost eyes -->
  <circle cx="26" cy="16" r="2" fill="rgba(255,255,255,0.9)"/>
  <circle cx="34" cy="16" r="2" fill="rgba(255,255,255,0.9)"/>
  <circle cx="26" cy="16" r="1" fill="#0ea5e9"/>
  <circle cx="34" cy="16" r="1" fill="#0ea5e9"/>
  <!-- Ghost mouth -->
  <ellipse cx="30" cy="22" rx="3" ry="1.5" fill="rgba(0,30,60,0.5)"/>
</svg>`,

// 10. Skeleton Crew — skeleton sailor with tattered uniform
mv_skeleton_crew: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Bone legs -->
  <line x1="26" y1="62" x2="24" y2="78" stroke="#e5e5dc" stroke-width="3" stroke-linecap="round"/>
  <line x1="34" y1="62" x2="36" y2="78" stroke="#e5e5dc" stroke-width="3" stroke-linecap="round"/>
  <!-- Knee joints -->
  <circle cx="25" cy="70" r="2" fill="#d4d4c8"/>
  <circle cx="35" cy="70" r="2" fill="#d4d4c8"/>
  <!-- Feet -->
  <rect x="21" y="78" width="7" height="4" fill="#d4d4c8" rx="1"/>
  <rect x="33" y="78" width="7" height="4" fill="#d4d4c8" rx="1"/>
  <!-- Ribcage torso -->
  <rect x="18" y="32" width="24" height="30" fill="none"/>
  <!-- Tattered naval jacket -->
  <rect x="16" y="30" width="28" height="20" fill="#1e3a5f" rx="2" opacity="0.7"/>
  <path d="M 16,50 L 14,55 L 18,52 M 44,50 L 46,55 L 42,52" fill="#1e3a5f" opacity="0.7"/>
  <!-- Ribs visible below -->
  <line x1="22" y1="52" x2="38" y2="52" stroke="#e5e5dc" stroke-width="1.5"/>
  <line x1="23" y1="55" x2="37" y2="55" stroke="#e5e5dc" stroke-width="1.5"/>
  <line x1="24" y1="58" x2="36" y2="58" stroke="#e5e5dc" stroke-width="1.5"/>
  <!-- Spine -->
  <line x1="30" y1="50" x2="30" y2="62" stroke="#e5e5dc" stroke-width="2"/>
  <!-- Brass buttons -->
  <circle cx="30" cy="34" r="1" fill="#d4a017"/>
  <circle cx="30" cy="38" r="1" fill="#d4a017"/>
  <circle cx="30" cy="42" r="1" fill="#d4a017"/>
  <!-- Arms -->
  <line x1="16" y1="34" x2="8" y2="50" stroke="#e5e5dc" stroke-width="3" stroke-linecap="round"/>
  <line x1="44" y1="34" x2="52" y2="50" stroke="#e5e5dc" stroke-width="3" stroke-linecap="round"/>
  <!-- Bone hands -->
  <circle cx="8" cy="50" r="2.5" fill="#d4d4c8"/>
  <circle cx="52" cy="50" r="2.5" fill="#d4d4c8"/>
  <!-- Skull head -->
  <rect x="20" y="6" width="20" height="22" fill="#e5e5dc" rx="6"/>
  <!-- Eye sockets -->
  <circle cx="26" cy="14" r="3" fill="#1a1a2e"/>
  <circle cx="34" cy="14" r="3" fill="#1a1a2e"/>
  <circle cx="26" cy="14" r="1" fill="#fbbf24" opacity="0.6"/>
  <circle cx="34" cy="14" r="1" fill="#fbbf24" opacity="0.6"/>
  <!-- Nose hole -->
  <path d="M 29,18 L 30,20 L 31,18" fill="#1a1a2e"/>
  <!-- Teeth -->
  <rect x="25" y="22" width="10" height="4" fill="#e5e5dc" stroke="#d4d4c8" stroke-width="0.5" rx="1"/>
  <line x1="27" y1="22" x2="27" y2="26" stroke="#1a1a2e" stroke-width="0.5"/>
  <line x1="30" y1="22" x2="30" y2="26" stroke="#1a1a2e" stroke-width="0.5"/>
  <line x1="33" y1="22" x2="33" y2="26" stroke="#1a1a2e" stroke-width="0.5"/>
  <!-- Sailor hat -->
  <rect x="18" y="5" width="24" height="4" fill="#1e3a5f" rx="1"/>
  <rect x="22" y="2" width="16" height="5" fill="#f5f5f4" rx="1"/>
</svg>`,

// 11. Goblin Warrior — small green goblin with club
mv_goblin_warrior: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Short legs -->
  <rect x="22" y="68" width="7" height="12" fill="#166534" rx="1"/>
  <rect x="31" y="68" width="7" height="12" fill="#166534" rx="1"/>
  <!-- Big feet -->
  <rect x="19" y="78" width="12" height="5" fill="#15803d" rx="2"/>
  <rect x="29" y="78" width="12" height="5" fill="#15803d" rx="2"/>
  <!-- Crude leather armor -->
  <rect x="16" y="38" width="28" height="30" fill="#78350f" rx="2"/>
  <line x1="30" y1="38" x2="30" y2="68" stroke="#5c2d0e" stroke-width="1"/>
  <!-- Belt with skull -->
  <rect x="18" y="56" width="24" height="4" fill="#5c2d0e" rx="1"/>
  <circle cx="30" cy="58" r="3" fill="#e5e5dc"/>
  <circle cx="29" cy="57" r="0.8" fill="#333"/>
  <circle cx="31" cy="57" r="0.8" fill="#333"/>
  <!-- Arms -->
  <path d="M 16,42 Q 6,50 10,60" stroke="#166534" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 44,42 Q 52,46 50,56" stroke="#166534" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Club -->
  <line x1="50" y1="56" x2="56" y2="30" stroke="#78350f" stroke-width="3"/>
  <ellipse cx="56" cy="28" rx="5" ry="6" fill="#5c4033"/>
  <circle cx="54" cy="26" r="1" fill="#94a3b8"/>
  <circle cx="58" cy="30" r="1" fill="#94a3b8"/>
  <!-- Big head -->
  <rect x="18" y="14" width="24" height="24" fill="#22c55e" rx="8"/>
  <!-- Big ears -->
  <path d="M 18,20 L 8,14 L 14,26" fill="#15803d"/>
  <path d="M 42,20 L 52,14 L 46,26" fill="#15803d"/>
  <!-- Big yellow eyes -->
  <circle cx="25" cy="24" r="3" fill="#fbbf24"/>
  <circle cx="35" cy="24" r="3" fill="#fbbf24"/>
  <circle cx="25" cy="24" r="1.5" fill="#1a1a2e"/>
  <circle cx="35" cy="24" r="1.5" fill="#1a1a2e"/>
  <!-- Snaggletooth mouth -->
  <path d="M 23,32 Q 30,36 37,32" fill="#1a1a2e"/>
  <rect x="26" y="31" width="2" height="3" fill="#f5f5f4" rx="0.5"/>
  <rect x="33" y="31" width="2" height="3" fill="#f5f5f4" rx="0.5"/>
  <!-- Nose -->
  <circle cx="30" cy="28" r="2.5" fill="#15803d"/>
</svg>`,

// 12. Dark Knight — dark armored knight with sword and shield
mv_dark_knight: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Armored legs -->
  <rect x="19" y="60" width="9" height="20" fill="#1e293b" stroke="#475569" stroke-width="1" rx="1"/>
  <rect x="32" y="60" width="9" height="20" fill="#1e293b" stroke="#475569" stroke-width="1" rx="1"/>
  <!-- Sabatons -->
  <rect x="17" y="78" width="12" height="5" fill="#334155" rx="2"/>
  <rect x="31" y="78" width="12" height="5" fill="#334155" rx="2"/>
  <!-- Knee guards -->
  <ellipse cx="24" cy="64" rx="5" ry="3" fill="#334155" stroke="#475569" stroke-width="0.5"/>
  <ellipse cx="36" cy="64" rx="5" ry="3" fill="#334155" stroke="#475569" stroke-width="0.5"/>
  <!-- Dark plate armor torso -->
  <rect x="14" y="24" width="32" height="36" fill="#1e293b" stroke="#475569" stroke-width="1" rx="3"/>
  <!-- Chest plate detail -->
  <path d="M 22,28 L 30,42 L 38,28" fill="none" stroke="#6b21a8" stroke-width="1.5"/>
  <circle cx="30" cy="36" r="3" fill="#6b21a8" opacity="0.6"/>
  <!-- Pauldrons -->
  <ellipse cx="12" cy="28" rx="6" ry="4" fill="#334155" stroke="#475569" stroke-width="1"/>
  <ellipse cx="48" cy="28" rx="6" ry="4" fill="#334155" stroke="#475569" stroke-width="1"/>
  <!-- Shield arm -->
  <path d="M 14,30 Q 4,42 6,52" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Shield -->
  <path d="M 0,42 L 0,56 L 8,62 L 16,56 L 16,42 Z" fill="#334155" stroke="#475569" stroke-width="1"/>
  <path d="M 8,44 L 8,58" stroke="#6b21a8" stroke-width="1.5"/>
  <path d="M 2,50 L 14,50" stroke="#6b21a8" stroke-width="1.5"/>
  <!-- Sword arm -->
  <path d="M 46,30 Q 54,38 52,48" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Sword -->
  <line x1="52" y1="48" x2="58" y2="12" stroke="#94a3b8" stroke-width="2.5"/>
  <line x1="49" y1="48" x2="55" y2="48" stroke="#475569" stroke-width="3"/>
  <!-- Dark helm -->
  <rect x="18" y="4" width="24" height="20" fill="#1e293b" stroke="#475569" stroke-width="1" rx="4"/>
  <!-- Visor slit -->
  <rect x="22" y="12" width="16" height="4" fill="#0f172a" rx="1"/>
  <!-- Glowing eyes behind visor -->
  <circle cx="27" cy="14" r="1.5" fill="#a855f7"/>
  <circle cx="33" cy="14" r="1.5" fill="#a855f7"/>
  <!-- Helm crest -->
  <path d="M 30,4 L 30,-2 Q 34,0 32,4" fill="#6b21a8"/>
</svg>`,

// 13. Wyvern — flying dragon-like creature, wings spread
mv_wyvern: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="10" ry="2" fill="rgba(0,0,0,0.2)"/>
  <!-- Tail -->
  <path d="M 30,72 Q 20,80 12,82 L 10,78 L 14,80" stroke="#166534" stroke-width="2.5" fill="#15803d"/>
  <!-- Legs (tucked) -->
  <path d="M 25,66 Q 22,74 18,78" stroke="#166534" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 35,66 Q 38,74 42,78" stroke="#166534" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Claws -->
  <path d="M 16,78 L 14,80 M 18,78 L 18,81 M 20,78 L 22,80" stroke="#166534" stroke-width="1" stroke-linecap="round"/>
  <path d="M 40,78 L 38,80 M 42,78 L 42,81 M 44,78 L 46,80" stroke="#166534" stroke-width="1" stroke-linecap="round"/>
  <!-- Body -->
  <ellipse cx="30" cy="54" rx="12" ry="16" fill="#22c55e" stroke="#166534" stroke-width="1"/>
  <!-- Belly -->
  <ellipse cx="30" cy="58" rx="8" ry="10" fill="#86efac" opacity="0.5"/>
  <!-- Left wing -->
  <path d="M 18,42 L 0,20 L 4,36 L 8,28 L 10,40 L 14,32 L 16,44" fill="#15803d" stroke="#166534" stroke-width="1"/>
  <!-- Right wing -->
  <path d="M 42,42 L 60,20 L 56,36 L 52,28 L 50,40 L 46,32 L 44,44" fill="#15803d" stroke="#166534" stroke-width="1"/>
  <!-- Wing membranes -->
  <path d="M 18,42 Q 10,30 0,20" fill="none" stroke="#4ade80" stroke-width="0.5" opacity="0.5"/>
  <path d="M 42,42 Q 50,30 60,20" fill="none" stroke="#4ade80" stroke-width="0.5" opacity="0.5"/>
  <!-- Neck -->
  <path d="M 30,40 Q 30,32 28,26" stroke="#22c55e" stroke-width="8" fill="none"/>
  <!-- Head -->
  <ellipse cx="28" cy="22" rx="8" ry="6" fill="#22c55e" stroke="#166534" stroke-width="1"/>
  <!-- Snout -->
  <ellipse cx="22" cy="22" rx="4" ry="3" fill="#15803d"/>
  <!-- Nostrils -->
  <circle cx="20" cy="21" r="0.8" fill="#0f172a"/>
  <circle cx="20" cy="23" r="0.8" fill="#0f172a"/>
  <!-- Fire nostril glow -->
  <circle cx="19" cy="22" r="1.5" fill="#f97316" opacity="0.4"/>
  <!-- Eyes -->
  <circle cx="27" cy="19" r="2" fill="#fbbf24"/>
  <circle cx="27" cy="19" r="1" fill="#0f172a"/>
  <!-- Horns -->
  <path d="M 30,16 L 34,10 L 32,16" fill="#78350f"/>
  <path d="M 26,16 L 22,10 L 24,16" fill="#78350f"/>
  <!-- Teeth -->
  <path d="M 19,24 L 20,26 L 21,24 L 22,26 L 23,24" fill="#f5f5f4"/>
</svg>`,

// 14. Bandit — western bandit with bandana mask, hat, guns
mv_bandit: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Boots -->
  <rect x="19" y="74" width="9" height="8" fill="#78350f" rx="2"/>
  <rect x="32" y="74" width="9" height="8" fill="#78350f" rx="2"/>
  <!-- Boot heels -->
  <rect x="19" y="80" width="3" height="3" fill="#5c2d0e"/>
  <rect x="38" y="80" width="3" height="3" fill="#5c2d0e"/>
  <!-- Legs -->
  <rect x="22" y="58" width="6" height="18" fill="#4a5568"/>
  <rect x="32" y="58" width="6" height="18" fill="#4a5568"/>
  <!-- Torso -->
  <rect x="16" y="28" width="28" height="30" fill="#78350f" rx="2"/>
  <!-- Vest -->
  <rect x="18" y="30" width="10" height="26" fill="#3d2b1f"/>
  <rect x="32" y="30" width="10" height="26" fill="#3d2b1f"/>
  <!-- Belt with holsters -->
  <rect x="16" y="54" width="28" height="4" fill="#5c2d0e" rx="1"/>
  <rect x="28" y="53" width="4" height="6" fill="#d4a017" rx="1"/>
  <!-- Arms -->
  <path d="M 16,32 Q 6,40 8,50" stroke="#78350f" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 44,32 Q 54,40 52,50" stroke="#78350f" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Guns -->
  <rect x="4" y="48" width="8" height="4" fill="#64748b" rx="1"/>
  <rect x="2" y="46" width="3" height="6" fill="#475569" rx="0.5"/>
  <rect x="48" y="48" width="8" height="4" fill="#64748b" rx="1"/>
  <rect x="55" y="46" width="3" height="6" fill="#475569" rx="0.5"/>
  <!-- Head -->
  <rect x="21" y="8" width="18" height="18" fill="#dbc4a0" rx="5"/>
  <!-- Bandana mask -->
  <rect x="20" y="16" width="20" height="8" fill="#dc2626" rx="2"/>
  <path d="M 20,24 L 18,28 M 40,24 L 42,28" stroke="#dc2626" stroke-width="1.5"/>
  <!-- Squinting eyes -->
  <line x1="24" y1="14" x2="28" y2="14" stroke="#1e1e1e" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="32" y1="14" x2="36" y2="14" stroke="#1e1e1e" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Cowboy hat -->
  <rect x="12" y="7" width="36" height="3" fill="#5c2d0e" rx="1"/>
  <rect x="18" y="1" width="24" height="8" fill="#78350f" rx="3"/>
  <rect x="22" y="0" width="16" height="3" fill="#78350f" rx="1"/>
</svg>`,

// 15. Outlaw Gunslinger — outlaw with duster coat and pistols
mv_outlaw: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Boots with spurs -->
  <rect x="19" y="74" width="9" height="8" fill="#5c2d0e" rx="2"/>
  <rect x="32" y="74" width="9" height="8" fill="#5c2d0e" rx="2"/>
  <circle cx="20" cy="80" r="1.5" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <circle cx="40" cy="80" r="1.5" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <!-- Legs -->
  <rect x="22" y="58" width="6" height="18" fill="#1e1e1e"/>
  <rect x="32" y="58" width="6" height="18" fill="#1e1e1e"/>
  <!-- Long duster coat -->
  <rect x="14" y="28" width="32" height="38" fill="#4a3728" rx="2"/>
  <!-- Coat flaps -->
  <path d="M 14,66 L 12,74 L 20,66" fill="#4a3728"/>
  <path d="M 46,66 L 48,74 L 40,66" fill="#4a3728"/>
  <!-- Vest -->
  <rect x="20" y="30" width="20" height="20" fill="#1e1e1e" rx="1"/>
  <!-- Bullet belt across chest -->
  <path d="M 18,34 L 42,50" stroke="#8b6914" stroke-width="3"/>
  <circle cx="22" cy="36" r="1" fill="#d4a017"/>
  <circle cx="26" cy="38" r="1" fill="#d4a017"/>
  <circle cx="30" cy="40" r="1" fill="#d4a017"/>
  <circle cx="34" cy="42" r="1" fill="#d4a017"/>
  <circle cx="38" cy="44" r="1" fill="#d4a017"/>
  <!-- Belt -->
  <rect x="16" y="52" width="28" height="4" fill="#5c2d0e" rx="1"/>
  <!-- Arms -->
  <path d="M 14,32 Q 4,42 6,52" stroke="#4a3728" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 46,32 Q 56,42 54,52" stroke="#4a3728" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Dual pistols -->
  <rect x="2" y="50" width="8" height="3" fill="#64748b" rx="1"/>
  <rect x="50" y="50" width="8" height="3" fill="#64748b" rx="1"/>
  <!-- Head -->
  <rect x="21" y="8" width="18" height="18" fill="#c4a882" rx="5"/>
  <!-- Stubble -->
  <rect x="24" y="20" width="12" height="4" fill="#a0845e" rx="2" opacity="0.3"/>
  <!-- Eyes -->
  <circle cx="26" cy="16" r="1.5" fill="#1e1e1e"/>
  <circle cx="34" cy="16" r="1.5" fill="#1e1e1e"/>
  <!-- Stern mouth -->
  <line x1="26" y1="22" x2="34" y2="22" stroke="#5c2d0e" stroke-width="1"/>
  <!-- Cowboy hat -->
  <rect x="10" y="7" width="40" height="3" fill="#3d2b1f" rx="1"/>
  <rect x="17" y="0" width="26" height="9" fill="#4a3728" rx="3"/>
</svg>`,

// 16. Rogue AI — floating holographic AI face/cube
mv_rogue_ai: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs>
    <linearGradient id="aiGrad1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient>
  </defs>
  <!-- Floating shadow -->
  <ellipse cx="30" cy="82" rx="10" ry="2" fill="rgba(6,182,212,0.2)"/>
  <!-- Data streams below -->
  <line x1="24" y1="72" x2="24" y2="80" stroke="#06b6d4" stroke-width="0.5" opacity="0.4"/>
  <line x1="30" y1="70" x2="30" y2="82" stroke="#06b6d4" stroke-width="0.5" opacity="0.4"/>
  <line x1="36" y1="72" x2="36" y2="80" stroke="#06b6d4" stroke-width="0.5" opacity="0.4"/>
  <!-- Cube body (isometric) -->
  <path d="M 30,18 L 50,30 L 50,60 L 30,72 L 10,60 L 10,30 Z" fill="none" stroke="url(#aiGrad1)" stroke-width="1.5" opacity="0.8"/>
  <!-- Cube top face -->
  <path d="M 30,18 L 50,30 L 30,42 L 10,30 Z" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" stroke-width="0.5"/>
  <!-- Cube left face -->
  <path d="M 10,30 L 30,42 L 30,72 L 10,60 Z" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" stroke-width="0.5"/>
  <!-- Cube right face -->
  <path d="M 50,30 L 30,42 L 30,72 L 50,60 Z" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" stroke-width="0.5"/>
  <!-- Digital face on front -->
  <!-- Eyes -->
  <rect x="18" y="46" width="6" height="3" fill="#dc2626" rx="1" opacity="0.9"/>
  <rect x="28" y="46" width="6" height="3" fill="#dc2626" rx="1" opacity="0.9"/>
  <!-- Mouth (digital) -->
  <line x1="20" y1="55" x2="24" y2="55" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="26" y1="55" x2="28" y2="55" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="30" y1="55" x2="32" y2="55" stroke="#dc2626" stroke-width="1.5"/>
  <!-- Holographic scan lines -->
  <line x1="12" y1="38" x2="48" y2="38" stroke="#06b6d4" stroke-width="0.3" opacity="0.3"/>
  <line x1="12" y1="50" x2="48" y2="50" stroke="#06b6d4" stroke-width="0.3" opacity="0.3"/>
  <line x1="12" y1="62" x2="48" y2="62" stroke="#06b6d4" stroke-width="0.3" opacity="0.3"/>
  <!-- Orbiting data points -->
  <circle cx="8" cy="40" r="2" fill="#06b6d4" opacity="0.6"/>
  <circle cx="52" cy="50" r="2" fill="#8b5cf6" opacity="0.6"/>
  <circle cx="30" cy="14" r="2" fill="#06b6d4" opacity="0.6"/>
  <!-- Connecting lines -->
  <line x1="8" y1="40" x2="14" y2="36" stroke="#06b6d4" stroke-width="0.5" opacity="0.4"/>
  <line x1="52" y1="50" x2="46" y2="46" stroke="#8b5cf6" stroke-width="0.5" opacity="0.4"/>
</svg>`,

// 17. Terminator — chrome robot skeleton, red eye
mv_terminator: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Chrome legs -->
  <rect x="20" y="60" width="8" height="18" fill="#94a3b8" stroke="#64748b" stroke-width="1" rx="1"/>
  <rect x="32" y="60" width="8" height="18" fill="#94a3b8" stroke="#64748b" stroke-width="1" rx="1"/>
  <!-- Piston details -->
  <line x1="24" y1="64" x2="24" y2="72" stroke="#cbd5e1" stroke-width="1.5"/>
  <line x1="36" y1="64" x2="36" y2="72" stroke="#cbd5e1" stroke-width="1.5"/>
  <!-- Feet -->
  <rect x="18" y="76" width="12" height="6" fill="#64748b" rx="2"/>
  <rect x="30" y="76" width="12" height="6" fill="#64748b" rx="2"/>
  <!-- Chrome skeleton torso -->
  <rect x="16" y="24" width="28" height="36" fill="#94a3b8" stroke="#64748b" stroke-width="1" rx="2"/>
  <!-- Ribcage lines -->
  <line x1="20" y1="30" x2="40" y2="30" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="20" y1="34" x2="40" y2="34" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="20" y1="38" x2="40" y2="38" stroke="#cbd5e1" stroke-width="1"/>
  <!-- Power core -->
  <circle cx="30" cy="46" r="5" fill="#64748b" stroke="#cbd5e1" stroke-width="1"/>
  <circle cx="30" cy="46" r="2" fill="#dc2626" opacity="0.8"/>
  <!-- Chrome arms -->
  <rect x="5" y="26" width="8" height="24" fill="#94a3b8" stroke="#64748b" stroke-width="1" rx="2"/>
  <rect x="47" y="26" width="8" height="24" fill="#94a3b8" stroke="#64748b" stroke-width="1" rx="2"/>
  <!-- Mechanical hands -->
  <path d="M 5,50 L 3,56 M 8,50 L 8,56 M 11,50 L 13,56" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <path d="M 49,50 L 47,56 M 52,50 L 52,56 M 55,50 L 57,56" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <!-- Chrome skull -->
  <rect x="18" y="4" width="24" height="20" fill="#94a3b8" stroke="#64748b" stroke-width="1" rx="5"/>
  <!-- Jaw -->
  <rect x="22" y="18" width="16" height="6" fill="#64748b" rx="2"/>
  <line x1="25" y1="20" x2="35" y2="20" stroke="#94a3b8" stroke-width="0.5" stroke-dasharray="2,1"/>
  <!-- Red eye (left) -->
  <circle cx="25" cy="12" r="3.5" fill="#0f172a"/>
  <circle cx="25" cy="12" r="2" fill="#dc2626"/>
  <circle cx="25" cy="12" r="0.8" fill="#fff" opacity="0.8"/>
  <!-- Dark eye (right) -->
  <circle cx="35" cy="12" r="3.5" fill="#0f172a"/>
  <circle cx="35" cy="12" r="1.5" fill="#dc2626" opacity="0.3"/>
  <!-- Nose cavity -->
  <path d="M 29,16 L 30,18 L 31,16" fill="#64748b"/>
  <!-- Chrome gleam -->
  <line x1="20" y1="6" x2="24" y2="10" stroke="#e2e8f0" stroke-width="0.5" opacity="0.6"/>
</svg>`,

// 18. Drone Swarm — cluster of small flying drones
mv_drone_swarm: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="82" rx="14" ry="2" fill="rgba(0,0,0,0.15)"/>
  <!-- Drone 1 (center, larger) -->
  <rect x="22" y="40" width="16" height="8" fill="#475569" stroke="#64748b" stroke-width="0.5" rx="2"/>
  <circle cx="30" cy="44" r="2" fill="#dc2626" opacity="0.7"/>
  <!-- Rotors -->
  <ellipse cx="20" cy="40" rx="6" ry="1.5" fill="#94a3b8" opacity="0.5"/>
  <ellipse cx="40" cy="40" rx="6" ry="1.5" fill="#94a3b8" opacity="0.5"/>
  <line x1="22" y1="42" x2="18" y2="40" stroke="#64748b" stroke-width="1"/>
  <line x1="38" y1="42" x2="42" y2="40" stroke="#64748b" stroke-width="1"/>

  <!-- Drone 2 (top-left, smaller) -->
  <rect x="8" y="24" width="12" height="6" fill="#475569" stroke="#64748b" stroke-width="0.5" rx="2"/>
  <circle cx="14" cy="27" r="1.5" fill="#dc2626" opacity="0.7"/>
  <ellipse cx="6" cy="24" rx="4" ry="1" fill="#94a3b8" opacity="0.5"/>
  <ellipse cx="22" cy="24" rx="4" ry="1" fill="#94a3b8" opacity="0.5"/>

  <!-- Drone 3 (top-right) -->
  <rect x="38" y="20" width="12" height="6" fill="#475569" stroke="#64748b" stroke-width="0.5" rx="2"/>
  <circle cx="44" cy="23" r="1.5" fill="#dc2626" opacity="0.7"/>
  <ellipse cx="36" cy="20" rx="4" ry="1" fill="#94a3b8" opacity="0.5"/>
  <ellipse cx="52" cy="20" rx="4" ry="1" fill="#94a3b8" opacity="0.5"/>

  <!-- Drone 4 (bottom-left) -->
  <rect x="6" y="56" width="12" height="6" fill="#475569" stroke="#64748b" stroke-width="0.5" rx="2"/>
  <circle cx="12" cy="59" r="1.5" fill="#dc2626" opacity="0.7"/>
  <ellipse cx="4" cy="56" rx="4" ry="1" fill="#94a3b8" opacity="0.5"/>
  <ellipse cx="20" cy="56" rx="4" ry="1" fill="#94a3b8" opacity="0.5"/>

  <!-- Drone 5 (bottom-right) -->
  <rect x="40" y="52" width="12" height="6" fill="#475569" stroke="#64748b" stroke-width="0.5" rx="2"/>
  <circle cx="46" cy="55" r="1.5" fill="#dc2626" opacity="0.7"/>
  <ellipse cx="38" cy="52" rx="4" ry="1" fill="#94a3b8" opacity="0.5"/>
  <ellipse cx="54" cy="52" rx="4" ry="1" fill="#94a3b8" opacity="0.5"/>

  <!-- Drone 6 (mid-top) -->
  <rect x="24" y="14" width="10" height="5" fill="#475569" stroke="#64748b" stroke-width="0.5" rx="2"/>
  <circle cx="29" cy="16" r="1" fill="#dc2626" opacity="0.7"/>
  <ellipse cx="22" cy="14" rx="3" ry="1" fill="#94a3b8" opacity="0.5"/>
  <ellipse cx="36" cy="14" rx="3" ry="1" fill="#94a3b8" opacity="0.5"/>

  <!-- Connection lines (mesh network) -->
  <line x1="14" y1="30" x2="26" y2="40" stroke="#06b6d4" stroke-width="0.3" opacity="0.4"/>
  <line x1="44" y1="26" x2="36" y2="40" stroke="#06b6d4" stroke-width="0.3" opacity="0.4"/>
  <line x1="12" y1="56" x2="24" y2="48" stroke="#06b6d4" stroke-width="0.3" opacity="0.4"/>
  <line x1="46" y1="52" x2="36" y2="48" stroke="#06b6d4" stroke-width="0.3" opacity="0.4"/>
  <line x1="29" y1="19" x2="29" y2="40" stroke="#06b6d4" stroke-width="0.3" opacity="0.4"/>
</svg>`,

// 19. Raptor — velociraptor dinosaur, green/brown scales
mv_raptor: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
  <!-- Tail (horizontal balance) -->
  <path d="M 34,52 Q 46,48 56,44 L 58,42 L 56,46 Q 46,50 34,54" fill="#4d7c0f" stroke="#365314" stroke-width="0.5"/>
  <!-- Hind legs (powerful) -->
  <path d="M 24,62 Q 20,72 18,76 Q 16,80 22,80" stroke="#4d7c0f" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 32,62 Q 34,72 36,76 Q 38,80 32,80" stroke="#4d7c0f" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Sickle claws -->
  <path d="M 20,80 L 16,76 L 18,80" fill="#78350f"/>
  <path d="M 34,80 L 38,76 L 36,80" fill="#78350f"/>
  <!-- Toe claws -->
  <path d="M 22,80 L 24,82 M 20,80 L 18,82" stroke="#78350f" stroke-width="1"/>
  <path d="M 32,80 L 30,82 M 34,80 L 36,82" stroke="#78350f" stroke-width="1"/>
  <!-- Body -->
  <ellipse cx="28" cy="50" rx="12" ry="16" fill="#4d7c0f" stroke="#365314" stroke-width="1"/>
  <!-- Belly -->
  <ellipse cx="28" cy="54" rx="8" ry="10" fill="#a3e635" opacity="0.3"/>
  <!-- Small arms -->
  <path d="M 20,42 Q 14,46 12,44 L 10,42" stroke="#4d7c0f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M 24,40 Q 18,42 16,38 L 14,36" stroke="#4d7c0f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Neck -->
  <path d="M 22,38 Q 18,28 20,20" stroke="#4d7c0f" stroke-width="7" fill="none"/>
  <!-- Head -->
  <ellipse cx="18" cy="18" rx="10" ry="7" fill="#4d7c0f" stroke="#365314" stroke-width="0.5"/>
  <!-- Snout -->
  <ellipse cx="10" cy="18" rx="6" ry="4" fill="#365314"/>
  <!-- Eye -->
  <circle cx="20" cy="15" r="3" fill="#fbbf24"/>
  <circle cx="20" cy="15" r="1.5" fill="#0f172a"/>
  <!-- Nostril -->
  <circle cx="6" cy="17" r="1" fill="#1a3a1a"/>
  <!-- Teeth -->
  <path d="M 6,20 L 7,23 L 8,20 L 9,23 L 10,20 L 11,23 L 12,20 L 13,23 L 14,20" fill="#f5f5f4" stroke="#e5e5dc" stroke-width="0.3"/>
  <!-- Scale pattern -->
  <circle cx="28" cy="44" r="1" fill="#365314" opacity="0.4"/>
  <circle cx="32" cy="48" r="1" fill="#365314" opacity="0.4"/>
  <circle cx="26" cy="52" r="1" fill="#365314" opacity="0.4"/>
</svg>`,

// 20. Compys — pack of tiny dinosaurs clustered together
mv_compys: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="85" rx="16" ry="3" fill="rgba(0,0,0,0.2)"/>
  <!-- Compy 1 (center front) -->
  <path d="M 30,68 Q 34,64 38,66" stroke="#4d7c0f" stroke-width="1.5" fill="none"/>
  <ellipse cx="28" cy="66" rx="5" ry="4" fill="#4d7c0f"/>
  <path d="M 24,62 Q 22,58 24,56" stroke="#4d7c0f" stroke-width="2" fill="none"/>
  <ellipse cx="24" cy="54" rx="4" ry="3" fill="#4d7c0f"/>
  <circle cx="22" cy="53" r="1.5" fill="#fbbf24"/>
  <circle cx="22" cy="53" r="0.7" fill="#111"/>
  <path d="M 20,55 L 21,57 L 22,55" fill="#f5f5f4"/>
  <path d="M 26,70 L 24,78 M 30,70 L 32,78" stroke="#4d7c0f" stroke-width="1.5"/>

  <!-- Compy 2 (left) -->
  <path d="M 14,72 Q 18,68 22,70" stroke="#365314" stroke-width="1.5" fill="none"/>
  <ellipse cx="12" cy="70" rx="5" ry="4" fill="#365314"/>
  <path d="M 8,66 Q 6,62 8,58" stroke="#365314" stroke-width="2" fill="none"/>
  <ellipse cx="8" cy="56" rx="4" ry="3" fill="#365314"/>
  <circle cx="6" cy="55" r="1.5" fill="#fbbf24"/>
  <circle cx="6" cy="55" r="0.7" fill="#111"/>
  <path d="M 5,57 L 6,59 L 7,57" fill="#f5f5f4"/>
  <path d="M 10,74 L 8,80 M 14,74 L 16,80" stroke="#365314" stroke-width="1.5"/>

  <!-- Compy 3 (right) -->
  <path d="M 44,70 Q 48,66 52,68" stroke="#3f6212" stroke-width="1.5" fill="none"/>
  <ellipse cx="42" cy="68" rx="5" ry="4" fill="#3f6212"/>
  <path d="M 38,64 Q 40,60 42,56" stroke="#3f6212" stroke-width="2" fill="none"/>
  <ellipse cx="42" cy="54" rx="4" ry="3" fill="#3f6212"/>
  <circle cx="44" cy="53" r="1.5" fill="#fbbf24"/>
  <circle cx="44" cy="53" r="0.7" fill="#111"/>
  <path d="M 43,55 L 44,57 L 45,55" fill="#f5f5f4"/>
  <path d="M 40,72 L 38,80 M 44,72 L 46,80" stroke="#3f6212" stroke-width="1.5"/>

  <!-- Compy 4 (back left) -->
  <ellipse cx="18" cy="60" rx="4" ry="3" fill="#4d7c0f" opacity="0.7"/>
  <path d="M 16,56 Q 14,52 16,48" stroke="#4d7c0f" stroke-width="1.5" fill="none" opacity="0.7"/>
  <circle cx="16" cy="47" r="2.5" fill="#4d7c0f" opacity="0.7"/>
  <circle cx="14" cy="46" r="1" fill="#fbbf24" opacity="0.7"/>

  <!-- Compy 5 (back right) -->
  <ellipse cx="38" cy="58" rx="4" ry="3" fill="#365314" opacity="0.7"/>
  <path d="M 40,54 Q 42,50 40,46" stroke="#365314" stroke-width="1.5" fill="none" opacity="0.7"/>
  <circle cx="40" cy="45" r="2.5" fill="#365314" opacity="0.7"/>
  <circle cx="42" cy="44" r="1" fill="#fbbf24" opacity="0.7"/>
</svg>`,

// 21. Electric Eel — glowing electric eel, underwater blue
mv_electric_eel: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs>
    <linearGradient id="eelGrad1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#0ea5e9"/><stop offset="50%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#0284c7"/></linearGradient>
  </defs>
  <!-- Water shimmer bg -->
  <ellipse cx="30" cy="50" rx="28" ry="38" fill="rgba(14,165,233,0.08)"/>
  <!-- Eel body (sinusoidal) -->
  <path d="M 10,30 Q 20,20 30,30 Q 40,40 50,30 Q 55,25 55,35 Q 55,45 50,50 Q 40,60 30,50 Q 20,40 10,50 Q 5,55 5,65 Q 5,72 10,74" stroke="url(#eelGrad1)" stroke-width="8" fill="none" stroke-linecap="round"/>
  <!-- Belly stripe -->
  <path d="M 10,30 Q 20,20 30,30 Q 40,40 50,30" stroke="#7dd3fc" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M 50,50 Q 40,60 30,50 Q 20,40 10,50" stroke="#7dd3fc" stroke-width="2" fill="none" opacity="0.5"/>
  <!-- Head -->
  <ellipse cx="10" cy="28" rx="6" ry="5" fill="#0ea5e9" stroke="#0284c7" stroke-width="0.5"/>
  <!-- Eye -->
  <circle cx="8" cy="26" r="2" fill="#fbbf24"/>
  <circle cx="8" cy="26" r="1" fill="#0f172a"/>
  <!-- Mouth -->
  <path d="M 5,30 L 4,31 L 6,31" fill="#0f172a"/>
  <!-- Tail fin -->
  <path d="M 10,74 Q 14,78 12,82 Q 8,80 6,84 Q 4,80 10,74" fill="#06b6d4" opacity="0.8"/>
  <!-- Electric sparks -->
  <path d="M 22,22 L 18,18 L 24,16" stroke="#fbbf24" stroke-width="1" fill="none" opacity="0.8"/>
  <path d="M 42,34 L 46,30 L 40,28" stroke="#fbbf24" stroke-width="1" fill="none" opacity="0.8"/>
  <path d="M 18,46 L 14,42 L 20,40" stroke="#fbbf24" stroke-width="1" fill="none" opacity="0.8"/>
  <path d="M 42,54 L 46,50 L 40,48" stroke="#fbbf24" stroke-width="1" fill="none" opacity="0.8"/>
  <!-- Electricity arcs -->
  <circle cx="20" cy="20" r="3" fill="rgba(251,191,36,0.2)"/>
  <circle cx="44" cy="32" r="3" fill="rgba(251,191,36,0.2)"/>
  <!-- Gill lines -->
  <line x1="14" y1="26" x2="16" y2="28" stroke="#0284c7" stroke-width="0.5"/>
  <line x1="14" y1="28" x2="16" y2="30" stroke="#0284c7" stroke-width="0.5"/>
</svg>`,

// 22. Shark Drone — mechanical shark with fins and propeller
mv_shark_drone: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <ellipse cx="30" cy="82" rx="12" ry="2" fill="rgba(0,0,0,0.2)"/>
  <!-- Body -->
  <ellipse cx="30" cy="44" rx="10" ry="24" fill="#475569" stroke="#334155" stroke-width="1"/>
  <!-- Belly -->
  <ellipse cx="30" cy="50" rx="6" ry="16" fill="#94a3b8" opacity="0.5"/>
  <!-- Snout (pointed front/top) -->
  <path d="M 24,20 Q 30,8 36,20" fill="#475569" stroke="#334155" stroke-width="0.5"/>
  <!-- Mechanical eye -->
  <circle cx="24" cy="30" r="3" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
  <circle cx="24" cy="30" r="1.5" fill="#dc2626"/>
  <circle cx="36" cy="30" r="3" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
  <circle cx="36" cy="30" r="1.5" fill="#dc2626"/>
  <!-- Dorsal fin -->
  <path d="M 30,26 L 32,14 L 34,26" fill="#334155" stroke="#1e293b" stroke-width="0.5"/>
  <!-- Side fins -->
  <path d="M 20,40 L 6,36 L 8,42 L 20,44" fill="#475569" stroke="#334155" stroke-width="0.5"/>
  <path d="M 40,40 L 54,36 L 52,42 L 40,44" fill="#475569" stroke="#334155" stroke-width="0.5"/>
  <!-- Mechanical jaw -->
  <path d="M 22,36 Q 30,42 38,36" fill="none" stroke="#1e293b" stroke-width="1"/>
  <path d="M 24,36 L 25,38 L 26,36 L 27,38 L 28,36 L 29,38 L 30,36 L 31,38 L 32,36 L 33,38 L 34,36" fill="#e5e5dc"/>
  <!-- Rear section (mechanical) -->
  <rect x="24" y="58" width="12" height="8" fill="#334155" stroke="#475569" stroke-width="0.5" rx="1"/>
  <!-- Panel rivets -->
  <circle cx="26" cy="62" r="0.8" fill="#94a3b8"/>
  <circle cx="30" cy="62" r="0.8" fill="#94a3b8"/>
  <circle cx="34" cy="62" r="0.8" fill="#94a3b8"/>
  <!-- Propeller -->
  <circle cx="30" cy="70" r="2" fill="#475569" stroke="#64748b" stroke-width="0.5"/>
  <path d="M 28,70 L 20,74 L 22,68 Z" fill="#94a3b8" opacity="0.6"/>
  <path d="M 32,70 L 40,74 L 38,68 Z" fill="#94a3b8" opacity="0.6"/>
  <path d="M 30,68 L 26,62 L 34,62 Z" fill="#94a3b8" opacity="0.6"/>
  <!-- Tail fin -->
  <path d="M 28,66 L 22,76 L 30,70 L 38,76 L 32,66" fill="#334155"/>
</svg>`,

// 23. Cyber Ninja — neon-lit ninja with visor and katana
mv_cyber_ninja: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><linearGradient id="neonGrad1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs>
  <ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Legs -->
  <rect x="22" y="62" width="6" height="16" fill="#0f172a" rx="1"/>
  <rect x="32" y="62" width="6" height="16" fill="#0f172a" rx="1"/>
  <!-- Neon leg strips -->
  <line x1="25" y1="64" x2="25" y2="76" stroke="#06b6d4" stroke-width="0.8" opacity="0.7"/>
  <line x1="35" y1="64" x2="35" y2="76" stroke="#06b6d4" stroke-width="0.8" opacity="0.7"/>
  <!-- Boots -->
  <rect x="20" y="76" width="9" height="5" fill="#1e293b" rx="2"/>
  <rect x="31" y="76" width="9" height="5" fill="#1e293b" rx="2"/>
  <!-- Suit body -->
  <rect x="16" y="28" width="28" height="34" fill="#0f172a" rx="2"/>
  <!-- Neon chest lines -->
  <path d="M 20,30 L 30,42 L 40,30" fill="none" stroke="#06b6d4" stroke-width="1" opacity="0.8"/>
  <path d="M 22,32 L 30,40 L 38,32" fill="none" stroke="#8b5cf6" stroke-width="0.5" opacity="0.5"/>
  <!-- Neon belt -->
  <rect x="16" y="56" width="28" height="3" fill="none" stroke="url(#neonGrad1)" stroke-width="1"/>
  <!-- Arms -->
  <path d="M 16,32 Q 6,42 8,52" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 44,32 Q 52,36 54,44" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Neon arm strips -->
  <path d="M 14,34 Q 6,42 8,50" stroke="#06b6d4" stroke-width="0.8" fill="none" opacity="0.6"/>
  <path d="M 46,34 Q 52,38 54,44" stroke="#06b6d4" stroke-width="0.8" fill="none" opacity="0.6"/>
  <!-- Katana -->
  <line x1="54" y1="44" x2="46" y2="4" stroke="#e2e8f0" stroke-width="2"/>
  <line x1="54" y1="44" x2="46" y2="4" stroke="#06b6d4" stroke-width="0.5" opacity="0.5"/>
  <rect x="52" y="43" width="6" height="3" fill="#d4a017" rx="0.5"/>
  <!-- Head -->
  <rect x="20" y="6" width="20" height="20" fill="#0f172a" rx="5"/>
  <!-- Visor -->
  <rect x="20" y="12" width="20" height="5" fill="#06b6d4" rx="2" opacity="0.8"/>
  <rect x="20" y="12" width="20" height="5" fill="none" stroke="#0ea5e9" stroke-width="0.5" rx="2"/>
  <!-- Mask lower -->
  <rect x="22" y="20" width="16" height="4" fill="#1e293b" rx="1"/>
  <line x1="24" y1="22" x2="28" y2="22" stroke="#334155" stroke-width="0.5"/>
  <line x1="32" y1="22" x2="36" y2="22" stroke="#334155" stroke-width="0.5"/>
</svg>`,

// 24. Hoverbike Rider — rider on a neon-glowing hoverbike
mv_hoverbike: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <!-- Hover glow -->
  <ellipse cx="30" cy="78" rx="22" ry="4" fill="rgba(6,182,212,0.3)"/>
  <ellipse cx="30" cy="78" rx="16" ry="2" fill="rgba(6,182,212,0.5)"/>
  <!-- Bike body -->
  <path d="M 6,64 Q 10,58 20,58 L 46,56 Q 56,56 56,62 L 56,68 Q 56,72 46,72 L 14,72 Q 6,72 6,64 Z" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <!-- Neon trim -->
  <path d="M 8,68 Q 10,72 20,72 L 46,72 Q 54,72 54,68" fill="none" stroke="#06b6d4" stroke-width="1.5" opacity="0.8"/>
  <!-- Bike nose -->
  <path d="M 46,56 Q 58,54 60,60 L 56,62" fill="#334155" stroke="#475569" stroke-width="0.5"/>
  <!-- Headlight -->
  <circle cx="58" cy="60" r="2" fill="#fbbf24" opacity="0.8"/>
  <!-- Engine glow -->
  <circle cx="14" cy="66" r="4" fill="rgba(6,182,212,0.4)"/>
  <circle cx="14" cy="66" r="2" fill="#06b6d4" opacity="0.7"/>
  <!-- Handlebars -->
  <line x1="38" y1="56" x2="42" y2="48" stroke="#64748b" stroke-width="2"/>
  <line x1="42" y1="48" x2="46" y2="46" stroke="#64748b" stroke-width="2"/>
  <line x1="42" y1="48" x2="38" y2="46" stroke="#64748b" stroke-width="2"/>
  <!-- Rider legs on bike -->
  <path d="M 24,56 Q 22,54 24,52" stroke="#1e1e1e" stroke-width="4" fill="none"/>
  <path d="M 32,56 Q 34,54 32,52" stroke="#1e1e1e" stroke-width="4" fill="none"/>
  <!-- Rider body -->
  <rect x="22" y="32" width="16" height="22" fill="#1e1e1e" rx="2"/>
  <!-- Neon jacket stripe -->
  <line x1="24" y1="34" x2="24" y2="50" stroke="#06b6d4" stroke-width="0.8" opacity="0.7"/>
  <line x1="36" y1="34" x2="36" y2="50" stroke="#06b6d4" stroke-width="0.8" opacity="0.7"/>
  <!-- Arms reaching forward -->
  <path d="M 36,36 Q 42,40 42,48" stroke="#1e1e1e" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 24,36 Q 36,44 38,48" stroke="#1e1e1e" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Helmet -->
  <rect x="22" y="12" width="16" height="20" fill="#0f172a" rx="6"/>
  <!-- Visor -->
  <rect x="24" y="18" width="12" height="6" fill="#06b6d4" rx="2" opacity="0.7"/>
</svg>`,

// 25. Alien Warship — small alien spacecraft with guns
mv_alien_warship: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <!-- Shadow -->
  <ellipse cx="30" cy="80" rx="14" ry="3" fill="rgba(0,0,0,0.2)"/>
  <!-- Engine glow -->
  <ellipse cx="30" cy="64" rx="8" ry="4" fill="rgba(139,92,246,0.4)"/>
  <ellipse cx="30" cy="64" rx="4" ry="2" fill="rgba(139,92,246,0.7)"/>
  <!-- Main hull -->
  <ellipse cx="30" cy="42" rx="20" ry="10" fill="#475569" stroke="#334155" stroke-width="1"/>
  <!-- Dome cockpit -->
  <ellipse cx="30" cy="38" rx="10" ry="8" fill="#1e293b" stroke="#334155" stroke-width="0.5"/>
  <ellipse cx="30" cy="36" rx="7" ry="5" fill="rgba(139,92,246,0.3)"/>
  <!-- Alien eye in cockpit -->
  <circle cx="30" cy="36" r="3" fill="#a855f7" opacity="0.8"/>
  <circle cx="30" cy="36" r="1.5" fill="#0f172a"/>
  <!-- Hull panels -->
  <line x1="14" y1="42" x2="46" y2="42" stroke="#64748b" stroke-width="0.5"/>
  <line x1="20" y1="36" x2="20" y2="48" stroke="#64748b" stroke-width="0.3"/>
  <line x1="40" y1="36" x2="40" y2="48" stroke="#64748b" stroke-width="0.3"/>
  <!-- Gun pods (left) -->
  <rect x="4" y="40" width="10" height="4" fill="#334155" rx="1"/>
  <rect x="0" y="41" width="5" height="2" fill="#64748b" rx="0.5"/>
  <circle cx="1" cy="42" r="1" fill="#dc2626" opacity="0.7"/>
  <!-- Gun pods (right) -->
  <rect x="46" y="40" width="10" height="4" fill="#334155" rx="1"/>
  <rect x="55" y="41" width="5" height="2" fill="#64748b" rx="0.5"/>
  <circle cx="59" cy="42" r="1" fill="#dc2626" opacity="0.7"/>
  <!-- Wing fins -->
  <path d="M 10,42 L 2,28 L 6,32 L 12,38" fill="#334155" stroke="#475569" stroke-width="0.5"/>
  <path d="M 50,42 L 58,28 L 54,32 L 48,38" fill="#334155" stroke="#475569" stroke-width="0.5"/>
  <!-- Underbelly -->
  <ellipse cx="30" cy="48" rx="12" ry="4" fill="#334155"/>
  <!-- Bottom lights -->
  <circle cx="24" cy="48" r="1" fill="#06b6d4" opacity="0.7"/>
  <circle cx="30" cy="50" r="1" fill="#06b6d4" opacity="0.7"/>
  <circle cx="36" cy="48" r="1" fill="#06b6d4" opacity="0.7"/>
  <!-- Engine trails -->
  <path d="M 24,54 L 22,70" stroke="#8b5cf6" stroke-width="1" opacity="0.4"/>
  <path d="M 30,54 L 30,72" stroke="#8b5cf6" stroke-width="1.5" opacity="0.4"/>
  <path d="M 36,54 L 38,70" stroke="#8b5cf6" stroke-width="1" opacity="0.4"/>
</svg>`,

// 26. Void Creature — dark tentacled void horror
mv_void_creature: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="voidAura1"><stop offset="0%" stop-color="rgba(88,28,135,0.6)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <!-- Void aura -->
  <ellipse cx="30" cy="50" rx="28" ry="38" fill="url(#voidAura1)"/>
  <ellipse cx="30" cy="85" rx="10" ry="2" fill="rgba(88,28,135,0.3)"/>
  <!-- Tentacles -->
  <path d="M 20,60 Q 10,70 6,80 Q 4,84 8,82" stroke="#3b0764" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 24,62 Q 16,72 14,82 Q 12,86 16,84" stroke="#4c1d95" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M 40,60 Q 50,70 54,80 Q 56,84 52,82" stroke="#3b0764" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 36,62 Q 44,72 46,82 Q 48,86 44,84" stroke="#4c1d95" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M 28,64 Q 24,76 26,84" stroke="#581c87" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 32,64 Q 36,76 34,84" stroke="#581c87" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Main body mass -->
  <ellipse cx="30" cy="44" rx="16" ry="20" fill="#3b0764" stroke="#581c87" stroke-width="1"/>
  <!-- Dark swirl patterns -->
  <path d="M 22,38 Q 26,34 30,38 Q 34,42 38,38" fill="none" stroke="#6b21a8" stroke-width="1" opacity="0.5"/>
  <path d="M 20,48 Q 26,44 30,48 Q 34,52 40,48" fill="none" stroke="#6b21a8" stroke-width="1" opacity="0.5"/>
  <!-- Central eye -->
  <ellipse cx="30" cy="36" rx="8" ry="6" fill="#1e1b4b" stroke="#6b21a8" stroke-width="1"/>
  <ellipse cx="30" cy="36" rx="5" ry="4" fill="#dc2626"/>
  <ellipse cx="30" cy="36" rx="2" ry="3" fill="#0f172a"/>
  <circle cx="29" cy="34" r="1" fill="#fff" opacity="0.4"/>
  <!-- Secondary eyes -->
  <circle cx="20" cy="30" r="3" fill="#1e1b4b" stroke="#6b21a8" stroke-width="0.5"/>
  <circle cx="20" cy="30" r="1.5" fill="#a855f7"/>
  <circle cx="40" cy="30" r="3" fill="#1e1b4b" stroke="#6b21a8" stroke-width="0.5"/>
  <circle cx="40" cy="30" r="1.5" fill="#a855f7"/>
  <!-- Void particles -->
  <circle cx="12" cy="40" r="1" fill="#a855f7" opacity="0.5"/>
  <circle cx="48" cy="44" r="1" fill="#a855f7" opacity="0.5"/>
  <circle cx="16" cy="56" r="1" fill="#c084fc" opacity="0.4"/>
  <circle cx="44" cy="52" r="1" fill="#c084fc" opacity="0.4"/>
</svg>`,

// 27. Reality Fragment — glowing reality fragment/shard, crystalline
mv_reality_frag: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs>
    <linearGradient id="crystalGrad1" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#e0f2fe"/><stop offset="50%" stop-color="#7dd3fc"/><stop offset="100%" stop-color="#38bdf8"/></linearGradient>
    <radialGradient id="crystalGlow1"><stop offset="0%" stop-color="rgba(56,189,248,0.5)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
  </defs>
  <!-- Glow -->
  <ellipse cx="30" cy="50" rx="24" ry="32" fill="url(#crystalGlow1)"/>
  <ellipse cx="30" cy="82" rx="8" ry="2" fill="rgba(56,189,248,0.2)"/>
  <!-- Main crystal shard -->
  <path d="M 30,10 L 42,35 L 38,70 L 30,78 L 22,70 L 18,35 Z" fill="url(#crystalGrad1)" stroke="#0ea5e9" stroke-width="1" opacity="0.9"/>
  <!-- Facet lines -->
  <line x1="30" y1="10" x2="30" y2="78" stroke="#bae6fd" stroke-width="0.5" opacity="0.6"/>
  <line x1="18" y1="35" x2="42" y2="35" stroke="#bae6fd" stroke-width="0.5" opacity="0.6"/>
  <line x1="22" y1="70" x2="38" y2="70" stroke="#bae6fd" stroke-width="0.5" opacity="0.6"/>
  <!-- Light face -->
  <path d="M 30,10 L 42,35 L 30,40 Z" fill="#e0f2fe" opacity="0.4"/>
  <!-- Dark face -->
  <path d="M 30,10 L 18,35 L 30,40 Z" fill="#0284c7" opacity="0.2"/>
  <!-- Internal glow -->
  <ellipse cx="30" cy="42" rx="6" ry="8" fill="rgba(255,255,255,0.3)"/>
  <!-- Smaller floating shards -->
  <path d="M 8,30 L 12,22 L 16,30 L 12,36 Z" fill="#7dd3fc" stroke="#0ea5e9" stroke-width="0.5" opacity="0.7"/>
  <path d="M 44,26 L 48,18 L 52,26 L 48,32 Z" fill="#7dd3fc" stroke="#0ea5e9" stroke-width="0.5" opacity="0.7"/>
  <path d="M 6,54 L 10,48 L 14,54 L 10,58 Z" fill="#bae6fd" stroke="#0ea5e9" stroke-width="0.5" opacity="0.5"/>
  <path d="M 46,50 L 50,44 L 54,50 L 50,56 Z" fill="#bae6fd" stroke="#0ea5e9" stroke-width="0.5" opacity="0.5"/>
  <!-- Sparkle effects -->
  <circle cx="30" cy="24" r="1.5" fill="#fff" opacity="0.8"/>
  <circle cx="24" cy="50" r="1" fill="#fff" opacity="0.6"/>
  <circle cx="36" cy="56" r="1" fill="#fff" opacity="0.6"/>
  <!-- Energy lines connecting shards -->
  <line x1="12" y1="30" x2="20" y2="35" stroke="#38bdf8" stroke-width="0.5" opacity="0.4"/>
  <line x1="48" y1="26" x2="40" y2="35" stroke="#38bdf8" stroke-width="0.5" opacity="0.4"/>
</svg>`,

// ===================== BOSSES (12) =====================

// BOSS 1. Mirror Dean — evil mirror Dean with goatee and dark suit
mv_mirror_dean: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="bossGlow1"><stop offset="0%" stop-color="rgba(220,38,38,0.3)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <!-- Boss glow -->
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow1)"/>
  <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Legs -->
  <rect x="22" y="64" width="7" height="16" fill="#0f172a"/>
  <rect x="31" y="64" width="7" height="16" fill="#0f172a"/>
  <!-- Polished shoes -->
  <rect x="20" y="78" width="10" height="4" fill="#111" rx="2"/>
  <rect x="30" y="78" width="10" height="4" fill="#111" rx="2"/>
  <!-- Dark suit -->
  <rect x="15" y="28" width="30" height="36" fill="#0f172a" rx="2"/>
  <!-- Dark shirt -->
  <rect x="22" y="30" width="16" height="24" fill="#1e1e1e"/>
  <!-- Evil red tie -->
  <path d="M 30,30 L 27,38 L 30,62 L 33,38 Z" fill="#dc2626"/>
  <!-- Lapels -->
  <path d="M 22,30 L 15,28 L 22,50" fill="#1e293b"/>
  <path d="M 38,30 L 45,28 L 38,50" fill="#1e293b"/>
  <!-- Arms -->
  <path d="M 15,32 Q 6,42 10,54" stroke="#0f172a" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M 45,32 Q 54,42 50,54" stroke="#0f172a" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Hands -->
  <circle cx="10" cy="54" r="3" fill="#dbc4a0"/>
  <circle cx="50" cy="54" r="3" fill="#dbc4a0"/>
  <!-- Head -->
  <rect x="20" y="6" width="20" height="22" fill="#dbc4a0" rx="6"/>
  <!-- Evil goatee -->
  <path d="M 26,24 Q 30,30 34,24" fill="#1e1e1e"/>
  <rect x="28" y="22" width="4" height="4" fill="#1e1e1e" rx="1"/>
  <!-- Mustache -->
  <path d="M 25,20 Q 28,22 30,20 Q 32,22 35,20" fill="#1e1e1e"/>
  <!-- Narrowed eyes -->
  <path d="M 23,14 L 28,14" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round"/>
  <path d="M 32,14 L 37,14" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round"/>
  <circle cx="25" cy="14" r="1" fill="#4a0000"/>
  <circle cx="35" cy="14" r="1" fill="#4a0000"/>
  <!-- Evil eyebrows -->
  <line x1="22" y1="11" x2="28" y2="12" stroke="#1e1e1e" stroke-width="1.5"/>
  <line x1="38" y1="11" x2="32" y2="12" stroke="#1e1e1e" stroke-width="1.5"/>
  <!-- Slicked dark hair -->
  <path d="M 18,10 C 18,2 42,2 42,10 L 40,6 L 20,6 Z" fill="#1e1e1e"/>
  <!-- Boss aura sparkles -->
  <circle cx="8" cy="20" r="1" fill="#dc2626" opacity="0.6"/>
  <circle cx="52" cy="24" r="1" fill="#dc2626" opacity="0.6"/>
  <circle cx="12" cy="60" r="1" fill="#dc2626" opacity="0.4"/>
</svg>`,

// BOSS 2. Clockmaster — grand clockwork being with massive gears
mv_clockmaster: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="bossGlow2"><stop offset="0%" stop-color="rgba(212,160,23,0.3)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow2)"/>
  <ellipse cx="30" cy="86" rx="16" ry="4" fill="rgba(0,0,0,0.4)"/>
  <!-- Massive gear behind (background) -->
  <circle cx="30" cy="42" r="28" fill="none" stroke="#8b6914" stroke-width="2" opacity="0.3"/>
  <circle cx="30" cy="42" r="24" fill="none" stroke="#b8860b" stroke-width="1" opacity="0.3"/>
  <!-- Gear teeth (outer ring) -->
  <path d="M 30,14 L 32,10 L 28,10 Z" fill="#b8860b" opacity="0.4"/>
  <path d="M 58,42 L 62,44 L 62,40 Z" fill="#b8860b" opacity="0.4"/>
  <path d="M 30,70 L 28,74 L 32,74 Z" fill="#b8860b" opacity="0.4"/>
  <path d="M 2,42 L -2,40 L -2,44 Z" fill="#b8860b" opacity="0.4"/>
  <!-- Legs -->
  <rect x="18" y="64" width="10" height="16" fill="#b8860b" stroke="#8b6914" stroke-width="0.5" rx="2"/>
  <rect x="32" y="64" width="10" height="16" fill="#b8860b" stroke="#8b6914" stroke-width="0.5" rx="2"/>
  <!-- Gear knee caps -->
  <circle cx="23" cy="68" r="3" fill="#d4a017" stroke="#8b6914" stroke-width="1"/>
  <circle cx="37" cy="68" r="3" fill="#d4a017" stroke="#8b6914" stroke-width="1"/>
  <!-- Feet -->
  <rect x="16" y="78" width="14" height="6" fill="#8b6914" rx="3"/>
  <rect x="30" y="78" width="14" height="6" fill="#8b6914" rx="3"/>
  <!-- Grand torso -->
  <rect x="12" y="24" width="36" height="40" fill="#b8860b" stroke="#8b6914" stroke-width="1" rx="4"/>
  <!-- Clock face on chest -->
  <circle cx="30" cy="42" r="12" fill="#3d2b1f" stroke="#d4a017" stroke-width="2"/>
  <circle cx="30" cy="42" r="10" fill="#1e1b18" stroke="#d4a017" stroke-width="0.5"/>
  <!-- Clock hands -->
  <line x1="30" y1="42" x2="30" y2="34" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="30" y1="42" x2="36" y2="40" stroke="#d4a017" stroke-width="1"/>
  <circle cx="30" cy="42" r="1.5" fill="#d4a017"/>
  <!-- Hour markers -->
  <circle cx="30" cy="33" r="0.8" fill="#fbbf24"/>
  <circle cx="39" cy="42" r="0.8" fill="#fbbf24"/>
  <circle cx="30" cy="51" r="0.8" fill="#fbbf24"/>
  <circle cx="21" cy="42" r="0.8" fill="#fbbf24"/>
  <!-- Massive arms -->
  <rect x="1" y="26" width="10" height="26" fill="#b8860b" stroke="#8b6914" stroke-width="0.5" rx="3"/>
  <rect x="49" y="26" width="10" height="26" fill="#b8860b" stroke="#8b6914" stroke-width="0.5" rx="3"/>
  <!-- Gear shoulder pads -->
  <circle cx="8" cy="26" r="6" fill="#d4a017" stroke="#8b6914" stroke-width="1"/>
  <circle cx="52" cy="26" r="6" fill="#d4a017" stroke="#8b6914" stroke-width="1"/>
  <circle cx="8" cy="26" r="2" fill="#8b6914"/>
  <circle cx="52" cy="26" r="2" fill="#8b6914"/>
  <!-- Grand head -->
  <rect x="18" y="2" width="24" height="22" fill="#b8860b" stroke="#8b6914" stroke-width="1" rx="5"/>
  <!-- Crown of gears -->
  <circle cx="22" cy="4" r="4" fill="none" stroke="#d4a017" stroke-width="1"/>
  <circle cx="30" cy="2" r="4" fill="none" stroke="#d4a017" stroke-width="1"/>
  <circle cx="38" cy="4" r="4" fill="none" stroke="#d4a017" stroke-width="1"/>
  <circle cx="22" cy="4" r="1.5" fill="#fbbf24"/>
  <circle cx="30" cy="2" r="1.5" fill="#fbbf24"/>
  <circle cx="38" cy="4" r="1.5" fill="#fbbf24"/>
  <!-- Lens eyes -->
  <circle cx="25" cy="12" r="4" fill="#3d2b1f" stroke="#d4a017" stroke-width="1"/>
  <circle cx="35" cy="12" r="4" fill="#3d2b1f" stroke="#d4a017" stroke-width="1"/>
  <circle cx="25" cy="12" r="2" fill="#fbbf24"/>
  <circle cx="35" cy="12" r="2" fill="#fbbf24"/>
</svg>`,

// BOSS 3. Zombie King — zombie king with crown and throne
mv_zombie_king: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="bossGlow3"><stop offset="0%" stop-color="rgba(74,222,128,0.25)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow3)"/>
  <ellipse cx="30" cy="86" rx="16" ry="4" fill="rgba(0,0,0,0.4)"/>
  <!-- Throne back -->
  <rect x="8" y="14" width="44" height="50" fill="#4a3728" stroke="#3d2b1f" stroke-width="1" rx="3"/>
  <rect x="10" y="16" width="40" height="4" fill="#5c4033" rx="1"/>
  <!-- Throne sides -->
  <rect x="6" y="14" width="6" height="54" fill="#5c4033" stroke="#3d2b1f" stroke-width="0.5" rx="2"/>
  <rect x="48" y="14" width="6" height="54" fill="#5c4033" stroke="#3d2b1f" stroke-width="0.5" rx="2"/>
  <!-- Skull ornaments on throne -->
  <circle cx="9" cy="18" r="3" fill="#e5e5dc"/>
  <circle cx="8" cy="17" r="0.8" fill="#333"/>
  <circle cx="10" cy="17" r="0.8" fill="#333"/>
  <circle cx="51" cy="18" r="3" fill="#e5e5dc"/>
  <circle cx="50" cy="17" r="0.8" fill="#333"/>
  <circle cx="52" cy="17" r="0.8" fill="#333"/>
  <!-- Legs -->
  <rect x="22" y="68" width="6" height="12" fill="#1e3a1e"/>
  <rect x="32" y="68" width="6" height="12" fill="#1e3a1e"/>
  <!-- Rotted royal robes -->
  <rect x="14" y="32" width="32" height="36" fill="#4a0e0e" rx="2"/>
  <!-- Tattered robe edges -->
  <path d="M 14,68 L 12,72 L 16,70 L 14,74 L 18,72" fill="#4a0e0e"/>
  <path d="M 46,68 L 48,72 L 44,70 L 46,74 L 42,72" fill="#4a0e0e"/>
  <!-- Chest decay -->
  <circle cx="28" cy="44" r="3" fill="#1a3a1a" opacity="0.5"/>
  <circle cx="34" cy="48" r="2" fill="#1a3a1a" opacity="0.5"/>
  <!-- Belt -->
  <rect x="16" y="54" width="28" height="3" fill="#8b6914"/>
  <rect x="28" y="53" width="4" height="5" fill="#d4a017" rx="1"/>
  <!-- Arms on armrests -->
  <path d="M 14,36 Q 8,42 8,54" stroke="#4ade80" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 46,36 Q 52,42 52,54" stroke="#4ade80" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Rotting hands -->
  <circle cx="8" cy="54" r="3" fill="#4ade80"/>
  <circle cx="52" cy="54" r="3" fill="#4ade80"/>
  <!-- Zombie head -->
  <rect x="20" y="10" width="20" height="22" fill="#4ade80" rx="6"/>
  <!-- Sunken eyes -->
  <circle cx="26" cy="18" r="3" fill="#1a3a1a"/>
  <circle cx="34" cy="18" r="3" fill="#1a3a1a"/>
  <circle cx="26" cy="18" r="1.2" fill="#dc2626"/>
  <circle cx="34" cy="18" r="1.2" fill="#dc2626"/>
  <!-- Rotting jaw -->
  <path d="M 24,26 Q 30,32 36,26" fill="#1a3a1a"/>
  <rect x="26" y="26" width="2" height="3" fill="#e5e5dc" rx="0.5"/>
  <rect x="32" y="26" width="2" height="3" fill="#e5e5dc" rx="0.5"/>
  <!-- Crown -->
  <path d="M 18,10 L 20,2 L 24,8 L 28,0 L 30,6 L 32,0 L 36,8 L 40,2 L 42,10 Z" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <!-- Crown jewels -->
  <circle cx="24" cy="6" r="1.5" fill="#dc2626"/>
  <circle cx="30" cy="4" r="1.5" fill="#16a34a"/>
  <circle cx="36" cy="6" r="1.5" fill="#dc2626"/>
</svg>`,

// BOSS 4. Blackbeard — robot pirate captain with mechanical parts
mv_blackbeard: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="bossGlow4"><stop offset="0%" stop-color="rgba(100,116,139,0.3)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow4)"/>
  <ellipse cx="30" cy="86" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Peg leg (right) -->
  <rect x="22" y="64" width="7" height="16" fill="#1e293b" rx="1"/>
  <rect x="33" y="64" width="3" height="18" fill="#b8860b" rx="1"/>
  <!-- Boot (left) -->
  <rect x="20" y="78" width="10" height="4" fill="#3d2b1f" rx="2"/>
  <!-- Peg foot -->
  <circle cx="34" cy="82" r="2" fill="#8b6914"/>
  <!-- Pirate captain coat -->
  <rect x="12" y="28" width="36" height="36" fill="#1e293b" stroke="#334155" stroke-width="1" rx="3"/>
  <!-- Coat tails -->
  <path d="M 12,64 L 10,72 L 18,66" fill="#1e293b"/>
  <path d="M 48,64 L 50,72 L 42,66" fill="#1e293b"/>
  <!-- Gold trim -->
  <line x1="12" y1="30" x2="12" y2="64" stroke="#d4a017" stroke-width="1"/>
  <line x1="48" y1="30" x2="48" y2="64" stroke="#d4a017" stroke-width="1"/>
  <!-- Chest plate (mechanical) -->
  <rect x="20" y="34" width="20" height="14" fill="#475569" stroke="#64748b" stroke-width="0.5" rx="2"/>
  <circle cx="30" cy="41" r="4" fill="#334155" stroke="#94a3b8" stroke-width="0.5"/>
  <circle cx="30" cy="41" r="2" fill="#dc2626" opacity="0.6"/>
  <!-- Crossbones buttons -->
  <circle cx="24" cy="54" r="1.5" fill="#d4a017"/>
  <circle cx="30" cy="54" r="1.5" fill="#d4a017"/>
  <circle cx="36" cy="54" r="1.5" fill="#d4a017"/>
  <!-- Belt -->
  <rect x="14" y="58" width="32" height="4" fill="#5c2d0e" rx="1"/>
  <rect x="28" y="57" width="4" height="6" fill="#d4a017" rx="1"/>
  <!-- Mechanical arm (right) -->
  <rect x="49" y="30" width="8" height="20" fill="#94a3b8" stroke="#64748b" stroke-width="0.5" rx="2"/>
  <!-- Hook hand -->
  <path d="M 53,50 Q 56,56 52,58 Q 48,56 50,52" stroke="#d4a017" stroke-width="2" fill="none"/>
  <!-- Normal arm (left) -->
  <path d="M 12,32 Q 4,42 6,52" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Cutlass -->
  <line x1="6" y1="52" x2="2" y2="28" stroke="#94a3b8" stroke-width="2.5"/>
  <line x1="4" y1="52" x2="8" y2="52" stroke="#d4a017" stroke-width="3"/>
  <!-- Head -->
  <rect x="18" y="4" width="24" height="22" fill="#94a3b8" stroke="#64748b" stroke-width="1" rx="5"/>
  <!-- Mechanical eye (left) -->
  <circle cx="25" cy="14" r="3" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <circle cx="25" cy="14" r="1.5" fill="#dc2626"/>
  <!-- Normal eye patch area (right) -->
  <rect x="32" y="12" width="6" height="5" fill="#1e1e1e" rx="1"/>
  <line x1="35" y1="10" x2="40" y2="6" stroke="#1e1e1e" stroke-width="1"/>
  <!-- Mechanical beard -->
  <path d="M 20,22 Q 22,30 26,28 Q 28,32 30,28 Q 32,32 34,28 Q 38,30 40,22" fill="#1e293b"/>
  <!-- Wires in beard -->
  <line x1="24" y1="24" x2="24" y2="30" stroke="#dc2626" stroke-width="0.5"/>
  <line x1="30" y1="24" x2="30" y2="30" stroke="#06b6d4" stroke-width="0.5"/>
  <line x1="36" y1="24" x2="36" y2="30" stroke="#dc2626" stroke-width="0.5"/>
  <!-- Pirate hat -->
  <path d="M 10,8 Q 30,-4 50,8 L 46,6 Q 30,0 14,6 Z" fill="#1e293b" stroke="#d4a017" stroke-width="0.5"/>
  <rect x="14" y="5" width="32" height="3" fill="#1e293b"/>
  <!-- Skull & crossbones on hat -->
  <circle cx="30" cy="4" r="2.5" fill="#e5e5dc"/>
  <circle cx="29" cy="3.5" r="0.6" fill="#333"/>
  <circle cx="31" cy="3.5" r="0.6" fill="#333"/>
</svg>`,

// BOSS 5. Dragon Lord — massive dragon head/upper body
mv_dragon_lord: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="bossGlow5"><stop offset="0%" stop-color="rgba(220,38,38,0.3)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow5)"/>
  <!-- Fire breath glow at bottom -->
  <ellipse cx="20" cy="82" rx="10" ry="4" fill="rgba(249,115,22,0.3)"/>
  <!-- Massive neck/body -->
  <path d="M 20,50 Q 16,60 14,72 Q 12,80 16,82 L 44,82 Q 48,80 46,72 Q 44,60 40,50" fill="#991b1b" stroke="#7f1d1d" stroke-width="1"/>
  <!-- Neck scales -->
  <path d="M 22,54 Q 30,52 38,54" fill="none" stroke="#b91c1c" stroke-width="1" opacity="0.5"/>
  <path d="M 20,60 Q 30,58 40,60" fill="none" stroke="#b91c1c" stroke-width="1" opacity="0.5"/>
  <path d="M 18,66 Q 30,64 42,66" fill="none" stroke="#b91c1c" stroke-width="1" opacity="0.5"/>
  <!-- Belly plates -->
  <path d="M 24,54 Q 30,52 36,54 L 36,78 Q 30,80 24,78 Z" fill="#fbbf24" opacity="0.3"/>
  <!-- Wings (massive, spread) -->
  <path d="M 18,40 L 0,10 L 4,24 L 2,16 L 8,30 L 6,22 L 12,36" fill="#dc2626" stroke="#991b1b" stroke-width="0.5"/>
  <path d="M 42,40 L 60,10 L 56,24 L 58,16 L 52,30 L 54,22 L 48,36" fill="#dc2626" stroke="#991b1b" stroke-width="0.5"/>
  <!-- Wing membrane -->
  <path d="M 18,40 L 0,10 L 12,36" fill="#b91c1c" opacity="0.5"/>
  <path d="M 42,40 L 60,10 L 48,36" fill="#b91c1c" opacity="0.5"/>
  <!-- Massive head -->
  <ellipse cx="30" cy="30" rx="16" ry="14" fill="#dc2626" stroke="#991b1b" stroke-width="1"/>
  <!-- Snout -->
  <ellipse cx="30" cy="38" rx="10" ry="6" fill="#b91c1c"/>
  <!-- Nostrils with fire -->
  <circle cx="26" cy="38" r="2" fill="#0f172a"/>
  <circle cx="34" cy="38" r="2" fill="#0f172a"/>
  <path d="M 24,40 Q 22,46 20,52" stroke="#f97316" stroke-width="2" fill="none" opacity="0.7"/>
  <path d="M 26,42 Q 24,48 22,54" stroke="#fbbf24" stroke-width="1" fill="none" opacity="0.5"/>
  <!-- Fierce eyes -->
  <ellipse cx="22" cy="26" rx="4" ry="3" fill="#fbbf24" stroke="#f97316" stroke-width="0.5"/>
  <ellipse cx="38" cy="26" rx="4" ry="3" fill="#fbbf24" stroke="#f97316" stroke-width="0.5"/>
  <ellipse cx="22" cy="26" rx="2" ry="2.5" fill="#0f172a"/>
  <ellipse cx="38" cy="26" rx="2" ry="2.5" fill="#0f172a"/>
  <!-- Brow ridges -->
  <path d="M 16,22 Q 20,20 24,22" fill="#7f1d1d"/>
  <path d="M 36,22 Q 40,20 44,22" fill="#7f1d1d"/>
  <!-- Horns -->
  <path d="M 16,20 Q 10,8 8,2" stroke="#78350f" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 44,20 Q 50,8 52,2" stroke="#78350f" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Teeth -->
  <path d="M 22,42 L 23,46 L 24,42 L 25,46 L 26,42" fill="#f5f5f4"/>
  <path d="M 34,42 L 35,46 L 36,42 L 37,46 L 38,42" fill="#f5f5f4"/>
  <!-- Spines -->
  <path d="M 28,16 L 30,10 L 32,16" fill="#991b1b"/>
</svg>`,

// BOSS 6. Sheriff Doom — evil western sheriff with dual revolvers
mv_sheriff_doom: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="bossGlow6"><stop offset="0%" stop-color="rgba(212,160,23,0.25)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow6)"/>
  <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Boots -->
  <rect x="18" y="74" width="10" height="8" fill="#3d2b1f" rx="2"/>
  <rect x="32" y="74" width="10" height="8" fill="#3d2b1f" rx="2"/>
  <!-- Spurs -->
  <circle cx="19" cy="80" r="2" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <circle cx="41" cy="80" r="2" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <!-- Legs -->
  <rect x="21" y="58" width="7" height="18" fill="#1e1e1e"/>
  <rect x="32" y="58" width="7" height="18" fill="#1e1e1e"/>
  <!-- Long dark duster -->
  <rect x="12" y="28" width="36" height="38" fill="#1e1e1e" rx="2"/>
  <path d="M 12,66 L 10,74 L 18,66" fill="#1e1e1e"/>
  <path d="M 48,66 L 50,74 L 42,66" fill="#1e1e1e"/>
  <!-- Sheriff star badge -->
  <path d="M 36,36 L 38,32 L 40,36 L 44,34 L 42,38 L 46,40 L 42,42 L 44,46 L 40,44 L 38,48 L 36,44 L 32,46 L 34,42 L 30,40 L 34,38 L 32,34 Z" fill="#d4a017" stroke="#8b6914" stroke-width="0.5"/>
  <circle cx="38" cy="40" r="2" fill="#8b6914"/>
  <!-- Vest -->
  <rect x="20" y="30" width="20" height="18" fill="#4a3728"/>
  <!-- Belt with bullet loops -->
  <rect x="14" y="52" width="32" height="4" fill="#5c2d0e" rx="1"/>
  <circle cx="18" cy="54" r="1" fill="#d4a017"/>
  <circle cx="22" cy="54" r="1" fill="#d4a017"/>
  <circle cx="26" cy="54" r="1" fill="#d4a017"/>
  <circle cx="34" cy="54" r="1" fill="#d4a017"/>
  <circle cx="38" cy="54" r="1" fill="#d4a017"/>
  <circle cx="42" cy="54" r="1" fill="#d4a017"/>
  <!-- Arms -->
  <path d="M 12,32 Q 2,40 4,50" stroke="#1e1e1e" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M 48,32 Q 58,40 56,50" stroke="#1e1e1e" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Dual revolvers -->
  <rect x="0" y="48" width="10" height="4" fill="#64748b" rx="1"/>
  <rect x="0" y="44" width="3" height="6" fill="#475569" rx="0.5"/>
  <circle cx="1" cy="46" r="1" fill="#1e1e1e"/>
  <rect x="50" y="48" width="10" height="4" fill="#64748b" rx="1"/>
  <rect x="57" y="44" width="3" height="6" fill="#475569" rx="0.5"/>
  <circle cx="59" cy="46" r="1" fill="#1e1e1e"/>
  <!-- Scarred face -->
  <rect x="20" y="8" width="20" height="20" fill="#c4a882" rx="6"/>
  <!-- Scar -->
  <line x1="34" y1="10" x2="38" y2="20" stroke="#dc2626" stroke-width="1" opacity="0.7"/>
  <!-- Stern eyes -->
  <circle cx="26" cy="16" r="1.5" fill="#1e1e1e"/>
  <circle cx="34" cy="16" r="1.5" fill="#1e1e1e"/>
  <!-- Handlebar mustache -->
  <path d="M 24,20 Q 26,22 30,20 Q 34,22 36,20 Q 38,22 40,20" fill="none" stroke="#3d2b1f" stroke-width="1.5"/>
  <!-- Big cowboy hat -->
  <rect x="8" y="7" width="44" height="4" fill="#1e1e1e" rx="1"/>
  <rect x="16" y="0" width="28" height="9" fill="#1e1e1e" rx="4"/>
  <!-- Hat band -->
  <rect x="16" y="6" width="28" height="2" fill="#d4a017"/>
</svg>`,

// BOSS 7. Singularity — AI core/sphere with digital face
mv_singularity: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs>
    <radialGradient id="bossGlow7"><stop offset="0%" stop-color="rgba(6,182,212,0.4)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
    <radialGradient id="singCore"><stop offset="0%" stop-color="#0ea5e9"/><stop offset="40%" stop-color="#0284c7"/><stop offset="100%" stop-color="#0f172a"/></radialGradient>
  </defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow7)"/>
  <!-- Floating shadow -->
  <ellipse cx="30" cy="82" rx="12" ry="2" fill="rgba(6,182,212,0.2)"/>
  <!-- Data cascade below -->
  <line x1="20" y1="72" x2="20" y2="82" stroke="#06b6d4" stroke-width="0.5" opacity="0.3"/>
  <line x1="26" y1="74" x2="26" y2="84" stroke="#06b6d4" stroke-width="0.5" opacity="0.3"/>
  <line x1="30" y1="70" x2="30" y2="82" stroke="#06b6d4" stroke-width="0.5" opacity="0.4"/>
  <line x1="34" y1="74" x2="34" y2="84" stroke="#06b6d4" stroke-width="0.5" opacity="0.3"/>
  <line x1="40" y1="72" x2="40" y2="82" stroke="#06b6d4" stroke-width="0.5" opacity="0.3"/>
  <!-- Orbital rings -->
  <ellipse cx="30" cy="44" rx="28" ry="8" fill="none" stroke="#06b6d4" stroke-width="0.5" opacity="0.3" transform="rotate(-20,30,44)"/>
  <ellipse cx="30" cy="44" rx="28" ry="8" fill="none" stroke="#8b5cf6" stroke-width="0.5" opacity="0.3" transform="rotate(20,30,44)"/>
  <ellipse cx="30" cy="44" rx="28" ry="8" fill="none" stroke="#06b6d4" stroke-width="0.5" opacity="0.3" transform="rotate(70,30,44)"/>
  <!-- Main sphere -->
  <circle cx="30" cy="44" r="22" fill="url(#singCore)" stroke="#0ea5e9" stroke-width="1.5"/>
  <!-- Grid lines on sphere -->
  <ellipse cx="30" cy="44" rx="22" ry="4" fill="none" stroke="#06b6d4" stroke-width="0.3" opacity="0.4"/>
  <ellipse cx="30" cy="44" rx="22" ry="12" fill="none" stroke="#06b6d4" stroke-width="0.3" opacity="0.4"/>
  <ellipse cx="30" cy="44" rx="4" ry="22" fill="none" stroke="#06b6d4" stroke-width="0.3" opacity="0.4"/>
  <ellipse cx="30" cy="44" rx="12" ry="22" fill="none" stroke="#06b6d4" stroke-width="0.3" opacity="0.4"/>
  <!-- Digital face -->
  <rect x="20" y="36" width="7" height="4" fill="#dc2626" rx="1" opacity="0.9"/>
  <rect x="33" y="36" width="7" height="4" fill="#dc2626" rx="1" opacity="0.9"/>
  <!-- Digital mouth -->
  <line x1="22" y1="50" x2="26" y2="50" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="28" y1="50" x2="32" y2="50" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="34" y1="50" x2="38" y2="50" stroke="#dc2626" stroke-width="1.5"/>
  <!-- Orbiting data nodes -->
  <circle cx="4" cy="36" r="3" fill="#06b6d4" opacity="0.6"/>
  <circle cx="56" cy="52" r="3" fill="#8b5cf6" opacity="0.6"/>
  <circle cx="16" cy="68" r="2" fill="#06b6d4" opacity="0.5"/>
  <circle cx="44" cy="20" r="2" fill="#8b5cf6" opacity="0.5"/>
  <!-- Connection beams -->
  <line x1="4" y1="36" x2="12" y2="38" stroke="#06b6d4" stroke-width="0.5" opacity="0.5"/>
  <line x1="56" y1="52" x2="48" y2="50" stroke="#8b5cf6" stroke-width="0.5" opacity="0.5"/>
</svg>`,

// BOSS 8. Alpha Rex — massive T-Rex with battle scars
mv_alpha_rex: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="bossGlow8"><stop offset="0%" stop-color="rgba(101,163,13,0.25)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow8)"/>
  <ellipse cx="30" cy="86" rx="16" ry="4" fill="rgba(0,0,0,0.4)"/>
  <!-- Tail -->
  <path d="M 38,56 Q 50,54 58,48 L 60,46 L 58,50 Q 50,56 38,58" fill="#4d7c0f" stroke="#365314" stroke-width="0.5"/>
  <!-- Massive hind legs -->
  <path d="M 20,64 Q 16,74 14,78 Q 12,82 18,82 L 26,82 Q 28,82 26,78 Q 24,74 24,64" fill="#4d7c0f" stroke="#365314" stroke-width="0.5"/>
  <path d="M 32,64 Q 34,74 36,78 Q 38,82 32,82 L 40,82 Q 42,82 42,78 Q 40,74 36,64" fill="#4d7c0f" stroke="#365314" stroke-width="0.5"/>
  <!-- Toe claws -->
  <path d="M 16,82 L 14,84 M 20,82 L 20,85 M 24,82 L 26,84" stroke="#78350f" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M 34,82 L 32,84 M 38,82 L 38,85 M 42,82 L 44,84" stroke="#78350f" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Massive body -->
  <ellipse cx="28" cy="46" rx="18" ry="20" fill="#4d7c0f" stroke="#365314" stroke-width="1"/>
  <!-- Belly -->
  <ellipse cx="28" cy="52" rx="12" ry="12" fill="#a3e635" opacity="0.25"/>
  <!-- Battle scars -->
  <line x1="18" y1="38" x2="14" y2="48" stroke="#dc2626" stroke-width="1.5" opacity="0.6"/>
  <line x1="20" y1="38" x2="16" y2="48" stroke="#dc2626" stroke-width="1" opacity="0.5"/>
  <line x1="36" y1="44" x2="40" y2="52" stroke="#dc2626" stroke-width="1.5" opacity="0.6"/>
  <!-- Tiny arms -->
  <path d="M 16,38 Q 10,42 8,40 L 6,38" stroke="#4d7c0f" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 18,36 Q 12,38 10,34" stroke="#4d7c0f" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Massive neck -->
  <path d="M 18,34 Q 14,24 16,16" stroke="#4d7c0f" stroke-width="12" fill="none"/>
  <!-- Massive head -->
  <ellipse cx="14" cy="14" rx="14" ry="10" fill="#4d7c0f" stroke="#365314" stroke-width="1"/>
  <!-- Upper jaw -->
  <path d="M 0,10 Q 6,6 14,8 Q 18,9 20,12 L 20,16 Q 14,14 0,14 Z" fill="#365314"/>
  <!-- Lower jaw -->
  <path d="M 2,16 Q 10,22 20,18" fill="#365314"/>
  <!-- Teeth (upper) -->
  <path d="M 2,14 L 3,18 L 4,14 L 6,18 L 8,14 L 10,18 L 12,14 L 14,18 L 16,14" fill="#f5f5f4"/>
  <!-- Teeth (lower) -->
  <path d="M 4,16 L 5,12 L 7,16 L 9,12 L 11,16 L 13,12 L 15,16" fill="#e5e5dc"/>
  <!-- Fierce eye -->
  <circle cx="16" cy="10" r="4" fill="#fbbf24" stroke="#f97316" stroke-width="0.5"/>
  <ellipse cx="16" cy="10" rx="2" ry="3" fill="#0f172a"/>
  <!-- Scar across eye -->
  <line x1="12" y1="6" x2="20" y2="14" stroke="#dc2626" stroke-width="1" opacity="0.7"/>
  <!-- Nostril -->
  <circle cx="4" cy="10" r="1.5" fill="#1a3a1a"/>
  <!-- Brow ridge -->
  <path d="M 10,6 Q 16,4 22,6" fill="#365314"/>
  <!-- Spinal ridges -->
  <path d="M 22,28 L 24,24 L 26,28" fill="#365314"/>
  <path d="M 26,30 L 28,26 L 30,30" fill="#365314"/>
  <path d="M 30,34 L 32,30 L 34,34" fill="#365314"/>
</svg>`,

// BOSS 9. Leviathan — giant sea serpent/monster
mv_leviathan: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs>
    <radialGradient id="bossGlow9"><stop offset="0%" stop-color="rgba(14,165,233,0.3)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
    <linearGradient id="levGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0284c7"/><stop offset="100%" stop-color="#164e63"/></linearGradient>
  </defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow9)"/>
  <!-- Water surface -->
  <path d="M 0,60 Q 10,56 20,60 Q 30,64 40,60 Q 50,56 60,60 L 60,90 L 0,90 Z" fill="rgba(14,165,233,0.15)"/>
  <!-- Body coils visible in water -->
  <path d="M 10,70 Q 20,64 30,70 Q 40,76 50,70" stroke="#0284c7" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.4"/>
  <path d="M 8,80 Q 18,74 28,80 Q 38,86 48,80" stroke="#0284c7" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.3"/>
  <!-- Tail fin emerging -->
  <path d="M 46,68 Q 54,62 58,54 L 56,58 Q 52,64 46,70" fill="#0284c7" opacity="0.5"/>
  <!-- Main body emerging from water -->
  <path d="M 22,58 Q 18,44 20,30 Q 22,20 30,16 Q 38,20 40,30 Q 42,44 38,58" fill="url(#levGrad)" stroke="#0369a1" stroke-width="1"/>
  <!-- Belly -->
  <path d="M 26,56 Q 26,40 28,24 Q 30,20 32,24 Q 34,40 34,56" fill="#7dd3fc" opacity="0.3"/>
  <!-- Scales pattern -->
  <path d="M 22,34 Q 26,32 30,34 Q 34,32 38,34" fill="none" stroke="#0369a1" stroke-width="0.5" opacity="0.5"/>
  <path d="M 22,40 Q 26,38 30,40 Q 34,38 38,40" fill="none" stroke="#0369a1" stroke-width="0.5" opacity="0.5"/>
  <path d="M 22,46 Q 26,44 30,46 Q 34,44 38,46" fill="none" stroke="#0369a1" stroke-width="0.5" opacity="0.5"/>
  <!-- Fins (side) -->
  <path d="M 20,36 L 8,30 L 10,38 L 20,40" fill="#0284c7" stroke="#0369a1" stroke-width="0.5"/>
  <path d="M 40,36 L 52,30 L 50,38 L 40,40" fill="#0284c7" stroke="#0369a1" stroke-width="0.5"/>
  <!-- Head crest/fin -->
  <path d="M 28,16 L 26,6 L 30,12 L 34,6 L 32,16" fill="#0369a1"/>
  <!-- Eyes -->
  <circle cx="24" cy="22" r="4" fill="#fbbf24" stroke="#f97316" stroke-width="0.5"/>
  <ellipse cx="24" cy="22" rx="2" ry="3" fill="#0f172a"/>
  <circle cx="36" cy="22" r="4" fill="#fbbf24" stroke="#f97316" stroke-width="0.5"/>
  <ellipse cx="36" cy="22" rx="2" ry="3" fill="#0f172a"/>
  <!-- Snout -->
  <ellipse cx="30" cy="28" rx="6" ry="4" fill="#0369a1"/>
  <!-- Nostrils -->
  <circle cx="28" cy="27" r="1" fill="#0f172a"/>
  <circle cx="32" cy="27" r="1" fill="#0f172a"/>
  <!-- Teeth -->
  <path d="M 24,30 L 25,34 L 26,30 L 28,34 L 30,30 L 32,34 L 34,30 L 35,34 L 36,30" fill="#f5f5f4"/>
  <!-- Water drops -->
  <ellipse cx="14" cy="54" rx="2" ry="3" fill="rgba(125,211,252,0.5)"/>
  <ellipse cx="46" cy="52" rx="2" ry="3" fill="rgba(125,211,252,0.5)"/>
</svg>`,

// BOSS 10. Megacorp CEO — corporate robot CEO with screens
mv_megacorp: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs><radialGradient id="bossGlow10"><stop offset="0%" stop-color="rgba(100,116,139,0.3)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow10)"/>
  <ellipse cx="30" cy="86" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Legs -->
  <rect x="20" y="64" width="8" height="16" fill="#1e293b" stroke="#334155" stroke-width="0.5" rx="1"/>
  <rect x="32" y="64" width="8" height="16" fill="#1e293b" stroke="#334155" stroke-width="0.5" rx="1"/>
  <!-- Corporate shoes -->
  <rect x="18" y="78" width="12" height="5" fill="#0f172a" rx="2"/>
  <rect x="30" y="78" width="12" height="5" fill="#0f172a" rx="2"/>
  <!-- Suit body -->
  <rect x="12" y="24" width="36" height="40" fill="#1e293b" stroke="#334155" stroke-width="1" rx="3"/>
  <!-- Corporate suit details -->
  <rect x="20" y="28" width="20" height="24" fill="#334155" rx="1"/>
  <!-- Red power tie -->
  <path d="M 30,28 L 27,36 L 30,58 L 33,36 Z" fill="#dc2626"/>
  <!-- Chest screen -->
  <rect x="22" y="42" width="16" height="12" fill="#0f172a" stroke="#06b6d4" stroke-width="0.5" rx="1"/>
  <!-- Stock chart on screen -->
  <polyline points="24,52 27,48 30,50 33,44 36,46" fill="none" stroke="#4ade80" stroke-width="1"/>
  <!-- Dollar sign -->
  <text x="29" y="50" fill="#4ade80" font-size="4" text-anchor="middle" font-family="monospace">$</text>
  <!-- Shoulder screens -->
  <rect x="4" y="26" width="10" height="8" fill="#0f172a" stroke="#06b6d4" stroke-width="0.5" rx="1"/>
  <rect x="46" y="26" width="10" height="8" fill="#0f172a" stroke="#06b6d4" stroke-width="0.5" rx="1"/>
  <!-- Data on shoulder screens -->
  <line x1="6" y1="29" x2="12" y2="29" stroke="#06b6d4" stroke-width="0.5"/>
  <line x1="6" y1="31" x2="10" y2="31" stroke="#06b6d4" stroke-width="0.5"/>
  <line x1="48" y1="29" x2="54" y2="29" stroke="#06b6d4" stroke-width="0.5"/>
  <line x1="48" y1="31" x2="52" y2="31" stroke="#06b6d4" stroke-width="0.5"/>
  <!-- Arms -->
  <rect x="3" y="34" width="8" height="20" fill="#1e293b" stroke="#334155" stroke-width="0.5" rx="2"/>
  <rect x="49" y="34" width="8" height="20" fill="#1e293b" stroke="#334155" stroke-width="0.5" rx="2"/>
  <!-- Mechanical hands -->
  <circle cx="7" cy="56" r="3" fill="#94a3b8"/>
  <circle cx="53" cy="56" r="3" fill="#94a3b8"/>
  <!-- Robot head -->
  <rect x="16" y="2" width="28" height="22" fill="#1e293b" stroke="#334155" stroke-width="1" rx="4"/>
  <!-- Face screen -->
  <rect x="18" y="4" width="24" height="18" fill="#0f172a" rx="2"/>
  <!-- Digital eyes -->
  <rect x="22" y="8" width="6" height="4" fill="#06b6d4" rx="1"/>
  <rect x="32" y="8" width="6" height="4" fill="#06b6d4" rx="1"/>
  <!-- Digital smile -->
  <path d="M 24,16 Q 30,20 36,16" fill="none" stroke="#06b6d4" stroke-width="1"/>
  <!-- Antenna -->
  <line x1="30" y1="2" x2="30" y2="-3" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="30" cy="-3" r="2" fill="#dc2626" opacity="0.7"/>
  <!-- Floating holographic charts -->
  <rect x="0" y="12" width="8" height="6" fill="rgba(6,182,212,0.2)" stroke="#06b6d4" stroke-width="0.3" rx="1"/>
  <rect x="52" y="10" width="8" height="6" fill="rgba(6,182,212,0.2)" stroke="#06b6d4" stroke-width="0.3" rx="1"/>
</svg>`,

// BOSS 11. Void Emperor — dark void entity with crown of stars
mv_void_emperor: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs>
    <radialGradient id="bossGlow11"><stop offset="0%" stop-color="rgba(88,28,135,0.5)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
    <radialGradient id="voidBody"><stop offset="0%" stop-color="#3b0764"/><stop offset="100%" stop-color="#0f0520"/></radialGradient>
  </defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow11)"/>
  <ellipse cx="30" cy="86" rx="14" ry="3" fill="rgba(88,28,135,0.3)"/>
  <!-- Void cape/robe (flowing) -->
  <path d="M 10,30 Q 6,50 4,70 Q 2,80 10,84 L 30,86 L 50,84 Q 58,80 56,70 Q 54,50 50,30 Z" fill="#0f0520" stroke="#3b0764" stroke-width="1" opacity="0.9"/>
  <!-- Cape inner texture -->
  <circle cx="16" cy="60" r="1" fill="#a855f7" opacity="0.15"/>
  <circle cx="44" cy="56" r="1" fill="#c084fc" opacity="0.15"/>
  <circle cx="24" cy="72" r="1" fill="#a855f7" opacity="0.1"/>
  <circle cx="38" cy="68" r="0.8" fill="#c084fc" opacity="0.1"/>
  <circle cx="30" cy="78" r="1" fill="#a855f7" opacity="0.1"/>
  <!-- Void body -->
  <ellipse cx="30" cy="44" rx="16" ry="22" fill="url(#voidBody)" stroke="#581c87" stroke-width="1"/>
  <!-- Chest void emblem -->
  <circle cx="30" cy="40" r="6" fill="#1e1b4b" stroke="#a855f7" stroke-width="1"/>
  <circle cx="30" cy="40" r="3" fill="#6b21a8"/>
  <circle cx="30" cy="40" r="1" fill="#e9d5ff"/>
  <!-- Dark swirls -->
  <path d="M 20,36 Q 24,32 28,36" fill="none" stroke="#6b21a8" stroke-width="0.8" opacity="0.5"/>
  <path d="M 32,48 Q 36,44 40,48" fill="none" stroke="#6b21a8" stroke-width="0.8" opacity="0.5"/>
  <!-- Void arms -->
  <path d="M 14,34 Q 4,44 2,54 Q 0,60 4,58" stroke="#3b0764" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M 46,34 Q 56,44 58,54 Q 60,60 56,58" stroke="#3b0764" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Void energy hands -->
  <circle cx="4" cy="58" r="4" fill="#6b21a8" opacity="0.6"/>
  <circle cx="56" cy="58" r="4" fill="#6b21a8" opacity="0.6"/>
  <!-- Head -->
  <ellipse cx="30" cy="16" rx="12" ry="10" fill="#3b0764" stroke="#581c87" stroke-width="1"/>
  <!-- Void face -->
  <ellipse cx="24" cy="16" rx="4" ry="3" fill="#1e1b4b"/>
  <ellipse cx="36" cy="16" rx="4" ry="3" fill="#1e1b4b"/>
  <circle cx="24" cy="16" r="2" fill="#a855f7"/>
  <circle cx="36" cy="16" r="2" fill="#a855f7"/>
  <circle cx="24" cy="16" r="0.8" fill="#e9d5ff"/>
  <circle cx="36" cy="16" r="0.8" fill="#e9d5ff"/>
  <!-- Void mouth -->
  <path d="M 26,22 Q 30,26 34,22" fill="#1e1b4b"/>
  <!-- Crown of Stars -->
  <circle cx="18" cy="8" r="2" fill="#fbbf24" opacity="0.9"/>
  <circle cx="24" cy="4" r="2.5" fill="#fbbf24" opacity="0.9"/>
  <circle cx="30" cy="2" r="3" fill="#fbbf24"/>
  <circle cx="36" cy="4" r="2.5" fill="#fbbf24" opacity="0.9"/>
  <circle cx="42" cy="8" r="2" fill="#fbbf24" opacity="0.9"/>
  <!-- Star sparkles -->
  <path d="M 30,2 L 30,-2 M 28,2 L 32,2" stroke="#fff" stroke-width="0.5" opacity="0.7"/>
  <path d="M 24,4 L 24,1 M 22,4 L 26,4" stroke="#fff" stroke-width="0.5" opacity="0.5"/>
  <path d="M 36,4 L 36,1 M 34,4 L 38,4" stroke="#fff" stroke-width="0.5" opacity="0.5"/>
  <!-- Void particles -->
  <circle cx="8" cy="30" r="1" fill="#c084fc" opacity="0.5"/>
  <circle cx="52" cy="34" r="1" fill="#c084fc" opacity="0.5"/>
  <circle cx="12" cy="70" r="1" fill="#a855f7" opacity="0.4"/>
  <circle cx="48" cy="72" r="1" fill="#a855f7" opacity="0.4"/>
</svg>`,

// BOSS 12. Multiverse Sheldon — evil alternate Sheldon with portal powers
mv_multiverse_sheldon: `<svg viewBox="0 0 60 90" class="w-full h-full">
  <defs>
    <radialGradient id="bossGlow12"><stop offset="0%" stop-color="rgba(168,85,247,0.4)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
    <radialGradient id="portalGrad"><stop offset="0%" stop-color="#c084fc"/><stop offset="40%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#3b0764"/></radialGradient>
  </defs>
  <ellipse cx="30" cy="50" rx="28" ry="40" fill="url(#bossGlow12)"/>
  <ellipse cx="30" cy="85" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>
  <!-- Portal ring behind -->
  <ellipse cx="30" cy="44" rx="26" ry="32" fill="none" stroke="#7c3aed" stroke-width="2" opacity="0.3"/>
  <ellipse cx="30" cy="44" rx="23" ry="29" fill="none" stroke="#a855f7" stroke-width="1" opacity="0.2"/>
  <!-- Legs -->
  <rect x="23" y="64" width="6" height="16" fill="#1e293b"/>
  <rect x="31" y="64" width="6" height="16" fill="#1e293b"/>
  <!-- Shoes -->
  <rect x="21" y="78" width="9" height="4" fill="#111" rx="2"/>
  <rect x="30" y="78" width="9" height="4" fill="#111" rx="2"/>
  <!-- Evil dark shirt with lightning bolt -->
  <rect x="16" y="30" width="28" height="34" fill="#1e1e1e" rx="2"/>
  <!-- Purple lightning bolt on shirt -->
  <path d="M 34,34 L 28,44 L 34,44 L 26,58" fill="none" stroke="#a855f7" stroke-width="2.5"/>
  <!-- Dark cape -->
  <path d="M 16,30 Q 10,34 8,50 Q 6,64 10,72" stroke="#3b0764" stroke-width="3" fill="none"/>
  <path d="M 44,30 Q 50,34 52,50 Q 54,64 50,72" stroke="#3b0764" stroke-width="3" fill="none"/>
  <!-- Arms -->
  <path d="M 16,34 Q 6,42 4,50" stroke="#1e1e1e" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 44,34 Q 54,42 56,50" stroke="#1e1e1e" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Portal energy in hands -->
  <circle cx="4" cy="50" r="5" fill="url(#portalGrad)" opacity="0.7"/>
  <circle cx="4" cy="50" r="3" fill="#c084fc" opacity="0.5"/>
  <circle cx="56" cy="50" r="5" fill="url(#portalGrad)" opacity="0.7"/>
  <circle cx="56" cy="50" r="3" fill="#c084fc" opacity="0.5"/>
  <!-- Head -->
  <rect x="20" y="6" width="20" height="22" fill="#dbc4a0" rx="6"/>
  <!-- Evil Sheldon features -->
  <!-- Narrowed calculating eyes -->
  <path d="M 24,14 L 22,16 L 24,18" fill="#1e1e1e"/>
  <path d="M 36,14 L 38,16 L 36,18" fill="#1e1e1e"/>
  <circle cx="25" cy="16" r="1" fill="#7c3aed"/>
  <circle cx="35" cy="16" r="1" fill="#7c3aed"/>
  <!-- Evil smirk -->
  <path d="M 25,22 Q 30,26 35,22" fill="none" stroke="#333" stroke-width="1"/>
  <!-- Evil goatee -->
  <path d="M 28,24 Q 30,28 32,24" fill="#333"/>
  <!-- Slicked dark hair -->
  <path d="M 18,10 C 18,2 42,2 42,10 L 40,5 L 20,5 Z" fill="#1e1e1e"/>
  <!-- Widow's peak -->
  <path d="M 26,6 L 30,10 L 34,6" fill="#1e1e1e"/>
  <!-- Portal energy aura -->
  <circle cx="10" cy="22" r="2" fill="#a855f7" opacity="0.4"/>
  <circle cx="50" cy="26" r="2" fill="#a855f7" opacity="0.4"/>
  <circle cx="8" cy="66" r="1.5" fill="#c084fc" opacity="0.3"/>
  <circle cx="52" cy="62" r="1.5" fill="#c084fc" opacity="0.3"/>
  <!-- Portal sparks -->
  <line x1="2" y1="48" x2="6" y2="44" stroke="#e9d5ff" stroke-width="0.5" opacity="0.7"/>
  <path d="M 54,48 L 58,44" stroke="#e9d5ff" stroke-width="0.5" opacity="0.7"/>
</svg>`

};

if (typeof vectors !== 'undefined') Object.assign(vectors, mvEnemyVectors);
