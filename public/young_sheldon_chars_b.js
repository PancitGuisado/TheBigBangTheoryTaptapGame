// ============================================================
// YOUNG SHELDON CHARACTERS B - SVG sprites with idle/attack/injured states
// Billy Sparks, Georgie Cooper, Tam Nguyen, Pastor Jeff, Pastor Rob
// ============================================================
const ysCharVectorsB = {

// ============================================================
// 1. BILLY SPARKS — Chubby kid, overalls, messy blonde hair, chickens
//    CHILD height (~70%) — taller than Sheldon/Missy but still short
// ============================================================
ys_billy: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Rubber boots -->
<rect x="21" y="76" width="8" height="8" fill="#2d5016" rx="2"/>
<rect x="31" y="76" width="8" height="8" fill="#2d5016" rx="2"/>
<rect x="20" y="78" width="10" height="4" fill="#3f6212" rx="1"/>
<rect x="30" y="78" width="10" height="4" fill="#3f6212" rx="1"/>
<!-- Legs (jeans under overalls) -->
<rect x="23" y="62" width="6" height="16" fill="#3b82f6"/>
<rect x="33" y="62" width="6" height="16" fill="#3b82f6"/>
<!-- Chubby body — overalls -->
<rect x="17" y="38" width="26" height="26" fill="#4a7ab5" rx="3"/>
<!-- Overall front pocket -->
<rect x="24" y="50" width="12" height="8" fill="#3b6da0" rx="1"/>
<line x1="30" y1="50" x2="30" y2="58" stroke="#2d5a87" stroke-width="0.5"/>
<!-- Plaid shirt underneath (collar/sleeves) -->
<rect x="19" y="38" width="22" height="6" fill="#dc2626"/>
<rect x="22" y="38" width="2" height="6" fill="#b91c1c" opacity="0.5"/>
<rect x="28" y="38" width="2" height="6" fill="#b91c1c" opacity="0.5"/>
<rect x="34" y="38" width="2" height="6" fill="#b91c1c" opacity="0.5"/>
<!-- Overall straps -->
<line x1="22" y1="38" x2="24" y2="50" stroke="#3b6da0" stroke-width="2.5"/>
<line x1="38" y1="38" x2="36" y2="50" stroke="#3b6da0" stroke-width="2.5"/>
<!-- Strap buttons -->
<circle cx="24" cy="50" r="1.2" fill="#fbbf24"/>
<circle cx="36" cy="50" r="1.2" fill="#fbbf24"/>
<!-- Arms — thumbs in straps -->
<path d="M 17,42 Q 12,48 16,52" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 43,42 Q 48,48 44,52" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Hands on straps -->
<circle cx="16" cy="52" r="2.5" fill="#fed7aa"/>
<circle cx="44" cy="52" r="2.5" fill="#fed7aa"/>
<!-- Head — chubby round -->
<rect x="19" y="20" width="22" height="18" fill="#fed7aa" rx="6"/>
<!-- Chubby cheeks -->
<circle cx="22" cy="33" r="3" fill="#fecaca" opacity="0.5"/>
<circle cx="38" cy="33" r="3" fill="#fecaca" opacity="0.5"/>
<!-- Messy blonde hair -->
<path d="M 17,24 C 17,16 43,16 43,24" fill="#fbbf24"/>
<path d="M 19,20 Q 22,14 26,18 Q 30,12 34,18 Q 38,14 41,20" fill="#f59e0b"/>
<rect x="19" y="18" width="22" height="5" fill="#fbbf24" rx="2"/>
<!-- Eyes -->
<circle cx="26" cy="28" r="2" fill="#ffffff"/>
<circle cx="34" cy="28" r="2" fill="#ffffff"/>
<circle cx="26" cy="28" r="1" fill="#1e3a5f"/>
<circle cx="34" cy="28" r="1" fill="#1e3a5f"/>
<!-- Freckles -->
<circle cx="23" cy="31" r="0.6" fill="#b45309" opacity="0.5"/>
<circle cx="25" cy="32" r="0.6" fill="#b45309" opacity="0.5"/>
<circle cx="35" cy="31" r="0.6" fill="#b45309" opacity="0.5"/>
<circle cx="37" cy="32" r="0.6" fill="#b45309" opacity="0.5"/>
<!-- Dopey friendly smile -->
<path d="M 26,34 Q 30,38 34,34" fill="none" stroke="#92400e" stroke-width="1.2"/>
<!-- Chicken at feet -->
<ellipse cx="14" cy="80" rx="5" ry="3.5" fill="#f5f5f4"/>
<circle cx="11" cy="77" r="2" fill="#f5f5f4"/>
<circle cx="10" cy="76" r="1" fill="#fbbf24"/>
<circle cx="10" cy="76.5" r="0.4" fill="#1c1917"/>
<path d="M 9,77 L 7,76.5" stroke="#dc2626" stroke-width="1" stroke-linecap="round"/>
<line x1="12" y1="83" x2="11" y2="86" stroke="#f59e0b" stroke-width="0.8"/>
<line x1="15" y1="83" x2="15" y2="86" stroke="#f59e0b" stroke-width="0.8"/>
</svg>`,
    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Rubber boots -->
<rect x="21" y="76" width="8" height="8" fill="#2d5016" rx="2"/>
<rect x="31" y="76" width="8" height="8" fill="#2d5016" rx="2"/>
<rect x="20" y="78" width="10" height="4" fill="#3f6212" rx="1"/>
<rect x="30" y="78" width="10" height="4" fill="#3f6212" rx="1"/>
<!-- Legs -->
<rect x="23" y="62" width="6" height="16" fill="#3b82f6"/>
<rect x="33" y="62" width="6" height="16" fill="#3b82f6"/>
<!-- Body — overalls -->
<rect x="17" y="38" width="26" height="26" fill="#4a7ab5" rx="3"/>
<rect x="24" y="50" width="12" height="8" fill="#3b6da0" rx="1"/>
<!-- Plaid shirt -->
<rect x="19" y="38" width="22" height="6" fill="#dc2626"/>
<rect x="22" y="38" width="2" height="6" fill="#b91c1c" opacity="0.5"/>
<rect x="28" y="38" width="2" height="6" fill="#b91c1c" opacity="0.5"/>
<rect x="34" y="38" width="2" height="6" fill="#b91c1c" opacity="0.5"/>
<!-- Straps -->
<line x1="22" y1="38" x2="24" y2="50" stroke="#3b6da0" stroke-width="2.5"/>
<line x1="38" y1="38" x2="36" y2="50" stroke="#3b6da0" stroke-width="2.5"/>
<circle cx="24" cy="50" r="1.2" fill="#fbbf24"/>
<circle cx="36" cy="50" r="1.2" fill="#fbbf24"/>
<!-- Left arm back for throw -->
<path d="M 17,42 Q 10,38 8,42" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="8" cy="42" r="2.5" fill="#fed7aa"/>
<!-- Right arm throwing forward -->
<path d="M 43,42 Q 52,36 56,32" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="56" cy="32" r="2.5" fill="#fed7aa"/>
<!-- Flying chicken 1 (closest, biggest) -->
<ellipse cx="58" cy="28" rx="5" ry="3" fill="#f5f5f4"/>
<circle cx="62" cy="26" r="1.5" fill="#f5f5f4"/>
<circle cx="63" cy="25.5" r="0.6" fill="#1c1917"/>
<path d="M 64,26 L 66,25.5" stroke="#dc2626" stroke-width="0.8"/>
<path d="M 55" y1="26" x2="53" y2="28" stroke="#f5f5f4" stroke-width="1"/>
<line x1="60" y1="31" x2="59" y2="33" stroke="#f59e0b" stroke-width="0.7"/>
<!-- Wing flap lines -->
<path d="M 56,26 Q 54,22 56,20" stroke="#d6d3d1" stroke-width="0.8" fill="none"/>
<path d="M 57,27 Q 55,23 57,21" stroke="#d6d3d1" stroke-width="0.6" fill="none"/>
<!-- Flying chicken 2 -->
<ellipse cx="52" cy="20" rx="4" ry="2.5" fill="#f5f5f4"/>
<circle cx="55" cy="18.5" r="1.2" fill="#f5f5f4"/>
<circle cx="56" cy="18" r="0.5" fill="#1c1917"/>
<path d="M 57,18.5 L 58,18" stroke="#dc2626" stroke-width="0.7"/>
<path d="M 50,18 Q 48,15 50,13" stroke="#d6d3d1" stroke-width="0.6" fill="none"/>
<!-- Flying chicken 3 (smallest, furthest) -->
<ellipse cx="48" cy="12" rx="3" ry="2" fill="#f5f5f4"/>
<circle cx="50.5" cy="11" r="1" fill="#f5f5f4"/>
<circle cx="51" cy="10.5" r="0.4" fill="#1c1917"/>
<!-- Motion lines -->
<line x1="44" y1="30" x2="48" y2="28" stroke="#a8a29e" stroke-width="0.5" opacity="0.6"/>
<line x1="44" y1="26" x2="48" y2="24" stroke="#a8a29e" stroke-width="0.5" opacity="0.6"/>
<!-- Head -->
<rect x="19" y="20" width="22" height="18" fill="#fed7aa" rx="6"/>
<circle cx="22" cy="33" r="3" fill="#fecaca" opacity="0.5"/>
<circle cx="38" cy="33" r="3" fill="#fecaca" opacity="0.5"/>
<!-- Messy blonde hair -->
<path d="M 17,24 C 17,16 43,16 43,24" fill="#fbbf24"/>
<path d="M 19,20 Q 22,14 26,18 Q 30,12 34,18 Q 38,14 41,20" fill="#f59e0b"/>
<rect x="19" y="18" width="22" height="5" fill="#fbbf24" rx="2"/>
<!-- Determined eyes -->
<circle cx="26" cy="28" r="2" fill="#ffffff"/>
<circle cx="34" cy="28" r="2" fill="#ffffff"/>
<circle cx="27" cy="28" r="1" fill="#1e3a5f"/>
<circle cx="35" cy="28" r="1" fill="#1e3a5f"/>
<!-- Freckles -->
<circle cx="23" cy="31" r="0.6" fill="#b45309" opacity="0.5"/>
<circle cx="25" cy="32" r="0.6" fill="#b45309" opacity="0.5"/>
<circle cx="35" cy="31" r="0.6" fill="#b45309" opacity="0.5"/>
<circle cx="37" cy="32" r="0.6" fill="#b45309" opacity="0.5"/>
<!-- Open mouth effort -->
<ellipse cx="30" cy="35" rx="3" ry="2" fill="#7f1d1d"/>
</svg>`,
    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Rubber boots — stumbling -->
<rect x="18" y="76" width="8" height="8" fill="#2d5016" rx="2"/>
<rect x="34" y="74" width="8" height="8" fill="#2d5016" rx="2"/>
<rect x="17" y="78" width="10" height="4" fill="#3f6212" rx="1"/>
<rect x="33" y="76" width="10" height="4" fill="#3f6212" rx="1"/>
<!-- Legs stumbling -->
<rect x="20" y="62" width="6" height="16" fill="#3b82f6"/>
<rect x="36" y="60" width="6" height="16" fill="#3b82f6"/>
<!-- Body tilted back -->
<rect x="17" y="38" width="26" height="26" fill="#4a7ab5" rx="3" transform="rotate(-5,30,50)"/>
<rect x="19" y="38" width="22" height="6" fill="#dc2626" transform="rotate(-5,30,50)"/>
<!-- Straps loose -->
<line x1="22" y1="40" x2="20" y2="50" stroke="#3b6da0" stroke-width="2" opacity="0.6"/>
<line x1="38" y1="40" x2="40" y2="50" stroke="#3b6da0" stroke-width="2" opacity="0.6"/>
<!-- Arms flailing up -->
<path d="M 15,42 Q 6,34 4,28" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 45,42 Q 52,32 54,26" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="4" cy="28" r="2.5" fill="#fed7aa"/>
<circle cx="54" cy="26" r="2.5" fill="#fed7aa"/>
<!-- Head falling back -->
<rect x="19" y="20" width="22" height="18" fill="#fed7aa" rx="6"/>
<circle cx="22" cy="33" r="3" fill="#fecaca" opacity="0.5"/>
<circle cx="38" cy="33" r="3" fill="#fecaca" opacity="0.5"/>
<!-- Messy blonde hair — more messed up -->
<path d="M 17,24 C 17,16 43,16 43,24" fill="#fbbf24"/>
<path d="M 18,20 Q 20,12 25,18 Q 28,10 33,17 Q 37,11 42,20" fill="#f59e0b"/>
<rect x="19" y="18" width="22" height="5" fill="#fbbf24" rx="2"/>
<!-- Wide scared eyes -->
<circle cx="26" cy="27" r="2.5" fill="#ffffff"/>
<circle cx="34" cy="27" r="2.5" fill="#ffffff"/>
<circle cx="26" cy="27" r="1.2" fill="#1e3a5f"/>
<circle cx="34" cy="27" r="1.2" fill="#1e3a5f"/>
<circle cx="26" cy="26.5" r="0.5" fill="#ffffff"/>
<circle cx="34" cy="26.5" r="0.5" fill="#ffffff"/>
<!-- Freckles -->
<circle cx="23" cy="31" r="0.6" fill="#b45309" opacity="0.5"/>
<circle cx="37" cy="31" r="0.6" fill="#b45309" opacity="0.5"/>
<!-- Scared mouth -->
<ellipse cx="30" cy="35" rx="2.5" ry="3" fill="#7f1d1d"/>
<!-- Scattering chickens -->
<ellipse cx="6" cy="78" rx="4" ry="2.5" fill="#f5f5f4" transform="rotate(-20,6,78)"/>
<circle cx="4" cy="76" r="1" fill="#f5f5f4"/>
<circle cx="3.5" cy="75.5" r="0.4" fill="#1c1917"/>
<ellipse cx="50" cy="72" rx="3.5" ry="2" fill="#f5f5f4" transform="rotate(15,50,72)"/>
<circle cx="52" cy="70.5" r="1" fill="#f5f5f4"/>
<circle cx="52.5" cy="70" r="0.3" fill="#1c1917"/>
<ellipse cx="44" cy="82" rx="3" ry="2" fill="#f5f5f4" transform="rotate(30,44,82)"/>
<!-- Feathers floating -->
<path d="M 12,70 Q 10,68 12,66" stroke="#e7e5e4" stroke-width="0.8" fill="none"/>
<path d="M 46,66 Q 48,64 46,62" stroke="#e7e5e4" stroke-width="0.8" fill="none"/>
<path d="M 36,70 Q 38,68 36,66" stroke="#e7e5e4" stroke-width="0.6" fill="none"/>
</svg>`
},

// ============================================================
// 2. GEORGIE COOPER — Teen with mullet, leather jacket, cowboy boots
//    TEEN height (~80%) — taller than kids, shorter than adults
// ============================================================
ys_georgie: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="11" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Sneakers -->
<rect x="20" y="78" width="9" height="5" rx="2" fill="#f5f5f4"/>
<rect x="32" y="78" width="9" height="5" rx="2" fill="#f5f5f4"/>
<rect x="20" y="78" width="9" height="2" rx="1" fill="#3b82f6"/>
<rect x="32" y="78" width="9" height="2" rx="1" fill="#3b82f6"/>
<!-- Regular jeans -->
<rect x="21" y="54" width="7" height="25" rx="1" fill="#1d4ed8"/>
<rect x="33" y="54" width="7" height="25" rx="1" fill="#1d4ed8"/>
<rect x="19" y="48" width="22" height="8" rx="2" fill="#1d4ed8"/>
<!-- Belt -->
<rect x="19" y="46" width="22" height="3" fill="#78350f"/>
<rect x="28" y="46" width="4" height="3" rx="0.5" fill="#c0a060"/>
<!-- Graphic t-shirt (maroon/red, typical Georgie) -->
<rect x="17" y="22" width="26" height="26" rx="3" fill="#991b1b"/>
<!-- Shirt v-neck -->
<polygon points="26,22 30,27 34,22" fill="#b91c1c"/>
<!-- Shirt graphic (simple star) -->
<polygon points="30,32 31,35 34,35 32,37 33,40 30,38 27,40 28,37 26,35 29,35" fill="#fbbf24" opacity="0.5"/>
<!-- Arms relaxed, hands in front pockets -->
<path d="M17,26 Q10,36 14,48" stroke="#e8b88a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M43,26 Q50,36 46,48" stroke="#e8b88a" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Hands resting on belt -->
<circle cx="16" cy="48" r="2.5" fill="#e8b88a"/>
<circle cx="44" cy="48" r="2.5" fill="#e8b88a"/>
<!-- Sleeves -->
<rect x="13" y="22" width="7" height="7" rx="1" fill="#991b1b"/>
<rect x="40" y="22" width="7" height="7" rx="1" fill="#991b1b"/>
<!-- Neck -->
<rect x="26" y="18" width="8" height="6" fill="#e8b88a"/>
<!-- Head -->
<rect x="20" y="4" width="20" height="16" rx="4" fill="#e8b88a"/>
<!-- Mullet hair — short on top, long flowing in back -->
<rect x="20" y="2" width="20" height="6" rx="3" fill="#6b4226"/>
<!-- Top hair volume -->
<path d="M19,7 C19,0 41,0 41,7" fill="#7c5230"/>
<!-- Mullet back — long flowing hair down to shoulders -->
<path d="M38,7 Q42,10 44,16 Q46,24 44,30" stroke="#6b4226" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M39,8 Q44,12 46,18 Q48,26 46,32" stroke="#7c5230" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>
<!-- Sideburns -->
<rect x="20" y="9" width="2" height="6" rx="0.5" fill="#6b4226"/>
<rect x="38" y="9" width="2" height="6" rx="0.5" fill="#6b4226"/>
<!-- Eyes -->
<circle cx="26" cy="11" r="1.5" fill="#2c1810"/>
<circle cx="34" cy="11" r="1.5" fill="#2c1810"/>
<!-- Thick eyebrows -->
<rect x="23" y="8" width="5" height="1.5" rx="0.5" fill="#5c3317"/>
<rect x="32" y="8" width="5" height="1.5" rx="0.5" fill="#5c3317"/>
<!-- Confident smirk -->
<path d="M27,16 Q30,18 34,16" fill="none" stroke="#92400e" stroke-width="0.8"/>
<line x1="34" y1="16" x2="36" y2="15" stroke="#92400e" stroke-width="0.6"/>
</svg>`,
    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="28" cy="85" rx="11" ry="3" fill="rgba(0,0,0,0.3)"/>
<rect x="18" y="78" width="9" height="5" rx="2" fill="#f5f5f4"/>
<rect x="34" y="77" width="9" height="5" rx="2" fill="#f5f5f4"/>
<rect x="18" y="78" width="9" height="2" rx="1" fill="#3b82f6"/>
<rect x="34" y="77" width="9" height="2" rx="1" fill="#3b82f6"/>
<!-- Jeans wide stance -->
<rect x="19" y="54" width="7" height="25" rx="1" fill="#1d4ed8"/>
<rect x="35" y="53" width="7" height="26" rx="1" fill="#1d4ed8"/>
<rect x="17" y="48" width="24" height="8" rx="2" fill="#1d4ed8"/>
<rect x="17" y="46" width="24" height="3" fill="#78350f"/>
<!-- T-shirt -->
<rect x="15" y="22" width="28" height="26" rx="3" fill="#991b1b"/>
<polygon points="24,22 29,27 34,22" fill="#b91c1c"/>
<!-- Right arm swinging tire overhead -->
<path d="M43,26 Q54,18 52,8" stroke="#e8b88a" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="52" cy="8" r="2" fill="#e8b88a"/>
<!-- Chain -->
<line x1="52" y1="6" x2="50" y2="2" stroke="#6b7280" stroke-width="1.5"/>
<line x1="50" y1="2" x2="52" y2="-2" stroke="#6b7280" stroke-width="1.5"/>
<!-- Tire -->
<circle cx="52" cy="-5" r="7" fill="#1c1917"/>
<circle cx="52" cy="-5" r="3.5" fill="#374151"/>
<!-- Left arm back -->
<path d="M15,26 Q6,34 8,44" stroke="#e8b88a" stroke-width="5" fill="none" stroke-linecap="round"/>
<rect x="11" y="22" width="7" height="7" rx="1" fill="#991b1b"/>
<rect x="39" y="22" width="7" height="7" rx="1" fill="#991b1b"/>
<!-- Wind lines -->
<line x1="56" y1="4" x2="60" y2="2" stroke="#94a3b8" stroke-width="0.6" opacity="0.5"/>
<line x1="44" y1="-6" x2="40" y2="-8" stroke="#94a3b8" stroke-width="0.5" opacity="0.4"/>
<!-- Head -->
<rect x="24" y="18" width="8" height="6" fill="#e8b88a"/>
<rect x="18" y="4" width="20" height="16" rx="4" fill="#e8b88a"/>
<rect x="18" y="2" width="20" height="6" rx="3" fill="#6b4226"/>
<path d="M17,7 C17,0 39,0 39,7" fill="#7c5230"/>
<!-- Mullet whipping wildly -->
<path d="M36,7 Q46,4 50,10 Q54,18 52,26" stroke="#6b4226" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M38,8 Q48,2 52,8 Q56,16 54,24" stroke="#7c5230" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>
<rect x="18" y="9" width="2" height="6" rx="0.5" fill="#6b4226"/>
<!-- Intense eyes -->
<circle cx="24" cy="11" r="1.5" fill="#2c1810"/>
<circle cx="32" cy="11" r="1.5" fill="#2c1810"/>
<rect x="21" y="8" width="5" height="1.5" rx="0.5" fill="#5c3317"/>
<rect x="30" y="8" width="5" height="1.5" rx="0.5" fill="#5c3317"/>
<!-- Grin -->
<path d="M25,16 Q29,19 33,16" fill="none" stroke="#92400e" stroke-width="1"/>
</svg>`,
    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="32" cy="85" rx="11" ry="3" fill="rgba(0,0,0,0.3)"/>
<rect x="23" y="78" width="9" height="5" rx="2" fill="#f5f5f4"/>
<rect x="35" y="77" width="9" height="5" rx="2" fill="#f5f5f4"/>
<!-- Jeans staggering -->
<rect x="24" y="54" width="7" height="25" rx="1" fill="#1d4ed8"/>
<rect x="36" y="53" width="7" height="26" rx="1" fill="#1d4ed8" transform="rotate(3,39,67)"/>
<rect x="22" y="48" width="24" height="8" rx="2" fill="#1d4ed8"/>
<!-- T-shirt (scuffed) -->
<rect x="19" y="22" width="28" height="26" rx="3" fill="#991b1b" opacity="0.85"/>
<!-- Dirt marks -->
<rect x="24" y="34" width="6" height="3" rx="1" fill="#78350f" opacity="0.3"/>
<rect x="36" y="38" width="4" height="2" rx="1" fill="#78350f" opacity="0.25"/>
<!-- Arms up defensively -->
<path d="M19,26 Q10,22 8,18" stroke="#e8b88a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M47,26 Q52,24 54,20" stroke="#e8b88a" stroke-width="5" fill="none" stroke-linecap="round"/>
<rect x="15" y="22" width="7" height="7" rx="1" fill="#991b1b"/>
<rect x="43" y="22" width="7" height="7" rx="1" fill="#991b1b"/>
<!-- Head tilted -->
<rect x="28" y="18" width="8" height="6" fill="#e8b88a"/>
<rect x="22" y="4" width="20" height="16" rx="4" fill="#e8b88a" transform="rotate(4,32,12)"/>
<!-- Messed up mullet -->
<rect x="22" y="2" width="20" height="6" rx="3" fill="#6b4226" transform="rotate(4,32,5)"/>
<path d="M21,7 C22,2 42,0 43,7" fill="#7c5230"/>
<!-- Hair sticking up -->
<path d="M26,3 L24,0" stroke="#6b4226" stroke-width="1.5" stroke-linecap="round"/>
<path d="M32,2 L33,-1" stroke="#7c5230" stroke-width="1.2" stroke-linecap="round"/>
<!-- Mullet drooping -->
<path d="M40,8 Q43,14 42,22 Q42,28 40,32" stroke="#6b4226" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
<rect x="22" y="9" width="2" height="6" rx="0.5" fill="#6b4226"/>
<rect x="40" y="9" width="2" height="6" rx="0.5" fill="#6b4226"/>
<!-- Dazed eyes -->
<circle cx="28" cy="11" r="1.5" fill="#2c1810"/>
<circle cx="36" cy="11" r="1.5" fill="#2c1810"/>
<!-- Grimace -->
<path d="M29,16 Q32,14 35,16" fill="none" stroke="#92400e" stroke-width="0.8"/>
<!-- Stars -->
<text x="50" y="10" font-size="5" fill="#fbbf24" opacity="0.7">★</text>
<circle cx="10" cy="12" r="1" fill="#fbbf24" opacity="0.5"/>
</svg>`
},

