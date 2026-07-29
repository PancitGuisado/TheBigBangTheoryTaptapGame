// ============================================================
// BOSS VECTORS - Detailed SVG sprites for all boss characters
// Loaded after vectors.js, merged via Object.assign
// ============================================================
const bossVectors = {

// 1. The Gorn - Star Trek reptilian alien
gorn: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="18" ry="5" fill="rgba(0,0,0,0.4)"/>
<!-- Legs -->
<rect x="19" y="65" width="9" height="18" fill="#2d5016" rx="2"/>
<rect x="32" y="65" width="9" height="18" fill="#2d5016" rx="2"/>
<rect x="17" y="79" width="12" height="5" fill="#1a3a0a" rx="1"/>
<rect x="31" y="79" width="12" height="5" fill="#1a3a0a" rx="1"/>
<!-- Body -->
<path d="M 15,32 Q 30,28 45,32 L 42,68 L 18,68 Z" fill="#3f6212"/>
<path d="M 22,36 Q 30,32 38,36 L 36,62 L 24,62 Z" fill="#4d7c0f"/>
<!-- Scale pattern -->
<circle cx="26" cy="42" r="2" fill="#365314" opacity="0.5"/>
<circle cx="34" cy="42" r="2" fill="#365314" opacity="0.5"/>
<circle cx="30" cy="50" r="2" fill="#365314" opacity="0.5"/>
<circle cx="26" cy="56" r="2" fill="#365314" opacity="0.5"/>
<circle cx="34" cy="56" r="2" fill="#365314" opacity="0.5"/>
<!-- Arms -->
<path d="M 15,36 Q 4,48 10,58" stroke="#3f6212" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 45,36 Q 56,48 50,58" stroke="#3f6212" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Claws -->
<path d="M 8,57 L 4,62 M 10,58 L 8,64 M 12,57 L 12,63" stroke="#1a3a0a" stroke-width="1.5"/>
<path d="M 48,57 L 52,62 M 50,58 L 52,64 M 52,57 L 48,63" stroke="#1a3a0a" stroke-width="1.5"/>
<!-- Head -->
<rect x="18" y="8" width="24" height="24" fill="#4d7c0f" rx="4"/>
<path d="M 18,20 L 12,24 L 20,28" fill="#3f6212"/>
<!-- Ridged brow -->
<path d="M 20,10 Q 30,6 40,10" fill="none" stroke="#365314" stroke-width="3"/>
<path d="M 22,13 Q 30,10 38,13" fill="none" stroke="#365314" stroke-width="2"/>
<!-- Eyes -->
<circle cx="25" cy="18" r="3" fill="#fef08a"/>
<circle cx="35" cy="18" r="3" fill="#fef08a"/>
<circle cx="25" cy="18" r="1.5" fill="#1a1a00"/>
<circle cx="35" cy="18" r="1.5" fill="#1a1a00"/>
<!-- Mouth -->
<path d="M 22,26 Q 30,30 38,26" fill="none" stroke="#1a3a0a" stroke-width="2"/>
</svg>`,

// 2. The Demogorgon - Stranger Things
demogorgon: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="16" ry="5" fill="rgba(0,0,0,0.5)"/>
<!-- Legs -->
<rect x="20" y="62" width="7" height="22" fill="#1c1917" rx="1"/>
<rect x="33" y="62" width="7" height="22" fill="#1c1917" rx="1"/>
<!-- Body -->
<path d="M 16,30 Q 30,24 44,30 L 40,65 L 20,65 Z" fill="#292524"/>
<path d="M 22,35 L 38,35 L 36,60 L 24,60 Z" fill="#1c1917"/>
<!-- Spine ridges -->
<line x1="30" y1="30" x2="30" y2="65" stroke="#44403c" stroke-width="2"/>
<line x1="26" y1="38" x2="34" y2="38" stroke="#44403c" stroke-width="1"/>
<line x1="26" y1="46" x2="34" y2="46" stroke="#44403c" stroke-width="1"/>
<line x1="26" y1="54" x2="34" y2="54" stroke="#44403c" stroke-width="1"/>
<!-- Arms - long spindly -->
<path d="M 16,34 Q 0,50 6,65" stroke="#292524" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,34 Q 60,50 54,65" stroke="#292524" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Claws -->
<path d="M 4,64 L 0,70 M 6,65 L 4,72 M 8,64 L 10,70" stroke="#78716c" stroke-width="1.5"/>
<path d="M 52,64 L 56,70 M 54,65 L 56,72 M 56,64 L 50,70" stroke="#78716c" stroke-width="1.5"/>
<!-- Head - petal face -->
<circle cx="30" cy="18" r="12" fill="#292524"/>
<!-- Petal mouth opening -->
<path d="M 30,6 L 26,18 L 30,14 L 34,18 Z" fill="#7f1d1d"/>
<path d="M 30,6 L 22,14 L 26,18 Z" fill="#991b1b"/>
<path d="M 30,6 L 38,14 L 34,18 Z" fill="#991b1b"/>
<path d="M 22,14 L 18,20 L 26,18 Z" fill="#7f1d1d"/>
<path d="M 38,14 L 42,20 L 34,18 Z" fill="#7f1d1d"/>
<!-- Inner mouth -->
<circle cx="30" cy="16" r="4" fill="#450a0a"/>
<circle cx="28" cy="15" r="1" fill="#fecaca"/>
<circle cx="32" cy="15" r="1" fill="#fecaca"/>
<circle cx="30" cy="18" r="1" fill="#fecaca"/>
</svg>`,

// 3. The Dungeon Master - D&D wizard
dnd_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="18" ry="5" fill="rgba(0,0,0,0.3)"/>
<!-- Robe bottom -->
<path d="M 14,50 L 10,84 L 50,84 L 46,50 Z" fill="#4c1d95"/>
<path d="M 18,50 L 15,84 L 45,84 L 42,50 Z" fill="#5b21b6"/>
<!-- Robe trim -->
<path d="M 10,82 Q 30,78 50,82" fill="none" stroke="#fbbf24" stroke-width="2"/>
<!-- Belt -->
<rect x="18" y="48" width="24" height="4" fill="#92400e" rx="1"/>
<circle cx="30" cy="50" r="3" fill="#fbbf24"/>
<!-- Body/robe upper -->
<path d="M 16,24 L 44,24 L 42,52 L 18,52 Z" fill="#5b21b6"/>
<!-- Hood -->
<path d="M 16,24 Q 30,18 44,24 Q 44,8 30,4 Q 16,8 16,24 Z" fill="#4c1d95"/>
<!-- Face in hood -->
<rect x="22" y="14" width="16" height="14" fill="#fed7aa" rx="3"/>
<!-- Beard -->
<path d="M 22,24 Q 30,36 38,24" fill="#d1d5db"/>
<path d="M 26,24 Q 30,32 34,24" fill="#e5e7eb"/>
<!-- Eyes -->
<circle cx="27" cy="19" r="1.5" fill="#1e3a8a"/>
<circle cx="33" cy="19" r="1.5" fill="#1e3a8a"/>
<!-- Staff arm -->
<path d="M 44,28 Q 54,36 52,50" stroke="#5b21b6" stroke-width="6" fill="none"/>
<!-- Staff -->
<line x1="52" y1="10" x2="52" y2="80" stroke="#92400e" stroke-width="3"/>
<circle cx="52" cy="8" r="5" fill="#7c3aed" opacity="0.8"/>
<circle cx="52" cy="8" r="3" fill="#c4b5fd" class="animate-pulse"/>
<!-- Book arm -->
<path d="M 16,28 Q 6,36 8,46" stroke="#5b21b6" stroke-width="6" fill="none"/>
<rect x="2" y="42" width="10" height="8" fill="#92400e" rx="1"/>
<rect x="3" y="43" width="8" height="6" fill="#fef3c7"/>
</svg>`,

// 4. Ancient Red Dragon - PROPER dragon
red_dragon: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="24" ry="6" fill="rgba(0,0,0,0.5)"/>
<!-- Wings spread behind -->
<path d="M 30,35 L -2,8 L 6,25 L 0,18 L 10,30 L 4,24 L 16,38" fill="#7f1d1d" stroke="#991b1b" stroke-width="0.5"/>
<path d="M 30,35 L 62,8 L 54,25 L 60,18 L 50,30 L 56,24 L 44,38" fill="#7f1d1d" stroke="#991b1b" stroke-width="0.5"/>
<!-- Tail -->
<path d="M 22,72 Q 8,80 4,74 L 2,76" stroke="#b91c1c" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 0,75 L 4,70 L 2,78" fill="#991b1b"/>
<!-- Hind legs -->
<path d="M 20,65 L 16,78 L 22,78" fill="#991b1b"/>
<path d="M 40,65 L 44,78 L 38,78" fill="#991b1b"/>
<!-- Body -->
<path d="M 16,35 Q 30,28 44,35 L 40,72 L 20,72 Z" fill="#dc2626"/>
<!-- Gold underbelly -->
<path d="M 24,40 Q 30,36 36,40 L 34,68 L 26,68 Z" fill="#d97706"/>
<path d="M 26,44 L 34,44 M 26,50 L 34,50 M 26,56 L 34,56 M 26,62 L 34,62" stroke="#b45309" stroke-width="0.5"/>
<!-- Front arms/claws -->
<path d="M 16,40 Q 8,50 12,58" stroke="#dc2626" stroke-width="5" fill="none"/>
<path d="M 44,40 Q 52,50 48,58" stroke="#dc2626" stroke-width="5" fill="none"/>
<path d="M 10,57 L 8,62 M 12,58 L 12,64 M 14,57 L 16,62" stroke="#7f1d1d" stroke-width="1.5"/>
<path d="M 46,57 L 48,62 M 48,58 L 48,64 M 50,57 L 52,62" stroke="#7f1d1d" stroke-width="1.5"/>
<!-- Neck -->
<path d="M 24,35 Q 22,20 24,12" fill="#dc2626"/>
<path d="M 36,35 Q 38,20 36,12" fill="#dc2626"/>
<!-- Head -->
<rect x="18" y="6" width="24" height="16" fill="#b91c1c" rx="3"/>
<!-- Snout -->
<path d="M 18,16 L 12,20 L 22,22" fill="#991b1b"/>
<!-- Horns -->
<path d="M 22,6 Q 16,-4 10,0" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M 38,6 Q 44,-4 50,0" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- Eyes -->
<circle cx="24" cy="12" r="2.5" fill="#fbbf24"/>
<circle cx="36" cy="12" r="2.5" fill="#fbbf24"/>
<circle cx="24" cy="12" r="1" fill="#000"/>
<circle cx="36" cy="12" r="1" fill="#000"/>
<!-- Fire breath -->
<path d="M 12,20 Q 4,22 -2,18 Q 2,24 -4,22" fill="#f59e0b" opacity="0.7"/>
<path d="M 12,20 Q 6,24 0,22" fill="#ef4444" opacity="0.5"/>
</svg>`,

// 5. Lex Luthor
lex_luthor: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.3)"/>
<rect x="20" y="76" width="8" height="8" fill="#1a1a2e"/>
<rect x="32" y="76" width="8" height="8" fill="#1a1a2e"/>
<rect x="20" y="52" width="8" height="24" fill="#16a34a"/>
<rect x="32" y="52" width="8" height="24" fill="#16a34a"/>
<!-- Power suit body -->
<rect x="14" y="24" width="32" height="30" fill="#15803d" rx="3"/>
<rect x="18" y="28" width="24" height="10" fill="#166534"/>
<!-- Tech lines -->
<line x1="22" y1="30" x2="38" y2="30" stroke="#4ade80" stroke-width="1" opacity="0.6"/>
<line x1="22" y1="34" x2="38" y2="34" stroke="#4ade80" stroke-width="1" opacity="0.6"/>
<!-- Chest reactor -->
<circle cx="30" cy="42" r="4" fill="#166534" stroke="#4ade80" stroke-width="1"/>
<circle cx="30" cy="42" r="2" fill="#86efac" class="animate-pulse"/>
<!-- Arms with gauntlets -->
<path d="M 14,28 Q 4,38 8,48" stroke="#15803d" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 56,38 52,48" stroke="#15803d" stroke-width="7" fill="none" stroke-linecap="round"/>
<rect x="4" y="44" width="8" height="6" fill="#166534" rx="1"/>
<rect x="48" y="44" width="8" height="6" fill="#166534" rx="1"/>
<!-- Bald head -->
<rect x="20" y="4" width="20" height="20" fill="#fde68a" rx="6"/>
<!-- Eyes -->
<rect x="23" y="12" width="4" height="3" fill="#1e3a8a" rx="0.5"/>
<rect x="33" y="12" width="4" height="3" fill="#1e3a8a" rx="0.5"/>
<!-- Stern mouth -->
<line x1="26" y1="19" x2="34" y2="19" stroke="#92400e" stroke-width="1.5"/>
<!-- Eyebrows -->
<line x1="23" y1="10" x2="27" y2="11" stroke="#78350f" stroke-width="1.5"/>
<line x1="33" y1="11" x2="37" y2="10" stroke="#78350f" stroke-width="1.5"/>
</svg>`,

// 6. The Joker
joker_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
<rect x="18" y="68" width="9" height="16" fill="#5b21b6"/>
<rect x="33" y="68" width="9" height="16" fill="#5b21b6"/>
<rect x="16" y="80" width="12" height="4" fill="#3b0764" rx="1"/>
<rect x="32" y="80" width="12" height="4" fill="#3b0764" rx="1"/>
<!-- Suit body -->
<rect x="14" y="26" width="32" height="42" fill="#6d28d9" rx="2"/>
<!-- Suit lapels -->
<polygon points="22,26 30,45 38,26" fill="#15803d"/>
<polygon points="26,26 30,36 34,26" fill="#facc15"/>
<!-- Flower -->
<circle cx="20" cy="32" r="3" fill="#dc2626"/>
<circle cx="20" cy="32" r="1.5" fill="#fbbf24"/>
<!-- Arms -->
<path d="M 14,30 Q 4,42 8,52" stroke="#6d28d9" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 46,30 Q 56,42 52,52" stroke="#6d28d9" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Playing card in hand -->
<rect x="48" y="46" width="8" height="12" fill="white" rx="1" transform="rotate(15 52 52)"/>
<text x="51" y="54" fill="#dc2626" font-size="6" transform="rotate(15 52 52)">♠</text>
<!-- White face -->
<rect x="20" y="6" width="20" height="20" fill="#f8fafc" rx="3"/>
<!-- Green hair -->
<path d="M 16,10 Q 30,-6 44,10 C 42,2 18,2 16,10 Z" fill="#22c55e"/>
<rect x="16" y="8" width="4" height="10" rx="2" fill="#16a34a"/>
<rect x="40" y="8" width="4" height="10" rx="2" fill="#16a34a"/>
<!-- Eyes -->
<circle cx="26" cy="15" r="2" fill="#1e3a8a"/>
<circle cx="34" cy="15" r="2" fill="#1e3a8a"/>
<!-- Exaggerated grin -->
<path d="M 22,20 Q 30,30 38,20" fill="#dc2626"/>
<path d="M 24,21 Q 30,26 36,21" fill="#fecaca"/>
</svg>`,

