
const { DataTypes } = require('sequelize'); 
const db = require('../utils/sequelizeDB');

const AuthCheck = db.define('AuthCheck', {
    email: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false
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
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'AuthCheck',
    timestamps: false
});

module.exports = AuthCheck;