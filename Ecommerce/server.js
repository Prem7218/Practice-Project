const express = require('express');
const app = express();
const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const cartsRoute = require('./routes/cartsRoute');

const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/carts', cartsRoute);

// Page Not Found Middleware
app.use((req, res) => {
    return res.status(404).send("Page Not Found");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});