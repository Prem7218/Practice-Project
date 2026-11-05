const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.loadExpensePage);
router.get('/all', expenseController.allExpense);
router.post('/all', expenseController.postExpense);

router.get('/all/:id', expenseController.getExpenseById);
router.put('/all/:id', expenseController.updateExpense);
router.delete('/all/:id', expenseController.deleteExpense);

module.exports = router;