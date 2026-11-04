
const express = require('express');
const path = require('path');
var cors = require('cors')

const { sendErrorResp } = require('./utils/response');
const db = require('./utils/sequelizeDB');

const appointmentRouter = require('./routes/appointmentRoute');

const PORT = 3000;
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/appointment', appointmentRouter);

app.use((req, res) => {
    return sendErrorResp(
        res, {
            statusCode: 404,
            message: 'Page not found!'
        },
        true
    )
});

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server Hosted ON: http://localhost:${PORT}/appointment`);
    });    
})
  .catch((error) => {
    console.log(error);
});

