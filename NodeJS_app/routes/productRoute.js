const express = require('express');
const router = express.Router();
const { products } = require('../controller/productController');

router.get('/', products);

module.exports = router;