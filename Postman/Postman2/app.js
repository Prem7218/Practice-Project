const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON
app.use(express.json());
const details = {
    users: [],
    orders: []
};

app.use((req, res, next) => {
    console.log('Authentication request...');
    req.message = 'Welcome to all!';
    next();
});

app.post('/users', (req, res) => {
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({
            message: 'Please fill name first...'
        });
    }

    const user = { 
        id: details.users.length + 1,
        name
    }

    details.users.push(user);
    return res.status(201).json({
        message: 'A new user has been created.'
    });
});

app.post('/orders', (req, res) => {
    const { dish, price, rating } = req.body;

    if(!dish || !price || !rating) {
        return res.status(400).json({
            message: "Please fill all order detail's first"
        });
    }

    const order = {
        id: details.orders.length + 1,
        dish,
        price,
        rating
    }

    details.orders.push(order);
    return res.status(201).json({
        message: 'A new order has been created.'
    });
});

app.get('/users', (req, res) => {
    res.json(details.users);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = details.users.find(user => user.id === userId);

    if(!user) {
        return res.status(404).json({
            message: `User not found`
        });
    }

    return res.json(user);
});

app.get('/orders', (req, res) => {
    res.json(details.orders);
});

app.get('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = details.orders.find(order => order.id === orderId);

    if(!order) {
        return res.status(404).json({
            message: `Order not found` 
        });
    }

    return res.json(order);
});

app.listen(PORT, () => {
    console.log('server: ', PORT);
});