// ============================================================
// 3. TAM NGUYEN — Vietnamese kid, glasses, green military jacket
//    CHILD height (same as Young Sheldon, ~65%)
// ============================================================
ys_tam: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="9" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Sneakers -->
<rect x="21" y="78" width="8" height="6" fill="#e2e8f0" rx="2"/>
<rect x="31" y="78" width="8" height="6" fill="#e2e8f0" rx="2"/>
<rect x="23" y="80" width="4" height="2" fill="#3b82f6"/>
<rect x="33" y="80" width="4" height="2" fill="#3b82f6"/>
<!-- Cargo pants -->
<rect x="23" y="64" width="6" height="16" fill="#78716c"/>
<rect x="33" y="64" width="6" height="16" fill="#78716c"/>
<!-- Cargo pockets -->
<rect x="23" y="70" width="5" height="4" fill="#6b6560" rx="0.5"/>
<rect x="34" y="70" width="5" height="4" fill="#6b6560" rx="0.5"/>
<!-- Green military jacket body -->
<rect x="18" y="40" width="24" height="26" fill="#3f6212" rx="2"/>
<!-- Jacket pockets -->
<rect x="20" y="50" width="8" height="5" fill="#365314" rx="1"/>
<rect x="34" y="50" width="8" height="5" fill="#365314" rx="1"/>
<!-- Pocket buttons -->
<circle cx="24" cy="51" r="0.5" fill="#4d7c0f"/>
<circle cx="38" cy="51" r="0.5" fill="#4d7c0f"/>
<!-- T-shirt visible -->
<rect x="24" y="40" width="12" height="4" fill="#fbbf24"/>
<!-- Jacket collar -->
<path d="M 18,40 L 24,44 L 24,40 Z" fill="#4d7c0f"/>
<path d="M 42,40 L 36,44 L 36,40 Z" fill="#4d7c0f"/>
<!-- Left arm at side -->
<path d="M 18,44 Q 12,52 14,60" stroke="#3f6212" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="14" cy="60" r="2" fill="#f5d6a8"/>
<!-- Right arm saluting -->
<path d="M 42,44 Q 48,40 44,32" stroke="#3f6212" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- Hand at forehead — salute -->
<rect x="38" y="30" width="6" height="3" fill="#f5d6a8" rx="1"/>
<!-- Head -->
<rect x="21" y="22" width="18" height="16" fill="#f5d6a8" rx="4"/>
<!-- Black neat hair -->
<rect x="21" y="20" width="18" height="6" fill="#1c1917" rx="2"/>
<path d="M 19,24 C 19,16 41,16 41,24" fill="#1c1917"/>
<!-- Neat parting -->
<line x1="28" y1="18" x2="28" y2="22" stroke="#0f172a" stroke-width="0.5"/>
<!-- Glasses -->
<rect x="23" y="28" width="6" height="5" fill="none" stroke="#374151" stroke-width="1" rx="1"/>
<rect x="31" y="28" width="6" height="5" fill="none" stroke="#374151" stroke-width="1" rx="1"/>
<line x1="29" y1="30" x2="31" y2="30" stroke="#374151" stroke-width="0.8"/>
<line x1="23" y1="30" x2="21" y2="29" stroke="#374151" stroke-width="0.6"/>
<line x1="37" y1="30" x2="39" y2="29" stroke="#374151" stroke-width="0.6"/>
<!-- Eyes behind glasses -->
<circle cx="26" cy="30.5" r="1" fill="#1c1917"/>
<circle cx="34" cy="30.5" r="1" fill="#1c1917"/>
<!-- Neutral determined mouth -->
<line x1="27" y1="35" x2="33" y2="35" stroke="#92400e" stroke-width="0.8"/>
</svg>`,
    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="9" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Sneakers — combat stance -->
<rect x="18" y="78" width="8" height="6" fill="#e2e8f0" rx="2"/>
<rect x="34" y="78" width="8" height="6" fill="#e2e8f0" rx="2"/>
<rect x="20" y="80" width="4" height="2" fill="#3b82f6"/>
<rect x="36" y="80" width="4" height="2" fill="#3b82f6"/>
<!-- Legs — wide combat stance -->
<rect x="20" y="64" width="6" height="16" fill="#78716c"/>
<rect x="36" y="64" width="6" height="16" fill="#78716c"/>
<rect x="20" y="70" width="5" height="4" fill="#6b6560" rx="0.5"/>
<rect x="37" y="70" width="5" height="4" fill="#6b6560" rx="0.5"/>
<!-- Military jacket -->
<rect x="18" y="40" width="24" height="26" fill="#3f6212" rx="2"/>
<rect x="20" y="50" width="8" height="5" fill="#365314" rx="1"/>
<rect x="34" y="50" width="8" height="5" fill="#365314" rx="1"/>
<rect x="24" y="40" width="12" height="4" fill="#fbbf24"/>
<path d="M 18,40 L 24,44 L 24,40 Z" fill="#4d7c0f"/>
<path d="M 42,40 L 36,44 L 36,40 Z" fill="#4d7c0f"/>
<!-- Left arm throwing -->
<path d="M 18,44 Q 8,38 4,34" stroke="#3f6212" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="4" cy="34" r="2" fill="#f5d6a8"/>
<!-- Right arm throwing -->
<path d="M 42,44 Q 52,36 56,30" stroke="#3f6212" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="56" cy="30" r="2" fill="#f5d6a8"/>
<!-- Ninja stars flying! -->
<!-- Star 1 — closest -->
<g transform="translate(58,24) rotate(20)">
<polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" fill="#6b7280" stroke="#374151" stroke-width="0.5"/>
</g>
<!-- Star 2 — mid distance -->
<g transform="translate(52,16) rotate(45)">
<polygon points="0,-3.5 1,-1 3.5,0 1,1 0,3.5 -1,1 -3.5,0 -1,-1" fill="#9ca3af" stroke="#4b5563" stroke-width="0.5"/>
</g>
<!-- Star 3 — furthest -->
<g transform="translate(48,8) rotate(70)">
<polygon points="0,-3 0.8,-0.8 3,0 0.8,0.8 0,3 -0.8,0.8 -3,0 -0.8,-0.8" fill="#6b7280" stroke="#374151" stroke-width="0.5"/>
</g>
<!-- Green energy trail -->
<path d="M 56,30 Q 58,28 58,24" stroke="#4ade80" stroke-width="1.5" fill="none" opacity="0.7"/>
<path d="M 58,24 Q 56,20 52,16" stroke="#22c55e" stroke-width="1" fill="none" opacity="0.5"/>
<path d="M 52,16 Q 50,12 48,8" stroke="#16a34a" stroke-width="0.8" fill="none" opacity="0.4"/>
<!-- Head -->
<rect x="21" y="22" width="18" height="16" fill="#f5d6a8" rx="4"/>
<!-- Hair -->
<rect x="21" y="20" width="18" height="6" fill="#1c1917" rx="2"/>
<path d="M 19,24 C 19,16 41,16 41,24" fill="#1c1917"/>
<!-- Glasses — glinting -->
<rect x="23" y="28" width="6" height="5" fill="none" stroke="#374151" stroke-width="1" rx="1"/>
<rect x="31" y="28" width="6" height="5" fill="none" stroke="#374151" stroke-width="1" rx="1"/>
<line x1="29" y1="30" x2="31" y2="30" stroke="#374151" stroke-width="0.8"/>
<!-- Lens glint -->
<line x1="24" y1="29" x2="26" y2="31" stroke="#ffffff" stroke-width="0.6" opacity="0.6"/>
<!-- Focused eyes -->
<circle cx="26" cy="30.5" r="1" fill="#1c1917"/>
<circle cx="34" cy="30.5" r="1" fill="#1c1917"/>
<!-- Determined grimace -->
<path d="M 27,35 L 30,34 L 33,35" fill="none" stroke="#92400e" stroke-width="0.8"/>
</svg>`,
    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="9" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Sneakers -->
