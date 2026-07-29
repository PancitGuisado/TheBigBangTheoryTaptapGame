const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(
    '<script src="missing_ui.js?v=1781521065732"></script>\r\n    <script src="app_v2.js?bust=1781521065732&v=1781521065732"></script>',
    '<script src="state.js?bust=1781508899092&v=1781521065731"></script>\r\n    <script src="app_v2.js?bust=1781521065732&v=1781521065732"></script>'
);
content = content.replace(
    '<script src="missing_ui.js?v=1781521065730"></script>',
    '<script src="missing_ui.js?v=1781521065732"></script>'
);
content = content.replace(
    '<script src="missing_ui.js?v=1781521065731"></script>',
    '<script src="missing_ui.js?v=1781521065732"></script>'
);

fs.writeFileSync('index.html', content);
console.log('Fixed index.html script tags');
