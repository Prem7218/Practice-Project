const express = require('express');
const app = express();

const booksRouter = require('./module/books');

const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Method: ${req.method} | URL: ${req.url}`);
    next();
})

app.use('/books', booksRouter);

app.use((req, res) => {
    return res.status(404).json({
        message: `Route not found`
    });
}); 

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});