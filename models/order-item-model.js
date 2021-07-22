const Sequelize = require('sequelize');

const sequelize = require('../helpers/expressjsDatabase');

const OrderItemModel = sequelize.define('orderItem', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});

module.exports = OrderItemModel;