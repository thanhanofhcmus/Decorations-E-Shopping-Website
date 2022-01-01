const { getCollection } = require('../database');
const COLLECTION_NAME = 'user';

const mongoCollection = () => getCollection(COLLECTION_NAME);

const list = () => getCollection(COLLECTION_NAME).find({}).toArray();

const findByUsername = username => getCollection(COLLECTION_NAME).findOne({ username });

const insert = user => getCollection(COLLECTION_NAME).insertOne(user);

const update = (id, user) => getCollection(COLLECTION_NAME).updateOne({ id }, { $set: user }, { upsert: true });

module.exports = {
    mongoCollection,
    list,
    findByUsername,
    insert,
    update
};
