
const { DataTypes } = require('sequelize');
const db = require('../utils/sequelizeDB');

const ForgotPasswordRequests = db.define('ForgotPasswordRequests', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'AuthCheck',
            key: 'userId'
        }
    },
    isactive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'ForgotPasswordRequests',
    timestamps: false
});

module.exports = ForgotPasswordRequests;