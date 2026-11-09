const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/studentsControllers');

// router.get('/', studentsController.loadStudentsView);
router.get('/all', studentsController.allStudents);
router.post('/', studentsController.postStudent);
router.put('/:id', studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;