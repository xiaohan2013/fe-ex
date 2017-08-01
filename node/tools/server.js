var http = require('http');

// debugger





const server = http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('Ok')
}).listen(3000)




