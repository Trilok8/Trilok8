const ProductModel = require('../models/productModel');

exports.getAddProduct = (request,response, next) => {
    response.render('admin/edit-product',{
        path: '/admin/add-product',
        docTitle: 'add-product',
        editMode: false
    });
};

exports.postAddProduct = (request,response,next) => {
    const title = request.body.title;
    const imageurl = request.body.imageurl;
    const price = request.body.price;
    const description = request.body.description;
    const product = new ProductModel({
        title: title,
        price: price,
        description: description,
        imageurl: imageurl,
        userId: request.user
    });
    product
    .save()
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
    ProductModel
    .findById(productID)
    .then(product => {
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
    const updatedImageURL = request.body.imageurl;
    const updatedPrice = request.body.price;
    const updatedDescription = request.body.description;

    ProductModel.findById(productID)
    .then(product => {
        product.title = updatedTitle;
        product.description = updatedDescription;
        product.price = updatedPrice;
        product.imageurl = updatedImageURL;
        return product.save();
    })
    .then(result => {
        response.redirect('/admin/admin-product-list');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getAdminProductList = (request,response,next) => {
    ProductModel
    .find()
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
    ProductModel.findByIdAndDelete(productID)
    .then(() => {
        response.redirect('/admin/admin-product-list');
    })
    .catch(err => {
        console.log(err);
    });
};