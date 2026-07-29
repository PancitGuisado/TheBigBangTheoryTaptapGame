const fs = require('fs');

function generateHumanoid(opts) {
    const { primaryColor, secondaryColor, skinTone, hairColor, hairType, eyeColor = "#000", accessory = "", weapon = "", isBoss = false, auraColor = "" } = opts;
    let scale = isBoss ? "transform='scale(1.2) translate(-5, -15)'" : "";
    let shadowRx = isBoss ? 20 : 15;
    let svg = "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n";
    if (auraColor) svg += "        <circle cx=\"30\" cy=\"45\" r=\"40\" fill=\"" + auraColor + "\" opacity=\"0.3\" filter=\"blur(8px)\"/>\n";
    svg += "        <ellipse cx=\"30\" cy=\"85\" rx=\"" + shadowRx + "\" ry=\"4\" fill=\"rgba(0,0,0,0.3)\"/>\n<rect x=\"20\" y=\"76\" width=\"8\" height=\"8\" fill=\"#171717\"/>\n<rect x=\"32\" y=\"76\" width=\"8\" height=\"8\" fill=\"#171717\"/>\n<rect x=\"20\" y=\"55\" width=\"8\" height=\"21\" fill=\"" + secondaryColor + "\"/>\n<rect x=\"32\" y=\"55\" width=\"8\" height=\"21\" fill=\"" + secondaryColor + "\"/>\n<g " + scale + ">\n<rect x=\"16\" y=\"25\" width=\"28\" height=\"30\" fill=\"" + primaryColor + "\" rx=\"3\"/>\n<path d=\"M 16,30 Q 30,35 44,30 L 44,55 L 16,55 Z\" fill=\"rgba(0,0,0,0.1)\"/>\n<rect x=\"12\" y=\"26\" width=\"6\" height=\"22\" fill=\"" + primaryColor + "\" rx=\"1\"/>\n<rect x=\"42\" y=\"26\" width=\"6\" height=\"22\" fill=\"" + primaryColor + "\" rx=\"1\"/>\n<circle cx=\"15\" cy=\"50\" r=\"2.5\" fill=\"" + skinTone + "\"/>\n<circle cx=\"45\" cy=\"50\" r=\"2.5\" fill=\"" + skinTone + "\"/>\n";
    if (weapon === "sword") { svg += "<path d=\"M 45,50 L 55,20\" stroke=\"#9ca3af\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n<path d=\"M 43,45 L 47,48\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n"; } else if (weapon === "gun") { svg += "<rect x=\"42\" y=\"48\" width=\"10\" height=\"4\" fill=\"#334155\"/>\n<rect x=\"42\" y=\"50\" width=\"3\" height=\"4\" fill=\"#1e293b\"/>\n"; } else if (weapon === "magic") { svg += "<circle cx=\"45\" cy=\"40\" r=\"6\" fill=\"#a855f7\" opacity=\"0.6\"><animate attributeName=\"r\" values=\"4;8;4\" dur=\"1s\" repeatCount=\"indefinite\"/></circle>\n"; } else if (weapon === "bow") { svg += "<path d=\"M 45,30 Q 35,50 45,70\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"2\"/>\n<line x1=\"45\" y1=\"30\" x2=\"45\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"0.5\"/>\n"; }
    if (accessory === "cape") svg += "<path d=\"M 16,25 L 5,80 L 55,80 L 44,25 Z\" fill=\"#ef4444\" opacity=\"0.9\"/>\n"; else if (accessory === "tie") svg += "<path d=\"M 28,25 L 32,25 L 30,40 Z\" fill=\"#1e293b\"/>\n"; else if (accessory === "bat_logo") svg += "<ellipse cx=\"30\" cy=\"35\" rx=\"6\" ry=\"3\" fill=\"#fde047\"/><path d=\"M 26,35 L 28,33 L 30,36 L 32,33 L 34,35 L 30,38 Z\" fill=\"#000\"/>\n"; else if (accessory === "super_logo") svg += "<polygon points=\"26,30 34,30 30,38\" fill=\"#ef4444\"/><text x=\"30\" y=\"36\" text-anchor=\"middle\" font-size=\"6\" fill=\"#fde047\" font-weight=\"bold\">S</text>\n";
    svg += "<rect x=\"20\" y=\"8\" width=\"20\" height=\"18\" fill=\"" + skinTone + "\" rx=\"4\"/>\n<circle cx=\"26\" cy=\"16\" r=\"" + (isBoss ? 2 : 1.5) + "\" fill=\"" + eyeColor + "\"/>\n<circle cx=\"34\" cy=\"16\" r=\"" + (isBoss ? 2 : 1.5) + "\" fill=\"" + eyeColor + "\"/>\n";
    if (isBoss) { svg += "<path d=\"M 24,13 L 28,15 M 36,13 L 32,15\" stroke=\"#000\" stroke-width=\"1.5\"/>\n<path d=\"M 27,22 Q 30,20 33,22\" fill=\"none\" stroke=\"#000\" stroke-width=\"1.5\"/>\n"; } else { svg += "<path d=\"M 27,22 L 33,22\" stroke=\"#000\" stroke-width=\"1\"/>\n"; }
    if (hairType === "short") { svg += "<path d=\"M 18,10 Q 30,-2 42,10 L 40,14 Q 30,4 20,14 Z\" fill=\"" + hairColor + "\"/>\n"; } else if (hairType === "long") { svg += "<path d=\"M 18,10 Q 30,-2 42,10 L 44,35 L 40,35 L 40,15 Q 30,5 20,15 L 20,35 L 16,35 Z\" fill=\"" + hairColor + "\"/>\n"; } else if (hairType === "bat_cowl") { svg += "<path d=\"M 18,8 L 18,0 L 22,8 L 38,8 L 42,0 L 42,8 L 42,20 L 18,20 Z\" fill=\"#1e293b\"/>\n<rect x=\"22\" y=\"14\" width=\"16\" height=\"6\" fill=\"" + skinTone + "\"/>\n"; } else if (hairType === "helmet") { svg += "<path d=\"M 16,12 C 16,-4 44,-4 44,12 Z\" fill=\"" + hairColor + "\"/>\n<rect x=\"14\" y=\"12\" width=\"32\" height=\"4\" fill=\"#000\" rx=\"1\"/>\n"; }
    svg += "</g>\n</svg>";
    return svg;
}

