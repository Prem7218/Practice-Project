const express = require('express');
const app = express();
const PORT = 4300;

// Middleware to parse incoming JSON
app.use(express.json());

const users = [
    { id: 1, name: "John" },
];

// Custom Middleware 1: Add user to request
app.use((req, res, next) => {
    console.log("Authentication request...");
    req.message = 'Weclome to all!';
    next();
});

// Middleware 2: Applied to Come-India
app.use("/come-india", (req, res, next) => {
    console.log('2nd Middleware Done...');
    next(); // Important: continue to the route
});

// Post Request
app.post('/users', (req, res) => {
    const { name } = req.body;

    console.log(req.body);

    if(!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    const newUser  = { 
        id: users.length + 1, 
        name 
    };

    users.push(newUser);
    res.status(201).json(newUser); 
});

// Routes handler: 
app.get("/", (req, res) => {
    res.send("<p>Home URL</p>");
});

app.get("/come-india", (req, res) => {
    res.send(`
        <h1>
            ${req.message}
        </h1>
    `);
});

app.get("/users/all_users", (req, res) => { 
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(user => user.id === userId);

    if(!user) {
        return res.status(404).json({ 
            message: `User not found` 
        });
    }

    res.json(user);
});

app.listen(PORT, () => {
    console.log('server is running now: ', PORT);
});