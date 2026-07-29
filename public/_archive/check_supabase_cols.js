const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// We need the supabase URL and anon key from app_v2.js or index.html
const html = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');
const supaUrlMatch = html.match(/const SUPABASE_URL = '([^']+)';/);
const supaKeyMatch = html.match(/const SUPABASE_ANON_KEY = '([^']+)';/);

if (supaUrlMatch && supaKeyMatch) {
    const supabase = createClient(supaUrlMatch[1], supaKeyMatch[1]);
    
    async function checkCols() {
        const { data, error } = await supabase.from('leaderboard').select('*').limit(1);
        if (error) console.error("Error:", error);
        if (data && data.length > 0) {
            console.log("Columns:", Object.keys(data[0]));
        } else {
            console.log("No data found, but no error.");
        }
    }
    checkCols();
} else {
    console.log("Could not find supabase credentials");
}
