
const { sendSuccessResp, sendErrorResp } = require('../utils/response');
const db = require('../utils/sequelizeDB');
const { DataTypes, QueryTypes } = require('sequelize');

const typeMap = {
    INTEGER: DataTypes.INTEGER,
    STRING: DataTypes.STRING,
    TEXT: DataTypes.TEXT,
    BOOLEAN: DataTypes.BOOLEAN,
    DATE: DataTypes.DATE,
    FLOAT: DataTypes.FLOAT,
    DECIMAL: DataTypes.DECIMAL(10, 2)
};

const getAllTables = async (res) => {
    try {
        const tables = await tableService.getAllTables();

        res.status(200).json({
            status: true,
            tables
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

const createTable = async ({ tableName, columns }, res) => {
    try {   
        const attributes = {};

        for(const column of columns) {
            const { name, type, allowNull, primaryKey, autoIncrement } = column;

            if(!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(name || '')) {
                throw new Error('Invalid column name');
            }

            if (!typeMap[type]) {
                throw new Error('Invalid data type');
            }

            if (attributes[name]) {
                throw new Error('Duplicate column name');
            }

            attributes[name] = {
                type: typeMap[type],
                allowNull: allowNull !== false,
                primaryKey: Boolean(primaryKey),
                autoIncrement: Boolean(autoIncrement),
                unique: Boolean(column.unique)
            };
        }

        await db.getQueryInterface().createTable(
            tableName,
            attributes
        );

        return sendSuccessResp(res, 201, 'Table created successfully!', tableName);

    } catch (error) {
        return sendErrorResp(res, 400, error.message);
    }
}

const insertRecord = async ({ tableName, record }, res) => {
    try {
        await db.getQueryInterface().bulkInsert(
            tableName,
            [record]
        );

        return sendSuccessResp(res, 201, 'Record inserted successfully!');

    } catch (error) {
        return sendErrorResp(res, 500, error.message);
    }
}

const getTableRacords = async ({ tableName }) => {
    try {
        
        const queryInterface = db.getQueryInterface();

        // Check whether the table exists
        const tables = await queryInterface.showAllTables();

        if (!tables.includes(tableName)) {
            return res.status(404).json({
                status: false,
                message: 'Table not found!'
            });
        }

        // Safely quote the table identifier
        const quotedTable = queryInterface.quoteTable(tableName);

        const records = await db.query(
            `SELECT * FROM ${quotedTable}`,
            { type: QueryTypes.SELECT }
        );

        return res.status(200).json({
            status: true,
            tableName,
            records,
            count: records.length
        });

    } catch (error) {
        return sendErrorResp(res, 500, error.message);
    }
}

module.exports = {
    getAllTables,
    createTable,
    insertRecord,
    getTableRacords
}