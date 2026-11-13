
const authService = require('../services/authenticationService');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadAuthPage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'authenticationView.html'));
}

const verifyUser = (req, res) => {
    const {
        email,
        password
    } = req.query;

    if(typeof password !== 'string' || password.length < 8) { 
        return sendErrorResp(res, 400, 'Password length minimum 8 characters');
    }

    if(typeof email !== 'string' || !email.trim()) {
        return sendErrorResp(res, 400, 'invalid email');
    }

    const trimEmail= email.trim();
    const trimPass = password.trim();

    if(trimPass.length < 8) { 
        return sendErrorResp(res, 400, 'Password length minimum 8 characters');
    }

    return authService.getVerifyUser({ 
        email: trimEmail,
        password: trimPass
    }, res);
}

const registerUser = (req, res) => {
    const {
        name, 
        email,
        phone,
        password
    } = req.body;

    if(typeof password !== 'string' || password.length < 8) { 
        return sendErrorResp(res, 400, 'Password length minimum 8 characters');
    }

    if(
        typeof name !== 'string' || !name.trim() || 
        typeof email !== 'string' || !email.trim() ||
        typeof phone !== 'string' || !phone.trim() || phone.length !== 10
    ) {
        return sendErrorResp(res, 400, 'invalid name or email or phone number');;
    }

    const trimName = name.trim();
    const trimEmail= email.trim();
    const trimPhone= phone.trim();
    const trimPass = password.trim();

    if(trimPass.length < 8) { 
        return sendErrorResp(res, 400, 'Password length minimum 8 characters');
    }

    return authService.getRegisterUser({
        name: trimName,
        email: trimEmail,
        phone: trimPhone,
        password: trimPass
    }, res);
}

module.exports = {
    verifyUser,
    loadAuthPage,
    registerUser
}