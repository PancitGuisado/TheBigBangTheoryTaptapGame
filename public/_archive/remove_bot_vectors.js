const fs = require('fs');

try {
    let content = fs.readFileSync('vectors.js', 'utf8');
    
    content = content.replace('const vectors =', 'exports.vectors =');
    const bgIndex = content.indexOf('const backgrounds =');
    let backgroundsStr = '';
    if (bgIndex !== -1) {
        backgroundsStr = content.substring(bgIndex);
        content = content.substring(0, bgIndex);
    }
    
    fs.writeFileSync('temp_vectors2.js', content);
    
    const { vectors: v } = require('./temp_vectors2.js');
    
    const botsToRemove = [
        'r2d2_unit', 'battle_droid', 'droideka',
        'omac_unit', 'cyborg_support', 'apokolips_destroyer',
        'atom_boxer', 'zeus_titan', 'midas_speedster'
    ];
    
    for (const b of botsToRemove) {
        delete v[b];
    }
    
    let output = `const vectors = ${JSON.stringify(v, null, 4)};\n\n`;
    output += backgroundsStr;
    
    fs.writeFileSync('vectors.js', output);
    fs.unlinkSync('temp_vectors2.js');
    console.log('Successfully removed bot SVGs from vectors.js');
} catch (err) {
    console.error('Error removing bot SVGs:', err);
}
