const express = require('express');
const adminRoutes = require('./Routes/admin.js');
const shopRoute = require('./Routes/shop.js');
const path = require('path');
const errorPageController = require('./controllers/errorController');
const mongoConnect = require('./helpers/expressjsDatabase').mongoConnect;
const User = require('./models/userModel');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    User.findById('60fd8f30ff0518dc934fbc5a')
    .then(user => {
        request.user = new User(user.username, user.email, user.cart, user._id);
        next();
    })
    .catch(err => {
        console.log(err);
    })
});

app.use('/admin',adminRoutes);
app.use(shopRoute); 

app.use(errorPageController.getErrorPage);

app.get('/',(request,response,next) => {
    console.log('no page');
});

mongoConnect(() => {
    app.listen(3000);
});