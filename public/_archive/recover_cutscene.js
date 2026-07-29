const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: fs.createReadStream('C:\\\\Users\\\\clawc\\\\.gemini\\\\antigravity\\\\brain\\\\c7860e56-eb4c-42fe-9845-64cf7398e15d\\\\.system_generated\\\\logs\\\\transcript_full.jsonl'),
    crlfDelay: Infinity
});

let inViewFile = false;
let recoveredLines = [];

rl.on('line', (line) => {
    try {
        const obj = JSON.parse(line);
        if (obj.type === 'TOOL_RESPONSE' && obj.content && obj.content.includes('Showing lines 2597 to 2710')) {
            const contentLines = obj.content.split('\\n');
            for (let cLine of contentLines) {
                const match = cLine.match(/^\d+:\s(.*)/);
                if (match) {
                    recoveredLines.push(match[1]);
                }
            }
        }
        if (obj.type === 'TOOL_RESPONSE' && obj.content && obj.content.includes('Showing lines 2720 to 2780')) {
            const contentLines = obj.content.split('\\n');
            for (let cLine of contentLines) {
                const match = cLine.match(/^\d+:\s(.*)/);
                if (match) {
                    recoveredLines.push(match[1]);
                }
            }
        }
    } catch (e) {}
});

rl.on('close', () => {
    fs.writeFileSync('recovered_cutscene.js', recoveredLines.join('\\n'));
    console.log('Recovered ' + recoveredLines.length + ' lines of cutscene.');
});
