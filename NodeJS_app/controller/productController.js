const path = require('path');
const productService = require('../service/productService');

const products = (req, res) => {
    return res.sendFile(
        path.join(__dirname, '..', 'product.html')
    );
}

const postProducts = (req, res) => {
    const { name, price } = req.body;
    const numericPrice = Number(price);

    if(
        typeof name !== 'string' || 
        !name.trim() ||
        price === '' ||
        price === null ||
        price === undefined ||
        typeof numericPrice !== 'number' ||
        numericPrice <= 0
    ) {
        return res.status(400).json({
            message: 'Please fill name and price correctly!'
        });
    }

    const product = productService.postProducts({ name: name.trim(), price: numericPrice });

    return res.status(201).json({
        message: 'Product created successfully',
        product
    });
}

module.exports = {
    products,
    postProducts
}