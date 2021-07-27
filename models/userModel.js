const mongodb = require('mongodb');
const getDb = require('../helpers/expressjsDatabase').getDb;
const productModel = require('../models/productModel');

class UserModel {
    constructor(username, email,cart,id) {
        this.username = username;
        this.email = email;
        this.cart = cart; //{items: []}
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    };

    addToCart(product) {

        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() == product._id.toString();
        });

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = {items: updatedCartItems };
        const db = getDb();
        return db.collection('users')
        .updateOne({ _id: new mongodb.ObjectId(this._id)},{$set: {cart: updatedCart}})
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    };

    getCart() {
        
      const db = getDb();
        
      const quantityMap = new Map();

      const prodIds = this.cart.items.map(cp =>{
          quantityMap.set(cp.productId.toString(),cp.quantity);
          return cp.productId;
      });

      return db.collection("products")
          .find({_id: {$in: prodIds}})
          .toArray()
          .then(products => {
              
              //the deletion of all extra products will run parallel to each other and main program
              if(products.length<prodIds.length){
                  const productIds = products.map(p => p._id.toString());
                  const deletedProdIds = prodIds.filter(id => !productIds.includes(id.toString()));
                  deletedProdIds.forEach(id => {
                      this.deleteItemFromCart(id)
                          .catch(err => {console.log(err)});
                  })
              }
              
              return products.map(product => {
                  const p = {...product,
                      quantity: quantityMap.get(product._id.toString())};
                  return p;
              })
          })
          .catch(err => {
              console.log(err);
          });
      }

      deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
          return item.productId.toString() !== productId.toString();
        });
        const db = getDb();
        return db
          .collection('users')
          .updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            { $set: { cart: {items: updatedCartItems} } }
          );
      };

      addOrder() {
        const db = getDb();
        return this.getCart().then(products => {
          const order = {
            items: products,
            user: {
              _id: new mongodb.ObjectId(this._id),
              username: this.username
            }
          };
          return db.collection('orders')
          .insertOne(order)
        })
        .then(result => {
          this.cart = { items: []};
          return db.collection('users')
          .updateOne( {_id: new mongodb.ObjectId(this._id)},{ $set: { cart: { items: [] } } } );
        });
      };

      getOrders() {
        const db = getDb();
        return db.collection('orders')
        .find({ 'user._id': new mongodb.ObjectId(this._id)})
        .toArray();
      }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId)})
        .then(user => {
            return user;
        })
        .catch(err => {
            console.log(err);
        })
    };

}

module.exports = UserModel;