const express = require('express');
const router = express.Router();
const item = {
    products: []
};

router.post('/', (req, res) => {
    const { name, price, rate } = req.body;

    if(
        !name || 
        typeof name !== 'string' || 
        !name.trim() ||
        !Number.isFinite(price) ||
        typeof price !== 'number' ||
        price <= 0 || 
        !Number.isFinite(rate) ||
        typeof rate !== 'number' ||
        rate < 0
    ) {
        return res.status(400).json({
            message: 'Provide a valid name, positive price, and non-negative rate'
        });
    }

    const product = {
        id: item.products.length + 1,
        name: name.trim(),
        price,
        rate
    };

    item.products.push(product);
    
    return res.status(201).json({
        message: 'A new product has been created.',
        product
    });
});

router.get('/', (req, res) => {
    let products = item.products;
    return res.status(200).json({
        message: 'Here is the list of all products.',
        products
    })
});

module.exports = router;