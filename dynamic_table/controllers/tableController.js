
const tableService = require('../services/tableService');
const path = require('path');

const loadTableView = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'public', 'create-table.html'));
}

const tableCreate = async (req, res) => {

    const { tableName, columns } = req.body;

    if(!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(tableName || '')) {
        return sendErrorResp(res, 400, 'Invalid table name');
    }

    if(!Array.isArray(columns) || columns.length === 0) {
        return sendErrorResp(res, 400, 'At least one column is required');
    }
    
    return tableService.createTable({
        tableName,
        columns
    }, res);
}

const insertRecords = (req, res) => {
    const { tableName } = req.params;
    const record = req.body;

    if(!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(tableName)) {
        return sendErrorResp(res, 400, 'Invalid table name');
    }

    if(!record || Object.keys(record).length === 0) {
        return sendErrorResp(res, 400, 'Record cannot be empty');
    }

    return tableService.insertRecord({
        tableName,
        record
    }, res);
}

const getTableRecords = async (req, res) => {
    const { tableName } = req.params;
    
    return tableService.getTableRacords({ tableName }, res);
};

module.exports = {
    tableCreate,
    insertRecords,
    loadTableView,
    getTableRecords
};