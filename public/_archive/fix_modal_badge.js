const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');

const target1 = `    if (avatar) avatar.innerHTML = getVectorFrame(key, false);
    if (name) name.innerText = config.name;`;

const replacement1 = `    if (avatar) avatar.innerHTML = getVectorFrame(key, false, (data && data.status === 'hospitalized') ? 'injured' : null);
    if (name) name.innerText = config.name;`;

const target2 = `    if (badge) {
        if (lvl > 0) {
            badge.innerText = isEquipped ? \`ACTIVE LEVEL \${lvl}\` : \`BENCHED LEVEL \${lvl}\`;
            badge.className = isEquipped ? "bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase" : "bg-amber-950 text-amber-400 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase";
        } else {`;

const replacement2 = `    if (badge) {
        if (lvl > 0) {
            if (data && data.status === 'hospitalized') {
                badge.innerText = \`HOSPITALIZED (KO)\`;
                badge.className = "bg-red-950 text-red-400 border border-red-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase";
            } else {
                badge.innerText = isEquipped ? \`ACTIVE LEVEL \${lvl}\` : \`BENCHED LEVEL \${lvl}\`;
                badge.className = isEquipped ? "bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase" : "bg-amber-950 text-amber-400 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase";
            }
        } else {`;

txt = txt.replace(target1, replacement1);
txt = txt.replace(target2, replacement2);

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', txt, 'utf8');
console.log('Fixed gang modal badge and avatar logic');
