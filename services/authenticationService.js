
const { sendErrorResp, sendSuccessResp } = require('../utils/response');
const bcrypt = require('bcrypt');
const AuthCheck = require('../models/authModel');

const getVerifyUser =async ({ email, password }, res) => {
    
    try {
        const user = await AuthCheck.findOne({
            where: { email }
        });

        if(!user) {
            return sendSuccessResp(res, 401, 'Invalid email or password');
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordMatch) {
            return sendSuccessResp(res, 401, 'Invalid email or password');
        }

        return sendErrorResp(res, 200, 'Login Successful!');

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const getRegisterUser =async ({ name, email, phone, password }, res) => {

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await AuthCheck.create({
            name, 
            email,
            phone,
            password: hashedPassword
        });

        return sendSuccessResp(res, 201, 'New Account Created!');

    } catch(error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            return sendSuccessResp(res, 201, 'User already present! use another email');
        }

        return sendErrorResp(res, 500, error.message);
    }
}

module.exports = {
    getVerifyUser,
    getRegisterUser
}