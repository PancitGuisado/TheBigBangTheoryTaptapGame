// ============================================================
// STORY / CAMPAIGN MODE — Narrative-driven chapter progression
// Ties into wave progression, dialogue system, and locations
// ============================================================

(function() {
    'use strict';

    // ---- STAR MILESTONE DEFINITIONS ----
    var STAR_MILESTONES = [
        { stars: 10, reward: { diamonds: 100 }, label: '10 Stars — 💎 100 Diamonds' },
        { stars: 20, reward: { diamonds: 500 }, label: '20 Stars — 💎 500 Diamonds' }
    ];

    // ---- CHAPTER DEFINITIONS ----
    var CHAPTERS = [
        {
            id: 'ch1',
            title: 'The Roommate Agreement',
            subtitle: 'Chapter 1',
            desc: 'Sheldon insists on establishing ground rules before any "adventuring" begins. Prove yourself by surviving the first waves.',
            icon: '📋',
            wave: 1,
            objectives: [
                { id: 'ch1_o1', type: 'wave', target: 5, label: 'Reach Wave 5' },
                { id: 'ch1_o2', type: 'kills', target: 20, label: 'Defeat 20 enemies' },
                { id: 'ch1_o3', type: 'recruit', target: 3, label: 'Recruit 3 characters' }
            ],
            rewards: { money: 500, xp: 100 },
            dialogue: {
                start: [
                    { char: 'sheldon', text: 'Before we proceed, I require a written agreement outlining our roles, responsibilities, and bathroom schedules.' },
                    { char: 'leonard', text: 'Sheldon, we\'re trying to fight monsters here, not negotiate a lease.' },
                    { char: 'sheldon', text: 'The two are not mutually exclusive. Paragraph 7, subsection B clearly states...' },
                    { char: 'penny', text: 'Oh my God, just let him sign his thing so we can start!' }
                ],
                end: [
                    { char: 'leonard', text: 'Well, we survived Sheldon\'s orientation. That\'s harder than any boss fight.' },
                    { char: 'sheldon', text: 'I heard that. And I disagree. The boss fight was trivially easy.' }
                ]
            },
            location: 'apartment'
        },
        {
            id: 'ch2',
            title: 'The Cheesecake Factory Incident',
            subtitle: 'Chapter 2',
            desc: 'Penny\'s shift at the Cheesecake Factory gets interrupted by an unusual wave of customers. Something is very wrong.',
            icon: '🍰',
            wave: 6,
            objectives: [
                { id: 'ch2_o1', type: 'wave', target: 10, label: 'Reach Wave 10' },
                { id: 'ch2_o2', type: 'boss', target: 2, label: 'Defeat 2 bosses' },
                { id: 'ch2_o3', type: 'money', target: 2000, label: 'Earn $2,000' }
            ],
            rewards: { money: 1200, xp: 200 },
            dialogue: {
                start: [
                    { char: 'penny', text: 'Okay, so weird robot-looking things just walked into the Cheesecake Factory and they are NOT leaving a tip.' },
                    { char: 'howard', text: 'Those aren\'t robots! They\'re clearly androids. There\'s a difference.' },
                    { char: 'raj', text: 'Does the difference matter when they\'re destroying the salad bar?' },
                    { char: 'penny', text: 'That salad bar was terrible anyway. Focus, people!' }
                ],
                end: [
                    { char: 'howard', text: 'Did we just save a restaurant? My mother would be so proud... and then criticize the portions.' },
                    { char: 'bernie', text: 'Howard, your mother criticizes everything. That\'s not a milestone.' }
                ]
            },
            location: 'cheesecake_factory'
        },
        {
            id: 'ch3',
            title: 'The University Ultimatum',
            subtitle: 'Chapter 3',
            desc: 'Caltech is under siege! The physics department has been overrun. Time to fight through the halls of academia.',
            icon: '🎓',
            wave: 11,
            objectives: [
                { id: 'ch3_o1', type: 'wave', target: 15, label: 'Reach Wave 15' },
                { id: 'ch3_o2', type: 'boss', target: 4, label: 'Defeat 4 bosses' },
                { id: 'ch3_o3', type: 'equip', target: 3, label: 'Collect 3 equipment pieces' }
            ],
            rewards: { money: 2500, xp: 400 },
            dialogue: {
                start: [
                    { char: 'raj', text: 'Dude, there are literal monsters in the cafeteria. And I thought the meatloaf was the scariest thing at Caltech.' },
                    { char: 'sheldon', text: 'The cafeteria meatloaf has a higher mortality rate. Statistically speaking.' },
                    { char: 'leonard', text: 'Sheldon, not the time for statistics!' },
                    { char: 'amy', text: 'Actually, I\'d love to hear those statistics later. For science.' }
                ],
                end: [
                    { char: 'sheldon', text: 'The university is secure. Though I must say, the enemies were disappointingly unfamiliar with quantum mechanics.' },
                    { char: 'raj', text: 'Not everything needs to understand quantum mechanics, Sheldon.' },
                    { char: 'sheldon', text: 'That\'s exactly what someone unfamiliar with quantum mechanics would say.' }
                ]
            },
            location: 'caltech'
        },
        {
            id: 'ch4',
            title: 'The Comic Book Catastrophe',
            subtitle: 'Chapter 4',
            desc: 'Stuart\'s comic book store has become a portal to another dimension! Rare collectibles are scattering everywhere.',
            icon: '📚',
            wave: 16,
            objectives: [
                { id: 'ch4_o1', type: 'wave', target: 20, label: 'Reach Wave 20' },
                { id: 'ch4_o2', type: 'kills', target: 100, label: 'Defeat 100 enemies' },
                { id: 'ch4_o3', type: 'equip', target: 5, label: 'Collect 5 equipment pieces' }
            ],
            rewards: { money: 5000, xp: 600, items: ['paintball_gun'] },
            dialogue: {
                start: [
                    { char: 'stuart', text: 'This is actually great for business. People are coming in to fight monsters AND they\'re buying comics. Win-win!' },
                    { char: 'sheldon', text: 'Stuart, your store is literally being destroyed.' },
                    { char: 'stuart', text: 'Yeah, but my insurance covers "acts of interdimensional chaos." I checked.' },
                    { char: 'howard', text: 'That... cannot be a real insurance category.' }
                ],
                end: [
                    { char: 'leonard', text: 'We sealed the dimensional rift. Stuart somehow made a profit.' },
                    { char: 'stuart', text: 'Monster-fighting themed merchandise is selling like hotcakes!' }
                ]
            },
            location: 'comic_store'
        },
        {
            id: 'ch5',
            title: 'Howard\'s Space Protocol',
            subtitle: 'Chapter 5',
            desc: 'NASA has detected an anomaly. Howard\'s space experience makes him the obvious lead... much to everyone\'s annoyance.',
            icon: '🚀',
            wave: 21,
            objectives: [
                { id: 'ch5_o1', type: 'wave', target: 30, label: 'Reach Wave 30' },
                { id: 'ch5_o2', type: 'boss', target: 6, label: 'Defeat 6 bosses' },
                { id: 'ch5_o3', type: 'pvp', target: 3, label: 'Win 3 PVP battles' }
            ],
            rewards: { money: 8000, xp: 1000 },
            dialogue: {
                start: [
                    { char: 'howard', text: 'As the only person here who\'s actually been to space, I think I should lead this mission. You\'re welcome.' },
                    { char: 'bernie', text: 'Howie, you threw up in zero gravity. Multiple times.' },
                    { char: 'howard', text: 'That\'s classified information, Bernie!' },
                    { char: 'raj', text: 'It was on YouTube, dude. 2 million views.' }
                ],
                end: [
                    { char: 'bernie', text: 'Howard saved the day AND he didn\'t throw up this time. That\'s what I call character growth.' },
                    { char: 'howard', text: 'I would like this noted in my permanent record.' }
                ]
            },
            location: 'nasa'
        },
        {
            id: 'ch6',
            title: 'The Sheldonian Prophecy',
            subtitle: 'Chapter 6',
            desc: 'Sheldon has discovered an ancient text that predicts a great convergence. The biggest threat yet approaches.',
            icon: '⚡',
            wave: 31,
            objectives: [
                { id: 'ch6_o1', type: 'wave', target: 40, label: 'Reach Wave 40' },
                { id: 'ch6_o2', type: 'boss', target: 8, label: 'Defeat 8 bosses' },
                { id: 'ch6_o3', type: 'kills', target: 250, label: 'Defeat 250 enemies' }
            ],
            rewards: { money: 15000, xp: 1500, items: ['bat_leth'] },
            dialogue: {
                start: [
                    { char: 'sheldon', text: 'According to this prophecy, a great evil will converge when the cosmic strings align. Coincidentally, that\'s also laundry night.' },
                    { char: 'amy', text: 'Sheldon, cosmic strings are theoretical. This prophecy is clearly metaphorical.' },
                    { char: 'sheldon', text: 'Amy, I don\'t deal in metaphors. I deal in facts. And the fact is, my whites need bleaching.' },
                    { char: 'leonard', text: 'Can we focus on the great evil, please?' }
                ],
                end: [
                    { char: 'amy', text: 'Sheldon decoded an ancient prophecy. I decoded Sheldon. I\'d say we both did the impossible today.' },
                    { char: 'sheldon', text: 'I am not a code to be decoded. I am an enigma wrapped in a mystery.' }
                ]
            },
            location: 'apartment'
        },
        {
            id: 'ch7',
            title: 'The Final Equation',
            subtitle: 'Chapter 7 — FINALE',
            desc: 'The source of all the dimensional breaches has been found. Time for the gang to put their brains — and brawn — together for one final stand.',
            icon: '🌌',
            wave: 41,
            objectives: [
                { id: 'ch7_o1', type: 'wave', target: 50, label: 'Reach Wave 50' },
                { id: 'ch7_o2', type: 'boss', target: 10, label: 'Defeat 10 bosses' },
                { id: 'ch7_o3', type: 'prestige', target: 1, label: 'Prestige at least once' }
            ],
            rewards: { money: 30000, xp: 3000, items: ['excalibur'] },
            dialogue: {
                start: [
                    { char: 'leonard', text: 'This is it, guys. Everything we\'ve fought for comes down to this. No pressure.' },
                    { char: 'sheldon', text: 'I feel no pressure. Pressure is for carbon becoming diamonds. I am already a diamond.' },
                    { char: 'penny', text: 'And humble too. Let\'s just do this!' },
                    { char: 'raj', text: 'For science! And for friendship! And for not dying!' }
                ],
                end: [
                    { char: 'sheldon', text: 'We saved the multiverse. I expect a Nobel Prize for this.' },
                    { char: 'leonard', text: 'Sheldon, the Nobel committee doesn\'t recognize video game achievements.' },
                    { char: 'sheldon', text: 'Then the Nobel committee is wrong. Again.' }
                ]
            },
            location: 'caltech'
        },
        {
            id: 'ch8',
            title: 'The Roommate Agreement Renewal',
            subtitle: 'Chapter 8',
            desc: 'The Roommate Agreement is due for renewal. Sheldon has prepared an extensive list of amendments that must be ratified through combat.',
            icon: '📝',
            wave: 35,
            objectives: [
                { id: 'ch8_o1', type: 'wave', target: 45, label: 'Reach Wave 45' },
                { id: 'ch8_o2', type: 'kills', target: 80, label: 'Defeat 80 enemies' },
                { id: 'ch8_o3', type: 'recruit', target: 8, label: 'Have 8+ characters' }
            ],
            rewards: { money: 20000, xp: 2000 },
            dialogue: {
                start: [
                    { char: 'sheldon', text: 'The Roommate Agreement is up for renewal. Section 74B clearly states that mid-adventure renegotiations require a formal hearing.' },
                    { char: 'leonard', text: 'Sheldon, we are literally under attack right now.' },
                    { char: 'sheldon', text: 'All the more reason to have a clear contractual framework. Sign here, here, and initial here.' },
                    { char: 'penny', text: 'I\'m not signing anything that has a bathroom schedule, Sheldon!' }
                ],
                end: [
                    { char: 'leonard', text: 'We renewed the agreement. Sheldon added 47 new clauses. I stopped reading at clause 12.' },
                    { char: 'sheldon', text: 'Clause 13 was the best one. It grants me veto power over all future tactical decisions.' },
                    { char: 'leonard', text: 'And that\'s exactly why I stopped reading.' }
                ]
            },
            location: 'apartment'
        },
        {
            id: 'ch9',
            title: 'The Mars Rover Incident',
            subtitle: 'Chapter 9',
            desc: 'Howard has accidentally crashed another Mars Rover. NASA needs the gang to clean up the mess before Congress finds out.',
            icon: '🔴',
            wave: 40,
            objectives: [
                { id: 'ch9_o1', type: 'wave', target: 50, label: 'Reach Wave 50' },
                { id: 'ch9_o2', type: 'robots', target: 5, label: 'Craft 5 robots' },
                { id: 'ch9_o3', type: 'money', target: 500000, label: 'Earn $500K' }
            ],
            rewards: { money: 35000, xp: 2500 },
            dialogue: {
                start: [
                    { char: 'howard', text: 'So I may have accidentally driven another Mars Rover into a ditch. NASA is... not happy.' },
                    { char: 'raj', text: 'Dude, how do you keep crashing these things? They cost millions!' },
                    { char: 'howard', text: 'In my defense, the joystick was inverted. Who inverts a joystick?' },
                    { char: 'bernie', text: 'Howard Joel Wolowitz, we are going to fix this RIGHT NOW.' }
                ],
                end: [
                    { char: 'raj', text: 'Howard crashed the rover, we fought aliens, and somehow I\'m the one who has to write the incident report.' },
                    { char: 'howard', text: 'I\'ll buy you a mango lassi. Two mango lassis.' },
                    { char: 'raj', text: 'Make it three and we have a deal.' }
                ]
            },
            location: 'nasa'
        },
        {
            id: 'ch10',
            title: 'The Scavenger Vortex',
            subtitle: 'Chapter 10',
            desc: 'Amy has designed an incredibly complex scavenger hunt that somehow involves fighting interdimensional creatures.',
            icon: '🗺️',
            wave: 45,
            objectives: [
                { id: 'ch10_o1', type: 'wave', target: 55, label: 'Reach Wave 55' },
                { id: 'ch10_o2', type: 'equip', target: 50, label: 'Collect 50 equipment' },
                { id: 'ch10_o3', type: 'dailyMissions', target: 10, label: 'Complete 10 daily missions' }
            ],
            rewards: { money: 50000, xp: 3000 },
            dialogue: {
                start: [
                    { char: 'amy', text: 'I\'ve designed a scavenger hunt that combines neuroscience, anthropology, and competitive spirit. It\'s going to be brutal.' },
                    { char: 'sheldon', text: 'Amy, the last time you said something would be "brutal," we had a lovely afternoon at the zoo.' },
                    { char: 'amy', text: 'This time there are actual monsters, Sheldon. Real ones.' },
                    { char: 'raj', text: 'I brought snacks. If I\'m going to die on a scavenger hunt, I\'m going to die full.' }
                ],
                end: [
                    { char: 'bernie', text: 'Amy\'s scavenger hunt made us fight more monsters than any actual mission. I\'m both angry and impressed.' },
                    { char: 'amy', text: 'The data I collected is going to make an incredible paper. Thank you all for your involuntary participation.' }
                ]
            },
            location: 'caltech'
        },
        {
            id: 'ch11',
            title: 'The Comic-Con Conundrum',
            subtitle: 'Chapter 11',
            desc: 'Comic-Con tickets are impossible to get, but Stuart knows a way in. It will cost the gang everything they have.',
            icon: '🎪',
            wave: 50,
            objectives: [
                { id: 'ch11_o1', type: 'wave', target: 60, label: 'Reach Wave 60' },
                { id: 'ch11_o2', type: 'pvp', target: 20, label: 'Win 20 PVP battles' },
                { id: 'ch11_o3', type: 'league', target: 'gold', label: 'Reach Gold league' }
            ],
            rewards: { money: 75000, xp: 4000 },
            dialogue: {
                start: [
                    { char: 'stuart', text: 'Comic-Con tickets are sold out, but I know a guy who knows a guy. It\'ll cost us... everything.' },
                    { char: 'howard', text: 'Define "everything." Because I have a very specific budget for costumes.' },
                    { char: 'stuart', text: 'Let\'s just say you might need to fight a few interdimensional beings to cover the tab.' },
                    { char: 'raj', text: 'That is the most Comic-Con sentence anyone has ever said.' }
                ],
                end: [
                    { char: 'raj', text: 'We fought our way through Comic-Con. Stuart made enough money to keep the store open for another month. Maybe two.' },
                    { char: 'stuart', text: 'I also got autographs from three people who might be famous. Today was a good day.' }
                ]
            },
            location: 'comic_store'
        },
        {
            id: 'ch12',
            title: 'The Series Finale',
            subtitle: 'Chapter 12 — GRAND FINALE',
            desc: 'This is it. The final challenge. Everything the gang has been through has led to this ultimate showdown.',
            icon: '🏆',
            wave: 60,
            objectives: [
                { id: 'ch12_o1', type: 'wave', target: 75, label: 'Reach Wave 75' },
                { id: 'ch12_o2', type: 'prestige', target: 3, label: 'Prestige 3 times' },
                { id: 'ch12_o3', type: 'tower', target: 25, label: 'Reach Tower Floor 25' }
            ],
            rewards: { money: 150000, xp: 8000, items: ['excalibur'] },
            dialogue: {
                start: [
                    { char: 'leonard', text: 'Guys, I think this might actually be it. The final challenge. Everything we\'ve been through has led to this moment.' },
                    { char: 'sheldon', text: 'I\'ve calculated our odds of survival. They\'re not great, but they\'re better than Howard\'s driving record.' },
                    { char: 'howard', text: 'Hey! I am a great driver! The Mars Rover incidents were completely unrelated!' },
                    { char: 'penny', text: 'Alright nerds, let\'s finish this. Together.' }
                ],
                end: [
                    { char: 'sheldon', text: 'We did it. We saved everything. And while I\'d love to say it was all me... it was mostly me. But you all helped. A little.' },
                    { char: 'penny', text: 'A little?! I literally punched a god in the face!' },
                    { char: 'sheldon', text: 'And I calculated the exact angle for that punch. You\'re welcome.' }
                ]
            },
            location: 'caltech'
        }
    ];

    // ---- STATE INIT ----
    function initCampaign() {
        if (!state.campaign) {
            state.campaign = {
                completed: [],  // chapter IDs
                progress: {},   // { ch1_o1: 15, ch1_o2: 8, ... }
                dialogueSeen: [] // dialogue IDs
            };
        }
        // Enhancement 1: Star ratings
        if (!state.campaign.stars) state.campaign.stars = {};
        if (!state.campaign.startTimes) state.campaign.startTimes = {};
        if (!state.campaign.hospitalizedDuring) state.campaign.hospitalizedDuring = {};
        if (!state.campaign.starMilestonesClaimed) state.campaign.starMilestonesClaimed = [];
        // Enhancement 2: Hard mode
        if (typeof state.campaign.hardMode === 'undefined') state.campaign.hardMode = false;
        if (!state.campaign.completedHard) state.campaign.completedHard = [];
    }

    // ---- PROGRESS CHECKING ----
    function getCampaignProgress(chapter, hardMode) {
        initCampaign();
        var results = [];
        var multiplier = hardMode ? 2 : 1;
        for (var i = 0; i < chapter.objectives.length; i++) {
            var obj = chapter.objectives[i];
            var current = 0;
            var target = obj.target;

            switch (obj.type) {
                case 'wave':
                    current = state.wave || 1;
                    break;
                case 'kills':
                    current = (state.stats && state.stats.totalKills) || 0;
                    break;
                case 'boss':
                    current = (state.stats && state.stats.bossKills) || 0;
                    break;
                case 'money':
                    current = (state.stats && state.stats.moneyEarned) || 0;
                    break;
                case 'equip':
                    current = state.inventory ? state.inventory.length : 0;
                    break;
                case 'pvp':
                    current = (state.stats && state.stats.pvpWins) || 0;
                    break;
                case 'recruit':
                    current = state.team ? state.team.length : 0;
                    break;
                case 'prestige':
                    current = (state.stats && state.stats.prestiges) || state.prestigeCount || 0;
                    break;
                case 'robots':
                    if (state.craftedRobots && Array.isArray(state.craftedRobots)) {
                        current = state.craftedRobots.length;
                    } else if (state.robots && typeof state.robots === 'object') {
                        current = Object.keys(state.robots).length;
                    } else {
                        current = 0;
                    }
                    break;
                case 'dailyMissions':
                    current = (state.stats && state.stats.dailyMissionsCompleted) || 0;
                    break;
                case 'league':
                    current = ((state.pvpLeague || '') === obj.target) ? 1 : 0;
                    target = 1; // league is binary: reached or not
                    break;
                case 'tower':
                    current = state.towerFloor || 0;
                    break;
            }

            // In hard mode, double numeric targets (except league which is binary)
            var effectiveTarget = (obj.type === 'league') ? target : (target * multiplier);

            results.push({
                id: obj.id,
                label: obj.label,
                current: current,
                target: effectiveTarget,
                done: current >= effectiveTarget
            });
        }
        return results;
    }

    function isChapterComplete(chapter, hardMode) {
        var progress = getCampaignProgress(chapter, hardMode);
        return progress.every(function(p) { return p.done; });
    }

    function isChapterUnlocked(chapter) {
        if (chapter.wave <= 1) return true;
        return (state.wave || 1) >= chapter.wave;
    }

    // ---- STAR RATING CALCULATION ----
    function calculateStarRating(chapter) {
        // 1 star: Complete all objectives (always true when claiming)
        var starCount = 1;

        // 2 stars: Complete within 5 minutes of first starting
        var startTime = state.campaign.startTimes[chapter.id];
        if (startTime) {
            var elapsed = Date.now() - startTime;
            var fiveMinutes = 5 * 60 * 1000;
            if (elapsed <= fiveMinutes) {
                starCount = 2;
            }
        } else {
            // No start time tracked means instant — give time star
            starCount = 2;
        }

        // 3 stars: No characters hospitalized during chapter
        var hospitalized = state.campaign.hospitalizedDuring[chapter.id] || 0;
        if (starCount >= 2 && hospitalized === 0) {
            starCount = 3;
        }

        return starCount;
    }

    function getTotalStars() {
        var total = 0;
        var keys = Object.keys(state.campaign.stars);
        for (var i = 0; i < keys.length; i++) {
            total += state.campaign.stars[keys[i]];
        }
        return total;
    }

    function checkStarMilestones() {
        var totalStars = getTotalStars();
        for (var i = 0; i < STAR_MILESTONES.length; i++) {
            var milestone = STAR_MILESTONES[i];
            if (totalStars >= milestone.stars && state.campaign.starMilestonesClaimed.indexOf(milestone.stars) === -1) {
                state.campaign.starMilestonesClaimed.push(milestone.stars);
                if (milestone.reward.diamonds) {
                    state.diamonds = (state.diamonds || 0) + milestone.reward.diamonds;
                    if (typeof showToast === 'function') {
                        showToast('⭐ Star Milestone! +' + milestone.reward.diamonds + ' 💎 Diamonds', 'success');
                    }
                }
            }
        }
    }

    function recordChapterStart(chapterId) {
        initCampaign();
        if (!state.campaign.startTimes[chapterId]) {
            state.campaign.startTimes[chapterId] = Date.now();
        }
    }

    function recordHospitalized(chapterId) {
        initCampaign();
        if (typeof state.campaign.hospitalizedDuring[chapterId] === 'undefined') {
            state.campaign.hospitalizedDuring[chapterId] = 0;
        }
        state.campaign.hospitalizedDuring[chapterId] += 1;
    }

    // ---- STAR DISPLAY HELPERS ----
    function renderStars(earned) {
        var html = '';
        for (var i = 1; i <= 3; i++) {
            if (i <= earned) {
                html += '<span style="color:#fbbf24;font-size:12px;text-shadow:0 0 4px rgba(251,191,36,0.5)">★</span>';
            } else {
                html += '<span style="color:#4b5563;font-size:12px">☆</span>';
            }
        }
        return html;
    }

    // ---- CLAIM CHAPTER ----
    function claimChapterReward(chapterId) {
        initCampaign();
        var isHard = state.campaign.hardMode;

        // Check correct completion list
        if (isHard) {
            if (state.campaign.completedHard.indexOf(chapterId) !== -1) return;
        } else {
            if (state.campaign.completed.indexOf(chapterId) !== -1) return;
        }

        var chapter = CHAPTERS.find(function(c) { return c.id === chapterId; });
        if (!chapter || !isChapterComplete(chapter, isHard)) return;

        // Mark completed
        if (isHard) {
            state.campaign.completedHard.push(chapterId);
        } else {
            state.campaign.completed.push(chapterId);
            // Calculate star rating for normal mode
            var stars = calculateStarRating(chapter);
            var prevStars = state.campaign.stars[chapterId] || 0;
            if (stars > prevStars) {
                state.campaign.stars[chapterId] = stars;
            }
        }

        // Award rewards (3x for hard mode)
        var rewardMultiplier = isHard ? 3 : 1;
        if (chapter.rewards.money) state.money = (state.money || 0) + (chapter.rewards.money * rewardMultiplier);
        if (chapter.rewards.xp) {
            // Distribute XP to all team members
            if (state.team) {
                var xpPer = Math.floor((chapter.rewards.xp * rewardMultiplier) / state.team.length);
                for (var i = 0; i < state.team.length; i++) {
                    var charKey = state.team[i];
                    if (typeof characters !== 'undefined' && characters[charKey]) {
                        characters[charKey].xp = (characters[charKey].xp || 0) + xpPer;
                    }
                }
            }
        }
        if (chapter.rewards.items && typeof generateEquipmentDrop === 'function') {
            for (var j = 0; j < chapter.rewards.items.length; j++) {
                var itemKey = chapter.rewards.items[j];
                if (typeof EQUIPMENT_DEFS !== 'undefined' && EQUIPMENT_DEFS[itemKey]) {
                    var def = EQUIPMENT_DEFS[itemKey];
                    var item = {
                        id: 'campaign_' + (isHard ? 'hard_' : '') + chapterId + '_' + j,
                        key: itemKey,
                        name: def.name,
                        type: def.type,
                        rarity: def.rarity,
                        stats: Object.assign({}, def.stats),
                        level: 1,
                        equippedTo: null
                    };
                    if (typeof addEquipmentToInventory === 'function') addEquipmentToInventory(item);
                }
            }
        }

        // Check star milestones
        if (!isHard) {
            checkStarMilestones();
        }

        // Show end dialogue
        if (chapter.dialogue && chapter.dialogue.end) {
            showCampaignDialogue(chapter.dialogue.end);
        }

        if (typeof SoundManager !== 'undefined') SoundManager.playFX('levelup');
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();

        // Re-render
        renderCampaignModal();
    }

    // ---- HARD MODE TOGGLE ----
    function toggleHardMode() {
        initCampaign();
        state.campaign.hardMode = !state.campaign.hardMode;
        renderCampaignModal();
    }

    // ---- DIALOGUE ----
    function showCampaignDialogue(dialogueLines, onComplete) {
        if (!dialogueLines || !dialogueLines.length) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }
        if (typeof window.showCampaignConversation === 'function') {
            window.showCampaignConversation(dialogueLines, onComplete);
        } else {
            // Fallback: simple alert if dialogue system not loaded
            var fallbackText = dialogueLines.map(function(l) { return (l.char || 'Unknown') + ': ' + l.text; }).join('\n');
            if (typeof showGameAlert === 'function') {
                showGameAlert('📖 Story', fallbackText);
            }
            if (typeof onComplete === 'function') onComplete();
        }
    }

    // ---- CAMPAIGN MODAL ----
    function openCampaignModal() {
        initCampaign();

        var existing = document.getElementById('campaign-modal');
        if (existing) existing.remove();

        var isHard = state.campaign.hardMode;

        // ---- Star Milestones Section ----
        var totalStars = getTotalStars();
        var milestonesHtml = '<div class="mb-4 p-3 rounded-xl" style="background:linear-gradient(135deg, rgba(251,191,36,0.05), rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.15)">' +
            '<div class="flex items-center justify-between mb-2">' +
                '<span class="text-[9px] font-black uppercase tracking-wider text-amber-400">⭐ Star Milestones</span>' +
                '<span class="text-[9px] font-bold text-amber-300">' + totalStars + ' Total Stars</span>' +
            '</div>';
        for (var m = 0; m < STAR_MILESTONES.length; m++) {
            var ms = STAR_MILESTONES[m];
            var claimed = state.campaign.starMilestonesClaimed.indexOf(ms.stars) !== -1;
            var reachable = totalStars >= ms.stars;
            milestonesHtml += '<div class="flex items-center justify-between py-1">' +
                '<span class="text-[8px] ' + (claimed ? 'text-green-400 line-through' : (reachable ? 'text-amber-300' : 'text-gray-500')) + '">' + ms.label + '</span>' +
                '<span class="text-[8px] font-bold ' + (claimed ? 'text-green-400' : (reachable ? 'text-amber-400' : 'text-gray-600')) + '">' +
                    (claimed ? '✅ Claimed' : (reachable ? '🎁 Ready!' : totalStars + '/' + ms.stars)) +
                '</span>' +
            '</div>';
        }
        milestonesHtml += '</div>';

        // ---- Hard Mode Toggle ----
        var hardToggleHtml = '<div class="mb-3 flex items-center justify-center">' +
            '<button onclick="toggleHardMode()" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer transition-all border ' +
            (isHard
                ? 'bg-gradient-to-r from-red-900/80 to-crimson-900/80 border-red-500/60 text-red-300 shadow-lg shadow-red-500/20"'
                : 'bg-slate-800/80 border-white/10 text-gray-400 hover:text-white hover:border-white/20"') +
            ' style="' + (isHard ? 'background:linear-gradient(135deg,rgba(220,38,38,0.3),rgba(153,27,27,0.4))' : '') + '">' +
            (isHard ? '🔥 HARD MODE ON' : '💀 Enable Hard Mode') +
            '</button>' +
        '</div>';

        var chaptersHtml = '';
        for (var i = 0; i < CHAPTERS.length; i++) {
            var ch = CHAPTERS[i];
            var unlocked = isChapterUnlocked(ch);
            var completedNormal = state.campaign.completed.indexOf(ch.id) !== -1;
            var completedHard = state.campaign.completedHard.indexOf(ch.id) !== -1;
            var completed = isHard ? completedHard : completedNormal;
            var progress = getCampaignProgress(ch, isHard);
            var allDone = progress.every(function(p) { return p.done; });

            // In hard mode, only show chapters that have been completed normally
            if (isHard && !completedNormal) {
                chaptersHtml += '<div class="mb-3" style="opacity:0.3;pointer-events:none">' +
                    '<div class="rounded-xl overflow-hidden" style="background:linear-gradient(135deg, rgba(0,0,0,0.6), rgba(10,10,20,0.8));border:2px solid #1e293b">' +
                        '<div class="flex items-center gap-3 px-4 py-3">' +
                            '<div class="text-2xl flex-shrink-0">🔒</div>' +
                            '<div class="flex-1 min-w-0">' +
                                '<div class="text-[8px] font-bold uppercase tracking-wider text-gray-500">' + ch.subtitle + '</div>' +
                                '<div class="text-white text-[12px] font-black truncate">' + ch.title + '</div>' +
                            '</div>' +
                            '<div class="text-right flex-shrink-0">' +
                                '<span class="text-gray-600 text-[8px] font-bold">Complete Normal First</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
                continue;
            }

            // Record start time when chapter is first viewed and unlocked
            if (unlocked && !completedNormal) {
                recordChapterStart(ch.id);
            }

            // Progress bar
            var totalProgress = 0;
            for (var p = 0; p < progress.length; p++) {
                totalProgress += Math.min(progress[p].current / progress[p].target, 1);
            }
            var progressPct = Math.floor((totalProgress / progress.length) * 100);

            // Border color: hard mode uses red/crimson
            var borderColor;
            if (isHard) {
                borderColor = completed ? '#22c55e' : (unlocked ? (allDone ? '#fbbf24' : '#7f1d1d') : '#1e293b');
            } else {
                borderColor = completed ? '#22c55e' : (unlocked ? (allDone ? '#fbbf24' : '#334155') : '#1e293b');
            }
            var bgGrad;
            if (isHard && !completed) {
                bgGrad = unlocked
                    ? 'linear-gradient(135deg, rgba(127,29,29,0.15), rgba(20,0,0,0.6))'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(10,10,20,0.8))';
            } else {
                bgGrad = completed ? 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(0,0,0,0.4))' :
                         (unlocked ? 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(20,20,40,0.6))' :
                         'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(10,10,20,0.8))');
            }

            // Star display for completed normal chapters
            var starsHtml = '';
            if (completedNormal && state.campaign.stars[ch.id]) {
                starsHtml = '<div class="ml-2">' + renderStars(state.campaign.stars[ch.id]) + '</div>';
            }

            // Status label
            var statusHtml = '';
            if (completed) {
                statusHtml = '<span class="text-green-400 text-[9px] font-bold">' + (isHard ? '🔥 HARD CLEAR' : 'COMPLETE') + '</span>';
            } else if (allDone) {
                statusHtml = '<span class="text-amber-400 text-[9px] font-bold animate-pulse">CLAIM!</span>';
            } else {
                statusHtml = '<span class="text-gray-500 text-[9px] font-bold">' + progressPct + '%</span>';
            }

            chaptersHtml += '<div class="mb-3" style="opacity:' + (unlocked ? '1' : '0.4') + ';pointer-events:' + (unlocked ? 'auto' : 'none') + '">' +
                '<div class="rounded-xl overflow-hidden" style="background:' + bgGrad + ';border:2px solid ' + borderColor + ';transition:all 0.3s">' +
                    // Header
                    '<div class="flex items-center gap-3 px-4 py-3">' +
                        '<div class="text-2xl flex-shrink-0">' + (completed ? '✅' : (unlocked ? ch.icon : '🔒')) + '</div>' +
                        '<div class="flex-1 min-w-0">' +
                            '<div class="text-[8px] font-bold uppercase tracking-wider text-gray-500">' +
                                ch.subtitle + (isHard ? ' <span style="color:#ef4444;font-size:7px">🔥 HARD</span>' : '') +
                            '</div>' +
                            '<div class="text-white text-[12px] font-black truncate">' + ch.title + '</div>' +
                        '</div>' +
                        '<div class="text-right flex-shrink-0 flex items-center gap-1">' +
                            starsHtml +
                            statusHtml +
                        '</div>' +
                    '</div>';

            // Expanded content for unlocked chapters that aren't completed
            if (unlocked && !completed) {
                // Rewards info (show multiplier in hard mode)
                var rewardMoney = ch.rewards.money * (isHard ? 3 : 1);
                var rewardXp = ch.rewards.xp * (isHard ? 3 : 1);

                chaptersHtml += '<div class="px-4 pb-3">' +
                    '<div class="text-gray-400 text-[9px] leading-relaxed mb-3">' + ch.desc + '</div>' +
                    // Progress bar
                    '<div class="h-1.5 bg-black/40 rounded-full overflow-hidden mb-3">' +
                        '<div class="h-full rounded-full transition-all" style="width:' + progressPct + '%;background:linear-gradient(90deg, ' + (isHard ? '#ef4444, #b91c1c' : '#3b82f6, #8b5cf6') + ')"></div>' +
                    '</div>';

                // Objectives
                for (var o = 0; o < progress.length; o++) {
                    var obj = progress[o];
                    var objPct = Math.min(Math.floor((obj.current / obj.target) * 100), 100);
                    chaptersHtml += '<div class="flex items-center gap-2 mb-1.5">' +
                        '<span class="text-[10px]">' + (obj.done ? '✅' : '⬜') + '</span>' +
                        '<span class="text-[9px] flex-1 ' + (obj.done ? 'text-green-400 line-through' : 'text-gray-300') + '">' + obj.label +
                            (isHard ? ' <span style="color:#ef4444;font-size:7px">(2x)</span>' : '') +
                        '</span>' +
                        '<span class="text-[8px] font-mono ' + (obj.done ? 'text-green-400' : 'text-gray-500') + '">' +
                            Math.min(obj.current, obj.target) + '/' + obj.target +
                        '</span>' +
                    '</div>';
                }

                // Rewards preview
                chaptersHtml += '<div class="flex items-center gap-2 mt-3 pt-2 border-t border-white/5">' +
                    '<span class="text-[8px] text-gray-500 uppercase font-bold">Rewards' + (isHard ? ' (3x)' : '') + ':</span>';
                if (ch.rewards.money) chaptersHtml += '<span class="text-[8px] text-green-400 font-bold">$' + rewardMoney.toLocaleString() + '</span>';
                if (ch.rewards.xp) chaptersHtml += '<span class="text-[8px] text-blue-400 font-bold">' + rewardXp + ' XP</span>';
                if (ch.rewards.items) chaptersHtml += '<span class="text-[8px] text-purple-400 font-bold">🎁 Equipment</span>';
                chaptersHtml += '</div>';

                // Claim button if ready
                if (allDone) {
                    chaptersHtml += '<button onclick="claimChapterReward(\'' + ch.id + '\')" class="w-full mt-3 bg-gradient-to-r ' +
                        (isHard ? 'from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 border-red-500/50 shadow-red-500/20' :
                                  'from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border-amber-500/50 shadow-amber-500/20') +
                        ' text-white font-black text-[10px] py-2.5 rounded-lg cursor-pointer border uppercase tracking-wider transition-all shadow-lg">' +
                        (isHard ? '🔥 CLAIM HARD REWARDS' : '🏆 CLAIM REWARDS') +
                    '</button>';
                }

                chaptersHtml += '</div>';
            }

            // Completed chapter - collapsed with checkmark and stars
            if (completed) {
                chaptersHtml += '<div class="px-4 pb-2">' +
                    '<div class="text-green-400/60 text-[8px]">' +
                        (isHard ? 'Hard mode completed • 3x Rewards claimed' : 'All objectives completed • Rewards claimed') +
                    '</div>' +
                '</div>';
            }

            chaptersHtml += '</div></div>';
        }

        // Overall campaign stats
        var completedList = isHard ? state.campaign.completedHard : state.campaign.completed;
        var completedCount = completedList.length;
        var totalCount = CHAPTERS.length;
        var overallPct = Math.floor((completedCount / totalCount) * 100);

        var modal = document.createElement('div');
        modal.id = 'campaign-modal';
        modal.className = 'fixed inset-0 z-[9300] flex items-center justify-center';
        modal.innerHTML = '' +
            '<div class="absolute inset-0 bg-black/60" onclick="closeCampaignModal()"></div>' +
            '<div class="relative bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl max-w-[420px] w-full mx-4 shadow-2xl overflow-hidden" style="max-height:85vh;' + (isHard ? 'border-color:rgba(239,68,68,0.3)' : '') + '">' +
                // Header
                '<div class="px-5 py-3 border-b border-white/10">' +
                    '<div class="flex items-center justify-between">' +
                        '<div class="flex items-center gap-2">' +
                            '<span class="font-black text-white text-[14px] uppercase tracking-widest">' + (isHard ? '🔥' : '📖') + ' Campaign</span>' +
                            '<span class="' + (isHard ? 'bg-red-600/30 text-red-300' : 'bg-purple-600/30 text-purple-300') + ' text-[8px] font-bold px-2 py-0.5 rounded-full">' +
                                completedCount + '/' + totalCount + (isHard ? ' Hard' : '') +
                            '</span>' +
                        '</div>' +
                        '<button onclick="closeCampaignModal()" class="text-gray-400 hover:text-white text-xl cursor-pointer leading-none">✕</button>' +
                    '</div>' +
                    // Overall progress bar
                    '<div class="mt-2 h-1.5 bg-black/40 rounded-full overflow-hidden">' +
                        '<div class="h-full rounded-full transition-all" style="width:' + overallPct + '%;background:linear-gradient(90deg, ' + (isHard ? '#ef4444, #b91c1c' : '#22c55e, #4ade80') + ')"></div>' +
                    '</div>' +
                    '<div class="text-[8px] text-gray-500 mt-1">' + overallPct + '% ' + (isHard ? 'Hard Mode' : 'Campaign') + ' Complete' + (completedCount === totalCount ? ' — 🎉 ALL CLEAR!' : '') + '</div>' +
                '</div>' +
                // Chapters
                '<div class="p-4 overflow-y-auto" style="max-height:calc(85vh - 80px);">' +
                    hardToggleHtml +
                    milestonesHtml +
                    chaptersHtml +
                '</div>' +
            '</div>';

        document.body.appendChild(modal);
    }

    function closeCampaignModal() {
        var modal = document.getElementById('campaign-modal');
        if (modal) modal.remove();
    }

    function renderCampaignModal() {
        closeCampaignModal();
        openCampaignModal();
    }

    // ---- CSS ANIMATION ----
    if (!document.getElementById('campaign-styles')) {
        var style = document.createElement('style');
        style.id = 'campaign-styles';
        style.textContent = '@keyframes slideUp { from { transform: translateY(40px); opacity:0; } to { transform: translateY(0); opacity:1; } }';
        document.head.appendChild(style);
    }

    // Exports
    window.openCampaignModal = openCampaignModal;
    window.closeCampaignModal = closeCampaignModal;
    window.claimChapterReward = claimChapterReward;
    window.showCampaignDialogue = showCampaignDialogue;
    window.CAMPAIGN_CHAPTERS = CHAPTERS;
    window.toggleHardMode = toggleHardMode;
    window.recordHospitalized = recordHospitalized;
    window.recordChapterStart = recordChapterStart;
    window.getCampaignProgress = getCampaignProgress;
    window.getTotalStars = getTotalStars;
    window.initCampaign = initCampaign;
})();
