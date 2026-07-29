const fs = require('fs');
let app = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');

// The corrupted block we need to fix
const corruptStartStr = `    const locIndex = typeof locationOrder !== 'undefined' ? locationOrder.indexOf(state.currentLocation) : 0;
    const locMultiplier = locIndex >= 0 ? Math.pow(1.5, locIndex) : 1.0;
function spawnEnemy() {
    const bossControls = document.getElementById('boss-controls');
    const timerDisplay = document.getElementById('boss-timer-display');
    const locationInfo = document.getElementById('location-name-display');
    const fightBossBtn = document.getElementById('fight-boss-btn');
    
    let chosenType;
    const currentLocationData = locations[state.currentLocation];

    if (locationInfo && currentLocationData) {
        locationInfo.innerText = "[LOC] " + currentLocationData.name;
    }

    if (typeof state.minionsDefeated === 'undefined') state.minionsDefeated = 0;

    const locIndex = typeof locationOrder !== 'undefined' ? locationOrder.indexOf(state.currentLocation) : 0;
    const locMultiplier = locIndex >= 0 ? Math.pow(1.5, locIndex) : 1.0;`;

const cleanStartStr = `    const locIndex = typeof locationOrder !== 'undefined' ? locationOrder.indexOf(state.currentLocation) : 0;
    const locMultiplier = locIndex >= 0 ? Math.pow(1.5, locIndex) : 1.0;`;

if (app.includes(corruptStartStr)) {
    app = app.replace(corruptStartStr, cleanStartStr);
}

// Fix minion HP scaling
app = app.replace(
    /currentEnemy\.maxHp = Math\.floor\(40 \* chosenType\.hpMultiplier \* locMultiplier \* Math\.pow\(1\.2, state\.wave - 1\)\);/g,
    "currentEnemy.maxHp = Math.floor(40 * chosenType.hpMultiplier * locMultiplier * Math.pow(1.15, state.wave - 1));"
);

// Fix boss HP scaling (already 1.25 from the corrupt edit, but let's make sure there are no remaining 1.4s)
app = app.replace(
    /currentEnemy\.maxHp = Math\.floor\(250 \* chosenType\.hpMultiplier \* locMultiplier \* Math\.pow\(1\.4, state\.wave - 1\)\);/g,
    "currentEnemy.maxHp = Math.floor(250 * chosenType.hpMultiplier * locMultiplier * Math.pow(1.25, state.wave - 1));"
);

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', app, 'utf8');
console.log('Fixed spawnEnemy corruption and applied minion/boss nerfs safely.');
