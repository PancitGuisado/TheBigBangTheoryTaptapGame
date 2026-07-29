const fs = require('fs');

try {
    let content = fs.readFileSync('vectors.js', 'utf8');
    
    // Snip everything after 'const backgrounds' because it's broken
    const bgIndex = content.indexOf('const backgrounds =');
    if (bgIndex !== -1) {
        content = content.substring(0, bgIndex);
    }
    
    content = content.replace('const vectors =', 'exports.vectors =');
    
    fs.writeFileSync('temp_vectors.js', content);
    
    const { vectors } = require('./temp_vectors.js');
    
    const flatVectors = {};
    for (const [key, val] of Object.entries(vectors)) {
        if (typeof val === 'string') {
            flatVectors[key] = val;
        } else if (val && val.idle) {
            flatVectors[key] = val.idle;
        } else {
            flatVectors[key] = val;
        }
    }
    
    let output = `const vectors = ${JSON.stringify(flatVectors, null, 4)};\n\n`;
    
    const backgrounds = {
        sheldons_apt: `
            <div class="absolute inset-0 bg-gradient-to-br from-amber-900 to-orange-950 opacity-50"></div>
            <div class="absolute top-[10%] left-[36%] w-[26%] h-[55%] border-[6px] border-[#4a2e1b] bg-slate-900 shadow-inner overflow-hidden">
                <div class="absolute bottom-0 inset-x-0 h-32 bg-gray-800 border-t-4 border-gray-700 opacity-60"></div>
                <div class="absolute inset-y-0 left-0 w-8 bg-blue-900 shadow-md"></div>
                <div class="absolute inset-y-0 right-0 w-8 bg-blue-900 shadow-md"></div>
            </div>
            <div class="absolute top-[12%] left-[4%] w-[28%] h-[38%] bg-white border-[6px] border-gray-400 p-4 shadow-xl">
                <div class="text-red-600 font-bold text-center border-b-2 border-gray-200 pb-2">STRING THEORY</div>
                <div class="mt-2 text-black text-[12px] font-mono">E = mc² <br> &int;f(x)dx <br> &Delta;v = a*t</div>
            </div>
            <div class="absolute bottom-0 inset-x-0 h-[20%] bg-amber-800 border-t-[8px] border-[#4a2e1b]"></div>
        `,
        comic_store: `
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-950 to-purple-950 opacity-60"></div>
            <div class="absolute top-[5%] inset-x-0 h-16 bg-gray-900 border-b-4 border-gray-700 flex items-center justify-around overflow-hidden shadow-2xl">
                <div class="w-12 h-20 bg-red-600 rotate-12"></div>
                <div class="w-12 h-20 bg-blue-600 -rotate-12"></div>
                <div class="w-12 h-20 bg-green-600 rotate-6"></div>
                <div class="w-12 h-20 bg-yellow-600 -rotate-6"></div>
            </div>
            <div class="absolute bottom-0 inset-x-0 h-[20%] bg-slate-800 border-t-[8px] border-slate-900"></div>
        `,
        chocolate_factory: `
            <div class="absolute inset-0 bg-gradient-to-br from-pink-900 to-amber-900 opacity-60"></div>
            <div class="absolute top-0 inset-x-0 h-[30%] bg-amber-800 border-b-8 border-yellow-600 shadow-2xl overflow-hidden flex justify-around items-start pt-4">
                <div class="w-8 h-full bg-orange-500 rounded-full blur-[2px]"></div>
                <div class="w-8 h-full bg-pink-500 rounded-full blur-[2px]"></div>
                <div class="w-8 h-full bg-yellow-500 rounded-full blur-[2px]"></div>
            </div>
            <div class="absolute top-[40%] left-[20%] right-[20%] h-32 bg-amber-950 border-[6px] border-amber-700 rounded-lg shadow-[0_0_30px_rgba(217,119,6,0.5)] flex items-center justify-center">
                <div class="text-3xl font-black text-amber-500 tracking-widest drop-shadow-md">CHOCOLATE VAT</div>
            </div>
            <div class="absolute bottom-0 inset-x-0 h-[20%] bg-amber-700 border-t-[8px] border-amber-900"></div>
        `,
        caltech: `
            <div class="absolute inset-0 bg-gradient-to-br from-blue-950 to-cyan-950 opacity-60"></div>
            <div class="absolute top-[20%] left-[20%] right-[20%] bottom-[30%] bg-slate-900 border-8 border-slate-700 rounded shadow-2xl flex flex-col items-center justify-center">
                <div class="w-[80%] h-[80%] border-4 border-cyan-800 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div class="w-[60%] h-[60%] border-4 border-blue-600 rounded-full flex items-center justify-center">
                        <div class="w-[40%] h-[40%] bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]"></div>
                    </div>
                </div>
            </div>
            <div class="absolute bottom-0 inset-x-0 h-[20%] bg-slate-800 border-t-[8px] border-slate-900"></div>
        `,
        default: `
            <div class="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-950 opacity-80"></div>
            <div class="absolute top-1/2 left-0 right-0 h-1 bg-stone-700 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
            <div class="absolute bottom-0 inset-x-0 h-[20%] bg-stone-900 border-t-[8px] border-stone-800"></div>
        `
    };
    
    output += `const backgrounds = ${JSON.stringify(backgrounds, null, 4)};\n`;
    
    fs.writeFileSync('vectors.js', output);
    fs.unlinkSync('temp_vectors.js');
    console.log('Successfully flattened vectors.js and restored backgrounds');
} catch (err) {
    console.error('Error flattening vectors.js:', err);
}
