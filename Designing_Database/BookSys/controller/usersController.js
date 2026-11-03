
const userService = require('../service/usersService');
const { sendErrorResp } = require('../utils/response');

// const loadUsersPage = (req, res) => {
//     return res.sendFile(path.join(__dirname, '..', 'view', 'users.html'));
// }

const allUsers = (req, res) => {
    return userService.getAllUsers(res);
}

const postUser = (req, res) => {
    const { name, email } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim()
    ) {
        return sendErrorResp(res, { statusCode: 400, message: 'Fill details correctly' });
    }

    return userService.postUsers(
        { 
            email: email.trim(), 
            name: name.trim() 
        }, 
        res
    );
};

module.exports = {
    allUsers,
    postUser
}