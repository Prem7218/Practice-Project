const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.loadExpensePage);

router.get('/data', expenseController.allExpense);
router.post('/data', expenseController.postExpense);

// router.put('/', expenseController);
router.delete('/data', expenseController.deleteExpenses);

module.exports = router;