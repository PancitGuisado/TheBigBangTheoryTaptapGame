const fs = require('fs');

function decodeMojibake(str) {
    try {
        return Buffer.from(str, 'latin1').toString('utf8');
    } catch(e) {
        return str;
    }
}

let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/vectors.js', 'utf8');

const mapping = {
    'Qâˆž': 'Q∞',
    'ðŸ ¾': '🐾',
    'âš ï¸ ': '⚠️',
    'ðŸ ¼': '🏟️',
    'ðŸ ²': '🎲',
    'ðŸ  ': '🏠',
    'ðŸ¥˜': '🥘',
    'ðŸ¦•': '🦕',
    'âš”': '⚔️',
    'ðŸ›¡': '🛡️',
    'âœ¦': '✦',
    'ðŸ’€': '💀',
    'ðŸ¦´': '🦴'
};

for (const [bad, good] of Object.entries(mapping)) {
    txt = txt.split(bad).join(good);
}

// Let's also do a pass using buffer decoding just in case
let newTxt = '';
for(let i=0; i<txt.length; i++) {
    // This is risky, let's just stick to the manual mapping which is safe.
}

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/vectors.js', txt, 'utf8');
console.log('Fixed vectors.js emojis!');
