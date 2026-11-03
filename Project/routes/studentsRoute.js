const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

router.get('/', studentController.allUsers);
router.get('/:id', studentController.studentById);
router.post('/', studentController.postStud);
router.put('/:id', studentController.updateStud);
router.delete('/:id', studentController.deleteStud);

module.exports = router;