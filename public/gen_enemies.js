// ============================================================
// GENESIS ENEMY VECTORS - SVG sprites for Genesis minions & bosses
// Loaded after vectors.js, merged via Object.assign
// ============================================================
const genEnemyVectors = {

// ===================== MINIONS =====================

// 1. Illuminati Agent - suit, sunglasses, triangle pin
gen_illuminati_agent: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Legs -->
<rect x="22" y="64" width="6" height="18" fill="#1e293b"/>
<rect x="32" y="64" width="6" height="18" fill="#1e293b"/>
<!-- Shoes -->
<rect x="20" y="78" width="8" height="6" fill="#0f172a" rx="2"/>
<rect x="32" y="78" width="8" height="6" fill="#0f172a" rx="2"/>
<!-- Suit body -->
<rect x="16" y="30" width="28" height="34" fill="#1e293b" rx="2"/>
<!-- White shirt -->
<rect x="27" y="32" width="6" height="20" fill="#f1f5f9"/>
<!-- Tie -->
<polygon points="30,32 28,34 30,52 32,34" fill="#991b1b"/>
<!-- Triangle pin on lapel -->
<polygon points="22,36 20,42 24,42" fill="#fbbf24" stroke="#d97706" stroke-width="0.5"/>
<!-- Eye of providence in triangle -->
<circle cx="22" cy="40" r="1" fill="#0f172a"/>
<!-- Arms -->
<path d="M 16,34 Q 8,44 12,54" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,34 Q 52,44 48,54" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Head -->
<rect x="22" y="8" width="16" height="18" fill="#fde68a" rx="4"/>
<!-- Hair -->
<path d="M 20,12 C 20,4 40,4 40,12" fill="#292524"/>
<!-- Sunglasses -->
<rect x="22" y="14" width="7" height="4" fill="#0f172a" rx="1"/>
<rect x="31" y="14" width="7" height="4" fill="#0f172a" rx="1"/>
<line x1="29" y1="16" x2="31" y2="16" stroke="#0f172a" stroke-width="1"/>
<!-- Sunglasses glint -->
<line x1="24" y1="15" x2="26" y2="15" stroke="#60a5fa" stroke-width="0.5" opacity="0.6"/>
<!-- Mouth -->
<line x1="27" y1="22" x2="33" y2="22" stroke="#78350f" stroke-width="1"/>
<!-- Earpiece -->
<circle cx="20" cy="16" r="1.5" fill="#374151"/>
<line x1="20" y1="17" x2="20" y2="22" stroke="#374151" stroke-width="0.8"/>
</svg>`,

// 2. Shadow Guard - dark armor + mask
gen_shadow_guard: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
<!-- Legs -->
<rect x="21" y="62" width="7" height="18" fill="#0f172a"/>
<rect x="32" y="62" width="7" height="18" fill="#0f172a"/>
<!-- Armor boots -->
<rect x="19" y="76" width="9" height="8" fill="#1e293b" rx="2"/>
<rect x="32" y="76" width="9" height="8" fill="#1e293b" rx="2"/>
<!-- Boot spikes -->
<polygon points="19,76 17,78 19,80" fill="#374151"/>
<polygon points="41,76 43,78 41,80" fill="#374151"/>
<!-- Dark armor body -->
<rect x="14" y="26" width="32" height="36" fill="#0f172a" rx="3"/>
<!-- Chest plate details -->
<path d="M 20,30 L 30,38 L 40,30" fill="none" stroke="#334155" stroke-width="1.5"/>
<path d="M 20,36 L 30,44 L 40,36" fill="none" stroke="#334155" stroke-width="1"/>
<!-- Shoulder pads -->
<ellipse cx="14" cy="28" rx="5" ry="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
<ellipse cx="46" cy="28" rx="5" ry="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
<!-- Arms -->
<path d="M 14,32 Q 6,42 10,52" stroke="#0f172a" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 46,32 Q 54,42 50,52" stroke="#0f172a" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Shadow blade -->
<rect x="48" y="38" width="3" height="22" fill="#475569" rx="1"/>
<polygon points="48,38 51,38 49.5,32" fill="#64748b"/>
<!-- Head with mask -->
<rect x="22" y="6" width="16" height="18" fill="#0f172a" rx="4"/>
<!-- Mask visor -->
<rect x="24" y="12" width="12" height="4" fill="#dc2626" rx="1" opacity="0.8"/>
<!-- Glowing eyes behind visor -->
<circle cx="27" cy="14" r="1.5" fill="#ef4444"/>
<circle cx="33" cy="14" r="1.5" fill="#ef4444"/>
<!-- Hood -->
<path d="M 18,14 C 18,2 42,2 42,14" fill="#0f172a"/>
</svg>`,

// 3. Mind Controller - glowing head + psychic waves
gen_mind_controller: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Legs -->
<rect x="23" y="62" width="5" height="18" fill="#4a1d8e"/>
<rect x="32" y="62" width="5" height="18" fill="#4a1d8e"/>
<!-- Boots -->
<rect x="21" y="76" width="8" height="8" fill="#3b0764" rx="2"/>
<rect x="31" y="76" width="8" height="8" fill="#3b0764" rx="2"/>
<!-- Robe body -->
<path d="M 14,28 L 14,62 L 46,62 L 46,28 Q 30,24 14,28 Z" fill="#581c87"/>
<!-- Inner robe -->
<path d="M 24,32 L 24,62 L 36,62 L 36,32" fill="#4c1d95"/>
<!-- Glowing rune on chest -->
<circle cx="30" cy="42" r="4" fill="none" stroke="#c084fc" stroke-width="1.5"/>
<circle cx="30" cy="42" r="2" fill="#e9d5ff" opacity="0.6"/>
<!-- Arms outstretched -->
<path d="M 14,32 Q 4,38 6,48" stroke="#581c87" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,32 Q 56,38 54,48" stroke="#581c87" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Psychic energy from hands -->
<circle cx="6" cy="48" r="3" fill="#a855f7" opacity="0.5"/>
<circle cx="54" cy="48" r="3" fill="#a855f7" opacity="0.5"/>
<!-- Head - glowing -->
<circle cx="30" cy="14" r="10" fill="#e9d5ff"/>
<!-- Glow effect -->
<circle cx="30" cy="14" r="13" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.4"/>
<circle cx="30" cy="14" r="16" fill="none" stroke="#a855f7" stroke-width="0.5" opacity="0.2"/>
<!-- Eyes - glowing purple -->
<ellipse cx="26" cy="14" rx="2" ry="1.5" fill="#7c3aed"/>
<ellipse cx="34" cy="14" rx="2" ry="1.5" fill="#7c3aed"/>
<!-- Third eye -->
<circle cx="30" cy="8" r="2" fill="#a855f7"/>
<circle cx="30" cy="8" r="1" fill="#e9d5ff"/>
<!-- Psychic waves from head -->
<path d="M 16,6 Q 10,0 16,-4" fill="none" stroke="#c084fc" stroke-width="0.8" opacity="0.5"/>
<path d="M 44,6 Q 50,0 44,-4" fill="none" stroke="#c084fc" stroke-width="0.8" opacity="0.5"/>
<path d="M 30,-2 Q 30,-6 30,-8" fill="none" stroke="#c084fc" stroke-width="0.8" opacity="0.3"/>
</svg>`,

// 4. Templar Knight - white armor + red cross
gen_templar_knight: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Legs -->
<rect x="22" y="60" width="6" height="18" fill="#94a3b8"/>
<rect x="32" y="60" width="6" height="18" fill="#94a3b8"/>
<!-- Armored boots -->
<rect x="20" y="76" width="8" height="8" fill="#cbd5e1" rx="2"/>
<rect x="32" y="76" width="8" height="8" fill="#cbd5e1" rx="2"/>
<!-- Chain mail skirt -->
<rect x="16" y="52" width="28" height="12" fill="#d4d4d8" rx="1"/>
<line x1="16" y1="55" x2="44" y2="55" stroke="#a1a1aa" stroke-width="0.5"/>
<line x1="16" y1="58" x2="44" y2="58" stroke="#a1a1aa" stroke-width="0.5"/>
<line x1="16" y1="61" x2="44" y2="61" stroke="#a1a1aa" stroke-width="0.5"/>
<!-- White tunic body -->
<rect x="14" y="24" width="32" height="30" fill="#f8fafc" rx="2"/>
<!-- Red Templar Cross -->
<rect x="27" y="28" width="6" height="20" fill="#dc2626"/>
<rect x="21" y="34" width="18" height="6" fill="#dc2626"/>
<!-- Shoulder armor -->
<rect x="10" y="24" width="8" height="8" fill="#cbd5e1" rx="2"/>
<rect x="42" y="24" width="8" height="8" fill="#cbd5e1" rx="2"/>
<!-- Arms -->
<path d="M 14,28 Q 6,38 10,50" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 54,38 50,50" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Sword -->
<rect x="4" y="36" width="2" height="18" fill="#9ca3af"/>
<rect x="2" y="36" width="6" height="2" fill="#78716c"/>
<polygon points="4,54 6,54 5,58" fill="#9ca3af"/>
<!-- Shield in left hand -->
<ellipse cx="50" cy="44" rx="6" ry="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
<rect x="49" y="38" width="2" height="12" fill="#dc2626"/>
<rect x="45" y="43" width="10" height="2" fill="#dc2626"/>
<!-- Helmet -->
<rect x="20" y="4" width="20" height="20" fill="#cbd5e1" rx="4"/>
<!-- Visor slit -->
<rect x="24" y="12" width="12" height="3" fill="#1e293b" rx="1"/>
<!-- Helmet crest -->
<rect x="28" y="0" width="4" height="6" fill="#dc2626"/>
</svg>`,

// 5. Cipher Monk - hooded + scroll
gen_cipher_monk: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Long robe - covers legs -->
<path d="M 16,28 L 12,82 L 48,82 L 44,28 Z" fill="#78350f"/>
<!-- Robe inner fold -->
<path d="M 26,28 L 24,82 L 36,82 L 34,28 Z" fill="#713f12"/>
<!-- Belt/rope -->
<path d="M 16,48 Q 30,52 44,48" stroke="#d6d3d1" stroke-width="2" fill="none"/>
<!-- Arms holding scroll -->
<path d="M 16,34 Q 10,44 18,52" stroke="#78350f" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,34 Q 50,44 42,52" stroke="#78350f" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Hands -->
<circle cx="18" cy="52" r="3" fill="#fde68a"/>
<circle cx="42" cy="52" r="3" fill="#fde68a"/>
<!-- Scroll -->
<rect x="18" y="46" width="24" height="10" fill="#fef3c7" rx="2"/>
<circle cx="18" cy="46" r="3" fill="#d4a574"/>
<circle cx="42" cy="46" r="3" fill="#d4a574"/>
<circle cx="18" cy="56" r="3" fill="#d4a574"/>
<circle cx="42" cy="56" r="3" fill="#d4a574"/>
<!-- Cipher text on scroll -->
<line x1="22" y1="49" x2="38" y2="49" stroke="#78350f" stroke-width="0.5" opacity="0.6"/>
<line x1="22" y1="51" x2="38" y2="51" stroke="#78350f" stroke-width="0.5" opacity="0.6"/>
<line x1="22" y1="53" x2="38" y2="53" stroke="#78350f" stroke-width="0.5" opacity="0.6"/>
<!-- Hood -->
<path d="M 14,26 C 14,2 46,2 46,26 L 44,32 L 16,32 Z" fill="#78350f"/>
<!-- Face in shadow -->
<ellipse cx="30" cy="18" rx="8" ry="8" fill="#292524"/>
<!-- Glowing eyes in shadow -->
<circle cx="26" cy="18" r="1.5" fill="#fbbf24"/>
<circle cx="34" cy="18" r="1.5" fill="#fbbf24"/>
</svg>`,

// 6. Relic Golem - stone + runes
gen_relic_golem: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Massive stone legs -->
<rect x="18" y="60" width="10" height="22" fill="#78716c" rx="2"/>
<rect x="32" y="60" width="10" height="22" fill="#78716c" rx="2"/>
<!-- Stone feet -->
<rect x="16" y="78" width="12" height="6" fill="#57534e" rx="2"/>
<rect x="32" y="78" width="12" height="6" fill="#57534e" rx="2"/>
<!-- Stone cracks on legs -->
<path d="M 22,64 L 24,68 L 20,72" stroke="#44403c" stroke-width="0.5" fill="none"/>
<path d="M 38,62 L 36,68 L 40,74" stroke="#44403c" stroke-width="0.5" fill="none"/>
<!-- Massive stone body -->
<rect x="10" y="20" width="40" height="42" fill="#78716c" rx="4"/>
<!-- Body stone texture -->
<path d="M 14,28 L 20,32 L 16,38" stroke="#57534e" stroke-width="0.8" fill="none"/>
<path d="M 40,24 L 44,30 L 38,34" stroke="#57534e" stroke-width="0.8" fill="none"/>
<!-- Glowing runes on body -->
<text x="18" y="38" font-size="6" fill="#22d3ee" opacity="0.8">ᛗ</text>
<text x="28" y="36" font-size="8" fill="#22d3ee" opacity="0.8">ᛟ</text>
<text x="38" y="40" font-size="6" fill="#22d3ee" opacity="0.8">ᚦ</text>
<text x="24" y="50" font-size="7" fill="#22d3ee" opacity="0.8">ᚠ</text>
<text x="34" y="48" font-size="6" fill="#22d3ee" opacity="0.8">ᛞ</text>
<!-- Massive stone arms -->
<rect x="2" y="24" width="10" height="28" fill="#78716c" rx="3"/>
<rect x="48" y="24" width="10" height="28" fill="#78716c" rx="3"/>
<!-- Stone fists -->
<rect x="2" y="50" width="10" height="8" fill="#57534e" rx="3"/>
<rect x="48" y="50" width="10" height="8" fill="#57534e" rx="3"/>
<!-- Small stone head -->
<rect x="22" y="6" width="16" height="14" fill="#78716c" rx="3"/>
<!-- Glowing eyes -->
<rect x="24" y="10" width="4" height="3" fill="#22d3ee" rx="1"/>
<rect x="32" y="10" width="4" height="3" fill="#22d3ee" rx="1"/>
<!-- Core glow -->
<circle cx="30" cy="42" r="5" fill="#22d3ee" opacity="0.3"/>
</svg>`,

// 7. MIB Agent - black suit + neuralizer
gen_mib_agent: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Legs -->
<rect x="23" y="62" width="5" height="18" fill="#0f172a"/>
<rect x="32" y="62" width="5" height="18" fill="#0f172a"/>
<!-- Black shoes -->
<rect x="21" y="78" width="8" height="6" fill="#020617" rx="2"/>
<rect x="31" y="78" width="8" height="6" fill="#020617" rx="2"/>
<!-- Black suit body -->
<rect x="16" y="28" width="28" height="34" fill="#0f172a" rx="2"/>
<!-- White shirt -->
<rect x="27" y="30" width="6" height="22" fill="#f1f5f9"/>
<!-- Black tie -->
<polygon points="30,30 28,33 30,52 32,33" fill="#020617"/>
<!-- Arms -->
<path d="M 16,32 Q 8,42 10,52" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,32 Q 52,38 54,44" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Neuralizer in right hand -->
<rect x="52" y="36" width="3" height="12" fill="#94a3b8" rx="1"/>
<circle cx="53.5" cy="34" r="3" fill="#e2e8f0"/>
<!-- Neuralizer flash -->
<circle cx="53.5" cy="34" r="5" fill="#fef08a" opacity="0.3"/>
<circle cx="53.5" cy="34" r="3" fill="#fef08a" opacity="0.5"/>
<!-- Head -->
<rect x="22" y="6" width="16" height="18" fill="#92400e" rx="4"/>
<!-- Hair (buzz cut) -->
<rect x="22" y="6" width="16" height="5" fill="#1c1917" rx="3"/>
<!-- Sunglasses -->
<rect x="22" y="12" width="7" height="4" fill="#020617" rx="1"/>
<rect x="31" y="12" width="7" height="4" fill="#020617" rx="1"/>
<line x1="29" y1="14" x2="31" y2="14" stroke="#020617" stroke-width="1"/>
<!-- Stern mouth -->
<line x1="27" y1="21" x2="33" y2="21" stroke="#78350f" stroke-width="1"/>
</svg>`,

// 8. Hybrid - half green alien half human
gen_hybrid: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Legs - left human, right alien green -->
<rect x="22" y="62" width="6" height="18" fill="#64748b"/>
<rect x="32" y="62" width="6" height="18" fill="#166534"/>
<!-- Shoes -->
<rect x="20" y="78" width="8" height="6" fill="#475569" rx="2"/>
<rect x="32" y="78" width="8" height="6" fill="#14532d" rx="2"/>
<!-- Body - split down middle -->
<rect x="16" y="26" width="14" height="36" fill="#64748b" rx="2"/>
<rect x="30" y="26" width="14" height="36" fill="#166534" rx="2"/>
<!-- Human side chest detail -->
<line x1="20" y1="34" x2="28" y2="34" stroke="#475569" stroke-width="0.5"/>
<!-- Alien side organic texture -->
<path d="M 34,30 Q 38,36 34,42" stroke="#15803d" stroke-width="0.8" fill="none"/>
<path d="M 38,32 Q 42,38 38,44" stroke="#15803d" stroke-width="0.8" fill="none"/>
<!-- Arms -->
<path d="M 16,30 Q 8,40 10,50" stroke="#64748b" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,30 Q 52,40 50,50" stroke="#166534" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Alien hand with claws -->
<path d="M 50,50 L 54,46" stroke="#15803d" stroke-width="1.5"/>
<path d="M 50,50 L 56,50" stroke="#15803d" stroke-width="1.5"/>
<path d="M 50,50 L 54,54" stroke="#15803d" stroke-width="1.5"/>
<!-- Head - split -->
<path d="M 30,6 L 22,6 Q 18,6 18,10 L 18,22 Q 18,26 22,26 L 30,26 Z" fill="#fde68a"/>
<path d="M 30,6 L 38,6 Q 42,6 42,10 L 42,22 Q 42,26 38,26 L 30,26 Z" fill="#22c55e"/>
<!-- Human eye -->
<circle cx="25" cy="14" r="2" fill="white"/>
<circle cx="25" cy="14" r="1" fill="#1e293b"/>
<!-- Alien eye - large black -->
<ellipse cx="35" cy="13" rx="3" ry="4" fill="#020617"/>
<ellipse cx="35" cy="12" rx="1" ry="1.5" fill="#064e3b" opacity="0.5"/>
<!-- Human hair -->
<path d="M 18,10 C 18,4 30,4 30,8" fill="#78350f"/>
<!-- Alien smooth head -->
<path d="M 30,8 C 30,2 42,4 42,10" fill="#16a34a"/>
<!-- Mouth split -->
<line x1="25" y1="20" x2="30" y2="20" stroke="#92400e" stroke-width="1"/>
<line x1="30" y1="20" x2="35" y2="20" stroke="#14532d" stroke-width="1"/>
</svg>`,

// 9. Anubis - jackal head warrior
gen_anubis: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Legs with golden greaves -->
<rect x="22" y="60" width="6" height="18" fill="#1e293b"/>
<rect x="32" y="60" width="6" height="18" fill="#1e293b"/>
<rect x="20" y="66" width="8" height="12" fill="#b45309" rx="1"/>
<rect x="32" y="66" width="8" height="12" fill="#b45309" rx="1"/>
<!-- Sandals -->
<rect x="20" y="78" width="8" height="6" fill="#92400e" rx="1"/>
<rect x="32" y="78" width="8" height="6" fill="#92400e" rx="1"/>
<!-- Egyptian armor body -->
<rect x="14" y="26" width="32" height="34" fill="#1e3a5f" rx="2"/>
<!-- Gold chest plate -->
<path d="M 20,26 L 30,36 L 40,26 Z" fill="#d97706"/>
<!-- Gold collar/necklace -->
<path d="M 16,26 Q 30,32 44,26" stroke="#fbbf24" stroke-width="3" fill="none"/>
<!-- Loincloth -->
<polygon points="20,58 30,70 40,58" fill="#d97706" stroke="#92400e" stroke-width="0.5"/>
<!-- Arms -->
<path d="M 14,30 Q 6,40 8,52" stroke="#1e3a5f" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,30 Q 54,36 56,44" stroke="#1e3a5f" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Ankh staff -->
<line x1="8" y1="34" x2="8" y2="58" stroke="#d97706" stroke-width="2"/>
<circle cx="8" cy="32" r="3" fill="none" stroke="#d97706" stroke-width="2"/>
<line x1="5" y1="38" x2="11" y2="38" stroke="#d97706" stroke-width="2"/>
<!-- Jackal head -->
<rect x="22" y="6" width="16" height="16" fill="#1c1917" rx="3"/>
<!-- Snout -->
<path d="M 22,14 L 16,20 L 22,22 Z" fill="#292524"/>
<!-- Pointed ears -->
<polygon points="22,6 18,0 24,4" fill="#1c1917"/>
<polygon points="38,6 42,0 36,4" fill="#1c1917"/>
<!-- Golden eyes -->
<circle cx="26" cy="12" r="1.5" fill="#fbbf24"/>
<circle cx="34" cy="12" r="1.5" fill="#fbbf24"/>
<circle cx="26" cy="12" r="0.5" fill="#0f172a"/>
<circle cx="34" cy="12" r="0.5" fill="#0f172a"/>
</svg>`,

// 10. Scarab - golden beetle swarm
gen_scarab: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Main scarab body -->
<ellipse cx="30" cy="50" rx="16" ry="22" fill="#b45309"/>
<!-- Wing cases -->
<path d="M 30,30 Q 14,50 30,72" fill="#d97706" stroke="#92400e" stroke-width="1"/>
<path d="M 30,30 Q 46,50 30,72" fill="#d97706" stroke="#92400e" stroke-width="1"/>
<!-- Wing case line -->
<line x1="30" y1="30" x2="30" y2="72" stroke="#92400e" stroke-width="1"/>
<!-- Shell texture -->
<path d="M 22,40 Q 30,38 38,40" stroke="#fbbf24" stroke-width="0.5" fill="none"/>
<path d="M 20,50 Q 30,48 40,50" stroke="#fbbf24" stroke-width="0.5" fill="none"/>
<path d="M 22,60 Q 30,58 38,60" stroke="#fbbf24" stroke-width="0.5" fill="none"/>
<!-- Golden shimmer spots -->
<circle cx="24" cy="44" r="2" fill="#fbbf24" opacity="0.4"/>
<circle cx="36" cy="44" r="2" fill="#fbbf24" opacity="0.4"/>
<circle cx="24" cy="56" r="2" fill="#fbbf24" opacity="0.4"/>
<circle cx="36" cy="56" r="2" fill="#fbbf24" opacity="0.4"/>
<!-- Legs - 3 pairs -->
<path d="M 16,38 Q 8,34 4,38" stroke="#78350f" stroke-width="2" fill="none"/>
<path d="M 44,38 Q 52,34 56,38" stroke="#78350f" stroke-width="2" fill="none"/>
<path d="M 14,50 Q 6,50 2,54" stroke="#78350f" stroke-width="2" fill="none"/>
<path d="M 46,50 Q 54,50 58,54" stroke="#78350f" stroke-width="2" fill="none"/>
<path d="M 16,62 Q 8,66 4,64" stroke="#78350f" stroke-width="2" fill="none"/>
<path d="M 44,62 Q 52,66 56,64" stroke="#78350f" stroke-width="2" fill="none"/>
<!-- Head -->
<ellipse cx="30" cy="28" rx="8" ry="6" fill="#92400e"/>
<!-- Mandibles -->
<path d="M 24,30 Q 20,36 22,38" stroke="#78350f" stroke-width="2" fill="none"/>
<path d="M 36,30 Q 40,36 38,38" stroke="#78350f" stroke-width="2" fill="none"/>
<!-- Eyes -->
<circle cx="26" cy="26" r="2" fill="#fbbf24"/>
<circle cx="34" cy="26" r="2" fill="#fbbf24"/>
<!-- Antennae -->
<path d="M 26,24 Q 22,18 20,14" stroke="#78350f" stroke-width="1" fill="none"/>
<path d="M 34,24 Q 38,18 40,14" stroke="#78350f" stroke-width="1" fill="none"/>
<!-- Small swarm beetles -->
<ellipse cx="8" cy="20" rx="3" ry="2" fill="#d97706" opacity="0.6"/>
<ellipse cx="52" cy="24" rx="3" ry="2" fill="#d97706" opacity="0.6"/>
<ellipse cx="12" cy="76" rx="3" ry="2" fill="#d97706" opacity="0.5"/>
<ellipse cx="48" cy="78" rx="3" ry="2" fill="#d97706" opacity="0.5"/>
</svg>`,

// 11. Minotaur - bull head + axe
gen_minotaur: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Massive legs -->
<rect x="18" y="58" width="10" height="22" fill="#78350f" rx="2"/>
<rect x="32" y="58" width="10" height="22" fill="#78350f" rx="2"/>
<!-- Hooves -->
<rect x="18" y="78" width="10" height="6" fill="#44403c" rx="1"/>
<rect x="32" y="78" width="10" height="6" fill="#44403c" rx="1"/>
<!-- Muscular torso -->
<rect x="10" y="22" width="40" height="38" fill="#92400e" rx="4"/>
<!-- Chest muscles -->
<path d="M 20,28 Q 25,34 30,28" fill="none" stroke="#78350f" stroke-width="1"/>
<path d="M 30,28 Q 35,34 40,28" fill="none" stroke="#78350f" stroke-width="1"/>
<!-- Abs -->
<line x1="30" y1="36" x2="30" y2="54" stroke="#78350f" stroke-width="0.8"/>
<line x1="24" y1="40" x2="36" y2="40" stroke="#78350f" stroke-width="0.5"/>
<line x1="24" y1="46" x2="36" y2="46" stroke="#78350f" stroke-width="0.5"/>
<!-- Loincloth -->
<polygon points="18,56 30,66 42,56" fill="#713f12"/>
<!-- Massive arms -->
<path d="M 10,26 Q 0,36 4,48" stroke="#92400e" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M 50,26 Q 58,32 56,42" stroke="#92400e" stroke-width="7" fill="none" stroke-linecap="round"/>
<!-- Battle axe in right hand -->
<line x1="56" y1="42" x2="56" y2="14" stroke="#78716c" stroke-width="2"/>
<path d="M 50,16 Q 56,10 56,16 Q 56,22 62,16" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>
<!-- Bull head -->
<rect x="18" y="4" width="24" height="18" fill="#78350f" rx="4"/>
<!-- Snout -->
<ellipse cx="30" cy="18" rx="6" ry="4" fill="#92400e"/>
<!-- Nostrils -->
<circle cx="27" cy="18" r="1.5" fill="#44403c"/>
<circle cx="33" cy="18" r="1.5" fill="#44403c"/>
<!-- Angry eyes -->
<rect x="22" y="10" width="5" height="3" fill="#fbbf24" rx="1"/>
<rect x="33" y="10" width="5" height="3" fill="#fbbf24" rx="1"/>
<circle cx="24" cy="11" r="1" fill="#7f1d1d"/>
<circle cx="36" cy="11" r="1" fill="#7f1d1d"/>
<!-- Horns -->
<path d="M 18,8 Q 10,2 8,8" stroke="#d4a574" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M 42,8 Q 50,2 52,8" stroke="#d4a574" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- Nose ring -->
<path d="M 27,20 Q 30,24 33,20" stroke="#d97706" stroke-width="1.5" fill="none"/>
</svg>`,

// 12. Cyclops - one eye giant
gen_cyclops: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Massive legs -->
<rect x="16" y="58" width="12" height="22" fill="#a8a29e" rx="3"/>
<rect x="32" y="58" width="12" height="22" fill="#a8a29e" rx="3"/>
<!-- Feet -->
<rect x="14" y="78" width="14" height="6" fill="#78716c" rx="2"/>
<rect x="32" y="78" width="14" height="6" fill="#78716c" rx="2"/>
<!-- Massive body -->
<rect x="8" y="18" width="44" height="42" fill="#a8a29e" rx="5"/>
<!-- Chest details -->
<path d="M 18,24 Q 24,30 30,24 Q 36,30 42,24" fill="none" stroke="#78716c" stroke-width="1"/>
<!-- Loincloth -->
<polygon points="16,56 30,68 44,56" fill="#713f12"/>
<polygon points="16,56 44,56 44,60 16,60" fill="#713f12"/>
<!-- Massive arms -->
<path d="M 8,24 Q -2,36 2,50" stroke="#a8a29e" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M 52,24 Q 62,36 58,50" stroke="#a8a29e" stroke-width="8" fill="none" stroke-linecap="round"/>
<!-- Fists -->
<circle cx="2" cy="52" r="5" fill="#78716c"/>
<circle cx="58" cy="52" r="5" fill="#78716c"/>
<!-- Club in hand -->
<rect x="54" y="20" width="5" height="34" fill="#713f12" rx="2"/>
<ellipse cx="56" cy="18" rx="5" ry="6" fill="#78350f"/>
<!-- Head -->
<ellipse cx="30" cy="12" rx="14" ry="10" fill="#a8a29e"/>
<!-- Single giant eye -->
<ellipse cx="30" cy="12" rx="6" ry="5" fill="#fef9c3"/>
<circle cx="30" cy="12" r="3" fill="#15803d"/>
<circle cx="30" cy="12" r="1.5" fill="#0f172a"/>
<!-- Brow -->
<path d="M 22,7 Q 30,4 38,7" stroke="#78716c" stroke-width="2" fill="none"/>
<!-- Mouth -->
<path d="M 24,20 Q 30,24 36,20" stroke="#57534e" stroke-width="1.5" fill="none"/>
<!-- Teeth -->
<line x1="27" y1="20" x2="27" y2="22" stroke="#fef9c3" stroke-width="1.5"/>
<line x1="33" y1="20" x2="33" y2="22" stroke="#fef9c3" stroke-width="1.5"/>
</svg>`,

// 13. Harpy - winged woman + claws
gen_harpy: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Bird legs -->
<path d="M 24,60 L 22,76" stroke="#d97706" stroke-width="3" fill="none"/>
<path d="M 36,60 L 38,76" stroke="#d97706" stroke-width="3" fill="none"/>
<!-- Talons -->
<path d="M 22,76 L 16,80 L 22,78 L 26,82 L 22,78 L 22,84" stroke="#d97706" stroke-width="1.5" fill="none"/>
<path d="M 38,76 L 34,80 L 38,78 L 42,82 L 38,78 L 38,84" stroke="#d97706" stroke-width="1.5" fill="none"/>
<!-- Feathered body -->
<ellipse cx="30" cy="44" rx="14" ry="18" fill="#6b21a8"/>
<!-- Breast feathers -->
<ellipse cx="30" cy="40" rx="8" ry="10" fill="#7c3aed"/>
<!-- Feather texture -->
<path d="M 22,36 Q 26,34 30,36" stroke="#9333ea" stroke-width="0.5" fill="none"/>
<path d="M 30,36 Q 34,34 38,36" stroke="#9333ea" stroke-width="0.5" fill="none"/>
<path d="M 20,44 Q 26,42 30,44" stroke="#9333ea" stroke-width="0.5" fill="none"/>
<path d="M 30,44 Q 34,42 40,44" stroke="#9333ea" stroke-width="0.5" fill="none"/>
<!-- Wings spread -->
<path d="M 16,32 Q 0,20 -4,30 Q 2,28 8,32 Q 2,30 0,36 Q 6,32 12,36" fill="#6b21a8"/>
<path d="M 44,32 Q 60,20 64,30 Q 58,28 52,32 Q 58,30 60,36 Q 54,32 48,36" fill="#6b21a8"/>
<!-- Wing feather tips -->
<path d="M -4,30 L -6,26" stroke="#9333ea" stroke-width="1"/>
<path d="M 64,30 L 66,26" stroke="#9333ea" stroke-width="1"/>
<!-- Head -->
<circle cx="30" cy="20" r="8" fill="#fde68a"/>
<!-- Wild hair/feathers -->
<path d="M 22,16 Q 18,8 22,6" stroke="#6b21a8" stroke-width="2" fill="none"/>
<path d="M 30,14 Q 30,6 32,4" stroke="#6b21a8" stroke-width="2" fill="none"/>
<path d="M 38,16 Q 42,8 38,6" stroke="#6b21a8" stroke-width="2" fill="none"/>
<!-- Fierce eyes -->
<ellipse cx="26" cy="18" rx="2" ry="1.5" fill="#fbbf24"/>
<circle cx="26" cy="18" r="1" fill="#7f1d1d"/>
<ellipse cx="34" cy="18" rx="2" ry="1.5" fill="#fbbf24"/>
<circle cx="34" cy="18" r="1" fill="#7f1d1d"/>
<!-- Sharp mouth -->
<path d="M 27,24 L 30,26 L 33,24" fill="#d97706" stroke="#92400e" stroke-width="0.5"/>
</svg>`,

// 14. Frost Giant - blue ice giant
gen_frost_giant: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(100,180,255,0.3)"/>
<!-- Massive icy legs -->
<rect x="16" y="58" width="12" height="22" fill="#1e40af" rx="3"/>
<rect x="32" y="58" width="12" height="22" fill="#1e40af" rx="3"/>
<!-- Ice crystal knees -->
<polygon points="22,62 18,66 26,66" fill="#93c5fd" opacity="0.6"/>
<polygon points="38,62 34,66 42,66" fill="#93c5fd" opacity="0.6"/>
<!-- Feet -->
<rect x="14" y="78" width="14" height="6" fill="#1e3a8a" rx="2"/>
<rect x="32" y="78" width="14" height="6" fill="#1e3a8a" rx="2"/>
<!-- Massive icy body -->
<rect x="8" y="18" width="44" height="42" fill="#1e40af" rx="5"/>
<!-- Ice crystals on body -->
<polygon points="14,24 12,32 18,30" fill="#93c5fd" opacity="0.5"/>
<polygon points="44,28 48,22 46,30" fill="#93c5fd" opacity="0.5"/>
<polygon points="28,48 32,42 36,48" fill="#93c5fd" opacity="0.4"/>
<!-- Frost pattern -->
<path d="M 16,36 L 20,32 L 18,28" stroke="#60a5fa" stroke-width="0.5" fill="none" opacity="0.6"/>
<path d="M 40,34 L 44,30 L 42,26" stroke="#60a5fa" stroke-width="0.5" fill="none" opacity="0.6"/>
<!-- Belt -->
<rect x="8" y="52" width="44" height="4" fill="#1e3a8a"/>
<!-- Massive arms -->
<path d="M 8,22 Q -4,34 0,48" stroke="#1e40af" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M 52,22 Q 64,34 60,48" stroke="#1e40af" stroke-width="8" fill="none" stroke-linecap="round"/>
<!-- Ice fists -->
<circle cx="0" cy="50" r="5" fill="#2563eb"/>
<circle cx="60" cy="50" r="5" fill="#2563eb"/>
<!-- Head -->
<ellipse cx="30" cy="12" rx="14" ry="10" fill="#1e40af"/>
<!-- Ice crown spikes -->
<polygon points="20,6 22,0 24,6" fill="#93c5fd"/>
<polygon points="28,4 30,-2 32,4" fill="#bfdbfe"/>
<polygon points="36,6 38,0 40,6" fill="#93c5fd"/>
<!-- Eyes -->
<rect x="22" y="10" width="5" height="3" fill="#bfdbfe" rx="1"/>
<rect x="33" y="10" width="5" height="3" fill="#bfdbfe" rx="1"/>
<!-- Frost beard -->
<path d="M 22,18 Q 24,24 26,20 Q 28,26 30,20 Q 32,26 34,20 Q 36,24 38,18" fill="#93c5fd" opacity="0.7"/>
<!-- Cold breath -->
<ellipse cx="30" cy="22" rx="4" ry="2" fill="#dbeafe" opacity="0.3"/>
</svg>`,

// 15. Valkyrie - winged maiden + spear
gen_valkyrie: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Armored legs -->
<rect x="22" y="60" width="6" height="16" fill="#94a3b8"/>
<rect x="32" y="60" width="6" height="16" fill="#94a3b8"/>
<!-- Boots -->
<rect x="20" y="74" width="8" height="10" fill="#64748b" rx="2"/>
<rect x="32" y="74" width="8" height="10" fill="#64748b" rx="2"/>
<!-- Armored skirt -->
<polygon points="16,52 14,64 30,68 46,64 44,52" fill="#94a3b8" stroke="#64748b" stroke-width="0.5"/>
<!-- Armor body -->
<rect x="16" y="26" width="28" height="28" fill="#cbd5e1" rx="2"/>
<!-- Chest armor detail -->
<path d="M 22,30 Q 30,36 38,30" fill="none" stroke="#94a3b8" stroke-width="1"/>
<path d="M 22,36 Q 30,42 38,36" fill="none" stroke="#94a3b8" stroke-width="1"/>
<!-- Gold trim -->
<line x1="16" y1="28" x2="44" y2="28" stroke="#fbbf24" stroke-width="1.5"/>
<line x1="16" y1="52" x2="44" y2="52" stroke="#fbbf24" stroke-width="1.5"/>
<!-- Arms -->
<path d="M 16,30 Q 8,38 6,48" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,30 Q 52,34 54,40" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Spear -->
<line x1="54" y1="8" x2="54" y2="70" stroke="#78716c" stroke-width="2"/>
<polygon points="54,4 50,14 58,14" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.5"/>
<!-- Wings -->
<path d="M 16,28 Q 4,14 0,20 Q 4,16 8,22 Q 6,12 2,16 Q 8,8 14,18" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.5"/>
<path d="M 44,28 Q 56,14 60,20 Q 56,16 52,22 Q 54,12 58,16 Q 52,8 46,18" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.5"/>
<!-- Head -->
<circle cx="30" cy="16" r="9" fill="#fde68a"/>
<!-- Winged helmet -->
<path d="M 20,14 C 20,6 40,6 40,14" fill="#cbd5e1"/>
<!-- Helmet wings -->
<path d="M 20,10 Q 14,6 12,10" stroke="#f1f5f9" stroke-width="2" fill="none"/>
<path d="M 40,10 Q 46,6 48,10" stroke="#f1f5f9" stroke-width="2" fill="none"/>
<!-- Hair flowing -->
<path d="M 22,18 Q 16,26 14,32" stroke="#fbbf24" stroke-width="2" fill="none"/>
<path d="M 38,18 Q 44,26 46,32" stroke="#fbbf24" stroke-width="2" fill="none"/>
<!-- Eyes -->
<circle cx="26" cy="16" r="1.5" fill="#3b82f6"/>
<circle cx="34" cy="16" r="1.5" fill="#3b82f6"/>
<!-- Mouth -->
<line x1="27" y1="21" x2="33" y2="21" stroke="#c2410c" stroke-width="0.8"/>
</svg>`,

// 16. Dark Elf - dark elf + bow
gen_dark_elf: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Slim legs -->
<rect x="24" y="62" width="5" height="16" fill="#1e293b"/>
<rect x="32" y="62" width="5" height="16" fill="#1e293b"/>
<!-- Dark boots -->
<rect x="22" y="76" width="7" height="8" fill="#0f172a" rx="2"/>
<rect x="31" y="76" width="7" height="8" fill="#0f172a" rx="2"/>
<!-- Leather armor body -->
<rect x="18" y="28" width="24" height="34" fill="#1e293b" rx="2"/>
<!-- Armor straps -->
<line x1="22" y1="30" x2="38" y2="44" stroke="#334155" stroke-width="1.5"/>
<line x1="38" y1="30" x2="22" y2="44" stroke="#334155" stroke-width="1.5"/>
<!-- Belt -->
<rect x="18" y="54" width="24" height="3" fill="#334155"/>
<!-- Dagger on belt -->
<rect x="40" y="52" width="2" height="8" fill="#94a3b8"/>
<!-- Arms -->
<path d="M 18,32 Q 10,38 8,48" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 42,32 Q 50,36 52,42" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Bow -->
<path d="M 8,28 Q 2,48 8,68" stroke="#78350f" stroke-width="2" fill="none"/>
<line x1="8" y1="28" x2="8" y2="68" stroke="#d6d3d1" stroke-width="0.8"/>
<!-- Arrow nocked -->
<line x1="8" y1="48" x2="20" y2="48" stroke="#78350f" stroke-width="1"/>
<polygon points="6,48 8,46 8,50" fill="#94a3b8"/>
<!-- Head - dark skin -->
<rect x="22" y="6" width="16" height="18" fill="#6b7280" rx="4"/>
<!-- Pointed ears -->
<polygon points="20,12 14,8 20,16" fill="#6b7280"/>
<polygon points="40,12 46,8 40,16" fill="#6b7280"/>
<!-- White hair -->
<path d="M 20,10 C 20,2 40,2 40,10" fill="#f1f5f9"/>
<path d="M 38,10 Q 42,16 44,24" stroke="#f1f5f9" stroke-width="2" fill="none"/>
<!-- Red/amber eyes -->
<circle cx="26" cy="14" r="1.5" fill="#dc2626"/>
<circle cx="34" cy="14" r="1.5" fill="#dc2626"/>
<!-- Thin mouth -->
<line x1="28" y1="20" x2="32" y2="20" stroke="#4b5563" stroke-width="0.8"/>
</svg>`,

// 17. Seraphim - multi-wing angel + halo
gen_seraphim: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(255,215,0,0.3)"/>
<!-- Flowing robe covering legs -->
<path d="M 18,40 L 14,82 L 46,82 L 42,40 Z" fill="#fef3c7"/>
<!-- Robe folds -->
<path d="M 22,50 Q 24,62 22,74" stroke="#fbbf24" stroke-width="0.5" fill="none" opacity="0.5"/>
<path d="M 38,50 Q 36,62 38,74" stroke="#fbbf24" stroke-width="0.5" fill="none" opacity="0.5"/>
<!-- Body -->
<rect x="18" y="26" width="24" height="20" fill="#fef9c3"/>
<!-- Golden sash -->
<path d="M 18,36 Q 30,40 42,36" stroke="#d97706" stroke-width="2" fill="none"/>
<!-- Arms extended -->
<path d="M 18,30 Q 10,36 8,44" stroke="#fef9c3" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 42,30 Q 50,36 52,44" stroke="#fef9c3" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Multiple wing pairs (3 pairs) -->
<!-- Top wings - covering face area -->
<path d="M 18,22 Q 4,10 -2,18 Q 4,14 8,20 Q 4,12 0,14 Q 6,6 14,16" fill="#fef9c3" stroke="#fde68a" stroke-width="0.5"/>
<path d="M 42,22 Q 56,10 62,18 Q 56,14 52,20 Q 56,12 60,14 Q 54,6 46,16" fill="#fef9c3" stroke="#fde68a" stroke-width="0.5"/>
<!-- Middle wings - flying -->
<path d="M 18,32 Q -2,28 -6,36 Q 0,32 6,38 Q 0,30 -4,34 Q 4,24 14,34" fill="#fef3c7" stroke="#fde68a" stroke-width="0.5"/>
<path d="M 42,32 Q 62,28 66,36 Q 60,32 54,38 Q 60,30 64,34 Q 56,24 46,34" fill="#fef3c7" stroke="#fde68a" stroke-width="0.5"/>
<!-- Bottom wings - covering feet -->
<path d="M 18,44 Q 2,48 -2,54 Q 4,50 10,54 Q 4,50 0,54 Q 8,44 16,50" fill="#fef9c3" stroke="#fde68a" stroke-width="0.5"/>
<path d="M 42,44 Q 58,48 62,54 Q 56,50 50,54 Q 56,50 60,54 Q 52,44 44,50" fill="#fef9c3" stroke="#fde68a" stroke-width="0.5"/>
<!-- Head -->
<circle cx="30" cy="16" r="8" fill="#fef9c3"/>
<!-- Halo -->
<ellipse cx="30" cy="4" rx="8" ry="3" fill="none" stroke="#fbbf24" stroke-width="2"/>
<ellipse cx="30" cy="4" rx="8" ry="3" fill="#fde68a" opacity="0.3"/>
<!-- Divine eyes -->
<circle cx="26" cy="16" r="1.5" fill="#fbbf24"/>
<circle cx="34" cy="16" r="1.5" fill="#fbbf24"/>
<!-- Serene mouth -->
<line x1="27" y1="20" x2="33" y2="20" stroke="#d97706" stroke-width="0.5"/>
<!-- Divine glow -->
<circle cx="30" cy="30" r="20" fill="#fde68a" opacity="0.1"/>
</svg>`,

// 18. Fallen Angel - broken dark wings
gen_fallen_angel: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
<!-- Legs -->
<rect x="23" y="60" width="5" height="18" fill="#1e1b4b"/>
<rect x="32" y="60" width="5" height="18" fill="#1e1b4b"/>
<!-- Dark boots -->
<rect x="21" y="76" width="8" height="8" fill="#0f0a2a" rx="2"/>
<rect x="31" y="76" width="8" height="8" fill="#0f0a2a" rx="2"/>
<!-- Tattered dark robe -->
<path d="M 16,28 L 12,78 L 24,74 L 28,80 L 32,74 L 36,80 L 40,74 L 48,78 L 44,28 Z" fill="#1e1b4b"/>
<!-- Dark armor chest -->
<rect x="18" y="28" width="24" height="22" fill="#312e81" rx="2"/>
<!-- Broken halo pieces -->
<path d="M 22,2 Q 26,0 30,2" stroke="#78716c" stroke-width="1.5" fill="none"/>
<path d="M 34,2 Q 38,4 36,6" stroke="#78716c" stroke-width="1.5" fill="none"/>
<!-- Dark chain -->
<path d="M 22,30 Q 30,34 38,30" stroke="#4b5563" stroke-width="1.5" fill="none"/>
<!-- Arms -->
<path d="M 16,32 Q 8,40 10,52" stroke="#1e1b4b" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,32 Q 52,40 50,52" stroke="#1e1b4b" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Dark sword -->
<rect x="48" y="32" width="3" height="24" fill="#4b5563"/>
<polygon points="48,56 51,56 49.5,62" fill="#374151"/>
<!-- Dark energy on blade -->
<line x1="49" y1="34" x2="52" y2="38" stroke="#7c3aed" stroke-width="0.5" opacity="0.6"/>
<!-- Broken dark wings - left -->
<path d="M 16,30 Q 2,20 -2,28" stroke="#1e1b4b" stroke-width="2" fill="none"/>
<path d="M 16,34 Q 4,28 0,36" stroke="#1e1b4b" stroke-width="2" fill="none"/>
<path d="M 16,38 Q 6,38 2,44" stroke="#1e1b4b" stroke-width="1.5" fill="none"/>
<!-- Broken wing tip -->
<line x1="-2" y1="28" x2="-4" y2="32" stroke="#312e81" stroke-width="1"/>
<!-- Broken dark wings - right -->
<path d="M 44,30 Q 58,20 62,28" stroke="#1e1b4b" stroke-width="2" fill="none"/>
<path d="M 44,34 Q 56,28 60,36" stroke="#1e1b4b" stroke-width="2" fill="none"/>
<path d="M 44,38 Q 54,38 58,44" stroke="#1e1b4b" stroke-width="1.5" fill="none"/>
<!-- Feathers falling -->
<path d="M 4,50 Q 6,54 4,58" stroke="#312e81" stroke-width="1" fill="none" opacity="0.5"/>
<path d="M 56,52 Q 54,56 56,60" stroke="#312e81" stroke-width="1" fill="none" opacity="0.5"/>
<!-- Head -->
<circle cx="30" cy="16" r="8" fill="#a5b4fc" opacity="0.8"/>
<!-- Dark eyes -->
<circle cx="26" cy="16" r="2" fill="#312e81"/>
<circle cx="34" cy="16" r="2" fill="#312e81"/>
<!-- Tear streak -->
<line x1="26" y1="18" x2="26" y2="22" stroke="#7c3aed" stroke-width="0.5" opacity="0.6"/>
<!-- Grim mouth -->
<path d="M 27,22 Q 30,20 33,22" fill="none" stroke="#4b5563" stroke-width="0.8"/>
</svg>`,

// 19. Serpent - coiled serpent
gen_serpent: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Coiled body base -->
<ellipse cx="30" cy="72" rx="16" ry="8" fill="#15803d"/>
<ellipse cx="30" cy="72" rx="16" ry="8" fill="none" stroke="#166534" stroke-width="1"/>
<!-- Second coil -->
<ellipse cx="30" cy="60" rx="14" ry="7" fill="#16a34a"/>
<ellipse cx="30" cy="60" rx="14" ry="7" fill="none" stroke="#15803d" stroke-width="1"/>
<!-- Third coil -->
<ellipse cx="30" cy="48" rx="12" ry="6" fill="#22c55e"/>
<ellipse cx="30" cy="48" rx="12" ry="6" fill="none" stroke="#16a34a" stroke-width="1"/>
<!-- Body rising up -->
<path d="M 30,42 Q 36,36 34,28 Q 32,20 30,16" stroke="#22c55e" stroke-width="8" fill="none" stroke-linecap="round"/>
<!-- Belly pattern -->
<path d="M 28,42 Q 30,36 28,28" stroke="#86efac" stroke-width="3" fill="none" opacity="0.5"/>
<!-- Scale pattern -->
<path d="M 18,72 Q 22,68 26,72" stroke="#166534" stroke-width="0.5" fill="none"/>
<path d="M 34,72 Q 38,68 42,72" stroke="#166534" stroke-width="0.5" fill="none"/>
<path d="M 20,60 Q 24,56 28,60" stroke="#15803d" stroke-width="0.5" fill="none"/>
<path d="M 32,60 Q 36,56 40,60" stroke="#15803d" stroke-width="0.5" fill="none"/>
<!-- Diamond pattern on back -->
<polygon points="30,34 28,38 30,42 32,38" fill="#15803d" opacity="0.5"/>
<polygon points="32,24 30,28 32,32 34,28" fill="#15803d" opacity="0.5"/>
<!-- Head -->
<ellipse cx="30" cy="12" rx="8" ry="6" fill="#22c55e"/>
<!-- Head top -->
<path d="M 22,10 Q 30,4 38,10" fill="#16a34a"/>
<!-- Eyes -->
<ellipse cx="26" cy="10" rx="2" ry="2.5" fill="#fbbf24"/>
<ellipse cx="26" cy="10" rx="1" ry="2" fill="#0f172a"/>
<ellipse cx="34" cy="10" rx="2" ry="2.5" fill="#fbbf24"/>
<ellipse cx="34" cy="10" rx="1" ry="2" fill="#0f172a"/>
<!-- Forked tongue -->
<path d="M 30,18 L 30,22 L 28,24" stroke="#dc2626" stroke-width="1" fill="none"/>
<path d="M 30,22 L 32,24" stroke="#dc2626" stroke-width="1" fill="none"/>
<!-- Hood/frill -->
<path d="M 22,8 Q 18,12 20,18" stroke="#16a34a" stroke-width="3" fill="none"/>
<path d="M 38,8 Q 42,12 40,18" stroke="#16a34a" stroke-width="3" fill="none"/>
<!-- Tail tip -->
<path d="M 42,74 Q 48,78 46,82" stroke="#15803d" stroke-width="2" fill="none"/>
</svg>`,

// 20. Demon - horned red + trident
gen_demon: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(200,0,0,0.3)"/>
<!-- Legs -->
<rect x="22" y="60" width="6" height="16" fill="#991b1b"/>
<rect x="32" y="60" width="6" height="16" fill="#991b1b"/>
<!-- Hooves -->
<rect x="20" y="76" width="8" height="8" fill="#1c1917" rx="1"/>
<rect x="32" y="76" width="8" height="8" fill="#1c1917" rx="1"/>
<!-- Tail -->
<path d="M 30,60 Q 50,56 52,66 Q 54,72 50,74" stroke="#dc2626" stroke-width="2.5" fill="none"/>
<polygon points="50,74 46,70 50,68" fill="#dc2626"/>
<!-- Muscular red body -->
<rect x="14" y="24" width="32" height="36" fill="#dc2626" rx="3"/>
<!-- Chest muscles -->
<path d="M 20,28 Q 25,34 30,28" fill="none" stroke="#991b1b" stroke-width="1"/>
<path d="M 30,28 Q 35,34 40,28" fill="none" stroke="#991b1b" stroke-width="1"/>
<!-- Belt with skull buckle -->
<rect x="14" y="52" width="32" height="4" fill="#44403c"/>
<circle cx="30" cy="54" r="3" fill="#e2e8f0"/>
<circle cx="28" cy="53" r="0.8" fill="#0f172a"/>
<circle cx="32" cy="53" r="0.8" fill="#0f172a"/>
<!-- Arms -->
<path d="M 14,28 Q 4,38 6,50" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 56,34 56,42" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Trident -->
<line x1="56" y1="8" x2="56" y2="56" stroke="#78716c" stroke-width="2"/>
<polygon points="56,4 52,12 56,10 60,12" fill="#94a3b8"/>
<line x1="52" y1="8" x2="52" y2="12" stroke="#94a3b8" stroke-width="1.5"/>
<line x1="60" y1="8" x2="60" y2="12" stroke="#94a3b8" stroke-width="1.5"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="18" fill="#dc2626" rx="4"/>
<!-- Horns -->
<path d="M 20,8 Q 14,0 16,4 Q 12,-4 14,-2" stroke="#44403c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M 40,8 Q 46,0 44,4 Q 48,-4 46,-2" stroke="#44403c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<!-- Glowing yellow eyes -->
<circle cx="26" cy="12" r="2" fill="#fbbf24"/>
<circle cx="34" cy="12" r="2" fill="#fbbf24"/>
<circle cx="26" cy="12" r="1" fill="#0f172a"/>
<circle cx="34" cy="12" r="1" fill="#0f172a"/>
<!-- Fanged grin -->
<path d="M 24,18 Q 30,22 36,18" fill="#7f1d1d" stroke="#991b1b" stroke-width="0.5"/>
<line x1="27" y1="18" x2="27" y2="20" stroke="#fef9c3" stroke-width="1"/>
<line x1="33" y1="18" x2="33" y2="20" stroke="#fef9c3" stroke-width="1"/>
</svg>`,

// 21. Soul Reaper - hooded + scythe
gen_soul_reaper: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
<!-- Tattered robe bottom -->
<path d="M 14,40 L 10,80 L 18,78 L 22,82 L 28,76 L 32,82 L 38,78 L 42,82 L 50,80 L 46,40 Z" fill="#0f172a"/>
<!-- Robe body -->
<rect x="16" y="24" width="28" height="20" fill="#0f172a" rx="2"/>
<!-- Inner robe darkness -->
<rect x="24" y="28" width="12" height="14" fill="#020617"/>
<!-- Ethereal wisps from robe -->
<path d="M 18,76 Q 14,70 16,64" stroke="#6b7280" stroke-width="0.5" fill="none" opacity="0.4"/>
<path d="M 42,76 Q 46,70 44,64" stroke="#6b7280" stroke-width="0.5" fill="none" opacity="0.4"/>
<!-- Arms -->
<path d="M 16,28 Q 6,36 4,46" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,28 Q 54,36 56,42" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Skeletal hands -->
<path d="M 4,46 L 2,48 L 4,48 L 2,50 L 4,50 L 2,52" stroke="#d4d4d8" stroke-width="0.8" fill="none"/>
<!-- Scythe -->
<line x1="56" y1="8" x2="56" y2="60" stroke="#57534e" stroke-width="2"/>
<path d="M 56,8 Q 46,6 42,14 Q 40,20 44,22" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
<!-- Scythe blade gleam -->
<path d="M 56,8 Q 48,8 44,14" fill="none" stroke="#e2e8f0" stroke-width="0.5" opacity="0.6"/>
<!-- Hood -->
<path d="M 14,24 C 14,2 46,2 46,24 L 44,30 L 16,30 Z" fill="#0f172a"/>
<!-- Face void -->
<ellipse cx="30" cy="16" rx="8" ry="8" fill="#020617"/>
<!-- Glowing eyes in void -->
<circle cx="26" cy="16" r="2" fill="#dc2626" opacity="0.8"/>
<circle cx="34" cy="16" r="2" fill="#dc2626" opacity="0.8"/>
<!-- Soul orbs floating -->
<circle cx="10" cy="60" r="2" fill="#93c5fd" opacity="0.4"/>
<circle cx="50" cy="54" r="2" fill="#93c5fd" opacity="0.4"/>
<circle cx="14" cy="48" r="1.5" fill="#a5b4fc" opacity="0.3"/>
</svg>`,

// 22. Time Paradox - glitching humanoid
gen_time_paradox: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,200,200,0.3)"/>
<!-- Glitch offset body - red channel -->
<g opacity="0.3" transform="translate(-2, 0)">
<rect x="24" y="60" width="5" height="18" fill="#ef4444"/>
<rect x="32" y="60" width="5" height="18" fill="#ef4444"/>
<rect x="18" y="28" width="24" height="32" fill="#ef4444" rx="2"/>
<circle cx="30" cy="16" r="8" fill="#ef4444"/>
</g>
<!-- Glitch offset body - blue channel -->
<g opacity="0.3" transform="translate(2, 0)">
<rect x="24" y="60" width="5" height="18" fill="#3b82f6"/>
<rect x="32" y="60" width="5" height="18" fill="#3b82f6"/>
<rect x="18" y="28" width="24" height="32" fill="#3b82f6" rx="2"/>
<circle cx="30" cy="16" r="8" fill="#3b82f6"/>
</g>
<!-- Main body - cyan -->
<rect x="24" y="60" width="5" height="18" fill="#06b6d4"/>
<rect x="32" y="60" width="5" height="18" fill="#06b6d4"/>
<!-- Glitch slices on legs -->
<rect x="22" y="66" width="9" height="2" fill="#0f172a"/>
<rect x="34" y="70" width="6" height="2" fill="#0f172a"/>
<!-- Body -->
<rect x="18" y="28" width="24" height="32" fill="#06b6d4" rx="2"/>
<!-- Glitch slices on body -->
<rect x="16" y="34" width="28" height="2" fill="#0f172a"/>
<rect x="20" y="42" width="22" height="1" fill="#22d3ee"/>
<rect x="14" y="48" width="30" height="2" fill="#0f172a"/>
<!-- Digital patterns -->
<text x="20" y="40" font-size="4" fill="#0f172a" opacity="0.5">010110</text>
<text x="22" y="54" font-size="4" fill="#0f172a" opacity="0.5">110010</text>
<!-- Arms -->
<path d="M 18,32 Q 10,40 12,50" stroke="#06b6d4" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 42,32 Q 50,40 48,50" stroke="#06b6d4" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Head -->
<circle cx="30" cy="16" r="8" fill="#06b6d4"/>
<!-- Glitch on head -->
<rect x="22" y="14" width="16" height="2" fill="#0f172a"/>
<!-- Static eyes -->
<rect x="24" y="13" width="4" height="2" fill="#fef08a"/>
<rect x="32" y="13" width="4" height="2" fill="#fef08a"/>
<!-- Clock symbols -->
<circle cx="30" cy="38" r="4" fill="none" stroke="#22d3ee" stroke-width="1"/>
<line x1="30" y1="36" x2="30" y2="38" stroke="#22d3ee" stroke-width="1"/>
<line x1="30" y1="38" x2="32" y2="39" stroke="#22d3ee" stroke-width="1"/>
</svg>`,

// 23. Echo Clone - translucent ghost
gen_echo_clone: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.15)"/>
<!-- Background echo (farthest) -->
<g opacity="0.15" transform="translate(6, 4)">
<rect x="24" y="60" width="5" height="18" fill="#94a3b8"/>
<rect x="32" y="60" width="5" height="18" fill="#94a3b8"/>
<rect x="18" y="28" width="24" height="32" fill="#94a3b8" rx="2"/>
<circle cx="30" cy="16" r="8" fill="#94a3b8"/>
</g>
<!-- Middle echo -->
<g opacity="0.25" transform="translate(3, 2)">
<rect x="24" y="60" width="5" height="18" fill="#94a3b8"/>
<rect x="32" y="60" width="5" height="18" fill="#94a3b8"/>
<rect x="18" y="28" width="24" height="32" fill="#94a3b8" rx="2"/>
<circle cx="30" cy="16" r="8" fill="#94a3b8"/>
</g>
<!-- Main translucent body -->
<g opacity="0.5">
<!-- Legs -->
<rect x="24" y="60" width="5" height="18" fill="#cbd5e1"/>
<rect x="32" y="60" width="5" height="18" fill="#cbd5e1"/>
<!-- Feet fade -->
<rect x="24" y="74" width="5" height="4" fill="#cbd5e1" opacity="0.3"/>
<rect x="32" y="74" width="5" height="4" fill="#cbd5e1" opacity="0.3"/>
<!-- Body -->
<rect x="18" y="28" width="24" height="32" fill="#cbd5e1" rx="2"/>
<!-- Arms -->
<path d="M 18,32 Q 10,40 12,50" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M 42,32 Q 50,40 48,50" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Head -->
<circle cx="30" cy="16" r="8" fill="#cbd5e1"/>
<!-- Hollow eyes -->
<circle cx="26" cy="16" r="2" fill="#475569"/>
<circle cx="34" cy="16" r="2" fill="#475569"/>
<!-- Open mouth -->
<ellipse cx="30" cy="22" rx="2" ry="1.5" fill="#475569"/>
</g>
<!-- Ghostly wisps -->
<path d="M 20,70 Q 16,74 20,78" stroke="#cbd5e1" stroke-width="0.5" fill="none" opacity="0.3"/>
<path d="M 40,68 Q 44,72 40,76" stroke="#cbd5e1" stroke-width="0.5" fill="none" opacity="0.3"/>
</svg>`,

// 24. Energy Being - glowing energy figure
gen_energy_being: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(250,204,21,0.3)"/>
<!-- Outer glow -->
<ellipse cx="30" cy="46" rx="22" ry="36" fill="#fde68a" opacity="0.1"/>
<ellipse cx="30" cy="46" rx="18" ry="30" fill="#fde68a" opacity="0.15"/>
<!-- Energy legs -->
<path d="M 24,60 Q 22,70 20,80" stroke="#fbbf24" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/>
<path d="M 36,60 Q 38,70 40,80" stroke="#fbbf24" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/>
<!-- Energy wisps from feet -->
<path d="M 20,80 Q 16,78 14,82" stroke="#fde68a" stroke-width="1" fill="none" opacity="0.4"/>
<path d="M 40,80 Q 44,78 46,82" stroke="#fde68a" stroke-width="1" fill="none" opacity="0.4"/>
<!-- Energy body -->
<ellipse cx="30" cy="42" rx="14" ry="20" fill="#fbbf24" opacity="0.6"/>
<ellipse cx="30" cy="42" rx="10" ry="16" fill="#fef08a" opacity="0.5"/>
<!-- Core -->
<circle cx="30" cy="40" r="5" fill="#fef9c3" opacity="0.8"/>
<!-- Energy arms -->
<path d="M 16,34 Q 6,38 2,44" stroke="#fbbf24" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>
<path d="M 44,34 Q 54,38 58,44" stroke="#fbbf24" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>
<!-- Energy arcs from hands -->
<path d="M 2,44 Q -2,40 0,36" stroke="#fef08a" stroke-width="1" fill="none" opacity="0.5"/>
<path d="M 58,44 Q 62,40 60,36" stroke="#fef08a" stroke-width="1" fill="none" opacity="0.5"/>
<!-- Head -->
<circle cx="30" cy="16" r="8" fill="#fbbf24" opacity="0.7"/>
<circle cx="30" cy="16" r="5" fill="#fef08a" opacity="0.6"/>
<!-- Eyes -->
<circle cx="26" cy="16" r="2" fill="#fef9c3"/>
<circle cx="34" cy="16" r="2" fill="#fef9c3"/>
<!-- Energy crackle -->
<path d="M 20,26 L 16,22 L 22,20" stroke="#fef08a" stroke-width="0.8" fill="none" opacity="0.6"/>
<path d="M 40,24 L 44,20 L 38,18" stroke="#fef08a" stroke-width="0.8" fill="none" opacity="0.6"/>
<path d="M 26,50 L 22,54 L 28,56" stroke="#fef08a" stroke-width="0.8" fill="none" opacity="0.4"/>
<path d="M 34,48 L 38,52 L 32,54" stroke="#fef08a" stroke-width="0.8" fill="none" opacity="0.4"/>
</svg>`,

