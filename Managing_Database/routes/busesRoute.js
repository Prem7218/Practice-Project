const express = require('express');
const router = express.Router();

const busesController = require('../controllers/busesController');

router.get('/available/:seats', busesController.busesMoreThanSeats);
router.post('/', busesController.postBuses);

module.exports = router;