// 7. Darth Vader
darth_vader: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="18" ry="5" fill="rgba(0,0,0,0.4)"/>
<!-- Cape -->
<path d="M 12,24 L 6,82 Q 30,86 54,82 L 48,24 Z" fill="#0f172a"/>
<!-- Boots -->
<rect x="18" y="72" width="10" height="12" fill="#1e293b" rx="2"/>
<rect x="32" y="72" width="10" height="12" fill="#1e293b" rx="2"/>
<!-- Legs -->
<rect x="20" y="55" width="8" height="18" fill="#1e293b"/>
<rect x="32" y="55" width="8" height="18" fill="#1e293b"/>
<!-- Body armor -->
<rect x="14" y="22" width="32" height="34" fill="#1e293b" rx="3"/>
<!-- Chest panel -->
<rect x="22" y="30" width="16" height="12" fill="#0f172a" rx="1"/>
<circle cx="26" cy="34" r="1.5" fill="#ef4444"/>
<circle cx="30" cy="34" r="1.5" fill="#22c55e"/>
<circle cx="34" cy="34" r="1.5" fill="#3b82f6"/>
<rect x="24" y="38" width="12" height="2" fill="#64748b"/>
<!-- Belt -->
<rect x="14" y="52" width="32" height="4" fill="#334155"/>
<rect x="26" y="51" width="8" height="6" fill="#475569" rx="1"/>
<!-- Arms -->
<path d="M 14,26 Q 4,38 8,50" stroke="#1e293b" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 56,38 52,50" stroke="#1e293b" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Lightsaber -->
<line x1="6" y1="50" x2="6" y2="14" stroke="#ef4444" stroke-width="3" opacity="0.8"/>
<line x1="6" y1="50" x2="6" y2="14" stroke="#fca5a5" stroke-width="1.5" opacity="0.6"/>
<rect x="4" y="48" width="4" height="8" fill="#94a3b8" rx="1"/>
<!-- Helmet -->
<path d="M 16,6 Q 30,-2 44,6 L 44,22 L 16,22 Z" fill="#1e293b"/>
<path d="M 18,22 L 42,22 L 40,14 L 20,14 Z" fill="#0f172a"/>
<!-- Mask details -->
<path d="M 20,14 Q 30,12 40,14" fill="none" stroke="#334155" stroke-width="1.5"/>
<!-- Eyes -->
<rect x="22" y="15" width="6" height="3" fill="#334155" rx="0.5"/>
<rect x="32" y="15" width="6" height="3" fill="#334155" rx="0.5"/>
<!-- Breathing apparatus -->
<path d="M 26,20 Q 30,22 34,20" fill="#334155"/>
</svg>`,

// 8. Xenomorph Queen
xenomorph_queen: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="16" ry="5" fill="rgba(0,0,0,0.5)"/>
<!-- Tail -->
<path d="M 34,72 Q 50,68 56,60 L 58,56" stroke="#0f172a" stroke-width="3" fill="none"/>
<path d="M 56,54 L 60,58 L 56,62" fill="#0f172a"/>
<!-- Legs -->
<rect x="20" y="60" width="6" height="24" fill="#0f172a" rx="1"/>
<rect x="34" y="60" width="6" height="24" fill="#0f172a" rx="1"/>
<!-- Body - biomechanical -->
<rect x="16" y="28" width="28" height="34" fill="#1e293b" rx="4"/>
<!-- Ribbing -->
<line x1="18" y1="34" x2="42" y2="34" stroke="#0f172a" stroke-width="2.5"/>
<line x1="18" y1="40" x2="42" y2="40" stroke="#0f172a" stroke-width="2.5"/>
<line x1="18" y1="46" x2="42" y2="46" stroke="#0f172a" stroke-width="2.5"/>
<line x1="18" y1="52" x2="42" y2="52" stroke="#0f172a" stroke-width="2.5"/>
<!-- Arms - spindly -->
<path d="M 16,32 Q -2,42 6,56" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 44,32 Q 62,42 54,56" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Claws -->
<path d="M 4,55 L 0,60 M 6,56 L 4,62 M 8,55 L 10,60" stroke="#334155" stroke-width="1.5"/>
<path d="M 52,55 L 56,60 M 54,56 L 56,62 M 56,55 L 50,60" stroke="#334155" stroke-width="1.5"/>
<!-- Elongated crown head -->
<g transform="translate(30,18)">
<path d="M -10,0 C -10,-18 10,-18 10,0 L 22,-14 C 14,-28 -14,-28 -22,-14 Z" fill="#0f172a"/>
<rect x="-8" y="0" width="16" height="10" fill="#1e293b" rx="2"/>
<!-- Inner jaw glow -->
<path d="M -5,6 L 5,6" stroke="#86efac" stroke-width="2" class="animate-pulse"/>
<circle cx="-4" cy="4" r="1" fill="#86efac" opacity="0.5"/>
<circle cx="4" cy="4" r="1" fill="#86efac" opacity="0.5"/>
</g>
</svg>`,

