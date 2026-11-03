const express = require('express');
const router = express.Router();
const busController = require('../controller/busesController');

router.get('/available/:seats', busController.getAvilableBuses);
router.post('/', busController.postBuses);

module.exports = router;