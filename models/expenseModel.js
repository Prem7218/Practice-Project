
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Expense = db.define('Expense', {
    expenseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expense: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    expense_disc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Expense',
    timestamps: false
});

module.exports = Expense;