const Cart = require('./cartModel');
const db = require('../helpers/expressjsDatabase');

module.exports = class Product {
    constructor(getID,getTitle,getImageURL,getPrice,getDescription,getImageSite)
    {
        this.id = getID;
        this.title = getTitle;
        this.imageURL = getImageURL;
        this.price = getPrice;
        this.description = getDescription;
    };

    save() {
        return db.execute('INSERT INTO expressjsPractice.products (`title`, `price`, `description`,`imageURL`) VALUES (?, ?, ?, ?)',
        [this.title,this.price,this.description,this.imageURL]);
    };

    static deleProductByID(id) {
        
    };

    static fetchAll() {
        return db.execute('SELECT * FROM expressjsPractice.products');
    };

    static findProductByID(id) {
        return db.execute('SELECT * FROM expressjsPractice.products WHERE products.id = ?',[id]);
    };
};