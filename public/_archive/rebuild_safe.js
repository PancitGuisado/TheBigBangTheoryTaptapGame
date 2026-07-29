const fs = require('fs');

let app = fs.readFileSync('app_broken_backup.js', 'utf8');

// The syntax error is at:
// ParticleSystem.start(locKey);
// }
//                 bossTimer = 0;
//                 failBossFight();
//             }

// We want to remove the bossTimer = 0; failBossFight(); } part.
const badSnippet = "ParticleSystem.start(locKey);\n}\n                bossTimer = 0;\n                failBossFight();\n            }";
const goodSnippet = "ParticleSystem.start(locKey);\n}";

app = app.replace(badSnippet, goodSnippet);

// Wait, the syntax error might have been because the beginning of spawnEnemy() was deleted!
// Let's check if spawnEnemy is defined.
const hasSpawnEnemy = app.includes('function spawnEnemy() {');
if (!hasSpawnEnemy) {
    // If it's not defined, it means the entire top half of spawnEnemy was deleted!
    console.log('spawnEnemy is missing! We need to restore it.');
    
    const pristine = fs.readFileSync('backup_temp/app.js', 'utf8');
    const updateMapStart = pristine.indexOf('function updateMapBackground() {');
    const spawnEnemyEnd = pristine.indexOf('function generateDamagePopup');
    
    // In pristine, updateMapBackground and spawnEnemy are sequential.
    // Let's grab updateMapBackground and spawnEnemy from pristine.
    const cleanSection = pristine.substring(updateMapStart, spawnEnemyEnd);
    
    // Now find where updateMapBackground starts in app_broken_backup.js
    const brokenStart = app.indexOf('function updateMapBackground() {');
    const brokenEnd = app.indexOf('function generateDamagePopup');
    
    app = app.substring(0, brokenStart) + cleanSection + app.substring(brokenEnd);
}

// 2. We also need to fix SoundManager upgrade audio
app = app.replace(
    'state.roster[activeModalKey].level++;',
    'state.roster[activeModalKey].level++;\n            SoundManager.play("hospital_heal"); // Use heal sound as level up'
);

// 3. Fix playFX cooldown and volume
app = app.replace('if (nowMs - this.lastFxTime < 8000) return;', 'if (nowMs - this.lastFxTime < 100) return;');
app = app.replace('gain.gain.setValueAtTime(vol * 0.15, now);', 'gain.gain.setValueAtTime(vol * 1.5, now);'); // shoot
app = app.replace('gain.gain.linearRampToValueAtTime(vol * 0.25, now + 0.05);', 'gain.gain.linearRampToValueAtTime(vol * 1.5, now + 0.05);'); // slash

// 4. Ensure we don't have the mangled replace output from the previous failed replacement
// Wait, app_broken_backup.js wasn't mangled by the previous replace_file_content, but the PREVIOUS tool call DID modify app_broken_backup.js!!
// Oh no, the previous tool call modified app_broken_backup.js directly!
// I need to use the actual backup or reverse that change.
