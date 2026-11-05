
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Expense = db.define('Expense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    search: {
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