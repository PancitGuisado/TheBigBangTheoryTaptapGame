const fs = require('fs');

// Update the JS toggle button text
let code = fs.readFileSync('app_v2.js', 'utf8');
code = code.replace(
    "if (btnText) btnText.innerText = hangoutMode ? 'BACK TO BATTLE' : 'HANG OUT';",
    "if (btnText) btnText.innerText = hangoutMode ? 'BACK TO BATTLE' : 'HANG OUT';"
);

// Update cache buster
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/v=1781\d+/g, 'v=1781449000000');
fs.writeFileSync('index.html', html);
console.log('✅ Updated cache buster');
