
let carts = {};

const getCartByUserId = (userId) => {
    return carts[userId] || null;
}

const postCart = (cart) => {
    const { userId, productId, quantity } = cart;

    if(!carts[userId]) {
        carts[userId] = [];
    }
    
    const newCartItem = {
        productId,
        quantity
    };
    carts[userId].push(newCartItem);
    return newCartItem;
}

module.exports = {
    getCartByUserId,
    postCart
}