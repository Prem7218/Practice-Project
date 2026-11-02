const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

router.get('/', studentController.loadStudnetPage);
router.post('/', studentController.postStudnets);
router.put('/:id', studentController.updateStudents);
router.delete('/:id', studentController.deleteStudents);

module.exports = router;