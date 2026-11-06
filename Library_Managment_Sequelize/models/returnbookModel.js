
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const ReturnBooks = db.define('ReturnBooks', {
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    tableName: 'ReturnBooks',
    timestamps: false
});

module.exports = ReturnBooks;