const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticationController');

router.get('/', authController.loadAuthPage);
router.post('/', authController.verifyUser);
router.put('/update/:id', authController.updatePassword);

router.get('/forget/resetpassword/:id', authController.loadUpdatePage);

router.get('/auth/users', authController.allUsers);

router.post('/auth', authController.registerUser);

module.exports = router;