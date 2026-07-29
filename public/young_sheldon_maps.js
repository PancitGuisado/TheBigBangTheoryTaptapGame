// ============================================================
// YOUNG SHELDON MAPS — Texas-themed backgrounds for Wave 80+ 
// Medford, Texas locations from the Young Sheldon era
// ============================================================

const youngSheldonMaps = {

// ── MAP 1: Cooper Family Home (Wave 81-84) ──
ys_cooper_home: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<!-- Texas sky - warm sunset -->
<defs>
    <linearGradient id="ys1sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f97316"/>
        <stop offset="40%" stop-color="#fb923c"/>
        <stop offset="70%" stop-color="#fde68a"/>
        <stop offset="100%" stop-color="#a3e635"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#ys1sky)"/>
<!-- Sun -->
<circle cx="650" cy="80" r="40" fill="#fbbf24" opacity="0.8"/>
<circle cx="650" cy="80" r="30" fill="#fef3c7"/>
<!-- Ground - Texas lawn -->
<rect x="0" y="260" width="800" height="140" fill="#65a30d"/>
<rect x="0" y="280" width="800" height="120" fill="#4d7c0f"/>
<!-- Dirt driveway -->
<path d="M 300,400 L 320,260 L 480,260 L 500,400 Z" fill="#a16207"/>
<path d="M 310,400 L 325,260 L 475,260 L 490,400 Z" fill="#b45309" opacity="0.5"/>
<!-- Cooper House - simple Texas ranch -->
<rect x="200" y="130" width="400" height="130" fill="#d6d3d1" stroke="#a8a29e" stroke-width="2"/>
<!-- Roof -->
<path d="M 180,130 L 400,50 L 620,130 Z" fill="#78350f"/>
<path d="M 185,130 L 400,55 L 615,130 Z" fill="#92400e"/>
<!-- Front door -->
<rect x="370" y="170" width="60" height="90" fill="#78350f" rx="2"/>
<circle cx="420" cy="220" r="3" fill="#fbbf24"/>
<!-- Windows -->
<rect x="240" y="170" width="80" height="60" fill="#bfdbfe" stroke="#f5f5f4" stroke-width="3"/>
<line x1="280" y1="170" x2="280" y2="230" stroke="#f5f5f4" stroke-width="2"/>
<line x1="240" y1="200" x2="320" y2="200" stroke="#f5f5f4" stroke-width="2"/>
<rect x="480" y="170" width="80" height="60" fill="#bfdbfe" stroke="#f5f5f4" stroke-width="3"/>
<line x1="520" y1="170" x2="520" y2="230" stroke="#f5f5f4" stroke-width="2"/>
<line x1="480" y1="200" x2="560" y2="200" stroke="#f5f5f4" stroke-width="2"/>
<!-- Garage -->
<rect x="600" y="160" width="100" height="100" fill="#d6d3d1" stroke="#a8a29e" stroke-width="2"/>
<rect x="610" y="190" width="80" height="70" fill="#57534e"/>
<!-- Porch -->
<rect x="340" y="255" width="120" height="5" fill="#a8a29e"/>
<!-- Steps -->
<rect x="360" y="258" width="80" height="5" fill="#78716c"/>
<rect x="365" y="262" width="70" height="4" fill="#78716c"/>
<!-- Mailbox -->
<rect x="160" y="230" width="4" height="30" fill="#57534e"/>
<rect x="148" y="220" width="30" height="18" fill="#3b82f6"/>
<!-- Fence -->
<line x1="0" y1="260" x2="200" y2="260" stroke="#f5f5f4" stroke-width="3"/>
<line x1="600" y1="260" x2="800" y2="260" stroke="#f5f5f4" stroke-width="3"/>
<!-- Fence posts -->
<rect x="20" y="245" width="4" height="20" fill="#f5f5f4"/>
<rect x="60" y="245" width="4" height="20" fill="#f5f5f4"/>
<rect x="100" y="245" width="4" height="20" fill="#f5f5f4"/>
<rect x="140" y="245" width="4" height="20" fill="#f5f5f4"/>
<rect x="640" y="245" width="4" height="20" fill="#f5f5f4"/>
<rect x="680" y="245" width="4" height="20" fill="#f5f5f4"/>
<rect x="720" y="245" width="4" height="20" fill="#f5f5f4"/>
<rect x="760" y="245" width="4" height="20" fill="#f5f5f4"/>
<!-- Trees -->
<rect x="90" y="180" width="10" height="80" fill="#78350f"/>
<ellipse cx="95" cy="170" rx="30" ry="35" fill="#16a34a"/>
<rect x="700" y="190" width="10" height="70" fill="#78350f"/>
<ellipse cx="705" cy="180" rx="25" ry="30" fill="#15803d"/>
<!-- Texas flag on house -->
<rect x="250" y="110" width="30" height="20" fill="#1e3a8a"/>
<rect x="280" y="110" width="20" height="10" fill="#f5f5f4"/>
<rect x="280" y="120" width="20" height="10" fill="#dc2626"/>
<circle cx="262" cy="120" r="4" fill="#f5f5f4"/>
</svg>`,

// ── MAP 2: Medford High School (Wave 85-88) ──
ys_high_school: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="ys2sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e3a5f"/>
        <stop offset="50%" stop-color="#374151"/>
        <stop offset="100%" stop-color="#1f2937"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#ys2sky)"/>
<!-- Storm clouds -->
<ellipse cx="200" cy="60" rx="120" ry="40" fill="#374151" opacity="0.7"/>
<ellipse cx="500" cy="40" rx="150" ry="50" fill="#1f2937" opacity="0.8"/>
<ellipse cx="700" cy="70" rx="100" ry="35" fill="#374151" opacity="0.6"/>
<!-- Lightning flash -->
<path d="M 500,80 L 490,120 L 500,120 L 485,160" stroke="#fbbf24" stroke-width="2" fill="none" opacity="0.4">
    <animate attributeName="opacity" values="0;0.8;0;0;0.6;0;0" dur="4s" repeatCount="indefinite"/>
</path>
<!-- Ground -->
<rect x="0" y="280" width="800" height="120" fill="#374151"/>
<rect x="0" y="290" width="800" height="110" fill="#1f2937"/>
<!-- Parking lot lines -->
<rect x="50" y="300" width="2" height="40" fill="#fbbf24" opacity="0.3"/>
<rect x="100" y="300" width="2" height="40" fill="#fbbf24" opacity="0.3"/>
<rect x="150" y="300" width="2" height="40" fill="#fbbf24" opacity="0.3"/>
<!-- School building - long brick -->
<rect x="100" y="120" width="600" height="160" fill="#7f1d1d"/>
<rect x="100" y="120" width="600" height="160" fill="#991b1b" opacity="0.5"/>
<!-- Brick texture -->
<line x1="100" y1="150" x2="700" y2="150" stroke="#7f1d1d" stroke-width="1" opacity="0.5"/>
<line x1="100" y1="180" x2="700" y2="180" stroke="#7f1d1d" stroke-width="1" opacity="0.5"/>
<line x1="100" y1="210" x2="700" y2="210" stroke="#7f1d1d" stroke-width="1" opacity="0.5"/>
<line x1="100" y1="240" x2="700" y2="240" stroke="#7f1d1d" stroke-width="1" opacity="0.5"/>
<!-- Main entrance -->
<rect x="350" y="160" width="100" height="120" fill="#78350f" rx="3"/>
<rect x="360" y="170" width="35" height="110" fill="#451a03"/>
<rect x="405" y="170" width="35" height="110" fill="#451a03"/>
<!-- Double door handles -->
<circle cx="390" cy="230" r="3" fill="#fbbf24"/>
<circle cx="410" cy="230" r="3" fill="#fbbf24"/>
<!-- Entrance overhang -->
<rect x="340" y="150" width="120" height="12" fill="#57534e"/>
<!-- School sign -->
<rect x="330" y="100" width="140" height="35" fill="#1e293b" rx="3"/>
<text x="400" y="122" text-anchor="middle" font-size="12" fill="#f5f5f4" font-weight="bold">MEDFORD HIGH</text>
<!-- Windows - rows of them -->
<rect x="130" y="140" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="190" y="140" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="250" y="140" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="510" y="140" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="570" y="140" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="630" y="140" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<!-- Second floor windows -->
<rect x="130" y="195" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="190" y="195" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="250" y="195" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="510" y="195" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="570" y="195" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<rect x="630" y="195" width="40" height="30" fill="#1e3a5f" stroke="#44403c" stroke-width="2"/>
<!-- Broken windows (corrupted) -->
<path d="M 140,150 L 160,165" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
<path d="M 570,200 L 600,220" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
<!-- Flagpole -->
<rect x="750" y="100" width="3" height="180" fill="#94a3b8"/>
<!-- Toxic green mist around school -->
<ellipse cx="200" cy="280" rx="60" ry="15" fill="#22c55e" opacity="0.1"/>
<ellipse cx="600" cy="280" rx="80" ry="15" fill="#22c55e" opacity="0.08"/>
</svg>`,

// ── MAP 3: Texas Ranch (Wave 89-92) ──
ys_texas_ranch: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="ys3sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#7c2d12"/>
        <stop offset="40%" stop-color="#c2410c"/>
        <stop offset="70%" stop-color="#ea580c"/>
        <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#ys3sky)"/>
<!-- Dusty sun -->
<circle cx="400" cy="60" r="50" fill="#fbbf24" opacity="0.6"/>
<circle cx="400" cy="60" r="35" fill="#fef3c7" opacity="0.8"/>
<!-- Ground - dry Texas dirt -->
<rect x="0" y="250" width="800" height="150" fill="#92400e"/>
<rect x="0" y="260" width="800" height="140" fill="#78350f"/>
<!-- Dry grass patches -->
<ellipse cx="100" cy="300" rx="40" ry="8" fill="#a16207" opacity="0.4"/>
<ellipse cx="350" cy="320" rx="50" ry="6" fill="#a16207" opacity="0.3"/>
<ellipse cx="650" cy="290" rx="45" ry="7" fill="#a16207" opacity="0.4"/>
<!-- Barn -->
<rect x="50" y="150" width="200" height="110" fill="#991b1b"/>
<path d="M 40,150 L 150,80 L 260,150 Z" fill="#7f1d1d"/>
<!-- Barn door -->
<rect x="120" y="190" width="60" height="70" fill="#451a03"/>
<line x1="150" y1="190" x2="150" y2="260" stroke="#78350f" stroke-width="2"/>
<!-- Barn X pattern -->
<path d="M 120,190 L 180,260 M 180,190 L 120,260" stroke="#78350f" stroke-width="1.5" opacity="0.5"/>
<!-- Hay bales -->
<ellipse cx="280" cy="250" rx="20" ry="15" fill="#d97706"/>
<ellipse cx="310" cy="255" rx="18" ry="12" fill="#b45309"/>
<!-- Wooden fence - ranch style -->
<line x1="0" y1="255" x2="800" y2="255" stroke="#78350f" stroke-width="4"/>
<line x1="0" y1="245" x2="800" y2="245" stroke="#78350f" stroke-width="3"/>
<!-- Fence posts -->
<rect x="50" y="230" width="6" height="30" fill="#78350f"/>
<rect x="130" y="230" width="6" height="30" fill="#78350f"/>
<rect x="330" y="230" width="6" height="30" fill="#78350f"/>
<rect x="450" y="230" width="6" height="30" fill="#78350f"/>
<rect x="570" y="230" width="6" height="30" fill="#78350f"/>
<rect x="690" y="230" width="6" height="30" fill="#78350f"/>
<!-- Windmill -->
<rect x="580" y="120" width="8" height="140" fill="#78716c"/>
<circle cx="584" cy="120" r="35" fill="none" stroke="#94a3b8" stroke-width="2"/>
<line x1="584" y1="85" x2="584" y2="155" stroke="#94a3b8" stroke-width="2"/>
<line x1="549" y1="120" x2="619" y2="120" stroke="#94a3b8" stroke-width="2"/>
<line x1="559" y1="95" x2="609" y2="145" stroke="#94a3b8" stroke-width="1.5"/>
<line x1="559" y1="145" x2="609" y2="95" stroke="#94a3b8" stroke-width="1.5"/>
<!-- Water tank -->
<ellipse cx="710" cy="190" rx="30" ry="20" fill="#64748b"/>
<rect x="680" y="190" width="60" height="50" fill="#64748b"/>
<rect x="695" y="240" width="6" height="20" fill="#475569"/>
<rect x="719" y="240" width="6" height="20" fill="#475569"/>
<!-- Cactus -->
<rect x="420" y="210" width="8" height="45" fill="#15803d" rx="3"/>
<path d="M 420,225 Q 408,220 410,210" stroke="#15803d" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M 428,230 Q 440,225 438,215" stroke="#15803d" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- Tumbleweeds -->
<circle cx="500" cy="280" r="12" fill="none" stroke="#a16207" stroke-width="2" opacity="0.5"/>
<circle cx="750" cy="300" r="8" fill="none" stroke="#a16207" stroke-width="1.5" opacity="0.4"/>
<!-- Corruption marks on ground -->
<ellipse cx="300" cy="280" rx="30" ry="4" fill="#7c3aed" opacity="0.15"/>
<ellipse cx="550" cy="300" rx="25" ry="3" fill="#7c3aed" opacity="0.12"/>
</svg>`,

// ── MAP 4: Texas Desert Wasteland (Wave 93-96) ──
ys_desert: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="ys4sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1c1917"/>
        <stop offset="30%" stop-color="#292524"/>
        <stop offset="60%" stop-color="#44403c"/>
        <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#ys4sky)"/>
<!-- Blood red moon -->
<circle cx="150" cy="80" r="35" fill="#dc2626" opacity="0.6"/>
<circle cx="150" cy="80" r="30" fill="#ef4444" opacity="0.3"/>
<!-- Stars -->
<circle cx="50" cy="30" r="1" fill="#f5f5f4" opacity="0.6"/>
<circle cx="300" cy="20" r="1" fill="#f5f5f4" opacity="0.5"/>
<circle cx="500" cy="50" r="1.5" fill="#f5f5f4" opacity="0.4"/>
<circle cx="700" cy="25" r="1" fill="#f5f5f4" opacity="0.6"/>
<circle cx="250" cy="60" r="1" fill="#f5f5f4" opacity="0.3"/>
<!-- Desert ground -->
<rect x="0" y="280" width="800" height="120" fill="#78350f"/>
<rect x="0" y="290" width="800" height="110" fill="#713f12"/>
<!-- Sand dunes -->
<ellipse cx="200" cy="280" rx="150" ry="20" fill="#92400e"/>
<ellipse cx="600" cy="275" rx="180" ry="25" fill="#92400e"/>
<!-- Rock formations -->
<path d="M 50,280 L 40,200 L 60,180 L 80,210 L 90,280 Z" fill="#57534e"/>
<path d="M 700,280 L 690,190 L 710,170 L 730,180 L 750,200 L 760,280 Z" fill="#44403c"/>
<path d="M 720,280 L 740,220 L 760,230 L 770,280 Z" fill="#57534e"/>
<!-- Destroyed military vehicle -->
<rect x="300" y="260" width="80" height="25" fill="#374151" rx="3"/>
<circle cx="310" cy="288" r="10" fill="#1f2937" stroke="#374151" stroke-width="2"/>
<circle cx="370" cy="288" r="10" fill="#1f2937" stroke="#374151" stroke-width="2"/>
<!-- Turret (destroyed) -->
<rect x="320" y="248" width="40" height="14" fill="#374151" rx="2"/>
<rect x="355" y="250" width="30" height="6" fill="#1f2937" rx="1" transform="rotate(-15 370 253)"/>
<!-- Fire on vehicle -->
<path d="M 340,248 Q 338,238 342,230" stroke="#f59e0b" stroke-width="3" fill="none" opacity="0.6">
    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" repeatCount="indefinite"/>
</path>
<!-- Barbed wire -->
<line x1="430" y1="270" x2="580" y2="270" stroke="#94a3b8" stroke-width="1.5"/>
<!-- Wire barbs -->
<path d="M 450,268 L 452,264 L 454,268 M 480,268 L 482,264 L 484,268 M 520,268 L 522,264 L 524,268 M 560,268 L 562,264 L 564,268" stroke="#94a3b8" stroke-width="1"/>
<!-- Sandbags -->
<ellipse cx="440" cy="280" rx="15" ry="8" fill="#a16207"/>
<ellipse cx="458" cy="282" rx="12" ry="7" fill="#92400e"/>
<!-- Skulls on ground -->
<circle cx="180" cy="300" r="5" fill="#e7e5e4" opacity="0.3"/>
<circle cx="620" cy="310" r="4" fill="#e7e5e4" opacity="0.25"/>
<!-- Smoke/dust -->
<ellipse cx="400" cy="300" rx="80" ry="15" fill="#78716c" opacity="0.15"/>
<!-- Red corruption energy in sky -->
<path d="M 0,120 Q 200,100 400,130 Q 600,110 800,120" stroke="#dc2626" stroke-width="1" fill="none" opacity="0.2"/>
</svg>`,

// ── MAP 5: Texas Natural History Museum (Wave 97-100) ──
ys_museum: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="ys5sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
</defs>
<rect width="800" height="400" fill="url(#ys5sky)"/>
<!-- Museum interior - marble floor -->
<rect x="0" y="280" width="800" height="120" fill="#d6d3d1"/>
<rect x="0" y="280" width="800" height="120" fill="#e7e5e4" opacity="0.5"/>
<!-- Floor tile pattern -->
<line x1="0" y1="320" x2="800" y2="320" stroke="#a8a29e" stroke-width="1" opacity="0.3"/>
<line x1="0" y1="360" x2="800" y2="360" stroke="#a8a29e" stroke-width="1" opacity="0.3"/>
<line x1="200" y1="280" x2="200" y2="400" stroke="#a8a29e" stroke-width="1" opacity="0.3"/>
<line x1="400" y1="280" x2="400" y2="400" stroke="#a8a29e" stroke-width="1" opacity="0.3"/>
<line x1="600" y1="280" x2="600" y2="400" stroke="#a8a29e" stroke-width="1" opacity="0.3"/>
<!-- Marble walls -->
<rect x="0" y="0" width="800" height="280" fill="#1e293b"/>
<!-- Pillars -->
<rect x="30" y="50" width="30" height="230" fill="#334155"/>
<rect x="30" y="40" width="30" height="15" fill="#475569"/>
<rect x="740" y="50" width="30" height="230" fill="#334155"/>
<rect x="740" y="40" width="30" height="15" fill="#475569"/>
<!-- T-Rex skeleton display (broken out!) -->
<path d="M 350,100 Q 380,60 420,80 L 450,70 L 460,85" stroke="#e7e5e4" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- Rib cage -->
<path d="M 380,90 L 370,120 M 390,85 L 385,115 M 400,82 L 398,112 M 410,80 L 410,110" stroke="#e7e5e4" stroke-width="2" opacity="0.6"/>
<!-- Broken display case -->
<rect x="300" y="220" width="200" height="60" fill="#475569" stroke="#64748b" stroke-width="2"/>
<path d="M 380,220 L 400,190 L 420,220" stroke="#64748b" stroke-width="1" fill="none" opacity="0.5"/>
<!-- Shattered glass -->
<path d="M 350,220 L 340,210 M 360,220 L 365,205 M 450,220 L 460,208" stroke="#94a3b8" stroke-width="0.8" opacity="0.4"/>
<!-- Museum sign -->
<rect x="250" y="20" width="300" height="30" fill="#1e293b" stroke="#475569" stroke-width="1"/>
<text x="400" y="40" text-anchor="middle" font-size="14" fill="#94a3b8" font-weight="bold">TEXAS NATURAL HISTORY MUSEUM</text>
<!-- Display cases on walls -->
<rect x="100" y="100" width="100" height="120" fill="#0f172a" stroke="#475569" stroke-width="2" rx="3"/>
<rect x="600" y="100" width="100" height="120" fill="#0f172a" stroke="#475569" stroke-width="2" rx="3"/>
<!-- Exhibit lights -->
<circle cx="150" cy="90" r="4" fill="#fbbf24" opacity="0.4"/>
<circle cx="650" cy="90" r="4" fill="#fbbf24" opacity="0.4"/>
<circle cx="400" cy="60" r="5" fill="#fbbf24" opacity="0.3"/>
<!-- Smoke/dust from destruction -->
<ellipse cx="400" cy="240" rx="60" ry="10" fill="#78716c" opacity="0.15"/>
<!-- Red alarm lights -->
<circle cx="80" cy="30" r="5" fill="#ef4444" opacity="0.5">
    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" repeatCount="indefinite"/>
</circle>
<circle cx="720" cy="30" r="5" fill="#ef4444" opacity="0.5">
    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" repeatCount="indefinite"/>
</circle>
</svg>`,

// ── MAP 6: Dr. Chaos's Secret Lab (Wave 101+) ──
ys_chaos_lab: `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="w-full h-full">
<defs>
    <linearGradient id="ys6bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#09090b"/>
        <stop offset="50%" stop-color="#18181b"/>
        <stop offset="100%" stop-color="#1c1917"/>
    </linearGradient>
    <radialGradient id="ys6glow" cx="50%" cy="40%">
        <stop offset="0%" stop-color="#22c55e" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
    </radialGradient>
</defs>
<rect width="800" height="400" fill="url(#ys6bg)"/>
<rect width="800" height="400" fill="url(#ys6glow)"/>
<!-- Metal floor -->
<rect x="0" y="300" width="800" height="100" fill="#1f2937"/>
<!-- Floor grating -->
<line x1="0" y1="320" x2="800" y2="320" stroke="#374151" stroke-width="1" opacity="0.4"/>
<line x1="0" y1="340" x2="800" y2="340" stroke="#374151" stroke-width="1" opacity="0.4"/>
<line x1="0" y1="360" x2="800" y2="360" stroke="#374151" stroke-width="1" opacity="0.4"/>
<line x1="0" y1="380" x2="800" y2="380" stroke="#374151" stroke-width="1" opacity="0.4"/>
<!-- Rivet pattern -->
<circle cx="100" cy="310" r="2" fill="#374151"/>
<circle cx="300" cy="310" r="2" fill="#374151"/>
<circle cx="500" cy="310" r="2" fill="#374151"/>
<circle cx="700" cy="310" r="2" fill="#374151"/>
<!-- Wall panels -->
<rect x="0" y="0" width="800" height="300" fill="#1c1917"/>
<rect x="0" y="0" width="30" height="300" fill="#27272a"/>
<rect x="770" y="0" width="30" height="300" fill="#27272a"/>
<!-- Giant tesla coils -->
<rect x="60" y="80" width="20" height="220" fill="#475569"/>
<circle cx="70" cy="80" r="25" fill="none" stroke="#22c55e" stroke-width="2" opacity="0.4">
    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite"/>
</circle>
<circle cx="70" cy="80" r="15" fill="none" stroke="#22c55e" stroke-width="1.5" opacity="0.3">
    <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.5s" repeatCount="indefinite"/>
</circle>
<rect x="720" y="80" width="20" height="220" fill="#475569"/>
<circle cx="730" cy="80" r="25" fill="none" stroke="#22c55e" stroke-width="2" opacity="0.4">
    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite"/>
</circle>
<!-- Lightning between coils -->
<path d="M 90,80 Q 200,60 300,90 Q 400,50 500,80 Q 600,60 710,80" stroke="#22c55e" stroke-width="1.5" fill="none" opacity="0.3">
    <animate attributeName="opacity" values="0;0.6;0;0;0.4;0" dur="3s" repeatCount="indefinite"/>
</path>
<!-- Bubbling vats -->
<rect x="200" y="180" width="60" height="120" fill="#1e3a5f" rx="5" stroke="#475569" stroke-width="2"/>
<ellipse cx="230" cy="185" rx="30" ry="6" fill="#22c55e" opacity="0.3"/>
<!-- Bubbles -->
<circle cx="220" cy="240" r="3" fill="#22c55e" opacity="0.2">
    <animate attributeName="cy" values="260;200;260" dur="3s" repeatCount="indefinite"/>
</circle>
<circle cx="240" cy="230" r="2" fill="#22c55e" opacity="0.3">
    <animate attributeName="cy" values="250;190;250" dur="2.5s" repeatCount="indefinite"/>
</circle>
<rect x="540" y="180" width="60" height="120" fill="#1e3a5f" rx="5" stroke="#475569" stroke-width="2"/>
<ellipse cx="570" cy="185" rx="30" ry="6" fill="#a855f7" opacity="0.3"/>
<circle cx="560" cy="240" r="3" fill="#a855f7" opacity="0.2">
    <animate attributeName="cy" values="260;200;260" dur="2.8s" repeatCount="indefinite"/>
</circle>
<!-- Computer screens -->
<rect x="340" y="100" width="120" height="80" fill="#0f172a" stroke="#475569" stroke-width="2" rx="3"/>
<rect x="345" y="105" width="110" height="70" fill="#042f2e"/>
<!-- Screen text -->
<text x="400" y="130" text-anchor="middle" font-size="8" fill="#22c55e" font-family="monospace" opacity="0.7">ARMY BUILDER v6.66</text>
<text x="400" y="145" text-anchor="middle" font-size="6" fill="#22c55e" font-family="monospace" opacity="0.5">STATUS: ACTIVE</text>
<text x="400" y="158" text-anchor="middle" font-size="6" fill="#ef4444" font-family="monospace" opacity="0.6">UNITS: 9999+</text>
<!-- Table with tools -->
<rect x="340" y="190" width="120" height="10" fill="#475569"/>
<rect x="350" y="200" width="4" height="100" fill="#374151"/>
<rect x="450" y="200" width="4" height="100" fill="#374151"/>
<!-- Scattered tools on table -->
<rect x="360" y="186" width="20" height="4" fill="#94a3b8" rx="1"/>
<circle cx="400" cy="188" r="4" fill="#22c55e" opacity="0.5"/>
<rect x="420" y="185" width="15" height="5" fill="#78716c" rx="1"/>
<!-- WARNING signs -->
<rect x="140" y="20" width="80" height="30" fill="#fbbf24" rx="2"/>
<text x="180" y="40" text-anchor="middle" font-size="9" fill="#1c1917" font-weight="bold">⚠ DANGER</text>
<rect x="580" y="20" width="80" height="30" fill="#fbbf24" rx="2"/>
<text x="620" y="40" text-anchor="middle" font-size="9" fill="#1c1917" font-weight="bold">⚠ DANGER</text>
<!-- Toxic spill on floor -->
<ellipse cx="400" cy="340" rx="40" ry="6" fill="#22c55e" opacity="0.1"/>
<ellipse cx="150" cy="350" rx="25" ry="4" fill="#a855f7" opacity="0.08"/>
</svg>`

};

// Merge into game's vectors if available
if (typeof vectors !== 'undefined') {
    Object.assign(vectors, youngSheldonMaps);
}

// Merge into window.backgrounds for arena rendering
if (typeof window.backgrounds !== 'undefined') {
    Object.assign(window.backgrounds, youngSheldonMaps);
    console.log('[YS Maps] Added', Object.keys(youngSheldonMaps).length, 'Young Sheldon backgrounds');
}
