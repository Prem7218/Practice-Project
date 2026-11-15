const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentController');

router.get('/', paymentController.loadPaymentPage);

router.post('/pay', paymentController.processPayment);
router.get('/payment-status/:orderId', paymentController.paymentStatus);

module.exports = router;