const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Payments = db.define('Payments', {
    paymentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Bookings',
            key: 'bookingId'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payMethod: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    payStatus: {
        type: DataTypes.ENUM(
            'Pending',
            'Success',
            'Failed',
            'Refunded'
        ),
        defaultValue: 'Pending'
    },
    transactionId: {
        type: DataTypes.STRING(100),
        unique: true
    },
    payDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.DATE
    }
}, {
    tableName: 'Payments',
    timestamps: false
});

module.exports = Payments;