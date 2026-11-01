
const path = require('path');
const { getAllUsers, getUserById, postUser } = require('../service/usersService');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');

const usersPage = (req, res) => {
    return res.sendFile(path.join(__dirname, "..", 'view', "users.html"));
}

const allUsers = (req, res) => {
    const users = getAllUsers();

    return sendSuccessResp(res, 200, 'Users fetched successfully', users);
}

const userById = (req, res) => {
    const user = getUserById(Number(req.params.id));

    if(!user) {
        return sendErrorResp(res, { statusCode: 404, message: 'user not found!' });
    }

    return sendSuccessResp(res, 200, 'UserById Found', user);
}

const postUsers = (req, res) => {
    const { name } = req.body;

    if(typeof name !== 'string' || !name.trim()) {
        return sendErrorResp(res, { statusCode: 400, message: 'filled name is wrong' });
    }

    const newUser = postUser({ name: name.trim() });
    return sendSuccessResp(res, 201, 'Users new product added successfully', newUser);
}

module.exports = {
    usersPage,
    allUsers,
    userById,
    postUsers
}