
const cart = {};

const getUserCart = (req, res) => {
    const userId = Number(req.params.userId);
    
    if(!cart[userId]) {
        return res.status(404).send({
            message: 'Cart not found for this user'
        })
    }

    return res.status(200).json({
        message: `Fetching cart for user with ID: ${userId}`,
        cart: cart[userId]
    });
}

const postUserCart = (req, res) => {
    const userId = Number(req.params.userId);
    const { productId } = req.body;

    if(!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
            message: 'Please provide a valid product ID'
        });
    }

    if(!cart[userId]) {
        cart[userId] = [];
    }

    cart[userId].push(productId);

    return res.status(201).json({
        message: `Adding product to cart for user with ID: ${userId}`,
        cart: cart[userId]
    });
}

module.exports = {
    getUserCart,
    postUserCart
}