const fs = require('fs');

// 1. UPDATE SUPABASE.JS
let supTxt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/supabase.js', 'utf8');
supTxt = supTxt.replace(/async function fetchLeaderboard\(limit\) \{[\s\S]*?\.order\('score', \{ ascending: false \}\)[\s\S]*?return error \? \[\] : \(data \|\| \[\]\);\n\}/, 
`async function fetchLeaderboard(limit, orderBy = 'score') {
    if (!supabase) return [];
    limit = limit || 50;
    
    var { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order(orderBy, { ascending: false })
        .limit(limit);
    
    return error ? [] : (data || []);
}`);
fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/supabase.js', supTxt, 'utf8');
console.log('Updated supabase.js');

// 2. UPDATE INDEX.HTML
let idxTxt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');
const oldLbHeader = `<div class="border-b-4 border-yellow-800 pb-3 mb-4 text-center">
                <h2 class="text-base font-bold tracking-widest text-yellow-500 uppercase">🏆 GLOBAL LEADERBOARD</h2>
                <p class="text-[8px] text-gray-400 mt-1 uppercase tracking-wider">Top players worldwide</p>
            </div>`;
const newLbHeader = `<div class="border-b-4 border-yellow-800 pb-3 mb-4 text-center">
                <h2 class="text-base font-bold tracking-widest text-yellow-500 uppercase">🏆 GLOBAL LEADERBOARD</h2>
                <div class="flex justify-center gap-2 mt-2">
                    <button onclick="switchLeaderboardTab('score', event)" id="lb-tab-score" class="lb-tab-btn active bg-yellow-900/60 text-yellow-400 border border-yellow-700 px-3 py-1 rounded-lg text-[10px] font-bold">POINTS</button>
                    <button onclick="switchLeaderboardTab('wave', event)" id="lb-tab-wave" class="lb-tab-btn bg-slate-900/60 text-slate-400 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-slate-800">WAVE</button>
                    <button onclick="switchLeaderboardTab('pvp_rating', event)" id="lb-tab-pvp_rating" class="lb-tab-btn bg-slate-900/60 text-slate-400 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-slate-800">TROPHY</button>
                </div>
            </div>`;
if (idxTxt.includes(oldLbHeader)) {
    idxTxt = idxTxt.replace(oldLbHeader, newLbHeader);
} else if (!idxTxt.includes("switchLeaderboardTab")) {
    console.log("Could not find LB header in index.html");
}
fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', idxTxt, 'utf8');
console.log('Updated index.html');

// 3. UPDATE APP_V2.JS
let appTxt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');
const oldLbJS = `async function openLeaderboard(event) {
    if (event) event.stopPropagation();
    var modal = document.getElementById('leaderboard-modal');
    if (modal) modal.classList.remove('hidden');
    
    var list = document.getElementById('leaderboard-list');
    if (list) list.innerHTML = '<div class="text-center text-gray-500 py-8 animate-pulse">Loading leaderboard...</div>';
    
    var data = await fetchLeaderboard(50);
    renderLeaderboard(data);
}

function closeLeaderboard() {
    var modal = document.getElementById('leaderboard-modal');
    if (modal) modal.classList.add('hidden');
}

function renderLeaderboard(data) {`;

const newLbJS = `window.currentLeaderboardTab = 'score';

async function switchLeaderboardTab(tabName, event) {
    if (event) event.stopPropagation();
    window.currentLeaderboardTab = tabName;
    
    document.querySelectorAll('.lb-tab-btn').forEach(btn => {
        btn.className = 'lb-tab-btn bg-slate-900/60 text-slate-400 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-slate-800';
    });
    const activeBtn = document.getElementById('lb-tab-' + tabName);
    if (activeBtn) {
        activeBtn.className = 'lb-tab-btn active bg-yellow-900/60 text-yellow-400 border border-yellow-700 px-3 py-1 rounded-lg text-[10px] font-bold';
    }

    var list = document.getElementById('leaderboard-list');
    if (list) list.innerHTML = '<div class="text-center text-gray-500 py-8 animate-pulse">Loading leaderboard...</div>';
    
    var data = await fetchLeaderboard(50, tabName);
    renderLeaderboard(data, tabName);
}

async function openLeaderboard(event) {
    if (event) event.stopPropagation();
    var modal = document.getElementById('leaderboard-modal');
    if (modal) modal.classList.remove('hidden');
    switchLeaderboardTab(window.currentLeaderboardTab || 'score');
}

function closeLeaderboard() {
    var modal = document.getElementById('leaderboard-modal');
    if (modal) modal.classList.add('hidden');
}

function renderLeaderboard(data, tabName = 'score') {`;

appTxt = appTxt.replace(oldLbJS, newLbJS);

const oldRenderBody = `<div class="font-black text-yellow-400 text-[11px]">' + (p.score || 0).toLocaleString() + '</div>';
        h += '<div class="text-[7px] text-gray-500">SCORE</div>';`;

const newRenderBody = `let val = 0; let lbl = ''; let clr = 'text-yellow-400';
        if (tabName === 'score') { val = (p.score || 0).toLocaleString(); lbl = 'SCORE'; }
        else if (tabName === 'wave') { val = (p.wave || 1); lbl = 'WAVE'; clr = 'text-emerald-400'; }
        else if (tabName === 'pvp_rating') { val = (p.pvp_rating || 1000); lbl = 'TROPHY'; clr = 'text-cyan-400'; }
        h += '<div class="font-black ' + clr + ' text-[11px]">' + val + '</div>';
        h += '<div class="text-[7px] text-gray-500">' + lbl + '</div>';`;

appTxt = appTxt.replace(oldRenderBody, newRenderBody);

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', appTxt, 'utf8');
console.log('Updated app_v2.js');

// UPDATE CACHE BUSTERS
let idxTxt2 = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');
idxTxt2 = idxTxt2.replace(/app_v2\.js\?bust=[0-9]+&v=[0-9]+/g, 'app_v2.js?bust=' + Date.now() + '&v=' + Date.now());
idxTxt2 = idxTxt2.replace(/supabase\.js\?bust=[0-9]+/g, 'supabase.js?bust=' + Date.now());
fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', idxTxt2, 'utf8');
console.log('Fixed cache busters');
