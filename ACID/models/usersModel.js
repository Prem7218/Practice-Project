
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Users = db.define('Users', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Users',
    timestamps: false
});

module.exports = Users;