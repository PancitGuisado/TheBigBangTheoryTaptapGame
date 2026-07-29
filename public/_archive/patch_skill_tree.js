const fs = require('fs');

// ============================================================
// PART 1: Replace perks modal HTML in index.html
// ============================================================
let html = fs.readFileSync('index.html', 'utf8');

const oldModalStart = '<div id="perks-modal"';
const oldModalEnd = '</div>\n\n    <!-- Settings Modal -->';
const startIdx = html.indexOf(oldModalStart);
const endIdx = html.indexOf('<!-- Settings Modal -->', startIdx);

if (startIdx > -1 && endIdx > -1) {
    const before = html.substring(0, startIdx);
    const after = html.substring(endIdx);
    
    const newModal = `<div id="perks-modal" class="fixed inset-0 bg-black/60 hidden flex items-center justify-center p-4" style="z-index: 100;">
        <div class="bg-gradient-to-br from-slate-950 to-slate-900 backdrop-blur-md border border-yellow-800/50 max-w-lg w-full max-h-[85vh] p-5 relative text-[12px] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
            <button onclick="closePerksModal()" class="absolute top-2 right-4 text-gray-500 hover:text-white font-bold text-2xl cursor-pointer z-10">&times;</button>
            <div class="border-b-4 border-yellow-800 pb-3 mb-4 text-center">
                <h2 class="text-base font-bold tracking-widest text-yellow-500 uppercase">⚡ SKILL TREE</h2>
                <p class="text-[8px] text-gray-400 mt-1 uppercase tracking-wider">Spend Bazinga Points to unlock powerful paths</p>
                <div class="mt-2 text-xl font-black text-yellow-400 drop-shadow-md">
                    ⭐ <span id="bazinga-points-display">0</span> BP
                </div>
            </div>
            <div id="skill-tree-container" class="flex-1 overflow-y-auto" style="-ms-overflow-style:none;scrollbar-width:none;"></div>
        </div>
    </div>

    `;
    
    html = before + newModal + after;
    html = html.replace(/v=1781\d+/g, 'v=1781460000000');
    fs.writeFileSync('index.html', html);
    console.log('✅ PART 1: Replaced perks modal HTML');
} else {
    console.log('❌ PART 1: Could not find perks modal');
}

// ============================================================
// PART 2: Replace perk functions in app_v2.js
// ============================================================
let code = fs.readFileSync('app_v2.js', 'utf8');

