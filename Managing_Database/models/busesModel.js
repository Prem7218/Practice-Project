
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Buses = db.define('Buses', {
    BusId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    busNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Buses',
    timestamps: false
});

module.exports = Buses;