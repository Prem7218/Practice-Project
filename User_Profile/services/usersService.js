
const Users = require('../models/usersModel');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const getAllUsers = async (res) => {

    try {
        const users = await Users.findAll();

        if(users.length === 0) {
            return sendErrorResp(
                res, {
                    statusCode: 404,
                    message: 'no User found'
                }
            );
        }

        return sendSuccessResp(
            res, 
            200,
            'Users are found!',
            users
        );

    } catch(error) {
        console.error(error);
        return sendErrorResp(
            res, {
                statusCode: 500,
                message: 'Internal server error!'
            }
        )
    }
}

const getUserByName = async ({ name }, res) => {

    try {
        const user = await Users.findOne({
            where: { 
                name: name
            }
        });

        if(!user) {
            return sendErrorResp(
                res, {
                    statusCode: 404,
                    message: 'User not found'
                }
            );
        }

        return sendSuccessResp(
            res, 
            200,
            'User is found!',
            user
        );

    } catch(error) {
        console.error(error);
        return sendErrorResp(
            res, {
                statusCode: 500,
                message: 'Internal server error!'
            }
        )
    }
}

const postUser = async (
    { 
        name, dob, imgUrl, birthPlace, 
        career, match, score, fifties, 
        centuries, wickets, average 
    }, res) => {

    try {
        

        const user = await Users.create(
            { 
                name, dob, imgUrl, birthPlace, 
                career, match, score, fifties, 
                centuries, wickets, average 
            }
        );

        return sendSuccessResp(
            res,
            201, 
            'New user created!',
            user
        );

    } catch(error) {
        console.error(error);
        return sendErrorResp(
            res, {
                statusCode: 500,
                message: 'Internal server error!'
            }
        )
    }
}

const getUserById = async ({ userId }, res) => {

    try {
        const user = await Users.findByPk(userId);

        if(!user) {
            return sendErrorResp(
                res, {
                    statusCode: 404,
                    message: 'User not found'
                }
            );
        }

        return sendSuccessResp(
            res, 
            200,
            'User is found!',
            user
        );

    } catch(error) {
        console.error(error);
        return sendErrorResp(
            res, {
                statusCode: 500,
                message: 'Internal server error!'
            }
        )
    }
}

module.exports = {
    getUserByName,
    postUser,
    getUserById,
    getAllUsers
}