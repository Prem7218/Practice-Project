const express = require('express');
const router = express.Router();
const courses = [
    { id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },
    { id: 2, name: "Backend", description: "Node.js, Express, MongoDB" }
];

router.get('/', (req, res) => {
    const courseNames = courses.map(course => course.name);

    return res.status(200).json({
        message: `Courses: ${courseNames.join(', ')}`,
        totalCourses: courses.length,
        courses
    });
});

router.get('/:id', (req, res) => {
    const courseId = Number(req.params.id);
    const course = courses.find(course => course.id === courseId);

    if(!course) {
        return res.status(404).json({
            message: `Course not found!`
        });
    }

    return res.json({
        message: `Course: ${course.name}, Description: ${course.description}`,
        course
    });
});

router.post('/', (req, res) => {
    const { name, description } = req.body;

    if(
        !name.trim() ||
        !description.trim()
    ) {
        return res.status(400).json({
            message: `Please fill details correctly...`
        });
    }

    const course = {
        id: courses.length + 1,
        name: name.trim(),
        description: description.trim()
    }

    courses.push(course);
    return res.status(201).json({
        message: `new course added!`,
        course
    });
});

module.exports = router;