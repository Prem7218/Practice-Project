
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/coursesController');

router.get('/', courseController.allCourses);
router.post('/', courseController.postCourse);

module.exports = router;