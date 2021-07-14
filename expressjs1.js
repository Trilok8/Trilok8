const express = require('express');
const adminData = require('./Routes/admin.js');
const shopRoute = require('./Routes/shop.js');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminData.routes);
app.use(shopRoute);

app.get('/favicon.ico', (request,response,next) => {
    console.log('favicon has been requested');
    response.writeHead(200, {'Content-Type': 'text/plain', 'Link': 'rel="shortcut icon" href="#"'} );
});

app.use((request,response,next) => {
    response.status(404).render('404',{docTitle: 'error',path: ''});
    // response.status(404).sendFile(path.join(rootDir, 'views' ,'404.html'));
})

app.listen(3000);

