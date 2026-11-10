
const { Sequelize } = require('sequelize');

const db = new Sequelize('profileDB', 'root', 'Pass@1234PRM', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = db;