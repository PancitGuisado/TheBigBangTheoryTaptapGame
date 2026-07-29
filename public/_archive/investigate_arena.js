const fs = require('fs');
let app = fs.readFileSync('app_v2.js', 'utf8');

// handleArenaTap currently looks like this around 1607:
// const tapDamage = Math.floor(sheldonPower * sheldonTalentMult * (1 + sheldonTapBuff) * perkMult * activeSynergies.dmgMult);
// const avatar = document.getElementById('modal-char-avatar');
// ... [a bunch of modal stuff] ...
// } else { ...

// Let's find exactly where handleArenaTap starts, and manually fix it.
const startIdx = app.indexOf('function handleArenaTap(event) {');
const endTapDmgIdx = app.indexOf('activeSynergies.dmgMult);', startIdx) + 'activeSynergies.dmgMult);'.length;

// We need to inject processDamage(tapDamage, "sheldon"); and close the function.
// BUT what was supposed to be after handleArenaTap?
// Let's check what functions follow handleArenaTap in app_v2.js.
// We can just strip out the broken modal code inside handleArenaTap until we hit the next legitimate function.
