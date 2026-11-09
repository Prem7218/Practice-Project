const express = require('express');
const router = express.Router();

const bookingsController = require('../controllers/bookingsController');

router.post('/', bookingsController.postBooking);

router.get('/users/:id/bookings', bookingsController.findBookingByUserId);
router.get('/buses/:id/bookings', bookingsController.findBookingByBusId);

module.exports = router;