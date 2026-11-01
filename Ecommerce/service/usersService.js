
let users = [];

const getAllUsers = () => {
    return users;
}

const getUsersById = (id) => {
    return users.find(user => user.id === id);
}

const postUser = (user) => {
    
    const newUser = {
        id: users.length + 1,
        name: user.name.trim(),
        email: user.email.trim()
    };

    users.push(newUser);
    return newUser;
}

module.exports = {
    getAllUsers,
    getUsersById,
    postUser
}