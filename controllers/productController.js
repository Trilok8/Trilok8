const Product = require('../models/productModel');

exports.getAddProduct = (request,response, next) => {
    response.render('add-product',
    {path: '/admin/add-product',
    hasFormsCSS: true,
    hasProductCSS: true,
    isAddProduct: true,
    docTitle: 'add-product'});
    // response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (request,response,next) => {
    const products = new Product(request.body.getTitle);
    products.save();
    response.redirect('/');
};

exports.getProductList = (request,response,next) => {
    const products = Product.fetchAll(products => {
        response.render('shop',{prods: products,
            docTitle: 'My Shop',
            path: '/',
            hasProducts: products.length > 0,
            hasProductCSS: true,
            isShop: true});
    });
    
};