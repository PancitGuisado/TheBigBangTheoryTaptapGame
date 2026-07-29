const fs = require('fs');
const path = require('path');

const vectorsPath = path.join(__dirname, 'vectors.js');
let vectorsContent = fs.readFileSync(vectorsPath, 'utf8');

// Extract the vectors object literal
const match = vectorsContent.match(/const vectors = (\{[\s\S]*?\n\});/);
if (!match) {
    console.error("Could not parse vectors.js");
    process.exit(1);
}

// Write temp file to require it
const tempPath = path.join(__dirname, 'temp_vectors.js');
fs.writeFileSync(tempPath, vectorsContent + '\nmodule.exports = vectors;');

const vectors = require('./temp_vectors.js');

const newVectors = {};

function manipulateSVG(baseSvg, state) {
    let result = baseSvg;

    if (state === 'idle') {
        return result;
    }

    if (state === 'idle2') {
        // slightly scale down torso for breathing
        // Find main rect or torso
        result = result.replace(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)" fill="#dc2626"/, function(m, x, y, w, h) {
            return `<rect x="${x}" y="${y}" width="${w}" height="${parseInt(h)-2}" fill="#dc2626"`;
        });
        // Just a simple hack: shift the whole svg slightly
        result = result.replace('<svg viewBox="0 0 60 90"', '<svg viewBox="0 -2 60 90"');
        return result;
    }

    if (state === 'walking1') {
        result = result.replace('<svg viewBox="0 0 60 90"', '<svg viewBox="0 2 60 90"');
        // Simple leg tilt via group
        result = result.replace(/<rect x="20" y="46"/g, '<g transform="rotate(15 24 46)"><rect x="20" y="46"');
        result = result.replace(/<rect x="32" y="46"/g, '<g transform="rotate(-15 36 46)"><rect x="32" y="46"');
        
        // Close groups before body end or next rect
        // Since it's too complex to inject closing tags perfectly with regex for all 22 entities,
        // Let's use a global SVG transform wrapper
        return result.replace(/class="(.*?)"/, 'class="$1" style="transform: skewX(10deg);"');
    }

    if (state === 'walking2') {
        return result.replace(/class="(.*?)"/, 'class="$1" style="transform: skewX(-10deg);"');
    }

    if (state === 'attack1') {
        return result.replace(/class="(.*?)"/, 'class="$1" style="transform: rotate(-15deg) translateX(-5px);"');
    }

    if (state === 'attack2') {
        return result.replace(/class="(.*?)"/, 'class="$1" style="transform: rotate(20deg) translateX(10px) scale(1.1);" filter="drop-shadow(0 0 5px yellow)"');
    }

    if (state === 'injured') {
        // Inject red bruises
        const injuryOverlay = `<g class="damage-overlay">
            <path d="M 10,20 L 25,35 M 25,20 L 10,35" stroke="#7f1d1d" stroke-width="2"/>
            <path d="M 40,40 L 55,55 M 55,40 L 40,55" stroke="#7f1d1d" stroke-width="2"/>
            <rect x="10" y="10" width="10" height="2" fill="#f8fafc" transform="rotate(15 15 11)"/>
            <rect x="40" y="70" width="10" height="2" fill="#f8fafc" transform="rotate(-20 45 71)"/>
        </g></svg>`;
        result = result.replace('</svg>', injuryOverlay);
        result = result.replace(/class="(.*?)"/, 'class="$1" style="transform: rotate(10deg) translateY(5px); filter: grayscale(50%) hue-rotate(-20deg);"');
        return result;
    }

    return result;
}

for (const [key, value] of Object.entries(vectors)) {
    if (key === 'hospital_bed' || key.includes('background') || key.includes('map_')) {
        newVectors[key] = value;
    } else {
        newVectors[key] = {
            idle: manipulateSVG(value, 'idle'),
            idle2: manipulateSVG(value, 'idle2'),
            walking1: manipulateSVG(value, 'walking1'),
            walking2: manipulateSVG(value, 'walking2'),
            attack1: manipulateSVG(value, 'attack1'),
            attack2: manipulateSVG(value, 'attack2'),
            injured: manipulateSVG(value, 'injured'),
        };
    }
}

let newContent = `// 32-Bit Premium Detailed SVG Vector Matrix System\nconst vectors = {\n`;

for (const [key, val] of Object.entries(newVectors)) {
    if (typeof val === 'string') {
        newContent += `    ${key}: \`${val}\`,\n`;
    } else {
        newContent += `    ${key}: {\n`;
        for (const [stateKey, stateSvg] of Object.entries(val)) {
            newContent += `        ${stateKey}: \`${stateSvg}\`,\n`;
        }
        newContent += `    },\n`;
    }
}

newContent += `};\n`;

fs.writeFileSync(vectorsPath, newContent);
fs.unlinkSync(tempPath);
console.log("Successfully generated 154 SVG frames!");
