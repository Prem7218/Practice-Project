
const { Cashfree } = require("cashfree-pg");

const cashfree = new Cashfree(
    Cashfree.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
);

const createOrder = async (
    orderId,
    orderAmount,
    customerID,
    customerPhone
) => {
    try {
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
        const formattedExpiryDate = expiryDate.toISOString();

        const request = {
            order_id: orderId,
            order_amount: orderAmount,
            order_currency: "INR",

            customer_details: {
                customer_id: customerID,
                customer_phone: customerPhone
            },
            order_meta: {
                "return_url": `http://localhost:5000/payroute/payment-status/"${orderId}`,
            },

            order_expiry_time: formattedExpiryDate,
        };

        const response = await cashfree.PGCreateOrder(request);

        return response.data;

    } catch(error) {
        console.log(`Error creating order: `, error.message);
    }
};

const getPaymentStatus = async (orderId) => {
    
    const response = await cashfree.PGOrderFetchPayments(orderId);
    return response.data;
}

module.exports = {
    createOrder,
    getPaymentStatus
}

