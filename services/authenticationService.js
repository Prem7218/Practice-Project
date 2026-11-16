
const { sendErrorResp, sendSuccessResp } = require('../utils/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { fn, col, literal } = require('sequelize');
const { AuthCheck } = require('../models/relation_models/relation');

const getAllUsers = async (res) => {

    try {
        const users = await AuthCheck.findAll({
            attributes: ['name', 'totalExpense'],
            order: [['totalExpense', 'DESC']]
        });

        return sendSuccessResp(res, 200, 'Users fetched successfully', users);

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

// const getAllUsers =async (res) => {

//     try {
//         const users = await AuthCheck.findAll({
//             attributes: [
//                 'userId',
//                 'name',
//                 [fn('COALESCE',
//                     fn('SUM', col('expenses.expense')),
//                     0
//                 ), 'totalExpense']
//             ],
//             include: [
//                 {
//                     model: Expense,
//                     as: 'expenses',
//                     attributes: [],
//                     required: false
//                 }
//             ],
//             group: ['AuthCheck.userId'],
//             order: [
//                 [literal('totalExpense'), 'DESC']
//             ],
//             raw: true
//         });

//         return sendSuccessResp(res, 200, 'Users fetched successfully', users);
//     } catch(error) {
//         return sendErrorResp(res, 500, error.message);
//     }
// }

const getVerifyUser =async ({ email, password }, res) => {
    
    try {
        const user = await AuthCheck.findOne({
            where: {
                email
            }
        });

        if(!user) {
            return sendErrorResp(res, 401, 'Invalid email or password');
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordMatch) {
            return sendErrorResp(res, 401, 'Invalid email or password');
        }

        const token = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return sendSuccessResp(
            res,
            200,
            'Login successful!',
            { token }
        );

    } catch(error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const getRegisterUser =async ({ name, email, phone, password }, res) => {

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await AuthCheck.create({
            name, 
            email,
            phone,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: newUser.userId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return sendSuccessResp(res, 201, 'New Account Created!', { token });

    } catch(error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            return sendErrorResp(res, 401, 'User already present! use another email');
        }

        return sendErrorResp(res, 500, error.message);
    }
}

module.exports = {
    getAllUsers,
    getVerifyUser,
    getRegisterUser
}