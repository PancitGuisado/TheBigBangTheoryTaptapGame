const fs = require('fs');

try {
    let bgContent = fs.readFileSync('extracted_backgrounds.js', 'utf8');
    
    // It is an escaped string without the surrounding quotes. Let's unescape it.
    // Try JSON.parse
    let unescaped = "";
    try {
        unescaped = JSON.parse('"' + bgContent.replace(/"/g, '\\"') + '"'); // wait, if it already has \", replacing " with \" will make \\\"
    } catch (e) {
        // Fallback
        unescaped = bgContent.replace(/\\n/g, '\n').replace(/\\"/g, '"');
    }
    
    // Let's just use the fallback because we know it's \n and \"
    unescaped = bgContent.replace(/\\n/g, '\n').replace(/\\"/g, '"');
    
    // Now we need to append this properly to vectors.js
    let vectorsContent = fs.readFileSync('vectors.js', 'utf8');
    const bgIndex = vectorsContent.indexOf('const backgrounds = {\\n');
    if (bgIndex !== -1) {
        vectorsContent = vectorsContent.substring(0, bgIndex);
    } else {
        const bgIndex2 = vectorsContent.indexOf('const backgrounds =');
        if (bgIndex2 !== -1) {
            vectorsContent = vectorsContent.substring(0, bgIndex2);
        }
    }
    
    // Ensure vectors object is properly closed
    if (!vectorsContent.trim().endsWith('};')) {
        vectorsContent = vectorsContent.trim();
        // If it ends with a quote, it might just need };
        if (!vectorsContent.endsWith('}')) {
            vectorsContent += '\n};';
        }
    }
    
    // Clean up unescaped
    if (unescaped.startsWith('};\n\n')) {
        unescaped = unescaped.substring(4);
    } else if (unescaped.startsWith('";\n\n')) {
        unescaped = unescaped.substring(4);
    } else if (unescaped.startsWith('"};\n\n')) {
        unescaped = unescaped.substring(5);
    }
    
    const startIdx = unescaped.indexOf('const backgrounds =');
    if (startIdx !== -1) {
        unescaped = unescaped.substring(startIdx);
    }
    
    fs.writeFileSync('vectors.js', vectorsContent + '\n\n' + unescaped);
    console.log('Fixed vectors.js!');
} catch (err) {
    console.error(err);
}
