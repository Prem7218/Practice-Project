
const { sendErrorResp, sendSuccessResp } = require('../utils/response');
const { Users } = require('../relation_models/relations'); 

const getAllUsers = async (res) => {
    
    try {
        const users = await Users.findAll();

        if(users.length === 0) {
            return sendErrorResp(res, 404, 'User not found!')
        }   

        return sendSuccessResp(res, 200, 'Here all users', users);

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const postUsers = async ({ name, email }, res) => {
    
    try {
        const user = await Users.create({
            name, email
        });

        return sendSuccessResp(res, 201, 'new user created', user);
    
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const deleteUsers = async ({ userId }, res) => {

    try {
        const user = await Users.destroy({
            where: {
                UserId: userId
            }
        });
        
        if(!user) {
            console.error(error.message);
            return sendErrorResp(res, 404, 'user not found!');
        }

        return sendSuccessResp(res, 200, 'User deleted! successfully', user);
   
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const updateUsers = async ({ name, email, userId }, res) => {

    try {
        const user = await Users.update({
            name, email
        }, {
            where: {
                UserId: userId
            }
        });
        
        return sendSuccessResp(res, 200, 'User updated successfully!', user);
        
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

module.exports = {
    getAllUsers,
    postUsers,
    deleteUsers,
    updateUsers
}