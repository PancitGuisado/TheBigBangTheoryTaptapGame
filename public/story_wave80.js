// ============================================================
// STORY: WAVE 80 — THE TIME MACHINE / YOUNG SHELDON TIMELINE
// Triggers once after reaching wave 80
// ============================================================

(function() {
    'use strict';

    var STORY_FLAG = 'story_wave80_seen';
    var _storyActive = false;
    var _currentScene = 0;
    var _overlay = null;

    // ── SCENES ──
    var scenes = [
        // Scene 1: Team discussion
        {
            bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            title: 'CALTECH UNIVERSITY — PHYSICS LAB',
            dialogue: [
                { speaker: 'Sheldon', emoji: '🧪', text: 'Gentlemen... and Penny. We need to discuss the elephant in the room.' },
                { speaker: 'Penny', emoji: '🍷', text: 'There\'s an elephant? Where?' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'The PORTAL, Penny. The one WE created. The one that unleashed every enemy across Pasadena.' },
                { speaker: 'Leonard', emoji: '🤓', text: 'He\'s right. We caused this. We need to fix it.' },
                { speaker: 'Howard', emoji: '🚀', text: 'I\'ve been running the numbers. There might be a way... but it\'s crazy.' },
                { speaker: 'Raj', emoji: '⭐', text: 'How crazy are we talking? "Build a rocket in your garage" crazy or "break the laws of physics" crazy?' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'We build a TIME MACHINE. We go back and stop ourselves from creating the portal.' }
            ],
            visual: 'team'
        },
        // Scene 2: Building the time machine
        {
            bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            title: 'TWO WEEKS LATER...',
            dialogue: [
                { speaker: 'Howard', emoji: '🚀', text: 'I\'ve modified the flux capacitor — I mean the temporal displacement unit.' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'For the last time, Howard, we\'re NOT calling it a flux capacitor.' },
                { speaker: 'Leonard', emoji: '🤓', text: 'The quantum entanglement matrix is stable. I think we\'re ready.' },
                { speaker: 'Raj', emoji: '⭐', text: 'I packed snacks. You can\'t travel through time on an empty stomach.' }
            ],
            visual: 'timemachine'
        },
        // Scene 3: Machine activates — malfunction!
        {
            bg: 'linear-gradient(135deg, #1e3a5f 0%, #7c3aed 50%, #dc2626 100%)',
            title: 'ACTIVATING TIME MACHINE...',
            dialogue: [
                { speaker: 'Sheldon', emoji: '🧪', text: 'Initiating temporal displacement in 3... 2... 1...' },
                { speaker: 'SYSTEM', emoji: '⚠️', text: 'WARNING: TIMELINE DEVIATION DETECTED' },
                { speaker: 'Leonard', emoji: '🤓', text: 'Sheldon! The coordinates are wrong! We\'re not going to THAT day!' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'Oh dear... We\'re going much further back...' },
                { speaker: 'SYSTEM', emoji: '🌀', text: '>>> DESTINATION: MEDFORD, TEXAS — 1989 <<<' }
            ],
            visual: 'warp'
        },
        // Scene 4: Arrival — Young Sheldon era
        {
            bg: 'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #65a30d 100%)',
            title: 'MEDFORD, TEXAS — 1989',
            dialogue: [
                { speaker: 'Penny', emoji: '🍷', text: 'Where... where are we? Is that a CHURCH? And why is everything so... Texan?' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'Oh no. No no no. I recognize this place. This is... my childhood home.' },
                { speaker: 'Young Sheldon', emoji: '👦', text: 'Excuse me, sir. You look remarkably like an older, less fashionable version of me.' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'Young me! Listen carefully. I\'m you from the future. We made a terrible mistake and—' },
                { speaker: 'Young Sheldon', emoji: '👦', text: 'A time traveler? Fascinating! What\'s my Nobel Prize for?' },
                { speaker: 'Sheldon', emoji: '🧪', text: '...We\'ll discuss that later. Right now, the timeline is in danger.' }
            ],
            visual: 'texas'
        },
        // Scene 5: Enemy sneaked through!
        {
            bg: 'linear-gradient(135deg, #1c1917 0%, #dc2626 50%, #1c1917 100%)',
            title: 'SOMETHING FOLLOWED THEM...',
            dialogue: [
                { speaker: 'Howard', emoji: '🚀', text: 'Uh... guys? Did anyone else hear that?' },
                { speaker: 'Raj', emoji: '⭐', text: 'Something came through the time machine with us! I saw a shadow!' },
                { speaker: 'Leonard', emoji: '🤓', text: 'LOOK! It\'s the Caltech Chairman — no wait, he looks different...' },
                { speaker: 'SYSTEM', emoji: '💀', text: 'DR. CHAOS — THE EVIL SCIENTIST — HAS ENTERED THE TIMELINE' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'The final boss from Caltech... he must have snuck onto the time machine!' }
            ],
            visual: 'villain'
        },
        // Scene 6: Dr. Chaos escapes and starts building army
        {
            bg: 'linear-gradient(135deg, #09090b 0%, #22c55e 30%, #09090b 100%)',
            title: 'DR. CHAOS ESCAPES',
            dialogue: [
                { speaker: 'Dr. Chaos', emoji: '🧬', text: 'FOOLS! You brought me to a timeline with NO HEROES! No defenses! This world is MINE!' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'He\'s getting away! And... is he taking scrap metal from the junkyard?' },
                { speaker: 'SYSTEM', emoji: '⚠️', text: 'Dr. Chaos is building an army from this timeline\'s resources...' },
                { speaker: 'SYSTEM', emoji: '🤖', text: '» SCRAP ROBOTS assembled from junkyard parts' },
                { speaker: 'SYSTEM', emoji: '🧟', text: '» CYBORGS created from fallen enemies' },
                { speaker: 'SYSTEM', emoji: '🦖', text: '» DINOSAURS resurrected from the museum' },
                { speaker: 'SYSTEM', emoji: '👹', text: '» MYTHICAL CREATURES summoned from ancient texts' },
                { speaker: 'SYSTEM', emoji: '🦁', text: '» ANIMALS corrupted with radioactive energy' },
                { speaker: 'SYSTEM', emoji: '🦇', text: '» DC SUPERVILLAINS recruited from alternate dimensions' }
            ],
            visual: 'army'
        },
        // Scene 7: The team resolves to fight
        {
            bg: 'linear-gradient(135deg, #1e3a5f 0%, #f59e0b 100%)',
            title: 'A NEW MISSION',
            dialogue: [
                { speaker: 'Young Sheldon', emoji: '👦', text: 'So let me get this straight. An evil scientist from your future is building an army to conquer MY timeline?' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'That is correct. And the time machine is broken. We\'re stuck here.' },
                { speaker: 'Leonard', emoji: '🤓', text: 'Then we fight. We stop him here, in this timeline.' },
                { speaker: 'Penny', emoji: '🍷', text: 'Texas? I grew up on a farm. I was BORN for this.' },
                { speaker: 'Howard', emoji: '🚀', text: 'I\'ll fix the time machine while you guys handle the bad guys.' },
                { speaker: 'Young Sheldon', emoji: '👦', text: 'I\'ll help too. After all, I AM the smartest person in East Texas.' },
                { speaker: 'Sheldon', emoji: '🧪', text: 'He\'s not wrong. Let\'s save the timeline — BOTH of them.' }
            ],
            visual: 'resolve'
        }
    ];

    // ── TIME MACHINE SVG ──
    function getTimeMachineSVG() {
        return '<svg viewBox="0 0 300 250" class="w-full h-full">' +
            '<defs>' +
            '<radialGradient id="tmglow"><stop offset="0%" stop-color="#7c3aed" stop-opacity="0.6"/><stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/></radialGradient>' +
            '</defs>' +
            '<!-- Base platform -->' +
            '<ellipse cx="150" cy="220" rx="100" ry="20" fill="#334155"/>' +
            '<rect x="60" y="80" width="180" height="140" fill="#1e293b" rx="10" stroke="#475569" stroke-width="2"/>' +
            '<!-- Control panel -->' +
            '<rect x="100" y="180" width="100" height="30" fill="#0f172a" rx="4" stroke="#64748b" stroke-width="1"/>' +
            '<circle cx="120" cy="195" r="5" fill="#22c55e" class="animate-pulse"/>' +
            '<circle cx="140" cy="195" r="5" fill="#ef4444" class="animate-pulse"/>' +
            '<circle cx="160" cy="195" r="5" fill="#3b82f6" class="animate-pulse"/>' +
            '<rect x="170" y="188" width="20" height="14" fill="#0f172a" rx="2"/>' +
            '<text x="180" y="198" text-anchor="middle" font-size="7" fill="#22c55e" font-family="monospace">GO</text>' +
            '<!-- Spinning rings -->' +
            '<ellipse cx="150" cy="130" rx="60" ry="15" fill="none" stroke="#7c3aed" stroke-width="2" opacity="0.6">' +
            '<animateTransform attributeName="transform" type="rotate" from="0 150 130" to="360 150 130" dur="3s" repeatCount="indefinite"/>' +
            '</ellipse>' +
            '<ellipse cx="150" cy="130" rx="45" ry="45" fill="none" stroke="#a855f7" stroke-width="1.5" opacity="0.4">' +
            '<animateTransform attributeName="transform" type="rotate" from="360 150 130" to="0 150 130" dur="4s" repeatCount="indefinite"/>' +
            '</ellipse>' +
            '<ellipse cx="150" cy="130" rx="30" ry="30" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.3">' +
            '<animateTransform attributeName="transform" type="rotate" from="0 150 130" to="360 150 130" dur="2s" repeatCount="indefinite"/>' +
            '</ellipse>' +
            '<!-- Energy core -->' +
            '<circle cx="150" cy="130" r="15" fill="url(#tmglow)"/>' +
            '<circle cx="150" cy="130" r="8" fill="#c084fc" opacity="0.5">' +
            '<animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite"/>' +
            '</circle>' +
            '<circle cx="150" cy="130" r="4" fill="#f5f5f4"/>' +
            '<!-- Antenna -->' +
            '<line x1="150" y1="80" x2="150" y2="50" stroke="#94a3b8" stroke-width="2"/>' +
            '<circle cx="150" cy="46" r="4" fill="#fbbf24" class="animate-pulse"/>' +
            '<!-- Sparks -->' +
            '<line x1="80" y1="100" x2="70" y2="90" stroke="#fbbf24" stroke-width="1" opacity="0.5">' +
            '<animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>' +
            '</line>' +
            '<line x1="220" y1="110" x2="230" y2="100" stroke="#fbbf24" stroke-width="1" opacity="0.3">' +
            '<animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>' +
            '</line>' +
            '<!-- Wires -->' +
            '<path d="M 70,160 Q 60,140 70,120" stroke="#ef4444" stroke-width="2" fill="none"/>' +
            '<path d="M 230,160 Q 240,140 230,120" stroke="#3b82f6" stroke-width="2" fill="none"/>' +
            '<!-- Label -->' +
            '<rect x="105" y="85" width="90" height="16" fill="#0f172a" rx="3"/>' +
            '<text x="150" y="96" text-anchor="middle" font-size="7" fill="#a855f7" font-weight="bold" font-family="monospace">TIME MACHINE</text>' +
            '</svg>';
    }

    // ── VISUAL RENDERERS ──
    function getVisualHTML(key) {
        if (key === 'timemachine') {
            return '<div style="width:250px;height:200px;margin:0 auto 16px;animation:tmFloat 3s ease-in-out infinite;">' +
                getTimeMachineSVG() + '</div>';
        }
        if (key === 'warp') {
            return '<div style="width:200px;height:200px;margin:0 auto 16px;position:relative;">' +
                '<div style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,#7c3aed,#3b82f6,#22c55e,#fbbf24,#ef4444,#7c3aed);animation:tmSpin 1s linear infinite;opacity:0.6;"></div>' +
                '<div style="position:absolute;inset:20px;border-radius:50%;background:conic-gradient(from 180deg,#c084fc,#93c5fd,#86efac,#fde68a,#fca5a5,#c084fc);animation:tmSpin 0.7s linear infinite reverse;opacity:0.5;"></div>' +
                '<div style="position:absolute;inset:40px;border-radius:50%;background:radial-gradient(#f5f5f4,#7c3aed);animation:tmPulse 0.5s ease-in-out infinite;"></div>' +
                '</div>';
        }
        if (key === 'villain') {
            // Show Dr. Chaos SVG if available
            var svg = (typeof vectors !== 'undefined' && vectors.ys_evil_scientist) ? vectors.ys_evil_scientist : '';
            return '<div style="width:120px;height:180px;margin:0 auto 16px;animation:tmFloat 2s ease-in-out infinite;filter:drop-shadow(0 0 20px rgba(239,68,68,0.5));">' +
                svg + '</div>';
        }
        if (key === 'army') {
            var keys = ['ys_scrap_robot', 'ys_cyborg', 'ys_trex', 'ys_bear', 'ys_dc_bane'];
            var html = '<div style="display:flex;justify-content:center;gap:4px;margin:0 auto 16px;flex-wrap:wrap;max-width:300px;">';
            for (var i = 0; i < keys.length; i++) {
                var svg = (typeof vectors !== 'undefined' && vectors[keys[i]]) ? vectors[keys[i]] : '';
                html += '<div style="width:55px;height:80px;animation:tmFloat ' + (2 + i * 0.3) + 's ease-in-out infinite;">' + svg + '</div>';
            }
            html += '</div>';
            return html;
        }
        if (key === 'texas') {
            var bg = (typeof youngSheldonMaps !== 'undefined' && youngSheldonMaps.ys_cooper_home) ? youngSheldonMaps.ys_cooper_home : '';
            return '<div style="width:100%;max-width:350px;height:150px;margin:0 auto 16px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,0.1);">' +
                bg + '</div>';
        }
        // Default team visual
        return '<div style="display:flex;justify-content:center;gap:8px;margin:0 auto 16px;font-size:36px;">' +
            '<span>🧪</span><span>🤓</span><span>🚀</span><span>⭐</span><span>🍷</span>' +
            '</div>';
    }

    // ── RENDER SCENE ──
    function renderScene(idx) {
        if (idx >= scenes.length) {
            endStory();
            return;
        }
        _currentScene = idx;
        var scene = scenes[idx];

        var html = '';
        // Dark overlay with scene bg
        html += '<div id="story80-container" style="position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:' + scene.bg + ';padding:20px;overflow-y:auto;">';

        // Title
        html += '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:#fbbf24;letter-spacing:2px;text-align:center;margin-bottom:16px;text-shadow:0 0 10px rgba(251,191,36,0.5);">' + scene.title + '</div>';

        // Visual
        html += getVisualHTML(scene.visual);

        // Dialogue box
        html += '<div id="story80-dialogue" style="width:100%;max-width:400px;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;max-height:45vh;overflow-y:auto;">';
        html += '</div>';

        // Controls
        html += '<div style="display:flex;gap:12px;margin-top:16px;">';
        if (idx > 0) {
            html += '<button onclick="window._story80Prev()" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#9ca3af;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700;">← BACK</button>';
        }
        if (idx < scenes.length - 1) {
            html += '<button onclick="window._story80Next()" style="background:linear-gradient(135deg,#f59e0b,#d97706);border:none;color:white;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 4px 12px rgba(245,158,11,0.3);">NEXT →</button>';
        } else {
            html += '<button onclick="window._story80End()" style="background:linear-gradient(135deg,#22c55e,#16a34a);border:none;color:white;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 4px 12px rgba(34,197,94,0.3);">⚔️ BEGIN THE FIGHT</button>';
        }
        html += '</div>';

        // Progress dots
        html += '<div style="display:flex;gap:6px;margin-top:12px;">';
        for (var d = 0; d < scenes.length; d++) {
            var dotColor = d === idx ? '#f59e0b' : 'rgba(255,255,255,0.2)';
            html += '<div style="width:8px;height:8px;border-radius:50%;background:' + dotColor + ';transition:background 0.3s;"></div>';
        }
        html += '</div>';

        html += '</div>';

        _overlay.innerHTML = html;

        // Type out dialogue with delay
        typeDialogue(scene.dialogue, 0);
    }

    function typeDialogue(lines, idx) {
        if (idx >= lines.length) return;
        var container = document.getElementById('story80-dialogue');
        if (!container) return;

        var line = lines[idx];
        var isSystem = line.speaker === 'SYSTEM';

        var lineHtml = '<div style="margin-bottom:10px;animation:fadeInUp 0.3s ease-out;';
        if (isSystem) {
            lineHtml += 'text-align:center;padding:6px;border-radius:6px;background:rgba(239,68,68,0.1);">';
            lineHtml += '<span style="font-size:11px;color:#fbbf24;font-weight:700;">' + line.emoji + ' ' + line.text + '</span>';
        } else {
            lineHtml += '">';
            var nameColor = line.speaker === 'Sheldon' ? '#22c55e' :
                           line.speaker === 'Young Sheldon' ? '#a855f7' :
                           line.speaker === 'Dr. Chaos' ? '#ef4444' :
                           line.speaker === 'Howard' ? '#3b82f6' :
                           line.speaker === 'Leonard' ? '#fbbf24' :
                           line.speaker === 'Raj' ? '#f97316' :
                           line.speaker === 'Penny' ? '#ec4899' : '#9ca3af';
            lineHtml += '<span style="font-size:10px;font-weight:800;color:' + nameColor + ';">' + line.emoji + ' ' + line.speaker + '</span>';
            lineHtml += '<div style="font-size:13px;color:#e5e7eb;margin-top:3px;line-height:1.5;">' + line.text + '</div>';
        }
        lineHtml += '</div>';

        container.insertAdjacentHTML('beforeend', lineHtml);
        container.scrollTop = container.scrollHeight;

        // Play notification sound
        if (typeof SoundManager !== 'undefined' && typeof SoundManager.playFX === 'function') {
            try { SoundManager.playFX('notification'); } catch(e) {}
        }

        setTimeout(function() { typeDialogue(lines, idx + 1); }, isSystem ? 600 : 800);
    }

    // ── CONTROLS ──
    function nextScene() { renderScene(_currentScene + 1); }
    function prevScene() { if (_currentScene > 0) renderScene(_currentScene - 1); }

    function endStory() {
        _storyActive = false;
        if (typeof state !== 'undefined') {
            state[STORY_FLAG] = true;

            // Auto-unlock Young Sheldon character (free!)
            if (state.roster && !state.roster.ys_young_sheldon) {
                state.roster.ys_young_sheldon = { level: 0, currentHp: 60, maxHp: 60, status: 'healthy', hospitalEndTime: 0, activeSkin: 'default', unlockedSkins: ['default'] };
            }
            if (state.roster && state.roster.ys_young_sheldon && state.roster.ys_young_sheldon.level === 0) {
                state.roster.ys_young_sheldon.level = 1;
                state.roster.ys_young_sheldon.currentHp = 60;
                state.roster.ys_young_sheldon.maxHp = 60;
            }

            // Auto-unlock YS maps
            if (state.unlockedLocations && typeof locationOrder !== 'undefined') {
                var ysKeys = ['ys_cooper_home', 'ys_high_school', 'ys_texas_ranch', 'ys_desert', 'ys_museum', 'ys_chaos_lab'];
                for (var m = 0; m < ysKeys.length; m++) {
                    if (!state.unlockedLocations.includes(ysKeys[m])) {
                        state.unlockedLocations.push(ysKeys[m]);
                    }
                }
            }

            if (typeof saveProgress === 'function') saveProgress();
        }

        // Remove overlay with fade
        if (_overlay) {
            _overlay.style.opacity = '0';
            _overlay.style.transition = 'opacity 0.5s';
            setTimeout(function() {
                if (_overlay && _overlay.parentNode) _overlay.parentNode.removeChild(_overlay);
                _overlay = null;
            }, 500);
        }

        // Show notification about new locations
        if (typeof showGameAlert === 'function') {
            setTimeout(function() {
                showGameAlert(
                    '🌀 NEW TIMELINE UNLOCKED!',
                    'Young Sheldon joined your gang! 10 new characters, 6 Texas locations, and 30 new enemies await. Stop Dr. Chaos!',
                    10000
                );
            }, 1000);
        }
    }

    // ── TRIGGER CHECK ──
    function shouldTrigger() {
        if (typeof state === 'undefined') return false;
        if (state[STORY_FLAG]) return false;
        if (_storyActive) return false;
        if (typeof state.wave === 'undefined') return false;
        return state.wave >= 80;
    }

    function triggerStory() {
        if (_storyActive) return;
        _storyActive = true;

        // Inject CSS
        if (!document.getElementById('story80-css')) {
            var style = document.createElement('style');
            style.id = 'story80-css';
            style.textContent = [
                '@keyframes tmFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }',
                '@keyframes tmSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }',
                '@keyframes tmPulse { 0%,100% { transform: scale(1); opacity:0.8; } 50% { transform: scale(1.2); opacity:1; } }',
                '@keyframes fadeInUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }'
            ].join('\n');
            document.head.appendChild(style);
        }

        // Create overlay
        _overlay = document.createElement('div');
        _overlay.id = 'story80-overlay';
        _overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;';
        document.body.appendChild(_overlay);

        renderScene(0);
    }

    // ── EXPOSE & HOOK ──
    window._story80Next = nextScene;
    window._story80Prev = prevScene;
    window._story80End = endStory;
    window.triggerWave80Story = triggerStory;
    window.shouldTriggerWave80Story = shouldTrigger;

    // Auto-check on load after a delay
    setTimeout(function() {
        if (shouldTrigger()) {
            triggerStory();
        }
    }, 3000);

})();
