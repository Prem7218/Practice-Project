const express = require('express');
const path = require('path');
const db = require('./utils/sequelizeDB');

const libraryRoute = require('./routes/libraryRoute');
const { sendErrorResp } = require('./utils/response');

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', libraryRoute);

app.use((req, res) => { 
    return sendErrorResp(
        res, {
            statusCode: 404,
            message: 'Page not found!'
        },
        true
    )
});

db.sync({ force: false})
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Hosted: http://localhost:${PORT}/library`);
    });
  })
  .catch((error) => {
    console.log(error);
  });