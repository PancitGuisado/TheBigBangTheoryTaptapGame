const fs = require('fs');
let txt = fs.readFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', 'utf8');

const scripts = `
    <!-- Linked Modular Game Script Engines -->
    <script src="game_modal.js"></script>
    <script src="supabase.js?bust=1781508899092&v=1781521065730"></script>
    <script src="vectors.js?bust=1781508899092&v=1781521065730"></script>
    <script src="config.js?bust=1781508899092&v=1781521065730"></script>
    <script src="state.js?bust=1781508899092&v=1781521065730"></script>
    <script src="app_v2.js?bust=1781508899092&v=1781521065730"></script>
    <script src="pvp.js?bust=1781508899092&v=1781521065730"></script>
    <script src="achievements.js"></script>
    <script src="quests.js"></script>
    <script src="equipment.js"></script>
    <script src="events.js"></script>
    <script src="daily_rewards.js"></script>
    <script src="minigames.js"></script>
    <script src="notifications.js"></script>
    <script src="guilds.js"></script>
    <script>if(typeof ensureSkinData === "function") ensureSkinData();</script>
</body>`;

txt = txt.replace(/<\/body>/g, scripts);
fs.writeFileSync('c:/xampp/htdocs/tbbt-idle-game/public/index.html', txt, 'utf8');
console.log('Scripts restored!');
