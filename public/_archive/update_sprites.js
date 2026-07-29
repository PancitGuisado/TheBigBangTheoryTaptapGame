const fs = require('fs');

try {
    let appContent = fs.readFileSync('app.js', 'utf8');

    // 1. Replace getVectorFrame
    const oldGetVectorRegex = /function getVectorFrame\(key, isEnemy = false\) \{[\s\S]*?\n\}/;
    const newGetVector = `
let globalAnimFrame = 1;
setInterval(() => {
    globalAnimFrame = globalAnimFrame === 1 ? 2 : 1;
    document.querySelectorAll('.sprite-anim').forEach(img => {
        const baseSrc = img.getAttribute('data-base-src');
        if (baseSrc) {
            img.src = baseSrc + globalAnimFrame + '.png';
        }
    });
}, 500);

function getVectorFrame(key, isEnemy = false, state = 'idle') {
    const charPaths = ['amy', 'bernie', 'bert', 'denise', 'howard', 'kripke', 'leonard', 'penny', 'raj', 'sheldon', 'stuart', 'wil'];
    if (charPaths.includes(key)) {
        let mirrorClass = 'scale-x-[-1]';
        if (state === 'attack1' || state === 'attack2') {
             return \`<img src="characters/\${key}/attack1.png" class="w-full h-full object-contain \${mirrorClass}" />\`;
        }
        return \`<img src="characters/\${key}/\${state}1.png" data-base-src="characters/\${key}/\${state}" class="sprite-anim w-full h-full object-contain \${mirrorClass}" />\`;
    }
    
    if (typeof vectors === 'undefined' || !vectors[key]) return '';
    if (typeof vectors[key] === 'string') return vectors[key];
    if (state === 'attack1' && vectors[key].attack1) return vectors[key].attack1;
    if (state === 'attack2' && vectors[key].attack2) return vectors[key].attack2;
    return vectors[key].idle || '';
}
`;
    appContent = appContent.replace(oldGetVectorRegex, newGetVector.trim());

    // 2. Replace player attack animation innerHTML
    const oldPlayerAttack = `
        if (wrapper && vectors[vectorKey] && vectors[vectorKey].attack1) {
            wrapper.classList.add('translate-x-4');
            
            // Show Windup (attack1)
            wrapper.innerHTML = vectors[vectorKey].attack1;
            
            // Show Strike (attack2) shortly after
            setTimeout(() => {
                if (wrapper && vectors[vectorKey].attack2) {
                    wrapper.innerHTML = vectors[vectorKey].attack2;
                }
            }, 100);
            
            // Finish Attack
            setTimeout(() => {
                if (wrapper && activeChars.has(charKey)) {
                    wrapper.innerHTML = vectors[vectorKey].idle;
                    wrapper.classList.remove('translate-x-4');
                }
            }, 300);
        }
`;
    const newPlayerAttack = `
        if (wrapper) {
            wrapper.classList.add('translate-x-4');
            
            // Show Windup (attack1)
            wrapper.innerHTML = getVectorFrame(vectorKey, false, 'attack1');
            
            // Show Strike (attack2) shortly after
            setTimeout(() => {
                if (wrapper) {
                    wrapper.innerHTML = getVectorFrame(vectorKey, false, 'attack2');
                }
            }, 100);
            
            // Finish Attack
            setTimeout(() => {
                if (wrapper && activeChars.has(charKey)) {
                    wrapper.innerHTML = getVectorFrame(vectorKey, false, 'idle');
                    wrapper.classList.remove('translate-x-4');
                }
            }, 300);
        }
`;
    appContent = appContent.replace(oldPlayerAttack.trim(), newPlayerAttack.trim());
    
    // Fallback if exactly matching didn't work for player attack
    if(appContent.includes("wrapper.innerHTML = vectors[vectorKey].attack1;")) {
        appContent = appContent.replace(/wrapper\.innerHTML = vectors\[vectorKey\]\.attack1;/g, "wrapper.innerHTML = getVectorFrame(vectorKey, false, 'attack1');");
        appContent = appContent.replace(/wrapper\.innerHTML = vectors\[vectorKey\]\.attack2;/g, "wrapper.innerHTML = getVectorFrame(vectorKey, false, 'attack2');");
        appContent = appContent.replace(/wrapper\.innerHTML = vectors\[vectorKey\]\.idle;/g, "wrapper.innerHTML = getVectorFrame(vectorKey, false, 'idle');");
    }

    // 3. Replace enemy attack animation innerHTML
    if(appContent.includes("enemyFrame.innerHTML = vectors[currentEnemy.key].attack1")) {
        appContent = appContent.replace(/enemyFrame\.innerHTML = vectors\[currentEnemy\.key\]\.attack1 \|\| vectors\[currentEnemy\.key\];/g, "enemyFrame.innerHTML = getVectorFrame(currentEnemy.key, true, 'attack1');");
        appContent = appContent.replace(/enemyFrame\.innerHTML = vectors\[currentEnemy\.key\]\.attack2 \|\| vectors\[currentEnemy\.key\]\.attack1 \|\| vectors\[currentEnemy\.key\];/g, "enemyFrame.innerHTML = getVectorFrame(currentEnemy.key, true, 'attack2');");
        appContent = appContent.replace(/enemyFrame\.innerHTML = vectors\[currentEnemy\.key\]\.idle \|\| vectors\[currentEnemy\.key\];/g, "enemyFrame.innerHTML = getVectorFrame(currentEnemy.key, true, 'idle');");
    }

    fs.writeFileSync('app.js', appContent);
    console.log('Successfully updated app.js to use new PNG sprites with animations!');
} catch (err) {
    console.error(err);
}