function generateMonster(type, isBoss) {
    let scale = isBoss ? "transform='scale(1.3) translate(-5, -5)'" : "";
    let shadowRx = isBoss ? 25 : 15;
    if (type === "dragon") { return "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n<ellipse cx=\"30\" cy=\"85\" rx=\"" + shadowRx + "\" ry=\"5\" fill=\"rgba(0,0,0,0.3)\"/>\n<g " + scale + ">\n<path d=\"M 10,40 Q 30,80 50,40\" fill=\"#dc2626\"/>\n<path d=\"M 30,20 L 20,50 L 40,50 Z\" fill=\"#b91c1c\"/>\n<polygon points=\"10,40 0,20 20,30\" fill=\"#991b1b\"/>\n<polygon points=\"50,40 60,20 40,30\" fill=\"#991b1b\"/>\n<circle cx=\"30\" cy=\"25\" r=\"10\" fill=\"#ef4444\"/>\n<circle cx=\"26\" cy=\"23\" r=\"2\" fill=\"#fef08a\"/>\n<circle cx=\"34\" cy=\"23\" r=\"2\" fill=\"#fef08a\"/>\n<path d=\"M 25,30 Q 30,35 35,30\" fill=\"none\" stroke=\"#fef08a\" stroke-width=\"2\"/>\n</g>\n</svg>"; } else if (type === "mech") { return "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n<ellipse cx=\"30\" cy=\"85\" rx=\"" + shadowRx + "\" ry=\"5\" fill=\"rgba(0,0,0,0.3)\"/>\n<g " + scale + ">\n<rect x=\"15\" y=\"20\" width=\"30\" height=\"40\" fill=\"#64748b\" rx=\"5\"/>\n<rect x=\"20\" y=\"60\" width=\"6\" height=\"20\" fill=\"#475569\"/>\n<rect x=\"34\" y=\"60\" width=\"6\" height=\"20\" fill=\"#475569\"/>\n<rect x=\"5\" y=\"25\" width=\"10\" height=\"30\" fill=\"#475569\" rx=\"2\"/>\n<rect x=\"45\" y=\"25\" width=\"10\" height=\"30\" fill=\"#475569\" rx=\"2\"/>\n<rect x=\"20\" y=\"5\" width=\"20\" height=\"15\" fill=\"#94a3b8\" rx=\"2\"/>\n<rect x=\"22\" y=\"8\" width=\"16\" height=\"6\" fill=\"#ef4444\"/>\n</g>\n</svg>"; } else if (type === "alien") { return "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n<ellipse cx=\"30\" cy=\"85\" rx=\"" + shadowRx + "\" ry=\"4\" fill=\"rgba(0,0,0,0.3)\"/>\n<g " + scale + ">\n<path d=\"M 25,30 L 20,80 L 25,80 L 30,50 L 35,80 L 40,80 L 35,30 Z\" fill=\"#111827\"/>\n<path d=\"M 20,10 Q 50,0 45,25 L 20,25 Z\" fill=\"#1f2937\"/>\n<path d=\"M 15,30 L 5,60 M 45,30 L 55,60\" stroke=\"#111827\" stroke-width=\"4\"/>\n</g>\n</svg>"; } else if (type === "drone") { return "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n<ellipse cx=\"30\" cy=\"85\" rx=\"" + shadowRx + "\" ry=\"3\" fill=\"rgba(0,0,0,0.2)\"/>\n<g " + scale + ">\n<ellipse cx=\"30\" cy=\"30\" rx=\"20\" ry=\"10\" fill=\"#cbd5e1\"/>\n<ellipse cx=\"30\" cy=\"25\" rx=\"10\" ry=\"10\" fill=\"#3b82f6\"/>\n<path d=\"M 20,30 L 10,50 M 40,30 L 50,50\" stroke=\"#94a3b8\" stroke-width=\"3\"/>\n<circle cx=\"30\" cy=\"25\" r=\"3\" fill=\"#ef4444\" class=\"animate-pulse\"/>\n</g>\n</svg>"; }
    return "";
}

