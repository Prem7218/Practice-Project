
const { Students, Courses, Subjects } = require('../modulesRelations/student_course_subject');
const { 
    sendSuccessResp, 
    sendErrorResp 
} = require('../utils/response');

const getAllStudents = async (res) => {
    
    try {
        const students = await Students.findAll({
            include: [
                {
                    model: Courses,
                    as: 'courses'
                },
                {
                    model: Subjects,
                    as: 'subjects'
                }
            ]
        });
        
        return sendSuccessResp(
            res, 
            200, 
            'Here are all students',
            students
        );

    } catch (error) {
        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Internal server error!'
            },
            false
        );
    }
}

const getStudentById = async ({ studentId }, res) => {

    try {
        const student = await Students.findByPk(studentId, {
            include: [
                {
                    model: Courses,
                    as: 'courses'
                },
                {
                    model: Subjects,
                    as: 'subjects'
                }
            ]
        });

        if (!student) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'Student not found!'
            });
        }

        return sendSuccessResp(
            res, 
            200, 
            `Student With id ${studentId}`,
            student
        );

    } catch (error) {
        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Internal server error!'
            },
            false
        );
    }
}

const postStudents = async ({ name, email }, res) => {

    try {
        const student = await Students.create(
            { name, email }
        );

        return sendSuccessResp(
            res,
            201,
            `new student with name ${name}`,
            student
        );

    } catch (error) {
        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Internal server error!'
            },
            false
        );
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    postStudents
};