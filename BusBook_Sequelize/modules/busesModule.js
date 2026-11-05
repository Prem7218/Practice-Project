const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Buses = db.define('Buses', {
    busId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false   
    },
    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50
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