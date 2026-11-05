
const Expense = require('../modules/expenseModule');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');

const getAllExpense = async (res) => {
    
    try {
        const expenses = await Expense.findAll();

        return sendSuccessResp(
            res,
            200,
            expenses.length === 0
                ? 'No expenses found!'
                : 'Here all expenses',
            expenses
        );

    } catch(error) {
        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Internal Server Error!'
            }
        );
    }
}

const getExpenseByIds = async ({ id }, res) => {

    try {
        const expense = await Expense.findByPk(id);

        if(!expense) {
            return sendErrorResp(
                res,
                {
                    statusCode: 404,
                    message: 'expense not found!'
                }
            );
        }

        return sendSuccessResp(
            res,
            200,
            'Expense retrieved successfully!',
            expense
        );        

    } catch(error) {
        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Internal Server Error!'
            }
        );
    }
}

const postExpense =async ({ amount, search, category }, res) => {

    try {
        const expense = await Expense.create({
            amount, search, category
        });

        return sendSuccessResp(
            res,
            201,
            'New expense created!',
            expense
        );        

    } catch(error) {
        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Internal Server Error!'
            }
        );
    }
}

const updateExpenses = async ({ amount, search, category, id }, res) => {

    try {
        const [expense] = await Expense.update(
            { amount, search, category },
        {
            where: {
                id: id
            }
        });

        if(expense === 0) {
            return sendErrorResp(
                res,
                {
                    statusCode: 404,
                    message: 'expense not found!'
                }
            );
        }

        return sendSuccessResp(
            res,
            200,
            'Expense updated successfully!',
            expense
        );    

    } catch(error) {
        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Internal Server Error!'
            }
        );
    }
}

const deleteExpenses = async ({ id }, res) => {

    try {
        const expense = await Expense.findByPk(id);

        if(!expense) {
            return sendErrorResp(
                res,
                {
                    statusCode: 404,
                    message: 'expense not found!'
                }
            );
        }

        await Expense.destroy({
            where: {
                id: id
            }
        })

        return sendSuccessResp(
            res,
            200,
            'Expense deleted successfully!',
        );

    } catch(error) {
        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Internal Server Error!'
            }
        );
    }
}

module.exports = {
    getAllExpense,
    postExpense,
    getExpenseByIds,
    updateExpenses,
    deleteExpenses
}