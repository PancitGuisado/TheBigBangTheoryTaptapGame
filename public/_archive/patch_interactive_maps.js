const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// ============================================================
// FIX 1: Suppress attack visuals during hangout mode
// ============================================================
if (!code.includes('if (hangoutMode) return; // no visuals in hangout')) {
    code = code.replace(
        /function triggerUniqueVisuals\(key\) \{\r?\n/,
        'function triggerUniqueVisuals(key) {\n    if (hangoutMode) return; // no visuals in hangout\n'
    );
    console.log('✅ FIX 1: Suppressed triggerUniqueVisuals in hangout');
}

// Also suppress triggerRobotVisuals in hangout
if (code.includes('function triggerRobotVisuals') && !code.includes('hangoutMode) return; // no robot visuals')) {
    code = code.replace(
        /function triggerRobotVisuals\(robotId, config\) \{\n/,
        'function triggerRobotVisuals(robotId, config) {\n    if (hangoutMode) return; // no robot visuals\n'
    );
    console.log('✅ FIX 1b: Suppressed triggerRobotVisuals in hangout');
}

// Also suppress generateImpactSparks in hangout
if (!code.includes('if (hangoutMode) return; // no sparks in hangout')) {
    code = code.replace(
        /function generateImpactSparks\(event\) \{\r?\n/,
        'function generateImpactSparks(event) {\n    if (hangoutMode) return; // no sparks in hangout\n'
    );
    console.log('✅ FIX 1c: Suppressed generateImpactSparks in hangout');
}

// ============================================================
// FIX 2: Replace hangoutAction with location-aware interactions
// and dynamically generate hotspots per location
// ============================================================

// Replace the old hangoutAction function
const oldHangoutAction = /function hangoutAction\(type, event\) \{[\s\S]*?\n\}\r?\n/;

const newHangoutSystem = `function hangoutAction(type, event) {
    if (event) event.stopPropagation();
    
    // Location-specific interactions with lore-accurate dialogue
    const locationInteractions = {
        sheldons_apt: {
            door: ["Knock knock knock, Penny!", "Knock knock knock, Penny!", "Knock knock knock, Penny!"],
            couch: ["That's MY spot. Nobody sits in my spot.", "Soft kitty, warm kitty, little ball of fur...", "I'm not crazy, my mother had me tested."],
            whiteboard: ["If you examine the equation, you'll see the flaw in string theory.", "E = mc²... no wait, that's too simple.", "I've just disproved Newton! ...No wait, it was a math error."],
            bookcase: ["Don't touch my collectibles! They're mint in box!", "My Flash action figure is signed by Jim Lee.", "These comics are worth more than your car, Leonard."],
            fridge: ["There's leftover Thai food from Tuesday.", "Sheldon's food schedule: Monday is Thai food.", "Who moved my yogurt?!"],
            desk: ["Working on my Nobel Prize acceptance speech.", "Physics doesn't care about your feelings.", "Bazinga!"]
        },
        pennys_apt: {
            door: ["Just come in, it's open! ...Wait, who are you?", "Leonard, is that you? I told you to knock!", "*opens door wearing Ugg boots*"],
            couch: ["Want some wine? I have... box wine.", "This is where I rehearse my auditions.", "Netflix and cheap wine. Living the dream!"],
            kitchen: ["I can make... cereal. Or toast. That's about it.", "Sheldon banned me from his kitchen after 'the incident'.", "Anyone want cheesecake? I brought leftovers!"],
            closet: ["Half of these are from my acting days.", "I have too many shoes. Said no one ever.", "Somewhere in here is Leonard's hoodie."],
            window: ["I can see into Sheldon's apartment from here!", "Pasadena sunsets are actually pretty nice.", "Is that Howard on the roof again?"]
        },
        comic_store: {
            counter: ["Welcome to the comic book store. No, we don't have WiFi.", "Stuart here. Business is... not great.", "Can I interest you in a slightly water-damaged Batman?"],
            shelf_left: ["New arrivals: Detective Comics #1000!", "Marvel or DC? Choose wisely.", "These vintage X-Men are practically giving themselves away."],
            shelf_right: ["Manga section. Don't judge me.", "Star Wars comics. The REAL canon.", "Graphic novels for the sophisticated reader."],
            standee: ["Cardboard Captain America watches over us all.", "Don't lean on the standee! It's load-bearing!", "We had a life-size Thor but Howard broke it."],
            table: ["D&D night is Wednesday. Bring your own dice.", "This is where dreams are rolled... literally.", "Last session, Sheldon's elf died. He cried."]
        },
        caltech: {
            lab: ["Don't touch the laser! It costs more than your house.", "Experimental physics at its finest.", "Someone left the particle accelerator on again."],
            desk: ["Tenure review coming up. Wish me luck.", "Published papers: 87. Friends: 4. Worth it.", "My whiteboard is bigger than Sheldon's."],
            hallway: ["The cafeteria is that way. Sloppy Joes today.", "Watch out for Kripke. He's on the warpath.", "Faculty parking is a battlefield."],
            vending: ["The machine ate my dollar again!", "Astronaut food? In a vending machine?", "Diet Coke is the fuel of science."],
            board: ["Department meeting at 3 PM. Ugh.", "Congratulations Dr. Cooper... again.", "Research grants available. Apply within."]
        },
        howards_house: {
            bedroom: ["This is where the magic happens. By magic I mean engineering.", "Ma! I'm working!", "My astronaut helmet is right there on the shelf."],
            kitchen: ["MA! WHERE'S MY FRUIT LOOPS?!", "The kitchen where Mrs. Wolowitz's legendary meals happened.", "Howard's froot loops... the breakfast of champions."],
            garage: ["The Mars Rover started here. Don't tell NASA.", "Robot parts everywhere. Watch your step.", "This is my workshop. Raj isn't allowed anymore."],
            stairs: ["MA! SOMEONE'S AT THE DOOR!", "These stairs have heard many arguments.", "Howard lived here way too long. Way. Too. Long."],
            toilet: ["DO NOT go in there. Trust me.", "Howard's belt buckle collection is in there. Don't ask.", "The bathroom of nightmares."]
        },
        rajs_apt: {
            telescope: ["You can see Jupiter's moons tonight!", "Astrophysics is romantic. Fight me.", "I discovered a comet once! ...They named it after a rat."],
            bar: ["I can talk to women now! ...mostly.", "Grasshoppers for everyone!", "My mixology skills are legendary."],
            couch: ["Cinnamon sleeps here. She's a princess.", "This is my Bollywood movie marathon spot.", "I cry during rom-coms. I'm not ashamed."],
            bookshelf: ["Astronomy texts and romance novels. A balanced library.", "My published papers on dark matter.", "Somewhere here is a love letter I never sent."],
            kitchen: ["I actually CAN cook. Indian food is my specialty.", "Tikka masala takes 3 hours but it's worth it.", "Howard ate all my naan again."]
        },
        bernie_house: {
            living: ["Bernadette's house rules: shoes off at the door!", "Don't mess with Bernie. Just don't.", "The dollhouse is for decoration, not playing!"],
            kitchen: ["I may be small but I make a mean pot roast.", "Howard! Did you eat the last cookie?!", "MY MOTHER TAUGHT ME TO COOK AND I AM GRATEFUL."],
            nursery: ["The baby room. Aww.", "Halley's room is organized by color. Don't rearrange.", "Howard is NOT allowed to build a robot nanny."],
            yard: ["The backyard where Howard's drone crashed.", "BBQ nights with the gang.", "Bernie's garden is surprisingly deadly. She grows habaneros."]
        },
        cheesecake_factory: {
            bar: ["Penny worked here for years. YEARS.", "One cheesecake please. Actually, make it two.", "The tips here aren't great but the stories are."],
            kitchen: ["The legendary Cheesecake Factory kitchen!", "Over 200 menu items. How do they do it?", "Someone ordered the avocado egg rolls again."],
            booth: ["This is the gang's booth. It's basically reserved.", "Every major life decision happened in this booth.", "The booth has seen things. Many things."],
            entrance: ["Welcome to The Cheesecake Factory!", "Party of 4? Right this way.", "No, Sheldon, you can't bring your own food."]
        },
        chocolate_factory: {
            conveyor: ["Don't eat the chocolate off the belt! ...okay, one piece.", "Quality control is very serious here.", "I Love Lucy vibes, anyone?"],
            vat: ["The chocolate vat. It's exactly what you think.", "Willy Wonka wishes he had this setup.", "Don't fall in. We lost an intern that way."],
            office: ["Factory manager's office. Keep out.", "Production quotas are... chocolatey.", "The break room has free samples!"],
            storage: ["Rows upon rows of chocolate.", "This is basically heaven.", "Temperature controlled to exactly 65°F."]
        },
        pasadena_museum: {
            exhibit: ["Ancient artifacts from around the world!", "Don't touch the dinosaur skeleton!", "This exhibit is worth millions. Please don't sneeze."],
            gift_shop: ["Museum gift shop: overpriced magnets and keychains.", "I got Sheldon a periodic table mug here.", "Astronaut ice cream! It's freeze-dried!"],
            planetarium: ["The planetarium show starts in 10 minutes.", "Raj cried during the last star show.", "The universe is beautiful and terrifying."],
            lobby: ["Welcome to the Pasadena Museum!", "School field trips every Tuesday.", "The acoustics in here are amazing. HELLO!"]
        },
        main_street: {
            street: ["Just your average Pasadena street.", "The bus stop where Sheldon waits precisely at 8:13 AM.", "California sunshine. Every. Single. Day."],
            shop: ["Local shops and cafes.", "Sheldon's barber is around the corner.", "Best comic shop is 3 blocks that way."],
            bench: ["A nice bench to sit and judge people.", "Penny jogs past here every morning.", "The pigeons here are aggressive."]
        }
    };
    
    var locKey = state.currentLocation || 'sheldons_apt';
    var locData = locationInteractions[locKey] || locationInteractions['sheldons_apt'];
    var quotes = locData[type] || ["Nothing interesting here.", "Just vibing.", "Bazinga!"];
    var msg = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Small cash bonus for exploring
    var val = Math.floor(Math.random() * 3) + 1;
    state.resources.money += val;
    
    // Create speech bubble
    var bubble = document.createElement('div');
    bubble.style.cssText = 'position:fixed;background:white;color:#1e293b;font-weight:bold;font-size:11px;padding:8px 12px;border:2px solid #334155;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:200;max-width:220px;line-height:1.3;pointer-events:none;animation:bubble-pop 0.3s ease-out;';
    bubble.style.left = event.clientX + 'px';
    bubble.style.top = (event.clientY - 60) + 'px';
    
    // Speech bubble tail
    bubble.innerHTML = msg + '<div style="font-size:8px;color:#059669;font-weight:bold;margin-top:3px;">+$' + val + '</div>' +
        '<div style="position:absolute;bottom:-8px;left:20px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid white;"></div>';
    
    document.body.appendChild(bubble);
    setTimeout(function() { if (bubble.parentNode) bubble.remove(); }, 2500);
    saveProgress();
    syncUI();
}
`;

if (oldHangoutAction.test(code)) {
    code = code.replace(oldHangoutAction, newHangoutSystem);
    console.log('✅ FIX 2: Replaced hangoutAction with location-aware system');
} else {
    console.log('❌ FIX 2: Could not find hangoutAction');
}

// ============================================================
// FIX 3: Generate dynamic hotspots per location
// Replace the static hotspot show in toggleHangoutMode
// ============================================================

// Find where we show hotspots and add dynamic generation
const oldToggleHangout = /function toggleHangoutMode\(event\) \{[\s\S]*?const hcc = document\.getElementById\('hangout-crew-container'\);\s*\n\s*if \(hcc\) hcc\.remove\(\);\s*\n\s*\}\s*\}/;

const newToggle = `function toggleHangoutMode(event) {
    if (event) event.stopPropagation();
    hangoutMode = !hangoutMode;
    
    var btnText = document.getElementById('hangout-btn-text');
    if (btnText) btnText.innerText = hangoutMode ? 'BACK TO BATTLE' : 'HANG OUT';
    
    var combatUI = document.getElementById('enemy-battle-slot');
    var playerLines = document.getElementById('player-battle-line');
    var robotLines = document.getElementById('robot-battle-line');
    var hotspots = document.getElementById('hangout-hotspots');
    
    if (hangoutMode) {
        if (combatUI) combatUI.classList.add('hidden');
        if (playerLines) playerLines.classList.add('hidden');
        if (robotLines) robotLines.classList.add('hidden');
        var synergyEl = document.getElementById('synergy-display');
        if (synergyEl) synergyEl.style.display = 'none';
        var repairEl = document.getElementById('quick-repair-container');
        if (repairEl) repairEl.style.display = 'none';
        var bossCtrl = document.getElementById('boss-controls');
        if (bossCtrl) bossCtrl.style.display = 'none';
        document.querySelectorAll('.damage-popup, .unique-fx, .laser-beam').forEach(function(el) { el.remove(); });
        generateLocationHotspots();
        renderHangoutMapBrowser();
    } else {
        if (combatUI) combatUI.classList.remove('hidden');
        if (playerLines) playerLines.classList.remove('hidden');
        if (robotLines) robotLines.classList.remove('hidden');
        if (hotspots) hotspots.classList.add('hidden');
        var synergyEl2 = document.getElementById('synergy-display');
        if (synergyEl2) synergyEl2.style.display = '';
        var repairEl2 = document.getElementById('quick-repair-container');
        if (repairEl2) repairEl2.style.display = '';
        var bossCtrl2 = document.getElementById('boss-controls');
        if (bossCtrl2) bossCtrl2.style.display = '';
        var hcc = document.getElementById('hangout-crew-container');
        if (hcc) hcc.remove();
        var dynHotspots = document.getElementById('dynamic-hotspots');
        if (dynHotspots) dynHotspots.remove();
    }
}

function generateLocationHotspots() {
    var old = document.getElementById('dynamic-hotspots');
    if (old) old.remove();
    
    var arena = document.getElementById('arena');
    if (!arena) return;
    
    var container = document.createElement('div');
    container.id = 'dynamic-hotspots';
    container.style.cssText = 'position:absolute;inset:0;z-index:56;';
    arena.appendChild(container);
    
    // Hotspot definitions per location: { type, label, emoji, position, size, color }
    var hotspotDefs = {
        sheldons_apt: [
            { type: 'door', label: 'Door', emoji: '🚪', top: '10%', left: '3%', w: '14%', h: '60%', color: 'stone' },
            { type: 'bookcase', label: 'Collectibles', emoji: '📚', top: '10%', left: '50%', w: '16%', h: '50%', color: 'purple' },
            { type: 'whiteboard', label: 'Whiteboard', emoji: '📝', top: '12%', left: '72%', w: '22%', h: '38%', color: 'slate' },
            { type: 'couch', label: "Sheldon's Spot", emoji: '🛋️', bottom: '0', left: '15%', w: '50%', h: '28%', color: 'amber' },
            { type: 'fridge', label: 'Fridge', emoji: '🧊', top: '20%', left: '35%', w: '12%', h: '40%', color: 'cyan' }
        ],
        pennys_apt: [
            { type: 'door', label: 'Door', emoji: '🚪', top: '10%', left: '3%', w: '14%', h: '60%', color: 'rose' },
            { type: 'couch', label: 'Couch', emoji: '🛋️', bottom: '0', left: '20%', w: '45%', h: '30%', color: 'pink' },
            { type: 'kitchen', label: 'Kitchen', emoji: '🍳', top: '15%', left: '55%', w: '20%', h: '45%', color: 'yellow' },
            { type: 'closet', label: 'Closet', emoji: '👗', top: '10%', left: '78%', w: '18%', h: '50%', color: 'fuchsia' },
            { type: 'window', label: 'Window', emoji: '🪟', top: '8%', left: '30%', w: '18%', h: '30%', color: 'sky' }
        ],
        comic_store: [
            { type: 'counter', label: 'Counter', emoji: '🏪', bottom: '5%', left: '30%', w: '35%', h: '25%', color: 'emerald' },
            { type: 'shelf_left', label: 'DC Comics', emoji: '🦇', top: '10%', left: '5%', w: '20%', h: '55%', color: 'blue' },
            { type: 'shelf_right', label: 'Marvel', emoji: '🕷️', top: '10%', left: '75%', w: '20%', h: '55%', color: 'red' },
            { type: 'standee', label: 'Standee', emoji: '🦸', top: '20%', left: '50%', w: '15%', h: '45%', color: 'amber' },
            { type: 'table', label: 'D&D Table', emoji: '🎲', bottom: '5%', left: '5%', w: '22%', h: '25%', color: 'violet' }
        ],
        caltech: [
            { type: 'lab', label: 'Lab', emoji: '🔬', top: '10%', left: '5%', w: '25%', h: '50%', color: 'emerald' },
            { type: 'desk', label: 'Desk', emoji: '💻', top: '15%', left: '55%', w: '20%', h: '40%', color: 'cyan' },
            { type: 'hallway', label: 'Hallway', emoji: '🏛️', top: '10%', left: '35%', w: '15%', h: '55%', color: 'slate' },
            { type: 'vending', label: 'Vending', emoji: '🥤', top: '20%', left: '78%', w: '18%', h: '40%', color: 'orange' },
            { type: 'board', label: 'Notice Board', emoji: '📋', bottom: '5%', left: '20%', w: '25%', h: '25%', color: 'yellow' }
        ],
        howards_house: [
            { type: 'bedroom', label: "Howard's Room", emoji: '🛏️', top: '10%', left: '5%', w: '25%', h: '50%', color: 'blue' },
            { type: 'kitchen', label: 'Kitchen', emoji: '🍳', top: '10%', left: '55%', w: '22%', h: '45%', color: 'amber' },
            { type: 'garage', label: 'Garage', emoji: '🔧', bottom: '0', left: '5%', w: '30%', h: '30%', color: 'slate' },
            { type: 'stairs', label: 'Stairs', emoji: '🪜', top: '15%', left: '35%', w: '15%', h: '55%', color: 'stone' },
            { type: 'toilet', label: 'Bathroom', emoji: '🚿', top: '10%', left: '80%', w: '16%', h: '40%', color: 'teal' }
        ],
        rajs_apt: [
            { type: 'telescope', label: 'Telescope', emoji: '🔭', top: '8%', left: '70%', w: '25%', h: '50%', color: 'indigo' },
            { type: 'bar', label: 'Mini Bar', emoji: '🍸', top: '15%', left: '5%', w: '20%', h: '40%', color: 'rose' },
            { type: 'couch', label: 'Couch', emoji: '🛋️', bottom: '0', left: '20%', w: '45%', h: '28%', color: 'purple' },
            { type: 'bookshelf', label: 'Books', emoji: '📖', top: '10%', left: '35%', w: '18%', h: '50%', color: 'amber' },
            { type: 'kitchen', label: 'Kitchen', emoji: '🍛', top: '20%', left: '55%', w: '15%', h: '35%', color: 'orange' }
        ],
        bernie_house: [
            { type: 'living', label: 'Living Room', emoji: '🏠', bottom: '0', left: '15%', w: '50%', h: '30%', color: 'pink' },
            { type: 'kitchen', label: 'Kitchen', emoji: '🍰', top: '10%', left: '55%', w: '25%', h: '45%', color: 'rose' },
            { type: 'nursery', label: 'Nursery', emoji: '👶', top: '10%', left: '5%', w: '22%', h: '45%', color: 'sky' },
            { type: 'yard', label: 'Backyard', emoji: '🌿', top: '10%', left: '35%', w: '15%', h: '50%', color: 'green' }
        ],
        cheesecake_factory: [
            { type: 'bar', label: 'Bar', emoji: '🍷', top: '10%', left: '5%', w: '22%', h: '45%', color: 'amber' },
            { type: 'kitchen', label: 'Kitchen', emoji: '👨‍🍳', top: '10%', left: '70%', w: '25%', h: '50%', color: 'red' },
            { type: 'booth', label: "The Gang's Booth", emoji: '🍽️', bottom: '0', left: '25%', w: '40%', h: '30%', color: 'yellow' },
            { type: 'entrance', label: 'Entrance', emoji: '🚪', top: '15%', left: '35%', w: '18%', h: '45%', color: 'emerald' }
        ],
        chocolate_factory: [
            { type: 'conveyor', label: 'Conveyor', emoji: '🏭', bottom: '5%', left: '10%', w: '60%', h: '20%', color: 'amber' },
            { type: 'vat', label: 'Chocolate Vat', emoji: '🍫', top: '10%', left: '5%', w: '25%', h: '50%', color: 'yellow' },
            { type: 'office', label: 'Office', emoji: '🏢', top: '10%', left: '70%', w: '25%', h: '40%', color: 'slate' },
            { type: 'storage', label: 'Storage', emoji: '📦', top: '15%', left: '38%', w: '25%', h: '40%', color: 'orange' }
        ],
        pasadena_museum: [
            { type: 'exhibit', label: 'Exhibit', emoji: '🦕', top: '10%', left: '5%', w: '30%', h: '50%', color: 'amber' },
            { type: 'gift_shop', label: 'Gift Shop', emoji: '🎁', top: '15%', left: '65%', w: '25%', h: '40%', color: 'pink' },
            { type: 'planetarium', label: 'Planetarium', emoji: '🌌', top: '8%', left: '38%', w: '22%', h: '45%', color: 'indigo' },
            { type: 'lobby', label: 'Lobby', emoji: '🏛️', bottom: '0', left: '15%', w: '55%', h: '25%', color: 'stone' }
        ],
        main_street: [
            { type: 'street', label: 'Street', emoji: '🛣️', bottom: '0', left: '10%', w: '60%', h: '25%', color: 'slate' },
            { type: 'shop', label: 'Shops', emoji: '🏬', top: '10%', left: '5%', w: '30%', h: '50%', color: 'emerald' },
            { type: 'bench', label: 'Bench', emoji: '🪑', bottom: '5%', left: '65%', w: '25%', h: '20%', color: 'amber' }
        ]
    };
    
    var locKey = state.currentLocation || 'sheldons_apt';
    var spots = hotspotDefs[locKey] || hotspotDefs['sheldons_apt'];
    
    for (var i = 0; i < spots.length; i++) {
        var spot = spots[i];
        var div = document.createElement('div');
        div.style.cssText = 'position:absolute;cursor:pointer;border:2px solid transparent;border-radius:6px;transition:all 0.2s;display:flex;align-items:center;justify-content:center;';
        div.style.width = spot.w;
        div.style.height = spot.h;
        if (spot.top) div.style.top = spot.top;
        if (spot.bottom) div.style.bottom = spot.bottom;
        if (spot.left) div.style.left = spot.left;
        
        div.setAttribute('data-type', spot.type);
        div.setAttribute('data-label', spot.label);
        
        // Label shown on hover
        div.innerHTML = '<div style="opacity:0;transition:opacity 0.2s;background:rgba(0,0,0,0.8);color:white;font-size:9px;font-weight:bold;padding:3px 8px;border-radius:4px;pointer-events:none;text-align:center;white-space:nowrap;">' + spot.emoji + ' ' + spot.label + '</div>';
        
        var hoverBg = 'rgba(255,255,255,0.08)';
        var hoverBorder = 'rgba(255,255,255,0.3)';
        
        div.onmouseenter = function() {
            this.style.background = hoverBg;
            this.style.borderColor = hoverBorder;
            this.firstChild.style.opacity = '1';
        };
        div.onmouseleave = function() {
            this.style.background = 'transparent';
            this.style.borderColor = 'transparent';
            this.firstChild.style.opacity = '0';
        };
        div.onclick = function(e) {
            e.stopPropagation();
            hangoutAction(this.getAttribute('data-type'), e);
        };
        
        container.appendChild(div);
    }
}
`;

if (newToggle !== '' && oldToggleHangout.test(code)) {
    code = code.replace(oldToggleHangout, newToggle);
    console.log('✅ FIX 3: Replaced toggle with dynamic hotspot generation');
} else {
    console.log('⚠️ FIX 3: Could not find toggle pattern, trying alternate...');
    // If regex didn't match, just inject generateLocationHotspots after renderHangoutMapBrowser
    if (!code.includes('function generateLocationHotspots')) {
        code = code.replace('function renderHangoutMapBrowser()', newToggle.split('function renderHangoutMapBrowser()')[0] + '\nfunction renderHangoutMapBrowser()');
        console.log('✅ FIX 3: Injected via alternate method');
    }
}

// ============================================================
// FIX 4: Add bubble-pop CSS animation
// ============================================================
let css = fs.readFileSync('styles.css', 'utf8');
if (!css.includes('bubble-pop')) {
    css += `
/* Bubble pop animation for hangout interactions */
@keyframes bubble-pop {
    0% { transform: scale(0.5) translateY(10px); opacity: 0; }
    50% { transform: scale(1.05) translateY(-5px); opacity: 1; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}
`;
    fs.writeFileSync('styles.css', css);
    console.log('✅ FIX 4: Added bubble-pop CSS animation');
}

fs.writeFileSync('app_v2.js', code);

// Verify
let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');

// Cache buster
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/v=1781\d+/g, 'v=1781452000000');
fs.writeFileSync('index.html', html);
console.log('✅ Cache updated');
