const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const map = {
    'â€¢': '•', 'âš¡': '⚡', 'ðŸš€': '🚀', 'ðŸ§ª': '🧪', 'âš™ï¸': '⚙️', 
    'ðŸ …': '🪙', 'ðŸ’Ž': '💎', 'ðŸ”©': '🔩', 'ðŸ †': '🏆', 'âš”ï¸': '⚔️', 
    'ðŸ’€': '💀', 'ðŸ§ ': '🧠', 'ðŸ °': '🍔', 'ðŸ“‹': '📋', 'ðŸŽ’': '🎒', 
    'ðŸ“…': '📅', 'ðŸŽ®': '🎮', 'ðŸŽ ': '🎁', 'ðŸ—ºï¸': '🗺️', 'ðŸ›‹ï¸': '🛋️', 
    'ðŸ”§': '🔧', 'ðŸ Ÿï¸': '🏟️', 'ðŸšª': '🚪', 'ðŸ’–': '💖', 'â ±ï¸': '⏱️', 
    'ðŸª„': '🪄', 'ðŸ’µ': '💵', 'ðŸ’³': '💳', 'âœ•': '✖', 'âœ…': '✅', 
    'ðŸ”—': '🔗', 'âž”': '➔', 
    
    // Bottom tabs specific
    's",?': '📋', 
    'dY><,?': '👥', 
    'dY" ': '🤖', 
    'dY?': '🛡️', 
    'dY?Y,?': '🏆', 
    'dYs': '🛋️', 
    '??': '🏥',
    '': '',
    'dY': ''
};

for(let k in map) {
    txt = txt.split(k).join(map[k]);
}

// Fix the bottom tabs manually in case they were split differently
txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label text-amber-400">Board<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">📋</span>\n                <span class="bottom-tab-label text-amber-400">Board</span>');

txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label">Gang<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">👥</span>\n                <span class="bottom-tab-label">Gang</span>');

txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label">Bots<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">🤖</span>\n                <span class="bottom-tab-label">Bots</span>');

txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label">Guild<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">🛡️</span>\n                <span class="bottom-tab-label">Guild</span>');

txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label">Arena<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">🏆</span>\n                <span class="bottom-tab-label">Arena</span>');

txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span><span class="bottom-tab-label\s+text-red-400">Clinic<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">🏥</span><span class="bottom-tab-label text-red-400">Clinic</span>');

txt = txt.replace(/<span class="text-lg group-hover:scale-110 transition-transform">.*?<\/span>\s*<span class="bottom-tab-label" id="hangout-btn-text">Apt 4A<\/span>/g, '<span class="text-lg group-hover:scale-110 transition-transform">🛋️</span>\n                <span class="bottom-tab-label" id="hangout-btn-text">Apt 4A</span>');

// Replace the boss fight button emoji
txt = txt.replace(/style="text-shadow:0 0 8px rgba\(255,0,0,0\.8\);">.*? SEASON FINALE<\/button>/g, 'style="text-shadow:0 0 8px rgba(255,0,0,0.8);">💀 SEASON FINALE</button>');

// Replace emojis for resource bars
txt = txt.replace(/<span>.*?<span id="res-stone"/g, '<span>🧪<span id="res-stone"');
txt = txt.replace(/<span>.*?<span id="res-iron"/g, '<span>⚙️<span id="res-iron"');
txt = txt.replace(/<span>.*?<span id="res-gold"/g, '<span>🪙<span id="res-gold"');
txt = txt.replace(/<span>.*?<span id="res-diamond"/g, '<span>💎<span id="res-diamond"');
txt = txt.replace(/<span>.*?<span id="res-scrap"/g, '<span>🔩<span id="res-scrap"');


fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log("Fixed emojis");
