
const { sendSuccessResp, sendErrorResp } = require('../utils/response');
const { Users, Bookings } = require('../relation_modle/relation');

const getAllUsers = async (res) => {
    
    try {
        const users = await Users.findAll({
            include: [{
                model: Bookings,
                as: 'bookings'
            }]
        });

        return sendSuccessResp(
            res, 
            200, 
            'Users are all here!', 
            users
        );

    } catch(err) {
        console.error(err.message);
        return sendErrorResp(
            res, 
            { 
                statusCode: 500, 
                message: 'Internal server error!' 
            },
            false
        );
    }
}

const getUserById = async ({ userId }, res) => {

    try {

        const user = await Users.findByPk(userId, {
            include: [{
                model: Bookings,
                as: 'bookings'
            }]
        });

        if(!user) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: 'Student not found' 
            }, false);
        }

        return sendSuccessResp(
            res, 
            200, 
            'User Is Present', 
            user
        );

    } catch(err) {
        console.error(err.message);
        return sendErrorResp(
            res, 
            { 
                statusCode: 500, 
                message: 'Internal server error!' 
            },
            false
        );
    }
}

const postUsers = async ({ name, email }, res) => {

    try {

        await Users.create({
            name,
            email
        });

        return sendSuccessResp(
            res,
            201,
            `new user created: ${name}`, 
            { name, email }
        );

    } catch(err) {
        console.error(err.message);
        return sendErrorResp(
            res, 
            { 
                statusCode: 500, 
                message: 'Internal server error!' 
            },
            false
        );
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    postUsers
}