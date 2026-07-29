const fs = require('fs');
let code = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');
let target = '    var h = \'<div class="text-center mb-4">\';';
let replacement =     var h = '<div class="text-center mb-4 relative">';\n    h += '<div class="absolute right-0 top-0"><button onclick="startSpectating(\\'' + userId + '\\', \\'' + (data.username || 'Unknown').replace(/'/g, \\"\\\\\\'\\") + '\\')" class="bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] px-3 py-1.5 rounded font-bold uppercase hover:bg-cyan-900 transition-colors shadow mr-1">👁️ VISIT</button></div>';;
if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', code);
    console.log('Replaced successfully');
} else {
    console.log('Target not found');
}

