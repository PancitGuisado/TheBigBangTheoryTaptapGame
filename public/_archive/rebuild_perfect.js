const fs = require('fs');

// 1. Start with app_broken_backup.js
let broken = fs.readFileSync('app_broken_backup.js', 'utf8');
let lines = broken.split('\n');

// 2. Remove the duplicated block
let firstMapBg = -1;
let secondMapBg = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('function updateMapBackground() {')) {
        if (firstMapBg === -1) firstMapBg = i;
        else if (secondMapBg === -1) secondMapBg = i;
    }
}
if (firstMapBg !== -1 && secondMapBg !== -1) {
    lines.splice(firstMapBg, secondMapBg - firstMapBg);
}

let cleanedApp = lines.join('\n');

// 3. Inject true_missing.js
let missing = fs.readFileSync('true_missing.js', 'utf8');
let insertIdx = cleanedApp.indexOf('function triggerBossFight(event)');
if (insertIdx !== -1) {
    cleanedApp = cleanedApp.substring(0, insertIdx) + missing + "\n\n" + cleanedApp.substring(insertIdx);
}

// 4. Add onclick to renderActiveBattleLine
cleanedApp = cleanedApp.replace(
    /class="live-character-frame relative flex flex-col items-center justify-end"/g,
    'onclick="openModal(event, \'' + '${key}' + '\')" class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:brightness-125 transition"'
);

// 5. Prepend updateMapBackground()
if (!cleanedApp.includes("updateMapBackground();\n    currentEnemy.hp = currentEnemy.maxHp;")) {
    cleanedApp = cleanedApp.replace('currentEnemy.hp = currentEnemy.maxHp;', "updateMapBackground();\n    currentEnemy.hp = currentEnemy.maxHp;");
}

// 6. Audio fix: cooldown & volume
cleanedApp = cleanedApp.replace(
    "if (nowMs - this.lastFxTime < 8000) return; // 8 second cooldown to prevent spam",
    ""
);
cleanedApp = cleanedApp.replace(
    "if (type === 'shoot') {\n            // Retro laser \"pew\"",
    "if (type === 'shoot') {\n            if (nowMs - this.lastFxTime < 150) return;\n            this.lastFxTime = nowMs;\n            // Retro laser \"pew\""
);
cleanedApp = cleanedApp.replace(
    "gain.gain.setValueAtTime(vol * 0.15, now);",
    "gain.gain.setValueAtTime(vol * 0.5, now);"
);
cleanedApp = cleanedApp.replace(
    "} else if (type === 'slash') {\n            // Melee \"swoosh\"",
    "} else if (type === 'slash') {\n            if (nowMs - this.lastFxTime < 150) return;\n            this.lastFxTime = nowMs;\n            // Melee \"swoosh\""
);
cleanedApp = cleanedApp.replace(
    "gain.gain.linearRampToValueAtTime(vol * 0.25, now + 0.05);",
    "gain.gain.linearRampToValueAtTime(vol * 0.8, now + 0.05);"
);

// 7. Add levelup sound
let levelupCode = `        } else if (type === 'levelup') {
            // Happy level up arpeggio
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.1);
            osc.frequency.setValueAtTime(554.37, now + 0.1);
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2);
            osc.frequency.setValueAtTime(659.25, now + 0.2);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
            
            gain.gain.setValueAtTime(0.01, now);
            gain.gain.linearRampToValueAtTime(this.volumes.scene * 0.6, now + 0.05);
            gain.gain.setValueAtTime(this.volumes.scene * 0.6, now + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            
            osc.start(now);
            osc.stop(now + 0.5);
        }`;

cleanedApp = cleanedApp.replace(
    "osc.stop(now + 0.15);\n        }\n    },",
    "osc.stop(now + 0.15);\n" + levelupCode + "\n    },"
);

// 8. Replace sheldon_level with playFX('levelup')
cleanedApp = cleanedApp.replace(
    "SoundManager.play('sheldon_level');",
    "SoundManager.playFX('levelup');"
);

fs.writeFileSync('app.js', cleanedApp);
console.log("App.js rebuilt perfectly.");
