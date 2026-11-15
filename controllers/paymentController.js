
const {
    createOrder,
    getPaymentStatus
} = require('../services/paymentService.cjs');

const path = require('path');

const loadPaymentPage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'cashfreePayment.html'));
}

const processPayment = async (req, res) => {
    try {
        const orderId = "ORDER-" + Date.now();

        const orderAmount = 2000;
        const customerID = "1";
        const customerPhone = "9999999999";

        const order = await createOrder(
            orderId,
            orderAmount,
            customerID,
            customerPhone
        );

        return res.status(200).json({
            paymentSessionId: order.payment_session_id,
            orderId
        })

    } catch(error) {
        console.log("Error processing payment: ", error.message);

        res.status(500).json({
            message: "Error processing payment"
        });
    }
};

const paymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await getPaymentStatus(orderId);

        return res.status(200).json({
            orderId: order.order_id,
            orderStatus: order.order_status
        });
    } catch (error) {
        console.error('Status Error:', error.response?.data || error.message);

        return res.status(500).json({
            message: 'Unable to fetch payment status'
        });
    }
}

module.exports = {
    processPayment,
    paymentStatus,
    loadPaymentPage
};