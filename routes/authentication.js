const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticationController');

router.get('/', authController.loadAuthPage);
router.post('/', authController.verifyUser);

router.post('/auth', authController.registerUser);

module.exports = router;