const skillTreeCode = `// SKILL TREE SYSTEM
const skillTreePaths = {
    lifesteal: {
        name: 'Life Steal', emoji: '🧛', color: 'red',
        desc: 'Drain enemy HP with every hit',
        nodes: [
            { id: 'ls1', name: 'Blood Tap', desc: 'Heal 2% of damage dealt', cost: 1, effect: { lifestealPct: 0.02 } },
            { id: 'ls2', name: 'Vampiric Strike', desc: 'Heal 5% of damage dealt', cost: 2, effect: { lifestealPct: 0.05 }, requires: 'ls1' },
            { id: 'ls3', name: 'Soul Siphon', desc: 'Heal 10% of damage dealt', cost: 3, effect: { lifestealPct: 0.10 }, requires: 'ls2' }
        ]
    },
    antiLifesteal: {
        name: 'Anti-Heal', emoji: '☠️', color: 'purple',
        desc: 'Reduce enemy healing abilities',
        nodes: [
            { id: 'al1', name: 'Grievous Wounds', desc: 'Boss healing reduced by 30%', cost: 1, effect: { antiHealPct: 0.30 } },
            { id: 'al2', name: 'Mortal Strike', desc: 'Boss healing reduced by 60%', cost: 2, effect: { antiHealPct: 0.60 }, requires: 'al1' },
            { id: 'al3', name: 'Healing Void', desc: 'Boss healing reduced by 100%', cost: 4, effect: { antiHealPct: 1.0 }, requires: 'al2' }
        ]
    },
    defense: {
        name: 'Defense', emoji: '🛡️', color: 'blue',
        desc: 'Reduce incoming damage to your crew',
        nodes: [
            { id: 'df1', name: 'Thick Skin', desc: 'Take 10% less damage', cost: 1, effect: { dmgReduction: 0.10 } },
            { id: 'df2', name: 'Iron Will', desc: 'Take 20% less damage', cost: 2, effect: { dmgReduction: 0.20 }, requires: 'df1' },
            { id: 'df3', name: 'Unbreakable', desc: 'Take 35% less damage', cost: 3, effect: { dmgReduction: 0.35 }, requires: 'df2' }
        ]
    },
    healing: {
        name: 'Healing', emoji: '💚', color: 'green',
        desc: 'Boost recovery and passive healing',
        nodes: [
            { id: 'hl1', name: 'First Aid', desc: 'Food heals 25% more', cost: 1, effect: { foodHealBonus: 0.25 } },
            { id: 'hl2', name: 'Regeneration', desc: 'Crew heals 1% HP every 5s', cost: 2, effect: { regenPct: 0.01 }, requires: 'hl1' },
            { id: 'hl3', name: 'Divine Blessing', desc: 'Bernie +50%, food +50%', cost: 3, effect: { foodHealBonus: 0.50, bernieBoost: 0.50 }, requires: 'hl2' }
        ]
    },
    deflect: {
        name: 'Deflect', emoji: '🔄', color: 'cyan',
        desc: 'Reflect damage back at enemies',
        nodes: [
            { id: 'rf1', name: 'Thorns', desc: 'Reflect 5% damage to enemy', cost: 1, effect: { reflectPct: 0.05 } },
            { id: 'rf2', name: 'Mirror Shield', desc: 'Reflect 15% damage', cost: 2, effect: { reflectPct: 0.15 }, requires: 'rf1' },
            { id: 'rf3', name: 'Karma', desc: 'Reflect 30% damage', cost: 4, effect: { reflectPct: 0.30 }, requires: 'rf2' }
        ]
    },
    critical: {
        name: 'Critical', emoji: '⚡', color: 'yellow',
        desc: 'Increase critical hit chance and damage',
        nodes: [
            { id: 'cr1', name: 'Sharp Eye', desc: '+10% crit chance', cost: 1, effect: { critChance: 0.10 } },
            { id: 'cr2', name: 'Deadly Precision', desc: '+20% crit, 2x dmg', cost: 2, effect: { critChance: 0.20, critMulti: 2.0 }, requires: 'cr1' },
            { id: 'cr3', name: 'Annihilate', desc: '+30% crit, 3x dmg', cost: 3, effect: { critChance: 0.30, critMulti: 3.0 }, requires: 'cr2' }
        ]
    },
    speed: {
        name: 'Speed', emoji: '💨', color: 'amber',
        desc: 'Attack faster and move quicker',
        nodes: [
            { id: 'sp1', name: 'Quick Hands', desc: 'Atk speed +10%', cost: 1, effect: { atkSpeedBonus: 0.10 } },
            { id: 'sp2', name: 'Haste', desc: 'Atk speed +20%', cost: 2, effect: { atkSpeedBonus: 0.20 }, requires: 'sp1' },
            { id: 'sp3', name: 'Time Warp', desc: 'Atk speed +35%, +5s boss timer', cost: 4, effect: { atkSpeedBonus: 0.35, bossTimerBonus: 5 }, requires: 'sp2' }
        ]
    }
};

function openPerksModal(event) {
    if (event) event.stopPropagation();
    var modal = document.getElementById('perks-modal');
    if (modal) modal.classList.remove('hidden');
    renderSkillTree();
}

function closePerksModal() {
    var modal = document.getElementById('perks-modal');
    if (modal) modal.classList.add('hidden');
}

function renderSkillTree() {
    if (!state.skillTree) state.skillTree = {};
    var container = document.getElementById('skill-tree-container');
    if (!container) return;
    
    var bpDisplay = document.getElementById('bazinga-points-display');
    if (bpDisplay) bpDisplay.innerText = state.bazingaPoints || 0;
    
    var colorMap = {
        red: { bg: 'bg-red-950/60', border: 'border-red-700', text: 'text-red-400', activeBg: 'bg-red-900/80', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]' },
        purple: { bg: 'bg-purple-950/60', border: 'border-purple-700', text: 'text-purple-400', activeBg: 'bg-purple-900/80', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' },
        blue: { bg: 'bg-blue-950/60', border: 'border-blue-700', text: 'text-blue-400', activeBg: 'bg-blue-900/80', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' },
        green: { bg: 'bg-emerald-950/60', border: 'border-emerald-700', text: 'text-emerald-400', activeBg: 'bg-emerald-900/80', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' },
        cyan: { bg: 'bg-cyan-950/60', border: 'border-cyan-700', text: 'text-cyan-400', activeBg: 'bg-cyan-900/80', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]' },
        yellow: { bg: 'bg-yellow-950/60', border: 'border-yellow-700', text: 'text-yellow-400', activeBg: 'bg-yellow-900/80', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]' },
        amber: { bg: 'bg-amber-950/60', border: 'border-amber-700', text: 'text-amber-400', activeBg: 'bg-amber-900/80', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]' }
    };
    
    var h = '';
    for (var pathKey in skillTreePaths) {
        var path = skillTreePaths[pathKey];
        var c = colorMap[path.color] || colorMap.blue;
        h += '<div class="mb-3 ' + c.bg + ' border ' + c.border + ' rounded-lg p-3">';
        h += '<div class="flex items-center gap-2 mb-2">';
        h += '<span class="text-lg">' + path.emoji + '</span>';
        h += '<div><div class="font-black ' + c.text + ' text-[11px] uppercase tracking-wider">' + path.name + '</div>';
        h += '<div class="text-[7px] text-gray-500">' + path.desc + '</div></div></div>';
        
        h += '<div class="flex gap-1">';
        for (var ni = 0; ni < path.nodes.length; ni++) {
            var node = path.nodes[ni];
            var isUnlocked = state.skillTree[node.id] || false;
            var canUnlock = !isUnlocked && (state.bazingaPoints || 0) >= node.cost && (!node.requires || state.skillTree[node.requires]);
            
            var nodeClass = '';
            var btnHtml = '';
            
            if (isUnlocked) {
                nodeClass = c.activeBg + ' border-2 ' + c.border + ' ' + c.glow;
                btnHtml = '<div class="text-[7px] ' + c.text + ' font-bold mt-1">✅ UNLOCKED</div>';
            } else if (canUnlock) {
                nodeClass = 'bg-slate-900/80 border-2 border-yellow-500 hover:border-yellow-400 cursor-pointer';
                btnHtml = '<button onclick="unlockSkillNode(\\'' + node.id + '\\', ' + node.cost + ')" class="mt-1 bg-yellow-600 hover:bg-yellow-500 text-white text-[7px] font-bold px-2 py-0.5 rounded cursor-pointer border border-yellow-800">' + node.cost + ' BP</button>';
            } else {
                nodeClass = 'bg-slate-950/60 border-2 border-slate-800 opacity-40';
                btnHtml = '<div class="text-[7px] text-gray-600 font-bold mt-1">🔒 ' + node.cost + ' BP</div>';
            }
            
            h += '<div class="flex-1 ' + nodeClass + ' rounded-lg p-2 text-center transition-all">';
            h += '<div class="font-bold text-white text-[9px]">' + node.name + '</div>';
            h += '<div class="text-[7px] text-gray-400 mt-0.5 leading-tight">' + node.desc + '</div>';
            h += btnHtml;
            h += '</div>';
            
            if (ni < path.nodes.length - 1) {
                h += '<div class="flex items-center text-gray-600 text-[10px]">→</div>';
            }
        }
        h += '</div></div>';
    }
    
    container.innerHTML = h;
}

function unlockSkillNode(nodeId, cost) {
    if ((state.bazingaPoints || 0) < cost) return;
    if (!state.skillTree) state.skillTree = {};
    if (state.skillTree[nodeId]) return;
    
    state.bazingaPoints -= cost;
    state.skillTree[nodeId] = true;
    SoundManager.playFX('levelup');
    renderSkillTree();
    saveProgress();
}

function getSkillTreeEffects() {
    var effects = {
        lifestealPct: 0, antiHealPct: 0, dmgReduction: 0,
        foodHealBonus: 0, regenPct: 0, bernieBoost: 0,
        reflectPct: 0, critChance: 0, critMulti: 1.0,
        atkSpeedBonus: 0, bossTimerBonus: 0
    };
    if (!state.skillTree) return effects;
    
    for (var pk in skillTreePaths) {
        var p = skillTreePaths[pk];
        for (var i = 0; i < p.nodes.length; i++) {
            var nd = p.nodes[i];
            if (state.skillTree[nd.id]) {
                for (var eff in nd.effect) {
                    effects[eff] = Math.max(effects[eff], nd.effect[eff]);
                }
            }
        }
    }
    return effects;
}
`;

