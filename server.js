require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();
const db = require('./utils/sequelizeDB');

const { sendErrorResp } = require('./utils/response');

const authRouter = require('./routes/authentication');
const expenseRouter = require('./routes/expenseRoute');
const paymentRouter = require('./routes/paymentsRoute');
const mailRouter = require('./routes/mailRoute');

const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), 
    { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.use('/', authRouter);
app.use('/payroute', paymentRouter);
app.use('/expense', expenseRouter);
app.use('/mail', mailRouter);

// 404 Handler
app.use((req, res) => {
    return sendErrorResp(res, 404, 'Page not found!', true);
});

// Database and Server Initialization
const startServer = async () => {
    try {
        await db.authenticate();

        console.log('Database connected successfully!');
        
        await db.sync();

        console.log('Tables synchronized!');

        https
            .createServer({ key: privateKey, cert: certificate }, app)
            .listen(() => {
                console.log(`Server Hosted: https://localhost:${process.env.PORT || 5000}`);
            });

    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();