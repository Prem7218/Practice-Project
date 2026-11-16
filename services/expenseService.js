
const { sendErrorResp, sendSuccessResp } = require('../utils/response');
const { Expense, AuthCheck } = require('../models/relation_models/relation');

const getAllExpense =async ({ userId }, res) => {

    try {
        const user = await AuthCheck.findByPk(userId, {
            attributes: [],
            include: [{
                model: Expense,
                as: 'expenses',
                attributes: ['expenseId', 'expense', 'expense_disc', 'category']
            }]
        });

        if (!user) {
            return sendErrorResp(res, 404, 'User not found!');
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

const updateUsersTotalExpense =async ({ userId }, res) => {

    try {
        const usersExpense = await Expense.sum('expense', {
            where: {
                userId
            }
        });

        const [updatedRows] = await AuthCheck.update({
            totalExpense: usersExpense || 0
        }, {
            where: {
                userId
            }
        });

        if(!updatedRows) {
            return sendErrorResp(res, 404, 'User not found');
        }

        return sendSuccessResp(
            res,
            200,
            'User total expense updated successfully',
            {
                totalExpense: usersExpense || 0
            }
        );

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const getExpenseById =async ({ expenseId, userId }, res) => {

    try {
        const user = await AuthCheck.findByPk(userId);

        if(!user) {
            return sendErrorResp(res, 404, 'User not found!');
        }

        const expense = await Expense.findOne({
            where: {
                expenseId,
                userId
            }
        });

        if(!expense) {
            return sendErrorResp(res, 404, 'Expense not found!');
        }

        return sendSuccessResp(res, 200, 'Expense found', expense);

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const getUpdateById = async ({ expenseId, userId, expense, expense_disc, category }, res) => {

    try {
        const user = await AuthCheck.findByPk(userId);

        if(!user) {
            return sendErrorResp(res, 404, 'User not found!');
        }

        const [updatedRows] = await Expense.update({
            expense, expense_disc, category
        }, {
            where: {
                expenseId,
                userId
            }
        });

        if (updatedRows === 0) {
            return sendErrorResp(
                res, 404, 'Expense not found!'
            );
        }

        await updateUsersTotalExpense({ userId }, res);

        return sendSuccessResp(res, 200, 'Expense updated successfully!');        

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

        await updateUsersTotalExpense({ userId }, res);

        return sendSuccessResp(res, 201, 'New expense added!', newExpense);

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const deleteExpense =async ({ expenseId, userId }, res) => {

    try {
        const user = await AuthCheck.findByPk(userId);

        if(!user) {
            return sendErrorResp(res, 404, 'User not found!');
        }

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
        await updateUsersTotalExpense({ userId }, res);

        return sendSuccessResp(res, 200, 'Expense deleted successfully!');

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

module.exports = {
    getAllExpense,
    postExpenses,
    deleteExpense,
    getExpenseById,
    getUpdateById,
    updateUsersTotalExpense
}