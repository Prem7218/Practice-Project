const path = require('path');
const productService = require('../service/productService');

const products = (req, res) => {

    return res.sendFile(path.join(__dirname, '..', 'product.html'));
    // const allProducts = productService.getAllProducts();

    // return res.status(200).json({
    //     message: 'Fetching all products',
    //     totalProducts: allProducts.length,
    //     allProducts
    // });
}

module.exports = {
    products
}