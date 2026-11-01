
const productService = require('../service/productService');

const allProducts = (req, res) => {
    const products = productService.allProducts();

    return res.status(200).json({
        message: 'Fetching all products',
        totalProducts: products.length,
        products
    });
}

const productById = (req, res) => {
    const product = productService.productById(req.params.id);
    
    if(!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    return res.status(200).json({
        message: `Fetching product with ID: ${req.params.id}`,
        product
    });
}

const postProduct = (req, res) => {
    const { name } = req.body;

    if(typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
            message: 'Please fill name correctly!'
        });
    }

    const product = productService.postProduct(name);

    return res.status(201).json({
        message: 'Product created successfully',
        product
    });
}

module.exports = {
    allProducts,
    productById,
    postProduct
}