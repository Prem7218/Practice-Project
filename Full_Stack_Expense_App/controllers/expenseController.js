
const expenseService = require('../services/expenseService');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadExpensePage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'expense.html'));
}

const allExpense = (req, res) => {
    return expenseService.getAllExpense(res);
}

const postExpense = (req, res) => {
    const { amount, search, category } = req.body;

    if(!Number.isInteger(amount) || amount < 0) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'amount is wrong!'
            }
        );
    }

    if(typeof search !== 'string' || !search.trim()) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'discription is wrong!'
            }
        );
    }

    if(typeof category !== 'string' || !category.trim()) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'Category is wrong!'
            }
        );
    }

    return expenseService.postExpense({
        amount, search, category
    }, res);
}

const getExpenseById = (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'expense id is wrong!'
            }
        );
    }

    return expenseService.getExpenseByIds({ id }, res);
}

const deleteExpense = (req, res) => {
    return expenseService.deleteExpenses(
        { id: Number(req.params.id) }, res
    );
}

const updateExpense = (req, res) => {
    const id = Number(req.params.id);
    const { amount, search, category } = req.body;

    if(!Number.isInteger(amount) || amount < 0) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'amount is wrong!'
            }
        );
    }

    if(typeof search !== 'string' || !search.trim()) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'discription is wrong!'
            }
        );
    }

    if(typeof category !== 'string' || !category.trim()) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'Category is wrong!'
            }
        );
    }

    return expenseService.updateExpenses({
        amount, search, category, id
    }, res);
}

module.exports = {
    allExpense,
    postExpense,
    getExpenseById,
    loadExpensePage,
    deleteExpense,
    updateExpense
}