// 25. Quantum Ghost - phasing transparent
gen_quantum_ghost: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(100,200,255,0.2)"/>
<!-- Phase shimmer background -->
<rect x="20" y="20" width="20" height="60" fill="#a5f3fc" opacity="0.05"/>
<!-- Ghost body - wavy bottom -->
<path d="M 16,30 L 16,70 Q 20,76 24,70 Q 28,76 32,70 Q 36,76 40,70 Q 44,76 44,70 L 44,30 Q 30,24 16,30 Z" fill="#67e8f9" opacity="0.35"/>
<!-- Inner shimmer -->
<path d="M 20,34 L 20,66 Q 24,70 28,66 Q 32,70 36,66 Q 40,70 40,66 L 40,34 Q 30,30 20,34 Z" fill="#a5f3fc" opacity="0.25"/>
<!-- Phase lines through body -->
<line x1="12" y1="36" x2="48" y2="36" stroke="#22d3ee" stroke-width="0.5" opacity="0.3"/>
<line x1="14" y1="46" x2="46" y2="46" stroke="#22d3ee" stroke-width="0.5" opacity="0.3"/>
<line x1="12" y1="56" x2="48" y2="56" stroke="#22d3ee" stroke-width="0.5" opacity="0.3"/>
<!-- Arms phasing -->
<path d="M 16,36 Q 6,42 4,50" stroke="#67e8f9" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.4"/>
<path d="M 44,36 Q 54,42 56,50" stroke="#67e8f9" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.4"/>
<!-- Phase duplicate arms -->
<path d="M 16,38 Q 8,44 6,52" stroke="#a5f3fc" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.2"/>
<path d="M 44,38 Q 52,44 54,52" stroke="#a5f3fc" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.2"/>
<!-- Head -->
<circle cx="30" cy="18" r="10" fill="#67e8f9" opacity="0.4"/>
<circle cx="30" cy="18" r="7" fill="#a5f3fc" opacity="0.3"/>
<!-- Phase duplicate head -->
<circle cx="32" cy="16" r="9" fill="#67e8f9" opacity="0.15"/>
<!-- Eyes -->
<circle cx="26" cy="18" r="2" fill="#06b6d4" opacity="0.7"/>
<circle cx="34" cy="18" r="2" fill="#06b6d4" opacity="0.7"/>
<!-- Quantum particles -->
<circle cx="12" cy="30" r="1" fill="#22d3ee" opacity="0.5"/>
<circle cx="48" cy="34" r="1" fill="#22d3ee" opacity="0.5"/>
<circle cx="14" cy="52" r="1" fill="#22d3ee" opacity="0.4"/>
<circle cx="46" cy="60" r="1" fill="#22d3ee" opacity="0.4"/>
<circle cx="30" cy="8" r="1" fill="#22d3ee" opacity="0.3"/>
</svg>`,

// 26. Void Walker - dark void entity
gen_void_walker: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(40,0,80,0.4)"/>
<!-- Void aura -->
<ellipse cx="30" cy="46" rx="24" ry="38" fill="#1e1b4b" opacity="0.15"/>
<!-- Shadowy legs -->
<path d="M 24,60 Q 20,72 18,82" stroke="#0f0a2a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 36,60 Q 40,72 42,82" stroke="#0f0a2a" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Void tendrils from feet -->
<path d="M 18,82 Q 12,78 8,82" stroke="#1e1b4b" stroke-width="1.5" fill="none" opacity="0.5"/>
<path d="M 42,82 Q 48,78 52,82" stroke="#1e1b4b" stroke-width="1.5" fill="none" opacity="0.5"/>
<!-- Dark body mass -->
<ellipse cx="30" cy="42" rx="16" ry="22" fill="#0f0a2a"/>
<!-- Void cracks -->
<path d="M 20,34 L 24,38 L 20,42" stroke="#7c3aed" stroke-width="0.5" fill="none" opacity="0.5"/>
<path d="M 40,36 L 36,40 L 40,44" stroke="#7c3aed" stroke-width="0.5" fill="none" opacity="0.5"/>
<!-- Inner void -->
<ellipse cx="30" cy="42" rx="8" ry="12" fill="#020617"/>
<!-- Void stars inside -->
<circle cx="28" cy="38" r="0.5" fill="#c084fc" opacity="0.6"/>
<circle cx="32" cy="44" r="0.5" fill="#c084fc" opacity="0.6"/>
<circle cx="26" cy="46" r="0.5" fill="#a855f7" opacity="0.4"/>
<circle cx="34" cy="36" r="0.5" fill="#a855f7" opacity="0.4"/>
<!-- Dark arms -->
<path d="M 14,34 Q 4,38 0,48" stroke="#0f0a2a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,34 Q 56,38 60,48" stroke="#0f0a2a" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Void claws -->
<path d="M 0,48 L -4,44" stroke="#7c3aed" stroke-width="1" opacity="0.6"/>
<path d="M 0,48 L -4,48" stroke="#7c3aed" stroke-width="1" opacity="0.6"/>
<path d="M 0,48 L -4,52" stroke="#7c3aed" stroke-width="1" opacity="0.6"/>
<path d="M 60,48 L 64,44" stroke="#7c3aed" stroke-width="1" opacity="0.6"/>
<path d="M 60,48 L 64,48" stroke="#7c3aed" stroke-width="1" opacity="0.6"/>
<path d="M 60,48 L 64,52" stroke="#7c3aed" stroke-width="1" opacity="0.6"/>
<!-- Head - void -->
<circle cx="30" cy="16" r="10" fill="#0f0a2a"/>
<!-- Void eyes -->
<circle cx="25" cy="14" r="3" fill="#7c3aed" opacity="0.7"/>
<circle cx="35" cy="14" r="3" fill="#7c3aed" opacity="0.7"/>
<circle cx="25" cy="14" r="1.5" fill="#c084fc"/>
<circle cx="35" cy="14" r="1.5" fill="#c084fc"/>
<!-- Dark crown tendrils -->
<path d="M 22,8 Q 20,2 22,0" stroke="#1e1b4b" stroke-width="2" fill="none"/>
<path d="M 30,6 Q 30,0 30,-2" stroke="#1e1b4b" stroke-width="2" fill="none"/>
<path d="M 38,8 Q 40,2 38,0" stroke="#1e1b4b" stroke-width="2" fill="none"/>
</svg>`,

