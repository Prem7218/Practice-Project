
const studentService = require('../services/studentsService');
const { sendErrorResp } = require('../utils/response');

const allStudents = (req, res) => {
    return studentService.getAllStudents(res);
}

const studentById = (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'Student id is wrong!'
            },
            false
        )
    }

    return studentService.getStudentById(
        { 
            studentId: id 
        }, 
        res
    );
}

const postStudents = (req, res) => {
    const { name, email } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim()
    ) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'Student details is wrong!'
            },
            false
        );
    }

    return studentService.postStudents(
        {
            name,
            email
        },
        res
    );
}

module.exports = {
    allStudents,
    studentById,
    postStudents
}