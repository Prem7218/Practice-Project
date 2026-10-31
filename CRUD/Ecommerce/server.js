const express = require('express');
const app = express();

const PORT = 3000;

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Method: ${req.method} | URL: ${req.url}`);
    next();
});

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

app.use((req, res) => {
    return res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});