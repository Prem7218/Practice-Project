
const subjectsService = require('../services/subjectsService');
const { sendErrorResp } = require('../utils/response');

const allSubjects = (req, res) => {
    return subjectsService.getAllSubjects(res);
}

const postSubject = (req, res) => {
    const { subName, studentId, courseId } = req.body;

    if(
        typeof subName !== 'string' || !subName.trim() ||
        !Number.isInteger(studentId) || studentId <= 0 ||
        !Number.isInteger(courseId) || courseId <= 0
    ) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'Please enter correct details'
            },
            false
        );
    }

    return subjectsService.postSubjects(
        {
            subName,
            courseId,
            studentId
        },
        res
    );
}

module.exports = {
    allSubjects,
    postSubject
}