// 27. Cosmic Seed - glowing orb
gen_cosmic_seed: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(168,85,247,0.3)"/>
<!-- Outer energy rings -->
<ellipse cx="30" cy="45" rx="24" ry="28" fill="none" stroke="#c084fc" stroke-width="0.5" opacity="0.2"/>
<ellipse cx="30" cy="45" rx="20" ry="24" fill="none" stroke="#a855f7" stroke-width="0.8" opacity="0.3"/>
<!-- Outer glow -->
<circle cx="30" cy="45" r="22" fill="#a855f7" opacity="0.08"/>
<circle cx="30" cy="45" r="18" fill="#c084fc" opacity="0.1"/>
<!-- Main orb -->
<circle cx="30" cy="45" r="16" fill="#7c3aed" opacity="0.6"/>
<circle cx="30" cy="45" r="12" fill="#a855f7" opacity="0.6"/>
<circle cx="30" cy="45" r="8" fill="#c084fc" opacity="0.7"/>
<!-- Core -->
<circle cx="30" cy="45" r="4" fill="#e9d5ff" opacity="0.9"/>
<circle cx="30" cy="45" r="2" fill="#fef9c3"/>
<!-- Surface patterns - cosmic swirls -->
<path d="M 18,40 Q 22,36 28,40" stroke="#e9d5ff" stroke-width="0.5" fill="none" opacity="0.5"/>
<path d="M 32,50 Q 38,46 42,50" stroke="#e9d5ff" stroke-width="0.5" fill="none" opacity="0.5"/>
<path d="M 24,54 Q 30,50 36,54" stroke="#e9d5ff" stroke-width="0.5" fill="none" opacity="0.4"/>
<!-- Energy tendrils extending -->
<path d="M 14,40 Q 8,34 4,38" stroke="#c084fc" stroke-width="1" fill="none" opacity="0.4"/>
<path d="M 46,40 Q 52,34 56,38" stroke="#c084fc" stroke-width="1" fill="none" opacity="0.4"/>
<path d="M 20,56 Q 14,62 10,60" stroke="#c084fc" stroke-width="1" fill="none" opacity="0.3"/>
<path d="M 40,56 Q 46,62 50,60" stroke="#c084fc" stroke-width="1" fill="none" opacity="0.3"/>
<path d="M 30,24 Q 28,18 30,14" stroke="#c084fc" stroke-width="1" fill="none" opacity="0.4"/>
<path d="M 30,66 Q 32,72 30,76" stroke="#c084fc" stroke-width="1" fill="none" opacity="0.3"/>
<!-- Sparkle particles -->
<circle cx="10" cy="30" r="1" fill="#e9d5ff" opacity="0.5"/>
<circle cx="50" cy="32" r="1" fill="#e9d5ff" opacity="0.5"/>
<circle cx="14" cy="58" r="1" fill="#e9d5ff" opacity="0.4"/>
<circle cx="46" cy="56" r="1" fill="#e9d5ff" opacity="0.4"/>
<circle cx="30" cy="10" r="1" fill="#e9d5ff" opacity="0.3"/>
<circle cx="30" cy="78" r="1" fill="#e9d5ff" opacity="0.3"/>
</svg>`,

// ===================== BOSSES =====================

// BOSS 1. Lodge Master - grandmaster + eye staff
gen_lodge_master: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Ornate robe legs -->
<path d="M 18,50 L 14,82 L 30,80 L 46,82 L 42,50 Z" fill="#1e1b4b"/>
<!-- Gold robe trim -->
<path d="M 14,82 L 30,80 L 46,82" stroke="#d97706" stroke-width="2" fill="none"/>
<!-- Robe body -->
<rect x="16" y="26" width="28" height="28" fill="#312e81" rx="2"/>
<!-- Ornate collar -->
<path d="M 16,26 Q 30,20 44,26" stroke="#d97706" stroke-width="3" fill="none"/>
<!-- Masonic symbols on robe -->
<polygon points="30,32 26,40 34,40" fill="none" stroke="#fbbf24" stroke-width="1"/>
<!-- Eye in triangle -->
<circle cx="30" cy="37" r="2" fill="#fbbf24"/>
<circle cx="30" cy="37" r="1" fill="#0f172a"/>
<!-- Compass & square -->
<path d="M 24,44 L 30,50 L 36,44" fill="none" stroke="#fbbf24" stroke-width="1"/>
<path d="M 24,50 L 30,44 L 36,50" fill="none" stroke="#fbbf24" stroke-width="1"/>
<!-- Arms -->
<path d="M 16,30 Q 8,40 6,50" stroke="#312e81" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,30 Q 52,34 56,38" stroke="#312e81" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Eye Staff -->
<line x1="56" y1="6" x2="56" y2="64" stroke="#d97706" stroke-width="2.5"/>
<!-- All-seeing eye on staff -->
<circle cx="56" cy="6" r="5" fill="#fbbf24"/>
<circle cx="56" cy="6" r="3" fill="#fef9c3"/>
<circle cx="56" cy="6" r="1.5" fill="#0f172a"/>
<!-- Eye rays -->
<line x1="56" y1="-1" x2="56" y2="-3" stroke="#fbbf24" stroke-width="0.5" opacity="0.6"/>
<line x1="50" y1="4" x2="48" y2="2" stroke="#fbbf24" stroke-width="0.5" opacity="0.6"/>
<line x1="62" y1="4" x2="64" y2="2" stroke="#fbbf24" stroke-width="0.5" opacity="0.6"/>
<!-- Head with ceremonial hat -->
<rect x="22" y="8" width="16" height="16" fill="#fde68a" rx="4"/>
<!-- Top hat -->
<rect x="20" y="-2" width="20" height="12" fill="#1e1b4b" rx="2"/>
<rect x="18" y="8" width="24" height="3" fill="#1e1b4b"/>
<!-- Gold band on hat -->
<rect x="20" y="4" width="20" height="2" fill="#d97706"/>
<!-- Triangle on hat -->
<polygon points="30,0 28,4 32,4" fill="#fbbf24" opacity="0.8"/>
<!-- Eyes -->
<circle cx="26" cy="16" r="1.5" fill="#0f172a"/>
<circle cx="34" cy="16" r="1.5" fill="#0f172a"/>
<!-- Beard -->
<path d="M 22,22 Q 24,28 26,24 Q 28,30 30,24 Q 32,30 34,24 Q 36,28 38,22" fill="#9ca3af"/>
</svg>`,