<rect x="22" y="78" width="8" height="6" fill="#e2e8f0" rx="2"/>
<rect x="32" y="78" width="8" height="6" fill="#e2e8f0" rx="2"/>
<rect x="24" y="80" width="4" height="2" fill="#3b82f6"/>
<rect x="34" y="80" width="4" height="2" fill="#3b82f6"/>
<!-- Legs — ducking/crouching -->
<rect x="23" y="66" width="6" height="14" fill="#78716c"/>
<rect x="33" y="66" width="6" height="14" fill="#78716c"/>
<!-- Jacket — ducking -->
<rect x="18" y="44" width="24" height="24" fill="#3f6212" rx="2" opacity="0.8"/>
<rect x="24" y="44" width="12" height="4" fill="#fbbf24" opacity="0.7"/>
<!-- Arms up protecting head -->
<path d="M 18,48 Q 10,38 16,30" stroke="#3f6212" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 42,48 Q 50,38 44,30" stroke="#3f6212" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="16" cy="30" r="2" fill="#f5d6a8"/>
<circle cx="44" cy="30" r="2" fill="#f5d6a8"/>
<!-- Head ducking -->
<rect x="21" y="26" width="18" height="16" fill="#f5d6a8" rx="4"/>
<!-- Hair slightly mussed -->
<rect x="21" y="24" width="18" height="6" fill="#1c1917" rx="2"/>
<path d="M 19,28 C 19,20 41,20 41,28" fill="#1c1917"/>
<!-- Glasses flying off to the right! -->
<g transform="translate(50,24) rotate(25)">
<rect x="-5" y="-2" width="5" height="4" fill="none" stroke="#374151" stroke-width="0.8" rx="0.5"/>
<rect x="1" y="-2" width="5" height="4" fill="none" stroke="#374151" stroke-width="0.8" rx="0.5"/>
<line x1="0" y1="0" x2="1" y2="0" stroke="#374151" stroke-width="0.6"/>
</g>
<!-- Motion lines for glasses -->
<line x1="40" y1="28" x2="46" y2="25" stroke="#94a3b8" stroke-width="0.5" opacity="0.5"/>
<line x1="42" y1="30" x2="48" y2="27" stroke="#94a3b8" stroke-width="0.4" opacity="0.4"/>
<!-- Eyes without glasses — squinting scared -->
<path d="M 24,31 Q 26,30 28,31" fill="none" stroke="#1c1917" stroke-width="1"/>
<path d="M 32,31 Q 34,30 36,31" fill="none" stroke="#1c1917" stroke-width="1"/>
<!-- Worried mouth -->
<path d="M 27,37 Q 30,35 33,37" fill="none" stroke="#92400e" stroke-width="0.8"/>
<!-- Impact effect -->
<circle cx="14" cy="36" r="1.5" fill="#fbbf24" opacity="0.5"/>
<path d="M 12,34 L 10,32 M 14,34 L 12,32 M 16,34 L 14,32" stroke="#fbbf24" stroke-width="0.6" opacity="0.4"/>
</svg>`
},

// ============================================================
// 4. PASTOR JEFF — Friendly pastor, black collar shirt, bible, halo
//    Full ADULT height
// ============================================================
ys_pastor_jeff: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Black shoes -->
<rect x="20" y="78" width="8" height="6" fill="#1c1917" rx="2"/>
<rect x="32" y="78" width="8" height="6" fill="#1c1917" rx="2"/>
<!-- Black pants -->
<rect x="22" y="54" width="7" height="26" fill="#1e293b"/>
<rect x="32" y="54" width="7" height="26" fill="#1e293b"/>
<!-- Black pastor shirt body -->
<rect x="16" y="22" width="28" height="34" fill="#1e293b" rx="2"/>
<!-- White clerical collar -->
<rect x="26" y="22" width="8" height="3" fill="#f5f5f4" rx="1"/>
<!-- Shirt buttons -->
<circle cx="30" cy="30" r="0.6" fill="#374151"/>
<circle cx="30" cy="36" r="0.6" fill="#374151"/>
<circle cx="30" cy="42" r="0.6" fill="#374151"/>
<!-- Left arm holding bible to chest -->
<path d="M 16,26 Q 8,36 14,44" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="14" cy="44" r="2" fill="#fed7aa"/>
<!-- Right arm supporting bible -->
<path d="M 44,26 Q 50,36 44,44" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="44" cy="44" r="2" fill="#fed7aa"/>
<!-- Bible held at chest -->
<rect x="18" y="34" width="14" height="18" fill="#78350f" rx="1"/>
<rect x="19" y="35" width="12" height="16" fill="#92400e" rx="0.5"/>
<!-- Bible cross -->
<line x1="25" y1="37" x2="25" y2="47" stroke="#fbbf24" stroke-width="1"/>
<line x1="21" y1="41" x2="29" y2="41" stroke="#fbbf24" stroke-width="1"/>
<!-- Bible spine -->
<rect x="18" y="34" width="2" height="18" fill="#6b3a10"/>
<!-- Head -->
<rect x="20" y="5" width="20" height="18" fill="#fed7aa" rx="4"/>
<!-- Brown combed hair -->
<rect x="20" y="3" width="20" height="6" fill="#6b4226" rx="2"/>
<path d="M 18,7 C 18,0 42,0 42,7" fill="#7c5230"/>
<!-- Neat side part -->
<line x1="26" y1="2" x2="24" y2="7" stroke="#5a3520" stroke-width="0.8"/>
<!-- Eyes — kind and gentle -->
<circle cx="26" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="34" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="26" cy="13" r="0.8" fill="#4a7ab5"/>
<circle cx="34" cy="13" r="0.8" fill="#4a7ab5"/>
<!-- Serene gentle smile -->
<path d="M 27,18 Q 30,21 33,18" fill="none" stroke="#92400e" stroke-width="1"/>
<!-- Halo glow above head -->
<ellipse cx="30" cy="1" rx="8" ry="2" fill="none" stroke="#fbbf24" stroke-width="1.5" opacity="0.7"/>
<ellipse cx="30" cy="1" rx="6" ry="1.5" fill="none" stroke="#fde047" stroke-width="0.8" opacity="0.5"/>
</svg>`,
    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
