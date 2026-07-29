const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const replacements = [
    [/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Skills<\/span>/g, '<span class="text-base">📋</span>\n                <span class="side-rail-label">Skills</span>'],
    [/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Map<\/span>/g, '<span class="text-base">🗺️</span>\n                <span class="side-rail-label">Map</span>'],
    [/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Food<\/span>/g, '<span class="text-base">🍔</span>\n                <span class="side-rail-label">Food</span>'],
    [/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Quest<\/span>/g, '<span class="text-base">📜</span>\n                <span class="side-rail-label">Quest</span>'],
    [/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Feats<\/span>/g, '<span class="text-base">🏅</span>\n                <span class="side-rail-label">Feats</span>'],
    [/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Gear<\/span>/g, '<span class="text-base">🎒</span>\n                <span class="side-rail-label">Gear</span>'],
    [/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Event<\/span>/g, '<span class="text-base">📅</span>\n                <span class="side-rail-label">Event</span>'],
    [/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Play<\/span>/g, '<span class="text-base">🎮</span>\n                <span class="side-rail-label">Play</span>'],
    [/<span class="text-base">.*?<\/span>\s*<span class="side-rail-label">Daily<\/span>/g, '<span class="text-base">🎁</span>\n                <span class="side-rail-label">Daily</span>'],
    
    // Bottom Bar
    [/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label text-amber-400">Board<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">📋</span>\n                <span class="bottom-tab-label text-amber-400">Board</span>'],
    [/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label text-amber-400">Gang<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">👥</span>\n                <span class="bottom-tab-label text-amber-400">Gang</span>'],
    [/<div class="absolute -top-3[^>]*>\s*<span class="text-xl">.*?<\/span>\s*<\/div>\s*<span class="bottom-tab-label text-amber-400 mt-5">Arena<\/span>/g, '<div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 rounded-full p-2 border-2 border-amber-900 shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10 group-hover:-translate-y-1 transition-transform">\n                    <span class="text-xl">⚔️</span>\n                </div>\n                <span class="bottom-tab-label text-amber-400 mt-5">Arena</span>'],
    [/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label text-amber-400">Clinic<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">🏥</span>\n                <span class="bottom-tab-label text-amber-400">Clinic</span>'],
    [/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label text-amber-400">Bots<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">🤖</span>\n                <span class="bottom-tab-label text-amber-400">Bots</span>']
];

replacements.forEach(rep => {
    txt = txt.replace(rep[0], rep[1]);
});

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Fixed navigation emojis!');
