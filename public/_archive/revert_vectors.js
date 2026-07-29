const fs = require('fs');

try {
    const vectorsContent = fs.readFileSync('vectors.js', 'utf8');
    
    // We need to evaluate it to get the object.
    eval(vectorsContent.replace('const vectors =', 'global.vectors =').replace('const backgrounds =', 'global.backgrounds ='));
    
    const flatVectors = {};
    for (const [key, val] of Object.entries(global.vectors)) {
        if (typeof val === 'string') {
            flatVectors[key] = val;
        } else if (val && val.idle) {
            flatVectors[key] = val.idle;
        } else {
            flatVectors[key] = val;
        }
    }
    
    let output = `const vectors = ${JSON.stringify(flatVectors, null, 4)};\n\n`;
    if (global.backgrounds) {
        output += `const backgrounds = ${JSON.stringify(global.backgrounds, null, 4)};\n`;
    }
    
    fs.writeFileSync('vectors.js', output);
    console.log('Successfully flattened vectors.js');
} catch (err) {
    console.error('Error flattening vectors.js:', err);
}
