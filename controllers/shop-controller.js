const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.getProductList = (request,response,next) => {
    Product.find()
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
    Product.find()
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
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
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
    Product.findById(productID)
    .then(product => {
        request.user.addToCart(product);
        
    })
    .then(result => {
        response.redirect('/cart')
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postCartDeleteItem = (request,response,next) => {
    const productID = request.body.productID;
    request.user
    .removeFromCart(productID)
    .then(result => {
        response.redirect('/cart')
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postOrder = (request,response,next) => {
    request.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map(item => {
            return { quantity: item.quantity, product: { ...item.productId._doc } }
        });
        const order = new Order({
            user: { name: user.name, userId: user },
            products: products
        })
        return order.save();
    })
    .then(result => {
        return request.user.clearCart();
    })
    .then(() => {
        response.redirect('/orders')
    })
    .catch(err => { console.log(err); })
}

exports.getOrders = (request,response,next) => {
    Order.find()
    .then(orders => {
        console.log(orders);
        response.render('shop/orders',{
            docTitle: 'Your Orders',
            path: '/orders',
            orders: orders
        });
    })
    .catch(err => {
        console.log(err)
    });    
};



