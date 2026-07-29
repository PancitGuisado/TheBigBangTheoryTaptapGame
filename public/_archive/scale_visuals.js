const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Sheldon: green-powerball
app = app.replace(
    `fx.innerHTML = \`<div class="powerball-core"></div>\`;`,
    `fx.innerHTML = \`<div class="powerball-core" style="width: 20px; height: 20px; background: #fff; border-radius: 50%; box-shadow: 0 0 20px #fff;"></div>\`;\n            fx.style.transform = 'scale(2)';`
);

// Leonard sword
app = app.replace(
    `<svg viewBox="0 0 100 100" class="w-28 h-28">`,
    `<svg viewBox="0 0 100 100" class="w-40 h-40 drop-shadow-xl" style="filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));">`
);

// Howard missile
app = app.replace(
    `<svg viewBox="0 0 60 20" class="w-16 h-6">`,
    `<svg viewBox="0 0 60 20" class="w-24 h-10 drop-shadow-xl" style="filter: drop-shadow(0 0 10px rgba(220,38,38,0.8));">`
);

// Raj sun
app = app.replace(
    `<svg viewBox="0 0 100 100" class="w-20 h-20 animate-spin" style="animation-duration: 3s;">`,
    `<svg viewBox="0 0 100 100" class="w-32 h-32 animate-spin drop-shadow-2xl" style="animation-duration: 3s; filter: drop-shadow(0 0 20px #ea580c);">`
);

// Penny burger
app = app.replace(
    `<svg viewBox="0 0 40 40" class="w-16 h-16 drop-shadow-2xl">`,
    `<svg viewBox="0 0 40 40" class="w-24 h-24 drop-shadow-2xl" style="transform: scale(1.5);">`
);

fs.writeFileSync('app.js', app);
console.log("Updated visuals to be larger.");