// BOSS 2. Pope Mech - gold/white mech
gen_pope_mech: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.4)"/>
<!-- Massive mech legs -->
<rect x="14" y="58" width="12" height="22" fill="#f8fafc" rx="2"/>
<rect x="34" y="58" width="12" height="22" fill="#f8fafc" rx="2"/>
<!-- Gold knee joints -->
<circle cx="20" cy="60" r="3" fill="#d97706"/>
<circle cx="40" cy="60" r="3" fill="#d97706"/>
<!-- Hydraulic details -->
<line x1="16" y1="64" x2="16" y2="76" stroke="#94a3b8" stroke-width="1.5"/>
<line x1="44" y1="64" x2="44" y2="76" stroke="#94a3b8" stroke-width="1.5"/>
<!-- Feet -->
<rect x="12" y="78" width="14" height="6" fill="#d97706" rx="2"/>
<rect x="34" y="78" width="14" height="6" fill="#d97706" rx="2"/>
<!-- Massive white/gold body -->
<rect x="8" y="18" width="44" height="42" fill="#f8fafc" rx="4"/>
<!-- Gold trim -->
<rect x="8" y="18" width="44" height="4" fill="#d97706"/>
<rect x="8" y="56" width="44" height="4" fill="#d97706"/>
<!-- Central cross -->
<rect x="28" y="24" width="4" height="28" fill="#d97706"/>
<rect x="18" y="34" width="24" height="4" fill="#d97706"/>
<!-- Papal keys symbol -->
<circle cx="22" cy="48" r="2" fill="#d97706"/>
<circle cx="38" cy="48" r="2" fill="#d97706"/>
<path d="M 22,48 L 22,54" stroke="#d97706" stroke-width="1.5"/>
<path d="M 38,48 L 38,54" stroke="#d97706" stroke-width="1.5"/>
<!-- Massive mech arms -->
<rect x="0" y="22" width="10" height="30" fill="#f8fafc" rx="3"/>
<rect x="50" y="22" width="10" height="30" fill="#f8fafc" rx="3"/>
<!-- Gold shoulder pads -->
<ellipse cx="8" cy="20" rx="6" ry="4" fill="#d97706"/>
<ellipse cx="52" cy="20" rx="6" ry="4" fill="#d97706"/>
<!-- Cannon arm -->
<rect x="50" y="48" width="10" height="6" fill="#94a3b8" rx="2"/>
<rect x="56" y="46" width="6" height="10" fill="#d97706" rx="2"/>
<!-- Mech head -->
<rect x="20" y="2" width="20" height="16" fill="#f8fafc" rx="4"/>
<!-- Gold trim on head -->
<rect x="20" y="2" width="20" height="3" fill="#d97706" rx="2"/>
<!-- Mitre crown on mech -->
<polygon points="30,-4 24,4 36,4" fill="#d97706" stroke="#b45309" stroke-width="0.5"/>
<rect x="28" y="-2" width="4" height="3" fill="#fbbf24"/>
<!-- Visor eyes -->
<rect x="24" y="8" width="12" height="4" fill="#3b82f6" rx="1"/>
<!-- LED cross on face -->
<line x1="30" y1="8" x2="30" y2="12" stroke="#fef9c3" stroke-width="0.5"/>
<line x1="27" y1="10" x2="33" y2="10" stroke="#fef9c3" stroke-width="0.5"/>
</svg>`,

// BOSS 3. Area 51 Commander - military + alien tech
gen_area51_commander: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Military pants -->
<rect x="22" y="58" width="6" height="20" fill="#365314"/>
<rect x="32" y="58" width="6" height="20" fill="#365314"/>
<!-- Camo pattern on pants -->
<rect x="24" y="62" width="3" height="3" fill="#3f6212" opacity="0.5"/>
<rect x="34" y="66" width="3" height="3" fill="#3f6212" opacity="0.5"/>
<!-- Military boots -->
<rect x="20" y="76" width="8" height="8" fill="#1c1917" rx="2"/>
<rect x="32" y="76" width="8" height="8" fill="#1c1917" rx="2"/>
<!-- Military jacket -->
<rect x="14" y="26" width="32" height="32" fill="#365314" rx="2"/>
<!-- Alien tech chest piece -->
<rect x="22" y="32" width="16" height="12" fill="#1e293b" rx="2"/>
<circle cx="30" cy="38" r="4" fill="#22d3ee" opacity="0.6"/>
<circle cx="30" cy="38" r="2" fill="#67e8f9" opacity="0.8"/>
<!-- Medals/badges -->
<rect x="16" y="30" width="4" height="2" fill="#d97706"/>
<rect x="16" y="33" width="4" height="2" fill="#94a3b8"/>
<rect x="16" y="36" width="4" height="2" fill="#dc2626"/>
<!-- Stars on collar -->
<circle cx="18" cy="28" r="1" fill="#fbbf24"/>
<circle cx="42" cy="28" r="1" fill="#fbbf24"/>
<!-- Belt -->
<rect x="14" y="52" width="32" height="3" fill="#1c1917"/>
<!-- Holster -->
<rect x="42" y="50" width="4" height="10" fill="#292524"/>
<!-- Arms -->
<path d="M 14,30 Q 6,40 8,52" stroke="#365314" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,30 Q 54,36 56,42" stroke="#365314" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Alien weapon in hand -->
<rect x="54" y="34" width="4" height="14" fill="#1e293b" rx="1"/>
<circle cx="56" cy="32" r="3" fill="#22d3ee" opacity="0.5"/>
<line x1="56" y1="30" x2="56" y2="26" stroke="#22d3ee" stroke-width="1" opacity="0.6"/>
<!-- Head -->
<rect x="22" y="6" width="16" height="18" fill="#fde68a" rx="4"/>
<!-- Military beret -->
<path d="M 18,10 C 18,2 42,2 42,10" fill="#365314"/>
<ellipse cx="36" cy="4" rx="6" ry="3" fill="#365314"/>
<!-- Beret badge -->
<circle cx="38" cy="4" r="2" fill="#d97706"/>
<!-- Stern face -->
<rect x="24" y="14" width="4" height="2" fill="#0f172a"/>
<rect x="32" y="14" width="4" height="2" fill="#0f172a"/>
<line x1="27" y1="20" x2="33" y2="20" stroke="#78350f" stroke-width="1"/>
<!-- Earpiece with alien glow -->
<circle cx="20" cy="14" r="1.5" fill="#22d3ee" opacity="0.7"/>
</svg>`,

