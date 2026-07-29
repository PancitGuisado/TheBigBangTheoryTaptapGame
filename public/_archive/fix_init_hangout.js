const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Fix duplicated initGame
// The duplicate is from "function initGame() {" down to "renderActiveBattleLine();\n}" right before the REAL "function initGame() {"
app = app.replace(/function initGame\(\) \{[\s\S]*?renderActiveBattleLine\(\);\n\}\n\nfunction initGame\(\) \{/, 'function initGame() {');

// 2. Add renderActiveBattleLine to toggleHangoutMode safely
app = app.replace(/if \(typeof updateMapBackground === 'function'\) updateMapBackground\(\);\n    \}\n\}/, "if (typeof updateMapBackground === 'function') updateMapBackground();\n    }\n    if (typeof renderActiveBattleLine === 'function') renderActiveBattleLine();\n}");

fs.writeFileSync('app.js', app);
console.log("Fixed initGame and added render call to toggleHangoutMode");
