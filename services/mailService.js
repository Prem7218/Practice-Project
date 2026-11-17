const { sendErrorResp } = require("../utils/response");
const fs = require('fs');
const path = require('path');
const Sib = require('sib-api-v3-sdk');

const htmlTemplate = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'forgetPassword.html'),
    'utf-8'
);

const sendMail =async ({ sender, receiver, message }, res) => {

    try {
        const client = Sib.ApiClient.instance;

        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY;

        const tranEmailApi = new Sib.TransactionalEmailsApi();

        const senderDetails = {
            email: sender,
            name: 'CodeWheelr India'
        };

        const receivers = [
            {
                email: receiver,
                name: 'Subscriber'
            }
        ];

        const response = await tranEmailApi.sendTransacEmail({
                sender: senderDetails,
                to: receivers,
                subject: 'Reset Your Password - CodeWheelr India',
                htmlContent: htmlTemplate,
                textContent: message
            });

        console.log('Email sent successfully:', response);

        return response;

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server error');
    }
}

module.exports = {
    sendMail
}