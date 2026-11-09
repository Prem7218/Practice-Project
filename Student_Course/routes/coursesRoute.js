const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/coursesControllers');

// router.get('/', coursesController.loadCoursesView);
router.post('/', coursesController.postCourse);

router.get('/all', coursesController.allCourses);
router.post('/enroll', coursesController.enrollStudent);

router.put('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;