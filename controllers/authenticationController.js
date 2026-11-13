
const authService = require('../services/authenticationService');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadAuthPage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'authenticationView.html'));
}

const verifyUser = (req, res) => {
    const {
        email
    } = req.query;

    if(typeof email!== 'string' || !email.trim()) {
        return sendErrorResp(res, 400, 'invalid email');
    }

    return authService.getVerifyUser({ 
        email: email.trim() 
    }, res);
}

const registerUser = (req, res) => {
    const {
        name, 
        email,
        phone
    } = req.body;

    if(
        typeof name !== 'string' || !name.trim() || 
        typeof email !== 'string' || !email.trim() ||
        typeof phone !== 'string' || !phone.trim() || phone.length !== 10
    ) {
        return sendErrorResp(res, 400, 'invalid name or email or phone number');;
    }

    return authService.getRegisterUser({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim()
    }, res);
}

module.exports = {
    verifyUser,
    loadAuthPage,
    registerUser
}