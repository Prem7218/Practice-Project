
const { Sequelize } = require('sequelize');

const db = new Sequelize('appoinmentDB', 'root', 'Pass@1234PRM', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
        await db.authenticate();
        console.log("Database Connected Successfully!");
    } catch(error) {
        console.log(error);
    }
})();

module.exports = db;