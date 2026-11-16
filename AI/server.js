const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

// Check whether the key exists without exposing it
console.log(
    'Gemini API Key Loaded:',
    Boolean(process.env.GEMINI_API_KEY)
);
const express = require('express');
const app = express();

const PORT = 3000;

const aiRouter = require('./routes/aiRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', aiRouter);

app.listen(PORT, () => {
    console.log(`Server Hosted: http://localhost:${PORT}`);
});