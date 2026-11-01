
let users = [];

const getAllUsers = () => {
    return users;
}

const getUserById = (id) => {
    return users.find(user => user.id === id);
}

const postUser = ({ name }) => {

    const newUser = {
        id: users.length + 1,
        name
    }

    users.push(newUser);
    return newUser;
}

module.exports = {
    getAllUsers,
    getUserById,
    postUser
}