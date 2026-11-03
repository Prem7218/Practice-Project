
const studentService = require('../services/studentsService');
const { sendErrorResp } = require('../utils/response');

const allUsers = (req, res) => {
    return studentService.getAllStudents(res);
}

const studentById = (req, res) => {
    return studentService.getStudentById(
        { 
            studentId: Number(req.params.id) 
        }, 
        res
    );
}

const postStud = (req, res) => {
    const { name, email, age } = req.body; 

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        !Number.isInteger(age) || age <= 0
    ) {
        return sendErrorResp(
            res, 
            {
                statusCode: 400,
                message: 'Provide name, email, age in correct type'
            }
        );
    }

    return studentService.postStudent(
        { 
            name: name.trim(),
            email: email.trim(),
            age: age
        },
        res
    )
}

const updateStud = (req, res) => { 
    const { name, email, age } = req.body; 

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        !Number.isInteger(age) || age <= 0
    ) {
        return sendErrorResp(
            res, 
            {
                statusCode: 400,
                message: 'Provide name, email, age in correct type'
            }
        );
    }

    return studentService.updateStudent(
        { 
            name: name.trim(),
            email: email.trim(), 
            age,
            studentId: Number(req.params.id)
        },
        res
    );
}

const deleteStud = (req, res) => {
    return studentService.deleteStudent(
        {
            studentId: Number(req.params.id)
        },
        res
    );
}

module.exports = {
    allUsers,
    studentById,
    postStud,
    updateStud,
    deleteStud
};