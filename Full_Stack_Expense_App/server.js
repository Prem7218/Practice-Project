const express = require('express');
const path = require('path');
const PORT = 3400;
const db = require('./utils/sequelizeDB');

const { sendErrorResp } = require('./utils/response');
const expenseRoute = require('./routes/expenseRoute');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/expenses', expenseRoute);

app.use((req, res) => {
    return sendErrorResp(
        res,
        {
            statusCode: 404,
            message: 'Page not found!'
        },
        true
    )
});

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server hosted on: http://localhost:${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error);
  });