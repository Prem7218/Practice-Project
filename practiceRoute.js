const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.status(200).send('Welcomes to journey');
// });

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// let books = [];

// router.get('/', (req, res) => {
//     return res.status(200).json({
//         status: true,
//         message: 'Here is the list of books!',
//         data: books
//     });
// });

// router.post('/', (req, res) => {
//     const { name } = req.body;

//     const newBook = {
//         id: books.length + 1,
//         name
//     }

//     books.push(newBook);

//     return res.status(201).json({
//         status: true,
//         message: 'New book added !',
//         data: newBook
//     });
// });

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// const itemsController = require('./practiceController');

// router.get('/', itemsController.loadItemsPage);

// router.get('/user', itemsController.allUsers);
// router.post('/user', itemsController.addUser);

// router.get('/product', itemsController.allProducts);
// router.post('/product', itemsController.addProduct);

// router.get('/user/:id', itemsController.userById);
// router.get('/product/:id', itemsController.productById);

// router.get('/cart/:id', itemsController.cartByUserId);
// router.post('/cart/:id', itemsController.postCart);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// const productController = require('./practiceController');

// router.get('/', productController.loadAddProductPage);
// router.post('/', productController.addProduct);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

module.exports = router;
