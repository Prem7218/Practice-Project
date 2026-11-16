const express = require('express');
const router = express.Router();

const aiController = require('../controllers/aiController');

router.get('/', aiController.loadAIPage);
router.post('/', aiController.getResponse);

module.exports = router;