
const { Sequelize } = require('sequelize');

const db = new Sequelize('tablesDB', 'root', 'Pass@1234PRM', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;