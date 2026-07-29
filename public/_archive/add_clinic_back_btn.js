const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const targetStr = `<h2 class="text-xl font-bold tracking-widest text-emerald-400 uppercase drop-shadow-md text-center mb-4">🏥 HOSPITAL WARD</h2>`;

const injection = `
            <div class="relative w-full flex justify-center items-center mb-4">
                <button onclick="toggleHospitalPlace()" class="absolute left-0 top-0 bg-red-950/80 hover:bg-red-800 text-white font-bold py-1 px-3 rounded border border-red-700 transition-colors shadow-md text-sm z-50">
                    &larr; BACK
                </button>
                <h2 class="text-xl font-bold tracking-widest text-emerald-400 uppercase drop-shadow-md">🏥 HOSPITAL WARD</h2>
            </div>`;

if (txt.includes(targetStr) && !txt.includes('&larr; BACK')) {
    txt = txt.replace(targetStr, injection);
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
    console.log('Successfully added back button to hospital place');
} else if (txt.includes('&larr; BACK')) {
    console.log('Back button already exists');
} else {
    console.log('Could not find target string');
}
