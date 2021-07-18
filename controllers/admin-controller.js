const Product = require('../models/productModel');

exports.getAddProduct = (request,response, next) => {
    response.render('admin/edit-product',
    {path: '/admin/add-product',
    docTitle: 'add-product',
    editMode: false});
    // response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (request,response,next) => {
    const title = request.body.title;
    const imageURL = request.body.imageURL;
    const price = request.body.price;
    const description = request.body.description;
    const imageSite = request.body.imageSite;
    const product = new Product(null, title,imageURL,price,description,imageSite);
    product.save().then(() => {
        response.redirect('/');
    }).catch(err => console.log(err));
};

exports.getAdminProductList = (request,response,next) => {
    const products = Product.fetchAll(products => {
        response.render('admin/admin-product-list',{prods: products,
            docTitle: 'My Shop',
            path: '/admin/admin-product-list'});
    });
};

exports.getEditProduct = (request,response,next) => {
    const editMode = request.query.edit;
    const productID = request.params.productID;
    if(!editMode)
    {
        response.redirect('/');
    }
    Product.findProductByID(productID,(product) => {
        if(!product) {
            response.redirect('/');
        }
        response.render('admin/edit-product',{editMode: editMode,docTitle: 'Edit Product',path: '/admin/edit-product',product: product});
    })
    
};

exports.postEditProduct = (request,response,next) => {
    const productID = request.body.productID;
    const title = request.body.title;
    const imageURL = request.body.imageURL;
    const price = request.body.price;
    const description = request.body.description;
    const imageSite = request.body.imageSite;
    const updatedProduct = new Product(productID,title,imageURL,price,description,imageSite);
    console.log(updatedProduct);
    updatedProduct.save();
    response.redirect('/admin/admin-product-list');
};

exports.postDeleteProduct = (request,response,next) => {
    const productID = request.body.productID;
    Product.deleProductByID(productID);
    response.redirect('/admin/admin-product-list');
    
};