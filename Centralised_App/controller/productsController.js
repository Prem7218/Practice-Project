
const { getAllProducts, getProductById, postProduct } = require('../service/productsService');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const allProducts = (req, res) => {
    const products = getAllProducts();

    return sendSuccessResp(res, 200, 'all products is here!', products);
}

const productById = (req, res) => {
    const product = getProductById(Number(req.params.id));

    if(!product) {
        return sendErrorResp(res, { statusCode: 404, message: 'product not found!' });
    }

    return sendSuccessResp(res, 200, 'productById Found', product);
}

const postProducts = (req, res) => {
    const { name, price } = req.body;

    if (
        typeof name !== 'string' ||
        !name.trim() ||
        price === null ||
        price === undefined ||
        price === '' ||
        !Number.isFinite(Number(price)) ||
        Number(price) <= 0
    ) {
        return sendErrorResp(res, { statusCode: 400, message: 'Invalid product name or price' });
    }

    const newProduct = postProduct({ 
        name: name.trim(),
        price: Number(price)
    });

    return sendSuccessResp(res, 201, 'Users new product added successfully', newProduct);
}

module.exports = {
    allProducts,
    productById,
    postProducts
}