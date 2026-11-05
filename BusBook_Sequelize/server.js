
const express = require('express');
const db = require('./utils/sequelizeDB');

const userRouter = require('./routes/usersRoute');
const busRouter  = require('./routes/busesRoute');
const bookRoute  = require('./routes/bookingsRoute');
const paymentRoute = require('./routes/paymentsRoute'); 

const { sendErrorResp } = require('./utils/response');

// Initialize associations before synchronization
require('./relation_modle/relation');

const PORT = 4600;
const app = express();

// Middleware
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/users', userRouter);
app.use('/buses', busRouter);
app.use('/bookings', bookRoute);
app.use('/payments', paymentRoute);

// 404 handler
app.use((req, res) => {
    return sendErrorResp(
        res, 
        { 
            statusCode: 404, 
            message: 'Page not found!' 
        }, true
    );
});

// Start server
async function startServer() {
    try {
        await db.authenticate();

        console.log('Database connected successfully!');

        await db.sync({ alter: false });

        console.log('Database synchronized successfully!');

        app.listen(PORT, () => {
            console.log(
                `Server is hosted: http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error('Server initialization failed:', error);
    }
}

startServer();