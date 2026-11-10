
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// Static routes
router.get('/play', usersController.allUsers);
router.get('/page', usersController.loadDetailPage);

// Query parameter route
router.get('/', usersController.userByName);

// Dynamic route
router.get('/:name', usersController.loadProfilePage);

// POST route
router.post('/', usersController.postUsers);

module.exports = router;
