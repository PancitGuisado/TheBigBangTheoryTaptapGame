const fs = require('fs');
let vec = fs.readFileSync('vectors.js', 'utf8');

// The file might be super mangled at the end now due to my bad edit.
// Let's strip out roomba_doom and quantum_drone completely, then re-add them safely.

const insertIdx = vec.indexOf('"roomba_doom"');
if (insertIdx !== -1) {
    vec = vec.slice(0, insertIdx);
    // remove trailing commas/spaces
    vec = vec.replace(/,\s*$/, '');
    vec += '\n};';
}

const roombaSVG = `    "roomba_doom": "<svg viewBox=\\"0 0 60 90\\" class=\\"w-full h-full\\">\\n        <!-- Shadow -->\\n        <ellipse cx=\\"30\\" cy=\\"80\\" rx=\\"20\\" ry=\\"5\\" fill=\\"rgba(0,0,0,0.3)\\"/>\\n        <!-- Base Disk -->\\n        <ellipse cx=\\"30\\" cy=\\"75\\" rx=\\"22\\" ry=\\"8\\" fill=\\"#374151\\"/>\\n        <ellipse cx=\\"30\\" cy=\\"72\\" rx=\\"20\\" ry=\\"7\\" fill=\\"#111827\\"/>\\n        <!-- Middle Ring -->\\n        <ellipse cx=\\"30\\" cy=\\"68\\" rx=\\"18\\" ry=\\"6\\" fill=\\"#4b5563\\"/>\\n        <!-- Top Dome -->\\n        <path d=\\"M 14,68 C 14,50 46,50 46,68\\" fill=\\"#1f2937\\"/>\\n        <!-- Sensor / Eye -->\\n        <circle cx=\\"30\\" cy=\\"62\\" r=\\"3\\" fill=\\"#ef4444\\"/>\\n        <!-- Taped Knife/Weapon -->\\n        <rect x=\\"44\\" y=\\"65\\" width=\\"12\\" height=\\"3\\" fill=\\"#9ca3af\\" transform=\\"rotate(-15 44 65)\\"/>\\n        <path d=\\"M 56,62 L 62,65 L 55,67 Z\\" fill=\\"#e5e7eb\\" transform=\\"rotate(-15 44 65)\\"/>\\n        <rect x=\\"40\\" y=\\"63\\" width=\\"6\\" height=\\"8\\" fill=\\"#fcd34d\\" opacity=\\"0.7\\" transform=\\"rotate(-15 44 65)\\"/> <!-- Tape -->\\n    </svg>",`;

const droneSVG = `    "quantum_drone": "<svg viewBox=\\"0 0 60 90\\" class=\\"w-full h-full\\">\\n        <!-- Shadow -->\\n        <ellipse cx=\\"30\\" cy=\\"85\\" rx=\\"12\\" ry=\\"3\\" fill=\\"rgba(0,0,0,0.15)\\"/>\\n        <!-- Outer Entanglement Ring -->\\n        <ellipse cx=\\"30\\" cy=\\"45\\" rx=\\"22\\" ry=\\"6\\" fill=\\"none\\" stroke=\\"#a855f7\\" stroke-width=\\"1.5\\" opacity=\\"0.6\\"/>\\n        <!-- Inner Entanglement Ring -->\\n        <ellipse cx=\\"30\\" cy=\\"45\\" rx=\\"16\\" ry=\\"16\\" fill=\\"none\\" stroke=\\"#3b82f6\\" stroke-width=\\"1\\" opacity=\\"0.8\\" transform=\\"rotate(45 30 45)\\"/>\\n        <ellipse cx=\\"30\\" cy=\\"45\\" rx=\\"16\\" ry=\\"16\\" fill=\\"none\\" stroke=\\"#ec4899\\" stroke-width=\\"1\\" opacity=\\"0.8\\" transform=\\"rotate(-45 30 45)\\"/>\\n        <!-- Core Engine/Body -->\\n        <polygon points=\\"30,25 40,45 30,65 20,45\\" fill=\\"#1e1b4b\\"/>\\n        <polygon points=\\"30,30 35,45 30,60 25,45\\" fill=\\"#312e81\\"/>\\n        <!-- Glowing Eye -->\\n        <circle cx=\\"30\\" cy=\\"45\\" r=\\"4\\" fill=\\"#8b5cf6\\"/>\\n        <circle cx=\\"30\\" cy=\\"45\\" r=\\"2\\" fill=\\"#fff\\"/>\\n    </svg>"`;

const lastClose = vec.lastIndexOf('};');
if (lastClose !== -1) {
    vec = vec.slice(0, lastClose) + ',\n' + roombaSVG + '\n' + droneSVG + '\n' + vec.slice(lastClose);
}

fs.writeFileSync('vectors.js', vec);
require('acorn').parse(vec, { ecmaVersion: 2022 });
console.log("vectors.js fixed and parsed successfully!");
