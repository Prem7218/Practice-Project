const express = require('express');
const router = express.Router();
const busesController = require('../controllers/busesController');

router.get('/', busesController.allBuses);
router.put('/:id', busesController.updateBus);
router.get('/:id/bookings', busesController.getBookingForSingleBus);
router.post('/', busesController.postBus);

module.exports = router;