// 9. Greek Minotaur
minotaur: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="18" ry="5" fill="rgba(0,0,0,0.4)"/>
<!-- Hooved legs -->
<rect x="18" y="60" width="10" height="20" fill="#78350f" rx="2"/>
<rect x="32" y="60" width="10" height="20" fill="#78350f" rx="2"/>
<rect x="18" y="78" width="10" height="6" fill="#451a03" rx="1"/>
<rect x="32" y="78" width="10" height="6" fill="#451a03" rx="1"/>
<!-- Fur legs -->
<path d="M 18,58 Q 14,62 18,64" fill="#92400e"/>
<path d="M 42,58 Q 46,62 42,64" fill="#92400e"/>
<!-- Muscular body -->
<path d="M 12,28 Q 30,22 48,28 L 44,62 L 16,62 Z" fill="#92400e"/>
<!-- Chest -->
<path d="M 22,32 Q 30,28 38,32 L 36,55 L 24,55 Z" fill="#a16207"/>
<!-- Abs lines -->
<line x1="30" y1="34" x2="30" y2="54" stroke="#78350f" stroke-width="1"/>
<line x1="24" y1="40" x2="36" y2="40" stroke="#78350f" stroke-width="0.8"/>
<line x1="24" y1="48" x2="36" y2="48" stroke="#78350f" stroke-width="0.8"/>
<!-- Arms - muscular -->
<path d="M 12,30 Q 0,42 6,54" stroke="#92400e" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M 48,30 Q 60,42 54,54" stroke="#92400e" stroke-width="8" fill="none" stroke-linecap="round"/>
<!-- Battle axe (right hand) -->
<line x1="54" y1="54" x2="58" y2="20" stroke="#78350f" stroke-width="2.5"/>
<path d="M 54,22 L 62,16 L 60,26 Z" fill="#94a3b8"/>
<path d="M 54,22 L 62,16 L 58,18" fill="#cbd5e1"/>
<!-- Bull head -->
<rect x="18" y="4" width="24" height="22" fill="#78350f" rx="4"/>
<rect x="22" y="12" width="16" height="14" fill="#a16207" rx="2"/>
<!-- Horns -->
<path d="M 18,10 Q 8,-2 4,6" stroke="#e5e7eb" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 42,10 Q 52,-2 56,6" stroke="#e5e7eb" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Nose ring -->
<circle cx="30" cy="22" r="3" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
<!-- Eyes -->
<circle cx="25" cy="14" r="2" fill="#ef4444"/>
<circle cx="35" cy="14" r="2" fill="#ef4444"/>
<circle cx="25" cy="14" r="1" fill="#000"/>
<circle cx="35" cy="14" r="1" fill="#000"/>
<!-- Nostrils -->
<circle cx="27" cy="20" r="1.5" fill="#451a03"/>
<circle cx="33" cy="20" r="1.5" fill="#451a03"/>
</svg>`,

// 10. Plasma Goliath Mech
scifi_mech: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="22" ry="6" fill="rgba(0,0,0,0.4)"/>
<!-- Heavy legs -->
<rect x="14" y="56" width="10" height="28" fill="#334155" stroke="#1e293b" stroke-width="2" rx="2"/>
<rect x="36" y="56" width="10" height="28" fill="#334155" stroke="#1e293b" stroke-width="2" rx="2"/>
<!-- Knee joints -->
<circle cx="19" cy="66" r="3" fill="#475569" stroke="#1e293b" stroke-width="1"/>
<circle cx="41" cy="66" r="3" fill="#475569" stroke="#1e293b" stroke-width="1"/>
<!-- Main chassis -->
<rect x="8" y="18" width="44" height="40" fill="#475569" stroke="#1e293b" stroke-width="2" rx="4"/>
<!-- Inner panel -->
<rect x="14" y="22" width="32" height="14" fill="#1e293b" rx="2"/>
<!-- Red visor -->
<rect x="18" y="26" width="24" height="6" fill="#ef4444" rx="1" class="animate-pulse"/>
<rect x="20" y="27" width="20" height="4" fill="#fca5a5" opacity="0.3"/>
<!-- Power core -->
<circle cx="30" cy="46" r="7" fill="#0f172a" stroke="#334155" stroke-width="2"/>
<circle cx="30" cy="46" r="4" fill="#06b6d4" class="animate-pulse"/>
<circle cx="30" cy="46" r="2" fill="#ecfeff"/>
<!-- Shoulder cannons -->
<rect x="0" y="16" width="8" height="22" fill="#1e293b" rx="2"/>
<rect x="52" y="16" width="8" height="22" fill="#1e293b" rx="2"/>
<circle cx="4" cy="18" r="3" fill="#475569" stroke="#334155" stroke-width="1"/>
<circle cx="56" cy="18" r="3" fill="#475569" stroke="#334155" stroke-width="1"/>
<!-- Arms -->
<rect x="2" y="36" width="6" height="20" fill="#334155" rx="1"/>
<rect x="52" y="36" width="6" height="20" fill="#334155" rx="1"/>
<!-- Head unit -->
<rect x="20" y="4" width="20" height="14" fill="#475569" stroke="#1e293b" stroke-width="2" rx="2"/>
<rect x="24" y="8" width="12" height="4" fill="#ef4444" rx="1"/>
<!-- Antenna -->
<line x1="30" y1="4" x2="30" y2="-2" stroke="#64748b" stroke-width="1.5"/>
<circle cx="30" cy="-3" r="1.5" fill="#ef4444"/>
</svg>`,

