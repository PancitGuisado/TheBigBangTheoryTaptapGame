// ============================================================
// FRIEND LIST — Social system with request approval & gifts
// ============================================================

(function() {
    'use strict';

    var MAX_FRIENDS = 30;
    var MAX_DAILY_GIFTS = 30;
    var GIFT_MONEY = 500;
    var GIFT_RESOURCE_PICKS = 5;
    var GIFT_RESOURCES = ['stone', 'iron', 'gold', 'scrap'];
    var GIFT_FOODS = ['chinese', 'pizza', 'burger', 'hotdog', 'pretzel', 'tacos'];
    var FRIENDSHIP_MILESTONES = [
        { pts: 100, label: '50 Diamonds', key: 'diamond_100' },
        { pts: 500, label: 'Title: Social Butterfly', key: 'title_500' },
        { pts: 1000, label: '10 Battle Pass XP', key: 'bp_1000' }
    ];

    var RANDOM_GAMER_NAMES = [
        'xXDarkPhysicsXx', 'QuantumNerd42', 'BazingaMaster', 'WolowitzInSpace',
        'RajsKoothrappali', 'StuartsRevenge', 'PennyBlossomFan', 'CooperTheGreat',
        'DrFowlerPhD', 'ZackTheDestroyer', 'BarryKripke99', 'WilWheaton_IRL',
        'EmilySweeneyyy', 'AstrophysicsKing', 'CheesecakeQueen', 'SheldonBot3000',
        'StringTheorist', 'RocketManHowie', 'LeonardTheDoc', 'NerdHerder_23',
        'PaintBallKing', 'DnDWizard420', 'FunWithFlags_1', 'HeliumVoiceLol',
        'Catwoman_Amy', 'HaloMaster69', 'TheBatSignal99', 'Meemaw_Lover',
        'SoftKittyFan', 'Aquaman_Rules', 'ComicBookGuru', 'LaserTag_Pro'
    ];

    var _activeTab = 'friends';
    var _pendingTimers = {};
    var _incomingTimer = null;

    // ---- STATE INIT ----
    function initFriends() {
        if (!state.friends) state.friends = [];

        // Friend Requests
        if (!state.friendRequests) state.friendRequests = {};
        if (!state.friendRequests.sent) state.friendRequests.sent = [];
        if (!state.friendRequests.received) state.friendRequests.received = [];

        // Daily Gift System
        state.gifts = state.gifts || {};
        state.gifts.sentToday = state.gifts.sentToday || {};
        state.gifts.sentCount = state.gifts.sentCount || 0;
        state.gifts.lastResetDay = state.gifts.lastResetDay || '';
        state.gifts.received = state.gifts.received || [];

        // Gift Log (last 5 sent/received)
        if (!state.gifts.log) state.gifts.log = [];

        // Friendship Points
        state.friendshipPoints = state.friendshipPoints || 0;
        state.friendshipMilestonesClaimed = state.friendshipMilestonesClaimed || [];
    }

    // ---- TOAST NOTIFICATION ----
    function showToast(msg, duration) {
        duration = duration || 4000;
        var el = document.createElement('div');
        el.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);' +
            'background:rgba(15,23,42,0.95);color:#f1f5f9;font-size:11px;padding:10px 20px;' +
            'border-radius:12px;border:1px solid rgba(245,158,11,0.3);z-index:99999;' +
            'font-family:\"Press Start 2P\",monospace;font-size:8px;text-align:center;' +
            'box-shadow:0 8px 32px rgba(0,0,0,0.5);pointer-events:none;' +
            'animation:toastIn 0.3s ease-out;max-width:340px;';
        el.innerHTML = msg;
        document.body.appendChild(el);
        setTimeout(function() {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.4s';
            setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
        }, duration);
    }

    // Inject toast animation CSS once
    (function injectToastCSS() {
        if (document.getElementById('friend-toast-css')) return;
        var style = document.createElement('style');
        style.id = 'friend-toast-css';
        style.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}';
        document.head.appendChild(style);
    })();

    // ---- RANDOM NAME PICKER ----
    function pickRandomGamerName() {
        // Avoid names already in friends or pending requests
        var usedNames = {};
        var i;
        for (i = 0; i < state.friends.length; i++) usedNames[state.friends[i].name.toLowerCase()] = true;
        for (i = 0; i < state.friendRequests.sent.length; i++) usedNames[state.friendRequests.sent[i].name.toLowerCase()] = true;
        for (i = 0; i < state.friendRequests.received.length; i++) usedNames[state.friendRequests.received[i].name.toLowerCase()] = true;

        var available = [];
        for (i = 0; i < RANDOM_GAMER_NAMES.length; i++) {
            if (!usedNames[RANDOM_GAMER_NAMES[i].toLowerCase()]) available.push(RANDOM_GAMER_NAMES[i]);
        }
        if (available.length === 0) {
            // Fallback: generate unique name
            return 'Player_' + Math.floor(Math.random() * 99999);
        }
        return available[Math.floor(Math.random() * available.length)];
    }

    // ---- DAILY GIFT HELPERS ----
    function getTodayKey() {
        var d = new Date();
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }

    function resetDailyGifts() {
        var today = getTodayKey();
        if (state.gifts.lastResetDay !== today) {
            state.gifts.sentToday = {};
            state.gifts.sentCount = 0;
            state.gifts.lastResetDay = today;
            if (typeof saveProgress === 'function') saveProgress();
        }
    }

    function generateGiftContents() {
        var gift = { money: GIFT_MONEY, resources: {}, food: '', diamonds: 0 };
        // Pick 5 random resources (1-3 each)
        for (var i = 0; i < GIFT_RESOURCE_PICKS; i++) {
            var res = GIFT_RESOURCES[Math.floor(Math.random() * GIFT_RESOURCES.length)];
            var qty = Math.floor(Math.random() * 3) + 1;
            gift.resources[res] = (gift.resources[res] || 0) + qty;
        }
        // Pick 1 random food
        gift.food = GIFT_FOODS[Math.floor(Math.random() * GIFT_FOODS.length)];
        // 5% chance of rare diamond gift (5-10 diamonds)
        if (Math.random() < 0.05) {
            gift.diamonds = Math.floor(Math.random() * 6) + 5;
        }
        return gift;
    }

    function addGiftLog(type, friendName, gift) {
        if (!state.gifts.log) state.gifts.log = [];
        state.gifts.log.unshift({
            type: type, // 'sent' or 'received'
            friend: friendName,
            money: gift.money || 0,
            diamonds: gift.diamonds || 0,
            time: Date.now()
        });
        // Keep only last 5
        if (state.gifts.log.length > 5) state.gifts.log = state.gifts.log.slice(0, 5);
    }

    // ---- FRIEND REQUEST SYSTEM ----

    // Send a friend request (outgoing)
    function sendFriendRequest(name, data) {
        initFriends();

        if (state.friends.length >= MAX_FRIENDS) {
            if (typeof showGameAlert === 'function') showGameAlert('👥 Full', 'You have reached the maximum of ' + MAX_FRIENDS + ' friends.');
            return false;
        }

        // Check duplicate in friends
        var i;
        for (i = 0; i < state.friends.length; i++) {
            if (state.friends[i].name.toLowerCase() === name.toLowerCase()) {
                if (typeof showGameAlert === 'function') showGameAlert('👥 Already Added', name + ' is already your friend!');
                return false;
            }
        }
        // Check duplicate in sent
        for (i = 0; i < state.friendRequests.sent.length; i++) {
            if (state.friendRequests.sent[i].name.toLowerCase() === name.toLowerCase() && state.friendRequests.sent[i].status === 'pending') {
                if (typeof showGameAlert === 'function') showGameAlert('⏳ Pending', 'You already sent a request to ' + escFriend(name) + '.');
                return false;
            }
        }

        var requestId = 'req_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
        var entry = {
            id: requestId,
            name: name,
            sentAt: Date.now(),
            status: 'pending',
            trophies: data && data.trophies ? data.trophies : Math.floor(Math.random() * 500),
            wave: data && data.wave ? data.wave : Math.floor(Math.random() * 30) + 1
        };

        state.friendRequests.sent.push(entry);
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
        if (typeof showGameAlert === 'function') showGameAlert('📨 Request Sent!', 'Friend request sent to ' + escFriend(name) + '!');
        if (typeof saveProgress === 'function') saveProgress();

        // Auto-accept/decline after 15-60 seconds
        var delay = (Math.floor(Math.random() * 46) + 15) * 1000; // 15-60s
        _pendingTimers[requestId] = setTimeout(function() {
            resolveOutgoingRequest(requestId, entry);
        }, delay);

        refreshModalIfOpen();
        return true;
    }

    function resolveOutgoingRequest(requestId, entry) {
        initFriends();
        // Find the request
        var idx = -1;
        for (var i = 0; i < state.friendRequests.sent.length; i++) {
            if (state.friendRequests.sent[i].id === requestId) { idx = i; break; }
        }
        if (idx === -1) return;
        var req = state.friendRequests.sent[idx];
        if (req.status !== 'pending') return;

        // 85% accept, 15% decline
        if (Math.random() < 0.85) {
            req.status = 'accepted';
            // Actually add them as a friend
            if (state.friends.length < MAX_FRIENDS) {
                state.friends.push({
                    id: 'local_' + Date.now(),
                    name: req.name,
                    addedAt: Date.now(),
                    trophies: req.trophies || 0,
                    wave: req.wave || 1
                });
                showToast('✅ <span style="color:#34d399">' + escFriend(req.name) + '</span> accepted your friend request!');
            }
        } else {
            req.status = 'declined';
            showToast('❌ <span style="color:#f87171">' + escFriend(req.name) + '</span> declined your friend request.');
        }

        if (typeof saveProgress === 'function') saveProgress();
        delete _pendingTimers[requestId];
        refreshModalIfOpen();
    }

    // Simulated incoming request
    function generateIncomingRequest() {
        initFriends();
        if (state.friends.length >= MAX_FRIENDS) return;

        var name = pickRandomGamerName();
        var entry = {
            id: 'inc_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
            name: name,
            receivedAt: Date.now(),
            trophies: Math.floor(Math.random() * 800) + 50,
            wave: Math.floor(Math.random() * 40) + 1
        };

        state.friendRequests.received.push(entry);
        showToast('📩 <span style="color:#60a5fa">' + escFriend(name) + '</span> sent you a friend request!');
        if (typeof saveProgress === 'function') saveProgress();
        refreshModalIfOpen();
    }

    // Start the incoming request timer (every 5-10 minutes)
    function startIncomingRequestTimer() {
        if (_incomingTimer) return;
        function scheduleNext() {
            var delay = (Math.floor(Math.random() * 6) + 5) * 60 * 1000; // 5-10 min
            _incomingTimer = setTimeout(function() {
                generateIncomingRequest();
                scheduleNext();
            }, delay);
        }
        scheduleNext();
    }

    // Accept incoming request
    function acceptIncomingRequest(index) {
        initFriends();
        if (index < 0 || index >= state.friendRequests.received.length) return;

        if (state.friends.length >= MAX_FRIENDS) {
            if (typeof showGameAlert === 'function') showGameAlert('👥 Full', 'Friend list is full! Remove a friend first.');
            return;
        }

        var req = state.friendRequests.received[index];

        state.friends.push({
            id: 'local_' + Date.now(),
            name: req.name,
            addedAt: Date.now(),
            trophies: req.trophies || 0,
            wave: req.wave || 1
        });

        state.friendRequests.received.splice(index, 1);

        if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
        if (typeof showGameAlert === 'function') showGameAlert('👥 Accepted!', escFriend(req.name) + ' is now your friend!');
        if (typeof saveProgress === 'function') saveProgress();
        refreshModalIfOpen();
    }

    // Decline incoming request
    function declineIncomingRequest(index) {
        initFriends();
        if (index < 0 || index >= state.friendRequests.received.length) return;

        var req = state.friendRequests.received[index];
        state.friendRequests.received.splice(index, 1);

        if (typeof SoundManager !== 'undefined') SoundManager.playFX('click');
        showToast('🚫 Declined request from ' + escFriend(req.name));
        if (typeof saveProgress === 'function') saveProgress();
        refreshModalIfOpen();
    }

    // ---- GIFT FUNCTIONS ----

    function sendGift(friendIndex) {
        initFriends();
        resetDailyGifts();

        if (friendIndex < 0 || friendIndex >= state.friends.length) return;
        var friend = state.friends[friendIndex];
        var friendId = friend.id || friend.name;

        if (state.gifts.sentToday[friendId]) {
            if (typeof showGameAlert === 'function') showGameAlert('🎁 Already Sent', 'You already sent a gift to ' + escFriend(friend.name) + ' today.');
            return;
        }
        if (state.gifts.sentCount >= MAX_DAILY_GIFTS) {
            if (typeof showGameAlert === 'function') showGameAlert('🎁 Limit Reached', 'You have sent ' + MAX_DAILY_GIFTS + ' gifts today. Come back tomorrow!');
            return;
        }

        state.gifts.sentToday[friendId] = true;
        state.gifts.sentCount = state.gifts.sentCount + 1;
        state.friendshipPoints = (state.friendshipPoints || 0) + 10;

        // Log sent gift
        addGiftLog('sent', friend.name, { money: GIFT_MONEY });

        if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
        if (typeof showGameAlert === 'function') showGameAlert('🎁 Gift Sent!', 'Sent a gift to ' + escFriend(friend.name) + '! (+10 friendship pts)');

        // 50% chance the friend "sends back" after 1-30 MINUTES
        if (Math.random() < 0.5) {
            var delay = Math.floor(Math.random() * 1740001) + 60000; // 60000ms - 1800000ms
            (function(f) {
                setTimeout(function() {
                    var giftBack = generateGiftContents();
                    giftBack.from = f.name;
                    giftBack.receivedAt = Date.now();
                    state.gifts.received.push(giftBack);
                    addGiftLog('received', f.name, giftBack);

                    // Toast notification
                    var diamondText = giftBack.diamonds > 0 ? ' 💎+' + giftBack.diamonds : '';
                    showToast('🎁 <span style="color:#34d399">' + escFriend(f.name) + '</span> sent you a gift!' + diamondText);

                    if (typeof saveProgress === 'function') saveProgress();
                    refreshModalIfOpen();
                }, delay);
            })(friend);
        }

        checkFriendshipMilestones();
        if (typeof saveProgress === 'function') saveProgress();
        refreshModalIfOpen();
    }

    function sendAllGifts() {
        initFriends();
        resetDailyGifts();

        var sent = 0;
        for (var i = 0; i < state.friends.length; i++) {
            var friend = state.friends[i];
            var friendId = friend.id || friend.name;
            if (state.gifts.sentToday[friendId]) continue;
            if (state.gifts.sentCount >= MAX_DAILY_GIFTS) break;

            state.gifts.sentToday[friendId] = true;
            state.gifts.sentCount = state.gifts.sentCount + 1;
            state.friendshipPoints = (state.friendshipPoints || 0) + 10;
            sent++;

            addGiftLog('sent', friend.name, { money: GIFT_MONEY });

            // 50% chance friend sends back after 1-30 min
            if (Math.random() < 0.5) {
                (function(f) {
                    var delay = Math.floor(Math.random() * 1740001) + 60000;
                    setTimeout(function() {
                        var giftBack = generateGiftContents();
                        giftBack.from = f.name;
                        giftBack.receivedAt = Date.now();
                        state.gifts.received.push(giftBack);
                        addGiftLog('received', f.name, giftBack);

                        var diamondText = giftBack.diamonds > 0 ? ' 💎+' + giftBack.diamonds : '';
                        showToast('🎁 <span style="color:#34d399">' + escFriend(f.name) + '</span> sent you a gift!' + diamondText);

                        if (typeof saveProgress === 'function') saveProgress();
                        refreshModalIfOpen();
                    }, delay);
                })(friend);
            }
        }

        if (sent > 0) {
            if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
            if (typeof showGameAlert === 'function') showGameAlert('🎁 Gifts Sent!', 'Sent gifts to ' + sent + ' friends! (+' + (sent * 10) + ' friendship pts)');
            checkFriendshipMilestones();
            if (typeof saveProgress === 'function') saveProgress();
        } else {
            if (typeof showGameAlert === 'function') showGameAlert('🎁 No Gifts', 'All friends have already received gifts today.');
        }

        refreshModalIfOpen();
    }

    function claimReceivedGift(giftIndex) {
        initFriends();

        if (giftIndex < 0 || giftIndex >= state.gifts.received.length) return;
        var gift = state.gifts.received[giftIndex];

        // Add money
        state.money = (state.money || 0) + (gift.money || 0);

        // Add diamonds
        if (gift.diamonds && gift.diamonds > 0) {
            if (!state.resources) state.resources = {};
            state.resources.diamond = (state.resources.diamond || 0) + gift.diamonds;
        }

        // Add resources
        if (!state.resources) state.resources = {};
        if (gift.resources) {
            for (var key in gift.resources) {
                if (gift.resources.hasOwnProperty(key)) {
                    state.resources[key] = (state.resources[key] || 0) + gift.resources[key];
                }
            }
        }

        // Add food
        if (gift.food) {
            if (!state.resources) state.resources = {};
            state.resources[gift.food] = (state.resources[gift.food] || 0) + 1;
        }

        // Friendship points
        state.friendshipPoints = (state.friendshipPoints || 0) + 10;

        var diamondMsg = (gift.diamonds && gift.diamonds > 0) ? ' + 💎' + gift.diamonds + ' diamonds!' : '';

        // Remove from received
        state.gifts.received.splice(giftIndex, 1);

        if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
        if (typeof showGameAlert === 'function') showGameAlert('🎁 Gift Claimed!', 'Received $' + (gift.money || 0) + ' and resources from ' + escFriend(gift.from || 'a friend') + '!' + diamondMsg + ' (+10 friendship pts)');

        checkFriendshipMilestones();
        if (typeof saveProgress === 'function') saveProgress();
        refreshModalIfOpen();
    }

    function claimAllGifts() {
        initFriends();

        if (!state.gifts.received || state.gifts.received.length === 0) {
            if (typeof showGameAlert === 'function') showGameAlert('🎁 No Gifts', 'No gifts to claim.');
            return;
        }

        var totalMoney = 0;
        var totalDiamonds = 0;
        var totalRes = {};
        var count = state.gifts.received.length;

        for (var i = 0; i < state.gifts.received.length; i++) {
            var gift = state.gifts.received[i];
            totalMoney += (gift.money || 0);
            totalDiamonds += (gift.diamonds || 0);

            if (gift.resources) {
                for (var key in gift.resources) {
                    if (gift.resources.hasOwnProperty(key)) {
                        totalRes[key] = (totalRes[key] || 0) + gift.resources[key];
                    }
                }
            }

            if (gift.food) {
                totalRes[gift.food] = (totalRes[gift.food] || 0) + 1;
            }
        }

        // Apply money
        state.money = (state.money || 0) + totalMoney;

        // Apply diamonds
        if (totalDiamonds > 0) {
            if (!state.resources) state.resources = {};
            state.resources.diamond = (state.resources.diamond || 0) + totalDiamonds;
        }

        // Apply resources
        if (!state.resources) state.resources = {};
        for (var rk in totalRes) {
            if (totalRes.hasOwnProperty(rk)) {
                state.resources[rk] = (state.resources[rk] || 0) + totalRes[rk];
            }
        }

        // Friendship points
        state.friendshipPoints = (state.friendshipPoints || 0) + (count * 10);

        // Clear received
        state.gifts.received = [];

        var diamondMsg = totalDiamonds > 0 ? ' + 💎' + totalDiamonds + ' diamonds!' : '';

        if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
        if (typeof showGameAlert === 'function') showGameAlert('🎁 All Gifts Claimed!', 'Claimed ' + count + ' gifts: $' + totalMoney + ' and resources!' + diamondMsg + ' (+' + (count * 10) + ' friendship pts)');

        checkFriendshipMilestones();
        if (typeof saveProgress === 'function') saveProgress();
        refreshModalIfOpen();
    }

    function checkFriendshipMilestones() {
        var pts = state.friendshipPoints || 0;
        if (!state.friendshipMilestonesClaimed) state.friendshipMilestonesClaimed = [];

        for (var i = 0; i < FRIENDSHIP_MILESTONES.length; i++) {
            var m = FRIENDSHIP_MILESTONES[i];
            if (pts >= m.pts && state.friendshipMilestonesClaimed.indexOf(m.key) === -1) {
                state.friendshipMilestonesClaimed.push(m.key);

                if (m.key === 'diamond_100') {
                    if (!state.resources) state.resources = {};
                    state.resources.diamond = (state.resources.diamond || 0) + 50;
                    if (typeof showGameAlert === 'function') showGameAlert('💎 Milestone!', 'Friendship milestone reached! +50 Diamonds!');
                } else if (m.key === 'title_500') {
                    if (!state.titles) state.titles = [];
                    if (state.titles.indexOf('Social Butterfly') === -1) {
                        state.titles.push('Social Butterfly');
                    }
                    if (typeof showGameAlert === 'function') showGameAlert('🦋 Title Earned!', 'You earned the title "Social Butterfly"!');
                } else if (m.key === 'bp_1000') {
                    state.bpXp = (state.bpXp || 0) + 10;
                    if (typeof showGameAlert === 'function') showGameAlert('⭐ Milestone!', 'Friendship milestone reached! +10 Battle Pass XP!');
                }

                if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
                if (typeof saveProgress === 'function') saveProgress();
            }
        }
    }

    // ---- MODAL HELPERS ----
    function refreshModalIfOpen() {
        var modal = document.getElementById('friend-list-modal');
        if (modal) { closeFriendList(); openFriendList(); }
    }

    // ---- FRIEND LIST MODAL (3 TABS) ----
    function openFriendList() {
        initFriends();
        resetDailyGifts();
        startIncomingRequestTimer();

        var existing = document.getElementById('friend-list-modal');
        if (existing) existing.remove();

        var receivedReqCount = state.friendRequests.received ? state.friendRequests.received.length : 0;

        // Tab bar
        var tabBarHtml = buildTabBar(receivedReqCount);

        // Tab content
        var contentHtml = '';
        if (_activeTab === 'friends') {
            contentHtml = buildFriendsTab();
        } else if (_activeTab === 'sent') {
            contentHtml = buildSentTab();
        } else if (_activeTab === 'requests') {
            contentHtml = buildRequestsTab();
        }

        var modal = document.createElement('div');
        modal.id = 'friend-list-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:9300;display:flex;align-items:center;justify-content:center;';
        modal.innerHTML = '' +
            '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);" onclick="closeFriendList()"></div>' +
            '<div style="position:relative;background:rgba(15,23,42,0.97);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;max-width:420px;width:calc(100% - 32px);box-shadow:0 25px 80px rgba(0,0,0,0.6);overflow:hidden;max-height:85vh;display:flex;flex-direction:column;">' +
                // Header
                '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.08);">' +
                    '<div style="display:flex;align-items:center;gap:8px;">' +
                        '<span style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:#fff;letter-spacing:2px;">👥 FRIENDS</span>' +
                        '<span style="background:rgba(59,130,246,0.2);color:#93c5fd;font-size:8px;font-weight:700;padding:2px 8px;border-radius:9999px;">' + state.friends.length + '/' + MAX_FRIENDS + '</span>' +
                    '</div>' +
                    '<div style="display:flex;align-items:center;gap:8px;">' +
                        '<button onclick="showAddFriendPrompt()" style="background:rgba(16,185,129,0.25);color:#6ee7b7;font-size:9px;font-weight:700;padding:6px 12px;border-radius:8px;cursor:pointer;border:1px solid rgba(16,185,129,0.2);transition:all 0.2s;">+ Add</button>' +
                        '<button onclick="closeFriendList()" style="color:#9ca3af;font-size:18px;cursor:pointer;border:none;background:none;line-height:1;">✕</button>' +
                    '</div>' +
                '</div>' +
                // Tab bar
                tabBarHtml +
                // Content
                '<div style="padding:16px;overflow-y:auto;flex:1;">' +
                    contentHtml +
                '</div>' +
            '</div>';

        document.body.appendChild(modal);
    }

    function buildTabBar(receivedReqCount) {
        var tabs = [
            { key: 'friends', label: '👥 Friends', badge: 0 },
            { key: 'sent', label: '📨 Sent', badge: 0 },
            { key: 'requests', label: '📩 Requests', badge: receivedReqCount }
        ];

        var html = '<div style="display:flex;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.2);">';
        for (var i = 0; i < tabs.length; i++) {
            var t = tabs[i];
            var isActive = (_activeTab === t.key);
            var bgColor = isActive ? 'rgba(245,158,11,0.15)' : 'transparent';
            var borderBot = isActive ? '2px solid #f59e0b' : '2px solid transparent';
            var textColor = isActive ? '#f59e0b' : '#9ca3af';
            var badgeHtml = '';
            if (t.badge > 0) {
                badgeHtml = '<span style="background:#ef4444;color:#fff;font-size:7px;font-weight:700;padding:1px 5px;border-radius:9999px;margin-left:4px;min-width:14px;text-align:center;display:inline-block;">' + t.badge + '</span>';
            }
            html += '<button onclick="switchFriendTab(\'' + t.key + '\')" style="flex:1;padding:10px 6px;font-size:8px;font-weight:700;color:' + textColor + ';background:' + bgColor + ';border:none;border-bottom:' + borderBot + ';cursor:pointer;transition:all 0.2s;font-family:\'Press Start 2P\',monospace;">' +
                t.label + badgeHtml +
            '</button>';
        }
        html += '</div>';
        return html;
    }

    // ---- TAB: FRIENDS ----
    function buildFriendsTab() {
        var html = '';

        // Gift stats
        var giftCount = state.gifts.sentCount || 0;
        var receivedCount = state.gifts.received ? state.gifts.received.length : 0;
        var fpPts = state.friendshipPoints || 0;

        // Milestone progress bar
        var nextMilestone = null;
        var prevPts = 0;
        for (var mi = 0; mi < FRIENDSHIP_MILESTONES.length; mi++) {
            if (fpPts < FRIENDSHIP_MILESTONES[mi].pts) {
                nextMilestone = FRIENDSHIP_MILESTONES[mi];
                prevPts = mi > 0 ? FRIENDSHIP_MILESTONES[mi - 1].pts : 0;
                break;
            }
        }
        var milestoneBarHtml = '';
        if (nextMilestone) {
            var range = nextMilestone.pts - prevPts;
            var progress = fpPts - prevPts;
            var pct = Math.min(100, Math.floor((progress / range) * 100));
            milestoneBarHtml =
                '<div style="margin-top:8px;">' +
                    '<div style="display:flex;align-items:center;justify-content:space-between;font-size:7px;color:#6b7280;margin-bottom:4px;">' +
                        '<span>Next: ' + escFriend(nextMilestone.label) + '</span>' +
                        '<span>' + fpPts + '/' + nextMilestone.pts + '</span>' +
                    '</div>' +
                    '<div style="width:100%;height:6px;background:#1e293b;border-radius:9999px;overflow:hidden;">' +
                        '<div style="height:100%;border-radius:9999px;width:' + pct + '%;background:linear-gradient(90deg,#8b5cf6,#ec4899);transition:width 0.3s;"></div>' +
                    '</div>' +
                '</div>';
        } else {
            milestoneBarHtml = '<div style="margin-top:8px;font-size:7px;color:#34d399;font-weight:700;text-align:center;">✅ All milestones claimed!</div>';
        }

        html += '<div style="background:rgba(30,41,59,0.5);border:1px solid rgba(255,255,255,0.04);border-radius:12px;padding:12px 16px;margin-bottom:12px;">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">' +
                '<div style="display:flex;align-items:center;gap:12px;font-size:9px;">' +
                    '<span style="color:#9ca3af;">🎁 Gifts: <span style="color:#fff;font-weight:700;">' + giftCount + '/' + MAX_DAILY_GIFTS + '</span> today</span>' +
                    '<span style="color:#9ca3af;">💎 Friendship: <span style="color:#d8b4fe;font-weight:700;">' + fpPts + '</span> pts</span>' +
                '</div>' +
                '<button onclick="sendAllGifts()" style="background:rgba(16,185,129,0.3);color:#6ee7b7;font-size:8px;font-weight:700;padding:4px 10px;border-radius:8px;cursor:pointer;border:1px solid rgba(16,185,129,0.2);transition:all 0.2s;">Send All 🎁</button>' +
            '</div>';

        if (receivedCount > 0) {
            html += '<div style="display:flex;align-items:center;justify-content:space-between;background:rgba(120,53,15,0.15);border:1px solid rgba(217,119,6,0.15);border-radius:8px;padding:8px 12px;margin-bottom:4px;">' +
                '<span style="color:#fcd34d;font-size:9px;font-weight:700;">📦 ' + receivedCount + ' gift' + (receivedCount > 1 ? 's' : '') + ' pending</span>' +
                '<button onclick="claimAllGifts()" style="background:rgba(217,119,6,0.3);color:#fef3c7;font-size:8px;font-weight:700;padding:4px 10px;border-radius:8px;cursor:pointer;border:1px solid rgba(217,119,6,0.2);transition:all 0.2s;">Claim All ✓</button>' +
            '</div>';
        }

        html += milestoneBarHtml + '</div>';

        // Gift Log section
        if (state.gifts.log && state.gifts.log.length > 0) {
            html += '<div style="background:rgba(30,41,59,0.3);border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:10px 14px;margin-bottom:12px;">' +
                '<div style="font-size:8px;color:#9ca3af;font-weight:700;margin-bottom:6px;letter-spacing:1px;">📋 GIFT LOG</div>';
            for (var gl = 0; gl < state.gifts.log.length; gl++) {
                var log = state.gifts.log[gl];
                var logIcon = log.type === 'sent' ? '📤' : '📥';
                var logColor = log.type === 'sent' ? '#60a5fa' : '#34d399';
                var logTime = getTimeAgo(new Date(log.time));
                var logDia = log.diamonds > 0 ? ' <span style="color:#fbbf24;">💎' + log.diamonds + '</span>' : '';
                html += '<div style="display:flex;align-items:center;justify-content:space-between;font-size:7px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.03);">' +
                    '<span style="color:' + logColor + ';">' + logIcon + ' ' + escFriend(log.friend) + logDia + '</span>' +
                    '<span style="color:#4b5563;">' + logTime + '</span>' +
                '</div>';
            }
            html += '</div>';
        }

        // Received gifts (individual claim)
        if (state.gifts.received && state.gifts.received.length > 0) {
            html += '<div style="margin-bottom:12px;">';
            for (var ri = 0; ri < state.gifts.received.length; ri++) {
                var rg = state.gifts.received[ri];
                var rgTime = getTimeAgo(new Date(rg.receivedAt || Date.now()));
                var rgDia = (rg.diamonds && rg.diamonds > 0) ? ' <span style="color:#fbbf24;font-weight:700;">💎' + rg.diamonds + '</span>' : '';
                html += '<div style="display:flex;align-items:center;gap:10px;background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.12);border-radius:10px;padding:10px 14px;margin-bottom:6px;">' +
                    '<div style="font-size:18px;">🎁</div>' +
                    '<div style="flex:1;min-width:0;">' +
                        '<div style="color:#fcd34d;font-size:9px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">From ' + escFriend(rg.from || 'Unknown') + '</div>' +
                        '<div style="color:#9ca3af;font-size:7px;">$' + (rg.money || 0) + ' + resources' + rgDia + ' · ' + rgTime + '</div>' +
                    '</div>' +
                    '<button onclick="claimReceivedGift(' + ri + ')" style="background:rgba(217,119,6,0.35);color:#fef3c7;font-size:8px;font-weight:700;padding:5px 10px;border-radius:8px;cursor:pointer;border:1px solid rgba(217,119,6,0.25);transition:all 0.2s;">Claim</button>' +
                '</div>';
            }
            html += '</div>';
        }

        // Friend list
        if (state.friends.length === 0) {
            html += '<div style="text-align:center;padding:40px 0;">' +
                '<div style="font-size:28px;margin-bottom:12px;opacity:0.4;">👥</div>' +
                '<div style="color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">No Friends Yet</div>' +
                '<div style="color:#4b5563;font-size:8px;margin-top:4px;">Add friends from the PVP arena or leaderboard!</div>' +
            '</div>';
        } else {
            for (var i = 0; i < state.friends.length; i++) {
                var f = state.friends[i];
                var addedDate = new Date(f.addedAt || Date.now());
                var timeAgo = getTimeAgo(addedDate);
                var friendId = f.id || f.name;
                var giftSent = !!(state.gifts.sentToday && state.gifts.sentToday[friendId]);

                var giftBtnStyle = giftSent
                    ? 'background:rgba(30,41,59,0.4);color:#4b5563;font-size:8px;font-weight:700;padding:5px 8px;border-radius:8px;border:1px solid rgba(55,65,81,0.3);cursor:default;opacity:0.5;'
                    : 'background:rgba(16,185,129,0.25);color:#6ee7b7;font-size:8px;font-weight:700;padding:5px 8px;border-radius:8px;cursor:pointer;border:1px solid rgba(16,185,129,0.2);transition:all 0.2s;';
                var giftBtnAttr = giftSent ? '' : 'onclick="sendGift(' + i + ')"';
                var giftStatusText = giftSent ? '<div style="font-size:6px;color:#4b5563;text-align:center;margin-top:2px;">Sent ✓</div>' : '';

                var initChar = f.name ? f.name.charAt(0).toUpperCase() : '?';

                html += '<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.04);border-radius:12px;padding:10px 14px;margin-bottom:8px;transition:all 0.2s;">' +
                    '<div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#fff;background:linear-gradient(135deg,#3b82f6,#8b5cf6);flex-shrink:0;">' + initChar + '</div>' +
                    '<div style="flex:1;min-width:0;">' +
                        '<div style="color:#fff;font-size:11px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escFriend(f.name || 'Unknown') + '</div>' +
                        '<div style="display:flex;align-items:center;gap:8px;font-size:8px;color:#6b7280;">' +
                            '<span>🏆 ' + (f.trophies || 0) + '</span>' +
                            '<span>⚔️ W' + (f.wave || 1) + '</span>' +
                            '<span style="color:#4b5563;">· ' + timeAgo + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div style="display:flex;align-items:center;gap:6px;">' +
                        '<div style="display:flex;flex-direction:column;align-items:center;">' +
                            '<button ' + giftBtnAttr + ' style="' + giftBtnStyle + '" title="Send Gift">🎁</button>' +
                            giftStatusText +
                        '</div>' +
                        '<button onclick="challengeFriend(' + i + ')" style="background:rgba(126,34,206,0.25);color:#c4b5fd;font-size:8px;font-weight:700;padding:5px 8px;border-radius:8px;cursor:pointer;border:1px solid rgba(126,34,206,0.2);transition:all 0.2s;" title="Friendly PVP">⚔️</button>' +
                        '<button onclick="removeFriend(' + i + ')" style="background:rgba(127,29,29,0.2);color:#fca5a5;font-size:8px;font-weight:700;padding:5px 8px;border-radius:8px;cursor:pointer;border:1px solid rgba(127,29,29,0.2);transition:all 0.2s;" title="Remove">✕</button>' +
                    '</div>' +
                '</div>';
            }
        }

        return html;
    }

    // ---- TAB: SENT REQUESTS ----
    function buildSentTab() {
        var html = '';

        var sentList = state.friendRequests.sent || [];
        // Show pending first, then accepted/declined (most recent first)
        var sorted = sentList.slice().sort(function(a, b) {
            var order = { 'pending': 0, 'accepted': 1, 'declined': 2 };
            var oa = order[a.status] || 0;
            var ob = order[b.status] || 0;
            if (oa !== ob) return oa - ob;
            return (b.sentAt || 0) - (a.sentAt || 0);
        });

        if (sorted.length === 0) {
            html += '<div style="text-align:center;padding:40px 0;">' +
                '<div style="font-size:28px;margin-bottom:12px;opacity:0.4;">📨</div>' +
                '<div style="color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">No Sent Requests</div>' +
                '<div style="color:#4b5563;font-size:8px;margin-top:4px;">Use "+ Add" to send a friend request!</div>' +
            '</div>';
        } else {
            for (var i = 0; i < sorted.length; i++) {
                var req = sorted[i];
                var sentTime = getTimeAgo(new Date(req.sentAt || Date.now()));
                var statusBadge = '';
                var cardBorder = 'rgba(255,255,255,0.04)';

                if (req.status === 'pending') {
                    statusBadge = '<span style="background:rgba(234,179,8,0.2);color:#fbbf24;font-size:7px;font-weight:700;padding:2px 8px;border-radius:9999px;">⏳ Pending</span>';
                    cardBorder = 'rgba(234,179,8,0.15)';
                } else if (req.status === 'accepted') {
                    statusBadge = '<span style="background:rgba(34,197,94,0.2);color:#4ade80;font-size:7px;font-weight:700;padding:2px 8px;border-radius:9999px;">✅ Accepted</span>';
                    cardBorder = 'rgba(34,197,94,0.15)';
                } else if (req.status === 'declined') {
                    statusBadge = '<span style="background:rgba(239,68,68,0.2);color:#f87171;font-size:7px;font-weight:700;padding:2px 8px;border-radius:9999px;">❌ Declined</span>';
                    cardBorder = 'rgba(239,68,68,0.15)';
                }

                var initChar = req.name ? req.name.charAt(0).toUpperCase() : '?';

                html += '<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.03);border:1px solid ' + cardBorder + ';border-radius:12px;padding:10px 14px;margin-bottom:8px;">' +
                    '<div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#fff;background:linear-gradient(135deg,#f59e0b,#d97706);flex-shrink:0;">' + initChar + '</div>' +
                    '<div style="flex:1;min-width:0;">' +
                        '<div style="color:#fff;font-size:10px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escFriend(req.name) + '</div>' +
                        '<div style="display:flex;align-items:center;gap:8px;font-size:8px;color:#6b7280;margin-top:2px;">' +
                            '<span>🏆 ' + (req.trophies || 0) + '</span>' +
                            '<span>⚔️ W' + (req.wave || 1) + '</span>' +
                            '<span style="color:#4b5563;">· ' + sentTime + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div>' + statusBadge + '</div>' +
                '</div>';
            }

            // Clear resolved button
            var hasResolved = false;
            for (var c = 0; c < sentList.length; c++) {
                if (sentList[c].status !== 'pending') { hasResolved = true; break; }
            }
            if (hasResolved) {
                html += '<div style="text-align:center;margin-top:8px;">' +
                    '<button onclick="clearResolvedRequests()" style="background:rgba(55,65,81,0.3);color:#9ca3af;font-size:8px;font-weight:700;padding:6px 16px;border-radius:8px;cursor:pointer;border:1px solid rgba(55,65,81,0.3);transition:all 0.2s;">Clear Resolved</button>' +
                '</div>';
            }
        }

        return html;
    }

    // ---- TAB: INCOMING REQUESTS ----
    function buildRequestsTab() {
        var html = '';
        var recvList = state.friendRequests.received || [];

        if (recvList.length === 0) {
            html += '<div style="text-align:center;padding:40px 0;">' +
                '<div style="font-size:28px;margin-bottom:12px;opacity:0.4;">📩</div>' +
                '<div style="color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">No Requests</div>' +
                '<div style="color:#4b5563;font-size:8px;margin-top:4px;">Incoming friend requests will appear here.</div>' +
            '</div>';
        } else {
            for (var i = 0; i < recvList.length; i++) {
                var req = recvList[i];
                var recvTime = getTimeAgo(new Date(req.receivedAt || Date.now()));
                var initChar = req.name ? req.name.charAt(0).toUpperCase() : '?';

                html += '<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(59,130,246,0.15);border-radius:12px;padding:10px 14px;margin-bottom:8px;">' +
                    '<div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#fff;background:linear-gradient(135deg,#3b82f6,#06b6d4);flex-shrink:0;">' + initChar + '</div>' +
                    '<div style="flex:1;min-width:0;">' +
                        '<div style="color:#fff;font-size:10px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escFriend(req.name) + '</div>' +
                        '<div style="display:flex;align-items:center;gap:8px;font-size:8px;color:#6b7280;margin-top:2px;">' +
                            '<span>🏆 ' + (req.trophies || 0) + '</span>' +
                            '<span>⚔️ W' + (req.wave || 1) + '</span>' +
                            '<span style="color:#4b5563;">· ' + recvTime + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div style="display:flex;align-items:center;gap:6px;">' +
                        '<button onclick="acceptIncomingRequest(' + i + ')" style="background:rgba(34,197,94,0.25);color:#4ade80;font-size:10px;font-weight:700;padding:6px 10px;border-radius:8px;cursor:pointer;border:1px solid rgba(34,197,94,0.2);transition:all 0.2s;" title="Accept">✓</button>' +
                        '<button onclick="declineIncomingRequest(' + i + ')" style="background:rgba(239,68,68,0.2);color:#f87171;font-size:10px;font-weight:700;padding:6px 10px;border-radius:8px;cursor:pointer;border:1px solid rgba(239,68,68,0.2);transition:all 0.2s;" title="Decline">✗</button>' +
                    '</div>' +
                '</div>';
            }
        }

        return html;
    }

    function switchFriendTab(tab) {
        _activeTab = tab;
        refreshModalIfOpen();
    }

    function clearResolvedRequests() {
        initFriends();
        state.friendRequests.sent = state.friendRequests.sent.filter(function(r) {
            return r.status === 'pending';
        });
        if (typeof saveProgress === 'function') saveProgress();
        refreshModalIfOpen();
    }

    function closeFriendList() {
        var modal = document.getElementById('friend-list-modal');
        if (modal) modal.remove();
    }

    // ---- ADD FRIEND PROMPT ----
    function showAddFriendPrompt() {
        initFriends();

        if (state.friends.length >= MAX_FRIENDS) {
            if (typeof showGameAlert === 'function') showGameAlert('👥 Full', 'You have reached the maximum of ' + MAX_FRIENDS + ' friends.');
            return;
        }

        var existing = document.getElementById('add-friend-prompt');
        if (existing) existing.remove();

        var prompt = document.createElement('div');
        prompt.id = 'add-friend-prompt';
        prompt.style.cssText = 'position:fixed;inset:0;z-index:9400;display:flex;align-items:center;justify-content:center;';
        prompt.innerHTML = '' +
            '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);" onclick="document.getElementById(\'add-friend-prompt\').remove()"></div>' +
            '<div style="position:relative;background:rgba(15,23,42,0.97);backdrop-filter:blur(20px);border:1px solid rgba(59,130,246,0.2);border-radius:16px;padding:20px;max-width:320px;width:calc(100% - 32px);box-shadow:0 25px 80px rgba(0,0,0,0.6);text-align:center;">' +
                '<div style="font-size:28px;margin-bottom:8px;">👤</div>' +
                '<div style="font-size:10px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">Send Friend Request</div>' +
                '<input id="friend-name-input" type="text" placeholder="Enter player name..." ' +
                    'style="width:100%;box-sizing:border-box;background:#1e293b;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 16px;color:#fff;font-size:11px;outline:none;margin-bottom:12px;" ' +
                    'maxlength="24" autocomplete="off">' +
                '<div style="display:flex;gap:8px;">' +
                    '<button onclick="document.getElementById(\'add-friend-prompt\').remove()" style="flex:1;background:#1e293b;color:#9ca3af;font-size:10px;font-weight:700;padding:8px;border-radius:8px;cursor:pointer;border:1px solid rgba(255,255,255,0.04);transition:all 0.2s;">Cancel</button>' +
                    '<button onclick="addFriendFromInput()" style="flex:1;background:#2563eb;color:#fff;font-size:10px;font-weight:700;padding:8px;border-radius:8px;cursor:pointer;border:1px solid rgba(59,130,246,0.4);transition:all 0.2s;">Send Request 📨</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(prompt);

        setTimeout(function() {
            var input = document.getElementById('friend-name-input');
            if (input) {
                input.focus();
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') addFriendFromInput();
                });
            }
        }, 100);
    }

    function addFriendFromInput() {
        var input = document.getElementById('friend-name-input');
        if (!input) return;

        var name = input.value.trim();
        if (!name) {
            input.style.borderColor = '#ef4444';
            return;
        }

        sendFriendRequest(name);

        var prompt = document.getElementById('add-friend-prompt');
        if (prompt) prompt.remove();
    }

    // ---- ADD FRIEND (legacy — now routes through request system) ----
    function addFriend(name, data) {
        return sendFriendRequest(name, data);
    }

    // ---- REMOVE FRIEND ----
    function removeFriend(index) {
        initFriends();

        if (index < 0 || index >= state.friends.length) return;
        var name = state.friends[index].name;

        state.friends.splice(index, 1);

        if (typeof SoundManager !== 'undefined') SoundManager.playFX('click');
        if (typeof showGameAlert === 'function') showGameAlert('👤 Removed', name + ' was removed from your friend list.');
        if (typeof saveProgress === 'function') saveProgress();
        refreshModalIfOpen();
    }

    // ---- CHALLENGE FRIEND (Friendly PVP) ----
    function challengeFriend(index) {
        initFriends();

        if (index < 0 || index >= state.friends.length) return;
        var friend = state.friends[index];

        closeFriendList();

        if (typeof startPvpBattle === 'function' || typeof openPvpArena === 'function') {
            var opponent = {
                name: friend.name,
                trophies: friend.trophies || 0,
                isFriendly: true,
                team: []
            };

            if (typeof CHARACTERS !== 'undefined') {
                var charKeys = Object.keys(CHARACTERS);
                var teamSize = Math.min(5, charKeys.length);
                var shuffled = charKeys.slice().sort(function() { return Math.random() - 0.5; });
                for (var i = 0; i < teamSize; i++) {
                    var ch = CHARACTERS[shuffled[i]];
                    opponent.team.push({
                        key: shuffled[i],
                        name: ch.name,
                        hp: ch.hp || 100,
                        maxHp: ch.hp || 100,
                        atk: ch.atk || 10,
                        def: ch.def || 5,
                        spd: ch.spd || 1,
                        level: Math.max(1, (state.wave || 1) - 5 + Math.floor(Math.random() * 10))
                    });
                }
            }

            if (typeof startPvpBattle === 'function') {
                startPvpBattle(opponent);
            } else if (typeof showGameAlert === 'function') {
                showGameAlert('⚔️ Challenge', 'Challenged ' + friend.name + ' to a friendly duel!');
            }
        }
    }

    // ---- QUICK-ADD FROM PVP / LEADERBOARD ----
    function addFriendQuick(name, data) {
        return addFriend(name, data);
    }

    // ---- HELPERS ----
    function escFriend(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function getTimeAgo(date) {
        var diff = Date.now() - date.getTime();
        var mins = Math.floor(diff / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return mins + 'm ago';
        var hours = Math.floor(mins / 60);
        if (hours < 24) return hours + 'h ago';
        var days = Math.floor(hours / 24);
        if (days < 30) return days + 'd ago';
        return Math.floor(days / 30) + 'mo ago';
    }

    // ---- RE-HYDRATE PENDING TIMERS ON LOAD ----
    // For any sent requests still 'pending', set timers for remaining time
    function rehydratePendingTimers() {
        initFriends();
        var now = Date.now();
        for (var i = 0; i < state.friendRequests.sent.length; i++) {
            var req = state.friendRequests.sent[i];
            if (req.status !== 'pending') continue;
            // Original max delay was 60s from sentAt
            var elapsed = now - (req.sentAt || now);
            var remaining = Math.max(1000, 60000 - elapsed); // resolve within at most 60s of original send
            (function(r) {
                _pendingTimers[r.id] = setTimeout(function() {
                    resolveOutgoingRequest(r.id, r);
                }, remaining);
            })(req);
        }
    }

    // Auto-init on load
    if (typeof state !== 'undefined') {
        rehydratePendingTimers();
    } else {
        // Defer until state exists
        var _initInterval = setInterval(function() {
            if (typeof state !== 'undefined') {
                clearInterval(_initInterval);
                rehydratePendingTimers();
            }
        }, 500);
    }

    // Exports
    window.openFriendList = openFriendList;
    window.closeFriendList = closeFriendList;
    window.addFriend = addFriend;
    window.addFriendQuick = addFriendQuick;
    window.removeFriend = removeFriend;
    window.challengeFriend = challengeFriend;
    window.showAddFriendPrompt = showAddFriendPrompt;
    window.addFriendFromInput = addFriendFromInput;
    window.sendGift = sendGift;
    window.sendAllGifts = sendAllGifts;
    window.claimReceivedGift = claimReceivedGift;
    window.claimAllGifts = claimAllGifts;
    window.switchFriendTab = switchFriendTab;
    window.acceptIncomingRequest = acceptIncomingRequest;
    window.declineIncomingRequest = declineIncomingRequest;
    window.clearResolvedRequests = clearResolvedRequests;
    window.sendFriendRequest = sendFriendRequest;
    window.generateIncomingRequest = generateIncomingRequest;
})();
