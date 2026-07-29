// ============================================================
// HUD HELPERS — Resource Drawer + More Menu
// Keeps the HUD clean by hiding secondary UI behind toggles
// ============================================================

(function() {
    'use strict';

    // ---- RESOURCE DRAWER (top bar expand) ----
    var drawerOpen = false;

    window.toggleResourceDrawer = function() {
        var drawer = document.getElementById('resource-drawer');
        var btn = document.getElementById('res-expand-btn');
        if (!drawer) return;

        drawerOpen = !drawerOpen;
        if (drawerOpen) {
            drawer.classList.remove('hidden');
            drawer.style.animation = 'slideDown 0.15s ease-out';
            if (btn) btn.textContent = '\u25B2'; // ▲
        } else {
            drawer.classList.add('hidden');
            if (btn) btn.textContent = '\u25BC'; // ▼
        }
    };

    // Auto-close drawer on any modal open
    document.addEventListener('click', function(e) {
        if (!drawerOpen) return;
        var drawer = document.getElementById('resource-drawer');
        var topBar = e.target.closest('.absolute.top-0');
        if (!topBar && drawer && !drawer.contains(e.target)) {
            toggleResourceDrawer();
        }
    });

    // ---- MORE MENU (side rail expand) ----
    var moreOpen = false;

    window.toggleMoreMenu = function() {
        moreOpen = !moreOpen;
        var existing = document.getElementById('more-menu-overlay');

        if (!moreOpen) {
            if (existing) existing.remove();
            var icon = document.getElementById('more-menu-icon');
            if (icon) icon.textContent = '\u22EF'; // ⋯
            return;
        }

        var icon = document.getElementById('more-menu-icon');
        if (icon) icon.textContent = '\u2715'; // ✕

        // Build the categorized grid
        var items = [
            // Row: Combat & Challenge
            { section: 'Combat' },
            { icon: '\uD83C\uDFAE', label: 'Mini-Games', fn: 'openMinigamesHub()', color: '#a855f7' },
            { icon: '\u2694\uFE0F',  label: 'Sweep',      fn: 'openWaveSweepModal&&openWaveSweepModal()', color: '#22c55e' },
            { icon: '\uD83C\uDFD7\uFE0F', label: 'Tower', fn: 'openTowerModal&&openTowerModal()', color: '#f97316' },
            { icon: '\uD83D\uDCC5', label: 'Events',     fn: 'openEventsModal()',  color: '#06b6d4' },

            // Row: Progress & Rewards
            { section: 'Progress' },
            { icon: '\uD83C\uDFC6', label: 'Achieve',    fn: 'openAchievementsModal()', color: '#fbbf24', badgeId: 'achievement-badge-more' },
            { icon: '\uD83C\uDFAF', label: 'Missions',   fn: 'openDailyMissions()',     color: '#ef4444', badgeId: 'daily-mission-badge-more' },
            { icon: '\uD83C\uDFAB', label: 'Pass',       fn: 'openBattlePass&&openBattlePass()', color: '#e879f9' },
            { icon: '\u26A1',       label: 'Power',      fn: 'showPowerBreakdown&&showPowerBreakdown()', color: '#fb923c' },

            // Row: Collect & Trade
            { section: 'Collect & Trade' },
            { icon: '\uD83C\uDFB0', label: 'Gacha',      fn: 'openComicStore()',   color: '#f59e0b' },
            { icon: '\uD83C\uDF70', label: 'Food',       fn: 'openFoodShop(event)',color: '#f472b6' },
            { icon: '\uD83C\uDFEA', label: 'Trade',      fn: 'openTradingPost&&openTradingPost()', color: '#2dd4bf' },
            { icon: '\uD83D\uDCCA', label: 'Stats',      fn: 'openStatsModal()',        color: '#64748b' },

            // Row: Social & Info
            { section: 'Social' },
            { icon: '\uD83D\uDC65', label: 'Friends',    fn: 'openFriendList()',   color: '#8b5cf6' },
            { icon: '\uD83D\uDCD5', label: 'Codex',      fn: 'openBestiary()',     color: '#b45309' },
            { icon: '\uD83D\uDCDC', label: 'Log',        fn: 'openBattleLog()',    color: '#475569' },

            // Row: Build
            { section: 'Build' },
            { icon: '\uD83D\uDD27', label: 'Bots',       fn: 'openRobotsModal(event)', color: '#94a3b8' },
            { icon: '\uD83D\uDEAA', label: 'Apt 4A',     fn: 'toggleHangoutMode(event)', color: '#d97706' }
        ];

        var html = '';
        var gridItems = '';
        var currentSection = '';

        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item.section) {
                // Close previous grid if any
                if (gridItems) {
                    html += '<div class="grid grid-cols-4 gap-1.5">' + gridItems + '</div>';
                    gridItems = '';
                }
                html += '<div class="text-[7px] text-gray-500 uppercase tracking-widest font-bold ' + (i > 0 ? 'mt-2' : '') + ' mb-1">' + item.section + '</div>';
                continue;
            }

            var badgeHtml = '';
            if (item.badgeId) {
                badgeHtml = '<span id="' + item.badgeId + '" class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[7px] text-white font-bold flex items-center justify-center hidden" style="border:1.5px solid #0f172a"></span>';
            }

            gridItems += '' +
                '<button onclick="toggleMoreMenu();' + item.fn + '" class="relative flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-lg cursor-pointer transition-all hover:scale-105 active:scale-95" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06)">' +
                    badgeHtml +
                    '<span class="text-sm">' + item.icon + '</span>' +
                    '<span class="text-[7px] font-bold uppercase tracking-wider" style="color:' + item.color + '">' + item.label + '</span>' +
                '</button>';
        }
        // Close last grid
        if (gridItems) {
            html += '<div class="grid grid-cols-4 gap-1.5">' + gridItems + '</div>';
        }

        var overlay = document.createElement('div');
        overlay.id = 'more-menu-overlay';
        overlay.className = 'fixed inset-0 z-[200] flex items-end justify-end';
        overlay.innerHTML = '' +
            '<div class="absolute inset-0 bg-black/50" onclick="toggleMoreMenu()"></div>' +
            '<div class="relative mb-16 mr-1 w-[240px] max-h-[70vh] overflow-y-auto rounded-xl shadow-2xl" style="background:rgba(15,23,42,0.97);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(20px);animation:moreMenuIn 0.2s ease-out">' +
                '<div class="p-3">' +
                    '<div class="text-[9px] text-white font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">' +
                        '<span class="text-gray-400">\u2261</span> All Features' +
                    '</div>' +
                    html +
                '</div>' +
            '</div>';

        document.body.appendChild(overlay);
    };

    // ---- CSS ----
    if (!document.getElementById('hud-helpers-styles')) {
        var style = document.createElement('style');
        style.id = 'hud-helpers-styles';
        style.textContent = [
            '@keyframes slideDown { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }',
            '@keyframes moreMenuIn { from { opacity:0; transform:translateY(12px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }',
            '#more-menu-overlay button:focus { outline:none; }',
            '#resource-drawer { transition: all 0.15s ease-out; }'
        ].join('\n');
        document.head.appendChild(style);
    }
})();
