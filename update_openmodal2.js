const fs = require('fs');
let app = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');

const parts = app.split('function openModal(event, key) {');
const secondPart = parts[1].split('function checkEvolutionUnlock(');

const newOpenModal = `function openModal(event, key) {
    if(event) event.stopPropagation(); 
    activeModalKey = key;
    const config = characters[key];
    const data = state.roster[key];
    const lvl = data ? data.level : 0;
    const currentCost = Math.floor(config.cost.money * Math.pow(1.5, lvl));
    const isEquipped = !!(state.equipped && state.equipped[key]);

    const avatar = document.getElementById('modal-char-avatar');
    const name = document.getElementById('modal-char-name');
    const desc = document.getElementById('modal-char-desc');
    const lane = document.getElementById('modal-char-lane');
    const badge = document.getElementById('modal-char-badge');
    const costContainer = document.getElementById('modal-char-cost-container');

    // Handle Skins correctly in avatar
    if (avatar) {
        if (data && data.activeSkin && data.activeSkin !== 'default' && typeof getVectorFrameForSkin === 'function') {
            avatar.innerHTML = getVectorFrameForSkin(key, data.activeSkin);
        } else {
            avatar.innerHTML = getVectorFrame(key, false);
        }
    }
    
    if (name) name.innerText = config.name;
    if (desc) desc.innerText = config.desc;
    if (lane) lane.innerText = config.lane.toUpperCase();
    
    if (badge) {
        if (lvl > 0) {
            badge.innerText = isEquipped ? "ACTIVE LEVEL " + lvl : "BENCHED LEVEL " + lvl;
            badge.className = isEquipped ? "bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase" : "bg-amber-950 text-amber-400 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase";
        } else {
            badge.innerText = 'NOT UNLOCKED';
            badge.className = "bg-gray-900 text-gray-500 border border-gray-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase";
        }
    }

    // UPDATE STATS
    const dmgEl = document.getElementById('modal-stat-dmg');
    const hpEl = document.getElementById('modal-stat-hp');
    const cdEl = document.getElementById('modal-stat-cd');
    const passiveEl = document.getElementById('modal-stat-passive');
    
    const curDmg = config.baseDmg * (lvl || 1);
    const nextDmg = config.baseDmg * ((lvl || 1) + 1);
    const curHp = config.baseHp ? (config.baseHp * (lvl || 1)) : 100;
    const nextHp = config.baseHp ? (config.baseHp * ((lvl || 1) + 1)) : 100;
    const curCd = config.attackCooldown ? (config.attackCooldown / 1000).toFixed(1) : '1.0';
    const nextCd = curCd;
    
    if (dmgEl) dmgEl.innerHTML = curDmg + " <span class='text-gray-600 mx-0.5'>➔</span> <span class='text-amber-400'>" + nextDmg + "</span>";
    if (hpEl) hpEl.innerHTML = curHp + " <span class='text-gray-600 mx-0.5'>➔</span> <span class='text-amber-400'>" + nextHp + "</span>";
    if (cdEl) cdEl.innerHTML = curCd + "s <span class='text-gray-600 mx-0.5'>➔</span> <span class='text-amber-400'>" + nextCd + "s</span>";
    if (passiveEl) passiveEl.innerText = config.ability || 'N/A';

    // UPDATE FEED SECTION
    const feedSection = document.getElementById('modal-feed-section');
    const feedHp = document.getElementById('modal-feed-hp');
    const feedButtons = document.getElementById('modal-feed-buttons');
    
    if (lvl > 0 && data && data.currentHp < data.maxHp) {
        if (feedSection) feedSection.classList.remove('hidden');
        if (feedHp) feedHp.innerText = Math.floor(data.currentHp) + " / " + data.maxHp + " HP";
        
        if (feedButtons) {
            const foodHtml = Object.keys(state.food || {})
                .filter(f => state.food[f] > 0)
                .map(f => "<button onclick=\\"useFoodForRecovery('" + key + "', '" + f + "'); openModal(null, '" + key + "'); syncUI(); renderRosterGrid();\\" class=\\"bg-gradient-to-b from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600 text-white font-bold py-1 px-3 rounded border border-orange-400 text-[10px] cursor-pointer shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all flex items-center gap-1\\">" + foods[f].emoji + " <span class=\\"bg-black/50 px-1 rounded\\">x" + state.food[f] + "</span></button>")
                .join('');
            feedButtons.innerHTML = foodHtml.length > 0 ? foodHtml : '<div class="text-[9px] text-red-300/80 italic font-bold tracking-widest border border-red-500/30 bg-red-950/50 px-2 py-1 rounded">OUT OF MEDICAL SUPPLIES</div>';
        }
    } else {
        if (feedSection) feedSection.classList.add('hidden');
    }

    const isHired = lvl > 0;
    const canAfford = state.resources.money >= currentCost;
    
    const footerActions = document.getElementById('modal-footer-actions');
    if (!footerActions) return;
    footerActions.innerHTML = '';

    let purchaseLabel = isHired ? "📈 Level Up" : "🤝 Recruit to the Gang";

    if (costContainer) {
        costContainer.innerHTML = "<span class=\\"" + (canAfford ? 'text-green-400' : 'text-red-400') + "\\">💵 $" + currentCost + "</span>";
    }

    const hireButtonClass = canAfford 
        ? "w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded border border-amber-600"
        : "w-full bg-gray-800 text-gray-500 font-bold py-2.5 text-[10px] cursor-not-allowed uppercase border border-gray-700 rounded";

    let hireBtnOnClick = canAfford ? "onclick=\\"levelUpChar('" + key + "')\\"" : "disabled";
    footerActions.innerHTML += "<button class=\\"" + hireButtonClass + "\\" " + hireBtnOnClick + ">" + purchaseLabel + "</button>";

    if (isHired) {
        const toggleLabel = isEquipped ? '🛑 BENCH THIS NERD' : '⚔️ ADD TO BATTLE LINE';
        const toggleClass = isEquipped 
            ? "w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded border border-red-700" 
            : "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 text-[10px] cursor-pointer uppercase tracking-wider rounded border border-emerald-700";
        
        footerActions.innerHTML = "<button class=\\"" + toggleClass + "\\" onclick=\\"toggleEquip('" + key + "')\\">" + toggleLabel + "</button>" + footerActions.innerHTML;
    }

    const modal = document.getElementById('action-modal');
    if (modal) modal.classList.remove('hidden');
}

// ============================================================
// EVOLUTION SKIN SYSTEM
// ============================================================

function checkEvolutionUnlock(`;

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', parts[0] + newOpenModal + secondPart[1], 'utf8');
console.log('Fixed openModal properly');
