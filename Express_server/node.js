const http = require('http');
const server = http.createServer((req,res) => {
    console.log('is from http 1st');
    res.end(`
        <div>
            <h1>Comes In http</h1>
            Going node -> v8 -> http request -> server -> console -> client
        </div>
    `);
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log('server is runsssss: ', PORT);
});