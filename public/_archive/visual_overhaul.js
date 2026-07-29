const fs = require('fs');

// 1. UPDATE STYLES.CSS
let css = fs.readFileSync('styles.css', 'utf8');

const newCSS = `
/* =======================================================
   ANIMATED SPACE/PARTICLE BACKGROUND
   ======================================================= */
.starfield-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.starfield-layer {
    position: absolute;
    width: 200%;
    height: 200%;
    background: transparent;
}

.stars-1 {
    background-image: radial-gradient(2px 2px at 40px 60px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 20px 50px, rgba(255,255,255,0.8), rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0));
    background-repeat: repeat;
    background-size: 200px 200px;
    animation: driftStars 40s linear infinite;
    opacity: 0.3;
}

.stars-2 {
    background-image: radial-gradient(3px 3px at 50px 160px, rgba(255,255,255,0.9), rgba(0,0,0,0)), radial-gradient(2px 2px at 120px 150px, rgba(167,139,250,0.8), rgba(0,0,0,0)), radial-gradient(3px 3px at 190px 140px, rgba(56,189,248,0.8), rgba(0,0,0,0));
    background-repeat: repeat;
    background-size: 300px 300px;
    animation: driftStars 30s linear infinite reverse;
    opacity: 0.5;
}

.stars-3 {
    background-image: radial-gradient(4px 4px at 150px 260px, rgba(255,255,255,1), rgba(0,0,0,0)), radial-gradient(3px 3px at 220px 250px, rgba(52,211,153,0.8), rgba(0,0,0,0)), radial-gradient(4px 4px at 290px 240px, rgba(251,191,36,0.8), rgba(0,0,0,0));
    background-repeat: repeat;
    background-size: 400px 400px;
    animation: driftStars 20s linear infinite;
    opacity: 0.7;
}

@keyframes driftStars {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-100px, -100px); }
}

/* =======================================================
   LANE-BASED CHARACTER GLOW
   ======================================================= */
.glow-front { filter: drop-shadow(0 10px 15px rgba(56, 189, 248, 0.6)); }
.glow-mid { filter: drop-shadow(0 10px 15px rgba(167, 139, 250, 0.6)); }
.glow-back { filter: drop-shadow(0 10px 15px rgba(52, 211, 153, 0.6)); }

/* =======================================================
   HANGOUT MODE LORE ANIMATIONS
   ======================================================= */
.hangout-bubble {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.9);
    color: #000;
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 8px;
    font-weight: bold;
    white-space: nowrap;
    animation: floatBubble 3s ease-in-out infinite alternate;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.hangout-bubble::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px 4px 0;
    border-style: solid;
    border-color: rgba(255,255,255,0.9) transparent transparent transparent;
}

@keyframes floatBubble {
    0% { transform: translateX(-50%) translateY(0); opacity: 0.7; }
    100% { transform: translateX(-50%) translateY(-5px); opacity: 1; }
}
`;

fs.writeFileSync('styles.css', css + newCSS);

// 2. UPDATE INDEX.HTML
let html = fs.readFileSync('index.html', 'utf8');

// Change arena background to space theme
html = html.replace(/bg-\[#e2ceb1\]/g, "bg-slate-950");
// Add starfield
if (!html.includes('starfield-bg')) {
    html = html.replace(/<div class="flex-1 relative bg-slate-950 h-full overflow-hidden shadow-inner cursor-pointer" id="arena" onclick="handleArenaTap\(event\)">/g, 
        `<div class="flex-1 relative bg-slate-950 h-full overflow-hidden shadow-inner cursor-pointer" id="arena" onclick="handleArenaTap(event)">\n            <div class="starfield-bg"><div class="starfield-layer stars-1"></div><div class="starfield-layer stars-2"></div><div class="starfield-layer stars-3"></div></div>`);
}

fs.writeFileSync('index.html', html);

// 3. UPDATE APP.JS (Add glow and hangout bubbles)
let app = fs.readFileSync('app.js', 'utf8');

// Add glow and hangout bubbles to renderActiveBattleLine
app = app.replace(/const charClass = `live-character-frame \$\{hangoutMode \? 'absolute' : 'relative'\} \$\{statusClass\}`;/g, 
`const glowClass = !hangoutMode ? 'glow-' + characters[key].lane : '';
                    const charClass = \`live-character-frame \${hangoutMode ? 'absolute' : 'relative'} \${statusClass} \${glowClass}\`;`);

// Add hangout bubble logic inside the innerHTML generation of the character
app = app.replace(/<div class="character-vector-wrapper">/g, 
`<div class="character-vector-wrapper">
                            \${hangoutMode ? '<div class="hangout-bubble">' + (key === 'sheldon' ? 'Bazinga!' : key === 'penny' ? 'Wine?' : key === 'stuart' ? 'Zzz...' : key === 'howard' ? 'Magic!' : key === 'raj' ? 'Stars...' : key === 'leonard' ? 'Sigh...' : key === 'amy' ? 'Fascinating' : key === 'bernie' ? 'Howie!' : '...') + '</div>' : ''}`);

fs.writeFileSync('app.js', app);
console.log("Visual Overhaul Applied!");
