const Path = require('path');
const fs = require('fs');
const path = Path.join(Path.dirname(require.main.filename),'data','products.json');


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
    constructor(getTitle)
    {
        this.title = getTitle
    };

    save() {
        let products = [];

        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(path, JSON.stringify(products),(err) => {
                console.log(err);
            });
        });
    };

    static fetchAll(products) {
        getProductsFromFile(products);
    };
}