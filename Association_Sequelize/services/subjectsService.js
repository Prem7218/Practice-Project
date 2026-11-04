
const { Subjects, Courses, Students } = require('../modulesRelations/student_course_subject');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');

const getAllSubjects = async (res) => {

    try {
        const subjects = await Subjects.findAll({
            include: [
                {
                    model: Students,
                    as: 'student'
                }, 
                {
                    model: Courses,
                    as: 'course'
                }
            ]
        });

        return sendSuccessResp(
            res,
            200,
            'Here are all subjects!',
            subjects
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

const postSubjects = async ({ subName, courseId, studentId }, res) => {

    try {
        const student = await Students.findByPk(studentId);

        if (!student) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'Student not found!'
            });
        }

        const course = await Courses.findByPk(courseId);

        if (!course) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'Course not found!'
            });
        }

        const subject = await Subjects.create({
            subName,
            courseId,
            studentId
        });

        return sendSuccessResp(
            res,
            201,
            'New subject added!',
            subject
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
    getAllSubjects,
    postSubjects
}