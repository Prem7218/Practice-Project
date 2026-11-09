
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Courses = db.define('Courses', {
    courseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Courses',
    timestamps: false
});

module.exports = Courses;