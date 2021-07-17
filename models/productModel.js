const Path = require('path');
const fs = require('fs');
const Cart = require('./cartModel');
const path = Path.join(Path.dirname(require.main.filename),'data','products.json');
let products = [];

const getProductsFromFile = products => {
    fs.readFile(path,(err,fileContent) => {
        if(err) {
            products([])
        }
        else {
            products(JSON.parse(fileContent));
        }
        
    });
}


module.exports = class Product {
    constructor(getID,getTitle,getImageURL,getPrice,getDescription,getImageSite)
    {
        this.id = getID;
        this.title = getTitle;
        this.imageURL = getImageURL;
        this.price = getPrice;
        this.description = getDescription;
        this.imageSite = getImageSite;
    };

    save() {
        
        getProductsFromFile(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(path, JSON.stringify(updatedProducts),(err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(path, JSON.stringify(products),(err) => {
                    console.log(err);
                });
            }
        });
    };

    static deleProductByID(id) {
        getProductsFromFile(products => {
            const product = products.find(product => product.id === id);
            const updatedProducts = products.filter(product => product.id !== id);
            fs.writeFile(path, JSON.stringify(updatedProducts), err => {
                if(!err) {
                    Cart.deleteProductByID(id,product.price);
                }
            });
        });
    };

    static fetchAll(products) {
        getProductsFromFile(products);
    };

    static findProductByID(id,cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    };
};