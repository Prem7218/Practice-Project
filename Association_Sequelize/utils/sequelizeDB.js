
const { Sequelize } = require('sequelize');

const db = new Sequelize('temp', 'root', 'Pass@1234PRM', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.')
    } catch(error) { 
        console.log(error);
    }
})();

module.exports = db;