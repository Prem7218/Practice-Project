const express = require('express');
const router = express.Router();
const { allProducts, productById, postProducts } = require('../controller/productsController');

router.get('/', allProducts);
router.get('/:id', productById);
router.post('/', postProducts);

module.exports = router;