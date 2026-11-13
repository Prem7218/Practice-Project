const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticationController');

router.get('/', authController.loadAuthPage);
router.get('/auth', authController.verifyUser);
router.post('/auth', authController.registerUser);

module.exports = router;