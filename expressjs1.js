const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');
const adminData = require('./Routes/admin.js');
const shopRoute = require('./Routes/shop.js');
const path = require('path');
const rootDir = require('./helpers/paths');
const handlebar = require('express-handlebars');

const app = express();
app.engine('hbs', handlebar({layoutsDir: rootDir + '/views/Layouts',extname: 'hbs',defaultLayout: 'main-layout'}));
app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin',adminData.routes);
app.use(shopRoute);

app.get('/favicon.ico', (request,response,next) => {
    console.log('favicon has been requested');
    response.writeHead(200, {'Content-Type': 'text/plain', 'Link': 'rel="shortcut icon" href="#"'} );
});

app.use((request,response,next) => {
    response.status(404).render('404',{docTitle: '404'});
    // response.status(404).sendFile(path.join(rootDir, 'views' ,'404.html'));
})

app.listen(3000);

