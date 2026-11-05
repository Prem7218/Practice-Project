
const usersService = require('../services/usersService');
const { sendErrorResp } = require('../utils/response');

const allUsers = (req, res) => {
    console.log('Hellos');
    return usersService.getAllUsers(res);
}

const userById = (req, res) => {
    return usersService.getUserById({ userId: Number(req.params.id) }, res);
}

const postUser = (req, res) => {
    const { name, email } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim()
    ) {
        return sendErrorResp(
            res, 
            { 
                statusCode: 400, 
                message: 'Please name & email correctly' 
            },
            false
        );
    }

    return usersService.postUsers(
        { 
            name: name.trim(), 
            email: email.trim() 
        }, res
    );
}

module.exports = {
    allUsers,
    userById,
    postUser
};