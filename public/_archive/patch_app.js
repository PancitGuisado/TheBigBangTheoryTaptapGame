const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// 1. Replace startRobotAutomation
const newStartRobotAutomation = `function startRobotAutomation() {
    // Clear any existing robot timers
    if (!window.robotTimers) window.robotTimers = {};
    Object.values(window.robotTimers).forEach(clearInterval);
    window.robotTimers = {};

    for (const robot of state.robots) {
        if (!robot || !robot.equipped) continue;
        
        const config = robots[robot.blueprintId];
        let rate = config.atkSpeed / activeSynergies.robotSpeedMult;
        if (rageDuration > 0) rate *= 0.45;

        window.robotTimers[robot.id] = setInterval(() => {
            if (robot.overheated) return; // Cannot attack if overheated
            if (typeof hangoutMode !== 'undefined' && hangoutMode) return;
            
            if (typeof robot.heat === 'undefined' || isNaN(robot.heat)) robot.heat = 0;
            if (typeof robot.maxHeat === 'undefined' || isNaN(robot.maxHeat)) robot.maxHeat = (config.baseHeat || 200) * robot.level;
            
            // Add attacking heat
            robot.heat += Math.max(1, Math.floor(robot.maxHeat * 0.05)); // Add 5% heat per attack
            if (robot.heat >= robot.maxHeat) {
                robot.heat = robot.maxHeat;
                robot.overheated = true;
                if (typeof renderRobotBattleLine === 'function') renderRobotBattleLine();
            }

            // Visuals
            triggerRobotVisuals(robot.id, config);

            let rbDmg = config.baseDmg * robot.level;
            const rPerkMult = state.perks ? (1 + (state.perks.robotDmgMult * 0.1)) : 1;
            processDamage(Math.floor(rbDmg * rPerkMult), 'robot_' + robot.blueprintId);
        }, rate);
    }
}

window.executeRobotRepair = function(id, event) {
    if (event) event.stopPropagation();
    const robot = state.robots.find(r => r.id === id);
    if (!robot) return;
    const cost = robot.level * 10;
    if (state.resources.iron < cost) {
        if (typeof SoundManager !== 'undefined') SoundManager.play('error');
        return;
    }
    state.resources.iron -= cost;
    robot.heat = 0;
    robot.overheated = false;
    saveProgress();
    syncUI();
    renderRobotBattleLine();
};
`;

code = code.replace(/function startRobotAutomation\(\) \{[\s\S]*?\}\n\}\n/g, newStartRobotAutomation + "\n");

// 2. Fix triggerRobotVisuals ID bug
code = code.replace(/const el = document.getElementById\('robot-' \+ robotId\);/g, "const el = document.getElementById('live-robot-' + robotId);");

// 3. Inject heat bar into renderRobotBattleLine
const heatInjection = `
            let heatHtml = '';
            if (typeof robot.heat !== 'undefined') {
                const heatPct = Math.min(100, (robot.heat / (robot.maxHeat || 100)) * 100);
                const heatColor = robot.overheated ? 'bg-red-500' : 'bg-orange-500';
                
                let repairBtn = '';
                if (robot.overheated) {
                    const cost = robot.level * 10;
                    repairBtn = \`<button onclick="executeRobotRepair('\${robot.id}', event)" class="absolute -top-8 bg-red-600 text-white font-bold text-[7px] px-1 py-0.5 rounded shadow pointer-events-auto border border-red-800 z-50">REPAIR \${cost}⚙️</button>\`;
                }
                
                heatHtml = \`
                    \${repairBtn}
                    <div class="absolute -left-3 bottom-0 w-1.5 h-[80%] bg-gray-900 border border-gray-700 rounded overflow-hidden">
                        <div class="w-full \${heatColor} transition-all duration-300 absolute bottom-0" style="height: \${heatPct}%"></div>
                    </div>
                \`;
            }
            
            container.innerHTML += \`
                <div id="live-robot-\${robot.id}" 
                     class="live-character-frame relative flex flex-col items-center justify-end cursor-pointer hover:scale-[1.02] transition-transform pointer-events-auto \${floatClass} \${robot.overheated ? 'grayscale opacity-75 animate-pulse' : ''}" 
                     style="z-index: \${lore.z};"
                     onclick="openRobotModal(event, '\${robot.blueprintId}')">
                    \${heatHtml}
                    <div class="character-vector-wrapper flex items-center justify-center text-4xl" style="transform: scale(\${lore.scale}); transform-origin: bottom center;">\${svg}</div>
`;

code = code.replace(/container\.innerHTML \+= `\s*<div id="live-robot-\$\{robot\.id\}"[\s\S]*?onclick="openRobotModal\(event, '\$\{robot\.blueprintId\}'\)">\s*<div class="character-vector-wrapper flex items-center justify-center text-4xl" style="transform: scale\(\$\{lore\.scale\}\); transform-origin: bottom center;">\$\{svg\}<\/div>/g, heatInjection);

fs.writeFileSync('app_v2.js', code);
console.log("Done patching app_v2.js");
