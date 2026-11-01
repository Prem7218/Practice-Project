const express = require('express');
const router = express.Router();
const { allUsers, getUsersById, postUser } = require('../controller/usersController');

router.get('/', allUsers);
router.get('/:id', getUsersById);
router.post('/', postUser);

module.exports = router;