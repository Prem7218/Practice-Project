const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentsController');

router.get('/', paymentController.allPayments);
router.post('/', paymentController.postPayment);

module.exports = router;