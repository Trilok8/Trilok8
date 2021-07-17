const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.getProductList = (request,response,next) => {
    const products = Product.fetchAll(products => {
        response.render('shop/product-list',{prods: products,
            docTitle: 'My Shop',
            path: '/product-list'});
    });
};

exports.getIndex = (request,response,next) => {
    const products = Product.fetchAll(products => {
        response.render('shop/index',{prods: products,
            docTitle: 'index',
            path: '/index'});
    });
};

exports.getCart = (request,response,next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(i in products) {

                const cartProductData = cart.products.find(prod => prod.id === products[i].id);
                if (cart.products.find(prod => prod.id === products[i].id)) {
                    cartProducts.push({productData: products[i], quantity: cartProductData.quantity});
                } 
            }
            response.render('shop/cart',{prods: products,
                docTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts});
        });
    });
};

exports.postCart = (request,response,next) => {
    const productID = request.body.productID;
    Product.findProductByID(productID,(product) => {
        Cart.addProduct(productID,product.price);
    })
    response.redirect('/cart');
}

exports.postCartDeleteItem = (request,response,next) => {
    const productID = request.body.productID;
    Product.findProductByID(productID, product => {
        Cart.deleteProductByID(productID,product.price);
        response.redirect('/cart');
    });
};

exports.getCheckout = (request,response,next) => {
    const products = Product.fetchAll(products => {
        response.render('shop/checkout',{prods: products,
            docTitle: 'Checkout',
            path: '/checkout'});
    });
};

exports.getOrders = (request,response,next) => {
    const products = Product.fetchAll(products => {
        response.render('shop/orders',{prods: products,
            docTitle: 'Your Orders',
            path: '/orders'});
    });
};

exports.getProductDetail = (request,response,next) => {
    const prodID = request.params.productID;
    const product = 
    Product.findProductByID(prodID,product => {
        response.render('shop/product-detail',{product: product,docTitle: product.title,path: product.title});
    });
};