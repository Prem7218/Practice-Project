
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Payment = db.define('Payment', {
    paymentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    paymentSessionId: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    orderCurrency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'INR'
    },
    paymentSatus: {
        type: DataTypes.ENUM(
            'Pending',
            'Success',
            'Failed'
        ),
        allowNull: false,
        defaultValue: 'Pending'
    }
}, {
    tableName: 'Payment',
    timestamps: false
})

module.exports = Payment;