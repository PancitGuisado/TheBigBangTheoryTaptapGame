// ============================================================
// WORLD BOSS — Simulated Multiplayer Boss Fight
// Relies on global: state, characters, saveProgress(), showToast()
// ============================================================
(function() {
    'use strict';

    // ═══════════════════════════════════════════════════
    // BOSS DEFINITIONS
    // ═══════════════════════════════════════════════════
    var WORLD_BOSSES = [
        { key: 'giant_robot', name: 'Giant Robot', emoji: '🤖', color: '#06b6d4', maxHp: 5000000 },
        { key: 'alien_overlord', name: 'Alien Overlord', emoji: '👽', color: '#a855f7', maxHp: 6000000 },
        { key: 'dark_matter', name: 'Dark Matter Beast', emoji: '🌑', color: '#6366f1', maxHp: 7000000 },
        { key: 'parallel_sheldon', name: 'Parallel Universe Sheldon', emoji: '🪞', color: '#f59e0b', maxHp: 8000000 },
        { key: 'evil_wil', name: 'Evil Wil Wheaton', emoji: '😈', color: '#ef4444', maxHp: 9000000 },
        { key: 'kripke_revenge', name: "Kripke's Revenge", emoji: '🧪', color: '#22c55e', maxHp: 10000000 }
    ];

    var SIM_NAMES = [
        'BazingaMaster', 'PennyBlossomFan', 'RocketManH', 'RajKoothrappali99',
        'SheldonBot3000', 'WolowitzAstro', 'AmyNeuro', 'StuartComics',
        'LeslieQuantum', 'ProtonJr', 'StringTheoryNerd', 'ComicBookGal',
        'ZackAttack', 'BernieTheMicro', 'DeniseDroid', 'KripkeLaser', 'BertRock'
    ];

    var battleInterval = null;
    var battleActive = false;
    var countdownTimer = null;

    // ═══════════════════════════════════════════════════
    // HELPERS
    // ═══════════════════════════════════════════════════
    function formatNum(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return String(Math.floor(n));
    }

    function getTeamPower() {
        var power = 0;
        if (typeof characters !== 'undefined' && state && state.roster) {
            var keys = Object.keys(state.roster);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                if (state.roster[k].level > 0 && characters[k]) {
                    power += characters[k].baseDmg * state.roster[k].level;
                }
            }
        }
        return power;
    }

    function getBossData(key) {
        for (var i = 0; i < WORLD_BOSSES.length; i++) {
            if (WORLD_BOSSES[i].key === key) return WORLD_BOSSES[i];
        }
        return WORLD_BOSSES[0];
    }

    function shuffleArray(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function generateSimLeaderboard(playerDmg) {
        var entries = [];
        var simCount = 12 + Math.floor(Math.random() * 6); // 12-17 simulated
        var shuffled = shuffleArray(SIM_NAMES).slice(0, simCount);
        var baseDmg = Math.max(playerDmg, 50000);
        for (var i = 0; i < shuffled.length; i++) {
            var mult = 0.2 + Math.random() * 1.8; // 20%-200%
            entries.push({ name: shuffled[i], damage: Math.floor(baseDmg * mult) });
        }
        if (playerDmg > 0) {
            entries.push({ name: '⭐ You', damage: playerDmg, isPlayer: true });
        }
        entries.sort(function(a, b) { return b.damage - a.damage; });
        return entries;
    }

    function getPlayerRank(leaderboard) {
        for (var i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i].isPlayer) return i + 1;
        }
        return leaderboard.length + 1;
    }

    function getRewardForRank(rank) {
        if (rank === 1) return { diamonds: 200, coins: 50000 };
        if (rank <= 3) return { diamonds: 100, coins: 30000 };
        if (rank <= 10) return { diamonds: 50, coins: 15000 };
        return { diamonds: 0, coins: 5000 };
    }

    function formatTime(ms) {
        var totalSec = Math.max(0, Math.floor(ms / 1000));
        var h = Math.floor(totalSec / 3600);
        var m = Math.floor((totalSec % 3600) / 60);
        var s = totalSec % 60;
        return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    // ═══════════════════════════════════════════════════
    // STATE MANAGEMENT
    // ═══════════════════════════════════════════════════
    function ensureWorldBossState() {
        if (!state) return;
        if (!state.worldBoss) {
            state.worldBoss = {
                bossKey: null, bossHp: 0, bossMaxHp: 0,
                playerDmg: 0, attempts: 3, lastReset: 0, leaderboard: []
            };
        }
        var now = Date.now();
        if (now - state.worldBoss.lastReset > 24 * 60 * 60 * 1000 || !state.worldBoss.bossKey) {
            var boss = WORLD_BOSSES[Math.floor(Math.random() * WORLD_BOSSES.length)];
            state.worldBoss.bossKey = boss.key;
            state.worldBoss.bossHp = boss.maxHp;
            state.worldBoss.bossMaxHp = boss.maxHp;
            state.worldBoss.playerDmg = 0;
            state.worldBoss.attempts = 3;
            state.worldBoss.lastReset = now;
            state.worldBoss.leaderboard = generateSimLeaderboard(0);
            if (typeof saveProgress === 'function') saveProgress();
        }
    }

    // ═══════════════════════════════════════════════════
    // MAIN MODAL
    // ═══════════════════════════════════════════════════
    window.openWorldBoss = function() {
        ensureWorldBossState();
        var existing = document.getElementById('world-boss-modal');
        if (existing) existing.remove();
        if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }

        var boss = getBossData(state.worldBoss.bossKey);
        var modal = document.createElement('div');
        modal.id = 'world-boss-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.92);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:10px;';
        modal.onclick = function(e) { if (e.target === modal && !battleActive) { if (countdownTimer) clearInterval(countdownTimer); modal.remove(); } };

        renderBossView(modal, boss);
        document.body.appendChild(modal);
    };

    function renderBossView(modal, boss) {
        var wb = state.worldBoss;
        var hpPct = Math.max(0, (wb.bossHp / wb.bossMaxHp) * 100);
        var resetMs = (wb.lastReset + 24 * 60 * 60 * 1000) - Date.now();
        var rank = getPlayerRank(wb.leaderboard);
        var reward = getRewardForRank(rank);

        var html = '<div id="wb-content" style="background:' + boss.color + '11;border:2px solid ' + boss.color + '66;border-radius:16px;max-width:420px;width:100%;max-height:90vh;overflow-y:auto;padding:16px;box-shadow:0 0 60px ' + boss.color + '22;position:relative;">';

        // Close button
        html += '<div onclick="if(!window._wbBattleActive){var m=document.getElementById(\'world-boss-modal\');if(m)m.remove();}" style="position:absolute;top:8px;right:12px;cursor:pointer;color:rgba(255,255,255,0.4);font-size:18px;z-index:5;">&times;</div>';

        // Header
        html += '<div style="text-align:center;margin-bottom:12px;">';
        html += '<div id="wb-boss-emoji" style="font-size:48px;animation:wb-pulse 2s ease-in-out infinite;">' + boss.emoji + '</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:' + boss.color + ';letter-spacing:1px;margin-top:4px;">' + boss.name + '</div>';
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.4);margin-top:2px;font-family:\'Press Start 2P\',monospace;">WORLD BOSS</div>';
        html += '</div>';

        // HP Bar
        var hpColor = hpPct > 50 ? '#22c55e' : hpPct > 25 ? '#eab308' : '#ef4444';
        html += '<div style="margin-bottom:12px;">';
        html += '<div style="display:flex;justify-content:space-between;font-size:7px;color:rgba(255,255,255,0.5);margin-bottom:3px;font-family:\'Press Start 2P\',monospace;">';
        html += '<span>HP</span><span id="wb-hp-text">' + formatNum(wb.bossHp) + ' / ' + formatNum(wb.bossMaxHp) + '</span></div>';
        html += '<div style="background:rgba(0,0,0,0.6);border-radius:6px;height:18px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);">';
        html += '<div id="wb-hp-bar" style="height:100%;width:' + hpPct + '%;background:linear-gradient(90deg,' + hpColor + ',' + boss.color + ');border-radius:6px;transition:width 0.5s ease;animation:wb-glow 2s ease-in-out infinite;color:currentColor;"></div>';
        html += '</div>';
        html += '<div style="text-align:center;font-size:7px;color:rgba(255,255,255,0.3);margin-top:2px;" id="wb-hp-pct">' + hpPct.toFixed(1) + '%</div>';
        html += '</div>';

        // Stats row: Attempts + Reset Timer
        html += '<div style="display:flex;gap:6px;margin-bottom:12px;">';
        // Attempts
        html += '<div style="flex:1;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px;text-align:center;">';
        html += '<div style="font-size:6px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:4px;">ATTEMPTS</div>';
        var pips = '';
        for (var i = 0; i < 3; i++) {
            pips += '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;margin:0 2px;background:' + (i < wb.attempts ? boss.color : 'rgba(255,255,255,0.1)') + ';border:1px solid ' + (i < wb.attempts ? boss.color : 'rgba(255,255,255,0.2)') + ';"></span>';
        }
        html += pips;
        html += '</div>';
        // Reset timer
        html += '<div style="flex:1;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px;text-align:center;">';
        html += '<div style="font-size:6px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:4px;">RESETS IN</div>';
        html += '<div id="wb-reset-timer" style="font-size:10px;color:' + boss.color + ';font-family:\'Press Start 2P\',monospace;">' + formatTime(resetMs) + '</div>';
        html += '</div>';
        // Your damage
        html += '<div style="flex:1;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px;text-align:center;">';
        html += '<div style="font-size:6px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:4px;">YOUR DMG</div>';
        html += '<div id="wb-player-dmg" style="font-size:10px;color:#fbbf24;font-family:\'Press Start 2P\',monospace;">' + formatNum(wb.playerDmg) + '</div>';
        html += '</div>';
        html += '</div>';

        // Battle area
        html += '<div id="wb-battle-area" style="text-align:center;margin-bottom:12px;">';
        if (battleActive) {
            html += '<div style="font-size:8px;color:rgba(255,255,255,0.6);font-family:\'Press Start 2P\',monospace;">⚔️ BATTLE IN PROGRESS...</div>';
            html += '<div id="wb-battle-timer" style="font-size:20px;color:' + boss.color + ';font-family:\'Press Start 2P\',monospace;margin-top:8px;">30</div>';
            html += '<div id="wb-battle-dmg" style="font-size:12px;color:#fbbf24;font-family:\'Press Start 2P\',monospace;margin-top:4px;">0</div>';
        } else {
            var canAttack = wb.attempts > 0 && wb.bossHp > 0;
            var teamPow = getTeamPower();
            html += '<div style="font-size:7px;color:rgba(255,255,255,0.4);margin-bottom:6px;">Team Power: ' + formatNum(teamPow) + ' | Est. Damage: ' + formatNum(teamPow * 300) + '</div>';
            html += '<button id="wb-attack-btn" onclick="window._wbStartAttack()" style="padding:10px 24px;border-radius:10px;border:2px solid ' + boss.color + ';background:linear-gradient(135deg,' + boss.color + '33,' + boss.color + '11);color:' + boss.color + ';font-family:\'Press Start 2P\',monospace;font-size:10px;cursor:' + (canAttack ? 'pointer' : 'not-allowed') + ';opacity:' + (canAttack ? '1' : '0.4') + ';letter-spacing:1px;transition:all 0.2s;"' + (canAttack ? '' : ' disabled') + '>';
            html += '⚔️ ATTACK BOSS</button>';
            if (!canAttack && wb.attempts <= 0) {
                html += '<div style="font-size:7px;color:#ef4444;margin-top:4px;">No attempts remaining today!</div>';
            }
            if (!canAttack && wb.bossHp <= 0) {
                html += '<div style="font-size:7px;color:#22c55e;margin-top:4px;">Boss defeated! Wait for reset.</div>';
            }
        }
        html += '</div>';

        // Rank & Reward Preview
        html += '<div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px;margin-bottom:12px;">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
        html += '<div><span style="font-size:7px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;">RANK </span>';
        html += '<span style="font-size:12px;color:' + (rank <= 3 ? '#fbbf24' : rank <= 10 ? '#06b6d4' : 'rgba(255,255,255,0.5)') + ';font-family:\'Press Start 2P\',monospace;">#' + rank + '</span></div>';
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.5);">';
        if (reward.diamonds > 0) html += '💎 ' + reward.diamonds + ' ';
        html += '💰 ' + formatNum(reward.coins);
        html += '</div></div></div>';

        // Leaderboard
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:rgba(255,255,255,0.5);margin-bottom:6px;letter-spacing:1px;">📊 LEADERBOARD</div>';
        html += '<div style="max-height:160px;overflow-y:auto;background:rgba(0,0,0,0.3);border-radius:8px;border:1px solid rgba(255,255,255,0.06);">';
        var lb = wb.leaderboard;
        for (var j = 0; j < Math.min(lb.length, 20); j++) {
            var entry = lb[j];
            var isP = entry.isPlayer;
            var rankColors = ['#fbbf24', '#c0c0c0', '#cd7f32'];
            var rColor = j < 3 ? rankColors[j] : 'rgba(255,255,255,0.3)';
            var medals = ['🥇', '🥈', '🥉'];
            var medal = j < 3 ? medals[j] : (j + 1) + '.';
            html += '<div style="display:flex;align-items:center;padding:5px 8px;border-bottom:1px solid rgba(255,255,255,0.04);' + (isP ? 'background:rgba(' + (boss.color === '#06b6d4' ? '6,182,212' : boss.color === '#a855f7' ? '168,85,247' : boss.color === '#ef4444' ? '239,68,68' : '255,255,255') + ',0.08);border-left:2px solid ' + boss.color + ';' : '') + '">';
            html += '<span style="width:24px;font-size:' + (j < 3 ? '10px' : '7px') + ';color:' + rColor + ';text-align:center;">' + medal + '</span>';
            html += '<span style="flex:1;font-size:8px;color:' + (isP ? '#fbbf24' : 'rgba(255,255,255,0.7)') + ';margin-left:6px;' + (isP ? 'font-weight:bold;' : '') + '">' + entry.name + '</span>';
            html += '<span style="font-size:7px;color:rgba(255,255,255,0.5);font-family:\'Press Start 2P\',monospace;">' + formatNum(entry.damage) + '</span>';
            html += '</div>';
        }
        if (lb.length === 0) {
            html += '<div style="padding:12px;text-align:center;font-size:7px;color:rgba(255,255,255,0.3);">No damage dealt yet</div>';
        }
        html += '</div>';

        html += '</div>'; // end content

        modal.innerHTML = '';
        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        modal.appendChild(wrapper.firstChild);

        // Start countdown timer
        countdownTimer = setInterval(function() {
            var el = document.getElementById('wb-reset-timer');
            if (!el) { clearInterval(countdownTimer); countdownTimer = null; return; }
            var remaining = (state.worldBoss.lastReset + 24 * 60 * 60 * 1000) - Date.now();
            if (remaining <= 0) {
                clearInterval(countdownTimer);
                countdownTimer = null;
                ensureWorldBossState();
                window.openWorldBoss();
                return;
            }
            el.textContent = formatTime(remaining);
        }, 1000);
    }

    // ═══════════════════════════════════════════════════
    // BATTLE SYSTEM
    // ═══════════════════════════════════════════════════
    window._wbBattleActive = false;
    window._wbStartAttack = function() {
        if (battleActive) return;
        ensureWorldBossState();
        var wb = state.worldBoss;
        if (wb.attempts <= 0 || wb.bossHp <= 0) return;

        battleActive = true;
        window._wbBattleActive = true;
        wb.attempts--;

        var teamPower = getTeamPower();
        var dps = teamPower * 10;
        var totalTarget = dps * 30;
        var dmgPerTick = totalTarget / 60; // 60 ticks over 30 seconds
        var accDmg = 0;
        var ticksRemaining = 60;

        var boss = getBossData(wb.bossKey);

        // Update UI to battle mode
        var area = document.getElementById('wb-battle-area');
        if (area) {
            area.innerHTML = '<div style="font-size:8px;color:rgba(255,255,255,0.6);font-family:\'Press Start 2P\',monospace;">⚔️ BATTLE IN PROGRESS...</div>' +
                '<div id="wb-battle-timer" style="font-size:24px;color:' + boss.color + ';font-family:\'Press Start 2P\',monospace;margin-top:8px;">30</div>' +
                '<div id="wb-battle-dmg" style="font-size:14px;color:#fbbf24;font-family:\'Press Start 2P\',monospace;margin-top:4px;">0</div>' +
                '<div id="wb-dmg-fly" style="position:relative;height:20px;overflow:visible;"></div>';
        }

        // Shake boss emoji
        var bossEmoji = document.getElementById('wb-boss-emoji');
        if (bossEmoji) bossEmoji.style.animation = 'wb-shake 0.3s ease-in-out infinite';

        battleInterval = setInterval(function() {
            ticksRemaining--;
            var tickDmg = dmgPerTick * (0.8 + Math.random() * 0.4); // slight variance
            accDmg += tickDmg;
            wb.bossHp = Math.max(0, wb.bossHp - tickDmg);

            // Update HP bar
            var hpPct = Math.max(0, (wb.bossHp / wb.bossMaxHp) * 100);
            var hpBar = document.getElementById('wb-hp-bar');
            if (hpBar) hpBar.style.width = hpPct + '%';
            var hpText = document.getElementById('wb-hp-text');
            if (hpText) hpText.textContent = formatNum(wb.bossHp) + ' / ' + formatNum(wb.bossMaxHp);
            var hpPctEl = document.getElementById('wb-hp-pct');
            if (hpPctEl) hpPctEl.textContent = hpPct.toFixed(1) + '%';

            // Update damage counter
            var dmgEl = document.getElementById('wb-battle-dmg');
            if (dmgEl) dmgEl.textContent = formatNum(accDmg);

            // Timer
            var timeLeft = Math.ceil(ticksRemaining / 2);
            var timerEl = document.getElementById('wb-battle-timer');
            if (timerEl) timerEl.textContent = timeLeft + 's';

            // Flying damage number
            var flyArea = document.getElementById('wb-dmg-fly');
            if (flyArea && ticksRemaining % 3 === 0) {
                var flyNum = document.createElement('div');
                flyNum.style.cssText = 'position:absolute;left:' + (30 + Math.random() * 40) + '%;color:#fbbf24;font-size:10px;font-family:\'Press Start 2P\',monospace;animation:wb-fly 1s ease-out forwards;pointer-events:none;';
                flyNum.textContent = '-' + formatNum(tickDmg);
                flyArea.appendChild(flyNum);
                setTimeout(function() { if (flyNum.parentNode) flyNum.parentNode.removeChild(flyNum); }, 1000);
            }

            // End conditions
            if (ticksRemaining <= 0 || wb.bossHp <= 0) {
                clearInterval(battleInterval);
                battleInterval = null;
                endBossAttack(accDmg, boss);
            }
        }, 500);
    };

    function endBossAttack(totalDmg, boss) {
        battleActive = false;
        window._wbBattleActive = false;
        var wb = state.worldBoss;

        // Reset boss emoji animation
        var bossEmoji = document.getElementById('wb-boss-emoji');
        if (bossEmoji) bossEmoji.style.animation = 'wb-pulse 2s ease-in-out infinite';

        // Update player damage
        wb.playerDmg += Math.floor(totalDmg);

        // Regenerate leaderboard with new player damage
        wb.leaderboard = generateSimLeaderboard(wb.playerDmg);

        // Calculate rank and give rewards
        var rank = getPlayerRank(wb.leaderboard);
        var reward = getRewardForRank(rank);

        // Grant rewards
        if (state.resources) {
            if (reward.diamonds > 0) state.resources.diamond = (state.resources.diamond || 0) + reward.diamonds;
            state.resources.money = (state.resources.money || 0) + reward.coins;
        }

        if (typeof saveProgress === 'function') saveProgress();

        // Show results
        var area = document.getElementById('wb-battle-area');
        if (area) {
            var resultHtml = '<div style="background:rgba(0,0,0,0.5);border:1px solid ' + boss.color + '44;border-radius:10px;padding:12px;text-align:center;">';
            resultHtml += '<div style="font-size:9px;color:' + boss.color + ';font-family:\'Press Start 2P\',monospace;margin-bottom:8px;">⚔️ BATTLE COMPLETE!</div>';
            resultHtml += '<div style="font-size:7px;color:rgba(255,255,255,0.6);margin-bottom:4px;">Damage Dealt: <span style="color:#fbbf24;">' + formatNum(totalDmg) + '</span></div>';
            resultHtml += '<div style="font-size:7px;color:rgba(255,255,255,0.6);margin-bottom:8px;">Rank: <span style="color:' + (rank <= 3 ? '#fbbf24' : '#06b6d4') + ';">#' + rank + '</span></div>';
            resultHtml += '<div style="font-size:8px;color:#22c55e;font-family:\'Press Start 2P\',monospace;">REWARDS</div>';
            if (reward.diamonds > 0) resultHtml += '<div style="font-size:8px;color:#a855f7;margin-top:4px;">💎 ' + reward.diamonds + ' Diamonds</div>';
            resultHtml += '<div style="font-size:8px;color:#fbbf24;margin-top:2px;">💰 ' + formatNum(reward.coins) + ' Coins</div>';
            resultHtml += '<button onclick="window.openWorldBoss()" style="margin-top:10px;padding:8px 16px;border-radius:8px;border:1px solid ' + boss.color + ';background:' + boss.color + '22;color:' + boss.color + ';font-family:\'Press Start 2P\',monospace;font-size:7px;cursor:pointer;">OK</button>';
            resultHtml += '</div>';
            area.innerHTML = resultHtml;
        }

        // Update player dmg display
        var pdEl = document.getElementById('wb-player-dmg');
        if (pdEl) pdEl.textContent = formatNum(wb.playerDmg);

        if (typeof showToast === 'function') showToast('⚔️ Dealt ' + formatNum(totalDmg) + ' damage! Rank #' + rank);

        // Grant season XP/tokens if available
        if (typeof window.addSeasonXP === 'function') window.addSeasonXP(15);
        if (typeof window.addSeasonTokens === 'function') window.addSeasonTokens(10);
    }

    // ═══════════════════════════════════════════════════
    // CSS INJECTION
    // ═══════════════════════════════════════════════════
    if (!document.getElementById('world-boss-css')) {
        var style = document.createElement('style');
        style.id = 'world-boss-css';
        style.textContent = '@keyframes wb-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.15);}}' +
            '@keyframes wb-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}' +
            '@keyframes wb-fly{0%{opacity:1;transform:translateY(0);}100%{opacity:0;transform:translateY(-40px);}}' +
            '@keyframes wb-glow{0%,100%{box-shadow:0 0 5px currentColor;}50%{box-shadow:0 0 20px currentColor;}}' +
            '@keyframes wb-hp-drain{0%{background-position:0% 50%;}100%{background-position:100% 50%;}}';
        document.head.appendChild(style);
    }

    // ═══════════════════════════════════════════════════
    // MORE MENU INTEGRATION
    // ═══════════════════════════════════════════════════
    setTimeout(function() {
        var moreGrid = document.querySelector('#more-menu-panel .grid, #more-menu-panel [style*="grid"]');
        if (!moreGrid) {
            var panel = document.getElementById('more-menu-panel');
            if (panel) moreGrid = panel.querySelector('.flex.flex-wrap, .grid');
        }
        if (moreGrid) {
            var btn = document.createElement('button');
            btn.className = 'more-grid-btn';
            btn.onclick = function() { openWorldBoss(); if (typeof toggleMoreMenu === 'function') toggleMoreMenu(); };
            btn.innerHTML = '<span>👹</span><span class="more-grid-label">W.Boss</span>';
            moreGrid.appendChild(btn);
        }
    }, 2000);

    console.log('[WorldBoss] World Boss system loaded.');
})();
