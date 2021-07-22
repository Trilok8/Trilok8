const Sequelize = require('sequelize');
const sequelize = require('../helpers/expressjsDatabase');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;