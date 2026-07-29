// ============================================================
// ROTATING EVENTS SYSTEM
// Relies on global: state, saveProgress(), syncUI()
// ============================================================

// ----- EVENT DEFINITIONS -----
const EVENT_DEFS = {
    boss_rush: {
        key: 'boss_rush',
        name: 'Boss Rush',
        icon: '👹',
        color: '#ef4444',
        gradient: 'from-red-900/80 to-red-950/60',
        border: 'border-red-700',
        desc: 'Defeat 5 bosses in a row for massive rewards!',
        goal: 5,
        rewards: { bazinga: 5, diamond: 20, money: 5000 },
        rewardLabel: '5 Bazinga + 20 💎 + $5,000'
    },
    double_drop: {
        key: 'double_drop',
        name: 'Double Drop',
        icon: '💎',
        color: '#3b82f6',
        gradient: 'from-blue-900/80 to-blue-950/60',
        border: 'border-blue-700',
        desc: '2x resource drops from all enemies for the duration!',
        goal: null,
        rewards: null,
        rewardLabel: '2x all drops'
    },
    speed_challenge: {
        key: 'speed_challenge',
        name: 'Speed Challenge',
        icon: '⚡',
        color: '#eab308',
        gradient: 'from-yellow-900/80 to-yellow-950/60',
        border: 'border-yellow-700',
        desc: 'Clear 10 waves as fast as possible. Beat your best time!',
        goal: 10,
        rewards: null,
        rewardLabel: 'Glory & bragging rights'
    },
    scavenger_hunt: {
        key: 'scavenger_hunt',
        name: 'Scavenger Hunt',
        icon: '🔍',
        color: '#22c55e',
        gradient: 'from-emerald-900/80 to-emerald-950/60',
        border: 'border-emerald-700',
        desc: 'Collect 20 special tokens from enemies. Trade them for rewards!',
        goal: 20,
        rewards: null,
        rewardLabel: 'Token exchange shop'
    }
};

// Day-of-week schedule: 0=Sun, 1=Mon, 2=Tue, …, 6=Sat
const EVENT_SCHEDULE = {
    0: 'scavenger_hunt',  // Sunday
    1: 'boss_rush',       // Monday
    2: 'boss_rush',       // Tuesday
    3: 'double_drop',     // Wednesday
    4: 'double_drop',     // Thursday
    5: 'speed_challenge', // Friday
    6: 'speed_challenge'  // Saturday
};

const SCHEDULE_LABELS = [
    { days: 'Mon – Tue', key: 'boss_rush' },
    { days: 'Wed – Thu', key: 'double_drop' },
    { days: 'Fri – Sat', key: 'speed_challenge' },
    { days: 'Sunday',    key: 'scavenger_hunt' }
];

// ----- STATE INITIALIZATION -----
function initEvents() {
    if (!state.events) {
        state.events = {
            active: null,
            history: [],
            tokens: 0,
            bossRushProgress: 0,
            speedChallengeStart: 0,
            speedChallengeBest: 0,
            speedChallengeWaves: 0
        };
    }
    // Ensure all fields exist (migration)
    if (state.events.tokens === undefined) state.events.tokens = 0;
    if (state.events.bossRushProgress === undefined) state.events.bossRushProgress = 0;
    if (state.events.speedChallengeStart === undefined) state.events.speedChallengeStart = 0;
    if (state.events.speedChallengeBest === undefined) state.events.speedChallengeBest = 0;
    if (state.events.speedChallengeWaves === undefined) state.events.speedChallengeWaves = 0;
    if (!state.events.history) state.events.history = [];

    // Sync active event to current day
    var current = getCurrentEvent();
    if (state.events.active !== current) {
        // Day changed — reset progress
        state.events.active = current;
        state.events.bossRushProgress = 0;
        state.events.tokens = 0;
        state.events.speedChallengeWaves = 0;
        state.events.speedChallengeStart = 0;
        saveProgress();
    }
}

// ----- CORE HELPERS -----
function getCurrentEvent() {
    var day = new Date().getDay(); // 0=Sun
    return EVENT_SCHEDULE[day] || 'double_drop';
}

function getEventTimeRemaining() {
    var now = new Date();
    var midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now.getTime();
}

