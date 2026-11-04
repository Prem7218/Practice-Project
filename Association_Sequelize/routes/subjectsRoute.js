const express = require('express');
const router = express.Router();
const subjectsController = require('../controllers/subjectsController');

router.get('/', subjectsController.allSubjects);
router.post('/', subjectsController.postSubject);

module.exports = router;