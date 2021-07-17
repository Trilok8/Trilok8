const fs = require('fs');
const Path = require('path');

const path = Path.join(Path.dirname(require.main.filename),'data','cart.json');

module.exports = class Cart {
    
    static addProduct(id,productPrice) {
        fs.readFile(path,(error, fileContent) => {
            let cart = {products: [], totalPrice: 0 };
            if(!error) {
                cart = JSON.parse(fileContent)
            }
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, quantity: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(path, JSON.stringify(cart),error => {
                console.log(error);
            });
        });
    };

    static deleteProductByID(id,productPrice) {
        fs.readFile(path,(error,fileContent) => {
            if(error)
            {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(product => product.id === id);
            if(!product) {
                return;
            }
            const productQuantity = product.quantity;
            updatedCart.products = updatedCart.products.filter(product => product.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQuantity;
            fs.writeFile(path, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    };

    static getCart(cb) {
        fs.readFile(path, (error,fileContent) => {
            const cart = JSON.parse(fileContent);
            if(error) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    };

};