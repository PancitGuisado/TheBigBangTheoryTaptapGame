const fs = require('fs');

try {
    let content = fs.readFileSync('vectors.js', 'utf8');
    
    // Convert const to module.exports
    content = content.replace('const vectors =', 'exports.vectors =');
    content = content.replace('const backgrounds =', 'exports.backgrounds =');
    
    fs.writeFileSync('temp_vectors.js', content);
    
    const { vectors, backgrounds } = require('./temp_vectors.js');
    
    const flatVectors = {};
    for (const [key, val] of Object.entries(vectors)) {
        if (typeof val === 'string') {
            flatVectors[key] = val;
        } else if (val && val.idle) {
            flatVectors[key] = val.idle;
        } else {
            flatVectors[key] = val;
        }
    }
    
    let output = `const vectors = ${JSON.stringify(flatVectors, null, 4)};\n\n`;
    if (backgrounds) {
        // Output backgrounds properly without JSON.stringify messing up HTML structure if possible, but JSON.stringify is safe.
        // Actually, JSON.stringify converts backticks to standard string format, which is safe.
        output += `const backgrounds = ${JSON.stringify(backgrounds, null, 4)};\n`;
    }
    
    fs.writeFileSync('vectors.js', output);
    fs.unlinkSync('temp_vectors.js');
    console.log('Successfully flattened vectors.js');
} catch (err) {
    console.error('Error flattening vectors.js:', err);
}
