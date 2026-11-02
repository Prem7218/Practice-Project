const express = require('express');
const mysql = require('mysql2');
const PORT = 3000;
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@1234PRM',
    database: 'testdb'
});

connection.connect((error) => {

    if(error) {
        console.log(error);
        return ;
    }

    console.log("Connection established...");

    const queries = [
        `create table Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
        )`,

        `Create table Buses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            busNumber VARCHAR(50) NOT NULL,
            totalSeats INT NOT NULL,
            availableSeats INT NOT NULL
        )`,

        `Create table Bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            seatNumber INT NOT NULL
        )`,

        `Create table Payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amountPaid DECIMAL(10, 2) NOT NULL,
            paymentStatus VARCHAR(50) NOT NULL
        )`,
    ];

    function createTables(index = 0) {
        if(index === queries.length) {
            console.log("All tables created successfully!");
            connection.end();
            return ;
        }

        connection.query(queries[index], (error, result) => {
            if(error) {
                console.log(error);
                connection.end();
                return ;
            }

            console.log(`Table ${index + 1} created successfully!`);
            createTables(index + 1);
        });
    }

    createTables();
});

app.get('/', (req, res) => {
    res.send("Welcome Bus Booking System Tables Created!");
});

app.listen(PORT, () => {
    console.log(`Server running on Host: http://localhost:${PORT}`);
});