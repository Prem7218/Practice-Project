
const paymentService = require('../services/paymentsService');
const { sendErrorResp } = require('../utils/response');

const allPayments = (req, res) => {
    return paymentService.showAllPayments(res);
}

const postPayment = (req, res) => {
    const { 
        bookingId,
        amount,
        payMethod,
        payStatus,
        transactionId,
        payDate
    } = req.body;

    return paymentService.postPayment({
        bookingId,
        amount,
        payMethod,
        payStatus,
        transactionId,
        payDate
    }, res);
}

module.exports = {
    allPayments,
    postPayment
};