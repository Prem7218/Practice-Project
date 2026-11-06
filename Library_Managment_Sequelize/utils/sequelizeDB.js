
const { Sequelize } = require('sequelize');

const db = new Sequelize('libraryDB', 'root', 'Pass@1234PRM', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
        db.authenticate();
        console.log('Database connected successfully!');
    } catch(error) {
        console.log(`Error Message: ${error}`)
    }
})();

module.exports = db;