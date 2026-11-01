
const usersService = require('../service/usersService');

const allUsers = (req, res) => {
    const allUsers = usersService.getAllUsers();

    return res.status(200).json({
        message: 'Fetching all users',
        totalUsers: allUsers.length,
        allUsers
    });
}

const getUsersById = (req, res) => {
    const user = usersService.getUsersById(Number(req.params.id));

    if(!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    return res.status(200).json({
        message: 'User found',
        user
    });
}

const postUser = (req, res) => {
    const { name, email } = req.body;

    if(
        typeof name !== 'string' || 
        !name.trim() || 
        typeof email !== 'string' || 
        !email.trim()
    ) {
        return res.status(400).json({
            message: 'Please fill name and email correctly!'
        });
    }

    const user = usersService.postUser({ name, email });

    return res.status(201).json({
        message: 'User created successfully',
        user
    });
}

module.exports = {
    allUsers,
    getUsersById,
    postUser
}