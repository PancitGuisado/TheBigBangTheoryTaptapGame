const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const targetStr = `<button onclick="openPvpHub()" class="bottom-tab group" data-tab="pvp">`;

const injection = `
            <button onclick="toggleHospitalPlace(event)" class="bottom-tab group" data-tab="clinic">
                <span class="text-lg group-hover:scale-110 transition-transform">🏥</span>
                <span class="bottom-tab-label text-emerald-400">Clinic</span>
            </button>
            <button onclick="openPvpHub()" class="bottom-tab group" data-tab="pvp">`;

if (txt.includes(targetStr) && !txt.includes('data-tab="clinic"')) {
    txt = txt.replace(targetStr, injection);
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
    console.log('Successfully added Clinic button to index.html');
} else if (txt.includes('data-tab="clinic"')) {
    console.log('Clinic button already exists');
} else {
    console.log('Could not find target string');
}