function _formatEventTime(ms) {
    if (ms <= 0) return '00:00:00';
    var totalSecs = Math.floor(ms / 1000);
    var h = Math.floor(totalSecs / 3600);
    var m = Math.floor((totalSecs % 3600) / 60);
    var s = totalSecs % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function isEventActive(type) {
    initEvents();
    return state.events.active === type;
}

// ----- EVENT MECHANICS -----
function applyEventBonus(type, value) {
    if (!isEventActive('double_drop')) return value;
    if (type === 'drop') return value * 2;
    return value;
}

function updateEventProgress(type, amount) {
    initEvents();
    if (!isEventActive(type)) return;

    if (type === 'boss_rush') {
        state.events.bossRushProgress += (amount || 1);
        if (state.events.bossRushProgress >= EVENT_DEFS.boss_rush.goal) {
            // Award rewards
            var rewards = EVENT_DEFS.boss_rush.rewards;
            state.bazingaPoints = (state.bazingaPoints || 0) + rewards.bazinga;
            state.resources.diamond = (state.resources.diamond || 0) + rewards.diamond;
            state.resources.money = (state.resources.money || 0) + rewards.money;
            state.events.bossRushProgress = 0; // Allow repeating
            _showEventRewardNotif('boss_rush');
            if (typeof syncUI === 'function') syncUI();
        }
        saveProgress();
    }

    if (type === 'scavenger_hunt') {
        state.events.tokens += (amount || 1);
        saveProgress();
    }

    if (type === 'speed_challenge') {
        // amount = number of waves cleared in this tick
        if (state.events.speedChallengeStart === 0) {
            state.events.speedChallengeStart = Date.now();
            state.events.speedChallengeWaves = 0;
        }
        state.events.speedChallengeWaves += (amount || 1);
        if (state.events.speedChallengeWaves >= EVENT_DEFS.speed_challenge.goal) {
            var elapsed = Date.now() - state.events.speedChallengeStart;
            if (state.events.speedChallengeBest === 0 || elapsed < state.events.speedChallengeBest) {
                state.events.speedChallengeBest = elapsed;
                _showEventRewardNotif('speed_challenge');
            }
            // Reset for another attempt
            state.events.speedChallengeStart = 0;
            state.events.speedChallengeWaves = 0;
        }
        saveProgress();
    }
}

// ----- REWARD NOTIFICATION -----
function _showEventRewardNotif(eventKey) {
    var def = EVENT_DEFS[eventKey];
    if (!def) return;

    var msg = '';
    if (eventKey === 'boss_rush') {
        msg = 'Boss Rush Complete! +5 Bazinga, +20 💎, +$5,000';
    } else if (eventKey === 'speed_challenge') {
        var best = state.events.speedChallengeBest || 0;
        msg = 'New Best Time! ' + _formatEventTime(best);
    }

    var notif = document.createElement('div');
    notif.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-fadeIn';
    notif.id = 'event-reward-notif';
    notif.innerHTML = '' +
        '<div class="bg-slate-900/90 backdrop-blur-md border-2 rounded-xl px-6 py-4 text-center shadow-2xl max-w-xs" style="border-color:' + def.color + '">' +
            '<div class="text-3xl mb-2">' + def.icon + '</div>' +
            '<div class="font-black text-white text-[13px] mb-1 uppercase tracking-wider">' + def.name + '</div>' +
            '<div class="text-[10px] font-bold" style="color:' + def.color + '">' + msg + '</div>' +
            '<button onclick="var el=document.getElementById(\'event-reward-notif\'); if(el) el.remove();" class="mt-3 text-[9px] text-gray-500 hover:text-white cursor-pointer uppercase font-bold tracking-wider">Dismiss</button>' +
        '</div>';

    var prev = document.getElementById('event-reward-notif');
    if (prev) prev.remove();
    document.body.appendChild(notif);

    setTimeout(function() {
        var el = document.getElementById('event-reward-notif');
        if (el) el.remove();
    }, 5000);
}

// ----- EVENT BANNER (in-game HUD) -----
var _eventBannerTimerId = null;

function renderEventBanner() {
    initEvents();

    var banner = document.getElementById('event-banner');
    if (!banner) {
        // Create as a separate floating pill below top bar
        banner = document.createElement('div');
        banner.id = 'event-banner';
        banner.style.cssText = 'position:absolute;top:27px;left:50%;transform:translateX(-50%);z-index:48;pointer-events:auto;';
        var arenaParent = document.getElementById('arena');
        if (arenaParent && arenaParent.parentElement) {
            arenaParent.parentElement.appendChild(banner);
        } else {
            document.body.appendChild(banner);
        }
    }

    var eventKey = state.events.active;
    var def = EVENT_DEFS[eventKey];
    if (!def) {
        banner.style.display = 'none';
        return;
    }

    var remaining = getEventTimeRemaining();
    var timeStr = _formatEventTime(remaining);

    banner.style.cssText = 'background:rgba(0,0,0,0.5);border:1px solid ' + def.color + ';color:' + def.color + ';padding:1px 6px;border-radius:10px;font-size:8px;font-weight:700;white-space:nowrap;cursor:pointer;display:inline-flex;align-items:center;gap:3px;margin-left:4px;';
    banner.onclick = function() { openEventsModal(); };
    banner.innerHTML = '<span>' + def.icon + '</span>' +
        '<span>' + def.name + '</span>' +
        '<span class="event-timer-text">⏱ ' + timeStr + '</span>';

    // Refresh timer every second
    if (_eventBannerTimerId) clearInterval(_eventBannerTimerId);
    _eventBannerTimerId = setInterval(function() {
        var rem = getEventTimeRemaining();
        var timeEl = banner.querySelector('.event-timer-text');
        if (timeEl) timeEl.innerText = '⏱ ' + _formatEventTime(rem);

        // Check day change
        if (getCurrentEvent() !== eventKey) {
            initEvents();
            renderEventBanner();
        }
    }, 1000);
}

// ----- EVENTS MODAL -----
function openEventsModal(event) {
    if (event) event.stopPropagation();
    initEvents();
    renderEventsModal();
    var modal = document.getElementById('events-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeEventsModal() {
    var modal = document.getElementById('events-modal');
    if (modal) modal.classList.add('hidden');
}

function renderEventsModal() {
    initEvents();

    // Ensure modal container exists
    var modal = document.getElementById('events-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'events-modal';
        modal.className = 'fixed inset-0 z-[9000] hidden';
        document.body.appendChild(modal);
    }

    var activeKey = state.events.active;
    var activeDef = EVENT_DEFS[activeKey];

    // ----- Active Event Card -----
    var activeHtml = '';
    if (activeDef) {
        var remaining = getEventTimeRemaining();
        var timeStr = _formatEventTime(remaining);

        var progressHtml = '';
        if (activeKey === 'boss_rush') {
            var prog = state.events.bossRushProgress || 0;
            var pct = Math.min(100, Math.floor((prog / activeDef.goal) * 100));
            progressHtml = '' +
                '<div class="mt-3">' +
                    '<div class="flex justify-between text-[8px] text-gray-400 mb-1"><span>Progress</span><span>' + prog + '/' + activeDef.goal + '</span></div>' +
                    '<div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div class="h-full rounded-full transition-all" style="width:' + pct + '%; background:' + activeDef.color + '"></div></div>' +
                    '<div class="text-[8px] text-gray-500 mt-1">Reward: ' + activeDef.rewardLabel + '</div>' +
                '</div>';
        } else if (activeKey === 'scavenger_hunt') {
            var toks = state.events.tokens || 0;
            var tPct = Math.min(100, Math.floor((toks / activeDef.goal) * 100));
            progressHtml = '' +
                '<div class="mt-3">' +
                    '<div class="flex justify-between text-[8px] text-gray-400 mb-1"><span>Tokens Collected</span><span>' + toks + '/' + activeDef.goal + '</span></div>' +
                    '<div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div class="h-full rounded-full transition-all" style="width:' + tPct + '%; background:' + activeDef.color + '"></div></div>' +
                '</div>';
        } else if (activeKey === 'speed_challenge') {
            var bestMs = state.events.speedChallengeBest;
            var waves = state.events.speedChallengeWaves || 0;
            var wPct = Math.min(100, Math.floor((waves / activeDef.goal) * 100));
            progressHtml = '' +
                '<div class="mt-3">' +
                    '<div class="flex justify-between text-[8px] text-gray-400 mb-1"><span>Current Run</span><span>' + waves + '/' + activeDef.goal + ' waves</span></div>' +
                    '<div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div class="h-full rounded-full transition-all" style="width:' + wPct + '%; background:' + activeDef.color + '"></div></div>' +
                    (bestMs > 0 ? '<div class="text-[9px] text-amber-400 font-bold mt-2">🏆 Best Time: ' + _formatEventTime(bestMs) + '</div>' : '') +
                '</div>';
        } else if (activeKey === 'double_drop') {
            progressHtml = '<div class="mt-3 text-[10px] text-blue-300 font-bold">✨ All resource drops are doubled right now!</div>';
        }

        activeHtml = '' +
            '<div class="bg-gradient-to-br ' + activeDef.gradient + ' border-2 ' + activeDef.border + ' rounded-xl p-4 mb-4">' +
                '<div class="flex items-center justify-between mb-2">' +
                    '<div class="flex items-center gap-2">' +
                        '<span class="text-3xl">' + activeDef.icon + '</span>' +
                        '<div>' +
                            '<div class="font-black text-white text-[13px] uppercase tracking-wider">' + activeDef.name + '</div>' +
                            '<div class="text-[9px] text-gray-400 uppercase tracking-wider">Active Now</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="text-right">' +
                        '<div class="text-[8px] text-gray-500 uppercase">Ends In</div>' +
                        '<div class="font-mono text-white text-[13px] font-bold">' + timeStr + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="text-[10px] text-gray-300">' + activeDef.desc + '</div>' +
                progressHtml +
            '</div>';
    }

    // ----- Weekly Schedule -----
    var schedHtml = '';
    var today = new Date().getDay();
    for (var si = 0; si < SCHEDULE_LABELS.length; si++) {
        var sched = SCHEDULE_LABELS[si];
        var sDef = EVENT_DEFS[sched.key];
        if (!sDef) continue;

        var isNow = (sched.key === activeKey);
        var rowBorder = isNow ? 'border-l-2' : 'border-l-2 border-l-transparent';
        var rowBg = isNow ? 'bg-slate-800/40' : 'bg-slate-900/30';

        schedHtml += '' +
            '<div class="' + rowBg + ' ' + rowBorder + ' rounded-r-lg px-3 py-2 flex items-center justify-between" style="border-left-color:' + sDef.color + '">' +
                '<div class="flex items-center gap-2">' +
                    '<span class="text-lg">' + sDef.icon + '</span>' +
                    '<div>' +
                        '<div class="font-bold text-white text-[10px]">' + sDef.name + '</div>' +
                        '<div class="text-[8px] text-gray-500">' + sched.days + '</div>' +
                    '</div>' +
                '</div>' +
                (isNow ? '<div class="text-[8px] font-bold text-emerald-400 uppercase tracking-wider animate-pulse">LIVE</div>' : '<div class="text-[8px] text-gray-600">—</div>') +
            '</div>';
    }

    // ----- Scavenger Token Exchange (if applicable) -----
    var tokenShopHtml = '';
    if (activeKey === 'scavenger_hunt' && (state.events.tokens || 0) > 0) {
        var toks = state.events.tokens || 0;
        var exchangeItems = [
            { name: '$500 Cash',      cost: 5,  action: "exchangeEventTokens(5, 'money', 500)" },
            { name: '10 Stone',       cost: 3,  action: "exchangeEventTokens(3, 'stone', 10)" },
            { name: '5 Iron',         cost: 4,  action: "exchangeEventTokens(4, 'iron', 5)" },
            { name: '2 Diamond',      cost: 10, action: "exchangeEventTokens(10, 'diamond', 2)" },
            { name: '1 Bazinga',      cost: 15, action: "exchangeEventTokens(15, 'bazinga', 1)" }
        ];

        tokenShopHtml = '<div class="mt-4 border-t border-white/10 pt-3">' +
            '<div class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">🔍 Token Exchange · ' + toks + ' tokens</div>' +
            '<div class="grid grid-cols-2 gap-2">';
        for (var ti = 0; ti < exchangeItems.length; ti++) {
            var ex = exchangeItems[ti];
            var canBuy = toks >= ex.cost;
            var exClass = canBuy
                ? 'bg-emerald-800 hover:bg-emerald-700 text-white cursor-pointer border-emerald-900'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed border-gray-700';
            tokenShopHtml += '<button onclick="' + ex.action + '" ' + (!canBuy ? 'disabled' : '') + ' class="' + exClass + ' border text-[9px] font-bold px-2 py-1.5 rounded uppercase tracking-wider">' + ex.name + ' (' + ex.cost + ' 🪙)</button>';
        }
        tokenShopHtml += '</div></div>';
    }

    // ----- Assemble Modal -----
    modal.innerHTML = '' +
        '<div class="absolute inset-0 bg-black/70" onclick="closeEventsModal()"></div>' +
        '<div class="absolute inset-2 sm:inset-6 md:inset-10 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl flex flex-col overflow-hidden">' +
            // Header
            '<div class="flex items-center justify-between px-4 py-3 border-b border-white/10">' +
                '<div class="font-black text-white text-[14px] uppercase tracking-widest">📅 EVENTS</div>' +
                '<button onclick="closeEventsModal()" class="text-gray-400 hover:text-white text-xl cursor-pointer leading-none">✕</button>' +
            '</div>' +
            // Content
            '<div class="flex-1 overflow-y-auto p-4">' +
                activeHtml +
                tokenShopHtml +
                // Schedule
                '<div class="mt-2">' +
                    '<div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">📋 Weekly Schedule</div>' +
                    '<div class="flex flex-col gap-2">' +
                        schedHtml +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
}

// ----- TOKEN EXCHANGE -----
function exchangeEventTokens(cost, resource, amount) {
    initEvents();
    if ((state.events.tokens || 0) < cost) return;

    state.events.tokens -= cost;

    if (resource === 'bazinga') {
        state.bazingaPoints = (state.bazingaPoints || 0) + amount;
    } else if (state.resources[resource] !== undefined) {
        state.resources[resource] += amount;
    }

    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    renderEventsModal();
    renderEventBanner();
}
