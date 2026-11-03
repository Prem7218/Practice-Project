
const { Sequelize } = require('sequelize');

const db = new Sequelize('sequelizeDB', 'root', 'Pass@1234PRM', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.')
    } catch(error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = db;