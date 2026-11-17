
const mailService = require('../services/mailService');
const path = require('path');

const loadMailPage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'mail_password.html'));
}

const sendMail = async (req, res) => {

    const { email } = req.body;

     if(typeof email !== 'string' || !email.trim()) {
        return sendErrorResp(res, 400, 'Invalid senderId or receiverId or message');
    }

    await mailService.sendMail({
        sender: 'premradheshyammahajan@gmail.com',
        receiver: email.trim(),
        message: 'Please reset your password using the link provided.'
    }, res);
};

module.exports = {
    sendMail,
    loadMailPage
}