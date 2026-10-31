const express = require('express');
const app = express();

app.use(express.json());

const item = {
    categories: [],
    products: [],
};

const PORT = 4000;

app.use((req, res, next) => {
    console.log('Authentication is requested...');
    next();
});

// POST: Add a category
app.post('/cats', (req, res) => {
    const { name } = req.body;

    if(!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
            message: `Categorie not added correctly...`
        });
    }

    const categorie = { 
        id: item.categories.length + 1, 
        name: name.trim()
    };

    item.categories.push(categorie);

    return res.status(201).json({
        message: 'New categorie added!',
        categorie
    });
});

// POST: Add a product
app.post('/products', (req, res) => {
    const { name, price, rate } = req.body;

    if(
        !name || 
        typeof name !== 'string' ||
        !name.trim() ||
        typeof price !== 'number' ||
        price <= 0 || 
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
        message: 'New Product Added!',
        product
    });
});

// GET: All categories
app.get('/cats', (req, res) => {
    return res.json(item.categories);
});

// GET: All products
app.get('/products', (req, res) => {
    return res.json(item.products);
});

// GET: Category by ID
app.get('/cats/:id', (req, res) => {
    const catId = Number(req.params.id);

    if(!Number.isInteger(catId) || catId < 1) {
        return res.status(400).json({
            message: `Invalid Categorie ID!`
        });
    }

    const cat = item.categories.find(cat => cat.id === catId);

    if(!cat) {
        return res.status(404).json({
            message: `Categorie not found!`
        });
    }

    return res.json(cat);
});

// GET: Product by ID
app.get('/products/:id', (req, res) => {
    const productId = Number(req.params.id);

    if(!Number.isInteger(productId) || productId < 1)  {
        return res.status(400).json({
            message: `Invalid product ID`
        });
    }

    const product = item.products.find(product => product.id === productId);

    if(!product) {
        return res.json({
            message: 'Product not found!'
        });
    }

    return res.json(product);
});

// 404 middleware: MUST be last
app.use((req, res) => {
    res.status(404).send(`
        <h1>
            404 - Page Not Found
        </h1>
    `);
});

app.listen(PORT, () => {
    console.log('server is: ', PORT);
});