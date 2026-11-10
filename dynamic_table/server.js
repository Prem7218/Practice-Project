const express = require('express');
const app = express();
const PORT = 3000;

const { sendErrorResp } = require('./utils/response');

const db = require('./utils/sequelizeDB');
const tableRouter = require('./routes/tableRoutes');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/tables', tableRouter);

app.use((req, res) => {
    return sendErrorResp(res, 404, 'Page not found!');
});

db.authenticate()
  .then(() => {
    db.sync({ alter: true });
    console.log('Database connected successfully!');
  })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on: http://localhost:${PORT}/tables`);
    });
  })
  .catch((error) => {
    console.log(error);
  });