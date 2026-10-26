
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {

    const url = req.url;

    if(url === '/' && req.method === "GET") {

        fs.readFile('new_file.txt', (error, data) => {
            const savedName = error ? '' : data;
            res.setHeader('Content-Type', 'text/html');

            res.end(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Node.js Form</title>
                    </head>
                    <body>
                        <h1>${savedName}</h1>
                        <form action="/" method="POST">
                            <label for="name">Name: </label>
                            <input id="name" type="text" name="username" required/>
                            <button type="submit">Add</button>
                        </form>
                    </body>
                </html>
            `);
        });
    }
    else if(url === '/' && req.method === 'POST') {

        let body = [];

        req.on('data', (chunks) => {
            body.push(chunks);
        });

        req.on('end', () => {
            const buffer = Buffer.concat(body);
            const formData = buffer.toString();

            const params = new URLSearchParams(formData);
            const formValues = params.get('username') || '';

            fs.writeFile('new_file.txt', formValues, (error) => {

                if(error) {
                    res.statusCode = 500;
                    return res.end('Error writing file');
                }

                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            })
        })
    }
    else {
        res.statusCode = 400;
        res.end('Page Not Found');
    }
});

const port = 4000;
server.listen(port, () => {
    console.log('server on port: ', port);
});