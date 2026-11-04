
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Students = db.define('Students', {
    studentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Students',
    timestamps: false
});

module.exports = Students;