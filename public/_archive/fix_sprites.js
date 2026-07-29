const fs = require('fs');

try {
    let appContent = fs.readFileSync('app.js', 'utf8');

    // Regex to match the globalAnimFrame logic and getVectorFrame function
    const oldCodeRegex = /let globalAnimFrame = 1;\s*setInterval\(\(\) => \{[\s\S]*?\}, 500\);\s*function getVectorFrame\(key, isEnemy = false, state = 'idle'\) \{[\s\S]*?return vectors\[key\]\.idle \|\| '';\n\}/;

    const newCode = `
function getVectorFrame(key, isEnemy = false, state = 'idle') {
    const charPaths = ['amy', 'bernie', 'bert', 'denise', 'howard', 'kripke', 'leonard', 'penny', 'raj', 'sheldon', 'stuart', 'wil'];
    if (charPaths.includes(key)) {
        let mirrorClass = 'scale-x-[-1]';
        
        // Lore accurate sizing modifiers
        const charScale = {
            sheldon: 'scale-[1.15] -translate-y-2',
            leonard: 'scale-[0.95]',
            penny: 'scale-[1.0]',
            howard: 'scale-[0.85] translate-y-1',
            raj: 'scale-[0.95]',
            bernie: 'scale-[0.70] translate-y-4',
            amy: 'scale-[0.95]',
            stuart: 'scale-[0.95]',
            wil: 'scale-[1.0]',
            bert: 'scale-[1.35] -translate-y-6',
            kripke: 'scale-[1.0]',
            denise: 'scale-[0.9] translate-y-1'
        };
        const sizeClass = charScale[key] || '';

        // Map abstract state to specific files based on user instruction
        let fileState = 'idle1';
        if (state === 'attack1' || state === 'attack2') fileState = 'attack1';
        else if (state === 'injured' || state === 'dead') fileState = 'idle2';
        else if (state === 'walking') fileState = 'walking1';
        else fileState = 'idle1';

        // using max-w-none to prevent cutting off width if it spills over the container slightly due to scaling
        return \`<img src="characters/\${key}/\${fileState}.png" class="max-w-none w-full h-full object-contain object-bottom \${mirrorClass} \${sizeClass}" style="pointer-events: none;" />\`;
    }
    
    if (typeof vectors === 'undefined' || !vectors[key]) return '';
    if (typeof vectors[key] === 'string') return vectors[key];
    if (state === 'attack1' && vectors[key].attack1) return vectors[key].attack1;
    if (state === 'attack2' && vectors[key].attack2) return vectors[key].attack2;
    return vectors[key].idle || '';
}
`;

    if (appContent.match(oldCodeRegex)) {
        appContent = appContent.replace(oldCodeRegex, newCode.trim());
        fs.writeFileSync('app.js', appContent);
        console.log('Successfully updated sprite handling logic!');
    } else {
        console.log('Could not find the target code block to replace!');
    }
} catch (err) {
    console.error(err);
}
