
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Library = db.define('Library', {
    bookId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    issued: {
        type: DataTypes.DATE,
        allowNull: false
    },
    returns: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fine: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Library',
    timestamps: false
});

module.exports = Library;