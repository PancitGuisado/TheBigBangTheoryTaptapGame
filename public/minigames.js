// ============================================
// MINI-GAMES: RPSLS + TBBT TRIVIA
// ============================================

// ---- ROCK PAPER SCISSORS LIZARD SPOCK ----
const RPSLS_CHOICES = [
    { key: 'rock', name: 'Rock', icon: '🪨' },
    { key: 'paper', name: 'Paper', icon: '📄' },
    { key: 'scissors', name: 'Scissors', icon: '✂️' },
    { key: 'lizard', name: 'Lizard', icon: '🦎' },
    { key: 'spock', name: 'Spock', icon: '🖖' }
];

// What each choice beats
const RPSLS_WINS = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors']
};

const RPSLS_VERBS = {
    'rock-scissors': 'crushes', 'rock-lizard': 'crushes',
    'paper-rock': 'covers', 'paper-spock': 'disproves',
    'scissors-paper': 'cuts', 'scissors-lizard': 'decapitates',
    'lizard-paper': 'eats', 'lizard-spock': 'poisons',
    'spock-rock': 'vaporizes', 'spock-scissors': 'smashes'
};

let rpslsState = { playerScore: 0, sheldonScore: 0, round: 0, maxRounds: 3, playing: false };

// ---- TRIVIA ----
const TRIVIA_QUESTIONS = [
    { q: "What is Sheldon's catchphrase?", o: ["Bazinga!", "Cowabunga!", "Eureka!", "Wubba lubba!"], a: 0 },
    { q: "What floor do Sheldon and Leonard live on?", o: ["2nd", "3rd", "4th", "5th"], a: 2 },
    { q: "What is Howard's profession?", o: ["Physicist", "Aerospace Engineer", "Biologist", "Chemist"], a: 1 },
    { q: "What is Raj's field of study?", o: ["Quantum Mechanics", "String Theory", "Astrophysics", "Neuroscience"], a: 2 },
    { q: "What university do they work at?", o: ["MIT", "Stanford", "Caltech", "Princeton"], a: 2 },
    { q: "What comic book store does Stuart own?", o: ["The Comic Center of Pasadena", "Stuart's Comics", "Nerd Haven", "The Comic Dungeon"], a: 0 },
    { q: "What instrument does Amy play?", o: ["Violin", "Piano", "Harp", "Cello"], a: 2 },
    { q: "What is Bernadette's job?", o: ["Pharmacist", "Microbiologist", "Doctor", "Nurse"], a: 1 },
    { q: "What country is Raj from?", o: ["Pakistan", "Bangladesh", "Sri Lanka", "India"], a: 3 },
    { q: "What is Leonard's mother's name?", o: ["Sandra", "Beverly", "Margaret", "Dorothy"], a: 1 },
    { q: "What is Sheldon's twin sister's name?", o: ["Missy", "Melissa", "Mary", "Molly"], a: 0 },
    { q: "What state is Sheldon from?", o: ["Oklahoma", "Texas", "Alabama", "Georgia"], a: 1 },
    { q: "What is Howard's mother's name?", o: ["Bertha", "Debbie", "Gloria", "Doris"], a: 1 },
    { q: "What did Howard go to space in?", o: ["Space Shuttle", "SpaceX Dragon", "Soyuz Rocket", "Boeing Starliner"], a: 2 },
    { q: "What is Sheldon's favorite number?", o: ["42", "73", "37", "101"], a: 1 },
    { q: "What is Sheldon's IQ?", o: ["160", "175", "187", "200"], a: 2 },
    { q: "What does Sheldon knock three times and say?", o: ["Penny Penny Penny", "Open up!", "Hello?", "Knock knock knock"], a: 0 },
    { q: "What game do they play regularly?", o: ["Chess", "Dungeons & Dragons", "Risk", "Halo"], a: 3 },
    { q: "Who plays Sheldon Cooper?", o: ["Johnny Galecki", "Jim Parsons", "Simon Helberg", "Kunal Nayyar"], a: 1 },
    { q: "What is Penny's job at the start of the show?", o: ["Actress", "Bartender", "Waitress", "Sales rep"], a: 2 },
    { q: "Who is Sheldon's childhood hero in physics?", o: ["Einstein", "Feynman", "Hawking", "Newton"], a: 1 },
    { q: "What is the name of Howard's robot arm?", o: ["MONTE", "R2D2", "The Claw", "Wolowitz Arm"], a: 0 },
    { q: "What car does Sheldon refuse to learn to drive?", o: ["Any car", "Manual only", "He can't drive at all", "Sports cars"], a: 2 },
    { q: "What is Amy's pet monkey named?", o: ["Ricky", "George", "Einstein", "Darwin"], a: 0 },
    { q: "What board game causes the most fights?", o: ["Monopoly", "Risk", "Settlers of Catan", "3D Chess"], a: 2 }
];

