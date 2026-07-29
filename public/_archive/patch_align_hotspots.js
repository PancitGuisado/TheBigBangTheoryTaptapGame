const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// Find and replace the hotspotDefs object inside generateLocationHotspots
// Match from "var hotspotDefs = {" to the closing "};"
const oldDefs = /var hotspotDefs = \{[\s\S]*?\n    \};/;

// Aligned to actual background SVG positions in vectors.js:
const newDefs = `var hotspotDefs = {
        // sheldons_apt: Door top:10% left:5% w:15% h:65% | Window top:10% left:25% w:22% h:55% | Bookshelf top:12% left:50% w:18% h:53% | Whiteboard top:15% left:72% w:24% h:40% | Couch bottom:0 h:30%
        sheldons_apt: [
            { type: 'door', label: 'Apt 4A Door', emoji: '🚪', top: '10%', left: '5%', w: '15%', h: '65%', color: 'stone' },
            { type: 'bookcase', label: 'Collectibles', emoji: '📚', top: '12%', left: '50%', w: '18%', h: '53%', color: 'purple' },
            { type: 'whiteboard', label: 'Whiteboard', emoji: '📝', top: '15%', left: '72%', w: '24%', h: '40%', color: 'slate' },
            { type: 'couch', label: "Sheldon's Spot", emoji: '🛋️', bottom: '0', left: '20%', w: '60%', h: '30%', color: 'amber' },
            { type: 'fridge', label: 'Window', emoji: '🪟', top: '10%', left: '25%', w: '22%', h: '55%', color: 'cyan' }
        ],
        // comic_store: Shelves top:10% left:10% right:10% bottom:30% (split L/R) | Neon top:2% center | Counter bottom:0 h:25%
        comic_store: [
            { type: 'shelf_left', label: 'DC Comics', emoji: '🦇', top: '10%', left: '10%', w: '38%', h: '60%', color: 'blue' },
            { type: 'shelf_right', label: 'Marvel', emoji: '🕷️', top: '10%', left: '52%', w: '38%', h: '60%', color: 'red' },
            { type: 'counter', label: 'Cash Register', emoji: '🏪', bottom: '0', left: '0', w: '100%', h: '25%', color: 'emerald' },
            { type: 'standee', label: 'Neon Sign', emoji: '✨', top: '0', left: '25%', w: '50%', h: '10%', color: 'pink' }
        ],
        // chocolate_factory: Vat top:30% center w:64(~55%) h:48(~40%) | Pipes left:20% right:20% top:0 h:30% | Floor bottom:0 h:15%
        chocolate_factory: [
            { type: 'vat', label: 'Chocolate Vat', emoji: '🍫', top: '25%', left: '20%', w: '60%', h: '45%', color: 'amber' },
            { type: 'conveyor', label: 'Left Pipe', emoji: '🏭', top: '0', left: '15%', w: '15%', h: '30%', color: 'slate' },
            { type: 'storage', label: 'Right Pipe', emoji: '📦', top: '0', left: '70%', w: '15%', h: '30%', color: 'slate' },
            { type: 'office', label: 'Factory Floor', emoji: '🏢', bottom: '0', left: '0', w: '100%', h: '15%', color: 'stone' }
        ],
        // caltech: Chalkboard top:10% left:10% right:10% h:40% | Lab bench bottom:0 h:30%
        caltech: [
            { type: 'board', label: 'Chalkboard', emoji: '📋', top: '10%', left: '10%', w: '80%', h: '40%', color: 'emerald' },
            { type: 'lab', label: 'Lab Equipment', emoji: '🔬', bottom: '0', left: '0', w: '50%', h: '30%', color: 'cyan' },
            { type: 'desk', label: 'Oscilloscope', emoji: '💻', bottom: '0', left: '50%', w: '50%', h: '30%', color: 'blue' }
        ],
        // Others use default background - place generic hotspots
        pennys_apt: [
            { type: 'door', label: 'Apt 4B Door', emoji: '🚪', top: '10%', left: '5%', w: '20%', h: '60%', color: 'rose' },
            { type: 'couch', label: 'Couch', emoji: '🛋️', bottom: '0', left: '10%', w: '60%', h: '25%', color: 'pink' },
            { type: 'kitchen', label: 'Kitchen', emoji: '🍳', top: '10%', left: '60%', w: '35%', h: '55%', color: 'yellow' },
            { type: 'window', label: 'Window', emoji: '🪟', top: '5%', left: '30%', w: '25%', h: '40%', color: 'sky' }
        ],
        howards_house: [
            { type: 'bedroom', label: "Howard's Room", emoji: '🛏️', top: '10%', left: '5%', w: '30%', h: '55%', color: 'blue' },
            { type: 'garage', label: 'Garage', emoji: '🔧', bottom: '0', left: '0', w: '50%', h: '25%', color: 'slate' },
            { type: 'kitchen', label: 'Kitchen', emoji: '🍳', top: '10%', left: '55%', w: '40%', h: '55%', color: 'amber' },
            { type: 'stairs', label: 'Stairs', emoji: '🪜', bottom: '0', left: '50%', w: '50%', h: '25%', color: 'stone' }
        ],
        rajs_apt: [
            { type: 'telescope', label: 'Telescope', emoji: '🔭', top: '5%', left: '65%', w: '30%', h: '55%', color: 'indigo' },
            { type: 'bar', label: 'Mini Bar', emoji: '🍸', top: '10%', left: '5%', w: '25%', h: '50%', color: 'rose' },
            { type: 'couch', label: 'Couch', emoji: '🛋️', bottom: '0', left: '10%', w: '60%', h: '25%', color: 'purple' },
            { type: 'bookshelf', label: 'Bookshelf', emoji: '📖', top: '10%', left: '35%', w: '25%', h: '50%', color: 'amber' }
        ],
        bernie_house: [
            { type: 'living', label: 'Living Room', emoji: '🏠', bottom: '0', left: '10%', w: '55%', h: '30%', color: 'pink' },
            { type: 'kitchen', label: 'Kitchen', emoji: '🍰', top: '10%', left: '55%', w: '40%', h: '55%', color: 'rose' },
            { type: 'nursery', label: "Halley's Room", emoji: '👶', top: '10%', left: '5%', w: '30%', h: '55%', color: 'sky' },
            { type: 'yard', label: 'Backyard', emoji: '🌿', bottom: '0', left: '65%', w: '35%', h: '30%', color: 'green' }
        ],
        cheesecake_factory: [
            { type: 'booth', label: "The Gang's Booth", emoji: '🍽️', bottom: '0', left: '15%', w: '50%', h: '30%', color: 'yellow' },
            { type: 'bar', label: 'Bar Area', emoji: '🍷', top: '10%', left: '5%', w: '30%', h: '55%', color: 'amber' },
            { type: 'kitchen', label: 'Kitchen', emoji: '👨‍🍳', top: '10%', left: '60%', w: '35%', h: '55%', color: 'red' },
            { type: 'entrance', label: 'Entrance', emoji: '🚪', bottom: '0', left: '65%', w: '35%', h: '30%', color: 'emerald' }
        ],
        pasadena_museum: [
            { type: 'exhibit', label: 'Dinosaur Exhibit', emoji: '🦕', top: '10%', left: '5%', w: '40%', h: '55%', color: 'amber' },
            { type: 'planetarium', label: 'Planetarium', emoji: '🌌', top: '10%', left: '50%', w: '45%', h: '55%', color: 'indigo' },
            { type: 'lobby', label: 'Lobby', emoji: '🏛️', bottom: '0', left: '0', w: '55%', h: '25%', color: 'stone' },
            { type: 'gift_shop', label: 'Gift Shop', emoji: '🎁', bottom: '0', left: '55%', w: '45%', h: '25%', color: 'pink' }
        ]
    };`;

if (oldDefs.test(code)) {
    code = code.replace(oldDefs, newDefs);
    console.log('✅ Replaced hotspot positions to match backgrounds');
} else {
    console.log('❌ Could not find hotspotDefs');
}

fs.writeFileSync('app_v2.js', code);

let depth = 0;
for (const ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');

// Cache buster
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/v=1781\d+/g, 'v=1781456000000');
fs.writeFileSync('index.html', html);
console.log('✅ Cache updated');
