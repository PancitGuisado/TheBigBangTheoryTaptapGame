const fs = require('fs');

// 1. Update app_v2.js
let appTxt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');

// Replace pvp_rating with trophies in JS
appTxt = appTxt.replace(/else if \(tabName === 'pvp_rating'\) \{ val = \(p\.pvp_rating \|\| 1000\); lbl = 'TROPHY'; clr = 'text-cyan-400'; \}/,
`else if (tabName === 'trophies') { val = (p.trophies || 0).toLocaleString(); lbl = 'TROPHY'; clr = 'text-cyan-400'; }`);

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', appTxt, 'utf8');
console.log('Fixed app_v2.js to use trophies instead of pvp_rating');

// 2. Update index.html
let idxTxt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');
idxTxt = idxTxt.replace(
    /<button onclick="switchLeaderboardTab\('pvp_rating', event\)" id="lb-tab-pvp_rating" class="lb-tab-btn bg-slate-900\/60 text-slate-400 border border-slate-700 px-3 py-1 rounded-lg text-\[10px\] font-bold hover:bg-slate-800">TROPHY<\/button>/,
    `<button onclick="switchLeaderboardTab('trophies', event)" id="lb-tab-trophies" class="lb-tab-btn bg-slate-900/60 text-slate-400 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-slate-800">TROPHY</button>`
);

// Cache busters
idxTxt = idxTxt.replace(/app_v2\.js\?bust=[0-9]+&v=[0-9]+/g, 'app_v2.js?bust=' + Date.now() + '&v=' + Date.now());
idxTxt = idxTxt.replace(/supabase\.js\?bust=[0-9]+/g, 'supabase.js?bust=' + Date.now());

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', idxTxt, 'utf8');
console.log('Fixed index.html to use trophies');

// 3. Update supabase.js to UPSERT trophies
let supTxt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/supabase.js', 'utf8');
if (supTxt.includes('bazinga_points: gameState.bazingaPoints || 0,') && !supTxt.includes('trophies:')) {
    supTxt = supTxt.replace(
        /bazinga_points: gameState\.bazingaPoints \|\| 0,/,
        `bazinga_points: gameState.bazingaPoints || 0,
            trophies: gameState.pvp ? gameState.pvp.trophies : 0,`
    );
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/supabase.js', supTxt, 'utf8');
    console.log('Fixed supabase.js to upload trophies');
} else {
    console.log('Could not find injection point in supabase.js or it already exists');
}
