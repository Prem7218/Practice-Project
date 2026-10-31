const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

const item = {
    categories: [],
    products: [],
}

app.use((req, res, next) => {
    console.log(`${req.method} requst made to ${req.url}`);
    next();
});

app.post('/products', (req, res) => {
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

app.post('/categories', (req, res) => {
    const { name } = req.body;

    if(!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
            message: 'Please fill correct details'
        });
    }

    const categorie = {
        id: item?.categories.length + 1,
        name: name.trim()
    };

    item.categories.push(categorie);
    
    return res.status(201).json({
        message: 'A new category has been created.',
        categorie
    });
});

app.get('/products', (req, res) => {
    let products = item.products;
    return res.status(200).json({
        message: 'Here is the list of all products.',
        products
    })
});

app.get('/categories', (req, res) => {
    let categories = item.categories;
    return res.status(200).json({
        message: 'Here is the list of all categories.',
        categories
    });
});

app.use((req, res) => {
    return res.status(404).json({
        message: `404 - Route Not Found`
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});