// 11. Evil Wil Wheaton
evil_wil: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.3)"/>
<rect x="20" y="76" width="8" height="8" fill="#1e293b"/>
<rect x="32" y="76" width="8" height="8" fill="#1e293b"/>
<rect x="20" y="52" width="8" height="24" fill="#334155"/>
<rect x="32" y="52" width="8" height="24" fill="#334155"/>
<!-- Dark hoodie body -->
<rect x="14" y="24" width="32" height="30" fill="#1e293b" rx="3"/>
<path d="M 14,24 Q 30,20 46,24" fill="#0f172a"/>
<!-- Hoodie strings -->
<line x1="26" y1="24" x2="26" y2="34" stroke="#64748b" stroke-width="1"/>
<line x1="34" y1="24" x2="34" y2="34" stroke="#64748b" stroke-width="1"/>
<!-- Arms -->
<path d="M 14,28 Q 4,38 8,50" stroke="#1e293b" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 56,38 52,50" stroke="#1e293b" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Bowling ball in hand -->
<circle cx="8" cy="52" r="6" fill="#1e293b" stroke="#475569" stroke-width="1"/>
<circle cx="6" cy="50" r="1" fill="#334155"/>
<circle cx="9" cy="49" r="1" fill="#334155"/>
<circle cx="7" cy="53" r="1" fill="#334155"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="20" fill="#fed7aa" rx="4"/>
<!-- Beard -->
<rect x="20" y="16" width="20" height="8" fill="#57534e" rx="2"/>
<!-- Evil smirk -->
<path d="M 24,20 Q 30,24 36,18" fill="none" stroke="#292524" stroke-width="1.5"/>
<!-- Eyes - sinister -->
<circle cx="26" cy="12" r="2" fill="#1c1917"/>
<circle cx="34" cy="12" r="2" fill="#1c1917"/>
<circle cx="27" cy="11" r="0.5" fill="white"/>
<circle cx="35" cy="11" r="0.5" fill="white"/>
<!-- Eyebrows - evil -->
<line x1="23" y1="9" x2="28" y2="10" stroke="#292524" stroke-width="1.5"/>
<line x1="32" y1="10" x2="37" y2="9" stroke="#292524" stroke-width="1.5"/>
<!-- Hair -->
<path d="M 20,8 C 20,2 40,2 40,8" fill="#44403c"/>
</svg>`,

// 12. The Broken Elevator
broken_elevator: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="20" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Elevator shaft -->
<rect x="8" y="4" width="44" height="80" fill="#64748b" rx="2"/>
<!-- Elevator doors -->
<rect x="10" y="6" width="19" height="76" fill="#94a3b8" stroke="#475569" stroke-width="1"/>
<rect x="31" y="6" width="19" height="76" fill="#94a3b8" stroke="#475569" stroke-width="1"/>
<!-- Door gap -->
<rect x="28" y="6" width="4" height="76" fill="#0f172a"/>
<!-- Menacing eyes in gap -->
<circle cx="30" cy="36" r="3" fill="#ef4444" class="animate-pulse"/>
<circle cx="30" cy="48" r="3" fill="#ef4444" class="animate-pulse"/>
<!-- Dents and damage -->
<path d="M 14,20 L 18,24 L 14,28" fill="none" stroke="#475569" stroke-width="2"/>
<path d="M 44,40 L 40,44 L 44,48" fill="none" stroke="#475569" stroke-width="2"/>
<!-- Sparking wires top -->
<path d="M 20,8 L 18,2 M 22,6 L 24,0 M 26,8 L 24,4" stroke="#fbbf24" stroke-width="1.5"/>
<circle cx="18" cy="2" r="2" fill="#fbbf24" opacity="0.6" class="animate-ping"/>
<circle cx="24" cy="0" r="1.5" fill="#f59e0b" opacity="0.5" class="animate-ping"/>
<!-- Sparks bottom -->
<path d="M 36,80 L 38,86 M 40,82 L 42,86" stroke="#fbbf24" stroke-width="1"/>
<!-- OUT OF ORDER sign -->
<rect x="13" y="54" width="34" height="12" fill="#fef3c7" rx="1" transform="rotate(-5 30 60)"/>
<text x="16" y="62" fill="#dc2626" font-size="5" font-weight="bold" transform="rotate(-5 30 60)">OUT OF</text>
<text x="16" y="64" fill="#dc2626" font-size="5" font-weight="bold" transform="rotate(-5 30 60)">ORDER!</text>
<!-- Caution tape -->
<path d="M 8,70 L 52,64" stroke="#fbbf24" stroke-width="3"/>
<path d="M 8,72 L 52,66" stroke="#000" stroke-width="3" stroke-dasharray="4 4"/>
<!-- Floor indicator -->
<rect x="22" y="10" width="16" height="8" fill="#0f172a" rx="1"/>
<text x="28" y="16" fill="#ef4444" font-size="7" font-weight="bold">4</text>
</svg>`,

