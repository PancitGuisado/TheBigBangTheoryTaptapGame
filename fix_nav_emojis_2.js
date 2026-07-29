const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

// Side Rail
txt = txt.replace(/<span class="text-base">[^<]*<\/span>\s*<span class="side-rail-label">Skills<\/span>/s, '<span class="text-base">📋</span>\n                <span class="side-rail-label">Skills</span>');
txt = txt.replace(/<span class="text-base">[^<]*<\/span>\s*<span class="side-rail-label">Map<\/span>/s, '<span class="text-base">🗺️</span>\n                <span class="side-rail-label">Map</span>');
txt = txt.replace(/<span class="text-base">[^<]*<\/span>\s*<span class="side-rail-label">Food<\/span>/s, '<span class="text-base">🍔</span>\n                <span class="side-rail-label">Food</span>');
txt = txt.replace(/<span class="text-base">[^<]*<\/span>\s*<span class="side-rail-label">Quest<\/span>/s, '<span class="text-base">📜</span>\n                <span class="side-rail-label">Quest</span>');
txt = txt.replace(/<span class="text-base">[^<]*<\/span>\s*<span class="side-rail-label">Feats<\/span>/s, '<span class="text-base">🏅</span>\n                <span class="side-rail-label">Feats</span>');
txt = txt.replace(/<span class="text-base">[^<]*<\/span>\s*<span class="side-rail-label">Gear<\/span>/s, '<span class="text-base">🎒</span>\n                <span class="side-rail-label">Gear</span>');
txt = txt.replace(/<span class="text-base">[^<]*<\/span>\s*<span class="side-rail-label">Event<\/span>/s, '<span class="text-base">📅</span>\n                <span class="side-rail-label">Event</span>');
txt = txt.replace(/<span class="text-base">[^<]*<\/span>\s*<span class="side-rail-label">Play<\/span>/s, '<span class="text-base">🎮</span>\n                <span class="side-rail-label">Play</span>');
txt = txt.replace(/<span class="text-base">[^<]*<\/span>\s*<span class="side-rail-label">Daily<\/span>/s, '<span class="text-base">🎁</span>\n                <span class="side-rail-label">Daily</span>');

// Bottom Nav
txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">[^<]*<\/span>\s*<span class="bottom-tab-label text-amber-400">Board<\/span>/s, '<span class="text-lg group-hover:scale-110 transition-transform">📋</span>\n                <span class="bottom-tab-label text-amber-400">Board</span>');
txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">[^<]*<\/span>\s*<span class="bottom-tab-label text-amber-400">Gang<\/span>/s, '<span class="text-lg group-hover:scale-110 transition-transform">👥</span>\n                <span class="bottom-tab-label text-amber-400">Gang</span>');
txt = txt.replace(/<div class="absolute[^>]*>\s*<span class="text-xl">[^<]*<\/span>\s*<\/div>\s*<span class="bottom-tab-label text-amber-400 mt-5">Arena<\/span>/s, '<div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 rounded-full p-2 border-2 border-amber-900 shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10 group-hover:-translate-y-1 transition-transform">\n                    <span class="text-xl">⚔️</span>\n                </div>\n                <span class="bottom-tab-label text-amber-400 mt-5">Arena</span>');
txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">[^<]*<\/span>\s*<span class="bottom-tab-label text-amber-400">Clinic<\/span>/s, '<span class="text-lg group-hover:scale-110 transition-transform">🏥</span>\n                <span class="bottom-tab-label text-amber-400">Clinic</span>');
txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">[^<]*<\/span>\s*<span class="bottom-tab-label text-amber-400">Bots<\/span>/s, '<span class="text-lg group-hover:scale-110 transition-transform">🤖</span>\n                <span class="bottom-tab-label text-amber-400">Bots</span>');

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Fixed navigation emojis!');
