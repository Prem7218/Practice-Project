const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticationController');

router.get('/', authController.loadAuthPage);
router.post('/', authController.verifyUser);
router.put('/', authController.updatePassword);

router.get('/forget', authController.loadUpdatePage);

router.get('/auth/users', authController.allUsers);

router.post('/auth', authController.registerUser);

module.exports = router;