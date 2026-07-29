const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `            const rageFx = document.createElement('div');
            rageFx.className = 'unique-fx penny-rage-wave';
            rageFx.style.left = \`50%\`;
            rageFx.style.top = \`50%\`;
            rageFx.innerHTML = \`<div class="rage-banner">?? BURGER RAGE ACTIVATED! ??</div>\`;
            arena.appendChild(rageFx);
            setTimeout(() => rageFx.remove(), 1200);`;

app = app.replace(targetStr, '');
fs.writeFileSync('app.js', app);
console.log("Removed the center screen rage banner");
