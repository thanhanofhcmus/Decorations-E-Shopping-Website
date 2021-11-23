const MongoClient = require('mongodb').MongoClient;

let database = null;

module.exports.initDatabase = async () => {
    const url = 'mongodb+srv://admin:admin@salesweb.weofn.mongodb.net/SalesWeb';
    try {
        database = await MongoClient.connect(url, { useNewUrlParser: true }).then(client => client.db('salesweb'));
    } catch (e) {
        console.log(e);
    }
};

module.exports.getCollection = (collectionName) => {
    return database.collection(collectionName);
};
