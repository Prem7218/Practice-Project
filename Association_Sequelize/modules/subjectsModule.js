
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Subjects = db.define('Subjects', {
    subId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Subjects',
    timestamps: false
});

module.exports = Subjects;