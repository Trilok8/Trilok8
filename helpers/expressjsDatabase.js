const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

exports.mongoConnect = callback => {
    MongoClient.connect('')
    .then(client => {
        _db = client.db();
        console.log('connected');
        callback();
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
};

exports.getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database Found';
};
