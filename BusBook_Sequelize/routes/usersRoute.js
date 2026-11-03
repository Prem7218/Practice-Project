const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.allUsers);
router.get('/:id', usersController.userById);
router.post('/', usersController.postUser);

module.exports = router;