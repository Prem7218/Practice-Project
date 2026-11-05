const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Bookings = db.define('Bookings', {
    bookingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    busId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
}, {
    tableName: 'Bookings',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['busId', 'seatNumber']
        }
    ]
});

module.exports = Bookings;