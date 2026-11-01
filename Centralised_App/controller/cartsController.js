
const { getCartByUserId, postCartByUserId } = require('../service/cartsService');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const cartByUserId = (req, res) => {
    const userCart = getCartByUserId(Number(req.params.id));

    if(!userCart) {
        return sendErrorResp(res, { statusCode: 404, message: 'Cart not found' });
    }

    return sendSuccessResp(res, 200, 'cartByUserId Found', userCart);
}

const postCartById = (req, res) => {
    const { product, quantity } = req.body;
    const newProduct = postCartByUserId(Number(req.params.id), product, quantity);

    return sendSuccessResp(res, 201, 'Users new product added on cart successfully', newProduct);
}

module.exports = {
    cartByUserId,
    postCartById
};