
const expenseService = require('../services/expenseService');
const path = require('path');
const { sendErrorResp } = require('../utils/response');

const loadExpensePage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'expenseView.html'));
}

const allExpense = (req, res) => {
    const userId = sessionStorage.getItem('user');

    return expenseService.getAllExpense({ userId }, res);
};

const postExpense = (req, res) => {
    const { 
        userId,
        expense, 
        expense_disc, 
        category 
    } = req.body;

    if(!Number.isInteger(expense) || expense < 0) {
        return sendErrorResp(res, 400, 'Invalid Expense Amount!');
    }

    if(typeof expense_disc !== 'string' || !expense_disc.trim()) {
        return sendErrorResp(res, 400, 'Invalid Expense Discription!');
    }

    if(typeof category !== 'string' || !category.trim()) {
        return sendErrorResp(res, 400, 'Invalid Expense Discription!');
    }

    return expenseService.postExpenses({
        expense, 
        expense_disc,
        category,
        userId
    }, res);
}

const deleteExpenses = (req, res) => {
    const userId = sessionStorage.getItem('user');

    return expenseService.deleteExpense({
        expenseId, userId
    }, res);
}

module.exports = {
    loadExpensePage,
    allExpense,
    postExpense,
    deleteExpenses
}