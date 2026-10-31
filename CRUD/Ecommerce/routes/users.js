const express = require('express');
const router = express.Router();

const users = [];

router.get('/', (req, res) => {
    return res.status(200).json({
        message: `Fetching all users`,
        totalUsers: users.length,
        users
    });
});

router.get('/:id', (req, res) => {
    const userId = Number(req.params.id);

    const user = users.find(user => user.id === userId);

    if(!user) {
        return res.status(404).send({
            message: 'User not found'
        })
    }

    return res.status(200).json({
        message: `Fetching user with ID: ${userId}`,
        user
    });
});

router.post('/', (req, res) => {
    const { name } = req.body;

    if(typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
            message: 'Please fill name correctly!'
        });
    }

    const user = {
        id: users.length + 1,
        name: name.trim()
    }

    users.push(user);
    return res.status(201).json({
        message: 'new user added!',
        user
    });
});

module.exports = router;