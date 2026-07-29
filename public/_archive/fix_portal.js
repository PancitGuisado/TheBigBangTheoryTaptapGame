const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace('.cutscene-portal-open {\n    width: 250px;\n    height: 400px;\n    opacity: 1;', '.cutscene-portal-open {\n    width: 300px !important;\n    height: 400px !important;\n    opacity: 1 !important;');

fs.writeFileSync('styles.css', css);