// BOSS 4. Pharaoh - gold mask pharaoh
gen_pharaoh: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(180,140,0,0.3)"/>
<!-- Legs with gold greaves -->
<rect x="22" y="60" width="6" height="16" fill="#1e293b"/>
<rect x="32" y="60" width="6" height="16" fill="#1e293b"/>
<!-- Gold shin guards -->
<rect x="20" y="64" width="8" height="10" fill="#d97706" rx="1"/>
<rect x="32" y="64" width="8" height="10" fill="#d97706" rx="1"/>
<!-- Golden sandals -->
<rect x="20" y="76" width="8" height="8" fill="#b45309" rx="1"/>
<rect x="32" y="76" width="8" height="8" fill="#b45309" rx="1"/>
<!-- Royal loincloth -->
<polygon points="18,56 30,72 42,56" fill="#fbbf24" stroke="#d97706" stroke-width="1"/>
<!-- Royal body armor -->
<rect x="14" y="24" width="32" height="34" fill="#d97706" rx="2"/>
<!-- Chest ornament -->
<polygon points="30,28 22,36 30,44 38,36" fill="#fbbf24" stroke="#b45309" stroke-width="1"/>
<!-- Jewels on chest -->
<circle cx="30" cy="34" r="2" fill="#dc2626"/>
<circle cx="26" cy="36" r="1.5" fill="#2563eb"/>
<circle cx="34" cy="36" r="1.5" fill="#16a34a"/>
<!-- Grand collar -->
<path d="M 10,24 Q 30,18 50,24 Q 48,30 30,28 Q 12,30 10,24 Z" fill="#fbbf24" stroke="#b45309" stroke-width="0.5"/>
<!-- Collar pattern -->
<path d="M 14,26 Q 30,22 46,26" stroke="#dc2626" stroke-width="0.5" fill="none"/>
<path d="M 12,28 Q 30,24 48,28" stroke="#2563eb" stroke-width="0.5" fill="none"/>
<!-- Arms -->
<path d="M 14,28 Q 6,38 8,50" stroke="#d97706" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 46,28 Q 54,34 56,42" stroke="#d97706" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Crook in left hand -->
<path d="M 8,30 Q 4,26 8,22 Q 12,18 8,14" stroke="#fbbf24" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<!-- Flail in right hand -->
<line x1="56" y1="42" x2="56" y2="26" stroke="#fbbf24" stroke-width="2"/>
<path d="M 56,26 L 52,22 L 56,18" stroke="#1e293b" stroke-width="1.5"/>
<path d="M 56,26 L 56,20" stroke="#1e293b" stroke-width="1.5"/>
<path d="M 56,26 L 60,22 L 56,18" stroke="#1e293b" stroke-width="1.5"/>
<!-- Golden death mask -->
<rect x="20" y="2" width="20" height="22" fill="#fbbf24" rx="4"/>
<!-- Nemes headdress -->
<path d="M 16,8 L 14,26 L 20,24 L 20,8 Z" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
<path d="M 44,8 L 46,26 L 40,24 L 40,8 Z" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
<rect x="18" y="0" width="24" height="10" fill="#1e3a5f" rx="4"/>
<!-- Gold stripes on nemes -->
<line x1="18" y1="2" x2="18" y2="10" stroke="#fbbf24" stroke-width="0.5"/>
<line x1="42" y1="2" x2="42" y2="10" stroke="#fbbf24" stroke-width="0.5"/>
<!-- Uraeus cobra -->
<path d="M 30,-2 Q 30,-6 28,-4 Q 30,-8 32,-4 Q 30,-6 30,-2" fill="#fbbf24"/>
<!-- Mask eyes -->
<path d="M 24,10 L 22,12 L 28,12 Z" fill="#0f172a"/>
<path d="M 36,10 L 32,12 L 38,12 Z" fill="#0f172a"/>
<!-- Eye of Horus markings -->
<path d="M 22,12 Q 20,16 22,18" stroke="#1e3a5f" stroke-width="0.8" fill="none"/>
<path d="M 38,12 Q 40,16 38,18" stroke="#1e3a5f" stroke-width="0.8" fill="none"/>
<!-- Mouth -->
<line x1="27" y1="18" x2="33" y2="18" stroke="#b45309" stroke-width="1"/>
</svg>`,

// BOSS 5. Zeus - lightning bolt + white robes
gen_zeus: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Flowing white robe -->
<path d="M 16,34 L 10,82 L 50,82 L 44,34 Z" fill="#f1f5f9"/>
<!-- Robe folds -->
<path d="M 22,40 Q 20,58 24,78" stroke="#cbd5e1" stroke-width="0.8" fill="none"/>
<path d="M 38,40 Q 40,58 36,78" stroke="#cbd5e1" stroke-width="0.8" fill="none"/>
<path d="M 30,36 Q 28,56 30,78" stroke="#cbd5e1" stroke-width="0.5" fill="none"/>
<!-- Gold robe trim -->
<path d="M 10,82 L 30,80 L 50,82" stroke="#d97706" stroke-width="2" fill="none"/>
<!-- Toga drape -->
<path d="M 16,30 Q 10,40 14,50 Q 20,46 26,50" fill="#e2e8f0"/>
<!-- Body -->
<rect x="16" y="24" width="28" height="14" fill="#f1f5f9" rx="2"/>
<!-- Gold belt -->
<path d="M 16,36 Q 30,40 44,36" stroke="#fbbf24" stroke-width="3" fill="none"/>
<!-- Muscular arms -->
<path d="M 16,28 Q 6,36 4,48" stroke="#fde68a" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 44,28 Q 54,32 56,38" stroke="#fde68a" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Lightning bolt in hand -->
<polygon points="56,18 52,28 56,26 50,38 54,36 48,48 58,30 54,32 60,22 56,24" fill="#fbbf24" stroke="#d97706" stroke-width="0.5"/>
<!-- Electric glow -->
<circle cx="54" cy="32" r="6" fill="#fef08a" opacity="0.2"/>
<!-- Head -->
<circle cx="30" cy="14" r="10" fill="#fde68a"/>
<!-- Majestic beard -->
<path d="M 20,18 Q 22,28 24,24 Q 26,30 28,24 Q 30,32 32,24 Q 34,30 36,24 Q 38,28 40,18" fill="#e5e7eb"/>
<!-- Curly hair -->
<path d="M 20,10 C 16,2 24,0 26,4 C 28,-2 32,-2 34,4 C 36,0 44,2 40,10" fill="#e5e7eb"/>
<!-- Eyes -->
<circle cx="26" cy="12" r="2" fill="#93c5fd"/>
<circle cx="34" cy="12" r="2" fill="#93c5fd"/>
<circle cx="26" cy="12" r="1" fill="#0f172a"/>
<circle cx="34" cy="12" r="1" fill="#0f172a"/>
<!-- Electric spark in eyes -->
<circle cx="26" cy="12" r="0.5" fill="#fef08a"/>
<circle cx="34" cy="12" r="0.5" fill="#fef08a"/>
<!-- Laurel crown -->
<path d="M 20,8 Q 18,4 22,4 Q 20,2 24,2" stroke="#16a34a" stroke-width="1.5" fill="none"/>
<path d="M 40,8 Q 42,4 38,4 Q 40,2 36,2" stroke="#16a34a" stroke-width="1.5" fill="none"/>
</svg>`,

