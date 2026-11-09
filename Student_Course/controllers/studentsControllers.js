
const studentService = require('../services/studentsServices');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadStudentsView = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'studentsView.html'));
}

const allStudents = (req, res) => {
    return studentService.getAllStudents(res);
}

const postStudent = (req, res) => {
    const { name, email } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim()
    ) {
        return sendErrorResp(res, 400, 'invalid name or email');
    }

    return studentService.postStudents({ name: name.trim(), email: email.trim() }, res);
}

const deleteStudent = (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(res, 400, 'invalid user id!');
    }

    return studentService.deleteStudent({ studentId: id}, res);
}

const updateStudent = (req, res) => {
    const { name, email } = req.body;
    const id = Number(req.params.id);

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        !Number.isInteger(id) || id <= 0
    ) {
        return sendErrorResp(res, 400, 'invalid name or email');
    }

    return studentService.updateStudent(
        { 
            name: name.trim(), 
            email: email.trim(), 
            studentId: id 
        }, res
    );
}

module.exports = {
    loadStudentsView,
    allStudents,
    postStudent,
    updateStudent,
    deleteStudent
}