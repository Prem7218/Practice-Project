
const studentServices = require('../services/studentsService');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadStudnetPage = (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "view", 'students.html'));
}

const postStudnets = (req, res) => {
    const { name, email } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim()
    ) {
        return sendErrorResp(res, { statusCode: 400, message: `Fill details correctly` });
    }

    return studentServices.postStudent({ name: name.trim(), email: email.trim() }, res);
}

const updateStudents = (req, res) => {
    const studentId = Number(req.params.id);
    const { name, email } = req.body;

    if(!Number.isInteger(studentId) || studentId <= 0) {
        return sendErrorResp(res, {
            statusCode: 400,
            message: 'Invalid student ID'
        });
    }

    if(typeof email !== 'string' || !email.trim()) {
        return sendErrorResp(res, {
            statusCode: 400,
            message: 'Invalid student email id'
        });
    }

    if(typeof name !== 'string' || !name.trim()) {
        return sendErrorResp(res, { 
            statusCode: 400, 
            message: 'Enter a valid student name'
        });
    }

    return studentServices.updateStudentName({ 
        name: name.trim(), 
        email: email.trim(),
        studentId 
    }, res);
};

const deleteStudents = (req, res) => {
    return studentServices.deleteStudentById({ studentId: Number(req.params.id) }, res);
}

module.exports = {
    loadStudnetPage,
    postStudnets,
    updateStudents,
    deleteStudents
}