// ============================================
// DAILY REWARDS / LOGIN CALENDAR SYSTEM
// ============================================

const DAILY_REWARD_SCHEDULE = [
    { day: 1, label: 'Day 1', icon: '💵', desc: '$500', rewards: { money: 500 } },
    { day: 2, label: 'Day 2', icon: '🪨', desc: '50 Stone + 30 Iron', rewards: { stone: 50, iron: 30 } },
    { day: 3, label: 'Day 3', icon: '💵', desc: '$1,000', rewards: { money: 1000 } },
    { day: 4, label: 'Day 4', icon: '⚙️', desc: '20 Gold + 50 Scrap', rewards: { gold: 20, scrap: 50 } },
    { day: 5, label: 'Day 5', icon: '💎', desc: '$2K + 10 Diamond', rewards: { money: 2000, diamond: 10 } },
    { day: 6, label: 'Day 6', icon: '💎', desc: '15 Diamond', rewards: { diamond: 15 } },
    { day: 7, label: 'Day 7', icon: '🌟', desc: '30💎 + $5K', rewards: { diamond: 30, money: 5000 } }
];

function initDailyRewards() {
    // DEPRECATED: Old 7-day daily rewards replaced by daily_login.js 30-day calendar.
    // Do NOT auto-open — daily_login.js handles its own popup.
    if (!state.dailyRewards) state.dailyRewards = { lastClaim: null, streak: 0, day: 0, cycle: 1 };
}

function canClaimDaily() {
    if (!state.dailyRewards.lastClaim) return true;
    const last = new Date(state.dailyRewards.lastClaim);
    const now = new Date();
    return last.toDateString() !== now.toDateString();
}

function isStreakBroken() {
    if (!state.dailyRewards.lastClaim) return false;
    const last = new Date(state.dailyRewards.lastClaim);
    const now = new Date();
    const diffMs = now.getTime() - last.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= 2; // Missed more than 1 day
}

function claimDailyReward() {
    if (!canClaimDaily()) return;
    
    // Check streak
    if (isStreakBroken()) {
        state.dailyRewards.streak = 0;
        state.dailyRewards.day = 0;
        state.dailyRewards.cycle = Math.max(1, state.dailyRewards.cycle);
    }
    
    const dayIndex = state.dailyRewards.day % 7;
    const schedule = DAILY_REWARD_SCHEDULE[dayIndex];
    const cycle = state.dailyRewards.cycle || 1;
    const multiplier = 1 + (cycle - 1) * 0.1;
    
    // Give rewards
    const rewards = schedule.rewards;
    if (rewards.money) { state.resources.money += Math.floor(rewards.money * multiplier); if (state.stats) state.stats.moneyEarned += Math.floor(rewards.money * multiplier); }
    if (rewards.stone) state.resources.stone += Math.floor(rewards.stone * multiplier);
    if (rewards.iron) state.resources.iron += Math.floor(rewards.iron * multiplier);
    if (rewards.gold) state.resources.gold += Math.floor(rewards.gold * multiplier);
    if (rewards.diamond) state.resources.diamond += Math.floor(rewards.diamond * multiplier);
    if (rewards.scrap) state.resources.scrap += Math.floor(rewards.scrap * multiplier);
    if (rewards.bazingaPoints) state.bazingaPoints += Math.floor(rewards.bazingaPoints * multiplier);
    
    state.dailyRewards.lastClaim = new Date().toISOString();
    state.dailyRewards.streak++;
    state.dailyRewards.day++;
    if (state.stats) state.stats.dailyLoginsTotal++;
    
    // Cycle restarts after day 7
    if (state.dailyRewards.day % 7 === 0 && state.dailyRewards.day > 0) {
        state.dailyRewards.cycle++;
    }
    
    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    renderDailyCalendar();
    
    // Achievement tracking
    if (typeof trackStat === 'function') trackStat('dailyLoginsTotal', 1);
}

