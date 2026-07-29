// ============================================================
// STORY: WAVE 120 — TIMELINE FRACTURE
// The team defeats Dr. Chaos but the timeline shatters
// A new portal opens to the SPACE TIMELINE
// ============================================================
(function() {
    'use strict';

    var STORY_FLAG = 'story_wave120_seen';
    var _storyActive = false;
    var _overlay = null;
    var _currentScene = 0;

    // ── STORYLINE SCENES ──
    var scenes = [
        {
            bg: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #0d0d2d 100%)',
            title: '🧪 DR. CHAOS DEFEATED',
            text: "After an epic battle, the team finally defeats Dr. Chaos in his secret laboratory. His machines crumble, his robot army falls...",
            visual: 'explosion',
            shake: true
        },
        {
            bg: 'linear-gradient(180deg, #1a0030 0%, #2d1060 50%, #0a0020 100%)',
            title: '⚠️ TIMELINE UNSTABLE',
            text: "But something is wrong. The time machine core is cracking. The energy from Dr. Chaos's defeat is feeding back into the timeline vortex!",
            visual: 'warning',
            shake: true
        },
        {
            bg: 'linear-gradient(180deg, #000020 0%, #0a1040 50%, #001030 100%)',
            title: '🌀 THE FRACTURE',
            text: "CRACK! The timeline shatters like glass. Fragments of different eras swirl around the team. They see dinosaurs, medieval knights, and... SPACE SHIPS?!",
            visual: 'fracture'
        },
        {
            bg: 'linear-gradient(180deg, #000010 0%, #0a0a30 50%, #000020 100%)',
            title: '🚀 A NEW PORTAL',
            text: "Young Sheldon quickly analyzes the readings: 'The fracture opened a wormhole! It leads to a SPACE TIMELINE — an alternate future where humanity colonized the galaxy!'",
            visual: 'portal'
        },
        {
            bg: 'linear-gradient(180deg, #050520 0%, #101050 50%, #050530 100%)',
            title: '👾 ALIEN SIGNAL',
            text: "But there's a distress signal coming through the portal. 'HELP! The Galactic Overlord has conquered our timeline! Only outsiders can save us!'",
            visual: 'signal'
        },
        {
            bg: 'linear-gradient(180deg, #0a0a2a 0%, #1a1a4a 50%, #0a0a3a 100%)',
            title: '🤝 THE DECISION',
            text: "Sheldon steps forward: 'We can't ignore this. If we fix this timeline too, we might be able to stabilize the fracture and get everyone home.' Meemaw adds: 'Plus, I ain't passin' up a chance to see aliens!'",
            visual: 'team'
        },
        {
            bg: 'linear-gradient(180deg, #000030 0%, #0a2050 50%, #001040 100%)',
            title: '🌌 INTO THE UNKNOWN',
            text: "The team gathers their courage and steps through the space portal. On the other side: infinite stars, floating cities, and an armada of alien warships blocking their path...",
            visual: 'space'
        },
        {
            bg: 'linear-gradient(180deg, #000010 0%, #001030 50%, #000020 100%)',
            title: '⭐ SPACE TIMELINE UNLOCKED!',
            text: "A new era begins! The Space Timeline awaits with alien enemies, galactic bosses, and cosmic rewards. But first, you'll need to grow stronger in Texas...",
            visual: 'unlock',
            final: true
        }
    ];

    // ── RENDER ENGINE ──
    function createOverlay() {
        _overlay = document.createElement('div');
        _overlay.id = 'story-120-overlay';
        _overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.95);opacity:0;transition:opacity 0.8s;';
        document.body.appendChild(_overlay);
        requestAnimationFrame(function() { _overlay.style.opacity = '1'; });
    }

    function renderScene(index) {
        if (!_overlay || index >= scenes.length) { endStory(); return; }
        var scene = scenes[index];
        _currentScene = index;

        var visualHTML = getVisualHTML(scene.visual);
        var isLast = scene.final;

        _overlay.innerHTML = `
            <div style="max-width:500px;width:90%;text-align:center;padding:24px;animation:tmFadeIn 0.8s ease-out;">
                <style>
                    @keyframes tmFadeIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
                    @keyframes tmPulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
                    @keyframes tmFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
                    @keyframes tmShake { 0%,100% { transform:translateX(0); } 25% { transform:translateX(-5px); } 75% { transform:translateX(5px); } }
                    @keyframes starfield { from { transform:translateY(0); } to { transform:translateY(20px); } }
                </style>
                ${visualHTML}
                <h2 style="font-size:22px;font-weight:900;color:#c4b5fd;margin:16px 0 8px;letter-spacing:2px;text-shadow:0 0 20px rgba(167,139,250,0.5);">${scene.title}</h2>
                <p style="font-size:13px;color:#a5b4fc;line-height:1.7;margin-bottom:24px;text-shadow:0 1px 3px rgba(0,0,0,0.5);">${scene.text}</p>
                <button onclick="window._story120Next()" style="padding:10px 32px;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;border:2px solid #8b5cf6;border-radius:12px;font-size:13px;font-weight:bold;cursor:pointer;letter-spacing:1px;transition:all 0.3s;box-shadow:0 4px 15px rgba(124,58,237,0.4);">
                    ${isLast ? '🚀 BEGIN THE ADVENTURE' : 'CONTINUE ▸'}
                </button>
                <div style="margin-top:16px;font-size:10px;color:#6366f1;opacity:0.6;">${index + 1} / ${scenes.length}</div>
            </div>
        `;

        _overlay.style.background = scene.bg;
        if (scene.shake) {
            _overlay.style.animation = 'tmShake 0.3s ease-in-out 3';
            setTimeout(function() { if (_overlay) _overlay.style.animation = ''; }, 1000);
        }
    }

    function getVisualHTML(key) {
        switch (key) {
            case 'explosion':
                return '<div style="font-size:64px;animation:tmFloat 2s ease-in-out infinite;">💥🧪💀</div>';
            case 'warning':
                return '<div style="font-size:48px;animation:tmPulse 1s ease-in-out infinite;color:#ef4444;">⚠️ ⏰ ⚠️</div>';
            case 'fracture':
                return '<div style="font-size:48px;animation:tmShake 0.5s ease-in-out infinite;">🌀💫🔮💫🌀</div>';
            case 'portal':
                return '<div style="font-size:64px;animation:tmFloat 1.5s ease-in-out infinite;">🚀🌀✨</div>';
            case 'signal':
                return '<div style="font-size:48px;animation:tmPulse 0.8s ease-in-out infinite;">📡👾🆘👾📡</div>';
            case 'team':
                return '<div style="display:flex;justify-content:center;gap:8px;font-size:32px;animation:tmFloat 2s ease-in-out infinite;">🧑‍🔬👩‍🔬👨‍🏫👵🧪</div>';
            case 'space':
                return '<div style="font-size:48px;animation:tmFloat 2s ease-in-out infinite;">🌌🛸⭐🪐🌟</div>';
            case 'unlock':
                return '<div style="font-size:64px;animation:tmPulse 1.5s ease-in-out infinite;">🎉⭐🚀⭐🎉</div>';
            default:
                return '<div style="font-size:48px;">🌟</div>';
        }
    }

    window._story120Next = function() {
        renderScene(_currentScene + 1);
    };

    // ── STORY END ──
    function endStory() {
        _storyActive = false;
        if (typeof state !== 'undefined') {
            state[STORY_FLAG] = true;
            if (typeof saveProgress === 'function') saveProgress();
        }

        if (_overlay) {
            _overlay.style.opacity = '0';
            setTimeout(function() {
                if (_overlay && _overlay.parentNode) _overlay.parentNode.removeChild(_overlay);
                _overlay = null;
            }, 800);
        }

        if (typeof showGameAlert === 'function') {
            setTimeout(function() {
                showGameAlert(
                    '🌌 TIMELINE FRACTURE!',
                    'The Space Timeline has been discovered! A new adventure awaits beyond the stars. Grow stronger in Texas to prepare...',
                    10000
                );
            }, 1500);
        }
    }

    // ── TRIGGER CHECK ──
    function shouldTrigger() {
        if (typeof state === 'undefined') return false;
        if (state[STORY_FLAG]) return false;
        if (_storyActive) return false;
        if (typeof state.wave === 'undefined') return false;
        return state.wave >= 120;
    }

    function triggerStory() {
        if (_storyActive) return;
        _storyActive = true;
        createOverlay();
        renderScene(0);
    }

    // ── AUTO-CHECK ──
    setInterval(function() {
        if (shouldTrigger()) triggerStory();
    }, 3000);

    // Expose for manual trigger (debug)
    window.triggerStory120 = triggerStory;

    console.log('[Story120] Wave 120 Timeline Fracture storyline loaded');
})();
