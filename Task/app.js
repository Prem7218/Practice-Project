const http = require('http');
const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if(req.url == '/') {
        res.setHeader('Content-Type', 'text/html');

        res.end(`
            <form action="/message" method="POST">
                <label for="name">Name: </label>
                <input id="name" type="text" name="username" />
                <button type="submit">Add</button>
            </form>
        `);
    }
    else if(req.url == "/message") {
        res.setHeader('Content-type', 'text/html');

        let dataChunks = [];

        req.on('data', (chunks) => {
            console.log(chunks);
            dataChunks.push(chunks);
        });

        req.on('end', () => {
            let combinedBuffer = Buffer.concat(dataChunks);
            console.log(combinedBuffer.toString());
            let value = combinedBuffer.toString().split("=");
            console.log(value);
        });
    }
});

server.listen(3000, () => {
    console.log('server is running on port: ', 3000);
});