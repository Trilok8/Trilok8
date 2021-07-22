const OrderModel = require('../models/order-model');
const Product = require('../models/productModel');

exports.getProductList = (request,response,next) => {
    Product.findAll()
    .then(products => {
        response.render('shop/product-list',{
            prods: products,
            docTitle: 'index',
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
    Product.findByPk(prodID)
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
    Product.findAll()
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
    .then(cart => {
        return cart
        .getProducts()
        .then(products => {
            response.render('shop/cart',{
                docTitle: 'Your Cart',
                path: '/cart',
                products: products});
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postCart = (request,response,next) => {
    const productID = request.body.productID;
    let fetchedCart;
    let newQuantity = 1;
    request.user
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: productID } });
    })
    .then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }

        if(product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(productID)
    })
    .then(product => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
        });
    })
    .then(() => {
        response.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postCartDeleteItem = (request,response,next) => {
    const productID = request.body.productID;
    request.user.getCart()
    .then(cart => {
        return cart.getProducts({ where: {id: productID }});
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        response.redirect('/cart')
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postOrder = (request,response,next) => {
    let fetchedCart;
    request.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return request.user
        .createOrder()
        .then(order => {
            return order.addProducts(
                products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity };
                    return product;
                })
            );
        })
        .catch(err => {
            console.log(err);
        })
    })
    .then(result => {
        return fetchedCart.setProducts(null);
    })
    .then(result => {
        response.redirect('/orders')
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getOrders = (request,response,next) => {
    request.user
    .getOrders({ include: ['products']})
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

exports.getCheckout = (request,response,next) => {
    
    const products = Product.fetchAll(products => {
        response.render('shop/checkout',{
            docTitle: 'Checkout',
            path: '/checkout'});
    });
};