<defs>
<filter id="pj-holylight"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Shoes -->
<rect x="20" y="78" width="8" height="6" fill="#1c1917" rx="2"/>
<rect x="32" y="78" width="8" height="6" fill="#1c1917" rx="2"/>
<!-- Pants -->
<rect x="22" y="54" width="7" height="26" fill="#1e293b"/>
<rect x="32" y="54" width="7" height="26" fill="#1e293b"/>
<!-- Pastor shirt -->
<rect x="16" y="22" width="28" height="34" fill="#1e293b" rx="2"/>
<rect x="26" y="22" width="8" height="3" fill="#f5f5f4" rx="1"/>
<!-- Arms holding open bible forward -->
<path d="M 16,26 Q 4,34 2,40" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,26 Q 52,34 50,40" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="2" cy="40" r="2" fill="#fed7aa"/>
<circle cx="50" cy="40" r="2" fill="#fed7aa"/>
<!-- Open bible — pages spread -->
<path d="M 14,36 Q 8,38 4,40 L 6,52 Q 14,50 18,48 Z" fill="#fef3c7"/>
<path d="M 14,36 Q 20,38 26,40 L 24,52 Q 18,50 18,48 Z" fill="#fef9c3"/>
<rect x="13" y="36" width="2" height="14" fill="#78350f" rx="0.5"/>
<!-- Bible text lines -->
<line x1="7" y1="42" x2="12" y2="41" stroke="#92400e" stroke-width="0.3" opacity="0.4"/>
<line x1="7" y1="44" x2="12" y2="43" stroke="#92400e" stroke-width="0.3" opacity="0.4"/>
<line x1="16" y1="41" x2="22" y2="42" stroke="#92400e" stroke-width="0.3" opacity="0.4"/>
<line x1="16" y1="43" x2="22" y2="44" stroke="#92400e" stroke-width="0.3" opacity="0.4"/>
<!-- Holy light beams shooting right! -->
<path d="M 26,42 L 58,30" stroke="#fbbf24" stroke-width="3" opacity="0.7" filter="url(#pj-holylight)"/>
<path d="M 26,44 L 60,40" stroke="#fde047" stroke-width="2.5" opacity="0.6" filter="url(#pj-holylight)"/>
<path d="M 26,46 L 58,52" stroke="#fbbf24" stroke-width="3" opacity="0.7" filter="url(#pj-holylight)"/>
<path d="M 26,44 L 60,36" stroke="#f59e0b" stroke-width="1.5" opacity="0.4"/>
<path d="M 26,44 L 60,48" stroke="#f59e0b" stroke-width="1.5" opacity="0.4"/>
<!-- Cross shape in light -->
<line x1="46" y1="34" x2="46" y2="50" stroke="#ffffff" stroke-width="2" opacity="0.6" filter="url(#pj-holylight)"/>
<line x1="38" y1="42" x2="54" y2="42" stroke="#ffffff" stroke-width="2" opacity="0.6" filter="url(#pj-holylight)"/>
<!-- Golden particles -->
<circle cx="40" cy="38" r="1" fill="#fbbf24" opacity="0.7"/>
<circle cx="50" cy="36" r="0.8" fill="#fde047" opacity="0.6"/>
<circle cx="44" cy="48" r="1" fill="#fbbf24" opacity="0.5"/>
<circle cx="54" cy="46" r="0.8" fill="#fde047" opacity="0.6"/>
<!-- Head -->
<rect x="20" y="5" width="20" height="18" fill="#fed7aa" rx="4"/>
<rect x="20" y="3" width="20" height="6" fill="#6b4226" rx="2"/>
<path d="M 18,7 C 18,0 42,0 42,7" fill="#7c5230"/>
<!-- Eyes — righteous intensity -->
<circle cx="26" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="34" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="26.5" cy="13" r="0.8" fill="#4a7ab5"/>
<circle cx="34.5" cy="13" r="0.8" fill="#4a7ab5"/>
<!-- Determined expression -->
<path d="M 27,18 L 30,19 L 33,18" fill="none" stroke="#92400e" stroke-width="1"/>
<!-- Bright halo -->
<ellipse cx="30" cy="1" rx="8" ry="2" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.9"/>
<ellipse cx="30" cy="1" rx="6" ry="1.5" fill="none" stroke="#fde047" stroke-width="1.2" opacity="0.7"/>
</svg>`,
    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Shoes — stepping back -->
<rect x="22" y="78" width="8" height="6" fill="#1c1917" rx="2"/>
<rect x="34" y="76" width="8" height="6" fill="#1c1917" rx="2"/>
<!-- Pants -->
<rect x="23" y="54" width="7" height="26" fill="#1e293b"/>
<rect x="34" y="52" width="7" height="26" fill="#1e293b"/>
<!-- Pastor shirt -->
<rect x="16" y="22" width="28" height="34" fill="#1e293b" rx="2" opacity="0.8"/>
<rect x="26" y="22" width="8" height="3" fill="#f5f5f4" opacity="0.7"/>
<!-- Arms dropping bible -->
<path d="M 16,26 Q 8,34 10,46" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 44,26 Q 52,30 50,38" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="10" cy="46" r="2" fill="#fed7aa"/>
<circle cx="50" cy="38" r="2" fill="#fed7aa"/>
<!-- Bible dropping/falling -->
<g transform="translate(16,62) rotate(35)">
<rect x="0" y="0" width="10" height="14" fill="#78350f" rx="1"/>
<rect x="1" y="1" width="8" height="12" fill="#92400e" rx="0.5"/>
<line x1="5" y1="3" x2="5" y2="10" stroke="#fbbf24" stroke-width="0.8"/>
<line x1="2" y1="6" x2="8" y2="6" stroke="#fbbf24" stroke-width="0.8"/>
</g>
<!-- Falling pages -->
<path d="M 28,68 Q 32,66 34,70" fill="#fef9c3" stroke="#d4d4d4" stroke-width="0.3"/>
<path d="M 36,64 Q 40,62 42,66" fill="#fef9c3" stroke="#d4d4d4" stroke-width="0.3"/>
<!-- Head — surprised -->
<rect x="20" y="5" width="20" height="18" fill="#fed7aa" rx="4"/>
<rect x="20" y="3" width="20" height="6" fill="#6b4226" rx="2"/>
<path d="M 18,7 C 18,0 42,0 42,7" fill="#7c5230"/>
<!-- Surprised wide eyes -->
<circle cx="26" cy="12" r="2" fill="#ffffff"/>
<circle cx="34" cy="12" r="2" fill="#ffffff"/>
<circle cx="26" cy="12.5" r="1" fill="#4a7ab5"/>
<circle cx="34" cy="12.5" r="1" fill="#4a7ab5"/>
<!-- Raised eyebrows -->
<line x1="24" y1="9" x2="28" y2="8" stroke="#6b4226" stroke-width="0.8"/>
<line x1="36" y1="8" x2="32" y2="9" stroke="#6b4226" stroke-width="0.8"/>
<!-- Surprised O mouth -->
<ellipse cx="30" cy="19" rx="2" ry="2.5" fill="#7f1d1d"/>
<!-- Flickering halo — dimmed and tilted -->
<ellipse cx="32" cy="1" rx="7" ry="2" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.3" transform="rotate(10,32,1)"/>
<ellipse cx="32" cy="1" rx="5" ry="1.5" fill="none" stroke="#fde047" stroke-width="0.6" opacity="0.2" transform="rotate(10,32,1)">
<animate attributeName="opacity" values="0.2;0.5;0.1;0.4;0.2" dur="0.8s" repeatCount="indefinite"/>
</ellipse>
</svg>`
},

