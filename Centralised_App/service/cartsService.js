
let carts = {};

const getCartByUserId = (id) => {

    if(!carts[id]) {
        carts[id] = [];
    }

    return carts[id];
}

const postCartByUserId = (id, product, quantity) => {

    if(!carts[id]) {
        carts[id] = [];
    }

    const newProduct = {
        id: carts[id].length + 1,
        product,
        quantity
    }
    
    carts[id].push(newProduct);
    return newProduct;
}

module.exports = {
    getCartByUserId,
    postCartByUserId
}