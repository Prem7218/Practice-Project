const path = require('path');

const productService = require('../service/productService');

const allProducts = (req, res) => {
    const products = productService.getAllProducts();

    return res.sendFile(path.join(__dirname, "../view/index.html"));

    // return res.status(200).json({
    //     message: 'Fetching all products',
    //     totalProducts: products.length,
    //     products
    // });
}

const getProductById = (req, res) => {
    const product = productService.getProductById(Number(req.params.id));

    if(!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    return res.status(200).json({
        message: 'Product found',
        product
    });
}

const postProduct = (req, res) => {
    const { name, price } = req.body;

    if(
        typeof name !== 'string' || 
        !name.trim() ||
        typeof price !== 'number' ||
        price <= 0
    ) {
        return res.status(400).json({
            message: 'Please fill name and price correctly!'
        });
    }

    const product = productService.postProduct({ name, price });

    return res.status(201).json({
        message: 'Product created successfully',
        product
    });
}

module.exports = {
    allProducts,
    getProductById,
    postProduct
}