// BOSS 6. Odin - eye patch + ravens
gen_odin: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Armored robe -->
<path d="M 16,34 L 12,82 L 48,82 L 44,34 Z" fill="#334155"/>
<!-- Chainmail pattern -->
<path d="M 16,44 Q 20,42 24,44 Q 28,42 32,44 Q 36,42 40,44 Q 44,42 44,44" stroke="#475569" stroke-width="0.5" fill="none"/>
<path d="M 14,54 Q 18,52 22,54 Q 26,52 30,54 Q 34,52 38,54 Q 42,52 46,54" stroke="#475569" stroke-width="0.5" fill="none"/>
<!-- Fur cloak -->
<path d="M 10,26 Q 6,34 8,42" fill="#78716c" stroke="#57534e" stroke-width="1"/>
<path d="M 50,26 Q 54,34 52,42" fill="#78716c" stroke="#57534e" stroke-width="1"/>
<!-- Body armor -->
<rect x="16" y="24" width="28" height="14" fill="#475569" rx="2"/>
<!-- Norse knotwork on chest -->
<path d="M 24,28 Q 30,24 36,28 Q 30,32 24,28" fill="none" stroke="#94a3b8" stroke-width="1"/>
<!-- Arms -->
<path d="M 16,28 Q 6,38 4,50" stroke="#334155" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,28 Q 54,34 56,40" stroke="#334155" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Gungnir spear -->
<line x1="4" y1="10" x2="4" y2="70" stroke="#94a3b8" stroke-width="2.5"/>
<polygon points="4,6 0,16 8,16" fill="#cbd5e1" stroke="#94a3b8" stroke-width="0.5"/>
<!-- Rune on spear -->
<text x="2" y="36" font-size="5" fill="#fbbf24" opacity="0.7">ᚱ</text>
<!-- Head -->
<circle cx="30" cy="14" r="10" fill="#fde68a"/>
<!-- Long beard -->
<path d="M 22,20 Q 24,32 26,28 Q 28,34 30,28 Q 32,34 34,28 Q 36,32 38,20" fill="#d4d4d8"/>
<!-- Hair -->
<path d="M 20,10 C 18,4 30,2 30,8 C 30,2 42,4 40,10" fill="#d4d4d8"/>
<path d="M 40,10 Q 44,18 46,26" stroke="#d4d4d8" stroke-width="2" fill="none"/>
<!-- Good eye -->
<circle cx="34" cy="12" r="2" fill="#60a5fa"/>
<circle cx="34" cy="12" r="1" fill="#0f172a"/>
<!-- Eye patch -->
<rect x="22" y="10" width="6" height="5" fill="#1c1917" rx="1"/>
<line x1="22" y1="12" x2="20" y2="8" stroke="#1c1917" stroke-width="1"/>
<line x1="28" y1="12" x2="32" y2="6" stroke="#1c1917" stroke-width="1"/>
<!-- Winged helmet -->
<path d="M 18,8 Q 14,2 12,6" stroke="#94a3b8" stroke-width="2" fill="none"/>
<path d="M 42,8 Q 46,2 48,6" stroke="#94a3b8" stroke-width="2" fill="none"/>
<!-- Ravens - Huginn -->
<g transform="translate(-4, -4)">
<ellipse cx="12" cy="8" rx="4" ry="2.5" fill="#1c1917"/>
<circle cx="10" cy="7" r="1.5" fill="#1c1917"/>
<polygon points="8,7 6,6 8,8" fill="#d97706"/>
<path d="M 14,6 Q 18,4 20,6" stroke="#1c1917" stroke-width="1" fill="none"/>
</g>
<!-- Muninn -->
<g transform="translate(40, -2)">
<ellipse cx="12" cy="8" rx="4" ry="2.5" fill="#1c1917"/>
<circle cx="10" cy="7" r="1.5" fill="#1c1917"/>
<polygon points="8,7 6,6 8,8" fill="#d97706"/>
<path d="M 14,6 Q 18,4 20,6" stroke="#1c1917" stroke-width="1" fill="none"/>
</g>
</svg>`,

// BOSS 7. Archangel - massive wings + flaming sword
gen_archangel: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(255,215,0,0.3)"/>
<!-- Armored legs -->
<rect x="22" y="60" width="6" height="16" fill="#d97706"/>
<rect x="32" y="60" width="6" height="16" fill="#d97706"/>
<!-- Gold boots -->
<rect x="20" y="74" width="8" height="10" fill="#b45309" rx="2"/>
<rect x="32" y="74" width="8" height="10" fill="#b45309" rx="2"/>
<!-- Holy robe/tabard -->
<polygon points="18,46 14,76 30,78 46,76 42,46" fill="#fef9c3"/>
<!-- Gold trim on tabard -->
<path d="M 14,76 L 30,78 L 46,76" stroke="#d97706" stroke-width="1.5" fill="none"/>
<!-- Golden armor body -->
<rect x="16" y="24" width="28" height="24" fill="#d97706" rx="2"/>
<!-- Armor detail -->
<path d="M 22,28 Q 30,34 38,28" fill="none" stroke="#fbbf24" stroke-width="1"/>
<!-- Holy cross on chest -->
<rect x="28" y="28" width="4" height="14" fill="#fef9c3"/>
<rect x="22" y="32" width="16" height="4" fill="#fef9c3"/>
<!-- Arms -->
<path d="M 16,28 Q 8,36 6,46" stroke="#d97706" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,28 Q 52,32 56,36" stroke="#d97706" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Flaming sword -->
<rect x="54" y="20" width="3" height="22" fill="#fbbf24"/>
<rect x="52" y="18" width="7" height="2" fill="#d97706"/>
<!-- Flame on sword -->
<path d="M 54,20 Q 52,14 54,10 Q 55,16 56,8 Q 57,14 58,12 Q 57,18 57,20" fill="#f97316" opacity="0.8"/>
<path d="M 55,20 Q 54,16 55,12 Q 56,16 56,20" fill="#fbbf24" opacity="0.7"/>
<!-- Massive wings - left -->
<path d="M 16,26 Q -2,10 -8,18 Q -2,12 4,20 Q -4,8 -10,14 Q 0,2 10,16 Q 2,0 -4,6 Q 6,-4 14,12" fill="#fef9c3" stroke="#fde68a" stroke-width="0.5"/>
<!-- Massive wings - right -->
<path d="M 44,26 Q 62,10 68,18 Q 62,12 56,20 Q 64,8 70,14 Q 60,2 50,16 Q 58,0 64,6 Q 54,-4 46,12" fill="#fef9c3" stroke="#fde68a" stroke-width="0.5"/>
<!-- Head -->
<circle cx="30" cy="14" r="8" fill="#fde68a"/>
<!-- Halo -->
<ellipse cx="30" cy="2" rx="10" ry="4" fill="none" stroke="#fbbf24" stroke-width="2.5"/>
<ellipse cx="30" cy="2" rx="10" ry="4" fill="#fef08a" opacity="0.2"/>
<!-- Divine eyes -->
<circle cx="26" cy="14" r="2" fill="#fbbf24"/>
<circle cx="34" cy="14" r="2" fill="#fbbf24"/>
<!-- Stern mouth -->
<line x1="27" y1="20" x2="33" y2="20" stroke="#b45309" stroke-width="0.8"/>
<!-- Holy glow -->
<circle cx="30" cy="40" r="24" fill="#fef08a" opacity="0.06"/>
</svg>`,

