const fs = require('fs');

try {
    let vectorsContent = fs.readFileSync('vectors.js', 'utf8');
    
    // Remove the backgrounds string
    const bgIndex = vectorsContent.indexOf('const backgrounds = {');
    if (bgIndex !== -1) {
        vectorsContent = vectorsContent.substring(0, bgIndex);
    }
    
    // Ensure vectors is properly closed
    vectorsContent = vectorsContent.trim();
    if (!vectorsContent.endsWith('};')) {
        if (vectorsContent.endsWith('}')) {
            vectorsContent += ';';
        } else {
            vectorsContent += '\n};';
        }
    }

    const enhancedBackgrounds = `
const backgrounds = {
    sheldons_apt: \`
        <!-- Sheldon's Apartment (Lore Accurate - Enhanced) -->
        <div class="absolute inset-0 bg-gradient-to-br from-amber-900/60 to-orange-950/80"></div>
        
        <!-- The Famous Apartment 4A Door (Left Side) -->
        <div class="absolute top-[10%] left-[5%] w-[15%] h-[65%] bg-[#8b5a2b] border-[4px] border-[#5c3a21] shadow-2xl flex flex-col items-center pt-8">
            <div class="text-yellow-500 font-bold text-lg drop-shadow-md">4A</div>
            <div class="w-3 h-3 rounded-full bg-yellow-600 mt-2 border border-yellow-700 shadow-inner"></div> <!-- Peephole -->
            <!-- Door panels -->
            <div class="w-[70%] h-[30%] border-2 border-[#6b4226] mt-4 shadow-inner"></div>
            <div class="w-[70%] h-[30%] border-2 border-[#6b4226] mt-2 shadow-inner"></div>
            <!-- Doorknob -->
            <div class="absolute top-1/2 right-2 w-4 h-4 bg-yellow-600 rounded-full shadow-lg"></div>
        </div>

        <!-- The Window Layer -->
        <div class="absolute top-[10%] left-[25%] w-[22%] h-[55%] border-[6px] border-[#4a2e1b] bg-slate-950 flex relative overflow-hidden shadow-inner pointer-events-none">
            <div class="absolute bottom-0 inset-x-0 h-32 border-t-[6px] border-gray-700 flex justify-around items-end opacity-80">
                <div class="w-2 h-full bg-gray-700"></div><div class="w-2 h-full bg-gray-700"></div><div class="w-2 h-full bg-gray-700"></div>
            </div>
            <!-- Street lights / city glow -->
            <div class="absolute bottom-12 left-8 w-6 h-16 bg-yellow-400/30 blur-[2px]"></div>
            <div class="absolute bottom-8 left-24 w-8 h-24 bg-yellow-500/20 blur-[2px]"></div>
            <div class="absolute bottom-20 right-12 w-10 h-14 bg-amber-400/20 blur-[2px]"></div>
            <div class="absolute inset-y-0 left-0 w-8 bg-blue-900 border-r-4 border-blue-950 shadow-md"></div>
            <div class="absolute inset-y-0 right-0 w-8 bg-blue-900 border-l-4 border-blue-950 shadow-md"></div>
        </div>

        <!-- The Geek Collections Bookshelf (Center/Right) -->
        <div class="absolute top-[12%] left-[50%] w-[18%] h-[53%] bg-[#3e2723] border-4 border-[#261410] shadow-2xl flex flex-col justify-around p-2">
            <!-- Shelf 1 (Action Figures) -->
            <div class="w-full h-8 border-b-4 border-[#261410] flex justify-around items-end pb-1">
                <div class="w-4 h-6 bg-red-600 border border-red-800 rounded-sm"></div>
                <div class="w-4 h-6 bg-blue-600 border border-blue-800 rounded-sm"></div>
                <div class="w-5 h-5 bg-green-500 border border-green-700 rounded-full"></div>
            </div>
            <!-- Shelf 2 (Comic Boxes) -->
            <div class="w-full h-8 border-b-4 border-[#261410] flex justify-between items-end pb-1 px-1">
                <div class="w-8 h-7 bg-white border border-gray-400 rounded-sm flex items-center justify-center"><div class="w-4 h-2 bg-red-500"></div></div>
                <div class="w-8 h-7 bg-white border border-gray-400 rounded-sm flex items-center justify-center"><div class="w-4 h-2 bg-blue-500"></div></div>
            </div>
            <!-- Shelf 3 (Sci-Fi Props) -->
            <div class="w-full h-8 border-b-4 border-[#261410] flex justify-center items-end pb-1">
                <div class="w-12 h-4 bg-gray-400 rounded-full border border-gray-600 shadow-md"></div> <!-- DNA Model / Ship -->
            </div>
            <!-- Shelf 4 (Books) -->
            <div class="w-full h-8 border-b-4 border-[#261410] flex justify-start items-end pb-1 gap-1 px-1">
                <div class="w-2 h-6 bg-yellow-600"></div><div class="w-2 h-7 bg-blue-800"></div><div class="w-2 h-6 bg-red-700"></div><div class="w-2 h-5 bg-green-700"></div>
            </div>
        </div>

        <!-- The String Theory Whiteboard (Far Right) -->
        <div class="absolute top-[15%] left-[72%] w-[24%] h-[40%] bg-white border-[6px] border-gray-400 shadow-2xl p-4 flex flex-col justify-between text-black text-[9px] xl:text-[12px] tracking-tight leading-tight rounded-sm pointer-events-none rotate-2">
            <div>
                <div class="font-bold border-b-2 border-gray-300 pb-1 mb-1 text-center text-red-600 uppercase tracking-wider">STRING THEORY</div>
                E = <span class="text-blue-700">&int;</span>&mu;² &pi;²<sub>imc</sub>et²<br>
                N = 4 <span class="font-mono font-bold">&pi;&radic;(a/r)</span><br>
                V = e<sup>-t</sup> / &lambda;²<sub>1</sub>
            </div>
        </div>

        <!-- The Iconic Couches -->
        <div class="absolute bottom-0 inset-x-0 h-[30%] bg-[#5c3a21] border-t-[8px] border-[#3e2723] rounded-t-xl flex justify-center items-start pt-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            <!-- Center Leather Couch -->
            <div class="w-[60%] h-full bg-[#8b5a2b] border-t-8 border-l-8 border-r-8 border-[#5c3a21] rounded-t-2xl shadow-inner relative flex">
                <!-- Cushions -->
                <div class="flex-1 border-r-4 border-[#5c3a21] bg-[#7a4e25] rounded-tl-xl shadow-inner relative">
                    <!-- Sheldon's Spot (Left Cushion) -->
                    <div class="absolute inset-0 bg-[#69421f] rounded-tl-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]"></div>
                    <div class="absolute top-2 left-1/2 -translate-x-1/2 text-yellow-500 text-[10px] font-black tracking-widest drop-shadow-md bg-black/40 px-2 py-0.5 rounded">MY SPOT</div>
                </div>
                <div class="flex-1 border-r-4 border-[#5c3a21] bg-[#7a4e25] shadow-inner"></div>
                <div class="flex-1 bg-[#7a4e25] rounded-tr-xl shadow-inner"></div>
            </div>
            
            <!-- Side Chair (Right) -->
            <div class="absolute bottom-0 right-[5%] w-[20%] h-[80%] bg-[#8b5a2b] border-t-8 border-x-4 border-[#5c3a21] rounded-t-xl shadow-inner"></div>
            
            <!-- Side Chair (Left) -->
            <div class="absolute bottom-0 left-[5%] w-[15%] h-[70%] bg-[#8b5a2b] border-t-8 border-x-4 border-[#5c3a21] rounded-t-xl shadow-inner rotate-[-10deg]"></div>
        </div>
    \`,
    comic_store: \`
        <!-- Stuart's Comic Center -->
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-950 to-purple-950 opacity-80"></div>
        <!-- Comic Bookshelves -->
        <div class="absolute top-[10%] left-[10%] right-[10%] bottom-[30%] flex gap-2">
            <div class="flex-1 bg-gray-900 border-4 border-gray-700 p-2 flex flex-col gap-2">
                <div class="h-8 bg-red-600/80 rounded shadow"></div>
                <div class="h-8 bg-blue-600/80 rounded shadow"></div>
                <div class="h-8 bg-yellow-400/80 rounded shadow"></div>
                <div class="h-8 bg-green-500/80 rounded shadow"></div>
            </div>
            <div class="flex-1 bg-gray-900 border-4 border-gray-700 p-2 flex flex-col gap-2">
                <div class="h-8 bg-purple-600/80 rounded shadow"></div>
                <div class="h-8 bg-orange-500/80 rounded shadow"></div>
                <div class="h-8 bg-pink-500/80 rounded shadow"></div>
                <div class="h-8 bg-cyan-400/80 rounded shadow"></div>
            </div>
        </div>
        <!-- Neon Sign -->
        <div class="absolute top-[2%] left-1/2 -translate-x-1/2 text-2xl font-black text-pink-500 tracking-widest drop-shadow-[0_0_10px_#ec4899] border-2 border-pink-500 px-4 py-1 rounded">COMIC CENTER</div>
        <!-- Counter -->
        <div class="absolute bottom-0 inset-x-0 h-[25%] bg-slate-800 border-t-[8px] border-slate-900 flex items-center justify-center">
            <div class="w-32 h-16 bg-slate-700 rounded border-2 border-slate-600 flex items-center justify-center text-slate-500 text-xs font-bold">CASH REGISTER</div>
        </div>
    \`,
    chocolate_factory: \`
        <!-- Chocolate Factory -->
        <div class="absolute inset-0 bg-gradient-to-br from-[#451a03] to-[#290f01] opacity-90"></div>
        <!-- Giant Vat -->
        <div class="absolute top-[30%] left-1/2 -translate-x-1/2 w-64 h-48 bg-[#78350f] rounded-full border-8 border-[#b45309] shadow-2xl flex items-center justify-center overflow-hidden">
            <div class="w-full h-[80%] mt-[20%] bg-[#451a03] rounded-full animate-pulse shadow-inner flex items-center justify-center">
                <div class="text-amber-600 font-black tracking-widest text-xl drop-shadow">MELTED CHOCOLATE</div>
            </div>
        </div>
        <!-- Pipes -->
        <div class="absolute top-0 left-[20%] w-8 h-[30%] bg-zinc-600 border-x-4 border-zinc-800"></div>
        <div class="absolute top-0 right-[20%] w-8 h-[30%] bg-zinc-600 border-x-4 border-zinc-800"></div>
        <div class="absolute bottom-0 inset-x-0 h-[15%] bg-zinc-800 border-t-[8px] border-zinc-950"></div>
    \`,
    caltech: \`
        <!-- Caltech Physics Lab -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-950 to-cyan-950 opacity-80"></div>
        <!-- Chalkboard -->
        <div class="absolute top-[10%] left-[10%] right-[10%] h-[40%] bg-[#064e3b] border-[10px] border-[#78350f] rounded shadow-2xl p-4">
            <div class="text-white/70 text-sm font-mono tracking-widest leading-loose">
                &#8710; &times; E = - &part;B / &part;t<br>
                &#8710; &middot; D = &rho;<br>
                &#8710; &times; H = J + &part;D / &part;t<br>
                &#8710; &middot; B = 0
            </div>
            <div class="absolute bottom-2 right-4 text-white/50 text-xs italic">Maxwell's Equations</div>
        </div>
        <!-- Lab Bench -->
        <div class="absolute bottom-0 inset-x-0 h-[30%] bg-slate-800 border-t-[8px] border-slate-900 shadow-2xl flex justify-center items-end pb-4 gap-8">
            <div class="w-16 h-24 bg-gray-300 rounded-t border-4 border-gray-400 flex flex-col justify-between p-2">
                <div class="w-full h-8 bg-black rounded"></div>
                <div class="flex justify-around"><div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div><div class="w-2 h-2 rounded-full bg-green-500"></div></div>
            </div>
            <div class="w-24 h-16 bg-gray-400 rounded border-4 border-gray-500 flex items-center justify-center">
                <div class="w-[80%] h-[60%] bg-cyan-900 border-2 border-cyan-700 flex items-center justify-center">
                    <div class="w-full h-1 bg-cyan-400 animate-pulse"></div>
                </div>
            </div>
        </div>
    \`,
    default: \`
        <!-- Default Location -->
        <div class="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-950 opacity-90"></div>
        <div class="absolute top-1/2 left-0 right-0 h-1 bg-stone-700 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
        <div class="absolute bottom-0 inset-x-0 h-[20%] bg-stone-900 border-t-[8px] border-stone-800"></div>
    \`
};
`;

    fs.writeFileSync('vectors.js', vectorsContent + '\n\n' + enhancedBackgrounds);
    console.log("Successfully enhanced Sheldon's apartment background in vectors.js");
} catch (err) {
    console.error('Error enhancing background:', err);
}