// Remove FIRST set of perk functions (dead code)
var firstPerks = /\/\/ PERKS SYSTEM[\s\S]*?function buyPerk\(perkKey\) \{[\s\S]*?\n\}\r?\n/;
// But we need to be more targeted. Let's find the first set around line 3319
var firstMatch = code.indexOf('function openPerksModal(event) {\r\n    if (event) event.stopPropagation();\r\n    const modal = document.getElementById(\'perks-modal\');\r\n    if (modal) modal.classList.remove(\'hidden\');\r\n    syncPerksUI();\r\n}');

if (firstMatch > -1) {
    // Find the end of buyPerk that follows
    var buyPerkEnd = code.indexOf('\n}\r\n\nfunction calculateSynergies', firstMatch);
    if (buyPerkEnd === -1) {
        buyPerkEnd = code.indexOf('\n}\nfunction calculateSynergies', firstMatch);
    }
    if (buyPerkEnd === -1) {
        buyPerkEnd = code.indexOf('}\r\n\r\nfunction calculateSynergies', firstMatch);
    }
    
    if (buyPerkEnd > -1) {
        // Remove the first set entirely
        code = code.substring(0, firstMatch) + code.substring(buyPerkEnd + 3);
        console.log('✅ PART 2a: Removed first perk function set');
    } else {
        console.log('⚠️ Could not find end of first perk set');
    }
}

