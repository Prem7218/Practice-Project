const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

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
    else if(req.url === "/message") {
        res.setHeader('Content-Type', 'text/html');

        let body = [];

        req.on('data', (chunks) => {
            body.push(chunks);
        });

        req.on('end', () => {
            let buffer = Buffer.concat(body);
            let formData = buffer.toString();

            const formValues = formData.split("=")[1];

            fs.writeFile('formValues.txt', formValues, (error) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });
    }
    else if(req.url === '/read') {
        fs.readFile('formValues.txt', (error, data) => {
            console.log(data.toString());
            res.end(`
                <h1>
                    ${data.toString()}
                </h1>
            `);
        })   
    }
});

server.listen(3000, () => {
    console.log('server is running on port: ', 3000);
});