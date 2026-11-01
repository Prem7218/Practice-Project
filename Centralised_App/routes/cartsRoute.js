const express = require('express');
const router = express.Router();
const { cartByUserId, postCartById } = require('../controller/cartsController');

router.get('/:id', cartByUserId);
router.post('/:id', postCartById);

module.exports = router;