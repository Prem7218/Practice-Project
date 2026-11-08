
const usersService = require('../services/usersService');
const { sendErrorResp } = require('../utils/response');

const allUsers = (req, res) => {
    return usersService.getAllUsers(res);
}

const postUser = (req, res) => {
    const { name, email } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim()
    ) {
        return sendErrorResp(res, 400, 'invalid name or email');
    }

    return usersService.postUsers({ name: name.trim(), email: email.trim() }, res);
}

const deleteUser = (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(res, 400, 'invalid user id!');
    }

    return usersService.deleteUsers({ userId: id}, res);
}

const updateUser = (req, res) => {
    const { name, email } = req.body;
    const id = Number(req.params.id);

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        !Number.isInteger(id) || id <= 0
    ) {
        return sendErrorResp(res, 400, 'invalid name or email');
    }

    return usersService.updateUsers(
        { 
            name: name.trim(), 
            email: email.trim(), 
            userId: id 
        }, res
    );
}

module.exports = {
    allUsers,
    postUser,
    updateUser,
    deleteUser
}