const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: fs.createReadStream('C:\\\\Users\\\\clawc\\\\.gemini\\\\antigravity\\\\brain\\\\c7860e56-eb4c-42fe-9845-64cf7398e15d\\\\.system_generated\\\\logs\\\\transcript_full.jsonl'),
    crlfDelay: Infinity
});

let lastResponse = '';

rl.on('line', (line) => {
    try {
        const obj = JSON.parse(line);
        if (obj.type === 'TOOL_RESPONSE' && obj.content && obj.content.includes('The following changes were made by the multi_replace_file_content tool to:')) {
            lastResponse = obj.content;
        }
    } catch (e) {}
});

rl.on('close', () => {
    // Extract diff
    const diffMatch = lastResponse.split('[diff_block_start]');
    if (diffMatch.length > 1) {
        const diffText = diffMatch[1].split('[diff_block_end]')[0];
        const lines = diffText.split('\\n');
        let recovered = [];
        for (let l of lines) {
            if (l.startsWith('-') && !l.startsWith('---')) {
                recovered.push(l.substring(1));
            } else if (l.startsWith(' ') && !l.startsWith(' @@')) {
                recovered.push(l.substring(1));
            }
        }
        fs.writeFileSync('recovered_lines.txt', recovered.join('\\n'));
        console.log('Recovered ' + recovered.length + ' lines.');
    } else {
        console.log('No diff found in lastResponse.');
    }
});
