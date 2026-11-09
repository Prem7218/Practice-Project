
const express = require('express');
const db = require('./utils/sequelizeDB');

const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
require('./relation_models/relations');

const usersRouter = require('./routes/usersRoute');
const busesRouter = require('./routes/busesRoute');
const bookingsRouter = require('./routes/bookingsRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', bookingsRouter);
app.use('/users', usersRouter);
app.use('/buses', busesRouter);

app.use((req, res) => {
    return res.status(404).send('Page not found!');
});

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server Host: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });