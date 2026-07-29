const fs = require('fs');

try {
    let vectorsContent = fs.readFileSync('vectors.js', 'utf8');
    
    // Snip everything after 'const backgrounds ='
    const bgIndex = vectorsContent.indexOf('const backgrounds =');
    if (bgIndex !== -1) {
        vectorsContent = vectorsContent.substring(0, bgIndex);
    }
    
    // Extracted backgrounds contains the entire string starting with "};\n\nconst backgrounds = {"
    // Wait, the view_file showed: `"};\n\nconst backgrounds = {`
    // It seems the extracted_backgrounds.js actually STARTS with `};\n\nconst backgrounds = {`
    // because I had `grep`-ed it or something.
    let bgContent = fs.readFileSync('extracted_backgrounds.js', 'utf8');
    
    // Remove the leading `"};\n\n` if it exists
    if (bgContent.startsWith('";\n\n')) {
        bgContent = bgContent.substring(4);
    } else if (bgContent.startsWith('};\n\n')) {
        bgContent = bgContent.substring(4);
    } else if (bgContent.startsWith('"};\n\n')) {
        bgContent = bgContent.substring(5);
    }
    
    // Clean up any broken prefixes. The extracted file seems to have `"}` at the top.
    const startIdx = bgContent.indexOf('const backgrounds =');
    if (startIdx !== -1) {
        bgContent = bgContent.substring(startIdx);
    }
    
    fs.writeFileSync('vectors.js', vectorsContent + '\n' + bgContent);
    console.log('Successfully restored highly detailed backgrounds!');
} catch (err) {
    console.error('Error restoring backgrounds:', err);
}
