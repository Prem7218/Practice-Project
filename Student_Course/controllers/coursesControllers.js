
const courseService = require('../services/coursesServices');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadCoursesView = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'courseView.html'));
}

const allCourses = (req, res) => {
    return courseService.getAllCourses(res);
}

const postCourse = (req, res) => {
    const { name } = req.body;

    if(typeof name !== 'string' || !name.trim()) {
        return sendErrorResp(res, 400, 'invalid name');
    }

    return courseService.postCourse({ name: name.trim() }, res);
}

const deleteCourse = (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(res, 400, 'invalid course id!');
    }

    return courseService.deleteCourse({ courseId: id}, res);
}

const updateCourse = (req, res) => {
    const { name } = req.body;
    const id = Number(req.params.id);

    if(
        typeof name !== 'string' || !name.trim() ||
        !Number.isInteger(id) || id <= 0
    ) {
        return sendErrorResp(res, 400, 'invalid name');
    }

    return courseService.updateCourse(
        { 
            name: name.trim(), 
            courseId: id
        }, res
    );
}

const enrollStudent = async (req, res) => {
    const { studentId, courseId } = req.body;
    
    if(!Number.isInteger(studentId) || studentId <= 0) {
        return sendErrorResp(res, 400, 'invalid student id!');
    }

    if(!Number.isInteger(courseId) || courseId <= 0) {
        return sendErrorResp(res, 400, 'invalid course id!');
    }

    return courseService.enrollStudent({ studentId, courseId }, res);
}

module.exports = {
    loadCoursesView,
    allCourses,
    postCourse,
    updateCourse,
    deleteCourse,
    enrollStudent
}