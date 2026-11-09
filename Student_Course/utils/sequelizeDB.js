
const { Sequelize } = require('sequelize');

const db = new Sequelize('practicedb', 'root', 'Pass@1234PRM', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = db;