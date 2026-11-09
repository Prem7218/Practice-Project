
const { Courses, Students } = require('../relation_model/relation');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const getAllCourses = async (res) => {

    try {
        const courses = await Courses.findAll({
            include: [{
                model: Students,
                as: 'students',
                through: {
                    attributes: []
                }
            }]
        });

        if(courses.length === 0) {
            return sendErrorResp(res, 404, 'Course not found!');
        }

        return sendSuccessResp(res, 200, 'Here all courses', courses);

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const postCourse = async ({ name }, res) => {
    
    try {
        const course = await Courses.create({name});

        return sendSuccessResp(res, 201, 'new courses created', course);
    
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const deleteCourse = async ({ courseId }, res) => {

    try {
        const course = await Courses.destroy({
            where: {
                courseId: courseId
            }
        });
        
        if(!course) {
            console.error(error.message);
            return sendErrorResp(res, 404, 'course not found!');
        }

        return sendSuccessResp(res, 200, 'Course deleted! successfully', course);
   
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const updateCourse = async ({ name, courseId }, res) => {

    try {
        const course = await Courses.update({
            name
        }, {
            where: {
                courseId: courseId
            }
        });
        
        return sendSuccessResp(res, 200, 'Course updated successfully!', course);
        
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const enrollStudent = async ({ studentId, courseId }, res) => {

    try {
        const student = await Students.findByPk(studentId);
        const course = await Courses.findByPk(courseId);

        if(!student || !course) {
            return res.status(404).json({
                status: false,
                message: 'Student or course not found!'
            });
        }

        await student.addCourse(course);

        return res.status(201).json({
            status: true,
            message: 'Student enrolled successfully!'
        });

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error!'
        });
    }
}

module.exports = {
    getAllCourses,
    postCourse,
    updateCourse,
    deleteCourse,
    enrollStudent
}