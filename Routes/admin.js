
const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../helpers/paths');

const products = [];

router.get('/add-product',(request,response, next) => {
    console.log('this is middleware1');
    response.render('add-product',
    {path: '/admin/add-product',
    hasFormsCSS: true,
    hasProductCSS: true,
    isAddProduct: true});
    // response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/product',(request,response,next) => {
    console.log(request.body);
    products.push({title: request.body.title});
    response.redirect('/')
});

exports.routes = router
exports.products = products