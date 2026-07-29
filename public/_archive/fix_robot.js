const fs = require('fs');

const correctFunction = \
function startRobotAutomation() {
    // Clear any existing robot timers
    if (!window.robotTimers) window.robotTimers = {};
    Object.values(window.robotTimers).forEach(clearInterval);
    window.robotTimers = {};

    for (const robot of state.robots) {
        if (!robot || !robot.equipped) continue;
        
        const config = robots[robot.blueprintId];
        let rate = config.atkSpeed;
        if (typeof activeSynergies !== 'undefined' && activeSynergies.robotSpeedMult) {
            rate = rate / activeSynergies.robotSpeedMult;
        }
        if (rageDuration > 0) rate *= 0.45;

        window.robotTimers[robot.id] = setInterval(() => {
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            let rbDmg = config.baseDmg * robot.level;
            const rPerkMult = state.perks ? (1 + (state.perks.robotDmgMult * 0.1)) : 1;
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);
        }, rate);
    }
}
\;

let app = fs.readFileSync('app.js', 'utf8');

// The file might be mangled around 'const config = robots[robot.blueprintId];'
// Let's replace from 'const config = robots[robot.blueprintId];' up to the end of the function.
// Since the start of the function is missing or mangled, let's just find the closing brace of renderRobotsPlace() and replace until the next function.

const startRegex = /function renderRobotBattleLine\(\) \{[\s\S]*?\n\}/;
const match = app.match(startRegex);
if (match) {
    // The mangled part is right after renderRobotBattleLine()
    // It looks like:
    //         const config = robots[robot.blueprintId];
    //         let rate = config.atkSpeed;
    //         ...
    
    // We'll just replace everything between renderRobotBattleLine() and the end of the mangled loop
    // Let's do a more robust approach: regex to find the mangled snippet
    const mangledRegex = /const config = robots\[robot\.blueprintId\];[\s\S]*?}, rate\);\n    \}/;
    app = app.replace(mangledRegex, '');
    
    // Also remove the stray \        const config = robots[robot.blueprintId];\ and \        let rate = config.atkSpeed;\ etc if any are left
    // Best way: append correctFunction right before function renderCraftingQueue()
    app = app.replace('function renderCraftingQueue()', correctFunction + '\n\nfunction renderCraftingQueue()');
    
    fs.writeFileSync('app.js', app);
    console.log('Fixed startRobotAutomation');
} else {
    console.log('Could not find renderRobotBattleLine');
}