function openDailyRewardsModal() {
    let modal = document.getElementById('daily-rewards-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'daily-rewards-modal';
        modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-[300] p-4';
        modal.onclick = function(e) { if (e.target === modal) closeDailyRewardsModal(); };
        document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    renderDailyCalendar();
}

function closeDailyRewardsModal() {
    const modal = document.getElementById('daily-rewards-modal');
    if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
}

function renderDailyCalendar() {
    const modal = document.getElementById('daily-rewards-modal');
    if (!modal) return;
    
    const dr = state.dailyRewards;
    const currentDay = dr.day % 7;
    const canClaim = canClaimDaily();
    const cycle = dr.cycle || 1;
    const multiplier = 1 + (cycle - 1) * 0.1;
    
    let html = `
    <div class="bg-slate-900/90 backdrop-blur-md border border-amber-500/30 max-w-lg w-full p-4 sm:p-6 relative rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]" style="max-height:96vh;overflow-y:auto;">
        <button onclick="closeDailyRewardsModal()" class="absolute top-2 right-4 text-gray-500 hover:text-white font-bold text-2xl cursor-pointer">✕</button>
        <div class="text-center mb-4">
            <h2 class="text-base font-bold tracking-widest text-amber-400 uppercase">📅 DAILY REWARDS</h2>
            <p class="text-[9px] text-gray-500 mt-1">Cycle ${cycle} ${multiplier > 1 ? `<span class="text-amber-400">(${Math.round(multiplier*100)}% bonus)</span>` : ''}</p>
            <div class="flex items-center justify-center gap-2 mt-2">
                <span class="text-[10px] text-orange-400 font-bold">🔥 Streak: ${dr.streak} day${dr.streak !== 1 ? 's' : ''}</span>
            </div>
        </div>
        <div class="grid grid-cols-7 gap-1 sm:gap-2 mb-4">`;
    
    for (let i = 0; i < 7; i++) {
        const schedule = DAILY_REWARD_SCHEDULE[i];
        const isPast = i < currentDay;
        const isCurrent = i === currentDay;
        const isFuture = i > currentDay;
        
        let borderClass = 'border-gray-700/50';
        let bgClass = 'bg-slate-800/50';
        let opacity = '';
        
        if (isPast) {
            borderClass = 'border-green-500/50';
            bgClass = 'bg-green-900/20';
        } else if (isCurrent && canClaim) {
            borderClass = 'border-amber-400';
            bgClass = 'bg-amber-900/30';
        } else if (isCurrent) {
            borderClass = 'border-amber-600/50';
            bgClass = 'bg-amber-900/10';
        } else {
            opacity = 'opacity-40';
        }
        
        html += `
        <div class="flex flex-col items-center p-1 sm:p-2 rounded-lg border ${borderClass} ${bgClass} ${opacity} ${isCurrent && canClaim ? 'animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.3)]' : ''}">
            <span class="text-[7px] sm:text-[8px] text-gray-500 font-bold uppercase">${schedule.label}</span>
            <span class="text-lg sm:text-xl my-1">${isPast ? '✅' : schedule.icon}</span>
            <span class="text-[6px] sm:text-[7px] text-gray-400 text-center leading-tight">${schedule.desc}</span>
        </div>`;
    }
    
    html += `</div>`;
    
    if (canClaim) {
        html += `
        <div class="text-center">
            <button onclick="claimDailyReward()" class="px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-wider cursor-pointer transition-all
                bg-gradient-to-b from-amber-500 to-amber-700 text-white border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)]
                hover:from-amber-400 hover:to-amber-600 hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]">
                🎁 CLAIM DAY ${currentDay + 1} REWARD
            </button>
        </div>`;
    } else {
        html += `
        <div class="text-center">
            <div class="px-6 py-2 rounded-lg text-sm text-gray-500 border border-gray-700 inline-block">
                ✅ Claimed today! Come back tomorrow.
            </div>
        </div>`;
    }
    
    html += `</div>`;
    modal.innerHTML = html;
}
