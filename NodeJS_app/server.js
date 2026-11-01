const express = require('express');
const app = express();
const productRoute = require('./routes/productRoute');

const PORT = 3000;

app.use(express.static('public'));

// Parse incoming JSON requests
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/products', productRoute);

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});