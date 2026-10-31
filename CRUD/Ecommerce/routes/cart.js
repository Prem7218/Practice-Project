const express = require('express');
const { getUserCart, postUserCart } = require('../controller/cartController');
const router = express.Router();

router.get('/:userId', getUserCart);
router.post('/:userId', postUserCart);

module.exports = router;