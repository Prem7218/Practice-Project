const { sendErrorResp } = require('./utils/response'); 

const express = require('express');
const db = require('./utils/sequelizeDB');
const socailRouter = require('./routes/socialRoute');

const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', socailRouter);

app.use((req, res) => {
    return sendErrorResp(res, 404, 'Page not found!');
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