const enemies = {
    pasadena_tourist: { primaryColor: "#fde047", secondaryColor: "#94a3b8", skinTone: "#fed7aa", hairColor: "#b45309", hairType: "short", accessory: "camera" },
    geek_troll: { primaryColor: "#166534", secondaryColor: "#3f6212", skinTone: "#bbf7d0", hairColor: "#000", hairType: "short", weapon: "club" },
    caltech_postdoc: { primaryColor: "#e2e8f0", secondaryColor: "#334155", skinTone: "#fed7aa", hairColor: "#1f2937", hairType: "short", accessory: "tie" },
    comic_convention_fanboy: { primaryColor: "#3b82f6", secondaryColor: "#1e3a8a", skinTone: "#fcd34d", hairColor: "#ea580c", hairType: "short", accessory: "cape" },
    comic_clerk: { primaryColor: "#111827", secondaryColor: "#0f172a", skinTone: "#fed7aa", hairColor: "#451a03", hairType: "short" },
    cupcake_baker: { primaryColor: "#fbcfe8", secondaryColor: "#fdf2f8", skinTone: "#fed7aa", hairColor: "#fbbf24", hairType: "long" },
    chocolate_worker: { primaryColor: "#78350f", secondaryColor: "#451a03", skinTone: "#fed7aa", hairColor: "#171717", hairType: "short" },
    meathead_jock: { primaryColor: "#ef4444", secondaryColor: "#1e293b", skinTone: "#fca5a5", hairColor: "#fde047", hairType: "short" },
    trek: { primaryColor: "#dc2626", secondaryColor: "#111827", skinTone: "#fed7aa", hairColor: "#111827", hairType: "short", weapon: "gun" },
    wars: { primaryColor: "#f8fafc", secondaryColor: "#f1f5f9", skinTone: "#f8fafc", hairColor: "#f8fafc", hairType: "helmet", weapon: "gun" },
    indy: { primaryColor: "#d97706", secondaryColor: "#78350f", skinTone: "#fed7aa", hairColor: "#78350f", hairType: "short", weapon: "gun" },
    twd_walker: { primaryColor: "#4b5563", secondaryColor: "#1f2937", skinTone: "#bbf7d0", hairColor: "#374151", hairType: "long", eyeColor: "#fff" },
    goblin_shaman: { primaryColor: "#4ade80", secondaryColor: "#14532d", skinTone: "#22c55e", hairColor: "#000", hairType: "long", weapon: "magic" },
    wasteland_bandit: { primaryColor: "#78350f", secondaryColor: "#451a03", skinTone: "#fcd34d", hairColor: "#000", hairType: "helmet", weapon: "sword" },
    parademon_grunt: { primaryColor: "#1e3a8a", secondaryColor: "#1e40af", skinTone: "#93c5fd", hairColor: "#1e3a8a", hairType: "helmet", weapon: "gun" },
    batman_boss: { primaryColor: "#334155", secondaryColor: "#1e293b", skinTone: "#fed7aa", hairColor: "#111827", hairType: "bat_cowl", accessory: "bat_logo", isBoss: true, auraColor: "#000" },
    superman_boss: { primaryColor: "#2563eb", secondaryColor: "#dc2626", skinTone: "#fed7aa", hairColor: "#111827", hairType: "short", accessory: "super_logo", isBoss: true, auraColor: "#3b82f6" },
    wonderwoman_boss: { primaryColor: "#dc2626", secondaryColor: "#1e3a8a", skinTone: "#fed7aa", hairColor: "#111827", hairType: "long", weapon: "sword", isBoss: true, auraColor: "#fde047" },
    ironman_boss: { primaryColor: "#dc2626", secondaryColor: "#b91c1c", skinTone: "#fde047", hairColor: "#facc15", hairType: "helmet", isBoss: true, auraColor: "#fde047" },
    thanos_boss: { primaryColor: "#d97706", secondaryColor: "#b45309", skinTone: "#a855f7", hairColor: "#7e22ce", hairType: "helmet", isBoss: true, auraColor: "#a855f7" },
    flash_boss: { primaryColor: "#ef4444", secondaryColor: "#b91c1c", skinTone: "#fed7aa", hairColor: "#ef4444", hairType: "helmet", isBoss: true, auraColor: "#fde047" },
    aquaman_boss: { primaryColor: "#eab308", secondaryColor: "#166534", skinTone: "#fed7aa", hairColor: "#fde047", hairType: "long", weapon: "sword", isBoss: true, auraColor: "#3b82f6" },
    greenlantern_boss: { primaryColor: "#22c55e", secondaryColor: "#14532d", skinTone: "#fed7aa", hairColor: "#111827", hairType: "short", isBoss: true, auraColor: "#22c55e" },
    joker_boss: { primaryColor: "#a855f7", secondaryColor: "#7e22ce", skinTone: "#f8fafc", hairColor: "#22c55e", hairType: "short", weapon: "gun", isBoss: true, auraColor: "#22c55e" },
    lex_luthor: { primaryColor: "#10b981", secondaryColor: "#047857", skinTone: "#fed7aa", hairColor: "transparent", hairType: "short", isBoss: true, auraColor: "#10b981" },
    darth_vader: { primaryColor: "#111827", secondaryColor: "#000", skinTone: "#000", hairColor: "#000", hairType: "helmet", accessory: "cape", weapon: "sword", isBoss: true, auraColor: "#ef4444" },
    kurt_ex: { primaryColor: "#000", secondaryColor: "#1e293b", skinTone: "#fca5a5", hairColor: "#fde047", hairType: "short", isBoss: true, auraColor: "#000" },
    evil_wil: { primaryColor: "#b91c1c", secondaryColor: "#000", skinTone: "#fed7aa", hairColor: "#451a03", hairType: "short", isBoss: true, auraColor: "#b91c1c" },
    caltech_chairman: { primaryColor: "#1e293b", secondaryColor: "#0f172a", skinTone: "#fed7aa", hairColor: "#d1d5db", hairType: "short", accessory: "tie", isBoss: true, auraColor: "#facc15" }
};

const specialBosses = {
    red_dragon: { type: "dragon", isBoss: true },
    minotaur: { type: "dragon", isBoss: true },
    demogorgon: { type: "alien", isBoss: true },
    xenomorph_queen: { type: "alien", isBoss: true },
    scifi_mech: { type: "mech", isBoss: true },
    alien_invader: { type: "alien", isBoss: false },
    r2d2_unit: { type: "drone", isBoss: false },
    battle_droid: { type: "mech", isBoss: false },
    droideka: { type: "mech", isBoss: true },
    omac_unit: { type: "mech", isBoss: false },
    cyborg_support: { type: "mech", isBoss: false },
    apokolips_destroyer: { type: "mech", isBoss: true },
    atom_boxer: { type: "mech", isBoss: true },
    zeus_titan: { type: "mech", isBoss: true },
    midas_speedster: { type: "mech", isBoss: true },
    roomba_doom: { type: "drone", isBoss: true },
    quantum_drone: { type: "drone", isBoss: false },
    dnd_boss: { type: "dragon", isBoss: true }
};

let v = fs.readFileSync('vectors.js', 'utf8');

for (const [key, opts] of Object.entries(enemies)) {
    const svg = generateHumanoid(opts);
    const regex = new RegExp(`"\\b${key}\\b"\\s*:\\s*[\`"]<svg.*?</svg>[\`"]`, 's');
    if (regex.test(v)) {
        v = v.replace(regex, `"${key}": \`${svg}\``);
    } else {
        const endIdx = v.lastIndexOf('};');
        if (endIdx !== -1) {
            v = v.substring(0, endIdx) + `"${key}": \`${svg}\`,\n    ` + v.substring(endIdx);
        }
    }
}

for (const [key, opts] of Object.entries(specialBosses)) {
    const svg = generateMonster(opts.type, opts.isBoss);
    const regex = new RegExp(`"\\b${key}\\b"\\s*:\\s*[\`"]<svg.*?</svg>[\`"]`, 's');
    if (regex.test(v)) {
        v = v.replace(regex, `"${key}": \`${svg}\``);
    } else {
        const endIdx = v.lastIndexOf('};');
        if (endIdx !== -1) {
            v = v.substring(0, endIdx) + `"${key}": \`${svg}\`,\n    ` + v.substring(endIdx);
        }
    }
}

fs.writeFileSync('vectors.js', v);
console.log('Successfully upgraded all enemy and boss SVGs with detailed layered designs!');
