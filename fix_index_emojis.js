const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const mapping = {
    'o-': '✖',
    'dY` ': '👕',
    's",?': '⚔️',
    'dY\'-': '💖',
    '?,?': '⏱️',
    'dY,': '🪄',
    'ðŸ †': '🏆',
    'ðŸ ¾': '🐾'
};

for (const [bad, good] of Object.entries(mapping)) {
    txt = txt.split(bad).join(good);
}

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Fixed index.html emojis!');
