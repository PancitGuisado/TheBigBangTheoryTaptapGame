// ============================================================
// CHAT SYSTEM — Global, Guild & Friend Chat
// Real multiplayer chat via Supabase Realtime + bot filler
// ============================================================

(function() {
    'use strict';

    // ---- CONSTANTS ----
    var MAX_MESSAGES = 100;
    var MAX_MSG_LEN = 200;
    var SEND_COOLDOWN = 3000; // 3s between messages
    var GLOBAL_BOT_MIN = 40000; // 40s (slower, real messages fill the gap)
    var GLOBAL_BOT_MAX = 90000; // 90s
    var GUILD_BOT_MIN = 45000;
    var GUILD_BOT_MAX = 90000;
    var FRIEND_REPLY_MIN = 5000;
    var FRIEND_REPLY_MAX = 30000;
    var FETCH_LIMIT = 50; // messages to load from DB

    var chatOpen = false;
    var activeTab = 'global';
    var activeFriendId = null;
    var lastSendTime = 0;
    var globalBotTimer = null;
    var guildBotTimer = null;
    var msgIdCounter = Date.now();
    var friendReplyTimers = {};

    // Supabase realtime subscriptions
    var globalSubscription = null;
    var guildSubscription = null;
    var _realtimeInitialized = false;
    var _lastFetchTime = { global: 0, guild: 0 };

    // ---- ESCAPE HELPER ----
    function esc(s) {
        return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    // ---- CHARACTER MESSAGES (bot filler) ----
    var CHARACTER_MESSAGES = {
        'Sheldon': [
            'Fun fact: the speed of light in a vacuum is exactly 299,792,458 meters per second.',
            'I just calculated the optimal formation. You\'re all doing it wrong.',
            'Bazinga! 🎯',
            'Has anyone here read the latest issue of The Flash? Disappointing.',
            'My spot on the couch is non-negotiable. This extends to battle formations.',
            'I don\'t need luck. I have probability and a superior intellect.',
            'According to my calculations, you should all be 37% more efficient.',
            'I\'m not crazy. My mother had me tested.',
            'Soft kitty, warm kitty, little ball of fur... Sorry, wrong chat. 😳',
            'The Roommate Agreement clearly states: no spoilers in global chat.',
            'Why would I need a guild? I\'m a one-man army of intellect.',
            'I propose we implement a three-strike system for bad strategies.'
        ],
        'Howard': [
            'Ladies, the engineer has arrived. 😎',
            'Did I mention I\'ve been to space? Because I\'ve been to space.',
            'My robot designs are clearly superior to whatever you\'re crafting.',
            'If NASA trusts me, you should trust my formation advice. 🚀',
            'I could build a better game engine in my garage.',
            'My mother wants to know if anyone needs a snack. ANYONE?!',
            'Fun fact: I once drove the Mars Rover into a ditch.',
            'Belt buckle game: still undefeated. 🏆',
            'Engineering > Physics. Fight me.',
            'I\'m not short, I\'m aerodynamic for space travel.'
        ],
        'Penny': [
            'Ugh, another double shift at the Cheesecake Factory.',
            'Can someone explain what "prestige" means? In small words?',
            'I just one-shot that boss. Who needs physics? 💪',
            'Nebraska girl beats all your fancy science. Deal with it.',
            'Does this game have a shoe store? Asking for me. 👠',
            'Sheldon, if you correct me one more time in chat...',
            'Just hit a new wave record! Cheesecake Factory training pays off.',
            'Anyone want wine? I have wine. 🍷',
            'I understood like... 10% of what Sheldon just said.',
            'My acting career prepared me for dramatic boss battles!'
        ],
        'Raj': [
            'The stars are beautiful tonight... just like my loneliness.',
            'I can\'t talk to girls, but I CAN talk smack in PVP. 🏆',
            'Does anyone want to grab dinner? Please?',
            'My dog Cinnamon is my only true companion. 🐕',
            'I spent my trust fund on in-game upgrades. No regrets.',
            'The celestial alignment suggests good drops today! ✨',
            'Has anyone seen my scarf? It\'s cashmere. CASHMERE.',
            'I made a gourmet meal for my team. +500% morale.',
            'Being alone at night gives me time to grind waves.',
            'I hosted a murder mystery party in my guild hall. Nobody came. 😢'
        ],
        'Leonard': [
            'Just finished a 12-hour experiment. Time to idle. 🧪',
            'Sheldon keeps rearranging my formation without asking.',
            'I think my team is finally optimized. Sheldon disagrees.',
            'Living with Sheldon is harder than any boss in this game.',
            'My experimental physics background helps with damage calcs.',
            'Can we all just agree that teamwork matters? Please?',
            'Penny smiled at me today. Best day ever. 💛',
            'I need new glasses. Too much screen time. 🤓',
            'Lactose intolerance won\'t stop me from raiding!',
            'The real experiment is seeing how long I can idle without checking.'
        ],
        'Amy': [
            'Fascinating neural pathway activation patterns in this game.',
            'Sheldon, I require a date night. The game can wait.',
            'My neuroscience research suggests optimal play times are 2-4 PM.',
            'I\'ve mapped the dopamine response curve for loot drops. 🧠',
            'Bestie alert! Anyone want to be my bestie? 💚',
            'The prefrontal cortex lights up when you get a legendary drop.',
            'I dissected a virtual brain today. Very satisfying.',
            'Sheldon won\'t let me join his guild. Typical.',
            'Fun neurological fact: addiction to idle games is REAL.',
            'I knit a sweater for every guild member. You\'re welcome.'
        ],
        'Bernadette': [
            'DON\'T MAKE ME COME OVER THERE. 😤',
            'Howard, stop bragging about space in the chat.',
            'I may be small but I will DESTROY you in PVP.',
            'My pharmaceutical knowledge gives me +50% potion efficiency.',
            'If you think I\'m scary, you haven\'t met my mother-in-law.',
            'I manage a team of 20 scientists. Managing a guild is easy.',
            'WHO ATE MY LUNCH FROM THE GUILD FRIDGE?! 🔥',
            'Don\'t let the sweet voice fool you. I\'m terrifying.',
            'I made Howard cry three times this week. New record!',
            'Micro-organisms are more organized than this guild.'
        ],
        'Stuart': [
            'Anyone want to buy some comics? The store is... struggling.',
            'I found a legendary drop! ...in my dreams. 😢',
            'My comic book store has WiFi now! Still no customers.',
            'I can\'t afford potions. I can barely afford the store rent.',
            'Does anyone else play this game to feel less alone? Just me?',
            'I drew fan art of my team. Nobody noticed.',
            'The bankruptcy is going great, thanks for asking.',
            'Free comic with every guild donation! (Comics may be water damaged.)',
            'I slept in the store again. The floor is surprisingly comfortable.',
            'If I sell one more comic, I can afford a healing potion!'
        ]
    };

    var CHARACTER_NAMES = Object.keys(CHARACTER_MESSAGES);
    var CHARACTER_EMOJIS = {
        'Sheldon': '🧪', 'Howard': '🚀', 'Penny': '🍷', 'Raj': '⭐',
        'Leonard': '🤓', 'Amy': '🧠', 'Bernadette': '😤', 'Stuart': '📚'
    };

    // ---- SYSTEM MESSAGES ----
    var SYSTEM_TEMPLATES = [
        '{player} reached Wave {wave}! 🎉',
        '{player} found Legendary {item}! ⚔️',
        '{player} won {num} PVP battles in a row! 🏆',
        '{player} just prestiged! ✨',
        '{player} joined a guild! 🏰',
        '{player} crafted an Epic weapon! 🔨',
        '{player} completed the Daily Challenge! 🌟',
        '{player} reached {num} total power! 💪',
        '{player} donated {num} gold to their guild! 💰',
        '{player} unlocked a new character! 🎭'
    ];

    var FAKE_PLAYERS = [
        'xX_Bazinga_Xx', 'CooperFan99', 'QuantumKnight', 'SheldonBot3000',
        'PennyBlossomGirl', 'RocketManHoward', 'StarGazerRaj', 'ComicBookGuy42',
        'NerdHerd_Leader', 'WaveDestroyer', 'IdleMaster_Pro', 'PhysicsBro',
        'CheesecakeSlayer', 'DrCooper_Jr', 'AstroNerd88', 'GuildCrusher',
        'LootGoblin420', 'PrestigePanda', 'BattleBoss_X', 'DarkMatter99',
        'ScienceRules', 'BigBangFan01', 'WolowitzSpace', 'AmyFarrahFowl',
        'BernadetteMD', 'PasadenaHero', 'FormationKing', 'DiamondHunter',
        'RaidLeader_Z', 'CriticalHit77'
    ];

    var FAKE_ITEMS = [
        'Excalibur', 'Staff of Wisdom', 'Quantum Shield', 'Dark Matter Blade',
        'Cosmic Gauntlets', 'Bazinga Wand', 'Roommate Armor', 'NASA Helmet',
        'Neutrino Bow', 'Entropy Dagger', 'Plasma Cannon', 'Cheesecake Scepter'
    ];

    var RANDOM_PLAYER_MSGS = [
        'gg everyone', 'how do i get more diamonds?',
        'what\'s the best formation for wave 50+?', 'anyone selling resources?',
        'just prestiged for the first time! 🎉', 'this game is so addicting lol',
        'LFG for guild raids', 'which character should I level up first?',
        'does anyone know the boss weakness on wave 30?', 'my RNG is so bad today 😭',
        'finally beat that boss after 20 tries!', 'trading iron for gold, 2:1 ratio',
        'the new update is fire 🔥', 'can someone carry me through raids?',
        'what does prestige actually do?', 'just got my first legendary!! 🎉🎉',
        'how do guilds work?', 'brb cheesecake factory break 🍰',
        'sheldon would approve of my formation', 'anyone else playing at 3am? no? just me? 😅',
        'i love this game sm', 'tips for new players?', 'when is the next event?',
        'my team comp is insane rn', 'f2p btw 💎'
    ];

    var GUILD_MEMBER_MSGS = [
        'good morning everyone! ☀️', 'anyone want to do a raid?',
        'just reached wave 45!', 'need help with the guild boss',
        'donated 500 gold to the guild', 'our guild is the best! 🏰',
        'who\'s online for raids?', 'nice work on that raid everyone! 💪',
        'i upgraded my formation, check it out', 'we need more members for the boss',
        'gg on the guild raid!', 'just promoted! thanks leader! 🌟',
        'let\'s push for top 10 guilds!', 'anyone have extra resources to share?',
        'the guild buff is so clutch', 'happy to be part of this guild 😊',
        'raid starts in 5 minutes!', 'our defense is looking solid',
        'donated my daily limit already!', 'we should coordinate our formations'
    ];

    var GUILD_MEMBER_NAMES = [
        'GuildKnight', 'RaidMaster', 'ElderWise', 'TankBro',
        'HealerMain', 'DPS_Queen', 'ShieldWall', 'LootSharer',
        'GuildRecruit', 'VeteranX', 'BuffBot', 'StrategyGuru',
        'NightOwl', 'DawnRaider', 'SilentBlade'
    ];

    // ---- FRIEND REPLY LOGIC ----
    var FRIEND_REPLIES_GREETING = [
        'hey! how\'s it going? 😊', 'hi there! what\'s up?',
        'hey!! long time no chat!', 'yo! how\'s the grind going?',
        'hiii! 👋', 'hey friend! miss ya!'
    ];

    var FRIEND_REPLIES_GENERIC = [
        'haha nice! 😂', 'that\'s awesome!', 'no way, really?',
        'I totally agree', 'same tbh 😅', 'lol true',
        'oh interesting!', 'yeah for sure!', 'omg tell me more',
        'brb, raid starting! 🏰', 'nice! keep it up! 💪',
        'haha that\'s so funny', 'I was just thinking the same thing',
        'you\'re the best! 🌟', 'let\'s play together later!',
        'gotta go soon but this is fun', 'what wave are you on?',
        'I just got a legendary drop btw!', 'wanna do some PVP later?',
        'your team is looking strong!'
    ];

    // ---- HELPERS ----
    function genId() { return 'msg_' + (++msgIdCounter); }
    function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function now() { return Date.now(); }

    function formatTime(ts) {
        var d = new Date(ts);
        var h = d.getHours();
        var m = d.getMinutes();
        var ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12; if (h === 0) h = 12;
        return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
    }

    function getPlayerName() {
        if (typeof currentUser !== 'undefined' && currentUser && currentUser.username) return currentUser.username;
        if (typeof state !== 'undefined' && state && state.guestName) return state.guestName;
        return 'Player';
    }

    function getPlayerId() {
        if (typeof currentUser !== 'undefined' && currentUser && currentUser.id) return currentUser.id;
        return null;
    }

    function isGuestPlayer() {
        return typeof isGuest !== 'undefined' && isGuest;
    }

    function getSupabase() {
        if (typeof db !== 'undefined' && db && db.from) return db;
        if (typeof supabase !== 'undefined' && supabase && supabase.from) return supabase;
        return null;
    }

    function hasGuild() {
        return typeof currentGuild !== 'undefined' && currentGuild && currentGuild.name;
    }

    function getGuildId() {
        if (typeof currentGuild !== 'undefined' && currentGuild && currentGuild.id) return currentGuild.id;
        return null;
    }

    function getFriendsList() {
        if (typeof state !== 'undefined' && state && Array.isArray(state.friends)) return state.friends;
        return [];
    }

    // ---- STATE INIT ----
    function initChatState() {
        if (!state.chat) {
            state.chat = {
                global: [],
                guild: [],
                friends: {},
                lastRead: { global: 0, guild: 0, friends: {} },
                settings: { muted: false }
            };
        }
        if (!state.chat.global) state.chat.global = [];
        if (!state.chat.guild) state.chat.guild = [];
        if (!state.chat.friends) state.chat.friends = {};
        if (!state.chat.lastRead) state.chat.lastRead = { global: 0, guild: 0, friends: {} };
        if (!state.chat.lastRead.friends) state.chat.lastRead.friends = {};
        if (!state.chat.settings) state.chat.settings = { muted: false };
    }

    // ============================================================
    // SUPABASE REALTIME — Fetch + Subscribe
    // ============================================================

    // Fetch recent messages from database
    function fetchMessages(channel) {
        var supa = getSupabase();
        if (!supa) return;

        var query = supa.from('chat_messages')
            .select('*')
            .eq('channel', channel)
            .order('created_at', { ascending: false })
            .limit(FETCH_LIMIT);

        // Guild filter
        if (channel === 'guild') {
            var gId = getGuildId();
            if (!gId) return;
            query = query.eq('guild_id', gId);
        }

        query.then(function(result) {
            if (result.error) {
                console.warn('[Chat] Fetch error:', result.error.message);
                return;
            }
            if (!result.data || result.data.length === 0) return;

            initChatState();
            // Convert DB rows to local message format, reverse for chronological order
            var dbMessages = result.data.reverse().map(function(row) {
                return {
                    id: row.id,
                    sender: row.sender_name,
                    text: row.text,
                    timestamp: new Date(row.created_at).getTime(),
                    type: row.sender_id === getPlayerId() ? 'player' : 'real',
                    channel: channel,
                    senderId: row.sender_id
                };
            });

            // Merge with existing local messages (keep bot messages, add real ones)
            var localMsgs = state.chat[channel] || [];
            var existingIds = {};
            for (var i = 0; i < localMsgs.length; i++) {
                existingIds[localMsgs[i].id] = true;
            }

            var newMsgs = [];
            for (var j = 0; j < dbMessages.length; j++) {
                if (!existingIds[dbMessages[j].id]) {
                    newMsgs.push(dbMessages[j]);
                }
            }

            if (newMsgs.length > 0) {
                // Merge and sort by timestamp
                state.chat[channel] = localMsgs.concat(newMsgs);
                state.chat[channel].sort(function(a, b) { return a.timestamp - b.timestamp; });
                // Cap at max
                if (state.chat[channel].length > MAX_MESSAGES) {
                    state.chat[channel] = state.chat[channel].slice(-MAX_MESSAGES);
                }
                if (chatOpen && activeTab === channel) renderMessages();
            }

            _lastFetchTime[channel] = now();
        }).catch(function(err) {
            console.warn('[Chat] Fetch exception:', err);
        });
    }

    // Subscribe to realtime inserts
    function subscribeToChannel(channel) {
        var supa = getSupabase();
        if (!supa || !supa.channel) return;

        var channelName = 'chat-' + channel;
        if (channel === 'guild') {
            var gId = getGuildId();
            if (!gId) return;
            channelName = 'chat-guild-' + gId;
        }

        // Build filter
        var filter = 'channel=eq.' + channel;
        if (channel === 'guild') {
            filter += ',guild_id=eq.' + getGuildId();
        }

        var sub = supa.channel(channelName)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'chat_messages',
                filter: filter
            }, function(payload) {
                var row = payload.new;
                if (!row) return;

                // Skip our own messages (already added locally)
                if (row.sender_id === getPlayerId()) return;

                var msg = {
                    id: row.id,
                    sender: row.sender_name,
                    text: row.text,
                    timestamp: new Date(row.created_at).getTime(),
                    type: 'real',
                    channel: channel,
                    senderId: row.sender_id
                };

                addMessage(channel, msg);
            })
            .subscribe(function(status) {
                console.log('[Chat] Realtime ' + channel + ':', status);
            });

        if (channel === 'global') {
            globalSubscription = sub;
        } else if (channel === 'guild') {
            guildSubscription = sub;
        }
    }

    function unsubscribeAll() {
        var supa = getSupabase();
        if (!supa) return;
        if (globalSubscription) {
            supa.removeChannel(globalSubscription);
            globalSubscription = null;
        }
        if (guildSubscription) {
            supa.removeChannel(guildSubscription);
            guildSubscription = null;
        }
    }

    function initRealtime() {
        if (_realtimeInitialized) return;
        _realtimeInitialized = true;

        // Subscribe to global always
        subscribeToChannel('global');
        // Subscribe to guild if player has one
        if (hasGuild() && getGuildId()) {
            subscribeToChannel('guild');
        }
    }

    // Send message to database
    function sendToDatabase(channel, text) {
        var supa = getSupabase();
        var playerId = getPlayerId();
        if (!supa || !playerId) return; // guests can't send

        var row = {
            channel: channel,
            sender_id: playerId,
            sender_name: getPlayerName(),
            text: text
        };

        if (channel === 'guild') {
            row.guild_id = getGuildId();
        }

        supa.from('chat_messages').insert(row).then(function(result) {
            if (result.error) {
                console.warn('[Chat] Send error:', result.error.message);
            }
        }).catch(function(err) {
            console.warn('[Chat] Send exception:', err);
        });
    }

    // ============================================================
    // MESSAGE MANAGEMENT
    // ============================================================

    function addMessage(channel, msg, friendId) {
        initChatState();
        if (channel === 'friend' && friendId) {
            if (!state.chat.friends[friendId]) state.chat.friends[friendId] = [];
            state.chat.friends[friendId].push(msg);
            if (state.chat.friends[friendId].length > MAX_MESSAGES) {
                state.chat.friends[friendId] = state.chat.friends[friendId].slice(-MAX_MESSAGES);
            }
        } else if (channel === 'global') {
            state.chat.global.push(msg);
            if (state.chat.global.length > MAX_MESSAGES) {
                state.chat.global = state.chat.global.slice(-MAX_MESSAGES);
            }
        } else if (channel === 'guild') {
            state.chat.guild.push(msg);
            if (state.chat.guild.length > MAX_MESSAGES) {
                state.chat.guild = state.chat.guild.slice(-MAX_MESSAGES);
            }
        }

        updateUnreadBadge();

        // Sound for non-player messages
        if (msg.type !== 'player') {
            if (typeof SoundManager !== 'undefined' && typeof SoundManager.playFX === 'function' && !state.chat.settings.muted) {
                try { SoundManager.playFX('notification'); } catch(e) {}
            }
        }

        if (chatOpen) {
            if (channel === activeTab || (channel === 'friend' && activeTab === 'friend')) {
                renderMessages();
            }
        }
    }

    function getMessages(channel, friendId) {
        initChatState();
        if (channel === 'friend' && friendId) {
            return state.chat.friends[friendId] || [];
        }
        return state.chat[channel] || [];
    }

    // ---- UNREAD BADGE ----
    function countUnread() {
        initChatState();
        var count = 0;
        var lr = state.chat.lastRead;

        var gMsgs = state.chat.global;
        for (var i = gMsgs.length - 1; i >= 0; i--) {
            if (gMsgs[i].timestamp > (lr.global || 0)) count++;
            else break;
        }

        var guMsgs = state.chat.guild;
        for (var j = guMsgs.length - 1; j >= 0; j--) {
            if (guMsgs[j].timestamp > (lr.guild || 0)) count++;
            else break;
        }

        var fKeys = Object.keys(state.chat.friends);
        for (var k = 0; k < fKeys.length; k++) {
            var fId = fKeys[k];
            var fMsgs = state.chat.friends[fId];
            var fLr = lr.friends[fId] || 0;
            for (var l = fMsgs.length - 1; l >= 0; l--) {
                if (fMsgs[l].timestamp > fLr) count++;
                else break;
            }
        }

        return count;
    }

    function updateUnreadBadge() {
        var badge = document.getElementById('chat-unread-badge');
        if (!badge) return;
        var count = countUnread();
        if (count > 0) {
            badge.style.display = 'flex';
            badge.textContent = count > 99 ? '99+' : count;
            var btn = document.getElementById('chat-toggle-btn');
            if (btn) {
                btn.style.animation = 'chatPulse 0.6s ease-in-out';
                setTimeout(function() { btn.style.animation = ''; }, 700);
            }
        } else {
            badge.style.display = 'none';
        }
    }

    function markAsRead(channel, friendId) {
        initChatState();
        var t = now();
        if (channel === 'friend' && friendId) {
            state.chat.lastRead.friends[friendId] = t;
        } else {
            state.chat.lastRead[channel] = t;
        }
        updateUnreadBadge();
    }

    // ---- BOT MESSAGE GENERATION (ambient filler) ----
    function generateCharacterMessage() {
        var char = pick(CHARACTER_NAMES);
        var text = pick(CHARACTER_MESSAGES[char]);
        return {
            id: genId(), sender: char + ' ' + (CHARACTER_EMOJIS[char] || ''),
            text: text, timestamp: now(), type: 'bot', channel: 'global'
        };
    }

    function generateSystemMessage() {
        var template = pick(SYSTEM_TEMPLATES);
        var text = template
            .replace('{player}', pick(FAKE_PLAYERS))
            .replace('{wave}', randInt(10, 200))
            .replace('{item}', pick(FAKE_ITEMS))
            .replace('{num}', randInt(5, 500));
        return {
            id: genId(), sender: 'SYSTEM', text: text,
            timestamp: now(), type: 'system', channel: 'global'
        };
    }

    function generateRandomPlayerMessage() {
        return {
            id: genId(), sender: pick(FAKE_PLAYERS),
            text: pick(RANDOM_PLAYER_MSGS), timestamp: now(),
            type: 'bot', channel: 'global'
        };
    }

    function generateGuildMemberMessage() {
        var senderName = pick(GUILD_MEMBER_NAMES);
        if (typeof currentGuildMembers !== 'undefined' && currentGuildMembers && currentGuildMembers.length > 0) {
            var member = pick(currentGuildMembers);
            if (member && member.display_name) senderName = member.display_name;
        }
        return {
            id: genId(), sender: senderName,
            text: pick(GUILD_MEMBER_MSGS), timestamp: now(),
            type: 'bot', channel: 'guild'
        };
    }

    // ---- BOT TIMERS ----
    function startGlobalBotTimer() {
        stopGlobalBotTimer();
        var delay = randInt(GLOBAL_BOT_MIN, GLOBAL_BOT_MAX);
        globalBotTimer = setTimeout(function() {
            var roll = Math.random();
            var msg;
            if (roll < 0.4) msg = generateCharacterMessage();
            else if (roll < 0.7) msg = generateSystemMessage();
            else msg = generateRandomPlayerMessage();
            addMessage('global', msg);
            if (chatOpen) startGlobalBotTimer();
        }, delay);
    }

    function stopGlobalBotTimer() {
        if (globalBotTimer) { clearTimeout(globalBotTimer); globalBotTimer = null; }
    }

    function startGuildBotTimer() {
        stopGuildBotTimer();
        if (!hasGuild()) return;
        var delay = randInt(GUILD_BOT_MIN, GUILD_BOT_MAX);
        guildBotTimer = setTimeout(function() {
            var msg = generateGuildMemberMessage();
            addMessage('guild', msg);
            if (chatOpen) startGuildBotTimer();
        }, delay);
    }

    function stopGuildBotTimer() {
        if (guildBotTimer) { clearTimeout(guildBotTimer); guildBotTimer = null; }
    }

    function scheduleFriendReply(friendId, playerText) {
        if (friendReplyTimers[friendId]) clearTimeout(friendReplyTimers[friendId]);
        var delay = randInt(FRIEND_REPLY_MIN, FRIEND_REPLY_MAX);
        friendReplyTimers[friendId] = setTimeout(function() {
            var replyText;
            var lowerText = (playerText || '').toLowerCase().trim();
            if (/^(hi|hey|hello|yo|sup|hii+|howdy|what'?s up)/.test(lowerText)) {
                replyText = pick(FRIEND_REPLIES_GREETING);
            } else {
                replyText = pick(FRIEND_REPLIES_GENERIC);
            }

            var friends = getFriendsList();
            var friendObj = null;
            for (var i = 0; i < friends.length; i++) {
                var fid = friends[i].id || friends[i].name;
                if (fid === friendId) { friendObj = friends[i]; break; }
            }
            var senderName = friendObj ? friendObj.name : 'Friend';

            var msg = {
                id: genId(), sender: senderName, text: replyText,
                timestamp: now(), type: 'bot', channel: 'friend'
            };
            addMessage('friend', msg, friendId);
            delete friendReplyTimers[friendId];
        }, delay);
    }

    // ---- SEED INITIAL MESSAGES (only for empty chats) ----
    function seedInitialMessages() {
        initChatState();
        if (state.chat.global.length > 0) return;

        var seedCount = randInt(8, 12);
        var baseTime = now() - (seedCount * 30000);
        for (var i = 0; i < seedCount; i++) {
            var roll = Math.random();
            var msg;
            if (roll < 0.4) msg = generateCharacterMessage();
            else if (roll < 0.7) msg = generateSystemMessage();
            else msg = generateRandomPlayerMessage();
            msg.timestamp = baseTime + (i * randInt(15000, 35000));
            state.chat.global.push(msg);
        }

        if (hasGuild()) {
            for (var g = 0; g < 3; g++) {
                var gMsg = generateGuildMemberMessage();
                gMsg.timestamp = baseTime + (g * randInt(20000, 40000));
                state.chat.guild.push(gMsg);
            }
        }
    }

    // ============================================================
    // RENDER
    // ============================================================

    function renderChatPanel() {
        var panel = document.getElementById('chat-panel');
        if (!panel) return;

        var tabGlobalActive = activeTab === 'global';
        var tabGuildActive = activeTab === 'guild';
        var tabFriendActive = activeTab === 'friend';

        var tabStyle = 'padding:8px 12px;border:none;cursor:pointer;font-size:12px;font-weight:700;border-radius:6px 6px 0 0;transition:all 0.2s;';
        var activeStyle = 'background:rgba(245,158,11,0.2);color:#f59e0b;border-bottom:2px solid #f59e0b;';
        var inactiveStyle = 'background:transparent;color:#9ca3af;border-bottom:2px solid transparent;';

        var html = '';
        // Header
        html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px 0 14px;border-bottom:1px solid rgba(255,255,255,0.08);background:rgba(10,18,35,0.95);">';
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:#f59e0b;letter-spacing:1px;">💬 CHAT</div>';
        html += '<div style="display:flex;gap:4px;align-items:center;">';
        var muteIcon = state.chat && state.chat.settings && state.chat.settings.muted ? '🔇' : '🔊';
        html += '<button onclick="window._chatToggleMute()" style="background:none;border:none;cursor:pointer;font-size:16px;padding:4px;" title="Toggle sound">' + muteIcon + '</button>';
        html += '<button onclick="window.toggleChatPanel()" style="background:none;border:none;color:#9ca3af;cursor:pointer;font-size:18px;font-weight:bold;padding:4px 8px;line-height:1;" title="Close">&times;</button>';
        html += '</div></div>';

        // Live indicator
        var supa = getSupabase();
        var isLive = supa && !isGuestPlayer();
        html += '<div style="display:flex;align-items:center;gap:4px;padding:2px 14px;background:rgba(10,18,35,0.95);font-size:9px;">';
        if (isLive) {
            html += '<div style="width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px #22c55e;"></div>';
            html += '<span style="color:#22c55e;font-weight:700;text-transform:uppercase;letter-spacing:1px;">LIVE</span>';
        } else {
            html += '<div style="width:6px;height:6px;border-radius:50%;background:#6b7280;"></div>';
            html += '<span style="color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:1px;">OFFLINE</span>';
        }
        html += '</div>';

        // Tabs
        html += '<div style="display:flex;gap:2px;padding:0 14px;background:rgba(10,18,35,0.95);">';
        html += '<button onclick="window._chatSwitchTab(\'global\')" style="' + tabStyle + (tabGlobalActive ? activeStyle : inactiveStyle) + '">🌐 Global</button>';
        html += '<button onclick="window._chatSwitchTab(\'guild\')" style="' + tabStyle + (tabGuildActive ? activeStyle : inactiveStyle) + '">🏰 Guild</button>';
        html += '<button onclick="window._chatSwitchTab(\'friend\')" style="' + tabStyle + (tabFriendActive ? activeStyle : inactiveStyle) + '">👤 Friends</button>';
        html += '</div>';

        // Message area
        html += '<div id="chat-messages-area" style="flex:1;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;gap:6px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.15) transparent;">';
        html += '</div>';

        // Input bar
        var showInput = (activeTab !== 'friend' || activeFriendId);
        if (showInput) {
            html += '<div style="padding:8px 14px;border-top:1px solid rgba(255,255,255,0.08);display:flex;gap:8px;align-items:center;background:rgba(10,18,35,0.98);">';
            if (activeTab === 'friend' && activeFriendId) {
                html += '<button onclick="window._chatBackToFriendList()" style="background:none;border:none;color:#9ca3af;cursor:pointer;font-size:16px;padding:4px;" title="Back">←</button>';
            }

            // Guest players see login prompt instead of input
            if (isGuestPlayer() && activeTab !== 'friend') {
                html += '<div style="flex:1;text-align:center;padding:8px;font-size:11px;color:#6b7280;">🔒 <span style="color:#f59e0b;font-weight:700;">Log in</span> to send messages to other players</div>';
            } else {
                html += '<input id="chat-input" type="text" maxlength="' + MAX_MSG_LEN + '" placeholder="Type a message..." style="flex:1;background:rgba(30,41,59,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:8px 14px;color:white;font-size:13px;outline:none;font-family:inherit;" onkeydown="if(event.key===\'Enter\')window._chatSendMessage()">';
                html += '<button onclick="window._chatSendMessage()" style="background:linear-gradient(135deg,#f59e0b,#d97706);border:none;border-radius:50%;width:34px;height:34px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:white;flex-shrink:0;transition:transform 0.1s;" onmousedown="this.style.transform=\'scale(0.9)\'" onmouseup="this.style.transform=\'scale(1)\'">➤</button>';
            }
            html += '</div>';
        }

        panel.innerHTML = html;
        renderMessages();
    }

    function renderMessages() {
        var area = document.getElementById('chat-messages-area');
        if (!area) return;

        var html = '';

        if (activeTab === 'global') {
            var msgs = getMessages('global');
            if (msgs.length === 0) {
                html += '<div style="text-align:center;color:#6b7280;font-size:12px;padding:20px;">No messages yet. Say hi! 👋</div>';
            } else {
                for (var i = 0; i < msgs.length; i++) {
                    html += renderSingleMessage(msgs[i]);
                }
            }
            markAsRead('global');
        } else if (activeTab === 'guild') {
            if (!hasGuild()) {
                html += '<div style="text-align:center;color:#6b7280;font-size:13px;padding:40px 20px;">';
                html += '<div style="font-size:40px;margin-bottom:12px;">🏰</div>';
                html += '<div style="color:#9ca3af;margin-bottom:6px;">Join a guild to chat!</div>';
                html += '<div style="font-size:11px;color:#6b7280;">Visit the Guild tab to find or create one.</div>';
                html += '</div>';
            } else {
                var gMsgs = getMessages('guild');
                if (gMsgs.length === 0) {
                    html += '<div style="text-align:center;color:#6b7280;font-size:12px;padding:20px;">No guild messages yet. Start the conversation! 🏰</div>';
                } else {
                    for (var g = 0; g < gMsgs.length; g++) {
                        html += renderSingleMessage(gMsgs[g]);
                    }
                }
                markAsRead('guild');
            }
        } else if (activeTab === 'friend') {
            if (activeFriendId) {
                var fMsgs = getMessages('friend', activeFriendId);
                if (fMsgs.length === 0) {
                    html += '<div style="text-align:center;color:#6b7280;font-size:12px;padding:20px;">No messages yet. Say something! 💬</div>';
                } else {
                    for (var f = 0; f < fMsgs.length; f++) {
                        html += renderSingleMessage(fMsgs[f]);
                    }
                }
                markAsRead('friend', activeFriendId);
            } else {
                html += renderFriendList();
            }
        }

        area.innerHTML = html;

        setTimeout(function() {
            if (area) area.scrollTop = area.scrollHeight;
        }, 50);
    }

    function renderSingleMessage(msg) {
        var pName = getPlayerName();
        var isPlayer = (msg.type === 'player');
        var isSystem = (msg.type === 'system');
        var isReal = (msg.type === 'real'); // real message from another player

        if (isSystem) {
            return '<div style="text-align:center;padding:4px 8px;">' +
                '<span style="font-size:11px;color:#6b7280;font-style:italic;">⚡ ' + esc(msg.text) + '</span>' +
                '<div style="font-size:9px;color:#4b5563;margin-top:2px;">' + formatTime(msg.timestamp) + '</div>' +
                '</div>';
        }

        var align = isPlayer ? 'flex-end' : 'flex-start';
        var bubbleBg, textColor, nameColor;

        if (isPlayer) {
            bubbleBg = 'linear-gradient(135deg,#d97706,#b45309)';
            textColor = '#fff';
            nameColor = '#fde68a';
        } else if (isReal) {
            // Real player messages — distinct blue-ish style
            bubbleBg = 'linear-gradient(135deg,#1e40af,#1e3a8a)';
            textColor = '#dbeafe';
            nameColor = '#60a5fa';
        } else {
            // Bot/NPC messages
            bubbleBg = 'rgba(30,41,59,0.9)';
            textColor = '#e5e7eb';
            nameColor = '#f59e0b';
        }
        var borderRad = isPlayer ? '14px 14px 4px 14px' : '14px 14px 14px 4px';

        var html = '<div style="display:flex;flex-direction:column;align-items:' + align + ';max-width:85%;"' + (isPlayer ? ' class="chat-msg-self"' : '') + '>';
        if (!isPlayer) {
            var badge = isReal ? ' <span style="font-size:7px;background:rgba(59,130,246,0.2);color:#60a5fa;padding:1px 4px;border-radius:3px;font-weight:800;vertical-align:middle;">PLAYER</span>' : '';
            html += '<div style="font-size:10px;font-weight:700;color:' + nameColor + ';margin-bottom:2px;padding:0 4px;">' + esc(msg.sender) + badge + '</div>';
        }
        html += '<div style="background:' + bubbleBg + ';color:' + textColor + ';padding:7px 12px;border-radius:' + borderRad + ';font-size:13px;line-height:1.4;word-break:break-word;box-shadow:0 1px 4px rgba(0,0,0,0.2);">';
        html += esc(msg.text);
        html += '</div>';
        html += '<div style="font-size:9px;color:#4b5563;margin-top:2px;padding:0 4px;">' + formatTime(msg.timestamp) + '</div>';
        html += '</div>';

        var wrapper = '<div style="display:flex;justify-content:' + (isPlayer ? 'flex-end' : 'flex-start') + ';width:100%;">';
        wrapper += html;
        wrapper += '</div>';
        return wrapper;
    }

    function renderFriendList() {
        var friends = getFriendsList();
        var html = '';

        if (friends.length === 0) {
            html += '<div style="text-align:center;color:#6b7280;font-size:13px;padding:40px 20px;">';
            html += '<div style="font-size:40px;margin-bottom:12px;">👤</div>';
            html += '<div style="color:#9ca3af;margin-bottom:6px;">No friends yet!</div>';
            html += '<div style="font-size:11px;color:#6b7280;">Add friends from the Friends tab to start chatting.</div>';
            html += '</div>';
            return html;
        }

        html += '<div style="font-size:11px;color:#6b7280;padding:4px 0 8px 0;text-transform:uppercase;letter-spacing:1px;">Conversations</div>';

        for (var i = 0; i < friends.length; i++) {
            var friend = friends[i];
            var fId = friend.id || friend.name;
            var fMsgs = getMessages('friend', fId);
            var lastMsg = fMsgs.length > 0 ? fMsgs[fMsgs.length - 1] : null;
            var lastMsgText = lastMsg ? (lastMsg.text.length > 30 ? lastMsg.text.substring(0, 30) + '...' : lastMsg.text) : 'Tap to start chatting';
            var lastTime = lastMsg ? formatTime(lastMsg.timestamp) : '';

            initChatState();
            var fLr = state.chat.lastRead.friends[fId] || 0;
            var hasUnread = lastMsg && lastMsg.timestamp > fLr && lastMsg.type !== 'player';

            html += '<div onclick="window._chatOpenFriendDM(\'' + esc(fId) + '\')" style="display:flex;align-items:center;gap:10px;padding:10px 8px;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;border-radius:6px;transition:background 0.15s;" onmouseover="this.style.background=\'rgba(255,255,255,0.05)\'" onmouseout="this.style.background=\'transparent\'">';
            html += '<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#1e293b,#334155);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;border:2px solid ' + (hasUnread ? '#f59e0b' : 'rgba(255,255,255,0.1)') + ';">👤</div>';
            html += '<div style="flex:1;min-width:0;">';
            html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
            html += '<span style="font-size:12px;font-weight:700;color:' + (hasUnread ? '#f59e0b' : '#e5e7eb') + ';">' + esc(friend.name) + '</span>';
            html += '<span style="font-size:9px;color:#6b7280;">' + lastTime + '</span>';
            html += '</div>';
            html += '<div style="font-size:11px;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;">' + esc(lastMsgText) + '</div>';
            html += '</div>';
            if (hasUnread) {
                html += '<div style="width:8px;height:8px;border-radius:50%;background:#f59e0b;flex-shrink:0;"></div>';
            }
            html += '</div>';
        }

        return html;
    }

    // ============================================================
    // SEND MESSAGE
    // ============================================================

    function sendMessage() {
        var input = document.getElementById('chat-input');
        if (!input) return;
        var text = input.value.trim();
        if (!text) return;
        if (text.length > MAX_MSG_LEN) text = text.substring(0, MAX_MSG_LEN);

        // Rate limit
        var elapsed = now() - lastSendTime;
        if (elapsed < SEND_COOLDOWN) {
            if (typeof showGameAlert === 'function') {
                showGameAlert('💬 Slow Down!', 'Wait a moment before sending another message.');
            }
            return;
        }
        lastSendTime = now();

        var channel = activeTab;
        var friendId = null;
        if (activeTab === 'friend') {
            friendId = activeFriendId;
            if (!friendId) return;
            channel = 'friend';
        }

        if (activeTab === 'guild' && !hasGuild()) return;

        // Guest check for global/guild
        if (isGuestPlayer() && channel !== 'friend') {
            if (typeof showGameAlert === 'function') {
                showGameAlert('🔒 Login Required', 'You need to log in to send messages to other players.');
            }
            return;
        }

        var msg = {
            id: genId(),
            sender: getPlayerName(),
            text: text,
            timestamp: now(),
            type: 'player',
            channel: channel
        };

        // Add locally first (instant feedback)
        addMessage(channel, msg, friendId);
        input.value = '';

        // Send to database for global/guild (not friend DMs)
        if (channel === 'global' || channel === 'guild') {
            sendToDatabase(channel, text);
        }

        // Trigger friend reply if in friend DM
        if (channel === 'friend' && friendId) {
            scheduleFriendReply(friendId, text);
        }

        if (typeof saveProgress === 'function') saveProgress();
    }

    // ============================================================
    // TOGGLE / OPEN / CLOSE
    // ============================================================

    function toggleChatPanel() {
        if (chatOpen) closeChatPanel();
        else openChatPanel();
    }

    function openChatPanel() {
        initChatState();
        seedInitialMessages();
        chatOpen = true;

        var panel = document.getElementById('chat-panel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'chat-panel';
            document.body.appendChild(panel);
        }

        panel.style.cssText = 'position:fixed;bottom:0;left:0;right:0;height:60vh;z-index:8500;background:rgba(15,23,42,0.98);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:2px solid rgba(245,158,11,0.3);display:flex;flex-direction:column;transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);transform:translateY(0);box-shadow:0 -8px 32px rgba(0,0,0,0.6);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';

        panel.style.transform = 'translateY(100%)';
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                panel.style.transform = 'translateY(0)';
            });
        });

        renderChatPanel();
        startGlobalBotTimer();
        startGuildBotTimer();

        // Initialize realtime & fetch messages from DB
        initRealtime();
        fetchMessages('global');
        if (hasGuild()) fetchMessages('guild');

        if (activeTab === 'friend' && activeFriendId) {
            markAsRead('friend', activeFriendId);
        } else if (activeTab !== 'friend') {
            markAsRead(activeTab);
        }
    }

    function closeChatPanel() {
        chatOpen = false;
        stopGlobalBotTimer();
        stopGuildBotTimer();

        var panel = document.getElementById('chat-panel');
        if (panel) {
            panel.style.transform = 'translateY(100%)';
            setTimeout(function() {
                if (panel && panel.parentNode) panel.parentNode.removeChild(panel);
            }, 350);
        }

        if (typeof saveProgress === 'function') saveProgress();
    }

    // ---- TAB SWITCHING ----
    function switchTab(tab) {
        activeTab = tab;
        activeFriendId = null;
        renderChatPanel();
        // Fetch from DB on tab switch
        if (tab === 'global' || tab === 'guild') {
            fetchMessages(tab);
        }
    }

    function openFriendDM(friendId) {
        activeFriendId = friendId;
        renderChatPanel();
    }

    function backToFriendList() {
        activeFriendId = null;
        renderChatPanel();
    }

    function toggleMute() {
        initChatState();
        state.chat.settings.muted = !state.chat.settings.muted;
        renderChatPanel();
        if (typeof saveProgress === 'function') saveProgress();
    }

    // ---- INJECT CSS ----
    function injectChatCSS() {
        if (document.getElementById('chat-system-css')) return;
        var style = document.createElement('style');
        style.id = 'chat-system-css';
        style.textContent = [
            '@keyframes chatPulse {',
            '  0% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.4); }',
            '  50% { transform: scale(1.15); box-shadow: 0 4px 20px rgba(245,158,11,0.5); }',
            '  100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.4); }',
            '}',
            '#chat-panel::-webkit-scrollbar { width: 4px; }',
            '#chat-panel::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }',
            '#chat-messages-area::-webkit-scrollbar { width: 4px; }',
            '#chat-messages-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }',
            '#chat-messages-area::-webkit-scrollbar-track { background: transparent; }',
            '#chat-input:focus { border-color: rgba(245,158,11,0.4); }',
            '#chat-input::placeholder { color: #6b7280; }',
            '.chat-msg-self { align-self: flex-end; }'
        ].join('\n');
        document.head.appendChild(style);
    }

    // ---- INIT ----
    function initChatSystem() {
        if (typeof state === 'undefined') return;
        injectChatCSS();
        initChatState();

        // Clear old bot-only messages from saved state to start fresh with real data
        // Keep settings and lastRead but clear message arrays
        state.chat.global = [];
        state.chat.guild = [];

        setTimeout(function() {
            seedInitialMessages();
            updateUnreadBadge();
            // Start realtime subscription even before chat is opened
            initRealtime();
        }, 2000);
    }

    // ---- EXPOSE GLOBALS ----
    window.toggleChatPanel = toggleChatPanel;
    window._chatSwitchTab = switchTab;
    window._chatOpenFriendDM = openFriendDM;
    window._chatBackToFriendList = backToFriendList;
    window._chatSendMessage = sendMessage;
    window._chatToggleMute = toggleMute;

    // Auto-init when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(initChatSystem, 1500); });
    } else {
        setTimeout(initChatSystem, 1500);
    }

})();
