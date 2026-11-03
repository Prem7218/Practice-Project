require('dotenv').config();

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('commondb', 'root', 'Pass@1234PRM', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.')
// } catch(error) {
//     console.error('Unable to connect to the database:', error);
// }

// module.exports = sequelize;

const mysql = require('mysql2');

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: process.env.DB_PASS,
   database: 'commondb' 
});

connection.connect((error) => {
    if(error) {
        console.log('Database connection failed:', error.message);
        return ;
    }

   const query = [
    `
        CREATE TABLE IF NOT EXISTS Students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            age INT NOT NULL
        )
    `
   ] 

   function createTables(index = 0) {
        if(index === query.length) {
            console.log('All tables created successfully!');
            return;
        }

        connection.query(query[index], (error) => {
            if(error) {
                console.error(`Table creation failed:`, error.message);
                return;
            }

            console.log(`Table ${index + 1} created successfully!`);
            createTables(index + 1);
        });
   }

   createTables();
});

module.exports = connection;