
const { Sequelize } = require('sequelize');

const db = new Sequelize('busbooking', 'root', 'Pass@1234PRM', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
        db.authenticate();
        console.log('Database Connected Successfully!');
    } catch(error) {
        console.log(error);
    }
})();

module.exports = db;