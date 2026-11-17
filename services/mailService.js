const {ForgotPasswordRequests, AuthCheck} = require("../models/relation_models/relation");
const { sendErrorResp, sendSuccessResp } = require("../utils/response");
const { v4: uuidv4 } = require('uuid');
const Sib = require('sib-api-v3-sdk');
const path = require('path');
const fs = require('fs');

const forgetPasswordRequest =async (email, res) => {

    try {
        const user = await AuthCheck.findOne({
            where: {
                email
            }
        });

        if(!user) {
            return sendErrorResp(
                res, 
                404, 
                'Receiver email is wrong!'
            );
        }
        
        const id = uuidv4();

        await ForgotPasswordRequests.create({
            id,
            userId: user.userId,
            isactive: true
        });

        const resetUrl = `http://localhost:5000/forget/resetpassword/${id}`;

        try {
            await sendMail({
                sender: 'premradheshyammahajan@gmail.com',
                receiver: email,
                message: 'Click the button to reset your password.',
                resetUrl
            });

            console.log('Email sent successfully');

        } catch(error) {
            console.error('Mail sending failed:', error.message);
        }

        return sendSuccessResp(
            res, 
            200, 
            'Password reset request created successfully', 
            resetUrl
        );

    } catch(error) {
        console.error(error);

        return sendErrorResp(
            res,
            500,
            error.message
        );
    }
}

const sendMail =async ({ sender, receiver, message, resetUrl }, res) => {

    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const htmlTemplate = fs.readFileSync(
        path.join(__dirname, '..', 'views', 'forgetPassword.html'),
        'utf-8'
    );

    const finalHtml = htmlTemplate.replace(
        '{{RESET_URL}}',
        resetUrl
    );

    const senderDetails = {
        email: sender,
        name: 'CodeWheelr India'
    };

    const receivers = [{
        email: receiver,
        name: 'Subscriber'
    }];

    return await tranEmailApi.sendTransacEmail({
        sender: senderDetails,
        to: receivers,
        subject: 'Reset Your Password - CodeWheelr India',
        htmlContent: finalHtml,
        textContent: message
    });
}

module.exports = {
    forgetPasswordRequest,
    sendMail
}