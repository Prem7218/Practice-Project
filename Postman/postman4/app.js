
const express = require('express');
const app = express();

app.use(express.json());

const users = [];
const PORT = 3000;

app.post('/users', (req, res) => {
    const { username, age, role } = req.body;

    if (!username || !Number.isFinite(age) || age <= 0 || !role) {
        return res.status(400).json({
            message: 'Invalid user data'
        });
    }

    const user = {
        username,
        age,
        role
    }

    users.push(user);
    return res.status(201).json({
        message: `new user created!`,
        user
    });
});

app.get('/users', (req, res) => {
    return res.status(200).json({
        totalUsers: users.length,
        users
    });
});

app.get('welcome/:username', (req, res) => {
    
    const { username } = req.params;
    const { role } = req.query;

    if (!role) {
        return res.status(400).json({
            message: 'Please provide a role query parameter'
        });
    }

    res.send(`<h1>Welcome - ${username}, your role is ${role}</h1>`);
});

app.use((req, res) => {
    return res.status(404).json({
        message: '404 - Route Not Found'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});