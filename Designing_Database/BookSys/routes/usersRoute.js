const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController');

router.get('/', userController.allUsers);
router.post('/', userController.postUser);

module.exports = router;