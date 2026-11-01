const express = require('express');
const router = express.Router();
const { products, postProducts } = require('../controller/productController');

router.get('/', products);
router.post('/', postProducts);

module.exports = router;