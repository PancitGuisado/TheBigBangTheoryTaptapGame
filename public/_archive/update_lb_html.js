const fs = require('fs');
let idxTxt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const regexLbHeader = /<div class="border-b-4 border-yellow-800 pb-3 mb-4 text-center">[\s\S]*?<p class="text-\[8px\] text-gray-400 mt-1 uppercase tracking-wider">Top players worldwide<\/p>\s*<\/div>/;

const newLbHeader = `<div class="border-b-4 border-yellow-800 pb-3 mb-4 text-center">
                <h2 class="text-base font-bold tracking-widest text-yellow-500 uppercase">🏆 GLOBAL LEADERBOARD</h2>
                <div class="flex justify-center gap-2 mt-2">
                    <button onclick="switchLeaderboardTab('score', event)" id="lb-tab-score" class="lb-tab-btn active bg-yellow-900/60 text-yellow-400 border border-yellow-700 px-3 py-1 rounded-lg text-[10px] font-bold">POINTS</button>
                    <button onclick="switchLeaderboardTab('wave', event)" id="lb-tab-wave" class="lb-tab-btn bg-slate-900/60 text-slate-400 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-slate-800">WAVE</button>
                    <button onclick="switchLeaderboardTab('pvp_rating', event)" id="lb-tab-pvp_rating" class="lb-tab-btn bg-slate-900/60 text-slate-400 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-slate-800">TROPHY</button>
                </div>
            </div>`;

if (idxTxt.match(regexLbHeader)) {
    idxTxt = idxTxt.replace(regexLbHeader, newLbHeader);
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', idxTxt, 'utf8');
    console.log("Injected leaderboard tabs into index.html");
} else {
    console.log("Could not find LB header regex match");
}
