const express = require('express');
const app = express();
const PORT= 3200;

// Custom Middleware 1: Add user to req
app.use((req, res, next) => {
    console.log('Authentication is 1st...');
    req.user = "Guest";
    next();
});

//Middleware 2: Applied to /welcome
app.use("/welcome", (req, res, next) => {
    console.log('Welcome to the middleware 2nd...', req.user);
    next();
});

// Route handler
app.get("/", (req, res) => {
    res.send("<p>Auth Complited...</p>");
});

app.get("/welcome", (req, res) => {
    res.send(`<h1>Welcome, ${req.user}!</h1>`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});