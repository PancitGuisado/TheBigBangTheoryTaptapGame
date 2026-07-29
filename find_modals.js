const fs = require('fs');
const lines = fs.readFileSync('C:/Users/clawc/.gemini/antigravity/brain/c7860e56-eb4c-42fe-9845-64cf7398e15d/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
let best = '';
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('id="food-modal"')) {
        best = lines[i];
    }
}
if(best) {
    console.log('Found! Length: ' + best.length);
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/found_modals.json', best, 'utf8');
} else {
    console.log('Not found!');
}
