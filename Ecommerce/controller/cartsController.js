
const cartService = require('../service/cartsService');

const getCartByUserId = (req, res) => {
    const cart = cartService.getCartByUserId(Number(req.params.userId));

    if(!cart) {
        return res.status(404).json({
            message: 'Cart not found'
        });
    }

    return res.status(200).json({
        message: 'Cart found',
        cart
    });
}

const postCart = (req, res) => {
    const userId = Number(req.params.userId);
    const { productId, quantity } = req.body;

    if(
        typeof userId !== 'number' || 
        userId <= 0 ||
        typeof productId !== 'number' || 
        productId <= 0 ||
        typeof quantity !== 'number' || 
        quantity <= 0
    ) {
        return res.status(400).json({
            message: 'Please fill userId, productId and quantity correctly!'
        });
    }

    const cart = cartService.postCart({ userId, productId, quantity });

    return res.status(201).json({
        message: 'Cart created successfully',
        cart
    });
}

module.exports = {
    getCartByUserId,
    postCart
}