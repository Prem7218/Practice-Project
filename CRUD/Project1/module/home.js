const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    return res.status(200).send(
        "Welcome to the Student & Course Portal API!"
    );
});

module.exports = app;