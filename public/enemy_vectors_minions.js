// ============================================================
// MINION VECTORS - Detailed SVG sprites for all minion enemies
// Loaded after vectors.js, merged via Object.assign
// ============================================================
const minionVectors = {

// 1. Starfleet Red Shirt
red_shirt: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<rect x="22" y="74" width="6" height="10" fill="#1e293b"/>
<rect x="32" y="74" width="6" height="10" fill="#1e293b"/>
<rect x="22" y="54" width="6" height="22" fill="#1e293b"/>
<rect x="32" y="54" width="6" height="22" fill="#1e293b"/>
<!-- Red uniform top -->
<rect x="16" y="26" width="28" height="28" fill="#dc2626" rx="2"/>
<!-- Starfleet insignia -->
<path d="M 30,32 L 26,40 L 34,40 Z" fill="#fbbf24"/>
<!-- Black collar -->
<path d="M 16,26 Q 30,22 44,26 L 44,30 L 16,30 Z" fill="#1e293b"/>
<!-- Arms -->
<path d="M 16,30 Q 8,40 12,50" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,30 Q 52,40 48,50" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Phaser in hand -->
<rect x="44" y="48" width="10" height="4" fill="#94a3b8" rx="1"/>
<rect x="52" y="46" width="4" height="3" fill="#64748b"/>
<!-- Head -->
<rect x="22" y="6" width="16" height="18" fill="#fed7aa" rx="4"/>
<!-- Hair -->
<path d="M 20,10 C 20,4 40,4 40,10" fill="#78350f"/>
<!-- Eyes -->
<circle cx="27" cy="14" r="1.5" fill="#1c1917"/>
<circle cx="33" cy="14" r="1.5" fill="#1c1917"/>
<!-- Nervous mouth -->
<path d="M 27,20 Q 30,18 33,20" fill="none" stroke="#92400e" stroke-width="1"/>
</svg>`,

// 2. Imperial Stormtrooper
stormtrooper: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- White armor boots -->
<rect x="20" y="72" width="8" height="12" fill="#e2e8f0" rx="2"/>
<rect x="32" y="72" width="8" height="12" fill="#e2e8f0" rx="2"/>
<!-- Black body suit legs -->
<rect x="22" y="54" width="6" height="20" fill="#0f172a"/>
<rect x="32" y="54" width="6" height="20" fill="#0f172a"/>
<!-- Armor legs -->
<rect x="20" y="54" width="8" height="14" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" rx="1"/>
<rect x="32" y="54" width="8" height="14" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" rx="1"/>
<!-- White armor body -->
<rect x="14" y="22" width="32" height="32" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" rx="2"/>
<!-- Chest details -->
<rect x="20" y="28" width="8" height="8" fill="none" stroke="#94a3b8" stroke-width="1" rx="1"/>
<rect x="32" y="28" width="8" height="8" fill="none" stroke="#94a3b8" stroke-width="1" rx="1"/>
<!-- Ab plate -->
<rect x="22" y="40" width="16" height="8" fill="#d1d5db" rx="1"/>
<!-- Arms -->
<path d="M 14,26 Q 4,36 8,48" stroke="#e2e8f0" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 56,36 52,48" stroke="#e2e8f0" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Blaster -->
<rect x="2" y="44" width="14" height="3" fill="#1e293b" rx="1"/>
<rect x="0" y="42" width="4" height="7" fill="#334155" rx="0.5"/>
<!-- Helmet -->
<path d="M 16,4 Q 30,-2 44,4 L 44,22 L 16,22 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
<!-- Eye visor -->
<rect x="20" y="10" width="8" height="4" fill="#0f172a" rx="0.5"/>
<rect x="32" y="10" width="8" height="4" fill="#0f172a" rx="0.5"/>
<!-- Mouth vent -->
<rect x="26" y="16" width="8" height="3" fill="#0f172a" rx="0.5"/>
<line x1="28" y1="16" x2="28" y2="19" stroke="#334155" stroke-width="0.5"/>
<line x1="30" y1="16" x2="30" y2="19" stroke="#334155" stroke-width="0.5"/>
<line x1="32" y1="16" x2="32" y2="19" stroke="#334155" stroke-width="0.5"/>
</svg>`,

// 3. D&D Goblin
goblin: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Short body - goblin is small -->
<g transform="translate(0,20)">
<!-- Feet -->
<rect x="22" y="60" width="6" height="4" fill="#4d7c0f" rx="1"/>
<rect x="34" y="60" width="6" height="4" fill="#4d7c0f" rx="1"/>
<!-- Legs -->
<rect x="22" y="50" width="6" height="12" fill="#713f12"/>
<rect x="34" y="50" width="6" height="12" fill="#713f12"/>
<!-- Ragged tunic -->
<path d="M 18,28 L 42,28 L 44,54 L 16,54 Z" fill="#713f12"/>
<path d="M 16,52 L 20,54 L 24,50 L 28,54 L 32,50 L 36,54 L 40,50 L 44,54" fill="none" stroke="#713f12" stroke-width="2"/>
<!-- Belt with pouch -->
<rect x="18" y="42" width="24" height="3" fill="#451a03"/>
<rect x="34" y="40" width="6" height="5" fill="#451a03" rx="1"/>
<!-- Arms -->
<path d="M 18,32 Q 10,40 14,48" stroke="#4d7c0f" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 42,32 Q 50,40 46,48" stroke="#4d7c0f" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Dagger in hand -->
<line x1="46" y1="48" x2="54" y2="40" stroke="#94a3b8" stroke-width="2"/>
<line x1="44" y1="48" x2="48" y2="50" stroke="#713f12" stroke-width="2"/>
<!-- Big head -->
<rect x="18" y="6" width="24" height="22" fill="#4d7c0f" rx="5"/>
<!-- Big pointy ears -->
<path d="M 18,14 L 6,8 L 14,18" fill="#65a30d"/>
<path d="M 42,14 L 54,8 L 46,18" fill="#65a30d"/>
<!-- Big yellow eyes -->
<circle cx="25" cy="16" r="3" fill="#fef08a"/>
<circle cx="35" cy="16" r="3" fill="#fef08a"/>
<circle cx="25" cy="16" r="1.5" fill="#1c1917"/>
<circle cx="35" cy="16" r="1.5" fill="#1c1917"/>
<!-- Snaggletooth grin -->
<path d="M 23,23 Q 30,28 37,23" fill="none" stroke="#1c1917" stroke-width="1.5"/>
<line x1="27" y1="23" x2="27" y2="26" stroke="#fef3c7" stroke-width="1.5"/>
<line x1="33" y1="23" x2="33" y2="26" stroke="#fef3c7" stroke-width="1.5"/>
</g>
</svg>`,

// 4. Kryptonite Shard
kryptonite: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Ground glow -->
<ellipse cx="30" cy="82" rx="18" ry="8" fill="#22c55e" opacity="0.15"/>
<!-- Crystal shard body -->
<polygon points="30,8 46,40 42,72 18,72 14,40" fill="#16a34a" stroke="#15803d" stroke-width="1"/>
<!-- Inner crystal facets -->
<polygon points="30,14 40,38 36,64 24,64 20,38" fill="#22c55e"/>
<polygon points="30,20 34,36 32,58 28,58 26,36" fill="#4ade80" opacity="0.5"/>
<!-- Bright center glow -->
<ellipse cx="30" cy="40" rx="6" ry="12" fill="#86efac" opacity="0.4" class="animate-pulse"/>
<!-- Facet lines -->
<line x1="30" y1="8" x2="20" y2="38" stroke="#15803d" stroke-width="0.8"/>
<line x1="30" y1="8" x2="40" y2="38" stroke="#15803d" stroke-width="0.8"/>
<line x1="20" y1="38" x2="18" y2="72" stroke="#15803d" stroke-width="0.8"/>
<line x1="40" y1="38" x2="42" y2="72" stroke="#15803d" stroke-width="0.8"/>
<!-- Small floating fragments -->
<polygon points="8,30 12,22 16,28" fill="#22c55e" opacity="0.6">
  <animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="2s" repeatCount="indefinite"/>
</polygon>
<polygon points="48,24 52,18 54,26" fill="#22c55e" opacity="0.5">
  <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="2.5s" repeatCount="indefinite"/>
</polygon>
<!-- Radiation particles -->
<circle cx="20" cy="20" r="1" fill="#4ade80" opacity="0.4">
  <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" repeatCount="indefinite"/>
</circle>
<circle cx="42" cy="28" r="1" fill="#4ade80" opacity="0.4">
  <animate attributeName="opacity" values="0;0.5;0" dur="1.8s" repeatCount="indefinite"/>
</circle>
</svg>`,

// 5. Borg Drone
trek: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<rect x="20" y="72" width="8" height="12" fill="#1e293b" rx="1"/>
<rect x="32" y="72" width="8" height="12" fill="#1e293b" rx="1"/>
<rect x="20" y="50" width="8" height="24" fill="#0f172a"/>
<rect x="32" y="50" width="8" height="24" fill="#0f172a"/>
<!-- Borg armor body -->
<rect x="12" y="22" width="36" height="30" fill="#1e293b" stroke="#334155" stroke-width="1" rx="2"/>
<!-- Tech implants on body -->
<rect x="16" y="26" width="8" height="8" fill="#0f172a" rx="1"/>
<rect x="36" y="26" width="8" height="8" fill="#0f172a" rx="1"/>
<!-- Blinking lights -->
<circle cx="20" cy="30" r="1.5" fill="#ef4444" class="animate-pulse"/>
<circle cx="40" cy="30" r="1.5" fill="#22c55e" class="animate-pulse"/>
<!-- Tubes/wires on torso -->
<path d="M 22,38 Q 30,42 38,38" fill="none" stroke="#475569" stroke-width="1.5"/>
<path d="M 24,44 Q 30,48 36,44" fill="none" stroke="#475569" stroke-width="1.5"/>
<!-- Arms -->
<path d="M 12,26 Q 2,36 6,48" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 48,26 Q 58,36 54,48" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Mechanical arm attachment -->
<rect x="50" y="44" width="8" height="4" fill="#334155"/>
<path d="M 56,44 L 58,40 M 56,48 L 58,52" stroke="#334155" stroke-width="1.5"/>
<!-- Pale head -->
<rect x="20" y="4" width="20" height="18" fill="#d4d4d8" rx="3"/>
<!-- Cybernetic eye -->
<rect x="22" y="8" width="8" height="6" fill="#0f172a" rx="1"/>
<circle cx="26" cy="11" r="2" fill="#ef4444" class="animate-pulse"/>
<!-- Normal eye -->
<circle cx="35" cy="11" r="2" fill="#0f172a"/>
<circle cx="35" cy="11" r="0.5" fill="#9ca3af"/>
<!-- Implant tubes -->
<path d="M 22,14 L 18,16 L 18,22" stroke="#334155" stroke-width="1.5" fill="none"/>
<path d="M 38,8 L 42,6 L 44,10" stroke="#334155" stroke-width="1.5" fill="none"/>
<!-- Mouth - neutral -->
<line x1="28" y1="18" x2="36" y2="18" stroke="#78716c" stroke-width="1"/>
</svg>`,

// 6. Sith Apprentice
wars: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Dark robe bottom -->
<path d="M 14,48 L 10,84 L 50,84 L 46,48 Z" fill="#0f172a"/>
<path d="M 18,48 L 14,84 L 46,84 L 42,48 Z" fill="#1e293b"/>
<!-- Body/robe upper -->
<rect x="16" y="22" width="28" height="28" fill="#1e293b" rx="2"/>
<!-- Dark sash -->
<path d="M 20,22 L 30,40 L 40,22" fill="#0f172a"/>
<!-- Arms -->
<path d="M 16,26 Q 6,36 10,48" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 44,26 Q 54,36 50,48" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Red lightsaber -->
<rect x="8" y="46" width="4" height="8" fill="#94a3b8" rx="1"/>
<line x1="10" y1="46" x2="10" y2="12" stroke="#ef4444" stroke-width="3" opacity="0.8"/>
<line x1="10" y1="46" x2="10" y2="12" stroke="#fca5a5" stroke-width="1.5" opacity="0.5"/>
<!-- Hood -->
<path d="M 18,22 Q 30,16 42,22 Q 42,4 30,0 Q 18,4 18,22 Z" fill="#0f172a"/>
<!-- Face in hood shadow -->
<rect x="24" y="10" width="12" height="12" fill="#fed7aa" rx="2"/>
<!-- Yellow Sith eyes -->
<circle cx="27" cy="14" r="1.5" fill="#fbbf24"/>
<circle cx="33" cy="14" r="1.5" fill="#fbbf24"/>
<circle cx="27" cy="14" r="0.5" fill="#000"/>
<circle cx="33" cy="14" r="0.5" fill="#000"/>
<!-- Face tattoo -->
<path d="M 24,14 L 26,12" stroke="#ef4444" stroke-width="0.8"/>
<path d="M 36,14 L 34,12" stroke="#ef4444" stroke-width="0.8"/>
</svg>`,

// 7. Temple Boulder (Indiana Jones)
indy: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="22" ry="6" fill="rgba(0,0,0,0.4)"/>
<!-- Large round boulder -->
<circle cx="30" cy="48" r="32" fill="#a8a29e"/>
<!-- Rock texture -->
<circle cx="30" cy="48" r="30" fill="#78716c"/>
<path d="M 12,32 Q 20,28 28,36 Q 36,30 48,34" fill="none" stroke="#57534e" stroke-width="2"/>
<path d="M 8,50 Q 18,46 30,52 Q 42,48 52,54" fill="none" stroke="#57534e" stroke-width="2"/>
<path d="M 14,64 Q 24,60 38,66 Q 46,62 50,68" fill="none" stroke="#57534e" stroke-width="2"/>
<!-- Cracks -->
<path d="M 22,24 L 26,30 L 24,38" stroke="#44403c" stroke-width="1.5" fill="none"/>
<path d="M 40,36 L 38,44 L 42,50" stroke="#44403c" stroke-width="1.5" fill="none"/>
<!-- Highlight -->
<ellipse cx="22" cy="34" rx="8" ry="6" fill="#a8a29e" opacity="0.4"/>
<!-- Rolling motion lines -->
<path d="M 56,70 Q 60,66 58,60" stroke="#78716c" stroke-width="1.5" fill="none"/>
<path d="M 58,72 Q 62,68 60,62" stroke="#78716c" stroke-width="1" fill="none"/>
<!-- Angry face carved in rock -->
<circle cx="22" cy="42" r="4" fill="#44403c"/>
<circle cx="38" cy="42" r="4" fill="#44403c"/>
<circle cx="22" cy="42" r="2" fill="#ef4444" opacity="0.5"/>
<circle cx="38" cy="42" r="2" fill="#ef4444" opacity="0.5"/>
<path d="M 24,56 Q 30,62 36,56" fill="none" stroke="#44403c" stroke-width="3"/>
</svg>`,

// 8. Goblin Shaman
goblin_shaman: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
<g transform="translate(0,16)">
<!-- Feet -->
<rect x="22" y="60" width="6" height="4" fill="#4d7c0f" rx="1"/>
<rect x="34" y="60" width="6" height="4" fill="#4d7c0f" rx="1"/>
<!-- Legs -->
<rect x="22" y="50" width="6" height="12" fill="#713f12"/>
<rect x="34" y="50" width="6" height="12" fill="#713f12"/>
<!-- Purple robe -->
<path d="M 16,26 L 44,26 L 46,56 L 14,56 Z" fill="#7e22ce"/>
<path d="M 14,54 L 18,56 L 22,52 L 26,56 L 30,52 L 34,56 L 38,52 L 42,56 L 46,54" fill="none" stroke="#6b21a8" stroke-width="2"/>
<!-- Bone necklace -->
<circle cx="24" cy="30" r="2" fill="#fef3c7"/>
<circle cx="30" cy="32" r="2" fill="#fef3c7"/>
<circle cx="36" cy="30" r="2" fill="#fef3c7"/>
<!-- Arms -->
<path d="M 16,30 Q 8,38 12,48" stroke="#4d7c0f" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 44,30 Q 52,38 48,48" stroke="#4d7c0f" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Staff with skull -->
<line x1="48" y1="10" x2="48" y2="58" stroke="#713f12" stroke-width="2.5"/>
<circle cx="48" cy="10" r="5" fill="#fef3c7"/>
<circle cx="46" cy="9" r="1" fill="#0f172a"/>
<circle cx="50" cy="9" r="1" fill="#0f172a"/>
<path d="M 46,12 Q 48,14 50,12" fill="none" stroke="#0f172a" stroke-width="0.8"/>
<!-- Big head with hat -->
<rect x="18" y="4" width="24" height="20" fill="#4d7c0f" rx="4"/>
<!-- Wizard hat -->
<path d="M 20,8 L 30,-8 L 40,8 Z" fill="#7e22ce"/>
<rect x="16" y="6" width="28" height="4" fill="#6b21a8" rx="1"/>
<!-- Big ears -->
<path d="M 18,12 L 8,8 L 14,16" fill="#65a30d"/>
<path d="M 42,12 L 52,8 L 46,16" fill="#65a30d"/>
<!-- Glowing eyes -->
<circle cx="25" cy="14" r="2.5" fill="#a78bfa" class="animate-pulse"/>
<circle cx="35" cy="14" r="2.5" fill="#a78bfa" class="animate-pulse"/>
<circle cx="25" cy="14" r="1" fill="#fef3c7"/>
<circle cx="35" cy="14" r="1" fill="#fef3c7"/>
<!-- Crooked mouth -->
<path d="M 25,20 Q 30,24 35,20" fill="none" stroke="#1c1917" stroke-width="1.2"/>
</g>
</svg>`,

// 9. Wasteland Bandit
wasteland_bandit: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<rect x="20" y="74" width="8" height="10" fill="#78350f" rx="1"/>
<rect x="32" y="74" width="8" height="10" fill="#78350f" rx="1"/>
<rect x="20" y="52" width="8" height="24" fill="#713f12"/>
<rect x="32" y="52" width="8" height="24" fill="#713f12"/>
<!-- Leather armor body -->
<rect x="14" y="24" width="32" height="30" fill="#92400e" rx="2"/>
<!-- Patches -->
<rect x="18" y="28" width="6" height="6" fill="#78350f" rx="1"/>
<rect x="36" y="36" width="6" height="6" fill="#78350f" rx="1"/>
<!-- Belt with pouches -->
<rect x="14" y="50" width="32" height="4" fill="#451a03"/>
<rect x="18" y="48" width="5" height="6" fill="#713f12" rx="1"/>
<rect x="38" y="48" width="5" height="6" fill="#713f12" rx="1"/>
<!-- Bandolier -->
<path d="M 18,24 L 42,40" stroke="#451a03" stroke-width="3"/>
<!-- Arms -->
<path d="M 14,28 Q 4,38 8,48" stroke="#92400e" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 56,38 52,48" stroke="#92400e" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Makeshift weapon -->
<line x1="50" y1="46" x2="58" y2="22" stroke="#78350f" stroke-width="3"/>
<rect x="55" y="18" width="6" height="8" fill="#94a3b8" rx="1" transform="rotate(-15 58 22)"/>
<!-- Masked head -->
<rect x="20" y="4" width="20" height="18" fill="#fed7aa" rx="3"/>
<!-- Bandana mask -->
<rect x="18" y="12" width="24" height="8" fill="#991b1b" rx="1"/>
<!-- Goggles -->
<circle cx="25" cy="10" r="4" fill="none" stroke="#1e293b" stroke-width="2"/>
<circle cx="35" cy="10" r="4" fill="none" stroke="#1e293b" stroke-width="2"/>
<circle cx="25" cy="10" r="2" fill="#fbbf24" opacity="0.4"/>
<circle cx="35" cy="10" r="2" fill="#fbbf24" opacity="0.4"/>
<line x1="29" y1="10" x2="31" y2="10" stroke="#1e293b" stroke-width="2"/>
</svg>`,

// 10. DC Parademon
parademon_grunt: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Armored boots -->
<rect x="18" y="72" width="10" height="12" fill="#4d7c0f" rx="2"/>
<rect x="32" y="72" width="10" height="12" fill="#4d7c0f" rx="2"/>
<!-- Green armored legs -->
<rect x="20" y="54" width="8" height="20" fill="#3f6212"/>
<rect x="32" y="54" width="8" height="20" fill="#3f6212"/>
<!-- Armored body -->
<rect x="12" y="22" width="36" height="32" fill="#4d7c0f" stroke="#365314" stroke-width="1" rx="3"/>
<!-- Chest armor details -->
<rect x="18" y="26" width="24" height="10" fill="#365314" rx="1"/>
<!-- Wings -->
<path d="M 12,26 L -4,12 L 4,22 L -2,16 L 10,28" fill="#3f6212" opacity="0.7"/>
<path d="M 48,26 L 64,12 L 56,22 L 62,16 L 50,28" fill="#3f6212" opacity="0.7"/>
<!-- Arms -->
<path d="M 12,26 Q 2,36 6,48" stroke="#4d7c0f" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 48,26 Q 58,36 54,48" stroke="#4d7c0f" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Claws -->
<path d="M 4,47 L 0,52 M 6,48 L 4,54 M 8,47 L 10,52" stroke="#365314" stroke-width="1.5"/>
<path d="M 52,47 L 56,52 M 54,48 L 56,54 M 56,47 L 50,52" stroke="#365314" stroke-width="1.5"/>
<!-- Insectoid head -->
<rect x="18" y="2" width="24" height="20" fill="#65a30d" rx="4"/>
<!-- Red compound eyes -->
<circle cx="24" cy="10" r="4" fill="#dc2626"/>
<circle cx="36" cy="10" r="4" fill="#dc2626"/>
<circle cx="24" cy="10" r="2" fill="#ef4444"/>
<circle cx="36" cy="10" r="2" fill="#ef4444"/>
<!-- Mandibles -->
<path d="M 24,18 L 20,24 M 36,18 L 40,24" stroke="#4d7c0f" stroke-width="2"/>
<!-- Helmet ridge -->
<path d="M 20,4 Q 30,0 40,4" fill="none" stroke="#365314" stroke-width="2"/>
</svg>`,

// 11. TWD Walker Zombie
twd_walker: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Bare feet -->
<rect x="20" y="78" width="8" height="6" fill="#78716c" rx="1"/>
<rect x="32" y="78" width="8" height="6" fill="#78716c" rx="1"/>
<!-- Torn pants -->
<rect x="20" y="52" width="8" height="28" fill="#374151"/>
<rect x="32" y="52" width="8" height="28" fill="#374151"/>
<path d="M 24,72 L 28,76" stroke="#1f2937" stroke-width="1"/>
<path d="M 36,68 L 40,74" stroke="#1f2937" stroke-width="1"/>
<!-- Torn shirt body -->
<rect x="14" y="24" width="32" height="30" fill="#6b7280" rx="2"/>
<!-- Blood stains -->
<circle cx="20" cy="32" r="4" fill="#7f1d1d" opacity="0.5"/>
<circle cx="38" cy="40" r="3" fill="#7f1d1d" opacity="0.4"/>
<!-- Torn sleeve -->
<path d="M 14,28 L 10,30 L 14,34 L 12,36" fill="#6b7280"/>
<!-- Arms - reaching forward -->
<path d="M 14,28 Q 2,34 6,44" stroke="#78716c" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 58,34 54,44" stroke="#78716c" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Bony fingers -->
<path d="M 4,43 L 0,46 M 6,44 L 4,48 M 8,43 L 8,48" stroke="#a8a29e" stroke-width="1"/>
<path d="M 52,43 L 56,46 M 54,44 L 56,48 M 56,43 L 52,48" stroke="#a8a29e" stroke-width="1"/>
<!-- Decaying head -->
<rect x="20" y="4" width="20" height="20" fill="#78716c" rx="4"/>
<!-- Missing flesh/wound -->
<circle cx="38" cy="10" r="4" fill="#991b1b"/>
<!-- Sunken eyes -->
<circle cx="26" cy="12" r="2.5" fill="#0f172a"/>
<circle cx="34" cy="12" r="2.5" fill="#0f172a"/>
<circle cx="26" cy="12" r="1" fill="#9ca3af"/>
<circle cx="34" cy="12" r="1" fill="#9ca3af"/>
<!-- Open mouth -->
<path d="M 24,18 L 36,18 L 34,22 L 26,22 Z" fill="#1c1917"/>
<line x1="28" y1="18" x2="28" y2="20" stroke="#a8a29e" stroke-width="1"/>
<line x1="32" y1="18" x2="32" y2="20" stroke="#a8a29e" stroke-width="1"/>
<!-- Messy hair -->
<path d="M 18,8 Q 22,2 28,6 Q 34,0 42,8" fill="#57534e"/>
</svg>`,

// 12. Caltech Postdoc
caltech_postdoc: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<rect x="22" y="76" width="6" height="8" fill="#374151"/>
<rect x="32" y="76" width="6" height="8" fill="#374151"/>
<rect x="22" y="52" width="6" height="26" fill="#4b5563"/>
<rect x="32" y="52" width="6" height="26" fill="#4b5563"/>
<!-- Lab coat -->
<rect x="14" y="24" width="32" height="30" fill="#f8fafc" rx="2"/>
<!-- Lab coat pockets -->
<rect x="16" y="40" width="8" height="6" fill="#e5e7eb" rx="1"/>
<rect x="36" y="40" width="8" height="6" fill="#e5e7eb" rx="1"/>
<!-- Pen in pocket -->
<rect x="18" y="38" width="1" height="6" fill="#2563eb"/>
<!-- Sweater vest underneath -->
<rect x="20" y="24" width="20" height="14" fill="#c2410c"/>
<!-- Name tag -->
<rect x="34" y="26" width="10" height="4" fill="#fef3c7" rx="0.5"/>
<!-- Arms -->
<path d="M 14,28 Q 6,38 10,48" stroke="#f8fafc" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 54,38 50,48" stroke="#f8fafc" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Test tube in hand -->
<rect x="6" y="44" width="3" height="10" fill="#a5f3fc" rx="1"/>
<rect x="5" y="42" width="5" height="3" fill="#e2e8f0" rx="0.5"/>
<!-- Head -->
<rect x="22" y="4" width="16" height="18" fill="#fed7aa" rx="4"/>
<!-- Messy hair -->
<path d="M 20,8 C 20,2 40,2 40,8 Q 38,4 34,6 Q 30,2 26,6 Q 22,4 20,8" fill="#713f12"/>
<!-- Glasses -->
<circle cx="27" cy="12" r="3" fill="none" stroke="#1e293b" stroke-width="1.5"/>
<circle cx="33" cy="12" r="3" fill="none" stroke="#1e293b" stroke-width="1.5"/>
<line x1="30" y1="12" x2="30" y2="12" stroke="#1e293b" stroke-width="1.5"/>
<!-- Eyes -->
<circle cx="27" cy="12" r="1" fill="#1c1917"/>
<circle cx="33" cy="12" r="1" fill="#1c1917"/>
<!-- Smug smile -->
<path d="M 27,18" Q 30,20 33,18" fill="none" stroke="#92400e" stroke-width="1"/>
</svg>`,

// 13. Comic Book Clerk
comic_clerk: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<rect x="22" y="74" width="6" height="10" fill="#1e293b"/>
<rect x="32" y="74" width="6" height="10" fill="#1e293b"/>
<rect x="22" y="52" width="6" height="24" fill="#334155"/>
<rect x="32" y="52" width="6" height="24" fill="#334155"/>
<!-- Geek t-shirt -->
<rect x="16" y="24" width="28" height="30" fill="#16a34a" rx="2"/>
<!-- Graphic on shirt -->
<text x="22" y="42" fill="#fbbf24" font-size="8">POW!</text>
<!-- Arms -->
<path d="M 16,28 Q 8,38 12,48" stroke="#16a34a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,28 Q 52,38 48,48" stroke="#16a34a" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Comic book in hand -->
<rect x="44" y="44" width="10" height="14" fill="#ef4444" rx="1"/>
<rect x="45" y="46" width="8" height="10" fill="#fef3c7"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="18" fill="#fed7aa" rx="4"/>
<!-- Ponytail -->
<path d="M 18,8 C 18,2 42,2 42,8" fill="#713f12"/>
<path d="M 40,8 Q 46,12 44,20" stroke="#713f12" stroke-width="3" fill="none"/>
<!-- Eyes -->
<circle cx="26" cy="12" r="1.5" fill="#1c1917"/>
<circle cx="34" cy="12" r="1.5" fill="#1c1917"/>
<!-- Goatee -->
<path d="M 27,18 Q 30,22 33,18" fill="#713f12"/>
</svg>`,

// 14. Cupcake Factory Baker
cupcake_baker: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<rect x="22" y="74" width="6" height="10" fill="#f8fafc"/>
<rect x="32" y="74" width="6" height="10" fill="#f8fafc"/>
<rect x="22" y="52" width="6" height="24" fill="#f8fafc"/>
<rect x="32" y="52" width="6" height="24" fill="#f8fafc"/>
<!-- Baker uniform -->
<rect x="14" y="24" width="32" height="30" fill="#f8fafc" rx="2"/>
<!-- Apron -->
<rect x="20" y="30" width="20" height="24" fill="#fecaca" rx="1"/>
<path d="M 20,30 Q 30,28 40,30" fill="none" stroke="#fca5a5" stroke-width="1.5"/>
<!-- Apron strings -->
<path d="M 20,42 L 14,42" stroke="#fecaca" stroke-width="2"/>
<path d="M 40,42 L 46,42" stroke="#fecaca" stroke-width="2"/>
<!-- Arms -->
<path d="M 14,28 Q 6,38 10,48" stroke="#f8fafc" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 54,38 50,48" stroke="#f8fafc" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Rolling pin weapon -->
<rect x="2" y="44" width="14" height="4" fill="#d6b88e" rx="2"/>
<rect x="0" y="43" width="4" height="6" fill="#b8956a" rx="1"/>
<rect x="14" y="43" width="4" height="6" fill="#b8956a" rx="1"/>
<!-- Head -->
<rect x="22" y="4" width="16" height="16" fill="#fed7aa" rx="4"/>
<!-- Chef hat -->
<rect x="18" y="0" width="24" height="6" fill="#f8fafc"/>
<path d="M 18,2 Q 30,-6 42,2" fill="#f8fafc"/>
<!-- Eyes -->
<circle cx="27" cy="12" r="1.5" fill="#1c1917"/>
<circle cx="33" cy="12" r="1.5" fill="#1c1917"/>
<!-- Angry expression -->
<path d="M 27,16 Q 30,14 33,16" fill="none" stroke="#92400e" stroke-width="1.2"/>
</svg>`,

// 15. Chocolate Factory Worker
chocolate_worker: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<rect x="22" y="74" width="6" height="10" fill="#1e293b"/>
<rect x="32" y="74" width="6" height="10" fill="#1e293b"/>
<rect x="22" y="52" width="6" height="24" fill="#374151"/>
<rect x="32" y="52" width="6" height="24" fill="#374151"/>
<!-- Brown uniform -->
<rect x="14" y="24" width="32" height="30" fill="#78350f" rx="2"/>
<!-- Factory logo -->
<circle cx="30" cy="36" r="6" fill="#451a03"/>
<text x="27" y="39" fill="#fbbf24" font-size="6">C</text>
<!-- Hair net -->
<path d="M 20,6 Q 30,0 40,6" fill="none" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="2 1"/>
<!-- Arms -->
<path d="M 14,28 Q 6,38 10,48" stroke="#78350f" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 54,38 50,48" stroke="#78350f" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Chocolate bar weapon -->
<rect x="44" y="44" width="12" height="8" fill="#451a03" rx="1"/>
<line x1="48" y1="44" x2="48" y2="52" stroke="#78350f" stroke-width="0.8"/>
<line x1="52" y1="44" x2="52" y2="52" stroke="#78350f" stroke-width="0.8"/>
<!-- Head -->
<rect x="22" y="2" width="16" height="18" fill="#fed7aa" rx="4"/>
<!-- Cap -->
<rect x="20" y="2" width="20" height="8" fill="#78350f" rx="2"/>
<!-- Eyes -->
<circle cx="27" cy="12" r="1.5" fill="#1c1917"/>
<circle cx="33" cy="12" r="1.5" fill="#1c1917"/>
<!-- Scowl -->
<line x1="26" y1="17" x2="34" y2="17" stroke="#92400e" stroke-width="1.2"/>
</svg>`,

// 16. Online Geek Troll
geek_troll: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<rect x="22" y="74" width="6" height="10" fill="#374151"/>
<rect x="32" y="74" width="6" height="10" fill="#374151"/>
<rect x="22" y="52" width="6" height="24" fill="#4b5563"/>
<rect x="32" y="52" width="6" height="24" fill="#4b5563"/>
<!-- Hoodie -->
<rect x="14" y="24" width="32" height="30" fill="#1e293b" rx="2"/>
<!-- Hood up -->
<path d="M 16,24 Q 30,18 44,24 L 44,10 Q 30,6 16,10 Z" fill="#0f172a"/>
<!-- Keyboard/laptop in hands -->
<rect x="8" y="46" width="22" height="3" fill="#334155" rx="1"/>
<rect x="8" y="44" width="22" height="3" fill="#1e293b" rx="1"/>
<!-- Screen glow -->
<rect x="10" y="44.5" width="18" height="2" fill="#4ade80" opacity="0.3"/>
<!-- Arms -->
<path d="M 14,28 Q 6,36 10,44" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 54,36 50,44" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Face in hood shadow -->
<rect x="22" y="10" width="16" height="14" fill="#e5e7eb" rx="3"/>
<!-- Glasses -->
<rect x="23" y="14" width="5" height="4" fill="none" stroke="#0f172a" stroke-width="1.5" rx="0.5"/>
<rect x="32" y="14" width="5" height="4" fill="none" stroke="#0f172a" stroke-width="1.5" rx="0.5"/>
<line x1="28" y1="16" x2="32" y2="16" stroke="#0f172a" stroke-width="1"/>
<!-- Eyes behind glasses -->
<circle cx="25.5" cy="16" r="1" fill="#1c1917"/>
<circle cx="34.5" cy="16" r="1" fill="#1c1917"/>
<!-- Smirk -->
<path d="M 26,21 Q 30,24 34,21" fill="none" stroke="#78716c" stroke-width="1"/>
<!-- Chat bubbles -->
<rect x="42" y="8" width="14" height="6" fill="#ef4444" rx="2"/>
<text x="44" y="13" fill="white" font-size="4">NOOB</text>
</svg>`,

// 17. Pasadena Tourist
pasadena_tourist: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Sandals -->
<rect x="20" y="78" width="8" height="4" fill="#92400e" rx="1"/>
<rect x="32" y="78" width="8" height="4" fill="#92400e" rx="1"/>
<!-- Khaki shorts -->
<rect x="20" y="52" width="8" height="18" fill="#d6b88e"/>
<rect x="32" y="52" width="8" height="18" fill="#d6b88e"/>
<!-- Bare calves -->
<rect x="22" y="68" width="6" height="12" fill="#fed7aa"/>
<rect x="34" y="68" width="6" height="12" fill="#fed7aa"/>
<!-- Hawaiian shirt -->
<rect x="14" y="24" width="32" height="28" fill="#3b82f6" rx="2"/>
<!-- Flower pattern -->
<circle cx="20" cy="32" r="3" fill="#f472b6" opacity="0.6"/>
<circle cx="34" cy="30" r="3" fill="#facc15" opacity="0.6"/>
<circle cx="24" cy="44" r="3" fill="#fb923c" opacity="0.6"/>
<circle cx="40" cy="42" r="3" fill="#f472b6" opacity="0.6"/>
<!-- Arms -->
<path d="M 14,28 Q 6,38 10,48" stroke="#3b82f6" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 54,38 50,48" stroke="#3b82f6" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Camera -->
<rect x="44" y="44" width="10" height="7" fill="#1e293b" rx="1"/>
<circle cx="49" cy="47" r="2" fill="#334155"/>
<circle cx="49" cy="47" r="1" fill="#64748b"/>
<!-- Head -->
<rect x="22" y="4" width="16" height="16" fill="#fed7aa" rx="4"/>
<!-- Sun hat -->
<rect x="16" y="2" width="28" height="6" fill="#fef3c7" rx="2"/>
<rect x="22" y="0" width="16" height="6" fill="#fef3c7" rx="2"/>
<!-- Sunglasses -->
<rect x="23" y="10" width="5" height="4" fill="#0f172a" rx="1"/>
<rect x="32" y="10" width="5" height="4" fill="#0f172a" rx="1"/>
<line x1="28" y1="12" x2="32" y2="12" stroke="#0f172a" stroke-width="1"/>
<!-- Grin -->
<path d="M 27,16" Q 30,19 33,16" fill="none" stroke="#92400e" stroke-width="1"/>
<!-- Sunscreen on nose -->
<rect x="28" y="12" width="4" height="3" fill="#f8fafc" opacity="0.6" rx="1"/>
</svg>`,

// 18. Comic Con Fanboy
comic_convention_fanboy: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<rect x="20" y="74" width="8" height="10" fill="#374151"/>
<rect x="32" y="74" width="8" height="10" fill="#374151"/>
<rect x="20" y="52" width="8" height="24" fill="#4b5563"/>
<rect x="32" y="52" width="8" height="24" fill="#4b5563"/>
<!-- Cosplay cape -->
<path d="M 18,24 L 12,76 Q 30,72 48,76 L 42,24 Z" fill="#7e22ce" opacity="0.5"/>
<!-- Graphic tee -->
<rect x="16" y="24" width="28" height="28" fill="#0f172a" rx="2"/>
<!-- Convention badge -->
<rect x="36" y="26" width="8" height="10" fill="#fef3c7" rx="1"/>
<rect x="38" y="28" width="4" height="2" fill="#3b82f6"/>
<path d="M 40,26 L 40,22" stroke="#94a3b8" stroke-width="1"/>
<!-- Arms -->
<path d="M 16,28 Q 8,38 12,48" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,28 Q 52,38 48,48" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Foam sword -->
<rect x="44" y="16" width="4" height="36" fill="#94a3b8" rx="1"/>
<rect x="42" y="48" width="8" height="4" fill="#d97706" rx="1"/>
<!-- Head -->
<rect x="22" y="4" width="16" height="16" fill="#fed7aa" rx="4"/>
<!-- Glasses -->
<rect x="23" y="10" width="5" height="4" fill="none" stroke="#1e293b" stroke-width="1.5" rx="0.5"/>
<rect x="32" y="10" width="5" height="4" fill="none" stroke="#1e293b" stroke-width="1.5" rx="0.5"/>
<line x1="28" y1="12" x2="32" y2="12" stroke="#1e293b" stroke-width="1"/>
<!-- Eyes -->
<circle cx="25.5" cy="12" r="1" fill="#1c1917"/>
<circle cx="34.5" cy="12" r="1" fill="#1c1917"/>
<!-- Excited grin -->
<path d="M 27,16 Q 30,20 33,16" fill="none" stroke="#92400e" stroke-width="1.2"/>
<!-- Messy hair -->
<path d="M 20,6 Q 24,0 30,4 Q 36,0 40,6" fill="#713f12"/>
</svg>`,

// 19. Alien Invader
alien_invader: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Thin legs -->
<rect x="24" y="60" width="4" height="22" fill="#6b7280"/>
<rect x="32" y="60" width="4" height="22" fill="#6b7280"/>
<!-- Boots -->
<rect x="22" y="78" width="6" height="6" fill="#4b5563" rx="1"/>
<rect x="32" y="78" width="6" height="6" fill="#4b5563" rx="1"/>
<!-- Spacesuit body -->
<rect x="16" y="28" width="28" height="34" fill="#374151" rx="4"/>
<!-- Chest panel -->
<rect x="22" y="34" width="16" height="10" fill="#1e293b" rx="1"/>
<circle cx="26" cy="38" r="1.5" fill="#22c55e" class="animate-pulse"/>
<circle cx="30" cy="38" r="1.5" fill="#ef4444" class="animate-pulse"/>
<circle cx="34" cy="38" r="1.5" fill="#3b82f6" class="animate-pulse"/>
<!-- Arms - tentacle-like -->
<path d="M 16,32 Q 4,40 8,52 Q 4,56 6,60" stroke="#6b7280" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 44,32 Q 56,40 52,52 Q 56,56 54,60" stroke="#6b7280" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Ray gun -->
<rect x="50" y="56" width="8" height="4" fill="#94a3b8" rx="1"/>
<circle cx="60" cy="58" r="2" fill="#22c55e" class="animate-pulse"/>
<!-- Big alien head -->
<path d="M 14,4 Q 30,-8 46,4 L 44,28 L 16,28 Z" fill="#6b7280"/>
<!-- Big black eyes -->
<ellipse cx="24" cy="14" rx="5" ry="7" fill="#0f172a"/>
<ellipse cx="36" cy="14" rx="5" ry="7" fill="#0f172a"/>
<!-- Eye shine -->
<circle cx="22" cy="12" r="1.5" fill="#4b5563"/>
<circle cx="34" cy="12" r="1.5" fill="#4b5563"/>
<!-- Small mouth -->
<line x1="28" y1="24" x2="32" y2="24" stroke="#4b5563" stroke-width="1.5"/>
</svg>`,

// 20. Meathead Jock
meathead_jock: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Sneakers -->
<rect x="16" y="76" width="12" height="8" fill="#f8fafc" rx="2"/>
<rect x="32" y="76" width="12" height="8" fill="#f8fafc" rx="2"/>
<!-- Shorts -->
<rect x="18" y="52" width="10" height="18" fill="#dc2626"/>
<rect x="32" y="52" width="10" height="18" fill="#dc2626"/>
<!-- Bare legs below shorts -->
<rect x="20" y="68" width="8" height="10" fill="#fed7aa"/>
<rect x="32" y="68" width="8" height="10" fill="#fed7aa"/>
<!-- Jersey -->
<rect x="12" y="22" width="36" height="30" fill="#dc2626" rx="2"/>
<!-- Number -->
<text x="24" y="44" fill="white" font-size="12" font-weight="bold">69</text>
<!-- White trim -->
<rect x="12" y="22" width="36" height="4" fill="#f8fafc"/>
<!-- Thick neck -->
<rect x="24" y="18" width="12" height="8" fill="#fed7aa"/>
<!-- Massive arms -->
<path d="M 12,26 Q -4,36 4,50" stroke="#fed7aa" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M 48,26 Q 64,36 56,50" stroke="#fed7aa" stroke-width="10" fill="none" stroke-linecap="round"/>
<!-- Flexing muscles -->
<circle cx="2" cy="38" r="5" fill="#fed7aa"/>
<circle cx="58" cy="38" r="5" fill="#fed7aa"/>
<!-- Fists -->
<circle cx="4" cy="52" r="4" fill="#fed7aa"/>
<circle cx="56" cy="52" r="4" fill="#fed7aa"/>
<!-- Small head relative to body -->
<rect x="22" y="2" width="16" height="16" fill="#fed7aa" rx="4"/>
<!-- Flat top hair -->
<rect x="20" y="0" width="20" height="6" fill="#d97706" rx="1"/>
<!-- Angry eyes -->
<rect x="24" y="10" width="4" height="3" fill="#1c1917" rx="0.5"/>
<rect x="32" y="10" width="4" height="3" fill="#1c1917" rx="0.5"/>
<!-- Angry eyebrows -->
<line x1="23" y1="8" x2="28" y2="9" stroke="#d97706" stroke-width="2"/>
<line x1="37" y1="9" x2="32" y2="8" stroke="#d97706" stroke-width="2"/>
<!-- Gritting teeth -->
<rect x="26" y="14" width="8" height="3" fill="#f8fafc" rx="0.5"/>
<line x1="28" y1="14" x2="28" y2="17" stroke="#e5e7eb" stroke-width="0.5"/>
<line x1="30" y1="14" x2="30" y2="17" stroke="#e5e7eb" stroke-width="0.5"/>
<line x1="32" y1="14" x2="32" y2="17" stroke="#e5e7eb" stroke-width="0.5"/>
</svg>`,

// 21. Drone Bot (flying enemy)
drone_bot: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="8" ry="2" fill="rgba(0,0,0,0.2)"/>
<!-- Hover glow -->
<ellipse cx="30" cy="78" rx="14" ry="4" fill="#06b6d4" opacity="0.1"/>
<!-- Main body - compact drone -->
<ellipse cx="30" cy="44" rx="14" ry="8" fill="#334155" stroke="#475569" stroke-width="1"/>
<!-- Top dome -->
<ellipse cx="30" cy="40" rx="10" ry="6" fill="#475569"/>
<!-- Camera eye -->
<circle cx="30" cy="42" r="4" fill="#0f172a" stroke="#64748b" stroke-width="1"/>
<circle cx="30" cy="42" r="2" fill="#ef4444" class="animate-pulse"/>
<!-- Propeller arms -->
<line x1="16" y1="38" x2="6" y2="34" stroke="#64748b" stroke-width="2"/>
<line x1="44" y1="38" x2="54" y2="34" stroke="#64748b" stroke-width="2"/>
<!-- Propeller blades -->
<ellipse cx="6" cy="34" rx="6" ry="1.5" fill="#94a3b8" opacity="0.5">
  <animateTransform attributeName="transform" type="rotate" from="0 6 34" to="360 6 34" dur="0.2s" repeatCount="indefinite"/>
</ellipse>
<ellipse cx="54" cy="34" rx="6" ry="1.5" fill="#94a3b8" opacity="0.5">
  <animateTransform attributeName="transform" type="rotate" from="0 54 34" to="360 54 34" dur="0.2s" repeatCount="indefinite"/>
</ellipse>
<!-- Antenna -->
<line x1="30" y1="34" x2="30" y2="28" stroke="#64748b" stroke-width="1"/>
<circle cx="30" cy="27" r="1.5" fill="#22c55e" class="animate-pulse"/>
<!-- Small blaster underneath -->
<rect x="28" y="50" width="4" height="6" fill="#1e293b" rx="1"/>
<circle cx="30" cy="58" r="1" fill="#f59e0b" class="animate-pulse"/>
<!-- Speed lines -->
<line x1="2" y1="40" x2="10" y2="40" stroke="#06b6d4" stroke-width="0.5" opacity="0.3"/>
<line x1="0" y1="44" x2="12" y2="44" stroke="#06b6d4" stroke-width="0.5" opacity="0.4"/>
<line x1="4" y1="48" x2="10" y2="48" stroke="#06b6d4" stroke-width="0.5" opacity="0.3"/>
</svg>`,

// 22. Shield Trooper (tank enemy)
shield_trooper: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Heavy boots -->
<rect x="16" y="74" width="12" height="10" fill="#1e3a5f" rx="2"/>
<rect x="32" y="74" width="12" height="10" fill="#1e3a5f" rx="2"/>
<!-- Thick armored legs -->
<rect x="18" y="54" width="10" height="22" fill="#1e40af"/>
<rect x="32" y="54" width="10" height="22" fill="#1e40af"/>
<!-- Knee pads -->
<rect x="18" y="62" width="10" height="4" fill="#1e3a5f" rx="1"/>
<rect x="32" y="62" width="10" height="4" fill="#1e3a5f" rx="1"/>
<!-- Heavy armor body -->
<rect x="10" y="20" width="40" height="36" fill="#1e40af" rx="4"/>
<rect x="14" y="24" width="32" height="28" fill="#1e3a5f" rx="2"/>
<!-- Chest plate -->
<rect x="18" y="28" width="24" height="12" fill="#1d4ed8" rx="1"/>
<!-- Shield emblem -->
<path d="M 26,30 L 34,30 L 34,38 Q 30,42 26,38 Z" fill="#3b82f6" stroke="#60a5fa" stroke-width="1"/>
<path d="M 28,32 L 32,32 L 32,36 Q 30,38 28,36 Z" fill="#93c5fd"/>
<!-- Shoulder pads -->
<rect x="6" y="20" width="10" height="10" fill="#1e3a5f" rx="2"/>
<rect x="44" y="20" width="10" height="10" fill="#1e3a5f" rx="2"/>
<!-- Arms -->
<path d="M 10,28 Q 0,40 4,52" stroke="#1e40af" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M 50,28 Q 60,40 56,52" stroke="#1e40af" stroke-width="8" fill="none" stroke-linecap="round"/>
<!-- ENERGY SHIELD (left hand) -->
<ellipse cx="2" cy="52" rx="8" ry="14" fill="#3b82f6" opacity="0.2" stroke="#60a5fa" stroke-width="1.5">
  <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/>
</ellipse>
<ellipse cx="2" cy="52" rx="5" ry="10" fill="#60a5fa" opacity="0.1"/>
<!-- Helmet -->
<path d="M 16,4 Q 30,-4 44,4 L 44,22 L 16,22 Z" fill="#1e3a5f"/>
<!-- Visor -->
<rect x="20" y="10" width="20" height="6" fill="#3b82f6" rx="1" opacity="0.8">
  <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
</rect>
<!-- Chin guard -->
<rect x="22" y="18" width="16" height="4" fill="#1e293b" rx="1"/>
</svg>`,

// 23. Healer Drone (support enemy)
healer_drone: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="8" ry="2" fill="rgba(0,0,0,0.2)"/>
<!-- Hover glow -->
<ellipse cx="30" cy="80" rx="12" ry="4" fill="#22c55e" opacity="0.15"/>
<!-- Healing pulse rings -->
<circle cx="30" cy="48" r="20" fill="none" stroke="#22c55e" stroke-width="0.8" opacity="0.2">
  <animate attributeName="r" values="16;24;16" dur="2s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
</circle>
<!-- Main body - rounded medical drone -->
<ellipse cx="30" cy="46" rx="16" ry="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
<!-- Green cross symbol -->
<rect x="27" y="38" width="6" height="16" fill="#16a34a" rx="1"/>
<rect x="22" y="43" width="16" height="6" fill="#16a34a" rx="1"/>
<!-- Inner body highlight -->
<ellipse cx="30" cy="44" rx="12" ry="7" fill="#dcfce7" opacity="0.5"/>
<!-- Side hover pods -->
<ellipse cx="12" cy="44" rx="4" ry="6" fill="#bbf7d0" stroke="#86efac" stroke-width="1"/>
<ellipse cx="48" cy="44" rx="4" ry="6" fill="#bbf7d0" stroke="#86efac" stroke-width="1"/>
<!-- Pod thrusters -->
<rect x="10" y="52" width="4" height="3" fill="#22c55e" opacity="0.5" rx="1">
  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.8s" repeatCount="indefinite"/>
</rect>
<rect x="46" y="52" width="4" height="3" fill="#22c55e" opacity="0.5" rx="1">
  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.8s" repeatCount="indefinite"/>
</rect>
<!-- Top sensor dome -->
<ellipse cx="30" cy="36" rx="6" ry="4" fill="#86efac" opacity="0.6"/>
<circle cx="30" cy="36" r="2" fill="#22c55e" class="animate-pulse"/>
<!-- Heal beam emitter underneath -->
<rect x="28" y="54" width="4" height="4" fill="#4ade80" rx="1"/>
<line x1="30" y1="58" x2="30" y2="68" stroke="#4ade80" stroke-width="2" opacity="0.4">
  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite"/>
</line>
<!-- Small floating heal particles -->
<text x="18" y="34" fill="#22c55e" font-size="6" opacity="0.6">
  <animate attributeName="y" values="36;28;36" dur="2s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite"/>
+</text>
<text x="40" y="38" fill="#22c55e" font-size="6" opacity="0.4">
  <animate attributeName="y" values="40;32;40" dur="2.5s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" repeatCount="indefinite"/>
+</text>
</svg>`

};
