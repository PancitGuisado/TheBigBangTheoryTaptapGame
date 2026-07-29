// ============================================================
// GENESIS PROTOCOL MAPS — Endgame backgrounds for Genesis arc
// Epic, grand, otherworldly locations
// ============================================================

const genesisMaps = {

// ── MAP 1: Secret Lodge (Underground Illuminati Temple) ──
gen_secret_lodge: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="gn1bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a"/>
        <stop offset="100%" stop-color="#1a1008"/>
    </linearGradient>
    <radialGradient id="gn1glow" cx="0.5" cy="0.45" r="0.35">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gn1torch" cx="0.5" cy="0.3" r="0.5">
        <stop offset="0%" stop-color="#f97316" stop-opacity="0.9"/>
        <stop offset="60%" stop-color="#f97316" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#gn1bg)"/>
<!-- Ambient glow from pyramid -->
<rect width="800" height="400" fill="url(#gn1glow)"/>
<!-- Stone ceiling -->
<rect x="0" y="0" width="800" height="40" fill="#1c1917" opacity="0.9"/>
<rect x="0" y="40" width="800" height="8" fill="#292524"/>
<!-- Stone walls left -->
<rect x="0" y="0" width="60" height="400" fill="#292524"/>
<rect x="60" y="0" width="8" height="400" fill="#1c1917"/>
<!-- Stone walls right -->
<rect x="740" y="0" width="60" height="400" fill="#292524"/>
<rect x="732" y="0" width="8" height="400" fill="#1c1917"/>
<!-- Wall stone block lines -->
<line x1="0" y1="80" x2="68" y2="80" stroke="#1c1917" stroke-width="1" opacity="0.5"/>
<line x1="0" y1="140" x2="68" y2="140" stroke="#1c1917" stroke-width="1" opacity="0.5"/>
<line x1="0" y1="200" x2="68" y2="200" stroke="#1c1917" stroke-width="1" opacity="0.5"/>
<line x1="0" y1="260" x2="68" y2="260" stroke="#1c1917" stroke-width="1" opacity="0.5"/>
<line x1="732" y1="100" x2="800" y2="100" stroke="#1c1917" stroke-width="1" opacity="0.5"/>
<line x1="732" y1="160" x2="800" y2="160" stroke="#1c1917" stroke-width="1" opacity="0.5"/>
<line x1="732" y1="220" x2="800" y2="220" stroke="#1c1917" stroke-width="1" opacity="0.5"/>
<line x1="732" y1="280" x2="800" y2="280" stroke="#1c1917" stroke-width="1" opacity="0.5"/>
<!-- Ancient symbols on walls -->
<text x="25" y="120" fill="#78716c" font-size="18" text-anchor="middle" opacity="0.4">⊕</text>
<text x="30" y="180" fill="#78716c" font-size="14" text-anchor="middle" opacity="0.3">☽</text>
<text x="25" y="240" fill="#78716c" font-size="16" text-anchor="middle" opacity="0.4">⊗</text>
<text x="770" y="130" fill="#78716c" font-size="16" text-anchor="middle" opacity="0.4">☉</text>
<text x="765" y="200" fill="#78716c" font-size="18" text-anchor="middle" opacity="0.3">△</text>
<text x="770" y="270" fill="#78716c" font-size="14" text-anchor="middle" opacity="0.4">⊙</text>
<!-- Checkered floor -->
<g opacity="0.8">
    <rect x="68" y="300" width="40" height="25" fill="#44403c"/>
    <rect x="108" y="300" width="40" height="25" fill="#1c1917"/>
    <rect x="148" y="300" width="40" height="25" fill="#44403c"/>
    <rect x="188" y="300" width="40" height="25" fill="#1c1917"/>
    <rect x="228" y="300" width="40" height="25" fill="#44403c"/>
    <rect x="268" y="300" width="40" height="25" fill="#1c1917"/>
    <rect x="308" y="300" width="40" height="25" fill="#44403c"/>
    <rect x="348" y="300" width="40" height="25" fill="#1c1917"/>
    <rect x="388" y="300" width="40" height="25" fill="#44403c"/>
    <rect x="428" y="300" width="40" height="25" fill="#1c1917"/>
    <rect x="468" y="300" width="40" height="25" fill="#44403c"/>
    <rect x="508" y="300" width="40" height="25" fill="#1c1917"/>
    <rect x="548" y="300" width="40" height="25" fill="#44403c"/>
    <rect x="588" y="300" width="40" height="25" fill="#1c1917"/>
    <rect x="628" y="300" width="40" height="25" fill="#44403c"/>
    <rect x="668" y="300" width="40" height="25" fill="#1c1917"/>
    <rect x="708" y="300" width="24" height="25" fill="#44403c"/>
    <!-- Row 2 inverted -->
    <rect x="68" y="325" width="40" height="25" fill="#1c1917"/>
    <rect x="108" y="325" width="40" height="25" fill="#44403c"/>
    <rect x="148" y="325" width="40" height="25" fill="#1c1917"/>
    <rect x="188" y="325" width="40" height="25" fill="#44403c"/>
    <rect x="228" y="325" width="40" height="25" fill="#1c1917"/>
    <rect x="268" y="325" width="40" height="25" fill="#44403c"/>
    <rect x="308" y="325" width="40" height="25" fill="#1c1917"/>
    <rect x="348" y="325" width="40" height="25" fill="#44403c"/>
    <rect x="388" y="325" width="40" height="25" fill="#1c1917"/>
    <rect x="428" y="325" width="40" height="25" fill="#44403c"/>
    <rect x="468" y="325" width="40" height="25" fill="#1c1917"/>
    <rect x="508" y="325" width="40" height="25" fill="#44403c"/>
    <rect x="548" y="325" width="40" height="25" fill="#1c1917"/>
    <rect x="588" y="325" width="40" height="25" fill="#44403c"/>
    <rect x="628" y="325" width="40" height="25" fill="#1c1917"/>
    <rect x="668" y="325" width="40" height="25" fill="#44403c"/>
    <rect x="708" y="325" width="24" height="25" fill="#1c1917"/>
    <!-- Row 3 -->
    <rect x="68" y="350" width="40" height="25" fill="#44403c"/>
    <rect x="108" y="350" width="40" height="25" fill="#1c1917"/>
    <rect x="148" y="350" width="40" height="25" fill="#44403c"/>
    <rect x="188" y="350" width="40" height="25" fill="#1c1917"/>
    <rect x="228" y="350" width="40" height="25" fill="#44403c"/>
    <rect x="268" y="350" width="40" height="25" fill="#1c1917"/>
    <rect x="308" y="350" width="40" height="25" fill="#44403c"/>
    <rect x="348" y="350" width="40" height="25" fill="#1c1917"/>
    <rect x="388" y="350" width="40" height="25" fill="#44403c"/>
    <rect x="428" y="350" width="40" height="25" fill="#1c1917"/>
    <rect x="468" y="350" width="40" height="25" fill="#44403c"/>
    <rect x="508" y="350" width="40" height="25" fill="#1c1917"/>
    <rect x="548" y="350" width="40" height="25" fill="#44403c"/>
    <rect x="588" y="350" width="40" height="25" fill="#1c1917"/>
    <rect x="628" y="350" width="40" height="25" fill="#44403c"/>
    <rect x="668" y="350" width="40" height="25" fill="#1c1917"/>
    <rect x="708" y="350" width="24" height="25" fill="#44403c"/>
    <!-- Row 4 -->
    <rect x="68" y="375" width="40" height="25" fill="#1c1917"/>
    <rect x="108" y="375" width="40" height="25" fill="#44403c"/>
    <rect x="148" y="375" width="40" height="25" fill="#1c1917"/>
    <rect x="188" y="375" width="40" height="25" fill="#44403c"/>
    <rect x="228" y="375" width="40" height="25" fill="#1c1917"/>
    <rect x="268" y="375" width="40" height="25" fill="#44403c"/>
    <rect x="308" y="375" width="40" height="25" fill="#1c1917"/>
    <rect x="348" y="375" width="40" height="25" fill="#44403c"/>
    <rect x="388" y="375" width="40" height="25" fill="#1c1917"/>
    <rect x="428" y="375" width="40" height="25" fill="#44403c"/>
    <rect x="468" y="375" width="40" height="25" fill="#1c1917"/>
    <rect x="508" y="375" width="40" height="25" fill="#44403c"/>
    <rect x="548" y="375" width="40" height="25" fill="#1c1917"/>
    <rect x="588" y="375" width="40" height="25" fill="#44403c"/>
    <rect x="628" y="375" width="40" height="25" fill="#1c1917"/>
    <rect x="668" y="375" width="40" height="25" fill="#44403c"/>
    <rect x="708" y="375" width="24" height="25" fill="#1c1917"/>
</g>
<!-- Center altar platform -->
<rect x="320" y="280" width="160" height="20" fill="#57534e" rx="2"/>
<rect x="330" y="270" width="140" height="12" fill="#44403c" rx="2"/>
<!-- All-seeing eye pyramid -->
<polygon points="400,100 340,250 460,250" fill="none" stroke="#d4a017" stroke-width="3" opacity="0.8"/>
<polygon points="400,110 348,245 452,245" fill="#1a1008" opacity="0.6"/>
<!-- Eye in pyramid -->
<ellipse cx="400" cy="185" rx="25" ry="15" fill="#fbbf24" opacity="0.7"/>
<circle cx="400" cy="185" r="8" fill="#0a0a0a"/>
<circle cx="402" cy="183" r="3" fill="#fbbf24"/>
<!-- Eye glow -->
<ellipse cx="400" cy="185" rx="35" ry="20" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.3"/>
<!-- Rays from eye -->
<line x1="400" y1="100" x2="400" y2="70" stroke="#fbbf24" stroke-width="1" opacity="0.3"/>
<line x1="370" y1="115" x2="350" y2="85" stroke="#fbbf24" stroke-width="1" opacity="0.2"/>
<line x1="430" y1="115" x2="450" y2="85" stroke="#fbbf24" stroke-width="1" opacity="0.2"/>
<!-- Torch sconces left -->
<rect x="90" y="130" width="8" height="20" fill="#78716c"/>
<ellipse cx="94" cy="125" rx="8" ry="12" fill="url(#gn1torch)"/>
<ellipse cx="94" cy="120" rx="5" ry="8" fill="#f97316" opacity="0.8"/>
<ellipse cx="94" cy="116" rx="3" ry="5" fill="#fbbf24"/>
<!-- Torch sconces right -->
<rect x="702" y="130" width="8" height="20" fill="#78716c"/>
<ellipse cx="706" cy="125" rx="8" ry="12" fill="url(#gn1torch)"/>
<ellipse cx="706" cy="120" rx="5" ry="8" fill="#f97316" opacity="0.8"/>
<ellipse cx="706" cy="116" rx="3" ry="5" fill="#fbbf24"/>
<!-- More torches -->
<rect x="90" y="230" width="8" height="20" fill="#78716c"/>
<ellipse cx="94" cy="225" rx="6" ry="10" fill="#f97316" opacity="0.6"/>
<ellipse cx="94" cy="221" rx="3" ry="5" fill="#fbbf24" opacity="0.8"/>
<rect x="702" y="230" width="8" height="20" fill="#78716c"/>
<ellipse cx="706" cy="225" rx="6" ry="10" fill="#f97316" opacity="0.6"/>
<ellipse cx="706" cy="221" rx="3" ry="5" fill="#fbbf24" opacity="0.8"/>
<!-- Candles on altar -->
<rect x="340" y="255" width="4" height="15" fill="#fef3c7"/>
<ellipse cx="342" cy="252" rx="3" ry="5" fill="#f97316" opacity="0.8"/>
<rect x="456" y="255" width="4" height="15" fill="#fef3c7"/>
<ellipse cx="458" cy="252" rx="3" ry="5" fill="#f97316" opacity="0.8"/>
<rect x="360" y="258" width="3" height="12" fill="#fef3c7"/>
<ellipse cx="361" cy="255" rx="2" ry="4" fill="#fbbf24" opacity="0.7"/>
<rect x="437" y="258" width="3" height="12" fill="#fef3c7"/>
<ellipse cx="438" cy="255" rx="2" ry="4" fill="#fbbf24" opacity="0.7"/>
<!-- Pillar columns -->
<rect x="140" y="60" width="25" height="240" fill="#3f3f46" opacity="0.6"/>
<rect x="145" y="60" width="15" height="240" fill="#52525b" opacity="0.4"/>
<rect x="635" y="60" width="25" height="240" fill="#3f3f46" opacity="0.6"/>
<rect x="640" y="60" width="15" height="240" fill="#52525b" opacity="0.4"/>
</svg>`,

// ── MAP 2: Vatican Vault (Secret Archives) ──
gen_vatican_vault: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="gn2bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2c1a0e"/>
        <stop offset="50%" stop-color="#3d2914"/>
        <stop offset="100%" stop-color="#1a1008"/>
    </linearGradient>
    <radialGradient id="gn2light" cx="0.5" cy="0.3" r="0.5">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#1a1008" stop-opacity="0"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#gn2bg)"/>
<rect width="800" height="400" fill="url(#gn2light)"/>
<!-- Ornate ceiling with arches -->
<path d="M 0,0 L 0,60 Q 100,20 200,60 Q 300,20 400,60 Q 500,20 600,60 Q 700,20 800,60 L 800,0 Z" fill="#1c1208" stroke="#8b6914" stroke-width="1"/>
<path d="M 0,60 Q 100,25 200,60" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.3"/>
<path d="M 200,60 Q 300,25 400,60" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.3"/>
<path d="M 400,60 Q 500,25 600,60" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.3"/>
<path d="M 600,60 Q 700,25 800,60" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.3"/>
<!-- Fresco on ceiling -->
<ellipse cx="200" cy="30" rx="60" ry="20" fill="#4a3728" opacity="0.5"/>
<ellipse cx="200" cy="30" rx="50" ry="15" fill="#5c4033" opacity="0.4"/>
<ellipse cx="600" cy="30" rx="60" ry="20" fill="#4a3728" opacity="0.5"/>
<ellipse cx="600" cy="30" rx="50" ry="15" fill="#5c4033" opacity="0.4"/>
<!-- Marble floor -->
<rect x="0" y="340" width="800" height="60" fill="#d6d3d1"/>
<rect x="0" y="340" width="800" height="2" fill="#a8a29e"/>
<!-- Floor mosaic pattern -->
<circle cx="400" cy="370" r="25" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.4"/>
<circle cx="400" cy="370" r="15" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.3"/>
<line x1="375" y1="370" x2="425" y2="370" stroke="#d4a017" stroke-width="1" opacity="0.3"/>
<line x1="400" y1="345" x2="400" y2="395" stroke="#d4a017" stroke-width="1" opacity="0.3"/>
<!-- Floor tiles -->
<line x1="100" y1="340" x2="100" y2="400" stroke="#a8a29e" stroke-width="0.5" opacity="0.4"/>
<line x1="200" y1="340" x2="200" y2="400" stroke="#a8a29e" stroke-width="0.5" opacity="0.4"/>
<line x1="300" y1="340" x2="300" y2="400" stroke="#a8a29e" stroke-width="0.5" opacity="0.4"/>
<line x1="500" y1="340" x2="500" y2="400" stroke="#a8a29e" stroke-width="0.5" opacity="0.4"/>
<line x1="600" y1="340" x2="600" y2="400" stroke="#a8a29e" stroke-width="0.5" opacity="0.4"/>
<line x1="700" y1="340" x2="700" y2="400" stroke="#a8a29e" stroke-width="0.5" opacity="0.4"/>
<!-- Bookshelves - Left row -->
<rect x="20" y="65" width="120" height="275" fill="#5c3a1e" stroke="#3d2914" stroke-width="2"/>
<rect x="25" y="70" width="110" height="40" fill="#3d2914"/>
<rect x="25" y="115" width="110" height="40" fill="#3d2914"/>
<rect x="25" y="160" width="110" height="40" fill="#3d2914"/>
<rect x="25" y="205" width="110" height="40" fill="#3d2914"/>
<rect x="25" y="250" width="110" height="40" fill="#3d2914"/>
<rect x="25" y="295" width="110" height="40" fill="#3d2914"/>
<!-- Books on shelves (left) -->
<rect x="28" y="72" width="8" height="36" fill="#991b1b" rx="1"/>
<rect x="37" y="74" width="6" height="34" fill="#1e3a5f" rx="1"/>
<rect x="44" y="71" width="9" height="37" fill="#5b2c0e" rx="1"/>
<rect x="54" y="73" width="7" height="35" fill="#1a472a" rx="1"/>
<rect x="62" y="72" width="10" height="36" fill="#7c2d12" rx="1"/>
<rect x="73" y="75" width="6" height="33" fill="#312e81" rx="1"/>
<rect x="80" y="71" width="8" height="37" fill="#831843" rx="1"/>
<rect x="89" y="73" width="7" height="35" fill="#3f3f46" rx="1"/>
<rect x="97" y="72" width="9" height="36" fill="#713f12" rx="1"/>
<rect x="107" y="74" width="8" height="34" fill="#1e3a5f" rx="1"/>
<rect x="116" y="71" width="10" height="37" fill="#5c2d0e" rx="1"/>
<!-- More book rows -->
<rect x="28" y="117" width="10" height="36" fill="#1e3a5f" rx="1"/>
<rect x="39" y="119" width="7" height="34" fill="#831843" rx="1"/>
<rect x="47" y="116" width="9" height="38" fill="#713f12" rx="1"/>
<rect x="57" y="118" width="8" height="36" fill="#991b1b" rx="1"/>
<rect x="66" y="117" width="6" height="37" fill="#1a472a" rx="1"/>
<rect x="73" y="119" width="10" height="35" fill="#4a1d7a" rx="1"/>
<rect x="84" y="116" width="7" height="38" fill="#5c3a1e" rx="1"/>
<rect x="92" y="118" width="9" height="36" fill="#312e81" rx="1"/>
<rect x="102" y="117" width="8" height="37" fill="#7c2d12" rx="1"/>
<rect x="111" y="119" width="7" height="35" fill="#1e3a5f" rx="1"/>
<!-- Bookshelf - Right row -->
<rect x="660" y="65" width="120" height="275" fill="#5c3a1e" stroke="#3d2914" stroke-width="2"/>
<rect x="665" y="70" width="110" height="40" fill="#3d2914"/>
<rect x="665" y="115" width="110" height="40" fill="#3d2914"/>
<rect x="665" y="160" width="110" height="40" fill="#3d2914"/>
<rect x="665" y="205" width="110" height="40" fill="#3d2914"/>
<rect x="665" y="250" width="110" height="40" fill="#3d2914"/>
<rect x="665" y="295" width="110" height="40" fill="#3d2914"/>
<!-- Books (right) -->
<rect x="668" y="72" width="9" height="36" fill="#4a1d7a" rx="1"/>
<rect x="678" y="74" width="7" height="34" fill="#991b1b" rx="1"/>
<rect x="686" y="71" width="8" height="37" fill="#1e3a5f" rx="1"/>
<rect x="695" y="73" width="10" height="35" fill="#713f12" rx="1"/>
<rect x="706" y="72" width="6" height="36" fill="#831843" rx="1"/>
<rect x="713" y="74" width="9" height="34" fill="#1a472a" rx="1"/>
<rect x="723" y="71" width="7" height="37" fill="#7c2d12" rx="1"/>
<rect x="731" y="73" width="8" height="35" fill="#312e81" rx="1"/>
<rect x="740" y="72" width="10" height="36" fill="#5c2d0e" rx="1"/>
<rect x="751" y="74" width="7" height="34" fill="#991b1b" rx="1"/>
<rect x="759" y="71" width="9" height="37" fill="#1e3a5f" rx="1"/>
<!-- Middle bookshelves (background, shorter) -->
<rect x="200" y="90" width="80" height="250" fill="#4a2e14" opacity="0.7"/>
<rect x="205" y="95" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<rect x="205" y="135" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<rect x="205" y="175" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<rect x="205" y="215" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<rect x="205" y="255" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<rect x="520" y="90" width="80" height="250" fill="#4a2e14" opacity="0.7"/>
<rect x="525" y="95" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<rect x="525" y="135" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<rect x="525" y="175" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<rect x="525" y="215" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<rect x="525" y="255" width="70" height="35" fill="#3d2914" opacity="0.7"/>
<!-- Glass relic cases -->
<rect x="350" y="200" width="100" height="80" fill="#1c1917" stroke="#d4a017" stroke-width="1" opacity="0.6"/>
<rect x="355" y="205" width="90" height="70" fill="#0a0a0a" opacity="0.4" stroke="#fef3c7" stroke-width="0.5"/>
<!-- Relic inside - golden cross -->
<line x1="400" y1="215" x2="400" y2="260" stroke="#fbbf24" stroke-width="3"/>
<line x1="383" y1="230" x2="417" y2="230" stroke="#fbbf24" stroke-width="3"/>
<circle cx="400" cy="237" r="2" fill="#fef3c7"/>
<!-- Hanging golden lamps -->
<line x1="300" y1="0" x2="300" y2="80" stroke="#d4a017" stroke-width="1"/>
<circle cx="300" cy="85" r="8" fill="#fbbf24" opacity="0.5"/>
<circle cx="300" cy="85" r="4" fill="#fef3c7" opacity="0.7"/>
<line x1="500" y1="0" x2="500" y2="80" stroke="#d4a017" stroke-width="1"/>
<circle cx="500" cy="85" r="8" fill="#fbbf24" opacity="0.5"/>
<circle cx="500" cy="85" r="4" fill="#fef3c7" opacity="0.7"/>
<!-- Marble columns -->
<rect x="155" y="60" width="20" height="280" fill="#d6d3d1" opacity="0.3"/>
<rect x="160" y="60" width="10" height="280" fill="#e7e5e4" opacity="0.2"/>
<rect x="625" y="60" width="20" height="280" fill="#d6d3d1" opacity="0.3"/>
<rect x="630" y="60" width="10" height="280" fill="#e7e5e4" opacity="0.2"/>
</svg>`,

// ── MAP 3: Area 51 (Military Black Site) ──
gen_area_51: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="gn3sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e1b4b"/>
        <stop offset="40%" stop-color="#312e81"/>
        <stop offset="70%" stop-color="#4c1d95"/>
        <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
    <radialGradient id="gn3ufo" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#gn3sky)"/>
<!-- Stars -->
<circle cx="50" cy="30" r="1" fill="white" opacity="0.7"/>
<circle cx="120" cy="60" r="1.5" fill="white" opacity="0.5"/>
<circle cx="200" cy="20" r="1" fill="white" opacity="0.8"/>
<circle cx="350" cy="45" r="1" fill="white" opacity="0.6"/>
<circle cx="500" cy="25" r="1.5" fill="white" opacity="0.7"/>
<circle cx="650" cy="50" r="1" fill="white" opacity="0.5"/>
<circle cx="750" cy="30" r="1" fill="white" opacity="0.8"/>
<circle cx="420" cy="15" r="1" fill="white" opacity="0.6"/>
<!-- Desert ground -->
<rect x="0" y="280" width="800" height="120" fill="#92400e"/>
<rect x="0" y="290" width="800" height="110" fill="#78350f"/>
<!-- Desert texture -->
<ellipse cx="100" cy="320" rx="60" ry="5" fill="#92400e" opacity="0.5"/>
<ellipse cx="500" cy="350" rx="80" ry="4" fill="#92400e" opacity="0.4"/>
<ellipse cx="700" cy="310" rx="50" ry="3" fill="#92400e" opacity="0.5"/>
<!-- Mountains in distance -->
<polygon points="0,280 80,220 160,280" fill="#451a03" opacity="0.5"/>
<polygon points="120,280 220,200 320,280" fill="#431407" opacity="0.4"/>
<polygon points="600,280 720,210 800,280" fill="#451a03" opacity="0.5"/>
<!-- Chain-link fence -->
<line x1="0" y1="260" x2="800" y2="260" stroke="#a8a29e" stroke-width="2"/>
<line x1="0" y1="280" x2="800" y2="280" stroke="#a8a29e" stroke-width="2"/>
<!-- Fence posts -->
<rect x="50" y="245" width="4" height="40" fill="#78716c"/>
<rect x="150" y="245" width="4" height="40" fill="#78716c"/>
<rect x="250" y="245" width="4" height="40" fill="#78716c"/>
<rect x="550" y="245" width="4" height="40" fill="#78716c"/>
<rect x="650" y="245" width="4" height="40" fill="#78716c"/>
<rect x="750" y="245" width="4" height="40" fill="#78716c"/>
<!-- Barbed wire -->
<path d="M 0,250 L 50,248 L 100,252 L 150,248 L 200,252 L 250,248 L 300,252 L 350,248" stroke="#a8a29e" stroke-width="1" fill="none"/>
<path d="M 450,248 L 500,252 L 550,248 L 600,252 L 650,248 L 700,252 L 750,248 L 800,252" stroke="#a8a29e" stroke-width="1" fill="none"/>
<!-- Barbs -->
<text x="75" y="252" fill="#a8a29e" font-size="6">✕</text>
<text x="175" y="250" fill="#a8a29e" font-size="6">✕</text>
<text x="275" y="252" fill="#a8a29e" font-size="6">✕</text>
<text x="575" y="250" fill="#a8a29e" font-size="6">✕</text>
<text x="675" y="252" fill="#a8a29e" font-size="6">✕</text>
<!-- Warning sign -->
<polygon points="380,235 400,215 420,235" fill="#fbbf24" stroke="#0a0a0a" stroke-width="2"/>
<text x="400" y="232" fill="#0a0a0a" font-size="10" text-anchor="middle" font-weight="bold">!</text>
<rect x="390" y="236" width="20" height="12" fill="#dc2626"/>
<text x="400" y="246" fill="white" font-size="6" text-anchor="middle">AREA 51</text>
<!-- Gate opening -->
<rect x="350" y="250" width="100" height="32" fill="#78350f"/>
<!-- Concrete bunkers -->
<rect x="100" y="300" width="120" height="50" fill="#57534e" rx="3"/>
<rect x="100" y="296" width="120" height="8" fill="#44403c" rx="2"/>
<rect x="130" y="310" width="20" height="10" fill="#1c1917"/>
<rect x="170" y="310" width="20" height="10" fill="#1c1917"/>
<!-- Bunker 2 -->
<rect x="580" y="295" width="140" height="55" fill="#57534e" rx="3"/>
<rect x="580" y="291" width="140" height="8" fill="#44403c" rx="2"/>
<rect x="610" y="305" width="25" height="12" fill="#1c1917"/>
<rect x="660" y="305" width="25" height="12" fill="#1c1917"/>
<!-- UFO wreckage -->
<ellipse cx="420" cy="330" rx="50" ry="12" fill="#6b7280" opacity="0.7"/>
<ellipse cx="420" cy="325" rx="40" ry="8" fill="#9ca3af" opacity="0.5"/>
<path d="M 395,325 Q 420,305 445,325" fill="#4b5563" opacity="0.6"/>
<!-- UFO glow -->
<ellipse cx="420" cy="330" rx="55" ry="15" fill="url(#gn3ufo)"/>
<circle cx="410" cy="328" r="3" fill="#22d3ee" opacity="0.6"/>
<circle cx="430" cy="326" r="2" fill="#22d3ee" opacity="0.5"/>
<circle cx="420" cy="322" r="2" fill="#22d3ee" opacity="0.7"/>
<!-- Alien tech glowing crate -->
<rect x="310" y="320" width="30" height="25" fill="#374151"/>
<rect x="312" y="322" width="26" height="21" fill="#1f2937" stroke="#22d3ee" stroke-width="1" opacity="0.7"/>
<line x1="325" y1="322" x2="325" y2="343" stroke="#22d3ee" stroke-width="0.5" opacity="0.5"/>
<!-- Military vehicle (simplified humvee) -->
<rect x="30" y="330" width="55" height="25" fill="#4d7c0f" rx="2"/>
<rect x="35" y="322" width="45" height="12" fill="#4d7c0f" rx="1"/>
<rect x="40" y="324" width="12" height="8" fill="#bfdbfe" opacity="0.4"/>
<circle cx="40" cy="358" r="7" fill="#1c1917"/>
<circle cx="40" cy="358" r="4" fill="#374151"/>
<circle cx="75" cy="358" r="7" fill="#1c1917"/>
<circle cx="75" cy="358" r="4" fill="#374151"/>
<!-- Searchlight beams -->
<polygon points="700,290 680,100 720,100" fill="white" opacity="0.05"/>
<polygon points="120,296 100,120 140,120" fill="white" opacity="0.04"/>
</svg>`,

// ── MAP 4: Pyramid Interior ──
gen_pyramid: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="gn4bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#451a03"/>
        <stop offset="50%" stop-color="#78350f"/>
        <stop offset="100%" stop-color="#3d1c02"/>
    </linearGradient>
    <radialGradient id="gn4blue" cx="0.5" cy="0.55" r="0.3">
        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gn4torch2" cx="0.5" cy="0.3" r="0.5">
        <stop offset="0%" stop-color="#f97316" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#gn4bg)"/>
<!-- Mystical blue glow from artifacts -->
<rect width="800" height="400" fill="url(#gn4blue)"/>
<!-- Sandstone ceiling - angled like pyramid interior -->
<path d="M 0,0 L 400,40 L 800,0 L 800,60 L 400,80 L 0,60 Z" fill="#5c3a1e" opacity="0.8"/>
<path d="M 0,60 L 400,80 L 800,60" fill="none" stroke="#92400e" stroke-width="2"/>
<!-- Stone block pattern on walls -->
<g opacity="0.4">
    <!-- Left wall blocks -->
    <rect x="0" y="60" width="80" height="340" fill="#6b4226"/>
    <line x1="0" y1="100" x2="80" y2="100" stroke="#451a03" stroke-width="1"/>
    <line x1="0" y1="140" x2="80" y2="140" stroke="#451a03" stroke-width="1"/>
    <line x1="0" y1="180" x2="80" y2="180" stroke="#451a03" stroke-width="1"/>
    <line x1="0" y1="220" x2="80" y2="220" stroke="#451a03" stroke-width="1"/>
    <line x1="0" y1="260" x2="80" y2="260" stroke="#451a03" stroke-width="1"/>
    <line x1="0" y1="300" x2="80" y2="300" stroke="#451a03" stroke-width="1"/>
    <line x1="40" y1="60" x2="40" y2="100" stroke="#451a03" stroke-width="1"/>
    <line x1="20" y1="100" x2="20" y2="140" stroke="#451a03" stroke-width="1"/>
    <line x1="60" y1="100" x2="60" y2="140" stroke="#451a03" stroke-width="1"/>
    <line x1="40" y1="140" x2="40" y2="180" stroke="#451a03" stroke-width="1"/>
    <!-- Right wall blocks -->
    <rect x="720" y="60" width="80" height="340" fill="#6b4226"/>
    <line x1="720" y1="100" x2="800" y2="100" stroke="#451a03" stroke-width="1"/>
    <line x1="720" y1="140" x2="800" y2="140" stroke="#451a03" stroke-width="1"/>
    <line x1="720" y1="180" x2="800" y2="180" stroke="#451a03" stroke-width="1"/>
    <line x1="720" y1="220" x2="800" y2="220" stroke="#451a03" stroke-width="1"/>
    <line x1="720" y1="260" x2="800" y2="260" stroke="#451a03" stroke-width="1"/>
    <line x1="720" y1="300" x2="800" y2="300" stroke="#451a03" stroke-width="1"/>
    <line x1="760" y1="60" x2="760" y2="100" stroke="#451a03" stroke-width="1"/>
    <line x1="740" y1="100" x2="740" y2="140" stroke="#451a03" stroke-width="1"/>
    <line x1="780" y1="100" x2="780" y2="140" stroke="#451a03" stroke-width="1"/>
</g>
<!-- Hieroglyphics on walls -->
<g fill="#d4a017" opacity="0.4" font-size="12">
    <text x="15" y="115">𓀀</text>
    <text x="40" y="115">𓁀</text>
    <text x="15" y="155">𓂀</text>
    <text x="45" y="155">𓃀</text>
    <text x="20" y="195">𓅀</text>
    <text x="50" y="195">𓆀</text>
    <text x="15" y="235">𓇀</text>
    <text x="45" y="235">𓈀</text>
    <text x="730" y="115">𓀀</text>
    <text x="760" y="115">𓂀</text>
    <text x="735" y="155">𓃀</text>
    <text x="765" y="155">𓅀</text>
    <text x="730" y="195">𓆀</text>
    <text x="760" y="195">𓇀</text>
    <text x="735" y="235">𓈀</text>
    <text x="765" y="235">𓁀</text>
</g>
<!-- Floor - sandstone -->
<rect x="0" y="320" width="800" height="80" fill="#8b6914" opacity="0.4"/>
<rect x="0" y="320" width="800" height="2" fill="#92400e"/>
<!-- Floor block lines -->
<line x1="100" y1="320" x2="100" y2="400" stroke="#6b4226" stroke-width="0.5" opacity="0.3"/>
<line x1="200" y1="320" x2="200" y2="400" stroke="#6b4226" stroke-width="0.5" opacity="0.3"/>
<line x1="300" y1="320" x2="300" y2="400" stroke="#6b4226" stroke-width="0.5" opacity="0.3"/>
<line x1="400" y1="320" x2="400" y2="400" stroke="#6b4226" stroke-width="0.5" opacity="0.3"/>
<line x1="500" y1="320" x2="500" y2="400" stroke="#6b4226" stroke-width="0.5" opacity="0.3"/>
<line x1="600" y1="320" x2="600" y2="400" stroke="#6b4226" stroke-width="0.5" opacity="0.3"/>
<line x1="700" y1="320" x2="700" y2="400" stroke="#6b4226" stroke-width="0.5" opacity="0.3"/>
<line x1="0" y1="360" x2="800" y2="360" stroke="#6b4226" stroke-width="0.5" opacity="0.3"/>
<!-- Torch on left wall -->
<rect x="75" y="120" width="6" height="25" fill="#78716c"/>
<ellipse cx="78" cy="115" rx="8" ry="12" fill="url(#gn4torch2)"/>
<ellipse cx="78" cy="112" rx="5" ry="8" fill="#f97316" opacity="0.8"/>
<ellipse cx="78" cy="108" rx="3" ry="5" fill="#fbbf24"/>
<!-- Torch on right wall -->
<rect x="719" y="120" width="6" height="25" fill="#78716c"/>
<ellipse cx="722" cy="115" rx="8" ry="12" fill="url(#gn4torch2)"/>
<ellipse cx="722" cy="112" rx="5" ry="8" fill="#f97316" opacity="0.8"/>
<ellipse cx="722" cy="108" rx="3" ry="5" fill="#fbbf24"/>
<!-- Sarcophagus -->
<rect x="340" y="250" width="120" height="70" fill="#d4a017" rx="3" stroke="#b8860b" stroke-width="2"/>
<rect x="345" y="255" width="110" height="60" fill="#b8860b" rx="2"/>
<!-- Sarcophagus face -->
<ellipse cx="400" cy="275" rx="20" ry="12" fill="#d4a017" opacity="0.5"/>
<circle cx="392" cy="272" r="3" fill="#0a0a0a" opacity="0.5"/>
<circle cx="408" cy="272" r="3" fill="#0a0a0a" opacity="0.5"/>
<line x1="395" y1="282" x2="405" y2="282" stroke="#0a0a0a" stroke-width="1" opacity="0.5"/>
<!-- Gold treasures scattered -->
<circle cx="280" cy="340" r="5" fill="#fbbf24" opacity="0.7"/>
<circle cx="290" cy="345" r="4" fill="#d4a017" opacity="0.6"/>
<circle cx="270" cy="348" r="3" fill="#fbbf24" opacity="0.5"/>
<rect x="510" y="335" width="15" height="10" fill="#fbbf24" rx="1" opacity="0.6"/>
<rect x="530" y="340" width="12" height="8" fill="#d4a017" rx="1" opacity="0.5"/>
<circle cx="550" cy="345" r="4" fill="#fbbf24" opacity="0.6"/>
<!-- Mystical blue artifact glow -->
<circle cx="400" cy="220" r="15" fill="#3b82f6" opacity="0.3"/>
<circle cx="400" cy="220" r="8" fill="#60a5fa" opacity="0.5"/>
<circle cx="400" cy="220" r="3" fill="#bfdbfe"/>
<!-- Blue light rays -->
<line x1="400" y1="220" x2="380" y2="180" stroke="#60a5fa" stroke-width="1" opacity="0.3"/>
<line x1="400" y1="220" x2="420" y2="180" stroke="#60a5fa" stroke-width="1" opacity="0.3"/>
<line x1="400" y1="220" x2="400" y2="170" stroke="#60a5fa" stroke-width="1" opacity="0.4"/>
<line x1="400" y1="220" x2="360" y2="200" stroke="#60a5fa" stroke-width="1" opacity="0.2"/>
<line x1="400" y1="220" x2="440" y2="200" stroke="#60a5fa" stroke-width="1" opacity="0.2"/>
<!-- Ancient trap - arrow slits -->
<rect x="85" y="270" width="3" height="15" fill="#0a0a0a"/>
<rect x="85" y="290" width="3" height="15" fill="#0a0a0a"/>
<rect x="712" y="270" width="3" height="15" fill="#0a0a0a"/>
<rect x="712" y="290" width="3" height="15" fill="#0a0a0a"/>
<!-- Corridor depth indicator -->
<path d="M 80,60 L 150,100 L 150,320 L 80,320 Z" fill="#451a03" opacity="0.15"/>
<path d="M 720,60 L 650,100 L 650,320 L 720,320 Z" fill="#451a03" opacity="0.15"/>
</svg>`,

// ── MAP 5: Mount Olympus Throne Room ──
gen_olympus: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="gn5sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1d4ed8"/>
        <stop offset="30%" stop-color="#3b82f6"/>
        <stop offset="60%" stop-color="#93c5fd"/>
        <stop offset="100%" stop-color="#e0e7ff"/>
    </linearGradient>
    <radialGradient id="gn5sun" cx="0.5" cy="0.15" r="0.3">
        <stop offset="0%" stop-color="#fef3c7" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#fef3c7" stop-opacity="0"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#gn5sky)"/>
<rect width="800" height="400" fill="url(#gn5sun)"/>
<!-- Sun -->
<circle cx="400" cy="50" r="30" fill="#fbbf24" opacity="0.6"/>
<circle cx="400" cy="50" r="20" fill="#fef3c7" opacity="0.8"/>
<!-- Lightning bolts -->
<path d="M 150,20 L 145,50 L 155,50 L 148,90" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.7"/>
<path d="M 650,30 L 645,55 L 655,55 L 648,85" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.6"/>
<path d="M 100,10 L 97,35 L 107,35 L 100,65" fill="none" stroke="#fbbf24" stroke-width="1.5" opacity="0.4"/>
<!-- Cloud floor -->
<ellipse cx="100" cy="300" rx="120" ry="30" fill="white" opacity="0.6"/>
<ellipse cx="250" cy="310" rx="100" ry="25" fill="white" opacity="0.7"/>
<ellipse cx="400" cy="305" rx="130" ry="35" fill="white" opacity="0.65"/>
<ellipse cx="550" cy="310" rx="110" ry="28" fill="white" opacity="0.7"/>
<ellipse cx="700" cy="300" rx="120" ry="30" fill="white" opacity="0.6"/>
<ellipse cx="150" cy="330" rx="100" ry="40" fill="white" opacity="0.8"/>
<ellipse cx="400" cy="340" rx="150" ry="45" fill="white" opacity="0.75"/>
<ellipse cx="650" cy="330" rx="110" ry="40" fill="white" opacity="0.8"/>
<rect x="0" y="350" width="800" height="50" fill="white" opacity="0.85"/>
<ellipse cx="200" cy="360" rx="120" ry="30" fill="#e0e7ff" opacity="0.3"/>
<ellipse cx="600" cy="365" rx="130" ry="25" fill="#e0e7ff" opacity="0.3"/>
<!-- Marble columns -->
<rect x="80" y="100" width="30" height="200" fill="#e7e5e4" stroke="#d6d3d1" stroke-width="1"/>
<rect x="85" y="100" width="20" height="200" fill="#f5f5f4"/>
<ellipse cx="95" cy="100" rx="18" ry="6" fill="#d6d3d1"/>
<rect x="80" y="295" width="30" height="8" fill="#d6d3d1"/>
<rect x="200" y="110" width="28" height="190" fill="#e7e5e4" stroke="#d6d3d1" stroke-width="1"/>
<rect x="205" y="110" width="18" height="190" fill="#f5f5f4"/>
<ellipse cx="214" cy="110" rx="17" ry="5" fill="#d6d3d1"/>
<rect x="200" y="295" width="28" height="8" fill="#d6d3d1"/>
<rect x="570" y="110" width="28" height="190" fill="#e7e5e4" stroke="#d6d3d1" stroke-width="1"/>
<rect x="575" y="110" width="18" height="190" fill="#f5f5f4"/>
<ellipse cx="584" cy="110" rx="17" ry="5" fill="#d6d3d1"/>
<rect x="570" y="295" width="28" height="8" fill="#d6d3d1"/>
<rect x="690" y="100" width="30" height="200" fill="#e7e5e4" stroke="#d6d3d1" stroke-width="1"/>
<rect x="695" y="100" width="20" height="200" fill="#f5f5f4"/>
<ellipse cx="705" cy="100" rx="18" ry="6" fill="#d6d3d1"/>
<rect x="690" y="295" width="30" height="8" fill="#d6d3d1"/>
<!-- Colonnade top beam -->
<rect x="70" y="92" width="660" height="12" fill="#d6d3d1"/>
<rect x="70" y="88" width="660" height="6" fill="#e7e5e4"/>
<!-- Golden thrones -->
<rect x="320" y="200" width="70" height="80" fill="#d4a017" rx="3"/>
<rect x="325" y="170" width="60" height="35" fill="#d4a017" rx="5"/>
<rect x="340" y="160" width="30" height="15" fill="#fbbf24" rx="8"/>
<circle cx="355" cy="155" r="8" fill="#fbbf24"/>
<circle cx="355" cy="155" r="5" fill="#fef3c7"/>
<!-- Throne 2 -->
<rect x="430" y="200" width="70" height="80" fill="#d4a017" rx="3"/>
<rect x="435" y="170" width="60" height="35" fill="#d4a017" rx="5"/>
<rect x="450" y="160" width="30" height="15" fill="#fbbf24" rx="8"/>
<circle cx="465" cy="155" r="8" fill="#fbbf24"/>
<circle cx="465" cy="155" r="5" fill="#fef3c7"/>
<!-- Olive trees -->
<rect x="270" y="230" width="6" height="70" fill="#6b4226"/>
<ellipse cx="273" cy="220" rx="20" ry="18" fill="#4d7c0f" opacity="0.7"/>
<ellipse cx="265" cy="225" rx="12" ry="10" fill="#65a30d" opacity="0.5"/>
<ellipse cx="280" cy="215" rx="10" ry="8" fill="#65a30d" opacity="0.6"/>
<rect x="530" y="230" width="6" height="70" fill="#6b4226"/>
<ellipse cx="533" cy="220" rx="20" ry="18" fill="#4d7c0f" opacity="0.7"/>
<ellipse cx="540" cy="225" rx="12" ry="10" fill="#65a30d" opacity="0.5"/>
<ellipse cx="525" cy="215" rx="10" ry="8" fill="#65a30d" opacity="0.6"/>
<!-- Greek statues -->
<rect x="130" y="250" width="15" height="45" fill="#d6d3d1"/>
<circle cx="137" cy="242" r="8" fill="#e7e5e4"/>
<rect x="655" y="250" width="15" height="45" fill="#d6d3d1"/>
<circle cx="662" cy="242" r="8" fill="#e7e5e4"/>
<!-- Golden light rays from above -->
<polygon points="400,0 380,100 420,100" fill="#fbbf24" opacity="0.08"/>
<polygon points="300,0 290,100 310,100" fill="#fbbf24" opacity="0.05"/>
<polygon points="500,0 490,100 510,100" fill="#fbbf24" opacity="0.05"/>
</svg>`,

// ── MAP 6: Asgard (Norse Realm) ──
gen_asgard: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="gn6sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0c0a1a"/>
        <stop offset="30%" stop-color="#1e1b4b"/>
        <stop offset="60%" stop-color="#1e3a5f"/>
        <stop offset="100%" stop-color="#312e81"/>
    </linearGradient>
    <linearGradient id="gn6rainbow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ef4444"/>
        <stop offset="16%" stop-color="#f97316"/>
        <stop offset="33%" stop-color="#fbbf24"/>
        <stop offset="50%" stop-color="#22c55e"/>
        <stop offset="66%" stop-color="#3b82f6"/>
        <stop offset="83%" stop-color="#6366f1"/>
        <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <linearGradient id="gn6aurora1" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0%" stop-color="#22c55e" stop-opacity="0"/>
        <stop offset="30%" stop-color="#22c55e" stop-opacity="0.3"/>
        <stop offset="50%" stop-color="#34d399" stop-opacity="0.4"/>
        <stop offset="70%" stop-color="#22d3ee" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#gn6sky)"/>
<!-- Northern lights / Aurora -->
<path d="M 0,40 Q 100,20 200,50 Q 350,10 500,45 Q 600,25 700,55 Q 750,35 800,50 L 800,90 Q 700,70 600,85 Q 450,50 300,80 Q 150,55 0,80 Z" fill="url(#gn6aurora1)" opacity="0.6"/>
<path d="M 0,60 Q 150,30 300,70 Q 400,40 550,65 Q 650,45 800,70 L 800,100 Q 650,75 500,90 Q 350,60 200,85 Q 100,65 0,90 Z" fill="#a855f7" opacity="0.12"/>
<path d="M 100,20 Q 250,5 400,30 Q 550,10 700,35 L 700,55 Q 550,35 400,50 Q 250,30 100,45 Z" fill="#22c55e" opacity="0.15"/>
<!-- Stars -->
<circle cx="50" cy="25" r="1.5" fill="white" opacity="0.8"/>
<circle cx="180" cy="15" r="1" fill="white" opacity="0.6"/>
<circle cx="350" cy="8" r="1.5" fill="white" opacity="0.7"/>
<circle cx="520" cy="20" r="1" fill="white" opacity="0.5"/>
<circle cx="680" cy="12" r="1.5" fill="white" opacity="0.8"/>
<circle cx="760" cy="28" r="1" fill="white" opacity="0.6"/>
<circle cx="430" cy="30" r="1" fill="white" opacity="0.7"/>
<!-- Snowy mountains -->
<polygon points="0,280 60,160 120,200 180,140 250,220 300,280" fill="#334155"/>
<polygon points="160,180 180,140 200,160" fill="white" opacity="0.5"/>
<polygon points="60,180 70,160 80,175" fill="white" opacity="0.4"/>
<polygon points="500,280 580,170 640,210 720,150 780,200 800,280" fill="#334155"/>
<polygon points="700,190 720,150 740,180" fill="white" opacity="0.5"/>
<polygon points="580,195 590,170 600,190" fill="white" opacity="0.4"/>
<!-- Ground -->
<rect x="0" y="280" width="800" height="120" fill="#1e293b"/>
<rect x="0" y="280" width="800" height="5" fill="white" opacity="0.2"/>
<!-- Snow patches -->
<ellipse cx="100" cy="300" rx="50" ry="5" fill="white" opacity="0.15"/>
<ellipse cx="350" cy="310" rx="40" ry="4" fill="white" opacity="0.1"/>
<ellipse cx="650" cy="305" rx="60" ry="5" fill="white" opacity="0.12"/>
<!-- Bifrost Rainbow Bridge -->
<path d="M 0,350 Q 200,250 400,240 Q 600,250 800,350" fill="none" stroke="url(#gn6rainbow)" stroke-width="18" opacity="0.7"/>
<path d="M 0,350 Q 200,250 400,240 Q 600,250 800,350" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
<!-- Bifrost glow -->
<path d="M 0,350 Q 200,250 400,240 Q 600,250 800,350" fill="none" stroke="url(#gn6rainbow)" stroke-width="30" opacity="0.15"/>
<!-- Golden Palace of Asgard -->
<rect x="310" y="140" width="180" height="100" fill="#b8860b" stroke="#d4a017" stroke-width="2"/>
<rect x="330" y="120" width="140" height="25" fill="#d4a017"/>
<!-- Palace towers -->
<rect x="300" y="100" width="30" height="140" fill="#b8860b" stroke="#d4a017" stroke-width="1"/>
<polygon points="300,100 315,60 330,100" fill="#d4a017"/>
<circle cx="315" cy="70" r="4" fill="#fef3c7"/>
<rect x="470" y="100" width="30" height="140" fill="#b8860b" stroke="#d4a017" stroke-width="1"/>
<polygon points="470,100 485,60 500,100" fill="#d4a017"/>
<circle cx="485" cy="70" r="4" fill="#fef3c7"/>
<!-- Central spire -->
<rect x="385" y="80" width="30" height="60" fill="#d4a017"/>
<polygon points="385,80 400,30 415,80" fill="#fbbf24"/>
<circle cx="400" cy="45" r="5" fill="#fef3c7"/>
<!-- Palace windows -->
<rect x="340" y="155" width="20" height="25" fill="#1e3a5f" opacity="0.6" stroke="#fbbf24" stroke-width="1"/>
<rect x="380" y="155" width="20" height="25" fill="#1e3a5f" opacity="0.6" stroke="#fbbf24" stroke-width="1"/>
<rect x="420" y="155" width="20" height="25" fill="#1e3a5f" opacity="0.6" stroke="#fbbf24" stroke-width="1"/>
<!-- Palace gate -->
<rect x="370" y="200" width="60" height="40" fill="#78350f" rx="30 30 0 0"/>
<path d="M 370,240 L 370,200 Q 400,175 430,200 L 430,240 Z" fill="#5c3a1e"/>
<!-- Frost on edges -->
<rect x="0" y="0" width="800" height="5" fill="white" opacity="0.15"/>
<rect x="0" y="395" width="800" height="5" fill="white" opacity="0.2"/>
<rect x="0" y="0" width="5" height="400" fill="white" opacity="0.1"/>
<rect x="795" y="0" width="5" height="400" fill="white" opacity="0.1"/>
<!-- Frost particles -->
<circle cx="30" cy="50" r="2" fill="white" opacity="0.3"/>
<circle cx="770" cy="80" r="1.5" fill="white" opacity="0.25"/>
<circle cx="50" cy="350" r="2" fill="white" opacity="0.2"/>
<circle cx="740" cy="370" r="1.5" fill="white" opacity="0.3"/>
</svg>`,

// ── MAP 7: Garden of Eden ──
gen_eden: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="gn7sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fef3c7"/>
        <stop offset="30%" stop-color="#fde68a"/>
        <stop offset="60%" stop-color="#bbf7d0"/>
        <stop offset="100%" stop-color="#86efac"/>
    </linearGradient>
    <radialGradient id="gn7glow" cx="0.5" cy="0.3" r="0.4">
        <stop offset="0%" stop-color="#fef3c7" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#fef3c7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gn7river" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#d4a017"/>
        <stop offset="50%" stop-color="#fbbf24"/>
        <stop offset="100%" stop-color="#d4a017"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#gn7sky)"/>
<!-- Innocent divine light -->
<rect width="800" height="400" fill="url(#gn7glow)"/>
<!-- Light rays from above -->
<polygon points="400,0 370,200 430,200" fill="#fef3c7" opacity="0.15"/>
<polygon points="300,0 280,180 320,180" fill="#fef3c7" opacity="0.1"/>
<polygon points="500,0 480,180 520,180" fill="#fef3c7" opacity="0.1"/>
<polygon points="200,0 190,150 210,150" fill="#fef3c7" opacity="0.08"/>
<polygon points="600,0 590,150 610,150" fill="#fef3c7" opacity="0.08"/>
<!-- Lush ground -->
<rect x="0" y="280" width="800" height="120" fill="#22c55e"/>
<rect x="0" y="290" width="800" height="110" fill="#16a34a"/>
<rect x="0" y="300" width="800" height="100" fill="#15803d"/>
<!-- Grass tufts -->
<path d="M 50,280 L 55,270 L 60,280" fill="#4ade80" opacity="0.6"/>
<path d="M 150,280 L 155,268 L 160,280" fill="#4ade80" opacity="0.5"/>
<path d="M 250,280 L 256,272 L 262,280" fill="#4ade80" opacity="0.6"/>
<path d="M 550,280 L 555,270 L 560,280" fill="#4ade80" opacity="0.5"/>
<path d="M 700,280 L 705,268 L 710,280" fill="#4ade80" opacity="0.6"/>
<!-- Flowers -->
<circle cx="80" cy="285" r="4" fill="#f472b6" opacity="0.8"/>
<circle cx="80" cy="285" r="2" fill="#fbbf24"/>
<circle cx="180" cy="290" r="3" fill="#c084fc" opacity="0.7"/>
<circle cx="180" cy="290" r="1.5" fill="#fef3c7"/>
<circle cx="620" cy="283" r="4" fill="#fb923c" opacity="0.8"/>
<circle cx="620" cy="283" r="2" fill="#fbbf24"/>
<circle cx="720" cy="288" r="3" fill="#f472b6" opacity="0.7"/>
<circle cx="720" cy="288" r="1.5" fill="#fef3c7"/>
<circle cx="350" cy="288" r="3" fill="#60a5fa" opacity="0.6"/>
<circle cx="450" cy="285" r="4" fill="#f472b6" opacity="0.7"/>
<circle cx="450" cy="285" r="2" fill="white"/>
<!-- River of gold -->
<path d="M 0,340 Q 100,330 200,345 Q 300,360 400,340 Q 500,320 600,340 Q 700,360 800,345" fill="none" stroke="url(#gn7river)" stroke-width="20" opacity="0.6"/>
<path d="M 0,340 Q 100,330 200,345 Q 300,360 400,340 Q 500,320 600,340 Q 700,360 800,345" fill="none" stroke="#fef3c7" stroke-width="5" opacity="0.3"/>
<!-- Sparkles on river -->
<circle cx="150" cy="340" r="2" fill="white" opacity="0.7"/>
<circle cx="350" cy="345" r="1.5" fill="white" opacity="0.6"/>
<circle cx="550" cy="335" r="2" fill="white" opacity="0.7"/>
<circle cx="750" cy="348" r="1.5" fill="white" opacity="0.5"/>
<!-- Beautiful trees -->
<rect x="100" y="180" width="10" height="100" fill="#6b4226"/>
<ellipse cx="105" cy="160" rx="35" ry="30" fill="#22c55e" opacity="0.8"/>
<ellipse cx="90" cy="170" rx="20" ry="18" fill="#4ade80" opacity="0.6"/>
<ellipse cx="120" cy="165" rx="18" ry="15" fill="#16a34a" opacity="0.7"/>
<rect x="650" y="190" width="10" height="90" fill="#6b4226"/>
<ellipse cx="655" cy="170" rx="35" ry="30" fill="#22c55e" opacity="0.8"/>
<ellipse cx="640" cy="178" rx="20" ry="18" fill="#4ade80" opacity="0.6"/>
<ellipse cx="670" cy="175" rx="18" ry="15" fill="#16a34a" opacity="0.7"/>
<!-- TREE OF KNOWLEDGE at center -->
<rect x="385" y="130" width="14" height="150" fill="#5c3a1e"/>
<rect x="370" y="200" width="5" height="40" fill="#6b4226" transform="rotate(-30, 372, 200)"/>
<rect x="410" y="190" width="5" height="35" fill="#6b4226" transform="rotate(25, 412, 190)"/>
<ellipse cx="395" cy="105" rx="55" ry="50" fill="#15803d" opacity="0.85"/>
<ellipse cx="375" cy="115" rx="30" ry="25" fill="#22c55e" opacity="0.7"/>
<ellipse cx="415" cy="110" rx="28" ry="22" fill="#16a34a" opacity="0.7"/>
<ellipse cx="395" cy="90" rx="25" ry="18" fill="#4ade80" opacity="0.6"/>
<!-- Glowing fruit on Tree of Knowledge -->
<circle cx="370" cy="110" r="6" fill="#ef4444" opacity="0.9"/>
<circle cx="370" cy="110" r="8" fill="#ef4444" opacity="0.3"/>
<circle cx="420" cy="100" r="5" fill="#ef4444" opacity="0.85"/>
<circle cx="420" cy="100" r="7" fill="#ef4444" opacity="0.25"/>
<circle cx="395" cy="85" r="5" fill="#ef4444" opacity="0.9"/>
<circle cx="395" cy="85" r="7" fill="#ef4444" opacity="0.3"/>
<circle cx="410" cy="120" r="4" fill="#ef4444" opacity="0.8"/>
<circle cx="380" cy="130" r="4" fill="#ef4444" opacity="0.8"/>
<!-- Serpent on tree -->
<path d="M 395,250 Q 405,230 395,210 Q 385,190 395,170 Q 405,155 410,145" fill="none" stroke="#15803d" stroke-width="4"/>
<path d="M 395,250 Q 405,230 395,210 Q 385,190 395,170 Q 405,155 410,145" fill="none" stroke="#22c55e" stroke-width="2"/>
<circle cx="412" cy="142" r="3" fill="#22c55e"/>
<circle cx="413" cy="141" r="1" fill="#ef4444"/>
<!-- Butterflies -->
<path d="M 250,150 L 245,145 L 250,148 L 255,145 Z" fill="#f472b6" opacity="0.6"/>
<path d="M 550,130 L 545,125 L 550,128 L 555,125 Z" fill="#c084fc" opacity="0.5"/>
</svg>`,

// ── MAP 8: Underworld (Hades) ──
gen_underworld: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="gn8sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1c1917"/>
        <stop offset="30%" stop-color="#451a03"/>
        <stop offset="60%" stop-color="#7c2d12"/>
        <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <radialGradient id="gn8fire" cx="0.5" cy="1" r="0.6">
        <stop offset="0%" stop-color="#f97316" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gn8styx" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="50%" stop-color="#334155"/>
        <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#gn8sky)"/>
<rect width="800" height="400" fill="url(#gn8fire)"/>
<!-- Dark cavern ceiling -->
<path d="M 0,0 L 0,60 Q 50,40 100,70 Q 180,30 250,65 Q 320,45 400,60 Q 480,35 550,70 Q 620,40 700,65 Q 760,45 800,55 L 800,0 Z" fill="#0a0a0a"/>
<path d="M 0,0 L 0,40 Q 80,25 150,50 Q 220,20 300,45 Q 380,30 450,50 Q 530,25 600,48 Q 680,30 750,50 Q 780,35 800,40 L 800,0 Z" fill="#1c1917"/>
<!-- Stalactites -->
<polygon points="120,50 125,90 130,50" fill="#292524"/>
<polygon points="280,40 285,85 290,40" fill="#292524"/>
<polygon points="450,45 455,80 460,45" fill="#292524"/>
<polygon points="600,50 604,95 608,50" fill="#292524"/>
<polygon points="720,35 724,75 728,35" fill="#292524"/>
<!-- Hellish red/orange sky glow -->
<ellipse cx="400" cy="150" rx="300" ry="80" fill="#dc2626" opacity="0.1"/>
<!-- Dark ground -->
<rect x="0" y="300" width="800" height="100" fill="#1c1917"/>
<rect x="0" y="280" width="800" height="25" fill="#292524"/>
<!-- Cracks with fire -->
<path d="M 100,300 L 105,310 L 95,325 L 108,340 L 100,360" fill="none" stroke="#f97316" stroke-width="2" opacity="0.8"/>
<path d="M 100,300 L 105,310 L 95,325 L 108,340 L 100,360" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.5"/>
<path d="M 300,295 L 305,308 L 298,320 L 310,335" fill="none" stroke="#f97316" stroke-width="2" opacity="0.7"/>
<path d="M 300,295 L 305,308 L 298,320 L 310,335" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.4"/>
<path d="M 550,300 L 545,315 L 555,330 L 548,350" fill="none" stroke="#f97316" stroke-width="2" opacity="0.8"/>
<path d="M 700,298 L 705,312 L 695,328 L 708,345" fill="none" stroke="#f97316" stroke-width="2" opacity="0.6"/>
<!-- Flames rising from cracks -->
<ellipse cx="100" cy="295" rx="10" ry="15" fill="#f97316" opacity="0.5"/>
<ellipse cx="100" cy="288" rx="6" ry="10" fill="#fbbf24" opacity="0.4"/>
<ellipse cx="300" cy="290" rx="8" ry="12" fill="#f97316" opacity="0.5"/>
<ellipse cx="300" cy="284" rx="5" ry="8" fill="#fbbf24" opacity="0.4"/>
<ellipse cx="550" cy="295" rx="12" ry="18" fill="#f97316" opacity="0.5"/>
<ellipse cx="550" cy="286" rx="7" ry="12" fill="#fbbf24" opacity="0.4"/>
<ellipse cx="550" cy="280" rx="4" ry="6" fill="#fef3c7" opacity="0.3"/>
<!-- River Styx -->
<path d="M 0,240 Q 100,220 200,235 Q 300,250 400,230 Q 500,210 600,235 Q 700,255 800,240" fill="none" stroke="url(#gn8styx)" stroke-width="40" opacity="0.8"/>
<path d="M 0,240 Q 100,220 200,235 Q 300,250 400,230 Q 500,210 600,235 Q 700,255 800,240" fill="none" stroke="#475569" stroke-width="35" opacity="0.5"/>
<!-- Styx surface shimmer -->
<path d="M 0,240 Q 100,220 200,235 Q 300,250 400,230 Q 500,210 600,235 Q 700,255 800,240" fill="none" stroke="#94a3b8" stroke-width="1" opacity="0.3"/>
<!-- Ghostly figures in Styx -->
<ellipse cx="200" cy="232" rx="8" ry="12" fill="white" opacity="0.1"/>
<ellipse cx="200" cy="225" rx="4" ry="5" fill="white" opacity="0.12"/>
<ellipse cx="450" cy="225" rx="7" ry="11" fill="white" opacity="0.1"/>
<ellipse cx="450" cy="218" rx="4" ry="5" fill="white" opacity="0.12"/>
<ellipse cx="650" cy="240" rx="8" ry="12" fill="white" opacity="0.08"/>
<ellipse cx="650" cy="233" rx="4" ry="5" fill="white" opacity="0.1"/>
<ellipse cx="350" cy="242" rx="6" ry="10" fill="white" opacity="0.09"/>
<!-- Massive Skull Gate -->
<rect x="330" y="100" width="140" height="140" fill="#292524" rx="5"/>
<ellipse cx="400" cy="120" rx="60" ry="50" fill="#44403c"/>
<ellipse cx="400" cy="125" rx="55" ry="45" fill="#292524"/>
<!-- Skull eyes -->
<ellipse cx="378" cy="130" rx="15" ry="12" fill="#0a0a0a"/>
<ellipse cx="422" cy="130" rx="15" ry="12" fill="#0a0a0a"/>
<ellipse cx="378" cy="130" rx="8" ry="6" fill="#dc2626" opacity="0.6"/>
<ellipse cx="422" cy="130" rx="8" ry="6" fill="#dc2626" opacity="0.6"/>
<!-- Skull nose -->
<polygon points="400,150 394,165 406,165" fill="#0a0a0a"/>
<!-- Skull teeth -->
<rect x="376" y="172" width="8" height="10" fill="#d6d3d1" rx="1"/>
<rect x="386" y="172" width="8" height="12" fill="#d6d3d1" rx="1"/>
<rect x="396" y="172" width="8" height="12" fill="#d6d3d1" rx="1"/>
<rect x="406" y="172" width="8" height="10" fill="#d6d3d1" rx="1"/>
<rect x="416" y="172" width="8" height="8" fill="#d6d3d1" rx="1"/>
<!-- Gate pillars -->
<rect x="310" y="90" width="25" height="160" fill="#292524" stroke="#44403c" stroke-width="1"/>
<rect x="465" y="90" width="25" height="160" fill="#292524" stroke="#44403c" stroke-width="1"/>
<!-- Skull decorations on pillars -->
<circle cx="322" cy="120" r="8" fill="#44403c"/>
<circle cx="319" cy="118" r="2" fill="#0a0a0a"/>
<circle cx="325" cy="118" r="2" fill="#0a0a0a"/>
<circle cx="478" cy="120" r="8" fill="#44403c"/>
<circle cx="475" cy="118" r="2" fill="#0a0a0a"/>
<circle cx="481" cy="118" r="2" fill="#0a0a0a"/>
</svg>`,

// ── MAP 9: Time Stream ──
gen_time_stream: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="gn9bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1e1b4b"/>
        <stop offset="30%" stop-color="#312e81"/>
        <stop offset="60%" stop-color="#4c1d95"/>
        <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <radialGradient id="gn9vortex" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="#a855f7" stop-opacity="0.4"/>
        <stop offset="40%" stop-color="#6366f1" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#gn9bg)"/>
<rect width="800" height="400" fill="url(#gn9vortex)"/>
<!-- Swirling temporal energy -->
<ellipse cx="400" cy="200" rx="300" ry="150" fill="none" stroke="#8b5cf6" stroke-width="2" opacity="0.2" transform="rotate(15, 400, 200)"/>
<ellipse cx="400" cy="200" rx="250" ry="120" fill="none" stroke="#a855f7" stroke-width="1.5" opacity="0.25" transform="rotate(-10, 400, 200)"/>
<ellipse cx="400" cy="200" rx="200" ry="90" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.3" transform="rotate(25, 400, 200)"/>
<ellipse cx="400" cy="200" rx="150" ry="65" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.35" transform="rotate(-20, 400, 200)"/>
<ellipse cx="400" cy="200" rx="100" ry="40" fill="none" stroke="#a855f7" stroke-width="1" opacity="0.4" transform="rotate(10, 400, 200)"/>
<ellipse cx="400" cy="200" rx="50" ry="20" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.5"/>
<!-- Temporal particles -->
<circle cx="200" cy="100" r="2" fill="#c084fc" opacity="0.6"/>
<circle cx="350" cy="80" r="1.5" fill="#818cf8" opacity="0.5"/>
<circle cx="500" cy="120" r="2" fill="#a855f7" opacity="0.6"/>
<circle cx="150" cy="250" r="1.5" fill="#c084fc" opacity="0.4"/>
<circle cx="600" cy="300" r="2" fill="#818cf8" opacity="0.5"/>
<circle cx="680" cy="150" r="1.5" fill="#a855f7" opacity="0.6"/>
<circle cx="100" cy="350" r="2" fill="#c084fc" opacity="0.4"/>
<circle cx="720" cy="80" r="1" fill="#818cf8" opacity="0.5"/>
<!-- Floating clock face 1 -->
<circle cx="180" cy="150" r="40" fill="#1e1b4b" stroke="#a855f7" stroke-width="1.5" opacity="0.6"/>
<circle cx="180" cy="150" r="35" fill="none" stroke="#c084fc" stroke-width="0.5" opacity="0.4"/>
<!-- Clock numbers -->
<text x="180" y="122" fill="#c084fc" font-size="8" text-anchor="middle" opacity="0.6">12</text>
<text x="207" y="153" fill="#c084fc" font-size="8" text-anchor="middle" opacity="0.6">3</text>
<text x="180" y="183" fill="#c084fc" font-size="8" text-anchor="middle" opacity="0.6">6</text>
<text x="153" y="153" fill="#c084fc" font-size="8" text-anchor="middle" opacity="0.6">9</text>
<!-- Clock hands -->
<line x1="180" y1="150" x2="180" y2="125" stroke="#c084fc" stroke-width="1.5" opacity="0.7"/>
<line x1="180" y1="150" x2="200" y2="145" stroke="#a855f7" stroke-width="1" opacity="0.6"/>
<circle cx="180" cy="150" r="2" fill="#c084fc"/>
<!-- Floating clock face 2 (distorted) -->
<ellipse cx="620" cy="130" rx="35" ry="45" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" opacity="0.5" transform="rotate(20, 620, 130)"/>
<text x="620" y="100" fill="#818cf8" font-size="7" text-anchor="middle" opacity="0.5">12</text>
<text x="648" y="133" fill="#818cf8" font-size="7" text-anchor="middle" opacity="0.5">3</text>
<text x="620" y="168" fill="#818cf8" font-size="7" text-anchor="middle" opacity="0.5">6</text>
<text x="592" y="133" fill="#818cf8" font-size="7" text-anchor="middle" opacity="0.5">9</text>
<line x1="620" y1="130" x2="620" y2="105" stroke="#818cf8" stroke-width="1.5" opacity="0.6"/>
<line x1="620" y1="130" x2="640" y2="120" stroke="#6366f1" stroke-width="1" opacity="0.5"/>
<!-- Floating clock face 3 -->
<circle cx="400" cy="300" r="30" fill="#1e1b4b" stroke="#a855f7" stroke-width="1" opacity="0.4"/>
<text x="400" y="278" fill="#a855f7" font-size="6" text-anchor="middle" opacity="0.4">12</text>
<text x="422" y="303" fill="#a855f7" font-size="6" text-anchor="middle" opacity="0.4">3</text>
<text x="400" y="326" fill="#a855f7" font-size="6" text-anchor="middle" opacity="0.4">6</text>
<text x="378" y="303" fill="#a855f7" font-size="6" text-anchor="middle" opacity="0.4">9</text>
<line x1="400" y1="300" x2="400" y2="280" stroke="#a855f7" stroke-width="1" opacity="0.5"/>
<line x1="400" y1="300" x2="415" y2="295" stroke="#8b5cf6" stroke-width="0.8" opacity="0.4"/>
<!-- Distorted hourglasses -->
<polygon points="100,280 130,280 115,310" fill="none" stroke="#a855f7" stroke-width="1" opacity="0.4"/>
<polygon points="100,340 130,340 115,310" fill="none" stroke="#a855f7" stroke-width="1" opacity="0.4"/>
<line x1="100" y1="280" x2="130" y2="280" stroke="#c084fc" stroke-width="1" opacity="0.3"/>
<line x1="100" y1="340" x2="130" y2="340" stroke="#c084fc" stroke-width="1" opacity="0.3"/>
<!-- Hourglass 2 (tilted) -->
<g transform="rotate(25, 680, 260)">
    <polygon points="660,230 700,230 680,255" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.35"/>
    <polygon points="660,280 700,280 680,255" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.35"/>
    <line x1="660" y1="230" x2="700" y2="230" stroke="#a855f7" stroke-width="1" opacity="0.3"/>
    <line x1="660" y1="280" x2="700" y2="280" stroke="#a855f7" stroke-width="1" opacity="0.3"/>
</g>
<!-- Past/present/future scene overlaps -->
<!-- Past - faded ancient ruins -->
<rect x="50" y="50" width="80" height="60" fill="#312e81" opacity="0.15" rx="3"/>
<rect x="55" y="60" width="10" height="45" fill="#6366f1" opacity="0.15"/>
<rect x="70" y="55" width="10" height="50" fill="#6366f1" opacity="0.12"/>
<rect x="85" y="60" width="10" height="45" fill="#6366f1" opacity="0.15"/>
<path d="M 50,55 L 90,35 L 130,55" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.15"/>
<!-- Future - geometric structure -->
<rect x="650" y="300" width="100" height="70" fill="#4c1d95" opacity="0.15" rx="3"/>
<polygon points="700,300 680,340 720,340" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.2"/>
<circle cx="700" cy="330" r="15" fill="none" stroke="#a855f7" stroke-width="1" opacity="0.15"/>
<line x1="660" y1="350" x2="740" y2="350" stroke="#c084fc" stroke-width="0.5" opacity="0.15"/>
<!-- Energy streams connecting time periods -->
<path d="M 90,80 Q 200,120 400,200 Q 600,280 700,335" fill="none" stroke="#a855f7" stroke-width="1" opacity="0.2" stroke-dasharray="5,5"/>
</svg>`,

// ── MAP 10: Singularity (Before Big Bang) ──
gen_singularity: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <radialGradient id="gn10core" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="#fef3c7"/>
        <stop offset="5%" stop-color="#fbbf24"/>
        <stop offset="15%" stop-color="#f97316"/>
        <stop offset="30%" stop-color="#7c2d12"/>
        <stop offset="50%" stop-color="#1c1917"/>
        <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <radialGradient id="gn10halo" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.3"/>
        <stop offset="20%" stop-color="#f97316" stop-opacity="0.15"/>
        <stop offset="40%" stop-color="#7c2d12" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
</defs>
<!-- Absolute darkness -->
<rect width="800" height="400" fill="#000000"/>
<!-- Very subtle deep void texture -->
<rect width="800" height="400" fill="url(#gn10halo)"/>
<!-- Energy spiraling inward - outer rings -->
<circle cx="400" cy="200" r="180" fill="none" stroke="#451a03" stroke-width="0.5" opacity="0.15"/>
<circle cx="400" cy="200" r="150" fill="none" stroke="#7c2d12" stroke-width="0.5" opacity="0.2"/>
<circle cx="400" cy="200" r="120" fill="none" stroke="#92400e" stroke-width="0.5" opacity="0.25"/>
<circle cx="400" cy="200" r="90" fill="none" stroke="#b45309" stroke-width="0.5" opacity="0.3"/>
<circle cx="400" cy="200" r="60" fill="none" stroke="#d97706" stroke-width="0.8" opacity="0.35"/>
<circle cx="400" cy="200" r="35" fill="none" stroke="#f59e0b" stroke-width="0.8" opacity="0.4"/>
<circle cx="400" cy="200" r="18" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.5"/>
<!-- Spiral energy arms -->
<path d="M 400,200 Q 450,150 500,160 Q 550,170 540,220 Q 530,270 480,260 Q 430,250 440,210" fill="none" stroke="#b45309" stroke-width="0.5" opacity="0.2"/>
<path d="M 400,200 Q 350,250 300,240 Q 250,230 260,180 Q 270,130 320,140 Q 370,150 360,190" fill="none" stroke="#b45309" stroke-width="0.5" opacity="0.2"/>
<path d="M 400,200 Q 420,130 380,100 Q 340,80 310,120 Q 290,160 330,180" fill="none" stroke="#92400e" stroke-width="0.5" opacity="0.15"/>
<path d="M 400,200 Q 380,270 420,300 Q 460,320 490,280 Q 510,240 470,220" fill="none" stroke="#92400e" stroke-width="0.5" opacity="0.15"/>
<!-- Quantum particles flickering -->
<circle cx="350" cy="170" r="1" fill="#fbbf24" opacity="0.4"/>
<circle cx="430" cy="160" r="0.8" fill="#f97316" opacity="0.35"/>
<circle cx="380" cy="230" r="1" fill="#fbbf24" opacity="0.3"/>
<circle cx="440" cy="220" r="0.8" fill="#d97706" opacity="0.35"/>
<circle cx="360" cy="190" r="0.5" fill="#fef3c7" opacity="0.5"/>
<circle cx="420" cy="180" r="0.5" fill="#fef3c7" opacity="0.4"/>
<circle cx="390" cy="210" r="0.5" fill="#fef3c7" opacity="0.45"/>
<!-- More distant particles -->
<circle cx="250" cy="150" r="0.8" fill="#b45309" opacity="0.15"/>
<circle cx="550" cy="250" r="0.8" fill="#b45309" opacity="0.15"/>
<circle cx="300" cy="300" r="0.5" fill="#92400e" opacity="0.1"/>
<circle cx="500" cy="100" r="0.5" fill="#92400e" opacity="0.1"/>
<circle cx="200" cy="200" r="0.5" fill="#7c2d12" opacity="0.08"/>
<circle cx="600" cy="200" r="0.5" fill="#7c2d12" opacity="0.08"/>
<circle cx="150" cy="300" r="0.5" fill="#451a03" opacity="0.05"/>
<circle cx="650" cy="100" r="0.5" fill="#451a03" opacity="0.05"/>
<!-- The INTENSE point of light at center -->
<circle cx="400" cy="200" r="8" fill="url(#gn10core)"/>
<circle cx="400" cy="200" r="5" fill="#fbbf24" opacity="0.9"/>
<circle cx="400" cy="200" r="3" fill="#fef3c7"/>
<circle cx="400" cy="200" r="1.5" fill="white"/>
<!-- Central light rays -->
<line x1="400" y1="200" x2="400" y2="180" stroke="#fbbf24" stroke-width="0.5" opacity="0.5"/>
<line x1="400" y1="200" x2="400" y2="220" stroke="#fbbf24" stroke-width="0.5" opacity="0.5"/>
<line x1="400" y1="200" x2="380" y2="200" stroke="#fbbf24" stroke-width="0.5" opacity="0.5"/>
<line x1="400" y1="200" x2="420" y2="200" stroke="#fbbf24" stroke-width="0.5" opacity="0.5"/>
<line x1="400" y1="200" x2="386" y2="186" stroke="#fbbf24" stroke-width="0.3" opacity="0.3"/>
<line x1="400" y1="200" x2="414" y2="186" stroke="#fbbf24" stroke-width="0.3" opacity="0.3"/>
<line x1="400" y1="200" x2="386" y2="214" stroke="#fbbf24" stroke-width="0.3" opacity="0.3"/>
<line x1="400" y1="200" x2="414" y2="214" stroke="#fbbf24" stroke-width="0.3" opacity="0.3"/>
<!-- Void emptiness emphasized by sparse distant light -->
<circle cx="100" cy="50" r="0.3" fill="#451a03" opacity="0.05"/>
<circle cx="700" cy="350" r="0.3" fill="#451a03" opacity="0.05"/>
<circle cx="50" cy="350" r="0.3" fill="#451a03" opacity="0.03"/>
<circle cx="750" cy="50" r="0.3" fill="#451a03" opacity="0.03"/>
</svg>`,

// ── MAP 11: Genesis (The Big Bang) ──
gen_genesis: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <radialGradient id="gn11bang" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="white"/>
        <stop offset="8%" stop-color="#fef3c7"/>
        <stop offset="20%" stop-color="#fbbf24"/>
        <stop offset="35%" stop-color="#f97316"/>
        <stop offset="50%" stop-color="#dc2626"/>
        <stop offset="65%" stop-color="#7c2d12"/>
        <stop offset="80%" stop-color="#312e81"/>
        <stop offset="100%" stop-color="#0c0a1a"/>
    </radialGradient>
    <radialGradient id="gn11halo2" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="#fef3c7" stop-opacity="0.8"/>
        <stop offset="30%" stop-color="#fbbf24" stop-opacity="0.4"/>
        <stop offset="60%" stop-color="#f97316" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#0c0a1a" stop-opacity="0"/>
    </radialGradient>
</defs>
<!-- Deep space background -->
<rect width="800" height="400" fill="#0c0a1a"/>
<!-- The EXPLOSION of light -->
<rect width="800" height="400" fill="url(#gn11bang)"/>
<rect width="800" height="400" fill="url(#gn11halo2)"/>
<!-- Cosmic radiation waves expanding -->
<circle cx="400" cy="200" r="300" fill="none" stroke="#f97316" stroke-width="1" opacity="0.12"/>
<circle cx="400" cy="200" r="260" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.15"/>
<circle cx="400" cy="200" r="220" fill="none" stroke="#f97316" stroke-width="1.5" opacity="0.18"/>
<circle cx="400" cy="200" r="180" fill="none" stroke="#fbbf24" stroke-width="1.5" opacity="0.22"/>
<circle cx="400" cy="200" r="140" fill="none" stroke="#f97316" stroke-width="2" opacity="0.25"/>
<circle cx="400" cy="200" r="100" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.3"/>
<circle cx="400" cy="200" r="60" fill="none" stroke="#fef3c7" stroke-width="2" opacity="0.4"/>
<circle cx="400" cy="200" r="30" fill="none" stroke="white" stroke-width="2" opacity="0.6"/>
<!-- Explosion rays -->
<line x1="400" y1="200" x2="100" y2="50" stroke="#fbbf24" stroke-width="2" opacity="0.15"/>
<line x1="400" y1="200" x2="700" y2="50" stroke="#fbbf24" stroke-width="2" opacity="0.15"/>
<line x1="400" y1="200" x2="50" y2="200" stroke="#fbbf24" stroke-width="2" opacity="0.12"/>
<line x1="400" y1="200" x2="750" y2="200" stroke="#fbbf24" stroke-width="2" opacity="0.12"/>
<line x1="400" y1="200" x2="100" y2="350" stroke="#fbbf24" stroke-width="2" opacity="0.15"/>
<line x1="400" y1="200" x2="700" y2="350" stroke="#fbbf24" stroke-width="2" opacity="0.15"/>
<line x1="400" y1="200" x2="400" y2="0" stroke="#fbbf24" stroke-width="2" opacity="0.18"/>
<line x1="400" y1="200" x2="400" y2="400" stroke="#fbbf24" stroke-width="2" opacity="0.18"/>
<!-- Diagonal rays -->
<line x1="400" y1="200" x2="200" y2="20" stroke="#f97316" stroke-width="1" opacity="0.1"/>
<line x1="400" y1="200" x2="600" y2="20" stroke="#f97316" stroke-width="1" opacity="0.1"/>
<line x1="400" y1="200" x2="200" y2="380" stroke="#f97316" stroke-width="1" opacity="0.1"/>
<line x1="400" y1="200" x2="600" y2="380" stroke="#f97316" stroke-width="1" opacity="0.1"/>
<line x1="400" y1="200" x2="0" y2="100" stroke="#f97316" stroke-width="1" opacity="0.08"/>
<line x1="400" y1="200" x2="800" y2="100" stroke="#f97316" stroke-width="1" opacity="0.08"/>
<line x1="400" y1="200" x2="0" y2="300" stroke="#f97316" stroke-width="1" opacity="0.08"/>
<line x1="400" y1="200" x2="800" y2="300" stroke="#f97316" stroke-width="1" opacity="0.08"/>
<!-- Matter forming - proto-galaxies spiraling -->
<g transform="translate(150, 100)" opacity="0.25">
    <ellipse cx="0" cy="0" rx="25" ry="10" fill="none" stroke="#c084fc" stroke-width="1" transform="rotate(30)"/>
    <ellipse cx="0" cy="0" rx="15" ry="5" fill="#a855f7" opacity="0.3" transform="rotate(30)"/>
    <circle cx="0" cy="0" r="3" fill="#c084fc" opacity="0.5"/>
</g>
<g transform="translate(650, 300)" opacity="0.2">
    <ellipse cx="0" cy="0" rx="30" ry="12" fill="none" stroke="#818cf8" stroke-width="1" transform="rotate(-20)"/>
    <ellipse cx="0" cy="0" rx="18" ry="6" fill="#6366f1" opacity="0.3" transform="rotate(-20)"/>
    <circle cx="0" cy="0" r="3" fill="#818cf8" opacity="0.5"/>
</g>
<g transform="translate(200, 320)" opacity="0.18">
    <ellipse cx="0" cy="0" rx="20" ry="8" fill="none" stroke="#f472b6" stroke-width="1" transform="rotate(45)"/>
    <ellipse cx="0" cy="0" rx="12" ry="4" fill="#ec4899" opacity="0.3" transform="rotate(45)"/>
    <circle cx="0" cy="0" r="2" fill="#f472b6" opacity="0.5"/>
</g>
<g transform="translate(600, 80)" opacity="0.15">
    <ellipse cx="0" cy="0" rx="18" ry="7" fill="none" stroke="#22d3ee" stroke-width="1" transform="rotate(-40)"/>
    <ellipse cx="0" cy="0" rx="10" ry="3" fill="#06b6d4" opacity="0.3" transform="rotate(-40)"/>
    <circle cx="0" cy="0" r="2" fill="#22d3ee" opacity="0.5"/>
</g>
<!-- Energy particles flying outward -->
<circle cx="300" cy="150" r="2" fill="#fbbf24" opacity="0.5"/>
<circle cx="500" cy="100" r="1.5" fill="#fef3c7" opacity="0.4"/>
<circle cx="250" cy="250" r="2" fill="#f97316" opacity="0.45"/>
<circle cx="550" cy="300" r="1.5" fill="#fbbf24" opacity="0.4"/>
<circle cx="350" cy="80" r="1" fill="#fef3c7" opacity="0.5"/>
<circle cx="450" cy="320" r="1" fill="#fef3c7" opacity="0.5"/>
<circle cx="180" cy="180" r="1.5" fill="#f97316" opacity="0.3"/>
<circle cx="620" cy="220" r="1.5" fill="#f97316" opacity="0.3"/>
<!-- Central bright core -->
<circle cx="400" cy="200" r="15" fill="#fbbf24" opacity="0.8"/>
<circle cx="400" cy="200" r="10" fill="#fef3c7" opacity="0.9"/>
<circle cx="400" cy="200" r="5" fill="white"/>
</svg>`,

// ── MAP 12: The Equation (FINAL MAP) ──
gen_the_equation: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <radialGradient id="gn12glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="#fef3c7" stop-opacity="0.5"/>
        <stop offset="30%" stop-color="#fbbf24" stop-opacity="0.2"/>
        <stop offset="60%" stop-color="#1e1b4b" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#0c0a1a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gn12bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0c0a1a"/>
        <stop offset="50%" stop-color="#1e1b4b"/>
        <stop offset="100%" stop-color="#0c0a1a"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#gn12bg)"/>
<rect width="800" height="400" fill="url(#gn12glow)"/>
<!-- Grid lines extending to infinity (perspective) -->
<!-- Horizontal grid -->
<line x1="0" y1="50" x2="800" y2="50" stroke="#6366f1" stroke-width="0.3" opacity="0.15"/>
<line x1="0" y1="100" x2="800" y2="100" stroke="#6366f1" stroke-width="0.3" opacity="0.18"/>
<line x1="0" y1="150" x2="800" y2="150" stroke="#6366f1" stroke-width="0.3" opacity="0.22"/>
<line x1="0" y1="200" x2="800" y2="200" stroke="#818cf8" stroke-width="0.5" opacity="0.25"/>
<line x1="0" y1="250" x2="800" y2="250" stroke="#6366f1" stroke-width="0.3" opacity="0.22"/>
<line x1="0" y1="300" x2="800" y2="300" stroke="#6366f1" stroke-width="0.3" opacity="0.18"/>
<line x1="0" y1="350" x2="800" y2="350" stroke="#6366f1" stroke-width="0.3" opacity="0.15"/>
<!-- Vertical grid -->
<line x1="50" y1="0" x2="50" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.12"/>
<line x1="100" y1="0" x2="100" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.14"/>
<line x1="150" y1="0" x2="150" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.16"/>
<line x1="200" y1="0" x2="200" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.18"/>
<line x1="250" y1="0" x2="250" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.2"/>
<line x1="300" y1="0" x2="300" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.22"/>
<line x1="350" y1="0" x2="350" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.24"/>
<line x1="400" y1="0" x2="400" y2="400" stroke="#818cf8" stroke-width="0.5" opacity="0.25"/>
<line x1="450" y1="0" x2="450" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.24"/>
<line x1="500" y1="0" x2="500" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.22"/>
<line x1="550" y1="0" x2="550" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.2"/>
<line x1="600" y1="0" x2="600" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.18"/>
<line x1="650" y1="0" x2="650" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.16"/>
<line x1="700" y1="0" x2="700" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.14"/>
<line x1="750" y1="0" x2="750" y2="400" stroke="#6366f1" stroke-width="0.3" opacity="0.12"/>
<!-- Perspective grid converging at center -->
<line x1="0" y1="0" x2="400" y2="200" stroke="#4f46e5" stroke-width="0.3" opacity="0.1"/>
<line x1="800" y1="0" x2="400" y2="200" stroke="#4f46e5" stroke-width="0.3" opacity="0.1"/>
<line x1="0" y1="400" x2="400" y2="200" stroke="#4f46e5" stroke-width="0.3" opacity="0.1"/>
<line x1="800" y1="400" x2="400" y2="200" stroke="#4f46e5" stroke-width="0.3" opacity="0.1"/>
<!-- Floating equations (raining down) -->
<text x="80" y="40" fill="#a855f7" font-size="10" opacity="0.3" font-family="serif">∫ψ*ψ dτ = 1</text>
<text x="600" y="60" fill="#818cf8" font-size="9" opacity="0.25" font-family="serif">∇²φ = -ρ/ε₀</text>
<text x="200" y="80" fill="#a855f7" font-size="8" opacity="0.2" font-family="serif">F = ma</text>
<text x="550" y="100" fill="#c084fc" font-size="9" opacity="0.25" font-family="serif">S = k ln W</text>
<text x="100" y="130" fill="#818cf8" font-size="10" opacity="0.3" font-family="serif">iħ∂ψ/∂t = Ĥψ</text>
<text x="650" y="150" fill="#a855f7" font-size="8" opacity="0.2" font-family="serif">ds² = -c²dt²</text>
<text x="50" y="220" fill="#c084fc" font-size="9" opacity="0.2" font-family="serif">Rμν = 8πG Tμν</text>
<text x="680" y="240" fill="#818cf8" font-size="10" opacity="0.25" font-family="serif">ΔxΔp ≥ ħ/2</text>
<text x="120" y="280" fill="#a855f7" font-size="8" opacity="0.2" font-family="serif">∂F/∂x = 0</text>
<text x="600" y="310" fill="#c084fc" font-size="9" opacity="0.2" font-family="serif">λ = h/mv</text>
<text x="80" y="340" fill="#818cf8" font-size="8" opacity="0.15" font-family="serif">∇ × E = -∂B/∂t</text>
<text x="650" y="360" fill="#a855f7" font-size="9" opacity="0.2" font-family="serif">PV = nRT</text>
<text x="200" y="370" fill="#c084fc" font-size="8" opacity="0.15" font-family="serif">a² + b² = c²</text>
<text x="500" y="380" fill="#818cf8" font-size="8" opacity="0.15" font-family="serif">eⁱᵖ + 1 = 0</text>
<!-- More symbols raining -->
<text x="300" y="30" fill="#6366f1" font-size="12" opacity="0.15" font-family="serif">∑</text>
<text x="470" y="55" fill="#6366f1" font-size="10" opacity="0.12" font-family="serif">∏</text>
<text x="150" y="170" fill="#6366f1" font-size="14" opacity="0.12" font-family="serif">∞</text>
<text x="630" y="190" fill="#6366f1" font-size="11" opacity="0.12" font-family="serif">∂</text>
<text x="250" y="320" fill="#6366f1" font-size="12" opacity="0.1" font-family="serif">√</text>
<text x="530" y="340" fill="#6366f1" font-size="10" opacity="0.1" font-family="serif">π</text>
<text x="720" y="290" fill="#6366f1" font-size="13" opacity="0.12" font-family="serif">Ω</text>
<text x="50" y="380" fill="#6366f1" font-size="11" opacity="0.1" font-family="serif">∇</text>
<!-- THE FUNDAMENTAL EQUATION — glowing gold at center -->
<!-- Glow behind equation -->
<ellipse cx="400" cy="195" rx="100" ry="35" fill="#fbbf24" opacity="0.08"/>
<ellipse cx="400" cy="195" rx="70" ry="25" fill="#fbbf24" opacity="0.12"/>
<ellipse cx="400" cy="195" rx="45" ry="18" fill="#fef3c7" opacity="0.15"/>
<!-- E = mc² -->
<text x="400" y="210" fill="#fbbf24" font-size="42" text-anchor="middle" font-family="serif" font-weight="bold" opacity="0.9">E = mc²</text>
<!-- Equation inner glow -->
<text x="400" y="210" fill="#fef3c7" font-size="42" text-anchor="middle" font-family="serif" font-weight="bold" opacity="0.4">E = mc²</text>
<!-- Light emanating from equation -->
<line x1="330" y1="195" x2="280" y2="195" stroke="#fbbf24" stroke-width="0.5" opacity="0.3"/>
<line x1="470" y1="195" x2="520" y2="195" stroke="#fbbf24" stroke-width="0.5" opacity="0.3"/>
<line x1="350" y1="175" x2="310" y2="150" stroke="#fbbf24" stroke-width="0.5" opacity="0.2"/>
<line x1="450" y1="175" x2="490" y2="150" stroke="#fbbf24" stroke-width="0.5" opacity="0.2"/>
<line x1="350" y1="215" x2="310" y2="240" stroke="#fbbf24" stroke-width="0.5" opacity="0.2"/>
<line x1="450" y1="215" x2="490" y2="240" stroke="#fbbf24" stroke-width="0.5" opacity="0.2"/>
<line x1="400" y1="170" x2="400" y2="140" stroke="#fbbf24" stroke-width="0.5" opacity="0.25"/>
<line x1="400" y1="220" x2="400" y2="250" stroke="#fbbf24" stroke-width="0.5" opacity="0.25"/>
<!-- Floating golden particles around equation -->
<circle cx="340" cy="180" r="1.5" fill="#fbbf24" opacity="0.5"/>
<circle cx="460" cy="210" r="1" fill="#fef3c7" opacity="0.4"/>
<circle cx="370" cy="220" r="1" fill="#fbbf24" opacity="0.4"/>
<circle cx="430" cy="175" r="1.5" fill="#fef3c7" opacity="0.5"/>
<circle cx="310" cy="200" r="1" fill="#fbbf24" opacity="0.3"/>
<circle cx="490" cy="190" r="1" fill="#fef3c7" opacity="0.3"/>
</svg>`

};

if (typeof vectors !== 'undefined') Object.assign(vectors, genesisMaps);
