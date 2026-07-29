// ============================================================
// MULTIVERSE SAGA MAPS — Alternate dimension backgrounds
// 12 unique multiverse map backgrounds for the final saga
// ============================================================

const multiverseMaps = {

// ── MAP 1: Mirror Caltech (mv_mirror_caltech) ──
mv_mirror_caltech: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv1_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a0a2e"/>
        <stop offset="40%" stop-color="#2d1b69"/>
        <stop offset="70%" stop-color="#4a1a8a"/>
        <stop offset="100%" stop-color="#3b0764"/>
    </linearGradient>
    <linearGradient id="mv1_lightning" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e9d5ff"/>
        <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <radialGradient id="mv1_glow" cx="50%" cy="60%" r="40%">
        <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#mv1_sky)"/>
<!-- Eerie glow -->
<rect width="800" height="400" fill="url(#mv1_glow)"/>
<!-- Stars -->
<circle cx="50" cy="30" r="1" fill="#e9d5ff" opacity="0.8"/>
<circle cx="150" cy="50" r="1.5" fill="#c4b5fd" opacity="0.6"/>
<circle cx="300" cy="20" r="1" fill="#e9d5ff" opacity="0.7"/>
<circle cx="500" cy="40" r="1.5" fill="#c4b5fd" opacity="0.9"/>
<circle cx="700" cy="25" r="1" fill="#e9d5ff" opacity="0.5"/>
<circle cx="750" cy="60" r="1.2" fill="#c4b5fd" opacity="0.7"/>
<circle cx="420" cy="15" r="1" fill="#e9d5ff" opacity="0.6"/>
<!-- Lightning bolt left -->
<path d="M 120,0 L 115,60 L 125,65 L 110,130 L 122,135 L 100,200" stroke="url(#mv1_lightning)" stroke-width="2.5" fill="none" opacity="0.9"/>
<path d="M 120,0 L 115,60 L 125,65 L 110,130 L 122,135 L 100,200" stroke="#fff" stroke-width="1" fill="none" opacity="0.6"/>
<!-- Lightning bolt right -->
<path d="M 680,0 L 690,70 L 678,75 L 695,150" stroke="url(#mv1_lightning)" stroke-width="2" fill="none" opacity="0.7"/>
<path d="M 680,0 L 690,70 L 678,75 L 695,150" stroke="#fff" stroke-width="0.8" fill="none" opacity="0.5"/>
<!-- Ground - dark evil ground -->
<rect x="0" y="280" width="800" height="120" fill="#1e1b4b"/>
<rect x="0" y="300" width="800" height="100" fill="#0f0a2a"/>
<!-- Dark path -->
<path d="M 300,400 L 340,280 L 460,280 L 500,400 Z" fill="#2e1065" opacity="0.6"/>
<!-- Evil Mirror Caltech Building -->
<rect x="220" y="120" width="360" height="160" fill="#1e1b4b" stroke="#7c3aed" stroke-width="2"/>
<!-- Caltech dome (inverted/evil) -->
<ellipse cx="400" cy="120" rx="80" ry="40" fill="#2d1b69" stroke="#a855f7" stroke-width="2"/>
<ellipse cx="400" cy="120" rx="60" ry="25" fill="#3b0764"/>
<!-- Evil glowing windows -->
<rect x="260" y="150" width="40" height="50" fill="#7c3aed" opacity="0.8"/>
<rect x="320" y="150" width="40" height="50" fill="#a855f7" opacity="0.6"/>
<rect x="440" y="150" width="40" height="50" fill="#7c3aed" opacity="0.8"/>
<rect x="500" y="150" width="40" height="50" fill="#a855f7" opacity="0.6"/>
<!-- Window crosses -->
<line x1="280" y1="150" x2="280" y2="200" stroke="#1e1b4b" stroke-width="2"/>
<line x1="260" y1="175" x2="300" y2="175" stroke="#1e1b4b" stroke-width="2"/>
<line x1="340" y1="150" x2="340" y2="200" stroke="#1e1b4b" stroke-width="2"/>
<line x1="320" y1="175" x2="360" y2="175" stroke="#1e1b4b" stroke-width="2"/>
<line x1="460" y1="150" x2="460" y2="200" stroke="#1e1b4b" stroke-width="2"/>
<line x1="440" y1="175" x2="480" y2="175" stroke="#1e1b4b" stroke-width="2"/>
<line x1="520" y1="150" x2="520" y2="200" stroke="#1e1b4b" stroke-width="2"/>
<line x1="500" y1="175" x2="540" y2="175" stroke="#1e1b4b" stroke-width="2"/>
<!-- Evil columns -->
<rect x="235" y="140" width="12" height="140" fill="#2d1b69" stroke="#7c3aed" stroke-width="1"/>
<rect x="553" y="140" width="12" height="140" fill="#2d1b69" stroke="#7c3aed" stroke-width="1"/>
<!-- Evil entrance -->
<rect x="370" y="210" width="60" height="70" fill="#0f0a2a" rx="30" ry="30"/>
<rect x="375" y="230" width="50" height="50" fill="#0f0a2a"/>
<!-- Floating equations -->
<text x="100" y="250" fill="#a855f7" font-size="10" opacity="0.6" font-family="serif">E=mc²</text>
<text x="650" y="200" fill="#7c3aed" font-size="9" opacity="0.5" font-family="serif">∫ψ·dΩ</text>
<text x="80" y="180" fill="#c4b5fd" font-size="8" opacity="0.4" font-family="serif">∇×B</text>
<text x="700" y="270" fill="#a855f7" font-size="10" opacity="0.5" font-family="serif">ℏω</text>
<text x="50" y="310" fill="#7c3aed" font-size="11" opacity="0.3" font-family="serif">Σ∞</text>
<text x="720" y="140" fill="#c4b5fd" font-size="9" opacity="0.4" font-family="serif">ΔxΔp≥ℏ/2</text>
<!-- Left tower -->
<rect x="100" y="180" width="50" height="100" fill="#1e1b4b" stroke="#7c3aed" stroke-width="1"/>
<polygon points="100,180 125,150 150,180" fill="#2d1b69" stroke="#7c3aed" stroke-width="1"/>
<!-- Right tower -->
<rect x="650" y="180" width="50" height="100" fill="#1e1b4b" stroke="#7c3aed" stroke-width="1"/>
<polygon points="650,180 675,150 700,180" fill="#2d1b69" stroke="#7c3aed" stroke-width="1"/>
</svg>`,

// ── MAP 2: Steampunk 4A (mv_steampunk_4a) ──
mv_steampunk_4a: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv2_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#78350f"/>
        <stop offset="40%" stop-color="#92400e"/>
        <stop offset="70%" stop-color="#b45309"/>
        <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <radialGradient id="mv2_lamp" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mv2_brass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#d97706"/>
        <stop offset="50%" stop-color="#b45309"/>
        <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#mv2_sky)"/>
<!-- Warm amber fog -->
<rect width="800" height="400" fill="#fbbf24" opacity="0.08"/>
<!-- Steam clouds -->
<ellipse cx="200" cy="50" rx="100" ry="30" fill="#d6d3d1" opacity="0.15"/>
<ellipse cx="600" cy="70" rx="80" ry="25" fill="#d6d3d1" opacity="0.12"/>
<ellipse cx="400" cy="30" rx="120" ry="20" fill="#d6d3d1" opacity="0.1"/>
<!-- Ground - cobblestone street -->
<rect x="0" y="300" width="800" height="100" fill="#57534e"/>
<rect x="0" y="310" width="800" height="90" fill="#44403c"/>
<!-- Cobblestone pattern -->
<rect x="20" y="320" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="60" y="320" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="100" y="320" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="140" y="320" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="180" y="320" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="35" y="340" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="75" y="340" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="115" y="340" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="450" y="320" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="490" y="320" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="530" y="320" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<rect x="570" y="320" width="30" height="15" rx="3" fill="#57534e" stroke="#3f3a36" stroke-width="1"/>
<!-- Victorian Apartment Building -->
<rect x="200" y="80" width="400" height="220" fill="#92400e" stroke="#78350f" stroke-width="3"/>
<!-- Brass trim -->
<rect x="200" y="80" width="400" height="8" fill="url(#mv2_brass)"/>
<rect x="200" y="140" width="400" height="4" fill="url(#mv2_brass)"/>
<rect x="200" y="200" width="400" height="4" fill="url(#mv2_brass)"/>
<!-- Windows with warm glow -->
<rect x="230" y="100" width="50" height="35" fill="#fbbf24" opacity="0.7" rx="2"/>
<rect x="300" y="100" width="50" height="35" fill="#f59e0b" opacity="0.6" rx="2"/>
<rect x="450" y="100" width="50" height="35" fill="#fbbf24" opacity="0.7" rx="2"/>
<rect x="520" y="100" width="50" height="35" fill="#f59e0b" opacity="0.6" rx="2"/>
<rect x="230" y="155" width="50" height="35" fill="#fbbf24" opacity="0.5" rx="2"/>
<rect x="300" y="155" width="50" height="35" fill="#f59e0b" opacity="0.7" rx="2"/>
<rect x="450" y="155" width="50" height="35" fill="#fbbf24" opacity="0.5" rx="2"/>
<rect x="520" y="155" width="50" height="35" fill="#f59e0b" opacity="0.7" rx="2"/>
<!-- Door with "4A" -->
<rect x="370" y="220" width="60" height="80" fill="#78350f" rx="30" ry="30"/>
<rect x="375" y="250" width="50" height="50" fill="#78350f"/>
<text x="388" y="268" fill="#d97706" font-size="14" font-weight="bold">4A</text>
<circle cx="420" cy="270" r="3" fill="#fbbf24"/>
<!-- Large gear left -->
<circle cx="120" cy="200" r="50" fill="none" stroke="url(#mv2_brass)" stroke-width="4"/>
<circle cx="120" cy="200" r="35" fill="none" stroke="#b45309" stroke-width="2"/>
<circle cx="120" cy="200" r="8" fill="#d97706"/>
<line x1="120" y1="150" x2="120" y2="250" stroke="#b45309" stroke-width="3"/>
<line x1="70" y1="200" x2="170" y2="200" stroke="#b45309" stroke-width="3"/>
<line x1="85" y1="165" x2="155" y2="235" stroke="#b45309" stroke-width="3"/>
<line x1="155" y1="165" x2="85" y2="235" stroke="#b45309" stroke-width="3"/>
<!-- Large gear right -->
<circle cx="700" cy="180" r="40" fill="none" stroke="url(#mv2_brass)" stroke-width="4"/>
<circle cx="700" cy="180" r="28" fill="none" stroke="#b45309" stroke-width="2"/>
<circle cx="700" cy="180" r="6" fill="#d97706"/>
<line x1="700" y1="140" x2="700" y2="220" stroke="#b45309" stroke-width="3"/>
<line x1="660" y1="180" x2="740" y2="180" stroke="#b45309" stroke-width="3"/>
<line x1="672" y1="152" x2="728" y2="208" stroke="#b45309" stroke-width="3"/>
<line x1="728" y1="152" x2="672" y2="208" stroke="#b45309" stroke-width="3"/>
<!-- Steam pipes across building -->
<rect x="200" y="260" width="400" height="8" fill="#a16207" rx="4"/>
<rect x="180" y="250" width="20" height="12" fill="#92400e" rx="2"/>
<rect x="600" y="250" width="20" height="12" fill="#92400e" rx="2"/>
<!-- Steam vents -->
<ellipse cx="190" cy="245" rx="15" ry="8" fill="#d6d3d1" opacity="0.25"/>
<ellipse cx="610" cy="245" rx="15" ry="8" fill="#d6d3d1" opacity="0.2"/>
<!-- Pipe along left -->
<rect x="195" y="88" width="8" height="212" fill="#a16207" rx="3"/>
<!-- Pipe along right -->
<rect x="597" y="88" width="8" height="212" fill="#a16207" rx="3"/>
<!-- Lamp posts -->
<rect x="148" y="250" width="4" height="50" fill="#78350f"/>
<circle cx="150" cy="245" r="10" fill="url(#mv2_lamp)"/>
<circle cx="150" cy="245" r="5" fill="#fbbf24"/>
<rect x="648" y="250" width="4" height="50" fill="#78350f"/>
<circle cx="650" cy="245" r="10" fill="url(#mv2_lamp)"/>
<circle cx="650" cy="245" r="5" fill="#fbbf24"/>
<!-- Small gear top -->
<circle cx="400" cy="60" r="20" fill="none" stroke="#b45309" stroke-width="3"/>
<circle cx="400" cy="60" r="4" fill="#d97706"/>
</svg>`,

// ── MAP 3: Zombie Pasadena (mv_zombie_pasadena) ──
mv_zombie_pasadena: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv3_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a2e05"/>
        <stop offset="40%" stop-color="#365314"/>
        <stop offset="70%" stop-color="#4d7c0f"/>
        <stop offset="100%" stop-color="#3f6212"/>
    </linearGradient>
    <radialGradient id="mv3_toxic" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#84cc16" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#mv3_sky)"/>
<rect width="800" height="400" fill="url(#mv3_toxic)"/>
<!-- Sickly moon -->
<circle cx="650" cy="70" r="30" fill="#a3e635" opacity="0.4"/>
<circle cx="650" cy="70" r="25" fill="#d9f99d" opacity="0.3"/>
<!-- Dark clouds -->
<ellipse cx="200" cy="50" rx="120" ry="30" fill="#1a2e05" opacity="0.6"/>
<ellipse cx="550" cy="40" rx="100" ry="25" fill="#1a2e05" opacity="0.5"/>
<ellipse cx="380" cy="60" rx="80" ry="20" fill="#1a2e05" opacity="0.4"/>
<!-- Ground - cracked earth -->
<rect x="0" y="280" width="800" height="120" fill="#3f3f46"/>
<rect x="0" y="300" width="800" height="100" fill="#27272a"/>
<!-- Cracks in ground -->
<path d="M 100,300 L 130,340 L 110,370 L 140,400" stroke="#1a1a1a" stroke-width="2" fill="none"/>
<path d="M 400,280 L 420,320 L 390,360" stroke="#1a1a1a" stroke-width="2" fill="none"/>
<path d="M 600,290 L 630,350 L 610,400" stroke="#1a1a1a" stroke-width="2" fill="none"/>
<!-- Destroyed building left -->
<rect x="50" y="140" width="150" height="140" fill="#57534e"/>
<polygon points="50,140 80,100 130,90 180,110 200,140" fill="#44403c"/>
<!-- Broken windows -->
<rect x="70" y="170" width="30" height="30" fill="#1a1a1a"/>
<path d="M 70,170 L 100,200" stroke="#84cc16" stroke-width="1" opacity="0.3"/>
<rect x="120" y="170" width="30" height="30" fill="#1a1a1a"/>
<!-- Destroyed top -->
<rect x="160" y="140" width="40" height="60" fill="#57534e" opacity="0.5"/>
<polygon points="160,140 180,120 200,140" fill="#44403c" opacity="0.5"/>
<!-- Destroyed building right -->
<rect x="550" y="120" width="180" height="160" fill="#57534e"/>
<rect x="550" y="120" width="180" height="10" fill="#44403c"/>
<!-- Broken facade -->
<polygon points="550,120 600,80 650,90 700,75 730,120" fill="#44403c"/>
<!-- Dark windows -->
<rect x="570" y="150" width="35" height="40" fill="#1a1a1a"/>
<rect x="620" y="150" width="35" height="40" fill="#1a1a1a"/>
<rect x="670" y="150" width="35" height="40" fill="#1a1a1a"/>
<path d="M 570,150 L 605,190" stroke="#65a30d" stroke-width="1" opacity="0.3"/>
<!-- Rubble -->
<polygon points="540,280 560,260 580,280" fill="#57534e"/>
<polygon points="720,280 740,265 760,280" fill="#44403c"/>
<circle cx="550" cy="278" r="5" fill="#3f3f46"/>
<circle cx="745" cy="278" r="4" fill="#3f3f46"/>
<!-- Overturned car -->
<rect x="300" y="265" width="80" height="30" fill="#71717a" rx="5" transform="rotate(15, 340, 280)"/>
<circle cx="315" cy="300" r="10" fill="#27272a" stroke="#3f3f46" stroke-width="2"/>
<circle cx="365" cy="300" r="10" fill="#27272a" stroke="#3f3f46" stroke-width="2"/>
<rect x="310" y="258" width="50" height="15" fill="#52525b" rx="3" transform="rotate(15, 335, 265)"/>
<!-- Another wreck -->
<rect x="600" y="285" width="60" height="20" fill="#52525b" rx="3" transform="rotate(-10, 630, 295)"/>
<circle cx="610" cy="308" r="8" fill="#27272a" stroke="#3f3f46" stroke-width="2"/>
<!-- Toxic puddles -->
<ellipse cx="250" cy="330" rx="40" ry="8" fill="#84cc16" opacity="0.3"/>
<ellipse cx="500" cy="350" rx="30" ry="6" fill="#65a30d" opacity="0.25"/>
<!-- Fire barrel -->
<rect x="460" y="255" width="25" height="30" fill="#78716c" rx="2"/>
<polygon points="460,255 472,235 485,255" fill="#f97316" opacity="0.7"/>
<polygon points="465,255 472,240 480,255" fill="#fbbf24" opacity="0.8"/>
<!-- Zombie hands from ground -->
<path d="M 180,280 L 178,265 L 175,258 M 178,265 L 182,258 M 178,265 L 174,260" stroke="#65a30d" stroke-width="2" fill="none"/>
<path d="M 700,285 L 698,270 L 695,262 M 698,270 L 703,263" stroke="#65a30d" stroke-width="2" fill="none"/>
</svg>`,

// ── MAP 4: Pirate Cove (mv_pirate_cove) ──
mv_pirate_cove: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv4_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#7c2d12"/>
        <stop offset="30%" stop-color="#c2410c"/>
        <stop offset="60%" stop-color="#ea580c"/>
        <stop offset="100%" stop-color="#fb923c"/>
    </linearGradient>
    <linearGradient id="mv4_ocean" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e3a5f"/>
        <stop offset="100%" stop-color="#0c4a6e"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#mv4_sky)"/>
<!-- Sun setting -->
<circle cx="400" cy="180" r="50" fill="#fbbf24" opacity="0.6"/>
<circle cx="400" cy="180" r="35" fill="#fef3c7" opacity="0.4"/>
<!-- Sun reflection on water -->
<ellipse cx="400" cy="280" rx="60" ry="5" fill="#fbbf24" opacity="0.3"/>
<ellipse cx="400" cy="290" rx="40" ry="3" fill="#fbbf24" opacity="0.2"/>
<!-- Ocean -->
<rect x="0" y="230" width="800" height="170" fill="url(#mv4_ocean)"/>
<!-- Waves -->
<path d="M 0,250 Q 50,240 100,250 Q 150,260 200,250 Q 250,240 300,250 Q 350,260 400,250 Q 450,240 500,250 Q 550,260 600,250 Q 650,240 700,250 Q 750,260 800,250" stroke="#38bdf8" stroke-width="1.5" fill="none" opacity="0.3"/>
<path d="M 0,270 Q 40,262 80,270 Q 120,278 160,270 Q 200,262 240,270 Q 280,278 320,270 Q 360,262 400,270 Q 440,278 480,270 Q 520,262 560,270 Q 600,278 640,270 Q 680,262 720,270 Q 760,278 800,270" stroke="#38bdf8" stroke-width="1" fill="none" opacity="0.2"/>
<!-- Pirate ship left -->
<path d="M 80,220 Q 130,240 180,220" stroke="#78350f" stroke-width="3" fill="#92400e"/>
<path d="M 70,220 L 80,220 L 80,240 Q 130,260 180,240 L 180,220 L 190,220 Q 180,250 130,260 Q 80,250 70,220 Z" fill="#78350f"/>
<!-- Mast -->
<rect x="128" y="140" width="4" height="80" fill="#78350f"/>
<!-- Sail -->
<path d="M 132,145 L 170,155 L 132,185 Z" fill="#fef3c7" opacity="0.8"/>
<!-- Skull flag -->
<rect x="126" y="135" width="20" height="14" fill="#18181b"/>
<circle cx="136" cy="140" r="3" fill="#fef3c7"/>
<line x1="133" y1="146" x2="139" y2="146" stroke="#fef3c7" stroke-width="1"/>
<!-- Pirate ship right (larger) -->
<path d="M 550,210 Q 630,235 710,210" stroke="#78350f" stroke-width="4" fill="#92400e"/>
<path d="M 540,210 L 550,210 L 550,235 Q 630,260 710,235 L 710,210 L 720,210 Q 710,250 630,265 Q 550,250 540,210 Z" fill="#78350f"/>
<!-- Mast -->
<rect x="628" y="110" width="5" height="100" fill="#78350f"/>
<!-- Sails -->
<path d="M 633,115 L 690,130 L 633,165 Z" fill="#fef3c7" opacity="0.9"/>
<path d="M 628,115 L 575,130 L 628,160 Z" fill="#fef3c7" opacity="0.7"/>
<!-- Skull flag -->
<rect x="624" y="105" width="22" height="15" fill="#18181b"/>
<circle cx="635" cy="110" r="3.5" fill="#fef3c7"/>
<line x1="631" y1="116" x2="639" y2="116" stroke="#fef3c7" stroke-width="1"/>
<!-- Wooden dock -->
<rect x="280" y="260" width="240" height="10" fill="#92400e"/>
<rect x="280" y="260" width="240" height="3" fill="#a16207"/>
<!-- Dock posts -->
<rect x="290" y="260" width="6" height="40" fill="#78350f"/>
<rect x="350" y="260" width="6" height="35" fill="#78350f"/>
<rect x="440" y="260" width="6" height="35" fill="#78350f"/>
<rect x="510" y="260" width="6" height="40" fill="#78350f"/>
<!-- Dock planks -->
<line x1="280" y1="263" x2="520" y2="263" stroke="#78350f" stroke-width="0.5"/>
<line x1="280" y1="266" x2="520" y2="266" stroke="#78350f" stroke-width="0.5"/>
<!-- Barrel on dock -->
<ellipse cx="320" cy="255" rx="12" ry="8" fill="#78350f"/>
<rect x="308" y="245" width="24" height="12" fill="#92400e" rx="3"/>
<ellipse cx="320" cy="245" rx="12" ry="6" fill="#a16207"/>
<!-- Skull flag on dock post -->
<rect x="505" y="240" width="16" height="12" fill="#18181b"/>
<circle cx="513" cy="244" r="2.5" fill="#fef3c7"/>
<!-- Island silhouette background -->
<path d="M 0,230 Q 30,210 60,225 Q 80,215 100,230 L 0,230 Z" fill="#1e3a5f" opacity="0.6"/>
<path d="M 750,230 Q 770,210 790,220 L 800,230 L 750,230 Z" fill="#1e3a5f" opacity="0.5"/>
<!-- Birds -->
<path d="M 200,100 Q 210,90 220,100" stroke="#18181b" stroke-width="1.5" fill="none"/>
<path d="M 240,80 Q 248,72 256,80" stroke="#18181b" stroke-width="1.5" fill="none"/>
<path d="M 500,90 Q 508,82 516,90" stroke="#18181b" stroke-width="1.5" fill="none"/>
</svg>`,

// ── MAP 5: Medieval Realm (mv_medieval_realm) ──
mv_medieval_realm: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv5_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e3a8a"/>
        <stop offset="40%" stop-color="#2563eb"/>
        <stop offset="70%" stop-color="#60a5fa"/>
        <stop offset="100%" stop-color="#93c5fd"/>
    </linearGradient>
    <linearGradient id="mv5_hills" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#16a34a"/>
        <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#mv5_sky)"/>
<!-- Clouds -->
<ellipse cx="150" cy="60" rx="80" ry="25" fill="#fff" opacity="0.4"/>
<ellipse cx="200" cy="55" rx="50" ry="20" fill="#fff" opacity="0.5"/>
<ellipse cx="600" cy="80" rx="70" ry="20" fill="#fff" opacity="0.35"/>
<ellipse cx="650" cy="75" rx="40" ry="15" fill="#fff" opacity="0.45"/>
<!-- Dragon silhouette -->
<path d="M 620,50 L 640,30 L 660,40 L 680,25 L 670,45 L 690,55 L 680,60 L 700,70 L 670,65 L 660,75 L 650,60 L 635,70 L 630,55 Z" fill="#1e3a8a" opacity="0.6"/>
<!-- Dragon wing -->
<path d="M 650,60 Q 700,30 720,50 L 690,55" fill="#1e3a8a" opacity="0.5"/>
<path d="M 635,55 Q 600,25 590,45 L 620,50" fill="#1e3a8a" opacity="0.5"/>
<!-- Far hills -->
<path d="M 0,250 Q 100,200 200,240 Q 300,190 400,230 Q 500,200 600,240 Q 700,210 800,250 L 800,400 L 0,400 Z" fill="url(#mv5_hills)" opacity="0.5"/>
<!-- Green hills -->
<path d="M 0,280 Q 100,250 200,270 Q 300,240 400,270 Q 500,250 600,275 Q 700,255 800,280 L 800,400 L 0,400 Z" fill="#16a34a"/>
<rect x="0" y="310" width="800" height="90" fill="#15803d"/>
<!-- Castle -->
<rect x="280" y="130" width="240" height="150" fill="#a8a29e"/>
<rect x="280" y="130" width="240" height="10" fill="#78716c"/>
<!-- Castle wall texture -->
<line x1="320" y1="140" x2="320" y2="280" stroke="#9ca3af" stroke-width="0.5" opacity="0.3"/>
<line x1="400" y1="140" x2="400" y2="280" stroke="#9ca3af" stroke-width="0.5" opacity="0.3"/>
<line x1="470" y1="140" x2="470" y2="280" stroke="#9ca3af" stroke-width="0.5" opacity="0.3"/>
<!-- Left tower -->
<rect x="260" y="80" width="50" height="200" fill="#9ca3af"/>
<!-- Battlements left -->
<rect x="256" y="75" width="14" height="15" fill="#9ca3af"/>
<rect x="274" y="75" width="14" height="15" fill="#9ca3af"/>
<rect x="292" y="75" width="14" height="15" fill="#9ca3af"/>
<!-- Tower roof left -->
<polygon points="260,75 285,35 310,75" fill="#dc2626"/>
<!-- Right tower -->
<rect x="490" y="80" width="50" height="200" fill="#9ca3af"/>
<!-- Battlements right -->
<rect x="486" y="75" width="14" height="15" fill="#9ca3af"/>
<rect x="504" y="75" width="14" height="15" fill="#9ca3af"/>
<rect x="522" y="75" width="14" height="15" fill="#9ca3af"/>
<!-- Tower roof right -->
<polygon points="490,75 515,35 540,75" fill="#dc2626"/>
<!-- Center battlements -->
<rect x="310" y="125" width="12" height="12" fill="#a8a29e"/>
<rect x="330" y="125" width="12" height="12" fill="#a8a29e"/>
<rect x="350" y="125" width="12" height="12" fill="#a8a29e"/>
<rect x="370" y="125" width="12" height="12" fill="#a8a29e"/>
<rect x="390" y="125" width="12" height="12" fill="#a8a29e"/>
<rect x="410" y="125" width="12" height="12" fill="#a8a29e"/>
<rect x="430" y="125" width="12" height="12" fill="#a8a29e"/>
<rect x="450" y="125" width="12" height="12" fill="#a8a29e"/>
<rect x="470" y="125" width="12" height="12" fill="#a8a29e"/>
<!-- Gate -->
<rect x="370" y="200" width="60" height="80" fill="#57534e" rx="30" ry="30"/>
<rect x="375" y="230" width="50" height="50" fill="#57534e"/>
<!-- Portcullis -->
<line x1="380" y1="200" x2="380" y2="280" stroke="#44403c" stroke-width="2"/>
<line x1="395" y1="200" x2="395" y2="280" stroke="#44403c" stroke-width="2"/>
<line x1="410" y1="200" x2="410" y2="280" stroke="#44403c" stroke-width="2"/>
<line x1="425" y1="200" x2="425" y2="280" stroke="#44403c" stroke-width="2"/>
<!-- Castle windows -->
<rect x="300" y="165" width="25" height="35" fill="#3b82f6" opacity="0.4" rx="12" ry="12"/>
<rect x="300" y="185" width="25" height="15" fill="#3b82f6" opacity="0.4"/>
<rect x="475" y="165" width="25" height="35" fill="#3b82f6" opacity="0.4" rx="12" ry="12"/>
<rect x="475" y="185" width="25" height="15" fill="#3b82f6" opacity="0.4"/>
<!-- Tower windows -->
<rect x="275" y="110" width="18" height="25" fill="#3b82f6" opacity="0.3" rx="9" ry="9"/>
<rect x="275" y="122" width="18" height="13" fill="#3b82f6" opacity="0.3"/>
<rect x="505" y="110" width="18" height="25" fill="#3b82f6" opacity="0.3" rx="9" ry="9"/>
<rect x="505" y="122" width="18" height="13" fill="#3b82f6" opacity="0.3"/>
<!-- Flag on left tower -->
<line x1="285" y1="35" x2="285" y2="15" stroke="#78716c" stroke-width="2"/>
<polygon points="285,15 310,22 285,29" fill="#dc2626"/>
<!-- Flag on right tower -->
<line x1="515" y1="35" x2="515" y2="15" stroke="#78716c" stroke-width="2"/>
<polygon points="515,15 540,22 515,29" fill="#2563eb"/>
<!-- Trees -->
<rect x="150" y="250" width="8" height="30" fill="#78350f"/>
<polygon points="130,260 154,220 178,260" fill="#166534"/>
<polygon points="135,245 154,210 173,245" fill="#15803d"/>
<rect x="650" y="250" width="8" height="30" fill="#78350f"/>
<polygon points="630,260 654,220 678,260" fill="#166534"/>
<polygon points="635,245 654,210 673,245" fill="#15803d"/>
<!-- Path to castle -->
<path d="M 350,400 L 380,280 L 420,280 L 450,400 Z" fill="#a16207" opacity="0.5"/>
</svg>`,

// ── MAP 6: Wild West (mv_wild_west) ──
mv_wild_west: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv6_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#9a3412"/>
        <stop offset="35%" stop-color="#c2410c"/>
        <stop offset="65%" stop-color="#ea580c"/>
        <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
    <linearGradient id="mv6_dust" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#d4a574" stop-opacity="0"/>
        <stop offset="100%" stop-color="#d4a574" stop-opacity="0.3"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#mv6_sky)"/>
<!-- Dust haze -->
<rect width="800" height="400" fill="url(#mv6_dust)"/>
<!-- Sun -->
<circle cx="400" cy="60" r="40" fill="#fbbf24" opacity="0.7"/>
<circle cx="400" cy="60" r="28" fill="#fef3c7" opacity="0.5"/>
<!-- Desert mountains far -->
<path d="M 0,220 L 100,160 L 180,200 L 280,140 L 350,190 L 450,150 L 530,200 L 620,155 L 700,180 L 800,150 L 800,250 L 0,250 Z" fill="#92400e" opacity="0.4"/>
<!-- Dusty ground -->
<rect x="0" y="270" width="800" height="130" fill="#a16207"/>
<rect x="0" y="285" width="800" height="115" fill="#92400e"/>
<!-- Dirt road -->
<path d="M 0,320 L 800,320" stroke="#b45309" stroke-width="60" opacity="0.4"/>
<path d="M 0,320 L 800,320" stroke="#a16207" stroke-width="40" opacity="0.3"/>
<!-- Saloon (center) -->
<rect x="280" y="160" width="240" height="120" fill="#92400e"/>
<rect x="275" y="155" width="250" height="10" fill="#78350f"/>
<!-- Saloon facade -->
<rect x="275" y="130" width="250" height="30" fill="#a16207"/>
<rect x="275" y="128" width="250" height="5" fill="#78350f"/>
<!-- SALOON text -->
<text x="345" y="152" fill="#fef3c7" font-size="16" font-weight="bold" font-family="serif">SALOON</text>
<!-- Saloon doors -->
<rect x="375" y="220" width="25" height="60" fill="#78350f" rx="2"/>
<rect x="405" y="220" width="25" height="60" fill="#78350f" rx="2"/>
<!-- Saloon windows -->
<rect x="300" y="185" width="45" height="40" fill="#fbbf24" opacity="0.4"/>
<line x1="322" y1="185" x2="322" y2="225" stroke="#78350f" stroke-width="2"/>
<rect x="460" y="185" width="45" height="40" fill="#fbbf24" opacity="0.4"/>
<line x1="482" y1="185" x2="482" y2="225" stroke="#78350f" stroke-width="2"/>
<!-- Porch -->
<rect x="275" y="275" width="250" height="5" fill="#78350f"/>
<!-- Porch posts -->
<rect x="285" y="165" width="5" height="115" fill="#78350f"/>
<rect x="515" y="165" width="5" height="115" fill="#78350f"/>
<!-- Building left - general store -->
<rect x="50" y="180" width="150" height="100" fill="#a16207"/>
<rect x="45" y="170" width="160" height="15" fill="#78350f"/>
<rect x="70" y="200" width="40" height="35" fill="#fbbf24" opacity="0.3"/>
<rect x="130" y="210" width="30" height="70" fill="#78350f"/>
<!-- Building right - sheriff -->
<rect x="600" y="185" width="140" height="95" fill="#a16207"/>
<rect x="595" y="178" width="150" height="12" fill="#78350f"/>
<rect x="620" y="205" width="35" height="30" fill="#fbbf24" opacity="0.3"/>
<rect x="695" y="215" width="25" height="65" fill="#78350f"/>
<!-- Sheriff star -->
<text x="630" y="260" fill="#fbbf24" font-size="16">★</text>
<!-- Water tower -->
<rect x="30" y="110" width="60" height="50" fill="#78350f" rx="5"/>
<rect x="25" y="105" width="70" height="10" fill="#6b3a10"/>
<!-- Tower legs -->
<line x1="40" y1="160" x2="35" y2="270" stroke="#78350f" stroke-width="4"/>
<line x1="80" y1="160" x2="85" y2="270" stroke="#78350f" stroke-width="4"/>
<line x1="60" y1="160" x2="60" y2="270" stroke="#78350f" stroke-width="3"/>
<!-- Cross braces -->
<line x1="40" y1="200" x2="80" y2="230" stroke="#78350f" stroke-width="2"/>
<line x1="80" y1="200" x2="40" y2="230" stroke="#78350f" stroke-width="2"/>
<!-- Hitching post -->
<rect x="560" y="295" width="3" height="20" fill="#78350f"/>
<rect x="560" y="295" width="35" height="3" fill="#78350f"/>
<rect x="592" y="295" width="3" height="20" fill="#78350f"/>
<!-- Tumbleweed -->
<circle cx="700" cy="310" r="12" fill="none" stroke="#a16207" stroke-width="2" opacity="0.6"/>
<circle cx="700" cy="310" r="8" fill="none" stroke="#92400e" stroke-width="1" opacity="0.5"/>
<!-- Cactus -->
<rect x="750" y="250" width="8" height="30" fill="#15803d" rx="4"/>
<rect x="745" y="255" width="5" height="15" fill="#15803d" rx="2" transform="rotate(-30, 747, 262)"/>
<rect x="755" y="260" width="5" height="12" fill="#15803d" rx="2" transform="rotate(30, 757, 266)"/>
</svg>`,

// ── MAP 7: Robot Uprising (mv_robot_uprising) ──
mv_robot_uprising: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv7_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a"/>
        <stop offset="40%" stop-color="#1c1917"/>
        <stop offset="70%" stop-color="#292524"/>
        <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <radialGradient id="mv7_search1" cx="30%" cy="0%" r="40%">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="mv7_search2" cx="70%" cy="0%" r="35%">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#mv7_sky)"/>
<!-- Searchlight beams -->
<polygon points="200,0 100,300 300,300" fill="url(#mv7_search1)"/>
<polygon points="600,0 520,300 680,300" fill="url(#mv7_search2)"/>
<!-- Red alert glow -->
<rect width="800" height="400" fill="#dc2626" opacity="0.05"/>
<!-- Smoke/smog -->
<ellipse cx="300" cy="100" rx="150" ry="40" fill="#44403c" opacity="0.3"/>
<ellipse cx="600" cy="80" rx="120" ry="30" fill="#44403c" opacity="0.25"/>
<!-- Ground - destroyed pavement -->
<rect x="0" y="280" width="800" height="120" fill="#1c1917"/>
<rect x="0" y="300" width="800" height="100" fill="#0f0e0d"/>
<!-- Cracks -->
<path d="M 200,280 L 220,320 L 200,360 L 230,400" stroke="#292524" stroke-width="2" fill="none"/>
<path d="M 500,280 L 520,330 L 510,380" stroke="#292524" stroke-width="2" fill="none"/>
<!-- Destroyed building left -->
<rect x="30" y="120" width="120" height="160" fill="#292524"/>
<polygon points="30,120 60,90 100,80 140,100 150,120" fill="#1c1917"/>
<!-- Broken windows with red glow -->
<rect x="50" y="145" width="30" height="30" fill="#dc2626" opacity="0.3"/>
<rect x="100" y="145" width="30" height="30" fill="#0a0a0a"/>
<rect x="50" y="200" width="30" height="30" fill="#0a0a0a"/>
<rect x="100" y="200" width="30" height="30" fill="#dc2626" opacity="0.2"/>
<!-- Destroyed building center-left -->
<rect x="180" y="150" width="100" height="130" fill="#292524"/>
<polygon points="180,150 210,120 250,115 280,130 280,150" fill="#1c1917"/>
<rect x="200" y="170" width="25" height="25" fill="#0a0a0a"/>
<rect x="240" y="170" width="25" height="25" fill="#dc2626" opacity="0.15"/>
<!-- Main destroyed skyscraper -->
<rect x="350" y="60" width="100" height="220" fill="#292524"/>
<polygon points="350,60 370,30 420,25 450,50 450,60" fill="#1c1917"/>
<!-- Broken top -->
<rect x="430" y="60" width="20" height="80" fill="#292524" opacity="0.6"/>
<!-- Windows grid -->
<rect x="365" y="80" width="18" height="18" fill="#dc2626" opacity="0.2"/>
<rect x="395" y="80" width="18" height="18" fill="#0a0a0a"/>
<rect x="425" y="80" width="18" height="18" fill="#0a0a0a"/>
<rect x="365" y="110" width="18" height="18" fill="#0a0a0a"/>
<rect x="395" y="110" width="18" height="18" fill="#dc2626" opacity="0.15"/>
<rect x="365" y="140" width="18" height="18" fill="#0a0a0a"/>
<rect x="395" y="140" width="18" height="18" fill="#0a0a0a"/>
<rect x="365" y="170" width="18" height="18" fill="#dc2626" opacity="0.1"/>
<rect x="395" y="170" width="18" height="18" fill="#0a0a0a"/>
<!-- Destroyed building right -->
<rect x="550" y="130" width="130" height="150" fill="#292524"/>
<polygon points="550,130 580,100 630,90 670,110 680,130" fill="#1c1917"/>
<rect x="570" y="155" width="28" height="28" fill="#0a0a0a"/>
<rect x="620" y="155" width="28" height="28" fill="#dc2626" opacity="0.2"/>
<rect x="570" y="200" width="28" height="28" fill="#dc2626" opacity="0.15"/>
<rect x="620" y="200" width="28" height="28" fill="#0a0a0a"/>
<!-- Far building right -->
<rect x="700" y="160" width="80" height="120" fill="#292524"/>
<rect x="715" y="180" width="20" height="20" fill="#0a0a0a"/>
<rect x="745" y="180" width="20" height="20" fill="#dc2626" opacity="0.1"/>
<!-- Robot silhouette 1 -->
<rect x="480" y="240" width="25" height="35" fill="#1c1917" rx="3"/>
<rect x="485" y="230" width="15" height="14" fill="#1c1917" rx="2"/>
<!-- Robot eyes -->
<circle cx="490" cy="236" r="2" fill="#dc2626"/>
<circle cx="496" cy="236" r="2" fill="#dc2626"/>
<!-- Robot legs -->
<rect x="483" y="275" width="6" height="15" fill="#1c1917"/>
<rect x="496" y="275" width="6" height="15" fill="#1c1917"/>
<!-- Robot silhouette 2 -->
<rect x="160" y="248" width="20" height="28" fill="#1c1917" rx="2"/>
<rect x="164" y="240" width="12" height="10" fill="#1c1917" rx="2"/>
<circle cx="168" cy="244" r="1.5" fill="#dc2626"/>
<circle cx="173" cy="244" r="1.5" fill="#dc2626"/>
<rect x="162" y="276" width="5" height="12" fill="#1c1917"/>
<rect x="174" y="276" width="5" height="12" fill="#1c1917"/>
<!-- Red alert lights -->
<circle cx="50" cy="300" r="4" fill="#dc2626" opacity="0.6"/>
<circle cx="400" cy="295" r="4" fill="#dc2626" opacity="0.5"/>
<circle cx="750" cy="300" r="4" fill="#dc2626" opacity="0.6"/>
<!-- Fire/explosion -->
<polygon points="320,280 330,250 340,270 350,240 360,265 370,280" fill="#f97316" opacity="0.5"/>
<polygon points="328,280 335,258 345,275 352,248 360,270 365,280" fill="#fbbf24" opacity="0.4"/>
</svg>`,

// ── MAP 8: Jurassic (mv_jurassic) ──
mv_jurassic: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv8_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#6b7280"/>
        <stop offset="30%" stop-color="#9ca3af"/>
        <stop offset="60%" stop-color="#b0c4a8"/>
        <stop offset="100%" stop-color="#86efac"/>
    </linearGradient>
    <linearGradient id="mv8_volcano" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#dc2626"/>
        <stop offset="40%" stop-color="#57534e"/>
        <stop offset="100%" stop-color="#44403c"/>
    </linearGradient>
    <radialGradient id="mv8_mist" cx="50%" cy="80%" r="50%">
        <stop offset="0%" stop-color="#d1fae5" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#mv8_sky)"/>
<!-- Mist overlay -->
<rect width="800" height="400" fill="url(#mv8_mist)"/>
<!-- Misty clouds -->
<ellipse cx="200" cy="50" rx="120" ry="30" fill="#d1d5db" opacity="0.4"/>
<ellipse cx="500" cy="40" rx="100" ry="25" fill="#d1d5db" opacity="0.35"/>
<ellipse cx="700" cy="60" rx="80" ry="20" fill="#d1d5db" opacity="0.3"/>
<!-- Volcano background -->
<polygon points="600,250 700,50 800,250" fill="url(#mv8_volcano)"/>
<polygon points="620,250 700,70 780,250" fill="#57534e"/>
<!-- Lava glow -->
<ellipse cx="700" cy="55" rx="15" ry="8" fill="#dc2626" opacity="0.6"/>
<ellipse cx="700" cy="55" rx="10" ry="5" fill="#fbbf24" opacity="0.4"/>
<!-- Smoke from volcano -->
<ellipse cx="700" cy="35" rx="25" ry="15" fill="#6b7280" opacity="0.4"/>
<ellipse cx="690" cy="20" rx="20" ry="12" fill="#6b7280" opacity="0.3"/>
<ellipse cx="710" cy="10" rx="15" ry="10" fill="#6b7280" opacity="0.2"/>
<!-- Lush ground -->
<rect x="0" y="280" width="800" height="120" fill="#16a34a"/>
<rect x="0" y="310" width="800" height="90" fill="#15803d"/>
<!-- Ferns on ground -->
<path d="M 100,280 L 90,265 L 95,270 L 100,260 L 105,270 L 110,265 L 100,280" fill="#22c55e"/>
<path d="M 300,280 L 290,268 L 295,272 L 300,262 L 305,272 L 310,268 L 300,280" fill="#22c55e"/>
<path d="M 550,280 L 540,268 L 545,272 L 550,263 L 555,272 L 560,268 L 550,280" fill="#22c55e"/>
<!-- Palm tree left -->
<rect x="97" y="180" width="8" height="100" fill="#78350f"/>
<path d="M 100,185 Q 50,160 30,180" stroke="#16a34a" stroke-width="6" fill="none"/>
<path d="M 100,180 Q 60,140 40,150" stroke="#15803d" stroke-width="5" fill="none"/>
<path d="M 100,185 Q 140,150 170,165" stroke="#16a34a" stroke-width="6" fill="none"/>
<path d="M 100,180 Q 150,140 165,145" stroke="#15803d" stroke-width="5" fill="none"/>
<path d="M 100,178 Q 90,130 80,135" stroke="#22c55e" stroke-width="4" fill="none"/>
<!-- Palm tree center -->
<rect x="397" y="160" width="8" height="120" fill="#78350f"/>
<path d="M 400,165 Q 350,135 330,150" stroke="#16a34a" stroke-width="6" fill="none"/>
<path d="M 400,160 Q 360,120 340,130" stroke="#15803d" stroke-width="5" fill="none"/>
<path d="M 400,165 Q 450,130 470,145" stroke="#16a34a" stroke-width="6" fill="none"/>
<path d="M 400,160 Q 440,120 460,125" stroke="#15803d" stroke-width="5" fill="none"/>
<!-- Palm tree right -->
<rect x="547" y="200" width="7" height="80" fill="#78350f"/>
<path d="M 550,205 Q 510,180 500,190" stroke="#16a34a" stroke-width="5" fill="none"/>
<path d="M 550,200 Q 520,165 510,170" stroke="#15803d" stroke-width="4" fill="none"/>
<path d="M 550,205 Q 580,175 600,185" stroke="#16a34a" stroke-width="5" fill="none"/>
<!-- Dinosaur footprints -->
<ellipse cx="200" cy="320" rx="8" ry="12" fill="#0f5132" opacity="0.4"/>
<circle cx="195" cy="306" r="3" fill="#0f5132" opacity="0.3"/>
<circle cx="205" cy="306" r="3" fill="#0f5132" opacity="0.3"/>
<circle cx="200" cy="303" r="2.5" fill="#0f5132" opacity="0.3"/>
<ellipse cx="250" cy="340" rx="8" ry="12" fill="#0f5132" opacity="0.4"/>
<circle cx="245" cy="326" r="3" fill="#0f5132" opacity="0.3"/>
<circle cx="255" cy="326" r="3" fill="#0f5132" opacity="0.3"/>
<circle cx="250" cy="323" r="2.5" fill="#0f5132" opacity="0.3"/>
<ellipse cx="310" cy="325" rx="8" ry="12" fill="#0f5132" opacity="0.35"/>
<circle cx="305" cy="311" r="3" fill="#0f5132" opacity="0.25"/>
<circle cx="315" cy="311" r="3" fill="#0f5132" opacity="0.25"/>
<!-- Small pond -->
<ellipse cx="450" cy="340" rx="40" ry="15" fill="#0ea5e9" opacity="0.4"/>
<ellipse cx="450" cy="338" rx="35" ry="12" fill="#38bdf8" opacity="0.3"/>
<!-- Mist layers -->
<ellipse cx="300" cy="270" rx="200" ry="15" fill="#d1fae5" opacity="0.2"/>
<ellipse cx="600" cy="275" rx="150" ry="12" fill="#d1fae5" opacity="0.15"/>
</svg>`,

// ── MAP 9: Underwater Lab (mv_underwater) ──
mv_underwater: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv9_water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0c4a6e"/>
        <stop offset="40%" stop-color="#075985"/>
        <stop offset="70%" stop-color="#0369a1"/>
        <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <radialGradient id="mv9_dome" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#bfdbfe" stop-opacity="0.15"/>
        <stop offset="80%" stop-color="#93c5fd" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.05"/>
    </radialGradient>
    <radialGradient id="mv9_light" cx="50%" cy="0%" r="60%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#mv9_water)"/>
<!-- Light rays from surface -->
<rect width="800" height="400" fill="url(#mv9_light)"/>
<polygon points="300,0 280,200 320,200" fill="#38bdf8" opacity="0.05"/>
<polygon points="500,0 480,250 520,250" fill="#38bdf8" opacity="0.04"/>
<polygon points="150,0 135,180 165,180" fill="#38bdf8" opacity="0.03"/>
<!-- Ocean floor -->
<path d="M 0,340 Q 100,320 200,335 Q 300,350 400,330 Q 500,345 600,335 Q 700,320 800,340 L 800,400 L 0,400 Z" fill="#1e3a5f"/>
<path d="M 0,360 Q 100,345 200,355 Q 300,365 400,350 Q 500,360 600,350 Q 700,340 800,355 L 800,400 L 0,400 Z" fill="#172554"/>
<!-- Sand patches -->
<ellipse cx="200" cy="370" rx="50" ry="8" fill="#d97706" opacity="0.2"/>
<ellipse cx="600" cy="375" rx="40" ry="6" fill="#d97706" opacity="0.15"/>
<!-- Glass dome lab -->
<ellipse cx="400" cy="260" rx="150" ry="100" fill="url(#mv9_dome)" stroke="#93c5fd" stroke-width="2" opacity="0.8"/>
<!-- Dome ribs -->
<path d="M 250,260 Q 400,160 550,260" stroke="#93c5fd" stroke-width="1" fill="none" opacity="0.4"/>
<path d="M 280,290 Q 400,170 520,290" stroke="#93c5fd" stroke-width="1" fill="none" opacity="0.3"/>
<line x1="400" y1="160" x2="400" y2="340" stroke="#93c5fd" stroke-width="1" opacity="0.3"/>
<line x1="330" y1="170" x2="300" y2="340" stroke="#93c5fd" stroke-width="0.5" opacity="0.2"/>
<line x1="470" y1="170" x2="500" y2="340" stroke="#93c5fd" stroke-width="0.5" opacity="0.2"/>
<!-- Lab structure inside dome -->
<rect x="340" y="240" width="120" height="60" fill="#1e40af" opacity="0.4" rx="3"/>
<rect x="355" y="250" width="25" height="20" fill="#fbbf24" opacity="0.3"/>
<rect x="395" y="250" width="25" height="20" fill="#fbbf24" opacity="0.25"/>
<rect x="435" y="250" width="15" height="40" fill="#1e3a5f" opacity="0.5" rx="2"/>
<!-- Lab base -->
<rect x="310" y="300" width="180" height="15" fill="#1e40af" opacity="0.3" rx="2"/>
<!-- Bubbles -->
<circle cx="120" cy="100" r="5" fill="none" stroke="#bfdbfe" stroke-width="1" opacity="0.4"/>
<circle cx="130" cy="150" r="3" fill="none" stroke="#bfdbfe" stroke-width="1" opacity="0.3"/>
<circle cx="115" cy="200" r="4" fill="none" stroke="#bfdbfe" stroke-width="1" opacity="0.35"/>
<circle cx="680" cy="80" r="4" fill="none" stroke="#bfdbfe" stroke-width="1" opacity="0.35"/>
<circle cx="690" cy="130" r="6" fill="none" stroke="#bfdbfe" stroke-width="1" opacity="0.4"/>
<circle cx="675" cy="180" r="3" fill="none" stroke="#bfdbfe" stroke-width="1" opacity="0.3"/>
<circle cx="350" cy="140" r="3" fill="none" stroke="#bfdbfe" stroke-width="1" opacity="0.25"/>
<circle cx="460" cy="120" r="4" fill="none" stroke="#bfdbfe" stroke-width="1" opacity="0.3"/>
<circle cx="300" cy="100" r="2" fill="none" stroke="#bfdbfe" stroke-width="1" opacity="0.2"/>
<!-- Coral left -->
<path d="M 60,340 Q 55,310 50,290 Q 45,310 40,340" fill="#f43f5e" opacity="0.6"/>
<path d="M 80,340 Q 78,315 75,300 Q 72,315 70,340" fill="#fb7185" opacity="0.5"/>
<path d="M 95,340 Q 90,320 88,310 Q 86,320 82,340" fill="#f43f5e" opacity="0.4"/>
<!-- Branch coral -->
<path d="M 55,300 Q 40,285 35,270" stroke="#f97316" stroke-width="3" fill="none" opacity="0.5"/>
<path d="M 55,300 Q 65,280 70,265" stroke="#f97316" stroke-width="3" fill="none" opacity="0.4"/>
<!-- Coral right -->
<path d="M 700,340 Q 698,315 695,300 Q 692,315 690,340" fill="#a855f7" opacity="0.5"/>
<path d="M 720,340 Q 715,310 710,295 Q 708,310 705,340" fill="#c084fc" opacity="0.4"/>
<path d="M 740,340 Q 738,320 735,310 Q 732,320 728,340" fill="#a855f7" opacity="0.45"/>
<!-- Fish -->
<ellipse cx="150" cy="250" rx="12" ry="6" fill="#fb923c" opacity="0.6"/>
<polygon points="162,250 172,244 172,256" fill="#fb923c" opacity="0.6"/>
<circle cx="144" cy="248" r="1.5" fill="#0a0a0a"/>
<ellipse cx="650" cy="200" rx="10" ry="5" fill="#38bdf8" opacity="0.5"/>
<polygon points="660,200 668,195 668,205" fill="#38bdf8" opacity="0.5"/>
<circle cx="644" cy="198" r="1.2" fill="#0a0a0a"/>
<!-- Small fish school -->
<ellipse cx="500" cy="100" rx="5" ry="3" fill="#fbbf24" opacity="0.3"/>
<ellipse cx="515" cy="95" rx="5" ry="3" fill="#fbbf24" opacity="0.3"/>
<ellipse cx="510" cy="108" rx="5" ry="3" fill="#fbbf24" opacity="0.3"/>
<ellipse cx="525" cy="102" rx="5" ry="3" fill="#fbbf24" opacity="0.25"/>
<!-- Seaweed -->
<path d="M 250,340 Q 245,310 250,280 Q 255,310 250,340" stroke="#16a34a" stroke-width="4" fill="none" opacity="0.5"/>
<path d="M 260,340 Q 255,315 260,290 Q 265,315 260,340" stroke="#22c55e" stroke-width="3" fill="none" opacity="0.4"/>
<path d="M 560,340 Q 555,315 560,290 Q 565,315 560,340" stroke="#16a34a" stroke-width="4" fill="none" opacity="0.45"/>
</svg>`,

// ── MAP 10: Cyber City (mv_cyber_city) ──
mv_cyber_city: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv10_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a"/>
        <stop offset="50%" stop-color="#18181b"/>
        <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="mv10_neon_pink" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ec4899"/>
        <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>
    <linearGradient id="mv10_neon_cyan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#22d3ee"/>
        <stop offset="100%" stop-color="#0891b2"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#mv10_sky)"/>
<!-- Rain -->
<line x1="50" y1="0" x2="45" y2="30" stroke="#60a5fa" stroke-width="0.5" opacity="0.3"/>
<line x1="120" y1="10" x2="115" y2="50" stroke="#60a5fa" stroke-width="0.5" opacity="0.25"/>
<line x1="200" y1="5" x2="195" y2="40" stroke="#60a5fa" stroke-width="0.5" opacity="0.3"/>
<line x1="300" y1="15" x2="295" y2="55" stroke="#60a5fa" stroke-width="0.5" opacity="0.2"/>
<line x1="400" y1="0" x2="395" y2="35" stroke="#60a5fa" stroke-width="0.5" opacity="0.3"/>
<line x1="480" y1="8" x2="475" y2="45" stroke="#60a5fa" stroke-width="0.5" opacity="0.25"/>
<line x1="560" y1="12" x2="555" y2="50" stroke="#60a5fa" stroke-width="0.5" opacity="0.3"/>
<line x1="650" y1="3" x2="645" y2="38" stroke="#60a5fa" stroke-width="0.5" opacity="0.2"/>
<line x1="730" y1="18" x2="725" y2="55" stroke="#60a5fa" stroke-width="0.5" opacity="0.3"/>
<line x1="80" y1="60" x2="75" y2="95" stroke="#60a5fa" stroke-width="0.5" opacity="0.2"/>
<line x1="350" y1="70" x2="345" y2="108" stroke="#60a5fa" stroke-width="0.5" opacity="0.25"/>
<line x1="600" y1="55" x2="595" y2="90" stroke="#60a5fa" stroke-width="0.5" opacity="0.2"/>
<!-- Wet ground -->
<rect x="0" y="300" width="800" height="100" fill="#18181b"/>
<rect x="0" y="310" width="800" height="90" fill="#0f0f11"/>
<!-- Neon reflections on ground -->
<rect x="100" y="320" width="80" height="3" fill="#ec4899" opacity="0.15"/>
<rect x="350" y="325" width="100" height="3" fill="#22d3ee" opacity="0.12"/>
<rect x="600" y="318" width="70" height="3" fill="#ec4899" opacity="0.1"/>
<!-- Skyscraper 1 (far left) -->
<rect x="20" y="80" width="80" height="220" fill="#1f2937"/>
<rect x="20" y="80" width="80" height="5" fill="#22d3ee" opacity="0.6"/>
<!-- Windows -->
<rect x="30" y="95" width="10" height="8" fill="#22d3ee" opacity="0.3"/>
<rect x="50" y="95" width="10" height="8" fill="#ec4899" opacity="0.2"/>
<rect x="70" y="95" width="10" height="8" fill="#22d3ee" opacity="0.25"/>
<rect x="30" y="115" width="10" height="8" fill="#ec4899" opacity="0.15"/>
<rect x="50" y="115" width="10" height="8" fill="#22d3ee" opacity="0.3"/>
<rect x="70" y="115" width="10" height="8" fill="#ec4899" opacity="0.2"/>
<rect x="30" y="135" width="10" height="8" fill="#22d3ee" opacity="0.2"/>
<rect x="50" y="135" width="10" height="8" fill="#ec4899" opacity="0.25"/>
<rect x="70" y="135" width="10" height="8" fill="#22d3ee" opacity="0.15"/>
<!-- Skyscraper 2 -->
<rect x="120" y="50" width="100" height="250" fill="#1f2937"/>
<rect x="120" y="50" width="100" height="5" fill="#ec4899" opacity="0.5"/>
<!-- Neon sign on building 2 -->
<rect x="130" y="120" width="80" height="25" fill="#18181b" stroke="#ec4899" stroke-width="1.5"/>
<text x="142" y="138" fill="#ec4899" font-size="11" font-family="monospace" opacity="0.9">NEON</text>
<!-- Windows -->
<rect x="130" y="65" width="8" height="8" fill="#22d3ee" opacity="0.2"/>
<rect x="150" y="65" width="8" height="8" fill="#22d3ee" opacity="0.3"/>
<rect x="170" y="65" width="8" height="8" fill="#ec4899" opacity="0.15"/>
<rect x="190" y="65" width="8" height="8" fill="#22d3ee" opacity="0.25"/>
<rect x="130" y="160" width="8" height="8" fill="#ec4899" opacity="0.2"/>
<rect x="150" y="160" width="8" height="8" fill="#22d3ee" opacity="0.15"/>
<rect x="170" y="160" width="8" height="8" fill="#22d3ee" opacity="0.3"/>
<rect x="190" y="160" width="8" height="8" fill="#ec4899" opacity="0.2"/>
<!-- Skyscraper 3 (center tall) -->
<rect x="300" y="30" width="120" height="270" fill="#1f2937"/>
<rect x="300" y="30" width="120" height="5" fill="#22d3ee" opacity="0.6"/>
<!-- Neon sign -->
<rect x="310" y="80" width="100" height="30" fill="#18181b" stroke="#22d3ee" stroke-width="1.5"/>
<text x="318" y="100" fill="#22d3ee" font-size="12" font-family="monospace" opacity="0.9">CYBER</text>
<!-- Vertical neon stripe -->
<rect x="418" y="35" width="2" height="265" fill="#ec4899" opacity="0.4"/>
<!-- Windows -->
<rect x="310" y="45" width="8" height="8" fill="#ec4899" opacity="0.2"/>
<rect x="330" y="45" width="8" height="8" fill="#22d3ee" opacity="0.3"/>
<rect x="350" y="45" width="8" height="8" fill="#22d3ee" opacity="0.15"/>
<rect x="370" y="45" width="8" height="8" fill="#ec4899" opacity="0.25"/>
<rect x="390" y="45" width="8" height="8" fill="#22d3ee" opacity="0.2"/>
<rect x="310" y="130" width="8" height="8" fill="#22d3ee" opacity="0.25"/>
<rect x="330" y="130" width="8" height="8" fill="#ec4899" opacity="0.2"/>
<rect x="350" y="130" width="8" height="8" fill="#22d3ee" opacity="0.3"/>
<rect x="370" y="130" width="8" height="8" fill="#ec4899" opacity="0.15"/>
<rect x="390" y="130" width="8" height="8" fill="#22d3ee" opacity="0.2"/>
<!-- Skyscraper 4 -->
<rect x="480" y="60" width="90" height="240" fill="#1f2937"/>
<rect x="480" y="60" width="90" height="5" fill="#ec4899" opacity="0.5"/>
<rect x="490" y="75" width="8" height="8" fill="#22d3ee" opacity="0.2"/>
<rect x="510" y="75" width="8" height="8" fill="#ec4899" opacity="0.25"/>
<rect x="530" y="75" width="8" height="8" fill="#22d3ee" opacity="0.3"/>
<rect x="550" y="75" width="8" height="8" fill="#ec4899" opacity="0.15"/>
<!-- Neon sign -->
<rect x="485" y="150" width="80" height="20" fill="#18181b" stroke="#ec4899" stroke-width="1"/>
<text x="498" y="164" fill="#ec4899" font-size="9" font-family="monospace" opacity="0.8">テクノ</text>
<!-- Skyscraper 5 (far right) -->
<rect x="620" y="70" width="80" height="230" fill="#1f2937"/>
<rect x="620" y="70" width="80" height="5" fill="#22d3ee" opacity="0.5"/>
<rect x="630" y="85" width="8" height="8" fill="#ec4899" opacity="0.2"/>
<rect x="650" y="85" width="8" height="8" fill="#22d3ee" opacity="0.25"/>
<rect x="670" y="85" width="8" height="8" fill="#ec4899" opacity="0.3"/>
<!-- Small far building -->
<rect x="720" y="120" width="70" height="180" fill="#1f2937"/>
<rect x="720" y="120" width="70" height="4" fill="#ec4899" opacity="0.4"/>
<!-- Street-level neon -->
<rect x="240" y="280" width="3" height="20" fill="#22d3ee" opacity="0.6"/>
<rect x="560" y="278" width="3" height="22" fill="#ec4899" opacity="0.5"/>
<!-- Ground neon lines -->
<line x1="0" y1="300" x2="800" y2="300" stroke="#22d3ee" stroke-width="1" opacity="0.3"/>
<line x1="0" y1="305" x2="800" y2="305" stroke="#ec4899" stroke-width="0.5" opacity="0.2"/>
</svg>`,

// ── MAP 11: Void Space (mv_void_space) ──
mv_void_space: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv11_space" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#030712"/>
        <stop offset="30%" stop-color="#0f0a2e"/>
        <stop offset="60%" stop-color="#1e1b4b"/>
        <stop offset="100%" stop-color="#0c0a20"/>
    </linearGradient>
    <radialGradient id="mv11_nebula1" cx="30%" cy="40%" r="35%">
        <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.25"/>
        <stop offset="50%" stop-color="#6d28d9" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="mv11_nebula2" cx="70%" cy="50%" r="30%">
        <stop offset="0%" stop-color="#2563eb" stop-opacity="0.2"/>
        <stop offset="50%" stop-color="#1d4ed8" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="mv11_nebula3" cx="50%" cy="30%" r="25%">
        <stop offset="0%" stop-color="#ec4899" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#mv11_space)"/>
<!-- Nebula layers -->
<rect width="800" height="400" fill="url(#mv11_nebula1)"/>
<rect width="800" height="400" fill="url(#mv11_nebula2)"/>
<rect width="800" height="400" fill="url(#mv11_nebula3)"/>
<!-- Stars field -->
<circle cx="30" cy="20" r="1" fill="#fff" opacity="0.8"/>
<circle cx="80" cy="60" r="0.8" fill="#e0e7ff" opacity="0.6"/>
<circle cx="150" cy="30" r="1.2" fill="#fff" opacity="0.9"/>
<circle cx="200" cy="80" r="0.6" fill="#c4b5fd" opacity="0.5"/>
<circle cx="250" cy="15" r="1" fill="#fff" opacity="0.7"/>
<circle cx="320" cy="50" r="0.8" fill="#e0e7ff" opacity="0.6"/>
<circle cx="380" cy="25" r="1.5" fill="#fff" opacity="0.9"/>
<circle cx="450" cy="70" r="0.6" fill="#c4b5fd" opacity="0.4"/>
<circle cx="520" cy="20" r="1" fill="#fff" opacity="0.8"/>
<circle cx="580" cy="55" r="0.8" fill="#e0e7ff" opacity="0.6"/>
<circle cx="640" cy="35" r="1.2" fill="#fff" opacity="0.7"/>
<circle cx="710" cy="15" r="0.8" fill="#fff" opacity="0.8"/>
<circle cx="760" cy="45" r="1" fill="#c4b5fd" opacity="0.5"/>
<circle cx="60" cy="120" r="0.6" fill="#fff" opacity="0.5"/>
<circle cx="130" cy="150" r="1" fill="#e0e7ff" opacity="0.6"/>
<circle cx="270" cy="130" r="0.8" fill="#fff" opacity="0.7"/>
<circle cx="400" cy="120" r="0.6" fill="#c4b5fd" opacity="0.4"/>
<circle cx="550" cy="140" r="1" fill="#fff" opacity="0.6"/>
<circle cx="680" cy="110" r="0.8" fill="#e0e7ff" opacity="0.5"/>
<circle cx="100" cy="250" r="1" fill="#fff" opacity="0.6"/>
<circle cx="350" cy="280" r="0.8" fill="#e0e7ff" opacity="0.5"/>
<circle cx="500" cy="300" r="0.6" fill="#fff" opacity="0.4"/>
<circle cx="650" cy="270" r="1" fill="#c4b5fd" opacity="0.5"/>
<circle cx="750" cy="320" r="0.8" fill="#fff" opacity="0.6"/>
<circle cx="200" cy="350" r="0.6" fill="#e0e7ff" opacity="0.4"/>
<circle cx="450" cy="370" r="1" fill="#fff" opacity="0.5"/>
<!-- Bright star -->
<circle cx="380" cy="25" r="2" fill="#fff" opacity="0.3"/>
<!-- Asteroids -->
<ellipse cx="150" cy="200" rx="20" ry="14" fill="#44403c" transform="rotate(-15, 150, 200)"/>
<ellipse cx="150" cy="200" rx="18" ry="12" fill="#57534e" transform="rotate(-15, 150, 200)"/>
<circle cx="145" cy="196" r="3" fill="#44403c"/>
<circle cx="158" cy="203" r="2" fill="#3f3f46"/>
<ellipse cx="650" cy="280" rx="25" ry="18" fill="#44403c" transform="rotate(20, 650, 280)"/>
<ellipse cx="650" cy="280" rx="22" ry="15" fill="#57534e" transform="rotate(20, 650, 280)"/>
<circle cx="642" cy="275" r="4" fill="#44403c"/>
<circle cx="660" cy="285" r="3" fill="#3f3f46"/>
<!-- Small asteroids -->
<ellipse cx="350" cy="320" rx="10" ry="7" fill="#57534e" transform="rotate(-25, 350, 320)"/>
<ellipse cx="550" cy="180" rx="8" ry="5" fill="#57534e" transform="rotate(10, 550, 180)"/>
<ellipse cx="80" cy="340" rx="12" ry="8" fill="#44403c" transform="rotate(30, 80, 340)"/>
<!-- Warship silhouette 1 -->
<polygon points="250,170 310,160 340,165 340,175 310,180 250,170" fill="#1c1917"/>
<rect x="310" y="163" width="15" height="4" fill="#1c1917"/>
<rect x="270" y="167" width="5" height="6" fill="#1c1917"/>
<!-- Engine glow -->
<ellipse cx="250" cy="170" rx="4" ry="3" fill="#3b82f6" opacity="0.5"/>
<!-- Warship silhouette 2 (larger) -->
<polygon points="480,230 570,215 620,222 620,238 570,245 480,230" fill="#1c1917"/>
<rect x="560" y="220" width="30" height="6" fill="#1c1917"/>
<rect x="580" y="218" width="15" height="10" fill="#1c1917"/>
<rect x="500" y="226" width="8" height="8" fill="#1c1917"/>
<!-- Engine glow -->
<ellipse cx="480" cy="230" rx="5" ry="4" fill="#3b82f6" opacity="0.4"/>
<ellipse cx="480" cy="230" rx="3" ry="2" fill="#60a5fa" opacity="0.6"/>
<!-- Warship 3 (distant) -->
<polygon points="700,140 730,136 740,138 740,142 730,144 700,140" fill="#1c1917" opacity="0.6"/>
<ellipse cx="700" cy="140" rx="2" ry="1.5" fill="#3b82f6" opacity="0.3"/>
<!-- Distant planet -->
<circle cx="720" cy="80" r="20" fill="#1e3a8a" opacity="0.4"/>
<path d="M 700,80 A 20,20 0 0,1 720,60" fill="#2563eb" opacity="0.3"/>
</svg>`,

// ── MAP 12: Final Rift (mv_final_rift) ──
mv_final_rift: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="mv12_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e1b4b"/>
        <stop offset="30%" stop-color="#2d1b69"/>
        <stop offset="50%" stop-color="#3b0764"/>
        <stop offset="70%" stop-color="#4a044e"/>
        <stop offset="100%" stop-color="#0c0a20"/>
    </linearGradient>
    <radialGradient id="mv12_rift" cx="50%" cy="50%" r="25%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
        <stop offset="20%" stop-color="#f0f0ff" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="#c4b5fd" stop-opacity="0.6"/>
        <stop offset="60%" stop-color="#7c3aed" stop-opacity="0.3"/>
        <stop offset="80%" stop-color="#4c1d95" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="mv12_energy" cx="50%" cy="50%" r="40%">
        <stop offset="0%" stop-color="#e0e7ff" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <linearGradient id="mv12_frag1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#60a5fa"/>
        <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="mv12_frag2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f97316"/>
        <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <linearGradient id="mv12_frag3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#22c55e"/>
        <stop offset="100%" stop-color="#16a34a"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#mv12_sky)"/>
<!-- Energy field -->
<rect width="800" height="400" fill="url(#mv12_energy)"/>
<!-- Central rift/portal -->
<ellipse cx="400" cy="200" rx="120" ry="120" fill="url(#mv12_rift)"/>
<!-- Rift inner glow rings -->
<ellipse cx="400" cy="200" rx="80" ry="80" fill="none" stroke="#e0e7ff" stroke-width="2" opacity="0.5"/>
<ellipse cx="400" cy="200" rx="55" ry="55" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.6"/>
<ellipse cx="400" cy="200" rx="30" ry="30" fill="none" stroke="#fff" stroke-width="1" opacity="0.8"/>
<!-- Core white light -->
<circle cx="400" cy="200" r="15" fill="#fff" opacity="0.9"/>
<circle cx="400" cy="200" r="8" fill="#fff"/>
<!-- Energy rays from rift -->
<line x1="400" y1="200" x2="150" y2="50" stroke="#c4b5fd" stroke-width="2" opacity="0.3"/>
<line x1="400" y1="200" x2="650" y2="30" stroke="#c4b5fd" stroke-width="2" opacity="0.25"/>
<line x1="400" y1="200" x2="100" y2="300" stroke="#a78bfa" stroke-width="1.5" opacity="0.2"/>
<line x1="400" y1="200" x2="700" y2="350" stroke="#a78bfa" stroke-width="1.5" opacity="0.2"/>
<line x1="400" y1="200" x2="50" y2="180" stroke="#c4b5fd" stroke-width="1" opacity="0.15"/>
<line x1="400" y1="200" x2="780" y2="150" stroke="#c4b5fd" stroke-width="1" opacity="0.15"/>
<line x1="400" y1="200" x2="300" y2="380" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
<line x1="400" y1="200" x2="550" y2="10" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
<!-- Reality fragment 1 (blue/tech dimension) -->
<polygon points="80,80 140,60 160,100 130,130 70,120" fill="url(#mv12_frag1)" opacity="0.5" stroke="#93c5fd" stroke-width="1"/>
<!-- Mini buildings on fragment -->
<rect x="95" y="85" width="15" height="25" fill="#1e40af" opacity="0.6"/>
<rect x="115" y="80" width="10" height="30" fill="#1e40af" opacity="0.5"/>
<!-- Reality fragment 2 (red/fire dimension) -->
<polygon points="650,70 720,50 740,90 710,130 640,110" fill="url(#mv12_frag2)" opacity="0.5" stroke="#fca5a5" stroke-width="1"/>
<polygon points="670,85 690,78 700,95 680,100" fill="#dc2626" opacity="0.4"/>
<!-- Reality fragment 3 (green/nature dimension) -->
<polygon points="100,280 160,260 180,310 140,340 80,320" fill="url(#mv12_frag3)" opacity="0.5" stroke="#86efac" stroke-width="1"/>
<!-- Tree on fragment -->
<rect x="128" y="285" width="5" height="20" fill="#78350f" opacity="0.5"/>
<polygon points="118,290 130,270 142,290" fill="#16a34a" opacity="0.5"/>
<!-- Reality fragment 4 (purple/void) -->
<polygon points="660,280 710,265 730,300 700,330 650,315" fill="#7c3aed" opacity="0.4" stroke="#c4b5fd" stroke-width="1"/>
<circle cx="685" cy="295" r="8" fill="#a855f7" opacity="0.3"/>
<!-- Reality fragment 5 (small, golden) -->
<polygon points="250,30 280,20 290,45 270,55 245,50" fill="#fbbf24" opacity="0.4" stroke="#fde68a" stroke-width="1"/>
<!-- Reality fragment 6 (small, cyan) -->
<polygon points="530,340 560,330 570,360 550,370 525,358" fill="#22d3ee" opacity="0.4" stroke="#a5f3fc" stroke-width="1"/>
<!-- Floating debris/particles -->
<rect x="200" y="150" width="6" height="6" fill="#c4b5fd" opacity="0.4" transform="rotate(30, 203, 153)"/>
<rect x="580" y="160" width="5" height="5" fill="#a78bfa" opacity="0.35" transform="rotate(45, 582, 162)"/>
<rect x="300" y="300" width="4" height="4" fill="#c4b5fd" opacity="0.3" transform="rotate(20, 302, 302)"/>
<rect x="500" y="100" width="7" height="7" fill="#a78bfa" opacity="0.25" transform="rotate(60, 503, 103)"/>
<rect x="180" y="220" width="5" height="5" fill="#e0e7ff" opacity="0.3" transform="rotate(15, 182, 222)"/>
<rect x="620" y="220" width="4" height="4" fill="#e0e7ff" opacity="0.25" transform="rotate(40, 622, 222)"/>
<!-- Cracks in reality -->
<path d="M 280,120 L 310,140 L 295,160 L 320,185" stroke="#c4b5fd" stroke-width="1.5" fill="none" opacity="0.4"/>
<path d="M 520,110 L 500,135 L 515,155 L 490,180" stroke="#c4b5fd" stroke-width="1.5" fill="none" opacity="0.35"/>
<path d="M 250,250 L 275,270 L 260,290" stroke="#a78bfa" stroke-width="1" fill="none" opacity="0.3"/>
<path d="M 550,260 L 530,280 L 545,300" stroke="#a78bfa" stroke-width="1" fill="none" opacity="0.25"/>
<!-- Stars -->
<circle cx="50" cy="30" r="1" fill="#fff" opacity="0.6"/>
<circle cx="180" cy="50" r="0.8" fill="#e0e7ff" opacity="0.5"/>
<circle cx="350" cy="20" r="1" fill="#fff" opacity="0.7"/>
<circle cx="500" cy="40" r="0.8" fill="#c4b5fd" opacity="0.4"/>
<circle cx="750" cy="25" r="1.2" fill="#fff" opacity="0.6"/>
<circle cx="30" cy="180" r="0.8" fill="#e0e7ff" opacity="0.4"/>
<circle cx="770" cy="200" r="1" fill="#fff" opacity="0.5"/>
<circle cx="50" cy="350" r="0.8" fill="#e0e7ff" opacity="0.4"/>
<circle cx="750" cy="370" r="1" fill="#fff" opacity="0.5"/>
<!-- Distortion waves around rift -->
<ellipse cx="400" cy="200" rx="140" ry="140" fill="none" stroke="#7c3aed" stroke-width="0.8" opacity="0.2" stroke-dasharray="8,4"/>
<ellipse cx="400" cy="200" rx="160" ry="160" fill="none" stroke="#6d28d9" stroke-width="0.5" opacity="0.15" stroke-dasharray="12,6"/>
</svg>`

};

if (typeof vectors !== 'undefined') Object.assign(vectors, multiverseMaps);
