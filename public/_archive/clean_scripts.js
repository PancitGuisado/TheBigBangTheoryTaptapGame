const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Strip all supabase scripts
html = html.replace(/<script src="[^"]*supabase\.js[^"]*"><\/script>\s*/g, '');
html = html.replace(/<script src="[^"]*supabase-js@2[^"]*"><\/script>\s*/g, '');

// Re-add exactly one set
html = html.replace('</head>', '    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>\n    <script src="supabase.js?v=1781463000000"></script>\n</head>');

// Also we need to fix the title screen. 
// When we restored the head earlier, we appended `cleanHead + cleanBody`
// Let's ensure the html structure is right.

fs.writeFileSync('index.html', html);
console.log('Cleaned script tags in index.html!');
