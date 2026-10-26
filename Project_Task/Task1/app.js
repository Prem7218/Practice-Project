
const http = require('http');
const { requestHandler } = require('../routes/Task1_Route/routes.js');

const server = http.createServer(requestHandler);

const port = 4000;
server.listen(port, () => {
    console.log('server on port: ', port);
});