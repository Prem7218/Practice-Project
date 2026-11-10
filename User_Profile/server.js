const { sendErrorResp } = require('./utils/response');

const express = require('express');
const db = require('./utils/sequelizeDB');
const path = require('path');

const usersRouter = require('./routes/usersRoute');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/users', usersRouter);

app.use((req, res) => {
    return sendErrorResp(res, {
        statusCode: 404,
        message: 'Page not found!'
    }, true);
});

db.sync({ force: false })
    .then(() => {
        console.log('Database connected and models synchronized!');

        app.listen(PORT, () => {
            console.log(`Server running: http://localhost:${PORT}/users/page`);
        });
    })
    .catch(error => {
        console.error('Database error:', error);
    });