// ============================================================
// 5. PASTOR ROB — Edgy pastor, dark turtleneck, whip
//    Full ADULT height
// ============================================================
ys_pastor_rob: {
    idle: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Dark shoes -->
<rect x="20" y="78" width="8" height="6" fill="#0f172a" rx="2"/>
<rect x="32" y="78" width="8" height="6" fill="#0f172a" rx="2"/>
<!-- Dark pants -->
<rect x="22" y="54" width="7" height="26" fill="#1e293b"/>
<rect x="32" y="54" width="7" height="26" fill="#1e293b"/>
<!-- Black turtleneck body -->
<rect x="16" y="22" width="28" height="34" fill="#0f172a" rx="2"/>
<!-- Turtleneck collar (high) -->
<rect x="24" y="20" width="12" height="5" fill="#1e293b" rx="1"/>
<!-- Subtle chest texture -->
<line x1="22" y1="34" x2="38" y2="34" stroke="#1e293b" stroke-width="0.5" opacity="0.3"/>
<line x1="22" y1="42" x2="38" y2="42" stroke="#1e293b" stroke-width="0.5" opacity="0.3"/>
<!-- Left arm at side -->
<path d="M 16,26 Q 10,38 14,50" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="14" cy="50" r="2" fill="#fed7aa"/>
<!-- Right arm holding coiled whip -->
<path d="M 44,26 Q 50,36 48,46" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="48" cy="46" r="2" fill="#fed7aa"/>
<!-- Coiled whip in hand -->
<circle cx="50" cy="46" r="4" fill="none" stroke="#78350f" stroke-width="2"/>
<circle cx="50" cy="46" r="2.5" fill="none" stroke="#92400e" stroke-width="1.5"/>
<circle cx="50" cy="46" r="1" fill="#78350f"/>
<!-- Whip tail hanging -->
<path d="M 54,46 Q 56,50 54,54" stroke="#78350f" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<!-- Head -->
<rect x="20" y="5" width="20" height="18" fill="#fed7aa" rx="4"/>
<!-- Dark hair slicked back -->
<path d="M 18,8 C 18,0 42,0 42,8" fill="#1c1917"/>
<rect x="20" y="3" width="20" height="6" fill="#1c1917" rx="1"/>
<!-- Slick back lines -->
<line x1="24" y1="4" x2="22" y2="8" stroke="#0f172a" stroke-width="0.5"/>
<line x1="30" y1="3" x2="30" y2="8" stroke="#0f172a" stroke-width="0.5"/>
<line x1="36" y1="4" x2="38" y2="8" stroke="#0f172a" stroke-width="0.5"/>
<!-- Eyes — intense serious -->
<circle cx="26" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="34" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="26" cy="13" r="0.8" fill="#1c1917"/>
<circle cx="34" cy="13" r="0.8" fill="#1c1917"/>
<!-- Sharp eyebrows -->
<line x1="23" y1="10" x2="28" y2="10.5" stroke="#1c1917" stroke-width="1"/>
<line x1="37" y1="10" x2="32" y2="10.5" stroke="#1c1917" stroke-width="1"/>
<!-- Slight smirk -->
<path d="M 28,18 Q 30,19 33,18" fill="none" stroke="#92400e" stroke-width="0.8"/>
<line x1="33" y1="18" x2="35" y2="17" stroke="#92400e" stroke-width="0.6"/>
</svg>`,
    attack: `<svg viewBox="0 0 60 90" class="w-full h-full">
<defs>
<filter id="pr-sparks"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Shoes — power stance -->
<rect x="18" y="78" width="8" height="6" fill="#0f172a" rx="2"/>
<rect x="34" y="78" width="8" height="6" fill="#0f172a" rx="2"/>
<!-- Pants -->
<rect x="20" y="54" width="7" height="26" fill="#1e293b"/>
<rect x="35" y="54" width="7" height="26" fill="#1e293b"/>
<!-- Turtleneck body -->
<rect x="16" y="22" width="28" height="34" fill="#0f172a" rx="2"/>
<rect x="24" y="20" width="12" height="5" fill="#1e293b" rx="1"/>
<!-- Left arm pulled back -->
<path d="M 16,26 Q 6,32 8,40" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="8" cy="40" r="2" fill="#fed7aa"/>
<!-- Right arm whipping forward -->
<path d="M 44,26 Q 52,22 54,18" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="54" cy="18" r="2" fill="#fed7aa"/>
<!-- Whip cracking forward — long curved line -->
<path d="M 54,18 Q 58,14 60,10 Q 62,6 58,2 Q 54,-2 60,-4" stroke="#78350f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M 60,-4 Q 64,-6 66,-2" stroke="#92400e" stroke-width="2" fill="none" stroke-linecap="round"/>
<!-- Snap effect at tip -->
<path d="M 66,-2 L 68,-4 L 66,0 L 68,2" stroke="#dc2626" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<!-- Red critical sparks at whip tip -->
<circle cx="67" cy="-2" r="3" fill="#ef4444" opacity="0.5" filter="url(#pr-sparks)"/>
<circle cx="67" cy="-2" r="1.5" fill="#fca5a5" opacity="0.8"/>
<!-- Spark fragments -->
<circle cx="64" cy="-5" r="0.8" fill="#ef4444" opacity="0.7"/>
<circle cx="70" cy="0" r="0.8" fill="#f87171" opacity="0.6"/>
<circle cx="66" cy="2" r="0.6" fill="#ef4444" opacity="0.5"/>
<circle cx="68" cy="-6" r="0.5" fill="#fca5a5" opacity="0.5"/>
<!-- Motion lines for whip crack -->
<line x1="56" y1="16" x2="58" y2="14" stroke="#a8a29e" stroke-width="0.5" opacity="0.4"/>
<line x1="58" y1="12" x2="60" y2="10" stroke="#a8a29e" stroke-width="0.4" opacity="0.3"/>
<!-- Head -->
<rect x="20" y="5" width="20" height="18" fill="#fed7aa" rx="4"/>
<path d="M 18,8 C 18,0 42,0 42,8" fill="#1c1917"/>
<rect x="20" y="3" width="20" height="6" fill="#1c1917" rx="1"/>
<line x1="24" y1="4" x2="22" y2="8" stroke="#0f172a" stroke-width="0.5"/>
<line x1="30" y1="3" x2="30" y2="8" stroke="#0f172a" stroke-width="0.5"/>
<line x1="36" y1="4" x2="38" y2="8" stroke="#0f172a" stroke-width="0.5"/>
<!-- Intense eyes -->
<circle cx="26" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="34" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="27" cy="13" r="0.8" fill="#1c1917"/>
<circle cx="35" cy="13" r="0.8" fill="#1c1917"/>
<!-- Aggressive brows -->
<line x1="23" y1="11" x2="28" y2="10" stroke="#1c1917" stroke-width="1.2"/>
<line x1="37" y1="11" x2="32" y2="10" stroke="#1c1917" stroke-width="1.2"/>
<!-- Attack grimace showing teeth -->
<path d="M 27,18 Q 30,20 33,18" fill="none" stroke="#92400e" stroke-width="1.2"/>
<line x1="28" y1="18" x2="28" y2="19" stroke="#ffffff" stroke-width="0.5"/>
<line x1="30" y1="19" x2="30" y2="20" stroke="#ffffff" stroke-width="0.5"/>
<line x1="32" y1="18" x2="32" y2="19" stroke="#ffffff" stroke-width="0.5"/>
</svg>`,
    injured: `<svg viewBox="0 0 60 90" class="w-full h-full">
<ellipse cx="30" cy="85" rx="12" ry="3" fill="rgba(0,0,0,0.3)"/>
<!-- Shoes stumbling -->
<rect x="22" y="78" width="8" height="6" fill="#0f172a" rx="2"/>
<rect x="34" y="76" width="8" height="6" fill="#0f172a" rx="2"/>
<!-- Pants -->
<rect x="23" y="54" width="7" height="26" fill="#1e293b"/>
<rect x="35" y="52" width="7" height="26" fill="#1e293b"/>
<!-- Turtleneck — rumpled -->
<rect x="16" y="22" width="28" height="34" fill="#0f172a" rx="2" opacity="0.8"/>
<rect x="24" y="20" width="12" height="5" fill="#1e293b" rx="1" opacity="0.7"/>
<!-- Wrinkle/damage lines -->
<line x1="20" y1="30" x2="26" y2="36" stroke="#1e293b" stroke-width="0.8"/>
<line x1="34" y1="40" x2="40" y2="48" stroke="#1e293b" stroke-width="0.6"/>
<!-- Left arm tangled in whip -->
<path d="M 16,26 Q 8,34 10,44" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="10" cy="44" r="2" fill="#fed7aa"/>
<!-- Right arm caught -->
<path d="M 44,26 Q 50,32 48,42" stroke="#0f172a" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="48" cy="42" r="2" fill="#fed7aa"/>
<!-- Whip tangled around arms and body -->
<path d="M 10,44 Q 14,38 20,40 Q 28,42 36,38 Q 44,34 48,42" stroke="#78350f" stroke-width="2" fill="none"/>
<path d="M 12,48 Q 18,52 24,48 Q 30,44 36,48" stroke="#92400e" stroke-width="1.5" fill="none" opacity="0.7"/>
<!-- Whip end dangling -->
<path d="M 36,48 Q 40,54 38,58" stroke="#78350f" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<!-- Head grimacing -->
<rect x="20" y="5" width="20" height="18" fill="#fed7aa" rx="4"/>
<path d="M 18,8 C 18,0 42,0 42,8" fill="#1c1917"/>
<rect x="20" y="3" width="20" height="6" fill="#1c1917" rx="1"/>
<!-- Hair slightly messed -->
<path d="M 36,4 L 40,2" stroke="#1c1917" stroke-width="1.5" stroke-linecap="round"/>
<!-- Eyes — annoyed grimace -->
<circle cx="26" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="34" cy="13" r="1.5" fill="#ffffff"/>
<circle cx="26" cy="13.5" r="0.7" fill="#1c1917"/>
<circle cx="34" cy="13.5" r="0.7" fill="#1c1917"/>
<!-- Furrowed brows -->
<line x1="23" y1="10.5" x2="28" y2="9.5" stroke="#1c1917" stroke-width="1"/>
<line x1="37" y1="10.5" x2="32" y2="9.5" stroke="#1c1917" stroke-width="1"/>
<!-- Grimace -->
<path d="M 27,19 Q 30,17 33,19" fill="none" stroke="#92400e" stroke-width="1"/>
<!-- Pain star -->
<path d="M 46,10 L 48,8 L 46,6 L 48,4" stroke="#fbbf24" stroke-width="0.8" opacity="0.6"/>
<circle cx="8" cy="30" r="1" fill="#fbbf24" opacity="0.4"/>
</svg>`
}

};

// Merge into global vectors object
if (typeof vectors !== 'undefined') Object.assign(vectors, ysCharVectorsB);
