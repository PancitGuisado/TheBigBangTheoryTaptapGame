// ============================================================
// LOCAL NOTIFICATIONS SYSTEM (Capacitor)
// ============================================================
// Uses @capacitor/local-notifications to send push-style
// notifications that bring players back to the game.

var NotificationManager = (function() {
    var initialized = false;
    var plugin = null;
    
    // Notification IDs (fixed so we can cancel/replace them)
    var IDS = {
        DAILY_REWARD: 1001,
        OFFLINE_PROGRESS: 1002,
        PVP_ENERGY: 1003,
        HOSPITAL_READY: 1004,
        COME_BACK_1H: 1005,
        COME_BACK_4H: 1006,
        COME_BACK_24H: 1007
    };

    async function init() {
        if (initialized) return true;
        
        try {
            // Check if we're in a Capacitor native context
            if (typeof Capacitor === 'undefined' || !Capacitor.isNativePlatform()) {
                console.log('[Notifications] Not on native platform, skipping');
                return false;
            }
            
            // Import the plugin
            plugin = Capacitor.Plugins.LocalNotifications;
            if (!plugin) {
                console.warn('[Notifications] LocalNotifications plugin not available');
                return false;
            }
            
            // Request permission
            var perm = await plugin.requestPermissions();
            if (perm.display !== 'granted') {
                console.warn('[Notifications] Permission denied');
                return false;
            }
            
            initialized = true;
            console.log('[Notifications] Initialized successfully');
            return true;
        } catch (e) {
            console.warn('[Notifications] Init failed:', e);
            return false;
        }
    }

    // Cancel all game notifications
    async function cancelAll() {
        if (!plugin) return;
        try {
            var pending = await plugin.getPending();
            if (pending.notifications && pending.notifications.length > 0) {
                await plugin.cancel({ notifications: pending.notifications });
            }
        } catch (e) {
            console.warn('[Notifications] Cancel failed:', e);
        }
    }

    // Schedule notifications when app goes to background
    async function scheduleOnPause() {
        if (!initialized || !plugin) return;
        if (typeof state !== 'undefined' && state.notificationsEnabled === false) return;
        
        // Cancel any existing scheduled notifications first
        await cancelAll();
        
        var notifications = [];
        var now = new Date();
        
        // 1. Daily Reward Reminder (if unclaimed, remind in 30 min)
        if (typeof canClaimDaily === 'function' && canClaimDaily()) {
            notifications.push({
                id: IDS.DAILY_REWARD,
                title: '🎁 Daily Reward Ready!',
                body: 'Your daily reward is waiting! Come collect Bazinga Points and resources.',
                schedule: { at: new Date(now.getTime() + 30 * 60 * 1000) }, // 30 min
                smallIcon: 'ic_launcher',
                iconColor: '#f59e0b'
            });
        }
        
        // 2. Offline Progress Reminder (after 2 hours)
        notifications.push({
            id: IDS.OFFLINE_PROGRESS,
            title: '💰 Your Gang is Earning!',
            body: 'Your characters have been grinding while you were away. Come collect your rewards!',
            schedule: { at: new Date(now.getTime() + 2 * 60 * 60 * 1000) }, // 2 hours
            smallIcon: 'ic_launcher',
            iconColor: '#22c55e'
        });
        
        // 3. Hospital Recovery (check if any characters are hospitalized)
        if (typeof state !== 'undefined' && state.roster) {
            var hospitalizedCount = 0;
            var shortestRecovery = Infinity;
            
            for (var key in state.roster) {
                if (state.roster[key] && state.roster[key].status === 'hospitalized') {
                    hospitalizedCount++;
                    // Estimate recovery: ~5 min per character
                    var recoveryMs = 5 * 60 * 1000;
                    if (recoveryMs < shortestRecovery) shortestRecovery = recoveryMs;
                }
            }
            
            if (hospitalizedCount > 0) {
                notifications.push({
                    id: IDS.HOSPITAL_READY,
                    title: '🏥 Characters Recovered!',
                    body: hospitalizedCount + ' character(s) have recovered from the hospital and are ready to fight!',
                    schedule: { at: new Date(now.getTime() + shortestRecovery) },
                    smallIcon: 'ic_launcher',
                    iconColor: '#ef4444'
                });
            }
        }
        
        // 4. Comeback reminders (engagement hooks)
        notifications.push({
            id: IDS.COME_BACK_1H,
            title: '⚔️ The Gang Needs You!',
            body: 'Sheldon says: "Your absence is noted. The enemy waves won\'t defeat themselves." Bazinga!',
            schedule: { at: new Date(now.getTime() + 1 * 60 * 60 * 1000) }, // 1 hour
            smallIcon: 'ic_launcher',
            iconColor: '#8b5cf6'
        });
        
        notifications.push({
            id: IDS.COME_BACK_4H,
            title: '🏟️ Arena Battles Await!',
            body: 'Your PVP energy is full! Challenge other players and climb the trophy ladder.',
            schedule: { at: new Date(now.getTime() + 4 * 60 * 60 * 1000) }, // 4 hours
            smallIcon: 'ic_launcher',
            iconColor: '#ec4899'
        });
        
        notifications.push({
            id: IDS.COME_BACK_24H,
            title: '📅 Don\'t Break Your Streak!',
            body: 'You haven\'t played today. Log in to keep your daily reward streak going!',
            schedule: { at: new Date(now.getTime() + 24 * 60 * 60 * 1000) }, // 24 hours
            smallIcon: 'ic_launcher',
            iconColor: '#f97316'
        });
        
        // Schedule all
        if (notifications.length > 0) {
            try {
                await plugin.schedule({ notifications: notifications });
                console.log('[Notifications] Scheduled ' + notifications.length + ' notifications');
            } catch (e) {
                console.warn('[Notifications] Schedule failed:', e);
            }
        }
    }

    // Cancel all notifications when app resumes (player is active)
    async function cancelOnResume() {
        if (!initialized || !plugin) return;
        await cancelAll();
        console.log('[Notifications] Cancelled all (app resumed)');
    }

    return {
        init: init,
        scheduleOnPause: scheduleOnPause,
        cancelOnResume: cancelOnResume,
        cancelAll: cancelAll
    };
})();

