const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');
const broken = fs.readFileSync('app_broken_backup.js', 'utf8').split('\n');

// 1. Extract SoundManager (lines 0 to 169)
const smLines = broken.slice(0, 170).join('\n');

// 2. Extract Cutscene (lines 1857 to 2030)
const cutsceneLines = broken.slice(1857, 2031).join('\n');

// Prepend SoundManager
app = smLines + '\n' + app;

// Append Cutscene
app = app + '\n' + cutsceneLines + '\n';

// 3. Apply fixes
app = app.replace('function initGame() {', 'function initGame() {\n    if(SoundManager.init) { SoundManager.init(); SoundManager.startAmbientLoop(); }');

app = app.replace('if (nowMs - this.lastFxTime < 8000) return;', 'if (nowMs - this.lastFxTime < 100) return;');

// Adjust volume for shoot (make it louder)
app = app.replace('gain.gain.setValueAtTime(vol * 0.15, now);', 'gain.gain.setValueAtTime(vol * 1.5, now);');

// Adjust volume for slash (make it louder)
app = app.replace('gain.gain.linearRampToValueAtTime(vol * 0.25, now + 0.05);', 'gain.gain.linearRampToValueAtTime(vol * 1.5, now + 0.05);');

// Fix upgrade spam audio
app = app.replace(
    'state.roster[activeModalKey].level++;',
    'state.roster[activeModalKey].level++;\n            if(SoundManager.play) SoundManager.play("hospital_heal");'
);

// Remove the sheldon click sound from the minigame if it exists
app = app.replace("SoundManager.play('sheldon_click');", "");
app = app.replace("SoundManager.play('penny_click');", "");

fs.writeFileSync('app.js', app);
console.log('App successfully rebuilt Phase 2!');
