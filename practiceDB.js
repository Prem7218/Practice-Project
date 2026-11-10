
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@1234PRM',
    database: 'practicedb'
});

connection.connect((error) => {
    if(error) {
        console.log('Database connection failed', error.message);
        return ;
    }

    console.log('Database connected successfully!');

    const query = [
        `
            CREATE TABLE IF NOT EXISTS Users (
                UserId INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
            )
        `,
        `
            CREATE TABLE IF NOT EXISTS Buses (
                BusId INT AUTO_INCREMENT PRIMARY KEY,
                busNumber VARCHAR(255) NOT NULL,
                totalSeats INT NOT NULL DEFAULT 50,
                availableSeats INT NOT NULL DEFAULT 50
            )
        `,
        `
            CREATE TABLE IF NOT EXISTS Bookings (
                BookingId INT AUTO_INCREMENT PRIMARY KEY,
                UserId INT NOT NULL,
                BusId INT NOT NULL,
                seatNumber VARCHAR(12) NOT NULL,

                FOREIGN KEY (UserId) REFERENCES Users(UserId),
                FOREIGN KEY (BusId) REFERENCES Buses(BusId),

                UNIQUE (BusId, seatNumber)
            )
        `,
        `
            CREATE TABLE IF NOT EXISTS Payments (
                paymentId INT AUTO_INCREMENT PRIMARY KEY,
                BookingId INT NOT NULL,
                amountPaid DECIMAL(10, 2) NOT NULL,
                paymentSatus VARCHAR(255) DEFAULT 'Pending',

                FOREIGN KEY (BookingId) REFERENCES Bookings(BookingId)
            )
        `
    ];

    function createTables(index = 0) {

        if(query.length === index) {
            console.log('All tables created successfully!');
            return;
        }

        connection.query(query[index], (error) => {
            if(error) {
                console.log(`Table creation failed: `, error.message);
                return ;
            }

            console.log(`Table ${index + 1} created successfully!`);
            createTables(index + 1);
        });
    }

    createTables();
});

module.exports = connection;