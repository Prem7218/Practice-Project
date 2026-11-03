
// const db = require('../utils/DBConnnection');
const Student = require('../models/studentsModel');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');

const getAllStudents = async (res) => {

    try {
        const students = await Student.findAll({ 
            attributes: ['id', 'name', 'email', 'age'],
            raw: true
        });

        return sendSuccessResp(
            res, 
            200, 
            'Student are Here all', 
            students
        );

    } catch(error) {
        console.error(error.message);
        return sendErrorResp(
            res, { statusCode: 500, message: 'Internal server error!' }
        );
    }
}

const getStudentById = async ({ studentId }, res) => {
    
    try {
        const student = await Student.findByPk(studentId);
        
        if(!student) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: 'Student not found' 
            });
        }

        return sendSuccessResp(
            res, 
            200, 
            'Student Is Present', 
            student
        );
    } catch(error) {
        console.error(error.message);
        return sendErrorResp(
            res, { statusCode: 500, message: 'Internal server error!' }
        );
    }
}

const postStudent = async ({ name, email, age }, res) => {
    
    try {
        await Student.create({ name, email, age });

        return sendSuccessResp(
            res,
            201,
            `new user created: ${name}`, 
            { name, email, age }
        );

    } catch(error) {
        console.error(error);
        return sendErrorResp(res, { statusCode: 500, message: 'Internal server error!' });
    }
}

const updateStudent = async ({ name, email, age, studentId }, res) => {

    try {
        const [affectedRows] = await Student.update(
            { name, email, age },
            {
                where: {
                    id: studentId
                }
            }
        );
        
        if(affectedRows === 0) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: 'Student not found' 
            });
        }

        return sendSuccessResp(
            res, 
            200, 
            'Student has been updated', 
            { studentId, name, email, age }
        );
    } catch(error) {
        console.error(error.message);
        return sendErrorResp(res, { statusCode: 500, message: 'Internal server error!' });
    }
}

const deleteStudent = async ({ studentId }, res) => {
    
    try {
        const student = await Student.destroy({
            where: {
                id: studentId
            }
        });
        
        if(!student) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: 'Student not found' 
            });
        }
       
        return sendSuccessResp(
            res, 
            200, 
            'Student has been deleted',
            { studentId }
        );
    } catch(error) {
        console.error(error.message);
        return sendErrorResp(res, { statusCode: 500, message: 'Internal server error!' });
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    postStudent,
    updateStudent,
    deleteStudent
};