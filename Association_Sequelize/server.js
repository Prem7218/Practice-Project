const express = require('express');
const db = require('./utils/sequelizeDB');

const { sendErrorResp } = require('./utils/response');

const studentsRouter = require('./routes/studentsRoute'); 
const coursesRouter = require('./routes/coursesRoute');

// Import associations before syncing
require('./modulesRelations/student_course');

const PORT = 3000;
const app = express();

app.use(express.json());

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

app.use((req, res) => {
    return sendErrorResp(
        res,
        {
            statusCode: 404,
            message: 'Page not found'
        },
        true
    ); 
});

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server Is Hosted: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error: `, error);
  });