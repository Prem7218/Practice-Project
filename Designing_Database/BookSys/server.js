
const express = require('express');
const app = express();
const userRouter = require('./routes/usersRoute');
const busRouter = require('./routes/busesRoute');
const PORT = 3000;

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.use('/users', userRouter);
app.use('/buses', busRouter);

app.use((req, res) => {
    return res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
    console.log(`Server running on HOST: http://localhost:${PORT}/users`);
});