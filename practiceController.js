
const { sendErrorResp } = require('./practiceResp');
const path = require('path');

// const itemsService = require('./practiceService');

// const loadItemsPage = (req, res) => {
//     return res.sendFile(path.join(__dirname, 'practiceView.html'));
// }

// const allUsers = (req, res) => {
//     return itemsService.getAllUsers(res);
// }

// const allProducts = (req, res) => {
//     return itemsService.getAllProducts(res);
// }

// const userById = (req, res) => {
//     const id = Number(req.params.id);

//     if(!Number.isInteger(id) || id <= 0) {
//         return sendErrorResp(res, 400, 'Invalid User Id!');
//     }

//     return itemsService.getUsersById({ id }, res);
// }

// const productById = (req, res) => {
//     const id = Number(req.params.id);

//     if(!Number.isInteger(id) || id <= 0) {
//         return sendErrorResp(res, 400, 'Invalid Product Id!')
//     }

//     return itemsService.getProductsById({ id }, res);
// }

// const addUser = (req, res) => {
//     const { name } = req.body;

//     if(typeof name !== 'string' || !name.trim()) {
//         return sendErrorResp(res, 400, 'Invalid User name!')
//     }

//     return itemsService.postUsers({ name }, res);
// }

// const addProduct = (req, res) => {
//     const { name } = req.body;

//     if(typeof name !== 'string' || !name.trim()) {
//         return sendErrorResp(res, 400, 'Invalid Product name!')
//     }

//     return itemsService.postProduct({ name }, res);
// }

// const cartByUserId = (req, res) => {
//     const id = Number(req.params.id);

//     if(!Number.isInteger(id) || id <= 0) {
//         return sendErrorResp(res, 400, 'Invalid Product Id!')
//     }
    
//     return itemsService.getUserCartByUserId({ id }, res);
// }

// const postCart = (req, res) => {
//     const id = Number(req.params.id);
//     const { productId } = req.body;

//     if(!Number.isInteger(productId) || productId <= 0) {
//         return sendErrorResp(res, 400, 'Please provide a valid product ID');
//     }

//     return itemsService.postCartByUserId({ id, productId }, res);
// }

// module.exports = {
//     loadItemsPage,
//     allUsers,
//     allProducts,
//     userById,
//     productById,
//     addUser,
//     addProduct,
//     cartByUserId,
//     postCart
// }

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

const itemsService = require('./practiceService');

const loadAddProductPage = (req, res) => {
    return res.sendFile(path.join(__dirname, 'practiceView.html'));
}

const addProduct = (req, res) => {
    const { name } = req.body;

    if(typeof name !== 'string' || !name.trim()) {
        return sendErrorResp(res, 400, 'Invalid Product name!')
    }

    return itemsService.postProduct({ name }, res);
}

module.exports = { 
    addProduct,
    loadAddProductPage
};

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

