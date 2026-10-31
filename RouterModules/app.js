const express = require('express');
const app = express();
const categorieRouter = require('./module/categories');
const productsRouter = require('./module/products');
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});

app.use('/products', productsRouter);
app.use('/categories', categorieRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});