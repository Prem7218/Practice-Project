
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const StudentCourses = db.define('StudentCourses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'StudentCourses',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['studentId', 'courseId']
        }
    ]
});

module.exports = StudentCourses;