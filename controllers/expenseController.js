
const expenseService = require('../services/expenseService');
const path = require('path');
const { sendErrorResp } = require('../utils/response');
const jwt = require('jsonwebtoken');

function decode(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
}

const loadExpensePage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'expenseView.html'));
}

const allExpense = (req, res) => {
    const decoded = decode(req.query.userId);
    return expenseService.getAllExpense({ userId: decoded.userId }, res);
};

const updateusersTotalExpense = (req, res) => {
    const decoded = decode(req.body.userId);
    return expenseService.updateUsersTotalExpense({ userId: decoded.userId }, res);
}

const expenseById = (req, res) => {
    const expenseId = Number(req.params.id);
    const decoded = decode(req.query.userId);

    if(!Number.isInteger(expenseId) || expenseId <= 0) {
        return sendErrorResp(res, 400, 'Invalid Expense Id!');
    }

    return expenseService.getExpenseById({ expenseId, userId: decoded.userId }, res);
}

const updateById = (req, res) => {
    const { userId, expense, expense_disc, category } = req.body;
    const expenseId = Number(req.params.id);
    const decoded = decode(userId);

    console.log(`UserID: `, userId);

    if(!Number.isInteger(expenseId) || expenseId <= 0) {
        return sendErrorResp(res, 400, 'Invalid Expense Id!');
    }

    if(!Number.isInteger(decoded.userId) || decoded.userId <= 0) {
        return sendErrorResp(res, 400, 'Invalid User Id!');
    }

    if (
        typeof expense !== 'number' ||
        !Number.isFinite(expense) ||
        expense <= 0
    ) {
        return sendErrorResp(
            res,
            400,
            'Invalid expense amount!'
        );
    }

    if(typeof expense_disc !== 'string' || !expense_disc.trim()) {
        return sendErrorResp(res, 400, 'Invalid Expense Discription!');
    }

    if(typeof category !== 'string' || !category.trim()) {
        return sendErrorResp(res, 400, 'Invalid Expense Discription!');
    }    

    return expenseService.getUpdateById({
        expenseId,
        userId: decoded.userId,
        expense,
        expense_disc,
        category
    }, res);
}

const postExpense = (req, res) => {
    const { 
        userId,
        expense, 
        expense_disc, 
        category 
    } = req.body;

    const decoded = decode(userId);

    if (
        !Number.isInteger(Number(decoded.userId)) ||
        Number(decoded.userId) <= 0
    ) {
        return sendErrorResp(
            res,
            400,
            'Invalid User Id!'
        );
    }

    if (typeof expense !== 'number' ||  !Number.isFinite(expense) || expense <= 0) {
        return sendErrorResp(
            res,
            400,
            'Invalid expense amount!'
        );
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
        userId: decoded.userId
    }, res);
}

const deleteExpenses = (req, res) => {
    const userId = req.query.userId;
    const id = Number(req.params.id);
    const decoded = decode(userId);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(res, 400, 'Invalid Expense Id!');
    }

    if(!Number.isInteger(decoded.userId) || decoded.userId <= 0) {
        return sendErrorResp(res, 400, 'Invalid User Id!');
    }

    return expenseService.deleteExpense({
        expenseId: id, userId: decoded.userId
    }, res);
}

module.exports = {
    loadExpensePage,
    allExpense,
    postExpense,
    deleteExpenses,
    expenseById,
    updateById,
    updateusersTotalExpense
}