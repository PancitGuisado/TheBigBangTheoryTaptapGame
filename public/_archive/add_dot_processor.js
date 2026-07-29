const fs = require('fs');
const filePath = 'c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js';
let txt = fs.readFileSync(filePath, 'utf8');

// We'll append a setInterval at the end of the file or somewhere safe to process dots
const dotProcessor = `
// DOT PROCESSOR
setInterval(() => {
    if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
    if (typeof currentEnemy !== 'undefined' && currentEnemy !== null && currentEnemy.hp > 0 && currentEnemy.dots && currentEnemy.dots.length > 0) {
        for (let i = currentEnemy.dots.length - 1; i >= 0; i--) {
            let dot = currentEnemy.dots[i];
            processDamage(dot.dmg, dot.source);
            dot.ticks--;
            const enemyFrame = document.getElementById('enemy-graphic-frame');
            if (enemyFrame) {
                const rect = enemyFrame.getBoundingClientRect();
                generateDamagePopup({clientX: rect.left + rect.width/2, clientY: rect.top}, "DOT", false, false, true);
            }
            if (dot.ticks <= 0) {
                currentEnemy.dots.splice(i, 1);
            }
        }
    }
}, 1000);
`;

if (!txt.includes('// DOT PROCESSOR')) {
    txt += dotProcessor;
    fs.writeFileSync(filePath, txt, 'utf8');
    console.log("Added DOT processor to app_v2.js");
} else {
    console.log("DOT processor already exists in app_v2.js");
}
