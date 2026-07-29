const fs = require('fs');
const lines = fs.readFileSync('C:/Users/clawc/.gemini/antigravity/brain/c7860e56-eb4c-42fe-9845-64cf7398e15d/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

let bestHtml = '';
let maxLen = 0;

for(let i=0; i<lines.length; i++) {
    try {
        const obj = JSON.parse(lines[i]);
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
                    const args = call.args;
                    if (args.TargetFile && args.TargetFile.includes('index.html')) {
                        let content = args.CodeContent || args.ReplacementContent;
                        if (content && content.includes('id="action-modal"')) {
                            if (content.length > maxLen) {
                                maxLen = content.length;
                                bestHtml = content;
                            }
                        }
                    }
                }
            }
        }
        
        // Also check if any model output or system message just contained the raw HTML snippet
        if (obj.content && obj.content.includes('id="action-modal"')) {
            if (obj.content.length > maxLen && obj.content.includes('<div id="')) {
                // Not exactly reliable to just take content, but let's keep track of lengths
            }
        }
    } catch(e) {}
}

console.log('Max length found in tool calls:', maxLen);
if (bestHtml) {
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index_best_toolcall.html', bestHtml, 'utf8');
}

// Another approach: Just search the entire file as a single string for the biggest chunk between <div id="story-cutscene-overlay" and <div id="action-modal"
const fullText = fs.readFileSync('C:/Users/clawc/.gemini/antigravity/brain/c7860e56-eb4c-42fe-9845-64cf7398e15d/.system_generated/logs/transcript_full.jsonl', 'utf8');
const regex = /<div id=\\"story-cutscene-overlay\\".*?<div id=\\"action-modal\\"/g;
let match;
let bestChunk = '';
while ((match = regex.exec(fullText)) !== null) {
    if (match[0].length > bestChunk.length) {
        bestChunk = match[0];
    }
}
console.log('Max length of chunk found via regex:', bestChunk.length);
if (bestChunk) {
    // Unescape JSON stringified HTML
    bestChunk = bestChunk.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index_missing_chunk.html', bestChunk, 'utf8');
}

