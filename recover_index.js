const fs = require('fs');
const lines = fs.readFileSync('C:/Users/clawc/.gemini/antigravity/brain/c7860e56-eb4c-42fe-9845-64cf7398e15d/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
let latestObj = null;
for(let i = 0; i < lines.length; i++) {
    if(lines[i].includes('<!DOCTYPE html>') && lines[i].includes('</head>')) {
        try {
            latestObj = JSON.parse(lines[i]);
        } catch(e){}
    }
}
if(latestObj) {
    let html = latestObj.content;
    if (html.includes('<!DOCTYPE html>')) {
        html = html.substring(html.indexOf('<!DOCTYPE html>'));
    }
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index_recovered.html', html, 'utf8');
    console.log('Recovered HTML!');
}
