// ============================================================
// DIALOGUE SYSTEM - Milestone-triggered TBBT cutscene dialogues
// Typewriter effect with character SVG portraits
// ============================================================

(function() {
    'use strict';

    // Character accent colors
    var CHAR_COLORS = {
        sheldon: '#3b82f6',
        penny:   '#f59e0b',
        leonard: '#22c55e',
        howard:  '#ec4899',
        raj:     '#a855f7',
        amy:     '#14b8a6',
        bernie:  '#ef4444',
        stuart:  '#6b7280',
        mary:    '#f97316',
        beverly: '#8b5cf6',
        proton:  '#06b6d4',
        kripke:  '#f43f5e',
        leslie:  '#84cc16',
        bert:    '#78716c',
        wil:     '#eab308',
        zack:    '#0ea5e9',
        emily:   '#e879f9'
    };

    // Character display names
    var CHAR_NAMES = {
        sheldon: 'Sheldon Cooper',
        penny:   'Penny',
        leonard: 'Leonard Hofstadter',
        howard:  'Howard Wolowitz',
        raj:     'Rajesh Koothrappali',
        amy:     'Amy Farrah Fowler',
        bernie:  'Bernadette',
        stuart:  'Stuart Bloom',
        mary:    'Mary Cooper',
        beverly: 'Beverly Hofstadter',
        proton:  'Professor Proton',
        kripke:  'Barry Kripke',
        leslie:  'Leslie Winkle',
        bert:    'Bert Kibbler',
        wil:     'Wil Wheaton',
        zack:    'Zack Johnson',
        emily:   'Emily Sweeney'
    };

    // ---- Milestone dialogue definitions ----
    var DIALOGUE_MILESTONES = [
        {
            id: 'wave_10',
            trigger: 'wave',
            value: 10,
            lines: [
                { char: 'sheldon', text: 'Interesting. Our foes are getting stronger. Perhaps we need to recalibrate our paradigm... BAZINGA!' }
            ]
        },
        {
            id: 'wave_25',
            trigger: 'wave',
            value: 25,
            lines: [
                { char: 'howard', text: 'I once piloted a space station toilet. I think I can handle a few more waves.' },
                { char: 'raj', text: 'You know what pairs well with wave 25? A nice Grasshopper cocktail.' }
            ]
        },
        {
            id: 'wave_50',
            trigger: 'wave',
            value: 50,
            lines: [
                { char: 'leonard', text: '50 waves... this is harder than explaining to Sheldon why he can\'t have his spot on the bus.' },
                { char: 'penny', text: 'Holy crap on a cracker! We made it to wave 50!' }
            ]
        },
        {
            id: 'wave_75',
            trigger: 'wave',
            value: 75,
            lines: [
                { char: 'amy', text: 'Statistically speaking, our survival rate is decreasing exponentially. How thrilling!' }
            ]
        },
        {
            id: 'wave_100',
            trigger: 'wave',
            value: 100,
            lines: [
                { char: 'sheldon', text: 'Wave 100! In your face, Wil Wheaton! BAZINGA!' }
            ]
        },
        {
            id: 'boss_encounter_1',
            trigger: 'bossSpawn',
            value: null,
            lines: [
                { char: 'sheldon', text: 'This boss has the structural integrity of a Klingon Bird-of-Prey built from Mega Bloks. I give it 30 seconds.' }
            ]
        },
        {
            id: 'boss_encounter_2',
            trigger: 'bossSpawn',
            value: null,
            lines: [
                { char: 'howard', text: 'As an MIT-trained engineer, I can confirm that boss\'s armor has a fatal flaw: it\'s fighting us.' },
                { char: 'bernie', text: 'Howie, just shoot it before it shoots us!' }
            ]
        },
        {
            id: 'boss_encounter_3',
            trigger: 'bossSpawn',
            value: null,
            lines: [
                { char: 'raj', text: 'Oh my God, it\'s magnificent! It\'s like a Bollywood villain made of pure cosmic energy! ...I\'m terrified.' }
            ]
        },
        {
            id: 'boss_encounter_4',
            trigger: 'bossSpawn',
            value: null,
            lines: [
                { char: 'sheldon', text: 'Fun fact: this creature violates at least three laws of thermodynamics. I\'m filing a complaint with the universe.' },
                { char: 'leonard', text: 'Sheldon, can you file the complaint AFTER we kill it?' }
            ]
        },
        {
            id: 'boss_encounter_5',
            trigger: 'bossSpawn',
            value: null,
            lines: [
                { char: 'howard', text: 'You know, I designed a toilet for the International Space Station. This boss is about to get flushed.' },
                { char: 'raj', text: 'Dude, that was simultaneously gross and heroic. I love it.' }
            ]
        },
        {
            id: 'firstBoss',
            trigger: 'firstBoss',
            value: null,
            lines: [
                { char: 'leonard', text: 'We did it! A real boss fight! This is better than the time we met Stan Lee!' }
            ]
        },
        {
            id: 'firstPrestige',
            trigger: 'firstPrestige',
            value: null,
            lines: [
                { char: 'sheldon', text: 'Resetting the timeline? How very Doctor Who of us. I approve.' }
            ]
        }
    ];

    // ---- Dialogue display state ----
    var dialogueOverlay = null;
    var dialogueActive = false;
    var currentQueue = [];       // Lines remaining in current cutscene
    var typewriterTimer = null;
    var typewriterDone = false;
    var currentFullText = '';
    var dialogueOnComplete = null; // Callback when conversation ends

    // ---- Inject animation styles ----
    function ensureStyles() {
        if (document.getElementById('dialogue-styles')) return;
        var style = document.createElement('style');
        style.id = 'dialogue-styles';
        style.textContent = [
            '@keyframes dlg-slideIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }',
            '@keyframes dlg-portraitIn { from{opacity:0;transform:translateX(-40px) scale(0.8)} to{opacity:1;transform:translateX(0) scale(1)} }',
            '@keyframes dlg-cursor { 0%,100%{opacity:1} 50%{opacity:0} }',
            '.dlg-container { animation: dlg-slideIn 0.4s ease-out both; }',
            '.dlg-portrait { animation: dlg-portraitIn 0.5s ease-out both; }',
            '.dlg-cursor { display:inline-block;width:2px;height:13px;background:#c084fc;margin-left:2px;vertical-align:middle;animation:dlg-cursor 0.6s steps(1) infinite; }'
        ].join('\n');
        document.head.appendChild(style);
    }

    // ---- Create the dialogue overlay ----
    function createDialogueOverlay() {
        if (dialogueOverlay) dialogueOverlay.remove();

        ensureStyles();

        dialogueOverlay = document.createElement('div');
        dialogueOverlay.id = 'dialogue-overlay';
        dialogueOverlay.style.cssText = [
            'position:fixed;inset:0;z-index:200000;',
            'background:rgba(0,0,0,0.92);',
            'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);',
            'display:flex;align-items:center;justify-content:center;',
            'padding:16px;'
        ].join('');

        document.body.appendChild(dialogueOverlay);
        return dialogueOverlay;
    }

    // ---- Render a single dialogue line ----
    function renderDialogueLine(line) {
        if (!dialogueOverlay) createDialogueOverlay();
        dialogueOverlay.innerHTML = '';

        var charKey = line.char;
        var charColor = CHAR_COLORS[charKey] || '#a855f7';
        var charName = CHAR_NAMES[charKey] || charKey;

        // Main container
        var container = document.createElement('div');
        container.className = 'dlg-container';
        container.style.cssText = [
            'display:flex;align-items:flex-start;gap:20px;',
            'max-width:560px;width:100%;box-sizing:border-box;max-height:90vh;overflow-y:auto;',
            'background:linear-gradient(135deg, rgba(15,10,30,0.95), rgba(20,15,40,0.95));',
            'border:2px solid ' + charColor + '40;',
            'border-radius:20px;',
            'padding:24px;',
            'box-shadow:0 0 60px ' + charColor + '15, 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);',
            'position:relative;overflow:hidden;'
        ].join('');

        // Ambient glow behind portrait
        var glow = document.createElement('div');
        glow.style.cssText = 'position:absolute;left:-20px;top:50%;transform:translateY(-50%);width:160px;height:160px;' +
            'background:radial-gradient(circle,' + charColor + '15,transparent 70%);pointer-events:none;';
        container.appendChild(glow);

        // --- Left: Character portrait ---
        var portraitCol = document.createElement('div');
        portraitCol.className = 'dlg-portrait';
        portraitCol.style.cssText = 'flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;z-index:1;';

        // Portrait frame
        var portraitFrame = document.createElement('div');
        portraitFrame.style.cssText = [
            'width:100px;height:120px;',
            'background:linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3));',
            'border:2px solid ' + charColor + '60;',
            'border-radius:14px;',
            'display:flex;align-items:center;justify-content:center;',
            'padding:6px;',
            'box-shadow:0 0 20px ' + charColor + '20, inset 0 0 20px rgba(0,0,0,0.4);',
            'overflow:hidden;'
        ].join('');

        // Get character SVG
        var svgContent = '';
        try {
            if (typeof getVectorFrame === 'function') {
                svgContent = getVectorFrame(charKey, false, 'idle') || '';
            }
            if (!svgContent && typeof vectors !== 'undefined' && vectors[charKey]) {
                svgContent = vectors[charKey];
            }
        } catch(e) {}

        if (!svgContent) {
            // Fallback emoji portrait
            svgContent = '<div style="font-size:48px;text-align:center;">🧑‍🔬</div>';
        }

        var svgWrap = document.createElement('div');
        svgWrap.style.cssText = 'width:100%;height:100%;display:flex;align-items:flex-end;justify-content:center;';
        svgWrap.innerHTML = svgContent;
        portraitFrame.appendChild(svgWrap);
        portraitCol.appendChild(portraitFrame);

        // Character name
        var nameEl = document.createElement('div');
        nameEl.style.cssText = 'font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:' + charColor + ';' +
            'text-shadow:0 0 12px ' + charColor + '60;text-align:center;max-width:110px;line-height:1.2;';
        nameEl.textContent = charName;
        portraitCol.appendChild(nameEl);

        container.appendChild(portraitCol);

        // --- Right: Dialogue text area ---
        var textCol = document.createElement('div');
        textCol.style.cssText = 'flex:1;display:flex;flex-direction:column;justify-content:center;min-height:120px;position:relative;z-index:1;';

        // Speech indicator
        var speechLabel = document.createElement('div');
        speechLabel.style.cssText = 'font-size:8px;color:rgba(160,160,180,0.5);font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;';
        speechLabel.textContent = '💬 DIALOGUE';
        textCol.appendChild(speechLabel);

        // Dialogue text with typewriter target
        var textEl = document.createElement('div');
        textEl.id = 'dlg-text-target';
        textEl.style.cssText = 'color:rgba(230,230,245,0.95);font-size:13px;line-height:1.7;font-weight:600;letter-spacing:0.3px;min-height:60px;';
        textCol.appendChild(textEl);

        // Button row
        var btnRow = document.createElement('div');
        btnRow.style.cssText = 'display:flex;gap:10px;justify-content:flex-end;margin-top:16px;';

        // Skip button
        var skipBtn = document.createElement('button');
        skipBtn.style.cssText = [
            'background:rgba(60,60,80,0.4);color:rgba(180,180,200,0.6);',
            'border:1px solid rgba(100,100,130,0.25);',
            'padding:7px 14px;box-sizing:border-box;border-radius:8px;font-size:9px;font-weight:700;',
            'text-transform:uppercase;letter-spacing:1.5px;cursor:pointer;transition:all 0.2s;'
        ].join('');
        skipBtn.textContent = 'SKIP ALL';
        skipBtn.onmouseenter = function() { this.style.background = 'rgba(80,80,100,0.5)'; this.style.color = 'white'; };
        skipBtn.onmouseleave = function() { this.style.background = 'rgba(60,60,80,0.4)'; this.style.color = 'rgba(180,180,200,0.6)'; };
        skipBtn.onclick = function(e) { e.stopPropagation(); closeDialogue(); };
        btnRow.appendChild(skipBtn);

        // Next button
        var nextBtn = document.createElement('button');
        nextBtn.id = 'dlg-next-btn';
        nextBtn.style.cssText = [
            'background:linear-gradient(135deg,' + charColor + ', ' + charColor + 'cc);',
            'color:white;border:1px solid ' + charColor + '80;',
            'padding:7px 20px;box-sizing:border-box;border-radius:8px;font-size:10px;font-weight:900;',
            'text-transform:uppercase;letter-spacing:1.5px;cursor:pointer;transition:all 0.2s;',
            'box-shadow:0 0 15px ' + charColor + '30;opacity:0.4;pointer-events:none;'
        ].join('');
        nextBtn.textContent = currentQueue.length > 1 ? 'NEXT ➤' : 'CLOSE ✓';
        nextBtn.onmouseenter = function() { if (typewriterDone) { this.style.transform = 'scale(1.05)'; } };
        nextBtn.onmouseleave = function() { this.style.transform = 'scale(1)'; };
        nextBtn.onclick = function(e) {
            e.stopPropagation();
            if (!typewriterDone) {
                // Finish typewriter instantly
                finishTypewriter();
            } else {
                advanceDialogue();
            }
        };
        btnRow.appendChild(nextBtn);

        textCol.appendChild(btnRow);
        container.appendChild(textCol);

        dialogueOverlay.appendChild(container);

        // Allow clicking the overlay text area to speed up
        container.onclick = function(e) {
            if (e.target.tagName === 'BUTTON') return;
            if (!typewriterDone) {
                finishTypewriter();
            }
        };

        // Start typewriter effect
        startTypewriter(line.text, textEl, nextBtn);
    }

    // ---- Typewriter effect ----
    function startTypewriter(fullText, targetEl, nextBtn) {
        typewriterDone = false;
        currentFullText = fullText;
        var idx = 0;
        var speed = 28; // ms per character

        if (typewriterTimer) clearInterval(typewriterTimer);

        targetEl.innerHTML = '<span class="dlg-cursor"></span>';

        typewriterTimer = setInterval(function() {
            if (idx >= fullText.length) {
                clearInterval(typewriterTimer);
                typewriterTimer = null;
                typewriterDone = true;
                // Remove cursor, enable next button
                targetEl.innerHTML = fullText;
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
                return;
            }

            var char = fullText.charAt(idx);
            idx++;

            // Build displayed text with cursor
            targetEl.innerHTML = fullText.substring(0, idx) + '<span class="dlg-cursor"></span>';

            // Slight pause on punctuation
            if (char === '.' || char === '!' || char === '?') {
                clearInterval(typewriterTimer);
                typewriterTimer = setTimeout(function() {
                    typewriterTimer = setInterval(arguments.callee, speed);
                    // re-bind the interval logic via recursion
                    startTypewriterFrom(fullText, targetEl, nextBtn, idx, speed);
                }, 300);
                // We need to break out and restart
                return;
            }
        }, speed);
    }

    // Helper to restart typewriter from a given index after a pause
    function startTypewriterFrom(fullText, targetEl, nextBtn, startIdx, speed) {
        if (typewriterTimer) clearInterval(typewriterTimer);
        if (typewriterDone) return;

        var idx = startIdx;

        typewriterTimer = setInterval(function() {
            if (idx >= fullText.length) {
                clearInterval(typewriterTimer);
                typewriterTimer = null;
                typewriterDone = true;
                targetEl.innerHTML = fullText;
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
                return;
            }

            var char = fullText.charAt(idx);
            idx++;
            targetEl.innerHTML = fullText.substring(0, idx) + '<span class="dlg-cursor"></span>';

            if (char === '.' || char === '!' || char === '?') {
                clearInterval(typewriterTimer);
                typewriterTimer = setTimeout(function() {
                    startTypewriterFrom(fullText, targetEl, nextBtn, idx, speed);
                }, 300);
            }
        }, speed);
    }

    // Instantly finish the typewriter
    function finishTypewriter() {
        if (typewriterTimer) {
            clearInterval(typewriterTimer);
            clearTimeout(typewriterTimer);
            typewriterTimer = null;
        }
        typewriterDone = true;

        var textEl = document.getElementById('dlg-text-target');
        var nextBtn = document.getElementById('dlg-next-btn');
        if (textEl) textEl.innerHTML = currentFullText;
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }

    // ---- Advance to the next line or close ----
    function advanceDialogue() {
        currentQueue.shift();

        if (currentQueue.length > 0) {
            renderDialogueLine(currentQueue[0]);
        } else {
            closeDialogue();
        }
    }

    // ---- Close the dialogue overlay ----
    function closeDialogue() {
        var cb = dialogueOnComplete;
        dialogueActive = false;
        dialogueOnComplete = null;
        currentQueue = [];

        if (typewriterTimer) {
            clearInterval(typewriterTimer);
            clearTimeout(typewriterTimer);
            typewriterTimer = null;
        }

        if (dialogueOverlay) {
            dialogueOverlay.style.transition = 'opacity 0.35s ease';
            dialogueOverlay.style.opacity = '0';
            setTimeout(function() {
                if (dialogueOverlay) {
                    dialogueOverlay.remove();
                    dialogueOverlay = null;
                }
                if (typeof cb === 'function') cb();
            }, 350);
        } else {
            if (typeof cb === 'function') cb();
        }
    }

    // ---- Show a milestone dialogue ----
    function showMilestoneDialogue(milestone) {
        if (dialogueActive) return;

        // Mark as seen
        if (!state.dialoguesSeen) state.dialoguesSeen = [];
        if (state.dialoguesSeen.indexOf(milestone.id) !== -1) return;
        state.dialoguesSeen.push(milestone.id);
        if (typeof saveProgress === 'function') saveProgress();

        // Build the queue
        currentQueue = milestone.lines.slice();
        dialogueActive = true;

        // Small delay so it doesn't overlap with game events
        setTimeout(function() {
            createDialogueOverlay();
            renderDialogueLine(currentQueue[0]);
        }, 600);
    }

    // ---- Check for triggered dialogues ----
    window.checkDialogueTriggers = function(triggerType, triggerValue) {
        if (typeof state === 'undefined') return;
        if (dialogueActive) return;

        // Ensure tracking array exists
        if (!state.dialoguesSeen) state.dialoguesSeen = [];

        for (var i = 0; i < DIALOGUE_MILESTONES.length; i++) {
            var m = DIALOGUE_MILESTONES[i];

            // Skip already-seen dialogues
            if (state.dialoguesSeen.indexOf(m.id) !== -1) continue;

            var shouldTrigger = false;

            if (m.trigger === 'wave' && (triggerType === 'wave' || !triggerType)) {
                // Trigger when wave reaches or passes the milestone value
                if (state.wave >= m.value) {
                    shouldTrigger = true;
                }
            } else if (m.trigger === 'firstBoss' && triggerType === 'firstBoss') {
                shouldTrigger = true;
            } else if (m.trigger === 'firstPrestige' && triggerType === 'firstPrestige') {
                shouldTrigger = true;
            } else if (m.trigger === 'bossSpawn' && triggerType === 'bossSpawn') {
                shouldTrigger = true;
            }

            if (shouldTrigger) {
                // Only check that the speaking characters are available (level > 0 or is sheldon)
                var hasChar = true;
                for (var j = 0; j < m.lines.length; j++) {
                    var charKey = m.lines[j].char;
                    if (charKey !== 'sheldon' && state.roster[charKey] && state.roster[charKey].level === 0) {
                        hasChar = false;
                        break;
                    }
                }

                if (hasChar) {
                    showMilestoneDialogue(m);
                    return; // Only show one at a time
                }
            }
        }
    };

    // ---- Allow manual triggering for testing ----
    window.triggerDialogue = function(milestoneId) {
        for (var i = 0; i < DIALOGUE_MILESTONES.length; i++) {
            if (DIALOGUE_MILESTONES[i].id === milestoneId) {
                // Remove from seen list to allow replay
                if (state.dialoguesSeen) {
                    var idx = state.dialoguesSeen.indexOf(milestoneId);
                    if (idx !== -1) state.dialoguesSeen.splice(idx, 1);
                }
                showMilestoneDialogue(DIALOGUE_MILESTONES[i]);
                return;
            }
        }
        console.warn('[Dialogue] Unknown milestone ID:', milestoneId);
    };

    // ---- List all milestone IDs (debug helper) ----
    window.listDialogueMilestones = function() {
        return DIALOGUE_MILESTONES.map(function(m) {
            return { id: m.id, trigger: m.trigger, value: m.value, seen: state.dialoguesSeen && state.dialoguesSeen.indexOf(m.id) !== -1 };
        });
    };

    // ---- Show a campaign conversation (used by campaign.js) ----
    function showCampaignConversation(lines, onComplete) {
        if (!lines || !lines.length) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }
        // If a dialogue is already active, skip to avoid overlap
        if (dialogueActive) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }

        currentQueue = lines.slice();
        dialogueActive = true;
        dialogueOnComplete = onComplete || null;

        setTimeout(function() {
            createDialogueOverlay();
            renderDialogueLine(currentQueue[0]);
        }, 300);
    }

    window.showCampaignConversation = showCampaignConversation;

    console.log('[Dialogue] Milestone dialogue system loaded. ' + DIALOGUE_MILESTONES.length + ' milestones registered.');

})();
