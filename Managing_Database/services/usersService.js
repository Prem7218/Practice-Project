
const { sendErrorResp, sendSuccessResp } = require('../utils/response');
const db = require('../utils/DBConnection');

const getAllUsers = (res) => {
    
    try {
        const query = `SELECT * FROM Users`;

        db.execute(query, (error, result) => {
            if(error) {
                console.error(error.message);
                return sendErrorResp(res, 500, 'Internal server error!');
            }

            if(result.length === 0) {
                return sendErrorResp(res, 404, 'User not found!')
            }

            return sendSuccessResp(res, 200, 'Here all users', result);
        });

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const postUsers = ({ name, email }, res) => {
    
    try {
        const query = `
            INSERT INTO Users (name, email)
            VALUES (?, ?)
        `;

        db.execute(query, [name, email], (error, result) => {
            if(error) {
                console.error(error.message);
                return sendErrorResp(res, 500, 'Internal server error!');
            }

            return sendSuccessResp(res, 201, 'new user created', result);
        });
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const deleteUsers = ({ userId }, res) => {

    try {
        const query = `
            DELETE FROM Users
            WHERE userId = ?
        `;

        db.execute(query, [userId], (error, result) => {
            if(error) {
                console.error(error.message);
                return sendErrorResp(res, 500, 'Internal server error!');
            }

            return sendSuccessResp(res, 200, 'User deleted! successfully', result);
        })

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const updateUsers = ({ name, email, userId }, res) => {

    try {
        const query = `
            UPDATE Users
            SET name = ?, email = ?
            WHERE userId = ${userId}
        `;

        db.execute(query, [name, email], (error, result) => {
            if(error) {
                console.error(error.message);
                return sendErrorResp(res, 500, 'Internal server error!');
            }

            return sendSuccessResp(res, 200, 'User updated successfully!', result);
        });

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