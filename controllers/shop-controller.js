// const OrderModel = require('../models/order-model');
const Product = require('../models/productModel');

exports.getProductList = (request,response,next) => {
    Product.fetchAll()
    .then(products => {
        response.render('shop/product-list',{
            prods: products,
            docTitle: 'product-list',
            path: '/product-list'});
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProductDetail = (request,response,next) => {
    const prodID = request.params.productID;
    // Product.findAll({where : {id: prodID}}).then(products => {
    //     response.render('shop/product-detail',{
        // product: products[0],
        // docTitle: products[0].title,
        // path: products[0].title});
    // }).catch(err => console.log(err));
    Product.findById(prodID)
    .then(product => {
        response.render('shop/product-detail',{
            product: product,
            docTitle: product.title,
            path: product.title
        });
    })
    .catch(err => {
        console.log(err)
    });
};

exports.getIndex = (request,response,next) => {
    Product.fetchAll()
    .then(products => {
        response.render('shop/index',{
            prods: products,
            docTitle: 'index',
            path: '/index'});
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getCart = (request,response,next) => {
    request.user
    .getCart()
    .then(products => {
        response.render('shop/cart',{
            docTitle: 'Your Cart',
            path: '/cart',
            products: products});
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postCart = (request,response,next) => {
    const productID = request.body.productID;
    console.log(productID)
    Product.findById(productID)
    .then(product => {
        request.user.addToCart(product);
        response.redirect('/cart')
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postCartDeleteItem = (request,response,next) => {
    const productID = request.body.productID;
    request.user
    .deleteItemFromCart(productID)
    .then(result => {
        response.redirect('/cart')
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postOrder = (request,response,next) => {
    let fetchedCart;
    request.user
    .addOrder()
    .then(result => {
        response.redirect('/orders')
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getOrders = (request,response,next) => {
    request.user
    .getOrders()
    .then(orders => {
        response.render('shop/orders',{
            docTitle: 'Your Orders',
            path: '/orders',
            orders: orders
        });
    })
    .catch(err => {
        console.log(err)
    })
    
};