// BOSS 8. Hades - skull crown + hellfire
gen_hades: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(200,0,0,0.3)"/>
<!-- Hellfire at base -->
<path d="M 6,82 Q 10,74 14,80 Q 18,70 22,78 Q 26,68 30,76 Q 34,68 38,78 Q 42,70 46,80 Q 50,74 54,82" fill="#dc2626" opacity="0.4"/>
<path d="M 10,82 Q 14,76 18,80 Q 22,72 26,80 Q 30,72 34,80 Q 38,72 42,80 Q 46,76 50,82" fill="#f97316" opacity="0.3"/>
<!-- Dark legs -->
<rect x="22" y="58" width="6" height="20" fill="#1c1917"/>
<rect x="32" y="58" width="6" height="20" fill="#1c1917"/>
<!-- Dark armor body -->
<rect x="12" y="22" width="36" height="38" fill="#1c1917" rx="3"/>
<!-- Skull ornaments on armor -->
<circle cx="22" cy="32" r="3" fill="#d4d4d8"/>
<circle cx="21" cy="31" r="0.8" fill="#0f172a"/>
<circle cx="23" cy="31" r="0.8" fill="#0f172a"/>
<circle cx="38" cy="32" r="3" fill="#d4d4d8"/>
<circle cx="37" cy="31" r="0.8" fill="#0f172a"/>
<circle cx="39" cy="31" r="0.8" fill="#0f172a"/>
<!-- Ribcage armor detail -->
<path d="M 22,38 Q 30,36 38,38" stroke="#374151" stroke-width="1" fill="none"/>
<path d="M 22,42 Q 30,40 38,42" stroke="#374151" stroke-width="1" fill="none"/>
<path d="M 22,46 Q 30,44 38,46" stroke="#374151" stroke-width="1" fill="none"/>
<!-- Dark cape -->
<path d="M 12,24 Q 4,40 6,62" stroke="#0f172a" stroke-width="3" fill="none"/>
<path d="M 48,24 Q 56,40 54,62" stroke="#0f172a" stroke-width="3" fill="none"/>
<!-- Arms -->
<path d="M 12,26 Q 2,36 4,48" stroke="#1c1917" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 48,26 Q 58,36 56,48" stroke="#1c1917" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Hellfire in hands -->
<circle cx="4" cy="48" r="4" fill="#dc2626" opacity="0.5"/>
<circle cx="4" cy="48" r="2" fill="#f97316" opacity="0.6"/>
<circle cx="56" cy="48" r="4" fill="#dc2626" opacity="0.5"/>
<circle cx="56" cy="48" r="2" fill="#f97316" opacity="0.6"/>
<!-- Head -->
<rect x="20" y="2" width="20" height="18" fill="#94a3b8" rx="4"/>
<!-- Skeletal face features -->
<circle cx="26" cy="10" r="2.5" fill="#0f172a"/>
<circle cx="34" cy="10" r="2.5" fill="#0f172a"/>
<!-- Eye fire -->
<circle cx="26" cy="10" r="1.5" fill="#dc2626" opacity="0.7"/>
<circle cx="34" cy="10" r="1.5" fill="#dc2626" opacity="0.7"/>
<!-- Nose hole -->
<polygon points="29,14 31,14 30,16" fill="#0f172a"/>
<!-- Skull teeth -->
<path d="M 25,18 L 26,20 L 28,18 L 30,20 L 32,18 L 34,20 L 35,18" fill="none" stroke="#d4d4d8" stroke-width="1"/>
<!-- Skull crown -->
<path d="M 18,6 Q 16,0 20,2" fill="#d4d4d8"/>
<path d="M 24,4 Q 24,-2 28,0" fill="#d4d4d8"/>
<path d="M 32,4 Q 32,-2 36,0" fill="#d4d4d8"/>
<path d="M 38,4 Q 38,-2 42,0" fill="#d4d4d8"/>
<path d="M 42,6 Q 44,0 40,2" fill="#d4d4d8"/>
<!-- Crown connected -->
<rect x="18" y="2" width="24" height="4" fill="#d4d4d8"/>
</svg>`,

// BOSS 9. Chronos - hourglass body titan
gen_chronos: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,0,0,0.3)"/>
<!-- Hourglass body shape -->
<!-- Top bulb -->
<path d="M 12,20 Q 12,28 20,38 L 24,42 Q 30,46 36,42 L 40,38 Q 48,28 48,20 Z" fill="#d97706" opacity="0.6"/>
<!-- Bottom bulb -->
<path d="M 24,46 Q 30,42 36,46 L 40,50 Q 48,60 48,68 L 12,68 Q 12,60 20,50 Z" fill="#d97706" opacity="0.6"/>
<!-- Hourglass frame -->
<rect x="10" y="18" width="40" height="3" fill="#78716c" rx="1"/>
<rect x="10" y="67" width="40" height="3" fill="#78716c" rx="1"/>
<!-- Neck of hourglass -->
<rect x="26" y="40" width="8" height="6" fill="#fde68a" opacity="0.4"/>
<!-- Sand in top -->
<path d="M 18,30 Q 24,28 30,32 Q 36,28 42,30" fill="#fde68a" opacity="0.5"/>
<!-- Sand falling -->
<line x1="30" y1="42" x2="30" y2="48" stroke="#fde68a" stroke-width="1" opacity="0.6"/>
<!-- Sand pile in bottom -->
<path d="M 20,64 Q 30,58 40,64" fill="#fde68a" opacity="0.5"/>
<!-- Legs extending from bottom -->
<rect x="18" y="68" width="8" height="12" fill="#78716c" rx="2"/>
<rect x="34" y="68" width="8" height="12" fill="#78716c" rx="2"/>
<!-- Feet -->
<rect x="16" y="78" width="10" height="6" fill="#57534e" rx="2"/>
<rect x="34" y="78" width="10" height="6" fill="#57534e" rx="2"/>
<!-- Arms from sides -->
<path d="M 12,28 Q 2,34 0,44" stroke="#78716c" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 48,28 Q 58,34 60,44" stroke="#78716c" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Clock gear on arm -->
<circle cx="0" cy="44" r="4" fill="none" stroke="#d97706" stroke-width="1.5"/>
<line x1="0" y1="40" x2="0" y2="48" stroke="#d97706" stroke-width="0.8"/>
<line x1="-4" y1="44" x2="4" y2="44" stroke="#d97706" stroke-width="0.8"/>
<!-- Head -->
<circle cx="30" cy="12" r="8" fill="#a8a29e"/>
<!-- Clock face on head -->
<circle cx="30" cy="12" r="6" fill="#fef9c3" opacity="0.5"/>
<circle cx="30" cy="12" r="6" fill="none" stroke="#d97706" stroke-width="1"/>
<!-- Clock hands -->
<line x1="30" y1="12" x2="30" y2="8" stroke="#0f172a" stroke-width="1.5"/>
<line x1="30" y1="12" x2="34" y2="14" stroke="#0f172a" stroke-width="1"/>
<circle cx="30" cy="12" r="1" fill="#d97706"/>
<!-- Hour marks -->
<circle cx="30" cy="7" r="0.5" fill="#0f172a"/>
<circle cx="35" cy="12" r="0.5" fill="#0f172a"/>
<circle cx="30" cy="17" r="0.5" fill="#0f172a"/>
<circle cx="25" cy="12" r="0.5" fill="#0f172a"/>
<!-- Time swirl effects -->
<path d="M 8,14 Q 4,10 8,6" stroke="#d97706" stroke-width="0.5" fill="none" opacity="0.4"/>
<path d="M 52,14 Q 56,10 52,6" stroke="#d97706" stroke-width="0.5" fill="none" opacity="0.4"/>
</svg>`,