// 13. Batman
batman_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Cape -->
<path d="M 14,24 L 4,80 Q 16,74 20,82 Q 24,78 30,82 Q 36,78 40,82 Q 44,74 56,80 L 46,24 Z" fill="#0f172a"/>
<!-- Boots -->
<rect x="18" y="72" width="10" height="12" fill="#1e293b" rx="2"/>
<rect x="32" y="72" width="10" height="12" fill="#1e293b" rx="2"/>
<path d="M 18,72 L 14,68 L 18,66" fill="#1e293b"/>
<path d="M 42,72 L 46,68 L 42,66" fill="#1e293b"/>
<!-- Legs -->
<rect x="20" y="55" width="8" height="18" fill="#475569"/>
<rect x="32" y="55" width="8" height="18" fill="#475569"/>
<!-- Body -->
<rect x="14" y="22" width="32" height="34" fill="#475569" rx="2"/>
<!-- Bat symbol -->
<path d="M 22,36 Q 26,32 30,36 Q 34,32 38,36 L 36,42 Q 30,38 24,42 Z" fill="#1e293b"/>
<!-- Utility belt -->
<rect x="14" y="52" width="32" height="4" fill="#fbbf24"/>
<rect x="18" y="51" width="4" height="6" fill="#d97706" rx="0.5"/>
<rect x="24" y="51" width="4" height="6" fill="#d97706" rx="0.5"/>
<rect x="32" y="51" width="4" height="6" fill="#d97706" rx="0.5"/>
<rect x="38" y="51" width="4" height="6" fill="#d97706" rx="0.5"/>
<!-- Arms -->
<path d="M 14,26 Q 4,38 8,48" stroke="#475569" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 56,38 52,48" stroke="#475569" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Gauntlets with fins -->
<rect x="4" y="40" width="8" height="10" fill="#1e293b" rx="1"/>
<rect x="48" y="40" width="8" height="10" fill="#1e293b" rx="1"/>
<path d="M 4,42 L 0,38 M 4,46 L -2,44" stroke="#1e293b" stroke-width="2"/>
<path d="M 56,42 L 60,38 M 56,46 L 62,44" stroke="#1e293b" stroke-width="2"/>
<!-- Cowl -->
<path d="M 16,6 Q 30,-2 44,6 L 44,24 L 16,24 Z" fill="#1e293b"/>
<!-- Ears -->
<path d="M 20,6 L 16,-4 L 24,4" fill="#1e293b"/>
<path d="M 40,6 L 44,-4 L 36,4" fill="#1e293b"/>
<!-- Face -->
<rect x="20" y="10" width="20" height="14" fill="#fed7aa" rx="2"/>
<!-- White eyes -->
<path d="M 22,14 L 26,12 L 28,16 Z" fill="white"/>
<path d="M 38,14 L 34,12 L 32,16 Z" fill="white"/>
<!-- Jaw -->
<line x1="24" y1="20" x2="36" y2="20" stroke="#c2410c" stroke-width="1.5"/>
</svg>`,

// 14. Superman
superman_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Cape -->
<path d="M 16,24 L 8,82 Q 30,78 52,82 L 44,24 Z" fill="#dc2626"/>
<!-- Red boots -->
<rect x="18" y="72" width="10" height="12" fill="#dc2626" rx="2"/>
<rect x="32" y="72" width="10" height="12" fill="#dc2626" rx="2"/>
<!-- Blue legs -->
<rect x="20" y="55" width="8" height="18" fill="#1d4ed8"/>
<rect x="32" y="55" width="8" height="18" fill="#1d4ed8"/>
<!-- Red trunks -->
<path d="M 16,50 L 44,50 L 42,58 L 18,58 Z" fill="#dc2626"/>
<rect x="24" y="50" width="12" height="3" fill="#fbbf24"/>
<!-- Blue body -->
<rect x="14" y="22" width="32" height="30" fill="#2563eb" rx="2"/>
<!-- S shield -->
<path d="M 24,30 L 36,30 L 38,42 L 22,42 Z" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5"/>
<text x="27" y="40" fill="#fbbf24" font-size="10" font-weight="bold">S</text>
<!-- Arms -->
<path d="M 14,26 Q 4,36 8,48" stroke="#2563eb" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 56,36 52,48" stroke="#2563eb" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Hands -->
<circle cx="8" cy="49" r="3" fill="#fed7aa"/>
<circle cx="52" cy="49" r="3" fill="#fed7aa"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="20" fill="#fed7aa" rx="4"/>
<!-- Hair curl -->
<path d="M 18,8 C 18,0 42,0 42,8" fill="#1e293b"/>
<path d="M 28,6 Q 26,2 30,4" fill="#1e293b"/>
<!-- Eyes -->
<circle cx="26" cy="14" r="2" fill="#1e40af"/>
<circle cx="34" cy="14" r="2" fill="#1e40af"/>
<!-- Jaw -->
<rect x="24" y="18" width="12" height="4" fill="#fcd34d" rx="1" opacity="0"/>
<line x1="26" y1="20" x2="34" y2="20" stroke="#c2410c" stroke-width="1"/>
</svg>`,

