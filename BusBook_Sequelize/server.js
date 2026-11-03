
const express = require('express');
const db = require('./utils/sequelizeDB');

const userRouter = require('./routes/usersRoute');
const busRouter  = require('./routes/busesRoute');
const bookRoute  = require('./routes/bookingsRoute');
const paymentRoute = require('./routes/paymentsRoute'); 

const { sendErrorResp } = require('./utils/response');

const PORT = 3000;
const app = express();

app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', userRouter);
app.use('/buses', busRouter);
app.use('/bookings', bookRoute);
app.use('/payment', paymentRoute);

app.use((req, res) => {
    return sendErrorResp(
        res, 
        { 
            statusCode: 404, 
            message: 'Page not found!' 
        }, true
    );
});

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Hosted: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database synchronization failed:', err);
  });