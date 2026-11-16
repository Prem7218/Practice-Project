const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController'); 

router.get('/', transactionController.getAllTransaction);
router.post('/', transactionController.postTransaction);
router.put('/', transactionController.sendMoney);

module.exports = router;