// 15. Wonder Woman
wonderwoman_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Red boots -->
<rect x="18" y="68" width="9" height="16" fill="#dc2626" rx="2"/>
<rect x="33" y="68" width="9" height="16" fill="#dc2626" rx="2"/>
<!-- Legs -->
<rect x="20" y="54" width="7" height="16" fill="#fed7aa"/>
<rect x="33" y="54" width="7" height="16" fill="#fed7aa"/>
<!-- Blue skirt with stars -->
<path d="M 14,44 L 46,44 L 48,56 L 12,56 Z" fill="#1d4ed8"/>
<text x="18" y="53" fill="white" font-size="4">★ ★ ★</text>
<!-- Red/gold corset -->
<rect x="14" y="22" width="32" height="22" fill="#dc2626" rx="2"/>
<path d="M 22,22 L 30,30 L 38,22" fill="#fbbf24"/>
<path d="M 24,24 L 30,28 L 36,24" fill="#f59e0b"/>
<!-- Gold belt -->
<rect x="14" y="42" width="32" height="3" fill="#fbbf24"/>
<!-- Arms -->
<path d="M 14,26 Q 4,36 8,46" stroke="#fed7aa" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 56,36 52,46" stroke="#fed7aa" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Silver bracelets -->
<rect x="4" y="40" width="8" height="4" fill="#e2e8f0" rx="1"/>
<rect x="48" y="40" width="8" height="4" fill="#e2e8f0" rx="1"/>
<!-- Lasso -->
<path d="M 48,44 Q 56,50 52,58 Q 48,64 52,70" stroke="#fbbf24" stroke-width="2" fill="none"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="18" fill="#fed7aa" rx="4"/>
<!-- Long dark hair -->
<path d="M 18,8 C 18,0 42,0 42,8 L 44,24 L 16,24 Z" fill="#1e1b18"/>
<rect x="16" y="12" width="4" height="16" fill="#1e1b18" rx="1"/>
<rect x="40" y="12" width="4" height="16" fill="#1e1b18" rx="1"/>
<!-- Tiara -->
<path d="M 20,8 L 30,4 L 40,8" fill="none" stroke="#fbbf24" stroke-width="2"/>
<circle cx="30" cy="5" r="1.5" fill="#ef4444"/>
<!-- Eyes -->
<circle cx="26" cy="12" r="1.5" fill="#1e40af"/>
<circle cx="34" cy="12" r="1.5" fill="#1e40af"/>
<!-- Smile -->
<path d="M 27,17 Q 30,20 33,17" fill="none" stroke="#be123c" stroke-width="1.2"/>
</svg>`,

// 16. Iron Man
ironman_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Red boots -->
<rect x="18" y="72" width="10" height="12" fill="#dc2626" rx="2"/>
<rect x="32" y="72" width="10" height="12" fill="#dc2626" rx="2"/>
<!-- Gold leg segments -->
<rect x="20" y="56" width="8" height="8" fill="#d97706"/>
<rect x="32" y="56" width="8" height="8" fill="#d97706"/>
<!-- Red thighs -->
<rect x="20" y="48" width="8" height="10" fill="#dc2626"/>
<rect x="32" y="48" width="8" height="10" fill="#dc2626"/>
<!-- Red body -->
<rect x="14" y="22" width="32" height="28" fill="#dc2626" rx="3"/>
<!-- Gold abs section -->
<rect x="20" y="36" width="20" height="12" fill="#d97706" rx="1"/>
<!-- Arc reactor -->
<circle cx="30" cy="30" r="5" fill="#0f172a" stroke="#67e8f9" stroke-width="1.5"/>
<circle cx="30" cy="30" r="3" fill="#22d3ee" class="animate-pulse"/>
<circle cx="30" cy="30" r="1.5" fill="#ecfeff"/>
<!-- Arms -->
<path d="M 14,26 Q 4,36 8,48" stroke="#dc2626" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 56,36 52,48" stroke="#dc2626" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Gold forearms -->
<rect x="4" y="42" width="8" height="8" fill="#d97706" rx="1"/>
<rect x="48" y="42" width="8" height="8" fill="#d97706" rx="1"/>
<!-- Repulsor hands -->
<circle cx="8" cy="52" r="3" fill="#d97706"/>
<circle cx="8" cy="52" r="1.5" fill="#22d3ee" class="animate-pulse"/>
<circle cx="52" cy="52" r="3" fill="#d97706"/>
<circle cx="52" cy="52" r="1.5" fill="#22d3ee" class="animate-pulse"/>
<!-- Helmet -->
<path d="M 16,4 Q 30,-4 44,4 L 44,22 L 16,22 Z" fill="#dc2626" />
<!-- Gold faceplate -->
<path d="M 20,10 L 40,10 L 42,22 L 18,22 Z" fill="#d97706"/>
<!-- Eye slits -->
<rect x="22" y="14" width="6" height="3" fill="#ecfeff" rx="0.5"/>
<rect x="32" y="14" width="6" height="3" fill="#ecfeff" rx="0.5"/>
<!-- Mouth slit -->
<line x1="24" y1="20" x2="36" y2="20" stroke="#92400e" stroke-width="1"/>
</svg>`,

