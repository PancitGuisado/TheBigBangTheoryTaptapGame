const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const emptyHospital = '<div id="hospital-place" class="hidden flex-1 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950"></div>';
const fixedHospital = `
    <!-- ========== HOSPITAL PLACE ========== -->
    <div id="hospital-place" class="hidden flex-1 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
        <div class="p-4 flex flex-col h-full pointer-events-auto">
            <h2 class="text-xl font-bold tracking-widest text-emerald-400 uppercase drop-shadow-md text-center mb-4">🏥 HOSPITAL WARD</h2>
            <div id="hospital-beds-grid" class="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-2"></div>
        </div>
    </div>
`;

if (txt.includes(emptyHospital)) {
    txt = txt.replace(emptyHospital, fixedHospital);
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
    console.log('Fixed hospital-place in index.html');
} else {
    console.log('Could not find empty hospital-place in index.html');
}
