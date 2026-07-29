const fs = require('fs');

let lines = fs.readFileSync('app_broken_backup.js', 'utf8').split('\n');

// We want to delete lines 602, 603, 604 (0-indexed: 601, 602, 603)
// Let's verify what they are first
console.log(lines[601]);
console.log(lines[602]);
console.log(lines[603]);

// Remove them
lines.splice(601, 3);

// In my previous replace_file_content run, did I save app_broken_backup.js? Yes!
// Wait! app_broken_backup.js was MODIFIED by replace_file_content!
// So it's already modified.
// Does backup_extract/app_broken_backup.js exist? No.
// Let's check BACKUP.zip to see if app.js in there is the right one!