// Now find and replace the SECOND set (this is now the only one)
var secondPerks = code.indexOf('// PERKS SYSTEM\r\nfunction openPerksModal');
if (secondPerks === -1) {
    secondPerks = code.indexOf('function openPerksModal(event) {\r\n    if (event) event.stopPropagation();\r\n    const modal = document.getElementById(\'perks-modal\');\r\n    if (modal) modal.classList.remove(\'hidden\');\r\n    syncPerksUI();');
}

if (secondPerks > -1) {
    // Find the end - look for buyPerk closing brace then calculateSynergies
    var endSearch = code.indexOf('function calculateSynergies', secondPerks);
    if (endSearch > -1) {
        code = code.substring(0, secondPerks) + skillTreeCode + '\n' + code.substring(endSearch);
        console.log('✅ PART 2b: Replaced second perk set with skill tree');
    } else {
        console.log('⚠️ Could not find calculateSynergies after second perk set');
    }
} else {
    console.log('⚠️ Could not find second perk set, appending skill tree before calculateSynergies');
    var calcSyn = code.indexOf('function calculateSynergies');
    if (calcSyn > -1) {
        code = code.substring(0, calcSyn) + skillTreeCode + '\n' + code.substring(calcSyn);
        console.log('✅ PART 2b: Inserted skill tree before calculateSynergies');
    }
}

fs.writeFileSync('app_v2.js', code);

// Verify
var depth = 0;
for (var ch of code) { if (ch === '{') depth++; if (ch === '}') depth--; }
console.log('Brace depth:', depth, depth === 0 ? '✅' : '❌');

// Check key functions exist
var checks = ['skillTreePaths', 'unlockSkillNode', 'getSkillTreeEffects', 'renderSkillTree', 'openPerksModal', 'calculateSynergies'];
for (var c of checks) {
    console.log(code.includes(c) ? '  ✅ ' + c : '  ❌ MISSING: ' + c);
}
