const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// The corrupted block starts around line 1594: `function handleArenaTap(event) {`
// Let's replace the whole handleArenaTap and whatever follows up to `if (avatar) avatar.innerHTML = getVectorFrame(key, false);`

const startStr = 'function handleArenaTap(event) {';
const endStr = 'if (avatar) avatar.innerHTML = getVectorFrame(key, false);';

const startIdx = app.indexOf(startStr);
const endIdx = app.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
    const newBlock = `function handleArenaTap(event) {
    if (event.target.closest('button') || event.target.closest('#shop-modal') || event.target.closest('#action-modal')) {
        return;
    }
    if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
    
    sheldonTapBuff = Math.min(3.0, sheldonTapBuff + 0.25);
    updateSheldonBuffBadge();

    const sheldonLvl = state.roster.sheldon ? state.roster.sheldon.level : 1;
    const sheldonPower = state.equipped['sheldon'] ? (characters.sheldon.baseDmg * sheldonLvl) : 1;
    const perkMult = state.perks ? (1 + (state.perks.dmgMult * 0.1)) : 1;
    
    const sheldonTalentMult = state.roster.sheldon && state.roster.sheldon.talents ? (1 + (state.roster.sheldon.talents.dmg * 0.10)) : 1;
    const tapDamage = Math.floor(sheldonPower * sheldonTalentMult * (1 + sheldonTapBuff) * perkMult * activeSynergies.dmgMult);

    if (state.equipped['sheldon']) {
        triggerUniqueVisuals('sheldon');
    }
    processDamage(tapDamage, 'sheldon');
}

let activeModalKey = null;

function openModal(event, key) {
    if (event) event.stopPropagation();
    activeModalKey = key;
    const config = characters[key];
    const lvl = state.roster[key] ? state.roster[key].level : 0;
    const isEquipped = state.equipped && state.equipped[key];
    const currentCost = Math.floor(config.cost.money * Math.pow(1.5, lvl));
    const data = state.roster[key];

    const avatar = document.getElementById('modal-char-avatar');
    const name = document.getElementById('modal-char-name');
    const desc = document.getElementById('modal-char-desc');
    const power = document.getElementById('modal-char-power');
    const lane = document.getElementById('modal-char-lane');
    const badge = document.getElementById('modal-char-badge');
    const costContainer = document.getElementById('modal-cost-container');

    const dmgEl = document.getElementById('modal-stat-dmg');
    const hpEl = document.getElementById('modal-stat-hp');
    const cdEl = document.getElementById('modal-stat-cd');
    const passiveEl = document.getElementById('modal-stat-passive');

    `;
    
    app = app.substring(0, startIdx) + newBlock + app.substring(endIdx);
    fs.writeFileSync('app.js', app);
    console.log('Fixed handleArenaTap and openModal');
} else {
    console.log('Could not find boundaries');
}
