const fs = require('fs');
let code = fs.readFileSync('app_v2.js', 'utf8');

// Update the hangout positions - raise sitting chars higher, adjust behind chars too
code = code.replace(
    /sheldon: \{ bottom: '14%', left: '22%', role: 'sitting' \}/,
    "sheldon: { bottom: '24%', left: '22%', role: 'sitting' }"
);
code = code.replace(
    /leonard: \{ bottom: '14%', left: '38%', role: 'sitting' \}/,
    "leonard: { bottom: '24%', left: '38%', role: 'sitting' }"
);
code = code.replace(
    /penny:   \{ bottom: '14%', left: '52%', role: 'sitting' \}/,
    "penny:   { bottom: '24%', left: '52%', role: 'sitting' }"
);
code = code.replace(
    /howard:  \{ bottom: '14%', left: '76%', role: 'sitting' \}/,
    "howard:  { bottom: '24%', left: '76%', role: 'sitting' }"
);
// Raise behind-couch peekers too
code = code.replace(
    /raj:     \{ bottom: '22%', left: '8%',  role: 'behind' \}/,
    "raj:     { bottom: '32%', left: '8%',  role: 'behind' }"
);
code = code.replace(
    /amy:     \{ bottom: '22%', left: '68%', role: 'behind' \}/,
    "amy:     { bottom: '32%', left: '68%', role: 'behind' }"
);
code = code.replace(
    /bernie:  \{ bottom: '22%', left: '48%', role: 'behind' \}/,
    "bernie:  { bottom: '32%', left: '48%', role: 'behind' }"
);
code = code.replace(
    /stuart:  \{ bottom: '22%', left: '28%', role: 'behind' \}/,
    "stuart:  { bottom: '32%', left: '28%', role: 'behind' }"
);

fs.writeFileSync('app_v2.js', code);
console.log('✅ Raised all hangout character positions by 10%');
