const express = require('express');
const adminRoutes = require('./Routes/admin.js');
const shopRoute = require('./Routes/shop.js');
const path = require('path');
const errorPageController = require('./controllers/errorController');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);
app.use(shopRoute);

app.use(errorPageController.getErrorPage);

app.listen(3000);

