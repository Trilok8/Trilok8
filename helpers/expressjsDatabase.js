const Sequelize = require('sequelize');

const sequelize = new Sequelize('expressjsPractice','root','boyapalli',{
    dialect: 'mysql',
    host: 'localhost'});

module.exports = sequelize;