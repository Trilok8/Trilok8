const Product = require('../models/productModel');

exports.getAddProduct = (request,response, next) => {
    response.render('admin/edit-product',{
        path: '/admin/add-product',
        docTitle: 'add-product',
        editMode: false
    });
};

exports.postAddProduct = (request,response,next) => {
    const title = request.body.title;
    const imageURL = request.body.imageURL;
    const price = request.body.price;
    const description = request.body.description;
    request.user.createProduct({
        title: title,
        imageURL: imageURL,
        price: price,
        description: description
    })
    .then(result => {
        response.redirect('/admin/admin-product-list');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (request,response,next) => {
    const editMode = request.query.edit;
    const productID = request.params.productID;
    if(!editMode)
    {
        response.redirect('/');
    }
    request.user
    .getProducts({ where: { id: productID } })
    // Product.findByPk(productID)
    .then(products => {
        const product = products[0];
        if(!product) {
            response.redirect('/');
        }
        response.render('admin/edit-product',{
            editMode: editMode,
            docTitle: 'Edit Product',
            path: '/admin/edit-product',
            product: product
        });
    })
    .catch(err => {
        console.log(err);
    });
    
};

exports.postEditProduct = (request,response,next) => {
    const productID = request.body.productID;
    const updatedTitle = request.body.title;
    const updatedImageURL = request.body.imageURL;
    const updatedPrice = request.body.price;
    const updatedDescription = request.body.description;
    Product.findByPk(productID)
    .then(product => {
        product.title = updatedTitle;
        product.imageURL = updatedImageURL;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product.save()
    })
    .then(result => {
        response.redirect('/admin/admin-product-list');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getAdminProductList = (request,response,next) => {
    request.user
    .getProducts()
    // Product.findAll()
    .then(products => {
        response.render('admin/admin-product-list',{
            prods: products,
            docTitle: 'My Shop',
            path: '/admin/admin-product-list'
        });
    })
    .catch(err => {
        console.log(err)
    });
};

exports.postDeleteProduct = (request,response,next) => {
    const productID = request.body.productID;
    Product.findByPk(productID)
    .then(product => {
        return product.destroy()
    })
    .then(result => {
        response.redirect('/admin/admin-product-list');
    })
    .catch(err => {
        console.log(err);
    });
};