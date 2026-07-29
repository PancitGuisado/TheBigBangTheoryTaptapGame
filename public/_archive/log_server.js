const http = require('http');
http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        console.log('BROWSER LOG:', body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end('OK');
    });
}).listen(9999, () => console.log('Listening on 9999'));
