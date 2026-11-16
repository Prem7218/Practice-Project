require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const db = require('./utils/sequelizeDB');

const { sendErrorResp } = require('./utils/response');

const authRouter = require('./routes/authentication');
const expenseRouter = require('./routes/expenseRoute');
const paymentRouter = require('./routes/paymentsRoute');

const PORT = 5000;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.use('/', authRouter);
app.use('/payroute', paymentRouter);
app.use('/expense', expenseRouter);

// 404 Handler
app.use((req, res) => {
    return sendErrorResp(res, 404, 'Page not found!', true);
});

// Database and Server Initialization
const startServer = async () => {
    try {
        await db.authenticate();

        console.log('Database connected successfully!');

        // Synchronize registered Sequelize models
        await db.sync();

        console.log('Tables synchronized!');

        app.listen(PORT, () => {
            console.log(`Server Hosted: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();