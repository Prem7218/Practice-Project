const express = require('express');
const router = express.Router();
const { getCartByUserId, postCart } = require('../controller/cartsController');

router.get('/:userId', getCartByUserId);
router.post('/:userId', postCart);

module.exports = router;