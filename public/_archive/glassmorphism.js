const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace flat backgrounds with glassmorphism
html = html.replace(/bg-slate-900(?!\/)/g, "bg-slate-900/75 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]");
html = html.replace(/bg-slate-800(?!\/)/g, "bg-slate-800/80 backdrop-blur border border-white/5");

// Remove rigid borders that clash with glass
html = html.replace(/border-slate-700/g, "border-transparent");
html = html.replace(/border-slate-800/g, "border-transparent");

// Change main arena background to something ready for an animated background
// It's currently probably a flat color or gradient
html = html.replace(/bg-gradient-to-b from-slate-900 to-indigo-950/g, "bg-slate-950 relative overflow-hidden");

fs.writeFileSync('index.html', html);
console.log("Applied glassmorphism to index.html");
