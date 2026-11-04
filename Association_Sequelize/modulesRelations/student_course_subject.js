
const Students = require('../modules/studentsModule');
const Courses = require('../modules/coursesModule');
const Subjects = require('../modules/subjectsModule');

// Student -> Courses (1:M)
Students.hasMany(Courses, {
    foreignKey: 'studentId',
    as: 'courses'
});

Courses.belongsTo(Students, {
    foreignKey: 'studentId',
    as: 'student'
});

// Student -> Subjects (1:M)
Students.hasMany(Subjects, {
    foreignKey: 'studentId',
    as: 'subjects'
});

Subjects.belongsTo(Students, {
    foreignKey: 'studentId',
    as: 'student'
});

// Course -> Subjects (1:M)
Courses.hasMany(Subjects, {
    foreignKey: 'courseId',
    as: 'subjects'
});

Subjects.belongsTo(Courses, {
    foreignKey: 'courseId',
    as: 'course'
})

module.exports = {
    Students,
    Courses,
    Subjects
};