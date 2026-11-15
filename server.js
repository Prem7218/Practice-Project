require('dotenv').config();

// console.log({
//     appIdLoaded: Boolean(process.env.CASHFREE_APP_ID),
//     secretLoaded: Boolean(process.env.CASHFREE_SECRET_KEY)
// });

const express = require('express');
const app = express();

const db = require('./utils/sequelizeDB');

const { sendErrorResp } = require('./utils/response');
const authRouter = require('./routes/authentication');
const expenseRouter = require('./routes/expenseRoute');
const paymentRouter = require('./routes/paymentsRoute');

const PORT = 5000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', authRouter);
app.use('/payroute', paymentRouter);
app.use('/expense', expenseRouter);

app.use((req, res) => {
    return sendErrorResp(res, 404, 'Page not found!', true);
});

db.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    return db.sync({ alter: true });
  })
  .then(() => {
    console.log('Tables synchronized!');

    app.listen(PORT, () => {
        console.log(`Server Hosted: http://localhost:${PORT}`);
    }); 
  })
  .catch((error) => {
      console.log('Database error:', error);
  });