const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingsController');

router.get('/', bookingController.allBookings);
router.get('/seats', bookingController.bookSeats);
router.post('/', bookingController.addBooking);

module.exports = router;