
const express = require('express');
const db = require('./utils/sequelizeDB');

const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
require('./relation_model/relation');

const studentsRouter = require('./routes/studentsRoute');
const coursesRouter = require('./routes/coursesRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

app.use((req, res) => {
    return res.status(404).send('Page not found!');
});

db.authenticate()
  .then(() => {
    console.log('Database Connected Successfully!');
    return db.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server Host: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Database Error: ',error);
  });