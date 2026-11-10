const { sendErrorResp, sendSuccessResp } = require("./practiceResp");

// const users = [];
const products = [];
// const carts = {};

// const getAllUsers = (res) => {
//     return sendSuccessResp(
//         res, 200, 'Fetching all users', users
//     );
// }

// const getAllProducts = (res) => {
//     return sendSuccessResp(
//         res, 200, 'Fetching all products', products
//     );
// }

// const getUsersById = ({ id }, res) => {

//     const user = users.find(user => user.id === id);

//     return sendSuccessResp(
//         res, 200, `Fetching user with ID: ${id}`, user
//     );
// }

// const getProductsById = ({ id }, res) => {

//     const product = products.find(product => product.id === id);
    
//     return sendSuccessResp(
//         res, 200, `Fetching product with ID: ${id}`, product
//     );
// }

// const postUsers = ({ name }, res) => {
    
//     const newUser = {
//         id: users.length + 1,
//         name
//     }

//     users.push(newUser);

//     return sendSuccessResp(
//         res, 201, 'Adding a new user', newUser
//     );
// }

// const postProduct = ({ name }, res) => {

//     const newProduct = {
//         id: products.length + 1,
//         name
//     }
    
//     products.push(newProduct);

//     return sendSuccessResp(
//         res, 201, 'Adding a product user', newProduct
//     );
// }

// const getUserCartByUserId = ({ id }, res) => {

//     if(!carts[id]) {
//         return res.status(404).send({
//             message: 'Cart not found for this user'
//         })
//     }

//     return sendSuccessResp(
//         res, 200, `Fetching cart for user with ID: ${id}`, carts[id]
//     );
// }

// const postCartByUserId = ({ id, productId }, res) => {

//     if(products.find(product => product.id === productId) === undefined) {
//         return sendErrorResp(res, 404, 'Product not found!')
//     }

//     if(!carts[id]) {
//         carts[id] = [];
//     }

//     carts[id].push(productId);

//     return sendSuccessResp(
//         res, 201, `Adding product to cart for user with ID: ${id}`, carts[id]
//     );
// }

// module.exports = {
//     getAllUsers, getAllProducts,
//     getUsersById, getProductsById,
//     postUsers, postProduct,
//     getUserCartByUserId,
//     postCartByUserId
// }

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

const postProduct = ({ name }, res) => {

    const newProduct = {
        id: products.length + 1,
        name
    }
    
    products.push(newProduct);

    return sendSuccessResp(
        res, 201, 'Adding a product user', newProduct
    );
}

module.exports = {
    postProduct
};

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

