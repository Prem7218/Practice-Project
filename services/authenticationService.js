
const { sendErrorResp, sendSuccessResp } = require('../utils/response');
const AuthCheck = require('../models/authModel');

const getVerifyUser =async ({ email, password }, res) => {
    
    try {
        const user = await AuthCheck.findByPk(email, {
            where: {
                password
            }
        });

        if(user) {
            return sendSuccessResp(res, 200, 'User Found');
        }

        return sendErrorResp(res, 404, 'User Not Found');

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const getRegisterUser =async ({ name, email, phone, password }, res) => {

    try {

        const user = await AuthCheck.findByPk(email);

        if(user) {
            const check = await AuthCheck.findOne({
                where: {
                    email,
                    password
                }
            })

            if(check) {
                return sendSuccessResp(res, 200, 'User already present! use another email');
            }
        }
        
        await AuthCheck.create({
            name,
            email, 
            phone,
            password
        });

        return sendSuccessResp(res, 201, 'New Account Created!');

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

module.exports = {
    getVerifyUser,
    getRegisterUser
}