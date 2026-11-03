
const Bookings = require('../modules/bookingsModule');
const Payments = require('../modules/payments');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');

const showAllPayments = async (res) => {
    
    try {
        const payments = await Payments.findAll({
            include: [{
                model: Bookings
            }]
        });

        return sendSuccessResp(
            res, 
            200, 
            'Bookings are all here!', 
            payments
        );

    } catch(err) {
        console.error(err.message);
        return sendErrorResp(
            res, 
            { 
                statusCode: 500, 
                message: 'Internal server error!' 
            },
            false
        );
    }
}

const postPayment = async ({ bookingId, amount, payMethod, payStatus, transactionId, payDate }, res) => {

    try {

        await Payments.create(
            { bookingId, amount, payMethod, payStatus, transactionId, payDate }
        );

        return sendSuccessResp(
            res, 
            200, 
            'Payment Added!', 
            { bookingId, amount, payMethod, payStatus, transactionId, payDate }
        );

    } catch(err) {
        console.error(err.message);
        return sendErrorResp(
            res, 
            { 
                statusCode: 500, 
                message: 'Internal server error!' 
            },
            false
        );
    }
}

module.exports = {
    showAllPayments,
    postPayment
}