const express = require('express');
const app = express();
const homeRouter = require('./module/home');
const studentsRouter = require('./module/students');
const courseRouter = require('./module/courses');

const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Method: ${req.method} | URL: ${req.url}`);
    next();
});

app.use('/', homeRouter);
app.use('/students', studentsRouter);
app.use('/courses', courseRouter);

app.use((req, res) => {
    return res.status(404).send(
        '<h1>Page not found!</h1>'
    );
});

app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`);
});