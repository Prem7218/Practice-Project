const express = require('express');
const app = express();
const booksRouter = require('./module/books');
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Method: ${req.method} of url: ${req.url}`);
    next();
})

app.use('/books', booksRouter);

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});