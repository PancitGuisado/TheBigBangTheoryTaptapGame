const fs = require('fs');
let lines = fs.readFileSync('app_v2.js', 'utf8').split('\n');

// Find the broken area - line 3364 has the last good line of innerHTML
// We need to replace from line 3365 (the broken `+ if (!eq)`) with proper closure + calculateSynergies

// Find the line that starts with "            '<div style=\"font-size:9px"
// and the next line that's broken
let fixStart = -1;
for (let i = 3360; i < 3370; i++) {
    if (lines[i] && lines[i].includes("'<div style=\"font-size:9px")) {
        fixStart = i; // this is line 3364 (0-indexed = 3363)
        break;
    }
}

if (fixStart === -1) {
    console.log('❌ Could not find broken area');
    process.exit(1);
}

// Find where calculateSynergies body continues (the `if (!eq) return;` line)
// The issue is `calculateSynergies` function head is missing, we jumped into its body
// We need to find the real end of this mangled area
// The remaining calculateSynergies body starts at "    if (!eq) return;"

let synBodyStart = -1;
for (let i = fixStart + 1; i < fixStart + 10; i++) {
    if (lines[i] && lines[i].trim().startsWith('if (!eq) return;')) {
        synBodyStart = i;
        break;
    }
}

if (synBodyStart === -1) {
    console.log('❌ Could not find synergy body');
    process.exit(1);
}

console.log('fixStart (innerHTML line):', fixStart + 1);
console.log('synBodyStart (if !eq):', synBodyStart + 1);

// Replace: keep the innerHTML line but fix it, close updateStreakDisplay, add calculateSynergies header
const fixedLines = [
    "            '<div style=\"font-size:9px;font-weight:bold;color:' + streakColor + ';text-transform:uppercase;letter-spacing:1px;opacity:0.8;\">' + streakLabel + '</div>' +",
    "            '<div style=\"font-size:7px;color:#64748b;margin-top:2px;\">+' + (killStreak * 2) + ' bonus</div>';",
    "        el.style.opacity = '1';",
    "        el.style.transform = 'scale(1)';",
    "        el.style.animation = 'none';",
    "        void el.offsetWidth;",
    "        el.style.animation = 'streak-pulse 0.3s ease-out';",
    "    } else {",
    "        el.style.opacity = '0';",
    "        el.style.transform = 'scale(0.5)';",
    "    }",
    "}",
    "",
    "function calculateSynergies() {",
    "    activeSynergies = { dmgMult: 1.0, robotSpeedMult: 1.0, foodMult: 1.0 };",
    "    activeSynergyNames = [];",
    "    ",
    "    const eq = state.equipped;",
    "    if (!eq) return;"
];

// Splice: remove from fixStart to synBodyStart (inclusive) and replace
lines.splice(fixStart, synBodyStart - fixStart + 1, ...fixedLines);

fs.writeFileSync('app_v2.js', lines.join('\n'));

let depth = 0;
const code = lines.join('\n');
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');
