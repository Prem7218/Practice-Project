const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

router.get('/', studentController.allStudents);
router.get('/:id', studentController.studentById);
router.post('/', studentController.postStudents);

module.exports = router;