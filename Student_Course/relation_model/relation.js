
const Students = require('../models/studentsModel');
const Courses = require('../models/coursesModel');
const StudentCourses = require('./studentCoursesModel');

Students.belongsToMany(Courses, {
    through: StudentCourses,
    foreignKey: 'studentId',
    otherKey: 'courseId',
    as: 'courses'
});

Courses.belongsToMany(Students, {
    through: StudentCourses,
    foreignKey: 'courseId',
    otherKey: 'studentId',
    as: 'students'
});

module.exports = {
    Students, 
    Courses, 
    StudentCourses
}