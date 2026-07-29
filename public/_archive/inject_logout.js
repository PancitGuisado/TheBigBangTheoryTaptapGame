const fs = require('fs');

// 1. Inject Logout Button into index.html
let html = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const regexAccountStatus = /(<button id="settings-connect-btn"[\s\S]*?<\/button>)/;
const logoutBtnHtml = `\n                        <button id="settings-logout-btn" onclick="performLogout()" class="hidden w-full bg-gradient-to-r from-red-800 to-red-900 text-white font-bold text-[10px] py-2 px-3 rounded-lg border border-red-700 cursor-pointer hover:brightness-110 uppercase tracking-wider transition-all mt-2">Log Out</button>`;

if (!html.includes('id="settings-logout-btn"')) {
    html = html.replace(regexAccountStatus, '$1' + logoutBtnHtml);
}

// Bump cache buster for app_v2.js
html = html.replace(/app_v2\.js\?bust=[0-9]+&v=[0-9]+/g, 'app_v2.js?bust=' + Date.now() + '&v=' + Date.now());

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', html, 'utf8');

// 2. Inject performLogout() into app_v2.js
let app = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', 'utf8');

const performLogoutJS = `
async function performLogout() {
    if (typeof supabaseLogout === 'function') {
        await supabaseLogout();
    }
    // Clear local saves so it doesn't just reload the same account silently
    localStorage.removeItem('tbbt_idle_save');
    localStorage.removeItem('sheldonPasadenaBattleV10');
    // Reload page to return to Auth overlay
    window.location.reload();
}
`;

if (!app.includes('function performLogout()')) {
    // Append to end
    app += '\n' + performLogoutJS;
    fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/app_v2.js', app, 'utf8');
}

console.log("Logout button and function injected successfully.");
