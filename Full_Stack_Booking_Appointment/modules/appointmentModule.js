
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Appointment = db.define('Appointment', {
    id: {
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
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Appointment',
    timestamps: false
});

module.exports = Appointment;