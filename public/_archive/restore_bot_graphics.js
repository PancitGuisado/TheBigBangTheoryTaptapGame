const fs = require('fs');

try {
    let content = fs.readFileSync('vectors.js', 'utf8');
    
    content = content.replace('const vectors =', 'exports.vectors =');
    const bgIndex = content.indexOf('const backgrounds =');
    let backgroundsStr = '';
    if (bgIndex !== -1) {
        backgroundsStr = content.substring(bgIndex);
        content = content.substring(0, bgIndex);
    }
    
    fs.writeFileSync('temp_vectors3.js', content);
    const { vectors: v } = require('./temp_vectors3.js');
    
    v['r2d2_unit'] = `<svg viewBox="0 0 60 90" class="w-full h-full">
        <!-- Shelbot MVPD -->
        <ellipse cx="30" cy="85" rx="18" ry="4" fill="rgba(0,0,0,0.3)"/>
        <!-- Base/Wheels -->
        <rect x="22" y="80" width="16" height="6" fill="#1e293b" rx="2"/>
        <circle cx="24" cy="84" r="3" fill="#64748b"/>
        <circle cx="36" cy="84" r="3" fill="#64748b"/>
        <!-- Stick -->
        <rect x="28" y="30" width="4" height="50" fill="#94a3b8"/>
        <!-- Monitor -->
        <rect x="18" y="15" width="24" height="18" fill="#0f172a" rx="1" stroke="#334155" stroke-width="2"/>
        <rect x="20" y="17" width="20" height="14" fill="#0ea5e9"/>
        <!-- Sheldon's face on monitor -->
        <circle cx="30" cy="24" r="4" fill="#fed7aa"/>
        <rect x="28" y="22" width="1" height="1" fill="#000"/>
        <rect x="31" y="22" width="1" height="1" fill="#000"/>
        <path d="M 28 26 Q 30 28 32 26" fill="none" stroke="#000" stroke-width="0.5"/>
        <rect x="27" y="20" width="6" height="2" fill="#451a03"/>
    </svg>`;

    v['battle_droid'] = `<svg viewBox="0 0 60 90" class="w-full h-full">
        <!-- M.O.N.T.E. -->
        <ellipse cx="30" cy="85" rx="22" ry="4" fill="rgba(0,0,0,0.3)"/>
        <!-- Tank Treads -->
        <rect x="15" y="70" width="30" height="15" fill="#334155" rx="5"/>
        <circle cx="20" cy="77.5" r="4" fill="#1e293b"/>
        <circle cx="30" cy="77.5" r="4" fill="#1e293b"/>
        <circle cx="40" cy="77.5" r="4" fill="#1e293b"/>
        <!-- Body -->
        <rect x="20" y="45" width="20" height="25" fill="#ca8a04" rx="2"/>
        <rect x="25" y="50" width="10" height="15" fill="#fef08a"/>
        <!-- Saw Arm -->
        <rect x="40" y="55" width="15" height="4" fill="#64748b"/>
        <circle cx="55" cy="57" r="10" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" stroke-dasharray="2 2" class="animate-[spin_1s_linear_infinite]"/>
        <circle cx="55" cy="57" r="2" fill="#ef4444"/>
    </svg>`;

    v['droideka'] = `<svg viewBox="0 0 60 90" class="w-full h-full">
        <!-- Kripke Krippler -->
        <ellipse cx="30" cy="85" rx="20" ry="4" fill="rgba(0,0,0,0.3)"/>
        <rect x="18" y="75" width="24" height="10" fill="#1e293b" rx="2"/>
        <circle cx="22" cy="80" r="4" fill="#94a3b8"/>
        <circle cx="38" cy="80" r="4" fill="#94a3b8"/>
        <!-- Central Drum -->
        <circle cx="30" cy="55" r="16" fill="#ef4444" stroke="#7f1d1d" stroke-width="3"/>
        <circle cx="30" cy="55" r="8" fill="#1e293b"/>
        <!-- Spinning Blade -->
        <path d="M 30 20 L 32 45 L 28 45 Z" fill="#cbd5e1" class="origin-[30px_55px] animate-[spin_0.2s_linear_infinite]"/>
        <path d="M 30 90 L 28 65 L 32 65 Z" fill="#cbd5e1" class="origin-[30px_55px] animate-[spin_0.2s_linear_infinite]"/>
        <path d="M 65 55 L 40 53 L 40 57 Z" fill="#cbd5e1" class="origin-[30px_55px] animate-[spin_0.2s_linear_infinite]"/>
        <path d="M -5 55 L 20 57 L 20 53 Z" fill="#cbd5e1" class="origin-[30px_55px] animate-[spin_0.2s_linear_infinite]"/>
    </svg>`;

    v['omac_unit'] = `<svg viewBox="0 0 60 90" class="w-full h-full">
        <!-- Wolowitz Robotic Arm -->
        <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.3)"/>
        <!-- Mount -->
        <rect x="22" y="70" width="16" height="15" fill="#475569" rx="2"/>
        <rect x="26" y="60" width="8" height="10" fill="#94a3b8"/>
        <!-- Multi-joint arm -->
        <path d="M 30 65 L 45 45 L 25 30 L 30 15" fill="none" stroke="#eab308" stroke-width="6" stroke-linejoin="round"/>
        <!-- Joints -->
        <circle cx="45" cy="45" r="4" fill="#1e293b"/>
        <circle cx="25" cy="30" r="4" fill="#1e293b"/>
        <!-- Hand/Claw -->
        <path d="M 30 15 L 25 5 M 30 15 L 35 5" fill="none" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
        <circle cx="30" cy="15" r="3" fill="#ef4444"/>
    </svg>`;

    v['cyborg_support'] = `<svg viewBox="0 0 60 90" class="w-full h-full">
        <!-- Mars Rover -->
        <ellipse cx="30" cy="85" rx="22" ry="4" fill="rgba(0,0,0,0.3)"/>
        <!-- Rover Body -->
        <rect x="15" y="60" width="30" height="15" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="20" y="65" width="20" height="5" fill="#eab308"/>
        <!-- Wheels (6 wheels) -->
        <circle cx="15" cy="80" r="5" fill="#1e293b"/>
        <circle cx="30" cy="80" r="5" fill="#1e293b"/>
        <circle cx="45" cy="80" r="5" fill="#1e293b"/>
        <!-- Camera Mast -->
        <rect x="28" y="35" width="4" height="25" fill="#cbd5e1"/>
        <rect x="24" y="25" width="12" height="10" fill="#f8fafc" rx="1"/>
        <circle cx="27" cy="30" r="2" fill="#3b82f6"/>
        <circle cx="33" cy="30" r="2" fill="#ef4444"/>
        <!-- Antenna -->
        <line x1="40" y1="60" x2="50" y2="40" stroke="#94a3b8" stroke-width="2"/>
        <circle cx="50" cy="40" r="2" fill="#22c55e" class="animate-pulse"/>
    </svg>`;

    v['apokolips_destroyer'] = `<svg viewBox="0 0 60 90" class="w-full h-full animate-[character-bob_1s_ease-in-out_infinite_alternate]">
        <!-- Wallowitz Hoverbot -->
        <ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.3)"/>
        <!-- Quadcopter body -->
        <ellipse cx="30" cy="40" rx="18" ry="8" fill="#1e293b"/>
        <ellipse cx="30" cy="38" rx="16" ry="6" fill="#334155"/>
        <!-- Camera Lens -->
        <circle cx="30" cy="45" r="5" fill="#0f172a"/>
        <circle cx="30" cy="45" r="2" fill="#ef4444" class="animate-pulse"/>
        <!-- Rotors -->
        <line x1="12" y1="40" x2="12" y2="30" stroke="#64748b" stroke-width="2"/>
        <line x1="48" y1="40" x2="48" y2="30" stroke="#64748b" stroke-width="2"/>
        <ellipse cx="12" cy="30" rx="10" ry="2" fill="#cbd5e1" class="origin-[12px_30px] animate-[spin_0.1s_linear_infinite]"/>
        <ellipse cx="48" cy="30" rx="10" ry="2" fill="#cbd5e1" class="origin-[48px_30px] animate-[spin_0.1s_linear_infinite]"/>
        <!-- Blaster -->
        <rect x="28" y="48" width="4" height="8" fill="#94a3b8"/>
    </svg>`;

    v['atom_boxer'] = `<svg viewBox="0 0 60 90" class="w-full h-full">
        <!-- Time Machine Replica -->
        <ellipse cx="30" cy="85" rx="25" ry="4" fill="rgba(0,0,0,0.3)"/>
        <!-- Sled Base -->
        <rect x="10" y="75" width="40" height="6" fill="#78350f" rx="1"/>
        <path d="M 10 75 Q 5 65 15 65" fill="none" stroke="#78350f" stroke-width="3"/>
        <path d="M 50 75 Q 55 65 45 65" fill="none" stroke="#78350f" stroke-width="3"/>
        <!-- Chair -->
        <rect x="20" y="55" width="12" height="20" fill="#b45309"/>
        <rect x="20" y="40" width="12" height="15" fill="#92400e"/>
        <!-- Giant Dish -->
        <circle cx="40" cy="45" r="18" fill="none" stroke="#fcd34d" stroke-width="4"/>
        <circle cx="40" cy="45" r="14" fill="none" stroke="#fbbf24" stroke-width="2"/>
        <circle cx="40" cy="45" r="10" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="40" cy="45" r="2" fill="#ef4444"/>
        <path d="M 40 45 L 25 60" stroke="#fcd34d" stroke-width="3"/>
    </svg>`;

    v['zeus_titan'] = `<svg viewBox="0 0 60 90" class="w-full h-full">
        <!-- Giant Jenga Bot -->
        <ellipse cx="30" cy="85" rx="20" ry="4" fill="rgba(0,0,0,0.3)"/>
        <!-- Stack of Jenga Blocks -->
        <g stroke="#b45309" stroke-width="1">
            <rect x="18" y="75" width="24" height="8" fill="#fcd34d"/>
            <rect x="22" y="67" width="16" height="8" fill="#fde047"/>
            <rect x="16" y="59" width="28" height="8" fill="#fef08a"/>
            <rect x="24" y="51" width="12" height="8" fill="#fcd34d"/>
            <rect x="14" y="43" width="32" height="8" fill="#fde047"/>
            <rect x="20" y="35" width="20" height="8" fill="#fef08a"/>
            <rect x="26" y="27" width="8" height="8" fill="#fcd34d"/>
        </g>
        <!-- Angry face drawn on top block -->
        <path d="M 27 30 L 29 32" stroke="#000" stroke-width="1"/>
        <path d="M 33 30 L 31 32" stroke="#000" stroke-width="1"/>
        <rect x="29" y="33" width="2" height="1" fill="#000"/>
        <!-- Floating Block Fist -->
        <rect x="48" y="40" width="12" height="8" fill="#fcd34d" stroke="#b45309" stroke-width="1"/>
    </svg>`;

    v['midas_speedster'] = `<svg viewBox="0 0 60 90" class="w-full h-full">
        <!-- Toy Train Engine -->
        <ellipse cx="30" cy="85" rx="24" ry="4" fill="rgba(0,0,0,0.3)"/>
        <!-- Tracks -->
        <line x1="5" y1="82" x2="55" y2="82" stroke="#64748b" stroke-width="2"/>
        <line x1="10" y1="80" x2="10" y2="84" stroke="#475569" stroke-width="2"/>
        <line x1="25" y1="80" x2="25" y2="84" stroke="#475569" stroke-width="2"/>
        <line x1="40" y1="80" x2="40" y2="84" stroke="#475569" stroke-width="2"/>
        <line x1="55" y1="80" x2="55" y2="84" stroke="#475569" stroke-width="2"/>
        <!-- Train Body -->
        <rect x="15" y="50" width="35" height="20" fill="#1d4ed8" rx="2"/>
        <rect x="10" y="70" width="45" height="5" fill="#ef4444"/>
        <!-- Boiler -->
        <rect x="35" y="40" width="15" height="10" fill="#1d4ed8" rx="5"/>
        <rect x="40" y="30" width="5" height="10" fill="#000"/>
        <circle cx="42.5" cy="25" r="3" fill="#94a3b8" class="animate-pulse"/>
        <!-- Cabin -->
        <rect x="15" y="30" width="15" height="20" fill="#1e3a8a"/>
        <rect x="18" y="35" width="8" height="8" fill="#60a5fa"/>
        <!-- Wheels -->
        <circle cx="20" cy="75" r="6" fill="#000" stroke="#ef4444" stroke-width="2"/>
        <circle cx="35" cy="75" r="6" fill="#000" stroke="#ef4444" stroke-width="2"/>
        <circle cx="50" cy="75" r="4" fill="#000" stroke="#ef4444" stroke-width="2"/>
    </svg>`;

    let output = `const vectors = ${JSON.stringify(v, null, 4)};\n\n`;
    output += backgroundsStr;
    
    fs.writeFileSync('vectors.js', output);
    fs.unlinkSync('temp_vectors3.js');
    console.log('Successfully added bot SVGs back to vectors.js');
} catch (err) {
    console.error('Error adding bot SVGs:', err);
}
