
const Students = require('../modules/studentsModule');
const Courses = require('../modules/coursesModule');

Students.hasMany(Courses, {
    foreignKey: 'studentId',
    as: 'courses'
});

Courses.belongsTo(Students, {
    foreignKey: 'studentId',
    as: 'student'
});

module.exports = {
    Students,
    Courses
};