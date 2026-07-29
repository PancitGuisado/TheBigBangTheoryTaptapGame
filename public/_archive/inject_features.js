const fs = require('fs');

try {
    let appContent = fs.readFileSync('app.js', 'utf8');

    // 1. ADD TALENT TREES TO OPEN MODAL
    const modalFuncMatch = appContent.match(/function openModal\(charKey\) \{[\s\S]*?document\.getElementById\('action-modal'\)\.classList\.remove\('hidden'\);\n\}/);
    if (modalFuncMatch) {
        let newModalFunc = modalFuncMatch[0].replace(
            "document.getElementById('action-modal').classList.remove('hidden');",
            `
    // TALENTS SYSTEM RENDER
    const bpDisplay = document.getElementById('modal-bp-val');
    if (bpDisplay) bpDisplay.innerText = state.bazingaPoints || 0;
    
    const talentsContainer = document.getElementById('modal-talents-container');
    if (talentsContainer) {
        if (!state.roster[charKey].talents) {
            state.roster[charKey].talents = { dmg: 0, hp: 0 };
        }
        
        const dmgLvl = state.roster[charKey].talents.dmg;
        const hpLvl = state.roster[charKey].talents.hp;
        
        talentsContainer.innerHTML = \`
            <div class="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-700">
                <div>
                    <div class="text-red-400 font-bold uppercase tracking-wider">💥 Power Strike [Lv.\${dmgLvl}]</div>
                    <div class="text-[8px] text-gray-500 uppercase">+10% Base DMG</div>
                </div>
                <button onclick="buyTalent('\${charKey}', 'dmg')" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded text-[9px] shadow cursor-pointer uppercase tracking-wider">\${dmgLvl < 5 ? '1 BP' : 'MAX'}</button>
            </div>
            <div class="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-700">
                <div>
                    <div class="text-green-400 font-bold uppercase tracking-wider">🛡️ Plot Armor [Lv.\${hpLvl}]</div>
                    <div class="text-[8px] text-gray-500 uppercase">+20% Base HP</div>
                </div>
                <button onclick="buyTalent('\${charKey}', 'hp')" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded text-[9px] shadow cursor-pointer uppercase tracking-wider">\${hpLvl < 5 ? '1 BP' : 'MAX'}</button>
            </div>
        \`;
    }
    document.getElementById('action-modal').classList.remove('hidden');
            `
        );
        appContent = appContent.replace(modalFuncMatch[0], newModalFunc);
    }

    // 2. ADD BUY TALENT FUNCTION
    appContent += `
window.buyTalent = function(charKey, type) {
    if (!state.bazingaPoints || state.bazingaPoints < 1) return;
    if (!state.roster[charKey].talents) state.roster[charKey].talents = { dmg: 0, hp: 0 };
    
    if (state.roster[charKey].talents[type] < 5) {
        state.bazingaPoints--;
        state.roster[charKey].talents[type]++;
        
        // If HP talent, immediately increase maxHP and currentHP proportionally
        if (type === 'hp') {
            const config = characters[charKey];
            const charLvl = state.roster[charKey].level;
            const baseMaxHp = Math.floor((config.baseHp || 100) * Math.pow(1.25, charLvl - 1));
            const newMaxHp = Math.floor(baseMaxHp * (1 + (state.roster[charKey].talents.hp * 0.20)));
            state.roster[charKey].maxHp = newMaxHp;
            state.roster[charKey].currentHp = newMaxHp; // Heal to full on upgrade
        }
        
        saveProgress();
        syncUI();
        openModal(charKey);
        renderRosterGrid();
        renderHospitalPlace();
    }
};
`;

    // 3. HOOK TALENTS INTO COMBAT DAMAGE CALCULATION
    const handleArenaTapRegex = /const tapDamage = Math\.floor\(sheldonPower \* \(1 \+ sheldonTapBuff\) \* perkMult \* activeSynergies\.dmgMult\);/;
    appContent = appContent.replace(handleArenaTapRegex, `
    const sheldonTalentMult = state.roster.sheldon && state.roster.sheldon.talents ? (1 + (state.roster.sheldon.talents.dmg * 0.10)) : 1;
    const tapDamage = Math.floor(sheldonPower * sheldonTalentMult * (1 + sheldonTapBuff) * perkMult * activeSynergies.dmgMult);
    `);

    // 4. HANGOUT MINIGAMES
    const hangoutActionOld = /function hangoutAction\(type, event\) \{[\s\S]*?break;\n    \}\n\}/;
    const hangoutActionNew = `
function hangoutAction(type, event) {
    if (event) event.stopPropagation();
    
    if (type === 'whiteboard') {
        startWhiteboardMinigame();
    } else if (type === 'couch') {
        startCouchMinigame();
    } else if (type === 'bookcase') {
        const msg = "A collection of mint-condition comic books.";
        generateDamagePopup({clientX: event.clientX, clientY: event.clientY}, msg, false, true);
    } else if (type === 'door') {
        const msg = "*Knock knock knock* Penny?";
        generateDamagePopup({clientX: event.clientX, clientY: event.clientY}, msg, false, true);
        SoundManager.play('sheldon_knock');
    }
}

let minigameActive = false;
let minigameScore = 0;
let minigameTimer = null;

function startWhiteboardMinigame() {
    if (minigameActive) return;
    minigameActive = true;
    minigameScore = 0;
    
    const arena = document.getElementById('arena');
    const overlay = document.createElement('div');
    overlay.id = 'minigame-overlay';
    overlay.className = 'absolute inset-0 bg-black/90 z-[200] flex flex-col items-center justify-center p-4 cursor-crosshair';
    
    overlay.innerHTML = \`
        <div class="text-white text-center mb-8 pointer-events-none">
            <h2 class="text-3xl font-black text-green-400 mb-2 tracking-widest uppercase shadow-black drop-shadow-md">EQUATION SOLVER</h2>
            <p class="text-[12px] text-gray-300">Tap the floating equations as fast as you can to earn CASH and BP!</p>
            <div class="text-4xl font-mono mt-4 text-yellow-400 drop-shadow-lg" id="mg-timer">10.0s</div>
            <div class="text-xl font-bold mt-2">SCORE: <span id="mg-score" class="text-cyan-400">0</span></div>
        </div>
    \`;
    arena.appendChild(overlay);
    
    let timeLeft = 10.0;
    
    const spawnEquation = () => {
        if (!minigameActive) return;
        const eq = document.createElement('div');
        eq.className = 'absolute text-green-300 font-mono font-bold text-xl md:text-3xl select-none hover:text-white transition-colors cursor-pointer bg-slate-900/50 px-2 rounded border border-green-500/50';
        eq.innerText = ['E=mc²', 'π ≈ 3.14', '√(x²)', '∑(n)', 'Δv/Δt'][Math.floor(Math.random()*5)];
        eq.style.left = \`\${10 + Math.random() * 80}%\`;
        eq.style.top = \`\${20 + Math.random() * 60}%\`;
        
        eq.onmousedown = (e) => {
            if(!minigameActive) return;
            e.stopPropagation();
            minigameScore++;
            document.getElementById('mg-score').innerText = minigameScore;
            SoundManager.play('sheldon_click');
            eq.remove();
            spawnEquation();
            if(Math.random() > 0.5) spawnEquation(); // Chance to spawn 2
        };
        
        overlay.appendChild(eq);
        setTimeout(() => { if (eq.parentNode) eq.remove(); }, 2000);
    };
    
    spawnEquation();
    spawnEquation();
    
    minigameTimer = setInterval(() => {
        timeLeft -= 0.1;
        document.getElementById('mg-timer').innerText = timeLeft.toFixed(1) + 's';
        if (timeLeft <= 0) {
            endMinigame(overlay, 'whiteboard');
        }
    }, 100);
}

function startCouchMinigame() {
    if (minigameActive) return;
    minigameActive = true;
    minigameScore = 0;
    
    const arena = document.getElementById('arena');
    const overlay = document.createElement('div');
    overlay.id = 'minigame-overlay';
    overlay.className = 'absolute inset-0 bg-black/90 z-[200] flex flex-col items-center justify-center p-4 cursor-crosshair';
    
    overlay.innerHTML = \`
        <div class="text-white text-center mb-8 pointer-events-none">
            <h2 class="text-3xl font-black text-orange-400 mb-2 tracking-widest uppercase shadow-black drop-shadow-md">TAKEOUT FRENZY</h2>
            <p class="text-[12px] text-gray-300">Tap the falling food to stock up the hospital!</p>
            <div class="text-4xl font-mono mt-4 text-yellow-400 drop-shadow-lg" id="mg-timer">10.0s</div>
            <div class="text-xl font-bold mt-2">COLLECTED: <span id="mg-score" class="text-cyan-400">0</span></div>
        </div>
    \`;
    arena.appendChild(overlay);
    
    let timeLeft = 10.0;
    
    const spawnFood = () => {
        if (!minigameActive) return;
        const eq = document.createElement('div');
        eq.className = 'absolute text-4xl select-none hover:scale-125 transition-transform cursor-pointer drop-shadow-2xl';
        eq.innerText = ['🥡', '🍕', '🍔', '🌮', '🍩'][Math.floor(Math.random()*5)];
        eq.style.left = \`\${10 + Math.random() * 80}%\`;
        eq.style.top = '-50px';
        
        // Falling animation
        eq.style.transition = 'top 3s linear';
        
        eq.onmousedown = (e) => {
            if(!minigameActive) return;
            e.stopPropagation();
            minigameScore++;
            document.getElementById('mg-score').innerText = minigameScore;
            SoundManager.play('penny_click');
            eq.remove();
        };
        
        overlay.appendChild(eq);
        
        // Trigger reflow to start transition
        void eq.offsetWidth;
        eq.style.top = '120%';
        
        setTimeout(() => { if (eq.parentNode) eq.remove(); }, 3000);
    };
    
    const spawnInterval = setInterval(spawnFood, 400);
    
    minigameTimer = setInterval(() => {
        timeLeft -= 0.1;
        document.getElementById('mg-timer').innerText = timeLeft.toFixed(1) + 's';
        if (timeLeft <= 0) {
            clearInterval(spawnInterval);
            endMinigame(overlay, 'couch');
        }
    }, 100);
}

function endMinigame(overlay, type) {
    minigameActive = false;
    clearInterval(minigameTimer);
    
    overlay.innerHTML = \`
        <div class="text-white text-center">
            <h2 class="text-4xl font-black text-amber-400 mb-4 tracking-widest uppercase">TIME UP!</h2>
            <div class="text-xl mb-6">You scored: <span class="text-cyan-400 font-bold">\${minigameScore}</span></div>
            <div id="mg-reward" class="text-2xl font-bold text-green-400 mb-8 bg-slate-900 px-6 py-4 rounded border-2 border-green-500 shadow-2xl"></div>
            <button id="mg-close" class="bg-red-600 hover:bg-red-500 text-white font-black py-3 px-8 rounded border border-red-800 shadow-xl text-xl uppercase tracking-widest cursor-pointer">CLOSE</button>
        </div>
    \`;
    
    let rewardText = "";
    if (type === 'whiteboard') {
        const cashReward = minigameScore * 50;
        state.resources.money += cashReward;
        rewardText = \`+\${cashReward} CASH\`;
        if (minigameScore >= 15) {
            state.bazingaPoints = (state.bazingaPoints || 0) + 1;
            rewardText += \`<br/><span class="text-yellow-400 mt-2 block">⭐ +1 BAZINGA POINT!</span>\`;
        }
    } else if (type === 'couch') {
        const foodReward = Math.floor(minigameScore / 5);
        if (foodReward > 0) {
            state.food['pizza'] = (state.food['pizza'] || 0) + foodReward;
            rewardText = \`+\${foodReward} 🍕 PIZZA\`;
        } else {
            rewardText = "Too slow! No food earned.";
        }
    }
    
    document.getElementById('mg-reward').innerHTML = rewardText;
    
    document.getElementById('mg-close').onclick = (e) => {
        e.stopPropagation();
        overlay.remove();
        saveProgress();
        syncUI();
    };
}
`;
    appContent = appContent.replace(hangoutActionOld, hangoutActionNew.trim());

    // 5. HP CALCULATION FIX FOR TALENTS
    const maxHpCalcRegex = /const correctMaxHp = Math\.floor\(\(characters\[key\]\.baseHp \|\| 100\) \* Math\.pow\(1\.25, charLvl - 1\)\);/g;
    appContent = appContent.replace(maxHpCalcRegex, `
            const baseMaxHp = Math.floor((characters[key].baseHp || 100) * Math.pow(1.25, charLvl - 1));
            const talentHpMult = state.roster[key].talents ? (1 + (state.roster[key].talents.hp * 0.20)) : 1;
            const correctMaxHp = Math.floor(baseMaxHp * talentHpMult);
    `);

    fs.writeFileSync('app.js', appContent);
    console.log('Successfully injected Talents and Minigames!');
} catch (err) {
    console.error(err);
}
