const MongoClient = require('mongodb').MongoClient;

let database = null;

module.exports.initDatabase = async () => {
    try {
        database = await MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(client => client.db('salesweb'));
        console.log('database initialized');
    } catch (e) {
        console.log(e);
    }
};

module.exports.getCollection = (collectionName) => {
    return database.collection(collectionName);
};
