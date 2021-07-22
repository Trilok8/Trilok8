const express = require('express');
const adminRoutes = require('./Routes/admin.js');
const shopRoute = require('./Routes/shop.js');
const path = require('path');
const errorPageController = require('./controllers/errorController');
const sequelize = require('./helpers/expressjsDatabase');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const CartItem = require('./models/cart-item-model');
const OrderModel = require('./models/order-model');
const OrderItemModel = require('./models/order-item-model');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((request,response,next) => {
    User.findByPk(1)
    .then(user => {
        request.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    })
});

app.use('/admin',adminRoutes);
app.use(shopRoute);

app.use(errorPageController.getErrorPage);

Product.belongsTo(User,{constraints: true,onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
OrderModel.belongsTo(User);
User.hasMany(OrderModel);
OrderModel.belongsToMany(Product, { through: OrderItemModel });


// sequelize.sync({force: true})
sequelize.sync()
.then(result => {
    return User.findByPk(1);
})
.then(user => { 
    if(!user) {
        return User.create({name: 'Test1', email: 'test@test.com'});
    }
    return user
})
.then(user => {
    return user.createCart();
})
.then(cart => {
    app.listen(3000);
})
.catch(err => {
    console.log(err)
});



