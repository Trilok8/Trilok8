const Sequelize = require('sequelize');

const sequelize = require('../helpers/expressjsDatabase');

const OrderModel = sequelize.define('order', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = OrderModel;