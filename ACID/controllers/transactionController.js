
const { sendErrorResp } = require('../utils/response');
const transactionService = require('../services/transactionService');

const getAllTransaction = (req, res) => {
    return transactionService.allUsers(res);
}

const postTransaction = (req, res) => {
    const { name, balance } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        !Number.isInteger(balance) || balance < 0
    ) {
        return sendErrorResp(res, 400, 'Invalid name OR balance');
    }

    return transactionService.postUsers({ name, balance }, res);
}

const sendMoney = (req, res) => {
    const { senderId, recieverId, amount } = req.body;

    if(
        !Number.isInteger(senderId) || senderId <= 0 ||
        !Number.isInteger(recieverId) || recieverId <= 0 ||
        !Number.isInteger(amount) || amount < 0
    ) {
       return sendErrorResp(res, 400, 'Invalid receiverId OR SenderId OR balance'); 
    }

    if (senderId === recieverId) {
        return sendErrorResp(
            res,
            400,
            'Sender and receiver cannot be the same!'
        );
    }

    return transactionService.sendMoneyToSecond({ recieverId, senderId, amount }, res);
}

module.exports = {
    getAllTransaction,
    postTransaction,
    sendMoney
}