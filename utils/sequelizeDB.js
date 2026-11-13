
const { Sequelize } = require('sequelize');

const db = new Sequelize('awsDB', 'root', 'Pass@1234PRM', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;