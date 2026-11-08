
const http = require('http');
const express = require('express');
const db = require('../practiceDB');
const app = express();
const PORT = 4000;

const usersRouter = require('./routes/usersRoute');
const busesRouter = require('./routes/busesRoute');

// app.use(express.static(__dirname));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/buses', busesRouter);

app.use((req, res) => {
    return res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
    console.log(`Server Host: http://localhost:${PORT}`);
});