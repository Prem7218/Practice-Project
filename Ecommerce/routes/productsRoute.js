const express = require('express');
const router = express.Router();
const { allProducts, getProductById, postProduct } = require('../controller/productsController');

router.get('/', allProducts);
router.get('/:id', getProductById);
router.post('/', postProduct);

module.exports = router;