const express = require('express');
const mysql = require('mysql2'); 
const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@1234PRM',
    database: 'testdb'
});

connection.connect((err) => {
    if(err) {
        console.log(err);
        return ;
    }

    console.log("Connection established...");
    const createTable = `
        create table Students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20)
        )
    `;

    connection.execute(createTable, (error) => {
        if(error) {
            console.log(error);
            connection.end();
            return ;
        }

        console.log("Table is created");
    });
}); 

app.get('/', (req, res) => {
    res.send('Hello World');
}); 

app.listen(PORT, () => {
    console.log(`Server run on http://localhost:${PORT}`)
});