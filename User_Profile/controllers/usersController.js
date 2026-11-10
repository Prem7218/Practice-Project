
const usersService = require('../services/usersService');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadDetailPage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
}

const loadProfilePage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'usersProfile.html'));
}

const allUsers = (req, res) => {
    return usersService.getAllUsers(res);
}

const userByName = (req, res) => {
    const { name } = req.query;

    if(typeof name !== 'string' || !name.trim()) {
        return sendErrorResp(
            res, {
                statusCode: 400,
                message: 'Invalid name!'
            }
        )
    }

    return usersService.getUserByName({ name: name.trim() }, res);
}

// const userById = (req, res) => {
//     const userId = Number(req.params.id);

//     if(!Number.isInteger(userId) || userId <= 0) {
//         return sendErrorResp(
//             res, {
//                 statusCode: 400,
//                 message: 'Invalid userId!'
//             }
//         )
//     }

//     return usersService.getUserById({ userId }, res);
// }

const postUsers = (req, res) => {

    console.log('Content-Type:', req.headers['content-type']);
    console.log('Request Body:', req.body);

    if (!req.body || typeof req.body !== 'object') {
        return sendErrorResp(res, {
            statusCode: 400,
            message: 'Request body is missing!'
        });
    }

    const { 
        name, dob, imgUrl, birthPlace, 
        career, match, score, fifties, 
        centuries, wickets, average 
    } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof imgUrl !== 'string' || !imgUrl.trim() ||
        typeof birthPlace !== 'string' || !birthPlace.trim() ||
        typeof career !== 'string' || !career.trim() 
    ) {
        return sendErrorResp(
            res, {
                statusCode: 400,
                message: 'Please fill details correctly!'
            }
        )
    }

    return usersService.postUser({ 
        name, dob, imgUrl, birthPlace, 
        career, match, score, fifties, 
        centuries, wickets, average 
    }, res);
}

module.exports = {
    userByName,
    postUsers,
    // userById,
    allUsers,
    loadProfilePage,
    loadDetailPage
}