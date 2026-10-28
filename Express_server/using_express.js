const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('output from middle 1st...');
    next();
})

app.use((req, res, next) => {
    console.log('output from middle 2nd');
    res.send(`
        <div>
            <h1>Comes In 2nd</h1>
             Going node -> v8 -> server -> console -> client
        </div>
        `);
})

const PORT = 3500;

app.listen(PORT, () => {
    console.log('output from server: ', PORT);
});