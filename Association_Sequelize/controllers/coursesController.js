
const courseService = require('../services/coursesService');
const { sendErrorResp } = require('../utils/response');

const allCourses = (req, res) => {
    return courseService.getAllCourses(res);
}

const postCourse = (req, res) => {
    const { courseName, studentId } = req.body;

    if(
        typeof courseName !== 'string' || !courseName.trim() ||
        !Number.isInteger(studentId) || studentId <= 0
    ) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'Please enter correct courseName & studentId'
            },
            false
        );
    }

    return courseService.postCourses(
        {
            courseName: courseName.trim(),
            studentId
        },
        res
    );
}

module.exports = {
    allCourses,
    postCourse
}