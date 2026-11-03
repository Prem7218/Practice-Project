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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Users',
    timestamps: false
});

module.exports = Users;