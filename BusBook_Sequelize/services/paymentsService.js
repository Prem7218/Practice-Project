
const Bookings = require('../modules/bookingsModule');
const Payments = require('../modules/payments');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');

const showAllPayments = async (res) => {
    
    try {
        const payments = await Payments.findAll({
            include: [{
                model: Bookings,
                as: 'booking'
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

const postPayment = async ({
        bookingId, 
        amount, 
        payMethod, 
        payStatus, 
        transactionId, 
        payDate 
    }, res) => {

    try {
        const booking = await Bookings.findByPk(bookingId);

        if(!booking) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'Booking not found!'
            });
        }

        const payment = await Payments.create({ 
            bookingId, 
            amount, 
            payMethod, 
            payStatus, 
            transactionId, 
            payDate 
        });

        return sendSuccessResp(
            res, 
            200, 
            'Payment Added!', 
            payment
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