// BOSS 10. Big Bang - cosmic explosion
gen_big_bang: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(255,100,0,0.3)"/>
<!-- Outermost explosion ring -->
<circle cx="30" cy="45" r="36" fill="#1e1b4b" opacity="0.15"/>
<!-- Explosion shockwaves -->
<circle cx="30" cy="45" r="32" fill="none" stroke="#f97316" stroke-width="0.5" opacity="0.3"/>
<circle cx="30" cy="45" r="28" fill="none" stroke="#dc2626" stroke-width="0.8" opacity="0.4"/>
<circle cx="30" cy="45" r="24" fill="none" stroke="#f97316" stroke-width="1" opacity="0.5"/>
<!-- Explosion matter -->
<circle cx="30" cy="45" r="20" fill="#dc2626" opacity="0.2"/>
<circle cx="30" cy="45" r="16" fill="#f97316" opacity="0.3"/>
<circle cx="30" cy="45" r="12" fill="#fbbf24" opacity="0.4"/>
<!-- Hot core -->
<circle cx="30" cy="45" r="8" fill="#fef08a" opacity="0.6"/>
<circle cx="30" cy="45" r="4" fill="#fef9c3" opacity="0.9"/>
<circle cx="30" cy="45" r="2" fill="white"/>
<!-- Energy rays -->
<line x1="30" y1="45" x2="30" y2="6" stroke="#fbbf24" stroke-width="1.5" opacity="0.4"/>
<line x1="30" y1="45" x2="30" y2="84" stroke="#fbbf24" stroke-width="1.5" opacity="0.4"/>
<line x1="30" y1="45" x2="-2" y2="26" stroke="#fbbf24" stroke-width="1" opacity="0.3"/>
<line x1="30" y1="45" x2="62" y2="26" stroke="#fbbf24" stroke-width="1" opacity="0.3"/>
<line x1="30" y1="45" x2="-2" y2="64" stroke="#fbbf24" stroke-width="1" opacity="0.3"/>
<line x1="30" y1="45" x2="62" y2="64" stroke="#fbbf24" stroke-width="1" opacity="0.3"/>
<line x1="30" y1="45" x2="4" y2="45" stroke="#f97316" stroke-width="1" opacity="0.3"/>
<line x1="30" y1="45" x2="56" y2="45" stroke="#f97316" stroke-width="1" opacity="0.3"/>
<!-- Scattered matter/proto-galaxies -->
<circle cx="10" cy="20" r="2" fill="#c084fc" opacity="0.5"/>
<circle cx="50" cy="22" r="1.5" fill="#60a5fa" opacity="0.5"/>
<circle cx="8" cy="60" r="1.5" fill="#f472b6" opacity="0.4"/>
<circle cx="52" cy="64" r="2" fill="#34d399" opacity="0.4"/>
<circle cx="16" cy="40" r="1" fill="#fbbf24" opacity="0.5"/>
<circle cx="44" cy="50" r="1" fill="#a78bfa" opacity="0.5"/>
<!-- Cosmic dust clouds -->
<ellipse cx="14" cy="30" rx="4" ry="2" fill="#c084fc" opacity="0.15"/>
<ellipse cx="46" cy="36" rx="4" ry="2" fill="#60a5fa" opacity="0.15"/>
<ellipse cx="18" cy="58" rx="4" ry="2" fill="#f472b6" opacity="0.15"/>
<ellipse cx="42" cy="56" rx="4" ry="2" fill="#34d399" opacity="0.15"/>
</svg>`,

// BOSS 11. First Light - pure light being
gen_first_light: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(255,255,200,0.3)"/>
<!-- Outermost aura -->
<circle cx="30" cy="42" r="38" fill="#fef9c3" opacity="0.04"/>
<circle cx="30" cy="42" r="30" fill="#fef9c3" opacity="0.06"/>
<circle cx="30" cy="42" r="24" fill="#fef9c3" opacity="0.08"/>
<!-- Light being body shape -->
<ellipse cx="30" cy="44" rx="14" ry="24" fill="#fef9c3" opacity="0.5"/>
<ellipse cx="30" cy="44" rx="10" ry="20" fill="#fef9c3" opacity="0.6"/>
<ellipse cx="30" cy="44" rx="6" ry="16" fill="white" opacity="0.5"/>
<!-- Light rays from body -->
<line x1="30" y1="20" x2="30" y2="2" stroke="#fef9c3" stroke-width="2" opacity="0.4"/>
<line x1="16" y1="30" x2="4" y2="22" stroke="#fef9c3" stroke-width="1.5" opacity="0.3"/>
<line x1="44" y1="30" x2="56" y2="22" stroke="#fef9c3" stroke-width="1.5" opacity="0.3"/>
<line x1="16" y1="50" x2="2" y2="56" stroke="#fef9c3" stroke-width="1.5" opacity="0.3"/>
<line x1="44" y1="50" x2="58" y2="56" stroke="#fef9c3" stroke-width="1.5" opacity="0.3"/>
<line x1="30" y1="68" x2="30" y2="82" stroke="#fef9c3" stroke-width="2" opacity="0.3"/>
<!-- Energy legs fading -->
<path d="M 26,60 Q 24,70 22,80" stroke="#fef9c3" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.4"/>
<path d="M 34,60 Q 36,70 38,80" stroke="#fef9c3" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.4"/>
<!-- Light arms extending -->
<path d="M 18,36 Q 8,38 2,42" stroke="#fef9c3" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
<path d="M 42,36 Q 52,38 58,42" stroke="#fef9c3" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
<!-- Light orbs at hands -->
<circle cx="2" cy="42" r="3" fill="#fef9c3" opacity="0.4"/>
<circle cx="58" cy="42" r="3" fill="#fef9c3" opacity="0.4"/>
<!-- Head - pure light -->
<circle cx="30" cy="18" r="10" fill="#fef9c3" opacity="0.6"/>
<circle cx="30" cy="18" r="7" fill="white" opacity="0.6"/>
<circle cx="30" cy="18" r="4" fill="white" opacity="0.8"/>
<!-- Eye shapes - pure light -->
<ellipse cx="26" cy="18" rx="2" ry="1.5" fill="white"/>
<ellipse cx="34" cy="18" rx="2" ry="1.5" fill="white"/>
<!-- Halo crown -->
<circle cx="30" cy="4" r="6" fill="none" stroke="white" stroke-width="2" opacity="0.5"/>
<!-- Sparkles around -->
<circle cx="8" cy="16" r="1" fill="white" opacity="0.4"/>
<circle cx="52" cy="14" r="1" fill="white" opacity="0.4"/>
<circle cx="12" cy="66" r="1" fill="white" opacity="0.3"/>
<circle cx="48" cy="68" r="1" fill="white" opacity="0.3"/>
<circle cx="30" cy="80" r="1" fill="white" opacity="0.3"/>
</svg>`,

// BOSS 12. The Equation - floating math formulas
gen_the_equation: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="14" ry="4" fill="rgba(0,200,200,0.2)"/>
<!-- Ethereal mathematical form -->
<ellipse cx="30" cy="42" rx="18" ry="28" fill="#0f172a" opacity="0.3"/>
<ellipse cx="30" cy="42" rx="14" ry="24" fill="#1e293b" opacity="0.3"/>
<!-- Floating formula rings -->
<ellipse cx="30" cy="42" rx="22" ry="8" fill="none" stroke="#22d3ee" stroke-width="0.5" opacity="0.4" transform="rotate(-20, 30, 42)"/>
<ellipse cx="30" cy="42" rx="20" ry="6" fill="none" stroke="#a855f7" stroke-width="0.5" opacity="0.4" transform="rotate(20, 30, 42)"/>
<!-- Mathematical symbols floating -->
<text x="6" y="18" font-size="6" fill="#22d3ee" opacity="0.7">∞</text>
<text x="46" y="22" font-size="5" fill="#a855f7" opacity="0.6">π</text>
<text x="10" y="40" font-size="5" fill="#34d399" opacity="0.6">∑</text>
<text x="44" y="44" font-size="5" fill="#f472b6" opacity="0.6">∫</text>
<text x="8" y="60" font-size="5" fill="#fbbf24" opacity="0.5">Ω</text>
<text x="46" y="62" font-size="5" fill="#60a5fa" opacity="0.5">φ</text>
<text x="14" y="74" font-size="4" fill="#22d3ee" opacity="0.4">ℏ</text>
<text x="40" y="76" font-size="4" fill="#a855f7" opacity="0.4">∇</text>
<!-- E=mc² floating prominently -->
<text x="16" y="32" font-size="7" fill="#fef9c3" opacity="0.8" font-style="italic">E=mc²</text>
<!-- Core formulas -->
<text x="20" y="50" font-size="5" fill="#22d3ee" opacity="0.6">ψ(x,t)</text>
<text x="18" y="58" font-size="4" fill="#a855f7" opacity="0.5">∂²/∂t²</text>
<!-- Central eye/consciousness -->
<circle cx="30" cy="42" r="8" fill="#0f172a" opacity="0.6"/>
<circle cx="30" cy="42" r="6" fill="#1e293b" opacity="0.6"/>
<!-- The eye -->
<ellipse cx="30" cy="42" rx="4" ry="3" fill="#22d3ee" opacity="0.7"/>
<circle cx="30" cy="42" r="2" fill="#fef9c3"/>
<circle cx="30" cy="42" r="1" fill="#0f172a"/>
<!-- Formula connection lines -->
<path d="M 14,18" stroke="#22d3ee" stroke-width="0.3" fill="none" opacity="0.3"/>
<line x1="22" y1="36" x2="14" y2="28" stroke="#22d3ee" stroke-width="0.3" opacity="0.3"/>
<line x1="38" y1="36" x2="48" y2="28" stroke="#a855f7" stroke-width="0.3" opacity="0.3"/>
<line x1="22" y1="48" x2="14" y2="56" stroke="#34d399" stroke-width="0.3" opacity="0.3"/>
<line x1="38" y1="48" x2="46" y2="58" stroke="#f472b6" stroke-width="0.3" opacity="0.3"/>
<!-- Number particles -->
<text x="2" y="30" font-size="3" fill="#94a3b8" opacity="0.3">42</text>
<text x="50" y="36" font-size="3" fill="#94a3b8" opacity="0.3">137</text>
<text x="4" y="52" font-size="3" fill="#94a3b8" opacity="0.3">3.14</text>
<text x="48" y="52" font-size="3" fill="#94a3b8" opacity="0.3">2.71</text>
<!-- Quantum uncertainty cloud -->
<circle cx="30" cy="42" r="16" fill="none" stroke="#22d3ee" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.3"/>
</svg>`

};

if (typeof vectors !== 'undefined') Object.assign(vectors, genEnemyVectors);
