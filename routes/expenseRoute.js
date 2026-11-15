const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.loadExpensePage);

router.get('/data', expenseController.allExpense);
router.post('/data', expenseController.postExpense);

router.get('/:id', expenseController.expenseById);
router.put('/:id', expenseController.updateById);
router.delete('/:id', expenseController.deleteExpenses);


module.exports = router;