let triviaState = { questions: [], currentQ: 0, score: 0, playing: false, timer: null, timeLeft: 10 };

function initMinigames() {
    if (!state.minigames) state.minigames = { rpslsPlaysToday: 0, rpslsLastReset: null, triviaPlaysToday: 0, triviaLastReset: null, triviaHighScore: 0 };
    // Reset daily counts
    const today = new Date().toDateString();
    if (state.minigames.rpslsLastReset !== today) { state.minigames.rpslsPlaysToday = 0; state.minigames.rpslsLastReset = today; }
    if (state.minigames.triviaLastReset !== today) { state.minigames.triviaPlaysToday = 0; state.minigames.triviaLastReset = today; }
}

// ---- MINI-GAME HUB ----
function openMinigamesHub() {
    let modal = document.getElementById('minigames-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'minigames-modal';
        modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-[300] p-4';
        modal.onclick = function(e) { if (e.target === modal) closeMinigamesHub(); };
        document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    renderMinigamesHub();
}

function closeMinigamesHub() {
    const modal = document.getElementById('minigames-modal');
    if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
    if (triviaState.timer) { clearInterval(triviaState.timer); triviaState.timer = null; }
}

function renderMinigamesHub() {
    const modal = document.getElementById('minigames-modal');
    if (!modal) return;
    initMinigames();
    
    const rpslsLeft = Math.max(0, 3 - state.minigames.rpslsPlaysToday);
    const triviaLeft = Math.max(0, 1 - state.minigames.triviaPlaysToday);
    
    // YS Minigames — check daily resets
    if (!state.minigames.pokerPlaysToday) state.minigames.pokerPlaysToday = 0;
    if (!state.minigames.footballPlaysToday) state.minigames.footballPlaysToday = 0;
    var today = new Date().toDateString();
    if (state.minigames.pokerLastReset !== today) { state.minigames.pokerPlaysToday = 0; state.minigames.pokerLastReset = today; }
    if (state.minigames.footballLastReset !== today) { state.minigames.footballPlaysToday = 0; state.minigames.footballLastReset = today; }
    const pokerLeft = Math.max(0, 5 - state.minigames.pokerPlaysToday);
    const footballLeft = Math.max(0, 5 - state.minigames.footballPlaysToday);
    
    modal.innerHTML = `
    <div class="bg-slate-900/90 backdrop-blur-md border border-purple-500/30 max-w-lg w-full p-4 sm:p-6 relative rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]" style="max-height:96vh;overflow-y:auto;">
        <button onclick="closeMinigamesHub()" class="absolute top-2 right-4 text-gray-500 hover:text-white font-bold text-2xl cursor-pointer">✕</button>
        <div class="text-center mb-4">
            <h2 class="text-base font-bold tracking-widest text-purple-400 uppercase">🎮 MINI-GAMES</h2>
            <p class="text-[9px] text-gray-500 mt-1 uppercase tracking-wider">Play for bonus rewards!</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="bg-slate-800/60 border border-indigo-500/30 rounded-xl p-4 text-center cursor-pointer hover:border-indigo-400 hover:bg-slate-800/80 transition-all ${rpslsLeft === 0 ? 'opacity-50 pointer-events-none' : ''}" onclick="startRPSLS()">
                <div class="text-3xl mb-2">🖖</div>
                <h3 class="text-sm font-bold text-indigo-300 uppercase">Rock Paper Scissors Lizard Spock</h3>
                <p class="text-[8px] text-gray-500 mt-1">Best of 3 vs Sheldon</p>
                <p class="text-[9px] text-indigo-400 mt-2 font-bold">${rpslsLeft}/3 plays left today</p>
                <p class="text-[8px] text-amber-400 mt-1">Win: $500 + resources</p>
            </div>
            <div class="bg-slate-800/60 border border-emerald-500/30 rounded-xl p-4 text-center cursor-pointer hover:border-emerald-400 hover:bg-slate-800/80 transition-all ${triviaLeft === 0 ? 'opacity-50 pointer-events-none' : ''}" onclick="startTrivia()">
                <div class="text-3xl mb-2">🧠</div>
                <h3 class="text-sm font-bold text-emerald-300 uppercase">TBBT Trivia</h3>
                <p class="text-[8px] text-gray-500 mt-1">5 questions, 10s each</p>
                <p class="text-[9px] text-emerald-400 mt-2 font-bold">${triviaLeft}/1 play left today</p>
                <p class="text-[8px] text-amber-400 mt-1">5/5: $1500 + 5💎</p>
            </div>
            <div class="bg-slate-800/60 border border-amber-500/30 rounded-xl p-4 text-center cursor-pointer hover:border-amber-400 hover:bg-slate-800/80 transition-all ${pokerLeft === 0 ? 'opacity-50 pointer-events-none' : ''}" onclick="closeMinigamesHub();openPokerMinigame()">
                <div class="text-3xl mb-2">🃏</div>
                <h3 class="text-sm font-bold text-amber-300 uppercase">Texas Hold'em</h3>
                <p class="text-[8px] text-gray-500 mt-1">Beat the dealer, win 2x!</p>
                <p class="text-[9px] text-amber-400 mt-2 font-bold">${pokerLeft}/5 plays left today</p>
                <p class="text-[8px] text-amber-400 mt-1">Bet money for big wins 💰</p>
            </div>
            <div class="bg-slate-800/60 border border-green-500/30 rounded-xl p-4 text-center cursor-pointer hover:border-green-400 hover:bg-slate-800/80 transition-all ${footballLeft === 0 ? 'opacity-50 pointer-events-none' : ''}" onclick="closeMinigamesHub();openFootballToss()">
                <div class="text-3xl mb-2">🏈</div>
                <h3 class="text-sm font-bold text-green-300 uppercase">Football Toss</h3>
                <p class="text-[8px] text-gray-500 mt-1">Coach George's timing game</p>
                <p class="text-[9px] text-green-400 mt-2 font-bold">${footballLeft}/5 plays left today</p>
                <p class="text-[8px] text-amber-400 mt-1">Accuracy = Rewards 🎯</p>
            </div>
        </div>
    </div>`;
}

// ---- RPSLS GAME ----
function startRPSLS() {
    if (state.minigames.rpslsPlaysToday >= 3) return;
    rpslsState = { playerScore: 0, sheldonScore: 0, round: 0, maxRounds: 3, playing: true };
    renderRPSLSGame();
}

function renderRPSLSGame() {
    const modal = document.getElementById('minigames-modal');
    if (!modal) return;
    
    const s = rpslsState;
    let html = `
    <div class="bg-slate-900/90 backdrop-blur-md border border-indigo-500/30 max-w-md w-full p-4 sm:p-6 relative rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <button onclick="renderMinigamesHub()" class="absolute top-2 right-4 text-gray-500 hover:text-white font-bold text-2xl cursor-pointer">✕</button>
        <div class="text-center mb-3">
            <h2 class="text-sm font-bold tracking-widest text-indigo-400 uppercase">🖖 RPSLS</h2>
            <div class="flex justify-center items-center gap-4 mt-2">
                <div class="text-center">
                    <div class="text-[9px] text-gray-500 uppercase">You</div>
                    <div class="text-xl font-black text-emerald-400">${s.playerScore}</div>
                </div>
                <div class="text-gray-600 text-sm font-bold">VS</div>
                <div class="text-center">
                    <div class="text-[9px] text-gray-500 uppercase">Sheldon</div>
                    <div class="text-xl font-black text-red-400">${s.sheldonScore}</div>
                </div>
            </div>
            <div class="text-[8px] text-gray-600 mt-1">Round ${s.round + 1} of ${s.maxRounds}</div>
        </div>
        <div id="rpsls-result" class="text-center mb-3 min-h-[40px]"></div>
        <div class="flex flex-wrap justify-center gap-2">`;
    
    RPSLS_CHOICES.forEach(c => {
        html += `<button onclick="playRPSLS('${c.key}')" class="w-14 h-14 rounded-full bg-slate-800/80 border-2 border-indigo-500/40 hover:border-indigo-300 hover:bg-slate-700/80 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5">
            <span class="text-xl">${c.icon}</span>
            <span class="text-[6px] text-gray-400 uppercase">${c.name}</span>
        </button>`;
    });
    
    html += `</div></div>`;
    modal.innerHTML = html;
}

function playRPSLS(playerChoice) {
    if (!rpslsState.playing) return;
    
    const choices = RPSLS_CHOICES.map(c => c.key);
    const sheldonChoice = choices[Math.floor(Math.random() * choices.length)];
    
    const playerData = RPSLS_CHOICES.find(c => c.key === playerChoice);
    const sheldonData = RPSLS_CHOICES.find(c => c.key === sheldonChoice);
    
    let result, color;
    if (playerChoice === sheldonChoice) {
        result = 'TIE!';
        color = 'text-gray-400';
    } else if (RPSLS_WINS[playerChoice].includes(sheldonChoice)) {
        result = `${playerData.name} ${RPSLS_VERBS[playerChoice + '-' + sheldonChoice]} ${sheldonData.name}! YOU WIN!`;
        color = 'text-emerald-400';
        rpslsState.playerScore++;
    } else {
        result = `${sheldonData.name} ${RPSLS_VERBS[sheldonChoice + '-' + playerChoice]} ${playerData.name}! SHELDON WINS!`;
        color = 'text-red-400';
        rpslsState.sheldonScore++;
    }
    
    rpslsState.round++;
    
    const resultEl = document.getElementById('rpsls-result');
    if (resultEl) {
        resultEl.innerHTML = `
            <div class="flex justify-center items-center gap-4 mb-1">
                <span class="text-2xl">${playerData.icon}</span>
                <span class="text-gray-600 font-bold">VS</span>
                <span class="text-2xl">${sheldonData.icon}</span>
            </div>
            <div class="${color} text-[10px] font-bold">${result}</div>`;
    }
    
    // Update scores in display
    const scoreArea = document.querySelector('#minigames-modal .text-emerald-400');
    const sheldonScoreArea = document.querySelector('#minigames-modal .text-red-400');
    if (scoreArea) scoreArea.textContent = rpslsState.playerScore;
    if (sheldonScoreArea) sheldonScoreArea.textContent = rpslsState.sheldonScore;
    
    // Check if game over
    if (rpslsState.round >= rpslsState.maxRounds) {
        rpslsState.playing = false;
        state.minigames.rpslsPlaysToday++;
        
        setTimeout(() => {
            const won = rpslsState.playerScore > rpslsState.sheldonScore;
            let rewardText = '';
            if (won) {
                state.resources.money += 500;
                const rList = ['stone', 'iron', 'scrap'];
                const rKey = rList[Math.floor(Math.random() * rList.length)];
                state.resources[rKey] += 5;
                rewardText = `$500 + 5 ${rKey}`;
                if (state.stats) state.stats.moneyEarned += 500;
            }
            saveProgress();
            if (typeof syncUI === 'function') syncUI();
            
            const modal = document.getElementById('minigames-modal');
            if (modal) {
                modal.innerHTML = `
                <div class="bg-slate-900/90 backdrop-blur-md border border-${won ? 'amber' : 'red'}-500/30 max-w-sm w-full p-6 rounded-xl text-center">
                    <div class="text-4xl mb-3">${won ? '🏆' : '😤'}</div>
                    <h3 class="text-lg font-black ${won ? 'text-amber-400' : 'text-red-400'} uppercase mb-2">${won ? 'YOU WIN!' : 'SHELDON WINS!'}</h3>
                    <div class="text-gray-400 text-sm mb-1">${rpslsState.playerScore} - ${rpslsState.sheldonScore}</div>
                    ${won ? `<div class="text-amber-300 text-[10px] mt-2 font-bold">Reward: ${rewardText}</div>` : `<div class="text-gray-500 text-[10px] mt-2">Bazinga! Better luck next time.</div>`}
                    <button onclick="renderMinigamesHub()" class="mt-4 px-4 py-2 rounded-lg bg-slate-800 border border-gray-600 text-white text-xs font-bold cursor-pointer hover:bg-slate-700 transition-all uppercase">Back to Hub</button>
                </div>`;
            }
        }, 1500);
    }
}

// ---- TRIVIA GAME ----
function startTrivia() {
    if (state.minigames.triviaPlaysToday >= 1) return;
    
    // Pick 5 random questions
    const shuffled = [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5);
    triviaState = { questions: shuffled.slice(0, 5), currentQ: 0, score: 0, playing: true, timer: null, timeLeft: 10 };
    renderTriviaQuestion();
}

function renderTriviaQuestion() {
    const modal = document.getElementById('minigames-modal');
    if (!modal || !triviaState.playing) return;
    
    const q = triviaState.questions[triviaState.currentQ];
    triviaState.timeLeft = 10;
    
    // Start timer
    if (triviaState.timer) clearInterval(triviaState.timer);
    triviaState.timer = setInterval(() => {
        triviaState.timeLeft--;
        const timerEl = document.getElementById('trivia-timer');
        if (timerEl) timerEl.textContent = triviaState.timeLeft + 's';
        if (triviaState.timeLeft <= 0) {
            clearInterval(triviaState.timer);
            answerTrivia(-1); // Time's up
        }
    }, 1000);
    
    let html = `
    <div class="bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 max-w-md w-full p-4 sm:p-6 relative rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <div class="flex justify-between items-center mb-3">
            <span class="text-[9px] text-gray-500 font-bold uppercase">Question ${triviaState.currentQ + 1}/5</span>
            <span class="text-[9px] text-emerald-400 font-bold">Score: ${triviaState.score}/5</span>
            <span id="trivia-timer" class="text-[11px] text-amber-400 font-black">${triviaState.timeLeft}s</span>
        </div>
        <div class="bg-slate-800/60 rounded-lg p-3 mb-3 border border-gray-700/50">
            <p class="text-sm text-white font-bold leading-relaxed">${q.q}</p>
        </div>
        <div class="grid grid-cols-1 gap-2">`;
    
    q.o.forEach((opt, i) => {
        html += `<button onclick="answerTrivia(${i})" class="w-full text-left px-3 py-2 rounded-lg bg-slate-800/60 border border-gray-700/50 text-gray-300 text-[11px] font-bold cursor-pointer hover:border-emerald-400 hover:bg-emerald-900/20 transition-all">${String.fromCharCode(65 + i)}. ${opt}</button>`;
    });
    
    html += `</div></div>`;
    modal.innerHTML = html;
}

function answerTrivia(index) {
    if (!triviaState.playing) return;
    if (triviaState.timer) { clearInterval(triviaState.timer); triviaState.timer = null; }
    
    const q = triviaState.questions[triviaState.currentQ];
    const correct = index === q.a;
    if (correct) triviaState.score++;
    
    triviaState.currentQ++;
    
    if (triviaState.currentQ >= 5) {
        endTrivia();
    } else {
        // Brief flash showing correct/wrong then next question
        const modal = document.getElementById('minigames-modal');
        if (modal) {
            const inner = modal.querySelector('div');
            if (inner) {
                const flash = document.createElement('div');
                flash.className = `fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-bold z-[400] ${correct ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`;
                flash.textContent = correct ? '✅ Correct!' : `❌ Wrong! Answer: ${q.o[q.a]}`;
                document.body.appendChild(flash);
                setTimeout(() => flash.remove(), 1200);
            }
        }
        setTimeout(() => renderTriviaQuestion(), 800);
    }
}

function endTrivia() {
    triviaState.playing = false;
    state.minigames.triviaPlaysToday++;
    
    const score = triviaState.score;
    let rewardText = 'No reward';
    if (score >= 3) {
        state.resources.money += 300;
        rewardText = '$300';
        if (state.stats) state.stats.moneyEarned += 300;
    }
    if (score >= 4) {
        state.resources.money += 500; // total 800
        state.resources.gold += 3;
        rewardText = '$800 + 3 Gold';
        if (state.stats) state.stats.moneyEarned += 500;
    }
    if (score >= 5) {
        state.resources.money += 700; // total 1500
        state.resources.diamond += 5;
        rewardText = '$1,500 + 5 Diamond';
        if (state.stats) state.stats.moneyEarned += 700;
    }
    
    if (score > state.minigames.triviaHighScore) state.minigames.triviaHighScore = score;
    
    saveProgress();
    if (typeof syncUI === 'function') syncUI();
    
    const modal = document.getElementById('minigames-modal');
    if (modal) {
        const stars = '⭐'.repeat(score) + '☆'.repeat(5 - score);
        modal.innerHTML = `
        <div class="bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 max-w-sm w-full p-6 rounded-xl text-center">
            <div class="text-3xl mb-2">🧠</div>
            <h3 class="text-lg font-black text-emerald-400 uppercase mb-1">TRIVIA COMPLETE!</h3>
            <div class="text-xl mb-2">${stars}</div>
            <div class="text-gray-400 text-sm mb-1">${score}/5 Correct</div>
            <div class="text-[9px] text-gray-600 mb-2">Best: ${state.minigames.triviaHighScore}/5</div>
            ${score >= 3 ? `<div class="text-amber-300 text-[10px] font-bold mt-2">Reward: ${rewardText}</div>` : `<div class="text-gray-500 text-[10px] mt-2">Score 3+ to earn rewards!</div>`}
            <button onclick="renderMinigamesHub()" class="mt-4 px-4 py-2 rounded-lg bg-slate-800 border border-gray-600 text-white text-xs font-bold cursor-pointer hover:bg-slate-700 transition-all uppercase">Back to Hub</button>
        </div>`;
    }
}
