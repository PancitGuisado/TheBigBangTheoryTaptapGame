const fs = require('fs');

console.log('Cleaning up duplicate injections from patch_supabase.js...');

// 1. Clean index.html
let html = fs.readFileSync('index.html', 'utf8');

const lastTitleScreenIndex = html.lastIndexOf('<div id="title-screen"');
if (lastTitleScreenIndex !== -1 && html.indexOf('<div id="title-screen"') !== lastTitleScreenIndex) {
    const cleanBody = html.substring(lastTitleScreenIndex);
    const cleanHead = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>TBBT Idle Game</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 0; background: #000; overflow: hidden; font-family: 'Courier New', Courier, monospace; touch-action: none; user-select: none; -webkit-user-select: none; }
        * { box-sizing: border-box; }
        .pixel-text { font-family: 'Courier New', Courier, monospace; font-weight: bold; }
    </style>
</head>
<body class="text-white">
`;
    html = cleanHead + cleanBody;
    html = html.replace(/<script src="supabase\.js[^>]+><\/script>\s*/, '');
    fs.writeFileSync('index.html', html);
    console.log('✅ Fixed index.html duplicate title screens and head');
}

// 2. Clean app_v2.js
let app = fs.readFileSync('app_v2.js', 'utf8');
const initGameIndex = app.indexOf('function initGame() {');
const firstAuthIndex = app.indexOf('// AUTH FLOW SYSTEM');

if (firstAuthIndex !== -1 && initGameIndex !== -1 && firstAuthIndex < initGameIndex) {
    // The chunk actually starts a bit before AUTH FLOW SYSTEM with // ===...
    const actualStartIndex = app.lastIndexOf('// =================', firstAuthIndex);
    const startIndex = actualStartIndex !== -1 ? actualStartIndex : firstAuthIndex;
    
    const cleanApp = app.substring(0, startIndex) + app.substring(initGameIndex);
    let finalApp = cleanApp.replace(/\n\s*\/\/\s*Cloud save if logged in\n\s*if \(typeof cloudSave === "function"[^\n]+\n/g, '');
    
    const oldInitGame = `function initGame() {
    // Initialize Supabase
    if (typeof initSupabase === "function") initSupabase();
    // Check for existing session
    if (typeof supabaseGetSession === "function") {
        supabaseGetSession().then(function(session) {
            if (session) updateOnlineStatus();
        });
    }`;
    finalApp = finalApp.replace(oldInitGame, 'function initGame() {');
    
    fs.writeFileSync('app_v2.js', finalApp);
    console.log('✅ Reverted app_v2.js auth injections');
}

// Ensure idempotency in patch_supabase.js
let patch = fs.readFileSync('patch_supabase.js', 'utf8');
if (!patch.includes('// Check if already injected')) {
    patch = patch.replace('var indexHtml = fs.readFileSync(\'index.html\', \'utf8\');', 
        'var indexHtml = fs.readFileSync(\'index.html\', \'utf8\');\nif(indexHtml.includes(\'<script src="supabase.js"\')) { console.log("Already patched index.html"); process.exit(0); }');
    fs.writeFileSync('patch_supabase.js', patch);
    console.log('✅ Made patch_supabase.js idempotent');
}

console.log('Cleanup complete. Run node patch_supabase.js again.');
