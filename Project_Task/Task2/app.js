const http = require('http');
const server = http.createServer((req, res) => {

    if(req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 302;
        res.setHeader('Location', '/home');
        res.end();
    }
    else if (req.url === '/home') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.end('<h1>Welcome to Home Page!</h1>');
    }
    else {
        res.statusCode = 404;
        res.end('Page Not Found');
    }
});

let port = 5000;

server.listen(port, () => {
    console.log('Server is on: ', port);
})