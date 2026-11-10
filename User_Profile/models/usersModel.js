
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

    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    imgUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },

    birthPlace: {
        type: DataTypes.STRING,
        allowNull: false
    },

    career: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    match: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fifties: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    centuries: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    wickets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    average: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

}, {
    tableName: 'Users',
    timestamps: false
});

module.exports = Users;
