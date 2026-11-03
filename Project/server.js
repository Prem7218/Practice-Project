const express = require('express');
const db = require('./utils/DBConnnection');

const studentRouter = require('./routes/studentsRoute');
const studentModel = require('./models/studentsModel');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/students', studentRouter);

app.use((req, res) => {
    return res.status(404).send("Page not found !");
});

db.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`server is Host: http://localhost${PORT}/students`);
    });
}).catch((error) => {
    console.log(error);
});