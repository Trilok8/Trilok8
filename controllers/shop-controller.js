const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.getProductList = (request,response,next) => {
    Product.fetchAll().then(([rows]) => {
        response.render('shop/product-list',{prods: rows,
            docTitle: 'My Shop',
            path: '/product-list'});
    });
};

exports.getIndex = (request,response,next) => {
    Product.fetchAll().then(([rows]) => {
        response.render('shop/index',{prods: rows,
            docTitle: 'index',
            path: '/index'});
    }).catch(err => console.log(err));


    
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
    Product.findProductByID(prodID).then(([product]) => {
        response.render('shop/product-detail',{product: product[0],docTitle: product.title,path: product.title});
    }).catch(err => console.log(err));
};