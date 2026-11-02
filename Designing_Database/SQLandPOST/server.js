require('dotenv').config();

const express = require('express');
const path = require('path');

const db = require('./utils/DBConnection');
const studentRoute = require('./routes/studentsRoute');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/students', studentRoute);

app.listen(PORT, () => {
    console.log(`server is running on HOST: http://localhost:${PORT}`);
});