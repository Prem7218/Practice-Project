
const path = require('path');
const express = require('express');
const app = express();
const usersRouter = require('./routes/usersRoute');
const productsRouter = require('./routes/productsRoute');
const cartsRouter = require('./routes/cartsRoute');

const PORT = 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.use((req, res) => {
    return res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});