const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// Add a global character audio player function near the top
const charAudioFunc = `
// Character voice lines - plays when clicking a character
var _charAudioPlayer = null;
function playCharacterVoice(key) {
    var charAudioMap = {
        sheldon: 'sounds/characters/sheldon.mp3',
        penny: 'sounds/characters/penny.mp3',
        leonard: 'sounds/characters/leonard.mp3',
        howard: 'sounds/characters/howard.mp3',
        raj: 'sounds/characters/raj.mp3',
        amy: 'sounds/characters/amy.mp3',
        bernie: 'sounds/characters/bernie.mp3',
        stuart: 'sounds/characters/stuart.mp3'
    };
    if (!charAudioMap[key]) return;
    if (_charAudioPlayer) {
        _charAudioPlayer.pause();
        _charAudioPlayer.currentTime = 0;
    }
    _charAudioPlayer = new Audio(charAudioMap[key]);
    _charAudioPlayer.volume = typeof SoundManager !== 'undefined' ? (SoundManager.volumes.character || 0.5) : 0.5;
    _charAudioPlayer.play().catch(function() {});
}

`;

// Insert before the first openModal function
if (!code.includes('function playCharacterVoice')) {
    code = code.replace(
        'function openModal(event, key) {\n    if (event) event.stopPropagation();\n    activeModalKey = key;\n    const config = characters[key];\n    const lvl = state.roster[key] ? state.roster[key].level : 0;\n    const isEquipped = state.equipped && state.equipped[key];\n    const currentCost = Math.floor(config.cost.money * Math.pow(1.5, lvl));\n    const data = state.roster[key];',
        charAudioFunc + 'function openModal(event, key) {\n    if (event) event.stopPropagation();\n    activeModalKey = key;\n    const config = characters[key];\n    const lvl = state.roster[key] ? state.roster[key].level : 0;\n    const isEquipped = state.equipped && state.equipped[key];\n    const currentCost = Math.floor(config.cost.money * Math.pow(1.5, lvl));\n    const data = state.roster[key];'
    );
    console.log('✅ Added playCharacterVoice function');
}

// Now add playCharacterVoice call to BOTH openModal functions
// For both instances, add the call right after "activeModalKey = key;"
// We need to be careful since there are 2 openModal functions

// Replace all instances of the pattern
let count = 0;
code = code.replace(/function openModal\(event, key\) \{\r?\n\s+if \(event\) event\.stopPropagation\(\);\r?\n\s+activeModalKey = key;/g, function(match) {
    count++;
    return match + '\n    playCharacterVoice(key);';
});
console.log('✅ Added playCharacterVoice call to ' + count + ' openModal functions');

// Remove any old SoundManager.play('sheldon_equip') or similar character sounds in executeModalAction
code = code.replace(
    /    if \(mode === 'buy'\) \{\r?\n\s+SoundManager\.playFX\('levelup'\);\r?\n\s+\} else if \(mode === 'equip' \|\| mode === 'unequip'\) \{\r?\n\s+SoundManager\.play\('sheldon_equip'\);\r?\n\s+\}/,
    "    // Character voice plays on modal open instead"
);
console.log('✅ Removed old equip sounds from executeModalAction');

fs.writeFileSync('app_v2.js', code);

let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');

// Cache buster
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/v=1781\d+/g, 'v=1781458000000');
fs.writeFileSync('index.html', html);
console.log('✅ Cache updated');
