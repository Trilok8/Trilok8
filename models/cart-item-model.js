const Sequelize = require('sequelize');

const sequelize = require('../helpers/expressjsDatabase');

const CartItem = sequelize.define('cartItem', {
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

module.exports = CartItem;