// ============================================================
// APP LIFECYCLE HOOKS
// ============================================================
// Listen for app going to background/foreground
document.addEventListener('DOMContentLoaded', function() {
    // Initialize notifications
    NotificationManager.init();
    
    // Capacitor App plugin for lifecycle events
    if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform() && Capacitor.Plugins.App) {
        Capacitor.Plugins.App.addListener('appStateChange', function(appState) {
            if (appState.isActive) {
                // App came to foreground — cancel pending notifications
                NotificationManager.cancelOnResume();
            } else {
                // App went to background — schedule notifications
                NotificationManager.scheduleOnPause();
            }
        });
        console.log('[Notifications] App lifecycle listeners registered');
    }
    
    // Also handle browser visibility change (for web testing)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            NotificationManager.scheduleOnPause();
        } else {
            NotificationManager.cancelOnResume();
        }
    });
});

// ============================================================
// BROWSER PUSH NOTIFICATIONS (Web Notification API)
// ============================================================
// Works on desktop browsers even when tab is in background.
// Requires user gesture to request permission.

var BrowserNotifications = (function() {
    var _permitted = false;
    var _timers = [];

    function isSupported() {
        return 'Notification' in window;
    }

    function requestPermission() {
        if (!isSupported()) return;
        if (Notification.permission === 'granted') {
            _permitted = true;
            return;
        }
        if (Notification.permission === 'denied') return;

        Notification.requestPermission().then(function(perm) {
            _permitted = (perm === 'granted');
            console.log('[BrowserNotif] Permission: ' + perm);
        });
    }

    function send(title, body, icon) {
        if (!_permitted || !isSupported()) return;
        if (document.visibilityState === 'visible') return; // don't notify while active

        try {
            var notif = new Notification(title, {
                body: body,
                icon: icon || '/images/icon-192.png',
                badge: '/images/icon-192.png',
                tag: 'tbbt-' + Date.now(),
                requireInteraction: false
            });

            // Focus the game tab when notification is clicked
            notif.onclick = function() {
                window.focus();
                notif.close();
            };

            // Auto-close after 8 seconds
            setTimeout(function() { notif.close(); }, 8000);
        } catch(e) {
            console.warn('[BrowserNotif] Failed:', e);
        }
    }

    function cancelAll() {
        _timers.forEach(function(t) { clearTimeout(t); });
        _timers = [];
    }

    function scheduleOnHide() {
        if (!_permitted) return;
        cancelAll();

        // Don't schedule if user disabled notifications
        if (typeof state !== 'undefined' && state.notificationsEnabled === false) return;

        // 1. Comeback after 30 min
        _timers.push(setTimeout(function() {
            send('⚔️ The Gang Needs You!', 'Your characters are idle. Come back and keep fighting!');
        }, 30 * 60 * 1000));

        // 2. Daily rewards reminder after 1 hour
        _timers.push(setTimeout(function() {
            if (typeof canClaimDaily === 'function' && canClaimDaily()) {
                send('🎁 Daily Reward Ready!', 'Your daily reward is waiting. Don\'t break your streak!');
            }
        }, 60 * 60 * 1000));

        // 3. Hospital recovery check after 5 min
        if (typeof state !== 'undefined' && state.roster) {
            var hasHospitalized = false;
            for (var key in state.roster) {
                if (state.roster[key] && state.roster[key].status === 'hospitalized') {
                    hasHospitalized = true;
                    break;
                }
            }
            if (hasHospitalized) {
                _timers.push(setTimeout(function() {
                    send('🏥 Characters Recovered!', 'Your gang members are healed and ready for battle!');
                }, 5 * 60 * 1000));
            }
        }

        // 4. After 4 hours
        _timers.push(setTimeout(function() {
            send('🏟️ Arena Battles Await!', 'Challenge other players in the PVP Arena!');
        }, 4 * 60 * 60 * 1000));
    }

    // Init: request permission on first user interaction
    function init() {
        if (!isSupported()) return;
        if (Notification.permission === 'granted') {
            _permitted = true;
        } else {
            // Request on first click/tap
            document.body.addEventListener('click', function() {
                requestPermission();
            }, { once: true });
        }

        // Schedule on visibility change
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden') {
                scheduleOnHide();
            } else {
                cancelAll();
            }
        });

        console.log('[BrowserNotif] Initialized (permission: ' + Notification.permission + ')');
    }

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        init: init,
        send: send,
        requestPermission: requestPermission,
        isSupported: isSupported
    };
})();

