const { getCollection } = require('../database');
const COLLECTION_NAME = 'category';

const list = () => getCollection(COLLECTION_NAME).find({}).toArray();

const find = category => getCollection(COLLECTION_NAME).find(category).toArray();

const findOne = category => getCollection(COLLECTION_NAME).findOne(category);

const findCategoryById = id => getCollection(COLLECTION_NAME).findOne({ id });

module.exports = {
    list,
    find,
    findOne,
    findCategoryById
};
