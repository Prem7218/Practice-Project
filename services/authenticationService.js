
const { sendErrorResp, sendSuccessResp } = require('../utils/response');
const AuthCheck = require('../models/authModel');

const getVerifyUser =async ({ email }, res) => {
    
    try {
        const user = await AuthCheck.findOne({
            where: {
                email
            }
        });

        if(user) {
            return sendSuccessResp(res, 200, 'User Found');
        }

        return sendErrorResp(res, 404, 'User Not Found');

    } catch(error) {
        return sendErrorResp(res, 500, error);
    }
}

const getRegisterUser =async ({ name, email, phone }, res) => {

    try {
        const newAccount = await AuthCheck.create({
            name,
            email, 
            phone
        });

        return sendSuccessResp(res, 201, 'New Account Created!');

    } catch(error) {
        return sendErrorResp(res, 500, error);
    }
}

module.exports = {
    getVerifyUser,
    getRegisterUser
}