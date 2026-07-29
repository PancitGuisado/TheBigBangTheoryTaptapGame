const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

app = app.replace(/let outDmg = config\.baseDmg \* state\.roster\[key\]\.level;/g, 
`let outDmg = config.baseDmg * state.roster[key].level;
                if (state.roster[key].talents && state.roster[key].talents.dmg) {
                    outDmg = Math.floor(outDmg * (1 + (state.roster[key].talents.dmg * 0.10)));
                }`);

fs.writeFileSync('app.js', app);
console.log("Hooked up BP talents to damage!");
