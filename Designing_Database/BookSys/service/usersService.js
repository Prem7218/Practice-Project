
const db = require('../utils/DBConnection');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const getAllUsers = (res) => {
    const getUsers = `
        SELECT * FROM Users
    `;

    db.execute(getUsers, (error, result) => {
        if(error) {
            console.error(error.message);
            return sendErrorResp(res, { statusCode: 500, message: 'Internal server error!' });
        }

        if(result.length === 0) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: ' No users found' 
            });
        }

        return sendSuccessResp(res, 200, 'Here are All Users', result);
    });
};

const postUsers = ({ email, name }, res) => {

    const insertUser = `
        INSERT INTO Users (email, name)
        VALUES (?, ?)
    `;

    db.execute(insertUser, [email, name], (error, result) => {
        if(error) {
            console.log(error.message);
    
            return sendErrorResp(res, { statusCode: 400, message: 'Somthing Went Wrong!' }); 
        }

        return sendSuccessResp(
            res, 
            201, 
            `new user created: ${name}`, 
            {
                userId: result.insertId,
                name, 
                email
            }
        );
    });
};

module.exports = {
    getAllUsers,
    postUsers
};