// 17. Thanos
thanos_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="18" ry="5" fill="rgba(0,0,0,0.4)"/>
<!-- Boots -->
<rect x="16" y="72" width="12" height="12" fill="#d97706" rx="2"/>
<rect x="32" y="72" width="12" height="12" fill="#d97706" rx="2"/>
<!-- Blue legs -->
<rect x="18" y="55" width="10" height="18" fill="#1d4ed8"/>
<rect x="32" y="55" width="10" height="18" fill="#1d4ed8"/>
<!-- Golden armor body -->
<rect x="10" y="20" width="40" height="36" fill="#d97706" rx="4"/>
<rect x="14" y="24" width="32" height="28" fill="#b45309" rx="2"/>
<!-- Blue inner suit -->
<rect x="18" y="28" width="24" height="22" fill="#1d4ed8" rx="1"/>
<!-- Armor details -->
<line x1="14" y1="32" x2="46" y2="32" stroke="#92400e" stroke-width="1"/>
<line x1="14" y1="40" x2="46" y2="40" stroke="#92400e" stroke-width="1"/>
<!-- Arms - massive -->
<path d="M 10,24 Q -4,38 4,52" stroke="#7e22ce" stroke-width="9" fill="none" stroke-linecap="round"/>
<path d="M 50,24 Q 64,38 56,52" stroke="#7e22ce" stroke-width="9" fill="none" stroke-linecap="round"/>
<!-- Infinity Gauntlet (left hand) -->
<rect x="0" y="50" width="8" height="8" fill="#fbbf24" rx="1"/>
<!-- Gems on gauntlet -->
<circle cx="2" cy="52" r="1.2" fill="#ef4444"/>
<circle cx="4" cy="52" r="1.2" fill="#f97316"/>
<circle cx="6" cy="52" r="1.2" fill="#fbbf24"/>
<circle cx="2" cy="55" r="1.2" fill="#22c55e"/>
<circle cx="4" cy="55" r="1.2" fill="#3b82f6"/>
<circle cx="6" cy="55" r="1.2" fill="#a855f7"/>
<!-- Regular hand -->
<circle cx="56" cy="53" r="4" fill="#7e22ce"/>
<!-- Purple head -->
<rect x="18" y="2" width="24" height="20" fill="#7e22ce" rx="5"/>
<!-- Chin ridges -->
<line x1="24" y1="16" x2="24" y2="22" stroke="#581c87" stroke-width="1.5"/>
<line x1="28" y1="16" x2="28" y2="22" stroke="#581c87" stroke-width="1.5"/>
<line x1="32" y1="16" x2="32" y2="22" stroke="#581c87" stroke-width="1.5"/>
<line x1="36" y1="16" x2="36" y2="22" stroke="#581c87" stroke-width="1.5"/>
<!-- Eyes -->
<circle cx="25" cy="10" r="2" fill="#1e3a8a"/>
<circle cx="35" cy="10" r="2" fill="#1e3a8a"/>
<!-- Helmet/crown -->
<path d="M 18,6 Q 30,-2 42,6" fill="none" stroke="#d97706" stroke-width="2.5"/>
</svg>`,

// 18. The Flash
flash_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Speed lines -->
<line x1="0" y1="30" x2="12" y2="30" stroke="#fbbf24" stroke-width="1" opacity="0.4"/>
<line x1="0" y1="40" x2="10" y2="40" stroke="#fbbf24" stroke-width="1" opacity="0.3"/>
<line x1="0" y1="50" x2="14" y2="50" stroke="#fbbf24" stroke-width="1" opacity="0.4"/>
<!-- Yellow boots -->
<rect x="20" y="72" width="8" height="12" fill="#fbbf24" rx="2"/>
<rect x="32" y="72" width="8" height="12" fill="#fbbf24" rx="2"/>
<!-- Red legs -->
<rect x="21" y="55" width="7" height="18" fill="#dc2626"/>
<rect x="33" y="55" width="7" height="18" fill="#dc2626"/>
<!-- Red body -->
<rect x="16" y="22" width="28" height="34" fill="#dc2626" rx="2"/>
<!-- Lightning bolt emblem -->
<polygon points="28,28 32,28 27,40 31,38 25,50 34,36 30,38" fill="#fbbf24"/>
<!-- Yellow belt -->
<rect x="16" y="52" width="28" height="3" fill="#fbbf24"/>
<!-- Arms -->
<path d="M 16,26 Q 6,36 10,46" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 44,26 Q 54,36 50,46" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Gloves -->
<circle cx="10" cy="47" r="3" fill="#fbbf24"/>
<circle cx="50" cy="47" r="3" fill="#fbbf24"/>
<!-- Head/mask -->
<path d="M 18,4 Q 30,-2 42,4 L 42,22 L 18,22 Z" fill="#dc2626"/>
<!-- Face -->
<rect x="22" y="10" width="16" height="12" fill="#fed7aa" rx="2"/>
<!-- Chin guard -->
<path d="M 22,22 Q 30,26 38,22" fill="#dc2626"/>
<!-- Wing earpieces -->
<path d="M 18,10 L 10,4 L 14,12" fill="#fbbf24"/>
<path d="M 42,10 L 50,4 L 46,12" fill="#fbbf24"/>
<!-- Eyes -->
<rect x="24" y="14" width="4" height="3" fill="white" rx="0.5"/>
<rect x="32" y="14" width="4" height="3" fill="white" rx="0.5"/>
</svg>`,

// 19. Aquaman
aquaman_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Green boots -->
<rect x="18" y="72" width="10" height="12" fill="#15803d" rx="2"/>
<rect x="32" y="72" width="10" height="12" fill="#15803d" rx="2"/>
<!-- Green pants -->
<rect x="20" y="50" width="8" height="24" fill="#16a34a"/>
<rect x="32" y="50" width="8" height="24" fill="#16a34a"/>
<!-- Scale pattern belt -->
<rect x="14" y="48" width="32" height="4" fill="#d97706"/>
<!-- Gold scale armor top -->
<rect x="14" y="22" width="32" height="28" fill="#d97706" rx="2"/>
<!-- Scale pattern -->
<circle cx="20" cy="28" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="26" cy="28" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="32" cy="28" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="40" cy="28" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="23" cy="34" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="29" cy="34" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="35" cy="34" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="20" cy="40" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="26" cy="40" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="32" cy="40" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<circle cx="40" cy="40" r="3" fill="none" stroke="#b45309" stroke-width="0.8"/>
<!-- Arms -->
<path d="M 14,26 Q 4,36 8,48" stroke="#fed7aa" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 56,36 52,48" stroke="#fed7aa" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Trident -->
<line x1="52" y1="10" x2="52" y2="78" stroke="#d97706" stroke-width="2.5"/>
<path d="M 48,12 L 52,4 L 56,12" fill="none" stroke="#fbbf24" stroke-width="2"/>
<line x1="52" y1="4" x2="52" y2="0" stroke="#fbbf24" stroke-width="2"/>
<line x1="48" y1="10" x2="48" y2="6" stroke="#fbbf24" stroke-width="2"/>
<line x1="56" y1="10" x2="56" y2="6" stroke="#fbbf24" stroke-width="2"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="18" fill="#fed7aa" rx="4"/>
<!-- Long hair -->
<path d="M 18,8 C 18,2 42,2 42,8" fill="#d97706"/>
<rect x="16" y="8" width="4" height="18" fill="#d97706" rx="1"/>
<rect x="40" y="8" width="4" height="18" fill="#d97706" rx="1"/>
<!-- Beard -->
<rect x="24" y="16" width="12" height="6" fill="#b45309" rx="2"/>
<!-- Eyes -->
<circle cx="26" cy="12" r="1.5" fill="#166534"/>
<circle cx="34" cy="12" r="1.5" fill="#166534"/>
</svg>`,

// 20. Green Lantern
greenlantern_boss: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Green energy aura -->
<ellipse cx="30" cy="45" rx="28" ry="40" fill="none" stroke="#22c55e" stroke-width="1" opacity="0.2"/>
<!-- Green boots -->
<rect x="20" y="72" width="8" height="12" fill="#16a34a" rx="2"/>
<rect x="32" y="72" width="8" height="12" fill="#16a34a" rx="2"/>
<!-- Black legs -->
<rect x="21" y="55" width="7" height="18" fill="#0f172a"/>
<rect x="33" y="55" width="7" height="18" fill="#0f172a"/>
<!-- Green/black suit body -->
<rect x="14" y="22" width="32" height="34" fill="#16a34a" rx="2"/>
<path d="M 14,22 L 20,22 L 22,56 L 14,56 Z" fill="#0f172a"/>
<path d="M 46,22 L 40,22 L 38,56 L 46,56 Z" fill="#0f172a"/>
<!-- Lantern symbol -->
<circle cx="30" cy="36" r="6" fill="none" stroke="white" stroke-width="1.5"/>
<rect x="27" y="30" width="6" height="12" fill="none" stroke="white" stroke-width="1"/>
<!-- Arms -->
<path d="M 14,26 Q 4,36 8,46" stroke="#16a34a" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 46,26 Q 56,36 52,46" stroke="#16a34a" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Gloves -->
<circle cx="8" cy="47" r="3" fill="#16a34a"/>
<circle cx="52" cy="47" r="3" fill="#16a34a"/>
<!-- Ring glow (right hand) -->
<circle cx="52" cy="47" r="2" fill="#4ade80" class="animate-pulse"/>
<!-- Green construct energy -->
<path d="M 52,45 Q 56,36 60,40" stroke="#4ade80" stroke-width="2" fill="none" opacity="0.6"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="18" fill="#a16207" rx="4"/>
<!-- Mask -->
<path d="M 20,8 L 40,8 L 38,16 L 22,16 Z" fill="#16a34a"/>
<!-- Eyes through mask -->
<rect x="24" y="10" width="4" height="3" fill="white" rx="0.5"/>
<rect x="32" y="10" width="4" height="3" fill="white" rx="0.5"/>
<!-- Hair -->
<path d="M 20,6 C 20,0 40,0 40,6" fill="#7c2d12"/>
<!-- Jaw -->
<line x1="26" y1="18" x2="34" y2="18" stroke="#92400e" stroke-width="1"/>
</svg>`,

