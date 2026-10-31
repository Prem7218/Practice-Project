const express = require('express');
const { allUsers, userById, postUser } = require('../controller/userController');
const router = express.Router();

router.get('/', allUsers);
router.get('/:id', userById);
router.post('/', postUser);

module.exports = router;