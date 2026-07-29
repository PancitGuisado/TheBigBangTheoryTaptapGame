const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');

const targetStr = "footerActions.innerHTML = `";

const injection = `
    const foodGrid = document.getElementById('modal-food-grid');
    if (foodGrid) {
        if (!isHired || !data || data.currentHp >= data.maxHp) {
            foodGrid.innerHTML = '<div class="col-span-4 text-center text-gray-600 text-[9px] italic py-2">Not injured</div>';
        } else {
            let foodHtml = '';
            for (const [fId, count] of Object.entries(state.inventory || {})) {
                if (count > 0 && fId.startsWith('food_')) {
                    const fDef = typeof items !== 'undefined' && items[fId] ? items[fId] : {icon:'🍔', healVal:20};
                    foodHtml += \`<button onclick="feedCharacter('\${key}', '\${fId}')" class="bg-orange-950/50 hover:bg-orange-900 border border-orange-700/50 rounded p-1 flex flex-col items-center cursor-pointer transition-colors" title="Heal \${fDef.healVal}">
                        <div class="text-xl">\${fDef.icon}</div>
                        <div class="text-[8px] text-orange-300 font-bold mt-1">x\${count}</div>
                    </button>\`;
                }
            }
            if (foodHtml === '') {
                foodHtml = '<div class="col-span-4 text-center text-gray-500 text-[9px] italic py-2">No food in inventory</div>';
            }
            foodGrid.innerHTML = foodHtml;
        }
    }

    `;

txt = txt.replace(targetStr, injection + targetStr);

const feedFunc = `
window.feedCharacter = function(charKey, foodId) {
    if (!state.roster[charKey] || state.roster[charKey].currentHp >= state.roster[charKey].maxHp) return;
    if (!state.inventory || !state.inventory[foodId] || state.inventory[foodId] <= 0) return;
    
    const fDef = typeof items !== 'undefined' && items[foodId] ? items[foodId] : {icon:'🍔', healVal:20};
    state.inventory[foodId]--;
    
    let healAmount = fDef.healVal || 20;
    if (typeof activeSynergies !== 'undefined' && activeSynergies.foodMult) {
        healAmount = Math.floor(healAmount * activeSynergies.foodMult);
    }
    
    state.roster[charKey].currentHp = Math.min(state.roster[charKey].maxHp, state.roster[charKey].currentHp + healAmount);
    
    if (state.roster[charKey].currentHp >= state.roster[charKey].maxHp) {
        state.roster[charKey].status = 'healthy';
        state.roster[charKey].hospitalEndTime = 0;
    }
    
    if(typeof SoundManager !== 'undefined') SoundManager.playFX('heal');
    if(typeof saveProgress === 'function') saveProgress();
    
    openModal(null, charKey);
    
    if (typeof updateRosterUI === 'function') updateRosterUI();
    if (typeof renderHangoutBackground === 'function') renderHangoutBackground();
};
`;

txt = txt.replace("function closeModal() {", feedFunc + "\nfunction closeModal() {");

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', txt, 'utf8');
console.log('Successfully injected feed character logic!');
