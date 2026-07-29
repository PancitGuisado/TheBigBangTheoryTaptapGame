const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

txt = txt.replace(/<button onclick="openPerksModal\(event\)" class="side-rail-btn group relative" title="Skill Tree">\s*<span class="text-base">.*?<\/span>/, '<button onclick="openPerksModal(event)" class="side-rail-btn group relative" title="Skill Tree">\n                  <span class="text-base">🧠</span>');

txt = txt.replace(/<button onclick="openFoodShop\(event\)" class="side-rail-btn group relative" title="Food Shop">\s*<span class="text-base">.*?<\/span>/, '<button onclick="openFoodShop(event)" class="side-rail-btn group relative" title="Food Shop">\n                  <span class="text-base">🍔</span>');

txt = txt.replace(/<button onclick="openQuestsModal\(\)" class="side-rail-btn group relative" title="Quests">\s*<span class="text-base">.*?<\/span>/, '<button onclick="openQuestsModal()" class="side-rail-btn group relative" title="Quests">\n                  <span class="text-base">📋</span>');

txt = txt.replace(/<button onclick="openAchievementsModal\(\)" class="side-rail-btn group relative" title="Achievements">\s*<span class="text-base">.*?<\/span>/, '<button onclick="openAchievementsModal()" class="side-rail-btn group relative" title="Achievements">\n                  <span class="text-base">🏆</span>');

txt = txt.replace(/<button onclick="openInventoryModal\(\)" class="side-rail-btn group relative" title="Equipment">\s*<span class="text-base">.*?<\/span>/, '<button onclick="openInventoryModal()" class="side-rail-btn group relative" title="Equipment">\n                  <span class="text-base">🎒</span>');

txt = txt.replace(/<button onclick="openEventsModal\(\)" class="side-rail-btn group relative" title="Events">\s*<span class="text-base">.*?<\/span>/, '<button onclick="openEventsModal()" class="side-rail-btn group relative" title="Events">\n                  <span class="text-base">📅</span>');

txt = txt.replace(/<button onclick="openMinigamesHub\(\)" class="side-rail-btn group relative" title="Mini-Games">\s*<span class="text-base">.*?<\/span>/, '<button onclick="openMinigamesHub()" class="side-rail-btn group relative" title="Mini-Games">\n                  <span class="text-base">🎮</span>');

fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Fixed side rail emojis');
