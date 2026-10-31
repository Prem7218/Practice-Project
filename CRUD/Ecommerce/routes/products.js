const express = require('express');
const { allProducts, productById, postProduct } = require('../controller/productController');
const router = express.Router();

router.get('/', allProducts);
router.get('/:id', productById);
router.post('/', postProduct);

module.exports = router;