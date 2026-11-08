
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Payments = db.define('Payments', {
    paymentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    BookingId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amountPaid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paymentStaus: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Payments',
    timestamps: false
});

module.exports = Payments;