// 21. The University Chairman
caltech_chairman: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
<rect x="20" y="76" width="8" height="8" fill="#1e293b"/>
<rect x="32" y="76" width="8" height="8" fill="#1e293b"/>
<rect x="20" y="52" width="8" height="24" fill="#334155"/>
<rect x="32" y="52" width="8" height="24" fill="#334155"/>
<!-- Suit body -->
<rect x="14" y="24" width="32" height="30" fill="#1e293b" rx="2"/>
<!-- Suit lapels -->
<polygon points="22,24 30,36 26,24" fill="#334155"/>
<polygon points="38,24 30,36 34,24" fill="#334155"/>
<!-- Tie -->
<polygon points="29,30 31,30 32,50 28,50" fill="#991b1b"/>
<!-- White shirt -->
<rect x="28" y="24" width="4" height="10" fill="#f8fafc"/>
<!-- Arms -->
<path d="M 14,28 Q 6,38 10,48" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 54,38 50,48" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Clipboard -->
<rect x="46" y="44" width="10" height="14" fill="#92400e" rx="1"/>
<rect x="47" y="46" width="8" height="10" fill="#fef3c7"/>
<line x1="49" y1="48" x2="53" y2="48" stroke="#64748b" stroke-width="0.5"/>
<line x1="49" y1="50" x2="54" y2="50" stroke="#64748b" stroke-width="0.5"/>
<line x1="49" y1="52" x2="53" y2="52" stroke="#64748b" stroke-width="0.5"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="20" fill="#fed7aa" rx="4"/>
<!-- Gray hair -->
<path d="M 18,8 C 18,0 42,0 42,8 L 42,12 L 18,12 Z" fill="#9ca3af"/>
<!-- Glasses -->
<rect x="22" y="12" width="6" height="5" fill="none" stroke="#1e293b" stroke-width="1.5" rx="1"/>
<rect x="32" y="12" width="6" height="5" fill="none" stroke="#1e293b" stroke-width="1.5" rx="1"/>
<line x1="28" y1="14" x2="32" y2="14" stroke="#1e293b" stroke-width="1"/>
<!-- Eyes behind glasses -->
<circle cx="25" cy="14" r="1" fill="#1c1917"/>
<circle cx="35" cy="14" r="1" fill="#1c1917"/>
<!-- Stern mouth -->
<line x1="26" y1="20" x2="34" y2="20" stroke="#78350f" stroke-width="1.5"/>
<!-- University badge -->
<rect x="16" y="26" width="6" height="6" fill="#d97706" rx="1"/>
<text x="17" y="31" fill="white" font-size="4">C</text>
</svg>`,

// 22. Kurt (Penny's Ex)
kurt_ex: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="16" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Sneakers -->
<rect x="16" y="76" width="12" height="8" fill="#f8fafc" rx="2"/>
<rect x="32" y="76" width="12" height="8" fill="#f8fafc" rx="2"/>
<!-- Jeans -->
<rect x="18" y="50" width="10" height="28" fill="#1d4ed8"/>
<rect x="32" y="50" width="10" height="28" fill="#1d4ed8"/>
<!-- Tank top body -->
<rect x="12" y="22" width="36" height="30" fill="#f8fafc" rx="2"/>
<!-- Massive muscular arms -->
<path d="M 12,26 Q -4,36 2,50" stroke="#fed7aa" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M 48,26 Q 64,36 58,50" stroke="#fed7aa" stroke-width="10" fill="none" stroke-linecap="round"/>
<!-- Flexing bicep bumps -->
<circle cx="0" cy="38" r="5" fill="#fed7aa"/>
<circle cx="60" cy="38" r="5" fill="#fed7aa"/>
<!-- Fists -->
<circle cx="2" cy="52" r="4" fill="#fed7aa"/>
<circle cx="58" cy="52" r="4" fill="#fed7aa"/>
<!-- Chest definition -->
<path d="M 22,28 Q 30,32 38,28" fill="none" stroke="#e5e7eb" stroke-width="1"/>
<!-- Neck -->
<rect x="24" y="18" width="12" height="6" fill="#fed7aa"/>
<!-- Head (small relative to body) -->
<rect x="22" y="2" width="16" height="16" fill="#fed7aa" rx="4"/>
<!-- Backwards cap -->
<rect x="20" y="2" width="20" height="8" fill="#dc2626" rx="2"/>
<rect x="20" y="8" width="4" height="4" fill="#dc2626"/>
<!-- Dumb expression -->
<circle cx="27" cy="12" r="1.5" fill="#1c1917"/>
<circle cx="33" cy="12" r="1.5" fill="#1c1917"/>
<circle cx="30" cy="16" r="2" fill="#fca5a5"/>
</svg>`

};
