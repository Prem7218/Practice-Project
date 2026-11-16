
const { DataTypes } = require('sequelize'); 
const db = require('../utils/sequelizeDB');

const AuthCheck = db.define('AuthCheck', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    totalExpense: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'AuthCheck',
    timestamps: false
});

module.exports = AuthCheck;