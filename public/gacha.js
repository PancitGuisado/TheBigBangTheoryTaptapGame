// ============================================================
// STUART'S COMIC BOOK STORE - Gacha / Pull System (v2)
// Complete overhaul — better prizes, banners, free pulls, transparency
// Standalone module loaded after app_v2.js + config.js
// ============================================================

(function() {

    // ── CONSTANTS ────────────────────────────────────────────
    var SINGLE_COST = 100;
    var MULTI_COST = 900;
    var MULTI_COUNT = 10;
    var PITY_THRESHOLD = 50;

    var STUART_QUOTES = [
        "Welcome to the store... please buy something.",
        "I need this sale more than you know.",
        "Every purchase keeps me one step from bankruptcy.",
        "If you don't buy something, I may have to sell a kidney.",
        "The fluorescent lights are the most exciting thing here.",
        "I've been sleeping in the back. Don't tell anyone.",
        "Business is... well, it's business.",
        "You're my favorite customer. Please don't leave.",
        "I got some new stock in! ...please be excited.",
        "Today's special: everything. I'm desperate."
    ];

    var FOOD_KEYS = ['chinese', 'pizza', 'cupcakes', 'burger', 'tacos', 'indian',
                     'hotdog', 'pretzel', 'smoothie', 'energydrink', 'cheesecake', 'shawarma'];

    var FOOD_EMOJIS = {
        chinese: '🥡', pizza: '🍕', cupcakes: '🧁', burger: '🍔', tacos: '🌮', indian: '🍛',
        hotdog: '🌭', pretzel: '🥨', smoothie: '🥤', energydrink: '⚡', cheesecake: '🍰', shawarma: '🌯'
    };

    var RARITY_CONFIG = {
        common:    { label: 'COMMON',    color: '#9ca3af', border: '#6b7280', bg: 'from-gray-800 to-gray-900',     glow: 'rgba(156,163,175,0.2)', emoji: '📦', chance: '55%' },
        uncommon:  { label: 'UNCOMMON',  color: '#4ade80', border: '#22c55e', bg: 'from-green-900 to-emerald-950', glow: 'rgba(34,197,94,0.3)',   emoji: '📗', chance: '25%' },
        rare:      { label: 'RARE',      color: '#c084fc', border: '#a855f7', bg: 'from-purple-900 to-violet-950', glow: 'rgba(168,85,247,0.4)',  emoji: '💎', chance: '15%' },
        legendary: { label: 'LEGENDARY', color: '#fbbf24', border: '#f59e0b', bg: 'from-amber-900 to-yellow-950',  glow: 'rgba(245,158,11,0.5)',  emoji: '🌟', chance: '5%'  }
    };

    // ── TITLE POOLS ─────────────────────────────────────────
    var LEGENDARY_TITLES = [
        "Stuart's VIP", "Comic Connoisseur", "Bazinga Master",
        "Legendary Collector", "Golden Roller", "Star Gazer",
        "The Chosen Nerd", "Critical Hit King", "Pity Breaker"
    ];

    // ── BANNER SYSTEM ────────────────────────────────────────
    var BANNERS = [
        { id: 'resource_rush',  name: '💰 Resource Rush',   desc: 'All resource rewards DOUBLED!',        color: '#f59e0b', effect: 'doubleResources' },
        { id: 'buff_bonanza',   name: '⏱️ Buff Bonanza',    desc: 'Rare+ guaranteed to include a buff!', color: '#c084fc', effect: 'guaranteeBuff' },
        { id: 'shard_festival', name: '🎫 Shard Festival',  desc: 'Double chance for character shards!',  color: '#22c55e', effect: 'doubleShards' },
        { id: 'lucky_day',      name: '🍀 Lucky Day',       desc: 'Legendary rate boosted to 8%!',        color: '#fbbf24', effect: 'luckyLegendary' }
    ];

    function getCurrentBanner() {
        var dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        var weekOfYear = Math.floor(dayOfYear / 7);
        return BANNERS[weekOfYear % BANNERS.length];
    }

    // ── BUFF DEFINITIONS ─────────────────────────────────────
    var BUFF_TYPES = [
        { id: 'doubleDmg',   name: '2x Damage',      icon: '⚔️', duration: 300, desc: 'All damage doubled for 5 minutes' },
        { id: 'doubleDrops', name: '2x Drops',        icon: '💰', duration: 300, desc: 'All resource drops doubled for 5 minutes' },
        { id: 'critBoost',   name: '+50% Crit',       icon: '🎯', duration: 300, desc: '+50% crit chance for 5 minutes' },
        { id: 'autoHeal',    name: 'Auto-Heal',       icon: '💚', duration: 300, desc: 'Characters auto-heal 2% HP/sec for 5 minutes' }
    ];

    // ── CSS INJECTION ────────────────────────────────────────
    var style = document.createElement('style');
    style.textContent = [
        '@keyframes gachaFadeIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}',
        '@keyframes gachaCardReveal{0%{opacity:0;transform:rotateY(90deg) scale(.7)}60%{opacity:1;transform:rotateY(-5deg) scale(1.06)}100%{transform:rotateY(0) scale(1)}}',
        '@keyframes gachaShine{0%{left:-100%}100%{left:200%}}',
        '@keyframes gachaScreenFlash{0%{opacity:.7}100%{opacity:0}}',
        '@keyframes gachaParticle{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--px),var(--py)) scale(0)}}',
        '@keyframes gachaFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}',
        '@keyframes gachaPulse{0%,100%{box-shadow:0 0 10px var(--glow)}50%{box-shadow:0 0 25px var(--glow)}}',
        '@keyframes gachaQuoteSwap{0%{opacity:0;transform:translateY(6px)}15%{opacity:1;transform:translateY(0)}85%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-6px)}}',
        '@keyframes gachaPityGlow{0%,100%{box-shadow:0 0 8px rgba(251,191,36,0.3)}50%{box-shadow:0 0 20px rgba(251,191,36,0.7)}}',
        '@keyframes gachaBannerSlide{from{transform:translateX(-5px);opacity:0}to{transform:translateX(0);opacity:1}}',
        '@keyframes gachaFreePulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}',
        '.gacha-card{animation:gachaCardReveal .5s cubic-bezier(.34,1.56,.64,1) forwards;opacity:0;perspective:800px}',
        '.gacha-shine{position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);animation:gachaShine .8s ease .4s}',
        '.gacha-flash{position:fixed;inset:0;background:#fbbf24;z-index:200001;pointer-events:none;animation:gachaScreenFlash .6s ease-out forwards}',
        '.gacha-particle{position:absolute;width:6px;height:6px;border-radius:50%;animation:gachaParticle .8s ease-out forwards;pointer-events:none}',
        '.gacha-btn{transition:all .15s ease}.gacha-btn:hover{transform:translateY(-2px);filter:brightness(1.15)}.gacha-btn:active{transform:translateY(0);filter:brightness(.9)}',
        '.gacha-quote{animation:gachaQuoteSwap 5s ease-in-out infinite}',
        '.gacha-pity-near{animation:gachaPityGlow 1.5s ease-in-out infinite}',
        '.gacha-banner{animation:gachaBannerSlide .4s ease-out}',
        '.gacha-free-pulse{animation:gachaFreePulse 2s ease-in-out infinite}'
    ].join('\n');
    document.head.appendChild(style);

    // ── STATE INITIALIZATION ─────────────────────────────────
    if (!state.gacha) state.gacha = { pity: 0, totalPulls: 0, history: [] };
    if (state.gacha.pity === undefined) state.gacha.pity = 0;
    if (state.gacha.totalPulls === undefined) state.gacha.totalPulls = 0;
    if (!state.gacha.history) state.gacha.history = [];
    if (state.gacha.lastFreePull === undefined) state.gacha.lastFreePull = 0;
    if (!state.gacha.titles) state.gacha.titles = [];
    if (!state.gacha.buffs) state.gacha.buffs = [];

    // ── UTILITY HELPERS ──────────────────────────────────────
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomFood() {
        return FOOD_KEYS[Math.floor(Math.random() * FOOD_KEYS.length)];
    }

    function fmtNum(n) {
        return typeof formatNumber === 'function' ? formatNumber(n) : n.toLocaleString();
    }

    function isSameDay(ts1, ts2) {
        var d1 = new Date(ts1);
        var d2 = new Date(ts2);
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    function hasFreePull() {
        return !isSameDay(state.gacha.lastFreePull, Date.now());
    }

    function getCharacterKeys() {
        if (typeof characters === 'undefined') return [];
        return Object.keys(characters);
    }

    // ── LOOT GENERATION (v2) ─────────────────────────────────
    function rollRarity(forceLegendary) {
        if (forceLegendary) return 'legendary';
        var banner = getCurrentBanner();
        var legendaryChance = (banner.effect === 'luckyLegendary') ? 8 : 5;
        var roll = Math.random() * 100;
        if (roll < legendaryChance) return 'legendary';
        if (roll < legendaryChance + 15) return 'rare';
        if (roll < legendaryChance + 15 + 25) return 'uncommon';
        return 'common';
    }

    function generateLoot(rarity) {
        var items = [];
        var banner = getCurrentBanner();
        var resourceMulti = (banner.effect === 'doubleResources') ? 2 : 1;
        var shardChance = (banner.effect === 'doubleShards') ? 0.6 : 0.3;

        switch (rarity) {
            case 'common':
                items.push({ type: 'money', icon: '💰', name: 'Money', qty: rand(50, 150) * resourceMulti });
                items.push({ type: 'stone', icon: '🪨', name: 'Stone', qty: rand(8, 20) * resourceMulti });
                items.push({ type: 'iron',  icon: '⚙️', name: 'Iron',  qty: rand(8, 20) * resourceMulti });
                var f1 = randomFood();
                items.push({ type: 'food', icon: FOOD_EMOJIS[f1] || '🍽️', name: f1.charAt(0).toUpperCase() + f1.slice(1), qty: rand(2, 4), foodKey: f1 });
                break;

            case 'uncommon':
                items.push({ type: 'money',   icon: '💰', name: 'Money',   qty: rand(150, 400) * resourceMulti });
                items.push({ type: 'diamond', icon: '💎', name: 'Diamond', qty: rand(2, 5) * resourceMulti });
                items.push({ type: 'scrap',   icon: '🔩', name: 'Scrap',   qty: rand(15, 40) * resourceMulti });
                if (Math.random() < 0.4) {
                    items.push({ type: 'xpBoost', icon: '⚡', name: 'XP Boost', qty: 1, desc: '+1 Level to random character' });
                } else {
                    for (var fc = 0; fc < 3; fc++) {
                        var fk = randomFood();
                        items.push({ type: 'food', icon: FOOD_EMOJIS[fk] || '🍽️', name: fk.charAt(0).toUpperCase() + fk.slice(1), qty: rand(3, 6), foodKey: fk });
                    }
                }
                break;

            case 'rare':
                items.push({ type: 'money',   icon: '💰', name: 'Money',   qty: rand(300, 800) * resourceMulti });
                items.push({ type: 'diamond', icon: '💎', name: 'Diamond', qty: rand(5, 15) * resourceMulti });
                var giveBuff = (banner.effect === 'guaranteeBuff') || (Math.random() < 0.5);
                if (giveBuff) {
                    var buff = BUFF_TYPES[Math.floor(Math.random() * BUFF_TYPES.length)];
                    items.push({ type: 'buff', icon: buff.icon, name: buff.name, qty: 1, buffId: buff.id, buffDuration: buff.duration, desc: buff.desc });
                }
                if (Math.random() < shardChance) {
                    var charKeys = getCharacterKeys();
                    if (charKeys.length > 0) {
                        var shardChar = charKeys[Math.floor(Math.random() * charKeys.length)];
                        var charName = (typeof characters !== 'undefined' && characters[shardChar]) ? characters[shardChar].name : shardChar;
                        var isOwned = state.roster && state.roster[shardChar];
                        items.push({
                            type: 'shard', icon: '🎫', name: charName + ' Shard',
                            qty: rand(1, 3), charKey: shardChar, owned: !!isOwned,
                            desc: isOwned ? 'Converts to 50 diamonds each' : 'Collect 10 to unlock!'
                        });
                    }
                }
                items.push({ type: 'scrap', icon: '🔩', name: 'Scrap', qty: rand(20, 50) * resourceMulti });
                break;

            case 'legendary':
                items.push({ type: 'money',   icon: '💰', name: 'Money',   qty: rand(1000, 3000) * resourceMulti });
                items.push({ type: 'diamond', icon: '💎', name: 'Diamond', qty: rand(15, 30) * resourceMulti });
                items.push({ type: 'scrap',   icon: '🔩', name: 'Scrap',   qty: rand(50, 100) * resourceMulti });
                items.push({ type: 'bazinga', icon: '⚡', name: 'Bazinga Pt', qty: 1 });
                var availTitles = LEGENDARY_TITLES.filter(function(t) { return state.gacha.titles.indexOf(t) === -1; });
                if (availTitles.length > 0) {
                    var title = availTitles[Math.floor(Math.random() * availTitles.length)];
                    items.push({ type: 'title', icon: '🏷️', name: title, qty: 1, desc: 'Exclusive title unlocked!' });
                }
                for (var gf = 0; gf < FOOD_KEYS.length; gf++) {
                    items.push({ type: 'food', icon: FOOD_EMOJIS[FOOD_KEYS[gf]] || '🍽️', name: FOOD_KEYS[gf].charAt(0).toUpperCase() + FOOD_KEYS[gf].slice(1), qty: 5, foodKey: FOOD_KEYS[gf] });
                }
                var lBuff = BUFF_TYPES[Math.floor(Math.random() * BUFF_TYPES.length)];
                items.push({ type: 'buff', icon: lBuff.icon, name: lBuff.name, qty: 1, buffId: lBuff.id, buffDuration: lBuff.duration, desc: lBuff.desc });
                break;
        }

        return items;
    }

    // ── APPLY REWARDS ────────────────────────────────────────
    function applyRewards(items) {
        items.forEach(function(item) {
            switch (item.type) {
                case 'money':
                    state.resources.money = (state.resources.money || 0) + item.qty;
                    if (state.stats) state.stats.moneyEarned = (state.stats.moneyEarned || 0) + item.qty;
                    break;
                case 'stone':
                    state.resources.stone = (state.resources.stone || 0) + item.qty;
                    break;
                case 'iron':
                    state.resources.iron = (state.resources.iron || 0) + item.qty;
                    break;
                case 'scrap':
                    state.resources.scrap = (state.resources.scrap || 0) + item.qty;
                    break;
                case 'diamond':
                    state.resources.diamond = (state.resources.diamond || 0) + item.qty;
                    break;
                case 'gold':
                    state.resources.gold = (state.resources.gold || 0) + item.qty;
                    break;
                case 'food':
                    if (item.foodKey && state.food) {
                        state.food[item.foodKey] = (state.food[item.foodKey] || 0) + item.qty;
                    }
                    break;
                case 'bazinga':
                    state.bazingaPoints = (state.bazingaPoints || 0) + item.qty;
                    break;
                case 'xpBoost':
                    applyXpBoost();
                    break;
                case 'buff':
                    applyBuff(item.buffId, item.buffDuration);
                    break;
                case 'shard':
                    if (item.owned) {
                        state.resources.diamond = (state.resources.diamond || 0) + (item.qty * 50);
                    } else {
                        if (!state.gacha.shards) state.gacha.shards = {};
                        state.gacha.shards[item.charKey] = (state.gacha.shards[item.charKey] || 0) + item.qty;
                        if (state.gacha.shards[item.charKey] >= 10) {
                            unlockCharFromShards(item.charKey);
                        }
                    }
                    break;
                case 'title':
                    if (state.gacha.titles.indexOf(item.name) === -1) {
                        state.gacha.titles.push(item.name);
                    }
                    if (!state.activeTitle) {
                        state.activeTitle = item.name;
                    }
                    break;
            }
        });
    }

    function applyXpBoost() {
        if (!state.equipped || !state.roster) return;
        var equippedKeys = [];
        for (var k in state.equipped) {
            if (state.equipped[k] && state.roster[k]) equippedKeys.push(k);
        }
        if (equippedKeys.length === 0) {
            for (var rk in state.roster) {
                if (state.roster[rk]) { equippedKeys.push(rk); break; }
            }
        }
        if (equippedKeys.length === 0) return;
        var target = equippedKeys[Math.floor(Math.random() * equippedKeys.length)];
        state.roster[target].level = (state.roster[target].level || 1) + 1;
        if (typeof characters !== 'undefined' && characters[target]) {
            var cfg = characters[target];
            var lvl = state.roster[target].level;
            var hpGrowth = cfg.lane === 'front' ? 1.40 : 1.25;
            state.roster[target].maxHp = Math.floor((cfg.baseHp || 100) * Math.pow(hpGrowth, lvl - 1));
            state.roster[target].currentHp = state.roster[target].maxHp;
        }
    }

    function applyBuff(buffId, duration) {
        if (!state.gacha.activeBuffs) state.gacha.activeBuffs = [];
        state.gacha.activeBuffs = state.gacha.activeBuffs.filter(function(b) { return b.id !== buffId; });
        state.gacha.activeBuffs.push({
            id: buffId,
            expires: Date.now() + (duration * 1000)
        });
        var buff = BUFF_TYPES.find(function(b) { return b.id === buffId; });
        if (buff && typeof showGameAlert === 'function') {
            showGameAlert(buff.icon + ' Buff Activated!', buff.desc + '<br><span class="text-amber-400 text-[9px]">Duration: ' + Math.floor(duration / 60) + ' minutes</span>');
        }
    }

    function unlockCharFromShards(charKey) {
        if (!state.roster) state.roster = {};
        if (state.roster[charKey]) return;
        state.roster[charKey] = { level: 1, currentHp: 100, maxHp: 100 };
        if (typeof characters !== 'undefined' && characters[charKey]) {
            var cfg = characters[charKey];
            state.roster[charKey].maxHp = cfg.baseHp || 100;
            state.roster[charKey].currentHp = cfg.baseHp || 100;
        }
        if (!state.gacha.shards) state.gacha.shards = {};
        state.gacha.shards[charKey] = 0;
        if (state.stats) state.stats.charactersHired = (state.stats.charactersHired || 0) + 1;
        if (typeof showGameAlert === 'function') {
            var name = (typeof characters !== 'undefined' && characters[charKey]) ? characters[charKey].name : charKey;
            showGameAlert('🎉 Character Unlocked!', 'You collected 10 shards and unlocked <span class="text-amber-400 font-bold">' + name + '</span>!');
        }
    }

    // Check if a gacha buff is active (exposed globally for combat system)
    window.isGachaBuffActive = function(buffId) {
        if (!state.gacha || !state.gacha.activeBuffs) return false;
        var now = Date.now();
        for (var i = 0; i < state.gacha.activeBuffs.length; i++) {
            if (state.gacha.activeBuffs[i].id === buffId && state.gacha.activeBuffs[i].expires > now) {
                return true;
            }
        }
        return false;
    };

    // ── PULL LOGIC ───────────────────────────────────────────
    function doPull(count) {
        var results = [];
        var guaranteeRarePlus = count >= MULTI_COUNT;
        var hasRarePlus = false;

        for (var i = 0; i < count; i++) {
            var forceLegendary = state.gacha.pity >= PITY_THRESHOLD - 1;
            var rarity = rollRarity(forceLegendary);

            if (rarity === 'legendary') {
                state.gacha.pity = 0;
            } else {
                state.gacha.pity++;
            }

            if (rarity === 'rare' || rarity === 'legendary') hasRarePlus = true;

            var loot = generateLoot(rarity);
            results.push({ rarity: rarity, items: loot });

            state.gacha.totalPulls++;
        }

        if (guaranteeRarePlus && !hasRarePlus) {
            for (var j = results.length - 1; j >= 0; j--) {
                if (results[j].rarity === 'common' || results[j].rarity === 'uncommon') {
                    results[j].rarity = 'rare';
                    results[j].items = generateLoot('rare');
                    break;
                }
            }
        }

        results.forEach(function(r) {
            applyRewards(r.items);
        });

        results.forEach(function(r) {
            state.gacha.history.unshift({
                rarity: r.rarity,
                items: r.items.map(function(it) { return it.icon + ' ' + it.name + ' x' + it.qty; }),
                time: Date.now()
            });
        });
        state.gacha.history = state.gacha.history.slice(0, 30);

        if (typeof trackDailyMission === 'function') {
            trackDailyMission('do_pulls', count);
        }

        if (typeof saveProgress === 'function') saveProgress();

        return results;
    }

    // ── OPEN COMIC STORE MODAL ───────────────────────────────
    function openComicStore() {
        var existing = document.getElementById('gacha-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'gacha-modal';
        modal.className = 'fixed inset-0 z-[99999] flex items-center justify-center p-2';
        modal.style.cssText = 'background:rgba(0,0,0,0.93);backdrop-filter:blur(8px);animation:gachaFadeIn .3s ease';

        renderStore(modal);
        document.body.appendChild(modal);

        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeGachaModal();
        });

        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) {
            try { SoundManager.playFX('click'); } catch(e) {}
        }

        startQuoteRotation(modal);
    }
    window.openComicStore = openComicStore;

    function closeGachaModal() {
        var modal = document.getElementById('gacha-modal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.97)';
            modal.style.transition = 'all .2s ease';
            setTimeout(function() { modal.remove(); }, 200);
        }
    }

    // ── RENDER STORE VIEW ────────────────────────────────────
    function renderStore(modal) {
        var pullsUntilLegendary = Math.max(0, PITY_THRESHOLD - state.gacha.pity);
        var pityPct = Math.min(100, Math.round((state.gacha.pity / PITY_THRESHOLD) * 100));
        var pityNear = pullsUntilLegendary <= 5;
        var banner = getCurrentBanner();
        var freePullAvailable = hasFreePull();

        var stuartSvg = '';
        if (typeof vectors !== 'undefined' && vectors.stuart) {
            var stuartSvgStr = typeof vectors.stuart === 'string' ? vectors.stuart : (vectors.stuart.idle || vectors.stuart.default || '');
            stuartSvg = '<div class="w-12 h-12 flex-shrink-0">' + stuartSvgStr + '</div>';
        }

        // Build active buffs display
        var activeBuffsHtml = '';
        if (state.gacha.activeBuffs && state.gacha.activeBuffs.length > 0) {
            var now = Date.now();
            var activeOnes = state.gacha.activeBuffs.filter(function(b) { return b.expires > now; });
            if (activeOnes.length > 0) {
                activeBuffsHtml = '<div class="flex gap-1 mt-1">';
                activeOnes.forEach(function(ab) {
                    var buff = BUFF_TYPES.find(function(b) { return b.id === ab.id; });
                    if (buff) {
                        var secsLeft = Math.floor((ab.expires - now) / 1000);
                        var minsLeft = Math.floor(secsLeft / 60);
                        var timeStr = minsLeft > 0 ? minsLeft + 'm' : secsLeft + 's';
                        activeBuffsHtml += '<span class="text-[7px] px-1.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-700/40 text-emerald-300 font-bold">' + buff.icon + ' ' + timeStr + '</span>';
                    }
                });
                activeBuffsHtml += '</div>';
            }
        }

        modal.innerHTML = '<div class="w-full max-w-lg max-h-[90vh] flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-amber-500/40 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.2)]" onclick="event.stopPropagation()">' +

            // Banner strip
            '<div class="gacha-banner px-3 py-1.5 flex items-center justify-between" style="background:linear-gradient(90deg,' + banner.color + '22,' + banner.color + '08);border-bottom:1px solid ' + banner.color + '40">' +
                '<div class="flex items-center gap-1.5">' +
                    '<span class="text-[10px] font-black uppercase tracking-wider" style="color:' + banner.color + '">' + banner.name + '</span>' +
                    '<span class="text-[8px] text-gray-400">' + banner.desc + '</span>' +
                '</div>' +
                '<button onclick="toggleGachaDropRates()" class="text-[8px] text-gray-500 hover:text-white font-bold px-1.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/40 cursor-pointer transition-colors">📊 Rates</button>' +
            '</div>' +

            // Header
            '<div class="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b-2 border-amber-700/50 p-3 shrink-0">' +
                '<div class="flex justify-between items-center">' +
                    '<h2 class="text-amber-400 font-black text-xs tracking-[0.15em] uppercase" style="text-shadow:0 0 12px rgba(245,158,11,.4)">🎰 STUART\'S COMIC STORE</h2>' +
                    '<button onclick="document.getElementById(\'gacha-modal\').remove()" class="text-gray-500 hover:text-white text-xl leading-none px-2 transition-colors cursor-pointer">&times;</button>' +
                '</div>' +
                '<div class="flex items-center gap-2 mt-2 bg-black/40 rounded-lg p-2 border border-amber-900/30">' +
                    stuartSvg +
                    '<div class="flex-1">' +
                        '<p id="gacha-stuart-quote" class="gacha-quote text-[10px] text-amber-200/70 italic leading-snug">"' + STUART_QUOTES[0] + '"</p>' +
                        activeBuffsHtml +
                    '</div>' +
                '</div>' +
            '</div>' +

            // Drop rates panel (hidden by default)
            '<div id="gacha-rates-panel" class="hidden bg-black/60 border-b border-slate-800/50 p-3">' +
                '<div class="grid grid-cols-2 gap-2 text-[8px]">' +
                    buildDropRateCard('common') +
                    buildDropRateCard('uncommon') +
                    buildDropRateCard('rare') +
                    buildDropRateCard('legendary') +
                '</div>' +
                '<div class="text-[7px] text-gray-600 text-center mt-2">Pity: Guaranteed 🌟 every ' + PITY_THRESHOLD + ' pulls</div>' +
            '</div>' +

            // Balance & Pity
            '<div class="p-3 bg-black/30 border-b border-slate-800/50 shrink-0">' +
                '<div class="flex justify-between items-center">' +
                    '<div class="flex items-center gap-2">' +
                        '<span class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Balance:</span>' +
                        '<span class="text-amber-400 font-black text-sm" style="text-shadow:0 0 8px rgba(245,158,11,.3)">💰 ' + fmtNum(state.resources.money || 0) + '</span>' +
                    '</div>' +
                    '<div class="text-[9px] text-gray-500 font-bold">Total pulls: ' + fmtNum(state.gacha.totalPulls) + '</div>' +
                '</div>' +
                // Pity progress bar
                '<div class="mt-2 ' + (pityNear ? 'gacha-pity-near' : '') + '" style="--glow:rgba(251,191,36,0.4)">' +
                    '<div class="flex items-center justify-between mb-1">' +
                        '<span class="text-[8px] text-purple-400 font-bold uppercase tracking-wider">🌟 Legendary Pity</span>' +
                        '<span class="text-[9px] font-black ' + (pityNear ? 'text-amber-400' : 'text-purple-300') + '">' + state.gacha.pity + '/' + PITY_THRESHOLD + (pityNear ? ' — CLOSE!' : '') + '</span>' +
                    '</div>' +
                    '<div class="h-2 bg-slate-800 rounded-full overflow-hidden">' +
                        '<div class="h-full rounded-full transition-all duration-500 ' + (pityNear ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-gradient-to-r from-purple-700 to-purple-500') + '" style="width:' + pityPct + '%"></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            // Pull buttons
            '<div class="p-3 flex gap-2 shrink-0">' +
                (freePullAvailable ?
                    '<button id="gacha-free-btn" class="gacha-btn gacha-free-pulse flex-1 bg-gradient-to-b from-emerald-700 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 border-2 border-emerald-400 rounded-xl p-3 text-center cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]">' +
                        '<div class="text-[10px] text-emerald-200 font-bold uppercase tracking-wider mb-1">🎁 Free Pull!</div>' +
                        '<div class="text-white font-black text-sm">🎴 x1</div>' +
                        '<div class="text-emerald-300 font-bold text-[10px] mt-1">Daily Gift</div>' +
                    '</button>'
                : '') +
                '<button id="gacha-single-btn" class="gacha-btn flex-1 bg-gradient-to-b from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-2 border-slate-500 rounded-xl p-3 text-center cursor-pointer">' +
                    '<div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Single Pull</div>' +
                    '<div class="text-white font-black text-sm">🎴 x1</div>' +
                    '<div class="text-amber-400 font-bold text-[11px] mt-1">💰 ' + fmtNum(SINGLE_COST) + '</div>' +
                '</button>' +
                '<button id="gacha-multi-btn" class="gacha-btn flex-1 bg-gradient-to-b from-purple-800 to-purple-950 hover:from-purple-700 hover:to-purple-900 border-2 border-purple-500 rounded-xl p-3 text-center cursor-pointer shadow-[0_0_20px_rgba(139,92,246,0.2)]">' +
                    '<div class="text-[10px] text-purple-300 font-bold uppercase tracking-wider mb-1">Multi Pull</div>' +
                    '<div class="text-white font-black text-sm">🎴 x10</div>' +
                    '<div class="text-amber-400 font-bold text-[11px] mt-1">💰 ' + fmtNum(MULTI_COST) + '</div>' +
                    '<div class="text-[8px] text-emerald-400 font-bold mt-0.5">✨ GUARANTEED RARE+</div>' +
                '</button>' +
            '</div>' +

            // Results area
            '<div id="gacha-results" class="flex-1 overflow-y-auto p-2" style="scrollbar-width:thin;scrollbar-color:#4c1d95 transparent;min-height:100px"></div>' +

            // History toggle
            '<div class="shrink-0 border-t border-slate-800/50">' +
                '<button id="gacha-history-toggle" class="w-full py-2 text-[9px] text-gray-500 font-bold uppercase tracking-widest hover:text-gray-300 transition-colors text-center cursor-pointer">📜 PULL HISTORY ▼</button>' +
                '<div id="gacha-history-panel" class="hidden max-h-[140px] overflow-y-auto p-2 bg-black/40" style="scrollbar-width:thin;scrollbar-color:#374151 transparent"></div>' +
            '</div>' +

        '</div>';

        // Bind pull buttons
        setTimeout(function() {
            var freeBtn   = document.getElementById('gacha-free-btn');
            var singleBtn = document.getElementById('gacha-single-btn');
            var multiBtn  = document.getElementById('gacha-multi-btn');
            var histToggle = document.getElementById('gacha-history-toggle');

            if (freeBtn)   freeBtn.addEventListener('click', function() { handleFreePull(); });
            if (singleBtn) singleBtn.addEventListener('click', function() { handlePull(1); });
            if (multiBtn)  multiBtn.addEventListener('click', function() { handlePull(MULTI_COUNT); });
            if (histToggle) histToggle.addEventListener('click', toggleHistory);

            renderHistory();
        }, 50);
    }

    // ── DROP RATE CARD BUILDER ────────────────────────────────
    function buildDropRateCard(rarity) {
        var cfg = RARITY_CONFIG[rarity];
        var contents = {
            common:    'Money, Stone, Iron, Food',
            uncommon:  'Money, Diamond, Scrap, XP Boost OR Food Crate',
            rare:      'Money, Diamond, Scrap, Buff, Character Shard',
            legendary: 'Money, Diamond, Scrap, 1 BP, Title, All Foods, Buff'
        };
        return '<div class="p-1.5 rounded border" style="border-color:' + cfg.border + '30;background:' + cfg.border + '10">' +
            '<div class="flex items-center justify-between mb-0.5">' +
                '<span class="font-black" style="color:' + cfg.color + '">' + cfg.emoji + ' ' + cfg.label + '</span>' +
                '<span class="font-black text-white">' + cfg.chance + '</span>' +
            '</div>' +
            '<div class="text-gray-400 leading-tight" style="font-size:7px">' + contents[rarity] + '</div>' +
        '</div>';
    }

    window.toggleGachaDropRates = function() {
        var panel = document.getElementById('gacha-rates-panel');
        if (panel) panel.classList.toggle('hidden');
    };

    // ── HANDLE FREE PULL ─────────────────────────────────────
    function handleFreePull() {
        if (!hasFreePull()) {
            if (typeof showGameAlert === 'function') {
                showGameAlert('Already Claimed', 'You already used your free pull today!<br><br><span class="text-gray-500 text-[9px]">Come back tomorrow!</span>');
            }
            return;
        }

        state.gacha.lastFreePull = Date.now();

        disablePullButtons();

        var results = doPull(1);

        showPullAnimation(results, function() {
            enablePullButtons();
            var modal = document.getElementById('gacha-modal');
            if (modal) renderStore(modal);
        });
    }

    // ── HANDLE PAID PULL ─────────────────────────────────────
    function handlePull(count) {
        var cost = count === 1 ? SINGLE_COST : MULTI_COST;

        if ((state.resources.money || 0) < cost) {
            if (typeof showGameAlert === 'function') {
                showGameAlert('Insufficient Funds', 'You need 💰 ' + fmtNum(cost) + ' but only have 💰 ' + fmtNum(state.resources.money || 0) + '.<br><br><span class="text-gray-500 text-[9px]">Stuart weeps silently.</span>');
            }
            return;
        }

        state.resources.money -= cost;
        if (state.stats) state.stats.moneySpent = (state.stats.moneySpent || 0) + cost;

        disablePullButtons();

        var results = doPull(count);

        showPullAnimation(results, function() {
            enablePullButtons();
            var modal = document.getElementById('gacha-modal');
            if (modal) renderStore(modal);
        });
    }

    function disablePullButtons() {
        var btns = ['gacha-free-btn', 'gacha-single-btn', 'gacha-multi-btn'];
        btns.forEach(function(id) {
            var b = document.getElementById(id);
            if (b) { b.disabled = true; b.style.opacity = '0.5'; b.style.pointerEvents = 'none'; }
        });
    }

    function enablePullButtons() {
        var btns = ['gacha-free-btn', 'gacha-single-btn', 'gacha-multi-btn'];
        btns.forEach(function(id) {
            var b = document.getElementById(id);
            if (b) { b.disabled = false; b.style.opacity = '1'; b.style.pointerEvents = 'auto'; }
        });
    }

    // ── PULL ANIMATION ───────────────────────────────────────
    function showPullAnimation(results, onComplete) {
        var container = document.getElementById('gacha-results');
        if (!container) { onComplete(); return; }

        container.innerHTML = '<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 p-1" id="gacha-cards-grid"></div>';
        var grid = document.getElementById('gacha-cards-grid');

        var hasLegendary = results.some(function(r) { return r.rarity === 'legendary'; });

        if (hasLegendary) {
            var flash = document.createElement('div');
            flash.className = 'gacha-flash';
            document.body.appendChild(flash);
            setTimeout(function() { flash.remove(); }, 700);
        }

        results.forEach(function(result, idx) {
            setTimeout(function() {
                var card = buildCardElement(result);
                grid.appendChild(card);

                if (result.rarity === 'legendary') {
                    spawnParticles(card);
                }

                if (typeof SoundManager !== 'undefined' && SoundManager.playFX) {
                    try { SoundManager.playFX('click'); } catch(e) {}
                }

                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                if (idx === results.length - 1) {
                    setTimeout(onComplete, 1200);
                }
            }, idx * 300);
        });
    }

    function buildCardElement(result) {
        var cfg = RARITY_CONFIG[result.rarity] || RARITY_CONFIG.common;

        var card = document.createElement('div');
        card.className = 'gacha-card relative rounded-xl overflow-hidden';
        card.style.cssText = 'border:2px solid ' + cfg.border + ';--glow:' + cfg.glow + ';animation-delay:0s;box-shadow:0 0 15px ' + cfg.glow;

        var consolidated = consolidateItems(result.items);

        var itemsHtml = '';
        consolidated.forEach(function(item) {
            var descHtml = item.desc ? '<div class="text-[7px] text-gray-500 italic">' + item.desc + '</div>' : '';
            itemsHtml += '<div class="py-0.5">' +
                '<div class="flex items-center gap-1">' +
                    '<span class="text-xs">' + item.icon + '</span>' +
                    '<span class="text-[9px] text-gray-300 font-bold flex-1 truncate">' + item.name + '</span>' +
                    '<span class="text-[10px] font-black" style="color:' + cfg.color + '">x' + item.qty + '</span>' +
                '</div>' +
                descHtml +
            '</div>';
        });

        card.innerHTML = '<div class="bg-gradient-to-b ' + cfg.bg + ' p-2">' +
            '<div class="text-center mb-1.5">' +
                '<span class="text-[8px] font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded-full" style="color:' + cfg.color + ';background:rgba(0,0,0,.5);border:1px solid ' + cfg.border + '">' + cfg.emoji + ' ' + cfg.label + '</span>' +
            '</div>' +
            '<div class="space-y-0">' + itemsHtml + '</div>' +
        '</div>' +
        (result.rarity === 'rare' || result.rarity === 'legendary' ? '<div class="gacha-shine"></div>' : '');

        return card;
    }

    function consolidateItems(items) {
        var consolidated = [];
        var foodCount = 0;
        var foodNames = [];
        items.forEach(function(item) {
            if (item.type === 'food') {
                foodCount += item.qty;
                if (foodNames.indexOf(item.icon) === -1) foodNames.push(item.icon);
            } else {
                consolidated.push(item);
            }
        });
        if (foodCount > 0) {
            var foodLabel = foodNames.length > 4 ? '🍱 Food Crate' : foodNames.join('') + ' Food';
            consolidated.push({ type: 'food', icon: '🍱', name: foodLabel, qty: foodCount });
        }
        return consolidated;
    }

    function spawnParticles(card) {
        var colors = ['#fbbf24', '#f59e0b', '#fcd34d', '#fef08a', '#ffffff', '#c084fc'];
        for (var i = 0; i < 16; i++) {
            var p = document.createElement('div');
            p.className = 'gacha-particle';
            var angle = (Math.PI * 2 * i) / 16;
            var dist = 40 + Math.random() * 50;
            p.style.cssText = 'background:' + colors[Math.floor(Math.random() * colors.length)] +
                ';left:50%;top:50%;--px:' + Math.round(Math.cos(angle) * dist) + 'px;--py:' + Math.round(Math.sin(angle) * dist) + 'px;' +
                'animation-delay:' + (Math.random() * 0.2) + 's;width:' + (4 + Math.random() * 4) + 'px;height:' + (4 + Math.random() * 4) + 'px';
            card.appendChild(p);
        }
    }

    // ── HISTORY ──────────────────────────────────────────────
    function toggleHistory() {
        var panel = document.getElementById('gacha-history-panel');
        var toggle = document.getElementById('gacha-history-toggle');
        if (!panel) return;

        if (panel.classList.contains('hidden')) {
            panel.classList.remove('hidden');
            renderHistory();
            if (toggle) toggle.textContent = '📜 PULL HISTORY ▲';
        } else {
            panel.classList.add('hidden');
            if (toggle) toggle.textContent = '📜 PULL HISTORY ▼';
        }
    }

    function renderHistory() {
        var panel = document.getElementById('gacha-history-panel');
        if (!panel) return;

        var history = state.gacha.history || [];
        if (history.length === 0) {
            panel.innerHTML = '<p class="text-[9px] text-gray-600 text-center py-3 uppercase tracking-wider">No pulls yet. Try your luck!</p>';
            return;
        }

        var html = '';
        history.forEach(function(entry) {
            var cfg = RARITY_CONFIG[entry.rarity] || RARITY_CONFIG.common;
            var timeAgo = getTimeAgo(entry.time);
            html += '<div class="flex items-center gap-2 py-1 border-b border-slate-800/40">' +
                '<span class="text-[8px] font-black px-1.5 py-0.5 rounded" style="color:' + cfg.color + ';background:rgba(0,0,0,.4);border:1px solid ' + cfg.border + '30">' + cfg.label + '</span>' +
                '<span class="text-[8px] text-gray-400 flex-1 truncate">' + entry.items.join(', ') + '</span>' +
                '<span class="text-[7px] text-gray-600 shrink-0">' + timeAgo + '</span>' +
            '</div>';
        });

        panel.innerHTML = html;
    }

    function getTimeAgo(timestamp) {
        if (!timestamp) return '';
        var diff = Math.floor((Date.now() - timestamp) / 1000);
        if (diff < 60) return diff + 's ago';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        return Math.floor(diff / 86400) + 'd ago';
    }

    // ── STUART QUOTE ROTATION ────────────────────────────────
    function startQuoteRotation(modal) {
        var quoteEl = document.getElementById('gacha-stuart-quote');
        if (!quoteEl) return;

        var quoteIdx = 0;
        var interval = setInterval(function() {
            if (!document.getElementById('gacha-modal')) {
                clearInterval(interval);
                return;
            }
            quoteIdx = (quoteIdx + 1) % STUART_QUOTES.length;
            quoteEl.style.opacity = '0';
            quoteEl.style.transform = 'translateY(6px)';
            setTimeout(function() {
                quoteEl.textContent = '"' + STUART_QUOTES[quoteIdx] + '"';
                quoteEl.style.opacity = '1';
                quoteEl.style.transform = 'translateY(0)';
            }, 300);
        }, 5000);
    }

    // ── BUFF TICK (clean expired) ────────────────────────────
    setInterval(function() {
        if (!state.gacha || !state.gacha.activeBuffs) return;
        var now = Date.now();
        state.gacha.activeBuffs = state.gacha.activeBuffs.filter(function(b) { return b.expires > now; });
    }, 10000);

    // ── INIT ─────────────────────────────────────────────────
    console.log('[Gacha] Stuart\'s Comic Book Store v2 loaded — Total pulls: ' + state.gacha.totalPulls + ', Pity: ' + state.gacha.pity + ', Free pull: ' + (hasFreePull() ? 'AVAILABLE' : 'used'));

})();
