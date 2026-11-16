const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./utils/sequelizeDB');

const transactionRoute = require('./routes/transactionRoute');

app.use(express.json());

app.use('/', transactionRoute);

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

