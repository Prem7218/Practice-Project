require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'testdb'
});

connection.connect((error) => {
    if(error) {
        console.log('Database connection failed:', error.message);
        return ;
    }

    console.log('Database connected successfully!');

    const query = `
        CREATE TABLE IF NOT EXISTS Students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(255)
        )
    `;

    connection.query(query, (error) => {
        if(error) {
            console.log('Table creation failed:', error.message);
            return;
        }

        console.log('Students table is ready!');
    });
}); 

module.exports = connection;

