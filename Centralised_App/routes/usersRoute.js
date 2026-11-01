const express = require('express');
const router = express.Router();
const { allUsers, userById, postUsers, usersPage } = require('../controller/usersController');

router.get('/', usersPage);
router.get('/', allUsers);
router.get('/:id', userById);
router.post('/', postUsers);

module.exports = router;