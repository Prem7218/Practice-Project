const express = require('express');
const app = express();

const db = require('./utils/sequelizeDB');

const { sendErrorResp } = require('./utils/response');
const authRouter = require('./routes/authentication');
const expenseRouter = require('./routes/expenseRoute');

const PORT = 5000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', authRouter);
app.use('/expense', expenseRouter);

app.use((req, res) => {
    return sendErrorResp(res, 404, 'Page not found!', true);
});

db.authenticate()
  .then(() => {
    db.sync({ alter: true });
    console.log('Database connected successfully!');
  })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server Hosted: http://localhost:${PORT}`);
    }); 
  })
  .catch((error) => {
        console.log(error);
  });