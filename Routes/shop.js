const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../helpers/paths');
const adminData = require('../Routes/admin');

router.get('/',(request,response,next) => {
    const products = adminData.products
    response.render('shop',{prods: products,
        docTitle: 'My Shop',
        path: '/',
        hasProducts: products.length > 0,
        hasProductCSS: true,
        isShop: true});
});

module.exports = router