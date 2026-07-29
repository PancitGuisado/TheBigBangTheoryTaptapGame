const fs = require('fs');

const backup = fs.readFileSync('backup_temp/app.js', 'utf8');
const broken = fs.readFileSync('app_broken_backup.js', 'utf8');

// The block starts right before function updateSheldonBuffBadge() 
// And ends right after function openModal(event, key) { ... }
// Let's find the exact indices!

let startStr = 'function updateSheldonBuffBadge() {';
let endStr = 'function renderCraftingQueue() {';

let startIdx = backup.indexOf(startStr);
let endIdx = backup.indexOf(endStr);

let missingBlock = backup.substring(startIdx, endIdx);

// Now where do we put it in app_broken_backup.js?
// It originally comes after function handleArenaTap(event)
// Let's find handleArenaTap in broken!
let handleIdx = broken.indexOf('function handleArenaTap(event) {');
let handleEnd = broken.indexOf('}', handleIdx);
// But handleArenaTap calls updateSheldonBuffBadge, processDamage, etc.

// Or we can just put it right before function triggerBossFight(event) like we tried before!
let insertIdx = broken.indexOf('function triggerBossFight(event) {');

let firstMapBg = broken.indexOf('function updateMapBackground() {');
let secondMapBg = broken.indexOf('function updateMapBackground() {', firstMapBg + 1);

let cleanedApp = broken.substring(0, firstMapBg) + broken.substring(secondMapBg);

insertIdx = cleanedApp.indexOf('function triggerBossFight(event) {');
cleanedApp = cleanedApp.substring(0, insertIdx) + missingBlock + "\n\n" + cleanedApp.substring(insertIdx);

fs.writeFileSync('perfect_rebuild.js', cleanedApp);
console.log("Missing block length:", missingBlock.length);
