
const db = require('../utils/sequelizeDB');
const Users = require('../models/usersModel');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const allUsers =async (res) => {

    try {
        const useres = await Users.findAll();

        if(useres.length === 0) {
            return sendErrorResp(res, 404, 'No user found!');
        }

        return sendSuccessResp(res, 200, 'all users', useres);

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const postUsers =async ({ name, balance }, res) => {

    try {
        await Users.create({
            name, balance
        });

        return sendSuccessResp(res, 201, 'New user created!');

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const sendMoneyToSecond =async ({ recieverId, senderId, amount }, res) => {

    let transaction;

    try {
        transaction = await db.transaction();

        const user2 = await Users.findByPk(senderId, {transaction});

        if(!user2) {
            await transaction.rollback();
            return sendErrorResp(res, 404, 'sender not found!');
        }

        const user1 = await Users.findByPk(recieverId, {transaction});
    
        if(!user1) {
            await transaction.rollback();
            return sendErrorResp(res, 404, 'Receiver not found!');
        }

        if(user2.balance < amount) {
            await transaction.rollback();
            return sendErrorResp(res, 400, 'Insufficient balance!');
        }

        user2.balance -= amount;
        await user2.save({transaction});

        user1.balance += amount;
        await user1.save({transaction});

        await transaction.commit();

        return sendSuccessResp(res, 200, 'Money Transfer Successfully!');

    } catch(error) {

        if (transaction && !transaction.finished) {
            await transaction.rollback();
        }

        return sendErrorResp(res, 500, error.message);
    }
}

module.exports = {
    allUsers,
    postUsers,
    sendMoneyToSecond
}