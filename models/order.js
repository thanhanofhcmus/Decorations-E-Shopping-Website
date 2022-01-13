const { getCollection } = require('../database');
const COLLECTION_NAME = 'order';

const mongoCollection = () => getCollection(COLLECTION_NAME);

const list = () => getCollection(COLLECTION_NAME).find({}).toArray();

const findByUserId = userId => getCollection(COLLECTION_NAME).find({ userId: userId }).toArray();

const insert = order => getCollection(COLLECTION_NAME).insertOne(order);

const update = (id, order) => getCollection(COLLECTION_NAME).updateOne({ id }, { $set: order }, { upsert: true });

module.exports = {
    mongoCollection,
    list,
    findByUserId,
    insert,
    update
};
