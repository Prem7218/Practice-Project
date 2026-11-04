
const { Students, Courses } = require('../modulesRelations/student_course');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');

const getAllCourses = async (res) => {
    
    try {
        const courses = await Courses.findAll({
            include: [
                {
                    model: Students,
                    as: 'students',
                    attributes: ['studentId', 'name', 'email']
                }
            ]
        });

        return sendSuccessResp(
            res,
            200,
            'Here are all courses',
            courses 
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

const postCourses = async ({ courseName, studentId }, res) => {

    try {
        const student = await Students.findByPk(studentId);

        if (!student) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'Student not found!'
            });
        }

        const course = await Courses.create({
            courseName,
            studentId
        });

        return sendSuccessResp(
            res,
            201,
            'New courses added!',
            course
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
    getAllCourses,
    postCourses
}