const { getCollection } = require('../database');
const COLLECTION_NAME = 'user';

module.exports.mongoCollection = () => getCollection(COLLECTION_NAME);

module.exports.list = () => {
    return getCollection(COLLECTION_NAME).find({}).toArray();
};

module.exports.findByUsername = (username) => {
    return getCollection(COLLECTION_NAME).findOne({ username });
};
