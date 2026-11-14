
const { sendErrorResp, sendSuccessResp } = require('../utils/response');
const { Expense, AuthCheck } = require('../models/relation_models/relation');

const getAllExpense =async ({ userId }, res) => {

    try {
        const user = await AuthCheck.findByPk(userId, {
            include: [{
                model: Expense,
                as: 'expenses'
            }]
        });

        if (!user) {
            return sendErrorResp(res, 404, 'User not found!');
        }

        if(user.expenses.length === 0) {
            return sendErrorResp(res, 200, 'No expenses found!', []);
        }

        return sendSuccessResp(
            res, 
            200, 
            'User expenses fetched successfully!', 
            user.expenses
        );

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const postExpenses =async ({ expense, expense_disc, category, userId }, res) => {

    try {
        const user = await AuthCheck.findByPk(userId);

        if(!user) {
            return sendErrorResp(res, 404, 'User not found!');
        }

        const newExpense = await Expense.create({
            userId,
            expense,
            expense_disc,
            category,
        });

        return sendSuccessResp(res, 201, 'New expense added!', newExpense);

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const deleteExpense =async ({ expenseId, userId }, res) => {

    try {
        const expense = await Expense.findOne({
            where: {
                expenseId,
                userId
            }
        });

        if(!expense) {
            return sendErrorResp(res, 404, 'Expense not found!');
        }

        await expense.destroy();

        return sendSuccessResp(res, 200, 'Expense deleted successfully!');

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

module.exports = {
    getAllExpense,
    postExpenses,
    deleteExpense
}