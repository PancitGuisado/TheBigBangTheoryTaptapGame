// ============================================================
// PVP SEASON REWARDS — League milestone rewards + season tracking
// ============================================================

(function() {
    'use strict';

    // ---- LEAGUE MILESTONE REWARDS ----
    // One-time rewards for reaching each league for the first time
    var LEAGUE_REWARDS = {
        'Bronze':   null, // Starting league, no reward
        'Silver':   { money: 2000, stone: 50,  icon: '🥈', title: 'Silver Contender' },
        'Gold':     { money: 5000, iron: 50, gold: 20, icon: '🥇', title: 'Gold Warrior' },
        'Platinum': { money: 10000, gold: 50, diamond: 10, icon: '💎', title: 'Platinum Champion' },
        'Diamond':  { money: 25000, diamond: 30, gold: 100, icon: '👑', title: 'Diamond Elite' },
        'Legend':   { money: 50000, diamond: 75, gold: 200, icon: '🌟', title: 'Living Legend' }
    };

    // ---- TROPHY MILESTONE REWARDS ----
    // Rewards at specific trophy counts
    var TROPHY_MILESTONES = [
        { trophies: 50,   reward: { money: 500 },   label: '50 Trophies' },
        { trophies: 100,  reward: { money: 1000, stone: 20 }, label: '100 Trophies' },
        { trophies: 250,  reward: { money: 2500, iron: 30 },  label: '250 Trophies' },
        { trophies: 500,  reward: { money: 5000, gold: 15 },  label: '500 Trophies' },
        { trophies: 750,  reward: { money: 7500, gold: 25 },  label: '750 Trophies' },
        { trophies: 1000, reward: { money: 15000, diamond: 20 }, label: '1K Trophies' },
        { trophies: 1500, reward: { money: 25000, diamond: 40 }, label: '1.5K Trophies' },
        { trophies: 2000, reward: { money: 50000, diamond: 75 }, label: '2K Trophies' },
        { trophies: 3000, reward: { money: 100000, diamond: 150 }, label: '3K Trophies' }
    ];

    // ---- STATE INIT ----
    function initSeasonRewards() {
        if (!state.pvpRewards) {
            state.pvpRewards = {
                claimedLeagues: [],     // leagues whose reward was claimed
                claimedMilestones: [],  // trophy milestone thresholds claimed
                peakTrophies: 0,        // highest trophies ever reached
                totalSeasons: 0,
                seasonHistory: []       // past season results
            };
        }
        // Track peak trophies
        if (state.pvp && state.pvp.trophies > state.pvpRewards.peakTrophies) {
            state.pvpRewards.peakTrophies = state.pvp.trophies;
        }
    }

    // ---- CHECK FOR NEW LEAGUE REWARD ----
    function checkLeagueReward() {
        initSeasonRewards();
        if (!state.pvp) return;

        var league = typeof getPvpLeague === 'function' ? getPvpLeague(state.pvp.trophies) : null;
        if (!league) return;

        var leagueName = league.name;
        if (state.pvpRewards.claimedLeagues.indexOf(leagueName) >= 0) return;
        if (!LEAGUE_REWARDS[leagueName]) return;

        // Show league promotion reward modal
        showLeagueRewardModal(leagueName, LEAGUE_REWARDS[leagueName]);
    }

    // ---- CHECK TROPHY MILESTONES ----
    function checkTrophyMilestones() {
        initSeasonRewards();
        if (!state.pvp) return;

        for (var i = 0; i < TROPHY_MILESTONES.length; i++) {
            var m = TROPHY_MILESTONES[i];
            if (state.pvp.trophies >= m.trophies && state.pvpRewards.claimedMilestones.indexOf(m.trophies) < 0) {
                // Auto-claim milestone rewards silently
                for (var r in m.reward) {
                    if (state.resources[r] !== undefined) state.resources[r] += m.reward[r];
                }
                state.pvpRewards.claimedMilestones.push(m.trophies);

                // Toast notification
                if (typeof showGameAlert === 'function') {
                    var rewardText = [];
                    for (var rt in m.reward) {
                        var icons = { money: '💵', stone: '🪨', iron: '⛏️', gold: '🥇', diamond: '💎' };
                        rewardText.push((icons[rt] || '') + ' +' + m.reward[rt]);
                    }
                    showGameAlert('🏆 Trophy Milestone!', m.label + ' reached! ' + rewardText.join(', '));
                }

                if (typeof saveProgress === 'function') saveProgress();
            }
        }
    }

    // ---- LEAGUE PROMOTION MODAL ----
    function showLeagueRewardModal(leagueName, reward) {
        var existing = document.getElementById('league-reward-modal');
        if (existing) existing.remove();

        var leagueData = null;
        if (typeof PVP_LEAGUES !== 'undefined') {
            for (var i = 0; i < PVP_LEAGUES.length; i++) {
                if (PVP_LEAGUES[i].name === leagueName) { leagueData = PVP_LEAGUES[i]; break; }
            }
        }
        var color = leagueData ? leagueData.color : '#f59e0b';
        var icon = leagueData ? leagueData.icon : '🏆';

        var lootHtml = '';
        var lootItems = [];
        if (reward.money) lootItems.push({ icon: '💵', label: '$' + reward.money.toLocaleString(), color: '#22c55e' });
        if (reward.stone) lootItems.push({ icon: '🪨', label: reward.stone + ' Stone', color: '#9ca3af' });
        if (reward.iron)  lootItems.push({ icon: '⛏️', label: reward.iron + ' Iron', color: '#64748b' });
        if (reward.gold)  lootItems.push({ icon: '🥇', label: reward.gold + ' Gold', color: '#f59e0b' });
        if (reward.diamond) lootItems.push({ icon: '💎', label: reward.diamond + ' Diamond', color: '#06b6d4' });

        for (var j = 0; j < lootItems.length; j++) {
            var item = lootItems[j];
            lootHtml += '<div class="flex items-center gap-2 bg-slate-800/60 rounded-lg px-3 py-2 border border-white/5">' +
                '<span class="text-lg">' + item.icon + '</span>' +
                '<span class="font-bold text-[11px]" style="color:' + item.color + '">' + item.label + '</span>' +
            '</div>';
        }

        var modal = document.createElement('div');
        modal.id = 'league-reward-modal';
        modal.className = 'fixed inset-0 z-[9600] flex items-center justify-center';
        modal.innerHTML = '' +
            '<div class="absolute inset-0 bg-black/70"></div>' +
            '<div class="relative bg-slate-900/95 backdrop-blur-xl border-2 rounded-2xl p-6 max-w-[340px] w-full mx-4 shadow-2xl text-center" style="border-color:' + color + ';box-shadow: 0 0 60px ' + color + '30;">' +
                '<div class="text-5xl mb-3" style="filter:drop-shadow(0 0 20px ' + color + ');">' + icon + '</div>' +
                '<div class="text-[10px] text-gray-400 uppercase tracking-[4px] font-bold mb-1">LEAGUE PROMOTION</div>' +
                '<div class="text-[22px] font-black uppercase tracking-widest mb-1" style="color:' + color + ';text-shadow:0 0 20px ' + color + '60;">' + leagueName + '</div>' +
                (reward.title ? '<div class="text-[9px] text-gray-500 italic mb-4">Title Earned: "' + reward.title + '"</div>' : '') +
                '<div class="grid grid-cols-2 gap-2 mb-4">' + lootHtml + '</div>' +
                '<button onclick="claimLeagueReward(\'' + leagueName + '\')" class="w-full py-3 rounded-xl font-black text-white uppercase tracking-widest text-[12px] cursor-pointer transition-all hover:scale-105" style="background:linear-gradient(135deg, ' + color + ', ' + color + '90);box-shadow:0 4px 20px ' + color + '40;">' +
                    '✨ CLAIM REWARDS' +
                '</button>' +
            '</div>';

        document.body.appendChild(modal);
    }

    function claimLeagueReward(leagueName) {
        initSeasonRewards();
        var reward = LEAGUE_REWARDS[leagueName];
        if (!reward) return;
        if (state.pvpRewards.claimedLeagues.indexOf(leagueName) >= 0) return;

        // Apply rewards
        for (var r in reward) {
            if (r === 'icon' || r === 'title') continue;
            if (state.resources[r] !== undefined) state.resources[r] += reward[r];
        }

        state.pvpRewards.claimedLeagues.push(leagueName);

        // Store title
        if (reward.title) {
            if (!state.titles) state.titles = [];
            if (state.titles.indexOf(reward.title) < 0) state.titles.push(reward.title);
        }

        if (typeof SoundManager !== 'undefined') SoundManager.playFX('levelup');
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();

        var modal = document.getElementById('league-reward-modal');
        if (modal) modal.remove();
    }

    // ---- SEASON REWARDS PANEL IN PVP HUB ----
    function renderSeasonRewardsPanel() {
        initSeasonRewards();
        if (!state.pvp) return '';

        var currentTrophies = state.pvp.trophies || 0;
        var peakTrophies = state.pvpRewards.peakTrophies || 0;

        var html = '<div class="mt-3 bg-slate-800/40 rounded-xl border border-white/5 p-3">' +
            '<div class="text-[9px] text-amber-400 font-bold uppercase tracking-widest mb-2">🏆 Season Milestones</div>' +
            '<div class="text-[8px] text-gray-500 mb-2">Peak: ' + peakTrophies + ' 🏆</div>';

        // League milestone list
        for (var i = 1; i < PVP_LEAGUES.length; i++) {
            var league = PVP_LEAGUES[i];
            var reward = LEAGUE_REWARDS[league.name];
            if (!reward) continue;

            var claimed = state.pvpRewards.claimedLeagues.indexOf(league.name) >= 0;
            var reached = currentTrophies >= league.minTrophies;

            html += '<div class="flex items-center gap-2 py-1.5 ' + (claimed ? 'opacity-50' : '') + '">' +
                '<span class="text-sm">' + league.icon + '</span>' +
                '<div class="flex-1">' +
                    '<div class="text-[9px] font-bold" style="color:' + league.color + '">' + league.name + ' (' + league.minTrophies + '🏆)</div>' +
                '</div>' +
                '<span class="text-[8px] font-bold ' + (claimed ? 'text-emerald-400' : (reached ? 'text-amber-400' : 'text-gray-600')) + '">' +
                    (claimed ? '✓ CLAIMED' : (reached ? '⭐ READY' : '🔒')) +
                '</span>' +
            '</div>';
        }

        // Trophy milestones
        html += '<div class="text-[9px] text-purple-400 font-bold uppercase tracking-widest mt-3 mb-2">📊 Trophy Milestones</div>';

        for (var j = 0; j < TROPHY_MILESTONES.length; j++) {
            var m = TROPHY_MILESTONES[j];
            var mClaimed = state.pvpRewards.claimedMilestones.indexOf(m.trophies) >= 0;
            var mReached = currentTrophies >= m.trophies;
            var progressPct = mReached ? 100 : Math.min(99, Math.floor((currentTrophies / m.trophies) * 100));

            html += '<div class="flex items-center gap-2 py-1 ' + (mClaimed ? 'opacity-40' : '') + '">' +
                '<div class="flex-1">' +
                    '<div class="text-[8px] text-gray-400 font-bold">' + m.label + '</div>' +
                    '<div class="bg-slate-700 rounded-full h-1 mt-0.5" style="width:100%">' +
                        '<div class="h-full rounded-full transition-all" style="width:' + progressPct + '%;background:' + (mClaimed ? '#22c55e' : '#a855f7') + '"></div>' +
                    '</div>' +
                '</div>' +
                '<span class="text-[7px] font-bold ' + (mClaimed ? 'text-emerald-400' : 'text-gray-600') + '">' +
                    (mClaimed ? '✓' : progressPct + '%') +
                '</span>' +
            '</div>';
        }

        html += '</div>';
        return html;
    }

    // ---- HOOK INTO PVP RESULT ----
    // Monkey-patch showPvpResultModal to also check rewards
    var _origPvpResult = window.showPvpResultModal;
    function patchPvpResult() {
        if (typeof window.showPvpResultModal !== 'function') return;
        if (window._pvpRewardPatched) return;

        _origPvpResult = window.showPvpResultModal;
        window.showPvpResultModal = function(won, trophyChange, lootReward) {
            // Call original
            if (_origPvpResult) _origPvpResult(won, trophyChange, lootReward);

            // Update peak
            initSeasonRewards();
            if (state.pvp && state.pvp.trophies > state.pvpRewards.peakTrophies) {
                state.pvpRewards.peakTrophies = state.pvp.trophies;
            }

            // Check rewards after a short delay (let trophy update settle)
            setTimeout(function() {
                checkLeagueReward();
                checkTrophyMilestones();
            }, 500);
        };
        window._pvpRewardPatched = true;
    }

    // ---- INIT ----
    function init() {
        initSeasonRewards();
        patchPvpResult();

        // Check on load in case player earned trophies while away
        setTimeout(function() {
            checkTrophyMilestones();
        }, 5000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 3500); });
    } else {
        setTimeout(init, 3500);
    }

    // Exports
    window.claimLeagueReward = claimLeagueReward;
    window.checkLeagueReward = checkLeagueReward;
    window.renderSeasonRewardsPanel = renderSeasonRewardsPanel;
    window.LEAGUE_REWARDS = LEAGUE_REWARDS;
})();
