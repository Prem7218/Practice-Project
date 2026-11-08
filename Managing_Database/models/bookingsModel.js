
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Bookings = db.define('Bookings', {
    BookingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    BusId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seatNumber: {
        type: DataTypes.STRING(12),
        allowNull: false
    }
}, {
    tableName: 'Bookings',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['BusId', 'seatNumber']
        }
    ]
});

module.exports = Bookings;