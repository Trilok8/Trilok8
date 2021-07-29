const express = require('express');
const adminRoutes = require('./Routes/admin.js');
const shopRoute = require('./Routes/shop.js');
const path = require('path');
const errorPageController = require('./controllers/errorController');
const User = require('./models/userModel');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    User.findById('61019ece1ec56beaaa8f2ba0')
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

app.get('/',(request,response,next) => {
    console.log('no page');
});

mongoose.connect('mongodb+srv://Trilok:boyapalli@expressjspractice.9juqf.mongodb.net/shop?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    User.findOne()
    .then(user => {
        if(!user) {
            const user = new User({
                name: 'Trilok',
                email: 'trilok@gmail.com',
                cart: { items: [] }
            });
            user.save()
        }
    });
    app.listen(3000);
  })
.catch(err => {
    console.log(err);
});
