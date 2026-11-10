
const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');

router.get('/', tableController.loadTableView);
router.post('/create', tableController.tableCreate);
router.get('/:tableName/records', tableController.getTableRecords);
router.post('/:tableName/insert', tableController.insertRecords);

module.exports = router;