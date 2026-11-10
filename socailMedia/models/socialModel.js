
const { DataTypes } = require('sequelize'); 
const db = require('../utils/sequelizeDB');

const Social = db.define('Socail', {
    socailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgDisc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Socail',
    timestamps: false
});

module.exports = Social;