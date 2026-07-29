// ============================================================
// BESTIARY / ENEMY CODEX - Discovery & Collection System
// Standalone module loaded after app_v2.js
// ============================================================

(function() {

    // ── ENEMY DATA REGISTRY ──────────────────────────────────
    var BESTIARY_MINIONS = [
        { key: 'red_shirt',              name: 'Starfleet Red Shirt',       lore: 'Always the first to go on away missions. Sheldon has a statistical breakdown of their survival rates.' },
        { key: 'stormtrooper',           name: 'Imperial Stormtrooper',     lore: 'Can\'t hit the broad side of the Death Star. Howard once built a replica helmet that had better accuracy than the original.' },
        { key: 'goblin',                 name: 'D&D Goblin',               lore: 'The weakest foe in any dungeon crawl. Sheldon refuses to waste spell slots on them as a matter of principle.' },
        { key: 'kryptonite',             name: 'Kryptonite Shard',         lore: 'Raj bought a "genuine" kryptonite shard on eBay for $200. Leonard still won\'t let him live it down.' },
        { key: 'trek',                   name: 'Borg Drone',               lore: 'Resistance is futile, but Sheldon has a 12-point strategy for assimilation avoidance he presented at Comic-Con.' },
        { key: 'wars',                   name: 'Sith Apprentice',          lore: 'Always two there are. Unless Raj is DMing, then there are like fifteen because he can\'t say no.' },
        { key: 'indy',                   name: 'Temple Boulder',           lore: 'It belongs in a museum! Amy once calculated the exact velocity needed for the boulder scene and ruined movie night.' },
        { key: 'goblin_shaman',          name: 'Goblin Shaman',            lore: 'The most dangerous goblin in the cave — which isn\'t saying much. Still, a Level 1 spell nearly TPK\'d the guys once.' },
        { key: 'wasteland_bandit',       name: 'Wasteland Bandit',         lore: 'Roams the post-apocalyptic wastes looking for loot. Basically Leonard after a breakup with Penny.' },
        { key: 'parademon_grunt',        name: 'DC Parademon',             lore: 'Darkseid\'s expendable foot soldiers. Stuart relates to their lack of job security on a spiritual level.' },
        { key: 'twd_walker',             name: 'TWD Walker Zombie',        lore: 'Slow, shambling, and relentless — just like Sheldon heading to the bathroom at 7:15 AM sharp.' },
        { key: 'caltech_postdoc',        name: 'Caltech Postdoc',          lore: 'Overworked and underpaid, surviving on grant funding and free pizza seminar talks. A natural enemy of tenure-track faculty.' },
        { key: 'comic_clerk',            name: 'Comic Book Clerk',         lore: 'Knows every variant cover issue by heart. Stuart trained them personally, mostly through disappointed sighs.' },
        { key: 'cupcake_baker',          name: 'Cupcake Factory Baker',    lore: 'Armed with frosting nozzles and a bad attitude. Bernadette ran this factory floor with an iron fist and a squeaky voice.' },
        { key: 'chocolate_worker',       name: 'Chocolate Factory Worker', lore: 'Cranking out confections on the assembly line. Quality control is just Raj eating samples and nodding approvingly.' },
        { key: 'geek_troll',             name: 'Online Geek Troll',        lore: 'Posts "Kirk vs. Picard" debates just to watch the world burn. Sheldon has been banned from three forums fighting this exact troll.' },
        { key: 'pasadena_tourist',       name: 'Pasadena Tourist',         lore: 'Wanders around looking for the Big Bang Theory apartment building. Penny charged one of them $5 for a selfie once.' },
        { key: 'comic_convention_fanboy',name: 'Comic Con Fanboy',         lore: 'Waited 14 hours in line for an exclusive. Howard showed up in a homemade Iron Man suit and cut to the front.' },
        { key: 'alien_invader',          name: 'Alien Invader',            lore: 'Raj has been preparing first-contact protocols since grad school. His opening line is "Namaste" followed by a Klingon greeting.' },
        { key: 'meathead_jock',          name: 'Meathead Jock',            lore: 'Doesn\'t know what a quark is but can bench press three Sheldons. The guys\' natural predator since high school.' },
        { key: 'drone_bot',              name: 'Drone Bot',                lore: 'An autonomous flying nuisance. Howard once built one that accidentally crashed into the Mars Rover prototype.' },
        { key: 'shield_trooper',         name: 'Shield Trooper',           lore: 'Heavily armored and hard to crack. Leonard compares fighting them to arguing with Sheldon about the roommate agreement.' },
        { key: 'healer_drone',           name: 'Healer Drone',             lore: 'Keeps its allies alive against all odds. Basically the Amy Farrah Fowler of enemy squads — thankless but essential.' }
    ];

    var BESTIARY_BOSSES = [
        { key: 'gorn',              name: 'The Gorn',              lore: 'The rubber-suited reptilian that haunts Captain Kirk\'s nightmares. Sheldon insists the fight choreography was "historically accurate."' },
        { key: 'demogorgon',        name: 'The Demogorgon',        lore: 'Prince of Demons and TPK specialist. The guys lost three campaigns to this thing before Sheldon rage-quit as DM.' },
        { key: 'dnd_boss',          name: 'The Dungeon Master',    lore: 'The ultimate authority at the table. Sheldon once declared himself "Dungeon Master for Life" — the campaign lasted four hours.' },
        { key: 'red_dragon',        name: 'Ancient Red Dragon',    lore: 'Breathes fire hot enough to melt mythril. Howard suggested seducing it. The table voted him out of the party.' },
        { key: 'lex_luthor',        name: 'Lex Luthor',            lore: 'Bald, brilliant, and obsessed with a flying alien. Sheldon sees him as "what happens when a physicist goes corporate."' },
        { key: 'joker_boss',        name: 'The Joker',             lore: 'Agent of chaos with a killer smile. Raj once dressed as the Joker for Halloween and scared himself in the mirror.' },
        { key: 'darth_vader',       name: 'Darth Vader',           lore: 'The Dark Lord of the Sith. His breathing apparatus was the subject of a 3-hour engineering analysis by Howard.' },
        { key: 'xenomorph_queen',   name: 'Xenomorph Queen',       lore: 'Acid blood, razor tail, and an army of face-huggers. Amy finds her reproductive strategy "fascinating from a biological standpoint."' },
        { key: 'minotaur',          name: 'Greek Minotaur',        lore: 'Half man, half bull, all rage. Sheldon once mapped the entire Labyrinth on a whiteboard in 20 minutes flat.' },
        { key: 'scifi_mech',        name: 'Plasma Goliath Mech',   lore: 'A towering war machine bristling with plasma cannons. Howard wept the first time he saw one — it was "beautiful engineering."' },
        { key: 'evil_wil',          name: 'Evil Wil Wheaton',      lore: 'Sheldon\'s arch-nemesis and bowling rival. Their feud started over a missed autograph session and escalated to supervillain levels.' },
        { key: 'broken_elevator',   name: 'The Broken Elevator',   lore: 'Has been out of order since 2003 thanks to Leonard\'s rocket fuel experiment. The most persistent villain in the building.' },
        { key: 'batman_boss',       name: 'Batman',                lore: 'The World\'s Greatest Detective and everyone\'s favorite hero. Raj argues he\'s technically a villain because "vigilantism is illegal."' },
        { key: 'superman_boss',     name: 'Superman',              lore: 'Faster than a speeding bullet, but not faster than Sheldon\'s critique of his "scientifically impossible" flight mechanics.' },
        { key: 'wonderwoman_boss',  name: 'Wonder Woman',          lore: 'An Amazonian warrior princess. Penny identifies with her. The guys agree, but mostly because of the lasso of truth at game night.' },
        { key: 'ironman_boss',      name: 'Iron Man',              lore: 'Genius, billionaire, playboy, philanthropist. Howard insists he could build the suit if he had the budget. Bernadette said "No."' },
        { key: 'thanos_boss',       name: 'Thanos',                lore: 'Wiped out half the universe with a snap. Sheldon calculated the statistical improbability and wrote a letter to Marvel about it.' },
        { key: 'flash_boss',        name: 'The Flash',             lore: 'The fastest man alive. Sheldon once tried to prove the Speed Force violates thermodynamics. He got banned from the DC subreddit.' },
        { key: 'aquaman_boss',      name: 'Aquaman',               lore: 'King of Atlantis and butt of every superhero joke. Raj is his biggest defender: "He commands SHARKS, people!"' },
        { key: 'greenlantern_boss', name: 'Green Lantern',         lore: 'His ring can create anything he imagines. Sheldon\'s first construct would be "a working model of the Large Hadron Collider."' },
        { key: 'caltech_chairman',  name: 'University Chairman',   lore: 'Controls the funding, controls the future. President Siebert has denied Sheldon\'s requests so many times he has a form letter.' },
        { key: 'kurt_ex',           name: "Kurt - Penny's Ex",     lore: 'Tall, muscular, and not the sharpest tool in the shed. Once called Leonard "the little guy with the glasses." So, accurate.' }
    ];

    var ALL_ENTRIES = BESTIARY_MINIONS.concat(BESTIARY_BOSSES);
    var TOTAL_ENTRIES = ALL_ENTRIES.length; // 42

    // ── MILESTONE DEFINITIONS ───────────────────────────────
    var BESTIARY_MILESTONES = [
        { pct: 25,  diamonds: 25,  bp: 5,   title: 'Novice Collector' },
        { pct: 50,  diamonds: 50,  bp: 10,  title: 'Field Researcher' },
        { pct: 75,  diamonds: 100, bp: 20,  title: 'Master Zoologist' },
        { pct: 100, diamonds: 200, bp: 50,  title: 'Codex Champion' }
    ];

    // ── CSS INJECTION ────────────────────────────────────────
    var style = document.createElement('style');
    style.textContent = [
        '@keyframes bestiarySlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}',
        '@keyframes bestiaryPulse{0%,100%{box-shadow:0 0 8px rgba(168,85,247,.3)}50%{box-shadow:0 0 18px rgba(168,85,247,.6)}}',
        '@keyframes codexToast{0%{opacity:0;transform:translateY(30px) scale(.9)}10%{opacity:1;transform:translateY(0) scale(1)}85%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-20px) scale(.95)}}',
        '@keyframes milestoneGlow{0%,100%{box-shadow:0 0 10px rgba(251,191,36,.3)}50%{box-shadow:0 0 25px rgba(251,191,36,.7)}}',
        '@keyframes loreFadeIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}',
        '.bestiary-card{animation:bestiarySlideIn .35s ease forwards;opacity:0}',
        '.bestiary-discovered{animation:bestiarySlideIn .35s ease forwards, bestiaryPulse 3s ease-in-out .35s infinite;opacity:0}',
        '.codex-toast{animation:codexToast 3s ease-in-out forwards;pointer-events:none}',
        '.bestiary-tab{transition:all .2s ease}',
        '.bestiary-tab:hover{transform:translateY(-1px)}',
        '.bestiary-tab-active{background:linear-gradient(to bottom,#7c3aed,#6d28d9);color:#fff;border-color:#a78bfa;box-shadow:0 0 15px rgba(139,92,246,.4)}',
        '.bestiary-silhouette{filter:grayscale(1) brightness(0.2)}',
        '.bestiary-silhouette:hover{filter:grayscale(1) brightness(0.3)}',
        '.bestiary-lore-popup{animation:loreFadeIn .2s ease forwards;z-index:200001}',
        '.bestiary-milestone-marker{position:absolute;top:-2px;width:16px;height:16px;border-radius:50%;border:2px solid #1e293b;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:900;transition:all .3s ease}',
        '.bestiary-milestone-claimed{background:linear-gradient(135deg,#f59e0b,#eab308);color:#000;box-shadow:0 0 8px rgba(251,191,36,.5)}',
        '.bestiary-milestone-ready{background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;animation:milestoneGlow 1.5s ease-in-out infinite;cursor:pointer}',
        '.bestiary-milestone-locked{background:#374151;color:#6b7280}',
        '.bestiary-reward-toast{animation:codexToast 4s ease-in-out forwards;pointer-events:none}'
    ].join('\n');
    document.head.appendChild(style);

    // ── STATE INITIALIZATION ─────────────────────────────────
    if (!state.bestiary) state.bestiary = {};
    if (!state.bestiaryKills) state.bestiaryKills = {};
    if (!state.bestiaryMilestones) state.bestiaryMilestones = [];

    // ── HELPER: get vector SVG safely ────────────────────────
    function getEnemySvg(key) {
        // Check all known vector sources
        if (typeof vectors !== 'undefined' && vectors[key]) return vectors[key];
        if (typeof minionVectors !== 'undefined' && minionVectors[key]) return minionVectors[key];
        if (typeof bossVectors !== 'undefined' && bossVectors[key]) return bossVectors[key];
        if (typeof getVectorFrame === 'function') {
            var v = getVectorFrame(key);
            if (v) return v;
        }
        // Fallback placeholder
        return '<svg viewBox="0 0 60 90" class="w-full h-full"><rect x="15" y="10" width="30" height="70" rx="6" fill="#374151" opacity="0.4"/><text x="30" y="52" text-anchor="middle" fill="#6b7280" font-size="18">?</text></svg>';
    }

    // ── RECORDING ENCOUNTERS ─────────────────────────────────
    function recordEnemyEncounter(key) {
        if (!key) return;
        if (!state.bestiary) state.bestiary = {};
        if (state.bestiary[key]) return; // Already discovered

        // Verify this is a valid bestiary key
        var valid = ALL_ENTRIES.some(function(e) { return e.key === key; });
        if (!valid) return;

        state.bestiary[key] = true;

        // Find the name
        var entry = ALL_ENTRIES.find(function(e) { return e.key === key; });
        var displayName = entry ? entry.name : key;

        // Show discovery toast
        showCodexToast(displayName);

        // Auto-save
        if (typeof saveProgress === 'function') saveProgress();
    }
    window.recordEnemyEncounter = recordEnemyEncounter;

    // ── RECORDING KILLS (Feature 1) ─────────────────────────
    function recordEnemyKill(key) {
        if (!key) return;
        if (!state.bestiaryKills) state.bestiaryKills = {};

        // Verify this is a valid bestiary key
        var valid = ALL_ENTRIES.some(function(e) { return e.key === key; });
        if (!valid) return;

        if (!state.bestiaryKills[key]) {
            state.bestiaryKills[key] = 0;
        }
        state.bestiaryKills[key] = state.bestiaryKills[key] + 1;

        // Auto-save periodically (every 10 kills to avoid thrashing)
        if (state.bestiaryKills[key] % 10 === 0) {
            if (typeof saveProgress === 'function') saveProgress();
        }
    }
    window.recordEnemyKill = recordEnemyKill;

    // ── TOAST NOTIFICATION ───────────────────────────────────
    function showCodexToast(name) {
        if (!window.gameStarted) return;
        var toast = document.createElement('div');
        toast.className = 'codex-toast fixed left-1/2 bottom-28 -translate-x-1/2 z-[200000] px-5 py-3 rounded-xl border-2 border-purple-500/60 bg-black/90 backdrop-blur-md';
        toast.style.minWidth = '220px';
        toast.style.textAlign = 'center';
        toast.innerHTML = '<div class="text-purple-400 font-black text-[11px] tracking-widest uppercase mb-0.5">📕 New Codex Entry</div>' +
            '<div class="text-white font-bold text-xs">' + name + '</div>';
        document.body.appendChild(toast);

        // Play sound
        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) {
            try { SoundManager.playFX('click'); } catch(e) {}
        }

        setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 3200);
    }

    // ── REWARD TOAST ─────────────────────────────────────────
    function showRewardToast(milestone) {
        if (!window.gameStarted) return;
        var toast = document.createElement('div');
        toast.className = 'bestiary-reward-toast fixed left-1/2 bottom-36 -translate-x-1/2 z-[200002] px-6 py-4 rounded-2xl border-2 border-amber-500/70 bg-black/95 backdrop-blur-md';
        toast.style.minWidth = '260px';
        toast.style.textAlign = 'center';
        toast.innerHTML = '<div class="text-amber-400 font-black text-xs tracking-widest uppercase mb-1">🏆 Milestone Unlocked!</div>' +
            '<div class="text-white font-bold text-sm mb-1">' + milestone.title + '</div>' +
            '<div class="text-amber-300 text-[10px] font-bold">' +
                '💎 ' + milestone.diamonds + ' Diamonds  •  ⚡ ' + milestone.bp + ' BP' +
            '</div>';
        document.body.appendChild(toast);

        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) {
            try { SoundManager.playFX('upgrade'); } catch(e) {}
        }

        setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 4200);
    }

    // ── MILESTONE LOGIC ──────────────────────────────────────
    function getDiscoveredCount() {
        return Object.keys(state.bestiary || {}).length;
    }

    function getCompletionPct() {
        return Math.round((getDiscoveredCount() / TOTAL_ENTRIES) * 100);
    }

    function checkAndClaimMilestones() {
        if (!state.bestiaryMilestones) state.bestiaryMilestones = [];
        var pct = getCompletionPct();

        for (var i = 0; i < BESTIARY_MILESTONES.length; i++) {
            var m = BESTIARY_MILESTONES[i];
            var alreadyClaimed = state.bestiaryMilestones.indexOf(m.pct) !== -1;
            if (!alreadyClaimed && pct >= m.pct) {
                // Claim it
                state.bestiaryMilestones.push(m.pct);

                // Grant rewards
                if (typeof state.diamonds !== 'undefined') {
                    state.diamonds = (state.diamonds || 0) + m.diamonds;
                }
                if (typeof state.battlePassXP !== 'undefined') {
                    state.battlePassXP = (state.battlePassXP || 0) + m.bp;
                } else if (typeof state.bp !== 'undefined') {
                    state.bp = (state.bp || 0) + m.bp;
                }

                // Show reward toast
                showRewardToast(m);

                // Auto-save
                if (typeof saveProgress === 'function') saveProgress();
            }
        }
    }

    // ── LORE POPUP ───────────────────────────────────────────
    function showLorePopup(entry, cardEl) {
        // Remove any existing lore popup
        closeLorePopup();

        var kills = (state.bestiaryKills && state.bestiaryKills[entry.key]) ? state.bestiaryKills[entry.key] : 0;
        var isBoss = BESTIARY_BOSSES.some(function(b) { return b.key === entry.key; });

        var popup = document.createElement('div');
        popup.id = 'bestiary-lore-popup';
        popup.className = 'bestiary-lore-popup fixed inset-0 flex items-center justify-center p-4';
        popup.style.cssText = 'z-index:200001;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px)';

        popup.innerHTML = '<div class="max-w-xs w-full p-4 rounded-2xl border-2 ' +
            (isBoss ? 'border-red-500/60 bg-gradient-to-b from-red-950/95 to-slate-950/95' : 'border-purple-500/60 bg-gradient-to-b from-purple-950/95 to-slate-950/95') +
            ' shadow-[0_0_40px_rgba(139,92,246,0.3)]" onclick="event.stopPropagation()">' +
                '<div class="flex items-center gap-3 mb-3">' +
                    '<div class="w-16 h-16 flex items-center justify-center shrink-0">' + getEnemySvg(entry.key) + '</div>' +
                    '<div>' +
                        '<h3 class="text-white font-black text-sm">' + entry.name + '</h3>' +
                        (isBoss ? '<span class="text-red-400 text-[9px] font-black uppercase tracking-wider">💀 Boss</span>' : '<span class="text-purple-400 text-[9px] font-black uppercase tracking-wider">👾 Minion</span>') +
                    '</div>' +
                '</div>' +
                '<div class="border-t ' + (isBoss ? 'border-red-900/40' : 'border-purple-900/40') + ' pt-3 mb-3">' +
                    '<p class="text-gray-300 text-[11px] leading-relaxed italic">"' + entry.lore + '"</p>' +
                '</div>' +
                '<div class="flex items-center justify-between">' +
                    '<span class="text-[10px] font-bold ' + (isBoss ? 'text-red-400/70' : 'text-purple-400/70') + '">⚔ ' + kills + ' kills</span>' +
                    '<button onclick="document.getElementById(\'bestiary-lore-popup\').remove()" class="text-[10px] font-bold text-gray-500 hover:text-white px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50 transition-colors">Close</button>' +
                '</div>' +
            '</div>';

        popup.addEventListener('click', function(e) {
            if (e.target === popup) closeLorePopup();
        });

        document.body.appendChild(popup);
    }

    function closeLorePopup() {
        var existing = document.getElementById('bestiary-lore-popup');
        if (existing) existing.remove();
    }

    // Make showLorePopup accessible for card click handlers
    window._bestiaryShowLore = function(key) {
        var entry = ALL_ENTRIES.find(function(e) { return e.key === key; });
        if (entry) showLorePopup(entry);
    };

    // ── MONKEY-PATCH spawnEnemy() ─────────────────────────────
    // We wrap the original spawnEnemy so every enemy spawn auto-records
    function patchSpawnEnemy() {
        if (typeof window.spawnEnemy !== 'function') return;
        var _originalSpawnEnemy = window.spawnEnemy;
        window.spawnEnemy = function() {
            _originalSpawnEnemy.apply(this, arguments);
            // After spawn, currentEnemy.type should have .key
            if (typeof currentEnemy !== 'undefined' && currentEnemy && currentEnemy.type && currentEnemy.type.key) {
                recordEnemyEncounter(currentEnemy.type.key);
            }
        };
    }

    // Try patching immediately, or wait for DOMContentLoaded
    if (typeof window.spawnEnemy === 'function') {
        patchSpawnEnemy();
    } else {
        window.addEventListener('DOMContentLoaded', function() {
            setTimeout(patchSpawnEnemy, 1000);
        });
    }

    // ── BUILD MILESTONE BAR ──────────────────────────────────
    function buildMilestoneBar(discoveredCount) {
        var pctComplete = Math.round((discoveredCount / TOTAL_ENTRIES) * 100);
        var barColor = pctComplete >= 100 ? 'from-amber-500 to-yellow-400' : 'from-purple-600 to-violet-500';

        var html = '<div class="mb-1">';

        // Main progress bar with milestone markers
        html += '<div class="relative mt-3 mb-4 mx-1">';

        // The bar itself
        html += '<div class="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">' +
            '<div class="h-full bg-gradient-to-r ' + barColor + ' rounded-full transition-all duration-500" style="width:' + pctComplete + '%"></div>' +
        '</div>';

        // Milestone markers
        for (var i = 0; i < BESTIARY_MILESTONES.length; i++) {
            var m = BESTIARY_MILESTONES[i];
            var claimed = state.bestiaryMilestones && state.bestiaryMilestones.indexOf(m.pct) !== -1;
            var ready = !claimed && pctComplete >= m.pct;
            var markerClass = claimed ? 'bestiary-milestone-claimed' : (ready ? 'bestiary-milestone-ready' : 'bestiary-milestone-locked');
            var markerLabel = claimed ? '✓' : (m.pct + '');

            html += '<div class="bestiary-milestone-marker ' + markerClass + '" ' +
                'style="left:' + m.pct + '%" ' +
                'title="' + m.pct + '% — ' + m.title + (claimed ? ' (Claimed)' : (ready ? ' (Click to claim!)' : ' (Locked)')) + '" ' +
                (ready ? 'data-milestone-pct="' + m.pct + '"' : '') +
                '>' + markerLabel + '</div>';
        }

        html += '</div>';

        // Summary line
        html += '<div class="flex items-center justify-between px-1">' +
            '<span class="text-[10px] font-black tracking-wider ' + (pctComplete >= 100 ? 'text-amber-400' : 'text-purple-400') + '">' + discoveredCount + '/' + TOTAL_ENTRIES + ' Discovered (' + pctComplete + '%)</span>';

        // Next milestone hint
        var nextMilestone = null;
        for (var j = 0; j < BESTIARY_MILESTONES.length; j++) {
            var isClaimed = state.bestiaryMilestones && state.bestiaryMilestones.indexOf(BESTIARY_MILESTONES[j].pct) !== -1;
            if (!isClaimed) {
                nextMilestone = BESTIARY_MILESTONES[j];
                break;
            }
        }

        if (nextMilestone) {
            var needed = Math.ceil((nextMilestone.pct / 100) * TOTAL_ENTRIES) - discoveredCount;
            if (needed > 0) {
                html += '<span class="text-[9px] text-gray-500 italic">' + needed + ' more for ' + nextMilestone.title + '</span>';
            } else {
                html += '<span class="text-[9px] text-green-400 font-bold">🏆 ' + nextMilestone.title + ' ready!</span>';
            }
        } else {
            html += '<span class="text-[9px] text-amber-400 font-bold">🏆 All milestones claimed!</span>';
        }

        html += '</div>';
        html += '</div>';

        return html;
    }

    // ── OPEN BESTIARY MODAL ──────────────────────────────────
    function openBestiary() {
        // Remove any existing modal
        var existing = document.getElementById('bestiary-modal');
        if (existing) existing.remove();

        // Check and auto-claim milestones
        checkAndClaimMilestones();

        var discoveredCount = Object.keys(state.bestiary || {}).length;
        var activeTab = 'minions';

        // Build modal
        var modal = document.createElement('div');
        modal.id = 'bestiary-modal';
        modal.className = 'fixed inset-0 z-[99999] flex items-center justify-center p-2';
        modal.style.cssText = 'background:rgba(0,0,0,0.92);backdrop-filter:blur(8px);animation:bestiarySlideIn .3s ease';

        modal.innerHTML = buildModalContent(activeTab, discoveredCount);
        document.body.appendChild(modal);

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });

        // Bind tab clicks
        bindTabs(modal);

        // Bind milestone marker clicks
        bindMilestoneClicks(modal);

        // Bind card lore clicks
        bindCardClicks(modal);

        // Play sound
        if (typeof SoundManager !== 'undefined' && SoundManager.playFX) {
            try { SoundManager.playFX('click'); } catch(e) {}
        }

        function closeModal() {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.97)';
            modal.style.transition = 'all .2s ease';
            setTimeout(function() { modal.remove(); }, 200);
        }

        function bindTabs(container) {
            var tabs = container.querySelectorAll('[data-bestiary-tab]');
            tabs.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    activeTab = tab.getAttribute('data-bestiary-tab');
                    var inner = container.querySelector('#bestiary-inner');
                    if (inner) {
                        inner.innerHTML = buildInnerContent(activeTab, discoveredCount);
                        // Re-stagger card animations
                        staggerCards(inner);
                        // Re-bind card clicks
                        bindCardClicks(container);
                    }
                    // Update tab styling
                    tabs.forEach(function(t) {
                        t.classList.remove('bestiary-tab-active');
                        t.classList.add('bg-slate-800', 'text-gray-400', 'border-slate-600');
                    });
                    tab.classList.add('bestiary-tab-active');
                    tab.classList.remove('bg-slate-800', 'text-gray-400', 'border-slate-600');
                });
            });
        }

        function staggerCards(container) {
            var cards = container.querySelectorAll('.bestiary-card');
            cards.forEach(function(card, i) {
                card.style.animationDelay = (i * 0.04) + 's';
            });
        }

        // Initial stagger
        setTimeout(function() {
            var inner = modal.querySelector('#bestiary-inner');
            if (inner) staggerCards(inner);
        }, 50);
    }
    window.openBestiary = openBestiary;

    // ── BIND CARD CLICKS FOR LORE ───────────────────────────
    function bindCardClicks(container) {
        var cards = container.querySelectorAll('[data-bestiary-lore-key]');
        cards.forEach(function(card) {
            card.addEventListener('click', function() {
                var key = card.getAttribute('data-bestiary-lore-key');
                if (key) window._bestiaryShowLore(key);
            });
        });
    }

    // ── BIND MILESTONE MARKER CLICKS ────────────────────────
    function bindMilestoneClicks(container) {
        var markers = container.querySelectorAll('[data-milestone-pct]');
        markers.forEach(function(marker) {
            marker.addEventListener('click', function() {
                checkAndClaimMilestones();
                // Refresh the modal to show updated state
                openBestiary();
            });
        });
    }

    // ── BUILD MODAL HTML ─────────────────────────────────────
    function buildModalContent(activeTab, discovered) {
        var pctComplete = Math.round((discovered / TOTAL_ENTRIES) * 100);

        return '<div class="w-full max-w-lg max-h-[90vh] flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-purple-500/50 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.25)]" onclick="event.stopPropagation()">' +
            // Header
            '<div class="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 border-b-2 border-purple-700/60 p-3 shrink-0">' +
                '<div class="flex justify-between items-center">' +
                    '<h2 class="text-purple-300 font-black text-sm tracking-[0.2em] uppercase" style="text-shadow:0 0 15px rgba(168,85,247,.5)">📕 ENEMY CODEX</h2>' +
                    '<button onclick="document.getElementById(\'bestiary-modal\').remove()" class="text-gray-500 hover:text-white text-xl leading-none px-2 transition-colors">&times;</button>' +
                '</div>' +
                // Milestone progress bar
                buildMilestoneBar(discovered) +
            '</div>' +
            // Tabs
            '<div class="flex gap-1 p-2 bg-black/40 shrink-0">' +
                '<button data-bestiary-tab="minions" class="flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase border bestiary-tab bestiary-tab-active">👾 MINIONS (' + BESTIARY_MINIONS.length + ')</button>' +
                '<button data-bestiary-tab="bosses" class="flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase border bestiary-tab bg-slate-800 text-gray-400 border-slate-600">💀 BOSSES (' + BESTIARY_BOSSES.length + ')</button>' +
            '</div>' +
            // Grid content (scrollable)
            '<div id="bestiary-inner" class="flex-1 overflow-y-auto p-2" style="scrollbar-width:thin;scrollbar-color:#4c1d95 transparent">' +
                buildInnerContent(activeTab, discovered) +
            '</div>' +
            // Footer
            '<div class="p-2 bg-black/60 border-t border-purple-900/40 shrink-0 text-center">' +
                '<p class="text-[9px] text-gray-600 uppercase tracking-wider">Discover enemies by encountering them in battle • Click discovered cards for lore</p>' +
            '</div>' +
        '</div>';
    }

    function buildInnerContent(tab, discovered) {
        var entries = tab === 'bosses' ? BESTIARY_BOSSES : BESTIARY_MINIONS;
        var html = '<div class="grid grid-cols-3 sm:grid-cols-4 gap-2">';

        entries.forEach(function(entry, idx) {
            var isDiscovered = state.bestiary && state.bestiary[entry.key];
            var isBoss = tab === 'bosses';
            var svgContent = getEnemySvg(entry.key);
            var kills = (state.bestiaryKills && state.bestiaryKills[entry.key]) ? state.bestiaryKills[entry.key] : 0;

            if (isDiscovered) {
                // DISCOVERED CARD (clickable for lore)
                var borderGlow = isBoss
                    ? 'border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                    : 'border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.15)]';
                html += '<div class="bestiary-card bestiary-discovered flex flex-col items-center p-2 rounded-xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 border ' + borderGlow + ' cursor-pointer hover:scale-[1.04] transition-transform" style="animation-delay:' + (idx * 0.04) + 's" data-bestiary-lore-key="' + entry.key + '">' +
                    '<div class="w-14 h-14 flex items-center justify-center mb-1">' + svgContent + '</div>' +
                    '<p class="text-[8px] font-bold text-center leading-tight ' + (isBoss ? 'text-red-400' : 'text-purple-300') + ' tracking-wide">' + entry.name + '</p>' +
                    (isBoss ? '<span class="text-[7px] text-red-600/70 font-black mt-0.5">💀 BOSS</span>' : '') +
                    '<span class="text-[7px] ' + (isBoss ? 'text-red-500/50' : 'text-purple-500/50') + ' font-bold mt-0.5">⚔ ' + kills + ' kills</span>' +
                '</div>';
            } else {
                // UNDISCOVERED CARD (silhouette)
                html += '<div class="bestiary-card flex flex-col items-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/50 cursor-default hover:border-slate-700/60 transition-colors" style="animation-delay:' + (idx * 0.04) + 's">' +
                    '<div class="w-14 h-14 flex items-center justify-center mb-1 bestiary-silhouette">' + svgContent + '</div>' +
                    '<p class="text-[8px] font-bold text-gray-600 tracking-wide">???</p>' +
                '</div>';
            }
        });

        html += '</div>';
        return html;
    }

    console.log('[Bestiary] Enemy Codex loaded — ' + Object.keys(state.bestiary || {}).length + '/' + TOTAL_ENTRIES + ' discovered');

})();
