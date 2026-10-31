const express = require('express');
const router = express.Router();
const students = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

router.get('/', (req, res) => {
    const studentNames = students.map(student => student.name);

    return res.status(200).json({
        message : `Students: ${studentNames.join(', ')}`,
        totalStudents : students.length, 
        students
    });
});

router.get('/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const student = students.find(
        student => student.id === studentId
    );

    if(!student) {
        return res.status(404).json({
            message: `Student not found!`
        });
    }

    return res.status(200).json({
        message: `Student With id: ${studentId}`,
        student
    });
});

router.post('/', (req, res) => {
    const { name } = req.body; 

    if(
        !name.trim() ||
        typeof name !== 'string'
    ) {
        return res.status(400).json({
            message: `fill correct details`
        });
    }

    const student = {
        id: students.length + 1,
        name: name.trim()
    }

    students.push(student);
    return res.status(201).json({
        message: `New Student Created!`,
        student
    });
});

module.exports = router;
