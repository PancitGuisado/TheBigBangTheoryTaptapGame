// =====================================================
// BOSS RUSH MODE + EQUIPMENT CRAFTING + CHARACTER PAIR BONUSES
// =====================================================
(function() {
    'use strict';

    // ═══════════════════════════════════════════════════
    // BOSS RUSH MODE — Endless boss gauntlet
    // ═══════════════════════════════════════════════════
    var rushState = null;
    var rushTimer = null;
    var rushHpInterval = null;

    function ensureBossRushState() {
        if (!state) return;
        if (!state.bossRush) {
            state.bossRush = { highScore: 0, tickets: 3, lastFreeTicket: Date.now() };
        }
        // Regenerate tickets (1 every 8 hours, max 3)
        var now = Date.now();
        var elapsed = now - (state.bossRush.lastFreeTicket || now);
        var newTickets = Math.floor(elapsed / (8 * 60 * 60 * 1000));
        if (newTickets > 0 && state.bossRush.tickets < 3) {
            state.bossRush.tickets = Math.min(3, state.bossRush.tickets + newTickets);
            state.bossRush.lastFreeTicket = now;
            if (typeof saveProgress === 'function') saveProgress();
        }
    }

    function getBossPool() {
        if (typeof bossTypes === 'undefined') return [];
        return bossTypes.map(function(b) { return b; });
    }

    window.openBossRush = function() {
        ensureBossRushState();
        var existing = document.getElementById('boss-rush-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'boss-rush-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:12px;';
        modal.onclick = function(e) { if (e.target === modal && !rushState) modal.remove(); };

        if (rushState) {
            renderRushBattle(modal);
        } else {
            renderRushLobby(modal);
        }

        document.body.appendChild(modal);
    };

    function renderRushLobby(modal) {
        var tickets = state.bossRush.tickets;
        var high = state.bossRush.highScore;

        var html = '<div style="background:linear-gradient(135deg,rgba(20,5,5,0.97),rgba(40,10,10,0.97));border:2px solid rgba(239,68,68,0.4);border-radius:16px;max-width:380px;width:100%;padding:20px;box-shadow:0 0 60px rgba(239,68,68,0.15);">';
        
        html += '<div style="text-align:center;margin-bottom:16px;">';
        html += '<div style="font-size:32px;margin-bottom:4px;">⚔️</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:12px;color:#ef4444;text-transform:uppercase;letter-spacing:2px;">Boss Rush</div>';
        html += '<div style="font-size:8px;color:rgba(239,68,68,0.5);margin-top:4px;">Endless Boss Gauntlet</div>';
        html += '</div>';

        // Stats
        html += '<div style="display:flex;gap:8px;margin-bottom:16px;">';
        html += '<div style="flex:1;background:rgba(0,0,0,0.4);border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:10px;text-align:center;">';
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:4px;">HIGH SCORE</div>';
        html += '<div style="font-size:16px;color:#fbbf24;font-family:\'Press Start 2P\',monospace;">🏆 ' + high + '</div>';
        html += '</div>';
        html += '<div style="flex:1;background:rgba(0,0,0,0.4);border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:10px;text-align:center;">';
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:4px;">TICKETS</div>';
        html += '<div style="font-size:16px;color:#22c55e;font-family:\'Press Start 2P\',monospace;">🎟️ ' + tickets + '/3</div>';
        html += '</div>';
        html += '</div>';

        // Rules
        html += '<div style="background:rgba(0,0,0,0.3);border:1px solid rgba(100,100,130,0.2);border-radius:8px;padding:10px;margin-bottom:16px;font-size:8px;color:rgba(255,255,255,0.5);line-height:1.8;">';
        html += '• Fight bosses back-to-back<br>';
        html += '• 30 seconds per boss<br>';
        html += '• Each boss has 1.3x more HP<br>';
        html += '• Your team auto-attacks<br>';
        html += '• Rewards scale with rounds<br>';
        html += '</div>';

        // Start button
        if (tickets > 0) {
            html += '<button onclick="startBossRush()" style="width:100%;padding:14px;background:linear-gradient(135deg,#dc2626,#991b1b);color:white;font-family:\'Press Start 2P\',monospace;font-size:10px;border:2px solid #ef4444;border-radius:8px;cursor:pointer;text-transform:uppercase;letter-spacing:1px;font-weight:900;box-shadow:0 0 20px rgba(239,68,68,0.3);transition:all 0.2s;">⚔️ START RUSH (1 🎟️)</button>';
        } else {
            html += '<div style="width:100%;padding:14px;background:rgba(30,25,50,0.6);color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;font-size:9px;border:1px solid rgba(100,100,130,0.2);border-radius:8px;text-align:center;">No Tickets — Next free in 8h</div>';
        }

        html += '<button onclick="document.getElementById(\'boss-rush-modal\').remove()" style="width:100%;margin-top:8px;padding:8px;background:none;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;font-size:8px;border:1px solid rgba(100,100,130,0.2);border-radius:6px;cursor:pointer;">CLOSE</button>';
        html += '</div>';
        modal.innerHTML = html;
    }

    window.startBossRush = function() {
        ensureBossRushState();
        if (state.bossRush.tickets <= 0) return;
        state.bossRush.tickets--;
        if (typeof saveProgress === 'function') saveProgress();

        var bosses = getBossPool();
        if (bosses.length === 0) return;

        rushState = {
            round: 1,
            bossHp: 500,
            bossMaxHp: 500,
            bossName: '',
            bossKey: '',
            totalDamage: 0,
            timeLeft: 30,
            active: true
        };

        spawnRushBoss();
        openBossRush();
        startRushTimer();
        startRushAutoAttack();
    };

    function spawnRushBoss() {
        var bosses = getBossPool();
        var boss = bosses[(rushState.round - 1) % bosses.length];
        var baseHp = 500 * Math.pow(1.3, rushState.round - 1);
        rushState.bossHp = Math.round(baseHp);
        rushState.bossMaxHp = rushState.bossHp;
        rushState.bossName = boss.name || boss.key;
        rushState.bossKey = boss.key;
        rushState.timeLeft = 30;
    }

    function startRushTimer() {
        if (rushTimer) clearInterval(rushTimer);
        rushTimer = setInterval(function() {
            if (!rushState || !rushState.active) return;
            rushState.timeLeft -= 0.1;
            if (rushState.timeLeft <= 0) {
                endBossRush();
                return;
            }
            updateRushUI();
        }, 100);
    }

    function startRushAutoAttack() {
        if (rushHpInterval) clearInterval(rushHpInterval);
        rushHpInterval = setInterval(function() {
            if (!rushState || !rushState.active) return;
            
            // Calculate team DPS
            var totalDmg = 0;
            if (typeof state !== 'undefined' && state.roster && state.equipped) {
                for (var key in state.equipped) {
                    if (!state.equipped[key]) continue;
                    var charData = state.roster[key];
                    var cfg = typeof characters !== 'undefined' ? characters[key] : null;
                    if (charData && cfg && charData.level > 0) {
                        totalDmg += cfg.baseDmg * charData.level;
                    }
                }
            }
            if (totalDmg === 0) totalDmg = 50; // fallback

            // Apply damage per tick (10 ticks/sec)
            var dmgTick = totalDmg / 5;
            rushState.bossHp -= dmgTick;
            rushState.totalDamage += dmgTick;

            if (rushState.bossHp <= 0) {
                // Boss defeated! Next round
                rushState.round++;
                spawnRushBoss();
                updateRushUI();
                if (typeof showToast === 'function') showToast('Round ' + (rushState.round - 1) + ' cleared! 💀');
            }
        }, 200);
    }

    function updateRushUI() {
        var modal = document.getElementById('boss-rush-modal');
        if (!modal || !rushState) return;
        renderRushBattle(modal);
    }

    function renderRushBattle(modal) {
        var hpPct = Math.max(0, (rushState.bossHp / rushState.bossMaxHp) * 100);
        var timePct = Math.max(0, (rushState.timeLeft / 30) * 100);
        var timerColor = rushState.timeLeft < 10 ? '#ef4444' : rushState.timeLeft < 20 ? '#f59e0b' : '#22c55e';

        var bossVec = '';
        if (typeof vectors !== 'undefined' && vectors[rushState.bossKey]) {
            bossVec = typeof vectors[rushState.bossKey] === 'string' ? vectors[rushState.bossKey] : (vectors[rushState.bossKey].idle || '');
        }

        var html = '<div style="background:linear-gradient(135deg,rgba(20,5,5,0.97),rgba(40,10,10,0.97));border:2px solid rgba(239,68,68,0.4);border-radius:16px;max-width:380px;width:100%;padding:16px;box-shadow:0 0 60px rgba(239,68,68,0.15);">';
        
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:8px;color:#ef4444;">⚔️ BOSS RUSH</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:#fbbf24;">Round ' + rushState.round + '</div>';
        html += '</div>';

        // Timer bar
        html += '<div style="background:rgba(0,0,0,0.5);border-radius:4px;height:8px;margin-bottom:10px;overflow:hidden;border:1px solid rgba(100,100,130,0.2);">';
        html += '<div style="height:100%;width:' + timePct + '%;background:' + timerColor + ';transition:width 0.1s;border-radius:3px;"></div>';
        html += '</div>';
        html += '<div style="text-align:right;font-size:7px;color:' + timerColor + ';font-family:\'Press Start 2P\',monospace;margin-top:-6px;margin-bottom:8px;">' + Math.ceil(rushState.timeLeft) + 's</div>';

        // Boss display
        html += '<div style="text-align:center;margin-bottom:10px;">';
        if (bossVec) html += '<div style="width:80px;height:80px;margin:0 auto 8px;display:flex;align-items:flex-end;justify-content:center;">' + bossVec + '</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:#fca5a5;">' + rushState.bossName + '</div>';
        html += '</div>';

        // Boss HP bar
        html += '<div style="margin-bottom:12px;">';
        html += '<div style="display:flex;justify-content:space-between;font-size:7px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:3px;"><span>HP</span><span>' + Math.max(0, Math.round(rushState.bossHp)).toLocaleString() + ' / ' + Math.round(rushState.bossMaxHp).toLocaleString() + '</span></div>';
        html += '<div style="background:rgba(0,0,0,0.5);border-radius:4px;height:12px;overflow:hidden;border:1px solid rgba(239,68,68,0.3);">';
        html += '<div style="height:100%;width:' + hpPct + '%;background:linear-gradient(90deg,#ef4444,#dc2626);transition:width 0.2s;border-radius:3px;box-shadow:0 0 8px rgba(239,68,68,0.4);"></div>';
        html += '</div></div>';

        // Total damage
        html += '<div style="text-align:center;font-size:7px;color:rgba(255,255,255,0.3);font-family:\'Press Start 2P\',monospace;">Total Damage: ' + Math.round(rushState.totalDamage).toLocaleString() + '</div>';

        // Manual tap damage
        html += '<button onclick="rushManualTap()" style="width:100%;margin-top:10px;padding:14px;background:linear-gradient(135deg,#dc2626,#991b1b);color:white;font-family:\'Press Start 2P\',monospace;font-size:10px;border:2px solid #ef4444;border-radius:8px;cursor:pointer;text-transform:uppercase;transition:all 0.1s;active:scale(0.95);">⚔️ TAP TO ATTACK!</button>';

        html += '</div>';
        modal.innerHTML = html;
    }

    window.rushManualTap = function() {
        if (!rushState || !rushState.active) return;
        var dmg = 0;
        if (typeof state !== 'undefined' && state.roster && state.equipped) {
            for (var key in state.equipped) {
                if (!state.equipped[key]) continue;
                var charData = state.roster[key];
                var cfg = typeof characters !== 'undefined' ? characters[key] : null;
                if (charData && cfg && charData.level > 0) {
                    dmg += cfg.baseDmg * charData.level * 0.5;
                }
            }
        }
        if (dmg === 0) dmg = 25;
        rushState.bossHp -= dmg;
        rushState.totalDamage += dmg;
        if (rushState.bossHp <= 0) {
            rushState.round++;
            spawnRushBoss();
        }
        updateRushUI();
    };

    function endBossRush() {
        if (!rushState) return;
        rushState.active = false;
        if (rushTimer) { clearInterval(rushTimer); rushTimer = null; }
        if (rushHpInterval) { clearInterval(rushHpInterval); rushHpInterval = null; }

        var rounds = rushState.round - 1;
        var isNewRecord = rounds > (state.bossRush.highScore || 0);
        if (isNewRecord) state.bossRush.highScore = rounds;

        // Calculate rewards
        var coinReward = rounds * 2000;
        var diamondReward = Math.floor(rounds / 3) * 10;
        var stoneReward = rounds * 3;

        if (state.resources) {
            state.resources.coin = (state.resources.coin || 0) + coinReward;
            state.resources.diamond = (state.resources.diamond || 0) + diamondReward;
            state.resources.stone = (state.resources.stone || 0) + stoneReward;
        }
        state.score = (state.score || 0) + coinReward;
        if (typeof saveProgress === 'function') saveProgress();

        // Show results
        var modal = document.getElementById('boss-rush-modal');
        if (modal) {
            var html = '<div style="background:linear-gradient(135deg,rgba(20,5,5,0.97),rgba(40,10,10,0.97));border:2px solid rgba(251,191,36,0.4);border-radius:16px;max-width:380px;width:100%;padding:24px;box-shadow:0 0 60px rgba(251,191,36,0.15);text-align:center;">';
            html += '<div style="font-size:40px;margin-bottom:8px;">' + (isNewRecord ? '🏆' : '💀') + '</div>';
            html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:12px;color:#fbbf24;margin-bottom:4px;">' + (isNewRecord ? 'NEW RECORD!' : 'RUN OVER') + '</div>';
            html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:18px;color:#ef4444;margin-bottom:16px;">Round ' + rounds + '</div>';
            html += '<div style="background:rgba(0,0,0,0.4);border-radius:8px;padding:12px;margin-bottom:16px;text-align:left;">';
            html += '<div style="font-size:8px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:8px;">REWARDS</div>';
            html += '<div style="font-size:9px;color:#fbbf24;margin-bottom:4px;">🪙 ' + coinReward.toLocaleString() + ' Coins</div>';
            if (diamondReward > 0) html += '<div style="font-size:9px;color:#60a5fa;margin-bottom:4px;">💎 ' + diamondReward + ' Diamonds</div>';
            html += '<div style="font-size:9px;color:#a78bfa;">🪨 ' + stoneReward + ' Stone</div>';
            html += '</div>';
            html += '<button onclick="rushState=null;openBossRush()" style="width:100%;padding:12px;background:linear-gradient(135deg,#dc2626,#991b1b);color:white;font-family:\'Press Start 2P\',monospace;font-size:10px;border:2px solid #ef4444;border-radius:8px;cursor:pointer;">BACK TO LOBBY</button>';
            html += '</div>';
            modal.innerHTML = html;
        }

        rushState = null;
    }

    // ═══════════════════════════════════════════════════
    // EQUIPMENT CRAFTING — Combine 3 → 1 higher rarity
    // ═══════════════════════════════════════════════════
    var RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    var RARITY_COLORS = { common: '#9ca3af', uncommon: '#22c55e', rare: '#3b82f6', epic: '#a855f7', legendary: '#f59e0b' };
    var craftSlots = [];

    window.openCraftingModal = function() {
        craftSlots = [];
        var existing = document.getElementById('crafting-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'crafting-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:12px;';
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

        renderCraftingUI(modal);
        document.body.appendChild(modal);
    };

    function renderCraftingUI(modal) {
        if (!modal) modal = document.getElementById('crafting-modal');
        if (!modal) return;

        var canCraft = craftSlots.length >= 3;
        var slotRarity = craftSlots.length > 0 ? craftSlots[0].rarity : null;
        var outputRarity = slotRarity ? RARITY_ORDER[Math.min(RARITY_ORDER.indexOf(slotRarity) + 1, RARITY_ORDER.length - 1)] : null;

        var html = '<div style="background:linear-gradient(135deg,rgba(10,15,30,0.97),rgba(15,20,40,0.97));border:2px solid rgba(168,85,247,0.3);border-radius:16px;max-width:400px;width:100%;padding:20px;box-shadow:0 0 60px rgba(168,85,247,0.1);">';

        html += '<div style="text-align:center;margin-bottom:16px;">';
        html += '<div style="font-size:24px;">⚒️</div>';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:#a855f7;text-transform:uppercase;letter-spacing:2px;">Equipment Forge</div>';
        html += '<div style="font-size:8px;color:rgba(168,85,247,0.5);margin-top:4px;">Combine 3 same-rarity items → 1 higher rarity</div>';
        html += '</div>';

        // Crafting slots
        html += '<div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:16px;">';
        for (var s = 0; s < 3; s++) {
            var item = craftSlots[s];
            var slotBorder = item ? RARITY_COLORS[item.rarity] : 'rgba(100,100,130,0.3)';
            html += '<div style="width:70px;height:70px;background:rgba(0,0,0,0.4);border:2px solid ' + slotBorder + ';border-radius:8px;display:flex;align-items:center;justify-content:center;flex-direction:column;">';
            if (item) {
                html += '<div style="font-size:18px;">' + (item.icon || '⚙️') + '</div>';
                html += '<div style="font-size:6px;color:' + RARITY_COLORS[item.rarity] + ';font-family:\'Press Start 2P\',monospace;margin-top:2px;">' + (item.rarity || '').toUpperCase() + '</div>';
            } else {
                html += '<div style="font-size:10px;color:rgba(100,100,130,0.3);">+</div>';
            }
            html += '</div>';
            if (s < 2) html += '<div style="font-size:14px;color:rgba(255,255,255,0.2);">+</div>';
        }
        html += '<div style="font-size:18px;color:rgba(255,255,255,0.3);margin:0 6px;">→</div>';

        // Output slot
        html += '<div style="width:70px;height:70px;background:rgba(0,0,0,0.4);border:2px solid ' + (canCraft && outputRarity ? RARITY_COLORS[outputRarity] : 'rgba(100,100,130,0.3)') + ';border-radius:8px;display:flex;align-items:center;justify-content:center;flex-direction:column;' + (canCraft ? 'box-shadow:0 0 12px ' + RARITY_COLORS[outputRarity] + '40;' : '') + '">';
        if (canCraft && outputRarity) {
            html += '<div style="font-size:18px;">✨</div>';
            html += '<div style="font-size:6px;color:' + RARITY_COLORS[outputRarity] + ';font-family:\'Press Start 2P\',monospace;margin-top:2px;">' + outputRarity.toUpperCase() + '</div>';
        } else {
            html += '<div style="font-size:10px;color:rgba(100,100,130,0.3);">?</div>';
        }
        html += '</div>';
        html += '</div>';

        // Available equipment to add
        html += '<div style="font-size:7px;color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;margin-bottom:6px;">INVENTORY</div>';
        html += '<div style="max-height:120px;overflow-y:auto;background:rgba(0,0,0,0.3);border-radius:8px;padding:6px;margin-bottom:12px;display:flex;flex-wrap:wrap;gap:4px;">';

        var inv = (state && state.equipment && state.equipment.inventory) ? state.equipment.inventory : [];
        var usedIds = craftSlots.map(function(s) { return s._idx; });
        
        if (inv.length > 0) {
            for (var i = 0; i < inv.length; i++) {
                var eq = inv[i];
                if (!eq || usedIds.includes(i)) continue;
                // Only show items matching first slot's rarity (if any selected)
                if (slotRarity && eq.rarity !== slotRarity) continue;
                if (craftSlots.length >= 3) continue;
                
                var eqColor = RARITY_COLORS[eq.rarity] || '#9ca3af';
                html += '<div onclick="addToCraftSlot(' + i + ')" style="width:50px;height:50px;background:rgba(0,0,0,0.4);border:1px solid ' + eqColor + ';border-radius:6px;display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">';
                html += '<div style="font-size:14px;">' + (eq.icon || '⚙️') + '</div>';
                html += '<div style="font-size:5px;color:' + eqColor + ';font-family:\'Press Start 2P\',monospace;">' + (eq.rarity || '?').substring(0, 4).toUpperCase() + '</div>';
                html += '</div>';
            }
        } else {
            html += '<div style="width:100%;text-align:center;color:rgba(255,255,255,0.2);font-size:8px;padding:20px;">No equipment in inventory</div>';
        }
        html += '</div>';

        // Action buttons
        if (canCraft) {
            html += '<button onclick="executeCraft()" style="width:100%;padding:12px;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;font-family:\'Press Start 2P\',monospace;font-size:10px;border:2px solid #a855f7;border-radius:8px;cursor:pointer;text-transform:uppercase;box-shadow:0 0 20px rgba(168,85,247,0.3);">⚒️ FORGE!</button>';
        }
        html += '<div style="display:flex;gap:6px;margin-top:8px;">';
        html += '<button onclick="craftSlots=[];renderCraftingUI()" style="flex:1;padding:8px;background:rgba(30,25,50,0.6);color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;font-size:7px;border:1px solid rgba(100,100,130,0.2);border-radius:6px;cursor:pointer;">CLEAR</button>';
        html += '<button onclick="document.getElementById(\'crafting-modal\').remove()" style="flex:1;padding:8px;background:rgba(30,25,50,0.6);color:rgba(255,255,255,0.4);font-family:\'Press Start 2P\',monospace;font-size:7px;border:1px solid rgba(100,100,130,0.2);border-radius:6px;cursor:pointer;">CLOSE</button>';
        html += '</div>';

        html += '</div>';
        modal.innerHTML = html;
    }

    window.addToCraftSlot = function(idx) {
        var inv = (state && state.equipment && state.equipment.inventory) ? state.equipment.inventory : [];
        var item = inv[idx];
        if (!item || craftSlots.length >= 3) return;
        if (craftSlots.length > 0 && item.rarity !== craftSlots[0].rarity) return;
        
        var copy = Object.assign({}, item);
        copy._idx = idx;
        craftSlots.push(copy);
        renderCraftingUI();
    };

    window.executeCraft = function() {
        if (craftSlots.length < 3) return;
        var inv = (state && state.equipment && state.equipment.inventory) ? state.equipment.inventory : [];
        var inputRarity = craftSlots[0].rarity;
        var outputRarityIdx = Math.min(RARITY_ORDER.indexOf(inputRarity) + 1, RARITY_ORDER.length - 1);
        var outputRarity = RARITY_ORDER[outputRarityIdx];

        // Remove consumed items (highest index first to avoid shifting)
        var indices = craftSlots.map(function(s) { return s._idx; }).sort(function(a, b) { return b - a; });
        for (var i = 0; i < indices.length; i++) {
            inv.splice(indices[i], 1);
        }

        // Generate random equipment of higher rarity
        var SLOTS = ['weapon', 'armor', 'accessory', 'helmet', 'boots'];
        var ICONS = { weapon: '⚔️', armor: '🛡️', accessory: '💍', helmet: '⛑️', boots: '👢' };
        var slot = SLOTS[Math.floor(Math.random() * SLOTS.length)];
        var powerBase = { common: 10, uncommon: 25, rare: 50, epic: 100, legendary: 200 };
        var power = (powerBase[outputRarity] || 10) + Math.floor(Math.random() * 20);

        var newItem = {
            name: outputRarity.charAt(0).toUpperCase() + outputRarity.slice(1) + ' ' + slot.charAt(0).toUpperCase() + slot.slice(1),
            slot: slot,
            rarity: outputRarity,
            power: power,
            icon: ICONS[slot] || '⚙️',
            stats: { atk: Math.floor(power * 0.6), def: Math.floor(power * 0.4) }
        };

        inv.push(newItem);
        craftSlots = [];
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof showToast === 'function') showToast('Forged: ' + newItem.name + '! ✨');
        renderCraftingUI();
    };

    // ═══════════════════════════════════════════════════
    // CHARACTER PAIR BONUSES — Relationship system
    // ═══════════════════════════════════════════════════
    var PAIR_BONUSES = [
        { pair: ['sheldon', 'amy'], name: 'Shamy', icon: '💕', dmgBonus: 0.15, hpBonus: 0.10 },
        { pair: ['leonard', 'penny'], name: 'Lenny', icon: '💘', dmgBonus: 0.15, hpBonus: 0.10 },
        { pair: ['howard', 'bernie'], name: 'Howadette', icon: '💞', dmgBonus: 0.15, hpBonus: 0.10 },
        { pair: ['raj', 'stuart'], name: 'Roomies', icon: '🏠', dmgBonus: 0.10, hpBonus: 0.10 },
        { pair: ['wil', 'stuart'], name: 'Comic Bros', icon: '📚', dmgBonus: 0.10, hpBonus: 0.05 },
        { pair: ['sheldon', 'leonard'], name: 'Apt 4A', icon: '🚪', dmgBonus: 0.10, hpBonus: 0.08 },
        { pair: ['howard', 'raj'], name: 'BFF\'s', icon: '🤝', dmgBonus: 0.12, hpBonus: 0.08 },
        { pair: ['sheldon', 'mary'], name: 'Moonpie', icon: '🥧', dmgBonus: 0.10, hpBonus: 0.15 },
        { pair: ['leonard', 'beverly'], name: 'Mother Issues', icon: '📖', dmgBonus: 0.08, hpBonus: 0.12 }
    ];

    // Get active pair bonuses based on current formation
    window.getActivePairBonuses = function() {
        if (!state || !state.equipped) return [];
        var equippedKeys = Object.keys(state.equipped).filter(function(k) { return state.equipped[k]; });
        var active = [];
        for (var i = 0; i < PAIR_BONUSES.length; i++) {
            var pb = PAIR_BONUSES[i];
            if (equippedKeys.includes(pb.pair[0]) && equippedKeys.includes(pb.pair[1])) {
                active.push(pb);
            }
        }
        return active;
    };

    // Get pair bonus for a specific character
    window.getPairBonusFor = function(charKey) {
        var active = getActivePairBonuses();
        var bonus = { dmg: 0, hp: 0, pairs: [] };
        for (var i = 0; i < active.length; i++) {
            if (active[i].pair.includes(charKey)) {
                bonus.dmg += active[i].dmgBonus;
                bonus.hp += active[i].hpBonus;
                bonus.pairs.push(active[i]);
            }
        }
        return bonus;
    };

    // Hook into synergy display - add pair bonuses display
    var _origRenderBattle = window.renderActiveBattleLine;
    if (typeof _origRenderBattle === 'function') {
        window.renderActiveBattleLine = function() {
            _origRenderBattle.apply(this, arguments);
            // Add pair icons after render
            setTimeout(function() {
                var activePairs = getActivePairBonuses();
                for (var i = 0; i < activePairs.length; i++) {
                    var pb = activePairs[i];
                    pb.pair.forEach(function(charKey) {
                        var el = document.getElementById('live-character-' + charKey);
                        if (el && !el.querySelector('.pair-badge')) {
                            var badge = document.createElement('div');
                            badge.className = 'pair-badge';
                            badge.textContent = pb.icon;
                            badge.style.cssText = 'position:absolute;top:-20px;right:-4px;font-size:10px;z-index:50;filter:drop-shadow(0 0 4px rgba(251,191,36,0.5));animation:pair-pulse 2s ease-in-out infinite;pointer-events:none;';
                            el.appendChild(badge);
                        }
                    });
                }
            }, 100);
        };
    }

    // Inject CSS
    if (!document.getElementById('boss-rush-css')) {
        var style = document.createElement('style');
        style.id = 'boss-rush-css';
        style.textContent = '@keyframes pair-pulse{0%,100%{transform:scale(1);opacity:0.8;}50%{transform:scale(1.2);opacity:1;}}';
        document.head.appendChild(style);
    }

    // Add Boss Rush + Crafting to More Menu
    setTimeout(function() {
        var moreGrid = document.querySelector('#more-menu-panel .grid, #more-menu-panel [style*="grid"]');
        if (!moreGrid) {
            // Try to find the grid container inside more-menu-panel
            var panel = document.getElementById('more-menu-panel');
            if (panel) moreGrid = panel.querySelector('.flex.flex-wrap, .grid');
        }
        if (moreGrid) {
            // Boss Rush button
            var rushBtn = document.createElement('button');
            rushBtn.className = 'more-grid-btn';
            rushBtn.onclick = function() { openBossRush(); if (typeof toggleMoreMenu === 'function') toggleMoreMenu(); };
            rushBtn.innerHTML = '<span>⚔️</span><span class="more-grid-label">Rush</span>';
            moreGrid.appendChild(rushBtn);

            // Crafting button
            var craftBtn = document.createElement('button');
            craftBtn.className = 'more-grid-btn';
            craftBtn.onclick = function() { openCraftingModal(); if (typeof toggleMoreMenu === 'function') toggleMoreMenu(); };
            craftBtn.innerHTML = '<span>⚒️</span><span class="more-grid-label">Forge</span>';
            moreGrid.appendChild(craftBtn);

            // Daily Login button
            var loginBtn = document.createElement('button');
            loginBtn.className = 'more-grid-btn';
            loginBtn.onclick = function() { if (typeof openDailyLogin === 'function') openDailyLogin(); if (typeof toggleMoreMenu === 'function') toggleMoreMenu(); };
            loginBtn.innerHTML = '<span>📅</span><span class="more-grid-label">Login</span>';
            moreGrid.appendChild(loginBtn);
        }
    }, 2000);

    console.log('[BossRush] Boss Rush mode loaded.');
    console.log('[Crafting] Equipment Forge loaded.');
    console.log('[PairBonus] Character pair bonuses loaded:', PAIR_BONUSES.length, 'pairs defined.');
})();
