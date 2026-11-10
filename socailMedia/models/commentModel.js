const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const Comments = db.define('Comments', {
    commentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    socailId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Socail',
            key: 'socailId'
        }
    },

    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'Comments',
    timestamps: false
});

module.exports = Comments;