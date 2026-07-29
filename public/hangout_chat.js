// ============================================================
// HANGOUT TAP-TO-TALK — Character speech bubbles in Hangout Mode
// Replaces opening character modal when tapping chars in hangout
// ============================================================

(function() {
    'use strict';

    // ---- CSS ----
    var style = document.createElement('style');
    style.textContent = [
        '@keyframes bubble-in { 0%{opacity:0;transform:scale(0.6) translateY(10px);} 60%{transform:scale(1.05) translateY(-2px);} 100%{opacity:1;transform:scale(1) translateY(0);} }',
        '@keyframes bubble-out { 0%{opacity:1;transform:scale(1);} 100%{opacity:0;transform:scale(0.8) translateY(-10px);} }',
        '@keyframes bubble-idle { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-3px);} }',
        '.hangout-bubble {',
        '  position: absolute;',
        '  z-index: 200;',
        '  pointer-events: auto;',
        '  animation: bubble-in 0.35s ease-out both;',
        '}',
        '.hangout-bubble.removing { animation: bubble-out 0.25s ease-in forwards; }',
        '.hangout-bubble-inner {',
        '  background: linear-gradient(135deg, rgba(15,23,42,0.97), rgba(30,41,59,0.95));',
        '  border: 1.5px solid rgba(255,255,255,0.15);',
        '  border-radius: 14px;',
        '  padding: 10px 14px;box-sizing:border-box;',
        '  max-width: 200px;',
        '  box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1);',
        '  backdrop-filter: blur(12px);',
        '  position: relative;',
        '}',
        '.hangout-bubble-tail {',
        '  position: absolute;',
        '  bottom: -8px;',
        '  left: 50%;',
        '  transform: translateX(-50%);',
        '  width: 0; height: 0;',
        '  border-left: 8px solid transparent;',
        '  border-right: 8px solid transparent;',
        '  border-top: 8px solid rgba(30,41,59,0.95);',
        '}',
        '.hangout-bubble-name {',
        '  font-size: 9px;',
        '  font-weight: 900;',
        '  letter-spacing: 0.5px;',
        '  text-transform: uppercase;',
        '  margin-bottom: 3px;',
        '}',
        '.hangout-bubble-text {',
        '  font-size: 11px;',
        '  color: #e2e8f0;',
        '  line-height: 1.4;',
        '  font-style: italic;',
        '}',
        '.hangout-bubble-reward {',
        '  font-size: 8px;',
        '  color: #22c55e;',
        '  font-weight: 700;',
        '  margin-top: 4px;',
        '  opacity: 0.8;',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    // ---- CHARACTER IDLE CHATTER ----
    // Location-independent character dialogue lines
    var CHAR_CHATTER = {
        sheldon: [
            "I'm not crazy. My mother had me tested.",
            "Bazinga!",
            "I possess the DNA of Leonard Nimoy!",
            "I'm a physicist. I have a working knowledge of the entire universe.",
            "I cry because others are stupid.",
            "Soft kitty, warm kitty, little ball of fur...",
            "Nobody does it better than me. Except for maybe Stephen Hawking.",
            "Fun with Flags! Episode 47: The flag of Malta.",
            "Rock, paper, scissors, lizard, Spock!"
        ],
        penny: [
            "Holy crap on a cracker!",
            "I'm a Sagittarius, which probably tells you a lot.",
            "Sweetie, you're being ridiculous.",
            "I once shot a buck. Then the cops came.",
            "Ugh, physics. My brain hurts.",
            "Wine time! 🍷",
            "Nebraska strong, baby!",
            "I'm an actress! ...Waitress. ...Pharmaceutical rep!"
        ],
        leonard: [
            "I guess we're doing this.",
            "My mom wrote a book about me. It wasn't flattering.",
            "I'm lactose intolerant and I have asthma.",
            "Sometimes I talk to Siri just to feel less alone.",
            "I went to Princeton! ...Nobody cares.",
            "Being Sheldon's roommate is like... yeah.",
            "I got a recombinant DNA molecule once. For fun."
        ],
        howard: [
            "I'm an aerospace engineer! I went to space!",
            "Ma! I'm talking to my friends!",
            "I speak six languages, including Klingon.",
            "This belt buckle cost more than your shoes.",
            "Have you met my mother? Actually, don't.",
            "I designed a zero-gravity toilet for the ISS.",
            "Froot Loops are a food group, fight me."
        ],
        raj: [
            "I can talk to women now! Mostly!",
            "Cinnamon is the love of my life. She's a dog.",
            "I discovered a planetary body! It was Neil deGrasse Tyson.",
            "Grasshopper, anyone?",
            "Bollywood > Hollywood. I said what I said.",
            "The stars are beautiful tonight... *tears up*",
            "I once ate a peanut off the floor. I'm not proud."
        ],
        amy: [
            "As a neurobiologist, I find this fascinating.",
            "Sheldon and I have a relationship agreement.",
            "I dissected my first brain at 14. It was beautiful.",
            "Bestie! *waves at Penny*",
            "Tiara time! Every girl deserves a tiara.",
            "I'm like a good whiskey. I get better with age.",
            "Fun fact: the brain has no pain receptors."
        ],
        bernie: [
            "Don't make me use my scary voice!",
            "I work with dangerous microorganisms. Don't mess with me.",
            "Howie! Get in here!",
            "I may be short but I am mighty.",
            "My mother-in-law and I have... a relationship.",
            "I could weaponize a cantaloupe if I wanted to."
        ],
        stuart: [
            "Business is... it's fine. Everything's fine.",
            "Welcome to the comic book store. We're barely open.",
            "I once had a date. She didn't show up. Classic Stuart.",
            "Did you know I'm technically an artist?",
            "I live above the store. It's not sad. It's efficient.",
            "My therapist says I need to be more positive. So... yay."
        ],
        mary: [
            "The Lord works in mysterious ways.",
            "Sheldon, eat your vegetables!",
            "I raised a genius. And a couple of other children.",
            "Jesus take the wheel!",
            "Bless your heart."
        ],
        beverly: [
            "Fascinating. Tell me about your childhood.",
            "I've published 17 books on neuroscience.",
            "Leonard, I'm disappointed but not surprised.",
            "Emotions are merely biochemical reactions.",
            "My relationship with my sons is purely clinical."
        ],
        proton: [
            "Science is fun! Let me show you!",
            "Back in my day, we did science on television!",
            "My show was cancelled. Budget cuts.",
            "A proton walks into a bar...",
            "Sheldon is my biggest fan. It's... something."
        ],
        kripke: [
            "Hewwo, Cooper!",
            "My wesearch is supewior to yours!",
            "I'm Barry Kwipke, and I'm a genius!",
            "Want to pwactice wock climbing?",
            "The laser is MY toy!"
        ],
        leslie: [
            "Dumbass.",
            "String theory is for chumps.",
            "Loop quantum gravity is the future.",
            "I had a thing with Leonard once. Don't remind me.",
            "My cello playing brings all the boys to the yard."
        ],
        bert: [
            "I'm a geologist. People forget.",
            "This rock is 3.4 billion years old. Isn't that cool?",
            "I'm very strong. I can carry many rocks.",
            "Geology rocks. Get it?",
            "I wrote a song about you. It's on SoundCloud."
        ],
        wil: [
            "I'm Wil Wheaton! THE Wil Wheaton!",
            "Wesley Crusher was a great character. GREAT.",
            "Sheldon and I... we have history.",
            "TableTop is the best show on YouTube.",
            "WHEAAATON!"
        ],
        zack: [
            "Dude, that's awesome!",
            "Wait... I don't get it.",
            "Penny and I used to date. I'm still not over it.",
            "I'm not dumb! I'm just... differently smart.",
            "Superman? That's the one with the cape, right?"
        ],
        emily: [
            "I'm a dermatologist. Skin is fascinating.",
            "I have a dark side. It's... surprisingly dark.",
            "Raj and I had a thing. It was complicated.",
            "Horror movies are my comfort food.",
            "Want to see my taxidermy collection?"
        ]
    };

    // ---- STATE ----
    var activeBubble = null;
    var bubbleTimeout = null;

    // ---- SHOW BUBBLE ----
    function showCharacterBubble(charKey, charDiv) {
        // Remove existing bubble
        dismissBubble();

        var quotes = CHAR_CHATTER[charKey] || ["..."];
        var text = quotes[Math.floor(Math.random() * quotes.length)];

        // Character info
        var charColors = {
            sheldon: '#3b82f6', penny: '#f59e0b', leonard: '#22c55e',
            howard: '#ec4899', raj: '#a855f7', amy: '#14b8a6',
            bernie: '#ef4444', stuart: '#6b7280', mary: '#f97316',
            beverly: '#8b5cf6', proton: '#06b6d4', kripke: '#f43f5e',
            leslie: '#84cc16', bert: '#78716c', wil: '#eab308',
            zack: '#0ea5e9', emily: '#e879f9'
        };
        var color = charColors[charKey] || '#a855f7';
        var name = (typeof characters !== 'undefined' && characters[charKey]) ? characters[charKey].name : charKey;

        // Tiny reward for chatting
        var reward = Math.floor(Math.random() * 5) + 2;
        if (typeof state !== 'undefined') {
            state.resources.money += reward;
            if (typeof trackStat === 'function') trackStat('moneyEarned', reward);
        }

        // Create bubble
        var bubble = document.createElement('div');
        bubble.className = 'hangout-bubble';
        bubble.id = 'hangout-active-bubble';

        bubble.innerHTML = '<div class="hangout-bubble-inner">' +
            '<div class="hangout-bubble-name" style="color:' + color + '">' + name + '</div>' +
            '<div class="hangout-bubble-text">"' + text + '"</div>' +
            '<div class="hangout-bubble-reward">+$' + reward + ' 💬</div>' +
            '<div class="hangout-bubble-tail"></div>' +
        '</div>';

        // Position above the character
        var rect = charDiv.getBoundingClientRect();
        var arena = document.getElementById('arena');
        var arenaRect = arena ? arena.getBoundingClientRect() : { left: 0, top: 0 };

        bubble.style.left = (rect.left - arenaRect.left + rect.width / 2 - 100) + 'px';
        bubble.style.bottom = (arenaRect.height - (rect.top - arenaRect.top) + 5) + 'px';

        // Clamp to viewport
        var parent = arena || document.body;
        parent.appendChild(bubble);

        // Adjust if off-screen
        var bRect = bubble.getBoundingClientRect();
        if (bRect.left < 8) bubble.style.left = '8px';
        if (bRect.right > window.innerWidth - 8) {
            bubble.style.left = (window.innerWidth - arenaRect.left - 208) + 'px';
        }

        activeBubble = bubble;

        // Play click sound
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('click');

        // Auto-dismiss
        bubbleTimeout = setTimeout(dismissBubble, 4000);

        // Dismiss on click elsewhere
        bubble.onclick = function(e) { e.stopPropagation(); dismissBubble(); };

        if (typeof saveProgress === 'function') saveProgress();
        if (typeof syncUI === 'function') syncUI();
    }

    function dismissBubble() {
        if (bubbleTimeout) { clearTimeout(bubbleTimeout); bubbleTimeout = null; }
        if (activeBubble) {
            activeBubble.classList.add('removing');
            var el = activeBubble;
            setTimeout(function() { if (el && el.parentNode) el.parentNode.removeChild(el); }, 250);
            activeBubble = null;
        }
    }

    // ---- PATCH: Override hangout character click behavior ----
    // Instead of opening the character modal, show a speech bubble
    var _origRenderHangoutCrew = null;

    function patchHangoutCrew() {
        if (typeof renderHangoutCrew !== 'function') return;
        if (_origRenderHangoutCrew) return; // already patched

        _origRenderHangoutCrew = renderHangoutCrew;

        window.renderHangoutCrew = function() {
            // Call original
            _origRenderHangoutCrew();

            // Now re-bind click handlers on all hangout characters
            var container = document.getElementById('hangout-crew-container');
            if (!container) return;

            var chars = container.querySelectorAll('[class*="pointer-events-auto"]');
            chars.forEach(function(charDiv) {
                // Extract character key from the onclick or name label
                var nameLabel = charDiv.querySelector('span');
                if (!nameLabel) return;

                var charName = nameLabel.textContent.trim();
                var charKey = null;

                // Find key by matching character name
                if (typeof characters !== 'undefined') {
                    for (var k in characters) {
                        if (characters[k].name === charName) {
                            charKey = k;
                            break;
                        }
                    }
                }

                if (!charKey) return;

                // Override click to show bubble
                charDiv.onclick = function(e) {
                    e.stopPropagation();
                    showCharacterBubble(charKey, charDiv);
                };
            });
        };
    }

    // ---- INIT ----
    function init() {
        patchHangoutCrew();

        // Dismiss bubble when leaving hangout mode
        var origToggle = window.toggleHangoutMode;
        if (origToggle) {
            window.toggleHangoutMode = function(event) {
                dismissBubble();
                origToggle(event);
            };
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 3000); });
    } else {
        setTimeout(init, 3000);
    }

    // Exports
    window.showCharacterBubble = showCharacterBubble;
    window.dismissBubble = dismissBubble;
})();
